#!/usr/bin/env node
/* Regression tests for the keyboard / target / reduced-motion gate.
 *
 *   npm run test:a11y
 *
 * Each BAD case is a defect that reads as finished in a screenshot: a div that
 * looks like a button, a close × that is 20px, copy that exists only once an
 * entrance animation has run, Lenis running for a visitor who asked for no
 * motion, a dialog Tab walks straight out of. The gate is required to find
 * each one by driving the page.
 *
 * The CLEAN cases are the other half, and they are taken from false positives
 * the gate actually produced on a real build (Tucson v4, 2026-10-25) before it
 * was fixed: a rail's "Next" button that tabbing itself disables, a GSAP
 * .pin-spacer and SplitText word wrappers that only exist when motion is
 * allowed, and a native <dialog> opened from a trigger that a phone-only dock
 * duplicates. A gate that fires on those teaches everyone to skim it.
 */
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { audit } from '../a11y.mjs';
import { serve } from '../lib/server.mjs';
import { launchChromium } from '../../lib/browser.mjs';

let failures = 0;
const ok = (s) => console.log(`\x1b[32m✓\x1b[0m ${s}`);
const bad = (s) => { console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };

/* a stand-in for Lenis: what the gate reads is the contract, not the library */
const LENIS_OK = `<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){window.__lenis={};document.documentElement.classList.add('lenis')}</script>`;
const LENIS_ALWAYS = `<script>window.__lenis={};document.documentElement.classList.add('lenis')</script>`;
const PAGE = (body, head = '', lenis = LENIS_OK) => `<!doctype html><html><head><meta charset="utf-8">
<style>body{margin:0;font:16px/1.5 system-ui;padding:40px}a,button{display:inline-block;min-width:48px;min-height:48px;margin:8px}</style>${head}
</head><body>${body}${lenis}</body></html>`;

const VP = [{ label: 'desktop', w: 1280, h: 800 }, { label: 'mobile', w: 390, h: 844 }];

const CASES = [
  {
    name: 'BAD — div with role="button" and no tabindex',
    html: PAGE(`<div role="button" onclick="1" style="width:120px;height:48px">Reserve</div><a href="#x">Next</a>`),
    expect: ['keyboard'],
  },
  {
    name: 'BAD — custom toggle exposes aria-pressed, ignores Enter and Space',
    html: PAGE(`<span role="button" tabindex="0" aria-pressed="false" onclick="this.ariaPressed=this.ariaPressed==='true'?'false':'true'" style="display:inline-block;width:120px;height:48px">Save</span>`),
    expect: ['keyboard'],
  },
  {
    name: 'BAD — crowded 20px close buttons',
    html: PAGE(`<div><button style="min-width:0;min-height:0;width:20px;height:20px;margin:0">×</button><button style="min-width:0;min-height:0;width:20px;height:20px;margin:0">‹</button></div>`),
    expect: ['target'],
  },
  {
    name: 'BAD — 40px stacked footer links on a phone (DNA68 is 44)',
    html: PAGE(`<footer><a href="#a" style="display:block;min-height:0;height:40px;margin:0">Sell</a><a href="#b" style="display:block;min-height:0;height:40px;margin:0">Call</a></footer>`),
    expect: ['target'], viewport: 'mobile',
  },
  {
    name: 'BAD — copy revealed only by an entrance animation',
    html: PAGE(`<h1 class="rv">Vintage &amp; specialty</h1>`,
      `<style>.rv{opacity:0;animation:in .6s .2s forwards}@keyframes in{to{opacity:1}}@media (prefers-reduced-motion: reduce){.rv{animation:none}}</style>`),
    expect: ['motion'],
  },
  {
    name: 'BAD — animates and ships no reduced-motion policy',
    html: PAGE(`<div class="spin" style="width:40px;height:40px;background:#000"></div>`,
      `<style>.spin{animation:s 2s linear infinite}@keyframes s{to{transform:rotate(1turn)}}</style>`),
    expect: ['motion'],
  },
  {
    name: 'BAD — Lenis constructed under reduce',
    html: PAGE(`<p>Text</p>`, '', LENIS_ALWAYS),
    expect: ['motion'],
  },
  {
    name: 'BAD — no Lenis at all',
    html: PAGE(`<p>Text</p>`, '', ''),
    expect: ['motion'],
  },
  {
    name: 'BAD — dialog without aria-modal that Tab walks out of',
    html: PAGE(`<button id="open" onclick="d.hidden=false;d.querySelector('input').focus()">Inquire</button>
      <div id="d" role="dialog" aria-label="Inquire" hidden onkeydown="if(event.key==='Escape')this.hidden=true"><input aria-label="Name"><button>Send</button></div>
      <a href="#after">After</a>`),
    dialogs: [{ open: '#open' }],
    expect: ['dialog'],
  },
  {
    name: 'CLEAN — native controls, a working native <dialog>, 48px targets',
    html: PAGE(`<a href="#a">Inventory</a><button onclick="dlg.showModal()" data-open>Inquire</button>
      <dialog id="dlg" aria-labelledby="h"><h2 id="h">Inquire</h2><input aria-label="Name"><button onclick="dlg.close()">Close</button></dialog>`),
    dialogs: [{ open: '[data-open]' }],
    expect: [],
  },
  {
    name: 'CLEAN — rail "Next" that tabbing to the last card disables',
    html: PAGE(`<button id="p" disabled aria-label="Previous cars">‹</button><button id="n" aria-label="Next cars">›</button>
      <div id="rail"><a href="#1">Car 1</a><a href="#2">Car 2</a><a href="#3" onfocus="n.disabled=true;p.disabled=false">Car 3</a></div>`),
    expect: [],
  },
  {
    name: 'CLEAN — wrappers that exist only when motion is allowed',
    html: PAGE(`<section id="s"><h2 id="h">Current inventory</h2></section>
      <script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
        const s=document.getElementById('s'),w=document.createElement('div');w.className='pin-spacer';s.before(w);w.append(s);
        const h=document.getElementById('h');h.innerHTML=h.textContent.split(' ').map(t=>'<span class="w">'+t+'</span>').join(' ');
      }</script>`),
    expect: [],
  },
];

const dir = mkdtempSync(join(tmpdir(), 'a11y-gate-'));
CASES.forEach((c, i) => writeFileSync(join(dir, `c${i}.html`), c.html));
const srv = await serve(dir);
const browser = await launchChromium();

for (const [i, c] of CASES.entries()) {
  const viewports = c.viewport ? VP.filter((v) => v.label === c.viewport) : VP;
  const r = await audit({ browser, url: `${srv.origin}/c${i}.html`, viewports, decl: { primaryViewport: viewports[0].label, a11y: { dialogs: c.dialogs || [] } } });
  const got = [...new Set(r.findings.map((f) => f.id))].sort();
  const want = [...c.expect].sort();
  const pass = want.length ? want.every((w) => got.includes(w)) : got.length === 0;
  pass ? ok(c.name) : bad(`${c.name}\n    expected ${JSON.stringify(want)}, got ${JSON.stringify(got)}\n    ${r.findings.map((f) => f.detail).join('\n    ')}`);
}

await browser.close();
await srv.close();
rmSync(dir, { recursive: true, force: true });
console.log(failures ? `\n${failures} failed` : `\nall ${CASES.length} passed`);
process.exit(failures ? 1 : 0);
