# ZID Sector Geometry Reference - what the community sources give IND, SDF and CVG

Checked **2026-10-18**; the SimAware outline was put into the three decks on the owner's decision of **2026-10-19**. Read root `claude_Community_Geometry_Sources.md` first for what each source is and how far it may be trusted. **This file is the ZID result: one lateral outline per facility, no altitudes, no sector split.**

**Added 2026-10-19:** the Indy Center tools site (`tools.flyindycenter.com/api/areas`) carries terminal outlines that are the same polygons as these at IND and SDF (worst vertex-to-edge distance 0.00 NM) and within 0.07 NM at CVG. That is one polygon seen twice, not a second source, and it does not check the outline against the real boundary. See `claude_ZID_ControllerTools_Reference.md` section 2.

## 1. Result, in one table

| Source | IND | SDF | CVG | Used |
| --- | --- | --- | --- | --- |
| **VATGlasses** (`lennycolton/vatglasses-data`, `data/`) | no dataset | no dataset | no dataset | nothing to use. The listing carries zab, zak, zau, zeg, zhn, zhu, zjx, zlc, zma, zny, zoa, zob, zse and others; **there is no `zid`** |
| **SimAware TRACON Project** (`VATSIM-Radar/simaware-tracon-project`, `Boundaries/<ID>/<ID>.json`) | yes | yes | yes | **lateral outline only**, carried in each deck as `FOOTPRINT` |
| **vNAS video maps** (`/Files/VideoMaps/ZID/{id}.geojson`, the facility's own, **primary since 2026-10-22**) | map 2024-09-30 | map 2024-08-05 | map 2024-09-30 | **CVG: the same polygon as SimAware. IND and SDF: older than SimAware and they disagree.** Section 7. Not carried yet |
| The facility's own export (the `.sct2`) | not held | not held | not held | only for what the public maps do not answer, Part 1 of each gap analysis |
| The SOP diagrams | pictures (SVG) | pictures (SVG) | pictures (SVG) | unmeasured; a lead, not a result |

**Nothing in hand gives a sector split, a flow boundary or an altitude.** The outline answers *is this point inside the facility*, and that is all.

## 2. What SimAware carries

Pulled with `curl -sL https://raw.githubusercontent.com/VATSIM-Radar/simaware-tracon-project/main/Boundaries/<ID>/<ID>.json`. Repository `main` at **`cf9feb3b1ada2a80804fe65777669647e27396fd`**; the three files were last changed in commit **`0ff2b549175de2b02485af984c109108dfa09290` on 2025-03-27**. Each is a GeoJSON `Feature` with `properties {id, prefix, name}` and a `MultiPolygon` holding **one polygon of one ring**. No altitude, no sector, no flow.

| Facility | SimAware name | Vertices | Latitude span | Longitude span | Area (sq NM) | vNAS area centre |
| --- | --- | --- | --- | --- | --- | --- |
| IND | Indianapolis Approach | 27 | 38.8965 to 40.5583 | -86.9750 to -85.0917 | 5689 | 39.7178, -86.3000 (inside) |
| SDF | Louisville Approach | 24 | 37.4844 to 38.9563 | -86.7500 to -84.9667 | 5750 | 38.1861, -85.7269 (inside) |
| CVG | Cincinnati Approach | 25 | 38.4369 to 39.5833 | -85.5003 to -83.8833 | 4585 | 39.0488, -84.6678 (inside) |

Area is computed on a local flat plane at the mid latitude; it is a sanity figure, not a surveyed one. The vNAS `visibilityCenter` is a display centre, and its 150 NM surveillance range is a display range, **not a boundary**.

## 3. Which fields fall inside, and how far from the edge

Field coordinates are the CIFP 261001 airport reference points. **Every field the facility works with a coordinate is inside.** The distance to the edge is what says how far to trust that: the outline is good to about two miles at best, so a field inside two miles of the edge is inside the outline's own error.

### IND

| Field | Position | Distance to the edge | Against the tolerance |
| --- | --- | --- | --- |
| KIND | inside | 28.8 NM | clear |
| KAID | inside | 12.7 NM | clear |
| KBAK | inside | 18.4 NM | clear |
| KCFJ | inside | 1.8 NM | **within the two-mile tolerance** |
| KEYE | inside | 23.3 NM | clear |
| KGEZ | inside | 16.0 NM | clear |
| KGPC | inside | 5.5 NM | clear |
| KHBE | inside | 24.6 NM | clear |
| KHFY | inside | 29.1 NM | clear |
| KMIE | inside | 11.3 NM | clear |
| KMQJ | inside | 16.8 NM | clear |
| KOVO | inside | 4.9 NM | clear |
| KTYQ | inside | 11.4 NM | clear |
| KUMP | inside | 11.8 NM | clear |
| KUWL | inside | 5.3 NM | clear |
| 2R2 | inside | 21.7 NM | clear |
| 5I4 | inside | 2.3 NM | clear |
| I34 | inside | 1.2 NM | **within the two-mile tolerance** |
| I99 | inside | 7.2 NM | clear |

### SDF

| Field | Position | Distance to the edge | Against the tolerance |
| --- | --- | --- | --- |
| KSDF | inside | 27.6 NM | clear |
| KLOU | inside | 24.1 NM | clear |
| KFTK | inside | 23.3 NM | clear |
| KJVY | inside | 22.3 NM | clear |
| KBFR | inside | 1.3 NM | **within the two-mile tolerance** |
| KSER | inside | 0.7 NM | **within the two-mile tolerance** |
| KIMS | inside | 0.1 NM | **within the two-mile tolerance** |
| KBRY | inside | 15.9 NM | clear |
| KEKX | inside | 9.9 NM | clear |
| KFRH | inside | 2.3 NM | clear |
| 6I2 | inside | 4.0 NM | clear |
| I93 | inside | 6.5 NM | clear |

### CVG

| Field | Position | Distance to the edge | Against the tolerance |
| --- | --- | --- | --- |
| KCVG | inside | 31.4 NM | clear |
| KLUK | inside | 24.4 NM | clear |
| KHAO | inside | 11.8 NM | clear |
| KOXD | inside | 4.8 NM | clear |
| KHLB | inside | 11.2 NM | clear |
| I67 | inside | 19.4 NM | clear |
| I69 | inside | 14.7 NM | clear |
| K62 | inside | 15.1 NM | clear |

## 4. How far to trust it - stated, not assumed

- **About two miles, and that figure was earned at M98, not here.** SimAware's M98 footprint was compared with nine owner-verified radial/DME points and agreed to within about two miles (`claude_Community_Geometry_Sources.md`). There is no owner-verified or facility-exported ZID boundary to compare against, so the figure is carried over as the best available statement and the decks say it has not been checked at ZID.
- **Maintained by the facilities.** The project's README gates every merge on a verified Region, Division or ARTCC staff account, with GIS screenshots and AIP documentation expected on a boundary change (corrected into the repository on 2026-09-23). That raises the provenance and does not raise the accuracy: a verified contributor is not a surveyor.
- **No licence.** SimAware publishes none. Provenance and licence are separate questions; the owner decided to use the outline on 2026-10-19. Attribution is on the page in each deck, under the Lateral footprint section and in the data map.
- **It sits below the SOP's diagrams, below anything the owner supplies, and below a facility export, and must never overwrite any of them.**
- **It is a source of record, not a change detector.** The three files have not changed since 2025-03-27, and the SOPs have been revised since (IND 2026-05-28, SDF 2026-09-04, CVG 2026-09-03; each SOP's changelog records a combined-airspace and ATCT boundary update on 2025-02-03). **A facility revision would only show in a fresh pull.**
- **SimAware also carries LEX, CMH and the other ZID TRACONs;** not used, because the three SOPs the owner supplied do not cover them.

## 5. What the decks do with it

Each deck carries the ring as `FOOTPRINT` (`[lat, lon]`, closing vertex dropped), with `inFootprint(lat, lon)`, `edgeNm(lat, lon)` and `containment()`, and a **Lateral footprint** section on the *Fly it* page: a plot of the outline with the fields on it and the table above. Nothing is graded against it, nothing is flown along it, and the slot `footprint` is `partial`. The slots `boundaries` (sector and flow boundaries) and `flowairspace` stay `empty`: **an outline is not a sector.**

## 6. The vertices

Decoded from the three files, `[lat, lon]`, rounded to five decimals (about a metre), closing vertex dropped.

### IND (27 vertices)

| # | Latitude | Longitude |
| --- | --- | --- |
| 1 | 39.98611 | -85.19167 |
| 2 | 39.77500 | -85.22500 |
| 3 | 39.57889 | -85.23389 |
| 4 | 39.57806 | -85.31750 |
| 5 | 39.45556 | -85.50028 |
| 6 | 39.08333 | -85.50000 |
| 7 | 38.95627 | -85.49875 |
| 8 | 38.95218 | -85.72662 |
| 9 | 38.89650 | -86.37190 |
| 10 | 39.00000 | -86.50000 |
| 11 | 39.29167 | -86.87083 |
| 12 | 39.38333 | -86.90000 |
| 13 | 39.95417 | -86.97500 |
| 14 | 40.00000 | -86.95000 |
| 15 | 40.07083 | -86.91667 |
| 16 | 40.16389 | -86.86667 |
| 17 | 40.22500 | -86.35000 |
| 18 | 40.20833 | -86.08333 |
| 19 | 40.11944 | -85.95556 |
| 20 | 40.27083 | -85.79750 |
| 21 | 40.50278 | -85.56139 |
| 22 | 40.55833 | -85.50417 |
| 23 | 40.51667 | -85.47500 |
| 24 | 40.43333 | -85.31667 |
| 25 | 40.30000 | -85.09167 |
| 26 | 40.08306 | -85.15750 |
| 27 | 40.00000 | -85.18583 |

### SDF (24 vertices)

| # | Latitude | Longitude |
| --- | --- | --- |
| 1 | 38.52573 | -85.10193 |
| 2 | 38.47333 | -84.96667 |
| 3 | 38.21116 | -85.15275 |
| 4 | 37.83953 | -85.06946 |
| 5 | 37.72574 | -85.04413 |
| 6 | 37.58158 | -85.00414 |
| 7 | 37.55295 | -85.43959 |
| 8 | 37.51667 | -85.98333 |
| 9 | 37.48438 | -86.54779 |
| 10 | 37.65833 | -86.56667 |
| 11 | 37.93056 | -86.59444 |
| 12 | 38.35417 | -86.65000 |
| 13 | 38.60833 | -86.71250 |
| 14 | 38.70000 | -86.75000 |
| 15 | 38.73621 | -86.74523 |
| 16 | 38.89650 | -86.37190 |
| 17 | 38.95218 | -85.72662 |
| 18 | 38.95627 | -85.49875 |
| 19 | 38.91721 | -85.46053 |
| 20 | 38.83351 | -85.46093 |
| 21 | 38.66833 | -85.46222 |
| 22 | 38.61028 | -85.31361 |
| 23 | 38.60104 | -85.29152 |
| 24 | 38.59349 | -85.27144 |

### CVG (25 vertices)

| # | Latitude | Longitude |
| --- | --- | --- |
| 1 | 39.57889 | -85.23389 |
| 2 | 39.58250 | -84.84694 |
| 3 | 39.58333 | -84.72500 |
| 4 | 39.53889 | -84.29556 |
| 5 | 39.52278 | -84.20500 |
| 6 | 39.47889 | -83.96694 |
| 7 | 39.29333 | -83.91389 |
| 8 | 39.17917 | -83.88333 |
| 9 | 39.14833 | -83.88667 |
| 10 | 38.91111 | -83.91250 |
| 11 | 38.76889 | -83.94389 |
| 12 | 38.43694 | -84.01833 |
| 13 | 38.45167 | -84.38778 |
| 14 | 38.47333 | -84.96667 |
| 15 | 38.52573 | -85.10193 |
| 16 | 38.59349 | -85.27144 |
| 17 | 38.60104 | -85.29152 |
| 18 | 38.61028 | -85.31361 |
| 19 | 38.66833 | -85.46222 |
| 20 | 38.83351 | -85.46093 |
| 21 | 38.91721 | -85.46053 |
| 22 | 38.95627 | -85.49875 |
| 23 | 39.08333 | -85.50000 |
| 24 | 39.45556 | -85.50028 |
| 25 | 39.57806 | -85.31750 |


## 7. The vNAS video maps, 2026-10-22

Added when the owner made vNAS the primary geometry source. The decks are unchanged: they still carry the SimAware ring, for the reason in this section. Method, endpoint and the other facilities' results in root `claude_vNAS_Source_Reference.md`; the map ids below are the citation.

### The three outline maps against the SimAware rings

Each SimAware ring was sampled every nautical mile (331, 320 and 269 samples) and each sample measured to the nearest line in the facility's vNAS map. Maps pulled 2026-10-22.

| Facility | vNAS map (id, `lastUpdatedAt`) | Samples within 0.15 NM | Worst | Mean |
| --- | --- | --- | --- | --- |
| CVG | `CVG TRACON Boundary` (`01H1AR93YBYE4T1QH55QKQBSBY`, 2024-09-30) | **100%** (269 of 269) | 0.07 NM | 0.02 NM |
| IND | `IND TRACON Boundary` (`01H1ANPCMZ93CWNMTBPSP38P85`, 2024-09-30) | 70% (232 of 331) | 7.6 NM | 1.0 NM |
| SDF | `SDF TRACON Boundary` (`01GZRPETBPZ0B20JM5K9T6Z1F8`, 2024-08-05) | 35% (111 of 320) | 10.8 NM | 2.8 NM |

**CVG is the same polygon.** The vNAS map reproduces the SimAware ring along its whole length, so for CVG the two are one source seen twice, as `claude_ZID_ControllerTools_Reference.md` found for the Indy Center tools site. Adding the other ZID TRACON boundary maps (HUF, LEX, CRW, HTS, CMH) moves IND to 73% and SDF to 38%; adding the February 2025 maps (`Filter 2 - ATCT Bound Lines`, `CVG OUTER BOUNDARIES`, `Adjacent Airspace`, `Filter 1 - Low Boundary`) instead moves them to 77% and 36%. Neither closes the gap.

### Where IND and SDF disagree

- **SDF south-east edge.** vNAS: 38.474 N 84.972 W, 38.182 N 85.112 W, 37.870 N 85.122 W, 37.705 N 85.168 W, 37.648 N 85.363 W, 37.594 N 85.543 W, 37.516 N 85.982 W. SimAware (vertices 2 to 9 above): 38.473 N 84.967 W, 38.211 N 85.153 W, 37.840 N 85.069 W, 37.726 N 85.044 W, 37.582 N 85.004 W, 37.553 N 85.440 W, 37.517 N 85.983 W. Only the two ends meet; the middle sits up to about eleven miles apart.
- **IND/SDF shared border.** vNAS draws it along 39.0 N to 39.083 N, from 86.5 W to 85.5 W; the SimAware ring has IND vertices 7 to 9 (38.956 N 85.499 W, 38.952 N 85.727 W, 38.897 N 86.372 W), six to eight miles south of it.
- **Why the vNAS maps are probably the stale ones.** Both are dated 2024. Each ZID SOP's changelog records a combined-airspace and ATCT boundary update on **2025-02-03**, and the SimAware files were last changed **2025-03-27**. CVG's boundary did not move, and CVG's 2024 map matches. **This is an inference from dates.** Nobody has said which ring is current, and the SOP diagrams (SVG) are the arbiter.
- **Not resolved, and the decks stay on SimAware** for that reason. If the owner or the facility says the vNAS maps are current, the `FOOTPRINT` rings change and the containment table in section 3 is recomputed.

### What else the ZID record lists, pulled 2026-10-22

| Map | Id | Content read |
| --- | --- | --- |
| `ZID ARTCC Sectors` | `01JK5ZAQRXB0V6RPFM066S7084` | 45 lines, 38.02 to 40.01 N, 86.24 to 82.92 W. Sector lines; not matched to sector numbers. |
| `Filter 1 - Low Sectors` | `01JK67Q3G3FBYD47HD0R6B24VM` | 132 lines and a label point, 36.79 to 40.67 N. |
| `Filter 1 - Low Boundary`, `Filter 2 - ATCT Bound Lines` | `01JK6ZE5WFAGD2W7HSBACSP5MT`, `01JK67Q3G4G8STXK2ND2K967FB` | One line each over the whole ARTCC. |
| `ZID Approach Boundaries w HO IDs` | `01HCDKNWJG03R9QSR0D7PTXWKD` | 31 points labelled `<facility>: <digit>` (for example `IND: 5` at 38.91 N 86.30 W and 39.89 N 85.08 W). Not interpreted; a second source for the handoff-ID reference to be compared against, not a replacement for it. |

**Named, not pulled:** `Filter 11 - High Sectors`, the MVA maps (`IND MVA 3NM` and `5NM` dated 2025-10-24, `SDF SDF 3NM MVA`, `SDF FUSION 5NM MVA`, the shared `3NM MVA`, `5NM MVA`, `MVA`), `CVG Class B`, `IND CLASS C-D`, the event splits (`IND Fright Night Event Split`, `Filter 12 - IND_HUF 3-way Event Split`, `Filter 12 - SDF 2-way 1 (E_W) Event Split`, `Filter 12 - CVG-MEM FNO 4-way Event Split`). **No map has been identified as a TRACON sector, flow or runway-configuration boundary for IND, SDF or CVG**, so the slots `boundaries` and `flowairspace` stay `empty`.

### The record

`ZID_vnas.json` was re-pulled the same day (`lastUpdatedAt` 2026-10-22T02:21:21.771Z). No position, frequency, TCP, handoff ID, scratchpad rule or restriction changed against the 2026-10-17 copy the decks were built from.
