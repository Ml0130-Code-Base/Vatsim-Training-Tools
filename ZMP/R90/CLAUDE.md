# R90 Training Toolset

Single-file, offline-first HTML training tools for a VATSIM virtual air traffic controller pursuing **R90 (Omaha TRACON)** certification. Same owner, same trainee, same nightly-practice purpose as the M98 toolset in `../M98 Training/`. R90 and M98 are both **terminal** facilities on STARS, so far more of the M98 architecture transfers here than to `../ZMP/` — but R90 is a three-airport TRACON with a hard airspace ceiling and a Lincoln satellite sector, not a single-metroplex operation, and none of M98's operational data crosses over. Treat correctness of aviation data as safety-critical for training value: never invent procedures, fixes, altitudes, or paragraph citations — every operational number must trace to a reference file in this repo.

> **Skeleton status, 2026-09-01.** This folder was created as a *structural* skeleton alongside `../ZMP/`. The reference layer below is populated from the real source documents pulled the same day and is citable. **The tool itself (`r90-drill-deck.html`) is a working shell, not a finished engine.** **There are no R90 training notes yet**: no OJT sessions, no practice log, no owner-observed shortfalls. `STANDING` is therefore empty and `claude_R90_OJT_Session_Review.md` is an intake template, not a review. Nothing in the tool may present a document-derived guess as an observed weakness.
>
> **The blocking gap is geometry, and it is worse here than at ZMP.** Every R90 sector boundary — Omaha sectors, Lincoln sectors, Lincoln Final, RADAR Final, the prearranged-coordination airspace, and the LNK tower areas — is a picture with no text layer. **Not one boundary is described in words anywhere in the three R90-side documents.** The owner has offered to supply points; the specific asks are listed in `claude_R90_Gap_Analysis.md`.

## Repository layout

- `r90-drill-deck.html` — the tool. Two extension blocks before `</body>`: the Radar Deck (live player + drill library) and the Drill Builder + Training Notebook. Three pages mounted in workflow order and moved into view wrappers by `buildPages()` — **Set up a drill** (Position, Build) · **Fly it** (Live) · **Notes and log** (Notes, Log). Namespace is `window.RD`, not `DD`.
- `radar-deck-block.html` / `drill-builder-block.html` — the two blocks alone, paste material. Regenerate from the main file; never edit separately. *(Not yet split out while the engine is a shell.)*
- `claude_*.md` — the authoritative reference set. **These win over anything hardcoded in HTML when they conflict.**
- `source-docs/` — 7 PDFs pulled from `minniecenter.org/docs` on 2026-09-01 with `pdftotext -layout` extractions in `source-docs/txt/`. Manifest and text-layer status in `claude_Source_Documents_Index.md`.
- `../_vnas/ZMP_vnas.json` — the vNAS facility record for the whole ARTCC, which contains R90 as a child TRACON. **It is the only source for the R90 airport inventory**, which the SOP never states.

## Verified operational data (2026-09-01)

- **The governing order is R90 7220.10B CHG 2, effective 2024-10-27.** Its own cancellation line reads "vZMP R90 SOP **7110**.10B CHG 1" while the order is numbered **7220**.10B (R90 1-3) — an as-written discrepancy, preserved rather than corrected.
- **R90 is six positions (R90 7220.10B 2-1)**, and the frequency, STARS ID and callsign of each are confirmed twice — once from the order, once from the vNAS facility record. **All six agree.**

  | Position | Frequency | STARS ID | Callsign |
  |---|---|---|---|
  | Radar West | 135.875 | `W` | `OMA_W_APP` |
  | Radar East | 124.500 | `X` | `OMA_X_APP` |
  | Radar Final | 133.325 | `V` | `OMA_V_APP` |
  | Radar Offutt | 124.950 | `O` | `OMA_O_APP` |
  | Radar Lincoln | 124.000 | `L` | `LNK_L_APP` |
  | Lincoln Final | 128.150 | `F` | `LNK_F_APP` |

  Radar West moved from 120.1 to 135.875 in the CHG 2 record of changes — the old number will still be in circulation, so the tool must not accept it.
- **R90's delegated airspace has a hard ceiling and it is not uniform (ZMP-R90 LOA 3, eff. 2023-11-06): at and below 15,000 MSL over R90 East and West, at and below 10,000 MSL over R90 LNK.** This is the single most structurally important number in the facility and it has no M98 equivalent — M98's ceiling is a shelf structure, R90's is a flat lid that changes over Lincoln.
- **The airports R90 works are not stated in any R90-side document.** The SOP confirms satellite airports exist (2-2.b "ensure auto-acquisition for departures at satellite airports", 3-8.d "Satellite Arrivals") but never enumerates them. **The inventory comes from vNAS**, where the R90 area lists underlying airports **OMA, OFF, LNK, CBF, MLE** and single-site-arrival airports **OMA, LNK, OFF, CBF**, with tower list ranges OMA 120, OFF 60, LNK 90 and an area visibility centre at 41.143 / −95.903722, surveillance range 150. Single-source — flag it as such wherever it is used.
- **Runways, from the tower orders and corroborated by the scratchpad tables:** **OMA (Eppley) 14L, 14R, 18, 32L, 32R, 36** (OMA 7110.4A 4.a/4.b) · **LNK (Lincoln) 14, 17, 18, 32, 35, 36** (LNK 7110.6A 4.a/4.b/5.b) · **CBF 36 only**, from the scratchpad rule `I = ILS Rwy 36` (R90 3-10). **OFF's runways are not stated** — no Offutt tower order exists in the document set.
- **Offutt has no tower order.** OFF is referenced by R90 3-8.b and Appendix B 6.b, and Radar Offutt is a staffed position, but **no frequency, callsign, runway, initial altitude or missed-approach instruction for OFF appears anywhere in the pulled documents.** It is a military field inside R90's airspace and the tool cannot currently drill it.
- **Initial departure altitudes** (OMA 7110.4A 5.a.4, LNK 7110.6A 6.c.4): **OMA** IFR turbojet **5,000**, IFR prop **4,000**, VFR/SVFR turbojet **5,000**, VFR/SVFR prop **3,500**, in every case *or filed altitude if lower*. **LNK** all outbound IFR/VFR/SVFR **4,000**, *or lower if requested*. **OFF not stated.**
- **Standard departure headings are flow-dependent and split by aircraft type at OMA but not at LNK** (OMA 5.c.4, LNK 6.a.6). **OMA north (32L/32R/36):** turbojet to R90 West **320**, turbojet to East **360**, prop **300 clockwise through 020**. **OMA south (14R/14L/18):** turbojet West **180**, East **140**, prop **120 clockwise through 200**. **LNK north (36/35/32): 300 clockwise through 030. LNK south (18/17/14): 140 clockwise through 210.**
- **Missed approach instructions** (OMA 5.c.6, LNK 6.a.5): **OMA north profile 3,000 heading 360; south profile 3,000 heading 140. LNK north heading 300/030 at 3,000; south heading 210/140 at 3,000.** On the R90 side the missed approach is expressed as a **scratchpad termination letter**, not a heading: `E` miss to East (124.5), `W` miss to West (135.875), `V` miss to OVR (124.5), `P` published miss (124.5) — and **all missed approaches go to 135.875 when Radar East is not open** (R90 3-10).
- **Flow selection is wind-driven and both towers prefer north when it is calm** (OMA 5.c.2, LNK 6.a.3): **OMA** winds **under 5 kt** → north profile preferred; **5 kt or more** → the profile most closely aligned with the wind. **LNK** calm → north configuration; **6 kt or more** → most closely aligned. Local Control selects, and at LNK explicitly notifies the TRACON.
- **A runway alone in the scratchpad means a visual approach to that runway** (R90 3-10) — the approach letter's *absence* is the encoding. At OMA the visual set is `32L, 32R, R36, R18, 14R, 14L`. This is a terminal-automation idiom with no M98 analogue and it is a strong first drill target.
- **The STARs are named but their geometry is a picture.** The ZMP-R90 LOA names **LANTK, MARWI, TIMMO, HOWRY** and **AANDY** (AANDY, with TIMMO, replaced the Sioux City / Pawnee City arrivals per the LOA's own Attachment B footnote). **Attachment B is an image**: no fixes, no crossing restrictions, and AANDY's position relative to the others is unrecoverable from text.
- **The STAR window is a clock, not a condition (ZMP-R90 LOA 4.b.2.a): 0730–2130 local, Monday through Friday, all aircraft at or above 16,000 landing OMA or OFF must be assigned a STAR.** Outside that window the STARs are "off" and **all R90 aircraft must be on course** (4.d.6).
- **Arrival delivery altitudes (ZMP-R90 LOA 4.b):** STAR arrivals **level at or descending to 16,000**, or **17,000 stacked**. Arrivals routed over **SUX/MZEEE** level or descending to **11,000**. Non-STAR arrivals must be direct destination or a destination approach fix — over East/West at or descending to **16,000** or level at or below **15,000**, over LNK at or descending to **11,000** or level below **11,000**. **R90 accepting a handoff of an aircraft in level flight constitutes approval of an inappropriate altitude for direction of flight** — a rule with real teeth.
- **R90 has control on all arrivals at or below FL230 for descent and turns up to 30° on initial contact**, provided the aircraft will not enter another controller's airspace (LOA 4.b.2.d and 4.b.3.c). **ZMP-assigned speeds on STAR inbounds need no coordination with R90** (4.b.2.e).
- **The departure heading bands are defined by the gaps between STARs** (LOA 4.d.2), and apply while the STARs are active to anything filed off OMA or OFF requesting above 15,000: **360–030** between the ZMP 26/27 boundary and LANTK · **090–110** between LANTK and MARWI · **150–185** between MARWI and TIMMO, *except* aircraft filed on the RBA arrival or J41, which are established on course · **220–250** between TIMMO and HOWRY · **280–320** between HOWRY and the ZMP 26/27 boundary. Two flow-dependent exceptions: **OBH/LBF** departures go north of HOWRY when Eppley is in a north flow and south of it in a south flow; **SLN/PWE/ICT** departures go west of TIMMO in a north flow and east of it in a south flow.
- **The 2.5-mile rule appears twice and means different things.** In the LOA it is a *boundary* distance: ZMP has control to climb R90 LNK departures above 10,000 that will traverse, or come within **2.5 miles of, the R90 west shelf over R90 LNK** (4.d.5), and a satellite departure within **2.5 miles of the common ZMP/R90 boundary**, or in ZMP airspace, needs an approval request rather than the automatic climb approval (4.d.7). In vNAS it is `twoPointFiveApproachEnabled` — the 7110.65 reduced final-approach separation. **Do not conflate them.**
- **ZMP's reciprocal grants (LOA 4.d.8–10):** ZMP has control for **turns up to 30°** on aircraft exiting R90's airspace, with R90 responsible for the resulting internal point-outs; ZMP has control for **code changes**; and ZMP **may level all R90 departures at R90-assigned altitudes without coordination**.
- **Lincoln arrivals from the east above 15,000 are handed to Omaha Radar West, not to Radar Lincoln** (LOA 4.b.3.d), with ZMP 27 responsible for coordinating with ZMP 26.
- **R90's neighbours** are **ZMP** sectors **26, 27 and 37** (the LOA names 26 and 27; the vNAS coordination records add 37), the three towers **OMA, LNK and OFF**, and the adjacent approach control **SUX** (Sioux City), which appears in the Appendix B relief checklist as `*ZMP/SUX`.
- **Tower frequencies** (OMA 7110.4A 6, LNK 7110.6A 7): **OMA** Clearance 119.900, Ground 121.900, Local 132.100, ATIS 120.400 · **LNK** Clearance 120.700, Ground 121.900, Local 118.500, ATIS 118.050. **OFF not stated.**
- **Not stated anywhere in the R90 document set:** Class B, C or D dimensions (Class C is named at OMA and LNK but never dimensioned); tower hours of operation; tower-to-TRACON handoff and release rules; VFR pattern altitudes, entry/exit procedures or flight-following rules. See `claude_R90_Gap_Analysis.md`.

## Architecture rules (non-negotiable)

1. **Single file, no build step, no dependencies, offline-first.** Vanilla JS; the Google Fonts link is the only external reference and the page works without it. Any network call must be optional by construction with a paste path that always works.
2. **Additive extension pattern.** Every `<script>` is an extension block in dependency order: Radar Deck, then Drill Builder. Markup outside the blocks is chrome only.
3. **One copy of every operational number, and the namespace is `RD`.** The Radar Deck exposes `window.RD`; the builder reads it and returns early if absent. **Do not use `DD` here** — M98 owns it, and R90 and M98 are similar enough that a paste-merge binding the wrong engine would be genuinely hard to spot.
4. **Design system:** the M98 CSS custom properties verbatim. New classes namespaced `rd-`.
5. **Interface language:** full terminology, sentence case. Known domain abbreviations (TRACON, STARS, PACP, LOA, SOP, STAR, MVA, and the STARS position letters) are fine.
6. Any spoken/TTS feature follows `claude_R90_TTS_Voicing.md` and `claude_US_Carrier_Callsigns.md` exactly. **The STAR names are the pronunciation risk here** — LANTK, MARWI, TIMMO, HOWRY, AANDY — and none of them has an owner-supplied spoken form yet.
7. **R90 data only.** M98's gates, feeder split, near/far, DDA, ACDA and configuration floors are MSP-specific and do not exist here. What transfers is the architecture, the coordination reference (7110.65 Ch 5 Sec 4 is national), the terminal separation reference, the callsign and TTS docs, and the house voice.

## Radar Deck engine map (first script block)

**Status: shell.** Data spine and mount only; no traffic model.

Present — `POSITIONS` (the six, with frequency, STARS ID, callsign), `AIRPORTS` (OMA/OFF/LNK/CBF/MLE with the runway inventories that are stated and explicit nulls where they are not), `CEILING` (15,000 East/West, 10,000 LNK), `STARS_LIST` (the five named arrivals, geometry marked absent), `STAR_WINDOW` (0730–2130 local Mon–Fri), `ARRIVAL_ALTS` (the LOA 4.b delivery altitudes), `DEP_ALTS` and `DEP_HEADINGS` (OMA and LNK, by flow and type), `MISSED` (tower instructions and the R90 scratchpad terminations), `SCRATCHPAD` (the 3-10 encoding tables), `HEADING_BANDS` (the five STAR-gap bands with their exceptions), `CONTROL_FOR` (both directions of the LOA grants), `FLOW_RULE` (the two wind thresholds), plus `rdPosition(id)`, `rdCeilingOver(area)`, `rdRunwaysAt(apt)`, `fmtAlt`, `log`, `logHtml` and the `RD.hooks` array.

Absent by design — routes, a tick loop, aircraft objects, a parser, grading, and **all geometry**. `STANDING` is an empty array.

## Drill Builder + Notebook map (second script block)

**Status: shell.** Guards on `window.RD`. Present: the seat picker built from `POSITIONS`, the three-page wrapper (`buildPages`, `rdPage`), `localStorage` under `r90-drill-deck-v1` wrapped in try/catch with a stated in-memory fallback, and the notebook empty-state. `PRIOR` is empty and `hist()` returns only `state.entries` — **one ledger, no second class.**

## Testing

- `node smoke-test.mjs r90-drill-deck.html` — same harness shape as M98's. Asserts the block count, that all six positions are present with unique frequencies and unique STARS IDs, that the East/West and LNK ceilings differ, that every runway list is either stated or explicitly null (never invented), that the five STARs carry no fabricated geometry, and that `STANDING` is empty.
- **No Node on the owner's machine** (checked 2026-09-01). The harness has **not been run**. Say so rather than implying it passed.

## Roadmap (owner-prioritized)

1. **Sector boundaries — the whole facility is blocked on this.** Omaha sectors, Lincoln sectors, Lincoln Final, RADAR Final, and the PACP airspace are all pictures. A terminal tool without a final-approach boundary cannot drill the thing terminal controllers are actually graded on. Owner-supplied points are the path, exactly as the M98 lateral boundary came in.
2. **The combining table (R90 3-4) is also a picture** — which position combines into which, and on what frequency, is unknown. Without it the tool cannot model "who else is open", which is half of M98's drill frame.
3. **Scratchpad-driven approach clearance drilling.** The 3-10 tables are complete text, the encoding is unambiguous, and the runway-alone-means-visual rule is exactly the kind of deterministic check the M98 engine grades well. **This is the best first drill in the facility and it needs no geometry.**
4. **The STAR-gap departure heading bands** (LOA 4.d.2) are five numeric ranges with two named exceptions — also fully gradeable without geometry, and the most distinctive R90 procedure.
5. An Offutt tower order, if one exists. Until then OFF is a position with no field behind it.
6. First OJT session. Until one is flown, `claude_R90_OJT_Session_Review.md` stays a template and `STANDING` stays empty.

## Session hygiene

Commit after each completed subtask. Long sessions: `/clear` and let this file re-anchor context. When aviation data is involved, cite which reference file and which paragraph the number came from in the commit message.
