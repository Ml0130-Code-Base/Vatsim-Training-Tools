# ZID Training Toolset

Single-file, offline-first HTML training tools for VATSIM Indianapolis Center (vZID / Indy Center) terminal
facilities, built to the same architecture as the R90 and M98 toolsets. **Three facilities have folders here, and
each holds one Tier 1 tool with a published-track player.** This is the ARTCC-level file; per root `CLAUDE.md` section 9 it covers all three while
they are Tier 1, and splits when one reaches Tier 2 and its data section starts crowding out the others.

| Tool | Facility | Namespace | Storage key | Status |
|---|---|---|---|---|
| `IND/ind-drill-deck.html` | IND - Indianapolis ATCT/TRACON | `IND` | `ind-drill-deck-v1`, saved drills `ind-drill-deck-fly-v1` | Tier 1 + player |
| `SDF/sdf-drill-deck.html` | SDF - Louisville ATCT/TRACON | `SDF` | `sdf-drill-deck-v1`, saved drills `sdf-drill-deck-fly-v1` | Tier 1 + player |
| `CVG/cvg-drill-deck.html` | CVG - Cincinnati ATCT/TRACON | `CVG` | `cvg-drill-deck-v1`, saved drills `cvg-drill-deck-fly-v1` | Tier 1 + player |

**Tier 1 means:** the data spine and the shell, the full reference layer, a smoke test that asserts the spine and the
emptiness - and **no sector-level traffic model and no grading** (root `CLAUDE.md` section 3). Since 2026-10-27 each deck also
carries a player that flies a strip along its published CIFP track (owner decision, issue #76; root `CLAUDE.md` section 3 and
`../claude_Fly_Block_Reference.md`): a clock, the published crossings and speeds, and nothing else. `STANDING` is `[]` in all
three and the smoke test asserts it. The jump to Tier 2 is gated on geometry and on a first OJT session, neither of
which is a coding task.

**Namespaces are the facility codes, and they are new.** `IND`, `SDF` and `CVG` are not `DD` (which three tools already
share - root `CLAUDE.md` section 9) and not each other. CSS prefixes are `ind-`/`indb-`/`indp-`/`indst-` and the same
for the others. The switcher is `indPage`, `sdfPage`, `cvgPage`.

## The source documents are behind a VATSIM sign-in, and that changes what is committed

The Indy Center wiki (`wiki.flyindycenter.com`) serves **every page except its home page only to a signed-in VATSIM
account** - checked 2026-10-18: each controller-document URL returns *Unauthorized* and the GraphQL page list shows the
home page alone. The three SOPs were saved by the owner from a signed-in browser. **The repository is public**
(root `CLAUDE.md` section 13), so:

- **The saved pages, their diagrams and their text extractions are not committed.** The source index records the
  filename, size, md5 and the sign-in steps; the pull cannot be reproduced with `curl`, which is the one place this
  repository's "the index makes the pull reproducible" rule bends, and the index says so.
- **The reference markdown is a transcription of sign-in-gated content, and it is public the moment it is pushed.** The
  tables of frequencies, altitudes and procedures are operational facility data, not personal data, and most of it is
  corroborated by public sources (CIFP, vNAS). **Owner, 2026-10-20: the gate is a VATSIM sign-in, not a roster
  - any VATSIM account can open the wiki and read the SOPs - so this is a lower-stakes publication than "members-only"
  suggests.** It is still the owner's decision whether to push the transcription; the decks stay out of the site manifest
  (held 2026-10-19).
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
3. **vNAS** - `_vnas/ZID_vnas.json`, `lastUpdatedAt 2026-10-22T02:21:21Z` (re-pulled 2026-10-22; the decks were built from the 2026-10-17 record and nothing operational differs between them). The only source for handoff identifiers, and a
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
   **vNAS serves the facility's own video maps, and is now the primary geometry source (2026-10-22, root
   `claude_vNAS_Source_Reference.md`).** CVG's `TRACON Boundary` map is the same polygon as the SimAware ring (worst
   0.07 NM). **IND's and SDF's 2024 maps are not**: they differ by up to about eleven miles (SDF) and eight (IND) on the IND/SDF border and SDF's
   south-east edge, and the SimAware rings are the newer of the two. Named, not resolved; the decks keep the SimAware
   ring. Section 7 of the geometry reference has the measurements.
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

Eight extension blocks, in dependency order: **the deck** (data spine, positions, fields, runways, configurations, wind,
every reference table and rule, the vNAS and vATIS sections, handoff IDs, `SLOTS`, conflicts, open questions), **the
builder and notebook** (the frame, the three-page wrapper `Set up a drill` / `Fly it` / `Notes and log` (the Fly page holds the player alone, as M98's does; the lateral footprint, the published procedures, the positions and the fields and configurations tables sit at the top of the third page, and Set up reads *Position Setup* first, then the D-ATIS and the flow, then the drill builder, as M98's does. *Position Setup* carries M98's four sub-panels by name - *Quick setups* (every radar position open, only this seat open), *Which seat are you working*, *Open around you*, *What that resolves to* - with *Configuration and weather* between the third and fourth, because M98 sets those in its Edit panel and these decks set them here; the drill builder carries *Generate*, *Edit*, *Special observation*, *Landline events*, *Brief*, *Start positions* (the player's own scope code, `fly.preview`), *Flown on* and *Saved drills*. A special observation or a landline call is a notice the author typed, fired once by the player's clock, never graded, and the player does not re-plan a strip when a special observation changes the configuration. M98's *What your notes want next* is not built: it names standing items and `STANDING` is `[]`), persistence, the
note rail copied from C90 with a `data-note` anchor on every table and slot, the practice log), **the published
procedures** (the R90 block with the namespace changed, keyed by airport then by procedure) and **the flight strips**
(the master block, byte for byte from `../../strip-block.html`, with a contract derived from the procedures block and
`flies:true, track:true`) and **the route draw** (the master block, byte for byte from `../../routedraw-block.html`: M98's *Routes drawn* bar - open procedure, all STARs, all SIDs, all SIDs + STARs, off - on the lateral-footprint plot, reading the procedures block's own tracks and the deck's own projection, `fpProject`; the *tracked traffic* mode becomes *open procedure* because there is no traffic; see `../../claude_RouteDraw_Block_Reference.md`). and **the D-ATIS block** (the master `../../datis-block.html` behind a contract; sets the frame). Splice any new block before the **last** `</body>`.

**The D-ATIS block is the one network call, and it is optional.** Block 6 (the master `../../datis-block.html`,
`../../claude_DATIS_Block_Reference.md`) reads a pasted or fetched D-ATIS - the fetch asks `atis.info` and nothing else, every
failure hands to the paste box, and there is no METAR fallback - matches the runways in use against the deck's own
configuration table and, when **exactly one** configuration fits, sets the frame's configuration, wind and flight category
through the builder's `setFrame`. Several fits, or none, set nothing and are stated. **KIND, KSDF and KCVG each publish a
D-ATIS** (KCVG split arrival and departure; checked 2026-10-20, `claude_DATIS_Field_Survey.md` section 10), so each deck reads one
field. KIND's and SDF's combined ATIS state no departure runways and none is assumed. The master carries two landing grammars
the shared reader reads as nothing (CVG's `EXPECT ILS APPROACH TO RWY 36R`, SDF's `VISUAL APCH RWY 17L AND 17R`) and strips
the vATIS caret; the other decks' copy of the reader has not had them added.

**The route draw follows the flow.** With a configuration in force, a STAR is drawn only with the runway transitions that land
a runway in use, a SID only with the ones that depart one, and a procedure whose every runway transition is for a runway out of
use is not drawn. Only the primary field is trimmed (a configuration names that field's runways), and **IND's three SIDs and
RACYR6 carry no runway transition in CIFP, so they cannot be trimmed and are drawn in every flow** - the page says so. A button
turns the trim off.

**`flies` is true on every procedure strip, and the strip row says it.** The fly block (block 7, the master `../../fly-block.html`) flies a strip along the track the procedures block builds, straight between fixes, with the published crossings and speeds and nothing else; the drill block (block 8, `../../drill-block.html`) builds around the strip row. Both are checked against their masters with the one-liner in `../claude_Fly_Block_Reference.md` section 7, never by date. IND's SIDs carry almost no altitude in CIFP (DAWNN1 above 10000 at DAWNN, MAREO1 above 3000 at LUIJE), so the drill gives an IND departure a cleared altitude of its own. Saved drills live under `<basename>-fly-v1`.

**The decks were assembled from one template by a script that is not committed.** They are ordinary single files and are
maintained by editing them; the three copies are expected to diverge, as the five strip-block copies elsewhere are kept
in step by `diff`, not by a generator. Root `CLAUDE.md` section 11: regenerate nothing from a build step.

## Testing

`smoke-test.mjs` in each folder, with `smoke-test-browser.html` (copied from the M98 runner; the title and default deck
changed). **There is no Node on the owner's machine**, so the harnesses were run through the browser runner, served over
a local `HttpListener`, on **2026-10-19**: **IND 198 checks, SDF 214, CVG 269, all passing; 2026-10-20, with the route-draw block, IND 218, SDF 234, CVG 289; with the D-ATIS block and the flow trim, IND 248, SDF 262, CVG 340; 2026-10-27, with the 50-strip ceiling on a drill, IND 252, SDF 266, CVG 344; 2026-10-27, with the fly and drill blocks (blocks 7 and 8), IND 276, SDF 290, CVG 368; 2026-10-27, with M98's Set up anatomy (events, the start-positions preview, the four Position Setup sub-panels - `../claude_Fly_Block_Reference.md` section 6), IND 294, SDF 308, CVG 386.** Each asserts the block count
(8), unique frequencies and callsigns, that every consolidation edge agrees with the vNAS parent letter and every chain
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
