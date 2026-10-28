# Big Sky Gap Analysis — what the documents do not answer

Assembled 2026-10-28 from `BOI/claude_BOI_Reference.md` (BOI ATCT/TRACON SOP 7110.2B), `BZN/claude_BZN_Reference.md` (BZN FCT and BOI SOP chapter 3 section 4), `claude_BigSky_CIFP_Procedures.md` (CIFP 261001), `../_shared/claude_ZLC_Positions_Reference.md`, `../_shared/claude_ZLC_Sector_Geometry_Reference.md` and `../_vnas/claude_ZLC_vNAS_Reference.md`.

**The headline: three sector shapes are carried, and everything between them is a picture.** The Ellis Corridor, the pre-arranged coordination areas and the arrival zones (BOI Appendices 1A, 2A to 2B, 3A to 3B) are chart images. Bozeman is documented inside the Boise SOP as a filing convenience; the two areas share no boundary.

This file records facts about what is missing; work items are in the issue tracker.

---

## Part 1 — What the owner has offered to supply, ranked by training value

### 1. Where KYANN is, and which spelling is right

The BOI SOP (`BOI_ATCT_TRACON_7110_2B.txt:794`) and the BOI-ZLC LOA (`BOI_ZLC_LOA.txt:159`) both spell the fix `KYANN`. CIFP codes the KBOI STAR as `KYAAN4` and its fix `KYAAN`. `KYANN` exists in CIFP only as an en route waypoint in Texas, about 1,300 NM away. Preserved as written (root `CLAUDE.md` section 6). Issue **#48**.

### 2. The STARS ID for Bozeman Radar

Blank in BOI Table 1-2-1. The vNAS record has it (`NNN`/`N`, radar position TCP 1B), but the deck does not carry it.

### 3. Does Bozeman Radar have arrival sequencing tables?

None appear in the source; BZN FCT Local lists IFR arrivals as "N/A", which is unlikely to mean what it says.

### 4. The Ellis Corridor, PACP areas and arrival zones

Pictures. No shapes in any source.

### 5. Which positions are primary

Table 1-2-1 ends *"Bold designates a primary position"*; the bold does not survive extraction.

### 6. The blank altitudes in the arrival tables

Several cells in BOI Tables 3-2-1 and 3-2-2 are blank in the source. They stay blank.

---

## Part 2 — Not stated in any document, and not recoverable

| Item | Status |
|---|---|
| Handoff identifiers | In the vNAS record only: Boise `BBB`/`B` (Sage `1G`, Alpine `1A`), Bozeman `NNN`/`N`. **The deck does not carry them**, so no drill may quote one. |
| MVA | No source. |
| Route geometry for the arrival tables | CIFP gives the fixes; the SOP's headings (280, 100) have no shape. |
| The deck's Slot 4 | Still lists fixes as unlocated that the 2026-09-06 CIFP pull located (issue **#51**). |

## Part 3 — Unread because it is a picture

BOI Appendices 1A, 2A, 2B, 3A and 3B.

## Part 4 — Conflicts and as-written anomalies, preserved

1. **KYANN / KYAAN**, above.
2. **Sage and Alpine.** The SOP is directional (3-3-1c: Sage assumes Alpine); VATGlasses lists them as mutually covering. The SOP wins.
3. **Bozeman's fold.** The AFV tree gives `BZN_APP → SLC_08_CTR → SLC_06_CTR`; VATGlasses gives `B1Z → 06`, never through 08. Both agree it never folds into Boise. The AFV tree is carried.
4. **Mountain Home's radio name.** VATGlasses has it wrong; vNAS confirms the right name.
5. **Stale ZLC sheet.** Its Boise example names `BOI_S_APP` and `BOI_N_APP`, in no current table.
6. **Bozeman's second frequency**, 119.550 "LVM" in vNAS, appears in no reference.

## Part 5 — What is fully covered and needs nothing

- **Three sectors**: frequencies from narrative paragraphs (SAG 119.600, ALP 126.900, APB 118.975), confirmed by vNAS.
- **Tower positions** (top-down), both areas.
- **Boise arrival sequencing** (3-2-1, 3-2-2), as written.
- **Bozeman departures and missed approach**.
- **Published procedures**: 5 STARs and 2 SIDs at Boise, 5 and 5 at Bozeman, 94 fixes, CIFP 261001. BOI3 is a Vector SID.
- **Persistence** (issue #45, 2026-10-28): the frame and the weather text, under `bigsky-drill-deck-v1`.
