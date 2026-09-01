// PatriaSoul – sustav razina prema ukupnom XP-u
window.PATRIA_LEVELS=[
{id:1,name:'Početnik',minXP:0},
{id:2,name:'Učenik baštine',minXP:500},
{id:3,name:'Poznavatelj',minXP:1500},
{id:4,name:'Čuvar znanja',minXP:3000},
{id:5,name:'Majstor PatriaSoula',minXP:6000},
{id:6,name:'Živa baština',minXP:10000}
];
window.PatriaLevels={get:function(xp=0){let r=window.PATRIA_LEVELS[0];window.PATRIA_LEVELS.forEach(l=>{if(xp>=l.minXP)r=l});return r},next:function(xp=0){return window.PATRIA_LEVELS.find(l=>l.minXP>xp)||null}};