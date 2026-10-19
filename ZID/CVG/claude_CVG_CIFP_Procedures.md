# SID, STAR and approach data from CIFP - CVG

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

- **KCVG: 9 SIDs and 5 STARs coded.** SIDs BNGLE5, CHCLL6, GIPLE7, HAGOL5, JBNCH6, KENLN6, LOVEY8, ROCKT4, SILKS6; STARs CEGRM8, GAVNN8, JAKIE7, SARGO5, TIGRR4. All RNAV.
- **The SOP's CVG# conventional departure is coded at no field.** The SOP assigns it to props and to jets without an RNAV SID and adds it to the route string. A zero is a coding gap, not proof there is no such departure.
- **CIFP agrees with the first fix on every runway in the SOP's heading table (SOP 6):** KINNG off 9, BONLE off 27, LASNG off 18L, FLOEE off 18C, FANSA off 18R, CIGMA / HOBAL / RORFE off 36L and 36C, HAGSS off 36R. WADAL, named in SOP 7, is on the ROCKT4 runway transitions.
- **KLUK: 5 STARs coded** (CEGRM8, GAVNN8, HEDEE1, JAKIE7, SARGO5 - the first, second, fourth and fifth are the KCVG procedures with Lunken's own coding) **and no SID.** HEDEE1 is coded at Lunken, Hamilton and Clermont Co only, not at KCVG; the SOP names `HEDEE#` as a satellite arrival from CMH.
- **KHAO and I69 carry the same five STARs as Lunken** (no SID). **Fields with a runway record and no coded procedure:** KOXD, KHLB, I67, K62 (approaches only, or none).

## KCVG

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **BNGLE5** | RNAV | RIKLE WWSHR | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **CHCLL6** | RNAV | BUSYY RAMRD SKAMR | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **GIPLE7** | RNAV | HVQ JODUB SITTR | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **HAGOL5** | RNAV | PLASH RINTE | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **JBNCH6** | RNAV | BARKS SNKPT | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **KENLN6** | RNAV | SHIPR | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **LOVEY8** | RNAV | CADIZ HELIS MACES | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **ROCKT4** | RNAV | AHTIY ARRAY | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |
| **SILKS6** | RNAV | TRFWA | RW09 RW18C RW18L RW18R RW27 RW36C RW36L RW36R |

#### KCVG BNGLE5

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | LUBYI | BNGLE
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | MIPIE | HERMM | AMMOT | BNGLE
- **RW18L:** [VI leg - not a fix] | LASNG | CODKO | JBETH | FOPAS | LUBYI | BNGLE
- **RW18R:** [VI leg - not a fix] | FANSA | MIPIE | HERMM | AMMOT | BNGLE
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | MACOD | BNGLE
- **RW36C:** [VI leg - not a fix] | CIGMA | DJOHN | BNGLE
- **RW36L:** [VI leg - not a fix] | CIGMA | DJOHN | BNGLE
- **RW36R:** HAGSS | BNGLE
- **RIKLE:** BNGLE | RIKLE
- **WWSHR:** BNGLE | RIKLE | WWSHR

#### KCVG CHCLL6

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | ORRON | CHCLL
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | FEBLU | CHCLL
- **RW18L:** [VI leg - not a fix] | LASNG | ZEGUL | CHCLL
- **RW18R:** [VI leg - not a fix] | FANSA | CHCLL
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | REKUE | CHCLL
- **RW36C:** [VI leg - not a fix] | HOBAL | BOUMR | CULED | CHCLL
- **RW36L:** [VI leg - not a fix] | HOBAL | BOUMR | CULED | CHCLL
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | EVAME | CEMLA | FRTZY | CULED | CHCLL
- **BUSYY:** CHCLL | BUSYY
- **RAMRD:** CHCLL | BUSYY | SKAMR | RAMRD
- **SKAMR:** CHCLL | BUSYY | SKAMR

#### KCVG GIPLE7

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | GIPLE
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | CODKO | GIPLE
- **RW18L:** [VI leg - not a fix] | LASNG | CODKO | GIPLE
- **RW18R:** [VI leg - not a fix] | FANSA | HIPAS | GIPLE
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | REKUE | WIMDI | GIPLE
- **RW36C:** [VI leg - not a fix] | RORFE | SUVBE | HOMIX | GIPLE
- **RW36L:** [VI leg - not a fix] | RORFE | SUVBE | HOMIX | GIPLE
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | HOMIX | GIPLE
- **HVQ:** GIPLE | HOBNO | RHOMM | JODUB | HVQ
- **JODUB:** GIPLE | HOBNO | RHOMM | JODUB
- **SITTR:** GIPLE | HOBNO | RHOMM | JODUB | SITTR

#### KCVG HAGOL5

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | HYANS | HAGOL
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | MIPIE | HERMM | AMMOT | HAGOL
- **RW18L:** [VI leg - not a fix] | LASNG | CODKO | JBETH | FOPAS | HYANS | HAGOL
- **RW18R:** [VI leg - not a fix] | FANSA | MIPIE | HERMM | AMMOT | HAGOL
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | MACOD | HAGOL
- **RW36C:** [VI leg - not a fix] | CIGMA | DJOHN | HAGOL
- **RW36L:** [VI leg - not a fix] | CIGMA | DJOHN | HAGOL
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | HAGOL
- **PLASH:** HAGOL | PLASH
- **RINTE:** HAGOL | PLASH | RINTE

#### KCVG JBNCH6

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | HYANS | JBNCH
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | MIPIE | HERMM | JBNCH
- **RW18L:** [VI leg - not a fix] | LASNG | FEBLU | GUMRE | HERMM | JBNCH
- **RW18R:** [VI leg - not a fix] | FANSA | MIPIE | HERMM | JBNCH
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | JBNCH
- **RW36C:** [VI leg - not a fix] | CIGMA | JBNCH
- **RW36L:** [VI leg - not a fix] | CIGMA | JBNCH
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | JBNCH
- **BARKS:** JBNCH | SNKPT | BARKS
- **SNKPT:** JBNCH | SNKPT

#### KCVG KENLN6

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | KADDI | KENLN
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | FEBLU | KENLN
- **RW18L:** [VI leg - not a fix] | LASNG | ZEGUL | HUNRU | KENLN
- **RW18R:** [VI leg - not a fix] | FANSA | KENLN
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | REKUE | KENLN
- **RW36C:** [VI leg - not a fix] | HOBAL | BOUMR | CULED | KENLN
- **RW36L:** [VI leg - not a fix] | HOBAL | BOUMR | CULED | KENLN
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | HOMIX | FOPAS | KADDI | KENLN
- **SHIPR:** KENLN | SHIPR

#### KCVG LOVEY8

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | LWREY | MATUP | RESAY >=5 | SUNFR | MUMIE
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | MIPIE | MUMIE
- **RW18L:** [VI leg - not a fix] | LASNG | FEBLU | GUMRE | MUMIE
- **RW18R:** [VI leg - not a fix] | FANSA | MIPIE | MUMIE
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | NUZUM | MUMIE
- **RW36C:** [VI leg - not a fix] | HOBAL | SUNFR | MUMIE
- **RW36L:** [VI leg - not a fix] | HOBAL | SUNFR | MUMIE
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | EVAME | CEMLA | SUNFR | MUMIE
- **(common):** MUMIE | LOVEY
- **CADIZ:** LOVEY | ZABAL | MACES | BOLRR | CADIZ
- **HELIS:** LOVEY | ZABAL | HISNA | HELIS
- **MACES:** LOVEY | ZABAL | MACES

#### KCVG ROCKT4

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | CERPO | WADAL
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | CODKO | SLUBY | MOIER | WADAL
- **RW18L:** [VI leg - not a fix] | LASNG | CODKO | SLUBY | MOIER | WADAL
- **RW18R:** [VI leg - not a fix] | FANSA | HIPAS | JABDU | SLUBY | MOIER | WADAL
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | DBEAR | JLINC | WADAL
- **RW36C:** [VI leg - not a fix] | RORFE | SUVBE | HOMIX | CERPO | WADAL
- **RW36L:** [VI leg - not a fix] | RORFE | SUVBE | HOMIX | CERPO | WADAL
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | HOMIX | CERPO | WADAL
- **(common):** WADAL | FARUM | CIVLO | ROCKT
- **AHTIY:** ROCKT | CADRE | AHTIY
- **ARRAY:** ROCKT | ARRAY

#### KCVG SILKS6

- **RW09:** [VA leg - not a fix] >=1400 | KINNG | ORRON | SILKS
- **RW18C:** [VA leg - not a fix] >=1400 | FLOEE | FEBLU | SILKS
- **RW18L:** [VI leg - not a fix] | LASNG | ZEGUL | SILKS
- **RW18R:** [VI leg - not a fix] | FANSA | SILKS
- **RW27:** [VA leg - not a fix] >=1400 | BONLE | REKUE | SILKS
- **RW36C:** [VI leg - not a fix] | HOBAL | BOUMR | CULED | SILKS
- **RW36L:** [VI leg - not a fix] | HOBAL | BOUMR | CULED | SILKS
- **RW36R:** [VA leg - not a fix] >=1400 | HAGSS | EVAME | CEMLA | FRTZY | CULED | SILKS
- **TRFWA:** SILKS | TRFWA

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CEGRM8** | RNAV | DELHI ELANR ZABNU | RW09 RW18B RW27 RW36B |
| **GAVNN8** | RNAV | COLNS FAIIR | RW09 RW18B RW27 RW36B |
| **JAKIE7** | RNAV | ARTUR CUBIM DOLLI VXV | RW09 RW18C RW18L RW18R RW27 RW36B |
| **SARGO5** | RNAV | DAAVE JRICO TERGE | RW09 RW18B RW27 RW36B |
| **TIGRR4** | RNAV | SAVVI UKATS | RW09 RW18B RW27 RW36B |

#### KCVG CEGRM8

- **DELHI:** DELHI | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ELANR:** ELANR | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ZABNU:** ZABNU | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **(common):** CEGRM 11 - FL190 | BCATT | EGONE
- **RW09:** EGONE | ACHOO 7 /210 | [VM from KCVG - not a fix]
- **RW18B:** EGONE | BYRAN 7 | [FM from BYRAN - not a fix]
- **RW27:** EGONE | FRING 8 - 10 /210 | BAMGE | COGDU | ZALED 6 /210 | [FM from ZALED - not a fix]
- **RW36B:** EGONE | FRING 8 - 10 /210 | BAMGE | BBURG | BRCAT 6 /210 | [FM from BRCAT - not a fix]

#### KCVG GAVNN8

- **COLNS:** COLNS | STEVY | FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **FAIIR:** FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **(common):** GAVNN 12 - 17 | KNEDY | UDEYS >=9
- **RW09:** UDEYS >=9 | JOTAR 9 - 12 /250 | KEYTO >=8 /210 | AAJAY | MAPUC | FLOTT 6 /210 | [FM from FLOTT - not a fix]
- **RW18B:** UDEYS >=9 | JOTAR 9 - 12 /250 | KEYTO >=8 /210 | AAJAY | IGOCO | NXHAL 6 /210 | [FM from NXHAL - not a fix]
- **RW27:** UDEYS >=9 | BREWZ 7 | [VM from KCVG - not a fix]
- **RW36B:** UDEYS >=9 | DAWGY 8 | [FM from DAWGY - not a fix]

#### KCVG JAKIE7

- **ARTUR:** ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **CUBIM:** CUBIM | MELNZ | OYAYO | HRMBE 16 - FL210 | JAKIE >=12
- **DOLLI:** DOLLI | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **VXV:** VXV | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **(common):** JAKIE >=12 | NAVPE >=10 | OPAVE 8 - 12
- **RW09:** OPAVE 8 - 12 | REENY >=8 /210 | AAJAY | MAPUC | FLOTT 6 /210 | [FM from FLOTT - not a fix]
- **RW18C:** OPAVE 8 - 12 | FIDEK >=8 /210 | UBEDE | LEWIN 6 /210 | [FM from LEWIN - not a fix]
- **RW18L:** OPAVE 8 - 12 | REENY >=8 /210 | AAJAY | IGOCO | NXHAL 6 /210 | [FM from NXHAL - not a fix]
- **RW18R:** OPAVE 8 - 12 | FIDEK >=8 /210 | UBEDE | LEWIN 6 /210 | [FM from LEWIN - not a fix]
- **RW27:** OPAVE 8 - 12 | PIVBE 8 | [FM from PIVBE - not a fix]
- **RW36B:** OPAVE 8 - 12 | SPOOD 8 | [FM from SPOOD - not a fix]

#### KCVG SARGO5

- **DAAVE:** DAAVE | JDUNN | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **JRICO:** JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **TERGE:** TERGE | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **(common):** SARGO >=14 | VANGE
- **RW09:** VANGE | CALFS 8 /210 | [VM from KCVG - not a fix]
- **RW18B:** VANGE | YEBUL <=13 | EYURA <=12 | AZONS >=8 /210 | FIDEK | UBEDE | LEWIN 6 /210 | [FM from LEWIN - not a fix]
- **RW27:** VANGE | YEBUL <=13 | EYURA <=12 | AZONS >=8 /210 | FIDEK | CADPO | FIBSU 6 /210 | [FM from FIBSU - not a fix]
- **RW36B:** VANGE | WAXIL <=13 | FECTA 7 | [FM from FECTA - not a fix]

#### KCVG TIGRR4

- **SAVVI:** SAVVI | UKATS | BOWRR >=FL240 | ORLEE <=FL230 | HEDEE | JARSO | TIGRR >=14
- **UKATS:** UKATS | BOWRR >=FL240 | ORLEE <=FL230 | HEDEE | JARSO | TIGRR >=14
- **(common):** TIGRR >=14 | CHARZ | ETROY 9 - 11
- **RW09:** ETROY 9 - 11 | BACAS 8 - 10 /210 | GUUTH | IDULE 6 | [FM from IDULE - not a fix]
- **RW18B:** ETROY 9 - 11 | CRSLY 8 | [FM from CRSLY - not a fix]
- **RW27:** ETROY 9 - 11 | YEYUP 8 | [FM from YEYUP - not a fix]
- **RW36B:** ETROY 9 - 11 | BACAS 8 - 10 /210 | JANEG | RUPPP 6 | [FM from RUPPP - not a fix]

## KLUK

**SIDs: none coded at KLUK in CIFP 261001** - checked and empty, a coding gap at this field.

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CEGRM8** | RNAV | DELHI ELANR ZABNU | ALL |
| **GAVNN8** | RNAV | COLNS FAIIR | ALL |
| **HEDEE1** | RNAV | SAVVI | ALL |
| **JAKIE7** | RNAV | ARTUR CUBIM DOLLI VXV | ALL |
| **SARGO5** | RNAV | DAAVE JRICO TERGE | ALL |

#### KLUK CEGRM8

- **DELHI:** DELHI | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ELANR:** ELANR | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ZABNU:** ZABNU | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **(common):** CEGRM 11 - FL190 | BCATT | CHRLL 11 | [FM from CHRLL - not a fix]

#### KLUK GAVNN8

- **COLNS:** COLNS | STEVY | FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **FAIIR:** FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **(common):** GAVNN 12 - 17 | KNEDY | PAPAH 10 | [FM from PAPAH - not a fix]

#### KLUK HEDEE1

- **SAVVI:** SAVVI | UKATS >=12 | BOWRR | ORLEE >=11 | HEDEE
- **(common):** HEDEE | KEFKA 10 | [FM from KEFKA - not a fix]

#### KLUK JAKIE7

- **ARTUR:** ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **CUBIM:** CUBIM | MELNZ | OYAYO | HRMBE 16 - FL210 | JAKIE >=12
- **DOLLI:** DOLLI | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **VXV:** VXV | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **(common):** JAKIE >=12 | TUCKK 11 | [FM from TUCKK - not a fix]

#### KLUK SARGO5

- **DAAVE:** DAAVE | JDUNN | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **JRICO:** JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **TERGE:** TERGE | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **(common):** SARGO >=14 | YUMMM 13 | [FM from YUMMM - not a fix]

## KHAO

**SIDs: none coded at KHAO in CIFP 261001** - checked and empty, a coding gap at this field.

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CEGRM8** | RNAV | DELHI ELANR ZABNU | ALL |
| **GAVNN8** | RNAV | COLNS FAIIR | ALL |
| **HEDEE1** | RNAV | SAVVI | ALL |
| **JAKIE7** | RNAV | ARTUR CUBIM DOLLI VXV | ALL |
| **SARGO5** | RNAV | DAAVE JRICO TERGE | ALL |

#### KHAO CEGRM8

- **DELHI:** DELHI | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ELANR:** ELANR | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ZABNU:** ZABNU | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **(common):** CEGRM 11 - FL190 | BCATT | CHRLL 11 | [FM from CHRLL - not a fix]

#### KHAO GAVNN8

- **COLNS:** COLNS | STEVY | FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **FAIIR:** FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **(common):** GAVNN 12 - 17 | KNEDY | PAPAH 10 | [FM from PAPAH - not a fix]

#### KHAO HEDEE1

- **SAVVI:** SAVVI | UKATS >=12 | BOWRR | ORLEE >=11 | HEDEE
- **(common):** HEDEE | KEFKA 10 | [FM from KEFKA - not a fix]

#### KHAO JAKIE7

- **ARTUR:** ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **CUBIM:** CUBIM | MELNZ | OYAYO | HRMBE 16 - FL210 | JAKIE >=12
- **DOLLI:** DOLLI | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **VXV:** VXV | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **(common):** JAKIE >=12 | TUCKK 11 | [FM from TUCKK - not a fix]

#### KHAO SARGO5

- **DAAVE:** DAAVE | JDUNN | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **JRICO:** JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **TERGE:** TERGE | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **(common):** SARGO >=14 | YUMMM 13 | [FM from YUMMM - not a fix]

## I69

**SIDs: none coded at I69 in CIFP 261001** - checked and empty, a coding gap at this field.

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CEGRM8** | RNAV | DELHI ELANR ZABNU | ALL |
| **GAVNN8** | RNAV | COLNS FAIIR | ALL |
| **HEDEE1** | RNAV | SAVVI | ALL |
| **JAKIE7** | RNAV | ARTUR CUBIM DOLLI VXV | ALL |
| **SARGO5** | RNAV | DAAVE JRICO TERGE | ALL |

#### I69 CEGRM8

- **DELHI:** DELHI | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ELANR:** ELANR | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **ZABNU:** ZABNU | CADIZ | FATOX | BOLRR | TORIO | MACES FL230 | CRYME | ARIVR >=14 | CEGRM 11 - FL190
- **(common):** CEGRM 11 - FL190 | BCATT | CHRLL 11 | [FM from CHRLL - not a fix]

#### I69 GAVNN8

- **COLNS:** COLNS | STEVY | FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **FAIIR:** FAIIR | JBIZZ >=FL240 | BRROW | ICKEY | GAVNN 12 - 17
- **(common):** GAVNN 12 - 17 | KNEDY | PAPAH 10 | [FM from PAPAH - not a fix]

#### I69 HEDEE1

- **SAVVI:** SAVVI | UKATS >=12 | BOWRR | ORLEE >=11 | HEDEE
- **(common):** HEDEE | KEFKA 10 | [FM from KEFKA - not a fix]

#### I69 JAKIE7

- **ARTUR:** ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **CUBIM:** CUBIM | MELNZ | OYAYO | HRMBE 16 - FL210 | JAKIE >=12
- **DOLLI:** DOLLI | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **VXV:** VXV | ARTUR | CHEDA | TRANQ | HRMBE 16 - FL210 | JAKIE >=12
- **(common):** JAKIE >=12 | TUCKK 11 | [FM from TUCKK - not a fix]

#### I69 SARGO5

- **DAAVE:** DAAVE | JDUNN | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **JRICO:** JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **TERGE:** TERGE | JRICO FL230 | DADDI FL210 - FL220 | FREZE 15 - FL190 | SARGO >=14
- **(common):** SARGO >=14 | YUMMM 13 | [FM from YUMMM - not a fix]

## Approaches coded, by field

Identifiers as CIFP codes them: the first letter is the type (I ILS, L localizer, R RNAV (GPS), H RNAV (RNP), V VOR, S VOR/DME, N NDB, X LDA, B localizer back course), then the runway, then a suffix for variants. Names only - approach ladders are not carried.

- **KCVG** (32): H09-Z H18CZ H18LZ H18RZ H27-Z H36CZ H36LZ H36RZ I09 I18C I18L I18R I27 I36C I36L I36R L09 L18C L18L L18R L27 L36C L36L L36R R09-Y R18CY R18LY R18RY R27-Y R36CY R36LY R36RY
- **KLUK** (5): I21 L21 R03 R21 R25
- **KHAO** (4): I30 L30 R12 R30
- **KOXD** (2): R05 R23
- **KHLB** (0): none coded
- **I67** (1): R19
- **I69** (2): R04 R22
- **K62** (2): R21 VOR-A

## Fixes

Coordinates in decimal degrees as decoded from the CIFP waypoint and navaid records (`EA` en route, `PC` terminal, `D` navaid). A waypoint can move between cycles under the same name, so look a fix up in the cycle you are building from.

| fix | lat | lon |
| --- | --- | --- |
| AAJAY | 38.93266 | -84.54041 |
| ACHOO | 39.18881 | -85.07216 |
| AHTIY | 39.91440 | -80.38479 |
| AMMOT | 39.19719 | -84.87389 |
| ARIVR | 39.61226 | -85.78456 |
| ARRAY | 39.81550 | -82.69042 |
| ARTUR | 36.53287 | -83.78536 |
| AZONS | 38.94157 | -84.84970 |
| BACAS | 39.16416 | -84.53957 |
| BAMGE | 39.13513 | -84.79081 |
| BARKS | 40.54613 | -85.51944 |
| BBURG | 39.07490 | -84.79319 |
| BCATT | 39.46988 | -85.39735 |
| BNGLE | 39.55031 | -84.40896 |
| BOLRR | 40.55612 | -87.06932 |
| BONLE | 39.04599 | -84.85988 |
| BOUMR | 39.10491 | -84.87053 |
| BOWRR | 39.96611 | -83.03236 |
| BRCAT | 39.03091 | -84.79485 |
| BREWZ | 38.87134 | -84.29174 |
| BRROW | 38.45555 | -82.90904 |
| BUSYY | 38.08567 | -85.43518 |
| BYRAN | 39.32229 | -84.91932 |
| CADIZ | 41.16777 | -87.38771 |
| CADPO | 38.95969 | -84.71050 |
| CADRE | 39.71591 | -81.40998 |
| CALFS | 38.90453 | -85.10106 |
| CEGRM | 39.51817 | -85.48501 |
| CEMLA | 39.22192 | -84.81681 |
| CERPO | 39.10694 | -84.26389 |
| CHARZ | 39.39281 | -84.18754 |
| CHCLL | 38.48047 | -84.97849 |
| CHEDA | 37.32989 | -83.64392 |
| CHRLL | 39.43176 | -85.32655 |
| CIGMA | 39.14500 | -84.73023 |
| CIVLO | 39.49681 | -83.16078 |
| CODKO | 38.93471 | -84.49983 |
| COGDU | 39.13291 | -84.68784 |
| COLNS | 38.84041 | -79.19684 |
| CRSLY | 39.33096 | -84.42432 |
| CRYME | 39.81406 | -86.36555 |
| CUBIM | 36.87704 | -83.00583 |
| CULED | 38.88188 | -84.87167 |
| DAAVE | 38.41563 | -89.05311 |
| DADDI | 38.34891 | -86.20343 |
| DAWGY | 38.72300 | -84.40680 |
| DBEAR | 39.28415 | -84.89423 |
| DELHI | 41.93333 | -87.78611 |
| DJOHN | 39.20208 | -84.71544 |
| DOLLI | 36.21208 | -83.89947 |
| EGONE | 39.40208 | -85.27464 |
| ELANR | 41.20167 | -87.53333 |
| ETROY | 39.35592 | -84.24458 |
| EVAME | 39.22304 | -84.72782 |
| EYURA | 38.85654 | -85.10033 |
| FAIIR | 38.79294 | -81.01192 |
| FANSA | 38.95421 | -84.71256 |
| FARUM | 39.33222 | -83.59917 |
| FATOX | 40.80121 | -87.19596 |
| FEBLU | 38.89770 | -84.68473 |
| FECTA | 38.79502 | -84.98530 |
| FIBSU | 38.95950 | -84.62503 |
| FIDEK | 38.96143 | -84.79130 |
| FLOEE | 38.95670 | -84.66906 |
| FLOTT | 38.95968 | -84.73333 |
| FOPAS | 39.08450 | -84.41253 |
| FREZE | 38.57201 | -85.68957 |
| FRING | 39.16394 | -84.84336 |
| FRTZY | 39.10208 | -84.91989 |
| GAVNN | 38.61471 | -83.92534 |
| GIPLE | 38.87799 | -84.04716 |
| GUMRE | 38.89829 | -84.76778 |
| GUUTH | 39.13223 | -84.62501 |
| HAGOL | 39.56931 | -84.59355 |
| HAGSS | 39.15677 | -84.64663 |
| HEDEE | 39.63758 | -83.80562 |
| HELIS | 39.74470 | -88.87245 |
| HERMM | 38.97914 | -84.88062 |
| HIPAS | 38.88053 | -84.66190 |
| HISNA | 39.58446 | -87.34823 |
| HOBAL | 39.16883 | -84.75717 |
| HOBNO | 38.81239 | -83.74206 |
| HOMIX | 39.16230 | -84.45996 |
| HRMBE | 38.12748 | -83.93404 |
| HUNRU | 38.72921 | -84.59659 |
| HVQ | 38.34967 | -81.76991 |
| HYANS | 39.25071 | -84.47491 |
| I69 | 39.07840 | -84.21021 |
| ICKEY | 38.54242 | -83.46031 |
| IDULE | 39.13255 | -84.73210 |
| IGOCO | 38.99604 | -84.53475 |
| JABDU | 38.88020 | -84.56713 |
| JAKIE | 38.43199 | -84.15304 |
| JANEG | 39.05464 | -84.53457 |
| JARSO | 39.59174 | -83.91168 |
| JBETH | 38.99861 | -84.43817 |
| JBIZZ | 38.59002 | -82.17554 |
| JBNCH | 39.58135 | -85.02259 |
| JDUNN | 38.36780 | -88.27111 |
| JLINC | 39.34573 | -84.79486 |
| JODUB | 38.76251 | -82.89095 |
| JOTAR | 38.78689 | -84.25661 |
| JRICO | 38.25933 | -86.70838 |
| KADDI | 38.88205 | -84.43852 |
| KCVG | 39.04884 | -84.66782 |
| KEFKA | 39.34976 | -83.91959 |
| KENLN | 38.45750 | -84.50778 |
| KEYTO | 38.90523 | -84.48682 |
| KHAO | 39.36375 | -84.52194 |
| KINNG | 39.04574 | -84.48504 |
| KLUK | 39.10298 | -84.41761 |
| KNEDY | 38.66094 | -84.01350 |
| LASNG | 38.95699 | -84.62890 |
| LEWIN | 39.09552 | -84.79534 |
| LOVEY | 39.21355 | -85.40862 |
| LUBYI | 39.26604 | -84.41244 |
| LWREY | 39.19973 | -84.47165 |
| MACES | 40.00368 | -86.72295 |
| MACOD | 39.29680 | -84.89623 |
| MAPUC | 38.95947 | -84.64786 |
| MATUP | 39.22479 | -84.60881 |
| MELNZ | 37.52206 | -83.36589 |
| MIPIE | 38.93350 | -84.81356 |
| MOIER | 39.11085 | -84.09144 |
| MUMIE | 39.07189 | -85.03126 |
| NAVPE | 38.55153 | -84.23966 |
| NUZUM | 39.04666 | -84.94905 |
| NXHAL | 39.04609 | -84.53451 |
| OPAVE | 38.64919 | -84.31061 |
| ORLEE | 39.80167 | -83.42175 |
| ORRON | 38.89559 | -84.48515 |
| OYAYO | 37.87945 | -83.56540 |
| PAPAH | 38.68481 | -84.06007 |
| PIVBE | 38.83525 | -84.34209 |
| PLASH | 40.01646 | -84.39708 |
| RAMRD | 36.92890 | -86.44349 |
| REENY | 38.89043 | -84.50603 |
| REKUE | 38.80364 | -84.87727 |
| RESAY | 39.17533 | -84.74475 |
| RHOMM | 38.76463 | -83.52251 |
| RIKLE | 39.83056 | -84.12167 |
| RINTE | 40.28781 | -84.04292 |
| ROCKT | 39.60737 | -82.87021 |
| RORFE | 39.16259 | -84.74964 |
| RUPPP | 39.00459 | -84.53481 |
| SARGO | 38.68362 | -85.42947 |
| SAVVI | 40.22117 | -81.57932 |
| SHIPR | 37.96664 | -84.47458 |
| SILKS | 38.46674 | -84.75161 |
| SITTR | 37.78031 | -81.12325 |
| SKAMR | 37.79860 | -85.89576 |
| SLUBY | 39.04377 | -84.19337 |
| SNKPT | 40.23721 | -85.39423 |
| SPOOD | 38.65025 | -84.52986 |
| STEVY | 38.81983 | -80.11928 |
| SUNFR | 39.11538 | -84.90861 |
| SUVBE | 39.23330 | -84.65264 |
| TERGE | 37.92846 | -87.76228 |
| TIGRR | 39.47331 | -84.07698 |
| TORIO | 40.24909 | -86.87604 |
| TRANQ | 37.62540 | -83.75065 |
| TRFWA | 38.01722 | -84.79056 |
| TUCKK | 38.49156 | -84.19511 |
| UBEDE | 39.04547 | -84.79553 |
| UDEYS | 38.72268 | -84.13219 |
| UKATS | 40.13458 | -82.62006 |
| VANGE | 38.78712 | -85.25042 |
| VXV | 35.90484 | -83.89472 |
| WADAL | 39.19161 | -83.96872 |
| WAXIL | 38.78886 | -85.19035 |
| WIMDI | 38.70141 | -84.77900 |
| WWSHR | 41.34280 | -82.05160 |
| YEBUL | 38.83617 | -85.15996 |
| YEYUP | 39.22235 | -84.28271 |
| YUMMM | 38.75462 | -85.30718 |
| ZABAL | 39.53534 | -85.91823 |
| ZABNU | 41.54650 | -88.31829 |
| ZALED | 39.13276 | -84.62358 |
| ZEGUL | 38.82892 | -84.58546 |
