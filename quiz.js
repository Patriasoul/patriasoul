// PatriaSoul – centralni kviz engine
// 10 kategorija × 100 pitanja = 1000 pitanja.
// Odgovori se uvijek preslaguju; tocnost je vezana uz originalni index opcije.
(function(){
  'use strict';

  const LABELS={
    povijest:'Hrvatska povijest',
    domovinski_rat:'Domovinski rat',
    kraljevi:'Hrvatski kraljevi',
    katolicka_bastina:'Katolicka bastina',
    kulturna_bastina:'Kulturna bastina',
    geografija:'Hrvatska geografija',
    glazba:'Hrvatska glazba',
    gradovi:'Gradovi i znamenitosti',
    jezik:'Jezik i knjizevnost',
    mijesani:'Mijesani kviz'
  };
  const BASE_CATEGORY_KEYS=['geografija','gradovi','kraljevi','katolicka_bastina','kulturna_bastina','glazba','jezik'];

  // question_banks_800.js i povijest_extra.js su u korijenu repozitorija.
  // domovinski.js takodjer je u korijenu. Ne koristimo data.js bazu jer zelimo tocno
  // 1000 pitanja iz 10 kontroliranih kategorija.
  window.PATRIA_CATEGORIES=LABELS;
  window.PATRIA_QUESTIONS=[];

  document.write('<scr'+'ipt src="domovinski.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="question_banks_800.js"></scr'+'ipt>');
  document.write('<scr'+'ipt src="povijest_extra.js"></scr'+'ipt>');

  function normalizeQuestion(raw,category,index,prefix){
    const answers=Array.isArray(raw.answers)?raw.answers.slice():[];
    return {
      id:raw.id||(`${prefix}_${String(index+1).padStart(3,'0')}`),
      category,
      question:String(raw.question||raw.q||'').trim(),
      answers,
      correctIndex:Number.isInteger(raw.correctIndex)?raw.correctIndex:0
    };
  }

  function normalizeArrayBank(bank,category,prefix){
    return bank.map((raw,i)=>{
      // povijest_extra.js koristi format [pitanje,tocan,pogresan,pogresan,pogresan].
      if(Array.isArray(raw)){
        return {id:`${prefix}_${String(i+1).padStart(3,'0')}`,category,question:String(raw[0]||'').trim(),answers:[raw[1],raw[2],raw[3],raw[4]],correctIndex:0};
      }
      return normalizeQuestion(raw,category,i,prefix);
    });
  }

  const banks=[];
  const extra=window.PATRIA_EXTRA_QUESTIONS||{};

  // Osam 100-pitanja banaka iz question_banks_800.js.
  Object.keys(extra).forEach(key=>{
    if(key==='povijest_extra')return;
    if(Array.isArray(extra[key]))banks.push({category:key,items:normalizeArrayBank(extra[key],key,key)});
  });

  // Povijest + Domovinski rat cine preostale dvije kategorije.
  if(Array.isArray(extra.povijest_extra))banks.push({category:'povijest',items:normalizeArrayBank(extra.povijest_extra,'povijest','povijest')});
  if(Array.isArray(window.PATRIA_DOMOVINSKI))banks.push({category:'domovinski_rat',items:normalizeArrayBank(window.PATRIA_DOMOVINSKI,'domovinski_rat','dr')});

  // Stroga kontrola: 10 stvarnih kategorija, svaka tocno 100 pitanja.
  const byCategory={};
  banks.forEach(bank=>{
    byCategory[bank.category]=(byCategory[bank.category]||[]).concat(bank.items);
  });

  const required=Object.keys(LABELS).filter(k=>k!=='mijesani');
  const missing=required.filter(k=>!byCategory[k]);
  const wrong=required.filter(k=>byCategory[k]&&byCategory[k].length!==100);
  if(required.length!==9||missing.length||wrong.length||!byCategory.domovinski_rat||!byCategory.povijest){
    throw new Error('PatriaSoul baza nije tocno 9 sadrzajnih kategorija po 100 pitanja: '+JSON.stringify({missing,wrong,counts:Object.fromEntries(Object.entries(byCategory).map(([k,v])=>[k,v.length]))}));
  }

  const source=[];
  required.forEach(category=>source.push(...byCategory[category]));
  if(source.length!==900)throw new Error('PatriaSoul: ocekuje se 900 izvornih pitanja, pronadjeno '+source.length);

  // Mijesani kviz je zasebna 10. kategorija sa 100 odabranih pitanja iz svih 900.
  // Pitanja ostaju ista po sadrzaju, ali dobivaju vlastiti ID i kategoriju.
  const mixed=thisSeededSample(source,100,20260901).map((q,i)=>({...q,id:`mijesani_${String(i+1).padStart(3,'0')}`,category:'mijesani'}));
  window.PATRIA_QUESTIONS=source.concat(mixed);

  function thisSeededSample(items,count,seed){
    const a=items.slice();let s=seed>>>0;
    for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}
    return a.slice(0,count);
  }

  function shuffle(items){
    const a=items.slice();
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }

  function prepare(q){
    const options=shuffle(q.answers.map((text,index)=>({text,index})));
    return {...q,options,correctIndex:options.findIndex(x=>x.index===q.correctIndex)};
  }

  function periodSeed(period){
    const d=new Date();
    if(period==='daily')return d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();
    if(period==='weekly'){
      const onejan=new Date(Date.UTC(d.getUTCFullYear(),0,1));
      return d.getUTCFullYear()*1000+Math.floor(((d-onejan)/86400000+onejan.getUTCDay()+6)/7);
    }
    return d.getUTCFullYear()*100+d.getUTCMonth()+1;
  }

  function seededShuffle(items,seed){
    const a=items.slice();let s=seed>>>0;
    for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }

  function validate(){
    const bank=window.PATRIA_QUESTIONS||[];const ids=new Set();const by={};let invalid=0;let duplicates=0;
    bank.forEach(q=>{
      if(ids.has(q.id))duplicates++;
      ids.add(q.id);
      if(!q.id||!q.question||!Array.isArray(q.answers)||q.answers.length!==4||q.answers.some(a=>typeof a!=='string'||!a.trim())||q.correctIndex<0||q.correctIndex>3)invalid++;
      by[q.category]=(by[q.category]||0)+1;
    });
    const contentCategories=Object.keys(LABELS).filter(k=>k!=='mijesani');
    return {total:bank.length,categories:contentCategories.length+1,invalid,duplicates,exact1000:bank.length===1000&&invalid===0&&duplicates===0,byCategory:by,eachCategory100:contentCategories.concat('mijesani').every(k=>by[k]===100)};
  }

  window.PatriaQuiz={
    ready:Promise.resolve(),
    bank:()=>window.PATRIA_QUESTIONS||[],
    categories:()=>Object.keys(LABELS),
    shuffle,
    prepare,
    byCategory:(category,count=10)=>shuffle(window.PATRIA_QUESTIONS.filter(q=>category==='mijesani'?q.category==='mijesani':q.category===category)).slice(0,count).map(prepare),
    periodSeed,
    seededShuffle,
    periodQuiz:(period='daily',count=10)=>seededShuffle(window.PATRIA_QUESTIONS,periodSeed(period)).slice(0,count).map(prepare),
    periodCategoryQuiz:(period='daily',category='mijesani',count=10)=>seededShuffle(window.PATRIA_QUESTIONS.filter(q=>category==='mijesani'?q.category==='mijesani':q.category===category),periodSeed(period)).slice(0,count).map(prepare),
    validate
  };

  window.PATRIA_QUIZ_VALIDATION=validate();
  if(!window.PATRIA_QUIZ_VALIDATION.exact1000)throw new Error('PatriaSoul: VALIDACIJA 1000 PITANJA NIJE PROSLA.');
})();

// Ulazak igraca bez lozinke. Nadimak se na GitHub Pagesu provjerava lokalno.
(function(){
  const KEY='patriasoul_player';
  const NAMES='patriasoul_nicknames';
  function read(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
  function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
  function clean(s){return String(s||'').trim().replace(/\s+/g,' ')}
  function valid(s){return /^[A-Za-z0-9ČĆŽŠĐčćžšđ _-]{3,20}$/.test(s)}
  function current(){return read(KEY,{name:'',xp:0,points:0,quizzes:0,correct:0,streak:0,badges:[]})}
  function choose(name){name=clean(name);if(!valid(name))return{ok:false,error:'Nadimak mora imati 3–20 znakova.'};const names=read(NAMES,[]);const taken=names.some(n=>n.toLocaleLowerCase('hr-HR')===name.toLocaleLowerCase('hr-HR'));const p=current();if(taken&&p.name.toLocaleLowerCase('hr-HR')!==name.toLocaleLowerCase('hr-HR'))return{ok:false,error:'Ovaj nadimak je već zauzet na ovom uređaju.'};if(!taken)names.push(name);p.name=name;save(NAMES,names);save(KEY,p);save('patriasoul_profile',p);return{ok:true,player:p}}
  window.PatriaPlayer={current,choose};
})();