# CVG Gap Analysis - what the documents do not answer

Assembled 2026-10-19 from a full read of the saved Cincinnati (CVG) ATCT SOP page, the vNAS record for ZID, CIFP 261001 and the ZID vATIS profile (serial 2026081300).

**The headline: every SECTOR boundary in the SOP is a picture, and the only community geometry for ZID is a lateral outline.** VATGlasses has no ZID dataset (checked 2026-10-18; the upstream list carries zab, zak, zau, zeg, zhn, zhu, zjx, zlc, zma, zny, zoa, zob, zse and others, not zid). **SimAware publishes the lateral `CVG` outline, and it is carried in the deck** (owner decision, 2026-10-19;  vertices, about  sq NM, no altitudes, no licence, about two miles at best and unchecked at ZID). It says whether a point is inside the facility and nothing about which sector owns it or under what ceiling, so every sector, flow and altitude gap below stands. See `../_shared/claude_ZID_Sector_Geometry_Reference.md`.

**A lead worth testing, not a result:** the saved SOP pages hold the sector diagrams as **SVG files**, not raster images. SVG is machine-readable, so the artwork can be measured directly - the problem becomes georeferencing it (fitting the drawn fixes to CIFP fix coordinates), not extracting it. Nothing here has been measured. See root `CLAUDE.md` section 7: a community or traced boundary is second-tier and must carry its stated tolerance.

---

## Part 1 - what the owner could supply, ranked by training value

### 1. Which frequencies are right: Clearance Delivery and DHL Ramp?

SOP 2 gives CD 127.17 and DHL Ramp 120.40; vNAS gives CD 120.400 and DHL Ramp 129.475; the SOP's own ATIS NOTAM text and the vATIS profile give DHL 129.47. **Smallest useful form:** the two channels a controller tunes. A trainee who tunes the wrong one gets silence.

### 2. The sector boundaries, as GeoJSON or the .sct2

Every sector and flow diagram in the SOP is a picture (Part 3), twelve groups of them. **The smallest useful ask:** the STARS video-map GeoJSON or the `.sct2` the CVG maps were built from, or the Departure, Arrival, Final and Satellite boundaries for the north and south flows as radial/DME points. The saved SOP pages already hold the diagrams as SVG.

### 3. Is Ground Control East STARS ID T or X?

SOP 2 says T; vNAS says TCP 1X, shared with the vNAS-only Controller In Charge.

### 4. Do CHCLL and SILKS departures go to ZID 22 or LEX 20?

SOP 7 groups them with KENLN to LEX 20; vNAS sends CHCLL and SILKS to 22 and KENLN to 20.

### 5. What is the CVG# departure?

Assigned to props and to jets without an RNAV SID, with the CVG# added to the route string; CIFP codes nothing by that name.

### 6. Special use airspace

SOP 7 says "To be added at a later date".

### 7. The LUK tower SOP and the ICT

SOP 7 defers to the first for Lunken departures and to the second (written "ICCT" once) for the full list of restrictions and handoffs.

### 8. Spoken forms for the procedure and fix names

All unspecified (`claude_CVG_TTS_Voicing.md`). CEGRM, GAVNN, JAKIE, SARGO, TIGRR, JBNCH, HAGOL, BNGLE and LOVEY are the likely mispronunciations.

## Part 2 - not stated in any document, and not recoverable by anyone

- **Is the Clearance Delivery frequency 127.17 or 120.400?** - The SOP and vNAS disagree. A trainee who tunes the wrong one gets silence.
- **Is the DHL Ramp frequency 120.40 or 129.475?** - The SOP position table disagrees with its own ATIS NOTAM text, with vNAS and with the vATIS profile.
- **Is Ground Control East STARS ID T or X?** - The SOP and vNAS disagree; vNAS shares 1X with the Controller In Charge.
- **Do CHCLL and SILKS go to ZID 22 or LEX 20?** - SOP 7 groups them with KENLN to sector 20; vNAS sends them to 22.
- **What exactly is the CVG# departure?** - The SOP assigns it to props and to jets without an RNAV SID and adds it to the route string; CIFP codes no such procedure.
- **What special use airspace does CVG TRACON work?** - SOP 7 says "To be added at a later date".
- **What does the ICT hold that SOP 7 does not?** - SOP 7 says controllers may reference it for the full list of restrictions and handoffs; it is not in the pull.
- **What does the LUK tower SOP say?** - SOP 7 defers to it for Lunken departures.
- **What are the tower, ground and ramp hours of operation?** - None of the three SOPs states operating hours. The decks assume clearance, ramp, ground and tower are open on the owner’s direction (2026-10-20: 24-hour facility), and offer only the TRACON seats.

## Part 3 - unread because it is a picture

| What | Where |
| --- | --- |
| CVG delegated airspace (consolidated) | CVG SOP 7 Overview - consolidated_airspace.svg |
| LC airspace, four operations | CVG SOP 6 - local_north.svg, local_south.svg, local_east.svg, local_west.svg |
| Departure Radar airspace, four flows, with and without LST combined | CVG SOP 9 - dr_*.svg and dr_*_lst_combined.svg |
| Arrival Radar airspace, three flows | CVG SOP 9 - ar_north.svg, ar_south.svg, ar_east.svg |
| Final Radar airspace, four flows, and the capture points | CVG SOP 9 - fr_*.svg, capture_points_north.svg, capture_points_south.svg |
| Satellite Radar airspace, four flows | CVG SOP 9 - lst_*.svg |
| Three-way event splits, north and south | CVG SOP 9 - 3_way_event_north.svg, 3_way_event_south.svg |
| Ground control delegation (the yellow area) | CVG SOP 5 - cvg_ground_delegation.svg |
| Terminal and cargo ramp diagrams, north and south | CVG SOP 4 - cvg_cargo_ramp_*_op.svg, cvgrmptn.svg, cvgrmpts.svg |
| Runway 9 controlled activity area | CVG SOP 5 - runway_9_cav.png |
| LUAW intersections | CVG SOP 6 - luaw_intersections.png |
| B748 taxi routes | CVG SOP 5 - b748_taxi_routes.svg |

The saved page carries these as files named above; the SVGs are the measurable ones.

## Part 4 - conflicts and as-written anomalies, preserved rather than corrected

- **Clearance Delivery frequency.** A: CVG SOP 2 Positions: 127.17. B: vNAS CVG_DEL: 120.400. Disagreement. Not resolved. The vNAS value is the one that equals the SOP's DHL Ramp frequency (next entry).
- **DHL Ramp frequency.** A: CVG SOP 2 Positions: 120.40. B: vNAS CVG_D_RMP: 129.475; the SOP's own ATIS NOTAM text ("AC AT DHL RAMP CTC 129.47") and the vATIS profile NOTAMs also say 129.47. Three sources against one table cell. The SOP table value equals the vNAS Clearance Delivery frequency, which suggests the two cells were crossed in one of the sources. A reading, not a correction; neither is changed.
- **Ground Control East STARS ID.** A: CVG SOP 2 Positions: T. B: vNAS CVG_E_GND: TCP 1X, which is also the TCP of the vNAS-only Controller In Charge position. Disagreement. Not resolved.
- **How far ZID may clear a SARGO arrival.** A: CVG SOP 7 Arrivals, SARGO row: "ZID may not clear further than TIGRR". B: vNAS Restriction (ZID to CVG, SARGO Gate): ZID may clear direct SARGO. The SOP note appears to repeat the TIGRR row. Both carried.
- **Where CHCLL and SILKS departures go.** A: CVG SOP 7 Departures: South (CHCLL, SILKS, KENLN) to ZID LEX 20. B: vNAS Restrictions (CVG to ZID): KENLN to sector 20; CHCLL and SILKS to sector 22. The two sources split the SOP's South gate. Handoff IDs differ: C20 against C22. Not resolved.
- **Departure runways advertised.** A: CVG SOP 1: North departs 36C and 36R; South departs 18L and 18C. B: vATIS departure presets: NORTH advertises DEPG RWY 36R, SOUTH advertises DEPG RWY 18L. The broadcast names fewer runways than the configuration table. The preset is the tower's broadcast, not the TRACON's assignment.
- **TIGRR spelling in the adaptation.** A: CIFP 261001 and the SOP: TIGRR. B: vNAS starsConfiguration.rnavPatterns: "TIGGR#". A typo in the adaptation, or a pattern that never matches. Not corrected.
- **Channels printed to two decimals.** A: CVG SOP 2: LCW 133.32, LCE 118.97, NAR 123.87, VAR 127.72, N Ramp 130.37. B: vNAS: 133.325, 118.975, 123.875, 127.725, 130.375. Truncation, not disagreement. The tool shows the full channel.
- **Simultaneous-operations sentence.** A: CVG SOP 1: "Landing Runway 9 while landing Runway 9 while departing Runway 18L/36R". B: The prohibited list below it: landing runway 9 while departing 18L. As-written duplication. Carried with a marker.

- **Typos in the SOP, carried as written and marked:** `dircect` (SOP 7 departures, throughout), `recieves`, `accordnace`, `recponsible`, `Consolidaiton`, `Querry cargo airraft`, `configuraiton`, `Landing Runway 9 while landing Runway 9` (SOP 1), `ICCT` (SOP 7). None is corrected.
- **"ZID may not clear further than TIGRR" on the SARGO row** (SOP 7): read as a repeat of the TIGRR row; vNAS says ZID may clear direct SARGO. Both carried.
- **The vNAS `rnavPatterns` entry `TIGGR#`** does not match the procedure TIGRR.

## Part 5 - what is fully covered and needs nothing

- **Runways, lengths, bearings, ILS category** - CIFP 261001 G and I records, threshold-to-threshold distance checked on all four strips (within 1 ft). Eight runway ends.
- **Configurations** - CVG SOP 1 (table, 2026-09-03); vATIS 2026081300; vNAS configurationPlans. Eight named configurations with landing and departing runways. The wind rule is only "when wind precludes departing 27" and "extreme wind".
- **Clearance delivery - SIDs, altitudes, departure frequencies** - CVG SOP 3; vNAS tdlsConfiguration. Two sources, shown side by side. The conventional CVG# departure is not in CIFP.
- **Local control - headings, intersections, simultaneous approaches** - CVG SOP 6; CIFP 261001 for the first fix on each runway. The first fix on every runway agrees with CIFP.
- **Arrival handoffs** - CVG SOP 7 Arrivals; vNAS Restrictions (ZID to CVG). Gates, altitudes and sectors agree where both sources carry a row (22, 34, 26, 26, 18), compared by reading rather than row by row. The SARGO note differs.
- **Inter-facility coordination** - CVG SOP 8; vNAS Restrictions. Carried as written; the vNAS table is the second source and has not been reconciled row by row.
- **Scratchpad encoding** - CVG SOP 7; vNAS primaryScratchpadRules. Identical.
- **Handoff IDs** - vNAS ZID record; composition rules from docs.virtualnas.net as quoted in ZMP/R90/claude_ZMP_Handoff_ID_Reference.md. Every ID is composed from the record.
- **Ramp control - four positions, spots, flows** - CVG SOP 4 and 5; vATIS NOTAMs; vNAS. Spot diagrams are pictures; the spot numbers and limits are text and carried. DHL and Clearance frequencies are in conflict.

## Slots still partial or empty

- **Positions, frequencies and STARS IDs** (partial) - CVG SOP 2 and the vNAS ZID record, checked against each other. Three values disagree: Clearance Delivery frequency, DHL Ramp frequency, and Ground Control East STARS ID. Every other position agrees. Lunken Local is vNAS plus the SOP row; the LUK SOP was not pulled.
- **Departure handoffs** (partial) - CVG SOP 7 Departures; vNAS Restrictions (CVG to ZID). The South gate disagrees (see the list). Other sectors agree.
- **Published SIDs and STARs** (partial) - CIFP 261001 (261029 identical). All nine RNAV SIDs and five STARs coded. The conventional CVG# departure is not coded at KCVG or anywhere.
- **Beacon code banks** (partial) - vNAS starsConfiguration.beaconCodeBanks only. IFR subset 1 and VFR subset 2, both 3701-3777. The SOP states no allocation. Single-sourced.
- **Facility lateral outline** (partial) - SimAware TRACON Project Boundaries/CVG/CVG.json, 25 vertices. Lateral only: no altitude, no sector split, no flow. About two miles at best, and that figure was established at M98, not here. Every field with a CIFP coordinate falls inside it; no field sits within the two-mile error (nearest is KOXD at 4.8 NM). Below the SOP diagrams and below anything the owner supplies.
- **Sector and flow boundaries** (empty) - No source in hand. Every airspace diagram in the SOP is a picture. VATGlasses has no ZID dataset, and the SimAware outline is lateral only: it supplies no sector split, no flow and no altitude.
- **Per-flow sector airspace (DR, AR, FR, LST by flow; 3-way splits)** (empty) - CVG SOP 9 diagrams dr_*, ar_*, fr_*, lst_*, 3_way_event_*. Pictures; the saved pages hold them as SVG.
- **MVA** (empty) - Not in the SOP.
- **Special use airspace** (empty) - CVG SOP 7: "To be added at a later date". The SOP says so in terms.
- **Tower SOP - LUK** (empty) - Referenced by CVG SOP 7 Departures. Separate wiki document, not pulled.
- **ICCT/ICT restrictions and handoffs list** (empty) - Referenced by CVG SOP 7 Arrivals and Overflights ("ICCT" once). Not in the pull.
- **Wind and weather rules** (empty) - CVG SOP states only "when wind precludes departing 27" and "extreme wind". The tool computes wind components from CIFP bearings and states no limit. LUAW minima (800 and 2) are carried as a local rule.

