# CIFP — the FAA's coded SID and STAR data, and what it can and cannot close

Pulled and verified **2026-09-05**, cycle **260903**. Written in answer to issue #7 — *"look
into IFP data to get SID and STAR data to help build facilities and cut down on time spent
plotting SIDs and STARs"* — which names #1 through #5.

**Short answer: yes, and it is better than expected for STARs, patchy for SIDs, and useless
for the AZO fields.** It also disagrees with our own owner-verified M98 data on one crossing
altitude, which is recorded in §6 and **not resolved here**.

---

## 1. Not the page in the issue

`faa.gov/air_traffic/flight_info/aeronav/procedures/` is the **IFP development** area —
inventory summaries, initiation forms, amendment reports. It is about procedures being
*written*, not the coded data.

The data is one level over, under digital products:

```bash
# the landing page, which names the current 28-day cycle
curl -sL https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/cifp/download/

# the file itself — 9 MB zip, no authentication, no key, no scraping
curl -sL -o CIFP_260903.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_260903.zip
```

**Updated every 28 days** and the URL carries the cycle date, so the recipe is
`CIFP_<YYMMDD>.zip` with the cycle start. Cycle 260903 was current on 2026-09-05 and 261001
was already announced on the page. **A 404 means the cycle rolled**, not that the path is
wrong — read the current one off the download page rather than guessing forward.

Unzipping needs PowerShell's `Expand-Archive`; there is no `unzip` on this machine.

```
CIFP_260903.zip
├── FAACIFP18                  50.7 MB   the data — ARINC 424, 396,816 fixed-width records
├── IN_CIFP.txt                 0.2 MB   MANIFEST: every airport/procedure that IS coded
├── Not_In_CIFP_2609.xlsx                what is excluded
├── CIFP Readme 2609.pdf
├── CIFP ATS and Enroute Coverage.pdf
└── FAA CIFP Disclaimer.pdf
```

**Read `IN_CIFP.txt` first.** It is a tab-separated manifest — `Arpt_ICAO / Procedure Type /
Procedure Ident` — and it answers "does this field have a coded STAR" in one line of `awk`
without touching the 50 MB file. It is the CIFP equivalent of writing the source index first
(root `CLAUDE.md` §6).

## 2. What a record carries

Fixed-width ARINC 424. A STAR record, verbatim, with the fields that matter:

```
SUSAP KMSPK3ENITZR46RW12R 030ELLKOK3PC0E       TF                                 + 10000          250
        ^    ^ ^     ^ ^      ^    ^            ^                                 ^ ^              ^
        |    | |     | |      |    |            |                                 | |              speed limit
        |    | |     | |      |    |            |                                 | altitude
        |    | |     | |      |    |            |                                 altitude descriptor (+ = at or above)
        |    | |     | |      |    |            path terminator (IF/TF/FM/…)
        |    | |     | |      |    fix section/subsection — PC terminal, EA en route
        |    | |     | |      fix identifier
        |    | |     | sequence number
        |    | |     transition identifier — RW12R, RW12L, RW04, or blank for the common route
        |    | procedure identifier + route type
        |    subsection: D = SID, E = STAR, F = approach
        airport
```

So one line gives **procedure · transition · sequence · fix · path terminator · altitude with
its at/at-or-above/at-or-below descriptor · speed limit** — which is exactly the shape of
M98's `LADDER`, including the per-runway transitions that `TABLE2` selects between.

**Fix coordinates are in the same file**, as terminal waypoints (`PC`) and en route waypoints
(`EA`), in DDMMSSss:

```
SUSAP KMSPK3CSAVVG K30    W     N44413009W093130985     →  N44°41'30.09"  W093°13'09.85"
```

That is everything a ladder needs. Nothing has to be traced off a chart.

## 3. Coverage, per field we actually work

Counted from `IN_CIFP.txt`, cycle 260903.

| Field | SIDs | STARs | Approaches | Facility / issue |
|---|---|---|---|---|
| KMSP | **12** | **8** | 26 | M98 — already carried, used here as the check |
| KOMA | 0 | **5** | 24 | R90 — #5 |
| KLNK | 0 | 0 | 10 | R90 — #5 |
| KORD | **0** | **11** | 50 | C90 — #1 |
| KMDW | 0 | **3** | 16 | C90 — #1 |
| KAZO | 0 | 0 | 6 | AZO — #4 |
| KGRR | 0 | 0 | 13 | AZO |
| KMKG | 0 | 0 | 8 | AZO |
| KBTL | 0 | 0 | 5 | AZO |
| KSLC | **8** | **11** | 22 | S56 — #3 |
| KBOI | **2** | **5** | 16 | Big Sky — #4 |
| KBZN | **5** | **5** | 9 | Big Sky — #4 |
| KMKE | **2** | **1** | 19 | MKE — #2 |

The named STARs it would hand us:

```
KORD   BENKY6 ERNNY8 ESSPO5 FYTTE7 JVL1 MADII7 SHAIN2 TRTLL6 VEECK5 WATSN4 WYNDE3
KSLC   BEARR5 BVL2 CARTR1 JAMMN5 JAZZZ1 LHO5 PITTT2 QWENN7 SKEES6 SPANE8 YUTES2
KBOI   BEWTE4 KOURT4 KYAAN4 SADYL4 SPUUD4
KBZN   BGMAN1 EATZZ1 LOSST1 POWDA2 SUBKY1
KOMA   AANDY2 HOWRY3 LANTK2 MARWI4 TIMMO1
```

**Three things to take from that table.**

- **STARs are well covered where a field has them**, and that is the expensive half to plot.
  #1, #3, #4 and #5 all get their arrival data.
- **SIDs are patchy and ORD has none at all.** CIFP codes what is codeable for RNAV
  navigation; a conventional or radar-vector departure is not in it. KMSP, KSLC and KBZN do
  well; KORD, KMDW, KOMA and KLNK get nothing. **Do not read a zero as "this field has no
  SIDs"** — read it as "CIFP does not code them", which is a different statement and leaves
  the chart as the only source.
- **AZO gets nothing but approaches.** None of KAZO, KGRR, KMKG or KBTL has a coded SID or
  STAR. #4's AZO half is not closed by this at all, and that is a property of the fields
  rather than of the dataset.

## 4. What this does not give

- **No airspace or sector boundaries.** CIFP is procedures. The geometry blocker of root
  `CLAUDE.md` §7 is untouched — this is not a second route to a DDA polygon or an R90 sector.
- **No facility procedure.** Nothing here says which transition ZMP assigns in a given
  configuration; that is LOA Table 2, and CIFP has no equivalent. It gives every published
  transition and stays silent on which one gets used.
- **No handoff IDs, frequencies or positions.**
- **Revision names are the coded ident, not the spoken one** — `NITZR4`, not "NITZR FOUR".
  The tool deliberately carries no revision name for the six mainline RNAV STARs (M98
  `CLAUDE.md`, *Flight rules and radar service*); CIFP would let that change, but it is a
  separate decision.

## 5. Validation against the one facility we can check

M98's ladders are owner-verified against the current AIRAC plates, so they are the control.
CIFP's `NITZR4` RW12R transition against `claude_MSP_STAR_Reference.md`:

| Fix | Reference | CIFP | |
|---|---|---|---|
| NITZR | ≥11,000 / 280 | `+ 11000` / 280 | match |
| WRSAW | ≥11,000 / 280 | `+ 11000` / 280 | match |
| DAHRL | no crossing | no crossing | match |
| GDNEE | no crossing | no crossing | match |
| **ELLKO** | **≥10,000 / 250** | **`+ 11000` / 250** | **CONFLICT** |
| SAVVG | 10,000 | `10000` | match |
| GREAK | 8,000 / 230 | `08000` / 230 | match |
| TIETN | 8,000 / 230 | `08000` / 230 | match |

RW12L matches on every fix including the CMMOE/FSCOT tail. The BLUEM ladder matches on every
fix, ELLKO included.

**Seven of eight fixes agree exactly, on a ladder verified independently against the plates.**
That is a strong result for the dataset and the reason to trust it at the facilities we cannot
check.

## 6. The conflict, named and not resolved

**On the NITZR STAR, CIFP crosses ELLKO at or above 11,000. Our reference and the tool say
10,000.**

```
SUSAP KMSPK3EBLUEM56RW12R 020ELLKOK3PC0E   TF   + 10000   250      BLUEM  — agrees with us
SUSAP KMSPK3ENITZR46RW12R 030ELLKOK3PC0E   TF   + 11000   250      NITZR  — disagrees
```

`m98-drill-deck.html` carries `{f:'ELLKO', … aa:10000, spd:250}` in **both** `nitzr12R` and
`bluem12R`.

**Why this is worth attention rather than a shrug.** `claude_MSP_STAR_Reference.md` states
that shared fixes carry the same restriction on every STAR that feeds them, *"the one
exception is SAVVG"* — and it captures SAVVG correctly, 9,000 off BLUEM and 10,000 off NITZR.
CIFP says **ELLKO is a second exception of exactly the same kind**, 10,000 off BLUEM and
11,000 off NITZR, and the reference has it flattened to 10,000 on both. The rule the reference
wrote down is right; it looks like it was applied one fix too narrowly.

**Not changed here.** Root `CLAUDE.md` §6: conflicts are named, not resolved. This is
owner-verified data against the FAA's own coded source, and which one the tool should fly is
the owner's call. If the plate says 11,000 on NITZR, `nitzr12R` needs the correction and the
reference needs the second exception written in.

**It also makes the case for the whole exercise.** This is a 1,000 ft error on a crossing
restriction in the only facility that has been flown, sitting in a tool that grades descend-via
planning against it — found by a machine comparison in about a minute, on data that had already
been checked by hand.

## 7. Licence

US Government work, public domain, and the FAA publishes it for exactly this use. The zip
carries `FAA CIFP Disclaimer.pdf` — read it before shipping anything derived from the data,
and carry the cycle number wherever a value from it lands, the way every other source in this
repo carries its document and paragraph.

**The cycle is the citation.** A CIFP-derived number is true for 28 days by construction, so
"CIFP 260903" is the reference, not "CIFP".
