// PatriaSoul – centralni kviz engine
// Opcije se uvijek preslaguju; točan odgovor je vezan uz ID opcije, ne uz A/B/C/D.
(function(){
  const base=typeof PATRIA_QUESTIONS!=='undefined'?PATRIA_QUESTIONS:[];
  const categories=typeof PATRIA_CATEGORIES!=='undefined'?PATRIA_CATEGORIES:{};
  window.PATRIA_QUESTIONS=base.slice(); window.PATRIA_CATEGORIES=categories;
  window.PatriaQuiz={
    ready:Promise.resolve(), bank:function(){return window.PATRIA_QUESTIONS||[]},
    shuffle:function(items){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
    prepare:function(q){const options=this.shuffle(q.answers.map((text,index)=>({text,index})));return {...q,options,correctIndex:options.findIndex(x=>x.index===q.correctIndex)}},
    byCategory:function(category,count=10){const list=this.bank().filter(q=>category==='mijesani'||q.category===category);return this.shuffle(list).slice(0,count).map(q=>this.prepare(q))},
    periodSeed:function(period){const d=new Date();if(period==='daily')return d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();if(period==='weekly'){const onejan=new Date(Date.UTC(d.getUTCFullYear(),0,1));return d.getUTCFullYear()*1000+Math.floor(((d-onejan)/86400000+onejan.getUTCDay()+6)/7)}return d.getUTCFullYear()*100+d.getUTCMonth()+1},
    seededShuffle:function(items,seed){const a=items.slice();let s=seed>>>0;for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a},
    periodQuiz:function(period='daily',count=10){return this.seededShuffle(this.bank(),this.periodSeed(period)).slice(0,count).map(q=>this.prepare(q))},
    validate:function(){const bank=this.bank();const ids=new Set();const by={};let invalid=0;bank.forEach(q=>{if(ids.has(q.id)||!Array.isArray(q.answers)||q.answers.length!==4||q.correctIndex<0||q.correctIndex>3)invalid++;ids.add(q.id);by[q.category]=(by[q.category]||0)+1});return{total:bank.length,invalid,duplicates:bank.length-ids.size,byCategory:by}}
  };
  // Svi podaci su u korijenu GitHub Pagesa.
  document.write('<scr'+'ipt src="domovinski.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="question_banks_800.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="question_banks_1200.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="povijest_extra.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="bastina.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="bitke.js"></scr'+'ipt>');
  if(typeof PATRIA_DOMOVINSKI!=='undefined') window.PATRIA_QUESTIONS=window.PATRIA_QUESTIONS.concat(PATRIA_DOMOVINSKI);
  Object.values(window.PATRIA_EXTRA_QUESTIONS||{}).forEach(bank=>{if(Array.isArray(bank))window.PATRIA_QUESTIONS.push(...bank)});
  if(typeof window.PATRIA_BASTINA!=='undefined'&&Array.isArray(window.PATRIA_BASTINA)) window.PATRIA_QUESTIONS.push(...window.PATRIA_BASTINA);
  if(typeof window.PATRIA_BITKE!=='undefined'&&Array.isArray(window.PATRIA_BITKE)) window.PATRIA_QUESTIONS.push(...window.PATRIA_BITKE);
  window.PATRIA_QUESTIONS=Array.from(new Map(window.PATRIA_QUESTIONS.map(q=>[q.id,q])).values());
  window.PatriaQuiz.ready=Promise.resolve();
})();
(function(){
  const KEY='patriasoul_player',NAMES='patriasoul_nicknames';
  function read(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}} function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
  function clean(s){return String(s||'').trim().replace(/\s+/g,' ')} function valid(s){return /^[A-Za-z0-9ČĆŽŠĐčćžšđ _-]{3,20}$/.test(s)}
  function current(){return read(KEY,{name:'',xp:0,points:0,quizzes:0,correct:0,streak:0,badges:[],cities:{}})}
  function choose(name){name=clean(name);if(!valid(name))return{ok:false,error:'Nadimak mora imati 3–20 znakova.'};const names=read(NAMES,[]),p=current(),taken=names.some(n=>n.toLocaleLowerCase('hr-HR')===name.toLocaleLowerCase('hr-HR'));if(taken&&p.name.toLocaleLowerCase('hr-HR')!==name.toLocaleLowerCase('hr-HR'))return{ok:false,error:'Ovaj nadimak je već zauzet na ovom uređaju.'};if(!taken)names.push(name);p.name=name;save(NAMES,names);save(KEY,p);save('patriasoul_profile',p);return{ok:true,player:p}}
  window.PatriaPlayer={current,choose};
})();