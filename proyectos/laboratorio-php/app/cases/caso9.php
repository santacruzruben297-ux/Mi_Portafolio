<?php
declare(strict_types=1);
// Caso 9 · Área de un círculo
require_once __DIR__.'/../lib/funciones.php';

function areaCirculo(float $radio): float {
    return pi() * pow($radio, 2);
}
function resolver(array $datos): array {
    $radio = numero($datos, 'radio', 0.01, 1000000);
    return ['Radio' => formato($radio).' m', 'Área' => number_format(areaCirculo($radio), 2, '.', ',').' m²'];
}
