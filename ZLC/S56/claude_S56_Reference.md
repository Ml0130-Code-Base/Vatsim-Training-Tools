# S56 reference — Salt Lake City Approach

Verified 2026-09-01 against `source-docs/S56_TRACON_7110_20C.pdf` (text layer in `source-docs/txt/`). That document cancels S56 SOP 7110.1B effective 2025-02-20.

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
- Routes VFR Category I, Category II and Category III turboprops per the SLC–S56 LOA.

### Alpine (3-9) — satellite

- **South Flow:** coordinate all IFR with **Jordan**.
- **North Flow with SIMULs:** coordinate PVU and SPK aircraft with **Final and Jordan**.
- Coordinate with **ZLC sector 32** to protect the missed approach on RNAV approaches into SPK.

---

## Class B

Appendix 1D: the number in each quadrant is the **bottom** of that shelf. The **top is 12,000** in all quadrants.

---

## Not established

These are the open questions the skeleton tool carries in its notes section. Answer them from a mentor, not from inference.

1. **Which sectors are primary.** Table 1-2-1 ends "Bold designates a primary position"; the ZLC sheet marks preferred combination points in light blue. Neither survives text extraction.
2. **What a single-controller S56 looks like.** The tree puts Lake, Bear and Valley all directly under Center, so closing everything but Lake sends Bear's and Valley's airspace to Center rather than to Lake. That is unlikely to be the real convention.
3. **Staffing order.** The ZLC sheet says `SLC_S_APP` is staffed before `SLC_K_APP` or `SLC_J_APP`, but its own tree puts Lake above Stockton. Parts of that sheet are demonstrably stale (it still names `BOI_S_APP` / `BOI_N_APP`).
4. **All geometry.** Appendices 1 and 3 are chart images with no text layer. Antelope, Keyhole, Jepson, Avon and Bird are gate names with no coordinates; P2, P3 and P4 are areas with no shape; the Heber Shelf line has no position. Fixes named but not located: UDUZU, IRRON, NICHOL, HLMET, STACO.

---

## Related facilities

| Airport | Positions | Source doc |
|---|---|---|
| SLC ATCT | `SLC_W_TWR` 132.650 · `SLC_C_TWR` 118.300 · `SLC_E_TWR` 118.100 · `SLC_A_TWR` 118.200 · `SLC_W_GND` 121.900 · `SLC_E_GND` 123.775 · `SLC_DEL` 127.300 | `SLC_ATCT_7110_1E.pdf`, `SLC_S56_LOA.pdf` |
| Hill AFB | `HIF_TWR` · `HIF_GND` · `HIF_DEL` 124.100 | `HIF_NFCT_7110_16A.pdf` |
| Ogden | `OGD_TWR` · `OGD_GND` | `OGD_FCT.pdf` |
| Provo | `PVU_TWR` · `PVU_GND` | `PVU_FCT.pdf` |

SLC tower frequencies above come from the ZLC Position and Frequency sheet and have **not** been re-verified against the SLC ATCT SOP narrative the way the TRACON ones were. Treat them as provisional.
