# PatriaSoul AI Agent v1

Prvi sloj agentne arhitekture za PatriaSoul.

## Cilj

Agent treba moći odabrati odgovarajuću PatriaSoul Ability prije generiranja odgovora. V1 je namjerno ograničen na read-only alate.

## Trenutni dijelovi

- `tool-registry.js` — jedinstveni registar dostupnih alata.
- `router.js` — početni deterministički router koji bira alat prema korisničkom upitu.

## Dostupne abilities

- `find_city`
- `find_history`
- `find_heritage`
- `find_person`
- `find_monument`
- `find_quiz`
- `find_source`

## Sigurnost

V1 ne izvršava proizvoljni kod, ne mijenja sadržaj repozitorija i ne izlaže Ollama javno. Router samo odabire sposobnost; stvarno dohvaćanje podataka bit će spojeno na postojeći PatriaSoul Knowledge Base i kanonske registre.

## Sljedeći korak

Povezati pojedinačne abilities s postojećim Knowledge Base retrieverom, zatim dodati agent loop koji može napraviti više read-only koraka prije konačnog odgovora.
