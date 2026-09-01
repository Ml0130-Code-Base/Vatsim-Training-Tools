# Claude Code Brief — Upgrade `m98-training-review.html`

You are improving a self-contained training tool for a VATSIM virtual air traffic control trainee working toward M98 TRACON (Minneapolis approach) certification. A full source audit just recovered a large amount of procedural data that the tool and its reference layer never had. Your job: fold it in.

## 1. What the tool is

- **One HTML file, no build step, no server.** Everything inline: CSS (IBM Plex Mono aesthetic, CSS variables like `--ink`, `--dim`, `--amber`, `--green`, `--red`), JS, and SVG diagrams.
- **Module architecture:** each module covers one recurring training issue and has two panels — **narrated mode** (`panel-narrated`: explanation, SVG diagrams for spatial topics, "Show debrief" reveals) and **drill mode** (`panel-drill`: a live situation the user works, with a coached debrief).
- **AI coach calls:** drill mode calls the Anthropic API (`https://api.anthropic.com/v1/messages`, model `claude-sonnet-4-6`, no API key passed — handled by the platform) for coach replies (`coach-reply` elements). **Preserve this pattern**; degrade gracefully (narrated mode fully usable) if the call fails.
- Existing modules (current known set): Departure Dispersal Area transit · scan discipline · tunnel vision · clearance completeness · Shoreview MVA · phraseology · a gate quick-reference panel and GATE knowledge module.
- **Version check first:** an older copy of the file opens with "Six issues, seven sessions" and predates the GATE module. Confirm you were handed the *latest* copy before editing; if the GATE module is absent, flag it rather than silently rebuilding it.

## 2. Inputs in this package (authoritative order)

1. `claude_M98_MD_Gap_Analysis.md` — the audit. Read it first; it explains where every number below came from.
2. The **updated reference markdowns** — treat these as the data source of truth for module content:
   - `claude_MSP_SID_Reference.md` (now includes: dispersal-area verticals, initial-altitude/seat table, full heading-coordination set, non-SID Table 1, control-for-turns, departure-gate letters, midnight departures)
   - `claude_MSP_STAR_Reference.md` (now includes: the authoritative nine-point lateral boundary ring, the two previously missing feeder-floor configs, full feeder split, crossover fine print, turn-on mechanics, 17-22 crossover matrix, RST pointer)
   - `claude_M98_Config_Reference.md` (now includes: midnight operations, opposite-direction rules, 17-22 spacing regimes and LAHSO weather, edge rules)
   - `claude_M98_Coordination_Reference.md` (now includes: control-for-turns, go-around protections, cross-boundary automated point-outs, opposite-direction initiation)
   - `claude_M98_Satellite_Reference.md` (**contains a data correction — see §3.1**)
   - `claude_M98_Satellite_Tower_Interface.md` (**new**)
   - `claude_M98_RST_Reference.md` (**new**)
3. §6 below — a JSON payload of the key tables so you don't have to re-parse prose.

## 3. The work, in priority order

### 3.1 Data corrections (do first — these are bugs)
- **Crystal (MIC) runway inventory anywhere it appears:** correct set is **Runway 14/32 (single) + parallel 6L/24R and 6R/24L**. The old 14R/32L is permanently closed (now Taxiway G). Any diagram, drill scenario, or reference text showing parallel 14s/32s at MIC is wrong.
- Wherever the tool states or implies the dispersal area is just "tower's airspace" with no numbers, attach the vertical-ownership data (§6 `dda_verticals`).

### 3.2 Upgrade the Departure Dispersal Area module (highest training value)
- **Narrated:** add a side-view altitude-slice SVG — dispersal area surface→7,000; FCM/MIC cutouts 3,500→7,000; extensions 4,000→7,000; the 35-12 ACDA cutout surface→5,000. Teach the operational meaning: the cutouts are the *only* legal under-path near FCM/MIC; the VFR-transit-outside-Bravo rule; the loiter exception.
- **Drill:** scenarios that force the vertical question — e.g., a satellite arrival at 3,000 near the FCM cutout (legal) vs. at 4,000 (inside tower's airspace → point-out or reroute); a VFR photo mission wanting to loiter (must be coordinated).

### 3.3 Upgrade the Shoreview MVA module
- Embed the obstruction table (§6 `obstructions`) and plot the Arden Hills/Shoreview Antennas at **MSP 018011, 2,438 ft** on the module's SVG relative to the STP Runway 14 final. The narrated payoff: the trainer's "3,500 until established" rule now has a visible 2,438-ft reason.
- Drill: an STP ILS 14 arrival being descended on base — the correct answers are hold 3,500 until established, or widen the base.

### 3.4 New module — "Initial altitudes and seat routing"
- Source: `initial_altitudes` in §6. Narrated: the 2×3 table plus the rule that low-filers and pistons off MSP go to the **Satellite** seat at 4,000. Drill: flash a filed altitude + aircraft type, user names initial altitude **and** the working position (D/R/L vs E/G/K). Include the satellite-tower initial altitudes (`satellite_towers.initial_altitudes`) as a second drill deck.

### 3.5 New module — "Satellite tower interface"
- Source: `claude_M98_Satellite_Tower_Interface.md`. Narrated: run-down list mechanics + list IDs, standard headings, missed-approach table **including the MIC 320°/3,000 unplanned asymmetry**, the three standing tower authorities (overflights ≥3,000, FCM side-step, STP runway interchange). The tool already has `rundown-table` styling — reuse it.
- Drill: a release exchange (user issues via the correct list ID and heading band), and a surprise unplanned missed approach where the user must state the correct field-specific heading/altitude.

### 3.6 New module — "RST Tower Enroute"
- Source: `claude_M98_RST_Reference.md`. Narrated: the entry table by MSP configuration (the **props-to-Satellite-at-7,000 in a 30s flow** trap gets emphasis), the KASPR 4 NM / 7 NM-east corridor, closed-RST fallbacks. Drill: given a configuration and aircraft type, user states entry altitude + receiving position/frequency; a second shape checks a departure against the KASPR corridor.

### 3.7 New module — "Midnight operations"
- Source: `midnight_ops` in §6. The user works overnight (19:30–06:00), so this regime is what live monitoring will actually show. Narrated: the 124.7 collapse, direct-destination/pilot's-discretion-to-10,000 arrivals, first-fix departures, quiet-hours runway preference order, the Runway 17 → 3.03 DME → 230° procedure, the 15-minute-relay/5-minute-delay opposite-direction trigger. Drill: an overnight arrival/departure pair worked entirely under this regime.

### 3.8 Optional (if scope allows) — 17-22 spacing-regimes panel
- Two-regime card: LAHSO active (17 = 4 miles at touchdown / 22 = 6) vs. CRDA (both 6, 22 within ½ NM of the ghost-gap middle at the FAF), plus the Departure Decision Area timing rule. Data in §6 `seventeen_twentytwo`.

### 3.9 Gate module refresh
- If the GATE module exists, extend its gate set with **ABR** and **ONL/FOD** (they were missing from the SID-derived list) and wire in the APO scratchpad letters (§6 `apo_gate_letters`).

## 4. Hard constraints

1. **Single file, offline-first.** No new external dependencies beyond what's already loaded (fonts). All new data embedded.
2. **Preserve the existing module architecture and CSS variables.** New modules follow the narrated/drill panel pattern exactly.
3. **Full terminology.** Spell out module names and terms; use only abbreviations already established in the reference set (DDA, ACDA, MVA, LOA, SOP, CRO, LAHSO, CRDA, APO, MIT, RUS). Define any of these on first use inside a module. **Never invent new abbreviations.**
4. **TTS voicing for any string that gets read aloud** (coach speech, radio calls): runway designators expand to digits + full word ("three zero left", never "30L" in spoken strings; visual labels may keep 30L); airline flight numbers grouped in twos ("Endeavor forty-five fifty-five"); N-numbers digit-by-digit with ICAO phonetics, "November" + last three after two-way contact; **"zero" never "oh"**; SID phonetics per the voicing file (Kay-Brew, Or-skee, Rochester, Shepp, Wellstone, Zum-bro, Coult, Smurf, Liney).
5. **Coach behavior in drill mode:** the coach must never complete or approve a coordination call the student hasn't finished — voice only the acknowledgment ("go ahead") until the student states the actual request. Never manufacture a conflict; the geometry must genuinely support it.
6. **Citation discipline:** every procedural value shown in narrated mode names its governing document (e.g., "MSP-M98 LOA 5.a", "M98 7110.26A 4-4c"). If the module can't cite it, it doesn't ship.
7. Keep the file marked **FOR SIMULATION USE ONLY** where the existing tool does.

## 5. Acceptance checklist

- [ ] MIC runway data corrected everywhere (search the file for `14L`, `14R`, `32R`, `32L` in MIC context).
- [ ] Dispersal-area module shows the four vertical slices with correct numbers and a cutout drill.
- [ ] Shoreview module plots MSP 018011 / 2,438 ft and drills the 3,500 rule.
- [ ] Initial-altitude drill covers all six MSP cells + the four-field satellite table, and asks for the seat, not just the altitude.
- [ ] Satellite-interface drill uses the correct list ID and rejects out-of-band headings; the MIC 3,000 unplanned-miss asymmetry is a drillable question.
- [ ] RST module drills the props-at-7,000-to-Satellite trap.
- [ ] Midnight module states 124.7 as the collapse frequency (not 135.475).
- [ ] Every spoken-string runway/callsign follows the voicing rules; no "oh" anywhere.
- [ ] File still opens and runs fully offline with the API unavailable (narrated modes intact, drills degrade with a clear message).
- [ ] No new abbreviations introduced.

## 6. Structured data payload

```json
{
  "dda_verticals": {
    "dispersal_area": {"floor_ft": 0, "ceiling_ft": 7000, "owner": "MSP tower", "source": "MSP-M98 LOA 5.a(3)"},
    "fcm_mic_cutouts": {"floor_ft": 3500, "ceiling_ft": 7000, "note": "satellite owns below 3,500 within the cutouts", "source": "MSP-M98 LOA 5.a(3)"},
    "dda_extensions": {"floor_ft": 4000, "ceiling_ft": 7000, "source": "MSP-M98 LOA 5.a(4)"},
    "rwy35_12_acda_cutout": {"floor_ft": 0, "ceiling_ft": 5000, "source": "MSP-M98 LOA 5.a(5)"},
    "vfr_transit": {"rule": "VFR not on an instrument approach may transit the DDA outside Class B without coordination; loitering aircraft (photo/tour/survey) must be individually coordinated; M98 assumes separation with MSP departures", "source": "MSP-M98 LOA 5.a(7)"}
  },
  "initial_altitudes": {
    "msp": {
      "filed_9000_or_above": {"jet": {"alt": 7000, "seat": "D/R/L"}, "turboprop": {"alt": 5000, "seat": "D/R/L"}, "piston": {"alt": 4000, "seat": "E/G/K"}},
      "filed_8000_or_below": {"jet": {"alt": 4000, "seat": "E/G/K"}, "turboprop": {"alt": 4000, "seat": "E/G/K"}, "piston": {"alt": 4000, "seat": "E/G/K"}},
      "source": "MSP-M98 LOA 8.h / MSP 7110.26G 3-2-3"
    },
    "non_advertised_runways": {
      "rwy4": {"alt": 4000, "heading": "040", "freq": "121.2", "coordinate": "G Satellite + STP tower", "source": "MSP-M98 LOA 8.i(1)"},
      "rwy22": {"alt": 3000, "heading": "DDA heading", "then": "climb per 8.h once inside the DDA", "source": "MSP-M98 LOA 8.i(2)"}
    }
  },
  "obstructions": [
    {"name": "Big Lake Tower", "fix": "MSP323036", "elev_ft": 2454},
    {"name": "Nowthen Tower", "fix": "MSP343028", "elev_ft": 2048},
    {"name": "Arden Hills/Shoreview Antennas", "fix": "MSP018011", "elev_ft": 2438, "note": "the recurring MVA trap near the STP Runway 14 final; also a VFR checkpoint from MIC (10.5E) and STP (7NW)"},
    {"name": "St. Paul Tower", "fix": "MSP013007", "elev_ft": 1539, "video_map": false},
    {"name": "Meriden Tower", "fix": "MSP184051", "elev_ft": 1830, "video_map": false},
    {"name": "Rosemont Tower", "fix": "MSP144014", "elev_ft": 1753},
    {"name": "IDS Building", "fix": "MSP338005", "elev_ft": 1743}
  ],
  "midnight_ops": {
    "window_local": "2230-0530 (ZMP-M98 LOA §5, when coordinated); quiet hours 2230-0600",
    "arrivals": {"routing": "direct destination", "descent": "pilot's discretion to 10,000 for traffic at/above 10,000; at/below 10,000 remain at altitude", "frequency": "124.7 MSP_R_APP for ALL arrivals"},
    "departures": {"clearance": "via first fix in the route", "climb": "turboprops/props to 17,000 or lower on request", "coordination": "point out to affected Center positions"},
    "rus_preference": ["Land 30s - Depart 12s", "Land 35 - Depart 12s OR Land 30s - Depart 17", "straight 12s", "straight 30s"],
    "rwy17_procedure": {"rule": "runway heading to 3.03 DME (MSP VOR), then 230", "typical_window": "0015-0530", "note": "departure control may turn on course on initial contact"},
    "odo_triggers": {"relay_min": 15, "runway_delay_min": 5, "action": "coordinate possible change to the crossed-runway operation", "config_definition": "the advertised landing runway defines the configuration"}
  },
  "satellite_towers": {
    "list_ids": {"ANE": "PO", "FCM": "PF", "MIC": "PM", "STP": "PP"},
    "frequencies": {
      "ANE": {"gc_cd": "121.85", "lc": "132.4", "atis": "120.625"},
      "FCM": {"gc_cd": "121.7", "lcs_primary": "119.15", "lcn": "125.2", "atis": "124.9"},
      "MIC": {"gc_cd": "121.6", "lc": "120.7", "atis": "124.475"},
      "STP": {"gc_cd": "121.675", "lc": "119.1", "atis": "118.35"}
    },
    "initial_altitudes": {
      "ANE": {"all": 3000},
      "FCM": {"10L_10R_36": 2500, "28L_28R_18": 3000},
      "MIC": {"all": 3000},
      "STP": {"13_14": 2500, "32": 3000}
    },
    "standard_headings": {
      "ANE": "270 clockwise to 090 (Runway 18: right turn)",
      "FCM": "180 clockwise to 300 (Runway 10 departures: right turns unless coordinated)",
      "MIC": "320 all runways",
      "STP": {"32": "030-045", "13_14": "010-080"}
    },
    "missed_approaches": {
      "m98_issued": {"ANE": "360/2500", "FCM": "230/2500", "MIC": "320/2500", "STP": "060/2500"},
      "tower_unplanned": {"ANE": "360/2500", "FCM": "230/2500", "MIC": "320/3000", "STP": "060/2500"},
      "asymmetry": "MIC unplanned = 3,000, not 2,500 - drillable"
    },
    "standing_authorities": [
      "overflights at/above 3,000 MSL transit tower airspace without prior coordination (must be displayed or verbally coordinated)",
      "FCM may side-step/circle arrivals to any non-opposite runway without coordination (FCM takes separation)",
      "STP may interchange Runway 31 with 32 and Runway 13 with 14 on landing clearances"
    ],
    "visual_advertising_minima": {"FCM": "vis >= 7, ceiling >= 2100 AGL", "MIC": "vis >= 7, ceiling >= 2200", "STP": "vis >= 7, ceiling >= 2300 (advise M98 on crossings either way)"},
    "hard_limits": ["STP Runway 31 not available for IFR departures", "STP Runway 13 clear zone must be clear during a Runway 13 approach"],
    "mic_corrections": {"runways": ["14/32", "6L/24R", "6R/24L"], "closed": "14R/32L permanently closed, now Taxiway G", "class_d": "3.8 NM radius, surface to 2,500 AGL (3,369 MSL)", "helipad": "MY77 North Memorial Hospital, 3.7 NM SSE"}
  },
  "rst": {
    "assignment": {"BLUEM": "all capable turbojets", "KASPR": "other turbojets (verbally coordinated) + turboprops capable of 200 kt IAS or greater"},
    "entry_by_config": [
      {"config": "Landing 12L/R", "alt": 9000, "to": "Feeder 135.47", "who": "jets and props"},
      {"config": "Landing 30L/R", "alt": 7000, "to": "Satellite 134.7", "who": "props", "trap": true},
      {"config": "Landing 30L/R", "alt": 9000, "to": "Feeder 135.47", "who": "jets"},
      {"config": "Landing 30L/R departing 17", "alt": 9000, "to": "Feeder 135.47", "who": "jets and props"},
      {"config": "Landing 35", "alt": 7000, "to": "35 Arrival 118.72", "who": "jets and props"},
      {"config": "Landing 4", "alt": 8000, "to": "Feeder", "who": "all 200-kt-capable"},
      {"config": "Landing 17 or 22", "alt": 9000, "to": "Feeder", "who": "all 200-kt-capable"}
    ],
    "kaspr_corridor": {"normal_nm_each_side": 4, "east_side_landing_35_nm": 7},
    "m98_to_rst": {"altitudes": [3000, 5000, 7000, 9000], "frequencies": ["119.8", "119.2"], "rule": "7,000/9,000 traffic clear of (parallel to or diverging from) the KASPR STAR"},
    "transfer_authority": "receiving facility may alter course up to 30 degrees either side of track; BLUEM arrivals transferred before crossing BLUEM",
    "rst_closed": {"owner": "ZMP Sector 7", "kaspr_turboprops": "cross DELZY at 7,000", "pistons": "exit RST airspace at 6,000", "source": "ZMP-M98 LOA 4.g(16)"}
  },
  "apo_gate_letters": {"E": "EAU", "D": "DLL", "N": "ODI", "B": "BRD/DLH", "R": "RST", "F": "FAR", "A": "ABR", "O": "ONL/FOD", "format": "gate letter + two-digit altitude in thousands, e.g. B12", "stc_mkt_rule": "STC/MKT-tagged aircraft presumed descending to 4,000", "source": "M98 7110.26A 3-3a"},
  "table1_non_sid_headings": [
    {"sector": "10", "position": "west of GEP/BAINY", "band": "290-300"},
    {"sector": "10", "position": "east of GEP/BAINY", "band": "350-020"},
    {"sector": "09", "position": "north of ENCEE", "band": "265-285"},
    {"sector": "08", "position": "south of TORGY", "band": "210-240"},
    {"sector": "07", "position": "east of KASPR/BLUEM", "band": "140-160"},
    {"sector": "RWA", "position": "south of KKILR", "band": "100-130"},
    {"sector": "06", "position": "north of AGUDE", "band": "040-060"}
  ],
  "seventeen_twentytwo": {
    "spacing_lahso_active": {"rwy17_at_touchdown_nm": 4, "rwy22_at_touchdown_nm": 6, "source": "MSP-M98 LOA 11.b"},
    "spacing_crda": {"both_at_touchdown_nm": 6, "rwy22_ghost_gap_rule": "within 0.5 NM of the middle of the gap between ghost targets at the FAF", "ghosts": "always displayed on the Runway 22 final", "source": "M98 7110.26A 7-4"},
    "lahso_weather": {"rwy22": "ceiling >= 1400, vis >= 4, ALD 8550 ft", "rwy30L": "ceiling >= 1000, vis >= 3, ALD 8150 ft", "conditions": "dry uncontaminated runway, tailwind < 3 kt, no wind shear, JO 7360.1 groups only"},
    "departure_decision_area": {"definition": "quarter-mile final on Runway 22 to nosewheel touchdown", "rule": "no Runway 17 takeoff clearance while the 22 LAHSO arrival is inside; the 17 departure must be rolling before the 22 arrival reaches quarter-mile final", "landmark": "Highway 62 / Highway 55 interchange = quarter-mile final"},
    "crossover_matrix": [
      {"arrival": "NITZR", "handoff": "depart SAVVG heading 020", "jets_ft": 11000, "turboprops_ft": 9000},
      {"arrival": "DELZY", "handoff": "depart SAVVG heading 020", "jets_ft": 10000, "turboprops_ft": 9000},
      {"arrival": "TORGY", "handoff": "depart HDEEE heading 090", "jets_ft": 11000, "turboprops_ft": 9000}
    ],
    "off_star_within_10nm": {"NITZR_jets": 11000, "BLUEM_jets": 10000, "TORGY_jets": 11000},
    "flows": {"rwy22": "left traffic, North Local 123.95 when split", "rwy17": "right traffic, West Local 123.67 when split"},
    "go_arounds": "right turn, return to Runway 17 regardless of assigned runway (traffic permitting)"
  },
  "m98_boundary_ring": ["MSP295041", "MSP338039", "MSP029040", "MSP077037", "MSP118040", "MSP158040", "MSP196039", "MSP230037", "MSP254040"],
  "feeder_floor_additions": {
    "land_30s_and_35": {"NITZR_BLUEM": "straight in to 35 Arrival", "KKILR_MUSCL_parallels": 7000, "KKILR_MUSCL_to_35_arrival": 9000, "far_gates": 8000, "NITZR_BLUEM_to_south_arrival": 7000, "source": "M98 7110.26A 4-4c(7)"},
    "land_35_depart_12s": {"NITZR_BLUEM": "straight in to 35 Arrival", "all_others": 8000, "acda_split": "North Arrival west of localizer including NITZR/TRGET and BLUEM/DELZY; South Arrival east", "source": "M98 7110.26A 4-4c(8) / 4-2d"}
  },
  "feeder_split_by_config": {
    "12s_and_30s_families": {"north": ["BAINY", "MUSCL", "KKILR"], "south": ["NITZR", "BLUEM", "TORGY"]},
    "4_22": {"north": ["BAINY", "TORGY"], "south": ["MUSCL", "KKILR", "NITZR", "BLUEM"]},
    "30s_plus_35": {"north": ["BAINY", "MUSCL", "KKILR"], "south": ["TORGY"]},
    "35_configs": {"north": ["BAINY", "TORGY"], "south": ["MUSCL", "KKILR"]},
    "17": {"north": ["TORGY"], "south": ["MUSCL", "KKILR", "NITZR", "BLUEM"]},
    "boundary": "the Runway 30L/12R (or 4/22) localizer - one runway south of the ACDA split line",
    "source": "M98 7110.26A 4-4d"
  }
}
```

*All values verified against the March 31, 2026 revisions (MSP 7110.26G CHG 1, M98 7110.26A, MSP-M98 LOA, ZMP-M98 LOA, M98-RST LOA) and the November 30, 2025 satellite documents. If a value here disagrees with the tool's existing content, this payload wins — and the governing document citation travels with it.*
