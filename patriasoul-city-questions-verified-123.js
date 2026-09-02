(function(global){'use strict';
const city='ploce',S='https://ploce.hr/wp-content/uploads/2019/02/2019-2-21-strategija-razvoja.pdf';
const F=[
['prvi poznati pisani spomen luke Ploče',[ '1387. godine','1287. godine','1487. godine','1587. godine']],
['mjesto gdje se čuva dokument koji spominje luku Ploče 1387.',[ 'Povijesni arhiv u Dubrovniku','Hrvatski državni arhiv u Zagrebu','Muzej Međimurja','Arhiv u Zadru']],
['položaj luke Ploče u povijesnom zapisu iz 1387.',[ 'pri ušću Neretve','uz ušće Cetine','na otoku Korčuli','u zaljevu Kvarnera']],
['razdoblje kada se o izgradnji luke Ploče govori u planovima Austro-Ugarske Monarhije',[ 'druga polovica 19. stoljeća','prva polovica 17. stoljeća','početak 20. stoljeća','kraj 18. stoljeća']],
['godina početka prvih ozbiljnih razmatranja gradnje luke Ploče',[ '1922.','1902.','1932.','1942.']],
['godina izrade Tehničkog izvještaja i Studije o luci Ploče',[ '1937.','1927.','1947.','1957.']],
['zaključak Studije iz 1937. o prirodnoj luci Ploče',[ 'ispunila je postavljene uvjete za početak priprema izgradnje','nije pogodna za gradnju','treba je premjestiti u Dubrovnik','namijenjena je isključivo ribarstvu']],
['geografska rijeka uz koju se nalazi luka Ploče',[ 'Neretva','Cetina','Krka','Zrmanja']],
['gospodarska funkcija zbog koje je razvoj Ploča posebno vezan uz luku',[ 'pomorski promet i teretni promet','isključivo stočarstvo','vinogradarstvo','šumarstvo']],
['strateško značenje Ploča povezano s dolinom koje rijeke',[ 'Neretve','Drave','Save','Kupe']],
['izvor koji strategija koristi za podatke o oborinama na području Ploča',[ 'Državni zavod za statistiku','Hrvatska turistička zajednica','Hrvatski nogometni savez','Muzej grada Ploča']],
['godina za koju strategija prikazuje grafikon oborina hidrometeorološke postaje Ploče',[ '2016.','2006.','2010.','2020.']],
['službeni naziv grada čije su mrežne stranice izvor za gradske institucije i obavijesti',[ 'Grad Ploče','Grad Metković','Grad Opuzen','Grad Dubrovnik']],
['adresa Grada Ploča prema službenim stranicama',[ 'Trg kralja Tomislava 23','Trg kralja Tomislava 1','Ulica kralja Tomislava 15','Stjepana Radića 1']],
['županija kojoj Ploče pripadaju',[ 'Dubrovačko-neretvanska županija','Splitsko-dalmatinska županija','Šibensko-kninska županija','Istarska županija']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified123_ploce_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified123={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
