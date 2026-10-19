# ZID vNAS Reference - what the record carries for IND, SDF and CVG

Source: `https://data-api.vnas.vatsim.net/api/artccs/ZID`, pulled **2026-10-18**, `lastUpdatedAt` **2026-10-17T02:35:43.475Z**, committed as `ZID_vnas.json` (about 1 MB). This is source 3 of the four (root `CLAUDE.md` section 10). It is **the only source for handoff identifiers**, and a second independent source for positions, scratchpad rules, TDLS defaults and coordination restrictions.

```bash
curl -sS -A "Mozilla/5.0" -o ZID_vnas.json https://data-api.vnas.vatsim.net/api/artccs/ZID
```

## The facility tree

ID `ZID`, Indianapolis ARTCC, NAS ID `I`, 31 center positions, 50 ERAM sectors, neighbours CKB, CLE, CMI, FWA, GUS, HOP, ROA, TOL, TRI, ZAU, ZDC, ZKC, ZME, ZOB, ZTL. Children:

| Facility | Type | Positions | Child towers |
|---|---|---|---|
| PKB Parkersburg | ATCT | 3 | |
| **SDF** Louisville | ATCT/TRACON | 13 | LOU Bowman (3), FTK Godman (2) |
| **IND** Indianapolis | ATCT/TRACON | 14 | BAK Columbus (2), MIE Muncie (2), AID Anderson (2), HBE Himsel (1) |
| LEX Lexington | ATCT/TRACON | 7 | |
| **CVG** Cincinnati | ATCT/TRACON | 19 | LUK Lunken (2) |
| EVV Evansville | ATCT/TRACON | 6 | OWB (2) |
| HTS Huntington | ATCT/TRACON | 6 | |
| HUF Hulman | ATCT/TRACON | 6 | BMG (2) |
| CMH Columbus | ATCT/TRACON | 13 | DAY, LCK, TZR, OSU, FFO, ILN |
| CRW Charleston | ATCT/TRACON | 7 | |

The user's saved SOPs cover IND, SDF and CVG only. The other seven TRACONs are in the record and not worked.

## What was extracted for each of the three

### IND

- **Areas:** Indianapolis TRACON (range 150 NM, centre 39.717778, -86.3; underlying 24); Indianapolis Tower (range 50 NM, centre 39.7086304, -86.3044676; underlying 1)
- **Internal airports (24):** 2R2 5I4 81II 8A4 AID BAK CFJ EYE GEZ GPC HBE HFY I34 I99 IN35 IN74 IN84 IND MIE MQJ OVO TYQ UMP UWL
- **Beacon code banks:** Ifr subset 1: 3401-3477; Vfr subset 2: 3401-3477. The SOP states no allocation; single-sourced.
- **Configuration plans:** R05 = RUNWAY 05 CONFIG; R14 = RUNWAY 14 CONFIG; R23 = RUNWAY 23 CONFIG; R32 = RUNWAY 32 CONFIG; TWT = TOWER CONFIG 1T; TWX = TOWER CONFIG 1X; TWY = TOWER CONFIG 1Y
- **RNAV patterns:** GIIBS# JAKKS# KOLTS# MAREO# SMUKE# SNKPT#
- **ATPA volumes:** IND RWY 05L (ceiling 13000); IND RWY 05R (ceiling 13000); IND RWY 23L (ceiling 13000); IND RWY 23R (ceiling 13000); IND RWY 14 (ceiling 13000); IND RWY 32 (ceiling 13000)
- **Runway-pair configurations (RPCs):** #1 IND: 05L+14; #2 IND: 05L+32; #3 IND: 05R+14; #4 IND: 05R+32; #5 IND: 23L+14; #6 IND: 23L+32; #7 IND: 23R+14; #8 IND: 23R+32
- **Video maps listed for this STARS facility:** 158 ids. **vNAS does not expose video-map geometry** (probed 2026-09-01; the ZID record carries names, brightness and source filenames only).
- **Scratchpad rules (20), route-based coordinations (12), restrictions involving IND (26):** in the facility LOA reference.
- **TDLS:** departure frequencies 124.950, 119.050; initial altitudes 5000, 3000; expect 10 MIN AFT DP; 2 operation configurations (Master, FedEx Ramp).

### SDF

- **Areas:** Louisville TRACON (range 150 NM, centre 38.18611, -85.72694; underlying 12); Louisville Tower (range 50 NM, centre 38.18611, -85.72694; underlying 1); Bowman Tower (range 50 NM, centre 38.227984, -85.6637491; underlying 1)
- **Internal airports (12):** 6I2 BFR BRY EKX FRH FTK I93 IMS JVY LOU SDF SER
- **Beacon code banks:** Ifr subset 1: 1401-1477; Vfr subset 2: 1401-1477. The SOP states no allocation; single-sourced.
- **Configuration plans:** CO1 = ALL TO 1D; CO2 = 17/35 1D/1B; CO3 = 17/35 1A/1D; CO4 = 17/35 1A/1D/1B; CO5 = RWY 17/3 1A/1I 1D/1B; CO6 = RWY 29 SPLIT 1D/1B; CO7 = ALL TO 1T
- **RNAV patterns:** DLAMP# EEVAA# GTGON# HIDEY# JMONY# LEDDL# LLIZY# LOKRD# MBELL# RDHSE# SPILR#
- **ATPA volumes:** SDF17L (ceiling 8000); SDF17R (ceiling 8000); SDF35L (ceiling 8000); SDF35R (ceiling 8000); SDF29 (ceiling 8000)
- **Runway-pair configurations (RPCs):** #1 SDF: 17R+27R; #2 SDF: 17L+27L; #3 SDF: 35R+25R; #4 SDF: 35L+25L
- **Video maps listed for this STARS facility:** 122 ids. **vNAS does not expose video-map geometry** (probed 2026-09-01; the ZID record carries names, brightness and source filenames only).
- **Scratchpad rules (14), route-based coordinations (20), restrictions involving SDF (36):** in the facility LOA reference.
- **TDLS:** departure frequencies 132.075, 123.675; initial altitudes 5000FT, 3000FT; expect 10 MIN AFT DP; 2 operation configurations (Master, UPS Ramp).

### CVG

- **Areas:** Cincinnati TRACON (range 150 NM, centre 39.0488375, -84.6678208; underlying 8); Cincinnati Tower (range 50 NM, centre 39.0405894, -84.6587992; underlying 1); Lunken Tower (range 30 NM, centre 39.107264, -84.4229877; underlying 1)
- **Internal airports (8):** CVG HAO HLB I67 I69 K62 LUK OXD
- **Beacon code banks:** Ifr subset 1: 3701-3777; Vfr subset 2: 3701-3777. The SOP states no allocation; single-sourced.
- **Configuration plans:** CO1 = SOUTH OP 18C/18L; CO2 = SOUTH OP 18R/18L; CO3 = NORTH OP 36C/36R; CO4 = NORTH OP 36L/36R; CO5 = WEST OP, ALL OPEN; CO6 = EAST OP, ALL OPEN; CO7 = WEST OP, ALL @ WEST; CO8 = EAST OP, ALL @ WEST
- **RNAV patterns:** BNGLE# CEGRM# CHCLL# GAVNN# GIPLE# HAGOL# HEDEE# JAKIE# JBNCH# KENLN# LOVEY# ROCKT# SARGO# SILKS# TIGGR#
- **ATPA volumes:** APPROACH 18C (ceiling 8000); APPROACH 18L (ceiling 8000); APPROACH 18R (ceiling 8000); APPROACH 36C (ceiling 8000); APPROACH 36L (ceiling 8000); APPROACH 36R (ceiling 8000); APPROACH R09 (ceiling 8000); APPROACH 27 (ceiling 8000)
- **Runway-pair configurations (RPCs):** #1 CVG: 01+02
- **Video maps listed for this STARS facility:** 97 ids. **vNAS does not expose video-map geometry** (probed 2026-09-01; the ZID record carries names, brightness and source filenames only).
- **Scratchpad rules (17), route-based coordinations (14), restrictions involving CVG (47):** in the facility LOA reference.
- **TDLS:** departure frequencies 126.650, 128.700; initial altitudes 5000, 4000; expect 10 MIN AFT DP; 17 operation configurations (Master, Northwest, Southwest, North, South, East, West, 36R Only, 18L Only, NW RC, SW RC, North RC, South RC, East RC, West RC, 36R O RC, 18L O RC).

## Things in the record that look wrong, recorded and not corrected

- **CVG `rnavPatterns` spells TIGRR as `TIGGR#`.** The procedure is TIGRR (CIFP 261001).
- **SDF RPCs name runways 27R, 27L, 25R and 25L**, and Louisville has none of them. Probably adaptation placeholders.
- **CVG Clearance Delivery is 120.400 in vNAS and 127.17 in the SOP; DHL Ramp is 129.475 in vNAS and 120.40 in the SOP.** See the CVG gap analysis.
- **Ground Control East at CVG is TCP 1X in vNAS, the same TCP as the vNAS-only Controller In Charge**; the SOP says T.
- **Bowman Local has no TCP of its own in the LOU child record**; the SDF facility carries TCP 1Z, which the SOP names as the Bowman rundown sender. The SOP's position table says U.

## What the record does not carry

Sector polygons, altitude strata, video-map geometry, MVA, delegation text. `eramConfiguration.sectors` is `{id, sectorId, name}` only. Nothing here closes the geometry gap (root `CLAUDE.md` section 7).
