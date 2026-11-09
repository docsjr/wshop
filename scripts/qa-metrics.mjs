// Instrument only generated review copies. Never copied by the production build.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import content from '../src/content.json' with {type:'json'};
const script=`(() => {
 const measures={lcpMs:null,cls:0,fcpMs:null,domContentLoadedMs:null,loadMs:null,resourceRequests:0};
 let sessionValue=0,lastShift=0,startShift=0;
 try { new PerformanceObserver(list=>{for(const entry of list.getEntries())measures.lcpMs=entry.startTime;}).observe({type:'largest-contentful-paint',buffered:true}); } catch {}
 try { new PerformanceObserver(list=>{for(const e of list.getEntries()){if(e.hadRecentInput)continue;if(e.startTime-lastShift<1000&&e.startTime-startShift<5000)sessionValue+=e.value;else {sessionValue=e.value;startShift=e.startTime;}lastShift=e.startTime;measures.cls=Math.max(measures.cls,sessionValue);}}).observe({type:'layout-shift',buffered:true}); } catch {}
 window.addEventListener('load',()=>setTimeout(()=>{
 const nav=performance.getEntriesByType('navigation')[0];
 measures.fcpMs=performance.getEntriesByName('first-contentful-paint')[0]?.startTime??null;
 measures.domContentLoadedMs=nav?.domContentLoadedEventEnd??null;measures.loadMs=nav?.loadEventEnd??null;
 const resources=performance.getEntriesByType('resource');measures.resourceRequests=resources.length;
 measures.externalResources=resources.filter(r=>new URL(r.name).origin!==location.origin).map(r=>new URL(r.name).origin);
 const output=document.createElement('output');output.id='qa-metrics';output.textContent=JSON.stringify(measures);document.body.append(output);
 },1200));
})();`;
writeFileSync('dist/qa-metrics.js',script);
for(const page of content.pages.filter(p=>Number(p.id.slice(1))<=7)){
 const src=`dist/${page.route?page.route+'/':''}index.html`;const dest=`dist/qa-perf/${page.route||'inicio'}`;mkdirSync(dest,{recursive:true});
 writeFileSync(dest+'/index.html',readFileSync(src,'utf8').replace('<meta charset="utf-8">','<meta charset="utf-8"><script src="/qa-metrics.js"></script>'));
}
console.log('Cópias instrumentadas para QA criadas; removidas pelo próximo build.');
