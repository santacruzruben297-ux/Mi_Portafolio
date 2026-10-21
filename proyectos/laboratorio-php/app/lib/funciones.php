<?php
declare(strict_types=1);
/** Escapa cualquier dato antes de incorporarlo al HTML. */
function e(mixed $value): string {
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function numero(array $data, string $key, float $min = -1000000, float $max = 1000000, bool $integer = false): float|int {
    $raw = $data[$key] ?? null;
    if (!is_string($raw) || trim($raw) === '' || !is_numeric(trim($raw))) {
        throw new InvalidArgumentException('Completa todos los campos con números válidos.');
    }
    $raw = trim($raw);
    if ($integer && !preg_match('/^[+-]?\d+$/D', $raw)) {
        throw new InvalidArgumentException('Este caso requiere números enteros, sin decimales.');
    }
    $value = (float) $raw;
    if (!is_finite($value) || $value < $min || $value > $max) {
        throw new InvalidArgumentException('El valor debe estar entre '.(string)$min.' y '.(string)$max.'.');
    }
    return $integer ? (int) $value : $value;
}
function texto(array $data, string $key): string {
    $value = $data[$key] ?? null;
    if (!is_string($value) || trim($value) === '' || strlen($value) > 240) {
        throw new InvalidArgumentException('Escribe un texto de 1 a 240 bytes en cada campo.');
    }
    return $value;
}
function formato(float|int $n, int $decimals = 2): string {
    return number_format($n, $decimals, '.', ',');
}
function mayusculas(string $s): string {
    return strtr(strtoupper($s), ['á'=>'Á','é'=>'É','í'=>'Í','ó'=>'Ó','ú'=>'Ú','ñ'=>'Ñ','ü'=>'Ü']);
}
function minusculas(string $s): string {
    return strtr(strtolower($s), ['Á'=>'á','É'=>'é','Í'=>'í','Ó'=>'ó','Ú'=>'ú','Ñ'=>'ñ','Ü'=>'ü']);
}
