// PatriaSoul — jedinstveni profil, XP, statistika, streak i omiljena pitanja.
// Jedan izvor istine za klijentski profil. Backend može preuzeti isti oblik zapisa.
(function(global){
  'use strict';
  const KEY='patriasoul_player_v2';
  const LEGACY=['patriasoul_player','patriasoul_xp','patriasoul_player_progress_v1'];
  const EMPTY={version:2,id:null,name:'',xp:0,points:0,quizzes:0,correct:0,answers:0,streak:0,lastPlayed:null,badges:[],favorites:[],categories:{},cities:{},periods:{},results:[]};
  const safe=(v,n=0)=>Number.isFinite(Number(v))?Number(v):n;
  function readRaw(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){return null}}
  function migrate(){let p=readRaw(); if(p) return normalize(p); let old=null; for(const k of LEGACY){try{const x=JSON.parse(localStorage.getItem(k)||'null');if(x){old=x;break}}catch(_){} } if(!old)return normalize({}); return normalize(Object.assign({},old,{version:2}));}
  function normalize(x){const p=Object.assign({},EMPTY,x||{}); p.version=2;p.xp=Math.max(0,safe(p.xp));p.points=Math.max(0,safe(p.points));p.quizzes=Math.max(0,safe(p.quizzes));p.correct=Math.max(0,safe(p.correct));p.answers=Math.max(0,safe(p.answers));p.streak=Math.max(0,safe(p.streak));p.badges=Array.isArray(p.badges)?[...new Set(p.badges)]:[];p.favorites=Array.isArray(p.favorites)?[...new Set(p.favorites)]:[];p.categories=p.categories&&typeof p.categories==='object'?p.categories:{};p.cities=p.cities&&typeof p.cities==='object'?p.cities:{};p.periods=p.periods&&typeof p.periods==='object'?p.periods:{};p.results=Array.isArray(p.results)?p.results.slice(-100):[];return p;}
  function save(p){p=normalize(p);localStorage.setItem(KEY,JSON.stringify(p));return p;}
  function current(){return save(migrate())}
  function choose(name){const p=current();p.name=String(name||'').trim().slice(0,40);if(!p.id)p.id='local-'+cryptoRandom();return save(p)}
  function cryptoRandom(){try{return crypto.randomUUID()}catch(_){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)}}
  function dayKey(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Zagreb'}).format(new Date(d))}
  function periodKey(type,d=new Date()){const x=new Date(d),day=dayKey(x);if(type==='daily')return 'd:'+day;if(type==='monthly')return 'm:'+day.slice(0,7);if(type==='weekly'){const utc=new Date(Date.UTC(x.getFullYear(),x.getMonth(),x.getDate()));const n=utc.getUTCDay()||7;utc.setUTCDate(utc.getUTCDate()-n+1);return 'w:'+utc.toISOString().slice(0,10)}return 'all'}
  function recordResult(result){const r=result||{},p=current();const answers=Math.max(0,safe(r.answers));const correct=Math.min(answers,Math.max(0,safe(r.correct)));const points=Math.max(0,safe(r.points));const xp=Math.max(0,safe(r.xp??points));const category=String(r.category||'mijesano');p.xp+=xp;p.points+=points;p.quizzes+=1;p.correct+=correct;p.answers+=answers;const today=dayKey();if(p.lastPlayed===today){}else{const prev=p.lastPlayed?new Date(p.lastPlayed+'T12:00:00'):null;const now=new Date(today+'T12:00:00');const diff=prev?Math.round((now-prev)/86400000):null;p.streak=diff===1?p.streak+1:1;p.lastPlayed=today}if(!p.categories[category])p.categories[category]={quizzes:0,correct:0,answers:0,points:0,xp:0};const c=p.categories[category];c.quizzes++;c.correct+=correct;c.answers+=answers;c.points+=points;c.xp+=xp;const pk=periodKey(r.period||'all');if(!p.periods[pk])p.periods[pk]={points:0,xp:0,quizzes:0,correct:0};p.periods[pk].points+=points;p.periods[pk].xp+=xp;p.periods[pk].quizzes++;p.periods[pk].correct+=correct;p.results.push({id:r.id||cryptoRandom(),date:new Date().toISOString(),category,period:r.period||'all',points,xp,correct,answers,city:r.city||null});return save(p)}
  function toggleFavorite(id){const p=current(),key=String(id);const i=p.favorites.indexOf(key);i>=0?p.favorites.splice(i,1):p.favorites.push(key);return save(p)}
  function isFavorite(id){return current().favorites.includes(String(id))}
  function addCityScore(city,score){const p=current(),key=String(city);p.cities[key]=Math.max(safe(p.cities[key]),safe(score));return save(p)}
  function exportProfile(){return JSON.stringify(current(),null,2)}
  global.PatriaPlayer={KEY,current,save,choose,recordResult,toggleFavorite,isFavorite,addCityScore,dayKey,periodKey,exportProfile,migrate};
})(typeof window!=='undefined'?window:globalThis);
