# IND Gap Analysis - what the documents do not answer

Assembled 2026-10-19 from a full read of the saved Indianapolis (IND) ATCT SOP page, the vNAS record for ZID, CIFP 261001 and the ZID vATIS profile (serial 2026081300).

**The headline: every SECTOR boundary in the SOP is a picture, and the only community geometry for ZID is a lateral outline.** VATGlasses has no ZID dataset (checked 2026-10-18; the upstream list carries zab, zak, zau, zeg, zhn, zhu, zjx, zlc, zma, zny, zoa, zob, zse and others, not zid). **SimAware publishes the lateral `IND` outline, and it is carried in the deck** (owner decision, 2026-10-19;  vertices, about  sq NM, no altitudes, no licence, about two miles at best and unchecked at ZID). It says whether a point is inside the facility and nothing about which sector owns it or under what ceiling, so every sector, flow and altitude gap below stands. See `../_shared/claude_ZID_Sector_Geometry_Reference.md`.

**A lead worth testing, not a result:** the saved SOP pages hold the sector diagrams as **SVG files**, not raster images. SVG is machine-readable, so the artwork can be measured directly - the problem becomes georeferencing it (fitting the drawn fixes to CIFP fix coordinates), not extracting it. Nothing here has been measured. See root `CLAUDE.md` section 7: a community or traced boundary is second-tier and must carry its stated tolerance.

---

## Part 1 - what the owner could supply, ranked by training value

### 1. The sector boundaries, as GeoJSON or the .sct2

Every sector and flow diagram in the SOP is a picture (Part 3). **The smallest useful ask:** the STARS video-map GeoJSON or the `.sct2` that the IND maps were built from (root `CLAUDE.md` section 7, the third path), or failing that the Departure, Feeder, Final and Satellite boundaries for runway flows 5 and 23 as radial/DME points. The saved SOP pages already hold the diagrams as SVG - a second route that needs no one's permission but a georeference.

### 2. What is INDY#, and why are OOM5 and ROCKY1 not coded at KIND?

SOP 3 assigns INDY# to jets and requires it below 11000; CIFP codes no INDY at any field this deck works. OOM5 and ROCKY1 are coded at the satellites but not at KIND. **Smallest useful form:** the chart or the route text for INDY, and confirmation that OOM and ROCKY are valid off KIND.

### 3. Which runways are used in a 14 or 32 configuration?

SOP 6 says only that LC must be combined; the vATIS preset `32/14` names runway 32 alone. The tool infers landing and departing runways from the configuration name and flags the inference.

### 4. The ICT

SOP 7 says controllers may reference it for the full list of restrictions and handoffs. It is not in the pull; the vNAS Restrictions (26 involving IND) are the nearest equivalent.

### 5. The BAK, MIE, AID and HBE tower SOPs

SOP 7 defers to them for departures from the underlying towers. They are separate wiki documents.

### 6. Spoken forms for the procedure and fix names

All unspecified (`claude_IND_TTS_Voicing.md`). GIIBS, JAKKS, KOLTS, RACYR, SMUKE, SNKPT, MEARZ and MAREO are the likely mispronunciations.

### 7. Is there a D-ATIS for KIND?

Not surveyed. `claude_DATIS_Field_Survey.md` covers the fields the other decks work; KCVG appears in its national list but KIND and KSDF are not checked. No ZID deck has a D-ATIS reader.

## Part 2 - not stated in any document, and not recoverable by anyone

- **What does the ICT hold that SOP 7 does not?** - The SOP says controllers may reference the ICT for the full list of restrictions and handoffs. It is not in the pull and the SOP does not name it.
- **What is the INDY# departure?** - The SOP assigns it to jets (SOP 3) but CIFP codes no INDY procedure anywhere. It may be a conventional departure not carried in CIFP.
- **Why are OOM5 and ROCKY1 coded only at satellites?** - CIFP lists them at EYE, GEZ, HFY, MQJ, TYQ and UMP but not KIND, while the SOP gives them to KIND jets and props.
- **Which runways are landed and departed in a 14 or 32 configuration?** - SOP 6 says only that LC must be combined; the vATIS preset names runway 32 alone.
- **Which ZAU sector takes MEARZ departures?** - The SOP names the ARTCC only; vNAS gives 35 and 51.
- **What do the BAK, MIE, AID and HBE tower SOPs say about releases and headings?** - IND SOP 7 defers to them for departures from the underlying towers.

## Part 3 - unread because it is a picture

| What | Where |
| --- | --- |
| IND delegated airspace (consolidated) | IND SOP 7 Overview - consolidated_airspace.svg |
| LC airspace, runways 5, 23, 14, 32 | IND SOP 6 - runway_5.svg, runway23.svg, rwy14.svg, rwy32.svg |
| Departure Radar airspace, four flows | IND SOP 9 - dr_05.svg, dr_23.svg, dr_14.svg, dr_32.svg |
| Feeder Radar airspace and flow, four flows | IND SOP 9 - fr_05/23/14/32.svg and the _flow variants |
| Final Radar airspace, four flows | IND SOP 9 - fn_05.svg, fn_23.svg, fn_14.svg, fn_32.svg |
| Satellite Radar airspace, four flows | IND SOP 9 - st05.svg, st_23.svg, st_14.svg, st32.svg |
| FedEx ramp entry and exit points | IND SOP 4 - ind_ramp_north/south_runway_5/23.svg |
| Terminal and cargo parking spots | IND SOP 5 - airline_parking_spots.png, cargo_parking_spots.png |
| B748 taxi routes | IND SOP 5 - b748_taxi_routs.svg |
| Block EYE and Block 2R2 protected areas | IND SOP 6 - block_eye.png, block_2r2.png |
| LIFT practice areas and arrival paths | IND SOP 1 - lta_practice_areas.png, 5-23_lta_arrivals.png, 14-32_lta_arrivals.png |

The saved page carries these as files named above; the SVGs are the measurable ones.

## Part 4 - conflicts and as-written anomalies, preserved rather than corrected

- **MAREO# scratchpad.** A: IND SOP 7 Scratchpad Entries: no MAREO# row in the SID table. B: vNAS primaryScratchpadRules: MAREO# -> MAR. Difference of omission. The SOP table is otherwise identical to the vNAS rules for every other row. Neither is corrected.
- **Which SIDs the airport has.** A: IND SOP 3 IFR Departures: jets are cleared via DAWNN#, OOM#, INDY#, MAREO#, MEARZ# or ROCKY#. B: CIFP 261001 at KIND: DAWNN1, MAREO1, MEARZ7 only. OOM5 and ROCKY1 are coded at KEYE, KGEZ, KHFY, KMQJ, KTYQ and KUMP; INDY is coded nowhere. Not a contradiction - a coding gap, and the SOP names the procedures. CIFP has no runway transitions on the three it does code at KIND, so the tool cannot say which runway a SID leaves.
- **Where MEARZ departures go.** A: IND SOP 7 Departures: North (MEARZ#) to ZAU, climbing 13000 - no sector given. B: vNAS Restriction (IND to ZAU, group NORTH Gate): requesting sectors 35 and 51, owned by DRW. The SOP names the ARTCC; the record names two ZAU sectors. Handoff ID form for a non-host ARTCC is G + sector; the tool composes G35 and G51 and says the record is the only source.
- **FedEx ramp point parity.** A: IND SOP 4 Ramp Control prose: "During a Southwest (Runway 23) Operation, aircraft should enter the ramp at odd number points and even at odd number points". B: IND SOP 4 / 5 table: Southwest (23): exit Even, enter Odd. As written; the sentence repeats "odd". The table is carried. A trainee should treat the table as the rule and the sentence as a typo, but that is a reading, not a correction.
- **Channels printed to two decimals.** A: IND SOP 2 Positions: LCW 127.82, FRD 128.17, FNI 120.52. B: vNAS: 127.825, 128.175, 120.525. Truncation, not disagreement. The tool shows the full channel; a drill must voice 127.825, not 127.82.
- **Coordination rows the vNAS record does not carry.** A: IND SOP 7 Arrivals and SOP 8: FWA to IND (AID, MIE descending 4000) and GUS to IND (IND, AOB 10000). B: vNAS Restrictions involving IND: no FWA-to-IND and no GUS-to-IND row (IND to FWA is present). Difference of omission; the SOP rows are carried and the adaptation may simply not restrict them.

- **Typos in the SOP, carried as written and marked:** `MAERO` (SOP 3 departure frequency table), `Decsend`, `Lanidng` (SOP 7 arrivals), `ODO` in the jet-departure note (probably ODP), `V3401-B` for R3401-B (SOP 7 Special Use Airspace), `Consolidaiton` (SOP 1), `inforamtion` (SOP 4), `pushished` (SOP 8). None is corrected.

## Part 5 - what is fully covered and needs nothing

- **Positions, frequencies and STARS IDs** - IND SOP 2 and the vNAS ZID record, checked against each other. All thirteen agree on frequency and STARS ID. Three channels are printed to two decimals in the SOP. The four child towers (BAK, MIE, AID, HBE) are vNAS only; their own SOPs were not pulled.
- **Runways, lengths, bearings, ILS category** - CIFP 261001 G and I records, threshold-to-threshold distance checked on all three strips (within 1 ft). Primary field only is shown in detail. Satellite runways are carried by identifier for the strip contract.
- **Clearance delivery - SIDs, altitudes, departure frequencies** - IND SOP 3; vNAS tdlsConfiguration. Two sources. The SOP text and the TDLS defaults are shown side by side and not merged.
- **Local control - headings, intersections, releases** - IND SOP 6. Single-sourced.
- **Departure handoffs** - IND SOP 7 Departures; vNAS Restrictions (IND to ZAU/ZID). Sectors agree: SHB 34, MIE 33, HUF 35. The ZAU sector is vNAS only.
- **Arrival handoffs** - IND SOP 7 Arrivals; vNAS Restrictions (ZID/ZAU/CVG to IND). Gates, altitudes and sector numbers were compared by reading and agree wherever both sources carry a row. The vNAS record has no FWA-to-IND or GUS-to-IND row (listed). This is not a row-by-row reconciliation.
- **Inter-facility coordination** - IND SOP 8; vNAS Restrictions. Carried as written. The vNAS Restrictions table is shown whole as the second source; it has not been reconciled row by row against SOP 8.
- **Scratchpad encoding** - IND SOP 7 Scratchpad Entries; vNAS primaryScratchpadRules. Identical except MAREO#.
- **Handoff IDs** - vNAS ZID record; composition rules from docs.virtualnas.net as quoted in ZMP/R90/claude_ZMP_Handoff_ID_Reference.md. Every ID is composed from the record. ZAU NAS ID G from the ZAU record, 2026-10-17.

## Slots still partial or empty

- **Configurations** (partial) - IND SOP 4, 5, 6, 9; vATIS 2026081300; vNAS configurationPlans. Four configurations by runway. The SOP lists no landing/departing runways by name, no wind rule and no choice rule; runways for 14 and 32 are inferred and flagged.
- **Published SIDs and STARs** (partial) - CIFP 261001. 3 of the 6 SOP-named SIDs coded at KIND; 2 more at satellites; INDY not coded. All six SOP-named STARs coded.
- **Beacon code banks** (partial) - vNAS starsConfiguration.beaconCodeBanks only. IFR subset 1 and VFR subset 2, both 3401-3477. The SOP states no allocation. Single-sourced.
- **Facility lateral outline** (partial) - SimAware TRACON Project Boundaries/IND/IND.json, 27 vertices. Lateral only: no altitude, no sector split, no flow. About two miles at best, and that figure was established at M98, not here. Every field with a CIFP coordinate falls inside it; KCFJ (1.8 NM) and I34 (1.2 NM) sit within the two-mile error. Below the SOP diagrams and below anything the owner supplies.
- **Sector and flow boundaries** (empty) - No source in hand. Every airspace diagram in the SOP is a picture. VATGlasses has no ZID dataset, and the SimAware outline is lateral only: it supplies no sector split, no flow and no altitude.
- **Per-flow sector airspace (DR, FR, FN, ST by runway)** (empty) - IND SOP 9 diagrams dr_*, fr_*, fn_*, st*. Pictures. The saved pages hold them as SVG, which is measurable; see the gap analysis.
- **MVA** (empty) - Not in the SOP. STARS maps 7 and 17 are MVA maps (3 NM and 5 NM); their geometry is video-map data, not published.
- **Tower SOPs - BAK, MIE, AID, HBE** (empty) - Referenced by IND SOP 7 Departures. Separate wiki documents, not pulled.
- **ICT restrictions and handoffs list** (empty) - Referenced by IND SOP 7 Departures and Arrivals. Not in the pull. vNAS Restrictions are the nearest equivalent.
- **Wind and weather rules** (empty) - IND SOP states none. The tool computes wind components from CIFP bearings and states no limit.

