# CVG Drill Format

How the AI coach **presents and runs** a CVG drill. Format only - the position, the flow and the traffic change every drill. Adapted from `../../ZMP/R90/claude_R90_Drill_Format.md` (the nearest terminal STARS facility); where this file is silent, that one applies.

## Inherited from the parent

The scope table, the position-anchoring rule, the running narrative, the voicing rules and the wrap are the same as at R90 and M98. **Do not manufacture conflicts**: with no geometry, any claim about who owns a piece of sky is unfounded.

## Frame the drill (before traffic)

- **The student picks the POSITION** - one of the seven TRACON radar seats: two arrival, two final, two departure and the satellite sector (the Controller In Charge is vNAS-only and is not a seat).
- **Not offered, assumed open.** Clearance, ramp, ground and tower positions (and the underlying towers) are not a seat and not a "who else is open" choice in the deck. They are assumed open - owner direction, 2026-10-20: these are TRACON decks, and the facility is understood to be a 24-hour operation. **None of the three SOPs states operating hours**, so the 24-hour premise is the owner's, not a cited fact.
- **The coach sets the weather; the flow follows from it.** CVG has eight named configurations. The SOP says North is preferred over South, Northwest is preferred overall, North/South are used "when wind precludes departing 27", and East/West only in "extreme wind". It states no wind figure.
- **The coach sets who else is open**, and the traffic.
- **The flow can be read off the D-ATIS.** The *D-ATIS and the flow* section on the set-up page reads a pasted or fetched broadcast and, when exactly one configuration fits, sets the configuration, wind and category; the plotted routes under *Fly it* follow the configuration. The coach still decides which flow the drill runs - when the broadcast is ambiguous nothing is set and the coach or the trainee chooses.

State the frame in a header line and keep it visible:

> *Position - frequency - STARS ID - field - configuration - wind - flight category - who else is open*

### The frame elements the parent does not have

**1. The configuration is a pair, not a flow.** Northwest is departing 27 and 36R, landing 36L/36C/36R; the SOP's table lists departing and arriving runways separately, and the configurations differ in which runways pair.

**2. The prohibited pairs.** Landing 9 while departing 36R or 18L, and landing 18R while departing 9 or 27, are never legal. A frame that implies one is wrong.

**3. Four ramp towers (assumed open in the deck; combined or split is not a choice there).** Terminal, Taxilane N, DHL and Amazon, each with its own frequency; "ramp open combined" and "ramp open all" are different ATIS NOTAMs.

**4. The controlled activity area.** Runways 9 and 27 have one that must be protected for departures on 9 or landings on 27, and taxiways S, T, M and J are treated as an active runway when it is in effect.

**5. Simultaneous independent approaches.** With or without a Final Monitor, and the widely spaced 18L/R and 36L/R case.

## What the drill is built around

Pick **one** spine. These need no geometry, which matters because no CVG boundary is available.

1. **Departure gate, SID, frequency and runway.** From a direction and a configuration, build the clearance: the RNAV SID or CVG# route, 5000 jet / 4000 prop (TDLS auto-populates 5000; CD must select 4000 for props), BDR 128.70 or WDR 126.65, and the departure runway from the assignment table.
2. **Departure headings by runway,** and the first RNAV fix on each runway (confirmed by CIFP).
3. **Which configurations may run together.** The prohibited pairs, the visual-approach condition for landing 9 with departing 18L, and the 36L/27 ten-mile rule.
4. **NAR/SAR to FAR/VAR hand-off altitudes** by operation and arrival (8000, 7000, 5000, 6000 downwind), and the descend-via exceptions.
5. **Handoff altitude and ID.** Climbing 13000 to CVG 22, LEX 20, PIK 69 and SHB 34; the ID typed (`C22`, `C20`, `C69`, `C34`); delta-prefixed IDs to CMH, IND, LEX and SDF.
6. **Ramp control.** Which ramp tower owns which spots, the inbound-only and outbound-only spot limits by operation, and what GC tells an arrival at each cargo ramp.
7. **Dual simultaneous approaches.** High side not turned onto the LOC below 6000; cross PHILO/FELUB/SNPPR/PUPPT at 6000; transfer of communications no later than 7nm.

## Voicing

Written form is spoken form. See `claude_CVG_TTS_Voicing.md` and `../_shared/claude_US_Carrier_Callsigns.md`. Voice the full 25 kHz channel from the vNAS column, not the SOP's two-decimal print.

## Not a drill target yet

Vectoring and sequencing to a final, whether a vector penetrates another sector's airspace, PAC-P block discipline and anything that needs a boundary. See the gap analysis.
