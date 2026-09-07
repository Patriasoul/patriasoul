(function (global) {
  'use strict';

  const TRUSTED = new Set(['verified', 'published']);

  function clean(value) {
    return String(value || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .trim();
  }

  function splitSentences(value) {
    const text = clean(value);
    return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  }

  function compose(question, context) {
    const records = (Array.isArray(context) ? context : [])
      .filter(item => item && TRUSTED.has(item.status))
      .slice(0, 6);

    if (!records.length) {
      return {
        text: 'U PatriaSoul bazi trenutno nema dovoljno potvrđenih podataka za pouzdan odgovor na ovo pitanje.',
        provider: 'patriasoul-answer-engine',
        model: 'knowledge-only',
        usedKnowledgeBase: false,
        confidence: 0,
        sources: []
      };
    }

    const questionWords = clean(question).toLocaleLowerCase('hr-HR')
      .split(/[^a-zA-ZčćžšđČĆŽŠĐ0-9]+/)
      .filter(word => word.length > 2);

    const seen = new Set();
    const ranked = [];

    records.forEach((record, recordIndex) => {
      splitSentences(record.content || record.text).forEach(sentence => {
        const normalized = sentence.toLocaleLowerCase('hr-HR');
        if (normalized.length < 25 || seen.has(normalized)) return;
        seen.add(normalized);
        const matches = questionWords.reduce((score, word) =>
          score + (normalized.includes(word) ? 1 : 0), 0);
        ranked.push({ sentence, score: matches * 10 + (6 - recordIndex) });
      });
    });

    ranked.sort((a, b) => b.score - a.score);
    const selected = ranked.slice(0, 6).map(item => item.sentence);
    const firstTitle = clean(records[0].title);
    const lead = firstTitle ? `Prema potvrđenim podacima PatriaSoul baze, ${firstTitle} je povezan s ovim pitanjem.` : '';
    const text = [lead, ...selected].filter(Boolean).join(' ').trim();

    const sources = records.map(record => clean(record.sourceTitle || record.source || record.title))
      .filter((value, index, list) => value && list.indexOf(value) === index);

    return {
      text: text || 'U PatriaSoul bazi pronađen je relevantan zapis, ali nema dovoljno sadržaja za potpun odgovor.',
      provider: 'patriasoul-answer-engine',
      model: 'knowledge-only',
      usedKnowledgeBase: true,
      confidence: Math.min(0.95, 0.55 + records.length * 0.07),
      sources
    };
  }

  global.PatriaSoulAnswerEngine = Object.freeze({ compose, version: '1.0.0' });
})(window);
