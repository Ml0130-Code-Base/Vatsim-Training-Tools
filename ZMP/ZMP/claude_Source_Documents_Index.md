# Source Document Index — ZMP

Downloaded **2026-09-01** from the VATSIM Minneapolis ARTCC (vZMP) documents page, `https://minniecenter.org/docs`. Scope of this pull: **ZMP itself** — its own orders, every letter of agreement it holds with an adjacent centre or approach control, and the ZMP-wide reference charts.

PDFs live in `source-docs/`; `pdftotext -layout` extractions live in `source-docs/txt/`. **All 28 files verified as genuine PDFs on `%PDF` magic bytes.** Page counts below are counted from form feeds in the extraction, so they are the extractor's page count and may differ by one from the PDF's own.

Effective dates are taken from **inside** each document. Where the column reads `—` the document states no effective date on a page with a text layer — that is not the same as the document being undated, and several carry the date only in a footer image.

## What was pulled

| Local file | Document | Effective | Pages | Text? |
|---|---|---|---|---|
| `ZMP_Order_7200_1O.pdf` | **ZMP Order 7200.1O CHG 2 — the ZMP ATC SOP** | **2024-11-15** | 136 | yes |
| `ZMP_Order_7210_1F.pdf` | ZMP Order 7210.1F — ARTCC Administrative Manual | — | 32 | yes |
| `ZMP_Order_3120_4F.pdf` | ZMP Order 3120.4F — ATC Specialist Training Manual | Rev 6, 2019-07-01 | 60 | yes |
| `ZMP_Strip_Marking.pdf` | ZMP Order N7110.101 — Flight Progress Strips | 2023-11-02 | 13 | yes |
| `ZMP_ATCSOP_v7.pdf` | ZMP ATCSOP Rev 7 (legacy) | — | 129 | yes |
| `LOA_ZMP_ZAU.pdf` | ZMP–ZAU (Chicago) LOA | — | 9 | yes |
| `LOA_ZMP_ZKC.pdf` | ZMP–ZKC (Kansas City) LOA | — | 6 | yes |
| `LOA_ZMP_ZDV.pdf` | ZMP–ZDV (Denver) LOA | — | 9 | yes |
| `LOA_ZMP_ZLC.pdf` | ZMP–ZLC (Salt Lake City) LOA | — | 4 | yes |
| `LOA_ZMP_ZOB.pdf` | ZMP–ZOB (Cleveland) LOA | 2021-03-30 | 12 | yes |
| `LOA_ZMP_CZWG.pdf` | ZMP–CZWG (Winnipeg FIR) LOA | — | 8 | yes |
| `LOA_ZMP_M98.pdf` | ZMP–M98 LOA | **2026-03-31** | 25 | yes |
| `LOA_ZMP_R90.pdf` | ZMP–R90 LOA | **2023-11-06** | 7 | yes |
| `LOA_ZMP_RST.pdf` | ZMP–RST LOA | 2023-12-27 | 5 | yes |
| `LOA_ZMP_DSM.pdf` | ZMP–DSM LOA | **2026-08-03** | 6 | yes |
| `LOA_ZMP_GRB.pdf` | ZMP–GRB LOA | 2020-03-17 | 4 | yes |
| `LOA_ZMP_DLH.pdf` | ZMP–DLH LOA | 2020-03-17 | 5 | yes |
| `LOA_ZMP_BIS.pdf` | ZMP–BIS LOA | — | 5 | yes |
| `LOA_ZMP_FAR.pdf` | ZMP–FAR LOA | 2021-01-17 | 4 | yes |
| `LOA_ZMP_SUX.pdf` | ZMP–SUX LOA | 2022-09-10 | 4 | yes |
| `LOA_ZMP_FSD.pdf` | ZMP–FSD LOA | 2022-09-10 | 4 | yes |
| `ZAU_ZMP_Approach_Controls_LOA.pdf` | ZAU/ZMP Approach Controls LOA | — | 8 | yes |
| `ZMP_Minor_TRACON_Reference.pdf` | ZMP Minor TRACON Reference | **2015-01-01** | 6 | yes |
| `REF_ZMP_LOA_Routes.pdf` | ZMP LOA Routes Reference (Tier 1) | — | 6 | yes |
| `ZMP_Control_Towers.pdf` | ZMP Control Towers (chart) | — | 2 | partial |
| `ZMP_Low_Sectors.pdf` | ZMP Low Sectors (chart) | — | 2 | **labels only** |
| `ZMP_High_Sectors.pdf` | ZMP High Sectors (chart) | — | 2 | **no** |
| `ZMP_Approach_Sectors.pdf` | ZMP Approach Sectors (chart) | — | 2 | **no** |

**Newest document in the set: the ZMP–DSM LOA, 2026-08-03. Oldest: the ZMP Minor TRACON Reference, 2015-01-01** — eleven years apart, and the Minor TRACON Reference is the sole source for several small approach controls' hours and delegated altitudes. Treat it as a working default, not gospel.

## Correcting the M98 index on one point

`../M98 Training/claude_Source_Documents_Index.md` records `ZMP_Low_Sectors.pdf` as having **no** text layer, alongside the High Sectors and Approach Sectors charts. **That is wrong for the Low Sectors chart.** Re-pulled and re-extracted 2026-09-01, it yields ~56 KB of chart label text: sector numbers, altitude strata (`23,000 & BLW`, `15,000 & BLW`, `12,000 & BLW`, `10,000 & BLW`, `8,000 & BLW`, `4,000 & BLW`), navaid identifiers, Area labels and neighbouring-centre names are all recoverable.

**What is still not recoverable from it is positional association.** `pdftotext` scrambles chart layout, so a sector number and an altitude string sitting near each other in the extraction proves nothing about their relationship on the chart. Harvest details are in `claude_ZMP_Charts_Reference.md`.

The High Sectors and Approach Sectors charts genuinely have no text layer — High Sectors is vector artwork with the text converted to outlines, Approach Sectors is a raster scan.

## Documents that are pictures, and what is therefore still unread

- `ZMP_High_Sectors.pdf`, `ZMP_Approach_Sectors.pdf` — entirely UNREAD.
- **All 33 `Sector NN Map` pages inside 7200.1O** — every sector boundary in the centre.
- **7200.1O Appendix 02** — the three-mile single-site areas. Only three radii survive, in the Sector 01, 02 and 03 narratives.
- **7200.1O Appendix 03 Figure 1** — the delegated-airspace overview.
- **7200.1O Chapter 10** — all six event-split diagrams, two per split.
- Several LOA attachments carrying airspace depictions and route diagrams.

No PDF rasteriser is available on this machine — `pdftoppm`, `pdfimages`, ImageMagick, Ghostscript and Python are all absent. `pdftotext`, `perl` and `curl` are present. **Picture pages could not be recovered visually and must not be inferred.**

## A second source, and its limits

`../_vnas/ZMP_vnas.json` — the vNAS facility record for ZMP, 853 KB, `lastUpdatedAt` 2026-08-26, from `https://data-api.vnas.vatsim.net/api/artccs/ZMP`. It is genuinely independent of the documents and it carries things they do not: all 44 adapted `MSP_nn_CTR` positions with frequencies, the 13 TRACON areas with their underlying airports, and **125 route-based coordination records** naming owning and requesting sectors, altitude restrictions, routes and notes.

**It does not carry geometry.** Every candidate video-map endpoint was probed on 2026-09-01 — `/api/videomaps/{id}`, `/api/video_maps/{id}`, `/api/artccs/ZMP/videomaps`, `/api/artccs/ZMP/video-maps`, `/data/video_maps/{id}.geojson` — and all return 404. No public documentation of such an endpoint was found. **vNAS is not a path to ZMP sector boundaries.**

It also **disagrees with 7200.1O on four sector frequencies** (13, 22, 24, 25). See `claude_ZMP_Sector_Reference.md`.

## Not pulled

The docs page also carries the M98 and RST facility documents — `M98 7110.26A`, `MSP ATCT 7110.26G`, the `MSP-M98 LOA`, `M98-RST LOA`, the M98 satellite tower orders and charts. **Those are already pulled and extracted in `../M98 Training/source-docs/`** and are not duplicated here. The R90-side documents are in `../R90/source-docs/`.

Also not pulled: the tower orders for the ZMP underlying towers (STC, CWA, EAU, GRI, LSE, TVC, SAW), the DSM/ALO, GRB/ATW, DLH, BIS, FAR, SUX and FSD tower orders, and the `vATIS 4_1 - ZMP.zip` facility file. Pull those if the scope widens.

## Regenerating this pull

Filenames on the site contain spaces and must be percent-encoded or the request 404s.

```bash
curl -sSL -o "source-docs/ZMP_Order_7200_1O.pdf" "https://minniecenter.org/file/ZMP%20Order%207200-1N.pdf"
```

**The site's own filenames are stale in several cases** — `ZMP Order 7200-1N.pdf` serves 7200.1O CHG 2, `ZMP_7120_1F.pdf` serves 7210.1F, and `R90_Order_7220_10A.pdf` serves 7220.10B CHG 2. **Trust the title inside the document, not the URL.**

To re-extract everything after a pull:

```bash
for f in source-docs/*.pdf; do pdftotext -layout "$f" "source-docs/txt/$(basename "$f" .pdf).txt"; done
```
