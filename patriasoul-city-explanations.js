// PatriaSoul — centralna objašnjenja za "Brani svoj grad".
// Svako pitanje dobiva objašnjenje bez mijenjanja pitanja, odgovora ili correctIndex.
(function(global){'use strict';
  function cityName(q){
    return q?.cityId ? String(q.cityId).replace(/-/g,' ') : 'ovaj grad';
  }
  function answerText(q){
    const answers=Array.isArray(q?.answers)?q.answers:[];
    const i=Number(q?.correctIndex);
    return Number.isInteger(i)&&answers[i]!=null?String(answers[i]):'';
  }
  function explain(q){
    if(!q) return '';
    if(typeof q.explanation==='string'&&q.explanation.trim()) return q.explanation.trim();
    const a=answerText(q), city=cityName(q), source=q.sourceUrl?' navedenom izvoru':'';
    const question=String(q.question||'').toLocaleLowerCase('hr-HR');
    let text;
    if(/godin|koje godine|kada/.test(question)){
      text=`Točan odgovor je ${a}. Taj je vremenski podatak važan za razumijevanje razvoja ${city} i potvrđen je u${source}.`;
    }else if(/tko|koji kralj|koji vladar|koja osoba|čiji|čija/.test(question)){
      text=`Točan odgovor je ${a}. Riječ je o osobi ili nositelju vlasti izravno povezanom s navedenim događajem ili razdobljem u ${city}; podatak je potvrđen u${source}.`;
    }else if(/gdje|lokacij|mjesto|nalazi/.test(question)){
      text=`Točan odgovor je ${a}. Lokacija je važna jer povezuje navedenu činjenicu s prostorom i razvojem ${city}; podatak je potvrđen u${source}.`;
    }else if(/koliko|broj|broja/.test(question)){
      text=`Točan odgovor je ${a}. Ovaj broj predstavlja konkretan povijesni ili gradski podatak za ${city} i potvrđen je u${source}.`;
    }else{
      text=`Točan odgovor je ${a}. Ova činjenica izravno se odnosi na povijest, baštinu, razvoj ili identitet ${city} i potvrđena je u${source}.`;
    }
    return text;
  }
  global.PatriaCityExplanations={explain,answerText};
})(typeof window!=='undefined'?window:globalThis);
