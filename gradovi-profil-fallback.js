/*
 * PatriaSoul — završna sigurnosna dopuna profila gradova
 *
 * Ne prepisuje postojeće uredničke profile. Ako grad nema zaseban
 * urednički zapis, generira konzistentan osnovni profil iz kanonskog
 * registra gradova. Time nijedan od 127 gradova više ne ostaje bez
 * sadržaja u zajedničkom predlošku.
 *
 * Pravilo: ne izmišljati osobe, događaje, postrojbe ni spomenike.
 * Detaljni zapisi se kasnije mogu dodavati u zasebne profile i automatski
 * će imati prednost nad ovom dopunom.
 */
(function () {
  const cities = window.PATRIA_CITY_DATA || [];
  const editorialObjects = [
    window.PATRIA_CITY_EDITORIAL,
    window.PATRIA_CITY_EDITORIAL_2,
    window.PATRIA_CITY_EDITORIAL_3,
    window.PATRIA_CITY_EDITORIAL_4,
    window.PATRIA_CITY_EDITORIAL_5,
    window.PATRIA_CITY_EDITORIAL_6,
    window.PATRIA_CITY_EDITORIAL_7,
    window.PATRIA_CITY_EDITORIAL_8,
    window.PATRIA_CITY_EDITORIAL_9,
    window.PATRIA_CITY_EDITORIAL_10,
    window.PATRIA_CITY_EDITORIAL_11
  ].filter(Boolean);

  window.PATRIA_CITY_EDITORIAL_FALLBACK = {};

  cities.forEach(function (city) {
    const existing = editorialObjects.some(function (registry) {
      return registry && registry[city.name];
    });
    if (existing) return;

    window.PATRIA_CITY_EDITORIAL_FALLBACK[city.name] = {
      intro: city.name + ' je grad u ' + city.county + ' i dio hrvatske lokalne, kulturne i društvene baštine.',
      geography: city.name + ' pripada prostoru ' + city.county + '. Njegov položaj, naselja, krajolik i prometne veze dio su šireg identiteta hrvatskog prostora.',
      history: 'Povijest ' + city.name + ' treba promatrati kroz razvoj lokalne zajednice, upravni položaj, gospodarstvo, kulturu i događaje koji su oblikovali ' + city.name + ' i njegovu okolicu. Detaljniji kronološki zapis dodavat će se iz provjerenih lokalnih i državnih izvora.',
      heritage: ['Povijesna i urbana baština ' + city.name, 'Lokalna kulturna baština i tradicija', 'Prirodna i krajobrazna baština okolice'],
      people: [],
      defence: 'Stanovnici ' + city.name + ' i šireg područja sudjelovali su u novijoj hrvatskoj povijesti. Detalji o Domovinskom ratu, braniteljima i postrojbama navode se zasebno tek kada su potvrđeni pouzdanim izvorima.',
      faith: 'Vjerska i tradicijska baština ' + city.name + ' obrađivat će se kroz provjerene podatke o župama, crkvama, svetištima, blagdanima i lokalnim običajima.',
      sources: ['Ministarstvo pravosuđa, uprave i digitalne transformacije RH — Popis gradova i općina', 'Lokalni i institucionalni izvori — za detaljnu nadogradnju']
    };
  });
})();
