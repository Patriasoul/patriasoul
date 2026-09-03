/* PatriaSoul — Dnevna liturgija 2026
 * Primarni izvor: Catholic Readings API (2026), uz lokalni fallback iz vjera.js.
 */
const API_BASE='https://cpbjr.github.io/catholic-readings-api';
const MONTHS=['siječnja','veljače','ožujka','travnja','svibnja','lipnja','srpnja','kolovoza','rujna','listopada','studenoga','prosinca'];
function isoDate(date=new Date()){
  const d=new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function prettyDate(key){const [y,m,d]=key.split('-').map(Number);return `${d}. ${MONTHS[m-1]} ${y}.`}
function endpoint(kind,key){return `${API_BASE}/${kind}/2026/${key.slice(5)}.json`}
async function getJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}
function translateSeason(v){return ({'Ordinary Time':'Vrijeme kroz godinu','Advent':'Došašće','Christmas':'Božićno vrijeme','Lent':'Korizma','Easter':'Uskrsno vrijeme'})[v]||v||''}
function cleanSaint(name){return String(name||'').replace(/,\s*(Priest|Bishop|Pope|Virgin|Martyr|Deacon|Doctor of the Church|Religious|Nun|Friar|Abbot).*$/i,'').replace(/^Saint\s+/i,'Sv. ').replace(/^Blessed\s+/i,'Bl. ')}
export async function getVjeraDnevnoOnline(date=new Date()){
  const key=isoDate(date);
  if(!key.startsWith('2026-'))return null;
  const [readings,calendar]=await Promise.all([getJson(endpoint('readings',key)),getJson(endpoint('liturgical-calendar',key))]);
  const r=readings?.readings||{}; const c=calendar?.celebration||{};
  return {date:prettyDate(key),isoDate:key,saint:cleanSaint(c.name)||'Liturgijski dan',celebration:c.type||'Liturgijski spomendan',gospel:r.gospel||'',gospelTitle:'Evanđelje dana',firstReading:r.firstReading||'',psalm:r.psalm||'',secondReading:r.secondReading||'',season:translateSeason(readings?.season||calendar?.season),reflection:'Današnja Božja riječ poziva nas da zastanemo, poslušamo i dopustimo da nas Evanđelje vodi u konkretnom životu.',source:'Catholic Readings API — 2026',sourceUrl:readings?.usccbLink||`${API_BASE}/readings/2026/${key.slice(5)}.json`,saintImage:c.image||''};
}
export function todayKey(){return isoDate(new Date())}
export {isoDate,prettyDate};
