/* PatriaSoul AI — Local Answer Engine v2
 * Knowledge-only. No external AI provider, no API key, no remote inference.
 * Answers are composed only from trusted PatriaSoul Knowledge Base records.
 */
(function (global) {
  'use strict';

  const TRUSTED = new Set(['verified', 'published']);
  const STOPWORDS = new Set([
    'ali','ako','biti','bio','bila','bilo','bili','bile','što','sta','kako','kada',
    'gdje','gde','koji','koja','koje','koju','tko','ko','je','su','sam','si','smo',
    'ste','se','na','u','iz','za','od','do','o','i','ili','a','s','sa','po','kod',
    'kroz','te','to','taj','ta','ti','ovo','ova','može','moze','li','ima','imaju',
    'imao','imala','imali','znas','znaš','znati','reci','reci mi','mi','nam','nama'
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
      .replace(/(ovima|evima|ama|ima|om|em|ovima|evima|ov|ev|an|en|na|ne|ni|nu|no|og|oj|im|um|u|a|e|i|o)$/i, '')
      .slice(0, 8);
  }

  function splitSentences(value) {
    const text = clean(value);
    return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  }

  function sentenceScore(sentence, questionWords) {
    const sentenceWords = meaningfulWords(sentence);
    if (!sentenceWords.length || !questionWords.length) return 0;

    let score = 0;
    let uniqueMatches = 0;

    questionWords.forEach(word => {
      const wordStem = stem(word);
      let matched = false;
      sentenceWords.forEach(candidate => {
        const candidateStem = stem(candidate);
        if (candidate === word) score += 7;
        else if (candidate.startsWith(word) || word.startsWith(candidate)) score += 4;
        else if (wordStem.length >= 4 && candidateStem === wordStem) score += 4;
        else return;
        matched = true;
      });
      if (matched) uniqueMatches += 1;
    });

    if (!uniqueMatches) return 0;
    if (questionWords.length >= 3 && uniqueMatches === 1) return 0;
    return score + uniqueMatches * 5;
  }

  function isOverviewQuestion(question) {
    const text = normalize(question);
    return /\b(sto znas|sta znas|reci mi|ispricaj|opisi|tko je|sto je|sta je)\b/.test(text);
  }

  function compose(question, context) {
    const records = (Array.isArray(context) ? context : [])
      .filter(item => item && TRUSTED.has(item.status))
      .slice(0, 8);

    if (!records.length) return fallback(false);

    const questionWords = meaningfulWords(question);
    if (!questionWords.length) return fallback(false);

    const overview = isOverviewQuestion(question);
    const ranked = [];
    const seenSentences = new Set();

    records.forEach((record, recordIndex) => {
      const content = clean(record.content || record.text);
      splitSentences(content).forEach(sentence => {
        const normalized = normalize(sentence);
        if (normalized.length < 30 || seenSentences.has(normalized)) return;

        const matchScore = sentenceScore(sentence, questionWords);
        if (matchScore <= 0) return;

        const cityBonus = record.cityId && questionWords.some(word => {
          const city = normalize(record.cityId);
          return city.includes(stem(word)) || stem(word).includes(city);
        }) ? 8 : 0;

        ranked.push({
          sentence: clean(sentence),
          record,
          score: matchScore + cityBonus + Math.max(0, 4 - recordIndex),
          recordIndex
        });
      });
    });

    ranked.sort((a, b) => b.score - a.score);
    if (!ranked.length) return fallback(false);

    const selected = [];
    const usedRecords = new Set();
    const usedThemes = new Set();
    const maxSentences = overview ? 5 : 4;

    for (const item of ranked) {
      if (selected.length >= maxSentences) break;
      const normalized = normalize(item.sentence);
      if (selected.some(s => normalize(s) === normalized)) continue;

      // For overview questions, prefer different records so the answer is not
      // six nearly identical sentences from one record.
      if (overview && usedRecords.has(item.record) && usedRecords.size < 3) continue;

      const firstWord = meaningfulWords(item.sentence)[0] || '';
      if (overview && firstWord && usedThemes.has(stem(firstWord)) && selected.length < 3) continue;

      selected.push(item.sentence);
      usedRecords.add(item.record);
      if (firstWord) usedThemes.add(stem(firstWord));
    }

    // If diversity filtering was too strict, fill from the ranked list.
    if (selected.length < Math.min(overview ? 3 : 2, ranked.length)) {
      for (const item of ranked) {
        if (selected.length >= maxSentences) break;
        if (!selected.some(s => normalize(s) === normalize(item.sentence))) {
          selected.push(item.sentence);
          usedRecords.add(item.record);
        }
      }
    }

    const sources = Array.from(usedRecords)
      .map(record => clean(record.sourceTitle || record.source || record.title))
      .filter((value, index, list) => value && list.indexOf(value) === index);

    const topScore = ranked[0].score;
    const coverage = Math.min(1, topScore / Math.max(10, questionWords.length * 7));

    return {
      text: selected.join(' ').trim(),
      provider: 'patriasoul-answer-engine',
      model: 'knowledge-only',
      usedKnowledgeBase: true,
      confidence: Math.min(0.96, Math.max(0.6, 0.6 + coverage * 0.36)),
      sources
    };
  }

  function fallback(hasContext) {
    return {
      text: hasContext
        ? 'U PatriaSoul bazi postoji povezani zapis, ali nema dovoljno izravnih podataka za pouzdan odgovor.'
        : 'U PatriaSoul bazi trenutno nema dovoljno potvrđenih podataka za pouzdan odgovor na ovo pitanje.',
      provider: 'patriasoul-answer-engine',
      model: 'knowledge-only',
      usedKnowledgeBase: false,
      confidence: 0,
      sources: []
    };
  }

  global.PatriaSoulAnswerEngine = Object.freeze({
    compose,
    version: '2.0.0'
  });
})(window);
