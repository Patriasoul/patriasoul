// PatriaSoul — proširenje provjerenih gradskih pitanja.
// Ovo NIJE nova glavna banka: dodatna pitanja pripadaju samo sloju Brani svoj grad.
// Izvori: službene gradske stranice, gradske ustanove i Hrvatska enciklopedija.
(function(global){'use strict';
  const extra={
    karlovac:[
      ['Koje je godine osnovan Karlovac?',['1579.','1242.','1715.','1809.']],
      ['Tko je dao izgraditi Karlovac kao renesansnu tvrđavu?',['Nadbiskup Juraj Drašković po nalogu nadvojvode Karla II.','Kralj Tomislav','Ban Nikola Šubić Zrinski','Napoleon Bonaparte']],
      ['Koji je oblik imala jezgra karlovačke tvrđave?',['Zvijezdu','Krug','Trokut','Pravokutnik']],
      ['Koja je gradska četvrt Karlovca povijesno povezana s drvenim tornjem podignutim 1581.–1582.?',['Turanj','Dubovac','Banija','Švarča']]
    ],
    vukovar:[
      ['Po kojem je arheološkom lokalitetu u blizini Vukovara nazvana poznata prapovijesna kultura?',['Vučedol','Sopot','Starčevo','Lasinja']],
      ['Uz koju se veliku europsku rijeku nalazi Vukovar?',['Dunav','Sava','Drava','Kupa']],
      ['Kako se zvao rimski lokalitet na području današnjeg Sotina u vukovarskom kraju?',['Cornacum','Cibalae','Siscia','Mursa']],
      ['Kolika je građevinska visina Vukovarskog vodotornja?',['50,33 m','35,00 m','72,50 m','100,00 m']]
    ],
    sinj:[
      ['Koje se godine dogodila slavna obrana Sinja od osmanske vojske?',['1715.','1686.','1699.','1798.']],
      ['Na koji se blagdan vezuje završetak obrane Sinja 1715. godine?',['Veliku Gospu','Sv. Josipa','Tijelovo','Svetog Mihovila']],
      ['Kako se zove viteško konjičko natjecanje koje se održava u Sinju?',['Sinjska alka','Trka na prstenac','Moreška','Đurđevdan']],
      ['Koji je najstariji izravni pisani spomen Sinjske alke naveden u službenoj povijesti Alke?',['1784.','1715.','1798.','1815.']]
    ],
    omis:[
      ['Kako se zvalo antičko naselje na području današnjeg Omiša?',['Oneum','Muccurum','Cibalae','Tarsatica']],
      ['Koja je tvrđava poznata i kao Peovica?',['Mirabela','Fortica','Klis','Nečujam']],
      ['U kojem je stoljeću izgrađena tvrđava Mirabela?',['13. stoljeću','9. stoljeću','16. stoljeću','18. stoljeću']],
      ['Koja je obitelj osobito povezana s omiškom srednjovjekovnom vlašću u 12. i 13. stoljeću?',['Kačići','Zrinski','Frankopani','Erdődyji']]
    ],
    makarska:[
      ['Podno koje planine leži Makarska?',['Biokova','Velebita','Mosora','Učke']],
      ['Kako se zvalo antičko naselje Makarske u kasnoj antici?',['Muccurum','Oneum','Narona','Salona']],
      ['Koje je godine u Saloni Makarskoj dodijeljen status biskupije?',['533.','879.','1102.','1242.']],
      ['Koji je događaj 18. rujna 887. povezan s makarskom obalom?',['Poraz mletačke mornarice od Neretvana i pogibija dužda Petra Candiana','Bitka protiv Osmanlija','Dolazak Napoleona','Osnutak grada']]
    ],
    'slavonski-brod':[
      ['Uz koju se rijeku nalazi Slavonski Brod?',['Savu','Dravu','Dunav','Kupu']],
      ['Koje je godine donesena odluka o početku gradnje Tvrđave Brod?',['1715.','1579.','1756.','1809.']],
      ['Na čiji je poticaj izgrađena Tvrđava Brod kao dio obrambenog sustava prema Osmanskom Carstvu?',['Princa Eugena Savojskog','Bana Jelačića','Kralja Zvonimira','Marije Terezije']],
      ['Kakvog je tlocrta Tvrđava Brod?',['Zvjezdolikog','Kružnog','Trokutastog','Ovalnog']]
    ],
    vinkovci:[
      ['Kako se zvao rimski grad na području današnjih Vinkovaca?',['Cibalae','Tarsatica','Muccurum','Andautonia']],
      ['Koji je prapovijesni kulturni fenomen nazvan po lokalitetu nedaleko Vinkovaca?',['Sopotska kultura','Vučedolska kultura','Starčevačka kultura','Lasinjska kultura']],
      ['Koji je rimski car povezan s dobivanjem statusa municipija za Cibalae?',['Hadrijan','Dioklecijan','Trajan','Konstantin']],
      ['Kako se zove kultura ranog brončanog doba nazvana prema Vinkovcima?',['Vinkovačka kultura','Cibalska kultura','Panonska kultura','Cernička kultura']]
    ],
    bjelovar:[
      ['Koje je godine službeno osnovan Bjelovar?',['1756.','1579.','1715.','1804.']],
      ['Koja je vladarica odlučila osnovati Bjelovar?',['Marija Terezija','Marija Antoaneta','Katarina Velika','Elizabeta Austrijska']],
      ['Kako se Bjelovar prema planiranoj funkciji trebao zvati?',['Novi Varaždin','Novi Zagreb','Nova Slavonija','Novi Karlovac']],
      ['Koja je crkva s pijarističkim samostanom bila među prvim nevojnim objektima Bjelovara?',['Sv. Terezije Avilske','Sv. Marka','Sv. Jakova','Sv. Petra']]
    ],
    koprivnica:[
      ['Koje je godine Koprivnica postala slobodni i kraljevski grad?',['1356.','1272.','1526.','1715.']],
      ['Koji kralj je poveljom 4. studenoga 1356. potvrdio povlastice Koprivnice?',['Ludovik I. Anžuvinac','Bela IV.','Matija Korvin','Karlo VI.']],
      ['Kako se naziva poznata renesansna fortifikacija Koprivnice?',['Zvijezda','Mirabela','Tvrđa Brod','Fortica']],
      ['U koji je sustav utvrda Koprivnica ušla od sredine 16. stoljeća?',['Slavonsku vojnu krajinu','Mletački obrambeni sustav','Vojnu krajinu Senj','Dubrovačku Republiku']]
    ],
    cakovec:[
      ['Po kome je Čakovec dobio ime?',['Po grofu Dimitriju Csakyju (Čakiju)','Po kralju Karlu I. Robertu','Po Nikoli Zrinskom','Po banu Jelačiću']],
      ['Koje se godine Čakovec prvi put izrijekom spominje kao utvrđeni grad?',['1333.','1227.','1356.','1579.']],
      ['Koja je plemićka obitelj posebno obilježila povijest Čakovca u 16. i 17. stoljeću?',['Zrinski','Šubići','Frankopani','Kačići']],
      ['Kako se zove najvrjednije nepokretno kulturno dobro Međimurja u središtu Čakovca?',['Stari grad Čakovec','Tvrđava sv. Mihovila','Kamerlengo','Mirabela']]
    ],
    sisak:[
      ['Kako se zvao rimski grad na području današnjeg Siska?',['Siscia','Cibalae','Salona','Tarsatica']],
      ['Koji je rimski car povezan s konačnim osvajanjem Segestike 35. godine pr. Kr.?',['Oktavijan','Dioklecijan','Trajan','Hadrijan']],
      ['Koji je sisački biskup poznat kao ranokršćanski mučenik i zaštitnik grada?',['Kvirin','Duje','Eufrazije','Donat']],
      ['Koje je godine Sisak dobio povelju slobodnog trgovišta od Zagrebačkog kaptola?',['1838.','1756.','1242.','1918.']]
    ],
    pozega:[
      ['Kako su Rimljani nazivali plodnu dolinu u kojoj se nalazi Požega?',['Vallis aurea','Campus Martius','Ager Romanus','Valle Adriatica']],
      ['Koje se godine u dokumentima spominje Castrum de Posege?',['1227.','1210.','1356.','1537.']],
      ['Tko je 1688. predvodio oslobođenje Požege od Osmanlija?',['fra Luka Ibrišimović Sokol','Nikola Šubić Zrinski','Petar Zrinski','Matija Gubec']],
      ['Koje je godine Požega dobila povelju slobodnog kraljevskog grada od Marije Terezije?',['1765.','1688.','1745.','1847.']]
    ],
    virovitica:[
      ['Koje je godine Virovitica dobila srednjovjekovnu povelju sloboda?',['1234.','1242.','1356.','1579.']],
      ['Tko je izdao povelju Virovitici 1234. godine?',['Slavonski herceg Koloman','Bela IV.','Ludovik I.','Matija Korvin']],
      ['Koji je kralj 1242. u Virovitici izdao Zlatnu bulu kojom je Zagreb dobio status slobodnog i kraljevskog grada?',['Bela IV.','Andrija II.','Karlo Robert','Ladislav IV.']],
      ['Kako se danas zove potok po kojem je prema službenoj povijesti najvjerojatnije nastao naziv Virovitica?',['Ođenica','Verevča','Ilova','Bednja']]
    ],
    krapina:[
      ['Koje se godine Krapina prvi put spominje u pisanom povijesnom izvoru?',['1193.','1225.','1347.','1469.']],
      ['Na kojem je nalazištu Dragutin Gorjanović Kramberger otkrio ostatke krapinskog pračovjeka?',['Hušnjakovo brdo','Trakošćan','Medvedgrad','Lobor']],
      ['Koje je godine Ludovik I. Anžuvinac proglasio Krapinu slobodnim kraljevskim trgovištem?',['1347.','1193.','1225.','1418.']],
      ['Koji je hrvatsko-ugarski kralj boravio u Krapini 2. lipnja 1225.?',['Bela IV.','Ludovik I.','Matija Korvin','Sigismund']]
    ],
    gospic:[
      ['Koje se japodsko pleme povezuje s pretpoviješću prostora Gospića?',['Japodi','Liburni','Histri','Dalmati']],
      ['Koje se naselje spominje u ispravi iz 1263. na području današnjeg Gospića?',['Kaseg','Cibalae','Muccurum','Andautonia']],
      ['Uz koju rijeku leži prostor na kojem se razvijalo naselje Kaseg povezano s počecima današnjeg Gospića?',['Liku','Gacku','Kupu','Koranu']],
      ['Koji se starohrvatski arheološki nalaz spominje među dokazima srednjovjekovne hrvatske prisutnosti u okolici Gospića?',['Ulomci pletera','Brončana kruna','Rimski novac iz Pule','Glagoljski misal']]
    ],
    solin:[
      ['Kako se zvao antički grad na području današnjeg Solina?',['Salona','Cibalae','Oneum','Siscia']],
      ['Koje je godine Salona prvi put spomenuta u povijesnom izvoru?',['119. pr. Kr.','35. pr. Kr.','305.','614.']],
      ['Koji je rimski car prema službenoj povijesti Solina rođen u Saloni ili njezinoj okolici?',['Dioklecijan','Trajan','Hadrijan','Konstantin']],
      ['Oko koje su godine Avari i Slaveni razorili Salonu?',['614.','476.','568.','879.']]
    ]
  };
  const urls={
    karlovac:'https://www.enciklopedija.hr/clanak/turanj-karlovac',
    vukovar:'https://www.vukovar.hr/grad-vukovar-2',
    sinj:'https://www.sinj.hr/povijest-grada/',
    omis:'https://omis.hr/o-gradu/povijest/',
    makarska:'https://makarska.hr/povijest-grada',
    'slavonski-brod':'https://www.slavonski-brod.hr/sbinfo-2/kultura-i-obrazovanje/226-povijest-grada',
    vinkovci:'https://grad-vinkovci.hr/povijest-grada',
    bjelovar:'https://visitbjelovar.hr/sto-mogu-vidjeti/bjelovar-opcenito/povijest-grada/',
    koprivnica:'https://koprivnica.hr/koprivnica/povijest-grada/',
    cakovec:'https://www.cakovec.hr/o-gradu-cakovcu/',
    sisak:'https://sisak.hr/o-gradu/',
    pozega:'https://pozega.hr/o-pozegi/povijest-pozege',
    virovitica:'https://www.virovitica.hr/povijest-grada-virovitice/',
    krapina:'https://krapina.hr/povijest-grada/',
    gospic:'https://gospic.hr/povijest/',
    solin:'https://www.solin.hr/povijest/salona/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified_${city}_${String(i+1).padStart(3,'0')}`,cityId:city,citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA=all;
  global.PatriaCityVerified={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
