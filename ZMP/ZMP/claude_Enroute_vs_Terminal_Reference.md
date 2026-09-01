# En Route (ARTCC) vs. Terminal (TRACON) Air Traffic Control
### A shared reference note for the ZMP (Minneapolis ARTCC) and R90 (Omaha TRACON) training tools

**Purpose.** This note isolates the differences that actually change what a controller does, what the automation shows, and what a trainee is graded on. It is grounded in FAA JO 7110.65 and in the facility documents present in this repository.

**Citation convention used throughout:**

- `[65: x-y-z]` — a paragraph of FAA JO 7110.65 that the fact rests on.
- `[repo: file:line]` — a direct quotation or paraphrase from a document in this repo, with line numbers.
- `UNCITED` — the statement is operationally true in the community's working understanding but I could **not** anchor it to a 7110.65 paragraph or to a repo document. Do not present these to a trainee as regulation.
- `UNCITED-SUBPARA` — the paragraph number is correct but I am not confident of the exact sub-letter/sub-number in the current edition. Verify against the live handbook before printing it on a quiz.

**Important scoping caveat.** Every facility document in this repo is stamped `FOR SIMULATION USE ONLY` and several are explicit that they are supplemental to 7110.65 and not applicable to the real NAS (e.g. `[repo: ZMP/source-docs/txt/ZMP_Strip_Marking.txt:11-16]`). Where a facility SOP and 7110.65 differ, the training tool should teach 7110.65 as the rule and the SOP as the local overlay.

---

## 1. Radar separation minima

### 1.1 The base rule — 7110.65 5-5-4, MINIMA

| | EN ROUTE (ZMP) | TERMINAL (R90) |
|---|---|---|
| Standard lateral radar minimum | **5 NM** `[65: 5-5-4]` | **3 NM** when **less than 40 NM from the antenna** `[65: 5-5-4]` |
| Above the qualifier | **10 NM** when **both** aircraft are at or above **FL600** `[65: 5-5-4]` | **5 NM** when **40 NM or more from the antenna** `[65: 5-5-4]` |
| Reduced on final | not applicable | **2.5 NM** under the conditions in 1.3 `[65: 5-5-4, UNCITED-SUBPARA]` |

The two "qualifiers" the trainee must not blur together:

- **The 40-NM antenna qualifier is a TERMINAL rule.** It is about distance from the *radar antenna*, not from the airport, not from the boundary. Inside 40 NM of the antenna a TRACON may use 3 NM; at or beyond 40 NM the same TRACON reverts to 5 NM `[65: 5-5-4]`. R90's delegated airspace is small enough that a trainee will rarely see the reversion, but the tool should still test it — it is the single most commonly misstated separation fact.
- **The FL600 qualifier is an EN ROUTE rule.** At and above FL600 the en route minimum doubles to 10 NM `[65: 5-5-4]`. ZMP sectors in this repo are stratified well below that (sector altitude filters are entered as `000B242`, i.e. surface to FL242, at the low sectors — `[repo: ZMP/source-docs/txt/ZMP_Order_7200_1O.txt:656-657, 740, 1326-1328]`), so FL600 is a knowledge item, not a working item, for a ZMP trainee.

### 1.2 The en route exception that ZMP actually uses: single-site 3 NM

This is the most important separation fact in the ZMP toolset, and it is fully documented in the repo.

> "Because of the location of the Empire, MI (QJA), Eagle River, WI (EGV), Alpena, MI (APN), and Sawyer, MI (SAW) radar sites … 3-mile radar separation may be used in these prescribed areas … **At least 5-mile radar separation shall be used near those sites where single site criteria does not apply and within all other vZMP airspace.**"
> `[repo: ZMP/source-docs/txt/ZMP_Order_7200_1O.txt:512-521]`

The three conditions ZMP places on it `[repo: ZMP_Order_7200_1O.txt:523-531]`:

1. Limit use to the areas depicted in **Appendix 02** of the SOP (the shaded single-site radius maps — `[repo: ZMP_Order_7200_1O.txt:3966-3972]`).
2. Comply with the 7110.65 provisions for 3-mile radar separation `[65: 5-5-4]`.
3. **Immediately revert to 5 NM, or to non-radar procedures as appropriate,** upon visual observation of a data anomaly from the single-site radar.

Sector-level restatements a trainee will meet on position:

| Sector | Text | Line |
|---|---|---|
| 01 | "Within **54 miles** of the APN radar site, separation standards are reduced to 3 miles instead of the normal 5 miles below FL230." | `ZMP_Order_7200_1O.txt:639-640` |
| 02 | "Within **40 miles** of the Empire Radar site, separation standards are reduced to 3 miles instead of the normal 5 miles below FL230." | `ZMP_Order_7200_1O.txt:717-719` |
| 03 | "Single-site radars at SAW and EGV allow controllers to use reduced separation **within 40 miles** of the antenna site (3 miles instead of 5)." | `ZMP_Order_7200_1O.txt:815-817` |

**Teach this deliberately:** the Sector 01 figure is **54 NM**, not 40 NM. That is a *facility-adapted single-site area*, not the 7110.65 terminal 40-NM rule. A trainee who "knows" 40 NM and applies it to Sector 01 will separate more conservatively than required; a trainee who generalizes 54 NM to Sector 02 will bust. The ZMP tool should present these as three separate memorized areas keyed to Appendix 02, never as a single number.

### 1.3 The 2.5 NM final approach reduction (TERMINAL / R90 only)

`[65: 5-5-4, UNCITED-SUBPARA]` — the reduction exists in 5-5-4; verify the sub-letter against the current edition before publishing.

The conditions, all of which must be met simultaneously:

1. Both aircraft are **established on the final approach course**, and
2. within **10 NM of the landing runway**, and
3. a documented **average runway occupancy time of 50 seconds or less** exists for that runway, and
4. **CTRDs (certified tower radar displays) are operational and used** to ensure runway occupancy times, and
5. **turnoff points are visible** from the tower, and
6. **wake turbulence separation is not required** between the pair.

The last condition is the one trainees drop. 2.5 NM and a wake pair are mutually exclusive — wake minima always win.

**R90 relevance.** R90's Radar Final (`OMA_V_APP`) and Lincoln Final (`LNK_F_APP`) positions `[repo: R90/source-docs/txt/R90_Order_7220_10B.txt:104-107]` are exactly the positions where this reduction lives. The R90 order does not itself authorize 2.5 NM (no mention in the document), so in this toolset **2.5 NM is a 7110.65 item, not an R90 SOP item** — flag it that way. The order's own guardrail is different and stricter: the setup "must allow the aircraft to conduct a stabilized approach" and, once a handoff is accepted, "no changes to assigned heading or assigned altitude without verbal approval from the receiving controller" `[repo: R90_Order_7220_10B.txt:205-226]`.

### 1.4 Wake turbulence additions

Wake minima are **additive to, and override, both the 3 NM and 5 NM base minima and the 2.5 NM reduction** `[65: 5-5-4]`. They apply when the trailing aircraft is operating directly behind, directly behind and less than 1,000 ft below, or is following an aircraft conducting an instrument approach `[65: 5-5-4, UNCITED-SUBPARA]`.

Legacy (non-RECAT) weight-class table `[65: 5-5-4 / Table 5-5-2, UNCITED-SUBPARA]`:

| Leader → Follower | Heavy | Large | Small |
|---|---|---|---|
| Behind **Super** | 6 NM | 7 NM | 8 NM |
| Behind **Heavy** | 4 NM | 5 NM | 6 NM |
| Behind **B757** | 4 NM | 4 NM | 5 NM |

`UNCITED:` Facilities operating under **RECAT / Consolidated Wake Turbulence (CWT)** categories use a different matrix keyed to letter categories rather than Heavy/Large/Small. Nothing in this repo states whether M98, R90, or ZMP are RECAT facilities. Do **not** assert a CWT matrix in either tool until that is resolved; teach the legacy table and mark it as the 7110.65 default.

**Where each facility feels it.** R90 feels wake on every final — it is the binding constraint on final spacing, and it is the reason a Final controller cannot simply run 3 NM. ZMP feels wake almost never in cruise, and mostly on the arrival stream where it is inherited: ZMP's obligation is expressed as **miles-in-trail**, not as wake pairs — "ZMP Sector 7 must provide M98 with a minimum of **5 miles in trail** between arrivals on the same STAR, and **7 miles staggered** spacing between arrivals on parallel STARs" `[repo: ZMP/source-docs/txt/LOA_ZMP_M98.txt:163-165]`.

### 1.5 Visual separation

`[65: 7-2-1]` Visual separation. **Terminal-weighted.** R90's standing position duty is to "coordinate **pilot applied visual separation** prior to communication transfer to an adjacent sector or facility" `[repo: R90_Order_7220_10B.txt:114-116]`. There is no equivalent standing duty in the ZMP order — visual separation is not part of the routine en route toolkit above the terminal environment. This is a genuine divergence worth a lesson slide.

---

## 2. Vertical separation

`[65: 4-5-1]` Vertical separation minima:

| Band | Minimum | Note |
|---|---|---|
| Surface up to and including FL410 | **1,000 ft** | `[65: 4-5-1]` |
| **FL290–FL410 (RVSM airspace)** | **1,000 ft** between **RVSM-approved** aircraft | `[65: 4-5-1]`; the RVSM-approval qualifier is the whole point |
| FL290–FL410, **non-RVSM** aircraft involved | **2,000 ft** | `[65: 4-5-1, UNCITED-SUBPARA]` |
| **Above FL410** | **2,000 ft** | `[65: 4-5-1]` |

`UNCITED-SUBPARA:` the standalone RVSM procedural paragraph (aircraft eligibility, `/W` equipment suffix handling, contingency and weather-deviation procedures in RVSM airspace) — I could not confirm its paragraph number. Cite 4-5-1 for the *numbers*; mark the *procedures* as needing verification.

**Why this is an EN ROUTE topic and not a TERMINAL one.** R90's delegated airspace tops out at **15,000 ft MSL** over R90 East and West and **10,000 ft MSL** over R90 LNK `[repo: ZMP/source-docs/txt/LOA_ZMP_R90.txt:16-19]`. An R90 controller never touches FL290, never touches RVSM, and never touches the 2,000-ft band. For R90, vertical separation is one number: 1,000 ft. Do not spend R90 trainee time on RVSM beyond awareness.

For ZMP it is a daily discrimination. The repo gives a clean, testable artifact of it — **the ERAM altitude filter is set differently depending on which vertical minimum is in use**:

> "When **1,000 foot** vertical separation is being used, enter an altitude that is **1,200 feet** above and below the altitude limits of the airspace being controlled at the position.
> When **2,000 foot** vertical separation is being used, enter an altitude that is **2,200 feet** above and below the altitude limits."
> `[repo: ZMP_Order_7200_1O.txt:396-404]`

That is an excellent ZMP training item: it forces the trainee to know *which* minimum applies before they can even configure their scope correctly.

**Right-altitude-for-direction** is also an en route habit the terminal controller does not build. ZMP encodes it per boundary — e.g. departures entering ZKC are at the correct altitude for direction if level at or climbing to a **westbound** flight level (FL300, FL320, FL340…), and departures entering ZAU if at an **eastbound** flight level (FL290, FL310, FL330…) `[repo: ZMP_Order_7200_1O.txt:2549-2556]`. R90's equivalent is the opposite move — accepting a *wrong*-altitude aircraft on purpose: "Acceptance of the handoff of an aircraft in level flight by R90 constitutes approval of inappropriate altitude for direction of flight" `[repo: LOA_ZMP_R90.txt:70-74]`, mirrored on the ZMP side at Sector 10 `[repo: ZMP_Order_7200_1O.txt:1509-1511]`.

---

## 3. The automation platforms: ERAM vs. STARS

### 3.1 Identity and scope

| | **ERAM** (En Route Automation Modernization) — ZMP | **STARS** (Standard Terminal Automation Replacement System) — R90 |
|---|---|---|
| Named in repo | Yes, repeatedly: §3.2 "ERAM FILTER LIMITS", §3.7 "may only be used during ERAM operations" `[repo: ZMP_Order_7200_1O.txt:396, 543]` | Yes: "Make necessary **STARS** configuration entries" `[repo: R90_Order_7220_10B.txt:111]`; per-position **STARS ID** `[repo: R90_Order_7220_10B.txt:101-107]` |
| Position identifier | Two-digit sector number in the callsign (`MSP_06_CTR`, `MSP_11_CTR`) `[repo: ZMP_Order_7200_1O.txt:1322]` | **Single letter** STARS ID: W, X, V, O, L, F `[repo: R90_Order_7220_10B.txt:101-107]` |
| Display heritage taught to trainees | **DSR** (Display System Replacement) — the C1 syllabus lesson is literally "Observe differences in DSR display and understanding data tags" `[repo: ZMP/source-docs/txt/ZMP_Order_3120_4F.txt:1598-1607]` | **ARTS/CARTS → STARS**, taught side by side in S3.1 `[repo: ZMP_Order_3120_4F.txt:1258-1268]` |

Note the asymmetry the repo itself creates: the ZMP training manual teaches the *legacy* display name (DSR) while the ZMP operations order is written entirely around *ERAM*. The ZMP tool should reconcile this and teach ERAM, flagging DSR as the older syllabus term.

### 3.2 What the data block carries

**ERAM (ZMP) — four lines, and the fourth line is a coordination channel.**

This is the single largest automation difference and it is richly documented here. ZMP authorizes the fourth line to forward control information per `[65: 5-4-11]` and, additionally, as an AIT coordination channel per `[65: 5-4-8]` `[repo: ZMP_Order_7200_1O.txt:1344-1348]`. The adapted vocabulary between Sectors 06 and 16:

| Arrival fix / routing | Fourth-line indicator |
|---|---|
| TWINZ | `T`, `TW` |
| BITLR | `BT`, `BTLR` |
| BAYKS | `B`, `BA`, `BK` |
| HUGGI | `H`, `HU`, `HG` |
| KKILR | `K`, `KL`, `KK` |
| AGUDE | `A`, `AG`, `AGUD` |
| NICKL | `N`, `NICL`, `NIKL` |
| BITLR..GEP..STP | `B/G/S`, `BS`, `BSTP`, `B/G/STP` |
| GEP 103 radial | `G103`, `103R` |
| MSP arrival holding at EAU / JERMN / CMAAC | `Hxx` (last two digits of EFC), or `xxxx` (actual EFC) |

`[repo: ZMP_Order_7200_1O.txt:1349-1363]`

Elsewhere the fourth line carries route indicators (`LU`) and vector headings for MSP arrivals `[repo: ZMP_Order_7200_1O.txt:1516-1520, 1688-1692]`, and for the GEP/SKETR arrival "a heading left in 4th line is understood to be a heading to join the …" `[repo: ZMP_Order_7200_1O.txt:1726-1727]`. **Point:** in ERAM, the data block is a *messaging surface between sectors*. There is nothing like this in the terminal world.

ERAM also carries **interim** and **procedural** altitudes as distinct concepts `[65: 5-14-3]`:

- Interim altitude entry is *waived* for specific stratification handoffs (06→16, 07→17, 08→18, 09→11/19, 10→11, 21→15) under the 7210.3 8-2-7 workload waiver `[repo: ZMP_Order_7200_1O.txt:404-429]`.
- For an OPD arrival on a "descend via," a **procedural altitude** is entered showing the published altitude at the boundary fix — "An aircraft on the KKILR arrival issued a 'descend via' clearance would have a procedural altitude of `100` entered into its datablock" `[repo: ZMP_Order_7200_1O.txt:596-600]`.
- Non-Mode-C aircraft are excluded from the waiver because of `[65: 5-14-4]` (entry of reported altitudes) `[repo: ZMP_Order_7200_1O.txt:436-438]`.

**STARS (R90) — the scratchpad is the data block's payload.**

R90 does not use a fourth-line vocabulary. It uses **encoded scratchpads** that state the *approach, the runway, and the termination* in three or four characters `[repo: R90_Order_7220_10B.txt:249-311]`:

| Field | OMA encoding | Example |
|---|---|---|
| Approach | `I` = ILS, `R` = RNAV Y, `RN` = RNAV Z, `O` = Overhead | `I8V`, `R8F`, `RN6`, `OLF` |
| Bare runway number | denotes a **visual approach** to that runway, full stop | `32L`, `14R`, `R36` |
| Termination | `F` = full stop, `Z` = tower VFR pattern, `E` = miss to east (124.5), `W` = miss to west (135.875), `V` = miss to OVR, `P` = published miss | trailing character |
| Special | `OMA` = tower-sequenced VFR; `T*G` = touch and go, runway at tower's discretion | |

LNK uses a different, position-encoded scheme entirely — approach letter + **runway digit** + termination: `I`/`L`/`O`/`R`/`T`/`V` for approach, `2`=R32, `4`=R14, `5`=R35, `6`=R36, `7`=R17, `8`=R18, and `E`/`F`/`W`/`Z`/`P` for termination; "**Runway only in scratchpad indicates a Visual Approach to that runway**" `[repo: R90_Order_7220_10B.txt:269-285]`. CBF has yet a third scheme, plus a **secondary scratchpad** convention: CBF IFR/VFR practice approaches get `CBF` in the secondary scratchpad `[repo: R90_Order_7220_10B.txt:287-297]`.

**The training consequence.** A ZMP trainee learns a *coordination* alphabet aimed at the next sector. An R90 trainee learns an *intent* alphabet aimed at the final controller and the tower. Two different tools, two different flashcard decks — do not share a "data block" module between them.

### 3.3 Handoff and point-out mechanics

Both facilities inherit `[65: Chapter 5, Section 4]` — transfer of radar identification `[65: 5-4-5]`, point out `[65: 5-4-7]`, AIT `[65: 5-4-8]`, prearranged coordination `[65: 5-4-10]`, fourth-line data block usage `[65: 5-4-11]`. Nearly every ZMP sector page says handoff/point-out procedures "comply with the requirements in FAAO 7110.65, Chapter 5, Section 4" with named exceptions `[repo: ZMP_Order_7200_1O.txt:664, 754, 846, 941, 1022, 1099, 1260, 1341, …]`.

**ZMP-specific mechanics:**

- **AIT** `[repo: ZMP_Order_7200_1O.txt:534-565]` — transfers altitude control, radar identification, and/or fourth-line control information *without verbal coordination*, via the full data block during a radar handoff. Conditions: ERAM operations only; radar-identified aircraft only; **verbal coordination overrides AIT**; **not authorized for point-outs** per `[65: 5-4-7]`; usable in all strata and with the first sector of an adjacent VATUSA facility, but **VATCAN sectors cannot accept AIT**.
- **Data Block Coordination** `[repo: ZMP_Order_7200_1O.txt:567-616]` — a ZMP-local construct, distinct from AIT but usable with it. Between two adjacent ZMP sectors. Conditions: aircraft **> 5 minutes** from the boundary when the altitude change is entered; handoff initiated **prior to 3 minutes** from the boundary; radar-identified with **valid Mode C**; **not** for departures within 5 minutes of the boundary; verbal overrides. **Acceptance of the handoff constitutes approval to enter the airspace and approval of the climb/descent/interim.** If the receiving controller cannot approve, they must say so *before* accepting.
- **PVD point-out for holding stacks** `[repo: ZMP_Order_7200_1O.txt:1365-1390]`, per `[65: 5-4-10]` and 7210.3 3-6-7: the first aircraft into the CMAAC hold is verbally pointed out with the stack altitudes; all subsequent aircraft are PVD'd with **no verbal coordination**; all PVDs constitute prior coordination; the receiving sector becomes **responsible for separation from every holding aircraft displayed on their situational display**; the holding sector may not descend below the coordinated altitudes without verbal coordination; and the holding sector must verbally announce when the last aircraft has left the hold.

**R90-specific mechanics:**

- **Automated point outs** `[repo: R90_Order_7220_10B.txt:189-196]`, per `[65: Chapter 5, Section 4]`: "heading, speed, and altitude information does **not** need to be transferred between TRACON positions **provided the data block contains the appropriate scratch pad information and the type aircraft**." This is the terminal analogue of ERAM's fourth line — the *scratchpad itself* is the coordination. **Hard exception:** automated point outs to the controller responsible for **sequencing MUST NOT be used** for Eppley/Lincoln and Offutt arrivals.
- **Transfer of control** `[repo: R90_Order_7220_10B.txt:169-176]`: occurs after handoff *and* frequency change; the receiving controller then has control for descent and **turns of up to 45 degrees** for airports where they provide approach control service. Compare ZMP's inter-sector releases, which are typically **20 or 30 degrees** and distance-bounded — e.g. "turns up to 20 degrees on aircraft within 20 miles of the common boundary crossing point" `[repo: ZMP_Order_7200_1O.txt:673-677]`, "turns of 30 degrees … at a point 10 miles …" `[repo: ZMP_Order_7200_1O.txt:2461-2463]`, and with ZAU/YYZ up to **45 degrees** within 20 miles `[repo: ZMP_Order_7200_1O.txt:677-679, 1029-1031]`.
- **Prearranged coordination airspace** `[repo: R90_Order_7220_10B.txt:230-248]`: all aircraft entering it must have an **operational transponder and the associated full data block**; RE and RW may each climb and turn OMA departures into the other's airspace only within the depicted PACP blocks (Appendix D). This is a terminal pattern — small, mapped, mutually-owned blocks of airspace used continuously, dozens of times per session. The ZMP equivalent (control releases in LOAs) is invoked per-aircraft, not per-block.
- **Manual handoffs at international boundaries** — a ZMP-only burden: Toronto (YYZ) and Winnipeg (YWG) "require the manual coordination of radar handoffs" `[repo: ZMP_Order_7200_1O.txt:636-638, 815-816, 1002-1003, 2741-2742, 2818-2819, 2891-2892, 2987-2988]`, and VATCAN sectors cannot accept AIT `[repo: ZMP_Order_7200_1O.txt:555-557]`. R90 has no international boundary.

### 3.4 Flight strips vs. stripless operation

**This is cleanly settled by the repo, and the answer may surprise trainees.**

- The vZMP flight-strip order is **explicitly and exclusively an ATCT (tower) order**: "This policy prescribes general procedures and guidance for flight strip marking for controllers working **ATCT positions** in vZMP" `[repo: ZMP_Strip_Marking.txt:3-5]`. Every chapter is a tower chapter — ATCT IFR Departures, ATCT VFR Departures, ATCT Local VFR, ATCT Arrival Aircraft `[repo: ZMP_Strip_Marking.txt:36-100]`. Fields are color-coded by tower position: **blue** = Flight Data/Clearance Delivery, **purple** = Ground, **red** = Local, **black** = computer-entered `[repo: ZMP_Strip_Marking.txt:130-138]`.
- There is a **top-down controlling exemption**: "Controllers working ATCT positions 'top-down' — that is a center or approach controller working an underlying ATCT — may opt **not** to make annotations on flight strips … in the interest of lessening controller workload" `[repo: ZMP_Strip_Marking.txt:122-128]`.
- **Neither** the ZMP en route order nor the R90 order contains any strip-marking requirement. A grep of `ZMP_Order_7200_1O.txt` and `R90_Order_7220_10B.txt` for "strip" returns nothing operational.

**Therefore, for these two toolsets:** *both* the ZMP en route sectors and the R90 TRACON positions are effectively **stripless**; strips appear only when either controller works a tower top-down, and even then may be waived. The strip module belongs to the tower curriculum, not to the ARTCC or TRACON curriculum.

`UNCITED:` The real-world statement "ARTCCs are stripless post-ERAM while TRACONs were stripless earlier" is a reasonable summary of NAS history but is not supported by anything in this repo. Do not state it as fact in either tool.

For tower-strip reference, the ZMP field map is `[repo: ZMP_Strip_Marking.txt:161-198]`: fields 1–11 are computer-supplied (ACID, revision number, type/equipment, **CID**, **beacon code**, P-time, filed cruise altitude, departure, destination, route, remarks); 12 = ATIS, 13 = pushback time if gate hold/metering in effect, 14 = gate, 15 = PDC or clearance check, 16 = intersection taxiway, 17 = departure runway, 18 = **departure controller STARS ID**, 19 = wheels-up/EDCT, 20 = assigned departure heading. Note field 18: even the ZMP tower strip carries a **STARS ID**, i.e. the terminal single-letter identifier from §3.1.

### 3.5 Sector eligibility, filters, and range

**ZMP — every sector is a distinct configuration the trainee must set up by hand.**

Each sector page specifies a **range limit** and an **altitude filter**:

| Sector | Range limit | Altitude limits |
|---|---|---|
| 01 | 115–135 NM | `000B242` |
| 02 | 075–100 NM | (per page) |
| 03 | 150 NM | (per page) |
| 04 | 100–124 NM | (per page) |
| 05 | 75–100 NM (125–175 when Area 2 is combined to one scope) | `000B242` |
| 06 | 60–75 NM | `000B242` |
| 08 | 60–75 NM | |
| 10 | 75 NM | |
| 11 | 150 NM | |
| 12 | 130–175 NM | |
| 13 | 150–200 NM | |
| 15 | 100–125 NM | |
| 22 | 150 or 225 depending on configuration | |

`[repo: ZMP_Order_7200_1O.txt:656, 740, 839, 927, 1015, 1088, 1246, 1326, 1490, 1668, 1793, 2252, 2761]`

Filters are set relative to the vertical limits of the airspace **plus the vertical minimum in use** (1,200 ft or 2,200 ft buffer — §2 above) `[repo: ZMP_Order_7200_1O.txt:396-404]`. Sectors combine and de-combine by area, and de-combining individual sectors requires staff approval `[repo: ZMP_Order_7200_1O.txt:390-394]`; for routine VATSIM operations "vZMP airspace combines at **Sector 11**, with the primary frequency being **133.4**," and the controller must ensure TX/RX is selected for `MSP_CTR` rather than only Sector 11's own transceiver `[repo: ZMP_Order_7200_1O.txt:3976-3984]`.

**R90 — the configuration is a video map list, not a filter.** R90's setup task is "Make necessary STARS configuration entries" `[repo: R90_Order_7220_10B.txt:111]`, and Appendix C enumerates roughly 150 numbered **STARS maps** — `1. MAIN`, `2. N FLOW`, `3. S FLOW`, `5. 5NM CIR`, `6. 3NM CIR`, `51. ILS32R1`, `140. MVA LAB`, `253. MVA`, `254. FUS MVA`, `255. LF NORT`, `256. LF SOUT`, `99. PA BLKS` `[repo: R90_Order_7220_10B.txt:379-450]`. Note `99. PA BLKS` (prearranged coordination blocks) and `253/254. MVA` — the terminal controller's scope is a **map-selection** problem; the en route controller's scope is a **range-and-filter** problem.

`UNCITED:` **Radar sort boxes.** No document in this repo mentions sort boxes, and I could not tie them to a 7110.65 paragraph. If the ZMP tool teaches sort boxes (the ERAM adaptation grid that determines which sectors are eligible to receive a given track's data), it must be sourced elsewhere and labeled as such.

`UNCITED:` **EDST / URET.** Neither term appears anywhere in this repo, and I cannot cite a 7110.65 paragraph for them. The en route conflict-probe/trial-plan toolset is real and is a genuine en route-only capability with no terminal analogue — but in this toolset it is currently **unsourced**. Either source it before building a lesson, or scope the ZMP tool to ERAM as documented (fourth line, interim/procedural altitudes, AIT, Data Block Coordination) and leave EDST out.

### 3.6 Mode C and beacon codes

- **Mode C is a gating condition for ZMP's automation shortcuts.** Data Block Coordination requires "aircraft which are radar identified with **valid mode C** when the handoff is initiated and are reasonably expected to remain in radar contact" `[repo: ZMP_Order_7200_1O.txt:583-586]`. Non-Mode-C aircraft are excluded from the interim-altitude waiver because of `[65: 5-14-4]` `[repo: ZMP_Order_7200_1O.txt:436-438]`. Sector 10 handles the inverse case — accepting a handoff on a valid-Mode-C aircraft with a filed inappropriate altitude `[repo: ZMP_Order_7200_1O.txt:1509-1511]`.
- **Beacon code control is a boundary-release item en route.** ZMP releases code-change authority across boundaries: "The receiving ARTCC may assume control for **beacon code changes** and turns up to 20 degrees on aircraft within 20 miles of the common boundary crossing point" `[repo: ZMP_Order_7200_1O.txt:673-679, 766-768, 849-851, 957-960, 1025-1031, 1104-1106]`. Sector 02 explicitly *withholds* the ability to "change the beacon code of any aircraft" in one case `[repo: ZMP_Order_7200_1O.txt:775]`. Toward R90: "R90 shall have control for code changes" `[repo: LOA_ZMP_R90.txt:47]`.
- **R90's beacon concern is acquisition, not authority.** The standing duty is "Ensure **auto-acquisition** for departures at satellite airports" `[repo: R90_Order_7220_10B.txt:112]`, and prearranged coordination airspace requires "an operational transponder and the associated **full data block**" `[repo: R90_Order_7220_10B.txt:233-235]`. The relief checklist calls out "**Non-beacon/Primary aircraft**" as a briefing item `[repo: R90_Order_7220_10B.txt:381]` — as does ZMP's, phrased as "Primary targets with **no Associated Data Block**" `[repo: ZMP_Order_7200_1O.txt:3956]`.

`UNCITED-SUBPARA:` the 7110.65 paragraphs for beacon code assignment and for Mode C validation are in Chapter 5, Section 2 (Beacon Systems), but I could not confirm the exact numbers. Verify before quoting.

---

## 4. The radar sensors

| | **ARSR** (Air Route Surveillance Radar) — en route | **ASR** (Airport Surveillance Radar) — terminal |
|---|---|---|
| Nominal range | ~200 NM | ~60 NM |
| Nominal update (antenna rotation) | ~**12 seconds** | ~**4.8 seconds** |
| Typical presentation | **Fusion / mosaic** of multiple sites | **Single-site** |

`UNCITED:` **Neither the range figures nor the update rates appear in 7110.65 or in any document in this repo.** 7110.65 is a procedures handbook; it does not specify sensor performance. Present these numbers as *system background*, sourced to equipment documentation, and do not put them on a rules quiz. What 7110.65 *does* give you is the consequence — the separation minima in §1, which exist precisely because of these differences.

**What the repo does support, and it is the useful part:**

ZMP's operation is built around **named individual radar sites** and around the difference between mosaic coverage and single-site coverage:

- Four sites are singled out by name — **Empire MI (QJA), Eagle River WI (EGV), Alpena MI (APN), Sawyer MI (SAW)** — as "**single-site adapted areas**" where 3 NM may be used `[repo: ZMP_Order_7200_1O.txt:512-521]`.
- Everywhere else, ZMP is on 5 NM `[repo: ZMP_Order_7200_1O.txt:518-521]`.
- The reversion condition is written in sensor terms: revert to 5 NM or non-radar upon "visual observation of the radar display that an **anomaly of data from the radar site providing 'single site' coverage** has occurred or is occurring" `[repo: ZMP_Order_7200_1O.txt:528-531]`.
- Coverage is explicitly imperfect: "Radar coverage throughout the sector is good, **with some gaps in the far north and south of the sector at low altitudes**" `[repo: ZMP_Order_7200_1O.txt:634-636]`.
- Non-radar operations are a standing relief-briefing item `[repo: ZMP_Order_7200_1O.txt:3950]`.

R90 has none of this. There are no named radar sites in the R90 order, no single-site/mosaic distinction, no coverage-gap language, and no reversion procedure. The terminal controller's sensor is, operationally, a given.

**Why the update rate changes how the controller must think.** State it to trainees as a *prediction* problem, and mark the reasoning as instructional rather than regulatory:

- At **~12 seconds** per sweep, a 480-knot target moves roughly **1.6 NM between updates**. The en route controller cannot control to the target — the target is always stale. They must control to a **projected position**, which is why en route work is built out of *route, altitude, and time* (crossing restrictions, miles-in-trail, metering, holding) rather than out of continuous vectoring. It is also why 5 NM exists: the minimum has to absorb the position uncertainty of a slow sweep at long range.
- At **~4.8 seconds**, a 180-knot target moves roughly **0.24 NM between updates**. The terminal controller gets a nearly continuous picture and can therefore control to what they see — small heading changes, speed control, turning a base leg at a specific point, running 3 NM (or 2.5 NM on final).
- The behavioral tell: an en route trainee who tries to "vector like a TRACON" will chase the target and over-control; a terminal trainee moved to en route will issue corrections that are already obsolete when the next sweep paints. Both tools should name this failure mode explicitly.

`UNCITED:` the two-paragraph reasoning above. It is standard instructional framing, not a citable rule.

---

## 5. The job itself, and what "SCAN" means at each

### 5.1 EN ROUTE (ZMP) — route, altitude, time, and a very large box

The ZMP order's own picture of the job, sector by sector: an altitude stratum ("Sector 01 works all performances of aircraft from the ground to FL230" `[repo: ZMP_Order_7200_1O.txt:633]`), a set of neighbors including approach controls and foreign centers, part-time towers and part-time TRACONs whose airspace *reverts to the sector when they close* ("When APN Approach Control is not open, the airspace delegated to APN Approach Control becomes the responsibility of Sector 01" `[repo: ZMP_Order_7200_1O.txt:642-646]`; "When Rochester APCH is closed the airspace reverts to Sector 07" `[repo: ZMP_Order_7200_1O.txt:1252]`), and a scope set to 60–225 NM.

Core work products:

- **Route** — STAR routing is mandatory for turbojets and turboprops `[repo: ZMP_Order_7200_1O.txt:1265-1270, 1401-1408]`; erroneous flight plans must be evaluated and amended, and **any route change requires a full route clearance (FRC)** `[repo: ZMP_Order_7200_1O.txt:495-509]`.
- **Altitude** — crossing restrictions and descend-via; stratified handoffs with interim altitudes.
- **Metering / miles-in-trail** — a standing relief-briefing item under "FLOW CONTROL: a. Routes, b. **Metering/Miles-in-trail**" `[repo: ZMP_Order_7200_1O.txt:3945-3947]`, and concretely 5 MIT / 7 NM staggered into M98 `[repo: LOA_ZMP_M98.txt:163-165]`.
- **Holding** — every sector page lists holding fixes with **direction, leg length, max speed, and turn direction**, e.g. Sector 06: EAU/SE/STD/310/RT, NICKL/SE/STD/310/LT, HERMI/E/STD/310/LT, JERMN/E/10NM/310/RT, CMAAC/E/10NM/280/LT `[repo: ZMP_Order_7200_1O.txt:1416-1432]`. Holding is a *routine* en route tool, with EFC coordination encoded into the fourth line `[repo: ZMP_Order_7200_1O.txt:1361-1363]`.
- **LOA-driven handoffs** — the sector pages defer constantly to LOAs, and this repo carries **17 of them** for ZMP alone (M98, R90, RST, DLH, FAR, FSD, SUX, GRB, BIS, DSM, CZWG, ZAU, ZDV, ZKC, ZLC, ZOB, plus the ZAU approach-controls LOA). The en route controller's neighbors are a *studied set of contracts*, each with its own altitudes, routes, and control releases.

**The en route SCAN.** `UNCITED:` (instructional framing, not a citable rule.)

1. **Boundary-out first.** What is inbound to my sector from every side, and is it at the altitude and on the route my LOA or my neighbor's release requires? The ZMP scan starts *outside* the sector because at 12-second sweeps and 60–225 NM ranges, everything that will be a problem is already visible and is minutes away.
2. **Strata.** Who is climbing through, who is descending through, and does the fourth line / interim altitude reflect it? ZMP requires the data block to reflect current status `[65: 5-14-3]`.
3. **Conflict pairs in the horizontal**, at 5 NM (or 3 NM only inside a named Appendix 02 single-site area).
4. **Flow.** Am I meeting my MIT into M98? Is the metering holding? Is the CMAAC stack still coordinated `[repo: ZMP_Order_7200_1O.txt:1365-1390]`?
5. **Pending.** Handed off but still in my sector; point-outs to and from; holding aircraft; non-radar; primary targets with no data block; aircraft released but not airborne — literally the ZMP relief-briefing list `[repo: ZMP_Order_7200_1O.txt:3949-3961]`.

The rhythm is **slow and wide**: a full scan every sweep or two, and the work is planned three to eight minutes ahead.

### 5.2 TERMINAL (R90) — vector, sequence, space, clear for the approach

R90's whole order is arrival-shaped. The standing radar-position duties `[repo: R90_Order_7220_10B.txt:111-122]`: configure STARS; ensure auto-acquisition; **provide direct control**; coordinate pilot-applied visual separation before comm transfer; **complete data block entries prior to initiating transfer**; **resolve all potential conflicts prior to transferring radio communication**; ensure handoffs/point-outs are accomplished.

Note "provide direct control" and "resolve all potential conflicts prior to transferring communication" — those are terminal sentences. The TRACON controller owns the aircraft continuously and hands off a *clean* aircraft.

Core work products:

- **Vectoring and sequencing** to a runway, across Radar West / Radar East / Radar Final / Radar Offutt / Radar Lincoln / Lincoln Final `[repo: R90_Order_7220_10B.txt:101-107]`.
- **Spacing to the final** — the arrival must be "on a procedure or assigned a heading or direct a fix that penetrates RF airspace," and the setup "must allow the aircraft to conduct a **stabilized approach**" `[repo: R90_Order_7220_10B.txt:205-212]`.
- **Freezing the picture at handoff** — "Once a handoff is accepted, **no changes to assigned heading or assigned altitude without verbal approval from the receiving controller**" `[repo: R90_Order_7220_10B.txt:207-209, 216-218, 222-224, 228-230]`. This appears four times, once per arrival category. It is the sequencing controller's guarantee to the final controller.
- **Approach clearances**, encoded in the scratchpad before they are spoken `[repo: R90_Order_7220_10B.txt:249-311]`.
- **Tower coordination** — opposite-direction arrivals require tower approval at OMA, OFF, and LNK `[repo: R90_Order_7220_10B.txt:211, 218, 226]`; missed approaches are pre-assigned to a specific frequency by scratchpad letter (E→135.875 west, W→135.875, V/P→124.5, and "all missed approaches should be assigned 135.875 when RE is not open") `[repo: R90_Order_7220_10B.txt:258-267]`.
- **Prearranged coordination** used continuously between RE and RW for OMA departures `[repo: R90_Order_7220_10B.txt:236-248]`.

**The terminal SCAN.** `UNCITED:` (instructional framing.)

1. **Final first, and backwards.** Where is the last aircraft on final, where is the gap, and what goes in it? Everything upstream is arranged to fill or protect that gap.
2. **The sequence, by name.** The terminal controller holds an ordered list — 1, 2, 3, 4 to the runway — and re-verifies it every sweep. This list does not exist in en route work.
3. **Spacing and closure rate** between adjacent pairs, at 3 NM (2.5 NM only under §1.3), **plus wake**, which is checked pairwise every time the order changes.
4. **Altitude to the approach** — is each aircraft at an altitude from which it can intercept and fly a stabilized approach?
5. **The scratchpad**, on every target: approach, runway, termination. If the scratchpad is wrong, the automated point-out is invalid `[repo: R90_Order_7220_10B.txt:189-196]` and the final controller is working from bad intent.
6. **Departures and PACP blocks** — is the departure inside the block I am allowed to turn it in `[repo: R90_Order_7220_10B.txt:236-248]`?

The rhythm is **fast and narrow**: a full scan every sweep (≈5 s), work planned 60–180 seconds ahead, and constant small corrections.

### 5.3 The seam between them

The ZMP/R90 LOA is the exact boundary object both tools should teach `[repo: LOA_ZMP_R90.txt]`:

- R90 owns at and below **15,000** over East/West and at and below **10,000** over LNK `[:16-19]`.
- STAR arrivals arrive **level at or descending to 16,000** (or 17,000 stacked) `[:56-58]`; SUX/MZEEE arrivals **11,000** `[:60]`.
- **R90 has control on all STAR arrivals at or below FL230 for descent and turns up to 30 degrees on initial contact**, provided the aircraft will not enter another controller's airspace `[:62-64]`.
- ZMP-assigned speeds on STAR inbounds need no coordination with R90 `[:66]`.
- R90 must climb departures to the requested altitude or the top of R90 airspace, whichever is lower `[:88-90]`, and while STARs are active must vector departures clear of the arrival areas on **specific heading bands per STAR gap** (360–030, 090–110, 150–185, 220–250, 280–320) `[:92-110]`.

Teach it from both sides: the ZMP tool teaches "what I must deliver"; the R90 tool teaches "what I am guaranteed to receive, and what I may do with it on initial contact."

---

## 6. What each trainee is graded on that the other is not

Sourced from the ZMP training manual's S3 (approach) and C1 (en route) syllabi `[repo: ZMP/source-docs/txt/ZMP_Order_3120_4F.txt]`. Both ratings are validated by written exam **plus an Over-the-Shoulder (OTS) practical** `[repo: ZMP_Order_3120_4F.txt:248-250, 1553-1558, 1930-1935]`.

### Graded on the TERMINAL side only (R90 / S3)

From S3.8, S3 Practical Exam Prep `[repo: ZMP_Order_3120_4F.txt:1519-1540]` and the lesson plans:

- **Approach Vectoring** — vectors to the final approach course.
- **Precision Approaches** and **Non-Precision Approaches** as distinct graded items.
- **Missed Approach Procedures.**
- **Sequencing and Separation of Arrivals** *and* **of Departures** as two separately graded skills.
- **Speed Restrictions** as a graded technique — "Proper sequencing and spacing, **use of speed restrictions**" `[:1462]`.
- **Approach clearance terminology (PTAC)** `[:1464]` — position, turn, altitude, clearance.
- **Use of Departure Gates** and **Arrival Gates** `[:1367, 1414]`.
- **Instrument Approach Procedures / reading IAP charts / TERPS**, including equipment out of service `[:1420-1432]`.
- **Final Approach Control** as a discrete position with its own lesson and its own competency sign-off `[:1454-1478]`.
- **STARS and ARTS/CARTS**, separation rings, conflict alerts, airspace filters, video map review `[:1258-1268]`.

### Graded on the EN ROUTE side only (ZMP / C1)

From C1.3–C1.7 `[repo: ZMP_Order_3120_4F.txt:1697-1935]`:

- **Inter-facility Coordination (ARTCC to ARTCC)** — a graded element in *every* C1 lesson, and absent from S3 entirely. The terminal syllabus grades intra-facility and adjacent-TRACON coordination `[:1300-1310, 1385-1391]`; the en route syllabus grades center-to-center.
- **Enroute Holding** — a graded element in every C1 lesson. (S3 has a holding lesson, S3.7, but framed as holding *for missed approaches* from the final controller position `[:1487-1500]`.)
- **IFR clearances from uncontrolled airports**, including **clearance void times, EDCTs, and the One-in-One-out Rule** `[:1748-1755]`. There is no terminal analogue.
- **IFR Cancellations** `[:1758]`.
- **"Pop-Up" IFR flights**, **VFR Flight Following**, **VFR On Top**, **Diversions (divert to alternate)** `[:1712-1716, 1912-1916]`.
- **Military Operations** — MOAs, Restricted Areas, in-flight military operations and maneuvers `[:1800-1820]`. Entirely absent from S3.
- **Enroute Weather / NOTAMs / TMU** — METARs, TAFs, AIRMETs/SIGMETs, Convective SIGMETs, **Center Weather Advisories**, weather deviation procedures, turbulence reports, PIREPs, NOTAM classes and decoding, TFRs, **gate holds / ground stops / delay programs**, and **ZMP TMU procedures** `[:1856-1900]`. This entire block is en route-only.
- **DSR display and data tags** `[:1598-1607]` (read as ERAM — see §3.1).
- **ZMP CTR has no separate Major facility certification**; C1 candidates are recommended for "the C1 written, ZMP CTR Major facility certification written, and OTS Practical exams" `[:1930-1935]`, while the manual also states there is no major certification for ZMP CTR and that C1-rated transfer/visiting controllers are considered certified `[:251-254]`. **This is an internal inconsistency in the source document** — flag it to the training staff rather than encoding either version.

### Graded on both

Radar identification, tracking, handoffs, coordination and point-outs, traffic conflicts and advisories, airspace management, spacing and sequencing, proper phraseology and communications, position setup and login `[repo: ZMP_Order_3120_4F.txt:1519-1540, 1697-1716]`.

### Practical consequence for tool design

The two tools should **not** share a grading rubric. Roughly:

- **R90 rubric weight:** sequence correctness → spacing/wake compliance → approach clearance construction (PTAC) → scratchpad accuracy → stabilized-approach setup → handoff cleanliness.
- **ZMP rubric weight:** LOA compliance → altitude/route correctness at boundaries → data block accuracy (interim/procedural/fourth line) → MIT and metering delivery → holding and EFC management → weather/TMU/military airspace handling.

---

## 7. Phraseology that matters

| Instruction | Primary user | Citation | Notes |
|---|---|---|---|
| **"Descend via the KKILR ARRIVAL"** | **EN ROUTE** | `[65: 4-5-7, UNCITED-SUBPARA]` | Delegates the whole vertical profile to the pilot. In this repo it is en route: "Sector 16 will issue a **'descend via'** clearance through Sector 06" `[repo: ZMP_Order_7200_1O.txt:1410-1415, 1604-1608, 1739-1742, 1990-1994]`. Requires a **procedural altitude** in the data block showing the published altitude at the boundary fix `[repo: ZMP_Order_7200_1O.txt:596-600]`. |
| **"Cross HUGGI at and maintain one zero thousand"** | **EN ROUTE** | `[65: 4-5-7, UNCITED-SUBPARA]` | The "knock it off" fallback when the OPD is discontinued — the repo's Table 3 gives the full set: MUSCL/BAYKS 120, KKILR/HUGGI 100, BLUEM/HHAMR 100, NITZR/WRSAW 110, TORGY/OFSON 110, BAINY/LUCCY 110 `[repo: LOA_ZMP_M98.txt:172-180]`. Teach the pair together: descend-via is the normal case, the crossing restriction is the manual case. |
| **"Expect further clearance one four three zero"** (EFC) | **EN ROUTE** | `[65: 4-6-3 / 4-6-4, UNCITED-SUBPARA]` | En route holding is routine and the EFC is *coordinated through the data block*: "The character 'H' for holding followed by a two digit number for the Expect Further Clearance (EFC) time may be entered into the **4th line** of the data block" `[repo: ZMP_Order_7200_1O.txt:1625-1636, 1758-1763]`; fourth-line indicator `Hxx` or `xxxx` `[repo: ZMP_Order_7200_1O.txt:1361-1363]`. |
| **Full holding instructions** (fix, direction, radial/course, leg length, turns, EFC) | **EN ROUTE** | `[65: 4-6-3, UNCITED-SUBPARA]` | The ZMP sector pages pre-publish direction, leg length, max speed, and turn direction for every sector holding fix `[repo: ZMP_Order_7200_1O.txt:1416-1432, 1743-1757, 2578-2582, 2654-2657]`, so the trainee is reading a table, not improvising. |
| **"Full route clearance"** | **EN ROUTE** | — | ZMP-local requirement: any route change requires an FRC, and if the pilot is unable, offer radar vectors to a fix in vZMP airspace then as filed `[repo: ZMP_Order_7200_1O.txt:495-509]`. |
| **"Turn left heading two seven zero, vector for the ILS runway three two right"** | **TERMINAL** | `[65: 5-6-1, 5-6-2]` | Vectoring application and methods. |
| **"…maintain three thousand until established on the localizer, cleared ILS runway three two right approach"** (PTAC) | **TERMINAL** | `[65: 5-9-2]` vectors to final / final approach course interception; `[65: 4-8-1]` approach clearance | Named in the S3 syllabus as a graded item: "Approach clearance terminology (**PTAC**)" `[repo: ZMP_Order_3120_4F.txt:1464]`. Position, Turn, Altitude, Clearance. |
| **"Cleared visual approach runway three two left"** | **TERMINAL** | `[65: 7-4-1, UNCITED-SUBPARA]` | Encoded in R90 scratchpads by *omission of an approach letter*: "**Runway only in scratchpad indicates a Visual Approach to that runway**" `[repo: R90_Order_7220_10B.txt:285]`, and at OMA "32L, 32R, R36, R18, 14R, 14L denotes visual approach to a full stop" `[repo: R90_Order_7220_10B.txt:261-263]`. |
| **"Maintain visual separation"** | **TERMINAL** | `[65: 7-2-1]` | R90 standing duty to coordinate pilot-applied visual separation before comm transfer `[repo: R90_Order_7220_10B.txt:114-116]`. |
| **"Reduce speed to two one zero"** | **TERMINAL** (routinely) / **EN ROUTE** (for flow) | `[65: 5-7-1, 5-7-2]` | Terminal: a graded spacing technique `[repo: ZMP_Order_3120_4F.txt:1462, 1533]`. En route: a flow tool, and per LOA "ZMP assigned speeds on STAR inbounds do not need to be coordinated with R90" `[repo: LOA_ZMP_R90.txt:66]`; M98 crossings are at "the published speed of 280kts unless otherwise coordinated" `[repo: LOA_ZMP_M98.txt:182-183]`. |
| **"Radar contact"** / **"Radar service terminated"** | **BOTH** | `[65: 5-3-1 / 5-3-2, UNCITED-SUBPARA]` | Radar identification methods; a graded element in both syllabi. |
| **Safety alert / traffic advisory** | **BOTH** | `[65: 2-1-6]` safety alert; `[65: 2-1-21]` traffic advisories | "Traffic conflicts and advisories" is graded in both S3 and C1 `[repo: ZMP_Order_3120_4F.txt:1375, 1707]`. |

**The one-sentence contrast to put on a slide:**

> En route talks in **route, altitude, and time** — *descend via, cross X at Y, expect further clearance, hold as published, five miles in trail.*
> Terminal talks in **heading, speed, and runway** — *turn left heading two seven zero, reduce speed to one eight zero, maintain three thousand until established, cleared ILS runway three two right.*

---

## 8. Quick divergence table (for a shared tool header)

| Dimension | **ZMP — EN ROUTE** | **R90 — TERMINAL** |
|---|---|---|
| Lateral minimum | 5 NM; 10 NM ≥FL600; 3 NM **only** in named single-site areas | 3 NM <40 NM from antenna; 5 NM ≥40 NM; 2.5 NM on final under conditions |
| Vertical | 1,000 ft to FL410 (RVSM FL290–410), 2,000 ft above FL410 | 1,000 ft, always — airspace caps at 15,000/10,000 |
| Automation | ERAM; four-line data block; interim & procedural altitudes; AIT; Data Block Coordination | STARS; encoded scratchpads (approach/runway/termination); automated point outs; PACP blocks |
| Scope setup | Range limit 60–225 NM + altitude filter (`000B242`) with 1,200/2,200 ft buffer | ~150 numbered video maps; MVA, PA BLKS, flow maps |
| Strips | Stripless (strip order is ATCT-only, waivable top-down) | Stripless (no strip provisions in the R90 order) |
| Sensor | ARSR, mosaic, named single-site areas, documented coverage gaps, non-radar procedures | ASR, single-site, sensor not an operational variable |
| Control released across the boundary | Turns 20°/30° (45° with ZAU/YYZ), distance-bounded | Turns up to 45° for own approach-control airports; 30° from ZMP below FL230 on initial contact |
| Neighbors | 17 LOAs, two foreign centers (YYZ, YWG) with **manual** handoffs and no AIT | One center LOA (ZMP), three towers (OMA, OFF, LNK), one adjacent approach (SUX) |
| Core verbs | route, cross, descend via, hold, meter, trail | vector, sequence, space, slow, clear for the approach |
| Planning horizon | 3–8 minutes | 60–180 seconds |
| Uniquely graded | ARTCC-to-ARTCC coordination, en route holding, uncontrolled-field IFR clearances (void times, EDCT, one-in-one-out), military airspace, weather/NOTAM/TMU, pop-ups, VFR-on-top, diversions | approach vectoring, precision & non-precision approaches, missed approaches, PTAC, speed restrictions, arrival/departure sequencing as separate skills, IAP/TERPS chart reading |

---

## 9. Open items before either tool ships

1. **`UNCITED` — EDST/URET.** Absent from this repo. Either source it or scope the ZMP automation module to what §3 documents.
2. **`UNCITED` — radar sort boxes.** Absent from this repo and not tied to a 7110.65 paragraph.
3. **`UNCITED` — ARSR/ASR update rates and ranges.** Not in 7110.65 and not in this repo. Label as equipment background.
4. **`UNCITED` — RECAT/CWT applicability** at M98, R90, or ZMP. Unknown. Teach the legacy wake table until resolved.
5. **`UNCITED-SUBPARA`** — verify sub-letters for: 5-5-4 (2.5 NM conditions, wake table), 4-5-1 (non-RVSM in RVSM airspace), 4-5-7 (descend via / crossing restrictions), 4-6-3/4-6-4 (holding instructions, EFC), 7-4-1 (visual approach), 5-3-1/5-3-2 (radar identification), Chapter 5 Section 2 (beacon code assignment, Mode C validation).
6. **Source conflict to resolve with ZMP training staff:** the training manual states there is no Major facility certification for ZMP CTR `[repo: ZMP_Order_3120_4F.txt:251-254]` but C1.7 recommends the student for "the **ZMP CTR Major facility certification written**" exam `[repo: ZMP_Order_3120_4F.txt:1930-1935]`.
7. **Sector 01's 54 NM single-site radius** `[repo: ZMP_Order_7200_1O.txt:639-640]` differs from the 40 NM used at Sectors 02 and 03. Confirm it is intentional before building it into a quiz — and if intentional, present it as an Appendix 02 area, never as the 7110.65 terminal rule.
8. The training manual (`ZMP_Order_3120_4F.txt`, Revision 6, effective 01 JUL 19) is materially older than the operations orders (`ZMP_Order_7200_1O.txt` CHG 2, 11/15/2024; `R90_Order_7220_10B.txt` CHG 2, 10/27/2024) and still references VRC/Teamspeak and ARTS/CARTS. Where they disagree, the operations orders win.

---

### Repo evidence index

| File | Used for |
|---|---|
| `C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\ZMP_Order_7200_1O.txt` | 3-mile single-site authorization (§3.6, Appendix 02), ERAM filter limits (§3.2), interim/procedural altitude (§3.3, §3.8), AIT (§3.7), FRC (§3.5), MIA (§3.9), per-sector range/altitude limits, fourth-line vocabulary, holding fix tables, CMAAC PVD procedure, relief-briefing checklist, combined-operations appendix |
| `C:\Dev\Vatsim-Training-Tools\ZMP\R90\source-docs\txt\R90_Order_7220_10B.txt` | STARS position IDs, common radar-position duties, transfer of control (45°), automated point outs, arrival procedures, prearranged coordination, scratchpad encoding (OMA/LNK/CBF/other), position relief checklist, STARS map list |
| `C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\ZMP_Strip_Marking.txt` | Strip marking is ATCT-only; top-down exemption; color coding; field maps |
| `C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\ZMP_Order_3120_4F.txt` | S3 and C1 syllabi and completion standards; OTS requirement; graded-element lists |
| `C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\LOA_ZMP_M98.txt` | 5 MIT / 7 NM staggered; knock-it-off crossing altitudes; 280 kt boundary speed |
| `C:\Dev\Vatsim-Training-Tools\ZMP\ZMP\source-docs\txt\LOA_ZMP_R90.txt` (identical copy at `C:\Dev\Vatsim-Training-Tools\ZMP\R90\source-docs\txt\ZMP_R90_LOA.txt`) | R90 delegated altitudes, STAR arrival altitudes, control on initial contact, departure heading bands, code-change control |