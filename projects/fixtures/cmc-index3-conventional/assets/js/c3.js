/* =============================================================================
   index3 — three jobs, and no fourth.

   1. The bar's two states, kept apart. "The page has moved" tightens it; only
      "the bar has left the film it opened over" turns its ground solid, so a
      hard edge is never drawn through the opening composition.

   2. The film. The source is attached by script rather than in the markup, so
      that a visitor who asks for reduced motion, or is on a metered
      connection, never downloads it and gets the authored poster frame
      instead. The clip plays its approach once and holds on its closing frame;
      it does not loop, so nothing on the page moves after the first five
      seconds.

   The page is complete and usable with this file absent: the poster shows, the
   form submits, every link works, and nothing is hidden.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- 1 · the bar ------------------------------------------------------ */
  var bar = document.getElementById('bar');
  var veil = document.getElementById('veil');
  var film = document.querySelector('.film');
  var solidAt = Infinity;

  function measure() {
    if (!bar || !film) return;
    solidAt = film.getBoundingClientRect().top + window.scrollY + film.offsetHeight - bar.offsetHeight;
  }

  var pending = false;
  function onScroll() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      bar.classList.toggle('is-moved', y > 8);
      var solid = y > solidAt;
      bar.classList.toggle('is-solid', solid);
      if (veil) veil.classList.toggle('is-off', solid);
      pending = false;
    });
  }

  if (bar) {
    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); onScroll(); });
    }
  }

  /* ---- 2 · the film ------------------------------------------------------ */
  var v = document.getElementById('filmv');
  var poster = document.getElementById('filmp');

  function stillOnly(narrow) {
    if (!v) return;
    v.remove();
    if (poster) {
      if (narrow) poster.src = "assets/video/c3/hero-poster-720.jpg";
      poster.hidden = false;
    }
  }

  if (v) {
    var quiet = window.matchMedia('(prefers-reduced-motion: reduce)');
    var saveData = navigator.connection && navigator.connection.saveData;
    var narrow = window.matchMedia('(max-width: 63.999rem)').matches;

    if (quiet.matches || saveData) {
      /* an authored still of the same moment, not a stopped animation */
      if (narrow) v.poster = 'assets/video/c3/hero-poster-720.jpg';
      stillOnly();
    } else {
      /* mobile is a separately authored crop, cut to stop before the car
         outgrows the portrait frame — never the desktop encode scaled down */
      var base = narrow ? 'assets/video/c3/hero-approach-720' : 'assets/video/c3/hero-approach-1600';
      if (narrow) v.poster = 'assets/video/c3/hero-poster-720.jpg';
      ['webm', 'mp4'].forEach(function (ext) {
        var s = document.createElement('source');
        s.src = base + '.' + ext;
        s.type = ext === 'webm' ? 'video/webm' : 'video/mp4';
        v.appendChild(s);
      });
      v.addEventListener('error', stillOnly, true);
      var play = v.play();
      if (play && play.catch) play.catch(function () { /* the poster is already showing */ });
    }
  }


  /* ---- 3 · the menu, on the formats that need one ------------------------ *
     The panel ships open, so a visitor without this script still reaches every
     destination — Warranty included. The script closes it and gives the button
     its state.                                                               */
  var mb = document.getElementById('menub');
  var menu = document.getElementById('menu');
  if (mb && menu) {
    var narrowQ = window.matchMedia('(max-width: 63.999rem)');
    var setOpen = function (open) {
      mb.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    var sync = function () { setOpen(!narrowQ.matches); };
    sync();
    narrowQ.addEventListener('change', sync);
    mb.addEventListener('click', function () {
      setOpen(mb.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && narrowQ.matches) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && narrowQ.matches && mb.getAttribute('aria-expanded') === 'true') {
        setOpen(false); mb.focus();
      }
    });
  }
})();
