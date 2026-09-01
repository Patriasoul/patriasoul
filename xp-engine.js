// PatriaSoul XP Engine
// Jedinstveni klijentski sloj za napredak igrača.
// Ne ovisi o vanjskom API-ju i radi i prije spajanja pravog backend profila.
(function(){
  'use strict';

  const KEY='patriasoul_player_progress_v1';
  const LEVELS=[
    {id:'pocetnik',name:'Početnik',min:0,max:499},
    {id:'istrazivac',name:'Istraživač',min:500,max:1499},
    {id:'znalac',name:'Znalac',min:1500,max:2999},
    {id:'cuvar',name:'Čuvar baštine',min:3000,max:4999},
    {id:'majstor',name:'Majstor znanja',min:5000,max:9999},
    {id:'ziva-bastina',name:'Živa baština',min:10000,max:Infinity}
  ];

  function read(){
    try{return Object.assign({xp:0,quizzes:0,correct:0,answers:0,streak:0,lastQuiz:null,badges:[]},JSON.parse(localStorage.getItem(KEY)||'{}'));}
    catch(e){return {xp:0,quizzes:0,correct:0,answers:0,streak:0,lastQuiz:null,badges:[]};}
  }
  function save(p){localStorage.setItem(KEY,JSON.stringify(p));return p;}
  function levelFor(xp){return LEVELS.reduce((a,l)=>xp>=l.min?l:a,LEVELS[0]);}
  function nextLevel(xp){return LEVELS.find(l=>l.min>xp)||null;}

  function addQuizResult(result){
    result=result||{};
    const p=read();
    const correct=Math.max(0,Number(result.correct)||0);
    const answers=Math.max(correct,Number(result.answers)||0);
    const baseXp=Math.max(0,Number(result.xp)||0);
    const bonus=Math.max(0,Number(result.bonusXp)||0);
    const before=levelFor(p.xp);
    p.xp+=baseXp+bonus;
    p.quizzes+=1;
    p.correct+=correct;
    p.answers+=answers;
    p.streak=(p.lastQuiz && sameDay(p.lastQuiz,new Date()))?p.streak:p.streak+1;
    p.lastQuiz=new Date().toISOString();
    const after=levelFor(p.xp);
    save(p);
    return {progress:p,level:after,previousLevel:before,leveledUp:after.id!==before.id};
  }

  function sameDay(a,b){
    const d=new Date(a);return d.toLocaleDateString('hr-HR')===b.toLocaleDateString('hr-HR');
  }

  function get(){return read();}
  function getLevel(){const p=read();return levelFor(p.xp);}
  function getNext(){const p=read(),n=nextLevel(p.xp);if(!n)return {level:null,needed:0,progress:100};const prev=levelFor(p.xp);const span=n.min-prev.min;return {level:n,needed:n.min-p.xp,progress:Math.max(0,Math.min(100,((p.xp-prev.min)/span)*100))};}
  function reset(){localStorage.removeItem(KEY);return read();}

  window.PatriaSoulXP={KEY,LEVELS,read:get,save,levelFor,nextLevel,getLevel,getNext,addQuizResult,reset};
})();
