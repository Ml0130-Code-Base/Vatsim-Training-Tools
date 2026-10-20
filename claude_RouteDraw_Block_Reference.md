# The master route-draw block - M98's "Routes drawn" bar, for every deck that carries published procedures

`routedraw-block.html` at the repository root is the master. It puts the **Routes drawn** layer bar that the M98 live scope has on a deck's plot and draws the SIDs and STARs the deck's procedures block carries, from CIFP coordinates. It adds no data of its own. Written 2026-10-20 on the owner's instruction: *"add the same Route draw buttons and functions that we have on the M98 deck and make sure that those buttons and functions are set as in the template for future facilities."* It is wired into the three ZID decks (IND, SDF, CVG). **It is not in M98, which keeps its own layer code, and it is not in any other deck yet.**

## 1. What M98 has, and what the master takes from it

M98's scope has `LAYERS`, `LAYER_MODES`, the `ddLayers(mode)` function and a bar of buttons above the scope. The master keeps all of that, by the same ids, in the same order, with the same colours and weights.

| M98 | Master | Notes |
|---|---|---|
| `LAYER_MODES` ids `tracked, stars, sids, both, off` | `NS.routeDraw.LAYER_MODES`, the same five ids in the same order | the ids are the template; a note or a test written against one reads the same everywhere |
| `ddLayers(mode)` | `window['<prefix>Layers'](mode)`, e.g. `indrdLayers('both')` | also `NS.routeDraw.set(mode)` |
| `LAYERS`, default `tracked` | `NS.routeDraw.layers()`, default `tracked` | |
| the bar `#dd-layerbar`, buttons `data-l`, class `on` | `#<prefix>-layerbar`, same attribute and class | label *Routes drawn* |
| STARs green 1px, 0.45 opacity; SIDs amber dashed 1px, 0.4 | the same | the open procedure is heavier (1.6px, 0.9) |
| a layer choice never hides the track under what you are working | the same, enforced in `plan()` | only *off* is bare |

**One rename, and it is deliberate.** M98's first button reads *tracked traffic* because M98 has traffic. A deck with no traffic model has none to track, and a button that said so would be the tool asserting something it cannot know (root `CLAUDE.md` invariant 3). In the master the first button is **open procedure**, the procedure open in the Published procedures viewer. The id is still `tracked`.

## 2. The contract

```js
window.ROUTEDRAW_FACILITY = {
  id:      'IND',        // facility label for every message
  ns:      'IND',        // the deck's namespace; must carry PFIX, STARS, SIDS, trackTo
  prefix:  'indrd',      // id and class prefix, and the stem of '<prefix>Layers'
  host:    function(){ return document.querySelector('#ind-footprint svg'); },
  project: function(lat, lon){ return window.IND.fpProject(lat, lon); },  // [x, y] in the plot's own units
  // optional
  open:    function(){ ... },     // {apt, kind, proc, entry, rwy}; defaults to NS.openProc
  pickFn:  'indpPick',            // the viewer's pick function, wrapped so the plot follows it
  trackedLabel: 'open procedure',
  reachNm: 40,                    // how far past the outline the plot is widened
  extras:  function(mode, plan){ return svgString; }
};
```

**The obligations on the deck, and they are small.**

1. Its procedures block exports `PFIX`, `STARS`, `SIDS`, `kindOf` and `trackTo`. The R90 procedures block, which every ZID deck carries, already does.
2. **The deck owns the projection** and exposes it (`NS.fpProject(lat, lon)`). The master never keeps a second formula, so an outline and a procedure cannot be placed by two different ones. In the ZID decks `footprintSvg` was refactored to draw through the same `fpFrame()` the master asks.
3. For the *open procedure* mode the deck exposes the viewer's selection (`NS.openProc()`, added to the ZID procedures block). A deck that cannot answer this simply has a button that draws nothing and says so.

With no contract, or no procedures block, the master does nothing and says nothing, like every other block in the family.

## 3. What it draws, and what it does not

- **Drawn:** every segment of every published procedure (common, each transition, each runway transition) as a polyline of fix coordinates, from `NS.PFIX` through the procedures block's own data. A segment that is the same run of fixes at several fields is drawn once. SIDs are labelled at their last fix, STARs at their first, and the open procedure has every fix dotted and named.
- **Straight between fixes.** Arcs, holds and procedure turns are not flown. The page says so.
- **A vector leg ends a line,** because the published data stops there. A fix with no coordinate is skipped and counted, never placed.
- **Reach.** Procedure entry fixes sit well outside a facility outline; a STAR can begin 200 NM out. While anything is drawn the plot is widened to take in what lies within `reachNm` (default 40) of the outline and **a track that runs further is cut by the edge of the plot, with the page saying how many.** *Off* restores the original view. M98 does the same thing by mapping to 80 NM.
- **Not in the master:** the 25 DME release ring M98 draws with its SIDs is the M98 LOA's number (ZMP-M98 LOA 4.c) and has no equivalent at another facility. A deck whose agreement states a ring adds it through `extras`. Nothing here says which transition a facility assigns; that is an SOP question CIFP does not answer.

## 4. Adopting it at a new facility

1. Build the procedures block first (root `CLAUDE.md` section 10, step 3 and the R90 block). Without it there is nothing to draw.
2. Give the plot a projection function and export it. Refactor the plot so it draws through that function.
3. Export the viewer's selection as `NS.openProc`.
4. Add a block after the strips block: **a facility contract, then the master copied byte for byte.** Take the header comment of any ZID deck's route-draw block as the shape. **Set the prefix from the facility** (`indrd`, `sdfrd`, `cvgrd`); it must not collide with an existing prefix.
5. In the smoke test, raise the block count and add the assertions below.
6. Splice before the **last** `</body>`.

**Assertions every deck should carry** (the ZID smoke tests have them, 20 each): the mode ids and their order; the default; that the contract names the facility and the layer function exists; that the projection puts every outline vertex inside its own plot; that *off* draws nothing; that *all STARs* draws STARs and no SID and the other way round; that *both* is exactly the two sets; that *tracked* draws only the open procedure; that the open procedure is drawn in every mode but off; that every drawn point is in the facility's region and is a fix at the procedure table's own coordinates; that no two tracks are the same run of fixes; that the open track is the viewer's own, in order; and that an unknown mode is ignored. `plan(mode)` is pure, which is what makes all of that testable without a browser.

## 5. Drift

The three ZID decks carry byte-identical copies. Check it rather than assume it:

```bash
perl -0e 'local $/; open(D,"<:raw",$ARGV[0]); $t=<D>; open(M,"<:raw","routedraw-block.html"); $b=<M>; $t=~s/\r\n/\n/g; $b=~s/\r\n/\n/g; $b=~s/\A<script>\n//; $b=~s/\n<\/script>\n\z//; print((index($t,$b)>=0?"identical":"DIFFERS"),"\n")' ZID/IND/ind-drill-deck.html
```

A change to the master lands in every copy in the same commit, the way the strip block does. A deck's route-draw block is its contract followed by that body; replace the body, never the contract.

## 6. What was verified, 2026-10-20

- **The harness, run through the browser runner** over a local `HttpListener`: **IND 218, SDF 234, CVG 289 checks, all passing**, each 20 more than before. The new assertions are the list in section 4.
- **The real pages, driven:** five scripts per deck; the bar mounts with five buttons and the first is on; each mode draws what `plan` says (IND, *all SIDs + STARs*: 50 STAR tracks and 11 SID tracks; the open procedure alone for *tracked*; nothing for *off*); the plot widens by the stated reach and returns to its original view on *off*; changing the viewer's kind and procedure moves the open track and its colour and dash; no `NaN` or `undefined` in the SVG; console clean.
- **Not verified:** how it looks. The browser pane's screenshot timed out repeatedly during this work, so the page was checked by reading its SVG and its geometry and not by eye. Look at it before trusting the labels, which are placed by a simple stack and may collide where several procedures share a fix.
- **Not persisted.** M98 persists its layer choice in the builder's state. The master does not: it is a view toggle, the deck's storage key belongs to the builder's state, and a second key would break the one-key rule. The plot opens on *open procedure* every time.
