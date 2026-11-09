import {SalesPage} from './sales.mjs';
import content from './content.json' with { type: 'json' };
export const data = content;
export const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const route = (path='') => `${basePath}/${path}`.replace(/\/$/, '/') ;
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
export const url = path => `${basePath}/${path}`;
export const money = value => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value).replaceAll('\u00a0',' ');
const channels = Object.fromEntries(Object.entries(data.messages).map(([key,message]) => [key, `${data.links.whatsapp}?text=${encodeURIComponent(message)}`]));
const destinations = {
 '@dr.sandropj':data.links.instagram,
 'Conhecer o Método Regular':url('metodo-regular/'), 'Conhecer a Consultoria':url('consultoria/'),
 'Entender o acompanhamento':url('acompanhamento/'), 'Conhecer a DocLiv':url('sobre/'),
 'Conhecer a equipe':url('sobre/#equipe'), 'Ver versões e preços':url('metodo-regular/#versoes-e-precos'),
 'Experimentar uma atividade':url('metodo-regular/#atividade'),
 'Consultar disponibilidade da consultoria':channels.consultoria, 'Consultar condições do acompanhamento':channels.acompanhamento,
 'Pedir ajuda com o curso':channels.curso, 'Falar com a DocLiv':url('contato/'), 'fala com a DocLiv':url('contato/'),
 'Voltar ao início':url(''), 'Como funciona o atendimento online':url('atendimento-online/'),
 'Política de privacidade':url('privacidade/'), 'Cancelamentos e reembolsos':url('cancelamentos/'),
 'Termos de uso':url('termos-de-uso/'), 'Termos de compra':url('termos-de-compra/'), 'Cookies e tecnologias semelhantes':url('cookies/')
};
export function Button(label, href=destinations[label], variant='primary') {
 return href ? `<a class="button ${variant}" href="${escape(href)}">${escape(label)}</a>` : `<span class="unavailable">${escape(label)} — destino pendente de confirmação</span>`;
}
function inline(text) {
 const priced = text.replace(/\{\{(price|additional):([a-z]+)\}\}/g, (_,kind,id) => { const product=data.products.find(p=>p.id===id); if(!product) throw new Error(`Produto desconhecido: ${id}`); return money(kind==='additional'?data.commerce.upgradeAmount:product.price); });
 let result = escape(priced).replace(/\[R\d+\]/g,'').replace(/\[\[([^\]]+)\]\]/g,(_,name)=>`<mark class="pending" title="Dado ainda não fornecido">A confirmar: ${name.toLowerCase().replaceAll('_',' ')}</mark>`);
 result=result.replace(/\*\*(.+?)\*\*/g,(_,value)=>{
   const label=value.replace(/\.$/,'');
   const choices=label.split(' · ');
   if(choices.length>1 && choices.every(item=>destinations[item])) return choices.map(item=>`<a href="${escape(destinations[item])}">${escape(item)}</a>`).join(' · ');
   if (destinations[label]) return `<a href="${escape(destinations[label])}">${escape(label)}</a>`;
   return `<strong>${value}</strong>`;
 });
 return result.replace(/\n/g,'<br>');
}
export function PriceBlock(product) {return `<p class="price">${money(product.price)} <span>à vista</span></p>`;}
export function Card(title,body,action='') {return `<article class="card"><h3>${escape(title)}</h3>${body}${action}</article>`;}
export function OfferCard(text) {
 const match=text.match(/^\*\*(.+?):\*\* (.*)$/s);return Card(match[1],`<p>${inline(match[2])}</p>`);
}
export function FAQ(ids, prefix='faq') {
 const entries=data.faqs.filter(f=>ids.includes(Number(f.id.slice(-2))));
 return `<div class="faq-list">${entries.map(f=>`<details class="faq-item"><summary class="faq-toggle"><h3>${escape(f.question)}</h3><span aria-hidden="true"></span></summary><div id="${prefix}-${f.id}" class="faq-answer"><p>${inline(f.answer)}</p></div></details>`).join('')}</div>`;
}
export function Comparison() {
 return `<div class="grid two comparison">${data.products.slice(0,2).map((p,i)=>`<article class="card" id="curso-${p.id}"><p class="label">${i?'Curso + cinco guias':'Curso + dois guias'}</p><h3>${escape(p.name)}</h3>${PriceBlock(p)}<dl>${data.comparison.filter(row=>!['Valor à vista documentado','Forma de escolher'].includes(row[0])).map(row=>`<div><dt>${escape(row[0])}</dt><dd>${escape(row[i+1])}</dd></div>`).join('')}</dl>${i?`<p class="purchase-note">No checkout do Base, seleciona a opção <strong>Método Regular Completo</strong>, com adicional de ${money(data.commerce.upgradeAmount)}. Os três guias avulsos já estão incluídos no Completo; não é necessário adicioná-los novamente.</p>`:''}${Button(p.cta,data.links[p.id])}<p class="small">Pagamento na Kiwify. Curso educativo, sem atendimento individual.</p></article>`).join('')}</div>`;
}
export function Guides(){return `<div class="grid three">${data.products.slice(2).map(p=>Card(p.name,`${PriceBlock(p)}<p>${escape(p.description)}</p><p>Já incluído no Completo.</p><p class="small">Compra avulsa: somente este guia. Acesso por 365 dias após a aprovação.</p>`,`${Button('Comprar guia '+p.name,data.links[p.id])}<p class="small">Pagamento na Kiwify.</p>`)).join('')}</div>`;}
export function Timeline(){return `<ol class="timeline">${data.calendar.map(c=>`<li><h3>${escape(c.day)}</h3><p class="small">${escape(c.wait)} de espera após a aprovação</p><p>Aulas e atividades ${escape(c.lessons)}.</p><p>${escape(c.book)}. Além da balança: ${escape(c.extra.toLowerCase())}.</p><p>Guias do Base: ${escape(c.guides.toLowerCase())}.</p></li>`).join('')}</ol>`;}
export function Demonstration(){return `<div class="demonstration"><div class="topic-controls" role="group" aria-label="Escolhe um tema" hidden>${data.samples.map((s,i)=>`<button type="button" aria-pressed="${!i}" aria-controls="sample-${i}" data-topic="${i}">${escape(s.theme)}</button>`).join('')}</div>${data.samples.map((s,i)=>`<article id="sample-${i}" class="sample" aria-labelledby="sample-title-${i}"><p class="label">${escape(s.theme)}</p><h3 id="sample-title-${i}">${escape(s.title)}</h3><p>${escape(s.question)}</p><div class="sample-action"><p class="label">Ação possível</p><p>${escape(s.action)}</p></div></article>`).join('')}</div>`;}
const primaryNav = [['','Início'],['metodo-regular/','Método Regular'],['consultoria/','Consultoria'],['acompanhamento/','Acompanhamento'],['sobre/','Sobre a DocLiv'],['contato/','Contato']];
function navLinks(current){return primaryNav.map(([r,label])=>`<a href="${url(r)}" ${current===r.replace(/\/$/,'')?'aria-current="page"':''}>${label}</a>`).join('');}
export function BrandMark(){return `<span class="brand-symbol" aria-hidden="true"><img src="${url('assets/img/sales/docliv-logo-original.png')}" alt="" width="864" height="1536"></span>`;}
function BrandName(){return `${BrandMark()}<span class="brand-wordmark">DocLiv<small>Emagrecimento e Performance</small></span>`;}
export function Header(page){return `<a class="skip" href="#conteudo">Pular para o conteúdo</a><aside class="review-note" aria-label="Estado desta versão">Versão de revisão — não publicada. <a href="${url('revisao/')}">Pendências de integração</a></aside><header><div class="container header-inner"><a class="brand" href="${url('')}" aria-label="DocLiv, início">${BrandName()}</a><nav class="desktop-nav" aria-label="Principal">${navLinks(page.route)}</nav>${Button('Ver versões e preços',undefined,'secondary header-cta')}<button class="menu-toggle" type="button" aria-controls="mobile-menu" aria-expanded="false" hidden>Menu</button></div><nav class="fallback-nav container" aria-label="Navegação">${navLinks(page.route)}<a href="${url('duvidas/')}">Perguntas frequentes</a></nav></header><dialog id="mobile-menu" aria-labelledby="menu-title"><div class="menu-heading"><h2 id="menu-title">Menu DocLiv</h2><button type="button" class="menu-close">Fechar</button></div><nav aria-label="Principal, menu compacto">${navLinks(page.route)}<a href="${url('duvidas/')}">Perguntas frequentes</a>${Button('Ver versões e preços')}</nav></dialog>`;}
export function Footer(){return `<footer><div class="container footer-grid"><div><a class="brand" href="${url('')}">${BrandName()}</a><p>${escape(data.contact.professional)}</p><p class="small">${escape(data.contact.locality)}<br>${escape(data.contact.availability)}</p><p class="small">Conteúdo educativo. O atendimento individual é contratado separadamente.</p></div><div><h2>Soluções</h2>${primaryNav.slice(1,4).map(([r,t])=>`<a href="${url(r)}">${t}</a>`).join('')}</div><div><h2>DocLiv</h2><p class="small">Atendimento: ${escape(data.contact.team)}</p><a href="${url('sobre/')}">Sobre a DocLiv</a><a href="${url('contato/')}">Contato</a><a href="${url('duvidas/')}">Perguntas frequentes</a><a href="${data.links.email}">${escape(data.contact.email)}</a><a href="${data.links.whatsapp}">${escape(data.contact.phone)}</a><a href="${data.links.instagram}">Instagram</a></div><div><h2>Informações</h2>${data.pages.filter(p=>Number(p.id.slice(1))>=8&&p.id!=='P14').map(p=>`<a href="${url(p.route+'/')}">${escape(p.label)}</a>`).join('')}</div></div><div class="container footer-end"><p>DocLiv · Emagrecimento e Performance</p><p class="small">Minutas e dados institucionais em revisão nesta versão.</p></div></footer>`;}
function renderParagraph(block){
 const plain=block.replace(/^\*\*|\*\*$/g,'').replace(/\.$/,'');
 const labels=plain.split(' · ');
 if(labels.every(l=>destinations[l])) return `<div class="actions">${labels.map((l,i)=>Button(l,undefined,i?'secondary':'primary')).join('')}</div>`;
 if(block.startsWith('- ')) return `<ul class="material-list">${block.split('\n').map(b=>`<li>${inline(b.replace(/^- /,''))}</li>`).join('')}</ul>`;
 if(block.startsWith('Exibir FAQ-')){
   let ids=[]; const range=block.match(/FAQ-(\d+) a FAQ-(\d+)/); if(range) for(let i=+range[1];i<=+range[2];i++)ids.push(i);
   ids.push(...[...block.matchAll(/FAQ-(\d+)/g)].map(m=>+m[1]));
   let tail=block.includes('Para saber')?`<p>${inline(block.slice(block.indexOf('Para saber')))}</p>`:'';
   return FAQ(ids)+tail;
 }
 if(block.startsWith('Exibir as quatro'))return Demonstration();
 if(block.startsWith('Exibir calendário'))return Timeline();
 if(block.startsWith('Exibir a comparação'))return Comparison();
 if(block.startsWith('**Método Regular Base —')||block.startsWith('**Método Regular Completo —'))return '';
 if(block.startsWith('**Emagrecimento com medicação —'))return Guides();
 if(block.startsWith('**Hormônios e emagrecimento —')||block.startsWith('**Depois de emagrecer —'))return '';
 return `<p>${inline(block)}</p>`;
}
const anchorMap={'Experimenta o tipo de reflexão proposto.':'atividade','Acesso e liberação dos materiais.':'calendario','Base ou Completo: compara o que está incluído.':'versoes-e-precos','Guias para aprofundar um tema.':'guias','Perguntas frequentes.':'perguntas','Equipe e responsabilidades.':'equipe','Curso, compra e acesso.':'curso','Consultoria Completa DocLiv.':'consultoria','Acompanhamento de quatro meses.':'acompanhamento'};
export function PageContent(page){
 if (['P01','P02'].includes(page.id)) return SalesPage(data,{Button,PriceBlock,FAQ,Timeline,Demonstration,Guides,BrandMark,escape,url,money});
 const groups=[]; for(const block of page.blocks){const h=block.match(/^\*\*H([12]): (.+?)\*\*(.*)$/s);if(h)groups.push({level:h[1],title:h[2],blocks:h[3].trim()?[h[3].trim()]:[]});else groups.at(-1)?.blocks.push(block);}
 return groups.map((g,index)=>{
  const hero=g.level==='1';const closing=!hero&&index===groups.length-1&&!['P03','P04','P06','P07'].includes(page.id)&&Number(page.id.slice(1))<8;
  const wide=g.blocks.some(b=>/^(Exibir a comparação|Exibir calendário|\*\*Emagrecimento com medicação —)/.test(b));
  const offers=g.title==='Três formas de começar essa conversa.';
  let body=offers?`<div class="grid three">${g.blocks.map(OfferCard).join('')}</div>`:g.blocks.map(renderParagraph).join('');
  if(page.id==='P06'&&hero)body+=['Curso','Compra e acesso','Atendimento','Suporte'].map((cat,i)=>`<section class="faq-category"><h2>${cat}</h2>${FAQ(data.faqs.filter(f=>f.category===cat).map(f=>Number(f.id.slice(-2))),'category-'+i)}</section>`).join('');
  const id=anchorMap[g.title];
  let visual='';
  if(hero&&['P01','P02'].includes(page.id))visual=`<div class="hero-art" aria-hidden="true"><p class="art-brand">Método<br>Regular<span>DocLiv</span></p><div class="art-topics"><span>Alimentação</span><span>Movimento</span><span>Sono</span><span>Hábitos</span></div></div>`;
  return `<section class="section ${hero?'hero':''} ${closing?'contrast':''} ${index%2===1&&!closing?'alternate':''} ${offers||wide?'wide':''}" ${id?`id="${id}"`:''}><div class="container ${visual?'hero-grid':''}"><div class="${!wide&&!offers?'reading':''}">${hero?`<p class="label">${page.id==='P01'?'DocLiv · Emagrecimento e Performance':escape(page.label)}</p>`:''}<h${g.level}>${escape(g.title)}</h${g.level}>${body}</div>${visual}</div></section>`;
 }).join('')+(page.id==='P03'||page.id==='P04'?`<section class="section contrast"><div class="container">${Button(page.id==='P03'?'Consultar disponibilidade da consultoria':'Consultar condições do acompanhamento')}</div></section>`:'');
}
export function Layout(page,body){return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer"><meta name="theme-color" content="#0F3D2E"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><link rel="icon" href="${url('assets/img/favicon.svg')}" type="image/svg+xml"><link rel="preload" href="${url('assets/fonts/manrope-400.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${url('assets/css/tokens.css')}"><link rel="stylesheet" href="${url('assets/css/styles.css')}"><link rel="stylesheet" href="${url('assets/css/sales.css')}"><script src="${url('assets/js/main.js')}" defer></script></head><body>${Header(page)}<main id="conteudo" tabindex="-1">${body}</main>${Footer()}</body></html>`;}
