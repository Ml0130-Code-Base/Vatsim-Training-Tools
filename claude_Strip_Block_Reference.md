# The master strip block — one strip row, every facility, no foreign procedures

`strip-block.html` at the repository root. Extracted from the M98 drill builder on
**2026-09-06** and generalised so the same flight-strip row can serve every deck. On
**2026-09-07** it grew from the job half to the WHOLE row, so every facility writes the strip
M98 writes — see §4.

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
  sync: 'ddbSync',                    // OPTIONAL OVERRIDE. Defaults to '<prefix>Sync' — see §2.1
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

### 2.1 The procedure list follows the field, and the re-render is no longer opt-in

**Every control this block renders carries an `onchange` that calls `<prefix>Sync`**, through
`window` and guarded, so the block still names the deck's re-render function rather than
depending on any particular builder. `sync` in the contract overrides the name; it is not
needed, because `<prefix>Sync` is what every mount defines.

**It used to be opt-in, and that was a real bug — found 2026-09-07 by the owner, on C90.**
With no `sync` in the contract, `ev()` emitted no handler at all, so the airport, procedure
and runway controls were inert. Changing the landing field left the arrival list showing the
**previous** field's STARs; a KORD STAR could be selected on a strip landing Midway; and the
check line went on reporting the stale combination as legal — the tool asserting something
untrue, not merely failing to help.

**The filtering was never broken.** `jobFields` has always built the list from
`arrivalsFor(dest)`, and `normStrip` has always re-placed a procedure the new field cannot
carry. Nothing ever ran them. **All five decks carrying the block shipped without `sync`**,
which is what says the default was wrong rather than that five contracts were careless.

Two rules fall out of it, and both are cheap to check:

- **A control whose list depends on another control must re-render when that control changes.**
  The list following the field is the block's whole promise; a list that does not follow is
  worse than no list, because it looks authoritative.
- **Write the option's `value` out explicitly.** With none, an option's value is its own label
  text, so any decoration — a revision name, a `(frame only)` tag — reads back as part of the
  key. This block has always done it. **M98's own row had not**, and six of its sixteen
  arrivals could not be selected at all: the control snapped back to the first one. Same
  family of bug, found in the same pass, fixed 2026-09-07.

**A mount should surface `normStrip`'s `moved` list.** Every mount used to discard it, so a
procedure that could not follow the new field was swapped in silence. All five now print it
under the check line. A list that follows the field is only trustworthy if the tool admits
when it moved something the controller had already chosen.

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

**So do not read M98's unfiltered SID dropdown as a defect** — and the owner has settled that
directly, 2026-09-07: *"SIDs and STARs can be valid for more than one airport."* It builds the
list as `SIDS = Object.keys(DD.DEPS)` and offers all of them at every field. `DD.DEPS` carries a
fix ladder per SID and no `from` list, so nothing in the deck's data says which fields a SID
leaves; filtering it would mean asserting a relationship no source states, which is the thing
invariant 1 forbids. **Leave it offering all of them.** The relationship is unstated, not
wrong, and an unfiltered list is the honest rendering of an unstated relationship.

The contract's job is to make the relationship explicit wherever it matters, and to be
indifferent to how many fields a procedure covers — one, several, or all of them. A facility
whose SIDs genuinely serve every field it works writes every field into `from` and the control
correctly offers them everywhere. That is a declaration, not an accident.

**M98 keeps its own row.** It is the source this format came from, its row is wired into the
ladder engine and the grading in a way the other six are not, and swapping it for the block
remains its own piece of work and its own decision. What DID change on 2026-09-07 is the
direction of travel: the format moved out of M98 into this file, so the other five decks write
the same strip. Its one fix in that pass was the missing option value (§2.1).

## 4. It carries the whole row, and what it still does not do

It does not fly anything, grade anything, or know what a ladder is. It renders the row, reads
it back, and answers whether the combination is legal for this facility. A deck with a traffic
model wires its own engine to the values; a deck without one still gets a correct strip.

**Until 2026-09-07 it carried only the job half** — the part that names a procedure — and each
deck wrote its own callsign, type and altitude boxes. That made the strip a different shape at
every facility, and the work M98 had already done on flight rules, radar service, wake class,
speeds and check-in timing reached nobody else. **Owner's call: the M98 row is the format, so
the format lives here.**

### 4.1 What is generic, and what the facility passes in

**Generic, and therefore in this file** — every field whose meaning is national:

| Field | What makes it national |
|---|---|
| Job, callsign, type | the strip itself |
| Flight rules | IFR/VFR |
| **Radar service** | the five states an aircraft can be in when it first speaks to you, and **which of them a job and a set of flight rules can legally be in** — an IFR arrival is never asking for flight following. Issue #12. |
| **Wake class** | by maximum certificated takeoff weight, 7110.65 thresholds. A type not in the table tags **NOWGT** rather than being guessed, which is what a real STARS system does. |
| Altitude, speed | — |
| **Published vs Center advised** | an arrival on an optimized profile descent flies the arrival's own speeds; anything else is a coordination event. The Center-advised box is **disabled under "published"**, because there is nothing advised to write in it. Issue #10. |
| Checks in at, already on frequency, altimeter given | the drill clock |
| Route / Intentions | label follows the flight rules |

**The facility's, and therefore passed in** — optional functions on the contract, each with a
stated fallback, so leaving one out is a statement that the facility cannot answer it rather
than an oversight:

| Hook | Without it |
|---|---|
| `spoken` | the header prints the bare callsign. **Not defaulted:** callsign voicing is a national reference a facility either carries or does not, and a deck with no TTS layer inventing a pronunciation is what `claude_US_Carrier_Callsigns.md` forbids. |
| `context` | the grey line beside the strip number is empty |
| `handoffFor` | every job gets a plain input. A facility with no handoff identifier does **not** derive one. |
| `fixesOn` | **the row asks for a bare distance to go instead of miles from a named fix.** Issue #11. |
| `routeTextFor` | placeholder reads "filed route" and the *fill from the procedure* button is not offered |
| `roleHints` | generic title text on the job selector |
| `extraFields` | nothing appended — C90 and AZO use it for the bearing and distance their scope needs |

**`fixesOn` returns every fix on the procedure, whichever transition it is on.** CIFP splits a
procedure into entry transitions, a common segment and runway transitions, and **some carry
nothing in common** — BGMAN1 into Bozeman has an empty common segment and all six of its fixes
on the KARTS transition. Reading only the common segment said BGMAN1 had no ladder, which is
false. Narrowing to one transition needs a transition selector on the strip, and no deck knows
which transition its facility assigns in a given configuration: an SOP and LOA question with no
CIFP answer.

**A procedure with only vector legs correctly reports no ladder.** BOI3 off Boise is exactly
that, and the bare distance box is the right rendering — not a gap.

### 4.2 The model matches what the control can express

The procedure picker has no blank option, so with nothing set the browser shows the first one.
`normStrip` therefore adopts that first procedure rather than leaving the model empty, and
**does not report it as a move** — nothing was displaced. Without this the row displayed BOI3
while the context line read *"no departure procedure selected"*: the two halves of one strip
disagreeing, which is the failure the whole block exists to prevent.

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

**That harness drove `checkStrip` and `normStrip` directly, which is why it passed while the
live decks were broken.** It never dispatched a `change` event on a rendered control, so it
could not see that no control carried a handler. **A check that calls the function under test
is not a check that the page calls it.** Any harness written for this block from now on
dispatches a real `change` on the airport control and asserts the procedure list changed.

### Re-verified 2026-09-07, in the live decks rather than a harness

All five decks carrying the block, plus M98's own row, driven over local HTTP with real
`change` events. Per deck: the landing control carries the guarded `onchange`; changing the
field rebuilds the arrival list to that field's procedures; the previous field's procedures
are **absent from the list**, not merely refused after selection; a stranded selection is
re-placed and the move is printed; the check line updates to the new field; and a field with
no coded procedure renders a statement instead of an empty control.

Concretely — C90 KORD → KMDW moves the list from eleven O'Hare STARs to `PANGG7 ENDEE8
FISSK7` and re-places `BENKY6 -> PANGG7`; Big Sky KBOI → KBZN swaps five Boise STARs for five
Bozeman ones; S56 KSLC → KHIF empties to a statement; AZO KAZO → KBIV drops runway 17 to *not
issued*; R90 KOMA → KLNK empties to a statement; S56's departure side moves `ARCHZ1 ->
EMONT3` on KSLC → KOGD. On M98, `KASPR` and `GEP` are selectable and stick where they
previously snapped back, and the list still follows the field.

### Re-verified again 2026-09-07, after the row moved here

All five decks driven over local HTTP with real change events. Per deck the row now carries the
same twenty fields M98's does, and each behaviour was exercised rather than assumed: radar
service offers `established, popup` on an IFR arrival and `established, following, none` on a
VFR one; the Center-advised box is disabled under *published* and enabled under *Center
advised*; the fix picker follows the procedure (C90 BENKY6 gives BENKY NEWRK AHSTN PETAH,
WYNDE3 gives WYNDE FIYER ERNNY PAPPI TUBEZ); wake class reads `super` for A388, `large` for
B738 and `NOWGT — weight unverified` for a type not in the table; *fill from the procedure*
writes the twenty fixes of PANGG7 into the route box; and a legal strip still places on the
C90 and AZO scopes and jumps to Fly.

Where a deck cannot answer a hook, the fallback was checked rather than assumed: AZO and S56
render the bare distance box and no *fill from the procedure* button, because neither carries a
ladder — AZO has no coded procedure at any field and S56 has no procedures block.

### Wiring status

Wired into **R90, C90, AZO, S56 and Big Sky**, all five byte-identical to this file. C90 and
AZO host it as the deck's only strip entry, with the facility's placement fields alongside
through `extraFields`. **M98 still uses its own row** — it is the source the format came from,
its row is wired into the ladder engine and the grading, and swapping it remains its own
decision.
