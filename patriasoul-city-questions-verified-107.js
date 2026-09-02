// PatriaSoul — verified city questions layer 107 — Ludbreg
(function(global){'use strict';
const city='ludbreg',S='https://ludbreg.hr/o-ludbregu/';
const F=[
['Ludbreg se razvio na raskrižju važnih putova i prijelazu preko rijeke',[ 'Bednje','Drave','Save','Kupe']],
['Rimska monumentalna građevina u Ludbregu zvala se',[ 'IOVIA','Curicum','Apsoros','Andautonia']],
['IOVIA je podignuta između',[ '6. i 9. godine','100. i 110. godine','300. i 305. godine','500. i 510. godine']],
['Temelji današnjeg starog grada Ludbrega sežu u',[ '11. stoljeće','13. stoljeće','15. stoljeće','18. stoljeće']],
['Prvi pisani spomen ludbreškog područja u 13. stoljeću povezuje se s prijelazom preko',[ 'Bednje','Drave','Mure','Save']],
['Povelju kojom se 1244. potvrđuju granice posjeda izdao je kralj',[ 'Bela IV.','Koloman','Ludovik I.','Matija Korvin']],
['Današnja župna crkva u Ludbregu dovršena je',[ '1410.','1244.','1556.','1699.']],
['Ludbreg je postao trgovište i proštenište za vrijeme',[ 'Bernardina Thuroczyja','Nikole Šubića Zrinskog','Matije Vlačića','Josipa Jelačića']],
['Sajam u Ludbregu održavao se redovito',[ 'srijedom','nedjeljom','petkom','subotom']],
['Od 1635. godine Ludbreg je bio u vlasništvu obitelji',[ 'Erdödy','Frankopan','Zrinski','Batthyany']],
['Ludbregom je od 1695. do 1918. upravljao rod',[ 'Bačani','Erdödy','Janković','Talovac']],
['Ludbreg je imao poštansku postaju već',[ '1556.','1699.','1777.','1817.']],
['Poštanska linija preko Ludbrega povezivala je pravac',[ 'Graz–Varaždin–Ludbreg–Koprivnica','Split–Knin–Zadar','Rijeka–Pula–Trst','Osijek–Vinkovci–Vukovar']],
['Kapelica Sv. Roka u Karlovcu Ludbreškom podignuta je',[ '1768.','1695.','1799.','1817.']],
['Godine 1799. ludbreška crkva dobila je',[ 'cinktor','zvonik od čelika','kupolu','samostanski klaustar']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified107_ludbreg_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));global.PatriaCityVerified107={forCity:c=>String(c).toLowerCase()===city?D:[]};})(typeof window!=='undefined'?window:globalThis);