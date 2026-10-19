# ZID Training Toolset

Single-file, offline-first HTML training tools for VATSIM Indianapolis Center (vZID / Indy Center) terminal
facilities, built to the same architecture as the R90 and M98 toolsets. **Three facilities have folders here, and
each holds one Tier 1 tool.** This is the ARTCC-level file; per root `CLAUDE.md` section 9 it covers all three while
they are Tier 1, and splits when one reaches Tier 2 and its data section starts crowding out the others.

| Tool | Facility | Namespace | Storage key | Status |
|---|---|---|---|---|
| `IND/ind-drill-deck.html` | IND - Indianapolis ATCT/TRACON | `IND` | `ind-drill-deck-v1` | Tier 1 |
| `SDF/sdf-drill-deck.html` | SDF - Louisville ATCT/TRACON | `SDF` | `sdf-drill-deck-v1` | Tier 1 |
| `CVG/cvg-drill-deck.html` | CVG - Cincinnati ATCT/TRACON | `CVG` | `cvg-drill-deck-v1` | Tier 1 |

**Tier 1 means:** the data spine and the shell, the full reference layer, a smoke test that asserts the spine and the
emptiness - and **no traffic model, no clock and no grading** (root `CLAUDE.md` section 3). `STANDING` is `[]` in all
three and the smoke test asserts it. The jump to Tier 2 is gated on geometry and on a first OJT session, neither of
which is a coding task.

**Namespaces are the facility codes, and they are new.** `IND`, `SDF` and `CVG` are not `DD` (which three tools already
share - root `CLAUDE.md` section 9) and not each other. CSS prefixes are `ind-`/`indb-`/`indp-`/`indst-` and the same
for the others. The switcher is `indPage`, `sdfPage`, `cvgPage`.

## The source documents are members-only, and that changes what is committed

The Indy Center wiki (`wiki.flyindycenter.com`) serves **every page except its home page only to a signed-in VATSIM
account** - checked 2026-10-18: each controller-document URL returns *Unauthorized* and the GraphQL page list shows the
home page alone. The three SOPs were saved by the owner from a signed-in browser. **The repository is public**
(root `CLAUDE.md` section 13), so:

- **The saved pages, their diagrams and their text extractions are not committed.** The source index records the
  filename, size, md5 and the sign-in steps; the pull cannot be reproduced with `curl`, which is the one place this
  repository's "the index makes the pull reproducible" rule bends, and the index says so.
- **The reference markdown is a transcription of members-only content, and it is public the moment it is pushed.** The
  tables of frequencies, altitudes and procedures are operational facility data, not personal data, and most of it is
  corroborated by public sources (CIFP, vNAS). **Whether to publish a transcription of a members-only document is the
  owner's decision, and it was not asked.**
- **The three decks are not in `site/index.html`, so a push does not publish them to Pages.** The Pages workflow
  rebuilds on any push touching a drill deck, `site/` or `build-site.sh`; the decks sit in the tree and the repository,
  but not on the site, until the manifest line is added. **Adding it is one line per tool and is the owner's call.**

## The four sources, and what each gave

Root `CLAUDE.md` section 10. Every one was checked; the empty ones are recorded.

1. **The orders** - the three Indy Center SOPs. They carry no separate LOAs: chapter 8 of each SOP is the
   inter-facility coordination, chapter 7 the handoffs. `claude_<FAC>_LOA_Reference.md` collects those tables.
2. **CIFP 261001** (and 261029, identical at every field worked) - runways, localizers, SIDs and STARs. Decoded with the
   fixed-column offsets in `../claude_CIFP_Source_Reference.md`; the Indiana records use region `K5`, not the `K3` the
   Minnesota records use.
3. **vNAS** - `_vnas/ZID_vnas.json`, `lastUpdatedAt 2026-10-17T02:35:43Z`. The only source for handoff identifiers, and a
   second source for positions, consolidation hierarchy, scratchpad rules, TDLS defaults and the coordination restrictions (26 involve IND, 36 SDF, 47 CVG, as owner or requester; a restriction between two of them counts on both sides).
4. **Community geometry - a lateral outline and nothing else.** **VATGlasses has no ZID dataset** (the upstream listing
   carries zab, zak, zau, zeg, zhn, zhu, zjx, zlc, zma, zny, zoa, zob and others, not zid). **SimAware publishes a
   lateral outline for IND, SDF and CVG, and it is carried in each deck** as `FOOTPRINT` (27, 24 and 25 vertices) on the
   owner's decision of 2026-10-19, the way the M98/RST boundary was moved onto it. **It has no altitude, no sector split
   and no flow**, so it says whether a point is inside the facility and nothing more. About two miles at best - a figure
   earned at M98 and **not checked at ZID**, where no owner-verified or facility-exported boundary exists. No licence is
   published; the merge gate is a verified Region, Division or ARTCC staff account. It sits below the SOP diagrams and
   below anything the owner supplies, and must never overwrite either. Every field with a CIFP coordinate falls inside;
   KCFJ and I34 (IND) and KBFR, KSER and KIMS (SDF, KIMS 0.1 NM from the edge) are inside the outline's own error. Pinned
   commits, per-field distances and the vertices are in `_shared/claude_ZID_Sector_Geometry_Reference.md`.
5. **The vATIS profile** (`_vatis/`) - serial 2026081300, from `github.com/Indy-Center/vatisfiles`. **The owner's
   downloaded copy was a 257-byte stub with `stations: []`;** the real profile is fetched from its own `updateUrl`.
6. **The Indy Center tools site** (`tools.flyindycenter.com`, source `Indy-Center/controller-tools`, no licence) - checked
   2026-10-19, **recorded and not wired in.** Its terminal outlines for IND and SDF are vertex-for-vertex the SimAware
   polygons (CVG within 0.07 NM), so they are one polygon rather than two sources, and say nothing about accuracy. Its 27
   Center sector frequencies all agree with vNAS. Its 594 restrictions are 94% one bulk import of 2025-01-08 and
   disagree with the SDF SOP on one row (the MAUDD split, SDF to LEX), carried as a conflict. Detail, md5s and the pull
   recipe in `_shared/claude_ZID_ControllerTools_Reference.md`.

## What the three tools carry

Each carries the same shape: positions checked against vNAS (the SOP prints most channels to two decimals - `128.17` is
`128.175` - and the tool shows the full channel and says so); runways, lengths, bearings and ILS category from CIFP;
the configurations; every SOP table (clearance delivery, ground and ramp, local control, handoffs, scratchpads,
inter-facility, sector rules, the STARS video-map list parsed from the page); handoff IDs composed from the vNAS record
in all directions, including **ERAM to the TRACON** (`neighboringStarsConfigurations`: Field E format
`OneLetterAndSubset`, single characters I, S and V); the vNAS Restrictions, scratchpad rules and TDLS defaults as a
second source **beside the SOP, never merged into it**; the vATIS presets; the published procedures; the SimAware lateral
footprint with a plot, a containment test and a per-field distance to the edge; the flight-strip row; the `SLOTS`, conflicts and open-question registers; the note rail; and a wind-component helper.

**The wind helper is arithmetic, not a rule.** Headwind and crosswind per runway against the CIFP magnetic bearing, and
the configurations ordered by headwind. **None of the three SOPs states a wind limit or a rule for choosing a
configuration** (CVG says only *"when wind precludes departing 27"* and *"extreme wind"*), and none is invented. It says
*"reminder, not a judgement"*.

### Where the sources disagree - carried in both columns, never resolved

- **CVG: three position values.** Clearance Delivery **127.17 (SOP) against 120.400 (vNAS)**; DHL Ramp **120.40 (SOP)
  against 129.475 (vNAS)**, where the SOP's own ATIS NOTAM text and the vATIS profile both say 129.47; Ground Control
  East STARS ID **T (SOP) against 1X (vNAS)**. The SOP's DHL value equals vNAS's Clearance value, which suggests two
  cells crossed in one source - a reading, recorded, not applied.
- **CVG: the South gate.** SOP 7 sends CHCLL, SILKS and KENLN to ZID 20; vNAS sends CHCLL and SILKS to 22 and KENLN to 20
  (`C22` against `C20`).
- **CVG: the SARGO note**, the vATIS departure presets (fewer runways than the SOP configurations), and `TIGGR#` in the
  vNAS RNAV patterns for TIGRR.
- **SDF: Bowman Local's STARS ID** is U in SOP 2 and 1Z in SOP 1 and vNAS - the SOP disagrees with itself.
- **IND:** none between SOP and vNAS on a position. The SOP scratchpad table omits MAREO#, which vNAS has. **CIFP codes
  three of the six SIDs the SOP assigns at KIND** (DAWNN1, MAREO1, MEARZ7); OOM5 and ROCKY1 are coded at the six
  satellites and not at KIND, and INDY is coded nowhere. The North gate goes to ZAU in the SOP with no sector; vNAS names
  ZAU 35 and 51 (`G35`, `G51`).

### Independent confirmation worth knowing about

CIFP agrees with the SOP **on every runway and SID** for two tables that were transcribed by hand: SDF SOP 6's six
initial waypoints (DROPA, WININ, EAZIE, RRROE, BAALK, GADSN - 35 runway/SID pairs) and CVG SOP 6's first fix for each of
eight runways (KINNG, BONLE, LASNG, FLOEE, FANSA, CIGMA/HOBAL/RORFE, HAGSS - 72 pairs). Both comparisons are assertions
in the smoke tests. SDF's scratchpad table matches vNAS row for row; so does CVG's and, except MAREO#, IND's.

## Architecture

Four extension blocks, in dependency order: **the deck** (data spine, positions, fields, runways, configurations, wind,
every reference table and rule, the vNAS and vATIS sections, handoff IDs, `SLOTS`, conflicts, open questions), **the
builder and notebook** (the frame, the three-page wrapper `Set up a drill` / `Fly it` / `Notes and log`, persistence, the
note rail copied from C90 with a `data-note` anchor on every table and slot, the practice log), **the published
procedures** (the R90 block with the namespace changed, keyed by airport then by procedure) and **the flight strips**
(the master block, byte for byte from `../../strip-block.html`, with a contract derived from the procedures block and
`flies:false, track:true`). Splice any new block before the **last** `</body>`.

**There is no D-ATIS and weather reader, and so no network call at all.** `claude_DATIS_Field_Survey.md` surveyed the
fields the other decks work; KIND and KSDF are not in it. Adding a reader is a separate decision about a network call
(root `CLAUDE.md` invariant 6).

**`flies` is false everywhere and the strip row says "track only".** The coordinates of every fix are carried; nothing
is flown along them because there is no traffic model.

**The decks were assembled from one template by a script that is not committed.** They are ordinary single files and are
maintained by editing them; the three copies are expected to diverge, as the five strip-block copies elsewhere are kept
in step by `diff`, not by a generator. Root `CLAUDE.md` section 11: regenerate nothing from a build step.

## Testing

`smoke-test.mjs` in each folder, with `smoke-test-browser.html` (copied from the M98 runner; the title and default deck
changed). **There is no Node on the owner's machine**, so the harnesses were run through the browser runner, served over
a local `HttpListener`, on **2026-10-19**: **IND 198 checks, SDF 214, CVG 269, all passing.** Each asserts the block count
(4), unique frequencies and callsigns, that every consolidation edge agrees with the vNAS parent letter and every chain
terminates, that a frequency the SOP truncates is told apart from a real disagreement, that every fix resolves to
coordinates inside the ZID region, that the strip contract is the derived one, that `STANDING` is `[]`, that sector and
flow boundaries are an `empty` slot and the lateral outline a `partial` one, that the footprint is one ring with no
altitude property whose every vertex sits in the region and whose every tested field is inside, the marginal fields by
name, and the facility facts written out by hand. **Five mutants of the IND deck were run to prove the assertions
bite** (a changed intersection row, a changed vNAS frequency, a broken TCP parent, a vertex moved out of the region, a
wrong vertex count); each failed at the intended assertion.

That is the harness, run in a browser. It is not `node smoke-test.mjs`, and a clean run there is still unproven. The
decks were also driven in a real browser page: sections mount, the three pages switch, the frame builder, wind table,
handoff tables and procedures viewer render, the note rail mounts, and the console is clean. **Phone layout was checked for horizontal overflow only (CVG at 375 px: none on any of the three pages; the other two share the template and were not measured), the page was otherwise not walked through at phone width.**

## Where the work is tracked

The issue tracker, per root `CLAUDE.md` section 14. Gaps stay in each facility's `claude_<FAC>_Gap_Analysis.md`, where
Part 1 ranks what the owner could supply; a work item belongs in an issue and nowhere else.

## Session hygiene

Commit after each completed subtask. Cite the document and chapter for any aviation number in the commit message.
**One commit touches one ARTCC:** everything under `ZID/` may share a commit - IND, SDF and CVG together. Root
`CLAUDE.md` section 14. **The shared callsign document is now copied into `ZID/_shared/`, so the synchronised-update
exception of section 14 is live:** a change to `claude_US_Carrier_Callsigns.md` must land in the `ZMP/` copies and this one
in the same commit, `md5sum` checked, carrying nothing else.
