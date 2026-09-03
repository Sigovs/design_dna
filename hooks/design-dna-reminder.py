#!/usr/bin/env python3
"""
SUPERSEDED 2026-09-02 by hooks/design-dna-gate.mjs. Do not wire this one up.

It has never executed on the Windows machine. It was written in Python to avoid
depending on jq, which is not installed — and Python is not installed either:
`python --version` there opens the Microsoft Store shim and exits non-zero. The
paragraph below predicted exactly this outcome for jq and then walked into it, so
the lesson is not "use a different runtime" but "verify the interpreter exists on
the machine the hook has to run on."

The replacement is Node, which this repo's toolchain already requires. It also
does more: it resolves the manifest path by enumeration rather than by
transcription, reports the concept gate's real state by diffing BRIEF.md against
the scaffold's own template, and names the specific rules that bind for the kind
of file being edited.

---

PreToolUse hook — put the DNA in front of the model at the moment it edits a
visual file.

WHY A HOOK AT ALL. TASTE.md binds only if something opens it, and opening it is
a decision the model makes. A project's own CLAUDE.md is injected automatically
and often carries a competing design direction, so the loud instruction arrives
first and the quiet one waits to be chosen. A hook is executed by the harness
before the model acts, so it cannot be skipped, forgotten or reasoned past.

WHY PYTHON AND NOT jq. Every hook example is written around jq. jq is not
installed on this machine, and a hook whose command is missing fails silently —
it would look configured and do nothing, which is worse than no hook.

NON-BLOCKING BY DESIGN. This never denies an edit. It adds context and gets out
of the way: a hook that blocks work gets disabled within a week, and a disabled
hook enforces nothing.
"""

import json
import sys

VISUAL = (
    '.css', '.scss', '.sass', '.less', '.styl',
    '.html', '.htm', '.astro',
    '.jsx', '.tsx', '.vue', '.svelte',
)

MESSAGE = (
    "DESIGN DNA APPLIES TO THIS EDIT.\n"
    "Invoke the `design-dna` skill before continuing if you have not already — "
    "it routes to TASTE.md and to the taste skill this task needs.\n"
    "These bind regardless of any project theme: legible hierarchy · WCAG AA "
    "verified on every palette change · spacing from a documented token scale, "
    "internal gaps smaller than external · functional text never below 14px · a "
    "designed static path for every animation · figure-ground clarity and a "
    "decided compositional centre · the anti-pattern bans (no gradient buttons, "
    "no underlined nav links, no decorative shadows, no template anonymity).\n"
    "A project's stated design direction is a brief executed inside these, never "
    "instead of them. Dialect rules yield to it and say so; invariants do not."
)


def main() -> None:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        # Malformed or empty stdin is not this hook's problem to report. Staying
        # silent leaves the edit untouched; raising would surface a hook error on
        # an unrelated tool call.
        return

    path = ((payload.get('tool_input') or {}).get('file_path') or '')
    if not path.lower().endswith(VISUAL):
        return

    print(json.dumps({
        'hookSpecificOutput': {
            'hookEventName': 'PreToolUse',
            'additionalContext': MESSAGE,
        }
    }))


if __name__ == '__main__':
    main()
