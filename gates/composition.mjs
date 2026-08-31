/**
 * Gate 1 · delegated — composed masses.
 *
 * The gate that was missing. Gate 1 measures values that can be wrong — contrast,
 * the type floor, the spacing base — and a hero passed all of it while the subject
 * sat dead centre at 49% of the frame with a third of the screen empty beside it
 * and every word crammed into the left fifth. Nothing there was a wrong value. It
 * was a wrong composition, and a CSS comment calling it a counterweight did not
 * make it one.
 *
 * WHAT IT MEASURES, AND WHAT IT REFUSES TO
 *
 * It reports where the masses are: extent, optical centre, the gutter or overlap
 * between the two principal ones, and dead air at an edge. It does not judge
 * whether a composition is good — that is the Critique Panel's job and a human's.
 * It closes one specific hole: a dominant left unplaced, which is measurable and
 * was going unmeasured.
 *
 * A 3D SUBJECT DECLARES ITSELF
 *
 * Reading a WebGL canvas needs `preserveDrawingBuffer`, which costs real frames
 * for a diagnostic. So a scene publishes its subject's projected box as
 * `window.__subject` and this checks the declaration. A stage that publishes
 * nothing is reported as UNMEASURED rather than passed — same contract as an
 * artefact that is absent.
 *
 * DECLARED BREAKS PASS, SILENT ONES DO NOT
 *
 * `data-audit="composition-ok"` excludes an element and lists it. A break that was
 * asked for is not a defect; a break nobody recorded is the thing this catches.
 */

/* A mass is a block that carries something. Wrappers are not masses — they are the
   boxes masses sit in — so an element counts only if it holds text of its own or is
   the declared stage. */
const COLLECT = `(() => {
  const vw = innerWidth, vh = innerHeight;
  const out = []; const seen = new Set();
  for (const el of document.querySelectorAll('main > section, main > section *, header, footer, body > section, body > section *')) {
    if (el.closest('[data-audit="composition-ok"]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.height < 12) continue;
    if (r.bottom < 0 || r.top > vh) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    const text = Array.from(el.childNodes).filter(n => n.nodeType === 3)
      .map(n => n.textContent.trim()).join(' ').trim();
    const isStage = el.id === 'stage' || el.dataset.mass === 'stage';
    if (!text && !isStage) continue;
    const key = Math.round(r.left) + ':' + Math.round(r.top) + ':' + Math.round(r.width);
    if (seen.has(key)) continue; seen.add(key);
    out.push({
      tag: (el.className && String(el.className).split(' ')[0]) || el.tagName.toLowerCase(),
      left: r.left, right: r.right, top: r.top, bottom: r.bottom,
      area: r.width * r.height, isStage, sample: (text || '').slice(0, 32),
    });
  }
  return {
    vw, vh, out,
    subject: window.__subject || null,
    declared: [...document.querySelectorAll('[data-audit="composition-ok"]')]
      .map(e => ({
        el: (e.className && String(e.className).split(' ')[0]) || e.tagName.toLowerCase(),
        reason: e.getAttribute('data-audit-reason') || null,
      })),
  };
})()`;

/* A margin is a frame; a fifth of the screen holding nothing is a stranded void. */
const VOID = 0.20;
/* The failure this exists for: a dominant on the centre line beside an empty edge. */
const CENTRE_BAND = [0.42, 0.58];
const VOID_WITH_CENTRED = 0.12;

export async function measure(page) {
  const m = await page.evaluate(COLLECT);
  const { vw, vh, out, subject, declared } = m;

  const hasSubject = !!(subject && subject.right > subject.left);
  const masses = out
    .filter((x) => x.top < vh * 0.92 && !(hasSubject && x.isStage))
    .map((x) => ({ ...x }));
  if (hasSubject) {
    masses.push({
      tag: subject.label || 'scene subject', isSubject: true,
      left: subject.left, right: subject.right, top: subject.top, bottom: subject.bottom,
      area: (subject.right - subject.left) * (subject.bottom - subject.top), sample: '',
    });
  }

  const findings = [];
  const stageUnmeasured = !hasSubject && out.some((x) => x.isStage);
  if (stageUnmeasured) {
    findings.push({
      id: 'subject-undeclared',
      detail: 'a stage is present and published no window.__subject, so the object in it '
        + 'was not measured. UNMEASURED is not a pass.',
    });
  }

  if (!masses.length) {
    return { viewport: { vw, vh }, masses: [], principal: [], findings, declared, unmeasured: stageUnmeasured };
  }

  const principal = [...masses].sort((a, b) => b.area - a.area).slice(0, 2)
    .sort((a, b) => a.left - b.left);
  const leftEdge = Math.min(...masses.map((x) => x.left));
  const rightEdge = Math.max(...masses.map((x) => x.right));
  const voidL = Math.max(0, leftEdge) / vw;
  const voidR = Math.max(0, vw - rightEdge) / vw;

  if (voidR > VOID) findings.push({ id: 'dead-air-right', detail: `${Math.round(voidR * 100)}% of the frame at the right edge, and no mass reaches into it` });
  if (voidL > VOID) findings.push({ id: 'dead-air-left', detail: `${Math.round(voidL * 100)}% of the frame at the left edge, and no mass reaches into it` });

  let gutter = null;
  if (principal.length === 2) {
    gutter = (principal[1].left - principal[0].right) / vw;
    const dom = principal.find((x) => x.isSubject) || principal[1];
    const dc = ((dom.left + dom.right) / 2) / vw;
    if (dc > CENTRE_BAND[0] && dc < CENTRE_BAND[1] && Math.max(voidL, voidR) > VOID_WITH_CENTRED) {
      findings.push({
        id: 'dominant-unplaced',
        detail: `the dominant's optical centre sits at ${Math.round(dc * 100)}% — on the centre line — `
          + `while ${Math.round(Math.max(voidL, voidR) * 100)}% of the frame is empty at an edge. `
          + `Two masses sharing a frame separate; one centred mass beside a void is a subject `
          + `that was never placed (C5).`,
      });
    }
  }

  return {
    viewport: { vw, vh },
    masses: masses.map((x) => ({
      tag: x.tag, isSubject: !!x.isSubject,
      extent: [+(x.left / vw).toFixed(3), +(x.right / vw).toFixed(3)],
      centre: +(((x.left + x.right) / 2) / vw).toFixed(3),
      sample: x.sample,
    })),
    principal: principal.map((x) => x.tag),
    gutter: gutter === null ? null : +gutter.toFixed(3),
    deadAir: { left: +voidL.toFixed(3), right: +voidR.toFixed(3) },
    findings,
    declared,
    unmeasured: stageUnmeasured,
  };
}
