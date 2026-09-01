// PatriaSoul – registar hrvatskih spomenika i memorijalne baštine
// Faza 2: strukturirani podaci za spomenike, memorijale i mjesta sjećanja.
// Podaci služe kao urednički temelj; prije javne objave pojedine lokacije
// treba provjeriti prema službenim izvorima i lokalnoj dokumentaciji.

const PATRIA_SPOMENICI = [
  {
    id: "spomenik-domovinski-rat-vukovar",
    name: "Spomenik hrvatskim braniteljima",
    city: "Vukovar",
    county: "Vukovarsko-srijemska",
    category: "domovinski-rat",
    period: "1990–1995",
    tags: ["Domovinski rat", "branitelji", "sjećanje"],
    description: "Memorijalni sadržaj posvećen hrvatskim braniteljima i žrtvi Vukovara.",
    verified: false,
    sourceIds: ["min-kultura", "enciklopedija"]
  },
  {
    id: "memorijalno-groblje-vukovar",
    name: "Memorijalno groblje žrtava iz Domovinskog rata",
    city: "Vukovar",
    county: "Vukovarsko-srijemska",
    category: "memorijal",
    period: "1991",
    tags: ["Vukovar", "Domovinski rat", "žrtve", "memorijal"],
    description: "Jedno od najvažnijih mjesta sjećanja na žrtve Domovinskog rata u Hrvatskoj.",
    verified: false,
    sourceIds: ["min-kultura", "enciklopedija"]
  },
  {
    id: "vodotoranj-vukovar",
    name: "Vukovarski vodotoranj",
    city: "Vukovar",
    county: "Vukovarsko-srijemska",
    category: "memorijalna-arhitektura",
    period: "20-stoljece",
    tags: ["Vukovar", "Domovinski rat", "simbol", "arhitektura"],
    description: "Prepoznatljiv simbol Vukovara i jedno od najpoznatijih mjesta sjećanja na ratna stradanja grada.",
    verified: false,
    sourceIds: ["min-kultura", "enciklopedija"]
  },
  {
    id: "spomenik-dragovoljcima-splitske-bojne",
    name: "Spomenik hrvatskim braniteljima",
    city: "Split",
    county: "Splitsko-dalmatinska",
    category: "domovinski-rat",
    period: "1990–1995",
    tags: ["branitelji", "Domovinski rat", "Split"],
    description: "Memorijalni zapis predviđen za evidenciju lokalne memorijalne baštine Splita.",
    verified: false,
    sourceIds: ["min-kultura"]
  },
  {
    id: "spomenik-tin-ujovic-split",
    name: "Spomenik Tinu Ujeviću",
    city: "Split",
    county: "Splitsko-dalmatinska",
    category: "knjizevnost",
    period: "20-stoljece",
    tags: ["Tin Ujević", "književnost", "kultura"],
    description: "Spomenička baština povezana s hrvatskim književnikom Tinom Ujevićem.",
    verified: false,
    sourceIds: ["enciklopedija", "min-kultura"]
  },
  {
    id: "spomenik-grgur-ninski-split",
    name: "Spomenik Grguru Ninskom",
    city: "Split",
    county: "Splitsko-dalmatinska",
    category: "povijest",
    period: "20-stoljece",
    tags: ["Grgur Ninski", "Split", "povijest", "Ivan Meštrović"],
    description: "Poznati spomenik Grguru Ninskom, djelo Ivana Meštrovića.",
    verified: false,
    sourceIds: ["enciklopedija", "min-kultura"]
  },
  {
    id: "spomenik-bana-jelacica-zagreb",
    name: "Spomenik banu Josipu Jelačiću",
    city: "Zagreb",
    county: "Grad Zagreb",
    category: "povijest",
    period: "19-stoljece",
    tags: ["Josip Jelačić", "Zagreb", "povijest", "trg"],
    description: "Povijesni konjanički spomenik banu Josipu Jelačiću na glavnom zagrebačkom trgu.",
    verified: false,
    sourceIds: ["enciklopedija", "min-kultura"]
  },
  {
    id: "spomenik-kralju-tomislavu-zagreb",
    name: "Spomenik kralju Tomislavu",
    city: "Zagreb",
    county: "Grad Zagreb",
    category: "povijest",
    period: "20-stoljece",
    tags: ["kralj Tomislav", "Zagreb", "hrvatska povijest"],
    description: "Monumentalni spomenik prvom hrvatskom kralju Tomislavu u Zagrebu.",
    verified: false,
    sourceIds: ["enciklopedija", "min-kultura"]
  },
  {
    id: "spomenik-ivanu-mestrovicu-zagreb",
    name: "Spomenička baština Ivana Meštrovića",
    city: "Zagreb",
    county: "Grad Zagreb",
    category: "umjetnost",
    period: "20-stoljece",
    tags: ["Ivan Meštrović", "skulptura", "umjetnost"],
    description: "Registarski zapis za javne skulpture i spomeničku baštinu povezanu s Ivanom Meštrovićem.",
    verified: false,
    sourceIds: ["hazu", "enciklopedija", "min-kultura"]
  },
  {
    id: "spomenik-petar-zrinski-fran-krsto-frankopan-zagreb",
    name: "Spomenik Petru Zrinskom i Franu Krsti Frankopanu",
    city: "Zagreb",
    county: "Grad Zagreb",
    category: "povijest",
    period: "17-stoljece",
    tags: ["Zrinski", "Frankopan", "povijest", "memorijal"],
    description: "Memorijalna baština posvećena Petru Zrinskom i Franu Krsti Frankopanu.",
    verified: false,
    sourceIds: ["enciklopedija", "hazu", "min-kultura"]
  },
  {
    id: "spomenik-franjo-tudman-zagreb",
    name: "Spomenik dr. Franji Tuđmanu",
    city: "Zagreb",
    county: "Grad Zagreb",
    category: "novija-povijest",
    period: "20-stoljece",
    tags: ["Franjo Tuđman", "Zagreb", "Domovinski rat", "državnost"],
    description: "Spomenički zapis posvećen prvom predsjedniku Republike Hrvatske dr. Franji Tuđmanu.",
    verified: false,
    sourceIds: ["enciklopedija", "min-kultura"]
  },
  {
    id: "spomenik-krizni-put-macelj",
    name: "Macelj – memorijalna baština",
    city: "Đurmanec",
    county: "Krapinsko-zagorska",
    category: "memorijal",
    period: "1945",
    tags: ["Macelj", "žrtve", "memorijal", "20. stoljeće"],
    description: "Registarski zapis za memorijalnu baštinu Macelja i mjesta stradanja nakon Drugoga svjetskog rata.",
    verified: false,
    sourceIds: ["hda", "enciklopedija"]
  }
];

function getSpomenik(id) {
  return PATRIA_SPOMENICI.find(item => item.id === id) || null;
}

function getSpomeniciByCity(city) {
  const value = String(city || "").trim().toLocaleLowerCase("hr-HR");
  if (!value) return [];
  return PATRIA_SPOMENICI.filter(item =>
    item.city.toLocaleLowerCase("hr-HR") === value
  );
}

function getSpomeniciByCategory(category) {
  const value = String(category || "").trim().toLocaleLowerCase("hr-HR");
  if (!value) return [];
  return PATRIA_SPOMENICI.filter(item =>
    item.category.toLocaleLowerCase("hr-HR") === value
  );
}

function searchSpomenici(term) {
  const value = String(term || "").trim().toLocaleLowerCase("hr-HR");
  if (!value) return [];
  return PATRIA_SPOMENICI.filter(item => {
    const haystack = [
      item.name,
      item.city,
      item.county,
      item.category,
      item.description,
      ...(item.tags || [])
    ].join(" ").toLocaleLowerCase("hr-HR");
    return haystack.includes(value);
  });
}

function getVerifiedSpomenici() {
  return PATRIA_SPOMENICI.filter(item => item.verified === true);
}

function validateSpomenici() {
  const required = ["id", "name", "city", "county", "category", "description"];
  const ids = new Set();
  const errors = [];

  PATRIA_SPOMENICI.forEach((item, index) => {
    required.forEach(key => {
      if (!item[key]) errors.push(`Zapis ${index + 1}: nedostaje ${key}`);
    });
    if (ids.has(item.id)) errors.push(`Dupli ID: ${item.id}`);
    ids.add(item.id);
    if (!Array.isArray(item.tags)) errors.push(`${item.id}: tags mora biti niz`);
    if (!Array.isArray(item.sourceIds)) errors.push(`${item.id}: sourceIds mora biti niz`);
  });

  return { valid: errors.length === 0, errors, count: PATRIA_SPOMENICI.length };
}

export {
  PATRIA_SPOMENICI,
  getSpomenik,
  getSpomeniciByCity,
  getSpomeniciByCategory,
  searchSpomenici,
  getVerifiedSpomenici,
  validateSpomenici
};

export const spomenici = PATRIA_SPOMENICI;

if (typeof window !== "undefined") {
  window.PATRIA_SPOMENICI = PATRIA_SPOMENICI;
  window.getSpomenik = getSpomenik;
  window.getSpomeniciByCity = getSpomeniciByCity;
  window.getSpomeniciByCategory = getSpomeniciByCategory;
  window.searchSpomenici = searchSpomenici;
}

export default PATRIA_SPOMENICI;
