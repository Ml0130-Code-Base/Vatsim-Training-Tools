# ZID vATIS Reference - what each field advertises

The vATIS profile `ZID ARTCC (All)`, **updateSerial 2026081300**, from `https://raw.githubusercontent.com/Indy-Center/vatisfiles/refs/heads/main/zid-artcc-all-vatis.json` (the profile's own `updateURL`), pulled **2026-10-18**. **Cite the serial the way a CIFP cycle is cited:** `vATIS ZID 2026081300`. The file is not committed - the command reproduces it.

**The copy the owner downloaded is a stub.** `vATIS Profile - ZID ARTCC (All).json` is 257 bytes: a profile `id`, an `updateUrl` and `"stations": []`. The vATIS client fetches the real profile from that URL; the 188 KB document is what is transcribed here. Note the two files have **different profile ids** (`168b934f-...` in the stub, `de94303b-...` in the repository file).

**This is the tower's broadcast, not the TRACON's assignment.** It names no transition, gate, altitude or sector. It says which runways a field advertises, the ATIS frequency and code range, and the NOTAM flags the SOPs refer to (`RAMP OPEN`, `RAMP CLOSED`). It supplies a flow selector and closes nothing in any gap analysis.

## Every composite in the profile

| Station | Name | ATIS | Frequency | Codes | Presets | NOTAM definitions |
| --- | --- | --- | --- | --- | --- | --- |
| KTZR | Bolton | Combined | 135.925 | A-Z | 1 | 1 |
| KLOU | Bowman Field | Combined | 124.150 | N-Z | 1 | 1 |
| KCRW | Charleston | Combined | 127.600 | A-Z | 2 | 2 |
| KCMH | Columbus | Combined | 124.600 | A-Z | 2 | 3 |
| KMIE | Delaware County Reg | Combined | 133.250 | A-Z | 1 | 2 |
| KEVV | Evansville Regional | Combined | 120.200 | A-Z | 2 | 1 |
| KFTK | Godman AAF | Combined | 118.000 | A-Z | 1 | 1 |
| KHUF | Hulman | Combined | 127.500 | A-Z | 1 | 2 |
| KHTS | Huntington Tri-State | Combined | 125.200 | A-Z | 2 | 1 |
| KIND | Indianapolis | Combined | 134.250 | A-Z | 3 | 6 |
| KLEX | Lexington | Combined | 126.300 | A-Z | 2 | 1 |
| KSDF | Louisville | Combined | 118.725 | A-M | 3 | 6 |
| KLUK | Lunken Field | Combined | 123.600 | A-Z | 1 | 1 |
| KOSU | Ohio State University | Combined | 121.350 | A-Z | 2 | 2 |
| KPKB | Parkersburg | Combined | 124.350 | A-Z | 2 | 1 |
| KLCK | Rickenbacker | Combined | 132.750 | A-Z | 2 | 1 |
| KILN | Wilmington | Combined | 124.925 | A-Z | 2 | 1 |
| KFFO | Wright-Patterson AFB | Combined | 124.475 | A-Z | 1 | 1 |
| KCVG | Cincinatti D | Departure | 135.300 | A-Z | 6 | 5 |
| KCVG | Cincinatti A | Arrival | 134.375 | A-Z | 4 | 5 |
| KDAY | Dayton | Combined | 125.800 | A-Z | 3 | 1 |

CVG is the one **split** broadcast: a departure ATIS and an arrival ATIS, each A-Z. IND is one combined ATIS A-Z. SDF is A-M and LOU is N-Z, which is the split SDF SOP 1 describes.

## The fields worked by IND, SDF and CVG - verbatim

### KLOU - Bowman Field (Combined, 124.150, codes N-Z)

**Presets:**

| Preset | Airport conditions (verbatim) |
| --- | --- |
| LOU | RNAV RWY 24 APCH IN USE. ALL ACFT READ BACK ALL HOLD SHRT INSTRUCTIONS AND ASSIGNED ALT. |

Template: `BOWMAN TOWER ATIS INFORMATION [ATIS_CODE] [OBS_TIME]. [FULL_WX_STRING]. [ARPT_COND] [NOTAMS] [CLOSING]`

**NOTAM definitions:**

| # | Name | Default | Text (verbatim) |
| --- | --- | --- | --- |
| 1 | WINDSHEAR ADZYS | off | WIND SHEAR ADZYS IN EFCT. |

### KIND - Indianapolis (Combined, 134.250, codes A-Z)

**Presets:**

| Preset | Airport conditions (verbatim) |
| --- | --- |
| 23L/R | PARL ILS RWY 23L AND ILS RWY 23R APCH IN USE. DEPG RWYS 23L, 23R. CROSS RUNWAY OPERATIONS MAY BE IN EFFECT. |
| 5L/R | PARL ILS RWY 5L AND ILS RWY 5R APCH IN USE. DEPG RWYS 5L, 5R. CROSS RUNWAY OPERATIONS MAY BE IN EFFECT. |
| 32/14 | ILS RWY 32 APCH IN USE. CROSS RUNWAY OPERATIONS MAY BE IN EFFECT.  |

Template: `INDIANAPOLIS INTERNATIONAL AIRPORT ATIS INFORMATION [ATIS_CODE] [OBS_TIME]. [FULL_WX_STRING]. [ARPT_COND] [NOTAMS] [CLOSING]`

**NOTAM definitions:**

| # | Name | Default | Text (verbatim) |
| --- | --- | --- | --- |
| 1 | 5L/23R CLOSED | off | RWY 05L/23R CLSD. |
| 2 | 5R/23L CLOSED | off | RWY 05R/23L CLSD. |
| 3 | 14/32 CLOSED | off | RWY 14/32 CLSD. |
| 4 | WINDSHEAR ADZYS | off | WIND SHEAR ADZYS IN EFCT. |
| 5 | RAMP OPEN | off | FEDEX RAMP CONTROL OPEN. AC DEPARTING FEDEX RAMP CTC RAMP CONTROL 130.80 PRIOR TO PUSHBACK. AC ARRIVING FEDEX RAMP CTC RAMP CONTROL 130.80 WHEN AT ASSIGNED POINT. VISIT HTTP://AIRPORTS.INDY.CENTER/IND. |
| 6 | RAMP CLOSED | on | FEDEX RAMP CONTROL CLOSED. AC AT FEDEX RAMP CTC ATC AT EXIT POINT WHEN READY TO TAXI. |

### KSDF - Louisville (Combined, 118.725, codes A-M)

**Presets:**

| Preset | Airport conditions (verbatim) |
| --- | --- |
| 17L/R | ILS APCH RWY 17L AND ^17R. SIMUL APCHS IN USE. RWY 17R ARRIVALS, 29, 11 NSE SENSI, AVBL ONLY FOR OPR NCT. SMUL DEPARTURES IN USE. |
| 35L/R | ILS APCH RWY 35L AND ^35R. SIMUL APCHS IN USE. RWY 35L ARRIVALS, 29, 11 NSE SENSI, AVBL ONLY FOR OPR NCT. SMUL DEPARTURES IN USE. |
| 29 | RNAV APCH 29 IN USE. ARRIVALS, 29, 11 NSE SENSI. |

Template: `LOUISVILLE INTERNATIONAL AIRPORT ATIS INFORMATION [ATIS_CODE] [OBS_TIME]. [FULL_WX_STRING]. [ARPT_COND] [NOTAMS] [CLOSING]`

**NOTAM definitions:**

| # | Name | Default | Text (verbatim) |
| --- | --- | --- | --- |
| 1 | RAMP OPEN | off | UPS RAMP CONTROL IN USE. ACFT AT UPS RAMP 1 THRU 11 CTC RAMP 129.95 PRIOR TO PUSH. VISIT HTTP://AIRPORTS.INDY.CENTER/SDF. |
| 2 | RAMP CLOSED | on | UPS RAMP CONTROL CLOSED. |
| 1 | 17L/35R CLSD | off | RWY 17L/35R CLSD. |
| 2 | 17R/35L CLOSED | off | RWY 17R/35L CLSD. |
| 3 | 29/11 CLOSED | off | RWY 11/29 CLSD. |
| 4 | WINDSHEAR ADZYS | off | WIND SHEAR ADZYS IN EFCT. |

### KLUK - Lunken Field (Combined, 123.600, codes A-Z)

**Presets:**

| Preset | Airport conditions (verbatim) |
| --- | --- |
| LUK | EXPECT ILS APCH. LANDING AND DEPARTING RWY 21. |

Template: `LUNKEN TOWER ATIS INFORMATION [ATIS_CODE] [OBS_TIME]. [FULL_WX_STRING]. [ARPT_COND] [NOTAMS] [CLOSING]`

**NOTAM definitions:**

| # | Name | Default | Text (verbatim) |
| --- | --- | --- | --- |
| 1 | WINDSHEAR ADZYS | off | WIND SHEAR ADZYS IN EFCT. |

### KCVG - Cincinatti D (Departure, 135.300, codes A-Z)

**Presets:**

| Preset | Airport conditions (verbatim) |
| --- | --- |
| NORTH+27 | DEPG RWY 27, RWY 36R. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| SOUTH+27 | DEPG RWY 27, RWY 18L. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| NORTH | DEPG RWY 36R. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| SOUTH | DEPG RWY 18L. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| WEST | DEPG RWY 27. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| EAST | DEPG RWY 9. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |

Template: `CINCINATTI NORTHERN KENTUCKY INTERNATIONAL AIRPORT DEPARTURE INFORMATION [ATIS_CODE] [OBS_TIME]. [FULL_WX_STRING]. [ARPT_COND] [NOTAMS] [CLOSING]`

**NOTAM definitions:**

| # | Name | Default | Text (verbatim) |
| --- | --- | --- | --- |
| 2 | RAMP OPEN COMBINED | off | CVG RAMP CONTROL IN USE. AC AT AIR CARRIER TERMINAL OR CARGO RAMP CTC RAMP 130.90 PRIOR TO PUSH. VISIT HTTP://AIRPORTS.INDY.CENTER/CVG. |
| 3 | RAMP OPEN ALL | off | CVG RAMP CONTROL IN USE. AC AT AIR CARRIER TERMINAL CTC RAMP 130.90 PRIOR TO PUSH. ACFT AT AMAZON RAMP CTC RAMP 130.50 PRIOR TO PUSH. AC AT DHL RAMP CTC 129.47 PRIOR TO PUSH. VISIT HTTP://AIRPORTS.INDY.CENTER/CVG. |
| 1 | RAMP CLOSED | on | CVG RAMP TOWER CLOSED. CTC ATC AT AIR CARRIER SPOTS 2, 3, 10, DHL SPOTS 51, 52, 54, 55, AMAZON SPOT 75. |
| 4 | WINDSHEAR ADZYS | off | WIND SHEAR ADZYS IN EFCT. |
| 5 | SIGMETS/CWA | off | SIGMETS/CWA IN EFCT. CTC FSS FOR INFO. |

### KCVG - Cincinatti A (Arrival, 134.375, codes A-Z)

**Presets:**

| Preset | Airport conditions (verbatim) |
| --- | --- |
| NORTH | SIMUL APPROACHES IN USE. EXPECT ILS APPROACH TO RWY 36R, RWY 36C. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| SOUTH | SIMUL APPROACHES IN USE. EXPECT ILS APPROACH TO RWY 18L, RWY 18C. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| EAST | EXPECT ILS APPROACH TO RWY 9. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |
| WEST | EXPECT ILS APPROACH TO RWY 27. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. |

Template: `[FACILITY] ATIS INFO [ATIS_CODE] [OBS_TIME]. [FULL_WX_STRING]. [ARPT_COND] [NOTAMS]`

**NOTAM definitions:**

| # | Name | Default | Text (verbatim) |
| --- | --- | --- | --- |
| 2 | RAMP OPEN COMBINED | off | CVG RAMP CONTROL IN USE. AC AT AIR CARRIER TERMINAL OR CARGO RAMP CTC 130.90 PRIOR TO ENTRY. VISIT HTTP://AIRPORTS.INDY.CENTER/CVG. |
| 3 | RAMP OPEN ALL | off | CVG RAMP CONTROL IN USE. AC AT AIR CARRIER TERMINAL CTC 130.90 PRIOR TO ENTRY. AC AT SPOT 54 or 75 CTC 130.37 PRIOR TO ENTRY. AC AT SPOT 76 CTC 130.50 PRIOR TO ENTRY. AC AT SPOTS 51, 52, OR 55 CTC 129.47 PRIOR TO ENTRY. VISIT HTTP://AIRPORTS.INDY.CENTER/CVG. |
| 1 | RAMP CLOSED | on | RAMP CONTROL CLOSED. |
| 4 | WINDSHEAR ADZYS | off | WIND SHEAR ADZYS IN EFCT. |
| 5 | SIGMETS/CWA | off | SIGMETS/CWA IN EFCT. CTC FSS FOR INFO.  |

## What it confirms and what it adds

- **IND** advertises runways 5L/5R, 23L/23R and 32 (preset `32/14`, text names runway 32 only). **No preset advertises runway 14.**
- **SDF** advertises 17L/17R, 35L/35R and 29, with simultaneous approaches and departures in the two parallel flows. The ATIS identifiers A-M agree with SDF SOP 1.
- **CVG's departure presets advertise fewer runways than the SOP's configuration table**: NORTH names 36R (the SOP: 36C and 36R), SOUTH names 18L (the SOP: 18L and 18C). Listed in the CVG disagreements.
- **The DHL Ramp frequency in both CVG ramp NOTAMs is 129.47**, agreeing with vNAS (129.475) and disagreeing with the CVG SOP's position table (120.40).
- The CVG facility string reads `CINCINATTI` in the profile (sic). Not corrected.

## Not surveyed

Whether KIND or KSDF publishes a D-ATIS text feed. `claude_DATIS_Field_Survey.md` at the repository root covers the fields the other decks work; KCVG appears in its national list. No ZID deck has a D-ATIS reader.
