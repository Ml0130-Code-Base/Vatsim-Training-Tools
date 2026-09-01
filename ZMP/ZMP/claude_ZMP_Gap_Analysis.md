# ZMP Gap Analysis — what the documents do not answer

Assembled 2026-09-01 from ZMP Order 7200.1O CHG 2, the six centre LOAs, the ten TRACON LOAs, the training and administrative manuals, the strip-marking order, the four chart PDFs, and the vNAS facility record.

**ZMP is in better shape than R90**, because 7200.1O describes each of its 33 sectors in prose — the narrative names the stratum, the neighbours, the approach controls and the combining rule in words. What it never does is draw a boundary in text. **Every `Sector NN Map` page is a picture.**

---

## Part 1 — What the owner has offered to supply, ranked by training value

The M98 lateral boundary arrived as nine MSP radial/DME pairs and that was enough to build a whole engine on. The same form works here. **Do not start with all 33** — start with the sectors the trainee will actually sit.

### 1. Area 3 low: Sectors 07, 08, 09 — the M98 face

These three are the ZMP side of the facility the owner already knows cold. Sectors 05, 06, 07, 08, 09 and 10 all carry M98 coordination rules; 07/08/09 are the Area 3 low group and they hand M98 its arrivals and take its departures. Building the M98-facing boundary first means every drill can be checked against the M98 tool's existing, verified geometry — the two tools would meet at a shared line.

**Smallest useful form:** the 07/08/09 lateral boundaries as radial/DME off the MSP VOR (the same anchor `../M98 Training/` already uses — N44 53.79 / W093 14.19), plus each sector's floor and ceiling. The strata are already known from the ERAM filters (`000B242` for all three).

### 2. Area 5 and Area 6 low: Sectors 26, 27, 37 — the R90 face

The three sectors that face Omaha. Supplying these lets the ZMP tool and the R90 tool be drilled against each other across the same boundary, which is the most valuable thing two facility tools can do. The ZMP-R90 LOA already gives the altitudes on both sides; only the line is missing.

**Smallest useful form:** the 26/27 dividing line (the LOA refers to "the ZMP Sector 26/27 boundary" twice as a departure-band limit, so it is an operationally live line), and the outline of 37.

### 3. The Appendix 02 three-mile areas

7200.1O 3.6 authorises 3 NM separation **only** inside the shaded areas of Appendix 02, drawn around the **Empire MI (QJA), Eagle River WI (EGV), Alpena MI (APN)** and **Sawyer MI (SAW)** radar sites. **Appendix 02 is a picture.**

Three radii survive in the sector narratives and are the only ones written down anywhere: **Sector 01, 54 miles from APN, below FL230** · **Sector 02, 40 miles from Empire, below FL230** · **Sector 03, 40 miles from SAW and EGV** (band not stated). Sector 01's 54 against the others' 40 is an as-written difference worth confirming.

**Smallest useful form:** confirmation of the four radii and their altitude bands. Circles around named sites are cheap to specify and this is the one rule in the facility where getting separation wrong is a hard error rather than a soft one.

### 4. The Chapter 10 event splits

Three published splits — MSP/M98 three-way, MSP/M98 with heavy KKILR/MUSCL traffic, and OMA/LNK focus. The prose is text; **every split diagram is a picture**, and each split has two of them (SFC–FL230 and FL240–UNL).

**Smallest useful form:** for each split, which sectors each of the three or four controllers takes, in each stratum. That is a list, not geometry, and it would make the drill frame's "who else is open" real.

### 5. The remaining 27 sector boundaries

Lower priority, and honestly may never be worth it. The tool does not need all of ZMP to be a good training tool — it needs the sectors the owner sits.

---

## Part 2 — Recoverable without the owner, but not yet done

Work that is available in the documents and simply has not been walked yet.

| Item | Where | Status |
|---|---|---|
| **Per-sector transfer-of-control releases for Areas 2–6** | 7200.1O, the `Transfer of control points other than airspace boundaries` paragraph on each sector page | Only Sectors 01 and 03 transcribed. Areas 2–6 unwalked. **This is the single largest recoverable gap.** |
| **Per-sector radar arrival routes and restrictions** | 7200.1O, paragraph 6 on each sector page — a route/restriction table per sector | Only Sector 01 transcribed. These tables are the en route equivalent of M98's ladders and are the natural spine of a traffic model. |
| **Per-sector holding fixes** | 7200.1O, paragraph 7 on each sector page — direction, leg length, max speed, turn direction, altitudes | Unwalked. Sector 01 says "at the controller's discretion"; others publish real tables. |
| **The Figure 3-1 advance-approach-information table** | 7200.1O 3.4 | Captured in `claude_ZMP_SOP_Reference.md` — 33 airport/sector rows |
| **Full LOA route/altitude tables for all six centres** | The six centre LOAs | Extracted into `claude_ZMP_Enroute_LOA_Reference.md`, but not yet reconciled against the sector pages |
| **The 125 vNAS coordination records** | `../_vnas/ZMP_vnas.json` | Adjacency summarised in `claude_ZMP_Sector_Reference.md`; the individual altitude/route/note payloads are **not yet transcribed** and they are a ready-made grading table |

---

## Part 3 — Unread because it is a picture

| File | Status |
|---|---|
| `ZMP_High_Sectors.pdf` | **No text layer at all** — vector artwork with text converted to outlines. Entirely UNREAD. |
| `ZMP_Approach_Sectors.pdf` | **No text layer** — raster scan, 8.9 MB. Entirely UNREAD. |
| `ZMP_Low_Sectors.pdf` | **Has a label layer** (~56 KB) — sector numbers, altitude strata (`23,000 & BLW`, `15,000 & BLW`, `12,000 & BLW`, `10,000 & BLW`, `8,000 & BLW`, `4,000 & BLW`), navaid identifiers, Area labels and neighbouring-centre names are all recoverable. **Positional association is not** — pdftotext scrambles the layout, so a sector number and an altitude string appearing near each other in the text proves nothing. *(This corrects `../M98 Training/claude_Source_Documents_Index.md`, which records this file as having no text layer.)* |
| 7200.1O `Sector NN Map` pages | 33 pictures, one per sector. UNREAD. |
| 7200.1O Appendix 02 | The three-mile areas. UNREAD. |
| 7200.1O Appendix 03 Figure 1 | The delegated-airspace overview. UNREAD. |
| 7200.1O Chapter 10 split diagrams | Six pictures, two per split. UNREAD. |
| **vNAS video maps** | Probed 2026-09-01 — `data-api.vnas.vatsim.net` exposes the facility record but **no video-map endpoint**. Every candidate URL returns 404, and no public documentation of one was found. **vNAS is not a path to ZMP geometry.** |

---

## Part 4 — Conflicts and open questions

1. **Four sector frequencies disagree between 7200.1O and vNAS** — Sectors 13, 22, 24 and 25, with 22/25 exactly transposed. Named and unresolved in `claude_ZMP_Sector_Reference.md`. **Needs a ZMP staff ruling, not more research.**
2. **Ten sectors are adapted in vNAS with no SOP page** — 14, 28, 32, 34, 40, 42, 43, 44, 46, 83. Are these live positions, legacy adaptation, or ERAM-only artefacts?
3. **The training manual contradicts itself on ZMP CTR certification.** `ZMP_Order_3120_4F` states there is no Major facility certification for ZMP CTR, while its own C1.7 lesson recommends the student for "the ZMP CTR Major facility certification written" exam. Flag to training staff; encode neither.
4. **The training manual is materially older than the operations orders** — Revision 6, effective 2019-07-01, against 7200.1O CHG 2 (2024-11-15). It still references VRC, TeamSpeak and ARTS/CARTS. **Where they disagree, the operations order wins.**
5. **The ZMP Minor TRACON Reference is dated 2015-01-01**, the oldest document in the set, and it is the only source for several small approach controls' hours and delegated altitudes. Treat as a working default, the way `../M98 Training/` treats RST's hours.
6. **Sector 01's 54 NM single-site radius** against 40 NM at Sectors 02 and 03. Intentional or a typo?
7. **Sector 22's scope range is conditional** — "150 or 225 depending on configuration" — and the configurations are never named.

---

## Part 5 — What is fully covered and needs nothing

- **The sector spine** — 33 sectors, six Areas, frequencies (29 of 33 double-confirmed), strata, scope ranges, ERAM filters, combining targets.
- **Chapter 3 in full** — ERAM filter buffers, interim-altitude waiver pairs, advance approach information, full route clearance, three-mile authorisation, AIT, Data Block Coordination, MIA.
- **The AIT and Data Block Coordination condition sets** — hard, checkable numbers (5 minutes, 3 minutes, Mode C, departure exclusion, adjacent-ZMP-sectors-only).
- **The procedural-altitude rule for descend-via into M98**, with the order's own KKILR example.
- **The combine point** — Sector 11 on 133.4, with the AFV `MSP_CTR` transceiver trap.
- **The position relief briefing checklist** (Appendix 01), ten items ending in a nine-part traffic list.
- **All six centre LOAs and all ten TRACON LOAs**, extracted.
- **The en route strip-marking order**, though 7200.1O operates stripless and the strip order is ATCT-scoped.

**Roadmap item 3 in `CLAUDE.md` — AIT and Data Block Coordination as gradeable objects — was chosen because it sits entirely inside this list.** Those two procedures can be drilled today, with no geometry at all.
