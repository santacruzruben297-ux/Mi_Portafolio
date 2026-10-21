<?php
declare(strict_types=1);
// Caso 7 · Código de ticket
require_once __DIR__.'/../lib/funciones.php';

function crearTicket(string $categoria, string $codigo): array {
    $categoria = mayusculas(ltrim($categoria)); // Usa strtoupper().
    $codigo = rtrim($codigo);
    return ['Categoría procesada' => $categoria, 'Código procesado' => $codigo, 'Ticket' => $categoria.'-'.$codigo];
}
function resolver(array $datos): array {
    return crearTicket(texto($datos, 'categoria'), texto($datos, 'codigo'));
}
