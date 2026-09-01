// PatriaSoul — Sinj i Cetinska krajina
// Centralni registar podataka za grad Sinj.

const SINJ_DATA = {
  id: "sinj",
  slug: "sinj",
  name: "Sinj",
  county: "Splitsko-dalmatinska županija",
  region: "Cetinska krajina / Dalmatinska zagora",
  river: "Cetina",
  patron: "Gospa Sinjska",
  townDay: "15. kolovoza",
  intro:
    "Sinj je povijesno središte Cetinske krajine, grad poznat po Sinjskoj alci, Gospi Sinjskoj, tvrđavi i bogatoj kulturnoj i vjerskoj baštini.",

  highlights: [
    {
      title: "Sinjska alka",
      text: "Viteško konjičko natjecanje koje se održava u spomen na obranu Sinja 1715. godine. Od 2010. nalazi se na UNESCO-ovu popisu nematerijalne kulturne baštine čovječanstva."
    },
    {
      title: "Obrana Sinja 1715.",
      text: "U kolovozu 1715. branitelji Sinja odbili su osmanski napad nakon višednevne opsade. Pobjeda 15. kolovoza postala je temelj jedne od najpoznatijih sinjskih tradicija."
    },
    {
      title: "Gospa Sinjska",
      text: "Gospa Sinjska, odnosno Čudotvorna Gospa Sinjska, stoljećima je središnji vjerski simbol Sinja i Cetinske krajine te zaštitnica grada."
    },
    {
      title: "Stari grad i Kamičak",
      text: "Sinjska tvrđava i Kamičak među najprepoznatljivijim su povijesnim obilježjima grada i podsjetnik na njegovu stratešku važnost."
    },
    {
      title: "Alkarski dvori",
      text: "Alkarski dvori čuvaju tradiciju Sinjske alke, a Muzej Sinjske alke predstavlja njezinu povijest, opremu, odore i običaje."
    }
  ],

  timeline: [
    {
      year: "1686",
      title: "Oslobođenje od osmanske vlasti",
      text: "Osmanlije su protjerane iz Sinja 1686. godine."
    },
    {
      year: "1715",
      title: "Obrana Sinja",
      text: "Od početka kolovoza 1715. Sinj je bio pod opsadom velike osmanske vojske. Branitelji su odbili napad, a pobjeda 15. kolovoza postala je temelj sinjske povijesne memorije."
    },
    {
      year: "1784",
      title: "Najstariji izravni pisani spomen Alke",
      text: "Najstariji izravni pisani spomen Sinjske alke datira iz 1784. godine."
    },
    {
      year: "1833",
      title: "Statut Alke",
      text: "Pravila Sinjske alke kodificirana su statutom iz 1833. godine."
    },
    {
      year: "2007",
      title: "Kulturno dobro Republike Hrvatske",
      text: "Sinjska alka upisana je u Registar kulturnih dobara Republike Hrvatske."
    },
    {
      year: "2010",
      title: "UNESCO",
      text: "Sinjska alka uvrštena je na UNESCO-ovu Reprezentativnu listu nematerijalne kulturne baštine čovječanstva."
    },
    {
      year: "2015",
      title: "Muzej Sinjske alke",
      text: "Za 300. obljetnicu Alke otvoren je Muzej Sinjske alke u obnovljenim Alkarskim dvorima."
    }
  ],

  keywords: [
    "Sinj",
    "Cetinska krajina",
    "Cetina",
    "Sinjska alka",
    "Alka",
    "alkari",
    "Viteško alkarsko društvo",
    "Gospa Sinjska",
    "Čudotvorna Gospa Sinjska",
    "Velika Gospa",
    "Kamičak",
    "Stari grad",
    "Alkarski dvori",
    "Muzej Sinjske alke",
    "1715",
    "UNESCO",
    "Dalmatinska zagora"
  ],

  links: {
    city: "pages/gradovi/grad.html?grad=sinj",
    alka: "https://alka.hr/",
    cityOfficial: "https://www.sinj.hr/"
  }
};

// Globalna dostupnost za postojeće PatriaSoul stranice i skripte.
if (typeof window !== "undefined") {
  window.SINJ_DATA = SINJ_DATA;
  window.PATRIA_SINJ = SINJ_DATA;
}

// Podrška za eventualno korištenje kroz module.
if (typeof module !== "undefined" && module.exports) {
  module.exports = SINJ_DATA;
}

export const sinj = SINJ_DATA;
export { SINJ_DATA };
