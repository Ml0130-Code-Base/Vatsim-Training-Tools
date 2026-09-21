# ZMP vATIS Profile — advertised runway flows, ARTCC-wide

**Source:** the Minneapolis ARTCC's published vATIS profile, `updateSerial` **2026012401**.
**FOR SIMULATION USE.** Pulled and transcribed 2026-09-21.

```bash
curl -sL -o "vATIS Profile - ZMP.json" \
  https://github.com/minneapolis-artcc/vatis/releases/latest/download/vATIS.Profile.-.ZMP.json
```

| | |
|---|---|
| profile name | `ZMP` |
| profile id | `96b18e86-f518-48a0-8066-68c2a69f9ae5` |
| `updateSerial` | **2026012401** |
| stations | 18 — 1 Arrival, 1 Departure, 16 Combined |
| presets | 134 |
| size / md5 | 1,223,367 bytes · `2ab4ecaacfd6ee65bd56963eae9e7994` |

**The bytes are not committed**, per root `CLAUDE.md` §6 — the invariant is that the pull is
reproducible, and this one is a stable public release URL. `updateSerial` is the citation the way
a CIFP cycle is: quote **vATIS ZMP 2026012401**, not "vATIS". **The URL is `/latest/`, so it moves.**
A future pull that returns a different serial is a new revision, not a failed pull, and the
differences are a finding to record rather than to overwrite.

---

## 1. What this source can and cannot answer

It is the **ATIS composition config** the vARTCC ships to controllers — what each tower
*advertises*, in the exact words it broadcasts. That makes it authoritative for one question and
silent on several others, and the distinction is the whole reason it is filed separately rather
than folded into the facility references.

**It answers:**

- **Which runway configurations each field actually advertises**, by name, and in VMC and IMC.
- **Which runways are landed and which are departed** in each, verbatim.
- **Which approach is in use** in each IMC configuration.
- **The literal broadcast text** the D-ATIS parser has to read — see §3.

**It does not answer, and must not be read as answering:**

- **Which runway transition ZMP assigns.** That is ZMP-M98 LOA Table 2's job and nothing else's.
  A field advertising a configuration says nothing about what Center does with the arrivals into
  it — which is exactly why issue #15 stays open on `4`, `22` and `4-35` even though this profile
  carries all three.
- **Any geometry.** No boundaries, no fixes, no altitudes. Root `CLAUDE.md` §7 is untouched.
- **What is actually in use right now.** A preset is an option, not a state.
- **Wind or configuration selection rules.** Flow follows the weather (MSP-M98 LOA 9,
  Attachment 7 Runway Use Wind Charts), and those charts are not in this file.

---

## 2. KMSP — and the two-ATIS model this file settles

**MSP runs two separate ATIS**, and the profile carries them as two stations: an **Arrival** ATIS
with **9 configurations** and a **Departure** ATIS with **8**. Both are advertised independently.

### Arrival ATIS — the nine configurations, verbatim

| Config | VMC `airportConditions` | IMC `airportConditions` |
|---|---|---|
| **12** | VIS RWY 12R APCH IN USE, VIS RWY 12L APCH IN USE. FINAL APCH, OVER NOISE-SENSITIVE AREA. | SIMUL DEPENDENT, ILS RWY 12R APCH IN USE, ILS RWY 12L APCH IN USE. FINAL APCH, OVER NOISE SENSITIVE AREA. |
| **12-17** | *(identical to 12)* | *(identical to 12)* |
| **30** | VIS RWY 30L APCH, VIS RWY 30R APCH IN USE. | SIMUL DEPENDENT, ILS RWY 30L APCH IN USE, ILS RWY 30R APCH IN USE. |
| **30-17** | VIS RWY 30L APCH IN USE, VIS RWY 30R APCH IN USE. | *(identical to 30)* |
| **30-35** | VIS RWY 30L APCH IN USE, VIS RWY 30R APCH IN USE, VIS RWY 35 APCH IN USE. SIMUL OPS ON CONVERGING RWYS IN USE. | SIMUL DEPENDENT, ILS RWY 30L APCH IN USE, ILS RWY 30R APCH IN USE, **ILS \*V RWY 35** APCH IN USE. SIMUL OPS ON CONVERGING RWYS IN USE. |
| **17-22** | VIS RWY 17 APCH IN USE, VIS RWY 22 APCH IN USE. SIMUL OPS ON CONVERGING RWYS IN USE. | **LOC RWY 17** APCH IN USE, **LOC RWY 22** APCH IN USE. SIMUL OPS ON CONVERGING RWYS IN USE. |
| **4-35** | VIS RWY 35 APCH IN USE. | **ILS \*Z RWY 35** APCH IN USE. |
| **4** | VIS RWY 4 APCH IN USE. | **LOC RWY 4** APCH IN USE. |
| **22** | VIS RWY 22 APCH IN USE. | **LOC RWY 22** APCH IN USE. |

**Note the arrival ATIS never mentions a departure runway.** `12-17` and `30-17` are identical to
`12` and `30` on the arrival side, because the 17 in those names is a *departure* runway. The
configuration names are not consistently "landing flow" — but the advertised **content** is.

### Departure ATIS — eight configurations, verbatim

| Config | `airportConditions` |
|---|---|
| **12** | DEPTG RWY 12L, RWY 12R. |
| **12-17** | DEPTG RWY 12L, RWY 12R, RWY 17. |
| **30** | DEPTG RWY 30L, RWY 30R. |
| **30-17** | DEPTG RWY 30L, RWY 30R, RWY 17. |
| **17-22** | DEPTG RWY 12R, RWY 17. |
| **4-35** | DEPTG RWY 4 **\*S INTERSECTION, \*9400 FT AVBL**. |
| **4** | *VIS RWY 4 APCH IN USE,* DEPTG RWY 4. |
| **22** | DEPTG RWY 22. |

**There is no `30-35` departure preset.** A 30-35 departs 30L/30R, which is the `30` departure
preset — the same string. Recorded rather than treated as missing data.

### The finding: `30/12` is a pairing, not a preset

**Neither ATIS has a `30/12` preset, and that is the point.** A land-30s/depart-12s operation is
advertised as **Arrival `30` paired with Departure `12`** — two independent broadcasts. The same
holds for the other opposite-direction sets: *Land 35 – Depart 12L/R* (MSP-M98 LOA 9.g.1(b)) is
Arrival `4-35` paired with Departure `12`.

**This is a third, independent confirmation of the landing-flow rule** that resolved `30/12` on
2026-09-21 (owner; MSP-M98 LOA 9.h.1(b); and Table 2's internal shape — full chain in
`ZMP/M98 Training/claude_ZMP_Reference.md`). In a 30/12 the arrival controller's ATIS **literally
reads `30`**, so "the advertised landing runway must be considered the configuration" is not only
a rule in 9.h.1(b) — it is a mechanical consequence of MSP running two ATIS. `claude_M98_Config_Reference.md`
had already described the pairing in prose; this file is the machine-readable proof of it.

**It still does not resolve `4`, `22` or `4-35`.** Those are advertised arrival configurations
with no Table 2 row, and what ZMP assigns into them remains issue #15.

### Cross-check against `claude_M98_Config_Reference.md`

**All nine configurations agree on every field** — landing runways, departure runways, VMC and IMC
approach types, the CRO pairs and their converging-runway wording. That is a second independent
source confirming a transcription made from the facility orders, and it needed no corrections.

**Two facts this source adds that the orders did not give us:**

1. **`4-35` departs Runway 4 from the S intersection with 9,400 ft available.** The Config
   reference had "4 (S intersection)" and no distance.
2. **`30-35` has no departure preset of its own**, per above.

---

## 3. What this validated in the tool

The M98 deck's D-ATIS parser has to read these strings off a live broadcast. **All nineteen
pairings were run against the verbatim `airportConditions` above** — nine arrival configurations
in VMC, seven in IMC, plus both opposite-direction pairings — and every one resolved to the right
configuration and the right landing-runway list. No parser changes were needed.

Two behaviours worth recording because they were already right:

- **Arrival `30` + Departure `12` resolves to `30/12`**, which is the pairing model above.
- **Arrival `4-35` + Departure `12` resolves to `4-35`** — an unknown pairing falls back to the
  **arrival** configuration. The parser has implemented the landing-flow rule since before it was
  stated, which is a fourth corroboration of it.

### And one real defect it found — R90 and ZMP, fixed 2026-09-21

R90 and ZMP Center share a different D-ATIS reader from M98's, copied byte for byte between them.
Run against this profile's verbatim strings, **eleven of KOMA's twelve published configurations
parsed to nothing.**

The cause is worth keeping, because the failure was silent. The reader knew two shapes — a bare
list between the approach word and the phrase (`VISUAL APCH 14R, 14L, 18 IN USE`, which is how the
**FAA feed** writes KOMA) and a keyed list before the approach word (`ILS RWY 36 APCH IN USE`). The
**vATIS** writes a third: a *keyed* list *between* them — `VIS APCH RWY 14L, 14R IN USE`. With a
keyword sitting between `APCH` and `IN USE`, the two are no longer adjacent, so the `IN_USE` test
could not fire either; nothing marked the sentence as landing or departing and it was dropped
whole rather than half-read.

**The distinction that matters: the trainee works the sim, so the vATIS wording is the one they
paste.** The FAA feed and the sim broadcast are different text for the same field, and a reader
built only against the first is built against the wrong one.

The fix makes the runway keyword optional in that position. Verified on the real pages: all twelve
KOMA configurations now read, all five documented real-world forms still read (KOMA's own bare
list, KMSP, KMDW, KBOI, and the closed-runway guard that keeps ORD's out-of-service runways out of
the landing set), and all seven MSP departure strings resolve into the departure list rather than
the landing one. Twenty-two ZMP-area field strings read correctly end to end.

**Four more copies of this reader exist and were NOT changed** — C90 and AZO under `ZAU/`, S56 and
Big Sky under `ZLC/`. They are byte-identical to the pre-fix version. Root `CLAUDE.md` §14 keeps a
commit inside one ARTCC, so those are their own commits; and each wants checking against its own
vARTCC's vATIS profile, which has not been pulled. **Until then the six copies are not in sync**,
and that is recorded here rather than left to be discovered.

---

## 4. The M98 satellite fields

Verbatim. These are the towered satellites inside M98's airspace; see
`ZMP/M98 Training/claude_M98_Satellite_Towers_Reference.md` for the interface rules.

**KANE — Anoka County-Blaine**

| Preset | `airportConditions` |
|---|---|
| VMC 9 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RWY 9. |
| VMC 27 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RWY 27. |
| VMC 36 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RWY 36. |
| VMC 36/27 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RUNWAYS 36 AND 27. |
| VMC 18/9 | VISUAL APPROACHES IN USE. LANDING AN DEPARTING RUNWAYS **19** AND 09. |
| IMC 9 | RNAV GPS 09 APPROACH IN USE. LANDING AND DEPARTING RWY 9. |
| IMC 18 | RNAV GPS 18 APPROACH IN USE. LANDING AND DEPARTING RUNWAY 18. |
| IMC 27 | INSTRUMENT APPROACHES IN USE. LANDING AND DEPARTING 27. |

**KFCM — Flying Cloud**

| Preset | `airportConditions` |
|---|---|
| VMC 28/36 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RUNWWAYS 28L, 28R, 36. |
| VMC 10/18 | VISUAL APPROACHES IN USE. LANDING ANDE DEPARTING RUNWAYS 10L, 10R, 18. |
| IMC 28 | RNAV APPR TO RWYS 28L AND 28R IN USE. LANDING AND DEPARTING RWY 28L AND RWY 28R. **CIRCLE TO LAND RWY 36.** |
| IMC 10R | ILS OR RNAV APPROACH RWY 10R IN USE. **LANDING RWY 10R. DEPARTING RWY 10L, 10R.** |

**KMIC — Minneapolis Crystal**

| Preset | `airportConditions` |
|---|---|
| 14 VMC | VISUAL APPROACH IN USE. LANDING AND DEPARTING RUNWAY 14. |
| 32 VMC | VISUAL APPROACH IN USE. LANDING AND DEPARTING RWY 32. |
| 14 IMC | RNAV APPROACH IN USE. LANDING AND DEPARTING RWY 14. |
| 32 IMC | RNAV APPROACH IN USE. LANDING AND DEPARTING RUNWAY 32. |

**Only 14/32 is advertised at MIC** — the 6L/24R and 6R/24L parallels appear in no preset. That
agrees with the runway-inventory correction already recorded for MIC, from a second direction.

**KSTP — St. Paul Downtown**

| Preset | `airportConditions` |
|---|---|
| VMC 14 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RWYS **14, 13, 9**. |
| VMC 32 | VISUAL APPROACHES IN USE. LANDING AND DEPARTING RWYS **32, 31, 27**. |
| IMC 14 | INSRTUMENT APPROACHES IN USE. LANDING AND DEPARTING RWY 14. |
| IMC 32 | INSTRUMENT APPROACHES IN USE. LANDING AND DEPARTING RWY 32. |

**St Paul works three runways in VMC and one in IMC.** Worth knowing before a Satellite-seat drill
puts a single runway on the field.

---

## 5. Fields outside M98

**KOMA — Eppley Airfield (R90's primary field).** Six configurations, VMC and IMC:

| Preset | VMC | IMC |
|---|---|---|
| **14** | VIS APCH RWY 14L, 14R IN USE. | ILS APCH RWY 14L, 14R IN USE. |
| **14/18** | VIS APCH RWY 14L, 14R, 18 IN USE. | ILS APCH RWY 14L, 14R, 18 IN USE. |
| **18** | VIS APCH RWY 18 IN USE. | ILS APCH RWY 18 IN USE. |
| **32** | VIS APCH RWY 32L, 32R IN USE. | ILS APCH RWY 32L, 32R IN USE. |
| **32/36** | VIS APCH RWY 32L, 32R, 36 IN USE. | ILS APCH RWY 32L, 32R, 36 IN USE. |
| **36** | VIS APCH RWY 36 IN USE. | ILS RWY 36 APCH IN USE. |

**This is the first flow data R90 has.** Its airport inventory came only from vNAS, and its
combining table is a picture (issue #30). A configuration selector for KOMA is now buildable from
a cited source — but **none of it says which transition ZMP assigns into Omaha**, which is R90's
own version of issue #15 and is not answered here.

**KLNK — Lincoln.** `NORTH VMC` / `NORTH IMC` / `SOUTH IMC` are all **empty**; only `SOUTH VMC` is
filled: *"VIS APCH RWY 18 IN USE. ARR/DEP RWY 18 AND 17."* Named NORTH/SOUTH rather than by runway,
the same shape as KGRB and KFSD. **Runway 17 checks out** against `LNK 7110.6A 4.a/4.b/5.b`, which
gives Lincoln 14, 17, 18, 32, 35 and 36 — the inventory R90's deck already carried.

**The OMA cross-check passed exactly, and the deck now computes it.** R90 groups its departure
headings into north and south profiles (`DEP_HEADINGS`, OMA 5.c.4): north **32L 32R 36**, south
**14R 14L 18**. The union of the runways this profile advertises in its north configurations
(`32`, `32/36`, `36`) is **32L 32R 36**, and in its south configurations (`14`, `14/18`, `18`) is
**14L 14R 18**. Two independent sources, identical sets. The R90 deck renders that comparison
rather than asserting it, so it will say so on the page if either table is edited and they stop
agreeing — and it distinguishes a **subset** (LNK SOUTH names 18 and 17 where the profile also
carries 14 — not a conflict) from a real disagreement.

**KRST — Rochester.** Eight presets, of which only two carry text: `13 IMC` *"ILS RWY 13 APCH IN
USE. ARR/DEP RWY 13 AND 20."* and `31 IMC` *"ILS RWY 31 APCH IN USE, ARR AND DEP RWY 31."* The four
VMC presets and both Runway 2/20 presets are empty. Relevant to the M98/RST interface
(`claude_M98_RST_Reference.md`) only as advertised flow; the delegation rules are unaffected.

**The rest**, in brief — KDLH (9/27/3/21, ILS on 9 and 27, RNAV on 3 and 21), KDSM (13/31/5/23),
KBIS (13/31), KFAR (18/36 with 9 and 27 crosswind combinations, 15 of 16 presets empty), KGRB
(NORTH = RWY 6 + 18; SOUTH = RWYS 18 + 24), KFSD (3/21/15/33 IMC, `VMC S-E` and `VMC N-W`), KSUX
(13/31), KATW (30/12/3/21), KALO (12/18/30/36).

---

## 6. As-written anomalies, preserved rather than corrected

Root `CLAUDE.md` §6: anomalies are recorded, not fixed. These are all in the published profile.

- **KANE `VMC 18/9`** reads *"LANDING AN DEPARTING RUNWAYS **19** AND 09"* — the preset is named
  18/9, KANE has no Runway 19, and "AN" is missing its D. The preset name is the reliable half.
- **KFCM `VMC 28/36`** reads *"RUNWWAYS"*; **`VMC 10/18`** reads *"LANDING ANDE"*.
- **KSTP `IMC 14`** reads *"INSRTUMENT APPROACHES"*.
- **KMSP Departure `4`** carries *"VIS RWY 4 APCH IN USE,"* on the **departure** ATIS — an arrival
  clause on the wrong broadcast. It is the only departure preset that does this.
- ~~**KLNK `SOUTH VMC`** names *"RWY 18 AND 17"*~~ — **withdrawn 2026-09-21, this was not an
  anomaly.** It was listed as one when this file was first written, before the R90 deck was
  checked. `LNK 7110.6A 4.a/4.b/5.b` gives Lincoln **14, 17, 18, 32, 35 and 36**, and the R90
  deck has carried that inventory since it was built. Runway 17 is real and the broadcast is
  correct. Kept here rather than deleted, as the record of a flag raised against a source before
  the repo's own data had been consulted.
- **Empty presets are common** — 15 of KFAR's 16, 6 of KRST's 8, 3 of KLNK's 4. An empty
  `airportConditions` means the profile ships the preset with no field-condition text, not that
  the configuration is unavailable.

---

## 7. Where this is used

- `ZMP/M98 Training/claude_M98_Config_Reference.md` — the nine MSP configurations, cross-checked.
- `ZMP/M98 Training/claude_ZMP_Reference.md` — the `30/12` resolution chain, §"30/12 — not a
  Table 2 row", to which this file adds the two-ATIS structural confirmation.
- The M98 deck's D-ATIS parser, validated against §2's verbatim strings (§3).

**Not used for anything spatial, and not used to assign a runway transition.** §1.
