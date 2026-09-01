# MSP STAR Reference (Arrivals)

Companion to `claude/MSP_SID_Reference.md`. Built from Michael's lat/long fix data; positions are great-circle from the MSP VOR (N44 53.79 / W093 14.19). FOR SIMULATION USE.

## Source self-check — LOAs + SOP (read before quoting a number in a drill)

This doc is a convenience layer over the primary sources — a map, not the territory. Before stating any value here as fact in a control decision (crossing altitude, speed, spacing, runway), confirm it against the governing document and name which one:

- **RNAV STAR plate (current AIRAC / Navigraph)** → the descend-via ladder (per-fix altitude/speed).
- **ZMP-M98 LOA** → runway transitions (Table 2), boundary + "Knock It Off" (Table 3), conventional-STAR crossings (Table 4), satellite altitudes, comms-transfer fixes.
- **MSP-M98 LOA** → tower/TRACON final-approach spacing, CRO (30s/35), dispersal tracks, runway-use, go-arounds.
- **M98 7110.26A (TRACON SOP)** → position duties (Feeder assigns runway + starts crossovers; Arrival vectors/sequences/clears), ACDA splits, feeder→arrival handoff floors, crossover mechanics, APO, noise vectoring.
- **MSP 7110.26G (tower order)** → LC initial departure headings (§6-3-1, mirrors LOA 9.e), CRO / ADW / VRIP tower side, runway crossings.

**Tie-breakers:** where a *satellite/conventional* crossing differs **plate vs LOA**, use the **LOA (Table 4)** for drills — with ZMP staffed that's what gets issued (the mainline RNAV descend-via ladder is plate-only, so no tie there). Any value driving an **inside-M98** action — handoff floor, ACDA descent, airspace ownership, crossover altitude — is an **SOP** fact; verify there, not in the LOA.

If two sources disagree, **name the conflict — do not silently pick one.** Traps this doc has already tripped on:

1. The **5 NM / 170 kt** final + matched-set/ghost rules are **CRO (30s/35)-only** in the MSP-M98 LOA — not an automatic plain-30s standard. Plain 30L/30R = 7110.65 separation + the always-on 4-mile final (9.d) and 2-mile ATAP (7.g).
2. Descend-via gate altitudes (**≥N**, plate) vs **Knock It Off** (**=N**, Table 3 — override only when the OPD is discontinued or landing 4/22/17) are **different regimes**; don't mix them.
3. Satellite crossings change by config: **Table 4** is normal; the **17/22** config has its own set and **prohibits KKILR/WILDD**.
4. ZMP assigns the **transition** (Table 2); **M98 assigns the landing runway** — they differ, and that gap is where crossovers/balancing live. The transition is not the landing runway.
5. **Never invent a departure-vs-arrival conflict from fix names.** SID and STAR corridors are laterally separated by design; check the actual geometry / airspace attachments before calling a conflict.
6. **Position matters (SOP 2-4 / 2-5).** The **Feeder** assigns the landing runway and starts crossovers; **Arrival** vectors, sequences, and clears the approach. Don't hand a Feeder action to Arrival or vice-versa. And on 30s/12s the ACDA splits at the localizer — **30R is the north parallel, 30L the south** (4-2a).

## Structure (Michael, stated)

Arrivals enter on a **four-cornerpost** structure (N / E / S / W) and merge onto **common runway-transition tails** — the tail fixes are the sequencing points where streams from different directions line up for the same runway. The STARs keep arrivals high — roughly an **8,000 shelf** through the mid-STAR, stepping to 7,000 only at the inner tails — which structurally separates them from departures climbing underneath. **GEP VOR is a shared hub** — it feeds both MSP and the satellite fields (KSTP, KANE, KMIC, KFCM, KLVN); satellite arrivals funnel to GEP and get fanned out by destination. On the tower end there's no full radar handoff: MSP quick-looks the Arrival data block and takes **control at the FAF** (instrument) / airspace boundary (visual) with **comms at 6–8 mi** (MSP-M98 LOA 7.b/7.e/7.f). M98's arrival and departure boundaries are LOA-anchored in the next section, not a flat 40-mile ring.

**Runway roles (charted STAR note):** *"EXPECT 'descend via' clearance and runway transition assignment by Center. Approach will assign landing runway."* So ZMP assigns the descend-via and the runway **transition** (Table 2); M98/Approach assigns the actual **landing runway**. The transition lines the aircraft up; the landing-runway call is M98's — which is where crossovers and runway balancing live. **Transition ≠ landing runway.**

## ZMP runway-transition assignments (ZMP-M98 LOA Table 2)

ZMP's "descend via" must name a runway transition, normally assigned per this table. **This is the transition the crossing ladder follows, not necessarily the landing runway — M98 sets the landing runway and rebalances.**

| Config | BAINY | MUSCL | KKILR | NITZR | BLUEM | TORGY |
|---|---|---|---|---|---|---|
| 12 / 12-17 | 12L | 12L | 12R | 12R | 12R | 12R |
| 30 / 30-17 | 30R | 30R | 30L | 30L | 30L | 30L |
| 30/35 | 30R | 30R | 30L¹ | 30L¹ | 30L | 30L |
| 17/22 | 17 | 22 | N/A | 22 | 22 | 17 |

¹ M98/ZMP CIC/TMU collaborate on which get the Runway 35 transition. **Heavy jets → always the 12R/30L transition (Table 2(c)), regardless of config.** Consequence in a plain-30 config: the natural feed is **30R = BAINY + MUSCL, 30L = KKILR + NITZR + BLUEM + TORGY + all heavies** (2 streams vs 4) — M98 balances by crossing bodies over to 30R. BAINY/TORGY have separate 30L vs 30R tails (real lateral reroute to switch); KKILR/NITZR/BLUEM/MUSCL ride one tail feeding both parallels (clean runway flip).

**ZMP→M98 arrival comms transfer** (no later than, per the RNAV STAR procedures): TORGY→**OFSON** · BAINY→**LUCCY** · MUSCL→**BAYKS** · KKILR→**KKILR** · BLUEM→**BLUEM** · NITZR→**NITZR** (~40–51 NM out). **Departures** release the other way — M98 → ZMP at **25 NM from the MSP DME or leaving 11,000** (ZMP-M98 LOA 4.c).

**Who does what inside M98 (SOP 2-1/2-4/2-5):** **Feeder** (I/H) assigns the landing runway and initiates crossovers; **Arrival** (N/S, plus J on 17/35) vectors, sequences, and issues the approach clearance; **Departure** (D/R/L) and **Satellite** (E/G/K) work the rest. ACDA split on 30s/12s: **North Arrival** north of the 12L/30R localizer, **South Arrival** south of the 12R/30L localizer — so **30R is the north parallel, 30L the south**. That's why heavies (→30L) land the south side, and a KKILR/east arrival crossed to 30L is handed to 'S' on ~220° (SOP 4-5c example). **Combining order (SOP 2-1):** M98 collapses to **H** (South Feeder) as the base — one controller working all of M98 is on H — and positions open in the order **H → R → N → S** (**R** = combined Departure, **N** = combined MSP Final, **S** = South Final; **E** = combined Satellite, E+G+K). The single/base radar position is **H**, not a departure or approach frequency.

## Cornerposts & entry gates (from MSP VOR)

- **North** — BAINY (BAINY 55 NM), GEP (GOLLF 55 NM)
- **East** — KKILR (KKILR 45 NM), MUSCL (BAYKS 44 NM), AGUDE (AGUDE 38 NM, satellite)
- **South** — BLUEM (BLUEM 43 NM), KASPR (KASPR 56 NM), NITZR (NITZR 44 NM), TWOLF (TWOLF 96 NM, satellite)
- **West** — TORGY (TORGY 51 NM), ENCEE (ENCEE 96 NM, satellite)

## Runway-transition merge tails (sequencing points)

Where each stream lines up for a given runway (tail fixes, outer→threshold):

- **30L:** MAUER · LEDRZ (from BAINY, TORGY)
- **30R:** OSMOH (from BAINY, TORGY)
- **30L/30R:** CANDD · HAPTN (from BLUEM, NITZR)
- **12L:** CMMOE · FSCOT (from BLUEM, KKILR, MUSCL, NITZR)
- **12R & 35:** GREAK · TIETN (from BLUEM, KKILR, MUSCL, NITZR)
- **35 (N/W streams):** BRNVL · LISEL (from BAINY, TORGY)
- **35 (S stream):** DNDIS · JAMEZ (from BLUEM); GDNEE · NNEWW (from NITZR)
- **12L/12R (BAINY):** OGLVE · KAYQU
- **12L/12R (TORGY):** SPUKI · KRUGG
- **30L/30R (KKILR):** STUWE · GEEQU
- **30L/30R (MUSCL):** KROIX · TRTEL

## Satellite STARs (to the GEP hub / south gate)

- **AGUDE** — from the East, terminates on GEP VOR.
- **ENCEE** — from the West (~96 NM), terminates on GEP VOR.
- **GEP** — the hub arm (GOLLF · OLLEE · SAUGR · GEP); serves both MSP and satellites.
- **TWOLF** — from the South (~96 NM), terminates at KEWTY (feeds the southern satellites; does not route to GEP).

## Satellite airports (primary five — published FAA reference points)

Shown in the flow map's Satellite view. ARPs verified against OpenNav; distances/directions from the MSP VOR.

- **KSTP** St. Paul Downtown / Holman Field — N44 56.07 / W093 03.60 (~8 NM ENE)
- **KANE** Anoka County–Blaine (Janes Field) — N45 08.70 / W093 12.68 (~15 NM N)
- **KMIC** Crystal — N45 03.72 / W093 21.24 (~11 NM NW)
- **KFCM** Flying Cloud — N44 49.63 / W093 27.43 (~10 NM SW)
- **KLVN** Airlake — N44 37.67 / W093 13.69 (~16 NM S)

## Altitude & speed constraints

The per-fix "descend via" ladder (each fix's altitude window + speed) is printed on the **RNAV STAR plates — ZMP-M98 LOA Attachments D-1 through D-11 — and is not reproduced in the LOAs.** Everything below is the LOA/SOP structure *around* that ladder. To place the published windows on each fix, the plate data must be supplied.

**Boundary & speed (ZMP-M98 LOA)**
- Cross the M98 boundary at the **published STAR speed / 280 kts** unless coordinated (Table 3, note 1).
- Any speed off the published RNAV STAR speed must be verbally coordinated by ZMP (except TMU initiatives).
- ZMP Sector 7 delivers **≥5 NM in-trail on the same STAR, 7 NM staggered on parallel STARs.**

**"Knock It Off" override crossings — ZMP-M98 LOA Table 3** (landing 4 / 22 / 17 / 17-22, whenever the OPD is discontinued, or at individual gates as needed — replaces the descend-via):
- MUSCL — cross BAYKS at 12,000
- KKILR — cross HUGGI at 10,000
- BLUEM — cross HHAMR at 10,000
- NITZR — cross WRSAW at 11,000
- TORGY — cross OFSON at 11,000
- BAINY — cross LUCCY at 11,000

On the **Runway 30/17** config, NITZR (WRSAW 11,000) and BLUEM (HHAMR 10,000) are *always* Knock-It-Off — no descend via, runway transition only.

**Conventional (non-RNAV) STAR crossings — ZMP-M98 LOA Table 4**
- MSP jets (GEP / KASPR): OLLEE 11,000; DELZY 10,000.
- MSP turboprops (GEP): OLLEE 9,000 landing 30s/30-35 (7,000 landing 12s; 5,000 landing 17).
- Satellite jets (AGUDE / ENCEE / GEP / TWOLF): AGUDE 8,000; RIXIE 8,000; OLLEE 7,000 (6,000 landing 17); TRGET 7,000.
- Satellite turboprops: AGUDE 6,000; RIXIE 7,000; OLLEE 7,000 (5,000 landing 17); TRGET 7,000.

**Final-approach spacing & speed — MSP-M98 LOA**
*Caveat: the 5 NM / 170 kt and matched-set/ghost rules live in the LOA's **CRO (30s/35) section 7.i(3)** — they are the converging-ops delivery standard, not an automatic plain-30s rule (see LOA self-check, trap 1).*
- **CRO (30s/35), para (g):** spacing to 30L/30R **no less than 5 NM at touchdown, 170 kts or less** assigned airspeed.
- **CRO para (f):** 30R as close to **1 NM behind** 30L as practicable (para (d): "balanced = matched sets").
- **CRO para (e):** 35 arrival within **0.5 NM of the 30L ghost** when 30L is at a 2-mile final; if no 30L ghost, **5 NM in-trail at 170 kts**.
- **Para (j) — 35 the only advertised runway:** reduce to **2.5 NM in-trail** within 10 NM.
- **Always-on 30L/R (not CRO):** vector 30L/30R arrivals south of the 30L localizer to **at least a 4-mile final** (noise, para 9.d); anyone turning inside the FAF joins **at/outside a 2-mile final** (ATAP, para 7.g). Otherwise plain-30s in-trail is 7110.65 radar/wake.

**Inside M98 — descent floors & handoff altitudes — M98 7110.26**
- Vector arrivals **at/above 4,000** until glidepath intercept (§4-8, noise).
- Feeder→Arrival handoff floors (SOP 4-4c): **30s** near 7,000 / far 8,000; **12s** near 7,000 / far 8,000; **4/22** near 8,000 / far 9,000; **17** KKILR & MUSCL 8,000, TORGY/NITZR/BLUEM 9,000, BAINY straight-in; **35** NITZR & BLUEM straight-in, TORGY 8,000, BAINY/KKILR/MUSCL 9,000.
- **ACDA shelves** delegated to Arrival at 6,000; Area F (30/17) to 6,000 via P-ACP.
- **APO to 3,000** in the ACDA when tagged MSP, within 20 NM, ≤90° to the FAC, and not crossing through / turning off the final.
- Crossover: near-gate 9,000 with a heading aimed at the 25-mile ring; far-gate comm transferred no later than 15 NM.
- *Technique (M98 Notes, not a rule):* hold MSP landers at 4,000 to the 10-mile ring to stay in the Bravo; 3,000 only as needed.

**Satellite-specific altitudes — ZMP-M98 LOA**
- FCM/LVN south of RGK, direct FGT direct destination: **4,000** landing 30s/30-17/30-35 (4,000 or 6,000 other configs).
- FCM/LVN from ZMP Sectors 08/09: direct destination at **5,000** (or via TWOLF / ENCEE).
- FCM from ZMP Sector 10: direct FCM west of the GEP gate at/below **5,000**.
- STP/ANE/FCM over BITLR: direct GEP, cross BITLR at **6,000**.
- All piston aircraft terminating in M98: enter satellite airspace **at/below 6,000**.
- Aircraft **landing at STC/MKT** (leaving M98 for ZMP): at/descending to **4,000** (3g(15)). Reverse case — **STC/MKT departures inbound to MSP/satellites** enter M98 at **5,000** (3g(11)/(12)).
- 17/22 landing config: turboprops cross OLLEE 5,000 / TWINZ 6,000; GEP-satellite jets cross OLLEE 6,000 (turboprops 5,000); AGUDE-satellite jets cross AGUDE 6,000 (turboprops 5,000).

## Published crossing restrictions (current AIRAC / Navigraph)

**Verified by Michael against the current AIRAC plates (Navigraph)** — the sim is the current real-world revision, no version gap. Notation: **≥N** = at or above N,000 · **N** = cross at N,000 · **a–b** = cross-between window · **/nnn** = speed (kt) · a fix with no number = no published crossing (lateral point only). Shared fixes (common segments + merge tails) carry the same restriction on every STAR that feeds them — the one exception is **SAVVG**.

**Shape:** gate ~10–15k / 280 → 10k / 250 → 9k → 8k shelf tails → 7k close in. Only the key fixes are restricted; blanks between are lateral points.

**By arrival & runway transition** (fix — altitude in thousands / speed):

*BAINY* — common **BAINY ≥15/280 · LUCCY ≥11/280 · SAUGR**:
- **→ 4/17/22/30R:** BAINY ≥15/280 · LUCCY ≥11/280 · SAUGR · GEP ≥10/250 · PRRPL ≥9 · OSMOH 8/210
- **→ 12L/12R:** BAINY ≥15/280 · LUCCY ≥11/280 · SAUGR · OGLVE ≥8 · KAYQU 7/210
- **→ 35:** BAINY ≥15/280 · LUCCY ≥11/280 · SAUGR · GEP ≥10/250 · PRRPL ≥9 · BRNVL 8/210 · LISEL 8/210
- **→ 30L:** BAINY ≥15/280 · LUCCY ≥11/280 · SAUGR · GEP ≥10/250 · PRRPL ≥9 · MAUER 8/210 · LEDRZ 8/210

*BLUEM* — common **BLUEM ≥10/280 · HHAMR ≥10/280 · FARBO**:
- **→ 4/22/17/12R:** BLUEM ≥10/280 · HHAMR ≥10/280 · FARBO · ELLKO ≥10/250 · SAVVG 9 · GREAK 8/230 · TIETN 8/230
- **→ 12L:** BLUEM ≥10/280 · HHAMR ≥10/280 · FARBO · ELLKO ≥10/250 · SAVVG 9 · CMMOE 8/230 · FSCOT 8/230
- **→ 35:** BLUEM ≥10/280 · HHAMR ≥10/280 · FARBO · DNDIS 9/230 · JAMEZ ≥7/210
- **→ 30L/30R:** BLUEM ≥10/280 · HHAMR ≥10/280 · FARBO · NOFLD 8–9/250 · CANDD 7/230 · HAPTN 7/210

*KKILR* — common **KKILR ≥12/280 · HUGGI ≥10/280 · KRISP**:
- **→ 30L/30R:** KKILR ≥12/280 · HUGGI ≥10/280 · KRISP · STUWE 7 · GEEQU 7/210
- **→ 12R/35:** KKILR ≥12/280 · HUGGI ≥10/280 · KRISP · AFTYN ≥10/250 · JONZY ≥9 · GREAK 8/230 · TIETN 8/230
- **→ 12L/4/22/17:** KKILR ≥12/280 · HUGGI ≥10/280 · KRISP · AFTYN ≥10/250 · COOBA ≥9 · CMMOE 8/230 · FSCOT 8/230

*MUSCL* — common **BAYKS ≥12/280 · WOLVS**:
- **→ 30L/30R:** BAYKS ≥12/280 · WOLVS · LKLND ≥8 · KROIX 7/230 · TRTEL 7/210
- **→ 12L/4/22/17:** BAYKS ≥12/280 · WOLVS · LOOON ≥11 · WDBRY ≥10/250 · ZASKY ≥9 · CMMOE 8/230 · FSCOT 8/230
- **→ 12R/35:** BAYKS ≥12/280 · WOLVS · LOOON ≥11 · WDBRY ≥10/250 · ZASKY ≥9 · GREAK 8/230 · TIETN 8/230

*NITZR* — common **NITZR ≥11/280 · WRSAW ≥11/280 · DAHRL**:
- **→ 35:** NITZR ≥11/280 · WRSAW ≥11/280 · DAHRL · SHILD 9/230 · GDNEE · NNEWW 7
- **→ 30L/30R:** NITZR ≥11/280 · WRSAW ≥11/280 · DAHRL · AANAH 10/250 · WBSTR 8/250 · CANDD 7/230 · HAPTN 7/210
- **→ 12R/4/22/17:** NITZR ≥11/280 · WRSAW ≥11/280 · DAHRL · GDNEE · ELLKO ≥10/250 · **SAVVG 10** · GREAK 8/230 · TIETN 8/230
- **→ 12L:** NITZR ≥11/280 · WRSAW ≥11/280 · DAHRL · GDNEE · ELLKO ≥10/250 · **SAVVG 10** · CMMOE 8/230 · FSCOT 8/230

*TORGY* — common **TORGY ≥13/280 · OFSON ≥11/280 · HMBRG ≥10/280 · CONIA**:
- **→ 12L/12R:** TORGY ≥13/280 · OFSON ≥11/280 · HMBRG ≥10/280 · CONIA · SPUKI 7/230 · KRUGG 7/210
- **→ 30R:** TORGY ≥13/280 · OFSON ≥11/280 · HMBRG ≥10/280 · CONIA · JAEDN ≥10/250 · HDEEE ≥9 · WILKN 8/210 · OSMOH 8/210
- **→ 4/17/22/30L:** TORGY ≥13/280 · OFSON ≥11/280 · HMBRG ≥10/280 · CONIA · JAEDN ≥10/250 · HDEEE ≥9 · MAUER 8/210 · LEDRZ 8/210
- **→ 35:** TORGY ≥13/280 · OFSON ≥11/280 · HMBRG ≥10/280 · CONIA · JAEDN ≥10/250 · HDEEE ≥9 · BRNVL 8/210 · LISEL 8/210

**Notes:** *HUGGI and HMBRG are "280 kt or slower" caps* (not a hard 280). **SAVVG is the only arrival-specific fix — 9 on BLUEM, 10 on NITZR** — read it off the arrival the aircraft is on, not the fix.

**Unrestricted (no crossing):** SAUGR · FARBO · KRISP · WOLVS · CONIA · DAHRL · GDNEE, plus the other lateral-only points. (HHAMR is now a gate crossing, not blank.)

**GEP (GOPHER ONE) & KASPR (KASPR SEVEN)** — conventional, radar-vectored, "Expect" altitudes; hard crossings are the LOA Table 4 values above (jets OLLEE 11,000 / DELZY 10,000).

**Satellite STARs (under Flying Cloud; low, under the shelf)** — *normal-config values = ZMP-M98 LOA Table 4; the 17/22 config uses the separate set above:*
- **AGUDE FIVE** — cross AGUDE **8,000 jets / 6,000 turboprops** (matches Table 4).
- **ENCEE THREE** — only crossing is RIXIE **8,000 jets / 7,000 turboprops** (matches LOA Table 4; the earlier 6,000 was a slip).
- **TWOLF FOUR** — TRGET **cross 7,000** (LOA Table 4, jets & turboprops — the drill default with ZMP staffed; the plate shows a 7,000–8,000 window); KEWTY **5,000** (plate value, not in the LOA).
- **17/22 config exception:** KKILR/WILDD arrivals are **prohibited entirely** (ZMP-M98 LOA 5.b(3)); AGUDE→**6,000 jets / 5,000 turboprops**, GEP OLLEE→**6,000 jets / 5,000 turboprops**, turboprops cross TWINZ 6,000; AGUDE same-airport stacks not authorized.

## Full fix coordinates (as provided)

- **BAINY 4/17/22/30R**: BAINY N45 45.22/W093 41.97 · LUCCY N45 35.07/W093 36.54 · SAUGR N45 20.91/W093 28.87 · GEP N45 08.74/W093 22.39 · PRRPL N45 03.14/W093 18.88 · OSMOH N44 57.83/W093 06.57
- **BAINY 12L/12R**: BAINY N45 45.22/W093 41.97 · LUCCY N45 35.07/W093 36.54 · SAUGR N45 20.91/W093 28.87 · OGLVE N45 18.89/W093 28.92 · KAYQU N45 10.80/W093 29.16
- **BAINY 35**: BAINY N45 45.22/W093 41.97 · LUCCY N45 35.07/W093 36.54 · SAUGR N45 20.91/W093 28.87 · GEP N45 08.74/W093 22.39 · PRRPL N45 03.14/W093 18.88 · BRNVL N44 48.27/W093 18.99 · LISEL N44 46.09/W093 18.93
- **BAINY 30L**: BAINY N45 45.22/W093 41.97 · LUCCY N45 35.07/W093 36.54 · SAUGR N45 20.91/W093 28.87 · GEP N45 08.74/W093 22.39 · PRRPL N45 03.14/W093 18.88 · MAUER N44 46.90/W093 15.86 · LEDRZ N44 45.34/W093 12.26
- **GEP ALL+sat**: GOLLF N45 45.22/W093 41.97 · OLLEE N45 32.13/W093 34.89 · SAUGR N45 20.91/W093 28.87 · GEP N45 08.74/W093 22.39
- **BLUEM 4/22/17/12R**: BLUEM N44 10.88/W093 13.43 · HHAMR N44 17.06/W093 12.86 · FARBO N44 22.47/W093 12.44 · ELLKO N44 35.71/W093 12.44 · SAVVG N44 41.50/W093 13.16 · GREAK N44 48.32/W093 19.08 · TIETN N44 49.49/W093 21.78
- **BLUEM 12L**: BLUEM N44 10.88/W093 13.43 · HHAMR N44 17.06/W093 12.86 · FARBO N44 22.47/W093 12.44 · ELLKO N44 35.71/W093 12.44 · SAVVG N44 41.50/W093 13.16 · CMMOE N44 57.66/W093 06.13 · FSCOT N44 58.93/W093 09.12
- **BLUEM 35**: BLUEM N44 10.88/W093 13.43 · HHAMR N44 17.06/W093 12.86 · FARBO N44 22.47/W093 12.44 · DNDIS N44 24.62/W093 11.73 · JAMEZ N44 32.40/W093 09.15
- **BLUEM 30L/30R**: BLUEM N44 10.88/W093 13.43 · HHAMR N44 17.06/W093 12.86 · FARBO N44 22.47/W093 12.44 · NOFLD N44 25.87/W093 11.34 · CANDD N44 36.38/W093 00.85 · HAPTN N44 37.70/W092 59.51
- **KASPR (feeder)**: KASPR N43 57.93/W093 14.82 · ZIBBY N44 06.93/W093 13.95 · DELZY N44 13.92/W093 13.27 · PEPPR N44 22.89/W093 12.40 · AHMIT N44 29.88/W093 11.71 · FGT N44 37.86/W093 10.92 · SLIKK N44 47.90/W093 17.21
- **KKILR 30L/30R**: KKILR N44 51.17/W092 11.14 · HUGGI N44 51.67/W092 19.38 · KRISP N44 52.15/W092 29.21 · STUWE N44 48.79/W092 38.40 · GEEQU N44 46.25/W092 45.32
- **KKILR 12R/35**: KKILR N44 51.17/W092 11.14 · HUGGI N44 51.67/W092 19.38 · KRISP N44 52.15/W092 29.21 · AFTYN N44 51.87/W092 47.82 · JONZY N44 50.47/W093 00.59 · GREAK N44 48.32/W093 19.08 · TIETN N44 49.49/W093 21.78
- **KKILR 12L/4/22/17**: KKILR N44 51.17/W092 11.14 · HUGGI N44 51.67/W092 19.38 · KRISP N44 52.15/W092 29.21 · AFTYN N44 51.87/W092 47.82 · COOBA N44 54.09/W092 54.78 · CMMOE N44 57.66/W093 06.13 · FSCOT N44 58.93/W093 09.12
- **MUSCL 30L/30R**: BAYKS N45 03.63/W092 12.89 · WOLVS N45 00.25/W092 34.38 · LKLND N44 58.04/W092 37.40 · KROIX N44 53.40/W092 43.76 · TRTEL N44 51.96/W092 45.72
- **MUSCL 12L/4/22/17**: BAYKS N45 03.63/W092 12.89 · WOLVS N45 00.25/W092 34.38 · LOOON N44 58.92/W092 42.68 · WDBRY N44 56.71/W092 56.36 · ZASKY N44 55.82/W093 01.85 · CMMOE N44 57.66/W093 06.13 · FSCOT N44 58.93/W093 09.12
- **MUSCL 12R/35**: BAYKS N45 03.63/W092 12.89 · WOLVS N45 00.25/W092 34.38 · LOOON N44 58.92/W092 42.68 · WDBRY N44 56.71/W092 56.36 · ZASKY N44 55.82/W093 01.85 · GREAK N44 48.32/W093 19.08 · TIETN N44 49.49/W093 21.78
- **NITZR 35**: NITZR N44 11.17/W093 27.96 · WRSAW N44 16.99/W093 24.75 · DAHRL N44 21.89/W093 22.01 · SHILD N44 23.70/W093 20.81 · GDNEE N44 30.68/W093 15.98 · NNEWW N44 32.07/W093 15.16
- **NITZR 30L/30R**: NITZR N44 11.17/W093 27.96 · WRSAW N44 16.99/W093 24.75 · DAHRL N44 21.89/W093 22.01 · AANAH N44 23.67/W093 20.75 · WBSTR N44 28.55/W093 17.24 · CANDD N44 36.38/W093 00.85 · HAPTN N44 37.70/W092 59.51
- **NITZR 12R/4/22/17**: NITZR N44 11.17/W093 27.96 · WRSAW N44 16.99/W093 24.75 · DAHRL N44 21.89/W093 22.01 · GDNEE N44 30.68/W093 15.98 · ELLKO N44 35.71/W093 12.44 · SAVVG N44 41.50/W093 13.16 · GREAK N44 48.32/W093 19.08 · TIETN N44 49.49/W093 21.78
- **NITZR 12L**: NITZR N44 11.17/W093 27.96 · WRSAW N44 16.99/W093 24.75 · DAHRL N44 21.89/W093 22.01 · GDNEE N44 30.68/W093 15.98 · ELLKO N44 35.71/W093 12.44 · SAVVG N44 41.50/W093 13.16 · CMMOE N44 57.66/W093 06.13 · FSCOT N44 58.93/W093 09.12
- **TORGY 12L/12R**: TORGY N44 38.61/W094 22.52 · OFSON N44 40.42/W094 14.48 · HMBRG N44 42.07/W094 07.17 · CONIA N44 45.17/W093 53.28 · SPUKI N44 53.91/W093 42.25 · KRUGG N44 55.40/W093 40.37
- **TORGY 30R**: TORGY N44 38.61/W094 22.52 · OFSON N44 40.42/W094 14.48 · HMBRG N44 42.07/W094 07.17 · CONIA N44 45.17/W093 53.28 · JAEDN N44 47.34/W093 43.59 · HDEEE N44 51.24/W093 25.86 · WILKN N44 58.68/W093 08.50 · OSMOH N44 57.83/W093 06.57
- **TORGY 4/17/22/30L**: TORGY N44 38.61/W094 22.52 · OFSON N44 40.42/W094 14.48 · HMBRG N44 42.07/W094 07.17 · CONIA N44 45.17/W093 53.28 · JAEDN N44 47.34/W093 43.59 · HDEEE N44 51.24/W093 25.86 · MAUER N44 46.90/W093 15.86 · LEDRZ N44 45.34/W093 12.26
- **TORGY 35**: TORGY N44 38.61/W094 22.52 · OFSON N44 40.42/W094 14.48 · HMBRG N44 42.07/W094 07.17 · CONIA N44 45.17/W093 53.28 · JAEDN N44 47.34/W093 43.59 · HDEEE N44 51.24/W093 25.86 · BRNVL N44 48.27/W093 18.99 · LISEL N44 46.09/W093 18.93
- **AGUDE sat** [satellite]: AGUDE N45 07.76/W092 23.52 · STILS N45 08.06/W092 38.69 · WHISK N45 08.39/W092 57.73 · GEP N45 08.74/W093 22.39
- **ENCEE sat** [satellite]: ENCEE N44 35.20/W095 26.00 · CASNS N44 46.29/W094 33.05 · MLHOF N44 49.38/W094 17.86 · RIXIE N44 51.29/W094 08.37 · MAYER N44 55.08/W093 58.48 · FUDGE N45 04.05/W093 34.86 · GEP N45 08.74/W093 22.39
- **TWOLF sat** [satellite]: TWOLF N43 19.00/W093 32.90 · KGEEE N43 44.94/W093 30.47 · TRGET N44 13.88/W093 27.73 · KEWTY N44 38.82/W093 25.32

## Notes

- **BAINY and GOLLF are co-located** — same geographic point (N45 45.22 / W093 41.97), two names for two different arrival flows (a sequencing construct, not a geography one). Confirmed by Michael; not a data error.
- Rendered in the persisted artifact **"M98 / MSP Master Flow Map"** — arrivals by cornerpost, SIDs by ZMP sector, finals, and 5/9/10 wedges. Layers toggle; arrivals also filter by landing runway (each runway shows only its feeding streams + that final). Finals are tied to Arrivals, Sectors to Departures. The Satellite filter shows the satellite STARs + the five satellite fields + MSP, with no finals.
- Voicing: STAR/fix names spoken as written unless a phonetic is given; SID phonetics live in `claude/SID_TTS_Voicing.md`.

## M98 lateral boundary — authoritative ring (corrected 2026-08-30)

Nine MSP VOR radial/DME points, roughly a 37–41 DME ring; arrival comm-transfer fixes and gates sit at or near it. Use for all drills, position calls, and scope visuals:

**MSP295041 · MSP338039 · MSP029040 · MSP077037 · MSP118040 · MSP158040 · MSP196039 · MSP230037 · MSP254040**

*(MSP338039 replaced the earlier MSP333039 + MSP345038 pair.)*

## SOP handoff floors — the two configs previously missing (M98 7110.26A 4-4c(7)/(8))

- **Land 30s + 35 (CRO):** NITZR and BLUEM **straight in** to the 35 Arrival Controller · KKILR and MUSCL to the parallels at **7,000** — but KKILR/MUSCL bodies **crossed to 35 Arrival go at 9,000** · far gates **8,000** · NITZR/BLUEM handed to **South Arrival at 7,000**.
- **Land 35 – Depart 12s:** NITZR and BLUEM **straight in** to 35 Arrival · **all other arrivals 8,000**. ACDA split for this config (SOP 4-2d): **North Arrival west of the localizer — including NITZR/TRGET and BLUEM/DELZY traffic**; South Arrival east of the localizer. *(The 3/31/2026 SOP change log un-prohibits this configuration; note the MSP tower order 2-2-10 still prohibits the different combined land-12s-AND-35 / depart-12s set.)*

## Feeder split by config — full enumeration (SOP 4-4d)

| Config | North Feeder | South Feeder |
|---|---|---|
| 12s / 12s-17 / 30s / 30s-17 | BAINY, MUSCL, KKILR | NITZR, BLUEM, TORGY |
| 4/22 | BAINY, TORGY | MUSCL, KKILR, NITZR, BLUEM |
| 30s + 35 | BAINY, MUSCL, KKILR | **TORGY only** |
| 35 (incl. Land 35 – Depart 12s) | BAINY, TORGY | MUSCL, KKILR |
| 17 | **TORGY only** | MUSCL, KKILR, NITZR, BLUEM |

**Boundary note:** the North/South **Feeder** line is the **Runway 30L/12R (or 4/22) localizer** — one runway south of the ACDA's north/south split. Gates may be reassigned to balance workload.

## Crossover fine print (SOP 4-5) — beyond the 9,000 / 25-ring / 15-NM rules already here

- Crossovers transfer to Arrival **on the downwind heading** for the runway in use.
- **KKILR → 30L is *not* a near-gate crossover** for coordination purposes; **KKILR → 12R is *not* a far-gate crossover.**
- Far-gate receivers get **control for speed on contact** and **control for turns within the 15-mile ring** (remaining inside Feeder airspace).
- Anything **not descending via the RNAV STAR** must be coordinated with the receiving feeder.

## Parallel turn-on mechanics — the actual SOP 4-7 rules behind "high/low"

- Arrival designates **low and high turn-on altitudes and sides**; **low-side aircraft must be level prior to 3 NM from the associated localizer**.
- Everyone stays **at least 3 NM from the extended final**, holding turn-on altitudes **until the visual approach clearance is acknowledged** (dependent-ILS version: hold altitude separation until established on parallel finals with lateral attained).
- **The high-side controller owns separation from low-side aircraft.**
- Best-practice trio (not 7110.65 overrides): no side-by-side joins with the parallel, no passing the parallel's traffic outside the FAF, intercepts under 30° when able.

## Area R and the 30L RNP Y restriction

- **Area R (SOP 4-2f, Runway 12 / 12-17 only):** during heavy traffic the CIC may coordinate possession of Area R (Appendix A geometry).
- **Runway 30L RNAV (RNP) Y on a 30/17 configuration (SOP 4-6): must not be issued without MSP tower coordination** — it descends into the Runway 17 departure corridor.

## 17-22 configuration — arrival spacing regimes and the crossover matrix (SOP 7-3/7-4/7-5, MSP-M98 LOA §11)

Two distinct spacing regimes — don't blend them:

- **LAHSO active (LOA 11.b):** Runway 17 arrivals **4 miles at touchdown**; Runway 22 arrivals **6 miles at touchdown**; M98 advises MSP of any aircraft that will not LAHSO.
- **LAHSO not used → CRDA mandatory (SOP 7-4):** ghost targets **always on the Runway 22 final**; both runways spaced to **6 miles at touchdown**; at the FAF, 22 traffic sits **within ½ NM of the middle of the gap between ghost targets**.

**Far-gate crossovers to Runway 22 (South Feeder → North Feeder, SOP 7-5b):**

| Arrival | Hand off | Jets | Turboprops |
|---|---|---|---|
| NITZR | depart SAVVG heading **020°** | 11,000 | 9,000 |
| DELZY | depart SAVVG heading **020°** | 10,000 | 9,000 |
| TORGY | depart HDEEE heading **090°** | 11,000 | 9,000 |

Off-the-STAR headings are placed **within 10 NM of MSP** at: NITZR jets 11,000 · BLUEM jets 10,000 · TORGY jets 11,000. Flows: **Runway 22 = left traffic (North Local 123.95 when split) · Runway 17 = right traffic (West Local 123.67)**. Feeder gates: KKILR/MUSCL north; BLUEM/NITZR/TORGY south (South Feeder holds the BLUEM/NITZR ingress to the 10-mile ring); BAINY goes to **South Arrival**.

## Where BLUEM and KASPR actually come from — RST Tower Enroute

RST tower assigns **BLUEM to capable turbojets** and **KASPR to other turbojets and 200-knot-plus turboprops** landing MSP, delivering them at config-dependent altitudes and frequencies (12s → 9,000 Feeder · 30s jets 9,000 Feeder / props **7,000 to Satellite** · landing 35 → **7,000 to the 35 Arrival on 118.72**). The **KASPR STAR airspace is 4 NM either side of centerline, widened to 7 NM on the east side when MSP lands 35**. Full distillation: `claude_M98_RST_Reference.md`.
