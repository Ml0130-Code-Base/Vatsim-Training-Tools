# M98 7110.65 Reference (Terminal Radar)

Distilled from **FAA JO 7110.65BB** — the national ATC order the M98 SOP and the LOAs supplement. The sections a terminal radar / approach controller leans on in drills: separation, vectoring, speed, approaches, visual, holding. **The 7110.65 is the floor; the M98 SOP / LOAs layer facility-specific (often more restrictive) values on top — the more restrictive one governs.**

## Source self-check

- Pulled from the faa.gov HTML (7110.65BB). Trust the tool over this doc on two things: the **CWT wake matrix** (STARS auto-tags each target — verify the full A–I table against the facility CWT reference; don't memorize cells) and **exact sub-paragraph letters** (confirm against the PDF if quoting to a trainee).
- Facility values already captured elsewhere (5-in-trail boundary, CRO 5/170, satellite altitudes) sit on top of these base rules.

## Radar separation (§5-5-4)

**Basic minima (terminal):**
- Single-sensor ASR: **< 40 NM from the antenna → 3 NM; ≥ 40 NM → 5 NM.**
- **FUSION** target symbol → **3 NM**; single-radar (ISR) indication → **5 NM**; STARS multi-sensor mode → **5 NM**; single-sensor monopulse (MSSR) → 3 NM within 60 NM.

**Reduced separation on final — 2.5 NM:** between aircraft **established on the final approach course within 10 NM of the runway** (FUSION, or single-sensor slant-range within 40 NM), provided wake separation is still applied, **average runway occupancy ≤ 50 sec is documented**, CTRDs are used, and turnoffs are visible from the tower. *(This is the 7110.65 basis for the MSP-M98 LOA's "Rwy 35-only → 2.5 NM within 10 NM.")*

**Wake turbulence** (distance-based; §5-5 carries **no** time minima — those are §3-9, tower):
- STARS auto-tags each target's **CWT category (A–I)** — trust the tag; don't hand-derive it. (Rough: A = Super; B–C = Heavy; D–G = Large incl. B757-class; H–I = Small.)
- **Legacy weight-class minima (solid):**
  - Behind a **Super:** Heavy **6**, Large **7**, Small **8**.
  - Behind a **Heavy:** Heavy **4**, Large/Small **5** (Small behind Heavy on the **same runway → 6**).
  - Behind a **B757:** Small **4**.
- **Parallel runways < 2,500 ft apart = one runway for wake** (30L/30R at 3,380 ft are *separate* for wake — but the dependent-approach diagonal still applies; see Parallels).
- Wake applies to a follower **at or below the leader's altitude and behind** it; **follower above the leader → no wake requirement.**
- **NOWGT** (weight unverified) → **10 NM** ahead and behind.
- *The full A–I CWT cell values are deliberately not reproduced here — verify against the facility CWT table.*

## Vectoring (§5-6) & vectors to final (§5-9)

- **Vector at or above the MVA / minimum IFR altitude** (§5-6-1), except radar approaches/departures, SVFR/VFR, or §5-6-3.
- **§5-6-3 (below min alt):** only departing IFR / missed-approach — obstacle path **≥ 3 NM** (or < 3 NM if climbing), with an uninterrupted climb to MVA within **10 NM of the DER**.
- **Vectors to the final approach course (§5-9-1):** intercept **at least 2 NM outside the approach gate.** Exceptions: ceiling **≥ 500 ft above the MVA/MIA and vis ≥ 3 NM** → closer, but no closer than the gate; **pilot request** → inside the gate, no closer than the FAF; **RNAV/GPS approaches → neither exception applies.**
- **Intercept angle (§5-9-2, TBL 5-9-1):** **≤ 30°** normally (gate ≥ 2 NM); **≤ 20°** when < 2 NM from the gate or triple simultaneous; **45°** helicopters.
- **Approach gate** = 1 NM outside the FAF, never closer than 5 NM from threshold.
- **Altitude until established (§5-9-4):** assign an altitude to maintain until established on a published segment; it must assure obstruction clearance from the clearance until established. **Keep 1,000 ft between aircraft on opposite base legs.**

## Speed adjustment (§5-7)

- **Knots IAS, in 5-kt increments** (per BB — note it reads 5, not the older 10).
- **Minimum assignable speeds, arrivals below 10,000 ft (§5-7-3):**
  - **Turbojet:** ≥ **210 kt**; ≥ **170 kt** within **20 flying miles** of the threshold.
  - **Recip / turboprop:** ≥ **200 kt**; ≥ **150 kt** within **20 flying miles**.
- **Stop speed control (§5-7-1):** **no speed adjustments inside the FAF, or a point 5 NM from the runway — whichever is closer to the runway.**
- **Termination (§5-7-4):** *RESUME NORMAL SPEED* (cancels the ATC speed; does **not** delete published restrictions) · *RESUME PUBLISHED SPEED* · *COMPLY WITH SPEED RESTRICTIONS* · *DELETE SPEED RESTRICTIONS.*
- **250 / 10,000:** a pilot on an assigned speed **> 250 kt** at/above 10,000 complies with 91.117(a) when cleared below 10,000, **without telling ATC.**
- Phraseology: MAINTAIN (speed) KNOTS [OR GREATER / OR LESS] · DO NOT EXCEED (speed) · INCREASE/REDUCE SPEED TO (speed) · MAINTAIN MAXIMUM FORWARD / SLOWEST PRACTICAL SPEED.

## Parallel approaches (§5-9) — the MSP 30L/30R rule

- **DEPENDENT parallel diagonal (§5-9-6), by runway centerline spacing:**
  - **2,500 – 3,600 ft → 1.0 NM** · **> 3,600 – 8,300 ft → 1.5 NM** · **> 8,300 – 9,000 ft → 2.0 NM.**
  - **MSP 30L/30R = 3,380 ft → 1.0 NM diagonal** (matches the MSP-M98 LOA "30R ~1 NM behind 30L / matched sets"). Turn-on, before the diagonal is established: **1,000 ft vertical OR 3 NM radar.**
- **Simultaneous INDEPENDENT (§5-9-7):** dual needs runways ≥ **3,600 ft** (or ≥ 3,000 ft with a 2.5–3.0° offset course); high-update-rate PRM ≥ 3,100 ft (≥ 2,500 with offset). **NTZ 2,000 ft wide**, continuous monitor. → **MSP at 3,380 ft is below 3,600 ft, so the parallels run DEPENDENT** — which is exactly why you build the high/low turn-on and deliver the 1.0 NM diagonal (SOP 4-7b).

## Approach clearances (§4-8)

- Clear for a **published (standard/special) IAP by name**; the runway reference may be omitted if only one approach of that type is published.
- **Unpublished route (4-8-1b):** clear only when the aircraft is **established on a published segment**, OR **assigned an altitude to maintain until established** (the altitude must assure obstruction clearance).
- **Vector / clear to a fix ≥ 3 NM before the FAF**, intercept ≤ 30°. (RNAV: to an IAF/IF at up to 90° with radar monitoring, pilot advised to expect clearance ≥ 5 mi from the fix; IF→FAF ≤ 30°.) From a STAR/ATS route: clear ≥ 3 NM before the IAF/IF.
- **"CLEARED APPROACH"** = pilot's choice; **"CLEARED (specific) APPROACH"** = you name it. Don't use "cleared approach" where radar monitoring is required but unavailable.
- **Circling** only at towered airports ("CIRCLE TO RUNWAY (n)"). **Side-step** and **"CHANGE TO ADVISORY FREQUENCY APPROVED"** (uncontrolled-field release) both here.
- Example: *"Maintain three thousand until CENTR, cleared straight-in RNAV Runway One-Eight approach."*

## Holding (§4-6)

- A holding clearance = **clearance limit + holding instructions + EFC.** **No EFC if no delay is expected.**
- **Timing:** issue holding + EFC **≥ 5 min before** the aircraft reaches the fix; if it's **< 5 min out, issue immediately.**
- **Required elements (4-6-4):** (1) direction to hold **from** the fix, (2) the holding fix, (3) radial/course/bearing/airway/route, (4) leg length — **miles** (DME/RNAV) or **minutes** (on pilot request), (5) turns — specify **only if left turns** / pilot request / necessary, (6) max holding airspeed when unable to comply with pattern limits.
- **Standard = right turns; nonstandard = left (must be specified).**
- Delays **≥ 30 min** → issue the delay ("(Airport) arrival delays (time)"). **ILS critical-area:** don't hold below 5,000 ft AGL within 1 SM of the localizer between the OM and the airport when ceiling < 800 ft / vis < 2 mi.

## Visual separation (§7-2)

- Applied **up to but not including FL180**; **not authorized when the lead is a Super**; other approved separation must be assured before and after.
- **Tower-applied** (out the window): observe the aircraft, keep comms with one, issue instructions as needed. **Not authorized when wake-turbulence separation is required.**
- **Pilot-applied** (the radar controller's tool): **call the traffic → get the pilot's "in sight" → "maintain visual separation."** Separation from that traffic then passes to the pilot.
- **Wake cautionary advisory is required** (the "CAUTION WAKE TURBULENCE" wording lives in **2-1-20**, not §7-2).

## Visual & contact approaches (§7-4)

- **Vector for a visual (7-4-2):** reported ceiling **≥ 500 ft above the MVA/MIA** AND visibility **≥ 3 SM.**
- **Clear a visual (7-4-3):** airport weather is **VFR** (or the pilot is told weather is unavailable); the pilot reports **the airport/runway in sight OR the preceding aircraft in sight.** **Radar separation is held until visual separation is provided.** Not authorized when the lead is a Super. A visual approach has **no missed-approach segment** (unable to land → go-around on IFR separation).
- **Contact approach (7-4-7):** **the pilot must request it** (never controller-initiated); **reported ground vis ≥ 1 SM**; a published IAP exists for the field; the pilot stays clear of clouds to the airport; clear "at or below" an altitude **≥ 1,000 ft below any IFR traffic.**

---

*Distilled from FAA JO 7110.65BB (faa.gov HTML). Minima, gate/intercept, parallel-diagonal, speed, approach-clearance, holding, and visual values pulled verbatim; the CWT wake matrix and exact sub-paragraph letters flagged verify-against-source. Facility (SOP/LOA) values layer on top and, when more restrictive, govern.*
