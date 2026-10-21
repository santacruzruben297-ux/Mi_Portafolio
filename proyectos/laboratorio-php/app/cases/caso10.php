<?php
declare(strict_types=1);
// Caso 10 · Hipotenusa de un triángulo
require_once __DIR__.'/../lib/funciones.php';

function hipotenusa(float $a, float $b): float {
    return sqrt(pow($a, 2) + pow($b, 2));
}
function resolver(array $datos): array {
    $a = numero($datos, 'a', 0.01, 1000000);
    $b = numero($datos, 'b', 0.01, 1000000);
    return ['Cateto A' => formato($a).' m', 'Cateto B' => formato($b).' m', 'Hipotenusa' => number_format(hipotenusa($a, $b), 2, '.', ',').' m'];
}
