# MSP SID Reference (Departures)

> **This file and the deck carry the SID set that takes effect on 2026-10-29 — CIFP 261029 — and
> carry it EARLY, by the owner's choice** (2026-10-14: *"since CIFP did have the new SIDs let's
> update everything for M98 so that data is live so I can start learning how the new SIDs
> flow"*). **Until 2026-10-29 the network still files the retired set** — recorded at the end of
> this file — and the deck says so in a banner on every page until the day. Issue #61.
>
> **Gate letters for the new set are TABLED** (owner, 2026-10-14: not known yet). **The scope draws a
> SID only out to 50 NM from MSP** (owner, 2026-10-22 — the STARS limit; it was 80 NM from
> 2026-10-14). The tables below still list every fix to 80 NM; the rest are named, not plotted.

## Source self-check — LOAs + SOP + plates (read before quoting a routing/altitude in a drill)

This doc is a convenience layer over the SID plates + LOAs + SOP. Before asserting a routing, join fix, or altitude as fact, confirm against the governing source and name it:

- **SID plate (current AIRAC / Navigraph)** → fix sequence, tracks, climb gradients. **CIFP is the coded form of the same plates** — the set below is decoded from it.
- **ZMP-M98 LOA** → who clears what by filed altitude (4.f), the 60-NM SID-join rule, non-SID Table 1 headings, departure release boundary (25 NM / 110), 17/22-config SID changes.
- **MSP-M98 LOA** → 30L/R turbojet dispersal tracks (9.e), departure heading coordination (8.g), initial altitudes (8.h), non-advertised-runway departures (8.i).
- **MSP 7110.26G (tower order)** → LC initial departure headings (§6-3-1, mirrors LOA 9.e), diverging-departure runway headings, VRIP/ADW, auto-releases (§6-3-1b).
- **M98 7110.26A (TRACON SOP)** → what M98 owns once it takes the departure: Departure/Feeder duties, ingress-route coordination (5-1), P-ACP climbs through arrival airspace (3-2).

If two disagree, name the conflict — don't silently pick one. **When a value drives an LC/tower action (initial runway heading, release) it's a tower-order/LOA fact; when it drives an inside-M98 action it's an SOP fact — verify in the right book.** Traps:

1. "Clear direct to a fix ahead" is a **technique**. The LOA rule for filed 090+ is *established on the SID, or a heading to join the SID within **60 NM** of the MSP DME*. There is **no "50-mile" rule** — don't quote a made-up intermediate distance.
2. **Filed altitude drives handling** (4.f): ≤6,000 as filed; 7,000/8,000 on a heading/course clear of the STAR arrival areas; 9,000 and above must be established clear of STAR areas (on the SID or joining within 60 NM); props requesting 12,000+ climbed to/level 12,000. M98 issues enroute clearance only at **170 or below** (its delegated ceiling).
3. Initial heading off the runway follows **dispersal** — an LC function in **MSP tower order §6-3-1** (which mirrors MSP-M98 LOA 9.e), **not** the M98 SOP and **not** the SID's ultimate direction. (There is no "6-3-4"; 6-3-1 is Departure Headings, 6-3-2 visual sep, 6-3-3 transfer of control.)
4. **Never invent a departure-vs-arrival conflict from fix names** — SID and STAR corridors are laterally separated by design; check the actual geometry / airspace attachments first.

## The SIDs from 2026-10-29 — CIFP 261029

Decoded 2026-10-14 from the CIFP 261029 `PD` records (cycle 2611, file dated 2026-10-07, effective
2026-10-29), fixes positioned from the `EA`, `PC` and VHF navaid records. **The cycle is the
citation**; when it rolls, regenerate this whole section and the deck's `SID_SET`/`SID_FIX` from
one pull, never hand-patch them (root `CLAUDE.md` §11).

```bash
curl -sL -o CIFP_261029.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_261029.zip
unzip -o CIFP_261029.zip IN_CIFP.txt FAACIFP18
grep -E "^K(MSP|STP|ANE|FCM|MIC)	SID" IN_CIFP.txt      # which field has which SID
grep "^SUSAP KMSPK3D" FAACIFP18                          # the legs
```

**The shape of the set — read this before the tables.**

- **Nine SIDs at MSP, every one RNAV, and none starts at the MSP VOR** — which CIFP 261029 codes as
  a **DME only** (`DHW`, no VOR; 261001 still coded `VDLW`). That is why every SID moved off it.
- **Every one begins at a first fix of its own, with an at-or-above crossing** — the climb-out to
  that first fix is not coded. Dispersal (an LC function, MSP 7110.26G §6-3-1) decides the first
  turn, as it always has.
- **HTDSH1 and SNOWZ1 are valid off every runway** — owner, 2026-10-18: *"the difference is that
  off of 17 there's the rnav segment to RUBRB then vector to join."* Off Runway 17 they fly heading
  **169.5** to **RUBRB at or above 3,500**, then vectors (`FM`) to join the common route; off any
  other runway they are vectored to join at the first fix, **ITZME** or **MANCY**, like the other
  seven. That Runway 17 segment is the only runway transition CIFP codes for them, and **this file
  read it as "Runway 17 only" until the owner said otherwise** — which also answers issue #61's
  questions about whether they are assigned (they are) and how an MSP departure goes southwest
  (SNOWZ1, off any runway).
- **KBREW and ZMBRO are names carried over, not routes.** KBREW1 starts at HRBEK (KBREW2 started
  at the GEP VOR) and transitions to KEETN (was FAR); ZMBRO1 starts at JEDET (ZMBRO7 at the MSP
  VOR) and transitions to BRIBE (was ODI).
- **Southwest off MSP is SNOWZ1** — the old ORSKY/SCHEP direction — off any runway. DUHCK1 goes
  that way too and is coded at the satellites alone.

### The SIDs, with their transitions

Fixes **inside 50 NM** are drawn on the scope; fixes out to 80 NM are listed here and held in the
deck's data table, which the direct-to list reads; **beyond →** they are named only. "≥" is the
at-or-above crossing CIFP codes at that fix.

| SID | Starts | Common route | Transitions | Coded at |
|---|---|---|---|---|
| **BITEZ1** | HHOBA ≥ 4,000 | HHOBA · BITEZ | **DKOTA**: SKITO · TICKK · HHCEE → DKOTA · **LEINY**: SKITO · TICKK · HHCEE → LEINY · **SMERF**: ZOGAP · PAGOZ → SMERF | MSP, ANE, FCM, STP |
| **BUNYN1** | JBUGG ≥ 4,000 | JBUGG · BUNYN | **DLH**: BAYBB → JAYYJ · DLH · **KVUSI**: GPERS → JERAH · KVUSI | MSP, ANE, FCM, STP |
| **HTDSH1** | ITZME ≥ 3,500 — off **17**: heading 169.5, RUBRB ≥ 3,500, vectors to join | ITZME · HTDSH | **ALO**: TOTTZ · CORDY · FOOLS → EXTEE · ALO · **BRIBE**: JEDET · ZMBRO → PEKTE · BRIBE · **OANNA**: TOTTZ · CORDY · FOOLS → ELMRE · OANNA · **OHHMY**: TOTTZ · CORDY · FOOLS → OHHMY · **ZZIPR**: TOTTZ · CORDY · FOOLS → ZZIPR | MSP only |
| **KBREW1** | HRBEK ≥ 5,000 | HRBEK · HOMUR · KBREW | **KEETN**: → KEETN | MSP, ANE, FCM, STP |
| **NRTHN1** | SIEDL ≥ 4,200 | SIEDL · NRTHN | **AROND**: PRRCH · WAHLI → CUSAY · ENNDD · AROND · **TTOWN**: PIIKE · DWIYT → WLSTN · TYTEL · TTOWN | MSP, ANE, FCM, STP |
| **SNOWZ1** | MANCY ≥ 4,000 — off **17**: heading 169.5, RUBRB ≥ 3,500, vectors to join | MANCY · SNOWZ | **DABOY**: SLUSH · PLOWW · PEDLN · HSTIN → YUPER · DABOY · **ZZEEE**: SLUSH · PLOWW · PEDLN · HSTIN → MDIAN · BBERD · ZZEEE · **ISTIQ**: SLALM · MOGLL · SLAYR → SMTHA · TEYOU · ISTIQ · **LLUKY**: SLALM · MOGLL · SLAYR → SMTHA · TEYOU · LLUKY · **SMTHA**: SLALM · MOGLL · SLAYR → SMTHA | MSP only |
| **SNUPE1** | PNUTZ ≥ 4,000 | PNUTZ · SNUPE | **DLL**: WDSTK → DLL | MSP, ANE, FCM, STP |
| **TOTTZ1** | HTDSH ≥ 3,900 | HTDSH · TOTTZ | **ALO**: CORDY · FOOLS → EXTEE · ALO · **FOOLS**: CORDY · FOOLS · **OANNA**: CORDY · FOOLS → ELMRE · OANNA · **OHHMY**: CORDY · FOOLS → OHHMY · **ZZIPR**: CORDY · FOOLS → ZZIPR | MSP, ANE, FCM, STP |
| **ZMBRO1** | JEDET ≥ 4,000 | JEDET · ZMBRO | **BRIBE**: → PEKTE · BRIBE | MSP, ANE, FCM, STP |
| **DUHCK1** | GGREY ≥ 4,000 | GGREY · DUHCK | **LLUKY**: MGHTY → GRRAT · DDOWN · LLUKY · **SBRNA**: MGHTY → IDEEA · MDKNG · SBRNA · **STIER**: MGHTY → GRRAT · DDOWN · STIER | **ANE, FCM, STP only** |

**Several transitions share one track inside 50 NM** — BITEZ1's DKOTA and LEINY part company
beyond TICKK (HHCEE, 52 NM, is past the limit); TOTTZ1's five and four of HTDSH1's beyond CORDY;
SNOWZ1's DABOY and ZZEEE beyond PEDLN, and its other three beyond SLAYR. KBREW1 ends at HOMUR. So the deck's 25 MSP entries draw as **14 tracks**, each
labelled with every transition on it. **The ones that leave through the Rochester arc**
(MSP 148.1–184.8, issue #59) are every track that runs down through CORDY to FOOLS — TOTTZ1, and
HTDSH1 except its BRIBE transition, which turns off at HTDSH for JEDET and leaves east of the arc.
Below 9,000 those go to Rochester, above it to Center.

### The fixes out to 80 NM

From the CIFP 261029 waypoint records. Bearing (true) and distance in NM are from the MSP DME,
N44 53 47.40 / W093 14 11.51 — the deck's `MSP0`.

| Fix | Lat | Lon | MSP | | Fix | Lat | Lon | MSP |
|---|---|---|---|---|---|---|---|---|
| MANCY | 44.80087 | −93.32491 | 213/6.9 | | ZOGAP | 45.11155 | −93.97213 | 292/33.8 |
| RUBRB | 44.78474 | −93.28356 | 197/7.0 | | JEDET | 44.46129 | −92.72794 | 140/34.0 |
| HHOBA | 44.94084 | −93.53213 | 282/12.8 | | HRBEK | 45.31453 | −93.80699 | 316/34.8 |
| ITZME | 44.68511 | −93.15697 | 165/13.1 | | TOTTZ | 44.32460 | −92.96879 | 162/36.2 |
| SIEDL | 45.10290 | −93.02852 | 035/15.2 | | TICKK | 45.00726 | −94.14382 | 280/39.1 |
| SNOWZ | 44.68823 | −93.44505 | 215/15.3 | | SNUPE | 44.57289 | −92.42757 | 119/39.6 |
| SLALM | 44.67744 | −93.56841 | 227/19.3 | | PAGOZ | 45.15386 | −94.14574 | 292/41.5 |
| *GGREY* | 44.62650 | −93.52541 | 217/20.3 | | GPERS | 45.65891 | −93.24655 | 359/45.7 |
| SLUSH | 44.58228 | −93.46341 | 207/21.2 | | *MGHTY* | 44.35583 | −93.99581 | 225/45.9 |
| JBUGG | 45.23941 | −93.03506 | 023/22.3 | | BAYBB | 45.64068 | −92.91708 | 017/46.6 |
| HTDSH | 44.55006 | −93.01758 | 156/22.8 | | DWIYT | 45.30338 | −92.28757 | 059/47.0 |
| BITEZ | 44.98201 | −93.75958 | 283/22.8 | | ZMBRO | 44.34166 | −92.44850 | 135/47.3 |
| NRTHN | 45.19717 | −92.85796 | 042/24.1 | | HOMUR | 45.41821 | −94.07681 | 311/47.4 |
| PNUTZ | 44.67544 | −92.64788 | 118/28.4 | | WDSTK | 44.50795 | −92.25673 | 119/47.8 |
| *DUHCK* | 44.50413 | −93.71264 | 221/31.1 | | PEDLN | 44.20266 | −93.80039 | 210/48.1 |
| BUNYN | 45.40763 | −93.05506 | 014/31.6 | | SLAYR | 44.41833 | −94.14806 | 234/48.3 |
| MOGLL | 44.58343 | −93.84229 | 234/31.9 | | WAHLI | 45.49710 | −92.43309 | 043/49.5 |
| PRRCH | 45.32063 | −92.75913 | 038/32.5 | | CORDY | 44.12372 | −92.82978 | 159/49.5 |
| PIIKE | 45.25188 | −92.65080 | 049/32.7 | | HHCEE | 45.02643 | −94.44979 | 279/52.1 |
| PLOWW | 44.41448 | −93.60777 | 209/33.0 | | HSTIN | 44.00222 | −93.96111 | 210/62.0 |
| SKITO | 44.99819 | −94.00346 | 281/33.1 | | KBREW | 45.58435 | −94.51478 | 307/68.0 |
| | | | | | FOOLS | 43.78283 | −92.59581 | 158/72.3 |

*Italic* fixes are DUHCK1's — satellite-only, so no MSP track passes them; the deck plots them
for departures off ANE, FCM and STP (issue #67). **The first fix beyond 80 NM on any MSP
transition is MDIAN (82.7) or JAYYJ (83.8);** nothing past the limit is plotted.

**DUHCK1 past MGHTY — named, not plotted** (CIFP 261029, MSP DME, decoded 2026-10-22). Every
transition runs GGREY → DUHCK → MGHTY, the last fix inside 50 NM, so the three share one mapped
track. After it: **LLUKY** MGHTY → GRRAT (96.9) → DDOWN (137.8) → LLUKY (271.2) · **SBRNA** MGHTY →
IDEEA (85.6) → MDKNG (119.6) → SBRNA (194.2) · **STIER** MGHTY → GRRAT → DDOWN → STIER (174.6).
The crossing at the start is GGREY **at or above 4,000** — the one the deck carries, as at every SID
in the set. The same records also hold a second altitude value, **18,000**, on GGREY and on the first
leg of each transition; this reference has not decoded that field for any SID in the set, so it is
recorded here and not read.

**Old names on new routes — and two of them MOVE.** HRBEK, HOMUR, DWIYT, JEDET, ZMBRO, CORDY and
PEDLN were on retired SIDs and sit at the same positions in CIFP 261029 (PEDLN is now coded as a
terminal waypoint rather than an en route one). **ZOGAP and PAGOZ keep their names and change
position:** 260903 codes them as MSP terminal waypoints at N45 05 17.00 W093 52 33.00 and N45 11
17.56 W094 17 15.85, where the retired SMERF7 used them; 261029 recodes them as en route waypoints
at **N45 06 41.59 W093 58 19.67** and **N45 09 13.88 W094 08 44.68** — about **4.3 NM** and **6.4 NM**
from where they were. A fix remembered from the old SMERF is in the wrong place on BITEZ1. And three
retired SID names are now fixes on new transitions: HSTIN, SLAYR and WLSTN.

## Routing rule (Michael, stated + LOA-anchored)

Clear direct to a **fix within 60 NM of the MSP DME** that's ahead of the aircraft on its SID (the fixes in the tables above). You'll **rarely** send a departure direct to **MSP** — not that it's prohibited, but it is the field itself, so "direct MSP" bends a climbing departure back over the top into the traffic behind it. Practical call, not a rule. *(Until 2026-10-29 this named the MSP, GEP and FGT VORs, which the retired SIDs started on; none of the new set does. The deck flags a direct to the field and says where the SID really begins.)*

**What the ZMP-M98 LOA actually requires (4.f):**

- Filed **6,000 and below** → cleared as filed, altitude for direction of flight.
- Filed **7,000 / 8,000** → on a heading or course to clear the MSP + satellite STAR arrival areas.
- Filed **9,000 and above** → M98 must establish them in the appropriate ZMP sector, clear of STAR areas, on the SID **or a heading to join the SID within 60 NM of the MSP DME** (non-SID-qualified: a Table 1 heading). This is the real basis for "route them to a fix ahead" — the 60 NM is the join limit; ZMP takes them beyond.
- Props requesting **12,000+** → climbed to or level at 12,000.
- M98 issues enroute clearance only when cleared **170 or below**.
- **Boundary:** M98 releases departures to ZMP at **25 NM from the MSP DME or leaving 11,000** — not a flat 40-mile ring.

**Voicing:** KBREW is *Kay-Brew* and ZMBRO *Zum-bro*, carried over. The other new names have **no
spoken form yet** — write them as-is (`claude_SID_TTS_Voicing.md`, root `CLAUDE.md` §8). The
revision number is said as a word: *BITEZ ONE departure*.

## Satellite departures — SID eligibility

- **STP, ANE, FCM — eight SIDs each in CIFP 261029, with identical legs:** BITEZ1, BUNYN1, DUHCK1,
  KBREW1, NRTHN1, SNUPE1, TOTTZ1, ZMBRO1 — the MSP set without HTDSH1 and SNOWZ1, plus DUHCK1.
- **MIC has no SIDs** in either cycle — MIC IFR departures are **radar-vectored** (tower/CD assigns heading + altitude; satellite/departure works the climb-out). (Michael, stated.)
- **LVN** has no SID in CIFP 261029 either; the outlying fields are not specified — confirm before assuming.
- **The owner's rule for the retired set** — *STP, ANE and FCM may fly the MSP SIDs except LEINY* —
  **does not carry over**, and the new set needs it restated (issue #61). (It already disagreed
  with CIFP once: 260903 coded SMERF at MSP only.)
- **The deck flies a satellite departure** (issue #67, 2026-10-22): the track starts at the field and
  runs the coded fixes — identical at the three fields, route types 5 and 6 only, so **no runway
  transition** — to the same 50 NM limit from MSP. A strip names a SID its field does not code
  (HTDSH1 or SNOWZ1 at a satellite, DUHCK1 at MSP) and is refused by name; Crystal is refused with
  its radar-vectored note, because the engine has no track for a vectored departure.
- **The release is ZMP-M98 LOA 4.c, measured from the MSP DME whatever field the aircraft left.** The
  paragraph says "departing aircraft" and names no field; the 25 NM and the 11,000 are the same.
- Related routing (ZMP-M98 LOA 4.f): satellite departures previously routed via the **DWN** SID now route **INUNE GENEO DKOTA**.

## Open question — which SID is preferred off Runway 17

**Not answered by any document, and the deck assumes nothing** (owner, 2026-10-22). HTDSH1 and SNOWZ1 are
both valid off every runway and fly the same coded segment off 17 (heading 169.5 to RUBRB ≥ 3,500, then
vectors to join). **The owner expects HTDSH1 to be preferred of the two when departing 17** — a feeling,
recorded as such, not a rule: the current SOP, tower order and LOAs rank neither, and the updated SOP and
LOA for the 2026-10-29 set are not out. It closes when one of them publishes a preference. Gap analysis
Part 6, item 7. Until then no choice here is a preference: the generator draws all nine alike and no
grading rule favours either SID.

## Gates — TABLED for the new set

**Which gate each 2026-10-29 SID exits through is not known yet** (owner, 2026-10-14), so the deck
carries every one as null and a departure gets **no scratchpad gate** — exactly what it always did
for a SID with no gate letter. The gates themselves are the facility's and do not change (below).
They will come from the revision of the owner's *M98 SIDS & Pointout Fix Indicators* chart, or from
the owner — **not from a bearing**, which is how the retired set's were first worked out and then
had to be confirmed on that chart.

**Dispersal, as the facility wrote it for the retired set** — MSP tower order §6-3-1, mirroring
MSP-M98 LOA 9.e: KBREW ~320°, WLSTN ~340°, COULT ~360° (MINNEAPOLIS Nine: FAR 320 / BRD-DLH-HYR-EAU-GRB 340 / DLL 360). **These name retired SIDs** and are kept as the facility's text until vZMP revises it (issue #61); the initial heading still follows dispersal, not the SID's direction.

## Facility text that names SIDs — read as written

**The LOA and tower-order paragraphs below are transcribed as written, and several name SIDs that
are retired on 2026-10-29** (WLSTN, COULT, KBREW, SCHEP, ORSKY, the MINNEAPOLIS NINE). vZMP has not
revised them (issue #61, item 8). They are the facility's words, not the current procedures — do not
read a retired name as the new SID in the same direction.

## 17/22 landing config — SID changes (ZMP-M98 LOA 5.a)
When MSP lands 17/22, most departure routes are unchanged **except**: WLSTN jets vectored **north of the AGUDE gate** to join WLSTN; WLSTN turboprops (or over EAU, ≥7,000) via **COULT to COULT, direct EAU**; DLH/EVM/RZN/HIB vectored **west of AGUDE** into Sector 6 on 020–040°; BRD into Sector 10 west of OLLEE on 290–310°; STP/ANE/MIC northbounds exit on 350–010°; anything filed 5,000/6,000 on a heading to clear the GOPHER + AGUDE STAR areas; KBREW may be cleared direct KBREW from south of the SID.

## Departure Dispersal Area — vertical ownership (MSP-M98 LOA 5.a) **[the DDA problem, quantified]**

The dispersal area is MSP tower's airspace, and these are its actual limits — the geometry behind every dispersal-area loss of separation:

- **Departure Dispersal Area: surface up to and including 7,000.**
- **Over the FCM and MIC satellite cutouts: 3,500 up to and including 7,000** — satellite keeps the floor below 3,500 there. That carve-out is the legal path under the dispersal area near those two fields, and only there.
- **Dispersal-area *extensions*: 4,000 up to and including 7,000.**
- **Runway 35-12 configuration ACDA cutout: surface up to and including 5,000.**
- **VFR transit (5.a.7):** VFR aircraft not on an instrument approach may cross the dispersal area **outside the Class B without coordination**; anything **loitering** (photo, tour, survey) is coordinated individually, with M98 keeping separation from MSP departures.
- Related (8.c/8.d): Departure/Satellite may **alter any MSP departure's initial heading** with separation ensured, and Departure may **climb departures initially assigned 5,000 or higher within the dispersal area**.

## Initial departure altitudes & seat routing (MSP-M98 LOA 8.h / MSP 7110.26G 3-2-3)

Decides both the altitude **and which M98 position works the aircraft**:

| Filed altitude | Jets | Turboprops | Piston |
|---|---|---|---|
| **9,000 or above** | 7,000 → **D/R/L** (Departure) | 5,000 → **D/R/L** | 4,000 → **E/G/K** (Satellite) |
| **8,000 or below** | 4,000 → **E/G/K** | 4,000 → **E/G/K** | 4,000 → **E/G/K** |

Low-filers and pistons off MSP belong to the **Satellite** seat at 4,000 — the N172ER shape starts here.

## Departure heading coordination — the full LOA 8.g set

- **Off 12L/R (any landing config):** "R" traffic tracking **on/north of 105°** → coordinate with "D"; "D" traffic tracking **south of 105°** → coordinate with "R". Same structure off **30L/R at the 300° line**.
- **Land 12s, depart 12s + 17:** FOD/ONL departures off 12L/R get a **230° heading with the turn at three miles** from the departure end; **3 miles-in-trail same-fix** across different runways; M98 has control for **left turns of "D" traffic off Runway 17** regardless of heading; max Runway 17 track **215°**; joint-use 12L/R track is **105°** (north of it → coordinate with "D", south → with "L").
- **Land 30s, depart 30s + 17:** simultaneous same-fix 17-and-30 departures = **3 miles-in-trail, no visual separation, no divergence** (unusual circumstances excepted); M98 has control for **right turns of "D" traffic off 17**; on 30/17 every Runway 17 departure tracks **no less than 170°**.
- **Runway 17 same-fix spacing (landing 12s or 30s):** 3 miles-in-trail **jet-to-jet / turboprop-to-turboprop, no divergence**; under unusual circumstances divergence is allowed if the third aircraft is 3 miles-in-trail of the second.
- **CRO (land 30s + 35, depart 30s):** turboprops on **ODI and RST filed 11,000 or above** → **260° track, treated as one fix, 3 miles-in-trail, no visual separation**.
- **Land 35, depart 12s:** max departure track **135°** from the Runway 12R departure end; **non-turbojet Sector 8 traffic (FOD, ONL) turned right is assigned to "E"**; SCHEP/ORSKY turbojets track **at or north of 105°**.

## Non-advertised runway departures (MSP-M98 LOA 8.i)

- **Runway 4:** coordinate with **G Satellite** — assign **4,000, heading 040, frequency 121.2**; MSP tower also coordinates with STP tower.
- **Runway 22:** assign a **dispersal-area heading at 3,000**; once inside the dispersal area, climb per the 8.h table.

## The departure gates, complete (M98 7110.26A 3-3a — APO scratchpad letters)

The full gate set M98 files against. **The gates are the facility's and do not change with the
SIDs**; which gate each new SID uses is tabled (above):

**E** = EAU · **D** = DLL · **N** = ODI · **B** = BRD/DLH · **R** = RST · **F** = FAR · **A** = ABR · **O** = ONL/FOD.

Scratchpad form: gate letter + two-digit altitude in thousands ("**B12**" = BRD/DLH gate, assigned 12,000); aircraft tagged **STC or MKT are presumed descending to 4,000** unless the altitude field says otherwise.

## Non-SID headings into ZMP — Table 1 values (ZMP-M98 LOA)

Previously cited by name only; the actual bands:

| Receiving sector | Position relative to the STARs | Heading band |
|---|---|---|
| Sector 10 | west of GEP/BAINY | **290°–300°** |
| Sector 10 | east of GEP/BAINY | **350°–020°** |
| Sector 09 | north of ENCEE | **265°–285°** |
| Sector 08 | south of TORGY | **210°–240°** |
| Sector 07 | east of KASPR/BLUEM | **140°–160°** |
| RWA | south of KKILR | **100°–130°** |
| Sector 06 | north of AGUDE | **040°–060°** |

## Control for turns — both directions (M98 7110.26A 3-1 / ZMP-M98 LOA 4.b–4.c)

- **Intrafacility (SOP 3-1):** after an accepted handoff, the receiving controller in communication may turn the aircraft **up to 30° from the assigned heading inside the previous controller's airspace**, provided it stays within that airspace.
- **ZMP → M98 (LOA 4.b):** ZMP releases **descent and turns ±30°** once the aircraft is within **10 NM of the boundary** — with M98 owning any resulting point-outs to affected ZMP sectors or RST approach.
- **M98 → ZMP (LOA 4.a/4.c/4.d):** deliver **at least 5 NM constant-or-increasing** when vectored to the same fix on similar tracks; the 25 DME / leaving 11,000 release stands; 7110.65 5-5-4 minima on the transition apply only to **diverging** courses, keeping comms with at least one aircraft until 3 NM lateral exists and divergence is ensured.

## Midnight departures (ZMP-M98 LOA §5, coordinated 2230–0530 local)

Clear departures **via the first fix in the route**, point them out to any affected Center position, and climb **turboprops/props to 17,000** (or lower on request). The whole TRACON is collapsed onto **124.7** in this regime — see the Config reference for the arrival side.

## MSP9, the radar-vector departure — its charted fixes and navaids (MSP ATCT 7110.26G 6-3-1.a.4; CIFP 261001)

**What the order says.** Turbojets off runways 30L/30R who do not file a SID get the Minneapolis Nine
(MSP9) or current version, and MSP9 is flown to an **initial fix by direction**
(*MSP ATCT 7110.26G* paragraph 6-3-1.a.4, `source-docs/txt/MSP_ATCT_7110_26G.txt`). Unable a SID, they get
MSP9 to the first filed fix, which must be inside ZMP airspace; unable both, radar vectors to the first
filed fix. The order names the initial fixes and a track for each:

| Initial track | Fix | What CIFP 261001 holds | Latitude, longitude (CIFP, decimal) |
|---|---|---|---|
| 320 | Fargo (FAR) | navaid record | 46.75334, -96.85132 |
| 340 | Brainerd (BRNRD) | enroute waypoint record | 46.34828, -94.02598 |
| 340 | Duluth (DLH) | navaid record | 46.80216, -92.20287 |
| 340 | Hayward (HYR) | navaid record | 46.01901, -91.44640 |
| 340 | Eau Claire (EAU) | navaid record | 44.89767, -91.47854 |
| 340 | Green Bay (GRB) | navaid record | 44.55516, -88.19486 |
| 360 | Dells (DLL) | navaid record | 43.55084, -89.76362 |

The tracks and the fixes are from the order; the coordinates are the CIFP 261001 records of those
identifiers (28-day cycle, `claude_CIFP_Source_Reference.md`), converted from degrees-minutes-seconds
to five decimal places. A coordinate is not a procedure: it places the fix and says nothing about how
MSP9 reaches it.

**What is not in the data, written down so it is not rediscovered.**

- **MSP9 is not in CIFP 261001.** KMSP codes COULT7, HSTIN6, KBREW2, LEINY6, MEDOW5, ORSKY3, RST1, SCHEP1,
  SLAYR4, SMERF7, WLSTN7 and ZMBRO7, and **no route type T (vector SID)** — checked and empty. The order
  and the owner's gap analysis (`claude_M98_MD_Gap_Analysis.md`, the 3-2-5 frequency row) are the only
  sources, so what MSP9 flies before its initial fix has no coded answer.
- **The tower reference writes Brainerd as BRD** (`claude_MSP_Tower_Reference.md`, dispersal tracks);
  the order and the gap analysis write **BRNRD**, and BRNRD is the identifier CIFP carries. Preserved as
  written, not corrected; BRD is the airport identifier.
- **The M98 deck offers MSP9 as a stand-in (issue #77, 2026-10-28), and it is deliberately less than
  a procedure.** `MSP9` and `MSP9_DEPS` hold the seven initial fixes and the order's track for each, as
  departures keyed `MSP9.FAR` through `MSP9.DLL`. They sit **beside** `SID_SET` and `DEPS`, not in them,
  because those are built from coded CIFP legs and this has none. The aircraft flies a **straight line
  from the field on the order's track** (320, 340 or 360 — 360 is plotted north) to the 50 NM every SID
  is drawn to. **That line is not the way to the fix**, and the table above shows why: measured from
  the MSP VOR on the deck's flat plane, the seven fixes lie at about 306 (FAR), 339 (BRNRD), 021 (DLH),
  049 (HYR), 090 (EAU), 096 (GRB) and 119 (DLL), against tracks of 320, 340 and 360. The track is the
  dispersal heading the tower assigns for the initial fix (6-3-1.a.4), and **where the aircraft turns
  toward the fix is not published**, so it is neither flown nor drawn. The deck carries the seven
  coordinates above for this comparison only; no fix is plotted on the scope.
  The deck offers it at KMSP only and off runways 30L and 30R only (6-3-1.a.4); any other runway, or a
  satellite field, is refused naming the paragraph, a strip with no runway stated is warned, and a
  turboprop is warned (3-2-4.b-c and 6-3-1.a call it a turbojet departure). The strip files the **first
  fix as its route and no procedure name**, since 3-2-4.b says MSP9 does not need to be amended into the
  route string. It takes **no gate and no scratchpad** (the gate table is tabled for every SID), and the
  spoken form is the order's own words, **"Minneapolis Nine"** — `claude_SID_TTS_Voicing.md` has no entry
  for it. The climb altitude is the trainee's, as for every departure. Tests: the MSP9 block of
  `smoke-test.mjs`. **Not done:** the generator never draws MSP9, and radar vectors to the first filed
  fix (the order's last fallback) are not modelled.
- **Open on MSP9, for the owner:** how a controller says it on the frequency (the deck says
  "Minneapolis Nine" as the order writes it); whether 12L and 12R use anything like it (the order gives it
  to 30L and 30R only, and the deck refuses elsewhere); and the climb altitude it is assigned.
- **Other fields.** Of the fields this repository works, only Salt Lake City (SLC4) and Boise (BOI3) code
  a radar-vector departure in CIFP 261001; both fly in the shared player as a stand-in line to a charted
  fix (`claude_Fly_Block_Reference.md`). Chicago O'Hare and Midway, Omaha and the Indiana, Kentucky and Ohio
  fields code no vector SID. **ORD9 appears in no document in this tree and no CIFP record**, so it is not
  carried; if it exists, the owner's chart or order is the source.

## The retired set — in force through 2026-10-28

**CIFP 260903 and 261001 code twelve SIDs at KMSP:** COULT7, HSTIN6, KBREW2, LEINY6, MEDOW5,
ORSKY3, RST1, SCHEP1, SLAYR4, SMERF7, WLSTN7 and ZMBRO7.

- **Nine were assignable** — COULT, KBREW, LEINY, ORSKY, RST, SCHEP, SMERF, WLSTN, ZMBRO — each
  starting at the MSP VOR, KBREW through GEP and RST through FGT.
- **HSTIN6, MEDOW5 and SLAYR4, all Runway 17 only, were technically valid and never assigned** —
  *"a flight plan filing one is auto-corrected off it, so they never reach a controller"* (Michael,
  2026-09-07).
- **ANE, FCM and STP had seven** — the nine less LEINY and SMERF.
- **Gates:** WLSTN E · COULT D · ZMBRO N · RST R · ORSKY and SCHEP O · KBREW F · LEINY and SMERF none
  — derived from bearings, confirmed on the owner's chart.

**The deck stopped carrying this set on 2026-10-14**; a drill saved on it is refused rather than
flown on something else. The full reference for it — the direct-able fixes per gate, the fix
coordinates as provided, the twelve-versus-nine ruling and the three never-assigned SIDs' legs — is
this file at commit `15cedb9`.
