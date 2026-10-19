# IND Drill Format

How the AI coach **presents and runs** a IND drill. Format only - the position, the flow and the traffic change every drill. Adapted from `../../ZMP/R90/claude_R90_Drill_Format.md` (the nearest terminal STARS facility); where this file is silent, that one applies.

## Inherited from the parent

The scope table, the position-anchoring rule, the running narrative, the voicing rules and the wrap are the same as at R90 and M98. **Do not manufacture conflicts**: with no geometry, any claim about who owns a piece of sky is unfounded.

## Frame the drill (before traffic)

- **The student picks the POSITION** - thirteen seats across clearance, ground, two local controllers, two departure, two feeder, two final and two satellite sectors, plus the FedEx ramp when it is open.
- **The coach sets the weather; the flow follows from it.** IND has four configurations (runways 5, 23, 14, 32). The SOP states no wind rule and no choice rule, so the coach picks the configuration the wind favours and says so; the deck ranks configurations by headwind and picks nothing. Runway 14 or 32 forces LC combined.
- **The coach sets who else is open**, and the traffic.

State the frame in a header line and keep it visible:

> *Position - frequency - STARS ID - field - configuration - wind - flight category - who else is open - towers open*

### The frame elements the parent does not have

**1. The ramp flag.** FedEx ramp control is open or closed, and that changes who a departure calls first and what the ATIS says (RAMP OPEN / RAMP CLOSED NOTAM). M98 has no ramp tower.

**2. The LC combine rule.** In a 14 or 32 configuration local control must be combined; in 5 or 23 it splits east and west by runway pair (LCE 5R/23L, LCW 5L/23R).

**3. Satellite protection blocks.** Block EYE and Block 2R2 change which departure headings and approaches are legal. The coach states whether either is active.

**4. The time of day.** Noise abatement (jets 0700-1900 need 2500' before a turn; 1900-0700 have per-runway restrictions) and LUAW (sunset to sunrise only, at named intersections) and the 2200-0600 final intercept rule all change with the clock.

## What the drill is built around

Pick **one** spine. These need no geometry, which matters because no IND boundary is available.

1. **Departure gate, SID, frequency and altitude.** From a direction and a configuration, build the clearance: the SID or the non-SID route, the initial altitude (5000 jet / 3000 prop, 3000 off a non-primary runway), the departure frequency (it differs between 5/23 and 14/32 for DAWNN and OOM), and the TEC rule at or below 13000 to CVG, DAY, HUF and SDF.
2. **Scratchpad encoding.** SID aircraft carry a three-letter code; non-SID aircraft carry a letter plus the altitude in hundreds. The SOP and vNAS agree except for MAREO#.
3. **Departure headings by runway.** Jet and prop headings per runway, with the asterisked entries that need coordination in split operations.
4. **Handoff altitude and ID.** What each gate owes the next sector (climbing 13000; descend-via arrivals) and the ID typed: `C34`, `C33`, `C35`, `G35`, a delta prefix for CVG, SDF, HUF, FWA, CMH, GUS.
5. **Intersection departure distances.** The distance available from each intersection, per runway, and the runway-32 turbojet prohibition above 12,500 lbs.
6. **Satellite release.** The MQJ runway 25 procedure step by step (track, pointout to FNF, FNF blocks 8nm / 3000, release), and the EYE and BAK instructions.
7. **Control for turns and descent on arrivals.** Who controls what on each gate: IND has descent and 30-degree turns from ZID, except GIIBS arrivals off the arrival only at or below 16000.

## Voicing

Written form is spoken form. See `claude_IND_TTS_Voicing.md` and `../_shared/claude_US_Carrier_Callsigns.md`. Voice the full 25 kHz channel from the vNAS column, not the SOP's two-decimal print.

## Not a drill target yet

Vectoring and sequencing to a final, whether a vector penetrates another sector's airspace, PAC-P block discipline and anything that needs a boundary. See the gap analysis.
