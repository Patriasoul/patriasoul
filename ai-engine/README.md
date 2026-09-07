# PatriaSoul AI Engine

Centralni AI sloj za PatriaSoul. Engine je **knowledge-only** aplikacijski sustav: koristi isključivo PatriaSoul Knowledge Base i vlastiti Answer Engine.

## Princip

1. Zahtjev dolazi iz portala.
2. Engine određuje vrstu pitanja/zadatka.
3. PatriaSoul Knowledge Base se pretražuje prije odgovora.
4. Relevantni potvrđeni zapisi rangiraju se prema pitanju.
5. `PatriaSoulAnswerEngine` sastavlja odgovor iz pronađenih podataka.
6. Ako nema dovoljno potvrđenih podataka, engine to jasno kaže umjesto da izmišlja odgovor.

## Potpuna neovisnost

PatriaSoul AI **ne koristi Puter, OpenAI, Gemini, Anthropic, Ollama, Supabase AI funkcije niti bilo koji drugi vanjski AI provider/API**.

Nema API ključeva, vanjskih AI endpointa ni poziva prema AI servisima iz preglednika.

## Komponente

- `knowledge/retriever.js` — dohvat relevantnih zapisa
- `answer-engine.js` — lokalno sastavljanje odgovora
- `agent/agent.js` — usmjeravanje pitanja
- `agent/router.js` — određivanje vrste zadatka
- `agent/tool-registry.js` — dostupne AI sposobnosti
- `quiz-guard.js` — zaštita aktivnog kviza
- `pitaj-patriasoul-widget-v2.js` — korisničko sučelje chata

## Ograničenje

Ovaj engine nije generativni LLM. Njegova prednost je što odgovore temelji na vlastitoj, kontroliranoj PatriaSoul bazi i ne šalje korisnička pitanja trećim AI servisima.
