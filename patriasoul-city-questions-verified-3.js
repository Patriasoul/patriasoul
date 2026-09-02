// PatriaSoul — provjerena gradska pitanja, nastavak 3.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    daruvar:[
      ['Kako su Rimljani nazvali naselje na području današnjeg Daruvara poznato po termalnim izvorima?',['Aquae Balissae','Andautonia','Siscia','Mursa']],
      ['Koje je značenje naziva Aquae Balissae?',['Vrlo jaka vrela','Zlatna voda','Kraljevske toplice','Bijela rijeka']],
      ['Koja je grofovska obitelj snažno obilježila razvoj Daruvara u 18. stoljeću?',['Janković','Pejačević','Zrinski','Frankopan']],
      ['Koje se godine obilježava početak rada Daruvarske pivovare?',['1840.','1777.','1897.','1918.']]
    ],
    kutina:[
      ['Koje se godine Kutina prvi put spominje u pisanoj ispravi?',['1256.','1193.','1242.','1356.']],
      ['Koji je hrvatsko-ugarski kralj izdao ispravu u kojoj se Kutina prvi put spominje?',['Bela IV.','Zvonimir','Ladislav IV.','Matija Korvin']],
      ['U kojoj se povijesnoj hrvatskoj regiji nalazi Kutina?',['Moslavina','Baranja','Lika','Istra']],
      ['Koja je velika industrijska tvornica posebno obilježila noviju gospodarsku povijest Kutine?',['Petrokemija','Đuro Đaković','INA Rafinerija','Pliva']]
    ],
    nova_gradiska:[
      ['Koje je godine utemeljena Nova Gradiška?',['1748.','1699.','1765.','1888.']],
      ['U sklopu koje je povijesne organizacije Nova Gradiška osnovana kao graničarsko naselje?',['Slavonske Vojne krajine','Dubrovačke Republike','Banovine Hrvatske','Mletačke Dalmacije']],
      ['Tko je rukovodio izgradnjom novog vojnog naselja nakon osnutka 1748. godine?',['Phillip Lewin Beck','Josip Jelačić','Antun Janković','Ivo Kramarić']],
      ['Koje je godine željeznička pruga povezala Novu Gradišku sa Zagrebom?',['1888.','1871.','1906.','1913.']]
    ],
    zupanja:[
      ['Na kojoj rijeci leži Županja?',['Savi','Dravi','Dunavu','Kupi']],
      ['Koje su godine engleski industrijalci donijeli nogometnu loptu u Županju?',['1880.','1871.','1895.','1900.']],
      ['Koji je sport, uz nogomet, zabilježen u Županji već 1881. godine?',['Tenis','Ragbi','Kriket','Hokej']],
      ['Kako se zove nogometni klub osnovan u Županji 1920. godine?',['Graničar','Slavonija','Sava','Posavac']]
    ]
  };
  const urls={
    daruvar:'https://daruvar.hr/daruvar-kroz-povijest/',
    kutina:'https://stari.kutina.hr/Sluzbeni-dio/O-Kutini',
    nova-gradiska:'https://novagradiska.hr/zivot-u-novoj-gradiski/povijest/',
    zupanja:'https://zupanja.hr/povijest-sporta-u-zupanji/'
  };
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified3_${city}_${String(i+1).padStart(3,'0')}`,cityId:city,citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_3=all;
  global.PatriaCityVerified3={all:()=>all.slice(),forCity:city=>{const slug=String(city).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
