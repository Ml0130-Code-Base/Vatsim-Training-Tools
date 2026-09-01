# Source documents — AZO / Great Lakes Approach

The vZAU document library is at `https://zauartcc.org/files/documents`. The page is a
JavaScript app and **returns 403 to a plain fetch**, but the files it links are served
straight off DigitalOcean Spaces and download without authentication. All five tabs (SOPs,
LOAs, Policies, Reference, Training) render into the same DOM, so one page load lists
everything.

Listed 2026-09-01. **The filename carries a Unix-millisecond upload stamp that changes when
the document is revised** — a URL below that 404s means the document was updated; re-list the
page rather than guessing a new stamp.

`source-docs/` is not populated in this repo. Nothing was committed: the PDFs are the
facility's to distribute, and the tool does not need them at runtime. Pull what you need.

## Pull recipe

```bash
BASE=https://zauartcc-prod.sfo3.digitaloceanspaces.com/documents
mkdir -p source-docs/txt
curl -sS -o "source-docs/GreatLakes_SOP.pdf" "$BASE/1759111332420-vZAU%20Great%20Lakes%20TRACON%20SOP%207110.65A.pdf"
curl -sS -o "source-docs/ZAU_AZO_LOA.pdf"    "$BASE/1766327954329-vZAU%20ZAU-AZO%20ATCT%20LOA.pdf"
curl -sS -o "source-docs/ZOB_AZO_LOA.pdf"    "$BASE/1739378449613-vZAU-vZOB%20AZO%20ATCT%20LOA.pdf"
for f in source-docs/*.pdf; do pdftotext -layout "$f" "source-docs/txt/$(basename "$f" .pdf).txt"; done
```

Percent-encode the spaces or the request fails. `pdftotext -layout` preserves tables well
enough for most of these; `pdftotext -raw` gives reading order, which is what resolved the
2-2 position table — its layout extraction shifts the sector-name column by one row, and the
raw reading order pairs each name with its own callsign.

## Read and extracted

| Document | Effective | File |
|---|---|---|
| vZAU Great Lakes TRACON SOP 7110.65A | 1/9/2025 | `1759111332420-vZAU%20Great%20Lakes%20TRACON%20SOP%207110.65A.pdf` |
| vZAU ZAU-AZO ATCT LOA | 12/21/2025 | `1766327954329-vZAU%20ZAU-AZO%20ATCT%20LOA.pdf` |
| vZAU-vZOB AZO ATCT LOA | 12/13/2020 | `1739378449613-vZAU-vZOB%20AZO%20ATCT%20LOA.pdf` |

Extractions live in `claude_AZO_Reference.md`. All three have real text layers and were read
in full. **The appendices in all three are chart images with no text layer** — Appendix A
(West Wall diagram) and Appendix B (West Wall sectors) of the SOP, Appendix A of the ZAU LOA
(the airspace delegation) and Attachment 1 of the ZOB LOA (airspace). Appendix B of the SOP
is the one useful exception: its labels carry each sector's callsign and frequency, which is
what confirmed the position mapping, and it shows the relative arrangement of the six sectors
without anything measurable.

## Not yet read — worth pulling next

| Document | File | Why it matters here |
|---|---|---|
| SOP - Minor Fields 7110.65B | `1753489393382-vZAU%20Minor%20Fields%20SOP%207110.65B.pdf` | tower hours, Class D dimensions and local procedures for AZO, BTL, GRR, MKG |
| SOP - ZAU Chicago Center 7110.65B | `1767540836909-vZAU%20Chicago%20Center%20SOP%207110.65B.pdf` | the Kubbs and Shoreline sectors on the ZAU side of LOA 7.f |
| vZAU-vZOB ARTCC LOA | `1773099105296-vZAU-vZOB%20ARTCC%20LOA.pdf` | the centre-to-centre agreement behind the East Wall |
| vZAU TRACON Boundaries | `1782302573108-vZAU%20TRACON%20Boundaries.pdf` | the only boundary document with a chance of a text layer |
| vZAU Facility List v2.3 | `1762265097700-vZAU%20Facility%20List%20v2.3.pdf` | field and position inventory |
| vZAU General ATC Procedures 01.110G | `1782919534420-vZAU%20General%20ATC%20Procedures%2001.110G.pdf` | the order the SOP defers to for anything it does not cover |
| vZAU ATCT Strip Marking 7110.65B | `1745883508038-vZAU%20ATCT%20Strip%20Marking%207110.65B.pdf` | |
| vZAU 7110.65BB Air Traffic Control | `1738943128984-7110.65BB%20Air%20Traffic%20Control.pdf` | the facility's 7110.65 |
| vZAU CRC Quick Reference | `1769475279001-vZAU%20CRC%20Quick%20Reference.pdf` | |
| S1 / S2 / S3 Training Packages | `1785337501305-S1%20Training%20Package.zip`, `1780448712902-S2%20Training%20Package.zip`, `1780448755800-S3%20Training%20Package%20-%20Part%201.zip`, `1780448960109-S3%20Training%20Package%20-%20Part%202.zip` | what the student is examined on |
| vZAU Rating Exam Rubrics (zip) | `1775358888323-1767330011613-vZAU%20Rating%20Exam%20Rubrics.zip` | how the check ride is graded |

Charts — including the AZO TRSA depiction and every STAR, SID and approach for these fields,
none of which exist anywhere in the document library — are at `https://charts.zauartcc.org/`.
