# vNAS public data - what it holds, how to pull it, and how far it may be trusted

Pulled and measured **2026-10-22**, from the owner's `vnas-api` skill archive and then against the live service. Sits alongside `claude_Community_Geometry_Sources.md` and `claude_CRC_Platform_Reference.md`. **Read it before writing anything spatial into a tool, and before saying vNAS "does not have" something.**

## 1. The answer, and what it overturns

**vNAS publishes the facilities' own video-map GeoJSON, unauthenticated.** Root `CLAUDE.md` section 7, `claude_CRC_Platform_Reference.md` section 5.1 and a run of facility references said the opposite, citing a 2026-09-01 probe where every candidate endpoint 404'd. **That probe tried guessed paths** (`/api/videomaps/{id}`, `/api/video_maps/{id}`, `/api/artccs/ZMP/videomaps`, `/data/video_maps/{id}.geojson`). None of them is the real one:

```
https://data-api.vnas.vatsim.net/Files/VideoMaps/{ARTCC}/{videoMapUlid}.geojson
```

The ULID is `videoMaps[].id` in the ARTCC record we already hold. The base URL is `videoMapBaseUrl` in the discovery document, which is the thing to read instead of hardcoding it.

**Owner decision, 2026-10-22: vNAS is the primary geometry source, then VATGlasses, then SimAware.** The reason is the one the owner gave: vNAS is what the facilities themselves edit when something changes. Section 6 says what that means in practice, because measuring it turned up two places where it is not the whole story.

## 2. Endpoints

All unauthenticated GETs. The host is behind Cloudflare and refuses a default library agent (`Python-urllib` gets a 403); `curl` and any identifying `User-Agent` work.

| What | URL | Notes |
| --- | --- | --- |
| Discovery | `https://configuration.vnas.vatsim.net/` | `dataApiBaseUrl`, `videoMapBaseUrl`, `aliasesBaseUrl`, `navDataUrl`, serials, the four environments. Read it; do not hardcode the rest. |
| Staleness | `{dataApi}/artcc-summaries` | 24 ARTCCs, `lastUpdatedAt` and `eramDataLastUpdatedAt`. About 3 KB. **The thing to poll.** |
| ARTCC record | `{dataApi}/artccs/{ID}` | 0.3 to 1.0 MB. The nested facility tree: positions, frequencies, TCPs, handoff IDs, restrictions, scratchpad rules, `videoMaps[]` metadata. **No per-facility endpoint**; walk `facility.childFacilities[]`. |
| Video map | `{videoMapBaseUrl}/{ARTCC}/{ulid}.geojson` | `/Files/*` sends `ETag` and `Last-Modified` and honours a conditional GET. `/api/*` sends neither, so invalidate against `lastUpdatedAt`. |
| Training | `{dataApi}/training/scenario-summaries` and others | 1,950 scenarios (149 ZMP, 39 ZID, 149 ZAU, 79 ZLC). **Not used by any tool here**; issue #53 is the decision about drills as scenarios. |
| Live controllers | `https://live.env.vnas.vatsim.net/data-feed/controllers.json` | A network call. **Not to be added to any tool**: invariant 6 allows one, and the D-ATIS fetch is it. |

**Frequencies are integer hertz** (`124625000` is 124.625). In the controller feed `199998000` means inactive.

## 3. Pulling it - `tools/vnas/vnas.pl`

There is no Python and no Node on the owner's machine. Perl and curl are there, so the puller is perl, like the CIFP decoder beside it.

```bash
perl tools/vnas/vnas.pl summaries                              # lastUpdatedAt for every ARTCC
perl tools/vnas/vnas.pl artcc ZID ZID/_vnas/ZID_vnas.json      # refresh a snapshot, as served
perl tools/vnas/vnas.pl diff old.json new.json                 # what changed, keyed by id not by position
perl tools/vnas/vnas.pl maps ZID/_vnas/ZID_vnas.json 'MVA'     # map ids and names, from the record
perl tools/vnas/vnas.pl map ZID 01H1ANPCMZ93CWNMTBPSP38P85 out.geojson   # conditional GET
perl tools/vnas/vnas.pl stats out.geojson                      # features, vertices, bounds, sentinels
```

A snapshot is the record **as served**, one line, committed under `<ARTCC>/_vnas/<ID>_vnas.json`. **Re-pull it when `artcc-summaries` says it moved** and run `diff` before trusting that nothing operational changed. Map geometry is not committed: it is large (one M98 map is 9.4 MB), re-pullable by id, and the citation is the **map id plus its `lastUpdatedAt`**.

## 4. What a video map is, and is not

A CRC video map is **drawing, not airspace**. Measured on the maps pulled 2026-10-22:

- **Lines, mostly.** `LineString` features with a style and a thickness; `Point` for symbols and labels. **No `Polygon` appeared in any boundary map**, so a ring is a set of segments or one closed line, and has to be found.
- **No altitude anywhere in the geometry.** Where a map has an altitude it is in the map's **name** (`M98 145 12 4000`) or in a separate text map. A name is the facility's label, not a stated limit; cite it as a name.
- **Sentinels and junk.** Most files carry `[0,0]` degenerate lines; some carry placeholder coordinates such as `178.1, 138.8` that are labels, not places. `vnas.pl stats` counts them and drops them.
- **One ring is rarely one map.** A facility outline may be one closed 9-vertex line (M98), or sit among 1,032 other lines in `R90 001 MAIN`, or be split across segments and shared with its neighbour (IND, SDF).
- **Maps are dated, individually.** `lastUpdatedAt` on the map is the only change detector there is, and it is how section 6 caught two stale outlines.
- **Many maps are not geometry for us at all**: airport diagrams (`M98 TDM`, 9.4 MB), approach fixes, roads, counties, filters. The record lists 1,359 maps for ZMP and 967 for ZID; the useful ones are a few dozen.

## 5. Finding an outline, and what was found

Method: take the SimAware ring we already carry, sample it every nautical mile, and measure the distance from each sample to the nearest line in a candidate map. A map that holds the ring puts essentially every sample within a fraction of a mile. This is a **test for one polygon seen in two places**, and it says nothing about whether the polygon is right.

| Facility | vNAS map (id) | Dated | Samples within 0.5 NM of the SimAware ring | Reading |
| --- | --- | --- | --- | --- |
| **M98** | `M98 106 AIRSPAC` (`01H7X13T4WF4EFJMD76VQ6YH54`) | 2026-04-03 | 100%, mean 0.04 NM | **The M98 boundary as a 9-vertex closed line.** Vertex 5 is SimAware's shared M98/RST vertex to the fifth decimal. Same polygon. |
| **R90** (Omaha) | `R90 001 MAIN` (`01H7Y164HGF5M6PFB0CCB5K2RQ`) | 2023-08-16 | 100%, mean 0.07 NM | The Omaha ring is in the map, among 1,032 lines. Lincoln not tested. `R90 008 ZMP` is *not* the outline. |
| **AZO** | `AZO MAIN` (`01GFM1XC2NQTC3DR0BEZDAZPHQ`) | 2026-03-06 | 100%, mean 0.01 NM | Same polygon as SimAware and as the VATGlasses footprint. |
| **CVG** | `CVG TRACON Boundary` (`01H1AR93YBYE4T1QH55QKQBSBY`) | 2024-09-30 | 100%, worst 0.07 NM | Same polygon. |
| **IND** | `IND TRACON Boundary` (`01H1ANPCMZ93CWNMTBPSP38P85`) | 2024-09-30 | 73 to 77% | **Disagrees**, section 6. |
| **SDF** | `SDF TRACON Boundary` (`01GZRPETBPZ0B20JM5K9T6Z1F8`) | 2024-08-05 | 36 to 38% | **Disagrees**, section 6. |
| **C90** | `C90 MAIN` (`01GFM1XR7B4QB9YXD1YFRDCA8H`) | 2026-07-09 | 65%, mean 0.51, worst 5.1 NM | Partly matches; not resolved. The ring is not isolated in this map. |
| **S56** | `S56 107 N Flow Base Map`, `S56 109 South Flow Base Map` | 2025-11-07 | 59 to 60%, mean 0.8, worst 5.3 NM | Partly matches; not resolved. |
| **Big Sky** (BOI, BZN) | none identified | - | - | Three BOI maps tried, none holds the ring. Not found, not absent. |

**The reading that matters: where a vNAS outline was found it is the same polygon SimAware carries, to a tenth of a mile.** SimAware's boundaries are facility-maintained (README gate, `claude_Community_Geometry_Sources.md` section 4.2), and the facilities draw both from one sector file. So the two are **one source seen twice**, not two confirmations, and moving a deck from SimAware to vNAS changes the citation and the change detector, not a vertex. The M98 boundary check in section 4.1 of that file stands as it was; vNAS adds the same ring with a dated map id.

## 6. Where vNAS is not the whole story

**Two outlines are older in vNAS than in SimAware, and the disagreement is named, not resolved.**

- **SDF.** The vNAS map (2024-08-05) runs its south-east edge through 38.182 N 85.112 W, 37.870 N 85.122 W, 37.705 N 85.168 W and 37.516 N 85.982 W. The SimAware ring (files last changed 2025-03-27, carried in the SDF deck) runs through 38.211 N 85.153 W, 37.840 N 85.069 W, 37.582 N 85.004 W and 37.517 N 85.983 W. The two part by as much as about nine nautical miles.
- **IND.** The vNAS map draws the IND/SDF shared border at 39.0 N to 39.083 N; the SimAware ring has it at 38.95 N to 38.90 N, three to five miles south.
- **Why it is probably a stale map and not a bad ring.** Each ZID SOP's changelog records a combined-airspace and ATCT boundary update on **2025-02-03** (`ZID/CLAUDE.md`), which falls between the two. CVG's boundary did not move, and CVG's 2024 map matches SimAware exactly. **That is an inference.** The facility has not said which is current, and the SOP diagrams (SVG) are the arbiter nobody has measured.

**vNAS carries no altitude.** For ZLC and ZAU the altitude strata and ownership chains stay where they were, in the VATGlasses datasets (`claude_Community_Geometry_Sources.md` sections 2 and 3). Precedence is therefore per slot: lateral outline from vNAS first; strata from VATGlasses only.

**An owner-supplied boundary is not outranked by this change on its own.** The M98 ring (`ZMP/M98 Training/claude_M98_Airspace_Boundary.md`) was supplied by the owner and cross-checked; whether it should now move onto the vNAS ring, as the Rochester segment moved onto SimAware in issue #59, is the owner's to say. The measured difference is in `ZMP/_vnas/claude_ZMP_vNAS_Geometry_Reference.md`.

## 7. What vNAS carries that nothing else did

Named by map title, with the map pulled and its extent read only where the entry says **pulled**. A title is the facility's label.

- **M98.** Pulled: `M98 153 MVA` and `M98 154 MVA 5NM` (115 and 62 lines, no altitude values in the geometry); `M98 140/141/142 30 4000/6000/7000` and `M98 145/146/147 12 4000/6000/7000` (17 lines each, one set per landing flow); `M98 161 SAT EXT` and the satellite-boundary series `162`, `163`, `164`, `167`, `168`, `169`, `170` (`SB GK12`, `SB GK30`, `SB SHLF`, `SB GK27`, `SB STP`, `SB R27`, `SB GK`); `M98 171 10MIRNG`, `172 5MIRNG`; `M98 432 CLASS B`, `443 CLASS-B`, `467 CLASS D`; `M98 236 12 SHLF` and `237 1217SHF` (about 1,200 short lines each). Named only: `M98 104 4FINAL`, `117 17FINAL`, `122 22FINAL`, `135 35FINAL`. Issue #27 (DDA extensions, satellite cutouts, Runway 30 area) names the shapes these titles suggest. **What each shape is has not been established.**
- **ZMP.** `M98 ZMPEVNT` (pulled, 1,484 lines) is a ZMP event split.
- **ZID.** Pulled: `ZID ARTCC Sectors` (45 lines), `Filter 1 - Low Sectors` (132 lines), `Filter 1 - Low Boundary`, `Filter 2 - ATCT Bound Lines`, `Adjacent Airspace`, `CVG OUTER BOUNDARIES`, and **`ZID Approach Boundaries w HO IDs`: 31 Point features labelled like `IND: 5`**, which is a handoff-ID map. It is a second source for the ID reference to reconcile against, not a replacement for it. Named only: `Filter 11 - High Sectors`, `Filter 11 - High Boundary`, the MVA maps for IND, SDF, CVG, HUF, LEX, CMH, EVV, CRW and HTS, `CVG Class B`.
- **ZAU.** Pulled: `AZO SECTORS` (56 lines, 542 vertices), the first sign of the six AZO sector boundaries that `CLAUDE.md` section 7 says stay empty; `C90 MAIN`, `C90 ZAU LOW SECTORS`, `C90 SHORELINE`, `C90 CAPTURE BARS`. Named only: `C90 FEEDER 22`, `4R`, `EAST`, `WEST`, `C90 FINALS EAST` and `WEST`.
- **ZLC.** Pulled: `S56 107` and `109` (north and south flow base maps), `S56 302` and `303` (Alpine boundary by flow), `BOI_006S`, `BOI_011S East Flow Sector Altitudes`, `BOI_012S West Flow Sector Altitudes`. Named only: `S56 144/145` (tower flow splits), `S56 148 Heber Shelf`, `BOI_120S East Flow Altitudes`.

## 8. The record itself: fresher than the tree, and operational data unchanged

The committed snapshots were stale, and one ARTCC had no snapshot at all. Re-pulled and diffed 2026-10-22:

| ARTCC | Committed | Live | Operational change |
| --- | --- | --- | --- |
| ZMP | 2026-08-26 | 2026-10-01 | **None.** A new `isExcluded: 0` field on every ERAM sector (50 added, 2 timestamps changed). |
| ZID | 2026-10-17 | 2026-10-22 | A third Center airspace configuration, `Consolidated` (owning sector 83, 58 assigned IDs), and ID 76 moved between assignments in `01M3FJBJ9HCBNQE041MA23V6F5`. **No position, frequency, TCP, handoff ID, scratchpad rule or restriction changed.** |
| ZAU | none | 2026-10-17 | First snapshot. |
| ZLC | none | 2026-10-22 | First snapshot. |

Every vNAS frequency and callsign for C90, AZO, S56, BOI and BZN was looked up in the ZAU and ZLC reference markdown. **All matched except** AZO's tower, ground and delivery positions (`AZO_TWR` 118.300, `AZO_GND` 121.900, `AZO_DEL` 121.750) and Bozeman's second frequency (`BZN_APP` 119.550, "Bozeman LVM Freq"), which no reference mentions. Those are gaps in the references, not conflicts.

## 9. Licence and provenance

vNAS publishes no licence for the video maps that was found. They are facility-authored drawing on a volunteer-run simulation network, **not FAA data and not FAA-affiliated**. The owner decided on 2026-10-22 to use them as the primary source. **Cite the map id and its `lastUpdatedAt`, never "vNAS" alone**, and print the attribution on the page beside any outline drawn from one, as is done for SimAware and VATGlasses. Share-alike obligations from VATGlasses are unaffected.

**Handoff IDs have always come from the vNAS record and still do** (`claude_ZMP_Handoff_ID_Reference.md`).
