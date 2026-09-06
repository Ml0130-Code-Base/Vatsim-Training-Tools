# SID and STAR data from CIFP — KSLC

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

## KSLC

### STARs

- **BEARR5 -> BYI:** BYI | EFFTA | NORDD | BLIDA | BEARR
- **BEARR5 -> LCU:** LCU | BEARR
- **BEARR5 -> PIH:** PIH | MLD | TEALZ | BEARR
- **BEARR5 -> RW14:** BEARR | OGD >=11
- **BEARR5 -> RW16B:** BEARR | OGD >=11
- **BEARR5 -> RW17:** BEARR | OGD >=11
- **BEARR5 -> RW32:** BEARR | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **BEARR5 -> RW34B:** BEARR | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **BEARR5 -> RW35:** BEARR | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **BVL2 -> ALL:** BVL | KNOLE | WAATS
- **CARTR1 -> BOBRT:** BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **CARTR1 -> CKW:** CKW | SSIGN | BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **CARTR1 -> DBS:** DBS | LAVAH | LHO >=14 | CARTR
- **CARTR1 -> DDY:** DDY | STOPP | BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **CARTR1 -> JAC:** JAC | LAVAH | LHO >=14 | CARTR
- **CARTR1 -> OCS:** OCS | BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **CARTR1 -> RW16B:** CARTR | WEBER >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **CARTR1 -> RW17:** CARTR | WEBER >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **CARTR1 -> RW34B:** CARTR | SETTT >=14 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **CARTR1 -> RW35:** CARTR | SETTT >=14 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **JAMMN5 -> BCE:** BCE | SLINA | DTA | LAZLO | JAMMN
- **JAMMN5 -> MLF:** MLF | BEVRR | DTA | LAZLO | JAMMN
- **JAMMN5 -> ALL:** JAMMN | SPIEK | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **JAZZZ1 -> HELPR:** HELPR | GOSHU | SPANE 15/250
- **JAZZZ1 -> MTU:** MTU | THISL | SPANE 15/250
- **JAZZZ1 -> RACER:** RACER | MTU | THISL | SPANE 15/250
- **JAZZZ1 -> ALL:** SPANE 15/250 | RUSHN >=13 | JAZZZ >=12/230 | [FM leg - not a fix]  *(1 non-fix leg)*
- **LHO5 -> BPI:** BPI | LHO
- **LHO5 -> DBS:** DBS | LAVAH | LHO
- **LHO5 -> JAC:** JAC | ELKHO | LAVAH | LHO
- **LHO5 -> OCS:** OCS | LHO
- **LHO5 -> RW16L:** LHO | CARTR >=14 | [VM leg - not a fix]  *(1 non-fix leg)*
- **LHO5 -> RW34L:** LHO | CARTR >=14 | OGD | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **PITTT2 -> BCE:** BCE | SLINA >=17 | DTA | JAMMN 17/280 | DRAPR 14 - 15 | SPIEK 13 - 14 | HEIRY | PITTT 12
- **PITTT2 -> EKR:** EKR | RACER | MTU | THISL | SPANE FL190/280 | LEEHY | FFU 17 | DRYVE >=15 | PITTT 12
- **PITTT2 -> HELPR:** HELPR | GOSHU | SPANE FL190/280 | LEEHY | FFU 17 | DRYVE >=15 | PITTT 12
- **PITTT2 -> MLF:** MLF | BEVRR | DTA | JAMMN 17/280 | DRAPR 14 - 15 | SPIEK 13 - 14 | HEIRY | PITTT 12
- **PITTT2 -> MTU:** MTU | THISL | SPANE FL190/280 | LEEHY | FFU 17 | DRYVE >=15 | PITTT 12
- **PITTT2 -> RW16B:** PITTT 12 | MAGNE | QUIPA | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **PITTT2 -> RW17:** PITTT 12 | MAGNE | QUIPA | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **QWENN7 -> BCE:** BCE | HOPIN <=FL300 | LEEVT | JAMMN 15/250
- **QWENN7 -> DTA:** DTA | LAZLO | JAMMN 15/250
- **QWENN7 -> MLF:** MLF | BEVRR <=FL310 | DTA | LAZLO | JAMMN 15/250
- **QWENN7 -> ALL:** JAMMN 15/250 | SCHAW 12 | QWENN 11/230 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SKEES6 -> BYI:** BYI | EFFTA | BLIDA >=13 | BEARR
- **SKEES6 -> PIH:** PIH | MLD | SLOAP | BEARR
- **SKEES6 -> common route:** BEARR | SKEES
- **SKEES6 -> RW16B:** SKEES | EKKHO 11/250 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SKEES6 -> RW17:** SKEES | EKKHO 11/250 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SKEES6 -> RW34B:** SKEES | HUUPR <=13 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SKEES6 -> RW35:** SKEES | HUUPR <=13 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SPANE8 -> EKR:** EKR | RACER | MTU | THISL | SPANE
- **SPANE8 -> HELPR:** HELPR | GOSHU | SPANE
- **SPANE8 -> RW14:** SPANE | BOAGY | FFU | DRYVE | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **SPANE8 -> RW16B:** SPANE | BOAGY | FFU | DRYVE | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **SPANE8 -> RW17:** SPANE | BOAGY | FFU | DRYVE | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **SPANE8 -> RW32:** SPANE | BOAGY | FFU
- **SPANE8 -> RW34B:** SPANE | BOAGY | FFU
- **SPANE8 -> RW35:** SPANE | BOAGY | FFU
- **YUTES2 -> FLECC:** FLECC | BVL | KNOLE 17/250 | SKWAH >=14 | YUTES
- **YUTES2 -> RW16B:** YUTES | DUGGY | JAXXX 12 | MAGNE | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **YUTES2 -> RW17:** YUTES | DUGGY | JAXXX 12 | MAGNE | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **YUTES2 -> RW34B:** YUTES | GOGGL | BUSHH 12 | MARYZ | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **YUTES2 -> RW35:** YUTES | GOGGL | BUSHH 12 | MARYZ | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **BYI** N42 34.81 / W113 51.95 -- `42.58024, -113.86586`
- **EFFTA** N42 17.04 / W113 28.21 -- `42.28396, -113.47011`
- **NORDD** N42 06.33 / W113 14.07 -- `42.10553, -113.23444`
- **BLIDA** N41 41.59 / W112 41.83 -- `41.69314, -112.69718`
- **BEARR** N41 31.85 / W112 29.31 -- `41.53079, -112.48844`
- **LCU** N41 21.78 / W113 50.44 -- `41.36295, -113.84062`
- **PIH** N42 52.22 / W112 39.13 -- `42.87038, -112.65223`
- **MLD** N42 11.99 / W112 27.07 -- `42.19990, -112.45124`
- **TEALZ** N41 46.84 / W112 28.48 -- `41.78069, -112.47462`
- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`
- **DYANN** N41 04.54 / W112 08.83 -- `41.07569, -112.14714`
- **BVL** N40 43.57 / W113 45.45 -- `40.72610, -113.75742`
- **KNOLE** N40 43.36 / W112 51.52 -- `40.72260, -112.85865`
- **WAATS** N40 43.17 / W112 31.79 -- `40.71958, -112.52987`
- **BOBRT** N41 55.13 / W110 48.64 -- `41.91887, -110.81064`
- **KRANC** N41 52.85 / W111 33.96 -- `41.88089, -111.56598`
- **LHO** N41 47.57 / W112 00.59 -- `41.79290, -112.00977`
- **CARTR** N41 33.66 / W112 02.76 -- `41.56104, -112.04604`
- **CKW** N41 45.34 / W107 34.92 -- `41.75571, -107.58198`
- **SSIGN** N41 50.75 / W109 08.40 -- `41.84588, -109.14003`
- **DBS** N44 05.33 / W112 12.56 -- `44.08885, -112.20934`
- **LAVAH** N42 41.91 / W111 51.36 -- `42.69853, -111.85597`
- **DDY** N43 05.45 / W106 16.62 -- `43.09086, -106.27702`
- **STOPP** N42 21.11 / W109 14.06 -- `42.35176, -109.23441`
- **JAC** N43 37.28 / W110 43.98 -- `43.62138, -110.73300`
- **OCS** N41 35.41 / W109 00.92 -- `41.59021, -109.01533`
- **WEBER** N41 15.23 / W112 01.75 -- `41.25388, -112.02913`
- **SETTT** N41 13.62 / W112 06.87 -- `41.22699, -112.11455`
- **ANNTY** N40 54.08 / W112 06.58 -- `40.90139, -112.10961`
- **SURYP** N40 41.87 / W112 05.14 -- `40.69786, -112.08564`
- **BCE** N37 41.35 / W112 18.23 -- `37.68919, -112.30390`
- **SLINA** N38 48.26 / W112 26.54 -- `38.80429, -112.44232`
- **DTA** N39 18.14 / W112 30.33 -- `39.30226, -112.50556`
- **LAZLO** N39 48.18 / W112 20.33 -- `39.80306, -112.33884`
- **JAMMN** N40 02.61 / W112 15.48 -- `40.04344, -112.25792`
- **MLF** N38 21.62 / W113 00.79 -- `38.36036, -113.01323`
- **BEVRR** N38 50.49 / W112 45.35 -- `38.84143, -112.75579`
- **SPIEK** N40 28.75 / W112 06.58 -- `40.47921, -112.10969`
- **CHHIP** N40 37.16 / W112 03.70 -- `40.61936, -112.06161`
- **HELPR** N39 45.19 / W110 32.89 -- `39.75314, -110.54812`
- **GOSHU** N40 01.27 / W111 15.32 -- `40.02124, -111.25538`
- **SPANE** N40 07.83 / W111 32.90 -- `40.13045, -111.54839`
- **MTU** N40 08.95 / W110 07.62 -- `40.14910, -110.12703`
- **THISL** N40 08.19 / W111 12.85 -- `40.13642, -111.21418`
- **RACER** N40 06.49 / W108 52.97 -- `40.10810, -108.88290`
- **RUSHN** N40 10.35 / W111 40.42 -- `40.17258, -111.67366`
- **JAZZZ** N40 20.69 / W111 52.78 -- `40.34480, -111.87960`
- **BPI** N42 34.77 / W110 06.55 -- `42.57945, -110.10921`
- **ELKHO** N43 23.17 / W111 01.42 -- `43.38618, -111.02361`
- **DRAPR** N40 18.15 / W112 10.20 -- `40.30254, -112.16999`
- **HEIRY** N40 33.40 / W112 05.00 -- `40.55666, -112.08339`
- **PITTT** N40 38.01 / W112 04.69 -- `40.63349, -112.07816`
- **EKR** N40 04.05 / W107 55.50 -- `40.06744, -107.92495`
- **LEEHY** N40 10.87 / W111 41.13 -- `40.18109, -111.68543`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **DRYVE** N40 25.16 / W112 02.98 -- `40.41928, -112.04964`
- **MAGNE** N40 45.04 / W112 05.51 -- `40.75073, -112.09180`
- **QUIPA** N40 46.39 / W112 05.67 -- `40.77316, -112.09446`
- **LAWVA** N40 49.67 / W112 06.06 -- `40.82790, -112.10094`
- **HOPIN** N38 45.81 / W112 17.00 -- `38.76348, -112.28330`
- **LEEVT** N39 31.28 / W112 16.10 -- `39.52138, -112.26839`
- **SCHAW** N40 15.23 / W112 02.24 -- `40.25384, -112.03736`
- **QWENN** N40 19.24 / W111 58.01 -- `40.32068, -111.96691`
- **SLOAP** N41 45.45 / W112 28.55 -- `41.75745, -112.47591`
- **SKEES** N41 26.65 / W112 23.24 -- `41.44413, -112.38727`
- **EKKHO** N41 13.45 / W112 04.59 -- `41.22421, -112.07655`
- **HUUPR** N41 13.92 / W112 14.92 -- `41.23200, -112.24866`
- **BOAGY** N40 14.55 / W111 51.13 -- `40.24251, -111.85215`
- **FLECC** N40 42.13 / W114 53.27 -- `40.70218, -114.88784`
- **SKWAH** N40 43.22 / W112 37.07 -- `40.72028, -112.61791`
- **YUTES** N40 43.17 / W112 31.81 -- `40.71958, -112.53011`
- **DUGGY** N40 41.50 / W112 15.47 -- `40.69167, -112.25781`
- **JAXXX** N40 42.01 / W112 09.07 -- `40.70017, -112.15115`
- **GOGGL** N40 45.48 / W112 17.90 -- `40.75802, -112.29836`
- **BUSHH** N40 46.29 / W112 10.88 -- `40.77152, -112.18129`
- **MARYZ** N40 44.45 / W112 05.44 -- `40.74090, -112.09069`

### SIDs

- **ARCHZ1 -> RW34B:** SCANT >=10 | ARCHZ >=13
- **ARCHZ1 -> RW35:** SCANT >=10 | ARCHZ >=13
- **ARCHZ1 -> KROST:** ARCHZ >=13 | TRILA >=FL190 | EDETH | GAROT | KROST
- **ARCHZ1 -> MLF:** ARCHZ >=13 | TRILA >=FL190 | EDETH | SEVYR | MLF
- **ARCHZ1 -> WINEN:** ARCHZ >=13 | TRILA >=FL190 | EDETH | WINEN
- **CGULL1 -> RW16B:** CORVR >=13 | CGULL >=15
- **CGULL1 -> RW17:** CORVR >=13 | CGULL >=15
- **CGULL1 -> RW34B:** CORVR >=13 | CGULL >=15
- **CGULL1 -> RW35:** CORVR >=13 | CGULL >=15
- **CGULL1 -> DRYAD:** CGULL >=15 | MOFER | SCOVL | DRYAD
- **CGULL1 -> TWF:** CGULL >=15 | MOFER | SCOVL | DRYAD | TWF
- **DEZRT2 -> RW16B:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **DEZRT2 -> RW17:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **DEZRT2 -> RW34B:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **DEZRT2 -> RW35:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **DEZRT2 -> BAM:** DEZRT | TIPTN | PECOP | ANTMO | BAM
- **DEZRT2 -> MVA:** DEZRT | TIPTN | PECOP | ASTNN | MVA
- **FFU9 -> RW16B:** [VM leg - not a fix]  *(1 non-fix leg)*
- **FFU9 -> RW17:** [VM leg - not a fix]  *(1 non-fix leg)*
- **FFU9 -> BCE:** FFU | LODUY | URNUW | BCE
- **FFU9 -> HVE:** FFU | OHQES | HVE
- **FFU9 -> MLF:** FFU | LODUY | URNUW | MLF
- **FFU9 -> OAL:** FFU | LODUY | URNUW | MLF | ILC | TPH | OAL
- **RUGGD3 -> RW16B:** BUBBY >=11 | RUGGD >=12
- **RUGGD3 -> RW17:** BUBBY >=11 | RUGGD >=12
- **RUGGD3 -> RW34B:** BUBBY >=11 | RUGGD >=12
- **RUGGD3 -> RW35:** BUBBY >=11 | RUGGD >=12
- **RUGGD3 -> EKR:** RUGGD | UPJAR | BORZI | EKR
- **RUGGD3 -> HOLTR:** RUGGD | KLOUD | SAWGI | HOLTR
- **RUGGD3 -> KIERA:** RUGGD | LOFOG | LEGBE | KIERA
- **RUGGD3 -> OCS:** RUGGD | SPINE | SKIII | POPLE | OCS
- **RUGGD3 -> PERTY:** RUGGD | HERTS | PERTY
- **SEVYR3 -> RW32:** [CA leg - not a fix] | [VM leg - not a fix] | TCH  *(2 non-fix legs)*
- **SEVYR3 -> RW34B:** [CA leg - not a fix] | [VM leg - not a fix] | TCH  *(2 non-fix legs)*
- **SEVYR3 -> RW35:** [CA leg - not a fix] | [VM leg - not a fix] | TCH  *(2 non-fix legs)*
- **SEVYR3 -> MLF:** TCH | EDETH | SEVYR | MLF
- **SEVYR3 -> OAL:** TCH | EDETH | SEVYR | OAL
- **SLC4 -> RW14:** [CA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **SLC4 -> RW16B:** [VM leg - not a fix]  *(1 non-fix leg)*
- **SLC4 -> RW17:** [VM leg - not a fix]  *(1 non-fix leg)*
- **SLC4 -> RW32:** [CA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **SLC4 -> RW34B:** [VM leg - not a fix]  *(1 non-fix leg)*
- **SLC4 -> RW35:** [VM leg - not a fix]  *(1 non-fix leg)*
- **ZIONZ1 -> RW16B:** HOPTO >=9 | ZIONZ
- **ZIONZ1 -> RW17:** HOPTO >=9 | ZIONZ
- **ZIONZ1 -> BCE:** ZIONZ | GITLN | LODUY >=14 | URNUW | BCE
- **ZIONZ1 -> EHK:** ZIONZ | GITLN | LODUY >=14 | URNUW | EHK
- **ZIONZ1 -> EYELO:** ZIONZ | KOOGR >=13 | ROMMN <=FL190 | PLEZZ | EYELO
- **ZIONZ1 -> KIMMR:** ZIONZ | KOOGR >=13 | ROMMN <=FL190 | KIMMR
- **ZIONZ1 -> KROST:** ZIONZ | GITLN | LODUY >=14 | KROST

### Fix coordinates

- **SCANT** N40 45.23 / W112 16.40 -- `40.75380, -112.27325`
- **ARCHZ** N40 33.87 / W112 18.71 -- `40.56445, -112.31177`
- **TRILA** N40 10.97 / W112 28.04 -- `40.18279, -112.46739`
- **EDETH** N39 40.81 / W112 49.15 -- `39.68018, -112.81913`
- **GAROT** N39 18.00 / W113 15.00 -- `39.30000, -113.25000`
- **KROST** N38 25.26 / W116 11.92 -- `38.42094, -116.19861`
- **SEVYR** N39 13.05 / W112 53.28 -- `39.21745, -112.88803`
- **MLF** N38 21.62 / W113 00.79 -- `38.36036, -113.01323`
- **WINEN** N37 56.00 / W113 30.00 -- `37.93333, -113.50000`
- **CORVR** N41 04.19 / W112 25.56 -- `41.06991, -112.42599`
- **CGULL** N41 10.15 / W112 30.56 -- `41.16915, -112.50935`
- **MOFER** N41 16.68 / W112 37.19 -- `41.27799, -112.61991`
- **SCOVL** N41 24.06 / W112 47.98 -- `41.40101, -112.79970`
- **DRYAD** N42 10.11 / W113 59.62 -- `42.16844, -113.99363`
- **TWF** N42 28.79 / W114 29.37 -- `42.47985, -114.48946`
- **DURCH** N40 52.31 / W112 26.17 -- `40.87181, -112.43609`
- **BONNE** N40 51.74 / W112 34.74 -- `40.86237, -112.57900`
- **DEZRT** N40 50.50 / W112 50.00 -- `40.84167, -112.83333`
- **TIPTN** N40 50.50 / W113 50.00 -- `40.84167, -113.83333`
- **PECOP** N40 50.00 / W114 45.00 -- `40.83333, -114.75000`
- **ANTMO** N40 45.52 / W115 24.06 -- `40.75865, -115.40097`
- **BAM** N40 34.14 / W116 55.34 -- `40.56908, -116.92226`
- **ASTNN** N39 15.00 / W116 23.00 -- `39.25000, -116.38333`
- **MVA** N38 33.92 / W118 01.97 -- `38.56530, -118.03285`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **LODUY** N39 28.04 / W112 03.41 -- `39.46738, -112.05691`
- **URNUW** N39 08.05 / W112 06.25 -- `39.13418, -112.10414`
- **BCE** N37 41.35 / W112 18.23 -- `37.68919, -112.30390`
- **OHQES** N39 34.76 / W111 24.09 -- `39.57937, -111.40143`
- **HVE** N38 25.01 / W110 41.98 -- `38.41681, -110.69974`
- **ILC** N38 15.01 / W114 23.65 -- `38.25019, -114.39423`
- **TPH** N38 01.84 / W117 02.01 -- `38.03064, -117.03350`
- **OAL** N38 00.20 / W117 46.23 -- `38.00326, -117.77045`
- **BUBBY** N41 02.90 / W112 00.99 -- `41.04828, -112.01654`
- **RUGGD** N41 08.14 / W111 46.05 -- `41.13564, -111.76758`
- **UPJAR** N40 47.68 / W111 24.34 -- `40.79473, -111.40574`
- **BORZI** N40 32.24 / W110 17.43 -- `40.53735, -110.29045`
- **EKR** N40 04.05 / W107 55.50 -- `40.06744, -107.92495`
- **KLOUD** N41 23.37 / W111 42.45 -- `41.38951, -111.70751`
- **SAWGI** N41 47.76 / W111 32.86 -- `41.79596, -111.54764`
- **HOLTR** N42 18.00 / W111 26.00 -- `42.30000, -111.43333`
- **LOFOG** N40 41.59 / W111 24.39 -- `40.69325, -111.40648`
- **LEGBE** N40 25.18 / W110 28.28 -- `40.41972, -110.47139`
- **KIERA** N40 14.82 / W109 51.47 -- `40.24696, -109.85778`
- **SPINE** N41 02.83 / W111 24.24 -- `41.04714, -111.40401`
- **SKIII** N41 04.65 / W111 03.23 -- `41.07747, -111.05377`
- **POPLE** N41 09.58 / W110 44.42 -- `41.15971, -110.74041`
- **OCS** N41 35.41 / W109 00.92 -- `41.59021, -109.01533`
- **HERTS** N40 54.57 / W111 24.00 -- `40.90949, -111.40007`
- **PERTY** N40 44.58 / W110 02.85 -- `40.74299, -110.04753`
- **TCH** N40 51.02 / W111 58.91 -- `40.85026, -111.98191`
- **HOPTO** N40 27.66 / W111 57.12 -- `40.46105, -111.95199`
- **ZIONZ** N40 16.12 / W111 56.32 -- `40.26864, -111.93871`
- **GITLN** N40 08.08 / W111 57.59 -- `40.13464, -111.95982`
- **EHK** N37 47.24 / W113 04.09 -- `37.78733, -113.06823`
- **KOOGR** N40 08.78 / W111 50.47 -- `40.14641, -111.84113`
- **ROMMN** N40 05.78 / W111 47.63 -- `40.09636, -111.79387`
- **PLEZZ** N39 33.46 / W111 23.34 -- `39.55763, -111.38902`
- **EYELO** N38 45.47 / W110 46.92 -- `38.75789, -110.78194`
- **KIMMR** N39 13.75 / W109 57.50 -- `39.22923, -109.95836`

