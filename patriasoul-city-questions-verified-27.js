// PatriaSoul — provjerena gradska pitanja, nastavak 27.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'stari-grad':[
      ['Kako su grčki doseljenici s otoka Parosa nazvali grad koji je osnovan na mjestu današnjeg Staroga Grada?',['Faros','Issa','Pharos','Iader']],
      ['Koje je godine, prema službenim gradskim dokumentima, osnovan antički Faros?',['384. pr. Kr.','397. pr. Kr.','300. pr. Kr.','229. pr. Kr.']],
      ['Koji je renesansni ljetnikovac Petra Hektorovića jedna od najpoznatijih znamenitosti Staroga Grada?',['Tvrdalj','Kaštil','Ljetnikovac Biankini','Kula Petra Krešimira']],
      ['Koje je godine povijesna jezgra Staroga Grada i kulturni krajolik Starogradskog polja upisan na UNESCO-ovu listu svjetske baštine?',['2008.','1997.','2010.','1985.']]
    ],
    'supetar':[
      ['Koje se godine ime Supetar prvi put spominje u pisanim izvorima?',['1423.','1244.','1604.','1997.']],
      ['Na ostacima čega se temelji povijest Supetra iz rimskog i ranokršćanskog razdoblja?',['Ville rustice i ranokršćanskog mozaika','Rimskog amfiteatra','Dioklecijanove palače','Srednjovjekovne tvrđave']],
      ['Koje je godine Supetar dobio status grada?',['1997.','1991.','2001.','1985.']],
      ['Kome su posvećeni zaštitnici Supetra i gradska fjera koja se slavi 29. lipnja?',['Svetom Petru i svetom Pavlu','Svetom Jurju i svetom Roku','Svetom Ivanu i svetom Jakovu','Svetom Mihovilu i svetom Nikoli']]
    ],
    'vis':[
      ['Kako se zvao antički grad-država osnovan na Visu u IV. stoljeću pr. Kr.?',['Issa','Faros','Scardona','Cissa']],
      ['Koje se godine, prema službenoj povijesti Grada Visa, dogodila velika Viška bitka?',['1866.','1815.','1918.','1943.']],
      ['Protiv čije je mornarice 1866. vođena Viška bitka?',['Talijanske','Francuske','Mletačke','Britanske']],
      ['Koje je godine, prema službenoj gradskoj povijesti, napustio Vis okupator JNA?',['30. svibnja 1992.','8. listopada 1991.','5. kolovoza 1995.','15. siječnja 1992.']]
    ],
    'vrgorac':[
      ['Pod kojim se starijim oblikom imena Vrgorac navodi u gradskoj povijesti?',['Vrhgorac','Vrgor','Vrgorje','Vrhgrad']],
      ['U sastavu koje je srednjovjekovne župe Vrgorac prema službenoj gradskoj povijesti bio sjedište?',['Rastočke župe','Cetinske župe','Imotske župe','Neretvanske župe']],
      ['Kako se zove srednjovjekovna tvrđava koja dominira Vrgorcem?',['Gradina','Topana','Ružica grad','Cesargrad']],
      ['Od koje do koje godine je Vrgorac, prema službenoj gradskoj povijesti, bio pod turskom vlašću?',['1477.–1690.','1527.–1687.','1420.–1797.','1690.–1797.']]
    ]
  };
  const urls={
    'stari-grad':'https://stari-grad.hr/',
    'supetar':'https://supetar.hr/places/supetar/',
    'vis':'https://www.gradvis.hr/povijest-i-kulturna-bastina/',
    'vrgorac':'https://www.vrgorac.hr/povijest-i-kultura'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified27_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_27=all;
  global.PatriaCityVerified27={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
