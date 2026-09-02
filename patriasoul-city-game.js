// PatriaSoul – Brani svoj grad engine: 75 pitanja po gradu.
// U igru ulaze isključivo provjerena, gradu pripisana pitanja.
(function(global){'use strict';
const KEY='patriasoul_city_results_v3',MISSION_KEY='patriasoul_city_missions_v1',HISTORY_KEY='patriasoul_city_question_history_v1';
const ACTIVE_LAYER_IDS=Array.from({length:127},(_,i)=>i+1).filter(i=>i!==33&&i!==121);
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(_){return []}}
function save(x){try{localStorage.setItem(KEY,JSON.stringify(x.slice(-1000)))}catch(_){}return x}
function missions(){try{return JSON.parse(localStorage.getItem(MISSION_KEY)||'{"played":0,"perfect":0,"points":0}')||{played:0,perfect:0,points:0}}catch(_){return{played:0,perfect:0,points:0}}}
function saveMissions(m){localStorage.setItem(MISSION_KEY,JSON.stringify(m));return m}
function history(){try{const x=JSON.parse(localStorage.getItem(HISTORY_KEY)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return {}}}
function saveHistory(x){try{localStorage.setItem(HISTORY_KEY,JSON.stringify(x))}catch(_){}return x}
function cityKey(city){return String(city).toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function loadLatestVerifiedLayer(){
  if(typeof document==='undefined')return Promise.resolve({loaded:[],missing:[]});
  const jobs=[];
  for(const i of ACTIVE_LAYER_IDS){
    const src='/patriasoul-city-questions-verified-'+i+'.js';
    if(document.querySelector('script[src="'+src+'"]')){jobs.push(Promise.resolve({i,ok:true}));continue}
    jobs.push(new Promise(resolve=>{const s=document.createElement('script');s.src=src;s.defer=false;s.onload=()=>resolve({i,ok:true});s.onerror=()=>resolve({i,ok:false});document.head.appendChild(s)}));
  }
  return Promise.all(jobs).then(r=>{const loaded=r.filter(x=>x.ok).map(x=>x.i),missing=r.filter(x=>!x.ok).map(x=>x.i);global.PatriaCityGameLoadStatus={loaded,missing,complete:missing.length===0};return{loaded,missing}});
}
const ready=loadLatestVerifiedLayer();
let readyState=false;
ready.then(status=>{readyState=status.missing.length===0;setTimeout(()=>global.PatriaCityQuestionAudit?.run?.(),0)});
if(typeof document!=='undefined')document.addEventListener('click',e=>{if(!readyState&&e.target.closest?.('.city-btn')){e.preventDefault();e.stopImmediatePropagation()}},true);
function verifiedLayers(city){const out=[];for(const i of ACTIVE_LAYER_IDS){const layer=global[`PatriaCityVerified${i}`];if(layer?.forCity)out.push((layer.forCity(city)||[]).slice(0,75))}return out}
function verifiedCityPool(city){const key=cityKey(city),cityBank=global.PatriaCityQuestions?.forCity?.(city)||[];const combined=[cityBank,...verifiedLayers(city)].flat();return Array.from(new Map(combined.map(q=>[String(q.id),q])).values()).filter(q=>q&&q.cityId===key&&q.citySource==='verified'&&q.quality==='verified')}
function start(city){const key=cityKey(city),unique=verifiedCityPool(city),target=75;if(!readyState||unique.length<target)return [];const seed=((Date.now()>>>0)^((key.length*2654435761)>>>0))>>>0;const selected=global.PatriaQuiz.seededShuffle(unique,seed).slice(0,target);const h=history();h[key]=selected.map(q=>String(q.id));saveHistory(h);return selected.map(q=>global.PatriaQuiz.prepare(q))}
function finish(city,score,correct,total){const p=global.PatriaPlayer.current(),answers=Math.max(0,Number(total)||75),result={id:crypto.randomUUID?.()||Date.now()+'',city,score:Math.max(0,score|0),correct:Math.max(0,correct|0),answers,name:p.name||'Gost',date:new Date().toISOString(),period:'daily'};save(read().concat(result));global.PatriaPlayer.addCityScore(city,result.score);global.PatriaPlayer.recordResult({category:'brani-svoj-grad',points:result.score,xp:result.score,correct:result.correct,answers,city,period:'daily',id:result.id});const m=missions();m.played++;m.points+=result.score;if(result.correct===answers)m.perfect++;saveMissions(m);global.PatriaBadges?.evaluate(global.PatriaPlayer.current());return{...result,missions:{played:m.played,perfect:m.perfect,points:m.points,completed:[m.played>=1?'prvi-izazov':null,m.perfect>=1?'bezgresni-branitelj':null,m.points>=1000?'cuvar-grada':null].filter(Boolean)}}}
function cityRows(city){return read().filter(r=>!city||r.city===city).sort((a,b)=>b.score-a.score)}
global.PatriaCityGame={start,finish,results:read,cityRows,missions,questionCount:city=>verifiedCityPool(city).length,ready,activeLayerIds:ACTIVE_LAYER_IDS.slice()};
})(typeof window!=='undefined'?window:globalThis);
