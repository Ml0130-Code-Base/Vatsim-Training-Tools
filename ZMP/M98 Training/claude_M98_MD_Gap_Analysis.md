# M98 Reference Gap Analysis — Project Sources vs. the Markdown Layer

**Date:** 2026-08-31 · **Method:** full read of every project source (both LOAs, the M98–Satellite LOA, the M98–RST LOA, all four satellite tower orders, MSP ATCT 7110.26G CHG 1, M98 TRACON 7110.26A, the OJT notes, the training tool) compared line-by-line against the ten `claude_*.md` reference documents. FOR SIMULATION USE.

**Verdict in one line:** the markdown layer covers the ZMP-M98 LOA arrival structure, the STAR/SID geometry, and the TRACON-internal SOP well — but three entire documents (the Satellite-Towers LOA, the RST LOA, the four satellite tower orders) have **zero** markdown coverage, the MSP tower order is only mined for two paragraphs, and several high-training-value numbers (Departure Dispersal Area verticals, initial-altitude table, the Shoreview obstruction data, midnight operations) live only in the sources. One outright error was found (Crystal's runway inventory).

---

## Part 1 — Highest training value first

These map directly onto the standing coaching items. If only five things get folded into the markdown layer, make it these.

### 1. Departure Dispersal Area vertical ownership — MSP-M98 LOA 5.a(3)–(5)
The number-one recurring issue (losses of separation in sessions 3, 5, 6) and the markdown layer never states what the Departure Dispersal Area actually *is* vertically:

- **Departure Dispersal Area: surface up to and including 7,000 ft** — MSP tower's airspace.
- **Over the FCM and MIC satellite cutouts: 3,500 up to 7,000 ft** (satellite keeps the floor below 3,500 there).
- **Departure Dispersal Area *extensions*: 4,000 up to 7,000 ft.**
- **Runway 35-12 configuration Approach Control Descent Area cutout: surface up to 5,000 ft.**
- VFR aircraft not on an instrument approach may transit the dispersal area **outside the Class B without coordination**; anything **loitering** (photo, tour, survey) must be coordinated individually, with M98 keeping separation from MSP departures (5.a(7)).

The training implication the sources make explicit: the FCM/MIC cutouts at 3,500 are the legal path a satellite arrival/departure can use *under* the dispersal area — the reason "just miss it entirely" works below 3,500 near those fields and not elsewhere.

### 2. Shoreview obstruction hard data — M98 7110.26A §8-1
The Shoreview Minimum Vectoring Altitude issue (sessions 1 and 5) has an anchor in the SOP the markdown layer doesn't carry:

- **Arden Hills/Shoreview Antennas: MSP 018011 (018 radial / 11 DME), 2,438 ft.**
- Neighbors worth knowing: St. Paul Tower MSP 013007 at 1,539 ft (not on video maps), IDS Building MSP 338005 at 1,743 ft, Big Lake Tower MSP 323036 at 2,454 ft, Nowthen Tower MSP 343028 at 2,048 ft, Rosemont Tower MSP 144014 at 1,753 ft, Meriden Tower MSP 184051 at 1,830 ft (not on video maps).

The trainer's 3,500-until-established rule for STP Runway 14 arrivals now has its "why": a 2,438 ft antenna sitting roughly on the STP 14 final approach fix geometry.

### 3. Initial departure altitude table — MSP-M98 LOA 8.h (mirrored in MSP tower order 3-2-3)
Never reproduced in any markdown file, and it decides **which M98 seat works each departure**:

| Filed altitude | Jets | Turboprops | Piston |
|---|---|---|---|
| 9,000 or above | **7,000 → D/R/L** (Departure) | **5,000 → D/R/L** | **4,000 → E/G/K** (Satellite) |
| 8,000 or below | **4,000 → E/G/K** | **4,000 → E/G/K** | **4,000 → E/G/K** |

Low-filers and pistons off MSP go to the **Satellite** seat at 4,000 — directly relevant to the combined-seat drills and to the N172ER-type shape.

### 4. Midnight operations — ZMP-M98 LOA §5 + MSP-M98 LOA 9.g/9.h + MSP tower order 2-2-9
Given the 19:30–06:00 work schedule, this is the regime most likely running when live monitoring actually happens, and it has zero markdown coverage:

- **When coordinated, 2230–0530 local (ZMP-M98 LOA §5):** ZMP clears all M98 landers **direct destination**, pilot's-discretion descent to 10,000 for anyone at/above 10,000, arrivals at/below 10,000 stay at altitude, and **everyone gets 124.7 (MSP_R_APP)** — the whole TRACON collapses onto the R frequency, not H. M98 clears departures **via the first fix in the route**, points them out to affected Center sectors, and climbs turboprops/props to 17,000 (or lower on request).
- **Quiet hours 2230–0600 (both facility orders):** Runway Use System preference order becomes (1) Land 30s–Depart 12s, (2) Land 35–Depart 12s or Land 30s–Depart 17, (3) straight 12s, (4) straight 30s. Runway 17 south/westbound departures: runway heading to **3.03 DME then 230°** (typically 0015–0530); departure control may turn on course on initial contact.
- **Opposite-direction midnight rule (MSP-M98 LOA 9.h):** the *advertised landing runway* is considered the configuration; if MSP anticipates **more than a 15-minute total relay or 5-minute runway delay** for departures, coordinate a possible change to the crossed-runway operation.

### 5. Crystal (MIC) runway inventory — the one outright error
`claude_M98_Satellite_Reference.md` lists MIC as "rwys 14L/32R, 14R/32L (+ 06/24)". **MIC 7220.3N says otherwise:** Runway **14R/32L is permanently closed and is now Taxiway G**. The actual inventory is a single **14/32** plus **parallel 6L/24R and 6R/24L**. The M98 SOP's 17-22 chapter (7-5c(2)) confirms it by requiring coordination for "Runway **06** and 14 departures" at MIC. The Satellite Reference's flow section (14 in southeast wind / 32 in northwest wind) still holds; the runway list needs the fix.

---

## Part 2 — Documents with zero markdown coverage

### A. M98 – Satellite Towers LOA (ANE/FCM/MIC/STP, eff. 11/30/2025)
The entire towered-satellite interface. Contents not in any markdown file:

- **Releases via the Run-Down Tab List** with STARS keyboard entries: request `F13, ACID, (direction)(heading range)`; M98 issues `F13, <list ID>, ACID`; resequence, cancel, list-move, and quick-look entries all specified. **List IDs: ANE = PO, FCM = PF, MIC = PM, STP = PP.** (Session-5 notes mention the pattern; the LOA is the authority.)
- **Standard IFR departure headings and initial altitudes by field/runway (Attachment 2):**
  - ANE: 270° clockwise to 090° (Runway 18 = right turn), all runways **3,000**.
  - FCM: 180° clockwise to 300°, **3,000** off 28L/28R/18, **2,500** off 10L/10R/36. (Tower order adds: Runway 10 departures must get **right** turns unless coordinated.)
  - MIC: **320°** all runways, **3,000**.
  - STP: Runway 32 → 030°–045° at **3,000**; Runways 13/14 → 010°–080° at **2,500**.
- **Missed-approach assignments:** M98 issues planned misses ANE 360°/2,500 · FCM 230°/2,500 · MIC 320°/2,500 · STP 060°/2,500. Towers instruct *unplanned* misses to the same headings, except **MIC unplanned = 320°/3,000** (a deliberate asymmetry worth drilling).
- **Overflights at or above 3,000 MSL** transit satellite-tower airspace **without prior coordination** (must be displayed on their displays or verbally coordinated).
- **FCM may side-step/circle** an arrival to any non-opposite runway without coordination (FCM assumes separation); **STP may interchange 31↔32 and 13↔14** on landing clearances.
- **Scratchpad conventions:** Scratch Pad 1 = destination airport; Scratch Pad 2 = approach type (I/G/L/N/V) + termination (F full stop, M missed, PM published missed, VV pilot visual separation); other entries A/W, HLD, PIX, GEP, FGT, 2ER. This is the decoder for the "unorthodox" satellite scratchpads flagged in session 1 — and it's replicated in M98 SOP Appendix G with the satellite "+VV" convention.

### B. M98 – Rochester (RST) LOA (eff. 3/31/2026) — Tower Enroute Service
Entirely absent, and it's the origin story for every BLUEM/KASPR arrival:

- RST assigns **BLUEM to all capable turbojets** landing MSP; **KASPR** to other turbojets (verbally coordinated) and to **turboprops capable of 200 knots or greater**.
- **Entry altitude + frequency by MSP configuration:** landing 12s → 9,000 (Feeder, 135.47) jets and props · landing 30s → props 7,000 (**Satellite, 134.7**) / jets 9,000 (Feeder) · 30s while departing 17 → 9,000 (Feeder) · **landing 35 → 7,000 to "35 Arrival" on 118.72** · Runway 4 → 8,000 · 17 or 22 → 9,000 (all 200-knot-capable aircraft).
- **KASPR STAR airspace is defined as 4 NM either side of centerline — widened to 7 NM on the east side when MSP lands Runway 35.**
- Traffic RST worked through ZMP Sector 5 landing in M98: **4,000**. Everything else landing in M98 exits RST/Sector 8 airspace at **6,000**. Overflights enter M98 at **4,000 / 6,000 / 8,000**; overflights at 7,000+ are individually coordinated **at least 5 minutes** before entry.
- **M98 → RST at 3,000 / 5,000 / 7,000 / 9,000** (odd thousands), with 7,000/9,000 traffic kept clear of (parallel to or diverging from) the KASPR STAR; hand to RST on **119.8 or 119.2**.
- **Transfer-of-control authority: ±30° of track after handoff**; BLUEM-arrival transfer must be complete **before the aircraft crosses BLUEM**; RST may descend/turn Owatonna arrivals on transfer.
- **ZMP Sector 7 owns RST's delegated airspace when RST approach is closed** — pairs with ZMP-M98 LOA 4.g(16): in that state, KASPR turboprops cross **DELZY at 7,000** and pistons exit RST airspace at **6,000**.

### C. The four satellite tower orders (ANE 7110.65, FCM 7110.1A, MIC 7220.3N, STP 7220.3Q — all CHG 1, 11/30/2025)
The markdown layer covers satellite fields only from the radar side. The tower orders add:

- **Frequencies:** ANE — LC 132.4, GC/CD 121.85, ATIS 120.625 · FCM — GC/CD 121.7, LCS 119.15, LCN 125.2, ATIS 124.9 · MIC — GC/CD 121.6, LC 120.7, ATIS 124.475 · STP — GC/CD 121.675, LC 119.1, ATIS 118.35.
- **Visual-approach advertising minima (per field, not one number):** FCM visibility ≥ 7 and ceiling ≥ **2,100** AGL · MIC ≥ 7 and ≥ **2,200** · STP ≥ 7 and ≥ **2,300**, and STP must **advise M98 when weather crosses those minima either direction**.
- **Instrument-approach advertising logic:** FCM landing 28 → RNAV 28L/28R and/or **VOR 36 circle to 28L**; landing 18 → an approach to **10R circle to 18**. MIC → RNAV to the runway in use.
- **STP specifics:** **Runway 31 is not available for IFR departures**; simultaneous 31/32 handled per FAA JO 7110.65 3-9-9 (nonintersecting converging); **Runway 13 clear zone** must be clear during a Runway 13 approach; Class D = 4.1 NM with an SGS cutout; guard Maltese cross procedures.
- **MIC specifics:** Class D = 3.8 NM radius, surface to 2,500 AGL (3,369 MSL), truncated at the Class B base; **North Memorial Hospital helipad MY77, 3.7 NM south-southeast**; local IFR clearances issued "via radar vectors"; visual reporting points list (includes Shoreview Antennas 10.5 E).
- **FCM specifics:** split-local rules (LCN north of the mid-parallel line + Runway 36 departures; LCS south + Runway 18), taxiway Alpha 30-foot constraint, aircraft over 50 ft / jets can't hold between the parallels, **floatplane operations at Lake Riley and Bryant Lake** (advisories only, no clearance), **Class B base over FCM is 3,000** with prescribed phraseology, visual reporting point list, calm-wind selection factors (weather, fewer runway crossings on 28s, sun).
- **ANE:** clearance delivery issues **3,000 to all IFR**; no calm-wind runway; missed approach 360°/2,500; standard heading appendix.

---

## Part 3 — MSP ATCT 7110.26G CHG 1 (eff. 3/31/2026): mined for two paragraphs, the rest untouched

The markdown layer pulls §6-3-1 (dispersal tracks) and the 2-5-1 runway-crossing example. Everything else is uncovered. The items with radar-side value:

- **Tower positions/frequencies** including Ground Metering 133.575, Ground Control West 127.925, Local Control West 123.675, Clearance Delivery 133.200, Arrival ATIS 135.350 / Departure ATIS 120.800. (The 17-22 chapter of the M98 SOP routes Runway 22 arrivals to **North Local 123.95** and Runway 17 arrivals to **West Local 123.67** when split.)
- **MSP delegated airspace verticals (2-1-1, matching LOA 5.a):** surface–3,000 within the 6-mile ring; 1.5 NM either side of active localizers from the 6-mile ring to the final approach fixes; on 30s/35, the surface–4,000 slice between the satellite corridor and the dispersal area.
- **Departure frequency assignment by SID and configuration (3-2-5):** e.g. on 30s/12s/30s-17/30s-35 — COULT, WLSTN, MSP9-to-BRNRD, KBREW, SMERF, LEINY → **125.75**; ZMBRO, RST, ORSKY, SCHEP → **124.7**. On 12s/17 and Land 17-22–Depart 12s, COULT/ZMBRO/RST move to **132.97**. On Land 35–Depart 12s, SCHEP and ORSKY move up to **125.75**. Full matrix in the order.
- **Non-SID filers get the MINNEAPOLIS Nine (3-2-4)**; unable both → radar vectors to first filed fix with M98 coordination. The same table carries the official SID phonetics ("Kay-Brew," "Or-skee," "Rochester," "Shepp," "Wellstone," "Zumbro," "Smurf," **"Line-ee"** — same sound as the voicing file's "Liney").
- **VFR departures (3-2-6):** with flight following → at or below **3,500** + Satellite-split-map frequency; without → at or below **2,700**, tower frequency for direction, **squawk 0341–0346**. (The 2,700/3,500 pair also lives in MSP-M98 LOA 8.j; only the 3,500 made it into the markdown.)
- **Ground-side flow (5-2-2):** departure taxi is assigned **by SID to prevent crossovers** — e.g. 30s: Runway 30R gets LEINY/DWN/SMERF/KBREW/DLH/BRD/WLSTN/COULT ("D"/"K"/"G" airspace), Runway 30L gets ZMBRO/RST/ORSKY/SCHEP ("R"/"E" airspace); straight-outs off 30L (LEINY/DWN/SMERF) are never crossovers; all true crossovers need Controller-in-Charge approval. Quiet-hours 30/17: everything departs 17.
- **Split-local heading ownership (6-3-4):** LCN owns 300°–360° off 30R (and 090°-to-15°-north-of-12R off 12L); LCS owns 260°–285° off 30L; LCW owns 170°–285° in 30/17 and 120°–215° in 12s/17. In CRO, **LCN's initial heading is 320°**, LCS owns 260°–300°, and **LCW owns "40 and 4"** (heading 040°, 4,000) inside tower airspace.
- **Noise geometry (2-2-4 through 2-2-8):** 12R ≈ 105° track / 12L ≈ 119° (extended centerline); diverging criteria (12R on/north of the 30L localizer; 12L between 090° and 15° north of 12R's heading); Runway 22 right turns hold runway heading to **1,500 MSL** and no heading past 350° until past the 12L localizer; Runway 4 avoids the Veterans' Administration Hospital; Runway 17 westbound turns issued at the **3.03 DME** mark, with 230° as the low-demand "river" heading; turbojet intersection departures restricted over noise-sensitive paths.
- **Land 12s + 35 / Depart 12s is prohibited (2-2-10)** — see the discrepancy note in Part 6.
- **Land and Hold Short Operations (7-1):** 30L hold short of A9/W9, available landing distance **8,150 ft**, weather ≥ 1,000/3; Runway 22 hold short of Taxiway K, **8,550 ft**, weather ≥ 1,400/4; dry uncontaminated runway, tailwind under 3 knots, no wind shear, JO 7360.1 aircraft groups only. The 17/22 **Departure Decision Area**: no Runway 17 takeoff clearance while the 22 LAHSO arrival is between ¼-mile final and nosewheel touchdown; 17 departures must be rolling before the 22 arrival hits ¼ mile (the Crosstown/Hiawatha interchange is the visual landmark); **12R traffic must be rolling by the time 22 traffic is 1.5 miles out**.
- **Line Up and Wait (7-2):** requires ASDE-X full core alert when paired with a landing clearance; intersection LUAW prohibited sunset–sunrise except at waived intersections (12R at M, A8/W8, A9/W9; Runway 4 at K, S, T, M2/C2, departure-only, one at a time); landing clearance withheld below ceiling 800 / visibility 2 while an aircraft holds in position.
- **Converging Runway Operations tower mechanics (7-3):** Arrival Departure Window gates — **35/30L front 2.26 NM / rear 0.39; 35/30R front 2.35 / rear 0.32**; No Departure Zone and Virtual Runway Intersection Point definitions; no south-of-runway-heading turns before the Virtual Runway Intersection Point; balked-landing management (initial at or above 2,500, right turn over the field to ≈040°).
- **Opposite Direction Operations (7-4, mirrored in LOA §10):** cutoff point = **10 NM from the landing threshold** (downwind/vector traffic doesn't count until established on a base inside it); no same-runway opposite-direction inside the cutoff except emergency; **visual separation not authorized for same-runway opposite-direction IFR**; parallel-runway opposite-direction requires a turn away inside the cutoff before visual separation may apply; MSP requests opposite-direction departures, M98 requests opposite-direction arrivals; midnight 12-departure APREQ.
- **Severe Weather Avoidance / Traffic Management (7-5):** Coded Departure Routes, reroute position preference (Clearance Delivery → Ground → Local).
- **Runway-change checklist (Appendix D):** the coordination sequence (last departure / last arrival call signs, new Approach Control Descent Area availability, "**changing to 30/17 — remind Feeder and Arrival of the 8,000 ft airspace base**").
- **MSP arrival scratchpads (Appendix E, = M98 SOP Appendix G):** ZL1/YL1/12L/VL1 pattern per runway; visual-separation entries VVN/VVS/VV4/VV2/VV5/VV7; A/W, HLD, PIX, GEP, FGT, 2ER.

---

## Part 4 — ZMP-M98 LOA: covered well, with these holes

- **Table 1 non-SID headings** (the SID reference cites its existence but not the values): Sector 10 west of GEP/BAINY **290°–300°**, east **350°–020°** · Sector 09 north of ENCEE **265°–285°** · Sector 08 south of TORGY **210°–240°** · Sector 07 east of KASPR/BLUEM **140°–160°** · **RWA** south of KKILR **100°–130°** · Sector 06 north of AGUDE **040°–060°**. ("RWA" is a receiving-sector designation that appears nowhere in the markdown layer.)
- **4.a:** aircraft entering ZMP need **at least 5 NM constant or increasing** separation when vectored to the same fix on similar tracks.
- **4.b:** ZMP releases **control for descent and turns ±30°** to M98 inside 10 NM of the boundary — with M98 owning the point-outs to affected ZMP sectors *or RST approach*. (The intrafacility mirror, M98 SOP 3-1 "Control for Turns" — 30° within the previous controller's airspace after an accepted handoff — is also missing from the markdown layer.)
- **4.d:** M98 may run 7110.65 5-5-4 minima on M98→ZMP transitions only for **diverging** courses, keeping communications with at least one aircraft until 3 NM lateral exists and divergence is ensured.
- **4.g(13):** ZMP must have **control for descent to 10,000** on M98-exiting RST landers at 25 DME.
- **4.g(14):** OEO/RNH/RGK landers from the east via Sector 5 arrive level at or descending to **4,000**, M98 control within 10 NM of the boundary.
- **17/22 configuration 5.d:** the **triangular airspace north of MSP between and including the Runway 17 and 22 Approach Control Descent Areas must be avoided by overflights below 13,000** — the markdown 17/22 summary carries 5.a–5.c but not this.
- **Midnight operations §5** — see Part 1, item 4.

## Part 5 — MSP-M98 LOA and M98 SOP: partial coverage, missing pieces

**MSP-M98 LOA:**
- **8.g in full.** The markdown layer has fragments (dispersal tracks, 12/17 max 215°, 3 miles-in-trail same fix). Missing: the **105°/300° coordination lines** between "R" and "D" traffic off the 12s/30s; 12s+17 joint-use 105° track with "L"; **FOD/ONL departures off 12L/R get a 230° heading with the turn at three miles**; M98 has control for left/right turns of "D" traffic off Runway 17 regardless of heading; **30/17 Runway 17 departures track no less than 170°**; Runway 17 same-fix spacing (3 miles-in-trail jet-to-jet / turboprop-to-turboprop, **no divergence**, third-aircraft exception); **CRO turboprops on ODI + RST filed 11,000+ → 260° track, treated as one fix, 3 miles-in-trail, no visual**; Land 35–Depart 12s → max track **135°** from the 12R end, non-turbojet Sector 8 (FOD/ONL) right-turns assigned to "E," SCHEP/ORSKY jets at or north of a 105° track. Note **FOD, ONL, and ABR are departure gates the SID reference never names** (they also appear as APO scratchpad letters A and O in SOP 3-3).
- **8.i non-advertised runways:** Runway 4 departure → coordinate with G Satellite, assign **4,000 / heading 040 / 121.2**, plus MSP-to-STP-tower coordination; Runway 22 departure → dispersal-area heading at **3,000**, then climb per the 8.h table once inside.
- **8.k:** the **North Pie and South Pie** descent items (eligible for automated point-out EXCEPT landing 35 while departing 30s) and the requirement that automated point-outs **flash to all staffed MSP local positions**. "North/South Pie" as terminology exists nowhere in the markdown layer.
- **5.b(2):** pilot-applied visual separation for successive departures — **no more than 2 successive via the same SID**.
- **8.c/8.d:** Departure/Satellite may alter any MSP departure's initial heading (separation ensured); Departure may climb departures initially assigned 5,000+ within the dispersal area.
- **Go-arounds (7.h):** initial climb **3,000 and scan the over-the-top corridor**; if the go-around is *not* on an "inside" heading, **subsequent departures must not be assigned a heading/fix inside the go-around** so it can return to the downwind. (The handoff examples made it into the coordination reference; these two rules didn't.)
- **§11 (17-22):** LAHSO-active spacing — Runway 17 arrivals **4 miles at touchdown**, Runway 22 arrivals **6 miles**; M98 advises MSP of non-LAHSO aircraft; departure one-fix groupings (**LEINY/DWN/SMERF one fix 3 miles-in-trail; FAR/BRD one fix; DLH/WLSTN turned east + 3 miles-in-trail**); go-arounds off 17 or 22 → **right turn, return to Runway 17** regardless of assigned runway.

**M98 TRACON 7110.26A (eff. 3/31/2026 — cancels the Nov 30, 2025 CHG 1):**
- Good news first: I verified the STAR reference's 4-4c feeder→arrival floors against this revision — **they match** (the change-log line "Feeder to ACDA altitudes updated" did not invalidate the markdown values for the configs it lists).
- Missing configs: **Land 30s + 35** full floor set (NITZR/BLUEM straight-in to 35 · KKILR/MUSCL **7,000** to the parallels but **9,000 to 35 Arrival** · far gates 8,000 · NITZR/BLUEM to South Arrival at 7,000) and **Land 35 – Depart 12s** (NITZR/BLUEM straight-in, everything else 8,000; Approach Control Descent Area split: North Arrival west of the localizer **including NITZR/TRGET and BLUEM/DELZY**, South Arrival east). The 3/31/2026 change log says this configuration is "no longer prohibited."
- **4-4d feeder gate split, fully enumerated by config** (markdown has only the 4/22 example): 12s/30s configs → North Feeder BAINY+MUSCL+KKILR, South Feeder NITZR+BLUEM+TORGY · 30s+35 → South Feeder is **TORGY only** · Runway 35 configs → North BAINY+TORGY / South MUSCL+KKILR · Runway 17 → North **TORGY only** / South the other four. Boundary note: **the North/South Feeder line is the Runway 30L/12R (or 4/22) localizer** — one runway *south* of the Approach Control Descent Area split line.
- **4-5 crossover fine print:** transfer to Arrival **on the downwind heading**; KKILR→30L is *not* a near-gate crossover for coordination, KKILR→12R is *not* a far-gate crossover; far-gate receiver has **control for speed on contact and turns within the 15-mile ring**; non-descend-via crossovers must be coordinated.
- **4-6:** on 30/17, the **Runway 30L RNAV (RNP) Y approach must not be issued** without MSP tower coordination (it descends into the Runway 17 departure corridor).
- **4-7 turn-on mechanics** (markdown names the high/low concept only): low-side aircraft **level prior to 3 NM from the associated localizer**; everyone stays **at least 3 NM from the extended final** with turn-on altitudes held **until the visual clearance is acknowledged**; **the high-side controller owns separation from low-side aircraft**; best-practice trio (no side-by-side joins, no passing outside the final approach fix, intercepts under 30°).
- **4-2f Area R** (Runway 12 / 12-17): Controller-in-Charge may coordinate possession during heavy traffic — the markdown layer never mentions Area R.
- **3-3a automated point-out scratchpad code:** first letter of the departure gate + two-digit altitude — **E**-EAU, **D**-DLL, **N**-ODI, **B**-BRD/DLH, **R**-RST, **F**-FAR, **A**-ABR, **O**-ONL/FOD (example "B12"); STC/MKT-tagged aircraft are presumed descending to 4,000.
- **3-4 / 3-5 concurrent-approach values** (markdown says "carry their own rules" without them): SGS — Runway 34 traffic at **2,500 and established 5 NM prior to HINZZ (localizer) / AVBAF (RNAV)**, Arrival holds MSP traffic at **4,000 to AABEZ/SAMMZ**, SGS missed = 2,500, keep the 30R aircraft until paths have crossed. FCM/35 — FCM 28L/R traffic at **3,000 or lower and established by FGT**, MSP 35 traffic established and **crossing ROZEE at 4,000**.
- **17-22 chapter (7-3 through 7-5):** when LAHSO is *not* used, **Converging Runway Display Aid procedures are mandatory** — ghosts always on the 22 final, both runways spaced to **6 miles at touchdown**, and 22 traffic within **½ NM of the middle of the ghost gap** at the final approach fix. The 17-22 **far-gate crossover matrix**: NITZR — depart SAVVG heading 020°, jets 11,000 / turboprops 9,000 · DELZY — depart SAVVG heading 020°, jets 10,000 / turboprops 9,000 · TORGY — depart HDEEE heading 090°, jets 11,000 / turboprops 9,000; off-STAR headings placed within 10 NM of MSP at NITZR 11,000 / BLUEM 10,000 / TORGY 11,000. Traffic flows: 22 = left traffic, 17 = right traffic. Satellite duties: STP coordinates anything affecting the 22 final; **all MIC arrivals operating east of MIC, and MIC Runway 06 and 14 departures, must be coordinated**.
- **1-8c/e:** each position holds VFR altitudes to the base of overlying airspace and down to 500 ft above tower airspace, and owns wake separation from supers/heavies when vectoring VFR less than 1,000 ft below overlying airspace.

---

## Part 6 — Discrepancies and open questions surfaced by the comparison

1. **MIC runways (error — fix the Satellite Reference):** see Part 1, item 5.
2. **"Land 35/12 – Depart 12" wording:** the M98 SOP change log says that configuration is "no longer prohibited," and the SOP body defines **Land 35 – Depart 12s**. The MSP tower order 2-2-10 (same effective date) still prohibits **landing 12s *and* 35 while departing 12s**. Read literally these are different configurations (35-only landing vs. 12s+35 combined landing), so there may be no conflict — but the change-log phrasing "35/12" is ambiguous enough to be worth an instructor question.
3. **DWN lives on as a label:** the ZMP-M98 LOA reroutes satellite DWN-SID traffic via INUNE GENEO DKOTA (captured in the markdown), yet the MSP tower order (5-2-2, crossover rules) and MSP-M98 LOA §11 still group "LEINY, **DWN**, SMERF" for taxi/one-fix purposes. Treat DWN as a legacy fix-group label at the tower level, not an assignable SID.
4. **"50 NM" vs. 60 NM:** the session-1 note says departures filed above 9,000 must be established "prior to 50 NM"; the LOA says **join within 60 NM**. The SID reference already documents this as trap #1 — no action, just confirming the sources agree with the markdown's resolution.
5. **Tool-version drift:** the project's copy of `m98-training-review.html` opens with "Six issues, seven sessions" — it predates the gate quick-reference/GATE-module version described elsewhere. The configuration map viewer isn't attached to the project at all. If the project is meant to hold current tooling, both need a refresh.
6. **Memory-only knowledge:** the corrected M98 lateral boundary (the nine-point MSP radial/DME ring, including the MSP338039 correction) exists only in conversation memory — no markdown file carries it. If the markdown layer is the canonical reference set, it should land in the STAR or Configuration reference.

---

## Suggested next actions (in priority order)

1. Fold Part 1 items into the existing references: dispersal-area verticals + 8.h initial altitudes → SID reference; Shoreview/obstruction table → a short addition wherever the Shoreview module sources from; midnight operations → Configuration reference; fix the MIC runway list in the Satellite reference.
2. Create one new markdown ("Satellite Tower Interface") absorbing the Satellite-Towers LOA + the four tower orders' radar-relevant content (releases/run-down lists, headings, initial altitudes, missed approaches, advertising minima, scratchpads).
3. Create a second new markdown ("RST Tower Enroute") for the RST LOA — it's small, self-contained, and every BLUEM/KASPR drill quietly depends on it.
4. Add the ZMP Table 1 values, the ±30°/10 NM control-for-turns pair (LOA 4.b + SOP 3-1), and the 17/22 overflight triangle to the SID/STAR references.
5. Add the missing SOP configs (Land 30s+35 floors, Land 35–Depart 12s) and the 4-4d gate-split enumeration to the STAR reference; add the 17-22 crossover matrix and Converging Runway Display Aid values to the Configuration reference.
6. Put the nine-point lateral boundary ring into a markdown file so it survives outside memory.
