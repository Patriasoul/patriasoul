/* PatriaSoul AI — content generator
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
    if (!global.PatriaSoulKnowledgeRetriever) throw new Error('PatriaSoul Knowledge Retriever nije učitan.');
    const results = global.PatriaSoulKnowledgeRetriever.retrieve(items, query, {
      trustedOnly: true,
      limit: MAX_CONTEXT_ITEMS,
      filters: {}
    });
    return global.PatriaSoulKnowledgeRetriever.buildContext(results);
  }

  function promptFor(type, topic, context) {
    const sources = context.map(function (item, index) {
      return `[${index + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`;
    }).join('\n\n') || 'Nema dovoljno potvrđenih podataka u bazi.';

    const common = [
      'Ti si urednički AI portala PatriaSoul.',
      'Piši na hrvatskom jeziku.',
      'Koristi samo potvrđene podatke iz priloženog PatriaSoul konteksta.',
      'Ne izmišljaj činjenice, datume, osobe, izvore ili citate.',
      'Ako podatak nije potvrđen, jasno ga označi ili izostavi.',
      'Rezultat je NACRT i ne smije se predstavljati kao automatski objavljen sadržaj.',
      '', `TEMA: ${topic}`, '', 'POTVRĐENI KONTEKST:', sources
    ];

    if (type === 'article') common.push('', 'ZADATAK:', 'Izradi nacrt članka s naslovom, podnaslovom, uvodom, međunaslovima, glavnim tekstom, zaključkom i odjeljkom "Izvori PatriaSoul".');
    else if (type === 'summary') common.push('', 'ZADATAK:', 'Sažmi temu jasno i čitko u 5–8 kratkih odlomaka ili natuknica.');
    else if (type === 'social') common.push('', 'ZADATAK:', 'Napiši objavu za Facebook/Instagram, informativnu i domoljubnu bez izmišljanja činjenica. Dodaj kratak naslov i prikladne hashtagove.');
    else if (type === 'seo') common.push('', 'ZADATAK:', 'Izradi SEO paket: SEO naslov, meta opis do približno 155 znakova, fokusnu ključnu riječ, 5 pomoćnih ključnih riječi i URL slug.');
    else common.push('', 'ZADATAK:', 'Izradi koristan urednički nacrt koristeći samo potvrđeni kontekst.');

    return common.join('\n');
  }

  async function generate(type, topic, options) {
    const cleanTopic = String(topic || '').trim();
    if (!cleanTopic) throw new Error('Tema je prazna.');
    if (!global.PatriaSoulAI || typeof global.PatriaSoulAI.ask !== 'function') throw new Error('PatriaSoul AI provider nije učitan.');

    const items = await loadKnowledge();
    const context = getContext(items, cleanTopic);
    const opts = options || {};
    const response = await global.PatriaSoulAI.ask(cleanTopic, {
      provider: opts.provider,
      model: opts.model,
      apiEndpoint: opts.apiEndpoint,
      knowledge: context,
      prompt: promptFor(type, cleanTopic, context)
    });

    return { type, topic: cleanTopic, text: response?.text || '', context, fallback: !!response?.fallback };
  }

  global.PatriaSoulContent = Object.freeze({ generate });
})(window);
