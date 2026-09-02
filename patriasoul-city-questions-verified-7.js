// PatriaSoul — provjerena gradska pitanja, nastavak 7.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    glina:[
      ['Koje se godine Glina prvi put spominje u povijesnim izvorima?',['1284.','1209.','1242.','1334.']],
      ['Po čemu je Glina dobila ime?',['Po istoimenoj rijeci','Po plemićkoj obitelji','Po utvrdi','Po starom sajmištu']],
      ['Koji je kasniji hrvatski ban službovao u Glini od 1841. do početka 1848.?',['Josip Jelačić','Ivan Mažuranić','Josip Šokčević','Nikola Zrinski']],
      ['Koji je grad u Domovinskom ratu bio povezan s predajom 21. korpusa 1995. godine?',['Glina','Petrinja','Sisak','Novska']]
    ],
    hrvatska_kostajnica:[
      ['Na kojoj rijeci leži Hrvatska Kostajnica?',['Uni','Kupi','Savi','Glini']],
      ['Koja je plemićka obitelj od 1528. do 1566. bila vlasnik Kostajnice?',['Zrinski','Frankapani','Erdődy','Keglevići']],
      ['Kako je Hrvatska Kostajnica povijesno prozvana zbog otpora Osmanlijama?',['Branik domovine','Vrata Hrvatske','Čuvar Une','Tvrđava slobode']],
      ['Po čemu je područje Hrvatske Kostajnice dobilo ime prema lokalnoj tradiciji?',['Po kestenima','Po kamenju','Po rijeci','Po staroj crkvi']]
    ],
    novska:[
      ['Koje se godine u popisu župa spominje najstariji naziv povezan s Novskom, Bjelavina?',['1334.','1209.','1532.','1691.']],
      ['Koja je plemićka obitelj držala novljansko područje prije osmanskih osvajanja?',['Svetački','Zrinski','Frankopan','Erdődy']],
      ['Kako se zvala utvrda koju su Svetački podigli 1532. godine na području Novske?',['Novi odnosno Novigrad (Ujvár)','Kostajnica','Kraljeva Velika','Bijela Stijena']],
      ['Do koje je godine novljansko područje ostalo pod osmanskom vlašću prema povijesti grada?',['1691.','1595.','1683.','1718.']]
    ],
    petrinja:[
      ['Koje je godine započela gradnja Nove Petrinje na današnjem mjestu?',['1592.','1531.','1594.','1753.']],
      ['Tko je gradio novu tvrđavu Petrinju 1592. godine?',['Hasan-paša Predojević','Toma Erdődy','Nikola Zrinski','Ivan Drašković']],
      ['Koje godine Petrinja postaje vojna općina?',['1765.','1753.','1689.','1881.']],
      ['Koja je vojno-redarstvena operacija 1995. bila ključna za oslobođenje Petrinje?',['Oluja','Bljesak','Maslenica','Medački džep']]
    ]
  };
  const urls={
    glina:'https://www.grad-glina.hr/povijest-gline/',
    hrvatska-kostajnica:'https://hrvatska-kostajnica.hr/wp-content/uploads/2019/08/Strateski-razvojni-program-Grada-Hrvatske-Kostajnice-2018.-2023.-1.pdf',
    novska:'https://old.novska.hr/hr/o-novskoj/povijest/',
    petrinja:'https://petrinja.hr/povijest-grada/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified7_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_7=all;
  global.PatriaCityVerified7={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
