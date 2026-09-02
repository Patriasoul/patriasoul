// PatriaSoul — gradski sloj pitanja.
// Ne stvara novu neovisnu banku: postojeća pitanja dobivaju cityId samo kada je veza s gradom jasna,
// a iz kanonskog registra gradova izvode se sigurna identitetska pitanja.
(function(global){'use strict';
  const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
  const base=typeof global.PatriaQuiz?.bank==='function'?global.PatriaQuiz.bank():[];
  const bySlug=Object.fromEntries(cities.map(c=>[c.slug,c]));
  const countySet=[...new Set(cities.map(c=>c.county))];
  const cityByCounty={}; cities.forEach(c=>(cityByCounty[c.county]??=[]).push(c));
  const out=[]; const seen=new Set();
  function add(q){if(!q||!q.id||seen.has(q.id))return;seen.add(q.id);out.push(q)}
  function otherCities(c,n=3){
    return cities.filter(x=>x.slug!==c.slug).sort((a,b)=>a.name.localeCompare(b.name,'hr')).slice(0,n).map(x=>x.name);
  }
  function otherCounties(c,n=3){return countySet.filter(x=>x!==c.county).slice(0,n)}
  // Postojeće pitanje vežemo uz grad samo kada se ime grada izričito pojavljuje u tekstu.
  // Time se izbjegavaju netočne veze prema gradu samo preko županije ili teme.
  base.forEach(q=>{
    if(!q||!q.question)return;
    const text=String(q.question)+' '+(Array.isArray(q.answers)?q.answers.join(' '):'');
    cities.forEach(c=>{
      if(text.includes(c.name)) add({...q,cityId:c.slug,citySource:'explicit-text'});
    });
  });
  // Kanonski registar daje početni, uvijek točan identitetski sloj za svih 127 gradova.
  // Bogatija pitanja dodavat će se kao provjerene činjenice, bez stvaranja druge glavne banke.
  cities.forEach(c=>{
    const counties=otherCounties(c,3);
    add({id:`city_${c.slug}_county_001`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`U kojoj se županiji nalazi ${c.name}?`,answers:[c.county,...counties],correctIndex:0});
    const members=(cityByCounty[c.county]||[]).filter(x=>x.slug!==c.slug).sort((a,b)=>a.name.localeCompare(b.name,'hr')).slice(0,3).map(x=>x.name);
    if(members.length===3){
      add({id:`city_${c.slug}_county_002`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`Koji je od navedenih gradova u ${c.county}?`,answers:[c.name,...members],correctIndex:0});
      add({id:`city_${c.slug}_identity_001`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`Koji od navedenih gradova pripada ${c.county}?`,answers:[c.name,...otherCities(c,3)],correctIndex:0});
    }
  });
  global.PatriaCityQuestions={
    all:()=>out.slice(),
    forCity:(city)=>{const c=cities.find(x=>x.name===city||x.slug===city);return c?out.filter(q=>q.cityId===c.slug):[]},
    city:city=>bySlug[city]||cities.find(c=>c.name===city)||null,
    stats:()=>({cities:cities.length,questions:out.length,withCityId:out.filter(q=>q.cityId).length,explicit:out.filter(q=>q.citySource==='explicit-text').length,registry:out.filter(q=>q.citySource==='city-registry').length})
  };
})(typeof window!=='undefined'?window:globalThis);
