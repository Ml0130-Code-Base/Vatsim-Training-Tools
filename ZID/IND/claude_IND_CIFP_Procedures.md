# SID, STAR and approach data from CIFP - IND

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

- **KIND: 3 SIDs and 6 STARs coded.** The SOP names six SIDs for KIND jets and props (DAWNN, OOM, INDY, MAREO, MEARZ, ROCKY). **DAWNN1, MAREO1 and MEARZ7 are coded at KIND; OOM5 and ROCKY1 are coded at EYE, GEZ, HFY, MQJ, TYQ and UMP and not at KIND; INDY is coded at no field.** Read the shortfall as a coding gap at KIND, not as proof the procedures do not exist - the SOP assigns them.
- None of the three KIND SIDs has a runway transition: each starts at the first fix. CIFP therefore cannot say which runway a SID is flown off.
- **STARs:** GIIBS4, JAKKS2, KOLTS2, RACYR6, SMUKE3, SNKPT2 at KIND. CLANG1 is coded at all six satellites and not at KIND, which agrees with the SOP changelog entry of 2026-05-20 ("Re-added CLANG STAR for Sats only"). RACYR6 is conventional (route type 2/3); the SOP gives the non-STAR form `RACYR DRWUD VHP`.
- **Satellites carried here:** KMQJ, KTYQ, KUMP, KEYE, KHFY, KGEZ - the fields with a coded SID or STAR. Procedures are keyed by airport, then by procedure: the same SID is published at several satellites with that field's own runway transitions.
- **Fields with a runway record and no coded procedure:** KAID, KBAK, KMIE, KHBE, KCFJ, KGPC, KOVO, KUWL, 2R2, 5I4, I34, I99 (approaches only, or none). **No runway record at all:** 8A4, 81II, IN35, IN74, IN84.

## KIND

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | ALL |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | ALL |

#### KIND DAWNN1

- **(common):** DAWNN >=10
- **IIU:** DAWNN | IIU
- **MYS:** DAWNN | MYS

#### KIND MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KIND MEARZ7

- **(common):** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **GIIBS4** | RNAV | EASEL HAGAL | RW05B RW14 RW23B RW32 |
| **JAKKS2** | RNAV | BRBIE DELHI ELANR | RW05B RW14 RW23B RW32 |
| **KOLTS2** | RNAV | JAAVE USIRE | RW05B RW23B RW32 |
| **RACYR6** | conventional | BIB PXV | ALL |
| **SMUKE3** | RNAV | EMBRR TERGE WIDAM | RW05L RW05R RW14 RW23L RW23R RW32 |
| **SNKPT2** | RNAV | ARCAB JEEDR PLASH RINTE SJAAY | RW05L RW05R RW14 RW23L RW23R RW32 |

#### KIND GIIBS4

- **EASEL:** EASEL 14 - FL190 | GIIBS
- **HAGAL:** HAGAL | HASEV >=FL240 | GLNCH | EASEL 14 - FL190 | GIIBS
- **(common):** GIIBS | BUPTE
- **RW05B:** BUPTE | JOCKE 12 - 16 | FAMIL >=10 | MOSLY >=7 | KNIGT 6 /210 | DOCEY 6 /210 | [FM from DOCEY - not a fix]
- **RW14:** BUPTE | JOCKE 12 - 16 | OPEVE >=10 | PDIDY | ROGIE >=7 /230 | PNFLD 6 /210 | WONOK 6 /210 | [FM from WONOK - not a fix]
- **RW23B:** BUPTE | JOCKE 12 - 16 | FAMIL >=10 | MOSLY >=7 | KNIGT 6 /210 | RAMEY 6 /210 | [FM from RAMEY - not a fix]
- **RW32:** BUPTE | SADLE >=7 /230 | OZMOE >=4500 /210

#### KIND JAKKS2

- **BRBIE:** BRBIE | DNICK | EMMLY | JAKKS
- **DELHI:** DELHI | EARND | ELANR | EMMLY | JAKKS
- **ELANR:** ELANR | EMMLY | JAKKS
- **(common):** JAKKS | OPPIE 11 - 16 | ATILE <=13
- **RW05B:** ATILE <=13 | BBACK >=10 | CIBOV >=7 /230 | PETYN 6 /210 | WANOB | [FM from WANOB - not a fix]
- **RW14:** ATILE <=13 | AADIE | KEADY >=4 /210
- **RW23B:** ATILE <=13 | BBACK >=10 | CIBOV >=7 /230 | PETYN 6 /210 | ZOSAR | [FM from ZOSAR - not a fix]
- **RW32:** ATILE <=13 | BBACK >=10 | EBEDE >=7 /230 | PNFLD 6 /210 | ZASNI | [FM from ZASNI - not a fix]

#### KIND KOLTS2

- **JAAVE:** JAAVE | KOLTS FL240 - FL260
- **USIRE:** USIRE | JAAVE | KOLTS FL240 - FL260
- **(common):** KOLTS FL240 - FL260 | GARTE | CIRGO >=11 | EKEKE >=10
- **RW05B:** EKEKE >=10 | GAZPA >=7 /230 | PETYN 6 /210 | WANOB | [FM from WANOB - not a fix]
- **RW23B:** EKEKE >=10 | MRRRK >=7 /230 | PETYN 6 /210 | ZOSAR 6 /210 | [FM from ZOSAR - not a fix]
- **RW32:** EKEKE >=10 | FRENY >=7 /230 | PNFLD 6 /210 | ZASNI | [FM from ZASNI - not a fix]

#### KIND RACYR6

- **BIB:** BIB | REEMO | RACYR
- **PXV:** PXV | RACYR
- **(common):** RACYR | DRWUD | KELLY | VHP

#### KIND SMUKE3

- **EMBRR:** EMBRR | WOOTE | GAMLE 15 - FL190 | RACYR 12 - FL190
- **TERGE:** TERGE | EMBRR | WOOTE | GAMLE 15 - FL190 | RACYR 12 - FL190
- **WIDAM:** WIDAM | PAAAM | OLIPE FL240 - FL260 | ATOTE 15 - FL190 | RACYR 12 - FL190
- **(common):** RACYR 12 - FL190 | SMUKE | FIIRE
- **RW05L:** FIIRE | WESLE >=6 | WAAYN >=5 /210
- **RW05R:** FIIRE | WESLE >=6 | IIUUU >=5 /210
- **RW14:** FIIRE | EDIIE >=11 | COCOO >=10 | CIRAM >=7 /230 | PNFLD 6 /210 | WONOK 6 /210 | [FM from WONOK - not a fix]
- **RW23L:** FIIRE | CHERZ >=11 | TTKAY >=10 | EDODE >=7 /230 | KNIGT 6 /210 | RAMEY 6 /210 | [FM from RAMEY - not a fix]
- **RW23R:** FIIRE | WOTSN >=11 | DUBBX >=10 | BLSTR >=7 /230 | PETYN 6 /210 | ZOSAR 6 /210 | [FM from ZOSAR - not a fix]
- **RW32:** FIIRE | EDIIE >=11 | COCOO >=10 | CIRAM >=7 /230 | PNFLD 6 /210 | ZASNI 6 /210 | [FM from ZASNI - not a fix]

#### KIND SNKPT2

- **ARCAB:** ARCAB <=FL200 | SNKPT 14 - FL190
- **JEEDR:** JEEDR >=FL240 | DOTKE <=FL230 | SNKPT 14 - FL190
- **PLASH:** PLASH | SRGNT >=FL240 | WALKU <=FL230 | SNKPT 14 - FL190
- **RINTE:** RINTE | JEEDR >=FL240 | DOTKE <=FL230 | SNKPT 14 - FL190
- **SJAAY:** SJAAY | ARCAB <=FL200 | SNKPT 14 - FL190
- **(common):** SNKPT 14 - FL190 | BABNE 11500 - 15 | CCUUK
- **RW05L:** CCUUK | ALCOV 10 - 11 /250 | TRECY >=7 /230 | PETYN 6 /210 | WANOB | [FM from WANOB - not a fix]
- **RW05R:** CCUUK | LOVNS 10 - 11 /250 | NADEE >=7 /230 | KNIGT 6 /210 | DOCEY | [FM from DOCEY - not a fix]
- **RW14:** CCUUK | ARTJR >=10 | WEIER >=7 /230 | CRCLE 6 /210 | ORIKE | [FM from ORIKE - not a fix]
- **RW23L:** CCUUK | FEMGO 8 - 9 | LLARY >=5 /210
- **RW23R:** CCUUK | FEMGO 8 - 9 | RACEN >=5 /210
- **RW32:** CCUUK | ARTJR >=10 | WEIER >=7 /230 | CRCLE 6 /210 | ZESIT | [FM from ZESIT - not a fix]

## KMQJ

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | ALL |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | ALL |
| **OOM5** | conventional | PXV | ALL |
| **ROCKY1** | conventional | SPI STL | ALL |

#### KMQJ DAWNN1

- **(common):** DAWNN >=10
- **IIU:** DAWNN | IIU
- **MYS:** DAWNN | MYS

#### KMQJ MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KMQJ MEARZ7

- **(common):** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

#### KMQJ OOM5

- **(common):** OOM
- **PXV:** OOM | WEGEE | PXV

#### KMQJ ROCKY1

- **(common):** TTH | ROCKY
- **SPI:** ROCKY | SPI
- **STL:** ROCKY >=10 | STL

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CLANG1** | RNAV | EMPTY RINTE SJAAY | ALL |
| **RACYR6** | conventional | BIB PXV | ALL |

#### KMQJ CLANG1

- **EMPTY:** EMPTY | DQN | SNKPT
- **RINTE:** RINTE | SNKPT
- **SJAAY:** SJAAY | WGNER | SNKPT
- **(common):** SNKPT | PENDS | CLANG | [FM from CLANG - not a fix]

#### KMQJ RACYR6

- **BIB:** BIB | REEMO | RACYR
- **PXV:** PXV | RACYR
- **(common):** RACYR | DRWUD | KELLY | VHP

## KTYQ

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | ALL |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | ALL |
| **OOM5** | conventional | PXV | ALL |
| **ROCKY1** | conventional | SPI STL | ALL |

#### KTYQ DAWNN1

- **(common):** DAWNN >=10
- **IIU:** DAWNN | IIU
- **MYS:** DAWNN | MYS

#### KTYQ MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KTYQ MEARZ7

- **(common):** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

#### KTYQ OOM5

- **(common):** OOM
- **PXV:** OOM | WEGEE | PXV

#### KTYQ ROCKY1

- **(common):** TTH | ROCKY
- **SPI:** ROCKY | SPI
- **STL:** ROCKY >=10 | STL

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CLANG1** | RNAV | EMPTY RINTE SJAAY | ALL |
| **RACYR6** | conventional | BIB PXV | ALL |

#### KTYQ CLANG1

- **EMPTY:** EMPTY | DQN | SNKPT
- **RINTE:** RINTE | SNKPT
- **SJAAY:** SJAAY | WGNER | SNKPT
- **(common):** SNKPT | PENDS | CLANG | [FM from CLANG - not a fix]

#### KTYQ RACYR6

- **BIB:** BIB | REEMO | RACYR
- **PXV:** PXV | RACYR
- **(common):** RACYR | DRWUD | KELLY | VHP

## KUMP

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | ALL |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | ALL |
| **OOM5** | conventional | PXV | ALL |
| **ROCKY1** | conventional | SPI STL | ALL |

#### KUMP DAWNN1

- **(common):** DAWNN >=10
- **IIU:** DAWNN | IIU
- **MYS:** DAWNN | MYS

#### KUMP MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KUMP MEARZ7

- **(common):** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

#### KUMP OOM5

- **(common):** OOM
- **PXV:** OOM | WEGEE | PXV

#### KUMP ROCKY1

- **(common):** TTH | ROCKY
- **SPI:** ROCKY | SPI
- **STL:** ROCKY >=10 | STL

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CLANG1** | RNAV | EMPTY RINTE SJAAY | ALL |
| **RACYR6** | conventional | BIB PXV | ALL |

#### KUMP CLANG1

- **EMPTY:** EMPTY | DQN | SNKPT
- **RINTE:** RINTE | SNKPT
- **SJAAY:** SJAAY | WGNER | SNKPT
- **(common):** SNKPT | PENDS | CLANG | [FM from CLANG - not a fix]

#### KUMP RACYR6

- **BIB:** BIB | REEMO | RACYR
- **PXV:** PXV | RACYR
- **(common):** RACYR | DRWUD | KELLY | VHP

## KEYE

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | ALL |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | ALL |
| **OOM5** | conventional | PXV | ALL |
| **ROCKY1** | conventional | SPI STL | ALL |

#### KEYE DAWNN1

- **(common):** DAWNN >=10
- **IIU:** DAWNN | IIU
- **MYS:** DAWNN | MYS

#### KEYE MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KEYE MEARZ7

- **(common):** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

#### KEYE OOM5

- **(common):** OOM
- **PXV:** OOM | WEGEE | PXV

#### KEYE ROCKY1

- **(common):** TTH | ROCKY
- **SPI:** ROCKY | SPI
- **STL:** ROCKY >=10 | STL

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CLANG1** | RNAV | EMPTY RINTE SJAAY | ALL |
| **RACYR6** | conventional | BIB PXV | ALL |

#### KEYE CLANG1

- **EMPTY:** EMPTY | DQN | SNKPT
- **RINTE:** RINTE | SNKPT
- **SJAAY:** SJAAY | WGNER | SNKPT
- **(common):** SNKPT | PENDS | CLANG | [FM from CLANG - not a fix]

#### KEYE RACYR6

- **BIB:** BIB | REEMO | RACYR
- **PXV:** PXV | RACYR
- **(common):** RACYR | DRWUD | KELLY | VHP

## KHFY

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | ALL |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | ALL |
| **OOM5** | conventional | PXV | ALL |
| **ROCKY1** | conventional | SPI STL | ALL |

#### KHFY DAWNN1

- **(common):** DAWNN >=10
- **IIU:** DAWNN | IIU
- **MYS:** DAWNN | MYS

#### KHFY MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KHFY MEARZ7

- **(common):** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

#### KHFY OOM5

- **(common):** OOM
- **PXV:** OOM | WEGEE | PXV

#### KHFY ROCKY1

- **(common):** TTH | ROCKY
- **SPI:** ROCKY | SPI
- **STL:** ROCKY >=10 | STL

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CLANG1** | RNAV | EMPTY RINTE SJAAY | ALL |
| **RACYR6** | conventional | BIB PXV | ALL |

#### KHFY CLANG1

- **EMPTY:** EMPTY | DQN | SNKPT
- **RINTE:** RINTE | SNKPT
- **SJAAY:** SJAAY | WGNER | SNKPT
- **(common):** SNKPT | PENDS | CLANG | [FM from CLANG - not a fix]

#### KHFY RACYR6

- **BIB:** BIB | REEMO | RACYR
- **PXV:** PXV | RACYR
- **(common):** RACYR | DRWUD | KELLY | VHP

## KGEZ

### SIDs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **DAWNN1** | conventional | IIU MYS | RW01 RW19 |
| **MAREO1** | RNAV | KLYNE UKATS | ALL |
| **MEARZ7** | conventional | BVT MZZ | RW01 RW19 |
| **OOM5** | conventional | PXV | RW01 RW19 |
| **ROCKY1** | conventional | SPI STL | RW01 RW19 |

#### KGEZ DAWNN1

- **RW01:** DAWNN
- **RW19:** DAWNN
- **IIU:** DAWNN >=10 | IIU
- **MYS:** DAWNN | MYS

#### KGEZ MAREO1

- **(common):** LUIJE >=3 | MAREO
- **KLYNE:** MAREO | BDOCK | KLYNE
- **UKATS:** MAREO | BDOCK | UKATS

#### KGEZ MEARZ7

- **RW01:** MEARZ
- **RW19:** MEARZ
- **BVT:** MEARZ | SACHS | BVT
- **MZZ:** MEARZ | BRATN | MZZ

#### KGEZ OOM5

- **RW01:** OOM
- **RW19:** OOM
- **PXV:** OOM | WEGEE | PXV

#### KGEZ ROCKY1

- **RW01:** TTH | ROCKY
- **RW19:** TTH | ROCKY
- **SPI:** ROCKY | SPI
- **STL:** ROCKY >=10 | STL

### STARs

| identifier | coding | entry / exit transitions | runway transitions |
| --- | --- | --- | --- |
| **CLANG1** | RNAV | EMPTY RINTE SJAAY | ALL |

#### KGEZ CLANG1

- **EMPTY:** EMPTY | DQN | SNKPT
- **RINTE:** RINTE | SNKPT
- **SJAAY:** SJAAY | WGNER | SNKPT
- **(common):** SNKPT | PENDS | CLANG | [FM from CLANG - not a fix]

## Approaches coded, by field

Identifiers as CIFP codes them: the first letter is the type (I ILS, L localizer, R RNAV (GPS), H RNAV (RNP), V VOR, S VOR/DME, N NDB, X LDA, B localizer back course), then the runway, then a suffix for variants. Names only - approach ladders are not carried.

- **KIND** (24): H05LZ H05RZ H14-Z H23LZ H23RZ H32-Z I05L I05R I14 I23L I23R I32 L05L L05R L14 L23L L23R L32 R05LY R05RY R14-Y R23LY R23RY R32-Y
- **KBAK** (6): I23 L23 R05 R14 R23 R32
- **KMIE** (6): I32 L32 R03 R14 R21 R32
- **KAID** (4): I30 L30 R12 R30
- **KHBE** (0): none coded
- **KMQJ** (7): I25 L25 R07 R16 R25 R34 S34
- **KTYQ** (5): I36 L36 R18 R36 S18
- **KUMP** (3): R15 R33 S33
- **KEYE** (2): L21 R21
- **KHFY** (3): R01 R19 VOR-A
- **KGEZ** (2): R01 R19
- **KCFJ** (2): R05 R23
- **KGPC** (3): R18 R36 VOR-A
- **KOVO** (3): R05 R23-Y R23-Z
- **KUWL** (2): R10 R28
- **2R2** (2): R18 R36
- **5I4** (2): R05 R23
- **I34** (2): R01 R19
- **I99** (0): none coded

## Fixes

Coordinates in decimal degrees as decoded from the CIFP waypoint and navaid records (`EA` en route, `PC` terminal, `D` navaid). A waypoint can move between cycles under the same name, so look a fix up in the cycle you are building from.

| fix | lat | lon |
| --- | --- | --- |
| AADIE | 39.88709 | -86.49233 |
| ALCOV | 39.94774 | -86.04306 |
| ARCAB | 40.59631 | -85.29493 |
| ARTJR | 39.97486 | -85.93680 |
| ATILE | 40.04954 | -86.71741 |
| ATOTE | 39.07618 | -87.20642 |
| BABNE | 40.14026 | -85.61896 |
| BBACK | 39.97446 | -86.61461 |
| BDOCK | 39.93500 | -84.23367 |
| BIB | 38.92034 | -88.48181 |
| BLSTR | 39.70247 | -86.42757 |
| BRATN | 40.13716 | -86.12929 |
| BRBIE | 41.65083 | -88.02276 |
| BUPTE | 39.26930 | -85.80359 |
| BVT | 40.55617 | -87.06937 |
| CCUUK | 40.05906 | -85.80867 |
| CHERZ | 39.44523 | -86.57174 |
| CIBOV | 39.85741 | -86.45151 |
| CIRAM | 39.60133 | -86.44172 |
| CIRGO | 39.84646 | -86.87558 |
| CLANG | 40.01772 | -85.90366 |
| COCOO | 39.46032 | -86.59335 |
| CRCLE | 39.78425 | -86.20871 |
| DAWNN | 38.56825 | -86.22868 |
| DELHI | 41.93333 | -87.78611 |
| DNICK | 40.61194 | -87.54500 |
| DOCEY | 39.58254 | -86.31256 |
| DOTKE | 40.24632 | -85.17663 |
| DQN | 40.01644 | -84.39690 |
| DRWUD | 39.23885 | -86.80262 |
| DUBBX | 39.54028 | -86.55881 |
| EARND | 41.42528 | -87.57222 |
| EASEL | 39.01602 | -85.71297 |
| EBEDE | 39.77071 | -86.43788 |
| EDIIE | 39.43154 | -86.62232 |
| EDODE | 39.60622 | -86.30397 |
| EKEKE | 39.84731 | -86.70247 |
| ELANR | 41.20167 | -87.53333 |
| EMBRR | 38.65230 | -87.23650 |
| EMMLY | 40.45000 | -87.33333 |
| EMPTY | 39.96330 | -83.18694 |
| FAMIL | 39.46078 | -85.97474 |
| FEMGO | 40.02916 | -85.87061 |
| FIIRE | 39.40261 | -86.65143 |
| FRENY | 39.73248 | -86.43227 |
| GAMLE | 38.95532 | -87.01053 |
| GARTE | 39.84063 | -87.55751 |
| GAZPA | 39.85436 | -86.44306 |
| GIIBS | 39.15354 | -85.73704 |
| GLNCH | 38.57383 | -85.64774 |
| HAGAL | 38.18649 | -85.58964 |
| HASEV | 38.37857 | -85.61800 |
| IIU | 38.10346 | -85.57744 |
| IIUUU | 39.54494 | -86.50168 |
| JAAVE | 39.84052 | -88.25472 |
| JAKKS | 40.16424 | -86.87512 |
| JEEDR | 40.26449 | -84.70518 |
| JOCKE | 39.33065 | -85.83893 |
| KEADY | 39.86003 | -86.45481 |
| KELLY | 39.41368 | -86.67137 |
| KEYE | 39.83072 | -86.29439 |
| KGEZ | 39.58314 | -85.80481 |
| KHFY | 39.62761 | -86.08803 |
| KIND | 39.71731 | -86.29464 |
| KLYNE | 40.69846 | -83.31227 |
| KMQJ | 39.84314 | -85.89774 |
| KNIGT | 39.66854 | -86.20261 |
| KOLTS | 39.84088 | -88.09209 |
| KTYQ | 40.02861 | -86.25141 |
| KUMP | 39.93540 | -86.04507 |
| LLARY | 39.87474 | -86.08118 |
| LOVNS | 39.90258 | -85.97112 |
| LUIJE | 39.86036 | -85.63795 |
| MAREO | 39.88280 | -85.24825 |
| MEARZ | 39.99274 | -86.30976 |
| MOSLY | 39.59559 | -86.10721 |
| MRRRK | 39.81231 | -86.49927 |
| MYS | 37.89407 | -86.24453 |
| MZZ | 40.49333 | -85.67925 |
| NADEE | 39.75077 | -86.12213 |
| OLIPE | 38.97277 | -88.06197 |
| OOM | 39.14382 | -86.61302 |
| OPEVE | 39.45629 | -85.98156 |
| OPPIE | 40.14130 | -86.84351 |
| ORIKE | 39.86323 | -86.31278 |
| OZMOE | 39.56920 | -86.07249 |
| PAAAM | 38.95336 | -88.21949 |
| PDIDY | 39.50745 | -86.03980 |
| PENDS | 40.09940 | -85.71513 |
| PETYN | 39.78810 | -86.36004 |
| PLASH | 40.01646 | -84.39708 |
| PNFLD | 39.67165 | -86.35237 |
| PXV | 37.92832 | -87.76238 |
| RACEN | 39.88345 | -86.09437 |
| RACYR | 39.11183 | -86.89740 |
| RAMEY | 39.74572 | -86.10397 |
| REEMO | 38.96037 | -88.16551 |
| RINTE | 40.28781 | -84.04292 |
| ROCKY | 39.58795 | -88.83355 |
| ROGIE | 39.60616 | -86.22733 |
| SACHS | 40.14404 | -86.51179 |
| SADLE | 39.42727 | -85.89481 |
| SJAAY | 40.97890 | -85.18810 |
| SMUKE | 39.26025 | -86.78194 |
| SNKPT | 40.23721 | -85.39423 |
| SPI | 39.83973 | -89.67774 |
| SRGNT | 40.08717 | -84.71033 |
| STL | 38.86072 | -90.48235 |
| TERGE | 37.92846 | -87.76228 |
| TRECY | 39.84243 | -86.25041 |
| TTH | 39.48894 | -87.24901 |
| TTKAY | 39.48569 | -86.49590 |
| UKATS | 40.13458 | -82.62006 |
| USIRE | 39.83973 | -89.67752 |
| VHP | 39.81473 | -86.36750 |
| WAAYN | 39.54917 | -86.52046 |
| WALKU | 40.19149 | -85.18484 |
| WANOB | 39.69840 | -86.47300 |
| WEGEE | 38.51377 | -86.98750 |
| WEIER | 39.85559 | -86.11738 |
| WESLE | 39.47089 | -86.60010 |
| WGNER | 40.73438 | -85.25652 |
| WIDAM | 38.92037 | -88.48160 |
| WONOK | 39.75360 | -86.46006 |
| WOOTE | 38.83116 | -87.10335 |
| WOTSN | 39.46918 | -86.60669 |
| ZASNI | 39.58978 | -86.24471 |
| ZESIT | 39.70510 | -86.10497 |
| ZOSAR | 39.86479 | -86.26064 |
