// PatriaSoul – News Engine 2.0
// Centralni feed: izvori -> normalizacija -> kategorija -> lokacija -> važnost -> prikaz.
(function(){
  const DATA='news-feed.json';
  const CATS={
    sve:'Sve',domovina:'🇭🇷 Domovina',branitelji:'🛡️ Branitelji',povijest:'📜 Povijest',vjera:'⛪ Vjera',
    bastina:'🏛️ Baština',gradovi:'🏙️ Gradovi',kultura:'🎭 Kultura',svijet:'🌍 Hrvatska i svijet',sport:'⚽ Sport'
  };
  const state={items:[],category:'sve',query:'',sort:'importance'};
  const $=id=>document.getElementById(id);
  function esc(s){return String(s||'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));}
  function date(v){try{return new Intl.DateTimeFormat('hr-HR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(v))}catch{return ''}}
  function timeAgo(v){try{const d=Date.now()-new Date(v).getTime(),h=Math.max(0,Math.floor(d/3600000));if(h<1)return 'upravo';if(h<24)return `prije ${h} h`;const days=Math.floor(h/24);return `prije ${days} ${days===1?'dan':'dana'}`}catch{return ''}}
  function filtered(){
    const q=state.query.toLocaleLowerCase('hr-HR');
    const list=state.items.filter(x=>(state.category==='sve'||x.category===state.category)&&(!q||`${x.title} ${x.summary} ${x.source} ${(x.tags||[]).join(' ')} ${(x.locations||[]).join(' ')}`.toLocaleLowerCase('hr-HR').includes(q)));
    return list.sort((a,b)=>state.sort==='date'?new Date(b.date)-new Date(a.date):(Number(b.importance)||0)-(Number(a.importance)||0)||new Date(b.date)-new Date(a.date));
  }
  function card(x){
    const locations=(x.locations||[]).slice(0,4);
    const tags=(x.tags||[]).slice(0,3);
    const priority=Number(x.importance)||0;
    const badge=priority>=70?'VAŽNO':priority>=50?'ISTAKNUTO':'';
    return `<article class="news-card" data-importance="${priority}">
      <div class="news-meta"><span>${esc(CATS[x.category]||'📰 Vijesti')}</span><time datetime="${esc(x.date)}" title="${esc(x.date)}">${date(x.date)} · ${esc(timeAgo(x.date))}</time></div>
      ${badge?`<div class="news-badge">${badge}</div>`:''}
      <h2>${esc(x.title)}</h2>
      <p>${esc(x.summary||'')}</p>
      ${locations.length?`<div class="news-pills">${locations.map(v=>`<span>📍 ${esc(v)}</span>`).join('')}</div>`:''}
      ${tags.length?`<div class="news-tags">${tags.map(v=>`<span>#${esc(v)}</span>`).join('')}</div>`:''}
      <div class="news-source">Izvor: <strong>${esc(x.source)}</strong></div>
      <a class="news-link" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer">Pročitaj izvornu vijest →</a>
    </article>`;
  }
  function featured(x){
    if(!x)return '<div class="news-featured-empty">Nema dostupne glavne vijesti.</div>';
    const priority=Number(x.importance)||0;
    return `<article class="news-featured-card">
      <div class="news-featured-media"><span>${esc(CATS[x.category]||'📰 Vijesti')}</span></div>
      <div class="news-featured-body">
        <div class="news-meta"><span>${date(x.date)} · ${esc(timeAgo(x.date))}</span>${priority>=70?'<b class="news-badge">VAŽNO</b>':''}</div>
        <h2>${esc(x.title)}</h2>
        <p>${esc(x.summary||'')}</p>
        <div class="news-source">Izvor: <strong>${esc(x.source)}</strong></div>
        <a class="news-link" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer">Opširnije →</a>
      </div>
    </article>`;
  }
  function latestItem(x){
    return `<a class="latest-item" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer">
      <time>${esc(timeAgo(x.date))}</time>
      <span class="latest-category">${esc(CATS[x.category]||'📰 Vijesti')}</span>
      <strong>${esc(x.title)}</strong>
    </a>`;
  }
  function render(){
    const list=filtered();
    $('count').textContent=`${list.length} ${list.length===1?'vijest':'vijesti'}`;
    const featureHost=$('news-featured');
    if(featureHost)featureHost.innerHTML=featured(list[0]);
    const latestHost=$('news-latest');
    if(latestHost)latestHost.innerHTML=list.slice(0,8).map(latestItem).join('')||'<div class="latest-empty">Nema vijesti.</div>';
    const body=list.slice(1);
    $('news-list').innerHTML=body.length?body.map(card).join(''):`<div class="news-empty"><strong>${list.length?'Nema dodatnih vijesti za prikaz.':'Nema vijesti za odabrani filter.'}</strong><p>Pokušaj s drugom kategorijom ili pretragom.</p></div>`;
    document.querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('active',b.dataset.cat===state.category));
  }
  function renderHighlights(){
    const host=document.querySelector('.news-highlights');
    if(!host||!state.items.length)return;
    const top=[...state.items].sort((a,b)=>(Number(b.importance)||0)-(Number(a.importance)||0)||new Date(b.date)-new Date(a.date)).slice(0,4);
    host.innerHTML=top.map(x=>`<a class="news-highlight" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer"><b>${esc(CATS[x.category]||'📰 Vijesti')}</b><span>${esc(x.title)}</span></a>`).join('');
  }
  function addSortControl(){
    const toolbar=document.querySelector('.news-toolbar');
    if(!toolbar||document.getElementById('news-sort'))return;
    const select=document.createElement('select');
    select.id='news-sort';select.className='news-sort';
    select.setAttribute('aria-label','Način sortiranja');
    select.innerHTML='<option value="importance">Prvo najvažnije</option><option value="date">Prvo najnovije</option>';
    select.addEventListener('change',e=>{state.sort=e.target.value;render()});
    toolbar.appendChild(select);
  }
  async function init(){
    try{
      const r=await fetch(`${DATA}?v=${Date.now()}`,{cache:'no-store'});
      if(!r.ok)throw Error('feed');
      const d=await r.json();
      state.items=Array.isArray(d.items)?d.items:[];
      const total=state.items.length;
      const stamp=d.updatedAt?`Ažurirano ${date(d.updatedAt)}${d.editorialModel?' · News Engine 2.0':''}`:'';
      $('updated').textContent=stamp;
      addSortControl();renderHighlights();render();
      if(total===0)$('news-list').innerHTML='<div class="news-empty"><strong>Nema dostupnih vijesti.</strong><p>Automatski sustav nije pronašao nove stavke.</p></div>';
    }catch(e){
      $('news-list').innerHTML='<div class="news-empty"><strong>Vijesti se trenutno ne mogu učitati.</strong><p>Pokušaj ponovno za nekoliko trenutaka.</p></div>';
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.cat;render()}));
    const search=$('search');if(search)search.addEventListener('input',e=>{state.query=e.target.value;render()});
    init();
  });
})();
