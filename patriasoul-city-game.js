// PatriaSoul – Brani svoj grad engine: izazov, gradski bodovi i misije.
// Gradski kviz koristi isključivo provjerena, gradu pripisana pitanja.
// Registry-complete pitanja služe samo kao privremeni auditni sloj i ne ulaze u igru.
(function(global){'use strict';
const KEY='patriasoul_city_results_v3',MISSION_KEY='patriasoul_city_missions_v1',HISTORY_KEY='patriasoul_city_question_history_v1';
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(_){return []}}
function save(x){try{localStorage.setItem(KEY,JSON.stringify(x.slice(-1000)))}catch(_){}return x}
function missions(){try{return JSON.parse(localStorage.getItem(MISSION_KEY)||'{"played":0,"perfect":0,"points":0}')||{played:0,perfect:0,points:0}}catch(_){return{played:0,perfect:0,points:0}}}
function saveMissions(m){localStorage.setItem(MISSION_KEY,JSON.stringify(m));return m}
function history(){try{const x=JSON.parse(localStorage.getItem(HISTORY_KEY)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return {}}}
function saveHistory(x){try{localStorage.setItem(HISTORY_KEY,JSON.stringify(x))}catch(_){}return x}
function cityKey(city){return String(city).toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function verifiedLayers(city){
  const out=[];
  for(let i=0;i<31;i++){
    const layer=global[`PatriaCityVerified${i||''}`];
    if(layer?.forCity)out.push(layer.forCity(city)||[]);
  }
  return out;
}
function verifiedCityPool(city){
  const key=cityKey(city),cityBank=global.PatriaCityQuestions?.forCity?.(city)||[];
  const combined=[cityBank,...verifiedLayers(city)].flat();
  return Array.from(new Map(combined.map(q=>[String(q.id),q])).values()).filter(q=>q&&q.cityId===key&&q.citySource!=='registry-complete');
}
function start(city){
  const key=cityKey(city),now=Date.now()>>>0,unique=verifiedCityPool(city);
  const h=history(),recent=new Set(Array.isArray(h[key])?h[key]:[]);
  let pool=unique.filter(q=>!recent.has(String(q.id)));
  if(pool.length<5)pool=unique.slice();
  if(pool.length<5)return [];
  const seed=(now^((key.length*2654435761)>>>0))>>>0;
  const selected=global.PatriaQuiz.seededShuffle(pool,seed).slice(0,5);
  h[key]=selected.map(q=>String(q.id)).slice(-Math.max(20,unique.length));saveHistory(h);
  return selected.map(q=>global.PatriaQuiz.prepare(q));
}
function finish(city,score,correct){
  const p=global.PatriaPlayer.current(),result={id:crypto.randomUUID?.()||Date.now()+'',city,score:Math.max(0,score|0),correct:Math.max(0,correct|0),answers:5,name:p.name||'Gost',date:new Date().toISOString(),period:'daily'};
  save(read().concat(result));global.PatriaPlayer.addCityScore(city,result.score);global.PatriaPlayer.recordResult({category:'brani-svoj-grad',points:result.score,xp:result.score,correct:result.correct,answers:5,city,period:'daily',id:result.id});
  const m=missions();m.played++;m.points+=result.score;if(result.correct===5)m.perfect++;saveMissions(m);global.PatriaBadges?.evaluate(global.PatriaPlayer.current());
  return{...result,missions:{played:m.played,perfect:m.perfect,points:m.points,completed:[m.played>=1?'prvi-izazov':null,m.perfect>=1?'bezgresni-branitelj':null,m.points>=1000?'cuvar-grada':null].filter(Boolean)}}
}
function cityRows(city){return read().filter(r=>!city||r.city===city).sort((a,b)=>b.score-a.score)}
global.PatriaCityGame={start,finish,results:read,cityRows,missions,questionCount:city=>verifiedCityPool(city).length};
})(typeof window!=='undefined'?window:globalThis);
