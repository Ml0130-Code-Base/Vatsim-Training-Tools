# SID and STAR data from CIFP — KORD,KMDW

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

## KORD

### STARs

- **BENKY6 -> BFORD:** BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **BENKY6 -> BYLAW:** BYLAW FL200 - FL230 | BENKY 12
- **BENKY6 -> CASHN:** CASHN | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **BENKY6 -> DRAMS:** DRAMS | RYELY >=FL240 | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **BENKY6 -> IRK:** IRK | LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **BENKY6 -> LOAMY:** LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **BENKY6 -> TRICH:** TRICH 14 - 15 | BENKY 12
- **BENKY6 -> common route:** BENKY 12 | NEWRK | AHSTN | PETAH
- **BENKY6 -> RW04B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW09B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW10B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW22B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW27C:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW27L:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW27R:** PETAH | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW28C:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW28L:** PETAH | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENKY6 -> RW28R:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **ERNNY8 -> CHDRR:** CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> FAALZ:** FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> FGHRN:** FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> KOHLL:** KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> LYNNI:** LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> OVETE:** OVETE | PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> PIRPL:** PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> STASH:** STASH | TOWNE | PRADY | MUSKY | MINCE <=10 | ERNNY
- **ERNNY8 -> VIIKS:** VIIKS | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **ERNNY8 -> YOLUR:** YOLUR | MUSKY | MINCE <=10 | ERNNY
- **ERNNY8 -> common route:** ERNNY | PAPPI | TUBEZ
- **ERNNY8 -> RW04B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **ERNNY8 -> RW09B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **ERNNY8 -> RW10B:** TUBEZ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ERNNY8 -> RW22B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **ERNNY8 -> RW27B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **ERNNY8 -> RW28B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> BONNT:** BONNT | FRIDG | WATSN | MKITA | ESSPO
- **ESSPO5 -> FWA:** FWA | PRONK | DAIFE | WATSN | MKITA | ESSPO
- **ESSPO5 -> NOLNN:** NOLNN | DAIFE | WATSN | MKITA | ESSPO
- **ESSPO5 -> WATSN:** WATSN | MKITA | ESSPO
- **ESSPO5 -> common route:** ESSPO | LAACY | IZARD | CABIJ
- **ESSPO5 -> RW04B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW09C:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW09L:** CABIJ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW09R:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW10B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW22B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW27B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **ESSPO5 -> RW28B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> BENNR:** BENNR | JBAGS | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **FYTTE7 -> BHAWK:** BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **FYTTE7 -> BOWNN:** BOWNN >=FL240 | HYYDE 17 - FL220 | JAKSA 15/280 | MOOPS >=14 | FYTTE 11/250
- **FYTTE7 -> CHMPN:** CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **FYTTE7 -> MYRRS:** MYRRS | SAAYY | BENNR | JBAGS | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **FYTTE7 -> SHIKY:** SHIKY | BOWNN >=FL240 | HYYDE 17 - FL220 | JAKSA 15/280 | MOOPS >=14 | FYTTE 11/250
- **FYTTE7 -> TEEOO:** TEEOO | MITEE | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **FYTTE7 -> ZZIPR:** ZZIPR | WELCM | TEEOO | MITEE | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **FYTTE7 -> common route:** FYTTE 11/250 | MOTRR | COGSS | MADII | SOOLU
- **FYTTE7 -> RW04B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW09B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW10B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW22B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW27C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW27L:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW27R:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW28C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW28L:** SOOLU | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **FYTTE7 -> RW28R:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **JVL1 -> MCW:** MCW | SUZYQ | VIKNG | LARVA | JIBOR | BRIBE | MYTCH | JVL
- **JVL1 -> ALL:** JVL | BULLZ | TEDDY | KRENA 11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> CHDRR:** CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> FAALZ:** FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> FGHRN:** FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> KOHLL:** KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> OVETE:** OVETE | PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> PIRPL:** PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> VIIKS:** VIIKS | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> ZANDI:** ZANDI | HOPSS | HUNKA | MADII
- **MADII7 -> common route:** MADII | SOOLU
- **MADII7 -> RW04B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW09B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW10B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW22B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW27C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW27L:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW27R:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW28C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW28L:** SOOLU | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **MADII7 -> RW28R:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **SHAIN2 -> BFORD:** BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> CASHN:** CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> DRAMS:** DRAMS | RYELY >=FL240 | BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> FTZ:** FTZ | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> IRK:** IRK | LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> LOAMY:** LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> PNTAC:** PNTAC | TRICH | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> STL:** STL | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> TRIDE:** TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> VINCA:** VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> WELTS:** WELTS | MCDEE | CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **SHAIN2 -> ALL:** SHAIN 12 | RAGSS | JUMPN | NUNWS | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> BYLAW:** BYLAW FL200 - FL230 | TRTLL 11
- **TRTLL6 -> CASHN:** CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> FTZ:** FTZ | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> MAROC:** MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> PNTAC:** PNTAC | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> STL:** STL | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> VINCA:** VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> WELTS:** WELTS | MCDEE | CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **TRTLL6 -> common route:** TRTLL 11 | HIHRY | RINNO
- **TRTLL6 -> RW04B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW09B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW10B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW22B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW27C:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW27L:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW27R:** RINNO | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW28C:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW28L:** RINNO | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **TRTLL6 -> RW28R:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> BONNT:** BONNT | NYLEN | VEECK
- **VEECK5 -> FWA:** FWA | CARVR | ROYKO | VEECK
- **VEECK5 -> common route:** VEECK | BOONE | HANNI | CLUSO | KAYTO | PINKK
- **VEECK5 -> RW04B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW09C:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW09L:** PINKK | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW09R:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW10B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW22B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW27B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **VEECK5 -> RW28B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **WATSN4 -> BONNT:** BONNT | FRIDG | WATSN
- **WATSN4 -> DAIFE:** DAIFE | WATSN
- **WATSN4 -> FWA:** FWA | PRONK | DAIFE | WATSN
- **WATSN4 -> ROD:** ROD | FWA | PRONK | DAIFE | WATSN
- **WATSN4 -> ZANLA:** ZANLA | DAIFE | WATSN
- **WATSN4 -> ALL:** WATSN | HAUPO | MKITA | PRISE | HULLS | STYLE | DWEEB | CENAK | [VM leg - not a fix]  *(1 non-fix leg)*
- **WYNDE3 -> FNT:** FNT | KAYYS | LTOUR | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> KAYYS:** KAYYS | LTOUR | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> OBSTR:** OBSTR | CSTLO | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> ODAXY:** ODAXY | GAULT | OBSTR | CSTLO | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> SMUUV:** SMUUV | WYNDE
- **WYNDE3 -> SSM:** SSM | JODEE | GAULT | OBSTR | CSTLO | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> TVC:** TVC <=FL240 | PECOK | UFDUH <=FL240 | BITTR | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> UFDUH:** UFDUH <=FL240 | BITTR | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> VIO:** VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **WYNDE3 -> common route:** WYNDE | FIYER | ERNNY | PAPPI | TUBEZ
- **WYNDE3 -> RW04R:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **WYNDE3 -> RW09B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **WYNDE3 -> RW10B:** TUBEZ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **WYNDE3 -> RW22B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **WYNDE3 -> RW27B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **WYNDE3 -> RW28B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **BFORD** N41 09.61 / W89 35.24 -- `41.16009, -89.58741`
- **BYLAW** N41 17.18 / W89 16.55 -- `41.28635, -89.27584`
- **BENKY** N41 30.71 / W88 42.54 -- `41.51183, -88.70902`
- **CASHN** N39 57.53 / W90 15.57 -- `39.95889, -90.25944`
- **DRAMS** N40 49.55 / W90 35.90 -- `40.82590, -90.59827`
- **RYELY** N41 02.00 / W89 58.35 -- `41.03333, -89.97250`
- **IRK** N40 08.10 / W92 35.50 -- `40.13502, -92.59171`
- **LOAMY** N40 25.47 / W91 47.06 -- `40.42453, -91.78440`
- **KEOKK** N40 33.20 / W91 24.22 -- `40.55340, -91.40367`
- **TRICH** N41 12.57 / W88 48.45 -- `41.20943, -88.80755`
- **NEWRK** N41 33.97 / W88 34.27 -- `41.56612, -88.57112`
- **AHSTN** N41 42.76 / W88 21.44 -- `41.71266, -88.35734`
- **PETAH** N41 53.13 / W88 09.00 -- `41.88552, -88.15006`
- **JORJO** N41 53.07 / W87 59.31 -- `41.88448, -87.98855`
- **MONKZ** N41 53.06 / W87 48.11 -- `41.88433, -87.80180`
- **TONIE** N41 53.02 / W87 29.45 -- `41.88371, -87.49076`
- **KURKK** N42 05.51 / W88 01.63 -- `42.09184, -88.02720`
- **VULCN** N42 05.51 / W87 47.65 -- `42.09176, -87.79417`
- **HIMGO** N42 05.46 / W87 30.53 -- `42.09107, -87.50886`
- **RREGY** N41 52.44 / W87 29.39 -- `41.87393, -87.48975`
- **CHDRR** N43 20.18 / W87 52.32 -- `43.33636, -87.87207`
- **LYNNI** N42 50.08 / W87 34.89 -- `42.83460, -87.58144`
- **PHRLY** N42 43.45 / W87 31.43 -- `42.72416, -87.52381`
- **SWIIS** N42 31.50 / W87 30.57 -- `42.52506, -87.50950`
- **ERNNY** N42 20.32 / W87 32.05 -- `42.33872, -87.53418`
- **FAALZ** N43 46.12 / W87 50.93 -- `43.76862, -87.84876`
- **KOHLL** N43 38.28 / W87 50.48 -- `43.63805, -87.84139`
- **GURNN** N43 30.44 / W87 49.61 -- `43.50726, -87.82688`
- **FGHRN** N44 06.13 / W87 48.15 -- `44.10222, -87.80250`
- **OVETE** N44 51.25 / W87 41.27 -- `44.85422, -87.68788`
- **PIRPL** N44 17.07 / W87 46.50 -- `44.28449, -87.77499`
- **STASH** N41 46.25 / W86 19.39 -- `41.77086, -86.32314`
- **TOWNE** N41 53.24 / W86 37.64 -- `41.88736, -86.62737`
- **PRADY** N41 58.69 / W86 45.58 -- `41.97813, -86.75974`
- **MUSKY** N42 09.20 / W86 56.23 -- `42.15329, -86.93713`
- **MINCE** N42 09.74 / W87 03.85 -- `42.16232, -87.06419`
- **VIIKS** N44 16.78 / W87 07.63 -- `44.27972, -87.12722`
- **YOLUR** N42 09.03 / W86 37.41 -- `42.15054, -86.62345`
- **PAPPI** N42 16.20 / W87 36.43 -- `42.26997, -87.60720`
- **TUBEZ** N42 10.86 / W87 42.05 -- `42.18092, -87.70080`
- **BAMBB** N42 05.46 / W88 16.52 -- `42.09097, -88.27537`
- **POSSM** N41 52.48 / W88 16.51 -- `41.87466, -88.27518`
- **BONNT** N40 29.62 / W85 40.76 -- `40.49365, -85.67938`
- **FRIDG** N40 45.73 / W85 47.02 -- `40.76217, -85.78367`
- **WATSN** N41 17.01 / W86 02.12 -- `41.28345, -86.03534`
- **MKITA** N41 24.00 / W86 41.57 -- `41.40000, -86.69278`
- **ESSPO** N41 34.90 / W87 14.64 -- `41.58174, -87.24408`
- **FWA** N40 58.74 / W85 11.28 -- `40.97906, -85.18806`
- **PRONK** N41 10.70 / W85 28.64 -- `41.17827, -85.47734`
- **DAIFE** N41 16.13 / W85 51.32 -- `41.26889, -85.85528`
- **NOLNN** N41 14.06 / W84 38.20 -- `41.23438, -84.63667`
- **LAACY** N41 41.98 / W87 24.01 -- `41.69973, -87.40010`
- **IZARD** N41 47.22 / W87 29.86 -- `41.78696, -87.49769`
- **CABIJ** N41 53.30 / W87 36.61 -- `41.88834, -87.61024`
- **BENNR** N42 31.59 / W90 49.24 -- `42.52647, -90.82066`
- **JBAGS** N42 31.38 / W90 19.01 -- `42.52297, -90.31682`
- **BHAWK** N42 31.11 / W89 46.61 -- `42.51847, -89.77689`
- **STNLE** N42 28.37 / W89 24.24 -- `42.47279, -89.40404`
- **CUUPP** N42 26.27 / W89 07.29 -- `42.43791, -89.12151`
- **CHMPN** N42 25.79 / W89 03.53 -- `42.42987, -89.05880`
- **CLSBY** N42 24.55 / W88 53.62 -- `42.40911, -88.89374`
- **FYTTE** N42 22.80 / W88 40.07 -- `42.38006, -88.66779`
- **BOWNN** N43 35.14 / W88 40.68 -- `43.58569, -88.67805`
- **HYYDE** N43 11.18 / W88 51.18 -- `43.18636, -88.85292`
- **JAKSA** N42 50.63 / W89 02.71 -- `42.84390, -89.04519`
- **MOOPS** N42 39.45 / W88 53.55 -- `42.65748, -88.89252`
- **MYRRS** N42 31.43 / W92 03.60 -- `42.52389, -92.05992`
- **SAAYY** N42 31.62 / W91 25.74 -- `42.52707, -91.42905`
- **SHIKY** N44 11.67 / W88 25.08 -- `44.19444, -88.41806`
- **TEEOO** N42 51.46 / W90 43.03 -- `42.85767, -90.71718`
- **MITEE** N42 42.10 / W90 16.77 -- `42.70159, -90.27944`
- **ZZIPR** N43 11.15 / W91 39.55 -- `43.18583, -91.65917`
- **WELCM** N43 03.08 / W91 16.22 -- `43.05130, -91.27038`
- **MOTRR** N42 21.51 / W88 30.17 -- `42.35849, -88.50288`
- **COGSS** N42 20.66 / W88 23.69 -- `42.34427, -88.39490`
- **MADII** N42 18.06 / W88 18.83 -- `42.30096, -88.31381`
- **SOOLU** N42 11.78 / W88 08.86 -- `42.19637, -88.14769`
- **MCW** N43 05.69 / W93 19.79 -- `43.09476, -93.32987`
- **SUZYQ** N43 00.88 / W92 10.47 -- `43.01474, -92.17444`
- **VIKNG** N42 57.96 / W91 32.60 -- `42.96602, -91.54325`
- **LARVA** N42 52.94 / W90 33.10 -- `42.88227, -90.55166`
- **JIBOR** N42 50.42 / W90 05.51 -- `42.84040, -90.09181`
- **BRIBE** N42 47.90 / W89 56.42 -- `42.79833, -89.94036`
- **MYTCH** N42 44.42 / W89 44.17 -- `42.74029, -89.73623`
- **JVL** N42 33.48 / W89 06.32 -- `42.55801, -89.10526`
- **BULLZ** N42 27.45 / W88 46.28 -- `42.45757, -88.77130`
- **TEDDY** N42 25.18 / W88 38.78 -- `42.41966, -88.64628`
- **KRENA** N42 22.49 / W88 29.97 -- `42.37488, -88.49946`
- **ZANDI** N42 49.70 / W88 14.45 -- `42.82834, -88.24088`
- **HOPSS** N42 42.32 / W88 16.80 -- `42.70535, -88.27994`
- **HUNKA** N42 31.95 / W88 17.23 -- `42.53256, -88.28709`
- **EZZRA** N41 15.71 / W89 27.39 -- `41.26186, -89.45644`
- **TRIDE** N41 27.99 / W89 11.96 -- `41.46651, -89.19935`
- **SHAIN** N41 38.62 / W89 08.15 -- `41.64361, -89.13583`
- **VINCA** N40 20.72 / W89 49.41 -- `40.34535, -89.82352`
- **MAROC** N40 44.22 / W89 22.48 -- `40.73701, -89.37464`
- **KELTS** N41 07.45 / W89 16.17 -- `41.12423, -89.26951`
- **FNBAR** N41 17.08 / W89 14.47 -- `41.28472, -89.24111`
- **FTZ** N38 41.66 / W90 58.28 -- `38.69433, -90.97127`
- **GROOV** N39 25.88 / W90 34.14 -- `39.43131, -90.56908`
- **PNTAC** N40 49.32 / W88 44.02 -- `40.82203, -88.73367`
- **STL** N38 51.64 / W90 28.94 -- `38.86072, -90.48235`
- **WELTS** N39 00.38 / W91 46.37 -- `39.00638, -91.77282`
- **MCDEE** N39 33.10 / W90 54.93 -- `39.55167, -90.91556`
- **RAGSS** N41 43.47 / W89 06.41 -- `41.72445, -89.10676`
- **JUMPN** N41 49.04 / W89 03.48 -- `41.81728, -89.05800`
- **NUNWS** N41 55.12 / W88 57.65 -- `41.91861, -88.96084`
- **TRTLL** N41 22.23 / W88 36.70 -- `41.37056, -88.61161`
- **HIHRY** N41 36.91 / W88 19.22 -- `41.61515, -88.32029`
- **RINNO** N41 48.33 / W88 05.60 -- `41.80543, -88.09338`
- **NYLEN** N40 52.00 / W85 49.00 -- `40.86667, -85.81667`
- **VEECK** N41 07.52 / W86 37.15 -- `41.12528, -86.61917`
- **CARVR** N41 00.03 / W85 32.85 -- `41.00050, -85.54750`
- **ROYKO** N41 01.20 / W85 53.00 -- `41.02000, -85.88333`
- **BOONE** N41 21.83 / W87 11.53 -- `41.36376, -87.19215`
- **HANNI** N41 30.19 / W87 21.54 -- `41.50316, -87.35898`
- **CLUSO** N41 39.28 / W87 29.69 -- `41.65473, -87.49489`
- **KAYTO** N41 43.93 / W87 34.98 -- `41.73216, -87.58302`
- **PINKK** N41 49.90 / W87 41.68 -- `41.83174, -87.69460`
- **ROD** N40 17.27 / W84 02.59 -- `40.28780, -84.04310`
- **ZANLA** N41 11.38 / W84 50.78 -- `41.18972, -84.84639`
- **HAUPO** N41 20.55 / W86 32.59 -- `41.34258, -86.54310`
- **PRISE** N41 32.13 / W86 46.88 -- `41.53556, -86.78139`
- **HULLS** N41 39.40 / W86 47.60 -- `41.65667, -86.79333`
- **STYLE** N41 46.44 / W86 48.50 -- `41.77397, -86.80838`
- **DWEEB** N41 51.95 / W86 49.77 -- `41.86583, -86.82944`
- **CENAK** N41 59.77 / W86 58.52 -- `41.99611, -86.97528`
- **FNT** N42 58.01 / W83 44.82 -- `42.96677, -83.74699`
- **KAYYS** N42 53.07 / W84 34.84 -- `42.88443, -84.58067`
- **LTOUR** N42 50.96 / W84 55.10 -- `42.84936, -84.91831`
- **VIO** N42 47.20 / W85 29.82 -- `42.78672, -85.49707`
- **DITCA** N42 44.77 / W85 43.40 -- `42.74616, -85.72330`
- **WLTER** N42 41.19 / W86 03.07 -- `42.68650, -86.05109`
- **RHIVR** N42 38.76 / W86 16.24 -- `42.64596, -86.27060`
- **PAITN** N42 33.66 / W86 43.36 -- `42.56103, -86.72261`
- **WYNDE** N42 27.35 / W87 06.61 -- `42.45576, -87.11017`
- **OBSTR** N43 41.70 / W85 12.89 -- `43.69506, -85.21487`
- **CSTLO** N43 10.84 / W85 22.54 -- `43.18066, -85.37574`
- **ODAXY** N44 38.01 / W83 12.27 -- `44.63357, -83.20451`
- **GAULT** N44 04.61 / W85 05.62 -- `44.07689, -85.09365`
- **SMUUV** N42 27.98 / W86 07.64 -- `42.46633, -86.12732`
- **SSM** N46 24.73 / W84 18.89 -- `46.41211, -84.31487`
- **JODEE** N45 16.72 / W84 42.06 -- `45.27869, -84.70105`
- **TVC** N44 40.08 / W85 33.00 -- `44.66792, -85.55001`
- **PECOK** N44 00.46 / W85 43.24 -- `44.00769, -85.72075`
- **UFDUH** N43 42.60 / W85 47.78 -- `43.70998, -85.79638`
- **BITTR** N43 07.29 / W85 56.64 -- `43.12158, -85.94394`
- **FIYER** N42 23.87 / W87 19.27 -- `42.39777, -87.32117`

### SIDs

**None coded.** CIFP 260903 carries no SID for KORD. That means CIFP does not code them,
**not** that the field has none — a radar-vector or conventional departure is outside
what CIFP carries. The chart remains the only source.

## KMDW

### STARs

- **ENDEE8 -> CHUMP:** CHUMP 17 - FL210 | HEDOC | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> DARKK:** DARKK FL310 | BURUU FL240 - FL290 | ILIAD | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> EDENS:** EDENS FL190 - FL210 | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> FUDDD:** FUDDD FL310 | BOOKK FL240 - FL290 | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> IRK:** IRK | ENNZO | FUDDD FL310 | BOOKK FL240 - FL290 | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> JALAP:** JALAP | KAMBL FL240 - FL270 | MIGGS FL210 - FL230 | EDENS FL190 - FL210 | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> KAMBL:** KAMBL FL240 - FL270 | MIGGS FL210 - FL230 | EDENS FL190 - FL210 | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> LLVSS:** LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> MAGOO:** MAGOO | DARKK FL310 | BURUU FL240 - FL290 | ILIAD | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> NANEE:** NANEE 14 - 16 | MMEGG <=9 | ENDEE 6 - 7/250
- **ENDEE8 -> OHHMY:** OHHMY | UGGLY FL240 | JNSNN FL240 | AGONY FL210 - FL230 | FARCE | CHUMP 17 - FL210 | HEDOC | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> PHEEB:** PHEEB | POOGY FL240 | DAJON <=FL230 | NANEE 14 - 16 | MMEGG <=9 | ENDEE 6 - 7/250
- **ENDEE8 -> POOGY:** POOGY FL240 | DAJON <=FL230 | NANEE 14 - 16 | MMEGG <=9 | ENDEE 6 - 7/250
- **ENDEE8 -> UGGLY:** UGGLY FL240 | JNSNN FL240 | AGONY FL210 - FL230 | FARCE | CHUMP 17 - FL210 | HEDOC | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **ENDEE8 -> common route:** ENDEE 6 - 7/250 | STKNY 6
- **ENDEE8 -> RW04R:** STKNY 6 | ALQUE 6 | [FM leg - not a fix]  *(1 non-fix leg)*
- **ENDEE8 -> RW13L:** STKNY 6 | GORLC | [FM leg - not a fix]  *(1 non-fix leg)*
- **ENDEE8 -> RW22L:** STKNY 6 | PKACH 6 | TUURN | WADLL | [FM leg - not a fix]  *(1 non-fix leg)*
- **ENDEE8 -> RW31R:** STKNY 6 | WNNRS | GAGGA | [FM leg - not a fix]  *(1 non-fix leg)*
- **FISSK7 -> DROSE:** DROSE | TROLY | GOTNE | FISSK 11
- **FISSK7 -> common route:** FISSK 11 | VEECK | OZZEY | AZUMO | HALIE 6
- **FISSK7 -> RW04R:** HALIE 6 | OLCYK >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **FISSK7 -> RW13L:** HALIE 6 | TINLY >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **FISSK7 -> RW22L:** HALIE 6 | GERMN >=4 | LNANE | BOCAH | TACTT 3
- **FISSK7 -> RW31R:** HALIE 6 | ELLJO 6 | HILLS 5/240
- **PANGG7 -> ASHEN:** ASHEN | FNLYY FL240 | BAGEL | PANGG
- **PANGG7 -> BAGEL:** BAGEL | PANGG
- **PANGG7 -> FWA:** FWA | MAKKI FL240 | BAGEL | PANGG
- **PANGG7 -> LLTCH:** LLTCH | BRTTN FL240 | BAGEL | PANGG
- **PANGG7 -> common route:** PANGG | MEGGZ 11 | AWSUM 10 | IROCK | HALIE 6
- **PANGG7 -> RW04R:** HALIE 6 | OLCYK >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **PANGG7 -> RW13L:** HALIE 6 | TINLY >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **PANGG7 -> RW22L:** HALIE 6 | GERMN >=4 | LNANE | BOCAH | TACTT 3
- **PANGG7 -> RW31R:** HALIE 6 | ELLJO 6 | HILLS 5/240

### Fix coordinates

- **CHUMP** N41 22.59 / W89 59.43 -- `41.37645, -89.99057`
- **HEDOC** N41 13.63 / W89 49.32 -- `41.22720, -89.82206`
- **PURTY** N41 08.32 / W89 43.27 -- `41.13866, -89.72117`
- **OCCHO** N41 09.49 / W89 24.99 -- `41.15811, -89.41645`
- **KOOKS** N41 10.63 / W89 07.52 -- `41.17712, -89.12536`
- **JILLZ** N41 12.77 / W88 58.08 -- `41.21288, -88.96807`
- **TMRAA** N41 16.46 / W88 47.64 -- `41.27432, -88.79392`
- **ENDEE** N41 22.44 / W88 30.54 -- `41.37406, -88.50897`
- **DARKK** N40 15.21 / W90 30.00 -- `40.25349, -90.49999`
- **BURUU** N40 32.44 / W90 10.07 -- `40.54067, -90.16789`
- **ILIAD** N40 45.62 / W89 54.40 -- `40.76028, -89.90667`
- **LLVSS** N40 52.13 / W89 45.30 -- `40.86889, -89.75500`
- **PEALE** N40 59.59 / W89 28.38 -- `40.99319, -89.47301`
- **TOLCA** N41 08.82 / W89 07.21 -- `41.14707, -89.12022`
- **EDENS** N41 06.98 / W90 02.91 -- `41.11639, -90.04853`
- **FUDDD** N40 28.78 / W91 03.32 -- `40.47961, -91.05541`
- **BOOKK** N40 42.26 / W90 18.78 -- `40.70435, -90.31306`
- **IRK** N40 08.10 / W92 35.50 -- `40.13502, -92.59171`
- **ENNZO** N40 21.64 / W91 26.18 -- `40.36061, -91.43639`
- **JALAP** N40 50.30 / W93 33.80 -- `40.83833, -93.56333`
- **KAMBL** N41 03.85 / W90 42.54 -- `41.06417, -90.70906`
- **MIGGS** N41 05.10 / W90 26.90 -- `41.08505, -90.44839`
- **MAGOO** N40 01.50 / W90 45.71 -- `40.02492, -90.76183`
- **NANEE** N40 52.05 / W88 50.43 -- `40.86745, -88.84043`
- **MMEGG** N41 11.03 / W88 38.03 -- `41.18376, -88.63388`
- **OHHMY** N42 52.88 / W91 45.50 -- `42.88139, -91.75833`
- **UGGLY** N42 10.72 / W90 55.10 -- `42.17871, -90.91831`
- **JNSNN** N42 01.30 / W90 44.06 -- `42.02168, -90.73430`
- **AGONY** N41 51.41 / W90 32.55 -- `41.85685, -90.54249`
- **FARCE** N41 38.27 / W90 17.43 -- `41.63782, -90.29048`
- **PHEEB** N40 15.85 / W89 16.40 -- `40.26412, -89.27334`
- **POOGY** N40 23.89 / W89 08.62 -- `40.39817, -89.14365`
- **DAJON** N40 27.47 / W89 06.33 -- `40.45777, -89.10546`
- **STKNY** N41 30.41 / W88 17.43 -- `41.50678, -88.29044`
- **ALQUE** N41 34.17 / W88 01.44 -- `41.56942, -88.02394`
- **GORLC** N41 38.85 / W88 08.43 -- `41.64749, -88.14043`
- **PKACH** N41 34.82 / W88 07.90 -- `41.58032, -88.13171`
- **TUURN** N41 45.27 / W87 45.16 -- `41.75448, -87.75269`
- **WADLL** N41 45.61 / W87 37.75 -- `41.76022, -87.62917`
- **WNNRS** N41 32.74 / W87 51.65 -- `41.54561, -87.86076`
- **GAGGA** N41 33.53 / W87 42.55 -- `41.55889, -87.70917`
- **DROSE** N40 31.66 / W86 03.48 -- `40.52761, -86.05801`
- **TROLY** N40 41.67 / W86 03.25 -- `40.69454, -86.05419`
- **GOTNE** N40 57.68 / W86 02.88 -- `40.96127, -86.04804`
- **FISSK** N41 02.95 / W86 25.97 -- `41.04917, -86.43278`
- **VEECK** N41 07.52 / W86 37.15 -- `41.12528, -86.61917`
- **OZZEY** N41 23.95 / W86 56.01 -- `41.39917, -86.93350`
- **AZUMO** N41 27.47 / W87 00.29 -- `41.45776, -87.00480`
- **HALIE** N41 30.96 / W87 09.53 -- `41.51607, -87.15888`
- **OLCYK** N41 32.41 / W87 36.27 -- `41.54019, -87.60446`
- **TINLY** N41 33.32 / W87 50.96 -- `41.55530, -87.84932`
- **GERMN** N41 42.11 / W87 15.11 -- `41.70183, -87.25183`
- **LNANE** N41 45.31 / W87 16.72 -- `41.75511, -87.27859`
- **BOCAH** N41 51.01 / W87 20.26 -- `41.85022, -87.33764`
- **TACTT** N41 51.01 / W87 26.28 -- `41.85023, -87.43799`
- **ELLJO** N41 34.88 / W87 22.87 -- `41.58140, -87.38124`
- **HILLS** N41 37.42 / W87 31.57 -- `41.62372, -87.52616`
- **ASHEN** N41 28.83 / W84 38.80 -- `41.48049, -84.64675`
- **FNLYY** N41 30.74 / W85 30.17 -- `41.51232, -85.50287`
- **BAGEL** N41 30.96 / W85 36.82 -- `41.51597, -85.61369`
- **PANGG** N41 31.50 / W86 04.34 -- `41.52501, -86.07233`
- **FWA** N40 58.74 / W85 11.28 -- `40.97906, -85.18806`
- **MAKKI** N41 26.67 / W85 33.39 -- `41.44452, -85.55656`
- **LLTCH** N42 03.74 / W84 45.93 -- `42.06227, -84.76547`
- **BRTTN** N41 34.24 / W85 31.79 -- `41.57064, -85.52989`
- **MEGGZ** N41 31.40 / W86 23.74 -- `41.52341, -86.39574`
- **AWSUM** N41 31.33 / W86 34.39 -- `41.52215, -86.57315`
- **IROCK** N41 31.15 / W86 54.31 -- `41.51909, -86.90520`

### SIDs

**None coded.** CIFP 260903 carries no SID for KMDW. That means CIFP does not code them,
**not** that the field has none — a radar-vector or conventional departure is outside
what CIFP carries. The chart remains the only source.

