# IND AI-Assisted Practice Log

**Status, 2026-10-19: empty. No IND drill has been flown.**

The running record of drills run with the AI coach, mirroring `../../ZMP/R90/claude_R90_AI_Practice_Log.md`.

## The ledger rule

> **One ledger, no second class.**

A drill recorded here and a drill banked from the deck contribute **identically** to exposures, flags, streak and staleness. No seeded or provisional tier. In the tool, `indb.PRIOR` holds drills from this file and the practice-log entries the page banks sit in `state.entries`; `hist()` concatenates them. Both are empty, and the smoke test asserts it. **A scrapped drill still counts.**

## Entry format

Newest first, one section per session.

```
## YYYY-MM-DD - <what was built> + Drill N (<position>)

**Frame:** position - frequency and STARS ID - field - configuration - wind - flight category - who else is open

**Drill N - <one-line description>**

- What was built or changed in the tool that session, if anything.
- What the drill put in front of the trainee.
- **Strengths shown** - specific, with the callsign and the moment.
- **Watch-fors** - phrased as the thing to do differently.
- **Standing items moved** - the ids exercised.
- **Why** - the line from the session notes. Quote it.
- **Suggested next reps.**
```

Add each entry to `PRIOR` in the builder block as well, or the notebook will not see it.

## Entries

*None yet.*
