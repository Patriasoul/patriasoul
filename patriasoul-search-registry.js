/* PatriaSoul — centralni indeks kanonskih registara.
 * Gradovi se učitavaju iz kanonskog registra, a modularni ES registri
 * izravno se indeksiraju kako pretraga ne bi ovisila samo o sitemapu.
 */
(function(){
  'use strict';
  const PROFILE_FILES=['gradovi-profil.js'];
  for(let i=2;i<=12;i++) PROFILE_FILES.push('gradovi-profil-'+i+'.js');
  PROFILE_FILES.push('gradovi-profil-fallback.js');
  const loadScript=src=>new Promise((resolve,reject)=>{if(document.querySelector('script[data-ps-search-src="'+src+'"]'))return resolve();const s=document.createElement('script');s.src='/'+src;s.async=false;s.dataset.psSearchSrc=src;s.onload=resolve;s.onerror=()=>reject(new Error(src));document.head.appendChild(s)});
  const importModule=src=>import('/'+src+'?search-index=1').catch(()=>null);
  const slug=s=>String(s||'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const text=v=>{try{return typeof v==='string'?v:JSON.stringify(v)}catch{return ''}};
  window.PATRIA_SEARCH_REGISTRY_READY=(async function(){
    if(!window.PATRIA_CITY_DATA)await loadScript('gradovi.js');
    for(const file of PROFILE_FILES){try{await loadScript(file)}catch(e){}}
    const items=[],seen=new Set();
    const add=item=>{if(!item||!item.url||!item.title)return;const key=(item.url+'|'+item.title).toLowerCase();if(seen.has(key))return;seen.add(key);items.push(item)};
    const addRecords=(records,config={})=>{if(!Array.isArray(records))return;records.forEach(r=>{const title=r[config.title||'title']||r[config.name||'name']||r.ime||r.naziv||r.id;if(!title)return;add({title:String(title),url:config.url||'/search.html?q='+encodeURIComponent(title),path:config.path||config.url||'/search.html',category:config.category||'all',text:text(r)})})};
    const cities=Array.isArray(window.PATRIA_CITY_DATA)?window.PATRIA_CITY_DATA:[];
    const regs=[window.PATRIA_CITY_EDITORIAL];for(let i=2;i<=12;i++)regs.push(window['PATRIA_CITY_EDITORIAL_'+i]);regs.push(window.PATRIA_CITY_EDITORIAL_FALLBACK);
    cities.forEach(c=>add({title:c.name,url:'/grad.html?city='+encodeURIComponent(c.name),path:'/grad.html',category:'gradovi',text:c.name+' '+(c.county||'')+' '+(c.slug||'')}));
    regs.forEach(reg=>{if(!reg||typeof reg!=='object')return;Object.entries(reg).forEach(([name,data])=>{if(!cities.some(c=>c.name===name))return;add({title:name,url:'/grad.html?city='+encodeURIComponent(name),path:'/grad.html',category:'gradovi',text:name+' '+text(data)})})});
    const [brigadeMod,herojiMod,operacijeMod,vjeraMod]=await Promise.all([importModule('brigade.js'),importModule('heroji.js'),importModule('operacije.js'),importModule('vjera.js')]);
    addRecords(brigadeMod&&brigadeMod.brigade,{title:'name',url:'/brigade.html',path:'/brigade.html',category:'branitelji'});
    addRecords(herojiMod&&herojiMod.heroji,{title:'ime',url:'/branitelji.html',path:'/branitelji.html',category:'branitelji'});
    addRecords(operacijeMod&&operacijeMod.operacije,{title:'naziv',url:'/operacije.html',path:'/operacije.html',category:'branitelji'});
    if(vjeraMod&&Array.isArray(vjeraMod.VJERA_SEKCIJE))vjeraMod.VJERA_SEKCIJE.forEach(x=>add({title:x.title,url:'/'+(x.href||'vjera.html'),path:'/vjera.html',category:'vjera',text:text(x)}));
    [['Povijest','/povijest.html','povijest'],['Baština','/bastina.html','bastina'],['Kviz','/quiz.html','kviz'],['Brani svoj grad','/brani-svoj-grad.html','kviz']].forEach(([title,url,category])=>add({title,url,path:url,category,text:title+' PatriaSoul centralni sadržaj'}));
    window.PATRIA_SEARCH_REGISTRY=items;
    window.PATRIA_SEARCH_REGISTRY_STATS={total:items.length,cities:cities.length,directModules:{brigade:!!brigadeMod,heroji:!!herojiMod,operacije:!!operacijeMod,vjera:!!vjeraMod}};
    return items;
  })();
})();
