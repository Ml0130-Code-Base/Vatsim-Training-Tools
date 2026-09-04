# ZLC Training Toolset

Single-file, offline-first HTML training tools for VATSIM controllers working Salt Lake City ARTCC terminal facilities. Built on the pattern established by `../ZMP/M98 Training/` — read that CLAUDE.md before making architectural decisions here.

**Current state: skeleton.** The position selectors are real and their data is verified. The traffic engine, the scope, the clock and the grading are not built. Stubs on the page say so by name rather than rendering something plausible and empty.

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

## Student notes (S56)

The notes layer is not a scratchpad bolted on the side; it is the intake path for the next version of the tool.

- A note carries a `kind` (question, correction, technique, phraseology) and an `anchor` — either a sector id or one of the `OPEN_Q` ids.
- `OPEN_Q` holds the questions the source documents genuinely do not answer. They are listed on the page with the reason each is unanswerable, so a note against one is the thing that closes it.
- Notes persist to `localStorage` under `zlc-s56-skeleton-v1`, wrapped in try/catch. Where storage is unavailable the tool still works in memory and says so; the markdown export is the fallback.
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
2. **Routes and fixes.** Named but not located: KOURT, SPUUD, SADYL, JIMMI, KYANN, BEWTE, TOILS (BOI); BGSKY, BOBKT, MEADO, HIA (BZN); UDUZU, IRRON, NICHOL, HLMET, STACO (S56).
3. **Configuration.** S56 procedures branch on North Flow vs South Flow almost everywhere; the selector does not model flow yet, so duty text shows both branches. BOI branches on East vs West Flow the same way.

   **The geometry now carries the branch**, which is the natural way to model it when the selector grows one: every airspace block in `_shared/source-vatglasses/airspace.json` is gated on a runway configuration, and there are exactly four across the dataset — `KSLC 34L/R, 35` (North), `KSLC 16L/R, 17` (South), `KBOI 10L/R` (East), `KBOI 28L/R` (West). Selecting a flow selects which blocks exist. Big Sky shows it most clearly: Alpine and Sage **swap shapes** between east and west flow over the same total airspace.
4. **Engine and grading.** No aircraft model, no scope, no clock, no standing training items. In M98 the standing items came out of real session notes and were not invented to fill the slot; the same should happen here, which is what the S56 notes section is for.

---

## Testing

- No Node on this machine as of 2026-09-01, so there is no headless harness. Both tools were verified by serving the folder over a local `System.Net.HttpListener` and driving the real pages: no console errors, area switching swaps sectors/Center parent/range/top-down correctly, the combining tree and ownership table resolve correctly, and the S56 notes round-trip through `localStorage` and the markdown export.
- The preview pane renders `file://` as a static snapshot, so a page opened that way cannot be driven. Serve the folder over HTTP to test interactively.
- When a change touches layout, describe what to look at.

---

## Session hygiene

Commit after each completed subtask. When aviation data is involved, cite which document and paragraph the number came from in the commit message. Long sessions: `/clear` and let this file re-anchor context. **One commit touches one ARTCC:** S56 and Big Sky may share a commit, and nothing under `ZMP/` or `ZAU/` may join it. Root `CLAUDE.md` §14.
