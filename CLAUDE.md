# VATSIM Training Toolset — house rules

Single-file, offline-first HTML training tools for one VATSIM controller working toward
certification at several facilities. Three ARTCCs, seven tools:

| Tool | Facility | Kind | Namespace | Status |
|---|---|---|---|---|
| `ZMP/M98 Training/m98-drill-deck.html` | M98 — Minneapolis approach | terminal, STARS | `DD` | full engine, flown |
| `ZMP/ZMP/zmp-drill-deck.html` | ZMP — Minneapolis Center | en route, ERAM | `ZD` | skeleton |
| `ZMP/R90/r90-drill-deck.html` | R90 — Omaha TRACON | terminal, STARS | `RD` | skeleton |
| `ZAU/C90/c90-drill-deck.html` | C90 — Chicago TRACON | terminal | `DD` | skeleton |
| `ZAU/AZO/azo-drill-deck.html` | Great Lakes, West Wall | terminal | `DD` | skeleton |
| `ZLC/S56/s56-drill-deck.html` | S56 — Salt Lake approach | terminal | `ZLC` | skeleton |
| `ZLC/Big Sky/bigsky-drill-deck.html` | Big Sky — BOI + BZN | terminal | `ZLC` | skeleton |

Each facility folder carries its own `CLAUDE.md` with the verified data, the engine map and
the roadmap for that facility. **This file carries what is true everywhere.** Read it before
standing up a new facility or making a structural change to an existing tool. On aviation
data the facility file always wins; on architecture this one does, and a real disagreement
between them is a bug in one of them.

**Only M98 has been flown.** Everything else is a skeleton, and the word is load-bearing:
the frame is real and cited, the geometry is not carried, and the tool renders the
difference rather than hiding it.

`claude_CRC_Platform_Reference.md` sits alongside this file: what STARS and ERAM can actually
do in CRC, transcribed from `docs.virtualnas.net` on 2026-09-01. **Read it before designing a
drill** — a drill that grades a decision the client cannot express is grading the wrong thing.

`claude_Community_Geometry_Sources.md` sits alongside it: where sector geometry can be obtained
from **outside** the facility document sets — VATGlasses, SimAware TRACON and VAT-Spy — what
each actually contains, how far each may be trusted, and under what licence. Pulled and
verified 2026-09-02. **Read it before writing anything spatial into a tool**, and see §7.

---

## 1. The invariants

These hold in every facility, at every tier of maturity. Everything else in this file is
technique; this section is the contract.

1. **Never invent aviation data.** Every operational number traces to a document and a
   paragraph. The citation travels with the value — into the reference markdown, into the UI
   beside the number, and into the commit message that added it. **If a number cannot be
   cited, the slot stays empty.** Declared exceptions are written down at the point of use:
   the six AZO field coordinates come from public airport data so the scope has something
   real to plot, and they say so in the file and in the data map.

2. **Empty is a state the tool displays.** A gap the tool renders is a gap someone can close.
   A gap the tool hides is one that gets discovered mid-drill, by a trainee who has already
   learned the wrong thing. Every tool carries a registry of what it knows and what it does
   not — see §5.

3. **The engine never asserts what it cannot know.** With no boundaries the tool does not
   claim a boundary was crossed; with no route geometry it does not claim a crossing
   restriction was missed. Where a check is weaker than it looks, the UI says
   *"reminder, not a judgement."*

4. **A standing training item is an observed shortfall, not a document-derived guess.**
   `STANDING` is `[]` in every skeleton and the smoke test asserts it. Document-derived
   material goes on a **candidate watch list**, fenced, in the OJT review file, and is never
   copied into `STANDING`. M98's five items came from watching one controller work one
   metroplex — they are facts about M98 sessions, not facts about terminal control, and
   importing them anywhere else fabricates a training history.

5. **One copy of every operational number.** The first script block exposes a single
   `window.<NS>` object; every downstream block reads through it and never keeps a second
   copy. That is what stops a fix, a floor or a frequency from drifting between blocks.

6. **Single file, no build step, no dependencies, offline-first.** Vanilla, ES5-flavoured JS.
   The Google Fonts link is the only external reference in the markup and every page is fully
   functional without it. **Every tool must work end to end from `file://` with the machine
   offline.** M98 has exactly one network call — the D-ATIS fetch — and it is optional by
   construction: never on a path the tool needs, every failure hands straight to the paste
   box, and the parser it feeds is the same one paste uses. That is the test any future
   network idea has to pass. Don't add a second one.

7. **The reference markdown is authoritative.** `claude_*.md` wins over anything hardcoded in
   HTML when the two conflict. Fix the HTML.

8. **Never write a literal closing script tag inside a script block.** It breaks the page and
   it breaks the smoke-test harness, which splits blocks on that tag.

---

## 2. What a facility folder contains

The full set, as it exists at M98 and R90/ZMP. A new facility does not need all of it on day
one — see the maturity ladder in §3 — but this is the target shape, and the file names are
part of the contract, because the tools and the other reference files address each other by
name.

```
<FAC>/
├── CLAUDE.md                              facility data, engine map, roadmap
├── <fac>-drill-deck.html                  the tool
├── <deck>-block.html                      the blocks alone, paste material —
├── drill-builder-block.html               regenerate from the main file, never edit separately
├── smoke-test.mjs                         node smoke-test.mjs <fac>-drill-deck.html
├── claude_Source_Documents_Index.md       the manifest: what was pulled, effective dates,
│                                          page counts, WHICH PAGES ARE PICTURES, pull recipe
├── claude_<FAC>_SOP_Reference.md          the governing order, transcribed by paragraph
├── claude_<FAC>_<NBR>_LOA_Reference.md    one per interface that matters
├── claude_<FAC>_Gap_Analysis.md           what the documents do not answer, ranked
├── claude_<FAC>_Drill_Format.md           how the coach frames and runs a drill here
├── claude_<FAC>_OJT_Session_Review.md     intake template until a session is flown
├── claude_<FAC>_AI_Practice_Log.md        the drill ledger, mirroring PRIOR
├── claude_<FAC>_TTS_Voicing.md            written → spoken forms
├── claude_US_Carrier_Callsigns.md         copied verbatim
└── source-docs/                           PDFs + txt/ pdftotext -layout extractions
```

**Shared reference documents are copied, not linked.** `claude_US_Carrier_Callsigns.md` is
byte-identical in three folders, `claude_Enroute_vs_Terminal_Reference.md` in two, and
`claude_ZMP_Handoff_ID_Reference.md` in three (`ZMP/ZMP/`, `ZMP/R90/`, `ZMP/M98 Training/`), on
purpose: no facility folder may depend on another folder's files, because folders get worked
on, moved and cleared independently. **The cost is that a change to a shared doc must land in
every copy in the same commit** — the one commit permitted to cross an ARTCC boundary, and it
carries nothing else (§14). Check with `md5sum` before assuming they are still in sync.

Cross-facility material that is genuinely one thing lives at the ARTCC level:
`ZLC/_shared/` for the position and frequency reference the whole centre uses,
`ZMP/_vnas/ZMP_vnas.json` for the facility record that describes the ARTCC and its children.

---

## 3. The maturity ladder

Three tiers exist in the repo today. Knowing which tier a facility is at tells you what is
reasonable to ask of it and what the next unit of work is.

**Tier 0 — reference and selector.** A cited reference markdown, a tool that resolves
positions, frequencies and the combining chain, and a rendered statement of what is missing.
No traffic, no clock, no grading. *ZLC Big Sky, ZLC S56, ZAU AZO, ZAU C90.*

**Tier 1 — data spine and shell.** Everything above, plus the full reference layer (drill
format, OJT intake template, empty practice log, TTS voicing, gap analysis), the three-page
architecture, `localStorage`, and a smoke test that asserts the spine and asserts the
emptiness. Still no traffic model. *ZMP, R90.*

**Tier 2 — engine.** A real-time tick, aircraft objects, a multi-clause transmission parser,
deterministic grading tagged to standing items derived from flown sessions, a notebook that
tallies exposures and staleness across one ledger. *M98 only.*

**The jump from 1 to 2 is gated on geometry and on a first OJT session, in that order** — and
neither is a coding task. See §7 and invariant 4.

---

## 4. The tool shell

**Blocks.** Every `<script>` in the page is an extension block, in dependency order. The
first is the deck: data spine, resolution functions, `window.<NS>`, and a `<NS>.hooks` array
called at the end of every render or tick. The second is the builder: it guards on the deck's
namespace and **returns early if it is absent**. New features go inside an existing block or
as a new block after them. The markup outside the blocks — topbar, hero, empty `#modnav`,
footer — is chrome, and the blocks mount everything else. Leave the chrome alone without an
explicit ask.

**Namespace: one per tool, derived from the tool, never reused.** The whole point is that a
paste-merge cannot silently bind the wrong engine to the wrong data. `DD` belongs to M98;
`RD` and `ZD` were chosen precisely to avoid it. See §9 for the collision that already exists.

**Three pages, not one scroll.** Sections mount in workflow order and are then moved into
view wrappers by `buildPages()`: **Set up a drill** · **Fly it** · **Notes and log**. The
switcher is named for the tool (`ddbPage`, `rdPage`, `zdPage`, `page`); placing a strip or
loading a drill jumps to Fly, *build a drill for this* jumps to Set up. **Section ids survive
the move**, so anything that looks one up still works.

**Design system, copied verbatim.** `--bg --panel --panel2 --ink --dim --dim2 --line --green
--amber --red`, `--display --body --mono`. Dark radar aesthetic. **No new fonts, no new accent
colours.** New CSS classes are namespaced to the tool: `dd-`/`ddb-`, `rd-`/`rdb-`,
`zd-`/`zdb-`, `zlc-`.

**Persistence.** `localStorage` under `<tool-file-basename>-v1`, wrapped in try/catch. Where
storage is unavailable — some `file://` and sandboxed contexts — the tool still works in
memory **and says so on the page**; the Markdown or JSON export is the real fallback. There is
no server. **Never put a status word like `skeleton` in the storage key**: the key outlives
the status, and renaming it later silently orphans everything the trainee wrote.

**Interface language.** Full terminology, sentence case, no new abbreviations. Domain
abbreviations are fine — TRACON, ARTCC, STARS, ERAM, LOA, SOP, STAR, SID, MVA, PACP, AIT,
position symbols, sector numbers.

---

## 5. The honesty machinery

Three registries exist, invented at three different facilities. They are the same idea at
three layers, and a mature tool wants all three.

**`SLOTS` — what the tool knows** (ZAU). Every data slot with a state (`verified` / `partial`
/ `empty`), the document that fills it, and a note. It renders as the *"What this tool knows"*
page. **Adding data means moving a slot's state and filling the table it names, in the same
commit.** This is the best of the three and it should be the default for a new tool.

**`OPEN_Q` — what the documents do not answer** (ZLC S56). The questions the source set
genuinely cannot settle, listed on the page **with the reason each is unanswerable**, so a
note filed against one is the thing that closes it. Distinct from `SLOTS`: a slot is a missing
value, an open question is a missing *fact about the facility*.

**`STANDING` — what the trainee is being graded on.** Empty everywhere but M98, asserted empty
by the smoke test, and it stays that way until a session is flown. Every grading `log()` call
carries the id of the item it exercises; **add the tag whenever you add a grading rule, or the
item silently stops being scored.**

**The notes layer is the intake path for the next version of the tool, not a scratchpad.**
C90's rail hangs a *"+ student note"* affordance on every panel, table and empty slot with a
`data-note` anchor — adding a section means giving its panel a `data-note` attribute, and
`mountAllRails()` finds it. Notes are typed (note, correction, question for the instructor,
change the tool) and export as Markdown **addressed to the anchor**, with the slot's state and
source document printed under the heading, so a note about the capture-point table arrives as
`## capture` and folds straight into the reference markdown. **When a note is confirmed,
promote it into the reference markdown and cite who confirmed it** — then the tool's data may
trust it. Never promote an unconfirmed note.

**The gap analysis is the offline half of the same machinery**, and it has a settled shape:

- **Part 1 — what the owner has offered to supply, ranked by training value.** Phrased as asks
  a person can actually answer, most valuable first. This is the part that gets read.
- **Part 2 — not stated in any document**, and not recoverable by anyone.
- **Part 3 — unread because it is a picture.**
- **Part 4 — conflicts and as-written anomalies, preserved rather than corrected.**
- **Part 5 — what is fully covered and needs nothing.** Worth writing; it is what stops the
  next session re-litigating settled ground.

---

## 6. Source documents

**Write `claude_Source_Documents_Index.md` first, before any reference file.** It is the
manifest: local filename, document title, effective date, page count, whether there is a text
layer, and **the curl recipe that reproduces the pull.** Verify PDFs on `%PDF` magic bytes and
count pages from form feeds in the extraction.

Whether the PDFs are committed is a facility choice — ZLC and ZMP commit them, ZAU
deliberately does not ("the PDFs are the facility's to distribute, and the tool does not need
them at runtime"). **The invariant is that the index makes the pull reproducible**, not that
the bytes are in git. Be aware of the cost: the committed sets are ~90 PDFs and growing.

### The extraction traps, all of which have already bitten

- **`pdftotext -layout` versus `-raw`.** Layout preserves tables; raw preserves reading order.
  The AZO 2-2 position table shifts its sector-name column by one row under `-layout`, and
  only the raw reading order pairs each name with its own callsign. **Try both.**
- **Tall rows split a table across lines.** All three ZLC documents with position tables render
  the left columns taller than the right, so the name column and the frequency column come out
  on different lines. **Reading a row straight across gives the wrong frequency.** The twenty
  ZLC frequencies were recovered by re-pairing on order and confirming against the narrative
  paragraphs, which state each one in prose. **Take a frequency from a narrative paragraph or
  from the reference markdown — never from a raw table extraction.**
- **The URL lies about the revision.** R90's 7220.10B CHG 2 is served from a path that still
  says `7220.10A`; vZAU filenames carry a Unix-millisecond upload stamp that changes on
  revision, so a 404 means the document was updated rather than that you typed it wrong.
  **Trust the title inside the document, not the URL.** Percent-encode spaces or the request
  404s.
- **The same file under two names.** `ZMP/R90/source-docs/ZMP_R90_LOA.pdf` is byte-identical to
  `ZMP/ZMP/source-docs/LOA_ZMP_R90.pdf`. Both stay, because neither folder may depend on the
  other's.
- **Document libraries fight plain fetches.** The vZAU library is a JS app that returns 403,
  but the files it links are served straight off object storage and download unauthenticated;
  all five tabs render into one DOM, so a single page load lists everything.

### Two sources, and what to do when they disagree

Get a second independent source when one exists. The vNAS facility record
(`https://data-api.vnas.vatsim.net/api/artccs/<ID>`) is the machine-readable one, and it is
sometimes the *only* source: R90's airport inventory appears in no R90 document, and ZMP's
sector-to-neighbour adjacency map exists nowhere else. **Single-sourced values are flagged as
such wherever they are used.**

**Conflicts are named, not resolved.** ZMP's SOP and vNAS disagree on four sector frequencies
(13, 24, and 22/25 exactly transposed). The reference markdown carries **both columns**, the
tool must not silently pick one, and a drill may not quote one of those frequencies without
saying which source it came from. The same rule preserves as-written anomalies: R90's
cancellation line names an order number the document does not have, and that is recorded, not
corrected.

---

## 7. Geometry — the standing blocker at ZMP, and no longer at ZLC or ZAU

**In the facility documents, the boundaries are pictures everywhere.** Not one R90 sector
boundary is described in words anywhere in its document set. Every ZMP sector map, the
high-sector chart and the approach-sector chart are images. Every ZLC airspace appendix is a
chart image. C90's Appendices B through G are chart images, and so are the AZO SOP's two West
Wall appendices and the airspace attachments to both AZO LOAs. vNAS does not expose video-map
GeoJSON (probed 2026-09-01; every candidate endpoint 404s), and its `eramConfiguration.sectors`
carries only `{id, sectorId, name}` — no polygon, no stratum (re-probed 2026-09-02).

**A community source closes the gap for ZLC and ZAU, and not for ZMP.** VATGlasses publishes
sector polygons **with altitude stratums and ownership chains** for both, and nothing at all
for ZMP. SimAware publishes a lateral facility footprint — no altitudes — for all seven of our
facilities. Both were pulled and verified on 2026-09-02; the coordinate decode was confirmed
against six known field positions, and all twenty ZLC frequencies in
`claude_ZLC_Positions_Reference.md` matched. **Full detail, licence terms and pull recipes in
`claude_Community_Geometry_Sources.md` — read it before using any of it.** Three things about
it are load-bearing:

- **Handoff IDs never come from these sources.** VATGlasses carries none — its positions have
  only `callsign`, `colours`, `frequency`, `pre`, `type`, and its airspace keys are display
  handles that merely *resemble* ERAM sector numbers. **Anything handed off from a STARS
  facility takes its ID from vNAS**, via `claude_ZMP_Handoff_ID_Reference.md`. Owner rule,
  2026-09-02.
- **The ZLC and ZAU datasets are owned by their vARTCCs**, not by the VATGlasses team —
  upstream `Owners.xlsx` names the manager for each, and locally managed sets *"receive
  periodic bulk updates when local sector files change."* **These polygons come from the
  facility's own sector file**, which is the `.sct2` lineage the third path below is asking
  for. That is why they may be used, and it does **not** extend to SimAware.
- **Licence: VATGlasses is CC BY-NC-SA 4.0; SimAware publishes none.** The owner has decided to
  use the VATGlasses boundaries (2026-09-02). **Attribution is mandatory in the tool's UI, not
  just in a markdown file**, and share-alike binds any block the polygons land in. The ZLC and
  ZAU datasets are vendored at `ZLC/_shared/source-vatglasses/` and
  `ZAU/_shared/source-vatglasses/`, each with an `ATTRIBUTION.md` and a pinned commit.
  **SimAware stays unvendored.**
- **ZAU's terminal facilities are a footprint and a ceiling, not a sectorisation.** C90 is one
  polygon surface–FL150 shared by four positions; AZO is one polygon surface–FL100 shared by
  three. Enough for *inside, and under the lid*; **not** enough for *which sector owns this*.
  AZO's six West Wall sector boundaries stay empty.
- **ZLC's geometry carries the flow branch.** The runway gate on each block is the
  configuration selector: `KSLC 34L/R,35` is North Flow and `16L/R,17` is South, `KBOI 10L/R`
  is East and `28L/R` is West. Decoded per sector in
  `ZLC/_shared/claude_ZLC_Sector_Geometry_Reference.md`.

**M98 and R90 are unchanged and remain blocked.** For them, two paths have actually worked, and
no further one should be invented:

1. **Carve the images out of the PDF and measure them.** This is how the M98 DDA polygon was
   recovered — the chart pages were extracted as embedded JPEGs and measured, good to about
   half a mile and stated as such. It needs a rasteriser, and **there is none on the owner's
   machine** (`pdftoppm`, `pdfimages`, ImageMagick, Ghostscript and Python are all absent;
   `pdftotext`, `perl` and `curl` are present).
2. **Owner-supplied points.** The M98 lateral boundary came in as nine MSP radial/DME pairs.
   This is what Part 1 of every gap analysis is for.

**A third path exists on paper and has not been tried.** CRC video maps are authored in
**GeoJSON**, stored centrally per ARTCC, and converted from the facility's legacy `.sct2` with
FE Buddy — so every boundary we are missing already exists as a geometry file that someone with
facility data-admin access holds. No public download endpoint is documented and our 2026-09-01
API probe found none, so this is **an ask, not a capability**: *"can you export the
sector-boundary GeoJSON, or send the `.sct2` the maps were built from?"* It is the same ask at
every facility, it arrives surveyed rather than traced, and it is a cheaper "no" than a request
for hand-measured points. Details in `claude_CRC_Platform_Reference.md` §5.1. **Until an export
actually lands, treat this as untested** and keep the owner-supplied-points ask in place.

Until geometry exists: **nothing spatial gets built, and the engine says so** (invariant 3).
Pick drill targets that need no geometry — R90's scratchpad encoding and STAR-gap heading
bands, ZMP's AIT and Data Block Coordination conditions. Those were chosen for exactly this
reason and they are the model for a new facility's first drill.

**Where geometry now exists, it is still second-tier and the tool must say so.** Community
polygons are drawn by a volunteer from the same charts we cannot read — surveyed by nobody.
They carry a stated tolerance the way the traced M98 DDA polygon states half a mile: SimAware's
footprints agree with the owner-verified M98 boundary to within about two miles, and that is
the number to quote. **An owner-supplied or facility-exported boundary always supersedes one of
these, and must never be overwritten by one.**

---

## 8. Voice, and the drill frame

**The owner listens to drill responses through text-to-speech, so written form is spoken
form.** Every facility carries a `claude_<FAC>_TTS_Voicing.md` table of written → spoken
identifiers, and `claude_US_Carrier_Callsigns.md` for digit grouping, registration spelling
and *"zero, never oh"*. Runway designators are expanded — `32L` is "three two left", never
"thirty-two left". Frequencies go digit by digit with "point": `124.0` is "one two four point
zero", never "one twenty-four".

**Where a pronunciation is unknown, write the identifier as-is and do not invent a phonetic
spelling.** A wrong pronunciation that sounds confident is worse than a flat one, because it
gets learned. All five Omaha STAR names are currently unspecified and will mispronounce; that
is recorded as a live ask rather than papered over.

**The drill frame is facility-shaped, and the coach states it before traffic.** M98's frame is
*configuration · wind · flight category · seat · towers open*; R90's is *position · flow · the
ceiling over this area · whether the STARs are active*; ZMP's is the sector and who else is
open. When writing a new `claude_<FAC>_Drill_Format.md`, start from the nearest existing one,
say explicitly which sections it inherits, and then **name the frame elements the parent does
not have** — that short list is the most useful paragraph in the file.

Two rules hold in every drill format: **the coach sets the weather and the flow follows from
it** (flow is wind-driven, not a free pick), and **do not manufacture conflicts** — at a
facility with no geometry, any claim about who owns a piece of sky is unfounded.

---

## 9. Known divergences, and which way to settle them

Real inconsistencies across the repo today. None is urgent; each should be settled the next
time the relevant tool takes structural work, and **none should be fixed as a drive-by.**

- **`DD` is used by three tools** — M98, C90 and AZO. The rule that produced `RD` and `ZD`
  exists because a paste-merge binding the wrong engine is hard to spot, and C90 and AZO are
  both ZAU terminal tools, which is exactly the risky case. **Settle it by renaming the two
  ZAU namespaces** when either tool next gets structural work. The CSS prefixes can stay.
- **`window.ZLC` is shared by two tools** with a `facility` discriminator (`'BIGSKY'` /
  `'S56'`). Defensible — they are never on the same page — but it fails the same test.
  **Assert the discriminator in the builder's guard** rather than trusting it.
- **Storage keys are inconsistent.** Five tools use `<basename>-v1`; S56 uses
  `zlc-s56-skeleton-v1`; Big Sky has no persistence at all. **Rename S56's key when its notes
  layer next changes, with a migration**, and don't ship another key with a status word in it.
- **ZAU and ZLC have no drill-format, OJT-intake, practice-log or TTS layer**, and **no smoke
  test.** They are Tier 0. That is a legitimate place to be; it is not a legitimate place to
  start grading from. Add the reference layer before adding an engine.
- **The notes layer exists at C90 (anchored rail) and S56 (typed notes against `OPEN_Q`), and
  nowhere else.** AZO has the practice-log half without the rail. **Copy the C90 rail rather
  than reinventing it.**
- **The two ZLC tools are one script block and one scroll** — no builder block, no
  `buildPages()`, no persistence in Big Sky. Everything else in the repo is two blocks and
  three pages. **Split the block and add the wrapper when either ZLC tool grows a second
  concern**, rather than letting a single block accumulate the builder's job.
- **Two organisational shapes coexist:** one ARTCC-level `CLAUDE.md` covering several
  facilities (ZAU, ZLC) and one per facility (ZMP). Both work. Use the ARTCC-level file while
  the facilities are Tier 0, and split it when one reaches Tier 1 and its data section starts
  crowding out the others.

---

## 10. Standing up a new facility

The order below is the one that has worked three times. **Steps 1–5 are all documentation, and
that is not an accident** — every attempt to start at step 6 produces a tool that asserts
things nobody can cite.

1. **Find the document library and pull it.** Write `claude_Source_Documents_Index.md` first:
   manifest, effective dates, page counts, **which pages are pictures**, and the curl recipe.
2. **Extract.** `pdftotext -layout` into `source-docs/txt/`, `-raw` where a table misaligns.
   Reconcile every table against the narrative prose (§6).
3. **Write the reference markdown.** Positions, frequencies and the combining chain first —
   they are the spine of the tool and the thing a trainee needs on night one. Then the LOA
   interfaces, then the local rules. Cite by paragraph, in line.
4. **Get the second source** (vNAS) and reconcile. Name conflicts; do not resolve them. Flag
   single-sourced values.
5. **Write the gap analysis**, Part 1 ranked by training value and phrased as answerable asks.
6. **Build the tool.** Copy the nearest existing shell — terminal from R90, en route from ZMP,
   Tier 0 selector from S56. Set the namespace and the storage key. Build the data spine, the
   `SLOTS` registry, the combining functions and the three pages. **Ship with `STANDING = []`.**
7. **Write the smoke test.** Assert the block count, the spine (every position present, unique
   frequencies, decoded strata, areas partitioning cleanly), that nothing spatial is
   fabricated, and **that `STANDING` is empty** — a guard that fails loudly the day someone
   invents training items.
8. **Write the reference layer**: drill format, OJT intake template, empty practice log, TTS
   voicing, and a verbatim copy of the callsign doc.
9. **Fly a session.** Standing items come from it, and only from it.
10. **Add the tool to the site manifest** — one line in `site/index.html`, then
    `sh build-site.sh`. See §13. A tool nobody can open from a phone is a tool that only gets
    used at the desk it was written on.

### The combining model, which every facility needs

Three functions, and they are worth understanding before changing anything:

- `SECTORS[n].into` names the position this one folds into when closed. `null` means the fold
  leaves the facility for Center.
- `ownerOf(id)` walks that chain until it finds something open, **with a `seen` guard against a
  cycle**. It returns `null` when the chain runs out — that is not a failure, it means Center
  has the airspace.
- `answerFor(id)` wraps it and returns `{kind:'sector'}` or `{kind:'center'}`, so the UI never
  has to special-case a null.

**Structural constraints belong in the data shape, not in a note.** Big Sky's two areas do not
share an airspace boundary, so `into` never points across an area — that is what makes the
rule enforceable instead of advisory. Find the equivalent constraint at a new facility and
encode it the same way.

---

## 11. Changing an existing tool

- **Read the facility `CLAUDE.md` and its gap analysis before opening the HTML.** They record
  what was deliberately left out and why, and the roadmap order is owner-prioritised.
- **Adding data:** move the slot's state in `SLOTS` and fill the table it names, in the same
  commit. A verified slot with an empty table is worse than an empty slot.
- **Adding a grading rule:** tag the `log()` call with the standing item id it exercises.
- **Adding a section:** give its panel a `data-note` anchor.
- **Adding a feature:** inside an existing block, or a new block after them. Extend behaviour
  by wrapping the deck's entry points and pushing a hook — **not by editing the deck**.
- **Splice a new block before the LAST `</body>`, never the first.** Every deck block's header
  comment carries the string `</body>` — *"safe to paste as one block before `</body>`"* — so a
  naive `s{</body>}{$block</body>}` inserts the new block **inside block 1's own comment**. The
  result is two `<script>` opens with no close between them: the browser silently drops the
  builder, the page renders as a deck-only shell, and **the console stays clean**. This bit all
  three ZMP tools on 2026-09-01. The tell is `document.querySelectorAll('script').length`
  returning fewer than the file's `<script>` count — check tag *order*, not just the counts,
  because opens and closes still balance.
- **Never** keep a second copy of an operational number, add a second network call, write a
  literal closing script tag, introduce a font or an accent colour, or reintroduce a "seeded"
  tier in the ledger. **One ledger, no second class:** a drill from the practice log and a
  drill banked in the player contribute identically to exposures, flags, streak and staleness.
- **Regenerate the block-only paste files from the main file**; never edit them separately.
- **A change to a tool goes live on push.** The Pages workflow rebuilds and redeploys on any
  push to `main` that touches a drill deck, `site/`, or `build-site.sh`. Preview it locally
  before pushing, because the published copy is the one people open. See §13.
- **Data-only scenario authoring.** Drills built in the tool live in `localStorage` and export
  as JSON or as a pasteable `SCENARIOS` entry. A build step is acceptable **only** if the
  deliverable remains one self-contained HTML file.
- **Response timing is a training variable, not a convenience.** The sim runs on a real clock,
  the check-in-to-first-word lag is measured, and transmissions composed while paused are
  counted separately. Do not add a feature that quietly stops the clock.

---

## 12. Testing, and telling the truth about it

The harness shape is the same everywhere: read the HTML, split on the script tags, **fail
loudly if the block count is wrong**, evaluate each block in order against minimal DOM stubs,
then assert the data spine.

```bash
node smoke-test.mjs r90-drill-deck.html
```

**There is no Node on the owner's machine** (checked 2026-09-01; no `node`, no working
`python`, no `jq` — `perl`, `curl` and `pdftotext` are present). **The harnesses have not been
run.** Say that plainly rather than implying a suite passed. The same applies to any harness
you write: until Node exists it is verified by being parsed, not by being executed.

What has actually been done instead: **serve the folder over local HTTP and drive the real
page.** The preview pane renders `file://` as a static snapshot, so a page opened that way
cannot be driven. ZLC used a PowerShell `System.Net.HttpListener`; that works.

**Report exactly which checks were run.** When a change touches layout, describe what to look
at. "Verified in a browser: sections mount, page tabs switch, the combining chain resolves,
the note export carries its anchor and slot state" is a useful sentence. "Tests pass" is not.

---

## 13. Publishing — one public repository, and a staged publish surface

The tools are hosted so they can be opened from a phone or a second machine without copying
files around. Hosting does not change what a tool is: every file published is byte-identical
to the one in the tree, still single-file, still fully functional offline. The check that
proves it is `md5sum` on both sides.

**The repository is public, and that was a decision, not a default.** GitHub Pages cannot
serve a private repository on a free account, and no Pages site can be put behind a login
below Enterprise Cloud — so hosting at all meant making the tree public. **Everything in it is
public: the 87 facility PDFs, the gap analyses, the practice logs, and the OJT session
reviews**, which are a session-by-session record of one trainee's own performance including
flagged losses of separation, attached to a real name in the commit history. Owner decision,
2026-09-04, taken with that spelled out. **Anything added here from now on is published by
default** — that is the thing to hold in mind before writing a new note file, not after.

**The site is still not the repository.** Pages publishes the staged `_site/` directory built
by `build-site.sh`, which contains the landing page and the seven tools and nothing else —
about 656 KB. `build-site.sh` fails the build if any other file reaches `_site/`. That guard
is no longer about secrecy, since the repository is public either way; it is about the site
staying the thing it claims to be, and about the next person who adds a data file not silently
widening what the Pages domain serves.

**Deploy from Actions, not from a branch.** Settings → Pages → Source: **GitHub Actions**; the
workflow is `.github/workflows/pages.yml`. Serving the branch directly would put every tool
behind a percent-encoded URL, because the source folders carry spaces — `M98 Training`,
`Big Sky`. There is no build step in the sense invariant 6 forbids: nothing is bundled,
minified or templated, and each tool is copied byte for byte.

```
sh build-site.sh                                          stage into _site/
powershell -ExecutionPolicy Bypass -File serve-site.ps1   preview at localhost:8080
git push                                                  publish (the workflow does the rest)
```

### What the Pages documentation actually constrains

Checked against `docs.github.com/en/pages` on 2026-09-04. The numbers are theirs; the second
column is where we stand.

| Limit | Us |
|---|---|
| Source repository — **recommended** 1 GB | 305 MB, and the PDF sets are growing (§6) |
| Published site — hard 1 GB | 657 KB |
| Bandwidth — soft 100 GB/month | not a factor for one trainee |
| Builds — soft 10/hour, **waived for a custom Actions workflow** | ours is custom, so waived |
| Artifact — `tar.gz`, under 10 GB, **no symbolic or hard links** | 657 KB, no links anywhere in the tree |
| Deployment timeout — 10 minutes | seconds |

**The plan rule, in their words:** *"If the account that owns the repository uses GitHub Free
or GitHub Free for organizations, the repository must be public."* And private Pages sites —
access control — require **GitHub Enterprise Cloud**, not Pro and not Team. Those two sentences
are the whole reason this repository is public.

**Two version traps in the workflow, both deliberate and both easy to "fix" into a bug:**

- **`upload-pages-artifact` is pinned to v3, not v4 or v5.** v4.0.0 excludes dotfiles by
  default, which silently drops `_site/.nojekyll`. v3 is also the pairing in GitHub's own
  `pages/static.yml` starter workflow.
- **`deploy-pages` is v5**, matching that same starter. The action's own README still shows v4;
  the starter is the more current reference. The compatibility rule is that `deploy-pages@v4`
  or newer is required for artifacts from `upload-pages-artifact@v3` or newer, so v3 + v5 is
  inside the supported set.

**`actions: read` is not required** — `contents: read`, `pages: write`, `id-token: write` is the
complete permission set, confirmed against the `deploy-pages` README. Do not add permissions
speculatively.

**The manifest lives in `site/index.html` and nowhere else**, per invariant 5. It is one line
per tool, and `build-site.sh` greps the entries out of the page it renders — so the landing
page and the published paths cannot disagree. **Adding a future tool is that one line.** Keep
each entry on one line and keep the `slug`/`src` key order; the build script matches that
shape and fails loudly if it parses nothing.

**A slug is a URL, and a URL is a promise.** `/m98/`, `/bigsky/` — lowercase, no spaces. Once a
slug has been shared it is never renamed; a renamed slug is a dead bookmark. Removing a tool
from the manifest does remove it from the site, deliberately, so a deleted tool does not
linger at its old URL.

**The site is unlisted rather than advertised** — `noindex` on the landing page, `robots.txt`
disallowing everything, nothing linking in. With a public repository this buys less than it
did, and it is one line in each file to reverse if the tools are ever meant to be found.

Two things hosting does not change, and both are worth stating because they look like
regressions and are not. **`localStorage` is per-origin and per-device**: work banked in the
hosted M98 deck is not the same store as work banked in the local file, and neither follows
you to another machine. The Markdown and JSON exports remain the real backup. And **M98's
D-ATIS fetch is cross-origin from a Pages site**; if the endpoints refuse it the tool hands
straight to the paste box, which is how it was built to fail (invariant 6). Both endpoints are
already HTTPS, so nothing is blocked as mixed content.

---

## 14. Session hygiene, and the commit boundary

- **Commit after each completed subtask.**
- **When aviation data is involved, cite which document and which paragraph the number came
  from in the commit message.**
- Long sessions: `/clear` and let the facility `CLAUDE.md` re-anchor context. That is what
  those files are for, and it is why they are written to be read cold.

### One commit touches one ARTCC

**`ZMP/`, `ZAU/` and `ZLC/` are the three trees, and no commit touches two of them.** A session
that works ZMP and then works ZAU produces two commits, in either order. Finishing a session in
a single commit is not a reason to cross the boundary — splitting is always the cheaper side of
that trade.

**Underlay facilities are not a second boundary.** Everything under one ARTCC may share a
commit: M98, R90 and ZMP Center are all `ZMP/`, so a change spanning them is one commit, and
the same holds for C90 + AZO under `ZAU/` and S56 + Big Sky under `ZLC/`. The ARTCC-level
folders belong to their own tree and travel with it — `ZLC/_shared/`, `ZAU/_shared/`,
`ZMP/_vnas/`.

**Why:** §2 keeps shared documents as copies rather than links because folders get worked on,
moved and cleared independently. The same reasoning governs the history. A cross-ARTCC commit
makes `git log -- ZLC/` misreport when ZLC changed, and it makes reverting one facility's work
drag another facility's out with it. Two commits already in the history do exactly this —
`7b781f4` vendors ZLC and ZAU geometry together, and `048aa73` moves ZLC, ZAU and R90 at once.
They are the reason for the rule, not a precedent for it: under it, `7b781f4` would have been
three commits — the root reference document, then ZLC, then ZAU.

**Repo-level files are not a facility, and they do not launder a cross-ARTCC commit.** Root
`CLAUDE.md`, `claude_CRC_Platform_Reference.md`, `claude_Community_Geometry_Sources.md` and the
site harness (`build-site.sh`, `serve-site.ps1`, `site/index.html`, `.github/workflows/`,
`.gitignore`) may ride along with one ARTCC's commit when the change came out of that work — a
house rule learned at C90 lands with the C90 change that taught it. A root change that stands
on its own, or that came out of work in two trees, is its own commit and touches no facility
folder.

**One declared exception: a synchronised shared-document update.** §2 requires every copy of a
copied document to land in the same commit, and once a copy exists under two ARTCCs that commit
has to cross. When it does, **it carries the sync and nothing else** — identical bytes in every
copy, `md5sum` checked, no facility work riding along. All three copied documents
(`claude_US_Carrier_Callsigns.md`, `claude_Enroute_vs_Terminal_Reference.md`,
`claude_ZMP_Handoff_ID_Reference.md`) currently live entirely under `ZMP/`, so the exception is
not yet live; it goes live the first time step 8 of §10 puts a callsign copy in `ZAU/` or
`ZLC/`.

**There is no second exception.** A mechanical edit that happens to touch two trees — a licence
line in both `ATTRIBUTION.md` files, a link fix, a rename — splits by tree. That is the
cheapest kind of change to commit twice.

**Stage by path when a session's work already spans trees.** Never `git add -A`:

```bash
git add ZMP/ && git commit -m "Add the R90 scratchpad drill"
git add ZAU/ && git commit -m "Move the C90 capture-point slot to partial"
```

**Check before every commit.** This prints one tree name, plus at most the repo-level files:

```bash
git diff --cached --name-only | cut -d/ -f1 | sort -u
```

**Name the scope in the subject line** — the ARTCC, or the facilities inside it. *"Wire the
VATGlasses ZAU footprint into the C90 and AZO decks"* reads correctly under this rule;
*"Vendor ZLC/ZAU sector geometry"* announces the violation.

**Publishing creates no commit, so it raises no boundary question.** The Pages workflow builds
`_site/` on the runner and deploys the artifact; nothing is written back to the tree, and
`_site/` is ignored. A commit that touches a drill deck is facility work under this rule like
any other — that it also triggers a redeploy changes nothing about how it is staged (§13).
