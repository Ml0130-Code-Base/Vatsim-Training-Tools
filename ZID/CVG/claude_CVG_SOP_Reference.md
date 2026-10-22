# CVG SOP Reference - Cincinnati (CVG) ATCT SOP

Transcribed **2026-10-18** from the saved page of **Cincinnati (CVG) ATCT SOP** on the Indy Center wiki (`https://wiki.flyindycenter.com/docs/cvg`). Last changelog entry in the page: **2026-09-03**. **The wiki is behind a VATSIM login** - see `claude_Source_Documents_Index.md`. The SOP text itself is not committed; this file is the transcription and the cross-check.

**Citation convention.** The SOP is a wiki page with numbered chapters, not a paragraph-numbered order. A value is cited as `CVG SOP <chapter> > <heading>` - for example `CVG SOP 7 Approach Control > Arrivals`. Every table below names its own source line.

**Where a second source exists it is shown beside the SOP, never merged into it.** Second sources: the vNAS facility record for ZID (lastUpdatedAt 2026-10-17T02:35:43.475Z), CIFP 261001, and the vATIS profile (serial 2026081300). Disagreements are in the last section and are not resolved.

Pictures in the SOP (every airspace diagram) are not transcribed; they are listed in `claude_CVG_Gap_Analysis.md` Part 3.

---

## 1. Positions - two sources, checked

SOP: CVG SOP 2 Positions. vNAS: the ZID record, position callsign, frequency and TCP. **The SOP prints most channels to two decimals; vNAS carries the full 25 kHz value** (`128.175` is written `128.17`). Voice the full channel.

| Key | Position | SOP frequency | vNAS frequency | SOP STARS ID | vNAS TCP | vNAS callsign | SOP tag | Folds into | Frequency | STARS ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CD | Clearance Delivery | 127.17 | 120.400 | T | 1T | CVG_DEL | CVG CD | - | CONFLICT | agree |
| TRC | CVG Terminal Ramp | 130.90 | 130.900 | - | - | CVG_1_RMP | CVG TRC | - | agree |  |
| NRC | CVG Taxilane N Ramp | 130.37 | 130.375 | - | - | CVG_N_RMP | CVG NRC | - | SOP prints two decimals |  |
| DRC | DHL Ramp | 120.40 | 129.475 | - | - | CVG_D_RMP | CVG DRC | - | CONFLICT |  |
| ARC | Amazon Ramp | 130.50 | 130.500 | - | - | CVG_A_RMP | CVG ARC | - | agree |  |
| GCW | Ground Control West | 121.70 | 121.700 | T | 1T | CVG_W_GND | CVG GCW | - | agree | agree |
| GCE | Ground Control East | 121.30 | 121.300 | T | 1X | CVG_E_GND | CVG GCE | - | agree | CONFLICT |
| LCC | Local Control Center | 118.30 | 118.300 | U | 1U | CVG_C_TWR | CVG LCC | - | agree | agree |
| LCW | Local Control West | 133.32 | 133.325 | A | 1A | CVG_W_TWR | CVG LCW | LCC | SOP prints two decimals | agree |
| LCE | Local Control East | 118.97 | 118.975 | D | 1D | CVG_E_TWR | CVG LCE | LCC | SOP prints two decimals | agree |
| NAR | Arrival North | 123.87 | 123.875 | N | 1N | CVG_N_APP | CVG NAR | WDR | SOP prints two decimals | agree |
| SAR | Arrival South | 119.70 | 119.700 | S | 1S | CVG_S_APP | CVG SAR | WDR | agree | agree |
| FAR | Final Radar F | 124.70 | 124.700 | F | 1F | CVG_F_APP | CVG FAR | WDR | agree | agree |
| VAR | Final Radar V | 127.72 | 127.725 | V | 1V | CVG_V_APP | CVG VAR | WDR | SOP prints two decimals | agree |
| BDR | Bearcat Departure | 128.70 | 128.700 | B | 1B | CVG_B_APP | CVG BDR | WDR | agree | agree |
| WDR | Wildcat Departure | 126.65 | 126.650 | W | 1W | CVG_W_APP | CVG WDR | - | agree | agree |
| LST | Satellite Radar | 121.00 | 121.000 | L | 1L | CVG_L_APP | CVG LST | WDR | agree | agree |
| LUK_TWR | Lunken Local Control | 118.70 | 118.700 | K | 1K | LUK_TWR | LUK LC | - | agree | agree |
| CIC | Controller In Charge (vNAS only) | - | 122.450 | - | 1X | CVG_C_APP |  | - | vNAS only | vNAS only |
| LUK_GND | Lunken Ground Control | - | 121.900 | - | - | LUK_GND |  | - | vNAS only |  |

"Folds into" is the vNAS consolidation hierarchy (a TCP's parent). Position keys that are vNAS callsigns are child towers or vNAS-only positions.

## 2. Fields, runways and configurations

Fields: vNAS area underlyingAirports; CVG SOP 7. Runways from CIFP 261001; magnetic variation at the primary field is west 6.0 degrees.

| Field | Name | Role | Runways | Source |
| --- | --- | --- | --- | --- |
| KCVG | Cincinnati/Northern Kentucky Intl | primary | 9 18C 18L 18R 27 36C 36L 36R | vNAS area underlyingAirports; CVG SOP 7 |
| KLUK | Cincinnati Muni/Lunken Field | towered satellite | 3 7 21 25 | CVG SOP 7 Satellite list; vNAS child tower LUK |
| KHAO | Butler Co Rgnl/Hogan Field (Hamilton) | satellite | 12 30 | CVG SOP 7 Satellite list |
| KOXD | Miami University (Oxford) | satellite | 5 23 | CVG SOP 7 Satellite list |
| KHLB | Batesville | satellite | 18 36 | CVG SOP 7 Satellite list |
| I67 | Cincinnati West (Harrison) | satellite | 1 19 | CVG SOP 7 Satellite list |
| I69 | Clermont Co (Batavia) | satellite | 4 22 | CVG SOP 7 Satellite list |
| K62 | Gene Snyder (Falmouth) | satellite | 3 21 | CVG SOP 7 Satellite list |

### Runways at the primary field (CIFP 261001)

| Field | Runway | Length x width (ft) | Magnetic bearing | ILS | Displaced threshold |
| --- | --- | --- | --- | --- | --- |
| KCVG | 9 | 12001 x 150 | 96 | IURN 111.90 CAT I | - |
| KCVG | 18C | 11000 x 150 | 186 | ISIC 111.55 CAT II | - |
| KCVG | 18L | 10000 x 150 | 186 | ICIZ 110.15 CAT I | - |
| KCVG | 18R | 8000 x 150 | 186 | ICJN 110.75 CAT II | - |
| KCVG | 27 | 12001 x 150 | 276 | IJDP 108.70 CAT II | - |
| KCVG | 36C | 11000 x 150 | 6 | ICVG 109.90 CAT III | - |
| KCVG | 36L | 8000 x 150 | 6 | IVAC 110.75 CAT II | - |
| KCVG | 36R | 10000 x 150 | 6 | IEEI 110.35 CAT III | - |

Threshold-to-threshold distance computed from the two threshold coordinates on the WGS84 ellipsoid agrees with the CIFP length less displaced thresholds to within 1 ft on every strip.

### Configurations

CVG SOP 1 names eight configurations (table added 2026-09-03); the vATIS profile has six departure and four arrival presets; vNAS has eight consolidation plans.

| Name | Landing | Departing | Notes | Source |
| --- | --- | --- | --- | --- |
| Northwest | 36L 36C 36R | 27 36R | Preferred configuration. 36L is parenthesised in the SOP's arrival column; the SOP does not define the parentheses. | CVG SOP 1 General (configuration table, 2026-09-03); vATIS departure preset NORTH+27, arrival preset NORTH |
| Southwest | 18L 18C 18R | 18L 27 | 18R is parenthesised in the SOP's arrival column. | CVG SOP 1 General; vATIS departure preset SOUTH+27, arrival preset SOUTH |
| North | 36L 36C 36R | 36C 36R | Preferred over South. Used when wind precludes departing 27. The vATIS NORTH departure preset names 36R only. | CVG SOP 1 General; vATIS departure preset NORTH, arrival preset NORTH |
| South | 18L 18C 18R | 18L 18C | Used when wind precludes departing 27. The vATIS SOUTH departure preset names 18L only. | CVG SOP 1 General; vATIS departure preset SOUTH, arrival preset SOUTH |
| East | 9 | 9 | Only during extreme wind; severely constricts CVG and limits which positions can be opened. Landing 9 while departing 36R or 18L is not permitted. | CVG SOP 1 General; vATIS preset EAST |
| West | 27 | 27 | Only during extreme wind. When landing 27, ZID must route arrivals via GAVNN. | CVG SOP 1 General; vATIS preset WEST |
| 36R Only | 36R | 36R | Low traffic. No vATIS preset. | CVG SOP 1 General |
| 18L Only | 18L | 18L | Low traffic. No vATIS preset. | CVG SOP 1 General |

The SOP gives no wind rule beyond "when wind precludes departing 27" and "extreme wind". The tool ranks the configurations by arithmetic only and picks nothing. vNAS consolidation plans: CO1 SOUTH OP 18C/18L; CO2 SOUTH OP 18R/18L; CO3 NORTH OP 36C/36R; CO4 NORTH OP 36L/36R; CO5 WEST OP, ALL OPEN; CO6 EAST OP, ALL OPEN; CO7 WEST OP, ALL @ WEST; CO8 EAST OP, ALL @ WEST.

## 3. General and configurations

CVG SOP 1.

### Configurations

*Source: CVG SOP 1 General (added 2026-09-03)*

| Name | Departing | Arriving | Notes |
| --- | --- | --- | --- |
| Northwest | 27, 36R | (36L), 36C, 36R | Preferred configuration |
| Southwest | 18L, 27 | 18L, 18C, (18R) |  |
| North | 36C, 36R | (36L), 36C, 36R | Preferred over South. Used when wind precludes departing 27. |
| South | 18L, 18C | 18L, 18C, (18R) | Used when wind precludes departing 27. |
| East | 9 | 9 | Only during periods of extreme wind where North/South operation would not be feasible. Severely constricts CVG's ability to move aircraft and limits which positions can be opened. |
| West | 27 | 27 | Only during periods of extreme wind where North/South operation would not be feasible. Severely constricts CVG's ability to move aircraft and limits which positions can be opened. |
| 36R Only | 36R | 36R | Used during periods of low traffic |
| 18L Only | 18L | 18L | Used during periods of low traffic |

The parentheses on 36L and 18R are the SOP's own notation and the SOP does not define them.

### Equipment

*Source: CVG SOP 1 General > Equipment*

- Tower Cab Display
- ASDE-X
- Arrival and Departure Flight Strip Printer
- TDLS (including Operation Configurations)

### STARS configuration

*Source: CVG SOP 1 General > STARS Configuration*

- Has STARS: yes. Uses CWT: yes. Has ATPA: yes.
- Rundown list: LUK (TCP 1K) sends to CVG (TCP 1L), list ID PK, auto acknowledge no.
- Alert TCPs: 1A, 1B, 1D, 1F, 1L, 1N, 1S, 1T, 1U, 1V, 1W. TCP 1K: none.
- Auto consolidates to the combined position: yes. TCPs must be added manually when split.
- vATIS profile: CVG ATCT (a departure and an arrival ATIS).

### Runway rules

*Source: CVG SOP 1 General > General*

- Runway 36L/18R is closed to air carrier aircraft with wingspan more than 140' (Group IV / B752 and larger).
- Landing runway 9 while departing runway 18L/36R, and landing runway 9/27 while landing runway 18R, is permitted as long as at least one arrival is cleared for and accepts a visual approach before lateral separation is lost. [The first clause as written: "Landing Runway 9 while landing Runway 9 while departing Runway 18L/36R".]
- Because converging non-intersecting runways can have intersecting go-around paths, simultaneous operations are not permitted in these configurations: landing runway 9 while departing runway 36R; landing runway 18R while departing runway 9 or runway 27; landing runway 9 while departing runway 18L.
- Other configurations may be used situationally. Use the TDLS Operation Configuration that matches the departure runway in use.

## 4. Clearance delivery

CVG SOP 3.

### IFR departures

*Source: CVG SOP 3 Clearance Delivery > IFR Departures*

| Aircraft | Via | Altitude | Expect | Notes |
| --- | --- | --- | --- | --- |
| Jet | RNAV SID | 5000' | n/a |  |
| Jet | CVG# | 5000' | n/a | CVG# must be added to the route string |
| Prop | CVG# | 4000' | n/a | CVG# must be added to the route string |

It is preferred that jet aircraft be assigned an RNAV SID, if capable.

### Departure gates, RNAV SIDs and non-RNAV routes

*Source: CVG SOP 3 Clearance Delivery > IFR Departures*

| Direction | RNAV SID | RNAV SID transitions | Non-RNAV / non-SID |
| --- | --- | --- | --- |
| North | JBNCH# | SNKPT<br>BARKS | CVG# CVG MIE |
| Northeast | HAGOL# | PLASH<br>RINTE | CVG# CVG DQN |
| Northeast | BNGLE# | RIKLE<br>WWSHR | CVG# CVG RIKLE |
| Northeast | ROCKT# | ARRAY<br>AHTIY | CVG# CVG APE |
| East | GIPLE# | JODUB<br>HVQ<br>SITTR | CVG# CVG HVQ |
| Southeast | KENLN# | SHIPR | CVG# CVG HYK |
| South | SILKS# | TRFWA | CVG# CVG HYK |
| Southwest | CHCLL# | BUSYY<br>SKAMR<br>RAMRD | CVG# CVG IIU |
| West | LOVEY# | HELIS<br>CADIZ | CVG# CVG LOVEY |

### Departure frequency

*Source: CVG SOP 3 Clearance Delivery > IFR Departures*

| SID or departure gate | General direction | Frequency |
| --- | --- | --- |
| JBNCH/MIE<br>SILKS/HYK<br>CHCLL/IIU<br>LOVEY | West | 128.70 (BDR) |
| HAGOL/DQN<br>BNGLE/RIKLE<br>ROCKT/APE<br>GIPLE/HVQ<br>KENLN/HYK | East | 126.65 (WDR) |

### VFR departures

*Source: CVG SOP 3 Clearance Delivery > VFR Departures*

| Aircraft type | Altitude | Departure frequency | Beacon code? |
| --- | --- | --- | --- |
| Jet | At or below 5000' | 126.65 (East)<br>128.70 (West) | Yes |
| Prop | At or below 4000' | 126.65 (East)<br>128.70 (West) | Yes |

Special VFR is not authorized for fixed-wing aircraft at CVG.

### Route and altitude restrictions

*Source: CVG SOP 3 Clearance Delivery > IFR Departures*

- Departures to CMH+, LEX+, IND+ and SDF+ at or below 13000 (TEC).
- Aircraft requesting AOA 14000' must be cleared via a route below or coordinated with an overlying controller (if online).

### VFR departure flight plans

*Source: CVG SOP 3 Clearance Delivery > VFR Departures*

- Enter every VFR request into the flight plan editor with at least: aircraft type (ex. C172); requested altitude in hundreds of feet prefixed VFR/ (ex. VFR/045); departure airport (KCVG) and destination if specified (ex. KLEX); direction of flight in the remarks if the destination is not specified (ex. East); and FF in the remarks if flight following is requested.
- Phraseology: "N6974V, cleared out of the Cincinnati Class Bravo airspace, maintain VFR at or below 4000', departure frequency 126.65, squawk 1234."

### TDLS procedures

*Source: CVG SOP 3 Clearance Delivery > TDLS Procedures*

- PDC/CPDLC equipped aircraft should be issued their clearance via TDLS/PDC. This generally includes all airliners (other than legacy carriers such as PanAm) but not most general aviation or charter operators.
- TDLS is configured to give the pilot the most up-to-date information for their SID. For an event the local information and the departure frequency (normally updated through the temporary frequency function) may need to be selected manually. The departure runway assignment should be inserted automatically when the correct operation configuration is used.
- The CVG# auto-populates 5000' as the initial altitude in TDLS. CD must manually select 4000' for all prop departures if sending a PDC.

### Coordination with Ground

*Source: CVG SOP 3 Clearance Delivery > Coordination with Ground*

- When ramp control is open (typically during events): select the correct RAMP CONTROL OPEN flag/NOTAM in the ATIS with the correct frequencies and instruct all aircraft to contact ramp control for pushback.
- When ramp control is closed (normal operations): select the RAMP CONTROL CLOSED flag/NOTAM in the ATIS and instruct all aircraft to contact ground control when ready for taxi.
- Once an aircraft has read back its clearance, mark the strip in accordance with the ATC Handbook and push the flight strip to ground control.

## 5. Ground and ramp control

CVG SOP 4 and 5.

### Terminal ramp spots - direction limits

*Source: CVG SOP 4 Ramp Control*

| Operation | Inbound only | Outbound only |
| --- | --- | --- |
| South / Southwest | Spots 4 and 14 | Spots 3 and 15 |
| North / Northwest | Spots 3 and 15 | Spots 4 and 14 |

Spots are multi-directional (either entry or exit) except for these.

### ASSC configurations

*Source: CVG SOP 5 Ground Control > ASSC*

| Configuration | Flow | Arrival runways | Other runways |
| --- | --- | --- | --- |
| 18/27 | South/West | 18L/R/C | 27 |
| 9/36 | East/North | 9 | 36L/C/R |
| 27/36 | West/North | 27 | 36L/R/C |
| 36/27 | North/West | 36L/R/C | 27 |
| LIMITED | n/a | n/a | n/a |
| 9/18 | East/South | 9 | 18L/R/C |
| 27/18 | West/South | 27 | 18L/R/C |

### Departure runway by SID or gate (high volume)

*Source: CVG SOP 5 Ground Control > Runway Assignment*

| SID or departure gate | General direction | Northwest | North | Southwest | South |
| --- | --- | --- | --- | --- | --- |
| JBNCH/MIE<br>SILKS/HYK<br>CHCLL/IIU<br>LOVEY | West | 27 | 36C | 27 | 18C |
| HAGOL/DQN<br>BNGLE/RIKLE<br>ROCKT/APE<br>GIPLE/HVQ<br>KENLN/HYK | East | 36R | 36R | 18L | 18L |

During slower periods (ex. weeknight controlling) assign a runway based on SID or parking position. The East row spans Northwest and North (36R) and Southwest and South (18L) in the page's table; it is expanded here.

### Ramp Control

*Source: CVG SOP 4 Ramp Control*

- Ramp Control directs traffic into and out of the terminal and cargo ramps during busy periods. It is a company- or airport-run position that is sometimes open for large events. It does not receive flight strips or have access to ASDE-X or STARS; it has only what aircraft tell it and a Tower Cab display. RC does not assign runways; aircraft must ask GC if unsure (aircraft are assigned a departure runway with a PDC, so RC may ask what runway an aircraft was assigned).
- Areas: CVG Terminal RC is responsible for the terminal ramp. CVG Taxilane N RC is responsible for taxilane N between D and S. AMZ RC is responsible for the Amazon cargo ramp. DHL RC is responsible for both the north and south DHL cargo ramps.
- When ramp control is combined, select the RAMP OPEN COMBINED NOTAM in the ATIS; when split, select RAMP OPEN ALL.
- Departures: give pushback clearances ("UAL1723, pushback approved." / "JIA5150, standby, inbound traffic."). When aircraft request taxi, instruct them to the appropriate spot and to contact ramp or ground, taxiing to a spot closer to the departure runway where possible (ex. a GIPLE departure via runway 18L is taxied to Spot 3): "DAL144, taxi Ramp 3 Taxilane to spot 5, contact Ground 121.7."
- Terminal departures: aircraft contact CVGT RC for pushback and must state their SID or departure fix (assigned by ACARS PDC, voice or company documentation); if they do not, query them. This determines pushback and taxi direction.
- Aircraft at the Amazon or DHL ramps contact AMZ RC or DHL RC for pushback, except DHL stands 16-24, which contact GC directly and power out onto taxiway S.
- Arrivals: when Ramp is open, GC directs aircraft to an entry spot and instructs them to contact RC, who gives taxi instructions to the stand or gate and assigns a stand to aircraft that do not have one: "ABX730, Ramp, enter at Spot 55, taxi via DHL6 to stand 58." / "JIA5150, Ramp, enter at Spot 4, taxi south line to B20."
- CVG GC should always instruct aircraft to hold short of the assigned entry spot. If an aircraft parking at the Amazon or DHL ramps does not know its stand, GC enters it at an appropriate spot (51, 52, 55, 75 or 76) and RC assigns the stand.

### Cargo ramp flow

*Source: CVG SOP 4 Ramp Control*

- Amazon ramp - North/Northwest operation: east departures (36R) taxi via Spot 74, contact CVGN RC, and exit Spot 54; west departures (36C or 27) may exit at Spot 76 or taxi via Spot 76, contact CVGN RC, and exit Spot 54. Arrivals may enter Spot 75 and contact CVGN RC; arrivals on the east side (ex. 36R) may enter at Spots 52 or 55 and contact DHL RC without coordination, or at Spot 54 and contact CVGN RC (requires verbal coordination).
- Amazon ramp - South/Southwest operation: all departures taxi to spots 71, 72 or 73 and contact CVGN RC, who taxis them to Spot 54 (east departures) or 75 (west departures). Arrivals may enter Spot 76 and contact CVGN RC; east-side arrivals as above.
- DHL ramp (consistent flow): departures from the south DHL ramp are taxied to Spots 56, 57 or 58 and contact CVGN RC, then exit Spot 54 (west departures may exit Spot 75 in a south operation); departures from the north DHL ramp are taxied to Spot 59, contact CVGN RC, then exit Spot 54 (same exception). Aircraft from the south DHL ramp (stands 1, 2, 6-11) may exit at Spot 52 without coordination if no arrivals are inbound. Aircraft on the DHL3 or DHL4 lines (stands 35-46) may enter at Spot 54 but GC must coordinate with CVGN RC.
- DHL arrivals: stands 12-15 (S) enter Spot 51; stands on the DHL1, DHL2 or DHL5 taxilines (1, 2, 6-11, 16-34) enter Spot 52; stands on DHL3 or DHL4 (35-46) may enter Spot 52 or 55 (both require coordination with CVGN RC to use or cross taxiline N); stands on DHL6 (56-65) enter Spot 55.

Ramp diagrams (cvg_cargo_ramp_north_op.svg and the south, terminal north and south files) are pictures.

### Ground Control

*Source: CVG SOP 5 Ground Control*

- Ground Control is responsible for all movement areas on the airport drawn in yellow in the delegation diagram (cvg_ground_delegation.svg). When in use, all crossings of runway 9/27 must be verbally coordinated between LCC and GC. All crossings of runway 18C/36C should occur with the aircraft on LCC's frequency.
- GCW is normally delegated all movement areas other than runways and the LCC taxi area. GCE is not delegated any movement areas (in real life it handles vehicle movement and snow removal equipment and must coordinate all movements with GCW or the respective LC). For VATSIM a custom GCW/GCE split may be determined.
- When ramp control is not open, inform aircraft that pushback is at their discretion and to request taxi at an appropriate spot number; ensure the RAMP CLOSED flag is selected in both ATIS (enabled by default in vATIS). Aircraft move freely around the non-movement areas while ramp control is closed.
- When ramp control is open (large events), aircraft at the terminal ramp or cargo facilities contact ramp control for pushback; select RAMP OPEN COMBINED or RAMP OPEN ALL in both ATIS.
- Runways 9 and 27 have a Controlled Activity Area that must be protected for aircraft departing runway 9 or landing runway 27. Taxiways S, T, M and J have hold markings that keep aircraft clear of it; when CVG lands runway 27 or departs runway 9, treat these areas as an active runway and coordinate traffic moving through with LCC.
- B748 aircraft have reduced wingspan clearances. For VATSIM purposes, allow B748 aircraft to taxi on restricted routes as long as no other B748 is on the adjacent taxiway(s) or runway(s). Permitted, restricted and prohibited routes are in a diagram (b748_taxi_routes.svg).
- When a departure approaches the runway, instruct it to monitor the appropriate local control and push its flight strip; a piston aircraft needing a runup advises runup complete first. GC is responsible for protecting runway exits and must instruct aircraft under its control to give way to aircraft exiting the runway.
- LCC is authorized to taxi aircraft that exit or cross runway 18C/36C on J, D6 or D7 to spots 12, 13, 14 or 15 without transferring communications to GC; when open, these aircraft are then told to contact ramp control.
- When ramp control is open, departures exit the cargo ramps at Spots 76 or 75 (configuration dependent), 51 and 54. For arrivals, instruct aircraft to hold short of Amazon Spots 75 or 76 (configuration dependent), DHL Spots 51, 52 or 55, terminal Spots 3 and 15 (north), 4 and 14 (south) or 1-18 (other), and contact the appropriate RC; query cargo aircraft for a stand assignment and assign the entry for that stand, or an appropriate entry if they have none.

## 6. Local control

CVG SOP 6. Headings, simultaneous approaches, LUAW, intersections.

### Departure heading assignments

*Source: CVG SOP 6 Local Control > Coordination with TRACON*

| Runway | RNAV to fix | Heading |
| --- | --- | --- |
| 9 | KINNG | RH |
| 27 | BONLE | RH |
| 18L | LASNG | 165 |
| 18C | FLOEE | RH |
| 18R | FANSA | 200 |
| 36L | CIGMA<br>HOBAL<br>RORFE | 330 |
| 36C | CIGMA<br>HOBAL<br>RORFE | 330 |
| 36R | HAGSS | RH |

Unless coordinated otherwise these headings may be used for IFR or VFR departures, and all departures may be released without coordination from an ATIS-advertised runway.

### Intersection departures - distance available (ft)

*Source: CVG SOP 6 Local Control > Intersection Departures*

| Runway | Intersection | Distance available |
| --- | --- | --- |
| 9 | K9 | 11,500 |
| 9 | K8 | 9,950 |
| 9 | K7 | 9,450 |
| 9 | K6 | 7,750 |
| 9 | K5 | 6,000 |
| 9 | C | 5,100 |
| 9 | D | 4,100 |
| 9 | E | 3,850 |
| 9 | M/K3 | 1,800 |
| 27 | K2 | 11,450 |
| 27 | K/M3 | 10,200 |
| 27 | E | 8,100 |
| 27 | D | 7,900 |
| 27 | C | 6,900 |
| 27 | K5 | 5,950 |
| 27 | K6 | 4,250 |
| 27 | K7 | 2,500 |
| 27 | K8 | 2,050 |
| 18L | T8 | 9,450 |
| 18L | T7 | 7,950 |
| 18L | T6 | 5,800 |
| 18L | T5 | 4,150 |
| 18L | T4 | 2,250 |
| 36R | T3 | 9,450 |
| 36R | T4 | 7,700 |
| 36R | T5 | 5,800 |
| 36R | T6 | 4,150 |
| 36R | T7 | 2,000 |
| 18C | C/D11 | 10,450 |
| 18C | C/D9 | 8,500 |
| 18C | C/D8 | 7,500 |
| 18C | D7 | 6,400 |
| 18C | C7 | 6,200 |
| 18C | C/D6 | 5,650 |
| 18C | J | 4,950 |
| 18C | K | 4,650 |
| 18C | M | 3,850 |
| 18C | D4 | 3,250 |
| 18C | D3 | 2,400 |
| 36C | D2 | 10,450 |
| 36C | D3 | 8,550 |
| 36C | D4 | 7,700 |
| 36C | M | 7,100 |
| 36C | K | 6,300 |
| 36C | J | 6,000 |
| 36C | C/D6 | 5,300 |
| 36C | D7 | 4,550 |
| 36C | C7 | 4,750 |
| 36C | C/D8 | 3,450 |
| 36C | C/D9 | 2,450 |
| 18R | B6 | 7,450 |
| 18R | B5 | 5,500 |
| 18R | B4 | 2,050 |
| 36L | B3 | 6,900 |
| 36L | B4 | 5,900 |
| 36L | B5 | 2,450 |

Intersection departures are authorized for non-jet aircraft as long as the aircraft is given the distance available. Each runway end is listed separately; the page prints the two ends of one runway side by side.

### Local Control

*Source: CVG SOP 6 Local Control > Area of Responsibility*

- Local control is responsible for all runways designated active and must authorize all crossings of runway 18C/36C.
- LCC is responsible for the LCC taxi area, which lets it taxi runway 18C/36C arrivals to spots 12, 13, 14 or 15 via taxiways J, D6 or D7 without transferring communications to GC, and for taxiways west of runway 18C/36C.
- Local control airspace for the north/northwest, south/southwest, east and west operations is depicted in diagrams (local_north.svg and the others).
- A local controller must coordinate with the adjacent LC when an aircraft will need the adjacent controller's airspace (ex. a cross-complex departure).

### Coordination with TRACON

*Source: CVG SOP 6 Local Control > Coordination with TRACON*

- All IFR departures are automatically released provided they are assigned a heading from the table above or a SID. IFR departures landing within CVG TRACON (LUK, HAO, etc.) require a verbal release prior to departure.
- Handle all go-arounds and missed approaches as a departure (heading as assigned above) and 4000'. All departure releases to the runway the go-around occurred on are suspended until released by departure radar. LC must maintain separation from other aircraft under their control after a go-around; if the standard heading would conflict, assign a heading that avoids it and inform BDR/WDR. All go-arounds and missed approaches must be verbally coordinated with BDR/WDR as appropriate.
- Reduced longitudinal separation of 2.5nm within 10nm is authorized for arrivals to all runways, provided braking action is good and runway turnoffs are visible from the tower.
- Traffic may not depart runway 27 if traffic landing 36L is inside a ten-mile final.
- LC may conduct successive/simultaneous departures from runways 18L/C, 36C/R and 36L/R with course divergence beginning within 2nm of the departure end of the runways.

### Runway 18R/36L arrivals when LCW is a separate position

*Source: CVG SOP 6 Local Control > Runway 18R/36L Arrivals*

- LCW/LCC must use arrival strips to transfer control of communications.
- After a runway 18R/36L arrival exits, LCW provides initial taxi instructions (ex. Taxi South on B), instructs the aircraft to monitor LCC, and moves the arrival flight strip to the LCC bay.

### Simultaneous independent approaches

*Source: CVG SOP 6 Local Control*

- With a Final Monitor (FM): FM is responsible for separation of successive arrivals to the point where LC can provide visual separation, and has control to climb and turn aircraft on the arrival side of the airport out to 1nm from the runway or the point at which LC assumes separation responsibility, whichever is greater. LC must not adjust the speeds of aircraft over which FM has control, and must issue to FM any traffic that will transition the portion of LC airspace in which FM has control. Action by FM to break an aircraft off the final by overriding the LC frequency constitutes coordination with LC for the use of LC airspace.
- Widely spaced parallel runways without FM (runways 18L/R and 36L/R): transfer of monitor responsibility occurs upon frequency change. Transfer of communication to LC must be accomplished at or before the FAF, but no further than 7nm from the threshold. Additional requirements are in JO 7110.65 Chapter 5.

### Line up and wait

*Source: CVG SOP 6 Local Control > Line Up and Wait (LUAW)*

- See the ATC Handbook, Local Control, Line Up and Wait. LUAW is authorized at CVG from the intersections depicted in luaw_intersections.png with these conditions: not authorized from an intersection between sunset and sunrise; when authorizing LUAW, inform the aircraft of any traffic within 6nm of landing on the same runway; during same-runway operations (used for both takeoff and landing) LUAW is authorized only if the ASSC is functioning with safety logic enabled, the ceiling is 800' or more and visibility 2sm or more.

## 7. Approach control

CVG SOP 7.

### Departures received from other facilities

*Source: CVG SOP 7 Approach Control > Departures*

| Airport | Route | From | Altitude | Notes |
| --- | --- | --- | --- | --- |
| MWO, MGY, I68 | Departures to the south | CMHz | Heading 180 climbing 4000 | CVG control for climb and turns |
| ILN | Departures via CVG or FLM | CMHz | Heading 220 climbing 8000 | CVG control for climb and turns |

### Departures - handoffs to other facilities

*Source: CVG SOP 7 Approach Control > Departures*

| Route | To | Altitude | Notes |
| --- | --- | --- | --- |
| OXD departures to the north | CMHz | Heading 360 climbing 3000 | CMH control for climb and turns |
| North (HAGOL, BNGLE or RIKLE) | ZID (CVG 22) | Climbing 13000 | CVG may clear direct HAGOL, BNGLE or RIKLE |
| South (CHCLL, SILKS, KENLN) | ZID (LEX 20) | Climbing 13000 | CVG may clear direct CHCLL, SILKS or KENLN |
| East (GIPLE, ROCKT) | ZID (PIK 69) | Climbing 13000 | CVG may clear direct WADAL or GIPLE |
| West (LOVEY) | ZID (SHB 34) | Climbing 13000 | CVG may clear direct LOVEY |
| MIE (JBNCH or MIE) | ZID (SHB 34) | Climbing 13000 | CVG may clear direct JBNCH or MIE |
| Others | ZID | Climbing 13000 | On course |

Departures filed below 13000 are cleared on course and climbing to the filed altitude and may be handed to a neighboring ATCT instead of ZID. Departures from the LUK ATCT are handed off per the LUK ATCT SOP (not pulled). Typos as written: "dircect" throughout.

### Arrivals - handoffs from other facilities

*Source: CVG SOP 7 Approach Control > Arrivals*

| Landing | Route | From | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG | TIGRR# or TIGRR | ZID (CVG 22) | Descending via, or TIGRR at 14000 | ZID may not clear further than TIGRR |
| CVG and sats | CEGRM# or CEGRM | ZID (SHB 34) | Descending via, or CEGRM at 14000 | ZID may not clear further than CEGRM |
| CVG and sats | GAVNN# or GAVNN | ZID (RIV 26) | Descending via, or GAVNN at 10000 (jet) or 9000 (prop) | ZID may not clear further than GAVNN |
| CVG and sats | JAKIE# or JAKIE | ZID (RIV 26) | Descending via, or JAKIE at 14000 (jet) or 11000 (prop) | ZID may not clear further than JAKIE. When CVG is landing runway 27/West, ZID must route arrivals via GAVNN. |
| CVG and sats | SARGO# or SARGO | ZID (ABB 18) | Descending via, or SARGO at 14000 | ZID may not clear further than TIGRR [sic - the row is SARGO] |
| CVG and sats | ARBAS RID MEEKR | CMHz | 10000 |  |
| CVG and sats | MXQ | CMHz | 10000 |  |
| CVG and sats | Direct | CMHz | 4000 or 6000 | CVG control for descent and turns |
| CVG and sats | All | INDz | 5000 or 7000 | CVG control for turns up to 30 degrees |
| CVG and sats | Direct | LEXz | 6000 |  |
| CVG sats | MXQ or HEDEE or HEDEE# | CMHz | 10000 |  |
| CVG sats | BEAER BOSTR | ZID (RIV 26) | AOB 8000 |  |
| CVG sats | ARBAS RID MEEKR | CMHz | 10000 |  |
| CVG sats | Direct | CMHz | 4000 or 6000 |  |
| CVG sats | All | INDz | AOB 7000 | CVG control for descent and turns up to 30 degrees |
| CVG sats | All | LEXz | AOB 7000 |  |

The wiki groups the rows under "Landing CVG", "Landing CVG and Sats" and "CVG Sats"; the group is the first column here. Bold (primary jet flow) is lost in the saved page. Satellite arrival procedures were updated 2026-04-04 (changelog).

### Overflights

*Source: CVG SOP 7 Approach Control > Overflights*

| Destination | Route | From | Altitude | To | Altitude | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| ILN | SARGO ROYYZ | ZID (ABB 18) | ROYYZ @ 14000 | CMHz | 5000 |  |
| ILN | FLM | ZID (LEX 20) | FLM @ 14000 | CMHz | 5000 |  |
| LEX | JIMUR | ZID (CVG 22) | JIMUR @ 14000 | LEXz | AOB 10000 | Correct altitude for DOF |
| SDF+ | JIMUR DLAMP (prop) | ZID (CVG 22) | JIMUR @ 14000 | SDFz | AOB 10000 |  |
| DAY, FFO | LODLL HICKS FIITZ | ZID (RIV 26) | HICKS @ 14000 | CMHz | 11000 |  |

### Y scratchpad entries

*Source: CVG SOP 7 Approach Control > Scratchpad Entries*

| Route | Scratchpad |
| --- | --- |
| BNGLE# | BNG |
| CHCLL# or IIU | CHC |
| CVG# RIKLE/APE/DJB | RIK |
| CVG# MIE | MIE |
| CVG# DQN/ROD | DQN |
| GIPLE# | GIP |
| HAGOL# | HAG |
| JBNCH# | JBN |
| KENLN# or HYK | KEN |
| LOVEY# | LOV |
| ROCKT# | ROC |
| SILKS# | SIL |

Aircraft cleared via the CVG# departure have the delta symbol inserted in the Y-plus scratchpad automatically. Aircraft entering the TRACON on a non-RNAV STAR, via radar vectors, or on an RNAV STAR but vectored off it shall have the delta symbol inserted in the Y-plus scratchpad as a reminder and notice to other controllers.

### Arrival runway assignment

*Source: CVG SOP 7 Approach Control > Arrivals*

- Assign runways based on parking position when traffic is light. In high volume: GAVNN, JAKIE, TIGRR - 18L/36R; CEGRM, RID, SARGO - 18C/36C or 18R/36L. NAR/SAR should use discretion; depending on volume it may be useful to direct aircraft to flowed runways for better balancing and lower delays.

### Flowed arrivals

*Source: CVG SOP 7 Approach Control > Flowed Arrivals*

- Flowed arrivals take an aircraft from one complex to another for traffic balancing (ex. an aircraft on the JAKIE directed to runway 18C). This is normally done with an arrival flying "long side" (ex. JAKIE landing runway 18C). "Short side" flowed arrivals must be verbally coordinated.
- Arrivals must have the landing runway in the Y-scratchpad.
- Aircraft may be flowed at any altitude provided it is within their airspace and the controller is cognizant of departures.
- The receiving controller has control for speed adjustments on contact but may not slow the aircraft below 250 KIAS until within 15nm of CVG unless coordinated. The transferring controller is responsible for assigning the new runway.

### Pre-arranged coordination (PACP)

*Source: CVG SOP 7 Approach Control > Prearranged Coordination Procedures (PACP)*

- WDR/BDR may climb aircraft through arrival and/or adjacent departure airspace provided: the controller who penetrates another controller's airspace determines and applies the required wake turbulence separation; visual or vertical separation in arrival airspace is not authorized without prior coordination; and BDR and WDR display the full data blocks for the sectors they are penetrating using PACP.
- Special use airspace: "To be added at a later date" (SOP 7). Nothing is stated.

## 8. Satellite airports

CVG SOP 7.

### Airports within the CVG TRACON

*Source: CVG SOP 7 Approach Control > Satellite IFR Departures*

- Primary: Cincinnati Northern Kentucky (CVG).
- Secondary - all require verbal release of IFR traffic: Butler Co Rgnl/Hogan Field, Hamilton (HAO); Batesville (HLB); Cincinnati West, Harrison (I67); Clermont Co, Batavia (I69); Gene Snyder, Falmouth (K62); Cincinnati Muni/Lunken Field (LUK); Miami University, Oxford (OXD).
- The SOP marks operating control towers in bold; the bold is lost in the saved page. The vNAS record lists a tower at LUK only. Climb-out instructions must be individually coordinated with the controller responsible for each airport.
- Satellite arrivals should have the airport left in the Y-scratchpad and any non-standard approach request placed in the Y-plus scratchpad.

The vNAS area lists the same eight identifiers (including CVG).

## 9. Inter-facility coordination

CVG SOP 8. The LOA content is in the SOP; no separate LOA documents were found.

### CVG and CMH

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to CMH | DAY, FFO, MGY | FIITZ | 11000 (to CMHz) |  |
| CVG to CMH | DAY, FFO | Other | 5000 or 7000 (to CMHz) | CMH control for turns and descent |
| CVG to CMH | DAY sats | All | 5000 (to CMHz) | CMH control for turns and descent |
| CVG to CMH | ILN | SARGO ROYYZ | 5000 (to CMHz) |  |
| CVG to CMH | ILN | FLM | 5000 (to CMHz) |  |
| CVG to CMH | OXD departures | to the north | Climbing 3000 heading 360 (to CMHz) | CMH control for climb and turns |
| CMH to CVG | CVG+ | RID MEEKR | 10000 (from CMHz) |  |
| CMH to CVG | CVG+ | MXQ or HEDEE# | 10000 (from CMHz) |  |
| CMH to CVG | CVG+ | Direct destination | 4000 or 6000 (from CMHz) | CVG control for turns and descent |
| CMH to CVG | MWO, MGY, I68 departures | to the south | Climbing 4000 heading 180 (from CMHz) | CVG control for climb and turns |
| CMH to CVG | ILN departures | CVG or FLM | Climbing 8000 heading 220 (from CMHz) | CVG control for climb and turns |

### CVG and IND

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to IND | IND | DECEE VHP | 10000 (to INDz) | IND control for speed and turns up to 30 degrees |
| CVG to IND | IND | Direct | AOB 8000 (to INDz) | IND control for speed and turns up to 30 degrees |
| CVG to IND | IND sats | All | AOB 8000 (to INDz) | IND control for descent and turns up to 30 degrees |
| IND to CVG | CVG sats | All | AOB 7000 (from INDz) | CVG control for descent and turns up to 30 degrees |

### CVG and LEX

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to LEX | LEX | All | AOB 10000 (to LEXz) | Correct altitude for DOF |
| CVG to LEX | 0I8, 27K, FFT | All | 4000 or 5000 (to LEXz) |  |
| LEX to CVG | CVG | Direct | 6000 (from LEXz) |  |
| LEX to CVG | CVG sats | All | AOB 7000 (from LEXz) |  |

### CVG and SDF

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to SDF | SDF+ jet | DLAMP | At 10000 (to SDFz) |  |
| CVG to SDF | SDF+ prop | Direct | AOB 8000 (to SDFz) |  |
| SDF to CVG | CVG | Direct | AOB 9000 (from SDFz) |  |
| SDF to CVG | CVG sats | Direct | AOB 9000 (from SDFz) |  |

### Inter-facility rules

*Source: CVG SOP 8 Inter-Facility Coordination*

- Both CVG and SDF release control for turns up to 30 degrees and, if landing within their respective airspace, descent on contact.
- CVGz must point out IMS RNAV runway 21 arrivals to SDFz and verbally coordinate issuing the approach clearance and IFR cancellation.
- Arrivals, overflights and departures are handed off via the sections above.

## 10. Radar sectors

CVG SOP 9. Text only - the airspace diagrams for each flow are pictures.

### NAR/SAR hand arrivals to FAR/VAR at

*Source: CVG SOP 9 Radar Sectors*

| Operation | Arrival | Altitude |
| --- | --- | --- |
| North | GAVNN/JAKIE base | 8000' |
| North | SARGO base | 7000' |
| South | TIGRR base | 8000' |
| South | CEGRM/RID base | 7000' |
| East | CEGRM/RID base | 7000' |
| East | SARGO base | 5000' |
| West | TIGRR base | 7000' |
| West | GAVNN/JAKIE base | 5000' |
| Any | Downwind | 6000' |

### Sector splits

*Source: CVG SOP 9 Radar Sectors > Sector Splits*

- The most common two-way split is east/west, in the middle between the 18C/36C and 18L/36R centerlines. For events more complex splits are required, generally dictated by the events team. It is common for two sectors of the same type (ex. FAR and VAR) to be combined. LST is typically combined with a DR position. Additional event splits: 3-way East-West-Final, north and south (diagrams 3_way_event_*.svg).
- Bearcat and Wildcat Departure Radar is responsible for CVG departure flows and handles arrivals to neighboring facilities (DAY, LEX, SDF and ILN).
- FAR/VAR releases control of satellite airport arrivals to LST/WDR/BDR for descent and turns of not more than 30 degrees.

### Arrival North and South

*Source: CVG SOP 9 Radar Sectors*

- NAR is the primary feeder for CVG arrivals via CEGRM and TIGRR, feeding both the northeast and northwest posts to FAR/VAR. SAR is the primary feeder via GAVNN, JAKIE and SARGO, feeding both the southeast and southwest posts.
- NAR/SAR releases control of aircraft to FAR/VAR for descents and turns toward the airport and up to 30 degrees away from the airport, and releases control for descent and turns up to 30 degrees to LST.
- NOTE: aircraft assigned descend via comply with the altitudes below except for SARGO landing runway 9 and GAVNN, JAKIE and TIGRR landing runway 27.

### Final Radar F and V

*Source: CVG SOP 9 Radar Sectors*

- FAR is responsible for the runway 18L/36R final approach (the east runway). FAR is also the consolidated final radar sector and, in an East or West operation, the only open final radar sector. VAR is responsible for the runway 18R/36L and 18C/36C final approach courses (the west runways) and is only open in a north or south operation. FAR and VAR must quick-look each other.
- Distance between runways: 18L/36R and 18C/36C - 6000 ft; 18R/36L and 18C/36C - 4300 ft; 18L/36R and 18R/36L - more than 10000 ft.
- If final initiates a runway change, it must issue the appropriate LOC frequency.
- Use caution when clearing aircraft for visual approaches to runway 27 when LUK is departing runway 25: this creates close-proximity operations with minimal lateral airspace.
- Dual simultaneous independent approaches: the low side is the westernmost runway; FAR is responsible for establishing the approach sequence. During simultaneous instrument approaches, traffic vectored to the high runway must not be turned onto the LOC below 6000; instruct aircraft to cross PHILO/FELUB/SNPPR/PUPPT at 6000 unless coordinated with the low-side controller. During simultaneous visual approaches, traffic vectored to the high runway must be turned on 1000 above or cleared for the visual before reaching 3nm from the low-side controller's traffic; this may be discontinued when either final controller's Y-scratchpad indicates VA, VR or VS. During simultaneous independent approaches to the widely spaced parallels (18L/18R or 36L/36R), traffic vectored to 18L/36R must not be turned on below 6000; instruct aircraft to cross PHILO/SNPPR at 6000 unless coordinated with the low-side controller. Transfer of communications must not occur later than 7nm from the runway.

### Satellite Radar

*Source: CVG SOP 9 Radar Sectors*

- LST is responsible for traffic arriving and departing LUK and various other satellites. It is normally combined with BDR/WDR.

## 11. STARS maps

CVG SOP 10.

### STARS video maps (98)

*Source: CVG SOP 10 STARS Maps*

Map names only. The vNAS record lists 97 map ids for this STARS facility; the video-map geometry is served separately by vNAS (checked 2026-10-22; see `../_shared/claude_ZID_Sector_Geometry_Reference.md` section 7).

98 maps; the list is in the SOP chapter 10 and in the deck's STARS maps table.

## 12. Where the SOP and the other sources disagree

Named, not resolved.

### Clearance Delivery frequency

- **A:** CVG SOP 2 Positions: 127.17
- **B:** vNAS CVG_DEL: 120.400
- Disagreement. Not resolved. The vNAS value is the one that equals the SOP's DHL Ramp frequency (next entry).

### DHL Ramp frequency

- **A:** CVG SOP 2 Positions: 120.40
- **B:** vNAS CVG_D_RMP: 129.475; the SOP's own ATIS NOTAM text ("AC AT DHL RAMP CTC 129.47") and the vATIS profile NOTAMs also say 129.47
- Three sources against one table cell. The SOP table value equals the vNAS Clearance Delivery frequency, which suggests the two cells were crossed in one of the sources. A reading, not a correction; neither is changed.

### Ground Control East STARS ID

- **A:** CVG SOP 2 Positions: T
- **B:** vNAS CVG_E_GND: TCP 1X, which is also the TCP of the vNAS-only Controller In Charge position
- Disagreement. Not resolved.

### How far ZID may clear a SARGO arrival

- **A:** CVG SOP 7 Arrivals, SARGO row: "ZID may not clear further than TIGRR"
- **B:** vNAS Restriction (ZID to CVG, SARGO Gate): ZID may clear direct SARGO
- The SOP note appears to repeat the TIGRR row. Both carried.

### Where CHCLL and SILKS departures go

- **A:** CVG SOP 7 Departures: South (CHCLL, SILKS, KENLN) to ZID LEX 20
- **B:** vNAS Restrictions (CVG to ZID): KENLN to sector 20; CHCLL and SILKS to sector 22
- The two sources split the SOP's South gate. Handoff IDs differ: C20 against C22. Not resolved.

### Departure runways advertised

- **A:** CVG SOP 1: North departs 36C and 36R; South departs 18L and 18C
- **B:** vATIS departure presets: NORTH advertises DEPG RWY 36R, SOUTH advertises DEPG RWY 18L
- The broadcast names fewer runways than the configuration table. The preset is the tower's broadcast, not the TRACON's assignment.

### TIGRR spelling in the adaptation

- **A:** CIFP 261001 and the SOP: TIGRR
- **B:** vNAS starsConfiguration.rnavPatterns: "TIGGR#"
- A typo in the adaptation, or a pattern that never matches. Not corrected.

### Channels printed to two decimals

- **A:** CVG SOP 2: LCW 133.32, LCE 118.97, NAR 123.87, VAR 127.72, N Ramp 130.37
- **B:** vNAS: 133.325, 118.975, 123.875, 127.725, 130.375
- Truncation, not disagreement. The tool shows the full channel.

### Simultaneous-operations sentence

- **A:** CVG SOP 1: "Landing Runway 9 while landing Runway 9 while departing Runway 18L/36R"
- **B:** The prohibited list below it: landing runway 9 while departing 18L
- As-written duplication. Carried with a marker.

