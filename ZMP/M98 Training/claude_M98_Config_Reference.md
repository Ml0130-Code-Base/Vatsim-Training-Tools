# M98 Config Reference

The runway configurations — what picks them, what weather they need, and what changes when the airport turns. **Config follows wind/weather; it is not a free pick.** FOR SIMULATION USE. *(Cross-checked against the field vATIS presets; verify anything operational against how it actually runs.)*

## Source self-check

- **What picks the config** → MSP-M98 LOA 9 (Runway Use System / noise), FAA Order 8400.9; MSP + M98 CICs with TMU decide.
- **Advertised configs / approaches in use** → the **MSP vATIS presets** (arrival + departure).
- **Weather floors** → MSP-M98 LOA 7.i (CRO 2,200/5), SOP 7-1 / LOA 11 (17-22 → 1,400/4).
- **Per-config transitions** → ZMP-M98 LOA **Table 2** (in the STAR ref).
- **Per-config feeder / arrival / ACDA** → M98 SOP 4-2, 4-4.
- **Satellite mods** → Satellite ref (STP shelf, altitudes, satellite-field flows).

Trap: state the **wind first**, then the config it produces — don't hand the student a config as if it were their pick.

## The runways

- **12L/30R and 12R/30L** — the two **parallels**, centerlines **3,380 ft apart** (SOP 1-9) → **dependent** parallel approaches (need the diagonal stagger, not independent).
- **30R is the north parallel, 30L the south** (30R = the 12L/30R strip; ACDA split, SOP 4-2a). In a 12s flow the same strips are **12L (north) / 12R (south)**.
- **4/22** — the NE/SW runway. **17/35** — the N/S runway (**17 lands south, 35 lands north**).
- **Heavy jets → the 12R/30L transition** in every config (ZMP Table 2c).

## What picks the config — the RUS (MSP-M98 LOA 9)

- Runway selection on **wind, weather, traffic** per FAA Order 8400.9; the MSP + M98 CICs choose together.
- **Departures are weighed first** (noisier), then a matching arrival config.
- Preference order (most → least preferred):
  - **Departure:** 12L/12R → 17 → 4 or 22 → 30L/30R.
  - **Arrival:** 30L/30R → 35 → 22 or 4 → 12L/12R.
- **Noise default (light/favorable wind, and quiet hours 2230–0600 local):** **land 30s / depart 12s** — opposite-direction ops down the Mendota Heights/Eagan corridor (LOA 9.g).
- As the wind comes up, the airport turns to **land and depart into the wind** (same direction).

## Weather floors — which configs need what

- **CRO — 30-35 (Land 30s & 35 / Depart 30s):** ceiling **≥ 2,200 ft** AND visibility **≥ 5 mi**, plus Rwy 35 wind limits (Attachment 7 charts — gusts count; no tailwind on a contaminated runway). Miss any one → **no CRO**, fall back to a 30 config.
- **17-22 (Land 17-22, Depart 17):** weather **≥ 1,400 ft / 4 mi** (SOP 7-1 / LOA 11).
- **Visual approaches & visual separation** need VMC (VFR conditions) in any config.
- (See the Drill Format doc for the full VFR/MVFR/IFR/LIFR thresholds.)

## The advertised configs (MSP vATIS presets)

**MSP runs two ATIS — Arrival (landing runways + approaches in use) and Departure (departure runways).** They can differ, which is how **opposite-direction** ops get advertised (e.g., Arrival "30" paired with Departure "12"). **VMC** = visual approaches; **IMC** = the instrument approaches below.

| Config | Land — approach (VMC / IMC) | Depart | Weather / notes |
|---|---|---|---|
| **12** | 12L/12R — visual / **ILS 12L + 12R** (simul dependent) | 12L/12R | SE flow; Mendota/Eagan corridor deps (105–119°); STP shelf active |
| **12-17** | 12L/12R — visual / ILS 12L + 12R | 12L/12R + 17 | max Rwy 17 track 215°; 3 MIT same-fix |
| **30** | 30L/30R — visual / **ILS 30L + 30R** (simul dependent) | 30L/30R | NW flow; dependent parallels; heavy → 30L |
| **30-17** | 30L/30R — visual / ILS 30L + 30R | 30L/30R + 17 | **NITZR/BLUEM always Knock-It-Off**; Area F P-ACP to 6,000 |
| **30-35 (CRO)** | 30L/30R + 35 — visual / ILS 30L + 30R + **ILS-V 35** | 30L/30R | **needs 2,200/5**; CRDA ghost 30L→35; matched/balanced sets |
| **17-22 (CRO)** | 17 + 22 — visual / **LOC 17 + LOC 22** | 12R + 17 | **needs 1,400/4**; LAHSO / CRDA; **KKILR/WILDD arrivals prohibited** |
| **4-35** | 35 — visual / **ILS-Z 35** | 4 (S intersection) | land 35 / depart 4 |
| **4** | 4 — visual / **LOC 4** | 4 | NE wind; Knock-It-Off arrivals |
| **22** | 22 — visual / **LOC 22** | 22 | SW wind; Knock-It-Off arrivals |

**Extra / opposite-direction variants (SOP airspace, not standalone vATIS presets):** land 30s / depart 12s (noise default — Arrival "30" + Departure "12"), Land 35 – Depart 12, and the Runway 4 / 22 "depart any" sets. These pair an arrival config with a different departure direction and invoke the ADW + ODO cutoff points (LOA 10).

## What changes when the airport turns

Config-to-config, these shift — check the right book each time:

- **ZMP runway transitions (Table 2 — STAR ref):** 12 → 12L/12R · 30 → 30R/30L · 30/35 → 30R/30L¹ · 17/22 → 17/22. Heavy jets always 12R/30L.
- **Feeder gate assignments (SOP 4-4d):** which arrivals go to North vs South Feeder — differs by config (e.g., 4/22 splits BAINY+TORGY north / the rest south).
- **Feeder → Arrival handoff floors (SOP 4-4c — STAR ref):** 30s & 12s near 7k/far 8k; 4/22 8k/9k; 17 & 35 their own sets.
- **ACDA split (SOP 4-2):** 30/12 → N/S of the 12L/30R or 12R/30L localizer; 4/22/17/35 → W/E of the localizer.
- **Satellite fields turn too (Satellite ref):** in a 12s the satellites land their SE ends (FCM 10, MIC 14, STP 14, LVN 12); in a 30s the NW/W ends (FCM 28, MIC 32, STP 32, LVN 30). STP shelf only in the 12s; the 17/22 satellite crossings are a separate set (KKILR/WILDD prohibited).
- **Knock-It-Off (Table 3):** always on NITZR/BLUEM in the **30-17** config; and whenever landing **4 / 22 / 17 / 17-22** or the OPD is discontinued.

## Notes

- **Config ≠ student's pick.** The coach sets the wind + weather, states the resulting config (arrival + departure), and can change it mid-drill via a SPECI (see Drill Format).
- The parallels being **dependent** (3,380 ft) is a config-independent fact that drives the diagonal-stagger / high-low turn-on any time both parallels are landing (SOP 4-7b). The required stagger is a **1.0 NM diagonal**: 3,380 ft sits in the 7110.65 **§5-9-6** "2,500 ft up to 3,600 ft" band → 1.0 NM minimum between successive arrivals to the two runways — which matches the MSP-M98 LOA's "30R ~1 NM behind 30L / matched sets." Because the spacing is **below 3,600 ft, independent parallel approaches are not authorized** — the dependent diagonal is the only option, and that 1.0 NM is what the high/low is built to deliver before tower owns the finals (LOA 7.d).

## Midnight operations — the overnight regime (ZMP-M98 LOA §5 · MSP-M98 LOA 9.g/9.h · MSP 7110.26G 2-2-9)

The configuration logic that actually runs during the 19:30–06:00 window:

- **When coordinated, 2230–0530 local (ZMP-M98 LOA §5):** ZMP clears all M98 landers **direct destination**, gives **pilot's-discretion descent to 10,000** to anyone at/above 10,000, leaves arrivals at/below 10,000 **at altitude**, and assigns **everyone 124.7 (MSP_R_APP)** — the TRACON collapses onto the **R** frequency in this regime, not H. M98's side: departures **via the first fix**, point-outs to Center, **turboprops/props climbed to 17,000**.
- **Quiet hours 2230–0600 (both facility orders):** maximize the Mendota Heights/Eagan corridor. Midnight RUS preference order: **(1) Land 30s – Depart 12s · (2) Land 35 – Depart 12s, or Land 30s – Depart 17 · (3) straight 12s · (4) straight 30s.** Runway 4/22, if needed, gets equal priority either end. Applies to everything when feasible; **mandatory for anything as noisy as a C-130 or turbojet**; noisy departures may be held over the river basin until leaving 3,000 or higher.
- **Runway 17 south/westbound quiet-hours departures:** runway heading to the **3.03 DME**, then **230°** (typically 0015–0530 daily); departure control may turn on course on initial contact.
- **Midnight opposite-direction rules (MSP-M98 LOA 9.h):** the **advertised landing runway defines the configuration** for opposite-direction purposes; MSP keeps noise-sensitive departures inside the corridor; if MSP anticipates **more than a 15-minute total relay or a 5-minute runway delay** on departures, coordinate a possible switch to the crossed-runway operation. On the tower side (7-4-5), all Runway 12 departures are **APREQ'd** in the land-30s/depart-12s midnight set.

## Opposite Direction Operations — the actual rules (MSP-M98 LOA §10 / MSP 7110.26G 7-4)

The Config table already names "ADW + ODO cutoff points"; these are the rules:

- **Cutoff point = 10 NM from the threshold of the landing runway.** Downwind or vectored-away traffic doesn't count until established on a base leg inside it.
- Traffic advisories go to **both** aircraft; the coordinating phrase is "**OPPOSITE DIRECTION**."
- **No same-runway opposite-direction with opposing traffic inside the cutoff** except an emergency; **visual separation is not authorized** for same-runway IFR opposite-direction. Parallel-runway opposite-direction requires a **turn away** from the opposing traffic inside the cutoff — visual separation may apply only after the turn-away is issued.
- Cutoff mechanics: the departure must be **airborne and turned** before the opposing aircraft reaches the cutoff; a go-around must be **turned** before it; the arrival must **cross the threshold** before it.
- Who asks whom: **MSP verbally requests opposite-direction departures; M98 verbally requests opposite-direction arrivals.**

## 17-22 configuration — spacing regimes, LAHSO weather, and the Departure Decision Area

- **Two arrival-spacing regimes** (full matrix in the STAR reference): LAHSO active → **Runway 17: 4 miles at touchdown / Runway 22: 6 miles**; LAHSO not used → **CRDA mandatory**, both runways **6 miles at touchdown**, Runway 22 traffic within **½ NM of the ghost-gap middle at the FAF**.
- **LAHSO weather floors (MSP 7110.26G 7-1-2):** Runway 22 hold-short-of-Taxiway-K → ceiling ≥ **1,400 / visibility ≥ 4** (available landing distance **8,550 ft**); Runway 30L hold-short-of-A9/W9 → ≥ **1,000 / 3** (**8,150 ft**). Runway must be **dry and uncontaminated**, tailwind **under 3 knots**, no wind shear, JO 7360.1-listed aircraft only, ATIS announcement required.
- **Departure Decision Area (tower 7-1-3):** no Runway 17 takeoff clearance while the Runway 22 LAHSO arrival is between **¼-mile final and nosewheel touchdown**; the 17 departure must be **rolling before the 22 arrival reaches ¼-mile** (the Highway 62/Highway 55 interchange is the visual landmark). Related: **Runway 12R traffic must be rolling by the time Runway 22 traffic is 1.5 miles out** (7-1-4). Non-LAHSO Runway 22 rejected landing: **climbing right turn to 260°** until clear of the 17 departure, then normal go-around coordination.
- **17-22 go-arounds (LOA 11.d):** traffic permitting, 17 *and* 22 go-arounds make a **right turn and return to Runway 17** regardless of the runway originally assigned.
- **17-22 departure one-fix groups (LOA 11.c):** **LEINY/DWN/SMERF** one fix · **FAR/BRD** one fix · **DLH/WLSTN turned east** — each 3 miles-in-trail jet-to-jet / prop-to-prop. *(DWN survives in tower documents as a fix-group label only; the SID itself was replaced by INUNE GENEO DKOTA for satellite routings.)*

## Configuration edge rules recovered from the sources

- **Land 12s + 35 / Depart 12s is prohibited (MSP 7110.26G 2-2-10)** — go-around concerns. Distinct from **Land 35 – Depart 12s**, which the 3/31/2026 M98 SOP explicitly supports (floors and ACDA split in the STAR reference). The SOP change-log phrase "Land 35/12 – Depart 12 no longer prohibited" is ambiguous against the tower order's standing prohibition — worth an instructor question before drilling the combined-landing variant.
- **17/22 overflight triangle (ZMP-M98 LOA 5.d):** the triangular airspace **north of MSP between and including the Runway 17 and 22 ACDAs must be avoided by overflights below 13,000** from all directions.
- **Runway-change checklist highlight (tower Appendix D):** the coordination sequence runs last-departure and last-arrival call signs, new-ACDA availability, then new-runway departures — and **changing to 30/17 includes reminding Feeder and Arrival of the 8,000 ft airspace base**.
- **Automatic releases (tower 6-3-1b):** MSP has automatic releases for departures from advertised runways into the dispersal area — the baseline every release drill sits on.
