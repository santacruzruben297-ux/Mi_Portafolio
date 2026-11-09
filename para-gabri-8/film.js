'use strict';
const $ = id => document.getElementById(id);
const bundle = JSON.parse($('bundle').textContent);
const media = bundle.media || {};
const mediaURL = path => media[path] || path;
const photoPath = number => 'media/' + String(number).padStart(2,'0') + '.png';
const videoPath = 'media/Para_Gabri.mp4';
const film = $('movie');
film.src = mediaURL(videoPath);
const cuts = bundle.cuts;
const defaultLetter = "Me dio risa volver a ver la captura de «gatito instinto». Después encontré esas dos fotos que tomé con tres segundos de diferencia. En las dos estamos casi igual, pero en las dos estás tú. Por eso quise guardar las dos.\n\nMe hace muy feliz tenerte en mi vida, Gabri. Todavía me hace ilusión ver tu nombre en la pantalla y leer un «¿entras?». A veces llego cansado de las tareas, juego un rato contigo y, cuando me despido, me doy cuenta de que terminé el día sonriendo. Quería que supieras que tú tienes mucho que ver con eso.\n\nA veces me faltan las palabras para decirte cuánto te amo. Por eso te lo dejo aquí, para que puedas volver a leerlo cuando quieras. Siempre vas a estar en mi corazón, Gabri. Ojalá nunca se te olvide.\n\nFeliz aniversario, mi Gabri. Cuando termine la canción, ¿jugamos otra?\n\nTe amo.";
const previousLetter = "Me dio risa volver a ver la captura de «gatito instinto». Y luego encontré las dos que tomé con tres segundos de diferencia. Para cualquiera serían casi la misma foto. Yo, por si acaso, guardé las dos.\n\nHay algo que a veces me cuesta decirte cuando estamos jugando: me hace ilusión que me invites. Si un día te da cosita preguntarme, mándame un «¿entras?» y ya. Me gusta pasar ese rato contigo.\n\nFeliz aniversario, mi Gabri. Cuando acabe la canción, me gustaría que el siguiente recuerdo lo hagamos juntos. ¿Jugamos otra?\n\nTe amo.";
const storeKey = 'pelicula-gabri-' + (bundle.edition || 'noviembre-08');
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch {}
const options = {...(bundle.options || {}), ...saved};
function plainLetter(value) {
  return String(value || '').replace(/[0-9#*]\uFE0F?\u20E3|[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}\uFE0F\u200D\u{E0020}-\u{E007F}]/gu, '').trim();
}
if (options.letter === previousLetter) delete options.letter;
if (options.letter) options.letter = plainLetter(options.letter);
function latest(list,time) {
  let found = null;
  for (const cue of list) {
    if (cue.t > time + .001) break;
    found = cue;
  }
  return found;
}
function clock(time) {
  return Math.floor(time / 60) + ':' + String(Math.floor(time % 60)).padStart(2,'0');
}
function update() {
  const t = film.currentTime || 0;
  const cut = latest(cuts,t) || cuts[0];
  $('position').max = Number.isFinite(film.duration) ? film.duration : 205.368;
  $('position').value = t;
  $('time').textContent = clock(t) + ' / ' + clock(+$('position').max);
  $('scene').textContent = 'Recuerdo ' + cut.images.join(' · ');
  $('play').textContent = film.paused ? 'Reproducir' : 'Pausar';
}
async function play() {
  if (film.ended) film.currentTime = 0;
  $('ending').hidden = true;
  try { await film.play(); }
  catch { $('play').textContent = 'Pulsa para reproducir'; }
}
function startAt(t) {
  if (!$('screen').open) $('screen').showModal();
  film.currentTime = t;
  update();
  play();
}
function goToCut(direction) {
  const cut = latest(cuts,film.currentTime);
  const index = Math.max(0, Math.min(cuts.length-1, cuts.indexOf(cut) + direction));
  film.currentTime = cuts[index].t;
  $('ending').hidden = true;
  update();
}
$('begin').onclick = () => startAt(0);
$('again').onclick = () => startAt(0);
$('play').onclick = () => film.paused ? play() : film.pause();
$('mute').onclick = () => {
  film.muted = !film.muted;
  $('mute').textContent = film.muted ? 'Activar sonido' : 'Silenciar';
};
$('position').oninput = e => {
  film.currentTime = Number(e.target.value);
  $('ending').hidden = true;
  update();
};
$('previous').onclick = () => goToCut(-1);
$('next').onclick = () => goToCut(1);
$('closeScreen').onclick = () => $('screen').close();
$('screen').addEventListener('close', () => {
  film.pause();
  if (document.fullscreenElement) document.exitFullscreen().catch(()=>{});
});
$('full').onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if ($('screen').requestFullscreen) await $('screen').requestFullscreen();
    else film.webkitEnterFullscreen?.();
  } catch { $('full').textContent = 'Vista ampliada disponible al girar el móvil'; }
};
for (const event of ['timeupdate','seeked','loadedmetadata','play','pause']) film.addEventListener(event,update);
film.addEventListener('ended', () => { $('ending').hidden = false; });
film.addEventListener('error',()=>{ $('play').textContent='Reintentar'; $('scene').textContent='No se pudo cargar el vídeo'; });
function openLetter() {
  film.pause();
  $('message').textContent = options.letter || defaultLetter;
  $('letter').showModal();
}
$('readLetter').onclick = openLetter;
$('lastLetter').onclick = openLetter;
for (const b of document.querySelectorAll('[data-dismiss]')) b.onclick = () => b.closest('dialog').close();
for (const image of document.querySelectorAll('[data-photo]')) image.src = mediaURL(photoPath(+image.dataset.photo));
const photoNames = ["Con el martillo al lado", "Bajo el cielo rojo", "En el suelo a cuadros", "Ese «mijo» en el chat", "Gatito instinto", "Tú y yo en blanco y negro", "Así de cerquita", "Quedaban 48 segundos", "Tres segundos después", "Juntos, con el martillo", "Desde otro ángulo", "En el mismo rincón", "Una última captura juntos"];
for (let number=1; number<=bundle.photoCount; number++) {
  const button = document.createElement('button');
  button.className = 'thumb';
  const image = new Image();
  image.loading = 'lazy';
  image.alt = photoNames[number-1];
  image.src = mediaURL(photoPath(number));
  const label = document.createElement('span');
  label.textContent = photoNames[number-1];
  button.append(image,label);
  button.onclick = () => startAt(cuts.find(c => c.images.includes(number)).t);
  $('gallery').append(button);
}
$('openEditor').onclick = () => {
  $('note').value = options.letter || defaultLetter;
  $('feedback').textContent = '';
  $('editor').showModal();
};
function applyOptions() {
  options.letter = plainLetter($('note').value) || defaultLetter;
  $('note').value = options.letter;
  try {
    localStorage.setItem(storeKey, JSON.stringify({letter: options.letter}));
    $('feedback').textContent = 'Carta guardada.';
  } catch {
    $('feedback').textContent = 'Carta actualizada. Descarga la página para conservar los cambios.';
  }
  return true;
}
$('save').onclick = applyOptions;
for (const line of bundle.lines) {
  const button = document.createElement('button');
  button.textContent = clock(line.t) + '   ' + line.text;
  button.onclick = () => startAt(line.t);
  $('transcript').append(button);
}
async function asData(path) {
  if (media[path]) return media[path];
  const response = await fetch(path);
  if (!response.ok) throw new Error('Archivo no disponible.');
  const blob = await response.blob();
  return new Promise((ok,fail) => {
    const r = new FileReader();
    r.onload = () => ok(r.result); r.onerror = fail; r.readAsDataURL(blob);
  });
}
$('gift').onclick = async () => {
  if (!applyOptions()) return;
  const button = $('gift');
  button.disabled = true;
  $('feedback').textContent = 'Preparando música, capturas y carta…';
  try {
    const paths = Array.from({length:bundle.photoCount},(_,i)=>photoPath(i+1)).concat(videoPath);
    const packed = {};
    for (const path of paths) packed[path]=await asData(path);
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll('dialog').forEach(d=>d.removeAttribute('open'));
    clone.querySelector('#gallery').replaceChildren();
    clone.querySelectorAll('video,[data-photo]').forEach(el=>el.removeAttribute('src'));
    clone.querySelector('#transcript').replaceChildren();
    clone.querySelector('#gift').disabled=false;
    clone.querySelector('#feedback').textContent='';
    clone.querySelector('#bundle').textContent=JSON.stringify({cuts,lines:bundle.lines,photoCount:bundle.photoCount,options,media:packed,edition:Date.now()}).replace(/</g,'\\u003c');
    const link=clone.querySelector('link[rel=stylesheet]');
    if(link) {
      const style=document.createElement('style');
      style.textContent=await fetch('film.css').then(r=>r.text());link.replaceWith(style);
    }
    const script=clone.querySelector('script[src]');
    if(script) {script.textContent=await fetch('film.js').then(r=>r.text());script.removeAttribute('src');}
    const url=URL.createObjectURL(new Blob(['<!doctype html>\n',clone.outerHTML],{type:'text/html;charset=utf-8'}));
    const a=document.createElement('a');a.download='Para_Gabri.html';a.href=url;a.click();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
    $('feedback').textContent='Película lista para guardar.';
  } catch { $('feedback').textContent='La descarga no se completó. Inténtalo de nuevo.'; }
  finally {button.disabled=false;}
};
update();
