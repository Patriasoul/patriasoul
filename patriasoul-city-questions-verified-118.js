// PatriaSoul — verified city questions layer 118 — Umag
(function(global){'use strict';
const city='umag',S='https://umag.hr/o-umagu/povijest';
const F=[
['Umag se nalazi na',['zapadnoj obali Istre','istočnoj obali Istre','južnoj obali Kvarnera','otoku Cresu']],
['Umag je udaljen približno 10 km od',['slovenske granice','talijanske granice kod Trsta','Rijeke','Pule']],
['Obala područja Umaga duga je približno',['45 km','15 km','75 km','5 km']],
['Prema službenom gradskom prikazu, Umag su u rimsko doba otkrili',['rimski plemići','mletački trgovci','franački vladari','dubrovački kneževi']],
['Rimski plemići povezivali su Umag s namjenom',['ljetne rezidencije','vojne prijestolnice','rudarskog naselja','biskupskog sjedišta']],
['U staroj jezgri Umaga sačuvani su dijelovi',['zidina i kula','rimskih akvadukata i cirkusa','velikih srednjovjekovnih palača','gradskih jaraka i mostova']],
['U umaškoj staroj jezgri nalaze se i',['renesansne i barokne zgrade i crkve','gotovo isključivo moderne zgrade','samo rimske ruševine','isključivo drvene kuće']],
['Na antičkim temeljima nastao je',['Humagum/Umag','Ragusa/Polis','Pola/Ruginium','Curzola/Corcyra']],
['Dolaskom Langobarda i kasnije franačke države uspostavlja se',['feudalizam','socijalizam','komunalizam','merkantilizam']],
['Umag i Sipar bili su',['veća povijesno zabilježena naselja','rimske legije','samostani','mletačke pokrajine']],
['Umag je u XIII. stoljeću ušao u sastav',['Venecije','Austrije','Francuske','Dubrovačke Republike']],
['Umag je ostao u sastavu Venecije do',['1797. godine','1718. godine','1815. godine','1945. godine']],
['Nakon mletačke vladavine Umag je ušao u sastav',['Napoleonovih Ilirskih provincija','Kraljevine Jugoslavije','Dubrovačke Republike','Austro-Ugarske odmah 1797.']],
['Umag je slobodu ugledao 6. svibnja',['1945. godine','1941. godine','1954. godine','1991. godine']],
['Umag je status grada dobio',['1997. godine','1954. godine','1945. godine','2001. godine']],
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified118_umag_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified118={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
