# PatriaSoul AI Engine

Centralni AI sloj za PatriaSoul. Engine nije zaseban model; on je sigurna aplikacijska arhitektura koja povezuje PatriaSoul Knowledge Base s odabranim AI providerom.

## Princip

1. Zahtjev dolazi iz portala.
2. Engine određuje vrstu zadatka.
3. Knowledge Base se pretražuje prije generiranja odgovora.
4. AI dobiva samo relevantan kontekst.
5. Odgovor se vraća s informacijom o izvorima i statusu provjere gdje je dostupno.
6. Osjetljive uredničke radnje ostaju pod ljudskom kontrolom.

## Predviđeni zadaci

- `ask` — pitanja korisnika o PatriaSoul sadržaju
- `summarize_news` — sažetak vijesti
- `rewrite_news` — urednički nacrt vlastitim riječima uz navođenje izvora
- `quiz_generate` — prijedlog pitanja za kviz
- `explain_quiz` — objašnjenje odgovora
- `fact_check` — pomoć pri provjeri tvrdnji
- `daily_brief` — PatriaSoul danas

## Sigurnost

API ključevi nikad ne smiju biti u frontend kodu ili Git repozitoriju. Produkcijski provider spaja se preko serverskog endpointa i environment secreta.

Engine je zamišljen kao provider-neutralan: Gemini, OpenAI ili drugi kompatibilni provider mogu se uključiti bez promjene javnog sučelja portala.

## Trenutni status

`disabled / scaffold` — nema aktivnog vanjskog API poziva. Sljedeći korak je implementacija server endpointa i Knowledge Base retrievera.
