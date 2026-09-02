// PatriaSoul — verified city questions layer 102 — Krk
(function(global){'use strict';
const city='krk',S='https://www.visitkrk.city/';
const F=[
['Krk kao kulturno, povijesno i administrativno središte',['otoka Krka','Istre','Cresa','Raba']],
['povijest grada Krka seže do',['bakrenog doba','željeznog doba','srednjeg vijeka','19. stoljeća']],
['bakreno doba na području grada Krka',['3500–2000. pr. Kr.','1000–500. pr. Kr.','500–1. pr. Kr.','1.–500.']],
['grad Krk izrastao je na',['antičkim temeljima','rimskim rudnicima','srednjovjekovnim kanalima','mletačkim dokovima']],
['Krk je procvao pod dominacijom',['Venecije i krčkih knezova Frankopana','Napoleona i Austrije','Rima i Bizanta','Ugarske i Osmanlija']],
['gradske zidine Krka podignute su još u',['predrimsko doba','19. stoljeće','16. stoljeće','20. stoljeće']],
['u stari grad Krk ulazi se kroz',['četvora vrata','dvoja vrata','troja vrata','sedmera vrata']],
['Velika gradska vrata nalaze se u',['gradu Krku','Malinskoj','Baški','Omišlju']],
['Frankopani su bili',['krčki knezovi','mletački duždevi','rimski carevi','francuski maršali']],
['Krk je danas administrativno i gospodarsko središte',['otoka Krka','Kvarnera','Istre','Primorja i Gorskog kotara']],
['među tradicionalnim jelima Krka navode se',['šurlice','soparnik','zagorski štrukli','fuži s tartufima']],
['među okusima Krka spominju se',['imbrijagoni','pašticada','orehnjača','kremšnita']],
['među morskim specijalitetima navode se',['kvarnerski škampi','slavonski kulen','lička basa','zagorska purica']],
['Turistička zajednica grada Krka navodi',['23 plaže','5 plaža','50 plaža','100 plaža']],
['grad Krk danas povezuje baštinu s',['morem i aktivnim odmorom','isključivo industrijom','rudarenjem','poljoprivredom bez turizma']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified102_krk_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified102={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
