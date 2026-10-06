// Run on YOUR computer (needs internet + Node 18+):  node scripts/fetch-images.mjs
// Downloads every image from the nursery website, auto-matches them to our slots by alt text / file name,
// saves them in public/img/site and writes src/imgmap.js. Check public/img/site/_report.txt afterwards.
import fs from 'fs';import path from 'path';import {pathToFileURL} from 'url';
const old=(await import(pathToFileURL(path.resolve('src/imgmap.js')).href)).default||{};
const BASE='https://srivijayadurganursery.in/',OUT='public/img/site';fs.mkdirSync(OUT,{recursive:true});
const SLOTS={'cat-1':['fruit','mango','guava','citrus'],'cat-2':['avenue','tree'],'cat-3':['ornamental'],'cat-4':['indoor'],'cat-5':['bamboo','grass'],'cat-6':['flower'],'cat-7':['palm'],'cat-8':['shrub'],'cat-9':['hanging'],'cat-10':['bonsai'],'cat-11':['bougainvillea','bougainvilla'],
'infra-1':['shade','net'],'infra-2':['drip','irrigation'],'infra-3':['potting','mix','soil'],'hero-1':['hero','banner','slider'],'about-1':['about','entrance']};
const html=await(await fetch(BASE)).text();
const found=new Map();
for(const m of html.matchAll(/<img[^>]*>/gi)){const t=m[0],g=a=>(t.match(new RegExp(a+'=["\']([^"\']+)["\']','i'))||[])[1];
 let src=g('data-src')||g('data-lazy-src')||g('src')||(g('srcset')||'').split(' ')[0];if(!src||src.startsWith('data:'))continue;
 found.set(new URL(src,BASE).href,(g('alt')||'')+' '+(g('title')||''))}
for(const m of html.matchAll(/url\(["']?([^"')]+\.(?:jpe?g|png|webp))["']?\)/gi))found.set(new URL(m[1],BASE).href,'');
const map={},used=new Set(),rep=[];let n=0;
for(const [u,alt] of found){try{const r=await fetch(u);if(!r.ok)continue;const buf=Buffer.from(await r.arrayBuffer());if(buf.length<6000)continue;
 const f=`${String(++n).padStart(2,'0')}-${path.basename(new URL(u).pathname)}`;fs.writeFileSync(path.join(OUT,f),buf);
 const key=(alt+' '+f).toLowerCase();let hit='';
 for(const [slot,kw] of Object.entries(SLOTS))if(!map[slot]&&kw.some(k=>key.includes(k))){map[slot]='/img/site/'+f;hit=slot;break}
 rep.push(`${f}  alt="${alt.trim()}"  ->  ${hit||'(unmatched)'}`)}catch(e){}}
fs.writeFileSync('src/imgmap.js','export default '+JSON.stringify({...old,...map},null,1)+';\n');
fs.writeFileSync(path.join(OUT,'_report.txt'),rep.join('\n'));
console.log(rep.join('\n'),`\n\n${n} images saved. Edit src/imgmap.js to fix any wrong matches.`);
