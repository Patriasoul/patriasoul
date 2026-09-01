/*
 * PatriaSoul – javna konfiguracija aplikacije.
 *
 * Ova datoteka se učitava u pregledniku, zato ovdje NE stavljati
 * API ključeve, tokene, lozinke ili druge tajne podatke.
 */
(function () {
  const config = window.PatriaSoulConfig || {};

  config.app = Object.assign({
    name: 'PatriaSoul',
    shortName: 'PatriaSoul',
    version: '1.0.0',
    language: 'hr',
    locale: 'hr-HR',
    country: 'HR',
    countryName: 'Hrvatska',
    timezone: 'Europe/Zagreb'
  }, config.app || {});

  config.urls = Object.assign({
    home: '/',
    cities: '/gradovi.html',
    cityProfile: '/grad.html',
    quiz: '/kviz.html',
    history: '/povijest.html',
    veterans: '/branitelji.html',
    heritage: '/bastina.html',
    faith: '/vjera.html',
    news: '/vijesti.html'
  }, config.urls || {});

  config.features = Object.assign({
    cities: true,
    cityWeather: true,
    quiz: true,
    dailyQuiz: true,
    weeklyQuiz: true,
    monthlyQuiz: true,
    badges: true,
    duel: true,
    defendCity: true,
    ai: false
  }, config.features || {});

  config.quiz = Object.assign({
    questionTimeSeconds: 15,
    questionsPerRound: 10,
    speedBonus: true,
    shuffleAnswers: true
  }, config.quiz || {});

  config.cities = Object.assign({
    total: 127,
    defaultCounty: 'Sve županije',
    searchEnabled: true
  }, config.cities || {});

  config.ui = Object.assign({
    theme: 'dark',
    accent: 'gold',
    reducedMotionRespect: true
  }, config.ui || {});

  // Zadržavamo postojeće vrijednosti ako ih neka stranica već postavi.
  config.language = config.language || config.app.language;

  window.PatriaSoulConfig = config;
})();
