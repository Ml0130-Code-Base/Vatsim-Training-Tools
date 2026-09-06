# The master strip block — one strip row, every facility, no foreign procedures

`strip-block.html` at the repository root. Extracted from the M98 drill builder on
**2026-09-06** and generalised so the same flight-strip row can serve every deck.

**The point of the file is the enforcement, not the markup.** A strip is a statement about a
real aircraft on a real procedure, and most of the ways it can be wrong are combinations that
look fine field by field:

- an arrival landing at a field this facility does not work
- **a KSLC STAR on an M98 strip, or an MSP STAR on an S56 one**
- an MSP SID flown off a satellite field that does not have it
- a runway that is not at the airport selected

Every one is refused **by name**, saying what would have been valid instead. A silent drop
teaches the wrong thing and a generic *"invalid"* teaches nothing.

---

## 1. The contract

The deck defines `window.STRIP_FACILITY` before the block runs. Paste the contract first,
then the block.

```js
window.STRIP_FACILITY = {
  id: 'M98',                          // facility label, used in every message
  prefix: 'strip',                    // id/class prefix, so it can sit beside a deck's own controls
  sync: 'ddbSync',                    // optional: the deck's re-render function, called on change
  airports: {
    KMSP: {name:'Minneapolis-St Paul', rwys:['12L','12R','30L','30R']},
    KLVN: {name:'Airlake',             rwys:null}          // inventory not in the reference set
  },
  arrivals: {
    NITZR: {serves:['KMSP'],          flies:true},
    AGUDE: {serves:['KFCM','KLVN'],   rev:'AGUDE FIVE', flies:true}
  },
  departures: {
    COULT: {from:['KMSP'], flies:true}
  }
};
```

`serves` is the list of airports an **arrival** actually ends at.
`from` is the list of airports a **departure** actually leaves from.

**Both are required and neither defaults to "everywhere."** A procedure with an empty list is
offered nowhere. That is the safe direction: a missing entry shows up as a procedure you
cannot pick, never as one that silently works at the wrong field.

`rwys: null` where a field's runways are not in the reference set. The control then says
*"no runway inventory for KLVN"* rather than rendering an empty box or inventing one — the
KLVN case at M98, and the same rule as everywhere else in this repo.

## 2. What it guarantees

**The airport control offers this facility's fields and nothing else.** That single fact is
what makes a cross-facility strip *unbuildable* rather than merely refused after the fact —
an M98 strip cannot select KSLC, so it can never reach a KSLC procedure.

On top of that, `checkStrip(strip, label)` returns plain-language errors for anything that
slipped in another way — a stored drill, a pasted scenario, a renamed procedure:

| Wrong combination | What it says |
|---|---|
| field this facility does not work | *"landing at KSLC, and M98 does not work that field. It works KMSP, KFCM, KLVN."* |
| procedure from another facility | *"on the BEARR5 arrival, which is not a M98 procedure at all. Minneapolis-St Paul is served by NITZR, BLUEM."* |
| our procedure, wrong field | *"landing KFCM on the NITZR arrival, and NITZR does not serve that field — it serves KMSP. Flying Cloud is served by AGUDE, TWOLF."* |
| our SID, wrong origin | *"departed KFCM on the COULT departure, and COULT does not leave that field — it leaves KMSP."* |
| runway not at the field | *"assigned runway 28L at KMSP, which does not have it — it has 12L, 12R, …"* |

`normStrip(strip)` brings a stored strip back inside the contract and **reports what moved**,
so a drill saved before a procedure changed resolves to something legal instead of sitting in
a state the row cannot display.

## 3. A procedure can belong to several fields, and that is the normal case

**`serves` and `from` are lists, not single airports.** That is the whole reason they are
lists. A SID or a STAR being valid at more than one field inside the same facility is ordinary
and the contract has to express it without strain:

```js
AGUDE: {serves:['KFCM','KLVN'], rev:'AGUDE FIVE'}   // one arrival, two satellite fields
GEP:   {serves:['KMSP','KANE','KFCM','KMIC','KSTP']} // the shared hub — MSP and the satellites
```

`arrivalsFor('KFCM')` and `arrivalsFor('KLVN')` both return AGUDE; neither returns NITZR. The
question the block answers is never *"which single field owns this procedure"* — it is
**"is this procedure valid at the field on this strip"**, which is membership in a list.

**So do not read M98's unfiltered SID dropdown as a defect.** It builds the list as
`SIDS = Object.keys(DD.DEPS)` and offers all of them at every field, and for M98 as it stands
that happens to be harmless — the nine turbojet SIDs are MSP procedures and MSP is where
departures are built. What it is, is **unstated**: the relationship exists in nobody's data,
so nothing can check it and nothing can be relied on when the assumption stops holding.

The contract's job is to make the relationship explicit wherever it matters, and to be
indifferent to how many fields a procedure covers — one, several, or all of them. A facility
whose SIDs genuinely serve every field it works writes every field into `from` and the control
correctly offers them everywhere. That is a declaration, not an accident.

**M98 is not changed by this file.** Swapping its strip row for the block is its own piece of
work and its own decision.

## 4. What it deliberately does not do

It does not fly anything, grade anything, or know what a ladder is. It renders the row, reads
it back, and answers whether the combination is legal for this facility. A deck with a traffic
model wires its own engine to the values; a deck without one still gets a correct strip.

It also carries **only the job half** of M98's row — the part that names a procedure, which is
the part that can be wrong across facilities. The generic half (callsign, type, wake class,
flight rules, radar service, altitude, speed) is unchanged from M98 and is not facility-
specific, so it was left where it is rather than moved for the sake of moving it.

## 5. Ready-made contracts

Procedure inventories per field, from **CIFP 260903** — see
`claude_CIFP_Source_Reference.md` and the per-facility files. These are the `arrivals` and
`departures` keys each deck's contract needs.

| Field | Arrivals | Departures |
|---|---|---|
| KMSP | BAINY4 BLUEM5 GEP1 KASPR8 KKILR4 MUSCL4 NITZR4 TORGY4 | COULT7 HSTIN6 KBREW2 LEINY6 MEDOW5 ORSKY3 RST1 SCHEP1 SLAYR4 SMERF7 WLSTN7 ZMBRO7 |
| KORD | BENKY6 ERNNY8 ESSPO5 FYTTE7 JVL1 MADII7 SHAIN2 TRTLL6 VEECK5 WATSN4 WYNDE3 | **none coded** |
| KMDW | ENDEE8 FISSK7 PANGG7 | **none coded** |
| KSLC | BEARR5 BVL2 CARTR1 JAMMN5 JAZZZ1 LHO5 PITTT2 QWENN7 SKEES6 SPANE8 YUTES2 | ARCHZ1 CGULL1 DEZRT2 FFU9 RUGGD3 SEVYR3 SLC4 ZIONZ1 |
| KBOI | BEWTE4 KOURT4 KYAAN4 SADYL4 SPUUD4 | BOI3 GOWEN4 |
| KBZN | BGMAN1 EATZZ1 LOSST1 POWDA2 SUBKY1 | BGSKY2 BOBKT5 BZN6 HIA5 MEADO2 |
| KOMA | AANDY2 HOWRY3 LANTK2 MARWI4 TIMMO1 | **none coded** |
| KLNK, KAZO, KGRR, KMKG, KBTL, KBIV, KHLM, and the C90 satellites | **none coded** | **none coded** |

**"None coded" is not "none exists."** CIFP codes what is codeable for RNAV; a radar-vector
or conventional departure is outside it, and those fields plainly have departures. Under the
contract those fields correctly offer no procedure and say so, which is the honest rendering
of a gap rather than a silent one.

**M98's own names differ from CIFP's.** The deck calls its arrivals `NITZR`, `BLUEM` and so on
— the gate fix — where CIFP calls the procedure `NITZR4`. That is a real choice, not a
mismatch: M98's engine keys ladders by gate. A contract for M98 keeps the deck's names; a
contract for a facility with no engine can use CIFP's, which carry the revision number.

## 6. Verified

Driven in a browser on 2026-09-06 against a two-facility harness. Fourteen checks on the
enforcement and eight on the row, all passing: the dropdowns offer only the facility's fields
and only the procedures valid at the selected one; an S56 field and an S56 STAR on an M98
strip are both refused by name; an MSP arrival landing a satellite and an MSP SID off a
satellite are refused with what *would* have been valid; a runway not at the field is refused;
a field with no runway inventory and a field with no departure procedure each render a
statement instead of an empty control; changing the field strands the procedure, re-places it,
and reports the move; and a legal strip produces no errors.

**Not wired into any deck yet.** That is the next step and it is per-deck work: R90, C90, AZO,
S56 and Big Sky have no strip UI at all today, and M98 has one that would be replaced rather
than extended.
