/* =========================================================
   PORTAFOLIO — RUBÉN SANTA CRUZ
   script.js — JavaScript puro, sin librerías externas.
   Organizado en funciones pequeñas, cada una con una sola
   responsabilidad, para que sea fácil de leer y modificar.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  initMobileMenu();
  initActiveNavLink();
  initBackToTop();
  initProjectModal();
  initContactForm();
  initYear();
});


/* ---------------------------------------------------------
   1. MODO CLARO / OSCURO
   Guarda la preferencia en localStorage para que se mantenga
   la próxima vez que la persona visite el sitio. Si nunca la
   eligió, respeta la preferencia del sistema operativo.
   --------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefersDark)) {
    root.setAttribute('data-theme', 'dark');
  }

  toggleBtn.addEventListener('click', function () {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
  });
}


/* ---------------------------------------------------------
   2. MENÚ MÓVIL (hamburguesa)
   Abre y cierra el menú en pantallas pequeñas. Se cierra
   automáticamente al elegir una opción, para no tapar el
   contenido después de navegar.
   --------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  menuBtn.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ---------------------------------------------------------
   3. LINK ACTIVO SEGÚN LA SECCIÓN VISIBLE
   Usa IntersectionObserver para resaltar en el menú la
   sección que la persona está viendo mientras hace scroll.
   --------------------------------------------------------- */
function initActiveNavLink() {
  const links = document.querySelectorAll('.main-nav a');
  const sections = Array.from(links)
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) { link.classList.remove('is-active'); });
      const activeLink = document.querySelector('.main-nav a[href="#' + entry.target.id + '"]');
      if (activeLink) activeLink.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}


/* ---------------------------------------------------------
   4. BOTÓN "VOLVER ARRIBA"
   Aparece solo después de hacer scroll, para no ocupar
   espacio en pantalla al entrar al sitio.
   --------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.to-top');

  window.addEventListener('scroll', function () {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ---------------------------------------------------------
   5. MODAL "VER PROYECTO"
   La información de cada proyecto vive en un solo objeto
   (PROJECTS). Al hacer clic en "Ver proyecto", se busca el
   proyecto por su id y se arma el contenido del modal con
   esos datos, en vez de repetir el HTML tres veces.
   --------------------------------------------------------- */
const PROJECTS = {
  'nova-coffee': {
    eyebrow: 'Caso de estudio · Branding & Web',
    title: 'Nova Coffee',
    type: 'Diseño de marca y página web para cafetería moderna',
    sections: [
      { label: 'Problema del cliente', text: 'Nova Coffee abrió su primera tienda física, pero no tenía identidad visual ni presencia en internet: sin eso, competía únicamente por precio frente a cafeterías con marcas ya consolidadas.' },
      { label: 'Solución de diseño', text: 'Se creó una identidad cálida y minimalista (logotipo, paleta y tipografía) junto con una página web de una sola vista, pensada para transmitir cercanía y mostrar el menú, la ubicación y la historia de la marca de forma clara.' },
      { label: 'Herramientas usadas', text: 'Figma para la identidad visual y el prototipo, Illustrator para el logotipo, y HTML/CSS para la maquetación final de la web.' },
      { label: 'Resultado', text: 'Una marca coherente en tienda, redes sociales y web, con una página que carga rápido y comunica de inmediato qué es Nova Coffee y por qué visitarla.' }
    ]
  },
  'fitlife-app': {
    eyebrow: 'Caso de estudio · Diseño UI/UX',
    title: 'FitLife App',
    type: 'Diseño UI/UX de aplicación móvil de fitness',
    sections: [
      { label: 'Pantallas principales', text: 'Inicio con resumen de actividad, biblioteca de rutinas, seguimiento de progreso con gráficos simples, y perfil con metas personales.' },
      { label: 'Experiencia del usuario', text: 'El objetivo fue reducir la fricción para registrar un entrenamiento a menos de tres toques, y usar jerarquía visual clara para que el progreso se entienda de un vistazo, sin leer números en detalle.' },
      { label: 'Proceso creativo', text: 'Se partió de wireframes en baja fidelidad para validar el flujo de registro de rutinas, se iteró con un sistema de componentes en Figma, y se terminó con un prototipo interactivo para pruebas de usabilidad.' }
    ]
  },
  'techstore': {
    eyebrow: 'Caso de estudio · E-commerce',
    title: 'TechStore',
    type: 'E-commerce moderno de tecnología',
    sections: [
      { label: 'Diseño de interfaz', text: 'Interfaz limpia con foco en la fotografía de producto, tipografía funcional y un sistema de tarjetas consistente para facilitar la comparación entre productos.' },
      { label: 'Organización del catálogo', text: 'Categorías reordenadas según cómo los usuarios realmente buscan (por uso, no solo por marca), con filtros visibles y persistentes durante toda la navegación.' },
      { label: 'Experiencia de compra', text: 'Checkout reducido a tres pasos, con el resumen del pedido siempre visible, para bajar el abandono de carrito y darle confianza al usuario en cada etapa.' }
    ]
  }
};

function initProjectModal() {
  const modal = document.querySelector('.project-modal');
  const modalPanel = modal.querySelector('.modal-panel');
  const openButtons = document.querySelectorAll('[data-project]');
  // Nota: el botón .modal-close no existe todavía en el HTML inicial
  // (se crea dentro de openModal, junto con el resto del contenido),
  // así que su listener se agrega ahí mismo, no aquí arriba.

  function openModal(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;

    const sectionsHTML = project.sections.map(function (block) {
      return '<div><h4>' + block.label + '</h4><p>' + block.text + '</p></div>';
    }).join('');

    modalPanel.innerHTML =
      '<button class="modal-close" aria-label="Cerrar">&times;</button>' +
      '<p class="modal-eyebrow">' + project.eyebrow + '</p>' +
      '<h3>' + project.title + '</h3>' +
      '<p class="modal-type">' + project.type + '</p>' +
      '<div class="modal-body">' + sectionsHTML + '</div>';

    modalPanel.querySelector('.modal-close').addEventListener('click', closeModal);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalPanel.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-project'));
    });
  });

  // cerrar al hacer clic fuera del panel (en el fondo oscuro)
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });

  // cerrar con la tecla Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}


/* ---------------------------------------------------------
   6. FORMULARIO DE CONTACTO
   Validación básica en el cliente: nombre y mensaje
   obligatorios, correo con formato válido. El envío real se
   hace vía fetch a FormSubmit (https://formsubmit.co), que
   reenvía el mensaje por correo sin necesitar backend propio.
   Si por algo falla el fetch, el <form> tiene action/method de
   respaldo y se envía de forma tradicional.
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(fieldWrapper, message) {
    fieldWrapper.classList.toggle('has-error', Boolean(message));
    fieldWrapper.querySelector('.field-error').textContent = message || '';
  }

  form.addEventListener('submit', function (event) {
    let isValid = true;

    const nameField = form.querySelector('#name').closest('.field');
    const emailField = form.querySelector('#email').closest('.field');
    const messageField = form.querySelector('#message').closest('.field');

    const nameValue = form.querySelector('#name').value.trim();
    const emailValue = form.querySelector('#email').value.trim();
    const messageValue = form.querySelector('#message').value.trim();

    if (nameValue.length < 2) {
      setError(nameField, 'Escribe tu nombre completo.');
      isValid = false;
    } else {
      setError(nameField, '');
    }

    if (!EMAIL_PATTERN.test(emailValue)) {
      setError(emailField, 'Escribe un correo válido (ej. nombre@correo.com).');
      isValid = false;
    } else {
      setError(emailField, '');
    }

    if (messageValue.length < 10) {
      setError(messageField, 'Cuéntame un poco más sobre tu proyecto (mínimo 10 caracteres).');
      isValid = false;
    } else {
      setError(messageField, '');
    }

    if (!isValid) {
      event.preventDefault();
      status.textContent = '';
      return;
    }

    // Si todo es válido, dejamos que el formulario se envíe de forma
    // NATIVA (una petición POST real hacia FormSubmit, definida en el
    // atributo action del <form>). Es la forma más confiable: funciona
    // igual si la página está subida a un hosting o si se abre
    // directamente como archivo local, ya que no depende de fetch/AJAX
    // (que los navegadores bloquean por seguridad al abrir un archivo
    // local). El navegador va a mostrar la página de confirmación de
    // FormSubmit después de enviar.
    status.classList.remove('is-error');
    status.textContent = 'Enviando...';
    submitButton.disabled = true;
  });
}


/* ---------------------------------------------------------
   7. AÑO DEL FOOTER
   Evita tener que actualizar el copyright a mano cada año.
   --------------------------------------------------------- */
function initYear() {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
