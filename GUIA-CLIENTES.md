# Adaptar la carta a un cliente

1. Descomprime `casa-criolla-completo.zip` y duplica la carpeta para cada cliente. Abre `carta-digital.html` en un editor y busca `const CONFIG`. `index.html` abre esa carta automáticamente.
2. En `CONFIG.negocio` cambia nombre, eslogan, tipo, zona, horario, dirección, Instagram, Facebook, logo y `fotoPortada`. Deja una red vacía (`""`) para ocultarla. Cambia `CONFIG.whatsapp` por el número real: para Perú, `51` seguido de los nueve dígitos del celular, sin `+`.
3. Cambia los cuatro valores de `CONFIG.colores` con códigos como `#244A3D`. En `CONFIG.interfaz` puedes personalizar títulos y mensajes. Conserva `moneda: "PEN"` e `idioma: "es-PE"` para soles.
4. Edita `CONFIG.categorias`: cada categoría tiene `nombre`, `descripcion` y `platos`. Cada plato contiene `nombre`, `descripcion`, `precio`, `foto` y, opcionalmente, `etiqueta`. El precio es un número, por ejemplo `27.50`, sin escribir `S/`.
5. Guarda las fotos reales en `img/`, junto al HTML. Una foto llamada `arroz-pollo.jpg` se enlaza como `foto: "img/arroz-pollo.jpg"`. Respeta el nombre y la extensión; evita rutas de tu computadora. `foto: ""` muestra una tarjeta sin imagen. La carta independiente usa PNG; las demos del portafolio usan WebP.
6. Abre la carta, revisa precios y prueba cada pedido: el mensaje debe decir `Hola, quiero pedir: [plato]`. Comprueba búsqueda, categorías y fotos desde un celular. El número y las redes incluidos son ejemplos que debes sustituir.

## Publicar una demo o tu portafolio en GitHub Pages

1. Crea un repositorio público. Sube los archivos descomprimidos: `index.html`, el HTML principal y `img/`. Para el portafolio, sube también `proyectos/`. `index.html` debe estar en la raíz; subir solo el ZIP no publica su contenido.
2. Ve a **Settings → Pages → Build and deployment**. Elige **Deploy from a branch**, selecciona `main`, carpeta `/(root)` y pulsa **Save**.
3. Cuando termine el despliegue, abre el enlace mostrado en Pages y revisa imágenes y botones. Para actualizar, cambia los archivos y crea un nuevo commit en la misma rama.

GitHub Pages limita el alojamiento gratuito de negocios, comercio electrónico y páginas cuyo objetivo principal sea facilitar transacciones comerciales. Usa este procedimiento para tu portafolio y demostraciones; una carta comercial que recibe pedidos necesita un alojamiento que permita ese uso.

Fuentes: [Publicación desde una rama](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [archivo de entrada](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) y [límites de uso](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
