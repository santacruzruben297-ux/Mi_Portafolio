import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { PHP, PHPRequestHandler } from '@php-wasm/universal';
import { loadNodeRuntime } from '@php-wasm/node';
export const php = new PHP(await loadNodeRuntime('8.3', {emscriptenOptions:{processId:1}}));
async function mount(dir, rel='') {for(const ent of await readdir(dir,{withFileTypes:true})){const name=path.posix.join(rel,ent.name);if(ent.isDirectory()){php.mkdir('/app/'+name);await mount(path.join(dir,ent.name),name)}else{php.writeFile('/app/'+name,await readFile(path.join(dir,ent.name)))}}}
php.mkdir('/app');await mount('app');
const server = new PHPRequestHandler({php,documentRoot:'/app',absoluteUrl:'https://laboratorio.test'});
let passed=0;
async function request(url, data, expected=[]) {
 const response=await server.request({url, ...(data?{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new TextEncoder().encode(new URLSearchParams({...data,ejecutar:'1'}).toString())}:{})});
 assert.equal(response.httpStatusCode,200,url+': HTTP '+response.httpStatusCode);
 assert.equal(response.errors,'',url+': '+response.errors);
 for(const text of expected)assert.ok(response.text.includes(text),url+' missing '+text);
 assert.ok(!response.text.includes('Fatal error'),url);
 passed++;return response.text;
}
const cases=JSON.parse(await readFile('app/lib/casos.json','utf8'));
await request('/index.php',null,['14 casos disponibles', 'Santacruz Quispe']);
for (const c of cases){await request('/caso'+c.id+'.php',null,[c.title,'language-php']);await request('/app_caso'+c.id+'.php',null,[c.title,'method="post"']);}
await request('/app_caso1a.php',{n:'-5'},['<dd>25</dd>']);
await request('/app_caso1b.php',{a:'-6',b:'7'},['<dd>-42</dd>']);
await request('/app_caso2.php',{lado:'10'},['100.00 m²']);
await request('/app_caso3.php',{nombre:'<script>alert(1)</script>'},['&lt;script&gt;alert(1)&lt;/script&gt;']);
await request('/app_caso4.php',{},['Nota generada','/ 20','Mensaje']);
await request('/app_caso5.php',{a:'15',b:'20'},['<dd>35</dd>']);
await request('/app_caso6a.php',{monto:'100'},['S/ 18.00','S/ 118.00']);
await request('/app_caso6a.php',{monto:'19.99'},['S/ 3.60','S/ 23.59']);
await request('/app_caso6b.php',{n:'0'},['<dd>1</dd>']);
await request('/app_caso6b.php',{n:'20'},['2432902008176640000']);
await request('/app_caso7.php',{categoria:'  bebidas',codigo:'A012  '},['BEBIDAS-A012']);
await request('/app_caso8.php',{nombre:'  RUBÉN   ÁLVAREZ ñañez  '},['Rubén Álvarez Ñañez']);
await request('/app_caso9.php',{radio:'3'},['28.27 m²']);
await request('/app_caso10.php',{a:'3',b:'4'},['5.00 m']);
await request('/app_caso11.php',{},['America/Lima','Timestamp Unix']);
await request('/app_caso12.php',{},['Lima · 24 h','Nueva York · 24 h','-05:00']);
for(const [id,data] of [['1a',{n:'2.5'}],['1a',{n:'abc'}],['1a',{n:''}],['1b',{a:'2',b:'1e1000'}],['2',{lado:'-1'}],['3',{nombre:'   '}],['6a',{monto:'-1'}],['6a',{monto:'1.001'}],['6b',{n:'21'}],['6b',{n:'-2'}],['9',{radio:'0'}],['10',{a:'3'}]])await request('/app_caso'+id+'.php',data,['role="alert"']);
const invalid=await server.request({url:'/caso.php?id=../../etc/passwd'});assert.equal(invalid.httpStatusCode,404);passed++;
const test=await php.run({code:"<?php require '/app/cases/caso4.php'; echo json_encode([mensajeNota(12),mensajeNota(13)]);"});assert.deepEqual(JSON.parse(test.text),['Inténtalo en otra oportunidad!!!','Felicitaciones']);passed++;
const clocks=await php.run({code:"<?php require '/app/cases/caso12.php'; foreach(['2026-01-15 17:00:00 UTC','2026-07-15 17:00:00 UTC'] as $date){$t=strtotime($date);date_default_timezone_set('America/New_York');echo date('P',$t).' ';} date_default_timezone_set('America/Lima');"});assert.equal(clocks.text,'-05:00 -04:00 ');passed++;
const version=await php.run({code:'<?php echo PHP_VERSION." / ".PHP_INT_SIZE;'});
console.log(JSON.stringify({passed,php:version.text,cases:cases.length,status:'PASS'},null,2));
php.exit();
