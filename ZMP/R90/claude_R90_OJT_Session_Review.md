# R90 OJT Session Review — INTAKE TEMPLATE (no sessions yet)

**Status, 2026-09-01: empty on purpose. No R90 OJT session has been flown.**

This file is the R90 counterpart of `../M98 Training/claude_M98_OJT_Session_Review.md`, which reviews M98 sessions 1–7 and is where that tool's five standing training items come from. **Nothing equivalent exists for R90, so nothing equivalent may be written here.**

## The rule this file enforces

> **A standing training item is an observed shortfall, not a document-derived guess.**

R90 makes this temptation sharper than ZMP does, because R90 and M98 are both terminal facilities on STARS and the M98 items *look* transferable. They are not. M98's five items came from watching one controller work one metroplex — the DDA transit pattern, the Shoreview MVA bust that recurred four sessions apart, the specific clearance-completeness failures. **Those are facts about M98 sessions, not facts about terminal control.** Importing them here would fabricate a training history.

`RD.STANDING` is an empty array, the smoke test asserts it is empty, and the tool says so on the notes page. **Leave it empty until a session is flown.**

What the documents *may* legitimately supply is a **candidate watch list** — fenced at the bottom, and not standing items.

---

## How to fill this in after session 1

Follow the M98 review's shape:

### Source self-check

What is verified, what is not, which sessions are covered, whether the notes are contemporaneous, and where confidence is low.

### Status grid — pattern by session

| Pattern | S1 | S2 | S3 | … |
|---|---|---|---|---|
| *(pattern name)* | | | | |

A pattern earns a row when it appears **twice**; a single occurrence is a note.

### One section per pattern

- **What actually happened**, session by session, with the callsign and the moment.
- **The mechanism** — why it happened, distinguished from superficially similar failures.
- **The citation** — which paragraph of R90 7220.10B, the ZMP–R90 LOA, or a tower order the correct action comes from.
- **Confidence caveat.**
- **The standing item it becomes**, with a short `id` for grading code to tag against.

### Then, and only then

Add the derived items to `RD.STANDING` with matching `id`s, and tag every grading call with the item it exercises. Add the tag whenever you add a grading rule, or the item silently stops being scored.

---

## Candidate watch list — NOT standing items

Fenced deliberately. Document-derived; they describe what R90 work *is*. **Do not copy any into `STANDING`.**

Drawn from the fully-text portions of the document set (`claude_R90_SOP_Reference.md`, `claude_R90_ZMP_LOA_Reference.md`) and the S3 syllabus (`../ZMP/claude_ZMP_Training_Reference.md`):

**Needing no geometry — the drillable set today:**

- **Scratchpad encoding** (R90 3-10) — the four tables, and especially the rule that **a runway alone means a visual approach to that runway**. The meaning is carried by the approach letter's *absence*, which is exactly the kind of thing that goes wrong quietly.
- **Missed-approach terminations** — `E`/`W`/`V`/`P` and their frequencies, plus the standing exception that **everything goes to 135.875 when Radar East is not open**.
- **The five STAR-gap departure heading bands** (LOA 4.d.2), including the RBA/J41 exception in the MARWI–TIMMO gap and the two flow-dependent rules (OBH/LBF around HOWRY, SLN/PWE/ICT around TIMMO).
- **Arrival delivery altitudes** (LOA 4.b) — 16,000 or 17,000 stacked on a STAR, 11,000 over SUX/MZEEE, and the different non-STAR numbers over East/West versus LNK.
- **The ceiling that changes** — 15,000 over East/West, **10,000 over LNK**. Climbing a departure to the wrong lid is a one-keystroke error.
- **The STAR window as a clock** — 0730–2130 local, Monday through Friday. Outside it, everything is on course.
- **The superseded Radar West frequency** — 120.1 is dead, 135.875 is live, and the old number is still in circulation.
- **The handoff freeze rule** (R90 3-8) — once a handoff is accepted, no heading or altitude change without verbal approval from the receiving controller. The order states it four times, once per arrival category.
- **The seven standing radar-position duties** (R90 2-2), particularly *resolve all potential conflicts prior to transferring radio communication* and *complete data block entries prior to initiating transfer*.

**Blocked on geometry, and worth watching once it exists:**

- Vectoring and sequencing to the final, and whether the setup allows a **stabilized approach** (R90 3-8).
- Whether a vector actually penetrates **RF airspace** — currently uncheckable.
- PACP block discipline between Radar East and Radar West (R90 3-9).
- 3 NM versus the 2.5 NM final-approach reduction, and wake pairs.

**From the S3 syllabus, graded on the terminal side and not the en route side:**

- Approach vectoring; precision and non-precision approaches as separate items; missed approach procedures; sequencing and separation of arrivals *and* departures as two skills; speed restrictions as a technique; **approach clearance terminology (PTAC)**; departure and arrival gates; IAP chart reading including equipment out of service.

Roadmap items 3 and 4 in `CLAUDE.md` were chosen from the first block above precisely because they need no geometry.

---

## Session log

*(Nothing yet. Add newest-first, and mirror each entry into `claude_R90_AI_Practice_Log.md`.)*

| # | Date | Position | Flow | Instructor | Headline |
|---|---|---|---|---|---|
| — | — | — | — | — | *no sessions flown* |
