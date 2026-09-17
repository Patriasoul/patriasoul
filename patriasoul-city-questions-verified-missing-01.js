// PatriaSoul — verified missing-city layer 01
// 5 cities × 15 verified facts × 5 question forms = 375 questions.
(function(global){'use strict';
const DATA={
 cres:{url:'https://www.cres.hr/o-cresu/',facts:[
 ['najpoznatiji renesansni filozof rođen u Cresu','Frane Petrić',['Marko Marulić','Juraj Dalmatinac','Marin Držić']],
 ['godina kada Cres dobiva statut','1332.',['1290.','1409.','1459.']],
 ['godina kada Cres preuzima od Osora gospodarsku i upravnu funkciju arhipelaga','1459.',['1332.','1409.','1579.']],
 ['antički naziv grada Cresa','Crexa ili Crepsa',['Apsorus','Curicum','Parentium']],
 ['antički naziv Osora','Apsorus',['Crepsa','Curicum','Arba']],
 ['narod koji je u antičko doba živio na Cresu prije pune rimske prevlasti','Liburni',['Histri','Delmati','Japodi']],
 ['država pod čijom je vlašću Cres bio nakon pada Zapadnoga Rimskog Carstva','Bizant',['Mletačka Republika','Osmansko Carstvo','Franačko Carstvo']],
 ['godina kada venecijanski dužd Orseolo osvaja otoke bez borbe','1000.',['882.','1097.','1409.']],
 ['godina ukidanja cresko-osorske kneževine','1409.',['1332.','1459.','1797.']],
 ['ugovor kojim su nakon Prvoga svjetskog rata Cres i otoci dodijeljeni Italiji','Rapalski ugovor',['Londonski ugovor','Trianonski ugovor','Pariški ugovor']],
 ['godina kada su otoci nakon talijanske kapitulacije vraćeni hrvatskoj matici','1947.',['1943.','1945.','1950.']],
 ['najpoznatiji oblik stare creske gradske jezgre','pravokutni sustav zidina s pet kula',['kružni sustav bez kula','trokutasti sustav s dvije kule','otvorena jezgra bez zidina']],
 ['stoljeće crkve sv. Izidora u Cresu','12. stoljeće',['10. stoljeće','15. stoljeće','18. stoljeće']],
 ['stoljeće crkve sv. Marije Snježne','16. stoljeće',['12. stoljeće','14. stoljeće','19. stoljeće']],
 ['samostan približno iz 1300. godine u Cresu','franjevački samostan',['benediktinski samostan','pavlinski samostan','dominikanski samostan']]
 ]},
 crikvenica:{url:'https://www.crikvenica.hr/setnja-gradom/',facts:[
 ['redovnički red koji je 1412. osnovao samostansku školu u Crikvenici','pavlini',['franjevci','benediktinci','dominikanci']],
 ['godina početka djelovanja prve samostanske škole u Crikvenici','1412.',['1242.','1498.','1516.']],
 ['poznati minijaturist koji se školovao kod crikveničkih pavlina','Juraj Julije Klović',['Ivan Belostenec','Julije Dalmatinac','Marko Marulić']],
 ['godina rođenja Jurja Julija Klovića','1498.',['1412.','1578.','1593.']],
 ['godina smrti Jurja Julija Klovića','1578.',['1498.','1516.','1675.']],
 ['jezik koji se učio u samostanskoj školi uz latinski','hrvatski jezik i glagoljica',['samo grčki','samo njemački','samo talijanski']],
 ['poznati hrvatski jezikoslovac koji je djelovao kao prior i učitelj latinskog u samostanu','Ivan Belostenec',['Juraj Julije Klović','Faust Vrančić','Ivan Gundulić']],
 ['godina rođenja Ivana Belostenca','1593.',['1498.','1578.','1675.']],
 ['godina smrti Ivana Belostenca','1675.',['1593.','1705.','1578.']],
 ['godina izgradnje prvog drvenog kupališta Banje poli vrutka','1888.',['1895.','1906.','1912.']],
 ['godina otvaranja hotela Therapia','1895.',['1888.','1906.','1920.']],
 ['godina otvaranja hotela Miramare','1906.',['1888.','1895.','1914.']],
 ['datum proglašenja Crikvenice klimatskim lječilištem i morskim kupalištem','25. ožujka 1906.',['14. kolovoza 1412.','1. svibnja 1895.','25. prosinca 1906.']],
 ['rijeka čije je ušće središte povijesne šetnje Crikvenicom','Dubračina',['Kupa','Zrmanja','Krka']],
 ['objekt u čijem se krugu nalazi crikvenički lapidarij','hotel Kaštel',['hotel Therapia','hotel Miramare','hotel Esplanade']]
 ]},
 garesnica:{url:'https://www.garesnica.garesnica.hr/index.php/o-gradu/124-garesnica-kroz-povijest.html',facts:[
 ['godina osnutka prve čitaonice u Garešnici','1887.',['1861.','1893.','1906.']],
 ['godina osnutka Vatrogasnog društva u Garešnici','1893.',['1887.','1874.','1918.']],
 ['županija u kojoj je Garešnica bila nakon upravne organizacije 1874.','Bjelovarska županija',['Križevačka županija','Požeška županija','Osječka županija']],
 ['oblast kojoj je Garešnica pripala nakon ukidanja županija 1924.','Osječka oblast',['Zagrebačka oblast','Bjelovarska oblast','Riječka oblast']],
 ['oblik kuća karakterističan za područje Garešnice u doba vojnih opasnosti','čardaci',['kaštele','bunje','klijeti']],
 ['veliko geografsko područje u kojem se nalaze prirodni i povijesni lokaliteti Bršljanice','Moslavačka gora',['Bilogora','Medvednica','Papuk']],
 ['povijesna utvrda koju u okolici Garešnice promovira Povijesna udruga Bršljanica','Garić grad',['Stari grad Samobor','Ozalj','Trakošćan']],
 ['utvrda koju u Bršljanici navode uz Garić grad','Bršljanac',['Kaptol','Dubovac','Veliki Tabor']],
 ['srednjovjekovna utvrda na Moslavačkoj gori koju je udruga posjetila','Jelengrad',['Garić grad','Bršljanac','Medvedgrad']],
 ['manifestacija koja je prvi put održana 1994. u Garešnici','Gariglazbijada',['Gastroflora','Bučijada','Đakovački vezovi']],
 ['godina prvog održavanja Gariglazbijade','1994.',['1989.','1991.','2004.']],
 ['svrha za koju je Gariglazbijada izvorno organizirana','pomoć djeci poginulih hrvatskih branitelja',['obnova željeznice','proslava berbe grožđa','obilježavanje osnutka grada']],
 ['drugi važan naziv među tradicionalnim manifestacijama Garešnice uz Gariglazbijadu','Gastroflora',['Fišijada','Bučijada','Vinkovačke jeseni']],
 ['jezero povezano s novijom Fišijadom u Garešnici','Skresovi',['Jarun','Bajer','Modro jezero']],
 ['područje čiji su stanovnici tijekom turske okupacije gotovo u cijelosti nestali prema gradskom povijesnom prikazu','širi garešnički kraj',['Istra','Konavle','Podravina']]
 ]},
 grubisno_polje:{url:'https://grubisnopolje.hr/o-grubisnom-polju/detaljnije/povijest',facts:[
 ['godina prvog spomena srednjovjekovnog Grubišnog Polja kao trgovišta prema Hrvatskoj enciklopediji','1453.',['1272.','1457.','1501.']],
 ['godine u kojima se Grubišno Polje spominje kao posjed knezova Iločkih','1457.–1503.',['1241.–1242.','1501.–1552.','1698.–1871.']],
 ['župa koja se prvi put spominje 1501.','župa Grubišno Polje',['župa Veliki Zdenci','župa Daruvar','župa Garešnica']],
 ['stari grad čije je ime zabilježeno 1272. kao Zdencz ili Izdench','Zdenci',['Grubišno Polje','Daruvar','Bjelovar']],
 ['godina održavanja Sabora u Velikim Zdencima prema gradskom prikazu','1478.',['1453.','1501.','1689.']],
 ['datum Sabora u Velikim Zdencima','28. siječnja 1478.',['12. ožujka 1689.','13. lipnja 1786.','11. lipnja 1913.']],
 ['godina otvaranja trivijalne škole u Grubišnom Polju','1786.',['1698.','1826.','1876.']],
 ['datum Carske povelje kojom je 1786. odobreno održavanje godišnjih sajmova','13. lipnja 1786.',['28. siječnja 1478.','11. lipnja 1913.','4. studenoga 1991.']],
 ['godina otvaranja pučke četverorazredne škole','1826.',['1786.','1876.','1897.']],
 ['godina početka naseljavanja Čeha u Ivanovo Selo i Velike Zdence','1825.',['1786.','1878.','1909.']],
 ['godina otvaranja pošte u Grubišnom Polju','1876.',['1826.','1887.','1892.']],
 ['godina otvaranja brzojavnog ureda','1892.',['1876.','1897.','1913.']],
 ['godina otvaranja male parne mljekare u Velikim Zdencima','1897.',['1876.','1892.','1913.']],
 ['datum otvaranja željezničke pruge Pavlovac–Dražica–Grubišno Polje','11. lipnja 1913.',['13. lipnja 1786.','28. siječnja 1478.','12. rujna 2023.']],
 ['svetac kojem je posvećena župna crkva iz 1782. u Grubišnom Polju','sv. Josip',['sv. Juraj','sv. Marko','sv. Nikola']]
 ]},
 ivanic_grad:{url:'https://ivanic-grad.hr/grad/povijest',facts:[
 ['godina prvog spomena Ivanić-Grada u zapisima','1246.',['1193.','1332.','1412.']],
 ['rijeka uz čiju se dolinu razvila ivanićka tvrđava','Lonja',['Sava','Kupa','Česma']],
 ['stoljeće izgradnje ivanićke tvrđave u dolini Lonje','16. stoljeće',['13. stoljeće','14. stoljeće','18. stoljeće']],
 ['biskup koji je prema gradskom prikazu u prvoj polovici 14. stoljeća gradio tvrdi grad castrum novum','Ladislav de Kobol',['Stjepan II. Babonić','Josip Juraj Strossmayer','Nikola IV. Frankopan']],
 ['biskup povezan s prvom drvenom kurijom ili utvrdom na tom području','Stjepan II. Babonić',['Ladislav de Kobol','Nikola IV. Frankopan','Matija Korvin']],
 ['glavna sirovina čija se proizvodnja razvila na području Ivanić-Grada u 20. stoljeću','nafta',['ugljen','željezo','boksit']],
 ['lječilišno ulje povezano s Ivanić-Gradom','naftalan',['petrolej','terpentin','jod']],
 ['godina osnutka Specijalne bolnice Naftalan','1989.',['1970.','1975.','2004.']],
 ['područje na kojem se nalazi Šuma Žutica','između Ivanić-Grada, Popovače, Siska i Velike Gorice',['između Zagreba, Karlovca, Ogulina i Senja','između Splita, Sinja, Imotskog i Omiša','između Varaždina, Čakovca, Koprivnice i Križevaca']],
 ['približna površina Šume Žutice navedena na gradskoj stranici','6000 hektara',['600 hektara','16 000 hektara','60 000 hektara']],
 ['ekološka mreža čiji je dio Šuma Žutica','Natura 2000',['Natura 3000','Euroforest 2000','Adria Natura']],
 ['posebnost mužjaka močvarne smeđe žabe u Žutici tijekom razmnožavanja','mijenja boju prema plavoj',['postaje potpuno bijel','razvija krila','prestaje disati']],
 ['godina od koje se Bučijada u Ivanić-Gradu održava u kontinuitetu','2004.',['1989.','1991.','2014.']],
 ['mjesto u središtu grada na kojem se tradicionalno odvija velik dio Bučijade','tržnica Maznica',['tržnica Dolac','Trg bana Jelačića','Gradska tržnica Rijeka']],
 ['autohtona vrsta vina koju turistička zajednica Ivanić-Grada posebno ističe','škrlet',['graševina','malvazija','plavac mali']]
 ]}
};
const forms=[
 'Koji je točan podatak za {} u vezi s gradom {}?',
 'Što je povezano s {} u gradu {}?',
 'Koja tvrdnja ispravno opisuje {} u gradu {}?',
 'Što treba zapamtiti o {} kada se govori o gradu {}?',
 'Koji odgovor odgovara podatku: {} — {}?'
];
const norm=s=>String(s).toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const all=[];
Object.entries(DATA).forEach(([city,d])=>d.facts.forEach((f,fi)=>forms.forEach((tpl,ti)=>{
 const correct=f[1],answers=f[2].slice(); const idx=(fi+ti)%4; answers.splice(idx,0,correct);
 let q;
 if(ti<4) q=tpl.replace('{}',f[0]).replace('{}',city.replace(/_/g,' '));
 else q=tpl.replace('{}',f[0]).replace('{}',correct);
 all.push({id:`missing01_${city}_${String(fi*5+ti+1).padStart(3,'0')}`,cityId:city,citySource:'verified',category:'gradovi',question:q,answers,correctIndex:idx,sourceUrl:d.url});
})));
global.PATRIA_CITY_VERIFIED_MISSING_01=all;
global.PatriaCityVerifiedMissing01={all:()=>all.slice(),forCity:c=>all.filter(q=>q.cityId===norm(c)),sources:()=>Object.fromEntries(Object.entries(DATA).map(([k,v])=>[k,v.url]))};
})(typeof window!=='undefined'?window:globalThis);
