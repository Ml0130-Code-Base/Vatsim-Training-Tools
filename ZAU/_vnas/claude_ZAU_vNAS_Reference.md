# ZAU vNAS Reference - what the record carries for C90 and AZO, and where it disagrees with the orders

Source: `https://data-api.vnas.vatsim.net/api/artccs/ZAU`, pulled **2026-10-22**, `lastUpdatedAt` **2026-10-17T03:38:42.647Z**, committed as `ZAU_vnas.json` (582 KB, as served). This is source 3 of the four (root `CLAUDE.md` section 10) and **the only source for handoff identifiers**. **Until this date no ZAU vNAS record was held anywhere in this repository**, and the C90 and AZO references said so and called it "one `curl`" (their section 11 and 12 notes). Re-pull with `perl tools/vnas/vnas.pl artcc ZAU ZAU/_vnas/ZAU_vnas.json` and diff before trusting it (`claude_vNAS_Source_Reference.md`).

**What this file settles:** the position count discrepancy (VATGlasses carries four C90 and three AZO positions; vNAS carries all seventeen and all six); the handoff identifiers; two places where the C90 SOP's combining chain and vNAS disagree; and three AZO positions no reference mentions. It does not carry geometry; the video-map section is the last one.

## 1. Positions: every one the orders define is in the record

- **C90.** All seventeen SOP 2-1 positions are in vNAS with the same callsign and the same frequency (`CHI_Z_APP` 119.000 down to `CHI_A_APP` 120.550). Z Final appears twice, once as the combined position (area Combined, the same TCP 1Z). SOP 2-1 prints `CHI_U_APP` as 133.90; vNAS has 133.900. That is the SOP's two-decimal rounding, not a conflict.
- **AZO.** All six West Wall sectors are in vNAS: Bells 119.200, Bronco 121.200, Griffin 128.400, Lumbertown 119.800, Shoreline 133.825, Whitecap 124.600, each with the callsign the AZO reference gives. **The "carries three where 2-2 defines six" note in the AZO reference is explained:** the VATGlasses dataset is the one that is short; the record is not. Griffin appears twice (as a position and as the combined position, the same TCP 1G).
- **Three AZO positions no reference mentions** (the vNAS record has them; `claude_AZO_Reference.md` covers the approach sectors only): `AZO_TWR` Kalamazoo Tower 118.300, `AZO_GND` Kalamazoo Ground 121.900, `AZO_DEL` Kalamazoo Clearance 121.750. The tower sits on TCP 1Z in the Bronco area; ground and delivery have no TCP. Single-sourced: no order in the set was read for them.

## 2. Handoff identifiers

The ERAM side. ZAU's own record names how a ZAU Center sector addresses each TRACON (`neighboringStarsConfigurations`, table at the end). **For C90: STARS ID `ORT`, two-character `OR`, single-character `O`, Field E format `OneLetterAndSubset`. For AZO: `AZT`, `AZ`, `Z`, `OneLetterAndSubset`.** So a ZAU sector hands to a C90 position as `O` + subset + sector (for example `O1Z`) and to an AZO position as `Z` + subset + sector (for example `Z1G`). **These are ZAU's adaptation; ZMP's record names the same facilities differently** (AZO is `SSS`, `SS`, `S` in `claude_ZMP_Handoff_ID_Reference.md` section 1.3), because each Center adapts its own neighbour table. Never carry one Center's IDs into another's handoff.

The STARS side. `starsHandoffIds` in each TRACON's configuration is the number a position uses to reach another STARS facility:

| From | Handoff numbers (facility = number) |
| --- | --- |
| C90 | MKE = 1, SBN = 2, RFD = 3 |
| AZO | LAN = 2, TOL = 5, FWA = 6, SBN = 7, MKE = 8 |

Within a facility, the TCP is the subset digit plus the sector ID, and a bare sector ID is used inside a subset (`claude_ZMP_Handoff_ID_Reference.md` section 1.1). **Every radar position in both records is subset 1.**

**These are in the record and not yet in the decks.** The C90 and AZO `handoff` slot stays `empty` (its note now says where the data is); moving it to `partial` needs a deck table, and a verified slot with an empty table is worse than an empty slot (root `CLAUDE.md` section 11).

## 3. Where the C90 combining chain and vNAS disagree - named, not resolved

SOP 2-2 as the C90 reference reads it (`claude_C90_Reference.md` section 2, which carries its own warning that the chain "has **not** been checked against the rendered page") against the parent TCP in the record, and against what the deck's `SECTORS` table carries:

| Position | SOP 2-2 (reference) | vNAS parent TCP | Deck `into` | |
| --- | --- | --- | --- | --- |
| J KUBBS Feeder | F | **Y** | F | **disagree** |
| Y FARMM Feeder | **J** | **F** | J | **disagree** |
| S SSAT Sector 1 | Z ("Full room: Sector 1 to Z") | **B** (East Departure) | Z | **disagree** |
| every other position | as the SOP | same | same | agree |

- **Feeders.** The SOP chain is FARMM to KUBBS to F. The record has KUBBS to FARMM to F: the two feeders are in the opposite order. A swap is what an interleaved two-column extraction would produce, which is the failure the reference's confidence note describes; **it is a reading, not a finding.**
- **South Satellite Sector 1.** The SOP's "full room" line folds Sector 1 and East Departure each into Z. vNAS folds Sector 1 into East Departure, one step further down the chain. The two differ only in what a fully combined room looks like through the Satellite.
- **The deck follows the SOP.** `SECTORS` in `c90-drill-deck.html` is unchanged, because the order is the authority (root `CLAUDE.md` section 6) and nothing here says the record is newer. The disagreement is the question to put to the facility, and it is cheap to ask: *which way does the KUBBS and FARMM fold run, and does Sector 1 fold to Z or to East Departure?*

**AZO** has no `into` chain in the order to compare: SOP 2-3 gives a hierarchy label per sector, not a parent. The record's chain is **Whitecap, Bronco and Lumbertown fold into Griffin; Shoreline into Lumbertown; Bells into Bronco.** ZAU LOA 7.h names the pairs ZAU treats as combined unless coordinated: Lumbertown with Shoreline, Whitecap with Griffin, Bells with Bronco. **All three pairs are edges of the vNAS chain, so the two sources agree.** The AZO deck carries no chain today.

## 4. The record

| Item | Value |
| --- | --- |
| Facility | ZAU Chicago ARTCC, NAS ID G |
| C90 | Chicago TRACON, 18 position records for 17 positions, 24 TCPs, 9 areas (Combined, Final, Feeder, Departure, South Satellite, North Satellite, Midway Tower, Dupage Tower, Chicago Executive Tower) |
| AZO | Great Lakes ATCT/TRACON West Wall, 10 position records, 7 areas |
| Video maps | 262 listed; C90 34, AZO 13 |

Every vNAS frequency and callsign for C90 and AZO was looked up in the ZAU reference markdown on 2026-10-22: **all matched** except the three AZO positions above.

## 5. Geometry, 2026-10-22

Method and the other facilities in root `claude_vNAS_Source_Reference.md`. The ZAU result:

- **AZO.** `AZO MAIN` (`01GFM1XC2NQTC3DR0BEZDAZPHQ`, 2026-03-06, 2,973 lines) contains the SimAware AZO ring: every one of 425 samples within 0.5 NM, mean 0.01 NM, worst 0.2 NM. The same polygon, so also the same polygon as the VATGlasses AZO footprint the deck carries. **`AZO SECTORS`** (`01GFM1XC2RM04DA2QC7N0M6EBG`, dated 2025-08-09; 56 lines, 542 vertices, 42.03 to 44.48 N, 86.90 to 83.05 W) is the first map that could hold the six West Wall sector boundaries `CLAUDE.md` section 7 says stay empty: nine of its lines are closed 50-vertex circles centred on 42.749 N 85.043 W and 42.230 N 85.556 W (Kalamazoo), and 46 are open lines. **It has not been read as sectors.** Nothing in the deck changes.
- **C90.** `C90 MAIN` (`01GFM1XR7B4QB9YXD1YFRDCA8H`, 2026-07-09, 1,719 lines) holds 65% of the SimAware C90 ring within 0.5 NM (mean 0.51 NM, worst 5.1 NM). The ring is not isolated in it and the rest is not explained. `C90 ZAU LOW SECTORS`, `C90 SHORELINE` and `C90 CAPTURE BARS` were pulled and are not the outline. Named, not pulled: `C90 FEEDER 22`, `4R`, `EAST`, `WEST`, `C90 FINALS EAST`, `C90 FINALS WEST`, `C90 SATELLITE APPROACHES A` and `B`, `C90 SSAT MDW 4R`, `13L`, `22L`, `31R`. **Those titles match the Feeder, Final and SSAT delegated airspace the C90 reference calls chart images (Appendices C and F)**, so they are the first thing to read when someone takes the sector split on.
- **Altitudes** stay with VATGlasses (SFC to FL150 for C90, SFC to FL100 for AZO). vNAS geometry has none.

## 6. Tables

Generated from `ZAU_vnas.json` by walking `facility.childFacilities[]` to `C90` and `AZO`. Parent TCP is the consolidation parent (the position this one folds into); `-` means it is the root.

### C90 Chicago TRACON

| Callsign | Name | Radio name | MHz | Area | TCP (subset+sector) | Terminal sector | Parent TCP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CHI_A_APP | North Satellite | Chicago Approach | 120.550 | North Satellite | 1A | A | 1B |
| CHI_B_DEP | East Departure | Chicago Departure | 128.575 | Departure | 1B | A | 1Z |
| CHI_D_DEP | North Departure | Chicago Departure | 134.400 | Departure | 1D | A | 1B |
| CHI_E_APP | OKK Feeder | Chicago Approach | 118.925 | Feeder | 1E | A | 1X |
| CHI_F_APP | F Final | Chicago Approach | 124.350 | Final | 1F | A | 1Z |
| CHI_G_DEP | West Departure | Chicago Departure | 135.275 | Departure | 1G | A | 1M |
| CHI_H_APP | H Final | Chicago Approach | 132.175 | Final | 1H | A | 1W |
| CHI_J_APP | KUBBS Feeder | Chicago Approach | 125.700 | Feeder | 1J | A | 1Y |
| CHI_L_APP | SSat Sector 3 | Chicago Approach | 133.500 | South Satellite | 1L | A | 1P |
| CHI_M_DEP | South Departure | Chicago Departure | 126.625 | Departure | 1M | A | 1B |
| CHI_P_APP | SSat Sector 2 | Chicago Approach | 119.350 | South Satellite | 1P | A | 1S |
| CHI_S_APP | SSat Sector 1 | Chicago Approach | 128.200 | South Satellite | 1S | A | 1B |
| CHI_U_APP | SSat Sector 4 | Chicago Approach | 133.900 | South Satellite | 1U | A | 1S |
| CHI_W_APP | W Final | Chicago Approach | 133.625 | Final | 1W | A | 1Z |
| CHI_X_APP | PLANO Feeder | Chicago Approach | 135.075 | Feeder | 1X | A | 1W |
| CHI_Y_APP | FARMM Feeder | Chicago Approach | 135.025 | Feeder | 1Y | A | 1F |
| CHI_Z_APP | Z Final | Chicago Approach | 119.000 | Final | 1Z | A | - |
| CHI_Z_APP | Z Final (Combined) | Chicago Approach | 119.000 | Combined | 1Z | A | - |

Handoff numbers to other STARS facilities (starsHandoffIds): MKE=1, SBN=2, RFD=3

### AZO Great Lakes ATCT/TRACON West Wall

| Callsign | Name | Radio name | MHz | Area | TCP (subset+sector) | Terminal sector | Parent TCP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AZO_DEL | Clearance Delivery | Kalamazoo Clearance | 121.750 | - | none | - | - |
| AZO_E_APP | Bells | Great Lakes Approach | 119.200 | Bells | 1E | - | 1R |
| AZO_GND | Ground | Kalamazoo Ground | 121.900 | - | none | - | - |
| AZO_G_APP | Griffin | Great Lakes Approach | 128.400 | Griffin | 1G | - | - |
| AZO_G_APP | Griffin (Combined) | Great Lakes Approach | 128.400 | Combined | 1G | - | - |
| AZO_N_APP | Lumbertown | Great Lakes Approach | 119.800 | Lumbertown | 1N | - | 1G |
| AZO_R_APP | Bronco | Great Lakes Approach | 121.200 | Bronco | 1R | - | 1G |
| AZO_S_APP | Shoreline | Great Lakes Approach | 133.825 | Shoreline | 1S | - | 1N |
| AZO_TWR | Local | Kalamazoo Tower | 118.300 | Bronco | 1Z | - | - |
| AZO_W_APP | Whitecap | Great Lakes Approach | 124.600 | Whitecap | 1W | - | 1G |

Handoff numbers to other STARS facilities (starsHandoffIds): LAN=2, TOL=5, FWA=6, SBN=7, MKE=8

### ERAM neighbouring STARS configurations

| Facility | STARS ID | Two-char | Single-char | Field E format |
| --- | --- | --- | --- | --- |
| AZO | AZT | AZ | Z | OneLetterAndSubset |
| C90 | ORT | OR | O | OneLetterAndSubset |
| CID | CIT | CI | H | OneLetterAndSubset |
| CMH | CMH |  |  | OneLetterAndSubset |
| CMI | CMT | CM | W | OneLetterAndSubset |
| DSM | DSM | DS | E | OneLetterAndSubset |
| FWA | FWT | FW | F | OneLetterAndSubset |
| GRB | GRB | GG | Y | OneLetterAndSubset |
| GUS | GUT | GU | U | OneLetterAndSubset |
| HUF | TTH | TT |  | TwoLettersAndSubset |
| IND | IND | IN | V | OneLetterAndSubset |
| LAN | LAN | LA | L | OneLetterAndSubset |
| MKE | MKT | MK | M | OneLetterAndSubset |
| MLI | MLT | ML | Q | OneLetterAndSubset |
| MSN | MST | MS | D | TwoLettersAndSubset |
| RFD | RFT | RF | R | OneLetterAndSubset |
| RST | RST | RS |  | OneLetterAndSubset |
| SBN | SBT | SB | S | OneLetterAndSubset |
| T75 | STL | ST | G | OneLetterAndSubset |
| TOL | TOL | TO | T | OneLetterAndSubset |
| VOK | VOT | VO | X | OneLetterAndSubset |
