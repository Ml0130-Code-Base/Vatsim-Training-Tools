# AZO Reference — Great Lakes Approach, West Wall

Extracted 2026-09-01 from three documents pulled from `zauartcc.org/files/documents`:

- **vZAU Great Lakes TRACON SOP 7110.65A, effective 1/9/2025** (16 pages) — paragraph numbers
  below are this order's unless another document is named.
- **vZAU ZAU-AZO ATCT LOA, effective 12/21/2025** — cited as "ZAU LOA".
- **vZAU-vZOB AZO ATCT LOA, effective 12/13/2020** — cited as "ZOB LOA".

**This file wins over anything hardcoded in the HTML when they conflict.**

---

## 1. What AZO is

Kalamazoo ATCT works approach control as **Great Lakes Approach** (ZAU LOA 1 and 3). The
Great Lakes TRACON is split into two walls:

- **West Wall — ZAU's** (2-1.a, ZOB LOA 3.a): BELLS, BRONCO, GRIFFIN, WHITECAP, SHORELINE,
  LUMBERTOWN. Local procedures for these are ZAU's responsibility.
- **East Wall — ZOB's** (2-1.b, ZOB LOA 3.b): CAPITAL, REYNOLDS, OLDS, BUICK, CHIPPEWA, BAY.
  Local procedures are ZOB's and may be filed under LAN.

The airspace is delegated by ZAU **at or below 10,000** (Appendix B legend). ZAU LOA 4 says
the delegation and its altitudes are depicted in Appendix A — which is a chart image with no
text layer, so the boundary itself has not been read.

*Spelling note.* The documents spell the East Wall sector both **CAPITAL** (SOP 2-1.b, 4-9)
and **Capitol** (Appendix B diagram, ZAU LOA 7.h). Both are in the source set; neither is
corrected here.

## 2. Positions — 2-2, 2-3, Appendix B

| Symbol | Sector | Callsign | Frequency | Hierarchy (2-3) |
|---|---|---|---|---|
| G | GRIFFIN | AZO_G_APP | 128.400 | Combined |
| R | BRONCO | AZO_R_APP | 121.200 | North/south split |
| E | BELLS | AZO_E_APP | 119.200 | MKG/GRR/AZO split |
| N | LUMBERTOWN | AZO_N_APP | 119.800 | No hierarchy |
| W | WHITECAP | AZO_W_APP | 124.600 | No hierarchy |
| S | SHORELINE | AZO_S_APP | 133.825 | No hierarchy |

The 2-2 and 2-3 tables and the Appendix B diagram agree on all six pairings, which is how the
mapping was confirmed — the layout extraction of 2-2 shifts the name column by a row, and
Appendix B pairs each name with its own callsign and frequency independently.

**East Wall frequencies** that appear in the West Wall's Appendix B: CAPITOL 118.65,
REYNOLDS 127.3, CHIPPEWA 126.45. OLDS, BUICK and BAY are named in 2-1.b with no frequency
anywhere in this order.

**ZAU LOA 7.h** — ZAU coordinates with each Great Lakes sector, *except* that these are
considered combined unless otherwise coordinated: LUMBERTOWN + SHORELINE, WHITECAP + GRIFFIN,
BELLS + BRONCO, CAPITOL + REYNOLDS. **7.g** — Great Lakes must coordinate with each ZAU
sector, with no such exception.

## 3. Fields

| ICAO | Field | Sector | Runways in the order |
|---|---|---|---|
| KAZO | Kalamazoo/Battle Creek | BELLS/BRONCO | 17, 35, 9, 27 (from the 4-4 pairs) |
| KBTL | Battle Creek | BELLS | none in this order |
| KGRR | Gerald R. Ford | GRIFFIN/WHITECAP | 8L, 8R, 26L, 26R, 17, 35 (from the 5-3 pairs) |
| KMKG | Muskegon County | SHORELINE/LUMBERTOWN | 6, 24, 14, 32 (from the 6-3 pairs) |
| KBIV | West Michigan Regional | GRIFFIN/SHORELINE | none — named in 5-6/6-6 as a fix to assign |
| KHLM | Park Township | GRIFFIN/SHORELINE | none — named in 5-6/6-6 as a fix to assign |

Runway lists are only what the departure-area tables name. A field with no table gets no
runway list rather than a guessed one. LAN and JXN are East Wall fields (4-9); Detroit-area
fields and DTW appear only as destinations in coordination rules.

*Coordinates.* The six field positions plotted on the tool's scope come from public airport
data, **not** from the vZAU document set. They are the only numbers in the tool that are not
traced to a vZAU paragraph, they are good to about a tenth of a mile, and nothing operational
is derived from them.

## 4. Departure areas — silent coordination

The areas are bearings measured **from the intersection of the two runways in use** out to
the radius given. "RWH" is the runway heading of the runway named. 3-6: an aircraft departed
on runway heading may be turned either way, but once turned it cannot be turned back toward
the departure runway, and nothing is turned toward the runway it departed until it clears the
departure area laterally or vertically.

### KAZO — to 4.1 NM (4-4)
| Runways in use | Departure area |
|---|---|
| 17, or 17 and 23 | 140 clockwise to RWH of Runway 23 |
| 17 and 9 | RWH of Runway 9 clockwise to 200 |
| 17 and 27 | 140 clockwise to RWH of Runway 27 |
| 35, or 35 and 5 | 320 clockwise to RWH of Runway 5 |
| 35 and 27 | RWH of Runway 27 clockwise to 020 |
| 35 and 9 | 320 clockwise to RWH of Runway 9 |

### KGRR — to 5 NM (5-3)
| Runways in use | Departure area |
|---|---|
| 8L/R and 17 | 050 clockwise to RWH of Runway 17 |
| 8L/R and 35 | RWH of Runway 35 clockwise to 120 |
| 17 and 26L/R | RWH of Runway 17 clockwise to 300 |
| 26L/R and 35 | 230 clockwise to RWH of Runway 35 |

### KMKG — to 5 NM (6-3)
| Runway in use | Departure area |
|---|---|
| 6 | 015 – 105 |
| 24 | 195 – 285 |
| 14 | 095 – 185 |
| 32 | 275 – 005 |

## 5. Inter-sector altitudes

| Between | Rule | Cite |
|---|---|---|
| SHORELINE → BRONCO | AZO arrivals above 7,000 descending to 7,000 | 4-7, 6-4 |
| BELLS/BRONCO → GRIFFIN | GRR arrivals at or above 9,000 level at or descending to 9,000 | 4-8, 5-8 |
| SHORELINE/LUMBERTOWN → GRIFFIN/WHITECAP | GRR arrivals above 7,000 descending to 7,000 | 5-5.a.1, 6-5.a.1 |
| GRIFFIN/WHITECAP → SHORELINE/LUMBERTOWN | MKG arrivals above 6,000 descending to 6,000 | 5-5.b.1, 6-5.b.1 |
| GRIFFIN → MKE area | MKE area arrivals direct LYSTR or a 290 heading | 5-5.b.2, 6-5.b.2 |
| BELLS → REYNOLDS/CAPITAL | LAN or JXN arrivals level or descending to 9,000 | 4-9.a.1 |
| REYNOLDS/CAPITAL → BELLS | AZO or BTL arrivals level or descending to 10,000 | 4-9.b.1 |
| REYNOLDS/CAPITAL → BELLS | APREQ every IFR aircraft entering BELLS assigned 3,000 | 4-9.b.2 |
| CAPITAL → GRIFFIN/WHITECAP | GRR arrivals above 8,000 at or descending to 8,000 | 5-7.a.1 |
| GRIFFIN/WHITECAP → CAPITAL | LAN arrivals above 9,000 at or descending to 9,000 | 5-7.b.1 |
| GRIFFIN → BIV/HLM | assign 4,000, direct BIV, HLM, JAVPO or FENAB | 5-6.a, 6-6.a |
| SHORELINE → GRIFFIN | departures requesting 9,000 or below assigned 3,000; on course once GRIFFIN takes the handoff | 5-6.b, 6-6.b |

Within 10 NM of the SHORELINE/GRIFFIN boundary (5-6.c, 6-6.c): GRIFFIN has control for climb
and turns, SHORELINE has control for descent and turns toward the landing airport.

IFR aircraft landing Detroit-area airports **except DTW** may be cleared direct destination
(4-9.a.2, 5-7.b.2, ZOB LOA 6.a.ii, 7.b.ii).

## 6. ZAU interface — ZAU-AZO ATCT LOA

**Arrivals (5)**
- ZAU clears arrivals to the destination airport, and must verbally coordinate arrivals at or
  below 10,000 that are not level at least 5 NM from the boundary (5.a).
- ZAU should hand off arrivals to the sector or facility the aircraft will overfly 30 NM from
  destination; inside 30 NM, to the sector currently overflown. This identifies the right
  receiver, it does not limit the distance at which a transfer can occur (5.b).
- ZAU releases arrivals for airspeed, descent and turns up to 30 degrees either side of route.
  Great Lakes coordinates anything that will enter another sector or facility (5.c).

**Departures (6)**
- Great Lakes hands off departures requesting 11,000 or higher **at or climbing to 10,000**
  (6.a).
- Great Lakes provides **5 NM radar separation to ZAU, constant or increasing**, before
  transferring communications or control (6.b).
- Great Lakes releases departures to ZAU for airspeed and turns up to 30 degrees either side
  of route (6.c).

**General (7)**
- Release of control is subsequent to a completed handoff and communications transfer unless
  stated otherwise (7.a).
- Beacon codes **0200-0277, 4200-4577, 5500-5537** are allocated internally to Great Lakes
  Approach (7.b).
- After the handoff, the receiving controller has control for a transponder code change (7.c).
- A full briefing is exchanged whenever Great Lakes opens or closes, completely or partially
  (7.d). If an underlying tower stays open after Great Lakes closes, Great Lakes must
  explicitly coordinate that, and ZAU then coordinates directly with the tower (7.e).
- Aircraft transitioning between **Kubbs and Shoreline** at or below 10,000 must be level at
  an appropriate altitude for direction of flight at least 5 NM from the boundary; anything
  not level or not at an appropriate altitude is verbally coordinated (7.f). *Kubbs here is
  the ZAU Center sector of that name — not the C90 KUBBS feeder, which is a different
  facility's position that happens to share the fix name.*

## 7. East Wall interface — ZOB LOA

- After an intra-facility handoff the receiver may turn up to 30 degrees either side of
  course without affecting another sector's airspace, descend Mode-C aircraft within the
  initiating sector's airspace, and change the beacon code (4.a; the same text is SOP 3-4.a).
- Altitude information may be passed electronically via the data block in place of verbal
  coordination (4.b).
- **Scratchpads (5):** silent coordination between the TRACON and the towers for arrivals to
  the advertised runways, using the approach type and the last two digits of the runway. No
  entry is required when the aircraft is flying the advertised approach per the ATIS.
  Approach type codes: C visual, I ILS, L localizer, G RNAV/GPS, V VOR, A surveillance/ASR,
  N NDB, O overhead, X VFR.
- BELLS ↔ REYNOLDS/CAPITAL and CAPITAL ↔ GRIFFIN/WHITECAP altitudes (6, 7) match SOP 4-9 and
  5-7 above.

## 8. Beacon codes — two documents, two answers

| Source | IFR | VFR |
|---|---|---|
| SOP 3-7.a — West Wall | 0200-0277 | 4500-4577 and 5500-5537 |
| SOP 3-7.b — East Wall | 0400-0477 | 4300-4377 and 5540-5577 |
| ZAU LOA 7.b — Great Lakes | 0200-0277, 4200-4577, 5500-5537 (not split IFR/VFR) | — |

**The VFR blocks disagree**: the LOA opens at 4200, the SOP West Wall block at 4500. Both are
carried in the tool and neither is resolved. SOP 3-7.c — flights originating inside Great
Lakes airspace may be issued local codes, which have to be handed off manually between ZAU
and ZOB.

## 9. Local rules

- **AZO TRSA (4-3):** Great Lakes must provide TRSA services to all aircraft requesting them
  within the designated TRSA except when radar is unsuitable. VFR aircraft outside the TRSA
  get basic radar services workload permitting. *The TRSA is never depicted in the order.*
- **Departure area avoidance (4-2.a, 4-2.b):** vector VFR below 4,500 clear of the AZO
  departure area; vector IFR below 5,000 clear of it by 3 NM.
- **Control for climb (4-2.c):** the radar controller has control for climb on contact with
  everything departing AZO or operating in the AZO Class D surface area.
- **BTL Class D (4-6):** vector VFR below 3,500 and IFR below 4,000 clear of it; a visual
  approach to BTL must be established on a 5-mile straight-in before entering it; BELLS may
  authorise SVFR there and controls the airspace in IFR conditions.
- **Runway 35 noise APREQ (4-5.b):** if BELLS approves one, BRONCO has control to climb at or
  above 4,000 and, after leaving 4,000, to turn to headings west of 020. Noise headings are
  not turned until the aircraft clears the departure area laterally or vertically (4-5.a).
- **GRR noise (5-4):** avoid turning aircraft off Runways 8L, 8R and 35 until at least 2 miles
  out and above 3,000.
- **Sequencing:** GRIFFIN establishes the GRR sequence (5-2); Runways 8R/26L and 8L/26R are
  4,313 ft apart. LUMBERTOWN sequences MKG on Runway 14 or 24, SHORELINE on Runway 6 or 32
  (6-2).
- **Transfer of control (3-5):** communications to the tower no farther than 12 NM from the
  airport. *The order reads "and no closer than flying miles from the airport" — a word is
  missing in the published text; the near limit is unknown.*
- **Radar range and filters (3-2):** display your airspace plus 5 miles or more; altitude
  limits at least 1,000 ft above your area of jurisdiction.
- **Departure tracks (3-3.b):** each radar position determines whether automatic acquisition
  of its departure track occurred, at both primary and satellite airports.

## 10. Minimums to vector for a visual approach

| Where | Ceiling | Visibility | Cite |
|---|---|---|---|
| AZO | 2,100 ft AGL (3,000 ft MSL) | 3 miles | 4-10.a |
| BTL | 2,000 ft AGL (3,000 ft MSL) | 3 miles | 4-10.b |
| GRIFFIN / WHITECAP | 2,200 ft AGL (3,000 ft MSL) | 3 miles | 5-9 |
| SHORELINE / LUMBERTOWN | 2,100 ft AGL (2,800 ft MSL) | 3 miles | 6-7 |

## Named gaps

| Gap | What closes it |
|---|---|
| West Wall sector boundaries | Appendices A and B (chart images), ZAU LOA Appendix A, `vZAU TRACON Boundaries.pdf` |
| AZO TRSA lateral and vertical limits | charts.zauartcc.org; the TRSA depiction |
| Any STAR, SID or approach geometry, and the fixes LYSTR, JAVPO, FENAB, BIV, HLM as coordinates | charts.zauartcc.org — there is no procedure data in the vZAU document set for these fields |
| Minimum vectoring altitudes | not in the vZAU document set for the West Wall |
| The near limit in 3-5's transfer-of-control rule | a corrected copy of the SOP |
| The 4200 vs 4500 VFR beacon block | whichever of the two documents is superseded |
| Tower hours and Class D dimensions for AZO, BTL, GRR, MKG | `vZAU Minor Fields SOP 7110.65B`, not yet read |
| Standing training items | the student and the instructor |
