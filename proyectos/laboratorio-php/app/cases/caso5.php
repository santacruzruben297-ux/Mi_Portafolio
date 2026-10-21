<?php
declare(strict_types=1);
// Caso 5 · Suma con biblioteca externa
require_once __DIR__.'/../lib/funciones.php';

include __DIR__.'/../lib/libfunciones.php';
function resolver(array $datos): array {
    $a = numero($datos, 'a', -1000000, 1000000, true);
    $b = numero($datos, 'b', -1000000, 1000000, true);
    return ['Operación' => "$a + $b", 'Suma' => (string)sumar($a, $b)];
}
