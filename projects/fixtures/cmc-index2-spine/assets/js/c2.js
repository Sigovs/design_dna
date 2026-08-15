/* =============================================================================
   index2 — two jobs, and no third.

   1. The bar's two states, kept separate. "The page has moved" tightens the
      bar; only "the bar has left the chapter it opened over" turns its ground
      solid. A bar that solidifies early draws a hard line through the opening
      composition for the whole length of the scroll.

   2. The register: one search field, roving tabindex across twenty records,
      one link out. Three tab stops, arrows to move, and no wrap-around — so
      Tab always leaves the list and nothing can be trapped inside it.

   There is no scroll choreography here, and no second scrollport anywhere on
   the page: the wheel, the trackpad and the thumb always move the document.
   The page is complete and usable with this file absent.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- 1 · the bar ------------------------------------------------------ */
  var bar = document.getElementById('bar');
  var opening = document.getElementById('open');
  var solidAt = Infinity;

  function measure() {
    if (!bar || !opening) return;
    var top = opening.getBoundingClientRect().top + window.scrollY;
    solidAt = top + opening.offsetHeight - bar.offsetHeight;
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      bar.classList.toggle('is-moved', y > 8);
      bar.classList.toggle('is-solid', y > solidAt);
      ticking = false;
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

  /* ---- 2 · the register -------------------------------------------------- */
  var reg = document.getElementById('reg');
  if (!reg) return;

  var rows = Array.prototype.slice.call(reg.querySelectorAll('li'));
  var links = rows.map(function (r) { return r.querySelector('a'); });
  var field = document.getElementById('q');
  var empty = document.getElementById('reg-none');
  var active = 0;

  function shown() {
    return rows.filter(function (r) { return !r.hidden; });
  }

  /* Only one record is ever tabbable. The others are reachable with the arrow
     keys, which is the whole point of the roving index: the column is one stop
     in the page's tab order, not twenty. */
  function setActive(i, moveFocus) {
    var vis = shown();
    if (!vis.length) return;
    i = Math.max(0, Math.min(i, vis.length - 1));
    links.forEach(function (a) { a.tabIndex = -1; });
    var row = vis[i];
    var a = row.querySelector('a');
    a.tabIndex = 0;
    active = rows.indexOf(row);
    if (moveFocus) a.focus();
  }

  setActive(0, false);

  reg.addEventListener('keydown', function (e) {
    var vis = shown();
    if (!vis.length) return;
    var cur = vis.indexOf(rows[active]);
    if (cur < 0) cur = 0;
    var next;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight': next = cur + 1; break;
      case 'ArrowUp':
      case 'ArrowLeft':  next = cur - 1; break;
      case 'Home':       next = 0; break;
      case 'End':        next = vis.length - 1; break;
      default: return;
    }

    /* deliberately not circular: at either end the focus stays put, so the
       list never recaptures a visitor who is trying to leave it */
    if (next < 0 || next > vis.length - 1) return;
    e.preventDefault();
    setActive(next, true);
  });

  reg.addEventListener('focusin', function (e) {
    var row = e.target.closest('li');
    if (row) setActive(shown().indexOf(row), false);
  });

  if (field) {
    field.addEventListener('input', function () {
      var t = field.value.trim().toLowerCase();
      var count = 0;
      rows.forEach(function (r) {
        var hit = !t || r.textContent.toLowerCase().indexOf(t) > -1;
        r.hidden = !hit;
        if (hit) count++;
      });
      if (empty) empty.hidden = count > 0;
      setActive(0, false);
    });

    field.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(0, true); }
    });
  }
})();
