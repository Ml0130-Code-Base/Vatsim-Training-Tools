# vZMP PBN Phase II briefing — what it says about the 2026-10-29 SIDs

**Source:** *vZMP PBN Phase II Procedure Changes*, Minneapolis ARTCC, 25 pages, cover dated
**10/29/2026**. Supplied by the owner on 2026-10-28 (the SOP and LOA revisions are not out yet — the
last page says they are coming, with another brief and an R&I). **Cited here as "briefing p.N".**

**What kind of document this is.** A training briefing, not an order. It does not amend the M98 SOP,
the MSP-M98 LOA or the ZMP-M98 LOA, and where it differs from them the briefing describes what is
coming and the orders describe what is written. Nothing below is graded by the deck (see *What the deck
does with it*). The SID plates it shows are marked **PROTOTYPE — NOT FOR NAVIGATION**.

**Pull record** (root `CLAUDE.md` §6). Not pulled from `minniecenter.org/docs`; owner-supplied PDF,
`vZMP PBN Phase II Procedure Changes.pdf`, 1,687,426 bytes, md5 `28956628108a3152e46ad4192dce68aa`,
**not committed** (the briefing's public status is not known; see the source index). **Only about 4 KB
of it is text.** The slide text was read with `pdftotext -layout`; the other content is 17 embedded
JPEGs (the SID comparison chart, four SID maps, two SNOWZ/HTDSH plates, the airspace charts and the
scratchpad table), carved out of the PDF with `perl` and read by eye on 2026-10-28. There is no
rasteriser on the owner's machine, so a page is read as the image it carries and not rendered.

## 1. The slide text, by page

| Page | Says |
|---|---|
| 2 | **PBN Phase I went live 2026-03-19** with changes to MSP STARs and IAPs; the affected changes *"were addressed in SOPs and LOAs when needed"*. **The MSP VOR is still slated for decommissioning on a date to be named; the MSP DME will remain on the air in perpetuity.** |
| 3 | **On 2026-10-29 existing SIDs are cancelled at MSP and all satellites, except the MSP9, which is up-numbered to MSP1.** They are replaced simultaneously by PBN SIDs *"designed to mimic existing SIDs while also optimizing their integration in the NAS"*. |
| 6 | **SNOWZ replaces both ORSKY and SCHEP.** SNOWZ departures are **on headings, except when departing Runway 17** (explained later). **SNOWZ serves MSP only; the satellites are served by DUHCK, laterally separated from SNOWZ.** |
| 8 | **KBREW** *"remains unchanged, it is just RNAV based now."* **BITEZ replaces LEINY, GENEO..DKOTA and SMERF**, sits farther north than LEINY and so eliminates the LEINY sidestep. **ZOGAP has moved farther west** (minimum leg length); **PAGOZ has moved farther east** (an IRL ZMP request). |
| 10 | **BUNYN** — *"goodbye to vectors out the gate."* **NRTHN replaces and expands WLSTN**, adding a more northerly transition closer to HYR routing. |
| 12 | **SNUPE replaces COULT**, moving farther south to eliminate the COULT sidestep. **ZMBRO** *"remains unchanged, it is just RNAV based now."* **TOTTZ replaces RST**, splitting the difference between FOBUG and DOKTR. **ZMBRO and TOTTZ merge into a new SID on 30s/17.** |
| 14 | **Departures off 30L/R and 12L/R remain unchanged from today's operation.** Runway 17 is *"more of a mixed bag"*: **on 12s/17, SNUPE, ZMBRO and TOTTZ are on headings just as COULT, ZMBRO and RST are today.** SNOWZ off 17 follows an RNAV procedure down the Minnesota River, mimicking today's noise turn to 215°. |
| 15 | **SNOWZ off Runway 17: runway heading to intercept a 220° course to RUBRB, then a 215° course indefinitely.** |
| 16 | **On a 30s/17 configuration the ZMBRO and TOTTZ departures are swapped to one combined SID, HTDSH.** HTDSH off Runway 17 flies down the river like SNOWZ. *"This allows for airspace modification."* |
| 22 | **30s/17 airspace:** **Area F is eliminated.** **NITZR and BLUEM arrivals can descend via the arrivals.** **RNAV Y approaches to Runway 30L no longer require coordination with MSP.** **HTDSH turboprops, or jets staying below 9,000, enter satellite airspace on a 170° track climbing to 5,000.** |
| 23–24 | **Scratch pads.** *"This is the first time MSP will have multiple SID transitions."* Most, like SNOWZ, split off inside M98 airspace; **TOTTZ splits well outside it.** **Scratch pads show the transition out of M98 airspace, not the ultimate en route transition.** If a scratch pad is unavailable, the SID map depicts the transitions and can be cross-referenced with the flight strip. |
| 25 | SOP and LOA changes to follow, *"hopefully over the weekend"*, with another brief and an R&I. |

## 2. Old SID to new SID, as the briefing draws it

| Retired | Replaced by | Briefing |
|---|---|---|
| ORSKY, SCHEP | **SNOWZ1** (MSP only) | p.6 |
| LEINY, GENEO..DKOTA, SMERF | **BITEZ1** | p.8 |
| KBREW | **KBREW1** ("unchanged, just RNAV") | p.8 |
| *(vectors out the gate)* | **BUNYN1** (new) | p.10 |
| WLSTN | **NRTHN1** (expanded, more northerly transition) | p.10 |
| COULT | **SNUPE1** | p.12 |
| ZMBRO | **ZMBRO1** ("unchanged, just RNAV") | p.12 |
| RST | **TOTTZ1** | p.12 |
| ZMBRO + TOTTZ **in a 30s/17 only** | **HTDSH1** | p.12, p.16 |
| *(satellite SIDs)* | **DUHCK1** (ANE, FCM, STP) | p.6; chart label "DUHCK1 - ANE, FCM, STP" |
| MSP9 | **MSP1** (up-numbered, not replaced) | p.3 |

`DWN` is not in the briefing. The ZMP-M98 LOA 4.f reroute of satellite DWN traffic via INUNE GENEO
DKOTA is the *"GENEO..DKOTA"* that BITEZ replaces, which is how the two documents line up.

## 3. The Runway 17 segment

Plates p.15 (SNOWZ1) and p.16 (HTDSH1), prototype: **170° (170°T) off the runway, then a 220° (220°T)
course to RUBRB at 3,500, then 215° (215°T) from RUBRB.** SNOWZ1 also shows **MANCY at 4,000** on a leg
labelled 217°; HTDSH1 shows **ITZME at 3,500**. Both carry **top altitude: jets 7,000 / props 5,000**,
**RNAV 1 — DME/DME/IRU or GPS**, **radar required**. HTDSH1 carries an MSA of 3,500 at 25 NM from MSP.

**These agree with what the deck already flies off Runway 17** (CIFP 261029 `RW17`: heading 169.5,
RUBRB at or above 3,500, then a vector leg on 215.0, `RW17_HDG`). The briefing's *"215° course
indefinitely"* is that vector leg — the course the aircraft holds until it is told otherwise. The plates add
the 220° intercept leg and the top altitudes, neither of which the deck carries.

## 4. The scratchpad table (briefing p.23–24, an image)

Three-letter codes, one per **SID and transition group**. Transcribed as printed.

| SID | Transition | Scratchpad |
|---|---|---|
| BUNYN | DLH | **BAB** |
| BUNYN | KVUSI | **GPR** |
| NRTHN | AROND | **PRR** |
| NRTHN | TTOWN | **PKE** |
| SNUPE | DLL | **SNU** |
| ZMBRO | BRIBE | **BRO** |
| HTDSH | BRIBE | **ZMB** |
| HTDSH | ZZIPR · OHHMY · OANNA · ALO · FOOLZ | **TTZ** |
| TOTTZ | ZZIPR · OHHMY · OANNA · ALO · FOOLZ | **TOT** |
| SNOWZ | ISTIQ · LLUKY | **MGL** |
| SNOWZ | ZZEEE · DABOY | **PLW** |
| DUHCK | LLUKY · STIER · SBRNA | **DUK** |
| BITEZ | SMERF | **PAG** |
| BITEZ | DKOTA · LEINY | **TIK** |
| KBREW | KEETN | **KBR** |

Fifteen codes, all three letters and alphanumeric, so all enterable in CRC (`claude_CRC_Platform_Reference.md`:
3 or 4 alphanumeric characters). Several are the name of the fix the SID passes inside M98 (PAG is PAGOZ, TIK
is TICKK, MGL is MOGLL, PLW is PLOWW, PRR is PRRCH, PKE is PIIKE) and several are the first three letters of
the SID (BRO, SNU, TOT, KBR, DUK); **that is an observation about the pattern, not a rule the briefing states.**

**A second chart (on one of the two scratchpad pages) shows a flight strip** — *DAL2591, KMSP KBOS, route* `KMSP NRTHN1 AROND Q140 HANKK
Q934 PONCT JFUND2 KBOS` — i.e. the SID and its transition written as two words, beside the NRTHN1/BUNYN1 map.

### What the table does not say

- **Which scratchpad it is.** Scratchpad 1 or 2 is not named. M98 7110.26A Appendix G (`claude_M98_SOP_Reference.md`)
  has scratchpad 1 as the departure gate letter plus a requested altitude, the three-letter gate, or the arrival
  airport; **whether these codes replace the gate letters is not stated**, and the deck's `DEP_GATES` (A B D E F N O R)
  is unchanged until the order is revised.
- **Whether the altitude form survives** (the order's example is `B12`), and who enters the code.
- **Why HTDSH's BRIBE is `ZMB` while ZMBRO's BRIBE is `BRO`.** Both are printed that way.
- **SNOWZ's SMTHA transition.** CIFP 261029 codes five SNOWZ1 transitions (DABOY, ZZEEE, ISTIQ, LLUKY, SMTHA);
  the briefing's table lists four. Not assigned a code anywhere.

## 5. Where the briefing and the repo's CIFP data differ, named and not resolved

1. **FOOLZ against FOOLS.** The scratchpad table spells the fifth TOTTZ and HTDSH transition **FOOLZ**;
   `claude_MSP_SID_Reference.md` and CIFP 261029 carry **FOOLS** (and the fix FOOLS at 158/72.3). One is a
   typo. The reference keeps CIFP's spelling, as CIFP is the coded source; the briefing's is recorded here.
2. **KBREW and ZMBRO "unchanged".** The briefing means the ground track: its comparison chart (p.7, p.11)
   draws the current and new lines on top of each other. The deck says they are *"names carried over, not
   routes"*, because CIFP starts KBREW1 at HRBEK (KBREW2 started at the GEP VOR) and ZMBRO1 at JEDET (ZMBRO7 at the
   MSP VOR). **Both are true: same line past the first fix, different start.** The deck's banner wording is its own.
3. **ZOGAP and PAGOZ.** The briefing says ZOGAP moved west and PAGOZ east; the comparison chart shows the same.
   The deck's note says they moved 4.3 and 6.4 NM from where SMERF used them. **The directions were not
   cross-checked against the old and new coordinates.**
4. **HTDSH is a 30s/17 SID in the briefing; the deck treats it as valid in any configuration.** See section 6.

## 6. What this does to the open questions

- **Which of HTDSH1 and SNOWZ1 is preferred off Runway 17** (gap analysis Part 6 item 7, the owner's expectation
  that HTDSH1 is preferred). **The briefing reframes it without ranking them:** the two serve different traffic.
  SNOWZ replaces ORSKY and SCHEP, the southwest SIDs; HTDSH replaces ZMBRO and TOTTZ, and **only in a 30s/17**.
  In a 12s/17, SNUPE, ZMBRO and TOTTZ stay separate and go on headings. So the pair is not a free choice for one
  aircraft; direction of flight and configuration choose. Still unsaid: **which one a southwest or an eastbound
  aircraft gets in a configuration the briefing does not name**, and whether HTDSH is used in any configuration
  but 30s/17. The briefing does not say it is not.
- **Item 3, the gate letters.** Still tabled. The briefing gives scratchpad codes, not gate letters, and does not
  say how they relate (section 4).
- **Item 8, the vZMP documents that still name retired SIDs.** Still waiting: the briefing is not an order.
- **MSP9 to MSP1** (issue #77). The briefing is the first source for the rename; the MSP tower order that names
  it (7110.26G 3-2-4, 6-3-1.a.4) has not been revised, and nothing says how a controller voices it.

## 7. Things the briefing implies that other references still carry

- **Area F is eliminated** (30s/17). The deck's landline catalogue has an **Area F case gated on the 30/17**
  (M98 7110.26A Chapter 3, issue #25) and the SOP reference names Area F in 3-2. **Both stay as written until the
  SOP is revised.**
- **NITZR and BLUEM descend via in a 30s/17.** Whether that moves the 4-4c handoff altitudes or floors for that
  configuration is not stated.
- **RNAV Y approaches to 30L need no MSP coordination.** Not in any reference the deck reads.
- **HTDSH into satellite airspace:** turboprops, or jets staying below 9,000, on a 170° track climbing to 5,000.

## 8. What the deck does with it

**Nothing yet, and on purpose.** The deck flies the CIFP 261029 SIDs and is unchanged. This file is a source,
and the deck takes from it only what the owner decides to. Candidates, none done: the fifteen scratchpad codes as
a display beside a departure's SID and transition; MSP1 in place of MSP9; HTDSH1 offered only in a 30s/17. Each
asserts something the SOP has not yet said, so each wants the owner's word first (root `CLAUDE.md` invariant 3).
