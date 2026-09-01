// PatriaSoul – Zagreb: kanonski gradski sadržaj
//
// Zagreb je glavni grad Republike Hrvatske i zasebna jedinica lokalne i
// područne (regionalne) samouprave. Ovaj modul služi kao jedno mjesto istine
// za gradski profil i povezuje povijest, baštinu, znamenitosti, memorijalne
// teme, kulturu i korisne gradske izvore.
//
// Uredničko pravilo: brojčane, povijesne i aktualne podatke prije javne objave
// provjeravati prema službenim izvorima Grada Zagreba, relevantnim državnim
// institucijama, registrima kulturne baštine i Hrvatskoj enciklopediji.

const PATRIA_ZAGREB = {
  id: "zagreb",
  name: "Zagreb",
  county: "Grad Zagreb",
  slug: "zagreb",
  country: "Hrvatska",
  type: "glavni-grad",

  title: "Zagreb — srce Hrvatske",
  subtitle: "Glavni grad, čuvar baštine i mjesto susreta hrvatske povijesti i suvremenog života.",
  lead: "Zagreb je političko, gospodarsko, kulturno, znanstveno i administrativno središte Hrvatske. Grad se razvijao između Medvednice i Save, spajajući povijesnu jezgru Gornjega i Donjega grada s modernim gradskim četvrtima.",

  identity: {
    motto: "Grad milijun srca",
    river: "Sava",
    mountain: "Medvednica",
    region: "središnja Hrvatska",
    character: [
      "glavni grad Hrvatske",
      "središte hrvatskih državnih institucija",
      "kulturno i znanstveno središte",
      "grad povijesne jezgre i moderne metropole",
      "važno mjesto hrvatske baštine"
    ]
  },

  geography: {
    northBoundary: "Medvednica",
    southAxis: "Sava",
    landscape: "spoj obronaka Medvednice i savske ravnice",
    note: "Položaj između Medvednice i Save snažno je oblikovao razvoj grada, prometne pravce, naselja i prepoznatljiv zagrebački identitet."
  },

  historicalPeriods: [
    {
      id: "gradec-kaptol",
      title: "Gradec i Kaptol",
      text: "Povijesna jezgra Zagreba razvijala se oko dviju srednjovjekovnih cjelina, Gradeca i Kaptola, čiji su tragovi i danas temelj identiteta Gornjega grada.",
      sourceIds: ["grad-zagreb", "enciklopedija"]
    },
    {
      id: "zagrebacka-biskupija",
      title: "Kaptol i crkvena baština",
      text: "Kaptol je stoljećima bio važno crkveno središte, a Zagrebačka katedrala jedan je od najprepoznatljivijih simbola grada.",
      sourceIds: ["enciklopedija", "zagrebacka-nadbiskupija"]
    },
    {
      id: "19-stoljece",
      title: "Zagreb 19. stoljeća",
      text: "Razvoj Donjega grada, prometne povezanosti, kulture i institucija snažno je obilježio Zagreb 19. stoljeća i stvorio velik dio današnjeg urbanog identiteta.",
      sourceIds: ["enciklopedija", "grad-zagreb"]
    },
    {
      id: "moderna-metropola",
      title: "Moderna metropola",
      text: "Zagreb se tijekom 20. i 21. stoljeća širio prema jugu i istoku te izrastao u najveće urbano i administrativno središte Hrvatske.",
      sourceIds: ["grad-zagreb", "dzs", "enciklopedija"]
    }
  ],

  landmarks: [
    {
      id: "katedrala",
      name: "Zagrebačka katedrala",
      category: "sakralna-bastina",
      description: "Jedan od najvažnijih simbola Zagreba i jedno od središta njegove sakralne i kulturne baštine.",
      tags: ["Kaptol", "katedrala", "baština"],
      sourceIds: ["zagrebacka-nadbiskupija", "enciklopedija", "min-kultura"],
      verified: false
    },
    {
      id: "trg-bana-jelacica",
      name: "Trg bana Josipa Jelačića",
      category: "gradski-trg",
      description: "Središnji zagrebački trg i jedno od najpoznatijih mjesta okupljanja građana i posjetitelja.",
      tags: ["centar", "trg", "javni-prostor"],
      sourceIds: ["grad-zagreb", "enciklopedija"],
      verified: false
    },
    {
      id: "gornji-grad",
      name: "Gornji grad",
      category: "povijesna-cjelina",
      description: "Povijesna jezgra Zagreba s nizom važnih ulica, trgova, palača, crkava i institucija.",
      tags: ["Gradec", "povijest", "stara-jezgra"],
      sourceIds: ["grad-zagreb", "min-kultura", "enciklopedija"],
      verified: false
    },
    {
      id: "kamenita-vrata",
      name: "Kamenita vrata",
      category: "povijesna-bastina",
      description: "Jedan od najprepoznatljivijih ostataka srednjovjekovnog Zagreba i važno mjesto gradske vjerske tradicije.",
      tags: ["Gradec", "Marija", "baština"],
      sourceIds: ["grad-zagreb", "enciklopedija"],
      verified: false
    },
    {
      id: "crkva-sv-marka",
      name: "Crkva sv. Marka",
      category: "sakralna-bastina",
      description: "Povijesna crkva na Markovu trgu, prepoznatljiva po krovu s grbovima Zagreba i Hrvatske.",
      tags: ["Markov trg", "Gradec", "grbovi"],
      sourceIds: ["enciklopedija", "min-kultura"],
      verified: false
    },
    {
      id: "lotrscak",
      name: "Kula Lotrščak",
      category: "povijesna-bastina",
      description: "Sačuvana obrambena kula Gornjega grada i jedan od prepoznatljivih simbola Zagreba.",
      tags: ["Gradec", "kula", "povijest"],
      sourceIds: ["grad-zagreb", "enciklopedija"],
      verified: false
    },
    {
      id: "mimara",
      name: "Muzej Mimara",
      category: "kultura",
      description: "Jedan od poznatih zagrebačkih muzeja i dio kulturne ponude grada.",
      tags: ["muzej", "umjetnost", "kultura"],
      sourceIds: ["enciklopedija", "grad-zagreb"],
      verified: false
    },
    {
      id: "museo-zagreb-19-20",
      name: "Muzej grada Zagreba",
      category: "gradska-povijest",
      description: "Muzejska ustanova posvećena povijesti i razvoju Zagreba.",
      tags: ["muzej", "povijest", "Zagreb"],
      sourceIds: ["muzej-grada-zagreba", "grad-zagreb"],
      verified: false
    },
    {
      id: "maksesmir",
      name: "Park Maksimir",
      category: "park",
      description: "Veliki povijesni perivoj i jedna od važnih zelenih cjelina Zagreba.",
      tags: ["park", "zelenilo", "rekreacija"],
      sourceIds: ["grad-zagreb", "enciklopedija"],
      verified: false
    },
    {
      id: "medvednica-sljeme",
      name: "Medvednica i Sljeme",
      category: "prirodna-bastina",
      description: "Planinsko područje sjeverno od grada koje snažno obilježava zagrebački krajolik, rekreaciju i identitet.",
      tags: ["Medvednica", "Sljeme", "priroda"],
      sourceIds: ["grad-zagreb", "pp-medvednica", "enciklopedija"],
      verified: false
    },
    {
      id: "miregoj",
      name: "Mirogoj",
      category: "memorijalna-bastina",
      description: "Jedno od najpoznatijih zagrebačkih groblja i vrijedan prostor arhitektonske, umjetničke i memorijalne baštine.",
      tags: ["groblje", "memorijal", "arkade", "baština"],
      sourceIds: ["grad-zagreb", "enciklopedija", "min-kultura"],
      verified: false
    },
    {
      id: "zrinjevac",
      name: "Zrinjevac",
      category: "park-i-trg",
      description: "Jedan od najpoznatijih parkova Donjega grada i dio zagrebačke Zelene potkove.",
      tags: ["Zelena potkova", "park", "Donji grad"],
      sourceIds: ["grad-zagreb", "enciklopedija"],
      verified: false
    }
  ],

  districts: [
    "Donji Grad",
    "Gornji Grad - Medveščak",
    "Trnje",
    "Maksimir",
    "Črnomerec",
    "Trešnjevka - sjever",
    "Trešnjevka - jug",
    "Novi Zagreb - istok",
    "Novi Zagreb - zapad",
    "Peščenica - Žitnjak",
    "Podsljeme",
    "Sesvete",
    "Stenjevec",
    "Gornja Dubrava",
    "Donja Dubrava",
    "Brezovica"
  ],

  culture: [
    "kazališta",
    "muzeji i galerije",
    "knjižnice",
    "glazba i koncerti",
    "filmska kultura",
    "festivali i gradske manifestacije",
    "zagrebačka arhitektura",
    "tradicijska i moderna kulturna baština"
  ],

  faith: {
    title: "Zagreb – grad sakralne baštine",
    highlights: [
      "Zagrebačka katedrala",
      "Kamenita vrata",
      "crkva sv. Marka",
      "brojne povijesne crkve i kapelice"
    ],
    note: "Sakralna baština Zagreba dio je višestoljetne povijesti grada i treba se prikazivati s poštovanjem prema vjerskom i kulturnom značenju prostora."
  },

  domovinskiRat: {
    title: "Zagreb u Domovinskom ratu",
    text: "Zagreb je tijekom Domovinskog rata bio političko, vojno, humanitarno i logističko središte Republike Hrvatske. Grad je primao prognanike i izbjeglice te je sudjelovao u obrani i organizaciji države.",
    remembrance: "Sadržaj o poginulim i nestalim braniteljima, civilnim žrtvama i ratnim događajima treba temeljiti na službenim i provjerljivim izvorima.",
    sourceIds: ["morh", "mup", "hda", "grad-zagreb"],
    verified: false
  },

  earthquake: {
    title: "Potres u Zagrebu 2020.",
    text: "Zagreb je 22. ožujka 2020. pogodio snažan potres koji je prouzročio veliku materijalnu štetu, osobito u povijesnoj jezgri i na starijim građevinama. Obnova grada postala je važan dio suvremenog zagrebačkog života.",
    date: "2020-03-22",
    sourceIds: ["grad-zagreb", "civilna-zastita", "enciklopedija"],
    verified: false
  },

  cityServices: [
    {
      id: "grad-zagreb",
      title: "Grad Zagreb",
      description: "Službeni portal Grada Zagreba.",
      url: "https://zagreb.hr/",
      sourceType: "official"
    },
    {
      id: "online-servisi",
      title: "Online servisi Grada Zagreba",
      description: "Interaktivne karte, otvoreni podaci, Geoportal, Moj ZET i drugi gradski servisi.",
      url: "https://www.zagreb.hr/online-servisi-za-gradjane/106892",
      sourceType: "official"
    },
    {
      id: "infozagreb",
      title: "Visit Zagreb",
      description: "Turističke i informativne informacije o Zagrebu.",
      url: "https://www.infozagreb.hr/",
      sourceType: "official-tourism"
    }
  ],

  sourceIds: [
    "grad-zagreb",
    "infozagreb",
    "enciklopedija",
    "min-kultura",
    "dzs",
    "hda",
    "morh",
    "mup",
    "zagrebacka-nadbiskupija",
    "muzej-grada-zagreba",
    "pp-medvednica",
    "civilna-zastita"
  ],

  editorial: {
    verified: false,
    status: "needs-editorial-verification",
    lastReviewed: null,
    reviewRequiredBeforePublication: true,
    note: "Zagreb je postavljen kao kanonski gradski modul. Brojčane podatke, datume, nazive institucija, pojedinačne povijesne tvrdnje i aktualne informacije treba prije javne objave provjeriti prema primarnim izvorima."
  }
};

function getZagreb() {
  return PATRIA_ZAGREB;
}

function getZagrebLandmarks(category) {
  if (!category) return [...PATRIA_ZAGREB.landmarks];
  const value = String(category).trim().toLocaleLowerCase("hr-HR");
  return PATRIA_ZAGREB.landmarks.filter(item => item.category.toLocaleLowerCase("hr-HR") === value);
}

function getZagrebDistricts() {
  return [...PATRIA_ZAGREB.districts];
}

function searchZagreb(term) {
  const value = String(term || "").trim().toLocaleLowerCase("hr-HR");
  if (!value) return [];

  const records = [
    ...PATRIA_ZAGREB.historicalPeriods.map(item => ({ type: "history", ...item })),
    ...PATRIA_ZAGREB.landmarks.map(item => ({ type: "landmark", ...item })),
    ...PATRIA_ZAGREB.districts.map(name => ({ type: "district", name })),
    ...PATRIA_ZAGREB.culture.map(name => ({ type: "culture", name }))
  ];

  return records.filter(item => JSON.stringify(item).toLocaleLowerCase("hr-HR").includes(value));
}

function getZagrebCityServices() {
  return [...PATRIA_ZAGREB.cityServices];
}

function validateZagreb() {
  const errors = [];
  const required = ["id", "name", "county", "slug", "title", "subtitle", "lead"];

  required.forEach(key => {
    if (!PATRIA_ZAGREB[key]) errors.push(`Nedostaje obavezno polje: ${key}`);
  });

  if (!Array.isArray(PATRIA_ZAGREB.historicalPeriods) || !PATRIA_ZAGREB.historicalPeriods.length) {
    errors.push("Nedostaju povijesna razdoblja.");
  }

  if (!Array.isArray(PATRIA_ZAGREB.landmarks) || !PATRIA_ZAGREB.landmarks.length) {
    errors.push("Nedostaju znamenitosti.");
  }

  if (!Array.isArray(PATRIA_ZAGREB.districts) || !PATRIA_ZAGREB.districts.length) {
    errors.push("Nedostaju gradske četvrti.");
  }

  if (!Array.isArray(PATRIA_ZAGREB.sourceIds) || !PATRIA_ZAGREB.sourceIds.length) {
    errors.push("Nedostaju urednički izvori.");
  }

  return {
    valid: errors.length === 0,
    errors,
    historicalPeriods: PATRIA_ZAGREB.historicalPeriods.length,
    landmarks: PATRIA_ZAGREB.landmarks.length,
    districts: PATRIA_ZAGREB.districts.length,
    services: PATRIA_ZAGREB.cityServices.length
  };
}

export {
  PATRIA_ZAGREB,
  getZagreb,
  getZagrebLandmarks,
  getZagrebDistricts,
  searchZagreb,
  getZagrebCityServices,
  validateZagreb
};

export const zagreb = PATRIA_ZAGREB;

if (typeof window !== "undefined") {
  window.PATRIA_ZAGREB = PATRIA_ZAGREB;
  window.getZagreb = getZagreb;
  window.getZagrebLandmarks = getZagrebLandmarks;
  window.getZagrebDistricts = getZagrebDistricts;
  window.searchZagreb = searchZagreb;
  window.getZagrebCityServices = getZagrebCityServices;
  window.validateZagreb = validateZagreb;
}

export default PATRIA_ZAGREB;
