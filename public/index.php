<?php
/**
 * Stellio SPA fallback (index.php) — soft-404 fix.
 *
 * Serves index.html for valid routes; returns a REAL 404 with noindex for
 * anything else (unknown paths previously returned 200 + the SPA shell, so
 * search engines could index junk like /team, /login, /pricing).
 *
 * Valid = static app route, DB-driven route family (/for/, /blog/, /examples/),
 * or a slug listed in the DB-generated sitemap.xml.
 *
 * Also sets security headers + a short HTML cache here, because .htaccess is
 * not enforced for PHP on this server (verified: its Cache-Control and
 * rewrite blocks never reach the browser).
 */

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = $path === false ? '/' : $path;
if ($path === '/index.php' || $path === '/index.html') $path = '/';
$path = rtrim($path, '/');
if ($path === '') $path = '/';

// Static routes — keep in sync with src/App.jsx
$static = [
    '/', '/about', '/work', '/services', '/blog', '/contact', '/faq',
    '/site-audit', '/ai-audit', '/eofy', '/privacy', '/terms',
    '/onboarding', '/web-questionnaire', '/logo-questionnaire',
    '/showcase', '/admin',
];

$valid = in_array($path, $static, true);

// DB-driven route families (pages CMS slugs, blog posts, niche landings, templates)
if (!$valid) {
    foreach (['/for/', '/blog/', '/examples/'] as $prefix) {
        if (strpos($path, $prefix) === 0) { $valid = true; break; }
    }
}

// Remaining pages-CMS slugs live in the DB-generated sitemap — honour those too
if (!$valid) {
    $sitemap = @file_get_contents(__DIR__ . '/sitemap.xml');
    if ($sitemap !== false && preg_match_all('#<loc>\s*(https?://[^<]+?)/?\s*</loc>#i', $sitemap, $m)) {
        foreach ($m[1] as $loc) {
            $u = parse_url($loc, PHP_URL_PATH);
            $u = rtrim((string)$u, '/');
            if ($u === $path) { $valid = true; break; }
        }
    }
}

if (!$valid) {
    http_response_code(404);
    header('X-Robots-Tag: noindex, nofollow');
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="robots" content="noindex, nofollow"><title>404 Not Found</title></head><body><h1>404</h1><p>Page not found.</p></body></html>';
    exit;
}

// Security headers (server-side; .htaccess is not enforced for PHP here)
header('Strict-Transport-Security: max-age=31536000');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
// Cache the SPA shell briefly so repeat hits are instant; short enough to pick up deploys
header('Cache-Control: public, max-age=60');

include __DIR__ . '/index.html';
