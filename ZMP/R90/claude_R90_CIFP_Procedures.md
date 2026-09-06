# SID and STAR data from CIFP — KOMA

Generated **2026-09-06** from **CIFP 260903** (FAA Coded Instrument Flight Procedures,
cycle effective 2026-09-03). Pull recipe, record layout and the licence are in
`claude_CIFP_Source_Reference.md` at the repository root.

**The cycle is the citation.** A value here is true for 28 days by construction, so quote
it as `CIFP 260903` and re-pull before trusting it in a later cycle.

**This is the published procedure, not the facility's use of it.** CIFP lists every
transition that exists and is silent on which one the facility assigns in a given
configuration — that is an LOA question with no CIFP equivalent. Nothing here says who
owns what airspace, and nothing here is a sector boundary.

## Notation

| written | means | CIFP descriptor |
|---|---|---|
| `>=N` | at or above N thousand | `+` |
| `<=N` | at or below N thousand | `-` |
| `N` | cross AT N thousand | (blank) |
| `L - H` | cross between L and H | `B` |
| `FLnnn` | flight level | |
| `/nnn` | speed limit, knots | |
| a fix with no number | no published crossing — lateral point only | |

A **`[XX leg - not a fix]`** entry is a leg that terminates on a heading, an altitude or a
manual vector rather than on a waypoint — `FM`, `VM`, `VI`, `VA`, `CA`. **It cannot be drawn
as a point** and a fix-sequence ladder has to end there. Arrivals are almost all `TF`/`IF`
and carry few of these; departures carry many, which is why SIDs do not map cleanly.

## KOMA

### STARs

- **AANDY2 -> MZEEE:** MZEEE | BRKSR >=11
- **AANDY2 -> common route:** BRKSR >=11 | AANDY | CANIO
- **AANDY2 -> RW14L:** CANIO | BLUFS | LICIS >=4
- **AANDY2 -> RW14R:** CANIO | ERRLE | OTSEE 4
- **AANDY2 -> RW18:** CANIO | TASKY 4
- **AANDY2 -> RW32B:** CANIO | PTERZ >=6/220 | BRIKK >=5/210 | [FM leg - not a fix]  *(1 non-fix leg)*
- **HOWRY3 -> GRI:** GRI | HOWRY
- **HOWRY3 -> ONL:** ONL | OLU | HOWRY
- **HOWRY3 -> common route:** HOWRY | BOYSS
- **HOWRY3 -> RW14B:** BOYSS | [VM leg - not a fix]  *(1 non-fix leg)*
- **HOWRY3 -> RW18:** BOYSS | [VM leg - not a fix]  *(1 non-fix leg)*
- **HOWRY3 -> RW32B:** BOYSS | GEEZR | [VM leg - not a fix]  *(1 non-fix leg)*
- **HOWRY3 -> RW36:** BOYSS | GEEZR | [VM leg - not a fix]  *(1 non-fix leg)*
- **LANTK2 -> DABOY:** DABOY | LANTK
- **LANTK2 -> DSM:** DSM | LANTK
- **LANTK2 -> ALL:** LANTK | [VM leg - not a fix]  *(1 non-fix leg)*
- **MARWI4 -> LMN:** LMN | MARWI
- **MARWI4 -> STJ:** STJ | MARWI
- **MARWI4 -> RW14B:** MARWI | SWAAB | [VM leg - not a fix]  *(1 non-fix leg)*
- **MARWI4 -> RW18:** MARWI | SWAAB | [VM leg - not a fix]  *(1 non-fix leg)*
- **MARWI4 -> RW32B:** MARWI | SWAAB | OVR
- **MARWI4 -> RW36:** MARWI | SWAAB | OVR
- **TIMMO1 -> HTHWY:** HTHWY | HILRS >=11
- **TIMMO1 -> common route:** HILRS >=11 | TIMMO | MOONR
- **TIMMO1 -> RW14B:** MOONR | CRPET 5/210 | [VM leg - not a fix]  *(1 non-fix leg)*
- **TIMMO1 -> RW18:** MOONR | CRPET 5/210 | [VM leg - not a fix]  *(1 non-fix leg)*
- **TIMMO1 -> RW32B:** MOONR | BAARK 4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **TIMMO1 -> RW36:** MOONR | BAARK 4 | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **MZEEE** N42 20.68 / W96 19.41 -- `42.34463, -96.32348`
- **BRKSR** N42 04.38 / W96 11.07 -- `42.07293, -96.18452`
- **AANDY** N41 49.30 / W96 03.92 -- `41.82167, -96.06528`
- **CANIO** N41 38.80 / W95 58.38 -- `41.64669, -95.97306`
- **BLUFS** N41 31.35 / W96 03.90 -- `41.52254, -96.06503`
- **LICIS** N41 27.19 / W96 02.00 -- `41.45309, -96.03334`
- **ERRLE** N41 31.25 / W96 04.59 -- `41.52079, -96.07649`
- **OTSEE** N41 27.37 / W96 02.50 -- `41.45611, -96.04160`
- **TASKY** N41 30.28 / W95 53.61 -- `41.50473, -95.89358`
- **PTERZ** N41 25.30 / W95 49.46 -- `41.42161, -95.82430`
- **BRIKK** N41 20.48 / W95 47.65 -- `41.34138, -95.79415`
- **GRI** N40 59.04 / W98 18.89 -- `40.98403, -98.31478`
- **HOWRY** N41 22.01 / W96 51.23 -- `41.36679, -96.85377`
- **ONL** N42 28.23 / W98 41.22 -- `42.47050, -98.68693`
- **OLU** N41 27.00 / W97 20.45 -- `41.45003, -97.34082`
- **BOYSS** N41 15.87 / W96 16.42 -- `41.26458, -96.27368`
- **GEEZR** N41 12.65 / W95 58.51 -- `41.21088, -95.97510`
- **DABOY** N41 53.32 / W94 27.57 -- `41.88862, -94.45952`
- **LANTK** N41 30.75 / W95 07.94 -- `41.51246, -95.13241`
- **DSM** N41 26.26 / W93 38.91 -- `41.43762, -93.64856`
- **LMN** N40 35.81 / W93 58.06 -- `40.59676, -93.96759`
- **MARWI** N40 46.68 / W95 05.07 -- `40.77804, -95.08445`
- **STJ** N39 57.63 / W94 55.51 -- `39.96058, -94.92522`
- **SWAAB** N40 59.54 / W95 26.51 -- `40.99236, -95.44189`
- **OVR** N41 10.03 / W95 44.21 -- `41.16717, -95.73685`
- **HTHWY** N40 12.03 / W96 12.37 -- `40.20054, -96.20625`
- **HILRS** N40 31.60 / W96 09.37 -- `40.52671, -96.15623`
- **TIMMO** N40 39.44 / W96 08.41 -- `40.65739, -96.14014`
- **MOONR** N40 54.02 / W96 06.28 -- `40.90038, -96.10460`
- **CRPET** N41 16.11 / W96 02.93 -- `41.26852, -96.04891`
- **BAARK** N41 08.14 / W95 53.72 -- `41.13573, -95.89536`

### SIDs

**None coded.** CIFP 260903 carries no SID for KOMA. That means CIFP does not code them,
**not** that the field has none — a radar-vector or conventional departure is outside
what CIFP carries. The chart remains the only source.

