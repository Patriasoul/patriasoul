/* PatriaSoul – široka vremenska traka. Ubacivanje: <div data-ps-weather-strip></div> + ovaj JS + vrijeme-traka.css */
(function(){
  const root=document.querySelector('[data-ps-weather-strip]');
  if(!root) return;
  const FEED='weather-feed.json';
  const CITIES='weather-cities.json';
  const fmtTemp=v=>v===null||v===undefined||v===''?'—':`${Math.round(Number(v))}°C`;
  const escape=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const icon=s=>{s=String(s||'').toLowerCase();if(/grmlj|oluj|munj/.test(s))return '⛈️';if(/kiš|obor/.test(s))return '🌧️';if(/snij|susnje/.test(s))return '🌨️';if(/oblač|naobla/.test(s))return '☁️';if(/magl/.test(s))return '🌫️';if(/vedr|sunč/.test(s))return '☀️';return '🌤️'};
  let feed=null,cities=[];
  function render(list,located){
    const cards=list.slice(0,4).map((x,i)=>{const name=x.name||x.city||'Lokacija';const weather=x.weather||x;const desc=weather.description||weather.condition||weather.text||'Podaci dostupni';const temp=weather.temperature??weather.temp;const min=weather.min??weather.minTemp;const max=weather.max??weather.maxTemp;const href=x.url||`grad.html?grad=${encodeURIComponent(name)}`;return `<a class="ps-weather-strip__card ${i===0?'is-primary':''}" href="${escape(href)}"><div class="ps-weather-strip__city"><strong>${i===0&&located?'📍 ':''}${escape(name)}</strong><span class="ps-weather-strip__near">${i===0&&located?'Tvoja lokacija':'U blizini'}</span></div><div class="ps-weather-strip__main"><span class="ps-weather-strip__icon">${icon(desc)}</span><span class="ps-weather-strip__temp">${fmtTemp(temp)}</span></div><div class="ps-weather-strip__desc">${escape(desc)}</div><div class="ps-weather-strip__meta"><span>↓ ${fmtTemp(min)}</span><span>↑ ${fmtTemp(max)}</span></div></a>`}).join('');
    root.innerHTML=`<div class="ps-weather-strip"><div class="ps-weather-strip__head"><span class="ps-weather-strip__title">🌤️ Vrijeme u tvojoj blizini</span><span class="ps-weather-strip__source">Izvor: DHMZ</span></div><div class="ps-weather-strip__viewport"><div class="ps-weather-strip__track">${cards||'<div class="ps-weather-strip__loading">Vremenski podaci trenutno nisu dostupni.</div>'}</div></div><div class="ps-weather-strip__actions"><button type="button" class="ps-weather-strip__button" data-weather-location>📍 Moja lokacija</button><a class="ps-weather-strip__button" href="vrijeme.html">Detaljno vrijeme →</a></div></div>`;
    root.querySelector('[data-weather-location]')?.addEventListener('click',locate);
  }
  function allCities(){return cities.map(c=>({...c,weather:feed?.cities?.[c.id]||feed?.[c.id]||{}})).filter(x=>x.name);}
  function nearest(lat,lon){return allCities().map(c=>({...c,d:Math.hypot((Number(c.lat)-lat)*111,(Number(c.lon)-lon)*Math.cos(lat*Math.PI/180)*111)})).sort((a,b)=>a.d-b.d);}
  function locate(){if(!navigator.geolocation){render(allCities(),false);return}navigator.geolocation.getCurrentPosition(p=>render(nearest(p.coords.latitude,p.coords.longitude),true),()=>render(allCities(),false),{enableHighAccuracy:false,maximumAge:900000,timeout:8000});}
  Promise.all([fetch(FEED+'?v='+Date.now(),{cache:'no-store'}).then(r=>r.json()),fetch(CITIES+'?v='+Date.now(),{cache:'no-store'}).then(r=>r.json())]).then(([f,c])=>{feed=f;cities=Array.isArray(c)?c:(c.cities||[]);root.innerHTML='<div class="ps-weather-strip"><div class="ps-weather-strip__loading">🌤️ Učitavanje vremena…</div></div>';locate();}).catch(()=>{root.innerHTML='<div class="ps-weather-strip"><div class="ps-weather-strip__error"><strong>Vrijeme</strong><br>Trenutni podaci nisu dostupni. Pokušaj ponovno kasnije.</div></div>'});
})();