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
    ],
    petrinja:[
      ['Koje je godine započela gradnja Nove Petrinje na današnjem mjestu grada?',['1592.','1240.','1531.','1753.']],
      ['Koji je vladar Petrinji 1240. godine dodijelio povlastice slobodnog kraljevskog grada?',['Bela IV.','Ladislav IV.','Matija Korvin','Karlo IV.']],
      ['Koji je arhitekt 1617. godine preuredio petrinjsku tvrđavu u oblik peterokuta?',['Cesare Porta','Giovanni Scalferotto','Hermann Bollé','Bartolomeo Caltagirone']],
      ['Koja je vojno-redarstvena operacija 1995. godine oslobodila Petrinju?',['Oluja','Bljesak','Maslenica','Medački džep']]
    ],
    ogulin:[
      ['Koji je velikaš povezan s osnutkom Ogulina i gradnjom njegova kaštela?',['Bernardin Frankopan','Nikola Šubić Zrinski','Petar Zrinski','Stjepan Erdődy']],
      ['Uz koju se rijeku nalazi Stari grad Ogulin?',['Dobru','Kupu','Mrežnicu','Koranu']],
      ['Oko koje je godine Bernardin Frankopan dao izgraditi ogulinski kaštel?',['Oko 1500.','Oko 1400.','Oko 1600.','Oko 1700.']],
      ['Pod kojom se planinom nalazi Ogulin?',['Klek','Velebit','Medvednica','Učka']]
    ],
    buzet:[
      ['U kojem se dijelu Istre nalazi Buzet?',['U sjevernoj Istri','Na krajnjem jugu Istre','Na zapadnoj obali Istre','Na otoku Cresu']],
      ['Uz koju se rijeku nalazi Buzet?',['Mirnu','Rašu','Dragonju','Pazinčicu']],
      ['Koja je gastronomska posebnost posebno povezana s područjem Buzeta?',['Tartufi','Mandarine','Kuleni','Škampi']],
      ['Kako se zove povijesna jezgra Buzeta smještena na brežuljku iznad doline Mirne?',['Stari grad Buzet','Kaštel Mirna','Fortica Istra','Gradina Sv. Jurja']]
    ],
    rovinj:[
      ['Kako se Rovinj u ranom povijesnom izvoru naziva?',['Castrum Rubini','Aenona','Iader','Parentium']],
      ['Koja je svetica zaštitnica Rovinja?',['Sv. Eufemija','Sv. Foška','Sv. Justa','Sv. Marija']],
      ['Koje je godine, prema rovinjskoj tradiciji, sarkofag sa sv. Eufemijom stigao do rovinjske obale?',['800.','950.','1178.','1756.']],
      ['Koji je poznati rovinjski spomenik visok više od 62 metra?',['Zvonik sv. Eufemije','Balbijev luk','Gradska vrata','Kula Sv. Benedikta']]
    ]
  };
  const urls={
    daruvar:'https://daruvar.hr/daruvar-kroz-povijest/',kutina:'https://stari.kutina.hr/Sluzbeni-dio/O-Kutini',nova-gradiska:'https://novagradiska.hr/zivot-u-novoj-gradiski/povijest/',zupanja:'https://zupanja.hr/povijest-sporta-u-zupanji/',
    petrinja:'https://petrinja.hr/povijest-grada/',ogulin:'https://www.ogulin.hr/o-ogulinu/povijest/',buzet:'https://www.buzet.hr/',rovinj:'https://www.rovinj-rovigno.hr/o-rovinju/povijest/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified3_${city}_${String(i+1).padStart(3,'0')}`,cityId:city,citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_3=all;
  global.PatriaCityVerified3={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
