# SID, STAR and approach data from CIFP — C90, Chicago TRACON

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

### KARR

**SIDs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **ADELL8** | RNAV | AKMIE ARLYN | RW09 RW15 RW18 RW27 RW33 RW36 |
| **BLOKR8** | RNAV | BEKKI RBS | RW09 RW15 RW18 RW27 RW33 RW36 |
| **CARYN8** | RNAV | CYBIL | RW09 RW15 RW18 RW27 RW33 RW36 |
| **DARCY8** | RNAV | DONVE SCOTO | RW09 RW15 RW18 RW27 RW33 RW36 |
| **ELANR9** | RNAV | EMEGE EMMLY ERECO | RW09 RW15 RW18 RW27 RW33 RW36 |
| **OBENE3** | RNAV | ELYNA IANNA JORDY MNOSO NITWT OGALE ROEZZ ROTTN SMIDD | RW09 RW15 RW18 RW27 RW33 RW36 |

### KDPA

**SIDs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **ADELL8** | RNAV | AKMIE ARLYN | RW02B RW10 RW15 RW20B RW28 RW33 |
| **BLOKR8** | RNAV | BEKKI RBS | RW02B RW10 RW15 RW20B RW28 RW33 |
| **CARYN8** | RNAV | CYBIL | RW02B RW10 RW15 RW20B RW28 RW33 |
| **DARCY8** | RNAV | DONVE SCOTO | RW02B RW10 RW15 RW20B RW28 RW33 |
| **ELANR9** | RNAV | EMEGE EMMLY ERECO | RW02L RW02R RW10 RW15 RW20L RW20R RW28 RW33 |
| **OBENE3** | RNAV | ELYNA IANNA JORDY MNOSO NITWT OGALE ROEZZ ROTTN SMIDD | RW02B RW10 RW15 RW20B RW28 RW33 |

### KGYY

**SIDs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **ADELL8** | RNAV | AKMIE ARLYN | RW02 RW12 RW20 RW30 |
| **BLOKR8** | RNAV | BEKKI RBS | RW02 RW12 RW20 RW30 |
| **CARYN8** | RNAV | CYBIL | RW02 RW12 RW20 RW30 |
| **DARCY8** | RNAV | DONVE SCOTO | RW02 RW12 RW20 RW30 |
| **ELANR9** | RNAV | EMEGE EMMLY ERECO | RW02 RW12 RW20 RW30 |

**STARs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **LUCIT3** | RNAV | COOKS EDENS HERWK HLMIT MACES SOHOW | ALL |
| **PANGG7** | RNAV | ASHEN BAGEL FWA LLTCH | ALL |

### KLOT

**SIDs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **ADELL8** | RNAV | AKMIE ARLYN | RW02 RW09 RW20 RW27 |
| **BLOKR8** | RNAV | BEKKI RBS | RW02 RW09 RW20 RW27 |
| **CARYN8** | RNAV | CYBIL | RW02 RW09 RW20 RW27 |
| **DARCY8** | RNAV | DONVE SCOTO | RW02 RW09 RW20 RW27 |
| **ELANR9** | RNAV | EMEGE EMMLY ERECO | RW02 RW09 RW20 RW27 |
| **OBENE3** | RNAV | ELYNA IANNA JORDY MNOSO NITWT OGALE ROEZZ ROTTN SMIDD | RW02 RW09 RW20 RW27 |

### KMDW

**STARs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **ENDEE8** | RNAV | CHUMP DARKK EDENS FUDDD IRK JALAP KAMBL LLVSS MAGOO NANEE OHHMY PHEEB POOGY UGGLY | RW04R RW13L RW22L RW31R |
| **FISSK7** | RNAV | DROSE | RW04R RW13L RW22L RW31R |
| **PANGG7** | RNAV | ASHEN BAGEL FWA LLTCH | RW04R RW13L RW22L RW31R |

### KORD

**STARs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **BENKY6** | RNAV | BFORD BYLAW CASHN DRAMS IRK LOAMY TRICH | RW04B RW09B RW10B RW22B RW27C RW27L RW27R RW28C RW28L RW28R |
| **ERNNY8** | RNAV | CHDRR FAALZ FGHRN KOHLL LYNNI OVETE PIRPL STASH VIIKS YOLUR | RW04B RW09B RW10B RW22B RW27B RW28B |
| **ESSPO5** | RNAV | BONNT FWA NOLNN WATSN | RW04B RW09C RW09L RW09R RW10B RW22B RW27B RW28B |
| **FYTTE7** | RNAV | BENNR BHAWK BOWNN CHMPN MYRRS SHIKY TEEOO ZZIPR | RW04B RW09B RW10B RW22B RW27C RW27L RW27R RW28C RW28L RW28R |
| **JVL1** | conventional | MCW | ALL |
| **MADII7** | RNAV | CHDRR FAALZ FGHRN KOHLL OVETE PIRPL VIIKS ZANDI | RW04B RW09B RW10B RW22B RW27C RW27L RW27R RW28C RW28L RW28R |
| **SHAIN2** | RNAV | BFORD CASHN DRAMS FTZ IRK LOAMY PNTAC STL TRIDE VINCA WELTS | ALL |
| **TRTLL6** | RNAV | BYLAW CASHN FTZ MAROC PNTAC STL VINCA WELTS | RW04B RW09B RW10B RW22B RW27C RW27L RW27R RW28C RW28L RW28R |
| **VEECK5** | RNAV | BONNT FWA | RW04B RW09C RW09L RW09R RW10B RW22B RW27B RW28B |
| **WATSN4** | RNAV | BONNT DAIFE FWA ROD ZANLA | ALL |
| **WYNDE3** | RNAV | FNT KAYYS OBSTR ODAXY SMUUV SSM TVC UFDUH VIO | RW04R RW09B RW10B RW22B RW27B RW28B |

### KPWK

**SIDs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **JORJO5** | RNAV | AKMIE ARLYN BEKKI RBS | RW12 RW16 RW30 RW34 |
| **MONKZ5** | RNAV | CYBIL DONVE ELANR EMEGE EMMLY ERECO SCOTO | RW12 RW16 RW30 RW34 |

**STARs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **GOPAC3** | RNAV | CHZHD LEEDN OGECA | ALL |

### KUGN

**SIDs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **JORJO5** | RNAV | AKMIE ARLYN BEKKI RBS | RW05 RW14 RW23 RW32 |
| **MONKZ5** | RNAV | CYBIL DONVE ELANR EMEGE EMMLY ERECO SCOTO | RW05 RW14 RW23 RW32 |

**STARs**

| identifier | coding | entry / exit transitions | runway transitions |
|---|---|---|---|
| **GOPAC3** | RNAV | CHZHD LEEDN OGECA | ALL |

---

## KORD

### STARs

- **BFORD:** BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **BYLAW:** BYLAW FL200 - FL230 | BENKY 12
- **CASHN:** CASHN | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **DRAMS:** DRAMS | RYELY >=FL240 | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **IRK:** IRK | LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **LOAMY:** LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | BYLAW FL200 - FL230 | BENKY 12
- **TRICH:** TRICH 14 - 15 | BENKY 12
- **(final):** BENKY 12 | NEWRK | AHSTN | PETAH
- **RW04B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27C:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27L:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27R:** PETAH | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28C:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28L:** PETAH | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28R:** PETAH | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **CHDRR:** CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **FAALZ:** FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **FGHRN:** FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **KOHLL:** KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **LYNNI:** LYNNI | PHRLY | SWIIS | ERNNY
- **OVETE:** OVETE | PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **PIRPL:** PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **STASH:** STASH | TOWNE | PRADY | MUSKY | MINCE <=10 | ERNNY
- **VIIKS:** VIIKS | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | LYNNI | PHRLY | SWIIS | ERNNY
- **YOLUR:** YOLUR | MUSKY | MINCE <=10 | ERNNY
- **(final):** ERNNY | PAPPI | TUBEZ
- **RW04B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** TUBEZ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **BONNT:** BONNT | FRIDG | WATSN | MKITA | ESSPO
- **FWA:** FWA | PRONK | DAIFE | WATSN | MKITA | ESSPO
- **NOLNN:** NOLNN | DAIFE | WATSN | MKITA | ESSPO
- **WATSN:** WATSN | MKITA | ESSPO
- **(final):** ESSPO | LAACY | IZARD | CABIJ
- **RW04B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09C:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09L:** CABIJ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09R:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28B:** CABIJ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **BENNR:** BENNR | JBAGS | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **BHAWK:** BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **BOWNN:** BOWNN >=FL240 | HYYDE 17 - FL220 | JAKSA 15/280 | MOOPS >=14 | FYTTE 11/250
- **CHMPN:** CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **MYRRS:** MYRRS | SAAYY | BENNR | JBAGS | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **SHIKY:** SHIKY | BOWNN >=FL240 | HYYDE 17 - FL220 | JAKSA 15/280 | MOOPS >=14 | FYTTE 11/250
- **TEEOO:** TEEOO | MITEE | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **ZZIPR:** ZZIPR | WELCM | TEEOO | MITEE | BHAWK FL210 - FL260 | STNLE 17 - FL210/280 | CUUPP | CHMPN | CLSBY 13 - 15/270 | FYTTE 11/250
- **(final):** FYTTE 11/250 | MOTRR | COGSS | MADII | SOOLU
- **RW04B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27L:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27R:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28L:** SOOLU | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28R:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **MCW:** MCW | SUZYQ | VIKNG | LARVA | JIBOR | BRIBE | MYTCH | JVL
- **ALL:** JVL | BULLZ | TEDDY | KRENA 11 | [VM leg - not a fix]  *(1 non-fix leg)*
- **CHDRR:** CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **FAALZ:** FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **FGHRN:** FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **KOHLL:** KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **OVETE:** OVETE | PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **PIRPL:** PIRPL | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **VIIKS:** VIIKS | FGHRN | FAALZ | KOHLL FL190 - FL210 | GURNN | CHDRR 14 | ZANDI | HOPSS | HUNKA | MADII
- **ZANDI:** ZANDI | HOPSS | HUNKA | MADII
- **(final):** MADII | SOOLU
- **RW04B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27L:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27R:** SOOLU | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28C:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28L:** SOOLU | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28R:** SOOLU | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BFORD:** BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **CASHN:** CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **DRAMS:** DRAMS | RYELY >=FL240 | BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **FTZ:** FTZ | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **IRK:** IRK | LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **LOAMY:** LOAMY | KEOKK | DRAMS | RYELY >=FL240 | BFORD >=FL220 | EZZRA >=FL200 | TRIDE 15 - 16 | SHAIN 12
- **PNTAC:** PNTAC | TRICH | TRIDE 15 - 16 | SHAIN 12
- **STL:** STL | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **TRIDE:** TRIDE 15 - 16 | SHAIN 12
- **VINCA:** VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **WELTS:** WELTS | MCDEE | CASHN | VINCA | MAROC FL240 - FL270 | KELTS >=FL200 | FNBAR 17 - FL200 | TRIDE 15 - 16 | SHAIN 12
- **ALL:** SHAIN 12 | RAGSS | JUMPN | NUNWS | [FM leg - not a fix]  *(1 non-fix leg)*
- **BYLAW:** BYLAW FL200 - FL230 | TRTLL 11
- **CASHN:** CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **FTZ:** FTZ | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **MAROC:** MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **PNTAC:** PNTAC | TRICH 14 - 15 | TRTLL 11
- **STL:** STL | GROOV | CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **VINCA:** VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **WELTS:** WELTS | MCDEE | CASHN | VINCA | MAROC FL240 - FL270 | TRICH 14 - 15 | TRTLL 11
- **(final):** TRTLL 11 | HIHRY | RINNO
- **RW04B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27C:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27L:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27R:** RINNO | KURKK | VULCN | HIMGO | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28C:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28L:** RINNO | JORJO | MONKZ | RREGY | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28R:** RINNO | JORJO | MONKZ | TONIE | [FM leg - not a fix]  *(1 non-fix leg)*
- **BONNT:** BONNT | NYLEN | VEECK
- **FWA:** FWA | CARVR | ROYKO | VEECK
- **(final):** VEECK | BOONE | HANNI | CLUSO | KAYTO | PINKK
- **RW04B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09C:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09L:** PINKK | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09R:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28B:** PINKK | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **BONNT:** BONNT | FRIDG | WATSN
- **DAIFE:** DAIFE | WATSN
- **FWA:** FWA | PRONK | DAIFE | WATSN
- **ROD:** ROD | FWA | PRONK | DAIFE | WATSN
- **ZANLA:** ZANLA | DAIFE | WATSN
- **ALL:** WATSN | HAUPO | MKITA | PRISE | HULLS | STYLE | DWEEB | CENAK | [VM leg - not a fix]  *(1 non-fix leg)*
- **FNT:** FNT | KAYYS | LTOUR | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **KAYYS:** KAYYS | LTOUR | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **OBSTR:** OBSTR | CSTLO | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **ODAXY:** ODAXY | GAULT | OBSTR | CSTLO | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **SMUUV:** SMUUV | WYNDE
- **SSM:** SSM | JODEE | GAULT | OBSTR | CSTLO | VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **TVC:** TVC <=FL240 | PECOK | UFDUH <=FL240 | BITTR | WLTER | RHIVR | PAITN | WYNDE
- **UFDUH:** UFDUH <=FL240 | BITTR | WLTER | RHIVR | PAITN | WYNDE
- **VIO:** VIO | DITCA | WLTER | RHIVR | PAITN | WYNDE
- **(final):** WYNDE | FIYER | ERNNY | PAPPI | TUBEZ
- **RW04R:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW09B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW10B:** TUBEZ | MONKZ | JORJO | POSSM | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW27B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW28B:** TUBEZ | VULCN | KURKK | BAMBB | [FM leg - not a fix]  *(1 non-fix leg)*

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

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**H27LY** — RNAV (RNP) RWY 27LY

- **VOGLR:** VOGLR | NRMAH >=9000 | JOEBO >=8000 | GRABL >=7000 | RIPPR >=6000 | BASHH >=5000/230
- **(final):** BASHH >=5000 | EBENS >=4000 | TAFFS >=2200 | TAFFS 0 | RW27L 708 | WASCO >=4000 | WASCO >=4000

**I04R** — ILS RWY 04R

- **RAHNN:** RAHNN >=11000 | DEGAN >=8000 | HARRL >=5000
- **(final):** HARRL 5000 | NAPER >=4000 | REKKS 2200 | RW04R 713 | [CA leg - not a fix] | [VI leg - not a fix] | LAIRD >=4000 | LAIRD >=4000  *(2 non-fix legs)*

**I09C** — ILS RWY 09C

- **GIBNS:** GIBNS | NORDL >=9000 | KOOSS >=8000 | SIKLR >=7000 | MUELL >=6000 | FFRAN >=5000
- **(final):** FFRAN 5000 | MIETH >=4000 | EZELL 2300 | RW09C 728 | [CA leg - not a fix] | [VI leg - not a fix] | DEERE >=4000 | DEERE >=4000  *(2 non-fix legs)*

**I09L** — ILS RWY 09L

- **GIBNS:** GIBNS | JHONN >=9000 | ESSSS >=8000 | VNDER >=7000 | ILIUM >=6000 | TRYXI >=5000
- **(final):** TRYXI 5000 | DOOGY >=4000 | ZENAH 2300 | RW09L 723 | [CA leg - not a fix] | OBK >=4000 | OBK >=4000  *(1 non-fix leg)*

**I09R** — ILS RWY 09R

- **GIBNS:** GIBNS | ADLMN >=9000 | FOTTR >=8000 | WASCO >=7000 | GEMMS >=6000 | CHILR >=5000
- **(final):** CHILR 5000 | DEVON >=4000 | MEOWW 2300 | RW09R 726 | [CA leg - not a fix] | [VI leg - not a fix] | GRABL >=4000 | GRABL >=4000  *(2 non-fix legs)*

**I10C** — ILS RWY 10C

- **GIBNS:** GIBNS | BAIRY >=9000 | COUPR >=8000 | KYLAA >=7000 | PEPAW >=6000 | SHARN >=5000
- **(final):** SHARN 5000 | RRUDA >=4000 | RAYYY 2300 | RW10C 725 | [VI leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**I10L** — ILS RWY 10L

- **GIBNS:** GIBNS | ARIST >=9000 | KALZO >=8000 | BURKE >=7000 | SYSCO >=6000 | PRATT >=5000
- **(final):** PRATT 5000 | CARLE >=4000 | BUGSE 2300 | RW10L 728 | [VI leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**I10RY** — ILS RWY 10RY

- **GIBNS:** GIBNS | FERLL >=9000 | MLSEN >=8000 | OLLGA >=7000 | LEATH >=6000 | GOOZY >=5000
- **(final):** GOOZY 5000 | KVENN >=4000 | FLLYN 2300 | CFLCC 735 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**I10RZ** — ILS RWY 10RZ

- **GIBNS:** GIBNS | SAFLY >=9000 | POPOF >=8000 | DAYZE >=7000 | BNITO >=6000 | BOOTR >=5000
- **(final):** BOOTR 5000 | NIRRA >=4000 | KUULA 2300 | RW10R 735 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**I22L** — ILS RWY 22L

- **(final):** KENIL 4000 | LAIKE 2500 | RW22L 710 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**I22R** — ILS RWY 22R

- **FNUCH:** FNUCH >=7000 | NOLEN >=5000
- **(final):** NOLEN 5000 | RIDGE 2200 | RW22R 697 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**I27C** — ILS RWY 27C

- **VOGLR:** VOGLR | NCHLS >=9000 | CRICO >=8000 | CERMI >=7000 | BOOWW >=6000 | MRRFF >=5000
- **(final):** MRRFF 5000 | JMBBO >=4000 | DRSCL 2200 | RW27C 708 | [CA leg - not a fix] | [VI leg - not a fix] | UKUNE >=4000 | UKUNE >=4000  *(2 non-fix legs)*

**I27L** — ILS RWY 27L

- **VOGLR:** VOGLR | NRMAH >=9000 | JOEBO >=8000 | GRABL >=7000 | RIPPR >=6000 | BASHH >=5000
- **(final):** BASHH 5000 | EBENS >=4000 | JLOWW 2200 | RW27L 707 | [CA leg - not a fix] | [VI leg - not a fix] | WASCO >=4000 | WASCO >=4000  *(2 non-fix legs)*

**I27R** — ILS RWY 27R

- **VOGLR:** VOGLR | VINYY >=9000 | JOKKR >=8000 | IYLEK >=7000 | WELEV >=6000 | HAREE >=5000
- **(final):** HAREE 5000 | BONZO >=4000 | SIBLY 2200 | RW27R 719 | [CA leg - not a fix] | OBK >=4000 | OBK >=4000  *(1 non-fix leg)*

**I28C** — ILS RWY 28C

- **VOGLR:** VOGLR | LNDUH >=9000 | SNTOE >=8000 | KOENN >=7000 | MEMAW >=6000 | RZUKO >=5000
- **(final):** RZUKO 5000 | HAZIL >=4000 | SEIKA 2300 | RW28C 705 | [CA leg - not a fix] | [VI leg - not a fix] | DPA >=4000 | DPA >=4000  *(2 non-fix legs)*

**I28L** — ILS RWY 28L

- **VOGLR:** VOGLR | LYSIN >=9000 | KEGNE >=8000 | JAVON >=7000 | HANSO >=6000 | FITAR >=5000
- **(final):** FITAR 5000 | CAKOS >=4000 | PONCC 2200 | RW28L 713 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**I28R** — ILS RWY 28R

- **VOGLR:** VOGLR | MOTTT >=9000 | RICKV >=8000 | BLUTO >=7000 | ROCSE >=6000 | WAVIE >=5000
- **(final):** WAVIE 5000 | ADAME >=4000 | WILLT 2200 | RW28R 705 | [CA leg - not a fix] | [VI leg - not a fix] | DPA >=4000 | DPA >=4000  *(2 non-fix legs)*

**L04R** — LOC RWY 04R

- **RAHNN:** RAHNN >=11000 | DEGAN >=8000 | HARRL >=5000
- **(final):** HARRL >=5000 | NAPER >=4000 | REKKS >=2200 | RW04R 713 | [CA leg - not a fix] | [VI leg - not a fix] | LAIRD >=4000 | LAIRD >=4000  *(2 non-fix legs)*

**L09C** — LOC RWY 09C

- **GIBNS:** GIBNS | NORDL >=9000 | KOOSS >=8000 | SIKLR >=7000 | MUELL >=6000 | FFRAN >=5000
- **(final):** FFRAN >=5000 | MIETH >=4000 | EZELL >=2300 | RANDI >=1400 | RW09C 728 | [CA leg - not a fix] | [VI leg - not a fix] | DEERE >=4000 | DEERE >=4000  *(2 non-fix legs)*

**L09L** — LOC RWY 09L

- **GIBNS:** GIBNS | JHONN >=9000 | ESSSS >=8000 | VNDER >=7000 | ILIUM >=6000 | TRYXI >=5000
- **(final):** TRYXI >=5000 | DOOGY >=4000 | ZENAH >=2300 | OGSIE >=1760 | RW09L 723 | [CA leg - not a fix] | OBK >=4000 | OBK >=4000  *(1 non-fix leg)*

**L09R** — LOC RWY 09R

- **GIBNS:** GIBNS | ADLMN >=9000 | FOTTR >=8000 | WASCO >=7000 | GEMMS >=6000 | CHILR >=5000
- **(final):** CHILR >=5000 | DEVON >=4000 | MEOWW >=2300 | YONUT >=1380 | RW09R 726 | [CA leg - not a fix] | [VI leg - not a fix] | GRABL >=4000 | GRABL >=4000  *(2 non-fix legs)*

**L10C** — LOC RWY 10C

- **GIBNS:** GIBNS | BAIRY >=9000 | COUPR >=8000 | KYLAA >=7000 | PEPAW >=6000 | SHARN >=5000
- **(final):** SHARN >=5000 | RRUDA >=4000 | RAYYY >=2300 | ZURSO >=1220 | RW10C 725 | [VI leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**L10L** — LOC RWY 10L

- **GIBNS:** GIBNS | ARIST >=9000 | KALZO >=8000 | BURKE >=7000 | SYSCO >=6000 | PRATT >=5000
- **(final):** PRATT >=5000 | CARLE >=4000 | BUGSE >=2300 | POPME >=1200 | RW10L 728 | [VI leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**L10RY** — LOC RWY 10RY

- **GIBNS:** GIBNS | FERLL >=9000 | MLSEN >=8000 | OLLGA >=7000 | LEATH >=6000 | GOOZY >=5000
- **(final):** GOOZY >=5000 | KVENN >=4000 | FLLYN >=2300 | TRUFL >=1220 | WUGIX 864 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**L10RZ** — LOC RWY 10RZ

- **GIBNS:** GIBNS | SAFLY >=9000 | POPOF >=8000 | DAYZE >=7000 | BNITO >=6000 | BOOTR >=5000
- **(final):** BOOTR >=5000 | NIRRA >=4000 | KUULA >=2300 | ALYEA >=1220 | RW10R 735 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**L22L** — LOC RWY 22L

- **(final):** KENIL >=4000 | LAIKE >=2500 | RW22L 710 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**L22R** — LOC RWY 22R

- **FNUCH:** FNUCH >=7000 | NOLEN >=5000
- **(final):** NOLEN >=5000 | RIDGE >=2200 | PALIE >=1220 | RW22R 697 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**L27C** — LOC RWY 27C

- **VOGLR:** VOGLR | NCHLS >=9000 | CRICO >=8000 | CERMI >=7000 | BOOWW >=6000 | MRRFF >=5000
- **(final):** MRRFF >=5000 | JMBBO >=4000 | DRSCL >=2200 | YVONE >=1160 | RW27C 708 | [CA leg - not a fix] | [VI leg - not a fix] | UKUNE >=4000 | UKUNE >=4000  *(2 non-fix legs)*

**L27L** — LOC RWY 27L

- **VOGLR:** VOGLR | NRMAH >=9000 | JOEBO >=8000 | GRABL >=7000 | RIPPR >=6000 | BASHH >=5000
- **(final):** BASHH >=5000 | EBENS >=4000 | JLOWW >=2200 | ZOSRO >=1160 | RW27L 707 | [CA leg - not a fix] | [VI leg - not a fix] | WASCO >=4000 | WASCO >=4000  *(2 non-fix legs)*

**L27R** — LOC RWY 27R

- **VOGLR:** VOGLR | VINYY >=9000 | JOKKR >=8000 | IYLEK >=7000 | WELEV >=6000 | HAREE >=5000
- **(final):** HAREE >=5000 | BONZO >=4000 | SIBLY >=2200 | RW27R 719 | [CA leg - not a fix] | OBK >=4000 | OBK >=4000  *(1 non-fix leg)*

**L28C** — LOC RWY 28C

- **VOGLR:** VOGLR | LNDUH >=9000 | SNTOE >=8000 | KOENN >=7000 | MEMAW >=6000 | RZUKO >=5000
- **(final):** RZUKO >=5000 | HAZIL >=4000 | SEIKA >=2300 | ZUPTI >=1200 | RW28C 705 | [CA leg - not a fix] | [VI leg - not a fix] | DPA >=4000 | DPA >=4000  *(2 non-fix legs)*

**L28L** — LOC RWY 28L

- **VOGLR:** VOGLR | LYSIN >=9000 | KEGNE >=8000 | JAVON >=7000 | HANSO >=6000 | FITAR >=5000
- **(final):** FITAR >=5000 | CAKOS >=4000 | PONCC >=2200 | ALKYL >=1240 | RW28L 713 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**L28R** — LOC RWY 28R

- **VOGLR:** VOGLR | MOTTT >=9000 | RICKV >=8000 | BLUTO >=7000 | ROCSE >=6000 | WAVIE >=5000
- **(final):** WAVIE >=5000 | ADAME >=4000 | WILLT >=2200 | RW28R 705 | [CA leg - not a fix] | [VI leg - not a fix] | DPA >=4000 | DPA >=4000  *(2 non-fix legs)*

**R04R** — RNAV (GPS) RWY 04R

- **SIRCO:** SIRCO >=8000 | LIARR >=7000 | HEALY >=5000
- **(final):** HEALY >=5000 | BTKUS >=4000 | FORTZ >=2200 | FORTZ | RW04R 713 | [CA leg - not a fix] | LAIRD >=4000 | LAIRD >=4000  *(1 non-fix leg)*

**R09C** — RNAV (GPS) RWY 09C

- **GIBNS:** GIBNS | NORDL >=9000 | KOOSS >=8000 | SIKLR >=7000 | MUELL >=6000 | FFRAN >=5000/230
- **(final):** FFRAN >=5000 | MIETH >=4000 | EZELL >=2300 | EZELL | RANDI 1400 | RW09C 728 | [CA leg - not a fix] | DEERE >=4000 | DEERE >=4000  *(1 non-fix leg)*

**R09L** — RNAV (GPS) RWY 09L

- **GIBNS:** GIBNS | JHONN >=9000 | ESSSS >=8000 | VNDER >=7000 | ILIUM >=6000 | TRYXI >=5000
- **(final):** TRYXI >=5000 | DOOGY >=4000 | ZENAH >=2300 | ZENAH | OGSIE 1760 | RW09L 723 | [CA leg - not a fix] | OBK >=4000 | OBK >=4000  *(1 non-fix leg)*

**R09R** — RNAV (GPS) RWY 09R

- **GIBNS:** GIBNS | ADLMN >=9000 | FOTTR >=8000 | WASCO >=7000 | GEMMS >=6000/230 | CHILR >=5000
- **(final):** CHILR >=5000/230 | DEVON >=4000 | MEOWW >=2300 | MEOWW | YONUT 1380 | RW09R 726 | [CA leg - not a fix] | GRABL >=4000 | GRABL >=4000  *(1 non-fix leg)*

**R10C** — RNAV (GPS) RWY 10C

- **GIBNS:** GIBNS | BAIRY >=9000 | COUPR >=8000 | KYLAA >=7000 | PEPAW >=6000 | SHARN >=5000
- **(final):** SHARN >=5000 | RRUDA >=4000 | RAYYY >=2300 | RAYYY | ZURSO 1220 | RW10C 725 | [CA leg - not a fix] | AGZED | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**R10L** — RNAV (GPS) RWY 10L

- **GIBNS:** GIBNS | ARIST >=9000 | KALZO >=8000 | BURKE >=7000 | SYSCO >=6000 | PRATT >=5000
- **(final):** PRATT >=5000 | CARLE >=4000 | BUGSE >=2300 | BUGSE | ANACO 1580 | RW10L 728 | [CA leg - not a fix] | XURXU | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**R10RY** — RNAV (GPS) RWY 10RY

- **GIBNS:** GIBNS | FERLL >=9000 | MLSEN >=8000 | OLLGA >=7000 | LEATH >=6000 | GOOZY >=5000
- **(final):** GOOZY >=5000 | KVENN >=4000 | FLLYN >=2300 | FLLYN | TRUFL 1300 | CFLCC 735 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**R10RZ** — RNAV (GPS) RWY 10RZ

- **GIBNS:** GIBNS | SAFLY >=9000 | POPOF >=8000 | DAYZE >=7000 | BNITO >=6000 | BOOTR >=5000
- **(final):** BOOTR >=5000 | NIRRA >=4000 | KUULA >=2300 | KUULA | ALYEA 1300 | RW10R 735 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**R22L** — RNAV (GPS) RWY 22L

- **(final):** KENIL >=4000 | LAIKE >=2500 | LAIKE | RW22L 710 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**R22R** — RNAV (GPS) RWY 22R

- **FNUCH:** FNUCH >=7000 | NOLEN >=5000
- **(final):** NOLEN >=5000 | RIDGE >=2200 | RIDGE | PALIE 1200 | RW22R 697 | [CA leg - not a fix] | EVRSN | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**R27C** — RNAV (GPS) RWY 27C

- **VOGLR:** VOGLR | NCHLS >=9000 | CRICO >=8000 | CERMI >=7000 | BOOWW >=6000 | MRRFF >=5000/230
- **(final):** MRRFF >=5000 | JMBBO >=4000 | DRSCL >=2200 | DRSCL | YVONE 1160 | RW27C 708 | [CA leg - not a fix] | UKUNE >=4000 | UKUNE >=4000  *(1 non-fix leg)*

**R27LZ** — RNAV (GPS) RWY 27LZ

- **VOGLR:** VOGLR | NRMAH >=9000 | JOEBO >=8000 | GRABL >=7000 | RIPPR >=6000 | BASHH >=5000/230
- **(final):** BASHH >=5000/230 | EBENS >=4000 | JLOWW >=2200 | JLOWW | RW27L 707 | [CA leg - not a fix] | WASCO >=4000 | WASCO >=4000  *(1 non-fix leg)*

**R27R** — RNAV (GPS) RWY 27R

- **VOGLR:** VOGLR | VINYY >=9000 | JOKKR >=8000 | IYLEK >=7000 | WELEV >=6000 | HAREE >=5000
- **(final):** HAREE >=5000 | BONZO >=4000 | SIBLY >=2200 | SIBLY | RW27R 718 | [CA leg - not a fix] | OBK >=4000 | OBK >=4000  *(1 non-fix leg)*

**R28C** — RNAV (GPS) RWY 28C

- **VOGLR:** VOGLR | LNDUH >=9000 | SNTOE >=8000 | KOENN >=7000 | MEMAW >=6000 | RZUKO >=5000
- **(final):** RZUKO >=5000 | HAZIL >=4000 | SEIKA >=2300 | SEIKA | ZUPTI 1260 | RW28C 705 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

**R28LY** — RNAV (GPS) RWY 28LY

- **VOGLR:** VOGLR | SYNTH >=9000 | TAGPE >=8000 | UCXOR >=7000 | VIOLS >=6000 | WODRO >=5000
- **(final):** WODRO >=5000 | XOGDY >=4000 | YOYUK >=2200 | YOYUK | CFDZQ 713 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**R28LZ** — RNAV (GPS) RWY 28LZ

- **VOGLR:** VOGLR | LYSIN >=9000 | KEGNE >=8000 | JAVON >=7000 | HANSO >=6000 | FITAR >=5000
- **(final):** FITAR >=5000 | CAKOS >=4000 | PONCC >=2200 | PONCC | ALKYL 1280 | RW28L 713 | [CA leg - not a fix] | CGT >=4000 | CGT >=4000  *(1 non-fix leg)*

**R28R** — RNAV (GPS) RWY 28R

- **VOGLR:** VOGLR | MOTTT >=9000 | RICKV >=8000 | BLUTO >=7000 | ROCSE >=6000 | WAVIE >=5000
- **(final):** WAVIE >=5000 | ADAME >=4000 | WILLT >=2200 | WILLT | FIDAK 1140 | RW28R 705 | [CA leg - not a fix] | DPA >=4000 | DPA >=4000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`VOGLR`, `RAHNN`, `GIBNS`, `FNUCH`, `SIRCO`

### Fix coordinates

- **VOGLR** N41 56.70 / W86 55.12 -- `41.94500, -86.91861`
- **NRMAH** N41 58.94 / W87 18.10 -- `41.98238, -87.30165`
- **JOEBO** N41 58.96 / W87 22.31 -- `41.98272, -87.37182`
- **GRABL** N41 58.98 / W87 26.52 -- `41.98302, -87.44199`
- **RIPPR** N41 59.00 / W87 30.73 -- `41.98327, -87.51216`
- **BASHH** N41 59.01 / W87 34.94 -- `41.98348, -87.58233`
- **EBENS** N41 59.02 / W87 39.15 -- `41.98365, -87.65251`
- **TAFFS** N41 59.03 / W87 47.13 -- `41.98385, -87.78547`
- **RW27L** N26 50.61 / W80 12.82 -- `26.84348, -80.21372`
- **WASCO** N41 58.97 / W88 22.30 -- `41.98289, -88.37172`
- **RAHNN** N41 34.81 / W88 20.29 -- `41.58018, -88.33812`
- **DEGAN** N41 41.01 / W88 13.04 -- `41.68347, -88.21739`
- **HARRL** N41 47.09 / W88 05.90 -- `41.78486, -88.09834`
- **NAPER** N41 49.45 / W88 03.12 -- `41.82422, -88.05203`
- **REKKS** N41 53.91 / W87 57.86 -- `41.89851, -87.96432`
- **RW04R** N64 32.75 / W149 04.97 -- `64.54576, -149.08275`
- **LAIRD** N41 59.01 / W87 35.62 -- `41.98352, -87.59370`
- **GIBNS** N41 55.13 / W88 57.63 -- `41.91888, -88.96058`
- **NORDL** N41 59.20 / W88 30.72 -- `41.98661, -88.51208`
- **KOOSS** N41 59.22 / W88 26.51 -- `41.98697, -88.44191`
- **SIKLR** N41 59.24 / W88 22.30 -- `41.98729, -88.37173`
- **MUELL** N41 59.25 / W88 18.09 -- `41.98756, -88.30156`
- **FFRAN** N41 59.27 / W88 13.88 -- `41.98779, -88.23138`
- **MIETH** N41 59.28 / W88 09.67 -- `41.98798, -88.16121`
- **EZELL** N41 59.29 / W88 02.51 -- `41.98821, -88.04188`
- **RW09C** N41 59.30 / W87 55.89 -- `41.98830, -87.93157`
- **DEERE** N42 11.95 / W87 36.23 -- `42.19913, -87.60390`
- **JHONN** N42 00.07 / W88 30.73 -- `42.00125, -88.51209`
- **ESSSS** N42 00.10 / W88 26.52 -- `42.00160, -88.44193`
- **VNDER** N42 00.11 / W88 22.31 -- `42.00190, -88.37176`
- **ILIUM** N42 00.13 / W88 18.09 -- `42.00216, -88.30158`
- **TRYXI** N42 00.15 / W88 13.89 -- `42.00243, -88.23157`
- **DOOGY** N42 00.16 / W88 09.68 -- `42.00259, -88.16127`
- **ZENAH** N42 00.17 / W88 02.24 -- `42.00278, -88.03737`
- **RW09L** N26 50.95 / W80 13.82 -- `26.84918, -80.23033`
- **OBK** N42 13.28 / W87 57.10 -- `42.22138, -87.95167`
- **ADLMN** N41 58.93 / W88 30.72 -- `41.98222, -88.51207`
- **FOTTR** N41 58.95 / W88 26.51 -- `41.98258, -88.44189`
- **GEMMS** N41 58.99 / W88 18.09 -- `41.98317, -88.30155`
- **CHILR** N41 59.00 / W88 13.88 -- `41.98340, -88.23137`
- **DEVON** N41 59.01 / W88 09.67 -- `41.98358, -88.16121`
- **MEOWW** N41 59.03 / W88 02.52 -- `41.98380, -88.04204`
- **RW09R** N26 50.55 / W80 13.61 -- `26.84252, -80.22686`
- **BAIRY** N41 57.79 / W88 30.71 -- `41.96318, -88.51176`
- **COUPR** N41 57.82 / W88 26.50 -- `41.96364, -88.44163`
- **KYLAA** N41 57.84 / W88 22.29 -- `41.96406, -88.37149`
- **PEPAW** N41 57.87 / W88 18.08 -- `41.96443, -88.30136`
- **SHARN** N41 57.89 / W88 13.89 -- `41.96476, -88.23145`
- **RRUDA** N41 57.90 / W88 09.68 -- `41.96505, -88.16131`
- **RAYYY** N41 57.93 / W88 02.52 -- `41.96545, -88.04205`
- **RW10C** N41 57.94 / W87 55.89 -- `41.96570, -87.93152`
- **CGT** N41 30.60 / W87 34.29 -- `41.51001, -87.57155`
- **ARIST** N41 57.99 / W88 30.71 -- `41.96647, -88.51177`
- **KALZO** N41 58.02 / W88 26.50 -- `41.96693, -88.44164`
- **BURKE** N41 58.04 / W88 22.29 -- `41.96735, -88.37151`
- **SYSCO** N41 58.06 / W88 18.08 -- `41.96773, -88.30137`
- **PRATT** N41 58.08 / W88 13.89 -- `41.96806, -88.23146`
- **CARLE** N41 58.10 / W88 09.68 -- `41.96835, -88.16132`
- **BUGSE** N41 58.12 / W88 02.51 -- `41.96874, -88.04183`
- **RW10L** N40 56.89 / W80 52.13 -- `40.94824, -80.86887`
- **FERLL** N41 56.15 / W88 30.71 -- `41.93591, -88.51176`
- **MLSEN** N41 56.32 / W88 26.50 -- `41.93866, -88.44163`
- **OLLGA** N41 56.48 / W88 22.29 -- `41.94137, -88.37149`
- **LEATH** N41 56.64 / W88 18.08 -- `41.94403, -88.30136`
- **GOOZY** N41 56.80 / W88 13.89 -- `41.94664, -88.23145`
- **KVENN** N41 56.95 / W88 09.68 -- `41.94922, -88.16131`
- **FLLYN** N41 57.22 / W88 02.25 -- `41.95367, -88.03754`
- **CFLCC** N41 57.45 / W87 55.67 -- `41.95749, -87.92788`
- **DPA** N41 53.42 / W88 21.01 -- `41.89037, -88.35018`
- **SAFLY** N41 57.28 / W88 30.72 -- `41.95469, -88.51196`
- **POPOF** N41 57.31 / W88 26.51 -- `41.95515, -88.44179`
- **DAYZE** N41 57.33 / W88 22.30 -- `41.95556, -88.37161`
- **BNITO** N41 57.36 / W88 18.09 -- `41.95594, -88.30144`
- **BOOTR** N41 57.38 / W88 13.87 -- `41.95627, -88.23119`
- **NIRRA** N41 57.39 / W88 09.66 -- `41.95656, -88.16094`
- **KUULA** N41 57.42 / W88 02.26 -- `41.95696, -88.03764`
- **RW10R** N40 56.87 / W80 51.95 -- `40.94787, -80.86587`
- **KENIL** N42 06.87 / W87 42.47 -- `42.11448, -87.70776`
- **LAIKE** N42 02.41 / W87 47.78 -- `42.04009, -87.79640`
- **RW22L** N64 32.91 / W149 04.32 -- `64.54855, -149.07198`
- **FNUCH** N42 16.80 / W87 34.94 -- `42.27995, -87.58230`
- **NOLEN** N42 11.48 / W87 40.88 -- `42.19133, -87.68125`
- **RIDGE** N42 03.49 / W87 49.75 -- `42.05824, -87.82921`
- **RW22R** N64 33.13 / W149 03.72 -- `64.55209, -149.06202`
- **NCHLS** N41 59.21 / W87 18.10 -- `41.98679, -87.30160`
- **CRICO** N41 59.23 / W87 22.31 -- `41.98713, -87.37178`
- **CERMI** N41 59.25 / W87 26.52 -- `41.98743, -87.44195`
- **BOOWW** N41 59.26 / W87 30.73 -- `41.98768, -87.51213`
- **MRRFF** N41 59.27 / W87 34.94 -- `41.98789, -87.58230`
- **JMBBO** N41 59.28 / W87 39.15 -- `41.98806, -87.65248`
- **DRSCL** N41 59.30 / W87 47.13 -- `41.98826, -87.78553`
- **RW27C** N41 59.30 / W87 53.41 -- `41.98831, -87.89021`
- **UKUNE** N42 09.50 / W88 11.94 -- `42.15834, -88.19906`
- **JLOWW** N41 59.03 / W87 47.12 -- `41.98385, -87.78538`
- **VINYY** N42 00.08 / W87 18.08 -- `42.00127, -87.30135`
- **JOKKR** N42 00.10 / W87 22.29 -- `42.00162, -87.37152`
- **IYLEK** N42 00.12 / W87 26.50 -- `42.00192, -87.44169`
- **WELEV** N42 00.13 / W87 30.71 -- `42.00218, -87.51187`
- **HAREE** N42 00.14 / W87 34.92 -- `42.00238, -87.58205`
- **BONZO** N42 00.15 / W87 39.14 -- `42.00250, -87.65234`
- **SIBLY** N42 00.17 / W87 47.70 -- `42.00276, -87.79508`
- **RW27R** N26 51.00 / W80 13.14 -- `26.84999, -80.21908`
- **LNDUH** N41 57.91 / W87 18.10 -- `41.96510, -87.30165`
- **SNTOE** N41 57.92 / W87 22.31 -- `41.96534, -87.37178`
- **KOENN** N41 57.93 / W87 26.52 -- `41.96553, -87.44192`
- **MEMAW** N41 57.94 / W87 30.72 -- `41.96568, -87.51206`
- **RZUKO** N41 57.95 / W87 34.93 -- `41.96579, -87.58220`
- **HAZIL** N41 57.95 / W87 39.14 -- `41.96586, -87.65235`
- **SEIKA** N41 57.95 / W87 46.80 -- `41.96587, -87.77993`
- **RW28C** N41 57.95 / W87 53.51 -- `41.96577, -87.89181`
- **LYSIN** N41 57.40 / W87 18.10 -- `41.95663, -87.30170`
- **KEGNE** N41 57.41 / W87 22.31 -- `41.95687, -87.37183`
- **JAVON** N41 57.42 / W87 26.52 -- `41.95706, -87.44195`
- **HANSO** N41 57.43 / W87 30.73 -- `41.95721, -87.51209`
- **FITAR** N41 57.44 / W87 34.93 -- `41.95731, -87.58222`
- **CAKOS** N41 57.44 / W87 39.14 -- `41.95737, -87.65236`
- **PONCC** N41 57.44 / W87 47.76 -- `41.95736, -87.79598`
- **RW28L** N40 56.87 / W80 51.40 -- `40.94787, -80.85664`
- **MOTTT** N41 58.10 / W87 18.10 -- `41.96835, -87.30166`
- **RICKV** N41 58.12 / W87 22.31 -- `41.96859, -87.37179`
- **BLUTO** N41 58.13 / W87 26.52 -- `41.96879, -87.44192`
- **ROCSE** N41 58.14 / W87 30.72 -- `41.96895, -87.51207`
- **WAVIE** N41 58.14 / W87 34.93 -- `41.96907, -87.58221`
- **ADAME** N41 58.15 / W87 39.14 -- `41.96914, -87.65236`
- **WILLT** N41 58.15 / W87 46.73 -- `41.96916, -87.77883`
- **RW28R** N40 56.89 / W80 51.45 -- `40.94822, -80.85750`
- **RANDI** N41 59.30 / W87 58.72 -- `41.98828, -87.97872`
- **OGSIE** N42 00.17 / W88 00.03 -- `42.00280, -88.00044`
- **YONUT** N41 59.03 / W87 58.73 -- `41.98387, -87.97878`
- **ZURSO** N41 57.94 / W87 58.04 -- `41.96563, -87.96727`
- **POPME** N41 58.14 / W87 57.90 -- `41.96893, -87.96504`
- **TRUFL** N41 57.37 / W87 58.08 -- `41.95611, -87.96804`
- **WUGIX** N41 57.43 / W87 56.21 -- `41.95718, -87.93691`
- **ALYEA** N41 57.43 / W87 58.08 -- `41.95712, -87.96807`
- **PALIE** N42 01.16 / W87 52.33 -- `42.01941, -87.87219`
- **YVONE** N41 59.30 / W87 51.51 -- `41.98831, -87.85844`
- **ZOSRO** N41 59.03 / W87 51.50 -- `41.98389, -87.85836`
- **ZUPTI** N41 57.95 / W87 51.10 -- `41.96582, -87.85160`
- **ALKYL** N41 57.44 / W87 51.60 -- `41.95730, -87.86008`
- **SIRCO** N41 37.90 / W88 16.68 -- `41.63171, -88.27796`
- **LIARR** N41 40.74 / W88 13.36 -- `41.67892, -88.22272`
- **HEALY** N41 45.92 / W88 07.27 -- `41.76541, -88.12123`
- **BTKUS** N41 48.52 / W88 04.22 -- `41.80863, -88.07038`
- **FORTZ** N41 53.70 / W87 58.11 -- `41.89500, -87.96846`
- **AGZED** N41 57.95 / W87 49.11 -- `41.96586, -87.81846`
- **ANACO** N41 58.13 / W87 59.51 -- `41.96887, -87.99186`
- **XURXU** N41 58.15 / W87 49.22 -- `41.96914, -87.82025`
- **EVRSN** N41 56.69 / W87 57.28 -- `41.94477, -87.95462`
- **SYNTH** N41 56.26 / W87 18.14 -- `41.93760, -87.30238`
- **TAGPE** N41 56.41 / W87 22.34 -- `41.94010, -87.37241`
- **UCXOR** N41 56.55 / W87 26.55 -- `41.94256, -87.44244`
- **VIOLS** N41 56.70 / W87 30.75 -- `41.94497, -87.51248`
- **WODRO** N41 56.83 / W87 34.95 -- `41.94725, -87.58251`
- **XOGDY** N41 56.98 / W87 39.15 -- `41.94960, -87.65257`
- **YOYUK** N41 57.26 / W87 47.76 -- `41.95427, -87.79606`
- **CFDZQ** N41 57.45 / W87 54.02 -- `41.95755, -87.90027`
- **FIDAK** N41 58.15 / W87 51.15 -- `41.96911, -87.85245`

## KMDW

### STARs

- **CHUMP:** CHUMP 17 - FL210 | HEDOC | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **DARKK:** DARKK FL310 | BURUU FL240 - FL290 | ILIAD | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **EDENS:** EDENS FL190 - FL210 | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **FUDDD:** FUDDD FL310 | BOOKK FL240 - FL290 | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **IRK:** IRK | ENNZO | FUDDD FL310 | BOOKK FL240 - FL290 | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **JALAP:** JALAP | KAMBL FL240 - FL270 | MIGGS FL210 - FL230 | EDENS FL190 - FL210 | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **KAMBL:** KAMBL FL240 - FL270 | MIGGS FL210 - FL230 | EDENS FL190 - FL210 | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **LLVSS:** LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **MAGOO:** MAGOO | DARKK FL310 | BURUU FL240 - FL290 | ILIAD | LLVSS FL190 - FL210 | PEALE 16 - FL190 | TOLCA 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **NANEE:** NANEE 14 - 16 | MMEGG <=9 | ENDEE 6 - 7/250
- **OHHMY:** OHHMY | UGGLY FL240 | JNSNN FL240 | AGONY FL210 - FL230 | FARCE | CHUMP 17 - FL210 | HEDOC | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **PHEEB:** PHEEB | POOGY FL240 | DAJON <=FL230 | NANEE 14 - 16 | MMEGG <=9 | ENDEE 6 - 7/250
- **POOGY:** POOGY FL240 | DAJON <=FL230 | NANEE 14 - 16 | MMEGG <=9 | ENDEE 6 - 7/250
- **UGGLY:** UGGLY FL240 | JNSNN FL240 | AGONY FL210 - FL230 | FARCE | CHUMP 17 - FL210 | HEDOC | PURTY 15 - FL190 | OCCHO 14 - 16 | KOOKS 10 - 13 | JILLZ 10 | TMRAA | ENDEE 6 - 7/250
- **(final):** ENDEE 6 - 7/250 | STKNY 6
- **RW04R:** STKNY 6 | ALQUE 6 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW13L:** STKNY 6 | GORLC | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22L:** STKNY 6 | PKACH 6 | TUURN | WADLL | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW31R:** STKNY 6 | WNNRS | GAGGA | [FM leg - not a fix]  *(1 non-fix leg)*
- **DROSE:** DROSE | TROLY | GOTNE | FISSK 11
- **(final):** FISSK 11 | VEECK | OZZEY | AZUMO | HALIE 6
- **RW04R:** HALIE 6 | OLCYK >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW13L:** HALIE 6 | TINLY >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22L:** HALIE 6 | GERMN >=4 | LNANE | BOCAH | TACTT 3
- **RW31R:** HALIE 6 | ELLJO 6 | HILLS 5/240
- **ASHEN:** ASHEN | FNLYY FL240 | BAGEL | PANGG
- **BAGEL:** BAGEL | PANGG
- **FWA:** FWA | MAKKI FL240 | BAGEL | PANGG
- **LLTCH:** LLTCH | BRTTN FL240 | BAGEL | PANGG
- **(final):** PANGG | MEGGZ 11 | AWSUM 10 | IROCK | HALIE 6
- **RW04R:** HALIE 6 | OLCYK >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW13L:** HALIE 6 | TINLY >=4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **RW22L:** HALIE 6 | GERMN >=4 | LNANE | BOCAH | TACTT 3
- **RW31R:** HALIE 6 | ELLJO 6 | HILLS 5/240

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

**None coded.** A radar-vector or conventional departure is outside what CIFP
carries, so this is a coding gap rather than an absence of departures.

### Approaches


**H04RY** — RNAV (RNP) RWY 04RY

- **ALQUE:** ALQUE 6000 | BANER >=5000 | CADON >=4000 | CITGO >=2400 | YIPEE >=1700
- **OLCYK:** OLCYK >=4000 | SAVRD 4000 | HILND >=2700/210 | YIPEE >=1700
- **(final):** YIPEE >=1700 | YIPEE 0/1 | RW04R 669 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**H13LY** — RNAV (RNP) RWY 13LY

- **PLOPP:** PLOPP 4000/210 | YUCAN 3000 | JUPIR 2000
- **TINLY:** TINLY | OOPLA 4000 | GIKLE 2500 | JUPIR 2000/210
- **ZABNU:** ZABNU 4000 | TOYUL 3000 | GIKLE 2500 | JUPIR 2000/210
- **(final):** JUPIR 2000/210 | NIDEE >=2000 | NIDEE 0/1 | DULTE | RW13L 654 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**H22LX** — RNAV (RNP) RWY 22LX

- **PKACH:** PKACH 6000 | MIING 4000/230
- **(final):** MIING 4000/230 | FENCK 4000/210 | ZASIV >=2900/180 | EGLUQ >=1900 | YACHT >=1500 | YACHT 0/1 | RW22L 656 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**H22LY** — RNAV (RNP) RWY 22LY

- **STERE:** STERE >=3000 | TACTT 3000 | SAILZ 3000/210
- **TACTT:** TACTT 3000 | SAILZ 3000/210
- **(final):** SAILZ 3000/210 | DXXON 3000 | MNDOE >=2400 | JIBBB >=1900 | YACHT >=1500 | YACHT 0/1 | RW22L 656 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**H31RY** — RNAV (RNP) RWY 31RY

- **HILLS:** HILLS 5000/240 | GLEAM >=4000 | RUNTS >=2500 | HOBEL >=1700
- **TWEEN:** TWEEN 4000/210 | PRIUS >=2900 | HOBEL >=1700
- **(final):** HOBEL >=1700 | HOBEL 0/1 | RW31R 660 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**I04R** — ILS RWY 04R

- **ALQUE:** ALQUE 6000 | BANER >=5000 | CADON >=4000
- **(final):** CADON 4000 | CITGO 2400 | RW04R 669 | [CA leg - not a fix] | [VI leg - not a fix] | IGECY 2100 | EON >=2600 | EON >=2600  *(2 non-fix legs)*

**I13L** — ILS RWY 13L

- **DPA:** DPA >=2600 | HEBKU >=2600
- **(final):** HEBKU 2600 | HITOB 2000 | RW13L 654 | [CA leg - not a fix] | [VI leg - not a fix] | IGECY 2300 | EON >=2600 | EON >=2600  *(2 non-fix legs)*

**I31R** — ILS RWY 31R

- **HILLS:** HILLS 5000/240 | GLEAM >=4000
- **(final):** GLEAM 4000 | RUNTS >=2500 | HOBEL 1700 | RW31R 660 | [CA leg - not a fix] | [VI leg - not a fix] | IGECY 2100 | EON >=2600 | EON >=2600  *(2 non-fix legs)*

**L04R** — LOC RWY 04R

- **ALQUE:** ALQUE 6000 | BANER >=5000 | CADON >=4000
- **(final):** CADON >=4000 | CITGO >=2400 | OLOXE >=1460 | RW04R 669 | [CA leg - not a fix] | [VI leg - not a fix] | IGECY 2100 | EON >=2600 | EON >=2600  *(2 non-fix legs)*

**L13L** — LOC RWY 13L

- **DPA:** DPA >=2600 | HEBKU >=2600
- **(final):** HEBKU >=2600 | HITOB >=2000 | HISKO >=1440 | RW13L 654 | [CA leg - not a fix] | [VI leg - not a fix] | IGECY 2300 | EON >=2600 | EON >=2600  *(2 non-fix legs)*

**L31R** — LOC RWY 31R

- **HILLS:** HILLS 5000/240 | GLEAM >=4000
- **(final):** GLEAM >=4000 | RUNTS >=2500 | HOBEL >=1700 | RW31R 660 | [CA leg - not a fix] | [VI leg - not a fix] | IGECY 2100 | EON >=2600 | EON >=2600  *(2 non-fix legs)*

**R04RZ** — RNAV (GPS) RWY 04RZ

- **JOT:** JOT | ALQUE 6000
- **WUPOR:** WUPOR | ALQUE 6000
- **(final):** ALQUE 6000 | BANER >=5000 | CADON >=4000 | CITGO >=2400 | CITGO | OLOXE 1460 | RW04R 669 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**R13LZ** — RNAV (GPS) RWY 13LZ

- **TOYUL:** TOYUL 3000 | GIKLE 2500 | AAMEE 2300/180
- **(final):** AAMEE 2300/180 | RUDDY 2000 | NAANN >=1600 | NAANN | HHALL 1280 | RW13L 654 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**R22LZ** — RNAV (GPS) RWY 22LZ

- **STERE:** STERE | TACTT 3000 | SAILZ 3000/210
- **TACTT:** TACTT 3000 | SAILZ 3000/210
- **(final):** SAILZ 3000/210 | DXXON 3000 | MNDOE >=2500/170 | MNDOE | ZUDVI 1260 | HINSN 740 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**R22R** — RNAV (GPS) RWY 22R

- **CGT:** CGT | SAVEE >=3000 | HAXOM >=3000
- **EON:** EON | SAVEE >=3000 | HAXOM >=3000
- **(final):** HAXOM >=3000 | RUGGO >=3000 | RUGGO | CIDIG 1420 | RW22R 661 | [CA leg - not a fix] | IGECY | EON >=2600 | EON >=2600  *(1 non-fix leg)*

**R31RZ** — RNAV (GPS) RWY 31RZ

- **HILLS:** HILLS 5000/240 | GLEAM >=4000
- **(final):** GLEAM >=4000 | RUNTS >=2500 | HOBEL >=1700 | HOBEL | RW31R 660 | [CA leg - not a fix] | EON >=2600 | EON >=2600  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`ALQUE`, `OLCYK`, `PLOPP`, `TINLY`, `ZABNU`, `PKACH`, `STERE`, `TACTT`, `HILLS`, `TWEEN`, `DPA`, `JOT`, `WUPOR`, `TOYUL`, `CGT`, `EON`

### Fix coordinates

- **ALQUE** N41 34.17 / W88 01.44 -- `41.56942, -88.02394`
- **BANER** N41 36.64 / W87 58.32 -- `41.61061, -87.97205`
- **CADON** N41 39.11 / W87 55.21 -- `41.65183, -87.92018`
- **CITGO** N41 42.86 / W87 50.48 -- `41.71439, -87.84126`
- **YIPEE** N41 44.46 / W87 48.46 -- `41.74101, -87.80761`
- **OLCYK** N41 32.41 / W87 36.27 -- `41.54019, -87.60446`
- **SAVRD** N41 38.39 / W87 44.65 -- `41.63990, -87.74419`
- **HILND** N41 41.01 / W87 48.33 -- `41.68350, -87.80553`
- **RW04R** N64 32.75 / W149 04.97 -- `64.54576, -149.08275`
- **EON** N41 16.18 / W87 47.46 -- `41.26963, -87.79105`
- **PLOPP** N41 43.58 / W87 49.62 -- `41.72629, -87.82707`
- **YUCAN** N41 45.97 / W87 52.99 -- `41.76612, -87.88315`
- **JUPIR** N41 49.70 / W87 52.68 -- `41.82836, -87.87807`
- **TINLY** N41 33.32 / W87 50.96 -- `41.55530, -87.84932`
- **OOPLA** N41 40.14 / W87 59.74 -- `41.66894, -87.99564`
- **GIKLE** N41 46.16 / W87 59.08 -- `41.76934, -87.98463`
- **ZABNU** N41 32.79 / W88 19.10 -- `41.54650, -88.31829`
- **TOYUL** N41 42.74 / W88 04.23 -- `41.71227, -88.07043`
- **NIDEE** N41 50.10 / W87 49.92 -- `41.83500, -87.83195`
- **DULTE** N41 49.51 / W87 48.50 -- `41.82515, -87.80831`
- **RW13L** N33 39.32 / W88 27.11 -- `33.65537, -88.45175`
- **PKACH** N41 34.82 / W88 07.90 -- `41.58032, -88.13171`
- **MIING** N41 45.27 / W87 45.14 -- `41.75447, -87.75241`
- **FENCK** N41 45.45 / W87 41.14 -- `41.75756, -87.68573`
- **ZASIV** N41 48.11 / W87 37.88 -- `41.80177, -87.63135`
- **EGLUQ** N41 49.96 / W87 40.47 -- `41.83260, -87.67454`
- **YACHT** N41 49.37 / W87 42.24 -- `41.82279, -87.70401`
- **RW22L** N64 32.91 / W149 04.32 -- `64.54855, -149.07198`
- **STERE** N41 51.01 / W87 19.59 -- `41.85021, -87.32649`
- **TACTT** N41 51.01 / W87 26.28 -- `41.85023, -87.43799`
- **SAILZ** N41 51.01 / W87 32.97 -- `41.85014, -87.54950`
- **DXXON** N41 50.85 / W87 36.43 -- `41.84758, -87.60712`
- **MNDOE** N41 50.74 / W87 38.83 -- `41.84561, -87.64709`
- **JIBBB** N41 50.08 / W87 40.87 -- `41.83471, -87.68111`
- **HILLS** N41 37.42 / W87 31.57 -- `41.62372, -87.52616`
- **GLEAM** N41 39.59 / W87 34.60 -- `41.65989, -87.57662`
- **RUNTS** N41 42.85 / W87 39.15 -- `41.71411, -87.65242`
- **HOBEL** N41 44.58 / W87 41.57 -- `41.74300, -87.69290`
- **TWEEN** N41 38.43 / W87 44.73 -- `41.64057, -87.74553`
- **PRIUS** N41 41.17 / W87 41.41 -- `41.68616, -87.69020`
- **RW31R** N33 38.39 / W88 25.99 -- `33.63983, -88.43316`
- **IGECY** N41 36.11 / W87 46.07 -- `41.60191, -87.76784`
- **DPA** N41 53.42 / W88 21.01 -- `41.89037, -88.35018`
- **HEBKU** N41 54.45 / W87 55.47 -- `41.90749, -87.92446`
- **HITOB** N41 50.35 / W87 49.69 -- `41.83924, -87.82814`
- **OLOXE** N41 45.00 / W87 47.78 -- `41.74994, -87.79632`
- **HISKO** N41 49.16 / W87 48.01 -- `41.81941, -87.80023`
- **JOT** N41 32.79 / W88 19.10 -- `41.54642, -88.31841`
- **WUPOR** N41 24.98 / W88 12.92 -- `41.41630, -88.21530`
- **AAMEE** N41 49.19 / W87 53.75 -- `41.81989, -87.89578`
- **RUDDY** N41 50.41 / W87 50.28 -- `41.84018, -87.83794`
- **NAANN** N41 49.49 / W87 48.47 -- `41.82481, -87.80783`
- **HHALL** N41 48.80 / W87 47.50 -- `41.81333, -87.79167`
- **ZUDVI** N41 48.57 / W87 42.75 -- `41.80946, -87.71245`
- **HINSN** N41 47.62 / W87 44.45 -- `41.79372, -87.74088`
- **CGT** N41 30.60 / W87 34.29 -- `41.51001, -87.57155`
- **SAVEE** N41 51.45 / W87 26.94 -- `41.85752, -87.44902`
- **HAXOM** N41 56.28 / W87 33.72 -- `41.93807, -87.56208`
- **RUGGO** N41 52.75 / W87 38.23 -- `41.87913, -87.63714`
- **CIDIG** N41 49.18 / W87 42.76 -- `41.81962, -87.71271`
- **RW22R** N64 33.13 / W149 03.72 -- `64.55209, -149.06202`

## KDPA

### STARs

**None coded.** CIFP does not code a STAR for KDPA — the chart is the only source.

### SIDs

- **RW02B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW10:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW28:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** ACITO >=5 | ADELL
- **AKMIE:** ADELL | AKMIE
- **ARLYN:** ADELL | AKMIE | ARLYN
- **RW02B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW10:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW28:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** BACEN >=5 | BLOKR
- **BEKKI:** BLOKR | BEKKI
- **RBS:** BLOKR | RBS
- **RW02B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW10:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW28:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** CMSKY >=5 | CARYN
- **CYBIL:** CARYN | CYBIL
- **RW02B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW10:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20B:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW28:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** DENNT >=5 | DARCY
- **DONVE:** DARCY | DREGS | DONVE
- **SCOTO:** DARCY | DREGS | DUMGE | SCOTO
- **RW02L:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW02R:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW10:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20L:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20R:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW28:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** EARND >=5 | ELANR
- **EMEGE:** ELANR | EMMLY | ETAME | EMEGE
- **EMMLY:** ELANR | EMMLY
- **ERECO:** ELANR | EMMLY | ERECO
- **RW02B:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW10:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW20B:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW28:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **(final):** OREOS | OBENE
- **ELYNA:** OBENE | EERAE | ELYNA
- **IANNA:** OBENE | MONNY | MNOSO | IANNA
- **JORDY:** OBENE | MONNY | JORDY
- **MNOSO:** OBENE | MONNY | MNOSO
- **NITWT:** OBENE | NIGHT | NITWT
- **OGALE:** OBENE | OGALE
- **ROEZZ:** OBENE | CARET | ROEZZ
- **ROTTN:** OBENE | ROTTN
- **SMIDD:** OBENE | MONNY | SMIDD

### Fix coordinates

- **ACITO** N41 23.92 / W88 11.00 -- `41.39861, -88.18333`
- **ADELL** N41 14.98 / W88 15.00 -- `41.24972, -88.25000`
- **AKMIE** N40 42.65 / W88 29.47 -- `40.71077, -88.49112`
- **ARLYN** N40 19.00 / W88 40.00 -- `40.31667, -88.66667`
- **BACEN** N41 24.40 / W88 01.78 -- `41.40667, -88.02972`
- **BLOKR** N41 14.98 / W88 05.00 -- `41.24972, -88.08333`
- **BEKKI** N40 19.00 / W88 20.90 -- `40.31667, -88.34833`
- **RBS** N40 34.90 / W88 09.86 -- `40.58170, -88.16427`
- **CMSKY** N41 24.78 / W87 52.63 -- `41.41306, -87.87722`
- **CARYN** N41 14.98 / W87 53.55 -- `41.24972, -87.89250`
- **CYBIL** N40 19.00 / W87 51.87 -- `40.31667, -87.86444`
- **DENNT** N41 25.15 / W87 43.48 -- `41.41917, -87.72472`
- **DARCY** N41 12.13 / W87 43.55 -- `41.20222, -87.72583`
- **DREGS** N40 19.00 / W87 36.45 -- `40.31667, -87.60750`
- **DONVE** N39 59.18 / W87 37.55 -- `39.98639, -87.62583`
- **DUMGE** N39 59.18 / W87 23.90 -- `39.98639, -87.39833`
- **SCOTO** N39 10.15 / W86 51.28 -- `39.16915, -86.85472`
- **EARND** N41 25.52 / W87 34.33 -- `41.42528, -87.57222`
- **ELANR** N41 12.10 / W87 32.00 -- `41.20167, -87.53333`
- **EMMLY** N40 27.00 / W87 20.00 -- `40.45000, -87.33333`
- **ETAME** N39 59.07 / W86 54.00 -- `39.98444, -86.90000`
- **EMEGE** N39 42.78 / W86 40.67 -- `39.71306, -86.67778`
- **ERECO** N39 59.18 / W87 07.00 -- `39.98639, -87.11667`
- **OREOS** N41 54.01 / W89 12.56 -- `41.90021, -89.20929`
- **OBENE** N41 51.01 / W89 43.21 -- `41.85011, -89.72016`
- **EERAE** N40 41.00 / W92 42.00 -- `40.68333, -92.70000`
- **ELYNA** N40 26.86 / W93 19.08 -- `40.44766, -93.31793`
- **MONNY** N42 04.74 / W91 16.86 -- `42.07895, -91.28106`
- **MNOSO** N42 22.93 / W92 33.45 -- `42.38220, -92.55749`
- **IANNA** N42 30.42 / W93 04.91 -- `42.50708, -93.08189`
- **JORDY** N42 05.19 / W93 31.55 -- `42.08654, -93.52578`
- **NIGHT** N41 50.30 / W91 46.42 -- `41.83833, -91.77361`
- **NITWT** N41 44.08 / W93 24.85 -- `41.73472, -93.41417`
- **OGALE** N41 24.15 / W93 28.88 -- `41.40250, -93.48139`
- **CARET** N40 47.00 / W91 31.00 -- `40.78333, -91.51667`
- **ROEZZ** N40 22.48 / W92 43.00 -- `40.37470, -92.71674`
- **ROTTN** N40 59.75 / W93 31.53 -- `40.99583, -93.52556`
- **SMIDD** N42 45.05 / W92 37.27 -- `42.75084, -92.62112`

### Approaches


**I02L** — ILS RWY 02L

- **JOT:** JOT >=3000 | BOMER >=3000
- **(final):** BOMER 3000 | SPNCE 2500 | RW02L 801 | [CA leg - not a fix] | DPA >=3000 | DPA >=3000  *(1 non-fix leg)*

**L02L** — LOC RWY 02L

- **JOT:** JOT >=3000 | BOMER >=3000
- **(final):** BOMER >=3000 | SPNCE >=2500 | RW02L 801 | [CA leg - not a fix] | DPA >=3000 | DPA >=3000  *(1 non-fix leg)*

**R02L** — RNAV (GPS) RWY 02L

- **JOJED:** JOJED >=3000 | BOMER >=3000
- **SHWAG:** SHWAG | BOMER >=3000
- **(final):** BOMER >=3000 | ZETKO >=2500 | ZETKO | RW02L 801 | [CA leg - not a fix] | HINCK >=3000 | HINCK >=3000  *(1 non-fix leg)*

**R02R** — RNAV (GPS) RWY 02R

- **GIDVE:** GIDVE >=3000
- **JOT:** JOT | GIDVE >=3000
- **PLANO:** PLANO | CEXAB >=3000 | GIDVE >=3000
- **(final):** GIDVE >=3000 | HEGBI >=2500 | HEGBI | RW02R 801 | [CA leg - not a fix] | NUELG >=3000 | NUELG >=3000  *(1 non-fix leg)*

**R10** — RNAV (GPS) RWY 10

- **DPA:** DPA | NUMIZ >=2600 | NUMIZ >=2600
- **HINCK:** HINCK | NUMIZ >=2600
- **NUELG:** NUELG | NUMIZ >=2600
- **(final):** NUMIZ >=2600 | HOSAV >=2600 | HOSAV | KOHYO 1400 | RW10 804 | [CA leg - not a fix] | PEPRE | JOT >=2600 | JOT >=2600  *(1 non-fix leg)*

**R20L** — RNAV (GPS) RWY 20L

- **DPA:** DPA | JOLON >=3000 | JOLON >=3000
- **FARMM:** FARMM | JOLON >=3000
- **NUELG:** NUELG | JOLON >=3000 | JOLON >=3000
- **(final):** JOLON >=3000 | ZOGUB >=2500 | ZOGUB | PECBI 1400 | RW20L 799 | [CA leg - not a fix] | GIDVE | JOT >=2500 | JOT >=2500  *(1 non-fix leg)*

**R20R** — RNAV (GPS) RWY 20R

- **DPA:** DPA | DUKBE >=3000 | DUKBE >=3000
- **SMLLY:** SMLLY | DUKBE >=3000
- **(final):** DUKBE >=3000 | FRTZZ >=2500 | FRTZZ | SUCOP 1360 | RW20R 796 | [CA leg - not a fix] | FABUG | JOT >=2500 | JOT >=2500  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`JOT`, `JOJED`, `SHWAG`, `GIDVE`, `PLANO`, `DPA`, `HINCK`, `NUELG`, `FARMM`, `SMLLY`

### Fix coordinates

- **JOT** N41 32.79 / W88 19.10 -- `41.54642, -88.31841`
- **BOMER** N41 42.70 / W88 18.86 -- `41.71169, -88.31426`
- **SPNCE** N41 48.62 / W88 16.89 -- `41.81038, -88.28144`
- **RW02L** N61 24.71 / W149 30.97 -- `61.41176, -149.51619`
- **DPA** N41 53.42 / W88 21.01 -- `41.89037, -88.35018`
- **JOJED** N41 41.00 / W88 09.79 -- `41.68341, -88.16316`
- **SHWAG** N41 44.39 / W88 27.93 -- `41.73976, -88.46549`
- **ZETKO** N41 48.46 / W88 16.94 -- `41.80769, -88.28234`
- **HINCK** N41 49.48 / W88 40.56 -- `41.82462, -88.67594`
- **GIDVE** N41 41.68 / W88 18.96 -- `41.69475, -88.31603`
- **PLANO** N41 36.75 / W88 36.89 -- `41.61252, -88.61476`
- **CEXAB** N41 37.18 / W88 26.11 -- `41.61966, -88.43519`
- **HEGBI** N41 48.42 / W88 16.72 -- `41.80701, -88.27871`
- **RW02R** N61 24.86 / W149 30.61 -- `61.41439, -149.51020`
- **NUELG** N41 59.10 / W88 39.36 -- `41.98497, -88.65598`
- **NUMIZ** N41 56.00 / W88 30.94 -- `41.93341, -88.51565`
- **HOSAV** N41 55.39 / W88 22.91 -- `41.92311, -88.38183`
- **KOHYO** N41 55.01 / W88 18.04 -- `41.91679, -88.30067`
- **RW10** N62 49.45 / W149 54.86 -- `62.82409, -149.91436`
- **PEPRE** N41 54.14 / W88 07.03 -- `41.90228, -88.11715`
- **JOLON** N42 05.83 / W88 10.90 -- `42.09718, -88.18164`
- **FARMM** N42 20.16 / W88 21.57 -- `42.33599, -88.35942`
- **ZOGUB** N41 59.82 / W88 12.92 -- `41.99692, -88.21528`
- **PECBI** N41 56.47 / W88 14.04 -- `41.94125, -88.23392`
- **RW20L** N61 25.09 / W149 30.22 -- `61.41820, -149.50367`
- **DUKBE** N42 06.06 / W88 11.05 -- `42.10102, -88.18416`
- **SMLLY** N42 07.76 / W88 20.18 -- `42.12927, -88.33626`
- **FRTZZ** N42 00.05 / W88 13.07 -- `42.00077, -88.21783`
- **SUCOP** N41 56.57 / W88 14.23 -- `41.94286, -88.23722`
- **RW20R** N61 25.21 / W149 30.10 -- `61.42023, -149.50166`
- **FABUG** N41 49.03 / W88 16.75 -- `41.81712, -88.27921`

## KPWK

### STARs

- **CHZHD:** CHZHD | LEEDN | MUMPR | DETIE | MOWSR | TRUDO/250 | KNARF | GOPAC
- **LEEDN:** LEEDN | MUMPR | DETIE | MOWSR | TRUDO/250 | KNARF | GOPAC
- **OGECA:** OGECA | OHLIE | YEDSU | GIWFY | KPACK | ZOWRO | LEEDR/250 | GOPAC
- **ALL:** GOPAC | TAAIL | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **CHZHD** N41 01.10 / W88 37.30 -- `41.01839, -88.62174`
- **LEEDN** N41 42.79 / W88 18.98 -- `41.71316, -88.31635`
- **MUMPR** N42 14.61 / W88 20.99 -- `42.24358, -88.34980`
- **DETIE** N42 21.56 / W88 21.81 -- `42.35934, -88.36344`
- **MOWSR** N42 32.89 / W88 23.76 -- `42.54816, -88.39603`
- **TRUDO** N42 41.04 / W88 25.19 -- `42.68402, -88.41980`
- **KNARF** N42 44.33 / W88 25.97 -- `42.73882, -88.43287`
- **GOPAC** N42 49.00 / W88 24.95 -- `42.81674, -88.41585`
- **OGECA** N42 38.41 / W92 05.02 -- `42.64015, -92.08363`
- **OHLIE** N42 43.55 / W90 11.85 -- `42.72582, -90.19743`
- **YEDSU** N42 45.52 / W89 10.61 -- `42.75872, -89.17688`
- **GIWFY** N42 45.73 / W89 01.08 -- `42.76211, -89.01795`
- **KPACK** N42 46.09 / W88 51.70 -- `42.76812, -88.86167`
- **ZOWRO** N42 46.37 / W88 39.94 -- `42.77285, -88.66568`
- **LEEDR** N42 47.79 / W88 31.93 -- `42.79654, -88.53213`
- **TAAIL** N42 51.07 / W88 16.79 -- `42.85122, -88.27983`

### SIDs

- **RW12:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **RW16:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **RW34:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **(final):** JILYN | JORJO
- **AKMIE:** JORJO | AHLOU | ACITO | ADELL | AKMIE
- **ARLYN:** JORJO | AHLOU | ACITO | ADELL | AKMIE | ARLYN
- **BEKKI:** JORJO | BRBIE | BACEN | BLOKR | BEKKI
- **RBS:** JORJO | BRBIE | BACEN | BLOKR | RBS
- **RW12:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **RW16:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **RW34:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **(final):** ZYDEK | MONKZ
- **CYBIL:** MONKZ | CATER | CMSKY | CARYN | CYBIL
- **DONVE:** MONKZ | DWANE | DENNT | DARCY | DREGS | DONVE
- **ELANR:** MONKZ | EZRAH | EARND | ELANR
- **EMEGE:** MONKZ | EZRAH | EARND | ELANR | EMMLY | ETAME | EMEGE
- **EMMLY:** MONKZ | EZRAH | EARND | ELANR | EMMLY
- **ERECO:** MONKZ | EZRAH | EARND | ELANR | EMMLY | ERECO
- **SCOTO:** MONKZ | DWANE | DENNT | DARCY | DREGS | DUMGE | SCOTO

### Fix coordinates

- **JILYN** N41 59.57 / W87 59.18 -- `41.99285, -87.98626`
- **JORJO** N41 53.07 / W87 59.31 -- `41.88448, -87.98855`
- **AHLOU** N41 39.05 / W88 07.47 -- `41.65083, -88.12445`
- **ACITO** N41 23.92 / W88 11.00 -- `41.39861, -88.18333`
- **ADELL** N41 14.98 / W88 15.00 -- `41.24972, -88.25000`
- **AKMIE** N40 42.65 / W88 29.47 -- `40.71077, -88.49112`
- **ARLYN** N40 19.00 / W88 40.00 -- `40.31667, -88.66667`
- **BRBIE** N41 39.05 / W88 01.37 -- `41.65083, -88.02276`
- **BACEN** N41 24.40 / W88 01.78 -- `41.40667, -88.02972`
- **BLOKR** N41 14.98 / W88 05.00 -- `41.24972, -88.08333`
- **BEKKI** N40 19.00 / W88 20.90 -- `40.31667, -88.34833`
- **RBS** N40 34.90 / W88 09.86 -- `40.58170, -88.16427`
- **ZYDEK** N41 59.54 / W87 48.86 -- `41.99230, -87.81440`
- **MONKZ** N41 53.06 / W87 48.11 -- `41.88433, -87.80180`
- **CATER** N41 39.05 / W87 50.38 -- `41.65083, -87.83972`
- **CMSKY** N41 24.78 / W87 52.63 -- `41.41306, -87.87722`
- **CARYN** N41 14.98 / W87 53.55 -- `41.24972, -87.89250`
- **CYBIL** N40 19.00 / W87 51.87 -- `40.31667, -87.86444`
- **DWANE** N41 39.05 / W87 44.08 -- `41.65083, -87.73474`
- **DENNT** N41 25.15 / W87 43.48 -- `41.41917, -87.72472`
- **DARCY** N41 12.13 / W87 43.55 -- `41.20222, -87.72583`
- **DREGS** N40 19.00 / W87 36.45 -- `40.31667, -87.60750`
- **DONVE** N39 59.18 / W87 37.55 -- `39.98639, -87.62583`
- **EZRAH** N41 39.05 / W87 38.11 -- `41.65083, -87.63524`
- **EARND** N41 25.52 / W87 34.33 -- `41.42528, -87.57222`
- **ELANR** N41 12.10 / W87 32.00 -- `41.20167, -87.53333`
- **EMMLY** N40 27.00 / W87 20.00 -- `40.45000, -87.33333`
- **ETAME** N39 59.07 / W86 54.00 -- `39.98444, -86.90000`
- **EMEGE** N39 42.78 / W86 40.67 -- `39.71306, -86.67778`
- **ERECO** N39 59.18 / W87 07.00 -- `39.98639, -87.11667`
- **DUMGE** N39 59.18 / W87 23.90 -- `39.98639, -87.39833`
- **SCOTO** N39 10.15 / W86 51.28 -- `39.16915, -86.85472`

### Approaches


**R16** — RNAV (GPS) RWY 16

- **FILLZ:** FILLZ | HIGUH >=2500
- **OYFAM:** OYFAM | HIGUH >=2500
- **(final):** HIGUH >=2500 | PAMME >=2300 | PAMME | FUGIO 1320 | RW16 695 | [CA leg - not a fix] | DEERE >=2100 | DEERE >=2100  *(1 non-fix leg)*

**R30** — RNAV (GPS) RWY 30

- **CUBSI:** CUBSI | THORR >=3000 | GENAZ >=3000
- **THORR:** THORR >=3000 | GENAZ >=3000
- **(final):** GENAZ >=3000 | DUSTY >=2000 | DUSTY | RW30 683 | [CA leg - not a fix] | FILLZ >=2500 | FILLZ >=2500  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`FILLZ`, `OYFAM`, `CUBSI`, `THORR`

### Fix coordinates

- **FILLZ** N42 15.14 / W88 10.09 -- `42.25240, -88.16821`
- **HIGUH** N42 18.08 / W88 00.07 -- `42.30134, -88.00113`
- **OYFAM** N42 21.00 / W87 50.03 -- `42.35005, -87.83379`
- **PAMME** N42 12.10 / W87 56.90 -- `42.20159, -87.94836`
- **FUGIO** N42 09.26 / W87 55.41 -- `42.15440, -87.92348`
- **RW16** N65 21.42 / W149 45.63 -- `65.35694, -149.76048`
- **DEERE** N42 11.95 / W87 36.23 -- `42.19913, -87.60390`
- **CUBSI** N42 13.22 / W87 41.50 -- `42.22031, -87.69172`
- **THORR** N42 07.40 / W87 36.02 -- `42.12326, -87.60031`
- **GENAZ** N42 03.93 / W87 42.34 -- `42.06549, -87.70575`
- **DUSTY** N42 04.67 / W87 48.75 -- `42.07789, -87.81244`
- **RW30** N64 00.02 / W145 35.37 -- `64.00035, -145.58958`

## KARR

### STARs

**None coded.** CIFP does not code a STAR for KARR — the chart is the only source.

### SIDs

- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW18:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW36:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** ACITO >=5 | ADELL
- **AKMIE:** ADELL | AKMIE
- **ARLYN:** ADELL | AKMIE | ARLYN
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW18:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW36:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** BACEN >=5 | BLOKR
- **BEKKI:** BLOKR | BEKKI
- **RBS:** BLOKR | RBS
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW18:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW36:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** CMSKY >=5 | CARYN
- **CYBIL:** CARYN | CYBIL
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW18:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW36:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** DENNT >=5 | DARCY
- **DONVE:** DARCY | DREGS | DONVE
- **SCOTO:** DARCY | DREGS | DUMGE | SCOTO
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW18:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW36:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** EARND >=5 | ELANR
- **EMEGE:** ELANR | EMMLY | ETAME | EMEGE
- **EMMLY:** ELANR | EMMLY
- **ERECO:** ELANR | EMMLY | ERECO
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW15:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW18:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW33:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW36:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **(final):** OREOS | OBENE
- **ELYNA:** OBENE | EERAE | ELYNA
- **IANNA:** OBENE | MONNY | MNOSO | IANNA
- **JORDY:** OBENE | MONNY | JORDY
- **MNOSO:** OBENE | MONNY | MNOSO
- **NITWT:** OBENE | NIGHT | NITWT
- **OGALE:** OBENE | OGALE
- **ROEZZ:** OBENE | CARET | ROEZZ
- **ROTTN:** OBENE | ROTTN
- **SMIDD:** OBENE | MONNY | SMIDD

### Fix coordinates

- **ACITO** N41 23.92 / W88 11.00 -- `41.39861, -88.18333`
- **ADELL** N41 14.98 / W88 15.00 -- `41.24972, -88.25000`
- **AKMIE** N40 42.65 / W88 29.47 -- `40.71077, -88.49112`
- **ARLYN** N40 19.00 / W88 40.00 -- `40.31667, -88.66667`
- **BACEN** N41 24.40 / W88 01.78 -- `41.40667, -88.02972`
- **BLOKR** N41 14.98 / W88 05.00 -- `41.24972, -88.08333`
- **BEKKI** N40 19.00 / W88 20.90 -- `40.31667, -88.34833`
- **RBS** N40 34.90 / W88 09.86 -- `40.58170, -88.16427`
- **CMSKY** N41 24.78 / W87 52.63 -- `41.41306, -87.87722`
- **CARYN** N41 14.98 / W87 53.55 -- `41.24972, -87.89250`
- **CYBIL** N40 19.00 / W87 51.87 -- `40.31667, -87.86444`
- **DENNT** N41 25.15 / W87 43.48 -- `41.41917, -87.72472`
- **DARCY** N41 12.13 / W87 43.55 -- `41.20222, -87.72583`
- **DREGS** N40 19.00 / W87 36.45 -- `40.31667, -87.60750`
- **DONVE** N39 59.18 / W87 37.55 -- `39.98639, -87.62583`
- **DUMGE** N39 59.18 / W87 23.90 -- `39.98639, -87.39833`
- **SCOTO** N39 10.15 / W86 51.28 -- `39.16915, -86.85472`
- **EARND** N41 25.52 / W87 34.33 -- `41.42528, -87.57222`
- **ELANR** N41 12.10 / W87 32.00 -- `41.20167, -87.53333`
- **EMMLY** N40 27.00 / W87 20.00 -- `40.45000, -87.33333`
- **ETAME** N39 59.07 / W86 54.00 -- `39.98444, -86.90000`
- **EMEGE** N39 42.78 / W86 40.67 -- `39.71306, -86.67778`
- **ERECO** N39 59.18 / W87 07.00 -- `39.98639, -87.11667`
- **OREOS** N41 54.01 / W89 12.56 -- `41.90021, -89.20929`
- **OBENE** N41 51.01 / W89 43.21 -- `41.85011, -89.72016`
- **EERAE** N40 41.00 / W92 42.00 -- `40.68333, -92.70000`
- **ELYNA** N40 26.86 / W93 19.08 -- `40.44766, -93.31793`
- **MONNY** N42 04.74 / W91 16.86 -- `42.07895, -91.28106`
- **MNOSO** N42 22.93 / W92 33.45 -- `42.38220, -92.55749`
- **IANNA** N42 30.42 / W93 04.91 -- `42.50708, -93.08189`
- **JORDY** N42 05.19 / W93 31.55 -- `42.08654, -93.52578`
- **NIGHT** N41 50.30 / W91 46.42 -- `41.83833, -91.77361`
- **NITWT** N41 44.08 / W93 24.85 -- `41.73472, -93.41417`
- **OGALE** N41 24.15 / W93 28.88 -- `41.40250, -93.48139`
- **CARET** N40 47.00 / W91 31.00 -- `40.78333, -91.51667`
- **ROEZZ** N40 22.48 / W92 43.00 -- `40.37470, -92.71674`
- **ROTTN** N40 59.75 / W93 31.53 -- `40.99583, -93.52556`
- **SMIDD** N42 45.05 / W92 37.27 -- `42.75084, -92.62112`

### Approaches


**I09** — ILS RWY 09

- **(final):** TOBBY 2700 | WOLFF 2700 | RW09 752 | [CA leg - not a fix] | [VI leg - not a fix] | VAINS >=3000 | VAINS >=3000  *(2 non-fix legs)*

**L09** — LOC RWY 09

- **(final):** TOBBY >=2700 | WOLFF >=2700 | RW09 752 | [CA leg - not a fix] | [VI leg - not a fix] | VAINS >=3000 | VAINS >=3000  *(2 non-fix legs)*

**L33** — LOC RWY 33

- **JOT:** JOT >=2600 | BOBBB >=2600
- **(final):** BOBBB >=2600 | RIESR >=2300 | EPABE >=1320 | RW33 747 | [CA leg - not a fix] | [VI leg - not a fix] | VAINS >=3000 | VAINS >=3000  *(2 non-fix legs)*

**R09** — RNAV (GPS) RWY 09

- **AHMED:** AHMED | JUGER >=2700 | TOBBY >=2700/230
- **HERVY:** HERVY | TOBBY >=2700/230
- **NUELG:** NUELG | DECAK >=2700 | TOBBY >=2700/230
- **TOBBY:** TOBBY >=2700
- **(final):** TOBBY >=2700/230 | WOLFF >=2700 | WOLFF | RW09 752 | [CA leg - not a fix] | HOGIE >=2500 | HOGIE >=2500  *(1 non-fix leg)*

**R15** — RNAV (GPS) RWY 15

- **NUELG:** NUELG | UBEXE >=2600
- **(final):** UBEXE >=2600 | WUYFI >=2300 | WUYFI | RW15 757 | [CA leg - not a fix] | UQITY >=3000 | UQITY >=3000  *(1 non-fix leg)*

**R27** — RNAV (GPS) RWY 27

- **DPA:** DPA | HOGIE >=2500 | HOGIE >=2500
- **JOT:** JOT | CIMKO >=2500 | HOGIE >=2500
- **(final):** HOGIE >=2500 | KAREY >=2300 | KAREY | NECLY 1260 | RW27 752 | [CA leg - not a fix] | TOBBY >=2700 | TOBBY >=2700  *(1 non-fix leg)*

**R33** — RNAV (GPS) RWY 33

- **FIEND:** FIEND | BOBBB >=2600
- **JOT:** JOT | BOBBB >=2600
- **(final):** BOBBB >=2600 | RIESR >=2300 | RIESR | RW33 747 | [CA leg - not a fix] | UCORO >=3000 | UCORO >=3000  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`JOT`, `AHMED`, `HERVY`, `NUELG`, `TOBBY`, `DPA`, `FIEND`

### Fix coordinates

- **TOBBY** N41 46.01 / W88 45.31 -- `41.76680, -88.75520`
- **WOLFF** N41 46.11 / W88 37.30 -- `41.76854, -88.62159`
- **RW09** N61 38.93 / W149 20.67 -- `61.64889, -149.34444`
- **VAINS** N41 45.58 / W88 22.31 -- `41.75967, -88.37182`
- **JOT** N41 32.79 / W88 19.10 -- `41.54642, -88.31841`
- **BOBBB** N41 36.99 / W88 20.59 -- `41.61652, -88.34312`
- **RIESR** N41 42.02 / W88 24.98 -- `41.70035, -88.41635`
- **EPABE** N41 44.54 / W88 27.19 -- `41.74231, -88.45309`
- **RW33** N65 27.79 / W148 39.15 -- `65.46320, -148.65249`
- **AHMED** N41 29.86 / W88 51.87 -- `41.49770, -88.86447`
- **JUGER** N41 40.99 / W88 46.38 -- `41.68320, -88.77305`
- **HERVY** N41 46.64 / W88 54.44 -- `41.77725, -88.90736`
- **NUELG** N41 59.10 / W88 39.36 -- `41.98497, -88.65598`
- **DECAK** N41 51.00 / W88 46.63 -- `41.84992, -88.77715`
- **HOGIE** N41 46.38 / W88 11.84 -- `41.77306, -88.19735`
- **UBEXE** N41 55.16 / W88 36.52 -- `41.91934, -88.60869`
- **WUYFI** N41 50.85 / W88 32.73 -- `41.84754, -88.54547`
- **RW15** N65 28.28 / W148 39.30 -- `65.47134, -148.65500`
- **UQITY** N41 42.01 / W88 24.97 -- `41.70017, -88.41618`
- **DPA** N41 53.42 / W88 21.01 -- `41.89037, -88.35018`
- **CIMKO** N41 39.38 / W88 11.73 -- `41.65634, -88.19550`
- **KAREY** N41 46.29 / W88 21.20 -- `41.77157, -88.35326`
- **NECLY** N41 46.25 / W88 25.55 -- `41.77081, -88.42590`
- **RW27** N61 38.95 / W149 20.02 -- `61.64917, -149.33361`
- **FIEND** N41 37.22 / W88 13.34 -- `41.62029, -88.22233`
- **UCORO** N41 50.98 / W88 32.84 -- `41.84970, -88.54736`

## KGYY

### STARs

- **COOKS:** COOKS 17 | DABOZ 17 | USTIS 15 | ROEPR 11 - 13 | WYDIK 8 - 11 | LUCIT 4
- **EDENS:** EDENS | HERWK 10 | UJEAN 10 | LUCIT 4
- **HERWK:** HERWK 10 | UJEAN 10 | LUCIT 4
- **HLMIT:** HLMIT 12 | POSOC 11 | GRIDZ 8 - 10 | LUCIT 4
- **MACES:** MACES | KKOPA FL240 | HLMIT 12 | POSOC 11 | GRIDZ 8 - 10 | LUCIT 4
- **SOHOW:** SOHOW | HAAYQ FL240 | WUNTZ | COOKS 17 | DABOZ 17 | USTIS 15 | ROEPR 11 - 13 | WYDIK 8 - 11 | LUCIT 4
- **ALL:** LUCIT 4 | HTDOG 4 | [FM leg - not a fix]  *(1 non-fix leg)*
- **ASHEN:** ASHEN | FNLYY FL240 | BAGEL | PANGG
- **BAGEL:** BAGEL | PANGG
- **FWA:** FWA | MAKKI FL240 | BAGEL | PANGG
- **LLTCH:** LLTCH | BRTTN FL240 | BAGEL | PANGG
- **ALL:** PANGG | MEGGZ 11 | AWSUM 10 | IROCK | HALIE 6 | JOSSH 6 | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **COOKS** N40 32.71 / W88 45.91 -- `40.54523, -88.76516`
- **DABOZ** N40 39.83 / W88 30.13 -- `40.66384, -88.50210`
- **USTIS** N40 45.73 / W88 17.79 -- `40.76223, -88.29655`
- **ROEPR** N40 54.86 / W87 57.45 -- `40.91436, -87.95743`
- **WYDIK** N41 00.22 / W87 45.41 -- `41.00359, -87.75677`
- **LUCIT** N41 13.94 / W87 25.42 -- `41.23234, -87.42372`
- **EDENS** N41 06.98 / W90 02.91 -- `41.11639, -90.04853`
- **HERWK** N41 11.31 / W88 29.91 -- `41.18846, -88.49845`
- **UJEAN** N41 12.44 / W88 05.23 -- `41.20726, -88.08715`
- **HLMIT** N40 38.88 / W87 06.65 -- `40.64796, -87.11089`
- **POSOC** N40 48.49 / W87 11.99 -- `40.80815, -87.19980`
- **GRIDZ** N40 57.99 / W87 16.93 -- `40.96644, -87.28224`
- **MACES** N40 00.22 / W86 43.38 -- `40.00368, -86.72295`
- **KKOPA** N40 10.83 / W86 49.99 -- `40.18046, -86.83311`
- **SOHOW** N39 50.42 / W89 40.62 -- `39.84038, -89.67706`
- **HAAYQ** N40 17.20 / W89 12.85 -- `40.28659, -89.21412`
- **WUNTZ** N40 25.55 / W89 04.32 -- `40.42585, -89.07196`
- **HTDOG** N41 23.61 / W87 17.49 -- `41.39356, -87.29144`
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
- **HALIE** N41 30.96 / W87 09.53 -- `41.51607, -87.15888`
- **JOSSH** N41 30.60 / W87 13.50 -- `41.50995, -87.22493`

### SIDs

- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW12:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** ACITO >=5 | ADELL
- **AKMIE:** ADELL | AKMIE
- **ARLYN:** ADELL | AKMIE | ARLYN
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW12:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** BACEN >=5 | BLOKR
- **BEKKI:** BLOKR | BEKKI
- **RBS:** BLOKR | RBS
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW12:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** CMSKY >=5 | CARYN
- **CYBIL:** CARYN | CYBIL
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW12:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** DENNT >=5 | DARCY
- **DONVE:** DARCY | DREGS | DONVE
- **SCOTO:** DARCY | DREGS | DUMGE | SCOTO
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW12:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW30:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** EARND >=5 | ELANR
- **EMEGE:** ELANR | EMMLY | ETAME | EMEGE
- **EMMLY:** ELANR | EMMLY
- **ERECO:** ELANR | EMMLY | ERECO

### Fix coordinates

- **ACITO** N41 23.92 / W88 11.00 -- `41.39861, -88.18333`
- **ADELL** N41 14.98 / W88 15.00 -- `41.24972, -88.25000`
- **AKMIE** N40 42.65 / W88 29.47 -- `40.71077, -88.49112`
- **ARLYN** N40 19.00 / W88 40.00 -- `40.31667, -88.66667`
- **BACEN** N41 24.40 / W88 01.78 -- `41.40667, -88.02972`
- **BLOKR** N41 14.98 / W88 05.00 -- `41.24972, -88.08333`
- **BEKKI** N40 19.00 / W88 20.90 -- `40.31667, -88.34833`
- **RBS** N40 34.90 / W88 09.86 -- `40.58170, -88.16427`
- **CMSKY** N41 24.78 / W87 52.63 -- `41.41306, -87.87722`
- **CARYN** N41 14.98 / W87 53.55 -- `41.24972, -87.89250`
- **CYBIL** N40 19.00 / W87 51.87 -- `40.31667, -87.86444`
- **DENNT** N41 25.15 / W87 43.48 -- `41.41917, -87.72472`
- **DARCY** N41 12.13 / W87 43.55 -- `41.20222, -87.72583`
- **DREGS** N40 19.00 / W87 36.45 -- `40.31667, -87.60750`
- **DONVE** N39 59.18 / W87 37.55 -- `39.98639, -87.62583`
- **DUMGE** N39 59.18 / W87 23.90 -- `39.98639, -87.39833`
- **SCOTO** N39 10.15 / W86 51.28 -- `39.16915, -86.85472`
- **EARND** N41 25.52 / W87 34.33 -- `41.42528, -87.57222`
- **ELANR** N41 12.10 / W87 32.00 -- `41.20167, -87.53333`
- **EMMLY** N40 27.00 / W87 20.00 -- `40.45000, -87.33333`
- **ETAME** N39 59.07 / W86 54.00 -- `39.98444, -86.90000`
- **EMEGE** N39 42.78 / W86 40.67 -- `39.71306, -86.67778`
- **ERECO** N39 59.18 / W87 07.00 -- `39.98639, -87.11667`

### Approaches


**H12-Z** — RNAV (RNP) RWY 12 Z

- **FEBAG:** FEBAG 2300 - 7300 | NOOOO >=2300 | KCHUP >=2300 | BBRAD >=2000 | TRAYC >=2000/180 | PADKE >=1800
- **HTDOG:** HTDOG 4000 | MSTRD >=4000 | RELSH >=3000 | ONYIN >=2000 | TMATO >=2000/180 | PADKE >=1800
- **KEGLE:** KEGLE | TRAYC >=2000/180 | PADKE >=1800
- **PCKLE:** PCKLE | TMATO >=2000/180 | PADKE >=1800
- **(final):** PADKE >=1800 | PADKE 0 | RW12 657 | [CA leg - not a fix] | KIKVE >=2400 | KIKVE >=2400  *(1 non-fix leg)*

**H30-Z** — RNAV (RNP) RWY 30 Z

- **FEBAG:** FEBAG | EBGIN >=2300
- **HTDOG:** HTDOG 4000 | EBGIN >=2300
- **(final):** EBGIN >=2300 | WASTU >=2000 | WASTU 0 | RW30 646 | HOSEN | DANGE | KEGLE >=2100 | KEGLE >=2100

**I30** — ILS RWY 30

- **CGT:** CGT | WASTU >=2400 | WASTU >=2400
- **HTDOG:** HTDOG 4000 | KIKVE >=2400
- **(final):** KIKVE 2400 | WASTU 2000 | RW30 646 | [CA leg - not a fix] | CGT >=2400 | CGT >=2400  *(1 non-fix leg)*

**L30** — LOC RWY 30

- **CGT:** CGT | WASTU >=2400 | WASTU >=2400
- **HTDOG:** HTDOG 4000 | KIKVE >=2400
- **(final):** KIKVE >=2400 | WASTU >=2000 | HROLD >=1060 | RW30 646 | [CA leg - not a fix] | CGT >=2400 | CGT >=2400  *(1 non-fix leg)*

**R02** — RNAV (GPS) RWY 02

- **ERACK:** ERACK | KILPY >=2800
- **KILPY:** KILPY >=2800
- **TREYY:** TREYY | KILPY >=2800
- **(final):** KILPY >=2800 | CORPI >=2300 | CORPI | DEASH 1280 | RW02 649 | [CA leg - not a fix] | KILPY >=2800 | KILPY >=2800  *(1 non-fix leg)*

**R12-Y** — RNAV (GPS) RWY 12 Y

- **EVEPY:** EVEPY >=2200
- **HTDOG:** HTDOG 4000 | JEDIM >=4000 | EVEPY >=2200
- **ZANIN:** ZANIN | EVEPY >=2200
- **(final):** EVEPY >=2200 | GAGME >=2200 | GAGME | CUSUB 1400 | RW12 647 | [CA leg - not a fix] | KIKVE >=2400 | KIKVE >=2400  *(1 non-fix leg)*

**R20** — RNAV (GPS) RWY 20

- **HALIE:** HALIE | ZOGEB >=2400 | UCJUC >=2200
- **NILES:** NILES | QEBLO >=3000 | UCJUC >=2200
- **UCJUC:** UCJUC >=2200
- **(final):** UCJUC >=2200 | YUPHU >=2200 | YUPHU | RW20 639 | [CA leg - not a fix] | HALIE >=2400 | HALIE >=2400  *(1 non-fix leg)*

**R30-Y** — RNAV (GPS) RWY 30 Y

- **BOONE:** BOONE | KIKVE >=2400
- **CGT:** CGT | KIKVE >=2400 | KIKVE >=2400
- **HTDOG:** HTDOG 4000 | KIKVE >=2400
- **STYLE:** STYLE | KIKVE >=2400
- **(final):** KIKVE >=2400 | WASTU >=2000 | WASTU | HROLD 1120 | RW30 646 | [CA leg - not a fix] | KIKVE >=2400 | KIKVE >=2400  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`FEBAG`, `HTDOG`, `KEGLE`, `PCKLE`, `CGT`, `ERACK`, `KILPY`, `TREYY`, `EVEPY`, `ZANIN`, `HALIE`, `NILES`, `UCJUC`, `BOONE`, `STYLE`

### Fix coordinates

- **FEBAG** N41 38.76 / W87 05.61 -- `41.64608, -87.09351`
- **NOOOO** N41 43.62 / W87 17.69 -- `41.72707, -87.29484`
- **KCHUP** N41 45.28 / W87 21.81 -- `41.75459, -87.36355`
- **BBRAD** N41 44.62 / W87 28.12 -- `41.74359, -87.46864`
- **TRAYC** N41 43.22 / W87 30.04 -- `41.72041, -87.50064`
- **PADKE** N41 39.47 / W87 29.60 -- `41.65779, -87.49338`
- **HTDOG** N41 23.61 / W87 17.49 -- `41.39356, -87.29144`
- **MSTRD** N41 31.17 / W87 30.53 -- `41.51943, -87.50882`
- **RELSH** N41 33.30 / W87 34.23 -- `41.55495, -87.57045`
- **ONYIN** N41 38.08 / W87 35.10 -- `41.63467, -87.58499`
- **TMATO** N41 38.88 / W87 34.30 -- `41.64800, -87.57162`
- **KEGLE** N41 46.66 / W87 25.29 -- `41.77773, -87.42145`
- **PCKLE** N41 35.36 / W87 37.82 -- `41.58939, -87.63032`
- **RW12** N64 00.25 / W145 35.80 -- `64.00417, -145.59667`
- **KIKVE** N41 30.23 / W87 11.51 -- `41.50391, -87.19182`
- **EBGIN** N41 30.88 / W87 12.77 -- `41.51471, -87.21289`
- **WASTU** N41 34.33 / W87 19.51 -- `41.57210, -87.32512`
- **RW30** N64 00.02 / W145 35.37 -- `64.00035, -145.58958`
- **HOSEN** N41 37.28 / W87 25.30 -- `41.62134, -87.42171`
- **DANGE** N41 43.28 / W87 27.46 -- `41.72129, -87.45766`
- **CGT** N41 30.60 / W87 34.29 -- `41.51001, -87.57155`
- **HROLD** N41 35.88 / W87 22.55 -- `41.59800, -87.37588`
- **ERACK** N41 21.54 / W87 21.53 -- `41.35897, -87.35889`
- **KILPY** N41 24.44 / W87 31.43 -- `41.40730, -87.52389`
- **TREYY** N41 27.30 / W87 41.36 -- `41.45497, -87.68935`
- **CORPI** N41 31.90 / W87 27.60 -- `41.53167, -87.45998`
- **DEASH** N41 34.87 / W87 26.07 -- `41.58118, -87.43446`
- **RW02** N59 42.13 / W151 17.93 -- `59.70224, -151.29875`
- **EVEPY** N41 43.94 / W87 38.44 -- `41.73236, -87.64061`
- **JEDIM** N41 37.30 / W87 44.40 -- `41.62163, -87.74006`
- **ZANIN** N41 50.57 / W87 32.45 -- `41.84290, -87.54086`
- **GAGME** N41 40.19 / W87 31.03 -- `41.66984, -87.51711`
- **CUSUB** N41 38.78 / W87 28.25 -- `41.64634, -87.47084`
- **HALIE** N41 30.96 / W87 09.53 -- `41.51607, -87.15888`
- **ZOGEB** N41 44.71 / W87 13.81 -- `41.74512, -87.23016`
- **UCJUC** N41 46.52 / W87 20.04 -- `41.77538, -87.33392`
- **NILES** N41 46.69 / W87 35.04 -- `41.77818, -87.58406`
- **QEBLO** N41 48.33 / W87 26.27 -- `41.80556, -87.43777`
- **YUPHU** N41 41.86 / W87 22.45 -- `41.69767, -87.37424`
- **RW20** N59 42.37 / W151 17.58 -- `59.70621, -151.29299`
- **BOONE** N41 21.83 / W87 11.53 -- `41.36376, -87.19215`
- **STYLE** N41 46.44 / W86 48.50 -- `41.77397, -86.80838`

## KLOT

### STARs

**None coded.** CIFP does not code a STAR for KLOT — the chart is the only source.

### SIDs

- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** ACITO >=5 | ADELL
- **AKMIE:** ADELL | AKMIE
- **ARLYN:** ADELL | AKMIE | ARLYN
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** BACEN >=5 | BLOKR
- **BEKKI:** BLOKR | BEKKI
- **RBS:** BLOKR | RBS
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** CMSKY >=5 | CARYN
- **CYBIL:** CARYN | CYBIL
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** DENNT >=5 | DARCY
- **DONVE:** DARCY | DREGS | DONVE
- **SCOTO:** DARCY | DREGS | DUMGE | SCOTO
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix]  *(2 non-fix legs)*
- **(final):** EARND >=5 | ELANR
- **EMEGE:** ELANR | EMMLY | ETAME | EMEGE
- **EMMLY:** ELANR | EMMLY
- **ERECO:** ELANR | EMMLY | ERECO
- **RW02:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW09:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW20:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **RW27:** [VA leg - not a fix] | [VM leg - not a fix] | OREOS  *(2 non-fix legs)*
- **(final):** OREOS | OBENE
- **ELYNA:** OBENE | EERAE | ELYNA
- **IANNA:** OBENE | MONNY | MNOSO | IANNA
- **JORDY:** OBENE | MONNY | JORDY
- **MNOSO:** OBENE | MONNY | MNOSO
- **NITWT:** OBENE | NIGHT | NITWT
- **OGALE:** OBENE | OGALE
- **ROEZZ:** OBENE | CARET | ROEZZ
- **ROTTN:** OBENE | ROTTN
- **SMIDD:** OBENE | MONNY | SMIDD

### Fix coordinates

- **ACITO** N41 23.92 / W88 11.00 -- `41.39861, -88.18333`
- **ADELL** N41 14.98 / W88 15.00 -- `41.24972, -88.25000`
- **AKMIE** N40 42.65 / W88 29.47 -- `40.71077, -88.49112`
- **ARLYN** N40 19.00 / W88 40.00 -- `40.31667, -88.66667`
- **BACEN** N41 24.40 / W88 01.78 -- `41.40667, -88.02972`
- **BLOKR** N41 14.98 / W88 05.00 -- `41.24972, -88.08333`
- **BEKKI** N40 19.00 / W88 20.90 -- `40.31667, -88.34833`
- **RBS** N40 34.90 / W88 09.86 -- `40.58170, -88.16427`
- **CMSKY** N41 24.78 / W87 52.63 -- `41.41306, -87.87722`
- **CARYN** N41 14.98 / W87 53.55 -- `41.24972, -87.89250`
- **CYBIL** N40 19.00 / W87 51.87 -- `40.31667, -87.86444`
- **DENNT** N41 25.15 / W87 43.48 -- `41.41917, -87.72472`
- **DARCY** N41 12.13 / W87 43.55 -- `41.20222, -87.72583`
- **DREGS** N40 19.00 / W87 36.45 -- `40.31667, -87.60750`
- **DONVE** N39 59.18 / W87 37.55 -- `39.98639, -87.62583`
- **DUMGE** N39 59.18 / W87 23.90 -- `39.98639, -87.39833`
- **SCOTO** N39 10.15 / W86 51.28 -- `39.16915, -86.85472`
- **EARND** N41 25.52 / W87 34.33 -- `41.42528, -87.57222`
- **ELANR** N41 12.10 / W87 32.00 -- `41.20167, -87.53333`
- **EMMLY** N40 27.00 / W87 20.00 -- `40.45000, -87.33333`
- **ETAME** N39 59.07 / W86 54.00 -- `39.98444, -86.90000`
- **EMEGE** N39 42.78 / W86 40.67 -- `39.71306, -86.67778`
- **ERECO** N39 59.18 / W87 07.00 -- `39.98639, -87.11667`
- **OREOS** N41 54.01 / W89 12.56 -- `41.90021, -89.20929`
- **OBENE** N41 51.01 / W89 43.21 -- `41.85011, -89.72016`
- **EERAE** N40 41.00 / W92 42.00 -- `40.68333, -92.70000`
- **ELYNA** N40 26.86 / W93 19.08 -- `40.44766, -93.31793`
- **MONNY** N42 04.74 / W91 16.86 -- `42.07895, -91.28106`
- **MNOSO** N42 22.93 / W92 33.45 -- `42.38220, -92.55749`
- **IANNA** N42 30.42 / W93 04.91 -- `42.50708, -93.08189`
- **JORDY** N42 05.19 / W93 31.55 -- `42.08654, -93.52578`
- **NIGHT** N41 50.30 / W91 46.42 -- `41.83833, -91.77361`
- **NITWT** N41 44.08 / W93 24.85 -- `41.73472, -93.41417`
- **OGALE** N41 24.15 / W93 28.88 -- `41.40250, -93.48139`
- **CARET** N40 47.00 / W91 31.00 -- `40.78333, -91.51667`
- **ROEZZ** N40 22.48 / W92 43.00 -- `40.37470, -92.71674`
- **ROTTN** N40 59.75 / W93 31.53 -- `40.99583, -93.52556`
- **SMIDD** N42 45.05 / W92 37.27 -- `42.75084, -92.62112`

### Approaches


**L09** — LOC RWY 09

- **DPA:** DPA >=2500 | GATLY >=2500
- **GATLY:** GATLY >=2500
- **JOT:** JOT >=2500 | GATLY >=2500
- **(final):** GATLY >=2500 | HOBLT >=1800 | RW09 714 | [CA leg - not a fix] | JOT >=2500 | JOT >=2500  *(1 non-fix leg)*

**R02** — RNAV (GPS) RWY 02

- **EON:** EON | CAMLI >=2300
- **JOT:** JOT | CAMLI >=2300 | CAMLI >=2300
- **MEDAN:** MEDAN | CAMLI >=2300
- **(final):** CAMLI >=2300 | JIMMO >=2300 | JIMMO | RW02 716 | [CA leg - not a fix] | ALASE | BOJAK >=2500 | BOJAK >=2500  *(1 non-fix leg)*

**R09** — RNAV (GPS) RWY 09

- **DPA:** DPA | RAYLI >=2500 | GATLY >=2500
- **GATLY:** GATLY >=2500
- **MEDAN:** MEDAN | GATLY >=2500
- **(final):** GATLY >=2500 | HOBLT >=1800 | HOBLT | RW09 714 | [CA leg - not a fix] | QAJER >=2400 | QAJER >=2400  *(1 non-fix leg)*

**R20** — RNAV (GPS) RWY 20

- **DPA:** DPA | BEPKE >=2300
- **(final):** BEPKE >=2300 | JESUB >=2300 | JESUB | RW20 706 | [CA leg - not a fix] | CAMLI >=2300 | CAMLI >=2300  *(1 non-fix leg)*

**R27** — RNAV (GPS) RWY 27

- **CGT:** CGT | QAJER >=2400
- **DUFFL:** DUFFL | QAJER >=2400
- **QAJER:** QAJER >=2400
- **(final):** QAJER >=2400 | NOKIZ >=2300 | NOKIZ | BAYAK 1400 | RW27 701 | [CA leg - not a fix] | GATLY >=2500 | GATLY >=2500  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`DPA`, `GATLY`, `JOT`, `EON`, `MEDAN`, `CGT`, `DUFFL`, `QAJER`

### Fix coordinates

- **DPA** N41 53.42 / W88 21.01 -- `41.89037, -88.35018`
- **GATLY** N41 36.09 / W88 19.03 -- `41.60151, -88.31710`
- **JOT** N41 32.79 / W88 19.10 -- `41.54642, -88.31841`
- **HOBLT** N41 36.35 / W88 10.77 -- `41.60578, -88.17942`
- **RW09** N61 38.93 / W149 20.67 -- `61.64889, -149.34444`
- **EON** N41 16.18 / W87 47.46 -- `41.26963, -87.79105`
- **CAMLI** N41 25.25 / W88 09.53 -- `41.42087, -88.15879`
- **MEDAN** N41 20.46 / W88 17.11 -- `41.34098, -88.28523`
- **JIMMO** N41 31.18 / W88 07.60 -- `41.51974, -88.12674`
- **RW02** N59 42.13 / W151 17.93 -- `59.70224, -151.29875`
- **ALASE** N41 41.58 / W88 04.22 -- `41.69308, -88.07031`
- **BOJAK** N41 39.51 / W87 57.89 -- `41.65842, -87.96478`
- **RAYLI** N41 41.09 / W88 19.31 -- `41.68481, -88.32178`
- **QAJER** N41 36.94 / W87 50.35 -- `41.61563, -87.83923`
- **BEPKE** N41 47.73 / W88 02.21 -- `41.79553, -88.03682`
- **JESUB** N41 41.79 / W88 04.15 -- `41.69655, -88.06918`
- **RW20** N59 42.37 / W151 17.58 -- `59.70621, -151.29299`
- **CGT** N41 30.60 / W87 34.29 -- `41.51001, -87.57155`
- **DUFFL** N41 28.71 / W87 47.90 -- `41.47846, -87.79839`
- **NOKIZ** N41 36.71 / W87 58.37 -- `41.61189, -87.97286`
- **BAYAK** N41 36.60 / W88 02.14 -- `41.61007, -88.03560`
- **RW27** N61 38.95 / W149 20.02 -- `61.64917, -149.33361`

## KUGN

### STARs

- **CHZHD:** CHZHD | LEEDN | MUMPR | DETIE | MOWSR | TRUDO/250 | KNARF | GOPAC
- **LEEDN:** LEEDN | MUMPR | DETIE | MOWSR | TRUDO/250 | KNARF | GOPAC
- **OGECA:** OGECA | OHLIE | YEDSU | GIWFY | KPACK | ZOWRO | LEEDR/250 | GOPAC
- **ALL:** GOPAC | TAAIL | [FM leg - not a fix]  *(1 non-fix leg)*

### Fix coordinates

- **CHZHD** N41 01.10 / W88 37.30 -- `41.01839, -88.62174`
- **LEEDN** N41 42.79 / W88 18.98 -- `41.71316, -88.31635`
- **MUMPR** N42 14.61 / W88 20.99 -- `42.24358, -88.34980`
- **DETIE** N42 21.56 / W88 21.81 -- `42.35934, -88.36344`
- **MOWSR** N42 32.89 / W88 23.76 -- `42.54816, -88.39603`
- **TRUDO** N42 41.04 / W88 25.19 -- `42.68402, -88.41980`
- **KNARF** N42 44.33 / W88 25.97 -- `42.73882, -88.43287`
- **GOPAC** N42 49.00 / W88 24.95 -- `42.81674, -88.41585`
- **OGECA** N42 38.41 / W92 05.02 -- `42.64015, -92.08363`
- **OHLIE** N42 43.55 / W90 11.85 -- `42.72582, -90.19743`
- **YEDSU** N42 45.52 / W89 10.61 -- `42.75872, -89.17688`
- **GIWFY** N42 45.73 / W89 01.08 -- `42.76211, -89.01795`
- **KPACK** N42 46.09 / W88 51.70 -- `42.76812, -88.86167`
- **ZOWRO** N42 46.37 / W88 39.94 -- `42.77285, -88.66568`
- **LEEDR** N42 47.79 / W88 31.93 -- `42.79654, -88.53213`
- **TAAIL** N42 51.07 / W88 16.79 -- `42.85122, -88.27983`

### SIDs

- **RW05:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **RW14:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **RW23:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **RW32:** [VA leg - not a fix] | [VM leg - not a fix] | JILYN  *(2 non-fix legs)*
- **(final):** JILYN | JORJO
- **AKMIE:** JORJO | AHLOU | ACITO | ADELL | AKMIE
- **ARLYN:** JORJO | AHLOU | ACITO | ADELL | AKMIE | ARLYN
- **BEKKI:** JORJO | BRBIE | BACEN | BLOKR | BEKKI
- **RBS:** JORJO | BRBIE | BACEN | BLOKR | RBS
- **RW05:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **RW14:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **RW23:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **RW32:** [VA leg - not a fix] | [VM leg - not a fix] | ZYDEK  *(2 non-fix legs)*
- **(final):** ZYDEK | MONKZ
- **CYBIL:** MONKZ | CATER | CMSKY | CARYN | CYBIL
- **DONVE:** MONKZ | DWANE | DENNT | DARCY | DREGS | DONVE
- **ELANR:** MONKZ | EZRAH | EARND | ELANR
- **EMEGE:** MONKZ | EZRAH | EARND | ELANR | EMMLY | ETAME | EMEGE
- **EMMLY:** MONKZ | EZRAH | EARND | ELANR | EMMLY
- **ERECO:** MONKZ | EZRAH | EARND | ELANR | EMMLY | ERECO
- **SCOTO:** MONKZ | DWANE | DENNT | DARCY | DREGS | DUMGE | SCOTO

### Fix coordinates

- **JILYN** N41 59.57 / W87 59.18 -- `41.99285, -87.98626`
- **JORJO** N41 53.07 / W87 59.31 -- `41.88448, -87.98855`
- **AHLOU** N41 39.05 / W88 07.47 -- `41.65083, -88.12445`
- **ACITO** N41 23.92 / W88 11.00 -- `41.39861, -88.18333`
- **ADELL** N41 14.98 / W88 15.00 -- `41.24972, -88.25000`
- **AKMIE** N40 42.65 / W88 29.47 -- `40.71077, -88.49112`
- **ARLYN** N40 19.00 / W88 40.00 -- `40.31667, -88.66667`
- **BRBIE** N41 39.05 / W88 01.37 -- `41.65083, -88.02276`
- **BACEN** N41 24.40 / W88 01.78 -- `41.40667, -88.02972`
- **BLOKR** N41 14.98 / W88 05.00 -- `41.24972, -88.08333`
- **BEKKI** N40 19.00 / W88 20.90 -- `40.31667, -88.34833`
- **RBS** N40 34.90 / W88 09.86 -- `40.58170, -88.16427`
- **ZYDEK** N41 59.54 / W87 48.86 -- `41.99230, -87.81440`
- **MONKZ** N41 53.06 / W87 48.11 -- `41.88433, -87.80180`
- **CATER** N41 39.05 / W87 50.38 -- `41.65083, -87.83972`
- **CMSKY** N41 24.78 / W87 52.63 -- `41.41306, -87.87722`
- **CARYN** N41 14.98 / W87 53.55 -- `41.24972, -87.89250`
- **CYBIL** N40 19.00 / W87 51.87 -- `40.31667, -87.86444`
- **DWANE** N41 39.05 / W87 44.08 -- `41.65083, -87.73474`
- **DENNT** N41 25.15 / W87 43.48 -- `41.41917, -87.72472`
- **DARCY** N41 12.13 / W87 43.55 -- `41.20222, -87.72583`
- **DREGS** N40 19.00 / W87 36.45 -- `40.31667, -87.60750`
- **DONVE** N39 59.18 / W87 37.55 -- `39.98639, -87.62583`
- **EZRAH** N41 39.05 / W87 38.11 -- `41.65083, -87.63524`
- **EARND** N41 25.52 / W87 34.33 -- `41.42528, -87.57222`
- **ELANR** N41 12.10 / W87 32.00 -- `41.20167, -87.53333`
- **EMMLY** N40 27.00 / W87 20.00 -- `40.45000, -87.33333`
- **ETAME** N39 59.07 / W86 54.00 -- `39.98444, -86.90000`
- **EMEGE** N39 42.78 / W86 40.67 -- `39.71306, -86.67778`
- **ERECO** N39 59.18 / W87 07.00 -- `39.98639, -87.11667`
- **DUMGE** N39 59.18 / W87 23.90 -- `39.98639, -87.39833`
- **SCOTO** N39 10.15 / W86 51.28 -- `39.16915, -86.85472`

### Approaches


**I23** — ILS RWY 23

- **OBK:** OBK | WAUKE >=2300 | WAUKE >=2300
- **TALOR:** TALOR | [VI leg - not a fix] | WISIL >=3000  *(1 non-fix leg)*
- **(final):** WISIL 3000 | WAUKE 1900 | RW23 776 | [CA leg - not a fix] | WAUKE >=2300 | WAUKE >=2300  *(1 non-fix leg)*

**L23** — LOC RWY 23

- **OBK:** OBK | WAUKE >=2300 | WAUKE >=2300
- **TALOR:** TALOR | [VI leg - not a fix] | WISIL >=3000  *(1 non-fix leg)*
- **(final):** WISIL >=3000 | WAUKE >=1900 | RW23 776 | [CA leg - not a fix] | WAUKE >=2300 | WAUKE >=2300  *(1 non-fix leg)*

**R05** — RNAV (GPS) RWY 05

- **FOVOJ:** FOVOJ >=2400
- **JETRU:** JETRU | FOVOJ >=2400
- **PLSNT:** PLSNT | FOVOJ >=2400
- **(final):** FOVOJ >=2400 | BILCO >=2400 | BILCO | HIGEK 1400 | RW05 766 | [CA leg - not a fix] | LIRIC >=2300 | LIRIC >=2300  *(1 non-fix leg)*

**R23** — RNAV (GPS) RWY 23

- **LIRIC:** LIRIC >=2300
- **PAPPI:** PAPPI | FOLBU >=2300 | LIRIC >=2300
- **TALOR:** TALOR | LIRIC >=2300
- **(final):** LIRIC >=2300 | OLBOE >=1900 | OLBOE | RW23 776 | [CA leg - not a fix] | FOVOJ >=2400 | FOVOJ >=2400  *(1 non-fix leg)*

### Entry fixes — every published way in

The approach transitions, which is where traffic is fed from:

`OBK`, `TALOR`, `FOVOJ`, `JETRU`, `PLSNT`, `LIRIC`, `PAPPI`

### Fix coordinates

- **OBK** N42 13.28 / W87 57.10 -- `42.22138, -87.95167`
- **WAUKE** N42 27.86 / W87 48.10 -- `42.46431, -87.80172`
- **TALOR** N42 35.44 / W87 37.36 -- `42.59060, -87.62260`
- **WISIL** N42 30.32 / W87 44.34 -- `42.50534, -87.73897`
- **RW23** N62 56.48 / W152 15.98 -- `62.94130, -152.26629`
- **FOVOJ** N42 17.60 / W88 03.70 -- `42.29329, -88.06164`
- **JETRU** N42 11.61 / W87 56.55 -- `42.19354, -87.94248`
- **PLSNT** N42 23.57 / W88 10.88 -- `42.39285, -88.18129`
- **BILCO** N42 21.54 / W87 57.72 -- `42.35906, -87.96193`
- **HIGEK** N42 23.63 / W87 54.55 -- `42.39382, -87.90913`
- **RW05** N62 56.41 / W152 16.38 -- `62.94021, -152.27293`
- **LIRIC** N42 31.90 / W87 41.93 -- `42.53161, -87.69881`
- **PAPPI** N42 16.20 / W87 36.43 -- `42.26997, -87.60720`
- **FOLBU** N42 28.15 / W87 37.46 -- `42.46909, -87.62431`
- **OLBOE** N42 27.92 / W87 48.01 -- `42.46537, -87.80011`

