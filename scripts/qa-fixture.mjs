import {writeFileSync,readFileSync} from 'node:fs';
const widths=[320,360,390,599,600,767,768,1023,1024,1279,1280,1440];
const routes=['','metodo-regular/','consultoria/','acompanhamento/','sobre/','duvidas/','contato/','termos-de-uso/','privacidade/'];
writeFileSync('dist/qa.html',`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Revisão responsiva DocLiv</title><link rel="stylesheet" href="/qa.css"><script src="/qa.js" defer></script></head><body><h1>Revisão responsiva DocLiv</h1><label for="route">Página</label><select id="route">${routes.map(r=>`<option value="/${r}">${r||'Início'}</option>`).join('')}</select><main>${widths.map(w=>`<section><h2>${w} px</h2><iframe title="Prévia ${w} px" width="${w}" height="800" src="/"></iframe></section>`).join('')}</main></body></html>`);
writeFileSync('dist/qa.css','body{background:#F6EFE4;color:#0F3D2E;font:18px sans-serif;margin:24px}main{display:flex;gap:24px;align-items:flex-start}iframe{border:0;height:800px}select{font:inherit;margin:24px;padding:12px}');
writeFileSync('dist/qa.js',"document.querySelector('select').addEventListener('change',event=>{document.querySelectorAll('iframe').forEach(frame=>{frame.src=event.target.value})})");
writeFileSync('dist/qa-zoom.css','html{font-size:200%}');
writeFileSync('dist/qa-zoom.html',readFileSync('dist/metodo-regular/index.html','utf8').replace('</head>','<link rel="stylesheet" href="/qa-zoom.css"></head>'));
console.log('Fixture temporária criada; npm run build remove os arquivos QA.');
