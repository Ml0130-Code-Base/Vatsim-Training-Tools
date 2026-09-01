# M98 Satellite Tower Interface

Companion to the Satellite Reference. Distills the **M98 – Satellite Towers LOA (ANE/FCM/MIC/STP, eff. 11/30/2025)** and the four satellite tower orders (**ANE 7110.65 · FCM 7110.1A · MIC 7220.3N · STP 7220.3Q**, all CHG 1, 11/30/2025) down to what the radar seat needs when a satellite tower is staffed — and what the tower will do without asking. FOR SIMULATION USE.

## Source self-check

- **Releases, headings, initial altitudes, missed approaches, scratchpads** → M98-SAT LOA (the interface authority).
- **Tower-side jurisdiction, advertising minima, field quirks** → the individual tower order.
- When a tower is **closed**, none of this LOA machinery applies — the closed-tower/uncontrolled procedures in the Satellite Reference govern instead.

## Positions and frequencies

| Field | Ground/Clearance | Local | ATIS |
|---|---|---|---|
| ANE | 121.85 | **132.4** | 120.625 |
| FCM | 121.7 | **119.15** (LCS, primary) · 125.2 (LCN) | 124.9 |
| MIC | 121.6 | **120.7** | 124.475 |
| STP | 121.675 | **119.1** | 118.35 |

FCM is the only satellite with a splittable local (LCN north of a line halfway between the parallels + Runway 36 departures; LCS south + Runway 18 departures).

## Departure releases — the Run-Down Tab List

Releases move through the STARS Run-Down Tab List, not verbal calls (nonstandard heading/altitude stays verbal):

- **List IDs: ANE = PO · FCM = PF · MIC = PM · STP = PP** (second letter = the tower's STARS ID).
- Tower requests: `F13, ACID, (direction)(heading), <enter>` — direction letters map to runway ends (ANE: N=36, S=18, W=27, E=09 · FCM: N=36, S=18, W=28, E=10).
- **M98 issues the release: `F13, <list ID>, ACID, <enter>`.** Resequence: `F13, ACID, <new #>`. Cancel: `F13, ACID`. Move the list: `F7, <list ID>, <slew>`. Quick-look a header: `F7, <list ID>, E`.
- Shift+F3 substitutes for F13 on keyboards without one.
- Towers must place aircraft in departure order and **verbally coordinate any list change**, any **non-advertised-runway departure**, and any **nonstandard heading/altitude**.

## Standard departure headings and initial altitudes (LOA Attachment 2 / 6.b.1a)

| Field | Runway(s) | Standard heading band | Initial altitude |
|---|---|---|---|
| ANE | 18 | right turn, 270° clockwise to 090° | 3,000 |
| ANE | 9, 27, 36 | 270° clockwise to 090° | 3,000 |
| FCM | 28L, 28R, 18 | 180° clockwise to 300° | 3,000 |
| FCM | 10L, 10R, 36 | 180° clockwise to 300° (**Runway 10 = right turns** unless coordinated) | 2,500 |
| MIC | all | **320°** | 3,000 |
| STP | 32 | 030° clockwise to 045° | 3,000 |
| STP | 13, 14 | 010° clockwise to 080° | 2,500 |

Training anchors already learned live: at FCM on 10L/R the usable headings are effectively **230 and 300** (further east risks the dispersal area); STP 14 can go **no further south than 080** for the same reason — and STP 14 departures are additionally capped **2,500 / ≤080°** by M98 SOP 6-3, so a 3,000 restriction on a 14 release is redundant work.

## Missed approaches

| Field | M98-issued (planned) | Tower-issued (unplanned) |
|---|---|---|
| ANE | 360° / 2,500 | 360° / 2,500 |
| FCM | 230° / 2,500 | 230° / 2,500 |
| MIC | 320° / 2,500 | **320° / 3,000** |
| STP | 060° / 2,500 | 060° / 2,500 |

The MIC asymmetry is real — a tower-initiated unplanned miss at Crystal comes at 3,000, not 2,500. Towers advise M98 of any unplanned miss; visual-approach go-arounds may be kept in the pattern.

## Standing tower authorities — check before calling a conflict

- **Overflights at or above 3,000 MSL** transit satellite-tower airspace **without prior coordination** (must be displayed on the tower display, else verbally coordinated).
- **FCM may side-step or circle** an arrival to any non-opposite-direction runway without coordination — FCM takes separation with preceding/succeeding traffic. (Tower order adds: LC may side-step IFR arrivals between active parallels without coordination.)
- **STP may interchange Runway 31 with 32, and 13 with 14**, when issuing landing instructions.

## Data block conventions (LOA Attachment 1 = M98 SOP Appendix G satellite section)

- **Scratch Pad 1 = destination airport** (STP, FCM, ANE, MIC, LVN, 21D, SGS …).
- **Scratch Pad 2 = approach type + termination:** first character **I** ILS · **G** RNAV (GPS) · **L** Localizer · **N** NDB · **V** VOR; then **F** full stop · **M** missed · **PM** published missed · **VV** pilot-provided visual separation (displays as VV+ when time-sharing). Example: ILS 30 to a published missed at LVN → `+IPM`.
- Other approved entries: **A/W** air work · **HLD** holding · **PIX** photo flight · **GEP** / **FGT** holding at those VORs · **2ER** tour. Satellite arrivals on visuals with pilot separation: **+VV**.
- M98's arrival full data blocks must carry the scratchpad data plus **type aircraft in field four** unless verbally coordinated.

## Field quirks worth a drill line each

- **ANE:** clearance delivery issues **3,000 to all IFR** with filed altitude expected 10 minutes after departure; no calm-wind runway — most-aligned runway wins.
- **FCM:** **Class B base over the field is 3,000** (the tower's Bravo-avoidance phraseology quotes it); visual approaches advertised only at **visibility ≥ 7 / ceiling ≥ 2,100 AGL**; instrument advertising — landing 28 → RNAV 28L/28R and/or **VOR 36 circle to 28L**, landing 18 → an approach to **10R circle to 18**; occasional **floatplane traffic at Lake Riley and Bryant Lake** (advisories only); taxiway Alpha sits 30 ft from the 10L/28R hold-short lines, so big aircraft exiting encroach it.
- **MIC:** runways are **14/32 plus parallel 6L/24R and 6R/24L** — the old 14R/32L is permanently closed and is now Taxiway G. Class D = **3.8 NM, surface to 2,500 AGL (3,369 MSL)**, truncated at the Class B base. **North Memorial Hospital helipad MY77, 3.7 NM south-southeast.** Local IFR clearances are issued "via radar vectors." Visuals advertised at **≥ 7 / ≥ 2,200**; otherwise RNAV to the runway in use.
- **STP:** **Runway 31 is not available for IFR departures.** Simultaneous 31/32 runs under FAA JO 7110.65 3-9-9 (nonintersecting converging). The **Runway 13 clear zone** must be empty during a Runway 13 approach. Class D = 4.1 NM with an SGS cutout. Visuals advertised at **≥ 7 / ≥ 2,300**, and the tower must **advise M98 whenever weather crosses that line either way**.

## Visual reporting points (the ones pilots will actually say)

- **FCM:** Chaska · Chanhassen · Eden Prairie Center · Excelsior · Hazeltine · Hopkins · Lake Minnetonka · Lake Minnewashta · Lake Riley · Lake Victoria · Lake Waconia* · Mound · Prior Lake* · Radisson South · Savage · Shakopee* · Spring Lake · Staring Lake · Wayzata* (*charted VFR checkpoints).
- **MIC:** City of Anoka 10N · Anoka Airport 8NE · Gopher VOR 5N · Coon Rapids Dam 6NNE · **Shoreview Antennas 10.5E** · KSTP Antenna 9ESE · State Fair Grounds 10SE · Downtown Minneapolis 7SE · Fish Lake 5.5NW · Golden Valley 7S · Medicine Lake 5SW · Lake Minnetonka 15SSW · Bass Lake 4W · Rogers 13NW · Maple Grove towers · Gravel Pits 4.5NW · Osseo 4.5NW.
- **STP:** 3M 3.5E · **Shoreview Antennas 7NW** · State Capital 2NW · White Bear Lake 11NNE · State Fair Grounds 6NW · Hudson 16E · Stillwater 15NE · Lake Elmo (21D) 11NE · South St. Paul 5SE · Pine Bend 12S.

The Shoreview Antennas appear as a *visual checkpoint* from two fields and as a **2,438 ft obstruction (MSP 018011)** on the MVA chart — same towers, two roles.
