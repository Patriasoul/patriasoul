# PatriaSoul Portal 2.0

Ovaj direktorij je novi, izolirani portalni temelj.

## Pravilo

Novi engine se ne spaja naslijepo na stare stranice. Prvo se gradi i provjerava kao zaseban sloj, zatim se stranice migriraju, a tek nakon migracije uklanjaju se legacy moduli koji više nisu potrebni.

## Jezgra

- `portal-core.js` — globalni namespace i pomoćne funkcije
- `content-engine.js` — normalizacija i filtriranje sadržaja
- `feed-engine.js` — istaknuto, najnovije i povezano
- `quiz-promos.js` — dva univerzalna quiz CTA bloka

Planirani nastavak:

- `layout-engine.js`
- `related-engine.js`
- `search-engine.js`
- `source-engine.js`
- `navigation-engine.js`

## API pravilo

Engine mora biti:

- bez dupliciranja kanonskih registara
- bez automatskog mijenjanja postojećih stranica
- bez vanjskih API ključeva
- kompatibilan s običnim browser JavaScriptom
- siguran za učitavanje samo tamo gdje ga stranica koristi
