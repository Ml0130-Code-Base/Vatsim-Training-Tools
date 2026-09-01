# R90 / OMA ATCT / LNK ATCT — Source Extraction Notes

Extraction pass for VATSIM vZMP controller training material. Every operational number below is
followed by its paragraph citation. Nothing here is invented; anything the documents do not say is
recorded as "not stated in <file>".

## 0. Provenance and read method

| Document | Text file read | PDF beside it | Pages | Read status |
|---|---|---|---|---|
| Omaha TRACON SOP, Order R90 7220.10B CHG 2, eff. 10/27/2024 | `C:/Dev/Vatsim-Training-Tools/ZMP/R90/source-docs/txt/R90_Order_7220_10B.txt` | `.../source-docs/R90_Order_7220_10B.pdf` | 18 | Text layer read in full; 6 image-only regions UNREAD (§1) |
| Omaha Eppley ATCT, Order OMA ATCT 7110.4A CHG 1 | `.../txt/OMA_ATCT_7110_4A.txt` | `.../source-docs/OMA_ATCT_7110_4A.pdf` | 3 | Read in full. No appendices, no maps, no image-only pages. |
| Lincoln ATCT, Order LNK ATCT 7110.6A, footer date 12/26/18 | `.../txt/LNK_ATCT_7110_6A.txt` | `.../source-docs/LNK_ATCT_7110_6A.pdf` | 5 | Text layer read in full; pages 4–5 image-only, UNREAD (§1) |

Method: the `.txt` files are `pdftotext -layout` output. I read each `.txt` end to end and then
re-ran `pdftotext -layout -f N -l N` page by page against the PDFs to (a) confirm nothing was
dropped between chunks and (b) prove which pages carry no text layer. A per-page character count
was taken for all three PDFs; pages reported below as image-only returned only their heading text.

**No page rasterizer is available in this environment** (`pdftotext` is present at
`/mingw64/bin/pdftotext`; `pdftoppm`, `pdfimages`, ImageMagick, Ghostscript and Python are all
absent). The image-only content therefore could not be viewed and is listed as UNREAD rather than
guessed at.

Encoding note: the `pdftotext` output renders en/em dashes as the replacement character `�`
(e.g. `NOTE � All missed approaches`, `Arrival Areas � Area "A" �`). Below these are rendered as
`–`. This is a text-encoding artifact only; no words are missing.

---

## 1. IMAGE-ONLY / UNREAD INVENTORY (read this first)

These pages contain a heading in the text layer and nothing else. The substance is a picture with
no text layer, and no rasterizer was available, so the content is **UNREAD**. Do not author
airspace geometry from this extraction.

| Doc | PDF page | Heading present in text layer | What is therefore UNREAD |
|---|---|---|---|
| R90 7220.10B | 8 | `3-4. COMBINING/DECOMBINING POSITIONS` / `Positions are normally combined as follows:` | **The entire combining/decombining table.** The sentence ends with a colon and the next text is `3-5.` — the table that follows the colon is an image. Which position combines into which, and the resulting frequency/callsign, are UNREAD. |
| R90 7220.10B | 12 | `APPENDIX A` / `R90 Omaha Sector Boundaries` | Omaha sector boundary map — the lateral limits and altitude strata of RW, RE, RF, RO. |
| R90 7220.10B | 13 | `APPENDIX A` / `R90 Lincoln Sector Boundaries` | Lincoln sector boundary map. |
| R90 7220.10B | 14 | `APPENDIX A` / `Lincoln Final (LF) Airspace` | LF airspace lateral/vertical limits. |
| R90 7220.10B | 15 | `APPENDIX A` / `RADAR Final Boundaries` | RADAR Final (RF) boundary limits. |
| R90 7220.10B | 18 | `APPENDIX D` / `Prearranged Coordination Airspace` | The PACP airspace depiction that §3-9.b.1 and §3-9.b.2 both explicitly rely on ("as depicted in Appendix D"). Without it the PACP rule is not actionable. |
| LNK ATCT 7110.6A | 4 | `APPENDIX 1. LNK TOWER AIRSPACE` / `NORTH CONFIGURATION` | LNK tower Area "A" / Area "B" lateral limits, north config. Cited by §4.c.1 and §4.c.2. |
| LNK ATCT 7110.6A | 5 | `APPENDIX B. LNK TOWER AIRSPACE` / `SOUTH CONFIGURATION` | LNK tower Area "A" / Area "B" lateral limits, south config. |

**Every boundary the task asked for (Omaha sectors, Lincoln sectors, Lincoln Final / LF airspace,
RADAR Final boundaries, PACP airspace, LNK tower airspace) is a picture. Not one boundary is
described in words anywhere in the three documents.** Appendices with real text are only R90
Appendix B (relief checklist) and R90 Appendix C (STARS map list).

---

## 2. R90 ORDER 7220.10B — Omaha TRACON SOP

### 2.1 Document identity

- Title block (p1): `ORDER OMAHA TRACON 7220.10B` / `OMAHA TRACON STANDARD OPERATING PROCEDURES` /
  `October 27, 2024` / `VATSIM MINNEAPOLIS ARTCC`.
- Running footer on every page: `10/27/2024   FOR SIMULATION USE ONLY   R90 7220.10B CHG 2` and
  `Distribution: Facility Binders   FOR SIMULATION USE ONLY   Initiated By: ZMP`.
- Signature (p2): Dhruv Kalra, Air Traffic Manager, VATSIM Minneapolis ARTCC.
- SUBJ (p2): "Omaha TRACON (R90) Standard Operating Procedures". Applies to "Air Traffic Control
  Specialists at the Omaha TRACON on the VATSIM network."

### 2.2 Order Record of Changes (p3) — verbatim, column pairing is AMBIGUOUS

The `-layout` extraction interleaves the Description column with the date column and the row
pairing cannot be recovered reliably from the text layer. Verbatim block:

```
                    Description               Effective Date  Issued By
                                              Dec 23, 2018        DE
               Original Publication             Jul 1, 2023       DE

Frequency update, removal of voice channels.   Nov 6, 2023        DE
PACP, Chapter 3 rewrite. Updated appendix      Oct 27, 2024       DE

                        maps.
 Addition of scratchpads (3-10) and updated

                 STARS map list.
   Change of RW frequency from 120.1 to

                      135.875.
```

What is certain: four effective dates — **Dec 23, 2018; Jul 1, 2023; Nov 6, 2023; Oct 27, 2024** —
all `Issued By DE`. Four descriptions exist: "Original Publication"; "Frequency update, removal of
voice channels."; "PACP, Chapter 3 rewrite. Updated appendix maps."; "Addition of scratchpads
(3-10) and updated STARS map list. Change of RW frequency from 120.1 to 135.875." **Which
description belongs to which date is not recoverable from the text layer** — do not assert a
pairing. (Corroboration only: §2-1 does list Radar West as 135.875, and the §2-1 table has no
voice-channel column.)

### 2.3 Table of contents with page numbers (p4) — verbatim

```
CHAPTER 1. INTRODUCTION ...................................................... 5
CHAPTER 2. POSITION DUTIES AND RESPONSIBILTIES.............................. 6
  2-1. COMMUNICATIONS........................................................ 6
  2-2. POSITION RESPONSIBILITIES COMMON TO ALL RADAR POSITIONS ............. 6
CHAPTER 3. GENERAL........................................................... 7
  3-1. DUTY FAMILIARIZATION ................................................. 7
  3-2. RELIEF BRIEFING....................................................... 7
  3-3. TRANSFER OF POSITION RESPONSIBILITY .................................. 7
  3-4. COMBINING/DECOMBINING POSITIONS....................................... 8
  3-5. INTRA-FACILITY TRANSFER OF CONTROL ................................... 8
  3-7. AUTOMATED POINT OUTS ................................................. 8
  3-8. ARRIVAL PROCEDURES ................................................... 9
  3-9. PREARRANGED COORDINATION ............................................. 9
  3-10. SCRATCH PAD ENTRIES.................................................. 10
APPENDIX A .................................................................. 12
  R90 Omaha Sector Boundaries ............................................... 12
  R90 Lincoln Sector Boundaries ............................................. 13
  Lincoln Final (LF) Airspace................................................ 14
  RADAR Final Boundaries..................................................... 15
APPENDIX B .................................................................. 16
APPENDIX C .................................................................. 17
APPENDIX D .................................................................. 18
```

As-written anomaly: **3-6 is missing from the TOC** but §3-6 does exist in the body on p8. The TOC
jumps 3-5 → 3-7.

### 2.4 Chapter 1 — Introduction (p5)

- **1-1 Purpose:** establishes SOPs for Omaha TRACON personnel on VATSIM "to maintain a safe and
  efficient operation and the jurisdictional boundaries for each operational position/sector,
  responsibility for duty familiarization and transfer of position responsibility."
- **1-2 Distribution:** "distributed to all VATSIM Minneapolis ARTCC controllers."
- **1-3 Cancellation:** "This order cancels **vZMP R90 SOP 7110.10B CHG 1, dated Nov 6, 2023**."
  As-written anomaly: the cancelled document is numbered **7110**.10B while this order is
  **7220**.10B. Quoted exactly as printed; do not silently normalize.

### 2.5 §2-1 COMMUNICATIONS — position / frequency / STARS ID / callsign (p6)

Preamble: "Controllers operating R90 TRACON positions must configure their radar client
frequencies, callsigns, and voice channels as follows." (R90 7220.10B 2-1)

| Position Name | Frequency | STARS ID | Callsign |
|---|---|---|---|
| Radar West | 135.875 | W | OMA_W_APP |
| Radar East | 124.500 | X | OMA_X_APP |
| Radar Final | 133.325 | V | OMA_V_APP |
| Radar Offutt | 124.950 | O | OMA_O_APP |
| Radar Lincoln | 124.000 | L | LNK_L_APP |
| Lincoln Final | 128.150 | F | LNK_F_APP |

Notes on this table, as written:
- The preamble says "and voice channels" but **the table has no voice-channel column** (consistent
  with the record-of-changes entry "removal of voice channels"). No voice channels are stated in
  R90 7220.10B.
- STARS ID for Radar Final is **V**, not F; Lincoln Final is **F**. Radar East is **X**, not E.
- Six radar positions total. **No non-radar / flight-data / TMU position is listed** in this order.
- The order **never states what each position owns in words** — ownership is only in the Appendix A
  pictures (UNREAD, §1). The only ownership statements anywhere in the order are the incidental
  ones in §3-8 (RW/RE own OMA+OFF arrival information, LW owns LNK arrival information) and §3-9.b
  (RW and RE each own PACP airspace the other may use).

### 2.6 §2-2 Position responsibilities common to all radar positions (p6) — verbatim a–h

- a. Make necessary STARS configuration entries.
- b. Ensure auto-acquisition for departures at satellite airports.
- c. Provide direct control of aircraft.
- d. Coordinate pilot applied visual separation prior to communication transfer to an adjacent
  sector or facility.
- e. Complete required data block entries prior to initiating transfer of radar identification,
- f. Resolve all potential conflicts prior to transferring radio communication.
- g. Ensure radar hand-off/point-outs are accomplished. Accepts and initiates automated hand-offs.
- h. Each position must monitor and operate communications equipment and select and utilize the
  associated frequencies defined in section 2-1.

(Item e ends with a comma in the source; transcribed as printed.)

### 2.7 §3-1 Duty familiarization (p7)

"Prior to assuming an operational position, each specialist must become familiar with the current
status of the air traffic control system as it relates to the Omaha area." Must include:

- a. Current weather and forecasts.
- b. vZMP IDS: Status Information pages for R90 TRACON airspace.
- c. System Status Area.
- d. Position Information — 1. SIGMETS. 2. CWAs. 3. TMU Resitrictions. *(spelling as printed)*

NOTE (verbatim): "Stating **'I have one and two'** must imply the relieving controller has at a
minimum complied with the provisions defined above." (R90 7220.10B 3-1)

### 2.8 §3-2 Relief briefing (p7)

"All operational positions require a Position Relief Briefing before a specialist may assume
responsibility for that position. **This also applies to the combining and decombining of
positions.** Use the position checklist, check equipment, monitor traffic, and get the 'total
picture.'"
- a. The position relief briefing checklist is located in Appendix B. (R90 7220.10B 3-2.a)

### 2.9 §3-3 Transfer of position responsibility (p7)

- a. All positions must maintain operational continuity during transfer of position responsibility.
- b. **The relieving specialist must monitor the specialist being relieved for at least two minutes
  prior to taking the position.** (R90 7220.10B 3-3.b)
- c. The specialist being relieved must monitor the position for an adequate period of time
  (**minimum of two minutes**) in order to complete the following steps:
  1. Review checklist, SIAs, written notes, and other prescribed sources of information and advise
     the relieving specialist of known omissions, updates, or inaccuracies.
  2. Observe and monitor overall position operation to determine if assistance is needed.
  3. If assistance is needed, provide or summon it as appropriate.

### 2.10 §3-4 Combining/decombining positions (p8) — **TABLE IS A PICTURE, UNREAD**

Complete text-layer content of this paragraph:

> `3-4. COMBINING/DECOMBINING POSITIONS`
> `Positions are normally combined as follows:`

That is all. The combining matrix is an image with no text layer (§1). **Which positions combine
into which, and under what callsign/frequency, is not stated in text in R90_Order_7220_10B.txt.**
Related rule that IS text: §3-2 requires a full Position Relief Briefing for combining and
decombining.

### 2.11 §3-5 Intra-facility transfer of control (p8) — verbatim

- a. Transfer of control occurs after a hand-off **and** frequency change has been accomplished.
- b. **Receiving controller has control for descent and turns of up to 45 degrees** for aircraft
  landing at airports in which they provide approach control service. (R90 7220.10B 3-5.b)
- c. Any control instruction that requires coordination with another sector/facility is the
  responsibility of the controller issuing the control instruction.

### 2.12 §3-6 Intra-facility transfer of communications (p8) — verbatim

"Transfer of radio communications must occur **before** an aircraft enters the receiving
controller's area of jurisdiction." (R90 7220.10B 3-6)

### 2.13 §3-7 Automated point outs (p8) — verbatim

"Transfer of radar identification must be accomplished in accordance with **FAA Order 7110.65,
Chapter 5, Section 4**. When utilizing Automated Point Out procedures, **heading, speed, and
altitude information does not need to be transferred between TRACON positions** provided the data
block contains the appropriate scratch pad information and the type aircraft." (R90 7220.10B 3-7)

"Note: Automated Point Out Procedures to the controller responsible for sequencing **MUST NOT be
used for Eppley/Lincoln and Offutt arrivals.**" (R90 7220.10B 3-7 Note)

### 2.14 §3-8 Arrival procedures (p9)

Lead-in: "**RW/RE** must ensure all OMA and OFF arrivals have approach information and airport
conditions. **LW** must ensure all LNK arrivals have approach information and airport conditions."
(R90 7220.10B 3-8)

> As-written anomaly: **"LW" is used here but is not defined anywhere in the order.** §2-1 names the
> Lincoln en-route/feeder position "Radar Lincoln" with STARS ID **L** / callsign LNK_L_APP. The
> order never expands "LW". Flag for the authoring phase; do not silently rewrite it to "RL" or "L".

Abbreviations used in this paragraph and where they are anchored: RW = Radar West, RE = Radar East,
RF = Radar Final, RO = Radar Offutt, LF = Lincoln Final (all from §2-1 position names). "LW" is
unanchored.

**a. Omaha Arrivals**
1. Aircraft will be on a procedure or assigned a heading or direct a fix that penetrates **RF**
   airspace.
2. Once a handoff is accepted, **no changes to assigned heading or assigned altitude without verbal
   approval from the receiving controller.**
3. The setup must allow the aircraft to conduct a stabilized approach.
4. **RF must obtain approval from OMA Tower for all opposite direction arrivals.**

**b. Offutt Arrivals**
1. Aircraft will be on a procedure or assigned a heading or direct a fix that **allows for a
   stabilized approach** (note: no "penetrates X airspace" wording here, unlike OMA and LNK).
2. No changes to assigned heading or assigned altitude after handoff acceptance without verbal
   approval from the receiving controller.
3. **RO must obtain approval from OFF Tower for all opposite direction arrivals.**

**c. Lincoln Arrivals**
1. Aircraft will be on a procedure or assigned heading or direct a fix that penetrates **LF**
   airspace.
2. Once a handoff is accepted, no changes to assigned heading or assigned altitude without verbal
   approval from the receiving controller.
3. The setup must allow the aircraft to conduct a stabilized approach.
4. **LF must obtain approval from LNK Tower for all opposite direction arrivals.**

**d. Satellite Arrivals**
1. Aircraft will be on a procedure or assigned a heading or direct a fix that allows for a
   stabilized approach.
2. Once a handoff is accepted, no changes to assigned heading or assigned altitude without verbal
   approval from the receiving controller.
   *(No item 3 and no opposite-direction/tower-approval item for satellites.)*

### 2.15 §3-9 Prearranged coordination (PACP) (p9) — verbatim, complete

**a. General**
1. "All aircraft entering prearranged coordination airspace must have an **operational transponder
   and the associated full data block**." (R90 7220.10B 3-9.a.1)

**b. Omaha Tower Departures**
1. "**RE must only use prearranged coordination airspace owned by RW** to climb and turn OMA
   departures into RE airspace **as depicted in Appendix D**." (R90 7220.10B 3-9.b.1)
2. "**RW must only use prearranged coordination airspace owned by RE** to climb and turn OMA
   departures into RW airspace **as depicted in Appendix D**." (R90 7220.10B 3-9.b.2)

Scope limits, as written: §3-9 has **only** sub-paragraphs a and b. **PACP is defined only for
Omaha Tower departures between RW and RE.** No PACP is stated for Lincoln, Offutt, RF, LF, or
satellites. The governing geometry is Appendix D, which is a picture (UNREAD, §1).

### 2.16 §3-10 Scratch pad entries (pp10–11) — FULL, all four tables

Lead-in: "The primary scratch pad for all arrival aircraft should be entered as follows:"
(R90 7220.10B 3-10)

#### 2.16.1 OMA Arrival Scratch Pad Entries (p10)

| APPROACH | TERMINATION |
|---|---|
| `I` = ILS (Ex: I8V, IRW, I6F, ILE) | `F` = Full Stop |
| `R` = RNAV Y (Ex: R8F, RLZ, RRW, R6P | `Z` = Tower VFR Pattern |
| `RN` = RNAV Z (Ex: RN8, RNR, RNL, RN6) | `E` = Miss to East (**Frequency 124.5**) |
| `O` = Overhead (OLF, ORZ, O8F, O6Z) | `W` = Miss to West (**Frequency 135.875**) |
| `32L, 32R, R36, R18, 14R, 14L` denotes visual approach to a full stop. | `V` = Miss to OVR (**Frequency 124.5**) |
| `OMA` = Tower sequenced VFRs | `P` = Published Miss (**Frequency 124.5**) |

OMA notes, verbatim:
- "NOTE – **All missed approaches should be assigned 135.875 when RE is not open.**"
- "`T*G` = Touch and Go – **Runway assignment at Tower's discretion**"

Transcription flags (as printed, not corrected): the RNAV Y line `R = RNAV Y (Ex: R8F, RLZ, RRW,
R6P` has an **unclosed parenthesis** and the last example lacks a closing paren. The visual-approach
list mixes bare runway designators with `R`-prefixed ones — `32L, 32R, R36, R18, 14R, 14L` — exactly
as printed.

Frequency cross-check (mine, from §2-1): 124.5 = Radar East, 135.875 = Radar West. The order does
not spell this out in §3-10; the mapping is stated only in §2-1.

#### 2.16.2 LNK Arrival Scratch Pad Entries (p10)

| APPROACH | RUNWAY | TERMINATION |
|---|---|---|
| `I` = ILS | `2` = R32 | `E` = East departure |
| `L` = Localizer | `4` = R14 | `F` = Full stop |
| `O` = Overhead | `5` = R35 | `W` = West departure |
| `R` = RNAV | `6` = R36 | `Z` = Tower pattern |
| `T` = TACAN | `7` = R17 | `P` = Published missed approach |
| `V` = VOR | `8` = R18 | |

Note, verbatim: "\*Runway only in scratchpad indicates a **Visual Approach** to that runway"

This LNK runway-digit table is the one place in the SOP that enumerates LNK runways in text:
**R14, R17, R18, R32, R35, R36.**

#### 2.16.3 CBF Arrival Scratch Pad Entries (p10)

| APPROACH | TERMINATION |
|---|---|
| `R` = RNAV (Ex: R8E, R6F, R2E, R8F, R4P) | `E` = Miss to East |
| `I` = ILS Rwy 36 (Ex: I\*F, I\*E) | `P` = Published Miss |
| `VR` = VOR-A (Ex: VRF, VRE) | `F` = Full Stop |
| `VA` = Visual Approach (Ex: VA) | |
| `CBF` = VFR Arrival | |

Note, verbatim: "NOTE – **CBF IFR/VFR practice approaches should have 'CBF' entered into their
secondary scratchpad.**"

The only CBF runway stated in text is **Rwy 36** (from "I = ILS Rwy 36").

#### 2.16.4 All other airports — arrival scratch pad entries (p11)

| APPROACH | RUNWAY |
|---|---|
| `I` = ILS | Digits of runway number **or last digit and L/R if parallel runways.** |
| `R` = RNAV | (Ex: **ILS 34R would be I4R, ILS 30 would be I30**.) |
| `L` = Localizer | |
| `T` = TACAN | |
| `V` = VOR | |
| `VA` = Visual Approach | |

### 2.17 Appendix A (pp12–15) — **all four pages are pictures, UNREAD**

Text layer holds only these headings: p12 `R90 Omaha Sector Boundaries`; p13 `R90 Lincoln Sector
Boundaries`; p14 `Lincoln Final (LF) Airspace`; p15 `RADAR Final Boundaries`. See §1. No sector
boundary, altitude stratum, shelf, or delegated-airspace limit for any R90 sector is stated in text
anywhere in R90_Order_7220_10B.txt.

### 2.18 Appendix B (p16) — Position Relief Checklists — HAS TEXT, verbatim

Heading: `APPENDIX B` / `Position Relief Checklists` / `RADAR POSITION RELIEF CHECKLIST`

1. Status information areas
2. Weather trends
3. Equipment Status
4. Airport closures
5. **Verbally state runway status (OMA and OFF) or (LNK).**
6. Communications status and Traffic:
   - a. Special activity aircraft: \*Flight check, \*airshows, \*restricted areas
   - b. Coordination agreements: **\*OMA Tower, \*OFF Tower, \*LNK Tower, \*ZMP/SUX, \*Other Positions**
   - c. Special problems, requests, or instructions.
   - d. Aircraft released but not airborne.
   - e. Aircraft handed off, but still in our airspace.
   - f. Point outs: \*to, \*from
   - g. Non-beacon/Primary aircraft.
   - h. Holding aircraft.
   - i. Aircraft standing by for service.

Only one checklist exists ("RADAR POSITION RELIEF CHECKLIST") despite the plural heading
"Position Relief Checklists". Item 6.b is the only place the order names its external coordination
partners: **OMA Tower, OFF Tower, LNK Tower, ZMP, SUX.**

### 2.19 Appendix C (p17) — R90 MAPS (the STARS map list) — HAS TEXT, complete

Heading: `APPENDIX C` / `R90 MAPS`. Reproduced below in numeric order (source prints it in four
columns). 137 entries. Gaps in the numbering (18, 28, 33, 39, 45, 46, 55, 73–80, 87–89, 91–98,
101–110, 117–130, 133, 135–139, 141–200, 213, 216–219, 222–224, 235, 238–249, 257–260, 264–269,
273–300, 306–499) are **absent from the source**, not omitted here.

| # | Map | # | Map | # | Map |
|---|---|---|---|---|---|
| 1 | MAIN | 62 | CBF G36 | 227 | BIEV13 |
| 2 | N FLOW | 63 | CBF G18 | 228 | BIEV17 |
| 3 | S FLOW | 64 | AFK 15 | 229 | CEKG17 |
| 4 | RWY 36 | 65 | TQE G14 | 230 | CEKG35 |
| 5 | 5NM CIR | 66 | VR ROUT | 231 | CEKV17 |
| 6 | 3NM CIR | 67 | R90067S | 232 | CEKV35 |
| 7 | STATE | 68 | R90068S | 233 | 93YG14 |
| 8 | ZMP | 69 | CBF ILS | 234 | 93YG32 |
| 9 | ARPTS | 70 | ATC 0 | 236 | SWTG16 |
| 10 | J RTS | 71 | OFFGP13 | 237 | SWTG34 |
| 11 | V RTS | 72 | OFFGP31 | 250 | SHELF2 |
| 12 | STADIUM | 81 | RNP 18 | 251 | ANT |
| 13 | GEO | 82 | RNP 32R | 252 | GEO LAB |
| 14 | OMA G32 | 83 | RNP 32L | 253 | MVA |
| 15 | OMA G14 | 84 | RNP 36 | 254 | FUS MVA |
| 16 | OMA G18 | 85 | RNP 14R | 255 | LF NORT |
| 17 | OMA G36 | 86 | RNP 14L | 256 | LF SOUT |
| 19 | CBF V A | 90 | FET G32 | 261 | R90261S |
| 20 | CBF G32 | 99 | PA BLKS | 262 | R90262S |
| 21 | CBF G14 | 100 | LIST | 263 | R90263S |
| 22 | MLE G12 | 111 | OFF001S | 270 | R90270S |
| 23 | MLE G30 | 112 | OFF002S | 271 | R90271S |
| 24 | PMV G34 | 113 | OFF003S | 272 | R90 CTV |
| 25 | PMV G16 | 114 | OFF004S | 301 | L NFLOW |
| 26 | PMV N34 | 115 | OFF005S | 302 | L SFLOW |
| 27 | PMV N16 | 116 | OFF006S | 303 | LNKT N |
| 29 | HNR G33 | 131 | OMAHA | 304 | LNKT S |
| 30 | HNR G15 | 132 | CBF | 305 | LNK ZEX |
| 31 | FET G13 | 134 | KELLY | 500 | FLC C36 |
| 32 | FET V13 | 140 | MVA LAB | 501 | FLC L18 |
| 34 | AHQ G20 | 201 | L SHELF | 502 | FLC L36 |
| 35 | AHQ N20 | 202 | LNK M | 503 | FLC O13 |
| 36 | AFK G33 | 203 | L HT18 | 504 | FLC O31 |
| 37 | AFK N15 | 204 | L HI18 | 505 | FLC 14L |
| 38 | AFK N33 | 205 | LNK G14 | 506 | FLC 14R |
| 40 | TQE G33 | 206 | LNK G18 | 507 | FLC E18 |
| 41 | SCB V35 | 207 | LNK G36 | 508 | FLC 32L |
| 42 | SCB G35 | 208 | L HI36 | 509 | FLC 32R |
| 43 | SCB G17 | 209 | L HT36 | 510 | FLC E36 |
| 44 | SDA V12 | 210 | LNK V17 | | |
| 47 | RDK G17 | 211 | LNK V18 | | |
| 48 | RDK G5 | 212 | LNKTMVA | | |
| 49 | RDK V A | 214 | MOA | | |
| 50 | MAIN-2 | 215 | LNK C | | |
| 51 | ILS32R1 | 220 | LNKNFLO | | |
| 52 | ILS32R2 | 221 | LNKSFLO | | |
| 53 | OFF EXT | 225 | BIEG13 | | |
| 54 | ILS14L1 | 226 | BIEG17 | | |
| 56 | GPS14L | | | | |
| 57 | GPS32R | | | | |
| 58 | ILS14L2 | | | | |
| 59 | SDA G4 | | | | |
| 60 | STARS N | | | | |
| 61 | STARS S | | | | |

The order gives **no legend** for these map names. It does not say what MAIN, N FLOW, S FLOW,
PA BLKS, LIST, ATC 0, KELLY, MOA, ANT, SHELF2, FUS MVA, the R90nnnS series, the OFFnnnS series, or
the FLC series depict, nor which position loads which map. That is not stated in
R90_Order_7220_10B.txt.

### 2.20 Appendix D (p18) — Prearranged Coordination Airspace — **PICTURE, UNREAD**

Text layer: heading only. See §1. The PACP geometry that §3-9.b depends on is unavailable.

---

## 3. OMA ATCT ORDER 7110.4A CHG 1 — Omaha Eppley Tower

### 3.1 Document identity

- Title block: `ORDER OMA ATCT 7110.4A CHG 1`, SUBJ: `STANDARD OPERATING PROCEDURES`.
- Footer: `FOR SIMULATION USE ONLY   Page N`. 3 pages, all text.
- Signature: Dhruv Kalra, Air Traffic Manager, VATSIM Minneapolis ARTCC.
- **No effective date is printed anywhere in this document** — not stated in OMA_ATCT_7110_4A.txt.
- **1. PURPOSE:** prescribes ATC procedures and defines operational responsibilities for personnel
  providing ATC services "within Omaha ATCT designated airspace."
- **2. DISTRIBUTION:** all vZMP personnel.
- **3. CANCELLATION:** "vZMP OMA ATCT 7110.4A." (As written: CHG 1 cancels the base 7110.4A. No date
  given for the cancelled edition.)

### 3.2 §4 Descriptions — profiles and jurisdiction

- **4.a South profile** — "traffic flow conditions where aircraft are landing and/or departing
  **Runways 14R, 14L, and Runway 18**." (OMA 7110.4A 4.a)
- **4.b North Profile** — "aircraft are landing and/or departing **runways 32L, 32R, and Runway 36**."
  (OMA 7110.4A 4.b)
- **4.c Designated area of jurisdiction:**
  1. **Ground Control** — "all movement areas **excluding the runways**." (4.c.1)
  2. **Local Control** — "all runways and the airspace **within a 5nm radius of Omaha Eppley
     Airfield, at and below 3000' MSL**." (4.c.2)

So OMA runways named in this order: **14L, 14R, 18, 32L, 32R, 36** (six runway ends across three
physical runways as named; the order does not say how many physical runways exist).

### 3.3 §5.a Clearance Delivery

1. Use primary frequency **119.9**. (5.a.1)
2. Process and forward flight plan information to GC and LC. (5.a.2)
3. Issue clearances and ensure accuracy of pilot read back. (5.a.3)
4. **Issue the following initial altitudes, or filed altitude if lower** (5.a.4):

| Aircraft category | Initial altitude | Cite |
|---|---|---|
| IFR Turbojet | **5,000' MSL** | OMA 7110.4A 5.a.4.a |
| IFR prop-driven | **4,000' MSL** | OMA 7110.4A 5.a.4.b |
| VFR/SVFR turbojet | **5,000' MSL** | OMA 7110.4A 5.a.4.c |
| VFR/SVFR prop-driven | **3,500' MSL** | OMA 7110.4A 5.a.4.d |

5. **Issue the OMA departure procedure to all departing IFR aircraft.** (5.a.5)
   *(The order does not name the procedure or give its text — not stated in OMA_ATCT_7110_4A.txt.)*

### 3.4 §5.b Ground Control

1. Use primary frequency **121.9**. (5.b.1)
2. Issue taxi instructions to all inbound/outbound aircraft. (5.b.2)
3. **Coordinate runway crossings with LC, as appropriate.** (5.b.3)

### 3.5 §5.c Local Control

1. Use primary frequency **132.1**. (5.c.1)
2. Determine active runway(s) in use. (5.c.2)
   - a. "When winds are **less than 5 knots** from any direction, **north profile is the preferred
     operation**. When winds are **5 knots or greater**, select the profile most closely aligned
     with the winds." (5.c.2.a)
3. **Provide Class C services to aircraft operating in OMA Class C airspace.** (5.c.3)
4. **Assign following headings to departing IFR aircraft** (5.c.4):

| Profile | Aircraft | Heading | R90 sector | Cite |
|---|---|---|---|---|
| North | Turbojet | **320** | R90 **West** sector | 5.c.4.a.1 |
| North | Turbojet | **360** | **East** sector | 5.c.4.a.1 |
| North | Prop-driven | **300 clockwise through 020** | (not stated) | 5.c.4.a.2 |
| South | Turbojet | **180** | R90 **West** sector | 5.c.4.b.1 |
| South | Turbojet | **140** | **East** sector | 5.c.4.b.1 |
| South | Prop-driven | **120 clockwise through 200** | (not stated) | 5.c.4.b.2 |

  - c. "Appropriate headings shall: 1. Provide separation from prior departures, and; 2. Allow
    TRACON to turn the aircraft on course reference prior departures. 3. **Prop-driven aircraft with
    on-course heading in the fan area shall be assigned the on-course headings.**" (5.c.4.c)
5. Coordinate taxi movements as required with GC. (5.c.5)
6. **"Assign missed approaches 3,000' MSL and heading 360 on north profile or heading 140 on south
   profile."** (OMA 7110.4A 5.c.6)

### 3.6 §6 ATCT positions and frequencies

"Controllers operating OMA ATCT positions must utilize the following radar client frequencies."

| Position Name | Frequency | Callsign |
|---|---|---|
| Clearance Delivery | 119.900 | OMA_DEL |
| Ground Control | 121.900 | OMA_GND |
| Local Control | 132.100 | OMA_TWR |
| ATIS | 120.400 | KOMA_ATIS |

No voice channels, no STARS IDs, and **no Local Control 2 / Flight Data / Cab Coordinator position**
are listed in this order.

### 3.7 Not stated in OMA_ATCT_7110_4A.txt

Tower hours of operation; OMA **Class C dimensions** (only "OMA Class C airspace" by reference,
5.c.3); any Class B or Class D reference; VFR pattern altitudes; tower-to-TRACON handoff/release
rules; runway lengths; taxiway names; LAHSO; opposite-direction procedures (that rule lives in R90
7220.10B 3-8.a.4, on RF, not on the tower); intersection departures; the content of the "OMA
departure procedure" named in 5.a.5.

---

## 4. LNK ATCT ORDER 7110.6A — Lincoln Tower

### 4.1 Document identity

- Title block: `ORDER LNK ATCT 7110.6A`, SUBJ: `STANDARD OPERATING PROCEDURES (SOP)`.
- Footer: `LNK ATCT 7110.6A   FOR SIMULATION USE ONLY   12/26/18` and `Distribution: Facility
  Binders ... Initiated by: ZMP`. **Date 12/26/18** appears in the footer; the document carries no
  separate "effective date" line and **no CHG number**.
- No signature block appears in the text layer of this order.
- **1. PURPOSE:** procedures and operational responsibilities "within the Lincoln Tower designated
  airspace."
- **2. DISTRIBUTION:** all vZMP personnel.
- **3. CANCELLATION:** "vZMP ATCSOP Rev. 7, Section 4.6 Lincoln Municipal Airport, Lincoln, NE
  (KLNK)."

### 4.2 §4 Descriptions — configurations and jurisdiction

- **4.a "north configuration"** — "aircraft are landing and/or departing **runways 36, 35, and 32**."
  (LNK 7110.6A 4.a)
- **4.b "south configuration"** — "aircraft are landing and/or departing **runways 18, 17, and 14**."
  (LNK 7110.6A 4.b)
- **4.c Designated Areas of Jurisdiction:**

| Area | Name | Vertical limit | Lateral limit | Cite |
|---|---|---|---|---|
| **A** | Arrival Areas — "Airspace delegated to Local Control" | **surface up to and including 3000 MSL** | "determined by a North or South configuration (**Appendices 1 and 2**)" — **PICTURE, UNREAD** | 4.c.1 |
| **B** | Departure Areas — "Airspace delegated to LC" | **surface up to and including 4000 MSL** | "determined by a north or south configuration (**Appendices 1 and 2**)" — **PICTURE, UNREAD** | 4.c.2 |
| — | **Class C Airspace** — "Airspace surrounding Lincoln Airport in which Class C Radar Service is provided to VFR aircraft." | **not stated** | **not stated** | 4.c.3 |

Note: §4.c.1/4.c.2 cite "Appendices 1 and 2", but the appendix pages are actually labelled
`APPENDIX 1` (p4, north) and `APPENDIX B` (p5, south) — **inconsistent labelling in the source**,
transcribed as printed.

### 4.3 §5 Procedures

- **5.a** "Positions of operation must resolve all potential conflicts between arrivals/departures
  and other aircraft within their own areas of jurisdiction **prior to transferring the aircraft's
  radio communication**." (5.a)
- **5.b** "**Standard departure points for runways 18/36, 17/35, and 14/32 are the ends. The East
  helipad is a standard helicopter departure point for civilian helicopters.**" (5.b)
- **5.c** "When simultaneous visual approaches are being conducted to multiple runways, **it must be
  included in the ATIS**." (5.c)

### 4.4 §6.a Local Control

"This position is responsible for the **sequencing and separation of aircraft operating within LC's
delegated airspace**." LC shall:

1. Use primary frequency **118.5**. (6.a.1)
2. "**Monitor and ensures radar separation is maintained between successive IFR or practice
   instrument approaches until visual separation can be provided. LC shall advice TRACON when Local
   is unable to provide visual separation.**" (6.a.2) *(spelling "ensures"/"advice" as printed)*
3. **Select and notify TRACON of runway(s) in use.** (6.a.3)
   - a. "The preferred calm wind operating is a **north configuration**. When winds are **6 knots or
     greater**, select the configuration most closely aligned with the wind." (6.a.3.a)
     *(Note: LNK threshold is 6 kt; OMA's is 5 kt — the two orders differ.)*
4. **Provide Class C services to aircraft in LNK Class C airspace.** (6.a.4)
5. **Issue the following missed approach instructions** (6.a.5):

| Configuration | Missed approach instruction | Cite |
|---|---|---|
| North | **Heading 300/030 degrees and 3000' MSL** | LNK 7110.6A 6.a.5.a.1 |
| South | **Heading 210/140 and 3000' MSL** | LNK 7110.6A 6.a.5.b.1 |

6. **"Tower must assign headings to departures within the fan areas"** (6.a.6):
   - a. **North profile – heading 300 clockwise through 030.** (6.a.6.a)
   - b. **South profile – Heading 140 clockwise through 210.** (6.a.6.b)
   - c. "Aircraft with an on course heading that falls **between** the fan areas will be assigned a
     heading closest to an on course heading." (6.a.6.c)
   - d. Headings must: 1. Provide separation from prior departures, and; 2. **Allow TRACON to turn
     the aircraft on course at the earliest opportunity reference prior departures.** (6.a.6.d)

   *(As-written: §4 uses "configuration", §6.a.6 switches to "profile". Same north/south sense.)*

### 4.5 §6.b Ground Control

"Responsible for all traffic operating on the movement areas, **excluding the active runways**."
1. Use primary frequency **121.9**. (6.b.1)
2. Issue taxi instructions to all inbound and outbound aircraft. (6.b.2)
3. **Coordinate runway crossings with LC, when required.** (6.b.3)

### 4.6 §6.c Clearance Delivery

1. Use primary frequency **120.7**. (6.c.1)
2. Issue IFR/VFR/SVFR clearances to all aircraft. (6.c.2)
3. Forward flight progress strips to GC when CD functions are complete. (6.c.3)
4. **"Issue 4000' MSL initially to all outbound IFR/VFR/SVFR aircraft, or lower if requested."**
   (LNK 7110.6A 6.c.4) — one altitude for all categories, unlike OMA's four-way split.

### 4.7 §7 ATCT positions and communications

"Controllers operating LNK ATCT positions must utilize the following radar client frequencies and
voice channels."

| Position Name | Frequency | Callsign | Voice Channel |
|---|---|---|---|
| Clearance Delivery | 120.700 | LNK_DEL | LNK_120.70 |
| Ground Control | 121.900 | LNK_GND | LNK_121.90 |
| Local Control | 118.500 | LNK_TWR | LNK_118.500 |
| ATIS | 118.050 | KLNK_ATIS | *(none listed)* |

Voice-channel strings transcribed exactly as printed, including the inconsistent formatting
(`LNK_120.70`, `LNK_121.90`, `LNK_118.500`).

### 4.8 Appendices 1 / B (pp4–5) — **PICTURES, UNREAD**

`APPENDIX 1. LNK TOWER AIRSPACE — NORTH CONFIGURATION` (p4) and `APPENDIX B. LNK TOWER AIRSPACE —
SOUTH CONFIGURATION` (p5). Heading text only; the airspace depictions carry no text layer. See §1.

### 4.9 Not stated in LNK_ATCT_7110_6A.txt

Tower hours of operation; LNK **Class C dimensions**; any Class B or Class D reference; departure
initial-altitude split by aircraft type (single 4000' for all, 6.c.4); tower-to-TRACON handoff/
release rules; VFR pattern altitudes; runway lengths; the LNK departure procedure name.

---

## 5. Cross-document consolidated tables

### 5.1 Every position, frequency and callsign in the three documents

| Facility | Position | Frequency | STARS ID | Callsign | Voice channel | Source |
|---|---|---|---|---|---|---|
| R90 TRACON | Radar West | 135.875 | W | OMA_W_APP | — | R90 7220.10B 2-1 |
| R90 TRACON | Radar East | 124.500 | X | OMA_X_APP | — | R90 7220.10B 2-1 |
| R90 TRACON | Radar Final | 133.325 | V | OMA_V_APP | — | R90 7220.10B 2-1 |
| R90 TRACON | Radar Offutt | 124.950 | O | OMA_O_APP | — | R90 7220.10B 2-1 |
| R90 TRACON | Radar Lincoln | 124.000 | L | LNK_L_APP | — | R90 7220.10B 2-1 |
| R90 TRACON | Lincoln Final | 128.150 | F | LNK_F_APP | — | R90 7220.10B 2-1 |
| OMA ATCT | Clearance Delivery | 119.900 | — | OMA_DEL | — | OMA 7110.4A 6 |
| OMA ATCT | Ground Control | 121.900 | — | OMA_GND | — | OMA 7110.4A 6 |
| OMA ATCT | Local Control | 132.100 | — | OMA_TWR | — | OMA 7110.4A 6 |
| OMA ATCT | ATIS | 120.400 | — | KOMA_ATIS | — | OMA 7110.4A 6 |
| LNK ATCT | Clearance Delivery | 120.700 | — | LNK_DEL | LNK_120.70 | LNK 7110.6A 7 |
| LNK ATCT | Ground Control | 121.900 | — | LNK_GND | LNK_121.90 | LNK 7110.6A 7 |
| LNK ATCT | Local Control | 118.500 | — | LNK_TWR | LNK_118.500 | LNK 7110.6A 7 |
| LNK ATCT | ATIS | 118.050 | — | KLNK_ATIS | — | LNK 7110.6A 7 |

**OFF (Offutt) tower is referenced but never given a frequency or callsign** in any of the three
documents (referenced at R90 7220.10B 3-8.b.3 and Appendix B item 6.b). Not stated.

### 5.2 Initial departure altitudes

| Airport | Category | Altitude | Cite |
|---|---|---|---|
| OMA | IFR Turbojet | 5,000' MSL | OMA 7110.4A 5.a.4.a |
| OMA | IFR prop-driven | 4,000' MSL | OMA 7110.4A 5.a.4.b |
| OMA | VFR/SVFR turbojet | 5,000' MSL | OMA 7110.4A 5.a.4.c |
| OMA | VFR/SVFR prop-driven | 3,500' MSL | OMA 7110.4A 5.a.4.d |
| OMA | (all of the above) | "**or filed altitude if lower**" | OMA 7110.4A 5.a.4 |
| LNK | All outbound IFR/VFR/SVFR | 4,000' MSL, "**or lower if requested**" | LNK 7110.6A 6.c.4 |
| OFF | — | **not stated in any of the three documents** | — |

### 5.3 Standard departure headings

| Airport | Flow | Aircraft | Heading | Cite |
|---|---|---|---|---|
| OMA | North (32L/32R/36) | Turbojet → R90 **West** | 320 | OMA 5.c.4.a.1 |
| OMA | North | Turbojet → **East** | 360 | OMA 5.c.4.a.1 |
| OMA | North | Prop-driven | 300 clockwise through 020 | OMA 5.c.4.a.2 |
| OMA | South (14R/14L/18) | Turbojet → R90 **West** | 180 | OMA 5.c.4.b.1 |
| OMA | South | Turbojet → **East** | 140 | OMA 5.c.4.b.1 |
| OMA | South | Prop-driven | 120 clockwise through 200 | OMA 5.c.4.b.2 |
| LNK | North (36/35/32) | (fan area, type not split) | 300 clockwise through 030 | LNK 6.a.6.a |
| LNK | South (18/17/14) | (fan area, type not split) | 140 clockwise through 210 | LNK 6.a.6.b |

Both orders add the same two qualifiers: headings must provide separation from prior departures and
must allow TRACON to turn the aircraft on course reference prior departures (OMA 5.c.4.c.1–2;
LNK 6.a.6.d.1–2). OMA adds: prop aircraft whose on-course heading is in the fan area get the
on-course heading (OMA 5.c.4.c.3). LNK adds: aircraft whose on-course heading falls *between* the
fan areas get the heading closest to on course (LNK 6.a.6.c).

### 5.4 Missed approach instructions

| Airport | Flow | Instruction | Cite |
|---|---|---|---|
| OMA | North profile | **3,000' MSL, heading 360** | OMA 7110.4A 5.c.6 |
| OMA | South profile | **3,000' MSL, heading 140** | OMA 7110.4A 5.c.6 |
| LNK | North configuration | **Heading 300/030 degrees and 3000' MSL** | LNK 7110.6A 6.a.5.a.1 |
| LNK | South configuration | **Heading 210/140 and 3000' MSL** | LNK 7110.6A 6.a.5.b.1 |
| OFF | — | **not stated** | — |

R90-side missed-approach handling is expressed only as scratch pad terminations (R90 3-10, §2.16.1):
`E` = Miss to East (124.5), `W` = Miss to West (135.875), `V` = Miss to OVR (124.5), `P` = Published
Miss (124.5), plus the note that **all missed approaches should be assigned 135.875 when RE is not
open**.

### 5.5 Runway-selection / flow-selection rules

| Airport | Rule | Cite |
|---|---|---|
| OMA | Winds **< 5 kt** from any direction → **north profile preferred**. Winds **≥ 5 kt** → profile most closely aligned with the winds. LC determines active runway(s). | OMA 7110.4A 5.c.2 / 5.c.2.a |
| LNK | Preferred **calm wind** operation is **north configuration**. Winds **≥ 6 kt** → configuration most closely aligned with the wind. LC selects and **notifies TRACON** of runway(s) in use. | LNK 7110.6A 6.a.3 / 6.a.3.a |

### 5.6 Runways named in text

| Airport | Runways stated | Source |
|---|---|---|
| OMA (Eppley) | 14L, 14R, 18, 32L, 32R, 36 | OMA 7110.4A 4.a and 4.b; corroborated by R90 3-10 OMA visual list (32L, 32R, R36, R18, 14R, 14L) |
| LNK (Lincoln) | 14, 17, 18, 32, 35, 36 | LNK 7110.6A 4.a, 4.b, 5.b; corroborated by R90 3-10 LNK runway digits (R32, R14, R35, R36, R17, R18) |
| CBF | **36 only** ("I = ILS Rwy 36") | R90 7220.10B 3-10 |
| OFF | **not stated** | — |
| All other airports | **not stated** — R90 3-10 gives only an encoding rule, not an inventory | — |

### 5.7 Airport identifiers appearing anywhere in the three documents

Named in operational text: **OMA, OFF, LNK, CBF, SUX** (SUX only in the Appendix B relief-checklist
coordination list "\*ZMP/SUX").

Appearing **only** as prefixes in the Appendix C STARS map-name list (R90 7220.10B Appendix C):
MLE, PMV, HNR, FET, AHQ, AFK, TQE, SCB, SDA, RDK, BIE, CEK, 93Y, SWT, and the FLC series.

> These map-name prefixes are **not** a statement that R90 works those airports, and the order
> nowhere lists the airports R90 provides approach control service to, nor their runways.
> **The airport/runway inventory the task asked for is not stated in any of the three documents.**
> §2-2.b ("Ensure auto-acquisition for departures at satellite airports") and §3-8.d ("Satellite
> Arrivals") confirm satellite airports exist but never enumerate them.

---

## 6. Items the task asked for that are NOT STATED in these three documents

| Requested item | Status |
|---|---|
| Sector boundaries — Omaha sectors, Lincoln sectors, Lincoln Final (LF), RADAR Final | Pictures only (R90 Appendix A pp12–15). **UNREAD.** No verbal description anywhere. |
| PACP airspace geometry | Picture only (R90 Appendix D p18). **UNREAD.** Rule text exists (3-9), geometry does not. |
| Combining / decombining rules | Picture only (R90 p8 under 3-4). **UNREAD.** Only the lead-in sentence and the 3-2 briefing requirement are text. |
| LNK tower Area A / Area B lateral limits | Pictures only (LNK Appendices 1 and B, pp4–5). **UNREAD.** Vertical limits ARE text: A = SFC–3000 MSL, B = SFC–4000 MSL (LNK 4.c.1, 4.c.2). |
| **Class B dimensions** | Not stated in any of the three documents. Class B is never mentioned. |
| **Class C dimensions** | Class C is referenced by name only — OMA 7110.4A 5.c.3, LNK 7110.6A 4.c.3 and 6.a.4. **No dimensions, radii, or altitudes given in either order.** |
| **Class D dimensions** | Not stated in any of the three documents. Class D is never mentioned. |
| **Tower hours of operation** | Not stated in OMA_ATCT_7110_4A.txt, LNK_ATCT_7110_6A.txt, or R90_Order_7220_10B.txt. (Hours for other field facilities do appear in the sibling file `.../txt/ZMP_Minor_TRACON_Reference.txt`, which is outside this task's scope — flag to the parent.) |
| **Tower-to-TRACON handoff rules** | Not stated. Nothing in either tower order describes handoff or release to R90. The closest text is LNK 6.a.3 (LC notifies TRACON of runways in use) and LNK 6.a.2 (LC advises TRACON when unable to provide visual separation). R90 §3-5/§3-6 govern **intra-facility** transfer only. Tower/TRACON handoff is presumably in the LOA — see `.../txt/ZMP_R90_LOA.txt`, outside this task's scope. |
| **VFR handling** | Thin. What exists: OMA LC and LNK LC both "provide Class C services" to VFR (OMA 5.c.3, LNK 6.a.4); LNK Class C described as where "Class C Radar Service is provided to VFR aircraft" (LNK 4.c.3); OMA CD issues VFR/SVFR initial altitudes (OMA 5.a.4.c–d); LNK CD issues VFR/SVFR clearances and 4000' (LNK 6.c.2, 6.c.4); R90 scratch pads `OMA` = Tower sequenced VFRs, `Z` = Tower VFR Pattern, `T*G` = Touch and Go, CBF `CBF` = VFR Arrival plus the CBF practice-approach secondary-scratchpad note (R90 3-10). **No VFR pattern altitudes, no VFR entry/exit procedures, no flight-following rules, no Class C VFR separation standard is stated.** |
| Arrival procedures | Fully text — R90 3-8 (§2.14). Complete. |
| Transfer of position responsibility | Fully text — R90 3-3 (§2.9). Complete. |
| Intra-facility transfer of control | Fully text — R90 3-5 (§2.11). Complete. |
| Automated point-outs | Fully text — R90 3-7 (§2.13). Complete. |
| Scratch pad entries (3-10) | Fully text — all four tables captured (§2.16). Complete. |
| STARS map list | Fully text — R90 Appendix C, 137 entries (§2.19). Complete, but **no legend**. |
| OFF (Offutt) tower order | **No Offutt tower order was provided.** OFF is referenced by R90 3-8.b and Appendix B 6.b but has no SOP, frequency, callsign, runways, or missed-approach instructions in this document set. |

---

## 7. As-written anomalies to preserve (do NOT silently correct in authoring)

1. **"LW"** in R90 3-8 is undefined; §2-1 calls the position "Radar Lincoln" (STARS ID **L**,
   LNK_L_APP). Do not assume LW = Radar Lincoln in published material without a source.
2. R90 1-3 cancels "vZMP R90 SOP **7110**.10B CHG 1" while the order itself is **7220**.10B.
3. R90 TOC omits **3-6**, which exists in the body.
4. R90 2-1 preamble promises voice channels; the table has none.
5. R90 3-10 OMA RNAV Y line has an unclosed parenthesis: `R = RNAV Y (Ex: R8F, RLZ, RRW, R6P`.
6. R90 3-10 OMA visual list mixes bare and `R`-prefixed runways: `32L, 32R, R36, R18, 14R, 14L`.
7. R90 Appendix B is titled "Position Relief Checklist**s**" but contains one checklist.
8. LNK appendices are labelled `APPENDIX 1` and `APPENDIX B`; the body cites them as
   "Appendices 1 and 2".
9. LNK 6.a.2 prints "ensures" and "advice" (for "ensure"/"advise").
10. LNK 6.a.3.a prints "The preferred calm wind operating is a north configuration."
11. LNK uses "configuration" in §4 and "profile" in §6.a.6 for the same concept.
12. OMA 7110.4A carries **no effective date**; LNK 7110.6A carries only a footer date 12/26/18.
13. OMA calm-wind threshold is **5 kt**; LNK's is **6 kt**. Genuinely different, not a typo to fix.
14. R90 record-of-changes row pairing is unrecoverable from the text layer (§2.2).

---

## 8. Inference log — NOT STATED, do not publish as fact

Recorded only so the authoring phase knows these are unverified and can source them elsewhere.

- **CBF scratch pad runway digits.** The CBF examples `R8E, R6F, R2E, R8F, R4P` use the same
  single-digit pattern as the LNK table (8=18, 6=36, 2=32, 4=14), which would imply CBF runways
  18/36/32/14. **The CBF section contains no runway legend** — only "I = ILS Rwy 36" is stated.
  Unverified.
- **Scratch pad missed-approach frequencies vs positions.** 124.5 = Radar East and 135.875 = Radar
  West per §2-1, so `E`/`V`/`P` route to RE and `W` to RW. §3-10 itself only prints the numbers.
- **Appendix C map-name decoding** (e.g. `LF NORT`/`LF SOUT` = Lincoln Final north/south,
  `OMA G32` = an OMA runway 32 map, `R90nnnS` = video maps). The order supplies **no legend**.
  Entirely unverified.
- **Which position loads which STARS map.** Not stated anywhere.
