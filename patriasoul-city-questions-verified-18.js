// PatriaSoul — provjerena gradska pitanja, nastavak 18.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'belisce':[
      ['Koje godine započinje razvoj naselja Belišće osnivanjem industrijskog poduzeća?',['1884.','1779.','1905.','1927.']],
      ['Koja je obitelj povezana s osnivanjem industrije i naselja Belišće?',['Gutmann','Pejačević','Prandau','Erdődy']],
      ['Koja je zgrada poznata kao Palača Gutmann ili Palej?',['Upravna zgrada nekadašnjeg kombinata','Gradska vijećnica','Željeznička postaja','Crkva sv. Josipa']],
      ['Koje je godine Belišće postalo samostalna općina?',['1927.','1884.','1945.','1955.']]
    ],
    'donji-miholjac':[
      ['Koje se ime današnjeg Donjeg Miholjca pojavljuje na Ptolomejevoj karti?',['Mariniana','Iovallium','Aenona','Andautonia']],
      ['Koje godine listina sa Sabora u Albaregiji daje rano pisano svjedočanstvo o području Donjeg Miholjca?',['1057.','1229.','1332.','1721.']],
      ['Kojem je svecu bila posvećena crkva oko koje se razvilo naselje Sveti Mihael?',['Svetom Mihaelu','Svetom Martinu','Svetom Jurju','Svetom Nikoli']],
      ['Koje je godine Karlo VI darovao valpovačko vlastelinstvo Petru Antunu Hilleprandtu von Prandauu?',['1721.','1687.','1779.','1908.']]
    ],
    'nasice':[
      ['Koje se godine Našice prvi put spominju u službenoj ispravi?',['1229.','1253.','1334.','1503.']],
      ['Koja je plemićka obitelj držala našički posjed od kraja 18. stoljeća do 1945.?',['Pejačević','Gutmann','Zrinski','Frankopan']],
      ['Koje je godine izgrađen veliki dvorac Pejačević u Našicama?',['1811.–1812.','1703.–1704.','1881.–1882.','1907.–1908.']],
      ['Koja je poznata hrvatska skladateljica povezana s Našicama i obitelji Pejačević?',['Dora Pejačević','Ivana Brlić-Mažuranić','Dragojla Jarnević','Slava Raškaj']]
    ],
    'valpovo':[
      ['Koje se godine navodi kao najstariji poznati pisani dokument o Valpovu?',['1332.','1242.','1397.','1527.']],
      ['Kako se zvala rimska vojnička postaja na području današnjeg Valpova?',['Iovallium','Mariniana','Aenona','Cissa']],
      ['Koji je poznati kompleks u Valpovu sačuvao srednjovjekovnu kulu i dijelove nekadašnje tvrđave?',['Dvorac Normann-Prandau','Dvorac Pejačević','Palača Gutmann','Stari grad Ozalj']],
      ['Koja se zgrada iz 1809. smatra najstarijom kazališnom zgradom u kontinentalnoj Hrvatskoj?',['Prandauovo kazalište','Gradsko kazalište Valpovo','Hrvatski dom','Dvorana Normann']]
    ]
  };
  const urls={
    'belisce':'https://belisce.hr/iz-proslosti-belisca/',
    'donji-miholjac':'https://www.donjimiholjac.hr/povijest-grada',
    'nasice':'https://nasice.hr/o-nasicama/povijest-grada-nasica/',
    'valpovo':'https://valpovo.hr/o-valpovu/povijest-grada-valpova/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified18_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_18=all;
  global.PatriaCityVerified18={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
