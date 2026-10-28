# C90 operators by field (O'Hare and Midway)

**Which operators the owner's printouts name at each field, and how the drill generator uses them.** Written 2026-10-28 for issue #76. The data in the deck is a copy of the tables below; if the two disagree this file wins (root invariant 7) and the deck is the bug.

## Where this came from

The owner attached eleven one-to-five-page Wikipedia printouts to issue #76 (comment of 2026-10-28T03:55:02Z, `IC_kwDOUKuA2c8AAAABgQ-Ifw`), each the *Airlines and destinations* part of one airport article, printed 2026-10-27. The owner's follow-up the same morning (2026-10-28T04:01:49Z): they list the normally scheduled operators, and charter operators such as ExecJet, and general aviation, are a separate thing the engine has to account for. **Nothing in any printout names a charter or business-aviation operator, so none is carried** (invariant 1); the generator's general-aviation callsigns are still the piston N-numbers of the overflight draw.

The PDFs are not committed (they are the owner's attachments to a public issue, and only operator names are transcribed here). Pull recipe: `gh issue view 76 --json comments`, find that comment, download each linked file. The article text changes; these tables are true of the page as printed on 2026-10-27, and the printout, not the live article, is the citation.

**Every printout is a page range, not the article.** Where a table is cut off by the page edge, or a section (cargo, for most fields) is not printed, the entry says so under *What the printout does not hold*. A missing section is **unknown**, not empty.

## How the generator uses a table

* A callsign at a field with a table is drawn from that field's operators and from nowhere else: one brand, equal chance per brand printed, then one of the callsign designators that brand flies as.
* **Equal chance is not a claim about traffic.** The printouts carry no frequencies, and seasonal service is marked in them and not told apart here. Weights need a source that has them (BTS T-100 segments, a facility count); until then the panel says every operator has an equal chance.
* **Designators come from `claude_US_Carrier_Callsigns.md`** (the carrier table's ICAO column; the regional table's *Flies as* column for the three brands that are not airlines: American Eagle, Delta Connection and United Express). That document is kept under `ZMP/` and `ZID/_shared/`; this tree carries no copy of it (the reference layer is the open work in issues #42 and #46), so the mapping is stated here instead of linked. **Which regional operator serves a brand at a given field is not in the printouts**, so a brand draws from every operator the carrier document assigns to it, and the panel prints that list.
* A name with no designator in the carrier document (every foreign carrier, Amazon Air, DHL Aviation, FedEx Feeder and the others) is **named and not flown**. It is shown on the page and never drawn.
* The aircraft type is still drawn independently of the operator, because no printout gives a fleet. A regional brand can therefore draw a type it does not fly; that was true of the flat list too.
* A field with no table keeps the flat list of twelve carriers, and the panel says so field by field.

## KORD - O'Hare International Airport

Source: Wikipedia, *O'Hare International Airport*, "Airlines and destinations", pages 13 to 17 of 61, printed 2026-10-27. File `O'Hare International Airport - Wikipedia.pdf`, 433743 bytes, md5 `49d23ad6e0f45e481ee67e8a81b296f5`.

**Flown by the generator** (callsign designators from `claude_US_Carrier_Callsigns.md`):

| Operator as printed | Kind | Callsign designators |
|---|---|---|
| Alaska Airlines | passenger | ASA |
| American Airlines | passenger | AAL |
| American Eagle | passenger | SKW, RPA, JIA, ENY, PDT |
| Avelo Airlines | passenger | VXP |
| Delta Air Lines | passenger | DAL |
| Delta Connection | passenger | SKW, EDV, RPA |
| Frontier Airlines | passenger | FFT |
| JetBlue | passenger | JBU |
| Sun Country Airlines | passenger | SCX |
| United Airlines | passenger | UAL |
| United Express | passenger | SKW, RPA, ASH, GJS, UCA |
| Atlas Air | cargo | GTI |

**Named in the printout, not flown** (no callsign in the carrier document, or not an airline): Aer Lingus (passenger); Aeroméxico (passenger); Air Canada (passenger); Air Canada Express (passenger); Air France (passenger); Air India (passenger); Air Serbia (passenger); All Nippon Airways (passenger); Arajet (passenger); Austrian Airlines (passenger); Avianca (passenger); Avianca Costa Rica (passenger); Avianca El Salvador (passenger); British Airways (passenger); Cathay Pacific (passenger); Condor (passenger); Contour Airlines (passenger); Copa Airlines (passenger); Denver Air Connection (passenger); EgyptAir (passenger); Emirates (passenger); Ethiopian Airlines (passenger); Etihad Airways (passenger); EVA Air (passenger); Finnair (passenger); Iberia (passenger); Icelandair (passenger); ITA Airways (passenger); Japan Airlines (passenger); KLM (passenger); Korean Air (passenger); LOT Polish Airlines (passenger); Lufthansa (passenger); Philippine Airlines (passenger); Porter Airlines (passenger); Qatar Airways (passenger); Royal Jordanian (passenger); Scandinavian Airlines (passenger); Swiss International Air Lines (passenger); TAP Air Portugal (passenger); Turkish Airlines (passenger); Viva (passenger); Volaris (passenger); WestJet (passenger); AirBridgeCargo (cargo); Air Canada Cargo (cargo); Air China Cargo (cargo); ANA Cargo (cargo); China Southern Cargo (cargo); Emirates SkyCargo (cargo); Etihad Cargo (cargo); LATAM Cargo Chile (cargo); Lufthansa Cargo (cargo); MSC Air Cargo (cargo); Nippon Cargo Airlines (cargo); Qantas Freight (cargo); Qatar Airways Cargo (cargo); Silk Way West Airlines (cargo); Singapore Airlines Cargo (cargo); Turkish Cargo (cargo).

**What the printout does not hold:** Passenger and cargo tables, each followed by the next heading, so both are whole as printed. Most of what the table names is foreign and has no callsign in the carrier document, so it is named and not flown. No charter, business-aviation or general-aviation operator is named in the printout.

## KMDW - Midway International Airport

Source: Wikipedia, *Midway International Airport*, "Airlines and destinations", page 8 of 24, printed 2026-10-27. File `Midway International Airport - Wikipedia.pdf`, 142265 bytes, md5 `4830ee979509d665a9fc7c988ddf36e9`.

**Flown by the generator** (callsign designators from `claude_US_Carrier_Callsigns.md`):

| Operator as printed | Kind | Callsign designators |
|---|---|---|
| Allegiant Air | passenger | AAY |
| Delta Air Lines | passenger | DAL |
| Delta Connection | passenger | SKW, EDV, RPA |
| Frontier Airlines | passenger | FFT |
| Southwest Airlines | passenger | SWA |

**Named in the printout, not flown** (no callsign in the carrier document, or not an airline): Volaris (passenger).

**What the printout does not hold:** The passenger table, whole as printed (the next heading follows it). There is no cargo section in the printout. No charter, business-aviation or general-aviation operator is named in the printout.

