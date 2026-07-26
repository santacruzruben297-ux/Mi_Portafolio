PORTAFOLIO — RUBÉN SANTA CRUZ (Diseñador Web / UI-UX)
========================================================

Estructura:
  index.html       toda la página principal (una sola vista, con anclas por sección)
  css/style.css    única hoja de estilos, con variables de tema (claro/oscuro)
  js/script.js     JavaScript puro, sin librerías, organizado en funciones
  images/          favicon (las miniaturas de los 3 proyectos ahora son
                    fotografías reales cargadas desde Unsplash — ver abajo)
  proyectos/       3 proyectos REALES y funcionales, cada uno en su propia
                    carpeta con un index.html autocontenido (HTML+CSS+JS):
      nova-coffee/    cafetería — menú por categorías, pedido en vivo con
                      total calculado, estado abierto/cerrado en tiempo real
                      y formulario de reserva de mesa con validación
      fitlife-app/    app de fitness — mockup de teléfono con registro de
                      entrenamientos, cálculo de calorías, historial editable,
                      meta semanal y gráfico de progreso (todo con localStorage)
      techstore/      e-commerce — catálogo con buscador, filtro por
                      categoría y orden por precio, más un carrito real con
                      cantidades, envío gratis por monto y checkout simulado

Cómo verlo:
  Simplemente abre index.html en el navegador. También puedes usar la
  extensión "Live Server" de VS Code (clic derecho sobre index.html ->
  "Open with Live Server") para que el modo responsive se vea mejor.

Cómo personalizarlo:
  - Textos: todo el copy está directo en index.html, en español.
  - Colores: al inicio de css/style.css, dentro de :root, están las
    variables --paper (fondo) e --ink (texto/líneas). El único color
    que aparece en la página principal es el de los tres proyectos
    reales del portafolio (--nova, --fit, --tech): son exactamente
    los mismos hex que el acento de cada proyecto dentro de
    proyectos/, así que si cambias la paleta de un proyecto, actualiza
    también su variable aquí para que sigan coincidiendo. Esa franja
    de swatches junto al logo y en el hero es la firma visual del
    sitio — no es un color de marca inventado, es el resumen del
    propio trabajo.
  - Proyectos del portafolio: cada tarjeta tiene dos acciones. El botón
    "Ver proyecto en vivo" abre el proyecto real en proyectos/<nombre>/
    (una página aparte, funcional de verdad). El enlace "Ver caso de
    estudio" abre el modal con el resumen del proceso de diseño; ese
    texto vive en el objeto PROJECTS al inicio de js/script.js. Para
    agregar un cuarto proyecto: crea proyectos/<nombre>/index.html,
    agrega su entrada en PROJECTS y un nuevo <article class="project-row">
    en el HTML con el mismo data-project y el href hacia su carpeta.

Funciones incluidas:
  - Modo claro / oscuro con memoria (localStorage)
  - Menú móvil tipo hamburguesa
  - Resaltado automático del ítem de menú según la sección visible
  - Botón "volver arriba"
  - Modal con el detalle de cada proyecto
  - Formulario de contacto con validación (nombre, correo, mensaje)
    — no envía a un servidor real; para conectarlo a uno, se reemplaza
    el bloque marcado en initContactForm() por una llamada fetch().

Imágenes de los proyectos: cada miniatura es ahora una fotografía real
en alta resolución (Unsplash, licencia gratuita para uso personal y
comercial, sin atribución obligatoria), elegida para representar el
rubro de cada proyecto — barra de cafetería para Nova Coffee, alguien
entrenando con smartwatch para FitLife, y una composición de gadgets
para TechStore. Se cargan directo desde images.unsplash.com (no hace
falta guardar el archivo localmente), llevan loading="lazy" para no
frenar la carga inicial, y un pequeño crédito al fotógrafo aparece al
pasar el cursor sobre la imagen (buena práctica aunque la licencia no
lo exija). El marco de cada miniatura conserva un borde inferior con
el color real del proyecto (--nova/--fit/--tech), para que la firma
de color del sitio se mantenga incluso con fotos reales.

Cuando tengas capturas de tu propio trabajo (o de un cliente real),
lo ideal es reemplazar el src de cada <img> por una captura de
pantalla del proyecto real en vez de una foto genérica de stock.
