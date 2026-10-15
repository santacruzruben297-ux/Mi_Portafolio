<?php
declare(strict_types=1);
// Caso 6A · Calculadora de IGV
require_once __DIR__.'/../lib/funciones.php';

require_once __DIR__.'/../lib/calculos.php';
function resolver(array $datos): array {
    $monto = numero($datos, 'monto', 0, 1000000);
    if (abs($monto * 100 - round($monto * 100)) > 0.00001) {
        throw new InvalidArgumentException('El monto debe tener como máximo dos decimales.');
    }
    $igv = calcularIgv($monto);
    return ['Subtotal' => 'S/ '.formato($monto), 'IGV (18 %)' => 'S/ '.formato($igv), 'Total' => 'S/ '.formato($monto + $igv)];
}
