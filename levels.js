// PatriaSoul – centralni sustav 100 razina prema ukupnom XP-u
// Prvih 10 razina: Početak puta
// 11–25: Poznavatelj hrvatske baštine
// 26–50: Čuvar baštine
// 51–75: Vitez PatriaSoula
// 76–99: Čuvar Domovine
// 100: Živa baština
// XP pragovi rastu progresivno kako bi napredovanje bilo sve izazovnije.
// Modul ostaje kompatibilan s postojećim window.PATRIA_LEVELS API-jem.
(function (global) {
  'use strict';

  const TIERS = [
    { from: 1, to: 10, title: 'Početnik' },
    { from: 11, to: 25, title: 'Poznavatelj hrvatske baštine' },
    { from: 26, to: 50, title: 'Čuvar baštine' },
    { from: 51, to: 75, title: 'Vitez PatriaSoula' },
    { from: 76, to: 99, title: 'Čuvar Domovine' },
    { from: 100, to: 100, title: 'Živa baština' }
  ];

  function tierFor(level) {
    return TIERS.find(tier => level >= tier.from && level <= tier.to) || TIERS[0];
  }

  function xpForLevel(level) {
    const n = Math.max(1, Math.min(100, Math.floor(Number(level) || 1)));
    if (n === 1) return 0;
    // Progresivna krivulja: rani leveli su dostupni, kasniji traže sve više XP-a.
    return Math.round(250 * Math.pow(n - 1, 1.55));
  }

  const LEVELS = Array.from({ length: 100 }, (_, index) => {
    const id = index + 1;
    const tier = tierFor(id);
    const names = {
      1: 'Početnik',
      2: 'Učenik baštine',
      3: 'Mladi poznavatelj',
      4: 'Istraživač baštine',
      5: 'Poznavatelj Hrvatske',
      6: 'Učenjak baštine',
      7: 'Čuvar sjećanja',
      8: 'Poznavatelj domovine',
      9: 'Prijatelj baštine',
      10: 'Čuvar početka',
      25: 'Veliki poznavatelj',
      50: 'Veliki čuvar baštine',
      75: 'Veliki vitez PatriaSoula',
      99: 'Veliki čuvar Domovine',
      100: 'Živa baština'
    };

    return {
      id,
      name: names[id] || `${tier.title} ${id}`,
      minXP: xpForLevel(id),
      tier: tier.title
    };
  });

  function normalizeXP(xp) {
    const value = Number(xp);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function getLevel(xp) {
    const value = normalizeXP(xp);
    let current = LEVELS[0];
    for (let i = 1; i < LEVELS.length; i += 1) {
      if (value >= LEVELS[i].minXP) current = LEVELS[i];
      else break;
    }
    return current;
  }

  function getNextLevel(xp) {
    const value = normalizeXP(xp);
    return LEVELS.find(level => level.minXP > value) || null;
  }

  function getProgress(xp) {
    const value = normalizeXP(xp);
    const current = getLevel(value);
    const next = getNextLevel(value);

    if (!next) {
      return { current, next: null, xp: value, xpIntoLevel: value - current.minXP, xpToNext: 0, percent: 100, isMaxLevel: true };
    }

    const span = next.minXP - current.minXP;
    const xpIntoLevel = value - current.minXP;
    return {
      current,
      next,
      xp: value,
      xpIntoLevel,
      xpToNext: Math.max(0, next.minXP - value),
      percent: Math.min(100, Math.max(0, Math.round((xpIntoLevel / span) * 100))),
      isMaxLevel: false
    };
  }

  function getLevelById(id) {
    const numericId = Number(id);
    return LEVELS.find(level => level.id === numericId) || null;
  }

  function getXPForLevel(id) {
    const level = getLevelById(id);
    return level ? level.minXP : null;
  }

  const publicLevels = LEVELS.map(level => Object.freeze({ ...level }));
  Object.freeze(publicLevels);

  global.PATRIA_LEVELS = publicLevels;
  global.PatriaLevels = {
    get: getLevel,
    next: getNextLevel,
    progress: getProgress,
    byId: getLevelById,
    xpFor: getXPForLevel,
    all: function () { return publicLevels.slice(); },
    count: publicLevels.length,
    tierFor: tierFor
  };
})(typeof window !== 'undefined' ? window : globalThis);
