/* PatriaSoul — image fields
 * Centralna zamjena slikovnih polja za Vjera podportal.
 * Ako stranica još ima staro placeholder polje, prikazuje se konkretna tematska slika.
 */
(function(){'use strict';
  var FALLBACK='/images/patria-image-placeholder.svg';
  var PAGE_IMAGES={
    '/vjera.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Basilica%20of%20the%20Miraculous%20Madonna%20of%20Sinj.jpg?width=1400',
    '/evandelje.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Bible%20and%20rosary.jpg?width=1400',
    '/liturgija.html':'https://commons.wikimedia.org/wiki/Special:FilePath/HR-Sibenik-Kathedrale-01.jpg?width=1400',
    '/biblija.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Franjevci%20Kaptol7.jpg?width=1400',
    '/molitve.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Prayer%20at%20the%20Church%20of%20St.%20Mark%20in%20Zagreb.jpg?width=1400',
    '/krunica.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Rosary%20%28cropped%29.jpg?width=1600',
    '/svetci.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Basilica%20of%20the%20Miraculous%20Madonna%20of%20Sinj.jpg?width=1400',
    '/svetac-dana.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Basilica%20of%20the%20Miraculous%20Madonna%20of%20Sinj.jpg?width=1400',
    '/blagdani.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Church%20of%20Saint%20Mark%20in%20Zagreb.jpg?width=1400',
    '/svetista.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Basilica%20of%20the%20Miraculous%20Madonna%20of%20Sinj.jpg?width=1400',
    '/sakramenti.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Interior%20of%20Saint%20Peter%27s%20Basilica%20in%20Vatican%20City.jpg?width=1400',
    '/obitelj-vjera.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Family%20praying%20together.jpg?width=1400',
    '/mladi-vjera.html':'https://commons.wikimedia.org/wiki/Special:FilePath/World_Youth_Day_2016_Cracow.jpg?width=1600',
    '/duhovnost.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Bazilika%20Srca%20Isusovog%2C%20Zagreb.jpg?width=1400',
    '/vjera-svjedocanstva.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Bazilika%20Srca%20Isusovog%2C%20Zagreb.jpg?width=1400',
    '/katolicke-vijesti.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Zagreb%20Cathedral%20%2813024178873%29.jpg?width=1400'
  };
  function init(){
    var page=window.location.pathname.replace(/\\/+$/,'')||'/index.html';
    var pageImage=PAGE_IMAGES[page];
    document.querySelectorAll('.ps-image-field img[data-ps-image]').forEach(function(img){
      var src=img.getAttribute('data-ps-image-src')||img.getAttribute('src')||'';
      if((!src || src==='#' || src.indexOf('patria-image-placeholder.svg')!==-1) && pageImage){
        src=pageImage;
        img.setAttribute('data-ps-image-src',src);
      }
      if(!src || src==='#') src=FALLBACK;
      img.src=src;
      img.onerror=function(){
        if(pageImage && img.src!==pageImage){ img.src=pageImage; return; }
        if(img.src.indexOf(FALLBACK)===-1) img.src=FALLBACK;
      };
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
