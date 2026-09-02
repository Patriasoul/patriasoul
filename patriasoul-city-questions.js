// PatriaSoul — gradski sloj pitanja.
// Ne stvara novu neovisnu banku: postojeća pitanja dobivaju cityId samo kada je veza s gradom jasna,
// a iz kanonskog registra gradova izvode se sigurna identitetska pitanja (grad ↔ županija).
(function(global){'use strict';
  const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
  const base=typeof global.PatriaQuiz?.bank==='function'?global.PatriaQuiz.bank():[];
  const bySlug=Object.fromEntries(cities.map(c=>[c.slug,c]));
  const countySet=[...new Set(cities.map(c=>c.county))];
  const otherCounties=(county,n)=>countySet.filter(x=>x!==county).slice(0,n);
  const cityByCounty={}; cities.forEach(c=>(cityByCounty[c.county]??=[]).push(c));
  const out=[];
  const seen=new Set();
  function add(q){if(!q||!q.id||seen.has(q.id))return;seen.add(q.id);out.push(q)}
  // Jasna postojeća pitanja: grad se mora pojaviti u tekstu pitanja ili među odgovorima.
  // Ne dodjeljujemo cityId osjetljivim pitanjima samo zato što pripadaju istoj županiji.
  base.forEach(q=>{
    if(!q||!q.question)return;
    const text=String(q.question)+' '+(Array.isArray(q.answers)?q.answers.join(' '):'');
    cities.forEach(c=>{
      if(text.includes(c.name)) add({...q,cityId:c.slug,citySource:'explicit-text'});
    });
  });
  // Sigurna pitanja iz kanonskog registra. Ovo je mali početni sloj koji se može širiti
  // provjerenim gradskim činjenicama bez mijenjanja glavne banke.
  cities.forEach(c=>{
    const d=otherCounties(c.county,3);
    add({id:`city_${c.slug}_county_001`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`U kojoj se županiji nalazi ${c.name}?`,answers:[c.county,...d],correctIndex:0});
    const members=(cityByCounty[c.county]||[]).filter(x=>x.slug!==c.slug).slice(0,3).map(x=>x.name);
    if(members.length===3) add({id:`city_${c.slug}_county_002`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`Koji je od navedenih gradova u ${c.county}?`,answers:[c.name,...members],correctIndex:0});
    add({id:`city_${c.slug}_identity_001`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`Koji grad ima status grada u registru PatriaSoula i pripada ${c.county}?`,answers:[c.name,...members.length===3?members:otherCounties(c.county,3)],correctIndex:0});
  });
  global.PatriaCityQuestions={
    all:()=>out.slice(),
    forCity:(city)=>{const c=cities.find(x=>x.name===city||x.slug===city);return c?out.filter(q=>q.cityId===c.slug):[]},
    city:city=>bySlug[city]||cities.find(c=>c.name===city)||null,
    stats:()=>({cities:cities.length,questions:out.length,withCityId:out.filter(q=>q.cityId).length})
  };
})(typeof window!=='undefined'?window:globalThis);
