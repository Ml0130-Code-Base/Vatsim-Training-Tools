# R90 Voicing for Text-to-Speech

The owner listens to drill responses via text-to-speech. **TTS reads exactly what is written**, so procedure and fix names must be written in their spoken form or they come out wrong. Table is WRITTEN identifier → spoken form. Where no spoken form is listed, write and speak as-is.

Same contract as `../M98 Training/claude_SID_TTS_Voicing.md`. Callsign digit grouping, registration spelling and the "zero, never oh" rule live in `claude_US_Carrier_Callsigns.md` and are not repeated here.

## STAR names — ALL FIVE UNSPECIFIED, and this is the live ask

The ZMP–R90 LOA names five Omaha arrivals. **None has an owner-supplied pronunciation**, and four of the five are the kind of invented five-letter identifier TTS reliably mangles.

| Written | Spoken | Status |
|---|---|---|
| `LANTK` | — | **unspecified** |
| `MARWI` | — | **unspecified** |
| `TIMMO` | — | **unspecified** |
| `HOWRY` | — | **unspecified** |
| `AANDY` | — | **unspecified** |

`AANDY` is the sharpest risk: the doubled leading `A` will almost certainly be read as a spelled string or a stumble rather than as a name. `HOWRY` and `MARWI` are the next most likely to break.

**Until these are filled in, the tool writes them as-is** and any drill that voices an Omaha arrival will mispronounce it. This is a five-line fix and it is worth doing before the first drill that uses a STAR.

## Airport and navaid identifiers

| Written | Spoken | Note |
|---|---|---|
| `OMA` | Omaha | Eppley Airfield |
| `OFF` | Offutt | Military field; "Offutt" not "off" |
| `LNK` | Lincoln | |
| `CBF` | Council Bluffs | |
| `MLE` | Millard | |
| `SUX` | Sioux City | Adjacent approach control |
| `MZEEE` | — | **unspecified** — a fix on the SUX routing, never located on a chart |
| `OBH` | — | **unspecified** |
| `LBF` | — | **unspecified** |
| `SLN` | — | **unspecified** |
| `PWE` | — | **unspecified** |
| `ICT` | Wichita | |
| `RBA` | — | **unspecified** — the RBA arrival, referenced in LOA 4.d.2.c and never located |

`OBH`, `LBF`, `SLN` and `PWE` appear only in the flow-dependent departure rules (LOA 4.d.2.f–g). They are almost certainly navaid or airport identifiers, but **the documents never expand them** — do not guess a city name.

## Position names

Spoken as written; no expansion needed.

| Written | Spoken |
|---|---|
| Radar West / Radar East / Radar Final / Radar Offutt | as written |
| Radar Lincoln / Lincoln Final | as written |
| `RW` `RE` `RF` `RO` `RL` `LF` | spell the letters |
| STARS IDs `W` `X` `V` `O` `L` `F` | spell the letter |

**`LW` appears in R90 3-8 and is never defined.** Speak it as spelled letters and do not silently expand it to "Radar Lincoln" — see `claude_R90_Gap_Analysis.md` Part 3.

## Runway designators

Expanded per the M98 contract: `32L` → "three two left", `14R` → "one four right", `36` → "three six", `18` → "one eight". Never "thirty-two left".

Scratchpad runway digits are **codes, not runways** — the LNK digit `2` means runway 32. When voicing a scratchpad entry, say the runway it decodes to, not the digit.

## Frequencies

Digit by digit, decimal spoken as "point": `135.875` → "one three five point eight seven five". `124.0` → "one two four point zero" — **never "one twenty-four"**, and never "oh".

## What to do when a pronunciation is missing

Write the identifier as-is. **Do not invent a phonetic spelling** — a wrong pronunciation that sounds confident is worse than a flat one, because it gets learned. Add the row here when the owner supplies it, and the tool picks it up from this file rather than from anything hardcoded in the HTML.
