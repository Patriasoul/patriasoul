/* PatriaSoul AI — content generator
 *
 * Generates drafts from the canonical PatriaSoul Knowledge Base.
 * It never publishes or writes repository content.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 12;

  async function loadKnowledge() {
    const response = await fetch('/ai-engine/knowledge/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('PatriaSoul Knowledge Base nije dostupna.');
    const data = await response.json();
    return Array.isArray(data) ? data : (data.items || []);
  }

  function getContext(items, query) {
    if (!global.PatriaSoulKnowledgeRetriever) {
      throw new Error('PatriaSoul Knowledge Retriever nije učitan.');
    }
    const results = global.PatriaSoulKnowledgeRetriever.retrieve(items, query, {
      trustedOnly: true,
      limit: MAX_CONTEXT_ITEMS,
      filters: {}
    });
    return global.PatriaSoulKnowledgeRetriever.buildContext(results);
  }

  function sourceText(context) {
    return context.map(function (item, index) {
      return `[${index + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`;
    }).join('\n\n');
  }

  function promptFor(type, topic, context) {
    const sources = sourceText(context) || 'Nema dovoljno potvrđenih podataka u bazi.';
    const common = [
      'Ti si urednički AI portala PatriaSoul.',
      'Piši na hrvatskom jeziku.',
      'Koristi samo potvrđene podatke iz priloženog PatriaSoul konteksta.',
      'Ne izmišljaj činjenice, datume, osobe, izvore ili citate.',
      'Ako neki podatak nije potvrđen, jasno ga označi ili ga izostavi.',
      'Ovaj rezultat je NACRT i ne smije se predstavljati kao automatski objavljen sadržaj.',
      '',
      `TEMA: ${topic}`,
      '',
      'POTVRĐENI KONTEKST:',
      sources
    ];

    if (type === 'article') {
      common.push('', 'ZADATAK:', 'Izradi kvalitetan nacrt članka. Uključi naslov, podnaslov, uvod, jasne međunaslove, glavni tekst, zaključak i odjeljak "Izvori PatriaSoul". Ne dodaj činjenice izvan konteksta.');
    } else if (type === 'summary') {
      common.push('', 'ZADATAK:', 'Sažmi temu jasno i čitko u 5–8 kratkih odlomaka ili natuknica.');
    } else if (type === 'social') {
      common.push('', 'ZADATAK:', 'Napiši objavu za Facebook/Instagram. Neka bude informativna, domoljubna ali nenametljiva, bez izmišljanja činjenica. Dodaj kratak naslov i nekoliko prikladnih hashtagova.');
    } else if (type === 'seo') {
      common.push('', 'ZADATAK:', 'Izradi SEO paket: SEO naslov, meta opis do približno 155 znakova, fokusnu ključnu riječ, 5 pomoćnih ključnih riječi i prijedlog URL slug-a.');
    } else {
      common.push('', 'ZADATAK:', 'Izradi koristan urednički nacrt na zadanu temu koristeći samo potvrđeni kontekst.');
    }

    return common.join('\n');
  }

  async function generate(type, topic, options) {
    const cleanTopic = String(topic || '').trim();
    if (!cleanTopic) throw new Error('Tema je prazna.');
    if (!global.puter || !global.puter.ai || typeof global.puter.ai.chat !== 'function') {
      throw new Error('Puter.js nije učitan.');
    }

    const items = await loadKnowledge();
    const context = getContext(items, cleanTopic);
    const opts = options || {};
    const response = await global.puter.ai.chat(promptFor(type, cleanTopic, context), {
      model: opts.model,
      stream: false,
      temperature: opts.temperature === undefined ? 0.35 : opts.temperature,
      normalize: true
    });

    const text = response && response.message && typeof response.message.content === 'string'
      ? response.message.content
      : (typeof response === 'string' ? response : '');

    return { type: type, topic: cleanTopic, text: text, context: context };
  }

  global.PatriaSoulContent = Object.freeze({ generate: generate });
})(window);
