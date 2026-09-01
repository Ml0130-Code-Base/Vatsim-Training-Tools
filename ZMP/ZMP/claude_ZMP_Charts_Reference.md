# ZMP Chart PDFs — text-layer audit and harvest

Scope: the four chart PDFs and their `pdftotext -layout` sidecars in
`C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/` and `.../source-docs/txt/`.

**Nothing in this file is inferred from outside knowledge.** Every identifier, number and
label below is a literal token present in the PDF text layer. Where I reconstructed a string
from overlapping glyph runs it is marked RECONSTRUCTED. Where a value is not in the document
it is written as "not stated in <file>".

---

## 0. Extraction provenance (how these notes were produced)

Tooling available in this environment:

- `pdftotext` = **xpdf 4.00** (`/mingw64/bin/pdftotext`), *not* poppler.
  It has no `-bbox` / `-bbox-layout`, so no true glyph coordinates are obtainable.
- No Python (`python` is the Microsoft Store stub), so no pypdf / pdfplumber / PyMuPDF.
- No `strings`; PDF internals were probed with `grep -a`.

Two independent extractions were run on every file and cross-checked:

| mode | what it preserves |
|---|---|
| `pdftotext -layout` | visual position, re-rendered onto a character grid |
| `pdftotext -raw` | **content-stream order**, i.e. the order the PDF draws the strings |

Working files (kept, in case the authoring phase wants to re-derive anything):

- `.../scratchpad/pdfcheck/ZMP_Low_Sectors_lay.txt`, `..._raw.txt`
- `.../scratchpad/pdfcheck/ZMP_Control_Towers_lay.txt`, `..._raw.txt`
- `.../scratchpad/pdfcheck/tokens.txt` — every Low-Sectors token as `L<line> C<col> <token>`

**Grid → page conversion for the Low Sectors chart** (used only for the proximity appendix
in §2.9): the layout grid is 1493 columns × 179 lines mapped onto a MediaBox of
1224 × 792 pt, so 1 column ≈ 0.820 pt and 1 line ≈ 4.425 pt.

---

## 1. What text layer each file actually has — verified

| file | producer | text layer? | evidence |
|---|---|---|---|
| `ZMP_Low_Sectors.pdf` | (no /Producer string; uses `/ObjStm` compressed object streams) | **YES — real, extractable** | 502 tokens recovered; `-layout` 55,741 B, `-raw` 5,028 B |
| `ZMP_High_Sectors.pdf` | Adobe Illustrator 25.2 (Windows) / Adobe PDF library 15.00 | **NO — none at all** | see §4 |
| `ZMP_Approach_Sectors.pdf` | Adobe Photoshop 21.0 (Windows), "Image Conversion Plug-in" | **NO — raster scan** | see §5 |
| `ZMP_Control_Towers.pdf` | PrimoPDF | **YES — clean, fully readable** | 19 `/Font`, 3 `/TrueType`; see §3 |

Page geometry:

| file | MediaBox (pt) | implied sheet |
|---|---|---|
| ZMP_Low_Sectors | `[0 0 1224 792]` | 17 × 11 in landscape |
| ZMP_High_Sectors | `[0 0 1224 792]` | 17 × 11 in landscape |
| ZMP_Approach_Sectors | `[0 0 792 612]` | 11 × 8.5 in landscape |
| ZMP_Control_Towers | `[0 0 612 792]` | 8.5 × 11 in portrait |

All four PDFs are **single-page** (`/Count 1`; Low Sectors' count sits inside a compressed
object stream, but `-layout` emits exactly one form-feed).

The two 1-byte sidecars are not truncated files — each contains exactly one byte, `0x0C`
(form feed), i.e. pdftotext found one page and zero characters on it.

---

## 2. ZMP_Low_Sectors.pdf — "FULL CENTER LOW CHART"

Source: `C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/txt/ZMP_Low_Sectors.txt`
(re-verified against a fresh `-layout` and `-raw` extraction of the PDF).

### 2.1 Title block and chart identity

Literal tokens, with grid position:

| text | position | note |
|---|---|---|
| `MINNEAPOLIS ARTCC` | L005 C0376 | chart title |
| `FULL CENTER LOW CHART` | L008 C0371 | chart subtitle |
| `10/08/20` | L015 C0397 | the only date-like string on the sheet |

- The date is transcribed **verbatim as `10/08/20`**. The chart does **not** label it
  "effective", "revised" or anything else, and the day/month order is not stated in
  `ZMP_Low_Sectors.txt`. Do not expand it to a full date.
- A chart/form number analogous to the Control Towers sheet's `0906-5 (VZMP)` is
  **not stated in `ZMP_Low_Sectors.txt`** — no such token exists.
- A `(ZMP)` facility tag like the one on the Control Towers sheet is likewise
  **not stated in `ZMP_Low_Sectors.txt`**.

### 2.2 Scale bar — NOT sector numbers

L010 reads, in full: `YIB  25  0  25  UAU  50  75  100  125  YZ`
with `NM` on L014 C0401.

The run `25 0 25 50 75 100 125` at columns C0367–C0473 is the **distance scale in NM**.
`YIB`, `UAU` and `YZ` are unrelated labels that happen to fall on the same text line.
**These seven numbers must not be read as sector numbers.** Flagging this explicitly
because "25", "50", "75", "100" and "125" would otherwise pollute any regex sweep.

### 2.3 VERIFIED LIST A — two-digit sector numbers

Every standalone two-digit token on the sheet, excluding the §2.2 scale bar. Presented as
a flat list with position only; **see §2.9 for why these are deliberately not paired with
altitudes here.**

| sector | grid position | nearest identifiers on/near the same rows (context only) |
|---|---|---|
| `01` | L041 C0555 | ISQ (L041 C0546), PLN, IWD, SAW |
| `02` | L062 C0559 | TVC (L060 C0555), MBL, AUW |
| `03` | L030 C0386 | RDR, EVM, SSM, IWD |
| `04` | L064 C0391 | AUW (L064 C0402), EAU, GEP |
| `05` | L090 C0375 | RWF (L090 C0282), ONA, VOK, DLL |
| `06` | L060 C0330 | MOX (L060 C0212), TVC, MNM |
| `07` | L100 C0325 | RST (L101 C0337), FRM, AEL, JAY |
| `08` | L088 C0297 | ONA (L088 C0367), VOK, RWF |
| `09` | L073 C0282 | ATY (L073 C0192), MTW, MSP, FCM |
| `10` | L055 C0302 | AXN (L055 C0282), RZN, FFM |
| `21` | L079 C0329 | FGT (L079 C0325), OTG, MML |
| `23` | L047 C0044 | IMT, ESC on the same line far right; BIS/FAR above |
| `24` | L020 C0145 | MIB (L022 C0052), MOT, ISN, DVL |
| `26` | L146 C0177 | BRL (L146 C0391), OBH, OLU, SAE |
| `27` | L144 C0292 | OBH (L144 C0171), OLU, OVR, OFF |
| `33` | L072 C0140 | ATY, HON, ABR, MSP |
| `36` | L112 C0302 | SPW, MCW (L112 C0325), JVL, PNT |
| `37` | L126 C0171 | TST, ZDV, SUX (L126 C0234), CID |

**Two further two-digit tokens exist and are flagged, not asserted:**

- **`25` at L018 C0306.** Sits among `BDE` / `INL` (L016) and `ELO` (L022) — far-northern
  Minnesota, inside ZMP. It is 8 lines below and ~60 columns left of the scale bar, so it
  is *not* part of the scale-bar run. **Most probably sector 25, but not confirmed** —
  the sheet gives no textual confirmation, and "25" also occurs twice as a scale tick.
- **`83` at L073 C0551.** Sits among `MTW` (Manitowoc), `TVC` (Traverse City) and `MKG`
  (Muskegon) — i.e. over/near Lake Michigan, which on this sheet is on the far side of the
  `MINNEAPOLIS`/`CHICAGO` and `MINNEAPOLIS`/`CLEVELAND` boundary lettering. It breaks the
  01–10 / 21–37 pattern of every other number above. **Do not treat `83` as a ZMP sector
  without independent confirmation**; whose sector it is is not stated in
  `ZMP_Low_Sectors.txt`.

Sector numbers that do **not** appear anywhere in the text layer (so: absent from this
sheet's text, which is not the same as absent from the chart — a number drawn as outlines
would be invisible to extraction): no token exists for 11–20, 22, 28–32, 34, 35, or
anything above 37 other than the `83` above.

### 2.4 VERIFIED LIST B — altitude-stratum strings

Every altitude string on the sheet, as literally rendered. Multi-line labels are joined
only where the fragments are vertically stacked in the same column (that join is safe;
it is the same label wrapped across two rows).

| # | string as it appears | position (anchor) | joined from |
|---|---|---|---|
| 1 | `5,000 MSL & BLW TO ZMP` | L003 C0178 | L003 `5,000 MSL &` + L004 C0177 `BLW TO ZMP` |
| 2 | `3,000 MSL & BLW TO ZMP` | L005 C0125 | L005 `3,000 MSL &` + L006 C0124 `BLW TO ZMP` |
| 3 | `23,000 & BLW` | L020 C0044 | single row |
| 4 | `23,999` | L028 C0628 | see note below |
| 5 | `8,000 & BLW` | L030 C0309 | L030 `8,000` + L031 C0308 `& BLW` |
| 6 | `10,000 & BLW` | L032 C0171 | single row |
| 7 | `12,000 & BLW` | L035 C0306 | see LKI note in §2.6 |
| 8 | `15,000 & BLW` | L043 C0059 | single row |
| 9 | `10,000 & BLW` | L043 C0185 | single row |
| 10 | `12,000 & BLW` | L043 C0619 | single row |
| 11 | `4,000 & BLW` | L055 C0479 | L055 `4,000` + L056 C0478 `& BLW` |
| 12 | `13,000 & BLW` | L062 C0457 | single row |
| 13 | `17,000 & BLW` | L068 C0302 | L068 `17,000` + L069 C0302 `& BLW` |
| 14 | `10,000 & BLW` | L083 C0614 | single row |
| 15 | `10,000 & BLW` | L088 C0398 | L088 `10,000` + L089 C0395 `& BLW` |
| 16 | `9,000 & BLW` | L092 C0325 | L092 `9,000` + L096 C0325 `& BLW` |
| 17 | `15,000 & BLW` | L100 C0336 | L100 `15,000` + L101 `& … BLW` (RST overlaps) |
| 18 | `10,000 & BLW` | L110 C0192 | single row |
| 19 | `10,000 & BLW TO ALO TWR` | L114 C0386 | L114 + L115 C0386 `TO ALO TWR` |
| 20 | `10,000 & BLW` | L118 C0330 | single row |
| 21 | `10,000 & BLW` | L124 C0197 | single row |
| 22 | `10,000 & BLW` | L130 C0302 | single row |
| 23 | `15,000 & BLW` | L139 C0216 | on the same row as `R90 WEST` (L139 C0207) |
| 24 | `15,000 & BLW` | L142 C0197 | single row |
| 25 | `10,000 & BLW` | L160 C0209 | L160 `10,000` + L161 C0209 `& BLW` |
| 26 | `7,000 & BLW TO ZMP ARTCC` | L172 C0085 | L172 + L173 C0082 `TO ZMP ARTCC` |

Notes on individual entries:

- **#4 `23,999`** is stacked directly above `TO YZ CENTRE` (L029 C0620 `TO` / C0623 `YZ` /
  C0626 `CENTRE`). This vertical stack is unambiguous, so the label reads
  **`23,999` / `TO YZ CENTRE`**. The sheet does **not** print "& BLW" on this one — do not
  add it.
- **#17** the row below `15,000` is `& RST BLW` because the navaid label `RST` is drawn
  through the middle of the altitude label. The altitude is `15,000 & BLW`; `RST` is a
  separate identifier that happens to overlap.
- The distinct altitude *values* occurring on the sheet are:
  **3,000 / 4,000 / 5,000 / 7,000 / 8,000 / 9,000 / 10,000 / 12,000 / 13,000 / 15,000 /
  17,000 / 23,000 / 23,999.**
  `10,000 & BLW` is by far the most frequent (10 occurrences).
  Note that **`4,000 & BLW` is present** but the strings `6,000`, `11,000`, `14,000`,
  `16,000` and `18,000`–`22,000` do **not** occur anywhere on this sheet.

### 2.5 Other numeric / route annotations (verbatim, uninterpreted)

| token(s) | position | full line context |
|---|---|---|
| `R90 EAST` | L138 C0231 | `R90 EAST` |
| `R90 WEST` + `15,000 & BLW` | L139 C0207/C0216 | `R90 WEST 15,000 & BLW` |
| `R90 LNK` | L159 C0207 | `OZB EAR R90 LNK SPI` |
| `100 TO R90 LKN` | L167 C0297 | `PWE 100 TO R90 LKN` |
| `110-150` | L169 C0302 | `HCT DEN VER STJ 110-150` |
| `TO R90 WEST` | L171 C0302 | `M INNEAPOLIS KANSAS CITY RBA TO R90 WEST` |
| `TO ALO TWR` | L115 C0386 | see §2.4 #19 |
| `TO YZ CENTRE` | L029 C0620 | see §2.4 #4 |
| `TO ZMP ARTCC` | L173 C0082 | see §2.4 #26 |

Cautions:

- `LKN` (L167) vs `LNK` (L153 C0212, L159 C0211). `LNK` occurs twice standalone; `LKN`
  occurs once inside the `100 TO R90 LKN` string. These are almost certainly the same
  identifier with the glyph run emitted out of order, but the sheet is transcribed
  verbatim here — **which spelling is correct is not resolvable from the text layer.**
- `100` in `100 TO R90 LKN` and `110-150` next to `STJ` are transcribed as-is. Whether
  they are flight levels, altitudes in hundreds, or something else is
  **not stated in `ZMP_Low_Sectors.txt`** — no units accompany them.

### 2.6 Navaid / airport identifiers recovered

170 distinct three-letter US identifiers, alphabetical. (Facility codes ZAU/ZDV/ZKC/ZMP/ZOB
and the non-identifier fragments BLW, MSL, LOW, TWR, DEN, VER, LIS, CHI, CPA, GLO, HEE,
TIU, OFB, MNP, NATL, OONR, BOVE have been excluded — those are pieces of altitude labels
or of the boundary lettering described in §2.7.)

```
ABR AEL AIA AKO ALO ANW ANX APN ASP ATY AUW AXC AXN BAE BDE BDF BDH BFF BIE BIS
BJB BMI BQS BRL CGG CID CMX CUZ CVA DBQ DDD DIK DLH DLL DPR DSM DTL DVL DWN EAR
EAU ECK ELO ESC EVM FAH FAR FCM FFM FGT FNT FOD FOW FRM FSD GBG GEP GFK GLD GLR
GPZ GRB GRI HCT HIB HLC HML HON HRK HSI HYR IDJ IJX IMT INL IOW IRK ISN ISQ IWD
JAY JMS JVL JWJ LAN LBF LJT LKI LMN LNK LNR LSE MBL MBS MCI MCK MCW MHE MHK MIB
MKG MKT MML MNM MOP MOT MOX MSN MSP MTC MTW MVE MZV OBH ODI OFF OFK OLU ONA ONL
OTG OTM OVR OZB PHP PIA PIR PKD PLL PLN PNT PSI PWE RAP RBA RCA RDR RFD RHI ROX
RST RWF RZN SAE SAW SCB SNY SPI SPW SSM STJ SUX TDD TKO TNU TOP TST TVC TVF TXC
UAU UIN UKN VBI VIO VOK
```

Plus Canadian / oceanic-side identifiers on the north and east edges:

```
YBR  YIB  YKN  YQT  YSB  YSP  YWG  YXZ  YZ
```

- `YWG` is split across two tokens on L001 (`YW` at C0171 + `G` at C0174) — joined here;
  it is unambiguous.
- `YZ` occurs twice: L010 C0542 (a map label) and L029 C0623 inside `TO YZ CENTRE`.
- `VBI` (L003 C0287), `UAU` (L010 C0389) and `HML` (L006 C0202) sit in the Canadian
  portion of the sheet. Whether they are Canadian navaids is not stated in the file.
- **`LKI` is a reconstruction.** L035 C0315 is the single glyph run `BLLKWI`, which is
  `BLW` and `LKI` drawn on top of one another (`B,L`+`L,K`+`W,I` interleaved). The `BLW`
  half is confirmed by the `12,000 &` immediately preceding it. `LKI` is therefore
  RECONSTRUCTED, not directly read.

### 2.7 Area legend, neighbouring facilities, and edge labels

**Area legend** — a two-column key in the upper right of the sheet:

| left column (C0609) | right column (C0641) |
|---|---|
| `AREA 1` (L008) | `AREA 4` (L006) |
| `AREA 2` (L009) | `AREA 5` (L008) |
| `AREA 3` (L020) | `AREA 6` (L020) |

So the sheet names **Areas 1 through 6**. Which sectors belong to which Area is
**UNREAD** — the key's colour swatches / hatching are vector graphics with no text, and no
sector number appears adjacent to any `AREA n` token.

**Neighbouring ARTCCs / FIRs named on the sheet:**

| code | spelled-out name present? | position of code |
|---|---|---|
| `ZAU` | `CHICAGO` appears as boundary lettering | L110 C0391 |
| `ZDV` | `DENVER` appears as boundary lettering | L126 C0074 |
| `ZKC` | `KANSAS CITY` appears as boundary lettering | L175 C0239 |
| `ZOB` | `CLEVELAND` appears as boundary lettering | L072 C0639 |
| — | `WINNIPEG` (L005 C0044, L012 C0340) | no `ZWG` token on this sheet |
| — | `TORONTO` (L004, L012 C0543, L013 C0595) | no `ZYZ` token; `YZ` used instead |
| — | `SALT LAKE CITY` (L037 C0007–C0019) | no `ZLC` token on this sheet |

**Boundary lettering.** ZMP's boundary is annotated by repeating the two facility names
along the line, mirrored on each side. In `-raw` (draw order) this comes out cleanly as
repeating groups; the whole block repeats **four times** in the content stream:

```
SALT LAKE CITY / MINNEAPOLIS
MINNEAPOLIS / DENVER
DENVER / MINNEAPOLIS
WINNIPEG / MINNEAPOLIS
MINNEAPOLIS / CHICAGO
KANSAS CITY / CHICAGO
MINNEAPOLIS / KANSAS CITY
MINNEAPOLIS / KANSAS CITY
DENVER / MINNEAPOLIS
```

In `-layout` the same lettering lands as the unreadable mash on L015, L019, L077, L080–L086,
L153, L170, L171, L175 (e.g. `CCMHHINICINIACNEGAAONPOGELIOSA`,
`CCLLEEVVEELLAANNDDGOHIC`, `M INNEAPKOALN ISSAS CITY`). Those strings carry no information
beyond the pairings already listed — do not try to mine them further.

**International boundary:** `CANADA` (L012 C0465) over `UNITED` (L014 C0457) /
`STATES` (L013 C0465).

**Canadian airspace labels** (recovered cleanly from `-raw` draw order, where they are
*not* overlapped):

- `SOUTHERN DOMESTIC AIRSPACE` — raw fragments `SO UTHERN` / `DO M` `ESTI` / `A I` `RSPA CE`.
  Appears twice in the content stream. In `-layout` it is the mangled L018/L047 text.
- `DEFENSE AREA` — raw fragments `DEF` / `EN SE` / `A REA`. Appears twice.
  **The full name of this area is not stated in `ZMP_Low_Sectors.txt`** — only the words
  "DEFENSE" and "AREA" are present. Do not expand it to "Air Defense Identification Zone"
  or any other phrase.

**East-edge FL290 label — PARTIALLY UNREAD.** L003 C0639–C0685 is a single mash of two
overlapping labels:

```
MT OONR TO RE NATL OFB L2 E9 LO 0WANFD L29 A0 BOVE
```

with the clean token `TORONTO` on L004 C0661 directly below.

What is *certain*: there are **two** labels; one of them is **TORONTO**; the fragments
contain `FL29`+`0` twice, `AND`, `BELOW` and `ABOVE`.
What is *likely but RECONSTRUCTED*: the pair reads as `MONTREAL FL290 AND …` /
`TORONTO FL290 AND …`. Evidence for MONTREAL: the first nine characters de-interleave
exactly as `M,O,N,…` / `T,O,R,…`, and `-raw` emits a clean `MONT` token nearby.
Evidence against a clean fit: a letter-frequency check of the mash is one `A`, one `N` and
one `D` short of `MONTREAL FL290 AND BELOW` + `TORONTO FL290 AND ABOVE`, and has one `0`
too many — so at least one word differs (possibly `&` in place of one `AND`).
**Which facility gets ABOVE and which gets BELOW is NOT recoverable** and must not be
guessed. Treat this label as unread pending a look at the rendered page.

### 2.8 WHAT REMAINS UNREAD ON THIS SHEET — the sector boundaries

This is the single biggest gap, and it is structural, not a tooling failure.

**Every sector boundary on `ZMP_Low_Sectors.pdf` is drawn, not written.** The text layer
contains only point labels — a sector *number*, an *altitude string*, a *navaid ident*.
The polygons that say which piece of airspace each number governs are vector line work
carrying no text. Consequently the following are UNREAD and cannot be derived from any
text extraction, no matter which tool is used:

1. **Sector geometry** — the lat/long or fix-to-fix outline of any of the 18–19 sectors.
2. **Which sector each altitude stratum belongs to** — see §2.9; only proximity is
   available, and proximity is not authority.
3. **Which sectors compose Areas 1–6** — the legend is colour-coded; the colours are graphics.
4. **Which navaid sits in which sector.**
5. **Where each `10,000 & BLW` applies** — ten separate instances, all identical strings,
   distinguishable only by position on the drawing.
6. **Sector-to-sector adjacency**, and which sectors touch which neighbouring ARTCC.
7. **The shelf/stratum stacking** — whether e.g. `17,000 & BLW` overlies or abuts
   `10,000 & BLW`.
8. The east-edge FL290 label of §2.7.

To close these gaps someone must **look at the rendered page** (or obtain a vector/GIS
source). No further text extraction will help.

### 2.9 APPENDIX — proximity hints ONLY. NOT VERIFIED PAIRINGS.

Requested caveat, restated plainly: **positional association from jumbled `pdftotext`
output is unreliable.** §2.3 and §2.4 above are the two independent verified lists and are
the authoritative output of this harvest. The table below is a *mechanical* nearest-
neighbour computation (Euclidean distance in points, using the grid→page conversion in §0)
offered only as a search hint for whoever validates against the rendered chart.

Why even a "clear" row here is not evidence: an altitude label on an en-route chart is
routinely placed against a *boundary line* — describing the airspace on one side of that
line — rather than inside the polygon whose number happens to be nearest. Proximity
therefore cannot distinguish "this sector's stratum" from "the neighbour's stratum".

`ratio` = (distance to 2nd-nearest) ÷ (distance to nearest); higher = less contested.

| sector | nearest altitude label | dist | 2nd nearest | dist | ratio | verdict |
|---|---|---|---|---|---|---|
| 07 | 15,000 & BLW | 9.0 pt | 9,000 & BLW | 35.4 | 3.93 | least contested |
| 05 | 10,000 & BLW | 20.8 pt | 9,000 & BLW | 41.9 | 2.01 | contested |
| 23 | 15,000 & BLW | 21.6 pt | 10,000 & BLW | 116.9 | 5.43 | least contested |
| 37 | 10,000 & BLW | 23.1 pt | 15,000 & BLW (R90 W) | 68.3 | 2.96 | least contested |
| 26 | 15,000 & BLW | 24.1 pt | 15,000 & BLW (R90 W) | 44.5 | 1.85 | both候 = 15,000 |
| 09 | 17,000 & BLW | 27.5 pt | 9,000 & BLW | 91.2 | 3.31 | least contested |
| 08 | 9,000 & BLW | 29.0 pt | 15,000 & BLW | 62.0 | 2.14 | contested |
| 36 | 10,000 & BLW | 35.1 pt | 15,000 & BLW | 60.0 | 1.71 | ambiguous |
| 06 | 17,000 & BLW | 42.2 pt | 13,000 & BLW | 104.5 | 2.48 | contested |
| 01 | 12,000 & BLW | 53.2 pt | 23,999 | 83.0 | 1.56 | ambiguous |
| 25? | 8,000 & BLW | 53.2 pt | 12,000 & BLW | 75.2 | 1.42 | ambiguous |
| 21 | 17,000 & BLW | 53.5 pt | 9,000 & BLW | 57.6 | 1.08 | ambiguous |
| 04 | 13,000 & BLW | 54.8 pt | 17,000 & BLW | 75.1 | 1.37 | ambiguous |
| 24 | 10,000 & BLW | 57.2 pt | 23,000 & BLW | 82.8 | 1.45 | ambiguous |
| 10 | 17,000 & BLW | 57.5 pt | 12,000 & BLW | 88.6 | 1.54 | ambiguous |
| 27 | 10,000 & BLW | 62.5 pt | 15,000 & BLW (R90 W) | 66.1 | 1.06 | ambiguous |
| 03 | 8,000 & BLW | 63.1 pt | 12,000 & BLW | 69.2 | 1.10 | ambiguous |
| 83? | 10,000 & BLW | 68.0 pt | 13,000 & BLW | 91.1 | 1.34 | ambiguous |
| 02 | 4,000 & BLW | 72.5 pt | 13,000 & BLW | 83.6 | 1.15 | ambiguous |
| 33 | 10,000 & BLW | 133.5 pt | 17,000 & BLW | 134.0 | 1.00 | no useful hint |

(Row for sector 26: both candidates carry the same value, `15,000 & BLW`, so the *value*
is stable there even though the *label* is not identifiable — noted for completeness only.)

**The only pairings the raw text unambiguously makes**, because the strings are vertically
stacked in one column and nothing else intervenes, are label-internal ones — not
sector-to-altitude:

- `23,999` + `TO YZ CENTRE`
- `10,000 & BLW` + `TO ALO TWR`
- `7,000 & BLW` + `TO ZMP ARTCC`
- `5,000 MSL &` + `BLW TO ZMP`
- `3,000 MSL &` + `BLW TO ZMP`
- `R90 WEST` + `15,000 & BLW` (same text row, adjacent columns C0207/C0216)

**No sector number is unambiguously paired with any altitude by the raw text.**

---

## 3. ZMP_Control_Towers.pdf — full harvest (clean text)

Source: `C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/txt/ZMP_Control_Towers.txt`.
This file is fully readable. The `-raw` content-stream order groups each tower's name,
altitude and frequency into one consecutive block, and the `-layout` column positions
agree with those groupings **exactly**. Both methods therefore independently confirm the
table below — this is the one genuinely reliable pairing in this whole document set.

### 3.1 Sheet identity

| field | value |
|---|---|
| Title | `MINNEAPOLIS ARTCC` |
| Subtitle | `CONTROL TOWERS` |
| Facility tag | `(ZMP)` |
| Chart / form number | `0906-5 (VZMP)` |
| Validity | `9 JAN 2010 to 9 APR 2010` (printed twice, once in each side margin) |
| Footer | `VATSIM MINNEAPOLIS AIR ROUTE TRAFFIC CONTROL CENTER` |
| Footer | `DEPARTMENT OF FACILITY ENGINEERING` |

Note the validity window is transcribed exactly as printed. This sheet is dated 2010 and
is therefore far older than the `10/08/20` on the Low Sectors sheet — worth flagging to
the authoring phase as a currency risk.

### 3.2 Control towers — delegated airspace and frequency

| tower | delegated airspace | frequency |
|---|---|---|
| BISMARCK | SFC – 4,200 | 132.40 |
| ANOKA | SFC – 3,400 | 132.40 |
| CENTRAL WISCONSIN | SFC – 3,800 | 119.75 |
| TRAVERSE CITY | SFC – 3,100 | 119.75 |
| ALPENA | SFC – 3,200 | 121.35 |

Verification detail:

- The separator between `SFC` and the altitude is byte `0xAD` in the extracted text
  (Latin-1 soft hyphen), which renders as an **en dash** in the source font. It appears in
  `ZMP_Control_Towers.txt` as the replacement character `�`. It is a range dash, i.e.
  "SFC to 4,200". The word "MSL"/"AGL" is **not stated in `ZMP_Control_Towers.txt`** —
  no qualifier accompanies any of these five altitudes.
- Cross-check of the two extraction orders (both agree):
  BISMARCK name L013 C0044 / alt L013 C0047 / freq L015 C0051;
  ANOKA L013 C0081 / L014 C0080 / L016 C0083;
  CENTRAL WISCONSIN L013 C0100 / L015 C0100 / L017 C0104;
  TRAVERSE CITY L013 C0114 / L014 C0119 / L015 C0123;
  ALPENA L013 C0146 / L014 C0145 / L016 C0148.
- Exactly **five** towers are listed. No others appear in the text layer.

### 3.3 Neighbouring facilities on this sheet

| code | name as printed |
|---|---|
| `ZLC` | `SALT LAKE CITY ARTCC` |
| `ZWG` | `WINNIPEG FIR` |
| `ZYZ` | `TORONTO FIR` |
| `ZDV` | `DENVER ARTCC` |
| `ZAU` | `CHICAGO ARTCC` |
| `ZOB` | `CLEVELAND ARTCC` |
| `ZKC` | `KANSAS CITY ARTCC` |

This sheet pairs the code with the spelled-out name for all seven neighbours — unlike the
Low Sectors sheet, where `ZWG`/`ZYZ`/`ZLC` never appear as codes.

### 3.4 Unread on this sheet

The tower positions themselves are plotted graphically; the sheet's map outline, the ZMP
boundary and each tower's location dot carry no text. Nothing operational appears to be
lost — the five towers' three data points each are all present in text.

---

## 4. ZMP_High_Sectors.pdf — NO TEXT LAYER (vector artwork, text converted to outlines)

`ZMP_High_Sectors.txt` is 1 byte: `0x0C`, a bare form feed. Zero characters.

**Verified, not assumed.** All five xpdf extraction modes return **0 characters**:

| mode | chars recovered |
|---|---|
| `-layout` | 0 |
| `-raw` | 0 |
| `-simple` | 0 |
| `-table` | 0 |
| `-clip` | 0 |
| `-lineprinter` | 0 |

PDF internals: `/Creator(Adobe Illustrator 25.2)`, `/Producer(Adobe PDF library 15.00)`,
`/Count 1`, **zero `/Image` objects and zero `DCTDecode`/`JPXDecode` streams**, 3
`FlateDecode` streams, no `/ObjStm`.

This is the important distinction: **it is NOT a scan.** With no image XObjects at all, the
page is pure vector line work — which means every label on it (sector numbers, altitudes,
navaids, facility names) was **converted to outlines in Illustrator** and now exists only
as filled paths. There are no glyphs to extract, so no OCR-free route to the content
exists; the only way to read this chart is to look at the rendered page.

**Therefore UNREAD in its entirety, specifically:**

1. Every ZMP **high-sector number** — none are known.
2. Every high-sector **altitude stratum** (the FL splits, e.g. any "FL240 and above"
   style bands) — none are known.
3. High-sector **boundaries** and geometry.
4. Any **Area** grouping of high sectors.
5. All **navaid/fix identifiers** on the high chart.
6. Neighbouring-facility labels on the chart edges.
7. The chart's **title block, chart number and effective date** — so it is not even known
   whether this sheet is contemporaneous with the Low Sectors sheet (`10/08/20`) or with
   the Control Towers sheet (2010).

Nothing about ZMP high-altitude sectorisation should be authored from this file.

## 5. ZMP_Approach_Sectors.pdf — NO TEXT LAYER (raster scan)

`ZMP_Approach_Sectors.txt` is 1 byte: `0x0C`, a bare form feed. Zero characters.

**Verified**: all six extraction modes return **0 characters** (same table as §4).

PDF internals: `/Creator(Adobe Photoshop 21.0 (Windows))`,
`/Producer(Adobe Photoshop for Windows -- Image Conversion Plug-in)`, `/Count 1`,
**48 `/Image` objects and 42 `DCTDecode` (JPEG) streams**, tiled at
`/Width 3300 /Height 2550`. On a 792 × 612 pt page that is 3300/11in = **300 DPI**.

So unlike the High Sectors sheet, this one *is* a raster image — a 300 DPI JPEG scan
sliced into tiles, wrapped in a PDF. It is 8.9 MB, the largest of the four. Being raster,
it is at least **OCR-able** if an OCR tool becomes available, which the High Sectors
vector-outline file is not.

**Therefore UNREAD in its entirety, specifically:**

1. Every **approach control / TRACON** delineated on the chart and its name.
2. Each TRACON's **delegated airspace** (lateral extent and altitude cap).
3. Every **satellite airport** shown under each approach control.
4. All **frequencies** printed on the sheet.
5. **Boundaries** between adjacent approach controls.
6. The chart's **title block, chart number and effective date**.
7. Which ZMP low sector overlies which approach control.

Note: `ZMP_Minor_TRACON_Reference.pdf` / `.txt` (18,694 B of real text) sits in the same
folder and may cover some of gap 1–4 above. It was **outside this task's scope** and was
not read here — worth pointing the authoring phase at it before anyone tries to OCR this
chart.

---

## 6. Summary of gaps, ranked

| # | gap | affected file | recoverable how? |
|---|---|---|---|
| 1 | All high-sector numbers, strata, boundaries | ZMP_High_Sectors.pdf | Visual read only — text is outlined vectors, OCR will struggle |
| 2 | All approach-control names, airspace, frequencies | ZMP_Approach_Sectors.pdf | Visual read, or OCR (300 DPI raster) |
| 3 | Every low-sector **boundary** / geometry | ZMP_Low_Sectors.pdf | Visual read only |
| 4 | Which altitude stratum belongs to which low sector | ZMP_Low_Sectors.pdf | Visual read; §2.9 gives search hints only |
| 5 | Composition of Areas 1–6 | ZMP_Low_Sectors.pdf | Visual read (colour-coded legend) |
| 6 | Identity of the `83` token, and confirmation of `25` | ZMP_Low_Sectors.pdf | Visual read |
| 7 | East-edge `MONTREAL?/TORONTO FL290` label wording | ZMP_Low_Sectors.pdf | Visual read |
| 8 | Effective date of High Sectors and Approach Sectors sheets | both | Visual read |
