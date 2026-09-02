# ZMP IDS Reference — `minniecenter.org/ids`

Investigated **2026-09-01**. The IDS is the Information Display System that ZMP Order 7200.1O 2.2 names as the home of the **Status Information Area**: *"The SIA is included in the IDC system found at `https://minniecenter.org/ids`."* The SIA is weather briefings, PIREPs, NOTAMs and Traffic Management Initiatives, and 7200.1O 2.1 makes reviewing it part of continuous duty familiarization — so it is operationally live, not a nicety.

## Access status

**`/ids` is login-gated and returns HTTP 403 without authentication.** So does `/rni`. The 403 response is not empty — it serves the site's full 28 KB shell with the navigation chrome — but none of the IDS content itself.

**I did not attempt to authenticate or work around the gate**, and this document contains nothing from behind it. Everything below came from the public shell or from endpoints that answer without a session.

## What answers publicly

| Endpoint | Status | Returns |
|---|---|---|
| **`/api/eventsplits`** | **200, `application/json`** | **Live, structured airspace-split data. See below.** |
| `/api/schedule/` | 200, `text/html` | A booking-schedule fragment (pagination chrome) |
| `/api/calendar/events/` | 404 | — |
| `/api/calendar/admin/events/` | not probed | Admin-scoped by name; left alone |
| `/ids`, `/rni` | 403 | Login required |

## `/api/eventsplits` — the find

**This is a machine-readable source for something 7200.1O only has as pictures.** Chapter 10 publishes three event splits and **all six of its diagrams have no text layer** (`claude_ZMP_Gap_Analysis.md` Part 3). This endpoint gives the same *kind* of information as structured data.

Shape — an array of split objects:

```json
[
  { "type": "current", "name": "Current Split", "split": [] },
  { "name": "Summer On The Lake", "type": "event",
    "start": "2026-09-06 14:00:00", "end": "2026-09-06 18:00:00",
    "split": { "MSP_11_CTR": "7|8|9|10|11|17|18|19|20|23|24|25|26|27|29|30|33|36|37|38|39",
               "MSP_12_CTR": "1|2|3|4|5|6|12|13|15|16|21" },
    "live": false }
]
```

- **`type: "current"`** is the split in effect right now. At the time of the pull its `split` was **empty** — no split active.
- **`type: "event"`** entries carry `start`, `end` and `live`.
- **`split` is keyed by position callsign**, and the value is a pipe-delimited list of sector numbers that position owns.

**The data model is exactly the one the owner described for the training environment: a seat owns a bundle of sectors.** That is a meaningful corroboration — the facility's own tooling represents airspace assignment the same way `TRAINING_SPLIT` does in `zmp-drill-deck.html`.

### The two splits captured on 2026-09-01

| Event | Window | Position | Sectors owned |
|---|---|---|---|
| **Summer On The Lake** | 2026-09-06 14:00–18:00 | `MSP_11_CTR` | 7, 8, 9, 10, 11, 17, 18, 19, 20, 23, 24, 25, 26, 27, 29, 30, 33, 36, 37, 38, 39 |
| | | `MSP_12_CTR` | 1, 2, 3, 4, 5, 6, 12, 13, 15, 16, 21 |
| **Labor Day Baseball** | 2026-09-07 18:00–22:00 | `MSP_11_CTR` | 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 15, 16, 19, 20, 21, 23, 24, 25, 33 |
| | | `MSP_18_CTR` | 7, 8, 17, 18, 26, 27, 29, 30, 36, 37, 38, 39 |

**Two observations, both worth carrying:**

1. **Sector 22 is absent from both splits.** Every other one of the 33 documented sectors appears in each. 22 is an Area 4 high sector and it is also the one sector whose scope range is conditional in the order — *"normally 150 or 225 depending on configuration"*, with the configurations never named. Whether its omission here is deliberate or a data slip is **not resolved**.
2. **The Labor Day `MSP_11_CTR` string repeats 23, 24 and 25.** Written as `...|11|19|20|23|24|25|12|13|15|16|1|2|3|4|5|6|9|10|21|23|24|25|33`. Harmless when parsed into a set, but it means the raw string is not a clean list — **de-duplicate on read.**

Sector numbers here are **not zero-padded** (`7`, not `07`), unlike 7200.1O and the tool's `SECTORS` keys. Any consumer must normalise.

## Leads this opens

- **The IDS loads `d3.js`** (`d3js.org/d3.v4.min.js`) in its public shell. d3 is a data-visualisation library, and an IDS that draws airspace splits needs **sector geometry** to draw them against. **That is the strongest lead yet on the boundary problem** — every other avenue has closed (the SOP maps are pictures, the sector charts have no text layer, and vNAS exposes no video-map endpoint). If the authenticated IDS ships sector polygons to the browser, they are a data file the owner can reach by logging in.
- **`/rni`** is a separate gated area whose purpose is not stated in the public shell.

**Both are owner-side questions.** Ask the owner to log in and check whether the IDS draws a sector map, and if so what data file it loads.

## What the tool should and should not do with this

**Should:** treat `/api/eventsplits` as a *reference* source, the way `claude_Source_Documents_Index.md` treats the PDFs — pull it, record what it said and when, and cite it. The captured data above is a dated snapshot, not a live feed.

**Should not:** call it at runtime. `zmp-drill-deck.html` is **offline-first with no network calls** (`CLAUDE.md`, Architecture rule 1), and that rule holds. The M98 tool's single D-ATIS fetch is the one exception in the whole toolset and it is optional by construction with a paste path that always works. If event splits ever become a live feature here, they follow that same pattern: paste is the path that always works, and the fetch is never on a path the tool needs.

## Re-pulling

The endpoint rejects a default `curl` user agent with 403 at `/ids`, but `/api/eventsplits` answers either way. A browser user agent is used here for consistency with how the PDFs were pulled.

```bash
curl -sS -A "Mozilla/5.0" -o _vnas/zmp_eventsplits.json "https://minniecenter.org/api/eventsplits"
```
