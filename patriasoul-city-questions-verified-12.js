// PatriaSoul — provjerena gradska pitanja, nastavak 12.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'kraljevica':[
      ['Koje je godine osnovano brodogradilište u Kraljevici?',['1729.','1651.','1779.','1835.']],
      ['Koje su dvije velikaške obitelji posebno povezane s poviješću Kraljevice?',['Zrinski i Frankopani','Šubići i Trpimirovići','Erdődy i Draškovići','Keglevići i Jelačići']],
      ['Kako se zove poznati dvorac u Kraljevici povezan s Petrom Zrinskim i Anom Katarinom Zrinski?',['Nova Kraljevica','Novi Dvori','Stari grad Ozalj','Trsat']],
      ['Koji je car povezan s odlukom o gradnji brodogradilišta i luke Kraljevica 1729. godine?',['Karlo VI.','Josip II.','Franjo Josip I.','Leopold I.']]
    ],
    'krk':[
      ['Kako su rimski stanovnici Krka nazivali svoj grad u kasnoj antici?',['Splendidissima Civitas Kuryctarum','Aquae Iasae','Andautonia','Colonia Iulia Pola']],
      ['Koje je ilirsko pleme povezano s najstarijim počecima grada Krka?',['Liburni','Japodi','Histri','Dardanci']],
      ['Koje je godine osnovano Društvo za poljepšavanje grada Krka, važno za početke organiziranog turizma?',['1897.','1885.','1909.','1918.']],
      ['Koja je krčka galija sudjelovala u Bitki kod Lepanta 1571.?',['Cristo Ressussitato','Santa Maria','San Marco','Stella Adriatica']]
    ],
    'mali-losinj':[
      ['Koje je godine zabilježen prvi turist na Lošinju prema gradskim podacima?',['1885.','1878.','1892.','1905.']],
      ['Kako se zvao prvi hotel u Malom Lošinju, izgrađen 1887. godine?',['Vindobona','Miramar','Lišanj','Alhambra']],
      ['Koje je godine Mali i Veli Lošinj proglašeni klimatskim lječilištima?',['1892.','1885.','1897.','1905.']],
      ['Koliko je brodogradilišta Mali Lošinj imao u 19. stoljeću prema gradskim podacima?',['6','2','4','10']]
    ],
    'novi-vinodolski':[
      ['Koji je znameniti hrvatski pravni spomenik napisan u Novom 1288. godine?',['Vinodolski zakon','Poljički statut','Vrbnički statut','Krčki statut']],
      ['Na kojem je pismu napisan Vinodolski zakon?',['Glagoljicom','Latinicom','Ćirilicom','Grčkim pismom']],
      ['Koja je plemićka obitelj u 13. stoljeću stekla Vinodol i podigla Novi Grad?',['Knezovi Krčki, poslije Frankopani','Zrinski','Erdődy','Šubići']],
      ['Koje je godine u Novom Vinodolskom počeo razvoj turizma prema službenoj gradskoj povijesti?',['1878.','1845.','1886.','1894.']]
    ]
  };
  const urls={
    kraljevica:'https://www.visitkraljevica.hr/brodogradiliste-i-luka-kraljevica/',
    krk:'https://visitkrk.city/istrazi-grad-krk/povijest-i-kultura/setnja-kroz-spomenike-kulture/povijesni-put-grada-krka/',
    'mali-losinj':'https://mali-losinj.hr/grad-mali-losinj/o-otoku-losinju/',
    'novi-vinodolski':'https://novi-vinodolski.hr/povijest-grada-i-poceci-turizma/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified12_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_12=all;
  global.PatriaCityVerified12={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
