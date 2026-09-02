// PatriaSoul — verified city questions layer 110 — Metković
(function(global){'use strict';
const city='metkovic',S='https://www.metkovic.hr/uprava/dokumenti/proracun2014/8.%20Strate%C5%A1ki%20plan%20grada%20Metkovi%C4%87a%202014.%20do%202016..pdf';
const F=[
['Život na području Metkovića prema arheološkim nalazima počeo je',[ 'u pretpovijesti','u srednjem vijeku','u 18. stoljeću','u 20. stoljeću']],
['Među prvim poznatim stanovnicima područja Neretve navode se',[ 'Daorsi','Rimljani','Frankopani','Venecijanci']],
['Grci su u 4. stoljeću pr. Kr. osnovali luku',[ 'Naronu','Drijeva','Mokron','Muccurum']],
['Narona se nalazi na području današnjeg mjesta',[ 'Vida','Opuzena','Metkovića','Gabele']],
['Narona je za cara Augusta vjerojatno postala',[ 'kolonija','biskupija','kneževina','slobodna kraljevska luka']],
['U ranom srednjem vijeku područje Neretve povezivalo se s',[ 'Paganijom','Istrom','Karantanijom','Posavinom']],
['Paganija se u 10. stoljeću spominje kod',[ 'Konstantina Porfirogeneta','Strabona','Plinija Mlađeg','Tome Arhiđakona']],
['Drijeva su bila veliko',[ 'trgovište','samostan','rudnik','utvrda na Biokovu']],
['Na Drijevama se trgovalo, među ostalim,',[ 'voskom, solju i začinima','ugljenom i željezom','svilom i čajem','kavom i kakaom']],
['Ime Metković prvi se put spominje',[ '1422.','1244.','1494.','1718.']],
['Prvi poznati spomen imena Metković čuva se u',[ 'dubrovačkom arhivu','zadarskom arhivu','mletačkom arhivu','bečkom arhivu']],
['Za turske vlasti od 1494. do 1685. glavnu ulogu u dolini Neretve imala je',[ 'Gabela, Opuzen i Kula Norinska','Dubrovnik, Ston i Cavtat','Makarska, Split i Trogir','Knin, Sinj i Imotski']],
['Metković je na karti mletačkog kartografa Jacopa Gastaldija zabilježen',[ '1570.','1422.','1494.','1718.']],
['Požarevačkim mirom 1718. utvrđena je granica između',[ 'Osmanskog Carstva i Mletačke Republike','Austrije i Francuske','Venecije i Dubrovnika','Ugarske i Hrvatske']],
['Mlečani su u Metkoviću razvijali neretvansku luku na predjelu',[ 'Unka','Vida','Predolca','Narone']]
];const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified110_metkovic_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));global.PatriaCityVerified110={forCity:c=>String(c).toLowerCase()===city?D:[]};})(typeof window!=='undefined'?window:globalThis);