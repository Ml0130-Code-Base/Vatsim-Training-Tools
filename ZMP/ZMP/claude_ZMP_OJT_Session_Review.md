# ZMP OJT Session Review — INTAKE TEMPLATE (no sessions yet)

**Status, 2026-09-01: empty on purpose. No ZMP OJT session has been flown.**

This file is the ZMP counterpart of `../M98 Training/claude_M98_OJT_Session_Review.md`, which reviews M98 sessions 1–7 and is where that tool's five standing training items come from. The M98 review exists because seven real sessions happened and the same failures kept appearing. **Nothing equivalent exists for ZMP, so nothing equivalent may be written here.**

## The rule this file enforces

> **A standing training item is an observed shortfall, not a document-derived guess.**

It is tempting — and wrong — to seed `STANDING` from the SOP by reasoning "AIT has five conditions, therefore the trainee will get AIT wrong." That produces a list of *hard things*, not a list of *this controller's* things, and the whole value of the M98 notebook is that it tracks the second. `ZD.STANDING` is an empty array, the smoke test asserts it is empty, and the tool says so on the notes page. **Leave it empty until a session is flown.**

What the documents *may* legitimately supply is a **candidate watch list** — things worth paying attention to during the first session so that observations get recorded rather than lost. Those are at the bottom of this file, clearly fenced, and they are **not** standing items.

---

## How to fill this in after session 1

Follow the M98 review's shape, because it works:

### Source self-check

Open with what is verified and what is not — which sessions are covered, whether the notes are contemporaneous or reconstructed, and where confidence is low. The M98 review does this and it is the reason its conclusions are trustable.

### Status grid — pattern by session

| Pattern | S1 | S2 | S3 | … |
|---|---|---|---|---|
| *(pattern name)* | | | | |

One row per repeating pattern, one column per session, so escalation and resolution are visible at a glance. A pattern earns a row when it appears **twice**; a single occurrence is a note, not a pattern.

### One section per pattern

For each, in the M98 style:

- **What actually happened**, session by session, with the callsign and the moment.
- **The mechanism** — *why* it happened. M98's review separates "scan discipline" from "tunnel vision" precisely because they are different mechanisms with different fixes, and that distinction is what made the items coachable.
- **The citation** — which paragraph of which order the correct action comes from.
- **Confidence caveat** — say plainly where the note is thin.
- **The standing item it becomes**, with a short `id` that grading code can tag against.

### Then, and only then

Add the derived items to `ZD.STANDING` with matching `id`s, and start tagging grading calls with them. In the M98 engine every grading `log()` call carries a third argument naming the standing item it exercises, and `STANDING` entries carry matching `id`s — **add the tag whenever you add a grading rule, or the item silently stops being scored.** Same contract here.

---

## Candidate watch list — NOT standing items

Fenced deliberately. These are document-derived, they describe what ZMP work *is*, and they exist so that the first session's observations have somewhere to land. **Do not copy any of these into `STANDING`.** If one of them turns out to be a real, repeated shortfall, it earns a section above on the strength of what was observed — not on the strength of being listed here.

Drawn from the procedures with hard, checkable conditions (`claude_ZMP_SOP_Reference.md` Chapter 3) and from the graded elements of the C1 syllabus (`claude_ZMP_Training_Reference.md`):

- **The ERAM scope setup itself** — range and altitude filter with the 1,200 / 2,200 ft buffer (7200.1O 3.2). It is the first thing done on position and the easiest to get silently wrong.
- **Interim altitude discipline** — the waiver is six sector pairs and nothing else (7200.1O 3.3), and outside them the receiver must not strip an interim until communications are established *and* a new altitude is issued.
- **Data Block Coordination conditions** — 5 minutes, 3 minutes, valid Mode C, never for departures inside 5 minutes (7200.1O 3.8). Five conditions that must all hold.
- **The procedural altitude on a descend-via into M98** (7200.1O 3.8.D) — the KKILR-equals-100 case.
- **AIT misuse on point-outs** — AIT explicitly does not apply to them (7200.1O 3.7.A.5), and VATCAN sectors cannot accept it at all.
- **Reverting to 5 miles** when single-site data goes bad (7200.1O 3.6.1.c), and not using 3 miles outside the Appendix 02 areas at all.
- **Full route clearance after any route change** (7200.1O 3.5).
- **Inter-facility coordination (ARTCC to ARTCC)** — graded in every C1 lesson and absent from the terminal syllabus entirely.
- **En route holding** with a complete clearance and an EFC — likewise graded in every C1 lesson.
- **IFR clearances from uncontrolled fields** — void times, EDCTs, the one-in-one-out rule. No terminal analogue.
- **Weather, NOTAMs and TMU** — CWAs, deviation handling, gate holds and ground stops.
- **Military and special-use airspace.**

The first three are the roadmap's first grading target because they are deterministic and need no geometry (`CLAUDE.md`, Roadmap item 3).

---

## Session log

*(Nothing yet. Add newest-first, and mirror each entry into `claude_ZMP_AI_Practice_Log.md`.)*

| # | Date | Seat | Instructor | Headline |
|---|---|---|---|---|
| — | — | — | — | *no sessions flown* |
