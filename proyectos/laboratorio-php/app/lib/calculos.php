<?php
declare(strict_types=1);
/** Caso 6A: el IGV equivale al 18 % del monto base. */
function calcularIgv(float $monto): float {
    return round($monto * 0.18, 2);
}
