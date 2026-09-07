(function (global) {
  'use strict';

  const TRUSTED = new Set(['verified', 'published']);
  const STOPWORDS = new Set([
    'ali', 'ako', 'biti', 'bio', 'bila', 'bilo', 'bili', 'bile', 'bio',
    'što', 'sta', 'kako', 'kada', 'gdje', 'koji', 'koja', 'koje', 'koju',
    'tko', 'ko', 'je', 'su', 'sam', 'si', 'smo', 'ste', 'se', 'na', 'u',
    'iz', 'za', 'od', 'do', 'o', 'i', 'ili', 'a', 's', 'sa', 'po', 'kod',
    'kroz', 'te', 'to', 'taj', 'ta', 'ti', 'ovo', 'ova', 'ovo', 'može',
    'moze', 'li', 'ima', 'imaju', 'imao', 'imala', 'imali', 'biti'
  ]);

  function clean(value) {
    return String(value || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .trim();
  }

  function normalize(value) {
    return clean(value)
      .toLocaleLowerCase('hr-HR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function meaningfulWords(value) {
    return normalize(value)
      .split(/\s+/)
      .filter(word => word.length > 2 && !STOPWORDS.has(word));
  }

  function stem(word) {
    const value = String(word || '');
    if (value.length <= 4) return value;
    return value
      .replace(/(ovima|evima|ama|ima|om|em|ov|ev|an|en|na|ne|ni|nu|no|og|oj|om|im|um|u|a|e|i|o)$/i, '')
      .slice(0, 7);
  }

  function splitSentences(value) {
    const text = clean(value);
    return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  }

  function sentenceScore(sentence, questionWords) {
    const sentenceWords = meaningfulWords(sentence);
    if (!sentenceWords.length || !questionWords.length) return 0;

    let score = 0;
    questionWords.forEach(word => {
      const wordStem = stem(word);
      sentenceWords.forEach(candidate => {
        const candidateStem = stem(candidate);
        if (candidate === word) score += 5;
        else if (candidate.startsWith(word) || word.startsWith(candidate)) score += 3;
        else if (wordStem.length >= 4 && candidateStem === wordStem) score += 3;
      });
    });

    const uniqueMatches = questionWords.filter(word => {
      const wordStem = stem(word);
      return sentenceWords.some(candidate =>
        candidate === word ||
        candidate.startsWith(word) ||
        word.startsWith(candidate) ||
        (wordStem.length >= 4 && stem(candidate) === wordStem)
      );
    }).length;

    if (uniqueMatches === 0) return 0;
    if (questionWords.length >= 3 && uniqueMatches === 1) return 0;

    return score + uniqueMatches * 4;
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

    const questionWords = meaningfulWords(question);
    const seen = new Set();
    const ranked = [];

    records.forEach((record, recordIndex) => {
      const content = clean(record.content || record.text);
      splitSentences(content).forEach(sentence => {
        const normalized = normalize(sentence);
        if (normalized.length < 25 || seen.has(normalized)) return;
        seen.add(normalized);

        const score = sentenceScore(sentence, questionWords);
        if (score <= 0) return;

        ranked.push({
          sentence: clean(sentence),
          score: score + Math.max(0, 3 - recordIndex),
          record
        });
      });
    });

    ranked.sort((a, b) => b.score - a.score);

    if (!ranked.length) {
      return {
        text: 'U PatriaSoul bazi pronađen je zapis povezan s temom, ali nema dovoljno izravnih podataka za pouzdan odgovor.',
        provider: 'patriasoul-answer-engine',
        model: 'knowledge-only',
        usedKnowledgeBase: false,
        confidence: 0,
        sources: []
      };
    }

    const selected = [];
    const usedRecords = new Set();
    ranked.forEach(item => {
      if (selected.length >= 6) return;
      if (selected.some(existing => normalize(existing) === normalize(item.sentence))) return;
      selected.push(item.sentence);
      usedRecords.add(item.record);
    });

    const sources = Array.from(usedRecords)
      .map(record => clean(record.sourceTitle || record.source || record.title))
      .filter((value, index, list) => value && list.indexOf(value) === index);

    const topScore = ranked[0].score;
    const coverage = questionWords.length
      ? Math.min(1, topScore / Math.max(10, questionWords.length * 7))
      : 0;

    return {
      text: selected.join(' ').trim(),
      provider: 'patriasoul-answer-engine',
      model: 'knowledge-only',
      usedKnowledgeBase: true,
      confidence: Math.min(0.95, Math.max(0.55, 0.55 + coverage * 0.4)),
      sources
    };
  }

  global.PatriaSoulAnswerEngine = Object.freeze({ compose, version: '1.1.0' });
})(window);
