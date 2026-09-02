// PatriaSoul – Verified city questions layer 29
// Editorial, city-specific questions. No registry filler.
(function(global){
  const q=(id,city,question,answers,sourceUrl,category='gradovi')=>({id,cityId:city,citySource:'verified',category,question,answers,correctIndex:0,sourceUrl});
  const data=[];
  const add=(city,items)=>items.forEach((x,i)=>data.push(q(`verified29_${city}_${String(i+1).padStart(3,'0')}`,city,...x)));

  add('omis',[
    ['Koji se festival posvećen dalmatinskoj klapskoj pjesmi održava u Omišu?',['Festival dalmatinskih klapa Omiš','Splitsko ljeto','Dubrovačke ljetne igre','Šibenska šansona'],'https://fdk.hr/','glazba'],
    ['Koju glazbenu tradiciju Festival dalmatinskih klapa Omiš posebno čuva i promiče?',['Dalmatinsku klapsku pjesmu','Međimursku popevku','Istarsku ljestvicu','Bećarac'],'https://fdk.hr/','glazba'],
    ['U kojem gradu djeluje Festival dalmatinskih klapa Omiš?',['Omišu','Trogiru','Sinju','Makarskoj'],'https://fdk.hr/','glazba'],
    ['Koje je kulturno dobro povezano s djelovanjem Festivala dalmatinskih klapa Omiš i nalazi se na UNESCO-ovu popisu nematerijalne baštine?',['Klapsko pjevanje','Nijemo kolo','Ojkanje','Bećarac'],'https://fdk.hr/','glazba'],
    ['Koja ustanova u Omišu provodi osnovno glazbeno obrazovanje prema gradskom izvješću?',['Centar za kulturu Omiš','Muzej Cetinske krajine','Gradski muzej Omiš','Turistička zajednica Omiš'],'https://omis.hr/','glazba'],
    ['Koliko je klapa sudjelovalo u izbornim večerima Festivala dalmatinskih klapa Omiš 2024., prema gradskom izvješću?',['27','10','14','56'],'https://omis.hr/','glazba'],
    ['Koliko je ženskih klapa bilo među 27 klapa u izbornim večerima Festivala dalmatinskih klapa Omiš 2024.?',['14','13','10','27'],'https://omis.hr/','glazba'],
    ['Koliko je muških klapa bilo među 27 klapa u izbornim večerima Festivala dalmatinskih klapa Omiš 2024.?',['13','14','10','27'],'https://omis.hr/','glazba'],
    ['Koliko je mješovitih klapa nastupilo na mješovitoj večeri Festivala dalmatinskih klapa Omiš 2024.?',['10','13','14','27'],'https://omis.hr/','glazba'],
    ['Koji se događaj u sklopu 56. Festivala dalmatinskih klapa Omiš navodio za najmlađe izvođače?',['Smotra dječjih klapa','Večer opernih prvaka','Festival tamburaša','Dječji zbor Jadran'],'https://omis.hr/','glazba'],
    ['Koja je posebna večer bila dio programa 56. Festivala dalmatinskih klapa Omiš?',['Večer novih skladbi','Večer rocka','Večer jazza','Večer filmske glazbe'],'https://omis.hr/','glazba'],
    ['Koji je oblik klapskog sastava imao posebnu večer u programu 56. Festivala dalmatinskih klapa Omiš?',['Mješovite klape','Samo dječji zborovi','Samo instrumentalisti','Simfonijski orkestri'],'https://omis.hr/','glazba'],
    ['Što Festival dalmatinskih klapa Omiš organizira uz natjecanja i koncerte?',['Edukativne aktivnosti i radionice','Samo sportska natjecanja','Samo filmske projekcije','Samo gastronomske sajmove'],'https://fdk.hr/','glazba'],
    ['Koji je poznati hrvatski pjevač bio u središtu koncerta laureata Omiškog festivala u Lisinskom prema službenoj objavi Grada Omiša?',['Oliver Dragojević','Dino Dvornik','Arsen Dedić','Ivo Robić'],'https://omis.hr/','glazba'],
    ['Što Festival dalmatinskih klapa Omiš vodi i digitalizira radi očuvanja festivalske baštine?',['Arhive i kataloge','Sportske registre','Katastarske planove','Popise stanovništva'],'https://fdk.hr/','glazba'],
    ['U kojoj ulici je prema službenom izvješću navedeno sjedište Festivala dalmatinskih klapa Omiš?',['Ivana Katušića 5','Poljički trg 1','Fošal 2','Trg sv. Mihovila 3'],'https://omis.hr/','glazba'],
    ['Koja ustanova u Omišu je javna ustanova čiji je osnivač Grad Omiš?',['Centar za kulturu Omiš','Hrvatsko narodno kazalište Split','Muzej Cetinske krajine','Arheološki muzej Split'],'https://omis.hr/','kultura'],
    ['Koliko je učenika približno obuhvaćala osnovna glazbena naobrazba koju navodi gradski dokument za Centar za kulturu Omiš?',['Oko 200','Oko 20','Oko 2.000','Oko 50'],'https://omis.hr/','glazba'],
    ['Na koliko je instrumenata prema gradskom dokumentu organizirana osnovna glazbena naobrazba u Omišu?',['12','5','20','27'],'https://omis.hr/','glazba'],
    ['Koji se gradski glazbeni sastav uz koncerte i kulturne programe navodi u dokumentu Grada Omiša?',['Gradska glazba','Gradski jazz orkestar Zagreb','Dubrovački simfonijski orkestar','Varaždinski komorni orkestar'],'https://omis.hr/','glazba']
  ]);

  add('sinj',[
    ['Koja je poznata viteška igra zaštićena kao UNESCO nematerijalna baština povezana sa Sinjem?',['Sinjska alka','Moreška','Trka na prstenac','Nijemo kolo'],'https://ich.unesco.org/','običaji'],
    ['Koji se grad u nazivu tradicionalne viteške igre spominje uz alku?',['Sinj','Omiš','Trogir','Knin'],'https://ich.unesco.org/','običaji'],
    ['Koji UNESCO status ima Sinjska alka?',['Nematerijalna kulturna baština čovječanstva','Svjetska prirodna baština','Geopark UNESCO-a','Dokumentarna baština'],'https://ich.unesco.org/','običaji'],
    ['Koji je od navedenih elemenata izravno povezan sa Sinjem?',['Sinjska alka','Međimurska popevka','Rovinj Batana','Bećarac'],'https://ich.unesco.org/','običaji'],
    ['Koji je oblik baštine Sinjska alka prema UNESCO-u?',['Nematerijalna kulturna baština','Pokretna arheološka baština','Prirodna baština','Podvodna baština'],'https://ich.unesco.org/','običaji']
  ]);

  global.PatriaCityVerified29={all:()=>data,forCity:city=>data.filter(x=>x.cityId===String(city).toLowerCase().replace(/č/g,'c').replace(/ć/g,'c').replace(/ž/g,'z').replace(/š/g,'s').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''))};
})(window);
