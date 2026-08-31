/* The chain seal, and why a gate cannot be claimed.
 *
 * Three mechanisms, each answering one way the chain was actually broken:
 *
 *   PRESENCE  a gate with no artefact is NOT RUN. Saying it passed is a
 *             workflow failure, recorded as one, and distinct from a design
 *             failure.
 *   STALENESS every artefact stores the sourceSeal it was computed against. If
 *             any source file changed afterwards, that gate reverts to not-run.
 *             This is what stops a page being fixed after its gate passed.
 *   ORDER     the seal is computed over the artefacts in the required order,
 *             with their finish times. Out-of-order timestamps fail.
 *
 * Gate 5 is never sealed: it is Alex's verdict and the system may not record it.
 */
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/* the six artefacts that must exist, in the order they must have been produced */
export const CHAIN = [
  { file: 'gate1.json', gate: 'Gate 1 · Measurable Conformance' },
  { file: 'gate2.json', gate: 'Gate 2 · Structural and Authorship Conformance' },
  { file: 'authorship.json', gate: 'Gate 2 · delegated — authorship preservation' },
  { file: 'composition.json', gate: 'Gate 1 · delegated — composed masses' },
  { file: 'hero.json', gate: 'Gate 1/2 · delegated — rendered hero conformance' },
  { file: 'product.json', gate: 'Gate 3 · Product Usefulness' },
  { file: 'content-ledger.json', gate: 'Gate 4 · Content Provenance' },
];

const SOURCE_EXT = /\.(html?|css|js|mjs|json|svg|webp|jpe?g|png|avif|mp4|webm|woff2?)$/i;
const SKIP = /(^|[\\/])(\.gates|\.git|node_modules|shots)([\\/]|$)/;

export function sha(buf) { return createHash('sha256').update(buf).digest('hex'); }

export function walk(dir, base = dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.test(relative(base, p))) continue;
    const s = statSync(p);
    if (s.isDirectory()) walk(p, base, out);
    else if (SOURCE_EXT.test(name)) out.push(p);
  }
  return out;
}

/* one hash over every source file the build is made of */
export function sourceSeal(root) {
  const files = walk(root).sort();
  const h = createHash('sha256');
  for (const f of files) h.update(relative(root, f).split(sep).join('/')).update(sha(readFileSync(f)));
  return { seal: h.digest('hex'), fileCount: files.length };
}

export function readArtifacts(gatesDir) {
  return CHAIN.map((c) => {
    const p = join(gatesDir, c.file);
    if (!existsSync(p)) return { ...c, present: false };
    try {
      const raw = readFileSync(p);
      return { ...c, present: true, path: p, hash: sha(raw), data: JSON.parse(raw) };
    } catch (e) {
      return { ...c, present: true, path: p, unreadable: String(e.message) };
    }
  });
}

/* the whole verdict on whether a human may be shown anything */
export function validateChain(root, gatesDir) {
  const src = sourceSeal(root);
  const artifacts = readArtifacts(gatesDir);
  const problems = [];

  for (const a of artifacts) {
    if (!a.present) { problems.push(`${a.gate}: NOT RUN — ${a.file} is missing`); continue; }
    if (a.unreadable) { problems.push(`${a.gate}: ${a.file} is unreadable — ${a.unreadable}`); continue; }
    if (a.data.sourceSeal !== src.seal) {
      problems.push(`${a.gate}: STALE — ${a.file} was computed against a different build; it reverts to not-run`);
    }
    if (a.data.verdict !== 'pass') {
      problems.push(`${a.gate}: verdict is "${a.data.verdict ?? 'missing'}"`);
    }
    if (a.data.verdict === 'pass' && a.data.humanConfirmed === false) {
      problems.push(`${a.gate}: passes on machine checks only — humanConfirmed is false`);
    }
  }

  const times = artifacts.filter((a) => a.present && a.data?.finishedAt).map((a) => Date.parse(a.data.finishedAt));
  if (times.length === artifacts.length) {
    for (let i = 1; i < times.length; i++) {
      if (!(times[i] >= times[i - 1])) problems.push(`ORDER: ${artifacts[i].file} finished before ${artifacts[i - 1].file}`);
    }
  }

  const h = createHash('sha256').update(src.seal);
  for (const a of artifacts) h.update(a.hash || 'MISSING');
  return { ok: problems.length === 0, seal: h.digest('hex'), sourceSeal: src.seal, fileCount: src.fileCount, artifacts, problems };
}
