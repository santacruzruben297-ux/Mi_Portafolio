import {build} from 'esbuild';
import {readFile,writeFile,readdir,mkdir,cp,rm} from 'node:fs/promises';
import path from 'node:path';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('browser/index.html','dist/index.html');await cp('browser/main.js','dist/main.js');await cp('app/assets','dist/assets',{recursive:true});
const files={};
async function collect(dir,rel=''){for(const ent of await readdir(dir,{withFileTypes:true})){const name=path.posix.join(rel,ent.name);if(ent.isDirectory())await collect(path.join(dir,ent.name),name);else if(/\.(php|json)$/.test(name))files[name]=await readFile(path.join(dir,ent.name),'utf8');}}
await collect('app');await writeFile('dist/project.json',JSON.stringify(files));
await build({entryPoints:['browser/runtime.worker.js'],outfile:'dist/runtime.worker.js',bundle:true,format:'esm',platform:'browser',target:'es2022',external:['worker_threads'],minify:true,legalComments:'eof'});
await writeFile('dist/THIRD-PARTY-NOTICES.txt','This site uses PHP.wasm 3.1.58 by WordPress contributors (GPL-2.0-or-later).\nSource: https://github.com/WordPress/wordpress-playground\nPHP 8.3: https://www.php.net/license/3_01.txt\nBootstrap 5.3.3 and Prism 1.29.0: MIT license.\n');
console.log(`Build ready: ${Object.keys(files).length} PHP/data files.`);
