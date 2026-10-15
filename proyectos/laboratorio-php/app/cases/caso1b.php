<?php
declare(strict_types=1);
// Caso 1B · Producto de dos enteros
require_once __DIR__.'/../lib/funciones.php';

function producto(int $a, int $b): int {
    return $a * $b;
}
function resolver(array $datos): array {
    $a = numero($datos, 'a', -1000000, 1000000, true);
    $b = numero($datos, 'b', -1000000, 1000000, true);
    return ['Operación' => "$a × $b", 'Producto' => (string)producto($a, $b)];
}
