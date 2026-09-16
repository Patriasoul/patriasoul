// PatriaSoul — strogi audit za Brani svoj grad.
// Ne smatra 5 preformuliranih predložaka istom činjenicom prihvatljivim sadržajem.
// Cilj: 127 gradova × 75 stvarno različitih pitanja = 9525.
(function(global){'use strict';
  const TARGET_CITIES=127,TARGET_PER_CITY=75,TARGET_TOTAL=9525;
  const LAYERS=Array.from({length:126},(_,i)=>i+2).filter(i=>i!==33&&i!==121);
  const norm=s=>String(s??'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
  const answers=q=>(Array.isArray(q.answers)?q.answers:Array.isArray(q.options)?q.options.map(x=>typeof x==='object'?x.text:x):[]).map(norm);
  const valid=q=>q&&q.id&&q.cityId&&q.citySource==='verified'&&q.sourceUrl&&answers(q).length===4&&answers(q).every(Boolean)&&Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<4;
  const factKey=q=>{let t=norm(q.question);const prefixes=['koji je tocan podatak o','sto je povezano s','kada se navodi','koja tvrdnja opisuje','sto treba zapamtiti o'];for(const p of prefixes){if(t.startsWith(p+' ')){t=t.slice(p.length).trim();break}}return t+'|'+answers(q).slice().sort().join('|');};
  function run(){
    const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
    const all=[];
    const add=q=>{if(valid(q))all.push(q)};
    if(global.PatriaCityVerified?.forCity)for(const c of cities)(global.PatriaCityVerified.forCity(c.name)||[]).forEach(add);
    for(const n of LAYERS){const api=global[`PatriaCityVerified${n}`];if(api?.forCity)for(const c of cities)(api.forCity(c.name)||[]).forEach(add)}
    const byCity=new Map(cities.map(c=>[c.slug,[]]));
    for(const q of all)if(byCity.has(q.cityId))byCity.get(q.cityId).push(q);
    const report=cities.map(c=>{
      const qs=byCity.get(c.slug)||[],ids=new Set(),facts=new Map(),errors=[];
      for(const q of qs){if(ids.has(q.id))errors.push('duplicate-id:'+q.id);ids.add(q.id);const k=factKey(q);if(facts.has(k))facts.get(k).push(q.id);else facts.set(k,[q.id])}
      const repeated=[...facts.values()].filter(x=>x.length>1);
      if(qs.length!==TARGET_PER_CITY)errors.push('count:'+qs.length);
      if(repeated.length)errors.push('repeated-facts:'+repeated.length);
      return {city:c.name,slug:c.slug,loaded:qs.length,uniqueFacts:facts.size,repeatedFacts:repeated.length,ok:qs.length===TARGET_PER_CITY&&repeated.length===0&&errors.length===0,errors};
    });
    const result={targetCities:TARGET_CITIES,targetPerCity:TARGET_PER_CITY,targetTotal:TARGET_TOTAL,actualCities:cities.length,totalLoaded:all.length,ok:actualCities===TARGET_CITIES&&report.every(r=>r.ok),cities:report};
    global.PatriaStrictCityAudit=result;return result;
  }
  global.PatriaStrictCityAudit={run};
})(typeof window!=='undefined'?window:globalThis);
