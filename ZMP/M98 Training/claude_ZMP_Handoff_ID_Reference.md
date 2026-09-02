# ZMP Handoff ID Reference — the four directions

**Shared document.** Byte-identical copies live in `ZMP/ZMP/`, `ZMP/M98 Training/` and
`ZMP/R90/`, on purpose: no facility folder may depend on another folder's files (root
`CLAUDE.md` §2). **A change here must land in every copy in the same commit.** Check with
`md5sum` before assuming they are still in sync.

A handoff ID is **not a property of the receiving position.** It is a property of the *pair* —
who is sending and who is receiving. The same seat has four different addresses depending on
which automation system you are sitting in and whether the receiver is inside your facility,
under your ARTCC, or across a boundary. That is the whole reason this document exists.

Two sources, both pulled **2026-09-01**:

- **Behaviour** — `https://docs.virtualnas.net/` §`crc/stars`, §`crc/eram`, §`crc/overview`
  and §`data-admin/facilities`. These state the composition rules verbatim; every rule below
  is quoted or paraphrased from them and cited in line.
- **Values** — the vNAS facility record for ZMP, `ZMP/_vnas/ZMP_vnas.json`,
  `lastUpdatedAt` **2026-08-26T02:46:34Z**. Neighbouring ARTCC NAS IDs came from their own
  records (recipe in §7).

Anything neither source states is in §8, unfilled, with the reason.

---

## 1. The composition rules

### 1.1 STARS → anywhere

From `crc/stars` §Handoffs, *"Handing Off a Target"*: enter the handoff ID, then slew the
track.

| Receiver | ID form | Example |
|---|---|---|
| **Intra-facility, same subset** | sector ID alone | `N` |
| **Intra-facility, different subset** | TCP = subset + sector ID | `2V` |
| **Host ARTCC** | `C` + two-digit sector | `C05` |
| **Non-host ARTCC** | that ARTCC's NAS ID + two-digit sector | `P05` |
| **Another STARS facility** | `Δ` + handoff number + TCP | `Δ1A` |

`Δ` is the delta/triangle symbol and **is bound to the `` ` `` (backtick) key** — `crc/stars`
§Handoffs states this explicitly.

**The sector may be omitted when only one position is open in the receiving ARTCC**
(`crc/stars` §Handoffs; `crc/overview` §Controller List puts it as *"shortening the STARS to
ERAM handoff ID of C37 to just C when there is only one overlying controller online."*). The
Controller List prints the **full** ID in its first column, so the short form is a
convenience, never the thing to learn first.

**The `C` collision — a real rule that is currently inert at ZMP.** `crc/stars` §Handoffs:

> If you are working a position in a TRACON that hands off to ZOB (who's NAS ID is "C") but
> ZOB is not your host ARTCC (such as the SYR TRACON) then you must use the NAS ID for
> handoffs to your host ARTCC.

**ZOB's NAS ID is `C` (§7) and ZOB is a ZMP neighbour at the ARTCC level.** But the collision
bites a *TRACON*, and **no ZMP TRACON lists ZOB as a neighbour** — the only ARTCC any of them
neighbours is ZAU, whose NAS ID is `G` (§6). **So today every ZMP TRACON addresses ZMP as `C`
and there is no ambiguity.**

This is worth carrying anyway, for two reasons: it is one adaptation change away from being
live, and it is the reason `P` exists as an alternative address for ZMP. **The tool states the
rule and states that it does not currently apply** — which is a different claim from not
mentioning it.

### 1.2 ERAM → anywhere

From `crc/eram` §Handoffs: a handoff is an *implied* command — the receiving sector's ID
followed by the flight ID, `<sector ID> <FLID>`. *"Sector IDs can be found in the Controller
List."* Accept or recall with the bare `<FLID>`. **Handoffs cannot be rejected.**

| Receiver | ID form | Example |
|---|---|---|
| **Another sector in your ARTCC** | the two-digit sector ID | `05` |
| **A STARS facility** | per that facility's Field E format — §1.3 | `M1H` |
| **A CAATS (Canadian) facility** | the ACC's single handoff letter | `W` |
| **Another ARTCC's sector** | **not stated** — see §8.1 | — |

### 1.3 ERAM → STARS, the five Field E formats

`data-admin/facilities` §ERAM Configuration states the formats. Given a STARS facility with
STARS ID `BOA` and single-character ID `B`, handing to **sector `D` in subset `1`**:

| Format | Shape | Example |
|---|---|---|
| `OneLetterAndSubset` | single char + subset + sector | `B1D` |
| `TwoLetters` | two-char ID + sector | `BOD` |
| `TwoLettersAndSubset` | two-char ID + subset + sector | `BO1D` |
| `OneLetterAndStarsId` | Field E letter + STARS ID | `ABOA` |
| `FullStarsIdOnly` | the STARS ID alone | `BOA` |

`FullStarsIdOnly` is documented as **"only for STARS facilities without automated handoffs."**

**Four references all reach the same sector**, per the same page — this is the part that
surprises people:

> a handoff to sector D in subset 1 could be initiated using any of the following references:
> `B` · `BOA` · `B1D` · `BOA1D`

So `B` alone addresses the *facility*; `B1D` addresses the *sector*. Both work.

### 1.4 STARS → STARS, and the number is not symmetric

`data-admin/facilities` §STARS Handoffs: each STARS handoff entry is a neighbouring facility's
ID plus **a unique handoff number**, and *"Controllers will use this handoff number to direct
a handoff to its associated STARS facility."* The worked example is `Δ1G`.

**The number is assigned by the sending facility, so a pair does not agree.** M98 reaches RST
with `Δ1`; RST reaches M98 with `Δ2`. Getting this backwards is a plausible, gradeable error
and it is not visible from either facility's own table alone. §5 carries both directions.

**Point-outs do not cross facilities in STARS** (`crc/stars` §Point Outs: *"Point outs can only
be sent to other controllers within the same STARS system as you"*), and in ERAM they reach
*"only other vNAS ERAM sectors"* (`crc/eram` §Point Outs). A handoff crosses; a point-out does
not. That constrains any drill built on cross-facility coordination.

---

## 2. ZMP as the ERAM host

**NAS ID: `P`.** Single letter, hardcoded, changeable only by a vNAS administrator
(`data-admin/facilities` §ERAM Configuration → General).

**Fifty sectors are adapted** in `eramConfiguration.sectors`:

```
01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
26 27 28 29 30 32 33 34 36 37 38 39 40 42 43 44 46 60 61 62 63 64 70 77 83
```

An ERAM-to-ERAM handoff inside ZMP is the bare two-digit ID: sector 05 is **`05`**.

**Three adaptation anomalies, carried rather than corrected:**

1. **60, 70 and 77 are adapted sectors with no position.** They appear in `sectors` and in no
   `positions` entry. Nothing in the source set says what they are for.
2. **Sector 99 is the reverse** — `MSP_G_CTR` "99 ZMP GUARD" is a position whose sector ID is
   **not** in the adapted `sectors` list.
3. **Sector 11 carries two positions**, `11 AXN HI` and `11 COMBINED`, both `MSP_11_CTR`. The
   ID `11` is therefore ambiguous as to *which* is open; the handoff ID is the same either way.

The 33 sectors that ZMP Order 7200.1O documents as working sectors are a subset of the above;
`claude_ZMP_Sector_Reference.md` is the authority on which, and on the four frequency
conflicts between the order and vNAS. **This document addresses handoff IDs only** and takes
no position on frequency.

---

## 3. ERAM → STARS: every neighbouring STARS facility

All 29 entries of `eramConfiguration.neighboringStarsConfigurations`, verbatim. **"1-char" is
the letter you actually type.** Seventeen use `OneLetterAndSubset`; twelve are
`FullStarsIdOnly`, which per §1.3 means **automated handoffs are not enabled** for them.

| Facility | STARS ID | 2-char | 1-char | Field E format | ZMP types |
|---|---|---|---|---|---|
| **M98** | MMM | MM | **M** | OneLetterAndSubset | `M` + subset + sector |
| **R90** | OOO | OO | **O** | OneLetterAndSubset | `O` + subset + sector |
| **RST** | TTT | TT | **T** | OneLetterAndSubset | `T` + subset + sector |
| **DSM** | DDD | EE | **E** | OneLetterAndSubset | `E` + subset + sector |
| **GRB** | GGG | BB | **B** | OneLetterAndSubset | `B` + subset + sector |
| **DLH** | LLL | LL | **L** | OneLetterAndSubset | `L` + subset + sector |
| **FAR** | HHH | HH | **H** | OneLetterAndSubset | `H` + subset + sector |
| **FSD** | FFF | FF | **F** | OneLetterAndSubset | `F` + subset + sector |
| **BIS** | AAA | AA | **A** | OneLetterAndSubset | `A` + subset + sector |
| **SUX** | YYY | YY | **Y** | OneLetterAndSubset | `Y` + subset + sector |
| **RDR** | RRR | RR | **R** | OneLetterAndSubset | `R` + subset + sector |
| **MIB** | III | II | **I** | OneLetterAndSubset | `I` + subset + sector |
| **APN** | ZZZ | ZZ | **Z** | OneLetterAndSubset | `Z` + subset + sector |
| **AZO** | SSS | SS | **S** | OneLetterAndSubset | `S` + subset + sector |
| **VOK** | JJJ | JJ | **J** | OneLetterAndSubset | `J` + subset + sector |
| **MKE** | MKE | XX | **X** | OneLetterAndSubset | `X` + subset + sector |
| **LAN** | LAN | NN | *(none)* | OneLetterAndSubset | **see below** |
| CID | CID | — | — | FullStarsIdOnly | `CID` |
| D21 | DTW | — | — | FullStarsIdOnly | `DTW` |
| MCI | MCI | — | — | FullStarsIdOnly | `MCI` |
| MLI | MLI | — | — | FullStarsIdOnly | `MLI` |
| MSN | MSN | — | — | FullStarsIdOnly | `MSN` |
| MTC | MTC | — | — | FullStarsIdOnly | `MTC` |
| ROC | ROC | — | — | FullStarsIdOnly | `ROC` |
| TOL | TOL | — | — | FullStarsIdOnly | `TOL` |
| YNG | YNG | — | — | FullStarsIdOnly | `YNG` |
| BIL | BIL | — | — | FullStarsIdOnly | `BIL` |
| GTF | GTF | — | — | FullStarsIdOnly | `GTF` |
| RCA | RCA | — | — | FullStarsIdOnly | `RCA` |

**Two records that do not fit the pattern, preserved as written:**

- **LAN is `OneLetterAndSubset` with no single-character ID.** The format needs a letter and
  the record has none — `twoCharacterStarsId` is `NN`, `singleCharacterStarsId` is absent, and
  no `fieldELetter` is set. `data-admin/facilities` allows a **Field E Letter** to stand in for
  the single-character ID; whether one exists for LAN is not in the record. **Do not guess
  `N`.** Recorded as an anomaly, not corrected.
- **Six facilities have a STARS ID that is not a tripled letter** — MKE, LAN, CID, D21 (`DTW`),
  and the rest of the `FullStarsIdOnly` block. The tripled form (`MMM`, `OOO`, `TTT`) is a
  convention, not a rule.

### ERAM → CAATS

`eramConfiguration.neighboringCaatsConfigurations` — a single letter per ACC. Canadian TCU
(approach) facilities are children of an ACC and **only the parent ACC is listed**
(`data-admin/facilities` §CAATS Facilities).

| ACC | Handoff letter |
|---|---|
| **CZWG** — Winnipeg | **`W`** |
| **CZYZ** — Toronto | **`N`** |

This is the same pair that `claude_ZMP_Sector_Reference.md` records as unable to accept
Automated Information Transfer (7200.1O 3.7), which is why Winnipeg and Toronto handoffs are
manual. **The handoff itself is automated; the AIT that normally rides it is not.**

---

## 4. M98 — Minneapolis TRACON

`starsConfiguration.tcps`, joined to `positions[].starsConfiguration.tcpId`. Terminal sector
**A**. **Every radar position is subset 1; every tower position is subset 2 or 3.**

That single fact is the most useful thing in this section. Radar-to-radar inside M98 is a
**bare letter**; radar-to-tower crosses a subset and therefore **must carry the subset digit**.

### Radar positions — subset 1

| Seat | SOP 2-1 name | Handoff ID |
|---|---|---|
| D | North Departure | **`D`** |
| R | South Departure | **`R`** |
| L | East Departure | **`L`** |
| I | North Feeder | **`I`** |
| H | South Feeder | **`H`** |
| N | North Final / Arrival | **`N`** |
| S | South Final / Arrival | **`S`** |
| J | 17/35 West Final / Arrival | **`J`** |
| E | Flying Cloud Satellite | **`E`** |
| G | St. Paul Satellite | **`G`** |
| K | Crystal Satellite | **`K`** |

All eleven match M98 SOP 2-1 exactly. `MSP_E_APP` carries **two** position records, "Midnight"
and "Flying Cloud Satellite", both on TCP `E.1` — one seat, two names, one handoff ID.

**Two further radar TCPs exist in vNAS and are not SOP 2-1 positions:**

| Seat | vNAS name | Handoff ID |
|---|---|---|
| A | Arrival Overhead | **`A`** |
| W | TMU | **`W`** |

### Tower and ground positions — subsets 2 and 3

| Field | Position | TCP | From a radar seat, type |
|---|---|---|---|
| MSP | Local Control South | V.1 | **`V`** |
| MSP | Local Control North | T.1 | **`T`** |
| MSP | Local Control West | Y.1 | **`Y`** |
| MSP | Ground North / South / West, Ground Metering | Y.2 | **`2Y`** |
| MSP | Clearance Delivery | 6.1 | **`6`** |
| STP | Local Control | P.2 | **`2P`** |
| STP | Ground Control | P.3 | **`3P`** |
| ANE | Local Control | O.2 | **`2O`** |
| ANE | Ground Control | O.3 | **`3O`** |
| FCM | Local Control South | F.2 | **`2F`** |
| FCM | Local Control North | Z.2 | **`2Z`** |
| FCM | Ground Control | F.3 | **`3F`** |
| MIC | Local Control | M.2 | **`2M`** |
| MIC | Ground Control | M.3 | **`3M`** |

**The four MSP ground positions share one TCP.** North, South, West and Ground Metering are
all `Y.2` — a handoff to `2Y` reaches whoever is working ground, and the ID cannot distinguish
them. **MSP's three Local Controls do not share**: V, T and Y.1 are distinct, and `Y` (Local
West) versus `2Y` (any Ground) differ by one digit.

### M98 outward

| Receiver | Type |
|---|---|
| ZMP sector *nn* (host ARTCC) | **`C`** + *nn* — e.g. sector 05 is **`C05`** |
| RST | **`Δ1`** + RST's TCP — e.g. RST Arrival is **`Δ1A`** |
| Any other ARTCC | **not adapted** — `neighboringFacilityIds` is `RST` alone |

`starsHandoffIds` holds exactly one entry, `RST = 1`. **RST is the only STARS facility M98 can
hand off to**, which matches `claude_M98_SOP_Reference.md`'s treatment of the RST boundary as
M98's single terminal interface.

**Four adapted TCPs have no position on them:** `9.3`, `Q.1`, `U.1`, `X.1`. They are valid
handoff IDs with nobody behind them.

---

## 5. R90 — Omaha TRACON

`starsHandoffIds` holds one entry, `SUX = 1`. No terminal sector is adapted.

| Seat | 7220.10B 2-1 name | SOP STARS ID | vNAS TCP | Agreement |
|---|---|---|---|---|
| RW | Radar West | W | W.1 | **agree** |
| RE | Radar East | X | X.1 | **agree** |
| RF | Radar Final | V | V.1 | **agree** |
| RO | Radar Offutt | O | O.1 | **agree** |
| RL | Radar Lincoln | L | L.1 | **agree** |
| **LF** | **Lincoln Final** | **F** | **O.1** | **CONFLICT** |

### 5.1 The Lincoln Final conflict — named, not resolved

**R90 Order 7220.10B §2-1 gives Lincoln Final the STARS ID `F`. vNAS gives `LNK_F_APP` the TCP
`O.1` — the same TCP as Radar Offutt — and adapts no `F` sector in R90 at all.**

The full R90 TCP set is `A.1 A.2 I.1 L.1 N.1 N.2 O.1 T.1 T.2 V.1 W.1 X.1`. There is an
**unassigned `I.1`** and no `F`.

Both readings are defensible and neither source can settle it:

- If the **SOP** is right, vNAS has LNK_F_APP pointed at the wrong TCP, and `F` is either
  unadapted or is the record shown as `I.1`.
- If **vNAS** is right, Lincoln Final and Radar Offutt genuinely share a TCP, and a handoff to
  `O` reaches whichever of the two is open — with no way to address them separately.

**Per root `CLAUDE.md` §6 the conflict is carried, not resolved: the tool shows both columns
and may not silently pick one.** A drill must not quote an R90 Lincoln Final handoff ID without
saying which source it came from. **This is a live owner question** — see
`claude_R90_Gap_Analysis.md`.

An earlier comment in `r90-drill-deck.html` claimed all six positions were "confirmed
independently against vNAS, all six agree." **That was wrong and has been corrected**; five
agree.

### R90 towers

| Field | Position | TCP | Type |
|---|---|---|---|
| OMA | Local Control | A.1 | **`A`** |
| OMA | Ground Control, Clearance Delivery | A.2 | **`2A`** |
| LNK | Local Control | N.1 | **`N`** |
| LNK | Ground Control, Clearance Delivery | N.2 | **`2N`** |
| OFF | Local Control | T.1 | **`T`** |
| OFF | Ground Control | T.2 | **`2T`** |

**Ground and Clearance Delivery share a TCP at both OMA and LNK**, the same pattern as MSP.

### R90 outward

| Receiver | Type |
|---|---|
| ZMP sector *nn* | **`C`** + *nn* — e.g. sector 27 is **`C27`** |
| SUX | **`Δ1`** + SUX's TCP — e.g. SUX Arrival/Departure is **`Δ1N`** |
| Any other ARTCC | **not adapted** — `neighboringFacilityIds` is `SUX` alone |

R90's radar seats are all subset 1 and its towers are subsets 1 and 2, so **`A` reaches Omaha
Local and `2A` reaches Omaha Ground** — one digit apart, exactly as at MSP.

---

## 6. The other ZMP TRACONs

Handoff IDs for every remaining STARS facility under ZMP, for the ERAM seat that has to address
them. **Read with §3**: from an ERAM sector the ID is the facility letter + subset + sector, so
GRB Arrival/Departure (`G.1`) is **`B1G`** — `B` is GRB's single-character ID, not its name.

| Facility | Position | TCP | From ERAM | Δ-number out |
|---|---|---|---|---|
| **GRB** | Arrival/Departure | G.1 | `B1G` | MKE = 1 |
| | Satellite 2 | S.1 | `B1S` | |
| | Satellite 3 | X.1 | `B1X` | |
| | GRB Local / Ground+Del | T.1 / T.2 | `B1T` / `B2T` | |
| | ATW Local / Ground | A.1 / A.2 | `B1A` / `B2A` | |
| | TVC Local / Ground | R.1 / R.2 | `B1R` / `B2R` | |
| **DSM** | AR/DR | D.1 | `E1D` | RST = 1, CID = 2 |
| | AR/DR TRACAB, LC | T.1 | `E1T` | |
| | AR | A.1 | `E1A` | |
| | SR | S.1 | `E1S` | |
| | SR Spare | U.1 | `E1U` | |
| | WR | W.1 | `E1W` | |
| | GC / CD | V.1 | `E1V` | |
| | ALO Local / Ground | L.1 / F.1 | `E1L` / `E1F` | |
| **RST** | AR-RA | A.1 | `T1A` | DSM = 1, **M98 = 2** |
| | AR-RW | W.1 | `T1W` | |
| | Local Control | T.1 | `T1T` | |
| | Ground Control | F.1 | `T1F` | |
| **DLH** | AR/DR TRACAB | L.1 | `L1L` | *(none)* |
| | AR/DR North | N.1 | `L1N` | |
| | AR/DR South | S.1 | `L1S` | |
| | Local / Ground | T.1 / T.2 | `L1T` / `L2T` | |
| **BIS** | RE | E.1 | `A1E` | *(none)* |
| | RW | W.1 | `A1W` | |
| | Local / Ground | T.1 / G.1 | `A1T` / `A1G` | |
| **FAR** | RE | E.1 | `H1E` | RDR = 1 |
| | RW | W.1 | `H1W` | |
| | TRACAB, Local | T.1 | `H1T` | |
| | Ground | G.1 | `H1G` | |
| **SUX** | Arrival/Departure | N.1 | `Y1N` | R90 = 1, FSD = 2 |
| | Arrival/Departure TRACAB | R.1 | `Y1R` | |
| | Local / Ground | T.1 / G.1 | `Y1T` / `Y1G` | |
| **FSD** | RE | E.1 | `F1E` | SUX = 1 |
| | RW | W.1 | `F1W` | |
| | TRACAB, Local | T.1 | `F1T` | |
| | Ground | G.1 | `F1G` | |
| **APN** | AR/DR | A.1 | `Z1A` | *(none)* |
| | GCA | F.1 | `Z1F` | |
| | Local / Ground | Z.1 / Z.2 | `Z1Z` / `Z2Z` | |
| **RDR** | RE | E.1 | `R1E` | FAR = 1 |
| | RW | W.1 | `R1W` | |
| | GFK AR | A.1 | `R1A` | |
| | RDR AR | R.1 | `R1R` | |
| | Local / Ground | Z.1 / Z.2 | `R1Z` / `R2Z` | |
| | GFK LC1 / LC2 | U.1 / G.1 | `R1U` / `R1G` | |
| | GFK Ground / CD | D.1 | `R1D` | |
| **MIB** | Approach | B.1 | `I1B` | *(none)* |
| | Local / Ground | M.1 / M.2 | `I1M` / `I2M` | |

**Unassigned TCPs elsewhere:** RST `M.1`, SUX `S.1`, FSD `A.1`, R90 `I.1`, M98 `9.3 Q.1 U.1 X.1`.

### 6.1 Which facilities can reach another ARTCC

`neighboringFacilityIds` carries **both** STARS facilities and ARTCCs. Three ZMP TRACONs
neighbour an ARTCC other than ZMP, and it is **ZAU (`G`)** in all three cases:

| Facility | STARS neighbours | ARTCC neighbours | Non-host form available |
|---|---|---|---|
| **GRB** | MKE | **ZAU** | **yes** — `G` + ZAU sector |
| **DSM** | CID, RST | **ZAU** | **yes** — `G` + ZAU sector |
| **RST** | DSM, M98 | **ZAU** | **yes** — `G` + ZAU sector |
| M98 | RST | — | no |
| R90 | SUX | — | no |
| FAR | RDR | — | no |
| SUX | FSD, R90 | — | no |
| FSD | SUX | — | no |
| RDR | FAR | — | no |
| DLH, BIS, MIB | *(none)* | — | no |
| APN | *(none)* | *(CZYZ, non-NAS)* | no |

**Four ZMP TRACONs have no STARS-to-STARS neighbour at all** — DLH, BIS, APN and MIB. From
those the only outward handoff is `C` + ZMP sector.

**APN's only neighbour is CZYZ**, listed under `nonNasFacilityIds` rather than
`neighboringFacilityIds` — Toronto, the same ACC that ZMP addresses as `N` (§3). What form APN
uses from STARS is not stated; the CAATS letter table is an **ERAM** adaptation.

**Facilities with no automation config**: MOT, GRI, LSE, EAU, CWA, GOV, SAW, RYM, STC. These
are tower-only positions with no STARS configuration, so **they have no handoff ID** and a
handoff to them is not a thing the platform can express.

---

## 7. Neighbouring ARTCC NAS IDs

Needed for the STARS **non-host ARTCC** form (§1.1) and for the `C` collision (§1.1). Each is
`eramConfiguration.nasId` from that ARTCC's own vNAS record.

| ARTCC | NAS ID | Record `lastUpdatedAt` |
|---|---|---|
| **ZMP** (host) | **`P`** | 2026-08-26T02:46:34Z |
| ZAU — Chicago | **`G`** | 2026-08-31T16:59:37Z |
| ZDV — Denver | **`D`** | 2026-09-01T02:05:28Z |
| ZKC — Kansas City | **`K`** | 2026-08-31T04:45:26Z |
| ZLC — Salt Lake | **`U`** | 2026-08-27T16:21:04Z |
| **ZOB — Cleveland** | **`C`** | 2026-08-26T02:46:05Z |

**ZOB's `C` is the collision.** See §1.1.

ZMP's `neighboringFacilityIds` names ten: AZO, CID, LAN, MKE, VOK, **ZAU, ZDV, ZKC, ZLC, ZOB**.
The first five are STARS facilities and appear in §3.

### Re-pulling

```bash
for a in ZMP ZAU ZDV ZKC ZLC ZOB; do curl -sS -A "Mozilla/5.0" -o "artcc_$a.json" "https://data-api.vnas.vatsim.net/api/artccs/$a"; done
```

Only ZMP's record is committed (`ZMP/_vnas/ZMP_vnas.json`). The other five were pulled for the
six NAS-ID letters above and **not committed** — the letters are the whole payload and they are
in the table. Re-pull to verify.

---

## 8. What these sources do not answer

### 8.1 ERAM → another ARTCC's sector

`crc/eram` §Handoffs states the form for a sector ID and says sector IDs come from the
Controller List. **It never states how an adjacent ARTCC's sector is addressed from ERAM.**
There is no `neighboringEramConfigurations` in the facility record — only STARS and CAATS. By
symmetry with STARS it would be the NAS ID plus the sector, but **symmetry is not a citation
and the tool does not assert it.**

*Answerable by:* the same Controller List screenshot, with a neighbouring ARTCC sector online.

### 8.2 LAN's Field E letter

§3. The format demands a letter the record does not carry.

### 8.3 What sectors 60, 70 and 77 are

§2. Adapted, unnamed, no position.

### 8.4 Whether R90's Lincoln Final is `F` or `O`

§5.1. The one conflict that changes a keystroke a trainee would actually type.

---

## 9. What is fully covered and needs nothing

- **The composition rules for all four directions**, except the one gap in §8.1. Quoted
  from the platform documentation, not inferred.
- **Every intra-facility handoff ID under ZMP** — every TCP, every subset, every position that
  has one, for all thirteen STARS facilities.
- **Every ERAM→STARS letter and format** for all 29 neighbouring STARS facilities.
- **Both CAATS letters.**
- **All six NAS IDs** that ZMP or its children could need.
- **The STARS→STARS handoff numbers in both directions** for every adapted pair.
