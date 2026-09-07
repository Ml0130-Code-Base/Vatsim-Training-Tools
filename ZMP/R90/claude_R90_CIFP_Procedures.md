# SID, STAR and approach data from CIFP — R90, Omaha TRACON

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

## Procedure identifiers

**Which procedure each block of transitions below belongs to.** The transition
listings further down are grouped by procedure but do not name it, so this table is
what turns a block into an attributable citation. Identifiers are as CIFP codes them
— the six-character field, revision digit included. CIFP does not carry the spoken
name, so none is written here.

### KOMA

**STARs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **AANDY2** | RNAV | MZEEE | RW14L RW14R RW18 RW32B |
| **HOWRY3** | conventional | GRI ONL | RW14B RW18 RW32B RW36 |
| **LANTK2** | conventional | DABOY DSM | ALL |
| **MARWI4** | conventional | LMN STJ | RW14B RW18 RW32B RW36 |
| **TIMMO1** | RNAV | HTHWY | RW14B RW18 RW32B RW36 |

---

## KOMA

### STARs

- **MZEEE:** MZEEE | BRKSR >=11
- **(final):** BRKSR >=11 | AANDY | CANIO
- **RW14L:** CANIO | BLUFS | LICIS >=4
- **RW14R:** CANIO | ERRLE | OTSEE 4
- **RW18:** CANIO | TASKY 4
- **RW32B:** CANIO | PTERZ >=6/220 | BRIKK >=5/210 | [FM leg - not a fix]  *(1 non-fix leg)*
- **GRI:** GRI | HOWRY
- **ONL:** ONL | OLU | HOWRY
- **(final):** HOWRY | BOYSS
- **RW14B:** BOYSS | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW18:** BOYSS | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW32B:** BOYSS | GEEZR | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW36:** BOYSS | GEEZR | [VM leg - not a fix]  *(1 non-fix leg)*
- **DABOY:** DABOY | LANTK
- **DSM:** DSM | LANTK
- **ALL:** LANTK | [VM leg - not a fix]  *(1 non-fix leg)*
- **LMN:** LMN | MARWI
- **STJ:** STJ | MARWI
- **RW14B:** MARWI | SWAAB | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW18:** MARWI | SWAAB | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW32B:** MARWI | SWAAB | OVR
- **RW36:** MARWI | SWAAB | OVR
- **HTHWY:** HTHWY | HILRS >=11
- **(final):** HILRS >=11 | TIMMO | MOONR
- **RW14B:** MOONR | CRPET 5/210 | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW18:** MOONR | CRPET 5/210 | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW32B:** MOONR | BAARK 4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW36:** MOONR | BAARK 4 | [FM leg - not a fix]  *(1 non-fix leg)*

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

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**H14LZ** — RNAV (RNP) RWY 14LZ

- **AULNR:** AULNR 4000/210 | GOHOX >=2700 | RELPE >=2200 | YEWSS >=2000
- **CRPET:** CRPET 5000/210 | FRMNT >=3700 | GOHOX >=2700 | RELPE >=2200 | YEWSS >=2000
- **HCKEY:** HCKEY <=5000/210 | IWEGN >=3600 | EFECU >=2400 | YEWSS >=2000
- **LICIS:** LICIS >=4000 | ZITEK >=2900 | AMUKY >=2400 | YEWSS >=2000
- **SPYVE:** SPYVE 5000/210 | TWITT >=4000 | IWEGN >=3600 | EFECU >=2400 | YEWSS >=2000
- **(final):** YEWSS >=2000 | YEWSS 0 | RW14L 1038 | COBCA | OVR >=3000 | OVR >=3000

**H14RZ** — RNAV (RNP) RWY 14RZ

- **AULNR:** AULNR 4000/210 | PAPIO >=2700 | JEMGU >=2400 | HUMOV >=2200 | CEDIR >=2000
- **CRPET:** CRPET 5000/210 | FOGEY >=3700 | PAPIO >=2700 | JEMGU >=2400 | HUMOV >=2200 | CEDIR >=2000
- **HCKEY:** HCKEY <=5000/210 | FEEDR >=3600 | NIGME >=2400 | CEDIR >=2000
- **OTSEE:** OTSEE 4000 | OSBRN >=2900 | URARE >=2400 | CEDIR >=2000
- **SPYVE:** SPYVE 5000/210 | DUCKX >=4000 | FEEDR >=3600 | NIGME >=2400 | CEDIR >=2000
- **(final):** CEDIR >=2000 | CEDIR 0 | RW14R 1042 | ZINOR | OVR >=3000 | OVR >=3000

**H18-Z** — RNAV (RNP) RWY 18 Z

- **CHAAD:** CHAAD >=5000/210 | FLIPN 4000 | DILTS >=2800 | EDUHU >=2300 | TMBER >=2000
- **JAKKI:** JAKKI >=5000/210 | QBERT >=4000 | SNRUB >=3000 | YIRUT >=2300 | TMBER >=2000
- **SHUDA:** SHUDA 4000/210 | SNRUB >=3000 | YIRUT >=2300 | TMBER >=2000
- **TASKY:** TASKY 4000 | OGYAH >=3300 | GEEKR >=2600 | TMBER >=2000
- **WOODA:** WOODA 4000/210 | DILTS >=2800 | EDUHU >=2300 | TMBER >=2000
- **(final):** TMBER >=2000 | TMBER 0 | RW18 1032 | CIVIV >=3000 | CIVIV >=3000

**H32LZ** — RNAV (RNP) RWY 32LZ

- **BAARK:** BAARK 4000 | TBOBB >=2800/210 | WOLIR >=2200 | TREEE >=2000
- **BRIKK:** BRIKK >=5000/210 | MVRIK >=4000 | PEGGG >=3200 | SAGTE >=2200 | TREEE >=2000
- **GEEZR:** GEEZR 5000/210 | DWITT >=4000 | TBOBB >=2800 | WOLIR >=2200 | TREEE >=2000
- **HILSS:** HILSS <=5000 | LOESS 4000/210 | PEGGG >=3200 | SAGTE >=2200 | TREEE >=2000
- **MANWA:** MANWA 5000 | BOCTA >=3100 | JITIG >=2200 | TREEE >=2000
- **(final):** TREEE >=2000 | TREEE 0 | RW32L 1037 | OTSEE >=3300 | OTSEE >=3300

**H32RZ** — RNAV (RNP) RWY 32RZ

- **BAARK:** BAARK 4000 | POTHF >=2700/210 | YETPU >=2200 | TWIGG >=2000
- **BRIKK:** BRIKK >=5000/210 | SAMTT >=4000 | TPTOP >=3200 | OFIWO >=2200 | TWIGG >=2000
- **GEEZR:** GEEZR 5000/210 | JUNYR >=4000 | POTHF >=2700/210 | YETPU >=2200 | TWIGG >=2000
- **HILSS:** HILSS <=5000 | LOESS 4000/210 | TPTOP >=3200 | OFIWO >=2200 | TWIGG >=2000
- **MANWA:** MANWA 5000 | CUCGA >=3600 | BEEFF >=2600 | WEWNY >=2200 | TWIGG >=2000
- **(final):** TWIGG >=2000 | TWIGG 0/2 | RW32R 1036 | HIKAM | OTSEE >=3300 | OTSEE >=3300

**H36-Z** — RNAV (RNP) RWY 36 Z

- **BAARK:** BAARK 4000 | BIGBK >=2800 | LEAVS >=2000
- **CHAZU:** CHAZU >=5000 | HMENZ >=4000/210 | WOOHU >=3700 | KIRKR >=3000 | LEAVS >=2000
- **HORSS:** HORSS 5000 | CRRZY >=3400/210 | ZIKEP >=2700 | LEAVS >=2000
- **LOESS:** LOESS >=4000/210 | WOOHU >=3700 | KIRKR >=3000 | LEAVS >=2000
- **MANWA:** MANWA 5000 | JOKRR >=4000 | KYLEY >=3400/210 | BIGBK >=2800 | LEAVS >=2000
- **(final):** LEAVS >=2000 | LEAVS 0 | RW36 1036 | TASKY >=3000 | TASKY >=3000

**I14L** — ILS RWY 14L

- **OVR:** OVR | BUFFT 3000 - 6000 | BUFFT >=2900
- **(final):** CFTZP 2900 | BUFFT 2400 | RW14L 1038 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**I14R** — ILS RWY 14R

- **OVR:** OVR | ZATAR 3100 - 6000 | ZATAR >=2900
- **(final):** OTSEE 3000 | ZATAR 2400 | RW14R 1041 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**I18** — ILS RWY 18

- **(final):** TASKY 3000 | CEPUT 2800 | RW18 1033 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**I32L** — ILS RWY 32L

- **OVR:** OVR >=2800 | BOCTA >=2800
- **PONYS:** PONYS >=2800 | BOCTA >=2800
- **(final):** BOCTA 2800 | PONYS 2800 | RW32L 1033 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**I32R** — ILS RWY 32R

- **OVR:** OVR | BEEFF >=2800 | BEEFF >=2800
- **(final):** CFVCT 2800 | BEEFF 2800 | RW32R 1036 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**I36** — ILS RWY 36

- **LNK:** LNK >=4000 | CIVIV >=4000
- **OVR:** OVR | CIVIV >=4000 | CIVIV >=4000
- **(final):** CIVIV 4000 | COBIT >=3000 | SMTHY 2500 | RW36 1036 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**L14L** — LOC RWY 14L

- **OVR:** OVR | BUFFT 3000 - 6000 | BUFFT >=2900
- **(final):** CFTZP >=2900 | BUFFT >=2400 | RW14L 1038 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**L14R** — LOC RWY 14R

- **OVR:** OVR | ZATAR 3100 - 6000 | ZATAR >=2900
- **(final):** OTSEE >=3000 | ZATAR >=2400 | FILER >=1800 | RW14R 1041 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**L18** — LOC RWY 18

- **(final):** TASKY >=3000 | CEPUT >=2800 | PINNO >=1460 | RW18 1033 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**L32L** — LOC RWY 32L

- **OVR:** OVR >=2800 | BOCTA >=2800
- **PONYS:** PONYS >=2800 | BOCTA >=2800
- **(final):** BOCTA >=2800 | PONYS >=2800 | FAPON >=1700 | RW32L 1033 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**L32R** — LOC RWY 32R

- **OVR:** OVR | BEEFF >=2800 | BEEFF >=2800
- **(final):** CFVCT >=2800 | BEEFF >=2800 | RW32R 1036 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**L36** — LOC RWY 36

- **LNK:** LNK >=4000 | CIVIV >=4000
- **OVR:** OVR | CIVIV >=4000 | CIVIV >=4000
- **(final):** CIVIV >=4000 | COBIT >=3000 | SMTHY >=2500 | RW36 1036 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**R14LY** — RNAV (GPS) RWY 14LY

- **BOYSS:** BOYSS | LICIS >=3300 | LICIS >=3300
- **CANIO:** CANIO | LICIS >=3300
- **GLENE:** GLENE | LICIS >=3600 | LICIS >=3300
- **OVR:** OVR | LICIS >=3300 | LICIS >=3300
- **(final):** LICIS >=3300 | BUFFT >=2400 | BUFFT | RW14L 1038 | [CA leg - not a fix] | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**R14RY** — RNAV (GPS) RWY 14RY

- **BOYSS:** BOYSS | OTSEE >=3300 | OTSEE >=3300
- **CANIO:** CANIO | OTSEE >=3300
- **GLENE:** GLENE | OTSEE >=3300 | OTSEE >=3300
- **OVR:** OVR | OTSEE >=3300 | OTSEE >=3300
- **(final):** OTSEE >=3300 | ZATAR >=2400 | ZATAR | FILER 1800 | RW14R 1041 | [CA leg - not a fix] | HETAN | OVR >=3000 | OVR >=3000  *(1 non-fix leg)*

**R18-Y** — RNAV (GPS) RWY 18 Y

- **CANIO:** CANIO | TASKY >=3000
- **GLENE:** GLENE | TASKY >=3000 | TASKY >=3000
- **KENAR:** KENAR | TASKY >=3000 | TASKY >=3000
- **OVR:** OVR | TASKY >=3000 | TASKY >=3000
- **(final):** TASKY >=3000 | CEPUT >=2800 | CEPUT | RW18 1033 | [CA leg - not a fix] | CIVIV >=3000 | CIVIV >=3000  *(1 non-fix leg)*

**R32LY** — RNAV (GPS) RWY 32LY

- **EMEND:** EMEND | CUPOD >=4000
- **MEPWE:** MEPWE | CUPOD >=4000 | CUPOD >=4000
- **OVR:** OVR | CUPOD >=4000 | CUPOD >=4000
- **VIKKI:** VIKKI | CUPOD >=4000
- **(final):** CUPOD >=4000 | PONYS >=2800 | PONYS | FAPON 1700 | RW32L 1033 | [CA leg - not a fix] | OTSEE >=3300 | OTSEE >=3300  *(1 non-fix leg)*

**R32RY** — RNAV (GPS) RWY 32RY

- **EMEND:** EMEND | CUTBO >=4000
- **MEPWE:** MEPWE | CUTBO >=4000 | CUTBO >=4000
- **OVR:** OVR | CUTBO >=4000 | CUTBO >=4000
- **VIKKI:** VIKKI | CUTBO >=4000
- **(final):** CUTBO >=4000 | BEEFF >=2800 | BEEFF | RW32R 1036 | [CA leg - not a fix] | OTSEE >=3300 | OTSEE >=3300  *(1 non-fix leg)*

**R36-Y** — RNAV (GPS) RWY 36 Y

- **MEPWE:** MEPWE | CIVIV >=4000 | CIVIV >=4000
- **OVR:** OVR | CIVIV >=4000 | CIVIV >=4000
- **REKTY:** REKTY | CIVIV >=4000
- **(final):** CIVIV >=4000 | COBIT >=3000 | SMTHY >=2500 | SMTHY | AROCO 1540 | RW36 1036 | [CA leg - not a fix] | TASKY >=3000 | TASKY >=3000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`AULNR`, `CRPET`, `HCKEY`, `LICIS`, `SPYVE`, `OTSEE`, `CHAAD`, `JAKKI`, `SHUDA`, `TASKY`, `WOODA`, `BAARK`, `BRIKK`, `GEEZR`, `HILSS`, `MANWA`, `CHAZU`, `HORSS`, `LOESS`, `OVR`, `PONYS`, `LNK`, `BOYSS`, `CANIO`, `GLENE`, `KENAR`, `EMEND`, `MEPWE`, `VIKKI`, `REKTY`

### Fix coordinates

- **AULNR** N41 21.92 / W96 05.11 -- `41.36536, -96.08510`
- **GOHOX** N41 22.28 / W95 59.25 -- `41.37132, -95.98754`
- **RELPE** N41 21.73 / W95 56.93 -- `41.36217, -95.94889`
- **YEWSS** N41 21.27 / W95 56.36 -- `41.35448, -95.93934`
- **CRPET** N41 16.11 / W96 02.93 -- `41.26852, -96.04891`
- **FRMNT** N41 20.18 / W96 02.20 -- `41.33626, -96.03670`
- **HCKEY** N41 25.79 / W95 49.40 -- `41.42977, -95.82329`
- **IWEGN** N41 25.11 / W95 54.31 -- `41.41845, -95.90510`
- **EFECU** N41 22.43 / W95 56.95 -- `41.37382, -95.94918`
- **LICIS** N41 27.19 / W96 02.00 -- `41.45309, -96.03334`
- **ZITEK** N41 23.73 / W95 58.70 -- `41.39544, -95.97831`
- **AMUKY** N41 22.37 / W95 57.40 -- `41.37278, -95.95674`
- **SPYVE** N41 21.61 / W95 48.68 -- `41.36018, -95.81140`
- **TWITT** N41 24.12 / W95 51.07 -- `41.40205, -95.85114`
- **RW14L** N27 53.39 / W97 21.02 -- `27.88976, -97.35026`
- **COBCA** N41 13.06 / W95 48.57 -- `41.21767, -95.80944`
- **OVR** N41 10.03 / W95 44.21 -- `41.16717, -95.73685`
- **PAPIO** N41 22.29 / W95 59.61 -- `41.37145, -95.99349`
- **JEMGU** N41 22.10 / W95 58.04 -- `41.36827, -95.96733`
- **HUMOV** N41 21.77 / W95 57.31 -- `41.36282, -95.95522`
- **CEDIR** N41 21.28 / W95 56.69 -- `41.35464, -95.94487`
- **FOGEY** N41 20.03 / W96 02.55 -- `41.33390, -96.04258`
- **FEEDR** N41 25.28 / W95 54.40 -- `41.42128, -95.90672`
- **NIGME** N41 22.51 / W95 57.31 -- `41.37514, -95.95513`
- **OTSEE** N41 27.37 / W96 02.50 -- `41.45611, -96.04160`
- **OSBRN** N41 23.73 / W95 59.02 -- `41.39547, -95.98374`
- **URARE** N41 22.30 / W95 57.67 -- `41.37172, -95.96112`
- **DUCKX** N41 24.25 / W95 51.22 -- `41.40414, -95.85361`
- **RW14R** N27 53.22 / W97 21.17 -- `27.88697, -97.35276`
- **ZINOR** N41 13.04 / W95 48.87 -- `41.21728, -95.81444`
- **CHAAD** N41 19.73 / W95 44.86 -- `41.32876, -95.74765`
- **FLIPN** N41 23.11 / W95 47.77 -- `41.38510, -95.79610`
- **DILTS** N41 24.16 / W95 51.12 -- `41.40267, -95.85193`
- **EDUHU** N41 23.02 / W95 53.22 -- `41.38361, -95.88706`
- **TMBER** N41 21.82 / W95 53.66 -- `41.36364, -95.89426`
- **JAKKI** N41 18.83 / W96 00.15 -- `41.31385, -96.00244`
- **QBERT** N41 21.86 / W96 00.05 -- `41.36438, -96.00088`
- **SNRUB** N41 24.20 / W95 57.29 -- `41.40341, -95.95478`
- **YIRUT** N41 23.02 / W95 54.08 -- `41.38365, -95.90127`
- **SHUDA** N41 23.79 / W96 01.23 -- `41.39643, -96.02055`
- **TASKY** N41 30.28 / W95 53.61 -- `41.50473, -95.89358`
- **OGYAH** N41 27.35 / W95 53.63 -- `41.45584, -95.89382`
- **GEEKR** N41 24.82 / W95 53.64 -- `41.41365, -95.89402`
- **WOODA** N41 25.03 / W95 45.52 -- `41.41717, -95.75865`
- **RW18** N60 44.12 / W151 12.77 -- `60.73526, -151.21290`
- **CIVIV** N41 05.45 / W95 53.74 -- `41.09086, -95.89559`
- **BAARK** N41 08.14 / W95 53.72 -- `41.13573, -95.89536`
- **TBOBB** N41 12.52 / W95 50.61 -- `41.20867, -95.84345`
- **WOLIR** N41 14.54 / W95 50.43 -- `41.24238, -95.84050`
- **TREEE** N41 15.10 / W95 50.82 -- `41.25164, -95.84706`
- **BRIKK** N41 20.48 / W95 47.65 -- `41.34138, -95.79415`
- **MVRIK** N41 18.06 / W95 45.34 -- `41.30093, -95.75573`
- **PEGGG** N41 14.53 / W95 46.08 -- `41.24221, -95.76802`
- **SAGTE** N41 14.51 / W95 50.04 -- `41.24175, -95.83392`
- **GEEZR** N41 12.65 / W95 58.51 -- `41.21088, -95.97510`
- **DWITT** N41 11.43 / W95 54.72 -- `41.19055, -95.91208`
- **HILSS** N41 18.09 / W95 39.80 -- `41.30148, -95.66341`
- **LOESS** N41 15.97 / W95 43.50 -- `41.26617, -95.72503`
- **MANWA** N41 05.06 / W95 41.33 -- `41.08436, -95.68879`
- **BOCTA** N41 11.39 / W95 47.32 -- `41.18989, -95.78861`
- **JITIG** N41 14.15 / W95 49.93 -- `41.23590, -95.83216`
- **RW32L** N27 53.03 / W97 21.01 -- `27.88386, -97.35019`
- **POTHF** N41 12.60 / W95 50.42 -- `41.20995, -95.84030`
- **YETPU** N41 14.66 / W95 50.22 -- `41.24433, -95.83694`
- **TWIGG** N41 15.21 / W95 50.61 -- `41.25352, -95.84347`
- **SAMTT** N41 18.05 / W95 45.34 -- `41.30083, -95.75571`
- **TPTOP** N41 14.61 / W95 46.16 -- `41.24351, -95.76931`
- **OFIWO** N41 14.75 / W95 50.04 -- `41.24588, -95.83406`
- **JUNYR** N41 11.50 / W95 54.36 -- `41.19166, -95.90596`
- **CUCGA** N41 09.94 / W95 45.74 -- `41.16562, -95.76237`
- **BEEFF** N41 13.17 / W95 48.67 -- `41.21944, -95.81120`
- **WEWNY** N41 14.27 / W95 49.72 -- `41.23788, -95.82865`
- **RW32R** N27 53.05 / W97 20.80 -- `27.88418, -97.34660`
- **HIKAM** N41 23.38 / W95 58.37 -- `41.38966, -95.97277`
- **BIGBK** N41 11.43 / W95 53.71 -- `41.19044, -95.89510`
- **LEAVS** N41 14.43 / W95 53.69 -- `41.24051, -95.89485`
- **CHAZU** N41 17.42 / W95 47.20 -- `41.29025, -95.78673`
- **HMENZ** N41 14.41 / W95 47.22 -- `41.24018, -95.78704`
- **WOOHU** N41 12.63 / W95 48.25 -- `41.21057, -95.80423`
- **KIRKR** N41 12.08 / W95 51.35 -- `41.20126, -95.85587`
- **HORSS** N41 15.25 / W96 03.53 -- `41.25413, -96.05881`
- **CRRZY** N41 12.52 / W95 58.86 -- `41.20873, -95.98104`
- **ZIKEP** N41 12.26 / W95 55.49 -- `41.20437, -95.92487`
- **JOKRR** N41 07.88 / W95 48.46 -- `41.13137, -95.80768`
- **KYLEY** N41 09.27 / W95 51.98 -- `41.15449, -95.86635`
- **RW36** N60 43.94 / W151 12.86 -- `60.73238, -151.21429`
- **BUFFT** N41 22.29 / W95 57.33 -- `41.37149, -95.95554`
- **CFTZP** N41 27.17 / W96 01.97 -- `41.45281, -96.03278`
- **ZATAR** N41 22.30 / W95 57.66 -- `41.37166, -95.96108`
- **CEPUT** N41 24.33 / W95 53.64 -- `41.40548, -95.89406`
- **PONYS** N41 13.04 / W95 48.88 -- `41.21736, -95.81460`
- **CFVCT** N41 08.28 / W95 44.05 -- `41.13806, -95.73416`
- **LNK** N40 55.43 / W96 44.52 -- `40.92379, -96.74201`
- **COBIT** N41 10.86 / W95 53.71 -- `41.18104, -95.89515`
- **SMTHY** N41 12.86 / W95 53.70 -- `41.21433, -95.89499`
- **FILER** N41 20.78 / W95 56.22 -- `41.34638, -95.93701`
- **PINNO** N41 20.29 / W95 53.66 -- `41.33821, -95.89439`
- **FAPON** N41 15.85 / W95 51.54 -- `41.26416, -95.85893`
- **BOYSS** N41 15.87 / W96 16.42 -- `41.26458, -96.27368`
- **CANIO** N41 38.80 / W95 58.38 -- `41.64669, -95.97306`
- **GLENE** N41 27.08 / W95 30.30 -- `41.45134, -95.50498`
- **HETAN** N41 16.39 / W95 52.05 -- `41.27316, -95.86747`
- **KENAR** N41 27.54 / W96 19.76 -- `41.45896, -96.32939`
- **EMEND** N41 04.33 / W95 26.01 -- `41.07211, -95.43350`
- **CUPOD** N41 06.98 / W95 43.14 -- `41.11625, -95.71908`
- **MEPWE** N41 05.16 / W96 04.63 -- `41.08599, -96.07722`
- **VIKKI** N40 41.59 / W95 24.83 -- `40.69310, -95.41387`
- **CUTBO** N41 07.09 / W95 42.93 -- `41.11817, -95.71553`
- **REKTY** N41 00.28 / W95 56.02 -- `41.00461, -95.93364`
- **AROCO** N41 15.86 / W95 53.69 -- `41.26429, -95.89475`

## KLNK

### STARs

**None coded.** CIFP does not code a STAR for KLNK — the chart is the only source.

### SIDs

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**I18-Y** — ILS RWY 18 Y

- **HUSKR:** HUSKR | [VI leg - not a fix] | ESACO >=3200  *(1 non-fix leg)*
- **LNK:** LNK >=3200 | JUSAM >=3200 | JUSAM >=3200 |  | ESACO >=3200
- **(final):** ESACO 3200 | CLONE 2900 | RW18 1250 | [CA leg - not a fix] | LNK >=3000 | LNK >=3000  *(1 non-fix leg)*

**I36-Y** — ILS RWY 36 Y

- **LNK:** LNK | FABRE >=3300 | FABRE >=3300
- **(final):** THEWS 2800 | FABRE 2800 | RW36 1230 | [CA leg - not a fix] | LNK >=3100 | LNK >=3100  *(1 non-fix leg)*

**L18-Y** — LOC RWY 18 Y

- **HUSKR:** HUSKR | [VI leg - not a fix] | ESACO >=3200  *(1 non-fix leg)*
- **LNK:** LNK >=3200 | JUSAM >=3200 | JUSAM >=3200 |  | ESACO >=3200
- **(final):** ESACO >=3200 | CLONE >=2900 | ROROC >=1780 | RW18 1250 | [CA leg - not a fix] | LNK >=3000 | LNK >=3000  *(1 non-fix leg)*

**L36-Y** — LOC RWY 36 Y

- **LNK:** LNK | FABRE >=3300 | FABRE >=3300
- **(final):** THEWS >=2800 | FABRE >=2800 | JEMVI >=1860 | RW36 1230 | [CA leg - not a fix] | LNK >=3100 | LNK >=3100  *(1 non-fix leg)*

**R14** — RNAV (GPS) RWY 14

- **ZUBTO:** ZUBTO >=3200
- **(final):** ZUBTO >=3200 | OPIZU >=3000 | OPIZU | HAGTI 1960 | RW14 1247 | [CA leg - not a fix] | OWSEW >=3100 | OWSEW >=3100  *(1 non-fix leg)*

**R17** — RNAV (GPS) RWY 17

- **DWELL:** DWELL | HIREK >=3800
- **HIREK:** HIREK >=3800
- **YUTAN:** YUTAN | HIREK >=3800
- **(final):** HIREK >=3800 | ZAKRI >=3000 | ZAKRI | WUVTI 1940 | RW17 1263 | [CA leg - not a fix] | HIVUV >=3300 | HIVUV >=3300  *(1 non-fix leg)*

**R18** — RNAV (GPS) RWY 18

- **AYARE:** AYARE >=3800
- **CUSUP:** CUSUP | AYARE >=3800
- **SEVOY:** SEVOY | AYARE >=3800
- **(final):** AYARE >=3800 | FIMUK >=2900 | FIMUK | MAXOE 2000 | RW18 1250 | [CA leg - not a fix] | GONBE >=3700 | GONBE >=3700  *(1 non-fix leg)*

**R32** — RNAV (GPS) RWY 32

- **OWSEW:** OWSEW >=3100
- **(final):** OWSEW >=3100 | YAPUL >=3000 | YAPUL | ZULNO 2020 | RW32 1229 | [CA leg - not a fix] | ZUBTO >=3200 | ZUBTO >=3200  *(1 non-fix leg)*

**R35** — RNAV (GPS) RWY 35

- **HIVUV:** HIVUV >=3300
- **PANNY:** PANNY | HIVUV >=3300
- **VACUS:** VACUS | HIVUV >=3300
- **(final):** HIVUV >=3300 | SAICE >=3000 | SAICE | UKOGE 1880 | RW35 1218 | [CA leg - not a fix] | HIREK >=3800 | HIREK >=3800  *(1 non-fix leg)*

**R36** — RNAV (GPS) RWY 36

- **GONBE:** GONBE >=3700
- **HEGLU:** HEGLU | GONBE >=3700
- **JESUR:** JESUR | GONBE >=3700
- **(final):** GONBE >=3700 | JUDAD >=2800 | JUDAD | RW36 1231 | [CA leg - not a fix] | AYARE >=3800 | AYARE >=3800  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`HUSKR`, `LNK`, `ZUBTO`, `DWELL`, `HIREK`, `YUTAN`, `AYARE`, `CUSUP`, `SEVOY`, `OWSEW`, `HIVUV`, `PANNY`, `VACUS`, `GONBE`, `HEGLU`, `JESUR`

### Fix coordinates

- **HUSKR** N41 06.10 / W96 45.51 -- `41.10165, -96.75846`
- **ESACO** N41 00.46 / W96 45.64 -- `41.00774, -96.76074`
- **LNK** N40 55.43 / W96 44.52 -- `40.92379, -96.74201`
- **JUSAM** N41 05.80 / W96 52.50 -- `41.09667, -96.87508`
- **CLONE** N40 56.69 / W96 45.67 -- `40.94489, -96.76115`
- **RW18** N60 44.12 / W151 12.77 -- `60.73526, -151.21290`
- **FABRE** N40 44.72 / W96 45.75 -- `40.74538, -96.76244`
- **THEWS** N40 36.54 / W96 45.80 -- `40.60900, -96.76330`
- **RW36** N60 43.94 / W151 12.86 -- `60.73238, -151.21429`
- **ROROC** N40 53.45 / W96 45.69 -- `40.89084, -96.76149`
- **JEMVI** N40 47.68 / W96 45.73 -- `40.79460, -96.76212`
- **ZUBTO** N41 02.23 / W96 55.60 -- `41.03720, -96.92672`
- **OPIZU** N40 56.50 / W96 50.30 -- `40.94168, -96.83830`
- **HAGTI** N40 53.88 / W96 47.87 -- `40.89792, -96.79790`
- **RW14** N58 44.14 / W157 01.32 -- `58.73561, -157.02205`
- **OWSEW** N40 40.63 / W96 35.70 -- `40.67713, -96.59508`
- **DWELL** N41 05.39 / W96 55.77 -- `41.08979, -96.92950`
- **HIREK** N41 03.15 / W96 44.97 -- `41.05246, -96.74948`
- **YUTAN** N41 07.04 / W96 31.62 -- `41.11733, -96.52704`
- **ZAKRI** N40 57.14 / W96 45.01 -- `40.95232, -96.75016`
- **WUVTI** N40 53.81 / W96 45.03 -- `40.89681, -96.75052`
- **RW17** N62 06.58 / W150 06.54 -- `62.10971, -150.10896`
- **HIVUV** N40 38.12 / W96 45.14 -- `40.63529, -96.75226`
- **AYARE** N41 02.90 / W96 45.63 -- `41.04840, -96.76048`
- **CUSUP** N41 02.93 / W96 52.24 -- `41.04876, -96.87062`
- **SEVOY** N41 02.88 / W96 39.02 -- `41.04794, -96.65034`
- **FIMUK** N40 56.89 / W96 45.67 -- `40.94818, -96.76113`
- **MAXOE** N40 54.18 / W96 45.69 -- `40.90302, -96.76142`
- **GONBE** N40 38.78 / W96 45.78 -- `40.64630, -96.76307`
- **YAPUL** N40 46.37 / W96 40.97 -- `40.77290, -96.68284`
- **ZULNO** N40 48.88 / W96 43.28 -- `40.81473, -96.72129`
- **RW32** N58 43.85 / W157 01.14 -- `58.73084, -157.01906`
- **PANNY** N40 37.99 / W96 29.10 -- `40.63314, -96.48495`
- **VACUS** N40 28.81 / W96 56.51 -- `40.48024, -96.94191`
- **SAICE** N40 45.13 / W96 45.09 -- `40.75211, -96.75148`
- **UKOGE** N40 48.62 / W96 45.07 -- `40.81040, -96.75109`
- **RW35** N62 06.26 / W150 06.58 -- `62.10425, -150.10964`
- **HEGLU** N40 38.80 / W96 52.35 -- `40.64666, -96.87255`
- **JESUR** N40 38.75 / W96 39.22 -- `40.64584, -96.65359`
- **JUDAD** N40 44.79 / W96 45.75 -- `40.74650, -96.76243`

