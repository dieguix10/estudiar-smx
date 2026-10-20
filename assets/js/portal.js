(function () {
  'use strict';

  var UNITS = window.SMX_UNITS || {};
  var THEME_KEY = 'estudiarSMX.theme.v1';
  var T = window.SMX_T || function (key) { return key; };

  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };

  function readSavedState(key) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return {};
      var saved = JSON.parse(raw);
      return saved && typeof saved === 'object' ? saved : {};
    } catch (e) {
      return {};
    }
  }

  function getUnitProgress(unit) {
    var savedState = readSavedState(unit.storageKey);
    var sectionIds = (unit.sections || []).map(function (section) { return section.id; });
    var completed = Array.isArray(savedState.completed) ? savedState.completed.filter(function (id) {
      return sectionIds.indexOf(id) !== -1;
    }) : [];
    var knownCards = Array.isArray(savedState.knownCards) ? savedState.knownCards.filter(function (id) {
      return typeof id === 'string';
    }).length : 0;
    var bestScore = typeof savedState.bestScore === 'number' ? savedState.bestScore : null;
    var done = completed.length;
    var totalSections = sectionIds.length;
    var percent = totalSections ? Math.round((done / totalSections) * 100) : 0;

    return {
      savedState: savedState,
      completed: completed,
      done: done,
      totalSections: totalSections,
      percent: percent,
      knownCards: Math.min(knownCards, unit.totalCards || knownCards),
      totalCards: unit.totalCards || 0,
      bestScore: bestScore
    };
  }

  function readStoredTheme() {
    try {
      var stored = window.localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
      var ids = Object.keys(UNITS);
      for (var i = 0; i < ids.length; i += 1) {
        var state = readSavedState(UNITS[ids[i]].storageKey);
        if (state.theme === 'dark' || state.theme === 'light') return state.theme;
      }
    } catch (e) { /* El tema del sistema sigue siendo el fallback. */ }
    return '';
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) { /* El sitio sigue funcionando sin almacenamiento. */ }
  }

  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;
    var isDark = theme === 'dark';
    var toggle = $('#themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', isDark ? T('theme.light') : T('theme.dark'));
      toggle.setAttribute('title', isDark ? T('theme.light') : T('theme.dark'));
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#12100c' : '#f5f1e8');
    if (persist) saveTheme(theme);
  }

  function initTheme() {
    applyTheme(document.documentElement.dataset.theme || readStoredTheme() || 'light', false);
    var toggle = $('#themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  function setText(root, selector, value) {
    var el = $(selector, root);
    if (el) el.textContent = value;
  }

  function getSubjectGroups() {
    var groups = {};
    Object.keys(UNITS).forEach(function (id) {
      var unit = UNITS[id];
      var subjectId = unit.subjectId || id;
      if (!groups[subjectId]) {
        groups[subjectId] = {
          id: subjectId,
          code: unit.code || subjectId.toUpperCase(),
          subject: unit.subject || '',
          units: []
        };
      }
      groups[subjectId].units.push(unit);
    });
    return groups;
  }

  function getSubjectProgress(group) {
    var progress = {
      done: 0,
      totalSections: 0,
      knownCards: 0,
      totalCards: 0,
      bestScore: null,
      nextUnit: null,
      nextSection: null
    };

    group.units.forEach(function (unit) {
      var unitProgress = getUnitProgress(unit);
      progress.done += unitProgress.done;
      progress.totalSections += unitProgress.totalSections;
      progress.knownCards += unitProgress.knownCards;
      progress.totalCards += unitProgress.totalCards;
      if (unitProgress.bestScore !== null && (progress.bestScore === null || unitProgress.bestScore > progress.bestScore)) {
        progress.bestScore = unitProgress.bestScore;
      }
      if (!progress.nextSection && unitProgress.done < unitProgress.totalSections) {
        progress.nextUnit = unit;
        progress.nextSection = (unit.sections || []).filter(function (section) {
          return unitProgress.completed.indexOf(section.id) === -1;
        })[0] || null;
      }
    });

    progress.percent = progress.totalSections ? Math.round((progress.done / progress.totalSections) * 100) : 0;
    return progress;
  }

  function renderSubject(root, group) {
    if (!root || !group) return;
    var progress = getSubjectProgress(group);

    setText(root, '[data-unit-percent]', progress.percent + '%');
    setText(root, '[data-unit-sections]', progress.done + '/' + progress.totalSections);
    setText(root, '[data-unit-cards]', progress.knownCards + '/' + progress.totalCards);
    setText(root, '[data-unit-best]', progress.bestScore === null ? '—' : Math.round(progress.bestScore) + '%');

    $$('[data-unit-ring]', root).forEach(function (el) {
      el.style.setProperty('--p', progress.percent);
    });
    $$('[data-unit-bar]', root).forEach(function (el) {
      el.style.setProperty('--p', progress.percent + '%');
    });

    var nextTitle = $('[data-unit-next-title]', root);
    var nextText = $('[data-unit-next-text]', root);
    if (!nextTitle || !nextText) return;

    if (progress.done >= progress.totalSections) {
      if (group.units.length === 1) {
        nextTitle.textContent = T('portal.unitComplete', { unit: group.units[0].unit });
        nextText.textContent = T('portal.unitCompleteText');
      } else {
        nextTitle.textContent = T('portal.subjectComplete');
        nextText.textContent = T('portal.subjectCompleteText');
      }
    } else if (progress.nextUnit && progress.nextSection) {
      nextTitle.textContent = progress.done === 0
        ? T('portal.next.start', { unit: progress.nextUnit.unit })
        : T('portal.next.continue', { title: progress.nextSection.title });
      nextText.textContent = progress.nextSection.desc;
    }
  }

  function renderOverall() {
    var root = $('[data-overall]');
    if (!root) return;

    var groups = getSubjectGroups();
    var subjectIds = Object.keys(groups);
    var totalSections = 0;
    var doneSections = 0;
    var knownCards = 0;
    var totalCards = 0;
    var bestScore = null;

    subjectIds.forEach(function (id) {
      var progress = getSubjectProgress(groups[id]);
      totalSections += progress.totalSections;
      doneSections += progress.done;
      knownCards += progress.knownCards;
      totalCards += progress.totalCards;
      if (progress.bestScore !== null && (bestScore === null || progress.bestScore > bestScore)) {
        bestScore = progress.bestScore;
      }
    });

    var percent = totalSections ? Math.round((doneSections / totalSections) * 100) : 0;
    setText(root, '[data-overall-percent]', percent + '%');
    setText(root, '[data-overall-subjects]', String(subjectIds.length));
    setText(root, '[data-overall-sections]', doneSections + '/' + totalSections);
    setText(root, '[data-overall-best]', bestScore === null ? '—' : Math.round(bestScore) + '%');
    setText(root, '[data-overall-copy]', T('portal.overallCopy', { subjects: subjectIds.length, sections: totalSections, cards: totalCards }));

    $$('[data-overall-ring]', root).forEach(function (el) {
      el.style.setProperty('--p', percent);
    });
  }

  function renderProgress() {
    var groups = getSubjectGroups();
    Object.keys(groups).forEach(function (subjectId) {
      $$('[data-unit-card="' + subjectId + '"]').forEach(function (root) { renderSubject(root, groups[subjectId]); });
      $$('[data-unit-page="' + subjectId + '"]').forEach(function (root) { renderSubject(root, groups[subjectId]); });
    });
    renderOverall();
  }

  function initMenu() {
    var menuToggle = $('#menuToggle');
    var mobileMenu = $('#mobileMenu');
    if (!menuToggle || !mobileMenu) return;

    function closeMenu() {
      mobileMenu.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', T('menu.open'));
      document.body.classList.remove('menu-open');
    }

    function openMenu() {
      mobileMenu.hidden = false;
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', T('menu.close'));
      document.body.classList.add('menu-open');
    }

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

  function initMisc() {
    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    var header = $('.site-header');
    var toTop = $('#toTop');
    function onScroll() {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 700);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }
  }

  function init() {
    initTheme();
    initMenu();
    initMisc();
    renderProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
