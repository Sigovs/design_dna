/* Gate 4 — content provenance.
 *
 * The failure this exists for: fabricated prices and unsupported commercial
 * promises shipped because nothing ever compared a claim to a source. Not one
 * of them was invalid *in the ledger* — there was no ledger.
 *
 * So validity is not the mechanism. COVERAGE is: every claim-shaped string in
 * the rendered page must map to a ledger entry. A claim you forgot to enter is
 * the same failure as a claim you entered falsely.
 */

/* claim classes, each one a thing a business can be held to */
export const CLASSES = [
  ['currency', /\$\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:million|billion|[MBK])\b)?/g],
  ['grouped-number', /\b\d{1,3}(?:,\d{3})+\+?\b/g],
  ['bare-count', /\b\d{3,}\+?\b/g],
  ['year', /\b(?:19|20)\d{2}\b/g],
  ['duration', /\bwithin\s+\w+\s+(?:business\s+)?days?\b/gi],
  ['same-day', /\bsame[-\s]day\b/gi],
  ['no-fee', /\bno\s+(?:listing\s+)?fees?\b/gi],
  ['no-commission', /\bno\s+commissions?\b/gi],
  ['zero-risk', /\bzero[-\s]risk\b/gi],
  ['guarantee', /\bguarantee(?:d|s)?\b/gi],
  ['warranty-benefit', /\b(?:factory|lifetime|unlimited|included)\s+warranty\b/gi],
  ['service-coverage', /\bservice that goes with (?:them|it)\b/gi],
  ['delivery', /\b(?:nationwide|anywhere in the country|worldwide)\b/gi],
  ['superlative', /\b(?:leading|largest|the best|number one|#1|only\s+\w+\s+dealer)\b/gi],
];

/* a source that is not a source */
export const BANNED_SOURCE = /(^|[\\/])index\d*\.html$|[\\/]fixtures[\\/]|-READ\.md$|DESIGN-READ|CONCEPT-\d|design[-_ ]read/i;
export const BANNED_TYPE = new Set(['previous-concept-markup', 'mockup', 'ai-generated', 'design-read', 'agent-output']);

export const STATUS = ['verified', 'dated-requires-reconciliation', 'provenance-pending', 'unsupported', 'fabricated'];
const BLOCKING = new Set(['unsupported', 'fabricated']);

export const HARVEST = function (classes) {
  const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (skip.has(n.parentElement?.tagName) || !n.nodeValue.trim())
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const path = (el) => {
    const parts = [];
    for (let e = el; e && e.nodeType === 1 && parts.length < 6; e = e.parentElement) {
      let p = e.tagName.toLowerCase();
      if (e.id) { parts.unshift(p + '#' + e.id); break; }
      if (typeof e.className === 'string' && e.className.trim()) p += '.' + e.className.trim().split(/\s+/)[0];
      parts.unshift(p);
    }
    return parts.join(' > ');
  };
  const hits = [];
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue.replace(/\s+/g, ' ').trim();
    const el = node.parentElement;
    if (!el || !el.getClientRects().length) continue;
    for (const [name, src] of classes) {
      const re = new RegExp(src.source, src.flags);
      let m;
      while ((m = re.exec(text))) {
        hits.push({ class: name, text: m[0], context: text.slice(0, 120), where: path(el) });
        if (!re.global) break;
      }
    }
  }
  return hits;
};

export async function harvest(page) {
  const classes = CLASSES.map(([n, r]) => [n, { source: r.source, flags: r.flags }]);
  return page.evaluate(HARVEST, classes);
}

/* does any ledger entry account for this hit? */
function covers(entry, hit) {
  if (typeof entry.claim === 'string' && entry.claim.replace(/\s+/g, ' ').includes(hit.text)) return true;
  const at = [].concat(entry.appearsAt || []);
  return at.some((sel) => {
    const key = String(sel).split(/[\s>]+/).pop().replace(/^[.#]/, '');
    return key && hit.where.includes(key);
  });
}

export function validate({ hits, ledger, build = {} }) {
  const problems = [];
  const entries = Array.isArray(ledger) ? ledger : (ledger && ledger.claims) || null;

  if (!entries) {
    return {
      verdict: 'fail',
      reason: 'no content ledger exists',
      uncovered: hits,
      problems: [`NO LEDGER — ${hits.length} claim-shaped strings are published with no recorded source`],
      counts: { hits: hits.length, entries: 0, uncovered: hits.length },
    };
  }

  for (const e of entries) {
    if (!STATUS.includes(e.status)) problems.push(`${e.id}: status "${e.status}" is not one of ${STATUS.join(' | ')}`);
    if (BLOCKING.has(e.status)) problems.push(`${e.id}: ${e.status.toUpperCase()} — "${e.claim}"`);
    if (BANNED_TYPE.has(e.sourceType) || BANNED_SOURCE.test(String(e.source || ''))) {
      problems.push(`${e.id}: BANNED SOURCE — "${e.source}" is a prior concept, mockup or agent output, not evidence`);
    }
    if (e.status === 'provenance-pending' && !(build.private && e.safeForPrivate)) {
      problems.push(`${e.id}: provenance pending and not cleared for this build`);
    }
    if (e.status === 'dated-requires-reconciliation' && !e.captureDate) {
      problems.push(`${e.id}: dated status with no captureDate`);
    }
  }

  const uncovered = hits.filter((h) => !entries.some((e) => covers(e, h)));
  for (const h of uncovered) problems.push(`UNCOVERED ${h.class}: "${h.text}" at ${h.where}`);

  /* a dated figure must be visibly dated in the render */
  const rendered = hits.map((h) => h.context).join(' ');
  for (const e of entries) {
    if (e.status !== 'dated-requires-reconciliation' || !e.captureDate) continue;
    const [y, m, d] = String(e.captureDate).split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const human = m ? `${Number(d)} ${months[Number(m) - 1]} ${y}` : y;
    if (!rendered.includes(y) || !(rendered.includes(e.captureDate) || rendered.includes(human))) {
      problems.push(`${e.id}: dated figure is not visibly dated in the render (expected "${human}")`);
    }
  }

  return {
    verdict: problems.length ? 'fail' : 'pass',
    problems,
    uncovered,
    counts: { hits: hits.length, entries: entries.length, uncovered: uncovered.length },
  };
}
