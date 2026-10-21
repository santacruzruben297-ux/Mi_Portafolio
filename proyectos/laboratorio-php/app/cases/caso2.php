<?php
declare(strict_types=1);
// Caso 2 · Área de un cuadrado
require_once __DIR__.'/../lib/funciones.php';

function areaCuadrado(float $lado): float {
    return $lado * $lado;
}
function resolver(array $datos): array {
    $lado = numero($datos, 'lado', 0.01, 1000000);
    return ['Lado' => formato($lado).' m', 'Área' => formato(areaCuadrado($lado)).' m²'];
}
