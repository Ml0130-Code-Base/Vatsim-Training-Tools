# VATGlasses ZAU dataset — attribution and provenance

**These files are not ours.** They are vendored verbatim from the VATGlasses data project and
carry licence obligations. Read this before using, editing or redistributing them.

## Source

| | |
|---|---|
| **Project** | VATGlasses — <https://vatglasses.uk> |
| **Repository** | <https://github.com/lennycolton/vatglasses-data> |
| **Upstream path** | `data/zau/` |
| **Pinned commit** | `c469b4299d7a4e39590e002b8c922880c5c92a91` (2026-08-26T03:21:04Z) |
| **Pulled** | 2026-09-02 |
| **Dataset owner** | **ZAU vARTCC** — locally managed, not VATGlasses-managed |
| **Dataset manager** | Joe Nyquist (GitHub `Saluki00`), per upstream `Owners.xlsx` |

**Why this dataset is trusted:** the upstream wiki (`Data-Sets.md`) separates sets *"Managed by
Local Staff"* from sets *"Managed by the VATGlasses Team"*. `zau` is in the first group, whose
sets *"are likely to receive periodic bulk updates when local sector files change"* — so these
polygons are pushed from the facility's own sector file rather than traced by a third party.

## Licence

**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0).**
Upstream `LICENSE`. Three obligations follow, and they are binding:

1. **Attribution** — any tool that draws these boundaries must credit VATGlasses, the ZAU
   dataset and the licence **on the page**, not only in a markdown file.
2. **NonCommercial** — personal certification training is inside this. Redistribution for
   commercial purposes is not.
3. **ShareAlike** — a derivative (decoded polygons pasted into a tool's data spine) inherits
   the licence. If this repository is ever made public, that is a decision to take about the
   files the geometry lands in.

## Files

| File | Contents |
|---|---|
| `airspace.json` | 31 airspace entries, 58 vertical blocks. 19 en route sectors with stratums; C90 and AZO as single footprints. |
| `positions.json` | 46 positions — voice callsign, logon prefix, type, frequency. |
| `ownership/default.json` | *"All areas are standalone and combine directly into 35. 35 covers C90 top down."* |
| `ownership/highlow.json` | *"High/Low Split. All areas are standalone and combine directly into 89 (High) or 35 (Low). 35 covers all TRACONs top down."* |

**Do not edit these files.** They are a vendored copy; a local change would silently diverge
from upstream and would be lost on the next pull. Corrections belong upstream, as a pull
request to the ZAU manager. What *we* record about them goes in
`../claude_ZAU_Sector_Geometry_Reference.md`.

## Re-pulling

```bash
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zau/airspace.json" -o airspace.json
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zau/positions.json" -o positions.json
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zau/ownership/default.json" -o ownership/default.json
curl -sL "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data/zau/ownership/highlow.json" -o ownership/highlow.json
```

Check for upstream movement before trusting a stale copy — the project deploys on merge:

```bash
curl -sL "https://api.github.com/repos/lennycolton/vatglasses-data/commits?path=data/zau&per_page=1"
```

Format specification: `git clone --depth 1 https://github.com/lennycolton/vatglasses-data.wiki.git`
— see `Static-Data-Format.md` and `Ownership-Data-Format.md`.

## What this data is not

**It carries no handoff IDs.** `positions.json` has exactly five fields per position —
`callsign`, `colours`, `frequency`, `pre`, `type`. The airspace keys (`C90`, `AZO`, `35`) are
VATGlasses display handles, **not** STARS IDs, TCPs or Field E values. Every handoff ID comes
from vNAS. See `../../../claude_Community_Geometry_Sources.md` §6.

**It does not sectorise C90 or AZO.** Each is one polygon with one ceiling, shared by four and
three positions respectively through an ownership priority chain. It answers *inside, and under
the lid*; it does not answer *which sector owns this*.
