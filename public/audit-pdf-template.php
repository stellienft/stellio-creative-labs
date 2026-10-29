<?php
/**
 * Stellio audit PDF template renderer.
 * Renders the exact reference design (cream/orange, Onest/Geist Mono/Instrument Serif)
 * as a self-contained HTML string with all fonts embedded, then prints to PDF via
 * headless Chromium on the server.
 */

// Star mark (Stellio logo mark) as inline SVG - simple 8-point star
function stellio_star_svg(int $size, string $colour = '#FF520E'): string {
    return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
        . '<path d="M12 1L14.2 9.8L23 12L14.2 14.2L12 23L9.8 14.2L1 12L9.8 9.8L12 1Z" fill="' . $colour . '"/></svg>';
}

/** Severity badge (matches reference Badge tones: accent = orange, soft = muted) */
function stellio_badge_html(string $level): string {
    $level = strtoupper($level);
    $isHigh = in_array($level, ['HIGH', 'CRITICAL']);
    $colour = $isHigh ? '#E64609' : '#8C8578';
    $bg = $isHigh ? '#FFE3D5' : '#F2E3BC';
    return '<span style="display:inline-flex;align-items:center;height:20px;padding:0 9px;border-radius:999px;'
        . 'background:' . $bg . ';color:' . $colour . ';font-family:\'Geist Mono\',monospace;font-weight:600;'
        . 'font-size:10px;letter-spacing:.12em;white-space:nowrap">' . htmlspecialchars($level) . '</span>';
}

/** Build the full self-contained HTML document for the audit */
function stellio_audit_html(array $audit, string $fontsCss): string {
    $url = $audit['url'] ?? '';
    $host = parse_url($url, PHP_URL_HOST) ?: $url;
    $overall = (int)($audit['overall_score'] ?? 0);
    $s = $audit['scores'] ?? [];
    $opps = array_slice($audit['opportunities'] ?? [], 0, 25);
    $design = $audit['ai_design'] ?? null;
    $recs = array_slice(($design['recommendations'] ?? []), 0, 4);
    $scanDate = date('j F Y', strtotime($audit['scanned_at'] ?? 'now'));
    $impression = $design['overall_impression'] ?? '';

    $scores = [
        ['ON-PAGE & SEO', $s['on_page'] ?? null],
        ['PERFORMANCE', $s['performance'] ?? null],
        ['DNS & DOMAIN', $s['dns_domain'] ?? null],
        ['AI DESIGN', $s['design'] ?? null],
    ];

    // ---- Build score cards ----
    $cardsHtml = '';
    foreach ($scores as [$label, $val]) {
        $pct = max(0, min(100, (int)($val ?? 0)));
        $cardsHtml .= '<div style="border:1px solid #F2E3BC;border-radius:20px;padding:18px 18px 16px;background:#FFFCF3;display:flex;flex-direction:column;gap:14px">'
            . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:10px;letter-spacing:.12em;color:#5C574E;white-space:nowrap">' . $label . '</span>'
            . '<span style="font-weight:500;font-size:40px;letter-spacing:-.03em;line-height:1;color:#0D0D0D">' . ($val === null ? '-' : (int)$val) . '</span>'
            . '<div style="height:3px;border-radius:999px;background:#F2E3BC;overflow:hidden"><div style="height:100%;width:' . $pct . '%;background:#FF520E"></div></div>'
            . '</div>';
    }

    // ---- Design recommendations ----
    $recsHtml = '';
    if ($recs) {
        $recsHtml = '<div style="border-top:1px solid #F2E3BC;padding-top:20px;display:flex;flex-direction:column;gap:14px">'
            . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:10px;letter-spacing:.14em;color:#5C574E">DESIGN RECOMMENDATIONS</span>'
            . '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px">';
        foreach ($recs as $i => $r) {
            $recsHtml .= '<div style="display:flex;gap:12px;align-items:flex-start;border:1px solid #F2E3BC;border-radius:12px;padding:14px 16px;background:#FFFCF3">'
                . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:11px;color:#FF520E;padding-top:2px">' . sprintf('%02d', $i + 1) . '</span>'
                . '<span style="font-size:13.5px;line-height:1.5;color:#2B2A28">' . htmlspecialchars($r) . '</span>'
                . '</div>';
        }
        $recsHtml .= '</div></div>';
    }

    // ---- Opportunities rows ----
    $oppsHtml = [];
    foreach ($opps as $i => $o) {
        $fix = '';
        if (!empty($o['fix'])) {
            $fix = '<span style="font-size:11.5px;line-height:1.45;color:#5C574E">'
                . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:10px;letter-spacing:.14em;color:#0D0D0D">FIX: </span>'
                . htmlspecialchars($o['fix']) . '</span>';
        }
        $oppsHtml[] = '<div class="opp-row" style="display:grid;grid-template-columns:26px minmax(0,1fr) auto;gap:10px;padding:9px 0;border-bottom:1px solid #F2E3BC;align-items:start;break-inside:avoid">'
            . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:11.5px;color:#FF520E;padding-top:2px">' . sprintf('%02d', $i + 1) . '</span>'
            . '<div style="display:flex;flex-direction:column;gap:3px">'
            . '<span style="font-weight:500;font-size:14px;letter-spacing:-.01em;color:#0D0D0D">' . htmlspecialchars($o['title'] ?? '') . '</span>'
            . '<span style="font-size:12px;line-height:1.45;color:#2B2A28">' . htmlspecialchars($o['detail'] ?? '') . '</span>'
            . $fix
            . '</div>'
            . stellio_badge_html($o['impact'] ?? 'medium')
            . '</div>';
    }

    $designSection = '';
    if ($design) {
        $designSection = '<div style="display:flex;flex-direction:column;gap:16px;padding-top:4px">'
            . '<div style="display:flex;align-items:center;gap:10px">'
            . stellio_star_svg(14)
            . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#0D0D0D">AI Visual Design Audit</span>'
            . '</div>'
            . '<p style="margin:0;font-size:22px;line-height:1.35;font-weight:500;letter-spacing:-.015em;color:#0D0D0D;max-width:40ch">' . htmlspecialchars($impression) . '</p>'
            . '</div>'
            . $recsHtml;
    }

    // Pagination: compact rows -> up to 16 opportunities share ONE page with the CTA
    // pinned at the bottom (matches the reference layout). Longer lists flow in
    // pages of 16 rows; the CTA gets its own page only when the last chunk is full.
    $perPage = 16;
    $oppChunks = $oppsHtml ? array_chunk($oppsHtml, $perPage) : [];
    $numOppPages = count($oppChunks);
    $ctaOnOwnPage = ($numOppPages > 0) && (count(end($oppChunks)) > 12);
    $totalPages = $numOppPages + 1 + ($ctaOnOwnPage ? 1 : 0);

    $html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>'
        . $fontsCss . '
        * { margin:0; padding:0; box-sizing:border-box; }
        @page { size: A4; margin: 0; }
        body { font-family: \'Onest\', sans-serif; color: #2B2A28; background: #FFF6DD; }
        html, body { background: #FFF6DD; }
        .page { padding: 40px 44px 20px; display: flex; flex-direction: column; gap: 22px; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .footer { margin-top: 24px; display: flex; justify-content: space-between; font-family: \'Geist Mono\', monospace; font-size: 10px; letter-spacing: .14em; color: #8C8578; }
        .opp-row { break-inside: avoid; }
        .cta-panel { break-inside: avoid; margin-top: 24px; }
    </style></head><body>'

    // ==================== PAGE 1 ====================
    . '<div class="page">'
        . '<div class="header">'
        . '<div style="display:flex;align-items:center;gap:10px">' . stellio_star_svg(22)
        . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#0D0D0D">Stellio Creative Labs</span></div>'
        . '<span style="font-family:\'Geist Mono\',monospace;font-size:11px;letter-spacing:.06em;color:#5C574E">stellio.com.au</span>'
        . '</div>'

        // hero card with corner brackets
        . '<div style="position:relative;border:1px solid #F2E3BC;border-radius:20px;padding:36px 36px 32px;background:#FFFCF3">'
        . '<div style="position:absolute;top:-1px;left:-1px;width:28px;height:28px;border-top:2px solid #FF520E;border-left:2px solid #FF520E;border-top-left-radius:20px"></div>'
        . '<div style="position:absolute;bottom:-1px;right:-1px;width:28px;height:28px;border-bottom:2px solid #FF520E;border-right:2px solid #FF520E;border-bottom-right-radius:20px"></div>'
        . '<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end">'
        . '<div style="display:flex;flex-direction:column;gap:14px">'
        . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5C574E">Scanned &middot; ' . htmlspecialchars($scanDate) . '</span>'
        . '<h1 style="margin:0;font-weight:500;font-size:44px;letter-spacing:-.03em;line-height:.98;color:#0D0D0D">Website audit</h1>'
        . '<div style="height:3px;width:220px;background:linear-gradient(90deg,#FF520E 0 56px,#F2E3BC 56px 100%)"></div>'
        . '<div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">'
        . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:10px;letter-spacing:.14em;color:#5C574E">SITE</span>'
        . '<span style="font-family:\'Geist Mono\',monospace;font-size:14px;color:#0D0D0D">' . htmlspecialchars($url) . '</span>'
        . '</div></div>'
        . '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">'
        . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:10px;letter-spacing:.14em;color:#5C574E">OVERALL SCORE</span>'
        . '<div style="display:flex;align-items:baseline;gap:4px;line-height:1">'
        . '<span style="font-weight:500;font-size:96px;letter-spacing:-.04em;color:#0D0D0D">' . $overall . '</span>'
        . '<span style="font-family:\'Instrument Serif\',serif;font-style:italic;font-size:36px;color:#FF520E">/100</span>'
        . '</div></div></div></div>'

        // score cards
        . '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px">' . $cardsHtml . '</div>'

        // AI design section
        . $designSection

        // (no per-page footer here - document flows continuously; single footer at end)
    ; // terminate the page-1 concatenation that started above; the .page div stays OPEN

    // ==================== OPPORTUNITIES (continuous flow, same .page container as the hero) ====================
    if ($oppsHtml) {
        $html .= '<div style="display:flex;align-items:baseline;gap:12px">'
            . '<h2 style="margin:0;font-weight:500;font-size:26px;letter-spacing:-.02em;color:#0D0D0D">Opportunities</h2>'
            . '<span style="font-family:\'Geist Mono\',monospace;font-weight:600;font-size:13px;color:#FF520E">(' . count($opps) . ')</span>'
            . '</div>';

        $twoCol = count($opps) > 10;
        $listStyle = $twoCol
            ? 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:28px;border-top:1px solid #0D0D0D'
            : 'display:flex;flex-direction:column;border-top:1px solid #0D0D0D';
        $html .= '<div style="' . $listStyle . '" class="opp-list">' . implode('', $oppsHtml) . '</div>';
    }

    // CTA right after opportunities (own panel, breaks to new page only if needed)
    $html .= cta_block_html();

    // Single footer at the very end
    $html .= '<div class="footer"><span>WEBSITE AUDIT REPORT &middot; ' . strtoupper(htmlspecialchars($host)) . '</span><span style="color:#FF520E">BUILD BOLD. LAUNCH SMARTER.</span></div>';

    $html .= '</div>'; // close page-1 container (single .page div - content flows naturally)

    $html .= '</body></html>';

    return $html;
}

/** The CTA panel HTML (compact, reference-styled) */
function cta_block_html(): string {
    return '<div class="cta-panel" style="background:#0D0D0D;border-radius:16px;padding:26px 30px;display:flex;flex-direction:column;gap:12px;position:relative;overflow:hidden">'
        . '<div style="position:absolute;right:-30px;top:-30px;opacity:.5">' . stellio_star_svg(130) . '</div>'
        . '<h2 style="margin:0;font-weight:500;font-size:30px;letter-spacing:-.025em;line-height:1.05;color:#FFF6DD;position:relative">Want these <span style="font-family:\'Instrument Serif\',serif;font-style:italic;font-weight:400;color:#FF520E">fixed?</span></h2>'
        . '<p style="margin:0;font-size:13px;line-height:1.55;color:#D8D0BE;max-width:56ch;position:relative">Stellio Creative Labs builds fast, modern, conversion-focused websites for Australian businesses. Book a free call and we will walk through this audit together - what to fix first, what it costs, and what results to expect.</p>'
        . '<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;position:relative">'
        . '<span style="display:inline-flex;align-items:center;height:36px;padding:0 18px;border-radius:999px;background:#FF520E;color:#FFF6DD;font-family:\'Geist Mono\',monospace;font-weight:600;font-size:11px;letter-spacing:.14em">STELLIO.COM.AU/CONTACT</span>'
        . '</div></div>';
}

/** Render the audit HTML to PDF via headless chromium, save to temp file */
function stellio_build_audit_pdf_from_template(array $audit): array {
    $fontsCss = @file_get_contents(__DIR__ . '/audit-fonts.css');
    if ($fontsCss === false) {
        return ['ok' => false, 'error' => 'audit-fonts.css missing (embedded fonts)'];
    }

    $html = stellio_audit_html($audit, $fontsCss);

    $tmpHtml = tempnam(sys_get_temp_dir(), 'stellio_audit_') . '.html';
    $tmpPdf = tempnam(sys_get_temp_dir(), 'stellio_audit_') . '.pdf';
    file_put_contents($tmpHtml, $html);

    $chrome = '/home/master/chrome/chrome-headless-shell';
    $libPath = '/home/master/lib/extracted/usr/lib/x86_64-linux-gnu';
    $cmd = 'LD_LIBRARY_PATH=' . escapeshellarg($libPath) . ' '
        . escapeshellarg($chrome)
        . ' --headless --disable-gpu --no-sandbox --disable-dev-shm-usage'
        . ' --no-pdf-header-footer'
        . ' --print-to-pdf=' . escapeshellarg($tmpPdf)
        . ' --virtual-time-budget=8000'
        . ' ' . escapeshellarg('file://' . $tmpHtml)
        . ' 2>&1';

    $proc = proc_open($cmd, [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
    $outStr = '';
    if (is_resource($proc)) {
        $outStr = stream_get_contents($pipes[1]) . stream_get_contents($pipes[2]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        proc_close($proc);
    }
    @unlink($tmpHtml);

    if (!is_file($tmpPdf) || filesize($tmpPdf) < 2000) {
        @unlink($tmpPdf);
        return ['ok' => false, 'error' => 'PDF render failed: ' . mb_substr($outStr, -400)];
    }

    $host = parse_url($audit['url'] ?? '', PHP_URL_HOST) ?: 'site';
    $filename = 'stellio-audit-' . preg_replace('/[^a-z0-9.-]+/i', '-', $host) . '.pdf';
    return ['ok' => true, 'path' => $tmpPdf, 'filename' => $filename];
}
