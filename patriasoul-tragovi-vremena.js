/* PatriaSoul — canonical archive registry: Tragovi vremena.
   Jedan izvor podataka koristi naslovnica i O nama, bez dupliranja zapisa. */
(function(){
  'use strict';

  var entries = [
    {date:'925.',title:'Splitski crkveni sabori',description:'Važni crkveni sabori održani u Splitu u 10. stoljeću svjedoče o crkvenom i političkom značenju hrvatskog prostora.',href:'/povijest.html#kraljevstvo',label:'Otvori Tragove vremena →'},
    {date:'11. stoljeće',title:'Petar Krešimir IV. i Dmitar Zvonimir',description:'Razdoblje hrvatskih kraljeva obilježeno je snažnim vezama s Jadranom, Rimom i europskim političkim prostorom.',href:'/povijest.html#kraljevstvo',label:'Otvori Tragove vremena →'},
    {date:'1991.–1995.',title:'Domovinski rat',description:'Razdoblje stvaranja i obrane Republike Hrvatske, s posebnim mjestom za branitelje, stradanja i mjesta sjećanja.',href:'/povijest.html#domovinski',label:'Otvori kronologiju →'},
    {date:'15. siječnja 1998.',title:'Mirna reintegracija hrvatskog Podunavlja',description:'Završetak procesa mirne reintegracije hrvatskog Podunavlja označio je važnu prekretnicu u završetku mirne uspostave ustavno-pravnog poretka Republike Hrvatske.',href:'/povijest.html#danas',label:'Otvori Povijest →'}
  ];

  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }

  function renderAbout(){
    var target=document.getElementById('patriasoul-arhiva-grid');
    if(!target) return;
    target.innerHTML=entries.map(function(e){
      return '<a class="archive-entry" href="'+esc(e.href)+'"><span class="archive-date">'+esc(e.date)+'</span><h3>'+esc(e.title)+'</h3><p>'+esc(e.description)+'</p><span>'+esc(e.label)+'</span></a>';
    }).join('');
  }

  function renderHome(){
    var target=document.getElementById('portal-timeline');
    if(!target) return;
    target.innerHTML=entries.map(function(e){
      return '<a class="portal-timeline-item" href="'+esc(e.href)+'"><span class="portal-timeline-date">'+esc(e.date)+'</span><span><b>'+esc(e.title)+'</b><strong>'+esc(e.description)+'</strong></span><i>→</i></a>';
    }).join('');
  }

  function init(){renderAbout();renderHome();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();

  window.PatriaSoulTragoviVremena={entries:entries,renderAbout:renderAbout,renderHome:renderHome};
})();
