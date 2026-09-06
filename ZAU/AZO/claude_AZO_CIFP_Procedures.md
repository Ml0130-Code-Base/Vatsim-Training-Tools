# SID, STAR and approach data from CIFP — AZO, Great Lakes West Wall

Generated **2026-09-06** from **CIFP 260903** (FAA Coded Instrument Flight Procedures,
cycle effective 2026-09-03). Pull recipe, record layout and licence in
`claude_CIFP_Source_Reference.md` at the repository root.

**The cycle is the citation.** A value here is true for 28 days by construction — quote it
as `CIFP 260903` and re-pull before trusting it in a later cycle.

**This is the published procedure, not the facility's use of it.** CIFP lists every
transition that exists and is silent on which one the facility assigns in a given
configuration — that is an LOA question with no CIFP equivalent. Nothing here is a sector
boundary and nothing here says who owns what airspace.

## Notation

| written | means |
|---|---|
| `>=N` | at or above N |
| `<=N` | at or below N |
| `N` | cross AT N |
| `L - H` | cross between L and H |
| `FLnnn` | flight level |
| `/nnn` | speed limit, knots |
| a fix with no number | no published crossing — lateral point only |

**SIDs and STARs are written in thousands** (`>=11` is 11,000). **Approaches are written in
full feet** (`>=2800`), because an approach works at altitudes where thousands read badly.

A **`[XX leg - not a fix]`** entry terminates on a heading, an altitude or a manual vector
rather than a waypoint — `FM`, `VM`, `VI`, `VA`, `CA`. **It cannot be drawn as a point** and a
fix-sequence track has to end there.

**An approach's `(final)` segment includes the missed approach**, which is why a fix can
appear twice with a hold-like repetition at the end. That is the published coding, not a
duplication error.

## KAZO

### STARs

**None coded.** CIFP does not code a STAR for KAZO — the chart is the only source.

### SIDs

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**I35** — ILS RWY 35

- **AUSTN:** AUSTN <=6000 | AUSTN >=2800
- **(final):** STRKR 2800 | AUSTN 2800 | RW35 922 | [CA leg - not a fix] | AUSTN >=2800 | AUSTN >=2800  *(1 non-fix leg)*

**L35** — LOC RWY 35

- **AUSTN:** AUSTN <=6000 | AUSTN >=2800
- **(final):** STRKR >=2800 | AUSTN >=2800 | ZEXOS >=1400 | RW35 922 | [CA leg - not a fix] | AUSTN >=2800 | AUSTN >=2800  *(1 non-fix leg)*

**R05** — RNAV (GPS) RWY 05

- **GIJ:** GIJ | COLDT >=2700
- **VENTU:** VENTU | COLDT >=2700
- **WHOOF:** WHOOF | COLDT >=2700 | COLDT >=2700
- **(final):** COLDT >=2700 | FOSDO >=2500 | FOSDO | MATEY >=1520 | RW05 902 | [CA leg - not a fix] | AMPEY >=3000 | AMPEY >=3000  *(1 non-fix leg)*

**R17** — RNAV (GPS) RWY 17

- **BOHRR:** BOHRR | OSEGO >=3000
- **OSEGO:** OSEGO >=3000
- **(final):** OSEGO >=3000 | SUYOD >=2800 | SUYOD | WURAX 1460 | RW17 904 | [CA leg - not a fix] | COVAV >=2800 | COVAV >=2800  *(1 non-fix leg)*

**R23** — RNAV (GPS) RWY 23

- **BOHRR:** BOHRR | AMPEY >=3000
- **HEBEL:** HEBEL | AMPEY >=3000
- **WHOOF:** WHOOF | AMPEY >=3000 | AMPEY >=3000
- **(final):** AMPEY >=3000 | BEDJO >=2500 | BEDJO | YUKUK 1520 | RW23 889 | [CA leg - not a fix] | COLDT >=2700 | COLDT >=2700  *(1 non-fix leg)*

**R35** — RNAV (GPS) RWY 35

- **WHOOF:** WHOOF | COVAV >=2800 | COVAV >=2800
- **YURUD:** YURUD | COVAV >=2800
- **(final):** COVAV >=2800 | EYOLU >=2800 | EYOLU | GLEEK 1780 | RW35 922 | [CA leg - not a fix] | OSEGO >=3000 | OSEGO >=3000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`AUSTN`, `GIJ`, `VENTU`, `WHOOF`, `BOHRR`, `OSEGO`, `HEBEL`, `YURUD`

### Fix coordinates

- **AUSTN** N42 07.87 / W85 31.71 -- `42.13122, -85.52855`
- **STRKR** N42 01.62 / W85 30.40 -- `42.02706, -85.50671`
- **RW35** N62 06.26 / W150 06.58 -- `62.10425, -150.10964`
- **ZEXOS** N42 11.94 / W85 32.57 -- `42.19899, -85.54280`
- **GIJ** N41 46.12 / W86 19.11 -- `41.76861, -86.31845`
- **COLDT** N42 05.96 / W85 44.36 -- `42.09929, -85.73936`
- **VENTU** N41 53.98 / W85 38.45 -- `41.89971, -85.64090`
- **WHOOF** N42 14.22 / W85 33.19 -- `42.23698, -85.55315`
- **FOSDO** N42 10.54 / W85 38.25 -- `42.17562, -85.63752`
- **MATEY** N42 12.68 / W85 35.38 -- `42.21127, -85.58975`
- **RW05** N62 56.41 / W152 16.38 -- `62.94021, -152.27293`
- **AMPEY** N42 22.52 / W85 22.14 -- `42.37530, -85.36905`
- **BOHRR** N42 35.28 / W85 26.10 -- `42.58793, -85.43496`
- **OSEGO** N42 27.51 / W85 35.86 -- `42.45850, -85.59761`
- **SUYOD** N42 20.37 / W85 34.35 -- `42.33943, -85.57245`
- **WURAX** N42 16.21 / W85 33.47 -- `42.27012, -85.55780`
- **RW17** N62 06.58 / W150 06.54 -- `62.10971, -150.10896`
- **COVAV** N42 01.72 / W85 30.43 -- `42.02874, -85.50712`
- **HEBEL** N42 27.27 / W85 21.62 -- `42.45448, -85.36038`
- **BEDJO** N42 17.56 / W85 28.82 -- `42.29270, -85.48031`
- **YUKUK** N42 15.70 / W85 31.33 -- `42.26161, -85.52214`
- **RW23** N62 56.48 / W152 15.98 -- `62.94130, -152.26629`
- **YURUD** N41 55.88 / W85 28.45 -- `41.93134, -85.47414`
- **EYOLU** N42 07.59 / W85 31.65 -- `42.12658, -85.52757`
- **GLEEK** N42 10.76 / W85 32.32 -- `42.17927, -85.53865`

## KGRR

### STARs

**None coded.** CIFP does not code a STAR for KGRR — the chart is the only source.

### SIDs

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**I08R** — ILS RWY 08R

- **VIO:** VIO | GOKUW >=2700 | GOKUW >=2700
- **(final):** JAKES 2400 | GOKUW 2400 | RW08R 843 | [CA leg - not a fix] | VIO >=3000 | VIO >=3000  *(1 non-fix leg)*

**I26L** — ILS RWY 26L

- **VIO:** VIO | KNOBS >=2700 | KNOBS >=2700
- **(final):** CFBZJ 2700 | KNOBS 2700 | RW26L 845 | [CA leg - not a fix] | VIO >=3000 | VIO >=3000  *(1 non-fix leg)*

**I35** — ILS RWY 35

- **JJUDD:** JJUDD >=3000
- **(final):** JJUDD 3000 | CALDO 2500 | RW35 845 | [CA leg - not a fix] | WALKS >=3000 | WALKS >=3000  *(1 non-fix leg)*

**L08R** — LOC RWY 08R

- **VIO:** VIO | GOKUW >=2700 | GOKUW >=2700
- **(final):** JAKES >=2400 | GOKUW >=2400 | RW08R 843 | [CA leg - not a fix] | VIO >=3000 | VIO >=3000  *(1 non-fix leg)*

**L26L** — LOC RWY 26L

- **VIO:** VIO | KNOBS >=2700 | KNOBS >=2700
- **(final):** CFBZJ >=2700 | KNOBS >=2700 | GLGHR >=1360 | RW26L 845 | [CA leg - not a fix] | VIO >=3000 | VIO >=3000  *(1 non-fix leg)*

**L35** — LOC RWY 35

- **JJUDD:** JJUDD >=3000
- **(final):** JJUDD >=3000 | CALDO >=2500 | HONSE >=1480 | RW35 845 | [CA leg - not a fix] | WALKS >=3000 | WALKS >=3000  *(1 non-fix leg)*

**R08L** — RNAV (GPS) RWY 08L

- **FIVLO:** FIVLO | HIPOP >=2700
- **(final):** HIPOP >=2700 | JELMO >=2400 | JELMO | TECTU 1620 | RW08L 831 | [CA leg - not a fix] | WAGMI | CLOCK >=3000 | CLOCK >=3000  *(1 non-fix leg)*

**R08R** — RNAV (GPS) RWY 08R

- **(final):** JAKES >=2700 | GLAWE >=2400 | GLAWE | GABCE 1640 | RW08R 843 | [CA leg - not a fix] | CAVUS | SARAN >=2700 | SARAN >=2700  *(1 non-fix leg)*

**R17** — RNAV (GPS) RWY 17

- **CLOCK:** CLOCK | WEBOM >=2600
- **(final):** WEBOM >=2600 | HABKO >=2400 | HABKO | RW17 832 | [CA leg - not a fix] | HONSE | VIO >=3000 | VIO >=3000  *(1 non-fix leg)*

**R26L** — RNAV (GPS) RWY 26L

- **UNSUN:** UNSUN | HAPIG >=2700
- **(final):** HAPIG >=2700 | CAVUS >=2700 | CAVUS | DAXEJ 1640 | RW26L 845 | [CA leg - not a fix] | FERLI | JAKES >=2700 | JAKES >=2700  *(1 non-fix leg)*

**R26R** — RNAV (GPS) RWY 26R

- **ORIEN:** ORIEN | FATOG >=3000
- **(final):** FATOG >=3000 | WAGMI >=2400 | WAGMI | RW26R 834 | [CA leg - not a fix] | JELMO | CLOCK >=3000 | CLOCK >=3000  *(1 non-fix leg)*

**R35** — RNAV (GPS) RWY 35

- **BOHRR:** BOHRR | JJUDD >=3000
- **(final):** JJUDD >=3000 | FALSU >=2500 | FALSU | HONSE 1480 | RW35 845 | [CA leg - not a fix] | HABKO | CLOCK >=3000 | CLOCK >=3000  *(1 non-fix leg)*

**S17** — VOR/DME required RWY 17

- **VIO:** VIO | TNMAN >=2500 | TNMAN >=2500
- **(final):** TNMAN >=2500 | GRFFN >=2500 | RW17 827 | VIO >=3000 | VIO >=3000

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`VIO`, `JJUDD`, `FIVLO`, `CLOCK`, `UNSUN`, `ORIEN`, `BOHRR`

### Fix coordinates

- **VIO** N42 47.20 / W85 29.82 -- `42.78672, -85.49707`
- **GOKUW** N42 51.85 / W85 39.11 -- `42.86424, -85.65177`
- **JAKES** N42 50.68 / W85 49.38 -- `42.84464, -85.82300`
- **RW08R** N21 18.41 / W157 56.75 -- `21.30680, -157.94585`
- **KNOBS** N42 53.70 / W85 22.71 -- `42.89495, -85.37843`
- **CFBZJ** N42 54.59 / W85 14.63 -- `42.90982, -85.24390`
- **RW26L** N21 18.41 / W157 54.64 -- `21.30680, -157.91060`
- **JJUDD** N42 40.86 / W85 28.56 -- `42.68107, -85.47606`
- **CALDO** N42 47.19 / W85 29.87 -- `42.78647, -85.49786`
- **RW35** N62 06.26 / W150 06.58 -- `62.10425, -150.10964`
- **WALKS** N43 00.59 / W85 33.51 -- `43.00988, -85.55852`
- **GLGHR** N42 53.09 / W85 28.14 -- `42.88482, -85.46906`
- **HONSE** N42 50.01 / W85 30.46 -- `42.83351, -85.50762`
- **FIVLO** N43 02.04 / W85 56.94 -- `43.03394, -85.94904`
- **HIPOP** N42 51.65 / W85 47.20 -- `42.86086, -85.78661`
- **JELMO** N42 52.59 / W85 38.95 -- `42.87654, -85.64911`
- **TECTU** N42 52.95 / W85 35.77 -- `42.88252, -85.59621`
- **RW08L** N21 19.51 / W157 56.60 -- `21.32524, -157.94338`
- **WAGMI** N42 54.18 / W85 24.78 -- `42.90306, -85.41296`
- **CLOCK** N43 08.74 / W85 35.77 -- `43.14569, -85.59614`
- **GLAWE** N42 51.86 / W85 39.02 -- `42.86440, -85.65029`
- **GABCE** N42 52.22 / W85 35.89 -- `42.87031, -85.59820`
- **CAVUS** N42 53.71 / W85 22.61 -- `42.89514, -85.37677`
- **SARAN** N42 54.67 / W85 15.88 -- `42.91111, -85.26466`
- **WEBOM** N43 04.25 / W85 33.42 -- `43.07080, -85.55705`
- **HABKO** N42 58.17 / W85 32.15 -- `42.96957, -85.53591`
- **RW17** N62 06.58 / W150 06.54 -- `62.10971, -150.10896`
- **UNSUN** N42 45.08 / W85 04.83 -- `42.75131, -85.08047`
- **HAPIG** N42 54.61 / W85 14.41 -- `42.91024, -85.24009`
- **DAXEJ** N42 53.22 / W85 26.96 -- `42.88706, -85.44928`
- **FERLI** N42 51.86 / W85 39.02 -- `42.86440, -85.65029`
- **ORIEN** N43 01.34 / W85 03.32 -- `43.02235, -85.05526`
- **FATOG** N42 55.10 / W85 16.51 -- `42.91831, -85.27510`
- **RW26R** N21 19.51 / W157 54.42 -- `21.32524, -157.90706`
- **BOHRR** N42 35.28 / W85 26.10 -- `42.58793, -85.43496`
- **FALSU** N42 46.92 / W85 29.82 -- `42.78202, -85.49694`
- **TNMAN** N43 03.00 / W85 33.23 -- `43.05002, -85.55381`
- **GRFFN** N42 58.06 / W85 32.16 -- `42.96766, -85.53601`

## KMKG

### STARs

**None coded.** CIFP does not code a STAR for KMKG — the chart is the only source.

### SIDs

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**I24** — ILS RWY 24

- **GUTPE:** GUTPE >=3000
- **(final):** GUTPE 3000 | ONTUE 2700 | RW24 682 | [CA leg - not a fix] | GUTPE >=3000 | GUTPE >=3000  *(1 non-fix leg)*

**I32** — ILS RWY 32

- **SINNI:** SINNI >=3000
- **(final):** SINNI 3000 | PADBE 2200 | RW32 678 | [CA leg - not a fix] | SINNI >=3000 | SINNI >=3000  *(1 non-fix leg)*

**L24** — LOC RWY 24

- **GUTPE:** GUTPE >=3000
- **(final):** GUTPE >=3000 | ONTUE >=2700 | PEEPL >=1160 | RW24 682 | [CA leg - not a fix] | GUTPE >=3000 | GUTPE >=3000  *(1 non-fix leg)*

**L32** — LOC RWY 32

- **SINNI:** SINNI >=3000
- **(final):** SINNI >=3000 | PADBE >=2200 | RW32 678 | [CA leg - not a fix] | SINNI >=3000 | SINNI >=3000  *(1 non-fix leg)*

**R06** — RNAV (GPS) RWY 06

- **HITPO:** HITPO >=3000
- **SALES:** SALES | HITPO >=3000
- **WASOG:** WASOG | HITPO >=3000
- **(final):** HITPO >=3000 | WEGUN >=2300 | WEGUN | RW06 666 | [CA leg - not a fix] | GUTPE >=3000 | GUTPE >=3000  *(1 non-fix leg)*

**R14** — RNAV (GPS) RWY 14

- **BULLY:** BULLY | NENUE >=2300 | NENUE >=2300
- **MOTAN:** MOTAN | NENUE >=2300
- **(final):** NENUE >=2300 | PIPKE >=2200 | PIPKE | RW14 672 | [CA leg - not a fix] | SINNI >=2700 | SINNI >=2700  *(1 non-fix leg)*

**R24** — RNAV (GPS) RWY 24

- **BULLY:** BULLY | GUTPE >=3000 | GUTPE >=3000
- **(final):** GUTPE >=3000 | ONTUE >=2700 | ONTUE | RW24 682 | [CA leg - not a fix] | HITPO >=3000 | HITPO >=3000  *(1 non-fix leg)*

**R32** — RNAV (GPS) RWY 32

- **BULLY:** BULLY | SINNI >=2700 | SINNI >=2700
- **(final):** SINNI >=2700 | PADBE >=2200 | PADBE | RW32 678 | [CA leg - not a fix] | NENUE >=2300 | NENUE >=2300  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`GUTPE`, `SINNI`, `HITPO`, `SALES`, `WASOG`, `BULLY`, `MOTAN`

### Fix coordinates

- **GUTPE** N43 17.10 / W85 59.78 -- `43.28504, -85.99629`
- **ONTUE** N43 13.79 / W86 06.62 -- `43.22990, -86.11032`
- **RW24** N64 02.81 / W145 25.81 -- `64.04681, -145.43023`
- **SINNI** N43 01.65 / W86 03.16 -- `43.02745, -86.05269`
- **PADBE** N43 06.24 / W86 08.91 -- `43.10403, -86.14846`
- **RW32** N58 43.85 / W157 01.14 -- `58.73084, -157.01906`
- **PEEPL** N43 11.12 / W86 12.13 -- `43.18534, -86.20214`
- **HITPO** N43 03.51 / W86 27.73 -- `43.05843, -86.46216`
- **SALES** N42 37.31 / W86 25.98 -- `42.62189, -86.43296`
- **WASOG** N43 02.00 / W86 36.22 -- `43.03335, -86.60361`
- **WEGUN** N43 06.85 / W86 20.89 -- `43.11424, -86.34809`
- **RW06** N64 02.80 / W145 26.49 -- `64.04661, -145.44146`
- **BULLY** N43 03.29 / W86 30.90 -- `43.05491, -86.51502`
- **NENUE** N43 18.70 / W86 24.59 -- `43.31172, -86.40990`
- **MOTAN** N43 24.61 / W86 24.16 -- `43.41018, -86.40260`
- **PIPKE** N43 13.98 / W86 18.64 -- `43.23307, -86.31060`
- **RW14** N58 44.14 / W157 01.32 -- `58.73561, -157.02205`

## KBTL

### STARs

**None coded.** CIFP does not code a STAR for KBTL — the chart is the only source.

### SIDs

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**I23R** — ILS RWY 23R

- **BATOL:** BATOL >=2600
- **(final):** TEEDO 2600 | BATOL 2200 | RW23R 978 | [CA leg - not a fix] | VVTEN >=3000 | VVTEN >=3000/200  *(1 non-fix leg)*

**L23R** — LOC RWY 23R

- **BATOL:** BATOL >=2600
- **(final):** TEEDO >=2600 | BATOL >=2200 | RW23R 978 | [CA leg - not a fix] | VVTEN >=3000 | VVTEN >=3000/200  *(1 non-fix leg)*

**R05L** — RNAV (GPS) RWY 05L

- **RESGY:** RESGY | WEVSO >=2500
- **WEVSO:** WEVSO >=2500
- **(final):** WEVSO >=2500 | ZEMSA >=2500 | ZEMSA | RW05L 1001 | [CA leg - not a fix] | WIPIL >=2500 | WIPIL >=2500  *(1 non-fix leg)*

**R23R** — RNAV (GPS) RWY 23R

- **VIO:** VIO | ZULSI >=3000 | WIPIL >=2500
- **WIPIL:** WIPIL >=2500
- **YOVUR:** YOVUR | WIPIL >=2500
- **(final):** WIPIL >=2500 | UYUNA >=2200 | UYUNA | RW23R 978 | [CA leg - not a fix] | WEVSO >=2500 | WEVSO >=2500  *(1 non-fix leg)*

**R31** — RNAV (GPS) RWY 31

- **ECKDO:** ECKDO | ULECO >=3000
- **GEEBE:** GEEBE | ULECO >=3000
- **ULECO:** ULECO >=3000
- **(final):** ULECO >=3000 | WAMOG >=2500 | WAMOG | UWPED 1540 | RW31 969 | [CA leg - not a fix] | XILVY | HEBEL >=3000 | HEBEL >=3000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`BATOL`, `RESGY`, `WEVSO`, `VIO`, `WIPIL`, `YOVUR`, `ECKDO`, `GEEBE`, `ULECO`

### Fix coordinates

- **BATOL** N42 21.71 / W85 11.05 -- `42.36176, -85.18409`
- **TEEDO** N42 26.19 / W85 05.46 -- `42.43656, -85.09104`
- **RW23R** N40 45.68 / W119 12.71 -- `40.76139, -119.21189`
- **VVTEN** N42 11.76 / W85 15.40 -- `42.19594, -85.25659`
- **RESGY** N42 06.84 / W85 35.12 -- `42.11393, -85.58528`
- **WEVSO** N42 09.82 / W85 25.74 -- `42.16366, -85.42902`
- **ZEMSA** N42 14.27 / W85 20.25 -- `42.23791, -85.33747`
- **RW05L** N40 45.31 / W119 13.80 -- `40.75521, -119.23000`
- **WIPIL** N42 26.78 / W85 04.73 -- `42.44638, -85.07879`
- **VIO** N42 47.20 / W85 29.82 -- `42.78672, -85.49707`
- **ZULSI** N42 32.21 / W85 12.68 -- `42.53679, -85.21129`
- **YOVUR** N42 22.71 / W84 58.78 -- `42.37847, -84.97966`
- **UYUNA** N42 21.78 / W85 10.95 -- `42.36301, -85.18253`
- **ECKDO** N42 14.41 / W84 44.82 -- `42.24012, -84.74699`
- **ULECO** N42 11.30 / W85 01.37 -- `42.18826, -85.02277`
- **GEEBE** N41 58.80 / W85 12.82 -- `41.98006, -85.21369`
- **WAMOG** N42 15.55 / W85 09.18 -- `42.25910, -85.15298`
- **UWPED** N42 17.32 / W85 12.45 -- `42.28866, -85.20749`
- **RW31** N59 33.01 / W139 30.46 -- `59.55022, -139.50770`
- **XILVY** N42 20.62 / W85 18.55 -- `42.34366, -85.30915`
- **HEBEL** N42 27.27 / W85 21.62 -- `42.45448, -85.36038`

## KBIV

### STARs

**None coded.** CIFP does not code a STAR for KBIV — the chart is the only source.

### SIDs

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**I26** — ILS RWY 26

- **JAVPO:** JAVPO >=2700
- **VIO:** VIO >=2700 | JAVPO >=2700
- **(final):** JAVPO 2700 | FENAB 2600 | RW26 718 | [CA leg - not a fix] | [VI leg - not a fix] | ZEELE >=2600 | ZEELE >=2600  *(2 non-fix legs)*

**L26** — LOC RWY 26

- **JAVPO:** JAVPO >=2700
- **VIO:** VIO >=2700 | JAVPO >=2700
- **(final):** JAVPO >=2700 | FENAB >=2600 | RECSI >=1220 | RW26 718 | [CA leg - not a fix] | [VI leg - not a fix] | ZEELE >=2600 | ZEELE >=2600  *(2 non-fix legs)*

**R08** — RNAV (GPS) RWY 08

- **WIKDO:** WIKDO >=2700
- **(final):** WIKDO >=2700 | CEDAC >=2500 | CEDAC | ZABUN 1340 | RW08 738 | [CA leg - not a fix] | JAVPO >=3000 | JAVPO >=3000  *(1 non-fix leg)*

**R26** — RNAV (GPS) RWY 26

- **JAVPO:** JAVPO >=3000
- **LOPIC:** LOPIC | JAVPO >=3000
- **TOLVE:** TOLVE | JAVPO >=3000
- **(final):** JAVPO >=3000 | FENAB >=2600 | FENAB | RW26 718 | [CA leg - not a fix] | HOXON >=2700 | HOXON >=2700  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`JAVPO`, `VIO`, `WIKDO`, `LOPIC`, `TOLVE`

### Fix coordinates

- **JAVPO** N42 46.78 / W85 49.72 -- `42.77973, -85.82865`
- **VIO** N42 47.20 / W85 29.82 -- `42.78672, -85.49707`
- **FENAB** N42 45.70 / W85 57.92 -- `42.76174, -85.96529`
- **RW26** N59 40.33 / W151 38.98 -- `59.67210, -151.64974`
- **ZEELE** N42 52.19 / W86 04.03 -- `42.86988, -86.06724`
- **RECSI** N42 44.94 / W86 03.71 -- `42.74893, -86.06176`
- **WIKDO** N42 42.24 / W86 23.72 -- `42.70396, -86.39534`
- **CEDAC** N42 43.49 / W86 14.52 -- `42.72477, -86.24192`
- **ZABUN** N42 44.14 / W86 09.67 -- `42.73565, -86.16110`
- **RW08** N59 40.33 / W151 39.96 -- `59.67212, -151.66597`
- **LOPIC** N42 53.68 / W85 51.39 -- `42.89462, -85.85646`
- **TOLVE** N42 39.89 / W85 48.06 -- `42.66483, -85.80095`
- **HOXON** N42 42.40 / W86 22.54 -- `42.70659, -86.37571`

## KHLM

**Nothing coded at all.** CIFP 260903 carries no SID, STAR or approach for KHLM.
That means CIFP does not code them, **not** that the field has none. The chart is the
only source.

