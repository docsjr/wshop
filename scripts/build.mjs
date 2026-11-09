import {mkdirSync,rmSync,cpSync,writeFileSync} from 'node:fs';
import {data, Layout, PageContent, escape, url} from '../src/components.mjs';
const production=process.argv.includes('--production');
const missing=[...new Set(JSON.stringify(data).match(/\[\[[A-Z_]+\]\]/g)||[])];
if(production){
 const blockers=Object.entries(data.release).filter(([,v])=>!v.approved||!v.evidence).map(([k])=>k);
 if(blockers.length||missing.length||!data.links.canonical){console.error(`Publicação bloqueada: ${blockers.join(', ')}; ${missing.length} campos e domínio a confirmar. Consulte docs/PENDENCIAS.md.`);process.exit(1);}
 // Publication is intentionally a separate, authorized workflow, never a build side-effect.
 throw new Error('Esta entrega é somente de revisão. Requer configurar a versão pública após aprovação documentada.');
}
rmSync('dist',{recursive:true,force:true});mkdirSync('dist',{recursive:true});
cpSync('assets/css','dist/assets/css',{recursive:true});cpSync('assets/js','dist/assets/js',{recursive:true});cpSync('assets/fonts','dist/assets/fonts',{recursive:true});mkdirSync('dist/assets/img',{recursive:true});cpSync('assets/img/favicon.svg','dist/assets/img/favicon.svg');cpSync('assets/img/sales','dist/assets/img/sales',{recursive:true});
for(const page of data.pages){const target=page.id==='P14'?'dist/404.html':`dist/${page.route?`${page.route}/`:''}index.html`;mkdirSync(target.slice(0,target.lastIndexOf('/')),{recursive:true});writeFileSync(target,Layout(page,PageContent(page)));}
const review={route:'revisao',title:'Revisão da implementação — DocLiv',description:'Pendências de conteúdo e integração. Ambiente de revisão.'};
const list=missing.map(p=>`<li><code>${escape(p)}</code></li>`).join('');
mkdirSync('dist/revisao',{recursive:true});writeFileSync('dist/revisao/index.html',Layout(review,`<section class="section"><div class="container reading"><p class="label">Homologação local</p><h1>Revisão da implementação</h1><p>Esta versão não foi publicada. Os checkouts mantêm os endereços fornecidos; clicar não confirma compra, matrícula, mensagem ou agendamento.</p><h2>Informações a confirmar</h2><p>Dados identificados abaixo não foram inventados. As páginas afetadas são rascunhos e não estão liberadas para publicação.</p><ul class="review-list">${list}</ul><h2>Integrações externas</h2><p>Validar produtos, preços e adicionais na Kiwify; liberações e validade na área de aluno; contatos; escopo e prazos assistenciais; identificação da equipe e do fornecedor; minutas e privacidade; domínio e ativos.</p><p>Área do aluno e domínio canônico: URL ainda não fornecida. Nenhum link fictício foi criado.</p></div></section>`));
writeFileSync('dist/robots.txt','User-agent: *\nDisallow: /\n');
writeFileSync('dist/_headers',`/*\n  X-Robots-Tag: noindex, nofollow\n  Referrer-Policy: no-referrer\n  X-Content-Type-Options: nosniff\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'none'\n`);
console.log(`${data.pages.length} rotas + revisão geradas em dist/. Sem publicação. ${missing.length} campos identificados.`);
