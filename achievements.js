// PatriaSoul – jedinstveni katalog postignuća.
// Kompatibilno s glavnim PATRIA_BADGES sustavom iz badges.js.
export const achievements = [
  { id: 'prvi-korak', icon: '🎯', name: 'Prvi korak', description: 'Završen prvi kviz.' },
  { id: 'znalac', icon: '📚', name: 'Znalac', description: 'Osvojeno najmanje 1.000 bodova.' },
  { id: 'majstor', icon: '🏆', name: 'Majstor znanja', description: 'Osvojeno najmanje 5.000 bodova.' },
  { id: 'savrsen', icon: '💎', name: 'Savršena serija', description: 'Najmanje 10 točnih odgovora ukupno.' },
  { id: 'branitelj', icon: '🛡️', name: 'Branitelj gradova', description: 'Odigran prvi gradski izazov.' }
];

export function getAchievement(id) {
  return achievements.find(a => a.id === id) || null;
}

export function getAchievements() {
  return [...achievements];
}
