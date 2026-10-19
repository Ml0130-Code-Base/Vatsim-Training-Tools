# SID, STAR and approach data from CIFP - SDF

Generated **2026-10-19** from **CIFP 261001** (FAA Coded Instrument Flight Procedures, cycle effective 2026-10-01). **Cycle 261029 (effective 2026-10-29, posted early) was decoded too and is identical at every field below - SIDs, STARs, runways and approach lists.** Pull recipe, record layout and licence in `claude_CIFP_Source_Reference.md` at the repository root.

**The cycle is the citation.** A value here is true for 28 days by construction - quote it as `CIFP 261001` and re-pull before trusting it in a later cycle. Never hand-patch a table stamped with an older cycle.

**This is the published procedure, not the facility's use of it.** CIFP lists every transition that exists and is silent on which one the facility assigns - that is an SOP question with no CIFP equivalent. Nothing here is a sector boundary.

## Notation

| written | means |
|---|---|
| `>=N` | at or above N |
| `<=N` | at or below N |
| `N` | cross AT N |
| `L - H` | cross between L and H |
| `FLnnn` | flight level |
| `/nnn` | speed limit, knots |
| a fix with no number | no published crossing - lateral point only |

SIDs and STARs are written in thousands (`>=11` is 11,000). A **`[XX leg - not a fix]`** entry terminates on a heading, an altitude or a manual vector (`FM`, `VM`, `VA`, `CA`, `VI`) and cannot be drawn as a point.

## Coverage

- **KSDF: 7 SIDs and 4 STARs coded, and every procedure the SOP names is among them.** SIDs EEVAA1, GTGON1, HIDEY1, LLIZY1, LOKRD1, RDHSE1, SPILR1; STARs DLAMP8, JMONY2, LEDDL1, MBELL5. All are RNAV.
- **CIFP agrees with the SOP's initial-waypoint table (SOP 6) on every runway.** DROPA off 17L; WININ off 17R for GTGON, LLIZY, RDHSE and SPILR; EAZIE off 17R for HIDEY, LOKRD and EEVAA; RRROE off 35L; BAALK off 35R; GADSN off 29. That is an independent second source for a table with eighteen cells.
- The SOP's non-RNAV routes (`IIU V171 HONOS` and the like) are airway routings, not procedures, and CIFP carries none.
- **KLOU: 3 STARs coded** (JMONY2, LEDDL1, MBELL5 - the same procedures as KSDF, with Bowman's own runway data) **and no SID.**
- **KJVY (Clark Regional) carries the same three STARs as KLOU** (no SID). **Fields with a runway record and no coded procedure:** KFTK, KBFR, KSER, KIMS, KBRY, KEKX, KFRH, 6I2, I93 (approaches only, or none).

## KSDF

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **EEVAA1** | RNAV | SHIPR | RW17L RW17R RW29 RW35L RW35R |
| **GTGON1** | RNAV | TERGE | RW17L RW17R RW29 RW35L RW35R |
| **HIDEY1** | RNAV | RAMRD | RW17L RW17R RW29 RW35L RW35R |
| **LLIZY1** | RNAV | DAAVE | RW17L RW17R RW29 RW35L RW35R |
| **LOKRD1** | RNAV | BILET | RW17L RW17R RW29 RW35L RW35R |
| **RDHSE1** | RNAV | JIBKA | RW17L RW17R RW29 RW35L RW35R |
| **SPILR1** | RNAV | BNGIN | RW17L RW17R RW29 RW35L RW35R |

#### KSDF EEVAA1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | ROARY | EEVAA >=12
- **RW17R:** [VI leg - not a fix] | EAZIE | WWODY | EEVAA >=12
- **RW29:** [VI leg - not a fix] | GADSN | LUUKE >=4 | PEANT | FEEBE >=8 | EEVAA >=12
- **RW35L:** [VI leg - not a fix] | RRROE | BUDDR | FLEYE | KOBEZ >=8 /250 | EEVAA >=12
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SIXMI | KOBEZ >=8 /250 | EEVAA >=12
- **SHIPR:** EEVAA | CHALI | SHIPR

#### KSDF GTGON1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | DUNNZ >=4 | ONMEE | GNZOH >=12 | GTGON
- **RW17R:** [VI leg - not a fix] | WININ >=2500 /230 | REECE >=4 | ONMEE | GNZOH >=12 | GTGON
- **RW29:** [VI leg - not a fix] | GADSN | LUUKE | GTGON
- **RW35L:** [VI leg - not a fix] | RRROE | BUHBA >=4 | ERLWN >=8 | GTGON
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SLATY >=2500 /230 | BUHBA >=4 | ERLWN >=8 | GTGON
- **TERGE:** GTGON | APALO | TERGE

#### KSDF HIDEY1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | LURVL | MERJS | HIDEY
- **RW17R:** [VI leg - not a fix] | EAZIE | WWODY | MERJS | HIDEY
- **RW29:** [VI leg - not a fix] | GADSN | LUUKE >=4 | MSTRA | STEFD >=13 | HIDEY
- **RW35L:** [VI leg - not a fix] | RRROE | BUHBA >=4 | ERLWN >=8 | MSTRA | HIDEY
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SIXMI | KOBEZ >=8 /250 | JADDR | MERJS | HIDEY
- **RAMRD:** HIDEY | RAMRD

#### KSDF LLIZY1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | DUNNZ >=4 | ONMEE | MSTRA >=10 | LLIZY
- **RW17R:** [VI leg - not a fix] | WININ >=2500 /230 | REECE >=4 | ONMEE | MSTRA >=10 | LLIZY
- **RW29:** [VI leg - not a fix] | GADSN | LUUKE | LLIZY
- **RW35L:** [VI leg - not a fix] | RRROE | BUHBA >=4 | ERLWN >=8 | LLIZY
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SLATY >=2500 /230 | BUHBA >=4 | ERLWN >=8 | LLIZY
- **DAAVE:** LLIZY | GUMMI | DAAVE

#### KSDF LOKRD1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | LURVL | LOKRD
- **RW17R:** [VI leg - not a fix] | EAZIE | WWODY | LOKRD
- **RW29:** [VI leg - not a fix] | GADSN | LUUKE >=4 | PEANT | MDJAE | HLLYY >=8 | LOKRD
- **RW35L:** [VI leg - not a fix] | RRROE | BUHBA >=4 | ERLWN >=8 | PEANT | MDJAE | HLLYY >=8 | LOKRD
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SIXMI | KOBEZ >=8 /250 | NNALA | LOKRD
- **BILET:** LOKRD | CNTRY | BILET

#### KSDF RDHSE1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | LURVL >=4 | MURCA >=8 | LOUFC | HNNAN
- **RW17R:** [VI leg - not a fix] | WININ >=2500 /230 | REECE >=4 | ONMEE | IZREL >=8 | HNNAN
- **RW29:** [VI leg - not a fix] | GADSN | CANBE | EEGGO >=10 | HNNAN
- **RW35L:** [VI leg - not a fix] | RRROE | HNNAN
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SHNIK | HNNAN
- **(common):** HNNAN | RDHSE
- **JIBKA:** RDHSE | JIBKA

#### KSDF SPILR1

- **RW17L:** [VA leg - not a fix] >=1020 | DROPA >=2500 /230 | LURVL >=4 | MURCA >=8 | MIDDZ | SPILR
- **RW17R:** [VI leg - not a fix] | WININ >=2500 /230 | REECE >=4 | ONMEE | IZREL >=8 | CANBE >=8 | SPILR
- **RW29:** [VI leg - not a fix] | GADSN | CANBE >=8 | SPILR
- **RW35L:** [VI leg - not a fix] | RRROE | SPILR
- **RW35R:** [VA leg - not a fix] >=1020 | BAALK | SHNIK | SPILR
- **BNGIN:** SPILR | BNGIN

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DLAMP8** | RNAV | RINTE UKATS | RW17L RW17R RW29 RW35B |
| **JMONY2** | RNAV | CYBIL SHARE | RW17L RW17R RW29 RW35B |
| **LEDDL1** | RNAV | GLAZR LAFOX YOCKY | RW17B RW29 RW35L RW35R |
| **MBELL5** | RNAV | BUMPY IMOUT MOOCH PENBE | RW17B RW29 RW35L RW35R |

#### KSDF DLAMP8

- **RINTE:** RINTE | ZIDHI FL210 - FL230 | ANCHR 17 - FL200 /280
- **UKATS:** UKATS | SHIRT | ZIDHI FL210 - FL230 | ANCHR 17 - FL200 /280
- **(common):** ANCHR 17 - FL200 /280 | DLAMP 14 - 16 /280
- **RW17L:** DLAMP 14 - 16 /280 | NEIBR 11 - 13 | SPOKY 9 - 11 | BEEBY 7 - 9 | MIAHH 6 - 7 | OHHGE 6 /210 | LEXXI 6 /210
- **RW17R:** DLAMP 14 - 16 /280 | NEIBR 11 - 13 | SPOKY 9 - 11 | BEEBY 7 - 9 | MIAHH 6 - 7 | OHHGE 6 /210 | CWAYN 6 /210
- **RW29:** DLAMP 14 - 16 /280 | MTERO 11 - 13 | MMRTN 9 - 11 /250 | JBOND 7 - 9 | BETTN 6 - 7 | SNDLS 6 | TRUBS 4 /210
- **RW35B:** DLAMP 14 - 16 /280 | KFONG 11 - 13 | MRSHY 9 - 11 | MKENZ 7 - 9 | PURPL 6 | KELSS | BECOO 6 | [FM from BECOO - not a fix]

#### KSDF JMONY2

- **CYBIL:** CYBIL | AGILE | KNGFU | SHARE | SUUPR <=FL230 | GDAYE >=FL200
- **SHARE:** SHARE | SUUPR <=FL230 | GDAYE >=FL200
- **(common):** GDAYE >=FL200 | LISZA 14 - 17 /280 | JMONY 13 - 15
- **RW17L:** JMONY 13 - 15 | RCTIC 11 - 13 | MEENY 9 - 11 | DURBY 7 - 9 | BODYE 6 | MMAXY | LEXXI 6 /210
- **RW17R:** JMONY 13 - 15 | RCTIC 11 - 13 | MEENY 9 - 11 | DURBY 7 - 9 | BODYE 6 | MMAXY | CWAYN 6 /210
- **RW29:** JMONY 13 - 15 | WILAA 11 - 13 | CLLWY 9 - 11 | WWEVR 7 - 9 | HOOLA 6 - 7 | KYANG 6 | CPIKE 6 | RAACH | BATSS 6 | [FM from BATSS - not a fix]
- **RW35B:** JMONY 13 - 15 | MIILI 11 - 13 | MMACE 9 - 11 | RLENA 7 - 9 | JYTEE 6 - 7 | DHARD 6 | LEWSS 6 | DEEPR 6 | [FM from DEEPR - not a fix]

#### KSDF LEDDL1

- **GLAZR:** GLAZR | DNUTS | ARUSH | COBBZ 14 - 16 /280
- **LAFOX:** LAFOX | KOFEY | ARUSH | COBBZ 14 - 16 /280
- **YOCKY:** YOCKY | ARUSH | COBBZ 14 - 16 /280
- **(common):** COBBZ 14 - 16 /280 | LEDDL 11 - 13
- **RW17B:** LEDDL 11 - 13 | SODAA 9 - 11 | LUEEY 7 - 9 | RODAH 6 - 7 | STVNZ 6 | MYCUL | HHANA 6 | [FM from HHANA - not a fix]
- **RW29:** LEDDL 11 - 13 | SODAA 9 - 11 | LUEEY 7 - 9 | SNDLS 6 | TRUBS 4 /210
- **RW35L:** LEDDL 11 - 13 | PPATI 9 - 11 | OLDIZ 7 - 9 | KYLAW 7 | BRBON 6
- **RW35R:** LEDDL 11 - 13 | PPATI 9 - 11 | OLDIZ 7 - 9 | KYLAW 7 | MEEKO 6

#### KSDF MBELL5

- **BUMPY:** BUMPY | PENBE | XXTRA | JIINN 14 - 16 /280
- **IMOUT:** IMOUT | VENMO | XXTRA | JIINN 14 - 16 /280
- **MOOCH:** MOOCH | PENBE | XXTRA | JIINN 14 - 16 /280
- **PENBE:** PENBE | XXTRA | JIINN 14 - 16 /280
- **(common):** JIINN 14 - 16 /280 | MBELL 13 - 15
- **RW17B:** MBELL 13 - 15 | AABBZ 11 - 13 | BLEEM 9 - 11 | GLENM 7 - 9 | AUDRY 6 - 7 | BEEKK 6 | TROLI | PDUDL 6 | [FM from PDUDL - not a fix]
- **RW29:** MBELL 13 - 15 | LOKBL 11 - 13 | LIYAH 9 - 11 | PRKER 7 - 9 | KYSEN 6 | SHLEY | FARNK 6 | MAYLN 6 | [FM from MAYLN - not a fix]
- **RW35L:** MBELL 13 - 15 | LOKBL 11 - 13 | LIYAH 9 - 11 | PRKER 7 - 9 | KYSEN 6 | RNNER | BRBON 6
- **RW35R:** MBELL 13 - 15 | LOKBL 11 - 13 | LIYAH 9 - 11 | PRKER 7 - 9 | KYSEN 6 | RNNER | MEEKO 6

## KLOU

**SIDs: none coded at KLOU in CIFP 261001** - checked and empty, a coding gap at this field.

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **JMONY2** | RNAV | CYBIL SHARE | ALL |
| **LEDDL1** | RNAV | GLAZR LAFOX YOCKY | ALL |
| **MBELL5** | RNAV | BUMPY IMOUT MOOCH PENBE | ALL |

#### KLOU JMONY2

- **CYBIL:** CYBIL | AGILE | KNGFU | SHARE | SUUPR <=FL230 | GDAYE >=FL200
- **SHARE:** SHARE | SUUPR <=FL230 | GDAYE >=FL200
- **(common):** GDAYE >=FL200 | LISZA 14 - 17 /280 | JMONY 13 - 15 | RCTIC 11 - 13 | CHKIN 9 - 11 | LEGGZ 7 - 9 | MYDOG 6 | [FM from MYDOG - not a fix]

#### KLOU LEDDL1

- **GLAZR:** GLAZR | DNUTS | ARUSH | COBBZ 14 - 16 /280
- **LAFOX:** LAFOX | KOFEY | ARUSH | COBBZ 14 - 16 /280
- **YOCKY:** YOCKY | ARUSH | COBBZ 14 - 16 /280
- **(common):** COBBZ 14 - 16 /280 | LEDDL 11 - 13 | SODAA 9 - 11 | LUEEY 7 - 9 | PNNIC 5 | [FM from PNNIC - not a fix]

#### KLOU MBELL5

- **BUMPY:** BUMPY | PENBE | XXTRA | JIINN 14 - 16 /280
- **IMOUT:** IMOUT | VENMO | XXTRA | JIINN 14 - 16 /280
- **MOOCH:** MOOCH | PENBE | XXTRA | JIINN 14 - 16 /280
- **PENBE:** PENBE | XXTRA | JIINN 14 - 16 /280
- **(common):** JIINN 14 - 16 /280 | MBELL 13 - 15 | LOKBL 11 - 13 | LIYAH 9 - 11 | PRKER 7 - 9 | MOWGN 6 | [FM from MOWGN - not a fix]

## KJVY

**SIDs: none coded at KJVY in CIFP 261001** - checked and empty, a coding gap at this field.

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **JMONY2** | RNAV | CYBIL SHARE | ALL |
| **LEDDL1** | RNAV | GLAZR LAFOX YOCKY | ALL |
| **MBELL5** | RNAV | BUMPY IMOUT MOOCH PENBE | ALL |

#### KJVY JMONY2

- **CYBIL:** CYBIL | AGILE | KNGFU | SHARE | SUUPR <=FL230 | GDAYE >=FL200
- **SHARE:** SHARE | SUUPR <=FL230 | GDAYE >=FL200
- **(common):** GDAYE >=FL200 | LISZA 14 - 17 /280 | JMONY 13 - 15 | RCTIC 11 - 13 | CHKIN 9 - 11 | LEGGZ 7 - 9 | MYDOG 6 | [FM from MYDOG - not a fix]

#### KJVY LEDDL1

- **GLAZR:** GLAZR | DNUTS | ARUSH | COBBZ 14 - 16 /280
- **LAFOX:** LAFOX | KOFEY | ARUSH | COBBZ 14 - 16 /280
- **YOCKY:** YOCKY | ARUSH | COBBZ 14 - 16 /280
- **(common):** COBBZ 14 - 16 /280 | LEDDL 11 - 13 | SODAA 9 - 11 | LUEEY 7 - 9 | PNNIC 5 | [FM from PNNIC - not a fix]

#### KJVY MBELL5

- **BUMPY:** BUMPY | PENBE | XXTRA | JIINN 14 - 16 /280
- **IMOUT:** IMOUT | VENMO | XXTRA | JIINN 14 - 16 /280
- **MOOCH:** MOOCH | PENBE | XXTRA | JIINN 14 - 16 /280
- **PENBE:** PENBE | XXTRA | JIINN 14 - 16 /280
- **(common):** JIINN 14 - 16 /280 | MBELL 13 - 15 | AABBZ 11 - 13 | BLEEM 9 - 11 | DOWNS 7 - 9 | SIPPN 5 | [FM from SIPPN - not a fix]

## Approaches coded, by field

Identifiers as CIFP codes them: the first letter is the type (I ILS, L localizer, R RNAV (GPS), H RNAV (RNP), V VOR, S VOR/DME, N NDB, X LDA, B localizer back course), then the runway, then a suffix for variants. Names only - approach ladders are not carried.

- **KSDF** (19): H17LZ H17RZ H29-Z H35LZ H35RZ I17L I17R I35L I35R L17L L17R L29 L35L L35R R17LY R17RY R29-Y R35LY R35RY
- **KLOU** (2): R24 R33
- **KFTK** (0): none coded
- **KJVY** (4): I18 L18 R18 R36
- **KBFR** (2): R13 R31
- **KSER** (4): R05 R14 R23 R32
- **KIMS** (3): R03-Y R03-Z R21
- **KBRY** (2): R03 R21
- **KEKX** (4): I05 L05 R05 R23
- **KFRH** (2): R08 R26
- **6I2** (2): R11 R29
- **I93** (2): R10 R28

## Fixes

Coordinates in decimal degrees as decoded from the CIFP waypoint and navaid records (`EA` en route, `PC` terminal, `D` navaid). A waypoint can move between cycles under the same name, so look a fix up in the cycle you are building from.

| fix | lat | lon |
| --- | --- | --- |
| AABBZ | 37.87350 | -86.30871 |
| AGILE | 40.05000 | -87.85000 |
| ANCHR | 38.73559 | -85.03615 |
| APALO | 38.00572 | -86.85980 |
| ARUSH | 37.45016 | -84.93469 |
| AUDRY | 38.17062 | -86.09142 |
| BAALK | 38.25880 | -85.75579 |
| BATSS | 38.19865 | -85.44563 |
| BECOO | 37.97234 | -85.55120 |
| BEEBY | 38.53618 | -85.58719 |
| BEEKK | 38.21584 | -86.02923 |
| BETTN | 38.10543 | -85.21070 |
| BILET | 36.30879 | -85.10243 |
| BLEEM | 37.98682 | -86.27297 |
| BNGIN | 39.10349 | -86.03024 |
| BODYE | 38.51792 | -86.01762 |
| BRBON | 37.83609 | -85.63343 |
| BUDDR | 38.33344 | -85.72516 |
| BUHBA | 38.28291 | -85.89852 |
| BUMPY | 36.54272 | -89.13531 |
| CANBE | 38.32053 | -85.98924 |
| CHALI | 37.91638 | -85.05015 |
| CHKIN | 38.56214 | -86.31247 |
| CLLWY | 38.51327 | -86.32048 |
| CNTRY | 36.87332 | -85.21506 |
| COBBZ | 37.57725 | -85.07092 |
| CPIKE | 38.33131 | -85.77143 |
| CWAYN | 38.46343 | -85.84133 |
| CYBIL | 40.31667 | -87.86444 |
| DAAVE | 38.41563 | -89.05311 |
| DEEPR | 37.94425 | -85.76179 |
| DHARD | 38.19185 | -86.04014 |
| DLAMP | 38.56746 | -85.14208 |
| DNUTS | 36.89781 | -84.75179 |
| DOWNS | 38.05384 | -86.25158 |
| DROPA | 38.08400 | -85.69611 |
| DUNNZ | 38.06444 | -85.78779 |
| DURBY | 38.53113 | -86.16538 |
| EAZIE | 38.02851 | -85.73358 |
| EEGGO | 38.39627 | -86.03127 |
| EEVAA | 37.95669 | -85.28962 |
| ERLWN | 38.21212 | -85.96465 |
| FARNK | 38.00969 | -85.53875 |
| FEEBE | 37.99711 | -85.59148 |
| FLEYE | 38.30766 | -85.64459 |
| GADSN | 38.18399 | -85.83051 |
| GDAYE | 38.98737 | -86.86126 |
| GLAZR | 36.42244 | -84.78036 |
| GLENM | 38.09144 | -86.20012 |
| GNZOH | 38.06090 | -86.12464 |
| GTGON | 38.02624 | -86.58105 |
| GUMMI | 38.13999 | -86.74957 |
| HHANA | 38.42028 | -85.69732 |
| HIDEY | 37.43473 | -86.31269 |
| HLLYY | 37.94666 | -85.63806 |
| HNNAN | 38.56472 | -86.12506 |
| HOOLA | 38.45877 | -86.03850 |
| IMOUT | 38.30017 | -89.04589 |
| IZREL | 38.16763 | -85.94573 |
| JADDR | 37.92613 | -85.54670 |
| JBOND | 38.21951 | -85.19400 |
| JIBKA | 39.50248 | -87.27409 |
| JIINN | 37.72707 | -86.53972 |
| JMONY | 38.56870 | -86.60936 |
| JYTEE | 38.26750 | -86.15422 |
| KELSS | 38.06785 | -85.58520 |
| KFONG | 38.47186 | -85.22746 |
| KJVY | 38.36662 | -85.73814 |
| KLOU | 38.22799 | -85.66375 |
| KNGFU | 39.71667 | -87.71667 |
| KOBEZ | 38.23833 | -85.58278 |
| KOFEY | 37.31671 | -84.75655 |
| KSDF | 38.17409 | -85.73649 |
| KYANG | 38.39321 | -85.90086 |
| KYLAW | 37.77305 | -85.55534 |
| KYSEN | 37.71646 | -85.75832 |
| LAFOX | 37.08998 | -84.18631 |
| LEDDL | 37.73271 | -85.13088 |
| LEGGZ | 38.56714 | -86.16386 |
| LEWSS | 38.02484 | -85.78906 |
| LEXXI | 38.46499 | -85.82659 |
| LISZA | 38.72366 | -86.70259 |
| LIYAH | 37.73865 | -86.05110 |
| LLIZY | 38.15323 | -86.51841 |
| LOKBL | 37.74879 | -86.19764 |
| LOKRD | 37.56056 | -85.33250 |
| LOUFC | 38.28388 | -85.70468 |
| LUEEY | 37.95759 | -85.21167 |
| LURVL | 38.02076 | -85.61428 |
| LUUKE | 38.17892 | -85.90061 |
| MAYLN | 37.96751 | -85.40087 |
| MBELL | 37.76012 | -86.34406 |
| MDJAE | 38.02426 | -85.69994 |
| MEEKO | 37.84009 | -85.61401 |
| MEENY | 38.54414 | -86.31314 |
| MERJS | 37.70799 | -85.62996 |
| MIAHH | 38.52511 | -85.73515 |
| MIDDZ | 38.38269 | -85.60685 |
| MIILI | 38.49261 | -86.49573 |
| MKENZ | 38.28070 | -85.39781 |
| MMACE | 38.41814 | -86.38171 |
| MMAXY | 38.50621 | -85.87865 |
| MMRTN | 38.33550 | -85.17680 |
| MOOCH | 37.02667 | -89.91924 |
| MOWGN | 37.71475 | -85.73615 |
| MRSHY | 38.37619 | -85.31262 |
| MSTRA | 38.06500 | -86.05361 |
| MTERO | 38.45162 | -85.15966 |
| MURCA | 38.11229 | -85.49423 |
| MYCUL | 38.35502 | -85.67602 |
| MYDOG | 38.57196 | -86.01523 |
| NEIBR | 38.55752 | -85.29003 |
| NNALA | 38.15238 | -85.49629 |
| OHHGE | 38.51913 | -85.82218 |
| OLDIZ | 37.75345 | -85.42389 |
| ONMEE | 38.07466 | -85.90404 |
| PDUDL | 38.36023 | -85.91974 |
| PEANT | 38.07356 | -85.90462 |
| PENBE | 37.65431 | -88.15873 |
| PNNIC | 38.14617 | -85.32173 |
| PPATI | 37.74628 | -85.27697 |
| PRKER | 37.72764 | -85.90469 |
| PURPL | 38.18503 | -85.48291 |
| RAACH | 38.23754 | -85.57444 |
| RAMRD | 36.92890 | -86.44349 |
| RCTIC | 38.55694 | -86.46106 |
| RDHSE | 38.83343 | -86.44524 |
| REECE | 38.05743 | -85.82821 |
| RINTE | 40.28781 | -84.04292 |
| RLENA | 38.34305 | -86.26769 |
| RNNER | 37.75493 | -85.64309 |
| ROARY | 37.99587 | -85.58213 |
| RODAH | 38.04359 | -85.31154 |
| RRROE | 38.28704 | -85.81588 |
| SHARE | 39.49215 | -87.50859 |
| SHIPR | 37.96664 | -84.47458 |
| SHIRT | 39.63298 | -83.57115 |
| SHLEY | 37.76770 | -85.65618 |
| SHNIK | 38.33229 | -85.78091 |
| SIPPN | 38.18444 | -86.17388 |
| SIXMI | 38.30948 | -85.65678 |
| SLATY | 38.29356 | -85.79281 |
| SNDLS | 38.05985 | -85.35332 |
| SODAA | 37.84505 | -85.17116 |
| SPILR | 38.77430 | -86.09983 |
| SPOKY | 38.54689 | -85.43804 |
| STEFD | 37.90649 | -86.11921 |
| STVNZ | 38.21533 | -85.51199 |
| SUUPR | 39.04662 | -86.93652 |
| TERGE | 37.92846 | -87.76228 |
| TROLI | 38.30735 | -85.90299 |
| TRUBS | 38.10299 | -85.50471 |
| UKATS | 40.13458 | -82.62006 |
| VENMO | 38.22955 | -88.27906 |
| WILAA | 38.54119 | -86.46460 |
| WININ | 38.05733 | -85.73319 |
| WWEVR | 38.48554 | -86.17612 |
| WWODY | 37.96360 | -85.68960 |
| XXTRA | 37.84744 | -87.49748 |
| YOCKY | 37.65411 | -84.15624 |
| ZIDHI | 39.07754 | -84.81873 |
