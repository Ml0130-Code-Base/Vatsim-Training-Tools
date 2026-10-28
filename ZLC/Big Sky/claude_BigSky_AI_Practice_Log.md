# Big Sky AI-Assisted Practice Log

**Status, 2026-10-28: empty. No Big Sky drill has been flown.**

The running record of drills run with the AI coach, mirroring `../S56/claude_S56_AI_Practice_Log.md`.

## The ledger rule

> **One ledger, no second class.**

**The Big Sky deck has no drill ledger of its own**: no `PRIOR` array, no `hist()`, no `state.entries`. Its storage (`bigsky-drill-deck-v1`, since issue #45) holds the frame (area, open sectors, seat, flows) and the weather reader's pasted text; saved drills sit under `bigsky-drill-deck-fly-v1`. Neither is a record of what was flown. So this file is the only practice ledger Big Sky has. If a ledger is added, every entry here moves into it in the same commit. **A scrapped drill still counts.**

## Entry format

Newest first, one section per session.

```
## YYYY-MM-DD — <what was built> + Drill N (<area, seat>)

**Frame:** area · seat · frequency · flow (Boise only) · who else is open ·
towers open · flight category · what the traffic was

**Drill N — <one-line description>**

- What was built or changed in the tool that session, if anything.
- What the drill put in front of the trainee.
- **Strengths shown** — specific, with the callsign and the moment.
- **Watch-fors** — the thing to do differently.
- **Standing items moved** — none exist yet.
- **Why** — the line from the session notes. Quote it.
- **Suggested next reps.**
```

## The frame is different from M98's

Two areas with no shared boundary; flow at Boise and none at Bozeman; different range minima. See `claude_BigSky_Drill_Format.md`.

## Before the first entry

Standing items come from `claude_BigSky_OJT_Session_Review.md`, which needs a session. Logging drills against invented items would corrupt the ledger permanently.

---

## Sessions

*(none)*
