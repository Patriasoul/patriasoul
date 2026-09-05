/* PatriaSoul — whole portal search */
(function(){'use strict';
const items=[
 ['Početna','/index.html','PatriaSoul Hrvatska povijest znanje identitet'],
 ['Domovina','/domovina.html','Hrvatska gradovi krajevi priroda dijaspora vijesti vrijeme'],
 ['Branitelji','/branitelji.html','branitelji Domovinski rat Vukovar postrojbe svjedočanstva spomenici'],
 ['Povijest','/povijest.html','hrvatska povijest antika kraljevi srednji vijek Habsburzi preporod 20 stoljeće'],
 ['Baština','/bastina.html','baština glagoljica tradicija nošnje gastronomija glazba dijalekti'],
 ['Vjera','/vjera.html','vjera evanđelje Biblija molitve krunica blagdani svetac'],
 ['Gradovi','/gradovi.html','127 gradova Hrvatska Zagreb Split Rijeka Osijek Zadar'],
 ['Kviz','/quiz.html','kviz znanje dnevni tjedni mjesečni XP bodovi'],
 ['Brani svoj grad','/brani-svoj-grad.html','igra gradovi obrana izazov rang lista'],
 ['Rang-lista','/rang-lista.html','leaderboard XP bodovi rezultati'],
 ['Video','/video.html','video mediji'],['Galerija','/galerija.html','fotografije slike galerija'],['Vijesti','/vijesti.html','vijesti aktualno']
];
function init(){const forms=document.querySelectorAll('[data-ps-search]');forms.forEach(form=>{const input=form.querySelector('input');if(!input)return;let box=form.querySelector('.ps-search-results');if(!box){box=document.createElement('div');box.className='ps-search-results';form.appendChild(box);}input.addEventListener('input',()=>{const q=input.value.trim().toLocaleLowerCase('hr');box.innerHTML='';if(q.length<2)return;items.filter(x=>(x[0]+' '+x[2]).toLocaleLowerCase('hr').includes(q)).slice(0,8).forEach(x=>{const a=document.createElement('a');a.href=x[1];a.innerHTML='<strong>'+x[0]+'</strong><small>'+x[2]+'</small>';box.appendChild(a);});});});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
