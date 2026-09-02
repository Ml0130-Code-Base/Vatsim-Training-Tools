# ZMP Sector Reference — the 33 sectors, their strata, and who they face

The center definition, assembled 2026-09-01 from **three independent sources** so that nothing here rests on one reading:

1. **ZMP Order 7200.1O CHG 2, eff. 2024-11-15** (`source-docs/txt/ZMP_Order_7200_1O.txt`) — Chapters 4–9 give one section per sector: narrative, assignment of airspace, frequency and callsign, scope range and ERAM altitude filter, and sector procedures.
2. **The vNAS facility record for ZMP** (`../_vnas/ZMP_vnas.json`, `lastUpdatedAt` 2026-08-26), pulled from `https://data-api.vnas.vatsim.net/api/artccs/ZMP`. Independent of the SOP, more recent, and the thing the client actually tunes.
3. **`ZMP_Low_Sectors.pdf`** — a chart, but one whose label layer survives extraction; it corroborates sector numbers and altitude strata. Positional association in that text is scrambled and is **not** used here.

## Source self-check — what is verified and what is not

- **Frequencies: 29 of 33 confirmed by two sources. Four conflict.** See *Frequency conflicts* below. Do not quote 13, 22, 24 or 25 without naming the source.
- **Strata, scope ranges and ERAM filters: single-source (7200.1O only).** vNAS does not publish them. They are transcribed verbatim from the `Unique Sector Equipment Configurations` paragraph on each sector page.
- **Adjacency: single-source (vNAS only), and it is a coordination map, not a boundary map.** It says which sectors have a route-based coordination rule with which facility. Two sectors can border each other with no rule between them, so **absence of a pair here is not evidence they do not touch.**
- **Sector boundaries are UNREAD.** Every `Sector NN Map` page in 7200.1O is a picture. `ZMP_High_Sectors.pdf` and `ZMP_Approach_Sectors.pdf` have no text layer at all. vNAS does not expose video-map geometry — every candidate endpoint was probed on 2026-09-01 and returns 404. **No lateral boundary in this document is derived; none is stated.**

## The 33 sectors

Stratum is decoded from the ERAM altitude filter, not assumed: `000B242` = low, `228B999` = high, `000B999` = the full stratum, and Sector 21's `068B242` is the only sector with a hard floor.

| Sec | Area | Freq (7200.1O) | Freq (vNAS) | ERAM filter | Stratum | Scope range | Combining |
|---|---|---|---|---|---|---|---|
| 01 | 1 | 134.6 | 134.6 | `000B242` | low | 115–135 NM | Combined at 02 when not open |
| 02 | 1 | 132.9 | 132.9 | `000B242` | low | 075–100 NM | Combines to 04 |
| 03 | 1 | 133.55 | 133.55 | `000B242` | low | 150 NM | — |
| 04 | 1 | 124.4 | 124.4 | `000B242` | low | 100–124 NM | **All Area 1 sectors combine to 04**; filter becomes `000B999` when fully combined |
| 12 | 1 | 132.425 | 132.425 | `228B999` | high | 130–175 NM | Receives 13 |
| 13 | 1 | **133.45** | **133.175** | `228B999` | high | 150–200 NM | Combines to 12 — "a large single high-altitude sector for Area 1" |
| 05 | 2 | 125.3 | 125.3 | `000B242` | low | 125–175 mi | Receives 10 and 21 in single-scope Area 2 |
| 06 | 2 | 134.3 | 134.3 | `000B242` | low | 60–75 NM | — |
| 10 | 2 | 121.05 | 121.05 | `000B242` | low | 75 NM | Combines to 05 single-scope; combined at 11 |
| 11 | 2 | 133.4 | 133.4 | `228B999` | high | 150 NM | **vZMP combines here (Appendix 03)**; pairs with 10 when traffic permits |
| 15 | 2 | 135.7 | 135.7 | `228B999` | high | 100–125 NM | Receives 21 under the interim-altitude waiver |
| 16 | 2 | 133.75 | 133.75 | `228B999` | high | 100–125 NM | — |
| 21 | 2 | 134.85 | 134.85 | `068B242` | low, floor | 60–75 NM | Combined at 05 in single-scope Area 2 |
| 07 | 3 | 132.35 | 132.35 | `000B242` | low | 60–75 NM | — |
| 08 | 3 | 135.0 | 135.0 | `000B242` | low | 60–75 mi | — |
| 09 | 3 | 125.5 | 125.5 | `000B242` | low | 75–100 NM | — |
| 17 | 3 | 134.25 | 134.25 | `FL228B999` | high | 90–125 NM | — |
| 18 | 3 | 128.675 | 128.675 | `228B999` | high | 120–150 NM | — |
| 19 | 3 | 119.875 | 119.875 | `228B999` | high | 120–150 NM | — |
| 20 | 4 | 128.425 | 128.425 | `228B999` | high | 150 NM | — |
| 22 | 4 | **134.55** | **134.75** | `228B999` | high | 150 or 225 by configuration | — |
| 23 | 4 | 127.6 | 127.6 | `000B999` | full | 125–150 NM | — |
| 24 | 4 | **124.2** | **132.15** | `000B999` | full | 150 NM | — |
| 25 | 4 | **134.75** | **134.55** | `000B999` | full | 125–150 NM | Takes DLH's airspace when DLH is closed |
| 33 | 4 | 125.1 | 125.1 | `000B242` | low | 150–200 NM | — |
| 26 | 5 | 119.4 | 119.4 | `000B242` | low | 100–150 mi | Can receive 37 |
| 29 | 5 | 124.875 | 124.875 | `228B999` | high | 95–150 mi | Receives 37 when Area 5 goes to one scope |
| 30 | 5 | 135.775 | 135.775 | `228B999` | high | 95–150 NM | — |
| 36 | 5 | 134.0 | 134.0 | `000B242` | low | 95–150 mi | Can receive 37 |
| 37 | 5 | 128.0 | 128.0 | `000B242` | low | 95–150 mi | Combines at 36 or 26; to 29 when Area 5 is one scope |
| 27 | 6 | 119.6 | 119.6 | `000B242` | low | 100 mi | Combines to 38 |
| 38 | 6 | 123.975 | 123.975 | `228B999` | high | 90–110 NM | Receives 27 and 39 |
| 39 | 6 | 135.1 | 135.1 | `228B999` | high | 110–125 NM | Combines at 38, "but may be combined elsewhere" |

**Area membership:** Area 1 — 01, 02, 03, 04, 12, 13 · Area 2 — 05, 06, 10, 11, 15, 16, 21 · Area 3 — 07, 08, 09, 17, 18, 19 · Area 4 — 20, 22, 23, 24, 25, 33 · Area 5 — 26, 29, 30, 36, 37 · Area 6 — 27, 38, 39. Six areas, 33 sectors, no sector in two areas.

## Frequency conflicts — named, not resolved

| Sector | 7200.1O (2024-11-15) | vNAS (2026-08-26) | Note |
|---|---|---|---|
| 13 | 133.45 | 133.175 | Unrelated values; no obvious transcription path between them |
| 24 | 124.2 | 132.15 | Unrelated values |
| 22 | 134.55 | 134.75 | **Exactly transposed with 25** |
| 25 | 134.75 | 134.55 | **Exactly transposed with 22** |

The 22/25 pair being an exact swap is the strongest clue in the set: one of the two sources has those two rows the wrong way round, which is a far likelier failure than two independent frequency changes that happen to trade values. That still does not say *which* source is wrong.

**The argument for vNAS** — it is 21 months newer, and it is the record the client loads, so it is what a controller will actually be transmitting on. **The argument against treating that as settled** — the SOP is the facility's own governing order and the document a trainee is examined against, and vNAS adaptation errors are not rare. **Resolution is an owner/ZMP-staff question, not a research question.** Until it is resolved the tool must carry both columns and label them.

## Sectors adapted in vNAS but not documented in the SOP

vNAS carries ten further `MSP_nn_CTR` positions with no sector page, no area assignment and no procedures in 7200.1O: **14** (127.125), **28** (119.725), **32** (133.075), **34** (132.725), **40** (134.225), **42** (119.525), **43** (118.825), **44** (120.05), **46** (125.825), **83** (125.55). Plus two non-sector positions: **MSP_G_CTR** on 121.5 (guard) and **MSP_T_CTR** on 123.45 (Minneapolis TMU).

These are not seats. The tool works the 33 documented sectors and lists these only so that a controller who sees one in the client knows why it is not in the drill deck.

## Who each sector faces

Derived from the 125 route-based coordination records in the vNAS facility file — each record names an owning facility and sector list, a requesting facility and sector list, an altitude restriction, and often a route and a note. **This is a coordination map, not a boundary map** (see the source self-check).

| Neighbour | ZMP sectors with a coordination rule facing it |
|---|---|
| **M98** (Minneapolis TRACON) | 05, 06, 07, 08, 09, 10 |
| **R90** (Omaha TRACON) | 26, 27, 37 |
| **RST** (Rochester) | 05, 07, 21, 36 |
| **SUX** (Sioux City) | 26, 27, 37 |
| **DSM** (Des Moines) | 27, 36 |
| **FSD** (Sioux Falls) | 33, 37 |
| **FAR** (Fargo) | 24 |
| **RDR** (Grand Forks) | 24 |
| **BIS** (Bismarck) | 23 |
| **MIB** (Minot) | 02 |
| **DLH** (Duluth) | 03, 10, 25 |
| **GRB** (Green Bay) | 02, 03, 04 |
| **APN** (Alpena) | 01 |
| **AZO** (Great Lakes) | 02 |
| **MKE** (Milwaukee) | 04 |
| **VOK** (Volk) | 05 |
| **ZAU** (Chicago Center) | 04, 05, 12, 13, 15, 16, 17, 30, 36, 38 |
| **ZOB** (Cleveland Center) | 01, 02, 12 |
| **ZDV** (Denver Center) | 20, 23, 29, 39 |
| **ZKC** (Kansas City Center) | 27, 38, 39 |
| **ZLC** (Salt Lake Center) | 20, 23 |
| **CZWG** (Winnipeg) | 25 |
| **CYQT** (Thunder Bay) | 25 |

Two records run the other way, with **M98 owning and ZMP requesting** — the ZMP-M98 relationship is the only one in the file that is coordinated in both directions.

**Foreign neighbours need manual handoffs.** Toronto Centre (YYZ) and Winnipeg Centre (YWG) both require manual coordination of radar handoffs (7200.1O Sector 01 §4.1.1, Sector 03 §4.3.1), and **VATCAN sectors cannot accept Automated Information Transfer** (7200.1O 3.7.A.6.a). Thunder Bay Terminal is a terminal facility based in YWG Centre and is also manual (Sector 03 §4.3.1).

## The M98 interface — read this before trusting the adjacency table

**Owner caution, 2026-09-01:** the M98 toolset's drill log names ZMP sectors **5, 9 and 10**, and the owner flagged that those may be **event-split / training-environment** sectors rather than the ones that actually overlay M98 day to day. That caution is well-founded in provenance — but the order does not bear out the strong form of it, and the real structure is more useful than either reading.

**The M98 interface is layered, not a flat adjacency.** Walking every sector section of 7200.1O for M98 content gives:

| Sector | Stratum | Documented M98 role | Mentions |
|---|---|---|---|
| **10** | low | **"Sector 10 and Minneapolis Approach Control (M98) share a common boundary along the South and Southwestern edge of Sector 10's airspace."** Sequences MSP arrivals over the GEP and BAINY STARs; handles north/northwest M98 departures on the KBREW SID | **19** |
| **07** | low | Sequences M98 arrivals on KASPR, TWOLF, NITZR, BLUEM; controls M98 departures on the RST SID | 11 |
| **05** | low | **Delegated the airspace in Attachment A of the ZMP/M98 LOA, 7,000 MSL and below along the common ZMP/M98 boundary, underlying the Sector 06 shelf.** Carries the EAU, MUSCL/KKILR and AGUDE STARs and the BITLR..GEP satellite routing at 6,000 | 7 |
| **06** | low | "Traffic flow consists mainly of MSP Terminal Area arrival traffic from the east… primary function is the sequencing of MSP Area arrival traffic." EAU, MUSCL, KKILR STARs from the east; AGUDE for satellites | 7 |
| **08** | low | "Primary functionality is working M98 departures on the SCHEP and ORSKY SIDs" | 7 |
| **09** | low | Sequences M98 arrivals on TORGY, SKETR and ENCEE; controls M98 departures on SMERF, DARWIN and LEINY | 7 |
| **16** | high | The FL240-and-above tier over Sector 06. Carries the same EAU / MUSCL-KKILR / AGUDE / BITLR-GEP arrival table | 7 |
| **17** | high | Sequences M98 arrivals at FL240+; TWOLF at or below FL330 for satellites 0600–2200 local | 7 |
| **30** | high | M98 satellite arrivals via TWOLF; routes M98 departures out of Sector 18 into ZKC and ZAU | 6 |
| **36** | **low** | Clears M98 satellite arrivals; hands M98 arrivals to Sector 07 with control for descent to 10,000. **Area 5, `000B242` — a low sector, not part of the high tier** | 5 |
| 18, 19, 21, 25, 39, 11 | mixed | Secondary or passing references | 2–6 |

### What this actually means

1. **Sectors 05, 09 and 10 all have genuine, documented, day-to-day M98 roles.** Sector 10 is the strongest case in the entire order — it is the only sector whose narrative states a shared common boundary with M98 in words. Sector 05's delegation of "7,000 MSL and below along the common ZMP/M98 boundary" is an explicit airspace grant. **The event-split reading does not hold for these three as a class.**

2. **But the owner's instinct points at something real.** Both **05 and 09 are named in the Chapter 10 MSP/M98 event splits** — "Sector 05 (125.3) may be opened to cover Sector 12's airspace from SFC-230, and/or Sector 09 (125.5) may be opened to cover Sector 18's airspace from SFC-230." So both sectors have **two distinct jobs**: a standing M98 role, and an event role covering a *different* sector's airspace. A drill log entry naming 05 or 09 is ambiguous between them unless the frame says which.

3. **The sector you actually talk to is often the combined parent.** **Sector 06 is normally combined at Sector 16**, and only opens "when traffic levels in Sector 16 approach or exceed moderate volume/complexity" or "to accommodate proposed M98 Area departure traffic." So in day-to-day operations the M98-arrivals-from-the-east job is frequently being done on **133.75 as Sector 16**, not on 134.3 as Sector 06. The same stacking applies elsewhere: 05 sits *underneath* the Sector 06 shelf rather than beside it.

4. **The vNAS adjacency map is incomplete, exactly as this document warned.** It lists 05–10 against M98 and **does not list 16, 17, 30 or 36**, all of which carry substantial M98 procedures. Coordination records are not a boundary map, and absence from them proves nothing.

**Practical rule for the tool:** do not present "faces M98" as a property of a sector without saying *at which stratum* and *in which configuration*. The drill frame must state the sector, its stratum, and whether it is standing or event-split.

> **Unverified.** The owner said they would confirm the 5/9/10 question. The table above is what 7200.1O says; it is not a substitute for that confirmation, and the M98 tool's drill-log provenance is a separate question this document cannot settle.

### The training environment split — owner-supplied, and it resolves the 5/9/10 question

**Owner-supplied 2026-09-01. Not stated in 7200.1O.** This is the configuration the M98 drill log's references to "sectors 5, 9 and 10" actually come from.

In the training environment, **three seats partition the entire Area 2 + Area 3 low tier**:

| Seat | Frequency | Owns | Note |
|---|---|---|---|
| **05** | 125.3 | **05, 06, 21** | Area 2 low, less Sector 10 |
| **09** | 125.5 | **07, 08** | The rest of Area 3 low. **Sector 09 does not own its own airspace.** |
| **10** | 121.05 | **09, 10** | Its own airspace plus Sector 09's. **Crosses the Area 2 / Area 3 line.** |

**The odd one is Sector 09: you sit it, but you do not work it.** Its own airspace belongs to seat 10; what you actually control from 09 is the rest of the area it belongs to — 07 and 08. Any drill log entry, note or reference that says "sector 9" in a training context therefore means *07 and 08*, not sector 09's airspace.

**Consistency check.** The three bundles cover `05, 06, 07, 08, 09, 10, 21` — exactly the seven low sectors of Areas 2 and 3, with no sector owned twice and none left out. The tool's smoke test asserts this partition, so a future edit that breaks it fails loudly.

**This is not the order's single-scope guidance, and the two must not be conflated:**

| | Training environment (owner) | 7200.1O single-scope |
|---|---|---|
| Area 2 | Seat **05** takes 05, 06, 21; seat **10** keeps 10 | Sector 10 combines to 05; Sector 21 combined at 05 (§5.3.2, §5.7.2) |
| Area 3 | Seat **09** takes 07, 08; **09's own airspace goes to seat 10** | "All sectors can be combined at Sector 07, 18, or 09" (§6.1.2, §6.2.2, §6.3.2) |

The order never moves Sector 09's airspace to Sector 10, and never has a seat own airspace across the Area 2 / Area 3 boundary. **The training split is a separate configuration layered on top of the order, and the order is not wrong — it simply describes a different thing.**

**Why this matters for the tool.** It means "sector" is ambiguous in three distinct ways, and a drill frame has to disambiguate all three:

1. **Which sector's airspace** — 09 the seat versus 09 the airspace.
2. **Standing or event** — 05 and 09 are also Chapter 10 event-split sectors covering 12's and 18's airspace.
3. **Which stratum** — the low sector or the high sector above it, since 06 is normally combined at 16.

Encoded as `TRAINING_SPLIT` and `trainingSeatOwning(n)` in the Sector Deck block. The seat picker shows both directions: pick 09 and it says *owns 07, 08*; it also says *in the training split this airspace is worked from seat 10*.

### Departure gates — the structure the M98 tool is missing

**Owner-supplied correction, 2026-09-01: M98's departures are organised into *gates*, and a gate consists of several SIDs.** Confirmed in the source: **M98 7110.26A** gives the gate table outright, as the first letter of scratchpad #1.

| Letter | Gate | Letter | Gate |
|---|---|---|---|
| **E** | EAU | **R** | RST |
| **D** | DLL | **F** | FAR |
| **N** | ODI | **A** | ABR |
| **B** | BRD/DLH | **O** | ONL/FOD |

Scratchpad #1 carries **"the first letter of the departure gate through which the aircraft will exit M98 airspace, followed by the two-digit requested altitude in thousands of feet if other than the aircraft's present altitude."** The order's own example: **`B12` = the BRD/DLH gate, assigned 12,000.** Scratchpad #1 may alternatively carry the three-letter gate, or the arrival airport.

**Eight gates, named for the exit navaid, and the nine turbojet SIDs route through them.** This resolves what `../M98 Training/CLAUDE.md` records as an open problem — it says there is *"no SID-to-ZMP-sector map"* and derives the receiving ZMP sector from the ZMP–M98 LOA Table 1 heading bands, calling that an inference. **The gate table is a better basis**: the gate names the exit point, and the scratchpad states it explicitly rather than requiring a bearing to be reverse-engineered. Worth carrying back into the M98 tool.

> **Correcting an earlier note in this file.** `EAU` was previously listed here as an unexplained "new STAR". It is both — **EAU is a departure gate letter `E`** *and* the Eau Claire navaid over which a conventional MSP arrival runs. Same for `GEP` (Gopher) and the `BRD`/`DLH`/`RST`/`FAR`/`ABR`/`ODI`/`DLL`/`ONL`/`FOD` identifiers: they are navaids doing double duty as gate names. They are not undocumented procedures.

### Still genuinely unresolved

- **`SKETR`** — a real MSP arrival, and the order calls it **"MSP SKETR Arrival, Non-RNAV Turbojets & Turboprops"** (7200.1O Sector 09 arrival table). So it belongs to the **conventional/non-RNAV** arrival family alongside KASPR, which the M98 tool carries. It has a published holding fix: **SKETR, SW, 10 NM legs, 310 radial, left turns, 070–FL230.** Sectors 09 and 19 both sequence it. **The M98 tool does not carry SKETR at all** — a genuine gap in its conventional arrival set.
- **`DARWIN`** — appears three times, always as *"SMERF, DARWIN, and LEINY SID aircraft"* (Sectors 09 and 15/19). Grouped with two names that **are** M98 SIDs. Whether DARWIN is a ninth-plus SID, a gate, or a stale name is **not resolved by any document in the corpus.**
- **`RRAZZ`, `JAGOW`, `FOD`** — arrival fixes in the Sector 30 satellite routing. `FOD` is also half of the `O` gate (ONL/FOD).

Do not add SKETR or DARWIN to either tool's route data until the owner confirms.

> Sector 17's narrative writes the arrival as **`NITRZ`**. Every other occurrence in the corpus is `NITZR`. Transcribed as written; it reads as a typo in the order.

## Reduced separation — the single-site areas

5 NM is the standard everywhere in vZMP. 3 NM is authorised **only** inside the Appendix 02 single-site areas, which exist because of four radar sites: **Empire MI (QJA), Eagle River WI (EGV), Alpena MI (APN), Sawyer MI (SAW)** (7200.1O 3.6).

Three radii are stated in words on the sector pages. They are the only ones written down anywhere — **Appendix 02's shaded areas are a picture and are UNREAD.**

| Sector | Site | Radius | Band | Cite |
|---|---|---|---|---|
| 01 | APN | **54 miles** | below FL230 | 7200.1O §4.1.1 |
| 02 | Empire | **40 miles** | below FL230 | 7200.1O §4.2.1 |
| 03 | SAW and EGV | **40 miles** | not stated | 7200.1O §4.3.1 |

Sector 01's 54 NM against the other two at 40 NM is an as-written difference, not a transcription slip — it is worth confirming with ZMP staff before it is built into a quiz, but it must be transcribed as written until then. In all cases the controller must revert to 5 NM immediately on any single-site data anomaly (7200.1O 3.6.1.c).

## Transfer of control across the boundary

Not uniform — each neighbour has its own release. From the per-sector `Transfer of control points other than airspace boundaries` paragraphs:

| Boundary | Release | Cite |
|---|---|---|
| ZMP / ZOB, ZMP / YWG | Receiving ARTCC may take beacon code changes and **turns up to 20°** within **20 miles** of the common boundary crossing point | §4.1.4.5.a, §4.3.4.5.a |
| ZMP / YYZ | Beacon code changes and **turns up to 45°** within **20 miles** | §4.1.4.5.b |
| ZMP / APN | APN has control for **turns, climbs and descent** on completion of handoff and communications transfer | §4.1.4.5.c |
| ZMP / AZO | **Both** facilities have control for **turns up to 30°**, descent and code change within **10 miles** of the common boundary | §4.1.4.5.d |
| ZMP / DLH | DLH has control for **turns and descent** **10 miles** from the common boundary | §4.3.4.5.b |
| Area 1 low internal | Each Area 1 low sector releases to **all other Area 1 low sectors** for descent and turns up to **20°** | §4.1.4.5.e, §4.3.4.5.c |

The per-sector pages carry further releases sector by sector; the six above are the ones transcribed so far. **This table is incomplete** — Areas 2 through 6 have not been walked paragraph by paragraph. See `claude_ZMP_Gap_Analysis.md`.

## As-written anomalies — preserve, do not silently correct

1. **Section 3 of Chapter 4 is headed `SECTION 3. SECTOR 3`**, not `SECTOR 03`. Every other sector in the order is zero-padded.
2. **Sector 17's altitude filter is written `FL228B999`**, with an `FL` prefix no other sector's filter carries.
3. Scope ranges are written inconsistently across sector pages — `NM`, `miles`, and bare numbers all appear, sometimes within one Area. Transcribed as written above.
4. Sector 22's range is conditional — "normally 150 or 225 depending on configuration" — and the configurations are not named.

## What the tool does with this

`SECTORS`, `AREAS`, `STRATUM`, `NEIGHBOURS`, `XFER_CONTROL`, `SEP` and `COMBINE_POINT` in the Sector Deck block are this document, in data form, and nothing in the HTML may disagree with it. Where a frequency conflicts, the data carries **both** values and the seat picker labels which is which; it never picks one.
