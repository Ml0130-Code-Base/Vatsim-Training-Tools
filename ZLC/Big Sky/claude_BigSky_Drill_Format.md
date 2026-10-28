# Big Sky Drill Format

How the AI coach **presents and runs** a Big Sky Approach drill. Format only: the area, the seat, the flow and the traffic change every drill. Adapted from `../S56/claude_S56_Drill_Format.md`, which was adapted from `../../ZMP/R90/claude_R90_Drill_Format.md` and the M98 format; where this file is silent, those apply.

## What this file inherits

The scope table, anchoring a position to a named reference, the clock in tens of seconds, the triage question plus one key decision, voicing pilots and other controllers (coordination only as earned), the wrap, and the M98 weather section. Fields: KBOI and KBZN.

## The frame elements the parent does not have

1. **Two areas that share no airspace boundary.** Boise (southwest Idaho) and Bozeman (southwest Montana) share a radio name, "Big Sky Approach", and a document. A drill works **one area**. The strip generator is held to one area's field. A sector never combines with, hands off to or folds into the other area: when an area's last sector closes its airspace goes **up to Center**, to sector 30 for Boise and sector 8 for Bozeman.
2. **Flow exists at Boise and not at Bozeman.** Boise has **East Flow** (`KBOI 10L/R`) and **West Flow** (`KBOI 28L/R`). Alpine and Sage swap shapes between them over the same total airspace. **Bozeman has no runway gate, so no flow**, and a Bozeman strip carries no runway. Bozeman runway choice is a wind rule at the tower: runway 12 in calm wind, runway 30 when the tailwind exceeds 5 knots (BZN FCT).
3. **Different radar range minima.** 11 NM outside delegated airspace at Boise, 10 NM at Bozeman.
4. **Three sectors in all.** Boise: Sage (G, 119.600) and Alpine (A, 126.900). Sage is the base: it assumes Alpine's responsibilities when combined (BOI SOP 3-3-1c). Bozeman: one sector, Bozeman Radar (118.975), with nothing to combine with. Bozeman's STARS ID is blank in the source.
5. **The tower is part of the frame.** Boise Local, Ground and Clearance (118.100, 121.700, 125.900); Bozeman Local, Ground and Clearance (118.200, 121.800, 124.050). Bozeman tower use of radar is limited.
6. **A published vector departure.** BOI3 is a Vector SID (ARINC 424 route type T). The player flies it as a straight stand-in line from the field with its coded headings said in words.

State the frame in a header line:

> *Area · seat · frequency · flow (Boise only) · who else is open · towers open · flight category*

## What the drill is built around

None of these needs geometry:

1. **Arrival sequencing by flow** (BOI 3-2-1 East, 3-2-2 West): the STAR, the downwind heading (280 East, 100 West), and the altitude. **Blank altitudes are blank in the source; do not fill them from memory.**
2. **Alpine's and Sage's duties** (3-2, 3-3), including the Ellis Corridor routing rule in East Flow.
3. **Bozeman's departures and missed approach** (BZN FCT): initial altitude 16,000; BGSKY, BOBKT, MEADO and HIA SIDs by direction and flow; vectors heading 250 (runway 12) or 290 (runway 30); missed approach heading 250 or 290, maintain 8,000.
4. **Published procedures**: fly a STAR or SID from the CIFP 261001 ladder with its crossings and speeds. The player grades nothing.

## Do not manufacture conflicts

The three sector shapes are community data (second tier). The Ellis Corridor, the pre-arranged coordination areas and the arrival zones are chart images with no shape. Do not claim who owns the sky there.

## Wrap

- Debrief against the paragraph the drill rested on, quoted.
- Log it to `claude_BigSky_AI_Practice_Log.md`. Big Sky has no in-tool drill ledger and no notes layer.
- `STANDING` is `[]`.

---

*Cited from BOI ATCT/TRACON SOP 7110.2B and BZN FCT via `BOI/claude_BOI_Reference.md` and `BZN/claude_BZN_Reference.md`; procedures from CIFP 261001 via `claude_BigSky_CIFP_Procedures.md`.*
