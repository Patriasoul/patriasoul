/* PatriaSoul — Tragovi vremena
 *
 * Arhivski blokovi su uklonjeni iz prikaza jer trenutno nemaju dovoljno
 * funkcionalnog sadržaja za korisnika. Ne stvaraju se prazne kartice niti
 * se automatski dodaje arhivski UI.
 */
(function(){
  'use strict';

  function removeArchiveBlocks(){
    var aboutArchive=document.getElementById('patriasoul-arhiva');
    if(aboutArchive) aboutArchive.remove();

    var homeTimeline=document.getElementById('portal-timeline');
    if(homeTimeline){
      var section=homeTimeline.closest('.home-section');
      if(section) section.remove();
      else homeTimeline.remove();
    }
  }

  function init(){ removeArchiveBlocks(); }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();

  window.PatriaSoulTragoviVremena={
    renderAbout:function(){ removeArchiveBlocks(); },
    renderHome:function(){ removeArchiveBlocks(); },
    entries:[]
  };
})();
