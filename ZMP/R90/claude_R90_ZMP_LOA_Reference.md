# R90 research notes — ZMP/R90 LOA, Minor TRACON Reference, ZMP Control Towers

Source-of-truth extraction for VATSIM ZMP/R90 controller training. **Nothing below is invented.**
Every operational number carries a paragraph citation. Where a document does not state something,
it is written as "not stated in `<file>`".

## Documents read (in full)

| # | File | Pages / size | Text layer |
|---|---|---|---|
| D1 | `C:\Dev\Vatsim-Training-Tools\ZMP\R90\source-docs\txt\ZMP_R90_LOA.txt` (PDF: `..\ZMP_R90_LOA.pdf`) | 6 pp | pp.1–4 full text; pp.5–6 title line only (attachments are pictures) |
| D2 | `C:\Dev\Vatsim-Training-Tools\ZMP\R90\source-docs\txt\ZMP_Minor_TRACON_Reference.txt` (PDF: `..\ZMP_Minor_TRACON_Reference.pdf`) | 5 pp | full text, but several blocks are column-scrambled by `pdftotext -layout` |
| D3 | `C:\Dev\Vatsim-Training-Tools\ZMP\R90\source-docs\txt\ZMP_Control_Towers.txt` (PDF: `..\ZMP_Control_Towers.pdf`) | 1 p | graphic chart with a **partial** text layer |
| D4 (cross-read) | `C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\ZAU_ZMP_Approach_Controls_LOA.txt` | 7 pp | full text |

Notes on the toolchain: `pdftoppm` / `pdfimages` / `pdfinfo` / ImageMagick are **not installed** on this
machine, so picture-only pages could not be rasterized and read. They are listed as UNREAD below.

`C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\LOA_ZMP_R90.txt` is **byte-identical** to D1
(verified with `diff`) — same document, two copies in the tree.

Character-encoding note: the `pdftotext` output renders the degree sign and the em dash both as `�`.
In D1 line 89 etc. `360�` is unambiguously `360°` (heading bands); in the title/cancellation lines
`ZMP � OMA R90` is an em dash. Degrees are written as `°` below.

---

# D1 — VATSIM ZMP / Omaha TRACON (R90) LETTER OF AGREEMENT

**Title:** VATSIM Minneapolis Air Route Traffic Control Center (ZMP), and Omaha Terminal Radar
Approach Control (R90) — LETTER OF AGREEMENT.
**Subject:** Terminal Area Control Service.
**EFFECTIVE: November 6, 2023.**
**Footer on every page:** "ZMP/R90 LOA  FOR SIMULATION USE ONLY  11/6/2023".

- **¶1 PURPOSE** — delegates authority and establishes procedures for control of IFR and special
  VFR traffic within the terminal area described herein; supplementary to FAA Order 7110.65 and
  VATSIM/VATUSA guidelines and directives. (ZMP/R90 LOA ¶1)
- **¶2 CANCELLATION** — "VATSIM ZMP — OMA R90 LETTER OF AGREEMENT Effective December 26, 2018".
  (ZMP/R90 LOA ¶2)
- **¶5 ATTACHMENTS** — Attachment "A" = R90 delegated airspace; Attachment "B" = Omaha STARs.
  (ZMP/R90 LOA ¶5.a, ¶5.b)

## 1. Delegated airspace and ceilings (¶3 SCOPE)

Verbatim: "ZMP delegates to R90 that airspace depicted in Attachment "A" for the control of IFR
traffic **at and below 15,000 feet MSL over R90 East and West**, and **at or below 10,000 feet MSL
over R90 LNK**." (ZMP/R90 LOA ¶3)

| Sub-area | Delegated ceiling | Citation |
|---|---|---|
| R90 East | at and below 15,000 ft MSL | ZMP/R90 LOA ¶3 |
| R90 West | at and below 15,000 ft MSL | ZMP/R90 LOA ¶3 |
| R90 LNK | at or below 10,000 ft MSL | ZMP/R90 LOA ¶3 |

Re-stated inside the departure rules as "the top of R90's airspace … (15,000 feet for R90 East and
R90 West or 10,000 feet for R90 LNK)" (ZMP/R90 LOA ¶4.d.7).

Corroborated by D2: "Delegated Airspace: SFC-15,000 (LNK Sector SFC-10,000)"
(ZMP-Minor ATCT/TRACON, Omaha (OMA)/Offutt AFB (OFF)/Lincoln (LNK) ATCT & R90 TRACON entry).

**The lateral boundaries of R90 East / R90 West / R90 LNK, and the "R90 west shelf over R90 LNK"
referenced in ¶4.d.5, exist ONLY on Attachment "A", which is a picture with no text layer — see
UNREAD list.**

## 2. Notification (¶4.a)

- R90 shall notify ZMP of: **1. Runway in Use**. (ZMP/R90 LOA ¶4.a.1)
- That is the entire notification list — no other notification items are stated in `ZMP_R90_LOA.txt`.

## 3. Arrival procedures (¶4.b)

### 3.1 All arrivals (¶4.b.1)

| Rule | Verbatim | Citation |
|---|---|---|
| Code changes | "R90 shall have control for code changes." | ¶4.b.1.a |
| Leveling | "R90 may level all R90 arrivals at ZMP assigned altitude without coordination. ZMP is responsible for necessary coordination with other ZMP sectors, provided the aircraft is left on course." | ¶4.b.1.b |
| Point outs | "R90 sector accepting the handoff must be responsible for internal sector point outs." | ¶4.b.1.c |

### 3.2 STAR arrivals (¶4.b.2)

- **STAR-active window:** "From **0730 to 2130 LCL Monday through Friday**, all aircraft **at or
  above 16,000 feet** landing **OMA or OFF** must be assigned a STAR." (¶4.b.2.a)
  - Caveat: this is the ONLY time window stated anywhere in `ZMP_R90_LOA.txt`. ¶4.d.2 ("While the
    STARs are active") and ¶4.d.6 ("When STARs are off") use the phrase without a separate
    definition; no other STAR-active definition is stated in `ZMP_R90_LOA.txt`.
- **STAR crossing altitude:** "STAR arrivals shall be **level at or descending to 16,000 feet (or
  17,000 feet stacked on the STARs)**." (¶4.b.2.b)
- **SUX/MZEEE rule:** "Arrivals routed over **SUX/MZEEE** must be **level or descending to 11,000
  feet**." (¶4.b.2.c)
- **Control-for grant to R90:** "R90 has control on all STAR arrivals **at or below FL230** for
  **descent and turns up to 30 degrees on initial contact** provided the aircraft will not enter
  another controller's airspace." (¶4.b.2.d)
- **Speeds:** "ZMP assigned speeds on STAR inbounds **do not need to be coordinated** with R90."
  (¶4.b.2.e)

### 3.3 All other arrivals — satellite airports, and OMA & OFF during non-STAR periods (¶4.b.3)

Heading verbatim: "All other Arrivals (satellite airports, as well as OMA & OFF during non-star
periods.)" (¶4.b.3)

- **Routing + altitude (¶4.b.3.a), verbatim:** "All other R90 arrivals must be **direct destination
  or a destination approach fix**. Aircraft descending over **R90 East/West** must be **at or
  descending to 16,000 feet or in level flight at or below 15,000 feet**, and aircraft over **R90
  LNK** must be **at or descending to 11,000 feet or in level flight below 11,000 feet**. Acceptance
  of the handoff of an aircraft in level flight by R90 constitutes **approval of inappropriate
  altitude for direction of flight**."
  - Wording asymmetry preserved: East/West says "at or below 15,000", LNK says "**below** 11,000"
    (not "at or below").

| Area | Descending case | Level case | Citation |
|---|---|---|---|
| R90 East / R90 West | at or descending to 16,000 | level at or below 15,000 | ¶4.b.3.a |
| R90 LNK | at or descending to 11,000 | level below 11,000 | ¶4.b.3.a |

- **SUX rule (¶4.b.3.b), verbatim:** "Arrivals routes over **SUX Approach Control** must be **level
  or descending to 11,000 feet**." (`routes` is the document's own typo.)
- **Control-for grant to R90 (¶4.b.3.c), verbatim:** "R90 has control on all arrivals **at or below
  FL230** on initial contact for **descent and turns up to 30 degrees** provide the aircraft will
  not enter another controller's airspace." (`provide` is the document's own typo.)
- **Lincoln sector arrivals from the east (¶4.b.3.d), verbatim:** "Lincoln sector arrivals from the
  east **above 15,000 feet** must be handed off to **Omaha Radar West Sector**. **ZMP 27** is
  responsible for coordination with **ZMP sector 26** (i.e. point out or flash through automated
  information transfer)."

### 3.4 Over-flights (¶4.c)

"Over-flights. R90 sector accepting the handoff shall be responsible for internal sector point
outs." (¶4.c) — that is the entire over-flight paragraph; no over-flight altitudes are stated in
`ZMP_R90_LOA.txt`.

## 4. Departure procedures (¶4.d)

### 4.1 Climb (¶4.d.1)

"R90 must climb all R90 departures to **requested altitude or the top of R90's airspace, whichever
is lower** (as defined in Attachment "A")." (¶4.d.1)

### 4.2 Departure heading bands while STARs are active (¶4.d.2)

Preamble verbatim: "While the STARs are active all aircraft filed off **OMA and OFF**, that have
**requested altitudes above 15,000**, must be vectored clear of the STAR arrival areas, and nearest
to their flight plan route on a heading as follows." (¶4.d.2)

| Band | Heading range | Bounded by (from → to) | Exception | Citation |
|---|---|---|---|---|
| a | 360° – 030° | ZMP Sector 26/27 boundary → LANTK STAR | — | ¶4.d.2.a |
| b | 090° – 110° | LANTK STAR → MARWI STAR | — | ¶4.d.2.b |
| c | 150° – 185° | MARWI STAR → TIMMO STAR | "except that aircraft filed on the **RBA arrival or J41** shall be **established on course**" | ¶4.d.2.c |
| d | 220° – 250° | TIMMO STAR → HOWRY STAR | — | ¶4.d.2.d |
| e | 280° – 320° | HOWRY STAR → ZMP Sector 26/27 boundary | — | ¶4.d.2.e |

**Flow-dependent overrides (same paragraph):**

| Departures | North flow (Omaha Eppley) | South flow (Omaha Eppley) | Citation |
|---|---|---|---|
| **OBH / LBF** | go **north of the HOWRY STAR** | go **south of the HOWRY STAR** | ¶4.d.2.f |
| **SLN / PWE / ICT** | go **west of the TIMMO STAR** | go **east of the TIMMO STAR** | ¶4.d.2.g |

Note: the flow trigger is stated as "when **Omaha Eppley** is in a north flow / south flow"
(¶4.d.2.f, ¶4.d.2.g). Which runways constitute north vs south flow at OMA is **not stated in
`ZMP_R90_LOA.txt`**.

**Inference (clearly flagged as inference, not document text):** the five bands sweep clockwise
from the Sector 26/27 boundary, so the STARs' relative ordering around the compass implied by the
heading bands is **LANTK (NE) → MARWI (E/SE) → TIMMO (S/SW) → HOWRY (W/NW)**, with the ZMP Sector
26/27 boundary lying between HOWRY and LANTK (i.e. through the north). The document itself never
states a bearing or a fix for any STAR — only the bounding relationships in the table above.

### 4.3 Remaining departure rules (¶4.d.3 – ¶4.d.10)

| ¶ | Rule (verbatim or near-verbatim) |
|---|---|
| ¶4.d.3 | "All **satellite departures** with requested altitudes **above 15,000 feet** departing airports in **R90 East and West** must be **assigned headings to miss the STARs**." |
| ¶4.d.4 | "All aircraft departing **R90 LNK sectors** must be **cleared on course**." |
| ¶4.d.5 | "**ZMP has control to climb** R90 LNK sector departures with a requested altitude **above 10,000 feet**, that will **traverse, or be within 2.5 miles of, the R90 west shelf over R90 LNK**. R90 LNK sector is responsible to ensure coordination is completed with **R90 West**." |
| ¶4.d.6 | "When **STARs are off** all R90 aircraft must be **on course**." |
| ¶4.d.7 | "ZMP acceptance of a handoff of a **R90 satellite departure** constitutes **approval for climb to requested altitude or the top of R90's airspace, whichever is lower** (15,000 feet for R90 East and R90 West or 10,000 feet for R90 LNK) provided the aircraft is **established within R90's airspace**. If a R90 departure is **within 2.5 miles of the common ZMP/R90 boundary or in ZMP airspace an approval request is required**." |
| ¶4.d.8 | "**ZMP must have control for turns up to 30 degrees** on aircraft **exiting R90's airspace**. R90 is responsible for internal point outs necessitated by these turns." |
| ¶4.d.9 | "**ZMP must have control for code changes.**" |
| ¶4.d.10 | "**ZMP may level all R90 departures at R90 assigned altitudes without coordination.** R90 is responsible for internal point outs." |

### 4.4 The two 2.5-mile rules (collected)

| Rule | Trigger | Effect | Citation |
|---|---|---|---|
| ZMP climb control over LNK departures | LNK departure requesting **above 10,000** that will **traverse or be within 2.5 NM of the R90 west shelf over R90 LNK** | ZMP has control to climb; R90 LNK must ensure coordination with R90 West is completed | ¶4.d.5 |
| Approval-request threshold | R90 departure **within 2.5 NM of the common ZMP/R90 boundary, or already in ZMP airspace** | The automatic climb approval of ¶4.d.7 does **not** apply — an **approval request is required** | ¶4.d.7 |

## 5. "Control for" grants — both directions (consolidated)

### ZMP → R90 (R90 holds control)

| Grant | Scope / limits | Citation |
|---|---|---|
| Code changes | all R90 arrivals | ¶4.b.1.a |
| Leveling | R90 may level **all R90 arrivals at ZMP assigned altitude** without coordination; ZMP does the coordination with other ZMP sectors **provided the aircraft is left on course** | ¶4.b.1.b |
| Descent + turns up to 30° | **STAR arrivals, at or below FL230, on initial contact**, provided the aircraft will not enter another controller's airspace | ¶4.b.2.d |
| Descent + turns up to 30° | **all (non-STAR) arrivals, at or below FL230, on initial contact**, provided the aircraft will not enter another controller's airspace | ¶4.b.3.c |
| Speeds | ZMP-assigned speeds on STAR inbounds need **no** coordination with R90 | ¶4.b.2.e |

### R90 → ZMP (ZMP holds control)

| Grant | Scope / limits | Citation |
|---|---|---|
| Climb | R90 **LNK** departures requesting **above 10,000** that traverse / are within **2.5 NM** of the R90 west shelf over R90 LNK | ¶4.d.5 |
| Climb (implicit, by handoff acceptance) | ZMP accepting a **satellite departure** handoff = approval to climb to requested altitude or top of R90 airspace, whichever is lower, **provided established within R90's airspace** | ¶4.d.7 |
| Turns up to 30° | aircraft **exiting R90's airspace**; R90 does the internal point outs | ¶4.d.8 |
| Code changes | (unqualified) | ¶4.d.9 |
| Leveling | ZMP may level **all R90 departures at R90 assigned altitudes** without coordination; R90 does internal point outs | ¶4.d.10 |

Symmetry worth teaching: **arrivals → R90 owns code changes, descent, 30° turns, and leveling;
departures → ZMP owns code changes, climb, 30° turns, and leveling.** Point-out responsibility
always falls on the facility whose internal sectors are affected (¶4.b.1.b/c, ¶4.c, ¶4.d.5, ¶4.d.8,
¶4.d.10).

## 6. STARs named in the LOA

| STAR | Where it appears | What the text says about its position |
|---|---|---|
| **LANTK** | ¶4.d.2.a, ¶4.d.2.b | between the ZMP Sector 26/27 boundary and MARWI; band 360–030 is inboard of it, band 090–110 outboard |
| **MARWI** | ¶4.d.2.b, ¶4.d.2.c | between LANTK and TIMMO |
| **TIMMO** | ¶4.d.2.c, ¶4.d.2.d, ¶4.d.2.g, Attachment "B" footnote | between MARWI and HOWRY; SLN/PWE/ICT departures pass west of it in north flow, east of it in south flow |
| **HOWRY** | ¶4.d.2.d, ¶4.d.2.e, ¶4.d.2.f | between TIMMO and the ZMP Sector 26/27 boundary; OBH/LBF departures pass north of it in north flow, south of it in south flow |
| **AANDY** | **only** in the Attachment "B" footnote: "*Sioux City/Pawnee City Arrivals replaced by **AANDY/TIMMO** Arrivals." | **No position, no altitudes, and no departure heading band reference anywhere in the text of `ZMP_R90_LOA.txt`.** AANDY is *not* one of the four STARs used to bound the departure heading bands in ¶4.d.2. |

**Legacy-name mapping (Attachment "B" footnote, D1 p.6):** the former **Sioux City** and **Pawnee
City** arrivals were **replaced by the AANDY and TIMMO arrivals**. The footnote does not say which
old name maps to which new one.

**Named but undefined in the text:** "**RBA arrival**" and "**J41**" (¶4.d.2.c) — the exception to
the 150–185 band. No RBA fix/route description is stated in `ZMP_R90_LOA.txt`.

**MZEEE** (¶4.b.2.c) is named only in the SUX/MZEEE arrival-altitude rule; no location or further
description is stated in `ZMP_R90_LOA.txt`.

## 7. ZMP sectors named in the LOA

| Sector | What the LOA says it is responsible for | Citation |
|---|---|---|
| **ZMP 27** | Responsible for coordination with ZMP sector 26 (point out, or flash through automated information transfer) when Lincoln-sector arrivals from the east above 15,000 are handed off to Omaha Radar West Sector | ¶4.b.3.d |
| **ZMP 26** | The sector ZMP 27 must coordinate with in that case. **No independent responsibility is stated for 26 in `ZMP_R90_LOA.txt`.** | ¶4.b.3.d |
| **ZMP Sector 26/27 boundary** | Used purely as a geographic limit for departure heading bands a and e | ¶4.d.2.a, ¶4.d.2.e |

**Only sectors 26 and 27 are named in `ZMP_R90_LOA.txt`.** No other ZMP sector number appears in
the document. The geographic location of the 26/27 boundary is **not stated in
`ZMP_R90_LOA.txt`** — it is only depicted (if at all) on Attachment "A", which is a picture.

R90-side positions named: "**Omaha Radar West Sector**" (¶4.b.3.d), "**R90 West**" (¶4.d.5),
"**R90 LNK sector(s)**" (¶4.d.4, ¶4.d.5), "**R90 East**"/"**R90 West**" as airspace sub-areas
(¶3, ¶4.b.3.a, ¶4.d.3, ¶4.d.7). No R90 frequencies, no R90 sector numbers, and no R90 position
callsigns are stated in `ZMP_R90_LOA.txt`.

## 8. D1 attachments — PICTURE-ONLY, UNREAD

Both attachment pages carry **only a title line in the text layer**; the substance of both pages is
graphics with no extractable text, and this machine has no PDF rasterizer, so their content is
**UNREAD**.

- **Page 5 — ATTACHMENT "A" — R90 DELEGATED AIRSPACE.** Full text layer of the page is:
  `ZMP/R90 LOA  FOR SIMULATION USE ONLY  11/6/2023` + `ATTACHMENT "A" — R90 DELEGATED AIRSPACE`.
  **Therefore UNREAD:** the lateral shape of R90 delegated airspace; the R90 East / R90 West / R90
  LNK dividing lines; the location and extent of the "R90 west shelf over R90 LNK" (¶4.d.5); the
  common ZMP/R90 boundary geometry used by the 2.5 NM rule (¶4.d.7); any per-shelf altitude
  annotations that may be printed on the map; which satellite airports fall in which sub-area.
- **Page 6 — ATTACHMENT "B" — OMAHA STARs.** Full text layer of the page is:
  `ZMP/R90 LOA  FOR SIMULATION USE ONLY  11/6/2023` + `ATTACHMENT "B" — OMAHA STARs` +
  `*Sioux City/Pawnee City Arrivals replaced by AANDY/TIMMO Arrivals.`
  **Therefore UNREAD:** the depicted geometry of LANTK, MARWI, TIMMO, HOWRY and AANDY; every STAR
  fix name and crossing restriction; where AANDY sits relative to the other four; the transition
  routes; and whether any additional Omaha STAR exists beyond the five named in the text.

---

# D2 — ZMP-Minor ATCT/TRACON Reference

Header/footer on every page: "ZMP-Minor ATCT/TRACON   FOR SIMULATION USE ONLY   **01/01/2015**".
5 pages. Standard six-field block per facility: Delegated Airspace / Arrivals Descend To /
Departures Climb To / IFR Initial Altitude (Jets/Props) / Local Squawk Codes (VFR/IFR) / Hours of
Operation, plus optional Notes.

## R90-relevant entries

### Omaha (OMA) / Offutt AFB (OFF) / Lincoln (LNK) ATCT & R90 TRACON — (D2 p.4)

| Field | Value |
|---|---|
| Delegated Airspace | **SFC-15,000 (LNK Sector SFC-10,000)** |
| Arrivals Descend To | **16,000 (LNK 11,000)** |
| Departures Climb To | **15,000 (OMA/OFF), 10,000 (LNK)** |
| IFR Initial Altitude (Jets/Props) | **5,000 (OMA/OFF), 4,000 (LNK)** |
| Local Squawk Codes (VFR/IFR) | **0201-0277 / 0101-0177** |
| Hours of Operation | **OMA/OFF ATCTs 24h, LNK ATCT 0530-2400 LCL, R90 24h** |
| Notes | none printed for this entry |

Cross-check: these agree exactly with ZMP/R90 LOA ¶3, ¶4.b.2.b (16,000), ¶4.b.3.a (LNK 11,000) and
¶4.d.7 (15,000 / 10,000 tops). The IFR initial altitudes (5,000 / 4,000) and the squawk banks are
**not** stated in the LOA — D2 is the only source here for those.

### Sioux City (SUX) ATCT — (D2 p.4). Directly relevant to LOA ¶4.b.2.c and ¶4.b.3.b.

| Field | Value |
|---|---|
| Delegated Airspace | SFC-10,000 |
| Arrivals Descend To | 11,000 |
| Departures Climb To | 10,000 |
| IFR Initial Altitude (Jets/Props) | 5,000 |
| Local Squawk Codes (VFR/IFR) | 0301-0377 / 0401-0477 |
| Hours of Operation | 0600-2130 LCL |
| Note | "Climb aircraft to **FL230 or requested altitude, whichever is lower**, upon ZMP accepting handoff" |

SUX's 11,000 "arrivals descend to" matches the LOA's SUX/MZEEE 11,000 rule (¶4.b.2.c, ¶4.b.3.b).

### Sioux Falls (FSD) ATCT/TRACON — (D2 p.2) — **column-scrambled block, reconstructed**

Raw extracted text (verbatim, mis-aligned by `pdftotext -layout`):

```
Delegated Airspace:                 Sioux Falls (FSD) ATCT/TRACON
Arrivals Descend To:                                        SFC-10,000
Departures Climb To:
IFR Initial Altitude (Jets/Props):        8,000 (11,000 over SUX airspace)
Local Squawk Codes (VFR/IFR):                                   10,000
Hours of Operation:                                              5,000
                                                    0101-0177/0201-0277
                                                          0500-2400 LCL
```

The facility title was absorbed onto the first label line, shifting every value down one row.
Reconstructed by value order (**this is a reconstruction, flagged as such**):

| Field | Reconstructed value |
|---|---|
| Delegated Airspace | SFC-10,000 |
| Arrivals Descend To | **8,000 (11,000 over SUX airspace)** |
| Departures Climb To | 10,000 |
| IFR Initial Altitude (Jets/Props) | 5,000 |
| Local Squawk Codes (VFR/IFR) | 0101-0177 / 0201-0277 |
| Hours of Operation | 0500-2400 LCL |

The one R90-adjacent fact here is the "**11,000 over SUX airspace**" qualifier, which is consistent
with the LOA's 11,000 SUX rule. The same scramble pattern affects the Alpena (APN), Saginaw (MBS)
and Traverse City (TVC) blocks; none of those are R90-related.

### Grand Island (GRI) ATCT — (D2 p.2) — Nebraska satellite

| Field | Value |
|---|---|
| Delegated Airspace | Class D SFC-4,300 |
| Arrivals Descend To | APP/DEP by ZMP |
| Departures Climb To | APP/DEP by ZMP |
| IFR Initial Altitude (Jets/Props) | 5,000 |
| Local Squawk Codes (VFR/IFR) | APP/DEP by ZMP |
| Hours of Operation | 0700-2000 LCL |

### Des Moines (DSM) ATCT/TRACON — (D2 p.1) — R90's eastern neighbour

| Field | Value |
|---|---|
| Delegated Airspace | SFC-10,000 |
| Arrivals Descend To | 11,000 |
| Departures Climb To | 10,000 |
| IFR Initial Altitude (Jets/Props) | 5,000 / 3,000 |
| Local Squawk Codes (VFR/IFR) | 0301-0377 / 0401-0477 |
| Hours of Operation | 24h |
| Note | "Coordination with ZAU may be required for eastbound departures" |

**Nothing in D2 mentions OBH, LBF, SLN, PWE, ICT, MZEEE, or any Omaha STAR.** No R90 sub-area
breakdown (East/West/LNK laterals) is stated in `ZMP_Minor_TRACON_Reference.txt`.

## What else D2 covers (non-R90) — inventory only

Alpena (APN) ANG RAPCON; Waterloo (ALO) ATCT [ZAU]; Bismarck (BIS); Central Wisconsin (CWA);
Duluth (DLH) incl. HIB shelf; Des Moines (DSM); Eau Claire (EAU); Fargo (FAR); Sioux Falls (FSD);
Green Bay (GRB)/Appleton (ATW); Grand Forks (GFK)/Grand Forks AFB (RDR); Grand Island (GRI);
Grand Rapids (GRR) [ZAU]; Grayling (GOV); La Crosse (LSE); Magic City (MOT)/Minot AFB (MIB) &
Dakota ATC Facility RAPCON; Milwaukee (MKE) [ZAU]; Muskegon (MKG) [ZAU]; **OMA/OFF/LNK & R90**;
Rochester (RST); Saginaw (MBS); **Sioux City (SUX)**; Camp Ripley (RYM) AAF; Sawyer/Marquette
(SAW); St. Cloud (STC); Traverse City (TVC). Facilities tagged `[ZAU]` are Chicago-owned.

Recurring note text appearing on BIS, DLH, FAR, GFK/RDR and SUX: "Climb aircraft to FL230 or
requested altitude, whichever is lower, upon ZMP accepting handoff." **This note does NOT appear on
the OMA/OFF/LNK & R90 entry** — R90's climb rule is the LOA's ¶4.d.1/¶4.d.7 "top of R90 airspace"
rule instead.

---

# D3 — ZMP Control Towers chart

Single page, 1 PDF page. Identifiers on the sheet: "MINNEAPOLIS ARTCC (ZMP)", "CONTROL TOWERS",
"**0906-5 (VZMP)**", "VATSIM MINNEAPOLIS AIR ROUTE TRAFFIC CONTROL CENTER", "DEPARTMENT OF FACILITY
ENGINEERING", and the chart-cycle band "**9 JAN 2010 to 9 APR 2010**".

**This page is a graphic with only a partial text layer.** Only five tower boxes survived text
extraction. Their ceiling/frequency pairing below is by column position in the `-layout` output
(columns verified numerically — each frequency sits directly under its own tower box, no ambiguity):

| Tower | Airspace | Frequency |
|---|---|---|
| BISMARCK | SFC – 4,200 | 132.40 |
| ANOKA | SFC – 3,400 | 132.40 |
| CENTRAL WISCONSIN | SFC – 3,800 | 119.75 |
| TRAVERSE CITY | SFC – 3,100 | 119.75 |
| ALPENA | SFC – 3,200 | 121.35 |

Adjacent-facility labels on the sheet: ZLC (Salt Lake City ARTCC), ZWG (Winnipeg FIR), ZYZ (Toronto
FIR), ZDV (Denver ARTCC), ZAU (Chicago ARTCC), ZOB (Cleveland ARTCC), ZKC (Kansas City ARTCC).

**R90 relevance: NONE that is readable.** No OMA, OFF, LNK, R90, SUX, GRI or any Nebraska/Iowa
tower appears in the text layer of `ZMP_Control_Towers.txt`.
**UNREAD from this picture:** every tower box that did not extract — which, given the sheet is
titled "CONTROL TOWERS" for the whole ZMP area and only 5 boxes came through, is most of the chart.
Any OMA/OFF/LNK tower ceiling or frequency that may be printed on it is **UNREAD**, not absent.

---

# D4 — cross-read: ZAU / ZMP Approach Controls LOA (effective 7/8/2026)

**Result: this LOA does not touch R90 at all.** A grep for `R90|OMA|KOMA|LNK|KLNK|KOFF|Omaha|
Lincoln|Offutt` over `ZAU_ZMP_Approach_Controls_LOA.txt` returns **zero hits**. (`LNR` in Appendix A
is the Badger VOR, not LNK.)

Scope of D4 (¶1): ZAU, ZMP, and the approach controls **DSM, AZO (Great Lakes), GRB, MKE, RST,
VOK** only. R90 is not a party. Cancels the ZAU/ZMP LOA dated 3/8/2025 (¶2).

Two items are worth carrying across as *contrast* material for R90 training — they are ZAU/ZMP
rules, **not** R90 rules:

- **Control-release wording (D4 ¶5.c):** "The transferring controller releases control to the
  receiving controller for: 1. Turns not to exceed 30°. 2. Transponder code change. 3. Descent,
  except: a. GRB may not descend below 4,000 ft. MSL within 5 NM of KOSH. b. MKE may not descend
  below 4,000 ft. MSL within 5 NM of KATW." The 30°-turn + code-change + descent triad matches the
  ZMP/R90 LOA's arrival grants (¶4.b.2.d, ¶4.b.3.c, ¶4.b.1.a) — but the ZMP/R90 version is capped
  **at or below FL230** and conditioned on "will not enter another controller's airspace", which
  D4 does not have.
- **In-trail (D4 ¶5.d):** "The transferring controller must provide **5 NM in-trail separation,
  constant or increasing**, to aircraft assigned the same altitude." **No in-trail requirement of
  any kind is stated in `ZMP_R90_LOA.txt`** — this is a genuine difference, not an omission on my
  part.

**ZMP sector numbers named in D4** (relevant only because the R90 LOA names 26 and 27): Appendix A's
airspace diagram carries the labels **ZMP 02, ZMP 04, ZMP 05, ZMP 27, ZMP 36** and **ZAU 26, ZAU 55,
ZAU 63, ZAU 64**. Note the collision hazard: D4's "**ZAU 26**" is a *Chicago* sector and is **not**
the "ZMP sector 26" of ZMP/R90 LOA ¶4.b.3.d. D4's Appendix A is a diagram whose text extracted as
scattered fragments; the sector boundaries it depicts are **UNREAD**.

Other D4 content (no R90 bearing, listed for completeness): ¶6 arrivals per Appendix B; ¶7
departures per Appendix C with "expect filed altitude 10 minutes after departure"; ¶8 TEC between
GRB and MKE per Appendix D; Appendix E lists the MKE and C90 terminal-area airports. Delegation
summary in Appendix A: "ZAU Delegates to ZMP At or Below 10,000 (ZMP Re-Delegates to DSM When
Operational)" and "ZMP Delegates to ZAU At or Below 10,000 (ZAU Re-Delegates to VOK When
Operational)". Signatories: Zakery Husk (ATM, VATSIM Chicago ARTCC) and Dhruv Kalra (ATM, VATSIM
Minneapolis ARTCC).

---

# Gaps, conflicts and UNREAD content

1. **Attachment "A" (R90 delegated airspace map) — picture, UNREAD.** All R90 lateral geometry, the
   East/West/LNK split, the "R90 west shelf over R90 LNK", and the ZMP/R90 common boundary are
   unavailable from text. `ZMP_Approach_Sectors.pdf` (8.9 MB) in the same folder is likewise a
   picture — its `.txt` contains a single form-feed character and nothing else — and is UNREAD; it
   is the most likely place to recover the R90 sector geometry.
2. **Attachment "B" (Omaha STARs) — picture, UNREAD.** No fix names, no crossing restrictions, no
   depicted geometry for LANTK / MARWI / TIMMO / HOWRY / AANDY.
3. **AANDY is orphaned in the text.** It appears only in the Attachment "B" footnote and is absent
   from every departure heading band in ¶4.d.2. Whether a departure between, say, TIMMO and AANDY
   has a defined band is **not stated in `ZMP_R90_LOA.txt`**.
4. **"STARs active" has one definition and two uses.** ¶4.b.2.a gives 0730–2130 LCL Mon–Fri for
   aircraft at or above 16,000 landing OMA/OFF; ¶4.d.2 and ¶4.d.6 assume a facility-wide
   active/inactive state. The LOA does not say whether the departure rules key off the same clock.
5. **North flow / south flow at Omaha Eppley is undefined.** ¶4.d.2.f and ¶4.d.2.g depend on it;
   no runway set is stated in `ZMP_R90_LOA.txt`. (The ¶4.a.1 "Runway in Use" notification is the
   only related hook.)
6. **RBA arrival and J41** (¶4.d.2.c exception) are named but not described anywhere in D1–D4.
7. **MZEEE** (¶4.b.2.c) is named but not located anywhere in D1–D4.
8. **ZMP Sector 26/27 boundary location** is never described in words in any of D1–D4.
9. **Currency mismatch to flag to the authoring phase:** D1 is effective 11/6/2023, D2 is dated
   01/01/2015, D3 is a 2010-cycle chart, D4 is effective 7/8/2026. Where D2/D3 disagree with D1,
   D1 governs for R90.
10. **Adjacent source docs NOT covered by these notes** (present in
    `C:\Dev\Vatsim-Training-Tools\ZMP\R90\source-docs\txt\`, outside this task's scope):
    `R90_Order_7220_10B.txt`, `OMA_ATCT_7110_4A.txt`, `LNK_ATCT_7110_6A.txt`. R90 internal sector
    numbers, frequencies and STAR fix detail are most likely to live in `R90_Order_7220_10B.txt`.
