# Spec Delta

## Purpose

The master D-ATIS block (`datis-block.html`) reads a pasted or fetched D-ATIS, matches the runways in
use against the deck's own configuration table, and sets the frame only when exactly one
configuration fits. Today the three ZID decks carry it; the other decks carry the older shared
reader, which sets no frame (issue #62). Narrative and history: `claude_DATIS_Block_Reference.md`
and `claude_DATIS_Field_Survey.md`.

## ADDED Requirements

### Requirement: The broadcast is read by its grammar
The reader SHALL read the information letter, wind, visibility, ceiling, altimeter, the runways landing and departing, the approach advertised to each, and the closures. A runway SHALL come only from a runway keyword or an approach clause. A sentence naming a runway as shut, out of service or unusable SHALL contribute nothing to the flow.

#### Scenario: A live broadcast
- **WHEN** the deck's recorded live broadcast is read
- **THEN** the runways in use and the information letter are read correctly
- **PROOF** ZID harnesses: "the live broadcast reads the runways in use" and "the live broadcast reads the information letter"

#### Scenario: Every vATIS preset the deck carries
- **WHEN** each vATIS preset the deck carries is read
- **THEN** it reads back as the runways it names
- **PROOF** ZID harnesses: "the deck carries vATIS presets to test against", and one "vATIS <station> <preset> reads back as the runways it names" check per preset

### Requirement: The two landing grammars the shared reader misses are read
The reader SHALL read an expect-approach clause, and an approach clause whose in-use statement comes in the next sentence, as landing runways. Each addition SHALL refuse any sentence the closures guard refuses, and SHALL merge only into the landing set. A leading caret on a runway SHALL be removed before reading.

#### Scenario: An expect-approach broadcast
- **WHEN** a broadcast states its landing runways only through an expect-approach clause
- **THEN** those runways are read as landing
- **PROOF** a mutant with the expect grammar disabled fails "the live broadcast reads the runways in use" at CVG (2026-10-20)

#### Scenario: A caret-marked preset
- **WHEN** a vATIS preset marks a spoken runway with a leading caret
- **THEN** the runway is read without the caret
- **PROOF** ZID harnesses: the per-preset "vATIS <station> <preset> reads back as the runways it names" checks at SDF

### Requirement: The match has four outcomes and never picks out of several
A configuration SHALL fit when every advertised landing runway is among those it lands, and every advertised departure runway among those it departs. The outcome SHALL be `one`, `many`, `none` or `nothing`. Only `one` sets anything. `many` names the candidates and sets nothing, and `none` and `nothing` set nothing and say so.

#### Scenario: Exactly one fits
- **WHEN** the live broadcast is matched against the deck's configurations
- **THEN** exactly one fits, and it is the right one
- **PROOF** ZID harnesses: "exactly one configuration fits, and it is the right one"

#### Scenario: No configuration lands these runways
- **WHEN** a broadcast advertises a runway no configuration lands
- **THEN** the outcome is none and nothing is applied
- **PROOF** ZID harnesses: "a runway no configuration lands matches none, and none is applied"

#### Scenario: Nothing to read
- **WHEN** the box is empty, or the broadcast advertises no runway
- **THEN** the outcome is nothing
- **PROOF** ZID harnesses: "an empty box reads as nothing and a broadcast with no runway matches nothing"

#### Scenario: Several fit
- **WHEN** more than one configuration fits the advertised runways
- **THEN** they are named, nothing is set, and the trainee picks
- **PROOF** unverified

### Requirement: Departures the broadcast does not state are not assumed
A broadcast that names no departure runway SHALL be matched on its landing runways alone, and the page SHALL say so.

#### Scenario: A combined broadcast naming only the approach
- **WHEN** a broadcast names landing runways and no departure runway
- **THEN** it matches on the landing runways alone, and the page says departures were not stated
- **PROOF** unverified

### Requirement: The frame takes only what the broadcast settled
Applying a read SHALL set the configuration only when exactly one fits. It sets the wind and flight category from what was read, with a calm wind setting zero. The frame setter SHALL touch only the keys it is given, and SHALL refuse an unknown configuration or an unknown category.

#### Scenario: What a read settles
- **WHEN** a broadcast is applied
- **THEN** a calm wind sets zero, and a configuration is set only when exactly one fits
- **PROOF** ZID harnesses: "what the broadcast settled: a calm wind sets zero, a configuration only when exactly one fits"

#### Scenario: The frame setter
- **WHEN** the frame setter is given a known configuration, wind and category, and then an unknown configuration and an unknown category
- **THEN** the first is applied and whoever follows the frame is told, and the unknown values are refused
- **PROOF** ZID harnesses: "setFrame sets the configuration, wind and category, and tells whoever follows the frame" and "setFrame refuses an unknown configuration and an unknown category"

### Requirement: Closures are shown and never reach the flow
A runway or item named closed SHALL be shown and never contribute to the flow. A runway advertised in use and also named closed SHALL be stated as a contradiction.

#### Scenario: A broadcast with closures
- **WHEN** a broadcast names a closed runway
- **THEN** the closure is shown, and the runway is not in the flow
- **PROOF** ZID harnesses: "closed runways are shown and never reach the flow"

### Requirement: A saved broadcast is shown, never applied on load
A broadcast saved from an earlier session SHALL be shown when the page loads and SHALL NOT be applied, because the frame may have been changed by hand since. Only reading what is pasted and fetching apply. The saved text SHALL live in the deck's builder state, under its one storage key.

#### Scenario: Reloading with a saved broadcast
- **WHEN** the page loads with a saved broadcast and a frame set by hand
- **THEN** the broadcast is shown, and the frame is unchanged
- **PROOF** unverified

### Requirement: The fetch is the one optional network call
The reader SHALL make at most one network call, the D-ATIS fetch, to one host. It is never on a path the tool needs, and every failure hands straight to the paste box, which feeds the same parser. There SHALL be no second call: no METAR fallback and no second host. A split broadcast returned as two records SHALL be joined before reading.

#### Scenario: The fetch from a page that may not reach the host
- **WHEN** the fetch fails or is refused
- **THEN** the page offers the paste box, and the tool works without it
- **PROOF** checked by driving the page (2026-10-20, IND fetch from a local server). A fetch from the Pages origin is unverified.

#### Scenario: The deck's blocks beside the reader
- **WHEN** the deck's other master blocks are searched for a network call
- **THEN** none is found, so the D-ATIS fetch is the only one
- **PROOF** ZID harnesses: "blocks 7 and 8 carry no network call - the D-ATIS fetch stays the only one"
