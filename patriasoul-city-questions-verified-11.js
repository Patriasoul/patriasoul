// PatriaSoul — provjerena gradska pitanja, nastavak 11.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'cres':[
      ['Na kojem se otoku nalazi grad Cres?',['Cres','Krk','Rab','Lošinj']],
      ['Koje je naselje na području Grada Cresa poznato po povijesnoj jezgri i samostanu?',['Beli','Punat','Baška','Vrbnik']],
      ['Koji je zaljev posebno povezan s gradom Cresom i sjevernim dijelom otoka?',['Creski zaljev','Kvarnerski zaljev','Lošinjski zaljev','Riječki zaljev']],
      ['Koji je grad zajedno s Cresom povijesno činio važnu otočnu cjelinu prije upravnog razdvajanja?',['Lošinj','Krk','Rab','Pag']]
    ],
    'cabar':[
      ['S kojom je obitelji posebno povezan razvoj željezarstva u Čabru u 17. stoljeću?',['Zrinski','Frankopani','Erdődy','Drašković']],
      ['Koje je godine Petar Zrinski u Čabru izgradio topionicu željeza?',['1651.','1527.','1711.','1776.']],
      ['Uz koju je rijeku smješten grad Čabar?',['Čabranku','Kupu','Dobru','Mrežnicu']],
      ['Koje je naselje na području Grada Čabra poznato kao važno povijesno naselje i prometna poveznica prema Sloveniji?',['Prezid','Kraljevica','Bakarac','Klenovica']]
    ],
    'delnice':[
      ['U kojem se hrvatskom gorskom području nalazi Grad Delnice?',['Gorskom kotaru','Hrvatskom zagorju','Podravini','Baranji']],
      ['Koji je datum Dan grada Delnica prema podacima Primorsko-goranske županije?',['24. lipnja','6. lipnja','4. lipnja','15. kolovoza']],
      ['Koliko naselja obuhvaća Grad Delnice prema podacima Primorsko-goranske županije?',['55','15','23','42']],
      ['Koje se naselje na području Grada Delnica nalazi u blizini Nacionalnog parka Risnjak?',['Crni Lug','Gerovo','Prezid','Plešce']]
    ],
    'kastav':[
      ['Na kojoj je približnoj nadmorskoj visini smješten povijesni Kastav?',['377 m','177 m','577 m','777 m']],
      ['Koliko je obrambenih kula imao srednjovjekovni gradski bedem Kastva?',['Devet','Pet','Sedam','Dvanaest']],
      ['Koje je pleme, prema arheološkim nalazima koje navodi Grad Kastav, bilo prisutno na području današnjega grada već u 11. stoljeću pr. Kr.?',['Japodi','Liburni','Histri','Dardanci']],
      ['Koje je godine zapisan Zakon Grada Kastva?',['1400.','1242.','1465.','1527.']]
    ]
  };
  const urls={
    cres:'https://www.cres.hr/',
    cabar:'https://www.cabar.hr/',
    delnice:'https://delnice.hr/',
    kastav:'https://kastav.hr/o-kastvu/povijest-kastva/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified11_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_11=all;
  global.PatriaCityVerified11={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
