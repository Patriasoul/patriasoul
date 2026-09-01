# PatriaSoul — funkcije

> Centralni pregled funkcija, korisničkih sustava i planirane arhitekture projekta PatriaSoul.

PatriaSoul je digitalna platforma posvećena Hrvatskoj, njezinoj povijesti, Domovinskom ratu, baštini, vjeri, gradovima i zajednici. Ovaj dokument služi kao funkcionalna specifikacija projekta i kao kontrolna lista za daljnji razvoj.

## 1. Glavna navigacija

- **Početna** — središnji ulaz u projekt, istaknuti sadržaj i brzi pristup glavnim funkcijama.
- **Domovina** — suvremena Hrvatska, simboli, institucije, prostor i nacionalni identitet.
- **Branitelji** — sadržaj vezan uz hrvatske branitelje, postrojbe, operacije i svjedočanstva.
- **Povijest** — kronološki i tematski pregled hrvatske povijesti.
- **Baština** — kulturna, tradicijska, jezična, glazbena i materijalna baština.
- **Vjera** — kršćanska i katolička baština, blagdani, molitve i duhovni sadržaj.
- **Gradovi** — središnji katalog hrvatskih gradova i profili gradova.
- **Vijesti** — aktualne i tematske objave.
- **Kviz** — znanje, bodovanje, rangiranje, značke i natjecanje.
- **Brani svoj grad** — posebna igra temeljena na zaštiti i poznavanju vlastitog grada.
- **Video** — video sadržaj.
- **Galerija** — fotografije, ilustracije i povijesni materijali.
- **O PatriaSoul** — predstavljanje projekta, njegove ideje i ciljeva.

## 2. Globalno pretraživanje

Pretraga treba omogućiti brzo pronalaženje sadržaja iz cijelog projekta.

- pretraživanje gradova
- pretraživanje povijesnih tema
- pretraživanje branitelja i postrojbi
- pretraživanje kvizova
- pretraživanje vijesti
- pretraživanje galerije i videa
- filtriranje prema kategoriji
- prikaz rezultata bez napuštanja trenutnog konteksta
- jasna poruka kada nema rezultata

## 3. Gradovi — 127 gradova

Gradovi su organizirani kroz centralni registar kako bi se izbjeglo nepotrebno kopiranje 127 zasebnih stranica.

Svaki profil grada predviđa:

- naziv grada
- županiju
- grb i vizualni identitet gdje je dostupan
- kratki opis
- položaj i osnovne podatke
- povijest grada
- znamenitosti
- kulturnu i prirodnu baštinu
- poznate osobe
- događaje i posebnosti
- poveznice na povezane sadržaje
- sadržaj vezan uz Domovinski rat kada je relevantan
- mogućnost povezivanja s kvizom i igrom **Brani svoj grad**

Hub Gradovi treba imati:

- pretragu
- filtriranje po županijama
- pregled svih 127 gradova
- istaknute gradove
- responzivan prikaz za mobitel i računalo

## 4. Kviz sustav

Kviz je jedan od glavnih interaktivnih sustava PatriaSoul.

### Osnovni kviz

- pitanje s više ponuđenih odgovora
- vremensko ograničenje
- automatsko zaključavanje odgovora nakon isteka vremena
- prikaz točnog odgovora
- bodovanje prema točnosti i brzini
- završni rezultat
- mogućnost ponovnog igranja

### Miješanje odgovora

Odgovori se ne smiju oslanjati na stalne pozicije A/B/C/D. Opcije se preslaguju, dok se točan odgovor identificira vlastitim ID-em. Time se sprječava da je točan odgovor uvijek na istoj poziciji.

### Kategorije

Planirane kategorije obuhvaćaju najmanje:

- Domovina
- Povijest
- Domovinski rat
- Branitelji
- Baština
- Vjera
- Gradovi
- Hrvatska kultura
- Zemljopis
- Opće znanje

Cilj je imati veliku bazu pitanja po kategoriji, uz centralni sustav koji omogućuje nasumični odabir i buduće proširenje baze.

### Dnevni, tjedni i mjesečni kviz

- **Dnevni kviz** — isti set pitanja za sve korisnike tog dana.
- **Tjedni kviz** — natjecanje koje se računa kroz tjedni ciklus.
- **Mjesečni kviz** — mjesečni rezultat i rang-lista.
- **Ukupna rang-lista** — dugoročni rezultat korisnika.

## 5. Bodovi, XP i napredovanje

Planirani sustav napredovanja uključuje:

- bodove za točne odgovore
- bonus za brzinu
- XP za odigrane kvizove
- razine korisnika
- niz uzastopnih dana aktivnosti (streak)
- statistiku uspješnosti
- najbolje rezultate po kategoriji

## 6. Značke

Korisnici mogu dobivati značke za posebna postignuća, primjerice:

- prvi odigrani kviz
- prvi savršeni rezultat
- određeni broj točnih odgovora
- niz dnevnih kvizova
- visoki plasman na rang-listi
- poznavanje određene kategorije
- uspjeh u igri Brani svoj grad
- posebne povijesne i domoljubne izazove

Značke trebaju biti vidljive na korisničkom profilu.

## 7. Rang-lista

Rangiranje treba podržavati:

- TOP 3 korisnika
- dnevni poredak
- tjedni poredak
- mjesečni poredak
- ukupni poredak
- rang prema kategoriji
- prikaz vlastitog mjesta na ljestvici

Posebno se ističu prva tri mjesta kroz vizualni podium.

## 8. Korisnički profil

Profil korisnika predviđa:

- korisničko ime
- avatar
- razinu i XP
- ukupne bodove
- broj odigranih kvizova
- postotak točnih odgovora
- najbolji rezultat
- streak
- osvojene značke
- omiljena pitanja
- rezultate po kategorijama
- plasman na rang-listi
- rezultate u igri Brani svoj grad

## 9. Brani svoj grad

**Brani svoj grad** je zaseban interaktivni sustav PatriaSoul.

Temeljne funkcije:

- odabir vlastitog grada
- profil grada kao početna točka igre
- izazovi povezani s gradom
- pitanja o povijesti, geografiji, baštini i važnim osobama
- bodovanje
- obrana/napredovanje grada kroz rezultate
- rangiranje igrača
- povezivanje s profilom grada
- mogućnost budućeg multiplayer načina

Sustav treba biti dovoljno modularan da se kasnije mogu dodavati nove misije, razine i događaji bez promjene osnovne arhitekture.

## 10. Dnevni sadržaj

Početna stranica može imati rotirajući dnevni sadržaj:

- događaj na današnji dan
- osoba dana
- grad dana
- povijesna fotografija
- citat dana
- pitanje dana
- biblijski stih dana
- preporučeni video ili galerija

Sadržaj treba biti centralno upravljan kako bi se mogao mijenjati bez uređivanja većeg broja HTML stranica.

## 11. Vijesti

Sustav vijesti predviđa:

- kategorije
- naslov
- naslovnu fotografiju
- datum objave
- autora
- kratki sažetak
- puni sadržaj
- povezane objave
- oznake/tagove
- dijeljenje sadržaja

## 12. Galerija

Galerija treba omogućiti:

- kategorije fotografija
- albume
- naslov i opis
- prikaz u modernoj mreži
- povećani prikaz fotografije
- responzivni prikaz
- alt tekst za pristupačnost

## 13. Video

Video sekcija treba podržavati:

- video zapise
- naslov i opis
- kategorije
- naslovnu sliku
- povezana područja PatriaSoul projekta
- responzivni video player

## 14. Obavijesti i korisničke poruke

Sustav treba imati standardizirane poruke za:

- uspješno spremanje
- grešku
- upozorenje
- informaciju
- potvrdu radnje
- istek sesije
- neuspješnu prijavu
- validaciju obrazaca

## 15. Obrasci

Svi obrasci trebaju imati zajednički vizualni sustav.

Predviđeno je:

- jasno označavanje polja
- obavezna polja
- validacija
- poruke pogreške
- poruke uspjeha
- vidljiv fokus tipkovnicom
- responzivni raspored
- pristupačne oznake i pomoćni tekst
- stanje onemogućenog gumba/polja

## 16. Prijava i registracija

Planirani korisnički sustav uključuje:

- registraciju
- prijavu
- odjavu
- zaboravljenu lozinku
- uređivanje profila
- zaštitu korisničkih podataka
- upravljanje sesijom

## 17. Administracija

Administratorski sustav treba omogućiti upravljanje sadržajem bez ručnog uređivanja svake stranice.

Predviđeno:

- upravljanje korisnicima
- upravljanje gradovima
- upravljanje pitanjima
- upravljanje kategorijama
- upravljanje značkama
- upravljanje vijestima
- upravljanje galerijom
- upravljanje videom
- upravljanje dnevnim sadržajem
- pregled statistike
- moderiranje sadržaja

## 18. Konfiguracija

Projekt koristi centralnu konfiguraciju za javne postavke koje ne sadrže tajne podatke.

Tajne vrijednosti, ključevi i administratorski podaci ne smiju se stavljati u javne JavaScript ili Markdown datoteke.

## 19. Privatnost i kolačići

Sustav kolačića treba korisniku jasno objasniti svrhu kolačića i omogućiti izbor kategorija gdje je to potrebno.

Predviđene kategorije:

- nužni
- funkcionalni
- analitički
- ostali opcionalni kolačići kada se uvedu

Postavke se trebaju pamtiti kako se banner ne bi nepotrebno ponovno prikazivao.

## 20. Vizualni sustav

PatriaSoul koristi jedinstveni vizualni identitet:

- tamna antracitna osnova
- zlatni naglasci
- hrvatski/patriotski detalji bez pretjerivanja
- jasna tipografija
- kartice i paneli
- moderni gumbi
- suptilne animacije
- responzivan dizajn
- dosljedan footer i navigacija

Cilj je da različite sekcije izgledaju kao dijelovi iste platforme, a ne kao zasebne web stranice.

## 21. Responzivnost i pristupačnost

Sve ključne funkcije trebaju raditi na:

- desktop računalima
- laptopima
- tabletima
- mobilnim telefonima

Interakcije trebaju biti dostupne tipkovnicom gdje je to primjenjivo, fokus treba biti vidljiv, a obrasci i interaktivni elementi trebaju imati jasne oznake i stanja.

## 22. Struktura razvoja

Razvoj je podijeljen u nekoliko logičkih slojeva:

### Sloj 1 — temelj

- navigacija
- footer
- globalni stilovi
- gumbi
- kartice
- obrasci
- konfiguracija
- cookie sustav

### Sloj 2 — sadržaj

- Domovina
- Povijest
- Domovinski rat
- Branitelji
- Baština
- Vjera
- Gradovi
- Vijesti
- Galerija
- Video

### Sloj 3 — interaktivnost

- kviz engine
- dnevni/tjedni/mjesečni kviz
- bodovanje
- značke
- rang-lista
- profil
- Brani svoj grad

### Sloj 4 — podatkovni i korisnički sustavi

- baza podataka
- autentikacija
- korisnički profili
- administracija
- statistika
- moderiranje

## 23. Princip održavanja

Centralne podatke treba držati na jednom mjestu gdje god je to moguće. Gradovi, pitanja, konfiguracija, kategorije i slični skupovi podataka ne trebaju se nepotrebno duplicirati kroz više stranica.

Kod dokumentacije i Markdown datoteka treba koristiti jasne naslove, kratke odlomke, liste i poveznice kako bi sadržaj bio lako čitljiv i navigabilan na GitHubu. citeturn0search0turn0search4

## 24. Kontrolna lista razvoja

- [x] Temeljni vizualni sustav
- [x] Sustav gumba
- [x] Sustav kartica
- [x] Sustav obrazaca
- [x] Footer sustav
- [x] Centralna javna konfiguracija
- [x] Cookie banner
- [x] Centralni set pitanja za Domovinski rat
- [x] Centralni registar gradova
- [ ] Dovršiti sve profile gradova
- [ ] Dovršiti kompletan kviz UI
- [ ] Dovršiti dnevni/tjedni/mjesečni ciklus
- [ ] Dovršiti značke i XP
- [ ] Dovršiti korisničke profile
- [ ] Dovršiti rang-listu
- [ ] Dovršiti Brani svoj grad
- [ ] Dovršiti galeriju
- [ ] Dovršiti video sustav
- [ ] Dovršiti administratorski sustav
- [ ] Povezati trajnu bazu podataka
- [ ] Uvesti autentikaciju
- [ ] Završiti završno testiranje svih poveznica i funkcija

## 25. Dugoročni cilj

PatriaSoul treba postati jedna objedinjena platforma u kojoj se informativni sadržaj, hrvatska povijest i baština povezuju s modernim interaktivnim funkcijama.

**Čuvaj nasljeđe. Prenesi ga dalje.**
