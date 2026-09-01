# MSP Tower — Order MSP ATCT 7110.26G CHG 1, and the MSP-M98 Letter of Agreement

Sources, extracted 2026-08-31:

- `source-docs/MSP_ATCT_7110_26G.pdf` — **MSP ATCT 7110.26G CHG 1, effective March 31, 2026**.
  Cancels MSP/M98 Order 7110.26G (2024-07-28). Appendices A-J are images and are **unread**.
- `source-docs/MSP_M98_LOA.pdf` — **MSP-M98 Letter of Agreement, effective March 31, 2026**.
  Cancels the 2024-07-28 edition. Attachments 1-7 are images and are **unread**; Attachment 8
  (scratch pads) is text and is reproduced in `claude_M98_SOP_Reference.md`.

The two documents were split out of a single combined order in 2024 and still overlap heavily.
Where they say the same thing, the LOA is cited, since that is the inter-facility rule.

---

## 1. Airspace — who owns what (LOA 5.a, SOP 2-1-1)

M98 delegates to MSP Tower:

1. **Surface up to and including 3,000 ft within the 6-mile ring** of the Minneapolis Class B
   (the SOP words it as "within 6 NM of the MSP Runway 30L DME"), **including the airspace within
   1.5 NM either side of the localizer(s) from the 6-mile ring to the final approach fix(es)**
   where approaches are active.
2. When **landing Runways 30L/R and Runway 35**, the airspace inside the 6-mile ring **between
   the eastern boundary of the satellite "corridor" over MSP west to the departure dispersal
   area, surface up to and including 4,000 ft**.
3. **In the Departure Dispersal Area (DDA): surface up to and including 7,000 ft, and over the
   FCM and MIC satellite cutouts from 3,500 ft up to and including 7,000 ft.**
4. **Within the DDA extensions: 4,000 ft up to and including 7,000 ft.**
5. **Within the Runway 35-12 configuration ACDA cutout: surface up to and including 5,000 ft.**

> **On the DDA.** Items 3 and 4 are the complete published description of the Departure Dispersal
> Area's vertical extent, and they match what `CLAUDE.md` already records. **There is still no
> boundary polygon** — the DDA is drawn in LOA Attachment 1 and SOP Appendix A, both images.
> Roadmap item 7 (modelling the DDA) remains blocked on geometry, not on altitudes.

For VFR, each M98 position holds VFR altitudes to the base of the overlying airspace and **down
to 500 ft above MSP airspace**. **M98 may transition VFR aircraft not cleared for an instrument
approach through the DDA outside the Class B without coordination**; aircraft that will *loiter*
in the DDA (photo missions, tours, surveys) must be coordinated individually, and **M98 assumes
separation responsibility with MSP departure traffic**.

**Visual separation** (LOA 5.b) is authorized between aircraft under either facility's control
when weather permits. MSP may use **pilot-applied visual separation for successive departures,
no more than 2 successive aircraft via the same SID**.

---

## 2. MSP Tower positions (SOP 2-1-3)

| Position | Freq | Callsign | STARS symbol |
|---|---|---|---|
| Clearance Delivery (CD) | 133.200 | MSP_DEL | 6 |
| Ground Metering (GH) | 133.575 | MSP_H_GND | — |
| Ground Control South (GCS) | 121.900 | MSP_S_GND | 2Y |
| Ground Control North (GCN) | 121.800 | MSP_N_GND | 2Y |
| Ground Control West (GCW) | 127.925 | MSP_W_GND | 2Y |
| Local Control North (LCN) | 123.950 | MSP_N_TWR | T |
| **Local Control South (LCS)** | **126.700** | **MSP_S_TWR** | V |
| Local Control West (LCW) | 123.675 | MSP_W_TWR | Y |
| Arrival ATIS | 135.350 | MSP_A_ATIS | — |
| Departure ATIS | 120.800 | MSP_D_ATIS | — |

LCS is the primary combined frequency. **LCN is responsible for 30R/12L; LCS for 30L/12R and
4/22; LCW for 17/35.** LCW and LCN both combine to and decombine from **LCS**. GCW and GCN are
normally combined to **GCS**.

*Note for the tool: 123.95 (LCN) and 123.675 (LCW) are the frequencies M98 7110.26A 7-5a names
as "North Local" and "West Local" for 17/22 arrivals — 7-5a quotes West Local as 123.67, the
SOP as 123.675. Use 123.675.*

---

## 3. Arrivals — the M98/MSP handover (LOA 7)

- M98 must coordinate with MSP on **all non-STARS-tracked aircraft landing MSP**.
- **M98 delegates control and responsibility to MSP for separation of aircraft within MSP
  delegated airspace on same, parallel and/or converging finals.**
- **Transfer of control point:** for an **instrument approach**, the **final approach fix**; for
  a **visual approach**, the point at which the aircraft on final **enters the MSP airspace
  lateral boundary**.
- **Communications transfer: M98 instructs aircraft to contact MSP on the appropriate Local
  Control frequency between 6 and 8 miles from the runway.**
- **Short approaches.** To avoid ASDE-X-initiated go-arounds, instruct all aircraft turning
  inside the FAF to join **at or outside a 2-mile final** — "BMJ47 make at least a 2 mile final."
- To enable automatic data transfer, **Local Control quick-looks the Arrival Control full data
  blocks**.

### Go-arounds and missed approaches (LOA 7.h, SOP 6-2-2)

MSP issues headings for separation inside its airspace, and **traffic permitting climbs to an
initial 3,000 ft and scans the over-the-top corridor**. It then decides whether the aircraft goes
to the **departure dispersal area** or into **satellite airspace**:

- **Dispersal area:** climb to **6,000 ft** and issue an **"inside" heading** if possible. If the
  go-around will not be on an inside heading, subsequent departures must not be assigned a
  heading or fix *inside* the go-around, so it can return to the downwind.
- **Satellite airspace:** coordinate a heading and altitude with the Satellite controller.

NOTE — normally the go-around goes to the dispersal area; satellite airspace is used when the
dispersal area is unavailable. An aircraft may be vectored in the ACDA if it will not enter
satellite or departure airspace, or back into the ACDA with a point-out to satellite; either way
a heading and altitude must be coordinated with the ACDA controller.

MSP then makes a handoff (automated permitted) and assigns the receiver's frequency. The LOA's
worked examples, useful as phraseology models:

```
(CC) "R, CC, Handoff."     (R) "R"
(CC) "One mile west MSP, DAL123, go-around, heading 260 climbing to 6,000."
(R)  "DAL123, Radar Contact. FQ"        (CC) "OE"

(CC) "G, CC, Handoff."     (G) "G"
(CC) "One mile north MSP, DAL123, go-around, heading 040 climbing to 4,000."
(G)  "DAL123, Radar Contact. MA"        (CC) "JB"
```

### Converging Runway Operations, 30L/R with 35 (LOA 7.i, SOP 7-3)

**CRO is defined as landing Runway 35 while departing Runway 30L/R.**

**Criteria.** The MSP and M98 CICs, with TMU input, decide whether traffic warrants CRO.
**Ceiling must be 2,200 ft or higher. Visibility must be 5 miles or greater.** *(These are the
two numbers the tool enforces as the CRO weather floor; the citation is
**MSP-M98 LOA 7.i.2)(b) and (c)** — `CLAUDE.md` cites it as "LOA 7.i", which is correct to the
paragraph.)* A ceiling means **4/8 coverage or greater**; clouds may make CRO unworkable while
not qualifying as a ceiling. Runway 35 wind: gusts must be included when referencing the wind
charts; **no tailwind if the runway is contaminated**; the crosswind component including gusts
must be within the Attachment 7 wind chart.

**Arrival Departure Window.** The ADW is the point on the final approach course by which a
departing aircraft must have begun takeoff. The **No Departure Zone** is everything outside it.

| Runway pair | Front gate (NM) | Rear gate (NM) |
|---|---|---|
| 35/30L | 2.26 | 0.39 |
| 35/30R | 2.35 | 0.32 |

**Procedures.** When weather is forecast conducive, MSP and M98 **advertise 30s/35 on the ATIS
as long as the weather holds — the configuration must not alternate between 30s/35 and 30s/17**.
**Heavy aircraft and props must land the parallels** unless coordinated. **CRDA is used at the J
position to ghost 30L aircraft onto the 35 final**; Runway 35 traffic may also be ghosted onto
the 30L final for the S and N controllers. **M98 must provide balanced arrivals to 30L, 30R and
35** — matched sets, without undue delay.

Spacing: aircraft landing 35 must be **within 0.5 NM of the ghost target when the 30L traffic
reaches a 2-mile final** (the ghost sits 1.5 NM behind the 30L aircraft). With no 30L ghost
available, the **35 arrival must be 5 NM behind the preceding 35 arrival at 170 kt or less when
the preceding one touches down**. Aircraft landing **30R should be as close to 1 NM behind the
30L aircraft as practicable**. Required spacing to **30L/30R is no less than 5 NM at touchdown,
170 kt or less**; MSP CIC/TMU advises M98 CIC/TMU when more is needed.

**Transitioning out of CRO.** M98 may keep working the 30L/30R/35 configuration with the traffic
already inside M98 airspace while actively transitioning to the alternate; MSP and M98 TMU
coordinate the urgency. During the transition **Local Control must comply with the ADW, or stop
departing 30L and 30R until there are no more Runway 35 arrivals**.

**Runway 35 reduced separation on final** (LOA 7.j): when **Runway 35 is the only advertised
landing runway**, separation may be reduced to **2.5 NM in-trail on the final within 10 NM of the
runway**.

In the tower, the 30/35 heading ownership is: **LCN owns 315 through 360 inclusive off 30R**
(initial heading 320 to all aircraft; LEINY, DWN and SMERF stay on 320); **LCS owns 260 through
300 inclusive off 30L**; **LCW owns "40 and 4" — heading 040 at 4,000 ft — within tower
airspace**. Neither LCN nor LCS may turn an aircraft to track south of runway heading before it
passes its Virtual Runway Intersection Point.

---

## 4. Departures

### Initial altitudes (LOA 8.h, SOP 3-2-3)

| Requested final altitude | Jets | Turboprops | Piston |
|---|---|---|---|
| **9,000 or above** | **7,000** | **5,000** | **4,000** |
| **8,000 or below** | **4,000** | **4,000** | **4,000** |

The LOA annotates these `DRL` and `EGK`; the SOP gives the same numbers without the annotation.

### SIDs, preferred runways and initial fixes (SOP 3-2-4)

| Departure | Preferred runway(s) | Direction | Initial fix | Transition |
|---|---|---|---|---|
| COULT | 17, 12L/30R | SE | TAXEE | DLL |
| KBREW (Kay-Brew) | 12L/30R | NW | HRBEK | FAR |
| ORSKY (Or-skee) | 17, 12R/30L | S | RUMLE | ONTIJ |
| RST (Rochester) | 17, 12R/30L | SE | FOBUG/DOKTR | ALO |
| SCHEP (Shepp) | 17, 12R/30L | SW | MCONL | RXANN |
| WLSTN (Wellstone) | 12L/30R | NE | SNINE | GRB |
| ZMBRO (Zumbro) | 17, 12R/30L | SE | JEDET | ODI |
| SMERF (Smurf) | 12L/30R | W | ZOGAP | none |
| LEINY (Line-ee) | 12L/30R | W | BOTNE | none |

Aircraft that do not file a SID get the **Minneapolis Nine (MSP9)** or current version, which
does not need to be amended into the route string. Aircraft unable a SID get **MSP9 to the first
filed fix** (which must be inside ZMP airspace); unable both, **radar vectors to the first filed
fix**, with coordination to the affected M98 sectors for obstacle and airspace clearance.

*Nine turbojet SIDs are named here — the same nine the tool carries, with COULT, KBREW, LEINY,
ORSKY, RST, SCHEP, SMERF, WLSTN, ZMBRO. This document gives their **initial fixes**, which the
existing `claude_MSP_SID_Reference.md` should be checked against.*

### Departure frequency assignment (SOP 3-2-5)

When Departure and/or Satellite are split:

- **30s; 12s; 30s/17; 30s/35** — COULT, WLSTN, MSP-to-BRNRD, KBREW, SMERF, LEINY: **125.75**.
  ZMBRO, RST, ORSKY, SCHEP: **124.7**.
- **12s/17; Land 17/22 depart 12s** — WLSTN, MSP-to-BRNRD, KBREW, SMERF, LEINY: **125.75**.
  COULT, ZMBRO, RST: **132.97**. ORSKY, SCHEP: **124.7**.
- **Land 35, depart 12s** — WLSTN, MSP-to-BRNRD, KBREW, SMERF, LEINY, SCHEP, ORSKY: **125.75**.
  COULT, ZMBRO, RST: **124.7**.
- **Land 35 depart 35/30s/4; Land 17 depart any; Land 22 depart any; Land 4 depart any** —
  WLSTN, COULT, ZMBRO, RST: **124.7**. ORSKY, SCHEP, LEINY, SMERF, KBREW, MSP-to-BRNRD:
  **125.75**.

Anything not on a listed SID: find the fix pair in STARS (`MULTI FUNC, D, BEACON CODE, enter`),
compare to Appendix H, and issue the frequency from the Satellite Airspace Split map.

### Departure headings and the D/R/L coordination rule (LOA 8.g)

Local Control issues initial headings that keep departures inside the delegated departure
airspace, and:

- **Depart 12L/R, any landing configuration:** if LC gives **"R" traffic** a heading tracking
  **on or north of 105**, coordinate with **"D"**. If LC gives **"D" traffic** a heading tracking
  **south of 105**, coordinate with **"R"**.
- **Land 12L/R, depart 12L/R and 17:** 12L/R departures for **FOD or ONL get a 230 heading for a
  turn at three miles from the departure end**, with **3 MIT for same-fix departures off
  different runways**. **M98 has control for left turns of "D" traffic (ABR, FAR, WLSTN) off
  Runway 17 regardless of assigned heading.** Maximum Runway 17 departure track is **215**. The
  joint-use track for 12L/R departures is **105**, with the same coordination rule between "L"
  and "D" either side of it.
- **Depart 30L/R, any landing configuration:** if LC gives **"R" traffic** a heading tracking
  **on or north of 300**, coordinate with **"D"**; **"D" traffic** south of **300**, coordinate
  with **"R"**.
- **Land 30L/R, depart 30L/R and 17:** a Runway 17 departure simultaneous with a same-fix 30L/R
  departure must be **3 MIT, no visual separation, no divergence** (visual or divergence only in
  unusual circumstances). **M98 has control for right turns of "D" traffic off Runway 17.**
  On a 30/17, all Runway 17 departures must track **no less than 170**.
- **Runway 17 same-fix spacing:** landing 12L/R or 30L/R and departing 17, **3 MIT
  turbojet-to-turbojet and turboprop-to-turboprop over the same fix, no divergence**.
- **Land 30L/R and 35, depart 30L/R:** turboprops assigned **ODI and RST filed 11,000 and above**
  get a **260 track**, treated as one fix, **3 MIT, no visual separation**.
- **Land 35, depart 12L/R:** maximum departure track southeast of MSP is **135 from the Runway
  12R departure end**. Non-turbojets assigned into Sector 8 (FOD, ONL) that are turned right go
  to **"E"**. **SCHEP and ORSKY turbojets must track at or north of 105.**

### Non-advertised runways (LOA 8.i)

MSP CIC coordinates with all affected M98 positions. **Runway 4 departures** must be coordinated
with the **G Satellite controller**, assigned **4,000 ft, heading 040, frequency 121.2**, and MSP
must coordinate with STP Tower. **Runway 22 departures** get a **DDA heading and initial 3,000
ft**, then climb to the table altitude once inside the DDA.

### VFR departures (LOA 8.j, SOP 3-2-6)

Requesting only to leave the Class B without advisories: **at or below 2,700 ft**, with a
departure frequency matching the tower frequency for the route and configuration, and a
transponder code from **0341-0346**. Requesting radar advisory service in M98 airspace: **at or
below 3,500 ft**, assigned to the appropriate satellite position on a **discrete** code.

### Automated point-outs, MSP to/from M98 (LOA 8.k)

APOs are flashed to **all staffed MSP Local Control positions**. Eligible:

- Aircraft descending in the **North Pie**, except when MSP is landing 35 while departing 30L/R.
- Aircraft descending in the **South Pie**, same exception.
- Aircraft on **RNAV approaches to FCM 28L or 28R**, except when MSP is departing Runway 17.
- Aircraft **transiting the DDA on the RNAV RWY 32 approach to MIC**.
- Aircraft **transiting the DDA on RNAV or ILS approaches to STP**.
- Aircraft on **visual approaches to FCM**.

---

## 5. Runway use, noise and quiet hours (LOA 9, SOP 2-2)

**Runway Use System preference**, descending:

| Departure preference | Arrival preference |
|---|---|
| Runways 12L/12R | Runways 30L/30R |
| Runway 17 | Runway 35 |
| Either Runway 4 or 22 | Either Runway 22 or 4 |
| Runways 30L/30R | Runways 12L/12R |

**Departures are considered noisier than arrivals and are selected first**; the arrival
configuration is then chosen to match. The **M98 and MSP CICs collaboratively determine the
arrival and departure runways** — configuration is never a free pick, which is the rule the tool
already enforces.

- **Mendota Heights/Eagan (12L/12R departures).** Under non-simultaneous conditions, **12R gets a
  heading for an approximate 105 ground track; 12L gets approximately 119** (extended centerline).
  Diverging separation: 12R on or north of the 30L localizer; 12L between a 090 track and 15
  north of the 12R heading. Turbojets off 12L making a left turn **maintain runway heading** until
  beyond the departure end. Proceed on the assigned heading **until at least 3 miles from the
  departure end**, then assign on-course.
- **30L/30R arrivals.** Aircraft south of the 30L localizer arriving 30L or 30R must be **vectored
  to at least a 4-mile final**, and a visual approach clearance must say so — *"Cleared visual
  approach Runway 30L, make at least a 4 mile final for noise abatement."*
- **30L/R turbojet dispersal tracks:** **KBREW 320, WLSTN 340, COULT 360**; MSP9 by initial fix —
  **FAR 320**; **BRD, DLH, HYR, EAU or GRB 340**; **DLL 360**.
- **Runway 4 and 22.** Runway 22 departures turning right **remain runway heading until leaving
  1,500 ft MSL** and are **not issued a heading greater than 350 until past the 12L localizer**.
  Runway 4 departures avoid overflying the Veterans' Administration Hospital.
- **Runway 17 departures.** Turbojets and Group IV/V aircraft assigned a heading west of runway
  heading initially fly **runway heading**, turned after the **3.03 DME** mark. When traffic
  permits, assign **230** to follow the river.
- **Quiet hours, 2230-0600 local.** Maximize the Mendota Heights/Eagan corridor by departing
  12L/R and landing 30L/R. RUS midnight preference: **1. Land 30L/R depart 12L/R (opposite
  direction). 2. Land 35 depart 12L/R, or land 30L/R depart 17. 3. Straight 12L/R. 4. Straight
  30L/R.** Runway 17 south and westbound departures fly runway heading to 3.03 DME then 230,
  typically 0015-0530 local, and Departure may turn them on course on initial contact. If
  Runway 4/22 is needed, give equal priority to either end. Applies to all aircraft with noise
  characteristics at or above a C-130 or turbojet.
- **SOP 2-2-10: land 12s and 35 while departing 12s is prohibited** (go-around concerns).
  *This is a tower-order prohibition and is separate from the M98 SOP's note that Land 35 /
  Depart 12 is no longer prohibited — different configurations, do not conflate them.*

---

## 6. Opposite Direction Operations (LOA 10, SOP 7-4)

**Cutoff point is 10 NM from the threshold of the runway of intended landing.** Aircraft on a
downwind or vectored away are not inside the cutoff until established on a base leg that falls
within it.

**MSP applies the cutoff between arriving and departing aircraft. M98 applies the cutoff between
successive ODO arrivals.** Traffic advisories go to both aircraft. **Opposite-direction
same-runway operations with opposing traffic inside the cutoff point are not allowed unless an
emergency exists.** **Visual separation is not authorized** for IFR aircraft conducting ODO to
the same runway. ODO from parallel runways must provide a **turn away from the opposing traffic
inside the cutoff point**; visual separation may be applied after that turn is issued.

**The MSP controller verbally requests opposite direction *departures*; the M98 controller
verbally requests opposite direction *arrivals*.** For VFR, Local Control must state the phrase
**"OPPOSITE DIRECTION"** when coordinating.

---

## 7. Depart 17 / arrive 17-22 (LOA 11)

**Weather must be at least 1,400 ft ceiling and 4 miles visibility** — the same floor as
M98 7110.26A 7-1.

**LAHSO spacing:** Runway 17 arrivals **4 miles at touchdown** (not required with nothing landing
22); Runway 22 arrivals **6 miles at touchdown** (not required with no departure traffic).
**M98 must advise MSP of aircraft landing Runway 22 that will not LAHSO.**

**Departures:** **LEINY, DWN and SMERF are treated as one fix, 3 MIT** (jet-jet / prop-prop).
**FAR and BRD are treated as one fix, 3 MIT.** Tower turns **DLH/WLSTN east with a minimum 3
MIT**.

**Go-arounds:** traffic permitting, all Runway 17 or 22 go-arounds should **make a right turn and
return to Runway 17**, whatever landing runway was originally assigned.

---

## 8. Runway change and closure coordination (LOA 6.b, 6.c)

Both facilities use their runway-change checklists; the **M98 and MSP CICs coordinate a change
time and the new configuration**. A time is coordinated for the **last departure estimated
airborne**, with MSP CIC naming the callsign; a time is coordinated for the **last arrival
estimated at the final approach fix**, with **M98 CIC naming the callsign**. NOTE — if
practicable, the last aircraft on the former configuration should be an arrival. When 17/35 is
used with 30s or 12s, departure headings may be restricted for the new configuration.

**Runway closures and openings are verbally coordinated between the CICs, and M98 must not allow
aircraft past the transfer-of-control point unless the runway has been verbally coordinated
open.**

**Flying Cloud Runway 28 RNAV arrivals when MSP is departing Runway 17** (LOA 6.a): M98 points
the aircraft out to MSP in a timely manner, and MSP transfers communications of the departure
after separation is ensured.

---

## 9. LAHSO at MSP (SOP 7-1)

Authorized on **Runway 30L to hold short of Taxiways A9 and W9** (ALD **8,150 ft**) and on
**Runway 22 to hold short of Taxiway K** (ALD **8,550 ft**), LAHSO groups 1-9.

Requirements: **30L needs ceiling 1,000 and visibility 3; Runway 22 needs ceiling 1,400 and
visibility 4**; runway dry and uncontaminated; **tailwind on the hold-short runway calm, under 3
knots**; no reported wind shear; announced on the ATIS; aircraft must be listed in JO 7360.1;
traffic exchanged and read back obtained.

**Departure Decision Area** for the 22-LAHSO / 17-departure pairing: from a **quarter-mile final
on Runway 22** to the point the LAHSO arrival's nose wheel touches down. **No Runway 17 takeoff
clearance while the Runway 22 LAHSO arrival is in the DDA**, and a cleared Runway 17 aircraft
must **begin roll before the Runway 22 arrival reaches a quarter-mile final**. The Highway 62 /
Highway 55 interchange is the visual landmark for that quarter-mile point. Rejected landing
procedure for the Runway 22 LAHSO aircraft is a **climbing right turn to 260** until conflicts
with the Runway 17 departure are resolved, then normal M98 go-around coordination.

Also: **traffic departing Runway 12R must be rolling by the time Runway 22 traffic is 1.5 miles
from the runway end**, and when Local positions are combined, **Runways 17 and 22 must be worked
at the same Local position**.

---

## 10. Items that touch the M98 trainee indirectly

- **Transfer of control on departures (SOP 6-3-3).** Before telling an aircraft to contact
  Departure, Local confirms STARS auto-acquisition; if it does not acquire, Local performs a
  radar handoff to the appropriate M98 departure controller **within 2 NM of the runway end**,
  including position, callsign, type, and SID or destination. **Transfer of communications
  constitutes transfer of control**, subject to the LOA. **MSP has automatic releases** for
  departures from advertised runways into the dispersal area unless otherwise specified.
- **Strip timing (SOP 6-1-1g).** Local forwards flight progress strips to M98 in time for the
  radar controller to have the strip **before the frequency change and prior to 1 mile from the
  departure end**.
- **Departure data blocks (LOA 8.a-8.b).** Local ensures the correct full STARS data block is
  displayed on all departures receiving radar service, and **advises Departure of any departure
  that has not auto-acquired within two miles**. Departure and Satellite are responsible for
  ensuring auto-acquisition happened.
- **Departure and Satellite may alter the initial heading of any MSP departure** provided
  separation from preceding and succeeding departures is ensured, and **Departure may climb MSP
  departures initially assigned 5,000 or higher within the dispersal area** on the same
  condition (LOA 8.c-8.d).
- **MSP must inform the affected Satellite position of any departure unable to meet a published
  crossing restriction or climb gradient** (LOA 8.e), and **must advise the appropriate Satellite
  controller before departing an IFR aircraft landing FCM or STP** (LOA 8.f).
- **Ground taxi by departure fix (SOP 5-2-2)** — which runway a departure is taxied to is driven
  by the fix and the M98 sector it will enter (`D`/`K`/`G` versus `R`/`E`/`L`). On a 12s, for
  example, **12R takes ZMBRO, RST, ORSKY, SCHEP or anything entering "R" or "E"**, and **12L
  takes LEINY, DWN, SMERF, KBREW, DLH, BRD, WLSTN, COULT or anything entering "D", "K" or "G"**.
