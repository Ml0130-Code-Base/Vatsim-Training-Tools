# SDF Voicing for Text-to-Speech

The owner listens to drill responses via text-to-speech. **TTS reads exactly what is written**, so identifiers must be written in their spoken form or they come out wrong. Callsign digit grouping, registration spelling and the "zero, never oh" rule live in `../_shared/claude_US_Carrier_Callsigns.md` and are not repeated here.

## Procedure names - ALL UNSPECIFIED, and this is the live ask

No SDF procedure name has an owner-supplied pronunciation. **The tool writes them as-is.** A wrong pronunciation that sounds confident is worse than a flat one, because it gets learned.

| Written | Spoken | Kind | Status |
|---|---|---|---|
| `DLAMP` | - | STAR | **unspecified** |
| `EEVAA` | - | SID | **unspecified** |
| `GTGON` | - | SID | **unspecified** |
| `HIDEY` | - | SID | **unspecified** |
| `JMONY` | - | STAR | **unspecified** |
| `LEDDL` | - | STAR | **unspecified** |
| `LLIZY` | - | SID | **unspecified** |
| `LOKRD` | - | SID | **unspecified** |
| `MBELL` | - | STAR | **unspecified** |
| `RDHSE` | - | SID | **unspecified** |
| `SPILR` | - | SID | **unspecified** |

## Frequencies

Digit by digit, decimal spoken as "point", full channel: `128.175` is "one two eight point one seven five". **The SOP prints several channels to two decimals; speak the vNAS channel** (`128.17` in the SOP is `128.175`). `124.95` is "one two four point nine five"; never "one twenty-four".

## Runway designators

Expanded per the M98 contract: `32L` is "three two left", `36C` is "three six center", `18` is "one eight". **Single-digit runways are voiced without a leading zero** (`5L` is "five left", `9` is "nine") - the FAA phraseology. That is a convention taken from the national phraseology rather than a SDF-supplied pronunciation, and it is recorded here so a change is one edit.

## Position names and STARS IDs

Position names are spoken as written. Position keys (`CD` `RC` `GCE` `GCW` `LCE` `LCW` `AR1` `AR2` `DR1` `DR2` `FR1` `FR2`) are spelled letter by letter. STARS IDs are single letters and are spelled. **The delta in a handoff ID (`Δ`) is spoken "delta".**

## Airports

| Written | Spoken |
|---|---|
| `KSDF` | Louisville |
| `KLOU` | Bowman |
| `KFTK` | Godman |
| `KJVY` | Clark Regional |
| `KBFR` | Bedford |
| `KSER` | Seymour |
| `KIMS` | Madison |
| `KBRY` | Samuels Field (Bardstown) |
| `KEKX` | Addington Field (Elizabethtown) |
| `KFRH` | French Lick Muni |
| `6I2` | Lebanon Springfield George Hoerter Field |
| `I93` | Breckinridge Co (Hardinsburg) |

Where the name above is the CIFP or SOP name and not an owner-supplied spoken form, it is the field name as published.

## What to do when a pronunciation is missing

Write the identifier as-is. **Do not invent a phonetic spelling.** Add the row here when the owner supplies it.
