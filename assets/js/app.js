(function () {
  'use strict';

  var DATA = window.STUDY_DATA;
  var CONFIG = window.STUDY_CONFIG || {};
  var STORAGE_KEY = CONFIG.storageKey || 'rutaFP.u1.v1';
  var THEME_KEY = CONFIG.themeKey || 'estudiarSMX.theme.v1';
  var T = window.SMX_T || function (key) { return key; };

  var DEFAULT_SECTIONS = [
    { id: 'fp', title: 'La FP y tu título', desc: 'La FP, los títulos y cómo se regula tu ciclo.' },
    { id: 'sector', title: 'Tu sector y tu perfil', desc: 'El real decreto, el perfil y el entorno profesional.' },
    { id: 'competencias', title: 'Competencias y soft skills', desc: 'Lo técnico te contrata; lo personal te mantiene.' },
    { id: 'empleo', title: 'Oportunidades de trabajo', desc: 'Cuenta ajena, función pública y autoempleo.' },
    { id: 'itinerario', title: 'Diseña tu próximo paso', desc: 'Tu itinerario y tu plan de acción.' }
  ];

  var SECTIONS = Array.isArray(CONFIG.sections) && CONFIG.sections.length ? CONFIG.sections : DEFAULT_SECTIONS;

  var DEFAULT_CATS = {
    all: 'Todas',
    titulo: 'Título',
    competencias: 'Competencias',
    empleo: 'Empleo',
    itinerario: 'Itinerario',
    habilidades: 'Habilidades'
  };

  var CATS = CONFIG.categories || DEFAULT_CATS;

  var DEFAULT_FLASH_CATS = {
    all: 'Todas',
    titulo: 'Título',
    competencias: 'Competencias',
    empleo: 'Empleo',
    itinerario: 'Itinerario'
  };

  var FLASH_CATS = CONFIG.flashCategories || DEFAULT_FLASH_CATS;

  var QUIZ_FEATURES = CONFIG.quizFeatures || [
    'Corrección al instante',
    'Explicación en cada pregunta',
    'Incluye las 6 preguntas oficiales del PDF'
  ];

  var SELF_NOUN = CONFIG.selfNoun || 'competencias';

  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  var DEFAULT_STATE = {
    theme: 'light',
    completed: [],
    knownCards: [],
    bestScore: null,
    attempts: 0,
    self: {},
    plan: {}
  };

  function readGlobalTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function loadState() {
    var fallbackTheme = readGlobalTheme() || document.documentElement.dataset.theme || 'light';
    var base = Object.assign({}, DEFAULT_STATE, { theme: fallbackTheme });
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return base;
      var merged = Object.assign(base, saved);
      merged.theme = fallbackTheme;
      merged.completed = Array.isArray(merged.completed) ? merged.completed.filter(function (id) {
        return SECTIONS.some(function (s) { return s.id === id; });
      }) : [];
      merged.knownCards = Array.isArray(merged.knownCards) ? merged.knownCards.filter(function (id) {
        return DATA.flashcards.some(function (c) { return c.id === id; });
      }) : [];
      merged.bestScore = typeof merged.bestScore === 'number' ? Math.max(0, Math.min(100, merged.bestScore)) : null;
      merged.attempts = typeof merged.attempts === 'number' ? merged.attempts : 0;
      merged.self = merged.self && typeof merged.self === 'object' ? merged.self : {};
      merged.plan = merged.plan && typeof merged.plan === 'object' ? merged.plan : {};
      return merged;
    } catch (e) {
      return base;
    }
  }

  var state = loadState();

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* El sitio sigue funcionando sin almacenamiento. */ }
  }

  var toastTimer = null;
  function showToast(message) {
    var toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  function burstConfetti() {
    if (prefersReducedMotion()) return;
    var colors = ['#c8502c', '#266a56', '#b77b16', '#2f5f8a', '#6c4a72'];
    var layer = document.createElement('div');
    layer.className = 'confetti-layer';
    layer.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 38; i += 1) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.setProperty('--x', (Math.random() * 100) + 'vw');
      piece.style.setProperty('--dx', ((Math.random() * 160) - 80) + 'px');
      piece.style.setProperty('--d', (Math.random() * 0.5) + 's');
      piece.style.setProperty('--r', Math.round(Math.random() * 180) + 'deg');
      piece.style.setProperty('--c', colors[i % colors.length]);
      layer.appendChild(piece);
    }
    document.body.appendChild(layer);
    window.setTimeout(function () { layer.remove(); }, 3400);
  }

  /* Tema ------------------------------------------------------------------ */
  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;
    state.theme = theme;
    var toggle = $('#themeToggle');
    var isDark = theme === 'dark';
    if (toggle) {
      toggle.setAttribute('aria-label', isDark ? T('theme.light') : T('theme.dark'));
      toggle.setAttribute('title', isDark ? T('theme.light') : T('theme.dark'));
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#12100c' : '#f5f1e8');
    if (persist) {
      try { window.localStorage.setItem(THEME_KEY, theme); } catch (e) { /* Sin almacenamiento, el tema sigue funcionando. */ }
      saveState();
    }
  }

  function initTheme() {
    applyTheme(state.theme || 'light', false);
    var toggle = $('#themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* Progreso --------------------------------------------------------------- */
  function setRing(el, percent) {
    if (!el) return;
    el.style.setProperty('--p', percent);
  }

  function renderProgress() {
    var done = SECTIONS.filter(function (s) { return state.completed.indexOf(s.id) !== -1; }).length;
    var percent = Math.round((done / SECTIONS.length) * 100);

    setRing($('#heroRing'), percent);
    setRing($('#headerRing'), percent);
    var heroPercent = $('#heroPercent');
    if (heroPercent) heroPercent.textContent = percent + '%';
    var headerPercent = $('#headerPercent');
    if (headerPercent) headerPercent.textContent = percent + '%';

    var statSections = $('#statSections');
    if (statSections) statSections.textContent = done + '/' + SECTIONS.length;
    var statCards = $('#statCards');
    if (statCards) statCards.textContent = state.knownCards.length + '/' + DATA.flashcards.length;
    var statQuiz = $('#statQuiz');
    if (statQuiz) statQuiz.textContent = state.bestScore === null ? '—' : state.bestScore + '%';

    var tocProgress = $('#tocProgress');
    if (tocProgress) tocProgress.textContent = T('toc.blocks', { done: done, total: SECTIONS.length });
    var tocPercent = $('#tocPercent');
    if (tocPercent) tocPercent.textContent = percent + '%';
    var tocBar = $('#tocBar');
    if (tocBar) tocBar.style.width = percent + '%';

    SECTIONS.forEach(function (section) {
      var route = $('[data-route="' + section.id + '"]');
      if (route) {
        route.classList.toggle('is-done', state.completed.indexOf(section.id) !== -1);
      }
      var toc = $('[data-toc="' + section.id + '"]');
      if (toc) toc.classList.toggle('is-done', state.completed.indexOf(section.id) !== -1);
    });

    $$('[data-done]').forEach(function (button) {
      var isDone = state.completed.indexOf(button.dataset.done) !== -1;
      button.classList.toggle('is-done', isDone);
      button.setAttribute('aria-pressed', isDone ? 'true' : 'false');
      button.setAttribute('title', isDone ? T('done.undoTitle') : T('done.doTitle'));
      var label = button.querySelector('span');
      if (label) label.textContent = isDone ? T('done.labelDone') : T('done.labelDo');
    });

    var nextTitle = $('#heroNextTitle');
    var nextText = $('#heroNextText');
    var nextLink = $('#heroNextLink');
    if (nextTitle && nextText && nextLink) {
      if (done === 0) {
        nextTitle.textContent = CONFIG.firstNextTitle || T('next.firstTitle');
        nextText.textContent = CONFIG.firstNextText || T('next.firstText');
        nextLink.setAttribute('href', '#' + (SECTIONS[0] ? SECTIONS[0].id : 'fp'));
        nextLink.querySelector('span').textContent = CONFIG.firstNextLabel || T('next.firstLabel');
      } else if (done < SECTIONS.length) {
        var pending = SECTIONS.filter(function (s) { return state.completed.indexOf(s.id) === -1; });
        var next = pending[0];
        nextTitle.textContent = T('next.continueTitle', { title: next.title });
        nextText.textContent = next.desc;
        nextLink.setAttribute('href', '#' + next.id);
        nextLink.querySelector('span').textContent = T('next.continue');
      } else {
        nextTitle.textContent = T('next.completeTitle');
        nextText.textContent = T('next.completeText');
        nextLink.setAttribute('href', '#flashcards');
        nextLink.querySelector('span').textContent = T('next.completeLabel');
      }
    }

    var pill = $('.progress-pill');
    if (pill) pill.setAttribute('aria-label', T('progress.aria', { percent: percent }));
  }

  function toggleSection(id) {
    var index = state.completed.indexOf(id);
    if (index === -1) state.completed.push(id);
    else state.completed.splice(index, 1);
    saveState();
    renderProgress();
    if (state.completed.length === SECTIONS.length) {
      showToast(T('toast.complete'));
      burstConfetti();
    } else if (index === -1) {
      showToast(T('toast.done'));
    } else {
      showToast(T('toast.undone'));
    }
  }

  /* Navegación ------------------------------------------------------------- */
  function initNav() {
    var header = $('.site-header');
    var toTop = $('#toTop');
    var tocLinks = $$('[data-toc]');
    var sections = $$('.content-section');
    var lastActive = null;
    var ticking = false;

    function updateOnScroll() {
      var y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (toTop) toTop.classList.toggle('is-visible', y > 700);

      var current = null;
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= 170) current = section.id;
      });
      if (current && current !== lastActive) {
        lastActive = current;
        tocLinks.forEach(function (link) {
          var active = link.dataset.toc === current;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateOnScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateOnScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    }

    var menuToggle = $('#menuToggle');
    var mobileMenu = $('#mobileMenu');
    function closeMenu() {
      if (!mobileMenu || !menuToggle) return;
      mobileMenu.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', T('menu.open'));
      document.body.classList.remove('menu-open');
    }
    function openMenu() {
      if (!mobileMenu || !menuToggle) return;
      mobileMenu.hidden = false;
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', T('menu.close'));
      document.body.classList.add('menu-open');
    }

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function () {
        if (mobileMenu.hidden) openMenu();
        else closeMenu();
      });
      mobileMenu.addEventListener('click', function (event) {
        if (event.target.closest('a')) closeMenu();
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 960) closeMenu();
      });
    }

    $$('[data-done]').forEach(function (button) {
      button.addEventListener('click', function () { toggleSection(button.dataset.done); });
    });

    $$('[data-reset-progress]').forEach(function (button) {
      button.addEventListener('click', resetAllProgress);
    });
  }

  /* Tabs de los ejemplos --------------------------------------------------- */
  function initTabs() {
    $$('[data-tabs]').forEach(function (card) {
      var tabs = $$('[role="tab"]', card);
      var panels = $$('[role="tabpanel"]', card);

      function activate(index, focus) {
        tabs.forEach(function (tab, i) {
          var selected = i === index;
          tab.classList.toggle('is-active', selected);
          tab.setAttribute('aria-selected', selected ? 'true' : 'false');
          tab.setAttribute('tabindex', selected ? '0' : '-1');
          if (selected && focus) tab.focus();
        });
        panels.forEach(function (panel, i) {
          panel.hidden = i !== index;
        });
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () { activate(index, false); });
        tab.addEventListener('keydown', function (event) {
          var target = null;
          if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') target = 0;
          if (event.key === 'End') target = tabs.length - 1;
          if (target !== null) {
            event.preventDefault();
            activate(target, true);
          }
        });
      });
    });
  }

  /* Atrapa los fakes ------------------------------------------------------- */
  var fakeAnswers = {};

  function renderFakes() {
    var app = $('#fakesApp');
    if (!app) return;
    var correctCount = 0;

    app.innerHTML = DATA.fakes.map(function (fake, index) {
      var answered = Object.prototype.hasOwnProperty.call(fakeAnswers, fake.id);
      var chosen = fakeAnswers[fake.id];
      var isCorrect = answered && chosen === fake.answer;
      var buttonTrue = answered && chosen === true ? ' is-picked' : '';
      var buttonFalse = answered && chosen === false ? ' is-picked' : '';
      if (isCorrect) correctCount += 1;

      return '<article class="fake-card' + (answered ? (isCorrect ? ' is-correct' : ' is-wrong') : '') + '" data-fake="' + fake.id + '">' +
        '<div class="fake-head"><span class="fake-num">' + String(index + 1).padStart(2, '0') + '</span><p>' + fake.text + '</p></div>' +
        '<div class="fake-actions">' +
          '<button class="fake-btn' + buttonTrue + '" type="button" data-fake-answer="true"' + (answered ? ' disabled' : '') + ' aria-pressed="' + (answered && chosen === true ? 'true' : 'false') + '">' + T('fakes.true') + '</button>' +
          '<button class="fake-btn' + buttonFalse + '" type="button" data-fake-answer="false"' + (answered ? ' disabled' : '') + ' aria-pressed="' + (answered && chosen === false ? 'true' : 'false') + '">' + T('fakes.false') + '</button>' +
        '</div>' +
        (answered ?
          '<div class="fake-feedback"><strong>' + (fake.answer ? T('fakes.true') : T('fakes.false')) + '.</strong> ' + fake.explain + '</div>' :
          '') +
        '</article>';
    }).join('');

    var score = $('#fakeScore');
    if (score) score.textContent = correctCount + '/' + DATA.fakes.length;
    var result = $('#fakesResult');
    if (result) {
      var answeredCount = Object.keys(fakeAnswers).length;
      if (answeredCount === DATA.fakes.length) {
        if (correctCount === DATA.fakes.length) {
          result.textContent = T('fakes.perfect', { n: DATA.fakes.length });
        } else {
          result.textContent = T('fakes.missed', { correct: correctCount, total: DATA.fakes.length });
        }
      } else {
        result.textContent = '';
      }
    }
  }

  function initFakes() {
    var app = $('#fakesApp');
    if (!app) return;
    renderFakes();

    app.addEventListener('click', function (event) {
      var button = event.target.closest('[data-fake-answer]');
      if (!button) return;
      var card = button.closest('[data-fake]');
      if (!card) return;
      var id = card.dataset.fake;
      if (Object.prototype.hasOwnProperty.call(fakeAnswers, id)) return;
      fakeAnswers[id] = button.dataset.fakeAnswer === 'true';
      renderFakes();
    });

    var reset = $('#fakeReset');
    if (reset) {
      reset.addEventListener('click', function () {
        fakeAnswers = {};
        renderFakes();
        showToast(T('fakes.reset'));
      });
    }
  }

  /* Flashcards ------------------------------------------------------------- */
  var flashState = { cat: 'all', deck: [], index: 0, flipped: false, reviewAll: false };

  function flashFiltered() {
    if (flashState.cat === 'all') return DATA.flashcards.slice();
    return DATA.flashcards.filter(function (card) { return card.cat === flashState.cat; });
  }

  function buildFlashDeck(review) {
    var pool = flashFiltered();
    if (!review) {
      pool = pool.filter(function (card) { return state.knownCards.indexOf(card.id) === -1; });
    }
    flashState.deck = pool.map(function (card) { return card.id; });
    flashState.index = 0;
    flashState.flipped = false;
    flashState.reviewAll = !!review;
  }

  function flashCardById(id) {
    return DATA.flashcards.find(function (card) { return card.id === id; }) || null;
  }

  function renderFlashcards() {
    var app = $('#flashApp');
    if (!app) return;
    var total = DATA.flashcards.length;
    var known = state.knownCards.length;
    var percent = Math.round((known / total) * 100);
    var card = flashState.deck.length ? flashCardById(flashState.deck[flashState.index]) : null;

    if (!card && flashState.index !== 0) flashState.index = 0;
    if (!card) card = flashState.deck.length ? flashCardById(flashState.deck[0]) : null;

    var filters = Object.keys(FLASH_CATS).map(function (key) {
      return '<button type="button" class="filter-chip' + (flashState.cat === key ? ' is-active' : '') + '" data-flash-cat="' + key + '" aria-pressed="' + (flashState.cat === key ? 'true' : 'false') + '">' + FLASH_CATS[key] + '</button>';
    }).join('');

    var cardHtml = '';
    if (card) {
      cardHtml = '<div class="flash-card-wrap">' +
        '<div class="flash-card-top"><span class="flash-cat">' + FLASH_CATS[card.cat] + '</span><span class="flash-counter">' + (flashState.index + 1) + ' / ' + flashState.deck.length + '</span></div>' +
        '<button type="button" class="flash-card' + (flashState.flipped ? ' is-flipped' : '') + '" id="flashCard" data-flash-action="flip" aria-expanded="' + (flashState.flipped ? 'true' : 'false') + '" aria-label="Flashcard: ' + (flashState.flipped ? T('flash.aria.visible') : T('flash.aria.hidden')) + '">' +
          '<span class="flash-face flash-front">' +
            '<span class="flash-tag">' + T('flash.tag.question') + '</span>' +
            '<span class="flash-text">' + card.q + '</span>' +
            '<span class="flash-hint">' + T('flash.hint.reveal') + '</span>' +
          '</span>' +
          '<span class="flash-face flash-back">' +
            '<span class="flash-tag">' + T('flash.tag.answer') + '</span>' +
            '<span class="flash-text">' + card.a + '</span>' +
            '<span class="flash-hint">' + T('flash.hint.back') + '</span>' +
          '</span>' +
        '</button>' +
        '<div class="flash-actions">' +
          '<button type="button" class="btn btn-ghost" data-flash-action="again"><svg class="icon" aria-hidden="true"><use href="#i-rotate"></use></svg>' + T('flash.again') + '</button>' +
          '<button type="button" class="btn btn-primary" data-flash-action="know"><svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg>' + T('flash.know') + '</button>' +
        '</div>' +
      '</div>';
    } else {
      cardHtml = '<div class="flash-complete">' +
        '<span class="complete-icon"><svg class="icon" aria-hidden="true"><use href="#i-trophy"></use></svg></span>' +
        '<h3>' + (flashState.reviewAll ? T('flash.complete.reviewTitle') : T('flash.complete.title')) + '</h3>' +
        '<p>' + (flashState.reviewAll
          ? T('flash.complete.reviewText')
          : T('flash.complete.masteredText')) + '</p>' +
        '<div class="flash-actions flash-actions-center">' +
          '<button type="button" class="btn btn-primary" data-flash-action="review"><svg class="icon" aria-hidden="true"><use href="#i-play"></use></svg>' + T('flash.reviewAll') + '</button>' +
          '<button type="button" class="btn btn-ghost" data-flash-action="reset"><svg class="icon" aria-hidden="true"><use href="#i-rotate"></use></svg>' + T('flash.resetDeck') + '</button>' +
        '</div>' +
      '</div>';
    }

    app.innerHTML =
      '<div class="flash-toolbar">' +
        '<div class="filter-chips">' + filters + '</div>' +
        '<div class="flash-tools">' +
          '<button type="button" class="tool-btn" data-flash-action="shuffle" title="' + T('flash.shuffleTitle') + '"><svg class="icon" aria-hidden="true"><use href="#i-shuffle"></use></svg><span>' + T('flash.shuffle') + '</span></button>' +
        '</div>' +
      '</div>' +
      '<div class="flash-meta"><span>' + T('flash.meta', { known: known, total: total }) + '</span><span>' + (flashState.cat === 'all' ? T('flash.allCats') : FLASH_CATS[flashState.cat]) + '</span></div>' +
      '<div class="flash-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + percent + '" aria-label="' + T('flash.progressAria') + '"><span style="width:' + percent + '%"></span></div>' +
      cardHtml;
  }

  function showFlashcard() {
    if (!flashState.deck.length) return;
    if (flashState.index >= flashState.deck.length) flashState.index = 0;
    flashState.flipped = false;
    renderFlashcards();
  }

  function initFlashcards() {
    var app = $('#flashApp');
    if (!app) return;
    buildFlashDeck(false);
    renderFlashcards();

    app.addEventListener('click', function (event) {
      var filter = event.target.closest('[data-flash-cat]');
      if (filter) {
        flashState.cat = filter.dataset.flashCat;
        buildFlashDeck(false);
        renderFlashcards();
        return;
      }

      var actionEl = event.target.closest('[data-flash-action]');
      if (!actionEl) return;
      var action = actionEl.dataset.flashAction;
      var currentId = flashState.deck[flashState.index];
      var currentCard = currentId ? flashCardById(currentId) : null;

      if (action === 'flip') {
        flashState.flipped = !flashState.flipped;
        var cardEl = $('#flashCard');
        if (cardEl) {
          cardEl.classList.toggle('is-flipped', flashState.flipped);
          cardEl.setAttribute('aria-expanded', flashState.flipped ? 'true' : 'false');
          cardEl.setAttribute('aria-label', 'Flashcard: ' + (flashState.flipped ? T('flash.aria.visible') : T('flash.aria.hidden')));
        }
        return;
      }

      if (action === 'again') {
        if (flashState.deck.length > 1 && currentId) {
          flashState.deck.splice(flashState.index, 1);
          flashState.deck.push(currentId);
        }
        flashState.flipped = false;
        renderFlashcards();
        return;
      }

      if (action === 'know') {
        if (currentCard && state.knownCards.indexOf(currentCard.id) === -1) {
          state.knownCards.push(currentCard.id);
          saveState();
          renderProgress();
          if (state.knownCards.length === DATA.flashcards.length) {
            flashState.deck = [];
            flashState.index = 0;
            renderFlashcards();
            showToast(T('flash.toast.all'));
            burstConfetti();
            return;
          }
        }
        if (currentId) {
          flashState.deck = flashState.deck.filter(function (id) { return id !== currentId; });
        }
        if (flashState.index >= flashState.deck.length) flashState.index = 0;
        flashState.flipped = false;
        renderFlashcards();
        return;
      }

      if (action === 'shuffle') {
        for (var i = flashState.deck.length - 1; i > 0; i -= 1) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = flashState.deck[i];
          flashState.deck[i] = flashState.deck[j];
          flashState.deck[j] = tmp;
        }
        flashState.index = 0;
        flashState.flipped = false;
        renderFlashcards();
        showToast(T('flash.toast.shuffle'));
        return;
      }

      if (action === 'review') {
        buildFlashDeck(true);
        renderFlashcards();
        return;
      }

      if (action === 'reset') {
        if (!window.confirm(T('flash.resetConfirm'))) return;
        var ids = flashFiltered().map(function (c) { return c.id; });
        state.knownCards = state.knownCards.filter(function (id) { return ids.indexOf(id) === -1; });
        saveState();
        renderProgress();
        buildFlashDeck(false);
        renderFlashcards();
        showToast(T('flash.toast.reset'));
      }
    });
  }

  /* Test ------------------------------------------------------------------- */
  var quiz = { active: false, finished: false, mode: 'full', ids: [], index: 0, answers: {}, results: null, newBest: false };

  function quizById(id) {
    return DATA.quiz.find(function (q) { return q.id === id; }) || null;
  }

  function renderQuizStart() {
    var app = $('#quizApp');
    if (!app) return;
    var total = DATA.quiz.length;
    var best = state.bestScore === null ? '—' : state.bestScore + '%';
    var attempts = state.attempts;
    var attemptLabel = attempts === 1 ? T('quiz.attempt.one') : T('quiz.attempt.many', { n: attempts });
    var quizFeatures = QUIZ_FEATURES.map(function (feature) {
      return '<li><svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg>' + feature + '</li>';
    }).join('');

    app.innerHTML =
      '<div class="quiz-start">' +
        '<div class="quiz-start-main">' +
          '<span class="kicker">' + T('quiz.start.kicker', { total: total }) + '</span>' +
          '<h3>' + T('quiz.start.title') + '</h3>' +
          '<p>' + T('quiz.start.text') + '</p>' +
          '<ul class="quiz-features">' + quizFeatures + '</ul>' +
          '<button type="button" class="btn btn-primary" data-quiz="start">' + T('quiz.start.button') + '<svg class="icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg></button>' +
        '</div>' +
        '<aside class="quiz-best-card" aria-label="' + T('quiz.best.aria') + '">' +
          '<span class="panel-label">' + T('quiz.best.label') + '</span>' +
          '<strong>' + best + '</strong>' +
          '<small>' + (attempts ? attemptLabel : T('quiz.noAttempts')) + '</small>' +
          '<div class="quiz-best-bar"><span style="width:' + (state.bestScore || 0) + '%"></span></div>' +
          '<p>' + T('quiz.best.text') + '</p>' +
        '</aside>' +
      '</div>';
  }

  function startQuiz(ids, mode) {
    if (!ids.length) return;
    quiz = { active: true, finished: false, mode: mode, ids: ids, index: 0, answers: {}, results: null, newBest: false };
    renderQuestion();
  }

  function currentQuestion() {
    if (!quiz.active || quiz.finished) return null;
    return quizById(quiz.ids[quiz.index]);
  }

  function answerCurrent(optionIndex) {
    var question = currentQuestion();
    if (!question) return;
    if (quiz.answers[question.id] !== undefined) return;
    if (optionIndex < 0 || optionIndex >= question.options.length) return;
    quiz.answers[question.id] = optionIndex;
    renderQuestion();
  }

  function nextQuestion() {
    if (quiz.index >= quiz.ids.length - 1) {
      finishQuiz();
      return;
    }
    quiz.index += 1;
    renderQuestion();
  }

  function renderQuestion() {
    var app = $('#quizApp');
    var question = currentQuestion();
    if (!app || !question) return;

    var total = quiz.ids.length;
    var answer = quiz.answers[question.id];
    var answered = answer !== undefined;
    var last = quiz.index === total - 1;
    var progress = Math.round(((quiz.index + 1) / total) * 100);
    var letters = ['A', 'B', 'C', 'D'];
    var modeLabel = quiz.mode === 'review' ? T('quiz.mode.review') : T('quiz.mode.full');

    var optionsHtml = question.options.map(function (option, index) {
      var classes = 'quiz-option';
      var icon = '';
      if (answered) {
        if (index === question.correct) {
          classes += ' is-correct';
          icon = '<svg class="icon option-icon" aria-hidden="true"><use href="#i-check"></use></svg>';
        } else if (index === answer) {
          classes += ' is-wrong';
          icon = '<svg class="icon option-icon" aria-hidden="true"><use href="#i-x"></use></svg>';
        } else {
          classes += ' is-muted';
        }
      }
      return '<button type="button" class="' + classes + '" data-answer="' + index + '"' + (answered ? ' disabled' : '') + '>' +
        '<span class="option-letter">' + letters[index] + '</span>' +
        '<span class="option-text">' + option + '</span>' +
        icon +
      '</button>';
    }).join('');

    var feedback = '';
    if (answered) {
      var correct = answer === question.correct;
      feedback = '<div class="quiz-feedback ' + (correct ? 'is-correct' : 'is-wrong') + '" role="status">' +
        '<span class="feedback-icon"><svg class="icon" aria-hidden="true"><use href="' + (correct ? '#i-check-circle' : '#i-alert') + '"></use></svg></span>' +
        '<div><strong>' + (correct ? T('quiz.correct') : T('quiz.wrong')) + '</strong><p>' + question.explain + '</p></div>' +
      '</div>' +
      '<div class="quiz-nav">' +
        '<span class="quiz-tally">' + T('quiz.tally', { n: Object.keys(quiz.answers).length, total: total }) + '</span>' +
        '<button type="button" class="btn btn-primary" data-quiz="next">' + (last ? T('quiz.results') : T('quiz.next')) + '<svg class="icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg></button>' +
      '</div>';
    } else {
      feedback = '<p class="quiz-hint">' + T('quiz.hint') + '</p>';
    }

    app.innerHTML =
      '<div class="quiz-shell">' +
        '<div class="quiz-top">' +
          '<div class="quiz-top-left"><span class="quiz-counter">' + T('quiz.counter', { n: quiz.index + 1, total: total }) + '</span>' +
            (question.official ? '<span class="official-badge"><svg class="icon" aria-hidden="true"><use href="#i-star"></use></svg>' + T('quiz.official') + '</span>' : '') +
          '</div>' +
          '<span class="quiz-mode">' + modeLabel + '</span>' +
        '</div>' +
        '<div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progress + '" aria-label="' + T('quiz.progressAria') + '"><span style="width:' + progress + '%"></span></div>' +
        '<h3 class="quiz-question">' + question.q + '</h3>' +
        '<div class="quiz-options" role="group" aria-label="' + T('quiz.optionsAria') + '">' + optionsHtml + '</div>' +
        feedback +
      '</div>';
  }

  function finishQuiz() {
    var correctCount = quiz.ids.reduce(function (sum, id) {
      var q = quizById(id);
      return sum + (q && quiz.answers[id] === q.correct ? 1 : 0);
    }, 0);
    var total = quiz.ids.length;
    var percent = Math.round((correctCount / total) * 100);
    var wrong = quiz.ids.map(quizById).filter(function (q) {
      return q && quiz.answers[q.id] !== q.correct;
    });
    var previousBest = state.bestScore;

    if (quiz.mode === 'full') {
      state.attempts += 1;
      if (state.bestScore === null || percent > state.bestScore) state.bestScore = percent;
      saveState();
      renderProgress();
    }

    quiz.finished = true;
    quiz.results = { correct: correctCount, total: total, percent: percent, wrong: wrong, mode: quiz.mode };
    quiz.newBest = quiz.mode === 'full' && (previousBest === null || percent > previousBest);
    renderQuizResults();
    if (quiz.mode === 'full' && percent >= 90) burstConfetti();
  }

  function renderQuizResults() {
    var app = $('#quizApp');
    if (!app || !quiz.results) return;
    var r = quiz.results;
    var message;
    if (r.percent >= 90) message = T('quiz.message.excellent');
    else if (r.percent >= 70) message = T('quiz.message.good');
    else if (r.percent >= 50) message = T('quiz.message.pass');
    else message = T('quiz.message.fail');

    var reviewHtml = '';
    if (r.wrong.length) {
      reviewHtml = '<details class="quiz-review">' +
        '<summary>' + T('quiz.review.summary') + '<span>' + r.wrong.length + '</span><svg class="icon" aria-hidden="true"><use href="#i-chevron-down"></use></svg></summary>' +
        '<div class="quiz-review-body">' +
          r.wrong.map(function (q) {
            var given = quiz.answers[q.id];
            return '<div class="wrong-item">' +
              '<h5>' + q.q + '</h5>' +
              '<p class="wrong-answer"><span>' + T('quiz.review.your') + '</span>' + q.options[given] + '</p>' +
              '<p class="right-answer"><span>' + T('quiz.review.correct') + '</span>' + q.options[q.correct] + '</p>' +
              '<p class="wrong-explain">' + q.explain + '</p>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</details>';
    }

    app.innerHTML =
      '<div class="quiz-results">' +
        '<div class="quiz-result-top">' +
          '<div class="score-ring" style="--p:' + r.percent + '"><span>' + r.percent + '%</span></div>' +
          '<div class="quiz-result-copy">' +
            (quiz.newBest ? '<span class="new-best"><svg class="icon" aria-hidden="true"><use href="#i-trophy"></use></svg>' + T('quiz.newBest') + '</span>' : '') +
            '<span class="kicker">' + (r.mode === 'review' ? T('quiz.kicker.review') : T('quiz.kicker.result')) + '</span>' +
            '<h3>' + message + '</h3>' +
            '<p>' + T('quiz.result.correct', { correct: r.correct, total: r.total, note: r.mode === 'review' ? T('quiz.result.reviewNote') : T('quiz.result.savedNote') }) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="result-bars">' +
          '<div><span>' + T('quiz.result.correctLabel') + '</span><strong>' + r.correct + '</strong></div>' +
          '<div><span>' + T('quiz.result.wrongLabel') + '</span><strong>' + (r.total - r.correct) + '</strong></div>' +
          '<div><span>' + T('quiz.result.scoreLabel') + '</span><strong>' + r.percent + '%</strong></div>' +
        '</div>' +
        '<div class="quiz-result-actions">' +
          '<button type="button" class="btn btn-primary" data-quiz="retry"><svg class="icon" aria-hidden="true"><use href="#i-rotate"></use></svg>' + T('quiz.retry') + '</button>' +
          (r.wrong.length ? '<button type="button" class="btn btn-ghost" data-quiz="review"><svg class="icon" aria-hidden="true"><use href="#i-target"></use></svg>' + T('quiz.review.button', { n: r.wrong.length }) + '</button>' : '') +
          '<a class="btn btn-quiet" href="#resumen">' + T('quiz.cheat') + '</a>' +
        '</div>' +
        reviewHtml +
      '</div>';
  }

  function initQuiz() {
    var app = $('#quizApp');
    if (!app) return;
    renderQuizStart();

    app.addEventListener('click', function (event) {
      var option = event.target.closest('[data-answer]');
      if (option && quiz.active && !quiz.finished) {
        answerCurrent(Number(option.dataset.answer));
        return;
      }

      var actionEl = event.target.closest('[data-quiz]');
      if (!actionEl) return;
      var action = actionEl.dataset.quiz;

      if (action === 'start') {
        startQuiz(DATA.quiz.map(function (q) { return q.id; }), 'full');
      } else if (action === 'next') {
        if (quiz.active && !quiz.finished) nextQuestion();
      } else if (action === 'retry') {
        startQuiz(DATA.quiz.map(function (q) { return q.id; }), 'full');
      } else if (action === 'review') {
        if (quiz.results && quiz.results.wrong.length) {
          startQuiz(quiz.results.wrong.map(function (q) { return q.id; }), 'review');
        }
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!quiz.active || quiz.finished) return;
      var active = document.activeElement;
      if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
      var question = currentQuestion();
      if (!question) return;
      var answered = quiz.answers[question.id] !== undefined;
      if (!answered) {
        var number = parseInt(event.key, 10);
        if (number >= 1 && number <= question.options.length) {
          event.preventDefault();
          answerCurrent(number - 1);
        }
      } else if (event.key === 'Enter') {
        event.preventDefault();
        nextQuestion();
      }
    });
  }

  /* Glosario --------------------------------------------------------------- */
  var glossaryCat = 'all';
  var glossaryQuery = '';

  function renderGlossaryFilters() {
    var filters = $('#glossaryFilters');
    if (!filters) return;
    filters.innerHTML = Object.keys(CATS).map(function (key) {
      return '<button type="button" class="filter-chip' + (glossaryCat === key ? ' is-active' : '') + '" data-glossary-cat="' + key + '" aria-pressed="' + (glossaryCat === key ? 'true' : 'false') + '">' + CATS[key] + '</button>';
    }).join('');
  }

  function renderGlossary() {
    var grid = $('#glossaryGrid');
    if (!grid) return;
    var query = normalize(glossaryQuery.trim());
    var list = DATA.glossary.filter(function (item) {
      if (glossaryCat !== 'all' && item.cat !== glossaryCat) return false;
      if (!query) return true;
      return normalize(item.term + ' ' + item.ca + ' ' + item.def).indexOf(query) !== -1;
    });

    grid.innerHTML = list.map(function (item) {
      return '<article class="term-card">' +
        '<div class="term-head"><h4>' + item.term + '</h4><span class="term-tag" data-cat="' + item.cat + '">' + CATS[item.cat] + '</span></div>' +
        (item.ca && normalize(item.ca) !== normalize(item.term) ? '<p class="term-ca">' + item.ca + '</p>' : '') +
        '<p class="term-def">' + item.def + '</p>' +
      '</article>';
    }).join('');

    var count = $('#glossaryCount');
    if (count) {
      count.textContent = query || glossaryCat !== 'all'
        ? T('glossary.filtered', { shown: list.length, total: DATA.glossary.length })
        : T('glossary.total', { total: DATA.glossary.length });
    }
    var empty = $('#glossaryEmpty');
    if (empty) empty.hidden = list.length !== 0;
    renderGlossaryFilters();
  }

  function initGlossary() {
    renderGlossaryFilters();
    renderGlossary();
    var search = $('#glossarySearch');
    if (search) {
      search.addEventListener('input', function () {
        glossaryQuery = search.value;
        renderGlossary();
      });
    }
    var filters = $('#glossaryFilters');
    if (filters) {
      filters.addEventListener('click', function (event) {
        var button = event.target.closest('[data-glossary-cat]');
        if (!button) return;
        glossaryCat = button.dataset.glossaryCat;
        renderGlossary();
      });
    }
  }

  /* Autoevaluación de soft skills ------------------------------------------ */
  function renderSelfRows() {
    var container = $('#selfSkills');
    if (!container) return;
    container.innerHTML = '<div class="self-legend"><span>' + T('self.legend.low') + '</span><span>' + T('self.legend.high') + '</span></div>' +
      DATA.softSkills.map(function (skill) {
        var value = Number(state.self[skill.id]) || 0;
        var buttons = [1, 2, 3, 4, 5].map(function (n) {
          var active = value === n;
          return '<button type="button" class="scale-btn' + (active ? ' is-active' : '') + '" data-self-skill="' + skill.id + '" data-self-value="' + n + '" aria-pressed="' + (active ? 'true' : 'false') + '" aria-label="' + T('self.aria', { label: skill.label, n: n }) + '">' + n + '</button>';
        }).join('');
        return '<div class="self-row">' +
          '<div class="self-label">' +
            '<span class="icon-bubble"><svg class="icon" aria-hidden="true"><use href="#i-' + skill.icon + '"></use></svg></span>' +
            '<div><strong>' + skill.label + '</strong><small>' + skill.short + '</small></div>' +
          '</div>' +
          '<div class="self-scale" role="group" aria-label="' + T('self.groupAria', { label: skill.label }) + '">' + buttons + '</div>' +
        '</div>';
      }).join('');
    updateSelfSummary();
  }

  function updateSelfSummary() {
    var average = $('#selfAverage');
    var copy = $('#selfSummary p');
    if (!average || !copy) return;
    var values = DATA.softSkills.map(function (skill) { return Number(state.self[skill.id]) || 0; });
    var rated = values.filter(function (value) { return value > 0; });
    if (!rated.length) {
      average.textContent = '—';
      copy.textContent = T('self.empty', { n: DATA.softSkills.length, noun: SELF_NOUN });
      return;
    }
    var sum = rated.reduce(function (a, b) { return a + b; }, 0);
    var avg = (sum / rated.length).toFixed(1);
    average.textContent = avg;
    if (rated.length < DATA.softSkills.length) {
      copy.textContent = T('self.partial', { rated: rated.length, total: DATA.softSkills.length, noun: SELF_NOUN, avg: avg });
      return;
    }
    var sorted = DATA.softSkills.map(function (skill) {
      return { label: skill.label, value: Number(state.self[skill.id]) || 0 };
    }).sort(function (a, b) { return b.value - a.value; });
    var top = sorted[0];
    var low = sorted[sorted.length - 1];
    if (top.value === low.value) {
      copy.textContent = T('self.homogeneous', { avg: avg });
    } else {
      copy.textContent = T('self.strong', { avg: avg, top: top.label, topValue: top.value, low: low.label, lowValue: low.value });
    }
  }

  function initSelf() {
    var container = $('#selfSkills');
    if (!container) return;
    renderSelfRows();
    container.addEventListener('click', function (event) {
      var button = event.target.closest('[data-self-skill]');
      if (!button) return;
      var skill = button.dataset.selfSkill;
      var value = Number(button.dataset.selfValue);
      state.self[skill] = value;
      saveState();
      var row = button.closest('.self-row');
      if (row) {
        $$('.scale-btn', row).forEach(function (btn) {
          var active = Number(btn.dataset.selfValue) === value;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      }
      updateSelfSummary();
    });
  }

  /* Plan personal ---------------------------------------------------------- */
  var planTimer = null;

  function renderPlan() {
    $$('[data-plan]').forEach(function (field) {
      field.value = state.plan[field.dataset.plan] || '';
    });
    var status = $('#planStatus');
    if (status) {
      status.textContent = Object.keys(state.plan).some(function (key) { return state.plan[key]; })
        ? T('plan.saved')
        : T('plan.idle');
    }
  }

  function initPlan() {
    renderPlan();
    var fields = $$('[data-plan]');
    fields.forEach(function (field) {
      field.addEventListener('input', function () {
        state.plan[field.dataset.plan] = field.value;
        var status = $('#planStatus');
        if (status) status.textContent = T('plan.saving');
        window.clearTimeout(planTimer);
        planTimer = window.setTimeout(function () {
          saveState();
          if (status) status.textContent = T('plan.saved');
        }, 350);
      });
    });

    var saveButton = $('[data-save-plan]');
    if (saveButton) {
      saveButton.addEventListener('click', function () {
        saveState();
        var status = $('#planStatus');
        if (status) status.textContent = T('plan.saved');
        showToast(T('plan.toast'));
      });
    }
  }

  /* Reinicio --------------------------------------------------------------- */
  function resetAllProgress() {
    var ok = window.confirm(T('reset.confirm'));
    if (!ok) return;
    var theme = state.theme;
    state = Object.assign({}, DEFAULT_STATE, { theme: theme });
    saveState();

    fakeAnswers = {};
    renderFakes();

    flashState = { cat: 'all', deck: [], index: 0, flipped: false, reviewAll: false };
    buildFlashDeck(false);
    renderFlashcards();

    quiz = { active: false, finished: false, mode: 'full', ids: [], index: 0, answers: {}, results: null, newBest: false };
    renderQuizStart();

    renderSelfRows();
    renderPlan();
    renderProgress();

    var filters = $('#glossaryFilters');
    if (filters) {
      glossaryCat = 'all';
      renderGlossary();
    }
    showToast(T('reset.toast'));
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  /* Varios ----------------------------------------------------------------- */
  function initMisc() {
    $$('[data-count-cards]').forEach(function (el) { el.textContent = DATA.flashcards.length; });
    $$('[data-count-quiz]').forEach(function (el) { el.textContent = DATA.quiz.length; });

    var printButton = $('[data-print]');
    if (printButton) printButton.addEventListener('click', function () { window.print(); });

    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  function init() {
    initTheme();
    initMisc();
    initNav();
    initTabs();
    initFakes();
    initFlashcards();
    initQuiz();
    initGlossary();
    initSelf();
    initPlan();
    renderProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
