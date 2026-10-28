# MSP operators - record only, the M98 deck does not read it

**Which operators the owner's printouts name at each field, and how the drill generator uses them.** Written 2026-10-28 for issue #76. The data in the deck is a copy of the tables below; if the two disagree this file wins (root invariant 7) and the deck is the bug.

> **Record only.** The M98 deck is Tier 2 and keeps its own `FLEET` (carrier and type pairs, weighted by its author for MSP) and `SAT_FLEET` (corporate jets and turboprops at the satellites); it does not read an operator table and this file changes nothing in it. **Cross-check, 2026-10-28:** every carrier in `FLEET` (DAL, EDV, SKW, SCX, AAL, UAL, SWA, RPA, FDX) is an operator the KMSP printout below names, so the existing mix draws no carrier the source says is absent. What the printout cannot confirm is the weighting, and the types. `SAT_FLEET` names no carrier and the deck already says no document supports its mix. The "How the generator uses a table" section below describes the shared drill master, which the M98 deck does not use.

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

## KMSP - Minneapolis–Saint Paul International Airport

Source: Wikipedia, *Minneapolis–Saint Paul International Airport*, "Airlines and destinations", pages 7 to 9 of 29, printed 2026-10-27. File `Minneapolis–Saint Paul International Airport - Wikipedia.pdf`, 271143 bytes, md5 `06469f26300644eba31fe487b7b4b5b3`.

**Flown by the generator** (callsign designators from `claude_US_Carrier_Callsigns.md`):

| Operator as printed | Kind | Callsign designators |
|---|---|---|
| Alaska Airlines | passenger | ASA |
| American Airlines | passenger | AAL |
| American Eagle | passenger | SKW, RPA, JIA, ENY, PDT |
| Delta Air Lines | passenger | DAL |
| Delta Connection | passenger | SKW, EDV, RPA |
| Frontier Airlines | passenger | FFT |
| Southwest Airlines | passenger | SWA |
| Sun Country Airlines | passenger | SCX |
| United Airlines | passenger | UAL |
| United Express | passenger | SKW, RPA, ASH, GJS, UCA |
| FedEx Express | cargo | FDX |
| UPS Airlines | cargo | UPS |

**Named in the printout, not flown** (no callsign in the carrier document, or not an airline): Air Canada (passenger); Air Canada Express (passenger); Air France (passenger); Denver Air Connection (passenger); Discover Airlines (passenger); Icelandair (passenger); KLM (passenger); WestJet (passenger); WestJet Encore (passenger); Amazon Air (cargo); Bemidji Airlines (cargo); DHL Aviation (cargo); FedEx Feeder (cargo).

**What the printout does not hold:** Passenger and cargo tables, each followed by the next heading, so both are whole as printed. No charter, business-aviation or general-aviation operator is named in the printout.

