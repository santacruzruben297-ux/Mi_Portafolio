<?php
declare(strict_types=1);
// Caso 8 · Normalizar un nombre
require_once __DIR__.'/../lib/funciones.php';

function normalizarNombre(string $nombre): string {
    $limpio = preg_replace('/\s+/u', ' ', trim($nombre));
    $nombre = ucwords(minusculas($limpio)); // Usa strtolower().
    // ucwords() no capitaliza por sí solo las vocales acentuadas.
    return preg_replace_callback('/(^|[ \-])([áéíóúñü])/u',
        fn(array $m): string => $m[1].mayusculas($m[2]), $nombre);
}
function resolver(array $datos): array {
    return ['Nombre normalizado' => normalizarNombre(texto($datos, 'nombre'))];
}
