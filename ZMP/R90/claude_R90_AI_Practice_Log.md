# R90 AI-Assisted Practice Log

**Status, 2026-09-01: empty. No R90 drill has been flown.**

The running record of drills run with the AI coach, mirroring `../M98 Training/claude_M98_AI_Practice_Log.md`.

## The ledger rule

> **One ledger, no second class.**

A drill recorded here and a drill banked from the live player contribute **identically** to exposures, flags, streak and staleness. No "seeded" or "provisional" tier. In the tool, `rdb.PRIOR` holds drills from this file and `state.entries` holds drills banked in the player; `hist()` concatenates them and everything downstream walks that one list.

Both are currently empty, and the smoke test asserts it.

**A scrapped drill still counts** — it taught what it taught.

## Entry format

Newest first, one section per session.

```
## YYYY-MM-DD — <what was built> + Drill N (<position>)

**Frame:** position · frequency and STARS ID · field · flow · ceiling over that area ·
who else is open · STARs active or off · what the traffic was

**Drill N — <one-line description>**

- What was built or changed in the tool that session, if anything.
- What the drill actually put in front of the trainee.
- **Strengths shown** — specific, with the callsign and the moment.
- **Watch-fors** — specific, phrased as the thing to do differently.
- **Standing items moved** — the `id`s exercised, good or flagged.
- **Why** — the line from the session notes this reading came from. Quote it.
- **Suggested next reps.**
```

Add each entry to `PRIOR` in the Drill Builder block as well, or the notebook will not see it.

## The frame is different from M98's

M98's drill frame is *config · wind · flight category · seat · towers open/closed*, because at a metroplex the runway configuration drives everything. R90's frame has different load-bearing parts:

- **Position**, and therefore which field — the six positions split across three airports.
- **Flow**, north or south, which is wind-driven at both towers and sets the departure headings and the missed approach.
- **The ceiling over that area** — 15,000 over East/West, **10,000 over LNK**. It changes with the position.
- **Whether the STARs are active** — a clock, 0730–2130 local Monday through Friday, not a weather condition. It changes whether departures fly heading bands or go on course.

That last one has no M98 equivalent and it is the single most distinctive thing about running R90.

## Before the first entry

1. **A traffic model** needs the RADAR Final boundary, and every R90 boundary is a picture (`CLAUDE.md` roadmap item 1). The first drills will be procedural: scratchpad-encoded approach clearances (roadmap item 3) and the STAR-gap departure heading bands (item 4), both of which need no geometry.
2. **Standing items** come from `claude_R90_OJT_Session_Review.md`, which needs a session.

Logging drills against invented items would corrupt the ledger permanently.

---

## Sessions

*(none)*
