<?php
// FPDF 1.9 shim: expose namespaced class as global FPDF with RoundedRect/NbLines polyfills
require_once __DIR__ . '/Fpdf.php';

if (!class_exists('FPDF', false)) {
    class FPDF extends \Fpdf\Fpdf {
        // Rounded rectangle (from FPDF official rounded rectangles script, MIT-style public snippet)
        function RoundedRect($x, $y, $w, $h, $r, $style = 'D') {
            $k = $this->k;
            $hp = $this->h;
            $op = $style === 'F' ? 'f' : ($style === 'FD' || $style === 'DF' ? 'B' : 'S');
            $MyArc = 4 / 3 * (sqrt(2) - 1);
            $this->_out(sprintf('%.2F %.2F m', ($x + $r) * $k, ($hp - $y) * $k));
            $this->_out(sprintf('%.2F %.2F l', ($x + $w - $r) * $k, ($hp - $y) * $k));
            $this->_Arc($x + $w - $r + $r * $MyArc, $y, $x + $w, $y + $r - $r * $MyArc, $x + $w, $y + $r);
            $this->_out(sprintf('%.2F %.2F l', ($x + $w) * $k, ($hp - ($y + $h - $r)) * $k));
            $this->_Arc($x + $w, $y + $h - $r + $r * $MyArc, $x + $w - $r + $r * $MyArc, $y + $h, $x + $w - $r, $y + $h);
            $this->_out(sprintf('%.2F %.2F l', ($x + $r) * $k, ($hp - ($y + $h)) * $k));
            $this->_Arc($x + $r - $r * $MyArc, $y + $h, $x, $y + $h - $r + $r * $MyArc, $x, $y + $h - $r);
            $this->_out(sprintf('%.2F %.2F l', $x * $k, ($hp - ($y + $r)) * $k));
            $this->_Arc($x, $y + $r - $r * $MyArc, $x + $r - $r * $MyArc, $y, $x + $r, $y);
            $this->_out($op);
        }
        function _Arc($x1, $y1, $x2, $y2, $x3, $y3) {
            $h = $this->h;
            $this->_out(sprintf('%.2F %.2F %.2F %.2F %.2F %.2F c ', $x1 * $this->k, ($h - $y1) * $this->k, $x2 * $this->k, ($h - $y2) * $this->k, $x3 * $this->k, ($h - $y3) * $this->k));
        }
        // Number of lines a MultiCell of width w will take for text (official FPDF script)
        function NbLines($w, $txt) {
            $cw =& $this->CurrentFont['cw'];
            if ($w == 0) $w = $this->w - $this->rMargin - $this->x;
            $wmax = ($w - 2 * $this->cMargin) * 1000 / $this->FontSize;
            $s = str_replace("\r", '', $txt);
            $nb = strlen($s);
            if ($nb > 0 && $s[$nb - 1] == "\n") $nb--;
            $sep = -1; $i = 0; $j = 0; $l = 0; $nl = 1;
            while ($i < $nb) {
                $c = $s[$i];
                if ($c == "\n") { $i++; $sep = -1; $j = $i; $l = 0; $nl++; continue; }
                if ($c == ' ') $sep = $i;
                $l += $cw[$c] ?? 500;
                if ($l > $wmax) {
                    if ($sep == -1) { if ($i == $j) $i++; }
                    else $i = $sep + 1;
                    $sep = -1; $j = $i; $l = 0; $nl++;
                } else $i++;
            }
            return $nl;
        }
    }
}
