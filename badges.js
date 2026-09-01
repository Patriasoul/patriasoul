// PatriaSoul — centralni registar znački. Pravila ovise isključivo o centralnom profilu.
(function(global){'use strict';
 const BADGES=[
  {id:'prvi-korak',icon:'🎯',name:'Prvi korak',description:'Završen prvi kviz.',test:p=>p.quizzes>=1},
  {id:'deset-tocnih',icon:'📚',name:'Deset točnih',description:'Najmanje 10 točnih odgovora.',test:p=>p.correct>=10},
  {id:'stotka',icon:'💯',name:'Stotka',description:'Najmanje 100 točnih odgovora.',test:p=>p.correct>=100},
  {id:'znalac',icon:'🏅',name:'Znalac',description:'Osvojeno najmanje 1.000 bodova.',test:p=>p.points>=1000},
  {id:'majstor',icon:'🏆',name:'Majstor znanja',description:'Osvojeno najmanje 5.000 bodova.',test:p=>p.points>=5000},
  {id:'tisucljetni',icon:'🛡️',name:'Čuvar baštine',description:'Najmanje 10.000 XP.',test:p=>p.xp>=10000},
  {id:'streak-7',icon:'🔥',name:'Tjedan znanja',description:'Streak od 7 dana.',test:p=>p.streak>=7},
  {id:'streak-30',icon:'⚔️',name:'Mjesec predanosti',description:'Streak od 30 dana.',test:p=>p.streak>=30},
  {id:'graditelj',icon:'🏙️',name:'Graditelj',description:'Odigran izazov za najmanje 3 grada.',test:p=>Object.keys(p.cities||{}).length>=3},
  {id:'istrazivac',icon:'🗺️',name:'Istraživač Hrvatske',description:'Odigrani kvizovi u najmanje 5 kategorija.',test:p=>Object.keys(p.categories||{}).length>=5}
 ];
 function evaluate(p){p=global.PatriaPlayer?global.PatriaPlayer.save(p):p;p.badges=Array.isArray(p.badges)?p.badges:[];BADGES.forEach(b=>{if(b.test(p)&&!p.badges.includes(b.id))p.badges.push(b.id)});return global.PatriaPlayer?global.PatriaPlayer.save(p):p}
 global.PATRIA_BADGES=BADGES;global.PatriaBadges={evaluate,all:()=>BADGES.slice(),earned:()=>{const p=global.PatriaPlayer.current();return BADGES.filter(b=>p.badges.includes(b.id))}};
})(typeof window!=='undefined'?window:globalThis);
