# C90 Drill Format

How the AI coach **presents and runs** a C90 drill. Format only: the seat, the configuration and the traffic change every drill. Adapted from `../../ZMP/R90/claude_R90_Drill_Format.md`, which was itself adapted from `../../ZMP/M98 Training/claude_M98_Drill_Format.md`; where this file is silent, those apply.

## What this file inherits

C90 is a terminal facility on STARS, like M98 and R90, so most of the format carries over unchanged. Taken as-is from R90 (and through it from M98):

- **The scope table** and its columns (callsign, type, job, position, altitude, scratchpad, coordination, status).
- **Anchoring a position** to a named reference (the landing field, a fix on the approach, the field a departure left), never a bare compass direction.
- **The clock**: move the tape in tens of seconds and narrate the movement.
- **Running the problem**: a triage question plus one key decision, coach live, voice pilots and other controllers, voice coordination only as the student earns it.
- **The wrap**: concrete strengths and a couple of watch-fors, then log it to `claude_C90_AI_Practice_Log.md`.
- **Weather**: flight categories, the METAR/SPECI cadence and the D-ATIS sources in the M98 drill format. The fields are the eight in `claude_C90_Reference.md` section 7.

## The frame elements the parent does not have

This is the short list that matters. M98's frame is *configuration, wind, flight category, seat, towers open*. C90's differs in these ways:

1. **Seventeen positions, in four groups, not a handful.** The seat is one of: O'Hare Finals (Z, W, F, H), O'Hare Feeders (X PLANO, J KUBBS, E OKK, Y FARMM), South Satellite sectors 1 to 4 (S, P, L, U), or Departure and North Satellite (B, M, G, D, A) (C90 2-1). The frame must say which group the seat is in, because the job is different in each. The combining chain folds everything up to **Z** (2-2), so closing a seat sends its airspace to a named neighbour and never sideways at random. The chain in 2-2 was **not checked against the rendered page**, and the vNAS record disagrees on two folds (KUBBS/FARMM, and where South Satellite sector 1 goes): grade nothing on the chain.
2. **Two configurations at once.** O'Hare has one of **West Flow, East Flow, Parallel 22s, 4R Only** (Appendix A), and Midway independently has one of **31R, 4R, 22L, 13L**, which drives how the South Satellite is sectorised (7-1.a). A C90 frame states both. M98 has one configuration; R90 has one flow per tower.
3. **The Final's runway depends on the configuration.** Which Final is responsible for which runway is a table (4-3.b.1), and a drill that names the configuration has named the Finals' jobs. State the Final the student is or is feeding.
4. **No lid that changes.** The footprint is one polygon, surface to FL150, shared by the facility (community source, second tier). Unlike R90 there is no per-position ceiling to state; do not invent one.
5. **Shared published procedures.** ADELL EIGHT is published at four satellites with different runway transitions at each. Name the airport with the procedure, always (root `CLAUDE.md` section 10.1).

State the frame in a header line and keep it visible:

> *Seat · frequency · group · O'Hare configuration · Midway configuration · who else is open · flight category*

## What the drill is built around

Pick **one** spine. Ordered by what is drillable today, with none of the first four needing sector geometry:

1. **Final runway responsibility** (4-3.b.1) for the configuration in force, and what each Final owes the next.
2. **Turn-on altitudes and capture points** for dual, triple and visual approaches (4-4, 4-5, 4-6).
3. **North Satellite entry altitudes** (6-2.c) and the other altitudes the order states.
4. **Published procedures**: fly a STAR or a SID from the carried CIFP ladder, with its published crossings and speeds. The player does this; it grades nothing.
5. *(Blocked on geometry)* Which position owns a piece of sky, Arrival Descent Area shapes, the climb corridor, minimum vectoring altitudes. Do not drill these.

## Do not manufacture conflicts

The tool has **no** sector boundary, no ADA shape and no MVA. Any claim about who owns a piece of sky, or whether a vector enters someone's airspace, is unfounded. Keep drills inside what the order supports. The footprint answers *inside the facility and under the lid* and nothing finer.

## Wrap

- **Debrief** against the duties in 4-3.a and 4-3.b, which are text.
- **Log it** to `claude_C90_AI_Practice_Log.md`. The in-tool ledger is `ddb.state.entries` (the *Bank it* button on the third page).
- No standing item exists, so a debrief names none. `STANDING` is `[]`.

---

*Cited from vZAU C90 TRACON SOP 7110.65C (eff. 2026-03-14) via `claude_C90_Reference.md`. Procedures from CIFP 261001 via `claude_C90_CIFP_Procedures.md`.*
