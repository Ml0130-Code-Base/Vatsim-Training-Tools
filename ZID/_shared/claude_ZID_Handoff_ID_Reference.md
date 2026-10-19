# ZID Handoff ID Reference - IND, SDF and CVG

A handoff ID is **not a property of the receiving position.** It is a property of the *pair* - who is sending and who is receiving. This document gives the composition rules and every value the three ZID terminal decks (IND, SDF, CVG) need, from the vNAS facility record for ZID (`../_vnas/ZID_vnas.json`, `lastUpdatedAt` **2026-10-17T02:35:43.475Z**).

**Provenance of the rules.** The composition rules are those documented at `docs.virtualnas.net` (`crc/stars`, `crc/eram`, `data-admin/facilities`). **They were not re-pulled for ZID.** They are carried from `ZMP/R90/claude_ZMP_Handoff_ID_Reference.md`, which quotes them and records the pull of 2026-09-01; the ZID values below were pulled 2026-10-18. A rule changed on the CRC side since 2026-09-01 would not be reflected here. **Behaviour from that document, values from vNAS - and a handoff ID is never taken from community geometry or from SOP prose.**

---

## 1. The composition rules, from a ZID TRACON seat (STARS)

| Receiver | ID form | Example |
| --- | --- | --- |
| Same facility, same subset | sector letter alone | `B` |
| Same facility, different subset | subset + sector letter | `2B` (no ZID terminal TCP is outside subset 1, so a bare letter always works inside IND, SDF and CVG) |
| Another STARS facility | `Δ` + that facility's handoff number + the receiving sector letter | `Δ2B` - IND to the CVG TCP 1B. The worked examples in the ZMP document are `Δ1A` and `Δ1G` |
| The host ARTCC (ZID) | `C` + two-digit sector | `C34` |
| A non-host ARTCC | that ARTCC's NAS ID + two-digit sector | `G35` - ZAU sector 35 |

`Δ` is the delta and is bound to the **backtick** key in CRC. The sector may be omitted when only one position is open in the receiving ARTCC; the Controller List prints the full ID, so the short form is a convenience and never the thing to learn first.

**The `C` collision.** A TRACON whose host ARTCC is not ZOB, but which hands off to ZOB, must use ZOB's NAS ID for ZOB and `C` for its host - and `C` is ZOB's NAS ID. **The three ZID terminals do not neighbour ZOB** (IND: CMH, CVG, FWA, GUS, HUF, SDF, ZAU; SDF: CVG, EVV, HUF, IND, LEX; CVG: CMH, IND, LEX, SDF), so the collision is **inert** for all three. It is one adaptation change away from being live.

## 2. NAS IDs

`eramConfiguration.nasId` from each ARTCC's own vNAS record, pulled 2026-10-18 (record `lastUpdatedAt` in the last column). Only ZID's record is committed.

| ARTCC | NAS ID | Record lastUpdatedAt | Needed for |
| --- | --- | --- | --- |
| **ZID** (host) | **I** | 2026-10-17T02:35:43.475Z | the `I` in a handoff written by ZID |
| ZAU - Chicago | **G** | 2026-10-17T03:38:42Z | IND departures via the MEARZ gate: ZAU sectors 35 and 51 (`G35`, `G51`) |
| ZOB - Cleveland | **C** | 2026-10-19T02:13:59Z | the collision above (inert) |
| ZKC - Kansas City | **K** | 2026-10-17T02:03:18Z | neighbour of ZID, not of the three terminals |
| ZME - Memphis | **M** | 2026-10-17T17:09:22Z | same |
| ZTL - Atlanta | **T** | 2026-10-14T04:34:35Z | same |
| ZDC - Washington | **W** | 2026-10-15T15:51:53Z | same |

Re-pull: `for a in ZID ZAU ZOB ZKC ZME ZTL ZDC; do curl -sS -A "Mozilla/5.0" -o artcc_$a.json "https://data-api.vnas.vatsim.net/api/artccs/$a"; done`

## 3. The three facilities - handoff numbers and TCPs

### IND - Indianapolis ATCT/TRACON

**Handoff numbers** (`starsHandoffIds`): CMH = Δ1, CVG = Δ2, FWA = Δ5, GUS = Δ4, HUF = Δ3, SDF = Δ6.

**TCPs** (`tcps`; a TCP with a parent consolidates into it when closed):

| TCP | Subset | Sector | Parent |
| --- | --- | --- | --- |
| 1B | 1 | B | E |
| 1D | 1 | D | E |
| 1E | 1 | E | - |
| 1F | 1 | F | E |
| 1I | 1 | I | E |
| 1N | 1 | N | S |
| 1S | 1 | S | E |
| 1T | 1 | T | - |
| 1W | 1 | W | E |
| 1X | 1 | X | Y |
| 1Y | 1 | Y | - |

**From a ZID sector (ERAM Field E):** format `OneLetterAndSubset`, STARS ID `INA`, single character `I` - so a ZID sector types the character, the subset and the sector letter: `I1X`. (`neighboringStarsConfigurations`.)

**Seats by TCP:**

| Callsign | Position | Frequency | TCP | Parent TCP |
| --- | --- | --- | --- | --- |
| IND_E_APP | Departure Radar East | 124.950 | 1E | - |
| IND_E_TWR | Local Control East | 120.900 | 1Y | - |
| IND_GND | Ground Control | 121.900 | 1T | - |
| IND_DEL | Clearance Delivery | 128.750 | 1T | - |
| IND_FX_RMP | FedEx Ramp Control | 130.800 | - | - |
| IND_W_APP | Departure Radar West | 119.050 | 1W | E |
| IND_D_APP | Feeder Radar East | 128.175 | 1D | E |
| IND_B_APP | Feeder Radar West | 121.100 | 1B | E |
| IND_F_APP | Final Radar East | 123.950 | 1F | E |
| IND_I_APP | Final Radar West | 120.525 | 1I | E |
| IND_N_APP | Satellite Radar North | 124.650 | 1N | S |
| IND_S_APP | Satellite Radar South | 127.150 | 1S | E |
| IND_EM_APP | IND GUARD | 121.500 | - | - |
| IND_W_TWR | Local Control West | 127.825 | 1X | Y |
| BAK_TWR | Local Control | 118.600 | - | - |
| BAK_GND | Ground Control | 121.950 | - | - |
| MIE_TWR | Local Control | 120.100 | - | - |
| MIE_GND | Ground Control | 121.950 | - | - |
| AID_TWR | Local Control | 126.000 | - | - |
| AID_GND | Ground Control | 121.600 | - | - |
| HBE_TWR | Local Control | 126.200 | - | - |

### SDF - Louisville ATCT/TRACON

**Handoff numbers** (`starsHandoffIds`): CVG = Δ1, EVV = Δ3, HUF = Δ4, IND = Δ5, LEX = Δ2.

**TCPs** (`tcps`; a TCP with a parent consolidates into it when closed):

| TCP | Subset | Sector | Parent |
| --- | --- | --- | --- |
| 1A | 1 | A | D |
| 1B | 1 | B | D |
| 1D | 1 | D | - |
| 1E | 1 | E | D |
| 1I | 1 | I | D |
| 1L | 1 | L | T |
| 1T | 1 | T | - |
| 1W | 1 | W | D |
| 1Z | 1 | Z | - |

**From a ZID sector (ERAM Field E):** format `OneLetterAndSubset`, STARS ID `SDA`, single character `S` - so a ZID sector types the character, the subset and the sector letter: `S1X`. (`neighboringStarsConfigurations`.)

**Seats by TCP:**

| Callsign | Position | Frequency | TCP | Parent TCP |
| --- | --- | --- | --- | --- |
| SDF_D_APP | Departure Radar 1 | 132.075 | 1D | - |
| SDF_E_TWR | Local Control East | 124.200 | 1T | - |
| SDF_E_GND | Ground Control East | 121.700 | 1T | - |
| SDF_DEL | Clearance Delivery | 126.100 | 1T | - |
| SDF_RMP | UPS Ramp Control | 129.950 | - | - |
| SDF_I_APP | Arrival Radar 1 | 132.325 | 1I | D |
| SDF_A_APP | Arrival Radar 2 | 134.150 | 1A | D |
| SDF_B_APP | Departure Radar 2 | 123.675 | 1B | D |
| SDF_W_APP | Final Radar 1 | 120.300 | 1W | D |
| SDF_E_APP | Final Radar 2 | 135.775 | 1E | D |
| SDF_EM_APP | SDF GUARD | 121.500 | - | - |
| SDF_W_TWR | Local Control West | 135.200 | 1L | T |
| SDF_W_GND | Ground Control West | 119.825 | 1T | - |
| LOU_TWR | Local Control | 119.500 | - | - |
| LOU_GND | Ground Control | 121.800 | - | - |
| LOU_DEL | Clearance Delivery | 118.900 | - | - |
| FTK_TWR | Local Control | 133.350 | - | - |
| FTK_GND | Ground Control | 121.900 | - | - |

### CVG - Cincinnati ATCT/TRACON

**Handoff numbers** (`starsHandoffIds`): CMH = Δ1, IND = Δ4, LEX = Δ2, SDF = Δ3.

**TCPs** (`tcps`; a TCP with a parent consolidates into it when closed):

| TCP | Subset | Sector | Parent |
| --- | --- | --- | --- |
| 1A | 1 | A | U |
| 1B | 1 | B | W |
| 1D | 1 | D | U |
| 1F | 1 | F | W |
| 1K | 1 | K | - |
| 1L | 1 | L | W |
| 1N | 1 | N | W |
| 1S | 1 | S | W |
| 1T | 1 | T | - |
| 1U | 1 | U | - |
| 1V | 1 | V | W |
| 1W | 1 | W | - |
| 1X | 1 | X | - |

**From a ZID sector (ERAM Field E):** format `OneLetterAndSubset`, STARS ID `CVA`, single character `V` - so a ZID sector types the character, the subset and the sector letter: `V1X`. (`neighboringStarsConfigurations`.)

**Seats by TCP:**

| Callsign | Position | Frequency | TCP | Parent TCP |
| --- | --- | --- | --- | --- |
| CVG_W_APP | Wildcat Departure Radar | 126.650 | 1W | - |
| CVG_C_TWR | Local Control Center | 118.300 | 1U | - |
| CVG_W_GND | Ground Control West | 121.700 | 1T | - |
| CVG_DEL | Clearance Delivery | 120.400 | 1T | - |
| CVG_A_RMP | Amazon Ramp Control | 130.500 | - | - |
| CVG_D_RMP | DHL Ramp Control | 129.475 | - | - |
| CVG_N_RMP | Taxilane N Ramp Control | 130.375 | - | - |
| CVG_1_RMP | Terminal Ramp Control | 130.900 | - | - |
| CVG_N_APP | Arrival North | 123.875 | 1N | W |
| CVG_S_APP | Arrival South | 119.700 | 1S | W |
| CVG_B_APP | Bearcat Departure Radar | 128.700 | 1B | W |
| CVG_C_APP | Controller In Charge | 122.450 | 1X | - |
| CVG_F_APP | Final Radar F | 124.700 | 1F | W |
| CVG_V_APP | Final Radar V | 127.725 | 1V | W |
| CVG_L_APP | Satellite Radar | 121.000 | 1L | W |
| CVG_EM_APP | CVG GUARD | 121.500 | - | - |
| CVG_E_TWR | Local Control East | 118.975 | 1D | U |
| CVG_W_TWR | Local Control West | 133.325 | 1A | U |
| CVG_E_GND | Ground Control East | 121.300 | 1X | - |
| LUK_TWR | Local Control | 118.700 | - | - |
| LUK_GND | Ground Control | 121.900 | - | - |

## 4. The ZID sectors the three SOPs name

The SOPs write a three-letter name and a number (`ABB 18`); the vNAS record names sector 18 *Nabb*. The numbers all resolve; the ID from a TRACON is `C` + the number.

| Sector | vNAS name | Callsign | Frequency | ID from a TRACON | Named in |
| --- | --- | --- | --- | --- | --- |
| 17 | Evansville 17 | IND_17_CTR | 128.300 | C17 | SDF departures west; MBELL; EVV |
| 18 | Nabb 18 | IND_18_CTR | 124.775 | C18 | IND GIIBS arrivals; SDF departures north; CVG SARGO |
| 19 | New Hope 19 | IND_19_CTR | 121.175 | C19 | SDF departures south; SDF arrivals via the EWO sector |
| 20 | Lexington 20 | IND_20_CTR | 126.375 | C20 | CVG departures south (KENLN); LEX overflights |
| 21 | London 21 | IND_21_CTR | 124.625 | C21 | SDF departures east; LEDDL |
| 22 | Covington 22 | IND_22_CTR | 123.925 | C22 | CVG TIGRR and departures north; DLAMP |
| 26 | River 26 | IND_26_CTR | 124.225 | C26 | CVG GAVNN and JAKIE |
| 33 | Muncie 33 | IND_33_CTR | 124.525 | C33 | IND MAREO and SNKPT |
| 34 | Shelbyville 34 | IND_34_CTR | 119.550 | C34 | IND DAWNN; CVG CEGRM and departures west |
| 35 | Terre Haute 35 | IND_35_CTR | 132.200 | C35 | IND ROCKY, OOM, KOLTS, SMUKE, RACYR; SDF JMONY |
| 69 | Pike 69 | IND_69_CTR | 135.575 | C69 | CVG departures east (GIPLE, ROCKT) |

**Where the SOP and vNAS differ on which sector a CVG gate goes to,** see `../CVG/claude_CVG_Gap_Analysis.md` Part 4 (CHCLL and SILKS: SOP 20, vNAS 22).

## 5. What the platform cannot express

Unchanged from the ZMP document section 8: a handoff to another ARTCC's sector from ERAM has no stated form, and a SOP-described coordination that CRC cannot carry is a training fact, not a tool bug. Nothing ZID-specific has been found that is not already there.
