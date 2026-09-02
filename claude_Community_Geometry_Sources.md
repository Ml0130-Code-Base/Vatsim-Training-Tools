# Community geometry sources — VATGlasses, SimAware TRACON, VAT-Spy

Pulled and verified **2026-09-02**. Sits alongside `claude_CRC_Platform_Reference.md` as a
platform reference: it describes **where sector geometry can be obtained from outside the
facility document sets**, what each source actually contains, and how far each one may be
trusted.

**Read this before writing anything spatial into a tool.** Root `CLAUDE.md` §7 records that
every facility is blocked on geometry because the boundaries are pictures. That is still true
of the *facility documents*. It is no longer true of ZLC and ZAU, and this file is why.

---

## 1. The one-paragraph answer

**VATGlasses carries real sector polygons with real altitude stratums for ZLC and ZAU, and
nothing at all for ZMP.** SimAware carries a lateral facility footprint — no altitudes — for
all seven of our facilities including M98 and R90. VAT-Spy carries ARTCC outer boundaries
only. None of the three is a facility document, so none of them outranks an SOP or an LOA;
all three are **community-maintained second sources**, and that is the tier they are used at.

| Source | Sector polygons | Altitude stratums | Ownership chain | Our facilities covered |
|---|---|---|---|---|
| **VATGlasses** `lennycolton/vatglasses-data` | yes | **yes** | **yes** | ZLC (S56, Big Sky), ZAU (C90, AZO) — **no ZMP** |
| **SimAware TRACON** `VATSIM-Radar/simaware-tracon-project` | facility footprint only | no | no | **all seven**, incl. M98 and R90 |
| **VAT-Spy** `VATSIM-Radar/vatspy-data-project` | ARTCC outline only | no | no | KZLC, KZAU, KZMP |
| **vatsim-radar** `VATSIM-Radar/vatsim-radar` | — | — | — | **not a data source** — it is the consumer |

`vatsim-radar` is the map application. It holds no airspace data of its own; it downloads
VATGlasses at runtime. Its value here is that **its source code is an unambiguous format
reference** — `app/utils/server/vatglasses.ts` names the upstream repository, and
`app/utils/data/vatglasses.ts` declares the sector properties `min`, `max` and `altrange`.

---

## 2. VATGlasses — the one that carries stratums

- **Repository** `https://github.com/lennycolton/vatglasses-data`
- **Pulled at commit** `c469b4299d7a4e39590e002b8c922880c5c92a91`, dated **2026-08-26T03:21:04Z**
- **Licence** **CC BY-NC-SA 4.0** (`LICENSE`) — attribution, **non-commercial**, share-alike.
  See §6; this is the one real constraint on using it.
- **Format specification** the repository wiki, `Static-Data-Format.md` and
  `Ownership-Data-Format.md`. Quoted below by field.
- **Provenance policy** README: *"As a general rule, you should be local staff to add a new
  region"*, and PRs *"without a valid source will be automatically closed."* Contributions
  come from vACC/vARTCC staff. **This is a sourcing policy, not a source** — see §5.

### File layout

ZLC and ZAU both use the **dynamic** format: a directory per ARTCC holding `airspace.json`
(the shapes), `positions.json` (who can own them), and an `ownership/` directory of
alternative combining hierarchies, of which `default.json` is the fallback.

```
data/zlc/airspace.json  positions.json  ownership/{default, Sector 04 A-D Minus C}.json
data/zau/airspace.json  positions.json  ownership/{default, highlow}.json
```

### The fields that matter

From `Static-Data-Format.md`, verbatim on the points that decide correctness:

- `airspace.<key>.id` — name of the ATC sector.
- `airspace.<key>.group` — the **area**, keyed into the top-level `groups` object.
- `airspace.<key>.owner` — *"ID of owning positions (in descending order of priority)"*. This
  is our combining chain, expressed as a full priority list rather than a single `into`
  pointer. In the dynamic format this lives in the `ownership/*.json` file instead.
- `airspace.<key>.sectors[]` — *"Uniform blocks of airspace making up this ATC sector. Each
  element must have the same lateral boundaries at all altitudes."* **This is the stratum
  structure**: one lateral shape, sliced vertically.
  - `min` / `max` — *"Minimum / Maximum altitude (inclusive)"*. **Units are hundreds of feet
    (flight levels)** — the spec does not say so in words, and this is read off the data plus
    `vatsim-radar`'s level filter. Absent `min` means no floor (surface); absent `max` means
    no ceiling.
  - `runways[]` — the block only exists when the named airport is on the named configuration.
    **Much of S56 is runway-dependent**; see §3.
  - `points[]` — coordinate pairs in the packed form **`["-ddmmss", "-dddmmss"]`**.

### Decoding `points` — verified, not assumed

Latitude is `ddmmss`, longitude `dddmmss`, each optionally signed, degrees-minutes-**seconds**.
Decode as `sign × (dd + mm/60 + ss/3600)`.

**This was verified, not inferred.** Decoding the ZLC set and taking the centroid of each
approach sector puts it on the right airport in six independent cases:

| Sector | Decoded centroid | Field | Published position |
|---|---|---|---|
| `S5K` S56 Lake | 41.001, −111.982 | KSLC | 40.79, −111.98 |
| `B1Z` Big Sky Bozeman | 45.722, −111.264 | KBZN | 45.78, −111.15 |
| `B1A`/`B1S` Big Sky Boise | 43.651, −116.234 | KBOI | 43.56, −116.22 |
| `GTF` Great Falls | 47.395, −111.373 | KGTF | 47.48, −111.37 |
| `TWF` Twin Falls | 42.481, −114.404 | KTWF | 42.48, −114.49 |
| `HLN` Helena | 46.676, −112.058 | KHLN | 46.61, −112.00 |

A wrong decode — decimal minutes rather than seconds — would have thrown every one of these
by tens of miles. **Note the data is not normalised**: values such as `-1120560` (112°05′60″)
appear. Read as `mm/60 + ss/3600` they are arithmetically correct; do not "fix" them.

---

## 3. What VATGlasses actually holds for our facilities

### ZLC — 70 airspace entries, 192 vertical blocks, areas `ZLC A/B/C/D` + `APP`/`NAPP`/`RAP`/`TWR`

**S56 is fully sectorised, with stratums, and it matches our nine-sector table exactly.**

| Key | VATGlasses name | Frequency | Our sector (`claude_ZLC_Positions_Reference.md`) |
|---|---|---|---|
| `S5K` | S56 - Lake | 135.500 | Lake `SLC_K_APP` 135.500 |
| `S5G` | S56 - Gunnison | 126.250 | Gunnison `SLC_G_APP` 126.250 |
| `S5B` | S56 - Bear | 124.900 | Bear `SLC_B_APP` 124.900 |
| `S5H` | S56 - Hart | 121.100 | Hart `SLC_H_APP` 121.100 |
| `S5F` | S56 - Final | 125.700 | Final `SLC_F_APP` 125.700 |
| `S5J` | S56 - Jordan | 128.600 | Jordan `SLC_J_APP` 128.600 |
| `S5S` | S56 - Stockton | 128.100 | Stockton `SLC_S_APP` 128.100 |
| `S5V` | S56 - Valley | 120.900 | Valley `SLC_V_APP` 120.900 |
| `S5A` | S56 - Alpine | 118.850 | Alpine `SLC_A_APP` 118.850 |

Stratums are dense and **runway-dependent almost throughout**. `S5K` Lake alone carries ten
distinct blocks (`SFC-84`, `85-224`, `65-224`, `65-94`, `85-94`, `SFC-224`, `115-224`,
`105-224`, `125-224`, `95-224`), each gated on a runway configuration. `S5G` Gunnison carries
eight. **This is exactly the shelf structure the S56 airspace appendices are pictures of.**

Ownership chains run terminal-then-Center, e.g. `S5A → [S5A, S5J, S5K, 32, 11, 04, 44]`.

**Big Sky is sectorised as three, and it confirms all three of our frequency corrections:**

| Key | VATGlasses name | Prefix | Frequency | Bands |
|---|---|---|---|---|
| `B1A` | Big Sky - Alpine | BOI | **126.900** | `70-164*`, `SFC-69*` |
| `B1S` | Big Sky - Sage | BOI | **119.600** | `70-164*`, `SFC-69*` |
| `B1Z` | Big Sky - Bozeman | BZN | **118.975** | `75-164`, `SFC-74` |

Our reference records that the BOI 7110.2B position table and its narrative paragraphs
disagree, and that we took the narrative: Sage 119.600 (3-3-1a), Alpine 126.900 (3-2-1a),
Bozeman 118.975 (3-4-1a). **VATGlasses agrees with the narrative on all three.** That is an
independent confirmation of the §6 "tall rows split a table across lines" recovery.

`B1A` and `B1S` share one lateral shape (identical centroid, 118 points each) — Boise's two
sectors are the same airspace under two configurations, which is why both carry `*`.

### ZAU — 31 airspace entries, 58 vertical blocks, areas `ZAU` + `APP`/`RAP`

**The en route side is fully sectorised with stratums** — 19 sectors, and the strata are the
familiar US low/high/ultra-high split: `SFC-100`, `101-239`, `240-UNL`, `240-339`, `330-UNL`.

**C90 and AZO are not sectorised.** Each is a single lateral polygon with one ceiling:

| Key | Name | Group | Stratum | Vertices |
|---|---|---|---|---|
| `C90` | Chicago | APP | **SFC–FL150** | 35 |
| `AZO` | Great Lakes | APP | **SFC–FL100** | 32 |

The internal split is expressed **only as an ownership priority chain**, in
`ownership/default.json`:

- `"C90": ["O1Z", "O1B", "O1S", "O1X", "35"]`
- `"AZO": ["Z1G", "Z1R", "Z1N", "26", "25", "60", "81", "89", "75", "35"]`

with those positions named in `positions.json`:

| Key | Voice callsign | Prefix | Type | Frequency |
|---|---|---|---|---|
| `O1Z` | Chicago Approach | CHI | APP | 119.000 |
| `O1S` | Chicago Approach | CHI | APP | 128.200 |
| `O1X` | Chicago Approach | CHI | APP | 135.075 |
| `O1B` | Chicago Approach | CHI | DEP | 128.575 |
| `Z1G` | Great Lakes Approach | AZO | APP | 128.400 |
| `Z1N` | Great Lakes Approach | AZO | APP | 119.800 |
| `Z1R` | Great Lakes Approach | AZO | APP | 121.200 |

**So for ZAU the honest statement is: the facility footprint and its ceiling are available,
the internal sector geometry is not.** Four C90 positions share one polygon; three AZO
positions share another. That is enough to answer *"is this inside C90, and below its lid"*
and **not** enough to answer *"which C90 sector owns this."* The ZAU alternative ownership
file `highlow.json` splits the ARTCC into a high and a low hierarchy but does not subdivide
either TRACON.

### ZMP — absent

There is **no `data/zmp`**. The US ARTCC datasets present are `zab zak zau zhn zhu zjx zlc
zma zny zoa zob zse zsu ztl`. **M98 and R90 get nothing from VATGlasses**, and root
`CLAUDE.md` §7 continues to apply to them unchanged.

---

## 4. SimAware TRACON — footprints for all seven, no altitudes

- **Repository** `https://github.com/VATSIM-Radar/simaware-tracon-project`
- **Pulled at commit** `cf9feb3b1ada2a80804fe65777669647e27396fd`, dated **2025-03-30T04:56:23Z**
- **Licence** **none published** — there is no `LICENSE` file (checked, HTTP 404). Treat as
  all-rights-reserved and see §6.
- **Format** one GeoJSON `Feature` per file under `Boundaries/<facility>/<sector>.json`.
  Documented properties are `id`, `prefix`, `suffix`, `name`, `label_lat`, `label_lon`.
  **There is no altitude field in the schema and none in the data** — confirmed by grep across
  all nine files we care about.

Every one of our facilities is present:

| File | `id` / `prefix` | Vertices | Extent | Centroid |
|---|---|---|---|---|
| `M98/M98.json` | M98 / MSP | 19 | — | see §4.1 |
| `R90/OMA.json` | R90 / OMA | 19 | 40.36–41.88 N, 97.40–95.13 W | 41.230, −96.320 |
| `R90/LNK.json` | R90 / LNK | 9 | 40.36–41.26 N, 97.40–96.23 W | 40.943, −96.895 |
| `C90/C90.json` | C90 / CHI | 35 | 41.35–42.50 N, 88.82–87.00 W | 41.870, −87.928 |
| `AZO/AZO.json` | AZO / AZO | 32 | 41.63–43.69 N, 87.00–84.67 W | 42.478, −85.563 |
| `AZO/LAN.json` | AZO / LAN | 57 | 41.99–44.16 N, 85.05–83.05 W | 42.911, −84.127 |
| `S56/S56.json` | S56 / SLC | 33 | 39.88–41.64 N, 112.74–111.51 W | 40.995, −112.196 |
| `BOI/BOI.json` | BOI / BOI | 42 | 42.97–44.22 N, 117.13–115.30 W | 43.623, −116.195 |
| `BZN/BZN.json` | BZN / BZN | 32 | 45.12–46.27 N, 112.10–110.00 W | 45.696, −111.307 |

**R90 is split into an Omaha and a Lincoln polygon.** Both carry `"id": "R90"` and the radio
name *"Omaha Approach"*; they differ only by callsign prefix. The Lincoln polygon is a real
lead — R90's delegated ceiling is *"at and below 15,000 MSL over R90 East and West, at and
below 10,000 MSL over R90 LNK"* (ZMP-R90 LOA 3), so the lateral extent of the lower lid is
exactly what an `LNK.json` would describe. **It is a lead, not a citation**: SimAware carries
no altitudes and cannot confirm either lid.

### 4.1 Cross-check against the one boundary we already know

M98's lateral boundary is nine owner-verified MSP VOR radial/DME points (root
`ZMP/M98 Training/CLAUDE.md`): 295/041, 338/039, 029/040, 077/037, 118/040, 158/040, 196/039,
230/037, 254/040, measured from the surveyed MSP VOR at N44 53.79 / W093 14.19.

Converting SimAware's 19 vertices to range and true bearing from that anchor:

- The polygon **is the same ring** — every vertex falls between **35.7 and 40.9 DME**, against
  an owner-verified 37–41.
- Matching each owner point to its nearest SimAware vertex, **range agrees within 1 NM at
  seven of the nine points**; the exceptions are 077/037 (2.9 NM out) and 295/041 (1.2 NM).
- Bearings differ by 0.5°–4.0° and **the difference varies systematically with bearing**, so it
  is not a constant magnetic-variation offset — the two are independent renderings of the same
  boundary, not the same list of points.

**Conclusion: SimAware's terminal footprints are good to a couple of miles, not surveyed.**
That is the tolerance to quote if R90's polygons are ever used, and it is the same order of
accuracy as the traced M98 DDA polygon (*"good to about half a mile and stated as such"*).
**It does not replace the owner-verified M98 boundary and must not overwrite it.**

---

## 5. VAT-Spy — ARTCC outlines only

- **Repository** `https://github.com/VATSIM-Radar/vatspy-data-project`
- **Licence** **CC BY-SA 4.0** — attribution and share-alike, **no non-commercial clause**.
- **Contents** `Boundaries.geojson` (1.4 MB) and `VATSpy.dat`.
- US ARTCCs are keyed with a `K` prefix: **`KZLC`, `KZAU`, `KZMP` are all present**, one
  `MultiPolygon` each, with properties `id`, `oceanic`, `label_lon`, `label_lat`, `region`,
  `division`. **No sectors, no altitudes.**

Useful for drawing the outer edge of an ARTCC and for nothing else in this repo. The README is
explicit that sub-sector coverage is deliberately limited: *"this is not an open invitation to
include every single sub-sector."*

---

## 6. How far these may be trusted, and the licence problem

**They are community data, and they sit below the facility documents.** Root `CLAUDE.md`
invariant 1 requires every operational number to trace to a document and a paragraph;
invariant 7 makes the reference markdown authoritative over anything hardcoded. Neither is
weakened by this file:

1. **A facility order always wins.** Where VATGlasses and an SOP disagree, the SOP is right and
   the divergence is *named, not resolved* (§6 of root `CLAUDE.md`). One is already known —
   see below.
2. **Cite the dataset and the commit, never "VATSIM Radar".** The geometry is VATGlasses'; the
   radar app is only where the trail started.
3. **Geometry from here is second-tier and the tool must say so**, exactly as the traced M98
   DDA polygon says half a mile. It is surveyed by nobody: it is drawn by a vACC volunteer
   from the same charts we cannot read, then reviewed by a maintainer.
4. **It is a genuine second source, and it has already earned its keep.** All twenty ZLC
   frequencies in `claude_ZLC_Positions_Reference.md` match it, including the three Big Sky
   values our reference had to recover from a mis-split table.

### The one divergence found so far

**Mountain Home.** Our reference has `MUO_N_APP` "Mountain Home Approach", sector *X-Ray
North*, 124.800, and `MUO_S_APP` voiced **"Cowboy Control"**, sector *Cowboy*, 134.100.
VATGlasses has `M1N` "Mountain Home Approach" 124.800 and `M1S` **"Mountain Home Approach"**
134.100, with its two airspace entries named *"Mountain Home - Alpine/X-RAY South"* and
*"Mountain Home - Sage/X-RAY South"* — **both say South and neither says North**. The
frequencies agree; the radio name and the sector naming do not. **Recorded, not resolved.**
Ours comes from `MUO_NFCT_RAPCON.pdf` and outranks community data, but the disagreement is
worth an owner question.

### Licence — decide before vendoring anything

**VATGlasses is CC BY-NC-SA 4.0.** For a personal training tool used by one controller this is
comfortably within *non-commercial*, but two consequences are real and are the owner's call,
not this file's:

- **Attribution is mandatory** wherever the data or a derivative is displayed — in the tool's
  UI, not only in a markdown file.
- **Share-alike binds derivatives.** Polygons pasted into a `<NS>` data spine make that block
  a derivative work. If this repository is ever public, that has licensing consequences for
  the file it lands in.
- **SimAware publishes no licence at all**, which is a weaker position than a restrictive one.

The VAT-Spy wiki note is a useful precedent for the expected etiquette: *"copying coordinates
directly from this repository will require you to add an attribution to each airport in your
data set."*

**Nothing from any of these three sources has been vendored into this repository.** This file
records what is available and how to pull it; the pull recipes are in §7.

---

## 7. Pull recipes

Reproducible with `curl` alone; no Node, no `jq`, consistent with §12 of root `CLAUDE.md`.

```bash
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zlc/airspace.json" -o zlc_airspace.json
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zlc/positions.json" -o zlc_positions.json
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zlc/ownership/default.json" -o zlc_ownership.json
```

Substitute `zau` for `zlc`; ZAU additionally has `ownership/highlow.json`. SimAware:

```bash
curl -sL "https://raw.githubusercontent.com/VATSIM-Radar/simaware-tracon-project/master/Boundaries/R90/LNK.json" -o R90_LNK.json
```

Pin the commit when recording a value, because both repositories deploy on merge:

```bash
curl -sL "https://api.github.com/repos/lennycolton/vatglasses-data/commits?per_page=1"
```

The format wiki is a separate git repository and clones directly:

```bash
git clone --depth 1 https://github.com/lennycolton/vatglasses-data.wiki.git
```

---

## 8. What this changes, and what it does not

**Changed — ZLC.** S56's nine sectors and Big Sky's three now have lateral shapes and
runway-dependent altitude blocks available. This is the gate root `CLAUDE.md` §7 names for the
Tier 1 → Tier 2 jump, and for ZLC it is open. Both ZLC tools are Tier 0 and need the reference
layer first (§9 of root `CLAUDE.md`).

**Changed — ZAU.** C90 and AZO have a footprint and a ceiling — enough for *inside/outside* and
*under the lid*, not for *which sector*. ZAU's 19 en route sectors are fully described, which
matters only if a ZAU en route tool is ever built.

**Unchanged — ZMP.** M98 and R90 get no stratums and no sector geometry. SimAware offers
footprints good to a couple of miles; the owner-verified M98 boundary remains better than
anything here and stays authoritative. **R90 remains blocked**, and the owner-supplied-points
ask in `claude_R90_Gap_Analysis.md` stands.

**Unchanged — the invariants.** Nothing here is a facility document. The engine still must not
assert what it cannot know, `SLOTS` still moves only when a table is filled in the same commit,
and `STANDING` is still empty everywhere but M98.
