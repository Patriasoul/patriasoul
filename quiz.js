// PatriaSoul – centralni kviz engine
// Opcije se uvijek preslaguju; točan odgovor ostaje vezan uz indeks odgovora.
(function(){
  const base=typeof PATRIA_QUESTIONS!=='undefined'&&Array.isArray(PATRIA_QUESTIONS)?PATRIA_QUESTIONS:[];
  const categories=typeof PATRIA_CATEGORIES!=='undefined'&&PATRIA_CATEGORIES?PATRIA_CATEGORIES:{};
  window.PATRIA_QUESTIONS=base.slice();
  window.PATRIA_CATEGORIES=categories;

  function load(src){
    // Skripte se učitavaju sinkrono jer quiz.html pokreće ovaj engine bez defer-a.
    document.write('<scr'+'ipt src="'+src+'"></scr'+'ipt>');
  }

  // Na main grani postoje ove banke. Ne pozivamo nepostojeće datoteke jer bi
  // nepotrebni 404 zapisi zbunili provjeru stranice.
  load('question_banks_800.js');
  load('question_banks_1200.js');
  load('bastina.js');

  if(typeof PATRIA_DOMOVINSKI!=='undefined'&&Array.isArray(PATRIA_DOMOVINSKI)){
    window.PATRIA_QUESTIONS.push(...PATRIA_DOMOVINSKI);
  }
  Object.values(window.PATRIA_EXTRA_QUESTIONS||{}).forEach(bank=>{
    if(Array.isArray(bank)) window.PATRIA_QUESTIONS.push(...bank);
  });
  if(typeof window.PATRIA_BASTINA!=='undefined'&&Array.isArray(window.PATRIA_BASTINA)){
    window.PATRIA_QUESTIONS.push(...window.PATRIA_BASTINA);
  }
  if(typeof window.PATRIA_BITKE!=='undefined'&&Array.isArray(window.PATRIA_BITKE)){
    window.PATRIA_QUESTIONS.push(...window.PATRIA_BITKE);
  }

  // Jedan ID = jedno pitanje. Zadnja verzija istog ID-a ima prednost.
  window.PATRIA_QUESTIONS=Array.from(
    new Map(window.PATRIA_QUESTIONS.filter(Boolean).map(q=>[q.id,q])).values()
  );

  window.PatriaQuiz={
    ready:Promise.resolve(),
    bank:function(){return Array.isArray(window.PATRIA_QUESTIONS)?window.PATRIA_QUESTIONS:[]},

    shuffle:function(items){
      const a=items.slice();
      for(let i=a.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
      }
      return a;
    },

    prepare:function(q){
      const answers=Array.isArray(q.answers)?q.answers:[];
      const options=this.shuffle(answers.map((text,index)=>({text,index})));
      return {
        ...q,
        options,
        correctIndex:options.findIndex(x=>x.index===Number(q.correctIndex))
      };
    },

    byCategory:function(category,count=10){
      const list=this.bank().filter(q=>category==='mijesani'||q.category===category);
      return this.shuffle(list).slice(0,Math.max(0,count)).map(q=>this.prepare(q));
    },

    periodSeed:function(period){
      const d=new Date();
      if(period==='daily'){
        return d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();
      }
      if(period==='weekly'){
        const onejan=new Date(Date.UTC(d.getUTCFullYear(),0,1));
        const day=Math.floor((d-onejan)/86400000);
        return d.getUTCFullYear()*1000+Math.floor((day+onejan.getUTCDay()+6)/7);
      }
      return d.getUTCFullYear()*100+d.getUTCMonth()+1;
    },

    seededShuffle:function(items,seed){
      const a=items.slice();
      let s=seed>>>0;
      for(let i=a.length-1;i>0;i--){
        s=(s*1664525+1013904223)>>>0;
        const j=s%(i+1);
        [a[i],a[j]]=[a[j],a[i]];
      }
      return a;
    },

    periodQuiz:function(period='daily',count=10){
      return this.seededShuffle(this.bank(),this.periodSeed(period))
        .slice(0,Math.max(0,count))
        .map(q=>this.prepare(q));
    },

    validate:function(){
      const bank=this.bank();
      const ids=new Set();
      const by={};
      const errors=[];
      let invalid=0;

      bank.forEach((q,index)=>{
        const id=q&&q.id!=null?String(q.id):'';
        const answers=q&&Array.isArray(q.answers)?q.answers:[];
        const correct=Number(q&&q.correctIndex);
        const bad=!id||answers.length!==4||answers.some(a=>typeof a!=='string'||!a.trim())||!Number.isInteger(correct)||correct<0||correct>3;
        if(bad){
          invalid++;
          if(errors.length<10) errors.push({index,id,reason:'Pitanje mora imati ID, točno 4 neprazna odgovora i ispravan correctIndex.'});
        }
        ids.add(id);
        const category=q&&q.category?q.category:'nepoznato';
        by[category]=(by[category]||0)+1;
      });

      return {total:bank.length,invalid,duplicates:bank.length-ids.size,byCategory:by,errors};
    }
  };
})();

// Lokalni profil igrača.
(function(){
  const KEY='patriasoul_player';
  const NAMES='patriasoul_nicknames';
  const DEFAULT={name:'',xp:0,points:0,quizzes:0,correct:0,streak:0,badges:[],cities:{}};

  function read(key,fallback){
    try{
      const value=JSON.parse(localStorage.getItem(key));
      return value??fallback;
    }catch(e){return fallback;}
  }

  function save(key,value){
    try{
      localStorage.setItem(key,JSON.stringify(value));
      return true;
    }catch(e){return false;}
  }

  function clean(value){
    return String(value||'').trim().replace(/\s+/g,' ');
  }

  function valid(value){
    return /^[A-Za-z0-9ČĆŽŠĐčćžšđ _-]{3,20}$/.test(value);
  }

  function current(){
    const player=read(KEY,DEFAULT);
    return {...DEFAULT,...player};
  }

  function choose(name){
    name=clean(name);
    if(!valid(name)) return {ok:false,error:'Nadimak mora imati 3–20 znakova.'};

    const names=read(NAMES,[]);
    const player=current();
    const taken=names.some(n=>String(n).toLocaleLowerCase('hr-HR')===name.toLocaleLowerCase('hr-HR'));
    const samePlayer=String(player.name||'').toLocaleLowerCase('hr-HR')===name.toLocaleLowerCase('hr-HR');

    if(taken&&!samePlayer){
      return {ok:false,error:'Ovaj nadimak je već zauzet na ovom uređaju.'};
    }

    if(!taken) names.push(name);
    player.name=name;
    save(NAMES,names);
    save(KEY,player);
    save('patriasoul_profile',player);
    return {ok:true,player};
  }

  window.PatriaPlayer={current,choose};
})();