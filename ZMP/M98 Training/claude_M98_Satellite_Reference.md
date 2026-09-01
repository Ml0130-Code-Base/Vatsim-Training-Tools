# M98 Satellite Reference

Companion to the STAR / SID / Coordination references. Covers the **M98 Satellite operation** — the low airspace and the outlying fields, worked from the **E / G / K** positions. FOR SIMULATION USE.

## Source self-check

Same rule as the other refs — confirm a value against the governing book before stating it in a drill:

- **ZMP-M98 LOA** → satellite arrival entry altitudes (3g), Table 4 satellite crossings.
- **M98 7110.26A SOP** → positions (2-1), satellite duties (2-3), satellite chapter (6), ACDA entry (6-5), P-ACP (3-2), APO (3-3), concurrent approaches (3-4 SGS / 3-5 FCM 28+MSP 35).
- **MSP-M98 LOA** → satellite-related APOs (8.k), MSP departures landing FCM/STP (8.f), FCM 28 arrivals when departing 17 (6.a).
- **Field vATIS presets** → the fields' advertised flows & approaches (below).
- **Plate (current AIRAC)** → the satellite approaches themselves.

**Trap: only STP keys off MSP.** Don't manufacture an FCM/MIC/ANE/LVN-vs-MSP conflict — those flows are independent even when they look similar (Michael, stated).

## The seat (SOP 2-1, 2-3)

- **E — Flying Cloud Satellite, 134.700.** **G — St. Paul Satellite, 121.200.** **K — Crystal Satellite, 126.500.** Satellite airspace = **three sectors** (Appendix C).
- **"Satellite combined" = E holding G + K** — you work all three satellite sectors and **own only satellite airspace**: low, under the Class B, around and beneath the MSP arrival & departure structure. The MSP finals and the departure corridor belong to Arrival / Departure / Feeder, not you.
- **Splitting off E:** when the satellite splits, E keeps Flying Cloud (its own southern sector) and **G (St. Paul) / K (Crystal)** break out to the north and east. Working **K + G** = you own the north/east satellite airspace (MIC, ANE, STP + the north/east fields) while **E** works the southwest (FCM, LVN) beside you. This is the split that turns on the **STP Shelf** in a 12s (both K and G open — SOP 6-4).
- Duties: separate your IFR + VFR, issue clearances/restrictions, advisories as workload permits, own your STARS entries, make sure your arrivals have current info.

## Satellite airspace boundaries (plotted — Michael-supplied from the sector file)

The three sectors are a **geographic split** (SOP 6-2 / Appendix C). **All three meet at the FCM hinge** (N44°49.52′ W093°26.56′, ~10 SW of MSP) — the E boundary and the K↔G line share that point.

**① E (Flying Cloud) — the northern edge of E's airspace. Everything *south/SW* of this polyline is E:**

| Vertex | Coordinates | ≈ from MSP |
|---|---|---|
| NW corner | N45°11.91′ W094°04.48′ | ~40 NM WNW (outer boundary) |
| Hinge | N44°49.52′ W093°26.56′ | ~10 NM SW — **at Flying Cloud** |
| SE corner | N44°32.91′ W092°44.98′ | ~29 NM SE (outer boundary) |

Runs **NW→SE, hinging at FCM.** **South/SW of it = E** (FCM, LVN, southern fields). **North/E of it = K + G** (MIC, ANE, STP, north/east fields).

**② K ↔ G dividing line (*baseline — does NOT count the STP shelf*):**

| Vertex | Coordinates | ≈ from MSP |
|---|---|---|
| SW end *(= E hinge)* | N44°49.52′ W093°26.56′ | ~10 NM SW — **at FCM** (shared point) |
| | N44°58.14′ W093°14.82′ | ~4 NM N (just off the field) |
| | N45°02.50′ W093°15.98′ | ~9 NM N |
| | N45°03.99′ W092°56.15′ | ~16 NM NE |
| NE end | N45°18.28′ W092°35.91′ | ~37 NM NE (outer boundary) |

- Runs **SW→NE from the FCM hinge, past just-north-of-MSP, out to the NE corner.**
- **West/NW of it = K (Crystal):** MIC, ANE, the NW/N fields (incl. 25D/Forest Lake, just K-side).
- **East/SE of it = G (St. Paul):** STP, SGS (South St. Paul), 21D (Lake Elmo), the E/SE area.
- Field check: **MIC, ANE → K; STP → G** — each sector holds the field it's named for.
- **"Not counting the STP shelf":** in a 12s with both K and G open, the **shelf (SOP 6-4 / Appendix A) modifies this baseline around STP** — the carve-out that lets G work the close-in STP arrival inside the ring. Exact shelf geometry per Appendix A (diagram, not yet pixel-plotted).

## Your fields (SOP 6-1a)

M98 works IFR + VFR (requesting service) to/from: **STP, FCM, ANE, MIC, LVN**, plus CFE, FBL, MGG, RGK, RNH, OEO, SGS, 10D, 21D, 25D, 7Y7, SYN.

- **Towered (can be staffed — SOP 1-6b): STP, FCM, ANE, MIC.** Everyone else is **uncontrolled** (instrument approach where charted).
- Primary-five ARPs (from the STAR ref): KSTP N44 56.07 / W093 03.60 (~8 ENE) · KANE N45 08.70 / W093 12.68 (~15 N) · KMIC N45 03.72 / W093 21.24 (~11 NW) · KFCM N44 49.63 / W093 27.43 (~10 SW) · KLVN N44 37.67 / W093 13.69 (~16 S).

## Common flows at the towered fields (from the field vATIS presets)

Each field turns with the wind just like MSP. **VMC = visual approaches; IMC = the instrument approach for the runway in use.** On a **12s / SE-wind** day the satellites land their SE ends (matching MSP landing 12s); on a **30s / NW-wind** day they land the NW/W ends.

- **FCM (Flying Cloud)** — rwys 10L/28R, 10R/28L, 18/36.
  - *West (W/NW wind):* land/depart **28L / 28R** (+ 36 in VMC). IMC = **RNAV 28L/28R**.
  - *East (E/SE wind):* land/depart **10L / 10R** (+ 18 in VMC). IMC = **ILS or RNAV 10R** (land 10R; depart 10L/10R).
- **STP (Holman)** — rwys 14/32, 13/31, 09/27.
  - *SE wind:* land/depart **14**. *NW wind:* land/depart **32** (VMC also uses **31, 27**). IMC = instrument approaches to the landing end.
- **MIC (Crystal)** — rwy **14/32** (single) plus parallels **6L/24R and 6R/24L**. *(Corrected per MIC 7220.3N: the old 14R/32L is permanently closed and is now Taxiway G — there are no parallel 14s/32s.)*
  - *SE wind:* **14**. *NW wind:* **32**. IMC = **RNAV 14 / RNAV 32**.
- **ANE (Anoka County-Blaine)** — rwys 09/27, 18/36.
  - VMC: **27, 9, 36, 18**, or combos **36/27** and **18/9**. IMC = **RNAV GPS 09** or **RNAV GPS 18**.
- (**LVN** Airlake, uncontrolled — rwy 12/30; lands 12 in a SE wind, 30 in a NW wind.)

*So in a 12s (SE-wind) drill the satellites land: FCM 10, MIC 14, STP 14, LVN 12; in a 30s (NW-wind) drill: FCM 28, MIC 32, STP 32, LVN 30 — VMC visual, IMC the runway's instrument approach.*

## Closed tower = you are approach AND the field

When a satellite tower is closed (the default unless a controller staffs it), you provide the full service to that uncontrolled field:

- Issue the approach clearance (the visual in VMC, or the instrument approach) and the traffic — *"no traffic between you and the airport."*
- Get the **IFR cancellation** — airborne on your frequency or Flight Service, or on the ground — then **frequency change approved** to CTAF.
- **One IFR in *or* out at a time** absent visual/radar separation. Different fields don't stack on each other; the same field does.

## STP — the one that keys off MSP

STP (Holman, ~8 ENE of MSP) is close in and **the only satellite whose flow depends on the MSP config** (Michael, stated); FCM/MIC/ANE/LVN run independently.

- **12s:** the **STP shelf** is in play (SOP 6-4, "Runway 12 and 12/17 STP Shelf") — the carve-out that lets you work an STP arrival *inside* the close-in ring. It exists only when **both MIC Satellite (K) and STP Satellite (G) are open** and MSP is landing 12L/R. Keep the vectoring **outside your sector boundary (~11.5 NM from MSP — Michael, stated)** and let the shelf take the final into STP. Exact lateral limits per Appendix A.
- **Landing 22:** coordinate **all** STP IFR approaches/departures with Arrival (SOP 6-1b).
- **STP Rwy 14 departures:** restricted **2,500**, headings **≤080°** (SOP 6-3).

## Where you touch the other positions (boundary coordination)

- **Hand an MSP-landing target you're working to Arrival** on a heading into the ACDA — **5,000 high side / 4,000 low side** (SOP 6-5).
- **APO** an MSP-tagged target down to **3,000** in the ACDA — within 20 NM, ≤90° to the FAC, not through / turning off final (SOP 3-3b). LOA APOs cover FCM 28L/R, MIC RNAV 32, STP RNAV/ILS, and FCM visuals (MSP-M98 LOA 8.k).
- **P-ACP** to climb your departures **over-the-top of MSP through N/S Arrival airspace (6,000–7,000)** and through Rwy 35 Arrival airspace (SOP 3-2e); and to **transit an MSP departure at 4,000** through departure airspace 10–15 mi out (SOP 3-2f).
- **Receive MSP departures landing FCM/STP** — MSP advises you before they roll (MSP-M98 LOA 8.f).
- **VFR transits** through the ACDA under the Bravo — no coordination if tagged with altitude (SOP 6-1c); VFR advisory service capped **at/below 3,500** (LOA 8.j). A VFR actually crossing the Class B needs the explicit **Bravo clearance**.
- **IFR separation for VFR practice approaches** at LVN, ANE, CFE, MIC, FBL, 21D, FCM, GYL, MGG, RNH, OEO, RGK, STP, SGS (SOP 6-6).
- **Concurrent ops — the actual values (M98 7110.26A 3-4 / 3-5):**
  - **MSP 30L/R + SGS Runway 34 (LOC or RNAV):** point out SGS traffic to Arrival before the approach clearance; SGS traffic **level 2,500 and established by 5 NM prior to HINZZ (localizer) / AVBAF (RNAV)**; Arrival holds MSP traffic **at 4,000 to AABEZ/SAMMZ** while protecting the SGS final; SGS missed-approach altitude **2,500**; keep the 30R aircraft on frequency **until the paths have crossed**.
  - **MSP 35 + FCM RNAV 28L/28R:** point out FCM traffic to Arrival and Local; FCM traffic **at or below 3,000 and established by FGT**; MSP Runway 35 instrument traffic established on final and **crossing ROZEE at 4,000**.

## Satellite arrival entry altitudes (ZMP-M98 LOA 3g) — full set in the STAR ref

- STP/ANE/FCM over **BITLR**: direct GEP, cross BITLR **6,000** (3g6).
- FCM/LVN south of **RGK**: direct FGT direct dest — **4,000** (landing 30s/30-17/30-35); 4,000 or 6,000 other configs (3g7).
- FCM/LVN from Sectors 08/09: direct dest **5,000** (or via TWOLF/ENCEE) (3g8).
- FCM from Sector 10: direct FCM west of the GEP gate **≤5,000** (3g9).
- All **piston** terminating in M98: enter satellite airspace **≤6,000** (3g10).
- **STC/MKT departures** inbound to MSP/satellites: enter **5,000** (3g11/12); aircraft **landing at STC/MKT**: at/descending **4,000** (3g15).
- Satellite STAR crossings (Table 4): **AGUDE 8k jet / 6k tprop · RIXIE 8k jet / 7k tprop · TRGET 7k · OLLEE 7k**. The **17/22** config uses its own set and **prohibits KKILR/WILDD**.

## Satellite departures (full detail in the SID ref)

STP/ANE/FCM may fly the MSP SIDs **except LEINY**; **MIC has no SIDs → radar vectors** (work the filed route / first fix). Satellite departures previously via the **DWN** SID now route **INUNE GENEO DKOTA** (ZMP-M98 LOA 4.f).

## Towered-satellite interface — the numbers the seat runs on (M98-SAT LOA, 11/30/2025)

Full detail (releases, keyboard entries, tower-side jurisdiction) lives in `claude_M98_Satellite_Tower_Interface.md`. The values used every drill:

**Initial IFR departure altitudes the towers assign (LOA 6.b.1a):**

| Field | Runways | Altitude |
|---|---|---|
| ANE | all | **3,000** |
| FCM | 10L/10R, 36 | **2,500** |
| FCM | 28L/28R, 18 | **3,000** |
| MIC | all | **3,000** |
| STP | 13, 14 | **2,500** |
| STP | 32 | **3,000** |

**Standard departure headings (LOA Attachment 2 / tower orders):** ANE **270° clockwise to 090°** (Runway 18 = right turn) · FCM **180° clockwise to 300°** (Runway 10 departures must be right turns unless coordinated) · MIC **320°** all runways · STP Runway 32 **030°–045°**, Runways 13/14 **010°–080°**. Anything outside the standard band, or off a non-advertised runway, is verbally coordinated.

**Missed-approach assignments:** M98 issues planned misses **ANE 360°/2,500 · FCM 230°/2,500 · MIC 320°/2,500 · STP 060°/2,500**. Towers instruct *unplanned* misses to the same values **except MIC unplanned = 320°/3,000** — the one asymmetry, drill it.

**Release mechanics:** releases move via the STARS **Run-Down Tab List** — list IDs **ANE = PO · FCM = PF · MIC = PM · STP = PP** (second letter matches the tower's STARS ID). M98 issues with `F13, <list ID>, ACID, <enter>`; nonstandard headings/altitudes are verbal.

**Standing authorities to know before calling a conflict:** overflights **at or above 3,000 MSL transit satellite-tower airspace without prior coordination** (they must be displayed on the tower display or verbally coordinated) · **FCM may side-step/circle** an arrival to any non-opposite-direction runway without coordination, taking the separation · **STP may interchange 31↔32 and 13↔14** on landing clearances.

## Additional satellite-side rules recovered from the sources

- **OEO / RNH / RGK from the east (ZMP-M98 LOA 4.g(14)):** arrivals through ZMP Sector 5 come level at, or descending to, **4,000** — M98 has control within 10 NM of the boundary.
- **VFR caps (MSP-M98 LOA 8.j):** leaving the Bravo **without** advisories → at or below **2,700**; **with** radar advisory service → at or below **3,500** on a discrete code to the appropriate satellite position. (The 3,500 was already captured; the 2,700 wasn't.)
- **17-22 configuration satellite duties (M98 7110.26A 7-5c):** STP Satellite coordinates any flow that affects the MSP Runway 22 final; **all MIC IFR arrivals operating east of MIC, and MIC Runway 06 and 14 departures, must be coordinated.**
- **Per-field visual-approach advertising minima (tower orders — not one metro-wide number):** FCM visibility ≥ 7 and ceiling ≥ **2,100** AGL · MIC ≥ 7 / ≥ **2,200** · STP ≥ 7 / ≥ **2,300**, and STP must advise M98 whenever the weather crosses those minima in either direction.
- **STP hard limits:** **Runway 31 is not available for IFR departures** (STP 7220.3Q); simultaneous 31/32 runs under FAA JO 7110.65 3-9-9 nonintersecting-converging rules; the **Runway 13 clear zone** must be clear of aircraft during a Runway 13 approach.
- **MIC airspace:** Class D = **3.8 NM radius, surface to 2,500 AGL (3,369 MSL)**, truncated at the Class B base; **North Memorial Hospital helipad MY77 sits 3.7 NM south-southeast of the field**; MIC local IFR clearances are issued "via radar vectors."
- **FCM airspace notes:** the **Class B base over FCM is 3,000** (the tower's suggested-course phraseology quotes it); occasional **floatplane operations at Lake Riley and Bryant Lake** — advisories only, no clearance or separation.
