# Portafolio de Rubén Santa Cruz

Abre `index.html` o publica el contenido de esta carpeta en un alojamiento de sitios estáticos. Conserva las carpetas `img/` y `proyectos/`; están incluidas todas las imágenes. No necesita instalar dependencias.

## Qué incluye

- Portafolio con tu logo original, cinco proyectos, filtros, casos, tema oscuro y contacto por WhatsApp o correo.
- Oferta de landing page desde S/50, lista en 3 días desde recibir el contenido del cliente, visible en el inicio y en Servicios. Incluye hasta cinco secciones, diseño adaptable, WhatsApp y redes, una ronda de ajustes y publicación.
- Casa Criolla: 12 platos, 5 categorías, búsqueda y pedidos por WhatsApp.
- Dulce Antojo: 16 productos, 4 categorías y variantes con precios y mensajes de pedido.
- Nova Coffee: identidad cálida, 6 productos, favoritos, tipos de leche con recargos, notas, repetición del último pedido y reservas cancelables.
- TechStore: identidad azul y oscura, fichas de producto, favoritos, comparación de hasta 3 productos, carrito y compra simulada. Prueba el código `RUBEN10`.
- FitLife: identidad verde y lima, sesiones editables con notas, calendario, racha, metas de minutos y sesiones, rutinas propias, temporizador y descarga CSV.

## Personalizar CONFIG

| Proyecto | Archivo que contiene CONFIG |
| --- | --- |
| Portafolio | `index.html`, al inicio del script interno |
| Casa Criolla | `proyectos/casa-criolla/carta-digital.html` |
| Dulce Antojo | `proyectos/dulce-antojo/catalogo-dulce-antojo.html` |
| Nova Coffee | `proyectos/nova-coffee/app.js`, al inicio |
| TechStore | `proyectos/techstore/app.js`, al inicio |
| FitLife | `proyectos/fitlife-app/app.js`, al inicio |

Edita los nombres, logos, portadas, colores y datos disponibles en cada CONFIG. En las demos, los precios se escriben como números en soles, sin `S/`. En los servicios del portafolio, `precio` es el texto visible, por ejemplo `"Desde S/50"`. Los comentarios del código están en español. Las rutas de las demos se interpretan desde su `index.html`, por eso las imágenes comunes empiezan por `../../img/`.

La oferta del inicio sale del primer servicio con `destacado: true` en `CONFIG.servicios`. Marca solo uno. Cambia allí `titulo`, `precio`, `plazo`, `detalle`, `resumen`, `incluye`, `condiciones`, `cta` y `mensaje`; el inicio y Servicios leen el mismo objeto. El plazo base cuenta desde recibir textos, fotos y datos del negocio; dominio propio y funciones adicionales se cotizan aparte. El público objetivo se cambia en `CONFIG.perfil.descripcion` y `CONFIG.perfil.serviciosIntro`.

Los cinco proyectos siguen identificados como conceptos y demos. No se han añadido clientes, resultados ni testimonios inventados. Cuando tengas un trabajo real, prepara su descripción, enlace, imágenes y resultados comprobables para incorporarlo como caso real.

El CV está integrado en `documents/CV-Ruben-Santa-Cruz.pdf`, con los cinco proyectos actuales y los datos del documento anterior. El botón "Descargar CV (PDF)" aparece en "Sobre mí" y su ruta se cambia desde `CONFIG.perfil.cv`. Para actualizarlo, reemplaza el PDF manteniendo el nombre; si lo renombras, cambia también esa ruta. Deja el campo vacío para ocultar el botón.

## Imágenes completas

Las fotos y logos usan `object-fit: contain` o su proporción natural. No se aplica zoom al pasar el cursor y las etiquetas de la carta, el estudio y las tarjetas no tapan la fotografía. Las portadas no usan ilustraciones hechas con código; Casa Criolla incluye una portada nueva generada con IA. Cuando se deja una portada vacía o falla su carga, la carta oculta su marco. Los diseños cambian de columnas según el espacio disponible.

`ARCHIVOS-IMAGENES.txt` enumera las 50 imágenes del paquete. `PROMPTS-IMAGENES.txt` conserva los prompts de generación y los nombres finales.

## Datos y demostraciones

Nova Coffee y TechStore simulan pedidos y compras: no cobran ni contactan a un comercio. FitLife no guarda sesiones automáticamente al terminar el temporizador; prepara el formulario para que el visitante confirme el registro. Las demos guardan datos en el navegador y funcionan durante la visita aunque se bloquee el almacenamiento.

Todos los contactos de WhatsApp del portafolio y sus cinco proyectos usan +51 923 602 215 (`51923602215`). Cambia el teléfono desde `CONFIG.perfil.whatsapp` en el portafolio o `CONFIG.whatsapp` en cada demo al adaptar el proyecto a un cliente. Casa Criolla y Dulce Antojo preparan mensajes de pedido; Nova Coffee, TechStore y FitLife incluyen un enlace de contacto en el pie de página. Los tres proyectos Nova, FitLife y TechStore se construyeron como demos funcionales a partir de sus descripciones en el portafolio original.

La guía `GUIA-CLIENTES.md` explica cómo adaptar una carta, colocar fotos y publicarla. Consulta `VERIFICACION.txt` para conocer qué se verificó y qué revisión visual queda pendiente.
