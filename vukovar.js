// PatriaSoul – Vukovar: memorijalni i povijesni temelj
//
// Ovaj modul je namjerno odvojen od zabavnih i natjecateljskih sadržaja.
// Vukovar se na PatriaSoulu prikazuje s posebnim pijetetom: kao mjesto sjećanja,
// istine, žrtve, hrabrosti i dostojanstva. Ne koristiti bodove, rangiranja,
// animacije pobjede ili druge gamifikacijske elemente za memorijalni sadržaj.
//
// Uredničko pravilo: činjenice se prije javne objave provjeravaju prema
// kanonskom registru izvora, osobito Memorijalnom centru Domovinskog rata Vukovar,
// MORH-u, Hrvatskom državnom arhivu i Hrvatskoj enciklopediji.

const PATRIA_VUKOVAR = {
  id: "vukovar",
  name: "Vukovar",
  county: "Vukovarsko-srijemska županija",
  slug: "vukovar",
  tone: "memorijalni",
  reverence: true,
  gamification: false,

  title: "Vukovar — grad koji pamti",
  subtitle: "Mjesto sjećanja na žrtvu, hrabrost i obranu Hrvatske.",
  lead: "Vukovar zauzima posebno mjesto u hrvatskom sjećanju. Ovaj sadržaj čuva uspomenu na poginule, nestale i sve stradale, na branitelje i civile te na snagu ljudi koji su branili svoj dom.",

  remembrance: {
    title: "S posebnim pijetetom",
    text: "O Vukovaru govorimo mirno, dostojanstveno i odgovorno. Svaka brojka, ime, događaj i tvrdnja treba imati provjerljiv izvor. Žrtve nisu statistika, a sjećanje nije natjecanje.",
    principles: [
      "dostojanstvo žrtava",
      "poštovanje prema obiteljima poginulih i nestalih",
      "poštovanje prema braniteljima i civilima",
      "provjerene povijesne činjenice",
      "bez senzacionalizma",
      "bez politiziranja memorijalnog prostora",
      "bez gamifikacije sadržaja sjećanja"
    ]
  },

  keyDates: [
    {
      id: "bitka-za-vukovar-pocetak",
      date: "1991-08-25",
      displayDate: "25. kolovoza 1991.",
      title: "Početak bitke za Vukovar",
      text: "Početak bitke za Vukovar, jedne od ključnih i najtežih bitaka Domovinskog rata."
    },
    {
      id: "vukovar-pad",
      date: "1991-11-18",
      displayDate: "18. studenoga 1991.",
      title: "Dan sjećanja na žrtve Domovinskog rata i Dan sjećanja na žrtvu Vukovara i Škabrnje",
      text: "18. studenoga obilježava se kao dan sjećanja na žrtve Domovinskog rata te posebno na žrtvu Vukovara i Škabrnje. Vukovar je toga dana 1991. prestao pružati organizirani otpor nakon višemjesečne bitke."
    },
    {
      id: "ovcara-1991",
      date: "1991-11-20",
      displayDate: "20. studenoga 1991.",
      title: "Ovčara",
      text: "Na Ovčari su 20. studenoga 1991. ubijeni i pokopani zarobljenici odvedeni iz vukovarske bolnice. Ovčara je jedno od najtežih mjesta zločina i sjećanja povezanih s Vukovarom."
    },
    {
      id: "mirna-reintegracija",
      date: "1998-01-15",
      displayDate: "15. siječnja 1998.",
      title: "Završetak mirne reintegracije",
      text: "Područje hrvatskog Podunavlja mirno je reintegrirano u ustavno-pravni poredak Republike Hrvatske 15. siječnja 1998."
    }
  ],

  places: [
    {
      id: "memorijalno-groblje",
      name: "Memorijalno groblje žrtava iz Domovinskog rata",
      category: "mjesto-sjecanja",
      description: "Jedno od središnjih mjesta sjećanja na žrtve Domovinskog rata u Vukovaru.",
      sourceIds: ["memorijalni-centar-domovinskog-rata", "enciklopedija"],
      verified: false
    },
    {
      id: "ovcara",
      name: "Memorijalni centar Ovčara",
      category: "mjesto-sjecanja",
      description: "Memorijalni prostor posvećen žrtvama zločina počinjenog na Ovčari 20. studenoga 1991.",
      sourceIds: ["memorijalni-centar-domovinskog-rata", "morh", "hda"],
      verified: false
    },
    {
      id: "vukovarska-bolnica",
      name: "Nacionalna memorijalna bolnica Vukovar",
      category: "mjesto-sjecanja",
      description: "Vukovarska bolnica ostala je jedno od najvažnijih mjesta sjećanja na stradanje grada i civila tijekom 1991. godine.",
      sourceIds: ["memorijalni-centar-domovinskog-rata", "enciklopedija"],
      verified: false
    },
    {
      id: "vukovarski-vodotoranj",
      name: "Vukovarski vodotoranj",
      category: "simbol-grada",
      description: "Vodotoranj je jedan od prepoznatljivih simbola Vukovara i trajni podsjetnik na razaranje grada tijekom 1991.",
      sourceIds: ["enciklopedija", "min-kultura"],
      verified: false
    },
    {
      id: "trpinjska-cesta",
      name: "Trpinjska cesta",
      category: "ratna-povijest",
      description: "Jedno od poznatih mjesta obrane Vukovara tijekom 1991. godine, povezano s borbama na prilazima gradu.",
      sourceIds: ["memorijalni-centar-domovinskog-rata", "morh"],
      verified: false
    },
    {
      id: "vucedol",
      name: "Vučedol",
      category: "kulturna-bastina",
      description: "Arheološko i kulturno područje uz Dunav, važno za razumijevanje duboke povijesti prostora Vukovara.",
      sourceIds: ["min-kultura", "registar-kulturnih-dobara", "enciklopedija"],
      verified: false
    }
  ],

  themes: [
    {
      id: "branitelji",
      title: "Branitelji Vukovara",
      text: "Sjećanje na branitelje koji su sudjelovali u obrani grada treba čuvati kroz provjerene izvore, dokumente, svjedočanstva i institucijsku memorijalnu građu.",
      sourceIds: ["memorijalni-centar-domovinskog-rata", "morh", "hda"]
    },
    {
      id: "civili",
      title: "Civili i stradanje grada",
      text: "Vukovar nije samo priča o bojištu. U središtu sjećanja moraju ostati civili, ranjenici, prognanici, obitelji poginulih i nestalih te svi koji su pretrpjeli ratna stradanja.",
      sourceIds: ["memorijalni-centar-domovinskog-rata", "hda", "enciklopedija"]
    },
    {
      id: "nestali",
      title: "Nestali",
      text: "Pitanje nestalih ostaje važan dio hrvatskog memorijalnog sjećanja. Podaci o imenima i sudbinama objavljuju se samo prema službenim i provjerenim evidencijama.",
      sourceIds: ["hda", "mup"]
    },
    {
      id: "mirna-reintegracija",
      title: "Mirna reintegracija",
      text: "Sjećanje na ratnu povijest Vukovara uključuje i proces mirne reintegracije hrvatskog Podunavlja, kojim je područje vraćeno u ustavno-pravni poredak Republike Hrvatske bez nastavka oružanog sukoba.",
      sourceIds: ["vlada", "hda", "enciklopedija"]
    }
  ],

  memorialMessage: {
    title: "Neka se ne zaboravi.",
    text: "Za one kojih više nema. Za one koji još čekaju svoje najmilije. Za branitelje. Za civile. Za obitelji. Za grad koji je podnio strašnu žrtvu.",
    closing: "Vukovar — grad heroj. Sjećanje ostaje."
  },

  sourceIds: [
    "memorijalni-centar-domovinskog-rata",
    "morh",
    "mup",
    "hda",
    "enciklopedija",
    "min-kultura",
    "registar-kulturnih-dobara"
  ],

  editorial: {
    verified: false,
    status: "needs-editorial-verification",
    lastReviewed: null,
    reviewRequiredBeforePublication: true,
    note: "Ovaj zapis je urednički temelj. Datume, nazive ustanova, pojedinačne podatke, imena žrtava i brojčane podatke prije javne objave treba provjeriti prema primarnim izvorima."
  }
};

function getVukovar() {
  return PATRIA_VUKOVAR;
}

function getVukovarDates() {
  return [...PATRIA_VUKOVAR.keyDates];
}

function getVukovarPlaces(category) {
  if (!category) return [...PATRIA_VUKOVAR.places];
  const value = String(category).trim().toLocaleLowerCase("hr-HR");
  return PATRIA_VUKOVAR.places.filter(item => item.category.toLocaleLowerCase("hr-HR") === value);
}

function searchVukovar(term) {
  const value = String(term || "").trim().toLocaleLowerCase("hr-HR");
  if (!value) return [];

  const records = [
    ...PATRIA_VUKOVAR.keyDates.map(item => ({ type: "date", ...item })),
    ...PATRIA_VUKOVAR.places.map(item => ({ type: "place", ...item })),
    ...PATRIA_VUKOVAR.themes.map(item => ({ type: "theme", ...item }))
  ];

  return records.filter(item => {
    const text = JSON.stringify(item).toLocaleLowerCase("hr-HR");
    return text.includes(value);
  });
}

function getVukovarMemorialMode() {
  return {
    enabled: true,
    reverence: true,
    gamification: false,
    animation: "minimal",
    tone: "dostojanstven",
    message: PATRIA_VUKOVAR.remembrance.text
  };
}

function validateVukovar() {
  const errors = [];
  const required = ["id", "name", "county", "title", "lead"];

  required.forEach(key => {
    if (!PATRIA_VUKOVAR[key]) errors.push(`Nedostaje obavezno polje: ${key}`);
  });

  if (!Array.isArray(PATRIA_VUKOVAR.keyDates) || !PATRIA_VUKOVAR.keyDates.length) {
    errors.push("Nedostaju ključni datumi.");
  }

  if (!Array.isArray(PATRIA_VUKOVAR.places) || !PATRIA_VUKOVAR.places.length) {
    errors.push("Nedostaju mjesta sjećanja.");
  }

  if (!Array.isArray(PATRIA_VUKOVAR.sourceIds) || !PATRIA_VUKOVAR.sourceIds.length) {
    errors.push("Nedostaju urednički izvori.");
  }

  return {
    valid: errors.length === 0,
    errors,
    dates: PATRIA_VUKOVAR.keyDates.length,
    places: PATRIA_VUKOVAR.places.length,
    themes: PATRIA_VUKOVAR.themes.length
  };
}

export {
  PATRIA_VUKOVAR,
  getVukovar,
  getVukovarDates,
  getVukovarPlaces,
  searchVukovar,
  getVukovarMemorialMode,
  validateVukovar
};

export const vukovar = PATRIA_VUKOVAR;

if (typeof window !== "undefined") {
  window.PATRIA_VUKOVAR = PATRIA_VUKOVAR;
  window.getVukovar = getVukovar;
  window.getVukovarDates = getVukovarDates;
  window.getVukovarPlaces = getVukovarPlaces;
  window.searchVukovar = searchVukovar;
  window.getVukovarMemorialMode = getVukovarMemorialMode;
  window.validateVukovar = validateVukovar;
}

export default PATRIA_VUKOVAR;
