# IND SOP Reference - Indianapolis (IND) ATCT SOP

Transcribed **2026-10-18** from the saved page of **Indianapolis (IND) ATCT SOP** on the Indy Center wiki (`https://wiki.flyindycenter.com/docs/ind`). Last changelog entry in the page: **2026-05-28**. **The wiki is behind a VATSIM login** - see `claude_Source_Documents_Index.md`. The SOP text itself is not committed; this file is the transcription and the cross-check.

**Citation convention.** The SOP is a wiki page with numbered chapters, not a paragraph-numbered order. A value is cited as `IND SOP <chapter> > <heading>` - for example `IND SOP 7 Approach Control > Arrivals`. Every table below names its own source line.

**Where a second source exists it is shown beside the SOP, never merged into it.** Second sources: the vNAS facility record for ZID (lastUpdatedAt 2026-10-17T02:35:43.475Z), CIFP 261001, and the vATIS profile (serial 2026081300). Disagreements are in the last section and are not resolved.

Pictures in the SOP (every airspace diagram) are not transcribed; they are listed in `claude_IND_Gap_Analysis.md` Part 3.

---

## 1. Positions - two sources, checked

SOP: IND SOP 2 Positions. vNAS: the ZID record, position callsign, frequency and TCP. **The SOP prints most channels to two decimals; vNAS carries the full 25 kHz value** (`128.175` is written `128.17`). Voice the full channel.

| Key | Position | SOP frequency | vNAS frequency | SOP STARS ID | vNAS TCP | vNAS callsign | SOP tag | Folds into | Frequency | STARS ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CD | Clearance Delivery | 128.75 | 128.750 | T | 1T | IND_DEL | IND CD | - | agree | agree |
| RC | FedEx Ramp Control | 130.80 | 130.800 | - | - | IND_FX_RMP | FDX RC | - | agree |  |
| GC | Ground Control | 121.90 | 121.900 | T | 1T | IND_GND | IND GC | - | agree | agree |
| LCE | Local Control East | 120.90 | 120.900 | Y | 1Y | IND_E_TWR | IND LCE | - | agree | agree |
| LCW | Local Control West | 127.82 | 127.825 | X | 1X | IND_W_TWR | IND LCW | LCE | SOP prints two decimals | agree |
| DRE | Departure Radar East | 124.95 | 124.950 | E | 1E | IND_E_APP | IND DRE | - | agree | agree |
| DRW | Departure Radar West | 119.05 | 119.050 | W | 1W | IND_W_APP | IND DRW | DRE | agree | agree |
| STS | Satellite Radar South | 127.15 | 127.150 | S | 1S | IND_S_APP | IND STS | DRE | agree | agree |
| STN | Satellite Radar North | 124.65 | 124.650 | N | 1N | IND_N_APP | IND STN | STS | agree | agree |
| FRB | Feeder Radar West | 121.10 | 121.100 | B | 1B | IND_B_APP | IND FRB | DRE | agree | agree |
| FRD | Feeder Radar East | 128.17 | 128.175 | D | 1D | IND_D_APP | IND FRD | DRE | SOP prints two decimals | agree |
| FNI | Final Radar West | 120.52 | 120.525 | I | 1I | IND_I_APP | IND FNI | DRE | SOP prints two decimals | agree |
| FNF | Final Radar East | 123.95 | 123.950 | F | 1F | IND_F_APP | IND FNF | DRE | agree | agree |
| BAK_TWR | Columbus Muni Local Control | - | 118.600 | - | - | BAK_TWR |  | - | vNAS only |  |
| BAK_GND | Columbus Muni Ground Control | - | 121.950 | - | - | BAK_GND |  | - | vNAS only |  |
| MIE_TWR | Muncie Local Control | - | 120.100 | - | - | MIE_TWR |  | - | vNAS only |  |
| MIE_GND | Muncie Ground Control | - | 121.950 | - | - | MIE_GND |  | - | vNAS only |  |
| AID_TWR | Anderson Muni Local Control | - | 126.000 | - | - | AID_TWR |  | - | vNAS only |  |
| AID_GND | Anderson Muni Ground Control | - | 121.600 | - | - | AID_GND |  | - | vNAS only |  |
| HBE_TWR | Himsel Army Airfield Local Control | - | 126.200 | - | - | HBE_TWR |  | - | vNAS only |  |

"Folds into" is the vNAS consolidation hierarchy (a TCP's parent). Position keys that are vNAS callsigns are child towers or vNAS-only positions.

## 2. Fields, runways and configurations

Fields: vNAS area underlyingAirports; IND SOP 7. Runways from CIFP 261001; magnetic variation at the primary field is west 5.0 degrees.

| Field | Name | Role | Runways | Source |
| --- | --- | --- | --- | --- |
| KIND | Indianapolis Intl | primary | 5L 5R 14 23L 23R 32 | vNAS area underlyingAirports; IND SOP 7 |
| KBAK | Columbus Muni | towered satellite | 5 14 23 32 | IND SOP 7 Satellite list; vNAS child tower BAK |
| KMIE | Delaware Co Rgnl (Muncie) | towered satellite | 3 14 21 32 | IND SOP 7 Satellite list; vNAS child tower MIE |
| KAID | Anderson Muni-Darlington Field | towered satellite | 12 18 30 36 | IND SOP 7 Satellite list; vNAS child tower AID |
| KHBE | Himsel AAF (Nineveh) | towered satellite | 18 36 | IND SOP 7 Satellite list; vNAS child tower HBE |
| KMQJ | Indianapolis Rgnl | satellite | 7 16 25 34 | IND SOP 7 Satellite list; SOP 7 Satellite IFR Departures |
| KTYQ | Indianapolis Exec | satellite | 18 36 | IND SOP 7 Satellite list |
| KUMP | Indianapolis Metro | satellite | 15 33 | IND SOP 7 Satellite list |
| KEYE | Eagle Creek Airpark | satellite | 3 21 | IND SOP 7 Satellite list; SOP 7 Satellite IFR Departures |
| KHFY | Indy South Greenwood | satellite | 1 19 | IND SOP 7 Satellite list |
| KGEZ | Shelbyville Muni | satellite | 1 9 19 27 | IND SOP 7 Satellite list |
| KCFJ | Crawfordsville Rgnl | satellite | 5 23 | IND SOP 7 Satellite list |
| KGPC | Putnam Co Rgnl (Greencastle) | satellite | 18 36 | IND SOP 7 Satellite list |
| KOVO | North Vernon | satellite | 5 15 23 33 | IND SOP 7 Satellite list |
| KUWL | New Castle Henry Co Marlatt Field | satellite | 10 28 | IND SOP 7 Satellite list |
| 2R2 | Hendricks Co-Gordon Graham Field | satellite | 18 36 | IND SOP 7 Satellite list; SOP 6 Block 2R2 |
| 5I4 | Sheridan | satellite | 5 9 23 27 | IND SOP 7 Satellite list |
| I34 | Greensburg Muni | satellite | 1 19 | IND SOP 7 Satellite list |
| I99 | Alexandria | satellite | 9 27 | IND SOP 7 Satellite list |
| 8A4 | Indianapolis Downtown | satellite | not in CIFP | IND SOP 7 Satellite list - no CIFP runway record |
| 81II | Methodist Hospital of IN | satellite | not in CIFP | IND SOP 7 Satellite list - no CIFP runway record |
| IN35 | Decatur Co Meml Hospital (Greensburg) | satellite | not in CIFP | IND SOP 7 Satellite list - no CIFP runway record |
| IN74 | Ball Meml Hospital (Muncie) | satellite | not in CIFP | IND SOP 7 Satellite list - no CIFP runway record |
| IN84 | IU Health Morgan (Martinsville) | satellite | not in CIFP | IND SOP 7 Satellite list - no CIFP runway record |

### Runways at the primary field (CIFP 261001)

| Field | Runway | Length x width (ft) | Magnetic bearing | ILS | Displaced threshold |
| --- | --- | --- | --- | --- | --- |
| KIND | 5L | 11200 x 150 | 50 | IIND 111.75 CAT III | - |
| KIND | 5R | 10000 x 150 | 50 | IOQV 111.15 CAT III | - |
| KIND | 14 | 7278 x 150 | 140 | IBJP 110.50 CAT I | - |
| KIND | 23L | 10000 x 150 | 230 | IFVJ 111.15 CAT II | - |
| KIND | 23R | 11200 x 150 | 230 | IUZK 111.75 CAT I | - |
| KIND | 32 | 7278 x 150 | 320 | ICOA 110.50 CAT I | - |

Threshold-to-threshold distance computed from the two threshold coordinates on the WGS84 ellipsoid agrees with the CIFP length less displaced thresholds to within 1 ft on every strip.

### Configurations

IND SOP 4, 5, 6 and 9 name four configurations by runway; the vATIS profile has three presets; vNAS has four runway plans and three tower plans.

| Name | Landing | Departing | Notes | Source |
| --- | --- | --- | --- | --- |
| Runway 5 (northeast) operation | 5L 5R | 5L 5R | vATIS: PARL ILS RWY 5L AND ILS RWY 5R APCH IN USE. DEPG RWYS 5L, 5R. The SOP lists no runways for a configuration by name. | IND SOP 4 and 5 ("Northeast (Runway 5) Operation"); vATIS preset 5L/R; vNAS plan R05 |
| Runway 23 (southwest) operation | 23L 23R | 23L 23R | vATIS: PARL ILS RWY 23L AND ILS RWY 23R APCH IN USE. DEPG RWYS 23L, 23R. | IND SOP 4 and 5 ("Southwest (Runway 23) Operation"); vATIS preset 23L/R; vNAS plan R23 |
| Runway 14 operation | 14 | 14 | The runways landed and departed are INFERRED from the configuration name: the SOP never lists them and the vATIS preset "32/14" names only runway 32. LC must be combined. | IND SOP 6 ("Runway 14 or 32 configuration"); vNAS plan R14; no vATIS text names 14 |
| Runway 32 operation | 32 | 32 | vATIS: ILS RWY 32 APCH IN USE. CROSS RUNWAY OPERATIONS MAY BE IN EFFECT. LC must be combined. | IND SOP 6 ("Runway 14 or 32 configuration"); vATIS preset 32/14; vNAS plan R32 |

The SOP gives no wind rule and no rule for choosing between configurations. The tool therefore ranks them by arithmetic only and picks nothing.

## 3. General

IND SOP 1. Equipment, STARS configuration and the LIFT Academy procedures.

### Equipment

*Source: IND SOP 1 General > Equipment*

- Tower Cab Display
- SAID
- Departure Flight Strip Printer
- TDLS
- The real IND ATCT has a non-certified ADS-B display that mimics an ASDE-X. Since IND is a class C, all aircraft should have ADS-B and be displayed. It has no safety logic, so the VATSIM IND ASDE-X has no functionality beyond the display - no scratchpads, runway configurations or safety logic. No setup is required beyond opening the display.

### STARS configuration

*Source: IND SOP 1 General > STARS Configuration*

- Has STARS: yes. Uses CWT: yes. Rundown lists: no. Has ATPA: yes.
- Alert TCPs: 1B, 1D, 1E, 1F, 1I, 1N, 1S, 1T, 1W, 1X, 1Y (all alert; none monitor).
- Auto consolidates to the combined position: yes. TCPs must be added manually when split.
- vATIS profile: IND ATCT.

### LIFT Academy procedures

*Source: IND SOP 1 General > LIFT Academy Procedures*

- LIFT Academy is a real flight training programme run by Republic Airways with a large fleet at IND. Not all pilots will have access to these procedures; if a pilot requests a LIFT-specific procedure and the controller is familiar with it, it should be simulated. There is no obligation for either side to use them.
- Flight plans: LIFT pilots use the 3-letter identifier LTA and callsign "Lift". A flight plan filed with the letter L at the end (ex. LTA442L) is a spin-training flight.
- LTA VFR departures may file IFR including: IND as departure and arrival airport (unless going elsewhere for a full stop); if going to the practice area, the intersection associated with the practice area and an altitude of 3000'; if requesting flight following to another airport, the destination airport and an appropriate VFR altitude; if not, the fix associated with the direction of flight (ex. ANTII if going to HUF); for multiple practice approaches at other airports, each airport in the route string and "VFR MULTI APCH" in the remarks; and "VFR" in the remarks.
- LTA IFR departures may file a standard IFR flight plan, except that for multiple practice approaches at other airports each airport goes in the route string and "IFR MULTI APCH" in the remarks.
- Practice areas are pre-designated: LOW means at or below 4000', HIGH means at or below 8000' (diagram: lta_practice_areas.png).
- VFR arrivals: the pilot contacts IND TRACON as soon as practical with ATIS and altitude; once instructed, flies direct to the nearest arrival fix outside PEYTN/KNIGT (runways 5 or 23) or PNFLD/CRCLE (runways 14 or 32); maintains VFR at 3500' (if unable, advise). IND TRACON instructs the aircraft to proceed direct to a fix, join the arrival, and expect a runway (ex. "LTA245, proceed direct PNFLD, join the Lift Arrival, expect Runway 14").
- IFR arrivals are handled as any other IFR arrival. LTA aircraft may be assigned the JAKKS or GIIBS arrivals and must be instructed to fly a runway transition, maintain a hard altitude and delete speed restrictions (ex. "LTA2420, cleared to IND airport via direct BBACK, JAKKS3 arrival, Runway 23R transition, except maintain (altitude), delete speed restrictions.").

Procedures for one operator. The STARS maps 70 to 79 carry the LIFT arrival, runway 14-32 and hold waypoints.

## 4. Clearance delivery

IND SOP 3. SIDs, departure frequencies, gates, VFR departures and TDLS.

### IFR departures

*Source: IND SOP 3 Clearance Delivery > IFR Departures*

| Aircraft | Via | Altitude | Expect | Notes |
| --- | --- | --- | --- | --- |
| Jet | DAWNN#, OOM#, INDY#, MAREO#, MEARZ#, ROCKY# | 5000' | n/a (SID)<br>10 minutes after (no SID) | Aircraft requesting below 11000 may only be assigned the MAREO# or INDY#. If the MAREO# is not applicable for direction of flight, jet aircraft should be assigned the INDY#.<br>If a jet departure requests and coordination is approved for a non-primary runway (ex. ODO or departing runway 14/32 in a 5/23 configuration), assign an initial altitude of 3000. |
| Prop | DAWNN#, OOM#, MAREO#, MEARZ#, ROCKY# | 3000' | n/a (SID)<br>10 minutes after (no SID) | Aircraft requesting below 11000 may only be assigned the MAREO#. If this is not applicable for direction of flight, aircraft should not be assigned a SID. |

### Departure frequency - runway 5 or 23 configuration

*Source: IND SOP 3 Clearance Delivery > IFR Departures*

| SID or departure gate | General direction | Frequency |
| --- | --- | --- |
| ROCKY<br>MEARZ | NW of 5L/23R centerline | 119.05 (DRW) |
| MAERO [sic]<br>DAWNN<br>OOM | SW of 5R/23L centerline | 124.95 (DRE) |

As written. MAERO is not a procedure; the table beside it, the gate table and every other section spell it MAREO.

### Departure frequency - runway 14 or 32 configuration

*Source: IND SOP 3 Clearance Delivery > IFR Departures*

| SID or departure gate | General direction | Frequency |
| --- | --- | --- |
| ROCKY<br>OOM<br>DAWNN | NW of 5L/23R centerline | 119.05 (DRW) |
| MAREO<br>MEARZ | SW of 5R/23L centerline | 124.95 (DRE) |

As written: the directions are still given against the 5/23 centerlines in a 14/32 configuration. The assignment differs from the 5/23 table for DAWNN and OOM.

### Departure gates, SIDs and transitions

*Source: IND SOP 3 Clearance Delivery > IFR Departures*

| Direction | SID | SID transitions |
| --- | --- | --- |
| East | MAREO# | BDOCK |
| South | DAWNN# | MYS<br>IIU |
| Southwest | OOM# | PXV |
| West | ROCKY# | SPI<br>STL |
| North | MEARZ# | BVT<br>BRATN<br>MZZ |

### VFR departures

*Source: IND SOP 3 Clearance Delivery > VFR Departures*

| Aircraft type | Altitude | Departure frequency | Beacon code? |
| --- | --- | --- | --- |
| Jet | 5000' | 119.05 (West)<br>124.95 (East) | Yes |
| Prop | 3000' | 119.05 (West)<br>124.95 (East) | Yes |

### Route and altitude restrictions

*Source: IND SOP 3 Clearance Delivery > IFR Departures*

- Departures to CVG+, DAY+, HUF+ and SDF+ at or below 13000 (TEC).
- IFR aircraft requesting AOA 14000' must be cleared via a route below or coordinated with an overlying controller (if online). Aircraft AOB 13000' may be assigned the INDY#.

### VFR departure flight plans

*Source: IND SOP 3 Clearance Delivery > VFR Departures*

- Enter every VFR request into the flight plan editor with at least: aircraft type (ex. C172); requested altitude in hundreds of feet prefixed VFR/ (ex. VFR/045); departure airport (KIND) and destination if specified (ex. KLEX); direction of flight in the remarks if the destination is not specified (ex. East); and FF in the remarks if flight following is requested.
- Aircraft remaining in the pattern do not require a clearance, nor should they be assigned a beacon code. A handwritten strip may be used to track them.
- Phraseology: "N6974V, maintain VFR at or below 3000', departure frequency 124.95, squawk 1234."

### TDLS procedures

*Source: IND SOP 3 Clearance Delivery > TDLS Procedures*

- PDC/CPDLC equipped aircraft should be issued their clearance via TDLS/PDC. This generally includes all airliners (other than legacy carriers such as PanAm) but not most general aviation or charter operators.
- TDLS is configured to give the pilot the most up-to-date information for their SID. If desired or required for an event, the local information and the departure frequency (normally updated through the temporary frequency function) may need to be selected manually.

### Coordination with Ground

*Source: IND SOP 3 Clearance Delivery > Coordination with Ground*

- Instruct aircraft anywhere other than the FedEx ramp to contact ground control when ready for taxi.
- When FedEx ramp control is open (typically during events): select the RAMP OPEN flag/NOTAM in the ATIS and instruct all aircraft at the FedEx ramp to contact ramp control for pushback.
- When ramp control is closed (normal operations): select the RAMP CLOSED flag/NOTAM in the ATIS and instruct all aircraft to contact ground control when ready for taxi.
- Before issuing taxi to a piston propeller aircraft, verify that the runup is complete and the aircraft will be ready to depart on reaching the runway. If a runup is required, instruct them to complete it at the ramp and report ready for taxi.
- Once an aircraft has read back its clearance, mark the strip in accordance with the ATC Handbook and push the flight strip to ground control.

## 5. Ground and ramp control

IND SOP 4 and 5.

### Ramp entry and exit points

*Source: IND SOP 4 Ramp Control; repeated in 5 Ground Control > Coordination with Ramp*

| Operation | Exit | Enter |
| --- | --- | --- |
| Northeast (5) | Odd | Even |
| Southwest (23) | Even | Odd |

### FedEx Ramp Control

*Source: IND SOP 4 Ramp Control*

- Ramp Control directs traffic into and out of the FedEx cargo ramp during busy periods. It is a company-run position that is sometimes open for large events. It does not receive flight strips or have access to ASDE-X or STARS; it has only what aircraft tell it and a Tower Cab display.
- Real ramp towers have company-forwarded information (ex. Aerobahn) that does not exist on VATSIM, so additional coordination is needed to establish the parking location; pilots often do not know parking spot names or numbers.
- RC does not assign runways; GC will issue departing runways.
- During a Northeast (Runway 5) operation aircraft enter the ramp at even-numbered points and exit at odd-numbered points.
- During a Southwest (Runway 23) operation the order of this SOP reads "enter the ramp at odd number points and even at odd number points" - see the table below and the disagreement list.
- For aircraft exiting at Point 1, instruct them to hold short of taxiway N3.
- Arrivals contact IND RC on landing for an assigned entry spot. In order of preference: "Enter at Point 3, taxi to Gate 39." / "Enter at Point 3, turn right, park after the B-767 on your right." / "Enter via your second right turn, then turn right again, then park before the MD-11 on your left."
- In either case GC assigns an inbound aircraft its entry point and it does not require coordination with RC.

### Ground Control

*Source: IND SOP 5 Ground Control*

- Ground control is delegated all movement areas other than active runways. Runway 14/32 is delegated to ground control when not in use; when in use (as advertised in the ATIS) it belongs to local control, and every crossing of 14/32 must be verbally coordinated between LC and GC.
- Aircraft from the terminal may push at their discretion, provided they remain clear of taxiways.
- Assign departures runway 5L/23R or 5R/23L depending on direction of flight and location on the airport; controllers are expected to use good judgement.
- When runways 23L/R are used for arrivals, the 23L/R approach areas (OCS) must remain clear of all aircraft on N, M or runway 14/32. If an aircraft on M, N or 14/32 will not be clear of the 23L/R APCH/OCS while traffic is inside a 2nm final, hold it short until the arrival has passed. Taxiway M and runway 14/32 have no OCS/APCH signage, so use a taxiway or other reference: "RPA4291, hold short of Runway 23L approach area." / "N12345, hold short of M2".
- Large aircraft should enter the Million Air ramp at the southeast entrance (taxiway G).
- B748 aircraft have reduced wingspan clearances; permitted, restricted and prohibited taxi routes are depicted in a diagram (b748_taxi_routs.svg).
- ADG 5 and 6 aircraft may not taxi on taxiway N between D and N3, or on taxiway G.
- Aircraft cannot clear runway 5R/23L at D3, D4, D5 and D6 and hold short of D. GC shall give way to aircraft exiting at these intersections and all others.
- When a departure is approaching the runway, instruct it to monitor local control and then push local control its flight strip. If a runup is needed, have the aircraft advise runup complete first, then monitor local and push the strip.

## 6. Local control

IND SOP 6. Headings, intersections, LUAW and the satellite blocks.

### Departure headings

*Source: IND SOP 6 Local Control > Coordination with TRACON*

| Runway | Jet headings | Prop headings |
| --- | --- | --- |
| 5L | RH | 320-050 |
| 5R | RH*, 070 | 050-140 |
| 23L | 210, RH*, 245* | 140-210 |
| 23R | 215*, RH, 245 | 210-320 |
| 14 | RH | 050 clockwise 230 |
| 32 | RH | 230 clockwise 050 |

* May not be assigned during split operations without coordination. RH = runway heading.

### Intersection departures - distance available (ft)

*Source: IND SOP 6 Local Control > Intersection Departures*

| Runway | Intersection | Distance available |
| --- | --- | --- |
| 5L | A11/B11 | 10800 |
| 5L | A7/B7 | 7150 |
| 5L | A5/B5 | 3950 |
| 5L | R/A4 | 2250 |
| 23R | A2/B2 | 10800 |
| 23R | A4/R | 8850 |
| 23R | A5/B5 | 6850 |
| 23R | A7/B7 | 4000 |
| 5R | C9/D9 | 9600 |
| 5R | C8/D8 | 8200 |
| 5R | D7 | 7100 |
| 5R | D6 | 5850 |
| 5R | C7 | 5350 |
| 5R | C4/D5 | 4100 |
| 23L | C2/D2 | 9600 |
| 23L | C3/D3 | 8350 |
| 23L | D4 | 6650 |
| 23L | C4 | 5850 |
| 14 | M1/G | 5000 |
| 14 | H | 4000 |
| 14 | J | 3000 |
| 32 | D | 6150 |
| 32 | M2 | 4850 |
| 32 | J | 4200 |

Intersection departures are authorized as long as the aircraft is given the distance available. Turbojet aircraft weighing more than 12,500 lbs are not permitted to make intersection departures on runway 32.

### Local Control

*Source: IND SOP 6 Local Control > Area of Responsibility*

- Local control is responsible for all runways designated active and must authorize all crossings of active runways. The area of responsibility depends on configuration. Area A is the "high" side (SFC-30); Area B is the "low" side (SFC-15).
- When split, LCE is responsible for runway 5R/23L and LCW for runway 5L/23R.
- When in a runway 14 or 32 configuration, LC must be combined.

### Coordination with TRACON

*Source: IND SOP 6 Local Control > Coordination with TRACON*

- All IFR departures are automatically released provided they are assigned a heading from the table above. Departures landing within IND TRACON (EYE, HFY, BAK, AID, MIE, TYQ, MQJ airports) require a verbal release prior to departure. Unless coordinated otherwise, the headings may be used for IFR or VFR departures.
- Reduced longitudinal separation of 2.5nm within 10nm is authorized for arrivals to runway 5R/23L, provided the runway turnoffs are visible from the tower.
- Assign all go-arounds and missed approaches runway heading and 3000'. Immediately coordinate with the affected radar controller (DR or FN) for a more situationally appropriate instruction before handing the aircraft off.

### Line up and wait

*Source: IND SOP 6 Local Control > Line Up and Wait (LUAW)*

- LUAW is authorized between sunset and sunrise at these intersections only: runway 23L at C2 or D2; runway 23R at A2 or B2; any runway at full length.

### Satellite airport operations - Block EYE and Block 2R2

*Source: IND SOP 6 Local Control > Satellite Airport Operations*

- Block EYE ("Block Eagle Creek") is requested by TRACON to protect IFR arrivals and departures at EYE. When activated, assign departure headings that will not penetrate the protected area (diagram: block_eye.png). Runway heading off runway 5L and approaches to runway 23R are authorized. Phraseology: "Block Eagle Creek" / "Cancel Eagle Creek Block".
- Block 2R2 is requested by TRACON to protect IFR arrivals and departures at 2R2. When activated, assign headings that will not penetrate the protected area (diagram: block_2r2.png). Runway heading off runway 23R and 32, and approaches to runway 5L and 14, are authorized.
- All VFR aircraft landing EYE, 2R2 and HFY shall be retained with LC until clear of the Class C surface area, then terminated and transferred to advisory. Do not hand off to TRACON unless coordinated.

## 7. Approach control

IND SOP 7. Handoffs to and from other facilities, scratchpads, PAC-P.

### Departures - handoffs to other facilities

*Source: IND SOP 7 Approach Control > Departures*

| Route | To | Altitude | Notes |
| --- | --- | --- | --- |
| North (MEARZ#) | ZAU | Climbing 13000 |  |
| South (DAWNN#) | ZID (SHB 34) | Climbing 13000 | IND may clear direct DAWNN |
| East (MAREO#) | ZID (MIE 33) | Climbing 13000 |  |
| West (ROCKY#) | ZID (HUF 35) | Climbing 13000 | IND may clear direct TTH |
| Southwest (OOM#) | ZID (HUF 35) | Climbing 13000 |  |

Departures from the underlying ATCTs are handed off per the AID, BAK, HBE and MIE ATCT SOPs (not pulled). IND TRACON may also reference the ICT for the full list of restrictions and handoffs (not pulled).

### Arrivals - handoffs from other facilities

*Source: IND SOP 7 Approach Control > Arrivals*

| Route | From | Altitude | Notes |
| --- | --- | --- | --- |
| GIIBS# or SCARF DECEE VHP | ZID (ABB 18) | Descend via, or SCARF @ 14000 (jet) or EASEL @ 14000 (prop) | Join by JOCKE |
| JAKKS# | ZAU | JAKKS @ 13000 (jet) or JAKKS @ 11000 (prop) | 250 KIAS when landing runway 14. INDz is responsible for notifying ZAU when runway 14 is in use (or is no longer in use). If unable STAR, clear direct VHP through the JAKKS arrival area and clear to cross 30nm NW VHP at 130 (jet) or 110 (prop). |
| KOLTS# | ZID (HUF 35) | Descend via | Join by CIRGO. When IND landing SE, ZID must assign direct VHP to cross 30nm W @ 12000' and 250 IAS |
| SMUKE# or RACYR# or RACYR DRWUD VHP | ZID (HUF 35) | Descend via, or DRWUD @ 11000 | Join by SMUKE. Non-STAR jets assigned 250 KIAS when landing NE. |
| SNKPT# or SNKPT CLANG | ZID (MIE 33) | Descend via, or SNKPT @ 14000 | Join by BABNE. |
| Landing sats via CLANG# | ZID (MIE 33) | PENDS @ 14000 |  |
| Landing BAK, MQJ, GEZ, UMP via WAMBO | CMHz | 10000 |  |
| Landing AID, MIE | FWAz | Descending 4000 |  |
| Landing IND via DECEE VHP | CVGz | 10000 | IND control for speed and turns up to 30 degrees |
| Landing IND via direct | CVGz | AOB 8000 | IND control for speed and turns up to 30 degrees |
| Landing IND sats | CVGz | AOB 8000 | IND control for descent and turns up to 30 degrees |
| Landing IND [sic: "Lanidng"] | GUSz | AOB 10000 |  |

Bold denotes primary jet flow in the wiki; the bold is lost in the saved page. IND has control from ZID for descent and control for 30 degree turns on all arrivals, except IND may only turn or descend GIIBS gate arrivals off the arrival at or below 16000.

### Overflights

*Source: IND SOP 7 Approach Control > Overflights*

| Destination | Route | From | Altitude | To | Altitude |
| --- | --- | --- | --- | --- | --- |
| CVG | CEGRM (prop) | ZID | 14000' | CVG-NAR | Descending 9000' |

### Y scratchpad - SID aircraft

*Source: IND SOP 7 Approach Control > Scratchpad Entries*

| Route | Scratchpad |
| --- | --- |
| MEARZ# BVT | BVT |
| MEARZ# BRATN<br>MEARZ# MZZ | MZZ |
| MEARZ# CLLRK | OKK |
| DAWNN# | DAW |
| OOM# | OOM |
| ROCKY# | ROC |

The SOP table has no MAREO# row; the vNAS record has MAREO# -> MAR. Listed under the disagreements.

### Y scratchpad - non-SID aircraft

*Source: IND SOP 7 Approach Control > Scratchpad Entries*

| Route | Scratchpad letter |
| --- | --- |
| BVT | B |
| MZZ | Z |
| OKK | K |
| DAWNN<br>MYS<br>IIU | S |
| OOM | P |
| DQN<br>ROD<br>SHB | E |
| CVG | H |
| TTH | W |

Non-SID aircraft take the format A### using the letter above and the requested altitude in hundreds.

### Arrival runway assignment and satellite SVFR

*Source: IND SOP 7 Approach Control > Arrivals*

- Assign runways for arrivals based on parking position when traffic is light. In high volume the following is a guide (FRB and FRD should use discretion): JAKKS, KOLTS, SMUKE/RACYR - 5L/23R; GIIBS, SNKPT - 5R/23L.
- BAK is authorized to provide SVFR AOB 2500'. BAK must notify IND when SVFR operations are in progress (and when terminated). When IND provides BAK with IFR arrival information, BAK must terminate SVFR or coordinate with IND.
- MIE may conduct SVFR at or below 2500'. MIE is responsible for notifying IND while SVFR is in progress. While SVFR is in progress IND may not issue an approach clearance or descend a MIE arrival below 3000'.

### Flowed arrivals

*Source: IND SOP 7 Approach Control > Flowed Arrivals*

- Flowed arrivals take an aircraft from one runway to another for traffic balancing (ex. an aircraft on the SNKPT directed to runway 5L, where it crosses into FRB's airspace).
- Arrivals must have the landing runway in the Y-scratchpad.
- Aircraft flowed into the other feeder's sector require a pointout or handoff as soon as the need or request for the flow is made to the other feeder controller.
- Verbal coordination must occur between FRB and FRD to determine an altitude to descend the aircraft and any other information.

### Scratchpad: the delta

*Source: IND SOP 7 Approach Control > Scratchpad Entries*

- IFR departures have the scratchpad entries above inserted automatically in the Y scratchpad.
- Aircraft entering the TRACON on a non-RNAV STAR, via radar vectors, or on an RNAV STAR but vectored off the arrival, shall have the delta symbol in the Y-plus scratchpad as a reminder and notice to other controllers.

### Pre-arranged coordination (PAC-P)

*Source: IND SOP 7 Approach Control > Pre-Arranged Coordination Procedures (PAC-P)*

- PAC-P allows authorized users to enter from externally (above or below) and transition through FR/FN airspace, and to exit from within and transition out of FR/FN airspace.
- Authorized users: DRE and DRW, voluntarily. DRE may climb or descend, but not level, tagged aircraft without coordination through/within FRD/FNF airspace. DRW may do the same through/within FRB/FNI airspace.
- Use restrictions: DR shall quicklook all FR/FN positions where PAC-P is used; send a STARS automated pointout to the sector whose airspace is penetrated before using it; and provide lateral or vertical separation, including wake turbulence, with all STARS tagged or coordinated aircraft.
- PAC-P may be suspended by FR or FN in unusual situations.

### Special use airspace

*Source: IND SOP 7 Approach Control > Special Use Airspace*

- V53 is not procedurally separated from R3401-B. When R3401-B is active, do not permit aircraft to navigate via V53 adjacent to R3401-B at a conflicting altitude. Provide radar separation from R3401-B (the SOP writes V3401-B in the same sentence).

## 8. Satellite airports

IND SOP 7 Satellite IFR Departures.

### Satellite IFR departure instructions

*Source: IND SOP 7 Approach Control > Satellite IFR Departures*

| Airport | Sector | Instructions |
| --- | --- | --- |
| EYE | STN | Runway 3 or 21 Obstacle Departure Procedure |
| MQJ | STS | Runway 25 Obstacle Departure Procedure |
| BAK | STS | When R3401 is active: runway 23, heading 180 counterclockwise 360; runway 32, heading 360 clockwise 180 |

If an airport is not covered by this table, climb-out instructions must be coordinated individually with the controller responsible for that airport. Assign all satellite departures an initial altitude of 3000.

### Airports within the IND TRACON

*Source: IND SOP 7 Approach Control > Satellite IFR Departures*

- Primary: Indianapolis (IND).
- Secondary - all require verbal release of IFR traffic: Hendricks Co-Gordon Graham Field (2R2); Sheridan (5I4); Methodist Hospital of IN (81II); Indianapolis Downtown (8A4); Anderson Muni-Darlington Field (AID); Columbus Muni (BAK); Crawfordsville Rgnl (CFJ); Eagle Creek Airpark (EYE); Shelbyville Muni (GEZ); Putnam Co Rgnl (GPC); Himsel AAF (HBE); Indy South Greenwood (HFY); Greensburg Muni (I34); Alexandria (I99); Decatur Co Meml Hospital (IN35); Ball Meml Hospital (IN74); IU Health Morgan (IN84); Delaware Co Rgnl (MIE); North Vernon (OVO); Indianapolis Rgnl (MQJ); Indianapolis Exec (TYQ); Indianapolis Metro (UMP); New Castle Henry Co Marlatt Field (UWL).
- The SOP marks operating control towers in bold; the bold is lost in the saved page. The vNAS record lists towers at AID, BAK, HBE and MIE.

The vNAS area lists the same 24 identifiers as underlying airports (24 including IND).

### Releasing runway 25 at MQJ

*Source: IND SOP 7 Approach Control > Satellite IFR Departures*

- Phraseology: "Depart via the Indianapolis Regional Runway 25 departure procedure, when able fly heading/proceed direct..."
- Before issuing a release from runway 25 at MQJ: initiate a track over MQJ; point the track out to FNF (F*< Slew >); when FNF accepts the pointout, the FNF controller must block their airspace within 8nm of MQJ at or below 3000; once FNF accepts, the aircraft may be released.
- Once the aircraft is airborne and clear of the 8nm / 3000 block, FNF automatically cancels the block.

## 9. Inter-facility coordination

IND SOP 8. The LOA content is in the SOP; no separate LOA documents were found.

### IND and CMH

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CMH to IND | BAK, MQJ, GEZ, UMP | WAMBO | 10000 (from CMHz) |  |

### IND and CVG

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to CVG | CVG | All | 5000 or 7000 (to CVGz) | CVG control for turns up to 30 degrees |
| IND to CVG | CVG sats | All | AOB 7000 (to CVGz) | CVG control for descent and turns up to 30 degrees |
| CVG to IND | IND | DECEE VHP | 10000 (from CVGz) | IND control for speed and turns up to 30 degrees |
| CVG to IND | IND | Direct | AOB 8000 (from CVGz) |  |
| CVG to IND | IND sats | All | AOB 8000 (from CVGz) | IND control for descent and turns up to 30 degrees |

### IND and FWA

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to FWA | HHG, PLD | All | Descending 5000 (to FWAz) |  |
| FWA to IND | AID, MIE | All | Descending 4000 (from FWAz) |  |

### IND and GUS

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| GUS to IND | IND | All | AOB 10000 (from GUSz) |  |

### IND and HUF

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to HUF | BMG | All | 4000, 5000 or 6000 (to HUFz) | Correct altitude for DOF |

### IND and SDF

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF to IND | IND, BAK, BMG, GEZ, HBE, HFY, SER, I34 | Direct | AOB 9000 (from SDFz) | IND control for descent and 30 degree turns |
| SDF to IND | OVO | Direct destination or direct NURBY (RNAV 5) | 4000 (from SDFz) | IND control for descent and turns |
| IND to SDF | SDF, BFR, FRH, IMS, JVY, SER, LOU | Direct | AOB 9000 (to SDFz) | SDF control for descent and 30 degree turns |

### Inter-facility rules

*Source: IND SOP 8 Inter-Facility Coordination*

- Both IND and SDF release control for turns up to 30 degrees on contact.
- For SER RNAV 14 or RNAV 23 arrivals, IND must coordinate with SDF to block the airspace (including for the published missed). IND must provide the SDF frequency for missed approach or IFR cancellation; SDF must advise IND of the cancellation when received.
- If the JPG MOA and/or the RACER MOA is active, each facility must issue aircraft a heading to remain West of the lateral boundary of the MOA(s). This heading does not need to be coordinated.
- INDz must advise ZAU when landing runway 14, for ZAU to apply 250 KIAS to JAKKS# arrivals.

### Procedures with ZID

*Source: IND SOP 8 Inter-Facility Coordination*

- FWA or DAY/FFO/MGY (via RID) arrivals: ZID descends the aircraft to 14000 and hands off to IND. If traffic is a factor, IND coordinates verbally with ZID. If it is not, IND accepts and initiates a return handoff to ZID. When ZID receives the return handoff it retains communication and has control for descent to 11000, and may hand directly to FWA/CMH.
- CVG (via CEGRM#) arrivals: ZID issues a descend-via clearance and hands off to IND. If traffic is a factor, IND coordinates verbally. If not, IND accepts and returns the handoff to ZID, who retains communication and has control for descent to 13000 via descend-via, and may hand directly to CVG.
- ZID is responsible for pointing the aircraft out to adjacent facilities if necessary.

## 10. Radar sectors

IND SOP 9. Text only - the airspace diagrams for each flow are pictures.

### Noise abatement

*Source: IND SOP 9 Radar Sectors > Sector Splits*

| Type | Time (local) | Runway | Restriction |
| --- | --- | --- | --- |
| Prop | Any | Any | None |
| Jet | 0700-1900 | Any | 2500' prior to turn |
| Jet | 1900-0700 | 23L | RH, 210 or 245 until 5.5 DME |
| Jet | 1900-0700 | 23R | RH, 215 until 6.5 DME |
| Jet | 1900-0700 | Other | 2500' prior to turn |

The SOP says the following procedures "may be observed".

### Departure Radar

*Source: IND SOP 9 Radar Sectors > Sector Splits*

- The most common two-way split is east/west, in the middle between the 5L/23R and 5R/23L centerlines: DRE/DRW, FRB/FRD, FNF/FNI, STN/STS.
- DRE and DRW are the primary departure sectors for IND departures.
- DR shall have control for turns with IND departures within Area A provided: the turn does not conflict with a verbal restriction from LC; separation is ensured with the respective DR's previously departed tagged traffic; separation is ensured with a subsequent runway-heading departure off the same departure runway; and the turn is away from the extended centerline of the departure runway and transitions directly into the respective DR airspace.

### Feeder Radar

*Source: IND SOP 9 Radar Sectors*

- Feeder Radar West is the primary feeder for IND arrivals via SMUKE/RACYR, KOLTS and JAKKS.
- Feeder Radar East is the primary feeder for IND arrivals via GIIBS and SNKPT. FRD also descends CVG prop arrivals via CEGRM/SHB and hands off to STS.
- FRD shall not descend CVG terminal arrivals until they are within the lateral confines of their airspace.

### Final Radar

*Source: IND SOP 9 Radar Sectors*

- Final Radar East is responsible for the IND runway 5R/23L final approach course. Final Radar West is responsible for the runway 5L/23R final approach course.
- Between 2200 and 0600 local, jet aircraft landing runway 5L shall intercept the final approach course at or outside STDUM, and jet aircraft landing runway 5R at or outside BGTEN.
- When vectoring multiple aircraft to join the final approach course of the same or parallel runways, vertical separation must be maintained until another form of separation is established and will be maintained.
- When conducting visual approaches to parallel runways, controllers are responsible for positioning aircraft so the pilot can successfully execute the visual without overshooting the final approach course. Aircraft geographical position, performance, speed and the number of degrees of the turn to the final approach course are factors to consider before clearing a visual approach to a parallel runway.
- FN shall have control for 20 degree L/R turns and 20 knots +/- of speed adjustment on contact with all IND arrivals.
- FNI has sequencing authority.

### Satellite Radar

*Source: IND SOP 9 Radar Sectors*

- Satellite Radar North is responsible for north satellites (EYE) and low-level traffic.
- Satellite Radar South is responsible for east satellites and low-level traffic. STS also descends CVG prop arrivals via CEGRM from 10000' to 9000'.
- STN and STS are nearly always combined. They are also usually combined with DR except for satellite-heavy events.

## 11. STARS maps

IND SOP 10.

### STARS video maps (159)

*Source: IND SOP 10 STARS Maps*

Map names only. The vNAS record lists 158 map ids for this STARS facility; vNAS does not expose video-map geometry (probed 2026-09-01).

159 maps; the list is in the SOP chapter 10 and in the deck's STARS maps table.

## 12. Where the SOP and the other sources disagree

Named, not resolved.

### MAREO# scratchpad

- **A:** IND SOP 7 Scratchpad Entries: no MAREO# row in the SID table
- **B:** vNAS primaryScratchpadRules: MAREO# -> MAR
- Difference of omission. The SOP table is otherwise identical to the vNAS rules for every other row. Neither is corrected.

### Which SIDs the airport has

- **A:** IND SOP 3 IFR Departures: jets are cleared via DAWNN#, OOM#, INDY#, MAREO#, MEARZ# or ROCKY#
- **B:** CIFP 261001 at KIND: DAWNN1, MAREO1, MEARZ7 only. OOM5 and ROCKY1 are coded at KEYE, KGEZ, KHFY, KMQJ, KTYQ and KUMP; INDY is coded nowhere
- Not a contradiction - a coding gap, and the SOP names the procedures. CIFP has no runway transitions on the three it does code at KIND, so the tool cannot say which runway a SID leaves.

### Where MEARZ departures go

- **A:** IND SOP 7 Departures: North (MEARZ#) to ZAU, climbing 13000 - no sector given
- **B:** vNAS Restriction (IND to ZAU, group NORTH Gate): requesting sectors 35 and 51, owned by DRW
- The SOP names the ARTCC; the record names two ZAU sectors. Handoff ID form for a non-host ARTCC is G + sector; the tool composes G35 and G51 and says the record is the only source.

### FedEx ramp point parity

- **A:** IND SOP 4 Ramp Control prose: "During a Southwest (Runway 23) Operation, aircraft should enter the ramp at odd number points and even at odd number points"
- **B:** IND SOP 4 / 5 table: Southwest (23): exit Even, enter Odd
- As written; the sentence repeats "odd". The table is carried. A trainee should treat the table as the rule and the sentence as a typo, but that is a reading, not a correction.

### Channels printed to two decimals

- **A:** IND SOP 2 Positions: LCW 127.82, FRD 128.17, FNI 120.52
- **B:** vNAS: 127.825, 128.175, 120.525
- Truncation, not disagreement. The tool shows the full channel; a drill must voice 127.825, not 127.82.

### Coordination rows the vNAS record does not carry

- **A:** IND SOP 7 Arrivals and SOP 8: FWA to IND (AID, MIE descending 4000) and GUS to IND (IND, AOB 10000)
- **B:** vNAS Restrictions involving IND: no FWA-to-IND and no GUS-to-IND row (IND to FWA is present)
- Difference of omission; the SOP rows are carried and the adaptation may simply not restrict them.

