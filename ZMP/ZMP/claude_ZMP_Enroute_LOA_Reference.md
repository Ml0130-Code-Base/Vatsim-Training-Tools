# ZMP Center-to-Center (Enroute) LOAs — Extraction Notes

Sole input for the authoring phase. Every operational number below is quoted with its
paragraph / appendix / attachment reference. Anything not present in the source is written
as `not stated in <file>` — nothing here is inferred unless explicitly labelled as such.

## 0. Sources read and extraction method

| Document | .txt read | PDF beside it | Pages | Effective date (as printed) |
|---|---|---|---|---|
| ZMP–ZAU (Chicago) | `LOA_ZMP_ZAU.txt` | `LOA_ZMP_ZAU.pdf` | 8 | **7/8/2026** (header on every page; "Effective Date: 7/8/2026") |
| ZMP–ZKC (Kansas City) | `LOA_ZMP_ZKC.txt` | `LOA_ZMP_ZKC.pdf` | 5 | **EFFECTIVE: 04/03/2021** |
| ZMP–ZDV (Denver) | `LOA_ZMP_ZDV.txt` | `LOA_ZMP_ZDV.pdf` | 8 | **EFFECTIVE: 12/01/2022** |
| ZMP–ZLC (Salt Lake City) | `LOA_ZMP_ZLC.txt` | `LOA_ZMP_ZLC.pdf` | 3 | **EFFECTIVE: 02/15/2017** |
| ZMP–ZOB (Cleveland) | `LOA_ZMP_ZOB.txt` | `LOA_ZMP_ZOB.pdf` | 11 | **EFFECTIVE: MARCH 30, 2021** |
| ZMP–CZWG (Winnipeg FIR) | `LOA_ZMP_CZWG.txt` | `LOA_ZMP_CZWG.pdf` | 7 | **18 Jun 2020, 0900z** (cover-page table) |
| ZMP Tier 1 route reference | `REF_ZMP_LOA_Routes.txt` | `REF_ZMP_LOA_Routes.pdf` | 6 | Dated **01/27/2022** in the running header; no "effective date" field — *not stated in REF_ZMP_LOA_Routes.txt* |

All seven `.txt` files were read in full. **The supplied `pdftotext -layout` output scrambles
the multi-row / merged-cell tables in ZAU App. C & D, ZKC Att. B, ZDV Att. C, ZOB Att. 3 and
REF routes** — column values land on the wrong rows. Every table below was therefore
re-derived from the source PDF with `pdftotext -table` and, where still ambiguous, with
`pdftotext -lineprinter -linespacing 8` and per-cell column-offset measurement. Where the
geometry still cannot settle a cell association it is flagged **[AMBIGUOUS]** inline.

---

# 1. ZMP ↔ ZAU — VATSIM Chicago ARTCC

**File:** `LOA_ZMP_ZAU.txt` / `LOA_ZMP_ZAU.pdf`
**Title:** "VATSIM CHICAGO ARTCC AND MINNEAPOLIS ARTCC — LETTER OF AGREEMENT"
**Subject:** Interfacility Procedures and Airspace Delegation
**Effective:** 7/8/2026
**Cancels:** VATUSA Chicago ARTCC / VATUSA Minneapolis ARTCC LOA dated October 23, 2023 (ZAU LOA ¶2)
**Signed:** Zakery Husk, ATM VATSIM Chicago ARTCC / Dhruv Kalra, ATM VATSIM Minneapolis ARTCC

## 1.1 General provisions (ZAU LOA ¶4)

| Ref | Provision |
|---|---|
| ZAU 4.a | The destination airport must be the clearance limit. |
| ZAU 4.b | Apply routes and restrictions in accordance with **Appendices C, D, and E**. *(See §1.6 — the appendix list in the same document only runs A–D. Verbatim text preserved.)* |
| ZAU 4.c | Route capable aircraft via RNAV STARs to the maximum extent practicable. |
| ZAU 4.d | The **transferring** controller releases control for: (1) turns not to exceed **20°** within **20 NM** of the common boundary; (2) speed changes; (3) transponder code change. |
| ZAU 4.e | Aircraft landing within **60 NM of the ZAU/ZMP low sector boundary** must enter the receiving center **at or below FL240**. |
| ZAU 4.f | Coordinate with affected controllers before opening or closing operational positions and, when not obvious, frequency assignment. |
| ZAU 4.g.1 | Data blocks must reflect the aircraft's assigned altitude at the time of hand off. |
| ZAU 4.g.2 | Hand offs must be directed to the appropriate sector for the aircraft's assigned altitude. Acceptance of a radar hand off constitutes approval coordination for that aircraft to climb or descend to the displayed altitude. *(Source prints "descent"; typo preserved.)* |
| ZAU 4.g.3 | Interim altitudes are authorized between ZAU and ZMP and represent valid altitude coordination. Must **not** be used to coordinate IAFDOF or to supersede altitude restrictions in this LOA. |
| ZAU 4.g.4 | When unable to approve the coordinated altitude, the receiving controller must verbally coordinate with the transferring controller **prior to acceptance of the handoff**. |
| ZAU 4.h | Aircraft unable to comply with required routes or altitudes must be coordinated with the receiving controller on an individual basis. |
| ZAU 4.i.1 | Non-RNAV arrivals without specified LOA routing must be assigned **vectors to overfly the RNAV routing** for the destination airport. **APREQ with receiving controller.** |

**Note — no in-trail/mileage spacing requirement is stated anywhere in the ZAU LOA** other
than the MSP-satellite in-trail rule in Appendix B (§1.2). *No NM in-trail figure is stated in
LOA_ZMP_ZAU.txt.*

## 1.2 Appendix B — Route and Altitude Restrictions **from ZAU to ZMP** (ZAU App. B, p.5)

| Arriving | Qualifier | Nav Type | Route Via | Altitude | Special |
|---|---|---|---|---|---|
| KMSP | From ZAU 60/64 | RNAV | KKILR STAR | AOB FL340 | — |
| KMSP | From ZAU 75 | RNAV | BLUEM STAR | AOB FL320 | — |
| KMSP | From ZAU 75 | Non-RNAV | KASPR STAR | AOB FL320 | — |
| KMSP | KMSN Jet Departures | RNAV | HENDR KKILR STAR | AOB FL220 | — |
| MSP Satellites | — | — | BAE AGUDE STAR | **AOB FL340 (Must be in-trail with or below KMSP arrivals)** | Includes: KANE, KFCM, KLVN, KMIC, KSTP |
| MSP Satellites | — | — | ALO TWOLF TWOLF STAR | AOB FL320 | Includes: KANE, KFCM, KLVN, KMIC, KSTP |
| KOMA / KOFF | — | — | LANTK STAR **or** MARWI STAR at and above 16,000 ft. MSL | AOB FL340 | — |

- The "Includes: KANE KFCM KLVN KMIC KSTP" cell is one merged cell spanning both MSP-Satellite
  rows (verified by cell geometry).
- The in-trail wording "(Must be in-trail with or below KMSP arrivals)" is printed **inside the
  AOB FL340 / BAE AGUDE cell only**. **[AMBIGUOUS]** whether it was intended to cover the
  ALO TWOLF row as well — the printed cell boundary says it does not. (ZKC and ZDV both state
  the equivalent rule as a footnote covering *all* MSP satellite arrivals; see §2.3 fn 1 and §3.4 fn 1.)
- Qualifier and Nav-Type cells are **blank** for the MSP Satellites and KOMA/KOFF rows.

## 1.3 Appendix C — Route and Altitude Restrictions **from ZMP to ZAU** (ZAU App. C, p.6)

| Arriving | Qualifier | Nav Type | Route Via | Altitude | Special |
|---|---|---|---|---|---|
| KDTW | Entering ZAU 25 | RNAV | HOOTA KKISS/RKCTY STAR | AOB FL310 | — |
| KDTW | Entering ZAU 25 | Non-RNAV | UFDUH SVM KDTW | AOB FL310 | — |
| KMDW | Entering ZAU 94 | RNAV | JALAP ENDEE STAR **or** DSM KAMBL ENDEE STAR | *(blank)* | Direct KAMBL approved over/south of DSM VOR |
| KMDW | Entering ZAU 94 | Non-RNAV | DSM BDF JOT KMDW | *(blank)* | Direct KAMBL approved over/south of DSM VOR |
| KMDW | Entering ZAU 63/75 | RNAV | OHHMY ENDEE STAR | AOB FL310 | ZMP releases control for descent |
| KMDW | Entering ZAU 63/75 | Non-RNAV | CVA BDF JOT KMDW | AOB FL310 | ZMP releases control for descent |
| KORD | Entering ZAU 25/26 | RNAV | WYNDE STAR | AOB FL320 | — |
| KORD | Entering ZAU 60/64 | RNAV | ERNNY/MADII STAR | AOB FL230 | ZMP Releases Control for Descent |
| KORD | Entering ZAU 60/64 | RNAV | SHIKY FYTTE STAR | AOB FL280 | **No Reroutes via SHIKY Without ZAU Approval** |
| KORD | Entering ZAU 60/64 | Non-RNAV | BJB OBK KORD | AOB FL230 | — |
| KORD | Entering ZAU 63/75 | RNAV | MYRRS FYTTE STAR **or** ZZIPR FYTTE STAR (Direct WELCM Approved) | **ZZIPR AOB FL310** | **ZMP 17 Releases Control for Descent** |
| KORD | Entering ZAU 63/75 | Non-RNAV | DBQ JVL JVL STAR | AOB FL270 | — |
| KORD | Option for KCWA | RNAV | MSN GARTT JVL ; CHMPN FYTTE STAR | AOB FL310 | ZMP Releases Control for Descent |
| KORD | KDLH, KEAU, KLSE, KRST, KSTC Departures | Non-RNAV | MSN GARTT JVL JVL STAR | AOB FL310 | — |

- Column-offset measurement (Arriving col ≈ x33, Qualifier col ≈ x51) confirms that
  **"Option for KCWA"** and **"KDLH KEAU KLSE KRST KSTC Departures"** are *Qualifier* text, and
  that the *Arriving* cell for both is **KORD** (the KORD merged cell runs from the
  "Entering ZAU 25/26" row to the bottom of the table).
- **[AMBIGUOUS]** — the last two rows may instead be one row whose Qualifier cell reads
  "Option for KCWA / KDLH KEAU KLSE KRST KSTC Departures" with RNAV = {MSN GARTT JVL,
  CHMPN FYTTE STAR} and Non-RNAV = {MSN GARTT JVL JVL STAR}. Both readings fit the cell
  centring. Split as printed above.
- Altitude cell is genuinely **blank** for both "Entering ZAU 94" KMDW rows.
- **ZMP 17** is the only ZMP sector named by number in this LOA.

## 1.4 Appendix D — **Standby** restrictions, **from ZAU to ZMP** (ZAU App. D, p.7)

> App. D preamble: "The restrictions below are required only when requested. They should
> normally only be requested for events or other periods of heavy traffic; however,
> controllers may request or voluntarily apply these restrictions at any time an operational
> advantage would be gained."

| Arriving | Qualifier | Nav Type | Route Via | Altitude | Special |
|---|---|---|---|---|---|
| KGRB, KTVC | From ZAU 23/24 | — | — | AOB FL280, Descending to FL240 | — |
| KLSE | VOK RAPCON Operational | — | — | **6,000** | **Hand off to VOK RAPCON** |
| KRST | — | — | — | AOB FL280, Descending to AOB FL240 | **ZAU Releases control for descent within 20 NM of the ZAU/ZMP Boundary** |

- The "6,000" cell sits at the top of the KLSE row (verified by line-printer vertical
  position: 6,000 at y-line 37, KLSE row spans 36–42; altitude cells in this table are
  top-aligned, confirmed against the KGRB/KTVC and KRST rows).

## 1.5 Appendix D — **Standby** restrictions, **from ZMP to ZAU** (ZAU App. D cont'd, p.8)

| Arriving | Qualifier | Nav Type | Route Via | Altitude | Special |
|---|---|---|---|---|---|
| KCID | Entering ZAU 94 | — | — | AOB FL310 | ZMP Releases Control for Descent |
| KCID | Entering ZAU 75 | — | — | AOB FL240 | ZMP Releases Control for Descent |
| KGRR | AOA 11,000 / Entering ZAU 25/26 | — | — | Descending to 11,000 | **Hand off to ZAU** |
| KMKE | Entering ZAU 75, **East of ALO** | — | DLL BAE KMKE **or** SIBER BAE KMKE | AOB FL310 | ZMP Releases Control |
| KMKE | Entering ZAU 64 | — | BJB KMKE | AOB FL190 | ZMP Releases Control |
| KMKE | Entering ZAU 75, **West of ALO** | RNAV | OGECA GOPAC STAR | *(blank)* | ZMP Releases Control |
| KMKE | Entering ZAU 75, **West of ALO** | Non-RNAV | DBQ SIBER BAE KMKE | *(blank)* | ZMP Releases Control |
| KMSN | MSP Metro Area Departure | — | — | AOB FL230 | ZMP Releases Control |
| Chicago Metro Satellites | Entering ZAU 25/26 | — | — | AOB FL280 | Includes KARR, KDPA, KGYY, KLOT, KMDW, KPWK, KUGN |
| Chicago Metro Satellites | Over MKE TRACON Airspace | — | BJB OBK Destination | AOB FL230 | Includes KARR, KDPA, KGYY, KLOT, KMDW, KPWK, KUGN |
| Chicago Metro Satellites | KPWK/KUGN Entering ZAU 75 | — | DBQ LYSEN KRENA KPWK **or** DSM LOTTE KRENA KPWK **or** OGECA GOPAC STAR KUGN **or** DBQ LYSEN KRENA KUGN | **West ALO: AOB FL370 / East ALO: AOB FL290** | Includes KARR, KDPA, KGYY, KLOT, KMDW, KPWK, KUGN |
| Chicago Metro Satellites | KUGN Entering ZAU 60 | — | DLL BAE KUGN **or** BJB OBK KUGN | *(blank)* | Includes … (same merged cell) |
| Chicago Metro Satellites | KUGN Entering ZAU 94 | — | CID OHLIE GOPAC STAR **or** DBQ DLL BAE KUGN **or** DBQ LYSEN KRENA KUGN | *(blank)* | Includes … (same merged cell) |

- "Chicago Metro Satellites" is one merged Arriving cell covering the last five qualifier
  rows; the "Includes KARR KDPA KGYY KLOT KMDW KPWK KUGN" cell is likewise merged across them.
- ZMP-side sector numbers for these rows: *not stated in LOA_ZMP_ZAU.txt* (only ZAU sector
  numbers are given as qualifiers).

## 1.6 ZAU sectors and ZMP sectors named in this LOA

- **ZAU sectors referenced:** 23/24, 25, 25/26, 60, 60/64, 63/75, 64, 75, 94.
- **ZMP sectors referenced:** **ZMP 17** only (App. C, KORD entering ZAU 63/75).
- **Stratification:** the ZAU LOA references "the ZAU/ZMP **low sector** boundary" (¶4.e) and
  Appendix A is titled "Low and High Sector Airspace Depiction", but **the altitudes that
  split low from high are not stated in LOA_ZMP_ZAU.txt** — that split is only on the
  picture-only Appendix A pages.
- **Internal discrepancy:** ¶4.b says "in accordance with **Appendices C, D, and E**", but the
  document's own appendix list is **A, B, C, D** and there is no Appendix E. Treat as a
  drafting error carried over from an earlier revision — do not resolve it silently.

## 1.7 Handoff / transfer-of-communications points (ZAU)

**No named handoff fixes or coordination points are listed in LOA_ZMP_ZAU.txt.** Unlike the
ZDV, ZLC and CZWG LOAs, this agreement defines transfer only by (a) the common boundary,
(b) the sector qualifiers in Appendices B–D, and (c) two explicit hand-off instructions:
- KLSE standby: **Hand off to VOK RAPCON** (App. D, ZAU→ZMP).
- KGRR standby: **Hand off to ZAU** (App. D, ZMP→ZAU).
A transfer-of-communications timing rule is **not stated in LOA_ZMP_ZAU.txt**.

---

# 2. ZMP ↔ ZKC — VATUSA Kansas City ARTCC

**File:** `LOA_ZMP_ZKC.txt` / `LOA_ZMP_ZKC.pdf`
**Subject:** INTERFACILITY COORDINATION
**Effective:** 04/03/2021
**Cancels:** VATUSA Kansas City / VATUSA Minneapolis LOA dated **June 8, 2020** (ZKC ¶3)
**Signed:** Kyle Kaestner, ATM VATUSA Kansas City ARTCC / Dhruv Kalra, ATM VATUSA Minneapolis ARTCC

## 2.1 Procedures (ZKC ¶4)

| Ref | Provision |
|---|---|
| ZKC 4.a | Each ARTCC must route/restrict aircraft in accordance with **Attachment B**. |
| ZKC 4.b | The **receiving** ARTCC may assume control for **beacon code changes and turns**, on aircraft **at or above 10,000 feet MSL**, when within **20 NM** of the common ZMP/ZKC boundary. Max turn **20°**, and must not affect another sector without proper coordination. |
| ZKC 4.c | Aircraft landing **within 60 miles of the boundary** must enter the receiving ARTCC's airspace **AOB FL230**, and the receiving ARTCC must have **control for descent and turns**. |
| ZKC 4.d.(1) | Data blocks must reflect the aircraft's assigned altitude at the time of handoff. |
| ZKC 4.d.(2) | Handoffs must be directed to the appropriate sector for the aircraft's altitude assignment. Acceptance of a radar handoff constitutes approval coordination to climb/descend to the displayed altitude. |
| ZKC 4.d.(3) | Interim (temp) altitudes authorized; must represent valid altitude coordination; must not be used for IAFDOF or to supersede LOA altitude restrictions. |
| ZKC 4.d.(4) | When unable to approve the automated altitude, the receiving controller must verbally coordinate with the transferring controller **prior to acceptance of the handoff**. |
| ZKC 4.e | Aircraft unable to comply with required routes or altitudes must be coordinated with the receiving ARTCC on an individual basis. |

**Attachments (ZKC ¶5):** A — Radar Sectors; B — Route/Altitude Restrictions.

## 2.2 Sectors / stratification (ZKC Attachment A)

Attachment A is a **picture-only pair of pages**; only the two page titles carry text:
- **HIGH ALTITUDE (FL240+)** (Attachment A, p.2)
- **LOW ALTITUDE (SFC-FL230)** (Attachment A, p.3)

**No ZKC or ZMP sector numbers appear anywhere in the ZKC LOA text.** See §7 (gaps).

## 2.3 Attachment B — **FROM ZKC TO ZMP**

Altitude column header: "Altitude (Cross ZKC/ZMP Boundary, unless otherwise noted)".

| Arrival Airport(s) | Qualifier | Route Via | Altitude at ZKC/ZMP boundary |
|---|---|---|---|
| MSP | Turbojets | ROKKK.NITZR STAR (RNAV) **or** FOD.KASPR STAR | *(blank)* |
| MSP | Turboprops | FOD..KASPR.KASPR STAR | *(blank)* |
| MSP | All STL Departures | MNOSO.BLUEM STAR (RNAV) **or** ALO.KASPR STAR | *(blank)* |
| MSP Satellites (ANE, FCM, LVN, MIC, STP) ¹ | All | FOD.TWOLF STAR | *(blank)* |
| OMA / OFF | AOA 16,000 MSL | PWE **or** MARWI STARs ² | East of BACNN: **AOB FL320** ³ · West of BACNN: **AOB FL280** ⁴ |
| LNK | AOA 16,000 MSL | *(blank)* | East of BACNN: **AOB FL320** ³ · West of BACNN: **AOB FL280** ⁴ |
| DSM | AOA 11,000 MSL | *(blank)* | **AOB FL280** ⁴ |

Footnotes (verbatim, ZKC Att. B):
1. "MSP satellite arrivals must enter ZMP either **in-trail with or below MSP arrivals**"
2. "MARWI STAR arrivals may be routed **direct MARWI without coordination**."
3. "**ZKC releases control for descent to FL240 20NM from the ZMP/ZKC common boundary.**"
4. "**Aircraft must be descending to FL240 at pilot's discretion.**"

- The qualifier for the third MSP row is literally **"All STL Departures"** (the word "All"
  belongs to that qualifier cell, not to a separate column — verified by column offset).
- **BACNN** is the east/west split fix for OMA/OFF and LNK.

## 2.4 Attachment B — **FROM ZMP TO ZKC**

| Arrival Airport(s) | Qualifier | Route Via | Altitude at ZKC/ZMP boundary |
|---|---|---|---|
| MCI ¹ | All | JSONN STAR **or** BQS STAR | **JSONN STAR: cross ASIIX/DPEAK AOB FL230** |
| MCI Satellites (MKC, OJC, FLV, IXD) ¹ | All | ASIIX/DPEAK JSONN JUDAA **or** BQS STAR ² | **ASIIX/DPEAK AOB FL230** |
| STL | All | RIVRS/LORLE STAR ³ | *(blank)* |

Footnotes (verbatim, ZKC Att. B):
1. "**ZKC must have control for descent of all MCI TRACON arrival aircraft 20NM from the ZMP/ZKC common boundary.**"
2. "Turboprops may be cleared via **direct JUDAA or direct BQS**."
3. "STL arrivals entering ZKC **west of J21** may be cleared via **ANX.KOOOP/KAYLA STAR**"

## 2.5 In-trail / spacing (ZKC)

- Only stated in-trail requirement: **MSP satellite arrivals must enter ZMP either in-trail
  with or below MSP arrivals** (Att. B fn 1, ZKC→ZMP direction).
- **No NM or minutes in-trail figure is stated in LOA_ZMP_ZKC.txt.**

## 2.6 Handoff / transfer-of-communications points (ZKC)

**No named handoff fixes are listed in LOA_ZMP_ZKC.txt** (unlike ZDV/ZLC/CZWG). Control
transfer is described only by boundary + 20 NM control-release rules (¶4.b, ¶4.c, Att. B
fn 1/3). A transfer-of-communications timing rule is **not stated in LOA_ZMP_ZKC.txt**.

---

# 3. ZMP ↔ ZDV — VATUSA Denver ARTCC

**File:** `LOA_ZMP_ZDV.txt` / `LOA_ZMP_ZDV.pdf`
**Subject:** INTERFACILITY COORDINATION
**Effective:** 12/01/2022
**Cancels:** VATUSA Denver / VATUSA Minneapolis LOA dated **June 18, 2020** (ZDV ¶3)
**Signed:** Dhruv Kalra, ATM VATUSA Minneapolis ARTCC / Austin Wilkins, ATM VATUSA Denver ARTCC

## 3.1 Responsibilities — delegated airspace (ZDV ¶4.a)

- **ZDV delegates control responsibility and jurisdiction of airspace at 7,000 feet MSL and
  below to ZMP** as depicted on **Attachment B** (the "EAR shelf").
- ZMP **must have control of aircraft landing at Kearney, Nebraska, Municipal Airport (EAR)**
  for **descent and turns not to exceed 45° left or right of course within a 30 NM radius of
  the EAR VOR**.
- **The ZDV controller must coordinate all approaches to Holdrege (Nebraska)/Brewster Field (HDE).**

## 3.2 Procedures (ZDV ¶5)

| Ref | Provision |
|---|---|
| ZDV 5.a | Each ARTCC must route/restrict aircraft in accordance with **Attachment C**. |
| ZDV 5.b | Aircraft landing **within 60 miles of the boundary** must enter the receiving ARTCC's airspace **AOB FL230**; receiving ARTCC has **control for descent and turns**. |
| ZDV 5.c | IAFDOF may be assigned IAW FAA JO 7110.65 **and with prior approval from the receiving facility**. |
| ZDV 5.d | **Transponder codes may be changed without coordination within 30 NM either side of the ZDV/ZMP common boundary.** |
| ZDV 5.e | The **receiving** controller must have control for **turns 20° left or right of course, and speed adjustments**, for aircraft **within 20 NM** of the ZDV/ZMP common boundary. |
| ZDV 5.f | **Flights originating less than 5 minutes flying time from the adjacent ARTCC's boundary must be coordinated by the transferring ARTCC.** |
| ZDV 5.g.(1) | Data blocks must reflect the aircraft's assigned altitude at the time of handoff. |
| ZDV 5.g.(2) | Handoffs directed to the appropriate sector for the altitude assignment; acceptance = approval to climb/descend to displayed altitude. |
| ZDV 5.g.(3) | Interim (temp) altitudes authorized; not for IAFDOF; must not supersede LOA altitude restrictions. |
| ZDV 5.g.(4) | Unable to approve the automated altitude → verbally coordinate before accepting the handoff. |
| ZDV 5.j | Aircraft unable to comply must be coordinated with the receiving ARTCC on an individual basis. |

## 3.3 Designated radar handoff points (ZDV ¶5.h) — verbatim coordinates

> "Radar handoffs should be made with reference to the Denver ARTCC/Minneapolis ARTCC boundary
> and along regularly used routes. In addition, the following designated points may be used
> for radar handoffs:"

| # | Point | Latitude | Longitude |
|---|---|---|---|
| (1) | **CHAUX** | 43°42'30"N | 101°24'30"W |
| (2) | **WHITE** | 43°17'20"N | 100°06'00"W |
| (3) | **RESERVOIR** | 44°42'00"N | 101°29'00"W |
| (4) | **LOOP** | 41°21'00"N | 99°03'00"W *(source prints the closing mark as an apostrophe: `99°03'00'W`)* |
| (5) | **NATOMA** | 39°28'30"N | 98°41'00"W |
| (6) | **LOGAN** | 39°51'00"N | 98°57'00"W |

## 3.3a Sector stratification (ZDV ¶5.i)

| Facility | Low sectors | High sectors |
|---|---|---|
| **Minneapolis ARTCC (ZMP)** | FL230 and below | FL240 and above |
| **Denver ARTCC (ZDV)** | FL260 and below | FL270 and above |

(Repeated as page titles on the picture-only Attachment A pages: "ZDV LOW SECTORS (SFC-FL260)",
"ZDV HIGH SECTORS (FL270+)", "ZMP LOW SECTORS (SFC-FL230)", "ZMP HIGH SECTORS (FL240+)".)

**ZMP sectors named by number in this LOA:** **ZMP 29 / ZMP 39** — referenced only as the
"**ZMP29/39 Boundary**" used as the north/south qualifier split in Attachment C (ZMP→ZDV).
**No ZDV sector numbers appear in the ZDV LOA text** (Attachment A is picture-only).

## 3.4 Attachment C — **FROM ZDV TO ZMP**

Altitude column header: "Altitude (Cross ZDV/ZMP Boundary, unless otherwise noted)".

| Arrival Airport(s) | Qualifier | Route Via | Altitude at ZDV/ZMP boundary |
|---|---|---|---|
| MSP | RNAV Jet | J114.FSD..SSWAN.TORGY STAR | *(blank)* |
| MSP | All Others | J114.FSD..RWF.SKETR STAR | *(blank)* |
| MSP Satellite (ANE, FCM, LVN, MIC, STP) ¹ | All | HANKI..ENCEE.ENCEE STAR | *(blank)* |
| OMA, OFF | AOA 11,000 | GRI/OBH/ONL.HOWRY STAR · HTHWY.TIMMO STAR · PWE.PWE STAR (Non-RNAV) | **AOB FL350 (HOWRY)** or **AOB FL370 (PWE/TIMMO)** |
| LNK | All | *(blank)* | **AOB FL330** |
| EAR, HSI, GRI | All | *(blank)* | **AOB FL230** |
| ORD | AOA FL240 | ZZIPR.FYTTE STAR **or** FOD..MYRRS.FYTTE STAR **or** PWE..IRK.BENKY/SHAIN/BDF STAR | *(blank)* |
| ORD | AOA FL240, **Acft S of PWE** | IRK.BENKY/SHAIN/BDF STAR · MCW/FOD..DBQ..JVL.JVL STAR (Non-RNAV) | *(blank)* |

Note printed in the Route Via column between the two ORD rows, verbatim:
> "**No radar vectors or direct routing beyond MCW, FOD, or IRK**"

**[AMBIGUOUS]** — its vertical position straddles the two ORD sub-rows; it most likely applies
to the ORD block as a whole, but the cell boundary cannot be confirmed from the text layer.

Footnote (verbatim, ZDV Att. C):
1. "MSP satellite arrivals must enter ZMP **either in-trail with or below MSP arrivals**"

## 3.5 Attachment C — **FROM ZMP TO ZDV**

| Arrival Airport(s) | Qualifier | Route Via | Altitude at ZDV/ZMP boundary |
|---|---|---|---|
| **DEN** (Turbojet) | North of **HUTEP** | RNAV: NYTRO.AALLE STAR · Non-RNAV: BFF/SNY.LANDR STAR | *(blank)* |
| **DEN** (Turbojet) | S of HUTEP to **ZMP29/39 Boundary** | RNAV: PORDR.AALLE STAR · Non-RNAV: ONL.J114.YANKI.LANDR STAR | *(blank)* |
| **DEN** (Turbojet) | South of **ZMP29/39 Boundary** | RNAV: BRWRY.LAWGR STAR · SAYGE..FQF | *(blank)* |
| **APA** (Turbojet) | North of ZMP29/39 Boundary | SHRPE.BRNKO STAR · SNY..YOKES..GLL..BJC (Non-RNAV) | *(blank)* |
| **APA** (Turbojet) | South of ZMP29/39 Boundary | FRAAY.DUNNN STAR · BRK (Non-RNAV) | *(blank)* |
| **BJC** (Turbojet) | RNAV | SHRPE.BRNKO STAR | *(blank)* |
| **BJC** (Turbojet) | Non-RNAV | SNY..YOKES..GLL..BJC | *(blank)* |
| **BKF, CFO** (Turbojet) | RNAV | SAYGE..FQF · GLD.DANDD STAR | *(blank)* |
| **BKF, CFO** (Turbojet) | Non-RNAV | DANDD STAR | *(blank)* |
| **FNL, GXY, LMO** (Turbojet) | RNAV | SHRPE.BRNKO STAR · GLD.DANDD STAR | *(blank)* |
| **FNL, GXY, LMO** (Turbojet) | Non-RNAV | SNY..YOKES..GLL · DANDD STAR | *(blank)* |
| **RAP Area** (49B, EFC, RAP, RCA, SPF) | Above 16,000 between **SULPHUR** and **RESERVOIR** | *(blank)* | **AOB FL260 descending to 17,000** ¹ |
| **RAP Area** (49B, EFC, RAP, RCA, SPF) | Between **RESERVOIR** and **CHAUX** | *(blank)* | **AOB FL270 descending to FL240** |

Footnote (verbatim, ZDV Att. C):
1. "**Denver ARTCC must have control for descent to 12,000 feet MSL and control for turns of
   30 degrees left or right of course on Rapid City area arrivals from 20NM north of the
   common Denver/Minneapolis ARTCC boundary.**"

- On the DEN "South of ZMP29/39 Boundary" row the second route line **"SAYGE..FQF" carries no
  RNAV/Non-RNAV label in the document** (all other split rows on this page are labelled).
  Recorded exactly as printed; **do not assume it is the non-RNAV option**.
- **SULPHUR** here vs **SULFUR** in the ZLC LOA (§4.3) — different spellings in different
  documents; both preserved verbatim.
- ZDV "RAP Area" rows are the only rows in this table with a stated boundary altitude.

## 3.6 In-trail / spacing (ZDV)

- Only stated in-trail requirement: **MSP satellite arrivals must enter ZMP either in-trail
  with or below MSP arrivals** (Att. C fn 1, ZDV→ZMP direction).
- **No NM or minutes in-trail figure is stated in LOA_ZMP_ZDV.txt.**
- Transfer-of-communications timing rule: **not stated in LOA_ZMP_ZDV.txt.**

---

# 4. ZMP ↔ ZLC — VATUSA Salt Lake City ARTCC

**File:** `LOA_ZMP_ZLC.txt` / `LOA_ZMP_ZLC.pdf`
**Subject:** INTERFACILITY COORDINATION
**Effective:** 02/15/2017
**Cancels:** "All previous agreements are cancelled." (ZLC ¶3)
**¶4 RESPONSIBILITIES:** printed verbatim as "**Unrelated**" — i.e. no delegated airspace.
**Signed:** Shane VanHoven, ATM VATUSA Minneapolis ARTCC / Kaylan Fullerton, ATM VATUSA Salt Lake City ARTCC

> **Currency flag for the authoring phase:** this is by far the oldest of the six (2017) and is
> signed by a former ZMP ATM (Shane VanHoven) where every other current LOA is signed by
> Dhruv Kalra.

## 4.1 Procedures (ZLC ¶5)

| Ref | Provision |
|---|---|
| ZLC 5.a | Each ARTCC must route/restrict aircraft in accordance with **Attachment A**. |
| ZLC 5.b | The **receiving** controller must have control for **turns up to 30° left or right of course** for aircraft **within 30 NM** of the ZLC/ZMP common boundary. |
| ZLC 5.c | Aircraft whose destination airports lie **within 60 miles of the common boundary** must enter the receiving ARTCC's airspace **AOB FL230**, and the receiving ARTCC must have **control for descents and turns**. |
| ZLC 5.d | **Altitude changes must be verbally coordinated for aircraft within 5 minutes flying time of the ZLC/ZMP common boundary.** |
| ZLC 5.e | Flights originating less than **5 minutes flying time** from the adjacent ARTCC's boundary must be coordinated by the transferring ARTCC. |
| ZLC 5.f.(1) | Data blocks must reflect the aircraft's assigned altitude at the time of handoff. |
| ZLC 5.f.(2) | Acceptance of a radar handoff constitutes approval coordination to climb/descend to the displayed altitude. *(Note: unlike the other five LOAs, ZLC does **not** carry the "handoffs must be directed to the appropriate sector for the altitude" clause.)* |
| ZLC 5.f.(3) | Interim (temp) altitudes authorized; **not** authorized for IAFDOF or to supersede LOA altitude restrictions. |
| ZLC 5.f.(4) | Unable to approve the automated altitude → verbally coordinate before accepting the handoff. |
| ZLC 5.g | Aircraft unable to comply must be coordinated with the receiving ARTCC on an individual basis. |

## 4.2 Additional radar handoff fixes (ZLC ¶5.h) — verbatim coordinates

> "In addition to the authorized radar handoff points, the following fixes may be used to
> accomplish a radar handoff:"

| # | Fix | Latitude | Longitude |
|---|---|---|---|
| (1) | **SULFUR** | 44°57'30"N | 103°10'00"W |
| (2) | **RALPH** | 45°42'00"N | 103°10'00"W |
| (3) | **GRASSY** | 47°34'00"N | 103°10'00"W |
| (4) | **WHEELOCK** | 48°16'00"N | 103°10'00"W *(source prints the closing mark as an apostrophe: `103°10'00'W`)* |

All four sit on the **103°10'W** meridian — i.e. the ZLC/ZMP common boundary runs north–south
along that longitude between roughly 44°57'N and 48°16'N.

## 4.3 Attachment A — **FROM ZLC TO ZMP**

Altitude column header: "Altitude (Cross ZLC/ZMP Boundary, unless otherwise noted)".

| Arrival Airport(s) | Qualifier | Route Via | Altitude at ZLC/ZMP boundary |
|---|---|---|---|
| **MSP** | Through **ZMP11** | TTAIL.BAINY STAR · FAR.GEP STAR ¹ | *(blank)* |
| **MSP** | Through **ZMP17** | UFFDA.TORGY STAR · RWF.SKETR STAR ¹ | *(blank)* |
| **MOT / MIB** | ALL | *(blank)* | **AOB FL230** ² |
| **DIK** | ALL | *(blank)* | **AOB 11,000** ² |

## 4.4 Attachment A — **FROM ZMP TO ZLC**

| Arrival Airport(s) | Qualifier | Route Via | Altitude at ZLC/ZMP boundary |
|---|---|---|---|
| **BIL** | **10 AND 11 SECTOR** | KUSTR STAR (RNAV) **or** BIL VORTAC ¹ | *(blank)* |
| **ISN** | ALL ³ | ISN | **AOB 5000** ² |

Footnotes (verbatim, ZLC Att. A — shared by both tables):
1. "Non-RNAV capable routing."
2. "**Pilot's discretion descent authorized.**"
3. "**ZMP must release control to ZLC of ISN arrivals within 45NM of ISN VOR**"

## 4.5 Sectors named (ZLC)

- **ZMP sectors:** **ZMP11** and **ZMP17** (the two MSP-arrival gates from ZLC).
- **ZLC sectors:** "**10 AND 11 SECTOR**" (BIL arrivals) — the LOA does not say whether these
  are ZLC or ZMP sector numbers; it appears in the Qualifier column of the ZMP→ZLC table, so
  in context it is the ZLC sector pair receiving the traffic. **Not explicitly stated in
  LOA_ZMP_ZLC.txt.**
- ZLC stratification: **not stated in LOA_ZMP_ZLC.txt** (there is no radar-sector attachment
  in this LOA at all).

## 4.6 In-trail / spacing (ZLC)

**No in-trail or spacing requirement of any kind is stated in LOA_ZMP_ZLC.txt.**
Transfer-of-communications timing rule: **not stated in LOA_ZMP_ZLC.txt.**

---

# 5. ZMP ↔ ZOB — VATUSA Cleveland ARTCC

**File:** `LOA_ZMP_ZOB.txt` / `LOA_ZMP_ZOB.pdf`
**Subject:** INTERFACILITY COORDINATION
**Effective:** MARCH 30, 2021
**Cancels:** VATUSA Cleveland / Minneapolis LOA dated **June 18, 2020** (ZOB ¶3)
**Signed:** Nicholas Lascko, ATM VATSIM Cleveland ARTCC / Dhruv Kalra, ATM VATSIM Minneapolis ARTCC

**¶1 also states:** "Controllers must coordinate and resolve, in a practical manner that
provides the smoothest experience to the pilot, all deviations from, and situations not
addressed by, this document (e.g., non-standard sectorization, holding, pilots unable to
accept LOA routes, aircraft above/below LOA altitudes, etc.)."

## 5.1 Responsibilities and restrictions

| Ref | Provision |
|---|---|
| ZOB 4.a | **LAN Approach Control airspace, including those portions underlying ZMP, is delegated to ZOB whenever LAN Approach Control is closed.** |
| ZOB 5.a | Each ARTCC must route/restrict aircraft in accordance with **Attachment 3**. |
| ZOB 5.b | The **receiving** ARTCC has control for **beacon code changes and turns** when aircraft are **within 20 NM** of the common ZOB/ZMP boundary. Max turn **20° off course**; must not affect another sector without proper coordination. |

## 5.2 §6 — KDTW arrivals that will enter **ECK sector** (the key handoff procedure)

Unless otherwise coordinated:

**a. ZMP must:**
1. Input a **hard altitude of FL240**. Issue a clearance to **cross the boundary AOB FL280,
   pilot discretion to FL240**.
2. **Initiate a handoff to ECK sector. ECK sector will redirect the handoff to FNT sector.**
3. **Transfer communications to FNT sector upon acceptance of handoff by FNT sector.** In the
   event that FNT sector has **not** accepted the handoff at the time the aircraft is crossing
   the ZOB/ZMP boundary, **transfer communications to ECK sector.**

**b. ZOB must:**
1. If traffic is **not** a factor, **re-direct handoff to FNT sector**.
2. If traffic **is** a factor requiring communications with the aircraft, **verbally coordinate
   with ZMP**.

## 5.3 §7 — KBAX procedures

- **ZOB shall be the controlling authority for departure clearances off KBAX.**
- All **bases, tops, and visibility reports in the vicinity of KBAX** must be coordinated
  between ZOB and ZMP for use in providing approach control services.

## 5.4 §8 — Data block coordination

| Ref | Provision |
|---|---|
| 8.a | Acceptance of a handoff constitutes authorization for the aircraft to climb/descend to the displayed altitude. |
| 8.b.i | **ITAL** may be used for transitioning aircraft not assigned the final requested altitude as indicated in the flight plan. |
| 8.b.ii | Handoffs shall be directed to the appropriate sector for the aircraft altitude assignment, **including an assigned interim 'T' altitude when the ITAL is not in the same sector as the final requested "hard" altitude**. |
| 8.b.iii | The receiving controller approves an altitude by accepting the handoff. When unable to approve the altitude indicated in the data block, verbally coordinate with the transferring controller **prior to accepting the handoff**. |
| NOTE (after 8.b) | "These procedures shall not be authorized to override other altitude restrictions specifically spelled out in this Letter of Agreement, nor be authorized to coordinate inappropriate altitude for direction of flight (IAFDOF)." |
| 8.c.i–iii | Same data-block / interim-altitude language as the other LOAs (assigned altitude at handoff; handoff to the correct sector; interim altitudes valid but not for IAFDOF and not to supersede LOA restrictions). |
| 8.c.iv | **No scratchpad/ERAM 4th line data**, except where specific control instructions differing from LOA procedures have been issued — in which case the alternate instruction shall be verbally **or textually** included as well as entered in the scratchpad. |

**Permitted scratchpad entries (ZOB 8.c.iv.1–4):**

| Entry | Meaning | Example(s) from the LOA |
|---|---|---|
| `S…` | Indicated speed restriction | "S210", "S270+" — clients only capable of 4 characters remove the "S" (e.g. "270+") |
| `M…` | Mach speed restriction | "M81", "M78+" |
| `H…` | Heading assignment | "H230" |
| `D…` + direction | Deviation | "D15L" for 15 degrees left of track |

## 5.5 Attachment 2 — Detroit Satellite & Cleveland Area airports

| Area | Satellite Airport Codes |
|---|---|
| **Detroit Satellite (D21)** | DET, PTK, ARB, YIP, TTF, MTC, CYQG, ONZ, OZW, D98, VLL |
| **Cleveland Area (CLE)** | CLE, BKL, CGF, LNN, 2G1, 1G1, LPR, 7G8, 1G5 |

## 5.6 Attachment 3 — **ZMP Provides for ZOB** (i.e. ZMP → ZOB)

Altitude column header: "Unless otherwise specified, altitude restriction is at the boundary".

| # | Arrival Airport | If Via | Aircraft Type | Route | Altitude | Notes |
|---|---|---|---|---|---|---|
| 1 | **KCLE** | FRYYE / OLYEE | — | BRWNZ STAR | **AOB FL310** | — |
| 2 | **KDTW** | Airports departing from Michigan and Overseas flights | RNAV | PNNTO GRAYT STAR **or** PNNTO LAYKS STAR | **AOB FL280 with pilot discretion to FL240** | **ZOB has control to issue the appropriate OPD.** |
| 2 | **KDTW** | Airports departing from Michigan and Overseas flights | Non-RNAV | MBS FNT DXO | AOB FL280 with pilot discretion to FL240 | ZOB has control to issue the appropriate OPD. |
| 2 | **KDTW** | All Others | — | HOOTA KKISS STAR **or** PORZL KKISS STAR | *(blank)* | see IAFDOF note below |
| 2 | **KDTW** | All Others | — | HOOTA RKCTY STAR **or** PORZL RKCTY STAR | *(blank)* | see IAFDOF note below |
| 3 | **KDTW Satellites** | — | RNAV | OREYO RRALF STAR | **AOB FL200** | — |
| 3 | **KDTW Satellites** | — | Non-RNAV | MBS FNT SVM | **AOB FL200** | — |
| 4 | **KTOL** | Recovering Military Aircraft | — | GNZOE HHRNT WASPP BURDZ RPTER **or** COMDR HHRNT WASPP BURDZ RPTER | *(blank)* | — |
| 5 | **CYYZ** | — | — | YZEMN NUBER STAR | *(blank)* | — |
| 6 | **CYXU** | When **Steelhead ATCAA** is active | — | HOCKE | **AOB FL270** | — |
| 7 | **CYZR** | — | — | *(blank)* | **AOB FL270** | — |

IAFDOF note printed in the Notes column beside the KDTW rows, verbatim:
> "The receiving controller approves IAFDOF altitudes by accepting the handoff. When unable to
> approve the altitude indicated in the data block, the receiving controller must verbally
> coordinate with the transferring controller prior to accepting the handoff."

**[AMBIGUOUS]** — cannot determine from the text layer whether that Notes cell is scoped to
the KDTW "All Others" sub-row only or merged across the whole KDTW block. Content duplicates
ZOB §8.b.iii, so it is procedurally identical either way.

- Attachment 3's own page title reads "**PERMANENT ROUTE/ALTITUDE RESTRICTIONS FROM ZMP TO
  ZOB**" even though its second page is the **ZOB → ZMP** table (§5.7). Title is inaccurate;
  preserved as printed.
- Aircraft-Type cells are blank on rows 1, 4, 5, 6, 7 and on the KDTW "All Others" rows.

## 5.7 Attachment 3 — **ZOB Provides for ZMP** (i.e. ZOB → ZMP)

| # | Arrival Airport | Via | Aircraft Type | Route | Altitude | Notes |
|---|---|---|---|---|---|---|
| 8 | **KACB, KGLR, KTVC** | *(blank)* | *(blank)* | *(blank)* | **AOB FL280 with pilot discretion to FL240** | *(blank)* |
| 9 | **KAPN, KCAD, KOSC** | *(blank)* | *(blank)* | *(blank)* | **AOB FL230 with pilot discretion to 11,000'** | *(blank)* |

These two rows carry **only** altitudes — the Via, Aircraft Type, Route and Notes columns are
genuinely empty in the source (confirmed by line-printer extraction of page 7).

## 5.8 Sectors named (ZOB)

- **ZOB sectors:** **ECK** and **FNT** (both in §6, the KDTW procedure). Also referenced as
  facilities: **LAN Approach Control**, **AZO** (Attachment 1 title), **D21** (Detroit
  Satellite), **CLE** (Cleveland Area).
- **ZMP sectors:** **none named** anywhere in LOA_ZMP_ZOB.txt.
- Stratification: **not stated in LOA_ZMP_ZOB.txt.**

## 5.9 In-trail / spacing (ZOB)

**No in-trail or spacing requirement is stated in LOA_ZMP_ZOB.txt.**
Transfer of communications is addressed only for the KDTW/ECK/FNT case (§6.a.iii above); no
general transfer-of-communications timing rule is stated.

## 5.10 Numbering defect

The document's section numbers run 1, 2, 3, 4, 5, 6 (KDTW/ECK), 7 (KBAX), 8 (Data Block), then
**"6. ATTACHMENTS"** — the attachments section is misnumbered as 6 (a duplicate). Attachments
list: 1 — AZO/LAN Approach Control Delegated Airspace; 2 — Detroit Satellite & Cleveland Area
Airport; 3 — Routing, Restrictions, & Control Table; 4 — Airspace.

---

# 6. ZMP ↔ CZWG — Winnipeg Area Control Centre (VATCAN Winnipeg FIR)

**File:** `LOA_ZMP_CZWG.txt` / `LOA_ZMP_CZWG.pdf`
**Title:** "LETTER OF AGREEMENT (LOA) BETWEEN WINNIPEG AREA CONTROL CENTRE (CZWG) AND
MINNEAPOLIS AIR ROUTE TRAFFIC CONTROL CENTER (KZMP)"
**Effective:** **18 Jun 2020, 0900z** (cover table)
**Concerning:** "Joint and Independent Operational Air Traffic Control Procedures and Primary
and Secondary Ownership of High and Low sectors"
**Cancels:** VATUSA Minneapolis ARTCC / VATCAN Winnipeg FIR LOA dated **October 1, 2015** (§3)
**Signed:** Dhruv Kalra, ATM Minneapolis ARTCC (KZMP), 18 Jun 2020 / Nate Power, FIR Chief
Winnipeg FIR (CZWG), 18 Jun 2020
**Supplemental to:** FAA Order 7110.65, **Nav Canada Air Traffic MANOPS/MATS**, VATUSA/VATCAN
Policy, and VATSIM Policy (§1)

## 6.1 Responsibilities (§4)

> "As defined by aeronautical chart or approved, government issued, or endorsed aeronautical
> publication/document; unless coordinated by written or verbal methods, facilities listed
> with a controlling agency will be controlled by said agency regardless of location relative
> to ARTCC/FIR outlined boundaries. Required coordination must be completed and approved prior
> to aircraft entering/exiting said airspace."

## 6.2 Procedures (§5)

| Ref | Provision |
|---|---|
| CZWG 5.1 | Each ARTCC/FIR must route/restrict aircraft in accordance with **Attachment A**, unless coordinated. |
| CZWG 5.2 | Controllers must coordinate **any route, altitude, speed, or discrete code change** different from the flight plan if the aircraft is **within 20 NM** of the ZMP ARTCC / ZWG FIR common boundary. |
| CZWG 5.3 | Flights originating **less than 5 minutes flying time** from the adjacent ARTCC/FIR's boundary must be coordinated by the transferring ARTCC/FIR. |
| CZWG 5.4 | The **transferring** facility must obtain approval for **incorrect altitudes for direction of flight, block altitudes, and Negative RVSM flights** prior to transfer of control. |
| CZWG 5.5 | **Transfer of control shall occur at the common control boundary**, except each facility may assume control for **transponder code changes and turns of no more than 20°** when the aircraft is **20 NM or less** from the common control boundary. |
| CZWG 5.6 | Sector boundaries and FIR boundaries are as indicated in **Attachments A and B**. |
| CZWG 5.7 | Non-automated (manual) radar handoffs shall be accomplished **prior to the common boundary** using the handoff points on Attachments A and B or any other point depicted on both facilities' radar displays, using the scripted format in §6.4 below. |
| **CZWG 5.8** | **Communications transfer must be completed prior to the ZMP ARTCC / ZWG FIR Boundary, unless coordinated.** |
| **CZWG 5.9** | **10 NM In-Trail Spacing is required between aircraft on the same route/course** unless another form of approved separation is being applied or if coordinated. |
| CZWG 5.10 | ZMP shall hand off arrivals inbound to **CYQT and CYWG** to **ZWG FIR (Center) Low Sector** (if in operation) or **ZWG FIR Combined (Center) sector** (if in operation). **If YQT Arrival is staffed, hand off all YQT arrivals to YQT Arrival.** |
| CZWG 5.11 | **ZWG FIR (Center) split:** High **FL290 to FL600**; Low **SFC to FL280**. |
| CZWG 5.12 | ZWG FIR shall notify ZMP of changes to sector splits differing from the LOA — details of airspace stratification (altitudes), area of coverage, and **frequencies in use**. |
| CZWG 5.13 | **ZMP ARTCC (Center) split:** High **FL240+**; Low **SFC to FL230**. |
| CZWG 5.14 | ZMP will define sector splits to ZWG FIR if in operation/use — stratification altitudes, area of coverage, and frequencies in use. |
| CZWG 5.15 | Radar handoffs should be made with reference to the ZMP/ZWG boundary and along regularly used routes; in addition the designated points in §6.3 may be used. |

**This is the only one of the six LOAs that states a numeric in-trail figure (10 NM, §5.9) and
the only one that states a transfer-of-communications timing rule (§5.8).**

## 6.3 Designated radar handoff points (CZWG §5.15.a–f) — verbatim coordinates

| # | Point | Coordinates (as printed) |
|---|---|---|
| a | **TRI CENTRE** | N49.00.00.000 W103.10.00.000 |
| b | **ARCHIE** | N49.00.00.000 W101.00.00.000 |
| c | **BALDWYN** | N49.00.00.000 W99.00.00.000 |
| d | **CARL** | N49.00.00.000 W98.00.00.000 |
| e | **DONNA** | N49.00.00.000 W95.10.00.000 |
| f | **YQT & INL VOR** | "As depicted on prescribed video maps" |

All five coordinate points sit on **N49°00'** — the 49th-parallel international boundary.
**TRI CENTRE at W103°10' is the ZMP/ZLC/CZWG tri-point** (same meridian as the four ZLC
handoff fixes in §4.2).

## 6.4 Manual (non-automated) handoff script (CZWG §5.7.a–k) — verbatim

| Step | Say |
|---|---|
| a | State Facility ID Calling (i.e. Winnipeg Sector 1) |
| b | State Your Facility ID (i.e. Minneapolis Sector 11) |
| c | State Intent/Request (i.e. Manual Hand-Off) |
| d | (Await Response from Receiving Sector) |
| e | State Intent/Request again for clarification (i.e. Manual Hand-Off) |
| f | State Distance from known NAVAID/Coordination Fix (i.e. 5 NM East of YQT VOR) |
| g | State Aircraft Callsign and Squawk Code (i.e. UAL451 Squawking 4231) |
| h | State Altitude (state descending or climbing if appropriate) (i.e. FL240 Descending 10000) |
| i | State Destination (i.e. Enroute to CYWG) |
| j | Receiving controller will respond accordingly (RADAR CONTACT / NEGATIVE RADAR CONTACT) |
| k | End coordination with operating initials from each controller involved |

*(The example call signs/sectors — "Winnipeg Sector 1", "Minneapolis Sector 11" — are the
document's own illustrative examples, not an authoritative sector list.)*

## 6.5 §6 — Route/Altitude Restrictions

| Arrival Airport | Qualifier | Route Via | Altitude |
|---|---|---|---|
| **CYWG** | RNAV | NORAK ARRIVAL | **AOB FL280** |
| **CYWG** | NON-RNAV | HML..YWG | **AOB FL240** |
| **CYQT** | RNAV | TIGAG ARRIVAL | **AOB 10000** |
| **CYQT** | NON-RNAV | DLH V13 YQT | **AOB 10000** |
| **KMSP** | RNAV | GGULL.BAINY STAR | **NO ALT RESTRICTION** |
| **KMSP** | NON-RNAV | BRD.GEP STAR | **NO ALT RESTRICTION** |

**NOTE (printed under the table):** "**Pilot's discretion of descent is approved unless
otherwise coordinated.**"

- "NO ALT RESTRICTION" is one merged cell spanning both KMSP rows.
- The table is a single combined table — it is **not** split by direction, but by its content
  CYWG/CYQT rows are ZMP→CZWG and the KMSP rows are CZWG→ZMP.

## 6.6 Sectors named (CZWG)

- **ZWG:** "ZWG FIR (Center) Low Sector", "ZWG FIR Combined (Center) sector", "YQT Arrival"
  position, and "Winnipeg Sector 1" (script example only).
- **ZMP:** "Minneapolis Sector 11" (script example only). No authoritative ZMP sector list is
  given — **not stated in LOA_ZMP_CZWG.txt**.

---

# 7. `REF_ZMP_LOA_Routes` — ZMP Tier 1 ARTCC LOA Routing Reference

**File:** `REF_ZMP_LOA_Routes.txt` / `.pdf`, 6 pages, header dated **01/27/2022**, marked
"FOR SIMULATION USE ONLY".
Title: "VATSIM MINNEAPOLIS ARTCC — TIER 1 ARTCC LOA ROUTING REFERENCE".

**NOTE (verbatim, p.1):** "Severe Weather, TMU restrictions, or coordination may override
these routes on an individual basis."

This is a **departure-airport-oriented cheat sheet** derived from the LOAs above. Where a
route line has no Notes value, it is an additional option under the Notes value above it
(verified by cell geometry). Blank route cells against a "No SID/STAR" note are blank in the
source.

## 7.1 KMSP DEPARTURES (p.1)

| Airport | Route | Notes |
|---|---|---|
| **KORD** (AOB FL310) | RST SID RST ZZIPR FYTTE STAR | RNAV |
| KORD (AOB FL310) | RST SID RST JVL JVL STAR | Non-RNAV |
| KORD (AOB FL310) | RST RST153 SUZYQ JVL OBK | No SID/STAR |
| **KMDW** (AOB FL310) | RST SID RST OHHMY ENDEE STAR | RNAV |
| KMDW (AOB FL310) | RST SID RST CVA MOTIF STAR | Non-RNAV |
| KMDW (AOB FL310) | RST DBQ RFD JOT | No SID/STAR |
| **KDEN** | SCHEP SID ONL PORDR AALLE STAR | RNAV |
| KDEN | SCHEP SID ONL J114 YANKI LANDR STAR | Non-RNAV |
| KDEN | ONL SNY DVV | No SID/STAR |
| **KDTW** | COULT SID DLL PORZL RKCTY/KKISS STAR | RNAV |
| KDTW | WLSTN SID GRB HOOTA RKCTY/KKISS STAR | (RNAV — 2nd option) |
| KDTW | COULT SID DLL BAE FNT CRL DXO | Non-RNAV |
| KDTW | WLSTN SID GRB MBS FNT CRL DXO | No SID/STAR |
| **KMCI** | ORSKY SID FOD ASIIX JSONN STAR | ALL |
| KMCI | ORSKY SID FOD STJ MCI | Non-RNAV |
| KMCI | FOD STJ MCI | No SID/STAR |
| **CYWG** | BRNRD GOVIT NORAK STAR | RNAV |
| CYWG | GEP BIPKU NORAK STAR | (RNAV — 2nd option) |
| CYWG | GEP FAR HML YWG | Non-RNAV |
| CYWG | *(blank route cell)* | No SID/STAR |

## 7.2 KOMA / KLNK / KSUX DEPARTURES (p.2)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | ROKKK NITZR STAR | RNAV |
| KMSP | FOD MCW KASPR STAR | Non-RNAV |
| KMSP | MCW FGT | No SID/STAR |
| **KORD** | FOD MYRRS FYTTE STAR | RNAV |
| KORD | FOD DBQ JVL JVL STAR | Non-RNAV |
| KORD | FOD DBQ JVL OBK | No SID/STAR |
| **KMDW** | DSM KAMBL ENDEE STAR | RNAV |
| KMDW | JALAP ENDEE STAR | (RNAV — 2nd option) |
| KMDW | LMN MOTIF STAR | Non-RNAV |
| KMDW | LMN BDF JOT | No SID/STAR |
| **KDEN** | ONL PORDR AALLE STAR | RNAV |
| KDEN | BRWRY LAWGR STAR | (RNAV — 2nd option) |
| KDEN | ONL J114 YANKI PORDR STAR | Non-RNAV |
| KDEN | OBH SNY SAYGE STAR | (Non-RNAV — 2nd option) |
| KDEN | ONL SNY DVV | No SID/STAR |
| KDEN | OBH SNY DVV | (No SID/STAR — 2nd option) |
| **KMCI** | DPEAK JSONN JUDAA MCI | *(no Notes value printed on this line)* |
| KMCI | PWE JSONN MCI | No SID/STAR |

## 7.3 KDSM DEPARTURES (p.3)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | ROKKK NITZR STAR | RNAV |
| KMSP | MCW KASPR STAR | Non-RNAV |
| KMSP | MCW FGT | No SID/STAR |
| **KORD** | MYRRS FYTTE STAR | RNAV |
| KORD | DBQ JVL JVL STAR | Non-RNAV |
| KORD | DBQ JVL OBK | No SID/STAR |
| **KMDW** | JALAP ENDEE STAR | RNAV |
| KMDW | BDF MOTIF STAR | Non-RNAV |
| KMDW | BDF JOT | No SID/STAR |
| **KDEN** | OBH BRWRY LAWGR STAR | RNAV |
| KDEN | OBH SNY SAYGE STAR | Non-RNAV |
| KDEN | OBH SNY DVV | No SID/STAR |

## 7.4 KGRB DEPARTURES (p.3)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | SHEAY MUSCL STAR | RNAV |
| KMSP | GRB EAU STAR | Non-RNAV |
| KMSP | GRB EAU MSP | No SID/STAR |
| **KORD** (AOB 13000) | FAALZ MADII/ERNNY STAR | RNAV |
| KORD (AOB 13000) | FAH BJB OBK | Non-RNAV |
| **KMDW** (AOB 13000) | FAH BJB OBK | ALL |
| **KDTW** | HOOTA RKCTY/KKISS STAR | RNAV |
| KDTW | MBS FNT CRL DXO | Non-RNAV |

## 7.5 KFAR / KBIS / KGFK / KMOT DEPARTURES (p.4)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | TTAIL BAINY STAR | RNAV |
| KMSP | FAR GEP STAR | Non-RNAV |
| KMSP | AXN V2 GEP | No SID/STAR |
| **KORD** | HSTIN Q156 ZZIPR FYTTE STAR | RNAV |
| KORD | RWF RST RST153 SUZYQ JVL STAR | Non-RNAV |
| KORD | RWF RST RST153 SUZYQ JVL OBK | No SID/STAR |
| **KMDW** | HSTIN OHHMY ENDEE STAR | RNAV |
| KMDW | RWF RST CVA MOTIF STAR | Non-RNAV |
| KMDW | RWF RST DBQ CVA RFD JOT | No SID/STAR |
| **KDEN** | NYTRO AALLE STAR | RNAV |
| KDEN | BFF LANDR STAR | Non-RNAV |
| KDEN | BFF DVV | No SID/STAR |

## 7.6 KDLH DEPARTURES (p.4)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | COLDD BAINY STAR | RNAV |
| KMSP | RV GEP333 GEP STAR | Non-RNAV |
| KMSP | RV GEP333 GEP | No SID/STAR |
| **KORD** | WISCN FGHRN **ERRNY**/MADII STAR | RNAV — *source spells it "ERRNY"; the ZAU LOA App. C spells the same STAR "ERNNY". Both preserved.* |
| KORD | GRB BJB OBK | Non-RNAV |
| KORD | *(blank route cell)* | No SID/STAR |
| **KMDW** | OHHMY ENDEE STAR | RNAV |
| KMDW | GRB BJB OBK | Non-RNAV |
| KMDW | *(blank route cell)* | No SID/STAR |
| **KDTW** | HOOTA RKCTY/KKISS STAR | RNAV |
| KDTW | GRB MBS CRL DXO | Non-RNAV |
| KDTW | *(blank route cell)* | No SID/STAR |

## 7.7 KFSD DEPARTURES (p.5)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | SSWAN TORGY STAR | RNAV |
| KMSP | RWF SKETR STAR | Non-RNAV |
| KMSP | RWF | No SID/STAR |
| **KORD** | ZZIPR FYTTE STAR | RNAV |
| KORD | FOD MYRRS FYTTE STAR | (RNAV — 2nd option) |
| KORD | MCW JVL STAR | Non-RNAV |
| KORD | FOD DBQ JVL JVL STAR | (Non-RNAV — 2nd option) |
| KORD | MCW JVL OBK | No SID/STAR |
| KORD | FOD DBQ JVL OBK | (No SID/STAR — 2nd option) |
| **KMDW** | OHHMY ENDEE STAR | RNAV |
| KMDW | RST DBQ CVA MOTIF STAR | Non-RNAV |
| KMDW | RST DBQ RFD JOT | No SID/STAR |
| **KDEN** | ONL PORDR AALLE STAR | RNAV |
| KDEN | ONL J114 YANKI LANDR STAR | Non-RNAV |
| KDEN | ONL SNY DVV | No SID/STAR |

## 7.8 KRST DEPARTURES (p.5)

| Airport | Route | Notes |
|---|---|---|
| **KMSP** | BLUEM BLUEM STAR | RNAV |
| KMSP | RST V24 KASPR KASPR STAR | Non-RNAV |
| KMSP | RST V24 KASPR FGT | No SID/STAR |
| **KORD** (AOB FL230) | ZZIPR FYTTE STAR | RNAV |
| KORD (AOB FL230) | RST RST153 SUZYQ JVL STAR | Non-RNAV |
| KORD (AOB FL230) | RST RST153 SUZYQ JVL OBK | No SID/STAR |
| **KMDW** (AOB FL230) | OHHMY ENDEE STAR | RNAV |
| KMDW (AOB FL230) | RST DBQ CVA MOTIF STAR | Non-RNAV |
| KMDW (AOB FL230) | RST DBQ RFD JOT | No SID/STAR |

## 7.9 Conflicts between the Tier 1 reference and the signed LOAs

Flag these for the authoring phase — the **LOA is authoritative**, the Tier 1 sheet is a
2022 aid and the ZAU LOA has since been reissued (7/8/2026):

| Item | Tier 1 sheet (01/27/2022) | Signed LOA |
|---|---|---|
| KMSP→KORD altitude | "AOB FL310" | ZAU App. C: FL230 / FL280 / ZZIPR AOB FL310 / FL270 depending on entry sector |
| KMSP→KMDW altitude | "AOB FL310" | ZAU App. C: AOB FL310 for ZAU 63/75; **blank** for ZAU 94 |
| KRST→KORD / KMDW | "AOB FL230" | ZAU App. C lists KRST as a *departure* qualifier under KORD at AOB FL310 (Non-RNAV) |
| KGRB→KORD / KMDW | "AOB 13000" | ZAU App. D lists KGRB only as an **arrival** from ZAU 23/24 at AOB FL280 desc FL240 |
| KDEN routes | "ONL J114 YANKI **PORDR** STAR" (KOMA/KLNK/KSUX p.2) | ZDV Att. C: "ONL.J114.YANKI.**LANDR** STAR" — the Tier 1 sheet says PORDR on p.2 and LANDR on pp.1/5 |
| STAR spelling | "ERRNY" (KDLH p.4) | ZAU App. C: "ERNNY" |

---

# 8. Combined summary — who is on which side of ZMP

| Direction from ZMP | Facility | LOA file | Effective | Boundary evidence used |
|---|---|---|---|---|
| **North** | **CZWG — Winnipeg Area Control Centre (VATCAN Winnipeg FIR)** | `LOA_ZMP_CZWG.txt` | 18 Jun 2020 0900z | *Stated in the document:* all five coordinate handoff points lie on **N49°00'00"** (TRI CENTRE, ARCHIE, BALDWYN, CARL, DONNA) — the 49th-parallel international border. |
| **West / Northwest** | **ZLC — Salt Lake City ARTCC** | `LOA_ZMP_ZLC.txt` | 02/15/2017 | *Stated in the document:* all four handoff fixes (SULFUR, RALPH, GRASSY, WHEELOCK) lie on **W103°10'00"**, from 44°57'N up to 48°16'N — a north–south boundary west of ZMP. |
| **Southwest / West** | **ZDV — Denver ARTCC** | `LOA_ZMP_ZDV.txt` | 12/01/2022 | *Stated in the document:* handoff points run from **RESERVOIR 44°42'N 101°29'W** and **CHAUX 43°42'N 101°24'W** in the north down to **LOGAN 39°51'N 98°57'W** and **NATOMA 39°28'N 98°41'W** — i.e. ZDV lies to ZMP's southwest, wrapping around western Nebraska/Kansas. |
| **South** | **ZKC — Kansas City ARTCC** | `LOA_ZMP_ZKC.txt` | 04/03/2021 | *Not stated by coordinate in the document.* Derived from the traffic pattern the LOA describes: ZMP→ZKC = MCI/MCI-satellites/STL; ZKC→ZMP = MSP/MSP-satellites/OMA/OFF/LNK/DSM — ZKC is the southbound neighbour. |
| **Southeast** | **ZAU — Chicago ARTCC** | `LOA_ZMP_ZAU.txt` | 7/8/2026 | *Not stated by coordinate in the document.* Derived from traffic: ZMP→ZAU = KORD/KMDW/KMKE/KMSN/Chicago metro satellites; ZAU→ZMP = KMSP/MSP satellites/KOMA/KOFF. |
| **East** | **ZOB — Cleveland ARTCC** | `LOA_ZMP_ZOB.txt` | March 30, 2021 | *Not stated by coordinate in the document.* Derived from traffic: ZMP→ZOB = KCLE/KDTW/KDTW satellites/KTOL/CYYZ/CYXU/CYZR; ZOB→ZMP = northern-Michigan fields KACB/KGLR/KTVC/KAPN/KCAD/KOSC. |

> **Honesty flag:** the ZAU, ZKC and ZOB compass bearings above are **not stated in their LOAs**
> and are inferred from the airports each direction of flow serves. The CZWG, ZLC and ZDV
> bearings are supported by coordinates printed in those documents.

## 8.1 Cross-LOA quick comparison of the common clauses

| Clause | ZAU | ZKC | ZDV | ZLC | ZOB | CZWG |
|---|---|---|---|---|---|---|
| Who gets control for turns near the boundary | **Transferring releases** (¶4.d) | **Receiving assumes** (¶4.b) | **Receiving has** (¶5.e) | **Receiving has** (¶5.b) | **Receiving has** (¶5.b) | Each facility may assume (§5.5) |
| Max turn | 20° | 20° | 20° | **30°** | 20° | 20° |
| Distance from boundary | 20 NM | 20 NM (**and AOA 10,000 MSL**) | 20 NM | **30 NM** | 20 NM | 20 NM |
| Speed changes released | Yes (¶4.d.2) | not stated | Yes (¶5.e) | not stated | not stated | Covered by §5.2 coordination |
| Transponder/beacon code | Released by transferring (¶4.d.3) | Receiving assumes (¶4.b) | **No coordination within 30 NM either side** (¶5.d) | not stated | Receiving has (¶5.b) | May assume within 20 NM (§5.5) |
| Landing within 60 NM of boundary | Enter **AOB FL240** (¶4.e, low-sector boundary) | Enter **AOB FL230**, receiving has descent+turns (¶4.c) | Enter **AOB FL230**, receiving has descent+turns (¶5.b) | Enter **AOB FL230**, receiving has descent+turns (¶5.c) | not stated | not stated |
| 5-minute-from-boundary departure coordination | not stated | not stated | Yes (¶5.f) | Yes (¶5.e) | not stated | Yes (§5.3) |
| Interim (temp) altitudes authorized | Yes (¶4.g.3) | Yes (¶4.d.3) | Yes (¶5.g.3) | Yes (¶5.f.3) | Yes (§8.b, §8.c.iii) | not stated |
| Numeric in-trail spacing | none stated | none stated | none stated | none stated | none stated | **10 NM (§5.9)** |
| Transfer-of-comms timing rule | none stated | none stated | none stated | none stated | KDTW/ECK/FNT case only (§6.a.iii) | **Prior to the boundary (§5.8)** |
| Named handoff fixes | none | none | 6 (¶5.h) | 4 (¶5.h) | none | 5 + YQT/INL (§5.15) |
| ZMP stratification given | not stated | not stated | **FL230/FL240** (¶5.i.1) | not stated | not stated | **FL230/FL240** (§5.13) |
| Neighbour stratification given | not stated | **FL230/FL240** (Att. A titles) | **FL260/FL270** (¶5.i.2) | not stated | not stated | **FL280/FL290** (§5.11) |

---

# 9. GAPS — picture-only pages that are therefore UNREAD

These pages have **no text layer beyond their titles**; they are raster images of sector maps
and cannot be read from the `.txt` or from any `pdftotext` mode. Everything they contain is
**unknown** and must not be reconstructed from memory.

| Document | Page(s) | Title present in text layer | What is therefore UNREAD |
|---|---|---|---|
| `LOA_ZMP_ZAU.pdf` | 3 | "Appendix A — Low and High Sector Airspace Depiction" | Every ZAU and ZMP sector boundary/number/altitude shown; which ZAU sectors 23/24, 25, 25/26, 60, 63, 64, 75, 94 actually abut which ZMP sectors; the low/high split altitude for the ZAU/ZMP boundary. |
| `LOA_ZMP_ZAU.pdf` | 4 | "Appendix A — Low and High Sector Airspace Depictions, Cont'd" | Same as above (second map). |
| `LOA_ZMP_ZKC.pdf` | 2 | "ATTACHMENT A — RADAR SECTORS / HIGH ALTITUDE (FL240+)" | **All ZKC and ZMP high-sector numbers and boundaries.** The ZKC LOA text names *no* sector numbers at all, so this map is the only source. |
| `LOA_ZMP_ZKC.pdf` | 3 | "LOW ALTITUDE (SFC-FL230)" | All ZKC and ZMP low-sector numbers and boundaries. |
| `LOA_ZMP_ZDV.pdf` | 3 | "ATTACHMENT A — RADAR SECTORS AND HANDOFF POINTS / ZDV LOW SECTORS (SFC-FL260) / ZDV HIGH SECTORS (FL270+)" | All ZDV sector numbers and boundaries; the plotted positions of CHAUX, WHITE, RESERVOIR, LOOP, NATOMA, LOGAN. |
| `LOA_ZMP_ZDV.pdf` | 4 | "ZMP LOW SECTORS (SFC-FL230) / ZMP HIGH SECTORS (FL240+)" | All ZMP sector numbers/boundaries on the ZDV side — including **where the ZMP29/39 boundary actually lies**, which is the qualifier that drives the entire ZMP→ZDV routing table. |
| `LOA_ZMP_ZDV.pdf` | 5 | "ZMP/ZDV BOUNDARY MANUAL COORDINATION REFERENCE POINTS" | The manual-coordination reference points themselves — **no such list exists in the text**, so these are entirely unknown. |
| `LOA_ZMP_ZDV.pdf` | 6 | "ATTACHMENT B — EAR SHELF DELEGATED AIRSPACE" | The lateral extent of the 7,000-and-below airspace ZDV delegates to ZMP (¶4.a). Only the altitude (7,000 MSL and below) and the EAR 30 NM/45° control rule are in the text. |
| `LOA_ZMP_ZOB.pdf` | 4 | "ATTACHMENT 1 — AZO/LAN APPROACH CONTROL DELEGATED AIRSPACE" | The lateral extent of the LAN Approach airspace delegated to ZOB under ¶4.a, and the AZO delegated airspace. |
| `LOA_ZMP_ZOB.pdf` | 8, 9, 10, 11 | "ATTACHMENT 4 — AIRSPACE" (p.8 only; pp.9–11 carry only the running header) | Four full pages of ZOB/ZMP airspace maps — **including any depiction of ECK and FNT sectors**, which §6 relies on. ZMP sector numbers on the ZOB side are unknown. |
| `LOA_ZMP_CZWG.pdf` | 6, 7 | *(none — running footer only: "Page 6 of 7", "Page 7 of 7")* | **Attachments A and B**, referenced by §5.6 ("Sector boundaries and FIR boundaries are as indicated in Attachments A and B") and §5.7 ("using the handoff points shown on Attachments A and B"). Both are wholly unread; the attachment titles are not even in the text layer, so which is A and which is B cannot be determined. |

## 9.1 Other things simply not in any of the six documents

- **Frequencies.** No frequency of any kind is stated in any of the six LOAs. CZWG §5.12 and
  §5.14 *require* facilities to exchange "frequencies in use" but list none. ZAU ¶4.f mentions
  coordinating "frequency assignment" but gives no values.
- **ZMP sector numbers** appear only as: ZMP 17 (ZAU App. C), ZMP11 / ZMP17 (ZLC Att. A),
  ZMP29/39 boundary (ZDV Att. C), and "Minneapolis Sector 11" as a CZWG script example. There
  is **no ZMP sector roster** in any of these six files.
- **Runways.** No runway is named in any of the six documents.
- **Headings/vectors.** No specific heading is assigned anywhere; ZOB's "H230" is a scratchpad
  *format example*, not an assignment.
- **ZAU Appendix E** referenced by ZAU ¶4.b does not exist in the document.
- ZKC, ZOB carry no named handoff fixes; ZAU carries none either.

## 9.2 Extraction caveats to carry forward

1. The `-layout` `.txt` files supplied **must not** be used to build the route tables — their
   column-to-row associations are wrong in ZAU App. C/D, ZKC Att. B, ZDV Att. C, ZOB Att. 3
   and the REF routes sheet. Use the tables in §1–§7 above, which were rebuilt from cell geometry.
2. Three cells remain genuinely undecidable and are marked **[AMBIGUOUS]**:
   ZAU App. B in-trail note scope (§1.2); ZAU App. C last two rows (§1.3);
   ZDV Att. C "No radar vectors…" note scope (§3.4); ZOB Att. 3 IAFDOF note scope (§5.6).
3. The `.txt` files render the em-dash and degree sign as `�`. Read `Appendix A � …` as
   "Appendix A — …" and `20�` as "20°".
