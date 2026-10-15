<?php
declare(strict_types=1);
// Caso 11 · Fecha y hora en Lima
require_once __DIR__.'/../lib/funciones.php';

function relojLima(): array {
    date_default_timezone_set('America/Lima');
    $ahora = time();
    return ['Zona horaria' => 'America/Lima', 'Timestamp Unix' => (string)$ahora, 'Fecha' => date('d/m/Y', $ahora), 'Hora (12 h)' => date('h:i:s A', $ahora)];
}
function resolver(array $datos): array {
    return relojLima();
}
