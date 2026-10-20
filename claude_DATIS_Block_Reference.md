# The master D-ATIS block - read the broadcast, find the flow, set the frame

`datis-block.html` at the repository root is the master. It reads a pasted or fetched D-ATIS, matches the runways in use against a deck's own configuration table and, when exactly one configuration fits, sets the frame's configuration (and the wind and flight category) from it. Written 2026-10-20 on the owner's instruction: *"trim flow dependent for both SIDs and STARs, only draw what's correct for flow. Also make sure D-ATIS feed are available to determine flow."* It is wired into the three ZID decks. **No other deck carries it**; C90, AZO, S56, Big Sky and R90 carry the older reader this one was derived from, which shows the runways and sets no frame.

Read `claude_DATIS_Field_Survey.md` first if you are touching the reader. Its lesson stands: **the parser's failure mode is a confident wrong answer, so the only reliable test material is a live pull.**

## 1. What it does, and what it refuses to do

1. Reads the broadcast: information letter, wind, visibility, ceiling, altimeter, the runways landing and departing, the approach advertised to each, and the closures.
2. Matches the advertised runways against `NS.CONFIGS`. A configuration fits when every advertised landing runway is among the runways it lands, and every advertised departure runway among the runways it departs. *Inside*, not equal: a runway shut for the day narrows the advertised flow without changing the configuration.
3. **Four outcomes, and nothing is ever picked out of several.**

| Outcome | Meaning | The frame |
|---|---|---|
| `one` | exactly one configuration fits | configuration, wind and category are set |
| `many` | several fit | **nothing is set**; they are named and the trainee picks |
| `none` | no row lands these runways | nothing set; the page says the routes are not trimmed to a flow |
| `nothing` | no runway was advertised that the reader could take | nothing set |

4. **A broadcast that states no departure runways says nothing about them, and none is assumed.** IND's and SDF's combined ATIS name only the approach. They match on the landing runways alone and the page says so.
5. **A saved broadcast is shown and never applied** on page load, because the frame may have been changed by hand since. Only the *read what is pasted* and *fetch* buttons apply.
6. **Closures are read-only.** A runway named closed, or an item out of service, is shown and never reaches the flow. A runway advertised in use and also named closed is stated as a contradiction.

## 2. The reader, and the two additions

The code from `RWY_ONE` to `wxRead` is the C90 block's reader, which is the copy the other decks carry. Its comments are shortened here and the **code is identical** (checked by stripping comments and whitespace from both and comparing: 6,947 characters each). It is grammar-driven: the sentence is the unit, a runway only ever comes off a runway keyword or an approach clause, and a sentence naming a runway as shut, out of service or unusable contributes nothing to the flow.

**Two landing grammars the shared reader reads as nothing, found in the live broadcasts of 2026-10-20 and kept outside the copied code** (`wxExpected`, merged by `readAll`):

| Grammar | Where it appears | Why the shared reader misses it |
|---|---|---|
| `EXPECT ILS APPROACH TO RWY 36R` | KCVG's live arrival half, and every KCVG arrival vATIS preset | no `IN USE` after the approach word, and `EXPECT` is not a landing marker |
| `VISUAL APCH RWY 17L AND 17R.` followed by `SIMUL APCHS IN USE.` | KSDF's live broadcast | the runways are in one sentence and the `IN USE` in the next, so the first is neither landing nor departing |

Both fail **safe** in the shared reader (no runway read, and it says so), but a broadcast that reads as nothing can never set the flow. Each addition refuses any sentence the closures guard refuses, so `ILS RWY 5L APCH OTS` and `TWY D BTWN APCH END RWY 17L AND TWY D7 CLSD` add nothing, and merges only into the landing set.

**The vATIS profile marks a spoken runway with a leading caret** (`RWY 17L AND ^17R`), which breaks the runway list; `readAll` removes carets before reading. SDF's two parallel-runway vATIS presets carry it.

**The same changes belong in the shared reader and have not been made there.** Touching the other decks crosses the ARTCC boundary, so it is an issue, not a drive-by.

## 3. The contract

```js
window.DATIS_FACILITY = {
  id: 'IND', ns: 'IND', prefix: 'indw', sectionClass: 'ind-section',
  fields: [{id: 'KIND', name: 'Indianapolis Intl', datis: true}],
  before: 'indb-frame',                  // id of the section this goes ahead of
  configs: function(){ return NS.CONFIGS; },   // [{id, name, land:[], dep:[]}]
  // optional
  apply: function(set){...},             // {config, wdir, wkt, cat}: only what the broadcast settled
  load:  function(){...},  save: function(x){...},   // {field, text}
  rails: function(section){...},  log: function(msg, kind){...}
};
```

In the ZID decks `apply` calls the builder's `setFrame`, and `load`/`save` keep the pasted text in the builder's own state under `wx`, so there is still **one storage key** per tool. The builder gained a frame API for this and for the route-draw block: `config()`, `setFrame(set)`, `save()` and `onFrame(fn)`. `setFrame` touches only the keys given, refuses an unknown configuration or category, and brings the controls into line with the state.

Exports: `NS.datis` and `window[prefix]` carry `read` (pure), `match` (pure), `settled`, `shared` (the unmodified reader), `expected`, `state`, `doRead`, `doFetch`, and the other reader functions.

## 4. The one network call

The fetch button asks `https://atis.info/api/<ICAO>`. It is **optional by construction**: never on a path the tool needs, every failure hands straight to the paste box, and the parser it feeds is the same one paste uses. That is the test root `CLAUDE.md` invariant 6 sets for any network idea. **There is no second call**: no METAR fallback (the older reader's `api.weather.gov` branch is deliberately not carried), no second host.

`atis.info` answers with `access-control-allow-origin: *` (checked 2026-10-20), so the button works from the Pages site; from `file://` the server may refuse it and the paste box is the path. A split broadcast (KCVG's arrival and departure halves) comes back as two records and is joined with a blank line, which is what the reader expects.

## 5. Which ZID fields publish one

Pulled 2026-10-20 from `datis.clowd.io/api/all` (which redirects to `atis.info`): **KIND (combined), KSDF (combined), KCVG (split arrival and departure)**, and also KCMH and KCLE, which no ZID deck works. No other field any of the three decks works has a D-ATIS, so each deck's reader has the one field. The three live broadcasts, verbatim, are the fixtures in each smoke test. Detail in `claude_DATIS_Field_Survey.md` section 10.

## 6. Verified, 2026-10-20

- **Smoke tests, through the browser runner:** IND 248, SDF 262, CVG 340 checks, all passing. The D-ATIS and flow assertions are 30, 28 and 51 of those. Every vATIS preset each deck carries is read back and must equal the runways it names.
- **Mutants:** a deck with the trim disabled fails *every runway transition drawn serves a runway the configuration lands*; a CVG deck with the `EXPECT` grammar disabled fails *the live broadcast reads the runways in use*. Both fail at the intended assertion.
- **The live fetch, driven on the page:** the IND button returned the KIND broadcast, set configuration `23`, wind calm and VFR, and saved the text under `wx`.
- **Not verified:** a fetch from the Pages origin (the header is correct; the button was driven from a local server). The look of the section.
