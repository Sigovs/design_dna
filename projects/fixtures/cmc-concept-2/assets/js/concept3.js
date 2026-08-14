/* ==========================================================================
   Chicago Motor Cars — CONCEPT 3
   concept3.js — header state, the sheet, and one reveal on the lots.
   Nothing here hides content by default: a blocked script leaves the page
   complete, and reduced motion is honoured before anything is armed.
   ========================================================================== */

(function () {
  'use strict';

  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- the bar takes a ground only once the hero has left ---------------- */
  var bar = document.querySelector('.c3-bar');
  var hero = document.querySelector('.c3-hero');
  if (bar && hero) {
    var past = null;
    var sync = function () {
      /* the ground has to arrive BEFORE the hero's own foot line slides
         under the bar, or the two collide for the length of that scroll */
      var v = window.scrollY > hero.offsetHeight - bar.offsetHeight - 160;
      if (v !== past) { past = v; bar.setAttribute('data-past', String(v)); }
    };
    sync();
    window.addEventListener('scroll', function () { window.requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener('resize', function () { window.requestAnimationFrame(sync); });
  }

  /* --- the sheet: the page's only overlay -------------------------------- */
  var sheet = document.getElementById('c3-sheet');
  var open = document.getElementById('c3-open');
  var close = document.getElementById('c3-close');
  if (sheet && open && close) {
    var last = null;
    var show = function () {
      last = document.activeElement;
      sheet.setAttribute('data-open', 'true'); sheet.hidden = false;
      open.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      close.focus();
    };
    var hide = function () {
      sheet.setAttribute('data-open', 'false'); sheet.hidden = true;
      open.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      if (last) { last.focus(); }
    };
    open.addEventListener('click', show);
    close.addEventListener('click', hide);
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) { hide(); } });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet.getAttribute('data-open') === 'true') { hide(); }
    });
    sheet.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') { return; }
      var f = sheet.querySelectorAll('a[href], button');
      if (!f.length) { return; }
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
    window.matchMedia('(min-width: 60rem)').addEventListener('change', function (m) {
      if (m.matches && sheet.getAttribute('data-open') === 'true') { hide(); }
    });
  }

  /* --- one reveal, and its only job is to let each automobile ARRIVE -----
     The vehicle rises 24px and resolves from 0 to full while its designation
     behind it settles a beat later. It is the same gesture in both lots, so
     it is the page's grammar rather than an effect. Nothing is hidden unless
     motion is allowed and the script has run. ---------------------------- */
  if (motionOK && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('[data-arrive]');
    if (targets.length) {
      document.documentElement.classList.add('c3-armed');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.setAttribute('data-arrived', 'true'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -18% 0px' });
      targets.forEach(function (t) { io.observe(t); });
    }
  }

  /* --- anchor targets clear the fixed bar -------------------------------- */
  var setOffset = function () {
    if (!bar) { return; }
    var h = bar.offsetHeight + 24;
    document.querySelectorAll('[id]').forEach(function (el) {
      if (el === bar || el.closest('.c3-sheet')) { return; }
      el.style.scrollMarginBlockStart = h + 'px';
    });
  };
  setOffset();
  window.addEventListener('resize', function () { window.requestAnimationFrame(setOffset); });

}());
