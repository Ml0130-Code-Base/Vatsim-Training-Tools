# M98 TRACON Standard Operating Procedures — Order M98 7110.26A

Source: `source-docs/M98_7110_26A.pdf`, effective **March 31, 2026**, signed Dhruv Kalra, Air
Traffic Manager, VATSIM Minneapolis ARTCC. Cancels M98 Order 7110.26 CHG 1 (eff. 2025-11-30).
Extracted 2026-08-31. This is the authoritative M98 document; where it disagrees with anything
hardcoded in the tool, **this wins**.

Changes in this revision worth knowing: Land 35 / Depart 12 is **no longer prohibited**;
P-ACP and automated point-out applicability updated; **feeder-to-ACDA altitudes updated**;
satellite practice-approach IFR separation added; airspace maps, MVA map and relief checklists
revised.

---

## Chapter 1 — General

**1-6 Global ratings.** KMSP is a GCAP **TIER I** facility; MSP ATCT and M98 TRACON positions
require the rating and/or facility endorsement, or being in training for it. The four satellite
towers — **KSTP, KFCM, KANE, KMIC** — are **UNRESTRICTED**: any S2 may staff the cab.

**1-8 Delegated airspace.** Altitudes on the diagrams are hundreds of feet MSL (`90-170` =
9,000-17,000). Diagrams depict **IFR** altitudes unless noted. For VFR, each TRACON position
holds VFR altitudes from the base of the overlying airspace down to **500 ft above Tower
airspace**. The underlying position ensures separation from overlying airspace inside Class B.
Each position ensures wake turbulence separation from super and heavy jets when vectoring VFR
aircraft less than 1,000 ft below overlying airspace.

**1-9** Runway 12L/30R and 12R/30L centerlines are **3,380 ft** apart.

---

## Chapter 2 — Positions and duties (2-1)

| Position | Freq | STARS ID | Callsign |
|---|---|---|---|
| North Departure | 125.750 | D | MSP_D_DEP |
| South Departure | 124.700 | R | MSP_R_DEP |
| East Departure | 132.975 | L | MSP_L_DEP |
| North Feeder | 126.350 | I | MSP_I_APP |
| **South Feeder** | **135.475** | **H** | **MSP_H_APP** |
| North Final/Arrival | 119.300 | N | MSP_N_APP |
| South Final/Arrival | 126.950 | S | MSP_S_APP |
| 17/35 West Final/Arrival | 118.725 | J | MSP_J_APP |
| Flying Cloud Satellite | 134.700 | E | MSP_E_APP |
| St. Paul Satellite | 121.200 | G | MSP_G_APP |
| Crystal Satellite | 126.500 | K | MSP_K_APP |

South Feeder (H, 135.475) is the primary combined frequency, connected first. **NOTE 2 —
split order:** 1. South Feeder, 2. South Departure, 3. North Final/Arrival, 4. South
Final/Arrival, 5. further connections at CIC discretion. *(This confirms the H to R to N to S
chain the tool already models.)*

**Duties.** Departure (2-2) separates in its delegated airspace, applies the altitude
restrictions and in-trail spacing in the MSP/M98/ZMP LOAs, coordinates, hands off, owns its
STARS entries. Satellite (2-3) adds IFR/VFR clearances and **ensures aircraft landing in M98
airspace have current arrival information**. Arrival (2-4) vectors and sequences aircraft
landing MSP, uses the proper approach aids, **issues approach clearances**, issues weather and
RVR. Feeder (2-5) **assigns runways to arrivals and establishes the sequence for handoff to
Arrival**, **initiates crossover traffic**, issues weather and airport information.

---

## Chapter 3 — General operating procedures

**3-1 Control for turns.** A receiving controller with communications on an accepted handoff
may turn the aircraft inside the previous controller's airspace if the turn is **at most 30
degrees** from the previously assigned heading *and* the aircraft stays inside the airspace of
the position that made the handoff.

**3-2 P-ACPs ("look and go").** Authorized **only within M98 airspace**; where impracticable,
use standard point-outs. Specifically authorized for:

- Arrival to descend through Departure airspace to **6,000 ft in Area F, on a 30/17
  configuration only**. Departure and Satellite must tell Arrival about any non-STARS-tracked
  target in Area F.
- Departure positions **D, R, L** to climb through the **ACDA shelves ("Bat Wings")**.
- Departure **D, R, L** and Satellite **E, G, K** to climb tracked aircraft through Feeder
  airspace, through North/South Arrival airspace **6,000-7,000 ft over-the-top of MSP**, and
  through Runway 35 Arrival airspace.
- Satellite to transit tracked MSP departures at or assigned **4,000 ft** through Departure
  airspace adjacent to the dispersal area, **between 10 and 15 miles of MSP**.
- **Between Feeder positions when crossing near-gate arrivals at 9,000 ft over the ACDA.**

**3-3 Automated Point Outs (APO).** Authorized between all positions when the aircraft will not
transit the ACDA (except through J airspace on a 30s/35 configuration) **and** scratchpad #1
shows either the departure-gate letter plus a two-digit thousands altitude, the three-letter
departure gate, or the arrival airport. Gate letters:

| | | | |
|---|---|---|---|
| E — EAU | R — RST | D — DLL | F — FAR |
| N — ODI | A — ABR | B — BRD/DLH | O — ONL/FOD |

`B12` = BRD/DLH gate, assigned 12,000. Field 7 shows the requested altitude if different from
present and not already in scratchpad 1. Aircraft scratchpadded **STC or MKT are assumed
descending to 4,000**; any other altitude must be in the assigned-altitude field.

APO is also authorized **Arrival to/from Satellite to descend to 3,000 ft inside the lateral
ACDA** when the aircraft is tagged for an MSP approach, is **within 20 NM of the runway on a
heading not greater than 90 degrees from the final approach course**, and will neither fly
through the final nor turn away from it.

Whoever initiates an APO clears the APO-specific data-block information before handing off to
another M98 position or switching to a tower; if the receiver takes radar, the responsibility
moves to them.

**3-4 MSP / SGS concurrent approaches.** SGS LOC 34 and RNAV (GPS) 34 may run concurrently
with MSP ILS 30L/R only if: SGS 34 traffic is pointed out to Arrival before approach clearance;
LOC traffic is at **2,500 ft and established on the localizer 5 NM prior to HINZZ**; RNAV
traffic is at **2,500 ft established on the FAC 5 NM prior to AVBAF**; Arrival keeps aircraft at
**4,000 ft to AABEZ/SAMMZ** when protecting for the SGS final; SGS traffic gets a missed
approach with **2,500 ft** initial; and Approach keeps the 30R traffic on frequency until the
paths have crossed.

**3-5 MSP Runway 35 with FCM RNAV 28L/28R.** Simultaneous if the FCM approaches are pointed out
to **Arrival and Local**, FCM traffic is at **3,000 ft or lower established by FGT**, and
Arrival has the Runway 35 aircraft established on the FAC **crossing ROZEE at 4,000 ft**.

---

## Chapter 4 — Arrivals

**4-1.** Arrival Control has **control for descent in Feeder airspace**.

**4-2 Approach Control Descent Area (ACDA).** The airspace for descending MSP arrivals,
excluding Tower delegated airspace; drawn in Appendix A (image, unread).

- **Runways 30 and 12** — split north/south: North Arrival takes north of the **12L/30R**
  localizer, South Arrival takes south of the **12R/30L** localizer.
- **Runway 35** — Runway 35 Arrival's airspace is depicted alongside the parallels.
- **Runways 4, 22, 17, 35** — split **west/east** of the localizer: North Arrival west, South
  Arrival east.
- **Land 35 / Depart 12s** — North Arrival west of the localizer *including NITZR/TRGET and
  BLUEM/DELZY traffic*; South Arrival east.
- **ACDA Shelves** are delegated to Arrival at **6,000 ft**.
- **Area R** — during heavy traffic or unusual situations the CIC may coordinate possession.
- **Area F** — on a **30/17 configuration only**, Arrival may descend to **6,000 ft** using
  P-ACP.

**4-3 Feeder airspace** is near-gate and far-gate ingress routes; routes and their altitudes are
in Appendix A (image, unread).

### 4-4c — Feeder/Arrival handoff altitudes, by configuration

**This is the paragraph the tool's `FLOORS` implements.** Read it literally:

| Configuration | Assignment |
|---|---|
| **Runways 4/22** | Near gates **8,000**; far gates **9,000** |
| **Runway 17** | BAINY worked straight in by 17 Arrival; **KKILR and MUSCL 8,000**; **TORGY, NITZR and BLUEM 9,000** |
| **Runway 12s, and 12s-Depart 17** | Near gates **7,000**; far gates **8,000** |
| **Runway 35** | NITZR and BLUEM straight in by 35 Arrival; **TORGY 8,000**; **BAINY 9,000**; **KKILR and MUSCL 9,000** |
| **Runway 30s** | Near gates **7,000**; far gates **8,000** |
| **Runway 30s - Depart 17** | Near gates **7,000**; far gates **8,000** |
| **Land 30s and 35** | NITZR and BLUEM straight in by 35 Arrival; **KKILR and MUSCL 7,000**; **KKILR and MUSCL to 35 Arrival 9,000**; far gates **8,000**; **NITZR and BLUEM to South Arrival 7,000** |
| **Land 35 - Depart 12s** | NITZR and BLUEM straight in by 35 Arrival; **all other arrivals 8,000** |

> **Near vs far gate — corrected 2026-08-31, owner-verified.** The order never lists which gates
> are near and which are far in prose, and an earlier revision of this note derived it from
> **4-4c(7), "Land 30s and 35"** and then generalised that answer to every configuration. That was
> wrong. **Near and far follow the flow, not the gate: a near gate is one whose arrivals drop onto
> the final, a far gate is one whose arrivals have to be vectored to it.** So the answer reverses
> with the landing direction:
>
> - **Landing the 12s — near = TORGY, BAINY; far = NITZR, BLUEM, KKILR, MUSCL.**
> - **Landing the 30s — near = NITZR, BLUEM, KKILR, MUSCL; far = TORGY, BAINY.** This is what
>   4-4c(7) says, and 4-4c(7) is a 30s paragraph — the old derivation was right for the 30s and
>   wrong everywhere else.
>
> Three things confirm the corrected reading, all of which failed under the old one. **The plates:**
> each gate's floor now equals the lowest published altitude on its own ladder — TORGY bottoms at
> KRUGG 7,000 and BAINY at KAYQU 7,000, while NITZR, BLUEM, KKILR and MUSCL all bottom at
> GREAK/TIETN 8,000. **4-5's worked example:** "a BAINY OPD to Runway 12R goes to N" is offered as a
> *near*-gate crossover, and BAINY is near on a 12s. **4-5's two carve-outs:** KKILR landing 30L is
> not a near-gate crossover and KKILR landing 12R is not a far-gate crossover — each names the class
> KKILR actually has in that configuration. Under the old flat read one of the two was a no-op.
>
> Note also 4-4c(2) puts KKILR and MUSCL at the near altitude for Runway 17 with TORGY, NITZR and
> BLUEM far, and 7-5b(2)(d) calls TORGY/BLUEM/NITZR far-gate crossovers on a 17/22 — both consistent
> with near/far tracking the flow. **4/22 and the 35 configurations use the near/far altitudes
> without the order ever naming the gates; the tool returns nothing there rather than guessing.**
**This is the paragraph `CLAUDE.md` recorded as missing from the reference set. It is here.**

| Configuration | North Feeder | South Feeder |
|---|---|---|
| Runways 12 and 12s-Depart 17 | **BAINY, MUSCL, KKILR** | **NITZR, BLUEM, TORGY** |
| Runways 30 and 30s-Depart 17 | **BAINY, MUSCL, KKILR** | **NITZR, BLUEM, TORGY** |
| Runways 4/22 | BAINY, TORGY | MUSCL, KKILR, NITZR, BLUEM |
| Runway 30s and landing 35 | BAINY, MUSCL, KKILR | TORGY |
| Runway 35 (incl. Land 35-Depart 12s) | BAINY, TORGY | MUSCL, KKILR |
| Runway 17 | TORGY | MUSCL, KKILR, NITZR, BLUEM |

NOTE — the North/South Feeder boundary is the **Runway 30L/12R or Runway 4/22 localizer**, as
appropriate to the configuration. NOTE — individual gates may be reassigned between Feeder
positions to balance workload.

Feeder must provide an **evenly distributed flow** to the Arrival positions (4-4a and 4-4e, said
twice), and must advise the Arrival Coordinator and Departure Control of any non-STARS-tracked
target or any tagged target that goes into coast (4-4b).

### 4-5 — Arrival crossover traffic

- Crossovers **may be initiated by the Feeder controllers**.
- Crossover traffic **must be transferred to Arrival on the downwind heading for the runway in
  use**.
- **Near-gate crossovers** must be coordinated with the appropriate ACDA controller(s). A
  near-gate crossover **on an OPD STAR** is handed to the Arrival controller **whose airspace
  the aircraft will enter first** (example: a BAINY OPD to Runway 12R goes to `N`). A near-gate
  crossover **assigned a heading** should be **assigned 9,000 ft** and handed to the controller
  for the runway assignment — the heading **should aim for the 25-mile range ring** to avoid the
  OPD traffic in the ACDA (example: a KKILR to Runway 30L goes to `S` at 9,000 and heading 220
  degrees). *KKILR arrivals landing 30L are not counted as a near-gate crossover for
  coordination.*
- **Far-gate crossovers** are handed to the appropriate **Feeder** position, with communication
  transferred as soon as practicable but **not later than 15 NM from MSP**. The receiving
  controller has **control for speed on contact** and **control for turns inside the 15-mile
  range ring**, remaining within Feeder airspace. Aircraft **not descending via the RNAV STAR
  must be coordinated** with the receiving Feeder. *KKILR arrivals landing 12R are not counted
  as a far-gate crossover for coordination.*

### 4-6 to 4-8

- **4-6** On a **30/17** configuration the **Runway 30L RNAV (RNP) Y** approach must not be
  issued without coordinating with MSP Tower — the descent goes into the Runway 17 departure
  corridor.
- **4-7 Parallel visual turn-ons.** Arrival designates **"LOW" and "HIGH" turn-on altitudes and
  sides**. Low-side aircraft must be **level at the low-side altitude prior to 3 NM from the
  associated localizer**. Aircraft stay **at least 3 NM from the associated extended final** and
  hold turn-on altitude until a visual approach clearance is acknowledged. **The high-side
  controller owns separation from the low-turn-on aircraft.** Best practices (not superseding
  7110.65): do not join final side-by-side with the parallel, do not let an aircraft pass another
  on the parallel approach outside the FAF, intercept at less than 30 degrees when able.
  **Simultaneous dependent approaches** use the same LOW/HIGH construct, level prior to 3 NM
  from the localizer, with altitude separation held until both are established on parallel finals
  and lateral separation exists.
- **4-8 Noise.** Vector arrivals **at or above 4,000 ft MSL until intercepting the glidepath**
  unless the situation dictates otherwise. **Runway 17 should not be used for arrivals from the
  north** except when weather or operations require.

---

## Chapter 5 — Departures

**5-1.** Departure must coordinate with the appropriate Arrival or Feeder position **before
vectoring any non-STARS-tracked target through the ingress routes**.
**5-3 Noise.** **Runway 35 should not be used for departures to the north** except when weather
or operations require.

---

## Chapter 6 — Satellite

**6-1 Airports M98 serves** (IFR, and VFR requesting services): 10D Winsted, 21D Lake Elmo,
25D Forest Lake, 7Y7 ARS Sport Strip (Belle Plaine), KANE Anoka County/Blaine, KCFE Buffalo,
KFBL Faribault, KFCM Flying Cloud, KLVN Airlake, KMGG Maple Lake, KMIC Crystal, KOEO Osceola WI,
KRGK Red Wing, KRNH New Richmond WI, KSGS South St. Paul, KSTP St. Paul Downtown-Holman,
KSYN Stanton. The source table also carries "Towered" and "IAP" columns, but their alignment is
scrambled in text extraction — **do not read towered/IAP status off this list**; the four towers
M98 actually works are ANE, FCM, MIC and STP (1-6b).

- When MSP is making **instrument approaches to Runway 22**, STP Satellite must coordinate **all
  STP IFR approaches and departures** with Arrival.
- Satellite may transition **VFR aircraft through the ACDA without coordination** provided the
  aircraft stays **beneath the Class B** and is tagged with the reported altitude if no Mode C.

**6-2** Satellite airspace splits into **three sectors** (Appendix C, image).
**6-3 STP Runway 14 departures** are restricted to **2,500 ft and headings no greater than 080
degrees**.
**6-4 STP Shelf.** When **both MIC and STP Satellite are open and MSP is landing 12L/R**,
satellite airspace is modified per the Appendix A "Runway 12 and 12/17 STP Shelf" diagram.
**6-5 ACDA entry from Satellite.** Hand off to Arrival on a heading that ensures the aircraft
enters the ACDA, at the turn-on altitude in use: **5,000 ft or above to the "high" side, 4,000 ft
to the "low" side**.
**6-6 IFR separation is afforded to VFR practice-approach aircraft** at: LVN, ANE, CFE, MIC,
FBL, 21D, FCM, GYL, MGG, RNH, OEO, RGK, STP, SGS.

---

## Chapter 7 — Runway 17-22 configuration

**7-1 Weather must be 1,400 and 4 or greater.** *(Matches the tool's hard validation floor.)*

**7-3 LAHSO.** Authorized for Runway 22 landings to hold short of **Taxiway KILO** for Runway 17
arrivals and departures; available distance **8,550 ft**. An aircraft unable to LAHSO: the
position first working it coordinates as required and advises the Arrival controller; the
aircraft **should be assigned Runway 17**; if traffic does not permit, assign Runway 22 with a
gap coordinated with the Runway 17 Arrival, and **2-mile spacing at the threshold** with the
preceding arrival to the other runway, both ways. Ghost targets may be coordinated.

**7-4 CRDA.** Applied when LAHSO is not used. Ghosts must be displayed on the **Runway 22** final
at all times, optionally on Runway 17. **6 miles spacing at touchdown** on each runway (not
required when nothing is landing the other). Runway 22 traffic should be within **half a mile of
the middle of the gap between ghost targets** at the FAF.

**7-5 Position responsibilities.**

- Arrivals: Runway 22 is normally **left traffic**, Runway 17 normally **right traffic**. Runway
  22 arrivals get **North Local 123.95**; Runway 17 arrivals get **West Local 123.67**, if split.
- Feeder gate assignment: **KKILR and MUSCL to North Feeder; BLUEM and NITZR to South Feeder;
  BAINY to South Arrival; TORGY to South Feeder.** NOTE — South Feeder is delegated the BLUEM and
  NITZR ingress route airspace **to the 10-mile range ring**.
- Feeder handoffs: South Feeder to Runway 17 Arrival, **TORGY 8,000**, **BLUEM/NITZR 9,000**.
  North Feeder to Runway 22 Arrival, **MUSCL 8,000**, **TORGY/BLUEM/NITZR 9,000**.
- **TORGY, BLUEM and NITZR assigned Runway 22 are far-gate crossovers.** South Feeder normally
  hands them to North Feeder as: **NITZR — depart SAVVG heading 020, jets 11,000, turboprops
  9,000. DELZY — depart SAVVG heading 020, jets 10,000, turboprops 9,000. TORGY — depart HDEEE
  heading 090, jets 11,000, turboprops 9,000.** If an aircraft must come off the RNAV STAR,
  issue a heading placing it **within 10 NM of MSP**: **NITZR jets 11,000, BLUEM jets 10,000,
  TORGY jets 11,000.**
- Satellite: STP must coordinate with M98 to organize the flow to/from STP affecting the MSP
  Runway 22 final. **All MIC IFR arrivals operating east of MIC, and Runway 06 and 14
  departures, must be coordinated with M98.**

---

## Chapter 8 — Obstructions and TMU

Obstructions (8-1), by **MSP radial/DME** and MSL elevation. `*` = not on video maps.

| Obstruction | MSP R/DME | Elevation |
|---|---|---|
| Big Lake Tower | 323/036 | 2,454 |
| Nowthen Tower | 343/028 | 2,048 |
| **Arden Hills/Shoreview Antennas** | **018/011** | **2,438** |
| St. Paul Tower * | 013/007 | 1,539 |
| Meriden Tower * | 184/051 | 1,830 |
| Rosemont Tower | 144/014 | 1,753 |
| IDS Building | 338/005 | 1,743 |

*The Shoreview antennas at 018/011, 2,438 ft are the obstruction behind the recurring Shoreview
MVA pattern in the OJT review — this is the first hard number for it in the reference set,
though the MVA itself is on the Appendix E chart and is still unread.*

**8-2** ZMP TMU is used in heavy traffic, severe weather, or when a Traffic Management
Specialist is otherwise needed; the role requires the VATUSA National Traffic Flow Management
Course.

---

## Appendix D — Runway change checklist (M98 side)

Self-brief via IDS: TRACON SIAs, PIREPs, NOTAMs, forecast, SIGMETs/AIRMETs, special ops, Tower
SIA. Verbal briefing: items not in IDS, position/airspace configuration, coordination
agreements, communication status and traffic (special activity, point-outs, holding, primary-only
targets, handed-off aircraft still in airspace, releases, VFR receiving services, aircraft
standing by, remaining traffic).

Runway change: coordinate with Tower and all TRACON positions the **last arrival and departure
on the current runway and the first arrival on the new runway**, and resolve conflicting traffic
in the new ACDA during the transition; **advise Arrival when the new ACDA is available**;
coordinate before departing on the new runway; when moving between a parallel configuration and
a parallel-plus-17/35 configuration, coordinate with Departure and Satellite to obtain or release
airspace; **when changing to 30/17, remind Feeder and Arrival of the 8,000 ft airspace base.**

---

## Appendix G — Scratch pad entries

**MSP arrivals** — visual, instrument and VFR arrivals:

| Runway | RNAV(GPS) | RNAV(RNP) | ILS/LOC | Visual |
|---|---|---|---|---|
| 12L | ZL1 | YL1 | 12L | VL1 |
| 12R | ZR1 | YR1 | 12R | VR1 |
| 30L | ZL3 | YL3 | 30L | VL3 |
| 30R | ZR3 | YR3 | 30R | VR3 |
| 17 | — | — | L17 | V17 |
| 35 | Z35 | Y35 | I35 | V35 |
| 4 | G04 | — | L04 | V04 |
| 22 | G22 | — | L22 | V22 |

**Visual separation** — when the pilot has accepted responsibility for separation from the
preceding aircraft, enter a `VV` code. *(The source table's row/value alignment is scrambled in
extraction; the codes present are `VVN VVS VV4 VV2 VV5 VV7` across the MSP arrival runway groups
12L/30R, 12R/30L, 4, 22, 35, 17, and `+VV` for all satellite arrivals. **Verify the pairing
against the PDF before relying on a specific code.**)*

**Satellite airports.** Scratch pad 1 = **airport of intended landing** (STP, FCM, ANE, MIC, LVN,
21D, SGS). Scratch pad 2 = approach type then termination:

| 1st char — type | 2nd/3rd char — termination |
|---|---|
| I = ILS | F = Full stop |
| G = RNAV (GPS) | M = Missed approach |
| L = Localizer | PM = Published missed |
| N = NDB | VV = Pilot-provided visual separation |
| V = VOR | |

Example — N12345 requesting ILS 30 to a published missed at LVN: `<+IPM, slew, enter>`.
Other entries: `A/W` air work, `HLD` holding, `PIX` photo flight, `GEP` holding at GEP,
`FGT` holding at FGT, `2ER` tour.
