import { PHP, PHPRequestHandler, loadPHPRuntime } from '@php-wasm/universal';
let server;
async function initialize(files) {
  // Asyncify also works on browsers without JavaScript Promise Integration.
  const loaderUrl = 'https://cdn.jsdelivr.net/npm/@php-wasm/web-8-3@3.1.58/asyncify/php_8_3.js';
  const loader = await import(/* @vite-ignore */ loaderUrl);
  const php = new PHP(await loadPHPRuntime(loader, { processId: 1 }));
  php.mkdir('/app');
  for (const [name, content] of Object.entries(files)) {
    const parent = '/app/' + name.slice(0, name.lastIndexOf('/'));
    if (name.includes('/')) php.mkdir(parent);
    php.writeFile('/app/' + name, content);
  }
  server = new PHPRequestHandler({ php, documentRoot:'/app', absoluteUrl:'https://laboratorio.local' });
}
let queue = Promise.resolve();
self.onmessage = ({data}) => {
 queue = queue.then(async () => {
  try {
   if (data.type === 'init') { await initialize(data.files); self.postMessage({id:data.id, ready:true}); return; }
   if (!server) throw new Error('PHP todavía no está disponible.');
   const request = {url:data.path};
   if(data.body !== undefined) Object.assign(request,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new TextEncoder().encode(data.body)});
   const response = await server.request(request);
   if(response.errors || response.httpStatusCode >= 400) throw new Error(response.errors || 'Error HTTP '+response.httpStatusCode);
   self.postMessage({id:data.id,html:response.text});
  } catch(error) { self.postMessage({id:data.id,error:error.message}); }
 });
};
