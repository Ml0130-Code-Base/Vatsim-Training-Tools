# IND LOA Reference - inter-facility coordination

**There are no separate letters of agreement for IND in the Indy Center wiki pull.** The facility's coordination with its neighbours is chapter 8 of the SOP ("Inter-Facility Coordination") and chapter 7 ("Departures", "Arrivals", "Overflights"). This file collects those tables, and sets the **vNAS Restrictions** beside them as an independent second source. The SOP text is the order; vNAS is the adaptation.

Source: Indianapolis (IND) ATCT SOP, saved 2026-10-18 (last changelog entry 2026-05-28); vNAS ZID record lastUpdatedAt 2026-10-17T02:35:43.475Z.

**The SOP says controllers may also reference the ICT for a full list of restrictions and handoffs. It is not in the pull** (gap analysis, Part 1).

---

## Departures - handoffs to other facilities

*Source: IND SOP 7 Approach Control > Departures*

| Route | To | Altitude | Notes |
| --- | --- | --- | --- |
| North (MEARZ#) | ZAU | Climbing 13000 |  |
| South (DAWNN#) | ZID (SHB 34) | Climbing 13000 | IND may clear direct DAWNN |
| East (MAREO#) | ZID (MIE 33) | Climbing 13000 |  |
| West (ROCKY#) | ZID (HUF 35) | Climbing 13000 | IND may clear direct TTH |
| Southwest (OOM#) | ZID (HUF 35) | Climbing 13000 |  |

Departures from the underlying ATCTs are handed off per the AID, BAK, HBE and MIE ATCT SOPs (not pulled). IND TRACON may also reference the ICT for the full list of restrictions and handoffs (not pulled).

## Arrivals - handoffs from other facilities

*Source: IND SOP 7 Approach Control > Arrivals*

| Route | From | Altitude | Notes |
| --- | --- | --- | --- |
| GIIBS# or SCARF DECEE VHP | ZID (ABB 18) | Descend via, or SCARF @ 14000 (jet) or EASEL @ 14000 (prop) | Join by JOCKE |
| JAKKS# | ZAU | JAKKS @ 13000 (jet) or JAKKS @ 11000 (prop) | 250 KIAS when landing runway 14. INDz is responsible for notifying ZAU when runway 14 is in use (or is no longer in use). If unable STAR, clear direct VHP through the JAKKS arrival area and clear to cross 30nm NW VHP at 130 (jet) or 110 (prop). |
| KOLTS# | ZID (HUF 35) | Descend via | Join by CIRGO. When IND landing SE, ZID must assign direct VHP to cross 30nm W @ 12000' and 250 IAS |
| SMUKE# or RACYR# or RACYR DRWUD VHP | ZID (HUF 35) | Descend via, or DRWUD @ 11000 | Join by SMUKE. Non-STAR jets assigned 250 KIAS when landing NE. |
| SNKPT# or SNKPT CLANG | ZID (MIE 33) | Descend via, or SNKPT @ 14000 | Join by BABNE. |
| Landing sats via CLANG# | ZID (MIE 33) | PENDS @ 14000 |  |
| Landing BAK, MQJ, GEZ, UMP via WAMBO | CMHz | 10000 |  |
| Landing AID, MIE | FWAz | Descending 4000 |  |
| Landing IND via DECEE VHP | CVGz | 10000 | IND control for speed and turns up to 30 degrees |
| Landing IND via direct | CVGz | AOB 8000 | IND control for speed and turns up to 30 degrees |
| Landing IND sats | CVGz | AOB 8000 | IND control for descent and turns up to 30 degrees |
| Landing IND [sic: "Lanidng"] | GUSz | AOB 10000 |  |

Bold denotes primary jet flow in the wiki; the bold is lost in the saved page. IND has control from ZID for descent and control for 30 degree turns on all arrivals, except IND may only turn or descend GIIBS gate arrivals off the arrival at or below 16000.

## Overflights

*Source: IND SOP 7 Approach Control > Overflights*

| Destination | Route | From | Altitude | To | Altitude |
| --- | --- | --- | --- | --- | --- |
| CVG | CEGRM (prop) | ZID | 14000' | CVG-NAR | Descending 9000' |

## IND and CMH

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CMH to IND | BAK, MQJ, GEZ, UMP | WAMBO | 10000 (from CMHz) |  |

## IND and CVG

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to CVG | CVG | All | 5000 or 7000 (to CVGz) | CVG control for turns up to 30 degrees |
| IND to CVG | CVG sats | All | AOB 7000 (to CVGz) | CVG control for descent and turns up to 30 degrees |
| CVG to IND | IND | DECEE VHP | 10000 (from CVGz) | IND control for speed and turns up to 30 degrees |
| CVG to IND | IND | Direct | AOB 8000 (from CVGz) |  |
| CVG to IND | IND sats | All | AOB 8000 (from CVGz) | IND control for descent and turns up to 30 degrees |

## IND and FWA

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to FWA | HHG, PLD | All | Descending 5000 (to FWAz) |  |
| FWA to IND | AID, MIE | All | Descending 4000 (from FWAz) |  |

## IND and GUS

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| GUS to IND | IND | All | AOB 10000 (from GUSz) |  |

## IND and HUF

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to HUF | BMG | All | 4000, 5000 or 6000 (to HUFz) | Correct altitude for DOF |

## IND and SDF

*Source: IND SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF to IND | IND, BAK, BMG, GEZ, HBE, HFY, SER, I34 | Direct | AOB 9000 (from SDFz) | IND control for descent and 30 degree turns |
| SDF to IND | OVO | Direct destination or direct NURBY (RNAV 5) | 4000 (from SDFz) | IND control for descent and turns |
| IND to SDF | SDF, BFR, FRH, IMS, JVY, SER, LOU | Direct | AOB 9000 (to SDFz) | SDF control for descent and 30 degree turns |

## Inter-facility rules

*Source: IND SOP 8 Inter-Facility Coordination*

- Both IND and SDF release control for turns up to 30 degrees on contact.
- For SER RNAV 14 or RNAV 23 arrivals, IND must coordinate with SDF to block the airspace (including for the published missed). IND must provide the SDF frequency for missed approach or IFR cancellation; SDF must advise IND of the cancellation when received.
- If the JPG MOA and/or the RACER MOA is active, each facility must issue aircraft a heading to remain West of the lateral boundary of the MOA(s). This heading does not need to be coordinated.
- INDz must advise ZAU when landing runway 14, for ZAU to apply 250 KIAS to JAKKS# arrivals.

## Procedures with ZID

*Source: IND SOP 8 Inter-Facility Coordination*

- FWA or DAY/FFO/MGY (via RID) arrivals: ZID descends the aircraft to 14000 and hands off to IND. If traffic is a factor, IND coordinates verbally with ZID. If it is not, IND accepts and initiates a return handoff to ZID. When ZID receives the return handoff it retains communication and has control for descent to 11000, and may hand directly to FWA/CMH.
- CVG (via CEGRM#) arrivals: ZID issues a descend-via clearance and hands off to IND. If traffic is a factor, IND coordinates verbally. If not, IND accepts and returns the handoff to ZID, who retains communication and has control for descent to 13000 via descend-via, and may hand directly to CVG.
- ZID is responsible for pointing the aircraft out to adjacent facilities if necessary.

## vNAS Restrictions that involve IND (26)

Field names are the record's own (`owningFacilityId`, `requestingFacilityId`, `flightType`, `groupName`, `route`, `applicableAirports`, `altitudeRestriction`, `owningSectorIds`, `requestingSectorIds`, `notes`). **These are not merged into the SOP tables above and have not been reconciled row by row.**

| Owner > requester | Flight | Group | Route | Airports | Altitude | Sectors (owner > requester) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IND > FWA | Arrivals |  |  | HHG PLD | DescendingTo 5000 | 1S > 1W |  |
| IND > CVG | Arrivals |  |  | CVG | AnyOf 5000 / 7000 | 1S > 1B | Control: CVG control for turns up to 30 degrees |
| IND > CVG | Arrivals |  |  | CVG Sats | AtOrBelow 7000 | 1S > 1B | Control: CVG control for descent and turns up to 30 degrees |
| CVG > IND | Arrivals | GIIBS Gate | DECEE VHP | IND | At 10000 | 1B > 1D | Control: IND control for speed and turns up to 30 degrees |
| CVG > IND | Arrivals |  | Direct | IND | AtOrBelow 8000 | 1B > 1S | Control: IND control for speed and turns up to 30 degrees |
| CVG > IND | Arrivals |  |  | EYE GEZ HFY MQJ TYQ UMP | AtOrBelow 8000 | 1B > 1S | Control: IND control for descent and turns up to 30 degrees |
| CMH > IND | Arrivals |  | WAMBO | BAK MQJ GEZ UMP | At 10000 | 1U > 1D |  |
| IND > ZAU | Departures | NORTH Gate | Departures via MEARZ | IND+ | ClimbingTo 13000 | 1W > 35/51 |  |
| IND > ZID | Departures | SOUTH Gate | Departures via DAWNN | IND+ | ClimbingTo 13000 | 1E > 34 | Control: IND may clear direct DAWNN |
| IND > ZID | Departures | EAST Gate | Departures via MAREO | IND+ | ClimbingTo 13000 | 1E > 33 |  |
| IND > ZID | Departures | WEST Gate | Departures via ROCKY | IND+ | ClimbingTo 13000 | 1W > 35 | Control: IND may clear direct TTH |
| IND > ZID | Departures | SOUTHWEST Gate | Departures via OOM | IND+ | ClimbingTo 13000 | 1W > 35 |  |
| ZID > IND | Arrivals | GIIBS Gate | GIIBS# | IND [Rnav/Jets] | DescendingVia | 18 > 1D | Control: ZID18 may clear direct JOCKE<br>General: RNAV1 |
| ZID > IND | Arrivals | GIIBS Gate | EASEL SCARF DECEE VHP | IND+ [Rnav/Jets] | At 14000 | 18 > 1D | General: IND jet arrivals only if unable PBN STAR |
| ZID > IND | Arrivals | GIIBS Gate | EASEL SCARF DECEE VHP | IND+ [Rnav/Props] | At 14000 | 18 > 1D |  |
| ZID > IND | Arrivals | ANTTI Gate | KOLTS2 | IND [Rnav] | DescendingVia | 35 > 1B | Excludes: May not be assigned when IND landing SE<br>Ait: Passback with HUF |
| ZID > IND | Arrivals | ANTTI Gate | VHP | IND {IND SOUTHEAST} | At 12000 | 35 > 1B | General: Alternative to KOLTS STAR |
| ZID > IND | Arrivals | KELLY Gate | SMUKE# | IND [Rnav] | DescendingVia | 35 > 1B | Control: ZID35 may clear direct SMUKE |
| ZID > IND | Arrivals | KELLY Gate | RACYR6 | IND+ | At 11000 | 35 > 1B | General: Assign 250 KIAS to jets when IND landing NORTHEAST |
| ZID > IND | Arrivals | CLANG Gate | SNKPT# | IND [Jets] | DescendingVia | 33 > 1D | General: ZID33 may clear direct BABNE<br>General: RNAV1 |
| IND > HUF | Arrivals |  |  | BMG | Between 4000 / 6000 | 1W > 1Q | General: Correct altitude for direction of flight |
| SDF > IND | Arrivals |  | Direct | IND BAK BMG GEZ HBE HFY SER I34 | AtOrBelow 9000 | 1B/1D > 1E/1W | Control: IND control for descent and 30 degree turns |
| SDF > IND | Arrivals |  | Direct destination or direct NURBY (RNAV 5) | OVO | At 4000 | 1D > 1E | Control: IND control for descent and turns |
| IND > SDF | Arrivals |  | Direct | SDF BFR FRH IMS JVY SER LOU | AtOrBelow 9000 | 1E/1W > 1B/1D | Control: SDF control for descent and 30 degree turns |
| ZID > IND | Arrivals | CLANG Gate | CLANG# | IND Sats [Rnav] | At 14000 | 33 > 1D |  |
| ZID > IND | Arrivals | CLANG Gate | SNKPT CLANG | IND [Rnav] | At 14000 | 33 > 1D | General: RNAV aircraft unable PBN STAR |

## Handoff IDs

See `../_shared/claude_ZID_Handoff_ID_Reference.md` for the composition rules. Outbound coordinations this facility owns, with the ID typed from a IND seat:

| To | Sectors | ID typed |
| --- | --- | --- |
| FWA | 1W | Δ5W |
| CVG | 1B | Δ2B |
| ZAU | 35 51 | G35 G51 |
| ZID | 34 | C34 |
| ZID | 33 | C33 |
| ZID | 35 | C35 |
| HUF | 1Q | Δ3Q |
| SDF | 1B 1D | Δ6B Δ6D |

The SOP chapter 8 lists CMH, CVG, FWA, GUS, HUF, SDF, ZID and ZAU as IND's interfaces. Chapter 8's ZID and ZAU sections carry no tables of their own: arrivals, overflights and departures for those two are handed off via chapter 7. vNAS names the ZAU sectors for the North gate (35 and 51); the SOP does not.
