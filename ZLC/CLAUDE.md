# ZLC Training Toolset

Single-file, offline-first HTML training tools for VATSIM controllers working Salt Lake City ARTCC terminal facilities. Built on the pattern established by `../ZMP/M98 Training/` — read that CLAUDE.md before making architectural decisions here.

**Current state: skeleton.** The position selectors are real and their data is verified. The sector-level traffic engine and the grading are not built. **Big Sky carries a published-track player and a drill builder since 2026-10-27 (issue #76, `../claude_Fly_Block_Reference.md`): the aircraft fly the CIFP 261001 SIDs and STARs straight between fixes, the *Set up a drill* page holds *Position Setup* (M98's four sub-panels by name: *Quick setups*, *Which seat are you working*, *Open around you*, *What that resolves to*) and then the drill builder (*Generate*, *Edit*, *Special observation*, *Landline events*, *Brief*, the strips, *Start positions*, *Flown on*, *Saved drills*), and nothing is graded. The seat's vertical structure and top-down table are reference and sit on the third page. A special observation or a landline call is a notice the author typed, fired once, and the player does not re-plan strips already flying. Big Sky still has no smoke test (issue #46), so this is verified by driving the real page.** **S56 carries the same player and builder since 2026-10-27**, with its own procedures block from CIFP 261001 (13 STARs and 15 SIDs across seven fields; Hill Air Force Base has none) and a *Configuration* sub-panel for its North and South flow ahead of the four named ones; it has no smoke test either (issue #46). Stubs on the page say so by name rather than rendering something plausible and empty.

Treat correctness of aviation data as safety-critical for training value: **never invent procedures, fixes, altitudes, frequencies or paragraph citations.** Every operational number must trace to a document in `source-docs/`.

---

## Repository layout

```
ZLC/
├── CLAUDE.md                          this file
├── _shared/
│   ├── claude_ZLC_Positions_Reference.md   AFV tree + all 20 TRACON frequencies
│   └── source-docs/                        ZLC-wide SOPs, + txt/ extractions
├── Big Sky/
│   ├── bigsky-drill-deck.html         the tool — area + sector selector
│   ├── BOI/
│   │   ├── claude_BOI_Reference.md
│   │   └── source-docs/  (+ txt/)
│   └── BZN/
│       ├── claude_BZN_Reference.md
│       └── source-docs/  (+ txt/)
└── S56/
    ├── s56-drill-deck.html            the tool — sector selector + student notes
    ├── claude_S56_Reference.md
    └── source-docs/  (+ txt/)
```

Source documents come from <https://zlcartcc.org/controllers>, served from `zlcassets.vsimtech.org`. Text layers are `pdftotext -layout` output.

---

## The two facilities

**Big Sky Approach** is one radio name over two areas that **do not share an airspace boundary** — Boise in southwest Idaho, Bozeman in southwest Montana. This is the defining constraint of that tool. A sector in one area never combines with, hands off to, or folds into the other; when an area's last sector closes its airspace goes **up to Center**, never sideways. The two areas even fold to different Center sectors (30 for BOI, 8 for BZN) and use different radar range minima (11 NM vs 10 NM). Bozeman is documented inside the Boise SOP, which is a filing convenience and not evidence of a shared boundary.

**S56 (Salt Lake City Approach)** is nine sectors with three roots — Lake, Bear and Valley all sit directly under Center. Everything else folds into one of those three.

---

## Architecture rules

These follow the M98 rules; where they differ it is noted.

1. **Single file, no build step, no dependencies, offline-first.** Vanilla ES5. The Google Fonts link is the only external reference and the page is fully functional without it. **There is no network call in either tool.** Both must work end to end from `file://` with the machine offline.
2. **Additive extension pattern.** Every `<script>` is an extension block. New features go inside an existing block or as a new one after it. The markup outside the blocks is chrome only — topbar, hero, empty `#modnav`, footer — and the blocks mount everything else.
3. **One copy of every operational number.** Each tool exposes `window.ZLC` — sectors, frequencies, presets, state, and the resolution functions `ownerOf` / `answerFor` / `foldedInto` — plus a `ZLC.hooks` array called at the end of every `render`. Downstream blocks read through `ZLC` and never keep a second copy. Note that `window.ZLC` is **per-facility**: `ZLC.facility` is `'BIGSKY'` or `'S56'`, and the two tools are never loaded into the same page.
4. **Design system:** the CSS custom properties are copied from M98 verbatim (`--bg --panel --panel2 --ink --dim --dim2 --line --green --amber --red`, `--display --body --mono`). New classes are namespaced `zlc-`. Match the dark radar aesthetic; do not introduce new fonts or accent colours.
5. **Interface language:** full terminology, sentence case, no new abbreviations. Domain abbreviations (SOP, LOA, STAR, SID, FCT, ATCT, position letters, sector names) are fine.
6. **Never write a literal closing script tag inside a script block** — it would break both the block and the page, and any future harness that splits on it.

---

## The combining model

Both tools use the same three functions. This is the part worth understanding before changing anything.

- `SECTORS[n].into` names the sector this one folds into when closed. `null` means the fold leaves the facility for Center.
- `ownerOf(id)` walks that chain until it finds something open, with a `seen` guard against a cycle. It returns `null` when the chain runs out — that is not a failure, it means Center has the airspace.
- `answerFor(id)` wraps `ownerOf` and returns either `{kind:'sector'}` or `{kind:'center'}`, so the UI never has to special-case a null.

In Big Sky, `into` **never points across an area**, which is what makes the no-shared-boundary rule structural rather than a note in the text. Anyone adding a sector must keep that true.

---

## Frequency data — read this before touching a number

All three source documents with position tables render them with a **taller row height in the left columns than the right**, so `pdftotext` emits the name column and the frequency column on different lines. **Reading a table row straight across gives the wrong frequency.** The BOI table looks like it says Sage is 126.900; it does not.

The columns were re-paired by order and confirmed against the narrative paragraphs, which state each frequency in prose (`"Monitor the Sage frequency (119.600 MHz)"`). All twenty TRACON frequencies reconcile across three independent documents once that is done. The full working is in `_shared/claude_ZLC_Positions_Reference.md`.

**If you need a frequency, take it from a narrative paragraph or from the reference markdown — never from a raw table extraction.**

---

## The vNAS record (pulled 2026-10-22)

Source 3 of the four (root `CLAUDE.md` §10) was never pulled for ZLC until 2026-10-22: `_vnas/ZLC_vnas.json`, `lastUpdatedAt` 2026-10-22T00:40Z, with the tables and the comparison in **`_vnas/claude_ZLC_vNAS_Reference.md`**. It is the only source for handoff identifiers (S56 `QQQ`/`Q`, Boise `BBB`/`B`, Bozeman `NNN`/`N`, all Field E `OneLetterAndSubset`, all subset 1) and **neither deck carries them yet**; the `handoff` slots and the S56 open question say so. Three results: every vNAS frequency and callsign matches the references (Bozeman's second frequency, 119.550 "LVM", is the one thing no reference mentions); vNAS confirms the three Big Sky frequencies and the Mountain Home radio name ("Cowboy Control") that VATGlasses has wrong; and **seven of S56's nine parent TCPs disagree with the AFV-tree chain the deck carries**, named and not resolved. The video maps it lists are served publicly (`claude_vNAS_Source_Reference.md`); the S56 and Big Sky outlines were not isolated in them.

## Student notes (S56)

The notes layer is not a scratchpad bolted on the side; it is the intake path for the next version of the tool.

- A note carries a `kind` (question, correction, technique, phraseology) and an `anchor` — either a sector id or one of the `OPEN_Q` ids.
- `OPEN_Q` holds the questions the source documents genuinely do not answer. They are listed on the page with the reason each is unanswerable, so a note against one is the thing that closes it.
- Notes persist to `localStorage` under `s56-drill-deck-v1` (renamed off the old `zlc-s56-skeleton-v1`, which the deck still reads once to migrate), wrapped in try/catch. Saved drills are under `s56-drill-deck-fly-v1`, a second key so a corrupt drill list cannot sit in the way of the notes (issue #70). Where storage is unavailable the tool still works in memory and says so; the markdown export is the fallback.
- Export groups by anchor and is written to be pasted into `claude_S56_Reference.md` or handed to a mentor.

When a note is confirmed, **promote it into the reference markdown and cite who confirmed it** — then it can be trusted by the tool's data. Do not promote an unconfirmed note.

Big Sky has no notes layer yet. Adding one means copying this block, not reinventing it.

---

## What is deliberately empty

Named on the page as numbered slots so the gaps are visible rather than discovered later.

1. **Geometry.** Every airspace appendix in every one of these documents is a chart image with no text layer. Sector boundaries, gates (Antelope, Keyhole, Jepson, Avon, Bird, the Ellis Corridor), the P2/P3/P4 areas and the Heber Shelf line are all names without shapes **in the document set**.

   **The sector boundaries are now carried (2026-09-02).** The VATGlasses ZLC dataset is vendored at `_shared/source-vatglasses/` and decoded per sector in **`_shared/claude_ZLC_Sector_Geometry_Reference.md`**: all nine S56 sectors and all three Big Sky sectors as lateral shapes with runway-gated altitude blocks, plus their ownership chains.

   **It is trusted because ZLC vARTCC owns the dataset.** Upstream `Owners.xlsx` names Adam Earl (`shadeddude`) as its manager, and locally managed sets receive *"periodic bulk updates when local sector files change"* — so these polygons come from the facility's own sector file. It also confirmed all twenty ZLC frequencies in `_shared/claude_ZLC_Positions_Reference.md`. It is still **not a facility document**: an SOP outranks it, and one divergence is already recorded (the Bozeman fold, `B1Z → 06` against the AFV tree's `08 → 06`). Licence is **CC BY-NC-SA 4.0** — any tool drawing these shapes **must credit VATGlasses on the page**.

   **Still names without shapes:** the gates, the P2/P3/P4 areas and the Heber Shelf line. VATGlasses draws sectors, not gates. Recovering those still means carving the images out of the PDFs and measuring them, the way `claude_M98_DDA_Geometry.md` was produced.
2. **Routes and fixes — almost entirely closed by CIFP (2026-09-06).** The two
   `claude_*_CIFP_Procedures.md` files carry every published SID, STAR and approach at both
   facilities, with each fix's crossing altitude, speed limit and coordinates. Of the fixes
   this section used to list as names without positions, **all but one are now located**:
   KOURT, SPUUD, SADYL, JIMMI, BEWTE, TOILS, BGSKY, BOBKT, MEADO, HIA, and UDUZU, IRRON,
   HLMET and STACO at S56.

   **Two things did not close, and they are different kinds of gap.**

   - **NICHOL (S56) is not in CIFP at all** — no fix of that name exists anywhere in cycle
     260903, and none in 261001 or 261029 (the string appears only inside nine airport and
     heliport names). SOP 3-5 uses it as the South Flow descent line (*"no descent below 11,000 until
     established downwind and north of NICHOL"*), so it reads as a local point off the video
     map rather than a published waypoint. It stays an owner ask — issue **#47**.
   - **KYANN (BOI) may be a transcription error for KYAAN.** The BOI SOP transcription in
     `Big Sky/BOI/claude_BOI_Reference.md` spells it `KYANN`; CIFP codes the KBOI STAR as
     **`KYAAN4`** and its fix as `KYAAN`, and there is no `KYANN` at Boise: **`KYANN` does exist in CIFP, but only as an en route waypoint
     at N30 15 / W095 13 in Texas (region K4)**, about 1,300 NM from the field, so it is not a Boise fix and
     does not change the question. The earlier wording of this paragraph, *"no `KYANN` in the
     cycle"*, and issue **#48**'s were too strong, corrected 2026-10-20. **Not resolved
     here** — root `CLAUDE.md` §6, conflicts are named. Issue **#48** settles it, and
     carries both outcomes: an as-written anomaly to preserve, or a dropped letter that four
     files need fixed.

   **CIFP is procedures, not airspace.** It closes fix positions and nothing else — the gates,
   the P2/P3/P4 areas and the Heber Shelf line in item 1 are untouched by it.

   **Wired into the Big Sky deck 2026-09-06.** A **PUBLISHED PROCEDURES** block carries all ten
   STARs and seven SIDs across both areas — five STARs and two SIDs at Boise, five and five at
   Bozeman — with every transition, 94 fixes, and each fix's crossing restriction and speed
   limit. It exposes `ZLC.STARS`, `ZLC.SIDS`, `ZLC.PFIX` and `ZLC.trackTo()`, and its guard
   **asserts the `facility === 'BIGSKY'` discriminator** rather than trusting that only one ZLC
   tool is on the page — the fix root `CLAUDE.md` §9 asks for. The block sits **before** the
   PAGES block, which stays last, and `mod-bskp` is named in that block's `fly` page.

   Three things to keep true here. **Procedures are keyed by airport, then by procedure**,
   because an identifier is not unique across fields. **`flies` is true since 2026-10-27** — the
   fly block (before the PAGES block, which stays last) flies the published track — while `track:true` says the ladder is carried, and the two are different claims the strip row labels differently. BOI3 is a radar-vectored SID with no fix and the player flies it as a straight stand-in line from the field to a charted fix on KBOI's published procedures (the fly block's vector-SID rule, 2026-10-27), with the coded part said in words; Bozeman has no runway gate, so a Bozeman drill has no flow and its strips carry no runway; a drill is held to one area's field (`only:true`), because the two areas share no airspace. And a **runway transition
   named `RW10L` is the procedure's runway, not the flow**: the flow branch lives in the
   geometry (item 3), and nothing in this block touches it.

   **S56 got its procedures block 2026-10-27** (issue **#3**, left out of the 2026-09-06 pass at the owner's direction and
   asked for on 2026-10-27). Big Sky's machinery under S56's data, generated with `tools/cifp/gen.pl` on CIFP 261001: 13 STARs
   (Salt Lake City 11, Ogden 1, Provo 1) and 15 SIDs (Salt Lake City 8, Provo 2, and one each at Brigham City, Ogden,
   Spanish Fork, Tooele and South Valley). **Hill Air Force Base has no coded SID, STAR or approach: checked and
   empty, CIFP 261001.** SLC4 is a Vector SID (route type T); the player says its coded headings in words and flies a straight stand-in line from the field to a charted fix on the published procedures at KSLC (the fly block's vector-SID rule, 2026-10-27). The strip contract
   now derives its arrivals and departures from the block instead of hand-listing names, `PROCS.airportLL` carries
   the eight CIFP airport reference points (KSLC from `PFIX`, the other seven from the airport records of the same file),
   and the block sits before the strips block, with `mod-s56p` on the third page. Like Big Sky's, it is regenerated at the
   next cycle, never patched (#65).

   **Audited against a fresh decode 2026-10-20 (issue #64), cycle 261001.** Cycle 261001 carries the
   same procedures as 260903 at all ten fields, so what changed is the decode, not the data.

   - **S56 was already right.** A fresh decode of 260903 reproduces its reference procedure section
     for procedure section, and its deck's runway lists, 15 SID names, 13 STAR names and 36
     approach names match the 261001 manifest exactly. Restamped, and given a Runways table.
   - **Big Sky's reference was not.** `claude_BigSky_CIFP_Procedures.md` carried the four decode
     faults S56's reference recorded on 2026-09-06 and was regenerated: all 6 runway fixes were
     resolved against the wrong airport (Boise's four in Ohio, Bozeman's two in Alaska), 14 of 25
     approach finals carried a duplicate fix from a continuation record, and 21 of 25 approach names
     printed the suffix after the runway. The deck's `STARS`, `SIDS` and `PFIX` are byte-identical
     to a fresh decode, apart from `vector:true` on **BOI3**, which is a Vector SID (route type
     `T`) and was being labelled "conventional".
   - **A statement corrected in 2026-09 never reached the Big Sky deck.** It said a radar-vector
     departure is outside what CIFP carries; BOI3 and SLC4 are exactly that, coded.
   - **Runway data** was already right in both decks (S56's eight fields, Big Sky's `10L 10R 28L 28R`
     and `03 11 11G 12 21 29 29G 30`, all matching the CIFP runway records) and is now also in the
     references as a Runways table. CIFP also codes two further Bozeman strips, `11G` and `29G`
     (2,802 ft by 80 ft each).
   - **Cycle 261029 (effective 2026-10-29) was decoded and is not carried.** It matters to S56's strip
     contract: CARTR1, PITTT2, SKEES6 and YUTES2 become CARTR2, PITTT3, SKEES7 and YUTES3. Issue #65.

   **Its copy of the master strip block caught up 2026-09-06.** All five decks that carry the
   block — R90, C90, AZO, S56, Big Sky — are now byte-identical to root `strip-block.html`,
   checked with `diff`. **S56's rows read *"frame only"* until 2026-10-27, and that was correct**:
   `track` says the published ladder is carried, S56 then carried names, so the flag stayed unset. With the
   procedures block in, the contract sets `flies:true, track:true` and the row says the procedure is flown
   straight between fixes. Root `CLAUDE.md` §9 recorded the divergence; this closes the block half of it.
3. **Configuration.** S56 procedures branch on North Flow vs South Flow almost everywhere; the selector does not model flow yet, so duty text shows both branches. BOI branches on East vs West Flow the same way.

   **The geometry now carries the branch**, which is the natural way to model it when the selector grows one: every airspace block in `_shared/source-vatglasses/airspace.json` is gated on a runway configuration, and there are exactly four across the dataset — `KSLC 34L/R, 35` (North), `KSLC 16L/R, 17` (South), `KBOI 10L/R` (East), `KBOI 28L/R` (West). Selecting a flow selects which blocks exist. Big Sky shows it most clearly: Alpine and Sage **swap shapes** between east and west flow over the same total airspace.
4. **Engine and grading.** Since 2026-10-27 Big Sky and S56 fly the published CIFP tracks on a real clock (issue #76); neither has a sector engine and neither grades anything, and there are no standing training items. In M98 the standing items came out of real session notes and were not invented to fill the slot; the same should happen here, which is what the S56 notes section is for.

**One caution about reading these slots.** Big Sky still renders **Slot 4 as empty** for fixes
the 2026-09-06 CIFP pull located — issue **#51**. S56's Slots 4 and 5 were brought current on 2026-10-27, when it got its procedures block and its player. The data and the panel sit in the same file,
disagreeing. A gap rendered after it has closed is invariant 2 failing in the direction nobody
watches for, and it costs more than a stale sentence: it teaches the trainee not to trust the
panel.

---

## Testing

- No Node on this machine as of 2026-09-01, so there is no headless harness. Both tools were verified by serving the folder over a local `System.Net.HttpListener` and driving the real pages: no console errors, area switching swaps sectors/Center parent/range/top-down correctly, the combining tree and ownership table resolve correctly, and the S56 notes round-trip through `localStorage` and the markdown export.
- The preview pane renders `file://` as a static snapshot, so a page opened that way cannot be driven. Serve the folder over HTTP to test interactively.
- When a change touches layout, describe what to look at.

---

## Session hygiene

Commit after each completed subtask. When aviation data is involved, cite which document and paragraph the number came from in the commit message. Long sessions: `/clear` and let this file re-anchor context. **One commit touches one ARTCC:** S56 and Big Sky may share a commit, and nothing under `ZMP/` or `ZAU/` may join it. Root `CLAUDE.md` §14.
