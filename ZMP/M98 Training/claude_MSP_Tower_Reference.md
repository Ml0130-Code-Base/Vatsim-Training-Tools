# MSP Tower — Order MSP ATCT 7110.26H, and the MSP-M98 Letter of Agreement

Sources, extracted 2026-08-31 and **re-read against the November 2026 revisions on 2026-11-08**:

- `source-docs/MSP_ATCT_7110_26H.pdf` — **MSP ATCT 7110.26H, effective November 1, 2026**, 76 pages
  (7110.26G CHG 1 was 83). Its own cancellation line says *"MSP Order 7110.26G CHG 1, eff. Nov 1, 2026"*
  — **as-written: it names the order it cancels with the new effective date**, and the rest of the
  document is 26H. Kept and not corrected. Appendices are images and are **unread**.
- `source-docs/MSP_M98_LOA.pdf` — **MSP-M98 Letter of Agreement, effective November 1, 2026**, 104 pages.
  Cancels the LOA dated 2026-03-29 (the March edition was effective 2026-03-31 and cancelled the 2024-07-28
  one). The attachments are images; **Attachment 8 (scratch pads) is text** and is reproduced in
  `claude_M98_SOP_Reference.md`.

The two documents were split out of a single combined order in 2024 and still overlap heavily.
Where they say the same thing, the LOA is cited, since that is the inter-facility rule.

## What changed on 2026-11-01 (word-for-word diff of the text layers, 2026-11-08)

**MSP-M98 LOA** (paragraph numbers are the new ones — `h` gained a sibling, so old 8.h is now 8.i):

| Para | Before (2026-03-31) | Now (2026-11-01) |
|---|---|---|
| 5.a(3)-(5) | the DDA verticals in prose: surface-7,000; FCM/MIC cutouts 3,500-7,000; extensions 4,000-7,000; Runway 35-12 ACDA cutout surface-5,000 | **one line: the DDAs "are depicted in Attachment 4".** The prose figures are **gone from the text layer** — they are drawings now, and the deck's `DDA_VERTICALS` cites a paragraph that no longer says them |
| 5.b(2) | pilot-applied visual separation for successive departures, **no more than 2 via the same SID** | **no more than 2 via the same Departure Gate, as depicted in Table 1** |
| **Table 1** | *(none)* | **Standard Instrument Departure Gates — SID · three-letter scratchpad · gate name.** Fourteen rows; below |
| 7.c-d | CRDA at J, then the balanced-arrivals sentence | the same two sentences **in the other order** (now (c) balanced, (d) CRDA) |
| 8.a | *(none)* | **Runway 17: an aircraft that will be assigned a heading in lieu of the initial RNAV fix must be verbally coordinated and shown on the flight progress strip.** Old 8.a-g shift to 8.b-h |
| 8.h(2)(a) | 12L/R departures **for FOD or ONL** get a 230 heading three miles out | **SNOWZ aircraft** departing 12L/R get a 230 heading three miles out (3 MIT same fix, different runways) |
| 8.h(2)(b), (4)(b) | "D" traffic (**ABR, FAR, WLSTN**) | "D" traffic (**BITEZ, KBREW**) off 17 left; (4)(b) still names *ABR, FAR, WLSTN* for the right-turn case — **as written, not updated** |
| 8.h(4)(c) | on a 30/17, **all** Runway 17 departures track no less than 170 | …all Runway 17 departures **that will enter Satellite Airspace at or below 5,000 ft** |
| 8.h(4)(d) | *(none)* | **30L/R departures must be issued a heading no farther left than 215** |
| 8.h(5) *(old)* | **Runway 17 same-fix spacing** (3 MIT turbojet-to-turbojet, turboprop-to-turboprop, no divergence) and **Land 30L/R and 35, depart 30L/R: ODI/RST turboprops 260 track** | **both deleted**; old (7) *Land 35, depart 12L/R* is now (5) |
| 8.i | initial departure altitudes (was 8.h) | the same table, plus **`*RWY 17 ZMB and TTZ Gates on 30/17 — 170° track and 5,000 E`** |
| 8.j / 8.k / 8.l | non-advertised runways / VFR / APO (were 8.i / 8.j / 8.k) | unchanged text; re-lettered. 8.l(2)(e) and (f) are the same sentence twice (STP RNAV or ILS), as in the March text |
| 9.e | dispersal tracks by the retired SIDs: KBREW 320, WLSTN 340, COULT 360; MSP9 by fix | **KBREW 320, NRTHN 340, SNUPE 360, BUNYN 340; MINNEAPOLIS One: KBR 320; BAB, GPR, PRR, PKE 340; SNU 360** |
| 10 | ODO fix names by retired SIDs (LEINY/DWN/SMERF, FAR/BRD, DLH/WLSTN) | BITEZ one fix; KBREW and BUNYN one fix; tower turns BUNYN and NRTHN east |
| Att. 8 | `HLD`, `GEP` and `FGT` holding entries; VV entered beside the runway group | holding entries **removed** (`A/W`, `PIX`, `2ER` stay); VV is **`+VVN` … `+VV7`**, secondary scratchpad |

**Table 1 — Standard Instrument Departure Gates** (LOA 5.b(2); read from the page with `pdftotext -raw`, which
keeps the row grouping that `-layout` loses). **The table has no transition column**:

| SID | Scratchpad | Gate name |
|---|---|---|
| KBREW | **KBR** | KBREW Gate |
| BUNYN | **GPR** | GPERS Gate |
| | **BAB** | BAYBB Gate |
| NRTHN | **PRR** | PRRCH Gate |
| | **PKE** | PIKKE Gate |
| SNUPE | **SNU** | SNUPE Gate |
| ZMBRO | **BRO** | ZMBRO Gate |
| HTDSH¹ | **ZMB** | ZMBRO Gate |
| | **TTZ** | TOTTZ Gate |
| TOTTZ | **TOT** | TOTTZ Gate |
| SNOWZ | **MGL** | MOGLL Gate |
| | **PLW** | PLOWW Gate |
| BITEZ | **PAG** | PAGOZ Gate |
| | **TIK** | TICKK Gate |

¹ *HTDSH SID is only authorized for Runway 17 departures on a 30s/17 configuration.* **DUHCK has no row**
(it is a satellite-only SID). The same fourteen codes appear in the vZMP PBN Phase II briefing p.23-24, which
*does* give transitions (`claude_M98_PBN_Phase_II_Reference.md` §4) — and adds `DUK` for DUHCK. **The
transition-to-code assignment therefore rests on the briefing alone; the order and LOA corroborate the codes
and the gate names, not which transition takes which.** Pilot-applied visual separation now counts **gates, not
SIDs**: no more than two successive aircraft through one gate — and two codes share the ZMBRO gate and two share
the TOTTZ gate (ZMB/BRO, TTZ/TOT), which is a fact the table prints and the LOA does not remark on.

**MSP ATCT 7110.26H** was reorganised (record of changes: *M98 PBN Phase II update*). **Removed from the
tower order:** 2-2-3 Runway Use System, 2-2-6 Runway 4/22 departures, 2-2-9 Quiet hours, 2-2-10 *Land 12s,
land 35 prohibited*, 2-5-2 Special taxi considerations, **3-2-3 IFR altitude assignments**, **3-2-5 IFR
departure frequency assignments**, 5-1-4 Combining/decombining, 6-1-4, 6-2-2 Go-arounds, **6-3-1 Departure
headings**, 6-3-2, 6-3-3, 7-3-3 Arrival Departure Window, **all of Section 7-4 Opposite Direction Operations**
and 7-4-5 Midnight. **Not lost:** the RUS table, 4/22 departures, quiet hours and the dispersal tracks are in
**MSP-M98 LOA 9** (unchanged apart from 9.e above); the initial altitudes are in LOA 8.i; ODO is LOA 10. **Gone
from every document read: the departure-frequency-by-SID table (old 3-2-5) and the *land 12s / land 35* tower
prohibition.** **Added or rewritten:** **3-2-3 IFR routing assignments now carries the new SID table**; 5-1-2
GC areas of jurisdiction; 6-1-2 LC area of jurisdiction; 6-2-1 *TDW usage mandatory*; 6-3-1 split-LC headings
(30s/35: Runway 30R from 315, 30L from 260 to 300; 12s/17: Runway 12L 090 to 105 "or as coordinated"; RNAV fix
or headings off 17); 6-4-2 helicopters; 7-2-3 *Waivers*; 7-3-3(2) a heavy departing 30L against a Runway 35
arrival needs a heavy gap through CIC or TMU.

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
3. **The Departure Dispersal Areas (DDA) are depicted in Attachment 4** (LOA 5.a(3), 2026-11-01).
   *Until 2026-10-31 this paragraph and the next two said the verticals in words — surface to 7,000;
   FCM and MIC cutouts 3,500 to 7,000; extensions 4,000 to 7,000; the Runway 35-12 ACDA cutout surface
   to 5,000 (LOA 5.a(3)-(5), 2026-03-31). **They are not in the November text layer.** The November
   Attachment 4 diagrams carry `70/0` over the dispersal area and `30/0` over the Class B, and the
   Land 35 - Depart 12 page adds a go-around area (280) at `40/0` with a `40/35` cutout and a `50/0` wedge;
   the March figures are not contradicted by what was read, but they are no longer stated. **Checked 2026-11-08: the three dispersal-area sheets (Runway 12/17, Runway 30, Land 35 - Depart 12) are byte-identical to the ones carved from the March LOA** — so the picture the polygon was traced from has not changed.*

> **On the DDA.** The altitudes in `DDA_VERTICALS` were **verbatim** from LOA 5.a(3)-(5) in the March
> edition and are now **carried from that edition**, not from the November text. **The traced polygon in
> `claude_M98_DDA_Geometry.md` stands**: its three source sheets are byte-identical in the November file (an `md5`
> of the carved JPEGs, 2026-11-08), and the sheets read `70/0` over the dispersal area and `30/0` over the Class B,
> agreeing with the March prose. **What did change is the rest of the attachment set** — 60 embedded JPEGs became 22
> (the Attachment 1 airspace pages and the Appendix A diagrams), and a count of embedded JPEGs cannot say whether
> they were redrawn or re-encoded. The MVA chart (Attachment 5) is also byte-identical. See the gap analysis Part 6.

For VFR, each M98 position holds VFR altitudes to the base of the overlying airspace and **down
to 500 ft above MSP airspace**. **M98 may transition VFR aircraft not cleared for an instrument
approach through the DDA outside the Class B without coordination**; aircraft that will *loiter*
in the DDA (photo missions, tours, surveys) must be coordinated individually, and **M98 assumes
separation responsibility with MSP departure traffic**.

**Visual separation** (LOA 5.b) is authorized between aircraft under either facility's control
when weather permits. MSP may use **pilot-applied visual separation for successive departures,
no more than 2 successive aircraft via the same Departure Gate, as depicted in Table 1** (it was
*the same SID* until 2026-10-31).

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

### Initial altitudes (LOA 8.i; SOP 3-2-3 until 2026-10-31)

| Requested final altitude | Jets | Turboprops | Piston |
|---|---|---|---|
| **9,000 or above** | **7,000** | **5,000** | **4,000** |
| **8,000 or below** | **4,000** | **4,000** | **4,000** |

The LOA annotates these `DRL` and `EGK`. **The tower order's 3-2-3 altitude paragraph is deleted in 26H, so
the LOA is now the only place the table is stated.** **New in the November LOA, under the table:**
*`*RWY 17 ZMB and TTZ Gates on 30/17 — 170° track and 5,000 E`* — read, with 8.h(4)(c), as a Runway 17
departure through the ZMB or TTZ gate on a 30/17 flying a 170 track and 5,000 initially. **The trailing `E` is
unexplained in the document** (the table's own annotations are `DRL` and `EGK`); it is quoted as printed.

### SIDs, preferred runways and initial fixes (SOP 3-2-3, 7110.26H; was 3-2-4 in 26G)

**Rewritten for the SID set that went live 2026-10-29.** The tower order's table now carries the CIFP 261029
set, as printed:

| Departure | Runway(s) | Direction | Initial fix | Transitions |
|---|---|---|---|---|
| BITEZ | 12L/30R | W | HHOBA | DKOTA, SMERF, LEINY |
| BUNYN (Bunyan) | 12L/30R | N | JBUGG | DLH, KVUSI |
| HTDSH (Hotdish)\* | 17 | SE | ITZME | ALO, BRIBE, OANNA, OHHMY, ZZIPR |
| KBREW (Kay-Brew) | 12L/30R | NW | HRBEK | KEETN |
| NRTHN (Northern) | 12L/30R | NE | SIEDL | AROUND, TTOWN |
| SNOWZ | 17, 12R/30L | SW | MANCY | DABOY, ISTIQ, LLUKY, SMTHA, ZZEEE |
| SNUPE (Snoopy) | 17, 12L/30R | SE | PNUTZ | DLL |
| TOTTZ (Tots)\* | 17, 12R/30L | SE | HTDSH | ALO, FOOLZ, OANNA, OHHMY, ZZIPR |
| ZMBRO (Zumbro)\* | 17, 12R/30L | SE | JEDET | BRIBE |

\* *Assign the HTDSH departure, regardless of departure runway, when MSP is in a 30/17 configuration. Assign
TOTTZ/ZMBRO in all other configurations.* **Three readings the table forces, each a conflict or a gap the tool
must name rather than settle:**

1. **HTDSH is listed for Runway 17 only** here and **"only authorized for Runway 17 departures on a 30s/17
   configuration"** in LOA Table 1 footnote 1 — while the **asterisked note says assign HTDSH *regardless of
   departure runway* in a 30/17.** The two are reconcilable only as *"on a 30/17, HTDSH replaces ZMBRO and TOTTZ
   for every runway's traffic that would have flown them, and the SID's own runway is 17"* — the tower order does
   not say that. **It contradicts the owner's ruling of 2026-10-18** (HTDSH1 and SNOWZ1 valid off every runway),
   which was made on the CIFP data before any order spoke to it. Named here; the deck warns and does not refuse
   (`CLAUDE.md`, *Departures*).
2. **FOOLZ, not FOOLS.** The order spells TOTTZ's fifth transition **FOOLZ**, as the briefing did; CIFP 261029
   carries **FOOLS**. Two documents now say FOOLZ and the coded source says FOOLS: one is wrong and this file
   cannot tell which. The deck keeps CIFP's spelling.
3. **The runway column is the tower's assignment, not a restriction CIFP codes** — CIFP codes **no** runway
   transition for the other seven SIDs and only the Runway 17 segment for HTDSH1 and SNOWZ1.
   **SNOWZ1 is listed for 12R/30L and 17, not for 12L/30R; the deck allows it off every runway.**

> **Owner rulings, 2026-11-08.** (1) **HTDSH is only for a 30/17** — it is assigned at MSP in a 30/17 configuration and in no other; ZMBRO and TOTTZ in every other. This supersedes the 2026-10-18 "valid off every runway" ruling **for HTDSH1's configuration only**; it stays valid off every *runway* within a 30/17 and SNOWZ1 is unchanged. The deck refuses HTDSH1 at MSP outside a 30/17. (2) **FOOLS is the spelling** — CIFP 261029's, so the order's and the briefing's FOOLZ is a typo in those documents, not a second transition. Readings 1 and 2 above are settled by it on the deck side; the documents themselves still differ.

**Minneapolis One (3-2-3 b, was *Nine*):** aircraft that file no SID get the **Minneapolis One Departure
(MSP1)** or the most current version, **which does not need to be amended into the route string**; unable an
assigned SID, **MSP 1 to the first filed fix** (inside ZMP airspace); unable both, **radar vectors to the first
filed fix**, with coordination to the affected M98 sectors. **The order now says One, as the briefing and the
FAA Not-in-CIFP workbook did** (`claude_MSP_SID_Reference.md`). The dispersal tracks it carries moved to LOA 9.e
(below) and are now worded by gate scratchpad rather than by fix.

### Departure frequency assignment — **deleted from the tower order in 26H** (was SOP 3-2-5)

*Kept below as the March reading, because no November document restates it and the SID names in it are the
retired set's. **It is not current and no November text replaces it.** The frequency each departure gets is
not stated anywhere read on 2026-11-08.*

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

### Departure headings and the D/R/L coordination rule (LOA 8.h; was 8.g until 2026-10-31)

Local Control issues initial headings that keep departures inside the delegated departure
airspace, and:

- **Depart 12L/R, any landing configuration:** if LC gives **"R" traffic** a heading tracking
  **on or north of 105**, coordinate with **"D"**. If LC gives **"D" traffic** a heading tracking
  **south of 105**, coordinate with **"R"**.
- **Land 12L/R, depart 12L/R and 17:** **SNOWZ** aircraft departing 12L/R get a **230 heading for a
  turn at three miles from the departure end** (it said *FOD or ONL* until 2026-10-31), with **3 MIT for
  same-fix departures off different runways**. **M98 has control for left turns of "D" traffic (BITEZ,
  KBREW) off Runway 17 regardless of assigned heading.** Maximum Runway 17 departure track is **215**. The
  joint-use track for 12L/R departures is **105**, with the same coordination rule between "L"
  and "D" either side of it.
- **Depart 30L/R, any landing configuration:** if LC gives **"R" traffic** a heading tracking
  **on or north of 300**, coordinate with **"D"**; **"D" traffic** south of **300**, coordinate
  with **"R"**.
- **Land 30L/R, depart 30L/R and 17:** a Runway 17 departure simultaneous with a same-fix 30L/R
  departure must be **3 MIT, no visual separation, no divergence** (visual or divergence only in
  unusual circumstances). **M98 has control for right turns of "D" traffic off Runway 17.**
  On a 30/17, all Runway 17 departures **that will enter Satellite Airspace at or below 5,000 ft** must
  track **no less than 170**; **30L/R departures must be issued a heading no farther left than 215**
  (both new or narrowed 2026-11-01; the right-turn sentence still names ABR, FAR and WLSTN, as written).
- **Deleted 2026-11-01:** the *Runway 17 same-fix spacing* rule (3 MIT, no divergence, landing 12L/R or
  30L/R and departing 17) and the *land 30L/R and 35, depart 30L/R* ODI/RST turboprop 260-track rule.
- **New 2026-11-01 (8.a):** a Runway 17 aircraft that will be given a heading in lieu of the initial RNAV fix
  must be **verbally coordinated and shown on the flight progress strip**.
- **Land 35, depart 12L/R:** maximum departure track southeast of MSP is **135 from the Runway
  12R departure end**. Non-turbojets assigned into Sector 8 (FOD, ONL) that are turned right go
  to **"E"**. **SCHEP and ORSKY turbojets must track at or north of 105** (the retired names, still printed so in the November LOA 8.h(5)(c)).

### Non-advertised runways (LOA 8.j; 8.i until 2026-10-31)

MSP CIC coordinates with all affected M98 positions. **Runway 4 departures** must be coordinated
with the **G Satellite controller**, assigned **4,000 ft, heading 040, frequency 121.2**, and MSP
must coordinate with STP Tower. **Runway 22 departures** get a **DDA heading and initial 3,000
ft**, then climb to the table altitude once inside the DDA.

### VFR departures (LOA 8.k, SOP 3-2-4)

Requesting only to leave the Class B without advisories: **at or below 2,700 ft**, with a
departure frequency matching the tower frequency for the route and configuration, and a
transponder code from **0341-0346**. Requesting radar advisory service in M98 airspace: **at or
below 3,500 ft**, assigned to the appropriate satellite position on a **discrete** code.

### Automated point-outs, MSP to/from M98 (LOA 8.l)

APOs are flashed to **all staffed MSP Local Control positions**. Eligible:

- Aircraft descending in the **North Pie**, except when MSP is landing 35 while departing 30L/R.
- Aircraft descending in the **South Pie**, same exception.
- Aircraft on **RNAV approaches to FCM 28L or 28R**, except when MSP is departing Runway 17.
- Aircraft **transiting the DDA on the RNAV RWY 32 approach to MIC**.
- Aircraft **transiting the DDA on RNAV or ILS approaches to STP**.
- Aircraft on **visual approaches to FCM**.

---

## 5. Runway use, noise and quiet hours (LOA 9; the tower order dropped its RUS, 4/22 and quiet-hours paragraphs 2026-11-01)

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
- **30L/R turbojet dispersal tracks (LOA 9.e, rewritten 2026-11-01):** **KBREW 320, NRTHN 340, SNUPE 360, BUNYN 340**;
  Minneapolis One by gate scratchpad — **KBR 320**; **BAB, GPR, PRR, PKE 340**; **SNU 360**. *Until 2026-10-31
  this read KBREW 320, WLSTN 340, COULT 360 and MSP9 by fix — FAR 320; BRD, DLH, HYR, EAU, GRB 340; DLL 360. The
  three tracks did not move; the fixes are now named by gate. That KBR is the old FAR, and BAB/GPR/PRR/PKE the old
  BRD/DLH/HYR/EAU/GRB, is an inference from the matching tracks, not something either document says.*
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
- **SOP 2-2-10 (*land 12s, land 35 prohibited*) is deleted from the tower order in 26H** (2026-11-01). The M98
  SOP had already dropped its own prohibition in 26A, and the **ZMP-M98 LOA now has a Knock-It-Off rule for a
  35/12s configuration** (`claude_ZMP_Reference.md`) and the M98 7110.26B Appendix A has a *Land 35 - Depart 12*
  diagram. **Land 35 / Depart 12 is now an expressly supported configuration in every document read.** The
  tower-order sentence this bullet used to carry is gone, so the distinction it drew no longer exists.

---

## 6. Opposite Direction Operations (LOA 10; tower SOP 7-4 deleted 2026-11-01)

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
