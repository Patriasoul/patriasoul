// PatriaSoul AI - Puter.js provider adapter
// Requires Puter.js to be loaded by the host page.
(function () {
  'use strict';

  const DEFAULT_MODEL = 'gpt-5.5';

  function ensurePuter() {
    if (!window.puter || !window.puter.ai || typeof window.puter.ai.chat !== 'function') {
      throw new Error('Puter.js AI nije dostupan. Provjeri da je puter.js učitan i da stranica radi preko HTTP/HTTPS.');
    }
  }

  function buildPrompt(question, context) {
    const sources = (context || []).map((item, index) => {
      return `[${index + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status || 'unknown'}`;
    }).join('\n\n');

    return `Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku. Odgovaraj na hrvatskom jeziku.\n\nPRAVILA:\n- Prednost imaju podaci iz priloženog PatriaSoul konteksta.\n- Ne izmišljaj činjenice, izvore, datume ili osobe.\n- Ako kontekst nije dovoljan, jasno reci da podatak nije potvrđen u PatriaSoul bazi.\n- Ne predstavljaj pretpostavku kao činjenicu.\n- Za vijesti razlikuj izvorni događaj od PatriaSoul uredničke obrade.\n- Na kraju navedi korištene PatriaSoul izvore ako postoje.\n\nPITANJE KORISNIKA:\n${question}\n\nPATRIA SOUL KONTEKST:\n${sources || 'Nema pronađenog relevantnog konteksta.'}`;
  }

  async function ask(question, context, options = {}) {
    ensurePuter();
    const prompt = buildPrompt(question, context);
    const model = options.model || DEFAULT_MODEL;
    const response = await window.puter.ai.chat(prompt, {
      model,
      stream: Boolean(options.stream)
    });

    if (options.stream && response && typeof response[Symbol.asyncIterator] === 'function') {
      return response;
    }

    return response;
  }

  window.PatriaSoulPuterAI = { ask, buildPrompt };
})();
