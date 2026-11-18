# Proposal

Plans #80, part 2, step 1. Repo-level only: the five masters are root files and their specs are
root-level capabilities (root `CLAUDE.md` §5.1, §14). No ARTCC tree is touched.

## Why

The five master blocks are copied byte for byte into up to eight decks. What each one must do is
stated only in prose, in four `claude_*_Block_Reference.md` files that also carry history,
adoption steps and dated verification notes. A change to a master today is checked against
whatever its author remembers of those files. `openspec/specs/` is empty, and the masters come
first in the backfill order because their code is identical everywhere and their contracts are
already written down.

## What Changes

- **Five new capabilities**, one spec each, holding the behaviour each master already has. They are
  written from the block references and from the assertions the ZID harnesses carry, and every
  requirement is ADDED.
- **Every scenario names its proof**: the harness check that asserts it (by its name in the ZID
  smoke tests), *checked by driving the page* (with the date the reference records), or
  *unverified*.
- **No requirement states an aviation value.** Where a master reads one (a fix, a crossing, a
  runway, a frequency), the spec names the deck table or reference it comes from.
- **Where a reference and the code no longer agree, the spec follows the code and says so in the
  design.** The block references carry stale lines, for example the strip reference's
  "S56 has no procedures block". Fixing those files is not in scope.
- **No tool change.** No master, deck, harness or site file is edited.

## Capabilities

### New Capabilities

- `masters/strip`: the flight-strip row and its enforcement. Only the facility's fields and the
  procedures valid at the chosen field are offered, a wrong combination is refused by name, the
  list follows the field, and a drill holds at most fifty strips.
- `masters/fly-player`: the *Fly it* player. Strips fly their published track or a straight
  overflight line, the transmit box reads multi-clause instructions, scheduled events fire once,
  the preview draws start positions, there is no network call, and nothing is graded.
- `masters/drill-builder`: the *Set up a drill* builder. It has a seeded generator whose drills
  are legal and flyable, the per-strip transition, saved drills under their own storage key, JSON
  export and import, and the event panels.
- `masters/route-draw`: the *Routes drawn* layer bar. It has the five modes with M98's ids, draws
  published procedures from the deck's own coordinates, and trims them to the flow in force.
- `masters/datis-reader`: the D-ATIS reader. It reads a broadcast, matches it to the deck's
  configurations with four outcomes, sets the frame only on an exact single match, treats closures
  as read-only, and makes one optional fetch that falls back to paste.

### Modified Capabilities

None. `openspec/specs/` is empty.

## Impact

- **New files only:** five delta specs in this change, which become `openspec/specs/masters/*/spec.md`
  when it is archived.
- **Decks:** none edited. The specs describe the masters as they stand on `main`, which all eight
  carrying decks hold byte-identical (route draw and D-ATIS in the three ZID decks only). That was
  checked 2026-11-18.
- **Block references:** unchanged. Whether they shrink once the specs exist is an open question
  from `adopt-openspec`, and this change does not answer it.
- **Harnesses:** none edited. A requirement no harness checks is marked as such and is not
  silently treated as covered.
