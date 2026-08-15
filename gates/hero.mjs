/* The rendered hero conformance check — a delegated part of Gate 1/2.
 *
 * The failure this exists for: a hero was approved by looking at the SOURCE
 * frame, where the car had air on four sides. What shipped was `object-fit:
 * cover` in a differently-proportioned box, and nobody re-measured the subject
 * in the delivered composition. C22 was quoted in the same file that broke it.
 *
 * So the subject is declared once in source-frame coordinates and this module
 * computes, in closed form, where that box actually lands at every required
 * viewport. `cover` mapping is fully determined by natural size, box size and
 * object-position — there is nothing to estimate.
 *
 * Closed-form arithmetic is only as true as the declared box, so every run also
 * emits ANNOTATED EVIDENCE: the delivered composition with the subject box,
 * media bounds, nav, text-safe rect, real headline and CTA bounds, focal point,
 * clearances and any clipped edge drawn on it — plus the source frame with the
 * declared box on it, so a human can confirm the box really contains the
 * vehicle. A box that is declared wrongly cannot produce a pass.
 *
 * A moving subject cannot be one box: the declaration carries samples across
 * the interval, and THE WORST SAMPLE GOVERNS.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const clamp01 = (n) => Math.max(0, Math.min(1, n));

/* where a source-frame rectangle lands inside a rendered media box */
export function mapSubject({ natural, box, fit, position }) {
  const sx = box.w / natural.w, sy = box.h / natural.h;
  const scale = fit === 'contain' ? Math.min(sx, sy) : fit === 'fill' ? null : Math.max(sx, sy);
  const rw = scale === null ? box.w : natural.w * scale;
  const rh = scale === null ? box.h : natural.h * scale;
  const ox = (box.w - rw) * clamp01(position.x);
  const oy = (box.h - rh) * clamp01(position.y);
  return (f) => ({
    x: box.x + ox + f.x * rw, y: box.y + oy + f.y * rh,
    w: f.w * rw, h: f.h * rh,
  });
}

const overlap = (a, b) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
};

/* variance of the Laplacian over a crop, in the page */
const SHARPNESS = function (sel, rect) {
  const el = document.querySelector(sel);
  if (!el) return null;
  const nw = el.videoWidth || el.naturalWidth, nh = el.videoHeight || el.naturalHeight;
  if (!nw) return null;
  const W = 240, H = Math.max(60, Math.round((rect.h / rect.w) * 240));
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(el, rect.x * nw, rect.y * nh, rect.w * nw, rect.h * nh, 0, 0, W, H);
  const d = g.getImageData(0, 0, W, H).data;
  const lum = new Float64Array(W * H);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) lum[p] = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
  let sum = 0, sum2 = 0, n = 0;
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x;
    const l = 4 * lum[i] - lum[i - 1] - lum[i + 1] - lum[i - W] - lum[i + W];
    sum += l; sum2 += l * l; n++;
  }
  const mean = sum / n;
  return +(sum2 / n - mean * mean).toFixed(2);
};

const SEEK = function (sel, t) {
  return new Promise((res) => {
    const v = document.querySelector(sel);
    if (!v || !v.duration) return res(false);
    const done = () => { v.removeEventListener('seeked', done); res(true); };
    v.addEventListener('seeked', done);
    v.currentTime = Math.min(t, Math.max(0, v.duration - 0.05));
  });
};

const ANNOTATE = function (spec) {
  document.getElementById('__hero_probe')?.remove();
  const wrap = document.createElement('div');
  wrap.id = '__hero_probe';
  wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none;font:11px/1.2 ui-monospace,monospace';
  const box = (r, colour, label, dash) => {
    const d = document.createElement('div');
    d.style.cssText = `position:fixed;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;` +
      `outline:2px ${dash ? 'dashed' : 'solid'} ${colour};outline-offset:-1px`;
    if (label) {
      const t = document.createElement('span');
      t.textContent = label;
      t.style.cssText = `position:absolute;left:0;top:-15px;background:${colour};color:#000;padding:1px 4px;white-space:nowrap`;
      d.appendChild(t);
    }
    wrap.appendChild(d);
  };
  const dot = (x, y, colour, label) => {
    const d = document.createElement('div');
    d.style.cssText = `position:fixed;left:${x - 6}px;top:${y - 6}px;width:12px;height:12px;border-radius:50%;background:${colour};box-shadow:0 0 0 2px #000`;
    wrap.appendChild(d);
    if (label) { const t = document.createElement('span');
      t.textContent = label; t.style.cssText = `position:fixed;left:${x + 10}px;top:${y - 6}px;background:${colour};color:#000;padding:1px 4px`;
      wrap.appendChild(t); }
  };
  box(spec.media, '#39FF14', 'media bounds');
  box(spec.subject, '#FF3B30', `subject (worst sample t=${spec.worstT})`);
  if (spec.nav) box(spec.nav, '#00E5FF', 'nav', true);
  if (spec.textSafe) box(spec.textSafe, '#FFD400', 'declared text-safe', true);
  if (spec.copy) box(spec.copy, '#FF9F0A', 'actual headline / CTA', true);
  dot(spec.focal.x, spec.focal.y, '#FF3B30', 'focal');
  for (const c of spec.clearances) {
    const t = document.createElement('span');
    t.textContent = `${c.side} ${Math.round(c.px)}px (${(c.frac * 100).toFixed(1)}%)`;
    t.style.cssText = `position:fixed;left:${c.lx}px;top:${c.ly}px;background:#fff;color:#000;padding:1px 4px`;
    wrap.appendChild(t);
  }
  for (const e of spec.clipped) {
    const t = document.createElement('span');
    t.textContent = `CLIPPED ${e}`;
    t.style.cssText = 'position:fixed;background:#FF3B30;color:#fff;padding:2px 6px;font-weight:700;' +
      (e === 'left' ? 'left:4px;top:50%' : e === 'right' ? 'right:4px;top:50%' : e === 'top' ? 'left:50%;top:4px' : 'left:50%;bottom:4px');
    wrap.appendChild(t);
  }
  const legend = document.createElement('div');
  legend.textContent = spec.caption;
  legend.style.cssText = 'position:fixed;left:0;right:0;bottom:0;background:#000;color:#fff;padding:6px 10px;font:11px/1.4 ui-monospace,monospace;white-space:pre';
  wrap.appendChild(legend);
  document.body.appendChild(wrap);
};

export async function audit({ page, spec, outDir, label }) {
  mkdirSync(outDir, { recursive: true });
  const geo = await page.evaluate((s) => {
    const q = (x) => (x ? document.querySelector(x) : null);
    const rect = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
    const hero = q(s.selector), media = q(s.mediaSelector);
    if (!hero || !media) return null;
    const cs = getComputedStyle(media);
    const pos = (cs.objectPosition || '50% 50%').split(/\s+/);
    const pct = (v, size) => v.endsWith('%') ? parseFloat(v) / 100 : (parseFloat(v) || 0) / Math.max(1, size);
    const mr = rect(media);
    const nav = q(s.navSelector), copy = q(s.copySelector);
    return {
      hero: rect(hero), media: mr,
      fit: cs.objectFit || 'fill',
      position: { x: pct(pos[0] ?? '50%', mr.w), y: pct(pos[1] ?? pos[0] ?? '50%', mr.h) },
      natural: { w: media.videoWidth || media.naturalWidth || mr.w, h: media.videoHeight || media.naturalHeight || mr.h },
      nav: nav ? rect(nav) : null, copy: copy ? rect(copy) : null,
      tag: media.tagName.toLowerCase(),
    };
  }, spec);
  if (!geo) return { label, verdict: 'fail', problems: ['hero or media element not found'] };

  const natural = spec.natural || geo.natural;
  const map = mapSubject({ natural, box: geo.media, fit: geo.fit, position: geo.position });

  const textSafe = spec.textSafe ? {
    x: geo.hero.x + spec.textSafe.x * geo.hero.w, y: geo.hero.y + spec.textSafe.y * geo.hero.h,
    w: spec.textSafe.w * geo.hero.w, h: spec.textSafe.h * geo.hero.h,
  } : null;

  const samples = (spec.samples || []).map((s) => {
    const r = map(s.box);
    const clipped = [];
    if (r.x < geo.hero.x - 0.5) clipped.push('left');
    if (r.y < geo.hero.y - 0.5) clipped.push('top');
    if (r.x + r.w > geo.hero.x + geo.hero.w + 0.5) clipped.push('right');
    if (r.y + r.h > geo.hero.y + geo.hero.h + 0.5) clipped.push('bottom');
    const clear = {
      left: r.x - geo.hero.x, top: r.y - geo.hero.y,
      right: geo.hero.x + geo.hero.w - (r.x + r.w), bottom: geo.hero.y + geo.hero.h - (r.y + r.h),
    };
    const subjArea = r.w * r.h;
    return {
      t: s.t, rect: r, clipped, clearance: clear,
      subjectShare: +(subjArea / (geo.hero.w * geo.hero.h)).toFixed(3),
      navOverlap: geo.nav ? +(overlap(r, geo.nav) / subjArea).toFixed(3) : 0,
      textSafeOverlap: textSafe ? +(overlap(r, textSafe) / subjArea).toFixed(3) : 0,
      copyOverlap: geo.copy ? +(overlap(r, geo.copy) / subjArea).toFixed(3) : 0,
    };
  });

  const score = (s) => s.clipped.length * 100 + s.navOverlap * 10 + s.copyOverlap * 10
    - Math.min(s.clearance.left, s.clearance.right, s.clearance.top, s.clearance.bottom) / 1000;
  const worst = samples.slice().sort((a, b) => score(b) - score(a))[0];

  /* sharpness: the interval measured against itself and against the page's own
     sharpest photographic subject */
  let sharp = null;
  if (spec.interval && geo.tag === 'video') {
    const pts = spec.sharpnessSamples || [0, 0.25, 0.5, 0.75, 1];
    const vals = [];
    for (const p of pts) {
      const t = spec.interval.from + p * (spec.interval.to - spec.interval.from);
      await page.evaluate(SEEK, spec.mediaSelector, t);
      await page.waitForTimeout(120);
      const v = await page.evaluate(SHARPNESS, spec.mediaSelector, worst ? {
        x: (worst.rect.x - geo.media.x) / geo.media.w, y: (worst.rect.y - geo.media.y) / geo.media.h,
        w: worst.rect.w / geo.media.w, h: worst.rect.h / geo.media.h,
      } : { x: 0.3, y: 0.3, w: 0.4, h: 0.4 });
      vals.push({ t: +t.toFixed(2), laplacianVariance: v });
    }
    const nums = vals.map((v) => v.laplacianVariance).filter((n) => n != null).sort((a, b) => a - b);
    const median = nums.length ? nums[Math.floor(nums.length / 2)] : null;
    let reference = null;
    if (spec.referenceSelector) {
      reference = await page.evaluate(SHARPNESS, spec.referenceSelector, spec.referenceRect || { x: 0.35, y: 0.2, w: 0.3, h: 0.4 });
    }
    sharp = {
      samples: vals, median, best: nums.length ? nums[nums.length - 1] : null, reference,
      /* a hero subject must be at least half as sharp as the sharpest
         photographic subject the same page is willing to show */
      ratioToReference: reference ? +(median / reference).toFixed(3) : null,
      pass: reference ? median / reference >= 0.5 : null,
    };
  }

  const problems = [];
  if (worst?.clipped.length) problems.push(`subject clipped at ${worst.clipped.join(', ')} (worst sample t=${worst.t})`);
  if (worst && worst.navOverlap > 0.02) problems.push(`subject overlaps navigation by ${(worst.navOverlap * 100).toFixed(1)}%`);
  if (worst && worst.copyOverlap > 0.06) problems.push(`subject overlaps headline/CTA by ${(worst.copyOverlap * 100).toFixed(1)}%`);
  if (textSafe && worst && worst.textSafeOverlap > 0.02) problems.push(`subject enters the declared text-safe region by ${(worst.textSafeOverlap * 100).toFixed(1)}%`);
  if (geo.fit === 'cover' && !spec.coverProof) problems.push('object-fit: cover declared without coverProof — C22 requires rendered proof');
  if (sharp && sharp.pass === false) problems.push(`hero subject is soft: median Laplacian variance ${sharp.median} vs reference ${sharp.reference} (${(sharp.ratioToReference * 100).toFixed(0)}% of the page's sharpest subject)`);
  if (!samples.length) problems.push('no subject samples declared — a moving subject needs per-sample boxes or a union box');

  /* annotated evidence, at this viewport */
  if (worst) {
    const clear = worst.clearance;
    const cl = [
      { side: 'left', px: clear.left, frac: clear.left / geo.hero.w, lx: Math.max(2, geo.hero.x + 4), ly: worst.rect.y + worst.rect.h / 2 },
      { side: 'right', px: clear.right, frac: clear.right / geo.hero.w, lx: Math.min(geo.hero.x + geo.hero.w - 120, worst.rect.x + worst.rect.w + 6), ly: worst.rect.y + worst.rect.h / 2 },
      { side: 'top', px: clear.top, frac: clear.top / geo.hero.h, lx: worst.rect.x + worst.rect.w / 2, ly: Math.max(2, geo.hero.y + 4) },
      { side: 'bottom', px: clear.bottom, frac: clear.bottom / geo.hero.h, lx: worst.rect.x + worst.rect.w / 2, ly: Math.min(geo.hero.y + geo.hero.h - 16, worst.rect.y + worst.rect.h + 6) },
    ];
    await page.evaluate(ANNOTATE, {
      media: geo.media, subject: worst.rect, nav: geo.nav, textSafe, copy: geo.copy,
      focal: { x: worst.rect.x + worst.rect.w * (spec.focal?.x ?? 0.5), y: worst.rect.y + worst.rect.h * (spec.focal?.y ?? 0.5) },
      clearances: cl, clipped: worst.clipped, worstT: worst.t,
      caption: `${label} · fit:${geo.fit} pos:${(geo.position.x * 100).toFixed(0)}%/${(geo.position.y * 100).toFixed(0)}% · ` +
        `natural ${natural.w}×${natural.h} → media ${Math.round(geo.media.w)}×${Math.round(geo.media.h)} · ` +
        `subject ${(worst.subjectShare * 100).toFixed(1)}% of hero · ` +
        (sharp ? `sharpness ${sharp.median} vs ref ${sharp.reference}` : 'sharpness n/a'),
    });
    const shot = join(outDir, `hero-${label}.png`);
    await page.screenshot({ path: shot, clip: { x: 0, y: 0, width: Math.round(geo.hero.w), height: Math.min(Math.round(geo.hero.h), 2000) } });
    await page.evaluate(() => document.getElementById('__hero_probe')?.remove());
    var evidence = shot;
  }

  return {
    label, verdict: problems.length ? 'fail' : 'pass', problems,
    geometry: { hero: geo.hero, media: geo.media, fit: geo.fit, position: geo.position, natural },
    samples, worst, sharpness: sharp, evidence,
  };
}

/* the source frame with the declared box drawn on it, so a human can confirm
   the box actually contains the vehicle */
export async function sourceEvidence({ page, spec, outDir }) {
  mkdirSync(outDir, { recursive: true });
  const data = await page.evaluate(async ({ sel, samples, interval }) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const seek = (t) => new Promise((r) => {
      if (!el.duration) return r();
      const d = () => { el.removeEventListener('seeked', d); r(); };
      el.addEventListener('seeked', d); el.currentTime = t;
    });
    const nw = el.videoWidth || el.naturalWidth, nh = el.videoHeight || el.naturalHeight;
    const cols = samples.length;
    const c = document.createElement('canvas');
    c.width = 520 * cols; c.height = Math.round(520 * (nh / nw)) + 26;
    const g = c.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < cols; i++) {
      const s = samples[i];
      if (interval) await seek(interval.from + s.t * (interval.to - interval.from));
      const x0 = i * 520, w = 520, h = Math.round(520 * (nh / nw));
      g.drawImage(el, 0, 0, nw, nh, x0, 26, w, h);
      g.strokeStyle = '#FF3B30'; g.lineWidth = 3;
      g.strokeRect(x0 + s.box.x * w, 26 + s.box.y * h, s.box.w * w, s.box.h * h);
      g.fillStyle = '#fff'; g.font = '14px ui-monospace,monospace';
      g.fillText(`declared subjectBox · sample t=${s.t}`, x0 + 8, 18);
    }
    return c.toDataURL('image/png');
  }, { sel: spec.mediaSelector, samples: spec.samples || [], interval: spec.interval });
  if (!data) return null;
  const out = join(outDir, 'hero-source-declared.png');
  writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
  return out;
}
