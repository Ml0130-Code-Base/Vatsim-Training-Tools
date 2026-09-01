# C90 Reference — Chicago TRACON

Extracted 2026-09-01 from **vZAU C90 TRACON SOP 7110.65C, effective 3/14/2026** (48 pages),
pulled from `zauartcc.org/files/documents`. Paragraph numbers below are that order's unless
another document is named. **This file wins over anything hardcoded in the HTML when they
conflict.**

What is *not* here is as important as what is: the arrival and departure geometry, the
airspace shapes, the MVA map and the LOA interfaces are all still unread. They are listed at
the end under "Named gaps" with the document that closes each one.

---

## 1. Positions — 2-1

Seventeen positions requiring duty familiarisation and transfer of position responsibility.

### O'Hare Finals
| Symbol | Callsign | Frequency |
|---|---|---|
| Z * | CHI_Z_APP | 119.000 |
| W | CHI_W_APP | 133.625 |
| F | CHI_F_APP | 124.350 |
| H | CHI_H_APP | 132.175 |

`*` — combined position, opens first.

### O'Hare Feeders
| Gate | Symbol | Callsign | Frequency |
|---|---|---|---|
| PLANO | X | CHI_X_APP | 135.075 |
| KUBBS | J | CHI_J_APP | 125.700 |
| OKK | E | CHI_E_APP | 118.925 |
| FARMM | Y | CHI_Y_APP | 135.025 |

### South Satellite (SSAT)
| Sector | Symbol | Callsign | Frequency |
|---|---|---|---|
| Sector 1 | S | CHI_S_APP | 128.200 |
| Sector 2 | P | CHI_P_APP | 119.350 |
| Sector 3 | L | CHI_L_APP | 133.500 |
| Sector 4 | U | CHI_U_APP | 133.90 |

### Departure and North Satellite
| Position | Symbol | Callsign | Frequency |
|---|---|---|---|
| East Departure | B | CHI_B_DEP | 128.575 |
| South Departure | M | CHI_M_DEP | 126.625 |
| West Departure | G | CHI_G_DEP | 135.275 |
| North Departure | D | CHI_D_DEP | 134.400 |
| North Satellite | A | CHI_A_APP | 120.550 |

## 2. Position combining — 2-2

Everything folds up to Z, which is why 2-1 stars it as the position that opens first.

- Feeders and Finals: FARMM → KUBBS → F; OKK → PLANO → W; H → W; W → Z; F → Z
- SSAT: Sector 3 → Sector 2 → Sector 1; Sector 4 → Sector 1
- Departure and NSAT: West → South → East; North → East; NSAT → East
- Full room: Sector 1 → Z; East → Z

*Confidence note.* 2-2 prints as two side-by-side two-column tables and the text layer
interleaves them. The chain above is what both a layout extraction and a reading-order
extraction independently produce, and it is internally coherent (every branch terminates on
Z). It has **not** been checked against the rendered page. Check it there before grading
anything on it.

## 3. Arrival configurations

Named in Appendix A (Glossary):

- **West Flow** — landing any of Runways 28L/C/R and 27L/C/R
- **East Flow** — landing any of Runways 9L/C/R and 10L/C/R
- **Parallel 22s** — landing Runways 22L and 22R
- **4R Only** — landing Runway 4R

Appendix C splits West and East further into **Center High** and **Two Runway** for the
Feeder and Final delegated airspace. Those appendices are chart images; the shapes are not
carried anywhere.

MDW configurations drive SSAT sectorisation (7-1.a, Appendices F-5 through F-9): **31R, 4R,
22L, 13L**.

## 4. Final runway responsibility — 4-3.b.1

The runway each Final is normally responsible for when de-combined.

| Final | West | East | 4R Only | Parallel 22s |
|---|---|---|---|---|
| F | 27R | 9L | — | — |
| Z | 27C/27L | 9C/9R | 4R | 22R |
| W | 28C/28R | 10L/10C | — | 22L |
| H | 28L | 10R | — | — |

Feeder duties (4-3.a): coordinate a primary runway and subsequent turn-ins with Final;
control and sequence to the ADA; adjust speeds and intervals so Finals stay within the ADA;
transfer communications to another Feeder no later than RRCP 15 once the handoff is complete
and conflicts are resolved; release control to the receiving Feeder or Final on contact.

Final duties worth drilling (4-3.b): do not descend into the ADA without diverging or 3 NM
lateral separation from ORD departures on tower-assigned headings; assign 210 knots or less
prior to or with the downwind-to-base turn; no PRM approaches when the KORD METAR shows a
ceiling below 800 ft or visibility below 2 SM.

## 5. Turn-on altitudes and capture points

### Dual simultaneous instrument — 4-4.a
| Flow | Runways | North turn-on | South turn-on | Capture point |
|---|---|---|---|---|
| West | 27L and 28C | 4,000 | at or above 5,000 | 6,000 fix |
| East (PRM) | 10C and 10R | 4,000 | at or above 5,000 | 6,000 fix |
| East (no PRM) | 9R and 10C | 4,000 | at or above 5,000 | 6,000 fix |
| Parallel 22s | 22L and 22R | 4,000 | at or above 5,000 | 6,000 fix |

4-4.b — traffic vectored for the north runway must be at the turn-on altitude before traffic
is less than 3 NM from the south runway final approach course. 4-4.c — Final controllers are
responsible for separation until aircraft are established on their FAC and inside the FAF.

### Triple simultaneous — 4-5.b
| Runway | Turn-on altitude | Capture point |
|---|---|---|
| North | 4,000 | 6,000 fix |
| Center | at or above 7,000 | 8,000 fix |
| South | 5,000 / 6,000 | 7,000 / 8,000 fix |

4-5.d — Final may issue visual approaches to the north and south runways but must issue
instrument approaches to centre runway arrivals; aircraft issued visuals must be instructed
to fly the localizer and may intercept at the next closest capture point.

### Visual — 4-6.a.2
| Flow | Runways | North turn-on | South turn-on | Capture point |
|---|---|---|---|---|
| West | 27L and 28C | 4,000 | at or above 5,000 | 5,000 fix |
| East | 10C and 10R | 4,000 | at or above 5,000 | 5,000 fix |
| Parallel 22s | 22L and 22R | 4,000 | at or above 5,000 | 5,000 fix |

4-6.c — no triple simultaneous visual approaches. 4-6.b — Runway 10R visuals: advise aircraft
to expect the ILS/RNAV Y RWY 10R final approach course, and have them intercept a 10R "Y"
ILS, LOC or RNAV FAC no later than the FAF when running simultaneous visuals with 10C.

## 6. Beacon codes — 2-4

IFR **3101-3277**, VFR **5101-5177**. Issue what the radar client generates; use these sets
only when it errors.

## 7. Airports and tower position symbols — 2-6.d

| ICAO | Field | Tower symbol |
|---|---|---|
| KORD | O'Hare (Center) | T |
| KORD | O'Hare North or South | Q |
| KMDW | Midway | R |
| KARR | Aurora | 8 |
| KDPA | DuPage | 7 |
| KPWK | Chicago Executive | 6 |
| KGYY | Gary | 9 |
| KLOT | Lewis | 5 |
| KUGN | Waukegan | 4 |

**Runway inventories for these fields are not in this order and are not carried anywhere.**

Scratchpad entries for uncontrolled airports (2-5.b.2): ILS `ILS`, RNAV `RNV`, RNP `RNP`,
VOR `VOR`, visual `VA`, expecting visual `RVA`. Three alphanumeric characters (2-6.b).

## 8. North Satellite entry altitudes — 6-2.c

| From → entering | Altitude | Condition |
|---|---|---|
| NSAT → Sector 1 | 4,000 | outside RRCP 35, during MDW Runway 22L |
| NSAT → Sector 3 | 3,000 | outside RRCP 15 |
| NSAT → Sector 4 | 4,000 | outside RRCP 20 or the ADA, whichever is farther; do not enter Sector 4 during MDW Runway 22L |
| Sector 1 or 4 → NSAT | 3,000 | outside RRCP 15 |
| Sector 3 → NSAT | 4,000 | outside RRCP 20 or the ADA, whichever is farther |

NSAT departures (6-3.a): to North, East or West Departure on a heading to remain clear of the
ADA at 4,000; in a West Flow, departures filed via MOBLE or GIJ may go south at 6,000 to East
Departure after the required point-outs; to South Departure after point-outs on a south
heading at 6,000, or to Sector 1/4 or Sector 3 per 6-2.c.

PWK (6-4): a Runway 16 IFR departure needs the NSAT Light coordinated with ORD first; any PWK
arrival needing the ILS 16 or a circle to 6/24/30/34 is coordinated with ORD ATCT; the RNAV
Runway 30 is only available in a West Flow and must be pointed out to the North Final
controller.

## 9. Departure control — 5-1 through 5-6

- Departure owns all airspace exclusive of Feeder, Final, SSAT and NSAT (5-1.a).
- **ZAU 250 kt restriction (5-2.e, 6-3.b, 7-3.e):** unless it is in the assigned SID, the
  position issuing a climb to 10,000 or above to a jet issues the 250 kt assignment.
- 6,000 outside the ADA may be used to shuttle traffic (5-2.f), sparingly.
- West Departure works all westbound departures requesting at or above 6,000 (5-3, 7-3.b).
- East Departure stays north of the SSAT climb corridor boundary east of RRCP 15, ensures
  aircraft are 3 NM north of it before transferring to ZAU, routes props through SBN
  airspace, and has control of NSAT MOBLE departures (5-4).
- South Departure points out or issues traffic to the affected SSAT sectors for any departure
  restricted at or below 13,000 (5-5).
- North Departure keeps vertical separation, or at least 4 NM lateral, from the centrelines of
  the ACCRA and UECKR SIDs (5-6, Appendix D).

## 10. South Satellite — 7-1 through 7-4

- SSAT owns the area south of the SSAT climb corridor boundary in departure airspace (7-1.b).
- When ORD lands 4R, instrument approaches to MDW Runway 13L are not authorised (7-2.f).
- Reduced separation on final to 2.5 NM for Runway 31R when both aircraft are within 10 NM,
  no additional wake separation is required, and the KMDW METAR visibility is 2 SM or greater
  (7-2.g).
- Eastbound departures must be 3 miles south of the SSAT climb corridor boundary, over LEWKE
  or GIJ, or on a 090 heading per the ZAU or SBN LOA (7-3.a.1). Sector 3 may route eastbound
  over HOBEL at 4,000 after coordinating with Sectors 1, 2 and 4 (7-3.a.2). A single jet
  requesting 15,000 or above may be climbed under P-ACP to 15,000 per the C90/ZAU LOA
  (7-3.a.3).
- Northbound MDW departures out of Sector 3 go to North Departure after point-outs on a north
  heading at 6,000, or to NSAT per 7-4; out of Sector 1/4, to North Departure on a northeast
  heading at 4,000, or to NSAT — this is "Shore at Four" (7-3.c).

**7-4 is partial.** The four inter-sector altitude matrices (MDW 13L, 22L, 4R, 31R) print as
four side-by-side tables and the text layer interleaves their columns; a number in the wrong
column is a wrong altitude, so none of them are transcribed here or carried in the tool. Read
them off the rendered page. The prose alongside them **is** carried:

- *Runway 13L LTFC* — right turn-ins; the SSAT Light coordinated before the aircraft crosses
  RRCP 20; FAAO 7110.65 5-9-1.a reduced from 2 NM to 1 NM from the approach gate.
- *Runway 22L* — Sector 1 releases control for turns to Sector 4 and routes or vectors over
  MIING; NSAT enters Sector 1 outside RRCP 35 on a south heading; Sector 4 vectors MDW
  arrivals.
- *Runway 31R* — Sector 3 enters NSAT outside RRCP 20 (RRCP 30 in an East Flow); Sector 4
  outside RRCP 15; Sector 4 enters Sector 1 with MDW LTFC outside RRCP 25 on a southwest
  heading, and Sector 2 on a west heading.

## 11. Glossary — Appendix A

- **RRCP** — Range Ring Center Point, **41°58'48"N / 087°55'40"W**, the old ORD west ASR-9
  sensor location. C90 airspace is defined by RRCP range marks, and RRCP 20 means the 20 NM
  range mark from that point. This is the anchor the tool's scope is drawn on.
- **ADA** — Arrival Descent Area, the area used to descend ORD arrivals; always the one in
  use for the current arrival configuration.
- **Capture point** — the point on final before which an aircraft must be established on the
  localizer and cleared for the approach. **Capture bars** are the map lines adjacent to the
  5,000, 6,000, 7,000 and 8,000 ft FAC fixes.
- **Turn-in** — an ORD arrival vectored across the normal arrival flow to the opposite
  arrival controller for sequencing to that runway. **Head fake** — one coordinated as a
  turn-in and then returned to the normal flow.
- **Shore at Four** — point out to NSAT by Sector 1 or 4 of a northbound departure that will
  be handed to North or East Departure at 4,000.
- **Uncommon boundary** — one position owns to the line and the others stay 3 NM off it.
  Feeder boundaries are uncommon; Departure and Satellite stay 3 NM from Feeder airspace, and
  from Final airspace inside the ADA at 4,000 and above.
- **Bags** — the sectorisation: North Bags is NSAT, South Bags is SSAT. **Front line** — the
  ORD arrival positions. **Foul line** — the SSAT positions. **Side line** — Departure and
  NSAT.
- **North / Center / South Runway** — the northernmost, middle and southernmost arrival
  runway in use.

## 12. Other general procedures worth knowing

- **P-ACP** — prearranged coordination procedures, 3-1. Not transcribed.
- **Prominent obstruction** — 3-3. Not transcribed; M98's equivalent turned out to be the
  single most useful number in that tool, so this is worth pulling.
- **Point-outs** — 3-6. **Controlled airspace intrusions** — 3-7. **ORD-specific
  procedures** — 3-8. **Position relief briefings** — 3-9 and Appendix G. None transcribed.

## Named gaps

| Gap | What closes it |
|---|---|
| ORD and MDW STAR/SID geometry — the four gates' fixes, ladders and crossing restrictions | `ORD MDW STARs.pdf`, `ORD and MDW Cheatsheet v3.1.pdf`, charts.zauartcc.org |
| C90 lateral boundary | `vZAU TRACON Boundaries.pdf`, `vZAU C90 Diagrams.zip` |
| Feeder and Final delegated airspace, and the ADA shapes | Appendices C-1 through C-11 (chart images) |
| SSAT delegated airspace by configuration | Appendices F-1 through F-9 (chart images) |
| ACCRA/UECKR protection areas and the SSAT climb corridor boundary | Appendix D (chart image) |
| Minimum vectoring altitudes | Appendix B (chart image) |
| ZAU interface — release points, handoff altitudes, the P-ACP climb to 15,000 | `vZAU ZAU-C90 LOA` |
| Tower interfaces | `vZAU C90-ORD`, `C90-MDW`, `C90-PWK`, `C90-MKE`, `C90-RFD`, `C90-SBN ATCT LOAs` |
| Runway inventories for the eight fields | not in the SOP; charts |
| 7-4 SSAT altitude matrices | the rendered page of the SOP |
| Standing training items | the student and the instructor — see the student notes export |
