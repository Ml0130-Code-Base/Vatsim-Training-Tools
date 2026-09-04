# ZAU Training Toolset

Single-file, offline-first HTML training tools for VATSIM Chicago ARTCC (vZAU) terminal
positions, built to the same architecture as the M98 toolset in `../ZMP/M98 Training/`.
Two facilities have folders here, and each holds one skeleton tool:

- `AZO/azo-drill-deck.html` — **Great Lakes Approach**, the West Wall of the Great Lakes
  TRACON. Kalamazoo ATCT works this position; the callsign prefix is `AZO_*_APP` and the
  six sectors are BELLS, BRONCO, GRIFFIN, WHITECAP, SHORELINE and LUMBERTOWN.
- `C90/c90-drill-deck.html` — **Chicago TRACON**. Seventeen positions across ORD Finals,
  ORD Feeders, the two satellite areas and the four Departure sectors.

Both are **skeletons**, and the word is load-bearing: the frame is real and cited, the
published geometry is not carried, and the tool renders the difference rather than hiding
it. See "The skeleton contract" below before adding anything.

## The skeleton contract

1. **A number is cited or it is absent.** Every operational value in either tool traces to
   a vZAU document by paragraph, and the citation travels with the value in the UI. If a
   number cannot be cited, the slot stays empty. The one declared exception is the six
   field coordinates in the AZO tool, which come from public airport data so the scope has
   something real to plot; they say so in the file and in the data map.
2. **Empty is a state the tool displays.** Both tools carry a `SLOTS` registry — every data
   slot, whether it is `verified`, `partial` or `empty`, and the document that fills it. It
   renders as the "What this tool knows" page. Adding data means moving a slot's state and
   filling the table it names, in the same commit.
3. **The engine never asserts what it cannot know.** With no route geometry and no
   boundaries, neither tool claims a boundary was crossed, a crossing restriction was
   missed or an interval was lost. The AZO tool grades the two things that are text rather
   than geometry — the altitude a destination owes the next sector, and whether a beacon
   code is inside the allocated block — and says "reminder, not a judgement" where the
   check is weaker than it looks.
4. **Single file, no build step, no dependencies, offline-first.** Vanilla ES5-style JS. The
   Google Fonts link is the only external reference in the markup and both pages are fully
   functional without it. There is **no network call at all** in either tool. Both must keep
   working end to end from `file://` with the machine offline.
5. **Additive extension pattern.** Exactly two `<script>` blocks per page, in dependency
   order: the facility deck (engine + data + `window.DD`), then the builder block, which
   reads `window.DD` and returns early if it is absent. New features go inside an existing
   block or as a third block after them. The chrome outside those blocks — topbar, hero,
   empty `#modnav`, footer — is left alone without an explicit ask.
6. **One copy of every operational number.** The deck exposes `window.DD`; the builder reads
   through it and never keeps a second copy. `DD.hooks` is called at the end of every tick.
7. **Design system:** the CSS custom properties (`--bg --panel --panel2 --ink --dim --dim2
   --line --green --amber --red`, `--display --body --mono`) are shared with the M98 tool.
   New classes are namespaced `dd-` (deck) or `ddb-` (builder). Don't introduce new fonts or
   accent colours.
8. **Interface language:** full terminology, sentence case, no new abbreviations. Domain
   abbreviations (TRACON, TRSA, LOA, SOP, STAR, SID, ADA, RRCP, APREQ, position symbols)
   are fine.
9. **Never write a literal `</script>` inside a script block** — it would break the page and
   any harness that splits blocks on the tag.

## Three pages, not one scroll

Both tools mount their sections in workflow order and then move them into view wrappers in
the builder block's `buildPages()`: **Set up a drill** · **Fly it** · **Notes and map**.
`page(id)` switches, and placing a strip jumps to Fly. Section ids survive the move, so
anything that looks one up still works.

## What each tool carries today

**C90** — positions and frequencies (2-1), the combining chain (2-2), the four arrival
configurations and the four MDW configurations, Final runway responsibility by configuration
(4-3.b.1), turn-on altitudes and capture points for dual, triple and visual approaches
(4-4, 4-5, 4-6), beacon blocks (2-4), the airport list with tower position symbols (2-6.d),
NSAT entry altitudes (6-2.c) and the Appendix A glossary. Plus, from the community pull below,
the facility footprint (one polygon, surface–FL150) and the eight field positions. Empty: the
STAR and SID geometry, the internal sectorisation, the Arrival Descent Area shapes, the MVA
map, the ZAU LOA interface, the tower LOAs and every handoff identifier. Partial: the four
SSAT altitude matrices in 7-4, the footprint, the field coordinates.

**AZO** — the six West Wall sectors with callsigns, frequencies and hierarchy (2-2, 2-3,
Appendix B), the East Wall neighbours, the departure areas for AZO, GRR and MKG (4-4, 5-3,
6-3), every inter-sector handoff altitude in the order, the ZAU-AZO LOA interface, the local
rules (TRSA, Class D, noise, control for climb, transfer to tower) and the minimums to
vector for a visual. Plus, from the community pull below, the TRACON footprint (one polygon
covering both walls, surface–10,000) and five of the six field positions. Empty: the West Wall
sector boundaries, the TRSA depiction, all procedure geometry, the MVA map, every handoff
identifier, and KHLM's coordinates. Partial: the footprint, the field coordinates, the East
Wall list, the beacon blocks.

### On the boundary slots, after the 2026-09-02 community-source pull

Read `../claude_Community_Geometry_Sources.md` before moving either boundary slot, because
what is available is **less than it first looks** and moving a `SLOTS` state too far would be
exactly the "verified slot with an empty table" failure §11 warns about.

**Available:** each facility's **outer footprint and its ceiling**, from VATGlasses ZAU —
C90 as one polygon **surface–FL150** (35 vertices), AZO "Great Lakes" as one polygon
**surface–FL100** (32 vertices). SimAware additionally splits the AZO footprint into `AZO` and
`LAN` polygons. That answers *is this inside the facility, and under its lid*.

**Not available:** **the internal sectorisation of either TRACON.** VATGlasses expresses C90's
four positions (`O1Z`, `O1B`, `O1S`, `O1X`) and AZO's three (`Z1G`, `Z1R`, `Z1N`) as an
*ownership priority chain over one shared polygon* — there is no per-sector shape. So **AZO's
six West Wall sector boundaries and C90's internal splits remain empty**, and so do the TRSA
depiction, the procedure geometry and the MVA map.

**Vendored 2026-09-02** at `_shared/source-vatglasses/`, decoded in
**`_shared/claude_ZAU_Sector_Geometry_Reference.md`**. It is trusted because **ZAU vARTCC owns
the dataset** — upstream `Owners.xlsx` names Joe Nyquist (`Saluki00`) as its manager, and
locally managed sets receive *"periodic bulk updates when local sector files change"*, so the
polygons come from the facility's own sector file. It still sits **below the facility orders**:
where the C90 or AZO SOP disagrees, the SOP wins. Licence is **CC BY-NC-SA 4.0** — any tool
drawing these shapes **must credit VATGlasses on the page**.

**One discrepancy to resolve against the orders before relying on the position list:**
VATGlasses models **four** C90 positions and **three** AZO positions, where AZO 2-2/2-3 define
**six** West Wall sectors. Fewer positions than the order defines is an owner question, not a
correction to make here. Both tools now record it against their `positions` slot, together
with the cross-check that came out clean: **all seven modelled frequencies match the orders
exactly**, so the disagreement is coverage, not accuracy.

**Wired into both tools 2026-09-02.** Each deck carries the polygon as `FOOTPRINT` with
`inFootprint()`, `underLid()` and `containment()`; the scope draws it; every strip says
whether it is inside and under the lid; and placing one outside logs a reminder that names
itself as a reminder. The slots moved to `partial` — `boundary` at C90, `footprint` at AZO —
and the slots that stayed `empty` gained a line saying the community source does **not** close
them (`splits` at C90, `boundary` at AZO). **The CC BY-NC-SA attribution is on the page in
three places** in each tool: the footer, a "where the boundary came from" panel in the data
map, and a credit line inside the scope SVG. It is a licence obligation — do not remove it.

Two things fell out of the pull that are worth knowing. **AZO's lid is corroborated**: the
dataset's FL100 ceiling and the SOP Appendix B legend, *"AIRSPACE DELEGATED TO GREAT LAKES
TRACON AOB 10,000'"*, agree independently, which is why the AZO tool treats the lid as solid
while still treating the lateral shape as second-tier. And **AZO's footprint covers both
walls** — its eastern half is ZOB's East Wall — so inside the polygon is not the same as
inside West Wall airspace, and the tool says so rather than implying otherwise.

**Still missing at both, and it is one `curl`:** no ZAU vNAS record is held anywhere in this
repository, so C90 and AZO have **no handoff identifier source at all**. Both tools carry a
`handoff` slot marked empty and naming the endpoint.

ZAU's 19 **en route** sectors *are* fully described with stratums, which matters only if a ZAU
Center tool is ever built.

## Student notes — C90

The C90 builder block carries a **note rail**: every panel, table and empty data slot has a
`data-note` anchor, and `mountRail()` hangs a "+ student note" affordance on each one. A note
is stored against its anchor in `localStorage` under `c90-drill-deck-v1`, survives reload,
and exports as Markdown **addressed to the anchor**, with the slot's state and source
document printed under the heading — so a note about the capture-point table arrives as
`## capture` and can be folded straight into `claude_C90_Reference.md` or raised with an
instructor. Notes are typed: note, correction, question for the instructor, change the tool.

Adding a section to the C90 tool means giving its panel a `data-note` attribute. That is the
whole integration; `mountAllRails()` finds it.

The AZO tool has the practice-log half of this (bank a debrief, export as Markdown) and not
the per-anchor rail. Add the rail there too if the same feedback loop turns out to be wanted.

## Testing

No Node and no working Python on this machine, so there is no runnable harness yet — the
M98 `smoke-test.mjs` pattern is the model when one becomes possible. Both tools were
verified by driving the real page in a browser: sections mount, the page tabs switch, the
combining chain resolves, a multi-clause transmission produces one readback, the aircraft
flies at the right rate and distance, the AZO altitude and beacon reminders fire, and the
note export carries its anchor and slot state. Say plainly which of these was actually run
rather than implying a suite passed.

## Session hygiene

Commit after each completed subtask. When aviation data is involved, cite which document and
paragraph the number came from in the commit message. **One commit touches one ARTCC:** C90
and AZO may share a commit, and nothing under `ZMP/` or `ZLC/` may join it. Root `CLAUDE.md`
§14.
