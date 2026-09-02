// PatriaSoul — verified city questions layer 105 — Lepoglava
(function(global){'use strict';
const city='lepoglava',S='https://www.lepoglava.hr/povijest-lepoglave/';
const F=[
['prvo spominjanje Lepoglave',['1399.','1249.','1400.','1503.']],
['samostan u Lepoglavi osnovao je Herman Celjski',['1400.','1399.','1503.','1582.']],
['redovnici koji su došli u Lepoglavu',['pavlini','franjevci','isusovci','benediktinci']],
['pavlini su u Lepoglavi obitavali do',['1786.','1773.','1854.','1674.']],
['seminar pavlinskog reda osnovan je',['1503.','1399.','1582.','1656.']],
['seminar je 1582. prerastao u',['prvu javnu gimnaziju u Hrvatskoj','prvo sveučilište u Zagrebu','prvu vojnu školu','prvu tiskaru']],
['studij filozofije u Lepoglavi započeo je',['1656.','1503.','1582.','1674.']],
['pavlini su dobili dozvolu za dodjelu doktorata',['1674.','1656.','1582.','1786.']],
['ukidanje pavlinskog reda naredio je Josip II.',['1786.','1773.','1854.','1809.']],
['samostan je 1854. pretvoren u',['kaznionicu','bolnicu','vojarnu','muzej']],
['među poznatim zatvorenicima Lepoglave bio je',['Alojzije Stepinac','Nikola Tesla','Antun Gustav Matoš','Ivan Meštrović']],
['među poznatim zatvorenicima bio je i',['Franjo Tuđman','Stjepan Radić','Vladko Maček','Antun Augustinčić']],
['pavlinski kompleks odijeljen je od kaznioničkog',['2001.','1991.','1854.','1786.']],
['pavlinski kompleks predan je na korištenje',['Varaždinskoj biskupiji','Zagrebačkoj županiji','Hrvatskoj akademiji znanosti','Hrvatskoj vojsci']],
['Lepoglava je poznata kao kolijevka',['znanosti, umjetnosti i kulture','brodogradnje i pomorstva','rudarstva i metalurgije','poljoprivrede i vinogradarstva']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified105_lepoglava_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified105={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
