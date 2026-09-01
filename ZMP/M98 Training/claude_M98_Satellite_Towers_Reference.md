# M98 Satellite Towers — ANE, FCM, MIC, STP

Sources, extracted 2026-08-31:

- `source-docs/M98_SAT_LOA.pdf` — **M98/Satellite ATCT Letter of Agreement, effective
  2025-11-30**, covering ANE, FCM, MIC and STP together. Initial release.
- `source-docs/ANE_FCT_7110_65.pdf` — ANE FCT 7110.65 CHG 1, eff. 2025-11-30.
- `source-docs/FCM_ATCT_7110_1A.pdf` — FCM ATCT 7110.1A CHG 1, eff. 2025-11-30.
- `source-docs/MIC_ATCT_7220_3N.pdf` — MIC ATCT 7220.3N CHG 1, eff. 2025-11-30.
- `source-docs/STP_ATCT_7220_3Q.pdf` — STP ATCT 7220.3Q CHG 1, eff. 2025-11-30.
- `source-docs/M98_ATCT_Reference.pdf` — one-page M98 Satellite ATCT Ops Reference Guide.

This complements `claude_M98_Satellite_Reference.md`, which covers the satellite *arrival
procedures*; this file covers the *towers* and the M98-to-tower interface.

---

## 1. The one table that matters most

Pulled from the M98/SAT LOA Attachment 2 and the M98 ATCT Reference card, cross-checked against
each tower's own order. Where the two disagree it is noted.

| | **ANE** | **FCM** | **MIC** | **STP** |
|---|---|---|---|---|
| Class D | SFC-3,400 | SFC-3,400 | SFC-3,400 | SFC-3,200 |
| **IFR initial altitude** | **3,000 (all runways)** | **28L/R, 18: 3,000**<br>**10L/R, 36: 2,500** | **3,000 (all)** | **32: 3,000**<br>**13, 14: 2,500** |
| **Standard departure heading** | **18: right turn 270 clockwise to 090**<br>**9, 27, 36: 270 clockwise to 090** | **all runways: 180 clockwise to 300**<br>(Runway 10 departures must be issued **right** turns unless coordinated) | **all runways: 320** | **32: 030 clockwise to 045**<br>**13, 14: 010 clockwise to 080** |
| **Missed approach** | **heading 360, 2,500** | **heading 230, 2,500** | **heading 320** — LOA 6.a.3 says **2,500** when M98 issues it, **3,000** when the tower issues an unplanned one (6.b.3); MIC 3-5b.1 says **2,500**. **Unreconciled; verify.** | **heading 060, 2,500** |
| Tower / Local | 132.4 ANE_TWR | 119.15 FCM_S_TWR (primary)<br>125.2 FCM_N_TWR | 120.7 MIC_TWR | 119.1 STP_TWR |
| Ground / CD | 121.85 ANE_GND | 121.7 FCM_GND | 121.6 MIC_GND | 121.675 STP_GND |
| ATIS | 120.625 | 124.9 | 124.475 | 118.35 |
| **Run-Down list ID** | **PO** | **PF** | **PM** | **PP** |
| **Hours (M98 ATCT Reference)** | 1300-0300Z Oct-Apr<br>1300-0400Z May-Sep | 1200-0300Z 1st Sun Nov - 2nd Sat Mar<br>1200-0400Z 2nd Sun Mar - 1st Sat Nov | 1300-0300Z Oct 1 - Apr 30<br>1300-0400Z May 1 - Sep 30 | 1200-0400Z Mon-Fri<br>1300-0400Z Sat/Sun |

> **On the Run-Down list IDs.** The LOA's quick-reference table is column-shifted in text
> extraction: the header row reads `ATCT / PO / ANE / PF / FCM / PM / MIC / PP / STP`. The
> reading above pairs each airport with the code printed after it. **Verify against the PDF
> before wiring these into anything** — the offset could be one row either way.

> **On the hours.** These come from the one-page reference card, which carries no effective date.
> They are the only published hours for the satellite towers in the pull, and they matter because
> "towers open or closed" is a frame the trainee sets. Treat as a working default.

> **On the Class D ceilings.** The reference card gives 3,400 / 3,400 / 3,400 / 3,200 MSL. The
> towers' own orders describe theirs in AGL: MIC 3-2 says **2,500 AGL = 3,369 MSL within a 3.8 NM
> radius**, and STP 3-2 says **2,500 AGL within a 4.1 NM radius, except a cutout for SGS**, and
> below the Class B where the Class B is lower. Where MSP Class B is lower than 2,500 AGL,
> **MIC Class D terminates at the base of the Class B**.

---

## 2. M98/SAT LOA — the interface

**Responsibilities (para 5).** M98 provides approach control service to IFR arrivals, departures
and practice instrument approaches at the four tower airports. The towers are responsible for
designated IFR and SVFR operations. Deviations require prior coordination that defines
responsibility and intent.

**M98 must (6.a):**

- **Issue departure releases via the Run-Down Tab List.** Non-standard headings and altitudes are
  verbally coordinated.
- Ensure full data blocks on arriving traffic carry the **scratch pad entries** (Attachment 1,
  identical to M98 7110.26A Appendix G) and the **type aircraft in field four**, unless verbally
  coordinated.
- Issue the missed-approach headings and altitudes in the table above, and **advise the tower of
  any heading or altitude different from those**.
- **Overflights are authorized to transit tower airspace at or above 3,000 ft MSL without prior
  coordination.** Overflight traffic not displayed on the tower's CTRD must be verbally
  coordinated.

**Towers must (6.b):**

- Assign the initial altitudes in the table above.
- **Use the Run-Down Tab List to obtain IFR departure releases from M98**, placing aircraft in
  the list in departure order.
- **Verbally coordinate any change to the Run-Down Tab List**, whether or not the flash has been
  recalled.
- **Verbally coordinate all departures from non-advertised runways and any non-standard heading
  or altitude.**
- **FCM may change an aircraft's runway (side-step or circle) to any non-opposite-direction
  runway without coordination**, assuming separation responsibility with preceding and succeeding
  aircraft.
- **STP may interchange Runway 31 with 32, or Runway 13 with 14, when issuing landing
  instructions.**
- Instruct unplanned missed approaches per the table, and **advise M98 when one occurs**.

**Run-Down Tab List STARS entries** (commas represent a space or new line; Shift+F3 substitutes
for F13):

| Action | Entry |
|---|---|
| ANE requests release | `F13, ACID, (N/S/W/E)(270-090), enter` |
| FCM requests release | `F13, ACID, (N/S/W/E)(180-300), enter` |
| MIC requests release | `F13, ACID, (320), enter` |
| STP requests release | `F13, ACID, (010-080), enter` |
| M98 issues release | `F13, <list ID>, ACID, enter` |
| Tower changes sequence | `F13, ACID, <new sequence #>, enter` |
| Tower cancels request | `F13, ACID, enter` |
| Move the list | `F7, <list ID>, slew` |
| Quicklook the list header | `F7, <list ID>, E, enter` |

Departure direction letters map to runways: **N = Runway 36, S = Runway 18, W = Runway 27 (FCM:
28), E = Runway 09 (FCM: 10)**.

**The workflow, stated plainly on the reference card:** all four towers use the Run-Down Tab List
for every IFR departure. **The tower proposes an initial heading; M98 either approves the release
or calls the tower to coordinate a different heading and release.**

Also from the card: **advise VFR aircraft requesting flight following to remain outside the
Minneapolis Class B before instructing them to contact Departure Control.** Each tower's own
order repeats this — ANE 2-2b, MIC 2-4b, STP 2-5.2 all carry the phraseology
*"Callsign — remain outside of Bravo airspace unless advised to enter, departure frequency
_____, squawk _____."*

---

## 3. ANE — Anoka County/Blaine (ANE FCT 7110.65 CHG 1)

Positions: **Local 132.4**, **Ground/Clearance Delivery 121.85**, ATIS 120.625.

- **Clearance Delivery issues 3,000 ft to all IFR aircraft, expect filed altitude 10 minutes
  after departure.**
- **There is no designated calm-wind runway at ANE** — use the runway most aligned with the wind.
- Missed approaches: **heading 360, 2,500 ft** unless coordinated; advise M98 of unplanned ones;
  **visual approaches may be retained in the pattern**.
- Local coordinates with M98 for: departing IFR, instrument runway change, unplanned missed
  approaches.
- Standard departure headings, climbing to 3,000: **Runway 18 — right turn 270 clockwise to 090.
  Runways 9, 27, 36 — 270 clockwise to 090.**

## 4. FCM — Flying Cloud (FCM ATCT 7110.1A CHG 1)

Positions: **Local South 119.15** (primary; combined callsign FCM_TWR), **Local North 125.2**,
**Ground/CD 121.7**, ATIS 124.9.

- Initial departure altitude: **28L, 28R, 18 = 3,000 ft; 10R, 10L, 36 = 2,500 ft.**
- **SVFR at or below 2,500 ft MSL**, and **at or below 2,000 ft MSL east of the MSP Class B
  8.5 NM boundary**.
- **Split locals** divide the Delta surface area on an east-west line halfway between 10R/28L and
  10L/28R. Runway assignment: **10L to LCN, 10R to LCS; 28R to LCN, 28L to LCS; landing 18 or
  departing 36 to LCN; landing 36 or departing 18 to LCS.**
- **Standard departure heading for all runways is 180 clockwise to 300. Runway 10 departures must
  be issued right turns unless verbally coordinated.**
- **LC may clear IFR arrivals to sidestep to either parallel without coordination when the
  parallels are active.**
- Unplanned missed approach: **turn left or right as appropriate to heading 230, maintain 2,500**
  unless otherwise instructed by M98.
- **Approach in use.** Advertise visual approaches only when **visibility is 7 miles or more and
  ceiling 2,100 ft AGL or more**. Otherwise: 10L/R or 36 in use, advertise a straight-in for the
  active runway; **Runway 28 active, advertise RNAV (GPS) 28L and 28R and/or VOR 36 circle to
  28L**; Runway 18 active, advertise an approach to 10R circle to 18.
- **Bravo phraseology when a transition cannot be approved:** *"The base of the MSP Bravo
  airspace over FCM airport is 3000 feet MSL. Suggest you descend below 3000 or contact MSP
  approach on frequency (frequency). Advise."*
- Visual reporting points: Chaska, Chanhassen, Eden Prairie Center, Excelsior, Hazeltine (Stubr),
  Hopkins, Lake Minnetonka, Lake Minnewashta, Lake Riley, Lake Victoria, **Lake Waconia\***,
  Mound, **Prior Lake\***, Radisson South, Savage, **Shakopee\***, Spring Lake, Staring Lake,
  **Wayzata\*** (`*` = charted VFR checkpoint).
- Float plane operations occur at **Lake Riley and Bryant Lake**; neither is an official seaplane
  base — advisories only, no clearance or separation.

## 5. MIC — Crystal (MIC ATCT 7220.3N CHG 1)

Positions: **Local 120.7**, **Ground/CD 121.6**, ATIS 124.475.

- **Issue 3,000 ft MSL initially to all IFR departures**, expect filed altitude 10 minutes after.
- **Local IFR clearances are issued "via radar vectors."**
- Class D: **3.8 NM radius, surface to 2,500 ft AGL (3,369 ft MSL)**, terminating at the base of
  the MSP Class B where the Class B is lower.
- **Standard departure heading for all runways is 320.** Unplanned missed approach: **heading 320,
  maintain 2,500** unless coordinated. Visual approaches may be retained in the pattern.
- Local coordinates with M98 for: unplanned missed approaches, IFR releases, pilot requests not
  already coordinated, and **when an IFR aircraft cancels IFR**.
- **Runway 14R/32L is permanently closed and is now Taxiway G**, delegated to Ground.
- Multiple runway crossings authorized on 6L/24R and 6R/24L at Taxiways C, D, E, F, G and Runway
  14/32.
- Advertise visual approaches only when **visibility 7 miles or more and ceiling 2,200 ft or
  more**; otherwise advertise the RNAV (GPS) to the runway(s) in use.
- **North Memorial Hospital helipad (MY77) is 3.7 NM SSE of the airport.**
- Visual reporting points include **Shoreview Antennas 10.5 E**, Gopher VOR 5 N, Anoka Airport
  8 NE, City of Anoka 10 N, Coon Rapids Dam 6 NNE, KSTP Antenna 9 ESE, State Fair Grounds 10 SE,
  Downtown Minneapolis 7 SE, Fish Lake 5.5 NW, Golden Valley 7 S, Medicine Lake 5 SW, Lake
  Minnetonka 15 SSW, Bass Lake 4 W, Rogers 13 NW, N. Maple Grove Tower 6 NW, Gravel Pits 4.5 NW,
  Osseo 4.5 NW, S. Maple Grove Tower 4 W.
- **Remember M98 7110.26A 7-5c(2):** on a 17/22, **all MIC IFR arrivals operating east of the
  airport, and all Runway 06 and 14 departures, must be coordinated with M98.**

## 6. STP — St. Paul Downtown / Holman Field (STP ATCT 7220.3Q CHG 1)

Positions: **Local 119.1**, **Ground/CD 121.675**, ATIS 118.35.

- **All IFR departures maintain 2,500 ft MSL**, expect filed altitude 10 minutes after departure;
  **Runway 32 departures get 3,000 ft**. **Runway 31 is not available for IFR departures.**
  **SVFR restricted to at or below 2,500.**
- Class D: **4.1 NM radius of STP, except a cutout for SGS**, up to 2,500 AGL, below and outside
  the MSP Class B.
- Standard departure headings: **Runway 32 — 030 clockwise to 045, initial 3,000. Runways 13 and
  14 — 010 clockwise to 080, initial 2,500.**
- Unplanned missed approach: **heading 060, maintain 2,500** unless traffic requires otherwise;
  advise M98, and advise if a non-standard heading is needed.
- **Visual approaches may only be advertised when visibility is 7 miles or more and the ceiling
  is 2,300 ft AGL or more**, and **Local must advise M98 when the ceiling or visibility crosses
  those minima in either direction**.
- Runways 31 and 32 in simultaneous use are separated per **7110.65 3-9-9, non-intersecting
  converging runway operations**.
- **Runway 13 clear zone must be clear of aircraft when an aircraft is on approach to Runway 13.**
- Multiple runway crossings: **Runway 27 and Runway 31 on Taxiway G; Runway 31 and Runway 32 on
  Taxiway D.**
- Local features: the **West Staging Area** between taxiways W, L, A and D (Ground-owned, used for
  helicopters) and the **Guard Maltese Cross** on Taxiway A abeam the guard ramp — when Local has
  it, Ground must keep aircraft off Taxiway L and Taxiway A north of Taxiway D.
- Visual reporting points: 3M 3.5 E, **Shoreview Antennas 7 NW**, State Capital 2 NW, White Bear
  Lake 11 NNE, State Fair Grounds 6 NW, Hudson 16 E, Stillwater 15 NE, Lake Elmo (21D) 11 NE,
  South St. Paul 5 SE, Pine Bend 12 S.
- **Remember M98 7110.26A 6-3:** STP **Runway 14 departures are restricted to 2,500 ft and
  headings no greater than 080**. And **6-1b**: when MSP is making **instrument approaches to
  Runway 22**, STP Satellite must coordinate **all STP IFR approaches and departures** with the
  Arrival controller. And **7-5c(1)**: on a 17/22, STP must coordinate with M98 to organize the
  flow to and from STP affecting the MSP Runway 22 final.

---

## 7. Cross-references worth keeping straight

- **The satellite arrival routings from ZMP** — GOPHER/GEP, AGUDE, ENCEE, TWOLF crossing
  altitudes, the BITLR routing for STP/ANE/FCM, the FCM/LVN direct-FGT rule — are in
  `claude_ZMP_Reference.md`, not here. They are ZMP-to-M98 rules, not M98-to-tower rules.
- **Concurrent approach restrictions involving these fields** are in `claude_M98_SOP_Reference.md`
  3-4 (MSP 30L/R with SGS 34) and 3-5 (MSP 35 with FCM RNAV 28L/28R).
- **The APO rules that let MSP Tower and M98 point out satellite traffic transiting the DDA** are
  in `claude_MSP_Tower_Reference.md` section 4, LOA 8.k.
- **Satellite scratch pad entries** are identical in all three places they appear (M98 7110.26A
  Appendix G, M98/SAT LOA Attachment 1, MSP-M98 LOA Attachment 8); the canonical copy is in
  `claude_M98_SOP_Reference.md`.
