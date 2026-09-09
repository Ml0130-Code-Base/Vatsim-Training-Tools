# M98 Airspace Boundary — the lateral ring, and the one segment that is not ZMP

**Owner-verified 2026-08-31. Independently cross-checked 2026-09-02. FOR SIMULATION USE.**

This file exists because the boundary had no file. It was carried in two places — a paragraph
in `CLAUDE.md` and the `BOUNDARY` constant in `m98-drill-deck.html` — and in neither of them
was it a citable reference the way every other operational number in this facility is.
`claude_M98_MD_Gap_Analysis.md` Part 1 asked for it *"so it survives outside memory"*, and
issue #28 carried the work. Nothing here is new data; this is the same ring, written down
where it can be read and argued with.

---

## 1. The ring — nine MSP VOR radial/DME points

Measured from the **MSP VOR at N44 53.79 / W093 14.19**, the surveyed position in the header of
`claude_MSP_STAR_Reference.md` and the origin every fix in that document is measured from.

| # | Radial | DME |
|---|---|---|
| 1 | 295° | 41 |
| 2 | 338° | 39 |
| 3 | 029° | 40 |
| 4 | 077° | 37 |
| 5 | 118° | 40 |
| 6 | 158° | 40 |
| 7 | 196° | 39 |
| 8 | 230° | 37 |
| 9 | 254° | 40 |

Read plainly: a ring of roughly **37 to 41 DME**, closing back on point 1.

**In the tool:** `BOUNDARY` in the Drill Deck, in exactly this order, drawn on the scope as a
dashed polygon and used by `entryBearing` / `neighbourOf` to work out which facility a strip
crossed in from.

### The ten-point variant was offered and set aside

On 2026-08-31 a ten-point version was offered that split the north-west corner **338/039** into
**333/039 and 345/038**. The owner set it aside: the single-point north-west corner is correct.
**Do not re-split it.** Recorded here rather than dropped, so the question does not get asked a
third time.

---

## 2. The Rochester segment — the only part of the perimeter that is not ZMP

**Owner-supplied 2026-08-31.** Three of the nine points, on the south-south-east side:

| Radial | DME |
|---|---|
| 185° | 38 |
| 158° | 41 |
| 149° | 40 |

The segment spans radials **149° to 185°**.

**South of that line, Rochester Approach owns 9,000 and below and ZMP owns everything above it.**
Everywhere else around M98, the neighbour is ZMP at every altitude.

**In the tool:** `RST_BOUNDARY`, `RST_ARC` (`[149, 185]`) and `RST_CEILING` (`9000`), resolved by
`neighbourAt(bearing, altitude)` and drawn on the scope as its own coloured segment.

Two consequences worth knowing:

- Of the nine turbojet SIDs, **only the RST departure leaves through that arc.**
- **Rochester is not a 24-hour facility.** Closed, the delegated airspace reverts to **Center
  Sector 07** — M98/RST LOA 4.a and ZMP/RST LOA 6.B both say so — and nothing goes to RST at any
  altitude in that corner. The published hours are in neither agreement, so RST open or closed is
  a **frame setting the trainee states**, like towers open or closed, and not something the tool
  derives from a clock. See `claude_M98_RST_Reference.md`.

**Note the 158/041 in this list against the 158/040 in §1.** They are the same corner recorded
in two owner-supplied lists a different way round; the tool carries both constants as given
rather than reconciling them to one number, because neither list is derived from the other and
one mile is inside the honest tolerance of both.

---

## 3. The cross-check, and what it is worth

**Checked 2026-09-02 against SimAware's 19-vertex M98 footprint** (root
`claude_Community_Geometry_Sources.md` §4.1). It is the same ring:

- Every community vertex falls between **35.7 and 40.9 DME**.
- **Range agrees within 1 NM at seven of the nine points.** The two that do not: **077/037** is
  2.9 NM out, **295/041** is 1.2 NM out.
- Bearings differ by **0.5° to 4.0°**, and the difference **varies systematically with bearing** —
  which is the tell that the two are independent renderings of one boundary rather than the same
  list of points passed round twice.

**That corroborates this list. It does not replace it.** The community footprint carries **no
altitudes** and is good only to a couple of miles, so **the owner-verified list above outranks it
and must never be overwritten by it** (root `CLAUDE.md` §7).

---

## 4. What this boundary is not

- **It is not surveyed.** It is owner-verified — a controller reading a ring off a chart — and
  the tolerance is the couple of miles the cross-check implies, not a survey figure.
- **It carries no altitudes.** The ring is lateral. The only vertical fact on the perimeter is the
  RST ceiling in §2. M98's own delegated ceiling (**17,000**, the altitude at or below which it
  issues an enroute clearance) is in `claude_MSP_SID_Reference.md`, not here.
- **It is not a sector map.** It is the outside edge of M98. The splits *inside* it — the ACDA on
  the localizer (SOP 4-2), the Feeder gate split (4-4d), the satellite sectors (6-2) — are in the
  SOP and STAR references.
- **It says nothing about the Departure Dispersal Area**, which is a separate traced shape inside
  the ring with its own file, `claude_M98_DDA_Geometry.md`, and its own open questions.

---

## 5. If a better boundary ever arrives

The path is root `CLAUDE.md` §7: a **CRC video-map GeoJSON export**, or the **`.sct2`** the maps
were built from, from someone with facility data-admin access. That would arrive surveyed rather
than read off a chart, and it would supersede this list. Until an export actually lands, treat
that as an ask and not a capability — vNAS exposes no video-map GeoJSON, probed 2026-09-01, and
every candidate endpoint 404s.

**An owner-supplied or facility-exported boundary always supersedes a community one, and must
never be overwritten by it.**
