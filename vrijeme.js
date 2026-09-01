// PatriaSoul Vrijeme — lokacija korisnika + 4 najbliža grada
(function(){
  const FEED='weather-feed.json';
  const CITIES='weather-cities.json';
  const $=id=>document.getElementById(id);
  let cities=[], feed={stations:{}};
  const esc=s=>String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
  const km=(a,b,c,d)=>{const R=6371,rad=x=>x*Math.PI/180, p1=rad(a),p2=rad(c),dp=rad(c-a),dl=rad(d-b);const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return R*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));};
  function nearest(lat,lon){return cities.map(c=>({...c,distance:km(lat,lon,c.lat,c.lon)})).sort((a,b)=>a.distance-b.distance).slice(0,4)}
  function icon(s){s=(s||'').toLocaleLowerCase('hr-HR');if(s.includes('grmljav'))return '⛈️';if(s.includes('pljus')||s.includes('kiš'))return '🌧️';if(s.includes('snij'))return '❄️';if(s.includes('obla'))return '☁️';if(s.includes('magl'))return '🌫️';if(s.includes('vedr')||s.includes('sunč'))return '☀️';return '🌤️'}
  function stationFor(city){return feed.stations?.[city.station]||null}
  function card(c,i){const w=stationFor(c), main=i===0;return `<article class="wx-card ${main?'wx-main':''}"><div class="wx-card-top"><span class="wx-distance">${i===0?'📍 Tvoja lokacija':`U blizini · ${c.distance.toFixed(1)} km`}</span><span class="wx-source">DHMZ</span></div><div class="wx-city"><h2>${esc(c.name)}</h2><span class="wx-icon">${icon(w?.condition)}</span></div><div class="wx-temp">${w?.temp!=null?esc(w.temp)+'°C':'—'}</div><p class="wx-condition">${esc(w?.condition||'Podaci se učitavaju…')}</p><div class="wx-details"><span>💨 ${esc(w?.wind||'—')}</span><span>💧 ${w?.humidity!=null?esc(w.humidity)+'%':'—'}</span></div><a class="wx-city-link" href="grad.html?city=${encodeURIComponent(c.name)}">Profil grada →</a></article>`}
  function render(list){$('wx-list').innerHTML=list.map(card).join('');$('wx-count').textContent=`Prikazane su 4 lokacije najbliže tvojoj poziciji.`;}
  function chooseCity(){const params=new URLSearchParams(location.search), wanted=params.get('city');if(wanted){const c=cities.find(x=>x.name.toLocaleLowerCase('hr-HR')===wanted.toLocaleLowerCase('hr-HR'));if(c){render([c,...cities.filter(x=>x.name!==c.name).map(x=>({...x,distance:km(c.lat,c.lon,x.lat,x.lon)})).sort((a,b)=>a.distance-b.distance).slice(0,3)]);$('wx-location').textContent=`📍 ${c.name} i okolica`;return;}}
    if(!navigator.geolocation){$('wx-location').textContent='📍 Lokacija nije dostupna — odaberi grad';render(cities.slice(0,4));return}
    navigator.geolocation.getCurrentPosition(pos=>{const list=nearest(pos.coords.latitude,pos.coords.longitude);render(list);$('wx-location').textContent=`📍 Vrijeme u tvojoj blizini · lokacija se ne sprema`;},()=>{ $('wx-location').textContent='📍 Lokacija nije dopuštena — odaberi grad';render(cities.slice(0,4));},{enableHighAccuracy:false,timeout:9000,maximumAge:900000});
  }
  async function init(){try{[cities,feed]=await Promise.all([fetch(CITIES+'?v='+Date.now()).then(r=>r.json()),fetch(FEED+'?v='+Date.now()).then(r=>r.json())]);$('wx-updated').textContent=feed.updatedAt?`Ažurirano ${new Date(feed.updatedAt).toLocaleString('hr-HR')}`:'Čeka se prvo osvježavanje podataka';chooseCity();}catch(e){$('wx-list').innerHTML='<div class="wx-empty">Vrijeme se trenutno ne može učitati. Pokušaj ponovno.</div>'}}
  document.addEventListener('DOMContentLoaded',()=>{ $('wx-locate').addEventListener('click',()=>chooseCity()); $('wx-city').addEventListener('change',e=>{location.href='vrijeme.html?city='+encodeURIComponent(e.target.value)}); init(); });
})();
