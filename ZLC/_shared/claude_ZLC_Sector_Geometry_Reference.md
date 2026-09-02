# ZLC sector geometry reference — S56 and Big Sky

**The sector boundaries are no longer names without shapes.** This file records the lateral and
vertical structure of every S56 and Big Sky sector, decoded from the **VATGlasses ZLC dataset**
vendored at `source-vatglasses/` — a dataset **owned and maintained by ZLC vARTCC** (manager
Adam Earl, `shadeddude`), pinned at commit `c469b4299d7a4e39590e002b8c922880c5c92a91`
(2026-08-26) and pulled 2026-09-02.

Read `source-vatglasses/ATTRIBUTION.md` before using any of this: the data is **CC BY-NC-SA
4.0**, and a tool that draws these boundaries **must credit VATGlasses on the page**.

Companion files: `claude_ZLC_Positions_Reference.md` for positions and frequencies,
`../../claude_Community_Geometry_Sources.md` for how the source was verified and what it may
and may not be used for.

---

## How to read this

Each sector is **one lateral shape sliced vertically**. The upstream format specification
(wiki `Static-Data-Format.md`) is explicit: sub-sectors *"must be uniform blocks with
consistent lateral boundaries at all levels."* So a sector with nine blocks is not nine shapes
— it is a stack, and the same outline may recur at several altitude bands with different
runway gating.

- **Floor and ceiling are inclusive**, in hundreds of feet. `FL69` is 6,900 ft, `FL224` is
  22,400 ft. Absent floor is the surface; absent ceiling is unlimited.
- **`Required runway configuration`** is the gate: the block exists only while that
  configuration is active. This is where flow lives — see below.
- **Ownership chain** is *"ID of owning positions (in descending order of priority)"*, from
  `source-vatglasses/ownership/default.json`. It is the combining chain, as a ranked list
  rather than the single `into` pointer used in the tools.
- **Extent** is the bounding box of every vertex in every block, for sanity-checking only. It
  is not a boundary.

### Coordinate decode

Upstream stores each point as `["-ddmmss", "-dddmmss"]` — degrees, minutes, **seconds**, packed,
optionally signed. Decode as `sign x (dd + mm/60 + ss/3600)`.

**Verified, not assumed:** decoding the set and taking each approach sector's centroid puts it
on the right airport in six independent cases (KSLC, KBZN, KBOI, KGTF, KTWF, KHLN). A
decimal-minutes misreading would have thrown every one by tens of miles. Note the data is **not
normalised** — values such as `-1120560` (112 deg 05' 60") occur and are arithmetically correct
when read as `mm/60 + ss/3600`. Do not "fix" them.

### Flow is encoded in the runway gate

This is the part that closes a live gap. The four configurations referenced across the whole
ZLC dataset are:

| Gate | Flow | Appears in |
|---|---|---|
| `KSLC 34L/R, 35` | **S56 North Flow** | 36 blocks |
| `KSLC 16L/R, 17` | **S56 South Flow** | 46 blocks |
| `KBOI 10L/R` | **BOI East Flow** | 6 blocks |
| `KBOI 28L/R` | **BOI West Flow** | 6 blocks |

`ZLC/CLAUDE.md` lists configuration as deliberately empty — *"S56 procedures branch on North
Flow vs South Flow almost everywhere; the selector does not model flow yet."* **The geometry
carries the branch**: selecting a flow selects which blocks exist. Big Sky is the cleanest
illustration — `B1A` Alpine and `B1S` Sage hold the same two bands over the same total
airspace, and **swap shapes** between east and west flow (17/26 vertices one way, 30/45 the
other).

---

## Divergence from the AFV inheritance tree — recorded, not resolved

`claude_ZLC_Positions_Reference.md` states, from the AFV tree in
`ZLC_Position_And_Frequency_Info.pdf`, that Bozeman *"folds upward to `SLC_08_CTR` →
`SLC_06_CTR` (Center Area A)"*.

**VATGlasses `default.json` gives `B1Z → 06 → 14 → 04 → 44` — it goes straight to 06 and never
passes through 08**, although sector 08 exists in its position list. The two agree that Bozeman
folds into Center Area A and never into Boise; they disagree on whether 08 is a step in the
chain.

Per root `CLAUDE.md` §6 this is **named, not resolved.** The AFV tree is documentary and
outranks community data; the divergence is an owner question. **Boise agrees on both sides** —
ours says BOI folds to sector 30, and VATGlasses gives `B1A → B1S → 30 → …`.

---

## The structural constraint still holds

`ZLC/CLAUDE.md`: Big Sky's two areas **do not share an airspace boundary**, so `into` must
never point across an area. The geometry confirms it — the BOI extent is 42.97–44.22 N /
115.30–117.13 W and the BZN extent is 45.12–46.27 N / 110.00–112.10 W, **more than fifty miles
apart with no shared edge**, and the two ownership chains diverge immediately (`30` for Boise,
`06` for Bozeman). Keep encoding that constraint in the data shape rather than in a note.

---

# S56 — Salt Lake City Approach

Nine sectors. Frequencies cross-checked against `claude_ZLC_Positions_Reference.md`; all nine
match the facility SOP.

### `S5A` — S56 - Alpine

- **Group (area)** `APP` · **Frequency** 118.850 · **Logon** SLC_APP
- **Ownership chain** `S5A → S5J → S5K → 32 → 11 → 04 → 44`
- **Extent** 39.878–40.468 N, 111.505–112.293 W · 2 blocks, 84 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL70 | FL84 | KSLC 34L/R, 35 | 14 |
| 2 | surface | FL69 | KSLC 34L/R, 35 | 70 |

### `S5B` — S56 - Bear

- **Group (area)** `APP` · **Frequency** 124.900 · **Logon** SLC_APP
- **Ownership chain** `S5B → S5K → 32 → 11 → 04 → 44`
- **Extent** 40.808–41.632 N, 111.876–112.539 W · 6 blocks, 147 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL105 | FL224 | KSLC 34L/R, 35 | 53 |
| 2 | FL95 | FL154 | KSLC 34L/R, 35 | 6 |
| 3 | FL95 | FL224 | KSLC 16L/R, 17 | 48 |
| 4 | FL95 | FL124 | KSLC 16L/R, 17 | 17 |
| 5 | FL95 | FL224 | KSLC 16L/R, 17 | 16 |
| 6 | FL95 | FL124 | KSLC 16L/R, 17 | 7 |

### `S5F` — S56 - Final

- **Group (area)** `APP` · **Frequency** 125.700 · **Logon** SLC_APP
- **Ownership chain** `S5F → S5J → S5B → S5K → 32 → 11 → 04 → 44`
- **Extent** 40.458–41.125 N, 111.874–112.188 W · 9 blocks, 82 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL85 | FL114 | KSLC 34L/R, 35 | 8 |
| 2 | surface | FL84 | KSLC 34L/R, 35 | 15 |
| 3 | FL75 | FL104 | KSLC 16L/R, 17 | 5 |
| 4 | FL75 | FL104 | KSLC 16L/R, 17 | 7 |
| 5 | surface | FL84 | KSLC 16L/R, 17 | 14 |
| 6 | FL85 | FL104 | KSLC 16L/R, 17 | 13 |
| 7 | surface | FL84 | KSLC 16L/R, 17 | 8 |
| 8 | FL85 | FL104 | KSLC 16L/R, 17 | 5 |
| 9 | FL75 | FL114 | KSLC 16L/R, 17 | 7 |

### `S5G` — S56 - Gunnison

- **Group (area)** `APP` · **Frequency** 126.250 · **Logon** SLC_APP
- **Ownership chain** `S5G → S5K → 32 → 11 → 04 → 44`
- **Extent** 40.771–41.410 N, 112.032–112.737 W · 10 blocks, 68 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL155 | FL224 | KSLC 34L/R, 35 | 6 |
| 2 | surface | FL224 | KSLC 34L/R, 35 | 8 |
| 3 | surface | FL144 | KSLC 34L/R, 35 | 5 |
| 4 | FL115 | FL224 | KSLC 34L/R, 35 | 8 |
| 5 | FL145 | FL224 | KSLC 34L/R, 35 | 11 |
| 6 | FL105 | FL224 | KSLC 16L/R, 17 | 8 |
| 7 | FL95 | FL224 | KSLC 16L/R, 17 | 8 |
| 8 | surface | FL224 | KSLC 16L/R, 17 | 5 |
| 9 | surface | FL144 | KSLC 16L/R, 17 | 5 |
| 10 | FL95 | FL144 | KSLC 16L/R, 17 | 4 |

### `S5H` — S56 - Hart

- **Group (area)** `APP` · **Frequency** 121.100 · **Logon** SLC_APP
- **Ownership chain** `S5H → S5B → S5K → 32 → 11 → 04 → 44`
- **Extent** 40.805–41.632 N, 111.874–112.737 W · 11 blocks, 163 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | surface | FL114 | KSLC 34L/R, 35 | 8 |
| 2 | surface | FL144 | KSLC 34L/R, 35 | 9 |
| 3 | surface | FL104 | KSLC 34L/R, 35 | 43 |
| 4 | surface | FL84 | KSLC 34L/R, 35 | 7 |
| 5 | surface | FL64 | KSLC 34L/R, 35 | 11 |
| 6 | surface | FL64 | KSLC 34L/R, 35 | 8 |
| 7 | surface | FL94 | KSLC 16L/R, 17 | 48 |
| 8 | surface | FL104 | KSLC 16L/R, 17 | 8 |
| 9 | surface | FL94 | KSLC 16L/R, 17 | 5 |
| 10 | surface | FL74 | KSLC 16L/R, 17 | 9 |
| 11 | surface | FL74 | KSLC 16L/R, 17 | 7 |

### `S5J` — S56 - Jordan

- **Group (area)** `APP` · **Frequency** 128.600 · **Logon** SLC_APP
- **Ownership chain** `S5J → S5S → S5K → 32 → 11 → 04 → 44`
- **Extent** 39.878–40.796 N, 111.505–112.293 W · 12 blocks, 162 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL135 | FL224 | KSLC 34L/R, 35 | 5 |
| 2 | FL85 | FL224 | KSLC 34L/R, 35 | 14 |
| 3 | FL85 | FL224 | KSLC 34L/R, 35 | 5 |
| 4 | FL70 | FL224 | KSLC 16L/R, 17 | 13 |
| 5 | surface | FL69 | KSLC 16L/R, 17 | 48 |
| 6 | surface | FL224 | KSLC 16L/R, 17 | 5 |
| 7 | surface | FL84 | KSLC 16L/R, 17 | 9 |
| 8 | FL85 | FL224 | KSLC 16L/R, 17 | 7 |
| 9 | surface | FL224 | KSLC 16L/R, 17 | 7 |
| 10 | FL85 | FL224 | KSLC 16L/R, 17 | 12 |
| 11 | FL70 | FL84 | KSLC 16L/R, 17 | 9 |
| 12 | surface | FL69 | KSLC 16L/R, 17 | 28 |

### `S5K` — S56 - Lake

- **Group (area)** `APP` · **Frequency** 135.500 · **Logon** SLC_APP
- **Ownership chain** `S5K → 32 → 11 → 04 → 44`
- **Extent** 40.669–41.385 N, 111.517–112.375 W · 17 blocks, 164 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL85 | FL224 | KSLC 34L/R, 35 | 12 |
| 2 | surface | FL84 | KSLC 34L/R, 35 | 17 |
| 3 | FL85 | FL224 | KSLC 34L/R, 35 | 8 |
| 4 | FL65 | FL224 | KSLC 34L/R, 35 | 11 |
| 5 | FL65 | FL224 | KSLC 34L/R, 35 | 8 |
| 6 | FL65 | FL94 | KSLC 34L/R, 35 | 5 |
| 7 | FL85 | FL94 | KSLC 34L/R, 35 | 9 |
| 8 | surface | FL84 | KSLC 34L/R, 35 | 12 |
| 9 | surface | FL84 | KSLC 16L/R, 17 | 11 |
| 10 | FL85 | FL224 | KSLC 16L/R, 17 | 7 |
| 11 | surface | FL224 | KSLC 16L/R, 17 | 5 |
| 12 | FL115 | FL224 | KSLC 16L/R, 17 | 9 |
| 13 | FL105 | FL224 | KSLC 16L/R, 17 | 15 |
| 14 | FL125 | FL224 | KSLC 16L/R, 17 | 5 |
| 15 | surface | FL224 | KSLC 16L/R, 17 | 5 |
| 16 | FL95 | FL224 | KSLC 16L/R, 17 | 6 |
| 17 | FL125 | FL224 | KSLC 16L/R, 17 | 19 |

### `S5S` — S56 - Stockton

- **Group (area)** `APP` · **Frequency** 128.100 · **Logon** SLC_APP
- **Ownership chain** `S5S → S5B → S5K → 32 → 11 → 04 → 44`
- **Extent** 40.081–40.850 N, 111.893–112.652 W · 7 blocks, 72 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL115 | FL224 | KSLC 34L/R, 35 | 8 |
| 2 | surface | FL144 | KSLC 34L/R, 35 | 7 |
| 3 | surface | FL224 | KSLC 34L/R, 35 | 12 |
| 4 | FL105 | FL124 | KSLC 16L/R, 17 | 5 |
| 5 | surface | FL84 | KSLC 16L/R, 17 | 18 |
| 6 | FL85 | FL224 | KSLC 16L/R, 17 | 15 |
| 7 | surface | FL144 | KSLC 16L/R, 17 | 7 |

### `S5V` — S56 - Valley

- **Group (area)** `APP` · **Frequency** 120.900 · **Logon** SLC_APP
- **Ownership chain** `S5V → S5F → S5J → S5K → 32 → 11 → 04 → 44`
- **Extent** 40.354–40.681 N, 111.517–111.939 W · 1 blocks, 8 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | surface | FL84 | KSLC 34L/R, 35 | 8 |

---

# Big Sky Approach

Two areas that do not share a boundary, plus the Bozeman tower shape the dataset also carries.
Frequencies here confirm all three corrections recorded in `claude_ZLC_Positions_Reference.md`.

### `B1A` — Big Sky - Alpine

- **Group (area)** `APP` · **Frequency** 126.900 · **Logon** BOI_APP
- **Ownership chain** `B1A → B1S → 30 → 31 → 41 → 40 → 43 → 44`
- **Extent** 42.972–44.216 N, 115.297–117.130 W · 4 blocks, 118 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL70 | FL164 | KBOI 10L/R | 17 |
| 2 | surface | FL69 | KBOI 10L/R | 26 |
| 3 | surface | FL69 | KBOI 28L/R | 45 |
| 4 | FL70 | FL164 | KBOI 28L/R | 30 |

### `B1L` — Bozeman

- **Group (area)** `TWR` · **Frequency** 118.200 · **Logon** BZN_TWR
- **Ownership chain** `B1L → B1Z → 06 → 14 → 04 → 44`
- **Extent** 45.669–45.859 N, 111.025–111.267 W · 1 blocks, 22 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | surface | FL74 | *any* | 22 |

### `B1S` — Big Sky - Sage

- **Group (area)** `APP` · **Frequency** 119.600 · **Logon** BOI_APP
- **Ownership chain** `B1S → B1A → 31 → 30 → 41 → 40 → 43 → 44`
- **Extent** 42.972–44.216 N, 115.297–117.130 W · 4 blocks, 118 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL70 | FL164 | KBOI 10L/R | 30 |
| 2 | surface | FL69 | KBOI 10L/R | 45 |
| 3 | FL70 | FL164 | KBOI 28L/R | 17 |
| 4 | surface | FL69 | KBOI 28L/R | 26 |

### `B1Z` — Big Sky - Bozeman

- **Group (area)** `APP` · **Frequency** 118.975 · **Logon** BZN_APP
- **Ownership chain** `B1Z → 06 → 14 → 04 → 44`
- **Extent** 45.117–46.269 N, 110.000–112.104 W · 2 blocks, 87 vertices

| Block | Floor | Ceiling | Required runway configuration | Vertices |
|---|---|---|---|---|
| 1 | FL75 | FL164 | *any* | 32 |
| 2 | surface | FL74 | *any* | 55 |

---

## What this still does not give

Moving a `SLOTS` state on the strength of this file means filling the table it names in the
same commit (root `CLAUDE.md` §11). These are **not** filled by it:

- **The gates.** Antelope, Keyhole, Jepson, Avon, Bird and the Ellis Corridor are still names
  without shapes. VATGlasses draws sectors, not gates.
- **The P2/P3/P4 areas and the Heber Shelf line.** Not present.
- **MVAs.** Not present in any of the three community sources.
- **Routes and fixes.** KOURT, SPUUD, SADYL, JIMMI, KYANN, BEWTE, TOILS, BGSKY, BOBKT, MEADO,
  HIA, UDUZU, IRRON, NICHOL, HLMET, STACO remain named but unlocated.
- **Any handoff ID**, and this one is a live blocker rather than a footnote. The dataset carries
  none — its positions have only `callsign`, `colours`, `frequency`, `pre`, `type`, and the
  keys `S5A`/`B1Z` are display handles (`../../claude_Community_Geometry_Sources.md` §6).
  **STARS-side IDs come from vNAS, always** — and **there is no ZLC vNAS record in this
  repository.** `ZMP/_vnas/ZMP_vnas.json` is the only one held. So S56 and Big Sky have **no
  handoff ID source at all today**, and nothing in this file may be pressed into that role.

  The pull that would close it, matching how ZMP's was obtained:

  ```bash
  curl -sL "https://data-api.vnas.vatsim.net/api/artccs/ZLC" -o ZLC_vnas.json
  ```

  **Endpoint verified 2026-09-02** — HTTP 200, 344 KB, and the payload does carry `starsId`
  (`BBB`, `FFF`, `GGG`, `HHH`, `LLL`, `MMM`, `NNN`, `QQQ`, `UUU`, `VVV`, `ZZZ`) and
  `singleCharacterStarsId`. One `curl` closes this gap.

  What to read out of it: each position's `starsConfiguration` (TCP), and the ARTCC's
  `neighboringStarsConfigurations` entries — `starsId`, `twoCharacterStarsId`,
  `singleCharacterStarsId` and `fieldEFormat`, which together decide how a Center sector
  addresses a handoff to S56 or Big Sky. `claude_ZMP_Handoff_ID_Reference.md` §1.3 documents
  the five Field E formats.

Recovering the gates and the shelf lines still means carving the chart images out of the PDFs
and measuring them, the way `claude_M98_DDA_Geometry.md` was produced.
