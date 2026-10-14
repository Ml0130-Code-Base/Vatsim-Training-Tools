# M98 Satellite Runways — thresholds, bearings and localizers (ANE, FCM, MIC, STP)

**Source: CIFP 261001** (effective 2026-10-01), ARINC 424 `PA` (airport), `PG` (runway) and `PI`
(localizer) records, decoded 2026-10-14 from `FAACIFP18`. **FOR SIMULATION USE.**

The companion to `claude_MSP_Runway_Reference.md`, which carries the same data for MSP and was
pulled first because issue #26's approach clearance needed it. These are **the towered airports
inside M98 other than MSP** — the four towers under the M98/Satellite ATCT LOA, Anoka County–Blaine,
Flying Cloud, Crystal and St. Paul Downtown (`claude_M98_Satellite_Towers_Reference.md`). **Airlake
(LVN) is non-towered and was not pulled**; its records are in the same file.

**Good through 2026-11-25.** Re-checked against **CIFP 261029** (effective 2026-10-29): every field
this file uses is identical. The only change to these four airports' records is STP's landing
threshold ellipsoid height (columns 61–66), which nothing here reads.

**The cycle is the citation.** Re-pull and regenerate the whole table when the cycle rolls; never
hand-patch a value into a table stamped with an older cycle (root `CLAUDE.md` §11).

```bash
curl -sL -o CIFP_261001.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_261001.zip
unzip -o CIFP_261001.zip FAACIFP18 IN_CIFP.txt
grep -E "^SUSAP K(ANE|FCM|MIC|STP)K3[AGI]" FAACIFP18     # airport, runway, localizer records
grep -E "^K(ANE|FCM|MIC|STP)	" IN_CIFP.txt              # what is coded at each field
```

---

## 1. The tables

Landing threshold position, runway bearing (magnetic), and the localizer where one exists.
Lengths, displaced thresholds, elevations and widths in feet; bearings and courses in degrees.
**Coordinates are the LANDING threshold** — the displacement is already applied, so do not apply it
a second time.

### KANE — Anoka County–Blaine · ARP 45.14489, −93.21019 · field elevation 912 · declination **E2.0**

| Rwy | Threshold lat | Threshold lon | Brg | Localizer | Freq | LOC course | CAT | Length | Displaced | Elev | Width |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **09** | 45.14482 | −93.22008 | 89.0 | — | — | — | — | 5,000 | 0 | 905 | 100 |
| **18** | 45.15169 | −93.20988 | 179.0 | — | — | — | — | 4,855 | 0 | 912 | 100 |
| **27** | 45.14465 | −93.20070 | 269.0 | I-ANE | 111.15 | **268.7** | I | 5,000 | 0 | 909 | 100 |
| **36** | 45.13837 | −93.21010 | 359.0 | — | — | — | — | 4,855 | 0 | 910 | 100 |

### KFCM — Flying Cloud · ARP 44.82751, −93.45857 · field elevation 906 · declination **E3.0**

| Rwy | Threshold lat | Threshold lon | Brg | Localizer | Freq | LOC course | CAT | Length | Displaced | Elev | Width |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **10L** | 44.82967 | −93.46506 | 98.0 | — | — | — | — | 3,901 | 0 | 906 | 75 |
| **10R** | 44.82905 | −93.47071 | 98.0 | I-FCM | 109.70 | 98.0 | I | 5,001 | 0 | 896 | 100 |
| **18** | 44.82909 | −93.45434 | 183.0 | — | — | — | — | 2,690 | 0 | 899 | 75 |
| **28L** | 44.82643 | −93.45179 | 278.0 | — | — | — | — | 5,001 | 0 | 898 | 100 |
| **28R** | 44.82763 | −93.45030 | 278.0 | — | — | — | — | 3,901 | 0 | 900 | 75 |
| **36** | 44.82175 | −93.45542 | 3.0 | — | — | — | — | 2,690 | 0 | 905 | 75 |

### KMIC — Crystal · ARP 45.06247, −93.35397 · field elevation 869 · declination **E2.0**

| Rwy | Threshold lat | Threshold lon | Brg | Localizer | Freq | LOC course | CAT | Length | Displaced | Elev | Width |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **06L** | 45.06197 | −93.35756 | 51.0 | — | — | — | — | 2,500 | **390** | 869 | 75 |
| **06R** | 45.06135 | −93.35679 | 51.0 | — | — | — | — | 1,669 | 0 | 869 | 137 |
| **14** | 45.06525 | −93.35718 | 139.0 | — | — | — | — | 3,751 | **241** | 869 | 75 |
| **24L** | 45.06409 | −93.35162 | 231.0 | — | — | — | — | 1,669 | 0 | 867 | 137 |
| **24R** | 45.06480 | −93.35222 | 231.0 | — | — | — | — | 2,500 | **389** | 868 | 75 |
| **32** | 45.05824 | −93.34930 | 319.0 | — | — | — | — | 3,751 | **241** | 867 | 75 |

**Crystal has no localizer.** No record for 14R/32L either — it is permanently closed and is now
Taxiway G (MIC 7220.3N), so CIFP agrees with the tower order that MIC is 14/32 plus the two
parallels.

### KSTP — St. Paul Downtown · ARP 44.93462, −93.06035 · field elevation 705 · declination **E0.0**

| Rwy | Threshold lat | Threshold lon | Brg | Localizer | Freq | LOC course | CAT | Length | Displaced | Elev | Width |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **09** | 44.93486 | −93.06812 | 91.0 | — | — | — | — | 3,642 | 0 | 700 | 100 |
| **13** | 44.93919 | −93.06507 | 128.0 | — | — | — | — | 4,004 | 0 | 705 | 150 |
| **14** | 44.94036 | −93.06707 | 146.0 | I-VKG | 111.50 | 146.0 | I | 6,491 | **343** | 705 | 150 |
| **27** | 44.93475 | −93.05406 | 271.0 | — | — | — | — | 3,642 | 0 | 701 | 100 |
| **31** | 44.93246 | −93.05284 | 308.0 | — | — | — | — | 4,004 | 0 | 701 | 150 |
| **32** | 44.92725 | −93.05463 | 326.0 | I-BAO | 111.50 | 326.0 | I | 6,491 | **382** | 703 | 150 |

**STP's two localizers are coded on one frequency**, 111.50 — one at each end of 14/32.

### The localizers, together

| Field | Runway | Ident | Freq | Course | Category |
|---|---|---|---|---|---|
| ANE | 27 | I-ANE | 111.15 | 268.7 | I |
| FCM | 10R | I-FCM | 109.70 | 098.0 | I |
| STP | 14 | I-VKG | 111.50 | 146.0 | I |
| STP | 32 | I-BAO | 111.50 | 326.0 | I |

Four localizers, all CAT I with a glide slope; none at MIC. ANE's is the one whose course differs
from its runway bearing (268.7 against 269.0), so **use the localizer course for an ILS and the
runway bearing for a visual**, as at MSP.

---

## 2. Magnetic and true do NOT coincide here — this is the finding to remember

| Field | Declination in the airport record |
|---|---|
| MSP | E0.0 |
| STP | E0.0 |
| ANE | **E2.0** |
| MIC | **E2.0** |
| FCM | **E3.0** |

The bearings and localizer courses above are **magnetic**, referenced to each field's own
declination. **At ANE, MIC and FCM that is not zero**, so the true track of a final is the magnetic
course plus the declination: **FCM's 098.0 localizer is a 101.0 true track**, ANE's 268.7 is 270.7.

**The geometry proves it rather than the field just saying it.** The bearing computed from each
pair of surveyed thresholds matches the published magnetic bearing to **0.4° or better once the
declination is applied, and misses by 1.7°–3.0° without it** (§3). So these fields are not decoding
noise; they are real, and they differ from MSP.

**Why it matters to the deck:** the scope is drawn true-north from latitude and longitude, and
MSP's E0000 is why nothing at MSP has ever needed converting. **The moment the engine draws or
flies a satellite final from a course, it has to add that field's declination** — or a Flying Cloud
final comes out 3° off, about half a mile at 10 NM. `claude_MSP_Runway_Reference.md` already said
E0000 *"does not transfer"*; this is where it stops transferring.

---

## 3. How the decode was verified

The same checks as at MSP, with the distances now computed on the **WGS84 ellipsoid** rather than
a sphere. **Every one passed.**

**Threshold to threshold from the two surveyed points, against `length − both displaced
thresholds`** — this exercises the coordinate fields, the length field and both displacement
fields at once:

| Strip | From coordinates | Length − displacements | Diff |
|---|---|---|---|
| ANE 09/27 | 5,000 | 5,000 | 0 |
| ANE 18/36 | 4,855 | 4,855 | 0 |
| FCM 10L/28R | 3,902 | 3,901 | +1 |
| FCM 10R/28L | 5,000 | 5,001 | −1 |
| FCM 18/36 | 2,691 | 2,690 | +1 |
| MIC 06L/24R | 1,723 | 2,500 − 390 − 389 = 1,721 | **+2** |
| MIC 06R/24L | 1,669 | 1,669 | 0 |
| MIC 14/32 | 3,268 | 3,751 − 241 − 241 = 3,269 | **−1** |
| STP 09/27 | 3,642 | 3,642 | 0 |
| STP 13/31 | 4,004 | 4,004 | 0 |
| STP 14/32 | 5,766 | 6,491 − 343 − 382 = 5,766 | **0** |

**MIC 06L/24R and STP 14/32 are the strongest rows:** each lands within two feet only if *both* of
its displaced thresholds decoded right. The same computation on the ellipsoid puts MSP's four strips
within **one foot** (§3 of the MSP reference).

**Bearing from the two thresholds against the published bearing, with declination applied:**
ANE −0.3 / −0.3 · FCM 0.0 / 0.0 / 0.0 · MIC +0.2 / +0.2 / +0.4 · STP −0.3 / −0.3 / 0.0. Without
the declination, ANE misses by 1.7°, MIC by 2.2°–2.4° and FCM by 3.0°.

**The runway record's own localizer ident against the localizer record's:** agree at all four ILS
ends (IANE, IFCM, IVKG, IBAO), and the category agrees too. **This settles the column question the
MSP reference left open** — see §4.

**The runway inventories against the tower orders.** The deck's `AIRPORTS` lists, which come from
the four tower orders, are **ANE 9 · 27 · 18 · 36; FCM 10L · 10R · 28L · 28R · 18 · 36; MIC 6L · 6R ·
24L · 24R · 14 · 32; STP 14 · 32 · 13 · 31 · 9 · 27.** **CIFP carries exactly those ends and no
others** — a second, independent source agreeing with all four.

---

## 4. Two things about the record layout, which apply to the MSP file as well

- **ILS category `0` is a localizer with NO glide slope** (ARINC 424 field 5.80: 0 localizer only,
  1 CAT I, 2 CAT II, 3 CAT III). Every satellite localizer is `1`. At MSP, **4, 17 and 22 are `0`**
  — they have localizers and no ILS, which the CIFP manifest says independently (it codes L04, L17
  and L22 and no I04, I17 or I22). `claude_MSP_Runway_Reference.md` printed those three as CAT I
  until 2026-10-14; corrected there.
- **Column 81 of a runway record is a one-letter field of its own, and the localizer ident is
  columns 82–85.** Column 81 reads I, R, V or D in this data — the source of the threshold crossing
  height (ARINC 424's TCH value indicator). Reading four characters from column 81 is what produced
  the `IIPJ` the MSP reference recorded against `IPJL`: the letter `I` followed by the first three
  characters of the ident. Read from column 82, the ident agrees with the localizer record at every
  ILS end here and at all eight MSP ends.

---

## 5. What is coded at each field

From `IN_CIFP.txt`, identical in 261001 and 261029:

| Field | Approaches | SIDs through 2026-10-28 | SIDs from 2026-10-29 |
|---|---|---|---|
| ANE | I27, L27, R09, R18, R27 | 7 — the MSP set less LEINY and SMERF | 8 — issue #61 |
| FCM | I10R, L10R, R10L, R10R, R28L, R28R, R36, D36 | 7 — the same | 8 — the same |
| MIC | R14, R32 | none | none |
| STP | I14, I32, L14, L32, R14, R32 | 7 — the same | 8 — the same |

(`I` ILS, `L` localizer, `R` RNAV (GPS), `D` VOR/DME — the ARINC 424 approach route type.)

**They agree with the tower orders' approach-in-use rules** (`claude_M98_Satellite_Towers_Reference.md`):
FCM advertises *"an approach to 10R circle to 18"* with 18 active — and 10R is the only ILS there —
and *"RNAV (GPS) 28L and 28R and/or VOR 36 circle to 28L"* with 28 active, which is R28L, R28R and
D36. MIC advertises *"the RNAV (GPS) to the runway(s) in use"*, and RNAV to 14 and 32 is all that is
coded there.

---

## 6. What this closes, and what it does not

**Closes:** the satellite half of the runway data. Every runway end at the four satellite towers now
has a cited threshold, bearing and — where one exists — final approach course.

**Does not close:**

- **The engine flying satellite approaches.** The deck does not read this file yet. An approach
  clearance to a satellite runway still flags that runway geometry covers the eight MSP ends only,
  which is true of the engine. Wiring it in is the Satellite half of issue #26, and it has to carry
  the declination (§2) — it is not a drop-in copy of the MSP table.
- **The satellite cutouts and the extensions** — issue #27. CIFP is procedures and runways, not
  airspace.
- **Which approach a satellite is running.** CIFP publishes what exists; the tower orders and the
  satellites' ATIS say what is in use.
- **Airlake (LVN)** — non-towered, not pulled.
