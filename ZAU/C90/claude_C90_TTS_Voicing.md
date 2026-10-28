# C90 Voicing for Text-to-Speech

The owner listens to drill responses via text-to-speech. **TTS reads exactly what is written**, so procedure and fix names must be written in their spoken form or they come out wrong. Table is WRITTEN identifier → spoken form. Where no spoken form is listed, write and speak as-is.

Same contract as `../../ZMP/R90/claude_R90_TTS_Voicing.md`. Callsign digit grouping, registration spelling and the "zero, never oh" rule live in `claude_US_Carrier_Callsigns.md` (copied at `../_shared/`) and are not repeated here.

## Pronunciations — ALL UNSPECIFIED, and this is the live ask

**No C90 identifier has an owner-supplied pronunciation.** Until the owner supplies one, the tool writes the identifier as-is and any drill that voices it may mispronounce it. **Do not invent a phonetic spelling**: a wrong pronunciation that sounds confident is worse than a flat one, because it gets learned.

### Feeder gates and positions (C90 2-1)

| Written | Spoken | Status |
|---|---|---|
| `PLANO` | — | **unspecified** |
| `KUBBS` | — | **unspecified** |
| `OKK` | — | **unspecified** |
| `FARMM` | — | **unspecified** |

### Procedures and fixes carried from CIFP 261001

These are named in `claude_C90_CIFP_Procedures.md`. All are **unspecified**; the ones most likely to break are the invented five-letter names and the ones with doubled letters.

`ADELL`, `BLOKR`, `CARYN`, `DARCY`, `ELANR`, `OBENE`, `JORJO`, `MONKZ`, `GOPAC`, `PANGG`, `ENDEE`, `FISSK`, `BENKY`, `ERNNY`, `ESSPO`, `FYTTE`, `MADII`, `SHAIN`, `TRTLL`, `VEECK`, `WATSN`, `WYNDE`, `LUCIT`, `JVL`, `ACCRA`, `UECKR`, `MOBLE`, `LEWKE`, `GIJ`, `HOBEL`, `MIING`.

### Procedure numbers

A procedure name ends in its revision number (`ADELL8`, `BLOKR8`). Speak the number as a digit: "adell eight" is the pattern, but **the name itself is unspecified**, so write `ADELL8` as-is until it is given.

## Airports

| Written | Spoken | Note |
|---|---|---|
| `KORD` / ORD | O'Hare | Facility name, per C90 2-6.d |
| `KMDW` / MDW | Midway | |
| `KARR` | Aurora | |
| `KDPA` | DuPage | |
| `KPWK` | Chicago Executive | |
| `KGYY` | Gary | |
| `KLOT` | Lewis | |
| `KUGN` | Waukegan | |

## Position names and symbols

Callsigns are `CHI_<symbol>_APP` or `CHI_<symbol>_DEP`. Speak the symbol letter as a letter. Position names (`East Departure`, `North Satellite`, `Sector 3`) are spoken as written.

## Runway designators

Expanded: `28L` → "two eight left", `9R` → "nine right". `4R` → "four right", `22L` → "two two left", `31R` → "three one right". Never "twenty-eight left". Slash lists (`27C/27L`) are spoken as each runway in turn.

## Frequencies

Digit by digit, decimal spoken as "point": `119.000` → "one one nine point zero zero zero". `133.90` → "one three three point nine zero". **Never "one nineteen"**, and never "oh".

## What to do when a pronunciation is missing

Write the identifier as-is. Add the row here when the owner supplies it, and the tool picks it up from this file rather than from anything hardcoded in the HTML.
