# MSP SID Reference (Departures)

## Source self-check — LOAs + SOP + plates (read before quoting a routing/altitude in a drill)

This doc is a convenience layer over the SID plates + LOAs + SOP. Before asserting a routing, join fix, or altitude as fact, confirm against the governing source and name it:

- **SID plate (current AIRAC / Navigraph)** → fix sequence, tracks, climb gradients.
- **ZMP-M98 LOA** → who clears what by filed altitude (4.f), the 60-NM SID-join rule, non-SID Table 1 headings, departure release boundary (25 NM / 110), 17/22-config SID changes.
- **MSP-M98 LOA** → 30L/R turbojet dispersal tracks (9.e), departure heading coordination (8.g), initial altitudes (8.h), non-advertised-runway departures (8.i).
- **MSP 7110.26G (tower order)** → LC initial departure headings (§6-3-1, mirrors LOA 9.e), diverging-departure runway headings, VRIP/ADW, auto-releases (§6-3-1b).
- **M98 7110.26A (TRACON SOP)** → what M98 owns once it takes the departure: Departure/Feeder duties, ingress-route coordination (5-1), P-ACP climbs through arrival airspace (3-2).

If two disagree, name the conflict — don't silently pick one. **When a value drives an LC/tower action (initial runway heading, release) it's a tower-order/LOA fact; when it drives an inside-M98 action it's an SOP fact — verify in the right book.** Traps:

1. "Clear direct to a fix ahead" is a **technique**. The LOA rule for filed 090+ is *established on the SID, or a heading to join the SID within **60 NM** of the MSP DME*. There is **no "50-mile" rule** — don't quote a made-up intermediate distance.
2. **Filed altitude drives handling** (4.f): ≤6,000 as filed; 7,000/8,000 on a heading/course clear of the STAR arrival areas; 9,000 and above must be established clear of STAR areas (on the SID or joining within 60 NM); props requesting 12,000+ climbed to/level 12,000. M98 issues enroute clearance only at **170 or below** (its delegated ceiling).
3. Initial heading off the runway follows **dispersal** — an LC function in **MSP tower order §6-3-1** (which mirrors MSP-M98 LOA 9.e), **not** the M98 SOP and **not** the SID's ultimate direction. (There is no "6-3-4"; 6-3-1 is Departure Headings, 6-3-2 visual sep, 6-3-3 transfer of control.)
4. **Never invent a departure-vs-arrival conflict from fix names** — SID and STAR corridors are laterally separated by design; check the actual geometry / airspace attachments first.

## Routing rule (Michael, stated + LOA-anchored)

Clear direct to a **fix within 60 NM of the MSP VOR** that's ahead of the aircraft on its route (the within-60 fixes listed per gate below). You'll **rarely** send a departure direct to the **MSP, GEP, or FGT VORs** even though they're on some SIDs — not that it's prohibited, but they sit on or right beside the field (MSP VOR is on the airport itself), so "direct MSP" bends a climbing departure back over the top into the traffic behind it. Practical call, not a rule.

**What the ZMP-M98 LOA actually requires (4.f):**

- Filed **6,000 and below** → cleared as filed, altitude for direction of flight.
- Filed **7,000 / 8,000** → on a heading or course to clear the MSP + satellite STAR arrival areas.
- Filed **9,000 and above** → M98 must establish them in the appropriate ZMP sector, clear of STAR areas, on the SID **or a heading to join the SID within 60 NM of the MSP DME** (non-SID-qualified: a Table 1 heading). This is the real basis for "route them to a fix ahead" — the 60 NM is the join limit; ZMP takes them beyond.
- Props requesting **12,000+** → climbed to or level at 12,000.
- M98 issues enroute clearance only when cleared **170 or below**.
- **Boundary:** M98 releases departures to ZMP at **25 NM from the MSP DME or leaving 11,000** — not a flat 40-mile ring.

Voicing: SID names phonetic in read-aloud prose (Kay-Brew, OR-SKEE, Zum-bro, Rochester, Shepp, Wellstone, Coult, Liney, Smurf); raw codes only in visual diagrams.

## Satellite departures — SID eligibility (Michael, stated)

- **STP, ANE, FCM** IFR departures may fly the **MSP SIDs** — all of them **except LEINY** (LEINY is MSP-only; it doesn't serve the satellites).
- **MIC** has **no SIDs** — MIC IFR departures are **radar-vectored** (tower/CD assigns heading + altitude; satellite/departure works the climb-out).
- LVN and the outlying fields: not yet specified — confirm before assuming.
- Related routing (ZMP-M98 LOA 4.f): satellite departures previously routed via the **DWN** SID now route **INUNE GENEO DKOTA**.

## Gates — ultimate direction + direct-able fixes (within 60 NM, non-VOR)

Distances are NM from MSP VOR (N44 53.79 / W093 14.19).

- COULT — ESE to DLL. Direct-able: TAXEE (34), COULT (48). [LMFRY 67 = outside]
- KBREW — NW to FAR. Direct-able: HRBEK (35), HOMUR (47). [GEP is a VOR; KBREW fix 68 = outside]
- LEINY — W to LEINY. Direct-able: TONCA (17), BOTNE (34), KUUGL (48).
- ORSKY — SSW to ONTIJ. Direct-able: JURNY (20), RUMLE (33), PEDLN (48).
- RST — SSE to ALO. Direct-able: FOBUG (30), DOKTR (41), CORDY (50). [FGT, RST are VORs]
- SCHEP — SW to RXANN. Direct-able: HUGIR (20), MCONL (32), ARREX (48).
- SMERF — WNW to SMERF. Direct-able: ZOGAP (29), PAGOZ (48). [SMERF fix 193 = outside]
- WLSTN — E/ENE to GRB. Direct-able: SNINE (33), DWIYT (47). [WLSTN fix 100 = outside]
- ZMBRO — SE to ODI. Direct-able: JEDET (34), ZMBRO (47).

Note: initial heading off the runway follows **dispersal** (an LC/tower function), not the SID's ultimate direction (e.g., COULT ultimately runs SE to DLL but its 30s-departure dispersal track is ~360°). Dispersal tracks — **MSP tower order §6-3-1**, mirroring **MSP-M98 LOA 9.e**: KBREW ~320°, WLSTN ~340°, COULT ~360° (MINNEAPOLIS Nine: FAR 320 / BRD-DLH-HYR-EAU-GRB 340 / DLL 360). The fixes above are join points once M98 turns them on course. All nine turbojet SIDs captured; STARs are in the companion doc.

## Full fix coordinates (as provided)
- COULT: TAXEE N44 42.15/W092 29.56 · COULT N44 33.40/W092 12.51 · LMFRY N44 22.24/W091 51.03 · DLL(VOR) N43 33.05/W089 45.82
- KBREW: GEP(VOR) N45 08.74/W093 22.39 · HRBEK N45 18.87/W093 48.42 · HOMUR N45 25.09/W094 04.61 · KBREW N45 35.06/W094 30.89 · FAR(VOR) N46 45.20/W096 51.08
- LEINY: TONCA N44 54.96/W093 38.03 · BOTNE N44 56.05/W094 01.52 · KUUGL N44 56.90/W094 21.28 · LEINY N45 02.27/W097 36.67
- ORSKY: MSP(VOR) N44 53.79/W093 14.19 · JURNY N44 36.52/W093 28.34 · RUMLE N44 25.28/W093 37.47 · PEDLN N44 12.16/W093 48.02 · ORSKY N43 40.19/W094 13.38 · ONTIJ N43 17.86/W094 30.77
- RST: FGT(VOR) N44 37.86/W093 10.92 · FOBUG N44 25.33/W093 02.18 · DOKTR N44 15.48/W092 55.35 · CORDY N44 07.42/W092 49.79 · RST(VOR) N43 46.97/W092 35.82 · ALO(VOR) N42 33.39/W092 23.94
- SCHEP: HUGIR N44 42.07/W093 36.95 · MCONL N44 35.01/W093 50.54 · ARREX N44 25.54/W094 08.57 · SCHEP N44 14.84/W094 28.73 · RXANN N43 59.88/W094 56.54
- SMERF: ZOGAP N45 05.28/W093 52.55 · PAGOZ N45 11.29/W094 17.26 · SMERF N45 55.26/W097 34.14
- WLSTN: SNINE N45 15.11/W092 39.05 · DWIYT N45 18.20/W092 17.25 · WLSTN N45 28.44/W091 00.92 · GRB(VOR) N44 33.31/W088 11.69
- ZMBRO: MSP(VOR) N44 53.79/W093 14.19 · JEDET N44 27.68/W092 43.68 · ZMBRO N44 20.50/W092 26.91 · ODI(VOR) N43 54.74/W091 28.05

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

The full gate set M98 actually files against — three of these (**ABR, ONL, FOD**) never appeared in this doc's SID list because no MSP SID is named for them (they ride SMERF/LEINY/ORSKY-side routings and the MSP9):

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
