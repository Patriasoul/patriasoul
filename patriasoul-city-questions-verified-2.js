// PatriaSoul — nastavak proširenja provjerenih gradskih pitanja.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    samobor:[
      ['Koje je godine Bela IV. Samoboru dao povlasticu slobodnog kraljevskog trgovišta?',['1242.','1193.','1253.','1356.']],
      ['Koji je češki kralj dao izgraditi Stari grad Samobor 1268. godine?',['Otokar II. Přemysl','Bela IV.','Matija Korvin','Karlo IV.']],
      ['Na kojem se brdu nalaze ruševine Staroga grada Samobora?',['Tepec','Okić','Kalnik','Medvednica']],
      ['Koja je hrvatska književnica 1843. godine usponom na Okić ispisala prve stranice hrvatskog alpinizma?',['Dragojla Jarnević','Ivana Brlić-Mažuranić','Marija Jurić Zagorka','Jagoda Truhelka']]
    ],
    krizevci:[
      ['Koje se godine Križevci prvi put spominju u ispravi kralja Bele III.?',['1193.','1209.','1223.','1253.']],
      ['Koje su godine Križevci dobili Zlatnu bulu i povlastice slobodnoga kraljevskog grada?',['1253.','1242.','1356.','1397.']],
      ['Kako se nazivaju dva povijesna dijela od kojih je nastao današnji grad Križevci?',['Gornji i Donji grad','Stari i Novi grad','Kraljevski i Banski grad','Veliki i Mali Križevac']],
      ['Koji je poznati sabor hrvatskog plemstva održan u Križevcima 1397. godine?',['Krvavi sabor križevački','Hrvatski sabor 1848.','Cetinski sabor','Splitski sabor']]
    ],
    dakovo:[
      ['Koje se godine Đakovo prvi put spominje u poznatim pisanim dokumentima?',['1239.','1193.','1242.','1356.']],
      ['Koji je hrvatski biskup posebno obilježio razvoj Đakova u 19. stoljeću?',['Josip Juraj Strossmayer','Antun Mandić','Juraj Haulik','Maksimilijan Vrhovac']],
      ['Koja je velika sakralna građevina jedan od najpoznatijih simbola Đakova?',['Katedrala sv. Petra','Katedrala sv. Duje','Eufrazijeva bazilika','Katedrala sv. Jakova']],
      ['Kako se zove poznata tradicijska manifestacija koja se održava u Đakovu?',['Đakovački vezovi','Sinjska alka','Vinkovačke jeseni','Samoborski fašnik']]
    ],
    nasice:[
      ['Koje se godine Našice prvi put spominju u povijesnim izvorima?',['1229.','1193.','1242.','1356.']],
      ['Koja je plemićka obitelj bila vlasnikom našičkog posjeda od kraja 18. stoljeća do 1945. godine?',['Pejačević','Zrinski','Frankopani','Erdődy']],
      ['Koja je poznata hrvatska skladateljica bila članica obitelji Pejačević iz Našica?',['Dora Pejačević','Ivana Lang','Blagoje Bersa','Josip Hatze']],
      ['Koje je godine sagrađen stari dvorac grofa Pejačevića u Našicama?',['1811.','1779.','1849.','1907.']]
    ]
  };
  const urls={
    samobor:'https://www.samobor.hr/visit/stari-grad-samobor-p441',
    krizevci:'https://www.krizevci.eu/hr_HR/kri%C5%BEevci/povijest/',
    dakovo:'https://www.djakovo.hr/index.php/grad/o-gradu.html',
    nasice:'https://nasice.hr/o-nasicama/povijest-grada-nasica/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified2_${city}_${String(i+1).padStart(3,'0')}`,cityId:city,citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_2=all;
  global.PatriaCityVerified2={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
