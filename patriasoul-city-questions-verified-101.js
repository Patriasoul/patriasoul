// PatriaSoul — verified city questions layer 101 — Križevci
(function(global){'use strict';
const city='krizevci',S='https://krizevci.hr/wp-content/uploads/2020/04/Broj-01_20.pdf';
const F=[
['prvo spominjanje Križevaca 1209. godine',['1209.','1102.','1252.','1397.']],
['Križevci kao županijsko središte u 12. stoljeću',['Križevci','Dubrovnik','Senj','Knin']],
['status privilegiranog banskog grada 1252. godine',['banski grad','slobodni kraljevski grad','vojni grad','kneževski grad']],
['status privilegiranog kraljevskog grada nakon 1252.',['kraljevski grad','biskupski grad','pomorski grad','rudarski grad']],
['župna crkva svetog Križa potvrđena 1232.',['1232.','1209.','1252.','1397.']],
['Krvavi sabor križevački 1397. godine',['Križevci','Zagreb','Varaždin','Požega']],
['dva povijesna dijela grada',['Donji i Gornji grad','Stari i Novi grad','Veliki i Mali grad','Gornji i Srednji grad']],
['današnji naziv Križevci u množini povezan je sa',['spajanjem Donjeg i Gornjeg grada','dvjema rijekama','dvjema tvrđavama','dvjema županijama']],
['jedan od najpoznatijih svetaca povezanih s Križevcima',['sveti Marko Križevčanin','sveti Nikola Tavelić','sveti Leopold Mandić','sveti Josip']],
['Gradski muzej Križevci čuva i',['arheološku i kulturno-povijesnu baštinu','samo pomorsku zbirku','samo rudarsku zbirku','isključivo prirodoslovnu zbirku']],
['u Gradskom muzeju nalazi se cehovska zbirka',['da','ne','samo u arhivu','samo u knjižnici']],
['obitelj Kiepach poznata je kao dio povijesti',['Križevaca','Dubrovnika','Splita','Pule']],
['Marcel Kiepach među znamenitim je građanima',['Križevaca','Knina','Krka','Kutine']],
['Franjo Marković povezan je s kulturnom poviješću',['Križevaca','Labina','Kastva','Klanjca']],
['povijesni naziv grada vezan je uz',['crkvu svetog Križa','tvrđavu Svetog Marka','rijeku Križevicu','samostan svetog Nikole']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified101_krizevci_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified101={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
