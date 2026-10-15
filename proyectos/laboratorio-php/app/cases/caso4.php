<?php
declare(strict_types=1);
// Caso 4 · Nota y mensaje
require_once __DIR__.'/../lib/funciones.php';

function mensajeNota(int $nota): string {
    return $nota >= 13 ? 'Felicitaciones' : 'Inténtalo en otra oportunidad!!!';
}
function resolver(array $datos): array {
    $nota = rand(0, 20);
    return ['Nota generada' => "$nota / 20", 'Mensaje' => mensajeNota($nota)];
}
