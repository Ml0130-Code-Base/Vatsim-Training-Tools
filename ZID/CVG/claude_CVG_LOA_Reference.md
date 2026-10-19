# CVG LOA Reference - inter-facility coordination

**There are no separate letters of agreement for CVG in the Indy Center wiki pull.** The facility's coordination with its neighbours is chapter 8 of the SOP ("Inter-Facility Coordination") and chapter 7 ("Departures", "Arrivals", "Overflights"). This file collects those tables, and sets the **vNAS Restrictions** beside them as an independent second source. The SOP text is the order; vNAS is the adaptation.

Source: Cincinnati (CVG) ATCT SOP, saved 2026-10-18 (last changelog entry 2026-09-03); vNAS ZID record lastUpdatedAt 2026-10-17T02:35:43.475Z.

**The SOP says controllers may also reference the ICT for a full list of restrictions and handoffs. It is not in the pull** (gap analysis, Part 1).

---

## Departures - handoffs to other facilities

*Source: CVG SOP 7 Approach Control > Departures*

| Route | To | Altitude | Notes |
| --- | --- | --- | --- |
| OXD departures to the north | CMHz | Heading 360 climbing 3000 | CMH control for climb and turns |
| North (HAGOL, BNGLE or RIKLE) | ZID (CVG 22) | Climbing 13000 | CVG may clear direct HAGOL, BNGLE or RIKLE |
| South (CHCLL, SILKS, KENLN) | ZID (LEX 20) | Climbing 13000 | CVG may clear direct CHCLL, SILKS or KENLN |
| East (GIPLE, ROCKT) | ZID (PIK 69) | Climbing 13000 | CVG may clear direct WADAL or GIPLE |
| West (LOVEY) | ZID (SHB 34) | Climbing 13000 | CVG may clear direct LOVEY |
| MIE (JBNCH or MIE) | ZID (SHB 34) | Climbing 13000 | CVG may clear direct JBNCH or MIE |
| Others | ZID | Climbing 13000 | On course |

Departures filed below 13000 are cleared on course and climbing to the filed altitude and may be handed to a neighboring ATCT instead of ZID. Departures from the LUK ATCT are handed off per the LUK ATCT SOP (not pulled). Typos as written: "dircect" throughout.

## Arrivals - handoffs from other facilities

*Source: CVG SOP 7 Approach Control > Arrivals*

| Landing | Route | From | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG | TIGRR# or TIGRR | ZID (CVG 22) | Descending via, or TIGRR at 14000 | ZID may not clear further than TIGRR |
| CVG and sats | CEGRM# or CEGRM | ZID (SHB 34) | Descending via, or CEGRM at 14000 | ZID may not clear further than CEGRM |
| CVG and sats | GAVNN# or GAVNN | ZID (RIV 26) | Descending via, or GAVNN at 10000 (jet) or 9000 (prop) | ZID may not clear further than GAVNN |
| CVG and sats | JAKIE# or JAKIE | ZID (RIV 26) | Descending via, or JAKIE at 14000 (jet) or 11000 (prop) | ZID may not clear further than JAKIE. When CVG is landing runway 27/West, ZID must route arrivals via GAVNN. |
| CVG and sats | SARGO# or SARGO | ZID (ABB 18) | Descending via, or SARGO at 14000 | ZID may not clear further than TIGRR [sic - the row is SARGO] |
| CVG and sats | ARBAS RID MEEKR | CMHz | 10000 |  |
| CVG and sats | MXQ | CMHz | 10000 |  |
| CVG and sats | Direct | CMHz | 4000 or 6000 | CVG control for descent and turns |
| CVG and sats | All | INDz | 5000 or 7000 | CVG control for turns up to 30 degrees |
| CVG and sats | Direct | LEXz | 6000 |  |
| CVG sats | MXQ or HEDEE or HEDEE# | CMHz | 10000 |  |
| CVG sats | BEAER BOSTR | ZID (RIV 26) | AOB 8000 |  |
| CVG sats | ARBAS RID MEEKR | CMHz | 10000 |  |
| CVG sats | Direct | CMHz | 4000 or 6000 |  |
| CVG sats | All | INDz | AOB 7000 | CVG control for descent and turns up to 30 degrees |
| CVG sats | All | LEXz | AOB 7000 |  |

The wiki groups the rows under "Landing CVG", "Landing CVG and Sats" and "CVG Sats"; the group is the first column here. Bold (primary jet flow) is lost in the saved page. Satellite arrival procedures were updated 2026-04-04 (changelog).

## Overflights

*Source: CVG SOP 7 Approach Control > Overflights*

| Destination | Route | From | Altitude | To | Altitude | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| ILN | SARGO ROYYZ | ZID (ABB 18) | ROYYZ @ 14000 | CMHz | 5000 |  |
| ILN | FLM | ZID (LEX 20) | FLM @ 14000 | CMHz | 5000 |  |
| LEX | JIMUR | ZID (CVG 22) | JIMUR @ 14000 | LEXz | AOB 10000 | Correct altitude for DOF |
| SDF+ | JIMUR DLAMP (prop) | ZID (CVG 22) | JIMUR @ 14000 | SDFz | AOB 10000 |  |
| DAY, FFO | LODLL HICKS FIITZ | ZID (RIV 26) | HICKS @ 14000 | CMHz | 11000 |  |

## CVG and CMH

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to CMH | DAY, FFO, MGY | FIITZ | 11000 (to CMHz) |  |
| CVG to CMH | DAY, FFO | Other | 5000 or 7000 (to CMHz) | CMH control for turns and descent |
| CVG to CMH | DAY sats | All | 5000 (to CMHz) | CMH control for turns and descent |
| CVG to CMH | ILN | SARGO ROYYZ | 5000 (to CMHz) |  |
| CVG to CMH | ILN | FLM | 5000 (to CMHz) |  |
| CVG to CMH | OXD departures | to the north | Climbing 3000 heading 360 (to CMHz) | CMH control for climb and turns |
| CMH to CVG | CVG+ | RID MEEKR | 10000 (from CMHz) |  |
| CMH to CVG | CVG+ | MXQ or HEDEE# | 10000 (from CMHz) |  |
| CMH to CVG | CVG+ | Direct destination | 4000 or 6000 (from CMHz) | CVG control for turns and descent |
| CMH to CVG | MWO, MGY, I68 departures | to the south | Climbing 4000 heading 180 (from CMHz) | CVG control for climb and turns |
| CMH to CVG | ILN departures | CVG or FLM | Climbing 8000 heading 220 (from CMHz) | CVG control for climb and turns |

## CVG and IND

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to IND | IND | DECEE VHP | 10000 (to INDz) | IND control for speed and turns up to 30 degrees |
| CVG to IND | IND | Direct | AOB 8000 (to INDz) | IND control for speed and turns up to 30 degrees |
| CVG to IND | IND sats | All | AOB 8000 (to INDz) | IND control for descent and turns up to 30 degrees |
| IND to CVG | CVG sats | All | AOB 7000 (from INDz) | CVG control for descent and turns up to 30 degrees |

## CVG and LEX

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to LEX | LEX | All | AOB 10000 (to LEXz) | Correct altitude for DOF |
| CVG to LEX | 0I8, 27K, FFT | All | 4000 or 5000 (to LEXz) |  |
| LEX to CVG | CVG | Direct | 6000 (from LEXz) |  |
| LEX to CVG | CVG sats | All | AOB 7000 (from LEXz) |  |

## CVG and SDF

*Source: CVG SOP 8 Inter-Facility Coordination*

| Direction | Destination | Route | Altitude | Notes |
| --- | --- | --- | --- | --- |
| CVG to SDF | SDF+ jet | DLAMP | At 10000 (to SDFz) |  |
| CVG to SDF | SDF+ prop | Direct | AOB 8000 (to SDFz) |  |
| SDF to CVG | CVG | Direct | AOB 9000 (from SDFz) |  |
| SDF to CVG | CVG sats | Direct | AOB 9000 (from SDFz) |  |

## Inter-facility rules

*Source: CVG SOP 8 Inter-Facility Coordination*

- Both CVG and SDF release control for turns up to 30 degrees and, if landing within their respective airspace, descent on contact.
- CVGz must point out IMS RNAV runway 21 arrivals to SDFz and verbally coordinate issuing the approach clearance and IFR cancellation.
- Arrivals, overflights and departures are handed off via the sections above.

## vNAS Restrictions that involve CVG (47)

Field names are the record's own (`owningFacilityId`, `requestingFacilityId`, `flightType`, `groupName`, `route`, `applicableAirports`, `altitudeRestriction`, `owningSectorIds`, `requestingSectorIds`, `notes`). **These are not merged into the SOP tables above and have not been reconciled row by row.**

| Owner > requester | Flight | Group | Route | Airports | Altitude | Sectors (owner > requester) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ZID > CVG | Arrivals | FIITZ | LODLL HICKS FIITZ | DAY+ | At 14000 | 20 > 1W |  |
| ZID > CVG | Arrivals | JIMUR | JIMUR | LEX | At 14000 | 22 > 1W | Ait: AIT ZID22 > ZID20 > CVG1W |
| ZID > CVG | Arrivals | DLAMP Gate | JIMUR ANCHR DLAMP IIU | SDF+ [Props/Rnav] | At 14000 | 22 > 1B |  |
| CMH > CVG | Departures |  | Departures to the South | MWO MGY I68 | ClimbingTo 4000 | 1M > 1L | Control: CVG control for climb and turns |
| CMH > CVG | Departures |  | Departures via CVG or FLM | ILN | ClimbingTo 8000 | 1X > 1W | General: CVG control for climb and turns |
| CVG > CMH | Departures |  | Departures to the North | OXD | ClimbingTo 3000 | 1L > 1M | Control: CMH control for climb and turns |
| CVG > ZID | Departures | NORTH Gate | Departures via BNGLE or HAGOL or RIKLE | CVG+ | ClimbingTo 13000 | 1W > 22 | General: CVG may clear direct BNGLE, HAGOL or RIKLE |
| CVG > ZID | Departures | SOUTH GATE | Departures via KENLN | CVG+ | ClimbingTo 13000 | 1W > 20 | General: CVG may clear direct KENLN |
| CVG > ZID | Departures | SOUTH GATE | Departures via CHCLL or SILKS | CVG+ | ClimbingTo 13000 | 1B > 22 | General: CVG may clear direct CHCLL or SILKS |
| CVG > ZID | Departures | EAST GATE | Departures via GIPLE or ROCKT | CVG+ | ClimbingTo 13000 | 1W > 69 | General: CVG may clear direct WADAL or GIPLE |
| CVG > ZID | Departures | MIE Gate | Departures via LOVEY or JBNCH or MIE | CVG+ | ClimbingTo 13000 | 1B > 34 | General: CVG may clear direct LOVEY or JBNCH or MIE |
| ZID > CVG | Arrivals | CEGRM Gate | CEGRM# | CVG+ [Rnav] | DescendingVia | 34 > 1N | General: ZID may clear direct CEGRM<br>General: RNAV1<br>Ait: Passback with IND |
| ZID > CVG | Arrivals | CEGRM Gate | CEGRM | CVG+ [Rnav] | At 14000 | 34 > 1N | General: RNAV aircraft unable PBN STAR |
| ZID > CVG | Arrivals | GAVNN Gate | GAVNN# | CVG+ [Rnav/Jets] | DescendingVia | 26 > 1S | General: ZID may clear direct GAVNN |
| ZID > CVG | Arrivals | GAVNN Gate | GAVNN | CVG+ [Rnav/Jets] | At 10000 | 26 > 1S | General: RNAV aircraft unable PBN STAR |
| ZID > CVG | Arrivals | GAVNN Gate | GAVNN | CVG+ [Rnav/Props] | At 9000 | 26 > 1S |  |
| ZID > CVG | Arrivals | JAKIE Gate | JAKIE# | CVG+ [Rnav] | DescendingVia | 26 > 1S | General: ZID may clear direct JAKIE<br>Flow: When CVG landing Runway 27/West, ZID must route arrivals via GAVNN STAR |
| ZID > CVG | Arrivals | JAKIE Gate | JAKIE | CVG+ [Rnav/Jets] | At 14000 | 26 > 1S | Flow: When CVG landing Runway 27/West, ZID must route arrivals via GAVNN<br>General: RNAV aircraft unable PBN STAR |
| ZID > CVG | Arrivals | JAKIE Gate | JAKIE | CVG+ [Rnav/Props] | At 11000 | 26 > 1S | Flow: When CVG landing Runway 27/West, ZID must route arrivals via GAVNN |
| ZID > CVG | Arrivals | TIGRR Gate | TIGRR# | CVG [Rnav/Jets] | DescendingVia | 22 > 1N | General: ZID may clear direct TIGRR |
| ZID > CVG | Arrivals | TIGRR Gate | TIGRR | CVG [Rnav] | At 14000 | 22 > 1N | General: RNAV aircraft unable PBN STAR |
| ZID > CVG | Arrivals | SARGO Gate | SARGO# | CVG+ [Rnav] | DescendingVia | 18 > 1S | General: ZID may clear direct SARGO |
| ZID > CVG | Arrivals | SARGO Gate | SARGO | CVG+ [Rnav] | At 14000 | 18 > 1S | General: RNAV aircraft unable PBN STAR |
| CMH > CVG | Arrivals |  | Direct | CVG+ | AnyOf 4000 / 6000 | 1M/1U/1X > 1L | Control: CVG control for descent and turns |
| IND > CVG | Arrivals |  |  | CVG | AnyOf 5000 / 7000 | 1S > 1B | Control: CVG control for turns up to 30 degrees |
| LEX > CVG | Arrivals |  |  | CVG | At 6000 | 1W > 1B/1L |  |
| SDF > CVG | Arrivals |  | Direct | CVG | AtOrBelow 9000 | 1D > 1B/1S |  |
| IND > CVG | Arrivals |  |  | CVG Sats | AtOrBelow 7000 | 1S > 1B | Control: CVG control for descent and turns up to 30 degrees |
| LEX > CVG | Arrivals |  |  | CVG Sats | AtOrBelow 7000 | 1W > 1B/1L |  |
| ZID > CVG | Arrivals |  | BEAER BOSTR | CVG Sats | AtOrBelow 8000 | 26 > 1L/1S |  |
| ZID > CVG | Arrivals |  | SARGO ROYYZ | ILN [Rnav] | At 14000 | 18 > 1W |  |
| CVG > CMH | Arrivals | FIITZ | HICKS FIITZ | DAY+ | At 11000 | 1W > 1X |  |
| CVG > CMH | Arrivals |  |  | DAY FFO | AnyOf 5000 / 7000 | 1L > 1X/1M | Control: CMH control for turns and descent |
| CVG > CMH | Arrivals |  | SARGO ROYYZ | ILN [Rnav] | At 5000 | 1L > 1M |  |
| CVG > CMH | Arrivals |  | FLM | ILN | At 5000 | 1L > 1M |  |
| CVG > CMH | Arrivals |  |  | CEV ILN GDK MGY MWO RID I66 I68 | AtOrBelow 5000 | 1L > 1M |  |
| CVG > IND | Arrivals | GIIBS Gate | DECEE VHP | IND | At 10000 | 1B > 1D | Control: IND control for speed and turns up to 30 degrees |
| CVG > IND | Arrivals |  | Direct | IND | AtOrBelow 8000 | 1B > 1S | Control: IND control for speed and turns up to 30 degrees |
| CVG > IND | Arrivals |  |  | EYE GEZ HFY MQJ TYQ UMP | AtOrBelow 8000 | 1B > 1S | Control: IND control for descent and turns up to 30 degrees |
| CVG > LEX | Arrivals |  |  | LEX | AtOrBelow 10000 | 1L/1B/1W/1S > 1W | General: Correct altitude for direction of flight |
| CVG > LEX | Arrivals |  |  | FFT 0I8 27K | AnyOf 4000 / 5000 | 1L/1B > 1W |  |
| CVG > SDF | Arrivals | DLAMP Gate | DLAMP  | SDF+ [Jets/Rnav] | At 10000 | 1B > 1A |  |
| CVG > SDF | Arrivals |  | Direct | SDF+ [Props] | AtOrBelow 8000 | 1B > 1D |  |
| SDF > CVG | Arrivals |  | Direct or as filed | CVG Sats | AtOrBelow 9000 | 1D > 1B/1S |  |
| CMH > CVG | Arrivals | MEEKR Gate | RID MEEKR | CVG+ | At 10000 | 1U > 1N |  |
| CMH > CVG | Arrivals | TIGRR Gate | MXQ | CVG+ | At 10000 | 1X > 1N |  |
| ZID > CVG | Arrivals |  | FLM | ILN | At 14000 | 20 > 1W |  |

## Handoff IDs

See `../_shared/claude_ZID_Handoff_ID_Reference.md` for the composition rules. Outbound coordinations this facility owns, with the ID typed from a CVG seat:

| To | Sectors | ID typed |
| --- | --- | --- |
| CMH | 1M | Δ1M |
| ZID | 22 | C22 |
| ZID | 20 | C20 |
| ZID | 69 | C69 |
| ZID | 34 | C34 |
| CMH | 1X | Δ1X |
| CMH | 1X 1M | Δ1X Δ1M |
| IND | 1D | Δ4D |
| IND | 1S | Δ4S |
| LEX | 1W | Δ2W |
| SDF | 1A | Δ3A |
| SDF | 1D | Δ3D |

The SOP chapter 8 lists CMH, IND, LEX, SDF and ZID as CVG's interfaces. The ZID section carries no table of its own: arrivals, overflights and departures for ZID are handed off via chapter 7. The ZID sectors named there (CVG 22, LEX 20, PIK 69, SHB 34, RIV 26, ABB 18) are the vNAS sectors Covington 22, Lexington 20, Pike 69, Shelbyville 34, River 26 and Nabb 18. **The SOP's South gate disagrees with vNAS** (see Part 4 of the gap analysis).
