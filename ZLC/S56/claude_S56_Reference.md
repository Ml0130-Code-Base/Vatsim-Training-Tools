# S56 reference — Salt Lake City Approach

Verified 2026-09-01 against `source-docs/S56_TRACON_7110_20C.pdf` (text layer in `source-docs/txt/`). Paragraph 1-1-4 reads *"This document cancels S56 SOP 7110.1B, effective February 20, 2025."*

**The revision itself is dated later than that, and the Record of Changes table hides it under extraction (2026-09-06).** The table renders its left column taller than its right — the trap the root `CLAUDE.md` §6 warns about — so the version, description, date and initials come out on different lines, and reading a row straight across pairs `7110.20C` with *"Minor revisions for SLC/PVU flight data overhaul"* and **02/20/2025**. Re-pairing by order against the document's own **Explanation of Changes** gives the correct alignment: the Explanation lists 2-4-4 Establish on RNAV, 2-3-3 secondary scratchpads, **3-8 Valley "Changed U42 to SVR"** and Appendix 3-C/3-E airspace diagrams — which is word for word the row described as *"Update to Independent Approaches, Change U42 To SVR, and Approach Boundary Changes"*, **effective 11/01/2025, issued by CN** (Cameron Negrete, the Air Traffic Manager named on the cover). **So 7110.20C is effective 2025-11-01**; February 20 2025 is the date 7110.1B stopped being the order, not the date this one started.

Every frequency below is quoted from that sector's own **"Monitor the … frequency"** paragraph in chapter 3, not read off Table 1-2-1 — the table's columns interleave under text extraction. Cross-checked against the ZLC Position and Frequency sheet, which agrees on all nine. See [the reconciliation](../_shared/claude_ZLC_Positions_Reference.md).

---

## Sectors

Radio name **"Salt Lake City Approach"**.

| Sector | STARS ID | Callsign | Frequency | Airspace | SOP | Character |
|---|---|---|---|---|---|---|
| Lake | K | `SLC_K_APP` | 135.500 | App 3D | 3-1 | primarily departure control |
| Gunnison | G | `SLC_G_APP` | 126.250 | App 3G | 3-2 | primarily departure control |
| Bear | B | `SLC_B_APP` | 124.900 | App 3B | 3-3 | primarily arrival control |
| Hart | H | `SLC_H_APP` | 121.100 | App 3H | 3-4 | OGD / HIF / BMC satellite |
| Final | F | `SLC_F_APP` | 125.700 | App 3F | 3-5 | final |
| Jordan | J | `SLC_J_APP` | 128.600 | App 3C | 3-6 | arrival and departure |
| Stockton | S | `SLC_S_APP` | 128.100 | App 3E | 3-7 | downwind feeds |
| Valley | V | `SLC_V_APP` | 120.900 | App 3I | 3-8 | VFR under the Class B shelf |
| Alpine | A | `SLC_A_APP` | 118.850 | App 3A | 3-9 | PVU / SPK satellite |

All sectors except Hart and Alpine are delegated their airspace *excluding* airspace owned by Valley and SLC ATCT. Jordan additionally excludes Alpine.

There is a second sector called **Alpine** in Big Sky (`BOI_A_APP`, 126.900). Different facility, different frequency.

### Combining chain

```
SLC_03_CTR  Salt Lake Center sector 3 (Area B)
├── Lake
│   ├── Jordan
│   └── Stockton
│       └── Alpine  → PVU_TWR → PVU_GND
├── Valley
└── Bear
    ├── Gunnison
    │   └── Hart  → OGD_TWR/GND, HIF_TWR/GND/DEL
    └── Final  → SLC_C_TWR → SLC_W_TWR / SLC_E_TWR / SLC_A_TWR
```

Three sectors sit directly under Center: **Lake, Bear and Valley**.

---

## Flow definitions (1-3-1)

- **North Flow** — SLC using runways 34L, 34R, 35 and 32.
- **South Flow** — SLC using runways 16L, 16R, 17 and 14.

Altitudes are MSL except cloud ceilings, which are AAE. VFR airspace: every position is assigned the 500-foot altitude below its designated airspace altitude, except where that airspace overlies Alpine, Valley or SLC ATCT (1-3-3).

---

## Per-sector procedures

### Lake (3-1) — departure

- North Flow: SLC departures filed V21/V101, or landing in Hart airspace, go through the **Antelope Gate** (App 1A) on **310°–340°**, climbing to **10,000**.
- South Flow: same routing through Antelope (App 1B) on **330°–340°**, climbing to **10,000**.
- Hart does not have control of these aircraft until they are inside Hart airspace.
- VFR Category I & II landing in or transiting Local airspace from the east: route over I-80 to I-15 descending to **9,000** with a Class B clearance.
- Cross the **Heber Shelf** line at or above **13,000**, or 1,000 above any other altitude coordinated with ZLC.

### Gunnison (3-2) — departure

- Transiting aircraft (not SLC departures) landing **LGU, BMC, OGD or HIF**: through the **Keyhole Gate** on **330°–340°** at **12,000**.
- Hand those off to **Hart** before the aircraft passes the Keyhole gate. Hart has control for descent.

### Bear (3-3) — arrival

- **South Flow:** sequence IFR and Category III turbojets to **16L or 17**.
  - SIMULs — runway 17 aircraft cleared for the approach **prior to UDUZU**; scratchpads updated before the **P3 Area**; communications to Local before SLC ATCT airspace but no sooner than **7 NM** from its lateral boundary.
  - Staggers — scratchpad updated before beginning the handoff to Final; sequence all arrivals onto the **16L localizer**; assign **11,000 and 210 knots**; handoff to Final **prior to IRRON**.
  - Visuals — 16L/17 aircraft cleared with scratchpad updated before the P3 Area; comms to Local as above.
- **North Flow:** sequence into the **34L downwind**; established at **11,000 and 210 knots** before Final airspace.
- Satellites: approval from **Hart** before any HI-ILS or HI-TACAN into HIF. Initial sequence of IFR Avon/Bird gate arrivals for HIF, OGD, BMC at **12,000**, handed to Hart.

### Hart (3-4) — satellite

- OGD/HIF/BMC departures transiting Lake or Gunnison: through the **Jepson Gate** on **240°–250°** at **9,000**.
- BMC IFR clearance: *"Cleared to the Ogden VORTAC via the Ogden (number) obstacle departure procedure, maintain 6,000. Expect further clearance at the Ogden VORTAC, departure frequency 121.1, squawk (code). Hold for release."*

### Final (3-5)

- Uses scratchpad information on 16L/34R and 17/35 arrivals to apply the right separation. **Final is responsible for separation from Bear/Jordan traffic during visuals and SIMULs.**
- The **30° turn to final** is assigned at no more than **210 knots**.
- Communications to Local before SLC ATCT airspace, no sooner than **7 NM** from its boundary.
- **South Flow:** no descent below **11,000** until established downwind and **north of NICHOL**. Sequence to **16R**. When visuals are in use Final may sequence 16L if Bear is sequencing 17.
- **North Flow:** no descent below **11,000** until established downwind and **abeam the 34L approach end**. Sequence to **34L**. When visuals are in use Final may sequence 34R if Jordan is sequencing 35.

### Jordan (3-6)

- **South Flow:** departures may climb and turn within the **P2 Area**. When Stockton traffic is present, Jordan takes responsibility for separation from it.
- **North Flow:** sequence to **34R or 35**. During SIMULs, runway 35 aircraft cleared **prior to HLMET**; scratchpads updated before the **P4 Area**; comms to Local before SLC ATCT airspace, no sooner than 7 NM.

### Stockton (3-7)

- **North Flow:** sequence into the **34L downwind**. Stockton ensures sequencing and in-trail spacing with Bear arrivals — **Bear does not share this responsibility**.
- **South Flow:** sequence into the **16R downwind**.
- Transiting aircraft landing LGU/BMC/OGD/HIF: heading toward the **Keyhole gate** at **15,000**, 250 knots or less, handed to Gunnison.
- TVY clearance: *"Cleared to the STACO intersection via the STACO (number) departure, climb via SID. Expect further clearance at STACO, departure frequency 128.1, squawk (code). Hold for release."*

### Valley (3-8) — VFR

- May work to the lateral boundary of its airspace outside SLC Class B, and to the sector boundary over **I-15**.
- **Final, Lake, Jordan, Alpine and Bear** keep their aircraft clear of Valley airspace — not the other way round.
- Routes VFR Category I, Category II and Category III turboprops per the SLC–S56 LOA (3-8-2a).
- **SVR clearances (3-8-2b).** RNAV-capable aircraft get the **SVALY#**: *"Cleared to the Fairfield VORTAC via the South Valley (current number) departure, maintain 9,000. Expect further clearance at Fairfield, departure frequency 120.9, squawk (code). Hold for release."* Non-RNAV aircraft get the **SVR obstacle departure procedure** instead — runway 16 to the **FFU** VORTAC climbing to **11,000**, runway 34 to the **TCH** VORTAC climbing to **9,000**.
- **BTF clearances (3-8-2c).** Skypark departures are **strongly encouraged to depart VFR** because of the proximity to SLC, and a VFR departure must talk to SLC ATCT. An IFR release requires coordination with SLC ATCT first, and **during North Flow SLC ATCT holds all its own departures** before releasing one.

### Alpine (3-9) — satellite

- **South Flow:** coordinate all IFR with **Jordan**.
- **North Flow with SIMULs:** coordinate PVU and SPK aircraft with **Final and Jordan**.
- Coordinate with **ZLC sector 32** to protect the missed approach on RNAV approaches into SPK.

---

## Class B

Appendix 1D: the number in each quadrant is the **bottom** of that shelf. The **top is 12,000** in all quadrants.

---

## The eight fields — Table 2-3-7

**The airport list is the SOP's own, not an assembled one.** Table 2-3-7, *VFR Practice Approach Airport Designators*, names eight fields and gives each the letter that goes third in a practice-approach scratchpad entry (2-3-5; see the Table 2-3-8 examples — `PIJ` is a practice ILS at PVU, `POO` a practice VOR at OGD, `PTZ` a practice TACAN at HIF).

| Designator | Field | Departure clearance issued by | STARs | SIDs | Approaches | Runways |
|---|---|---|---|---|---|---|
| **A** | **KSLC** Salt Lake City International | — | 11 | 8 | 22 | 14, 16L, 16R, 17, 32, 34L, 34R, 35 |
| **C** | **KBMC** Brigham City Regional | Hart, 3-4-2b | 0 | 1 | 1 | 17, 35 |
| **Z** | **KHIF** Hill Air Force Base | — | **0** | **0** | **0** | 14, 32 |
| **O** | **KOGD** Ogden-Hinckley | — | 1 | 1 | 4 | 03, 17, 21, 35 |
| **J** | **KPVU** Provo Municipal | — | 1 | 2 | 3 | 13, 18, 31, 36 |
| **S** | **KSPK** Spanish Fork Municipal | — | 0 | 1 | 2 | 12, 30 |
| **T** | **KTVY** Bolinder Field-Tooele Valley | Stockton, 3-7-2d | 0 | 1 | 3 | 17, 35 |
| **K** | **KSVR** South Valley Regional | Valley, 3-8-2b | 0 | 1 | 1 | 16, 34 |

The designator letter is a **scratchpad character, not a sector** — `K` against South Valley is the practice-approach code, and Lake's sector letter is also `K`. Do not read the column as ownership. The procedure counts come from **CIFP 260903**; every transition, crossing altitude, speed limit and fix coordinate is in [`claude_S56_CIFP_Procedures.md`](claude_S56_CIFP_Procedures.md), and the tool carries the same inventory and renders it on the Fly page.

**Skypark (BTF) is a ninth field the SOP works and Table 2-3-7 does not list.** Valley issues its IFR clearances too (3-8-2c), with SLC ATCT coordination required before release and all SLC departures held during North Flow. It is outside this table because the table is about practice approaches, not about which fields exist.

### Three SOP clearances name the exact procedure CIFP codes

This is the check that these are the right procedures and not lookalikes — the facility's phraseology and the FAA's coded data agree by name.

- **3-4-2b, Brigham City** — *"cleared to the Ogden VORTAC via the Ogden (number) obstacle departure procedure"*. CIFP codes exactly one KBMC departure, **`OGD1`**, and both its runway transitions terminate at the OGD VORTAC.
- **3-7-2d, Tooele** — *"cleared to the STACO intersection via the STACO (current number) departure, climb via SID"*. CIFP codes exactly one KTVY departure, **`STACO2`**, and both its runway transitions terminate at STACO.
- **3-8-2b, South Valley** — *"RNAV-capable aircraft must be assigned the SVALY# departure procedure"*, cleared to the Fairfield VORTAC, maintain 9,000, departure frequency 120.9. CIFP codes exactly one KSVR departure, **`SVALY2`**, and both its runway transitions terminate at FFU.

  Non-RNAV aircraft get the **SVR ODP** instead: runway 16 to the FFU VORTAC climbing to **11,000**, runway 34 to the TCH VORTAC climbing to **9,000**. That one is not in CIFP — an ODP that is not RNAV-coded has no CIFP record — so the altitudes above are the SOP's and have no second source.

### Hill Air Force Base has no coded procedure at all

CIFP lists no KHIF SID, STAR or approach, and codes **no TACAN approach anywhere in the cycle**. The HI-ILS and HI-TACAN that 3-3-3a makes Bear get Hart's approval for are not recoverable from that source, and neither is the practice TACAN that Table 2-3-8 codes as `PTZ`. They have to come from the facility or from DoD FLIP. The airport reference point and both runway thresholds are all CIFP carries, so the tool lists the field with an empty procedure set rather than leaving it out.

### South Valley Regional is SVR, and the SOP is what changed it

**`SVR`, not `U42`** — and the citation is the governing order itself, not the coded data. Revision **7110.20C, effective 11/01/2025**, is titled *"Update to Independent Approaches, Change U42 To SVR, and Approach Boundary Changes"*, and its Explanation of Changes says under **3-8 Valley**: *"Changed U42 to SVR."* CIFP 260903 agrees — its airport record reads `SOUTH VALLEY RGNL`, N40 37 10.37 / W111 59 34.40, elevation 4,606 — and so does the VATGlasses ZLC dataset, which keys the field `KSVR`. Cycle 260903 carries no `U42` record at all.

---

## Not established

These are the open questions the skeleton tool carries in its notes section. Answer them from a mentor, not from inference.

1. **Which sectors are primary.** Table 1-2-1 ends "Bold designates a primary position"; the ZLC sheet marks preferred combination points in light blue. Neither survives text extraction.
2. **What a single-controller S56 looks like.** The tree puts Lake, Bear and Valley all directly under Center, so closing everything but Lake sends Bear's and Valley's airspace to Center rather than to Lake. That is unlikely to be the real convention.
3. **Staffing order.** The ZLC sheet says `SLC_S_APP` is staffed before `SLC_K_APP` or `SLC_J_APP`, but its own tree puts Lake above Stockton. Parts of that sheet are demonstrably stale (it still names `BOI_S_APP` / `BOI_N_APP`).
4. **The gates and the shelf lines.** Antelope, Keyhole, Jepson, Avon and Bird are gate names with no coordinates; P2, P3 and P4 are areas with no shape; the Heber Shelf line has no position; no MVA data exists in any source. Appendices 1 and 3 are chart images with no text layer, so recovering these still means carving the images out and measuring them.

   **Four of the five named fixes are now located (2026-09-06)** — UDUZU, IRRON, HLMET and STACO all carry coordinates in [the CIFP file](claude_S56_CIFP_Procedures.md). **NICHOL does not, and no fix of that name exists anywhere in CIFP 260903.** 3-5 uses it as the South Flow descent line, so it reads as a local point off the video map rather than a published waypoint, and it stays an owner ask. CIFP closes fix positions and nothing else: the gates, the areas and the shelf line are untouched by it.

   **The sector boundaries themselves are no longer missing (2026-09-02)** — see [the geometry reference](../_shared/claude_ZLC_Sector_Geometry_Reference.md). All nine sectors now have a lateral extent, runway-gated altitude blocks and an ownership chain, from the VATGlasses ZLC dataset. VATGlasses draws sectors, not gates, so the list above is what it did **not** close.
5. **Handoff identifiers — a live blocker.** There is no source for these anywhere in the repository. The community dataset carries none (its keys `S5K`, `S5B` are display handles, not STARS IDs) and no ZLC vNAS record is held locally. Until `curl -sL "https://data-api.vnas.vatsim.net/api/artccs/ZLC"` is pulled, **no drill may quote a handoff ID for S56.**
6. **Two divergences with the community dataset**, named rather than resolved. VATGlasses routes every S56 sector through **Lake** — a single root — where the AFV tree gives three (Lake, Bear, Valley); and every VATGlasses chain reaches Center at **sector 32**, where the AFV tree says **`SLC_03_CTR`**. The tool resolves on the AFV tree because a facility document outranks community data.
7. **Alpine and Valley have no South Flow blocks** in the community dataset — every block for both is gated `KSLC 34L/R, 35`. That contradicts 3-9-2a ("During South Flow, coordinate all IFR aircraft with Jordan"), so it reads as a dataset gap rather than an operational fact. Do not read it as "the sector closes in South Flow".

---

## Related facilities

| Airport | Positions | Source doc |
|---|---|---|
| SLC ATCT | `SLC_W_TWR` 132.650 · `SLC_C_TWR` 118.300 · `SLC_E_TWR` 118.100 · `SLC_A_TWR` 118.200 · `SLC_W_GND` 121.900 · `SLC_E_GND` 123.775 · `SLC_DEL` 127.300 | `SLC_ATCT_7110_1E.pdf`, `SLC_S56_LOA.pdf` |
| Hill AFB | `HIF_TWR` · `HIF_GND` · `HIF_DEL` 124.100 | `HIF_NFCT_7110_16A.pdf` |
| Ogden | `OGD_TWR` · `OGD_GND` | `OGD_FCT.pdf` |
| Provo | `PVU_TWR` · `PVU_GND` | `PVU_FCT.pdf` |

SLC tower frequencies above come from the ZLC Position and Frequency sheet and have **not** been re-verified against the SLC ATCT SOP narrative the way the TRACON ones were. Treat them as provisional.
