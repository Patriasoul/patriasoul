// PatriaSoul — centralna lokalna rang-lista i adapter za budući Supabase.
(function(global){'use strict';
 const KEY='patriasoul_leaderboard_v2';
 function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(_){return []}}
 function save(x){localStorage.setItem(KEY,JSON.stringify(x.slice(-500)));return x}
 function submit(result){const p=global.PatriaPlayer.current();const r={id:(crypto.randomUUID?.()||Date.now()+''),name:p.name||'Gost',xp:Number(result.xp)||0,points:Number(result.points)||0,quizzes:Number(result.quizzes)||1,correct:Number(result.correct)||0,city:result.city||null,date:new Date().toISOString(),period:result.period||'all'};const rows=read();rows.push(r);save(rows);return r}
 function aggregate(type){const rows=read();const map=new Map();rows.forEach(r=>{const key=(r.name||'Gost').toLocaleLowerCase('hr-HR');const x=map.get(key)||{name:r.name||'Gost',xp:0,points:0,quizzes:0,correct:0};x.xp+=r.xp;x.points+=r.points;x.quizzes+=r.quizzes;x.correct+=r.correct;map.set(key,x)});return [...map.values()].sort((a,b)=>(type==='xp'?b.xp-a.xp:b.points-a.points))}
 global.PatriaLeaderboard={read,save,submit,aggregate};
})(typeof window!=='undefined'?window:globalThis);
