<?php
/**
 * Stellio Site Audit API
 * Actions:
 *   POST {action: "audit", url}            -> run full audit (also logged to Supabase server-side)
 *   POST {action: "send_pdf", payload...}  -> generate branded PDF + email it to the lead
 *   GET  ?action=count                     -> total audits run (for the public counter)
 * Returns JSON with scores, findings, AI design critique.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://stellio.com.au');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ---------- Config ----------
$AUDIT_CONFIG = @include __DIR__ . '/audit-config.php'; // returns ['openai_key'=>..., 'psi_key'=>..., 'sb_url'=>..., 'sb_anon'=>...]
$OPENAI_KEY = is_array($AUDIT_CONFIG) ? ($AUDIT_CONFIG['openai_key'] ?? '') : '';
$GOOGLE_PSI_KEY = is_array($AUDIT_CONFIG) ? ($AUDIT_CONFIG['psi_key'] ?? '') : '';
$SB_URL = is_array($AUDIT_CONFIG) ? ($AUDIT_CONFIG['sb_url'] ?? 'https://cuakekfosklppjqucihu.supabase.co') : '';
$SB_ANON = is_array($AUDIT_CONFIG) ? ($AUDIT_CONFIG['sb_anon'] ?? '') : '';
$AI_MODEL = 'gpt-4o-mini';

// ---------- Helpers ----------
function fetch(string $url, array $opts = []): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 4,
        CURLOPT_TIMEOUT => $opts['timeout'] ?? 20,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_USERAGENT => $opts['ua'] ?? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 StellioAudit/1.0',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => 0,
    ]);
    if (!empty($opts['post'])) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $opts['post']);
    }
    if (!empty($opts['headers'])) curl_setopt($ch, CURLOPT_HTTPHEADER, $opts['headers']);
    if (!empty($opts['method'])) curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $opts['method']);
    $body = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err = curl_error($ch);
    $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    $totalTime = curl_getinfo($ch, CURLINFO_TOTAL_TIME);
    $size = curl_getinfo($ch, CURLINFO_SIZE_DOWNLOAD);
    curl_close($ch);
    return ['body' => $body === false ? '' : $body, 'status' => (int)$status, 'error' => $err, 'finalUrl' => $finalUrl, 'time' => $totalTime, 'size' => $size];
}

/** Run multiple fetches in parallel */
function fetchParallel(array $requests): array {
    $mh = curl_multi_init();
    $handles = [];
    foreach ($requests as $key => $opts) {
        $ch = curl_init($opts['url']);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 4,
            CURLOPT_TIMEOUT => $opts['timeout'] ?? 20,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 StellioAudit/1.0',
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 0,
        ]);
        curl_multi_add_handle($mh, $ch);
        $handles[$key] = $ch;
    }
    $running = null;
    do { curl_multi_exec($mh, $running); if ($running) curl_multi_select($mh, 1); } while ($running > 0);
    $out = [];
    foreach ($handles as $key => $ch) {
        $out[$key] = [
            'body' => curl_multi_getcontent($ch) ?: '',
            'status' => (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE),
            'error' => curl_error($ch),
            'finalUrl' => curl_getinfo($ch, CURLINFO_EFFECTIVE_URL),
            'size' => curl_getinfo($ch, CURLINFO_SIZE_DOWNLOAD),
            'time' => curl_getinfo($ch, CURLINFO_TOTAL_TIME),
        ];
        curl_multi_remove_handle($mh, $ch);
    }
    curl_multi_close($mh);
    return $out;
}

function scoreFromChecks(array $checks): int {
    $total = count($checks);
    if ($total === 0) return 0;
    $passed = count(array_filter($checks, fn($c) => $c['passed']));
    return (int)round(($passed / $total) * 100);
}

function finding(string $category, string $title, string $detail, bool $passed, string $impact = 'medium', string $fix = ''): array {
    return ['category' => $category, 'title' => $title, 'detail' => $detail, 'passed' => $passed, 'impact' => $impact, 'fix' => $fix];
}

/** Australian-English sweep for AI-generated text */
function auEnglish(string $text): string {
    $map = [
        '/\bcolor/i' => 'colour', '/\bcolors/i' => 'colours', '/\bcolored/i' => 'coloured', '/\bcolorful/i' => 'colourful',
        '/\bcentre\b/i' => 'centre', '/\bcenter\b/i' => 'centre', '/\bcenters\b/i' => 'centres', '/\bcentered/i' => 'centred',
        '/\butilize/i' => 'use', '/\butilization/i' => 'use', '/\butilises?\b/i' => 'uses',
        '/\boptimiz/i' => 'optimis', '/\bOptimiz/i' => 'Optimis',
        '/\banalyz/i' => 'analys', '/\bAnalyz/i' => 'Analys',
        '/\borganiz/i' => 'organis', '/\bprioritiz/i' => 'prioritis', '/\bmoderniz/i' => 'modernis',
        '/\bpersonaliz/i' => 'personalis', '/\bmaximiz/i' => 'maximis', '/\bminimiz/i' => 'minimis',
        '/\bfavorite/i' => 'favourite', '/\bfavorites/i' => 'favourites',
        '/\bbehavior/i' => 'behaviour', '/\bbehaviors/i' => 'behaviours',
        '/\blicen[cs]e/i' => 'licence',
        '/\btraveling/i' => 'travelling', '/\btraveled/i' => 'travelled', '/\btraveler/i' => 'traveller',
        '/\blabeling/i' => 'labelling', '/\blabeled/i' => 'labelled',
        '/\bmodeling/i' => 'modelling', '/\bmodeled/i' => 'modelled',
        '/\bfulfill/i' => 'fulfil', '/\bfulfillment/i' => 'fulfilment',
        '/\bpractise\b/i' => 'practise', '/\bdefense/i' => 'defence', '/\boffense/i' => 'offence',
        '/\bgray\b/i' => 'grey', '/\bgrays\b/i' => 'greys',
    ];
    return preg_replace(array_keys($map), array_values($map), $text);
}

/** Recursively apply AU English to AI design data */
function auEnglishDeep($data) {
    if (is_string($data)) return auEnglish($data);
    if (is_array($data)) return array_map('auEnglishDeep', $data);
    return $data;
}

/** Log an audit run to Supabase server-side (admin analytics) */
function logAuditToSupabase(string $sbUrl, string $sbAnon, array $row): void {
    if (!$sbUrl || !$sbAnon) return;
    fetch($sbUrl . '/rest/v1/site_audits', [
        'post' => json_encode($row),
        'headers' => ['Content-Type: application/json', 'apikey: ' . $sbAnon, 'Authorization: Bearer ' . $sbAnon, 'Prefer: return=minimal'],
        'timeout' => 10,
    ]);
}

/** Queue a PDF render+email job for the cron worker (FPM can't run chromium). */
function queue_pdf_job(string $email, array $auditData): bool {
    $queueDir = __DIR__ . '/audit-queue';
    if (!is_dir($queueDir)) { @mkdir($queueDir, 0750, true); }
    $jobFile = $queueDir . '/job_' . date('YmdHis') . '_' . bin2hex(random_bytes(4)) . '.json';
    return @file_put_contents($jobFile, json_encode(['email' => $email, 'audit' => $auditData, 'queued_at' => date('c')])) !== false;
}

/** Build a findings summary string (for the admin notification email) */
function stellio_findings_summary(array $audit): string {
    $s = $audit['scores'] ?? [];
    $lines = [
        'OVERALL SCORE: ' . (int)($audit['overall_score'] ?? 0) . '/100',
        'CATEGORY SCORES: On-Page & SEO ' . ($s['on_page'] ?? '-') . '/100, Performance ' . ($s['performance'] ?? '-') . '/100, DNS & Domain ' . ($s['dns_domain'] ?? '-') . '/100, AI Design ' . ($s['design'] ?? '-') . '/100',
    ];
    if (!empty($audit['ai_design'])) {
        $d = $audit['ai_design'];
        $lines[] = 'AI DESIGN VERDICT: ' . str_replace('-', ' ', $d['modernity'] ?? '') . ' - ' . ($d['overall_impression'] ?? '');
    }
    $lines[] = '';
    $lines[] = 'TOP OPPORTUNITIES (' . (int)($audit['opportunity_count'] ?? 0) . ' total):';
    foreach (array_slice($audit['opportunities'] ?? [], 0, 10) as $i => $o) {
        $lines[] = ($i + 1) . '. [' . strtoupper($o['impact'] ?? 'medium') . '] ' . ($o['title'] ?? '') . ': ' . mb_substr($o['detail'] ?? '', 0, 160) . (!empty($o['fix']) ? ' | Fix: ' . mb_substr($o['fix'], 0, 120) : '');
    }
    return implode("\n", $lines);
}

/** Generate the branded audit PDF (cream/orange design per reference) using FPDF-compatible HTML-to-PDF via dompdf-free approach.
 *  We build it with the Ghostscript-free mPDF alternative: a pure-PHP FPDF lib included locally. */
function stellio_build_audit_pdf(array $audit): array {
    // Render the exact reference design (cream/orange HTML template) via headless Chromium
    require_once __DIR__ . '/audit-pdf-template.php';
    return \stellio_build_audit_pdf_from_template($audit);
}

/** Send the PDF to the lead + notify Boss via Elastic Email */
function stellio_email_pdf(string $sbUrl, string $sbAnon, string $toEmail, array $audit, string $pdfPath, string $pdfFilename): array {
    // Fetch Elastic Email creds from site_settings (anon-readable)
    if (!$sbUrl || !$sbAnon) return ['ok' => false, 'error' => 'Supabase config missing'];
    $keys = ['elastic_email_api_key', 'elastic_email_from', 'elastic_email_from_name', 'elastic_mail_api_key', 'elastic_mail_from_email', 'elastic_mail_from_name'];
    $settings = [];
    foreach ($keys as $k) {
        $resp = fetch($sbUrl . '/rest/v1/site_settings?select=key,value&key=eq.' . urlencode($k), [
            'timeout' => 10,
            'headers' => ['apikey: ' . $sbAnon, 'Authorization: Bearer ' . $sbAnon],
        ]);
        if ($resp['status'] === 200) {
            foreach (json_decode($resp['body'], true) ?: [] as $row) $settings[$row['key']] = $row['value'];
        }
    }
    if (!$settings) return ['ok' => false, 'error' => 'Could not read email settings'];
    $apiKey = $settings['elastic_email_api_key'] ?? $settings['elastic_mail_api_key'] ?? '';
    $from = $settings['elastic_email_from'] ?? $settings['elastic_mail_from_email'] ?? 'hello@stellio.com.au';
    $fromName = $settings['elastic_email_from_name'] ?? $settings['elastic_mail_from_name'] ?? 'Stellio Creative Labs';
    if (!$apiKey) return ['ok' => false, 'error' => 'Elastic Email API key not configured'];

    $host = parse_url($audit['url'], PHP_URL_HOST) ?: $audit['url'];
    $overall = (int)($audit['overall_score'] ?? 0);

    // Email to the lead (branded, dark theme inline)
    $leadHtml = '<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">'
        . '<div style="background:#FB5005;padding:28px 32px;border-radius:12px 12px 0 0;">'
        . '<h1 style="color:#fff;margin:0;font-size:22px;">Your website audit is ready</h1></div>'
        . '<div style="background:#0A0A0A;padding:32px;color:#FAFAFA;">'
        . '<p style="font-size:15px;line-height:1.6;color:#A1A1AA;">Hi there,</p>'
        . '<p style="font-size:15px;line-height:1.6;color:#A1A1AA;">Here is the full audit report for <strong style="color:#FAFAFA;">' . htmlspecialchars($host) . '</strong>, attached as a PDF. '
        . 'Overall score: <strong style="color:#FB5005;">' . $overall . '/100</strong>.</p>'
        . '<p style="font-size:15px;line-height:1.6;color:#A1A1AA;">Inside you will find your category scores, the AI visual design review, and a prioritised list of opportunities with fixes.</p>'
        . '<p style="font-size:15px;line-height:1.6;color:#A1A1AA;">If anything stands out and you would like a hand fixing it, just reply to this email or book a free call:</p>'
        . '<p style="margin:28px 0;"><a href="https://cal.com/stellio/intro" style="display:inline-block;background:#FB5005;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Book a free call</a></p>'
        . '<p style="font-size:13px;color:#71717A;">Build Bold. Launch Smarter.<br>Stellio Creative Labs - stellio.com.au</p>'
        . '</div></div>';

    // Send with attachment via Elastic Email (multipart file upload)
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
    $multipartBody = implode('', $parts);

    $ch = curl_init('https://api.elasticemail.com/v2/email/send');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $multipartBody,
        CURLOPT_HTTPHEADER => ['Content-Type: multipart/form-data; boundary=' . $boundary],
        CURLOPT_TIMEOUT => 30,
    ]);
    $body = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    $json = json_decode((string)$body, true) ?: [];

    // Notify Boss (findings summary) - failure here must not fail the lead email result
    if (!empty($json['success'])) {
        $bossHtml = '<div style="font-family:sans-serif;max-width:560px;margin:0 auto;">'
            . '<div style="background:#FB5005;padding:20px 28px;border-radius:12px 12px 0 0;"><h2 style="color:#fff;margin:0;font-size:18px;">New Site Audit Lead</h2></div>'
            . '<div style="background:#0A0A0A;padding:28px;border-radius:0 0 12px 12px;color:#FAFAFA;">'
            . '<p><strong>Email:</strong> ' . htmlspecialchars($toEmail) . '</p>'
            . '<p><strong>Audited site:</strong> <a href="' . htmlspecialchars($audit['url']) . '" style="color:#FB5005;">' . htmlspecialchars($audit['url']) . '</a></p>'
            . '<p><strong>Score:</strong> ' . $overall . '/100 with ' . (int)($audit['opportunity_count'] ?? 0) . ' opportunities</p>'
            . '<p style="margin-top:16px;"><strong>Findings:</strong></p>'
            . '<pre style="white-space:pre-wrap;font-family:inherit;color:#A1A1AA;font-size:13px;background:#111;padding:16px;border-radius:8px;">' . htmlspecialchars(stellio_findings_summary($audit)) . '</pre></div></div>';
        $bossFields = [
            'apikey' => $apiKey,
            'from' => $from,
            'fromName' => $fromName,
            'to' => 'hello@stellio.com.au',
            'subject' => 'Site audit PDF sent: ' . $host . ' (score ' . $overall . '/100)',
            'bodyHtml' => $bossHtml,
            'isTransactional' => 'true',
        ];
        $ch2 = curl_init('https://api.elasticemail.com/v2/email/send');
        curl_setopt_array($ch2, [CURLOPT_RETURNTRANSFER => true, CURLOPT_POST => true, CURLOPT_POSTFIELDS => $bossFields, CURLOPT_TIMEOUT => 30]);
        curl_exec($ch2);
        curl_close($ch2);
    }

    return ['ok' => !empty($json['success']), 'error' => $json['error'] ?? null];
}

// ---------- ROUTING ----------
$method = $_SERVER['REQUEST_METHOD'] ?? 'POST';
$action = null;
if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
} else {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?: [];
    $action = $input['action'] ?? 'audit';
}

// ---- GET /site-audit-api.php?action=count : public counter ----
if ($action === 'count') {
    if ($method !== 'GET') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }
    if (!$SB_URL || !$SB_ANON) { echo json_encode(['count' => null]); exit; }
    $resp = fetch($SB_URL . '/rest/v1/rpc/get_audit_count', [
        'post' => '{}',
        'headers' => ['Content-Type: application/json', 'apikey: ' . $SB_ANON, 'Authorization: Bearer ' . $SB_ANON],
        'timeout' => 10,
    ]);
    $count = json_decode($resp['body'], true);
    echo json_encode(['count' => is_numeric($count) ? (int)$count : null]);
    exit;
}

// ---- POST action=preview_pdf : return the generated PDF as base64 (internal QA) ----
if ($action === 'preview_pdf') {
    $audit = $input['audit'] ?? [];
    if (empty($audit['url'])) { http_response_code(400); echo json_encode(['error' => 'Audit data missing']); exit; }
    $pdfResult = stellio_build_audit_pdf($audit);
    if (!$pdfResult['ok']) { http_response_code(500); echo json_encode(['error' => $pdfResult['error']]); exit; }
    echo json_encode(['pdf_b64' => base64_encode(file_get_contents($pdfResult['path'])), 'filename' => $pdfResult['filename']]);
    @unlink($pdfResult['path']);
    exit;
}

// ---- POST action=send_pdf : generate branded PDF and email to lead ----
if ($action === 'resend_pdf') {
    // Admin action: re-run the full audit for a URL and queue the PDF email.
    // Used to regenerate reports that were rendered by an older/buggy template.
    $url = trim((string)($input['url'] ?? ''));
    $email = strtolower(trim((string)($input['email'] ?? '')));
    $token = (string)($input['admin_token'] ?? '');
    $adminToken = is_array($AUDIT_CONFIG) ? ($AUDIT_CONFIG['admin_token'] ?? '') : '';
    if ($adminToken === '' || !hash_equals($adminToken, $token)) {
        http_response_code(403); echo json_encode(['error' => 'Forbidden']); exit;
    }
    if (!preg_match('#^https?://#i', $url)) { http_response_code(400); echo json_encode(['error' => 'A full http(s) URL is required']); exit; }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(400); echo json_encode(['error' => 'A valid email is required']); exit; }

    $audit = stellio_run_audit($url, $OPENAI_KEY, $GOOGLE_PSI_KEY, $SB_URL, $SB_ANON);
    if (!($audit['ok'] ?? false)) { http_response_code(502); echo json_encode(['error' => $audit['error'] ?? 'Audit failed']); exit; }

    // Queue PDF job for the cron worker
    $queueDir = __DIR__ . '/audit-queue';
    if (!is_dir($queueDir)) { @mkdir($queueDir, 0750, true); }
    $jobFile = $queueDir . '/job_' . date('YmdHis') . '_' . bin2hex(random_bytes(4)) . '.json';
    $job = ['email' => $email, 'audit' => $audit['data'], 'queued_at' => date('c'), 'resend' => true];
    if (@file_put_contents($jobFile, json_encode($job)) === false) {
        http_response_code(500); echo json_encode(['error' => 'Could not queue the PDF']); exit;
    }
    echo json_encode(['queued' => true, 'opportunities' => count($audit['data']['opportunities'] ?? []), 'overall' => $audit['data']['overall_score'] ?? null]);
    exit;
}

if ($action === 'send_pdf') {
    if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }
    $email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $audit = $input['audit'] ?? [];
    if (!$email) { http_response_code(400); echo json_encode(['error' => 'A valid email address is required']); exit; }
    if (empty($audit['url']) || !isset($audit['overall_score'])) { http_response_code(400); echo json_encode(['error' => 'Audit data missing']); exit; }

    // Rate limit: max 4 PDF sends per email per hour
    $rlFile = sys_get_temp_dir() . '/stellio_pdf_rl_' . md5($email);
    $now = time();
    $rl = is_file($rlFile) ? (array)json_decode((string)file_get_contents($rlFile), true) : [];
    $rl = array_values(array_filter($rl, fn($t) => ($now - $t) < 3600));
    if (count($rl) >= 4) { http_response_code(429); echo json_encode(['error' => 'Too many PDF requests. Try again in a little while.']); exit; }
    $rl[] = $now;
    @file_put_contents($rlFile, json_encode($rl));

    // Queue the job - PDF render + email happen in the CLI worker (cron, every minute)
    // because FPM disables exec/proc_open (needed for headless chromium).
    $queueDir = __DIR__ . '/audit-queue';
    if (!is_dir($queueDir)) { @mkdir($queueDir, 0750, true); }
    $jobFile = $queueDir . '/job_' . date('YmdHis') . '_' . bin2hex(random_bytes(4)) . '.json';
    $job = ['email' => $email, 'audit' => $audit, 'queued_at' => date('c')];
    if (@file_put_contents($jobFile, json_encode($job)) === false) {
        http_response_code(500); echo json_encode(['error' => 'Could not queue the PDF. Please try again.']); exit;
    }
    echo json_encode(['sent' => true, 'queued' => true, 'message' => 'PDF is being generated - it will land in your inbox within a minute or two.']);
    exit;
}

// ---- default: action=audit ----
if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

// ---------- DEFAULT action=audit ----------
function stellio_run_audit(string $targetUrl, string $OPENAI_KEY, string $GOOGLE_PSI_KEY, string $SB_URL = '', string $SB_ANON = ''): array {
    // ---------- Normalise + validate ----------
    if (!preg_match('#^https?://#i', $targetUrl)) $targetUrl = 'https://' . $targetUrl;
    $host = parse_url($targetUrl, PHP_URL_HOST);
    if (!$host || !filter_var(gethostbyname($host), FILTER_VALIDATE_IP)) {
        return ['ok' => false, 'data' => null, 'error' => 'Invalid URL or domain does not resolve'];
    }

    // ---------- PARALLEL: page fetch + robots + sitemap ----------
    $pageReq = fetchParallel([
        'page'    => ['url' => $targetUrl, 'timeout' => 25],
        'robots'  => ['url' => rtrim($targetUrl, '/') . '/robots.txt', 'timeout' => 10],
        'sitemap' => ['url' => rtrim($targetUrl, '/') . '/sitemap.xml', 'timeout' => 10],
    ]);
    $html = $pageReq['page']['body'] ?? '';
    $pageStatus = $pageReq['page']['status'] ?? 0;

    if ($pageStatus === 0 || $pageStatus >= 500) {
        return ['ok' => false, 'data' => null, 'error' => "Could not reach the site (HTTP $pageStatus). Check the URL and try again."];
    }

    // ---------- 1. ON-PAGE ANALYSIS ----------
    $onPageChecks = [];
    $meta = [];

    // Title
    preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m);
    $title = isset($m[1]) ? trim(html_entity_decode($m[1])) : '';
    $meta['title'] = $title;
    $onPageChecks[] = finding('On-Page', 'Page title', $title ? "\"{$title}\" (" . strlen($title) . " chars)" : 'No <title> tag found', $title && strlen($title) >= 10 && strlen($title) <= 65, $title ? 'high' : 'critical', 'Keep titles 10-65 characters with your main keyword near the front.');

    // Meta description
    preg_match('/<meta\s+name=["\']description["\'][^>]*content=["\'](.*?)["\']/is', $html, $m);
    $desc = isset($m[1]) ? trim($m[1]) : '';
    $meta['description'] = $desc;
    $onPageChecks[] = finding('On-Page', 'Meta description', $desc ? "\"" . substr($desc, 0, 160) . "\" (" . strlen($desc) . " chars)" : 'No meta description found', $desc && strlen($desc) >= 50 && strlen($desc) <= 160, 'high', 'Write a 50-160 character description that sells the click.');

    // H1
    preg_match_all('/<h1[^>]*>(.*?)<\/h1>/is', $html, $m);
    $h1s = array_map(fn($h) => trim(strip_tags($h)), $m[1] ?? []);
    $meta['h1'] = $h1s[0] ?? '';
    $onPageChecks[] = finding('On-Page', 'H1 heading', $h1s ? (count($h1s) === 1 ? "Single H1: \"{$h1s[0]}\"" : count($h1s) . ' H1 tags found') : 'No H1 tag found', count($h1s) === 1 && strlen($h1s[0]) > 3, 'high', 'Use exactly one H1 per page that states what you offer.');

    // H2 structure
    preg_match_all('/<h2[^>]*>(.*?)<\/h2>/is', $html, $m);
    $h2Count = count($m[1] ?? []);
    $meta['h2Count'] = $h2Count;
    $onPageChecks[] = finding('On-Page', 'Content structure', $h2Count >= 2 ? "$h2Count H2 sections detected" : ($h2Count === 1 ? 'Only 1 H2 section' : 'No H2 headings found'), $h2Count >= 2, 'medium', 'Break content into scannable H2 sections - visitors skim before they read.');

    // Viewport
    $hasViewport = (bool)preg_match('/<meta\s+name=["\']viewport["\']/i', $html);
    $onPageChecks[] = finding('On-Page', 'Mobile viewport', $hasViewport ? 'Responsive viewport meta present' : 'No viewport meta tag - page will not scale on mobile', $hasViewport, 'critical', 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.');

    // Favicon
    $hasFavicon = (bool)preg_match('/<link[^>]+rel=["\'][^"\']*icon[^"\']*["\']/i', $html);
    $onPageChecks[] = finding('On-Page', 'Favicon', $hasFavicon ? 'Favicon present' : 'No favicon found', $hasFavicon, 'low', 'Add a favicon - it shows in browser tabs, bookmarks and Google results.');

    // Images + alt text
    preg_match_all('/<img\s[^>]*>/i', $html, $imgs);
    $imgCount = count($imgs[0]);
    $imgsWithAlt = 0;
    $imgsMissingAlt = 0;
    foreach ($imgs[0] as $img) {
        if (preg_match('/alt=["\'][^"\']+["\']/i', $img)) $imgsWithAlt++;
        elseif (preg_match('/alt=["\']["\']/i', $img)) {} // decorative empty alt is fine
        else $imgsMissingAlt++;
    }
    $altCoverage = $imgCount > 0 ? round(($imgsWithAlt / $imgCount) * 100) : 100;
    $onPageChecks[] = finding('On-Page', 'Image alt text', $imgCount === 0 ? 'No images found on the homepage' : "$imgsWithAlt of $imgCount images have alt text ($altCoverage%)", $imgCount === 0 || $altCoverage >= 80, 'medium', 'Describe every meaningful image in alt text for SEO and accessibility.');

    // Open Graph
    $hasOG = (bool)preg_match('/<meta\s+property=["\']og:title["\']/i', $html);
    $onPageChecks[] = finding('On-Page', 'Social sharing preview', $hasOG ? 'Open Graph tags present - links preview correctly on social' : 'No Open Graph tags - shared links show a bare URL', $hasOG, 'medium', 'Add og:title, og:description and og:image so shared links look professional.');

    // JSON-LD structured data
    $hasSchema = (bool)preg_match('/<script[^>]+application\/ld\+json/i', $html);
    $onPageChecks[] = finding('On-Page', 'Structured data', $hasSchema ? 'JSON-LD structured data present' : 'No JSON-LD schema found', $hasSchema, 'medium', 'Add JSON-LD schema (LocalBusiness, Organization, Product) so Google understands your site.');

    // HTTPS
    $scheme = parse_url($pageReq['page']['finalUrl'] ?: $targetUrl, PHP_URL_SCHEME) ?: 'http';
    $onPageChecks[] = finding('On-Page', 'HTTPS', $scheme === 'https' ? 'Site serves over HTTPS' : 'Site does not use HTTPS', $scheme === 'https', 'critical', 'Install an SSL certificate - browsers flag non-HTTPS sites as "Not secure".');

    // ---------- NEW CHECKS: contact + trust + content ----------
    $hasPhone = (bool)preg_match('/href=["\']tel:|(\+?61|0)[\s-]?\(?[234578]\)?[\s-]?\d{4}[\s-]?\d{4}/i', $html);
    $onPageChecks[] = finding('Trust', 'Phone number', $hasPhone ? 'Phone number visible or click-to-call' : 'No phone number found', $hasPhone, 'medium', 'Show your phone number - local buyers trust businesses they can call.');

    $hasEmailLink = (bool)preg_match('/href=["\']mailto:/i', $html);
    $onPageChecks[] = finding('Trust', 'Contact email', $hasEmailLink ? 'Email contact present' : 'No mailto contact found', $hasEmailLink, 'low', 'Make it easy to email you - a mailto link beats a contact form for trust.');

    $hasAddress = (bool)preg_match('/(QLD|NSW|VIC|SA|WA|TAS|NT|ACT|Australia|Abn|ABN)[\s:.]?\s?\d{0,11}/i', $html);
    $onPageChecks[] = finding('Trust', 'Business details (address/ABN)', $hasAddress ? 'Address, ABN or region details found' : 'No address or ABN visible', $hasAddress, 'medium', 'Show your suburb, state and ABN - it builds local credibility and helps local search.');

    $hasSocial = (bool)preg_match('/(facebook\.com|instagram\.com|linkedin\.com|twitter\.com|x\.com)/i', $html);
    $onPageChecks[] = finding('Trust', 'Social media links', $hasSocial ? 'Social profile links found' : 'No social media links found', $hasSocial, 'low', 'Link your active social profiles so visitors can verify you are real.');

    $copyrightYear = null;
    if (preg_match('/(?:©|&copy;|copyright)[^0-9]{0,12}(20\d{2})/i', $html, $cy)) $copyrightYear = (int)$cy[1];
    $currentYear = (int)date('Y');
    $copyrightOk = $copyrightYear !== null && $copyrightYear >= $currentYear - 1;
    $onPageChecks[] = finding('Trust', 'Copyright freshness', $copyrightYear === null ? 'No copyright year found' : "Copyright © {$copyrightYear}" . ($copyrightYear < $currentYear - 1 ? " - looks stale (now {$currentYear})" : ''), $copyrightOk, $copyrightYear !== null && $copyrightYear < $currentYear - 1 ? 'high' : 'low', $copyrightYear !== null && $copyrightYear < $currentYear - 1 ? 'Update the footer year automatically with JS or server code - a stale year screams neglect.' : 'Keep the copyright year current - a stale year signals neglect.');

    $hasReviews = (bool)preg_match('/(google reviews|trustpilot|productreview|5[- ]star|five star|testimonial|reviews)/i', $html);
    $onPageChecks[] = finding('Trust', 'Reviews or testimonials', $hasReviews ? 'Review or testimonial content found' : 'No reviews or testimonials visible', $hasReviews, 'medium', 'Add real reviews or testimonials - social proof converts sceptics.');

    $hasCta = (bool)preg_match('/(book|call|quote|contact|get started|enquire|inquire|enquiry|book a|free consultation|apply now|buy now|shop now|get a)/i', $html);
    $onPageChecks[] = finding('Conversion', 'Clear call to action', $hasCta ? 'Action words detected (book, call, quote, contact)' : 'No clear call-to-action phrases found', $hasCta, 'high', 'Every page needs one obvious next step - a button that says exactly what to do.');

    $stickyCta = (bool)preg_match('/(fixed|sticky)[^"]*"(?:bottom|top|nav|header)/i', $html) || (bool)preg_match('/position:\s*(?:fixed|sticky)/i', $html);
    $onPageChecks[] = finding('Conversion', 'Sticky navigation or CTA', $stickyCta ? 'Sticky elements detected' : 'No fixed header or sticky CTA found', $stickyCta, 'low', 'A sticky header keeps your contact button one tap away on mobile.');

    $wordCount = str_word_count(strip_tags(preg_replace('/<script.*?<\/script>|<style.*?<\/style>/is', '', $html)));
    $onPageChecks[] = finding('Content', 'Content depth', "$wordCount words of body copy on the homepage", $wordCount >= 300, 'medium', 'Aim for 300+ words on your homepage - thin pages rank poorly and convert worse.');

    $lastModified = null;
    foreach ($pageReq['page'] as $r) { /* placeholder */ }
    $onPageChecks[] = finding('Content', 'Content freshness', $lastModified !== null ? "Last modified: $lastModified" : 'Last-modified header not exposed', true, 'low', 'Publish or update content regularly - fresh sites earn trust and rank better.');

    // ---------- NEW CHECKS: technical health ----------
    // Compression
    $encodingOk = (bool)preg_match('/gzip|br|deflate/i', $pageReq['page']['body'] ?? '');
    $onPageChecks[] = finding('Technical', 'Compression', $encodingOk ? 'Compressed transfer looks enabled' : 'Could not verify compression - HTML may transfer uncompressed', true, 'medium', 'Enable gzip or brotli compression - it can cut page weight by 70%.');

    // Lazy loading
    $lazyImgs = 0;
    foreach ($imgs[0] as $img) { if (preg_match('/loading=["\']lazy["\']/i', $img)) $lazyImgs++; }
    $lazyPct = $imgCount > 0 ? round(($lazyImgs / $imgCount) * 100) : 100;
    $onPageChecks[] = finding('Technical', 'Image lazy loading', $imgCount === 0 ? 'No images to load' : "$lazyImgs of $imgCount images lazy-loaded ($lazyPct%)", $imgCount === 0 || $lazyPct >= 60, 'low', 'Add loading="lazy" to below-the-fold images for a faster first paint.');

    // Modern image formats
    $modernImgs = 0;
    foreach ($imgs[0] as $img) { if (preg_match('/\.(webp|avif)([?#]|")/i', $img)) $modernImgs++; }
    $onPageChecks[] = finding('Technical', 'Modern image formats', $imgCount === 0 ? 'No images found' : ($modernImgs > 0 ? "$modernImgs images use WebP/AVIF" : 'No WebP or AVIF images found'), $imgCount === 0 || $modernImgs > 0, 'low', 'Serve WebP or AVIF - same quality, roughly half the file size of JPEG or PNG.');

    // Analytics installed
    $hasAnalytics = (bool)preg_match('/(gtag\(|googletagmanager|plausible|matomo|umami|posthog|segment\.com|clarity\.ms)/i', $html);
    $onPageChecks[] = finding('Analytics', 'Analytics tracking', $hasAnalytics ? 'Analytics detected (GA4, GTM, Plausible, Matomo or similar)' : 'No analytics found - you are flying blind', $hasAnalytics, 'medium', 'Install analytics (GA4 or Plausible) - you cannot improve what you do not measure.');

    // Live chat
    $hasChat = (bool)preg_match('/(intercom|crisp\.chat|tawk\.to|drift\.com|livechat|zendesk|hubspot.*conversations|tawk)/i', $html);
    $onPageChecks[] = finding('Conversion', 'Live chat or messaging', $hasChat ? 'Live chat widget detected' : 'No live chat or messaging widget found', $hasChat, 'low', 'Add live chat or a messaging link (WhatsApp, Messenger) - some visitors will never fill in a form.');

    // Cookie consent
    $hasConsent = (bool)preg_match('/(cookiebot|osano|cookieconsent|iubenda|onetrust|termly|cookie consent|cookie-consent)/i', $html);
    $onPageChecks[] = finding('Compliance', 'Cookie consent', $hasConsent ? 'Cookie consent banner detected' : 'No cookie consent banner found', $hasConsent, 'low', 'If you run analytics or ad pixels, show a cookie consent banner - it is required in Australia under the Privacy Act.');

    // Accessibility: form labels
    $labelledInputs = 0; $totalInputs = 0;
    preg_match_all('/<(input|textarea|select)\s[^>]*>/i', $html, $forms);
    foreach ($forms[0] as $f) {
        if (!preg_match('/type=["\'](hidden|submit|button|checkbox|radio)["\']/i', $f)) {
            $totalInputs++;
            if (preg_match('/aria-label=|<label/i', $f)) $labelledInputs++;
        }
    }
    $onPageChecks[] = finding('Accessibility', 'Form labels', $totalInputs === 0 ? 'No forms on the homepage' : "$labelledInputs of $totalInputs inputs have labels", $totalInputs === 0 || ($labelledInputs / max($totalInputs, 1)) >= 0.8, 'medium', 'Label every form field - screen readers announce them and conversion improves.');

    // Accessibility: lang attribute
    $lang = '';
    if (preg_match('/<html[^>]*lang=["\']([^"\']+)["\']/i', $html, $lm)) $lang = $lm[1];
    $onPageChecks[] = finding('Accessibility', 'Page language', $lang ? "Language declared: {$lang}" : 'No lang attribute on <html>', !empty($lang), 'low', 'Set <html lang="en-AU"> - screen readers need it to pronounce content correctly.');

    // Robots.txt
    $hasRobots = ($pageReq['robots']['status'] ?? 0) === 200;
    $onPageChecks[] = finding('Crawlability', 'robots.txt', $hasRobots ? 'robots.txt found' : 'No robots.txt found', $hasRobots, 'medium', 'Add a robots.txt file to control how search engines crawl your site.');

    // Sitemap
    $hasSitemap = ($pageReq['sitemap']['status'] ?? 0) === 200;
    $onPageChecks[] = finding('Crawlability', 'XML sitemap', $hasSitemap ? 'sitemap.xml found' : 'No sitemap.xml found', $hasSitemap, 'medium', 'Publish a sitemap.xml and reference it in robots.txt so Google indexes every page.');

    // Page weight + speed
    $pageKb = round(($pageReq['page']['size'] ?? 0) / 1024);
    $ttfbMs = (int)round(($pageReq['page']['time'] ?? 0) * 1000);
    $onPageChecks[] = finding('Performance', 'Page weight', "{$pageKb} KB of HTML", $pageKb <= 200, 'high', 'Keep initial HTML under 200 KB - trim inline scripts and unnecessary markup.');
    $onPageChecks[] = finding('Performance', 'Server response', $ttfbMs > 0 ? "First byte in {$ttfbMs}ms" : 'Could not measure', $ttfbMs > 0 && $ttfbMs < 800, 'high', 'Get the first byte under 800ms with caching and a CDN.');

    // Tech fingerprint
    $tech = [];
    if (preg_match('/wp-content|wp-includes/i', $html)) $tech[] = 'WordPress';
    if (preg_match('/cdn\.shopify\.com|shopify/i', $html)) $tech[] = 'Shopify';
    if (preg_match('/squarespace/i', $html)) $tech[] = 'Squarespace';
    if (preg_match('/wixstatic|wix\.com/i', $html)) $tech[] = 'Wix';
    if (preg_match('/_next\/static/i', $html)) $tech[] = 'Next.js';
    if (preg_match('/vite|\/assets\/index-.*\.js/i', $html)) $tech[] = 'React/Vite';
    if (preg_match('/gtag\(|googletagmanager/i', $html)) $tech[] = 'Google Analytics';
    if (preg_match('/cal\.com|calendly/i', $html)) $tech[] = 'Online booking';
    if (preg_match('/hubspot/i', $html)) $tech[] = 'HubSpot';
    $meta['tech'] = $tech;
    $onPageChecks[] = finding('On-Page', 'Tech stack', $tech ? 'Detected: ' . implode(', ', $tech) : 'No common platforms detected (custom build or heavily optimised)', true, 'low', '');

    $onPageScore = scoreFromChecks($onPageChecks);

    // ---------- 2. DNS + DOMAIN ----------
    $dnsChecks = [];
    $dnsRecords = [];

    // A record
    $aRecords = @dns_get_record($host, DNS_A);
    $dnsRecords['A'] = array_map(fn($r) => $r['ip'], $aRecords ?: []);
    $dnsChecks[] = finding('DNS & Domain', 'A record', $dnsRecords['A'] ? 'Resolves to ' . implode(', ', $dnsRecords['A']) : 'No A record found', !empty($dnsRecords['A']), 'critical', '');

    // MX records (email)
    $mxRecords = @dns_get_record($host, DNS_MX);
    $mxHosts = array_map(fn($r) => $r['target'], $mxRecords ?: []);
    $dnsRecords['MX'] = $mxHosts;
    $dnsChecks[] = finding('DNS & Domain', 'Email (MX)', $mxHosts ? 'Mail handled by ' . implode(', ', array_slice($mxHosts, 0, 2)) : 'No MX records - no email on this domain', !empty($mxHosts), 'low', '');

    // NS records
    $nsRecords = @dns_get_record($host, DNS_NS);
    $nsHosts = array_map(fn($r) => $r['target'], $nsRecords ?: []);
    $dnsRecords['NS'] = $nsHosts;
    $dnsChecks[] = finding('DNS & Domain', 'Nameservers', $nsHosts ? implode(', ', array_slice($nsHosts, 0, 2)) : 'No NS records found', !empty($nsHosts), 'low', '');

    // SPF (email deliverability)
    $txtRecords = @dns_get_record($host, DNS_TXT);
    $txtStrings = array_map(fn($r) => $r['txt'] ?? '', $txtRecords ?: []);
    $hasSPF = (bool)array_filter($txtStrings, fn($t) => str_starts_with($t, 'v=spf1'));
    $hasDMARC = false;
    foreach ($txtStrings as $t) { if (str_starts_with($t, 'v=DMARC1')) $hasDMARC = true; }
    $dmarcRecords = @dns_get_record('_dmarc.' . $host, DNS_TXT);
    if ($dmarcRecords) $hasDMARC = $hasDMARC || (bool)array_filter(array_map(fn($r) => $r['txt'] ?? '', $dmarcRecords), fn($t) => str_starts_with($t, 'v=DMARC1'));
    $dnsChecks[] = finding('DNS & Domain', 'Email authentication (SPF)', $hasSPF ? 'SPF record present - email less likely to hit spam' : 'No SPF record - email from this domain may land in spam', $hasSPF, 'medium', 'Add a TXT record starting "v=spf1" so your email reaches inboxes.');
    $dnsChecks[] = finding('DNS & Domain', 'Email authentication (DMARC)', $hasDMARC ? 'DMARC policy published' : 'No DMARC record - domain is spoofable', $hasDMARC, 'medium', 'Add a DMARC TXT record on _dmarc.yourdomain to prevent spoofing.');

    // SSL certificate
    $sslExpiry = null; $sslIssuer = null;
    $context = stream_context_create(['ssl' => ['capture_peer_cert' => true, 'verify_peer' => false, 'verify_peer_name' => false, 'SNI_enabled' => true, 'peer_name' => $host]]);
    $sslOk = false;
    $errno = 0; $errstr = '';
    $fp = @stream_socket_client("ssl://{$host}:443", $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context);
    if ($fp) {
        $params = stream_context_get_params($fp);
        $cert = $params['options']['ssl']['peer_certificate'] ?? null;
        if ($cert) {
            $certArray = openssl_x509_parse($cert);
            if ($certArray) {
                $sslExpiry = $certArray['validTo_time_t'] ?? null;
                $sslIssuer = $certArray['issuer']['CN'] ?? ($certArray['issuer']['organizationName'] ?? '');
            }
        }
        $sslOk = true;
        fclose($fp);
    }
    $daysLeft = $sslExpiry ? (int)floor(($sslExpiry - time()) / 86400) : null;
    $sslDetail = $sslOk ? ($daysLeft !== null ? "SSL valid, expires in {$daysLeft} days (issuer: {$sslIssuer})" : "SSL present (issuer: {$sslIssuer})") : 'Could not connect via SSL on port 443';
    $dnsChecks[] = finding('DNS & Domain', 'SSL certificate', $sslDetail, $sslOk && ($daysLeft === null || $daysLeft > 21), $sslOk ? 'medium' : 'critical', $daysLeft !== null && $daysLeft <= 21 ? 'Renew your SSL certificate now - it expires in ' . $daysLeft . ' days.' : '');

    // Domain age via RDAP
    $domainAgeYears = null;
    $rdap = fetch("https://rdap.org/domain/" . urlencode($host), ['timeout' => 10]);
    if ($rdap['status'] === 200) {
        $rdapData = json_decode($rdap['body'], true);
        foreach ($rdapData['events'] ?? [] as $ev) {
            if (($ev['eventAction'] ?? '') === 'registration') {
                $reg = strtotime($ev['eventDate'] ?? '');
                if ($reg) $domainAgeYears = round((time() - $reg) / (365.25 * 86400), 1);
            }
        }
    }
    $dnsChecks[] = finding('DNS & Domain', 'Domain age', $domainAgeYears !== null ? "Registered {$domainAgeYears} years ago" : 'Registry data unavailable', true, 'low', '');

    $dnsScore = scoreFromChecks($dnsChecks);

    // ---------- 3. PERFORMANCE (PageSpeed Insights) ----------
    $psiData = null;
    $psiKeyParam = $GOOGLE_PSI_KEY ? "&key={$GOOGLE_PSI_KEY}" : '';
    $psi = fetch("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" . urlencode($targetUrl) . "&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo{$psiKeyParam}", ['timeout' => 60]);
    if ($psi['status'] === 200) {
        $psiData = json_decode($psi['body'], true);
    }

    $perfChecks = [];
    $psiScores = [];
    $cruxMetrics = [];
    $auditedUrl = $pageReq['page']['finalUrl'] ?: $targetUrl;

    if ($psiData && isset($psiData['lighthouseResult']['categories'])) {
        foreach ($psiData['lighthouseResult']['categories'] as $catId => $cat) {
            $s = $cat['score'] ?? null;
            if ($s !== null) $psiScores[$catId] = (int)round($s * 100);
        }
        $audits = $psiData['lighthouseResult']['audits'] ?? [];

        // Core Web Vitals from lab data
        $lcp = $audits['largest-contentful-paint']['numericValue'] ?? null;
        $cls = $audits['cumulative-layout-shift']['numericValue'] ?? null;
        $tbt = $audits['total-blocking-time']['numericValue'] ?? null;
        $perfScore = $psiScores['performance'] ?? null;

        $perfChecks[] = finding('Performance', 'Lighthouse performance', $perfScore !== null ? "Mobile performance score: {$perfScore}/100" : 'Score unavailable', ($perfScore ?? 0) >= 70, 'critical', 'Target 70+. Compress images, defer non-critical JS, and use a CDN.');
        if ($lcp !== null) {
            $lcpSec = round($lcp / 1000, 1);
            $perfChecks[] = finding('Performance', 'Largest Contentful Paint', "{$lcpSec}s until the main content appears", $lcp < 2500, 'critical', 'Get LCP under 2.5s - preload your hero image and cut render-blocking resources.');
        }
        if ($cls !== null) {
            $perfChecks[] = finding('Performance', 'Layout shift (CLS)', "CLS score: " . round($cls, 3), $cls < 0.1, 'high', 'Set width/height on images and embeds so content stops jumping as it loads.');
        }
        if ($tbt !== null) {
            $tbtMs = (int)$tbt;
            $perfChecks[] = finding('Performance', 'Total blocking time', "{$tbtMs}ms of JS blocking interaction", $tbt < 300, 'high', 'Split and defer heavy scripts - users should be able to tap within 300ms.');
        }

        // Real-user CrUX data
        $loading = $psiData['loadingExperience'] ?? [];
        if (!empty($loading['metrics'])) {
            $cruxMetrics = $loading['metrics'];
            $overall = $loading['overall_category'] ?? '';
            $perfChecks[] = finding('Real Users', 'Real-user experience (CrUX)', "Chrome real-user data: {$overall}", $overall === 'FAST' || $overall === 'AVERAGE', 'high', 'This is how actual visitors experience your site. Fix CWV failures first.');
            foreach (['largest_contentful_paint', 'cumulative_layout_shift', 'first_input_delay'] as $metric) {
                if (isset($cruxMetrics[$metric])) {
                    $cat = $cruxMetrics[$metric]['category'] ?? '';
                    $perfChecks[] = finding('Real Users', 'Field ' . str_replace('_', ' ', $metric), ucfirst($cat), in_array($cat, ['FAST', 'AVERAGE']), 'high', '');
                }
            }
        }
    } else {
        $perfChecks[] = finding('Performance', 'Lighthouse scan', 'Google PageSpeed quota reached - lab metrics unavailable this run', true, 'low', '');
    }

    $perfScore = scoreFromChecks($perfChecks);

    // ---------- 4. AI DESIGN AUDIT ----------
    $aiDesign = null;
    $screenshotUrl = null;

    // Get screenshot via microlink (free tier, no key)
    $micro = fetch("https://api.microlink.io/?url=" . urlencode($targetUrl) . "&screenshot=true&meta=false&screenshot.viewport.width=1280&screenshot.viewport.height=800", ['timeout' => 45]);
    if ($micro['status'] === 200) {
        $microData = json_decode($micro['body'], true);
        $screenshotUrl = $microData['data']['screenshot']['url'] ?? null;
    }

    if ($screenshotUrl && $OPENAI_KEY && $OPENAI_KEY !== 'REPLACE_WITH_OPENAI_KEY') {
        $shot = fetch($screenshotUrl, ['timeout' => 30]);
        if ($shot['status'] === 200 && strlen($shot['body']) > 1000) {
            $imgB64 = base64_encode($shot['body']);
            $designPrompt = <<<PROMPT
    You are a senior UI/UX design auditor reviewing a website screenshot for a small business owner. Use Australian English spelling exclusively (colour, optimise, organise, centre, behaviour, licence, favourite).
    Assess: visual hierarchy, colour harmony and contrast, typography quality, spacing and whitespace, CTA (button) visibility and contrast, trust signals, overall modern vs dated feel.
    Return STRICT JSON only, no markdown fences:
    {
      "design_score": <0-100 integer>,
      "overall_impression": "<one sentence summary>",
      "strengths": ["<2-4 concrete strengths>"],
      "issues": [{"title": "<short issue name>", "detail": "<what is wrong and why it matters>", "severity": "low|medium|high"}],
      "modernity": "dated|somewhat-dated|modern|cutting-edge",
      "recommendations": ["<2-4 specific actionable recommendations>"]
    }
    Judge against modern 2026 web design standards.
    PROMPT;
            $aiPayload = json_encode([
                'model' => $AI_MODEL,
                'messages' => [['role' => 'user', 'content' => [
                    ['type' => 'text', 'text' => $designPrompt],
                    ['type' => 'image_url', 'image_url' => ['url' => 'data:image/png;base64,' . $imgB64]],
                ]]],
                'max_tokens' => 900,
                'temperature' => 0.4,
            ]);
            $aiResp = fetch('https://api.openai.com/v1/chat/completions', ['post' => $aiPayload, 'headers' => ['Content-Type: application/json', 'Authorization: Bearer ' . $OPENAI_KEY], 'timeout' => 90]);
            if ($aiResp['status'] === 200) {
                $aiData = json_decode($aiResp['body'], true);
                $content = trim($aiData['choices'][0]['message']['content'] ?? '');
                $content = preg_replace('/^```(json)?\s*|\s*```$/', '', $content);
                $parsed = json_decode($content, true);
                if (json_last_error() === JSON_ERROR_NONE && isset($parsed['design_score'])) {
                    $aiDesign = auEnglishDeep($parsed);
                }
            }
        }
    }

    $designScore = $aiDesign['design_score'] ?? null;

    // ---------- COMPOSITE SCORE ----------
    // Weighted: on-page 30%, performance 30%, DNS/domain 15%, AI design 25%
    $compositeParts = [
        ['score' => $onPageScore, 'weight' => 0.30],
        ['score' => $perfScore, 'weight' => 0.30],
        ['score' => $dnsScore, 'weight' => 0.15],
        ['score' => $designScore ?? 70, 'weight' => 0.25],
    ];
    $composite = 0;
    foreach ($compositeParts as $p) $composite += $p['score'] * $p['weight'];
    $overallScore = (int)round($composite);

    // ---------- OPPORTUNITIES (sorted by impact) ----------
    $allChecks = array_merge($onPageChecks, $dnsChecks, $perfChecks);
    $opportunities = array_values(array_filter($allChecks, fn($c) => !$c['passed']));
    $impactOrder = ['critical' => 0, 'high' => 1, 'medium' => 2, 'low' => 3];
    usort($opportunities, fn($a, $b) => ($impactOrder[$a['impact']] ?? 4) <=> ($impactOrder[$b['impact']] ?? 4));

    // Add AI design issues to opportunities
    if ($aiDesign && !empty($aiDesign['issues'])) {
        foreach ($aiDesign['issues'] as $iss) {
            $opportunities[] = [
                'category' => 'AI Design Audit',
                'title' => $iss['title'] ?? 'Design issue',
                'detail' => $iss['detail'] ?? '',
                'passed' => false,
                'impact' => $iss['severity'] ?? 'medium',
                'fix' => '',
            ];
        }
        usort($opportunities, fn($a, $b) => ($impactOrder[$a['impact']] ?? 4) <=> ($impactOrder[$b['impact']] ?? 4));
    }

    // ---------- OUTPUT ----------
    $response = [
        'url' => $auditedUrl,
        'host' => $host,
        'scanned_at' => date('c'),
        'overall_score' => $overallScore,
        'scores' => [
            'on_page' => $onPageScore,
            'performance' => $perfScore,
            'dns_domain' => $dnsScore,
            'design' => $designScore,
        ],
        'psi_scores' => $psiScores,
        'crux' => $cruxMetrics ? ['overall' => $loading['overall_category'] ?? '', 'metrics' => array_map(fn($m) => ['percentile' => $m['percentile'] ?? null, 'category' => $m['category'] ?? ''], $cruxMetrics)] : null,
        'meta' => $meta,
        'dns' => ['records' => $dnsRecords, 'ssl' => ['expires_days' => $daysLeft, 'issuer' => $sslIssuer], 'domain_age_years' => $domainAgeYears],
        'page' => ['html_kb' => $pageKb, 'ttfb_ms' => $ttfbMs, 'status' => $pageStatus],
        'ai_design' => $aiDesign,
        'screenshot_url' => $screenshotUrl,
        'checks' => $allChecks,
        'opportunities' => array_slice($opportunities, 0, 25),
        'opportunity_count' => count($opportunities),
    ];

    // Server-side analytics log (fixes admin panel gap - browser inserts were unreliable)
    logAuditToSupabase($SB_URL, $SB_ANON, [
        'url' => $response['url'],
        'host' => $response['host'],
        'overall_score' => $response['overall_score'],
        'on_page_score' => $response['scores']['on_page'],
        'performance_score' => $response['scores']['performance'],
        'dns_score' => $response['scores']['dns_domain'],
        'design_score' => $response['scores']['design'],
        'opportunity_count' => $response['opportunity_count'],
    ]);

    // response returned via ['data' => $response]

    return ['ok' => true, 'data' => $response, 'error' => null];
}

if ($action === 'audit') {
    if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }
    $targetUrl = trim($input['url'] ?? '');
    if (!$targetUrl) { http_response_code(400); echo json_encode(['error' => 'Missing url']); exit; }
    $result = stellio_run_audit($targetUrl, $OPENAI_KEY, $GOOGLE_PSI_KEY, $SB_URL, $SB_ANON);
    if (!$result['ok']) { http_response_code(502); echo json_encode(['error' => $result['error']]); exit; }
    echo json_encode($result['data'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
