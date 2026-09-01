// PatriaSoul – kanonski registar uredničkih izvora (Faza 2)
//
// Pravilo: sadržaj se provjerava prema vjerodostojnim izvorima, a u aplikaciju se
// upisuje vlastita formulacija. Ne kopirati zaštićene tekstove iz izvora.
//
// Polja:
// - id: stabilni identifikator izvora
// - title: naziv izvora
// - publisher: ustanova / izdavač
// - url: početna ili kanonska poveznica
// - type: službeni, otvoreni podaci, referentni, međunarodni ili crkveni izvor
// - authority: urednička razina povjerenja
// - use: područja u kojima se izvor može koristiti
// - notes: kratka urednička napomena
//
// Ovaj registar je namijenjen gradovima, povijesti, kulturi, vjeri, geografiji,
// statistici i kviz-bazi PatriaSoula.
window.PATRIA_SOURCES = {
  "mpudt-jls": {
    title: "Popis županija, gradova i općina",
    publisher: "Ministarstvo pravosuđa, uprave i digitalne transformacije RH",
    url: "https://mpudt.gov.hr/o-ministarstvu/ustrojstvo/uprava-za-politicki-sustav-i-opcu-upravu/lokalna-i-podrucna-regionalna-samouprava/popis-zupanija-gradova-i-opcina/22319",
    type: "official",
    authority: "primary",
    use: ["teritorijalni ustroj", "gradovi", "općine", "županije", "administrativni podaci"],
    notes: "Primarni državni izvor za službeni popis jedinica lokalne i područne samouprave."
  },
  "data-gov-jls": {
    title: "Popis županija, gradova i općina",
    publisher: "Portal otvorenih podataka Republike Hrvatske",
    url: "https://data.gov.hr/ckan/hr/dataset/popis-zupanija-gradova-i-opcina",
    type: "official-open-data",
    authority: "primary",
    use: ["teritorijalni ustroj", "otvoreni podaci", "gradovi", "općine", "županije"],
    notes: "Koristiti za strojno čitljive i otvorene podatke gdje su dostupni."
  },
  "dzs": {
    title: "Državni zavod za statistiku Republike Hrvatske",
    publisher: "Državni zavod za statistiku",
    url: "https://dzs.hr/",
    type: "official",
    authority: "primary",
    use: ["stanovništvo", "popisi stanovništva", "demografija", "gospodarstvo", "statistika"],
    notes: "Primarni statistički izvor za brojčane podatke o Hrvatskoj i naseljima."
  },
  "dgu": {
    title: "Državna geodetska uprava",
    publisher: "Državna geodetska uprava RH",
    url: "https://dgu.gov.hr/",
    type: "official",
    authority: "primary",
    use: ["geografija", "katastar", "prostorni podaci", "granice", "karte"],
    notes: "Primarni izvor za službene geodetske i prostorne podatke."
  },
  "geoportal": {
    title: "Geoportal Republike Hrvatske",
    publisher: "Državna geodetska uprava RH",
    url: "https://geoportal.dgu.hr/",
    type: "official-geospatial",
    authority: "primary",
    use: ["karte", "lokacije", "prostorni podaci", "geografija"],
    notes: "Koristan za provjeru položaja, prostornih odnosa i službenih kartografskih podataka."
  },
  "hgi": {
    title: "Hrvatski geološki institut",
    publisher: "Hrvatski geološki institut",
    url: "https://www.hgi-cgs.hr/",
    type: "scientific-reference",
    authority: "secondary-high",
    use: ["geologija", "prirodna baština", "geoznanost", "geografija"],
    notes: "Znanstveni izvor za geološke i prirodoznanstvene teme."
  },
  "enciklopedija": {
    title: "Hrvatska enciklopedija",
    publisher: "Leksikografski zavod Miroslav Krleža",
    url: "https://www.enciklopedija.hr/",
    type: "reference",
    authority: "secondary-high",
    use: ["povijest", "osobe", "mjesta", "gradovi", "kultura", "geografija", "znanost"],
    notes: "Jedan od glavnih referentnih izvora za uredničku provjeru činjenica."
  },
  "leksikografski-zavod": {
    title: "Leksikografski zavod Miroslav Krleža",
    publisher: "Leksikografski zavod Miroslav Krleža",
    url: "https://www.lzmk.hr/",
    type: "reference",
    authority: "secondary-high",
    use: ["enciklopedistika", "povijest", "kultura", "biografije", "znanost"],
    notes: "Institucionalna referenca za enciklopedijske sadržaje."
  },
  "hazu": {
    title: "Hrvatska akademija znanosti i umjetnosti",
    publisher: "HAZU",
    url: "https://www.hazu.hr/",
    type: "scientific-reference",
    authority: "secondary-high",
    use: ["znanost", "kultura", "umjetnost", "povijest", "povijesni izvori"],
    notes: "Koristiti osobito za znanstvene i kulturno-povijesne teme."
  },
  "hazu-znanstveni-radovi": {
    title: "HAZU – publikacije i znanstveni radovi",
    publisher: "Hrvatska akademija znanosti i umjetnosti",
    url: "https://www.hazu.hr/",
    type: "scientific-reference",
    authority: "primary-secondary",
    use: ["povijest", "znanost", "književnost", "umjetnost", "baština"],
    notes: "Za specifične teme prednost imaju pojedinačne publikacije i izvorni radovi."
  },
  "hda": {
    title: "Hrvatski državni arhiv",
    publisher: "Hrvatski državni arhiv",
    url: "https://www.arhiv.hr/",
    type: "official-archive",
    authority: "primary",
    use: ["povijest", "arhivska građa", "dokumenti", "biografije", "državna povijest"],
    notes: "Primarni izvor za arhivsku i dokumentarnu povijesnu građu."
  },
  "hip": {
    title: "Hrvatski institut za povijest",
    publisher: "Hrvatski institut za povijest",
    url: "https://www.isp.hr/",
    type: "scientific-reference",
    authority: "secondary-high",
    use: ["hrvatska povijest", "suvremena povijest", "srednji vijek", "novi vijek", "znanstveni radovi"],
    notes: "Koristiti za povijesne teme uz provjeru izvornog rada kada je riječ o spornim pitanjima."
  },
  "nsk": {
    title: "Nacionalna i sveučilišna knjižnica u Zagrebu",
    publisher: "NSK u Zagrebu",
    url: "https://nsk.hr/",
    type: "official-cultural",
    authority: "primary-secondary",
    use: ["književnost", "baština", "bibliografija", "stara knjiga", "kultura"],
    notes: "Referentna ustanova za hrvatsku pisanu i knjižničnu baštinu."
  },
  "matica-hrvatska": {
    title: "Matica hrvatska",
    publisher: "Matica hrvatska",
    url: "https://www.matica.hr/",
    type: "cultural-reference",
    authority: "secondary",
    use: ["kultura", "književnost", "jezik", "povijest", "baština"],
    notes: "Dodatni kulturno-povijesni izvor; za ključne činjenice prednost imaju primarni izvori."
  },
  "min-kultura": {
    title: "Ministarstvo kulture i medija Republike Hrvatske",
    publisher: "Ministarstvo kulture i medija RH",
    url: "https://min-kulture.gov.hr/",
    type: "official",
    authority: "primary",
    use: ["kulturna baština", "zaštićena dobra", "muzeji", "arhivi", "nematerijalna baština", "kultura"],
    notes: "Primarni državni izvor za kulturnu politiku i baštinu."
  },
  "registar-kulturnih-dobara": {
    title: "Registar kulturnih dobara Republike Hrvatske",
    publisher: "Ministarstvo kulture i medija RH",
    url: "https://registar.kulturnadobra.hr/",
    type: "official-register",
    authority: "primary",
    use: ["kulturna dobra", "zaštićeni spomenici", "nepokretna baština", "pokretna baština", "nematerijalna baština"],
    notes: "Primarni registar za provjeru statusa zaštićenih kulturnih dobara."
  },
  "muzejski-dokumentacijski-centar": {
    title: "Muzejski dokumentacijski centar",
    publisher: "Muzejski dokumentacijski centar",
    url: "https://mdc.hr/",
    type: "cultural-reference",
    authority: "secondary-high",
    use: ["muzeji", "muzejska baština", "kultura", "izložbe", "zbirke"],
    notes: "Referentni izvor za hrvatske muzeje i muzejsku djelatnost."
  },
  "unesco": {
    title: "UNESCO World Heritage Centre",
    publisher: "UNESCO",
    url: "https://whc.unesco.org/",
    type: "international-reference",
    authority: "primary-international",
    use: ["svjetska baština", "kulturna baština", "prirodna baština", "UNESCO lokaliteti"],
    notes: "Primarni međunarodni izvor za UNESCO lokalitete svjetske baštine."
  },
  "unesco-intangible": {
    title: "UNESCO Intangible Cultural Heritage",
    publisher: "UNESCO",
    url: "https://ich.unesco.org/",
    type: "international-reference",
    authority: "primary-international",
    use: ["nematerijalna baština", "tradicija", "običaji", "glazba", "ples", "obrti"],
    notes: "Koristiti za provjeru elemenata nematerijalne kulturne baštine."
  },
  "min-znanost": {
    title: "Ministarstvo znanosti, obrazovanja i mladih Republike Hrvatske",
    publisher: "MZOM RH",
    url: "https://mzom.gov.hr/",
    type: "official",
    authority: "primary",
    use: ["obrazovanje", "znanost", "škole", "visoko obrazovanje"],
    notes: "Službeni izvor za sustav obrazovanja i znanosti."
  },
  "sabor": {
    title: "Hrvatski sabor",
    publisher: "Hrvatski sabor",
    url: "https://www.sabor.hr/",
    type: "official",
    authority: "primary",
    use: ["državno uređenje", "zakonodavstvo", "politička povijest", "parlamentarna povijest"],
    notes: "Primarni izvor za rad Hrvatskog sabora i parlamentarne dokumente."
  },
  "narodne-novine": {
    title: "Narodne novine",
    publisher: "Narodne novine d.d.",
    url: "https://narodne-novine.nn.hr/",
    type: "official-legal",
    authority: "primary",
    use: ["zakoni", "propisi", "službeni akti", "državno uređenje"],
    notes: "Primarni pravni izvor; koristiti za važeće propise i službene objave."
  },
  "vlada": {
    title: "Vlada Republike Hrvatske",
    publisher: "Vlada Republike Hrvatske",
    url: "https://vlada.gov.hr/",
    type: "official",
    authority: "primary",
    use: ["državna uprava", "javne politike", "službene odluke", "suvremena povijest"],
    notes: "Službeni izvor za odluke, programe i objave Vlade RH."
  },
  "mup": {
    title: "Ministarstvo unutarnjih poslova Republike Hrvatske",
    publisher: "MUP RH",
    url: "https://mup.gov.hr/",
    type: "official",
    authority: "primary",
    use: ["sigurnost", "civilna zaštita", "Domovinski rat", "državne službe"],
    notes: "Koristiti za službene podatke iz nadležnosti MUP-a."
  },
  "morh": {
    title: "Ministarstvo obrane Republike Hrvatske",
    publisher: "MORH RH",
    url: "https://www.morh.hr/",
    type: "official",
    authority: "primary",
    use: ["obrana", "Oružane snage RH", "Domovinski rat", "vojna povijest"],
    notes: "Službeni izvor za obranu i službene podatke MORH-a."
  },
  "memorijalni-centar-domovinskog-rata": {
    title: "Memorijalni centar Domovinskog rata Vukovar",
    publisher: "Memorijalni centar Domovinskog rata Vukovar",
    url: "https://mcdrvu.hr/",
    type: "official-memorial",
    authority: "primary-secondary",
    use: ["Domovinski rat", "Vukovar", "memorijalna baština", "povijest"],
    notes: "Specijalizirani izvor za memorijalnu i edukativnu građu vezanu uz Domovinski rat."
  },
  "vatican": {
    title: "The Holy See",
    publisher: "Sveta Stolica",
    url: "https://www.vatican.va/",
    type: "official-church",
    authority: "primary",
    use: ["katolička baština", "papinski dokumenti", "crkvena povijest", "doktrina"],
    notes: "Primarni crkveni izvor za dokumente Svete Stolice i papinske tekstove."
  },
  "hbk": {
    title: "Hrvatska biskupska konferencija",
    publisher: "HBK",
    url: "https://hbk.hr/",
    type: "official-church",
    authority: "primary",
    use: ["crkveni život", "katolička baština", "hrvatske biskupije", "pastoral"],
    notes: "Primarni izvor za službene objave Hrvatske biskupske konferencije."
  },
  "ika": {
    title: "Informativna katolička agencija",
    publisher: "IKA",
    url: "https://ika.hkm.hr/",
    type: "church-news",
    authority: "secondary-high",
    use: ["crkvene vijesti", "katolički život", "biskupije", "događaji"],
    notes: "Za aktualne crkvene vijesti koristiti kao sekundarni izvor i provjeriti službenu objavu kada je moguće."
  },
  "hkm": {
    title: "Hrvatska katolička mreža",
    publisher: "Hrvatska katolička mreža",
    url: "https://hkm.hr/",
    type: "church-media",
    authority: "secondary",
    use: ["katolički život", "vjera", "društvo", "crkvene vijesti"],
    notes: "Dopunski medijski izvor za katoličke teme."
  },
  "htz": {
    title: "Hrvatska turistička zajednica",
    publisher: "Hrvatska turistička zajednica",
    url: "https://croatia.hr/",
    type: "official-tourism",
    authority: "primary-secondary",
    use: ["turizam", "destinacije", "gradovi", "običaji", "gastronomija", "baština"],
    notes: "Koristan za turističke informacije, ali povijesne činjenice treba potvrditi referentnim izvorima."
  },
  "parkovi-hr": {
    title: "Nacionalni parkovi i parkovi prirode Republike Hrvatske",
    publisher: "Ministarstvo zaštite okoliša i zelene tranzicije RH",
    url: "https://mingo.gov.hr/",
    type: "official-environment",
    authority: "primary",
    use: ["prirodna baština", "nacionalni parkovi", "parkovi prirode", "zaštita okoliša"],
    notes: "Za pojedini park prednost ima službena stranica ustanove koja njime upravlja."
  },
  "mingo": {
    title: "Ministarstvo zaštite okoliša i zelene tranzicije Republike Hrvatske",
    publisher: "MZOZT RH",
    url: "https://mingo.gov.hr/",
    type: "official-environment",
    authority: "primary",
    use: ["zaštita okoliša", "priroda", "biološka raznolikost", "zaštićena područja"],
    notes: "Primarni državni izvor za okoliš i zaštitu prirode."
  },
  "natura-2000": {
    title: "Natura 2000 u Hrvatskoj",
    publisher: "Ministarstvo zaštite okoliša i zelene tranzicije RH",
    url: "https://natura2000.gov.hr/",
    type: "official-environment",
    authority: "primary",
    use: ["Natura 2000", "zaštićena područja", "priroda", "staništa", "vrste"],
    notes: "Specijalizirani izvor za europsku ekološku mrežu na području Hrvatske."
  },
  "eurostat": {
    title: "Eurostat",
    publisher: "Europska komisija",
    url: "https://ec.europa.eu/eurostat/",
    type: "international-statistics",
    authority: "primary-international",
    use: ["statistika", "demografija", "gospodarstvo", "EU", "usporedni podaci"],
    notes: "Dopunski međunarodni statistički izvor za usporedbe Hrvatske s državama EU."
  },
  "eu": {
    title: "European Union",
    publisher: "Europska unija",
    url: "https://european-union.europa.eu/",
    type: "international-official",
    authority: "primary-international",
    use: ["Europska unija", "europske institucije", "EU povijest", "članstvo Hrvatske"],
    notes: "Službeni izvor za institucije i osnovne podatke o Europskoj uniji."
  },
  "europeana": {
    title: "Europeana",
    publisher: "Europeana Foundation",
    url: "https://www.europeana.eu/",
    type: "digital-cultural-heritage",
    authority: "secondary-high",
    use: ["digitalna baština", "povijesne fotografije", "umjetnost", "dokumenti", "kultura"],
    notes: "Dopunski digitalni izvor; za pojedini predmet provjeriti instituciju koja ga je dostavila."
  },
  "hnb": {
    title: "Hrvatska narodna banka",
    publisher: "Hrvatska narodna banka",
    url: "https://www.hnb.hr/",
    type: "official-financial",
    authority: "primary",
    use: ["novac", "financije", "gospodarstvo", "euro", "povijest valute"],
    notes: "Primarni izvor za monetarne i financijske podatke iz nadležnosti HNB-a."
  },
  "hina": {
    title: "Hrvatska izvještajna novinska agencija",
    publisher: "HINA",
    url: "https://www.hina.hr/",
    type: "news-agency",
    authority: "secondary",
    use: ["aktualne vijesti", "suvremeni događaji", "izjave", "kronologija"],
    notes: "Sekundarni izvor; za trajne činjenice prednost imaju službeni i primarni izvori."
  },
  "croatian-olympic": {
    title: "Hrvatski olimpijski odbor",
    publisher: "Hrvatski olimpijski odbor",
    url: "https://www.hoo.hr/",
    type: "official-sport",
    authority: "primary-secondary",
    use: ["sport", "olimpijske igre", "hrvatski sportaši", "sportska povijest"],
    notes: "Službeni izvor za hrvatski olimpijski sport i relevantne rezultate."
  }
};

// Pomoćne vrijednosti za druge dijelove aplikacije.
window.PATRIA_SOURCE_TYPES = {
  official: "Službeni izvor",
  "official-open-data": "Službeni otvoreni podaci",
  "official-geospatial": "Službeni prostorni podaci",
  "official-register": "Službeni registar",
  "official-archive": "Službeni arhiv",
  "official-cultural": "Službeni kulturni izvor",
  "official-legal": "Službeni pravni izvor",
  "official-memorial": "Službeni memorijalni izvor",
  "official-environment": "Službeni okolišni izvor",
  "official-financial": "Službeni financijski izvor",
  "official-sport": "Službeni sportski izvor",
  reference: "Referentni izvor",
  "scientific-reference": "Znanstveni izvor",
  "cultural-reference": "Kulturni referentni izvor",
  "international-reference": "Međunarodni referentni izvor",
  "international-statistics": "Međunarodni statistički izvor",
  "international-official": "Međunarodni službeni izvor",
  "digital-cultural-heritage": "Digitalna kulturna baština",
  "church-news": "Crkveni informativni izvor",
  "church-media": "Crkveni medijski izvor",
  "official-church": "Službeni crkveni izvor",
  "official-tourism": "Službeni turistički izvor",
  "news-agency": "Novinska agencija"
};

window.PATRIA_SOURCE_AUTHORITY = {
  primary: "Primarni izvor",
  "primary-international": "Primarni međunarodni izvor",
  "primary-secondary": "Primarni / referentni izvor",
  "secondary-high": "Visoko pouzdani sekundarni izvor",
  secondary: "Sekundarni izvor"
};

// Dohvat izvora po ID-u.
window.getPatriaSource = function(id) {
  return window.PATRIA_SOURCES[id] || null;
};

// Dohvat svih izvora koji pokrivaju određeno područje.
window.getPatriaSourcesByUse = function(term) {
  const needle = String(term || "").toLowerCase();
  return Object.entries(window.PATRIA_SOURCES)
    .filter(([, source]) => source.use.some(item => item.toLowerCase().includes(needle)))
    .map(([id, source]) => ({ id, ...source }));
};

// Jednostavna provjera integriteta registra.
window.validatePatriaSources = function() {
  const required = ["title", "publisher", "url", "type", "authority", "use"];
  return Object.entries(window.PATRIA_SOURCES).every(([id, source]) =>
    id && required.every(key => source[key] !== undefined) &&
    Array.isArray(source.use) && source.use.length > 0
  );
};
