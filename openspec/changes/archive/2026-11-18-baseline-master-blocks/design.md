# Design

## Context

See `proposal.md` for why. What shapes the approach:

- **The masters, and the decks that carry each one** (byte-identical on `main`, checked 2026-11-18):

  | Master | Carried by |
  |---|---|
  | `strip-block.html` | R90, C90, AZO, S56, Big Sky, IND, SDF, CVG |
  | `fly-block.html` | R90, C90, AZO, S56, Big Sky, IND, SDF, CVG |
  | `drill-block.html` | R90, C90, AZO, S56, Big Sky, IND, SDF, CVG |
  | `routedraw-block.html` | IND, SDF, CVG |
  | `datis-block.html` | IND, SDF, CVG |

  M98 carries none, because it keeps its own row, engine, builder, layers and D-ATIS code. ZMP
  Center carries none (#76).
- **No master is edited by this change**, so no deck changes and no harness count moves.
- **The prose is older than the code in places.** The block references were written when each
  master landed and amended by hand since.
- **Only the ZID harnesses assert all five masters.** R90, C90, AZO, S56 and Big Sky carry three
  masters each with smaller harnesses, and ZMP Center's cannot pass (#69).

## Goals / Non-Goals

**Goals:**
- One spec per master holding the behaviour it has today, every scenario with its proof.
- Make the unproven part visible: a requirement no harness checks says *unverified* rather than
  borrowing a nearby check's credibility.

**Non-Goals:**
- Changing a master, a deck or a harness.
- Writing a harness check for an *unverified* scenario. Each one is a candidate check, and it
  belongs in a later change.
- Correcting the block references (see D4).
- Specs for M98's own row, engine and layers, which are not masters (D7 of `adopt-openspec`:
  facility specs only on contact).

## Decisions

### D1. The code on `main` wins over the prose

Where a block reference and the master disagree, the spec describes what the master does and this
design names the disagreement (D4). *Alternative:* follow the reference, which is authoritative
for aviation data. Rejected: a reference is authoritative for *values*, and these disagreements are
about *behaviour*, where the code is what the trainee meets.

### D2. The ZID harnesses are the named proof

A *PROOF* line quoting a check names it as the IND, SDF and CVG harnesses spell it. Those three
carry all five masters and have been run through the browser runner (root `CLAUDE.md` §12).
Where a check's name is built from a string (one per configuration or per preset), the spec writes
the template with `<field>`-style holes. The same behaviour is also asserted, under other names,
in the R90, C90, AZO, S56 and Big Sky harnesses for the three masters they carry. Those are not
cited, to keep one spelling per check.

*Alternative:* cite every deck's check. Rejected: five spellings of one assertion is a second
copy, and the check names drift independently.

### D3. Three proof grades, one more for a known contradiction

- **A harness check**, quoted by name.
- ***checked by driving the page***, with the date and decks the reference records. That is
  weaker, because a drive is not re-run, and the line says so by its form.
- ***unverified***: the reference states the behaviour and nothing on record checks it.
- ***contradicted***: an open issue reports the behaviour does not hold. The requirement stays,
  because it is the contract, and the issue is named. Today that is one case: the drill builder's
  generated starting altitude against #79.

### D4. Stale and wrong lines in the references, named and kept

Found while writing the specs, and **not corrected here** (D1; a reference fix is its own commit).
Task 2.1 files them as one issue:

- `claude_Strip_Block_Reference.md` §5: the per-field inventory is stamped **CIFP 260903**, two
  cycles old. Its *"a radar-vector or conventional departure is outside it"* is the claim root
  `CLAUDE.md` §10.1 corrected on 2026-09-07, because CIFP codes vector SIDs as route type `T`.
- `claude_Strip_Block_Reference.md` §6 (line *"S56 has no procedures block"*): S56 has carried one
  since `203e643` (2026-10-27).
- `claude_Fly_Block_Reference.md` §9: Big Sky and S56 *"have no smoke test (issue #46)"*. Both have
  one since `d7e0f2e`, and #46 is closed.
- `claude_Fly_Block_Reference.md` §8: *"CIFP 261029 rolls on 2026-10-29"* is superseded by the
  261126 decision (#65).

### D5. Contract shapes stay in the references

Function names, export lists and the contract object literals are how a deck wires a master, not
what the master does. They stay in the block references, and the specs name a hook by what it
answers ("the tower hook"). The deck's own constants appear where D3 of `adopt-openspec` allows
them: the `<basename>-fly-v1` key, `STANDING`, the mode ids and the fifty-strip ceiling.

## Risks / Trade-offs

- **A quoted check name is not present in all three ZID harnesses** -> task 1.1 checks every quoted
  name in all three, and the spec says which deck when only one carries it.
- **A quoted check fails today.** The masters changed on 2026-10-28 (`22fa846`), and the ZID
  runners last ran on 2026-10-26 -> task 1.2 runs IND, SDF and CVG and records the counts before
  anything lands.
- **A spec now looks more authoritative than the code it describes** -> nothing reads `openspec/`
  at runtime. A future change to a master must update its spec in the same commit (a
  `config.yaml` tasks rule), and the drift check stays the `perl` one in the references.
- ***Unverified* scenarios read as gaps someone forgot** -> they are the candidate harness checks,
  listed in this change. That is invariant 2 working, not a defect.

## Migration Plan

1. Run the proof checks (tasks section 1).
2. File the stale-lines issue and comment on #79 (tasks section 2).
3. Validate strictly and commit at the repo level under #80 (tasks section 3).
4. Archive, which creates `openspec/specs/masters/{strip,fly-player,drill-builder,route-draw,datis-reader}/spec.md`.

**Rollback:** delete the five main specs and revert the commit. Nothing reads them.

## Open Questions

- **Should the *unverified* scenarios become harness checks in one change, or one per master?**
  Deferrable: either way it is a later change, and it does not alter these specs, which gain a
  harness name in a MODIFIED delta when a check lands.
