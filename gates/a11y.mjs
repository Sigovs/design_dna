/* Keyboard, targets, reduced motion — the invariants nothing measured.
 *
 * DNA68 (touch targets), DNA78 (keyboard parity), DNA79 and motion I1 (reduced
 * motion is a designed state) and DNA90 (Lenis, off under reduce) were all
 * written down and none of them had a gate. Each was "checked" by reading the
 * source, which is how a <div> with a click handler, a 30px close button and a
 * page that reveals its copy only by animation all ship looking finished.
 *
 * Everything here is driven, not inspected: Tab is pressed, Enter and Space are
 * pressed, the page is rendered twice with the motion preference flipped.
 *
 * The detection logic is adapted from ux-ui-agent-skills (MIT, plugin87) —
 * verify_target_size, verify_keyboard, verify_focustrap, verify_reduced_motion;
 * the originals and the argument for taking them are in
 * external/ux-ui-agent-skills/. What changed: one module instead of four CLIs,
 * pages served over HTTP rather than file://, a 44px touch floor (DNA68) beside
 * WCAG's 24px pointer floor, parity keyed by DOM path rather than document
 * index, and the Lenis contract added.
 *
 * A DETECTOR, LIKE THE REST. A page that passes has no measurable keyboard,
 * target or motion defect at the viewports it was run at. It does not mean the
 * focus order is sensible or the reduced state is designed — that is still a
 * person looking at it.
 */

/* ── targets ─────────────────────────────────────────────────────────────── */
/* Undersized targets that no WCAG 2.5.8 exception covers. The exceptions are
   real ones, so the gate does not fire on a link in a sentence: spacing (no
   other target centre within MIN), inline (the target sits in a run of text),
   and the effective hit area (a control's <label> is part of it). */
const TARGETS = (MIN) => {
  const SEL = 'a[href],button,input:not([type="hidden"]),select,textarea,summary,'
    + '[role="button"],[role="link"],[role="tab"],[role="checkbox"],[role="radio"],[role="switch"],'
    + '[role="menuitem"],[role="option"],[tabindex]:not([tabindex="-1"])';
  const label = (el) => {
    const t = (el.getAttribute('aria-label') || el.title || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
    const id = el.id ? '#' + el.id : (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
    return `${el.tagName.toLowerCase()}${id}${t ? ` "${t}"` : ''}`;
  };
  const effective = (el) => {
    let r = el.getBoundingClientRect();
    const lab = el.closest('label') || (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
    if (lab) {
      const l = lab.getBoundingClientRect();
      if (l.width && l.height) {
        const left = Math.min(r.left, l.left), top = Math.min(r.top, l.top);
        const right = Math.max(r.right, l.right), bottom = Math.max(r.bottom, l.bottom);
        r = { left, top, width: right - left, height: bottom - top };
      }
    }
    return r;
  };
  const inline = (el) => {
    const d = getComputedStyle(el).display;
    if (d !== 'inline' && d !== 'inline-block') return false;
    /* the parent's OWN text nodes: a sentence around the link. Upstream compared
       the parent's whole textContent, so two icon buttons side by side each read
       the other's glyph as "surrounding text" and were excused as inline. */
    const p = el.parentElement;
    return !!p && [...p.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
  };
  const all = [...document.querySelectorAll(SEL)].filter((el) => {
    if (el.disabled || el.getAttribute('aria-disabled') === 'true') return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0 || cs.pointerEvents === 'none') return false;
    if (el.checkVisibility && !el.checkVisibility()) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }).map((el) => { const r = effective(el); return { el, r, cx: r.left + r.width / 2, cy: r.top + r.height / 2 }; });
  const bad = [];
  for (const t of all) {
    if (t.r.width >= MIN && t.r.height >= MIN) continue;
    if (inline(t.el)) continue;
    if (!all.some((o) => o !== t && Math.hypot(o.cx - t.cx, o.cy - t.cy) < MIN)) continue;
    bad.push(`${label(t.el)} is ${Math.round(t.r.width)}×${Math.round(t.r.height)}`);
  }
  return { total: all.length, bad: [...new Set(bad)] };
};

/* ── keyboard ────────────────────────────────────────────────────────────── */
/* Tags every control meant to be in the tab order, and every composite widget
   (listbox, tablist, menu…) whose items are reached with arrows rather than
   Tab — flagging those items as unreachable would be wrong. */
const MARK = () => {
  const NATIVE = /^(a|button|input|select|textarea|summary)$/;
  const ITEM = '[role="tab"],[role="option"],[role="treeitem"],[role="menuitem"],[role="menuitemcheckbox"],'
    + '[role="menuitemradio"],[role="radio"],[role="gridcell"],[role="row"],button,a[href]';
  const CONTROL = 'a[href],button,input:not([type="hidden"]),select,textarea,summary,[role="button"],[role="link"],'
    + '[role="tab"],[role="checkbox"],[role="radio"],[role="switch"],[role="menuitem"],[role="menuitemcheckbox"],[role="option"],[tabindex]';
  const COMPOSITE = '[role="tablist"],[role="listbox"],[role="tree"],[role="grid"],[role="menu"],[role="menubar"],[role="radiogroup"],[role="toolbar"]';
  const vis = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    if (el.checkVisibility && !el.checkVisibility()) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const operable = (el) => !el.disabled && el.getAttribute('aria-disabled') !== 'true' && getComputedStyle(el).pointerEvents !== 'none';
  const tabbable = (el) => { const ti = el.getAttribute('tabindex'); return ti !== null ? +ti >= 0 : NATIVE.test(el.tagName.toLowerCase()); };
  const name = (el) => {
    const t = (el.getAttribute('aria-label') || el.title || el.textContent || '').replace(/\s+/g, ' ').trim();
    const id = el.id ? '#' + el.id : (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
    return `${el.tagName.toLowerCase()}${id}${t ? ` "${t.slice(0, 28)}"` : ''}`;
  };
  const dialog = [...document.querySelectorAll('[role="dialog"],dialog')].find(vis) || null;
  const root = dialog || document.body;

  /* a native radio group has one tab stop; the rest are reached by arrows */
  const radioSkip = new Set();
  for (const r of root.querySelectorAll('input[type="radio"][name]')) {
    if (radioSkip.has(r)) continue;
    const g = [...root.querySelectorAll(`input[type="radio"][name="${CSS.escape(r.name)}"]`)].filter((e) => vis(e) && !e.disabled);
    if (g.length < 2) continue;
    const stop = g.find((e) => e.checked) || g[0];
    g.forEach((e) => e !== stop && radioSkip.add(e));
  }

  const STATE = ['aria-checked', 'aria-selected', 'aria-expanded', 'aria-pressed'];
  const controls = [], orphans = [];
  let n = 0;
  for (const el of root.querySelectorAll(CONTROL)) {
    if (radioSkip.has(el)) continue;
    if (!vis(el) || !operable(el) || !tabbable(el)) {
      if (vis(el) && operable(el) && el.getAttribute('tabindex') === null && !NATIVE.test(el.tagName.toLowerCase())
        && ['button', 'link', 'checkbox', 'switch'].includes(el.getAttribute('role'))) orphans.push(name(el));
      continue;
    }
    el.setAttribute('data-kbd-idx', String(n));
    controls.push({ i: n++, name: name(el), stateAttr: STATE.find((a) => el.hasAttribute(a)) || null, native: NATIVE.test(el.tagName.toLowerCase()) });
  }

  const composites = [];
  let c = 0;
  for (const box of root.querySelectorAll(COMPOSITE)) {
    if (!vis(box)) continue;
    const items = [...box.querySelectorAll(ITEM)].filter((e) => vis(e) && operable(e));
    if (items.length < 2) continue;
    box.setAttribute('data-kbd-comp', String(c));
    items.forEach((e, k) => e.setAttribute('data-kbd-item', `${c}.${k}`));
    const owner = box.id
      ? [...document.querySelectorAll(`[aria-controls~="${CSS.escape(box.id)}"],[aria-owns~="${CSS.escape(box.id)}"]`)].find((e) => vis(e) && tabbable(e))
      : null;
    const ad = owner?.hasAttribute('aria-activedescendant') ? owner : (box.hasAttribute('aria-activedescendant') ? box : null);
    if (ad) ad.setAttribute('data-kbd-ad', String(c));
    composites.push({ c: c++, name: name(box), role: box.getAttribute('role'), items: items.length,
      tabbableItem: items.findIndex(tabbable), boxTabbable: tabbable(box), hasOwner: !!owner, activeDescendant: !!ad });
  }
  return { controls, composites, orphans, scoped: !!dialog };
};

async function keyboard(page) {
  const { controls, composites, orphans, scoped } = await page.evaluate(MARK);
  const problems = [];
  if (orphans.length) problems.push(`no tab stop: ${orphans.length} control(s) carry an interactive role and no tabindex — ${orphans.slice(0, 4).join(', ')}`);

  if (controls.length) {
    await page.evaluate(() => { document.activeElement?.blur?.(); scrollTo(0, 0); });
    const reached = new Set();
    const budget = Math.min(controls.length * 3 + 20, 600);
    for (let k = 0; k < budget && reached.size < controls.length; k++) {
      await page.keyboard.press('Tab');
      const idx = await page.evaluate(() => document.activeElement?.getAttribute?.('data-kbd-idx') ?? null);
      if (idx !== null) reached.add(+idx);
    }
    /* a control that tabbing itself disabled is not unreachable: Tab through a
       rail of cards scrolls it to the end, and "Next" is then rightly disabled */
    const live = new Set(await page.evaluate(() => [...document.querySelectorAll('[data-kbd-idx]')]
      .filter((e) => !e.disabled && e.getAttribute('aria-disabled') !== 'true' && (!e.checkVisibility || e.checkVisibility()))
      .map((e) => +e.getAttribute('data-kbd-idx'))));
    const missed = controls.filter((x) => !reached.has(x.i) && live.has(x.i));
    if (missed.length) problems.push(`unreachable: Tab never reaches ${missed.length} control(s)${scoped ? ' (scoped to the open dialog)' : ''} — ${missed.slice(0, 4).map((x) => x.name).join(', ')}`);
  }

  for (const x of controls.filter((x) => x.stateAttr && !x.native)) {
    const sel = `[data-kbd-idx="${x.i}"]`;
    const read = () => page.$eval(sel, (el, a) => el.getAttribute(a), x.stateAttr).catch(() => null);
    let changed = false;
    for (const key of ['Enter', 'Space']) {
      await page.focus(sel).catch(() => {});
      const before = await read();
      await page.keyboard.press(key);
      await page.waitForTimeout(60);
      if (before !== await read()) { changed = true; break; }
    }
    if (!changed) problems.push(`dead key: ${x.name} exposes ${x.stateAttr} and neither Enter nor Space changes it`);
    await page.keyboard.press('Escape');
  }

  for (const w of composites) {
    if (!(w.tabbableItem >= 0 || w.boxTabbable || w.hasOwner)) {
      problems.push(`orphan widget: ${w.name} (${w.role}, ${w.items} items) has no tabbable item, container or owner`);
      continue;
    }
    if (w.activeDescendant) {
      const host = `[data-kbd-ad="${w.c}"]`;
      const read = () => page.$eval(host, (el) => el.getAttribute('aria-activedescendant')).catch(() => null);
      await page.focus(host).catch(() => {});
      const before = await read();
      let moved = false;
      for (const key of ['ArrowDown', 'ArrowRight']) {
        await page.keyboard.press(key); await page.waitForTimeout(60);
        if (before !== await read()) { moved = true; break; }
      }
      if (!moved) problems.push(`dead arrows: ${w.name} drives aria-activedescendant and the arrows never move it`);
      continue;
    }
    if (w.tabbableItem < 0) continue;
    const start = `${w.c}.${w.tabbableItem}`;
    await page.focus(`[data-kbd-item="${start}"]`).catch(() => {});
    let moved = false;
    for (const key of ['ArrowDown', 'ArrowRight']) {
      await page.keyboard.press(key); await page.waitForTimeout(60);
      const now = await page.evaluate(() => document.activeElement?.getAttribute?.('data-kbd-item') ?? null);
      if (now && now !== start) { moved = true; break; }
    }
    if (!moved) problems.push(`dead arrows: ${w.name} (${w.role}) uses roving tabindex and ArrowDown/ArrowRight never move focus`);
  }
  return { controls: controls.length, composites: composites.length, problems };
}

/* ── dialogs ─────────────────────────────────────────────────────────────── */
/* Only dialogs the declaration names: opening one needs to know its trigger,
   and guessing at triggers clicks things a visitor would not. */
async function dialog(page, { open, dialog: sel = '[role="dialog"],dialog[open]' }) {
  const problems = [];
  /* installed once per page: every probe below needs "the dialog that is showing" */
  await page.evaluate(() => {
    window.__gateDialog = (sel) => [...document.querySelectorAll(sel)].find((el) => {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && (el.offsetParent !== null || cs.position === 'fixed');
    });
  });
  /* the first trigger a visitor can actually see at this viewport — a page often
     carries the same trigger in a dock that only exists on phones */
  const tid = await page.evaluate((s) => {
    const t = [...document.querySelectorAll(s)].find((e) => e.checkVisibility ? e.checkVisibility() : e.offsetParent !== null);
    if (t) t.id ||= '__gate_trigger';
    return t?.id ?? null;
  }, open);
  if (!tid) return { open, problems: [`no visible trigger matches ${open}`] };
  await page.focus(`#${tid}`).catch(() => {});
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  const sem = await page.evaluate((sel) => {
    const d = window.__gateDialog(sel);
    if (!d) return { open: false };
    const native = d.tagName === 'DIALOG';
    const f = [...d.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter((e) => e.offsetParent !== null);
    return { open: true, role: d.getAttribute('role') || (native ? 'dialog' : null), modal: d.getAttribute('aria-modal') || (native ? 'true' : null),
      named: !!(d.getAttribute('aria-label') || d.getAttribute('aria-labelledby')), count: f.length,
      focusInside: d.contains(document.activeElement) };
  }, sel);
  if (!sem.open) return { open, problems: [`Enter on ${open} opened no visible dialog (${sel})`] };
  if (sem.role !== 'dialog') problems.push(`no role="dialog" (got ${sem.role})`);
  if (sem.modal !== 'true') problems.push('no aria-modal="true"');
  if (!sem.named) problems.push('no accessible name (aria-label / aria-labelledby)');
  if (!sem.focusInside) problems.push('focus did not move into the dialog when it opened');
  for (let i = 0, steps = Math.max(6, sem.count * 2 + 2); i < steps; i++) {
    await page.keyboard.press('Tab');
    const inside = await page.evaluate((sel) => {
      const d = window.__gateDialog(sel); const a = document.activeElement;
      return !!d && (a === document.body || a === document.documentElement || d.contains(a));
    }, sel);
    if (!inside) { problems.push(`focus escaped the dialog after ${i + 1} Tab(s)`); break; }
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const after = await page.evaluate(({ sel, tid }) => ({ still: !!window.__gateDialog(sel), back: document.activeElement === document.getElementById(tid) }), { sel, tid });
  if (after.still) problems.push('Escape did not close it');
  else if (!after.back) problems.push('focus did not return to the trigger after closing');
  return { open, focusables: sem.count, problems };
}

/* ── reduced motion ──────────────────────────────────────────────────────── */
const SNAPSHOT = (THRESHOLD) => {
  const MOTION = /transform|translate|rotate|scale|top|left|right|bottom|width|height|margin|inset|\ball\b/;
  const secs = (v) => Math.max(...String(v).split(',').map((s) => parseFloat(s) * (s.includes('ms') ? 0.001 : 1) || 0));
  /* keyed by what the element is and which occurrence of it, never by DOM path
     or document index: GSAP wraps a pinned section in a .pin-spacer only when
     motion is allowed, and a path through that wrapper made a whole hero read
     as "lost under reduce". The wrapper itself is a motion artefact, not
     content, so it is skipped. */
  const seen = new Map();
  const keyOf = (el, d) => { const n = (seen.get(d) || 0) + 1; seen.set(d, n); return `${d}#${n}`; };
  const describe = (el) => {
    const id = el.id ? '#' + el.id : (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
    return `${el.tagName.toLowerCase()}${id}${t ? ` "${t}"` : ''}`;
  };
  let policy = false;
  const scan = (rules) => { for (const r of rules) { if (r.media && String(r.media.mediaText).includes('prefers-reduced-motion')) policy = true; if (r.cssRules) scan(r.cssRules); if (policy) return; } };
  for (const s of document.styleSheets) { try { scan(s.cssRules); } catch { /* cross-origin sheet */ } if (policy) break; }
  const visible = {}, present = [], moving = [];
  let declares = false;
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    const shown = cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05 && r.width > 0 && r.height > 0;
    if (el.classList.contains('pin-spacer')) continue;
    const d = describe(el), k = keyOf(el, d);
    present.push(k);
    if (shown) visible[k] = d;
    const anim = cs.animationName !== 'none' && secs(cs.animationDuration) > THRESHOLD;
    const tp = String(cs.transitionProperty);
    const trans = secs(cs.transitionDuration) > THRESHOLD && tp !== 'none' && MOTION.test(tp);
    if (anim || trans) declares = true;
    if (shown && (anim || trans)) moving.push(`${describe(el)} — ${anim ? `animation ${cs.animationName}` : `transition ${tp}`}`);
  }
  return {
    policy, declares, visible, present, moving,
    busy: !!document.querySelector('[aria-busy="true"]'),
    lenis: !!window.__lenis || document.documentElement.classList.contains('lenis'),
  };
};

async function settle(page, threshold) {
  let snap = null, prev = null;
  for (let waited = 0; waited <= 4000; waited += 250) {
    await page.waitForTimeout(250);
    snap = await page.evaluate(SNAPSHOT, threshold);
    const keys = Object.keys(snap.visible).join(',');
    if (!snap.busy && keys === prev) break;
    prev = keys;
  }
  return snap;
}

/* ── the gate ────────────────────────────────────────────────────────────── */
export async function audit({ browser, url, viewports, decl = {} }) {
  const cfg = decl.a11y || {};
  const touch = cfg.touchTarget ?? 44;     /* DNA68 */
  const pointer = cfg.pointerTarget ?? 24; /* WCAG 2.2 SC 2.5.8 */
  const threshold = cfg.motionThreshold ?? 0.1;
  const primary = viewports.find((v) => v.label === (decl.primaryViewport || 'desktop')) || viewports[0];
  const out = { targets: {}, keyboard: null, dialogs: [], motion: null, findings: [] };
  const fresh = async (vp, extra = {}) => {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, ...extra });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    return { ctx, page };
  };

  for (const vp of viewports) {
    const min = vp.w < 900 ? touch : pointer;
    const { ctx, page } = await fresh(vp, vp.w < 900 ? { hasTouch: true, isMobile: true } : {});
    const t = await page.evaluate(TARGETS, min);
    out.targets[vp.label] = { min, ...t };
    for (const b of t.bad) out.findings.push({ id: 'target', viewport: vp.label, rule: vp.w < 900 ? 'DNA68' : 'WCAG 2.5.8', detail: `${b} (min ${min}×${min})` });
    await ctx.close();
  }

  {
    const { ctx, page } = await fresh(primary);
    out.keyboard = await keyboard(page);
    for (const p of out.keyboard.problems) out.findings.push({ id: 'keyboard', viewport: primary.label, rule: 'DNA78', detail: p });
    await ctx.close();
  }

  for (const d of cfg.dialogs || []) {
    const { ctx, page } = await fresh(primary);
    const r = await dialog(page, d);
    out.dialogs.push(r);
    for (const p of r.problems) out.findings.push({ id: 'dialog', viewport: primary.label, rule: 'DNA78', detail: `${d.open}: ${p}` });
    await ctx.close();
  }

  {
    const a = await fresh(primary, { reducedMotion: 'no-preference' });
    const normal = await settle(a.page, threshold); await a.ctx.close();
    const b = await fresh(primary, { reducedMotion: 'reduce' });
    const reduced = await settle(b.page, threshold); await b.ctx.close();
    /* lost = rendered in both branches, shown only in one. An element the reduced
       branch never creates (a SplitText word wrapper) is not lost content. */
    const there = new Set(reduced.present);
    const lost = Object.keys(normal.visible).filter((k) => there.has(k) && !(k in reduced.visible)).map((k) => normal.visible[k]);
    out.motion = { policy: normal.policy, declaresMotion: normal.declares, stillMoving: reduced.moving, lost,
      lenis: { normal: normal.lenis, reduced: reduced.lenis } };
    const f = (rule, detail) => out.findings.push({ id: 'motion', viewport: primary.label, rule, detail });
    if (normal.declares && !normal.policy) f('motion I1', 'the page animates and ships no @media (prefers-reduced-motion: reduce)');
    if (reduced.moving.length) f('motion I1', `${reduced.moving.length} element(s) still move under reduce — ${reduced.moving.slice(0, 4).join('; ')}`);
    if (lost.length) f('DNA79', `${lost.length} element(s) visible normally are invisible under reduce — ${lost.slice(0, 4).join('; ')}`);
    if (cfg.lenis !== false) {
      if (!normal.lenis) f('DNA90', 'no Lenis on the page (window.__lenis or html.lenis) — it ships on every project');
      if (reduced.lenis) f('DNA90', 'Lenis is constructed under prefers-reduced-motion: reduce');
    }
  }

  out.verdict = out.findings.length ? 'fail' : 'pass';
  return out;
}
