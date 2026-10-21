<?php
require_once __DIR__.'/config/app.php';
require_once __DIR__.'/lib/funciones.php';
require_once __DIR__.'/lib/casos.php';
$id = $caseId ?? (is_string($_GET['id'] ?? null) ? $_GET['id'] : '1a');
try { $caso = casoActual($id); } catch (InvalidArgumentException $ex) { exit(e($ex->getMessage())); }
require_once __DIR__.'/cases/caso'.$id.'.php';
$pageTitle = 'Ejecutar · '.$caso['title'];
$resultado = null; $error = null;
$enviado = $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ejecutar']);
if ($enviado) {
    try { $resultado = resolver($_POST); }
    catch (InvalidArgumentException $ex) { $error = $ex->getMessage(); }
}
include_once __DIR__.'/includes/header.php';
?>
<div class="breadcrumb-line"><a href="index.php">Catálogo</a><span>/</span><a href="caso<?= e($id) ?>.php">Caso <?= e($caso['label']) ?></a><span>/</span>Aplicación</div>
<section class="case-heading"><div><div class="eyebrow">CASO <?= e($caso['label']) ?> · <?= e($caso['category']) ?></div><h1><?= e($caso['title']) ?></h1><p>Introduce tus datos y ejecuta la función PHP.</p></div><a class="btn btn-outline-dark" href="caso<?= e($id) ?>.php">Ver el código &lt;/&gt;</a></section>
<div class="case-tabs"><a href="caso<?= e($id) ?>.php">01 · Entender el código</a><a class="active" href="app_caso<?= e($id) ?>.php" aria-current="page">02 · Probar la solución</a></div>
<div class="execution-grid"><section class="panel form-panel"><div class="eyebrow">ENTRADA</div><h2><?= count($caso['fields']) ? 'Prueba con tus datos' : 'Ejecuta la demostración' ?></h2><p class="form-description"><?= e($caso['statement']) ?></p>
<?php if ($error): ?><div class="alert alert-danger" role="alert"><?= e($error) ?></div><?php endif ?>
<form method="post" action="app_caso<?= e($id) ?>.php"><input type="hidden" name="ejecutar" value="1">
<?php foreach ($caso['fields'] as $field): $value = $enviado && is_string($_POST[$field['name']] ?? null) ? $_POST[$field['name']] : $field['value']; ?>
<div class="mb-4"><label class="form-label" for="<?= e($field['name']) ?>"><?= e($field['label']) ?></label><input class="form-control" id="<?= e($field['name']) ?>" name="<?= e($field['name']) ?>" type="<?= e($field['type']) ?>" value="<?= e($value) ?>" required <?php if ($field['type'] === 'number'): ?>min="<?= e($field['min']) ?>" max="<?= e($field['max']) ?>" step="<?= e($field['step']) ?>"<?php else: ?>maxlength="120"<?php endif ?>></div>
<?php endforeach ?>
<?php if (!$caso['fields']): ?><p class="no-fields"><?= $id === '4' ? 'Cada ejecución genera una nueva nota aleatoria entre 0 y 20.' : 'Se consulta la hora actual al pulsar el botón. Nueva York ajusta automáticamente su horario estacional.' ?></p><?php endif ?>
<div class="form-actions"><button class="btn btn-primary" type="submit"><?= $id === '4' ? 'Generar nota' : (in_array($id, ['11','12'], true) ? 'Consultar hora' : 'Calcular resultado') ?> →</button><a href="app_caso<?= e($id) ?>.php" class="reset-link">Restablecer</a></div></form></section>
<section class="result-panel <?= $resultado ? 'has-result' : '' ?>" aria-live="polite"><div class="eyebrow">SALIDA</div><h2>Resultado</h2><?php if ($resultado): ?><div class="success-label"><span class="status-dot"></span> Función ejecutada correctamente</div><dl class="result-list"><?php foreach ($resultado as $label => $value): ?><div><dt><?= e($label) ?></dt><dd><?= e($value) ?></dd></div><?php endforeach ?></dl><?php else: ?><div class="result-placeholder"><span>{ }</span><h3>Tu resultado aparecerá aquí</h3><p><?= $error ? 'Corrige los datos indicados y vuelve a ejecutar.' : 'Los campos ya incluyen un ejemplo. Puedes cambiarlo o ejecutar directamente.' ?></p></div><?php endif ?><div class="result-note">Procesado con PHP · datos validados antes del cálculo</div></section></div>
<?php navegacion($id, true); include_once __DIR__.'/includes/footer.php'; ?>
