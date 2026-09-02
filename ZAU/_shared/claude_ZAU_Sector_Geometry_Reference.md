# ZAU sector geometry reference — C90, AZO, and the en route sectors

Decoded from the **VATGlasses ZAU dataset** vendored at `source-vatglasses/` — a dataset
**owned and maintained by ZAU vARTCC** (manager Joe Nyquist, `Saluki00`), pinned at commit
`c469b4299d7a4e39590e002b8c922880c5c92a91` (2026-08-26) and pulled 2026-09-02.

Read `source-vatglasses/ATTRIBUTION.md` before using any of this: the data is **CC BY-NC-SA
4.0**, and a tool that draws these boundaries **must credit VATGlasses on the page**.

See `../../claude_Community_Geometry_Sources.md` for how the source was verified and what it
may and may not be used for.

---

## Read this before moving a `SLOTS` state

**What ZAU gives is less than ZLC gives, and the difference decides what may be claimed.**

`ZAU/CLAUDE.md` lists *"the boundary"* empty for C90 and *"sector boundaries"* empty for AZO.
This file fills **the facility footprint and its ceiling** and **nothing below that**:

- **C90 is one polygon, surface–FL150, 35 vertices** — shared by four positions.
- **AZO "Great Lakes" is one polygon, surface–FL100, 32 vertices** — shared by three positions.

The internal split exists **only as an ownership priority chain**, not as geometry. There is no
per-sector shape for any C90 sector and none for any of AZO's six West Wall sectors.

**So this answers _is this inside the facility, and under its lid_. It does not answer _which
sector owns this_.** A tool may draw the footprint, test containment and test the ceiling. It
may **not** claim a sector boundary was crossed (root `CLAUDE.md` invariant 3), and the AZO
West Wall sector-boundary slot **stays empty**.

Neither facility's blocks carry a runway gate, so unlike ZLC there is no flow branching in the
ZAU geometry.

---

## How to read this

Each entry is one lateral shape sliced vertically; the upstream specification requires blocks
to have *"consistent lateral boundaries at all levels."* Floors and ceilings are **inclusive,
in hundreds of feet** — `FL100` is 10,000 ft. Absent floor is the surface; absent ceiling is
unlimited. Points decode from `["-ddmmss","-dddmmss"]` as `sign x (dd + mm/60 + ss/3600)`;
the decode was verified against six known field positions (see the companion ZLC file).

Ownership chains come from `source-vatglasses/ownership/default.json`, described upstream as
*"All areas are standalone and combine directly into 35. 35 covers C90 top down."* An
alternative `highlow.json` splits the ARTCC into high and low hierarchies —
*"combine directly into 89 (High) or 35 (Low). 35 covers all TRACONs top down"* — but **neither
file subdivides either TRACON.**

---

# The two terminal facilities


### `AZO` — Great Lakes

- **Group (area)** `APP` · **Frequency** — · **Logon** ?_?
- **Ownership chain** `Z1G → Z1R → Z1N → 26 → 25 → 60 → 81 → 89 → 75 → 35`
- **Extent** 41.625–43.685 N, 84.667–87.000 W · 1 blocks, 32 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | surface | FL100 | *any* | 32 |

### `C90` — Chicago

- **Group (area)** `APP` · **Frequency** — · **Logon** ?_?
- **Ownership chain** `O1Z → O1B → O1S → O1X → 35`
- **Extent** 41.350–42.500 N, 87.000–88.820 W · 1 blocks, 35 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | surface | FL150 | *any* | 35 |

## The positions that share those two polygons

Named in `source-vatglasses/positions.json`. **These are VATGlasses handles, not handoff IDs**
— see `../../claude_Community_Geometry_Sources.md` §6.

| Key | Voice callsign | Logon | Type | Frequency |
|---|---|---|---|---|
| `O1Z` | Chicago Approach | CHI | APP | 119.000 |
| `O1S` | Chicago Approach | CHI | APP | 128.200 |
| `O1X` | Chicago Approach | CHI | APP | 135.075 |
| `O1B` | Chicago Approach | CHI | DEP | 128.575 |
| `Z1G` | Great Lakes Approach | AZO | APP | 128.400 |
| `Z1N` | Great Lakes Approach | AZO | APP | 119.800 |
| `Z1R` | Great Lakes Approach | AZO | APP | 121.200 |

**Cross-check these against the facility orders before use.** ZAU has no equivalent of the
twenty-frequency ZLC confirmation, and the C90 and AZO SOPs are the authority (root
`CLAUDE.md` invariant 7). Four C90 positions here against the C90 order's position list, and
three AZO positions against the six West Wall sectors in AZO 2-2/2-3, is itself a discrepancy
worth an owner question — **VATGlasses models fewer positions than the orders define.**

---

# ZAU en route sectors

Nineteen sectors, fully described with stratums — the familiar low / high / ultra-high split.
**Relevant only if a ZAU Center tool is ever built**; neither C90 nor AZO needs them, beyond
knowing that both TRACONs sit under sector `35` (BEARZ) top down.

No such file or directory at C:/Users/LOVERB~1/AppData/Local/Temp/claude/C--Dev-Vatsim-Training-Tools/f6210f82-cb7b-4b15-981c-f51f45f9f86b/scratchpad/enr.pl line 2.
| Key | Name | Frequency | Bands | Ownership chain |
|---|---|---|---|---|
| `25` | PMM (25) | 126.125 | FL200–UNL, FL240–UNL | `25 → 60 → 75 → 35` |
| `26` | KUBBS (26) | 133.200 | SFC–FL100, FL101–FL199, SFC–FL239 | `26 → 25 → 60 → 75 → 35` |
| `35` | BEARZ (35) | 134.875 | SFC–FL130, FL131–FL239, FL240–FL259 | `35` |
| `36` | FWA (36) | 126.325 | FL240–FL259, FL260–UNL | `36 → 35` |
| `44` | EON (44) | 120.125 | SFC–FL109, FL110–FL239 | `44 → 46 → 52 → 35` |
| `46` | BVT (46) | 121.275 | FL240–FL290, FL240–UNL | `46 → 52 → 35` |
| `51` | PLANO (51) | 135.150 | SFC–FL100, FL101–FL239, FL101–FL109, FL101–FL130, FL131–FL239 | `51 → 46 → 52 → 35` |
| `52` | BDF (52) | 132.225 | FL240–FL339 | `52 → 46 → 35` |
| `55` | BRL (55) | 118.750 | SFC–FL100, SFC–FL51, FL51–FL100, FL101–FL239, SFC–FL60 | `55 → 52 → 46 → 35` |
| `60` | BAE (60) | 126.875 | FL240–UNL | `60 → 75 → 35` |
| `62` | HARLY (62) | 123.825 | SFC–FL239 | `62 → 60 → 75 → 35` |
| `63` | DBQ (63) | 133.950 | SFC–FL239, SFC–FL100, SFC–FL120 | `63 → 60 → 75 → 35` |
| `64` | LNR (64) | 133.300 | SFC–FL239, SFC–FL120 | `64 → 60 → 75 → 35` |
| `74` | FARMM (74) | 133.350 | SFC–FL120, FL121–FL239 | `74 → 75 → 60 → 35` |
| `75` | COTON (75) | 127.775 | FL240–UNL, FL330–UNL | `75 → 60 → 94 → 52 → 35` |
| `77` | MALTA (77) | 134.825 | SFC–FL239 | `77 → 75 → 35` |
| `81` | CRIBB (81) | 120.350 | SFC–FL239 | `81 → 89 → 35` |
| `89` | GIJ (89) | 126.475 | FL239–FL290, FL291–UNL | `89 → 35` |
| `94` | IOW (94) | 125.575 | FL239–UNL, FL240–FL329, FL340–UNL | `94 → 75 → 52 → 46 → 35` |

---

## What this still does not give

- **Any internal sectorisation of C90 or AZO** — the point above, and the reason both
  sector-boundary slots stay empty.
- **The TRSA depiction**, the Arrival Descent Area shapes, all procedure geometry (STAR and
  SID), and the MVA map. None are present in any community source.
- **Any handoff ID**, and this one is a live blocker rather than a footnote. The dataset carries
  none — its positions have only `callsign`, `colours`, `frequency`, `pre`, `type`, and the keys
  `C90`/`AZO`/`35` are display handles (`../../claude_Community_Geometry_Sources.md` §6).
  **STARS-side IDs come from vNAS, always** — and **there is no ZAU vNAS record in this
  repository.** `ZMP/_vnas/ZMP_vnas.json` is the only one held. So C90 and AZO have **no handoff
  ID source at all today.**

  The pull that would close it, matching how ZMP's was obtained:

  ```bash
  curl -sL "https://data-api.vnas.vatsim.net/api/artccs/ZAU" -o ZAU_vnas.json
  ```

  **Endpoint verified 2026-09-02** — HTTP 200, 581 KB, carrying `starsId` and
  `singleCharacterStarsId`. One `curl` closes this gap.

  What to read out of it: each position's `starsConfiguration` (TCP), and the ARTCC's
  `neighboringStarsConfigurations` entries — `starsId`, `twoCharacterStarsId`,
  `singleCharacterStarsId` and `fieldEFormat`. It would also settle the position-count
  discrepancy above, since vNAS enumerates every adapted position.
