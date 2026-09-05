/* PatriaSoul — image fields
 * Zamjena slike: promijeni src u konkretnom .ps-image-field ili kasnije dodaj URL u data-ps-image-src.
 */
(function(){'use strict';
  var FALLBACK='/images/patria-image-placeholder.svg';
  function init(){
    document.querySelectorAll('.ps-image-field img[data-ps-image]').forEach(function(img){
      var src=img.getAttribute('data-ps-image-src')||img.getAttribute('src')||FALLBACK;
      if(!src || src==='#') src=FALLBACK;
      img.src=src;
      img.onerror=function(){ if(img.src.indexOf(FALLBACK)===-1) img.src=FALLBACK; };
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
