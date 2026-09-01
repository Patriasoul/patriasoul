# PatriaSoul — plan razvoja

## Faza 1 — završena
Vizualni sustav, navigacija, početna, hub stranice i responzivnost.

## Faza 2 — završena: sadržajna arhitektura
- kanonski registar gradova Hrvatske
- 127 službenih gradskih jedinica u jednom izvoru podataka
- Gradovi hub s pretragom i grupiranjem po županijama
- zajednički predložak profila grada
- kanonski registar uredničkih izvora
- pravilo izvora i sprječavanje dupliciranja sadržaja
- odvojeni podatkovni sloj od prikaza
- UTF-8 hrvatski sadržaj i stabilni slugovi

## Faza 3 — jezgra završena
- centralni kviz engine s preslagivanjem odgovora
- miješani, dnevni, tjedni i mjesečni kviz
- 15-sekundni timer i bodovanje prema brzini
- lokalni profil igrača i XP
- sustav razina
- sustav znački i automatsko otključavanje
- Brani svoj grad za svih 127 gradova
- lokalna rang-lista za kviz i gradske izazove
- ispravljene putanje učitavanja kviznih banaka za GitHub Pages

### Faza 3 — preostaje za produkcijsku verziju
- pravi korisnički računi i sigurna pohrana rezultata na poslužitelju
- javna rang-lista zajednička svim uređajima
- trajna statistika i zaštita od manipulacije rezultatom
- završna provjera svih pitanja i izvora prije javne objave

## Faza 4
Admin panel, korisnici, pretraga na razini cijelog portala, PWA i analitika.

### Pravilo razvoja
Postojeći sadržaj se prvo ponovno koristi. Novi podatak ide u svoj kanonski izvor i ne kopira se u više datoteka. Svaki činjenični sadržaj koji nije izvorni urednički tekst mora imati evidentiran izvor.
