/* PatriaSoul — Dnevna liturgija 2026
 * Primarni izvor: Catholic Readings API (2026).
 * Liturgijske podatke treba provjeravati prema službenom nacionalnom kalendaru HBK.
 * PatriaSoul prikazuje dnevne liturgijske nazive na hrvatskom jeziku.
 */
const API_BASE='https://cpbjr.github.io/catholic-readings-api';
const MONTHS=['siječnja','veljače','ožujka','travnja','svibnja','lipnja','srpnja','kolovoza','rujna','listopada','studenoga','prosinca'];
const WEEKDAYS=['nedjelja','ponedjeljak','utorak','srijeda','četvrtak','petak','subota'];
const ORDINALS={first:'1.',second:'2.',third:'3.',fourth:'4.',fifth:'5.',sixth:'6.',seventh:'7.',eighth:'8.',ninth:'9.',tenth:'10.',eleventh:'11.',twelfth:'12.',thirteenth:'13.',fourteenth:'14.',fifteenth:'15.',sixteenth:'16.',seventeenth:'17.',eighteenth:'18.',nineteenth:'19.',twentieth:'20.',twenty-first:'21.',twenty-second:'22.',twenty-third:'23.',twenty-fourth:'24.',twenty-fifth:'25.',twenty-sixth:'26.',twenty-seventh:'27.',twenty-eighth:'28.',twenty-ninth:'29.',thirtieth:'30.',thirty-first:'31.',thirty-second:'32.',thirty-third:'33.',thirty-fourth:'34.'};
function isoDate(date=new Date()){
  const d=new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function prettyDate(key){const [y,m,d]=key.split('-').map(Number);return `${d}. ${MONTHS[m-1]} ${y}.`}
function endpoint(kind,key){return `${API_BASE}/${kind}/2026/${key.slice(5)}.json`}
async function getJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}
function translateSeason(v){return ({'Ordinary Time':'Vrijeme kroz godinu','Advent':'Došašće','Christmas':'Božićno vrijeme','Lent':'Korizma','Easter':'Uskrsno vrijeme'})[v]||v||''}
function translateType(v){return ({'FERIA':'Ferijalni dan','Feria':'Ferijalni dan','SOLEMNITY':'Svetkovina','Solemnity':'Svetkovina','FEAST':'Blagdan','Feast':'Blagdan','MEMORIAL':'Spomendan','Memorial':'Spomendan','OPTIONAL MEMORIAL':'Neobvezatni spomendan','Optional Memorial':'Neobvezatni spomendan','SUNDAY':'Nedjelja'})[String(v||'').trim()]||v||'Liturgijski dan'}
function translateLiturgicalName(name){
  const value=String(name||'').trim();
  if(!value)return '';
  const match=value.match(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday) of the (first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth|twenty-first|twenty-second|twenty-third|twenty-fourth|twenty-fifth|twenty-sixth|twenty-seventh|twenty-eighth|twenty-ninth|thirtieth|thirty-first|thirty-second|thirty-third|thirty-fourth) week of Ordinary Time$/i);
  if(match){
    const weekday={Sunday:'Nedjelja',Monday:'Ponedjeljak',Tuesday:'Utorak',Wednesday:'Srijeda',Thursday:'Četvrtak',Friday:'Petak',Saturday:'Subota'}[match[1]];
    const ordinal=ORDINALS[match[2].toLowerCase()]||match[2];
    return `${weekday} ${ordinal} tjedna kroz godinu`;
  }
  return value.replace(/^Saint\s+/i,'Sv. ').replace(/^Blessed\s+/i,'Bl. ');
}
function cleanSaint(name){
  const value=String(name||'').trim();
  if(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday) of the .* week of Ordinary Time$/i.test(value))return '';
  return value.replace(/,\s*(Priest|Bishop|Pope|Virgin|Martyr|Deacon|Doctor of the Church|Religious|Nun|Friar|Abbot).*$/i,'').replace(/^Saint\s+/i,'Sv. ').replace(/^Blessed\s+/i,'Bl. ');
}
export async function getVjeraDnevnoOnline(date=new Date()){
  const key=isoDate(date);
  if(!key.startsWith('2026-'))return null;
  const [readings,calendar]=await Promise.all([getJson(endpoint('readings',key)),getJson(endpoint('liturgical-calendar',key))]);
  const r=readings?.readings||{}; const c=calendar?.celebration||{};
  const liturgicalName=translateLiturgicalName(c.name);
  const saint=cleanSaint(c.name);
  const type=translateType(c.type);
  return {date:prettyDate(key),isoDate:key,saint:saint||'Liturgijski dan',liturgicalName,celebration:type,gospel:r.gospel||'',gospelTitle:'Evanđelje dana',firstReading:r.firstReading||'',psalm:r.psalm||'',secondReading:r.secondReading||'',season:translateSeason(readings?.season||calendar?.season),isFeria:!saint&&!!liturgicalName,reflection:'Današnja Božja riječ poziva nas da zastanemo, poslušamo i dopustimo da nas Evanđelje vodi u konkretnom životu.',source:'Catholic Readings API — 2026',sourceUrl:readings?.usccbLink||`${API_BASE}/readings/2026/${key.slice(5)}.json`,saintImage:c.image||''};
}
export function todayKey(){return isoDate(new Date())}
export {isoDate,prettyDate};
