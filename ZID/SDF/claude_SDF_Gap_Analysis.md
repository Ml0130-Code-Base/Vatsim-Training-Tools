# SDF Gap Analysis - what the documents do not answer

Assembled 2026-10-19 from a full read of the saved Louisville (SDF) ATCT SOP page, the vNAS record for ZID, CIFP 261001 and the ZID vATIS profile (serial 2026081300).

**The headline: every airspace boundary in the SOP is a picture, and there is no community geometry for ZID.** VATGlasses has no ZID dataset (checked 2026-10-18; the upstream list carries zab, zak, zau, zeg, zhn, zhu, zjx, zlc, zma, zny, zoa, zob, zse and others, not zid). SimAware publishes a lateral `SDF` footprint with no altitudes and no licence; it is not wired in.

**A lead worth testing, not a result:** the saved SOP pages hold the sector diagrams as **SVG files**, not raster images. SVG is machine-readable, so the artwork can be measured directly - the problem becomes georeferencing it (fitting the drawn fixes to CIFP fix coordinates), not extracting it. Nothing here has been measured. See root `CLAUDE.md` section 7: a community or traced boundary is second-tier and must carry its stated tolerance.

---

## Part 1 - what the owner could supply, ranked by training value

### 1. The sector boundaries, as GeoJSON or the .sct2

Every sector and flow diagram in the SOP is a picture (Part 3). **The smallest useful ask:** the STARS video-map GeoJSON or the `.sct2` the SDF maps were built from, or the Departure, Arrival and Final boundaries for the north, south and west flows as radial/DME points. The saved SOP pages already hold the diagrams as SVG.

### 2. Is the Bowman Local STARS ID U or Z?

SOP 2 says U; the SOP's own rundown table and vNAS say TCP 1Z. **Smallest useful form:** the ID a controller types to hand an aircraft to Bowman.

### 3. What wind changes the flow?

SOP 1 sets a preferred departure runway in a north operation and says runway 11 is used only as 29, but states no wind rule. The deck ranks flows by headwind and picks nothing.

### 4. The LOU and FTK tower SOPs

SOP 7 defers to them for departures from the underlying towers.

### 5. The ICT

SOP 7 says controllers may reference it for the full list of restrictions and handoffs. It is not in the pull; the vNAS Restrictions (36 involving SDF) are the nearest equivalent.

### 6. What the vNAS RPCs for runways 27 and 25 are

vNAS lists runway-pair configurations `17R+27R`, `17L+27L`, `35R+25R`, `35L+25L` at KSDF, and Louisville has no runway 25 or 27. Probably adaptation placeholders.

### 7. Spoken forms for the procedure and fix names

All unspecified (`claude_SDF_TTS_Voicing.md`). EEVAA, LLIZY, GTGON, LOKRD and RDHSE are the likely mispronunciations.

## Part 2 - not stated in any document, and not recoverable by anyone

- **Is the Bowman Local STARS ID U or Z?** - SOP 2 says U; SOP 1 and vNAS say TCP 1Z. A handoff typed to the wrong one reaches nobody.
- **What does the ICT hold that SOP 7 does not?** - SOP 7 says controllers may reference it for the full list of restrictions and handoffs; it is not in the pull.
- **What wind changes the flow?** - SOP 1 sets a preferred runway for departures in north operation but states no wind rule for choosing a flow.
- **What do the LOU and FTK tower SOPs say?** - SOP 7 defers to them for departures from the underlying towers.
- **What are vNAS RPCs 17R+27R and 17L+27L at KSDF?** - The vNAS record lists runway-pair configurations with runways 27R, 27L, 25R and 25L, which Louisville does not have; they may be adaptation placeholders.

## Part 3 - unread because it is a picture

| What | Where |
| --- | --- |
| SDF delegated airspace (combined) | SDF SOP 7 Overview - combined_airspace.svg |
| LC airspace | SDF SOP 6 - lc_airspace.png |
| Departure Radar airspace, north, south and west flows | SDF SOP 9 - 35_dr.svg, 17_dr.svg, dr_29.svg |
| Arrival Radar airspace, north and south flows | SDF SOP 9 - ar_35.svg, ar_17.svg |
| Final Radar airspace, three flows | SDF SOP 9 - fr_35.svg, fr_17.svg, fr_29.svg |
| UPS ramp control area | SDF SOP 4 - ramp_control_area.svg |
| Cargo ramps and terminal gates | SDF SOP 5 - cargo_ramps.png, terminal_gates.png |
| Multiple runway crossings | SDF SOP 5 - multiple_crossings.svg |
| B748 taxi restrictions | SDF SOP 5 - b748_taxi_restrictions.svg |

The saved page carries these as files named above; the SVGs are the measurable ones.

## Part 4 - conflicts and as-written anomalies, preserved rather than corrected

- **Bowman Local STARS ID.** A: SDF SOP 2 Positions: Bowman Local Control STARS ID U, tag LOU LC. B: SDF SOP 1 rundown list and the vNAS record: LOU is TCP 1Z; vNAS has no U TCP at SDF. The SOP disagrees with itself as well as with vNAS. Not resolved: U or Z. A drill must not type either as the handoff ID without saying which source it took.
- **Ground Control West label.** A: SDF SOP 2: the position is labelled "(CGW)" in the table. B: The same row's tag and every other mention: GCW. As written; a typo in the abbreviation. The tag SDF GCW is carried.
- **Channels printed to two decimals.** A: SDF SOP 2: GCW 119.82, AR1 132.32, DR1 132.07, DR2 123.67, FR2 135.77. B: vNAS: 119.825, 132.325, 132.075, 123.675, 135.775. Truncation, not disagreement. The tool shows the full channel.
- **Which frequency a SID prints.** A: SDF SOP 3: all SIDs publish 132.07 (DR1); GTGON, HIDEY, LLIZY and RDHSE must be assigned 123.67 (DR2) by hand when DR is split. B: vNAS TDLS: see the TDLS table on the vNAS record for the default each SID prints. Single source for the instruction; the TDLS table shows what the PDC prints by default.
- **SOP spelling in the DR text.** A: SDF SOP 9: "17R SPILR / 17L RDHSE and 37L LOKRD / 35R HIDEY"; "HIDEY, LIKRD, RDHSE and SPILR". B: Every other section: runway 35L, LOKRD. As-written typos (37L, LIKRD). Not corrected; the tool carries the sentence with the typo marked.
- **SOP 3 transitions against CIFP.** A: SDF SOP 3 lists RNAV SID transitions CNTRY, CHALI, APALO, GUMMI beside BILET, SHIPR, TERGE, DAAVE. B: CIFP 261001 names only BILET, SHIPR, TERGE, DAAVE as exit transitions; CNTRY, CHALI, APALO and GUMMI are fixes on those transitions. Agreement, not conflict: the SOP lists a transition and its first fix side by side.

- **Typos in the SOP, carried as written and marked:** `CGW` for GCW (SOP 2), `Taixway`, `Consolidaiton` (SOP 1), `37L LOKRD` and `LIKRD` (SOP 9), `pushished` (SOP 8), `thought` for `though` (SOP 7 flowed arrivals). None is corrected.
- **The DR1/DR2 text in SOP 9 mentions 35L LOKRD / 35R HIDEY crossing departures as "37L LOKRD / 35R HIDEY"** - read as 35L; marked, not corrected.
- **The heading table spans** (SOP 6) are not visible in the flattened page text; the deck and this file read them from the HTML table. If the wiki page is re-saved as plain text the structure will be lost again.

## Part 5 - what is fully covered and needs nothing

- **Positions, frequencies and STARS IDs** - SDF SOP 2 and the vNAS ZID record, checked against each other. Twelve SDF positions agree on frequency and STARS ID (several channels are printed to two decimals). Bowman Local is the one disagreement. The Godman and Bowman towers are vNAS only except for the one row the SOP carries.
- **Runways, lengths, bearings, ILS category** - CIFP 261001 G and I records, threshold-to-threshold distance checked on all three strips (within 1 ft). Runway 29 has an ILS record with category 0 (localizer only, no glide slope); 11 has none.
- **Clearance delivery - SIDs, altitudes, departure frequencies** - SDF SOP 3; vNAS tdlsConfiguration. Two sources, shown side by side.
- **Local control - headings, initial waypoints, intersections** - SDF SOP 6; CIFP 261001 for the initial waypoints. The six initial waypoints agree with CIFP on every runway. The heading tables were read from the HTML structure because the page text loses their spans.
- **Departure handoffs** - SDF SOP 7 Departures; vNAS Restrictions (SDF to ZID). Sectors and altitudes agree: 18, 19, 21, 17.
- **Arrival handoffs** - SDF SOP 7 Arrivals; vNAS Restrictions (ZID to SDF). Gates, altitudes and sectors agree where both sources carry a row (22, 35, 21, 17), compared by reading rather than row by row.
- **Inter-facility coordination** - SDF SOP 8; vNAS Restrictions. Carried as written; the vNAS Restrictions table is the second source and has not been reconciled row by row.
- **Scratchpad encoding** - SDF SOP 7; vNAS primaryScratchpadRules. Identical.
- **Handoff IDs** - vNAS ZID record; composition rules from docs.virtualnas.net as quoted in ZMP/R90/claude_ZMP_Handoff_ID_Reference.md. Every ID is composed from the record. The LOU ID is an open conflict.
- **Published SIDs and STARs** - CIFP 261001 (261029 identical). Every procedure the SOP names is coded.

## Slots still partial or empty

- **Flows** (partial) - SDF SOP 1, 5, 6, 9; vATIS 2026081300; vNAS configurationPlans. Three flows. No wind rule and no choice rule in the SOP.
- **Beacon code banks** (partial) - vNAS starsConfiguration.beaconCodeBanks only. IFR subset 1 and VFR subset 2, both 1401-1477. The SOP states no allocation. Single-sourced.
- **Sector and facility boundaries** (empty) - No source in hand. Every airspace diagram in the SOP is a picture. VATGlasses has no ZID dataset. SimAware publishes a lateral SDF footprint (no altitudes, no licence); it is not wired in - owner decision.
- **Per-flow sector airspace (DR, AR, FR by flow)** (empty) - SDF SOP 9 diagrams 35_dr, 17_dr, dr_29, ar_*, fr_*. Pictures; the saved pages hold them as SVG.
- **MVA** (empty) - Not in the SOP.
- **Tower SOPs - LOU and FTK** (empty) - Referenced by SDF SOP 7 Departures. Separate wiki documents, not pulled.
- **ICT restrictions and handoffs list** (empty) - Referenced by SDF SOP 7. Not in the pull.
- **Wind and weather rules** (empty) - SDF SOP states none. The tool computes wind components from CIFP bearings and states no limit. POFZ weather minima (800 and 2) are carried as a ground rule.

