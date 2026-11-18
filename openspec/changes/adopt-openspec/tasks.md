# Tasks

## 1. The OpenSpec root

- [x] 1.1 Run `openspec init --tools none` at the repository root; verify `openspec/config.yaml`, `openspec/specs/` and `openspec/changes/archive/` exist and no skill or command files were added to the tree (`git status --short` shows only `openspec/`). Done 2026-11-18.
- [x] 1.2 Fill `openspec/config.yaml` with the `context`, per-artifact `rules` and `operations` guidance in design D9, keeping `schema: spec-driven`; verify `openspec instructions proposal --change adopt-openspec --json` returns the new proposal rules and `openspec validate adopt-openspec` still passes.
- [x] 1.3 Confirm nothing under `openspec/` can reach the published site; verify `sh build-site.sh` succeeds and lists only the ten tools, `index.html`, `.nojekyll` and `robots.txt` in `_site/`.

## 2. Root `CLAUDE.md`

- [x] 2.1 Add a short OpenSpec section as §5.1, at the end of section 5 (the honesty machinery), so no later section renumbers and no existing `§N` citation breaks, stating design D2 (who is authoritative for what), D3 (no second copy), D6 (the layout) and D7 (backfill order, and every scenario names its proof); verify it is reachable from the opening paragraph's list of companion files.
- [x] 2.2 Amend section 14: an issue is the queue and a change is the plan for one issue; when a change is required (D4); `openspec/specs/<artcc>/` belongs to that ARTCC's tree and the rest of `openspec/` is repo-level (D5); add `git log -- <ARTCC>/ openspec/specs/<artcc>/` beside the existing commit-boundary check. Verify by reading section 14 cold: a session opening an issue can tell whether it needs a change.
- [x] 2.3 Check every other root reference to the work queue, the commit boundary and the companion files says the same thing (`grep -n -i "work queue\|repo-level\|one ARTCC" CLAUDE.md`); fix any sentence the new rules contradict, in the same commit.

## 3. The tracker and the commit

- [x] 3.1 Open one issue from this side, *Adopt OpenSpec: the root, the rules and the baseline specs*, carrying the What, Why, What it needs and Where shape of section 14 and linking `openspec/changes/adopt-openspec/`; verify the issue exists and names this change.
- [x] 3.2 Commit `openspec/` and root `CLAUDE.md` together as a repo-level commit naming the issue; verify `git diff --cached --name-only | cut -d/ -f1 | sort -u` prints only `CLAUDE.md` and `openspec`.
- [x] 3.3 Run `openspec validate adopt-openspec --strict` before archiving; verify it passes with `skip_specs: true` and no spec deltas.

## Workflow follow-up

- Archive this change in the landing commit (design D5: it touches no ARTCC tree), then post the landing comment on the issue from 3.1 naming the commit.
- Then open the first baseline change, the five master blocks (design D7 step 1), under the same tracking issue.
- The owner pushes. Nothing here is pushed from this session without being asked.
