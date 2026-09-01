# M98 / Rochester Reference

Rochester Approach is the one neighbour around M98 that is not Center. This doc carries the two agreements that govern it, extracted from the source PDFs.

**Sources**
- **M98/RST LOA** — *Minneapolis TRACON / Rochester ATCT, Letter of Agreement, SUBJECT: TOWER ENROUTE SERVICE*, effective **31 March 2026** (cancels the 27 Dec 2023 edition). This is the operative one for M98.
- **ZMP/RST LOA** — *Minneapolis ARTCC / Rochester Approach/ATCT, SUBJECT: TERMINAL AREA CONTROL SERVICE*, effective **27 December 2023**. Governs RST against Center; relevant to M98 mainly for what happens when RST is closed and for the BLUEM/KASPR assignment when RST hands to Sector 7.
- Both are marked **FOR SIMULATION USE ONLY** (VATSIM Minneapolis ARTCC, Dhruv Kalra, ATM).

**Boundary geometry** (owner-supplied, 2026-08-31): the M98/RST line runs **MSP 185/038 · 158/041 · 149/040**. South of it RST owns **9,000 and below**; ZMP owns above. Everywhere else around M98 the neighbour is ZMP at every altitude.

## When Rochester is closed

**RST is not a 24-hour facility.** Both agreements say the same thing:

- M98/RST **4.a** — "Minneapolis ARTCC (ZMP) **Sector 7** controls the RST delegated airspace when the approach facility is closed."
- ZMP/RST **6.B** — "During the time period when Rochester Approach/Tower is not operational, delegated airspace and control responsibility therein shall revert to the Center, **Sector 07**."

So with RST shut, that corner is **ZMP Sector 07**, top to bottom — nothing goes to Rochester. The published hours themselves are **not in either LOA**; state them with the frame.

## M98 → RST (what we hand them)

M98/RST **5.b**:

1. **Aircraft entering RST airspace at 3,000, 5,000, 7,000, or 9,000 ft.** Those four and nothing else.
2. Aircraft at **7,000 and 9,000 must be clear of the KASPR STAR** — parallel to it or diverging from it.
3. **Assign frequency 119.8 or 119.2** as appropriate to aircraft entering RST Approach airspace.

## RST → M98 (what they hand us)

M98/RST **5.a**:

- **(1)** BLUEM STAR to all capable turbojets landing MSP; **KASPR** STAR to all other turbojets. RST must **verbally coordinate** all turbojets on the KASPR arrival.
- **(2)** KASPR to all turboprops capable of 200 kt IAS or greater landing MSP.
- **(3)** Altitudes assigned to BLUEM/KASPR arrivals, by landing runway:

| Landing | Altitude | Position | Who |
|---|---|---|---|
| 12L/R | 9,000 | Feeder | jets and props |
| 30L/R | 7,000 | Satellite | props |
| 30L/R | 9,000 | Feeder | jets |
| 30L/R, departing 17 | 9,000 | Feeder | jets and props |
| 35 | 7,000 | 35 Arrival | jets and props |
| 4 | 8,000 | Feeder | all capable of 200 kt |
| 17 or 22 | 9,000 | Feeder | all capable of 200 kt |
| any other configuration | as coordinated | | |

> **NOTE (in the LOA):** KASPR STAR airspace is **4 NM either side of the STAR centreline**. When MSP lands Runway 35, the **eastern** side is **7 NM** wide.

- **(4)** Aircraft landing in M98 that RST worked through **ZMP Sector 5** airspace: at **4,000**.
- **(5)** All other aircraft landing in M98 exit RST or **ZMP Sector 8** airspace at **6,000**.
- **(6)** **Overflights enter M98 airspace at 4,000, 6,000, or 8,000.**
- **(7)** Overflights transiting M98 at **7,000 or above** are **individually coordinated at least 5 minutes** before their estimated entry.
- **(8)** RST assigns M98 frequencies — see the conflict below — and **advises M98 Satellite and Departure positions when RST airspace is split**.

## Transfer of control

M98/RST **4.b** — transfer of control and frequency change take place **after completion of the radar handoff**. For the **BLUEM Arrival** it must happen **before the aircraft crosses BLUEM**.

M98/RST **4.d** — on transfer of control, RST may descend and/or alter the course of **Owatonna** arrivals.
M98/RST **4.e** — the receiving facility may request a **VFR aircraft to change beacon codes**.

## Conflicts — named, not resolved

Per the standing rule in the STAR and SID references: where sources disagree, name it.

1. ~~**Frequency-to-position mapping.**~~ **RESOLVED 2026-08-31 — this was an extraction artefact, not a conflict.** A clean re-download of the 3/31/2026 M98/RST LOA from `minniecenter.org` gives 5.a(8) in full, and it agrees with SOP 2-1 on every line:

   | | Frequency | LOA descriptor | SOP 2-1 position |
   |---|---|---|---|
   | (a) | **135.47** | "Feeder" — MSP arrivals on the BLUEM/KASPR STAR, **excluding Runway 35 traffic** | H, South Feeder (135.475) |
   | (b) | **118.72** | "35 Arrival" — Runway 35 traffic on the BLUEM/KASPR STAR | J, 17/35 West Final/Arrival (118.725) |
   | (c) | **132.975** | "East Departure" | L, East Departure |
   | (d) | **134.7** | "Satellite" | E, Flying Cloud Satellite |

   The earlier reading had (a) and (b) transposed because the descriptors were separated from their frequencies in the original text extraction. **There is no transposition in the document.** Runway 35 traffic goes to 118.72; everything else on the BLUEM/KASPR goes to 135.47.

2. **BLUEM crossing altitude.** M98/RST 5.a(3)(a) has RST assign BLUEM/KASPR arrivals **9,000** when MSP lands 12L/R. The current AIRAC STAR plate has **BLUEM at or above 10,000** (`claude_MSP_STAR_Reference.md`). An aircraft at 9,000 crossing BLUEM does not satisfy a ≥10,000 crossing. Not resolved here; the tool keeps the plate ladder and does not silently re-fly it.

## What the tool does with this

- The neighbour is worked out from the bearing a strip crosses on and its altitude: inside the arc at or below 9,000 it is RST, above it is Center, outside the arc it is always Center.
- With Rochester closed, the neighbour becomes **ZMP Sector 07** at every altitude in that corner, and a strip marked as handed off by Rochester is refused.
- Handing an aircraft to RST at anything other than **3,000, 5,000, 7,000 or 9,000** is flagged against 5.b(1).
- The RST frequency is **119.8** (119.2 is the alternate "as appropriate" — the LOA does not say which is which, so the tool accepts either).
- Overflights arriving from RST at anything other than 4,000, 6,000 or 8,000 are flagged against 5.a(6), and one at 7,000 or above is noted as needing the 5-minute individual coordination in 5.a(7).

---

# Addendum — second extraction, 2026-08-31

Both LOAs were re-downloaded clean from `minniecenter.org/docs`, together with two documents that
were not in the reference set before: **RST ATCT 7110.9A** (the Rochester facility order) and the
**ZMP Minor TRACON Reference**. Sources are `source-docs/M98_RST_LOA.pdf`,
`source-docs/ZMP_RST_LOA.pdf`, `source-docs/RST_ATCT_7110_9A.pdf`,
`source-docs/ZMP_Minor_TRACON_Reference.pdf`.

**Everything above was verified line by line against the fresh copies and is correct**, except
conflict 1, now struck through and replaced. The BLUEM 9,000 versus plate 10,000 conflict
(conflict 2) is **confirmed still present** in the 3/31/2026 text.

## Rochester's hours — a number, at last

`CLAUDE.md` records that the published hours are in neither agreement. That is still true. But the
**ZMP Minor TRACON Reference** gives **RST hours of operation as 0500-2300 local**, along with:

| Field | Value |
|---|---|
| Delegated airspace | **SFC-15,000 (East), SFC-9,000 (West)** |
| Arrivals descend to | 10,000 (11,000 over ALO airspace) |
| Departures climb to | 15,000 (East), 9,000 (West) |
| IFR initial altitude | 5,000 |
| Local squawks (VFR/IFR) | 0451-0477 / 0251-0277 |
| **Hours** | **0500-2300 local** |

Two caveats, both real. The document is dated **2015-01-01**, and **RST ATCT 7110.9A explicitly
cancels its Rochester entry's parent LOA**. So treat 0500-2300 as a **plausible default, not a
fact**, and keep RST-open/closed as a frame setting the trainee states rather than something the
tool derives from a clock. The `SFC-9,000 (West)` figure, however, **independently corroborates
the owner-supplied read** that RST owns 9,000 and below where it abuts M98 — as does the ZAU/ZMP
Approach Controls LOA Appendix A, which labels the same airspace **RST KRST AOB 090** and
**RST ODI AOB 150**.

## Rochester's own positions (RST ATCT 7110.9A, 2-2)

| Position | Frequency | STARS ID | Callsign |
|---|---|---|---|
| Ground Control | 121.900 | T | RST_GND |
| **Local Control** | **118.300** | T | RST_TWR |
| ATIS | 120.500 | — | KRST_ATIS |
| **RST Approach (RA)** | **119.800** | A | RST_A_APP |
| **RST West (RW)** | **119.200** | W | RST_W_APP |

**This settles the "as appropriate" in M98/RST 5.b(3).** The two frequencies are not
interchangeable: **119.8 is RST Approach, 119.2 is RST West.** The LOA does not say which strip
goes to which, so accepting either remains correct for grading, but the tool should no longer
describe 119.2 as merely "the alternate" — it is a distinct split position, and 5.a(8) requires
RST to **advise M98 Satellite and Departure when RST airspace is split**, which is exactly when
119.2 comes alive.

Ground and Local are regularly combined to Local. **The LC / RST Approach transfer of control
point is 1,800 ft MSL.**

## Other RST facts worth having

- **RST Class D:** surface to and including **3,800 ft MSL within a 4.3 NM radius**.
- **Runways:** 13/31 is 9,034 x 150 ft, precision markings; 3/21 is 7,301 x 150 ft, non-precision.
  Runway 3/21 is depicted as Runway 2/20 on the facility's own airport diagram.
- **Departure corridor:** three miles either side of the extended centerline of the advertised
  runway, from the departure end to **10 miles from the radar antenna, surface to 5,000 ft MSL**.
  Local may release IFR aircraft on runway heading climbing to 5,000 or below **without
  coordinating with Approach**.
- **IFR initial altitude for itinerant departures is 5,000**, expect requested altitude ten
  minutes after departure. Practice approaches under IFR are cleared **via radar vectors,
  maintain 4,000**.
- **MVA within 40 miles of RST is 2,900 MSL**, with named exceptions up to 3,800 (KIMT antenna
  201/035, 2,799 ft; an antenna at 190/019, 2,828 ft).
- **Climbout / missed approach for practice approaches: runway heading and 4,000 MSL.**
- Approach advises arrivals to contact the tower **within ten miles and prior to entering Class D,
  or prior to the final approach fix**.
- Visual approaches may be vectored when the **measured ceiling is 2,100 AGL or greater**.
- Restricted low approaches use **no lower than 1,900 MSL**.

## ZMP/RST rules that reach M98

From `ZMP_RST_LOA.pdf` (eff. 2023-12-27), the paragraphs that bear on M98 traffic:

- **5.C(1)** If a turbojet filed to MSP is handed to **ZMP Sector 7**, assign **BLUEM to all RNAV
  capable turbojets** and **KASPR to all non-RNAV turbojets**. If RST points the aircraft out to
  Sector 07 instead, **RST must verbally coordinate with M98 all turbojets on the KASPR STAR**.
- **5.C(2)** M98-area **turboprop** arrivals at or above 10,000 that will not transit the
  15,000-ft shelf will be **at or descending to 10,000**; anything filed through the lateral
  limits of the shelf at or above 14,000 will be **at or descending to 14,000**.
- **5.C(3)** **Rochester Approach may have control for descent of M98 turboprop arrivals when the
  aircraft is within 10 miles of the Approach boundary.**
- **5.D(1)** **For all M98-area departures filed for 15,000 or below, climbing to the requested
  altitude is approved by Rochester Approach without further coordination.** *(Useful: the RST
  departure — the only one of the nine turbojet SIDs that leaves through the RST arc — needs no
  further coordination for its climb at or below 15,000.)*
- **5.B(1)** Upon leaving 5,000, Center may alter an RST departure's heading up to 30 degrees and
  climb it, provided no other sector or approach control is affected.

## Tower En-route Control (ZAU/ZMP Approach Controls LOA, eff. 2026-07-08, para 8.b)

Aircraft **within DSM and RST airspace** must enter adjacent approach control airspace **on
course on their flight plan route** and **level at their assigned altitude, correct for direction
of flight, at least 5 NM prior to the facility boundary**. This is the general form of the rule
that M98/RST 5.b states as the four discrete entry altitudes.

---

*First extracted from the owner's source PDFs on 2026-08-31; re-verified the same day against
clean downloads from `minniecenter.org/docs`. All documents are simulation-use VATSIM agreements.
**Attachment A of each LOA is a chart image and still has not been parsed** — the airspace
depiction itself remains unread, and the boundary geometry above is owner-supplied, not read off
a chart. The same is true of RST ATCT 7110.9A Appendix 2, which holds the seven CTRD video maps
including the Rochester Approach airspace map and both MVA charts.*
