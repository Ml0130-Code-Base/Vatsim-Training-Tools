# Proposal

Plans #80. Repo-level only: `openspec/` and root `CLAUDE.md`; no ARTCC tree is touched.

## Why

A tool's behaviour contract is spread across root `CLAUDE.md`, five `claude_*_Block_Reference.md`
files, ten facility `CLAUDE.md` files and the assertion lists in the smoke tests. A change is planned
in an issue comment and in prose. Nothing holds *what a deck or a master block must do* in one place
a change can be checked against. The owner asked on 2026-11-18 to move to an OpenSpec structure.
The CIFP 261126 roll and #75, both due before 2026-11-26, cross every ARTCC and are the first
pieces of work it should carry.

## What Changes

- **An OpenSpec root at the repository root** (`openspec/`: `config.yaml`, `specs/`, `changes/`),
  created with `openspec init --tools none`. The OpenSpec skills are installed per user on the
  owner's machine, so no skill or command files go into the tree.
- **`openspec/config.yaml` gets project context and per-artifact rules** that carry the house rules
  an artifact has to obey: cite the document and paragraph, never a second copy of an operational
  number, name the issue, the harness is the check, one commit per ARTCC.
- **Root `CLAUDE.md` gains the rules that make OpenSpec fit the house rules**, in §14 and a short
  new section:
  - the issue tracker stays the work queue; a change is the *plan* for one issue and names it;
  - `openspec/specs/<artcc>/` belongs to that ARTCC's tree for the commit boundary, and the rest
    of `openspec/` is repo-level;
  - specs describe tool behaviour and cite the reference markdown. The reference markdown stays
    authoritative for aviation data (invariant 7), and root `CLAUDE.md` stays authoritative for
    architecture and process.
- **The spec layout is fixed** (design D6). Filling it is separate: baseline changes, the five
  master blocks first.
- **No tool changes.** No deck, master block, harness, `site/` or `build-site.sh` file is touched,
  and nothing new reaches the published site.

## Capabilities

### New Capabilities

None. This change sets up the planning structure and the rules for using it. It changes no tool
behaviour, so it declares no capability and sets `skip_specs: true` in `.openspec.yaml`. The
first capabilities arrive with the baseline changes that follow it (design D7).

### Modified Capabilities

None. `openspec/specs/` is empty.

## Impact

- **New public directory.** `openspec/` is published with the repository (root `CLAUDE.md` §13).
  It holds plans and behaviour contracts, never the practice logs or OJT reviews, and must not
  quote them.
- **Root `CLAUDE.md`**: §14 amended and a new OpenSpec section; the §2 facility-folder shape is
  unchanged.
- **Issue tracker**: one issue opened from this side to carry this change, per the rule it
  introduces.
- **Not affected**: every deck, the five master blocks, the smoke tests and runners,
  `build-site.sh` (whose guard already fails the build if anything but the tools reaches `_site/`),
  the Pages workflow and `tools/`.
