# S56 Drill Format

How the AI coach **presents and runs** a Salt Lake City Approach (S56) drill. Format only: the sector, the flow and the traffic change every drill. Adapted from `../../ZMP/R90/claude_R90_Drill_Format.md`, which was adapted from `../../ZMP/M98 Training/claude_M98_Drill_Format.md`; where this file is silent, those apply.

## What this file inherits

S56 is a terminal facility, so the scope table, anchoring a position to a named reference, the clock in tens of seconds, the triage question plus one key decision, voicing pilots and other controllers (coordination only as earned) and the wrap carry over unchanged. The M98 weather section applies for flight categories. Fields: KSLC, KOGD, KPVU, KHIF and the satellites in `claude_S56_Reference.md` ("The eight fields").

## The frame elements the parent does not have

1. **Flow is named by the runways in use at Salt Lake City, and the coach sets weather first.** **North Flow** is SLC using 34L, 34R, 35 and 32; **South Flow** is 16L, 16R, 17 and 14 (S56 SOP 1-3-1). The flow follows from the wind, not from a free pick. Almost every sector procedure branches on it, and the VATGlasses altitude blocks are gated on it.
2. **Nine sectors, three roots.** Lake, Bear and Valley sit directly under Center; Jordan, Stockton and Alpine fold to Lake; Hart, Gunnison and Final fold to Bear. Closing the last sector below a root sends the airspace to Center, never sideways. State the seat and the roots that are open.
3. **Sector character differs.** Lake and Gunnison are primarily departure; Bear is arrival; Hart and Alpine are satellite; Final is final; Jordan is arrival and departure; Stockton feeds downwind; Valley is VFR under the Class B shelf (S56 SOP 3-1 to 3-9).
4. **Gates and areas named, not drawn.** The Antelope, Keyhole, Jepson, Avon and Bird gates, the P2, P3 and P4 areas and the Heber Shelf line appear in the procedures and have no shape in any source. Say the name; do not claim to know where the line is.
5. **Optional satellite towers.** Hill AFB, Ogden, Provo and the SLC tower sit under the seat; the frame says which are open.

State the frame in a header line:

> *Seat · frequency · North or South Flow · roots open · who else is open · flight category*

## What the drill is built around

Pick **one** spine. None of the first four needs geometry:

1. **The flow-dependent altitudes and headings in the sector paragraphs**: Lake's Antelope gate 310 to 340 (North) or 330 to 340 (South) to 10,000; Gunnison's Keyhole gate at 12,000; Hart's Jepson gate 240 to 250 at 9,000; Bear's 11,000 and 210 knots; Final's 30 degree turn at 210 knots or less.
2. **Valley's SVR and BTF clearances** (3-8-2b, 3-8-2c) and the SOP clearance phraseology for BMC, TVY and SVR, which name the exact CIFP procedure.
3. **The SIMUL and stagger rules** at Bear and Jordan (UDUZU, IRRON, HLMET).
4. **Published procedures**: fly a STAR or SID from the carried CIFP 261001 ladder with its crossings and speeds. SLC4 is a vector SID, flown as a straight stand-in line with its coded headings said in words. The player grades nothing.
5. *(Blocked)* NICHOL is not a published fix. Final's South Flow descent line cannot be drilled on a coordinate.

## Do not manufacture conflicts

The nine sector polygons are community data (second tier). They answer *which sector is this point in*; they do not make a gate, a P-area or the shelf line real. Do not claim who owns the sky near a gate.

## Wrap

- Debrief against the sector paragraph the drill rested on, quoted.
- Log it to `claude_S56_AI_Practice_Log.md`. S56 has no in-tool drill ledger; its notes layer (typed notes against sectors and `OPEN_Q` ids) is the intake path.
- `STANDING` is `[]`; a debrief names no standing item.

---

*Cited from S56 TRACON SOP 7110.20C (eff. 2025-11-01) via `claude_S56_Reference.md`; procedures from CIFP 261001 via `claude_S56_CIFP_Procedures.md`; frequencies from `../_shared/claude_ZLC_Positions_Reference.md`.*
