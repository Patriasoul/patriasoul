(function(global){'use strict';
const city='metkovic',S='https://www.metkovic.hr/uprava/dokumenti/proracun2014/8.%20Strate%C5%A1ki%20plan%20grada%20Metkovi%C4%87a%202014.%20do%202016..pdf';
const F=[
['prvi pisani spomen Metkovića',[ '1422. godine','1222. godine','1522. godine','1622. godine']],
['brdo uz koje se razvijao stari Metković',[ 'Predolac','Marjan','Medvednica','Srđ']],
['antički grad u današnjem Vidu',[ 'Narona','Salona','Andautonija','Mursa']],
['narod koji se među prvim poznatim stanovnicima navodi na području Metkovića',[ 'helenizirani Iliri Daorsi','Rimljani','Goti','Langobardi']],
['antička luka koja je naslijedila važnost Narone',[ 'Drijeva','Salona','Trogir','Senj']],
['vrsta robe kojom se trgovalo u Drijevima',[ 'vosak, sol i začini','željezo, ugljen i nafta','svila, čaj i kava','vino, masline i mramor']],
['osoba koja je 1570. zabilježila Metković na karti',[ 'Jacopo Gastaldi','Leonardo da Vinci','Marko Polo','Pavao Ritter Vitezović']],
['razdoblje turske vlasti tijekom kojega se Metković prema gradskom izvoru ne spominje',[ '1494.–1685.','1422.–1494.','1685.–1718.','1797.–1815.']],
['Požarevački mir kojim je 1718. utvrđena granica',[ 'između Osmanskog Carstva i Mletačke Republike','između Austrije i Francuske','između Venecije i Napoleona','između Hrvatske i Ugarske']],
['neretvanska luka koju su Mlečani osnovali u Metkoviću',[ 'u predjelu Unka','u Vidu','na Predolcu','u Kuli Norinskoj']],
['rijeka uz koju se Metković razvija',[ 'Neretva','Cetina','Krka','Kupa']],
['prometno značenje Metkovića prema Turističkoj zajednici',[ 'važno prometno čvorište','isključivo planinsko odredište','samo zračna luka','samo pomorska luka bez kopnenih veza']],
['godina otvaranja Ornitološke zbirke za javnost',[ '1952.','1922.','1972.','1982.']],
['osoba povezana s osnivanjem metkovske Ornitološke zbirke',[ 'dr. Dragutin Rucner','Miroslav Krleža','Ivan Meštrović','Tin Ujević']],
['broj preparata koji je prema Turističkoj zajednici sadržavala Ornitološka zbirka',[ 'više od 340','više od 34','više od 3.400','točno 100']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified121_metkovic_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified121={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
