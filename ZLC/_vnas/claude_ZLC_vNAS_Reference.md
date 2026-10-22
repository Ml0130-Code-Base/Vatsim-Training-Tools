# ZLC vNAS Reference - what the record carries for S56 and Big Sky, and where it disagrees with the AFV tree

Source: `https://data-api.vnas.vatsim.net/api/artccs/ZLC`, pulled **2026-10-22**, `lastUpdatedAt` **2026-10-22T00:40:14.385Z**, committed as `ZLC_vnas.json` (345 KB, as served). This is source 3 of the four (root `CLAUDE.md` section 10) and **the only source for handoff identifiers**. **Until this date no ZLC vNAS record was held anywhere in this repository**, and the S56, BOI and BZN references called the missing handoff identifiers "a live blocker" until the file was pulled. Re-pull with `perl tools/vnas/vnas.pl artcc ZLC ZLC/_vnas/ZLC_vnas.json` and diff before trusting it (`claude_vNAS_Source_Reference.md`). **The record was edited two hours before the pull**: the facility is changing it as we read it.

**What this file settles:** the handoff identifiers; an independent confirmation of the three Big Sky frequencies and of the Mountain Home radio name; and a large disagreement between the S56 combining chain in the reference and the record's parent TCPs, which is named and not resolved. It does not carry geometry; the video-map section is the last one.

## 1. Positions: a third source agrees

Every vNAS frequency and callsign for S56, BOI and BZN was looked up in the ZLC reference markdown on 2026-10-22. **All matched** except Bozeman's second approach frequency (section 2).

- **The three Big Sky frequencies the reference had to recover from a mis-split table** (`claude_Community_Geometry_Sources.md` section 3) are now confirmed by a third source: Sage `BOI_G_APP` **119.600**, Alpine `BOI_A_APP` **126.900**, Bozeman `BZN_APP` **118.975**. The order's narrative paragraphs, VATGlasses and the facility's own record agree.
- **Mountain Home.** The one divergence recorded between the reference and VATGlasses (`claude_Community_Geometry_Sources.md`, "The one divergence found so far") is **settled in favour of the reference by vNAS**: `MUO_N_APP` is "Mountain Home Approach" 124.800, `MUO_S_APP` is voiced **"Cowboy Control"** 134.100 and named "Cowboy Range". VATGlasses is the source with the wrong radio name. Still not an SOP citation: vNAS and the order agree, and the order remains the authority.
- **S56.** All nine sectors match by callsign and frequency: Lake 135.500, Alpine 118.850, Bear 124.900, Final 125.700, Gunnison 126.250, Hart 121.100, Jordan 128.600, Stockton 128.100, Valley 120.900.

## 2. One position the references do not mention

`BZN_APP` appears twice in the Bozeman record: "Bozeman Radar" 118.975 (TCP 1B) and **"Bozeman LVM Freq" 119.550**, which has no TCP. The BZN reference carries 118.975 only. **Single-sourced and unexplained**: the order was not read for it. It is the same callsign on a second frequency, in the shape of the Midnight position at M98 (`MSP_E_APP`, one TCP, two names).

## 3. Handoff identifiers

The ERAM side. ZLC's own record names how a ZLC Center sector addresses each TRACON (`neighboringStarsConfigurations`, table below). **S56: STARS ID `QQQ`, single-character `Q`. Big Sky: Boise `BBB`/`B`, Bozeman `NNN`/`N`.** Field E format is `OneLetterAndSubset` for all three, so a ZLC sector hands to a Bozeman radar position as `N` + subset + sector, here `N1B`. The two-character IDs are empty in this Center's adaptation (unlike ZAU's). **These are ZLC's adaptation**; another Center names the same TRACON differently (`claude_ZAU_vNAS_Reference.md` section 2).

The STARS side: S56 reaches Dugway (`DPG`) as handoff number 1; Boise reaches Mountain Home (`MUO`) as 1; Bozeman has none.

Within a facility the TCP is the subset digit plus the sector ID. **Every radar position here is subset 1; so is every tower and ground position** (BOI tower `1T`, ground `1R`, delivery `1H`; BZN tower `1T`, ground `1N`, delivery `1X`), unlike M98 where towers sit in subsets 2 and 3 (`claude_ZMP_Handoff_ID_Reference.md` section 2).

**These are in the record and not yet in the decks.** The `handoff` slot stays `empty` (its note says where the data is); moving it to `partial` needs a deck table, and a verified slot with an empty table is worse than an empty slot (root `CLAUDE.md` section 11).

## 4. The S56 combining chain and the record's parent TCPs disagree - named, not resolved

`claude_S56_Reference.md` ("Combining chain") draws the chain from the **AFV audio tree** (`claude_ZLC_Positions_Reference.md`), not from the SOP, and the deck's `SECTORS` table carries it. The vNAS `parentTcpId` is the STARS consolidation hierarchy. They are different systems with no obligation to agree, and they do not:

| Sector | AFV tree (reference and deck `into`) | vNAS parent TCP | |
| --- | --- | --- | --- |
| Lake K | Center sector 3 (`null`) | root | agree |
| Jordan J | Lake | **Lake** | agree |
| Bear B | Center (`null`) | **Lake** | disagree |
| Gunnison G | Bear | **Lake** | disagree |
| Final F | Bear | **Lake** | disagree |
| Hart H | Gunnison | **Bear** | disagree |
| Stockton S | Lake | **Bear** | disagree |
| Valley V | Center (`null`) | **Final** | disagree |
| Alpine A | Stockton | **Jordan** | disagree |

Seven of nine differ. The deck's structural constraint ("`into` never leaves the facility except to Center") is written into the data shape, and the vNAS hierarchy would make Lake the only direct child of Center and everything else its descendants. **Which hierarchy a drill should use depends on what it grades**: the audio tree is who hears whom on the voice network, and the STARS hierarchy is who an unstaffed position's tracks consolidate into. **The deck is unchanged.** The question for the facility is *which is the combining chain the controller is expected to apply when closing a sector*; the SOP (3-1 to 3-9) was not read for it in this pass.

**Big Sky agrees.** Alpine folds into Sage (the BOI reference's "Sage is the base", 3-3-1c) and Bozeman's delivery folds into ground and ground into tower, which is the AFV inheritance the BZN reference gives.

## 5. Geometry, 2026-10-22

Method and the other facilities in root `claude_vNAS_Source_Reference.md`. The ZLC result:

- **S56.** `S56 107 N Flow Base Map` (`01HY67QFHEYTG648CKSWNRWQPM`) and `S56 109 South Flow Base Map` (`01HY67QFHFZQ3TK7SRHZJ14ADM`), both dated 2025-11-07, hold 59 to 60% of the SimAware S56 ring within 0.5 NM (mean 0.8 NM, worst about 5 NM). The ring is not isolated and the rest is not explained. `S56 302` and `303` (Alpine boundary, south and north flow) are not the outline.
- **Big Sky.** `BOI_006S`, `BOI_011S East Flow Sector Altitudes` and `BOI_012S West Flow Sector Altitudes` do not hold the BOI ring. **No Big Sky outline identified.** BZN was not tested.
- **The flow-dependent maps are the interesting ones.** vNAS carries per-flow base maps and tower flow splits for S56 (`S56 144`, `145`) and sector altitude maps by flow for BOI (`BOI_011S`, `BOI_012S`, `BOI_120S`). `claude_ZLC_Sector_Geometry_Reference.md` gets the same flow branch from the VATGlasses runway gates, which also carry the altitudes vNAS geometry lacks; **the two are not yet compared.**
- **Altitudes** stay with VATGlasses. Nothing in the decks changes.

## 6. Tables

Generated from `ZLC_vnas.json` by walking `facility.childFacilities[]` to `S56`, `BOI` and `BZN`. Parent TCP is the consolidation parent (the position this one folds into); `-` means it is the root. Area is the STARS area the position belongs to.

### S56 Salt Lake City TRACON

| Callsign | Name | Radio name | MHz | Area | TCP (subset+sector) | Terminal sector | Parent TCP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SLC_A_APP | Alpine | Salt Lake City Approach | 118.850 | S56 | 1A | - | 1J |
| SLC_B_APP | Bear | Salt Lake City Approach | 124.900 | S56 | 1B | - | 1K |
| SLC_F_APP | Final | Salt Lake City Approach | 125.700 | S56 | 1F | - | 1K |
| SLC_G_APP | Gunnison | Salt Lake City Approach | 126.250 | S56 | 1G | - | 1K |
| SLC_H_APP | Hart | Salt Lake City Approach | 121.100 | S56 | 1H | - | 1B |
| SLC_J_APP | Jordan | Salt Lake City Approach | 128.600 | S56 | 1J | - | 1K |
| SLC_K_APP | Lake | Salt Lake City Approach | 135.500 | S56 | 1K | - | - |
| SLC_S_APP | Stockton | Salt Lake City Approach | 128.100 | S56 | 1S | - | 1B |
| SLC_V_APP | Valley | Salt Lake City Approach | 120.900 | S56 | 1V | - | 1F |

Handoff numbers to other STARS facilities (starsHandoffIds): DPG=1

### BOI Boise ATCT | Big Sky TRACON

| Callsign | Name | Radio name | MHz | Area | TCP (subset+sector) | Terminal sector | Parent TCP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BOI_A_APP | Alpine Radar | Big Sky Approach | 126.900 | BOI RADAR | 1A | - | 1G |
| BOI_DEL | Clearance Delivery | Boise Clearance | 125.900 | BOI ATCT | 1H | - | - |
| BOI_GND | Ground Control | Boise Ground | 121.700 | BOI ATCT | 1R | - | - |
| BOI_G_APP | Sage Radar | Big Sky Approach | 119.600 | BOI RADAR | 1G | - | - |
| BOI_TWR | Local Control | Boise Tower | 118.100 | BOI ATCT | 1T | - | - |

Handoff numbers to other STARS facilities (starsHandoffIds): MUO=1

### BZN Bozeman ATCT | Big Sky TRACON

| Callsign | Name | Radio name | MHz | Area | TCP (subset+sector) | Terminal sector | Parent TCP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BZN_APP | Bozeman LVM Freq | Big Sky Approach | 119.550 | - | none | - | - |
| BZN_APP | Bozeman Radar | Big Sky Approach | 118.975 | RADAR | 1B | - | - |
| BZN_DEL | Clearance | Bozeman Clearance | 124.050 | BZN CTRD | 1X | - | 1N |
| BZN_GND | Ground | Bozeman Ground | 121.800 | BZN CTRD | 1N | - | 1T |
| BZN_TWR | Tower | Bozeman Tower | 118.200 | BZN CTRD | 1T | - | - |

Handoff numbers to other STARS facilities (starsHandoffIds): 

### ERAM neighbouring STARS configurations

| Facility | STARS ID | Two-char | Single-char | Field E format |
| --- | --- | --- | --- | --- |
| BIL | LLL |  | I | OneLetterAndSubset |
| BOI | BBB |  | B | OneLetterAndSubset |
| BZN | NNN |  | N | OneLetterAndSubset |
| CPR | TTT |  | T | OneLetterAndSubset |
| DPG | HHH |  | H | OneLetterAndSubset |
| GTF | GGG |  | G | OneLetterAndSubset |
| L30 | ZZZ |  | Z | OneLetterAndSubset |
| LSV | VVV |  | V | OneLetterAndSubset |
| MSO | UUU |  | U | OneLetterAndSubset |
| MUO | MMM |  | M | OneLetterAndSubset |
| NFL | FFF |  | F | OneLetterAndSubset |
| S56 | QQQ |  | Q | OneLetterAndSubset |
