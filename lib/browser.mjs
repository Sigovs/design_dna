/**
 * One browser launcher for the whole repo.
 *
 * Playwright dropped macOS 13 support: on mac13-arm64 `playwright install
 * chromium` refuses outright — "does not support chromium on mac13-arm64" — and
 * the cache stays empty. Every launch then dies with an error that reads like
 * broken code rather than a missing binary, and `npm run check` fails at the
 * gate tests for a reason that has nothing to do with the gates.
 *
 * The fallback is a channel, not another download: Google Chrome is already
 * installed. Preferring the bundled browser keeps CI and every other machine on
 * the pinned, reproducible binary; pinning the dependency down instead would
 * hold the whole repo back for one operating system.
 *
 * This started as a local helper inside vault/capture.mjs, where the problem was
 * hit first. It is here because four other call sites had the same failure and
 * copying the fix into each one is how a repo ends up with five slightly
 * different versions of the same workaround.
 */
import { chromium } from 'playwright';

const UNAVAILABLE = /Executable doesn't exist|does not support|please run the following/i;

let warned = false;

export async function launchChromium(opts = {}) {
  try {
    return await chromium.launch(opts);
  } catch (e) {
    if (!UNAVAILABLE.test(e.message)) throw e;
    if (!warned) {
      warned = true;
      console.warn('  bundled chromium unavailable here — falling back to the system Google Chrome');
    }
    return await chromium.launch({ ...opts, channel: 'chrome' });
  }
}
