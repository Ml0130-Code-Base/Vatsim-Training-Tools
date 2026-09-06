# SID, STAR and approach data from CIFP — S56, Salt Lake approach

Generated **2026-09-06** from **CIFP 260903** (FAA Coded Instrument Flight Procedures,
cycle effective 2026-09-03). Pull recipe, record layout and licence in
`claude_CIFP_Source_Reference.md` at the repository root.

**The cycle is the citation.** A value here is true for 28 days by construction — quote it
as `CIFP 260903` and re-pull before trusting it in a later cycle.

**This is the published procedure, not the facility's use of it.** CIFP lists every
transition that exists and is silent on which one the facility assigns in a given
configuration — that is an LOA question with no CIFP equivalent. Nothing here is a sector
boundary and nothing here says who owns what airspace.

## The eight fields, and what CIFP has for each

Counted from `IN_CIFP.txt`, cycle 260903, and confirmed against the procedure records
themselves. Every one of these fields is worked by S56 and every one is now carried below.

| Field | CIFP name | STARs | SIDs | Approaches | Runways in CIFP |
|---|---|---|---|---|---|
| **KSLC** Salt Lake City International | SALT LAKE CITY INTL | 11 | 8 | 22 | 14, 16L, 16R, 17, 32, 34L, 34R, 35 |
| **KBMC** Brigham City Regional | BRIGHAM CITY RGNL | 0 | 1 | 1 | 17, 35 |
| **KHIF** Hill Air Force Base | HILL AFB | **0** | **0** | **0** | 14, 32 |
| **KOGD** Ogden-Hinckley | OGDEN-HINCKLEY | 1 | 1 | 4 | 03, 17, 21, 35 |
| **KPVU** Provo Municipal | PROVO MUNI | 1 | 2 | 3 | 13, 18, 31, 36 |
| **KSPK** Spanish Fork Municipal | SPANISH FORK MUNI/WOODHOUSE FL | 0 | 1 | 2 | 12, 30 |
| **KTVY** Bolinder Field-Tooele Valley | BOLINDER FLD/TOOELE VALLEY | 0 | 1 | 3 | 17, 35 |
| **KSVR** South Valley Regional | SOUTH VALLEY RGNL | 0 | 1 | 1 | 16, 34 |

**South Valley Regional is `KSVR`, not `U42`.** The identifier was checked in the CIFP
airport record (`SOUTH VALLEY RGNL`, N40 37 10.37 / W111 59 34.40, elevation 4,606) rather
than assumed, and the VATGlasses ZLC dataset agrees — it keys the field `KSVR` with
`"pre": ["SVR"]`. There is no `U42` record anywhere in cycle 260903, so a drill that calls
the field U42 is quoting an identifier this cycle does not have.

**Hill Air Force Base has no coded procedure in CIFP, and that is a property of the source,
not a gap in this pull.** The manifest lists no `KHIF` row at all; the data file carries the
airport reference point and both runway thresholds and nothing else. CIFP codes **zero TACAN
approaches nationwide** in this cycle, so the HI-ILS and HI-TACAN into HIF that S56 SOP 3-3
requires Hart's approval for **cannot be recovered from this source** and must come from the
facility or from DoD FLIP. The same is true of the SOP's HIF arrival routings: CIFP has
nothing to say about them.

Two S56 SOP paragraphs are confirmed by name against the coded data, which is a useful check
that these are the right procedures and not lookalikes:

- **3-4** phrases the Brigham City IFR clearance as *"via the Ogden (number) obstacle
  departure procedure … Expect further clearance at the Ogden VORTAC"*. CIFP codes exactly one
  KBMC departure, `OGD1`, and both its runway transitions terminate at the **OGD** VORTAC.
- **3-7** phrases the Tooele clearance as *"Cleared to the STACO intersection via the STACO
  (number) departure … Expect further clearance at STACO"*. CIFP codes exactly one KTVY
  departure, `STACO2`, and both its runway transitions terminate at **STACO**.

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

**Every procedure is now named.** A bold ident heads its transition list — `**BEARR5**`,
`**STACO2**`, `**R34** — RNAV (GPS) RWY 34`. The earlier version of this file listed SID and
STAR transitions with no procedure name above them, so a reader could not tell which STAR a
transition belonged to. **The ident is the coded one and never the spoken one** — `BEARR5`,
not "BEARR FIVE", per `claude_CIFP_Source_Reference.md` §4.

## Four decoding faults fixed in this regeneration

All four were in the KSLC section of the earlier file and all four are corrected below.
They are recorded rather than quietly dropped, because the same decoder shape produced
`ZAU/`, `ZMP/R90/` and `ZLC/Big Sky/` and **those files still carry all four.**

1. **Runway thresholds resolved to the wrong airport.** A `RWnn` leg is a runway record,
   which is keyed by airport — but the lookup ignored the airport and took the first record
   with a matching designator. The old file put KSLC's **RW16L in Colorado** (`38.97894,
   -104.81905`) and its **RW17 in Alaska** (`62.10971, -150.10896`). Correct values are
   `40.80745, -111.97693` and `40.79892, -111.96207`. Every KSLC threshold that appears in
   an approach was wrong — all five of them.
2. **ARINC continuation records were read as legs.** A record with a continuation number of
   2 or more is a continuation of the previous leg, not a new one, and its columns do not
   hold an altitude. Reading them produced phantom duplicate fixes with impossible crossings
   — `YYIPP >=6000 | YYIPP 0`, `FLLAG >=6100 | FLLAG 0/1`. Eleven KSLC approach finals
   carried one of these.
3. **A VHF navaid gave its DME position, not its VOR position.** An ARINC navaid record holds
   two coordinate pairs, the VOR first and the co-located DME second. `JAC` came out at the
   DME. About 0.1 NM, and correct now.
4. **The multiple-approach suffix was printed after the runway instead of before it.** An
   approach ident is the type letter, two runway digits, `L`/`R`/`C` or `-` as a placeholder,
   then the optional suffix — so `R17-Y` is the Yankee approach to runway 17. The old file
   rendered it *"RNAV (GPS) RWY 17-Y"* and `R16LY` as *"RNAV (GPS) RWY 16LY"*, which is not
   how it is written or said anywhere else. **The S56 SOP settles it three times over.**
   Table 2-3-3, *Approach Type Designators*, lists the scratchpad types as **`G` RNAV Y** and
   **`Z` RNAV Z**; 2-4-4 writes the Establish-on-RNAV pairings as *"RNAV (RNP) Z RWY 34L"* and
   *"RNAV (RNP) Z RWY 16R"*; and this deck's recorded KSLC D-ATIS reads `RNAV Y RY 17 RNAV Z
   RY 16R`. The names now read `RNAV (GPS) Y RWY 17` and `RNAV (RNP) Z RWY 34L`, matching the
   order, the plate and the broadcast.

---
## KSLC — SALT LAKE CITY INTL

Runways in CIFP: 14, 16L, 16R, 17, 32, 34L, 34R, 35

### STARs

**BEARR5**

- **BYI:** BYI | EFFTA | NORDD | BLIDA | BEARR
- **LCU:** LCU | BEARR
- **PIH:** PIH | MLD | TEALZ | BEARR
- **RW14:** BEARR | OGD >=11
- **RW16B:** BEARR | OGD >=11
- **RW17:** BEARR | OGD >=11
- **RW32:** BEARR | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW34B:** BEARR | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW35:** BEARR | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*

**BVL2**

- **ALL:** BVL | KNOLE | WAATS

**CARTR1**

- **BOBRT:** BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **CKW:** CKW | SSIGN | BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **DBS:** DBS | LAVAH | LHO >=14 | CARTR
- **DDY:** DDY | STOPP | BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **JAC:** JAC | LAVAH | LHO >=14 | CARTR
- **OCS:** OCS | BOBRT <=FL300 | KRANC | LHO >=14 | CARTR
- **RW16B:** CARTR | WEBER >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** CARTR | WEBER >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW34B:** CARTR | SETTT >=14 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW35:** CARTR | SETTT >=14 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*

**JAMMN5**

- **BCE:** BCE | SLINA | DTA | LAZLO | JAMMN
- **MLF:** MLF | BEVRR | DTA | LAZLO | JAMMN
- **ALL:** JAMMN | SPIEK | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*

**JAZZZ1**

- **HELPR:** HELPR | GOSHU | SPANE 15/250
- **MTU:** MTU | THISL | SPANE 15/250
- **RACER:** RACER | MTU | THISL | SPANE 15/250
- **ALL:** SPANE 15/250 | RUSHN >=13 | JAZZZ >=12/230 | [FM leg - not a fix]  *(1 non-fix leg)*

**LHO5**

- **BPI:** BPI | LHO
- **DBS:** DBS | LAVAH | LHO
- **JAC:** JAC | ELKHO | LAVAH | LHO
- **OCS:** OCS | LHO
- **RW16L:** LHO | CARTR >=14 | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW34L:** LHO | CARTR >=14 | OGD | DYANN >=11 | [VM leg - not a fix]  *(1 non-fix leg)*

**PITTT2**

- **BCE:** BCE | SLINA >=17 | DTA | JAMMN 17/280 | DRAPR 14 - 15 | SPIEK 13 - 14 | HEIRY | PITTT 12
- **EKR:** EKR | RACER | MTU | THISL | SPANE FL190/280 | LEEHY | FFU 17 | DRYVE >=15 | PITTT 12
- **HELPR:** HELPR | GOSHU | SPANE FL190/280 | LEEHY | FFU 17 | DRYVE >=15 | PITTT 12
- **MLF:** MLF | BEVRR | DTA | JAMMN 17/280 | DRAPR 14 - 15 | SPIEK 13 - 14 | HEIRY | PITTT 12
- **MTU:** MTU | THISL | SPANE FL190/280 | LEEHY | FFU 17 | DRYVE >=15 | PITTT 12
- **RW16B:** PITTT 12 | MAGNE | QUIPA | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** PITTT 12 | MAGNE | QUIPA | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*

**QWENN7**

- **BCE:** BCE | HOPIN <=FL300 | LEEVT | JAMMN 15/250
- **DTA:** DTA | LAZLO | JAMMN 15/250
- **MLF:** MLF | BEVRR <=FL310 | DTA | LAZLO | JAMMN 15/250
- **ALL:** JAMMN 15/250 | SCHAW 12 | QWENN 11/230 | [FM leg - not a fix]  *(1 non-fix leg)*

**SKEES6**

- **BYI:** BYI | EFFTA | BLIDA >=13 | BEARR
- **PIH:** PIH | MLD | SLOAP | BEARR
- **(final):** BEARR | SKEES
- **RW16B:** SKEES | EKKHO 11/250 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** SKEES | EKKHO 11/250 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW34B:** SKEES | HUUPR <=13 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW35:** SKEES | HUUPR <=13 | DYANN >=11 | ANNTY 11 | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*

**SPANE8**

- **EKR:** EKR | RACER | MTU | THISL | SPANE
- **HELPR:** HELPR | GOSHU | SPANE
- **RW14:** SPANE | BOAGY | FFU | DRYVE | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW16B:** SPANE | BOAGY | FFU | DRYVE | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** SPANE | BOAGY | FFU | DRYVE | CHHIP | [VM leg - not a fix]  *(1 non-fix leg)*
- **RW32:** SPANE | BOAGY | FFU
- **RW34B:** SPANE | BOAGY | FFU
- **RW35:** SPANE | BOAGY | FFU

**YUTES2**

- **FLECC:** FLECC | BVL | KNOLE 17/250 | SKWAH >=14 | YUTES
- **RW16B:** YUTES | DUGGY | JAXXX 12 | MAGNE | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** YUTES | DUGGY | JAXXX 12 | MAGNE | LAWVA 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW34B:** YUTES | GOGGL | BUSHH 12 | MARYZ | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW35:** YUTES | GOGGL | BUSHH 12 | MARYZ | SURYP 11 | [FM leg - not a fix]  *(1 non-fix leg)*


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
- **JAC** N43 37.26 / W110 43.90 -- `43.62104, -110.73169`
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

**ARCHZ1**

- **RW34B:** SCANT >=10 | ARCHZ >=13
- **RW35:** SCANT >=10 | ARCHZ >=13
- **KROST:** ARCHZ >=13 | TRILA >=FL190 | EDETH | GAROT | KROST
- **MLF:** ARCHZ >=13 | TRILA >=FL190 | EDETH | SEVYR | MLF
- **WINEN:** ARCHZ >=13 | TRILA >=FL190 | EDETH | WINEN

**CGULL1**

- **RW16B:** CORVR >=13 | CGULL >=15
- **RW17:** CORVR >=13 | CGULL >=15
- **RW34B:** CORVR >=13 | CGULL >=15
- **RW35:** CORVR >=13 | CGULL >=15
- **DRYAD:** CGULL >=15 | MOFER | SCOVL | DRYAD
- **TWF:** CGULL >=15 | MOFER | SCOVL | DRYAD | TWF

**DEZRT2**

- **RW16B:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **RW17:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **RW34B:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **RW35:** DURCH >=12 | BONNE >=14 | DEZRT >=15
- **BAM:** DEZRT | TIPTN | PECOP | ANTMO | BAM
- **MVA:** DEZRT | TIPTN | PECOP | ASTNN | MVA

**FFU9**

- **RW16B:** [VM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** [VM leg - not a fix]  *(1 non-fix leg)*
- **BCE:** FFU | LODUY | URNUW | BCE
- **HVE:** FFU | OHQES | HVE
- **MLF:** FFU | LODUY | URNUW | MLF
- **OAL:** FFU | LODUY | URNUW | MLF | ILC | TPH | OAL

**RUGGD3**

- **RW16B:** BUBBY >=11 | RUGGD >=12
- **RW17:** BUBBY >=11 | RUGGD >=12
- **RW34B:** BUBBY >=11 | RUGGD >=12
- **RW35:** BUBBY >=11 | RUGGD >=12
- **EKR:** RUGGD | UPJAR | BORZI | EKR
- **HOLTR:** RUGGD | KLOUD | SAWGI | HOLTR
- **KIERA:** RUGGD | LOFOG | LEGBE | KIERA
- **OCS:** RUGGD | SPINE | SKIII | POPLE | OCS
- **PERTY:** RUGGD | HERTS | PERTY

**SEVYR3**

- **RW32:** [CA leg - not a fix] | [VM leg - not a fix] | TCH  *(2 non-fix legs)*
- **RW34B:** [CA leg - not a fix] | [VM leg - not a fix] | TCH  *(2 non-fix legs)*
- **RW35:** [CA leg - not a fix] | [VM leg - not a fix] | TCH  *(2 non-fix legs)*
- **MLF:** TCH | EDETH | SEVYR | MLF
- **OAL:** TCH | EDETH | SEVYR | OAL

**SLC4**

- **RW14:** [CA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW16B:** [VM leg - not a fix]  *(1 non-fix leg)*
- **RW17:** [VM leg - not a fix]  *(1 non-fix leg)*
- **RW32:** [CA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW34B:** [VM leg - not a fix]  *(1 non-fix leg)*
- **RW35:** [VM leg - not a fix]  *(1 non-fix leg)*

**ZIONZ1**

- **RW16B:** HOPTO >=9 | ZIONZ
- **RW17:** HOPTO >=9 | ZIONZ
- **BCE:** ZIONZ | GITLN | LODUY >=14 | URNUW | BCE
- **EHK:** ZIONZ | GITLN | LODUY >=14 | URNUW | EHK
- **EYELO:** ZIONZ | KOOGR >=13 | ROMMN <=FL190 | PLEZZ | EYELO
- **KIMMR:** ZIONZ | KOOGR >=13 | ROMMN <=FL190 | KIMMR
- **KROST:** ZIONZ | GITLN | LODUY >=14 | KROST


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
- **LOFOG** N40 41.60 / W111 24.39 -- `40.69325, -111.40648`
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

### Approaches

**H16LZ** — RNAV (RNP) Z RWY 16L

- **EKKHO:** EKKHO 11000/250 | IRRON >=10000/230
- **WEBER:** WEBER >=12000 | IRRON >=10000/230
- **(final):** IRRON >=10000/230 | YAWVA >=9000 | LGOON >=7500 | YYIPP >=6000 | RW16L 4284 | [CA leg - not a fix] | RULFO | FFU >=10000 | FFU >=10000  *(1 non-fix leg)*

**H16RZ** — RNAV (RNP) Z RWY 16R

- **EKKHO:** EKKHO 11000/250 | RRUFF >=9000/230 | JICCU >=8000 | BHIVE >=7500 | DILEE >=6600
- **LAWVA:** LAWVA 11000 | BEKAY >=9000/190 | CAMDI >=7500 | DILEE >=6600
- **WEBER:** WEBER >=12000 | RRUFF >=9000/230 | JICCU >=8000 | BHIVE >=7500 | DILEE >=6600
- **(final):** DILEE >=6600 | BNKER >=6000 | RW16R 4278 | [CA leg - not a fix] | STACO >=8100 | STACO >=8100  *(1 non-fix leg)*

**H17-Z** — RNAV (RNP) Z RWY 17

- **EKKHO:** EKKHO 11000/250 | UDUZU >=11000 | IVOCY >=9000
- **WEBER:** WEBER >=12000 | GORPS >=11000 | UDUZU >=11000 | IVOCY >=9000
- **(final):** IVOCY >=9000 | PRYES >=7500 | TIFUL >=6000 | RW17 4277 | [CA leg - not a fix] | FFU >=10000 | FFU >=10000  *(1 non-fix leg)*

**H34LZ** — RNAV (RNP) Z RWY 34L

- **JAZZZ:** JAZZZ >=12000/230 | PUTER >=10000/210 | CAMRI >=9000 | DUNLP >=8000 | HEPSO >=7900
- **QWENN:** QWENN 11000/230 | PUTER >=10000/210 | CAMRI >=9000 | DUNLP >=8000 | HEPSO >=7900
- **SURYP:** SURYP 11000 | PEFNO >=9000/190 | HEPSO >=7900
- **(final):** HEPSO >=7900 | FLLAG >=6100 | RW34L 4284 | [CA leg - not a fix] | STACO >=8100 | STACO >=8100  *(1 non-fix leg)*

**H34RZ** — RNAV (RNP) Z RWY 34R

- **JAZZZ:** JAZZZ >=12000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **QWENN:** QWENN 11000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **(final):** ALGIE >=10000/210 | HAKKR >=9000/190 | CHEVL >=6100 | RW34R 4280 | [CA leg - not a fix] | TCH | OGD >=9000 | OGD >=9000  *(1 non-fix leg)*

**I16L** — ILS RWY 16L

- **EKKHO:** EKKHO 11000/250 | IRRON >=11000
- **OGD:** OGD >=11000 | IRRON >=11000
- **WEBER:** WEBER >=12000 | IRRON >=11000
- **(final):** IRRON 11000 | TOOME >=9000 | LGOON >=7500 | YYIPP 6000 | RW16L 4284 | [CA leg - not a fix] | FFU >=10000 | FFU >=10000  *(1 non-fix leg)*

**I16R** — ILS RWY 16R

- **EKKHO:** EKKHO 11000/250 | RRUFF >=9000
- **FANDS:** FANDS | RRUFF >=9000
- **OGD:** OGD >=9000 | RRUFF >=9000
- **WEBER:** WEBER >=12000 | RRUFF >=9000
- **(final):** RRUFF 9000 | UFEMY >=8000 | BHIVE >=7500 | BNKER 6000 | RW16R 4278 | [CA leg - not a fix] | [VI leg - not a fix] | STACO >=8100 | STACO >=8100  *(2 non-fix legs)*

**I17** — ILS RWY 17

- **EKKHO:** EKKHO 11000/250 | UDUZU >=11000 | IVOCY >=9000
- **OGD:** OGD | UDUZU >=11000 | IVOCY >=9000
- **TUKTE:** TUKTE | UDUZU >=11000 | IVOCY >=9000
- **WEBER:** WEBER >=12000 | GORPS >=11000 | UDUZU >=11000 | IVOCY >=9000
- **(final):** IVOCY 9000 | PRYES >=7500 | TIFUL >=6000 | RW17 4277 | FFU >=10000 | FFU >=10000

**I34L** — ILS RWY 34L

- **FFU:** FFU | PUTER >=10000/210 | CAMRI >=9000
- **JAZZZ:** JAZZZ >=12000/230 | PUTER >=10000/210 | CAMRI >=9000
- **QWENN:** QWENN 11000/230 | PUTER >=10000/210 | CAMRI >=9000
- **(final):** CAMRI 9000/210 | DUNLP >=8000 | FLLAG 6100 | RW34L 4284 | [CA leg - not a fix] | STACO >=8100 | STACO >=8100  *(1 non-fix leg)*

**I34R** — ILS RWY 34R

- **FFU:** FFU | PLAGE >=11000/210 | ALGIE >=10000
- **JAZZZ:** JAZZZ >=12000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **QWENN:** QWENN 11000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **(final):** ALGIE 10000/210 | HAKKR >=9000 | CHEVL 6100 | RW34R 4280 | TCH | OGD >=9000 | OGD >=9000

**L16L** — LOC RWY 16L

- **EKKHO:** EKKHO 11000/250 | IRRON >=11000
- **OGD:** OGD >=11000 | IRRON >=11000
- **WEBER:** WEBER >=12000 | IRRON >=11000
- **(final):** IRRON >=11000 | TOOME >=9000 | LGOON >=7500 | YYIPP >=6000 | RW16L 4284 | [CA leg - not a fix] | FFU >=10000 | FFU >=10000  *(1 non-fix leg)*

**L16R** — LOC RWY 16R

- **EKKHO:** EKKHO 11000/250 | RRUFF >=9000
- **FANDS:** FANDS | RRUFF >=9000
- **OGD:** OGD >=9000 | RRUFF >=9000
- **WEBER:** WEBER >=12000 | RRUFF >=9000
- **(final):** RRUFF >=9000 | UFEMY >=8000 | BHIVE >=7500 | BNKER >=6000 | RW16R 4278 | [CA leg - not a fix] | [VI leg - not a fix] | STACO >=8100 | STACO >=8100  *(2 non-fix legs)*

**L17** — LOC RWY 17

- **EKKHO:** EKKHO 11000/250 | UDUZU >=11000 | IVOCY >=9000
- **OGD:** OGD | UDUZU >=11000 | IVOCY >=9000
- **TUKTE:** TUKTE | UDUZU >=11000 | IVOCY >=9000
- **WEBER:** WEBER >=12000 | GORPS >=11000 | UDUZU >=11000 | IVOCY >=9000
- **(final):** IVOCY >=9000 | PRYES >=7500 | TIFUL >=6000 | RW17 4277 | FFU >=10000 | FFU >=10000

**L34L** — LOC RWY 34L

- **FFU:** FFU | PUTER >=10000/210 | CAMRI >=9000
- **JAZZZ:** JAZZZ >=12000/230 | PUTER >=10000/210 | CAMRI >=9000
- **QWENN:** QWENN 11000/230 | PUTER >=10000/210 | CAMRI >=9000
- **(final):** CAMRI >=9000/210 | DUNLP >=8000 | FLLAG >=6100 | JUGOX >=4780 | FALEM 4430 | [CA leg - not a fix] | STACO >=8100 | STACO >=8100  *(1 non-fix leg)*

**L34R** — LOC RWY 34R

- **FFU:** FFU | PLAGE >=11000/210 | ALGIE >=10000
- **JAZZZ:** JAZZZ >=12000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **QWENN:** QWENN 11000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **(final):** ALGIE >=10000/210 | HAKKR >=9000 | CHEVL >=6100 | IRUYU >=4900 | GITBE 4429 | TCH | OGD >=9000 | OGD >=9000

**R16LY** — RNAV (GPS) Y RWY 16L

- **EKKHO:** EKKHO 11000/250 | IRRON >=10000/230
- **OGD:** OGD | IRRON >=10000/230
- **WEBER:** WEBER >=12000 | IRRON >=10000/230
- **(final):** IRRON >=10000/230 | YAWVA >=9000 | LGOON >=7500 | YYIPP >=6000 | RW16L 4284 | [CA leg - not a fix] | RULFO | FFU >=10000 | FFU >=10000  *(1 non-fix leg)*

**R16RY** — RNAV (GPS) Y RWY 16R

- **EKKHO:** EKKHO 11000/250 | RRUFF >=9000/230
- **OGD:** OGD | RRUFF >=9000/230
- **WEBER:** WEBER >=12000 | RRUFF >=9000/230
- **(final):** RRUFF >=9000/230 | JICCU >=8000 | BHIVE >=7500 | BNKER >=6000 | RW16R 4278 | [CA leg - not a fix] | SLOPS | STACO >=8900 | STACO >=8900  *(1 non-fix leg)*

**R17-Y** — RNAV (GPS) Y RWY 17

- **EKKHO:** EKKHO 11000/250 | UDUZU >=11000 | IVOCY >=9000
- **OGD:** OGD | UDUZU >=11000 | IVOCY >=9000
- **TUKTE:** TUKTE | UDUZU >=11000 | IVOCY >=9000
- **WEBER:** WEBER >=12000 | GORPS >=11000 | UDUZU >=11000 | IVOCY >=9000
- **(final):** IVOCY >=9000 | PRYES >=7500 | TIFUL >=6000 | RW17 4277 | [CA leg - not a fix] | FFU >=10000 | FFU >=10000  *(1 non-fix leg)*

**R34LY** — RNAV (GPS) Y RWY 34L

- **FFU:** FFU | PUTER >=10000/210 | CAMRI >=9000
- **JAZZZ:** JAZZZ >=12000/230 | PUTER >=10000/210 | CAMRI >=9000
- **QWENN:** QWENN 11000/230 | PUTER >=10000/210 | CAMRI >=9000
- **(final):** CAMRI >=9000/210 | DUNLP >=8000 | FLLAG >=6100 | JOMVA 5100 | RW34L 4284 | [CA leg - not a fix] | STACO >=8100 | STACO >=8100  *(1 non-fix leg)*

**R34RY** — RNAV (GPS) Y RWY 34R

- **FFU:** FFU | PLAGE >=11000/210 | ALGIE >=10000
- **JAZZZ:** JAZZZ >=12000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **QWENN:** QWENN 11000/230 | PLAGE >=11000/210 | ALGIE >=10000
- **(final):** ALGIE >=10000/210 | HAKKR >=9000 | CHEVL >=6100 | IRUYU 4900 | RW34R 4280 | [CA leg - not a fix] | TCH | OGD >=9000 | OGD >=9000  *(1 non-fix leg)*

**R35** — RNAV (GPS) RWY 35

- **FFU:** FFU | HLMET >=11000/210 | PEDLE >=10000
- **HLMET:** HLMET/210 | PEDLE >=10000
- **JAZZZ:** JAZZZ >=12000/230 | HLMET >=11000/210 | PEDLE >=10000
- **QWENN:** QWENN 11000/230 | HLMET >=11000/210 | PEDLE >=10000
- **(final):** PEDLE >=10000/210 | ZEPOG >=9000 | KERNN >=6100 | WEEEL 4900 | FORXS 4420 | [CA leg - not a fix] | KNOBY | OGD >=9000 | OGD >=9000  *(1 non-fix leg)*

**X35** — LDA RWY 35

- **FFU:** FFU | HLMET >=11000/210 | PEDLE >=10000
- **HLMET:** HLMET/210 | PEDLE >=10000
- **JAZZZ:** JAZZZ >=12000/230 | HLMET >=11000/210 | PEDLE >=10000
- **QWENN:** QWENN 11000/230 | HLMET >=11000/210 | PEDLE >=10000
- **(final):** PEDLE >=10000/210 | ZEPOG >=9000 | DRAPE >=6900 | KERNN >=6100 | WEEEL >=4900 | FORXS 4419 | [CA leg - not a fix] | TCH | OGD >=9000 | OGD >=9000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`EKKHO`, `WEBER`, `LAWVA`, `JAZZZ`, `QWENN`, `SURYP`, `OGD`, `FANDS`, `TUKTE`, `FFU`, `HLMET`

### Fix coordinates

- **EKKHO** N41 13.45 / W112 04.59 -- `41.22421, -112.07655`
- **IRRON** N41 08.65 / W112 00.97 -- `41.14417, -112.01621`
- **WEBER** N41 15.23 / W112 01.75 -- `41.25388, -112.02913`
- **YAWVA** N41 03.70 / W112 00.40 -- `41.06161, -112.00659`
- **LGOON** N40 58.51 / W111 59.79 -- `40.97510, -111.99644`
- **YYIPP** N40 53.82 / W111 59.24 -- `40.89697, -111.98733`
- **RW16L** N40 48.45 / W111 58.62 -- `40.80745, -111.97693`
- **RULFO** N40 40.31 / W111 57.67 -- `40.67177, -111.96121`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **RRUFF** N41 08.66 / W112 02.32 -- `41.14428, -112.03864`
- **JICCU** N41 04.23 / W112 01.80 -- `41.07048, -112.02998`
- **BHIVE** N40 58.51 / W112 01.13 -- `40.97510, -112.01882`
- **DILEE** N40 56.26 / W112 00.87 -- `40.93765, -112.01443`
- **LAWVA** N40 49.67 / W112 06.06 -- `40.82790, -112.10094`
- **BEKAY** N40 55.86 / W112 06.79 -- `40.93095, -112.11319`
- **CAMDI** N40 58.31 / W112 04.09 -- `40.97177, -112.06824`
- **BNKER** N40 53.86 / W112 00.59 -- `40.89760, -112.00976`
- **RW16R** N40 48.47 / W111 59.96 -- `40.80778, -111.99929`
- **STACO** N40 49.33 / W112 25.18 -- `40.82220, -112.41960`
- **UDUZU** N41 07.95 / W111 57.73 -- `41.13255, -111.96215`
- **IVOCY** N41 02.78 / W111 57.73 -- `41.04640, -111.96213`
- **GORPS** N41 13.70 / W112 00.02 -- `41.22835, -112.00038`
- **PRYES** N40 58.06 / W111 57.73 -- `40.96769, -111.96211`
- **TIFUL** N40 53.35 / W111 57.72 -- `40.88914, -111.96208`
- **RW17** N40 47.93 / W111 57.72 -- `40.79892, -111.96207`
- **JAZZZ** N40 20.69 / W111 52.78 -- `40.34480, -111.87960`
- **PUTER** N40 26.11 / W111 57.37 -- `40.43521, -111.95618`
- **CAMRI** N40 28.48 / W111 57.64 -- `40.47461, -111.96071`
- **DUNLP** N40 31.63 / W111 58.01 -- `40.52715, -111.96677`
- **HEPSO** N40 35.02 / W111 58.40 -- `40.58372, -111.97328`
- **QWENN** N40 19.24 / W111 58.01 -- `40.32068, -111.96691`
- **SURYP** N40 41.87 / W112 05.14 -- `40.69786, -112.08564`
- **PEFNO** N40 34.63 / W112 04.31 -- `40.57714, -112.07184`
- **FLLAG** N40 40.82 / W111 59.07 -- `40.68025, -111.98447`
- **RW34L** N40 46.50 / W111 59.73 -- `40.77498, -111.99547`
- **PLAGE** N40 26.20 / W111 56.05 -- `40.43669, -111.93412`
- **ALGIE** N40 28.56 / W111 56.32 -- `40.47604, -111.93864`
- **HAKKR** N40 31.69 / W111 56.68 -- `40.52819, -111.94464`
- **CHEVL** N40 40.78 / W111 57.73 -- `40.67969, -111.96214`
- **RW34R** N40 46.48 / W111 58.39 -- `40.77464, -111.97313`
- **TCH** N40 51.02 / W111 58.91 -- `40.85026, -111.98191`
- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`
- **TOOME** N41 03.22 / W112 00.34 -- `41.05361, -112.00561`
- **FANDS** N41 16.23 / W112 03.21 -- `41.27052, -112.05351`
- **UFEMY** N41 02.55 / W112 01.60 -- `41.04252, -112.02670`
- **TUKTE** N41 18.95 / W111 57.73 -- `41.31589, -111.96219`
- **JUGOX** N40 44.90 / W111 59.54 -- `40.74839, -111.99238`
- **FALEM** N40 46.04 / W111 59.68 -- `40.76741, -111.99459`
- **IRUYU** N40 44.52 / W111 58.16 -- `40.74202, -111.96934`
- **GITBE** N40 46.02 / W111 58.33 -- `40.76697, -111.97224`
- **SLOPS** N40 50.33 / W112 14.64 -- `40.83882, -112.24399`
- **JOMVA** N40 43.91 / W111 59.43 -- `40.73178, -111.99045`
- **HLMET** N40 25.35 / W111 55.34 -- `40.42246, -111.92232`
- **PEDLE** N40 28.48 / W111 55.70 -- `40.47468, -111.92833`
- **ZEPOG** N40 31.61 / W111 56.06 -- `40.52691, -111.93435`
- **KERNN** N40 40.72 / W111 57.11 -- `40.67862, -111.95190`
- **WEEEL** N40 44.47 / W111 57.55 -- `40.74121, -111.95916`
- **FORXS** N40 45.98 / W111 57.72 -- `40.76628, -111.96207`
- **KNOBY** N40 51.90 / W111 58.31 -- `40.86503, -111.97190`
- **DRAPE** N40 36.60 / W111 56.64 -- `40.60997, -111.94395`

## KBMC — BRIGHAM CITY RGNL

Runways in CIFP: 17, 35

### STARs

None coded in CIFP 260903.

### SIDs

**OGD1**

- **RW17:** [VA leg - not a fix] | OGD  *(1 non-fix leg)*
- **RW35:** [VA leg - not a fix] | [VI leg - not a fix] | OGD  *(2 non-fix legs)*


### Fix coordinates

- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`

### Approaches

**R35** — RNAV (GPS) RWY 35

- **MOINT:** MOINT | KONNE >=9100 | WIZSI >=7100
- **NUBGE:** NUBGE | KONNE >=9300 | WIZSI >=7100
- **OGD:** OGD | WIZSI >=7100
- **(final):** WIZSI >=7100 | OZFEL >=5900 | XEXXA 4428 | [CA leg - not a fix] | KONNE >=7100 | KONNE >=7100  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`MOINT`, `NUBGE`, `OGD`

### Fix coordinates

- **MOINT** N41 15.15 / W112 25.76 -- `41.25258, -112.42933`
- **KONNE** N41 16.19 / W112 13.70 -- `41.26977, -112.22832`
- **WIZSI** N41 21.52 / W112 06.47 -- `41.35864, -112.10784`
- **NUBGE** N41 19.98 / W112 25.87 -- `41.33296, -112.43116`
- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`
- **OZFEL** N41 27.50 / W112 04.91 -- `41.45829, -112.08180`
- **XEXXA** N41 32.03 / W112 03.72 -- `41.53387, -112.06200`

## KHIF — HILL AFB

Runways in CIFP: 14, 32

### STARs

None coded in CIFP 260903.

### SIDs

None coded in CIFP 260903.

### Approaches

None coded in CIFP 260903.

## KOGD — OGDEN-HINCKLEY

Runways in CIFP: 03, 17, 21, 35

### STARs

**WLKRR1**

- **BEARR:** BEARR 13 | TUMMS >=10/250 | WLKRR 8
- **CARTR:** CARTR 13 | BNNCH >=12 | TUMMS >=10/250 | WLKRR 8
- **DRAPR:** DRAPR | SCANT >=13 | TROFF >=9 | EMONT | WLKRR 8
- **FLECC:** FLECC | BVL | KNOLE >=12 | WAATS >=11 | TROFF >=9 | EMONT | WLKRR 8
- **ALL:** WLKRR 8 | [FM leg - not a fix]  *(1 non-fix leg)*


### Fix coordinates

- **BEARR** N41 31.85 / W112 29.31 -- `41.53079, -112.48844`
- **TUMMS** N41 14.13 / W112 19.12 -- `41.23552, -112.31861`
- **WLKRR** N41 05.60 / W112 19.31 -- `41.09328, -112.32189`
- **CARTR** N41 33.66 / W112 02.76 -- `41.56104, -112.04604`
- **BNNCH** N41 30.96 / W112 05.04 -- `41.51594, -112.08399`
- **DRAPR** N40 18.15 / W112 10.20 -- `40.30254, -112.16999`
- **SCANT** N40 45.23 / W112 16.40 -- `40.75380, -112.27325`
- **TROFF** N40 54.89 / W112 28.08 -- `40.91488, -112.46793`
- **EMONT** N41 03.03 / W112 25.48 -- `41.05056, -112.42468`
- **FLECC** N40 42.13 / W114 53.27 -- `40.70218, -114.88784`
- **BVL** N40 43.57 / W113 45.45 -- `40.72610, -113.75742`
- **KNOLE** N40 43.36 / W112 51.52 -- `40.72260, -112.85865`
- **WAATS** N40 43.17 / W112 31.79 -- `40.71958, -112.52987`

### SIDs

**EMONT3**

- **RW03:** [CA leg - not a fix] | OGD | EMONT | EMONT >=9  *(1 non-fix leg)*
- **RW21:** [CA leg - not a fix] | [VI leg - not a fix] | EMONT | EMONT >=9  *(2 non-fix legs)*
- **RW35:** [CA leg - not a fix] | OGD | EMONT | EMONT >=9  *(1 non-fix leg)*


### Fix coordinates

- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`
- **EMONT** N41 03.03 / W112 25.48 -- `41.05056, -112.42468`

### Approaches

**I03** — ILS RWY 03

- **RIDEN:** RIDEN >=8100 | JOSIF >=8100
- **TCH:** TCH >=8100 | JOSIF >=8100
- **(final):** JOSIF 8100 | WUXIS >=6400 | WULFE 6000 | RW03 4522 | [CA leg - not a fix] | OGD | MOINT >=9000 | MOINT >=9000  *(1 non-fix leg)*

**L03** — LOC RWY 03

- **RIDEN:** RIDEN >=8100 | JOSIF >=8100
- **TCH:** TCH >=8100 | JOSIF >=8100
- **(final):** JOSIF >=8100 | WUXIS >=6400 | WULFE >=6000 | RW03 4522 | [CA leg - not a fix] | OGD | MOINT >=9000 | MOINT >=9000  *(1 non-fix leg)*

**R03** — RNAV (GPS) RWY 03

- **MOINT:** MOINT | RIDEN >=9000 | CISBI >=7700
- **STACO:** STACO | CISBI >=7700
- **TCH:** TCH | CISBI >=7700
- **(final):** CISBI >=7700 | WULFE >=6000 | RW03 4522 | [CA leg - not a fix] | MOINT >=9000 | MOINT >=9000  *(1 non-fix leg)*

**VOR-A** — VOR circling A

- **JEMKU:** JEMKU | ZIXIV >=7200
- **RACGO:** RACGO | ZIXIV >=7200
- **(final):** ZIXIV >=7200 | OGD >=5700 | RUYOS 4473 | [CA leg - not a fix] | OGD | MOINT >=13000 | MOINT >=13000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`RIDEN`, `TCH`, `MOINT`, `STACO`, `JEMKU`, `RACGO`

### Fix coordinates

- **RIDEN** N41 08.97 / W112 25.62 -- `41.14956, -112.42699`
- **JOSIF** N41 01.36 / W112 14.25 -- `41.02271, -112.23755`
- **TCH** N40 51.02 / W111 58.91 -- `40.85026, -111.98191`
- **WUXIS** N41 03.52 / W112 11.41 -- `41.05874, -112.19014`
- **WULFE** N41 07.99 / W112 05.58 -- `41.13311, -112.09300`
- **RW03** N41 11.28 / W112 01.25 -- `41.18802, -112.02082`
- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`
- **MOINT** N41 15.15 / W112 25.76 -- `41.25258, -112.42933`
- **CISBI** N41 02.25 / W112 13.09 -- `41.03754, -112.21818`
- **STACO** N40 49.33 / W112 25.18 -- `40.82220, -112.41960`
- **JEMKU** N41 03.71 / W112 02.85 -- `41.06180, -112.04756`
- **ZIXIV** N41 17.59 / W112 17.96 -- `41.29318, -112.29937`
- **RACGO** N41 23.11 / W112 09.34 -- `41.38512, -112.15574`
- **RUYOS** N41 11.99 / W112 01.68 -- `41.19983, -112.02795`

## KPVU — PROVO MUNI

Runways in CIFP: 13, 18, 31, 36

### STARs

**TAYTR4**

- **BCE:** BCE | MARNN <=FL240 | MYLER >=14 | FRNZY 13/230 | KNOXY 11 | TAYTR 11
- **BERYL:** BERYL | STEEN <=FL250 | JAMMN 11/230 | TAYTR 11
- **BVL:** BVL | KNOLE | SIMRR | KARTH | GILDR >=12/250 | ASHBO | TAYTR 11
- **FRNZY:** FRNZY 13/230 | KNOXY 11 | TAYTR 11
- **HELPR:** HELPR <=FL260 | RAHZL <=16 | YMONT 13/230 | TOADE 13 | NUTZZ >=11 | TAYTR 11
- **JAMMN:** JAMMN 11/230 | TAYTR 11
- **KNOLE:** KNOLE | SIMRR | KARTH | GILDR >=12/250 | ASHBO | TAYTR 11
- **MARNN:** MARNN <=FL240 | MYLER >=14 | FRNZY 13/230 | KNOXY 11 | TAYTR 11
- **MTU:** MTU <=FL260 | THISL <=16 | SPANE 13/230 | TOADE 13 | NUTZZ >=11 | TAYTR 11
- **OGD:** OGD | YUTES | SIMRR | KARTH | GILDR >=12/250 | ASHBO | TAYTR 11
- **RAHZL:** RAHZL <=16 | YMONT 13/230 | TOADE 13 | NUTZZ >=11 | TAYTR 11
- **SPANE:** SPANE 13/230 | TOADE 13 | NUTZZ >=11 | TAYTR 11
- **STEEN:** STEEN <=FL250 | JAMMN 11/230 | TAYTR 11
- **THISL:** THISL <=16 | SPANE 13/230 | TOADE 13 | NUTZZ >=11 | TAYTR 11
- **YMONT:** YMONT 13/230 | TOADE 13 | NUTZZ >=11 | TAYTR 11


### Fix coordinates

- **BCE** N37 41.35 / W112 18.23 -- `37.68919, -112.30390`
- **MARNN** N39 15.53 / W112 05.17 -- `39.25886, -112.08622`
- **MYLER** N39 46.74 / W112 06.61 -- `39.77906, -112.11018`
- **FRNZY** N39 58.25 / W112 07.15 -- `39.97078, -112.11911`
- **KNOXY** N40 06.14 / W112 06.66 -- `40.10240, -112.11097`
- **TAYTR** N40 11.97 / W112 06.30 -- `40.19952, -112.10494`
- **BERYL** N37 54.00 / W113 23.14 -- `37.90005, -113.38572`
- **STEEN** N39 18.69 / W112 39.09 -- `39.31144, -112.65148`
- **JAMMN** N40 02.61 / W112 15.48 -- `40.04344, -112.25792`
- **BVL** N40 43.57 / W113 45.45 -- `40.72610, -113.75742`
- **KNOLE** N40 43.36 / W112 51.52 -- `40.72260, -112.85865`
- **SIMRR** N40 32.93 / W112 29.29 -- `40.54877, -112.48821`
- **KARTH** N40 25.94 / W112 27.59 -- `40.43229, -112.45976`
- **GILDR** N40 14.65 / W112 17.28 -- `40.24411, -112.28798`
- **ASHBO** N40 10.88 / W112 11.75 -- `40.18137, -112.19588`
- **HELPR** N39 45.19 / W110 32.89 -- `39.75314, -110.54812`
- **RAHZL** N39 56.90 / W111 13.04 -- `39.94829, -111.21735`
- **YMONT** N40 01.80 / W111 30.15 -- `40.02994, -111.50251`
- **TOADE** N40 05.14 / W111 47.99 -- `40.08560, -111.79976`
- **NUTZZ** N40 08.56 / W112 00.32 -- `40.14272, -112.00535`
- **MTU** N40 08.95 / W110 07.62 -- `40.14910, -110.12703`
- **THISL** N40 08.19 / W111 12.85 -- `40.13642, -111.21418`
- **SPANE** N40 07.83 / W111 32.90 -- `40.13045, -111.54839`
- **OGD** N41 13.45 / W112 05.89 -- `41.22409, -112.09824`
- **YUTES** N40 43.17 / W112 31.81 -- `40.71958, -112.53011`

### SIDs

**DITTI1**

- **RW13:** [VA leg - not a fix] | DITTI 9  *(1 non-fix leg)*
- **RW31:** [VA leg - not a fix] | DITTI 9  *(1 non-fix leg)*
- **DAHLI:** DITTI | NEPHI | BOTSS | DAHLI
- **TCH:** DITTI | KOONA | TCH

**PROVO4**

- **RW13:** [CA leg - not a fix] | CALUB | FFU/210  *(1 non-fix leg)*
- **RW18:** [CA leg - not a fix] | CALUB | FFU/210  *(1 non-fix leg)*
- **RW31:** [CA leg - not a fix] | PAMEE | FFU/210  *(1 non-fix leg)*
- **RW36:** [CA leg - not a fix] | PAMEE | FFU/210  *(1 non-fix leg)*


### Fix coordinates

- **DITTI** N40 08.14 / W111 54.79 -- `40.13565, -111.91321`
- **NEPHI** N40 00.75 / W111 56.85 -- `40.01258, -111.94754`
- **BOTSS** N39 53.22 / W111 53.87 -- `39.88697, -111.89777`
- **DAHLI** N39 42.53 / W111 55.68 -- `39.70882, -111.92797`
- **KOONA** N40 10.36 / W112 06.37 -- `40.17272, -112.10616`
- **TCH** N40 51.02 / W111 58.91 -- `40.85026, -111.98191`
- **CALUB** N40 08.44 / W111 55.70 -- `40.14068, -111.92830`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **PAMEE** N40 20.98 / W111 50.41 -- `40.34969, -111.84017`

### Approaches

**I13** — ILS RWY 13

- **JAURN:** JAURN | DICOT >=8000
- **TAYTR:** TAYTR 11000 | JUKOM >=8000 | DICOT >=8000
- **(final):** DICOT 8000 | ZEGUR >=6800 | WAVIT 6300 | RW13 4547 | [CA leg - not a fix] | HUNSU | FEBGO | ZARAK | JAMUK | FFU >=9000 | FFU >=9000  *(1 non-fix leg)*

**L13** — LOC RWY 13

- **JAURN:** JAURN | DICOT >=8000
- **TAYTR:** TAYTR 11000 | JUKOM >=8000 | DICOT >=8000
- **(final):** DICOT >=8000 | ZEGUR >=6800 | WAVIT >=6300 | CIKAK 4697 | [CA leg - not a fix] | HUNSU | FEBGO | ZARAK | JAMUK | FFU >=9000 | FFU >=9000  *(1 non-fix leg)*

**R13** — RNAV (GPS) RWY 13

- **JAURN:** JAURN | DICOT >=8000
- **TAYTR:** TAYTR 11000 | JUKOM >=8000 | DICOT >=8000
- **(final):** DICOT >=8000 | ZEGUR >=6800 | WAVIT >=6300 | RW13 4547 | [CA leg - not a fix] | HUNSU | FEBGO | ZARAK | JAMUK | FFU >=9000 | FFU >=9000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`JAURN`, `TAYTR`

### Fix coordinates

- **JAURN** N40 28.81 / W111 57.31 -- `40.48021, -111.95523`
- **DICOT** N40 23.33 / W111 52.41 -- `40.38879, -111.87351`
- **TAYTR** N40 11.97 / W112 06.30 -- `40.19952, -112.10494`
- **JUKOM** N40 22.94 / W112 01.57 -- `40.38229, -112.02618`
- **ZEGUR** N40 20.18 / W111 49.60 -- `40.33631, -111.82673`
- **WAVIT** N40 18.37 / W111 47.99 -- `40.30610, -111.79985`
- **RW13** N40 13.81 / W111 43.95 -- `40.23021, -111.73244`
- **HUNSU** N40 08.65 / W111 39.37 -- `40.14412, -111.65619`
- **FEBGO** N40 04.54 / W111 41.61 -- `40.07564, -111.69347`
- **ZARAK** N39 57.34 / W111 52.47 -- `39.95573, -111.87444`
- **JAMUK** N40 02.10 / W111 59.69 -- `40.03504, -111.99485`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **CIKAK** N40 14.20 / W111 44.29 -- `40.23668, -111.73818`

## KSPK — SPANISH FORK MUNI/WOODHOUSE FL

Runways in CIFP: 12, 30

### STARs

None coded in CIFP 260903.

### SIDs

**SPK1**

- **RW12:** [VA leg - not a fix] | [VI leg - not a fix] | CALUB >=11.5/240  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | CALUB >=11.5  *(1 non-fix leg)*
- **(final):** CALUB >=11.5 | FFU


### Fix coordinates

- **CALUB** N40 08.44 / W111 55.70 -- `40.14068, -111.92830`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`

### Approaches

**R12** — RNAV (GPS) RWY 12

- **JAURN:** JAURN/250 | OCACE >=9500
- **TAYTR:** TAYTR | JUKOM >=11000/210 | OCACE >=9500
- **VERNE:** VERNE | JEGRA >=12400 | JUKOM >=11000/210 | OCACE >=9500
- **(final):** OCACE >=9500 | YALVU >=6600 | RW12 4555 | [CA leg - not a fix] | VERNE >=11500 | VERNE >=11500  *(1 non-fix leg)*

**RNV-A** — RNAV circling A

- **FRNZY:** FRNZY | UKROY >=9600
- **UKROY:** UKROY >=9600
- **VERNE:** VERNE | UKROY >=9600
- **(final):** UKROY >=9600 | ZAMUX >=7800 | NEVME >=6800 | OGXIB 4530 | [CA leg - not a fix] | VERNE >=11500/185 | VERNE >=11500  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`JAURN`, `TAYTR`, `VERNE`, `FRNZY`, `UKROY`

### Fix coordinates

- **JAURN** N40 28.81 / W111 57.31 -- `40.48021, -111.95523`
- **OCACE** N40 22.76 / W111 54.76 -- `40.37932, -111.91259`
- **TAYTR** N40 11.97 / W112 06.30 -- `40.19952, -112.10494`
- **JUKOM** N40 22.94 / W112 01.57 -- `40.38229, -112.02618`
- **VERNE** N40 11.29 / W112 25.49 -- `40.18814, -112.42481`
- **JEGRA** N40 20.42 / W112 06.76 -- `40.34041, -112.11259`
- **YALVU** N40 13.39 / W111 46.77 -- `40.22313, -111.77949`
- **RW12** N40 09.06 / W111 40.58 -- `40.15104, -111.67628`
- **FRNZY** N39 58.25 / W112 07.15 -- `39.97078, -112.11911`
- **UKROY** N40 09.82 / W112 00.36 -- `40.16369, -112.00602`
- **ZAMUX** N40 09.39 / W111 53.23 -- `40.15648, -111.88713`
- **NEVME** N40 09.05 / W111 47.66 -- `40.15077, -111.79426`
- **OGXIB** N40 08.64 / W111 41.16 -- `40.14401, -111.68594`

## KTVY — BOLINDER FLD/TOOELE VALLEY

Runways in CIFP: 17, 35

### STARs

None coded in CIFP 260903.

### SIDs

**STACO2**

- **RW17:** [VA leg - not a fix] | HOKPI | ZESER | STACO 9  *(1 non-fix leg)*
- **RW35:** [VA leg - not a fix] | ZESER | STACO 9  *(1 non-fix leg)*


### Fix coordinates

- **HOKPI** N40 38.43 / W112 27.18 -- `40.64055, -112.45294`
- **ZESER** N40 44.16 / W112 25.17 -- `40.73595, -112.41952`
- **STACO** N40 49.33 / W112 25.18 -- `40.82220, -112.41960`

### Approaches

**I17** — ILS RWY 17

- **EMONT:** EMONT | FOGEM >=12000 | WEGET >=8100
- **SALTA:** SALTA >=8100 | WEGET >=8100
- **WEGET:** WEGET >=8100
- **(final):** WEGET 8100 | JONEK 6100 | RW17 4328 | [CA leg - not a fix] | [VI leg - not a fix] | WEGET | FOGEM >=8600 | FOGEM >=8600  *(2 non-fix legs)*

**L17** — LOC RWY 17

- **EMONT:** EMONT | FOGEM >=12000 | WEGET >=8100
- **SALTA:** SALTA >=8100 | WEGET >=8100
- **WEGET:** WEGET >=8100
- **(final):** WEGET >=8100 | JONEK >=6100 | RW17 4328 | [CA leg - not a fix] | [VI leg - not a fix] | WEGET | FOGEM >=8600 | FOGEM >=8600  *(2 non-fix legs)*

**R17** — RNAV (GPS) RWY 17

- **ANEYI:** ANEYI | WEGET >=9800 | WEGET >=8100
- **EMONT:** EMONT | WEGET >=8100
- **SALTA:** SALTA | WEGET >=8100
- **(final):** WEGET >=8100 | JONEK >=6100 | RW17 4328 | [CA leg - not a fix] | WEGET | FOGEM >=8600 | FOGEM >=8600  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`EMONT`, `SALTA`, `WEGET`, `ANEYI`

### Fix coordinates

- **EMONT** N41 03.03 / W112 25.48 -- `41.05056, -112.42468`
- **FOGEM** N41 01.26 / W112 21.54 -- `41.02107, -112.35908`
- **WEGET** N40 49.59 / W112 21.31 -- `40.82644, -112.35512`
- **SALTA** N40 50.34 / W112 09.63 -- `40.83901, -112.16050`
- **JONEK** N40 42.82 / W112 21.17 -- `40.71368, -112.35282`
- **RW17** N40 37.26 / W112 21.06 -- `40.62092, -112.35095`
- **ANEYI** N40 42.21 / W112 18.90 -- `40.70350, -112.31494`

## KSVR — SOUTH VALLEY RGNL

Runways in CIFP: 16, 34

### STARs

None coded in CIFP 260903.

### SIDs

**SVALY2**

- **RW16:** [VA leg - not a fix] | HOKEG | FFU | FFU 9  *(1 non-fix leg)*
- **RW34:** [VA leg - not a fix] | CELOD | FFU | FFU 9  *(1 non-fix leg)*


### Fix coordinates

- **HOKEG** N40 34.75 / W111 59.15 -- `40.57915, -111.98587`
- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **CELOD** N40 39.63 / W112 00.00 -- `40.66058, -112.00002`

### Approaches

**R34** — RNAV (GPS) RWY 34

- **FFU:** FFU >=9000
- **(final):** FFU >=9000 | KOCEN >=9000 | LODME >=7600 | ACIPO 6080 | HOKIT 5380 | RW34 4660 | [CA leg - not a fix] | DUYDE | KITBE | STACO >=9000 | STACO >=9000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`FFU`

### Fix coordinates

- **FFU** N40 16.49 / W111 56.43 -- `40.27489, -111.94053`
- **KOCEN** N40 20.76 / W111 57.00 -- `40.34607, -111.95004`
- **LODME** N40 27.54 / W111 57.90 -- `40.45897, -111.96499`
- **ACIPO** N40 32.23 / W111 58.71 -- `40.53717, -111.97856`
- **HOKIT** N40 34.41 / W111 59.09 -- `40.57355, -111.98488`
- **RW34** N40 36.69 / W111 59.49 -- `40.61157, -111.99150`
- **DUYDE** N40 40.66 / W112 00.18 -- `40.67769, -112.00300`
- **KITBE** N40 46.25 / W112 05.72 -- `40.77089, -112.09541`
- **STACO** N40 49.33 / W112 25.18 -- `40.82220, -112.41960`

