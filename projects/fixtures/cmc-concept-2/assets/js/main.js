/* ==========================================================================
   Chicago Motor Cars — Concept 2
   main.js

   Three jobs and no fourth: the header's "page has moved" state, the mobile
   sheet, and the one film.

   There is deliberately NO scroll-reveal system on this page. Entry reveals
   would have the role "atmosphere" and nothing else (motion-judgment MJ1),
   and a record does not arrive one line at a time. Nothing here hides
   content, so a blocked script leaves the page complete.
   ========================================================================== */

(function () {
  'use strict';

  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- MASTHEAD
     One state, and it changes no ground: a hairline appears once the page
     has moved. The header never goes opaque over live content because it
     never sits over content — the opening is bone (U13). */

  var masthead = document.getElementById('masthead');
  if (masthead) {
    var moved = null;
    var syncMasthead = function () {
      var next = window.scrollY > 8;
      if (next !== moved) {
        moved = next;
        masthead.setAttribute('data-moved', String(next));
      }
    };
    syncMasthead();
    window.addEventListener('scroll', function () {
      window.requestAnimationFrame(syncMasthead);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------- SHEET
     The page's only overlay. Opening it is the one time anything covers
     content, and nothing else may be over content at the same time (U10). */

  var sheet = document.getElementById('sheet');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');

  if (sheet && openBtn && closeBtn) {
    var lastFocus = null;

    var openSheet = function () {
      lastFocus = document.activeElement;
      sheet.hidden = false;
      sheet.setAttribute('data-open', 'true');
      openBtn.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      closeBtn.focus();
    };

    var closeSheet = function () {
      sheet.setAttribute('data-open', 'false');
      sheet.hidden = true;
      openBtn.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      if (lastFocus) { lastFocus.focus(); }
    };

    openBtn.addEventListener('click', openSheet);
    closeBtn.addEventListener('click', closeSheet);

    sheet.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeSheet(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet.getAttribute('data-open') === 'true') {
        closeSheet();
      }
    });

    /* Keep tab order inside the sheet while it is the thing on screen. */
    sheet.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') { return; }
      var items = sheet.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) { return; }
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    /* A resize past the sheet's breakpoint leaves it stranded otherwise. */
    window.matchMedia('(min-width: 62rem)').addEventListener('change', function (m) {
      if (m.matches && sheet.getAttribute('data-open') === 'true') { closeSheet(); }
    });
  }

  /* ----------------------------------------------------------------- FILM
     The page's one ambient moment. Under reduced motion the video is never
     fetched and never inserted: the authored still underneath it is a real
     frame of the same room at the same moment, so the band is a photograph
     of the floor rather than a black rectangle (DM4, MJ9).

     The source is attached only when the band is close, so the 20 MB costs
     nothing until a visitor reaches it. */

  var film = document.getElementById('film');
  var filmToggle = document.getElementById('film-toggle');

  /* The authored window. The supplied file is 27.3s and wanders: it opens on
     a close crop of a bumper on a ramp and passes through two heavily
     blurred pans. Every frame a visitor can stop on is a frame this page is
     showing them (MJ4), so the band plays only the passage that holds —
     9s to 20s: the two Aventadors, the row under the Cobra mural, the row of
     Mustang Cobra Rs. IN is also the poster's own frame, so the still and
     the first moving frame are the same picture and the start is invisible.

     This is an edit made in the player because there is no ffmpeg on this
     machine. The real fix is a trimmed, re-encoded file, which also closes
     the 20 MB problem recorded in the README. */
  var FILM_IN = 9.0, FILM_OUT = 20.0;

  if (film && motionOK) {
    var armed = false;

    var arm = function () {
      if (armed) { return; }
      armed = true;
      film.src = film.getAttribute('data-src');
      film.load();
      film.addEventListener('loadedmetadata', function () { film.currentTime = FILM_IN; });
      film.addEventListener('timeupdate', function () {
        if (film.currentTime >= FILM_OUT || film.currentTime < FILM_IN - 0.5) {
          film.currentTime = FILM_IN;
        }
      });
      film.play().then(function () {
        film.setAttribute('data-playing', 'true');
        if (filmToggle) {
          filmToggle.hidden = false;
          filmToggle.textContent = 'Pause';
          filmToggle.setAttribute('aria-pressed', 'true');
        }
      }).catch(function () {
        /* Autoplay refused. The still stays, and the control appears so the
           visitor can start it themselves. */
        if (filmToggle) {
          filmToggle.hidden = false;
          filmToggle.textContent = 'Play';
          filmToggle.setAttribute('aria-pressed', 'false');
        }
      });
    };

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { arm(); io.unobserve(entry.target); }
        });
      }, { rootMargin: '200px 0px' });
      io.observe(film);
    } else {
      arm();
    }

    if (filmToggle) {
      filmToggle.addEventListener('click', function () {
        if (film.paused) {
          if (!armed) { arm(); return; }
          film.play();
          film.setAttribute('data-playing', 'true');
          filmToggle.textContent = 'Pause';
          filmToggle.setAttribute('aria-pressed', 'true');
        } else {
          film.pause();
          filmToggle.textContent = 'Play';
          filmToggle.setAttribute('aria-pressed', 'false');
        }
      });
    }

    /* Stop paying for it when it is off screen. */
    if ('IntersectionObserver' in window) {
      var pauseIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting && !film.paused) { film.pause(); }
          else if (entry.isIntersecting && armed && film.paused &&
                   filmToggle && filmToggle.getAttribute('aria-pressed') === 'true') {
            film.play();
          }
        });
      }, { threshold: 0.05 });
      pauseIO.observe(film);
    }
  }

  /* --------------------------------------------------------- ANCHOR OFFSET
     The masthead is a mass, so anything an anchor jumps to gets its height
     back as scroll-margin (U10). Set from the real element rather than a
     remembered number. */

  var setAnchorOffset = function () {
    if (!masthead) { return; }
    var h = masthead.offsetHeight;
    document.querySelectorAll('[id]').forEach(function (el) {
      if (el === masthead || el.closest('.sheet')) { return; }
      el.style.scrollMarginBlockStart = (h + 24) + 'px';
    });
  };
  setAnchorOffset();
  window.addEventListener('resize', function () {
    window.requestAnimationFrame(setAnchorOffset);
  });

}());
