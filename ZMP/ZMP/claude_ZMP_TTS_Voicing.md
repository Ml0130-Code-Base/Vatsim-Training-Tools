# ZMP Voicing for Text-to-Speech

The owner listens to drill responses via text-to-speech. **TTS reads exactly what is written**, so identifiers must be written in their spoken form or they come out wrong. Table is WRITTEN identifier → spoken form. Where no spoken form is listed, write and speak as-is.

Same contract as `../M98 Training/claude_SID_TTS_Voicing.md`. Callsign digit grouping, registration spelling and the "zero, never oh" rule live in `claude_US_Carrier_Callsigns.md`.

## Sector numbers — the thing ZMP says more than anything else

Sector numbers are **spoken as digits, not as tens**. Sector 06 is "sector zero six", not "sector six"; Sector 27 is "sector two seven", not "sector twenty-seven".

Write them zero-padded — `06`, `09` — so TTS reads both digits. Writing `6` invites "six".

> **The order itself is inconsistent here**: Chapter 4 Section 3 is headed `SECTION 3. SECTOR 3` while every other sector in the document is zero-padded. Written material in this repo pads all 33.

## Frequencies

Digit by digit, decimal spoken as "point": `133.4` → "one three three point four". `121.05` → "one two one point zero five" — **"zero", never "oh"**. `135.0` → "one three five point zero".

## ERAM altitude filters

These are display strings, not spoken values. `000B242` is read as **"zero zero zero bravo two four two"** if it must be spoken at all — but in a drill, say what it means instead: "surface to flight level two three zero". Prefer the meaning over the code.

## Facility identifiers

| Written | Spoken |
|---|---|
| `ZMP` | Minneapolis Center |
| `M98` | Minneapolis Approach |
| `R90` | Omaha Approach |
| `RST` | Rochester |
| `DLH` | Duluth |
| `FAR` | Fargo |
| `FSD` | Sioux Falls |
| `SUX` | Sioux City |
| `GRB` | Green Bay |
| `DSM` | Des Moines |
| `BIS` | Bismarck |
| `MIB` | Minot |
| `RDR` | Grand Forks |
| `APN` | Alpena |
| `AZO` | Great Lakes |
| `MKE` | Milwaukee |
| `ZAU` | Chicago Center |
| `ZKC` | Kansas City Center |
| `ZDV` | Denver Center |
| `ZLC` | Salt Lake Center |
| `ZOB` | Cleveland Center |
| `CZWG` / `YWG` | Winnipeg Center |
| `YYZ` | Toronto Center |
| `CYQT` | Thunder Bay |
| `VOK` | Volk |

## Radar sites

Spoken as place names, not identifiers, because that is how the order writes them.

| Written | Spoken |
|---|---|
| `QJA` | Empire |
| `EGV` | Eagle River |
| `APN` (as a radar site) | Alpena |
| `SAW` | Sawyer |

## Arrival and fix names

The ZMP-side arrivals into M98 are already voiced in `../M98 Training/claude_MSP_STAR_Reference.md` and `../M98 Training/claude_SID_TTS_Voicing.md`. Use those spellings — do not create a second set.

Fixes appearing in the ZMP LOA tables and per-sector arrival-route tables (`KKILR`, `MUSCL`, `BLUEM`, `NITZR`, `TORGY`, `BAINY`, `HUGGI`, `BAYKS`, `HHAMR`, `WRSAW`, `OFSON`, `LUCCY`, `GREAK`, `TIETN`, `SHEAY`, `AGUDE`, `MZEEE`, and the Tier 1 route fixes) are **not yet specified for pronunciation**. Write as-is until the owner provides them.

`GEP` → "Gopher". `FGT` → "Farmington". `EAU` → "Eau Claire". These three appear often enough in ZMP–M98 work to be worth stating.

## Perimeter airports (7200.1O Figure 3-1)

`BFA`, `CIU`, `GOV`, `RCX`, `SSQ`, `TKV`, `AIG`, `RRL`, `MNM`, `Y51`, `AEL`, `MWM`, `AQP`, `D42`, `06D`, `D39`, `GHW`, `FSE`, `48Y`, `BTN`, `DVP`, `DXX`, `ISB`, `ICR`, `AFK`, `EAR`, `ODX`, `0V3`, `CIN`, `CJJ`, `BVN`, `DNS`, `GFZ` — **all unspecified.**

The numeric-and-letter identifiers (`Y51`, `06D`, `D39`, `48Y`, `0V3`, `D42`) must be **spelled character by character**, with `0` read as "zero". `0V3` is "zero victor three", not "oh vee three".

## Flight levels and altitudes

`FL230` → "flight level two three zero". `11,000` → "one one thousand". `16,000` → "one six thousand". Never "eleven thousand" in a clearance context.

## What to do when a pronunciation is missing

Write the identifier as-is. **Do not invent a phonetic spelling** — a wrong pronunciation that sounds confident gets learned. Add the row here when the owner supplies it; the tool reads this file rather than anything hardcoded in the HTML.
