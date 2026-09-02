# ZMP Drill Format

How the AI coach **presents and runs** an en route drill. This is format only — the sector, the stratum and the traffic change every drill, so nothing here is tied to a specific seat. Adapted from `../M98 Training/claude_M98_Drill_Format.md`; where this file is silent, that one applies.

**The thing to internalise: this is not the M98 format with the gates removed.** A terminal drill is built around a runway and a sequence to it. An en route drill is built around a **boundary** — the aircraft arrives at one edge of the sector and must leave at another, at the altitude and on the route an agreement requires. Everything in between is the problem.

## Frame the drill (before traffic)

**Who sets what:**

- **The student picks the SECTOR** they work — and therefore the stratum, the scope setup and the neighbours. That is the student's choice.
- **The coach sets who else is open**, which in ZMP means both *adjacent ZMP sectors* and *underlying approach controls*. Whether RST is open changes what Sector 07 does with a Rochester arrival; whether M98 is open changes everything about Area 2 and Area 3.
- **The coach sets the traffic and the flow context.**

State the frame in a header line and keep it visible:

> *Sector · Area · stratum · frequency · scope range and altitude filter · who else is open around you · underlying approach controls open or closed*

Example shape (not a real drill):

> **Sector 07 · Area 3 · low (`000B242`) · 132.35 · scope 60–75 NM, filter surface–FL230+1,200**
> **Open around you:** Sector 17 above, Sector 08 and 09 either side, Sector 11 combined for the rest of the centre.
> **Underlying:** M98 open. RST **closed** — its airspace is yours.

### Weather is background, not the driver

This is the sharpest divergence from M98. There, config follows weather and weather *is* the frame. Here, weather matters as **deviations, turbulence, CWAs and flow control** — reasons an aircraft cannot fly the route it was given — not as a thing that reconfigures the sector. A ZMP drill does not have a "configuration".

What replaces it as the frame's variable half is **flow**: miles-in-trail into M98, metering, ground stops, and whether the STARs at the underlying TRACON are on. Those change what the sector must deliver.

The flight-category table, the METAR/SPECI cadence and the live-weather sources in the M98 drill format still apply when weather is part of a drill — reuse them rather than restating them.

## The scope table

Same principle as M98: present traffic as a table and **maintain it**. Columns adapted for en route:

| Callsign | Type | Job (dest + route) | Position | Altitude | Cleared to | Coordination | Status / owe next |

- **Job** — destination and the route through the sector, because en route work is route work.
- **Position** — distance and bearing **from a named reference**: a fix, a navaid, or a sector boundary. Never a bare compass direction.
- **Altitude** — current, and whether climbing, descending or level. Add the interim or procedural altitude in the data block if one is set, because that is a graded object.
- **Cleared to** — the altitude and route actually issued, which is often not the filed one.
- **Coordination** — handoff, point-out, AIT, Data Block Coordination, or none.
- **Status / owe next** — what has been issued and what the student still owes.

Add a **"not yours — coordinate only"** line for traffic in an adjacent sector that constrains the student.

## Positions — anchor to a fix, not to a field

M98 anchors positions to the landing field because that is the task. En route, anchor to **the fix or navaid the aircraft is navigating to**, or to the **sector boundary it is approaching**, because those are what the decisions turn on. "Twenty-two miles southeast of GEP, level one two thousand" is useful; "twenty-two southeast" is not.

For an aircraft on a STAR, **"just crossed / about to cross [fix]"** is cleanest, exactly as at M98.

## The clock matters differently

En route sweeps are slow and the sector is large. A problem is visible for **minutes** before it becomes one, and the work is planned three to eight minutes ahead rather than sixty to a hundred and eighty seconds. When advancing the tape, move it in **minutes**, and narrate the movement — where the aircraft was, where it is, what is imminent — rather than issuing a fresh static snapshot.

This also means the drill should not manufacture urgency. If the coach has to compress time to create pressure, the drill has stopped being an en route drill.

## What the drill is built around

Pick **one** of these as the drill's spine. They are the things ZMP actually gets graded on:

1. **A boundary delivery.** An aircraft must cross into an adjacent facility at the altitude and on the route the LOA requires. The reference tables are in `claude_ZMP_Enroute_LOA_Reference.md` and `claude_ZMP_TRACON_Interface_Reference.md`.
2. **A descend-via into M98**, with the procedural altitude entered correctly (7200.1O 3.8.D — the KKILR-equals-100 case).
3. **An AIT or Data Block Coordination decision** — do the conditions hold or not? Five conditions for DBC, and AIT explicitly does not apply to point-outs.
4. **An interim altitude question** — is this one of the six waiver pairs, or must the interim stay in the block?
5. **A separation question in a single-site area** — 3 miles or 5, and what happens when the single-site data goes bad.
6. **Holding**, with a complete clearance and an EFC.
7. **A part-time facility closing**, and the airspace reverting to the sector.

## Running the problem

- Open with a **triage** question — the first three moves — plus the **one key decision** the drill is built around.
- Coach live: affirm good calls specifically, flag the ones needing follow-up **as questions**, let the student drive.
- Voice **pilots** and **other controllers**. On coordination, voice only what has been earned: the receiver's *"go ahead"* until the student states the actual request, and the approval only **after** the ask lands. This was the recurring miss in M98 drill 9 and it is national, not facility-specific — see `../M98 Training/claude_M98_Coordination_Reference.md`.
- **Do not manufacture conflicts.** Check the actual geometry before calling one — and at ZMP, remember the tool does not *have* the geometry yet. A conflict asserted from nothing is the standing failure mode.

## Wrap

- **Debrief** — a few concrete strengths, a couple of watch-fors.
- **Use Appendix 01 as the debrief spine.** The position relief briefing's item 10 — non-radar, point-outs, holding, primary targets with no data block, aircraft in restricted airspace, released but not airborne, handed off but still in the sector, VFR advisory — is the closest thing the order has to a published scan. Walking it at the end of a drill asks the student to account for the whole picture, not just the aircraft they were talking to.
- **Log it** to `claude_ZMP_AI_Practice_Log.md`, and add it to `PRIOR`.

---

*Procedures cited from ZMP Order 7200.1O CHG 2 (eff. 2024-11-15) via `claude_ZMP_SOP_Reference.md`. Coordination phraseology from 7110.65 Ch 5 Sec 4, which is national. Weather definitions and live sources: reuse `../M98 Training/claude_M98_Drill_Format.md`.*
