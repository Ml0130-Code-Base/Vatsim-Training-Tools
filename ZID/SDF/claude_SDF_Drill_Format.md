# SDF Drill Format

How the AI coach **presents and runs** a SDF drill. Format only - the position, the flow and the traffic change every drill. Adapted from `../../ZMP/R90/claude_R90_Drill_Format.md` (the nearest terminal STARS facility); where this file is silent, that one applies.

## Inherited from the parent

The scope table, the position-anchoring rule, the running narrative, the voicing rules and the wrap are the same as at R90 and M98. **Do not manufacture conflicts**: with no geometry, any claim about who owns a piece of sky is unfounded.

## Frame the drill (before traffic)

- **The student picks the POSITION** - twelve seats across clearance, UPS ramp, two ground, two local, two arrival, two departure and two final sectors; Bowman Local sits inside the airspace as a vNAS-only tower.
- **The coach sets the weather; the flow follows from it.** SDF has three flows (north 35, south 17, west 29). The SOP states no wind rule. In a west flow AR1/AR2 do not exist and only DR1, DR2, FR1 and FR2 may be opened; FR cannot be split when landing 29.
- **The coach sets who else is open**, and the traffic.

State the frame in a header line and keep it visible:

> *Position - frequency - STARS ID - field - configuration - wind - flight category - who else is open - towers open*

### The frame elements the parent does not have

**1. High side and low side.** In parallel flows the left runway (17L, 35L) is the high side and sets the sequence; the low side hits the gaps. Vectoring altitudes onto the final differ: high side at or above 4000, low side at or below 3000.

**2. Whether DR is split.** All SIDs publish 132.07 (DR1); GTGON, HIDEY, LLIZY and RDHSE must be given 123.67 (DR2) by hand when DR is split.

**3. The ramp flag.** UPS ramp control open or closed.

**4. Bowman.** DR1 is the primary sequence for traffic landing LOU and controls the LOU ATCT when it is not independently opened; aircraft crossing Bowman's Class D/E airspace maintain 3500 or higher.

**5. The shared departure corridor.** When both DR sectors are open the SDC is co-owned, and everything except HIDEY, LOKRD, RDHSE and SPILR departures must be coordinated before entering it.

## What the drill is built around

Pick **one** spine. These need no geometry, which matters because no SDF boundary is available.

1. **Departure gate, SID and frequency.** From a direction, build the clearance: the RNAV SID or the non-SID route, climb via SID or 5000 / 3000, and the departure frequency (DR1 or DR2, with the hand-assignment when DR is split).
2. **Departure headings by flow and runway.** Three tables: north, south and west, with the high-side and low-side differences and the radio-controlled release rule.
3. **The initial waypoint in the takeoff clearance.** "RNAV to DROPA, Runway 17L, cleared for takeoff" - six waypoints by runway and SID group, independently confirmed by CIFP.
4. **Flowed arrivals.** Altitudes (6000 or 7000 from the west, 8000 or 9000 from the east), the 15nm and 210 KIAS rules, the automated pointout to DR1 and DR2, and the 5000 restriction on departures.
5. **Handoff altitude and ID.** Climbing 13000 to ABB 18, EWO 19, LOZ 21 and EVV 17, with "may clear no further than" fixes and control-for-turns altitudes; the ID typed (`C18`, `C19`, `C21`, `C17`).
6. **Parallel-runway visual approaches.** The 30-degree intercept inside 5nm of a parallel, 4000 high / 3000 low turn-on altitudes, and the FR pass-through (flash the track to the other FR without accepting).
7. **POFZ and weather minima.** Hold short of the POFZ below 800 and 2; go around if it cannot clear before the arrival is 2nm out.

## Voicing

Written form is spoken form. See `claude_SDF_TTS_Voicing.md` and `../_shared/claude_US_Carrier_Callsigns.md`. Voice the full 25 kHz channel from the vNAS column, not the SOP's two-decimal print.

## Not a drill target yet

Vectoring and sequencing to a final, whether a vector penetrates another sector's airspace, PAC-P block discipline and anything that needs a boundary. See the gap analysis.
