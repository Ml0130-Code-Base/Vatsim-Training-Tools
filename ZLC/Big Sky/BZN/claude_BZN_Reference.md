# BZN area reference — Big Sky Approach

Bozeman, southwest Montana. Verified 2026-09-01 against `source-docs/BZN_FCT.pdf` and chapter 3 section 4 of `../BOI/source-docs/BOI_ATCT_TRACON_7110_2B.pdf`.

The BZN area and the [BOI area](../BOI/claude_BOI_Reference.md) **do not share an airspace boundary**. Bozeman is documented inside the Boise SOP as a filing convenience; that is the only thing joining them, along with the radio name.

---

## Sector

| Sector | STARS ID | Callsign | Frequency | Airspace |
|---|---|---|---|---|
| Bozeman Radar (APB) | *blank in the source* | `BZN_APP` | 118.975 | Appendix 1D |

Identifies as **"Big Sky Approach"** / **"Big Sky Departure"** (BOI 7110.2B 3-1-1).

Frequency from BOI 7110.2B 3-4-1a, confirmed independently by BZN FCT Clearance §4: departures are handed to "Big Sky 118.975".

**No sibling sector.** Bozeman has nothing to combine with inside Big Sky. In the AFV tree it inherits `BZN_TWR` → `BZN_GND` → `BZN_DEL`, and folds upward to `SLC_08_CTR` → `SLC_06_CTR` (Center Area A) — **not** to Boise.

### Position responsibilities (3-4)

- Range: minimum **10 NM** outside delegated airspace. *(The BOI area uses 11 NM — the numbers differ.)*
- Coordinates with **Bozeman FCT** to determine the approach in use for the ATIS.
- Coordinates with BZN FCT for any aircraft cleared for an approach other than the one advertised.
- Provides applicable separation for VFR aircraft conducting practice instrument approaches.

---

## Bozeman FCT (top-down)

| Position | Callsign | Frequency |
|---|---|---|
| Local | `BZN_TWR` | 118.200 |
| Ground | `BZN_GND` | 121.800 |
| Clearance | `BZN_DEL` | 124.050 |

**Local airspace:** runways 3/21, 11/29, 11G/29G, 12/30, and airspace as depicted on the sector file. Tower use of radar is **limited**.

**Runway selection:** runway 12 (East) in calm wind; runway 30 (West) when the tailwind component exceeds 5 knots.

**LAHSO** is authorized on runway 12 only, daytime only, propeller aircraft FAA Group 7 and below, dry runway, tailwind under 3 knots, ceiling 1,000 and visibility 3 reported at the field, not during reported wind shear. Runway 12 ALD is 6,841 ft, rounded down to 6,800 ft when a pilot requests it. Excluded: all air carrier and air taxi, all jets, all solo students, BE60, Super DC-3 (C-117, R4D-8), HERN DH-114, PAY3.

**Departures** are automatically released and departure notifications are not required, unless TRACON coordinates otherwise.

---

## Departures

Initial altitude **16,000**. On the BGSKY, BOBKT or MEADO SID the pilot is instructed to "climb via SID".

| Flow | Direction | Procedure |
|---|---|---|
| East (Rwy 12) | SW to NW | BGSKY SID; non-RNAV get HIA SID |
| East (Rwy 12) | NE to SE | BOBKT SID |
| West (Rwy 30) | all | MEADO SID; non-RNAV may get HIA SID |

Aircraft that cannot accept a departure procedure get radar vectors: **runway 12 → heading 250**, **runway 30 → heading 290**.

## Missed approach / go-around climb-out

Primary climb-out, requiring no coordination beyond the `.MA` missed notification. Aircraft must not turn before the departure end. Handoff and communications transfer to the appropriate TRACON sector no later than **1 mile** off the departure end.

| Flow | Instruction |
|---|---|
| East | heading 250, maintain 8,000 |
| West | heading 290, maintain 8,000 |

VFR aircraft, and IFR Category I/II aircraft going around off a visual, are instructed to remain in the local pattern if able.

---

## Not established

- **The STARS ID for Bozeman Radar.** Blank in BOI 7110.2B Table 1-2-1, and the community dataset does not carry STARS IDs either.
- **Whether Bozeman Radar has arrival sequencing tables** of the kind Boise has (3-2-1 / 3-2-2). None appear in the source.
- **Handoff identifiers — a live blocker.** No source anywhere in the repository. `B1Z` is a VATGlasses display handle, not a STARS ID, and no ZLC vNAS record is held locally. Until `curl -sL "https://data-api.vnas.vatsim.net/api/artccs/ZLC"` is pulled, no drill may quote one.
- **MVAs and any route geometry.** Not present in any source.

### Sector geometry — carried since 2026-09-02

Decoded in [the geometry reference](../../_shared/claude_ZLC_Sector_Geometry_Reference.md) from the VATGlasses ZLC dataset (CC BY-NC-SA 4.0 — a tool drawing these **must credit VATGlasses on the page**).

| Entry | Position | Extent | Blocks |
|---|---|---|---|
| `B1Z` | Bozeman Radar, 118.975 | 45.117–46.269 N, 110.000–112.104 W | 7,500–16,400 (32 vertices) · surface–7,400 (55) |
| `B1L` | Bozeman Tower, 118.200 | 45.669–45.859 N, 111.025–111.267 W | surface–7,400 (22) |

**Neither is gated on a runway configuration** — unlike Boise, whose sectors swap shape between East and West Flow, Bozeman's blocks exist in every configuration.

The geometry also confirms the structural constraint: this area spans 45.1–46.3 N while the BOI area spans 43.0–44.2 N / 115.3–117.1 W — **more than fifty miles apart with no shared edge**, and the two ownership chains diverge immediately (`06` for Bozeman, `30` for Boise).

**One divergence, named not resolved:** the AFV tree gives `BZN_APP → SLC_08_CTR → SLC_06_CTR`; VATGlasses gives `B1Z → 06 → 14 → 04 → 44`, straight to 06 and never through 08, although sector 08 exists in its position list. Both agree Bozeman folds into Center Area A and never into Boise. The AFV tree is documentary and is what the tool shows.
- BZN FCT Local §6 lists IFR arrivals as "N/A", which is unlikely to mean what it literally says. Worth asking about.

---

## Neighbouring Montana facilities

These fold up through Center, not through Bozeman, and each has its own radio name. Source docs are in `source-docs/`.

| Callsign | Radio name | Sector | Frequency |
|---|---|---|---|
| `BIL_N_APP` | Billings Approach | North | 119.200 |
| `BIL_S_APP` | Billings Approach | South | 120.500 |
| `GTF_APP` | Great Falls Approach | Great Falls | 128.600 |
| `HLN_APP` | Helena Approach | Helena | 119.500 |
| `MSO_APP` | **Spokane** Approach | Missoula | 124.900 |

Missoula is voiced as **Spokane Approach**, not Missoula Approach.
