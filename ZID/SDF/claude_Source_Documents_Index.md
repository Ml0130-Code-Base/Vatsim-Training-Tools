# Source Document Index - SDF

**Write this first, before any reference file** (root `CLAUDE.md` section 6). It is the manifest: what was pulled, when, from where, and which of it is a picture. Pulled **2026-10-18** for the Indy Center (vZID) SDF terminal facility.

## The four sources, in the order they were pulled

| # | Source | What was pulled | Status for SDF |
|---|---|---|---|
| 1 | **Facility orders** - the Indy Center wiki | Louisville (SDF) ATCT SOP, `https://wiki.flyindycenter.com/docs/sdf` | **Pulled, behind a login.** Last changelog entry 2026-09-04. |
| 2 | **CIFP** | cycle 261001 (effective 2026-10-01) and 261029 (effective 2026-10-29, posted early) | Pulled. Identical at every SDF field. |
| 3 | **vNAS** | `https://data-api.vnas.vatsim.net/api/artccs/ZID`, lastUpdatedAt 2026-10-17T02:35:43.475Z | Pulled. Committed at `../_vnas/ZID_vnas.json`. |
| 4 | **Community geometry** | VATGlasses `data/` listing; SimAware `Boundaries/SDF/SDF.json` | **Checked.** VATGlasses has no ZID dataset (nothing to vendor). SimAware has the lateral outline (no altitudes, no licence), **carried in the deck as `FOOTPRINT`** on the owner decision of 2026-10-19; the JSON itself is not vendored. Pinned in `../_shared/claude_ZID_Sector_Geometry_Reference.md`. |
| 5 | **vATIS profile** | `ZID ARTCC (All)`, updateSerial 2026081300, from `github.com/Indy-Center/vatisfiles` | Pulled (the 188 KB profile). The user's downloaded copy is a 257-byte stub whose `stations` list is empty and whose `updateURL` points at that repository. |

## The wiki page

| Saved file | Document | Last changelog entry | Size | md5 | Saved |
|---|---|---|---|---|---|
| `Louisville (SDF) ATCT SOP _ Indy Library.html` | Louisville (SDF) ATCT SOP | 2026-09-04 | 926540 bytes | `8c03aabfc4824c0f7aabb48fecdf1283` | 2026-10-18 22:30 |

**The pull cannot be reproduced with `curl`.** Every page of `wiki.flyindycenter.com` except the home page returns *Unauthorized* to an unauthenticated request, and the GraphQL page list shows the home page only. The page was saved from a browser **signed in with VATSIM**, as a complete web page (HTML plus a `_files` directory of the diagrams). To repeat the pull: sign in at `https://wiki.flyindycenter.com/`, open the page at `https://wiki.flyindycenter.com/docs/sdf`, and save the page as complete HTML. **The saved page and its text extraction are not committed to this repository** - the wiki is members-only, and the repository is public (root `CLAUDE.md` section 13). What the repository carries is the transcription in `claude_SDF_SOP_Reference.md`.

**Text layer:** the page is HTML, so there is no page count and no 'which pages are pictures' in the PDF sense. Every diagram is an image file referenced from the page; they are listed below. Of the diagram files, the `.svg` ones are vector artwork and can be measured; the `.png` ones are raster.

**The wiki links to documents that were not pulled:** the ICT (a list of restrictions and handoffs), and the tower SOPs for the underlying towers. They are in the gap analysis.

## Extraction

The saved page was converted to text with a Perl script that walks the `contents` element (headings, tables with `colspan`, lists, images as `[IMAGE: name]`). **Complex tables were re-read from the HTML structure** rather than the flattened text - where the page text loses a table's spans (the SDF departure-heading tables, the CVG runway-assignment table) the structure is what pairs a cell with its header.

## Pictures - what is therefore unread

| What | Where |
| --- | --- |
| SDF delegated airspace (combined) | SDF SOP 7 Overview - combined_airspace.svg |
| LC airspace | SDF SOP 6 - lc_airspace.png |
| Departure Radar airspace, north, south and west flows | SDF SOP 9 - 35_dr.svg, 17_dr.svg, dr_29.svg |
| Arrival Radar airspace, north and south flows | SDF SOP 9 - ar_35.svg, ar_17.svg |
| Final Radar airspace, three flows | SDF SOP 9 - fr_35.svg, fr_17.svg, fr_29.svg |
| UPS ramp control area | SDF SOP 4 - ramp_control_area.svg |
| Cargo ramps and terminal gates | SDF SOP 5 - cargo_ramps.png, terminal_gates.png |
| Multiple runway crossings | SDF SOP 5 - multiple_crossings.svg |
| B748 taxi restrictions | SDF SOP 5 - b748_taxi_restrictions.svg |

## Re-pull recipes (sources 2 to 5)

```bash
# CIFP - the cycle is the citation; a 404 means the cycle rolled
curl -sL https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/cifp/download/
curl -sL -o CIFP_261001.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_261001.zip

# vNAS
curl -sS -A "Mozilla/5.0" -o ZID_vnas.json https://data-api.vnas.vatsim.net/api/artccs/ZID

# vATIS
curl -sL -o zid-artcc-all-vatis.json https://raw.githubusercontent.com/Indy-Center/vatisfiles/refs/heads/main/zid-artcc-all-vatis.json

# community geometry - checked, not carried
curl -sL https://api.github.com/repos/lennycolton/vatglasses-data/contents/data        # no zid entry
curl -sL https://raw.githubusercontent.com/VATSIM-Radar/simaware-tracon-project/main/Boundaries/SDF/SDF.json
```

The vNAS record is committed; the CIFP, vATIS and SimAware pulls are not - the commands above reproduce them.
