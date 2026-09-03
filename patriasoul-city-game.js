// PatriaSoul – Brani svoj grad engine: 10 pitanja po igri, iz skupa od 75 provjerenih pitanja.
// U igru ulaze isključivo provjerena, gradu pripisana pitanja.
(function(global){'use strict';
const KEY='patriasoul_city_results_v3',MISSION_KEY='patriasoul_city_missions_v1',HISTORY_KEY='patriasoul_city_question_history_v1';
const ACTIVE_LAYER_IDS=Array.from({length:126},(_,i)=>i+2).filter(i=>i!==33&&i!==121);
const QUESTIONS_PER_GAME=10;
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
function verifiedCityPool(city){const key=cityKey(city),legacy=global.PatriaCityVerified?.forCity?.(city)||[],cityBank=global.PatriaCityQuestions?.forCity?.(city)||[];const combined=[legacy,cityBank,...verifiedLayers(city)].flat();return Array.from(new Map(combined.map(q=>[String(q.id),q])).values()).filter(q=>q&&q.cityId===key&&q.citySource==='verified')}
function start(city){
  const key=cityKey(city),unique=verifiedCityPool(city),target=QUESTIONS_PER_GAME;
  if(!readyState||unique.length<target)return [];
  const previous=history()[key]||[];
  let seed=((Date.now()>>>0)^((key.length*2654435761)>>>0))>>>0;
  let selected=global.PatriaQuiz.seededShuffle(unique,seed).slice(0,target);
  const same=selected.length===previous.length&&selected.every(q=>previous.includes(String(q.id)));
  if(same){seed=(seed+0x9e3779b9)>>>0;selected=global.PatriaQuiz.seededShuffle(unique,seed).slice(0,target)}
  const h=history();h[key]=selected.map(q=>String(q.id));saveHistory(h);
  const prepared=selected.map(q=>global.PatriaQuiz.prepare(q));
  // Legacy UI calls .slice(0,5). Keep that old UI compatible while returning the new 10-question game.
  const nativeSlice=Array.prototype.slice;
  Object.defineProperty(prepared,'slice',{configurable:true,value:function(start,end){if(start===0&&end===5)return nativeSlice.call(this,0,QUESTIONS_PER_GAME);return nativeSlice.call(this,start,end)}});
  return prepared;
}
function finish(city,score,correct,total){const p=global.PatriaPlayer.current(),answers=Math.max(0,Number(total)||QUESTIONS_PER_GAME),result={id:crypto.randomUUID?.()||Date.now()+'',city,score:Math.max(0,score|0),correct:Math.max(0,correct|0),answers,name:p.name||'Gost',date:new Date().toISOString(),period:'daily'};save(read().concat(result));global.PatriaPlayer.addCityScore(city,result.score);global.PatriaPlayer.recordResult({category:'brani-svoj-grad',points:result.score,xp:result.score,correct:result.correct,answers,city,period:'daily',id:result.id});const m=missions();m.played++;m.points+=result.score;if(result.correct===answers)m.perfect++;saveMissions(m);global.PatriaBadges?.evaluate(global.PatriaPlayer.current());return{...result,missions:{played:m.played,perfect:m.perfect,points:m.points,completed:[m.played>=1?'prvi-izazov':null,m.perfect>=1?'bezgresni-branitelj':null,m.points>=1000?'cuvar-grada':null].filter(Boolean)}}}
function cityRows(city){return read().filter(r=>!city||r.city===city).sort((a,b)=>b.score-a.score)}
function installGamePolish(){
  if(typeof document==='undefined')return;
  const style=document.createElement('style');
  style.textContent='.city-answer.correct{border-color:#35d47a!important;background:rgba(53,212,122,.28)!important;box-shadow:0 0 0 3px rgba(53,212,122,.16),0 8px 24px rgba(53,212,122,.14)!important;color:#fff!important;font-weight:850!important}.city-answer.wrong{background:rgba(201,75,75,.13)!important}.city-explanation{font-size:1rem!important;line-height:1.7!important;padding:19px 20px!important}.city-explanation strong{font-size:1.02rem!important;margin-bottom:8px!important}';
  document.head.appendChild(style);
  const labels=()=>{document.querySelectorAll('.stat').forEach(s=>{const b=s.querySelector('b'),small=s.querySelector('small');if(b&&small&&small.textContent.trim()==='pitanja po gradu')b.textContent=String(QUESTIONS_PER_GAME)});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',labels,{once:true});else labels();
  // The legacy page advances after 1200 ms. Extend only that specific answer callback so the explanation can be read.
  const nativeTimeout=global.setTimeout.bind(global);
  if(!global.__psCityTimeoutPatched){
    global.__psCityTimeoutPatched=true;
    global.setTimeout=function(fn,delay,...args){
      if(typeof fn==='function'&&Number(delay)===1200&&/pos\+\+/.test(Function.prototype.toString.call(fn)))delay=3200;
      return nativeTimeout(fn,delay,...args);
    };
  }
}
installGamePolish();
function installNicknameCard(){
  if(typeof document==='undefined')return;
  const mount=()=>{
    const search=document.querySelector('#odabir .search-card');
    if(!search||search.querySelector('.ps-nickname-card'))return;
    const card=document.createElement('div');
    card.className='ps-nickname-card';
    card.innerHTML='<div class="ps-nickname-icon">👤</div><div class="ps-nickname-copy"><strong>Tvoj igrački nadimak</strong><span>Upiši ime pod kojim želiš igrati i pratiti svoj rezultat.</span></div><input id="psCityNickname" type="text" maxlength="40" autocomplete="nickname" placeholder="Npr. Bruno, Branitelj, Dalmatinac…" aria-label="Tvoj igrački nadimak"><small id="psNicknameStatus" aria-live="polite"></small>';
    search.insertBefore(card,search.firstChild);
    const style=document.createElement('style');
    style.textContent='.ps-nickname-card{display:grid;grid-template-columns:auto 1fr minmax(220px,360px);gap:14px;align-items:center;margin-bottom:18px;padding:16px 18px;border:1px solid rgba(214,173,85,.24);border-radius:18px;background:linear-gradient(145deg,rgba(214,173,85,.08),rgba(255,255,255,.025))}.ps-nickname-icon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:rgba(214,173,85,.14);font-size:1.25rem}.ps-nickname-copy strong{display:block;color:#fff}.ps-nickname-copy span{display:block;margin-top:3px;color:rgba(255,255,255,.55);font-size:.84rem;line-height:1.35}.ps-nickname-card input{width:100%;box-sizing:border-box;padding:13px 14px;border:1px solid rgba(255,255,255,.14);border-radius:13px;background:#080c11;color:#fff;font:inherit}.ps-nickname-card input:focus{outline:none;border-color:#d6ad55;box-shadow:0 0 0 3px rgba(214,173,85,.1)}.ps-nickname-card small{display:none;grid-column:2/-1;color:#d6ad55}.ps-nickname-card.ready{border-color:rgba(214,173,85,.45)}@media(max-width:700px){.ps-nickname-card{grid-template-columns:auto 1fr}.ps-nickname-card input{grid-column:1/-1}.ps-nickname-card small{grid-column:1/-1}}';
    document.head.appendChild(style);
    const input=card.querySelector('#psCityNickname');
    const status=card.querySelector('#psNicknameStatus');
    const stored=localStorage.getItem('patriasoul_city_nickname')||'';
    if(stored)input.value=stored;
    const sync=()=>{const value=input.value.trim().slice(0,40);if(value){localStorage.setItem('patriasoul_city_nickname',value);card.classList.add('ready');status.textContent='Nadimak je spreman.'}else{localStorage.removeItem('patriasoul_city_nickname');card.classList.remove('ready');status.textContent=''}};
    input.addEventListener('input',sync);sync();
    const oldPrompt=global.prompt;
    global.prompt=function(message,defaultValue){
      if(typeof message==='string'&&(message.toLowerCase().includes('nadimak')||message.toLowerCase().includes('ime'))){
        input.focus();
        sync();
        return input.value.trim()||null;
      }
      return oldPrompt?oldPrompt.call(global,message,defaultValue):null;
    };
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
}
installNicknameCard();
global.PatriaCityGame={start,finish,results:read,cityRows,missions,questionCount:city=>verifiedCityPool(city).length,ready,activeLayerIds:ACTIVE_LAYER_IDS.slice(),questionsPerGame:QUESTIONS_PER_GAME};
})(typeof window!=='undefined'?window:globalThis);
