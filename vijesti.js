// PatriaSoul – automatski sustav vijesti
// Prikazuje centralni news-feed koji GitHub Actions redovito osvježava iz odabranih RSS izvora.
(function(){
  const DATA='news-feed.json';
  const CATS={
    sve:'Sve',domovina:'🇭🇷 Domovina',branitelji:'🛡️ Branitelji',povijest:'📜 Povijest',vjera:'⛪ Vjera',
    bastina:'🏛️ Baština',gradovi:'🏙️ Gradovi',kultura:'🎭 Kultura',svijet:'🌍 Hrvatska i svijet'
  };
  const state={items:[],category:'sve',query:''};
  const $=id=>document.getElementById(id);
  function esc(s){return String(s||'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));}
  function date(v){try{return new Intl.DateTimeFormat('hr-HR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(v))}catch{return ''}}
  function filtered(){const q=state.query.toLocaleLowerCase('hr-HR');return state.items.filter(x=>(state.category==='sve'||x.category===state.category)&&(!q||`${x.title} ${x.summary} ${x.source} ${(x.tags||[]).join(' ')}`.toLocaleLowerCase('hr-HR').includes(q)))}
  function render(){
    const list=filtered();
    $('count').textContent=`${list.length} ${list.length===1?'vijest':'vijesti'}`;
    $('news-list').innerHTML=list.length?list.map(x=>`<article class="news-card"><div class="news-meta"><span>${esc(CATS[x.category]||'📰 Vijesti')}</span><time datetime="${esc(x.date)}">${date(x.date)}</time></div><h2>${esc(x.title)}</h2><p>${esc(x.summary||'')}</p><div class="news-source">Izvor: <strong>${esc(x.source)}</strong></div><a class="news-link" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer">Pročitaj izvornu vijest →</a></article>`).join(''):`<div class="news-empty"><strong>Nema vijesti za odabrani filter.</strong><p>Pokušaj s drugom kategorijom ili pretragom.</p></div>`;
    document.querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('active',b.dataset.cat===state.category));
  }
  async function init(){try{const r=await fetch(`${DATA}?v=${Date.now()}`,{cache:'no-store'});if(!r.ok)throw Error('feed');const d=await r.json();state.items=Array.isArray(d.items)?d.items:[];const stamp=d.updatedAt?`Ažurirano ${date(d.updatedAt)}`:'';$('updated').textContent=stamp;render()}catch(e){$('news-list').innerHTML='<div class="news-empty"><strong>Vijesti se trenutno ne mogu učitati.</strong><p>Pokušaj ponovno za nekoliko trenutaka.</p></div>'}}
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.cat;render()}));
    $('search').addEventListener('input',e=>{state.query=e.target.value;render()});
    init();
  });
})();
