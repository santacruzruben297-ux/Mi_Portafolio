<?php
declare(strict_types=1);
function catalogo(): array {
    static $casos;
    return $casos ??= json_decode(file_get_contents(__DIR__.'/casos.json'), true, 512, JSON_THROW_ON_ERROR);
}
function casoActual(string $id): array {
    foreach (catalogo() as $caso) { if ($caso['id'] === $id) { return $caso; } }
    http_response_code(404);
    throw new InvalidArgumentException('El caso solicitado no existe.');
}
function navegacion(string $id, bool $app = false): void {
    $lista = catalogo();
    $pos = array_search($id, array_column($lista, 'id'), true);
    $prefijo = $app ? 'app_caso' : 'caso';
    echo '<nav class="case-nav" aria-label="Navegación de casos">';
    if ($pos > 0) { $anterior = $lista[$pos - 1]; echo '<a href="'.$prefijo.e($anterior['id']).'.php">← Caso '.e($anterior['label']).'</a>'; }
    else { echo '<span class="muted">Primer caso</span>'; }
    echo '<a href="index.php">⌂ Inicio</a>';
    if ($pos < count($lista) - 1) { $siguiente = $lista[$pos + 1]; echo '<a href="'.$prefijo.e($siguiente['id']).'.php">Caso '.e($siguiente['label']).' →</a>'; }
    else { echo '<span class="muted">Último caso</span>'; }
    echo '</nav>';
}
