/* PatriaSoul — centralni indeks kanonskih registara.
 * Ne zamjenjuje sitemap pretragu; dodaje joj podatke koji postoje u JS registrima.
 */
(function(){
  'use strict';
  const PROFILE_FILES=['gradovi-profil.js'];
  for(let i=2;i<=12;i++) PROFILE_FILES.push('gradovi-profil-'+i+'.js');
  PROFILE_FILES.push('gradovi-profil-fallback.js');

  const loadScript=src=>new Promise((resolve,reject)=>{
    if(document.querySelector('script[data-ps-search-src="'+src+'"]')) return resolve();
    const s=document.createElement('script'); s.src='/'+src; s.async=false; s.dataset.psSearchSrc=src;
    s.onload=resolve; s.onerror=()=>reject(new Error(src)); document.head.appendChild(s);
  });

  const slug=s=>String(s||'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const text=v=>{
    try{return typeof v==='string'?v:JSON.stringify(v)}catch{return ''}
  };

  window.PATRIA_SEARCH_REGISTRY_READY=(async function(){
    if(!window.PATRIA_CITY_DATA) await loadScript('gradovi.js');
    for(const file of PROFILE_FILES){try{await loadScript(file)}catch(e){/* pojedini registry može nedostajati */}}

    const items=[];
    const seen=new Set();
    const add=(item)=>{const key=(item.url+'|'+item.title).toLowerCase();if(seen.has(key))return;seen.add(key);items.push(item)};
    const cities=Array.isArray(window.PATRIA_CITY_DATA)?window.PATRIA_CITY_DATA:[];
    const regs=[window.PATRIA_CITY_EDITORIAL];
    for(let i=2;i<=12;i++) regs.push(window['PATRIA_CITY_EDITORIAL_'+i]);
    regs.push(window.PATRIA_CITY_EDITORIAL_FALLBACK);

    cities.forEach(c=>add({title:c.name,url:'/grad.html?city='+encodeURIComponent(c.name),path:'/grad.html',category:'gradovi',text:c.name+' '+(c.county||'')+' '+(c.slug||'')}));
    regs.forEach(reg=>{
      if(!reg||typeof reg!=='object')return;
      Object.entries(reg).forEach(([name,data])=>{
        const city=cities.find(c=>c.name===name);
        if(!city)return;
        add({title:name,url:'/grad.html?city='+encodeURIComponent(name),path:'/grad.html',category:'gradovi',text:name+' '+text(data)});
      });
    });

    window.PATRIA_SEARCH_REGISTRY=items;
    return items;
  })();
})();
