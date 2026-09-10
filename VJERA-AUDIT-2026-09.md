# PATRIA SOUL — KOMPLETAN AUDIT VJERA PODPORTALA

Datum audita: 10. rujna 2026.

## Obuhvat

Audit obuhvaća svih 16 kanonskih stranica Vjera podportala, zajedničku navigaciju, slikovna polja, skripte, interne poveznice, uredničku strukturu i vidljive ostatke starih sustava.

## Rezultat

**Stanje podportala: funkcionalna osnova je dobra, ali postoje 3 stvari koje treba završiti prije proglašenja Vjera podportala potpuno završenim.**

1. `svetac-dana.html` još nije pravi dinamički dnevni zapis; postoji `vjera-dnevno.js`, ali stranica ga trenutno ne koristi za prikaz aktualnog dana.
2. Devet starijih HTML stranica još u izvornom HTML-u sadrži legacy `patria-image-placeholder.svg` polje. To više nije vidljivo kao placeholder zahvaljujući centralnom `patriasoul-image-fields.js`, koji sada dodjeljuje stvarnu tematsku sliku prema stranici. Izvorni HTML ipak treba kasnije očistiti.
3. `vjera-podstranica.js` je stari centralizirani podatkovni sustav s dupliciranim sadržajem. Dio stranica ga još učitava i treba ga ukinuti tek nakon provjere da nijedna stranica više ne ovisi o njegovom automatskom renderiranju.

## Stranice

| # | Stranica | Status | Nalaz |
|---|---|---|---|
| 1 | `vjera.html` | 🟢 | Glavna stranica podportala je sadržajno bogata, povezuje svih 16 odredišta i koristi kanonsku navigaciju. Ima dodatno slikovno polje uz hero sliku; nije blokirajuće. |
| 2 | `evandelje.html` | 🟡 | Sadržaj je funkcionalan, ali stranica je osjetno jednostavnija od ostatka podportala. Legacy placeholder postoji u HTML-u, ali ga centralni image sustav sada zamjenjuje. Treba kasnije proširiti dnevna čitanja i razmatranje. |
| 3 | `liturgija.html` | 🟢/🟡 | Dobar urednički sadržaj i HBK izvor. Legacy placeholder je u HTML-u, ali runtime sada postavlja stvarnu sliku. Dnevni kalendar treba ostati vezan uz provjerene izvore. |
| 4 | `biblija.html` | 🟢/🟡 | Dobar vodič kroz Sveto pismo i čitanje. Legacy placeholder je u HTML-u, runtime ga zamjenjuje. Može se kasnije proširiti stvarnim vodičima po knjigama. |
| 5 | `molitve.html` | 🟢/🟡 | Bogat sadržaj, jutarnja/večernja molitva, obitelj, nevolja i molitva za domovinu. Legacy placeholder u HTML-u riješen centralnim image sustavom. |
| 6 | `krunica.html` | 🟢 | Bogat i praktičan vodič, sva četiri otajstva, redoslijed molitve, nakane i obitelj. Stvarna slika je već u HTML-u. |
| 7 | `svetci.html` | 🟢/🟡 | Vrlo dobra struktura hrvatskih svetaca i blaženika uz HBK status. Legacy placeholder polje ostaje u HTML-u, ali se sada zamjenjuje stvarnom slikom. |
| 8 | `svetac-dana.html` | 🟡 | Kanonska stranica postoji i izvori su navedeni, ali sadržaj je više statički vodič nego stvarni 'svetac dana'. `vjera-dnevno.js` postoji, ali nije povezan s prikazom dnevnog sveca. Ovo je najveći funkcionalni prioritet. |
| 9 | `blagdani.html` | 🟢/🟡 | Dobar prikaz liturgijske godine i hrvatskih običaja uz pravilno razlikovanje liturgije, pobožnosti i narodnog običaja. Legacy placeholder riješen runtime slikom. |
| 10 | `svetista.html` | 🟢/🟡 | Dobar temelj za hrvatsku bazu svetišta, hodočašća, zavjete i praktične informacije. Legacy placeholder riješen runtime slikom. Sljedeća faza može biti stvarna baza svetišta po županijama/biskupijama. |
| 11 | `sakramenti.html` | 🟢/🟡 | Sva 7 sakramenata i tri skupine su obrađeni. Legacy placeholder riješen runtime slikom. Za lokalne pastoralne uvjete pravilno se upućuje na župu/biskupiju. |
| 12 | `obitelj-vjera.html` | 🟢/🟡 | Bogat i praktičan sadržaj o braku, djeci, molitvi, sakramentima i obiteljskoj baštini. Legacy placeholder riješen runtime slikom. Postoji sitna tipografska greška `DJeca I ODGOJ` koju treba ispraviti u `DJECA I ODGOJ`. |
| 13 | `mladi-vjera.html` | 🟢 | Jedna od jačih stranica: identitet, odnosi, pitanja, poziv, digitalni život, služenje i izvori. Stvarna Wikimedia slika. |
| 14 | `duhovnost.html` | 🟢 | Bogata stranica o molitvi, Božjoj riječi, razlučivanju, patnji i zdravoj duhovnosti. U ovom auditu uklonjen je pogrešno umetnut interni citacijski markup i postavljena konkretna fotografija. |
| 15 | `vjera-svjedocanstva.html` | 🟢 | Bogata struktura osobnih svjedočanstava, privatnosti, pristanka i uredničke provjere. U ovom auditu uklonjen je interni citacijski markup. |
| 16 | `katolicke-vijesti.html` | 🟢 | Bogata urednička stranica s kategorijama, izvorima, pravilima za sažimanje vijesti i bez kopiranja članaka. Ima konkretnu fotografiju i poveznice na HBK, IKA, HKM i Vatikan. |

## Navigacija

`site-navigation.js` je potvrđen kao **jedini kanonski sustav navigacije**. Vjera izbornik sadrži svih 16 stranica:

- Vjera i duhovna baština
- Evanđelje dana
- Liturgija i kalendar
- Biblija i tumačenja
- Molitve
- Krunica
- Svetci i blaženici
- Svetac dana
- Blagdani i običaji
- Svetišta i hodočašća
- Sakramenti
- Obitelj i vjera
- Mladi i vjera
- Duhovnost
- Svjedočanstva vjere
- Katoličke vijesti

Nije potrebno stvarati novu `vjera-navigacija.js` datoteku.

## Slikovni sustav

U ovom auditu je centraliziran legacy problem s placeholderima u `patriasoul-image-fields.js`.

Sada se za Vjera stranice automatski biraju tematske fotografije iz Wikimedia Commonsa ako HTML još sadrži staro placeholder polje. Time se sprječava da korisnik vidi generičku sliku `patria-image-placeholder.svg`.

**Važna napomena:** ovo je prijelazno rješenje. U sljedećem čišćenju treba iz devet HTML stranica potpuno ukloniti stara placeholder polja i ostaviti samo konkretne slike.

## Skripte i duplikati

### `patriasoul-image-fields.js`
Sada je centralni sustav za slikovna polja. Ne treba stvarati nove image-field skripte po podstranicama.

### `site-navigation.js`
Ostaje jedini kanonski navigacijski sustav.

### `vjera-podstranica.js`
Ovo je **legacy podatkovni sustav** koji sadrži duplicirani sadržaj za više Vjera stranica. Dio starijih stranica još ga učitava. Ne treba ga dalje razvijati. Prije brisanja treba potvrditi da nijedna stranica više ne koristi njegove render funkcije.

### `vjera-dnevno.js`
Vrijedan je postojeći temelj za dnevni liturgijski sustav. Koristi Catholic Readings API i dodatnu provjeru nacionalnog kalendara HBK. Sljedeći korak je povezati ga s `svetac-dana.html` i po potrebi s `evandelje.html` tako da stranice stvarno prikazuju aktualni dan.

## Urednička kontrola

Sadržaj treba trajno razlikovati:

- službeni nauk Crkve
- liturgijske podatke
- povijesne činjenice
- pobožnu predaju
- narodne i lokalne običaje
- osobna svjedočanstva
- PatriaSoul uredničko objašnjenje

Za doktrinarni temelj primjeren je Katekizam Katoličke Crkve, koji vjeru, sakramente, život po vjeri i molitvu obrađuje kao povezane cjeline. Za liturgijske podatke hrvatska stranica treba prvenstveno provjeravati Nacionalni liturgijski kalendar HBK.

## Prioriteti nakon audita

### P1 — obavezno
1. Napraviti pravi dinamički `Svetac dana`.
2. Provjeriti i zatim ukloniti ovisnost stranica o `vjera-podstranica.js`.
3. Iz HTML-a potpuno ukloniti svih 9 legacy placeholder polja.

### P2 — preporučeno
4. Proširiti `Evanđelje dana` stvarnim dnevnim čitanjima i razmatranjem.
5. Napraviti bazu svetišta po hrvatskim krajevima i biskupijama.
6. Napraviti detaljnije profile svetaca i blaženika.
7. Dodati zasebne tematske vodiče za biblijske knjige.

### P3 — kasnije
8. Uvesti pravi arhiv Katoličkih vijesti.
9. Dodati uredničke datume i arhivu po mjesecima.
10. Povezati Vjeru s gradovima, krajevima i hrvatskom sakralnom baštinom.

## Zaključak

**Vjera podportal više nije zbirka praznih ili generičkih stranica.** Svih 16 kanonskih odredišta postoji, navigacija je objedinjena, većina stranica ima ozbiljan urednički sadržaj i unutarnje poveznice, a aktualni audit je otkrio prvenstveno tehničke ostatke starog sustava i potrebu za pravim dnevnim sadržajem.

Sljedeća najbolja faza nije dodavanje još stranica, nego završiti tri P1 stavke i tek tada Vjeru proglasiti tehnički i urednički zatvorenom cjelinom.
