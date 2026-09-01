# Source documents — C90

The vZAU document library is at `https://zauartcc.org/files/documents`. The page itself is a
JavaScript app and **returns 403 to a plain fetch**, but the files it links are served
straight off DigitalOcean Spaces and download without authentication. The tabs (SOPs, LOAs,
Policies, Reference, Training) are all rendered into the same DOM, so one page load lists
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
curl -sS -o "source-docs/C90_SOP.pdf" "$BASE/1773508986331-vZAU%20C90%20TRACON%20SOP%207110.65C.pdf"
for f in source-docs/*.pdf; do pdftotext -layout "$f" "source-docs/txt/$(basename "$f" .pdf).txt"; done
```

Percent-encode the spaces or the request fails. `pdftotext -layout` preserves tables well
enough for most of these; `pdftotext -raw` gives reading order, which is the tie-breaker when
a table's columns interleave. Every C90 document checked so far has a real text layer — the
appendices inside them are images.

## Read and extracted

| Document | Effective | File |
|---|---|---|
| vZAU C90 TRACON SOP 7110.65C | 3/14/2026 | `1773508986331-vZAU%20C90%20TRACON%20SOP%207110.65C.pdf` |

Extraction lives in `claude_C90_Reference.md`. 48 pages; chapters 1–7 and Appendix A read,
Appendices B through G are chart images with no text layer.

## Not yet read — C90's own set

| Document | File |
|---|---|
| vZAU ZAU-C90 LOA | `1784656905903-vZAU%20ZAU-C90%20LOA.pdf` |
| vZAU C90-ORD ATCT LOA | `1769725841205-vZAU%20C90-ORD%20ATCT%20LOA.pdf` |
| vZAU C90-MDW ATCT LOA | `1765550529773-vZAU%20C90-MDW%20ATCT%20LOA.pdf` |
| vZAU C90-PWK ATCT LOA | `1758937685172-vZAU%20C90-PWK%20ATCT%20LOA.pdf` |
| vZAU C90-MKE ATCT LOA | `1744333219040-vZAU%20C90-MKE%20ATCT%20LOA.pdf` |
| vZAU C90-RFD ATCT LOA | `1758937704073-vZAU%20C90-RFD%20ATCT%20LOA.pdf` |
| vZAU C90-SBN ATCT LOA | `1774975112291-vZAU%20C90-SBN%20ATCT%20LOA.pdf` |
| SOP - ORD ATCT 7110.65C | `1773594093334-vZAU%20ORD%20ATCT%20SOP%207110.65C.pdf` |
| SOP - MDW ATCT 7110.65D | `1769652220296-vZAU%20MDW%20ATCT%20SOP%207110.65D.pdf` |
| SOP - PWK ATCT 7110.65B | `1758937635571-vZAU%20PWK%20ATCT%20SOP%207110.65B.pdf` |
| SOP - ZAU Chicago Center 7110.65B | `1767540836909-vZAU%20Chicago%20Center%20SOP%207110.65B.pdf` |

## Not yet read — reference and training

| Document | File | Why it matters here |
|---|---|---|
| ORD MDW STARs | `1760824176181-ORD%20MDW%20STARs.pdf` | the four gates' ladders — the biggest single gap |
| ORD and MDW Cheatsheet v3.1 | `1765554505020-ORD%20and%20MDW%20Cheatsheet%20v3.1.pdf` | routes and altitudes in one page |
| vZAU C90 Diagrams (zip) | `1747059198639-vZAU%20C90%20Diagrams.zip` | the airspace shapes the SOP appendices only picture |
| vZAU TRACON Boundaries | `1782302573108-vZAU%20TRACON%20Boundaries.pdf` | the C90 lateral boundary |
| ORD MDW Standard Pilot Briefing | `1769789520291-ORD%20MDW%20Standard%20Pilot%20Briefing.pdf` | what the pilots are told to expect |
| vZAU Facility List v2.3 | `1762265097700-vZAU%20Facility%20List%20v2.3.pdf` | field and position inventory |
| vZAU General ATC Procedures 01.110G | `1782919534420-vZAU%20General%20ATC%20Procedures%2001.110G.pdf` | scratchpad rules 2-5.b.1 defers to it |
| vZAU ATCT Strip Marking 7110.65B | `1745883508038-vZAU%20ATCT%20Strip%20Marking%207110.65B.pdf` | |
| vZAU CRC Quick Reference | `1769475279001-vZAU%20CRC%20Quick%20Reference.pdf` | |
| vZAU 7110.65BB Air Traffic Control | `1738943128984-7110.65BB%20Air%20Traffic%20Control.pdf` | the facility's 7110.65 |
| S1 / S2 / S3 / C1 Training Packages | `1785337501305-S1%20Training%20Package.zip`, `1780448712902-S2%20Training%20Package.zip`, `1780448755800-S3%20Training%20Package%20-%20Part%201.zip`, `1780448960109-S3%20Training%20Package%20-%20Part%202.zip`, `1780449001305-C1%20Training%20Package.zip` | what the student is actually being examined on |
| Chicago ARTCC S3 General Information and Phraseology | `1762412471485-Chicago%20ARTCC%20S3%20General%20Information%20and%20Phraseology.pdf` | |
| Chicago ARTCC C1 General Information and Phraseology | `1762703141886-Chicago%20ARTCC%20C1%20General%20Information%20and%20Phraseology.pdf` | |
| vZAU Rating Exam Rubrics (zip) | `1775358888323-1767330011613-vZAU%20Rating%20Exam%20Rubrics.zip` | how the check ride is graded |

Charts are at `https://charts.zauartcc.org/`.
