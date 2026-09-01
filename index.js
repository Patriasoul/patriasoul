// PatriaSoul – centralni JavaScript ulaz (barrel module)
//
// Ovaj modul okuplja javne ESM registre na jednom mjestu kako bi stranice
// i komponente mogle koristiti jedinstvene import putanje.
//
// Napomena: domovinski-rat.js koristi klasični IIFE format i zato se ovdje
// namjerno ne re-exporta kao ESM modul.

// Gradovi
export { zagreb } from './zagreb.js';
export { split } from './split.js';
export { sinj } from './sinj.js';
export { vukovar } from './vukovar.js';
export { knin } from './knin.js';

// Centralni sadržaj
export {
  heroji,
  HEROJI_KATEGORIJE,
  getHerojById,
  getHerojiByCategory,
  searchHeroji
} from './heroji.js';

// Kviz – Hrvatska
export {
  hrvatskaQuiz,
  HRVATSKA_QUIZ_COUNT,
  getHrvatskaQuestion,
  getRandomHrvatskaQuestions
} from './hrvatska.js';

// Zajednički metadata podaci za aplikaciju.
export const PATRIA_MODULES = Object.freeze({
  gradovi: [
    'zagreb',
    'split',
    'sinj',
    'vukovar',
    'knin'
  ],
  sadrzaj: [
    'heroji'
  ],
  kviz: [
    'hrvatskaQuiz'
  ]
});

export const PATRIA_VERSION = '1.0.0';

export default {
  PATRIA_MODULES,
  PATRIA_VERSION
};
