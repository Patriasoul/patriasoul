// PatriaSoul AI – zaštita aktivnog kviza
(function () {
  'use strict';

  const QUIZ_PATHS = ['/kviz', '/quiz', '/brani-svoj-grad'];

  function isQuizLocked(pathname = window.location.pathname) {
    const path = String(pathname || '').toLocaleLowerCase('hr-HR');
    return QUIZ_PATHS.some(p => path.includes(p));
  }

  function guard(question, context = {}) {
    if (context.quizActive || isQuizLocked(context.pathname)) {
      return {
        blocked: true,
        text: 'Ne mogu ti otkriti točan odgovor dok traje kviz. 😄 Završi kviz pa me pitaj za objašnjenje i zajedno ćemo proći odgovor! 🇭🇷'
      };
    }
    return { blocked: false, question };
  }

  window.PatriaSoulQuizGuard = { isQuizLocked, guard };
})();
