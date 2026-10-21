<?php
declare(strict_types=1);
// Caso 3 · Un saludo sin retorno
require_once __DIR__.'/../lib/funciones.php';

function saludar(string $nombre): void {
    echo '¡Bienvenido, '.e(trim($nombre)).'! Sigue aprendiendo PHP.';
}
function resolver(array $datos): array {
    $nombre = texto($datos, 'nombre');
    ob_start();
    saludar($nombre); // Imprime; no devuelve un valor.
    $saludo = (string)ob_get_clean();
    return ['Saludo' => html_entity_decode($saludo, ENT_QUOTES, 'UTF-8')];
}
