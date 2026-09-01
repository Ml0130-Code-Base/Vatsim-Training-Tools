# M98 Coordination Reference — 7110.65 Ch 5 Sec 4

Basis: **FAA JO 7110.65, Chapter 5, Section 4 — Transfer of Radar Identification.** How an aircraft (or just its radar ID) moves between positions. The distinction that matters most in the satellite / combined seat is **handoff vs point-out** — getting this right is the difference between keeping an airplane and giving it away.

## Handoff vs point-out (5-4-2)

- **Handoff** — transfer radar identification **AND** radio communications. The aircraft **enters the receiving controller's airspace** and starts talking to them. You give the airplane away.
- **Point-out** — transfer radar identification, **communications NOT transferred.** You **keep the aircraft** on your frequency and retain control; the other controller only approves it entering / using their airspace.
  - *This is what "coordinate with R to climb N77CM to 8,000 and keep him" was — a point-out, not a handoff.*

## How a coordination call actually flows (the sequence to drill)

1. **Open** — receiver first, then you, then the type: *"R, E, point-out"* · *"Sector 5, M98 E, information."*
2. **Receiver acknowledges** — *"E, go ahead."* They're listening; **nothing has been approved yet.**
3. **State the full content — who + where + altitude + *what you want*:** the aircraft, a position the receiver can find on their scope, its altitude/heading, and **the actual request** (transit my airspace, climb through, take the handoff, or just advising).
4. **Receiver responds to the request** — *"point out approved"* · *"radar contact"* · *"roger"* · or *"unable (…)."*

**The trap (learned live in Drill 9):** there is **no approval until step 3 lands.** Handing the receiver the aircraft and its position (who + where) is *not* a request — until you say **what you want done**, the only correct response is *"go ahead."* Don't let the call close before the ask is stated.

## Handoff — who does what (5-4-5 / 5-4-6)

- **Transferring controller:** complete the handoff before the aircraft enters the receiving airspace; get verbal approval before changing its path/altitude/speed/data block once initiated; relay pertinent info (heading, speed, altitude, restrictions, beacon if different); resolve conflicts/airspace violations before the comm transfer; issue any restrictions the receiver needs.
- **Receiving controller:** verify the target matches the description **before accepting**; issue any restrictions before accepting; comply with the transferring controller's restrictions unless re-coordinated.

## Point-out — who does what (5-4-7)

- **Initiating controller (keeps the aircraft):** get the receiving controller's approval **before** the aircraft enters their airspace; get approval before changing path/altitude/speed/data block after approval; comply with their restrictions; **remain responsible** for the aircraft — communications, subsequent handoffs, flight data, and coordination.
- **Receiving controller:** verify the target; **maintain separation** between the point-out aircraft and their own traffic; issue restrictions as needed. Approves with **"POINT OUT APPROVED."**

## Phraseology (5-4-3)

- **Initiate:** "HANDOFF / POINT-OUT / TRAFFIC, (aircraft position), (aircraft ID or discrete beacon code), (altitude, restrictions, other pertinent info)."
- **Receiver:** "(ID) RADAR CONTACT" (handoff) · "(ID) POINT OUT APPROVED" (point-out) · "TRAFFIC OBSERVED" · or "UNABLE (…)."

## AIT & prearranged coordination

- **Automated Information Transfer — AIT (5-4-8):** transfer radar ID / altitude / 4th-line control **without verbal coordination** — during a radar handoff, via full data blocks, per a facility AIT directive / LOA. (At M98, the automated handoff acceptance.)
- **Prearranged coordination (5-4-9):** an aircraft under one controller's control may enter another's airspace **only** where the procedures are **published in a facility directive** (per FAA Order JO 7210.3). *"Under no circumstances may one controller permit an aircraft to enter another's airspace without proper coordination."*

## Real M98 coordination examples (from the SOP & LOAs)

**Handoff — MSP → M98 Departure (go-around, MSP-M98 LOA 7.h.4):**
> (CC) "R, CC, Handoff." — (R) "R" — (CC) "One mile west MSP, DAL123, go-around, heading 260 climbing to 6,000." — (R) "DAL123, Radar Contact. FQ" — (CC) "OE"

**Handoff — MSP → M98 Satellite (go-around, same para):**
> (CC) "G, CC, Handoff." — (G) "G" — (CC) "One mile north MSP, DAL123, go-around, heading 040 climbing to 4,000." — (G) "DAL123, Radar Contact. MA" — (CC) "JB"

Format: **(receiver letter), (caller), "Handoff"** → receiver acks with their letter → caller gives **position, callsign, heading, altitude** → receiver **"(callsign) Radar Contact" + operating initials** → caller **operating initials.**

**Info / advisory — MSP → Satellite (MSP-M98 LOA 8.e):**
> (CC) "G, CC, Info." — (G) "G." — (CC) "DAL123 Heavy departing 12R in about 5 minutes unable to make the climb gradient." — (G) "Roger, JR." — (CC) "OX."

**Crossover handoff (M98 SOP 4-5c):**
> A KKILR arrival going to Runway 30L is handed off to the **'S' Controller at 9,000' and heading 220°** — heading aimed at the 25-mile ring to stay clear of the OPD traffic in the ACDA.

**Runway-crossing coordination — abbreviated (MSP tower order 2-5-1):**
> GC: "Cross Runway 30L at Charlie with the Airbus." — LC: "Cross Runway 30L at Charlie."
> Abbreviated intra-facility format (7110.65 Ch 2): caller/receiver position and operating initials omitted between GC/LC.

**Takeaways for the satellite / combined seat:**
- Lead with the **receiver's position letter**, then your own, then the action ("Handoff" / "Info" / "Point Out").
- Give **position + callsign + the relevant control info** (heading / altitude / restrictions).
- Close with **operating initials** both ways (the abbreviated intra-facility format may omit them, e.g., GC↔LC runway crossings).

## M98 mapping

- Climb a satellite departure to your ceiling, then get the rest of the climb through the overlying position **while keeping the aircraft** = **point-out** (E point-out to R to climb N77CM through R's airspace; R answers "point out approved").
- Give the aircraft to the next sector with a comms switch = **handoff** (N77CM to ZMP at the boundary).
- **P-ACP** ("look and go," M98 SOP 3-2) and **APO** (SOP 3-3) are M98's published **prearranged coordination** under 5-4-9 — no verbal coordination needed within the published conditions.

## M98 positions (SOP 2-1) — who you coordinate with

| Position | ID | Freq |
|---|---|---|
| North Departure | D | 125.750 |
| South Departure | R | 124.700 |
| East Departure | L | 132.975 |
| North Feeder | I | 126.350 |
| South Feeder | H | 135.475 |
| North Final/Arrival | N | 119.300 |
| South Final/Arrival | S | 126.950 |
| 17/35 West Final/Arrival | J | 118.725 |
| Flying Cloud Satellite | E | 134.700 |
| St. Paul Satellite | G | 121.200 |
| Crystal Satellite | K | 126.500 |

**Combining (SOP 2-1 NOTE 2):** everything collapses to **H** (South Feeder); splits open in the order **H → R → N → S** (R = combined Departure, N = combined MSP Final, S = South Final; **E** = combined Satellite). The base radar position is **H**.

## Control for turns — what a receiver may do without asking (recovered from the sources)

- **Inside M98 (SOP 3-1):** after an accepted handoff, a receiving controller in communication may turn the aircraft **up to 30° from the assigned heading within the previous controller's airspace**, provided it stays in that airspace. No call required.
- **ZMP → M98 (ZMP-M98 LOA 4.b):** within **10 NM of the boundary**, ZMP has released **descent and turns ±30°** — but M98 owns any resulting **point-outs to affected ZMP sectors or RST approach**.
- **M98 ↔ RST (RST LOA 4.c):** on transfer of control, the receiving facility may alter course **up to 30° either side of track**; RST may additionally descend/turn Owatonna arrivals.

The drill habit: before keying a coordination call for a small turn, check whether one of these standing releases already covers it.

## Go-around coordination — two rules beyond the handoff script (MSP-M98 LOA 7.h)

- The tower's first move is **climb to 3,000 and scan the over-the-top corridor** — expect the aircraft at 3,000 before the dispersal-area (6,000) or satellite handoff shape develops.
- **If the go-around is *not* on an "inside" heading, subsequent departures must not be assigned a heading or fix inside the go-around aircraft** — the downwind-return path is protected. When receiving the handoff, that protection is the context.

## Automated point-outs across the tower boundary (MSP-M98 LOA 8.k)

- APOs between M98 and MSP must **flash to all staffed Local Control positions**.
- Eligible: descents in the **North Pie** and **South Pie** *(both excepted when MSP lands 35 while departing 30s)* · FCM RNAV 28L/28R *(excepted when MSP departs 17)* · MIC RNAV 32 through the dispersal area · STP RNAV/ILS through the dispersal area · FCM visuals. "North/South Pie" is LOA terminology for the descent wedges — expect it in coordination.

## Opposite-direction — who initiates (MSP-M98 LOA 10.d)

**MSP verbally requests opposite-direction departures; M98 verbally requests opposite-direction arrivals.** Either side coordinating states the phrase "**OPPOSITE DIRECTION**." Cutoff mechanics live in the Config reference.
