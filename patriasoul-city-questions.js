// PatriaSoul — gradski sloj pitanja.
// Ne stvara novu neovisnu glavnu banku: postojeća pitanja dobivaju cityId samo kada je veza jasna,
// a provjerene gradske činjenice dodaju se kao mali sloj za Brani svoj grad.
(function(global){'use strict';
  const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
  const base=typeof global.PatriaQuiz?.bank==='function'?global.PatriaQuiz.bank():[];
  const bySlug=Object.fromEntries(cities.map(c=>[c.slug,c]));
  const countySet=[...new Set(cities.map(c=>c.county))];
  const cityByCounty={}; cities.forEach(c=>(cityByCounty[c.county]??=[]).push(c));
  const out=[]; const seen=new Set();
  const norm=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function add(q){if(!q||!q.id||seen.has(q.id))return;seen.add(q.id);out.push(q)}
  function otherCounties(c,n=3){return countySet.filter(x=>x!==c.county).slice(0,n)}
  base.forEach(q=>{
    if(!q||!q.question)return;
    const text=norm(String(q.question)+' '+(Array.isArray(q.answers)?q.answers.join(' '):''));
    cities.forEach(c=>{if(text.includes(norm(c.name)))add({...q,cityId:c.slug,citySource:'explicit-text'})});
  });
  cities.forEach(c=>{
    add({id:`city_${c.slug}_county_001`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`U kojoj se županiji nalazi ${c.name}?`,answers:[c.county,...otherCounties(c)],correctIndex:0});
    const members=(cityByCounty[c.county]||[]).filter(x=>x.slug!==c.slug).sort((a,b)=>a.name.localeCompare(b.name,'hr')).map(x=>x.name);
    if(members.length>=3){
      add({id:`city_${c.slug}_county_002`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`Koji je od navedenih gradova u ${c.county}?`,answers:[c.name,...members.slice(0,3)],correctIndex:0});
      const distractors=cities.filter(x=>x.slug!==c.slug&&x.county!==c.county).sort((a,b)=>a.name.localeCompare(b.name,'hr')).slice(0,3).map(x=>x.name);
      add({id:`city_${c.slug}_identity_001`,cityId:c.slug,citySource:'city-registry',category:'gradovi',question:`Koji od navedenih gradova pripada ${c.county}?`,answers:[c.name,...distractors],correctIndex:0});
    }
  });
  // Provjerene činjenice: službeni gradski izvori + UNESCO.
  const verified={
    split:[
      ['Koji je rimski car početkom 4. stoljeća sagradio palaču iz koje je izrastao današnji Split?',['Dioklecijan','Konstantin Veliki','Trajan','Hadrijan']],
      ['Koje je godine Povijesni kompleks Splita i Dioklecijanova palača upisan na UNESCO-ov Popis svjetske baštine?',['1979.','1985.','1997.','2000.']],
      ['Koji je antički grad u blizini Splita bio razoren početkom 7. stoljeća, nakon čega su se stanovnici sklonili u Dioklecijanovu palaču?',['Salona','Narona','Mursa','Siscia']],
      ['Što se nalazi unutar rimskih zidina Dioklecijanove palače?',['Romaničke crkve, srednjovjekovne utvrde te gotičke, renesansne i barokne palače','Samo rimske vojarne','Samo barokne palače','Isključivo moderne zgrade']]
    ],
    dubrovnik:[
      ['Koje je godine Stari grad Dubrovnik prvi put upisan na UNESCO-ov Popis svjetske baštine?',['1979.','1987.','1997.','2008.']],
      ['Koja je povijesna uloga Dubrovnika istaknuta u opisu UNESCO-a?',['Pomorska sila na Sredozemlju','Glavni grad Rimskog Carstva','Najveća kontinentalna utvrda Hrvatske','Rudarsko središte Panonije']],
      ['Koje je godine Dubrovnik uvršten na UNESCO-ov Popis ugrožene baštine svijeta zbog ratnih razaranja?',['1991.','1995.','1998.','2001.']],
      ['Koji je povijesni razvoj arhitekture posebno vidljiv u dubrovačkoj gradskoj jezgri?',['Od romanike do baroka','Samo od antike do gotike','Samo renesansa','Samo barok']]
    ],
    porec:[
      ['Koje je porečko dobro na UNESCO-ovu Popisu svjetske baštine?',['Episkopalni kompleks Eufrazijeve bazilike u povijesnom središtu','Porečka gradska vijećnica','Porečka riva','Kaštel Poreč']],
      ['Koje je godine kompleks Eufrazijeve bazilike u Poreču upisan na UNESCO-ov Popis svjetske baštine?',['1997.','1979.','2000.','2008.']],
      ['U kojem se dijelu Poreča nalazi UNESCO-om zaštićeni Eufrazijev kompleks?',['Povijesnom središtu','Na gradskoj obilaznici','U novoj industrijskoj zoni','Izvan grada']],
      ['Koja međunarodna organizacija vodi Popis svjetske baštine na kojem je Eufrazijev kompleks?',['UNESCO','NATO','Interpol','WHO']]
    ],
    trogir:[
      ['Koji je hrvatski grad na UNESCO-ovu Popisu poznat kao Povijesni grad Trogir?',['Trogir','Omiš','Senj','Kastav']],
      ['Koje je godine Povijesni grad Trogir upisan na UNESCO-ov Popis svjetske baštine?',['1997.','1979.','2000.','2017.']],
      ['U kojoj se hrvatskoj županiji nalazi UNESCO-ov Povijesni grad Trogir?',['Splitsko-dalmatinskoj','Šibensko-kninskoj','Zadarskoj','Dubrovačko-neretvanskoj']],
      ['Koja organizacija navodi Povijesni grad Trogir među hrvatskim dobrima svjetske baštine?',['UNESCO','UNHCR','Interpol','OECD']]
    ],
    sibenik:[
      ['Koja je znamenita građevina u Šibeniku upisana na UNESCO-ov Popis svjetske baštine?',['Katedrala sv. Jakova','Tvrđava sv. Mihovila','Šibenski most','Gradska vijećnica']],
      ['Koje je godine Katedrala sv. Jakova u Šibeniku upisana na UNESCO-ov Popis svjetske baštine?',['2000.','1979.','1997.','2017.']],
      ['Koji se obrambeni sustav nalazi u Šibeniku među UNESCO-ovim dobrima?',['Obrambeni sustavi Republike Venecije 16. i 17. stoljeća','Linija Maginot','Rimski limes Dunava','Kineski zid']],
      ['Koja institucija navodi Katedralu sv. Jakova kao hrvatsko dobro svjetske baštine?',['Ministarstvo kulture i medija RH','Hrvatski sabor','Hrvatska narodna banka','DHMZ']]
    ],
    zadar:[
      ['Koji je hrvatski grad dio UNESCO-ovog dobra Obrambeni sustavi Republike Venecije 16. i 17. stoljeća?',['Zadar','Varaždin','Požega','Gospić']],
      ['Koje je razdoblje obuhvaćeno UNESCO-ovim nazivom venecijanskih obrambenih sustava u Zadru i Šibeniku?',['16. i 17. stoljeće','12. i 13. stoljeće','18. i 19. stoljeće','20. stoljeće']],
      ['S kojim je drugim hrvatskim gradom Zadar naveden u UNESCO-ovom dobru venecijanskih obrambenih sustava?',['Šibenikom','Dubrovnikom','Splitom','Porečom']],
      ['Koja organizacija je upisala venecijanske obrambene sustave u Zadar i Šibenik na Popis svjetske baštine?',['UNESCO','NATO','Vijeće Europe','Interpol']]
    ],
    zagreb:[
      ['Na koja su se dva povijesna brežuljka razvile najstarije jezgre današnjeg Zagreba?',['Kaptol i Gradec','Medvedgrad i Maksimir','Grič i Medvednica','Sava i Kupa']],
      ['Koje je godine Gradec proglašen slobodnim i kraljevskim gradom?',['1242.','1094.','1217.','1334.']],
      ['Koji je kralj Gradecu dodijelio Zlatnu bulu 1242. godine?',['Bela IV.','Ladislav I.','Krešimir I.','Zvonimir']],
      ['Koje je zagrebačko područje bilo biskupsko središte?',['Kaptol','Gradec','Trnje','Maksimir']]
    ],
    rijeka:[
      ['Kako se zvalo rimsko naselje na području današnjeg riječkog Starog grada?',['Tarsatica','Salona','Mursa','Siscia']],
      ['Koja rijeka protječe kroz Rijeku i ulijeva se u Riječki zaljev?',['Rječina','Kupa','Korana','Dobra']],
      ['Kako se zove povijesni dio Rijeke na brijegu iznad kanjona Rječine?',['Trsat','Kastav','Sušak','Bakar']],
      ['Koje je godine Rijeka proglašena slobodnom lukom za vrijeme cara Karla VI.?',['1719.','1660.','1815.','1868.']]
    ],
    pula:[
      ['Koji je rimski spomenik najpoznatija znamenitost Pule?',['Arena','Dioklecijanova palača','Eufrazijeva bazilika','Tvrđava sv. Mihovila']],
      ['Koja je rimska građevina u Puli poznata i kao Amfiteatar?',['Arena','Augustov hram','Slavoluk Sergijevaca','Rimsko kazalište']],
      ['Koji je događaj 1856. označio početak snažnog modernog razvoja Pule?',['Otvorenje Arsenala, glavne baze austrijske ratne mornarice','Otvorenje sveučilišta','Izgradnja prve autoceste','Osnivanje filmskog festivala']],
      ['S kojom je državom Pula bila povezana kao dio austrijskog Primorja od 1815. do kraja Prvog svjetskog rata?',['Austrijom','Francuskom','Italijom','Ugarskom']]
    ],
    osijek:[
      ['Koji je povijesni dio Osijeka poznat kao barokna urbana i vojna jezgra?',['Tvrđa','Gornji grad','Donji grad','Retfala']],
      ['Uz koju se rijeku nalazi osječka Tvrđa?',['Dravu','Savu','Dunav','Kupu']],
      ['Od koje do koje godine austrijske su vlasti planski gradile osječku Tvrđu?',['1712.–1722.','1699.–1705.','1800.–1810.','1848.–1856.']],
      ['Koja je ustanova u Tvrđi otvorena 1729. godine?',['Gimnazija','Sveučilište','Kazalište','Muzej']]
    ],
    varazdin:[
      ['Koja je najvažnija povijesna građevina Varaždina?',['Stari grad','Katedrala sv. Jakova','Kninska tvrđava','Arena']],
      ['Kakvu je ulogu imao varaždinski Stari grad?',['Sjedište feudalne uprave i utvrda','Rimski amfiteatar','Pomorska luka','Industrijski kompleks']],
      ['Koji je dio obrambenog sustava Stari grad Varaždin imao za vrijeme ratova s Osmanlijama?',['Kulu stražarnicu','Morsku tvrđavu','Luku galija','Rimski limes']],
      ['Koji su graditelji i vlasnici među ostalima boravili u varaždinskom Starom gradu?',['Celjski, Vitovci, Korvini, Brandenburg i Ungnad','Frankopani, Zrinski i Šubići','Brlići i Mažuranići','Rimljani i Liburni']]
    ],
    knin:[
      ['Na kojem se brdu nalazi Kninska tvrđava?',['Spas','Medvednica','Marjan','Srđ']],
      ['Koje se godine Knin spominje u djelu Konstantina Porfirogeneta?',['950.','879.','1074.','1242.']],
      ['Koji je hrvatski vladar prema službenom opisu Kninske tvrđave učvrstio Knin kao stalnu prijestolnicu?',['Zvonimir','Tomislav','Krešimir I.','Petar Krešimir IV.']],
      ['Kako se zvala tvrđava koja je prethodila kasnijem tvrđavskom kompleksu Knina?',['castro Tnin','Tarsatica','Andautonia','Mursa']]
    ]
  };
  const urls={
    split:'https://whc.unesco.org/en/list/97/',
    dubrovnik:'https://whc.unesco.org/en/list/95/',
    porec:'https://whc.unesco.org/en/list/809/',
    trogir:'https://whc.unesco.org/en/list/810/',
    sibenik:'https://whc.unesco.org/en/list/963/',
    zadar:'https://whc.unesco.org/en/list/1533/',
    zagreb:'https://aktivnosti.zagreb.hr/gradske-cetvrti-19/gornji-grad-medvescak/iz-povijesti-13432/13432',
    rijeka:'https://www.rijeka.hr/gradska-uprava/povijest-rijeke/',
    pula:'https://www.pula.hr/hr/o-puli-pola/povijest-pule/',
    osijek:'https://www.osijek.hr/kultura/tvrda/',
    varazdin:'https://varazdin.hr/varazdin-kroz-povijest/',
    knin:'https://knin.hr/kninska-tvrdava/'
  };
  Object.entries(verified).forEach(([slug,items])=>{if(!bySlug[slug])return;items.forEach((f,i)=>add({id:`city_${slug}_verified_${String(i+1).padStart(3,'0')}`,cityId:slug,citySource:'verified-fact',category:'gradovi',question:f[0],answers:f[1],correctIndex:0,sourceUrl:urls[slug]}))});
  global.PatriaCityQuestions={
    all:()=>out.slice(),
    forCity:city=>{const c=cities.find(x=>x.name===city||x.slug===city);return c?out.filter(q=>q.cityId===c.slug):[]},
    city:city=>bySlug[city]||cities.find(c=>c.name===city)||null,
    stats:()=>({cities:cities.length,questions:out.length,withCityId:out.filter(q=>q.cityId).length,explicit:out.filter(q=>q.citySource==='explicit-text').length,registry:out.filter(q=>q.citySource==='city-registry').length,verified:out.filter(q=>q.citySource==='verified-fact').length})
  };
})(typeof window!=='undefined'?window:globalThis);
