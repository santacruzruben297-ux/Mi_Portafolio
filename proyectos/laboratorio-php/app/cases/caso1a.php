<?php
declare(strict_types=1);
// Caso 1A · Elevar al cuadrado
require_once __DIR__.'/../lib/funciones.php';

function cuadrado(int $n): int {
    return $n * $n;
}
function resolver(array $datos): array {
    $n = numero($datos, 'n', -1000000, 1000000, true);
    return ['Número' => (string)$n, 'Cuadrado' => (string)cuadrado($n)];
}
