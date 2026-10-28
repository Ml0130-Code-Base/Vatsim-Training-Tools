# R90 operators by field (Omaha)

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

## KOMA - Eppley Airfield

Source: Wikipedia, *Eppley Airfield*, "Airlines and destinations", page 4 of 11, printed 2026-10-27. File `Eppley Airfield - Wikipedia.pdf`, 85856 bytes, md5 `fe452cd59ceacc80718e8046e6a9200a`.

**Flown by the generator** (callsign designators from `claude_US_Carrier_Callsigns.md`):

| Operator as printed | Kind | Callsign designators |
|---|---|---|
| Alaska Airlines | passenger | ASA |
| Allegiant Air | passenger | AAY |
| American Airlines | passenger | AAL |
| American Eagle | passenger | SKW, RPA, JIA, ENY, PDT |
| Delta Air Lines | passenger | DAL |
| Delta Connection | passenger | SKW, EDV, RPA |
| Frontier Airlines | passenger | FFT |
| Southwest Airlines | passenger | SWA |
| United Airlines | passenger | UAL |
| United Express | passenger | SKW, RPA, ASH, GJS, UCA |

**Named in the printout, not flown** (no callsign in the carrier document, or not an airline): none.

**What the printout does not hold:** One page of the article: the passenger table only. The cargo section is not in the printout. No charter, business-aviation or general-aviation operator is named in the printout.

