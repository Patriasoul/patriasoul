// PatriaSoul — audit gradske banke pitanja.
// Kontrolira kanonskih 127 gradova, 75 pitanja po gradu, jedinstvene ID-eve,
// vezu pitanja s gradom, četiri odgovora, correctIndex i izvor.
(function(global){'use strict';
  const TARGET_CITIES=127, TARGET_PER_CITY=75;
  const key=s=>String(s||'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function collect(city){
    const slug=key(city.slug||city.name), layers=[];
    const base=global.PatriaCityQuestions?.forCity?.(city.name)||[];
    layers.push(...base);
    for(let i=0;i<=36;i++){
      const api=global[`PatriaCityVerified${i||''}`];
      if(api?.forCity)layers.push(...api.forCity(city.name));
    }
    const unique=Array.from(new Map(layers.filter(Boolean).map(q=>[String(q.id),q])).values());
    return {slug,questions:unique};
  }
  function run(){
    const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
    const ids=new Set(), duplicateIds=[], duplicateTexts=[];
    const report=cities.map(city=>{
      const {slug,questions}=collect(city), texts=new Set(), errors=[];
      questions.forEach(q=>{
        const id=String(q.id||'');
        if(!id)errors.push('missing-id');
        if(ids.has(id))duplicateIds.push(id); else ids.add(id);
        if(q.cityId!==slug)errors.push(`cityId:${q.cityId||'missing'}`);
        const answers=Array.isArray(q.answers)?q.answers:q.options;
        if(!Array.isArray(answers)||answers.length!==4)errors.push(`answers:${id}`);
        if(Number.isInteger(q.correctIndex)===false||q.correctIndex<0||q.correctIndex>3)errors.push(`correctIndex:${id}`);
        if(!q.sourceUrl)errors.push(`sourceUrl:${id}`);
        const text=String(q.question||'').trim().toLocaleLowerCase('hr-HR');
        if(text&&texts.has(text))duplicateTexts.push(`${slug}:${text}`); else texts.add(text);
      });
      return {name:city.name,slug,count:questions.length,missing:Math.max(0,TARGET_PER_CITY-questions.length),ok:questions.length>=TARGET_PER_CITY&&errors.length===0,errors};
    });
    const missing=report.filter(r=>r.count<TARGET_PER_CITY);
    const result={targetCities:TARGET_CITIES,actualCities:cities.length,targetPerCity:TARGET_PER_CITY,totalQuestions:report.reduce((n,r)=>n+r.count,0),missingCities:missing.length,duplicateIds:[...new Set(duplicateIds)],duplicateTexts,report};
    global.PatriaCityQuestionAudit=result;
    return result;
  }
  global.PatriaCityQuestionAudit={run};
})(typeof window!=='undefined'?window:globalThis);
