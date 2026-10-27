# The master fly and drill blocks - M98's "Fly it" and "Set up a drill" pages, for every other deck

`fly-block.html` and `drill-block.html` at the repository root are the masters. Together they give a deck the two M98 pages the owner asked to have everywhere: **Set up a drill** (a brief, a seeded generator, a per-strip "flown on" panel, saved drills, JSON) and **Fly it** (a live clock, a scope, strips, a transmit box, a frequency feed, response timing, a debrief). Written 2026-10-27 on the owner's instruction: *"go through all facilities besides M98 and make sure they all have the same feel like M98 on the Set up a drill and fly it pages"*, with the scope settled as *"option 2 plus check if some of these inconsistencies are stemming from master blocks not being updated or current, go ahead and update the relative master block."* Tracked as issue #76.

**They are wired into the three ZID decks (IND, SDF, CVG). They are not in M98, which keeps its own engine and builder, and they are not in any other deck yet.**

## 1. What the owner decided, and what it waives

Option 2 was interface parity **plus a shared engine that flies each strip along its facility's CIFP published ladder**: the clock, the published crossings and the published speeds. That waives one sentence of the root `CLAUDE.md` section 3, *the jump from Tier 1 to Tier 2 is gated on geometry and on a first OJT session*, for the decks that carry the masters, and only for what CIFP itself publishes. Everything else in the contract holds:

- **Nothing spatial beyond the published track is claimed.** No boundary is crossed, no sector owns anything, no handoff receiver is right or wrong. A transmission to a frequency is read back and the aircraft goes; whether that was the correct position is not graded, because no deck carries the delegation that would say (invariant 3).
- **`STANDING` stays `[]`.** Nothing the engine flags is tagged to a standing item and the debrief says so in words (invariant 4).
- **Every check that is weaker than it looks says *"Reminder, not a judgement."***
- **No second network call** (invariant 6). Neither master contains `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` or `sendBeacon`; the smoke test asserts it.

## 2. What flies, and what it flies on

| Strip | Flies | Source |
|---|---|---|
| Arrival | its STAR: transition, common route, runway transition | the deck's procedures block - `PFIX`, `STARS`, `procOf`, `trackTo` - read, never copied (invariant 5) |
| Departure | its SID: runway transition, common route, transition | the same |
| Overflight | the straight line from its entry radial/distance to its exit radial/distance | the strip's own boxes; refused by name if any is empty |

An arrival **descends via** the published altitudes and flies the published speeds until it is told something else. It keeps the 250 knot limit below 10,000. A departure climbs to the highest published floor ahead of it, or to the cleared altitude the drill gave it (`climbTo`), and holds there. A heading takes the aircraft off its published track (`via` goes false and it flies the heading); an assigned altitude or speed replaces the published one.

**What it does not do, and says in the feed:**

- No approach intercept, no final approach course, no threshold. A clearance is read back and the aircraft is handed to the tower.
- No wind. Heading and track are the same number.
- **Straight between fixes.** Arcs, holds and procedure turns are not flown, and a vector leg ends the published track.
- A procedure with fewer than two coordinates for the runway and transition chosen is **refused, strip by strip, with the reason**, not flown from a guess.

**Engine parameters are not aviation data.** `CLIMB` (jet 2400, turboprop 1500, piston 700 feet a minute), `DESC` (2000, 1200, 700), `ACCEL` (1.5 knots a second), `GRAD` (318 feet a nautical mile, the ceiling on a descent gradient, further limited to what the aircraft's descent rate can fly at its ground speed) and `TURN` (3 degrees a second) set how fast the scope moves. They are written as such in the block, they are not cited because they are not facts about the facility, and **they are exported as `fly.CLIMB`, `fly.DESC`, `fly.ACCEL`, `fly.GRAD` so a test can read them rather than copy them.**

**The transmit box** takes several instructions in one transmission, as a real one does: callsign, altitude (`descend and maintain 11000`), speed (`reduce speed to 250`), heading, direct, `expect runway`, `descend via`, a cleared approach (read back only), squawk, radar contact, ident, and `contact <frequency>`. Spoken digits are read as the number they are (`despell`: *one one thousand* is 11000, never 110). A bare `maintain` far from the current altitude is queried, not taken. A frequency belonging to the position you are working is refused; a frequency no position in the deck is on is refused and says so; an open position's frequency hands the aircraft off.

## 3. The fly contract

```js
window.FLY_FACILITY = {
  id:      'IND',            // facility label for every message
  prefix:  'indfly',         // id/class prefix and the stem of every global the block defines
  ns:      'IND',            // the deck's namespace; PFIX, procOf, trackTo for flown procedures
  host:    function(){},     // the element the player fills, or null
  airportLL: function(icao){},   // [lat, lon] from the deck's data
  // optional - the honest fallback is to leave the line out, never to guess
  ref, outline, flow, frame, positions, towerFor, callName, spoken, radiusNm, bank, cycle
};
```

`flow()` returns `{airport, land, dep, name}` and is what the generator reads, so **the runway comes from the configuration in force**. `positions()` returns `[{id, name, freq, open, owner, kind, self}]`. `bank(entry)` receives the debrief. `cycle` is quoted beside a published crossing (`CIFP 261001`) so the citation travels with the number.

`towerFor` is omitted at IND because the deck holds no tower or runway-ownership data to answer it. Without it the *contact tower* quick button is left out and "tower" is not an addressable receiver by name; a tower position the deck lists in `positions()` still receives by its own frequency.

**Exports.** `window.fly = {FACILITY, sim, load, validate, step, transmit, mk, track, viaTarget, parseAlt, despell, pointAt, xy, render, setRate, end, tracksFor, LAYER_MODES, transOptions, procFor, fixCum, conText, esc, mountCss, haveProcs, find, CLIMB, DESC, ACCEL, GRAD}` and the handlers `window[prefix + 'Load' | 'Rate' | 'End' | 'Bank' | 'Send' | 'Quick' | 'Layers' | 'Range' | 'Pick' | 'Target']`.

A **drill** is `{id, name, frame, strips:[strip...], rate:0|1|4|'hot'}`. `fly.load` refuses a drill the engine cannot fly and says why strip by strip; `fly.validate` is the same check without loading.

## 4. The drill contract

```js
window.DRILL_FACILITY = {
  id:       'IND',
  prefix:   'inddrill',
  sectionClass: 'ind-section',          // optional: the deck's own heading class
  storeKey: 'ind-drill-deck-fly-v1',    // never a status word - the key outlives the status
  anchor:   function(){},               // the strips section: the builder opens above it, the save bar sits below
  rows:     function(next){},           // the strip block's rows; with an array, replace and re-render; always return the array
  page:     function(id){},             // optional: 'fly' / 'setup'
  mountRails: function(el){}            // optional: the notes rail, per section
};
```

The frame and the configuration are read from `FLY_FACILITY` (`flow`, `frame`, `host`), so the deck states each of them once.

**What it mounts.** A head section before the strips (the frame line, a name, the clock, a brief, seed, count and mix, *Generate strips*) and a tail section after them (*Flown on*: a per-strip transition select and a departure's cleared-altitude box; *Save and fly it*, *Save only*; saved drills with *Fly it* / *Load into the strips* / *Delete*; JSON export and import; a plain notice when storage is unavailable). It wraps `<stripprefix>Sync|Add|Drop` to repaint its details. It never draws a strip; the row is the strip block's.

**Exports.** `window.drill = {store, generate, rng, collect, flyIt, KEY, storeOk}` and the handlers `window[prefix + 'Set' | 'Gen' | 'Trans' | 'Climb' | 'SaveFly' | 'SaveOnly' | 'Fly' | 'Open' | 'Del' | 'Export' | 'Import']`.

### What the generator claims

Every procedure, runway and transition it picks is one the deck carries and the strip block accepts for that field. **Not aviation data, and each a box on the strip the trainee can change:** the altitude an arrival starts at, a departure's cleared altitude, the starting speed, the callsigns, the aircraft types and the stagger of the check-ins. They come from the fixture lists (`CARRIERS`, `JETS`, `PROPS`, `PISTONS`, `CLEARED`) at the top of the block. The generator is a seeded linear congruential generator (`s = (s * 1664525 + 1013904223) % 4294967296`), so **the same seed builds the same drill**, and the seed is in the box.

What it guarantees beyond legality, because a drill that misses its own crossing on the first minute teaches the wrong thing:

- An arrival starts 35 to 80 NM from the end of its track, **never below the next published floor ahead and never so high it cannot make the lowest ceiling ahead** at the descent gradient the aircraft can fly.
- A departure is only generated where it can reach the highest SID floor ahead of it; otherwise it is swapped to a type that can, or skipped.
- The first two strips check in at once, the rest are staggered 30 to 150 seconds apart.

### The one gap in the strip, stated

**The strip carries no transition field.** The builder stores the choice as `trans` (and `climbTo` for a departure) on the row object, which the strip block's `readRow` mutates in place, so the properties survive. **A strip with no `trans` is resolved by `pickTrans`:** an arrival that names the fix it is running to (`dtgFix`) takes the transition that holds that fix, or none when the fix is in the common part; an arrival with no `dtgFix`, and every departure, takes the **first transition alphabetically**. That is a default, not a statement about what the facility assigns - CIFP does not say, and the SOP is where that lives. The chosen transition is `track.entry` on the built track. **No warning on the strip names the defaulted case, and the feed has not been checked to announce it**; a strip that matters should have its transition chosen in the *Flown on* panel.

## 5. Storage

The saved drills use their **own** key, `<basename>-fly-v1` (`ind-drill-deck-fly-v1`, `sdf-drill-deck-fly-v1`, `cvg-drill-deck-fly-v1`). The builder's key (`<basename>-v1`) holds the notes and the practice log; sharing it would put a corrupt drill list in the way of the trainee's own writing (issue #70). No status word appears in either. Where storage is unavailable the tool works in memory and **says so on the page**; the JSON export is the real backup.

## 6. Adopting it at another facility

1. **The strip block and the procedures block first.** Without a procedures block only overflights fly, and the page says so.
2. **Expose the strip rows.** In the strip mount, after `<prefix>RowAt`: `window[P + 'Rows'] = function(next){ if(next && next.length){ rows = next; render(); } return rows; };`
3. **Mark the strips flown.** In the procedures block's strip contract, `flies:true` for the procedures the fly block can fly (`track:true` is the separate claim that the ladder is carried, and the row labels the two differently).
4. **Give the Fly page a host.** Replace the *"No traffic model yet"* placeholder with a lede and `<div id="<prefix>fly-host">` holding the honest fallback text, so a deck where the block fails to load still states why there is no sector-level model.
5. **Add two blocks after the last block, each a contract followed by the master byte for byte**, and renumber the "Block N of M" headers. Splice before the **last** `</body>`.
6. **In the smoke test**, raise `EXPECTED_BLOCKS` and add section 11 (below).

### The checks section 11 carries (ZID smoke tests)

The exports exist; the contract names this facility and its own storage key, never the builder's; neither master contains a network call; `STANDING` is empty; **every published procedure builds a track out of the procedure table's own coordinates, in order, or is refused with a reason**; an 80 NM overflight is 80 NM; an overflight with a box empty is refused by name; an altitude is read the way the strip box says it (hundreds under 1,000, FL, commas, 0 is none); spoken digits read as the number they are; the same seed builds the same drill and a different seed a different one; **every generated strip is legal for the facility and every generated drill can be flown**; a drill the engine cannot fly is refused; **an untouched generated drill never misses a published crossing or speed limit** (eight seeds, 2,400 simulated seconds each); the transmit box takes altitude and speed in one transmission, takes a heading off the track, queries a far bare maintain, refuses a switch to your own position, hands off to an open position by its own frequency, and refuses a frequency no position is on; and **the debrief states that nothing is scored against a standing item.**

Run on 2026-10-27 through the browser runner (there is no Node on the owner's machine - root `CLAUDE.md` section 12, so `node smoke-test.mjs` itself has not been run): **IND 276 checks, SDF 290, CVG 368, all passing.** Separate untouched sweeps, many more seeds than the harness carries, flew CVG 640 strips and SDF 960 with **zero** missed published crossings or limits.

**What the sweep does not say.** A do-nothing run still produces losses of separation, orphaned aircraft and outline flags, and those are legitimate consequences of leaving traffic alone, not engine faults. The zero is about *published crossings and limits the engine itself should have met*, and nothing wider.

## 7. Drift

Both masters are byte-identical in every deck that carries them. Check it rather than assume it:

```bash
perl -0e 'local $/; open(D,"<:raw",$ARGV[0]); $t=<D>; open(M,"<:raw",$ARGV[1]); $b=<M>; $t=~s/\r\n/\n/g; $b=~s/\r\n/\n/g; $b=~s/\A<script>\n//; $b=~s/\n<\/script>\n\z//; print((index($t,$b)>=0?"identical":"DIFFERS"),"\n")' ZID/IND/ind-drill-deck.html fly-block.html
```

A change to a master lands in every copy in the same commit **within one ARTCC**; a deck's block is its contract followed by that body, so replace the body, never the contract. The decks of other ARTCCs catch up in their own commits, and until they do they carry no copy at all (nothing is out of step that is not there).

## 8. What is deliberately not here

- **M98's Position Setup panel** (seat set, quick setups) is not in the drill master. The ZID decks already carry a seat and open-position set in their own builder; folding the two into a position master is a later piece of work.
- **S56 has no procedures block** (issue #3), so its arrivals and departures cannot fly until it has one. **AZO** has CIFP confirmed empty at all four fields, so it flies overflights only; **ZMP Center** is en route and flies overflights and direct only.
- **CIFP 261029 rolls on 2026-10-29** (issue #65). A procedure table is regenerated, never patched (root `CLAUDE.md` section 11), and the fly block reads whatever cycle the table carries.
