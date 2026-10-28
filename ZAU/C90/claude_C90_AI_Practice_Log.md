# C90 AI-Assisted Practice Log

**Status, 2026-10-28: empty. No C90 drill has been flown.**

The running record of drills run with the AI coach, mirroring `../../ZMP/R90/claude_R90_AI_Practice_Log.md`.

## The ledger rule

> **One ledger, no second class.**

A drill recorded here and a drill banked from the live player contribute **identically**. No "seeded" or "provisional" tier. **C90 has no `PRIOR` array and no `hist()` today**: the in-tool ledger is `ddb.state.entries`, the free-text debriefs written with *Bank it* on the third page and saved under `c90-drill-deck-v1`. It is empty, and the smoke test asserts it. When this file gains an entry, that entry is also typed into the tool (or a `PRIOR` array is added in the same commit that adds a reader for it), so the two cannot drift.

**A scrapped drill still counts**: it taught what it taught.

## Entry format

Newest first, one section per session.

```
## YYYY-MM-DD — <what was built> + Drill N (<seat>)

**Frame:** seat · frequency · group · O'Hare configuration · Midway configuration ·
who else is open · flight category · what the traffic was

**Drill N — <one-line description>**

- What was built or changed in the tool that session, if anything.
- What the drill actually put in front of the trainee.
- **Strengths shown** — specific, with the callsign and the moment.
- **Watch-fors** — specific, phrased as the thing to do differently.
- **Standing items moved** — the `id`s exercised. None exist yet.
- **Why** — the line from the session notes this reading came from. Quote it.
- **Suggested next reps.**
```

## The frame is different from M98's

M98's frame is *config, wind, flight category, seat, towers open*. C90's differs: **seventeen positions in four groups**; **two configurations at once** (O'Hare and Midway); and the Final's runway follows the configuration (C90 4-3.b.1). See `claude_C90_Drill_Format.md`.

## Before the first entry

1. **A traffic model with ownership** needs the internal sectorisation and the ADA shapes, which are chart images (Appendices C and F). The first drills are procedural: Final runway responsibility, turn-on altitudes and published procedures.
2. **Standing items** come from `claude_C90_OJT_Session_Review.md`, which needs a session. Logging drills against invented items would corrupt the ledger permanently.

---

## Sessions

*(none)*
