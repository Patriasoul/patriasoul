// PatriaSoul — završni audit gradske banke pitanja.
// Kontrolira 127 kanonskih gradova, aktivne verificirane slojeve, 75 pitanja po gradu,
// jedinstvene ID-eve, gradsku pripadnost, 4 odgovora, correctIndex, izvor
// i mogućnost generiranja objašnjenja nakon odgovora.
(function(global){'use strict';
  const TARGET_CITIES=127, TARGET_PER_CITY=75, TARGET_TOTAL=9525;
  // Layer 33 je uklonjen jer bi duplicirao Omiš: sloj 29 nosi pitanja 1–20,
  // a sloj 34 pitanja 21–75. Aktivno je zato 126 verificiranih slojeva.
  const EXPECTED_LAYER_IDS=Array.from({length:127},(_,i)=>i+1).filter(i=>i!==33);
  const TARGET_LAYERS=EXPECTED_LAYER_IDS.length;
  const key=s=>String(s||'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function collect(city){
    const slug=key(city.slug||city.name), layers=[];
    const base=global.PatriaCityQuestions?.forCity?.(city.name)||[];
    layers.push(...base);
    for(const i of EXPECTED_LAYER_IDS){
      const api=global[`PatriaCityVerified${i}`];
      if(api?.forCity)layers.push(...api.forCity(city.name));
    }
    const unique=Array.from(new Map(layers.filter(Boolean).map(q=>[String(q.id),q])).values());
    return {slug,questions:unique};
  }
  function run(){
    const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
    const ids=new Set(), duplicateIds=[], duplicateTexts=[];
    const report=cities.map(city=>{
      const {slug,questions}=collect(city), texts=new Set(), errors=[], explanationMissing=[];
      questions.forEach(q=>{
        const id=String(q.id||'');
        if(!id)errors.push('missing-id');
        if(ids.has(id))duplicateIds.push(id); else ids.add(id);
        if(q.cityId!==slug)errors.push(`cityId:${q.cityId||'missing'}`);
        const answers=Array.isArray(q.answers)?q.answers:q.options;
        if(!Array.isArray(answers)||answers.length!==4)errors.push(`answers:${id}`);
        if(!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3)errors.push(`correctIndex:${id}`);
        else if(!answers?.[q.correctIndex])errors.push(`empty-correct:${id}`);
        if(!q.sourceUrl)errors.push(`sourceUrl:${id}`);
        const text=String(q.question||'').trim().toLocaleLowerCase('hr-HR');
        if(text&&texts.has(text))duplicateTexts.push(`${slug}:${text}`); else if(text)texts.add(text);
        try{const ex=global.PatriaCityExplanations?.explain?.(q)||'';if(!String(ex).trim())explanationMissing.push(id)}catch(_){explanationMissing.push(id)}
      });
      if(explanationMissing.length)errors.push(`explanations:${explanationMissing.length}`);
      return {name:city.name,slug,count:questions.length,missing:Math.max(0,TARGET_PER_CITY-questions.length),ok:questions.length===TARGET_PER_CITY&&errors.length===0,errors};
    });
    const loadedLayers=EXPECTED_LAYER_IDS.filter(i=>global[`PatriaCityVerified${i}`]?.forCity);
    const missingLayers=EXPECTED_LAYER_IDS.filter(i=>!loadedLayers.includes(i));
    const missing=report.filter(r=>r.count!==TARGET_PER_CITY);
    const result={targetCities:TARGET_CITIES,actualCities:cities.length,targetLayers:TARGET_LAYERS,loadedLayers:loadedLayers.length,missingLayers,targetPerCity:TARGET_PER_CITY,targetTotal:TARGET_TOTAL,totalQuestions:report.reduce((n,r)=>n+r.count,0),missingCities:missing.length,duplicateIds:[...new Set(duplicateIds)],duplicateTexts,explanationsReady:report.every(r=>!r.errors.some(e=>e.startsWith('explanations:'))),report};
    global.PatriaCityQuestionAudit=result;
    return result;
  }
  global.PatriaCityQuestionAudit={run};
})(typeof window!=='undefined'?window:globalThis);
