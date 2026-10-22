# ZMP vNAS geometry - what the facility's own video maps hold for M98, R90 and ZMP

Pulled and measured **2026-10-22** against the ZMP record of **2026-10-01** (`ZMP_vnas.json`, refreshed the same day). Read root `claude_vNAS_Source_Reference.md` first for the endpoint, the puller and the method; this file is the ZMP result. It supersedes the statements in this tree that vNAS carries no geometry.

**Result in one line:** vNAS has the M98 boundary as a closed nine-vertex line and the R90 Omaha ring inside a large map; it has no sector split we can identify yet; and the M98 ring agrees with the owner's list to about a mile except at one vertex.

## 1. The M98 boundary - `M98 106 AIRSPAC`

Map `01H7X13T4WF4EFJMD76VQ6YH54`, `lastUpdatedAt` **2026-04-03**, six lines. Feature 0 is a closed nine-vertex line; features 1 to 5 are short tick marks and a small loop on radial 137 to 154 at 0 to 1 DME, i.e. at the MSP VOR itself, and are not boundary.

Measured from the MSP VOR (N44 53.79 / W093 14.19, the anchor in `claude_MSP_STAR_Reference.md`), true bearing and range, against the nearest of the owner's nine points (`claude_M98_Airspace_Boundary.md` section 1):

| # | Latitude | Longitude | vNAS radial/DME | Nearest owner point | Bearing difference | Range difference (NM) | Distance apart (NM) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 45.50722 | -93.56528 | 339.1 / 39.2 | 338 / 039 | +1.1 | +0.2 | 0.8 |
| 2 | 45.46472 | -92.77056 | 030.2 / 39.4 | 029 / 040 | +1.2 | -0.6 | 1.0 |
| 3 | 45.03778 | -92.31778 | 077.8 / 40.0 | 077 / **037** | +0.8 | **+3.0** | **3.0** |
| 4 | 44.57639 | -92.39944 | 118.4 / 40.4 | 118 / 040 | +0.4 | +0.4 | 0.5 |
| 5 | 44.26611 | -92.87278 | 157.8 / 40.9 | 158 / **040** | -0.2 | +0.9 | 0.9 |
| 6 | 44.27333 | -93.46861 | 194.8 / 38.7 | 196 / 039 | -1.2 | -0.3 | 0.9 |
| 7 | 44.48194 | -93.87889 | 227.7 / 36.9 | 230 / 037 | -2.3 | -0.1 | 1.5 |
| 8 | 44.69111 | -94.13000 | 252.0 / 39.9 | 254 / 040 | -2.0 | -0.1 | 1.4 |
| 9 | 45.17778 | -94.09611 | 294.8 / 40.2 | 295 / 041 | -0.2 | -0.8 | 0.8 |

Sampling the owner's ring every nautical mile (248 samples) against this map: **232 within 2 NM, mean 0.6 NM, worst 2.9 NM.**

**Four readings, none acted on:**

- **It is the same ring.** Eight of nine vertices are within 1.5 NM of the owner's. The vNAS ring has nine vertices where SimAware has nineteen, and it is the ring the owner's list reads like: the structure is identical.
- **Vertex 3 is 3 NM out: 077/040 in vNAS against 077/037 in the owner's list.** SimAware read it as about 2.9 NM out too (`claude_M98_Airspace_Boundary.md` section 3). Two facility-maintained renderings agree against the one list. Whether 037 was a mis-reading of 040 is the owner's question; **the `BOUNDARY` constant in the deck is unchanged.**
- **Vertex 5 is 157.8 / 40.9**, which is the 158/041 end of the 158/040-versus-158/041 question in section 2 of that file, and is the exact vertex (44.26611 / -92.87278) SimAware shares between the M98 and RST polygons. It leans toward 041 and does not settle it.
- **The bearing offsets run negative from about 195 degrees on (-1.2, -2.3, -2.0)** and positive before it. That is the same systematic pattern the SimAware comparison showed, and the tell for a magnetic-versus-true or a slightly different MSP anchor. I did not resolve which.

**Same polygon as SimAware.** The 18-vertex SimAware M98 ring is within 0.5 NM of this map everywhere (253 samples, mean 0.04 NM). One source seen twice, so this does not raise the confidence in the ring, and the two-mile tolerance the decks quote is unchanged. What it adds is a **dated, facility-edited citation** and a change detector: the map is 2026-04-03, SimAware's file was last changed 2022-11-19.

## 2. The Rochester segment

`RST` is a separate polygon in SimAware and has nine maps in the ZMP record whose names begin RST (among them `RST 002 SAT`, `003 ARDR`, `004 3NM MVA`, `006 5NM MVA`). None was identified as the M98/RST shared edge, and `M98 106` has no separate Rochester segment, so the vNAS evidence on the owner's RST arc (149 to 185 degrees, 9,000 ceiling) is **nothing either way**.

## 3. What else the M98 maps hold

Fetched and measured; contents beyond extent and line count not read. **A title is the facility's label, not a stated limit.**

| Map | Id | Lines | Extent | Note |
| --- | --- | --- | --- | --- |
| `M98 153 MVA` | `01H7X13T54CBGS27EXDCK91CY4` | 115 | 43.89 to 45.89 N, 94.64 to 91.83 W | MVA lines, no altitude values in the geometry. 2026-04-03. |
| `M98 154 MVA 5NM` | `01H7X13T5517WFBTRP0K7HN0QF` | 62 | same | The 5 NM MVA set. |
| `M98 140` / `141` / `142` `30 4000` / `6000` / `7000` | `01H7X13T51AX3ABB8Q8G3SPV78`, `...526DADQ42RXR6C6NNK`, `...52TY4KQCC3D3KTMSJ3` | 17 each | 44.58 to 44.89 N, 93.23 to 92.60 W (grows with altitude) | East and south-east of MSP: the approach side of the 30s. |
| `M98 145` / `146` / `147` `12 4000` / `6000` / `7000` | `01H7X13T529SRVA1EFTG4HPCXS`, `...53VDRCJN5E14KB03AN`, `...539ANY2ZH93SFEREZJ` | 17 each | 44.89 to 45.19 N, 93.83 to 93.23 W | West and north-west of MSP: the approach side of the 12s. |
| `M98 161 SAT EXT` | `01H7X13T56E0B7ZBK4S832H7MK` | 66 | 44.63 to 45.30 N, 94.03 to 92.68 W | Spans FCM, MIC and STP. |
| `M98 162` `SB GK12`, `163` `SB GK30`, `164` `SB SHLF`, `167` `SB GK27`, `168` `SB STP`, `169` `SB R27`, `170` `SB GK` | `01H7X13T56FDRH4CCZPT15F07G` and the next six | 9 to 104 | inside the facility | A series titled like satellite boundaries by runway. |
| `M98 171 10MIRNG`, `172 5MIRNG` | `01H7X13T58KJBKT88QE90B786Z`, `...59BZEC1PJY9KV1F7T0` | 11, 17 | 43.89 to 45.89 N, whole facility | Titled as range rings. A ring near 40 NM lies near the owner's ring, so they sample close to it; not a boundary. |
| `M98 236 12 SHLF`, `237 1217SHF` | `01H7X13T5FQ404BYWCA9ATPNS1`, `...5FXZ9RXDNYE9XNK0CD` | about 1,200 each | 44.07 to 45.78 N | Shelves for the 12s. |
| `M98 432 CLASS B`, `443 CLASS-B`, `467 CLASS D` | `01H7X4H0H1MW382510RSF0PH79`, `01H7X50S6Q0HZXBZ8Z3JJZKA11`, `01H7X43BZPBSGK5CTWN9Z9MBS5` | 262, 236, 32 | around MSP, FCM/MIC, STP | 2023-08-15, older than the rest. |

Fetched and not matched to anything: `M98 109 ZMP` (123 lines, 43.89 to 45.89 N) and `M98 ZMPEVNT` (1,484 lines, a ZMP event split). Named, not fetched: `M98 104 4FINAL`, `117 17FINAL`, `122 22FINAL`, `135 35FINAL` (final approach courses by runway).

**Issue #27 asks for the DDA extensions, the satellite cutouts and the Runway 30 area.** `M98 161 SAT EXT` and the `SB` series are the nearest candidates by title and by location. **No shape has been matched to a polygon the DDA reference describes**, and doing so is a comparison against `claude_M98_DDA_Geometry.md`, not a reading of titles. The `4000/6000/7000` maps carry the altitudes as part of the name, which is the facility's own labelling and the first altitude text for these shapes that is not a chart image; **it is a name, and the LOA wording in `claude_MSP_Tower_Reference.md` remains the citation for any altitude a tool states.**

## 4. R90

- **The Omaha ring is in `R90 001 MAIN`** (`01H7Y164HGF5M6PFB0CCB5K2RQ`, 2023-08-16, 1,032 lines): the 18-vertex SimAware Omaha ring lies within 0.5 NM of lines in the map at every one of 336 samples (mean 0.07 NM). The map is about three years older than M98's and carries the ring among other drawing, so it has to be extracted, not read off. The same ring is also inside `R90 013 GEO` (1,791 lines).
- **Lincoln was not tested.** SimAware carries it as a separate 8-vertex polygon.
- **`R90 008 ZMP` is not the outline.** Its extent (40.53 to 41.67 N, 95.90 to 91.74 W) does not match the Omaha ring, and 0 of 336 samples fall within 0.5 NM of it.
- **Tested and not the outline:** `R90 003 S FLOW`, `007 STATE`, `055 OFF TACAN FIXES`, `060 STARS N`, `061 STARS S`, `140 MVA LAB`, `253 MVA` (each under 5% of samples within 0.5 NM). **Named, not read:** `R90 254 FUS MVA`, `212 LNKTMVA` and the per-runway `LNK` and `OMA` approach maps.
- **No sector split identified.** R90 is still blocked on its internal boundaries (issue #29). It now has an outline source for the first time, and the ZID decks show what a deck does with an outline alone: it answers "is this point inside the facility" and nothing else.

## 5. ZMP Center

The record lists 1,359 maps, of which more than 400 are titled `AREA<n>_FILTER` or `FILTER`, which look like ERAM geomap filters. **None was read.** `M98 ZMPEVNT` is the only Center-side map pulled. Sector boundaries for ZMP Center (issue #35) are therefore **not found and not ruled out**; the next step is to read the `AREA<n>_FILTER` set, and nobody has.

## 6. The snapshot

`ZMP_vnas.json` was refreshed from the 2026-08-26 copy to the 2026-10-01 record. The diff (`tools/vnas/vnas.pl diff`) found **no change to a position, frequency, TCP, handoff ID, scratchpad rule or restriction**: 50 ERAM sectors gained an `isExcluded: 0` field and two timestamps moved. The decks that read this record are unaffected.

## 7. What to cite

A boundary or shelf used in a tool cites **the map id and its `lastUpdatedAt`** (for example *vNAS video map `M98 106 AIRSPAC`, `01H7X13T4WF4EFJMD76VQ6YH54`, 2026-04-03*), not "vNAS". No licence statement was found for these files; the owner decided on 2026-10-22 to use them as the primary source. The M98 ring in the deck stays the owner's list until the owner moves it.
