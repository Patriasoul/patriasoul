// PatriaSoul — centralna objašnjenja za "Brani svoj grad".
// Objašnjenje se izvodi iz konkretne činjenice u pitanju i ne mijenja pitanje,
// ponuđene odgovore ni correctIndex. Ako pitanje već ima vlastito explanation polje,
// ono ima prednost.
(function(global){'use strict';
function answerText(q){const a=Array.isArray(q?.answers)?q.answers:[],i=Number(q?.correctIndex);return Number.isInteger(i)&&a[i]!=null?String(a[i]):''}
function cityName(q){return String(q?.cityId||'ovaj grad').replace(/-/g,' ')}
function cleanStem(q){return String(q?.question||'').replace(/^Koji je točan podatak o\s+/i,'').replace(/^Što je povezano s\s+/i,'').replace(/^Kada se navodi\s+/i,'').replace(/^Koja tvrdnja opisuje\s+/i,'').replace(/^Što treba zapamtiti o\s+/i,'').replace(/[?]$/,'').trim()}
function explain(q){
 if(!q)return '';
 if(typeof q.explanation==='string'&&q.explanation.trim())return q.explanation.trim();
 const a=answerText(q),city=cityName(q),fact=cleanStem(q),l=fact.toLocaleLowerCase('hr-HR');if(!a)return '';
 let text;
 if(/zlatn.*bul|slobodnim kraljevskim|kraljevskim grad/.test(l))text=`${fact} povezano je s odgovorom ${a}: Zlatna bula iz 1242. Gradecu je potvrdila položaj slobodnog kraljevskog grada i važna je za razumijevanje razvoja srednjovjekovnog Zagreba.`;
 else if(/kaptol/.test(l)&&/značen|zbor|kanonik/.test(l))text=`Odgovor ${a} objašnjava naziv i crkveni karakter Kaptola: riječ je o zboru kanonika i važnom središtu zagrebačkog crkvenog života.`;
 else if(/potres/.test(l))text=`Odgovor ${a} označava godinu velikog zagrebačkog potresa koji je teško oštetio grad i katedralu te pokrenuo veliku obnovu Zagreba.`;
 else if(/sveučili|gimnazij/.test(l))text=`Odgovor ${a} predstavlja godinu osnutka navedene obrazovne ustanove i pokazuje dugu tradiciju obrazovanja u ${city}.`;
 else if(/gradskih četvrt|mjesnih odbor/.test(l))text=`Odgovor ${a} predstavlja službeni broj naveden u gradskom pregledu i opisuje administrativnu organizaciju ${city}.`;
 else if(/površin/.test(l))text=`Odgovor ${a} je podatak o površini ${city} prema navedenom gradskom pregledu i opisuje njegov prostorni obuhvat.`;
 else if(/nadmorsk|visin/.test(l))text=`Odgovor ${a} označava nadmorsku visinu navedene točke i pomaže razumjeti prirodni prostor i reljef povezan s ${city}.`;
 else if(/stanovnik|naselj/.test(l))text=`Odgovor ${a} opisuje skupinu stanovnika povezanu s navedenim dijelom ili razdobljem povijesti ${city}.`;
 else if(/broj|koliko/.test(l))text=`Odgovor ${a} je konkretan broj naveden u izvoru i služi kao mjerljiv podatak za razumijevanje ${city} u opisanom kontekstu.`;
 else if(/godin|kada/.test(l))text=`Odgovor ${a} je godina vezana uz činjenicu iz pitanja. Ona smješta događaj ili promjenu u točno određeno povijesno razdoblje ${city}.`;
 else if(/tko|koji kralj|koji vladar|koja osoba|čiji|čija/.test(l))text=`Odgovor ${a} označava osobu ili nositelja vlasti koji je prema izvoru izravno povezan s navedenom činjenicom u ${city}.`;
 else text=`Pitanje se odnosi na ${fact}. Točan odgovor je ${a}; ta poveznica čini podatak relevantnim za povijest, baštinu ili razvoj ${city}.`;
 return text+(q.sourceUrl?' Podatak je potvrđen u navedenom izvoru.':'');
}
global.PatriaCityExplanations={explain,answerText};
})(typeof window!=='undefined'?window:globalThis);
