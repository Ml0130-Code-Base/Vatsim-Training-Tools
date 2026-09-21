# MSP Runways — thresholds, bearings and final approach courses

**Source: CIFP 260903**, ARINC 424 `PG` (airport runway) and `PI` (localizer) records, decoded
2026-09-21 from `FAACIFP18`. **FOR SIMULATION USE.**

This file exists because issue #26 recorded that an approach clearance needs **the final approach
course and the threshold position**, that the facility orders *"carry rules about the final and
never the final itself"*, and that deriving a course from the last leg of a published transition
*"would be a guess wearing a citation"*. All of that was true of the facility orders. **It was not
true of CIFP, which had not been checked for runway records.** Both numbers are now cited.

**The cycle is the citation.** Re-pull and regenerate this whole table when the cycle rolls; never
hand-patch a value into a table stamped with an older cycle (root `CLAUDE.md` §11).

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
| **04** | 44.87527 | −93.23409 | 45.0 | I-APL | 109.30 | 45.0 | I | 11,006 | **1,550** | 832 | 150 |
| **12L** | 44.89295 | −93.22099 | 121.0 | I-PJL | 110.70 | **121.3** | III | 8,200 | 0 | 839 | 150 |
| **12R** | 44.88779 | −93.23413 | 121.0 | I-HKZ | 110.30 | **121.3** | III | 10,000 | 0 | 842 | **200** |
| **17** | 44.88775 | −93.24225 | 170.0 | I-TJZ | 110.95 | **169.5** | I | 8,000 | 0 | 840 | 150 |
| **22** | 44.89167 | −93.21102 | 225.0 | I-SIJ | 110.50 | 225.0 | I | 11,006 | **1,000** | 828 | 150 |
| **30L** | 44.87352 | −93.20119 | 301.0 | I-MSP | 110.30 | **301.4** | II | 10,000 | 0 | 814 | **200** |
| **30R** | 44.88154 | −93.19463 | 301.0 | I-INN | 110.70 | **301.4** | II | 8,200 | **200** | 820 | 150 |
| **35** | 44.86618 | −93.23664 | 350.0 | I-BMA | 110.95 | **349.5** | III | 8,000 | 0 | 833 | 150 |

Lengths, displaced thresholds and elevations in feet; widths in feet; courses in degrees.

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
4. **Bearing computed from the two threshold coordinates** against the published bearing — 0.1°
   to 0.4° apart on all four strips, which is rounding.

**One field was NOT used and is recorded as unresolved.** The runway record carries a
localizer/ILS identifier near column 81, and reading it there gives `IIPJ` where the localizer
record's own identifier field gives `IPJL` — a one-character disagreement that means one of the
two offsets is off by one. **The localizer data above comes entirely from the `PI` record**, whose
layout is confirmed by its frequency and runway fields decoding correctly, so nothing depends on
the ambiguous field. Left here rather than guessed at.

---

## 4. What this closes, and what it does not

**Closes:** the stated blocker on issue #26 — the final approach course and the threshold position
now exist, cited, for all eight runway ends.

**Does not close:**

- **The Arrival traffic model itself.** #26 wants a drill where the feeder hands off to Arrival and
  the problem starts where the feeder problem ends. That is engine work; this is the data it was
  waiting on.
- **Anything spatial beyond the runways.** No DDA extensions, no satellite cutouts, no sector
  boundaries. Root `CLAUDE.md` §7 is untouched and issue #27 is unaffected — CIFP is procedures
  and runways, not airspace.
- **Which approach the facility assigns.** CIFP publishes what exists; the SOP and the LOAs say
  what gets used. MSP's 26 coded approach procedures are listed in CIFP under `SUSAP KMSPK3F` and
  are not transcribed here, because nothing in the tool reads them yet.
- **The satellite fields.** FCM, MIC, STP, ANE and the rest have their own runway records in the
  same file, not pulled. The Satellite half of #26 stays blocked behind #27 regardless.

---

## 5. Where this is used

- `m98-drill-deck.html` — `RUNWAYS`, `RWY_PAIRS`, `RWY_SRC` and `finalCourse()` in the deck block,
  exposed on `window.DD`.
- **The scope draws the four strips threshold to threshold**, from the two surveyed points, so no
  bearing and no magnetic correction enters the drawing at all. The strip the loaded configuration
  lands is brightened; in a configuration `TABLE2` has no row for, **nothing is brightened**,
  because the tool does not know what is in use there (issue #15).
