// PatriaSoul Vrijeme — Weather App UX + DHMZ podaci, bez geolokacije
(function(){
  'use strict';

  const FEED = 'weather-feed.json';
  const CITIES = 'weather-cities.json';
  const DEFAULT_CITY = 'Zagreb';
  const STORAGE_KEY = 'patriasoul-weather-city';
  const $ = id => document.getElementById(id);

  let cities = [];
  let feed = { stations: {}, alerts: [] };

  const esc = value => String(value ?? '').replace(/[&<>\"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;'
  }[char]));
  const normalize = value => String(value ?? '').trim().toLocaleLowerCase('hr-HR');

  function icon(condition){
    const text = normalize(condition);
    if(text.includes('grmljav') || text.includes('sijev')) return '⛈️';
    if(text.includes('pljus') || text.includes('kiš')) return '🌧️';
    if(text.includes('snij')) return '❄️';
    if(text.includes('magl')) return '🌫️';
    if(text.includes('obla')) return '☁️';
    if(text.includes('vedr') || text.includes('sunč')) return '☀️';
    return '🌤️';
  }

  function isDay(){
    const hour = new Date().getHours();
    return hour >= 6 && hour < 20;
  }

  function stationFor(city){
    if(!city) return null;
    const stations = feed?.stations || {};
    const station = city.station || '';
    const direct = stations[station] || stations[city.name] || stations[normalize(city.name)];
    if(direct) return direct;
    const target = normalize(station || city.name);
    const key = Object.keys(stations).find(name => {
      const candidate = normalize(name);
      return candidate === target || candidate.includes(target) || target.includes(candidate);
    });
    return key ? stations[key] : null;
  }

  function formatTemperature(value){
    if(value === null || value === undefined || value === '') return '—';
    const number = Number(value);
    return Number.isFinite(number) ? `${Math.round(number)}°C` : '—';
  }

  function formatWind(value){
    if(value === null || value === undefined || value === '') return '—';
    return String(value);
  }

  function card(city, featured){
    const weather = stationFor(city);
    return `<article class="wx-card ${featured ? 'wx-main' : ''}">
      <div class="wx-card-top"><span class="wx-region">${featured ? 'ODABRANO' : 'HRVATSKA'}</span><span class="wx-source">DHMZ</span></div>
      <div class="wx-city"><h2>${esc(city.name)}</h2><span class="wx-icon" aria-hidden="true">${icon(weather?.condition)}</span></div>
      <div class="wx-temp">${esc(formatTemperature(weather?.temp))}</div>
      <p class="wx-condition">${esc(weather?.condition || 'Podaci nisu dostupni')}</p>
      <div class="wx-details"><span>💨 ${esc(formatWind(weather?.wind))}</span><span>💧 ${weather?.humidity != null ? esc(weather.humidity) + '%' : '—'}</span></div>
      <a class="wx-city-link" href="grad.html?city=${encodeURIComponent(city.name)}">Profil grada →</a>
    </article>`;
  }

  function render(list, label){
    const container = $('wx-list');
    if(!container) return;
    const safeList = Array.isArray(list) ? list.filter(Boolean).slice(0, 12) : [];
    if(!safeList.length){
      container.innerHTML = '<div class="wx-empty">Nema dostupnih podataka za odabrani grad.</div>';
      if($('wx-count')) $('wx-count').textContent = 'Podaci trenutno nisu dostupni.';
      return;
    }
    container.innerHTML = safeList.map((city,index) => card(city,index === 0)).join('');
    if($('wx-count')) $('wx-count').textContent = label || `Prikazano ${safeList.length} lokacija.`;
  }

  function renderAlerts(){
    const box = $('wx-alerts');
    if(!box) return;
    const alerts = Array.isArray(feed?.alerts) ? feed.alerts.filter(Boolean) : [];
    if(!alerts.length){ box.hidden = true; box.innerHTML = ''; return; }
    box.hidden = false;
    box.innerHTML = `<strong>🚨 DHMZ upozorenja</strong><ul>${alerts.slice(0, 5).map(alert => `<li>${esc(typeof alert === 'object' ? (alert.text || alert.description || alert.message || '') : alert)}</li>`).join('')}</ul>`;
  }

  function findCity(name){
    return cities.find(city => normalize(city?.name) === normalize(name));
  }

  function setupWeatherAppControls(){
    const control = document.querySelector('.wx-control');
    const select = $('wx-city');
    if(!control || !select || $('wx-search')) return;

    const input = document.createElement('input');
    input.id = 'wx-search';
    input.className = 'wx-input';
    input.type = 'search';
    input.setAttribute('list','wx-city-list');
    input.placeholder = 'Upiši hrvatski grad…';
    input.autocomplete = 'off';
    input.setAttribute('aria-label','Upiši hrvatski grad');

    const list = document.createElement('datalist');
    list.id = 'wx-city-list';

    const button = document.createElement('button');
    button.id = 'wx-search-button';
    button.className = 'wx-button';
    button.type = 'button';
    button.textContent = 'Prikaži vrijeme';

    control.insertBefore(input, select);
    control.insertBefore(list, select);
    control.insertBefore(button, select);

    const submit = () => {
      const value = input.value.trim();
      if(!value) return;
      const city = findCity(value);
      if(city){
        localStorage.setItem(STORAGE_KEY, city.name);
        location.href = `vrijeme.html?city=${encodeURIComponent(city.name)}`;
        return;
      }
      const partial = cities.find(city => normalize(city.name).startsWith(normalize(value)));
      if(partial){
        input.value = partial.name;
        localStorage.setItem(STORAGE_KEY, partial.name);
        location.href = `vrijeme.html?city=${encodeURIComponent(partial.name)}`;
        return;
      }
      input.setCustomValidity('Grad nije pronađen. Odaberi hrvatski grad iz prijedloga.');
      input.reportValidity();
    };

    button.addEventListener('click', submit);
    input.addEventListener('keydown', event => {
      input.setCustomValidity('');
      if(event.key === 'Enter'){
        event.preventDefault();
        submit();
      }
    });
    input.addEventListener('input', () => input.setCustomValidity(''));
  }

  function populateCitySelect(){
    const select = $('wx-city');
    if(!select || !cities.length) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    const current = new URLSearchParams(location.search).get('city') || stored || DEFAULT_CITY;
    const sorted = [...cities].filter(city=>city?.name).sort((a,b)=>String(a.name).localeCompare(String(b.name),'hr'));
    select.innerHTML = '<option value="">Odaberi grad…</option>' + sorted.map(city => `<option value="${esc(city.name)}">${esc(city.name)}</option>`).join('');
    const selected = findCity(current) || findCity(DEFAULT_CITY) || sorted[0];
    if(selected) select.value = selected.name;

    const datalist = $('wx-city-list');
    if(datalist) datalist.innerHTML = sorted.map(city => `<option value="${esc(city.name)}"></option>`).join('');
    const search = $('wx-search');
    if(search) search.value = selected?.name || '';
  }

  function renderSelectedCity(){
    const params = new URLSearchParams(location.search);
    const stored = localStorage.getItem(STORAGE_KEY);
    const requested = params.get('city') || stored || DEFAULT_CITY;
    const selected = findCity(requested) || findCity(DEFAULT_CITY) || cities[0];
    if(!selected){ render([], 'Nema dostupnih gradova.'); return; }

    localStorage.setItem(STORAGE_KEY, selected.name);
    const weather = stationFor(selected);
    const day = isDay();
    const panel = $('wx-selected-panel');
    if(panel) panel.classList.toggle('is-day', day), panel.classList.toggle('is-night', !day);
    if($('wx-selected-city')) $('wx-selected-city').textContent = selected.name;
    if($('wx-selected-temp')) $('wx-selected-temp').textContent = formatTemperature(weather?.temp);
    if($('wx-selected-condition')) $('wx-selected-condition').textContent = weather?.condition || 'Podaci nisu dostupni';
    if($('wx-selected-icon')) $('wx-selected-icon').textContent = icon(weather?.condition);
    if($('wx-selected-wind')) $('wx-selected-wind').textContent = weather?.wind || '—';
    if($('wx-selected-humidity')) $('wx-selected-humidity').textContent = weather?.humidity != null ? `${weather.humidity}%` : '—';
    if($('wx-selected-station')) $('wx-selected-station').textContent = weather?.station || selected.station || 'DHMZ';
    if($('wx-location')) $('wx-location').textContent = `Prognoza i mjerenja za ${selected.name}`;
    if($('wx-day-state')) $('wx-day-state').textContent = day ? '☀️ DAN' : '🌙 NOĆ';

    render([selected], `Odabrano mjesto: ${selected.name}`);
  }

  function renderHighlights(){
    const names = ['Zagreb','Split','Rijeka','Osijek','Zadar','Šibenik','Dubrovnik','Pula'];
    const highlights = names.map(findCity).filter(Boolean);
    const container = $('wx-highlights');
    if(container) container.innerHTML = highlights.map(city => card(city,false)).join('');
  }

  async function fetchJson(url){
    const response = await fetch(`${url}?v=${Date.now()}`,{cache:'no-store'});
    if(!response.ok) throw new Error(`Neuspješno učitavanje: ${url} (${response.status})`);
    return response.json();
  }

  function bind(){
    const city = $('wx-city');
    if(city) city.addEventListener('change', event => {
      const value = event.target.value;
      if(value){
        localStorage.setItem(STORAGE_KEY, value);
        location.href = `vrijeme.html?city=${encodeURIComponent(value)}`;
      }
    });
  }

  async function init(){
    try{
      [cities,feed] = await Promise.all([fetchJson(CITIES),fetchJson(FEED)]);
      cities = Array.isArray(cities) ? cities : [];
      feed = feed && typeof feed === 'object' ? feed : {stations:{},alerts:[]};
      setupWeatherAppControls();
      populateCitySelect();
      bind();
      renderAlerts();
      renderSelectedCity();
      renderHighlights();
      if($('wx-updated')){
        const date = feed.updatedAt ? new Date(feed.updatedAt) : null;
        $('wx-updated').textContent = date && !Number.isNaN(date.getTime()) ? `Ažurirano ${date.toLocaleString('hr-HR')}` : 'Čeka se osvježavanje podataka';
      }
    }catch(error){
      console.error('[PatriaSoul Vrijeme]', error);
      if($('wx-list')) $('wx-list').innerHTML = '<div class="wx-empty">Vrijeme se trenutno ne može učitati. Provjeri vezu i pokušaj ponovno.</div>';
      if($('wx-highlights')) $('wx-highlights').innerHTML = '';
      if($('wx-location')) $('wx-location').textContent = '⚠️ Podaci o vremenu trenutno nisu dostupni';
      if($('wx-updated')) $('wx-updated').textContent = 'Greška pri učitavanju podataka';
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
