/* PatriaSoul — univerzalni sloj za svih 127 gradova
 * Kanonski teritorijalni registar ostaje gradovi.js.
 * Ovaj sloj ne izmišlja pojedinačne činjenice; daje urednički okvir
 * koji vrijedi za svaki grad dok se pojedinačni izvori ne dopune.
 */
(function(){
  const cities=window.PATRIA_CITY_DATA||[];
  const ctx=window.PATRIA_CITY_REGIONAL_CONTEXT||{};
  const out={};
  cities.forEach(city=>{
    const r=ctx[city.county];
    out[city.name]={
      region:r&&r.region?r.region:'Hrvatska',
      nature:r&&r.nature?r.nature:'Prirodni kontekst grada prikazuje se prema njegovoj službenoj županijskoj i regionalnoj pripadnosti; pojedinačne lokalne tvrdnje dodaju se tek nakon provjere izvora.',
      economy:r&&r.economy?r.economy:'Gospodarski pregled grada razvija se iz službenih i stručnih izvora. PatriaSoul ne prikazuje neprovjerene procjene ili statistike.',
      culture:r&&r.culture?r.culture:'Kulturni identitet grada promatramo kroz baštinu, lokalne običaje, govor, stvaralaštvo i život zajednice, uz provjeru izvora.'
    };
  });
  window.PATRIA_CITY_COMPLETE_CONTEXT=out;
})();