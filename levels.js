// PatriaSoul – centralni sustav razina prema ukupnom XP-u
// Razina se određuje prema najvećem minXP-u koji korisnik trenutno doseže.
// Modul ostaje kompatibilan s postojećim window.PATRIA_LEVELS API-jem.
(function (global) {
  'use strict';

  const LEVELS = [
    { id: 1, name: 'Početnik', minXP: 0 },
    { id: 2, name: 'Učenik baštine', minXP: 500 },
    { id: 3, name: 'Poznavatelj', minXP: 1500 },
    { id: 4, name: 'Čuvar znanja', minXP: 3000 },
    { id: 5, name: 'Majstor PatriaSoula', minXP: 6000 },
    { id: 6, name: 'Živa baština', minXP: 10000 }
  ];

  function normalizeXP(xp) {
    const value = Number(xp);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function getLevel(xp) {
    const value = normalizeXP(xp);
    let current = LEVELS[0];

    for (let i = 1; i < LEVELS.length; i += 1) {
      if (value >= LEVELS[i].minXP) {
        current = LEVELS[i];
      } else {
        break;
      }
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
      return {
        current,
        next: null,
        xp: value,
        xpIntoLevel: value - current.minXP,
        xpToNext: 0,
        percent: 100,
        isMaxLevel: true
      };
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

  // Zamrzni javni popis kako ga drugi dijelovi aplikacije ne bi slučajno mijenjali.
  const publicLevels = LEVELS.map(level => Object.freeze({ ...level }));
  Object.freeze(publicLevels);

  global.PATRIA_LEVELS = publicLevels;
  global.PatriaLevels = {
    get: getLevel,
    next: getNextLevel,
    progress: getProgress,
    byId: getLevelById,
    xpFor: getXPForLevel,
    all: function () {
      return publicLevels.slice();
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
