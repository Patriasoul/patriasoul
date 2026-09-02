// PatriaSoul — centralni kviz engine. Jedan engine, jedna banka, jedan profil.
(function(){'use strict';
 const base=typeof PATRIA_QUESTIONS!=='undefined'&&Array.isArray(PATRIA_QUESTIONS)?PATRIA_QUESTIONS:[];
 window.PATRIA_QUESTIONS=base.slice();window.PATRIA_CATEGORIES=typeof PATRIA_CATEGORIES!=='undefined'&&PATRIA_CATEGORIES?PATRIA_CATEGORIES:{};
 function load(src){document.write('<scr'+'ipt src="'+src+'"></scr'+'ipt>')}
 load('question_banks_800.js');load('question_banks_1200.js');load('bastina.js');
 if(Array.isArray(window.PATRIA_DOMOVINSKI))window.PATRIA_QUESTIONS.push(...window.PATRIA_DOMOVINSKI);
 Object.values(window.PATRIA_EXTRA_QUESTIONS||{}).forEach(bank=>{if(Array.isArray(bank))window.PATRIA_QUESTIONS.push(...bank)});
 if(Array.isArray(window.PATRIA_BASTINA))window.PATRIA_QUESTIONS.push(...window.PATRIA_BASTINA);
 if(Array.isArray(window.PATRIA_BITKE))window.PATRIA_QUESTIONS.push(...window.PATRIA_BITKE);
 window.PATRIA_QUESTIONS=Array.from(new Map(window.PATRIA_QUESTIONS.filter(q=>q&&q.id!=null).map(q=>[String(q.id),q])).values());
 function shuffle(items,rng=Math.random){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function prepare(q){const answers=Array.isArray(q.answers)?q.answers:[];const options=shuffle(answers.map((text,index)=>({text,index})));return {...q,options,correctIndex:options.findIndex(x=>x.index===Number(q.correctIndex))}}
 function periodSeed(period){const d=new Date();if(period==='daily')return d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();if(period==='weekly'){const onejan=new Date(Date.UTC(d.getUTCFullYear(),0,1));const day=Math.floor((d-onejan)/86400000);return d.getUTCFullYear()*1000+Math.floor((day+onejan.getUTCDay()+6)/7)}return d.getUTCFullYear()*100+d.getUTCMonth()+1}
 function seededShuffle(items,seed){const a=items.slice();let s=seed>>>0;for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
 function validate(){const ids=new Set(),by={},errors=[];let invalid=0;window.PATRIA_QUESTIONS.forEach((q,index)=>{const id=String(q.id||''),a=Array.isArray(q.answers)?q.answers:[],c=Number(q.correctIndex),bad=!id||a.length!==4||a.some(x=>typeof x!=='string'||!x.trim())||!Number.isInteger(c)||c<0||c>3;if(bad){invalid++;if(errors.length<20)errors.push({index,id,reason:'ID + 4 odgovora + correctIndex 0–3 su obavezni'})}ids.add(id);const cat=q.category||'nepoznato';by[cat]=(by[cat]||0)+1});return{total:window.PATRIA_QUESTIONS.length,invalid,duplicates:window.PATRIA_QUESTIONS.length-ids.size,byCategory:by,errors}}
 async function recordResult(r){const result=r||{};const local=window.PatriaPlayer?.recordResult?.(result);try{await window.PatriaLeaderboard?.submit?.(result)}catch(e){console.warn('PatriaSoul remote result fallback:',e)}return local}
 window.PatriaQuiz={ready:Promise.resolve(),bank:()=>window.PATRIA_QUESTIONS.slice(),shuffle,prepare,byCategory:(cat,count=10)=>shuffle(window.PATRIA_QUESTIONS.filter(q=>cat==='mijesani'||q.category===cat)).slice(0,count).map(prepare),periodSeed,seededShuffle,periodQuiz:(period='daily',count=10)=>seededShuffle(window.PATRIA_QUESTIONS,periodSeed(period)).slice(0,count).map(prepare),validate,recordResult};
})();
