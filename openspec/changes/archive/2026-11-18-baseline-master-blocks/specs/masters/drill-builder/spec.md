# Spec Delta

## Purpose

The master drill block (`drill-block.html`) is the *Set up a drill* builder every deck but M98 and
ZMP Center carries. It has a seeded generator whose drills are legal and flyable, the panels that
frame and schedule a drill, and saved drills kept apart from the trainee's notes. Narrative and
history: `claude_Fly_Block_Reference.md` section 4.

## ADDED Requirements

### Requirement: The Set up page has M98's anatomy, by name and in order
The builder SHALL mount, under the position: Generate, Edit, Special observation, Landline events and Brief, in that order. Then come the strips, which belong to the strip block. Then Start positions, Flown on, the save buttons, Saved drills, JSON export and import, and a notice when storage is unavailable. It SHALL never draw a strip row itself.

#### Scenario: The panels by name
- **WHEN** a deck carrying the block renders *Set up a drill*
- **THEN** the Special observation, Landline events, Brief and Start positions panels are present by name
- **PROOF** ZID harnesses: "the drill builder carries M98's sub-panels by name: Special observation, Landline events, Brief, Start positions"

### Requirement: Every generated drill is legal and can be flown
Every procedure, runway and transition the generator picks SHALL be one the deck carries and the strip block accepts at that field. Every generated drill SHALL load in the player. Starting altitudes, cleared altitudes, speeds, flight numbers, types and the check-in stagger are drill choices the trainee can edit, not aviation data.

#### Scenario: A generated drill
- **WHEN** the generator builds a drill for the deck
- **THEN** every strip passes the strip check, and the player loads the drill
- **PROOF** ZID harnesses: "every generated strip is legal for this facility and every generated drill can be flown"

### Requirement: The same seed builds the same drill
The generator SHALL be deterministic in its seed, which is shown in the seed box. The same seed builds the same drill, and a different seed a different one.

#### Scenario: Two seeds
- **WHEN** the generator runs twice with one seed and once with another
- **THEN** the first two drills are identical and the third differs
- **PROOF** ZID harnesses: "the same seed builds the same drill" and "a different seed builds a different drill"

### Requirement: A kind with no procedure anywhere is drawn as an overflight
In a mixed draw, a kind for which the deck has no procedure at any field SHALL be drawn as an overflight. The draw consumes the same random numbers either way, so a deck with both kinds builds the same drill it always did.

#### Scenario: A deck with no SID or STAR at any field
- **WHEN** a mixed drill is generated at a deck whose fields code no procedure
- **THEN** every strip is an overflight, and the drill has the count asked for
- **PROOF** checked by driving the page (2026-10-27, AZO)

### Requirement: A generated aircraft can meet its own published profile
A generated arrival SHALL start between the generator's distance bounds from the end of its track. It SHALL never start below the next published floor ahead, and never so high that it cannot make the lowest ceiling ahead at a descent gradient it can fly. A departure SHALL be generated only where it can reach the highest published floor ahead, or else be swapped to a type that can, or skipped.

#### Scenario: Starting altitudes against the ladder
- **WHEN** an arrival is generated
- **THEN** its starting altitude lies inside what its published ladder allows from that point
- **PROOF** contradicted: open issue #79 reports the generator can start an arrival below its own published ladder. The related check, "an untouched generated drill never misses a published crossing or speed limit", passes on the seeds it runs.

### Requirement: A callsign at a field comes only from that field's cited operators
Where the drill contract lists operators for a field, a callsign there SHALL be drawn only from the operators that fly it, with equal chance per brand. What the source names but cannot fly, and what it does not hold, SHALL be printed. A field with no entry keeps the flat carrier list, and the Generate panel says so field by field. Equal chance is not a claim about traffic.

#### Scenario: A field with operators and one without
- **WHEN** a drill is generated across a field with an operators entry and a field without one
- **THEN** the first field's callsigns come only from its list, and the disclosure names the second field as using the flat list
- **PROOF** unverified

### Requirement: A strip's transition is chosen, or takes a stated default
The Flown on panel SHALL offer each strip's transition, and each departure's cleared altitude. A strip with no transition chosen SHALL take a default: the transition that holds the fix an arrival is running to, otherwise the first alphabetically. The default is not a statement about what the facility assigns.

#### Scenario: An arrival with no transition chosen
- **WHEN** an arrival names the fix it is running to and has no transition chosen
- **THEN** it flies the transition that holds that fix, or none when the fix is in the common route
- **PROOF** unverified (no warning on the strip names the defaulted case; `claude_Fly_Block_Reference.md` section 4)

### Requirement: Saved drills keep their own storage key
Saved drills SHALL be stored under the deck's `<basename>-fly-v1` key, never under the key that holds the trainee's notes and practice log, and no key carries a status word. Where storage is unavailable the builder SHALL work in memory and say so on the page. JSON export and import SHALL remain the backup.

#### Scenario: The drill contract's key
- **WHEN** the deck's drill contract is read
- **THEN** it names this facility and a storage key different from the builder's, with no status word in it
- **PROOF** ZID harnesses: "the drill contract names this facility and its own storage key, never the builder's"

### Requirement: Event panels schedule only what the author wrote
A drill nobody edited SHALL schedule no event. The configurations a special observation may switch to SHALL be the deck's own list, and with that list empty none is offered.

#### Scenario: An untouched drill
- **WHEN** a drill is saved with no event panel edited
- **THEN** it carries no event
- **PROOF** ZID harnesses: "a drill nobody edited schedules no event"

#### Scenario: The configurations offered
- **WHEN** the Special observation panel lists configurations
- **THEN** they are the deck's own, by id and name
- **PROOF** ZID harnesses: "the drill contract hands the builder this deck's own configurations, by id and name"

### Requirement: The builder names no standing item
With `STANDING` empty, the builder SHALL NOT build M98's panel naming the standing items a controller needs work on, and no event text SHALL claim one.

#### Scenario: Event text
- **WHEN** a drill's events are scheduled
- **THEN** `STANDING` is still empty, and no event text names a standing item
- **PROOF** ZID harnesses: "no event is graded: STANDING is still empty and no event text claims a standing item"
