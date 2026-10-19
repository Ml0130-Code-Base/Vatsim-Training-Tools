# SDF SOP Reference - Louisville (SDF) ATCT SOP

Transcribed **2026-10-18** from the saved page of **Louisville (SDF) ATCT SOP** on the Indy Center wiki (`https://wiki.flyindycenter.com/docs/sdf`). Last changelog entry in the page: **2026-09-04**. **The wiki is behind a VATSIM login** - see `claude_Source_Documents_Index.md`. The SOP text itself is not committed; this file is the transcription and the cross-check.

**Citation convention.** The SOP is a wiki page with numbered chapters, not a paragraph-numbered order. A value is cited as `SDF SOP <chapter> > <heading>` - for example `SDF SOP 7 Approach Control > Arrivals`. Every table below names its own source line.

**Where a second source exists it is shown beside the SOP, never merged into it.** Second sources: the vNAS facility record for ZID (lastUpdatedAt 2026-10-17T02:35:43.475Z), CIFP 261001, and the vATIS profile (serial 2026081300). Disagreements are in the last section and are not resolved.

Pictures in the SOP (every airspace diagram) are not transcribed; they are listed in `claude_SDF_Gap_Analysis.md` Part 3.

---

## 1. Positions - two sources, checked

SOP: SDF SOP 2 Positions. vNAS: the ZID record, position callsign, frequency and TCP. **The SOP prints most channels to two decimals; vNAS carries the full 25 kHz value** (`128.175` is written `128.17`). Voice the full channel.

| Key | Position | SOP frequency | vNAS frequency | SOP STARS ID | vNAS TCP | vNAS callsign | SOP tag | Folds into | Frequency | STARS ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CD | Clearance Delivery | 126.10 | 126.100 | T | 1T | SDF_DEL | SDF CD | - | agree | agree |
| RC | UPS Ramp Control | 129.95 | 129.950 | - | - | SDF_RMP | UPS RC | - | agree |  |
| GCE | Ground Control East | 121.70 | 121.700 | T | 1T | SDF_E_GND | SDF GCE | - | agree | agree |
| GCW | Ground Control West | 119.82 | 119.825 | T | 1T | SDF_W_GND | SDF GCW | - | SOP prints two decimals | agree |
| LCE | Local Control East | 124.20 | 124.200 | T | 1T | SDF_E_TWR | SDF LCE | - | agree | agree |
| LCW | Local Control West | 135.20 | 135.200 | L | 1L | SDF_W_TWR | SDF LCW | LCE | agree | agree |
| AR1 | Arrival Radar 1 | 132.32 | 132.325 | I | 1I | SDF_I_APP | SDF AR1 | DR1 | SOP prints two decimals | agree |
| AR2 | Arrival Radar 2 | 134.15 | 134.150 | A | 1A | SDF_A_APP | SDF AR2 | DR1 | agree | agree |
| DR1 | Departure Radar 1 | 132.07 | 132.075 | D | 1D | SDF_D_APP | SDF DR1 | - | SOP prints two decimals | agree |
| DR2 | Departure Radar 2 | 123.67 | 123.675 | B | 1B | SDF_B_APP | SDF DR2 | DR1 | SOP prints two decimals | agree |
| FR1 | Final Radar 1 | 120.30 | 120.300 | W | 1W | SDF_W_APP | SDF FR1 | DR1 | agree | agree |
| FR2 | Final Radar 2 | 135.77 | 135.775 | E | 1E | SDF_E_APP | SDF FR2 | DR1 | SOP prints two decimals | agree |
| LOU_TWR | Bowman Local Control | 119.50 | 119.500 | U | 1Z | LOU_TWR | LOU LC | - | agree | CONFLICT |
| LOU_GND | Bowman Ground Control | - | 121.800 | - | - | LOU_GND |  | - | vNAS only |  |
| LOU_DEL | Bowman Clearance Delivery | - | 118.900 | - | - | LOU_DEL |  | - | vNAS only |  |
| FTK_TWR | Godman Local Control | - | 133.350 | - | - | FTK_TWR |  | - | vNAS only |  |
| FTK_GND | Godman Ground Control | - | 121.900 | - | - | FTK_GND |  | - | vNAS only |  |

"Folds into" is the vNAS consolidation hierarchy (a TCP's parent). Position keys that are vNAS callsigns are child towers or vNAS-only positions.

## 2. Fields, runways and configurations

Fields: vNAS area underlyingAirports; SDF SOP 7. Runways from CIFP 261001; magnetic variation at the primary field is west 5.0 degrees.

| Field | Name | Role | Runways | Source |
| --- | --- | --- | --- | --- |
| KSDF | Louisville Muhammad Ali Intl | primary | 11 17L 17R 29 35L 35R | vNAS area underlyingAirports; SDF SOP 7 |
| KLOU | Bowman Field | towered satellite | 6 15 24 33 | SDF SOP 7 Satellite list; vNAS child tower LOU |
| KFTK | Godman AAF (Fort Knox) | towered satellite | 15 18 33 36 | SDF SOP 7 Satellite list; vNAS child tower FTK |
| KJVY | Clark Rgnl (Jeffersonville) | satellite | 14 18 32 36 | SDF SOP 7 Satellite list |
| KBFR | Virgil I Grissom Muni (Bedford) | satellite | 6 13 24 31 | SDF SOP 7 Satellite list; SOP 8 BFR RNAV 13/31 |
| KSER | Freeman Muni (Seymour) | satellite | 5 9U 14 18U 23 27U 32 36U | SDF SOP 7 Satellite list; SOP 8 SER RNAV 14/23 |
| KIMS | Madison Muni | satellite | 3 21 | SDF SOP 7 Satellite list; SOP 8 IMS RNAV 21 |
| KBRY | Samuels Field (Bardstown) | satellite | 3 21 | SDF SOP 7 Satellite list |
| KEKX | Addington Field (Elizabethtown) | satellite | 5 23 | SDF SOP 7 Satellite list |
| KFRH | French Lick Muni | satellite | 8 26 | SDF SOP 7 Satellite list |
| 6I2 | Lebanon Springfield George Hoerter Field | satellite | 11 29 | SDF SOP 7 Satellite list |
| I93 | Breckinridge Co (Hardinsburg) | satellite | 10 28 | SDF SOP 7 Satellite list |

### Runways at the primary field (CIFP 261001)

| Field | Runway | Length x width (ft) | Magnetic bearing | ILS | Displaced threshold |
| --- | --- | --- | --- | --- | --- |
| KSDF | 11 | 7251 x 150 | 116 | no ILS record | - |
| KSDF | 17L | 8578 x 150 | 170 | IPKI 111.95 CAT I | 328 ft |
| KSDF | 17R | 11887 x 150 | 170 | ISNU 110.30 CAT I | 846 ft |
| KSDF | 29 | 7251 x 150 | 296 | ILKS 109.10 localizer only, no glide slope | - |
| KSDF | 35L | 11887 x 150 | 350 | IRLI 109.35 CAT III | 1040 ft |
| KSDF | 35R | 8578 x 150 | 350 | IJJM 110.55 CAT III | 449 ft |

Threshold-to-threshold distance computed from the two threshold coordinates on the WGS84 ellipsoid agrees with the CIFP length less displaced thresholds to within 1 ft on every strip.

### Configurations

SDF SOP names three flows (north, south, west); the vATIS profile has three presets; vNAS has seven consolidation plans (CO1 to CO7).

| Name | Landing | Departing | Notes | Source |
| --- | --- | --- | --- | --- |
| North flow (runways 35L and 35R) | 35L 35R | 35L 35R | vATIS: ILS APCH RWY 35L AND 35R. SIMUL APCHS IN USE. SMUL DEPARTURES IN USE. Runway 35R is the preferred departure runway barring an advantage for 35L (SOP 1). | SDF SOP 1, 5, 6, 9 ("North Operation", "North Flow"); vATIS preset 35L/R |
| South flow (runways 17L and 17R) | 17L 17R | 17L 17R | vATIS: ILS APCH RWY 17L AND 17R. SIMUL APCHS IN USE. SMUL DEPARTURES IN USE. Both LCE and LCW must be staffed during simultaneous independent parallel approaches. | SDF SOP 5, 6, 9 ("South Flow"); vATIS preset 17L/R |
| West flow (runway 29) | 29 | 29 | vATIS: RNAV APCH 29 IN USE. AR1/AR2 do not exist in west flow; FR cannot be split when landing 29. Runway 11 has no procedures and is used only as 29. | SDF SOP 1, 6, 9 ("Runway 29", "West Flow"); vATIS preset 29 |

The SOP gives no wind rule and no rule for choosing a flow. The tool ranks the flows by arithmetic only and picks nothing. vNAS consolidation plans: CO1 ALL TO 1D; CO2 17/35 1D/1B; CO3 17/35 1A/1D; CO4 17/35 1A/1D/1B; CO5 RWY 17/3[5] 1A/1I 1D/1B; CO6 RWY 29 SPLIT 1D/1B; CO7 ALL TO 1T (names as the record spells them).

## 3. General

SDF SOP 1. Equipment, STARS configuration, north operation, runway 11, the ATIS.

### Equipment

*Source: SDF SOP 1 General > Equipment*

- Tower Cab Display
- ASDE-X
- Departure Flight Strip Printer
- TDLS

### STARS configuration

*Source: SDF SOP 1 General > STARS Configuration*

- Has STARS: yes. Uses CWT: yes. Has ATPA: yes.
- Rundown list: LOU (TCP 1Z) sends to SDF (TCP 1D), list ID PLOU, auto acknowledge no.
- Alert and monitor TCPs: 1A, 1B, 1D, 1E, 1I, 1L, 1T, 1W, 1Z (all alert and monitor).
- Auto consolidates to the combined position: yes. TCPs must be added manually when split.
- vATIS profile: SDF ATCT.

### Operations, runway 11 and the ATIS

*Source: SDF SOP 1 General*

- North operation: runway 35R is the preferred runway for departures, barring any other operational advantage for runway 35L.
- Runway 11: no procedures exist for runway 11 arrivals or departures. For all intents and purposes runway 11 should be viewed as uni-directional (only used as runway 29).
- ATIS: SDF uses only identifiers A to M to avoid conflict with LOU (N to Z). These ranges are configured into the Louisville+ vATIS composite.

## 4. Clearance delivery

SDF SOP 3.

### IFR departures

*Source: SDF SOP 3 Clearance Delivery > IFR Departures*

| Aircraft | Via | Altitude | Expect | Notes |
| --- | --- | --- | --- | --- |
| Jet | RNAV SID | Climb via SID | n/a | Clear all PBN capable jets AOA 14000 via a SID |
| Jet | No SID | 5000' | 10 minutes after | Clear all non-PBN capable jets AOA 14000 via an initial route per the gate table |
| Prop | No SID | 3000 | 10 minutes after | Clear all props AOA 14000 via an initial route per the gate table |

It is preferred that jet aircraft be assigned an RNAV SID, if capable (changelog 2025-02-14).

### Departure gates, RNAV SIDs and non-SID routes

*Source: SDF SOP 3 Clearance Delivery > IFR Departures*

| Direction | RNAV SID (jet) | RNAV SID transitions | Non-SID (jet or prop) |
| --- | --- | --- | --- |
| North | RDHSE# | RDHSE<br>JIBKA | HNNAN RDHSE or IIU V171 HONOS (non-RNAV) |
| North | SPILR# | BNGIN | SPILR BNGIN or IIU V53 STREP (non-RNAV) |
| Southeast | LOKRD# | CNTRY<br>BILET | LOKRD BILET or IIU V51 LVT (non-RNAV) |
| Southeast | EEVAA# | SHIPR<br>CHALI | EEVAA CHALI or IIU V171 CHALI (non-RNAV) |
| Southwest | HIDEY# | RAMRD | HIDEY RAMRD or EWO (non-RNAV) |
| West | GTGON# | APALO<br>TERGE | GTGON APALO or IIU V4 APALO (non-RNAV) |
| West | LLIZY# | GUMMI<br>DAAVE | LLIZY GUMMI or IIU V512 SACKO (non-RNAV) |

### Departure frequency

*Source: SDF SOP 3 Clearance Delivery > IFR Departures*

| SID or departure gate | General direction | Frequency |
| --- | --- | --- |
| GTGON, HIDEY, LLIZY, RDHSE | West of 17L/35R centerline | 123.67 (DR2) |
| EEVAA, LOKRD, SPILR | East of 17L/35R centerline | 132.07 (DR1) |

All SIDs have a published departure frequency of 132.07 (DR1). GTGON, HIDEY, LLIZY and RDHSE must be manually assigned 123.67 (DR2) when DR is split (changelog 2026-09-04). The vNAS TDLS defaults are shown beside this on the vNAS record.

### VFR departures

*Source: SDF SOP 3 Clearance Delivery > VFR Departures*

| Aircraft type | Altitude | Departure frequency | Beacon code? |
| --- | --- | --- | --- |
| Jet | At or below 4500' | 132.07 (East)<br>123.67 (West) | Yes |
| Prop | At or below 2500' | 132.07 (East)<br>123.67 (West) | Yes |

### Route and altitude restrictions

*Source: SDF SOP 3 Clearance Delivery > IFR Departures*

- Departures to EVV+, HUF+, LEX+, IND+ and CVG+ at or below 13000 (TEC).
- Aircraft requesting AOA 14000' must be cleared via a route below or coordinated with an overlying controller (if online).

### VFR departure flight plans

*Source: SDF SOP 3 Clearance Delivery > VFR Departures*

- Enter every VFR request into the flight plan editor with at least: aircraft type (ex. C172); requested altitude in hundreds of feet prefixed VFR/ (ex. VFR/045); departure airport (KSDF) and destination if specified (ex. KLEX); direction of flight in the remarks if the destination is not specified (ex. East); and FF in the remarks if flight following is requested.
- Aircraft remaining in the pattern do not require a clearance, nor should they be assigned a beacon code. A handwritten strip may be used to track them.
- Phraseology: "N6974V, maintain VFR at or below 2500', departure frequency 132.07, squawk 1234."

### TDLS procedures

*Source: SDF SOP 3 Clearance Delivery > TDLS Procedures*

- PDC/CPDLC equipped aircraft should be issued their clearance via TDLS/PDC. This generally includes all airliners (other than legacy carriers such as PanAm) but not most general aviation or charter operators.
- TDLS is configured to give the pilot the most up-to-date information for their SID. If desired or required for an event, the local information (ex. CTC CD PRIOR TO PUSH) and the departure frequency (normally updated through the temporary frequency function) may need to be selected manually.

### Coordination with Ground

*Source: SDF SOP 3 Clearance Delivery > Coordination with Ground*

- Instruct aircraft at the air carrier ramp or FBO to contact ground control when ready for taxi.
- When UPS ramp control is open (typically during events): select the RAMP OPEN flag/NOTAM in the ATIS and instruct all aircraft at the UPS ramp to contact ramp control for pushback.
- When ramp control is closed (normal operations): select the RAMP CLOSED flag/NOTAM in the ATIS and instruct all aircraft to contact ground control when ready for taxi.
- Once an aircraft has read back its clearance, mark the strip in accordance with the ATC Handbook and push the flight strip to ground control.

## 5. Ground and ramp control

SDF SOP 4 and 5.

### Preferred departure runway by SID

*Source: SDF SOP 5 Ground Control > Runway Assignment*

| SID or fix | North flow | South flow |
| --- | --- | --- |
| GTGON, HIDEY, LLIZY, RDHSE | 35L | 17R |
| EEVAA, LOKRD, SPILR | 35R | 17L |

Used during busy periods (events) unless operational need exists. If cleared via a route not in the table, assign a runway most consistent with direction of flight (ex. a westbound departure is assigned runway 35L/17R).

### UPS Ramp Control

*Source: SDF SOP 4 UPS Ramp Control*

- UPS Ramp Control controls the flow of traffic into and out of the UPS ramps. It is a company-run position that is sometimes open for large events. It does not receive flight strips or have access to ASDE-X or STARS; it has only what aircraft tell it and a Tower Cab display.
- Departures: aircraft at the UPS ramp must contact ramp control for pushback clearance. If unable to give one immediately, tell the aircraft the reason: "UPS1234, pushback approved." / "UPS987, standby, inbound traffic."
- When aircraft request taxi, instruct them to proceed to the spot at the top of the alley and contact ground control: "UPS354, taxi to spot 5, contact Ground 121.7."
- Because of the proximity of Ramps 1 and 2 to runway 11/29, limit pushback onto Ramps 1 and 2 to one aircraft per ramp at any time.
- When departing runway 29, GC will taxi aircraft departing Ramps 3, 5, 7, 9 and 11 to Spot 1 and instruct them to contact Ramp. Ramp must then taxi them to Spot 2 and instruct them to contact Ground again.
- Arrivals: when Ramp is open, aircraft contact Ramp Control for entry into their ramp. GC issues instructions that bring the aircraft to the ramp but hold it short of the taxiway to enter (ex. C short of B5 for a Ramp 3 entry). When there is room, instruct the aircraft to enter and taxi to parking: "UPS124, enter at Ramp 5, taxi to parking."

### Ground Control

*Source: SDF SOP 5 Ground Control*

- Runway 11/29 is delegated to ground control when not in use. When in use (as advertised in the ATIS) it is delegated to local control, and all crossings of runway 11/29 must be verbally coordinated between LC and GC.
- Pushback: the terminal ramp is uncontrolled; inform aircraft that pushback is at their discretion and to advise ready for taxi.
- Aircraft departing Ramp 23 (west of taxiway A near A4) may not have room to push back on the ramp and may need to push onto A. If an aircraft requests pushback from Ramp 23, instruct it to push back and reference the North or South exit (the two taxiways that give access to and from the ramp) and, optionally, a direction to face on A: "UPS124, pushback onto A approved, South exit, face North."
- All runway crossings must be coordinated unless runway 11/29 is inactive. Eastbound turbojet aircraft exiting UPS ramps 1, 3, 5, 7, 9 and 11 may be taxied to 35L to avoid excessive taxi times.
- Runways 17L and 35R have Precision Obstacle Free Zones that must be protected for aircraft landing those runways; taxiways K and D have red-and-white APCH signs and markings. Hold aircraft short of the POFZ when the reported weather is below an 800' ceiling or 2 miles visibility. If it is not possible to clear the POFZ before an arriving aircraft reaches a point 2nm from the threshold when the weather is below 800/2, the arriving aircraft must be instructed to go around.
- Runway 11/29 has a protected runway surface area on taxiway A which must be protected while runway 11/29 is used for takeoff or landing. Treat it as an extension of the runway: "UPS123, hold short of runway 11 approach".
- B748 aircraft have reduced wingspan clearances. For VATSIM purposes, allow B748 aircraft to taxi on restricted routes as long as no other B748 is on the adjacent taxiway(s) or runway(s). Permitted, restricted and prohibited routes are depicted in a diagram (b748_taxi_restrictions.svg).

### Runway assignment

*Source: SDF SOP 5 Ground Control > Runway Assignment*

- In low volume in a south operation, assign a runway most consistent with direction of flight and parking location.
- In a north operation, unless pilots declare an operational need for runway 35L, or 35L is deemed operationally advantageous by ATC, departing turbojets should be assigned runway 35R regardless of direction of flight. If three or more aircraft are taxiing to 35R, succeeding departures may be taxied to 35L. Westbound turbojets exiting UPS ramps 1, 3, 5, 7, 9 and 11 may be taxied to 35L (agreed to avoid excessive taxi times).

### Multiple runway crossings authorized

*Source: SDF SOP 5 Ground Control > Taxi Procedures*

- Runway 17R/35L at G and runway 11/29 at F3
- Runway 17R/35L at F and runway 11/29 at B
- Runway 17R/35L at F and runway 11/29 at C
- Runway 17R/35L at F and runway 11/29 at E
- Runway 17L/35R at G and runway 11/29 at D
- Runway 11/29 at G1 and runway 17L/35R at F
- Runway 17L/35R at F and runway 11/29 at D
- Runway 17L/35R at G and runway 11/29 at E

### Coordination with Ramp, Local and the GCW position

*Source: SDF SOP 5 Ground Control*

- Ramp: departures are instructed to contact GC at the appropriate spot; arrivals contact Ramp Control for entry, with GC holding them short of the entry taxiway.
- Local: when a departure is approaching the runway, instruct it to monitor local control and push local control its flight strip. If a runup is needed, have the aircraft advise runup complete first, then monitor local and push the strip.
- Aircraft departing runway 11 should be told to contact/monitor tower while holding short of runway 17R/35L at F/G. Local may issue the crossing and the takeoff clearance or LUAW in the same sentence: "UPS123, cross Runway 17R at F, Runway 11 cleared for takeoff."
- When the destination ramp is immediately adjacent to the point where an arrival exits the runway, LC may instruct the arrival to taxi to the ramp and monitor ground. If any conflict exists, LC must coordinate with GC or resolve it.
- Ground Control West (GCW) is a special event position, in real life opened only around the Kentucky Derby but used for other events on VATSIM. It is an assist position - coordination, organizing flight strips - and is normally delegated no movement areas, though it may be case by case.

## 6. Local control

SDF SOP 6. Headings by flow, initial waypoints, intersections.

### Departure headings - north flow

*Source: SDF SOP 6 Local Control > Coordination with TRACON*

| Runway | SID or fix | Prop heading | Non-SID jet heading |
| --- | --- | --- | --- |
| 35L | LLIZY, GTGON, HIDEY | 290 | 330 |
| 35L | RDHSE | 290 through 330 | 330 |
| 35L | SPILR | 330 through 010 | 330 |
| 35L | EEVAA, LOKRD | 010 | 330 |
| 35R | LLIZY, GTGON, HIDEY | 290 | RH |
| 35R | RDHSE | 290 through 330 | RH |
| 35R | SPILR | 330 through 010 | RH |
| 35R | EEVAA, LOKRD | 010 | RH |

### Departure headings - south flow

*Source: SDF SOP 6 Local Control > Coordination with TRACON*

| Runway | SID or fix | Prop heading | Non-SID jet heading |
| --- | --- | --- | --- |
| 17R | SPILR, RDHSE, LLIZY, GTGON | 250 | 190 |
| 17R | HIDEY | RH through 250 | 170 or 190 |
| 17R | EEVAA, LOKRD | RH through 130 | 170 |
| 17L | SPILR | 130 | 170 |
| 17L | RDHSE, LLIZY, GTGON | 250 | 170 |
| 17L | HIDEY | RH through 250 | 170 |
| 17L | EEVAA, LOKRD | RH through 130 | 170 |

Read from the HTML table, which spans 17R over three SID groups and 17L over four; the flattened page text does not carry that structure. The 17L non-SID jet cell spans all four groups.

### Departure headings - runway 29

*Source: SDF SOP 6 Local Control > Coordination with TRACON*

| SID or fix | Prop heading | Non-SID jet heading |
| --- | --- | --- |
| LLIZY, GTGON, HIDEY, LOKRD, EEVAA | 250 | 270 |
| RDHSE, SPILR | 330 | RH |

### Initial waypoint for an RNAV SID departure

*Source: SDF SOP 6 Local Control > Coordination with TRACON*

| Runway | SID | Initial waypoint |
| --- | --- | --- |
| 17L | All | DROPA |
| 17R | GTGON, LLIZY, RDHSE, SPILR | WININ |
| 17R | HIDEY, LOKRD, EEVAA | EAZIE |
| 35L | All | RRROE |
| 35R | All | BAALK |
| 29 | All | GADSN |

### Intersection departures - distance available (ft)

*Source: SDF SOP 6 Local Control > Intersection Departures*

| Runway | Intersection | Distance available |
| --- | --- | --- |
| 17L | D6/E | 7800 |
| 17L | D5 | 6500 |
| 17L | E4 | 6300 |
| 17L | D4 | 5500 |
| 17L | E3 | 4500 |
| 17L | G | 3550 |
| 17L | 11/29 | 3050 |
| 35R | D1 | 7750 |
| 35R | D2/E2 | 6300 |
| 35R | D3 | 5350 |
| 35R | F | 5200 |
| 35R | 11/29 | 4700 |
| 35R | G | 4200 |
| 35R | E3 | 3250 |
| 17R | B7 | 9650 |
| 17R | G | 8650 |
| 17R | 11/29 | 8150 |
| 17R | F | 7700 |
| 17R | A6/B6 | 6500 |
| 17R | A5/B5 | 5500 |
| 17R | A4/B4 | 4050 |
| 35L | B1 | 9650 |
| 35L | A2/B2 | 8100 |
| 35L | A3/B3 | 7650 |
| 35L | A4/B4 | 5750 |
| 35L | A5/B5 | 4350 |
| 35L | A6/B6 | 3350 |
| 11 | 17R/35L | 6950 |
| 11 | B | 6400 |
| 11 | C | 6050 |
| 11 | G3 | 5400 |
| 11 | N | 3800 |
| 29 | E | 6900 |
| 29 | 17L/35R | 6300 |
| 29 | D | 5750 |
| 29 | G2 | 5050 |
| 29 | N | 3400 |

Intersection departures are authorized for non-jet aircraft; give the aircraft the distance available. Aircraft departing runway 17L at E and runway 35R at E2 are considered intersection departures.

### Local Control

*Source: SDF SOP 6 Local Control > Area of Responsibility*

- Local control is responsible for all runways designated active and must authorize all crossings of active runways. The airspace delegated to LC is depicted in a diagram (lc_airspace.png).
- Both LCE and LCW must be staffed while simultaneous independent parallel approaches are in progress.
- LCE/LCW must coordinate with the adjacent LC (if open) before issuing a takeoff clearance to an aircraft that will eventually enter the DR airspace associated with the adjacent local controller (ex. runway 17L to the west). This includes a departure from a runway not aligned with the primary departure flow (ex. runway 17L via GTGON).

### Coordination with TRACON

*Source: SDF SOP 6 Local Control > Coordination with TRACON*

- IFR departures are automatically released provided they are on a SID or, if not, assigned a heading from the tables above. Departures landing within SDF TRACON (LOU airport) require a verbal release prior to departure. Departures assigned a heading that will take them through the adjacent LC airspace require a release.
- Jets cleared via an RNAV SID must be advised of the initial waypoint in the takeoff clearance: "RNAV to (fix), Runway (runway), cleared for takeoff."
- Assign all go-arounds and missed approaches a departure heading from the tables above and 3000'. Ensure headings provide diverging separation from departures on the adjacent runway (ex. a runway 17R departure should not be assigned 170 if another aircraft is departing 17L). All go-arounds and missed approaches must be verbally coordinated with Departure Radar.

### Line up and wait, and runway changes

*Source: SDF SOP 6 Local Control*

- LUAW operations are authorized only at the normal departure points of runway 17R (taxiways A and B) and runway 35L (taxiways A and B), or any runway from full length, during periods from sunrise to sunset.
- The wake turbulence time requirement for intersection departures does not apply to runway 17L at E: this intersection is less than 500' from the 17L departure point.
- Runway changes: LC may change the landing runway of an arriving aircraft without coordination with FR provided the aircraft is less than 5nm from the runway; visual separation is provided between all aircraft; appropriate action is taken with succeeding aircraft making visual approaches; and coordination is taken with the adjacent LC for aircraft changed to their runway.

## 7. Approach control

SDF SOP 7.

### Departures - handoffs to ZID

*Source: SDF SOP 7 Approach Control > Departures*

| Route | To | Altitude | Notes |
| --- | --- | --- | --- |
| North (RDHSE, SPILR) | ZID (ABB 18) | Climbing 13000 | SDF may clear no further than direct RDHSE, BNGIN. ZID control for turns AOA 10000. |
| South (HIDEY) | ZID (EWO 19) | Climbing 13000 | SDF may clear no further than direct HIDEY. ZID control for turns AOA 12000. |
| East (EEVAA, LOKRD) | ZID (LOZ 21) | Climbing 13000 | SDF may clear no further than direct CHALI, LOKRD. ZID control for turns AOA 10000. |
| West (GTGON, LLIZY) | ZID (EVV 17) | Climbing 13000 | SDF may clear no further than direct GTGON or LLIZY. ZID control for turns AOA 12000. |

Departures on an RNAV SID are told "climb via SID", which authorizes 13000 while meeting the altitude restrictions that keep them clear of arrivals. "Climb and maintain 13000" is permitted but the controller must watch separation from arrivals. Departures filed below 13000 are cleared on course, climbing to the filed altitude, and may be handed to a neighboring ATCT instead of ZID. Departures from the LOU and FTK ATCTs are handed off per their own SOPs (not pulled).

### Arrivals - handoffs from ZID (aircraft AOA 14000)

*Source: SDF SOP 7 Approach Control > Arrivals*

| Destination | Route | From | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF+ | DLAMP# or ANCHR DLAMP IIU | ZID (CVG 22) | Descend via, or DLAMP @ 14000/280 IAS | Jet only. Join by DLAMP. SDF control for right turns at DLAMP. |
| SDF+ | JMONY# or GDAYE JMONY IIU | ZID (HUF 35) | Descend via, or JMONY @ 14000/280 IAS | Jet only. Join by LISZA. SDF control for left turns at LISZA. |
| SDF+ | LEDDL# or COBBZ LEDDL IIU | ZID (LOZ 21) | Descend via, or LEDDL @ 14000/280 IAS | Jet only. Join by COBBZ. SDF control for left turns at COBBZ. |
| SDF+ | MBELL# or JIINN MBELL IIU | ZID (EVV 17) | Descend via, or MBELL @ 14000/280 IAS | Jet only. Join by JIINN. SDF control for left turns at JIINN. |
| SDF+ | All via EWO sector | ZID (EWO 19, LOZ 21) | AOB 10000 | SDF control for turns and descent. |

Bold denotes primary jet flow in the wiki; the bold is lost in the saved page.

### Overflights

*Source: SDF SOP 7 Approach Control > Overflights*

| Destination | Route | From | Altitude | To | Altitude | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| LEX | BUSSN or FEDRA | ZID | IIU@140 | LEXz | 110 | ZID may clear direct BUSSN. SDF may clear direct destination |

### Y scratchpad - RNAV SID and non-RNAV routes

*Source: SDF SOP 7 Approach Control > Scratchpad Entries*

| RNAV SID route | Scratchpad | Non-RNAV route | Scratchpad |
| --- | --- | --- | --- |
| EEVAA# | EVA | EEVAA CHALI | CHL |
| GTGON# | GTN | GTGON APALO | APA |
| HIDEY# | HDY | HIDEY RAMRD | RMD |
| LLIZY# | LZY | LLIZY GUMMI | GUM |
| LOKRD# | LKD | LOKRD BILET | BLT |
| RDHSE# | RDH | HNNAN RDHSE | HAN |
| SPILR# | SPL | SPILR BNGIN | BNG |

Departures not cleared via one of these routes (such as IIU V4 CHALI) have nothing inserted in the Y+ scratchpad automatically. Aircraft entering the TRACON via radar vectors, or on an RNAV STAR but vectored off it, shall have the delta symbol in the Y-plus scratchpad as a reminder and notice to other controllers.

### Special use airspace within SDF

*Source: SDF SOP 7 Approach Control > Special Use Airspace*

| Name | Altitude | Notes |
| --- | --- | --- |
| R3704 | not stated | When active at or above 4000', runway 17R non-RNAV SID departures must not be assigned a heading of 190. The radar controller is responsible for notifying LC. |
| R3403 | not stated | ZID is the controlling agency. |
| JPG | not stated | Advise non-participating VFR aircraft of status. ZID is the controlling agency. |

Provide radar separation of 3 miles lateral or 500 feet vertical from special use airspace except as stated.

### Arrival runway assignment

*Source: SDF SOP 7 Approach Control > Arrivals*

- Assign runways based on parking position when traffic is light. In high volume (events) it becomes increasingly complex to flow arrivals entering a downwind to the other runway, generally requiring verbal coordination; AR1 and AR2 should use discretion. A guide: DLAMP, LEDDL - 17L/35R; JMONY, MBELL - 17R/35L.
- The short side (ex. MBELL runway 35 flow) is the easiest to balance to the other runway; those arrivals have RNAV transitions that feed directly onto the FAC.

### Flowed arrivals

*Source: SDF SOP 7 Approach Control > Flowed Arrivals*

- Flowed arrivals take an aircraft from one complex to another for traffic balancing (ex. an aircraft on the DLAMP directed to runway 35L) by placing it into the opposite downwind.
- Arrivals must have the landing runway in the Y-scratchpad.
- Jet aircraft from the west (JMONY, MBELL) must be flowed at 6000 or 7000. Jet aircraft from the east (DLAMP, LEDDL) must be flowed at 8000 or 9000.
- The receiving controller (AR1/AR2) has control for turns toward their airspace within 15nm of SDF, and for speed adjustments on contact, but may not slow the aircraft below 210 KIAS until within 15nm of SDF unless coordinated.
- The transferring controller is responsible for assigning the new runway, and (whoever initially handles the aircraft) must issue an automated pointout to DR1 and DR2 even though the aircraft will not enter their sector.
- When flowed arrival procedures are in use, the controller initiating the flow must coordinate with DR1/DR2/LCE/LCW to restrict departures to 5000' initially.

### Pre-arranged coordination (PAC-P)

*Source: SDF SOP 7 Approach Control > Pre-Arranged Coordination Procedures (PAC-P)*

- A PAC-P is a standardized procedure by which one controller allows an aircraft to penetrate or transit another's airspace in a manner that assures standard separation without individual coordination of each aircraft.
- DR1/DR2 is authorized to use PAC-P in the areas depicted on the individual sector diagrams and within the altitudes specified there. DR1/DR2 must quicklook arrivals while using PAC-P, and must provide separation, including wake turbulence, between PAC-P aircraft and all aircraft under AR1/AR2 control while within PAC-P airspace.
- Aircraft must not be leveled in the arrival controller's airspace without coordination. Visual separation must not be used with PAC-P.

## 8. Satellite airports

SDF SOP 7.

### Airports within the SDF TRACON

*Source: SDF SOP 7 Approach Control > Satellite IFR Departures*

- Primary: Louisville Muhammad Ali (SDF).
- Secondary - all require verbal release of IFR traffic: Lebanon Springfield George Hoerter Field (6I2); Virgil I Grissom Muni, Bedford (BFR); Samuels Field, Bardstown (BRY); Addington Field, Elizabethtown (EKX); French Lick Muni (FRH); Goodman AAF, Fort Knox (FTK); Breckinridge Co, Hardinsburg (I93); Madison Muni (IMS); Clark Rgnl, Jeffersonville (JVY); Bowman Field, Louisville (LOU); Freeman Muni, Seymour (SER).
- The SOP marks operating control towers in bold; the bold is lost in the saved page. The vNAS record lists towers at LOU and FTK.
- Climb-out instructions must be individually coordinated with the controller responsible for each airport.

The vNAS area lists the same twelve identifiers (including SDF).

## 9. Inter-facility coordination

SDF SOP 8. The LOA content is in the SOP; no separate LOA documents were found.

### SDF and CVG

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF to CVG | CVG | Direct | AOB 9000 (to CVGz) |  |
| SDF to CVG | CVG sats | Direct or filed | AOB 9000 (to CVGz) |  |
| CVG to SDF | SDF+ jet | DLAMP | At 10000 (from CVGz) |  |
| CVG to SDF | SDF+ prop | Direct | AOB 8000 (from CVGz) |  |

### SDF and EVV

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| EVV to SDF | SDF, LOU, JVY, BFR, EKX, FTK, IMS, SER | Direct | AOB 9000 (from EVVz) |  |
| EVV to SDF | Aircraft not landing in SDF | Any | AOB 11000 (from EVVz) | To prevent conflict with arrivals and departures |
| SDF to EVV | HNB, TEL, KY8 | Direct | Descending 4000 (to EVVz) |  |
| SDF to EVV | EVV, OWB | Direct | Any (to EVVz) |  |

### SDF and HUF

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| HUF to SDF | SDF, LOU, JVY, BFR, EKX, FTK, IMS, SER | Direct | AOB 9000 (from HUFz) |  |
| HUF to SDF | Aircraft not landing in SDF | Any | AOB 11000 (from HUFz) | To prevent conflict with arrivals and departures |
| SDF to HUF | BMG | Direct | AOB 5000 (to HUFz) |  |
| SDF to HUF | HUF, RSV, SIV | Direct | AOB 10000 (to HUFz) |  |

### SDF and IND

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to SDF | SDF, BFR, FRH, IMS, JVY, SER, LOU | Direct | AOB 9000 (from INDz) | SDF control for descent and 30 degree turns |
| SDF to IND | IND, BAK, BMG, GEZ, HBE, HFY, SER, I34 | Direct | AOB 9000 (to INDz) | IND control for descent and 30 degree turns |
| SDF to IND | OVO | Direct destination or direct NURBY (RNAV 5) | 4000 (to INDz) | IND control for descent and turns |

### SDF and LEX

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF to LEX | LEX | BUSSN or FEDRA | 11000 (to LEXz) | LEX control for right turns up to 10 degrees and descent |
| SDF to LEX | LEX | Direct | AOB 9000 (to LEXz) |  |
| SDF to LEX | FFT | Direct | Descending 5000 (to LEXz) |  |
| SDF to LEX | LEX sats | Direct | AOB 9000 (to LEXz) |  |
| LEX to SDF | SDF, LOU, JVY, IMS, BRY, BFR, SER, 6I2, FTK, EKX | Direct or filed | AOB 8000 (from LEXz) |  |

### Inter-facility rules

*Source: SDF SOP 8 Inter-Facility Coordination*

- CVG, EVV, HUF and IND each release control for turns up to 30 degrees on contact with SDF, and, if landing within their respective airspace, descent on contact (IND: turns only). LEX releases control for turns up to 30 degrees and descent on contact.
- CVGz must point out IMS RNAV runway 21 arrivals to SDFz and verbally coordinate issuing the approach clearance and IFR cancellation.
- For BFR RNAV 13 or RNAV 31 arrivals, the controller issuing the approach clearance must coordinate with the other controller (SDF/HUF) to block the airspace (including for the published missed) and must advise the other controller of IFR cancellation.
- For SER RNAV 14 or RNAV 23 arrivals, IND must coordinate with SDF to block the airspace (including for the published missed), provide the SDF frequency for missed approach or IFR cancellation, and SDF must advise IND of the cancellation when received.
- If the JPG MOA and/or the RACER MOA is active, each facility must issue aircraft a heading to remain West of the lateral boundary of the MOA(s). This heading does not need to be coordinated.
- Arrivals, overflights and departures are handed off via the sections above.

## 10. Radar sectors

SDF SOP 9. Text only - the airspace diagrams for each flow are pictures.

### Departure Radar

*Source: SDF SOP 9 Radar Sectors > Sector Splits*

- The most common two-way split is east/west, in the middle between the 17L/35R and 17R/35L centerlines. For events, more complex splits are required and are generally dictated by the events team.
- In a West flow AR1/AR2 are not delegated any airspace and only DR1, DR2, FR1 and FR2 may be opened.
- DR1 is normally responsible for east SDF departures (via EEVAA and LOKRD in runway 17/35 flow; via RDHSE and SPILR in runway 29 flow).
- DR2 is normally responsible for west SDF departures (via GTGON, HIDEY, LLIZY, RDHSE and SPILR in runway 17/35 flow; via EEVAA, GTGON, HIDEY, LLIZY and LOKRD in runway 29 flow).
- After a handoff has been accomplished, DR releases control to all other sectors when a climb or descent is required for satellite arrivals and departures. DR releases control for satellite arrivals via RNAV STARs descending to 5000 to AR when descending via, so AR can leave aircraft descending via without coordination.
- To ensure separation between 17R SPILR / 17L RDHSE and 35L LOKRD / 35R HIDEY crossing departures, DR1 and DR2 must coordinate; the requirement falls on the DR whose aircraft crosses into the other's airspace (ex. 17R SPILR to DR2 and 17L RDHSE to DR1: DR1 manages the conflict). [The SOP writes "37L LOKRD" in this sentence.]
- DR1 is the primary sequence for traffic landing LOU and controls the LOU ATCT when it is not independently opened. DR1/DR2 must always quicklook AR1/AR2.
- When both DR sectors are open the Shared Departure Corridor (SDC) is co-owned by both. Other than HIDEY, LIKRD [sic], RDHSE and SPILR departures, all aircraft must be coordinated before entering the SDC; any change to route or altitude within the SDC must be coordinated between sectors.
- All aircraft climbing via SID must remain on the SID unless an operational need arises. If an aircraft is taken off the SID, an altitude must be assigned as well as an expected point to rejoin.

### Arrival Radar

*Source: SDF SOP 9 Radar Sectors*

- AR1 is normally responsible for west SDF arrivals (via JMONY and MBELL in north/south flow). AR2 is normally responsible for east SDF arrivals (via DLAMP and LEDDL). AR1/AR2 does not exist in west (runway 29) flow.
- All arrivals to SDF shall be handed to FR at 6000 except for the low-side base, which should be descending to 4000. The high side is normally the left runway during parallel operations (17L, 35L); the low side is the right runway (17R, 35R). AR releases control to FR on contact.
- Once a handoff has been accepted, AR releases control to DR for satellite arrivals and departures.
- During parallel runway operations, unless otherwise coordinated, the high-side controller establishes the sequence; the low-side controller must hit the gaps and maintain separation from the high-side controller's traffic.

### Final Radar

*Source: SDF SOP 9 Radar Sectors*

- FR has control on contact for all arrivals. FR cannot be split when landing runway 29. FR receives handoffs from AR1/AR2 descending to 6000, except low-side base feeds, which descend to 4000.
- Visual approaches to parallel runways: assign a heading that will intercept the extended centerline at an angle not greater than 30 degrees, regardless of altitude, when an aircraft is within 5nm of any aircraft established on base or final to the parallel runway. Control the visual approach so speed, altitude and timing leave room to intercept final without crossing into the parallel final; methods include staggering aircraft turning base, assigning an altitude restriction to maintain until established, and retaining aircraft on the FR frequency until established on final.
- Ensure aircraft vectored on the high side, regardless of runway configuration, are turned onto the final approach course at or above 4000. Aircraft vectored on the low side must normally be turned on at or below 3000. The high/low side must be used whenever aircraft on opposite sides and/or on final are converging or likely to converge. Altitude separation must be maintained until prescribed lateral separation has been achieved and is remaining constant or increasing, and/or both aircraft are established on their respective parallel finals, or visual separation is being applied.
- Ensure all aircraft maintain 3500 or higher while crossing the Bowman Class D/E airspace.
- After a handoff has been accomplished, FR1/FR2 releases control to all other sectors when a climb or descent is required for satellite arrival and departure aircraft.
- In runway 17 or 35 flow, aircraft on some arrivals may pass through FR1/2 on base to the final approach course for the other runway. AR initiates a handoff to the FR whose airspace is first penetrated. That FR must observe the runway assignment in the scratchpad and flash the track through to the other FR, without accepting the handoff, provided no traffic conflict exists; AR may then transfer communications directly to the other FR. FR1/2 releases control of descents to 5000 to the other FR. If any conflict exists, or special instructions are needed, coordination is verbal.

## 11. STARS maps

SDF SOP 10.

### STARS video maps (124)

*Source: SDF SOP 10 STARS Maps*

Map names only. The vNAS record lists 122 map ids for this STARS facility; vNAS does not expose video-map geometry (probed 2026-09-01).

124 maps; the list is in the SOP chapter 10 and in the deck's STARS maps table.

## 12. Where the SOP and the other sources disagree

Named, not resolved.

### Bowman Local STARS ID

- **A:** SDF SOP 2 Positions: Bowman Local Control STARS ID U, tag LOU LC
- **B:** SDF SOP 1 rundown list and the vNAS record: LOU is TCP 1Z; vNAS has no U TCP at SDF
- The SOP disagrees with itself as well as with vNAS. Not resolved: U or Z. A drill must not type either as the handoff ID without saying which source it took.

### Ground Control West label

- **A:** SDF SOP 2: the position is labelled "(CGW)" in the table
- **B:** The same row's tag and every other mention: GCW
- As written; a typo in the abbreviation. The tag SDF GCW is carried.

### Channels printed to two decimals

- **A:** SDF SOP 2: GCW 119.82, AR1 132.32, DR1 132.07, DR2 123.67, FR2 135.77
- **B:** vNAS: 119.825, 132.325, 132.075, 123.675, 135.775
- Truncation, not disagreement. The tool shows the full channel.

### Which frequency a SID prints

- **A:** SDF SOP 3: all SIDs publish 132.07 (DR1); GTGON, HIDEY, LLIZY and RDHSE must be assigned 123.67 (DR2) by hand when DR is split
- **B:** vNAS TDLS: see the TDLS table on the vNAS record for the default each SID prints
- Single source for the instruction; the TDLS table shows what the PDC prints by default.

### SOP spelling in the DR text

- **A:** SDF SOP 9: "17R SPILR / 17L RDHSE and 37L LOKRD / 35R HIDEY"; "HIDEY, LIKRD, RDHSE and SPILR"
- **B:** Every other section: runway 35L, LOKRD
- As-written typos (37L, LIKRD). Not corrected; the tool carries the sentence with the typo marked.

### SOP 3 transitions against CIFP

- **A:** SDF SOP 3 lists RNAV SID transitions CNTRY, CHALI, APALO, GUMMI beside BILET, SHIPR, TERGE, DAAVE
- **B:** CIFP 261001 names only BILET, SHIPR, TERGE, DAAVE as exit transitions; CNTRY, CHALI, APALO and GUMMI are fixes on those transitions
- Agreement, not conflict: the SOP lists a transition and its first fix side by side.

