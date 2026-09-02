# R90 Drill Format

How the AI coach **presents and runs** an R90 drill. Format only — the position, the flow and the traffic change every drill. Adapted from `../M98 Training/claude_M98_Drill_Format.md`; where this file is silent, that one applies.

R90 and M98 are both terminal facilities, so far more of the M98 format carries over here than to `../ZMP/`. The scope table, the position-anchoring rule, the running narrative, the voicing rules and the wrap are all the same. **What differs is the frame.**

## Frame the drill (before traffic)

**Who sets what:**

- **The student picks the POSITION** — and therefore the field, the ceiling over it, and which departure and missed-approach set applies. Six positions across three airports.
- **The coach sets the weather; the flow *follows from it*.** Same principle as M98 — the flow is wind-driven, not a free pick. **OMA:** winds under 5 kt prefer the north profile; 5 kt or more, the profile most closely aligned with the wind (OMA 7110.4A 5.c.2). **LNK:** calm prefers the north configuration; 6 kt or more, most closely aligned (LNK 7110.6A 6.a.3).
- **The coach sets whether the STARs are active** — see below. This is not weather.
- **The coach sets who else is open** and the traffic.

State the frame in a header line and keep it visible:

> *Position · frequency · STARS ID · field · flow · ceiling over this area · STARs active or off · who else is open*

Example shape (not a real drill):

> **Radar West · 135.875 · STARS `W` · OMA · north flow · ceiling 15,000 · STARs ACTIVE**
> **Open around you:** Radar East, Radar Final. Radar Offutt and both Lincoln positions closed.
> **Towers:** OMA open. ZMP sectors 26/27 above you.

### The two frame elements M98 does not have

**1. The ceiling changes with the position.** R90 owns **at and below 15,000** over East and West, and **at and below 10,000** over LNK (ZMP–R90 LOA 3). Move the student from Radar West to Radar Lincoln and the lid drops 5,000 feet. M98 has nothing like this — its vertical structure is shelves, not a lid that steps. **Always state it in the frame**, because climbing a departure to the wrong lid is a one-keystroke error and the drill should make it possible to commit.

**2. The STARs are on a clock, not a condition.** **0730–2130 local, Monday through Friday**, all aircraft at or above 16,000 landing OMA or OFF must be assigned a STAR (LOA 4.b.2.a). Outside that window the STARs are off and **all R90 aircraft must be on course** (4.d.6).

This flips the departure problem entirely. STARs active means departures above 15,000 fly the **heading bands between the arrivals**; STARs off means they go on course. A drill that does not state which is in effect has not been framed.

The coach may move the clock mid-drill the way the M98 coach drops a SPECI — 2130 passing is a real, scheduled change in how the sector works.

### Weather still does the M98 job too

Flight categories, the METAR/SPECI cadence and the live-weather sources in the M98 drill format all apply — visual approaches and visual separation come and go with the category exactly as they do at M98. Reuse that section rather than restating it. The relevant fields are **KOMA, KOFF, KLNK, KCBF, KMLE**.

## The scope table

Same columns as M98, with the terminal job spelled out:

| Callsign | Type | Job (arr/dep + runway, or route) | Position | Altitude | Scratchpad | Coordination | Status / owe next |

**The scratchpad column is R90-specific and it matters.** The scratchpad *is* the intent — approach, runway, termination — and an automated point-out is invalid if it is wrong (R90 3-7). Track it the way the M98 table tracks the strip.

Remember the encoding rule with no M98 analogue: **a runway alone in the scratchpad means a visual approach to that runway.** The meaning is carried by the approach letter's *absence*.

## What the drill is built around

Pick **one** spine. These are ordered by what is actually drillable today — the first three need no geometry, which matters because every R90 boundary is currently a picture.

1. **Scratchpad construction.** Build the entry for a given approach, runway and termination; or read one back. The four tables (R90 3-10) are complete text and unambiguous.
2. **The departure heading bands.** Five ranges defined by the gaps between the STARs, with the RBA/J41 exception in the MARWI–TIMMO gap and the two flow-dependent rules (OBH/LBF around HOWRY, SLN/PWE/ICT around TIMMO). Needs the flow and the STAR clock, nothing else.
3. **Arrival delivery altitudes.** What ZMP owes, and whether what arrived is legal — 16,000 or 17,000 stacked on a STAR, 11,000 over SUX/MZEEE, different numbers again for non-STAR arrivals over East/West versus LNK. Includes the teeth: **accepting a handoff of an aircraft in level flight is approval of an inappropriate altitude for direction of flight.**
4. **The handoff freeze.** Once a handoff is accepted, no heading or altitude change without verbal approval from the receiver (R90 3-8, stated four times).
5. **The missed approach.** Tower instruction versus R90 scratchpad termination, including *everything goes to 135.875 when Radar East is not open*.
6. *(Blocked on geometry)* Vectoring and sequencing to a stabilized approach; whether a vector penetrates RF airspace; PACP block discipline.

## Positions — anchor to the field or the final

Same rule as M98: distance and bearing **from a named reference**. For an arrival being worked, use the landing field or a fix on the approach. For a departure, the field it left. Never a bare compass direction.

## The clock

Terminal sweeps are fast and the work is planned 60–180 seconds ahead. Move the tape in **tens of seconds**, not minutes, and narrate the movement rather than issuing a fresh static snapshot — where the aircraft was, where it is, what is imminent.

## Running the problem

- Open with a **triage** question plus the **one key decision** the drill is built around.
- Coach live: affirm good calls specifically, flag follow-ups **as questions**, let the student drive.
- Voice pilots and other controllers. On coordination, voice only what has been earned — the receiver's *"go ahead"* until the student states the actual request, approval only **after** the ask lands.
- **Do not manufacture conflicts.** At R90 this needs saying twice: the tool has **no** sector geometry, so any claim about who owns a piece of sky, or whether a vector clips someone's airspace, is currently unfounded. Keep drills inside what the documents support until boundaries arrive.

## Wrap

- **Debrief** — concrete strengths, a couple of watch-fors.
- **Use R90 2-2 as the debrief spine** — the seven standing radar-position duties, especially *resolve all potential conflicts prior to transferring radio communication* and *complete data block entries prior to initiating transfer*. Appendix B's relief checklist is the longer version.
- **Log it** to `claude_R90_AI_Practice_Log.md`, and add it to `PRIOR`.

---

*Procedures cited from R90 Order 7220.10B CHG 2 (eff. 2024-10-27), the ZMP–R90 LOA (eff. 2023-11-06), OMA ATCT 7110.4A CHG 1 and LNK ATCT 7110.6A, via `claude_R90_SOP_Reference.md` and `claude_R90_ZMP_LOA_Reference.md`. Coordination phraseology from 7110.65 Ch 5 Sec 4. Weather definitions and live sources: reuse `../M98 Training/claude_M98_Drill_Format.md`.*
