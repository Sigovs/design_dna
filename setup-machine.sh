#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────
# Bring a second machine in line with the work Mac.
#
#   npm run setup-machine          from a design_dna working copy
#
# Or, on a machine that has no working copy yet, through the bootstrap that lives
# on Drive — it clones this repository and then runs this file:
#
#   macOS:    bash "$HOME/Library/CloudStorage/GoogleDrive-sigovs@gmail.com/My Drive/_OPS/setup-home.sh"
#   Windows:  bash "/g/My Drive/_OPS/setup-home.sh"      (in Git Bash)
#
# THIS FILE IS THE REAL SCRIPT AND IT IS VERSIONED. The copy that used to live on
# Drive was not: two serious bugs were found in it in one evening — `ln -s`
# reporting a copy as a link, and `[ -L ]` missing a Windows junction — and both
# fixes existed in a single unversioned file with nothing to roll back to. The
# bootstrap on Drive is now four lines that clone and delegate, so the logic that
# actually matters has a history like everything else here.
#
# Safe to run as often as you like. It never writes over a real file or a real
# directory — only over links it made itself.
#
# WHY LINKS AND NOT COPIES
#
# The whole system refuses copies, and it says so in its own loader: a plain
# copied folder is a snapshot, it ages silently, and a stale copy that looks
# authoritative is worse than none. So this links. Where a machine cannot make a
# link, this script SAYS SO and stops — it does not quietly fall back to copying
# and leave two versions drifting apart.
#
# WINDOWS, AND THE ONE SETTING THAT MATTERS
#
# Windows can make real symlinks, but only with Developer Mode on. It is a single
# toggle, it needs no administrator password, and with it the two machines behave
# identically:
#
#     Settings → Privacy & security → For developers → Developer Mode → On
#
# Without it this script still links the skills, because those are directories and
# a junction works unprivileged. It cannot link the two personal agents: they live
# on the Drive volume and Windows cannot hardlink across volumes. Those are
# reported as blocked rather than copied, because a copied agent file is exactly
# the silent drift this system exists to prevent.
# ─────────────────────────────────────────────────────────────────────────
set -u

# Real symlinks where Windows permits them. The guard above is what makes this
# safe; this only stops MSYS from copying when it did not have to.
export MSYS="${MSYS:-}winsymlinks:nativestrict"

case "$(uname -s)" in
  Darwin*)                 OS=mac ;;
  MINGW*|MSYS*|CYGWIN*)    OS=win ;;
  *)                       OS=other ;;
esac

ok=0; warn=0; blocked=0
say()  { printf "  %s\n" "$*"; }
good() { printf "  ✓ %s\n" "$*"; ok=$((ok+1)); }
bad()  { printf "  ! %s\n" "$*"; warn=$((warn+1)); }
stop() { printf "  ✗ %s\n" "$*"; blocked=$((blocked+1)); }

# ── where Google Drive is ────────────────────────────────────────────────
find_drive() {
  if [ "$OS" = mac ]; then
    printf '%s' "$HOME/Library/CloudStorage/GoogleDrive-sigovs@gmail.com/My Drive"
    return
  fi
  # Windows: Drive is a mounted letter. Look for the one that has our folder.
  for d in g h i j k l m n o p q r s t u v w x y z e f; do
    [ -d "/$d/My Drive/_OPS" ] && { printf '%s' "/$d/My Drive"; return; }
  done
  for p in "$HOME/My Drive" "$HOME/Google Drive/My Drive" "$HOME/GoogleDrive/My Drive"; do
    [ -d "$p/_OPS" ] && { printf '%s' "$p"; return; }
  done
  printf ''
}

# ── where the desktop is (Windows may redirect it into OneDrive) ─────────
find_desktop() {
  for p in "$HOME/Desktop" "$HOME/OneDrive/Desktop" "$HOME/OneDrive - Personal/Desktop"; do
    [ -d "$p" ] && { printf '%s' "$p"; return; }
  done
  printf '%s' "$HOME/Desktop"
}

DRIVE="$(find_drive)"
OPSD="$DRIVE/_OPS"

# ── the working root, which is NOT the same on both machines ─────────────
#
# The Mac keeps everything under ~/Desktop/WORK. The Windows PC does not — it
# works out of C:\____WORK\..., and a script that assumes the Mac's layout
# quietly builds a second, parallel set of folders next to the real ones. That
# happened: a full design_dna clone landed in Desktop\WORK while the actual work
# was elsewhere, leaving two live copies and no way to tell which one a rule was
# edited in.
#
# So the root is remembered per machine rather than guessed. Pass it once:
#
#   bash setup-machine.sh --work-root "/c/____WORK/_____________GDBURO"
#
# and every later run reads it back. The record lives on Drive so it survives a
# reinstall, and it is keyed by hostname so the two machines never read each
# other's answer.
# Finding the root without being told, when nobody has been told yet.
#
# The Windows root is C:\____WORK\_____________GDBURO — four underscores, then
# thirteen. That count has been mistyped or miscounted every single time it was
# written out by hand, and each miss builds a whole second tree beside the real
# one. So it is never typed here: the folder is found by shape, and a glob does
# not care how many underscores it matched.
#
# Only ever returns a directory that EXISTS. It reports what it found; it does
# not create anything, and if nothing matches, the caller falls back as before.
find_work_root() {
  # a root already holding a design_dna is the strongest evidence there is
  for c in /c/*WORK*/*GDBURO* /c/*WORK*/*BURO* /c/*WORK* "$HOME"/*WORK*; do
    [ -d "$c/design_dna" ] && { printf '%s' "$c"; return; }
  done
  # otherwise the deepest match that exists and has project folders in it
  for c in /c/*WORK*/*GDBURO* /c/*WORK*/*BURO*; do
    [ -d "$c" ] || continue
    n=$(find "$c" -maxdepth 1 -type d 2>/dev/null | wc -l)
    [ "$n" -gt 2 ] && { printf '%s' "$c"; return; }
  done
  printf ''
}

HOSTKEY="$(hostname 2>/dev/null | tr -cd 'A-Za-z0-9._-')"
ROOTFILE="$OPSD/work-root.$HOSTKEY.txt"

for i in "$@"; do
  case "${prev:-}" in --work-root) NEWROOT="$i" ;; esac
  prev="$i"
done

if [ -n "${NEWROOT:-}" ]; then
  WORK="$NEWROOT"
  [ -d "$OPSD" ] && printf '%s\n' "$WORK" > "$ROOTFILE" 2>/dev/null \
    && say_saved=1
elif [ -f "$ROOTFILE" ]; then
  WORK="$(head -1 "$ROOTFILE" | tr -d '\r')"
elif [ -n "$(find_work_root)" ]; then
  WORK="$(find_work_root)"
  [ -d "$OPSD" ] && printf '%s\n' "$WORK" > "$ROOTFILE" 2>/dev/null && say_found=1
else
  WORK="$(find_desktop)/WORK"
fi
DNA="$WORK/design_dna"
REPO="https://github.com/Sigovs/design_dna.git"

# ── linking, and the honest failure when a link is impossible ────────────
# Order: symlink · junction (Windows dirs) · hardlink (Windows files, same
# volume). Never a copy.
volume_of() { case "$OS" in win) printf '%s' "$(printf '%s' "$1" | sed -n 's|^/\([a-zA-Z]\)/.*|\1|p')" ;; *) printf 'x' ;; esac; }
winpath()   { printf '%s' "$1" | sed 's|^/\([a-zA-Z]\)/|\1:/|; s|/|\\|g'; }

# Git Bash does not report a Windows junction as a symlink, so `[ -L ]` alone
# calls this script's own junctions "a real folder" on the second run and refuses
# to refresh them. Safe, but it reads as a failure when it is only a blind spot.
# Found by the session on the Windows machine, 2026-08-31.
is_link() {
  [ -L "$1" ] && return 0
  [ "$OS" = win ] || return 1
  [ -e "$1" ] || return 1
  cmd //c fsutil reparsepoint query "$(winpath "$1")" >/dev/null 2>&1
}

# A junction must be removed as a junction. `rm -rf` through one would delete the
# TARGET's contents — the folder it points at, on Drive or in the repo.
unlink_safely() {
  if [ -L "$1" ]; then rm -f "$1" 2>/dev/null; return; fi
  if [ "$OS" = win ] && [ -d "$1" ]; then cmd //c rmdir "$(winpath "$1")" >/dev/null 2>&1; return; fi
  rm -f "$1" 2>/dev/null
}

link() {
  local target="$1" name="$2" label="${3:-$(basename "$2")}"
  [ -e "$target" ] || { bad "$label — source missing: $target"; return; }
  if [ -e "$name" ] && ! is_link "$name"; then
    # A copy this script made itself, before the false-success bug was fixed, is
    # byte-identical to its target — replace it with the link it should always
    # have been. Anything that DIFFERS is somebody's real file and is left alone.
    # Content is the only honest test here: there is no other way to tell our own
    # stale copy from a file that matters.
    if [ -f "$name" ] && [ -f "$target" ] && cmp -s "$name" "$target"; then
      rm -f "$name" 2>/dev/null
      say "$label — replacing an identical copy left by an earlier run"
    elif [ -d "$name" ] && [ -d "$target" ] \
         && [ -z "$(diff -rq "$name" "$target" 2>/dev/null)" ]; then
      rm -rf "$name" 2>/dev/null
      say "$label — replacing an identical copied folder left by an earlier run"
    else
      bad "$label — a real file or folder is already there, and its contents differ. Left untouched."
      return
    fi
  fi
  unlink_safely "$name"
  # THE SUCCESS TEST MUST PROVE A LINK, NOT A FILE.
  #
  # `ln -s` in Git Bash, with no winsymlinks setting and Developer Mode off,
  # SILENTLY COPIES and exits 0. Testing `[ -e ]` then sees the file, reports a
  # link, and never reaches the junction/hardlink ladder below. On the first
  # Windows run that produced "28 linked, 0 warnings, 0 blocked" while 22 of the
  # 28 were copies — this script doing precisely the silent drift it exists to
  # refuse, and reporting it as a clean pass.
  #
  # Caught on the Windows machine by inode comparison, 2026-08-31. The lesson is
  # not about ln: a check that tests for a side effect instead of for the thing
  # it wanted will pass for the wrong reason, and a green line is worse than a
  # red one when it is wrong.
  if ln -s "$target" "$name" 2>/dev/null && is_link "$name"; then good "$label"; return; fi
  # a copy may have been left behind by that attempt — remove it before the ladder
  [ -e "$name" ] && ! is_link "$name" && rm -f "$name" 2>/dev/null
  if [ "$OS" = win ]; then
    if [ -d "$target" ]; then
      if cmd //c mklink //J "$(winpath "$name")" "$(winpath "$target")" >/dev/null 2>&1; then
        good "$label (junction)"; return
      fi
    else
      if [ "$(volume_of "$target")" = "$(volume_of "$name")" ] \
         && cmd //c mklink //H "$(winpath "$name")" "$(winpath "$target")" >/dev/null 2>&1; then
        good "$label (hardlink)"; return
      fi
      stop "$label — needs a symlink and this machine will not make one."
      say  "      Turn on Developer Mode and run this again:"
      say  "      Settings → Privacy & security → For developers → Developer Mode"
      say  "      Not copied on purpose: a copied file drifts and looks authoritative."
      return
    fi
  fi
  stop "$label — could not be linked"
}

echo
echo "  machine: $OS   home: $HOME"
echo "  drive:   ${DRIVE:-NOT FOUND}"
echo "  work:    $WORK"
if [ -n "${say_saved:-}" ]; then
  echo "           ↑ remembered for this machine in $(basename "$ROOTFILE")"
elif [ -n "${say_found:-}" ]; then
  echo "           ↑ found on this machine, and remembered in $(basename "$ROOTFILE")"
elif [ -f "$ROOTFILE" ]; then
  echo "           ↑ from $(basename "$ROOTFILE")"
else
  echo "           ↑ default. If the real one differs, run once with:"
  echo "             --work-root \"/c/path/to/your/WORK\""
fi

echo
echo "═══ 1 · Google Drive ═══"
if [ -n "$DRIVE" ] && [ -d "$OPSD" ]; then
  good "_OPS found ($(find "$OPSD" -type f 2>/dev/null | wc -l | tr -d ' ') files)"
else
  bad "_OPS not found. Start Google Drive for desktop, sign in as sigovs@gmail.com,"
  say "    and wait for 'My Drive' to appear. Without it the personal agents cannot be linked."
fi

echo
echo "═══ 2 · design_dna (git) ═══"
mkdir -p "$WORK"
if [ -d "$DNA/.git" ]; then
  if [ "$(git -C "$DNA" status --porcelain | wc -l | tr -d ' ')" != "0" ]; then
    bad "uncommitted changes — pull skipped. Look at: git -C \"$DNA\" status"
  else
    before=$(git -C "$DNA" rev-parse --short HEAD 2>/dev/null)
    if git -C "$DNA" pull --ff-only -q 2>/dev/null; then
      good "updated: $before → $(git -C "$DNA" rev-parse --short HEAD)"
    else
      bad "pull failed — look at: git -C \"$DNA\" status"
    fi
  fi
elif [ -e "$DNA" ]; then
  bad "$DNA exists but is not a git repository. Rename it and run again — not deleting it."
else
  say "cloning…"
  git clone -q "$REPO" "$DNA" && good "cloned" || bad "clone failed"
fi

echo
echo "═══ 3 · skills → ~/.claude/skills ═══"
mkdir -p "$HOME/.claude/skills"
if [ -d "$DNA/skills" ]; then
  for s in "$DNA"/skills/*/; do
    [ -d "$s" ] || continue
    link "${s%/}" "$HOME/.claude/skills/$(basename "$s")"
  done
else
  bad "$DNA/skills not found"
fi

echo
echo "═══ 4 · agents → ~/.claude/agents ═══"
mkdir -p "$HOME/.claude/agents"
say "design agents (from git):"
if [ -d "$DNA/agents" ]; then
  for a in "$DNA"/agents/*.md; do
    [ -f "$a" ] || continue
    [ "$(basename "$a")" = "README.md" ] && continue
    link "$a" "$HOME/.claude/agents/$(basename "$a")"
  done
fi
say "personal agents (from Drive):"
if [ -d "$OPSD/agents" ]; then
  for a in "$OPSD"/agents/*.md; do
    [ -f "$a" ] || continue
    link "$a" "$HOME/.claude/agents/$(basename "$a")"
  done
else
  bad "personal agents unreachable — Drive has not delivered _OPS"
fi

echo
echo "═══ 5 · the _OPS console ═══"
mkdir -p "$WORK/_OPS"
link "$OPSD/agents"    "$WORK/_OPS/agents"
link "$OPSD/ideas"     "$WORK/_OPS/ideas"
link "$OPSD/README.md" "$WORK/_OPS/README.md"
link "$DNA"            "$WORK/_OPS/design-dna"
if [ -d "$DRIVE/_ДОКУМЕНТЫ_DOCUMENTS" ]; then
  link "$DRIVE/_ДОКУМЕНТЫ_DOCUMENTS" "$WORK/_ДОКУМЕНТЫ_DOCUMENTS" "documents"
  link "$WORK/_ДОКУМЕНТЫ_DOCUMENTS"  "$WORK/_OPS/documents"
else
  bad "the documents archive has not arrived from Drive yet"
fi

echo
echo "═══ RESULT ═══"
say "linked: $ok    warnings: $warn    blocked: $blocked"
if [ "$blocked" != "0" ] && [ "$OS" = win ]; then
  say ""
  say "Blocked items need real symlinks. Turn on Developer Mode and run this again:"
  say "  Settings → Privacy & security → For developers → Developer Mode → On"
  say "Nothing was copied instead — a copy would drift silently, and this system"
  say "refuses copies for exactly that reason."
fi
if [ "$warn" != "0" ]; then
  say ""
  say "Warnings are usually Drive still downloading. Let it finish and run again."
fi
echo
