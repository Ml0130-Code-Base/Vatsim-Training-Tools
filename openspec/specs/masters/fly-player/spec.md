# masters/fly-player Specification

## Purpose

The master fly block (`fly-block.html`) is the *Fly it* player every deck but M98 and ZMP Center
carries. It runs a clock, flies each strip along what CIFP publishes for it, reads the trainee's
transmissions and fires scheduled notices, and it grades nothing. Narrative and history:
`claude_Fly_Block_Reference.md`.

## Requirements

### Requirement: A strip flies the track its procedure publishes
An arrival SHALL fly its STAR and a departure its SID, along the coordinates in the deck's own procedure table, in order, read from the deck's namespace and never copied into the block. An overflight SHALL fly the straight line between the entry and exit radial-and-distance its strip gives.

#### Scenario: Every published procedure builds its track or says why not
- **WHEN** the player builds the track for each procedure the deck carries
- **THEN** each is built from the procedure table's own coordinates in order, or refused with a reason
- **PROOF** ZID harnesses: "at least one STAR and one SID builds a track, so the player has something to fly"

#### Scenario: An overflight
- **WHEN** an overflight strip gives an entry and an exit radial and distance
- **THEN** it flies the straight line between those two points, at that line's length
- **PROOF** ZID harnesses: "an overflight flies the straight line between its two radial-and-distance points"

#### Scenario: An overflight with a box empty
- **WHEN** an overflight strip leaves an entry or exit box empty
- **THEN** the strip is refused by name, not flown from a guess
- **PROOF** ZID harnesses: "an overflight with a box empty is refused by name, not flown from a guess"

### Requirement: An aircraft follows the published profile until told otherwise
An arrival SHALL descend via the published altitudes and fly the published speeds. A departure SHALL climb to the highest published floor ahead of it, or to the cleared altitude the drill gave it, and hold there. An assigned altitude or speed SHALL replace the published one. A heading SHALL take the aircraft off its published track.

#### Scenario: An untouched drill meets what is published
- **WHEN** a generated drill is flown with no transmission from the trainee
- **THEN** no aircraft misses a published crossing restriction or speed limit
- **PROOF** ZID harnesses: "an untouched generated drill never misses a published crossing or speed limit" (eight seeds, 2,400 simulated seconds each)

#### Scenario: A heading
- **WHEN** the trainee assigns a heading to an aircraft on its published track
- **THEN** it leaves the track and flies the heading
- **PROOF** ZID harnesses: "a heading takes the aircraft off its published track"

### Requirement: What the engine does not fly is refused or stated
A procedure with fewer than two coordinates for the runway and transition chosen SHALL be refused, strip by strip, with the reason. The feed SHALL say that the player flies straight between fixes with no arcs, holds, procedure turns, wind or approach intercept, and that a cleared approach is read back and handed to the tower.

#### Scenario: A drill the engine cannot fly
- **WHEN** a drill containing a strip with no flyable track is loaded
- **THEN** the drill is refused, and the reason is given for that strip
- **PROOF** ZID harnesses: "a drill the engine cannot fly is refused by strip, not loaded"

### Requirement: A vector departure flies a stated stand-in
A departure coded only as vector legs has no fix. It SHALL fly a straight stand-in line from its field to a charted fix on that field's published procedures, never one inside the block's minimum distance from the field. The feed SHALL say the line is a stand-in and that the fix a real route uses is not published. A deck with no coordinate for the field SHALL refuse the strip by name.

#### Scenario: A vector SID at a deck that carries its field coordinate
- **WHEN** a strip departs on a vector-only SID
- **THEN** it flies the stand-in line to the fix the strip names, and the feed says it is a stand-in
- **PROOF** checked by driving the page (2026-10-27/28, S56 and Big Sky, issue #76)

### Requirement: The transmit box reads a whole transmission
The transmit box SHALL take several instructions in one transmission, addressed by callsign: altitude, speed, heading, direct, expect runway, descend via, a cleared approach (read back only), squawk, radar contact, ident and contact. Spoken digits SHALL be read as the number they say. A bare maintain far from the aircraft's altitude SHALL be queried, not taken.

#### Scenario: Altitude and speed together
- **WHEN** one transmission assigns an altitude and a speed
- **THEN** both are taken, and the altitude is not cut short into the speed
- **PROOF** ZID harnesses: "altitude and speed in one transmission are both taken, and the altitude is not cut short into a speed"

#### Scenario: An altitude as the strip writes it
- **WHEN** an altitude is given in hundreds, as a flight level, or with commas, or is 0
- **THEN** it is read as the strip box reads it, with 0 meaning none
- **PROOF** ZID harnesses: "an altitude is read the way the strip box says it: hundreds under 1,000, FL, commas, and 0 is none"

#### Scenario: A bare maintain far off
- **WHEN** the trainee says only maintain, with an altitude far from the aircraft's own
- **THEN** the aircraft queries it and does not take it
- **PROOF** ZID harnesses: "a bare maintain far from the current altitude is queried, not taken"

### Requirement: A frequency change goes only where a position is
A contact instruction SHALL hand the aircraft to an open position named by its own frequency. It SHALL be refused, saying why, when the frequency is the position the trainee is working or one no position in the deck is on. Whether the receiver was the right one is not graded.

#### Scenario: Three contact instructions
- **WHEN** the trainee sends an aircraft to the position they are working, to an open position's frequency, and to a frequency no position is on
- **THEN** the first and third are refused with the reason, and the second hands the aircraft off
- **PROOF** ZID harnesses: "a switch to the position you are working is refused", "a switch to an open position by its own frequency hands the aircraft off" and "a frequency no position in the deck is on is refused and says so"

### Requirement: Scheduled events fire once, saying only what the author typed
A special observation and a landline call SHALL each fire once into the feed when the player's own clock reaches its time, so a paused drill fires nothing. Each SHALL carry only the fields its author typed, and an event that says nothing SHALL be left out and named. A special observation that changes the configuration SHALL say the player does not re-plan strips already flying.

#### Scenario: Events in a loaded drill
- **WHEN** a drill with several events, some empty, is loaded and its clock runs past their times
- **THEN** the empty ones are named as left out, and each other event fires once, at its time, with exactly its author's text
- **PROOF** ZID harnesses: "a drill with events loads, and says plainly which events it left out", "a special observation fires when the clock reaches it, carrying exactly what the author typed", "a landline call fires when the clock reaches it, from the side the author named, saying what the author typed" and "each event fires once and only once"

#### Scenario: A configuration change mid-drill
- **WHEN** a special observation names a new configuration
- **THEN** the feed states the configuration and says strips already flying are not re-planned
- **PROOF** ZID harnesses: "a special observation that changes the configuration says the player does not re-plan strips already flying"

### Requirement: The preview is the live scope's geometry
The preview SHALL draw one start position per flyable strip with the live scope's own drawing, with nothing clickable, and SHALL name each strip it cannot draw. It SHALL leave a loaded drill and its feed untouched. The scope origin and outline SHALL be worked out again for each drill load and each preview, and a preview SHALL NOT move them while a drill is flying.

#### Scenario: Previewing a list of strips
- **WHEN** the preview is asked for a list containing flyable and unflyable strips
- **THEN** it draws one target per flyable strip, names the others, and the loaded drill is unchanged
- **PROOF** ZID harnesses: "the preview draws one target per flyable strip and names each strip it cannot draw", "the preview is the live scope's own svg, relabelled, with nothing clickable in it" and "drawing the preview leaves the loaded drill and its feed alone"

#### Scenario: A deck that moves its reference point between drills
- **WHEN** a second drill is loaded or previewed after the deck moves its reference point (Big Sky changing area)
- **THEN** the second is drawn against its own origin and outline, and a preview made while a drill flies leaves the flying drill's alone
- **PROOF** unverified (fixed in `22fa846`; no harness check and no recorded drive)

#### Scenario: No strips
- **WHEN** the preview is asked for an empty list
- **THEN** it draws nothing and says so
- **PROOF** ZID harnesses: "with no strips there is nothing to draw and the preview says so"

### Requirement: Nothing is graded against a standing item
The player SHALL score nothing against a standing item and SHALL leave `STANDING` empty. The debrief SHALL say so in words, and any check weaker than it looks SHALL be labelled a reminder, not a judgement.

#### Scenario: The debrief
- **WHEN** a drill ends
- **THEN** the debrief states that nothing was scored against a standing item
- **PROOF** ZID harnesses: "the debrief states that nothing is scored against a standing item" and "no standing item exists for the fly block to score against"

### Requirement: The player makes no network call
The block SHALL contain no network call of any kind, so a deck's one optional fetch stays its only one.

#### Scenario: Reading the block
- **WHEN** the block's source is searched for a network call
- **THEN** none is found
- **PROOF** ZID harnesses: "blocks 7 and 8 carry no network call - the D-ATIS fetch stays the only one"

### Requirement: A missing hook leaves the feature out
Where a deck's fly contract omits an optional hook, the player SHALL leave out the feature that hook would answer, and never guess it. With no tower hook there is no contact-tower button, and the tower can be addressed only by a frequency the deck lists. With no outline none is drawn. A published crossing SHALL be quoted with the cycle the contract names.

#### Scenario: A deck with no tower data
- **WHEN** a deck's fly contract has no tower hook
- **THEN** the player offers no contact-tower button
- **PROOF** unverified
