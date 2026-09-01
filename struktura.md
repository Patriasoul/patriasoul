# PatriaSoul — struktura

Glavna arhitektura prati MASTER PLAN: Domovina, Branitelji, Povijest, Baština, Vjera, Gradovi, Brani svoj grad, Kviz, Vijesti, Video, Galerija i O nama.

## Kanonski sadržajni sloj
- `gradovi.js` — jedini kanonski registar 127 gradova Republike Hrvatske; ne duplicirati popis gradova u drugim datotekama.
- `gradovi.html` — Gradovi hub; prikaz i pretraga čitaju samo `gradovi.js`.
- `grad.html` — zajednički predložak profila grada; ne izrađivati zaseban HTML za svaki grad.
- `sources-phase2.js` — jedini registar uredničkih izvora za sadržajne tvrdnje.
- postojeće baze pitanja i tematski JS moduli ostaju vlasnici svojih domena; ne kopirati ih u gradsku bazu.

## Pravilo podataka
Svaki entitet ima jedno mjesto istine. Prikaz koristi postojeći podatak umjesto stvaranja kopije. Povijesni, statistički, baštinski i biografski zapisi dodaju se kao povezani zapisi s navedenim izvorom.

## Prioritet razvoja
1. Početna i navigacija — Faza 1
2. Sadržajni hubovi — Faza 1
3. Podstranice i predlošci — Faza 1/2
4. Gradovi / podatkovni sloj — Faza 2
5. Kviz i igra — Faza 3
6. Admin i korisnički sustav — Faza 4
