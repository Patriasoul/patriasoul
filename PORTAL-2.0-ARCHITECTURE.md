# PatriaSoul Portal 2.0 — arhitektura

> Radni arhitektonski standard za novi jedinstveni portalni sustav PatriaSoula.
>
> **Vjera • Ljubav • Domovina** — **Upoznaj. Pamti. Čuvaj.**

## 1. Cilj

PatriaSoul više ne treba izgledati kao skup zasebnih HTML projekata. Sve glavne cjeline koriste isti portalni okvir, isti sustav navigacije, isti vizualni jezik, isti model sadržaja i iste reusable komponente.

Sadržaj se mijenja po sekciji i podsekciji; layout ostaje jedinstven.

## 2. Glavne sekcije

- 🇭🇷 Domovina
- 🛡️ Branitelji
- 📜 Povijest
- 🏛️ Baština
- ✝️ Vjera
- 📰 Vijesti
- 🎥 Mediji
- 🎮 Igra
- O nama
- Kontakt

**Branitelji je zasebna glavna sekcija.** Domovinski rat, Vukovar, postrojbe, brigade, HOS, svjedočanstva, odlikovanja i spomenici ne pripadaju pod Domovinu.

## 3. Univerzalni portalni predložak

Svaka hub, kategorijska i sadržajna stranica koristi isti slijed gdje je primjenjivo:

1. Header + logo
2. Glavna navigacija
3. Breadcrumb
4. Naslov sekcije + uvod
5. Istaknuti sadržaj / hero
6. Najnovije
7. Tematski blokovi
8. Povezani sadržaj
9. Hrvatski kviz promo
10. Brani svoj grad promo
11. Izvori / urednička napomena
12. Footer

Članci koriste isti okvir, s naglaskom na naslov, uvod, fotografiju, tekst, izvore i povezane zapise.

## 4. Content Engine

Sadržaj se opisuje metapodacima umjesto ručnim kopiranjem istog zapisa u više HTML datoteka.

Primjer:

```js
{
  id: "127-viroviticka-brigada",
  type: "article",
  section: "branitelji",
  subsection: "postrojbe",
  topics: ["brigade", "domovinski-rat"],
  cityIds: ["virovitica"],
  region: "slavonija-i-baranja",
  tags: ["Virovitica", "HV", "brigada"],
  featured: true,
  title: "127. virovitička brigada"
}
```

Jedan zapis može se pojaviti u više feedova bez dupliciranja sadržaja.

## 5. Feed Engine

Centralni feed sustav daje:

- Istaknuto
- Najnovije
- Najčitanije, kada statistika postoji
- Povezano
- Tematske feedove
- Feed po gradu
- Feed po regiji
- Feed po tagu

Prioritet povezivanja: isti entiteti, podsekcija, grad, regija, tagovi i teme.

## 6. Izvori

Sadržaj mora moći nositi:

- autora
- instituciju
- datum
- izvorni dokument
- URL
- oznaku provjere
- napomenu o razlikama među izvorima

Vanjski tekstovi se ne kopiraju. PatriaSoul piše vlastiti urednički tekst uz jasno navođenje izvora.

## 7. Fotografije

Sadržaj može imati:

- hero fotografiju
- galeriju
- autora/credit
- izvor
- licencu ili status dopuštenja

Vizualni sustav ne smije uvoditi nove placeholder/image-field sustave koji dupliciraju postojeći sustav.

## 8. Reusable komponente

Planirane komponente:

- `PatriaHeader`
- `PatriaNavigation`
- `PatriaBreadcrumbs`
- `PatriaHero`
- `PatriaFeatured`
- `PatriaFeed`
- `PatriaCard`
- `PatriaArticle`
- `PatriaRelated`
- `PatriaGallery`
- `PatriaSources`
- `PatriaQuizPromo`
- `PatriaAbout`
- `PatriaContact`
- `PatriaFooter`

Komponente se definiraju jednom i koriste na cijelom portalu.

## 9. Obavezne quiz promocije

Svaka glavna stranica i sadržajna stranica, gdje ima smisla u layoutu, završava s dva široka odvojena promotivna bloka.

### Hrvatski kviz

**Koliko dobro poznaješ Hrvatsku?**

Povijest, geografija, kultura, baština, Domovina i zanimljivosti Hrvatske.

CTA: **IGRAJ HRVATSKI KVIZ →**

### Brani svoj grad

**Poznaješ li svoj grad dovoljno dobro da ga obraniš?**

Upoznaj njegovu povijest, ljude, znamenitosti i događaje — a zatim testiraj svoje znanje.

CTA: **ODABERI GRAD I KRENI →**

## 10. Početna stranica

Homepage redoslijed:

- hero
- istaknuto
- najnovije
- Domovina
- Branitelji
- Povijest
- Vjera
- Baština
- Hrvatska danas
- Hrvatski kviz
- Brani svoj grad
- O nama
- Kontakt
- footer

### O nama

> PatriaSoul je mjesto gdje se upoznaju, pamte i čuvaju hrvatska povijest, vjera, kultura, baština i identitet.

CTA: **SAZNAJ VIŠE O PATRIASOULU →**

### Kontakt

> Imaš priču, fotografiju, dokument, svjedočanstvo ili prijedlog teme? Želiš podijeliti sjećanje na svoj grad, kraj, obitelj ili događaj? Javi nam se.

CTA: **KONTAKTIRAJ NAS →**

## 11. Mobile-first

Mobilni prikaz nije samo smanjeni desktop. Mora imati vlastitu hijerarhiju:

- kompaktan header
- hamburger navigaciju
- čitljive naslove
- velike dodirne površine
- vertikalne feedove
- optimizirane slike
- bez horizontalnog overflowa

## 12. Jedan izvor istine

Nadovezuje se na postojeće pravilo projekta: **jedan podatak → jedno mjesto istine → više prikaza**.

Ne stvarati drugi registar gradova, izvora, postrojbi, pitanja ili profila ako kanonski registar već postoji.

## 13. Migracija

Redoslijed:

1. izgraditi portalni temelj
2. izgraditi Content/Feed/Related/Source sloj
3. izgraditi reusable komponente
4. izgraditi homepage na novom sustavu
5. prebaciti hub stranice
6. prebaciti članke i profile
7. prebaciti Branitelje i njihove podstranice
8. povezati kvizove
9. provjeriti AI/Knowledge Base poveznice
10. ukloniti mrtve i duplicirane legacy sustave
11. završni link/image/accessibility/performance QA

## 14. Legacy pravilo

Ne graditi novi sustav preko starog kaosa. Kada je novi sustav potvrđen i sadržaj migriran, stari duplicirani layouti, CSS/JS moduli i mrtve reference se uklanjaju.

Ne ostavljati paralelne sustave samo zato da postoje.

## 15. Tehnički cilj

Predložena jezgra:

```text
/scripts/patriasoul-portal/
  portal-core.js
  layout-engine.js
  content-engine.js
  feed-engine.js
  related-engine.js
  search-engine.js
  source-engine.js
  quiz-promos.js
  navigation-engine.js
```

Uz centralni portalni CSS i reusable komponente.

Ova struktura je ciljna arhitektura. Prije implementacije svaka postojeća funkcija mora se mapirati na novi sustav kako se ne bi izgubio već dovršeni sadržaj.

## 16. QA kriterij

Portal 2.0 smatra se spremnim tek kada:

- svi glavni linkovi rade
- navigacija je jednaka na svim novim stranicama
- mobilni prikaz je čitljiv
- slike se učitavaju i imaju izvore gdje je potrebno
- sadržaj nema nepotrebnih duplikata
- izvori su vidljivi
- oba kviz CTA bloka rade
- O nama i Kontakt rade
- Branitelji ostaju odvojeni od Domovine
- AI i Knowledge Base veze nisu pokvarene
- PWA/Cloudflare build ostaju funkcionalni
- legacy sustavi koji više nisu potrebni su uklonjeni
