// PatriaSoul — Brani svoj grad engine: izazov, gradski bodovi i misije.
(function(global){'use strict';
const KEY='patriasoul_city_results_v3',MISSION_KEY='patriasoul_city_missions_v1';
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(_){return []}}
function save(x){try{localStorage.setItem(KEY,JSON.stringify(x.slice(-1000)))}catch(_){}return x}
function missions(){try{return JSON.parse(localStorage.getItem(MISSION_KEY)||'{"played":0,"perfect":0,"points":0}')||{played:0,perfect:0,points:0}}catch(_){return{played:0,perfect:0,points:0}}}
function saveMissions(m){localStorage.setItem(MISSION_KEY,JSON.stringify(m));return m}
function start(city){
  const seed=[...String(city)].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,17);
  const cityBank=global.PatriaCityQuestions?.forCity?.(city)||[];
  const verified=global.PatriaCityVerified?.forCity?.(city)||[];
  const verified2=global.PatriaCityVerified2?.forCity?.(city)||[];
  const verified3=global.PatriaCityVerified3?.forCity?.(city)||[];
  const verified4=global.PatriaCityVerified4?.forCity?.(city)||[];
  const verified5=global.PatriaCityVerified5?.forCity?.(city)||[];
  const combined=[...cityBank,...verified,...verified2,...verified3,...verified4,...verified5];
  const unique=Array.from(new Map(combined.map(q=>[String(q.id),q])).values());
  const pool=unique.length>=5?unique:unique.concat(global.PatriaQuiz.bank().filter(q=>q&&!q.cityId));
  return global.PatriaQuiz.seededShuffle(pool,seed).slice(0,5).map(q=>global.PatriaQuiz.prepare(q));
}
function finish(city,score,correct){
  const p=global.PatriaPlayer.current(),result={id:crypto.randomUUID?.()||Date.now()+'',city,score:Math.max(0,score|0),correct:Math.max(0,correct|0),answers:5,name:p.name||'Gost',date:new Date().toISOString(),period:'daily'};
  save(read().concat(result));
  global.PatriaPlayer.addCityScore(city,result.score);
  global.PatriaPlayer.recordResult({category:'brani-svoj-grad',points:result.score,xp:result.score,correct:result.correct,answers:5,city,period:'daily',id:result.id});
  const m=missions();m.played++;m.points+=result.score;if(result.correct===5)m.perfect++;saveMissions(m);
  global.PatriaBadges?.evaluate(global.PatriaPlayer.current());
  return{...result,missions:{played:m.played,perfect:m.perfect,points:m.points,completed:[m.played>=1?'prvi-izazov':null,m.perfect>=1?'bezgresni-branitelj':null,m.points>=1000?'cuvar-grada':null].filter(Boolean)}}
}
function cityRows(city){return read().filter(r=>!city||r.city===city).sort((a,b)=>b.score-a.score)}
global.PatriaCityGame={start,finish,results:read,cityRows,missions};
})(typeof window!=='undefined'?window:globalThis);
