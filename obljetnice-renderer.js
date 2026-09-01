// PatriaSoul — zajednički renderer za središnji registar obljetnica.
// Podaci se čitaju isključivo iz /obljetnice.js; stranice ne dupliciraju sadržaj.
(function () {
  const STYLE_ID = "ps-obljetnice-renderer-style";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ps-anniv-section{margin:0;padding:0 0 54px}
      .ps-anniv-shell{border:1px solid rgba(214,173,85,.18);border-radius:22px;background:linear-gradient(180deg,#141a21,#0f141a);box-shadow:0 12px 40px rgba(0,0,0,.16);overflow:hidden}
      .ps-anniv-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;padding:24px 26px;border-bottom:1px solid rgba(255,255,255,.07)}
      .ps-anniv-kicker{display:block;color:#d6ad55;text-transform:uppercase;letter-spacing:.12em;font-size:.74rem;font-weight:800;margin-bottom:7px}
      .ps-anniv-head h2{margin:0;color:#fff;font-size:clamp(1.45rem,2.5vw,2rem)}
      .ps-anniv-head p{margin:7px 0 0;color:#9da4ad;max-width:720px;line-height:1.5}
      .ps-anniv-count{white-space:nowrap;color:#f1d58d;font-size:.82rem;font-weight:800}
      .ps-anniv-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:20px}
      .ps-anniv-card{display:flex;flex-direction:column;min-height:185px;padding:18px;border:1px solid rgba(255,255,255,.08);border-radius:17px;background:#11171e}
      .ps-anniv-date{display:inline-flex;align-self:flex-start;padding:6px 9px;border-radius:999px;background:rgba(214,173,85,.08);color:#f1d58d;font-size:.76rem;font-weight:800}
      .ps-anniv-card h3{margin:13px 0 8px;color:#fff;font-size:1.02rem;line-height:1.35}
      .ps-anniv-card p{margin:0;color:#b9bec5;font-size:.9rem;line-height:1.55}
      .ps-anniv-meta{display:flex;justify-content:space-between;gap:10px;margin-top:auto;padding-top:14px;color:#7f8791;font-size:.75rem}
      .ps-anniv-empty{padding:28px 22px;color:#aeb4bc;text-align:center}
      .ps-anniv-archive .ps-anniv-list{grid-template-columns:repeat(2,minmax(0,1fr))}
      @media(max-width:900px){.ps-anniv-list,.ps-anniv-archive .ps-anniv-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:620px){.ps-anniv-head{align-items:flex-start;flex-direction:column}.ps-anniv-list,.ps-anniv-archive .ps-anniv-list{grid-template-columns:1fr;padding:14px}}
      @media(prefers-reduced-motion:reduce){.ps-anniv-card{transition:none}}
    `;
    document.head.appendChild(style);
  }

  function dateKey(date) {
    return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function formatDate(mmdd) {
    const [month, day] = mmdd.split("-").map(Number);
    return new Intl.DateTimeFormat("hr-HR", { day: "numeric", month: "long" }).format(new Date(2026, month - 1, day));
  }

  function nextAnniversaries(items, limit) {
    const today = dateKey(new Date());
    return [...items]
      .filter((item) => /^\d{2}-\d{2}$/.test(item.date))
      .sort((a, b) => {
        const da = a.date >= today ? a.date : `99-${a.date}`;
        const db = b.date >= today ? b.date : `99-${b.date}`;
        return da.localeCompare(db);
      })
      .slice(0, limit);
  }

  function card(item) {
    return `<article class="ps-anniv-card"><span class="ps-anniv-date">${formatDate(item.date)}</span><h3>${item.title}</h3><p>${item.description}</p><div class="ps-anniv-meta"><span>${item.category}</span><span>${item.year}</span></div></article>`;
  }

  function render(items) {
    injectStyles();
    document.querySelectorAll("[data-obljetnice]").forEach((root) => {
      const mode = root.dataset.annivMode || "upcoming";
      const limit = Number(root.dataset.annivLimit || (mode === "archive" ? 100 : 3));
      const selected = mode === "today"
        ? items.filter((item) => item.date === dateKey(new Date()))
        : mode === "archive"
          ? [...items].sort((a, b) => a.date.localeCompare(b.date))
          : nextAnniversaries(items, limit);

      const title = root.dataset.annivTitle || (mode === "archive" ? "Središnji kalendar obljetnica" : "Sljedeće hrvatske obljetnice");
      const intro = root.dataset.annivIntro || "Jedan središnji registar za cijeli PatriaSoul — bez kopiranja podataka po stranicama.";
      const list = selected.length ? selected.map(card).join("") : `<div class="ps-anniv-empty">Danas u središnjem registru nema evidentirane obljetnice.</div>`;

      root.innerHTML = `<section class="ps-anniv-section ${mode === "archive" ? "ps-anniv-archive" : ""}"><div class="ps-anniv-shell"><div class="ps-anniv-head"><div><span class="ps-anniv-kicker">📜 Obljetnice</span><h2>${title}</h2><p>${intro}</p></div><span class="ps-anniv-count">${selected.length} zapisa</span></div><div class="ps-anniv-list">${list}</div></div></section>`;
    });
  }

  async function start() {
    const roots = document.querySelectorAll("[data-obljetnice]");
    if (!roots.length) return;
    try {
      const module = await import("/obljetnice.js");
      render(module.obljetnice || module.default || []);
    } catch (error) {
      console.error("PatriaSoul: nije moguće učitati središnji registar obljetnica.", error);
      roots.forEach((root) => {
        root.innerHTML = `<section class="ps-anniv-section"><div class="ps-anniv-shell"><div class="ps-anniv-empty">Obljetnice trenutačno nisu dostupne.</div></div></section>`;
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
