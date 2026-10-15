# Laboratorio PHP — Proyecto de Programación Web

**Estudiante:** Santacruz Quispe, Rubén Efraín  
**Institución:** IESTP Misioneros Monfortianos  
**Semestre y turno:** IV · Tarde · 2026-II  
**Docente:** Rosell Alejandro Valderrama Chumbes  
**Fecha de preparación:** 15 de octubre de 2026

Catálogo de 14 soluciones correspondientes a los casos de `Funciones_v2.pdf`, con menú por categorías, enunciados completos, visor PHP oscuro, aplicaciones con formularios Bootstrap 5.3 y navegación anterior/inicio/siguiente.

## Enlaces de entrega

- Aplicación: https://laboratorio-php-ruben.stonysnail3.chatgpt.site
- Código fuente: https://github.com/santacruzruben297-ux/Mi_Portafolio/tree/proyecto-php-2026/proyectos/laboratorio-php

## Ejecutar en PHP convencional

Requisitos: PHP 8.0 o superior, compilación de 64 bits. No requiere base de datos, Composer ni Node para esta modalidad.

```sh
php -S localhost:8000 -t app
```

Abrir `http://localhost:8000/index.php`. Con XAMPP, copiar `app/` dentro de `htdocs/laboratorio-php` y abrir `http://localhost/laboratorio-php/index.php`.

`app/index.php` es el punto de entrada PHP. Todos los cálculos, validaciones, operaciones de cadenas y fechas se procesan en PHP. Bootstrap 5.3.3, Prism 1.29.0 y las fuentes se cargan por CDN; la lógica sigue funcionando en un servidor PHP aunque esos recursos visuales no estén disponibles.

## Alojamiento web de demostración

La versión `dist/index.html` ejecuta **el mismo código PHP 8.3.33** dentro de un Web Worker con PHP.wasm, proyecto de los colaboradores de WordPress. No sustituye los cálculos por funciones JavaScript. El adaptador de navegador convierte los enlaces y formularios en peticiones GET/POST procesadas por PHP.

Esto permite presentar una ejecución interactiva en un alojamiento estático. Requiere JavaScript, WebAssembly y acceso a los CDN. La primera carga descarga el motor PHP; los datos se procesan en la memoria del navegador, sin guardarse en una base de datos. La modalidad PHP convencional anterior está incluida para ejecución en servidor.

Para reconstruir la demostración: Node 24+, `npm ci` y `npm run build`. Para comprobar las soluciones: `npm test`.

## Casos y trazabilidad

| Caso | Solución | Página de la guía |
|---|---|---:|
| 1A | Cuadrado de un entero | 11 |
| 1B | Producto de dos enteros | 11 |
| 2 | Área de un cuadrado | 13 |
| 3 | Función void que imprime un saludo | 14 |
| 4 | Nota aleatoria de 0 a 20 y mensaje | 15 |
| 5 | Suma con biblioteca externa e include | 20 |
| 6A | IGV del 18 %, subtotal y total | 21 |
| 6B | Factorial recursivo | 23 |
| 7 | Código de ticket y limpieza de cadenas | 28 |
| 8 | Normalización de un nombre completo | 29 |
| 9 | Área de un círculo | 34 |
| 10 | Hipotenusa | 35 |
| 11 | Timestamp, fecha y hora de Lima | 41 |
| 12 | Relojes de Lima y Nueva York | 42 |

La guía repite el número 6. Se conserva su contenido completo identificándolo como 6A (IGV) y 6B (factorial). El caso 3 permite elegir una acción; se implementó un saludo personalizado.

## Organización

- `app/config/app.php`: datos generales y zona horaria.
- `app/lib/casos.json` y `casos.php`: catálogo central y navegación.
- `app/lib/funciones.php`: validación, formato y escape de HTML.
- `app/lib/libfunciones.php`: función de suma incorporada mediante `include`.
- `app/lib/calculos.php`: `calcularIgv(float $monto): float`, incorporada mediante `require_once`.
- `app/includes/`: encabezado y pie reutilizables con `include_once`.
- `app/cases/`: funciones y soluciones PHP de cada caso.
- `app/caso*.php`: puntos de entrada al visor de enunciado y código.
- `app/app_caso*.php`: puntos de entrada a los formularios de ejecución.
- `browser/`: adaptador del alojamiento estático.
- `scripts/build.mjs`: empaquetado reproducible.
- `tests/php-test.mjs`: 60 comprobaciones ejecutables contra PHP 8.3.

## Validaciones y decisiones

Los datos se validan tanto en los formularios como en PHP. Se rechazan vacíos, números no válidos, entradas fuera del rango y decimales en campos enteros. Se escapa la salida HTML para evitar que un nombre o código se interprete como contenido ejecutable.

El factorial acepta 0–20 para conservar resultados exactos en enteros de 64 bits. El IGV redondea al céntimo y admite un subtotal con hasta dos decimales. Las longitudes geométricas deben ser positivas. Los relojes comparan un mismo instante y respetan los cambios estacionales de Nueva York. El ticket unifica categoría y código; no mantiene un registro de unicidad global.

## Comprobaciones

Se ejecutaron **60 comprobaciones con PHP 8.3.33 de 64 bits**: catálogo, los 14 visores, los 14 formularios, resultados esperados, límites, errores de entrada, escape de HTML, acentos y ñ, umbral de aprobación y horario estacional. Las pruebas no sustituyen la revisión visual en navegador.

## Dependencias

- PHP.wasm 3.1.58: https://github.com/WordPress/wordpress-playground (GPL-2.0-or-later).
- PHP: https://www.php.net/ (PHP License).
- Bootstrap 5.3.3: https://getbootstrap.com/ (MIT).
- Prism 1.29.0: https://prismjs.com/ (MIT).
- esbuild 0.25.12: https://esbuild.github.io/ (MIT, herramienta de empaquetado).

Los binarios de PHP no se incluyen en el repositorio; la demostración los obtiene del paquete oficial publicado en npm a través de jsDelivr. Las versiones quedan fijadas en el archivo de bloqueo.
