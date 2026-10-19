# ZID Controller Tools Reference - what the Indy Center tools site holds, and how far it may be trusted

Pulled and compared **2026-10-19**. This is a fifth source for the ZID decks, found when the owner pointed at
`github.com/Indy-Center/controller-tools`. **Nothing from it is wired into a deck.** This file records what it is,
what it agrees with, what it does not, and why it stays beside the other sources rather than in them.

## 1. What it is

`Indy-Center/controller-tools` is the SvelteKit source of `tools.flyindycenter.com`, the facility's split, restriction and
area tool. The repository has **no licence** (`license: null`), last pushed 2026-09-15. The **data is not in the
repository**: it lives in the app's database. What the repository does hold is one static file,
`static/data/airspace_boundary.geojson` (ARTCC and FIR outlines including ZID high and low; no TRACON or class
airspace), and the code that shows which routes serve the data.

The deployed site serves three unauthenticated JSON endpoints. Pulled with plain `curl -sL`:

```bash
curl -sL -o areas.json        https://tools.flyindycenter.com/api/areas
curl -sL -o restrictions.json https://tools.flyindycenter.com/api/restrictions
curl -sL -o splits.json       https://tools.flyindycenter.com/api/splits
```

| Endpoint | Bytes | md5 | Holds |
| --- | --- | --- | --- |
| `/api/areas` | 43,504 | `b05af2699784c166d462e0c1a505e8cd` | 49 areas: 27 Center sectors, 9 terminal outlines, 13 neighbouring-facility stubs |
| `/api/restrictions` | 1,228,567 | `d18c9fd1f03fccf603dbf913816ba146` | 594 coordination restrictions between areas |
| `/api/splits` | 6,049 | `6bdf0d1adca77e9d1e5478cf848acf31` | 36 named split configurations, all but one unpublished |

**The responses are not committed.** No licence, the restrictions file is 1.2 MB, and it is a live feed that will change;
the md5 and byte count above are the citation for this pull. A re-pull gives a different file the day the tool is edited.

## 2. Terminal outlines - the same polygons SimAware carries

`/api/areas` holds a lateral outline for IND, SDF, CVG, LEX, CMH and EVV (plus HTS, CRW and HUF). Each is a GeoJSON
`FeatureCollection` whose feature properties carry `E2G_MapObjectType: ApproachControl` and an `E2G_LineObjectId`, which
looks like the output of a sector-file-to-GeoJSON conversion (the meaning of the prefix is inferred, not documented).

Compared vertex to edge, in both directions, against the SimAware outlines the decks carry as `FOOTPRINT`:

| Facility | Controller-tools vertices | SimAware vertices | Worst vertex-to-edge distance |
| --- | --- | --- | --- |
| IND | 28 (27 after the closing vertex) | 27 | **0.00 NM** |
| SDF | 25 (24 after the closing vertex) | 24 | **0.00 NM** |
| CVG | 19 | 25 | 0.07 NM |

- **IND and SDF are the same polygon**, to the precision of the coordinates. Either one was derived from the other or both
  came from one file; **the direction is not known.**
- **CVG is the same outline drawn with fewer vertices** (within 0.07 NM), and its feature collection carries three empty
  `MultiPolygon` features after the real one.
- **This is not independent corroboration.** Two copies of one polygon agree by construction. What it does change is
  provenance: the SimAware outline is not a volunteer's trace of a chart but, at IND and SDF, the same geometry the
  facility's own tool uses. **It says nothing about whether that polygon is accurate to the real boundary**, so the
  deck's "about two miles, not checked at ZID" statement stands unchanged.
- No altitude, no sector split and no flow in either. **The decks' `boundaries` and `flowairspace` slots stay empty.**

## 3. Center sectors - frequencies agree with vNAS

`/api/areas` carries 27 Center sectors (`APE 87`, `LOU 82`, ...) each with a frequency, a high or low tag and a polygon
(36 of the 49 areas carry geometry). The frequencies were matched to the vNAS ERAM positions **by sector number**:
**27 of 27 agree** - 6 equal and 21 where the tool prints the vNAS frequency to two decimals (the same truncation the SOPs
use, `128.22` against `128.225`). No conflict.

The Center polygons are the geometry a ZID Center deck would need; none of the three terminal decks uses them.

## 4. Restrictions - a Jan 2025 snapshot, not the current order

`/api/restrictions` holds 594 rows with `from`, `to`, `airport`, `route`, `restriction`, `notes`, `createdAt`. Rows name
**sectors and ATCTs as parties** (`ABB 18`, `CVG ATCT`), where vNAS names a facility plus sector ids.

- **558 of 594 rows were created in one bulk import on 2025-01-08.** Three more months of 2025 add 28, and 2026 adds eight.
  No row carries a `validUntil`. The newest is 2026-09-04.
- 103 rows involve IND, SDF or CVG as a party. After normalising party and airport set, **31 keys match a vNAS
  restriction in the same direction**, 23 vNAS keys have no match, and 54 tool keys have no vNAS match (mostly because the
  tool names the Center sector where vNAS says `ZID`, so the key does not line up; **not a finding that either source is
  missing a row**).
- Of the 31 matched keys, **26 carry the same numbers and 5 differ**, and all five differ by the tool carrying *more*:
  - `CMH > CVG` (two rows) and `CVG > CMH`: the tool adds the heading (`heading 180`, `heading 220`, `heading 360`) that
    vNAS drops. **The CVG SOP also carries the heading**, so the tool agrees with the SOP here and vNAS is the thin one.
  - `IND > HUF`, BMG: tool `4000, 5000 or 6000`, vNAS `Between 4000/6000`. Same intent, different encoding.
  - **`SDF > LEX`: the tool splits the restriction at MAUDD (AOB 7000 south, AOB 9000 north).** The SDF SOP reads `AOB 9000
    (to LEXz)` for a direct departure with no MAUDD split, and vNAS has none. **A genuine three-way disagreement, and it is
    carried here, not resolved.** The rows date from the 2025-01-08 import; the SDF SOP is revision 2026-09-04.

**It is not wired in because it is the weakest of the three restriction sources.** It is older than the SOPs, it is unlicensed,
it has a third data model, and where it adds something the SOP already says (the headings) it adds nothing, and where it
differs from the SOP (MAUDD) the SOP is the order. If the owner confirms the MAUDD split is current, the SDF SOP
reference and the SDF LOA reference take it from that confirmation, citing who confirmed it (root `CLAUDE.md` section 5).

## 5. Splits

`/api/splits` is 36 split configurations - `Combined` (the only published one), then facility-split drafts such as
`CVG-MEM FNO 3-way`, `ZKC N/S`, `high low`. They describe Center sector groupings for events. **Not used**: the decks are
terminal and none of the three facilities is split.

## 6. Where it sits in the ranking

Below the SOPs, below an owner-supplied or facility-exported boundary, and **beside** vNAS. It was checked and it is
recorded; the decks do not read it. If a ZID Center deck is ever built, the Center sector polygons and the sector
frequencies are the reason to come back here, and the pull recipe above reproduces it.
