# Tasks

## 1. Prove the proofs

- [ ] 1.1 For every check name quoted on a PROOF line in the five specs, confirm it appears in `ZID/IND/smoke-test.mjs`, `ZID/SDF/smoke-test.mjs` and `ZID/CVG/smoke-test.mjs`. Treat a templated name (`<configuration>`, `<station> <preset>`) as matching the string it is built from. Verify with a `perl` pass that prints each quoted name and the decks it is missing from, and correct any spec whose quote is missing or present in fewer decks, saying which.
- [ ] 1.2 Confirm the five masters are still byte-identical in every deck that carries them (the `perl` drift check in `claude_Fly_Block_Reference.md` section 7), and verify the result is 26 "identical" (eight decks for strip, fly and drill, three for route draw and D-ATIS).
- [ ] 1.3 Serve the repository over local HTTP and run the IND, SDF and CVG browser runners. Record each check count and pass/fail in this file under the task, and verify every check quoted in the specs passed. If one fails, change that scenario's PROOF to *contradicted* with the failing count, and file an issue for it before going on.

## 2. Records

- [ ] 2.1 Open one issue from this side for the stale and wrong lines in the block references listed in design D4, with the What, Why, What it needs and Where shape of root `CLAUDE.md` section 14; verify the issue exists and names each line by file and section.
- [ ] 2.2 Comment on #79 that `masters/drill-builder` carries the generated-starting-altitude requirement with its proof marked *contradicted* by #79, so the fix's commit must turn it into a harness check; verify the comment is posted.

## 3. Land

- [ ] 3.1 Run `openspec validate baseline-master-blocks --strict`, and scan the specs for aviation values (runway designators, altitudes, flight levels, frequencies, ICAO codes, procedure names); verify validation passes and the scan finds none.
- [ ] 3.2 Commit this change folder as a repo-level commit naming #80 and staged by path; verify `git diff --cached --name-only | cut -d/ -f1 | sort -u` prints only `openspec`, and the ARTCC spec-folder check prints nothing.
- [ ] 3.3 Post the landing comment on #80 naming the commit, the runner counts from 1.3, the number of scenarios at each proof grade, and what is left (`deck-shell` and `honesty` next); verify the comment is posted.

## Workflow follow-up

- Archive the change, which creates the five main specs under `openspec/specs/masters/`. Fold it into the 3.2 commit if it is done first, otherwise use a repo-level commit of its own.
- Next baseline change under #80: `deck-shell` and `honesty`.
- The owner pushes.
