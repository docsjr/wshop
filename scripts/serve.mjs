import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
export async function handler(req,res){
 res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'none'");
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Método não permitido');return;}
 try{
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
  if(base){if(!pathname.startsWith(base+'/'))throw Error('not found');pathname=pathname.slice(base.length);}
  let file=resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+sep))throw Error('not found');
  const info=await stat(file);
  if(info.isDirectory()){
   if(!pathname.endsWith('/')){res.writeHead(308,{Location:(base||'')+pathname+'/'});res.end();return;}
   file=resolve(file,'index.html');
  }
  const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:body);
 }catch{
  const body=await readFile(resolve(root,'404.html'));res.writeHead(404,{'Content-Type':types['.html']});res.end(req.method==='HEAD'?undefined:body);
 }
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) createServer(handler).listen(Number(process.env.PORT)||4173,process.env.HOST||'0.0.0.0',()=>console.log('DocLiv: servidor de revisão iniciado.'));
