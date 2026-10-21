<?php
declare(strict_types=1);
// Caso 12 · Lima y Nueva York
require_once __DIR__.'/../lib/funciones.php';

function compararRelojes(): array {
    $ahora = time(); // El mismo instante para ambas ciudades.
    $resultado = [];
    foreach (['Lima' => 'America/Lima', 'Nueva York' => 'America/New_York'] as $ciudad => $zona) {
        date_default_timezone_set($zona);
        $resultado[$ciudad.' · 24 h'] = date('H:i:s', $ahora);
        $resultado[$ciudad.' · 12 h'] = date('h:i:s a', $ahora);
        $resultado[$ciudad.' · UTC'] = date('P', $ahora);
    }
    date_default_timezone_set('America/Lima');
    return $resultado;
}
function resolver(array $datos): array {
    return compararRelojes();
}
