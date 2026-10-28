# S56 Gap Analysis — what the documents do not answer

Assembled 2026-10-28 from `claude_S56_Reference.md` (S56 TRACON SOP 7110.20C, eff. 2025-11-01), `claude_S56_CIFP_Procedures.md` (CIFP 261001), `../_shared/claude_ZLC_Positions_Reference.md`, `../_shared/claude_ZLC_Sector_Geometry_Reference.md` and `../_vnas/claude_ZLC_vNAS_Reference.md`.

**The headline: the sectors are carried and the gates are not.** All nine sector shapes come from the VATGlasses ZLC dataset, which ZLC vARTCC owns. The Antelope, Keyhole, Jepson, Avon and Bird gates, the P2, P3 and P4 areas and the Heber Shelf line are names without shapes in every source. The tool's six `OPEN_Q` questions are the rendered form of Part 2.

This file records facts about what is missing; work items are in the issue tracker.

---

## Part 1 — What the owner has offered to supply, ranked by training value

### 1. Where NICHOL is

SOP 3-5 uses it as the South Flow descent line (*no descent below 11,000 until established downwind and north of NICHOL*). No fix of that name exists in CIFP 260903, 261001 or 261029, so it reads as a local point off the video map. *"What is NICHOL, and where?"* Issue **#47**.

### 2. Which sectors are primary

Table 1-2-1 ends *"Bold designates a primary position"*; the bold does not survive extraction.

### 3. What a single-controller S56 looks like

The tree puts Lake, Bear and Valley directly under Center, so closing everything but Lake sends Bear's and Valley's airspace to Center, not to Lake. That is unlikely to be the convention.

### 4. Seven of nine parent TCPs disagree with vNAS

Seven of S56's nine parent TCPs in the vNAS record disagree with the AFV-tree chain the deck carries. Which is current closes it (`../_vnas/claude_ZLC_vNAS_Reference.md`).

### 5. The gates and the shelf line

Antelope, Keyhole, Jepson, Avon, Bird, P2, P3, P4 and the Heber Shelf line. Appendices 1 and 3 are images. Recovering them means measuring the images, or the facility naming the video maps.

### 6. Staffing order

The ZLC sheet says `SLC_S_APP` is staffed before `SLC_K_APP` or `SLC_J_APP`, while its own tree puts Lake above Stockton.

---

## Part 2 — Not stated in any document, and not recoverable

| Item | Status |
|---|---|
| Hill Air Force Base procedures | **Checked and empty, CIFP 261001**: no coded SID, STAR or approach. |
| Handoff identifiers | In the vNAS record only: S56 is `QQQ`/`Q`, Field E `OneLetterAndSubset`, every sector subset 1. **The deck does not carry them**, so no drill may quote one. |
| South Flow blocks for Alpine and Valley | None in the community dataset. That contradicts 3-9-2a; read it as a dataset gap, not as "the sector closes in South Flow". |
| MVA | No source. |
| SLC tower frequencies | From the ZLC sheet; not re-verified against the SLC ATCT narrative. Provisional. |

## Part 3 — Unread because it is a picture

SOP Appendices 1 and 3 (gates, P-areas, shelf line, sector diagrams 3A to 3I).

## Part 4 — Conflicts and as-written anomalies, preserved

1. **Roots.** VATGlasses routes every sector through Lake; the AFV tree gives three roots. The tool resolves on the AFV tree.
2. **Center sector.** VATGlasses reaches Center at sector 32; the AFV tree says `SLC_03_CTR`. The AFV tree is carried.
3. **Revision date.** The Record of Changes pairs `7110.20C` with 02/20/2025; re-pairing against the Explanation of Changes gives 11/01/2025.
4. **Stale ZLC sheet.** It names `BOI_S_APP` and `BOI_N_APP`, which are in no current table.

## Part 5 — What is fully covered and needs nothing

- **Nine sectors**: positions, callsigns and frequencies, quoted from narrative paragraphs and cross-checked against the ZLC sheet.
- **Flow definitions** (1-3-1).
- **Per-sector procedures** (3-1 to 3-9).
- **Class B** and **Table 2-3-7**, the eight fields.
- **Published procedures**: 13 STARs and 15 SIDs across seven fields, 164 fixes, CIFP 261001.
