/* PatriaSoul — javni Supabase klijent za GitHub Pages.
 * Nikad ne stavljati service_role/secret key u frontend.
 */
(function () {
  'use strict';

  const SUPABASE_URL = 'https://azerctpwfzdivydsxyex.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_s3yGs_jJsRvEDB2BbN4G3w_EX_MAKJd';

  async function request(path, options = {}) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...options,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase ${response.status}: ${text || response.statusText}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }

  async function findPlayer(nickname) {
    const rows = await request(`players?select=*&nickname=eq.${encodeURIComponent(nickname)}&limit=1`);
    return rows[0] || null;
  }

  async function savePlayer(profile) {
    const nickname = String(profile.name || '').trim();
    const city = String(profile.city || '').trim();
    if (!nickname || !city) throw new Error('Nedostaje nadimak ili grad.');

    const existing = await findPlayer(nickname);
    const body = {
      nickname,
      city,
      xp: Number(profile.xp || 0),
      points: Number(profile.points || 0),
      quizzes: Number(profile.quizzes || 0),
      correct: Number(profile.correct || 0),
      streak: Number(profile.streak || 0),
      updated_at: new Date().toISOString()
    };

    if (existing) {
      return (await request(`players?id=eq.${encodeURIComponent(existing.id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(body)
      }))[0];
    }

    return (await request('players', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(body)
    }))[0];
  }

  async function saveQuizResult(result) {
    return (await request('quiz_results', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(result)
    }))[0];
  }

  async function leaderboard(limit = 100) {
    return request(`players?select=nickname,city,xp,points,quizzes,correct&order=points.desc&limit=${Math.max(1, Math.min(500, limit))}`);
  }

  async function cityLeaderboard(limit = 127) {
    return request(`city_scores?select=city,total_points,wins,losses,draws,players_count&order=total_points.desc&limit=${Math.max(1, Math.min(127, limit))}`);
  }

  async function createChallenge(data) {
    return (await request('challenges', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(data)
    }))[0];
  }

  async function findChallenge(code) {
    const rows = await request(`challenges?select=*&code=eq.${encodeURIComponent(code)}&limit=1`);
    return rows[0] || null;
  }

  async function saveChallengeResult(result) {
    return (await request('challenge_results', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(result)
    }))[0];
  }

  async function getChallengeResults(challengeId) {
    return request(`challenge_results?select=*&challenge_id=eq.${encodeURIComponent(challengeId)}&order=score.desc`);
  }

  window.PatriaSupabase = Object.freeze({
    url: SUPABASE_URL,
    findPlayer,
    savePlayer,
    saveQuizResult,
    leaderboard,
    cityLeaderboard,
    createChallenge,
    findChallenge,
    saveChallengeResult,
    getChallengeResults
  });
})();
