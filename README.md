# VATSIM Training Toolset

Single-file, offline-first HTML training tools for one VATSIM controller working toward
certification at three ARTCCs. Seven tools, no build step, no dependencies, no server —
each one is a single `.html` file that works from `file://` with the machine offline.

> **Aeronautical data here is for flight simulation on the VATSIM network.
> Not for real-world navigation.**

---

## The tools

| Tool | Facility | Kind | Tier | Published at |
|---|---|---|---|---|
| [m98-drill-deck.html](ZMP/M98%20Training/m98-drill-deck.html) | **M98** — Minneapolis approach | terminal, STARS | 2 | `/m98/` |
| [zmp-drill-deck.html](ZMP/ZMP/zmp-drill-deck.html) | **ZMP** — Minneapolis Center | en route, ERAM | 1 | `/zmp/` |
| [r90-drill-deck.html](ZMP/R90/r90-drill-deck.html) | **R90** — Omaha TRACON | terminal, STARS | 1 | `/r90/` |
| [c90-drill-deck.html](ZAU/C90/c90-drill-deck.html) | **C90** — Chicago TRACON | terminal | 0 | `/c90/` |
| [azo-drill-deck.html](ZAU/AZO/azo-drill-deck.html) | **AZO** — Great Lakes, West Wall | terminal | 0 | `/azo/` |
| [s56-drill-deck.html](ZLC/S56/s56-drill-deck.html) | **S56** — Salt Lake approach | terminal | 0 | `/s56/` |
| [bigsky-drill-deck.html](ZLC/Big%20Sky/bigsky-drill-deck.html) | **Big Sky** — Boise and Bozeman | terminal | 0 | `/bigsky/` |

### What the tiers mean

- **Tier 0 — reference and selector.** Cited reference data, a tool that resolves positions,
  frequencies and the combining chain, and a rendered statement of what is missing. No traffic,
  no clock, no grading.
- **Tier 1 — data spine and shell.** All of the above, plus the full reference layer, the
  three-page architecture, saved progress, and a smoke test that asserts both the spine and the
  emptiness. Still no traffic model.
- **Tier 2 — engine.** A real-time tick, aircraft objects, a multi-clause transmission parser,
  deterministic grading, and a notebook that tallies exposures and staleness.

**Only M98 has been flown**, and the word *skeleton* is load-bearing everywhere else: the frame
is real and cited, the geometry is not carried, and each tool renders that difference rather
than hiding it.

---

## The rules that shape the whole repository

1. **Never invent aviation data.** Every operational number traces to a document and a
   paragraph, and the citation travels with the value — into the reference markdown, into the
   interface beside the number, and into the commit message that added it. If a number cannot
   be cited, the slot stays empty.
2. **Empty is a state the tool displays.** A gap the tool renders is a gap someone can close.
   A gap the tool hides is one that gets discovered mid-drill, by a trainee who has already
   learned the wrong thing. Every tool carries a registry of what it knows and what it does not.
3. **The engine never asserts what it cannot know.** With no boundaries it does not claim a
   boundary was crossed. Where a check is weaker than it looks, the interface says so.
4. **Training items come from observed sessions, never from documents.** Six of the seven tools
   ship with an empty list of graded items, and their smoke tests assert it stays empty.
   Importing another facility's items would fabricate a training history.
5. **One copy of every operational number.** The first script block exposes a single namespace
   object; everything downstream reads through it and never keeps a second copy.
6. **Single file, no build step, no dependencies, offline-first.** The web font is the only
   external reference in the markup, and every page is fully functional without it.

The full set, with the reasoning behind each one, is in [CLAUDE.md](CLAUDE.md).

---

## Using a tool

Download the `.html` file and open it, or open it from the published site. Nothing else is
needed — no install, no network, no account.

Progress is kept in the browser's local storage, per tool, on the device you used. **It does
not follow you to another browser or another machine**, and there is no server holding a copy.
The Markdown or JSON export inside each tool is the real backup.

M98 makes exactly one network call — an optional D-ATIS fetch — and it is optional by
construction: every failure hands straight to the paste box, which feeds the same parser.

---

## What is in the repository

```
CLAUDE.md                              house rules: the invariants, the shell, the ladder
claude_CRC_Platform_Reference.md       what STARS and ERAM can actually do in CRC
claude_Community_Geometry_Sources.md   sector geometry from outside the facility document sets
site/index.html                        the landing page, and the ONLY copy of the site manifest
build-site.sh                          stage the published site into _site/
serve-site.ps1                         preview it at localhost:8080
.github/workflows/pages.yml            publish on push

ZMP/    M98 Training/ · R90/ · ZMP/ · _vnas/
ZAU/    C90/ · AZO/ · _shared/
ZLC/    S56/ · Big Sky/ · _shared/
```

A mature facility folder carries the tool, its smoke test, and a reference layer: a source
document index that makes the pull reproducible, the governing order and each letter of
agreement transcribed by paragraph, a gap analysis of what the documents never answer, the
drill format, the session review, the practice log and the text-to-speech voicing table.
Tier 0 facilities carry the reference file and the index; the rest comes before an engine does.

Shared reference documents are **copied, not linked**, so no facility folder depends on
another's files. The cost is that a change to one must land in every copy in the same commit.

---

## The published site

The tools are hosted so they can be opened from a phone without copying files around. Hosting
changes nothing about what a tool is: every published file is byte-identical to the one in the
tree.

```bash
sh build-site.sh
```

```bash
powershell -ExecutionPolicy Bypass -File serve-site.ps1
```

`build-site.sh` stages the landing page and the seven tools into `_site/` — about 660 KB — and
**fails the build if anything else reaches it**. The manifest lives in `site/index.html` and
nowhere else, so adding a tool is one line there and no edit to the script.

Publishing happens on push: the workflow rebuilds and redeploys on any push to `main` that
touches a drill deck, `site/`, or `build-site.sh`. It publishes to
`https://ml0130-code-base.github.io/Vatsim-Training-Tools/`, which requires
**Settings → Pages → Source: GitHub Actions** set once. Deploying from a branch instead would
put every tool behind a percent-encoded URL, because the source folders carry spaces.

A slug is a URL and a URL is a promise: `/m98/`, `/bigsky/` — lowercase, no spaces, never
renamed once shared.

---

## Where the data comes from

- **The facility document sets** — the governing orders and letters of agreement for each
  facility, pulled with the recipe recorded in each `claude_Source_Documents_Index.md`, and
  transcribed paragraph by paragraph into the reference markdown.
- **The vNAS facility records** — the machine-readable second source, and sometimes the only
  one. Where it disagrees with a facility document, the reference markdown carries **both
  columns**; conflicts are named, not resolved, and a tool may not silently pick one.
- **[VATGlasses](https://vatglasses.uk)** — sector polygons with altitude stratums for ZLC and
  ZAU, each dataset managed by its own virtual ARTCC and generated from that facility's own
  sector file. Vendored under `ZLC/_shared/source-vatglasses/` and
  `ZAU/_shared/source-vatglasses/` at a pinned commit, each with an `ATTRIBUTION.md`.
  **Licensed CC BY-NC-SA 4.0** — attribution appears in the tools' own interface, and the
  share-alike terms bind the blocks the polygons land in.

Community geometry is second-tier and the tools say so. A facility order wins over it, and an
owner-supplied or facility-exported boundary supersedes it and must never be overwritten by it.

**Geometry is the standing blocker at M98 and R90.** In the facility documents the boundaries
are pictures — not one R90 sector boundary is described in words anywhere in its document set —
and no community source covers ZMP. Until geometry exists, nothing spatial gets built and the
engine says so.

---

## Working on this

Read [CLAUDE.md](CLAUDE.md) before a structural change, and the facility's own `CLAUDE.md`
before touching its tool — they record what was deliberately left out and why. On aviation data
the facility file wins; on architecture the root one does.

**One commit touches one ARTCC.** `ZMP/`, `ZAU/` and `ZLC/` are three trees and no commit spans
two of them, so that `git log -- ZLC/` reports when ZLC changed and reverting one facility's
work does not drag another's out with it. Stage by path rather than `git add -A`, and check
before every commit:

```bash
git diff --cached --name-only | cut -d/ -f1 | sort -u
```

Each Tier 1 and Tier 2 facility carries a smoke test that asserts the block count, the data
spine, that nothing spatial is fabricated, and that the graded-items list is empty:

```bash
node smoke-test.mjs r90-drill-deck.html
```

**These harnesses have not been run.** There is no Node on the machine this repository is
written on, so they are verified by being parsed, not by being executed. Changes are checked
instead by serving the folder over local HTTP and driving the real page — the same honesty the
tools apply to their own data applies to claims about testing them.
