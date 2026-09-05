/*
 * PatriaSoul — osnovni urednički profil za gradove bez zasebnog zapisa
 *
 * Ne prepisuje postojeće uredničke profile. Ako grad nema zaseban
 * urednički zapis, dobiva neutralan i završen osnovni profil iz kanonskog
 * registra. Detaljni, izvorima potkrijepljeni zapisi imaju prednost.
 *
 * Pravilo: ne izmišljati osobe, događaje, postrojbe ni spomenike.
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
      intro: city.name + ' je grad u ' + city.county + ' i dio hrvatske lokalne, kulturne i društvene baštine. Njegov identitet oblikuju ljudi, prostor, povijest, tradicija i život lokalne zajednice.',
      geography: city.name + ' pripada prostoru ' + city.county + '. Zemljopisni položaj, naselja, krajolik i prometne veze važan su dio razvoja grada i njegova odnosa s okolnim mjestima.',
      history: 'Povijest ' + city.name + ' dio je šire povijesti hrvatskog prostora. Razvoj grada povezan je s lokalnom upravom, stanovništvom, gospodarstvom, prometom, kulturom i događajima koji su tijekom stoljeća oblikovali zajednicu. Na PatriaSoulu se povijesni podaci vode odvojeno od kanonskog registra grada kako bi se mogli nadopunjavati provjerenim izvorima bez mijenjanja osnovnih identifikacijskih podataka.',
      heritage: ['Povijesna i urbana baština ' + city.name, 'Lokalna kulturna baština, običaji i tradicija', 'Prirodna i krajobrazna baština grada i okolice'],
      people: [],
      defence: 'Domovinski rat dio je suvremene hrvatske povijesti i lokalne memorije. Na profilu ' + city.name + ' ne navode se osobe, postrojbe ni pojedinačni događaji bez provjere izvora. Potvrđeni podaci mogu se povezati s centralnim registrima branitelja, postrojbi i operacija.',
      faith: 'Vjerski život ' + city.name + ' dio je lokalne hrvatske baštine. Sakralni objekti, župe, svetišta, blagdani i običaji obrađuju se kroz zasebne PatriaSoul sadržaje i povezuju s gradskim profilom kada je podatak potvrđen.',
      sources: ['Službeni državni i lokalni izvori', 'Institucionalni i kulturni izvori', 'PatriaSoul — centralni registri i urednički zapisi']
    };
  });
})();
