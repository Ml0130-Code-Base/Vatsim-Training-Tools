# ZMP AI-Assisted Practice Log

**Status, 2026-09-01: empty. No ZMP drill has been flown.**

The running record of drills run with the AI coach, mirroring `../M98 Training/claude_M98_AI_Practice_Log.md`. That file carries M98 drills 5 through 9 and is one half of the M98 tool's ledger; the other half is drills banked in the tool itself.

## The ledger rule

> **One ledger, no second class.**

A drill recorded here and a drill banked from the live player contribute **identically** to exposures, flags, streak and staleness. There is no "seeded" or "provisional" tier and none may be reintroduced. In the tool, `zdb.PRIOR` holds drills from this file and `state.entries` holds drills banked in the player; `hist()` concatenates them and everything downstream walks that one list.

Both are currently empty, and the smoke test asserts it.

**A scrapped drill still counts.** The M98 log carries drill 10 (scrapped on saturation) and 10R (paused mid-tape) as real reps, because they taught what they taught. Same here.

## Entry format

Newest first. One section per session, headed with the date.

```
## YYYY-MM-DD — <what was built> + Drill N (<seat>)

**Frame:** sector · stratum · scope range and filter · who else is open · what the traffic was

**Drill N — <one-line description>**

- What was built or changed in the tool that session, if anything.
- What the drill actually put in front of the trainee.
- **Strengths shown** — specific, with the callsign and the moment.
- **Watch-fors** — specific, and phrased as the thing to do differently.
- **Standing items moved** — the `id`s this drill exercised, and whether each
  came out good or flagged. These are what `itemStats` tallies.
- **Why** — the line from the session notes that this reading came from.
  Quote it. The M98 log's `why` lines are what make its entries auditable
  eighteen months later.
- **Suggested next reps.**
```

The `PRIOR` array in the Drill Builder block mirrors these entries: each carries the standing items it moved and a `why` line quoting the note the reading came from. When a drill is added here, add it to `PRIOR` too, or the notebook will not see it.

## Before the first entry

Two things have to exist first, and neither does yet:

1. **A traffic model.** `CLAUDE.md` roadmap item 2 — and item 1, sector boundaries, blocks it. The first drills will therefore be procedural rather than flown: AIT and Data Block Coordination condition-checking (roadmap item 3), which needs no geometry.
2. **Standing items**, which come from `claude_ZMP_OJT_Session_Review.md`, which needs a session. Until then a drill can be logged but it cannot be scored against items, because there are none.

That ordering is deliberate. Logging drills against invented items would corrupt the ledger permanently — the tallies would carry weight they never earned.

---

## Sessions

*(none)*
