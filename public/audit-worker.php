<?php
// CLI-only: refuse HTTP access (cron runs this file directly; FPM cannot exec/proc_open anyway)
if (PHP_SAPI !== 'cli') { http_response_code(403); header('X-Robots-Tag: noindex'); exit('Forbidden'); }

/**
 * Stellio audit PDF queue worker - runs via cron every minute in CLI mode
 * (CLI PHP has exec/proc_open enabled; the FPM pool does not).
 * 1) Processes pending PDF jobs in audit-queue/job_*.json (render PDF + email it).
 *    Fails are requeued (up to 3 attempts) so transient errors self-heal.
 * 2) Drains due follower-up emails from audit-queue/follow_*.json (soft nurture, [+2d]).
 */

$queueDir = __DIR__ . '/audit-queue';
if (!is_dir($queueDir)) { @mkdir($queueDir, 0750, true); }
$now = time();

require_once __DIR__ . '/audit-pdf-template.php';

$cfg = @include __DIR__ . '/audit-config.php';
$SB_URL = is_array($cfg) ? ($cfg['sb_url'] ?? '') : '';
$SB_ANON = is_array($cfg) ? ($cfg['sb_anon'] ?? '') : '';
$followupDays = is_array($cfg) ? (int)($cfg['followup_days'] ?? 2) : 2;
if ($followupDays < 0) $followupDays = 0;

// ---------- 1. PDF jobs ----------
$jobs = (array)glob($queueDir . '/job_*.json');
foreach ($jobs as $jobFile) {
    $job = json_decode((string)@file_get_contents($jobFile), true);
    @unlink($jobFile); // claim the job immediately so a slow render doesn't double-process
    if (!is_array($job) || empty($job['email']) || empty($job['audit'])) continue;

    $attempts = (int)($job['attempts'] ?? 0) + 1;

    $pdf = stellio_build_audit_pdf_from_template($job['audit']);
    if (!$pdf['ok']) {
        error_log('stellio audit pdf render failed: ' . ($pdf['error'] ?? 'unknown') . ' (attempt ' . $attempts . ')');
        if ($attempts >= 3) { stellio_alert_boss_failure($job['email'], $pdf['error'] ?? 'render error'); continue; }
        $job['attempts'] = $attempts;
        @file_put_contents($jobFile, json_encode($job)); // requeue for the next cron tick
        continue;
    }

    $sent = stellio_worker_send_email($SB_URL, $SB_ANON, $job['email'], $job['audit'], $pdf['path'], $pdf['filename']);
    @unlink($pdf['path']);

    if (!$sent) {
        error_log('stellio audit pdf email failed for ' . $job['email'] . ' (attempt ' . $attempts . ')');
        if ($attempts >= 3) { stellio_alert_boss_failure($job['email'], 'email send error'); continue; }
        $job['attempts'] = $attempts;
        @file_put_contents($jobFile, json_encode($job));
        continue;
    }

    // Success: schedule a simple +N-day follow-up (nurture, no spam)
    if ($followupDays > 0) {
        $audit = $job['audit'];
        $host = $audit['host'] ?? parse_url($audit['url'] ?? '', PHP_URL_HOST) ?: 'site';
        @file_put_contents($queueDir . '/follow_' . bin2hex(random_bytes(6)) . '.json', json_encode([
            'email' => $job['email'],
            'host' => $host,
            'overall' => (int)($audit['overall_score'] ?? 0),
            'created_at' => $now,
            'due_at' => $now + $followupDays * 86400,
        ]));
    }
}

// ---------- 2. Due follow-up emails ----------
$followUps = (array)glob($queueDir . '/follow_*.json');
foreach ($followUps as $fuFile) {
    $fu = json_decode((string)@file_get_contents($fuFile), true);
    if (!is_array($fu) || empty($fu['email'])) { @unlink($fuFile); continue; }
    if ((int)($fu['due_at'] ?? 0) > $now) continue; // not due yet - leave for a later tick
    @unlink($fuFile); // claim
    if (!stellio_send_followup($fu)) error_log('stellio audit follow-up email failed for ' . $fu['email']);
}

/** Warm follow-up email offering to walk the lead through their report. */
function stellio_send_followup(array $fu): bool {
    $emailCfg = @include __DIR__ . '/email-config.php';
    $apiKey = is_array($emailCfg) ? ($emailCfg['elastic_email_api_key'] ?? '') : '';
    $from = is_array($emailCfg) ? ($emailCfg['from_email'] ?? 'hello@stellio.com.au') : 'hello@stellio.com.au';
    $fromName = is_array($emailCfg) ? ($emailCfg['from_name'] ?? 'Stellio Creative Labs') : 'Stellio Creative Labs';
    if (!$apiKey) return false;

    $host = (string)($fu['host'] ?? 'your site');
    $overall = (int)($fu['overall'] ?? 0);
    $html = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">'
        . '<div style="background:#FB5005;padding:20px 28px;"><h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;font-family:Arial,sans-serif;">Did you get your audit report?</h1></div>'
        . '<div style="padding:24px 28px;">'
        . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:0 0 14px;">Hey there,</p>'
        . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:0 0 14px;">A few days ago we sent you the full website audit report for <strong>' . htmlspecialchars($host) . '</strong> (scored ' . $overall . '/100).</p>'
        . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:0 0 14px;">If any of the fixes in it feel overwhelming, you do not have to handle them alone - we regularly help local businesses knock out the top issues in a single session.</p>'
        . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:0 0 20px;">Happy to walk you through the report line-by-line on a free call.</p>'
        . '<p style="margin:0;"><a href="https://stellio.com.au/contact" style="display:inline-block;background:#FB5005;color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:8px;font-size:14px;font-weight:700;">Book a free call</a></p>'
        . '</div>'
        . '<div style="padding:14px 28px;background:#fafafa;border-top:1px solid #eeeeee;">'
        . '<p style="margin:0;font-size:12px;color:#888888;font-family:Arial,sans-serif;">Stellio Creative Labs - Build Bold. Launch Smarter. <a href="https://stellio.com.au" style="color:#FB5005;text-decoration:none;">stellio.com.au</a></p>'
        . '</div></div>';

    $fields = [
        'apikey' => $apiKey, 'from' => $from, 'fromName' => $fromName,
        'to' => $fu['email'],
        'subject' => 'Re: your ' . $host . ' audit - want a hand with the fixes?',
        'bodyHtml' => $html,
        'bodyText' => 'A few days ago we sent the audit report for ' . $host . ' (scored ' . $overall . '/100). Happy to walk you through the top fixes on a free call: https://stellio.com.au/contact',
        'isTransactional' => 'true',
    ];
    $ch = curl_init('https://api.elasticemail.com/v2/email/send');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($fields),
        CURLOPT_TIMEOUT => 30,
    ]);
    $body = curl_exec($ch);
    curl_close($ch);
    $json = json_decode((string)$body, true) ?: [];
    return !empty($json['success']);
}

/** Surface a job that failed permanently (3 attempts) to the Boss inbox. */
function stellio_alert_boss_failure(string $toEmail, string $reason): void {
    $emailCfg = @include __DIR__ . '/email-config.php';
    $apiKey = is_array($emailCfg) ? ($emailCfg['elastic_email_api_key'] ?? '') : '';
    $from = is_array($emailCfg) ? ($emailCfg['from_email'] ?? 'hello@stellio.com.au') : 'hello@stellio.com.au';
    if (!$apiKey) return;
    $ch = curl_init('https://api.elasticemail.com/v2/email/send');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true, CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'apikey' => $apiKey, 'from' => $from,
            'to' => 'hello@stellio.com.au',
            'subject' => 'Audit PDF failed permanently for ' . $toEmail,
            'bodyText' => 'The audit PDF for ' . $toEmail . ' could not be delivered after 3 attempts (' . $reason . '). Check the worker log.',
            'isTransactional' => 'true',
        ]),
        CURLOPT_TIMEOUT => 30,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

/** Minimal Elastic Email send w/ attachment for the worker (multipart) */
function stellio_worker_send_email(string $sbUrl, string $sbAnon, string $toEmail, array $audit, string $pdfPath, string $pdfFilename): bool {
    if (!$sbUrl || !$sbAnon) return false;

    // Fetch Elastic Email creds from server-side config (never stored in anon-readable DB)
    $emailCfg = @include __DIR__ . '/email-config.php';
    $apiKey = is_array($emailCfg) ? ($emailCfg['elastic_email_api_key'] ?? '') : '';
    $from = is_array($emailCfg) ? ($emailCfg['from_email'] ?? 'hello@stellio.com.au') : 'hello@stellio.com.au';
    $fromName = is_array($emailCfg) ? ($emailCfg['from_name'] ?? 'Stellio Creative Labs') : 'Stellio Creative Labs';
    if (!$apiKey) return false;

    $host = $audit['host'] ?? parse_url($audit['url'] ?? '', PHP_URL_HOST) ?: 'site';
    $overall = (int)($audit['overall_score'] ?? 0);
    $s = $audit['scores'] ?? [];

    // Lead-facing email - same clean white/orange style as the Boss notification
    $leadScoreRows = '';
    foreach ([
        'On-Page & SEO' => $s['on_page'] ?? null,
        'Performance' => $s['performance'] ?? null,
        'DNS & Domain' => $s['dns_domain'] ?? null,
        'AI Design' => $s['design'] ?? null,
    ] as $label => $val) {
        $leadScoreRows .= '<tr><td style="padding:7px 12px 7px 0;font-size:13px;color:#666666;width:55%;">' . $label . '</td>'
            . '<td style="padding:7px 0;font-size:14px;color:#111111;font-weight:600;">' . ($val !== null ? (int)$val . '/100' : 'Not scored') . '</td></tr>';
    }
    $leadOpps = '';
    foreach (array_slice($audit['opportunities'] ?? [], 0, 3) as $i => $o) {
        $leadOpps .= '<div style="margin-bottom:10px;padding:10px 12px;background:#fafafa;border:1px solid #eeeeee;border-radius:8px;">'
            . '<p style="margin:0;font-size:13px;font-weight:700;color:#111111;">' . ($i + 1) . '. ' . htmlspecialchars($o['title'] ?? '') . '</p>'
            . (!empty($o['detail']) ? '<p style="margin:4px 0 0;font-size:13px;color:#555555;line-height:1.5;">' . htmlspecialchars(mb_substr($o['detail'], 0, 140)) . (mb_strlen($o['detail']) > 140 ? '...' : '') . '</p>' : '')
            . '</div>';
    }
    $leadOppCount = (int)($audit['opportunity_count'] ?? count($audit['opportunities'] ?? []));

    $leadHtml = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">'
        . '<div style="background:#FB5005;padding:20px 28px;"><h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;font-family:Arial,sans-serif;">Your Website Audit: ' . htmlspecialchars($host) . ' scored ' . $overall . '/100</h1></div>'
        . '<div style="padding:24px 28px;">'
        . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:0 0 16px;">Your full report is attached as a PDF. Here is a quick snapshot:</p>'
        . '<h2 style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#FB5005;margin:0 0 10px 0;padding-bottom:6px;border-bottom:2px solid #FB5005;">Score Breakdown</h2>'
        . '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">' . $leadScoreRows . '</table>'
        . ($leadOpps ? '<h2 style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#FB5005;margin:28px 0 10px 0;padding-bottom:6px;border-bottom:2px solid #FB5005;">Top Fixes (of ' . $leadOppCount . ')</h2>' . $leadOpps : '')
        . '<p style="font-size:14px;color:#111111;line-height:1.6;margin:20px 0 0;">If anything stands out and you would like a hand fixing it, book a free call and we will walk through the report together.</p>'
        . '<p style="margin:20px 0 0;"><a href="https://stellio.com.au/contact" style="display:inline-block;background:#FB5005;color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:8px;font-size:14px;font-weight:700;">Book a free call</a></p>'
        . '</div>'
        . '<div style="padding:14px 28px;background:#fafafa;border-top:1px solid #eeeeee;">'
        . '<p style="margin:0;font-size:12px;color:#888888;font-family:Arial,sans-serif;">Stellio Creative Labs - Build Bold. Launch Smarter. <a href="https://stellio.com.au" style="color:#FB5005;text-decoration:none;">stellio.com.au</a></p>'
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
