<?php
require_once __DIR__.'/../config/app.php';
require_once __DIR__.'/../lib/funciones.php';
?><!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= e($pageTitle ?? APP_NAME) ?> · Rubén Santacruz</title>
<meta name="description" content="14 casos prácticos resueltos con PHP: funciones, geometría, recursividad, cadenas y fechas.">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
<link href="assets/style.css" rel="stylesheet"></head><body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header"><div class="shell header-inner"><a class="brand" href="index.php"><span class="brand-mark">&lt;/&gt;</span><span>Laboratorio <strong>PHP</strong></span></a><div class="header-right"><span class="status-dot"></span> Programación Web <span class="semester">IV / 2026-II</span></div></div></header>
<main class="shell" id="contenido">
