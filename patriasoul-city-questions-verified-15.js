// PatriaSoul — provjerena gradska pitanja, nastavak 15.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'slatina':[
      ['Koje se godine Slatina prvi put spominje u pisanom dokumentu?',['1297.','1201.','1544.','1808.']],
      ['Kako je glasilo srednjovjekovno ime Slatine u ispravi iz 1297. godine?',['Zalathnuk','Salona','Zrin','Marinianis']],
      ['Koja je plemićka obitelj od 1750. godine postala vlasnik Slatine?',['Pejačević','Erdődy','Janković','Drašković']],
      ['Koje je godine Slatina proglašena trgovištem?',['1808.','1750.','1822.','1886.']]
    ],
    'kutjevo':[
      ['Koji je red osnovao opatiju u Kutjevu 1232. godine?',['Cisterciti','Pavlini','Isusovci','Franjevci']],
      ['Kako se zove poznati vinski podrum iz 1232. godine?',['Kutjevački vinski podrum','Spahijski podrum','Erdődyjev podrum','Banovinski podrum']],
      ['Koja je grana gospodarstva posebno obilježila povijest Kutjeva?',['Vinogradarstvo','Brodogradnja','Rudarstvo','Pomorstvo']],
      ['Koji su redovnici nastavili obnovu kutjevačkog kompleksa nakon osmanskog razdoblja?',['Isusovci','Benediktinci','Dominikanci','Templari']]
    ],
    'lipik':[
      ['Koje se godine prvi put spominje ljekovitost Lipičkih vrela?',['1517.','1691.','1773.','1782.']],
      ['Koje je godine izbušen prvi arteški bunar u Lipiku i sagrađen paviljon Izvor?',['1869.','1843.','1875.','1894.']],
      ['Koje je godine u Lipiku uvedena prva električna rasvjeta iz vlastite parne elektrane?',['1894.','1886.','1897.','1905.']],
      ['Koji su konji posebno povezani s tradicijom Lipika?',['Lipicanci','Arabi','Haflinzi','Frizijci']]
    ],
    'pakrac':[
      ['Koje godine datira najstariji siguran pisani spomen Pakraca prema Gradu Pakracu?',['1256.','1232.','1297.','1400.']],
      ['Koji se srednjovjekovni novac kovao u Pakracu sredinom 13. stoljeća?',['Slavonski banovac','Dukat','Denar','Kuna']],
      ['Koji je križarski red bio povezan s pakračkom utvrdom i sjedištem Vransko-prioratske uprave?',['Ivanovci','Pavlini','Templari','Franjevci']],
      ['Kako se zove poznata manifestacija koja oživljava priču o srednjovjekovnoj kovnici u Pakracu?',['Slavonski banovac','Dani Trenka','Pakračko ljeto','Banovački susreti']]
    ]
  };
  const urls={
    slatina:'https://www.slatina.hr/portal/povijest-grada/',
    kutjevo:'https://www.kutjevo.hr/o-gradu/povijest/',
    lipik:'https://lipik.hr/o-lipiku/o-lipiku-opcenito/',
    pakrac:'https://pakrac.hr/770-godina-pakraca-grad-koji-pamti-kraljeve-vitezove-trgovce-vojnike/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified15_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_15=all;
  global.PatriaCityVerified15={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
