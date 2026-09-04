#!/bin/sh
# =============================================================================
# build-site.sh — assemble the GitHub Pages site into _site/
#
#   sh build-site.sh
#
# This is NOT a build step for the tools. Every tool is copied byte for byte;
# nothing is bundled, minified, templated or rewritten. All this does is give
# each self-contained file a clean published path, because the source folders
# carry spaces ("M98 Training", "Big Sky") and a percent-encoded URL is a link
# that breaks the moment somebody pastes it into Discord.
#
# The manifest lives in site/index.html and nowhere else — one copy, per house
# rule 5. This script greps the entries out of it, so adding a tool is a single
# line there and no edit here.
#
# WHAT IS PUBLISHED: the landing page and the seven tools. Nothing else.
# The facility PDFs, the transcribed reference markdown, the gap analyses and
# the session logs stay in the repository. The guard at the bottom fails the
# build if any of them reach _site/ — the whole point of a staged directory is
# that the publish surface is a decision rather than an accident.
#
# POSIX sh on purpose: it runs in Git Bash on the owner's machine, where there
# is no node, no python and no jq, and unchanged on the Actions runner.
# =============================================================================

set -eu

SRC_INDEX="site/index.html"
OUT="_site"

if [ ! -f "$SRC_INDEX" ]; then
  echo "build-site.sh: run me from the repository root (no $SRC_INDEX here)" >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT"

# The landing page, plus .nojekyll as insurance rather than necessity: the
# Actions deploy path serves the artifact as-is and never runs Jekyll, so this
# is a no-op today. It earns its place if the Pages source is ever switched
# back to deploy-from-branch, where Jekyll would silently drop every folder
# starting with an underscore — _shared/, _vnas/ — with a clean console and no
# error anywhere. It is also why the workflow pins upload-pages-artifact to v3,
# which still includes dotfiles.
cp "$SRC_INDEX" "$OUT/index.html"
: > "$OUT/.nojekyll"

# The site is unlisted, not secret, and the difference matters. Nothing links to
# it and search engines are asked to skip it, but anyone holding the URL can
# read it — which is exactly why nothing personal is ever staged into it. The
# landing page carries the matching noindex meta tag.
printf 'User-agent: *\nDisallow: /\n' > "$OUT/robots.txt"

count=0
missing=0

# Pull "slug" and "src" out of each one-line manifest entry. Anchored on the
# literal {slug:' ... ',<space>src:' ... ' shape the manifest comment pins down.
entries=$(grep -o "{slug:'[^']*',[[:space:]]*src:'[^']*'" "$SRC_INDEX" || true)

if [ -z "$entries" ]; then
  echo "build-site.sh: parsed no tools out of $SRC_INDEX — has the manifest shape changed?" >&2
  exit 1
fi

echo "$entries" | while IFS= read -r entry; do
  slug=$(printf '%s' "$entry" | sed "s/^{slug:'\([^']*\)'.*/\1/")
  src=$(printf  '%s' "$entry" | sed "s/.*src:'\([^']*\)'.*/\1/")

  if [ ! -f "$src" ]; then
    echo "  MISSING  $slug  <-  $src" >&2
    missing=$((missing + 1))
    continue
  fi

  mkdir -p "$OUT/$slug"
  cp "$src" "$OUT/$slug/index.html"
  count=$((count + 1))
  echo "  /$slug/  <-  $src"
done

# The subshell above cannot hand its counters back, so recount from disk.
built=$(find "$OUT" -mindepth 2 -name index.html | wc -l | tr -d ' ')
declared=$(printf '%s\n' "$entries" | wc -l | tr -d ' ')

if [ "$built" != "$declared" ]; then
  echo "build-site.sh: manifest declares $declared tools, staged $built — refusing to publish a partial site" >&2
  exit 1
fi

# The publish surface is a decision, not an accident. If a source document ever
# lands in the staged site, that is a change nobody asked for: fail loudly.
leaked=$(find "$OUT" -type f ! -name 'index.html' ! -name '.nojekyll' ! -name 'robots.txt' || true)
if [ -n "$leaked" ]; then
  echo "build-site.sh: unexpected files staged for publication:" >&2
  printf '%s\n' "$leaked" >&2
  exit 1
fi

echo ""
echo "Staged $built tools plus the landing page into $OUT/"
echo "Preview locally:  powershell -ExecutionPolicy Bypass -File serve-site.ps1"
