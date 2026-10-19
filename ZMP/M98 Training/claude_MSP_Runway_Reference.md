# MSP Runways — thresholds, bearings, final approach courses and the approaches coded to each

**Source: CIFP 260903**, ARINC 424 `PG` (airport runway) and `PI` (localizer) records, decoded
2026-09-21 from `FAACIFP18`; §4 adds the `IN_CIFP.txt` manifest and the approach (`F`) records,
transcribed 2026-10-14. **FOR SIMULATION USE.**

This file exists because issue #26 recorded that an approach clearance needs **the final approach
course and the threshold position**, that the facility orders *"carry rules about the final and
never the final itself"*, and that deriving a course from the last leg of a published transition
*"would be a guess wearing a citation"*. All of that was true of the facility orders. **It was not
true of CIFP, which had not been checked for runway records.** Both numbers are now cited.

**The cycle is the citation.** Re-pull and regenerate this whole table when the cycle rolls; never
hand-patch a value into a table stamped with an older cycle (root `CLAUDE.md` §11).

**Re-checked 2026-10-14 against CIFP 261001 and CIFP 261029:** the KMSP airport, runway and
localizer records are identical, column for column, in all three cycles. The stamp stays 260903
because that is the pull the table came from; **the values hold through 2026-11-25.** The satellite
fields are in `claude_M98_Satellite_Runway_Reference.md`.

```bash
curl -sL -o CIFP_260903.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_260903.zip
unzip -o CIFP_260903.zip FAACIFP18
grep "^SUSAP KMSPK3G" FAACIFP18     # runway records
grep "^SUSAP KMSPK3I" FAACIFP18     # localizer records
```

---

## 1. The table

Landing threshold position, runway bearing, and the localizer where one exists.

| Rwy | Threshold lat | Threshold lon | Brg | Localizer | Freq | LOC course | CAT | Length | Displaced | Elev | Width |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **04** | 44.87527 | −93.23409 | 45.0 | I-APL | 109.30 | 45.0 | **LOC only** | 11,006 | **1,550** | 832 | 150 |
| **12L** | 44.89295 | −93.22099 | 121.0 | I-PJL | 110.70 | **121.3** | III | 8,200 | 0 | 839 | 150 |
| **12R** | 44.88779 | −93.23413 | 121.0 | I-HKZ | 110.30 | **121.3** | III | 10,000 | 0 | 842 | **200** |
| **17** | 44.88775 | −93.24225 | 170.0 | I-TJZ | 110.95 | **169.5** | **LOC only** | 8,000 | 0 | 840 | 150 |
| **22** | 44.89167 | −93.21102 | 225.0 | I-SIJ | 110.50 | 225.0 | **LOC only** | 11,006 | **1,000** | 828 | 150 |
| **30L** | 44.87352 | −93.20119 | 301.0 | I-MSP | 110.30 | **301.4** | II | 10,000 | 0 | 814 | **200** |
| **30R** | 44.88154 | −93.19463 | 301.0 | I-INN | 110.70 | **301.4** | **I** | 8,200 | **200** | 820 | 150 |
| **35** | 44.86618 | −93.23664 | 350.0 | I-BMA | 110.95 | **349.5** | III | 8,000 | 0 | 833 | 150 |

Lengths, displaced thresholds and elevations in feet; widths in feet; courses in degrees.

**CAT is the localizer record's ILS category, ARINC 424 field 5.80: `0` is a localizer with NO
glide slope, `1` CAT I, `2` CAT II, `3` CAT III.** So **4, 17 and 22 have a localizer and no ILS** —
which the CIFP manifest says independently, coding L04, L17 and L22 and no I04, I17 or I22 (§4 has
the whole list) — and 30R is CAT I. **Corrected 2026-10-14:** until then this column printed 4, 17 and 22 as CAT I and 30R
as CAT II, reading `0` as CAT I. The deck's `cat` values were always the raw codes and always right;
its comment carried the same misreading and is corrected too. The harness now pins the values.

**Coordinates are the LANDING threshold** — the displacement is already applied, so 04's point is
1,550 ft down the pavement from the physical end, and 22's is 1,000 ft down the other. Do not
apply the displacement a second time.

**The runway bearing and the localizer course are different numbers, and both are kept.** 17 is a
170 runway on a 169.5 localizer; 35 a 350 on a 349.5; the 12s and 30s are 121.0/121.3 and
301.0/301.4. **Use the localizer course for an ILS and the runway bearing for a visual.** The deck
does this in `finalCourse(rwy)`, which returns the course, which of the two it used, and the
localizer ident — and `null` rather than a guess for a runway this field does not have.

---

## 2. Magnetic and true coincide at MSP, in this cycle

The KMSP airport record carries **magnetic variation `E0000` — exactly zero**:

```
SUSAP KMSPK3AMSP     0     110YHN44525510W093131840E000000842 ...
                                                    ^^^^^ magnetic variation
```

So the bearings and courses above need no conversion and can be read directly against the deck's
headings, which are magnetic the way a controller's are. **This is a property of this field in
this cycle and not a general licence** — it must be re-checked when the cycle rolls, and it does
not transfer to R90, ZAU or ZLC.

The same record gives field elevation **842 ft** and the airport reference point at
N44°52'55.10" W093°13'18.40". Note the deck's `MSP0` anchor is the **MSP VOR**, not the ARP — a
different point about a mile away, and correctly so, because the radial/DME work in the LOAs is
referenced to the VOR.

---

## 3. How the decode was verified

Column offsets in a fixed-width format are the thing to get wrong, so they were checked against
values that could be confirmed independently. **Four checks, all of which passed:**

1. **Runway lengths** match MSP's published runways exactly — 8,200 / 10,000 / 11,006 / 8,000.
2. **Widths** decode as 150 ft for six ends and **200 ft for 12R and 30L**, which is the one strip
   at MSP that is 200 ft wide. A wrong offset would not reproduce that split.
3. **Threshold-to-threshold distance, computed from the two coordinates, against
   `length − both displaced thresholds`** — this checks the coordinate fields, the length field
   and the displaced-threshold field simultaneously:

   | Strip | thr→thr from coordinates | length − displacements | difference |
   |---|---|---|---|
   | 12L/30R | 7,978 ft | 8,200 − 200 = 8,000 | **22 ft** |
   | 12R/30L | 9,972 ft | 10,000 − 0 = 10,000 | **28 ft** |
   | 04/22 | 8,442 ft | 11,006 − 2,550 = 8,456 | **14 ft** |
   | 17/35 | 7,996 ft | 8,000 − 0 = 8,000 | **4 ft** |

   The 04/22 row is the strongest of the four: it only lands within 14 ft if **both** displaced
   thresholds decoded correctly.

   **Recomputed 2026-10-14 on the WGS84 ellipsoid rather than a sphere: 0, −1, 0 and −1 ft**
   (12L/30R 8,000 · 12R/30L 9,999 · 04/22 8,456 · 17/35 7,999). The 4–28 ft spread above was the
   spherical approximation, not the decode — which is now a tighter confirmation of every field the
   check exercises. Same method in `claude_M98_Satellite_Runway_Reference.md` §3.
4. **Bearing computed from the two threshold coordinates** against the published bearing — 0.1°
   to 0.4° apart on all four strips, which is rounding.

**The column-81 field, resolved 2026-10-14.** The runway record carries a localizer identifier,
and reading it from column 81 gave `IIPJ` where the localizer record's own field gives `IPJL`.
**Column 81 is a separate one-letter field** — I, R, V or D in this data, the source of the
threshold crossing height (ARINC 424's TCH value indicator) — and **the ident is columns 82–85.**
`IIPJ` was that letter followed by the first three characters of the ident. Read from column 82 it
agrees with the localizer record at all eight ends, and the category in column 86 agrees too;
the same holds at every satellite ILS end. The localizer data above still comes from the `PI`
record, which needed no change.

---

## 4. The approaches CIFP codes to each runway

**Source: CIFP 260903** — the `IN_CIFP.txt` manifest, which lists every procedure the cycle codes,
checked against the route-type column (character 20) of the KMSP approach (`F`) records in
`FAACIFP18`. Transcribed 2026-10-14. **Identical in CIFP 261001 and CIFP 261029** — the same 26
lines in all three manifests — so like §1 this holds through 2026-11-25. Read the download page
first: it names the current cycle, and a 404 on the zip means the cycle rolled.

```bash
curl -sL https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/cifp/download/
curl -sL -o CIFP_260903.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_260903.zip
unzip -o CIFP_260903.zip IN_CIFP.txt FAACIFP18
awk -F'\t' '$1=="KMSP" && $2=="SIAP"' IN_CIFP.txt         # the 26 approaches
grep "^SUSAP KMSPK3F" FAACIFP18 | cut -c14-20 | sort -u   # identifier and route type
```

| Rwy | ILS | Localizer | RNAV (GPS) | RNAV (RNP) |
|---|---|---|---|---|
| **04** | — | L04 | R04 | — |
| **12L** | I12L | L12L | R12LZ | H12LY |
| **12R** | I12R | L12R | R12RZ | H12RY |
| **17** | — | **L17** | — | — |
| **22** | — | L22 | R22 | — |
| **30L** | I30L | L30L | R30LZ | H30LY |
| **30R** | I30R | L30R | R30RZ | H30RY |
| **35** | I35-V · I35-Z | L35 | R35-Z | H35-Y |

**Reading an identifier.** The first letter is the ARINC 424 approach route type — `I` ILS, `L`
localizer only, `R` RNAV (GPS), `H` RNAV (RNP). Then the runway, with `-` holding the side
position on a runway that has none, then a letter where the procedure carries one (Z, Y, V). The
letter is part of the procedure's name: the MSP D-ATIS quoted in issue #13 advertises *RNAV ZULU
RWY 30L*, which is R30LZ.

**So there is no ILS to 4, 17 or 22, and no RNAV approach of either kind to 17.** Runway 17 has the
localizer and nothing else.

**Three cross-checks, all of which pass:**

1. **The ILS column agrees with §1's CAT column** — an `I` procedure at exactly the five ends whose
   localizer record carries category 1, 2 or 3, and none at the three whose category is `0`. Two
   record types, the localizer equipment and the coded procedures, saying the same thing.
2. **The localizer column agrees with §1's Localizer column** — all eight ends have a localizer
   record, and all eight have an `L` procedure.
3. **26 = 6 + 8 + 7 + 5** — ILS, localizer, RNAV (GPS), RNAV (RNP). Every approach record carries
   its procedure's own route type in character 20, or `A` for an approach transition, which is part
   of the same procedure rather than a further approach.

**What the deck reads, and what it does not.** The parser hears four kinds — ILS, localizer, RNAV
and visual — so **RNAV (GPS) and RNAV (RNP) are one kind to it**, and the letter is not read:
*cleared RNAV runway 35 approach* is accepted without asking which of R35-Z and H35-Y. At that
granularity the refusal is still exact, because 17 has neither RNAV kind and 4 and 22 have one.
**A visual approach is not a coded procedure** and is not in this list; the deck refuses it to no
runway, and it does not check the weather a visual needs.

---

## 5. What this closes, and what it does not

**Closes:** the stated blocker on issue #26 — the final approach course and the threshold position
now exist, cited, for all eight runway ends — and which approaches exist at each (§4), so a
clearance for one that does not is refused rather than flown.

**Does not close:**

- **The Arrival traffic model itself.** #26 wants a drill where the feeder hands off to Arrival and
  the problem starts where the feeder problem ends. That is engine work; this is the data it was
  waiting on.
- **Anything spatial beyond the runways.** No DDA extensions, no satellite cutouts, no sector
  boundaries. Root `CLAUDE.md` §7 is untouched and issue #27 is unaffected — CIFP is procedures
  and runways, not airspace.
- **Which approach the facility assigns.** CIFP publishes what exists (§4); the SOP, the LOAs and
  the D-ATIS say what is in use. So the deck refuses an approach that does not exist, and never one
  that merely is not the one advertised.
- **The satellite fields** — pulled 2026-10-14 from CIFP 261001 for the four satellite towers, in
  `claude_M98_Satellite_Runway_Reference.md`, and **not yet read by the deck**. Three of the four
  have a non-zero declination, so MSP's E0000 is exactly what does not carry over.

---

## 6. Where this is used

- `m98-drill-deck.html` — `RUNWAYS`, `RWY_PAIRS`, `RWY_SRC` and `finalCourse()` in the deck block,
  exposed on `window.DD`.
- **§4 is `APPROACHES`**, the 26 identifiers once and as coded, keyed by airport, with `APCH_SRC`,
  `approachesTo()` and `approachExists()` beside it on `window.DD`. The approach clearance in
  `transmit()` reads it: **a clearance for an approach the runway does not publish is queried by
  the crew — *unable, no ILS to runway one seven* — flagged against the cycle, and not flown.** A
  field with no list answers *unknown*, never *no*, so nothing is refused at a satellite.
- **`rwyKey()` maps the deck's `4` to CIFP's `04`.** Every other table in the deck names that runway
  `4`, and until 2026-10-14 `finalCourse('4')` found nothing — so an approach clearance to runway 4
  of any kind, visual included, was refused as not carried.
- **The scope draws the four strips threshold to threshold**, from the two surveyed points, so no
  bearing and no magnetic correction enters the drawing at all. The strip the loaded configuration
  lands is brightened; in a configuration `TABLE2` has no row for, **nothing is brightened**,
  because the tool does not know what is in use there (issue #15).
