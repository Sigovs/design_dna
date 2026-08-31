/**
 * Gate 1 · delegated — the vault was read.
 *
 * `TASTE.md` §6 says querying the vault is **not optional** — it is the step that
 * makes this DNA evidence-based rather than a set of assertions. Nothing checked
 * it, and on 2026-08-31 a hero was built without opening the vault once. It passed
 * every measurable invariant and was dull. The vault held three rating-2-and-above
 * entries saying, in Alex's own recorded words, exactly what that page got wrong.
 *
 * The invariants are a floor. They stop bad work. The vault is the only place this
 * system keeps Alex's specific taste as evidence, and skipping it leaves a rulebook
 * that prevents failure and cannot produce interest.
 *
 * WHY THIS IS NOT A CHECKBOX
 *
 * `gates/README.md`'s own warning: a gate can be CLAIMED rather than run. A
 * declaration that is boring to fill gets filled carelessly, and then the gate
 * passes rubbish with a clean conscience — worse than no gate, because it looks
 * like a check.
 *
 * So this validates the SHAPE OF THE THINKING, the same way the Critique Panel's
 * disposition table does:
 *
 *   · every cited id must resolve against sites.json — an invented reference fails
 *   · every citation carries a reason of real length, because "good hero" records
 *     nothing and cites nothing
 *   · `taken` and `rejected` are both required to be considered, and finding
 *     nothing applicable is a legal answer that has to be argued rather than left
 *     blank
 *
 * Faking this costs more than doing it, which is the only anti-checkbox mechanism
 * that has ever worked.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/* Short enough to be a label, long enough that a reason has to be a sentence. */
const MIN_REASON = 40;

export function audit(vaultDir, decl) {
  const out = {
    gate: 'Gate 1 · delegated — the vault was read',
    queriedTags: [], considered: null, taken: [], rejected: [],
    nothingApplied: null,
    verdict: 'fail', blockers: [], finishedAt: null,
  };

  const read = decl?.vaultRead;
  if (!read) {
    out.blockers.push(
      'vaultRead is not declared. TASTE.md §6: querying the vault is not optional — '
      + 'it is what makes this evidence-based rather than asserted. An absent declaration '
      + 'is NOT RUN, not "nothing applied".');
    return out;
  }

  const sitesPath = join(vaultDir, 'sites.json');
  if (!existsSync(sitesPath)) {
    out.blockers.push(`sites.json not found at ${sitesPath} — the vault cannot be cited against nothing`);
    return out;
  }
  let sites = [];
  try { sites = JSON.parse(readFileSync(sitesPath, 'utf8')); }
  catch (e) { out.blockers.push(`sites.json unreadable: ${e.message}`); return out; }
  const known = new Map(sites.map((s) => [s.id, s]));

  out.queriedTags = read.queriedTags || [];
  out.considered = Number.isFinite(read.considered) ? read.considered : null;
  out.nothingApplied = read.nothingApplied ?? null;

  if (!out.queriedTags.length) {
    out.blockers.push('queriedTags is empty — a query that filtered on nothing looked at everything, which is the same as not looking');
  }
  if (out.considered === null) {
    out.blockers.push('considered is not recorded — how many entries the filter returned is the evidence that a filter ran');
  }

  /* Citations, both directions. A reference that does not resolve is worse than a
     missing one: it reads as evidence and is not. */
  const check = (rows, kind, field) => rows.map((r) => {
    const problems = [];
    if (!r.id) problems.push('no id');
    else if (!known.has(r.id)) problems.push(`id "${r.id}" is not in sites.json`);
    const reason = String(r[field] ?? '').trim();
    if (reason.length < MIN_REASON) {
      problems.push(`${field} is ${reason.length} chars — a citation without a stated mechanism cites nothing`);
    }
    const entry = known.get(r.id);
    if (entry && (entry.rating ?? 0) < 2 && kind === 'taken') {
      problems.push(`rating ${entry.rating ?? 0} — a rating-1 record is counter-evidence and never carries a decision`);
    }
    for (const p of problems) out.blockers.push(`${kind} ${r.id || '(unnamed)'}: ${p}`);
    return { ...r, rating: entry?.rating ?? null, resolved: !!entry, problems };
  });

  out.taken = check(read.taken || [], 'taken', 'what');
  out.rejected = check(read.rejected || [], 'rejected', 'why');

  if (!out.taken.length) {
    /* Legal, and it has to be argued. The vault holding nothing for a brief is a
       real finding; leaving the field blank is not the same statement. */
    const arg = String(out.nothingApplied ?? '').trim();
    if (arg.length < MIN_REASON) {
      out.blockers.push(
        'taken is empty and nothingApplied does not argue it. Finding nothing applicable is a '
        + 'legitimate answer — it is not a blank one, and it names what was looked for.');
    }
  }
  if (!out.rejected.length && out.taken.length) {
    out.blockers.push(
      'rejected is empty. A read that accepted everything it saw did not filter, and the '
      + 'rejected half is where the reasoning is: what was close and why it was not used.');
  }

  out.verdict = out.blockers.length === 0 ? 'pass' : 'fail';
  return out;
}
