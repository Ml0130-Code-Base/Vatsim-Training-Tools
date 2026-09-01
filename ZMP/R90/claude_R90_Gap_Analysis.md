# R90 Gap Analysis — what the documents do not answer

Assembled 2026-09-01 from a full read of the three R90-side documents (`R90_Order_7220_10B.txt`, `OMA_ATCT_7110_4A.txt`, `LNK_ATCT_7110_6A.txt`), the ZMP-R90 LOA, the ZMP Minor TRACON Reference, and the vNAS facility record.

**The headline: every boundary in R90 is a picture.** Not one sector boundary, airspace limit or coordination area is described in words anywhere in the R90 document set. Ten of the eighteen pages of the SOP carry text; the geometry is on the other eight. This is not a transcription failure — the extraction is clean and complete for everything that *is* text. The pages simply have no text layer, and no PDF rasteriser is available on this machine (`pdftoppm`, `pdfimages`, ImageMagick, Ghostscript and Python are all absent; `pdftotext`, `perl` and `curl` are present).

---

## Part 1 — What the owner has offered to supply, ranked by training value

These are the asks. Each is stated as *the smallest thing that unblocks the most work*, in the same form the M98 lateral boundary arrived in — a short list of points, radial/DME off a named reference, or lat/long.

### 1. The RADAR Final (RF) boundary — highest value by a distance

`R90 7220.10B` Appendix A p15, `RADAR Final Boundaries`. **Picture.**

Radar Final (`V`, 133.325) is the position everything else feeds. The SOP's arrival rules turn on it directly — an arrival "must be on a procedure or assigned a heading or direct a fix that **penetrates RF airspace**", and the setup "must allow the aircraft to conduct a stabilized approach" (R90 3-8). Without the RF boundary the tool cannot tell whether a vector penetrates it, which means it cannot grade the single most-graded skill in a terminal facility.

**Smallest useful form:** the RF polygon as radial/DME off the OMA VOR or the field, plus its floor and ceiling. If the shape differs by flow (north vs south), both.

### 2. The Omaha sector split — RW / RE / RO

`R90 7220.10B` Appendix A p12, `R90 Omaha Sector Boundaries`. **Picture.**

Radar West, Radar East and Radar Offutt divide the Omaha airspace and the tool currently cannot say which seat owns a given piece of sky. This is what makes "who do I coordinate with" answerable, and it is what M98's `arrivalSideFor` / `feederFor` do for the metroplex.

**Smallest useful form:** the dividing line(s) between West and East — most facilities split on a runway centreline extension or a radial — plus the Offutt sector's lateral limits and its altitude stratum.

### 3. The Lincoln sectors and Lincoln Final (LF)

`R90 7220.10B` Appendix A p13 (`R90 Lincoln Sector Boundaries`) and p14 (`Lincoln Final (LF) Airspace`). **Both pictures.**

Lincoln is a separate problem inside the same facility, with its own final. It also sits under the **10,000 ft** ceiling rather than 15,000, which makes it the one place in R90 where the vertical limit changes — and the tool cannot draw where that change happens.

**Smallest useful form:** the LNK sector's lateral limits, the LF airspace, and — most importantly — **where the R90 LNK area ends and R90 West/East begins**, because that is the line where the ceiling steps from 10,000 to 15,000.

### 4. The "R90 west shelf over R90 LNK"

Named in ZMP-R90 LOA 4.d.5, depicted nowhere in text. The LOA gives ZMP control to climb R90 LNK departures above 10,000 that will traverse it or come **within 2.5 miles** of it. A 2.5-mile proximity test is trivially gradeable — but only against a shape.

**Smallest useful form:** the shelf outline and its floor/ceiling.

### 5. The prearranged coordination (PACP) airspace

`R90 7220.10B` Appendix D p18. **Picture.** §3-9.b.1 and §3-9.b.2 both say "as depicted in Appendix D", so the rule text exists and is unusable without the shape. PACP is used continuously between Radar East and Radar West for OMA departures — it is routine work, not an edge case.

**Smallest useful form:** the PACP block(s) as lateral limits plus altitude band.

### 6. The combining / decombining table

`R90 7220.10B` p8, under §3-4. The lead-in sentence "Positions are normally combined as follows:" is text; **the table after the colon is an image.** Which of the six positions collapses into which, and on whose frequency, is unknown.

This is not geometry — it is a short table, and it is probably the cheapest single item on this list to supply. It unblocks the drill frame's "open around you" line, which in the M98 tool drives `applyReceivers()` and therefore every frequency and handoff check.

**Smallest useful form:** six rows — position, combines into, resulting frequency.

### 7. LNK tower Area A / Area B lateral limits

`LNK_ATCT_7110_6A` Appendix 1 (north config, p4) and Appendix B (south config, p5). **Both pictures.** The **vertical** limits *are* text: Area A **SFC–3,000 MSL**, Area B **SFC–4,000 MSL** (LNK 4.c.1, 4.c.2). Only the lateral shape is missing.

---

## Part 2 — Not stated in any document, and not geometry

These cannot be recovered by supplying points; they need either another document or an owner ruling.

| Item | Status | Where it would normally live |
|---|---|---|
| **Offutt tower order** | **No OFF order exists in the pull.** OFF has no frequency, callsign, runway inventory, initial departure altitude or missed-approach instruction anywhere. Radar Offutt is a staffed position with no field behind it. | An OFF ATCT order, if vZMP publishes one |
| **The airport inventory R90 serves** | Not stated in any R90 document. §2-2.b and §3-8.d confirm satellite airports exist but never list them. **Currently sourced single-source from vNAS**: OMA, OFF, LNK, CBF, MLE. | The SOP, normally in Chapter 1 |
| **OFF runways** | Not stated | — |
| **Class C dimensions** | Class C is *named* at OMA (5.c.3) and LNK (4.c.3, 6.a.4) and **never dimensioned** — no radius, no altitudes, no shelf | The SOP or a chart |
| **Class B / Class D dimensions** | Never mentioned at all in any of the three documents | — |
| **Tower hours of operation** | Not stated in the R90, OMA or LNK orders. (Hours for *other* ZMP field facilities appear in `ZMP_Minor_TRACON_Reference.txt`, dated 2015-01-01 — the oldest document in the set.) | The SOP or the tower orders |
| **Tower-to-TRACON handoff / release rules** | **Not stated.** Neither tower order describes handoff or release to R90. The closest text is LNK 6.a.3 (LC notifies TRACON of runways in use) and LNK 6.a.2 (LC advises TRACON when unable to provide visual separation). R90 §3-5 and §3-6 govern *intra-facility* transfer only. | An OMA/LNK–R90 LOA, which was not found on the docs page |
| **VFR handling** | Thin. Both towers "provide Class C services" to VFR; CD issues VFR/SVFR initial altitudes; R90 scratchpads carry `OMA` (tower-sequenced VFRs), `Z` (tower VFR pattern), `T*G` (touch and go), `CBF` (VFR arrival). **No VFR pattern altitudes, no entry/exit procedures, no flight-following rules, no Class C VFR separation standard.** | The SOP |
| **STAR geometry** | LANTK, MARWI, TIMMO, HOWRY, AANDY are *named* in the LOA; **Attachment B is an image.** No fixes, no crossing restrictions, no altitudes. AANDY's position relative to the other four is unrecoverable. | The LOA attachment, or the published charts |
| **MZEEE, RBA arrival, J41** | Referenced in the LOA departure/arrival rules; **never located.** MZEEE is a fix on the SUX routing, RBA and J41 are exceptions to the 150–185 heading band. | Charts |
| **OMA north/south flow criteria as R90 sees them** | The *tower* orders give the wind thresholds (OMA <5 kt → north; LNK calm → north). The LOA's flow-dependent departure rules (OBH/LBF, SLN/PWE/ICT) assume R90 knows the flow but never say how it is notified beyond "R90 shall notify ZMP of the Runway in Use" (LOA 4.a.1) | — |
| **STARS map list legend** | Appendix C is complete text — **137 entries** — but carries **no legend**, so the map names are opaque | The SOP |

---

## Part 3 — As-written anomalies to preserve

Do **not** silently correct these in authoring; they are what the document says.

1. **`LW`** is used in R90 3-8 and never defined. §2-1 names the position "Radar Lincoln" (STARS ID `L`, `LNK_L_APP`). Do not publish `LW` = Radar Lincoln without a source.
2. **R90 1-3 cancels "vZMP R90 SOP 7110.10B CHG 1"** while the order itself is numbered **7220.10B**.
3. The record of changes lists **"Original Publication"** against two different dates (Dec 23 2018 and Jul 1 2023).

---

## Part 4 — What is fully covered and needs nothing

So the picture is not all gaps. These are complete, text, and ready to build against today:

- **Positions, frequencies, STARS IDs and callsigns** (3-2 / 2-1) — and confirmed twice, against vNAS.
- **Common radar position responsibilities** (2-2) — the seven standing duties.
- **Transfer of position responsibility** (3-3), **intra-facility transfer of control** (3-5), **automated point-outs** (3-7).
- **Arrival procedures** (3-8) in full, including the four repetitions of the freeze rule: once a handoff is accepted, no change to assigned heading or altitude without verbal approval from the receiving controller.
- **Prearranged coordination rule text** (3-9) — the rule, though not its geometry.
- **Scratch pad entries** (3-10) — all four tables.
- **The position relief checklist** (Appendix B).
- **The whole ZMP-R90 LOA except its two attachments** — ceilings, arrival altitudes, the STAR window, control-for grants in both directions, the five departure heading bands and their exceptions.
- **Both tower orders except their airspace appendices** — departure altitudes, headings, missed approaches, flow selection, frequencies.

**Items 3 and 4 on the roadmap in `CLAUDE.md` — scratchpad-driven approach clearances, and the STAR-gap departure heading bands — were chosen precisely because they sit entirely inside this list.** Real drills can be built now, without waiting for a single boundary point.
