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

    // Notify Boss with the full audit detail + a copy of the customer's PDF
    if ($ok) {
        $esc = fn($v) => htmlspecialchars((string)$v);
        $scanDate = date('j M Y, g:ia', strtotime($audit['scanned_at'] ?? 'now'));
        $oppCount = (int)($audit['opportunity_count'] ?? count($audit['opportunities'] ?? []));

        // Score rows
        $scoreRows = '';
        foreach ([
            'On-Page & SEO' => $s['on_page'] ?? null,
            'Performance' => $s['performance'] ?? null,
            'DNS & Domain' => $s['dns_domain'] ?? null,
            'AI Design' => $s['design'] ?? null,
        ] as $label => $val) {
            $scoreRows .= '<tr><td style="padding:7px 12px 7px 0;font-size:13px;color:#666666;width:42%;">' . $label . '</td>'
                . '<td style="padding:7px 0;font-size:14px;color:#111111;font-weight:600;">' . ($val !== null ? (int)$val . '/100' : 'Not scored') . '</td></tr>';
        }

        // AI design verdict
        $designHtml = '';
        if (!empty($audit['ai_design'])) {
            $d = $audit['ai_design'];
            $recs = '';
            foreach (array_slice($d['recommendations'] ?? [], 0, 4) as $r) {
                $recs .= '<li style="font-size:13px;color:#111111;margin-bottom:4px;">' . $esc($r) . '</li>';
            }
            $designHtml = '<h2 style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#FB5005;margin:28px 0 10px 0;padding-bottom:6px;border-bottom:2px solid #FB5005;">AI Design Verdict</h2>'
                . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:0 0 8px;">' . $esc($d['overall_impression'] ?? '') . '</p>'
                . ($recs ? '<ul style="margin:8px 0 0 18px;padding:0;">' . $recs . '</ul>' : '');
        }

        // Opportunities grouped by impact
        $impactColors = ['critical' => '#DC2626', 'high' => '#EA580C', 'medium' => '#D97706', 'low' => '#65A30D'];
        $byImpact = ['critical' => [], 'high' => [], 'medium' => [], 'low' => []];
        foreach (($audit['opportunities'] ?? []) as $o) {
            $imp = strtolower($o['impact'] ?? 'medium');
            if (!isset($byImpact[$imp])) $imp = 'medium';
            $byImpact[$imp][] = $o;
        }
        $oppHtml = '';
        $n = 0;
        foreach ($byImpact as $imp => $items) {
            if (!$items) continue;
            $oppHtml .= '<p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:' . $impactColors[$imp] . ';margin:16px 0 6px;">' . ucfirst($imp) . ' (' . count($items) . ')</p>';
            foreach ($items as $o) {
                $n++;
                $oppHtml .= '<div style="margin-bottom:12px;padding:10px 12px;background:#fafafa;border:1px solid #eeeeee;border-radius:8px;">'
                    . '<p style="margin:0;font-size:13px;font-weight:700;color:#111111;">' . $n . '. ' . $esc($o['title'] ?? '') . '</p>'
                    . (!empty($o['detail']) ? '<p style="margin:4px 0 0;font-size:13px;color:#555555;line-height:1.5;">' . $esc($o['detail']) . '</p>' : '')
                    . (!empty($o['fix']) ? '<p style="margin:4px 0 0;font-size:12px;color:#FB5005;line-height:1.5;"><strong>Fix:</strong> ' . $esc($o['fix']) . '</p>' : '')
                    . '</div>';
            }
        }

        $bossHtml = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">'
            . '<div style="background:#FB5005;padding:20px 28px;"><h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;font-family:Arial,sans-serif;">New Audit Lead: ' . $esc($host) . ' (' . $overall . '/100)</h1></div>'
            . '<div style="padding:24px 28px;">'
            . '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">'
            . '<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;width:42%;">Lead email</td><td style="padding:6px 0;font-size:14px;"><a href="mailto:' . $esc($toEmail) . '" style="color:#FB5005;text-decoration:none;">' . $esc($toEmail) . '</a></td></tr>'
            . '<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;">Website</td><td style="padding:6px 0;font-size:14px;"><a href="' . $esc($audit['url'] ?? '') . '" style="color:#FB5005;text-decoration:none;">' . $esc($audit['url'] ?? $host) . '</a></td></tr>'
            . '<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;">Scanned</td><td style="padding:6px 0;font-size:14px;color:#111111;">' . $scanDate . '</td></tr>'
            . '<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;">Overall score</td><td style="padding:6px 0;font-size:14px;color:#111111;font-weight:700;">' . $overall . '/100 &nbsp;<span style="color:#888888;font-weight:400;">(' . $oppCount . ' opportunities)</span></td></tr>'
            . '</table>'
            . '<h2 style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#FB5005;margin:28px 0 10px 0;padding-bottom:6px;border-bottom:2px solid #FB5005;">Score Breakdown</h2>'
            . '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">' . $scoreRows . '</table>'
            . $designHtml
            . '<h2 style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#FB5005;margin:28px 0 10px 0;padding-bottom:6px;border-bottom:2px solid #FB5005;">Opportunities (' . $oppCount . ')</h2>'
            . ($oppHtml ?: '<p style="font-size:13px;color:#666666;">No issues found.</p>')
            . '</div>'
            . '<div style="padding:14px 28px;background:#fafafa;border-top:1px solid #eeeeee;">'
            . '<p style="margin:0;font-size:12px;color:#888888;font-family:Arial,sans-serif;">The PDF sent to the customer is attached. View all leads in the <a href="https://stellio.com.au/admin" style="color:#FB5005;text-decoration:none;">Admin Panel</a>.</p>'
            . '</div></div>';

        $parts = [];
        foreach ([
            'apikey' => $apiKey, 'from' => $from, 'fromName' => $fromName,
            'to' => 'hello@stellio.com.au',
            'subject' => 'Audit PDF lead: ' . $toEmail . ' (' . $host . ' ' . $overall . '/100)',
            'bodyHtml' => $bossHtml,
            'bodyText' => $toEmail . ' requested the audit PDF for ' . $host . ' (' . $overall . '/100). PDF attached.',
            'isTransactional' => 'true',
        ] as $k => $v) {
            $parts[] = '--' . $boundary . $eol . 'Content-Disposition: form-data; name="' . $k . '"' . $eol . $eol . $v . $eol;
        }
        // Attach the same PDF the customer received
        $parts[] = '--' . $boundary . $eol
            . 'Content-Disposition: form-data; name="file"; filename="' . $pdfFilename . '"' . $eol
            . 'Content-Type: application/pdf' . $eol . $eol
            . $fileData . $eol;
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
