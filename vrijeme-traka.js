/*
 * PatriaSoul – Vrijeme traka
 *
 * Ugradnja:
 *   <div data-ps-weather-strip></div>
 *   <link rel="stylesheet" href="vrijeme-traka.css">
 *   <script src="vrijeme-traka.js" defer></script>
 *
 * Podaci:
 *   weather-feed.json
 *   weather-cities.json
 *
 * Pravilo: ova komponenta samo prikazuje podatke. Izvor vremenskih podataka
 * ostaje centraliziran u weather-feed.json, dok weather-cities.json definira
 * lokacije i njihove koordinate.
 */
(function () {
  'use strict';

  const root = document.querySelector('[data-ps-weather-strip]');
  if (!root) return;

  const FEED_URL = 'weather-feed.json';
  const CITIES_URL = 'weather-cities.json';
  const CACHE_BUSTER = () => `?v=${Date.now()}`;
  const MAX_CARDS = 4;
  const GEO_OPTIONS = {
    enableHighAccuracy: false,
    maximumAge: 15 * 60 * 1000,
    timeout: 8000
  };

  const state = {
    feed: null,
    cities: [],
    located: false,
    loading: false
  };

  const $ = (selector, scope = root) => scope.querySelector(selector);

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

  const numberOrNull = (value) => {
    if (value === null || value === undefined || value === '') return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  };

  const formatTemp = (value) => {
    const number = numberOrNull(value);
    return number === null ? '—' : `${Math.round(number)}°C`;
  };

  const weatherIcon = (description) => {
    const text = String(description || '').toLowerCase();
    if (/grmlj|oluj|munj/.test(text)) return '⛈️';
    if (/kiš|obor/.test(text)) return '🌧️';
    if (/snij|susnje/.test(text)) return '🌨️';
    if (/oblač|naobla/.test(text)) return '☁️';
    if (/magl/.test(text)) return '🌫️';
    if (/vedr|sunč/.test(text)) return '☀️';
    return '🌤️';
  };

  const normalizeCities = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.cities)) return data.cities;
    return [];
  };

  const getWeather = (city) => {
    const feed = state.feed;
    if (!feed) return {};
    return feed.cities?.[city.id] || feed[city.id] || city.weather || {};
  };

  const getCityItems = () => state.cities
    .map((city) => ({
      ...city,
      weather: getWeather(city)
    }))
    .filter((city) => city.name || city.city)
    .map((city) => ({
      ...city,
      name: city.name || city.city
    }));

  const distanceKm = (lat1, lon1, lat2, lon2) => {
    const aLat = Number(lat1);
    const aLon = Number(lon1);
    const bLat = Number(lat2);
    const bLon = Number(lon2);

    if (![aLat, aLon, bLat, bLon].every(Number.isFinite)) return Infinity;

    const earthRadius = 6371;
    const dLat = (bLat - aLat) * Math.PI / 180;
    const dLon = (bLon - aLon) * Math.PI / 180;
    const sinLat = Math.sin(dLat / 2);
    const sinLon = Math.sin(dLon / 2);
    const a = sinLat * sinLat + Math.cos(aLat * Math.PI / 180) * Math.cos(bLat * Math.PI / 180) * sinLon * sinLon;
    return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const nearestCities = (lat, lon) => getCityItems()
    .map((city) => ({
      ...city,
      distance: distanceKm(lat, lon, city.lat, city.lon)
    }))
    .sort((a, b) => a.distance - b.distance);

  const cityHref = (city) => city.url || `grad.html?grad=${encodeURIComponent(city.name)}`;

  const renderLoading = (message = '🌤️ Učitavanje vremena…') => {
    root.innerHTML = `
      <section class="ps-weather-strip" aria-label="Vremenska traka">
        <div class="ps-weather-strip__loading" role="status" aria-live="polite">
          ${escapeHtml(message)}
        </div>
      </section>`;
  };

  const renderError = (message = 'Trenutni podaci nisu dostupni. Pokušaj ponovno kasnije.') => {
    root.innerHTML = `
      <section class="ps-weather-strip" aria-label="Vremenska traka">
        <div class="ps-weather-strip__error" role="alert">
          <strong>Vrijeme</strong><br>
          ${escapeHtml(message)}
        </div>
      </section>`;
  };

  const render = (cities, located = false) => {
    const visible = cities.slice(0, MAX_CARDS);

    const cards = visible.map((city, index) => {
      const weather = city.weather || {};
      const description = weather.description || weather.condition || weather.text || 'Podaci dostupni';
      const temperature = weather.temperature ?? weather.temp;
      const min = weather.min ?? weather.minTemp;
      const max = weather.max ?? weather.maxTemp;
      const isPrimary = index === 0;
      const label = isPrimary && located ? 'Tvoja lokacija' : 'U blizini';

      return `
        <a class="ps-weather-strip__card ${isPrimary ? 'is-primary' : ''}"
           href="${escapeHtml(cityHref(city))}"
           aria-label="${escapeHtml(`${city.name}: ${formatTemp(temperature)}, ${description}`)}">
          <div class="ps-weather-strip__city">
            <strong>${isPrimary && located ? '📍 ' : ''}${escapeHtml(city.name)}</strong>
            <span class="ps-weather-strip__near">${label}</span>
          </div>
          <div class="ps-weather-strip__main">
            <span class="ps-weather-strip__icon" aria-hidden="true">${weatherIcon(description)}</span>
            <span class="ps-weather-strip__temp">${formatTemp(temperature)}</span>
          </div>
          <div class="ps-weather-strip__desc">${escapeHtml(description)}</div>
          <div class="ps-weather-strip__meta">
            <span>↓ ${formatTemp(min)}</span>
            <span>↑ ${formatTemp(max)}</span>
          </div>
        </a>`;
    }).join('');

    root.innerHTML = `
      <section class="ps-weather-strip" aria-label="Vrijeme u tvojoj blizini">
        <div class="ps-weather-strip__head">
          <span class="ps-weather-strip__title">🌤️ Vrijeme u tvojoj blizini</span>
          <span class="ps-weather-strip__source">Izvor: DHMZ</span>
        </div>

        <div class="ps-weather-strip__viewport"
             tabindex="0"
             role="region"
             aria-label="Vremenska traka s gradovima">
          <div class="ps-weather-strip__track">
            ${cards || '<div class="ps-weather-strip__loading">Vremenski podaci trenutno nisu dostupni.</div>'}
          </div>
        </div>

        <div class="ps-weather-strip__actions">
          <button type="button" class="ps-weather-strip__button" data-weather-location>
            📍 Moja lokacija
          </button>
          <a class="ps-weather-strip__button" href="vrijeme.html">Detaljno vrijeme →</a>
        </div>
      </section>`;

    const locationButton = $('[data-weather-location]');
    if (locationButton) locationButton.addEventListener('click', locate);

    enableDragScroll();
  };

  const enableDragScroll = () => {
    const viewport = $('.ps-weather-strip__viewport');
    if (!viewport || viewport.dataset.dragReady === 'true') return;
    viewport.dataset.dragReady = 'true';

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return;
      dragging = true;
      startX = event.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture?.(event.pointerId);
      viewport.style.cursor = 'grabbing';
    });

    viewport.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      viewport.scrollLeft = startScroll - (event.clientX - startX);
    });

    const stop = () => {
      dragging = false;
      viewport.style.cursor = 'grab';
    };

    viewport.addEventListener('pointerup', stop);
    viewport.addEventListener('pointercancel', stop);
    viewport.addEventListener('pointerleave', stop);
  };

  const locate = () => {
    if (state.loading) return;

    if (!navigator.geolocation) {
      state.located = false;
      render(getCityItems(), false);
      return;
    }

    state.loading = true;
    renderLoading('📍 Tražim najbliže gradove…');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.loading = false;
        state.located = true;
        render(nearestCities(position.coords.latitude, position.coords.longitude), true);
      },
      () => {
        state.loading = false;
        state.located = false;
        render(getCityItems(), false);
      },
      GEO_OPTIONS
    );
  };

  const load = async () => {
    renderLoading();

    try {
      const [feedResponse, citiesResponse] = await Promise.all([
        fetch(FEED_URL + CACHE_BUSTER(), { cache: 'no-store' }),
        fetch(CITIES_URL + CACHE_BUSTER(), { cache: 'no-store' })
      ]);

      if (!feedResponse.ok || !citiesResponse.ok) {
        throw new Error('Vremenski izvori nisu dostupni.');
      }

      const [feed, cities] = await Promise.all([
        feedResponse.json(),
        citiesResponse.json()
      ]);

      state.feed = feed;
      state.cities = normalizeCities(cities);

      if (!state.cities.length) {
        throw new Error('Nema dostupnih lokacija.');
      }

      locate();
    } catch (error) {
      state.loading = false;
      console.warn('[PatriaSoul] Vremenska traka:', error);
      renderError();
    }
  };

  // Automatsko pokretanje nakon učitavanja DOM-a.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load, { once: true });
  } else {
    load();
  }
})();
