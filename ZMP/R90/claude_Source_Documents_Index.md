# Source Document Index — R90

Downloaded **2026-09-01** from the VATSIM Minneapolis ARTCC (vZMP) documents page, `https://minniecenter.org/docs`. Scope of this pull: **R90 (Omaha TRACON) and the fields it works** — its own SOP, the OMA and LNK tower orders, the letter of agreement with ZMP, and the ZMP-wide references that describe R90 from the outside.

PDFs live in `source-docs/`; `pdftotext -layout` extractions live in `source-docs/txt/`. **All 7 files verified as genuine PDFs on `%PDF` magic bytes.** Page counts are counted from form feeds in the extraction.

## What was pulled

| Local file | Document | Effective | Pages | Text? |
|---|---|---|---|---|
| `R90_Order_7220_10B.pdf` | **R90 Order 7220.10B CHG 2 — Omaha TRACON SOP** | **2024-10-27** | 19 | yes, except 6 pages |
| `OMA_ATCT_7110_4A.pdf` | OMA ATCT 7110.4A CHG 1 — Omaha Eppley Tower | — | 4 | yes, all text |
| `LNK_ATCT_7110_6A.pdf` | LNK ATCT 7110.6A — Lincoln Tower | footer 2018-12-26 | 6 | yes, except 2 pages |
| `ZMP_R90_LOA.pdf` | **ZMP–R90 LOA** | **2023-11-06** | 7 | yes, except 2 pages |
| `ZMP_Minor_TRACON_Reference.pdf` | ZMP Minor TRACON Reference | **2015-01-01** | 6 | yes |
| `ZMP_Control_Towers.pdf` | ZMP Control Towers (chart) | — | 2 | partial |
| `ZMP_Approach_Sectors.pdf` | ZMP Approach Sectors (chart) | — | 2 | **no** |

`ZMP_R90_LOA.pdf` is byte-identical to `../ZMP/source-docs/LOA_ZMP_R90.pdf` — the same file served under two names on the docs page. Both folders keep a copy because both tools need it and neither should depend on the other's `source-docs/`.

**The R90 SOP's own cancellation line reads "vZMP R90 SOP 7110.10B CHG 1" while the order is numbered 7220.10B.** As-written; not corrected. The record of changes also lists "Original Publication" against two different dates (2018-12-23 and 2023-07-01).

## Documents that are pictures, and what is therefore still unread

**This is the defining problem of the R90 document set.** Ten of the nineteen SOP pages carry text; the geometry is on the rest. The extraction is clean and complete for everything that *is* text — these pages simply have no text layer.

| Doc | Page | Heading present in text | What is UNREAD |
|---|---|---|---|
| R90 7220.10B | 8 | `3-4. COMBINING/DECOMBINING POSITIONS` | **The entire combining table.** The lead-in sentence ends in a colon and the next text is `3-5.` |
| R90 7220.10B | 12 | `R90 Omaha Sector Boundaries` | RW / RE / RF / RO lateral limits and strata |
| R90 7220.10B | 13 | `R90 Lincoln Sector Boundaries` | Lincoln sector limits |
| R90 7220.10B | 14 | `Lincoln Final (LF) Airspace` | LF lateral and vertical limits |
| R90 7220.10B | 15 | `RADAR Final Boundaries` | **The RF boundary — the single most valuable missing item in the facility** |
| R90 7220.10B | 18 | `Prearranged Coordination Airspace` | The PACP geometry that §3-9.b.1 and §3-9.b.2 both explicitly depend on |
| ZMP–R90 LOA | 5 | `ATTACHMENT "A" — R90 DELEGATED AIRSPACE` | All lateral geometry, the East/West/LNK split, the "R90 west shelf over R90 LNK", the ZMP/R90 common boundary |
| ZMP–R90 LOA | 6 | `ATTACHMENT "B" — OMAHA STARs` | Every fix, crossing restriction and the geometry of LANTK, MARWI, TIMMO, HOWRY, AANDY |
| LNK 7110.6A | 4 | `APPENDIX 1. LNK TOWER AIRSPACE / NORTH CONFIGURATION` | Area A / Area B lateral limits. **Vertical limits ARE text** — A = SFC–3,000, B = SFC–4,000 |
| LNK 7110.6A | 5 | `APPENDIX B. LNK TOWER AIRSPACE / SOUTH CONFIGURATION` | Area A / Area B lateral limits, south |
| `ZMP_Approach_Sectors.pdf` | all | — | Entirely picture, 8.9 MB raster scan |

> **Not one sector boundary is described in words anywhere in the R90 document set.**

The appendices that **do** carry real text are only **Appendix B** (the radar position relief checklist) and **Appendix C** (the STARS map list, 137 entries — complete, but with **no legend**).

No PDF rasteriser is available on this machine — `pdftoppm`, `pdfimages`, ImageMagick, Ghostscript and Python are all absent. `pdftotext`, `perl` and `curl` are present. **Picture pages could not be recovered visually and must not be inferred.** The asks that would unblock them are listed in `claude_R90_Gap_Analysis.md` Part 1.

## Documents that do not exist in the pull

- **No Offutt (OFF) tower order.** The docs page offers none. OFF is referenced at R90 3-8.b and Appendix B 6.b, and Radar Offutt is a staffed position, but **no OFF frequency, callsign, runway, initial altitude or missed-approach instruction appears anywhere.**
- **No OMA/LNK-to-R90 letter of agreement.** Tower-to-TRACON handoff and release rules are consequently unstated — neither tower order describes them, and R90 §3-5/§3-6 govern intra-facility transfer only.

## A second source, and its limits

`../_vnas/ZMP_vnas.json` — the vNAS facility record for the parent ARTCC, which carries R90 as a child TRACON area. **It is the only source for the R90 airport inventory**, which no R90 document states: underlying airports **OMA, OFF, LNK, CBF, MLE**; single-site-arrival airports **OMA, LNK, OFF, CBF**; tower list ranges OMA 120, OFF 60, LNK 90; area visibility centre 41.143 / −95.903722, surveillance range 150.

It **confirms all six R90 positions** — frequency, STARS ID and callsign — independently of the SOP, and the two agree exactly.

It carries **no geometry**. Video-map endpoints were probed on 2026-09-01 and all return 404.

## Not pulled

The docs page carries the wider ZMP document set — ZMP's own orders, the six centre LOAs, and the LOAs for the other approach controls. **Those are pulled and extracted in `../ZMP/source-docs/`** and are not duplicated here. The M98/MSP/RST set is in `../M98 Training/source-docs/`.

Also not pulled: the DSM/ALO, GRB/ATW, DLH, BIS, FAR, SUX and FSD facility documents, and the `vATIS 4_1 - ZMP.zip` facility file.

## Regenerating this pull

Filenames on the site contain spaces and must be percent-encoded or the request 404s.

```bash
curl -sSL -o "source-docs/R90_Order_7220_10B.pdf" "https://minniecenter.org/file/R90_Order_7220_10A.pdf"
```

**Note the stale filename**: the site serves 7220.10B CHG 2 from a URL that still says `10A`. **Trust the title inside the document, not the URL.** The other four:

```bash
curl -sSL -o "source-docs/OMA_ATCT_7110_4A.pdf" "https://minniecenter.org/file/OMA_ATCT_7110_4A.pdf"
```

```bash
curl -sSL -o "source-docs/LNK_ATCT_7110_6A.pdf" "https://minniecenter.org/file/LNK_ATCT_Order_7110_6A.pdf"
```

```bash
curl -sSL -o "source-docs/ZMP_R90_LOA.pdf" "https://minniecenter.org/file/LOA_ZMPR90.pdf"
```

To re-extract everything after a pull:

```bash
for f in source-docs/*.pdf; do pdftotext -layout "$f" "source-docs/txt/$(basename "$f" .pdf).txt"; done
```
