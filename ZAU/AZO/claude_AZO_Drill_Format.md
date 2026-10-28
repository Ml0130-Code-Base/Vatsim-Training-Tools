# AZO Drill Format

How the AI coach **presents and runs** a Great Lakes Approach (West Wall) drill. Format only: the sector and the traffic change every drill. Adapted from `../C90/claude_C90_Drill_Format.md`, itself adapted from `../../ZMP/R90/claude_R90_Drill_Format.md`; where this file is silent, those apply.

## What this file inherits

AZO is a terminal facility, so most of the format carries over: the scope table, anchoring a position to a named reference, the clock in tens of seconds, the triage question plus one key decision, voicing pilots and other controllers (coordination voiced only as earned), the wrap, and the M98 weather section for flight categories and D-ATIS sources. Fields: KAZO, KBTL, KGRR, KMKG, KBIV, KHLM (`claude_AZO_Reference.md` section 3).

## The frame elements the parent does not have

1. **Two walls, one TRACON.** The West Wall is ZAU's; the East Wall is ZOB's (SOP 2-1, ZOB LOA 3). A drill works a West Wall sector and names the East Wall neighbour it coordinates with. The footprint covers both walls, so *inside the polygon* is not *inside West Wall airspace*.
2. **No configuration.** The Great Lakes order names no runway configuration, and no West Wall field publishes a D-ATIS, so there is nothing to set. The frame has **no flow line**. Do not invent one.
3. **No combining chain.** The order names GRIFFIN the combined position (2-3) and publishes no fold-up order. A closed sector names no owner in this tool. The LOA 7.h pairs (LUMBERTOWN + SHORELINE, WHITECAP + GRIFFIN, BELLS + BRONCO, CAPITOL + REYNOLDS) are a coordination rule, not a chain.
4. **Six sectors, hierarchy by role.** GRIFFIN combined; BRONCO north/south split; BELLS MKG/GRR/AZO split; LUMBERTOWN, WHITECAP and SHORELINE with no hierarchy (2-3).
5. **A 10,000 ceiling.** Delegation is at or below 10,000 (Appendix B legend), corroborated independently by the community FL100 ceiling.
6. **No arrival or departure to fly.** CIFP 261001 codes **no SID and no STAR** at any West Wall field (checked and empty). The player flies **overflights** only, and refuses an arrival or a departure by name.

State the frame in a header line:

> *Sector · frequency · fields it works · who else is open · East Wall neighbour · flight category*

## What the drill is built around

No geometry is needed for any of these:

1. **Altitudes owed between sectors** (`claude_AZO_Reference.md` section 5): AZO arrivals at 7,000 from SHORELINE to BRONCO; GRR arrivals at 9,000 from BELLS/BRONCO to GRIFFIN; the East Wall handoffs at 8,000, 9,000 and 10,000; the 3,000 APREQ into BELLS.
2. **Beacon codes.** The ZAU LOA and the SOP disagree on where the VFR block starts (LOA 7.b versus SOP 3-7). The tool carries both and says so; the drill must too. The player raises a *reminder, not a judgement* when a code falls outside the LOA blocks.
3. **Local rules** (section 9): TRSA services, departure-area avoidance, control for climb, BTL Class D, runway 35 noise APREQ, GRR noise, transfer of control no farther than 12 NM (the near limit is missing in the published text).
4. **Minimums to vector for a visual approach** (section 10).
5. **Overflights** through the footprint: the one thing the player can fly here.

**Do not manufacture conflicts.** The six West Wall boundaries are chart images, and the TRSA is never depicted. Any claim about who owns a piece of sky is unfounded.

## Wrap

- Debrief against the rules above.
- Log it to `claude_AZO_AI_Practice_Log.md`. The in-tool ledger is `ddb.state.entries`.
- `STANDING` is `[]`; a debrief names no standing item.

---

*Cited from vZAU Great Lakes TRACON SOP 7110.65A (eff. 2025-01-09), ZAU-AZO ATCT LOA (eff. 2025-12-21) and vZAU-vZOB AZO ATCT LOA (eff. 2020-12-13) via `claude_AZO_Reference.md`.*
