/* Preferencia de idioma i canvi CA/ES.
   Les pàgines són independents per idioma, però comparteixen progrés i tema. */
(function () {
  'use strict';

  var KEY = 'estudiarSMX.lang.v1';
  var lang = (document.documentElement.lang || 'ca').toLowerCase().indexOf('es') === 0 ? 'es' : 'ca';

  try {
    var saved = window.localStorage.getItem(KEY);
    var alt = document.documentElement.getAttribute('data-alt-lang');
    if (saved && saved !== lang && alt) {
      window.location.replace(alt + window.location.hash);
      return;
    }
  } catch (e) { /* Sense emmagatzematge, es manté l'idioma de la pàgina. */ }

  function bindSwitches() {
    var links = document.querySelectorAll('[data-lang-link]');
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener('click', function () {
        try {
          window.localStorage.setItem(KEY, link.getAttribute('data-lang-link'));
        } catch (e) { /* Sense emmagatzematge, el canvi de pàgina segueix funcionant. */ }
        if (window.location.hash) {
          var href = link.getAttribute('href') || '';
          if (href.indexOf('#') === -1) link.setAttribute('href', href + window.location.hash);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindSwitches);
  } else {
    bindSwitches();
  }
})();
