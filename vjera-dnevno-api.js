/* PatriaSoul — jedini izvor dnevnih podataka za Vjeru.
 * Čita dnevno Evanđelje i kalendarski spomendan iz Catholic Readings API-ja.
 * Stranice same odlučuju što prikazuju: Evanđelje ili samo svetca dana.
 */
const API='https://cpbjr.github.io/catholic-readings-api';
const MONTHS=['siječnja','veljače','ožujka','travnja','svibnja','lipnja','srpnja','kolovoza','rujna','listopada','studenoga','prosinca'];

function dateKey(date=new Date()){
  const d=new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function prettyDate(key){
  const [year,month,day]=key.split('-').map(Number);
  return `${day}. ${MONTHS[month-1]} ${year}.`;
}

async function json(url){
  const response=await fetch(url,{cache:'no-store'});
  if(!response.ok) throw new Error(`Dnevni izvor HTTP ${response.status}`);
  return response.json();
}

function saintName(value){
  const name=String(value||'').trim();
  if(!name) return '';
  if(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday) of the /i.test(name)) return '';
  return name
    .replace(/^Saint\s+/i,'Sv. ')
    .replace(/^Blessed\s+/i,'Bl. ')
    .replace(/,\s*(Priest|Bishop|Pope|Virgin|Martyr|Deacon|Doctor of the Church|Religious|Nun|Friar|Abbot).*$/i,'');
}

export async function getDailyData(date=new Date()){
  const key=dateKey(date);
  if(!key.startsWith('2026-')) throw new Error('Dnevni izvor trenutno je pripremljen za 2026. godinu.');
  const suffix=key.slice(5);
  const readings=await json(`${API}/readings/2026/${suffix}.json`);
  let calendar=null;
  try{calendar=await json(`${API}/liturgical-calendar/2026/${suffix}.json`);}catch(_){/* Evanđelje ostaje dostupno i bez kalendara. */}
  const reading=readings?.readings||{};
  const celebration=calendar?.celebration||{};
  return {
    date:key,
    prettyDate:prettyDate(key),
    gospel:reading.gospel||'',
    firstReading:reading.firstReading||'',
    psalm:reading.psalm||'',
    secondReading:reading.secondReading||'',
    season:readings?.season||calendar?.season||'',
    saint:saintName(celebration.name),
    sourceUrl:readings?.usccbLink||`${API}/readings/2026/${suffix}.json`,
    calendarSourceUrl:`${API}/liturgical-calendar/2026/${suffix}.json`
  };
}

export {dateKey,prettyDate};
