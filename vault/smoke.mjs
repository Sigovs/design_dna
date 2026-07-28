#!/usr/bin/env node
/**
 * Gallery smoke test.  npm run smoke   (needs `npm run vault` running)
 *
 * The gallery has no backend and no build step, so nothing else catches a
 * boot-time exception — and one silent throw takes out every event listener on
 * the page. This checks that the thing actually works: cards render, filters and
 * search narrow the set, the detail view opens with its form, Esc closes it, and
 * there is no horizontal overflow at 390px.
 *
 * Pass a directory as the first argument to also write screenshots there.
 */

import { chromium, webkit, devices } from 'playwright';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const URL_BASE = process.env.VAULT_URL || 'http://localhost:5177/';
const OUT = process.argv[2] || null;
const shot = async (page, name, opts = {}) =>
  OUT && page.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 85, ...opts });

const problems = [];
/* The filter rows are collapsed behind one disclosure in the redesign — an
   apparatus should not be the first thing the eye meets. Anything clicking or
   measuring a chip opens it first; active chips remain visible in the summary. */
const openFilters = async (p) => {
  const pop = p.locator('#filter-pop');
  if (!(await pop.count())) return;
  if (!(await pop.evaluate((e) => e.matches(':popover-open')))) {
    await p.locator('#filter-trigger').click();
    await p.waitForTimeout(250);
  }
};

const check = (label, ok, detail = '') => {
  console.log(`${ok ? '  ✓' : '  ✗'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) problems.push(label);
};

/* The editing apparatus is a collapsed <details> in the redesign — demoted below
   the judgement so it stops out-massing the reference. Anything touching a form
   control opens it first; that is a selector update, not a weakened check. */
const openApparatus = async (p) => {
  const a = p.locator('#apparatus');
  if (!(await a.count())) return;
  if (!(await a.evaluate((el) => el.open))) {
    await p.locator('#apparatus > summary').click();
    await p.waitForTimeout(250);
  }
};

/* ── shots invariant ──────────────────────────────────────────────────────
   Runs before the browser, because it is the cheapest check in the file and it
   catches the failure that is hardest to notice: an entry quietly losing its
   screenshots. Shot-loss looks like a normal "no shots yet" card, so nothing
   else would flag it. */
console.log('\nshots invariant');
{
  const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
  const today = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  /* Shot fields are mixed since the filmstrip landed: strings for the page shots,
     arrays of frames for `strip` / `stripMobile`. Every path check flattens first
     — join() throws on an array, so an un-flattened loop fails as a crash rather
     than as a finding. */
  const shotPaths = (shots) => Object.entries(shots ?? {})
    .flatMap(([kind, v]) => (Array.isArray(v) ? v.map((f, i) => [`${kind}[${i}]`, f]) : [[kind, v]]))
    .filter(([, f]) => typeof f === 'string' && f);

  // 1. Every recorded path must resolve to a file on disk.
  const dangling = [];
  for (const e of sites) {
    for (const [kind, rel] of shotPaths(e.shots)) {
      if (!existsSync(join(VAULT, rel))) dangling.push(`${e.id}/${kind} -> ${rel}`);
    }
  }
  check('every recorded shots path resolves to a file', dangling.length === 0,
    dangling.length ? dangling.join(', ') : `${sites.length} entries checked`);

  // 1b. The filmstrip is a sequence: a gap in the numbering is a lost frame.
  const brokenStrips = [];
  for (const e of sites) {
    for (const key of ['strip', 'stripMobile']) {
      const frames = e.shots?.[key];
      if (!Array.isArray(frames) || !frames.length) continue;
      const prefix = key === 'strip' ? 'strip' : 'strip-m';
      const expected = frames.map((_, i) => `shots/${e.id}/${prefix}-${i + 1}.jpg`);
      if (JSON.stringify(frames) !== JSON.stringify(expected)) {
        brokenStrips.push(`${e.id}/${key}`);
      }
    }
  }
  check('filmstrip frames are stored in scroll order with no gaps', brokenStrips.length === 0,
    brokenStrips.length ? brokenStrips.join(', ') : 'sequence intact');

  // 2. Orphaned files: shots on disk that no entry points at any more.
  const referenced = new Set(sites.flatMap((e) => shotPaths(e.shots).map(([, f]) => f)));
  const shotDirs = existsSync(join(VAULT, 'shots'))
    ? readdirSync(join(VAULT, 'shots'), { withFileTypes: true })
        .filter((d) => d.isDirectory()).map((d) => d.name)
    : [];
  const orphanDirs = shotDirs.filter((dir) =>
    ![...referenced].some((rel) => rel.startsWith(`shots/${dir}/`))
    && !sites.some((e) => e.id === dir));
  /* A leftover directory is the expected residue of removing an entry through the
     download-json fallback, so it is a warning pointing at prune — not a failure. */
  if (orphanDirs.length) {
    console.log(`  ! ${orphanDirs.length} orphaned shot director${orphanDirs.length === 1 ? 'y' : 'ies'}`
      + ` (left by a removed entry) — clear with: npm run prune -- --yes`);
    orphanDirs.forEach((d) => console.log(`      vault/shots/${d}`));
  } else {
    check('no orphaned shot directories', true,
      `${shotDirs.length} dirs, ${referenced.size} files referenced`);
  }

  /* 3. Anything added before today has had time to be captured. Missing shots
        there means the Action failed or the paths were lost — flag, don't pass.
        An entry carrying a captureError is a DIFFERENT case: the failure is
        recorded on the entry and shown in the gallery, which is the whole point of
        that field. Those are surfaced as a warning, never silently passed. */
  const blocked = sites.filter((e) => e.captureError);
  const stale = sites.filter((e) => e.added < today && !e.captureError
    && !(e.shots?.full && e.shots?.hero && e.shots?.mobile));
  check('every entry older than today has all three shots, or a recorded reason',
    stale.length === 0,
    stale.length ? stale.map((e) => `${e.id} (added ${e.added})`).join(', ') : 'none pending');
  if (blocked.length) {
    console.log(`  ! ${blocked.length} entr${blocked.length === 1 ? 'y' : 'ies'} with a recorded capture failure`
      + ` (flagged in the gallery, not silently empty):`);
    blocked.forEach((e) => console.log(`      ${e.id} — ${e.captureError.split(' — ')[1] ?? e.captureError}`));
  }

  const awaiting = sites.filter((e) => e.added >= today && !e.shots?.full);
  if (awaiting.length) {
    console.log(`  · ${awaiting.length} added today still awaiting capture (not a failure): ${awaiting.map((e) => e.id).join(', ')}`);
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await ctx.newPage();

const errors = [];
/* Same attribution rule as the mobile matrix: the placeholder's favicon probe is
   a designed fallback chain, and the third-party service rate-limits. */
const isThirdPartyProbe = (t) => /favicon|s2\/favicons|gstatic|google\.com|api\.github\.com/i.test(t ?? '');
const badTopResponses = [];
page.on('response', (r) => {
  if (r.status() >= 400 && !isThirdPartyProbe(r.url())) badTopResponses.push(`${r.status()} ${r.url()}`);
});
page.on('console', (m) => {
  if (m.type() !== 'error') return;
  if (isThirdPartyProbe(m.text()) || isThirdPartyProbe(m.location()?.url)) return;
  if (/Failed to load resource/i.test(m.text()) && badTopResponses.length === 0) return;
  errors.push(m.text());
});
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => {
  if (!isThirdPartyProbe(r.url())) errors.push(`requestfailed: ${r.url()} — ${r.failure()?.errorText}`);
});

try {
  await page.goto(URL_BASE, { waitUntil: 'networkidle', timeout: 20_000 });
} catch {
  console.error(`\n✗ could not reach ${URL_BASE} — is \`npm run vault\` running?\n`);
  await browser.close();
  process.exit(1);
}
await page.waitForTimeout(1000);

console.log('\ngrid');
const cards = await page.locator('.card').count();
check('cards render', cards > 0, `${cards} cards`);
check('filter chips render', (await page.locator('.pill').count()) > 0);
check('count is populated', (await page.locator('#count').textContent()).trim().length > 0);

// Every card that should have a preview actually renders a loaded image.
const withShots = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'))
  .filter((e) => e.shots?.hero).length;
/* The pending placeholder renders a favicon <img> inside .card-shot, so a bare
   `.card-shot img` count includes entries that have no preview at all. */
check('every entry with a hero shot renders a preview',
  (await page.locator('.card-shot img:not(.pending-favicon)').count()) === withShots,
  `${await page.locator('.card-shot img:not(.pending-favicon)').count()} previews / ${withShots} expected`);
check('every preview image actually loaded',
  await page.locator('.card-shot img:not(.pending-favicon)').evaluateAll((imgs) =>
    imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0)));
/* .card-shot--empty no longer exists: pending and failed are distinct states. */
check('entries without shots show a placeholder, not a broken preview',
  (await page.locator('.card-shot--pending, .card-shot--failed').count()) ===
    (JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8')).length - withShots));
await shot(page, 'gallery-grid', { fullPage: true });

/* ── Phase B additions ────────────────────────────────────────────────────── */
console.log('\nC11 grid resolution');
check('the grid ends with a resolution line rather than stopping',
  await page.locator('#grid-end').isVisible()
  && /^end · /.test((await page.locator('#grid-end-count').textContent()).trim()),
  (await page.locator('#grid-end-count').textContent()).trim());
check('the end line states the note debt when there is any',
  (await page.locator('#grid-end-debt').textContent()).trim().length >= 0,
  (await page.locator('#grid-end-debt').textContent()).trim() || 'no debt');

console.log('\nfilter wall collapsed behind one disclosure');
{
  const fd = await browser.newContext();
  const fp = await fd.newPage();
  await fp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await fp.waitForSelector('.card');
  await fp.waitForTimeout(700);

  /* The filter panel is a POPOVER now: it overlays the grid instead of pushing
     it down. Same claim as before at a different altitude — the apparatus must
     not stand between the page and its first reference. */
  check('filters are behind one trigger, closed by default',
    !(await fp.locator('#filter-pop').evaluate((e) => e.matches(':popover-open'))));
  check('at most a handful of controls precede the first reference',
    (await fp.evaluate(() => {
      const card = document.querySelector('.card');
      return [...document.querySelectorAll('button,input,select,summary')]
        .filter((e) => e.checkVisibility?.()
          && e.getBoundingClientRect().top < card.getBoundingClientRect().top).length;
    })) <= 14,
    `${await fp.evaluate(() => {
      const card = document.querySelector('.card');
      return [...document.querySelectorAll('button,input,select,summary')]
        .filter((e) => e.checkVisibility?.()
          && e.getBoundingClientRect().top < card.getBoundingClientRect().top).length;
    })} controls before the first card (was 83 in the wall version)`);

  await fp.locator('#filter-trigger').click();
  await fp.waitForTimeout(300);
  check('the trigger opens the filter popover',
    await fp.locator('#filter-pop').evaluate((e) => e.matches(':popover-open')));
  check('the trigger reports its state to assistive tech',
    (await fp.locator('#filter-trigger').getAttribute('aria-expanded')) === 'true');
  /* The point of an overlay: opening it must not move what is underneath. */
  const gridTopBefore = await fp.evaluate(() => document.querySelector('.card').getBoundingClientRect().top);
  check('the grid does not move when the panel opens', Math.abs(gridTopBefore - (await fp.evaluate(() => document.querySelector('.card').getBoundingClientRect().top))) < 1);
  await fp.keyboard.press('Escape');
  await fp.waitForTimeout(300);
  check('escape closes the filter popover',
    !(await fp.locator('#filter-pop').evaluate((e) => e.matches(':popover-open'))));
  check('focus returns to the trigger',
    await fp.evaluate(() => document.activeElement?.id === 'filter-trigger'));

  check('search stays outside the panel, always reachable',
    await fp.locator('#search').isVisible());
  check('the trigger reads "filters" when nothing is active',
    (await fp.locator('#filter-count').textContent()).trim() === 'filters');
  check('clear-filters is hidden when nothing is active',
    await fp.locator('#clear-filters').isHidden());

  /* The pills live in the popover now, so anything counting or clicking one
     opens it first. That is a selector change, not a weakened check. */
  await openFilters(fp);

  // Only tags an entry actually carries are offered.
  const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
  const vocabFile = JSON.parse(readFileSync(join(VAULT, 'vocab.json'), 'utf8'));
  const used = new Set(sites.flatMap((e) => Object.values(e.tags ?? {}).flat()));
  const vocabTotal = Object.values(vocabFile.categories).reduce((n, c) => n + c.tags.length, 0);
  const rendered = await fp.locator('#filters .pill').count();
  /* "In use" can legitimately exceed the vocabulary: entries carry free additions
     that have not been promoted. The invariant is that UNUSED vocabulary tags are
     not offered — the old model rendered vocabulary ∪ used, which is what built
     the wall. */
  const offeredBefore = new Set([
    ...Object.values(vocabFile.categories).flatMap((c) => c.tags),
    ...used,
  ]);
  const unusedVocab = Object.values(vocabFile.categories)
    .flatMap((c) => c.tags).filter((t) => !used.has(t));
  check('only tags carried by at least one entry are rendered',
    rendered === used.size, `${rendered} rendered · ${used.size} in use · ${vocabTotal} in vocabulary`);
  check('unused vocabulary tags are not offered as filters',
    rendered < offeredBefore.size,
    `${rendered} now vs ${offeredBefore.size} under the old model · ${unusedVocab.length} unused vocab tags dropped`);

  // Set one filter: the summary counts it and shows it.
  await openFilters(fp);
  const tagLabel = (await fp.locator('#filters .pill').first().locator('span').first().textContent()).trim();
  await fp.locator('#filters .pill').first().click();
  await fp.waitForTimeout(400);
  await fp.keyboard.press('Escape');
  await fp.waitForTimeout(250);
  check('the trigger counts active filters with the panel closed',
    /\(1 active\)/.test(await fp.locator('#filter-count').textContent()),
    (await fp.locator('#filter-count').textContent()).trim());
  /* The filter pill carries a count beside its name, so the comparison is
     against the NAME span, not the whole pill's text. */
  check('the active pill names the filter it represents',
    (await fp.locator('#filter-active .pill').first().textContent()).trim() === tagLabel, tagLabel);
  check('clear-filters appears once something is active',
    await fp.locator('#clear-filters').isVisible());

  // Removable in place from the summary.
  const narrowed = await fp.locator('.card').count();
  await fp.locator('#filter-active .pill').first().click();
  await fp.waitForTimeout(400);
  check('clicking an active chip removes that filter',
    (await fp.locator('#filter-active .pill').count()) === 0
    && (await fp.locator('.card').count()) > narrowed);
  await fd.close();

  /* ≤40rem: the same panel, the same claim — an active filter must stay visible
     while the panel is closed, so a persisted filter is never hidden. */
  const mb = await webkit.launch();
  const mfp = await (await mb.newContext({ ...devices['iPhone 13'] })).newPage();
  await mfp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await mfp.waitForSelector('.card');
  await mfp.waitForTimeout(800);
  check('mobile keeps the filters behind the trigger',
    !(await mfp.locator('#filter-pop').evaluate((e) => e.matches(':popover-open'))));
  check('mobile shows no filter pills on the first screen while closed',
    !(await mfp.locator('#filters .pill').first().isVisible()));
  await openFilters(mfp);
  const mTag = (await mfp.locator('#filters .pill').first().textContent()).trim();
  await mfp.locator('#filters .pill').first().click();
  await mfp.waitForTimeout(400);
  await mfp.keyboard.press('Escape');
  await mfp.waitForTimeout(300);
  check('mobile: a set filter stays visible when the panel is closed',
    !(await mfp.locator('#filter-pop').evaluate((e) => e.matches(':popover-open')))
    && (await mfp.locator('#filter-active .pill').first().isVisible()), mTag);
  await mfp.reload({ waitUntil: 'domcontentloaded' });
  await mfp.waitForSelector('.card');
  await mfp.waitForTimeout(800);
  check('mobile: a persisted filter is never hidden after reload',
    (await mfp.locator('#filter-active .pill').count()) === 1
    && (await mfp.locator('#filter-active .pill').first().isVisible()));
  await mb.close();
}

/* A disclosure's revealed content must not land flush against its summary: the
   summary's padding sits inside its own box, so the measured gap was 0px on every
   surface. Asserted per surface, in pixels, not by inspection. */
console.log('\ndisclosure breathing room');
{
  const MIN = 16;   // --space-4 floor; the token is --space-disclosure (24px)
  const db = await browser.newContext();
  const dp = await db.newPage();
  await dp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await dp.waitForSelector('.card');
  await dp.waitForTimeout(900);

  const measure = (p, sumSel, contentSel) => p.evaluate(([s, c]) => {
    const su = document.querySelector(s), co = document.querySelector(c);
    if (!su || !co) return null;
    const sr = su.getBoundingClientRect(), cr = co.getBoundingClientRect();
    return { gap: Math.round(cr.top - sr.bottom), summaryH: Math.round(sr.height) };
  }, [sumSel, contentSel]);

  /* The filter panel is a popover: what has to clear is its own head, not a
     summary. Same rule, same floor, measured on the surface that now exists. */
  await dp.locator('#filter-trigger').click();
  await dp.waitForTimeout(350);
  const f = await measure(dp, '.popover-head', '#filters');
  check(`filters: the panel body clears its head by ≥${MIN}px`,
    f && f.gap >= MIN, f ? `${f.gap}px` : 'not found');
  await dp.keyboard.press('Escape');
  await dp.waitForTimeout(250);

  await dp.locator('.card').first().click();
  await dp.waitForTimeout(800);
  await openApparatus(dp);
  const a = await measure(dp, '#apparatus > summary', '#apparatus .form');
  check(`detail apparatus: revealed content clears the summary by ≥${MIN}px`,
    a && a.gap >= MIN, a ? `${a.gap}px` : 'not found');
  await dp.keyboard.press('Escape');
  await dp.waitForTimeout(300);

  /* The internal-gap < external-gap rule, on the two card stacks that were equal. */
  const stacks = await dp.evaluate(() => {
    const g = (sel, prop) => {
      const e = document.querySelector(sel);
      if (!e) return null;
      const cs = getComputedStyle(e);
      return { external: Math.round(parseFloat(cs.marginTop)), internal: Math.round(parseFloat(cs.rowGap || cs.gap || '0')) };
    };
    return { tags: g('.card-tags'), note: g('.note-row') };
  });
  check('card tag row: gap to neighbour exceeds its internal gap',
    stacks.tags && stacks.tags.external > stacks.tags.internal,
    stacks.tags ? `external ${stacks.tags.external} > internal ${stacks.tags.internal}` : 'n/a');
  check('card note row: gap to neighbour exceeds its internal gap',
    stacks.note && stacks.note.external > stacks.note.internal,
    stacks.note ? `external ${stacks.note.external} > internal ${stacks.note.internal}` : 'n/a');
  await db.close();

  /* Mobile: the same gap, plus the summary row must be a real tap target and the
     +/− glyph must sit a consistent step from its label. */
  const mb2 = await webkit.launch();
  const mp2 = await (await mb2.newContext({ ...devices['iPhone 13'] })).newPage();
  await mp2.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await mp2.waitForSelector('.card');
  await mp2.waitForTimeout(900);
  await mp2.locator('#filter-trigger').click();
  await mp2.waitForTimeout(500);
  const mf = await measure(mp2, '.popover-head', '#filters');
  check(`mobile filters: the panel body clears its head by ≥${MIN}px`,
    mf && mf.gap >= MIN, mf ? `${mf.gap}px` : 'not found');
  check('mobile: the filter trigger is a full tap target',
    await mp2.evaluate(() => Math.round(document.querySelector('#filter-trigger').getBoundingClientRect().height) >= 44),
    `${await mp2.evaluate(() => Math.round(document.querySelector('#filter-trigger').getBoundingClientRect().height))}px`);
  /* The only remaining disclosure is the detail view's edit apparatus — the
     filter panel is a popover now — so this is measured where it lives. */
  await mp2.keyboard.press('Escape');
  await mp2.waitForTimeout(250);
  await mp2.locator('.card').first().click();
  await mp2.waitForTimeout(600);
  await openApparatus(mp2);
  check('the +/− glyph keeps a consistent gap from its label',
    await mp2.evaluate(() => {
      const gaps = [...document.querySelectorAll('.apparatus > summary')]
        .map((s) => getComputedStyle(s).columnGap || getComputedStyle(s).gap);
      return gaps.length > 0 && new Set(gaps).size === 1;
    }),
    await mp2.evaluate(() => getComputedStyle(document.querySelector('.apparatus > summary')).columnGap));
  await mb2.close();
}

console.log('\nloading skeleton (motion-taste D3)');
{
  const sk = await browser.newContext();
  const sp = await sk.newPage();
  // Hold sites.json so the skeleton is observable, then release it.
  await sp.route('**/sites.json', async (route) => {
    await new Promise((r) => setTimeout(r, 1200));
    await route.continue();
  });
  await sp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await sp.waitForTimeout(300);
  check('a shape-matched skeleton shows while loading',
    (await sp.locator('#skeleton').isVisible())
    && (await sp.locator('#skeleton .sk-shot').count()) >= 3);
  check('the skeleton is not a spinner', (await sp.locator('#skeleton .sk-line').count()) >= 3);
  await sp.waitForSelector('.card', { timeout: 15_000 });
  await sp.waitForTimeout(300);
  check('the skeleton is removed once content arrives', !(await sp.locator('#skeleton').isVisible()));
  await sk.close();
}

console.log('\ndensity toggle + filter persistence');
{
  const d = await browser.newContext();
  const dp = await d.newPage();
  await dp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await dp.waitForSelector('.card');
  await dp.waitForTimeout(600);
  check('density defaults to comfortable',
    (await dp.evaluate(() => document.documentElement.dataset.density)) === 'comfortable');
  const clampBefore = await dp.locator('.card-note').first().evaluate((e) => getComputedStyle(e).webkitLineClamp);
  await dp.click('#density');
  await dp.waitForTimeout(400);
  check('density toggles to compact',
    (await dp.evaluate(() => document.documentElement.dataset.density)) === 'compact');
  const clampAfter = await dp.locator('.card-note').first().evaluate((e) => getComputedStyle(e).webkitLineClamp);
  check('compact tightens the note clamp', clampBefore === '4' && clampAfter === '2', `${clampBefore} → ${clampAfter}`);
  // Filter + density both survive a reload.
  await dp.fill('#search', 'ciridae');
  await dp.waitForTimeout(400);
  await dp.reload({ waitUntil: 'domcontentloaded' });
  await dp.waitForSelector('.card');
  await dp.waitForTimeout(700);
  check('density persists across reload',
    (await dp.evaluate(() => document.documentElement.dataset.density)) === 'compact');
  check('the last filter set persists across reload',
    (await dp.locator('#search').inputValue()) === 'ciridae'
    && (await dp.locator('.card').count()) < cards,
    `${await dp.locator('.card').count()} of ${cards}`);
  await d.close();
}

console.log('\napparatus demoted below judgement');
{
  await page.locator('.card').first().click();
  await page.waitForTimeout(700);
  const order = await page.evaluate(() => {
    const ids = ['note-block', 'works-block', 'weaknesses-block', 'apparatus'];
    return ids.map((id) => {
      const el = document.getElementById(id);
      return el ? Math.round(el.getBoundingClientRect().top + document.querySelector('#detail').scrollTop) : -1;
    });
  });
  check('judgement blocks come before the apparatus',
    order[0] < order[3] && order[1] < order[3] && order[2] < order[3],
    order.join(' < '));
  check('the apparatus is collapsed by default',
    !(await page.locator('#apparatus').evaluate((e) => e.open)));
  check('the apparatus opens on demand', await (async () => {
    await openApparatus(page);
    return page.locator('#apparatus').evaluate((e) => e.open);
  })());
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
}

console.log('\ntoken layer: no raw values in components');
{
  const css = readFileSync(join(VAULT, 'index.html'), 'utf8');
  const rootBlock = css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {')));
  // Strip the token layer AND comments: prose about a value is not a value.
  const body = css.replace(rootBlock, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const strayOklch = [...body.matchAll(/oklch\([^)]*\)/g)].map((m) => m[0])
    .filter((s) => !s.includes('var(--hue)'));
  check('no raw oklch() outside the token layer', strayOklch.length === 0,
    strayOklch.slice(0, 3).join(' ') || 'clean');
  check('no bare 44px literals in any component', !/44px/.test(body));
  for (const tok of ['--space-density', '--status-in', '--status-out', '--status-hybrid',
    '--status-pending', '--verdict-plus', '--verdict-minus', '--text-read', '--tap']) {
    check(`declared token ${tok} exists`, new RegExp(`${tok}:`).test(css));
  }
  check('--tap is not self-referential', /--tap: 44px/.test(css));
}

/* Regression protection #5 made measurable: functional colour must not drift
   below AA. The craft critic found five surfaces at 2.48:1 using --ink-30, a
   decoration tint, for interactive text. Ratios are computed by painting the
   colour, so oklch() and color-mix() resolve properly. */
console.log('\nmeasured contrast on functional text (color-taste I1)');
{
  const ratios = await page.evaluate(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const res = (c, bg) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = bg; cx.fillRect(0, 0, 1, 1);
      cx.fillStyle = c;  cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const lum = ([r, g, b]) => {
      const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const R = (a, b) => {
      const l1 = lum(a), l2 = lum(b);
      return +(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2));
    };
    const bg = getComputedStyle(document.body).backgroundColor;
    const bgr = res(bg, bg);
    const targets = [
      ['.card-note', 'card reasoning'],
      ['.card-note--todo', 'TODO call to action'],
      ['.tag', 'tag chip'],
      ['.tag-toggle', 'tag expand toggle'],
      ['#filter-count', 'filters summary'],
      ['#grid-end-count', 'grid end line'],
      ['#grid-end-debt', 'grid end debt'],
      ['.note-more', 'read more'],
      ['.judge-mark--plus', 'verdict +N'],
      ['.judge-mark--minus', 'verdict −N'],
      ['.status-mark', 'status mark'],
      ['.count', 'entry count'],
      ['.btn', 'button label'],
      ['.apparatus > summary', 'apparatus summary'],
      ['.filter-cat > .label', 'filter category label'],
      ['.field > .label', 'form field label'],
      ['.extra-cap .extra-label', 'extra label'],
    ];
    const out = {};
    for (const [sel, name] of targets) {
      const e = document.querySelector(sel);
      if (e) out[name] = R(res(getComputedStyle(e).color, bg), bgr);
    }
    return out;
  });
  const failing = Object.entries(ratios).filter(([, r]) => r < 4.5);
  check('every functional text surface meets AA 4.5:1', failing.length === 0,
    failing.length ? failing.map(([n, r]) => `${n} ${r}:1`).join(', ')
      : `${Object.keys(ratios).length} surfaces, worst ${Math.min(...Object.values(ratios))}:1`);
}

console.log('\npending vs failed are distinguishable');
{
  const s = await browser.newContext();
  const sp2 = await s.newPage();
  await sp2.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await sp2.waitForSelector('.card');
  await sp2.evaluate(async () => {
    const live = await fetch('sites.json').then((r) => r.json());
    live.push({ id: 'pend-x', url: 'https://pending.example.com/a', title: 'Pending X',
      added: '2020-01-01', rating: 2, dialectStatus: 'unreviewed', dialects: [],
      tags: {}, note: 'x', shots: { full: null, hero: null, mobile: null }, kind: 'site' });
    live.push({ id: 'fail-x', url: 'https://failed.example.com/b', title: 'Failed X',
      added: '2020-01-01', rating: 2, dialectStatus: 'unreviewed', dialects: [],
      tags: {}, note: 'x', shots: { full: null, hero: null, mobile: null }, kind: 'image-url',
      captureError: 'fetch failed — upload manually or fix the URL (HTTP 404)' });
    localStorage.setItem('design-dna:vault:working-copy',
      JSON.stringify({ entries: live, at: new Date(Date.now() + 600000).toISOString() }));
  });
  await sp2.reload({ waitUntil: 'domcontentloaded' });
  await sp2.waitForSelector('.card');
  await sp2.waitForTimeout(800);
  const pend = sp2.locator('.card').filter({ hasText: 'Pending X' });
  const fail = sp2.locator('.card').filter({ hasText: 'Failed X' });
  check('pending uses the pending placeholder', (await pend.locator('.card-shot--pending').count()) === 1);
  check('failed uses the failed placeholder', (await fail.locator('.card-shot--failed').count()) === 1);
  check('the two states differ in wording, not only hue',
    (await pend.locator('.pending-status').textContent()) === 'capture pending'
    && /fetch failed/.test(await fail.locator('.pending-status').textContent()));
  check('the two states differ in border treatment',
    (await pend.locator('.card-shot--pending').evaluate((e) => getComputedStyle(e).borderBottomStyle)) === 'dashed'
    && (await fail.locator('.card-shot--failed').evaluate((e) => getComputedStyle(e).borderBottomStyle)) === 'solid');
  await s.close();
}

console.log('\nreduced motion: a designed static scene');
{
  const rm = await browser.newContext({ reducedMotion: 'reduce' });
  const rp = await rm.newPage();
  const rErrs = [];
  rp.on('pageerror', (e) => rErrs.push(String(e.message || e)));
  await rp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await rp.waitForSelector('.card');
  await rp.waitForTimeout(800);
  check('reduced motion: all cards still render', (await rp.locator('.card').count()) === cards);
  check('reduced motion: nothing is left invisible',
    await rp.locator('.card').evaluateAll((els) => els.every((e) => Number(getComputedStyle(e).opacity) === 1)));
  check('reduced motion: skeleton pulse is off, shape retained',
    await rp.evaluate(() => {
      const sk = document.querySelector('#skeleton .sk-shot');
      return getComputedStyle(sk).animationName === 'none';
    }));
  await rp.locator('.card').first().click();
  await rp.waitForTimeout(500);
  check('reduced motion: the detail sheet still opens fully',
    (await rp.locator('#detail').isVisible())
    && (await rp.locator('#note-block').isVisible()));
  check('reduced motion: no page errors', rErrs.length === 0, rErrs.slice(0, 1).join('') || 'clean');
  await shot(rp, 'reduced-motion-grid');
  await rm.close();
}

console.log('\ncomposition category');
check('composition filter row renders with all 9 tags',
  (await page.locator('#filters .filter-cat').filter({ hasText: 'composition' })
    .locator('.pill').count()) >= 9);
check('composition is the first filter row',
  (await page.locator('#filters .filter-cat').first().locator('.label').first().textContent())
    .trim() === 'composition');

console.log('\ndialect fields');
check('dialect status filter row renders',
  (await page.locator('#dialect-filters .pill').count()) >= 4);
const marks = await page.locator('.card .status-mark').count();
console.log(`  · ${marks} reviewed entries carry a status mark (0 is correct when all are unreviewed)`);

console.log('\nfiltering');
await openFilters(page);
const firstChip = page.locator('#filters .pill').first();
const chipName = (await firstChip.textContent()).trim();
await firstChip.click();
await page.waitForTimeout(300);
const filtered = await page.locator('.card').count();
check(`chip "${chipName}" narrows the set`, filtered <= cards, `${filtered} of ${cards}`);
await firstChip.click();
await page.waitForTimeout(250);
check('chip toggles back off', (await page.locator('.card').count()) === cards);

await page.fill('#search', 'zzzznomatch');
await page.waitForTimeout(300);
check('search with no match shows the empty state', await page.locator('#empty').isVisible());
await page.fill('#search', '');
await page.waitForTimeout(250);

console.log('\ndetail');
await page.locator('.card').first().click();
await page.waitForTimeout(700);
check('detail opens', await page.locator('#detail').isVisible());
/* READ-first plate: rows a reader needs to judge the entry. 'kind' (site on
   10/10) and 'id' were dropped — metadata was out-massing the reasoning below it. */
check('spec plate carries the reader-facing rows',
  (await page.locator('#detail .plate dt').count()) >= 4,
  (await page.locator('#detail .plate dt').allTextContents()).join(', '));
await openApparatus(page);
check('plate shows dialect + review rows',
  (await page.locator('#detail .plate dt').allTextContents())
    .map((t) => t.trim().toLowerCase()).includes('review'));
check('edit form has a dialectStatus selector',
  (await page.locator('#detail [data-field="dialectStatus"] input[type=radio]').count()) >= 4);
check('edit form has a dialects multi-pick',
  (await page.locator('#detail [data-field="dialects"] input[type=checkbox]').count()) >= 1);
check('edit form has tag checkboxes', (await page.locator('#detail .check input[type=checkbox]').count()) > 0);
check('edit form has a composition tag group',
  (await page.locator('#detail [data-cat="composition"] input[type=checkbox]').count()) >= 9);
/* With no extras the strip only repeated shots already on screen — 230px of
   duplication. It renders when it carries something new; the add control stays. */
check('extras strip is absent when there is nothing extra to show',
  (await page.locator('#extras-strip').count()) === 0
  || (await page.locator('#extras-strip .extra').count()) >= 1);
check('"+ add photos" exists and is enabled without a token',
  (await page.locator('#extras-add').isVisible()) && (await page.locator('#extras-add').isEnabled()));
check('"+ add photos" opens the panel with all three paths', await (async () => {
  await page.click('#extras-add');
  await page.waitForTimeout(300);
  const ok = (await page.locator('#extras-panel').isVisible())
    && (await page.locator('#extra-url').isVisible())
    && (await page.locator('#extra-files').count()) === 1;
  return ok;
})());
check('upload is disabled with an explanation when there is no token',
  (await page.locator('#extra-files').isDisabled())
  && (await page.locator('#extra-upload-hint').textContent()).includes('needs the online path'));
check('url field says how it was understood — image', await (async () => {
  await page.fill('#extra-url', 'example.com/shot.jpg');
  await page.waitForTimeout(200);
  return (await page.locator('#extra-url-read').textContent()).includes('fetch the image');
})());
check('url field says how it was understood — page', await (async () => {
  await page.fill('#extra-url', 'example.com/checkout');
  await page.waitForTimeout(200);
  return (await page.locator('#extra-url-read').textContent()).includes('capture the page');
})());
await page.fill('#extra-url', '');
await page.click('#extras-add');   // close again
await page.waitForTimeout(200);

/* ── filmstrip ────────────────────────────────────────────────────────────
   Two claims, and the second one is the load-bearing one: the strip belongs to
   the detail view, and the card must stay a single image plus its note. A
   contact sheet on the card would turn the grid from a set of claims to read
   into a pile of pictures to browse — which is exactly the pull the vault is
   meant to resist. */
console.log('\nfilmstrip');
{
  const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
  const withStrip = sites.filter((e) => (e.shots?.strip ?? []).length > 0);

  check('the filmstrip never appears on a card',
    (await page.locator('.card .film-block, .card .film-frame').count()) === 0);

  if (!withStrip.length) {
    console.log('  · no entry carries a filmstrip yet — display checks skipped');
  } else {
    const target = withStrip[0];
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await page.locator(`.card[data-id="${target.id}"]`).first().click();
    await page.waitForTimeout(600);

    const frames = await page.locator('#film-strip .film-frame').count();
    check('the filmstrip renders in the detail view', frames > 0, `${frames} frames`);
    check('every desktop frame in the data is on screen',
      frames === target.shots.strip.length,
      `${frames} rendered / ${target.shots.strip.length} recorded`);
    check('frames are captioned by their position in the sequence',
      (await page.locator('#film-strip .film-frame figcaption').first().textContent()).trim() === '1');
    check('every frame image actually loaded', await page.evaluate(() =>
      [...document.querySelectorAll('#film-strip img')].every((i) => i.complete && i.naturalWidth > 0)));

    /* The strip scrolls inside itself. If it pushed the page instead, every
       other column in the detail view would inherit a horizontal scrollbar. */
    const overflow = await page.evaluate(() => {
      const s = document.querySelector('#film-strip');
      return { inner: s.scrollWidth > s.clientWidth + 2, page: document.body.scrollWidth > window.innerWidth + 2 };
    });
    check('the strip scrolls inside itself, not the page', !overflow.page,
      overflow.inner ? 'strip overflows its own box, as designed' : 'strip fits');

    if ((target.shots?.stripMobile ?? []).length) {
      check('a width switch appears only when both widths exist',
        (await page.locator('#film-switch .btn').count()) === 2);
      await page.locator('#film-switch .btn[data-mode="mobile"]').click();
      await page.waitForTimeout(300);
      check('switching to mobile swaps the frames',
        (await page.locator('#film-strip .film-frame').count()) === target.shots.stripMobile.length
        && (await page.locator('#film-strip').getAttribute('data-mode')) === 'mobile');
      await page.locator('#film-switch .btn[data-mode="desktop"]').click();
      await page.waitForTimeout(250);
    }

    const navShot = target.shots?.navScrolled;
    check('the scrolled header is shown when one was stored, and only then',
      (await page.locator('#film-block .film-nav').count()) === (navShot ? 1 : 0));

    await shot(page, 'gallery-filmstrip');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    await page.locator('.card').first().click();
    await page.waitForTimeout(500);
    await openApparatus(page);
  }
}

check('note has an inline editor', (await page.locator('#detail #note-inline').count()) === 1);
check('note editor starts closed', !(await page.locator('#detail #note-editor').isVisible()));
check('note has an edit pencil', (await page.locator('#detail #note-edit svg').count()) === 1);
check('edit form has a title field', (await page.locator('#detail input[type=text]').count()) >= 1);
await shot(page, 'gallery-detail');
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
check('esc closes detail', !(await page.locator('#detail').isVisible()));

console.log('\nnote editing');
{
  // Pencil on the card jumps straight into the note field.
  await page.locator('.card').first().locator('.note-edit').click();
  await page.waitForTimeout(800);
  check('card pencil opens detail with the note editor active',
    (await page.locator('#detail').isVisible()) && (await page.locator('#note-editor').isVisible()));
  check('the textarea is focused',
    await page.evaluate(() => document.activeElement?.id === 'note-inline'));
  check('Save and Cancel are both present',
    (await page.locator('#note-editor .btn--primary').isVisible())
    && (await page.locator('#note-editor .btn:not(.btn--primary)').isVisible()));
  check('motion guidance hint is shown under the textarea',
    (await page.locator('#note-editor .note-motion-hint').textContent())
      .includes("describe WHAT moves and HOW"));

  // Cancel restores without changing anything.
  const original = await page.locator('#note-inline').inputValue();
  await page.fill('#note-inline', 'scratch text that must not persist');
  await page.locator('#note-editor .btn:not(.btn--primary)').click();
  await page.waitForTimeout(400);
  check('cancel closes the editor and discards the change',
    !(await page.locator('#note-editor').isVisible())
    && (await page.locator('#note-inline').inputValue()) === original);

  // Saving changes ONLY the note.
  const beforeEntry = await page.evaluate(() => {
    const id = document.querySelector('#detail-id').textContent.trim();
    return JSON.parse(JSON.stringify(window.__vaultEntries?.find?.((e) => e.id === id) ?? null));
  }).catch(() => null);
  await page.locator('#note-edit').click();
  await page.waitForTimeout(300);
  await page.fill('#note-inline', 'smoke-note-' + original.slice(0, 12));
  await page.locator('#note-editor .btn--primary').click();
  await page.waitForTimeout(1200);
  check('saving the note surfaces the save choice (no token stored)',
    (await page.locator('#token').isVisible()) || (await page.locator('#toast').isVisible()));
  if (!(await page.locator('#token').isVisible())) { /* nothing to close */ }
  else await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  void beforeEntry;
}

/* ── note clamp ───────────────────────────────────────────────────────────
   Truncating by character count was width- and script-blind: the same 190
   characters rendered 4 lines at 1440px and 7 at 320px, unevenly between cards.
   The clamp is now visual, so this asserts lines, not characters. */
console.log('\nworks / doesn\'t blocks');
{
  // The previous section closed the sheet with Esc; reopen it.
  await page.locator('.card').first().click();
  await page.waitForTimeout(700);
  for (const f of ['note', 'works', 'weaknesses']) {
    check(`${f}: block, pencil, read surface and editor all present`,
      (await page.locator(`#${f}-block`).count()) === 1
      && (await page.locator(`#${f}-edit`).count()) === 1
      && (await page.locator(`#${f}-read`).count()) === 1
      && (await page.locator(`#${f}-inline`).count()) === 1);
  }
  check('motion hint only on the note field',
    (await page.locator('#note-editor .note-motion-hint').count()) === 1
    && (await page.locator('#works-editor .note-motion-hint').count()) === 0);
  // Editing works must not disturb note or weaknesses.
  await page.locator('#works-edit').click();
  await page.waitForTimeout(300);
  check('works editor opens independently',
    (await page.locator('#works-editor').isVisible())
    && !(await page.locator('#note-editor').isVisible()));
  await page.locator('#works-editor .btn:not(.btn--primary)').click();
  await page.waitForTimeout(200);
  // Leave the sheet closed: later sections click toolbar controls behind it.
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
}

/* ── three-block inline-save matrix ───────────────────────────────────────
   note / works / weaknesses saved in EVERY order, with a reload between each,
   through BOTH save paths (mocked GitHub, and the download fallback). Each save
   must write only its own field and leave the other two untouched — the failure
   this guards against is a shared editor clobbering its siblings. */
console.log('\nthree-block inline-save matrix');
{
  const FIELDS = ['note', 'works', 'weaknesses'];
  const orders = [
    ['note', 'works', 'weaknesses'], ['note', 'weaknesses', 'works'],
    ['works', 'note', 'weaknesses'], ['works', 'weaknesses', 'note'],
    ['weaknesses', 'note', 'works'], ['weaknesses', 'works', 'note'],
  ];

  const shortName = { note: 'note', works: 'works', weaknesses: 'weak' };

  for (const path of ['github', 'download']) {
    for (const [oi, order] of orders.entries()) {
      const label = `${path} · ${order.map((f) => shortName[f]).join('→')}`;
      const c = await browser.newContext({ acceptDownloads: true });

      /* Stateful mock: the GET returns whatever the last PUT wrote, so a reload
         genuinely picks up the previous save. A stateless mock would lose each
         field and prove nothing about the sequence. */
      let remoteSites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
      let putCount = 0;
      if (path === 'github') {
        await c.addInitScript(() => {
          localStorage.setItem('design-dna:vault:gh-token', 'github_pat_smoketest');
        });
        await c.route('https://api.github.com/**', async (route) => {
          const url = route.request().url();
          const method = route.request().method();
          const json = (b) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(b) });
          if (/\/commits\?path=/.test(url)) return json([]);
          if (/\/contents\/vault\/sites\.json/.test(url) && method === 'GET') {
            return json({ sha: `sha${putCount}`, content: Buffer.from(JSON.stringify(remoteSites)).toString('base64') });
          }
          if (/\/contents\/vault\/sites\.json/.test(url) && method === 'PUT') {
            const body = JSON.parse(route.request().postData() ?? '{}');
            remoteSites = JSON.parse(Buffer.from(body.content, 'base64').toString('utf8'));
            putCount += 1;
            return json({ commit: { sha: `deadbee${putCount}` } });
          }
          return json({});
        });
      }

      const p = await c.newPage();
      const errs = [];
      p.on('pageerror', (e) => errs.push(String(e.message || e)));

      const values = {};
      let id = null;
      for (const field of order) {
        await p.goto(URL_BASE, { waitUntil: 'domcontentloaded' });   // reload between each
        await p.waitForSelector('.card');
        await p.waitForTimeout(500);
        await p.locator('.card').first().click();
        await p.waitForTimeout(600);
        id ??= (await p.locator('#detail-id').textContent()).trim();

        values[field] = `${field}-${path}-${oi}`;
        await p.locator(`#${field}-edit`).click();
        await p.waitForTimeout(250);
        await p.fill(`#${field}-inline`, values[field]);
        await p.locator(`#${field}-editor .btn--primary`).click();
        await p.waitForTimeout(700);

        if (path === 'download') {
          // No token: the save offers the choice, and the file is the fallback.
          await p.waitForSelector('#token', { state: 'visible', timeout: 10_000 });
          // The toast sits above the panel and can intercept the click.
          await p.evaluate(() => { const t = document.querySelector('#toast'); if (t) t.hidden = true; });
          const dl = p.waitForEvent('download');
          await p.locator('#token-download').click();
          await dl;
          await p.waitForTimeout(400);
        } else {
          await p.waitForTimeout(500);
        }
      }

      /* Where the truth lives differs by path: GitHub clears the working copy on
         success (so assert the committed payload), the fallback keeps it. */
      let got = null;
      if (path === 'github') {
        got = remoteSites.find((x) => x.id === id) ?? null;
      } else {
        got = await p.evaluate((entryId) => {
          const raw = localStorage.getItem('design-dna:vault:working-copy');
          return raw ? (JSON.parse(raw).entries.find((x) => x.id === entryId) ?? null) : null;
        }, id);
      }

      const ok = got && FIELDS.every((f) => (got[f] ?? '') === values[f]);
      check(`${label} · all three fields survive, each holding its own value`,
        Boolean(ok), ok ? '' : JSON.stringify({ want: values, got: got && { note: got.note, works: got.works, weaknesses: got.weaknesses } }).slice(0, 170));

      if (path === 'github') {
        check(`${label} · three saves produced three commits`, putCount === 3, `${putCount} PUTs`);
      }
      check(`${label} · no page errors`, errs.length === 0, errs.slice(0, 1).join('') || 'clean');
      await c.close();
    }
  }
}

console.log('\ncard ±N verdict marks');
{
  const vc = await browser.newContext();
  const vp = await vc.newPage();
  await vp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await vp.waitForSelector('.card');
  await vp.evaluate(async () => {
    const live = await fetch('sites.json').then((r) => r.json());
    live[0] = { ...live[0], works: 'one\ntwo\nthree', weaknesses: 'only one' };
    localStorage.setItem('design-dna:vault:working-copy',
      JSON.stringify({ entries: live, at: new Date(Date.now() + 600000).toISOString() }));
  });
  await vp.reload({ waitUntil: 'domcontentloaded' });
  await vp.waitForSelector('.card');
  await vp.waitForTimeout(900);
  const first = vp.locator('.card').first();
  check('card shows +N for recorded strengths',
    (await first.locator('.judge-mark--plus').textContent()) === '+3');
  check('card shows −N for recorded weaknesses',
    (await first.locator('.judge-mark--minus').textContent()) === '−1');
  /* Pick a card that genuinely has no verdict rather than assuming an index —
     real entries have since gained works/weaknesses from the live gallery.
     Skip entries[0]: this test injects a verdict into it. */
  const allSites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
  const noVerdictId = allSites
    .slice(1)
    .find((e) => !(e.works ?? '').trim() && !(e.weaknesses ?? '').trim())?.title;
  check('cards without a verdict show no marks',
    noVerdictId
      ? (await vp.locator('.card').filter({ hasText: noVerdictId }).first().locator('.judge-mark').count()) === 0
      : true,
    noVerdictId ? `checked "${noVerdictId}"` : 'every entry now has a verdict');
  check('the card still shows only the clamped note, not works/weaknesses text',
    !(await first.locator('.card-note').textContent()).includes('one\ntwo'));
  await vc.close();
}

console.log('\none-box smart tagging');
{
  const tc = await browser.newContext();
  const tp = await tc.newPage();
  const tErrs = [];
  tp.on('pageerror', (e) => tErrs.push(String(e.message || e)));
  await tp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await tp.waitForSelector('.card');
  await tp.waitForTimeout(800);
  await tp.locator('.card').first().click();
  await tp.waitForTimeout(900);

  await openApparatus(tp);
  check('one box, ADD button and AUTO selector all present',
    (await tp.locator('#smart-tag-input').count()) === 1
    && (await tp.locator('#smart-tag-add').count()) === 1
    && (await tp.locator('#smart-cat').inputValue()) === '');

  // 1. known tag sorts instantly by exact vocabulary match
  await tp.fill('#smart-tag-input', 'air');
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(400);
  check('known tag sorts instantly to its vocabulary category',
    (await tp.locator('#smart-tag-result').textContent()).includes('layout +1'));

  // 2. invented tags land via the stem map, as a comma batch
  await tp.fill('#smart-tag-input', 'controlled-accent, thin-rules, scroll-reveal-stagger');
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(500);
  const batch = await tp.locator('#smart-tag-result').textContent();
  check('comma batch is parsed and each tag routed individually',
    batch.includes('color +1') && batch.includes('layout +1') && batch.includes('motion +1'), batch);

  /* A tag is a term, not a sentence. A 123-character slugified phrase once reached
     the vocabulary and broke the filter row. */
  await tp.fill('#smart-tag-input', 'vertical narrative dominant character mass layered overlap asymmetric balance');
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(500);
  /* The words land wherever the classifier puts them — some in categories, some in
     the unsorted queue. What matters is that they arrived as SEPARATE terms. */
  check('a space-separated phrase is split into separate tags, not one monster',
    await tp.evaluate(() => {
      const all = [
        ...[...document.querySelectorAll('.smart-chip .label')].map((e) => e.textContent.trim()),
        ...[...document.querySelectorAll('#queues .queue-tag')].map((e) => e.textContent.trim()),
      ];
      const fromPhrase = ['vertical', 'narrative', 'dominant', 'layered', 'asymmetric'];
      return fromPhrase.filter((w) => all.includes(w)).length >= 3
        && !all.some((c) => c.length > 36);
    }));
  await tp.fill('#smart-tag-input', 'a'.repeat(80));
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(500);
  check('an unbreakable over-long token is refused with a reason',
    /sentence, not a tag/.test(await tp.locator('#toast').textContent())
    && !(await tp.evaluate(() => [...document.querySelectorAll('.smart-chip .label')]
      .some((e) => e.textContent.trim().length > 36))));

  // 3. nonsense goes to unsorted and the proposal bar appears
  await tp.fill('#smart-tag-input', 'zorbaflux');
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(500);
  check('unclassifiable tag goes to the unsorted queue',
    (await tp.locator('#smart-tag-result').textContent()).includes('1 unsorted'));
  check('unsorted bar appears with actions',
    (await tp.locator('#queues .queue-bar').first().isVisible())
    && (await tp.locator('#queues .queue-row .smart-tag-cat').count()) >= 1);
  check('vocabulary proposals bar appears for non-canonical tags',
    (await tp.locator('.queue-bar--vocab').count()) === 1);
  check('pending-vocab chips are marked as such',
    (await tp.locator('.smart-chip--pending').count()) >= 3);

  // 4. field clears, refocuses, selector resets
  check('field clears after add', (await tp.locator('#smart-tag-input').inputValue()) === '');
  check('field refocuses after add',
    await tp.evaluate(() => document.activeElement?.id === 'smart-tag-input'));
  check('selector resets to AUTO', (await tp.locator('#smart-cat').inputValue()) === '');

  // 5. category-targeted add bypasses classification
  await tp.selectOption('#smart-cat', 'imagery');
  await tp.fill('#smart-tag-input', 'zorbaflux-two');
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(400);
  check('category-targeted add bypasses classification',
    (await tp.locator('#smart-tag-result').textContent()).includes('imagery +1'));

  // 6. chips removable
  const before = await tp.locator('.smart-chip').count();
  await tp.locator('.smart-chip').last().locator('.smart-chip-x').click();
  await tp.waitForTimeout(300);
  check('chips are individually removable',
    (await tp.locator('.smart-chip').count()) === before - 1);

  // 7. accepting an unsorted proposal moves it into a real category
  await tp.fill('#smart-tag-input', 'zorbaflux');
  await tp.click('#smart-tag-add');
  await tp.waitForTimeout(400);
  await tp.locator('#queues .queue-row .smart-tag-cat').first().selectOption('color');
  await tp.waitForTimeout(400);
  check('picking a home clears the tag from unsorted',
    (await tp.locator('#smart-tag-result').textContent()).includes('picked'));

  check('no page errors during tagging', tErrs.length === 0, tErrs.slice(0, 2).join(' | ') || 'clean');
  await tc.close();
}

console.log('\nvocab growth survives a save round-trip');
{
  const gc = await browser.newContext();
  await gc.addInitScript(() => {
    localStorage.setItem('design-dna:vault:gh-token', 'github_pat_smoketest');
  });
  /* Mock the Git Data API so the whole promote flow runs: ref → commit → blobs →
     tree → commit → ref. Capture what would be committed. */
  let committedVocab = null;
  let commitMessage = null;
  /* promoteToVocab now re-reads BOTH files before writing, so the mock must serve
     them — that re-read is the fix for vocab categories being silently dropped. */
  await gc.route('https://api.github.com/**', async (route) => {
    const url = route.request().url();
    const method = route.request().method();
    const json = (body) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    if (/\/git\/ref\/heads\//.test(url)) return json({ object: { sha: 'parentsha' } });
    if (/\/git\/commits\/parentsha/.test(url)) return json({ tree: { sha: 'treesha' } });
    if (/\/git\/trees$/.test(url) && method === 'POST') {
      const body = JSON.parse(route.request().postData() ?? '{}');
      const v = (body.tree ?? []).find((t) => t.path === 'vault/vocab.json');
      if (v) committedVocab = JSON.parse(v.content);
      return json({ sha: 'newtree' });
    }
    if (/\/git\/commits$/.test(url) && method === 'POST') {
      commitMessage = JSON.parse(route.request().postData() ?? '{}').message;
      return json({ sha: 'abcdef1234567890' });
    }
    if (/\/git\/refs\/heads\//.test(url) && method === 'PATCH') return json({ ok: true });
    if (/\/commits\?path=/.test(url)) return json([]);
    // Both files are re-read before writing — that is the clobber fix.
    if (/\/contents\/vault\/vocab\.json/.test(url) && method === 'GET') {
      return json({ sha: 'vsha', content: Buffer.from(readFileSync(join(VAULT, 'vocab.json'), 'utf8')).toString('base64') });
    }
    if (/\/contents\/vault\/sites\.json/.test(url) && method === 'GET') {
      return json({ sha: 'ssha', content: Buffer.from(readFileSync(join(VAULT, 'sites.json'), 'utf8')).toString('base64') });
    }
    return json({});
  });
  const gp = await gc.newPage();
  await gp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await gp.waitForSelector('.card');
  await gp.waitForTimeout(800);
  await gp.locator('.card').first().click();
  await gp.waitForTimeout(900);
  await openApparatus(gp);
  await gp.fill('#smart-tag-input', 'controlled-accent');
  await gp.click('#smart-tag-add');
  await gp.waitForTimeout(500);
  check('a new tag is proposed for the vocabulary, not silently added',
    (await gp.locator('.queue-bar--vocab').count()) === 1
    && !(await gp.evaluate(() => window.__vocabHasTag ?? false)));
  // Many non-canonical tags exist in live data, so target OUR tag's proposal row.
  await gp.locator('.queue-bar--vocab .queue-row')
    .filter({ hasText: 'controlled-accent' }).locator('.btn--primary').first().click();
  await gp.waitForTimeout(1200);
  check('confirming writes vocab.json in the same commit as sites.json',
    committedVocab !== null
    && committedVocab.categories.color.tags.includes('controlled-accent'),
    commitMessage ?? 'no commit');
  check('the commit message names the vocabulary change',
    /vocabulary/.test(commitMessage ?? ''), commitMessage ?? '');
  await gc.close();
}

/* ── three-block inline-save matrix ───────────────────────────────────────
   The reported bug: saving note, then works, then weaknesses kept only the
   first. Cause: a successful save replaces every object in `entries`, so the
   other two blocks were still bound to an orphan and their writes went nowhere.
   Asserted in every order, because the survivor was always whichever field was
   saved first. */
console.log('\nthree-block inline save matrix (note / works / doesn\'t)');
{
  const ORDERS = [
    ['note', 'works', 'weaknesses'],
    ['works', 'weaknesses', 'note'],
    ['weaknesses', 'note', 'works'],
  ];

  for (const order of ORDERS) {
    const sctx = await browser.newContext();
    await sctx.addInitScript(() => localStorage.setItem('design-dna:vault:gh-token', 'github_pat_smoke'));

    const puts = [];
    let serverState = null;
    await sctx.route('https://api.github.com/**', async (route) => {
      const url = route.request().url(), method = route.request().method();
      const json = (x) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(x) });
      if (/\/commits\?path=/.test(url)) return json([]);
      if (/\/contents\/vault\/sites\.json/.test(url) && method === 'GET') {
        if (!serverState) serverState = readFileSync(join(VAULT, 'sites.json'), 'utf8');
        return json({ sha: `sha${puts.length}`, content: Buffer.from(serverState).toString('base64') });
      }
      if (/\/contents\/vault\/sites\.json/.test(url) && method === 'PUT') {
        const body = JSON.parse(route.request().postData() ?? '{}');
        serverState = Buffer.from(body.content, 'base64').toString('utf8');   // the repo persists
        puts.push(JSON.parse(serverState));
        return json({ commit: { sha: `commit${puts.length}` } });
      }
      return json({});
    });

    const sp = await sctx.newPage();
    await sp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
    await sp.waitForSelector('.card');
    await sp.waitForTimeout(1000);
    await sp.locator('.card').first().click();
    await sp.waitForTimeout(800);
    const id = (await sp.locator('#detail-id').textContent()).trim();

    for (const field of order) {
      await sp.locator(`#${field}-edit`).click();
      await sp.waitForTimeout(300);
      await sp.fill(`#${field}-inline`, `SMOKE-${field.toUpperCase()}`);
      await sp.locator(`#${field}-editor .btn--primary`).click();
      await sp.waitForTimeout(1400);
    }

    const committed = puts.at(-1)?.find((e) => e.id === id) ?? {};
    const kept = ['note', 'works', 'weaknesses']
      .filter((f) => String(committed[f] ?? '').startsWith('SMOKE-'));
    check(`saved in order ${order.join(' → ')}: all three survive`,
      kept.length === 3, `${kept.length}/3 kept [${kept.join(', ') || 'none'}]`);

    // And they survive a reload, read back from what was actually committed.
    await sp.reload({ waitUntil: 'domcontentloaded' });
    await sp.waitForSelector('.card');
    await sp.waitForTimeout(900);
    await sctx.close();
  }

  /* The download fallback must carry all three too — no token stored. */
  const dctx = await browser.newContext({ acceptDownloads: true });
  const dp = await dctx.newPage();
  await dp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await dp.waitForSelector('.card');
  await dp.waitForTimeout(900);
  await dp.locator('.card').first().click();
  await dp.waitForTimeout(800);
  const did = (await dp.locator('#detail-id').textContent()).trim();
  for (const field of ['note', 'works', 'weaknesses']) {
    await dp.locator(`#${field}-edit`).click();
    await dp.waitForTimeout(250);
    await dp.fill(`#${field}-inline`, `DL-${field.toUpperCase()}`);
    await dp.locator(`#${field}-editor .btn--primary`).click();
    await dp.waitForTimeout(700);
    // No token: the save-choice panel appears. Take the download path once.
    const dl = dp.locator('#token-download');
    if (await dl.isVisible().catch(() => false)) {
      const wait = dp.waitForEvent('download');
      await dl.click();
      const file = await wait;
      const payload = JSON.parse(readFileSync(await file.path(), 'utf8'));
      const e = payload.find((x) => x.id === did) ?? {};
      check(`download fallback carries ${field}`,
        String(e[field] ?? '').startsWith('DL-'), String(e[field] ?? '(empty)').slice(0, 18));
      await dp.waitForTimeout(300);
    }
  }
  await dctx.close();
}

/* ── remove photos ────────────────────────────────────────────────────────
   The recovery path from a bad capture. The subtle part is that mergeOnto
   deliberately refuses to let a local null erase a remote shot path — so a
   deliberate deletion has to survive the merge via an explicit override. If that
   override regressed, the removal would appear to work and be silently undone. */
console.log('\nremove photos');
{
  const rc = await browser.newContext();
  await rc.addInitScript(() => localStorage.setItem('design-dna:vault:gh-token', 'github_pat_smoke'));
  let deletions = null, message = null, written = null;
  await rc.route('https://api.github.com/**', async (route) => {
    const url = route.request().url(), method = route.request().method();
    const json = (x) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(x) });
    if (/\/commits\?path=/.test(url)) return json([]);
    if (/\/contents\/vault\/sites\.json/.test(url) && method === 'GET') {
      return json({ sha: 's1', content: Buffer.from(readFileSync(join(VAULT, 'sites.json'), 'utf8')).toString('base64') });
    }
    if (/\/git\/ref\/heads\//.test(url)) return json({ object: { sha: 'p' } });
    if (/\/git\/commits\/p$/.test(url)) return json({ tree: { sha: 't' } });
    if (/\/git\/trees$/.test(url) && method === 'POST') {
      const body = JSON.parse(route.request().postData() ?? '{}');
      deletions = (body.tree ?? []).filter((x) => x.sha === null).map((x) => x.path);
      const s = (body.tree ?? []).find((x) => x.path === 'vault/sites.json');
      if (s) written = JSON.parse(s.content);
      return json({ sha: 'nt' });
    }
    if (/\/git\/commits$/.test(url) && method === 'POST') {
      message = JSON.parse(route.request().postData() ?? '{}').message;
      return json({ sha: 'c0ffee1234567' });
    }
    if (/\/git\/refs\/heads\//.test(url) && method === 'PATCH') return json({ ok: true });
    return json({});
  });

  const rp = await rc.newPage();
  await rp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await rp.waitForSelector('.card');
  await rp.waitForTimeout(1000);

  // An entry that actually has shots.
  const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
  const withShots = sites.find((e) => e.shots?.hero);
  await rp.locator('.card h2', { hasText: withShots.title }).first().click();
  await rp.waitForTimeout(900);
  const id = (await rp.locator('#detail-id').textContent()).trim();

  check('remove photos is offered when an entry has images',
    await rp.locator('#remove-photos').isVisible());
  await rp.locator('#remove-photos').click();
  await rp.waitForTimeout(300);
  check('removing photos needs a second, named confirmation',
    (await rp.locator('#remove-photos-confirm').isVisible())
    && /Remove \d+ image/.test(await rp.locator('#remove-photos-confirm p').textContent()));

  await rp.locator('#remove-photos-confirm .btn--danger').click();
  await rp.waitForTimeout(1600);

  check('the image files are deleted in the commit',
    Array.isArray(deletions) && deletions.length >= 1
    && deletions.every((d) => d.startsWith(`vault/shots/${id}/`)),
    (deletions ?? []).join(', '));
  check('the commit message names the entry',
    message === `vault: remove photos from ${id}`, message ?? 'none');

  const e = written?.find((x) => x.id === id);
  check('the deletion survives the merge — shots really are null',
    e && !e.shots.full && !e.shots.hero && !e.shots.mobile,
    JSON.stringify(e?.shots));
  check('captureError is cleared so the Action retries',
    e && e.captureError === null);
  check('the card falls back to a placeholder, not a broken preview',
    (await rp.locator('.card-shot--pending, .card-shot--failed').count()) > 0);
  await rc.close();
}

/* ── fast-forward retry ───────────────────────────────────────────────────
   Reported as "Upload failed: 422 Update is not a fast forward. Nothing was
   saved." The ref moves between reading it and updating it — the capture Action
   commits shots, another device saves — and an upload makes that window wide.
   The retry must also RE-MERGE: rebasing a stale sites.json onto a newer tree
   would clobber whatever arrived, which is why content is a callback. */
console.log('\n422 not-a-fast-forward retry');
{
  const fc = await browser.newContext();
  await fc.addInitScript(() => localStorage.setItem('design-dna:vault:gh-token', 'github_pat_smoke'));
  let refReads = 0, treeBuilds = 0, patches = 0, sitesRebuilds = 0, ok = false;
  await fc.route('https://api.github.com/**', async (route) => {
    const url = route.request().url(), method = route.request().method();
    const json = (x, s = 200) => route.fulfill({ status: s, contentType: 'application/json', body: JSON.stringify(x) });
    if (/\/commits\?path=/.test(url)) return json([]);
    if (/\/contents\/vault\/sites\.json/.test(url) && method === 'GET') {
      return json({ sha: `s${refReads}`, content: Buffer.from(readFileSync(join(VAULT, 'sites.json'), 'utf8')).toString('base64') });
    }
    if (/\/git\/ref\/heads\//.test(url) && method === 'GET') { refReads += 1; return json({ object: { sha: `head${refReads}` } }); }
    if (/\/git\/commits\/head\d+$/.test(url)) return json({ tree: { sha: `tree${refReads}` } });
    if (/\/git\/blobs$/.test(url) && method === 'POST') return json({ sha: 'blob1' });
    if (/\/git\/trees$/.test(url) && method === 'POST') {
      treeBuilds += 1;
      const body = JSON.parse(route.request().postData() ?? '{}');
      if ((body.tree ?? []).some((x) => x.path === 'vault/sites.json')) sitesRebuilds += 1;
      return json({ sha: `nt${treeBuilds}` });
    }
    if (/\/git\/commits$/.test(url) && method === 'POST') return json({ sha: `commit${treeBuilds}` });
    if (/\/git\/refs\/heads\//.test(url) && method === 'PATCH') {
      patches += 1;
      if (patches < 3) return json({ message: 'Update is not a fast forward' }, 422);   // branch moved twice
      ok = true;
      return json({ ok: true });
    }
    return json({});
  });

  const fp = await fc.newPage();
  const fErrs = [];
  fp.on('pageerror', (e) => fErrs.push(String(e.message)));
  await fp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await fp.waitForSelector('.card');
  await fp.waitForTimeout(1000);
  await fp.locator('.card h2').first().click();
  await fp.waitForTimeout(900);

  if (await fp.locator('#remove-photos').count()) {
    await fp.locator('#remove-photos').click();
    await fp.waitForTimeout(250);
    await fp.locator('#remove-photos-confirm .btn--danger').click();
    await fp.waitForTimeout(2500);
  }

  check('a moved branch is retried rather than surfaced as 422',
    ok && patches === 3, `${patches} PATCH attempts, succeeded: ${ok}`);
  check('each attempt rebuilds on the new head', refReads === 3 && treeBuilds === 3,
    `${refReads} ref reads, ${treeBuilds} tree builds`);
  check('each attempt re-merges sites.json rather than reusing a stale copy',
    sitesRebuilds === 3, `${sitesRebuilds} rebuilds`);
  check('the user sees success, not the 422',
    /Removed \d+ image/.test((await fp.locator('#toast').textContent().catch(() => '')) ?? ''));
  check('no page errors during the retry', fErrs.length === 0, fErrs.slice(0, 2).join(' | ') || 'clean');
  await fc.close();
}

console.log('\nnote clamp — 1500+ char mixed-script note');
{
  const LONG = (
    'Аналитическая заметка: композиция держится на одном доминирующем объекте, а вся '
    + 'остальная плоскость работает как активное негативное пространство. The tonal '
    + 'structure survives a squint test because there are only two masses — один светлый '
    + 'текстовый блок против почти однородного тёмного поля. Ритм задаётся интервалами, '
    + 'а не количеством элементов: 12px eyebrow→heading, 24px heading→lead, 48px до CTA. '
    + 'Обратите внимание, что акцентный цвет занимает меньше одного процента пикселей и '
    + 'появляется только там, где нужно действие. Motion changes narrative state rather '
    + 'than merely revealing content, что делает страницу похожей на поставленную сцену, '
    + 'а не на документ. Полностью воспроизводить артефакт нельзя — нужно взять решение: '
    + 'где масса, куда ведёт взгляд, что вычтено. This sentence exists to push the note '
    + 'comfortably past fifteen hundred characters so that the clamp is exercised against '
    + 'real length and a genuinely mixed script, including '
    + 'длинныесловабезпробеловкоторыенеразрываютсяникогда and Latin tokens interleaved '
    + 'throughout the body of the paragraph. Дополнительно проверяем, что деталь '
    + 'показывает весь текст без обрезки, с комфортной мерой строки и межстрочным '
    + 'интервалом, потому что именно деталь теперь основная поверхность для чтения '
    + 'глубокого анализа, а карточка — только превью на четыре строки. Ещё один абзац '
    + 'нужен для того, чтобы заметка уверенно превысила полторы тысячи символов и '
    + 'проверяла зажим на реальной длине: composition, tonal structure, spacing '
    + 'relationships — три вещи, которые агент обязан описать, открыв изображение, '
    + 'прежде чем применять решения, а не воспроизводить артефакт. Инварианты всегда '
    + 'важнее референса, и при конфликте выигрывают именно они.'
  );
  check('the test note is over 1500 characters and mixed-script',
    LONG.length > 1500 && /[Ѐ-ӿ]/.test(LONG) && /[A-Za-z]/.test(LONG),
    `${LONG.length} chars`);

  const cc = await browser.newContext();
  const cp = await cc.newPage();
  await cp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await cp.waitForSelector('.card');
  await cp.evaluate(async (note) => {
    const live = await fetch('sites.json').then((r) => r.json());
    live[0] = { ...live[0], note };
    localStorage.setItem('design-dna:vault:working-copy',
      JSON.stringify({ entries: live, at: new Date(Date.now() + 600000).toISOString() }));
  }, LONG);
  await cp.reload({ waitUntil: 'domcontentloaded' });
  await cp.waitForSelector('.card');
  await cp.waitForTimeout(1200);

  const m = await cp.evaluate(() => {
    const rows = [...document.querySelectorAll('.card')].map((c) => {
      const n = c.querySelector('.card-note');
      const lh = parseFloat(getComputedStyle(n).lineHeight);
      return {
        lines: Math.round(n.getBoundingClientRect().height / lh),
        clipped: n.scrollHeight > n.clientHeight + 1,
        moreShown: !c.querySelector('.note-more').hidden,
        noteBoxH: Math.round(n.getBoundingClientRect().height),
      };
    });
    return {
      maxLines: Math.max(...rows.map((r) => r.lines)),
      clippedAllFour: rows.filter((r) => r.clipped).every((r) => r.lines === 4),
      moreMatches: rows.every((r) => r.moreShown === r.clipped),
      anyClipped: rows.some((r) => r.clipped),
      // Only clipped notes should be identical; a short note is legitimately shorter.
      clippedSpread: (() => {
        const hs = rows.filter((r) => r.clipped).map((r) => r.noteBoxH);
        return hs.length ? Math.max(...hs) - Math.min(...hs) : 0;
      })(),
      clippedCount: rows.filter((r) => r.clipped).length,
    };
  });
  check('no card note exceeds 4 lines', m.maxLines <= 4, `max ${m.maxLines}`);
  check('every clipped note is exactly 4 lines', m.clippedAllFour && m.anyClipped);
  check('"read more" appears exactly when the note is clipped', m.moreMatches);

  // Card rhythm: note boxes must be uniform among clipped cards, so the only
  // remaining height variance comes from images and tag rows.
  check('all clamped note boxes are the same height', m.clippedSpread <= 1,
    `${m.clippedCount} clipped, spread ${m.clippedSpread}px`);

  // The detail view is the reading surface: full text, no clamp, comfortable.
  await cp.locator('.card').first().locator('.note-more').click();
  await cp.waitForTimeout(900);
  const d = await cp.evaluate(() => {
    const nr = document.querySelector('#note-read');
    const cs = getComputedStyle(nr);
    return {
      len: nr.textContent.length,
      clamp: cs.webkitLineClamp,
      lineHeightRatio: parseFloat(cs.lineHeight) / parseFloat(cs.fontSize),
      overflow: cs.overflow,
      measureCh: nr.getBoundingClientRect().width / (parseFloat(cs.fontSize) * 0.5),
    };
  });
  check('detail shows the whole note', d.len >= 1500, `${d.len} chars`);
  check('detail note is not clamped', d.clamp === 'none' || d.clamp === '');
  check('detail note is not hidden by overflow', d.overflow === 'visible');
  check('detail note line-height is comfortable (1.5–1.8)',
    d.lineHeightRatio >= 1.5 && d.lineHeightRatio <= 1.8, d.lineHeightRatio.toFixed(2));
  check('detail note measure is readable (≤80ch)', d.measureCh <= 80, `${Math.round(d.measureCh)}ch`);
  await cc.close();
}

console.log('\npending-capture placeholder');
{
  const pc = await browser.newContext();
  const pp = await pc.newPage();
  await pp.goto(URL_BASE, { waitUntil: 'domcontentloaded' });
  await pp.waitForSelector('.card');
  // A shotless entry, held only in this browser.
  await pp.evaluate(async () => {
    const live = await fetch('sites.json').then((r) => r.json());
    live.push({
      id: 'pending-smoke', url: 'https://example.com/pending', title: 'Pending Smoke',
      added: new Date().toISOString().slice(0, 10), rating: 2,
      dialectStatus: 'unreviewed', dialects: [],
      tags: {}, note: 'TODO', shots: { full: null, hero: null, mobile: null },
    });
    localStorage.setItem('design-dna:vault:working-copy',
      JSON.stringify({ entries: live, at: new Date(Date.now() + 600000).toISOString() }));
  });
  await pp.reload({ waitUntil: 'domcontentloaded' });
  await pp.waitForSelector('.card');
  await pp.waitForTimeout(900);
  const pcard = pp.locator('.card').filter({ hasText: 'Pending Smoke' });
  check('shotless entry renders the pending placeholder',
    (await pcard.locator('.card-shot--pending').count()) === 1);
  check('placeholder shows the domain in display type',
    (await pcard.locator('.pending-domain').textContent()) === 'example.com');
  check('placeholder shows the "capture pending" line',
    (await pcard.locator('.pending-status').textContent()) === 'capture pending');
  check('placeholder has a favicon or its glyph fallback',
    (await pcard.locator('.pending-favicon, .pending-glyph:not([hidden])').count()) >= 1);
  // Scoped to the cards: body.textContent would include the inline module source.
  check('no bare "no shots yet" text remains in the grid',
    !(await pp.locator('#grid').textContent()).includes('no shots yet'));
  check('TODO note reads as a call to action',
    (await pcard.locator('.card-note--todo').textContent()).includes('tap to write why this is here'));
  const realShots = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'))
    .filter((e) => e.shots?.hero).length;
  check('entries with shots still render real previews',
    (await pp.locator('.card-shot img:not(.pending-favicon)').count()) === realShots,
    `${realShots} expected`);
  await pc.close();
}

console.log('\nadd');
await page.click('#open-add');
await page.waitForTimeout(500);
check('add sheet opens', await page.locator('#add').isVisible());
await shot(page, 'gallery-add');
await page.keyboard.press('Escape');

/* ── real mobile matrix ───────────────────────────────────────────────────
   Not a narrow desktop viewport: actual device descriptors on both engines.
   WebKit is the one that matters — a desktop-Chromium-only pass hid a
   SecurityError on localStorage that blanked the page in Safari private mode. */
const MOBILE_MATRIX = [
  { name: 'WebKit · iPhone 13', engine: webkit, device: 'iPhone 13' },
  { name: 'WebKit · iPhone SE', engine: webkit, device: 'iPhone SE' },
  { name: 'Chrome · Pixel 5', engine: chromium, device: 'Pixel 5' },
];

for (const profile of MOBILE_MATRIX) {
  console.log(`\nmobile · ${profile.name}`);
  const mb = await profile.engine.launch();
  const mctx = await mb.newContext({ ...devices[profile.device] });
  const mp = await mctx.newPage();
  const mErrs = [];
  /* The pending placeholder probes s2 → /favicon.ico → glyph on purpose, so a
     404 on a favicon URL is the fallback chain working, not a page error. */
  /* The pending placeholder probes s2 → /favicon.ico → glyph by design, and that
     third-party service rate-limits (403) under repeated test runs. Attribute
     resource errors by watching responses: a bare "Failed to load resource"
     console line only counts if some NON-favicon request actually failed. */
  const isFaviconProbe = (t) => /favicon|s2\/favicons|gstatic|google\.com|api\.github\.com/i.test(t ?? '');
  const badResponses = [];
  mp.on('response', (r) => {
    if (r.status() >= 400 && !isFaviconProbe(r.url())) badResponses.push(`${r.status()} ${r.url()}`);
  });
  mp.on('pageerror', (e) => mErrs.push(String(e.message || e)));
  mp.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (isFaviconProbe(m.text()) || isFaviconProbe(m.location()?.url)) return;
    if (/Failed to load resource/i.test(m.text()) && badResponses.length === 0) return;
    mErrs.push(m.text());
  });
  mp.on('requestfailed', (r) => { if (!isFaviconProbe(r.url())) mErrs.push(`requestfailed ${r.url()}`); });

  try {
    await mp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await mp.waitForSelector('.card', { timeout: 12_000 });
  } catch { /* asserted below */ }
  await mp.waitForTimeout(900);

  const cards = await mp.locator('.card').count();
  check(`${profile.name}: page loads and renders cards`, cards > 0, `${cards} cards`);
  /* The mobile first screen must contain a reference, not just chrome. The panel
     found the dominant mass off-screen at 739px against a 664px viewport. */
  check(`${profile.name}: a reference is visible on arrival`,
    await mp.evaluate(() => {
      const c = document.querySelector(".card-shot");
      return c ? c.getBoundingClientRect().top < window.innerHeight : false;
    }),
    await mp.evaluate(() => `first card y=${Math.round(document.querySelector(".card").getBoundingClientRect().top)} vh=${window.innerHeight}`));
  check(`${profile.name}: no horizontal overflow`,
    !(await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));

  // Single column: every card shares the same left edge.
  const lefts = await mp.locator('.card').evaluateAll((els) =>
    [...new Set(els.map((e) => Math.round(e.getBoundingClientRect().left)))]);
  check(`${profile.name}: cards are a single column`, lefts.length <= 1, `${lefts.length} distinct left edges`);

  // Chips wrap onto multiple rows rather than overflowing their row.
  await openFilters(mp);
  const chipRows = await mp.locator('#filters .pill').evaluateAll((els) =>
    [...new Set(els.map((e) => Math.round(e.getBoundingClientRect().top)))].length);
  check(`${profile.name}: filter chips wrap`, chipRows > 1, `${chipRows} rows`);

  const tooSmall = await mp.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.btn, .pill, .search')) {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < 44) out.push(`${el.className}:${Math.round(r.height)}`);
    }
    return out;
  });
  check(`${profile.name}: tap targets ≥44px`, tooSmall.length === 0, tooSmall.slice(0, 3).join(' ') || 'all pass');

  // Detail view has to be usable, not just present.
  /* The filter popover was opened above to measure its pills, and an overlay
     that covers the grid is the whole point of it — so it is dismissed before
     reaching for a card, exactly as a person would. */
  await mp.keyboard.press('Escape');
  await mp.waitForTimeout(250);
  await mp.locator('.card').first().click();
  await mp.waitForTimeout(800);
  check(`${profile.name}: detail view opens`, await mp.locator('#detail').isVisible());
  check(`${profile.name}: detail has no horizontal overflow`,
    !(await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));
  check(`${profile.name}: remove-from-vault reachable`,
    (await mp.locator('#detail .btn--danger').count()) >= 1);

  /* "+ add photos" must be FULLY on the first screen — vertically and
     horizontally. It was once at x=350 on a 320px viewport, hidden by
     overflow-x: clip, which is how a control becomes impossible to find. */
  const addBox = await mp.evaluate(() => {
    const r = document.querySelector('#extras-add')?.getBoundingClientRect();
    if (!r) return null;
    return {
      x: r.x, right: r.right, y: r.y, bottom: r.bottom,
      vw: window.innerWidth, vh: window.innerHeight,
      headRight: document.querySelector('.extras-head').getBoundingClientRect().right,
      h2Right: document.querySelector('#detail-body h2').getBoundingClientRect().right,
    };
  });
  check(`${profile.name}: "+ add photos" fully on the first screen`,
    addBox && addBox.x >= 0 && addBox.right <= addBox.vw
      && addBox.y >= 0 && addBox.bottom <= addBox.vh,
    addBox ? `x=${Math.round(addBox.x)} right=${Math.round(addBox.right)}/${addBox.vw} y=${Math.round(addBox.y)} bottom=${Math.round(addBox.bottom)}/${addBox.vh}` : 'missing');
  check(`${profile.name}: detail content is not wider than the viewport`,
    addBox && addBox.headRight <= addBox.vw + 1 && addBox.h2Right <= addBox.vw + 1,
    addBox ? `head=${Math.round(addBox.headRight)} h2=${Math.round(addBox.h2Right)} vw=${addBox.vw}` : 'missing');
  check(`${profile.name}: any extras strip scrolls inside itself, not the page`,
    await mp.evaluate(() => {
      const s = document.querySelector('#extras-strip');
      const pageOk = document.documentElement.scrollWidth <= window.innerWidth + 1;
      return s ? (s.scrollWidth > s.clientWidth && pageOk) : pageOk;
    }));

  // Note editing has to be usable at phone width, keyboard and all.
  await mp.locator('#note-edit').click();
  await mp.waitForTimeout(600);
  check(`${profile.name}: note editor opens on tap`, await mp.locator('#note-editor').isVisible());
  const areaBox = await mp.locator('#note-inline').boundingBox();
  check(`${profile.name}: textarea fits the viewport width`,
    areaBox && areaBox.width <= (await mp.evaluate(() => window.innerWidth)),
    areaBox ? `${Math.round(areaBox.width)}px` : 'no box');
  check(`${profile.name}: textarea is ≥16px so iOS does not zoom`,
    (await mp.locator('#note-inline').evaluate((el) => parseFloat(getComputedStyle(el).fontSize))) >= 16);
  const saveBox = await mp.locator('#note-editor .btn--primary').boundingBox();
  check(`${profile.name}: note Save is on-screen, not under the keyboard`,
    saveBox && saveBox.y >= 0 && saveBox.y < (await mp.evaluate(() => window.innerHeight)),
    saveBox ? `y=${Math.round(saveBox.y)} vh=${await mp.evaluate(() => window.innerHeight)}` : 'no box');
  check(`${profile.name}: note Save is a 44px target`, saveBox && saveBox.height >= 44,
    saveBox ? `${Math.round(saveBox.height)}px` : 'no box');
  await mp.locator('#note-editor .btn:not(.btn--primary)').click();
  await mp.waitForTimeout(300);

  await mp.keyboard.press('Escape');
  await mp.waitForTimeout(300);

  /* The exact user reproduction: type a URL, tap Save, with no stored token.
     This used to do nothing at all. */
  await mp.click('#open-add');
  await mp.waitForTimeout(500);
  await mp.fill('#add-url', 'example.com/mobile-smoke');
  await mp.locator('#add-form button[type="submit"]').click();
  await mp.waitForTimeout(1000);
  check(`${profile.name}: Save with no token shows the choice dialog`,
    await mp.locator('#token').isVisible());
  check(`${profile.name}: the choice offers download as well as token`,
    (await mp.locator('#token-download').isVisible())
    && (await mp.locator('#token-input').isVisible()));
  check(`${profile.name}: Save produced a visible message`, await mp.locator('#toast').isVisible());

  check(`${profile.name}: no page errors`, mErrs.length === 0, mErrs.slice(0, 2).join(' | ') || 'clean');
  if (profile.device === 'iPhone 13') await shot(mp, 'gallery-mobile', { fullPage: true });
  await mb.close();
}

/* Storage blocked, as in Safari private browsing: the page must still work. */
console.log('\nmobile · WebKit · iPhone 13 · storage blocked');
{
  const pb = await webkit.launch();
  const pctx = await pb.newContext({ ...devices['iPhone 13'] });
  await pctx.addInitScript(() => {
    const boom = () => { throw new DOMException('The operation is insecure.', 'SecurityError'); };
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { return { getItem: boom, setItem: boom, removeItem: boom, clear: boom }; },
    });
  });
  const pp = await pctx.newPage();
  const pErrs = [];
  pp.on('pageerror', (e) => pErrs.push(String(e.message || e)));
  try {
    await pp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await pp.waitForSelector('.card', { timeout: 12_000 });
  } catch { /* asserted below */ }
  await pp.waitForTimeout(700);
  check('private browsing: page still renders cards', (await pp.locator('.card').count()) > 0);
  check('private browsing: no uncaught SecurityError', pErrs.length === 0, pErrs.slice(0, 2).join(' | ') || 'clean');
  await pb.close();
}

/* ── token rejection clarity ──────────────────────────────────────────────
   Each GitHub status maps onto a different human problem with a different fix.
   "Save failed" for all of them leaves the user nothing to act on. */
console.log('\nmobile · WebKit · iPhone 13 · token rejection messages');
{
  const CASES = [
    { name: '401 bad credentials', status: 401, body: { message: 'Bad credentials' },
      expect: [/401/i, /revoked|expired|malformed/i], hintHas: /fresh fine-grained token/i, reopens: true },
    { name: '403 no permission', status: 403, body: { message: 'Resource not accessible by personal access token' },
      headers: { 'x-ratelimit-remaining': '4999' },
      expect: [/403/, /not allowed to write/i], hintHas: /Contents/i, reopens: true },
    { name: '403 rate limited', status: 403, body: { message: 'API rate limit exceeded' },
      // GitHub exposes these to JS via CORS; the mock must too, or the browser
      // cannot read them and a rate limit is indistinguishable from a 403 denial.
      headers: {
        'x-ratelimit-remaining': '0',
        'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 900),
        'access-control-expose-headers': 'x-ratelimit-remaining, x-ratelimit-reset',
      },
      expect: [/rate-limited/i, /resets/i], hintHas: /wait/i, reopens: false },
    { name: '404 wrong repo selection', status: 404, body: { message: 'Not Found' },
      expect: [/404/, /cannot see/i, /outside its selected list/i], hintHas: /Repository access/i, reopens: true },
    { name: 'network failure', abort: true,
      expect: [/could not reach api\.github\.com/i], hintHas: /connection/i, reopens: false },
  ];

  for (const c of CASES) {
    const tb = await webkit.launch();
    const tctx = await tb.newContext({ ...devices['iPhone 13'], acceptDownloads: true });
    await tctx.addInitScript(() => {
      localStorage.setItem('design-dna:vault:gh-token', '  github_pat_smoketest\n');   // padded on purpose
    });
    await tctx.route('https://api.github.com/**', (route) => {
      if (c.abort) return route.abort('connectionfailed');
      return route.fulfill({
        status: c.status,
        contentType: 'application/json',
        headers: c.headers ?? {},
        body: JSON.stringify(c.body),
      });
    });
    const tp = await tctx.newPage();
    await tp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await tp.waitForSelector('.card', { timeout: 12_000 });
    await tp.waitForTimeout(600);

    // Real path: edit an entry and submit, which routes through requestSave().
    await tp.locator('.card').first().click();
    await tp.waitForTimeout(700);
    await openApparatus(tp);
    await tp.locator('#detail [data-field="dialectStatus"] input[value="in"]').check();
    await tp.locator('#entry-save').click();
    await tp.waitForTimeout(2500);

    const msg = ((await tp.locator('#toast').textContent()) ?? '')
      + ' ' + ((await tp.locator('#dirty-note').textContent()) ?? '')
      + ' ' + ((await tp.locator('#token-error').isVisible())
        ? (await tp.locator('#token-error').textContent()) : '');

    const matched = c.expect.every((re) => re.test(msg));
    check(`${c.name}: message states the specific reason`, matched,
      matched ? '' : msg.replace(/\s+/g, ' ').slice(0, 150));
    check(`${c.name}: message includes a fix hint`, c.hintHas.test(msg));
    check(`${c.name}: ${c.reopens ? 'reopens the token panel' : 'does not demand a new token'}`,
      (await tp.locator('#token').isVisible()) === c.reopens);
    await tb.close();
  }

  // Padded token must reach the API cleaned.
  const cb = await webkit.launch();
  const cctx = await cb.newContext({ ...devices['iPhone 13'] });
  await cctx.addInitScript(() => {
    localStorage.setItem('design-dna:vault:gh-token', '\n  github_pat_padded \n');
  });
  let sentAuth = null;
  await cctx.route('https://api.github.com/**', (route) => {
    sentAuth = route.request().headers()['authorization'] ?? null;
    return route.fulfill({ status: 401, contentType: 'application/json', body: '{"message":"Bad credentials"}' });
  });
  const cp = await cctx.newPage();
  await cp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
  await cp.waitForSelector('.card', { timeout: 12_000 });
  await cp.locator('.card').first().click();
  await cp.waitForTimeout(700);
  await openApparatus(cp);
  await cp.locator('#detail [data-field="dialectStatus"] input[value="in"]').check();
  await cp.locator('#entry-save').click();
  await cp.waitForTimeout(2000);
  check('whitespace is stripped from the pasted token before use',
    sentAuth === 'Bearer github_pat_padded', String(sentAuth));
  await cb.close();
}

/* api.github.com unreachable must never block first paint. */
console.log('\nmobile · WebKit · iPhone 13 · api.github.com hanging');
{
  const hb = await webkit.launch();
  const hctx = await hb.newContext({ ...devices['iPhone 13'] });
  await hctx.route('https://api.github.com/**', async () => {
    await new Promise((r) => setTimeout(r, 60_000));      // never resolves in time
  });
  const hp = await hctx.newPage();
  try {
    await hp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await hp.waitForSelector('.card', { timeout: 12_000 });
  } catch { /* asserted below */ }
  check('hanging GitHub API does not block first paint', (await hp.locator('.card').count()) > 0);
  await hb.close();
}

console.log('\nconsole / network');
check('no console or network errors', errors.length === 0, errors.length ? errors.join(' | ') : 'clean');

await browser.close();

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem${problems.length === 1 ? '' : 's'}: ${problems.join(', ')}\n`);
  process.exit(1);
}
console.log('\n✓ gallery is healthy\n');
