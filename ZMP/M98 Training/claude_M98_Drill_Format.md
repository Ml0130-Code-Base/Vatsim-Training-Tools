# M98 Drill Format

How the AI coach **presents and runs** a training drill. This is format only — the **seat/position, config, and traffic change every drill**, so nothing here is tied to a specific position (Drill 9 happened to be E/Satellite; the next one won't be). Role and pedagogy live in the **M98 LLM Guideline**; drill results live in the **Practice Log**.

## Frame the drill (before traffic)

**Who sets what:**

- **The student picks the SEAT / position** they work — and therefore the airspace they own. That's the student's choice.
- **The coach sets the weather; the config *follows from it*.** The runway configuration is **wind / weather-driven** (land into the wind; CRO and 17-22 carry weather floors; the RUS sets the preference order — MSP-M98 LOA 9) — **not** a free pick. Set the wind + flight category, then state the config that those conditions produce.
- The coach also sets **who else is open** (the student's coordination / handoff partners) and the traffic.

State the frame in a header line and keep it visible: *"Config · wind · flight category · seat · towers open/closed"* + *"Open around you: …"*. If a frame element is ambiguous and changes the drill, ask.

## Weather & flight conditions (the frame can — and should — change mid-drill)

There's more than "VMC/IMC." The coach sets the drill's **flight category** (which drives the config) and can change it.

**Flight categories** (ceiling AGL *and/or* visibility in statute miles — the color-coded categories on aviation weather charts):

| Category | Ceiling | Visibility |
|---|---|---|
| **VFR** | **> 3,000 ft** *and* | **> 5 SM** |
| **MVFR** (Marginal VFR) | **1,000–3,000 ft** *and/or* | **3–5 SM** |
| **IFR** | **500 to < 1,000 ft** *and/or* | **1 to < 3 SM** |
| **LIFR** (Low IFR) | **< 500 ft** *and/or* | **< 1 SM** |

- **VMC / IMC** are the broader regulatory pair (Visual / Instrument Meteorological Conditions). VFR ≈ VMC; MVFR and below trend toward IMC as they worsen. The flight category is the precise version — use it.

**What the category gates (the M98 toolbox):**

- **VFR / VMC** — full toolbox: visual approaches, visual separation, VFR traffic & Bravo transitions.
- **MVFR** — marginal; visuals may still hold but check the floor. **CRO (30s/35) needs ceiling ≥ 2,200 ft and visibility ≥ 5 mi** (MSP-M98 LOA) — an MVFR ceiling under 2,200 kills CRO.
- **IFR / LIFR** — instrument approaches only; **no visual approaches, no visual separation, no CRO**; wider spacing; watch for below-minimums. The **17/22 config needs ≥ 1,400 ft / 4 mi** (SOP 7-1 / LOA 11).
- The **VMC/IMC split in each vATIS preset is the link** — VFR gives the visual; as it drops to IFR you're on the ILS/LOC/RNAV the preset names (Config + Satellite refs).

**METAR cadence — it changes on you:**

- A routine **METAR** is issued **once per hour** (observation taken in the ~10 minutes before the hour).
- A **SPECI** is an *unscheduled* special issued whenever conditions cross a significant threshold **between** the hourly reports — for us the ones that matter most: **visibility crossing 3 / 2 / 1 SM** or **ceiling crossing 3,000 / 1,500 / 1,000 / 500 ft** (the thresholds that flip the flight category), plus thunderstorm onset/end, wind shift (≥ 45° / ≥ 10 kt or gusts), precip type/intensity change, tornado/funnel, RVR, volcanic ash / dust.
- **So weather can change while you're on position** — and because config follows weather, a big enough change can **force a config change**. The coach may drop a **SPECI** partway through a drill: a ceiling sliding through 2,200 pulls CRO; visibility dropping below 3 flips the field to IFR and takes the visual approaches with it; a wind shift can turn the whole airport around. The rep is **adapting** — re-plan the config/tools, re-sequence what's already in, and coordinate the change with the affected positions.

**Sourcing the drill weather & config:**

- **Live — mirror what MSP is running IRL:** fetch the MSP D-ATIS from **`https://atis.info/api/KMSP`** (JSON — arrival + departure ATIS, code, config, weather line; the human page `atis.info/kmsp` is JS-rendered so fetch the `/api/`; `datis.clowd.io/api/KMSP` redirects here). The D-ATIS is **MSP-only** — the satellites don't run one.
- **Satellite weather = METARs (not D-ATIS).** Pull the satellite fields — and MSP — in one call: **`https://aviationweather.gov/api/data/metar?ids=KMSP,KFCM,KSTP,KMIC,KANE,KLVN&format=raw`**. Decode each field's ceiling (lowest BKN/OVC) + visibility → its flight category; its wind → its runway/flow (Satellite ref). Whether or not you pulled the MSP D-ATIS, **always use the METAR for satellite weather.**
- **Keep the whole metro at one time.** Use observations from the same period so the picture is internally consistent. The big fields report near **:53**; the smaller AWOS fields (ANE, LVN) report on their own schedule, so times can differ by a few minutes — use the closest set. Don't pair a fresh ob at one field with an hour-old one at another.
- **SPECI = a cell in the area.** If any field's report is a **SPECI**, a weather cell is either rolling through or just finishing. **Wait a couple of minutes, then re-pull *all* the towered fields** — the trend across them tells you whether it's **building** (worse → the config may have to change) or **clearing** (recovering). A SPECI at one field is a heads-up for the whole metro, not just that field.
- **Generate from past data:** draw a realistic scenario from historical METARs (a past date/time or a plausible worsening trend) so the weather and any mid-drill SPECI behave like the real airport.
- Whatever the source, **state the resulting config** (arrival + departure) in the frame and let it drive the drill.

## The scope table (Michael's ask — keep it and keep it current)

Present traffic as a table and **maintain it** — it's the fastest way to hold **who / where / what they're doing.** Canonical columns (flex per drill):

| Callsign | Type | Job (arr/dep + rwy, or route) | Position | Altitude | Coordination | Status / owe next |

- **Job** — arrival RWY xx / departure / VFR transit / etc.
- **Position** — distance + bearing **from a *named* reference** (never a bare "SW" — see below).
- **Coordination** — who this one touches (handoff / point-out / APO / P-ACP / none).
- **Status / owe next** — what's been issued and what the student still owes on it.
- Add a **"not yours — coordinate only"** line for adjacent traffic the student doesn't control but must account for.
- Re-post the full table whenever the student asks for a status board, or when enough has changed that a table beats prose.

## Positions — always anchor to a reference

- Give distance + bearing **from a named reference** (airport, fix, VOR, VFR landmark). "15 SW" invites "15 SW of *what*" — don't make them ask.
- Use the reference most useful to the task: the **landing field** for an arrival being worked to it (e.g., DME/radial off the field), **MSP** for the big picture, a **town/landmark** for a VFR (that's how the pilot reports).
- For an arrival on a STAR/approach, **"just crossed / about to cross [fix]"** is cleanest. Offer distance+bearing from the field or a fix on request.

## Running narrative on position updates (Michael's ask)

- Every time the student asks for an updated position, **advance the tape and narrate the movement** — where the aircraft *was*, where it *is now*, and what's *imminent* — not just a fresh static snapshot. Keep it continuous drill-to-drill.
- Move the whole picture realistically between updates (speeds, climb/descent, turns) so the narrative stays consistent and the student can trust the geometry.

## Voicing the sim

- Voice **pilots** (readbacks, requests, position reports — VFRs report off landmarks) and **other controllers** (coordination responses) so the student runs the full exchange.
- On coordination, voice **only what's been earned:** the receiver's *"go ahead"* until the student states the actual request; the approval only **after** the ask lands. Do **not** complete or approve a call the student hasn't finished (this was the recurring miss in Drill 9 — see the Coordination Reference).
- Don't get ahead of the student or assume their intent — ask or wait.

## Run the problem

- Open with a **triage** question (first three moves) plus the **one key decision** the drill is built around.
- Coach live: affirm good calls specifically, flag the ones needing a follow-up **as questions**, let the student drive.
- **Don't manufacture conflicts** — check the actual geometry / airspace boundaries before calling one (the standing failure mode; guardrails are in the STAR/SID self-checks).

## Wrap

- **Debrief** — a few concrete strengths + a couple of watch-fors.
- **Log it** to the Practice Log (§19A): what was built, the drill, strengths shown, watch-fors, suggested next reps.

---

*Weather definitions from NWS Aviation Weather Center (flight categories) + FAA METAR/SPECI criteria; M98 floors from the MSP-M98 LOA (CRO 2,200/5) and SOP 7-1 / LOA 11 (17-22 → 1,400/4). Live config/weather: `atis.info/api/KMSP` (MSP D-ATIS only) and `aviationweather.gov/api/data/metar?ids=KMSP,KFCM,KSTP,KMIC,KANE,KLVN` (all fields' METARs — same-time snapshot; SPECI → wait and re-pull all).*
