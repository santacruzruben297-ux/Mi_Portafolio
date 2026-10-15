const frame=document.getElementById('application');
const loading=document.getElementById('loading');
const message=document.getElementById('load-message');
const errorBox=document.getElementById('load-error');
const base=new URL('.',location.href).href;
let counter=0, current='index.php';
const waiting=new Map();
const worker=new Worker(new URL('runtime.worker.js',base),{type:'module'});
function fail(error){loading.hidden=false;frame.hidden=true;message.textContent='No se pudo cargar el laboratorio.';errorBox.hidden=false;document.getElementById('error-detail').textContent=error.message||String(error);}
worker.onerror=event=>{for(const {reject} of waiting.values())reject(new Error(event.message||'Error del motor PHP'));waiting.clear();fail(new Error('Revisa tu conexión y vuelve a intentarlo.'));};
worker.onmessage=({data})=>{const entry=waiting.get(data.id);if(!entry)return;waiting.delete(data.id);clearTimeout(entry.timer);data.error?entry.reject(new Error(data.error)):entry.resolve(data);};
function call(payload){return new Promise((resolve,reject)=>{const id=++counter;const timer=setTimeout(()=>{waiting.delete(id);reject(new Error('La descarga está tardando demasiado. Comprueba tu conexión y recarga la página.'));},90000);waiting.set(id,{resolve,reject,timer});worker.postMessage({...payload,id});});}
function safePath(path){return /^(index|caso(?:1[ab]|[2-5]|6[ab]|[7-9]|1[0-2])|app_caso(?:1[ab]|[2-5]|6[ab]|[7-9]|1[0-2]))\.php$/.test(path)?path:'index.php';}
function addBase(html){return html.replace('<head>','<head><base href="'+base.replaceAll('"','&quot;')+'">');}
async function render(path,body,push=true){
 current=safePath(path);frame.setAttribute('aria-busy','true');
 try {const result=await call({type:'request',path:'/'+current,...(body!==undefined?{body}:{})});
 frame.srcdoc=addBase(result.html);frame.hidden=false;loading.hidden=true;
 const url=new URL(location.href);if(current==='index.php')url.searchParams.delete('pagina');else url.searchParams.set('pagina',current);url.hash='';
 if(push)history.pushState({page:current},'',url);else history.replaceState({page:current},'',url);
 }catch(error){fail(error)}finally{frame.removeAttribute('aria-busy')}
}
frame.addEventListener('load',()=>{
 const doc=frame.contentDocument;if(!doc)return;
 document.title=doc.title||'Laboratorio PHP · Rubén Santacruz';
 doc.addEventListener('click',event=>{
  const anchor=event.target.closest('a');if(!anchor)return;
  const href=anchor.getAttribute('href')||'';
  if(href.startsWith('#'))return;
  if(/\.php(?:\?|$)/.test(href)&&!/^https?:/i.test(href)){
   event.preventDefault();render(href.split('?')[0]);
  }
 });
 doc.addEventListener('submit',event=>{
  const form=event.target;event.preventDefault();if(!form.reportValidity())return;
  const params=new URLSearchParams();for(const [key,value] of new FormData(form))params.append(key,String(value));
  const button=form.querySelector('[type=submit]');if(button)button.disabled=true;
  render(form.getAttribute('action')||current,params.toString(),false);
 });
});
window.addEventListener('popstate',()=>render(new URLSearchParams(location.search).get('pagina')||'index.php',undefined,false));
document.getElementById('retry').addEventListener('click',()=>location.reload());
try{
 const response=await fetch(new URL('project.json',base));if(!response.ok)throw new Error('No se pudieron descargar los ejercicios.');
 const files=await response.json();message.textContent='Preparando PHP 8.3 y los 14 ejercicios…';
 await call({type:'init',files});
 await render(new URLSearchParams(location.search).get('pagina')||'index.php',undefined,false);
}catch(error){fail(error)}
