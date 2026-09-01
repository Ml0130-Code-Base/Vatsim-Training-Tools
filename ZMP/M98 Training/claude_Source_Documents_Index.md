# Source Document Index — minniecenter.org/docs

Downloaded 2026-08-31 from the VATSIM Minneapolis ARTCC (vZMP) documents page,
`https://minniecenter.org/docs`. Scope of this pull: the eight facilities the owner named —
**M98, ZMP, RST, MSP, STP, ANE, FCM, MIC** — plus the ZMP-wide reference material that
describes them.

PDFs live in `source-docs/`; `pdftotext -layout` extractions live in `source-docs/txt/`.
**Every file in this pull is a genuine PDF** (magic bytes `%PDF` verified on all 27). This is
worth stating because the older copies described in `CLAUDE.md` were mangled — some were plain
text with CRLF endings, some were zip archives of per-page JPEG + TXT. The files served today
are clean, so re-download rather than trusting an old local copy.

## What was pulled

| Local file | Title on the site | Effective | Pages | Text? |
|---|---|---|---|---|
| `M98_7110_26A.pdf` | M98 TRACON 7110.26A | 2026-03-31 | 102 | yes |
| `MSP_ATCT_7110_26G.pdf` | MSP ATCT 7110.26G CHG 1 | 2026-03-31 | 83 | yes |
| `MSP_M98_LOA.pdf` | MSP-M98 LOA | 2026-03-31 | 103 | yes |
| `ZMP_M98_LOA.pdf` | ZMP-M98 LOA | 2026-03-31 | 24 | yes |
| `M98_RST_LOA.pdf` | M98-RST LOA | 2026-03-31 | 7 | yes |
| `ZMP_RST_LOA.pdf` | ZMP-RST LOA | 2023-12-27 | 4 | yes |
| `M98_SAT_LOA.pdf` | M98-Satellite ATCT LOA | 2025-11-30 | 7 | yes |
| `ANE_FCT_7110_65.pdf` | ANE FCT 7110.65 CHG 1 | 2025-11-30 | 9 | yes |
| `FCM_ATCT_7110_1A.pdf` | FCM ATCT 7110.1A CHG 1 | 2025-11-30 | 15 | yes |
| `MIC_ATCT_7220_3N.pdf` | MIC ATCT 7220.3N CHG 1 | 2025-11-30 | 11 | yes |
| `STP_ATCT_7220_3Q.pdf` | STP ATCT 7220.3Q CHG 1 | 2025-11-30 | 16 | yes |
| `RST_ATCT_7110_9A.pdf` | RST ATCT 7110.9A | — | 27 | yes |
| `M98_ATCT_Reference.pdf` | M98 ATCT Reference (satellite quick card) | — | 1 | yes |
| `ZMP_Minor_TRACON_Reference.pdf` | ZMP Minor TRACON Reference | 2015-01-01 | 5 | yes |
| `ZAU_ZMP_Approach_Controls_LOA.pdf` | ZAU/ZMP Approach Controls LOA | 2026-07-08 | 7 | yes |
| `REF_ZMP_LOA_Routes.pdf` | ZMP LOA Routes Reference (Tier 1) | 2022-01-27 | — | yes |
| `ZMP_Order_7210_1F.pdf` | ZMP Order 7210.1F ARTCC Administrative Manual | — | 31 | yes |
| `ZMP_Order_3120_4F.pdf` | ZMP Order 3120.4F Controller Training Manual | — | 59 | yes |
| `ZMP_Order_7200_1O.pdf` | ZMP Order 7200.1O CHG 2 | — | 135 | yes |
| `ZMP_ATCSOP_v7.pdf` | ZMP ATCSOP Rev 7 (legacy) | — | 128 | yes |
| `ZMP_Strip_Marking.pdf` | ZMP Order N7110.101 Flight Progress Strips | — | 12 | yes |
| `ZMP_Control_Towers.pdf` | ZMP Control Towers (chart) | — | 1 | partial |
| `ZMP_Low_Sectors.pdf` | ZMP Low Sectors (chart) | — | 1 | **no** |
| `ZMP_High_Sectors.pdf` | ZMP High Sectors (chart) | — | 1 | **no** |
| `ZMP_Approach_Sectors.pdf` | ZMP Approach Sectors (chart) | — | 1 | **no** |
| `MSP_Departure_Headings.pdf` | MSP Tower Departure Headings (chart) | — | 4 | **no** |
| `M98_SATS.pdf` | M98 Satellites (chart) | — | 1 | **no** |

## Documents that are pictures, and what is therefore still unread

These carry no usable text layer. Anything that would come off them remains **unverified** and
must not be inferred:

- `ZMP_Low_Sectors.pdf`, `ZMP_High_Sectors.pdf`, `ZMP_Approach_Sectors.pdf` — the ZMP sector
  maps. The sector *numbers* around M98 are recoverable from ZMP-M98 LOA Table 1 (see
  `claude_ZMP_Reference.md`); their *boundaries* are not.
- `MSP_Departure_Headings.pdf` and `M98_SATS.pdf` — heading and satellite-split diagrams.
- **Appendix A of M98 7110.26A** (54 pages of delegated-airspace diagrams, one set per runway
  configuration) — the near/far gate designation, the ACDA shelves, Area R, Area F and the STP
  Shelf are all *drawn* there and nowhere written. This is the single largest remaining gap.
- **Appendix E of M98 7110.26A** — the MVA chart.
- **Appendix A of both RST letters of agreement** — the RST delegated-airspace depiction. Still
  unread, exactly as `CLAUDE.md` already records.
- **Attachments A–D of the ZMP-M98 LOA** — sector map, SIDs, conventional STARs, RNAV STARs,
  and the eleven approach-control airspace/frequency plates.
- **Attachments 1–7 of the MSP-M98 LOA** — M98 airspace, departure configurations, satellite
  split, MSP airspace, MVA chart, preferential tower headings, wind charts.

## Not pulled

The docs page also carries LOAs and tower orders for facilities outside the eight requested:
ZLC, ZKC, ZAU, ZDV, ZOB, CZWG enroute LOAs; OMA/LNK/R90; DSM/ALO; GRB/ATW; DLH; BIS; FAR; SUX;
FSD; and the ZMP underlying towers STC, CWA, EAU, GRI, LSE, TVC, SAW. A `vATIS` facility file
(`vATIS 4_1 - ZMP.zip`) is also offered. Pull those if the scope widens.

## Regenerating this pull

```bash
curl -sSL -o "source-docs/M98_7110_26A.pdf" "https://minniecenter.org/file/M98%207110.26.pdf"
```

Filenames on the site contain spaces; they must be percent-encoded or the request 404s. The
site's own filenames are stale in several cases (`MSPM98_Order_7110_26E.pdf` serves 7110.26G,
`ZMP Order 7200-1N.pdf` serves 7200.1O, `ZMP_7120_1F.pdf` serves 7210.1F) — trust the title
inside the document, not the URL.
