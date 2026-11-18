# Design

## Context

See `proposal.md` for why. What shapes the approach:

- **Root `CLAUDE.md` is the contract for architecture and process**, and on aviation data the
  reference markdown wins over anything else (invariant 7). A facility `CLAUDE.md` wins on that
  facility's data. OpenSpec adds a fourth kind of document, so its authority has to be placed
  among these three, not left to be worked out case by case.
- **The issue tracker is the only work queue** (§14). A to-do kept in a file is what §14 removed,
  so a change folder must not become a second queue.
- **One commit touches one ARTCC** (§14). `openspec/` lives at the root, outside all four trees.
- **The repository is public** (§13). Anything under `openspec/` is published once pushed.
- **There is no Node and no working Python on the owner's machine** (§12). The `openspec` CLI
  runs here anyway (2.1.0, checked 2026-11-18). The harnesses are run through the browser runners.
- **Behaviour contracts already exist, in prose.** The five block references state their contracts,
  and `claude_Fly_Block_Reference.md` lists the checks its harness carries. The smoke tests
  assert the spine and the emptiness.

## Goals / Non-Goals

**Goals:**
- One place that says what each master block and each deck must do, which a change can be
  checked against.
- Fit OpenSpec under the house rules without loosening any of them.
- A layout and a backfill order, settled now, so the first spec does not set a precedent by accident.

**Non-Goals:**
- Writing any spec in this change (D7 says how and when).
- Moving aviation data into specs, or moving process rules out of `CLAUDE.md`.
- Changing any tool, harness, the site or `tools/`.
- Replacing the block references in this change (see Open Questions).

## Decisions

### D1. One OpenSpec root, at the repository root

The five masters and the root rules are shared by every ARTCC, so their specs need a home outside
any one tree. OpenSpec resolves the nearest root, so a session working inside `ZMP/` with a
`ZMP/openspec/` would plan there and never see the master-block specs.

*Alternative:* a root per ARTCC, which would keep `git log -- ZLC/` complete for specs. Rejected:
shared specs would be copied four times, the same cost §2 accepts for documents, with none of
the reason.

### D2. Who is authoritative for what

| Kind | Authoritative for |
|---|---|
| `claude_*.md` reference markdown | aviation data: every number, name and procedure (invariant 7) |
| `openspec/specs/` | tool behaviour: what a deck or a master block does and refuses |
| root and facility `CLAUDE.md` | architecture, house rules and process |

A disagreement between a spec and `CLAUDE.md` on architecture is a bug in one of them, the same
rule the opening of root `CLAUDE.md` states for facility against root. **Process rules are not specs.** Source order, issue
hygiene and commit boundaries stay in `CLAUDE.md`, and `config.yaml` rules point at the section.

### D3. No second copy, ever

A requirement names the slot or table and the reference file that holds the value. It never
states the value. *"The deck SHALL show each position's frequency from
`claude_ZLC_Positions_Reference.md`"*, not the frequency. Scenarios follow the same rule.
The tool's own constants (storage keys, block counts, namespace names) may be stated, because
they are not aviation data and the spec is where they are decided.

*Why so strict:* invariant 5 exists because two copies drift. A spec stating a crossing altitude
becomes the third copy after the reference and the deck, and a CIFP roll updates neither by itself.

### D4. An issue is the queue; a change is the plan for one issue

- A change exists only for an issue, and its proposal names it. `config.yaml` makes this a rule
  for the proposal.
- The pickup comment on the issue links the change folder. The landing comment names the commits
  and says the change was archived.
- Archiving does not close the issue. The §14 rule on who closes is unchanged.
- Baseline changes (D7) share one tracking issue opened from this side.

**When a change is required:** for work that changes a master block, or behaviour in more than one
deck, or adds a capability. A fix inside one deck, or a data-only update such as a CIFP restamp,
may still go straight from issue to commit as today. *Alternative:* a change for everything.
Rejected: it would double the paperwork on the one-line fixes that make up most of the history,
and that is the kind of overhead that gets skipped quietly.

### D5. The commit boundary

- `openspec/specs/<artcc>/` belongs to that ARTCC's tree. It changes only in that ARTCC's commits.
- Everything else under `openspec/` is repo-level (`config.yaml`, the root-level specs and the
  change folders). It rides along with one ARTCC's commit when the work came out of that ARTCC,
  under the existing §14 rule, and is otherwise its own commit.
- A change that spans ARTCCs (the CIFP roll) is planned once and implemented in one commit per
  ARTCC. Its archive is a repo-level commit of its own, after the last ARTCC commit.

### D6. The spec layout

```
openspec/specs/
  deck-shell/              blocks and order, namespace, three pages, persistence, offline,
                           the one optional network call, design system      <- CLAUDE.md s1, s4
  honesty/                 SLOTS, OPEN_Q, STANDING empty, notes layer export <- s5
  masters/
    strip/  fly-player/  drill-builder/  route-draw/  datis-reader/          <- the block refs
  pipelines/cifp/  pipelines/vnas/  site-publishing/
  zmp/{m98,r90,zmp-center}/  zau/{c90,azo}/  zlc/{s56,big-sky}/  zid/{ind,sdf,cvg}/
```

A facility spec holds only what is particular to that facility: M98's grading against its standing
items, the ZLC flow branch, AZO's overflights only. Whatever a deck inherits from a master or from
`deck-shell` is not restated. Path segments are kebab-case, so `Big Sky` becomes `big-sky`.

### D7. Backfill: baseline changes, masters first, facilities on contact

Existing behaviour comes in through **baseline changes**: ADDED requirements written from the
reference file and the harness, no tool change, archived on landing. Order:

1. **The five masters.** The code is byte-identical everywhere it appears, the contracts are
   already written, and the harness check lists turn into scenarios almost line for line.
2. **`deck-shell` and `honesty`**, from `CLAUDE.md` §1, §4 and §5.
3. **`pipelines/cifp`**, before the 261126 roll, so #75 and the roll are checked against it.
4. **Facility specs only when facility work touches them.** Never in bulk, because a bulk backfill
   of ten decks would be written from the code, and the code is what a spec is meant to check.

**Every scenario names its proof:** the harness check that asserts it, or *"checked by driving the
page"*, or *"unverified"*. That is invariant 2 applied to the specs themselves: a gap the spec
shows is a gap someone can close.

### D8. `--tools none`

The OpenSpec skills are installed per user under `~/.claude/skills/`, so nothing for them needs to
be in the tree. Project copies would publish skill files the tools do not use.

### D9. What `config.yaml` carries

- **`context`**: only what an agent cannot infer by reading the code. No Node and no Python here,
  so the browser runner is the harness. The repository is public. Root `CLAUDE.md` is read first.
- **`rules`**:
  - *proposal*: name the issue; name the ARTCC trees touched; cite document, paragraph and cycle
    for any aviation number mentioned.
  - *specs*: D3; every scenario names its proof (D7); never quote a practice log or OJT review;
    never add to `STANDING`.
  - *design*: name the masters touched and every deck that carries them.
  - *tasks*: one commit per ARTCC; regenerate the paste-block files; the last tasks run each
    affected browser runner and record the check counts, then post the landing comment.
- **`operations`**: *apply* follows the task list and reports exactly which checks ran (§12);
  *archive* happens in the landing commit, or in the repo-level commit for a cross-ARTCC change.

## Risks / Trade-offs

- **Specs drift from the code, with nothing executable linking them** -> every scenario names its
  proof (D7), and a commit that changes a master or a deck's behaviour updates the spec in the
  same commit (a tasks rule).
- **A number slips into a spec** -> the D3 rule in `config.yaml`, plus the review step. A spec
  diff showing an altitude, a frequency or a fix coordinate is the tell.
- **`git log -- ZLC/` misses ZLC specs** -> accepted (D1). Document it in the new `CLAUDE.md`
  section: `git log -- ZLC/ openspec/specs/zlc/`.
- **Two places to read before changing a master** -> the block reference stays the narrative and
  the spec is the contract, until the Open Question below is settled.
- **Public by default** -> plans and contracts only; the specs rule forbids quoting performance
  records (§13, §14).

## Migration Plan

1. `openspec init --tools none` at the root. **Done 2026-11-18**, uncommitted.
2. Fill `config.yaml` (D9).
3. Amend root `CLAUDE.md`: §14 (D4, D5), and a short OpenSpec section stating D2, D3, D6 and D7.
4. Open the tracking issue for this change and the baseline work.
5. Commit at the repo level: `openspec/` and root `CLAUDE.md` only, touching no facility folder.
6. Archive this change in that commit or the next. Then the first baseline change: the masters.

**Rollback:** delete `openspec/` and revert the `CLAUDE.md` commit. No tool reads `openspec/`,
so nothing else moves.

## Open Questions

- **Do the five `claude_*_Block_Reference.md` files shrink once their master specs exist?** They
  carry history and rationale as well as the contract. Deferrable: until it is decided, the spec
  cites the reference and the reference is unchanged.
- **Should a deck's *what this tool knows* page ever link a spec?** No tool reads `openspec/`
  today, and none needs to.
