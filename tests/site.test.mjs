import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {gzipSync} from 'node:zlib';
import content from '../src/content.json' with {type:'json'};
const root=resolve('dist');
const walk=dir=>readdirSync(dir).flatMap(name=>statSync(join(dir,name)).isDirectory()?walk(join(dir,name)):[join(dir,name)]);
const files=walk(root);const pages=files.filter(f=>f.endsWith('.html'));const html=f=>readFileSync(f,'utf8');
const ids=s=>[...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
test('14 rotas previstas e revisão geradas',()=>{assert.equal(pages.length,15);for(const p of content.pages)assert.ok(existsSync(join(root,p.id==='P14'?'404.html':p.route+'/index.html')));});
test('idioma, SEO individual, um H1 e regiões semânticas',()=>{
 const titles=new Set();for(const file of pages){const s=html(file);assert.equal((s.match(/<h1>/g)||[]).length,1,file);assert.match(s,/<html lang="pt-BR">/);for(const tag of ['main','header','footer','nav'])assert.match(s,new RegExp('<'+tag+'[ >]'));assert.match(s,/<meta name="description" content="[^"]+"/);assert.match(s,/noindex, nofollow/);assert.doesNotMatch(s,/\{\{(?:price|additional):/);const title=s.match(/<title>(.+?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);assert.equal(new Set(ids(s)).size,ids(s).length,`IDs duplicados ${file}`);}
});
test('todos os destinos locais, âncoras e assets existem',()=>{
 for(const file of pages){const s=html(file);for(const match of s.matchAll(/(?:href|src)="([^"]+)"/g)){
  const href=match[1];assert.notEqual(href,'#');assert.ok(!href.includes('[['));
  if(/^(https:|mailto:)/.test(href))continue;
  const parsed=new URL(href,'https://local.test/'+file.slice(root.length+1));let target=join(root,decodeURIComponent(parsed.pathname));
  if(parsed.pathname.endsWith('/'))target=join(target,'index.html');assert.ok(existsSync(target),`${file}: ${href}`);
  if(parsed.hash)assert.ok(ids(html(target)).includes(decodeURIComponent(parsed.hash.slice(1))),`${file}: âncora ${href}`);
 }
 }
 for(const path of files.filter(f=>f.endsWith('.css')))for(const [,relative] of html(path).matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g))assert.ok(existsSync(resolve(dirname(path),relative)),relative);
});
test('Kiwify: cinco produtos e checkout compartilhado sem parâmetros inventados',()=>{
 const s=html(join(root,'metodo-regular/index.html'));
 const expected=['t5IY204','TUtsETF','8PFFNL2','gFyI08R'];for(const id of expected)assert.ok(s.includes('https://pay.kiwify.com.br/'+id));
 assert.equal(content.links.base,content.links.completo);assert.match(s,/Seleciona a opção <strong>Método Regular Completo/);assert.match(s,/adicional de R\$ 80,00/);assert.match(s,/não é necessário adicioná-lo novamente/);
 assert.ok(!s.includes('target="_blank"'));assert.equal(content.products[1].price,content.products[0].price+80);
});
test('FAQ usa conteúdo único e associações acessíveis',()=>{
 for(const file of pages){const s=html(file);for(const [,state,id] of s.matchAll(/aria-expanded="(true|false)" aria-controls="([^"]+)"/g)){assert.ok(ids(s).includes(id));assert.equal(state,'true');}}
 assert.equal(content.faqs.length,14);
});
test('sem JavaScript, respostas e quatro amostras permanecem legíveis',()=>{
 const s=html(join(root,'metodo-regular/index.html'));for(const sample of content.samples)assert.ok(s.includes(sample.question));assert.equal((s.match(/class="sample"/g)||[]).length,4);assert.ok(!/<(?:article|div)[^>]*class="(?:sample|faq-answer)"[^>]*hidden/.test(s));
});
test('curso: calendário e validade uniformes',()=>{
 assert.deepEqual(content.calendar.map(c=>c.wait),['0 dias','3 dias','6 dias','7 dias']);const s=html(join(root,'metodo-regular/index.html'));assert.match(s,/365 dias/);assert.match(s,/os cinco guias são liberados desde o início/);
});
test('sem preços assistenciais históricos, captura clínica ou rastreadores',()=>{
 for(const file of pages){const s=html(file);assert.doesNotMatch(s,/1\.090,99|6\.690|12×|<form\b|<input\b|googletagmanager|google-analytics|facebook\.net|fonts\.googleapis/);}
 const js=html(join(root,'assets/js/main.js'));assert.doesNotMatch(js,/fetch\(|localStorage|sessionStorage|document\.cookie|sendBeacon/);
});
test('contraste AA de texto e controles da paleta',()=>{
 const lum=hex=>{const rgb=hex.match(/\w\w/g).map(c=>parseInt(c,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];};
 const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
 for(const bg of ['F6EFE4','FBF8F2'])for(const color of ['0F3D2E','1B2A22','52604F','8C3B2E','3E5C45'])assert.ok(contrast(color,bg)>=4.5,`${color}/${bg}`);
 assert.ok(contrast('C6A87A','0F3D2E')>=4.5);
});
test('orçamentos de transferência e JavaScript',()=>{
 const assets=files.filter(f=>!f.endsWith('.html')&&!f.endsWith('.txt')&&!f.endsWith('_headers'));const assetBytes=assets.reduce((sum,f)=>sum+statSync(f).size,0);
 for(const file of pages)assert.ok(statSync(file).size+assetBytes<1_500_000,file);
 assert.ok(gzipSync(readFileSync(join(root,'assets/js/main.js'))).length<150_000);
});
test('produção recusada enquanto há bloqueios',()=>{
 const result=spawnSync(process.execPath,['scripts/build.mjs','--production'],{encoding:'utf8'});assert.notEqual(result.status,0);assert.match(result.stderr,/Publicação bloqueada: B01/);assert.ok(existsSync(join(root,'index.html')));
});
test('servidor: 200, redirecionamento, 404, HEAD, método e CSP',async()=>{
 const {handler}=await import('../scripts/serve.mjs');
 async function request(url,method='GET'){const result={headers:{}};await handler({url,method},{setHeader:(k,v)=>result.headers[k]=v,writeHead:(status,headers={})=>{result.status=status;Object.assign(result.headers,headers);},end:body=>result.body=body});return result;}
 assert.equal((await request('/')).status,200);const redirect=await request('/metodo-regular');assert.equal(redirect.status,308);assert.equal(redirect.headers.Location,'/metodo-regular/');
 const missing=await request('/nao-existe');assert.equal(missing.status,404);assert.match(missing.body.toString(),/Página não encontrada/);assert.equal((await request('/','POST')).status,405);assert.equal((await request('/','HEAD')).body,undefined);
 assert.match(missing.headers['Content-Security-Policy'],/form-action 'none'/);assert.equal(missing.headers['X-Robots-Tag'],'noindex, nofollow');assert.equal((await request('/%zz')).status,404);
});
