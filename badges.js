// PatriaSoul – značke i pravila otključavanja
window.PATRIA_BADGES=[
{id:'prvi-korak',icon:'🎯',name:'Prvi korak',description:'Završen prvi kviz.',test:p=>p.quizzes>=1},
{id:'znalac',icon:'📚',name:'Znalac',description:'Osvojeno najmanje 1.000 bodova.',test:p=>p.points>=1000},
{id:'majstor',icon:'🏆',name:'Majstor znanja',description:'Osvojeno najmanje 5.000 bodova.',test:p=>p.points>=5000},
{id:'savrsen',icon:'💎',name:'Savršena serija',description:'Najmanje 10 točnih odgovora ukupno.',test:p=>p.correct>=10},
{id:'branitelj',icon:'🛡️',name:'Branitelj gradova',description:'Odigran prvi gradski izazov.',test:p=>Object.keys(p.cities||{}).length>=1}
];
window.PatriaBadges={evaluate:function(p){p.badges=Array.isArray(p.badges)?p.badges:[];window.PATRIA_BADGES.forEach(b=>{if(b.test(p)&&!p.badges.includes(b.id))p.badges.push(b.id)});return p},all:function(){return window.PATRIA_BADGES}};