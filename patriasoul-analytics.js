/* PatriaSoul — privacy-friendly local analytics */
(function(){'use strict';
  var key='patriasoul.analytics.v1';
  function send(type,data){
    try{var a=JSON.parse(localStorage.getItem(key)||'[]');a.push({type:type,path:location.pathname,at:new Date().toISOString(),data:data||{}});if(a.length>200)a=a.slice(-200);localStorage.setItem(key,JSON.stringify(a));}catch(e){}
  }
  window.PatriaAnalytics={track:send,get:function(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(e){return[]}},clear:function(){localStorage.removeItem(key)}};
  send('pageview');
  document.addEventListener('click',function(e){var a=e.target.closest('a');if(a)send('click',{href:a.getAttribute('href'),text=(a.textContent||'').trim().slice(0,100)});});
})();
