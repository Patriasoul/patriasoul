// PatriaSoul — XP facade. Jedinstveni profil je u patriasoul-profile.js.
(function(global){'use strict';
  function profile(){return global.PatriaPlayer?global.PatriaPlayer.current():{xp:0,points:0,quizzes:0,correct:0,answers:0,streak:0,badges:[]}}
  function levels(){return global.PatriaLevels||null}
  function levelFor(xp){const l=levels();return l?l.get(xp):{id:1,name:'Početnik',minXP:0,tier:'Početnik'}}
  function nextLevel(xp){const l=levels();return l?l.next(xp):null}
  function addQuizResult(result){const r=result||{};const before=levelFor(profile().xp);const p=global.PatriaPlayer.recordResult(r);const after=levelFor(p.xp);return {progress:p,level:after,previousLevel:before,leveledUp:after.id!==before.id}}
  function reset(){try{localStorage.removeItem(global.PatriaPlayer.KEY);return profile()}catch(_){return profile()}}
  global.PatriaSoulXP={KEY:global.PatriaPlayer?.KEY||'patriasoul_player_v2',read:profile,get:profile,save:global.PatriaPlayer?.save,levelFor,nextLevel,getLevel:()=>levelFor(profile().xp),getNext:()=>nextLevel(profile().xp),addQuizResult,reset};
})(typeof window!=='undefined'?window:globalThis);
