<?php
declare(strict_types=1);
// Caso 6B · Factorial recursivo
require_once __DIR__.'/../lib/funciones.php';

function factorial(int $n): int {
    if ($n <= 1) { return 1; } // Caso base: 0! = 1! = 1.
    return $n * factorial($n - 1);
}
function resolver(array $datos): array {
    $n = numero($datos, 'n', 0, 20, true);
    return ['Expresión' => "$n!", 'Factorial' => (string)factorial($n)];
}
