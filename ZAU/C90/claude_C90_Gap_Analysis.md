# C90 Gap Analysis — what the documents do not answer

Assembled 2026-10-28 from `claude_C90_Reference.md` (vZAU C90 TRACON SOP 7110.65C, eff. 2026-03-14, 48 pages), `claude_C90_CIFP_Procedures.md` (CIFP 261001), the ZAU vNAS record (`../_vnas/claude_ZAU_vNAS_Reference.md`, held since 2026-10-22) and the community footprint (`../_shared/claude_ZAU_Sector_Geometry_Reference.md`).

**The headline: the internal sectorisation is a picture.** Appendices B (minimum vectoring altitudes), C (Feeder and Final delegated airspace, C-1 to C-11), D (ACCRA/UECKR protection and the SSAT climb corridor) and F (SSAT airspace by configuration, F-1 to F-9) are chart images with no text layer. The community dataset gives one polygon, surface to FL150, shared by four positions: it answers *inside the facility and under the lid*, not *which position owns this*.

This file records facts about what is missing. Work items live in the issue tracker (root `CLAUDE.md` section 14).

---

## Part 1 — What the owner has offered to supply, ranked by training value

Each ask is the smallest thing that unblocks the most work.

### 1. Which map is the sector boundary

The vNAS video maps are public (`claude_vNAS_Source_Reference.md`), but they are drawings titled by the facility and no map has been identified as the C90 Feeder, Final or Satellite split. *"Which video map is the O'Hare Final boundary, and which is the Feeder boundary?"* is a question a facility data admin can answer in one line. Issue **#42** carries the reference layer; the geometry ask is its own item.

### 2. The Arrival Descent Area shapes

Appendix C. The order's duties turn on them (4-3.b: no descent into the ADA without diverging or 3 NM from ORD departures on tower-assigned headings), and without them the tool cannot say whether a descent enters the ADA.

### 3. Does a Feeder position take its name from the fix of the same name?

PLANO, KUBBS, OKK and FARMM name Feeder positions (2-1). CIFP carries enroute waypoints with those names, but **no document says the position is named for the fix**, so their coordinates stay out of the tool. A yes closes it. Issue **#44**.

### 4. The 2-2 combining chain, checked against the rendered page

The text layer interleaves two side-by-side tables. The vNAS record also disagrees on two folds: KUBBS (J) into FARMM (Y), where the chain has FARMM into KUBBS, and South Satellite sector 1 (S) into East Departure (B), where the chain has it into Z. A glance at page 2-2 settles both.

### 5. Midway's SSAT altitude matrices (7-4)

Partial. The matrices are in the rendered page of the SOP; the text layer is not usable.

### 6. The ZAU and tower LOAs

ZAU-C90 LOA (release points, handoff altitudes, the P-ACP climb to 15,000) and C90-ORD, -MDW, -PWK, -MKE, -RFD and -SBN ATCT LOAs are named in the SOP and not pulled. These supply the interfaces the tool cannot currently grade.

### 7. Minimum vectoring altitudes (Appendix B)

Picture. No community source carries MVA.

---

## Part 2 — Not stated in any document, and not recoverable

| Item | Status |
|---|---|
| Runway inventories for the eight fields | Not in the SOP. CIFP 261001 carries them (the Runways tables in `claude_C90_CIFP_Procedures.md`); the order does not. |
| Handoff identifiers | In the vNAS ZAU record only: C90 is `ORT`/`OR`/`O` from ZAU's side, Field E `OneLetterAndSubset`, every radar position subset 1. **The deck does not carry them**, so no drill may quote one. |
| CIFP SIDs at O'Hare and Midway | **Checked and empty, CIFP 261001**: neither field has a coded SID of any type. A coding gap at those fields, not a field without departures. |
| ORD and MDW gate-to-fix links | No KORD or KMDW STAR names a Feeder fix. |

## Part 3 — Unread because it is a picture

Appendices B, C, D and F of the SOP. The SOP itself has a text layer for the rest.

## Part 4 — Conflicts and as-written anomalies, preserved

1. **Position count.** VATGlasses models four C90 positions; the SOP defines seventeen. Resolved 2026-10-22: the vNAS record carries all seventeen, so the community dataset is the short one. All seven modelled frequencies match the SOP.
2. **The combining chain** (Part 1, item 4) disagrees with vNAS in two places. Named, not resolved; the SOP is carried.
3. **South Satellite sector 4 frequency** is written `133.90` in 2-1 (two decimals). Carried as written.

## Part 5 — What is fully covered and needs nothing

- **Positions, callsigns and frequencies** (2-1), confirmed against vNAS.
- **Final runway responsibility** (4-3.b.1) for all four configurations.
- **Turn-on altitudes and capture points** (4-4, 4-5, 4-6).
- **Beacon blocks** (2-4): IFR 3101-3277, VFR 5101-5177.
- **Airports and tower symbols** (2-6.d).
- **North Satellite entry altitudes** (6-2.c).
- **Every published SID and STAR at the eight fields**, CIFP 261001: 18 STAR and 27 SID records, 293 fixes.
