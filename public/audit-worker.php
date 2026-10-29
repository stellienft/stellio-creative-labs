<?php
/**
 * Stellio audit PDF queue worker - runs via cron every minute in CLI mode
 * (CLI PHP has exec/proc_open enabled; the FPM pool does not).
 * Processes pending jobs in audit-queue/: renders PDF + emails it via Elastic Email.
 */

$queueDir = __DIR__ . '/audit-queue';
if (!is_dir($queueDir)) { @mkdir($queueDir, 0750, true); }

$jobs = glob($queueDir . '/job_*.json');
if (!$jobs) exit(0); // nothing to do

require_once __DIR__ . '/audit-pdf-template.php';

$cfg = @include __DIR__ . '/audit-config.php';
$SB_URL = is_array($cfg) ? ($cfg['sb_url'] ?? '') : '';
$SB_ANON = is_array($cfg) ? ($cfg['sb_anon'] ?? '') : '';

foreach ($jobs as $jobFile) {
    $job = json_decode((string)@file_get_contents($jobFile), true);
    @unlink($jobFile); // claim the job immediately so a slow render doesn't double-process
    if (!is_array($job) || empty($job['email']) || empty($job['audit'])) continue;

    $pdf = stellio_build_audit_pdf_from_template($job['audit']);
    if (!$pdf['ok']) {
        error_log('stellio audit pdf render failed: ' . ($pdf['error'] ?? 'unknown'));
        continue;
    }

    // Inline the email send (mirror of stellio_email_pdf - kept here so the worker is standalone)
    $sent = stellio_worker_send_email($SB_URL, $SB_ANON, $job['email'], $job['audit'], $pdf['path'], $pdf['filename']);
    if (!$sent) error_log('stellio audit pdf email failed for ' . $job['email']);
    @unlink($pdf['path']);
}

/** Minimal Elastic Email send w/ attachment for the worker (multipart) */
function stellio_worker_send_email(string $sbUrl, string $sbAnon, string $toEmail, array $audit, string $pdfPath, string $pdfFilename): bool {
    if (!$sbUrl || !$sbAnon) return false;

    // Fetch Elastic Email creds from site_settings
    $keys = ['elastic_email_api_key', 'elastic_email_from', 'elastic_email_from_name', 'elastic_mail_api_key', 'elastic_mail_from_email', 'elastic_mail_from_name'];
    $settings = [];
    foreach ($keys as $k) {
        $ch = curl_init($sbUrl . '/rest/v1/site_settings?select=key,value&key=eq.' . urlencode($k));
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['apikey: ' . $sbAnon, 'Authorization: Bearer ' . $sbAnon],
            CURLOPT_TIMEOUT => 10,
        ]);
        $body = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);
        if ($code === 200) {
            foreach (json_decode((string)$body, true) ?: [] as $row) $settings[$row['key']] = $row['value'];
        }
    }
    $apiKey = $settings['elastic_email_api_key'] ?? ($settings['elastic_mail_api_key'] ?? '');
    $from = $settings['elastic_email_from'] ?? ($settings['elastic_mail_from_email'] ?? 'hello@stellio.com.au');
    $fromName = $settings['elastic_email_from_name'] ?? ($settings['elastic_mail_from_name'] ?? 'Stellio Creative Labs');
    if (!$apiKey) return false;

    $host = $audit['host'] ?? parse_url($audit['url'] ?? '', PHP_URL_HOST) ?: 'site';
    $overall = (int)($audit['overall_score'] ?? 0);
    $s = $audit['scores'] ?? [];

    $leadHtml = '<div style="font-family:Arial,sans-serif;background:#0A0A0A;padding:32px">'
        . '<div style="max-width:560px;margin:0 auto;background:#111111;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:32px;color:#FAFAFA">'
        . '<h1 style="font-size:20px;margin:0 0 8px">Your website audit is ready</h1>'
        . '<p style="color:#A1A1AA;font-size:14px;line-height:1.6">Here is your full report for <strong style="color:#FAFAFA">' . htmlspecialchars($host) . '</strong> - overall score <strong style="color:#FB5005">' . $overall . '/100</strong>.</p>'
        . '<p style="color:#A1A1AA;font-size:14px;line-height:1.6">The PDF is attached. If you want help fixing anything, book a free call and we will walk through it together.</p>'
        . '<a href="https://stellio.com.au/contact" style="display:inline-block;margin-top:8px;background:#FB5005;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600">Book a free call</a>'
        . '<p style="color:#71717A;font-size:12px;margin-top:24px">Stellio Creative Labs - Build Bold. Launch Smarter.<br>stellio.com.au</p>'
        . '</div></div>';

    // multipart send
    $fileData = file_get_contents($pdfPath);
    $boundary = 'stellio' . bin2hex(random_bytes(12));
    $eol = "\r\n";
    $parts = [];
    foreach ([
        'apikey' => $apiKey,
        'from' => $from,
        'fromName' => $fromName,
        'to' => $toEmail,
        'subject' => 'Your website audit: ' . $host . ' scored ' . $overall . '/100',
        'bodyHtml' => $leadHtml,
        'bodyText' => 'Your website audit for ' . $host . ' is attached. Overall score: ' . $overall . '/100. - Stellio Creative Labs',
        'isTransactional' => 'true',
    ] as $k => $v) {
        $parts[] = '--' . $boundary . $eol . 'Content-Disposition: form-data; name="' . $k . '"' . $eol . $eol . $v . $eol;
    }
    $parts[] = '--' . $boundary . $eol
        . 'Content-Disposition: form-data; name="file"; filename="' . $pdfFilename . '"' . $eol
        . 'Content-Type: application/pdf' . $eol . $eol
        . $fileData . $eol;
    $parts[] = '--' . $boundary . '--' . $eol;

    $ch = curl_init('https://api.elasticemail.com/v2/email/send');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => implode('', $parts),
        CURLOPT_HTTPHEADER => ['Content-Type: multipart/form-data; boundary=' . $boundary],
        CURLOPT_TIMEOUT => 30,
    ]);
    $body = curl_exec($ch);
    curl_close($ch);
    $json = json_decode((string)$body, true) ?: [];
    $ok = !empty($json['success']);

    // Notify Boss with the findings summary
    if ($ok) {
        $catLines = 'On-Page & SEO ' . ($s['on_page'] ?? '-') . '/100, Performance ' . ($s['performance'] ?? '-') . '/100, DNS & Domain ' . ($s['dns_domain'] ?? '-') . '/100, AI Design ' . ($s['design'] ?? '-') . '/100';
        $oppLines = '';
        foreach (array_slice($audit['opportunities'] ?? [], 0, 10) as $i => $o) {
            $oppLines .= ($i + 1) . '. [' . strtoupper($o['impact'] ?? 'medium') . '] ' . ($o['title'] ?? '') . ': ' . mb_substr($o['detail'] ?? '', 0, 120) . "\n";
        }
        $bossHtml = '<div style="font-family:Arial,sans-serif;background:#0A0A0A;padding:32px">'
            . '<div style="max-width:560px;margin:0 auto;background:#111111;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:32px;color:#FAFAFA">'
            . '<h1 style="font-size:20px;margin:0 0 8px">New audit PDF lead</h1>'
            . '<p style="color:#A1A1AA;font-size:14px">' . htmlspecialchars($toEmail) . ' requested the PDF for <strong style="color:#FAFAFA">' . htmlspecialchars($host) . '</strong>.</p>'
            . '<p style="color:#FAFAFA;font-size:14px;margin:16px 0 4px"><strong>Overall: ' . $overall . '/100</strong></p>'
            . '<p style="color:#A1A1AA;font-size:13px">' . $catLines . '</p>'
            . '<pre style="color:#A1A1AA;font-size:12px;white-space:pre-wrap;background:#0E0E0E;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:14px">' . htmlspecialchars($oppLines) . '</pre>'
            . '</div></div>';

        $parts = [];
        foreach ([
            'apikey' => $apiKey, 'from' => $from, 'fromName' => $fromName,
            'to' => 'hello@stellio.com.au',
            'subject' => 'Audit PDF lead: ' . $toEmail . ' (' . $host . ' ' . $overall . '/100)',
            'bodyHtml' => $bossHtml,
            'bodyText' => $toEmail . ' requested the audit PDF for ' . $host . ' (' . $overall . '/100)',
            'isTransactional' => 'true',
        ] as $k => $v) {
            $parts[] = '--' . $boundary . $eol . 'Content-Disposition: form-data; name="' . $k . '"' . $eol . $eol . $v . $eol;
        }
        $parts[] = '--' . $boundary . '--' . $eol;
        $ch = curl_init('https://api.elasticemail.com/v2/email/send');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true, CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => implode('', $parts),
            CURLOPT_HTTPHEADER => ['Content-Type: multipart/form-data; boundary=' . $boundary],
            CURLOPT_TIMEOUT => 30,
        ]);
        curl_exec($ch);
        curl_close($ch);
    }
    return $ok;
}
