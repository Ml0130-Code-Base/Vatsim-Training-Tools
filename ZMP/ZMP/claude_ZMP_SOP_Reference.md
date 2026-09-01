# ZMP SOP Reference — Order 7200.1O CHG 2

**ZMP Order 7200.1O CHG 2, effective 2024-11-15**, cancelling vZMP 7200.1N CHG 1 dated 2023-07-01 (7200.1O 1.4, 1.5). 135 pages. Source: `source-docs/ZMP_Order_7200_1O.pdf`, extracted to `source-docs/txt/ZMP_Order_7200_1O.txt`.

This is the authoritative ZMP document — the en route equivalent of M98's 7110.26A. It is structured as three general chapters, six Area chapters carrying one section per sector, an event-splits chapter, and three appendices.

## Source self-check — what is verified and what is not

- **Chapters 1, 2, 3 and 10 and all three appendices are transcribed below in full**, read directly from the extraction rather than summarised at second hand.
- **The 33 per-sector sections are only partly walked.** The spine — frequency, callsign, ERAM filter, scope range, combining — is complete for all 33 and lives in `claude_ZMP_Sector_Reference.md`. The per-sector *narrative*, *transfer-of-control*, *arrival route* and *holding* paragraphs are transcribed for Sectors 01, 02, 03, 04 and 37 only. **Areas 2 through 6 are unwalked.** See `claude_ZMP_Gap_Analysis.md` Part 2.
- **Every map in the order is a picture.** All 33 `Sector NN Map` pages, Appendix 02's three-mile areas, Appendix 03's Figure 1, and all six Chapter 10 split diagrams. **UNREAD.**
- The extraction renders some characters as a replacement glyph (the order uses an en-dash the encoder does not carry). Transcriptions below normalise it to `—` where the meaning is unambiguous.

---

## Chapter 1 — Introduction

| Para | Content |
|---|---|
| 1.1 | Guidance, procedures, instructions and standards for operational air traffic requirements within vZMP |
| 1.2 | Audience: all VATSIM Minneapolis ARTCC **en route** controllers |
| 1.3 | Located in Documents and Procedures at `minniecenter.org` |
| 1.4 | **Cancels vZMP 7200.1N CHG 1, 2023-07-01** |
| 1.5 | **Effective 2024-11-15** |
| 1.6 | Revisions as needed; suggestions to the ZMP ATM or DATM |
| 1.7 | Explanation of changes: "Initial release" |

---

## Chapter 2 — Operations, general

**2.1 Duty familiarization.** The Status Information Area is the vehicle for continuous duty familiarization.

**2.2 Status Information Areas.** The SIA is manual and/or automatic displays of position-related equipment status and operational conditions — weather briefings, PIREPs, NOTAMs and Traffic Management Initiatives. It lives in the IDS at `minniecenter.org/ids`, maintained by the ZMP Webmaster. Controllers obtain, review and update it, including special use airspace times and traffic management initiatives. Information that alters the SIA is posted as soon as it becomes available.

**2.3 Position Relief Briefing.** Conducted per FAA Order 7110.65. **The use of an operational position checklist is mandatory at vZMP.** Checklists are in Appendix 01 and in the ERAM checklists menu.

Procedures:
1. During transition the relieving controller signs on **using a relief callsign** for the position being relieved and receives a complete PRB. The relieved controller **continues to monitor the sector** until the relieving controller accepts responsibility.
2. As sectors are combined, the controller leaving the combined sectors first completes their PRB and then monitors the combined position before signing off.

---

## Chapter 3 — Operational systems and procedures

**This chapter is the heart of the order.** It carries the four ZMP-local rules the tool grades against.

### 3.1 Combining and decombining of control sectors

Each operational area may be combined and de-combined by **any ZMP CPC controlling center airspace**. De-combining of *individual sectors within* the areas of operation may only be done with approval from vZMP staff.

### 3.2 ERAM filter limits

Controllers must set ERAM altitude filters with a buffer beyond the airspace being controlled:

| Vertical separation in use | Filter entry |
|---|---|
| 1,000 ft | **1,200 ft** above and below the altitude limits of the airspace |
| 2,000 ft | **2,200 ft** above and below |

### 3.3 Computer entry of assigned altitude

**Background.** 7110.65 5-14-3 requires data blocks to always reflect the current status of the aircraft, including an interim altitude where the aircraft may hold a new altitude briefly before being recleared. 7210.3 8-2-7 lets a facility waive this where an operational advantage is gained. ZMP takes that waiver, narrowly.

**The waiver.** An interim altitude entry is **not required** when a climbing aircraft **departing from M98 airspace** is assigned an altitude strictly based on sector stratification and is expected to be recleared higher immediately on handoff acceptance by the next higher stratum.

> **ZMP low altitude terminal sectors must not clear M98 departing aircraft above FL230 without prior verbal coordination.**

**Authorised in these sector pairs only:**

| Transferring | Receiving |
|---|---|
| 06 | 16 |
| 07 | 17 |
| 08 | 18 |
| 09 | 11 or 19 |
| 10 | 11 |
| 21 | 15 |

**For all other instances**, unless specifically addressed in sector SOPs, the receiving controller **must not remove an interim altitude** until communications have been established *and* the aircraft has been issued a different or amended altitude.

**Non-Mode-C aircraft are excluded entirely** (7110.65 5-14-4, entry of reported altitudes).

### 3.4 Advance approach information responsibility

Issuance is assigned to **the sector within which the airport is located**, applied per 7110.65 4-7-10. **Sectors assume this responsibility for airports inside a part-time approach control when that facility is closed.**

To eliminate confusion, Figure 3-1 assigns specific sectors to specific perimeter airports:

| Airport | Sector |
|---|---|
| BFA, CIU | 01 |
| GOV | 02 |
| RCX, SSQ, TKV | 03 |
| AIG, RRL, MNM | 04 |
| Y51 | 05 |
| AEL, MWM | 08 |
| AQP, D42 | 09 |
| 06D, D39, GHW | 24 |
| FSE, 48Y | 25 |
| AFK, EAR, ODX, 0V3 | 26 |
| DNS, GFZ | 27 |
| BTN, DVP, DXX, ISB, ICR | 33 |
| CIN, CJJ | 36 |
| BVN | 37 |

> **Transcription note.** Figure 3-1 as printed has a leftmost column headed `AREA` carrying the values 1 through 6 against only the first six rows, after which it stops. Those values do **not** correspond to the ZMP Area the sector belongs to — the row headed `2` assigns GOV to Sector 02, which is an Area 1 sector. It reads as a row counter whose layout broke in extraction. **The airport-to-sector mapping above is the part that is unambiguous and is the part the tool uses.** The `AREA` column is not reproduced.

### 3.5 Full route clearance (FRC)

vZMP controllers evaluate erroneous flight plans and amend where the filed route presents an operational disadvantage. **It is imperative that any pilot given a reroute confirms he can fly it. If unable, offer radar vectors to a fix within vZMP airspace then as filed. Any time a route is changed a full route clearance must be issued.**

### 3.6 Three-mile separation authorization

Because of the location of the **Empire MI (QJA), Eagle River WI (EGV), Alpena MI (APN)** and **Sawyer MI (SAW)** radar sites, the areas depicted in **Appendix 02** are designated single-site adapted areas where 3-mile radar separation may be used.

> **At least 5-mile radar separation shall be used near those sites where single site criteria does not apply and within all other vZMP airspace.**

CPCs must:
- **a.** Limit 3-mile separation to the Appendix 02 areas.
- **b.** Comply with 7110.65 regarding 3-mile radar separation standards.
- **c.** **Immediately revert to 5-mile separation, or non-radar procedures as appropriate**, on visual observation that an anomaly of data from the single-site radar has occurred or is occurring.

**Appendix 02 is a picture.** The only radii written down anywhere are the three in the sector narratives — Sector 01 within **54 miles** of APN below FL230; Sector 02 within **40 miles** of Empire below FL230; Sector 03 within **40 miles** of SAW and EGV.

### 3.7 Automated Information Transfer (AIT)

AIT is the transfer of **altitude control, radar identification, and/or en route fourth line control information, without verbal coordination**, using information communicated via the full data block during a radar handoff.

1. It is the **transferring** controller's responsibility to ensure the requirements are met.
2. **ERAM operations only.**
3. **Radar-identified aircraft only.**
4. **Verbal coordination overrides AIT.**
5. **Not authorised for, and does not apply to, point-out procedures** (7110.65 5-4-7).
6. For transfer of radar identification only:
   - **a.** Authorised in all areas of vZMP airspace regardless of stratum, and with the first sector of an adjacent VATUSA facility. **VATCAN sectors are unable to accept AIT.**
   - **b.** Authorised for aircraft in level flight, climbing, descending, or with an interim altitude assigned, that will enter the lateral limits of the receiving sector.

### 3.8 Data Block Coordination

Defined at vZMP as **the transfer of radar identification *and* the approval for climb/descent or interim altitude**. It differs from AIT but can be used with it.

- **A.** Approved **between two adjacent Minneapolis Center sectors only**, unless properly utilised per AIT.
- **B.** Authorised only if **all** of the following are met:
  1. The aircraft is **greater than 5 minutes flying time** from the sector boundary when the change of altitude is entered into ERAM; **and**
  2. The radar handoff is initiated **prior to 3 minutes flying time** from the boundary; **and**
  3. Only for aircraft radar identified **with valid Mode C** when the handoff is initiated, reasonably expected to remain in radar contact until completion; **and**
  4. **Never with departure aircraft within 5 minutes flying time** of the sector boundary; **and**
  5. **Verbal coordination overrides Data Block Coordination.**
- **C.** A temporary altitude may then be used to coordinate the climb/descent/interim.
- **D.** **For an aircraft on an optimized profile descent arrival into M98 airspace assigned "descend via", a procedural altitude must be entered into the data block indicating the published altitude at the M98 boundary fix.**
  > *Example (the order's own):* an aircraft on the **KKILR** arrival issued a "descend via" clearance would have a procedural altitude of **100** entered into its data block.
- **E.** **Acceptance of the radar handoff constitutes approval** for the aircraft to enter the receiving controller's airspace and approval of the climb, descent and/or interim altitude.
- **F.** If the receiving controller cannot approve, it is **their** responsibility to advise the transferring controller **before** accepting the handoff.
- **G.** Pilot's discretion descent is authorised in conjunction with this procedure.
- **H.** May also be used with the first sector of an adjacent VATUSA facility **provided a Letter of Agreement says so.**

### 3.9 Minimum IFR altitude (MIA) sector charts

Control personnel must not clear or vector aircraft below the MIA unless operating along airways, transition routes, or off-airway routes with lower established MEAs.

---

## Chapters 4–9 — the six Areas

One chapter per Area, one section per sector. Each sector section follows the same five-part shape:

| Sub-para | Content |
|---|---|
| `x.y.1` | **Sector narrative** — stratum, radar coverage and gaps, adjacent approach controls, adjacent ZMP sectors and centres, single-site reduced separation if any, combining |
| `x.y.2` | **Assignment of airspace** — what reverts to this sector when an adjacent approach control closes |
| `x.y.3` | **Sector information** — 1. frequency and sign-on; 2. unique sector equipment configurations (scope range, ERAM altitude filter, vector-to-final airports) |
| `x.y.4` | **Sector procedures** — 1. mandatory speed; 2. mandatory heading; 3. mandatory altitude; 4. handoff/point-out differences from 7110.65 Ch 5 Sec 4; 5. **transfer of control points other than airspace boundaries**; 6. **radar arrival routes and restrictions** (a table); 7. **holding fixes** with direction, leg length, max speed, turn direction and altitudes |
| — | **`Sector NN Map`** — a picture, UNREAD |

**Area membership:** Area 1 — 01, 02, 03, 04, 12, 13 · Area 2 — 05, 06, 10, 11, 15, 16, 21 · Area 3 — 07, 08, 09, 17, 18, 19 · Area 4 — 20, 22, 23, 24, 25, 33 · Area 5 — 26, 29, 30, 36, 37 · Area 6 — 27, 38, 39.

The full spine is in `claude_ZMP_Sector_Reference.md`. Sectors transcribed in depth so far:

**Sector 01 (Area 1, 134.6, `000B242`, 115–135 NM).** All performances surface to FL230. Radar coverage good with gaps far north and south at low altitude. Neighbours: **AZO** (Great Lakes TRACON) and **APN** (Collins) approach controls, **Grayling ATCT** part time, **Toronto Centre (YYZ)** to the north and east requiring **manual** radar handoffs, **ZOB** to the south, ZMP Sectors **02 and 03** to the west. **Within 54 miles of the APN radar site separation is reduced to 3 miles below FL230.** Combined at Sector 02 when not open. When APN is closed its airspace becomes Sector 01's; the southern airspace delegated to AZO reverts to **ZOB** when AZO is closed. Radar vectors to final available at **PLN, MGN, APN, OSC, GOV, GLR**.

**Sector 02 (Area 1, 132.9, `000B242`, 075–100 NM).** Surface to FL230. **Within 40 miles of the Empire radar site, 3 miles instead of 5 below FL230.** Works **GRB, AZO, MKE**, plus VFR tower **TVC** part time. Bordered south by **ZOB and ZAU**, and by ZMP **01, 03, 04**. Combines to Sector 04. When AZO is closed: Chippewa and Bay sectors revert to **ZOB**; GRB airspace goes to **Sector 04**; AZO Lumbertown and White Cap go to **ZAU**. Vector to final at **TVC, CAD, MBL**.

**Sector 03 (Area 1, 133.55, `000B242`, 150 NM).** Surface to FL230. Works **GRB** and **DLH**. **Thunder Bay Terminal is based in YWG Centre and radar handoffs must be coordinated manually.** **Single-site radars at SAW and EGV allow 3 miles within 40 miles of the antenna.** One VFR tower, **Marquette/Sawyer (SAW)** — all coordination manual. Bordered north by **Winnipeg Centre (YWG)** and **Toronto Centre (YYZ)**, both manual. Bordered east, south and west by ZMP **01, 02, 04, 05, 06, 10, 25** (clockwise). When GRB is closed its airspace goes to **Sector 04**; when DLH is closed, to **Sector 25**.

**Sector 04 (Area 1, 124.4, `000B242`, 100–124 NM).** **All Area 1 sectors combine to Sector 04**, and when they do the **altitude limits are set to `000B999`.**

**Sector 37 (Area 5, 128.0, `000B242`, 95–150 mi).** Can be combined at Sectors **36 or 26**; combines to **Sector 29** when Area 5 is combined to one scope.

> The remaining 28 sectors have their spine recorded but their narrative, transfer-of-control, arrival-route and holding paragraphs unwalked.

### Transfer of control points recorded so far

| Boundary | Release | Within | Cite |
|---|---|---|---|
| ZMP / ZOB, ZMP / YWG | Beacon code changes and turns up to **20°** | 20 miles of the common boundary crossing point | 4.1.4.5.a, 4.3.4.5.a |
| ZMP / YYZ | Beacon code changes and turns up to **45°** | 20 miles | 4.1.4.5.b |
| ZMP / APN | APN has control for **turns, climbs and descent** | on completion of handoff and communications transfer | 4.1.4.5.c |
| ZMP / AZO | **Both** facilities: turns up to **30°**, descent, code change | 10 miles of the common boundary | 4.1.4.5.d |
| ZMP / DLH | DLH has control for **turns and descent** | 10 miles of the common boundary | 4.3.4.5.b |
| Area 1 low internal | Descent and turns up to **20°** to all other Area 1 low sectors | — | 4.1.4.5.e, 4.3.4.5.c |

> The 4.1.4.5.b entry as printed reads "…within 20 miles of the **ZMP/ZAU** common boundary crossing point" under a heading of **ZMP/YYZ**. Transcribed as written; the `ZAU` in the body against a `YYZ` heading looks like a copy-paste artefact in the order, but it is not this document's place to correct it.

---

## Chapter 10 — Common event / high traffic airspace splits

**10.1.1 Guidelines.** The splits are designed for event and high-traffic situations. **For day-to-day traffic, controllers are encouraged to open an underlying TRACON or local position before splitting vZMP airspace**, unless complexity or workload dictates otherwise. The splits need not be adhered to completely, and controllers may delegate sectors to balance workload.

| Split | Purpose |
|---|---|
| **10.2.1 MSP/M98 event three-way** | Most cases when an event is scheduled at MSP or another M98 airport. **Sector 05 (125.3) may be opened to cover Sector 12's airspace SFC–230**, and/or **Sector 09 (125.5) may be opened to cover Sector 18's airspace SFC–230.** |
| **10.2.2 MSP/M98 event with heavy KKILR/MUSCL traffic** | Four controllers. For heavy arrival traffic from the east — events or crossfires featuring ZAU/ZOB airports. |
| **10.2.3 OMA/LNK focus** | Three controllers. Events at OMA/LNK, or other Area 5 / Area 6 airports with higher volumes. |

Each split is published at two strata, **SFC–FL230** and **FL240–UNL**. **All six diagrams are pictures and are UNREAD** — which sectors each controller takes is not recoverable from text.

---

## Appendix 01 — Position relief briefing, all sectors

1. Status information area (SIA)
2. Equipment
3. Sector config
4. Airport status and activities — a. airport or runway closures, b. braking action
5. Weather and altimeter trends — a. rides, b. winds, c. thunderstorm tops
6. Flow control — a. routes, b. metering / miles-in-trail
7. Military
8. Special activities — a. special configurations and coordination agreements, b. forward pertinent messages when combining/splitting sectors, c. flight check aircraft
9. Communication status
10. Traffic current/pending — a. non-radar operations, b. point-out aircraft, c. holding aircraft, d. primary targets with no associated data block, e. aircraft in restricted areas/MOAs/ATCAAs/IRs, f. aircraft released but not yet airborne, g. aircraft handed off but still in the sector, h. VFR advisory aircraft

**Item 10 is the closest thing the order has to a published scan**, and it is the natural spine for a ZMP drill debrief.

---

## Appendix 02 — Three-mile separation areas

3-mile separation is authorised within the grey-shaded areas of Figure 1 when the provisions of the order are applied. Figure 1 maps the radius around the **Empire MI, Eagle River WI, Alpena MI and Sawyer MI** radar sites.

**Figure 1 is a picture. UNREAD.**

---

## Appendix 03 — Combined operations

> For day-to-day operations on the VATSIM network, splitting off ZMP sectors is typically not warranted. **vZMP airspace combines at Sector 11, with the primary frequency being 133.4.** In the AFV client, controllers should take care to ensure that **TX/RX are selected for `MSP_CTR`**, otherwise transceiver coverage will only be for Sector 11 itself, and not the whole airspace.

Figure 1 depicts airspace delegated to vZMP as well as airspace delegated to adjacent facilities falling within the lateral boundaries of vZMP airspace. **Figure 1 is a picture. UNREAD.**

---

## What the tool does with this

Chapter 3 is `FILTER_BUFFER`, `SEP`, `INTERIM_WAIVER`, `AIT_RULES` and `DBC_RULES` in the Sector Deck block. Appendix 01 is `PRB_CHECKLIST`. Appendix 03 is `COMBINE_POINT`. The per-sector spine is `SECTORS` and `AREAS`. The transfer-of-control table is `XFER_CONTROL`, and it is deliberately shorter than 33 rows so the smoke test's `XFER_CONTROL.length < 33` guard keeps failing until Areas 2–6 are walked.
