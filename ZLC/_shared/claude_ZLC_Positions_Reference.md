# ZLC position and frequency reference

Verified 2026-09-01 against the vZLC resource set in `_shared/source-docs/`, `../Big Sky/*/source-docs/` and `../S56/source-docs/`. Every number below traces to a named document and paragraph. **Nothing here is inferred from callsign patterns or from real-world charts.**

Source of the document set: <https://zlcartcc.org/controllers> (assets served from `zlcassets.vsimtech.org`).

---

## How the frequency column was recovered

The three documents that carry position tables all render those tables with a taller row height in the left-hand columns than in the right-hand ones. `pdftotext -layout` therefore emits the name column and the frequency column on **different lines**, and reading a table row straight across the extracted text gives the wrong frequency. This is a text-extraction artifact, not a disagreement between the documents.

The columns were re-paired by order and then checked against the narrative paragraphs, which state each frequency in prose. All three documents agree once that is done:

| Check | Table says (raw text) | Narrative paragraph says | Agreed |
|---|---|---|---|
| BOI Sage | `126.900` on the Sage line | BOI 7110.2B **3-3-1a** "Monitor the Sage frequency (119.600 MHz)" | **119.600** |
| BOI Alpine | `118.975` on the Alpine line | BOI 7110.2B **3-2-1a** "Monitor the Alpine frequency (126.900 MHz)" | **126.900** |
| BZN Bozeman | blank | BOI 7110.2B **3-4-1a** "Monitor the Bozeman frequency (118.975 MHz)"; BZN FCT Clearance §4 "Big Sky 118.975" | **118.975** |
| S56 Bear | `124.900` | S56 7110.20C **3-3-1a** "Monitor the Bear frequency (124.900 MHz)" | **124.900** |
| S56 Gunnison | `126.250` on the Bear line | S56 7110.20C **3-2-1a** "Monitor the Gunnison frequency (126.250 MHz)" | **126.250** |

The ZLC *Position and Frequency Info* sheet lists all twenty TRACON frequencies in one column, in the same order, and every one of them matches the facility SOP once the pairing is corrected. Three independent documents, no residual conflict.

### Confirmed a fourth time, from outside the document set (2026-09-02)

The re-pairing above was the weakest link in this file: it is a judgement about extraction
order, and until now every source confirming it came from the same vZLC document set. It has
now been checked against a **fully independent** source — the VATGlasses ZLC dataset
(`lennycolton/vatglasses-data` @ `c469b42`, 2026-08-26), which is community-maintained by vACC
staff and derived from no part of our pull. See `../../claude_Community_Geometry_Sources.md`.

**All twenty frequencies match** — the nine S56 sectors, the three Big Sky sectors, and the
eight neighbouring facilities in the table at the end of this file. Critically, VATGlasses
sides with the **narrative paragraphs** on all three of the corrections above:

| Sector | Raw table said | We adopted | VATGlasses key | VATGlasses says |
|---|---|---|---|---|
| BOI Sage | `126.900` | **119.600** | `B1S` "Big Sky - Sage" | **119.600** |
| BOI Alpine | `118.975` | **126.900** | `B1A` "Big Sky - Alpine" | **126.900** |
| BZN Bozeman | blank | **118.975** | `B1Z` "Big Sky - Bozeman" | **118.975** |

The sector *names* attached to those frequencies match too, which is the part the raw table
could not settle. **Treat the frequency column as settled.**

**One divergence, recorded not resolved** (root `CLAUDE.md` §6): VATGlasses voices `M1S`
(134.100) as **"Mountain Home Approach"**, and names its two Mountain Home airspace entries
*"Mountain Home - Alpine/X-RAY South"* and *"Mountain Home - Sage/X-RAY South"* — **both South,
neither North**. This file has `MUO_S_APP` voiced **"Cowboy Control"** sector *Cowboy*, and
`MUO_N_APP` sector *X-Ray North*, from `MUO_NFCT_RAPCON.pdf`. The frequencies agree; the naming
does not. **Ours is documentary and stands**; the disagreement is an owner question, not a
correction to make here.

---

## Big Sky Approach

One radio name — **"Big Sky Approach" / "Big Sky Departure"** (BOI 7110.2B 3-1-1) — covering two areas that **do not share an airspace boundary**. Boise is in southwest Idaho; Bozeman is in southwest Montana. A sector in one area never combines with a sector in the other.

### BOI area

| Sector | STARS ID | VATSIM callsign | Frequency | Airspace | Source |
|---|---|---|---|---|---|
| Sage Radar (SAG) | G | `BOI_G_APP` | 119.600 | App 1B (East Flow) / 1C (West Flow) | BOI 7110.2B 3-3-1 |
| Alpine Radar (ALP) | A | `BOI_A_APP` | 126.900 | App 1B (East Flow) / 1C (West Flow) | BOI 7110.2B 3-2-1 |

- **Sage is the base.** BOI 7110.2B 3-3-1c: Sage "assume[s] Alpine responsibilities when combined." The AFV inheritance tree agrees — `BOI_G_APP` inherits `BOI_A_APP`, which inherits `BOI_TWR` → `BOI_GND` → `BOI_DEL`.
- Sage sequences BOI IFR arrivals to Alpine (3-3-2b, Tables 3-2-1 East / 3-2-2 West). Alpine sequences all arrivals to the field except VFR handed to Local (3-2-2a).
- Aircraft handed from Sage are released for turns and descent, **except** arrivals in the southernmost downwind during East Flow (3-2-3b).
- Range setting: both sectors display a minimum of **11 NM** outside delegated airspace (3-2-3a, 3-3-2a).
- `MUO_N_APP` (Mountain Home, "X-Ray North") sits under `BOI_A_APP` in the AFV tree but is a **separate facility with its own radio name**, not a Big Sky sector.

### BZN area

| Sector | STARS ID | VATSIM callsign | Frequency | Airspace | Source |
|---|---|---|---|---|---|
| Bozeman Radar (APB) | *not stated* | `BZN_APP` | 118.975 | App 1D | BOI 7110.2B 3-4-1 |

- Bozeman is documented **inside the BOI ATCT/TRACON SOP** (Chapter 3 Section 4) even though it is a separate area. That is a documentation convenience, not a shared boundary.
- No sibling sector: Bozeman has nothing to combine with inside Big Sky. In the AFV tree it inherits `BZN_TWR` → `BZN_GND` → `BZN_DEL` and folds upward to **`SLC_08_CTR` → `SLC_06_CTR` (Center Area A)**, not to Boise.
- Range setting: minimum **10 NM** outside delegated airspace (3-4-2a) — note this differs from the BOI area's 11 NM.
- Coordinates with **Bozeman FCT** for the approach in use on the ATIS, and for any approach other than the one advertised (3-4-2b, c).
- The STARS ID for Bozeman Radar is blank in Table 1-2-1. **Unverified — confirm with a mentor.**

---

## S56 — Salt Lake City Approach

Radio name **"Salt Lake City Approach"**. Nine sectors (S56 7110.20C Table 1-2-1, frequencies confirmed against Chapter 3).

| Sector | STARS ID | VATSIM callsign | Frequency | Airspace | Character | Source |
|---|---|---|---|---|---|---|
| Lake | K | `SLC_K_APP` | 135.500 | App 3D | primarily departure control | 3-1-1 |
| Gunnison | G | `SLC_G_APP` | 126.250 | App 3G | primarily departure control | 3-2-1 |
| Bear | B | `SLC_B_APP` | 124.900 | App 3B | primarily arrival control | 3-3-1 |
| Hart | H | `SLC_H_APP` | 121.100 | App 3H | OGD / HIF / BMC satellite | 3-4-1 |
| Final | F | `SLC_F_APP` | 125.700 | App 3F | final | 3-5-1 |
| Jordan | J | `SLC_J_APP` | 128.600 | App 3C | arrival / departure | 3-6-1 |
| Stockton | S | `SLC_S_APP` | 128.100 | App 3E | downwind feeds | 3-7-1 |
| Valley | V | `SLC_V_APP` | 120.900 | App 3I | VFR under the Class B shelf | 3-8-1 |
| Alpine | A | `SLC_A_APP` | 118.850 | App 3A | PVU / SPK satellite | 3-9-1 |

Chapter 3 presents the sectors in the order Lake, Gunnison, Bear, Hart, Final, Jordan, Stockton, Valley, Alpine. Table 1-2-1 lists them alphabetically. Neither order is stated to mean anything.

### Combining chain (AFV inheritance tree)

```
SLC_03_CTR  (Center Sector 3, Area B)
├── SLC_K_APP   Lake
│   ├── SLC_J_APP   Jordan
│   └── SLC_S_APP   Stockton
│       └── SLC_A_APP   Alpine  → PVU_TWR → PVU_GND
├── SLC_V_APP   Valley
└── SLC_B_APP   Bear
    ├── SLC_G_APP   Gunnison
    │   └── SLC_H_APP   Hart  → OGD_TWR/GND, HIF_TWR/GND/DEL
    └── SLC_F_APP   Final  → SLC_C_TWR → SLC_W_TWR/E_TWR/A_TWR …
```

Three sectors sit directly under Center — **Lake, Bear and Valley**. Everything else folds into one of those three.

### Two things that are genuinely unresolved

1. **Which positions are "primary".** Both SOP tables end with "Bold designates a primary position", and the ZLC sheet says light-blue entries are the preferred combination points. Bold and colour are lost in text extraction, so *which* positions those are cannot be read from the text layer. The tool marks this slot empty rather than guessing.
2. **A contradiction about staffing order.** The ZLC sheet's worked example says "SLC_S_APP should be staffed prior to opening SLC_K_APP or SLC_J_APP", but the inheritance tree puts **Lake above Stockton**, not below it. The same sheet's Boise example refers to `BOI_S_APP` and `BOI_N_APP`, callsigns that do not exist anywhere in the current position tables (the BOI sectors are `BOI_G_APP` Sage and `BOI_A_APP` Alpine) — so that section of the sheet appears to predate a renaming. Treat the tree as structural and the worked examples as stale until a mentor confirms.

### Name collision worth knowing

There are **two sectors called Alpine**: `SLC_A_APP` (Salt Lake City Approach Alpine, 118.850) and `BOI_A_APP` (Big Sky Approach Alpine, 126.900). Both tools label the facility on the sector chip for exactly this reason.

---

## Neighbouring facilities that appear in the trees

| Callsign | Radio name | Sector title | Frequency |
|---|---|---|---|
| `BIL_N_APP` | Billings Approach | North | 119.200 |
| `BIL_S_APP` | Billings Approach | South | 120.500 |
| `GTF_APP` | Great Falls Approach | Great Falls | 128.600 |
| `MSO_APP` | Spokane Approach | Missoula | 124.900 |
| `MUO_N_APP` | Mountain Home Approach | X-Ray North | 124.800 |
| `MUO_S_APP` | Cowboy Control | Cowboy | 134.100 |
| `HLN_APP` | Helena Approach | Helena | 119.500 |
| `TWF_APP` | Twin Falls Approach | Twin Falls | 126.700 |

Note `MSO_APP` is voiced as **Spokane** Approach, not Missoula Approach.

---

## Source documents

Held in `source-docs/`, text layers in `source-docs/txt/`.

**Shared** — `ZLC_Position_And_Frequency_Info.pdf` (AFV tree + all frequencies), `ZLC_ARTCC_7110_65D.pdf`, `ZLC_Flight_Strip_Handling_7210_3A.pdf`, `ZLC_Scratchpad_Entry_7210_4A.pdf`.

**BOI** — `BOI_ATCT_TRACON_7110_2B.pdf` (cancels 7110.2A of 2024-11-01), `BOI_ZLC_LOA.pdf`, `MUO_NFCT_RAPCON.pdf`, `TWF_ATCT_APPROACH_7110_12B.pdf`, `SUN_FCT_7110_13A.pdf`.

**BZN** — `BZN_FCT.pdf`, `GTF_ATCT_TRACON.pdf`, `HLN_ATCT_APPROACH_7110_11B.pdf`, `BIL_ATCT_TRACON_7110_3B.pdf`, `BIL_ZLC_LOA.pdf`, `MSO_FCT_TRACON.pdf`, `GPI_FCT_7110_8A.pdf`.

**S56** — `S56_TRACON_7110_20C.pdf` (cancels 7110.1B, effective 2025-02-20), `S56_ZLC_LOA.pdf`, `SLC_S56_LOA.pdf`, `SLC_ATCT_7110_1E.pdf`, `HIF_NFCT_7110_16A.pdf`, `OGD_FCT.pdf`, `PVU_FCT.pdf`, `S56_ERAM_Splits.pdf`, `SLC_Gate_Index.pdf`.

**Not downloaded, referenced by the SOPs and still needed:** the airspace appendices are chart images with no text layer, so every delegated-airspace boundary, gate and shelf altitude in this repo is currently a name without geometry.
