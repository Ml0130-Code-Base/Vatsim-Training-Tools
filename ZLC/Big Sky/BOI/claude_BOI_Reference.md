# BOI area reference — Big Sky Approach

Boise, southwest Idaho. Verified 2026-09-01 against `source-docs/BOI_ATCT_TRACON_7110_2B.pdf` (text layer in `source-docs/txt/`). That document cancels 7110.2A dated 2024-11-01.

The BOI area and the [BZN area](../BZN/claude_BZN_Reference.md) **do not share an airspace boundary**. They share a radio name and a document, nothing else.

---

## Sectors

Controllers on either sector identify as **"Big Sky Approach"** or **"Big Sky Departure"** (3-1-1).

| Sector | STARS ID | Callsign | Frequency | Airspace |
|---|---|---|---|---|
| Sage Radar (SAG) | G | `BOI_G_APP` | 119.600 | App 1B East Flow / 1C West Flow |
| Alpine Radar (ALP) | A | `BOI_A_APP` | 126.900 | App 1B East Flow / 1C West Flow |

Frequencies are taken from 3-3-1a and 3-2-1a, which state them in prose. **Table 1-2-1 must not be read straight across** — its left columns render taller than its right columns and `pdftotext` interleaves them, which shifts the frequency column by one row. See [the reconciliation](../../_shared/claude_ZLC_Positions_Reference.md).

**Sage is the base.** 3-3-1c: Sage assumes Alpine's responsibilities when combined. The AFV tree agrees (`BOI_G_APP` inherits `BOI_A_APP`). With nobody open the area folds to `SLC_30_CTR`.

### Sage (3-3)

- Sequences BOI IFR arrivals to Alpine per Table 3-2-1 (East Flow) or 3-2-2 (West Flow).
- Range: minimum 11 NM outside delegated airspace.
- Departures: Sage aircraft may depart Local Control airspace through the areas in Appendix 2 (1-3, dep. procedures).

### Alpine (3-2)

- Sequences all arrivals to BOI **except** VFR handed off to Local.
- Separation to the Local Control lateral boundary — to the **threshold** when wake turbulence minima apply.
- Communications to Local before the Local boundary, and **no further than 10 NM** from the field.
- Hands off all VFR arrivals to Local before the Local boundary.
- Control to turn VFR departures north; any deviation south of the Local-assigned heading is coordinated with Sage.
- Aircraft handed from Sage are released for turns and descent, **except** arrivals in the southernmost downwind during East Flow (3-2-3b).
- Range: minimum 11 NM outside delegated airspace.

---

## Arrival sequencing

**East Flow (Table 3-2-1)**

| STAR / route / direction | Altitude |
|---|---|
| KOURT# / SPUUD# | descending to 8,000 |
| Downwind (heading 280°) | descending to 7,000 |
| SADYL#, direct JIMMI or heading west of JIMMI | descending to 8,000 |
| SADYL# (vectored to a downwind only) | — |

> Sage arrival traffic inbound via the **Ellis Corridor** or a right base to final from the southwest must be routed via the SADYL#, direct JIMMI, or assigned a heading that keeps the aircraft west of JIMMI.

**West Flow (Table 3-2-2)**

| STAR / route / direction | Altitude |
|---|---|
| KYANN# / BEWTE# | — |
| Downwind (heading 100°) | descending to 8,000 |
| SADYL# | — |
| Direct TOILS or heading east of TOILS | descending to 11,000 or MVA |

Blank altitudes are blank in the source. **Do not fill them in from memory.**

---

## Tower positions (top-down)

| Position | STARS ID | Callsign | Frequency | Source |
|---|---|---|---|---|
| Local Control (LC) | T | `BOI_TWR` | 118.100 | 2-3-1a |
| Ground Control (GC) | R | `BOI_GND` | 121.700 | 2-2-1a |
| Clearance Delivery (CD) | H | `BOI_DEL` | 125.900 | 2-1-1a |

Local quick-looks the Alpine sector, and the Sage sector when Alpine is combined into Sage (2-3, use of radar). Local coordinates with Sage/Alpine when a departure does not auto-acquire within 3 NM, and advises them of unplanned missed approaches and go-arounds.

---

## Facility interfaces

- **Sage/Alpine has control on contact for all departures** (1-3-1b or nearby — confirm paragraph).
- Two positions cannot be authorized to penetrate each other's airspace without the PACP procedures in 1-4.
- Opposite Direction Operations (1-5): Sage/Alpine is responsible for cutoff-point compliance for opposite-direction arrival/arrival pairs; Local and Sage/Alpine share responsibility for coordinating and issuing ODO traffic.
- `MUO_N_APP` (Mountain Home, "X-Ray North", 124.800) and `MUO_S_APP` ("Cowboy Control", 134.100) sit under Boise in the AFV tree but are a **separate facility with their own radio names** — see `source-docs/MUO_NFCT_RAPCON.pdf`.
- Twin Falls (`TWF_APP`, 126.700) and Hailey/Sun Valley (`SUN_TWR`) fold up through `SLC_31_CTR`, not through Boise.

---

## Not established

- **Which positions are primary.** Table 1-2-1 ends "Bold designates a primary position"; bold does not survive text extraction.
- **The Ellis Corridor, the pre-arranged coordination areas and the arrival zones.** Appendices 1A, 2A–2B and 3A–3B are chart images with no text layer. VATGlasses draws sectors, not gates, so it did not close these.
- **Fix positions** for KOURT, SPUUD, SADYL, JIMMI, KYANN, BEWTE and TOILS. No MVA data either.
- **Handoff identifiers — a live blocker.** No source anywhere in the repository. The community dataset carries none (`B1S`/`B1A` are display handles, not STARS IDs) and no ZLC vNAS record is held locally. Until `curl -sL "https://data-api.vnas.vatsim.net/api/artccs/ZLC"` is pulled, no drill may quote one.

### Sector geometry — carried since 2026-09-02

Both sectors now have a lateral extent, runway-gated altitude blocks and an ownership chain, decoded in [the geometry reference](../../_shared/claude_ZLC_Sector_Geometry_Reference.md) from the VATGlasses ZLC dataset (CC BY-NC-SA 4.0 — a tool drawing these **must credit VATGlasses on the page**).

Both sectors span **42.972–44.216 N, 115.297–117.130 W**, and hold the same two bands over the same total airspace — but they **swap shapes** between flows:

| Sector | Gate | Blocks |
|---|---|---|
| Sage | `KBOI 10L/R` East | 7,000–16,400 (30 vertices) · surface–6,900 (45) |
| Sage | `KBOI 28L/R` West | 7,000–16,400 (17) · surface–6,900 (26) |
| Alpine | `KBOI 10L/R` East | 7,000–16,400 (17) · surface–6,900 (26) |
| Alpine | `KBOI 28L/R` West | 7,000–16,400 (30) · surface–6,900 (45) |

That runway gate is the configuration selector, and it is how the tool models East and West Flow.

**One divergence, named not resolved:** the SOP is directional — 3-3-1c says Sage assumes Alpine when combined — while VATGlasses lists the two as mutually covering (`B1A → B1S` and `B1S → B1A`). The SOP wins.
- The ZLC frequency sheet's Boise worked example describes `BOI_S_APP` and `BOI_N_APP`. Those callsigns are in no current position table and appear to predate the rename to Sage and Alpine — treat that passage as stale.
