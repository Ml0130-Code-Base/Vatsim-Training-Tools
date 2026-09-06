# SID and STAR data from CIFP — KBOI,KBZN

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

## KBOI

### STARs

- **BEWTE4 -> COLLR:** COLLR >=15 | SKANA >=11 | BEWTE >=10/250
- **BEWTE4 -> MAXMS:** MAXMS >=15 | CHUKA >=11 | BEWTE >=10/250
- **BEWTE4 -> SUMOQ:** SUMOQ | MAXMS >=15 | CHUKA >=11 | BEWTE >=10/250
- **BEWTE4 -> common route:** BEWTE >=10 | CHRIE >=8.1
- **BEWTE4 -> RW10B:** CHRIE >=8.1 | LIBYY 7/210
- **BEWTE4 -> RW28B:** CHRIE >=8.1 | CAMML 8/210 | DYYLN | [FM leg - not a fix]  *(1 non-fix leg)*
- **KOURT4 -> DERSO:** DERSO >=14 | KOURT >=12.5
- **KOURT4 -> REAPS:** REAPS >=FL240 | SOLDE >=FL190 | DERSO >=14 | KOURT >=12.5
- **KOURT4 -> common route:** KOURT >=12.5 | BOLLS >=9.9 | EREXE >=9.6/250
- **KOURT4 -> RW10B:** EREXE >=9.6 | GRZZY >=8.9 | LEAFS | ROWBI >=8.1 | KOLKE 8/210 | [FM leg - not a fix]  *(1 non-fix leg)*
- **KOURT4 -> RW28B:** EREXE >=9.6 | LIITL >=9
- **KYAAN4 -> DEVLE:** DEVLE >=16 | MAALR >=10 | KYAAN >=8/250
- **KYAAN4 -> RW10B:** KYAAN >=8 | JIMMI >=6/210
- **KYAAN4 -> RW28B:** KYAAN >=8 | CAMML 8/210 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SADYL4 -> NEERO:** NEERO | PRNCS | PELYT >=FL210
- **SADYL4 -> PRNCS:** PRNCS | PELYT >=FL210
- **SADYL4 -> common route:** PELYT >=FL210 | SADYL >=14 | MRFEE >=10.1/250
- **SADYL4 -> RW10B:** MRFEE >=10.1 | SWAAN >=7 | APISE 6/210
- **SADYL4 -> RW28B:** MRFEE >=10.1 | PRISN | DIKAC 7/210 | [VM leg - not a fix]  *(1 non-fix leg)*
- **SPUUD4 -> BROPH:** BROPH | ORYDA | TAUTT >=11 | MASSH >=11/250 | SPUUD >=10
- **SPUUD4 -> ORYDA:** ORYDA | TAUTT >=11 | MASSH >=11/250 | SPUUD >=10
- **SPUUD4 -> RW10B:** SPUUD >=10 | FALDI >=8 | ELUMY | EKEME 7/210 | [FM leg - not a fix]  *(1 non-fix leg)*
- **SPUUD4 -> RW28B:** SPUUD >=10 | CELOR >=8/230

### Fix coordinates

- **COLLR** N44 22.85 / W116 18.84 -- `44.38091, -116.31395`
- **SKANA** N44 12.56 / W116 22.20 -- `44.20931, -116.37002`
- **BEWTE** N44 00.49 / W116 25.89 -- `44.00815, -116.43144`
- **MAXMS** N44 29.86 / W116 33.33 -- `44.49769, -116.55553`
- **CHUKA** N44 12.29 / W116 28.86 -- `44.20486, -116.48105`
- **SUMOQ** N44 55.86 / W116 40.03 -- `44.93097, -116.66719`
- **CHRIE** N43 53.65 / W116 24.08 -- `43.89423, -116.40132`
- **LIBYY** N43 46.78 / W116 22.27 -- `43.77961, -116.37113`
- **CAMML** N43 40.87 / W116 20.78 -- `43.68123, -116.34637`
- **DYYLN** N43 37.93 / W116 12.28 -- `43.63211, -116.20465`
- **DERSO** N43 21.71 / W115 08.03 -- `43.36184, -115.13379`
- **KOURT** N43 23.79 / W115 19.32 -- `43.39647, -115.32200`
- **REAPS** N43 09.79 / W114 05.57 -- `43.16320, -114.09291`
- **SOLDE** N43 15.39 / W114 34.48 -- `43.25644, -114.57460`
- **BOLLS** N43 26.20 / W115 32.47 -- `43.43664, -115.54122`
- **EREXE** N43 26.75 / W115 35.50 -- `43.44581, -115.59160`
- **GRZZY** N43 29.44 / W115 43.77 -- `43.49071, -115.72950`
- **LEAFS** N43 31.07 / W115 48.79 -- `43.51784, -115.81318`
- **ROWBI** N43 35.51 / W116 02.56 -- `43.59181, -116.04264`
- **KOLKE** N43 36.79 / W116 06.29 -- `43.61314, -116.10489`
- **LIITL** N43 27.00 / W115 40.74 -- `43.45004, -115.67896`
- **DEVLE** N44 12.73 / W117 14.94 -- `44.21209, -117.24906`
- **MAALR** N43 58.14 / W116 55.89 -- `43.96903, -116.93157`
- **KYAAN** N43 49.80 / W116 38.72 -- `43.82998, -116.64540`
- **JIMMI** N43 38.86 / W116 28.27 -- `43.64766, -116.47115`
- **NEERO** N41 49.06 / W118 01.49 -- `41.81760, -118.02480`
- **PRNCS** N42 26.59 / W117 48.88 -- `42.44324, -117.81460`
- **PELYT** N42 46.80 / W117 15.27 -- `42.78007, -117.25449`
- **SADYL** N43 02.61 / W116 48.30 -- `43.04357, -116.80497`
- **MRFEE** N43 10.95 / W116 34.16 -- `43.18254, -116.56938`
- **SWAAN** N43 22.45 / W116 29.57 -- `43.37411, -116.49289`
- **APISE** N43 30.13 / W116 26.49 -- `43.50211, -116.44150`
- **PRISN** N43 21.70 / W116 17.60 -- `43.36170, -116.29330`
- **DIKAC** N43 24.76 / W116 12.86 -- `43.41271, -116.21425`
- **BROPH** N42 43.26 / W114 52.53 -- `42.72103, -114.87550`
- **ORYDA** N42 54.93 / W115 09.30 -- `42.91542, -115.15494`
- **TAUTT** N43 08.64 / W115 29.28 -- `43.14408, -115.48807`
- **MASSH** N43 13.70 / W115 36.69 -- `43.22836, -115.61151`
- **SPUUD** N43 16.43 / W115 40.70 -- `43.27382, -115.67825`
- **FALDI** N43 21.08 / W115 53.13 -- `43.35125, -115.88548`
- **ELUMY** N43 27.87 / W116 11.47 -- `43.46446, -116.19123`
- **EKEME** N43 29.48 / W116 16.20 -- `43.49138, -116.27008`
- **CELOR** N43 22.84 / W115 48.93 -- `43.38059, -115.81544`

### SIDs

- **BOI3 -> RW10B:** [FM leg - not a fix]  *(1 non-fix leg)*
- **BOI3 -> RW28B:** [FM leg - not a fix]  *(1 non-fix leg)*
- **GOWEN4 -> RW10B:** [VA leg - not a fix] | [VI leg - not a fix] | FIMGU >=5.3  *(2 non-fix legs)*
- **GOWEN4 -> RW28B:** [CA leg - not a fix] | [VI leg - not a fix] | FIMGU >=5.3  *(2 non-fix legs)*
- **GOWEN4 -> common route:** FIMGU >=5.3 | BOI

### Fix coordinates

- **FIMGU** N43 26.46 / W116 23.51 -- `43.44104, -116.39180`
- **BOI** N43 33.17 / W116 11.53 -- `43.55281, -116.19213`

## KBZN

### STARs

- **BGMAN1 -> KARTS:** KARTS | BGMAN 17/250
- **BGMAN1 -> RW12:** BGMAN 17/250 | ALNYT >=13 | JAZMN >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **BGMAN1 -> RW30:** BGMAN 17/250 | USEET >=13 | FARVE >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **EATZZ1 -> DOXIE:** DOXIE | EATZZ 15.6 - 17/250
- **EATZZ1 -> JIROS:** JIROS | EATZZ 15.6 - 17/250
- **EATZZ1 -> RW12:** EATZZ 15.6 - 17/250 | VECTR >=12 | THESE >=9 | [FM leg - not a fix]  *(1 non-fix leg)*
- **EATZZ1 -> RW30:** EATZZ 15.6 - 17/250 | BEARY 12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **LOSST1 -> SABAT:** SABAT | LOSST 17/250
- **LOSST1 -> TOCUD:** TOCUD | LOSST 17/250
- **LOSST1 -> RW12:** LOSST 17/250 | KIYLE >=13 | HERAH >=12 | [FM leg - not a fix]  *(1 non-fix leg)*
- **LOSST1 -> RW30:** LOSST 17/250 | DREAA >=13 | GARNT >=12/230 | [FM leg - not a fix]  *(1 non-fix leg)*
- **POWDA2 -> ALL:** CREKK >=FL180 | POWDA 17/250 | JOLIE >=14 | RUFSS >=11 | KICDO >=10/220
- **SUBKY1 -> ALL:** BIL >=FL180 | SUBKY 17/250 | LVM 13 | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **KARTS** N44 04.15 / W113 53.36 -- `44.06917, -113.88934`
- **BGMAN** N45 32.17 / W112 02.53 -- `45.53619, -112.04211`
- **ALNYT** N45 38.45 / W111 47.29 -- `45.64091, -111.78814`
- **JAZMN** N45 40.20 / W111 42.98 -- `45.67004, -111.71627`
- **USEET** N45 34.51 / W111 44.80 -- `45.57521, -111.74663`
- **FARVE** N45 35.10 / W111 40.32 -- `45.58493, -111.67198`
- **DOXIE** N45 50.34 / W115 10.28 -- `45.83895, -115.17136`
- **EATZZ** N45 59.00 / W112 01.83 -- `45.98330, -112.03051`
- **JIROS** N46 48.20 / W114 40.28 -- `46.80337, -114.67133`
- **VECTR** N45 57.93 / W111 45.70 -- `45.96552, -111.76167`
- **THESE** N45 57.03 / W111 32.45 -- `45.95044, -111.54086`
- **BEARY** N45 48.71 / W111 30.30 -- `45.81186, -111.50504`
- **SABAT** N44 01.00 / W111 39.92 -- `44.01659, -111.66529`
- **LOSST** N45 08.05 / W110 57.07 -- `45.13417, -110.95114`
- **TOCUD** N44 03.88 / W110 08.31 -- `44.06465, -110.13844`
- **KIYLE** N45 34.19 / W111 05.80 -- `45.56985, -111.09671`
- **HERAH** N45 37.24 / W111 06.83 -- `45.62073, -111.11387`
- **DREAA** N45 20.18 / W111 08.08 -- `45.33636, -111.13468`
- **GARNT** N45 24.64 / W111 12.15 -- `45.41062, -111.20249`
- **CREKK** N46 02.21 / W108 28.72 -- `46.03679, -108.47869`
- **POWDA** N45 58.09 / W110 12.00 -- `45.96824, -110.19995`
- **JOLIE** N45 59.79 / W110 40.32 -- `45.99651, -110.67192`
- **RUFSS** N46 01.29 / W111 07.15 -- `46.02147, -111.11924`
- **KICDO** N46 00.93 / W111 17.39 -- `46.01556, -111.28984`
- **BIL** N45 48.51 / W108 37.48 -- `45.80856, -108.62465`
- **SUBKY** N45 44.01 / W109 57.62 -- `45.73350, -109.96035`
- **LVM** N45 42.15 / W110 26.55 -- `45.70248, -110.44245`

### SIDs

- **BGSKY2 -> RW12:** [VA leg - not a fix] | BGSKY 7.7 - 9/230  *(1 non-fix leg)*
- **BGSKY2 -> DBS:** BGSKY | LUKKS | UPLOW >=11 | DBS
- **BGSKY2 -> HIA:** BGSKY | AIDDN >=11 | HIA
- **BGSKY2 -> UPLOW:** BGSKY | LUKKS | UPLOW >=11
- **BOBKT5 -> RW12:** JAPER | BOBKT >=9.6
- **BOBKT5 -> BIL:** BOBKT | LVM | SUBKY | REEPO | COLUS | BIL
- **BOBKT5 -> BOY:** BOBKT | ZORKE >=12.5 | TOOLS | BOY
- **BZN6 -> RW12:** [CA leg - not a fix] | [VI leg - not a fix] | BRIGR | BZN  *(2 non-fix legs)*
- **BZN6 -> RW30:** [CA leg - not a fix] | [VI leg - not a fix] | BRIGR | BZN  *(2 non-fix legs)*
- **HIA5 -> RW12:** [CA leg - not a fix] | [VI leg - not a fix] | BRIGR | HIA  *(2 non-fix legs)*
- **HIA5 -> RW30:** [CA leg - not a fix] | [VI leg - not a fix] | BRIGR | HIA  *(2 non-fix legs)*
- **MEADO2 -> RW30:** MEADO >=9.2
- **MEADO2 -> CREKK:** MEADO | VVNUS >=10.8/250 | POWDA | CREKK
- **MEADO2 -> DBS:** MEADO | LIILY >=13 | UPLOW | DBS
- **MEADO2 -> HIA:** MEADO | WASAT >=13 | HIA
- **MEADO2 -> TOOLS:** MEADO | VVNUS >=10.8/250 | RYYDE >=11.8 | AALNG >=14 | YODOG | TOOLS
- **MEADO2 -> UPLOW:** MEADO | LIILY >=13 | UPLOW

### Fix coordinates

- **BGSKY** N45 39.13 / W111 12.06 -- `45.65209, -111.20104`
- **LUKKS** N45 34.95 / W111 37.89 -- `45.58246, -111.63142`
- **UPLOW** N45 17.85 / W111 48.32 -- `45.29753, -111.80527`
- **DBS** N44 05.33 / W112 12.56 -- `44.08885, -112.20934`
- **AIDDN** N45 41.59 / W111 23.22 -- `45.69310, -111.38696`
- **HIA** N45 51.71 / W112 10.18 -- `45.86179, -112.16961`
- **JAPER** N45 39.87 / W110 59.32 -- `45.66451, -110.98862`
- **BOBKT** N45 38.77 / W110 48.03 -- `45.64619, -110.80050`
- **LVM** N45 42.15 / W110 26.55 -- `45.70248, -110.44245`
- **SUBKY** N45 44.01 / W109 57.62 -- `45.73350, -109.96035`
- **REEPO** N45 45.57 / W109 31.61 -- `45.75956, -109.52688`
- **COLUS** N45 47.02 / W109 05.98 -- `45.78364, -109.09967`
- **BIL** N45 48.51 / W108 37.48 -- `45.80856, -108.62465`
- **ZORKE** N45 30.41 / W110 40.22 -- `45.50685, -110.67039`
- **TOOLS** N44 56.60 / W110 09.13 -- `44.94326, -110.15211`
- **BOY** N43 27.79 / W108 17.98 -- `43.46315, -108.29971`
- **BRIGR** N45 39.74 / W111 28.03 -- `45.66230, -111.46722`
- **BZN** N45 47.03 / W111 09.33 -- `45.78390, -111.15546`
- **MEADO** N45 55.06 / W111 20.92 -- `45.91766, -111.34860`
- **VVNUS** N46 00.48 / W111 12.97 -- `46.00796, -111.21624`
- **POWDA** N45 58.09 / W110 12.00 -- `45.96824, -110.19995`
- **CREKK** N46 02.21 / W108 28.72 -- `46.03679, -108.47869`
- **LIILY** N45 49.63 / W111 28.83 -- `45.82721, -111.48053`
- **WASAT** N45 54.07 / W111 36.03 -- `45.90116, -111.60051`
- **RYYDE** N45 54.26 / W110 59.74 -- `45.90434, -110.99573`
- **AALNG** N45 45.68 / W110 52.41 -- `45.76129, -110.87350`
- **YODOG** N45 18.57 / W110 29.53 -- `45.30944, -110.49222`

