# ZMP — Minneapolis ARTCC reference, as it touches M98

Sources, extracted 2026-08-31:

- `source-docs/ZMP_M98_LOA.pdf` — **ZMP/M98 Letter of Agreement, effective March 31, 2026**.
  The primary document. Attachments A-D and D-1 through D-11 are images and are **unread**.
- `source-docs/ZMP_Minor_TRACON_Reference.pdf` — ZMP Minor ATCT/TRACON reference, dated
  2015-01-01. Still posted, but several of its entries have been superseded by newer facility
  orders; treated as secondary throughout.
- `source-docs/ZAU_ZMP_Approach_Controls_LOA.pdf` — ZAU/ZMP Approach Controls LOA, eff.
  2026-07-08.
- `source-docs/REF_ZMP_LOA_Routes.pdf` — ZMP Tier 1 LOA routing reference, 2022-01-27.
- The ZMP sector charts (`ZMP_Low_Sectors`, `ZMP_High_Sectors`, `ZMP_Approach_Sectors`) are
  **pictures with no text layer**. Sector *boundaries* remain unread.

---

## 1. Scope of the delegation

**ZMP delegates to M98 the airspace in Attachment A for the control of IFR traffic at and below
17,000 ft MSL** (para 2). Altitudes are MSL in hundreds of feet; courses, tracks and headings
are magnetic (para 3).

## 2. Radar procedures (para 4a-4e)

- **4.a Handoffs.** Aircraft entering ZMP from M98 must have **at least 5 NM constant or
  increasing** radar separation when radar-vectored for the same fix on similar tracks.
- **4.b** ZMP releases control for **descent and turns up to 30 degrees** from assigned
  heading/course to M98 when aircraft are **within 10 NM of the ZMP/M98 boundary**. M98 makes
  any necessary point-outs to other affected ZMP sectors **or RST approach**.
- **4.c** **M98 releases control of departing aircraft to ZMP when the aircraft is at least
  25 NM from the MSP DME or leaving 11,000.** ZMP makes any necessary point-outs to other
  affected M98 sectors. *(This is the rule the tool grades; wording confirmed verbatim.)*
- **4.d** M98 may apply 7110.65 para **5-5-4** to aircraft transitioning M98 to ZMP provided the
  minima are applied only to **diverging** courses/routes (in-trail aircraft excluded), and M98
  keeps communications with at least one aircraft **until 3 miles lateral separation is attained
  and divergence is ensured**.
- **4.e** Normal beacon codes as assigned by vNAS, except when vNAS is out of service.

## 3. Departures (para 4.f)

M98 issues the enroute clearance provided aircraft are **cleared at 17,000 or below**.
Departures filed **6,000 and below** are cleared as filed at an altitude appropriate for
direction of flight. Departures filed **7,000 or 8,000** must be on a heading or course that
**clears the MSP and satellite STAR arrival areas** at an altitude appropriate for direction of
flight.

Departures filed **9,000 and above** must be established in the appropriate ZMP sector, clear of
STAR arrival areas, on: the appropriate MSP/Satellite SID; **or a heading to join the SID within
60 NM of the MSP DME**; or, for M98 satellite departures previously routed via the DWN SID,
**INUNE GENEO DKOTA**; or, for non-SID-qualified aircraft, an assigned heading from Table 1.

**Prop aircraft requesting 12,000 or higher must be climbed to or level at 12,000.**

### Table 1 — Non-SID headings to ZMP, by receiving sector

**This is the closest thing in the reference set to a bearing-to-ZMP-sector map, and it is new.**
`CLAUDE.md` records that no SID-to-sector table exists; that is still true, but this gives the
receiving sector by *heading band*:

| ZMP sector | Qualifier | Heading band |
|---|---|---|
| **Sector 10** | West of the GEP/BAINY STAR | 290-300 |
| **Sector 10** | East of the GEP/BAINY STAR | 350-020 |
| **Sector 09** | North of the ENCEE STAR | 265-285 |
| **Sector 08** | South of the TORGY STAR | 210-240 |
| **Sector 07** | East of the KASPR/BLUEM | 140-160 |
| **RWA** | South of the KKILR STAR | 100-130 |
| **Sector 06** | North of the AGUDE STAR | 040-060 |

Read as a rough compass rose around M98: **040-060 to Sector 06, 100-130 to RWA, 140-160 to
Sector 07, 210-240 to Sector 08, 265-285 to Sector 09, 290-300 and 350-020 to Sector 10.**
"RWA" is given without expansion in the LOA. Note these are the headings assigned to get a
non-SID aircraft *into* that sector, so the mapping is directional and approximate — it is not a
published boundary, and it must not be presented as one.

## 4. Arrivals (para 4.g)

The clearance limit for arrivals is **the destination airport**.

### Table 2 — Runway transitions assigned by ZMP

| Config | BAINY | MUSCL | KKILR | NITZR | BLUEM | TORGY |
|---|---|---|---|---|---|---|
| 12 | 12L | 12L | 12R | 12R | 12R | 12R |
| 12/17 | 12L | 12L | 12R | 12R | 12R | 12R |
| 30 | 30R | 30R | 30L | 30L | 30L | 30L |
| 30/17 | 30R | 30R | 30L | 30L | 30L | 30L |
| 30/35 | 30R | 30R | 30L | 30L¹ | 30L¹ | 30L |
| 17/22 | 17 | 22 | N/A | 22 | 22 | 17 |

¹ M98 and ZMP CIC/TMU collaborate on which aircraft get the Runway 35 transition.

**Heavy jet arrivals must be assigned the Runway 12R/30L transition** (Table 2, note c) — the
rule the tool enforces as a hard validation error. Confirmed verbatim.

### Transfer of communications fixes

Transfer of communications for aircraft entering M98 on an RNAV STAR must be accomplished **no
later than** these fixes:

| STAR | TORGY | BAINY | MUSCL | KKILR | BLUEM | NITZR |
|---|---|---|---|---|---|---|
| Fix | **OFSON** | **LUCCY** | **BAYKS** | **KKILR** | **BLUEM** | **NITZR** |

### ZMP Sector 7 spacing to M98

**Minimum 5 miles in-trail between arrivals on the same STAR, and 7 miles staggered spacing
between arrivals on parallel STARs.**

### Other arrival rules

- ZMP "descend via" phraseology **must include a runway transition**.
- ZMP must **verbally coordinate any turbojet cleared via a conventional STAR** with the
  appropriate M98 sector, crossing the boundary at LOA altitudes and de-conflicted with OPD
  traffic.
- ZMP must **verbally coordinate any assigned speed deviating from the published RNAV STAR
  speed**, except speeds that are part of a TMU initiative.
- On a **30/17** configuration, **"Knock It Off" is in effect on NITZR and BLUEM**: no
  "descend via" is issued, runway transitions are still issued, any non-published speed must be
  coordinated. **NITZR crosses WRSAW at and maintain 11,000; BLUEM crosses HHAMR at and maintain
  10,000.** M98 verifies the assigned altitude.

### Table 3 — "Knock It Off" OPD crossing altitudes

Invoked when MSP is landing **Runway 4, 22, 17, or 17/22**, or any time either facility needs to
discontinue the OPD portion. May also be invoked **at individual gates regardless of runway
configuration** when operationally necessary, through M98 CIC/TMU and ZMP CIC/TMU.

| Arrival | Cross | At and maintain |
|---|---|---|
| MUSCL | BAYKS | 12,000 |
| KKILR | HUGGI | 10,000 |
| BLUEM | HHAMR | 10,000 |
| NITZR | WRSAW | 11,000 |
| TORGY | OFSON | 11,000 |
| BAINY | LUCCY | 11,000 |

Cross the M98 boundary at the **published speed of 280 kt** unless otherwise coordinated.

### Non-RNAV arrivals

All turbojets and turboprops must be routed via STARs to the extent practical. A turbojet that
cannot be on a conventional STAR must be coordinated, **on a heading through an arrival gate to
approximate direct MSP, at the appropriate knock-it-off altitude for that gate**. A turboprop
that cannot be on a conventional STAR must be coordinated, **direct MSP through an arrival gate,
or on a heading through a gate to approximate direct MSP, at 7,000**.

### Table 4 — Conventional STAR crossing altitudes

**MSP arrivals** — turbojets: **GEP, cross OLLEE at 11,000**; **KASPR, cross DELZY at 10,000**.
Turboprops on GEP: **cross OLLEE at 7,000 landing 12s** (5,000 when MSP is landing Runway 17);
**cross OLLEE at 9,000 landing 30s or 30/35**.

**Satellite arrivals** — turbojets: **AGUDE at AGUDE 8,000**; **ENCEE at RIXIE 8,000**;
**GEP at OLLEE 7,000** (6,000 when MSP is landing Runway 17); **TWOLF at TRGET 7,000**.
Turboprops: **AGUDE at AGUDE 6,000**; **ENCEE at RIXIE 7,000**; **GEP at OLLEE 7,000**
(5,000 when MSP is landing Runway 17); **TWOLF at TRGET 7,000**.

### Satellite and secondary-airport routings

- **STP, ANE and FCM arrivals routed over BITLR** must be assigned **direct GEP, cross BITLR at
  6,000**.
- **FCM and LVN arrivals entering M98 south of RGK** may be routed **direct FGT direct
  destination** without coordination: **4,000** when MSP is landing 30s, 30/17 or 30/35;
  **4,000 or 6,000** in any other configuration.
- **FCM and LVN arrivals from ZMP Sectors 08 and 09** may be cleared **direct destination at
  5,000**; they may still be cleared via the TWOLF or ENCEE arrival.
- **FCM arrivals from ZMP Sector 10** may be issued **direct FCM west of the GEP arrival gate at
  or below 5,000**.
- **All piston aircraft terminating in M98 airspace** must enter M98 satellite airspace **at or
  below 6,000** at an altitude appropriate for direction of flight.
- **STC departures** landing MSP or an M98 satellite enter M98 at **5,000**. When a runway other
  than 12L/R is in use, turbojets and turboprops departing STC and landing MSP must be **on a
  STAR** at the appropriate altitude.
- **MKT departures** landing an M98 satellite enter M98 **cleared as filed at 5,000**.
- **ZMP has control for descent to 10,000 on aircraft exiting M98 and landing RST** when they are
  **25 NM from the MSP DME**.
- Aircraft landing **OEO, RNH or RGK from the east (through Sector 5)** must be **level at or
  descending to 4,000**; M98 has control **within 10 NM of the M98 boundary**.
- Aircraft landing **STC or MKT** enter ZMP **at or descending to 4,000**; ZMP has control on
  contact.
- **When ZMP assumes RST airspace outside RST's operating hours**: all turboprops via the KASPR
  STAR **cross DELZY at 7,000**, and all piston aircraft terminating in M98 **exit RST airspace
  at 6,000**.
- Frequencies for arrivals and overflights are in Attachments D-1 through D-11 (images, unread).

## 5. Runway 17-22 landing configuration (para 5)

**Departures.** All existing routes and procedures stand except:

1. Jets filed **WLSTN** must be **vectored north of the AGUDE gate** and assigned a heading to
   join the WLSTN SID; normal altitudes.
2. **Turboprops filed WLSTN, or over EAU at 7,000 or higher**, must be cleared via the **COULT
   SID to COULT, direct EAU, direct next filed fix**.
3. Jets and turboprops filed to or over **DLH, EVM, RZN, HIB** must be **vectored west of the
   AGUDE gate** into Sector 6 on an assigned heading **020-040**; normal altitudes.
4. Jets and turboprops filed to or over **BRD** must enter **Sector 10 west of OLLEE** on a
   heading **290-310**; normal altitudes.
5. **STP, ANE and MIC northbound departures are exempt** from the above and must exit M98
   established on a heading **350-010**.
6. Departures filed at **5,000 or 6,000** must be on a heading clearing the **GOPHER and AGUDE**
   satellite STAR arrival areas.
7. M98 may clear **KBREW SID traffic direct KBREW from positions south of the SID**.

**MSP arrivals.** Knock It Off is in effect. Turboprops **cross OLLEE at 5,000** and **cross
TWINZ at 6,000**. **All KKILR/WILDD arrivals are prohibited.**

**Satellite arrivals.** GOPHER: jets cross OLLEE at 6,000, turboprops at 5,000; M98 has control
for descent of GEP STAR satellite traffic **within 10 NM of the M98/ZMP boundary**. AGUDE: STP
traffic must be assigned the AGUDE STAR; **FCM traffic normally over AGUDE must be routed over
BITLR, direct FGT direct FCM, crossing BITLR at 6,000** (no APREQ needed); jets cross AGUDE at
6,000, turboprops at 5,000; **stacks at AGUDE for aircraft landing the same airport are not
authorized**; M98 has control for descent of AGUDE traffic within 10 NM of the boundary.

**Overflights.** The **triangular airspace north of MSP between and including the Runways 17 and
22 ACDAs must be avoided from all directions below 13,000 ft MSL.**

## 6. Midnight operations (para 5, second numbering — 2230 to 0530 local, when coordinated)

ZMP clears all traffic landing within M98 **direct to the destination airport**, issues **pilot's
discretion descent to 10,000** to anything at or above 10,000, leaves arrivals at or below
10,000 at altitude, and **assigns all aircraft entering M98 frequency 124.7 (MSP_R_APP)**.
M98 clears departures **via the first fix in the route**, points out departures to any affected
Center position, and **climbs turboprops and props to 17,000** or lower if requested.

---

## ZMP Minor TRACON Reference — the M98-adjacent entries

Dated 2015-01-01 and partly superseded (RST ATCT 7110.9A explicitly cancels the Rochester entry's
parent LOA). Use as corroboration, not as a citation.

**Rochester (RST) ATCT/TRACAB**

| Field | Value |
|---|---|
| Delegated airspace | **SFC-15,000 (East), SFC-9,000 (West)** |
| Arrivals descend to | 10,000 (11,000 over ALO airspace) |
| Departures climb to | 15,000 (East), 9,000 (West) |
| IFR initial altitude | 5,000 |
| Local squawks (VFR/IFR) | 0451-0477 / 0251-0277 |
| **Hours of operation** | **0500-2300 local** |

Two things here matter. First, the **SFC-9,000 western block corroborates** the owner-supplied
read already in `CLAUDE.md` that RST owns 9,000 and below where it abuts M98, and ZMP owns above.
Second, this is the **only published figure for RST's hours anywhere in the pull** — 0500-2300
local. Both RST letters of agreement still say only "published hours" without giving them, so
`CLAUDE.md` is right that the LOAs do not carry them. Given the 2015 date and the cancelled
parent LOA, **keep RST-open/closed as a frame setting the trainee states rather than something
derived from a clock**, and treat 0500-2300 as a plausible default, not a fact.

Nearby facilities in the same document, for context: **DLH** SFC-12,000 (HIB SFC-8,000), 24h;
**FAR** SFC-10,000, 24h; **DSM** SFC-10,000, 24h; **GRB/ATW** SFC-13,000; **STC** Class D
SFC-3,500, approach/departure by ZMP, 0700-2300 local; **EAU** Class D SFC-3,500, 0530-2030
local; **LSE** Class D SFC-3,700, 0600-2100 local.

---

## ZAU/ZMP Approach Controls LOA (eff. 2026-07-08)

Between ZAU, ZMP and the approach controls DSM, AZO, GRB, MKE, **RST** and VOK. Relevant to M98
only indirectly, but it is the document that puts **RST** into a formal relationship with Chicago
Center:

- Destination airport is the clearance limit; aircraft are cleared via filed or amended route.
- The transferring controller releases **turns up to 30 degrees**, transponder code change, and
  descent.
- **5 NM in-trail, constant or increasing**, for aircraft at the same altitude.
- Facilities must coordinate opening and closing with adjacent operational facilities, and when
  multiple positions are open must coordinate frequency assignment and **only coordinate with a
  single sector for inter-facility coordination**.
- **Tower En-route Control:** aircraft within **DSM and RST airspace** must enter adjacent
  approach control airspace **on course on their flight plan route** and **level at their
  assigned altitude, correct for direction of flight, at least 5 NM prior to the facility
  boundary**.
- The Appendix A airspace depiction shows **RST KRST AOB 090** and **RST ODI AOB 150** — again
  consistent with the 9,000 / 15,000 west/east split.

---

## ZMP Tier 1 LOA routing reference (2022-01-27)

Preferred routes; severe weather, TMU restrictions or coordination may override any of them.
The M98-relevant lines:

**KMSP departures.** KORD: `RST SID RST ZZIPR FYTTE STAR` (RNAV). KMDW: `RST SID RST OHHMY ENDEE
STAR` (RNAV). KDEN: `SCHEP SID ONL PORDR AALLE STAR` (RNAV). KDTW: `COULT SID DLL PORZL
RKCTY/KKISS STAR` and `WLSTN SID GRB HOOTA RKCTY/KKISS STAR` (RNAV). KMCI: `ORSKY SID FOD ASIIX
JSONN STAR` (RNAV). CYWG: `BRNRD GOVIT NORAK STAR` (RNAV).

**Arrivals into MSP**, which is what the Feeder sees: from **KOMA/KLNK/KSUX and KDSM**,
`ROKKK NITZR STAR`. From **KGRB**, `SHEAY MUSCL STAR`. From **KFAR/KBIS/KGFK/KMOT**,
`TTAIL BAINY STAR`. From **KDLH**, `COLDD BAINY STAR`. From **KFSD**, `SSWAN TORGY STAR`.
From **KRST**, `BLUEM BLUEM STAR`.

*That last line is worth noting for drill authoring: a Rochester departure into MSP arrives on
the BLUEM, which is exactly the strip the M98/RST LOA's "transfer before crossing BLUEM" rule
governs.*
