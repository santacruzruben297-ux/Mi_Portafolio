<?php
require_once __DIR__.'/config/app.php';
require_once __DIR__.'/lib/funciones.php';
require_once __DIR__.'/lib/casos.php';
$id = $caseId ?? (is_string($_GET['id'] ?? null) ? $_GET['id'] : '1a');
try { $caso = casoActual($id); } catch (InvalidArgumentException $ex) { exit(e($ex->getMessage())); }
$pageTitle = 'Caso '.$caso['label'].' · '.$caso['title'];
$codigo = file_get_contents(__DIR__.'/cases/caso'.$id.'.php');
if ($id === '5') { $codigo .= "\n// lib/libfunciones.php\n".file_get_contents(__DIR__.'/lib/libfunciones.php'); }
if ($id === '6a') { $codigo .= "\n// lib/calculos.php\n".file_get_contents(__DIR__.'/lib/calculos.php'); }
include_once __DIR__.'/includes/header.php';
?>
<div class="breadcrumb-line"><a href="index.php">Catálogo</a><span>/</span><?= e($caso['category']) ?><span>/</span>Caso <?= e($caso['label']) ?></div>
<section class="case-heading"><div><div class="eyebrow">CASO <?= e($caso['label']) ?> · <?= e($caso['category']) ?></div><h1><?= e($caso['title']) ?></h1><p><?= e($caso['concept']) ?></p></div><a class="btn btn-primary" href="app_caso<?= e($id) ?>.php">Ejecutar aplicación ↗</a></section>
<div class="case-tabs"><a class="active" href="caso<?= e($id) ?>.php" aria-current="page">01 · Entender el código</a><a href="app_caso<?= e($id) ?>.php">02 · Probar la solución</a></div>
<div class="detail-grid"><aside><section class="panel"><div class="eyebrow">EL RETO</div><h2>Enunciado</h2><p><?= e($caso['statement']) ?></p><span class="source-note">Funciones_v2.pdf · página <?= e($caso['page']) ?></span></section><section class="example-panel"><div class="eyebrow">EJEMPLO</div><p><?= e($caso['sample']) ?></p><a href="app_caso<?= e($id) ?>.php">Probar con mis datos →</a></section></aside><section class="code-panel"><div class="code-header"><span class="dots">● ● ●</span><span>cases/caso<?= e($id) ?>.php</span><span>PHP</span></div><pre tabindex="0"><code class="language-php"><?= e($codigo) ?></code></pre><div class="code-footer">Código de la solución · validación compartida en lib/funciones.php</div></section></div>
<?php navegacion($id); include_once __DIR__.'/includes/footer.php'; ?>
