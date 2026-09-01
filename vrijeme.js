// PatriaSoul Vrijeme — lokacija korisnika + 4 najbliža grada + DHMZ upozorenja
// Jedan izvor podataka: weather-cities.json + weather-feed.json.
(function(){
  'use strict';

  const FEED = 'weather-feed.json';
  const CITIES = 'weather-cities.json';
  const $ = id => document.getElementById(id);

  let cities = [];
  let feed = { stations: {}, alerts: [] };

  const esc = value => String(value ?? '').replace(/[&<>\"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\"': '&quot;'
  }[char]));

  const normalize = value => String(value ?? '').trim().toLocaleLowerCase('hr-HR');

  function distanceKm(lat1, lon1, lat2, lon2){
    const R = 6371;
    const rad = value => value * Math.PI / 180;
    const p1 = rad(lat1), p2 = rad(lat2);
    const dp = rad(lat2 - lat1), dl = rad(lon2 - lon1);
    const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function nearest(lat, lon){
    return cities
      .filter(city => Number.isFinite(Number(city.lat)) && Number.isFinite(Number(city.lon)))
      .map(city => ({ ...city, distance: distanceKm(lat, lon, Number(city.lat), Number(city.lon)) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);
  }

  function icon(condition){
    const text = normalize(condition);
    if(text.includes('grmljav')) return '⛈️';
    if(text.includes('pljus') || text.includes('kiš')) return '🌧️';
    if(text.includes('snij')) return '❄️';
    if(text.includes('magl')) return '🌫️';
    if(text.includes('obla')) return '☁️';
    if(text.includes('vedr') || text.includes('sunč')) return '☀️';
    return '🌤️';
  }

  function stationFor(city){
    if(!city) return null;
    const stations = feed?.stations || {};
    return stations[city.station] || stations[city.name] || stations[normalize(city.name)] || null;
  }

  function formatTemperature(value){
    if(value === null || value === undefined || value === '') return '—';
    const number = Number(value);
    return Number.isFinite(number) ? `${Math.round(number)}°C` : '—';
  }

  function card(city, index){
    const weather = stationFor(city);
    const main = index === 0;
    const distance = Number.isFinite(Number(city.distance))
      ? (index === 0 ? '📍 Odabrana lokacija' : `U blizini · ${Number(city.distance).toFixed(1)} km`)
      : '📍 Hrvatska';

    return `<article class="wx-card ${main ? 'wx-main' : ''}">
      <div class="wx-card-top">
        <span class="wx-distance">${esc(distance)}</span>
        <span class="wx-source">DHMZ</span>
      </div>
      <div class="wx-city">
        <h2>${esc(city.name)}</h2>
        <span class="wx-icon" aria-hidden="true">${icon(weather?.condition)}</span>
      </div>
      <div class="wx-temp">${esc(formatTemperature(weather?.temp))}</div>
      <p class="wx-condition">${esc(weather?.condition || 'Podaci se učitavaju…')}</p>
      <div class="wx-details">
        <span>💨 ${esc(weather?.wind || '—')}</span>
        <span>💧 ${weather?.humidity != null ? esc(weather.humidity) + '%' : '—'}</span>
      </div>
      <a class="wx-city-link" href="grad.html?city=${encodeURIComponent(city.name)}">Profil grada →</a>
    </article>`;
  }

  function render(list, label){
    const container = $('wx-list');
    if(!container) return;

    const safeList = Array.isArray(list) ? list.filter(Boolean).slice(0, 4) : [];
    if(!safeList.length){
      container.innerHTML = '<div class="wx-empty">Nema dostupnih lokacija za prikaz.</div>';
      if($('wx-count')) $('wx-count').textContent = 'Podaci trenutno nisu dostupni.';
      return;
    }

    container.innerHTML = safeList.map(card).join('');
    if($('wx-count')) $('wx-count').textContent = label || `Prikazane su ${safeList.length} najbliže lokacije.`;
  }

  function renderAlerts(){
    const box = $('wx-alerts');
    if(!box) return;

    const alerts = Array.isArray(feed?.alerts) ? feed.alerts.filter(Boolean) : [];
    if(!alerts.length){
      box.hidden = true;
      box.innerHTML = '';
      return;
    }

    box.hidden = false;
    box.innerHTML = `<strong>🚨 DHMZ upozorenja</strong><ul>${alerts.slice(0, 5).map(alert => `<li>${esc(typeof alert === 'object' ? (alert.text || alert.description || alert.message || '') : alert)}</li>`).join('')}</ul>`;
  }

  function populateCitySelect(){
    const select = $('wx-city');
    if(!select || !cities.length) return;

    const current = new URLSearchParams(location.search).get('city');
    const fragment = document.createDocumentFragment();

    cities
      .filter(city => city?.name)
      .sort((a, b) => String(a.name).localeCompare(String(b.name), 'hr'))
      .forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        if(current && normalize(current) === normalize(city.name)) option.selected = true;
        fragment.appendChild(option);
      });

    select.appendChild(fragment);
  }

  function showStatus(text){
    const location = $('wx-location');
    if(location) location.textContent = text;
  }

  function chooseCity(){
    const params = new URLSearchParams(location.search);
    const wanted = params.get('city');

    if(wanted){
      const selected = cities.find(city => normalize(city.name) === normalize(wanted));
      if(selected){
        const nearby = cities
          .filter(city => city !== selected && Number.isFinite(Number(city.lat)) && Number.isFinite(Number(city.lon)))
          .map(city => ({ ...city, distance: distanceKm(Number(selected.lat), Number(selected.lon), Number(city.lat), Number(city.lon)) }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3);
        render([selected, ...nearby], `Prikazano je vrijeme za ${selected.name} i 3 najbliža grada.`);
        showStatus(`📍 ${selected.name} i okolica`);
        return;
      }
    }

    if(!navigator.geolocation){
      showStatus('📍 Lokacija nije dostupna — odaberi grad');
      render(cities.slice(0, 4), 'Prikazane su početne lokacije.');
      return;
    }

    showStatus('📍 Tražim tvoju lokaciju…');
    navigator.geolocation.getCurrentPosition(
      position => {
        const list = nearest(position.coords.latitude, position.coords.longitude);
        showStatus('📍 Vrijeme u tvojoj blizini · lokacija se ne sprema');
        render(list, 'Prikazane su 4 lokacije najbliže tvojoj poziciji.');
      },
      () => {
        showStatus('📍 Lokacija nije dopuštena — odaberi grad');
        render(cities.slice(0, 4), 'Prikazane su početne lokacije.');
      },
      { enableHighAccuracy: false, timeout: 9000, maximumAge: 900000 }
    );
  }

  async function fetchJson(url){
    const response = await fetch(`${url}?v=${Date.now()}`, { cache: 'no-store' });
    if(!response.ok) throw new Error(`Neuspješno učitavanje: ${url} (${response.status})`);
    return response.json();
  }

  async function init(){
    try{
      [cities, feed] = await Promise.all([fetchJson(CITIES), fetchJson(FEED)]);
      cities = Array.isArray(cities) ? cities : [];
      feed = feed && typeof feed === 'object' ? feed : { stations: {}, alerts: [] };

      populateCitySelect();
      renderAlerts();

      if($('wx-updated')){
        const date = feed.updatedAt ? new Date(feed.updatedAt) : null;
        $('wx-updated').textContent = date && !Number.isNaN(date.getTime())
          ? `Ažurirano ${date.toLocaleString('hr-HR')}`
          : 'Čeka se prvo osvježavanje podataka';
      }

      chooseCity();
    }catch(error){
      console.error('[PatriaSoul Vrijeme]', error);
      if($('wx-list')) $('wx-list').innerHTML = '<div class="wx-empty">Vrijeme se trenutno ne može učitati. Provjeri vezu i pokušaj ponovno.</div>';
      showStatus('⚠️ Podaci o vremenu trenutno nisu dostupni');
      if($('wx-updated')) $('wx-updated').textContent = 'Greška pri učitavanju podataka';
    }
  }

  function bind(){
    const locate = $('wx-locate');
    if(locate) locate.addEventListener('click', chooseCity);

    const city = $('wx-city');
    if(city){
      city.addEventListener('change', event => {
        const value = event.target.value;
        if(value) location.href = `vrijeme.html?city=${encodeURIComponent(value)}`;
      });
    }

    init();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true });
  else bind();
})();
