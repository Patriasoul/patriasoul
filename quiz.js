// PatriaSoul – centralni kviz engine
// 10 stvarnih kategorija × 100 pitanja = 1000 jedinstvenih pitanja.
// Miješani kviz je način igre nad svih 1000 pitanja, nije 11. kategorija.
(function(){
  'use strict';
  const KNOWN_LABELS={
    povijest:'Hrvatska povijest',domovinski_rat:'Domovinski rat',kraljevi:'Hrvatski kraljevi',
    katolicka_bastina:'Katolička baština',kulturna_bastina:'Kulturna baština',geografija:'Hrvatska geografija',
    glazba:'Hrvatska glazba',gradovi:'Gradovi i znamenitosti',jezik:'Jezik i književnost',sport:'Hrvatski sport'
  };
  const humanize=k=>KNOWN_LABELS[k]||k.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  window.PATRIA_QUESTIONS=[];window.PATRIA_CATEGORIES={};
  document.write('<scr'+'ipt src="domovinski.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="question_banks_800.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="sport_bank.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="povijest_extra.js"></scr'+'ipt>');
  function normalize(raw,category,index,prefix){
    if(Array.isArray(raw))return {id:`${prefix}_${String(index+1).padStart(3,'0')}`,category,question:String(raw[0]||'').trim(),answers:[String(raw[1]||''),String(raw[2]||''),String(raw[3]||''),String(raw[4]||'')],correctIndex:0};
    return {id:raw.id||`${prefix}_${String(index+1).padStart(3,'0')}`,category,question:String(raw.question||raw.q||'').trim(),answers:Array.isArray(raw.answers)?raw.answers.map(String):[],correctIndex:Number.isInteger(raw.correctIndex)?raw.correctIndex:0};
  }
  const extra=window.PATRIA_EXTRA_QUESTIONS||{};const byCategory={};
  Object.keys(extra).forEach(key=>{if(key==='povijest_extra')return;if(Array.isArray(extra[key]))byCategory[key]=extra[key].map((q,i)=>normalize(q,key,i,key));});
  if(Array.isArray(extra.povijest_extra))byCategory.povijest=extra.povijest_extra.map((q,i)=>normalize(q,'povijest',i,'povijest'));
  if(Array.isArray(window.PATRIA_DOMOVINSKI))byCategory.domovinski_rat=window.PATRIA_DOMOVINSKI.map((q,i)=>normalize(q,'domovinski_rat',i,'dr'));
  const categories=Object.keys(byCategory);const counts=Object.fromEntries(categories.map(k=>[k,byCategory[k].length]));
  if(categories.length!==10||categories.some(k=>byCategory[k].length!==100))throw new Error('PatriaSoul: očekuje se točno 10 kategorija po 100 pitanja. '+JSON.stringify({categories,counts}));
  window.PATRIA_CATEGORIES=Object.fromEntries(categories.map(k=>[k,humanize(k)]));
  const bank=categories.flatMap(k=>byCategory[k]);window.PATRIA_QUESTIONS=bank;
  function shuffle(items){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function prepare(q){const options=shuffle(q.answers.map((text,index)=>({text,index})));return {...q,options,correctIndex:options.findIndex(x=>x.index===q.correctIndex)};}
  function periodSeed(period){const d=new Date();if(period==='daily')return d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();if(period==='weekly'){const onejan=new Date(Date.UTC(d.getUTCFullYear(),0,1));return d.getUTCFullYear()*1000+Math.floor(((d-onejan)/86400000+onejan.getUTCDay()+6)/7);}return d.getUTCFullYear()*100+d.getUTCMonth()+1;}
  function seededShuffle(items,seed){const a=items.slice();let s=seed>>>0;for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
  function validate(){
    const ids=new Set(),texts=new Set(),by={},answerSets=new Set();let invalid=0,duplicates=0,duplicateQuestions=0,duplicateAnswers=0;
    bank.forEach(q=>{
      if(ids.has(q.id))duplicates++;ids.add(q.id);
      const text=q.question.toLocaleLowerCase('hr-HR');if(texts.has(text))duplicateQuestions++;texts.add(text);
      const answers=q.answers.map(a=>String(a).trim());const uniqueAnswers=new Set(answers.map(a=>a.toLocaleLowerCase('hr-HR')));if(uniqueAnswers.size!==4)duplicateAnswers++;
      if(!q.id||!q.question||answers.length!==4||answers.some(a=>!a)||uniqueAnswers.size!==4||!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3)invalid++;
      by[q.category]=(by[q.category]||0)+1;
    });
    return {total:bank.length,categories:categories.length,invalid,duplicates,duplicateQuestions,duplicateAnswers,exact1000:bank.length===1000&&categories.length===10&&invalid===0&&duplicates===0&&duplicateQuestions===0&&duplicateAnswers===0,byCategory:by,eachCategory100:categories.every(k=>by[k]===100)};
  }
  window.PatriaQuiz={ready:Promise.resolve(),bank:()=>window.PATRIA_QUESTIONS||[],categories:()=>categories.slice(),shuffle,prepare,byCategory:(category,count=10)=>{const list=category==='mijesani'?bank:bank.filter(q=>q.category===category);return shuffle(list).slice(0,count).map(prepare);},periodSeed,seededShuffle,periodQuiz:(period='daily',count=10)=>seededShuffle(bank,periodSeed(period)).slice(0,count).map(prepare),periodCategoryQuiz:(period='daily',category='mijesani',count=10)=>{const list=category==='mijesani'?bank:bank.filter(q=>q.category===category);return seededShuffle(list,periodSeed(period)).slice(0,count).map(prepare);},validate};
  window.PATRIA_QUIZ_VALIDATION=validate();
  if(!window.PATRIA_QUIZ_VALIDATION.exact1000||!window.PATRIA_QUIZ_VALIDATION.eachCategory100)throw new Error('PatriaSoul: VALIDACIJA 1000 PITANJA NIJE PROŠLA.');
})();
(function(){
  const KEY='patriasoul_player',NAMES='patriasoul_nicknames';
  function read(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
  function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
  function clean(s){return String(s||'').trim().replace(/\s+/g,' ')}
  function valid(s){return /^[A-Za-z0-9ČĆŽŠĐčćžšđ _-]{3,20}$/.test(s)}
  function current(){return read(KEY,{name:'',xp:0,points:0,quizzes:0,correct:0,streak:0,badges:[]})}
  function choose(name){name=clean(name);if(!valid(name))return{ok:false,error:'Nadimak mora imati 3–20 znakova.'};const names=read(NAMES,[]),taken=names.some(n=>n.toLocaleLowerCase('hr-HR')===name.toLocaleLowerCase('hr-HR')),p=current();if(taken&&p.name.toLocaleLowerCase('hr-HR')!==name.toLocaleLowerCase('hr-HR'))return{ok:false,error:'Ovaj nadimak je već zauzet na ovom uređaju.'};if(!taken)names.push(name);p.name=name;save(NAMES,names);save(KEY,p);save('patriasoul_profile',p);return{ok:true,player:p}}
  window.PatriaPlayer={current,choose};
})();
