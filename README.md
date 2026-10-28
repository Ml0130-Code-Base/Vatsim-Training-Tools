# VATSIM Training Toolset

Single-file, offline-first HTML training tools for one VATSIM controller working toward
certification at four ARTCCs. Ten tools, no build step, no dependencies, no server —
each one is a single `.html` file that works from `file://` with the machine offline.

> **Aeronautical data here is for flight simulation on the VATSIM network.
> Not for real-world navigation.**

---

## The tools

| Tool | Facility | Kind | Tier | Aircraft | Published at |
|---|---|---|---|---|---|
| [m98-drill-deck.html](ZMP/M98%20Training/m98-drill-deck.html) | **M98** — Minneapolis approach | terminal, STARS | 2 | its own engine | `/m98/` |
| [zmp-drill-deck.html](ZMP/ZMP/zmp-drill-deck.html) | **ZMP** — Minneapolis Center | en route, ERAM | 1 | none yet | `/zmp/` |
| [r90-drill-deck.html](ZMP/R90/r90-drill-deck.html) | **R90** — Omaha TRACON | terminal, STARS | 1 | published tracks | `/r90/` |
| [c90-drill-deck.html](ZAU/C90/c90-drill-deck.html) | **C90** — Chicago TRACON | terminal | 0 | published tracks | `/c90/` |
| [azo-drill-deck.html](ZAU/AZO/azo-drill-deck.html) | **AZO** — Great Lakes, West Wall | terminal | 0 | overflights only | `/azo/` |
| [s56-drill-deck.html](ZLC/S56/s56-drill-deck.html) | **S56** — Salt Lake approach | terminal | 0 | published tracks | `/s56/` |
| [bigsky-drill-deck.html](ZLC/Big%20Sky/bigsky-drill-deck.html) | **Big Sky** — Boise and Bozeman | terminal | 0 | published tracks | `/bigsky/` |
| [ind-drill-deck.html](ZID/IND/ind-drill-deck.html) | **IND** — Indianapolis TRACON | terminal, STARS | 1 | published tracks | `/ind/` |
| [sdf-drill-deck.html](ZID/SDF/sdf-drill-deck.html) | **SDF** — Louisville TRACON | terminal, STARS | 1 | published tracks | `/sdf/` |
| [cvg-drill-deck.html](ZID/CVG/cvg-drill-deck.html) | **CVG** — Cincinnati TRACON | terminal, STARS | 1 | published tracks | `/cvg/` |

### What the tiers mean

- **Tier 0 — reference and selector.** Cited reference data, a tool that resolves positions,
  frequencies and the combining chain, and a rendered statement of what is missing.
- **Tier 1 — data spine and shell.** All of the above, plus the full reference layer, the
  three-page architecture, saved progress, and a smoke test that asserts both the spine and the
  emptiness. No traffic model of its own.
- **Tier 2 — engine.** A real-time tick, aircraft objects, a multi-clause transmission parser,
  deterministic grading against items observed in a flown session, and a notebook that tallies
  exposures and staleness.

### The published-track player

Every deck except M98 and ZMP Center has the same *Set up a drill* and *Fly it* pages as M98,
and its aircraft fly each strip along the facility's own published SID and STAR tracks, from
FAA coded procedure data (CIFP). It uses the published crossings and speeds and **nothing else**:
no sector boundary, no handoff owner, no wind. Every check says *reminder, not a judgement*, and it
**grades nothing**. That is a tier of its own, not Tier 2, because Tier 2 is grading against
observed shortfalls. AZO's fields have no coded procedure, so its player flies overflights only.
Reference: [claude_Fly_Block_Reference.md](claude_Fly_Block_Reference.md).

**Only M98 has been flown**, and the word *skeleton* is load-bearing everywhere else: the frame
is real and cited, most of the geometry is not carried, and each tool renders that difference
rather than hiding it.

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
4. **Training items come from observed sessions, never from documents.** Nine of the ten tools
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

The decks that read a D-ATIS broadcast do so with an optional network fetch, and six of them also
try a METAR when a field has no D-ATIS (whether that is allowed is an open decision, issue #72).
Neither is ever on a path the tool needs: every failure hands straight to the paste box, which feeds
the same parser.

---

## What is in the repository

```
CLAUDE.md                              house rules: the invariants, the shell, the ladder
claude_CRC_Platform_Reference.md       what STARS and ERAM can actually do in CRC
claude_Community_Geometry_Sources.md   sector geometry from outside the facility document sets
claude_vNAS_Source_Reference.md        the vNAS data, including the public video maps
claude_CIFP_Source_Reference.md        the FAA coded procedures: layout, traps, licence
claude_Fly_Block_Reference.md          the shared player and drill builder
claude_Strip_Block_Reference.md        the strip row and the 50-strip ceiling
claude_RouteDraw_Block_Reference.md    the "Routes drawn" bar
claude_DATIS_Block_Reference.md        the D-ATIS reader (and claude_DATIS_Field_Survey.md)
fly-block.html  drill-block.html       master blocks, copied byte for byte into the decks
strip-block.html  routedraw-block.html
datis-block.html
tools/                                 cifp/ (the procedure decoder) and vnas/ (the map puller)
site/index.html                        the landing page, and the ONLY copy of the site manifest
build-site.sh                          stage the published site into _site/
serve-site.ps1                         preview it at localhost:8080
.github/workflows/pages.yml            publish on push

ZMP/    M98 Training/ · R90/ · ZMP/ · _vnas/ · _vatis/
ZAU/    C90/ · AZO/ · _shared/ · _vnas/
ZLC/    S56/ · Big Sky/ · _shared/ · _vnas/
ZID/    IND/ · SDF/ · CVG/ · _shared/ · _vnas/ · _vatis/
```

A mature facility folder carries the tool, its smoke test, and a reference layer: a source
document index that makes the pull reproducible, the governing order and each letter of
agreement transcribed by paragraph, a CIFP procedures file, a gap analysis of what the documents
never answer, the drill format, the session review, the practice log and the text-to-speech
voicing table. Tier 0 facilities carry the reference file and the index; the rest comes before
an engine does.

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

`build-site.sh` stages the landing page and the ten tools into `_site/` — about 3.5 MB — and
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
  transcribed paragraph by paragraph into the reference markdown. The three ZID SOPs sit behind
  a VATSIM sign-in and are not committed; their index records the steps instead.
- **CIFP** — the FAA's coded SIDs, STARs and approaches, decoded with `tools/cifp/`. The 28-day
  cycle is the citation, and it is stamped beside every procedure table.
- **The vNAS facility records and video maps** — the machine-readable second source, the only
  source of handoff identifiers, and the primary geometry source since 2026-10-22. Where it
  disagrees with a facility document, the reference markdown carries **both columns**; conflicts
  are named, not resolved, and a tool may not silently pick one.
- **[VATGlasses](https://vatglasses.uk)** — sector polygons with altitude stratums for ZLC and
  ZAU, each dataset managed by its own virtual ARTCC and generated from that facility's own
  sector file. Vendored under `ZLC/_shared/source-vatglasses/` and
  `ZAU/_shared/source-vatglasses/` at a pinned commit, each with an `ATTRIBUTION.md`.
  **Licensed CC BY-NC-SA 4.0** — attribution appears in the tools' own interface, and the
  share-alike terms bind the blocks the polygons land in. There is no ZMP or ZID dataset.
- **SimAware** — a lateral outline with no altitudes and no published licence, used for the
  three ZID decks and below anything the owner supplies.

Community geometry is second-tier and the tools say so. A facility order wins over it, and an
owner-supplied or facility-exported boundary supersedes it and must never be overwritten by it.

**Geometry is still the blocker for sector-level work.** In the facility documents the boundaries
are pictures — not one R90 sector boundary is described in words anywhere in its document set.
The vNAS video maps gave M98, R90 and AZO a lateral outline, but no sector split has been
identified in any of them, and VATGlasses does not cover ZMP or ZID. Until geometry exists,
nothing spatial gets built and the engine says so.

---

## Working on this

Read [CLAUDE.md](CLAUDE.md) before a structural change, and the facility's own `CLAUDE.md`
before touching its tool — they record what was deliberately left out and why. On aviation data
the facility file wins; on architecture the root one does. Work to do lives in the
[issue tracker](https://github.com/Ml0130-Code-Base/Vatsim-Training-Tools/issues), not in a file.

**One commit touches one ARTCC.** `ZMP/`, `ZAU/`, `ZLC/` and `ZID/` are four trees and no commit
spans two of them, so that `git log -- ZLC/` reports when ZLC changed and reverting one facility's
work does not drag another's out with it. Stage by path rather than `git add -A`, and check
before every commit:

```bash
git diff --cached --name-only | cut -d/ -f1 | sort -u
```

M98, R90, ZMP Center and the three ZID decks each carry a smoke test that asserts the block count,
the data spine, that nothing spatial is fabricated, and that the graded-items list is empty:

```bash
node smoke-test.mjs r90-drill-deck.html
```

**There is no Node on the machine this repository is written on**, so a harness is run through
the `smoke-test-browser.html` beside it, served over local HTTP. M98 and the three ZID decks have
that runner and pass; R90 and ZMP Center have only the `.mjs`, and ZMP Center's cannot pass
against the current deck (issue #69). Changes are also checked by driving the real page — the
same honesty the tools apply to their own data applies to claims about testing them.
