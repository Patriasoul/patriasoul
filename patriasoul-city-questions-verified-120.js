// PatriaSoul — verified city questions layer 120 — Korčula
(function(global){'use strict';
const city='korcula',S='https://www.korcula.hr/o-korculi/povijesni-pregled/';
const F=[
['Ime otoka Korčule potječe od',['Korkyre','Curzole','Raguse','Issa']],
['Prvi slavenski nazivi Korčule Kurkra i Krkar javljaju se u zapisima',['Konstantina Porfirogeneta','Strabona','Tome Arhiđakona','Plinija Starijeg']],
['Korčula dobiva prvu grčku koloniju u',['6. stoljeću pr. Kr.','4. stoljeću po Kr.','1. stoljeću pr. Kr.','10. stoljeću']],
['Prvu koloniju na Korčuli osnovali su Dorani iz grčkog grada',['Knidosa','Atene','Sparta','Mileta']],
['Najstarije naseljavanje otoka Korčule datira iz',['neolita','željeznog doba','rimskog doba','srednjeg vijeka']],
['Brojne gradine i gomile na Korčuli posebno su povezane s',['ilirskim naseljavanjem','mletačkom upravom','francuskom okupacijom','austrijskom vlašću']],
['Grčki kolonisti s Visa u 4. stoljeću pr. Kr. osnovali su naseobinu u',['Lumbardi','Žrnovu','Blatu','Smokvici']],
['Dolazak Slavena na Korčulu spominje se u',['10. stoljeću','6. stoljeću','13. stoljeću','18. stoljeću']],
['Godine 1000. Korčulu je zauzeo venecijanski dužd',['Petar II. Orseolo','Enrico Dandolo','Doge Pietro Ziani','Andrea Dandolo']],
['Godine 1214. Korčula ima svoj',['Statut','Katekizam','Pomorski ugovor s Venecijom','Gradski kodeks iz 1797.']],
['Korčulanski Statut uređivao je, među ostalim',['brodogradnju, poljoprivredu i trgovinu','isključivo vojnu službu','samo crkvena pitanja','samo ribolov']],
['Od 1420. do 1797. Korčula je bila u sastavu',['Mletačke Republike','Dubrovačke Republike','Osmanskog Carstva','Francuskog Carstva']],
['Za mletačke vlasti Korčula je imala određenu',['autonomiju u unutarnjim pitanjima','potpunu neovisnost od Venecije','vojnu neutralnost prema svim državama','kolonijalnu upravu iz Beča']],
['U Korčuli je Veliko vijeće svakog mjeseca biralo',['kneza','biskupa','kapetana Venecije','guvernera Dalmacije']],
['Korčulu su 13. rujna 1944. oslobodile',['partizanske jedinice','austrijske postrojbe','mletačka vojska','francuske postrojbe']],
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified120_korcula_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified120={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
