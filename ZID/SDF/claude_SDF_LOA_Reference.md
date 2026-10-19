# SDF LOA Reference - inter-facility coordination

**There are no separate letters of agreement for SDF in the Indy Center wiki pull.** The facility's coordination with its neighbours is chapter 8 of the SOP ("Inter-Facility Coordination") and chapter 7 ("Departures", "Arrivals", "Overflights"). This file collects those tables, and sets the **vNAS Restrictions** beside them as an independent second source. The SOP text is the order; vNAS is the adaptation.

Source: Louisville (SDF) ATCT SOP, saved 2026-10-18 (last changelog entry 2026-09-04); vNAS ZID record lastUpdatedAt 2026-10-17T02:35:43.475Z.

**The SOP says controllers may also reference the ICT for a full list of restrictions and handoffs. It is not in the pull** (gap analysis, Part 1).

---

## Departures - handoffs to ZID

*Source: SDF SOP 7 Approach Control > Departures*

| Route | To | Altitude | Notes |
| --- | --- | --- | --- |
| North (RDHSE, SPILR) | ZID (ABB 18) | Climbing 13000 | SDF may clear no further than direct RDHSE, BNGIN. ZID control for turns AOA 10000. |
| South (HIDEY) | ZID (EWO 19) | Climbing 13000 | SDF may clear no further than direct HIDEY. ZID control for turns AOA 12000. |
| East (EEVAA, LOKRD) | ZID (LOZ 21) | Climbing 13000 | SDF may clear no further than direct CHALI, LOKRD. ZID control for turns AOA 10000. |
| West (GTGON, LLIZY) | ZID (EVV 17) | Climbing 13000 | SDF may clear no further than direct GTGON or LLIZY. ZID control for turns AOA 12000. |

Departures on an RNAV SID are told "climb via SID", which authorizes 13000 while meeting the altitude restrictions that keep them clear of arrivals. "Climb and maintain 13000" is permitted but the controller must watch separation from arrivals. Departures filed below 13000 are cleared on course, climbing to the filed altitude, and may be handed to a neighboring ATCT instead of ZID. Departures from the LOU and FTK ATCTs are handed off per their own SOPs (not pulled).

## Arrivals - handoffs from ZID (aircraft AOA 14000)

*Source: SDF SOP 7 Approach Control > Arrivals*

| Destination | Route | From | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF+ | DLAMP# or ANCHR DLAMP IIU | ZID (CVG 22) | Descend via, or DLAMP @ 14000/280 IAS | Jet only. Join by DLAMP. SDF control for right turns at DLAMP. |
| SDF+ | JMONY# or GDAYE JMONY IIU | ZID (HUF 35) | Descend via, or JMONY @ 14000/280 IAS | Jet only. Join by LISZA. SDF control for left turns at LISZA. |
| SDF+ | LEDDL# or COBBZ LEDDL IIU | ZID (LOZ 21) | Descend via, or LEDDL @ 14000/280 IAS | Jet only. Join by COBBZ. SDF control for left turns at COBBZ. |
| SDF+ | MBELL# or JIINN MBELL IIU | ZID (EVV 17) | Descend via, or MBELL @ 14000/280 IAS | Jet only. Join by JIINN. SDF control for left turns at JIINN. |
| SDF+ | All via EWO sector | ZID (EWO 19, LOZ 21) | AOB 10000 | SDF control for turns and descent. |

Bold denotes primary jet flow in the wiki; the bold is lost in the saved page.

## Overflights

*Source: SDF SOP 7 Approach Control > Overflights*

| Destination | Route | From | Altitude | To | Altitude | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| LEX | BUSSN or FEDRA | ZID | IIU@140 | LEXz | 110 | ZID may clear direct BUSSN. SDF may clear direct destination |

## SDF and CVG

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF to CVG | CVG | Direct | AOB 9000 (to CVGz) |  |
| SDF to CVG | CVG sats | Direct or filed | AOB 9000 (to CVGz) |  |
| CVG to SDF | SDF+ jet | DLAMP | At 10000 (from CVGz) |  |
| CVG to SDF | SDF+ prop | Direct | AOB 8000 (from CVGz) |  |

## SDF and EVV

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| EVV to SDF | SDF, LOU, JVY, BFR, EKX, FTK, IMS, SER | Direct | AOB 9000 (from EVVz) |  |
| EVV to SDF | Aircraft not landing in SDF | Any | AOB 11000 (from EVVz) | To prevent conflict with arrivals and departures |
| SDF to EVV | HNB, TEL, KY8 | Direct | Descending 4000 (to EVVz) |  |
| SDF to EVV | EVV, OWB | Direct | Any (to EVVz) |  |

## SDF and HUF

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| HUF to SDF | SDF, LOU, JVY, BFR, EKX, FTK, IMS, SER | Direct | AOB 9000 (from HUFz) |  |
| HUF to SDF | Aircraft not landing in SDF | Any | AOB 11000 (from HUFz) | To prevent conflict with arrivals and departures |
| SDF to HUF | BMG | Direct | AOB 5000 (to HUFz) |  |
| SDF to HUF | HUF, RSV, SIV | Direct | AOB 10000 (to HUFz) |  |

## SDF and IND

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| IND to SDF | SDF, BFR, FRH, IMS, JVY, SER, LOU | Direct | AOB 9000 (from INDz) | SDF control for descent and 30 degree turns |
| SDF to IND | IND, BAK, BMG, GEZ, HBE, HFY, SER, I34 | Direct | AOB 9000 (to INDz) | IND control for descent and 30 degree turns |
| SDF to IND | OVO | Direct destination or direct NURBY (RNAV 5) | 4000 (to INDz) | IND control for descent and turns |

## SDF and LEX

*Source: SDF SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| SDF to LEX | LEX | BUSSN or FEDRA | 11000 (to LEXz) | LEX control for right turns up to 10 degrees and descent |
| SDF to LEX | LEX | Direct | AOB 9000 (to LEXz) |  |
| SDF to LEX | FFT | Direct | Descending 5000 (to LEXz) |  |
| SDF to LEX | LEX sats | Direct | AOB 9000 (to LEXz) |  |
| LEX to SDF | SDF, LOU, JVY, IMS, BRY, BFR, SER, 6I2, FTK, EKX | Direct or filed | AOB 8000 (from LEXz) |  |

## Inter-facility rules

*Source: SDF SOP 8 Inter-Facility Coordination*

- CVG, EVV, HUF and IND each release control for turns up to 30 degrees on contact with SDF, and, if landing within their respective airspace, descent on contact (IND: turns only). LEX releases control for turns up to 30 degrees and descent on contact.
- CVGz must point out IMS RNAV runway 21 arrivals to SDFz and verbally coordinate issuing the approach clearance and IFR cancellation.
- For BFR RNAV 13 or RNAV 31 arrivals, the controller issuing the approach clearance must coordinate with the other controller (SDF/HUF) to block the airspace (including for the published missed) and must advise the other controller of IFR cancellation.
- For SER RNAV 14 or RNAV 23 arrivals, IND must coordinate with SDF to block the airspace (including for the published missed), provide the SDF frequency for missed approach or IFR cancellation, and SDF must advise IND of the cancellation when received.
- If the JPG MOA and/or the RACER MOA is active, each facility must issue aircraft a heading to remain West of the lateral boundary of the MOA(s). This heading does not need to be coordinated.
- Arrivals, overflights and departures are handed off via the sections above.

## vNAS Restrictions that involve SDF (36)

Field names are the record's own (`owningFacilityId`, `requestingFacilityId`, `flightType`, `groupName`, `route`, `applicableAirports`, `altitudeRestriction`, `owningSectorIds`, `requestingSectorIds`, `notes`). **These are not merged into the SOP tables above and have not been reconciled row by row.**

| Owner > requester | Flight | Group | Route | Airports | Altitude | Sectors (owner > requester) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ZID > SDF | Arrivals | FEDRA | IIU FEDRA | LEX | At 14000 | 17 > 1D | General: Automated pointout acceptance by ZID20 is approval to issue restriction |
| ZID > SDF | Arrivals | JMONY Gate | JMONY# | SDF+ [Rnav/Jets] | DescendingVia | 35 > 1I | Ait: AIT ZID35 > ZID18 > SDF1I<br>General: SDF control for left turns at LISZA |
| ZID > SDF | Arrivals | DLAMP Gate | DLAMP# | SDF [Jets/Rnav] | DescendingVia | 22 > 1A | Ait: AIT ZID22 > ZID20 > SDF1A<br>Control: SDF control for right turns at DLAMP |
| ZID > SDF | Arrivals | DLAMP Gate | JIMUR ANCHR DLAMP IIU | SDF+ [Jets/Rnav] | At 14000 | 22 > 1A | Ait: AIT ZID22 > ZID20 > SDF1A<br>General: RNAV aircraft unable PBN STAR |
| SDF > CVG | Arrivals |  | Direct | CVG | AtOrBelow 9000 | 1D > 1B/1S |  |
| CVG > SDF | Arrivals | DLAMP Gate | DLAMP  | SDF+ [Jets/Rnav] | At 10000 | 1B > 1A |  |
| CVG > SDF | Arrivals |  | Direct | SDF+ [Props] | AtOrBelow 8000 | 1B > 1D |  |
| SDF > CVG | Arrivals |  | Direct or as filed | CVG Sats | AtOrBelow 9000 | 1D > 1B/1S |  |
| EVV > SDF | Arrivals |  | Direct | SDF LOU JVY BFR EKX FTK IMS SER | AtOrBelow 9000 | 1E > 1B |  |
| EVV > SDF |  |  |  | Aircraft not landing in SDF airspace | AtOrBelow 11000 | 1E > 1B | General: Restriction is to avoid conflict with departures |
| SDF > EVV | Arrivals |  | Direct | HNB TEL KY8 | DescendingTo 4000 | 1B > 1E |  |
| SDF > EVV | Arrivals |  | Direct | EVV OWB |  | 1B > 1E |  |
| SDF > IND | Arrivals |  | Direct | IND BAK BMG GEZ HBE HFY SER I34 | AtOrBelow 9000 | 1B/1D > 1E/1W | Control: IND control for descent and 30 degree turns |
| SDF > IND | Arrivals |  | Direct destination or direct NURBY (RNAV 5) | OVO | At 4000 | 1D > 1E | Control: IND control for descent and turns |
| IND > SDF | Arrivals |  | Direct | SDF BFR FRH IMS JVY SER LOU | AtOrBelow 9000 | 1E/1W > 1B/1D | Control: SDF control for descent and 30 degree turns |
| LEX > SDF | Arrivals |  |  | SDF LOU JVY IMS BRY BFR SER 6I2 FTK EKX | AtOrBelow 8000 | 1W > 1D |  |
| SDF > LEX | Arrivals | BUSSN | BUSSN | LEX | At 11000 | 1D > 1W | Control: LEX control for right turns up to 10 degrees and descent |
| SDF > LEX | Arrivals | FEDRA | FEDRA | LEX | At 11000 | 1D > 1W | Control: LEX control for right turns up to 10 degrees and descent |
| SDF > LEX | Arrivals |  | Direct | LEX | AtOrBelow 9000 | 1D > 1W |  |
| SDF > LEX | Arrivals |  | Direct | FFT | DescendingTo 5000 | 1D > 1W |  |
| SDF > LEX | Arrivals |  | Direct | DVK IOB RGA I50 0I8 27K 37KY 79KY 88KY | AtOrBelow 9000 | 1D > 1W |  |
| SDF > ZID | Departures |  | Departures via RDHSE or SPILR | SDF+ | ClimbingTo 13000 | 1B > 18 | Control: SDF may clear no further than direct RDHSE, BNGIN. ZID control for turns AOA 10000. |
| SDF > ZID | Departures |  | Departures via HIDEY | SDF+ | ClimbingTo 13000 | 1B > 19 | Control: SDF may clear no further than direct HIDEY. ZID control for turns AOA 12000. |
| SDF > ZID | Departures |  | Departures via EEVAA or LOKRD | SDF+ | ClimbingTo 13000 | 1D > 21 | Control: SDF may clear no further than direct CHALI, LOKRD. ZID control for turns AOA 10000. |
| SDF > ZID | Departures |  | Departures via GTGON or LLIZY | SDF+ | ClimbingTo 13000 | 1B > 17 | Control: SDF may clear no further than direct GTGON or LLIZY. ZID control for turns AOA 12000. |
| ZID > SDF | Arrivals | JMONY Gate | JMONY IIU | SDF+ [Rnav/Jets] | At 14000 | 35 > 1I | General: RNAV aircraft unable PBN STAR<br>Control: SDF control for left turns at LISZA |
| ZID > SDF | Arrivals | LEDDL Gate | LEDDL1 | SDF+ [Rnav/Jets] | DescendingVia | 21 > 1A | Control: SDF control for left turns at COBBZ |
| ZID > SDF | Arrivals | LEDDL Gate | LEDDL IIU | SDF+ [Rnav] | At 14000 | 21 > 1A | General: RNAV aircraft unable PBN STAR |
| ZID > SDF | Arrivals | MBELL Gate | MBELL# | SDF+ [Rnav/Jets] | DescendingVia | 17 > 1I | Control: ZID may clear direct JIINN<br>Control: SDF control for left turns at JIINN |
| ZID > SDF | Arrivals | MBELL Gate | MBELL IIU | SDF+ [Rnav] | At 14000 | 17 > 1I | General: RNAV aircraft unable PBN STAR |
| ZID > SDF | Arrivals |  |  | SDF+ | AtOrBelow 10000 | 19 > 1B/1D | Control: SDF control for turns and descent |
| ZID > SDF | Arrivals | BUSSN | IIU BUSSN | LEX | DescendingTo 14000 | 18 > 1D | General: ZID must clear direct BUSSN prior to communication transfer<br>General: ZID must descend aircraft early enough that they will be able to cross BUSSN at 11000 |
| HUF > SDF | Arrivals |  | Direct | SDF LOU JVY BFR EKX FTK IMS SER | AtOrBelow 9000 | 1Q > 1B |  |
| HUF > SDF |  |  |  | Aircraft not landing in SDF airspace | AtOrBelow 11000 | 1Q > 1B | General:  Restriction is to avoid conflict with departures |
| SDF > HUF | Departures |  | Direct | BMG | AtOrBelow 5000 | 1B > 1Q |  |
| SDF > HUF | Arrivals |  | Direct | HUF RSV SIV | AtOrBelow 10000 | 1B > 1Q |  |

## Handoff IDs

See `../_shared/claude_ZID_Handoff_ID_Reference.md` for the composition rules. Outbound coordinations this facility owns, with the ID typed from a SDF seat:

| To | Sectors | ID typed |
| --- | --- | --- |
| CVG | 1B 1S | Δ1B Δ1S |
| EVV | 1E | Δ3E |
| IND | 1E 1W | Δ5E Δ5W |
| IND | 1E | Δ5E |
| LEX | 1W | Δ2W |
| ZID | 18 | C18 |
| ZID | 19 | C19 |
| ZID | 21 | C21 |
| ZID | 17 | C17 |
| HUF | 1Q | Δ4Q |

The SOP chapter 8 lists CVG, EVV, HUF, IND, LEX and ZID as SDF's interfaces. The ZID section carries no table of its own: arrivals, overflights and departures for ZID are handed off via chapter 7. The ZID sectors named there (ABB 18, EWO 19, LOZ 21, EVV 17, CVG 22, HUF 35) are the vNAS sectors Nabb 18, New Hope 19, London 21, Evansville 17, Covington 22 and Terre Haute 35.
