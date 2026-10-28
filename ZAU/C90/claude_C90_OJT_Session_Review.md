# C90 OJT Session Review — INTAKE TEMPLATE (no sessions yet)

**Status, 2026-10-28: empty on purpose. No C90 OJT session has been flown.**

This file is the C90 counterpart of `../../ZMP/M98 Training/claude_M98_OJT_Session_Review.md`, which reviews M98 sessions 1 to 7 and is where that tool's five standing training items come from. **Nothing equivalent exists for C90, so nothing equivalent may be written here.**

## The rule this file enforces

> **A standing training item is an observed shortfall, not a document-derived guess.**

M98's five items came from watching one controller work one metroplex. Those are facts about M98 sessions, not facts about terminal control, and importing them here would fabricate a training history. `DD.STANDING` is an empty array, the smoke test asserts it is empty, and the tool says so on the page. **Leave it empty until a session is flown.** The published-track player flies strips along their CIFP ladders and grades nothing; it does not create standing items.

What the documents *may* legitimately supply is a **candidate watch list**, fenced at the bottom, and not standing items.

---

## How to fill this in after session 1

### Source self-check

What is verified, what is not, which sessions are covered, whether the notes are contemporaneous, and where confidence is low.

### Status grid — pattern by session

| Pattern | S1 | S2 | S3 | … |
|---|---|---|---|---|
| *(pattern name)* | | | | |

A pattern earns a row when it appears **twice**; a single occurrence is a note.

### One section per pattern

- **What actually happened**, session by session, with the callsign and the moment.
- **The mechanism**, distinguished from superficially similar failures.
- **The citation**: which paragraph of the C90 order, the ZAU LOA or a tower LOA the correct action comes from.
- **Confidence caveat.**
- **The standing item it becomes**, with a short `id` for grading code to tag against.

### Then, and only then

Add the derived items to `DD.STANDING` with matching `id`s, and tag every grading call with the item it exercises. Add the tag whenever you add a grading rule, or the item silently stops being scored. The C90 notes rail (`+ student note` on every panel) exports Markdown addressed to its anchor; it is the intake path, and a note is promoted only once confirmed (root `CLAUDE.md` section 5).

---

## Candidate watch list — NOT standing items

Fenced deliberately. Document-derived; they describe what C90 work *is*. **Do not copy any into `STANDING`.**

Drawn from the text portions of `claude_C90_Reference.md`:

- **Final runway responsibility** (4-3.b.1) for each configuration, and who takes which runway when de-combined.
- **Feeder duties** (4-3.a): a primary runway and subsequent turn-ins coordinated with Final; transfer of communications to another Feeder no later than RRCP 15 once the handoff is complete and conflicts are resolved.
- **Final duties** (4-3.b): no descent into the ADA without diverging or 3 NM lateral separation from ORD departures on tower-assigned headings; 210 knots or less prior to or with the downwind-to-base turn; no PRM approaches when the KORD METAR shows a ceiling below 800 ft or visibility below 2 SM.
- **Turn-on altitudes and capture points** for dual, triple and visual approaches (4-4, 4-5, 4-6).
- **North Satellite entry altitudes** (6-2.c).
- **Scratchpad entries for uncontrolled airports** (2-5.b.2) and the three-character rule (2-6.b).

**Blocked on geometry:** ADA shapes, SSAT delegated airspace by configuration, the ACCRA/UECKR protection areas, minimum vectoring altitudes.

---

## Session log

*(Nothing yet. Add newest-first, and mirror each entry into `claude_C90_AI_Practice_Log.md`.)*

| # | Date | Seat | Configuration | Instructor | Headline |
|---|---|---|---|---|---|
| — | — | — | — | — | *no sessions flown* |
