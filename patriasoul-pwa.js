/* PatriaSoul — PWA bootstrap */
(function(){'use strict';
  if(!('serviceWorker' in navigator)) return;
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('/patriasoul-sw.js',{scope:'/'}).catch(function(){});
  });
})();
