// PatriaSoul — verified city questions layer 117 — Rovinj
(function(global){'use strict';
const city='rovinj',S='https://www.rovinj-rovigno.hr/o-rovinju/kulturne-znamenitosti/stari-grad/';
const F=[
['Starogradska jezgra Rovinja zaštićena je kao povijesna cjelina od',['1963. godine','1945. godine','1979. godine','1991. godine']],
['Rovinj je u staroj jezgri imao ukupno',['sedam gradskih vrata','tri gradska vrata','deset gradskih vrata','pet gradskih vrata']],
['Među vratima koja su sačuvala prvotni oblik u Rovinju su',['Vrata Sv. Benedikta, Vrata pod zidom i Vrata Sv. Križa','Balbijev luk, Portarata i Zlatna vrata','Vrata sv. Marka, Pila i Ploče','Ribarska vrata, Morska vrata i Nova vrata']],
['Balbijev luk u Rovinju građen je kao venecijanska građevina',['1678.–1679.','1308.–1310.','1584.–1586.','1779.–1780.']],
['Temelji rovinjske gradske vijećnice potječu iz',['1308. godine','1590. godine','1673. godine','1859. godine']],
['Na prvom katu rovinjske gradske vijećnice nalaze se freske iz',['1584. godine','1308. godine','1678. godine','1779. godine']],
['Zaštitnica grada Rovinja je',['sveta Eufemija','sveta Marija','sveta Lucija','sveta Barbara']],
['Crkvica Sv. Josipa u Rovinju podignuta je',['1673. godine','1592. godine','1779. godine','1859. godine']],
['Crkvica Sv. Križa u Rovinju sagrađena je',['1592. godine','1308. godine','1723. godine','1931. godine']],
['Crkva Sv. Benedikta u Rovinju potječe iz',['XIV. stoljeća','XII. stoljeća','XVI. stoljeća','XVIII. stoljeća']],
['Veliki lukobran južne rovinjske luke izgrađen je',['1859. godine','1678. godine','1931. godine','1963. godine']],
['Veliki lukobran južne luke dobio je današnju veličinu',['1931. godine','1859. godine','1918. godine','1945. godine']],
['Crkvica Sv. Tome Apostola spominje se već u',['XIV. stoljeću','XI. stoljeću','XVII. stoljeću','XIX. stoljeću']],
['Crkvica Sv. Tome Apostola proširena je odnosno nadsvođena',['1723. godine','1592. godine','1673. godine','1822. godine']],
['Crkvica Gospe od zdravlja u Rovinju podignuta je',['1779. godine','1673. godine','1584. godine','1859. godine']],
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified117_rovinj_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified117={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
