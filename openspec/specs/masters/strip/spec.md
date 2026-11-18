# masters/strip Specification

## Purpose

The master strip block (`strip-block.html`) renders the flight-strip row every carrying deck writes,
and makes a strip that names a field, procedure or runway the facility does not have unbuildable,
or refused by name. Narrative and history: `claude_Strip_Block_Reference.md`.

## Requirements

### Requirement: Only the facility's own fields are offered
The airport control SHALL offer the fields listed in the deck's strip contract and no other, so a strip naming a field another facility works cannot be built from the row at all.

#### Scenario: The airport list is the contract's list
- **WHEN** a deck carrying the block renders a strip
- **THEN** the airport control offers exactly the fields in the deck's strip contract
- **PROOF** ZID harnesses: "the strip airports are exactly the fields this facility works"

### Requirement: A procedure is offered only where it is declared valid
An arrival SHALL be offered at a field only if the contract lists that field among the fields it serves, and a departure only if the contract lists the field among those it leaves. A procedure may be valid at several fields. A procedure with an empty list SHALL be offered nowhere. No list defaults to every field.

#### Scenario: Membership decides the offer
- **GIVEN** an arrival whose contract entry lists two of the facility's fields
- **WHEN** the strip lands at either of them
- **THEN** that arrival is offered, and at a field not in its list it is not
- **PROOF** checked by driving the page (2026-09-06 two-facility harness, re-driven 2026-09-07 in the five decks then carrying the block)

#### Scenario: An empty list offers nothing
- **WHEN** a procedure's contract entry lists no field
- **THEN** no strip at any field offers it
- **PROOF** unverified

### Requirement: A wrong combination is refused by name, with what would have been valid
The strip check SHALL refuse a strip that lands at a field the facility does not work, names a procedure that is not the facility's, flies its own procedure at a field it does not serve or leave, or assigns a runway the field does not have. Each refusal names the facility, the field and the procedure involved, and says what would have been valid instead.

#### Scenario: A stored strip from another facility
- **WHEN** a stored or pasted strip names a field the facility does not work
- **THEN** the check refuses it by name and lists the fields the facility does work
- **PROOF** ZID harnesses: "a stored strip is checked: a foreign field is refused by name"

#### Scenario: A foreign procedure, a wrong field, a wrong origin, a missing runway
- **WHEN** a strip names another facility's procedure, an arrival at a field it does not serve, a departure from a field it does not leave, or a runway the field lacks
- **THEN** each is refused with a message naming what was wrong and what the facility offers there
- **PROOF** checked by driving the page (2026-09-06 two-facility harness)

#### Scenario: A legal strip
- **WHEN** every part of a strip is valid for the facility
- **THEN** the check returns no error
- **PROOF** checked by driving the page (2026-09-06 two-facility harness)

### Requirement: An unknown runway inventory is stated, not invented
Where the contract carries no runway inventory for a field, the runway control SHALL say that the inventory is not held for that field, instead of rendering an empty control or offering runways.

#### Scenario: A field with no inventory
- **WHEN** a strip selects a field whose contract entry carries no runway list
- **THEN** the row states that there is no runway inventory for that field
- **PROOF** checked by driving the page (2026-09-06; 2026-09-07 at AZO, where the runway control reads "not issued")

### Requirement: The procedure list follows the field
Every control the block renders SHALL call the deck's re-render function when it changes, so a list that depends on another control is rebuilt when that control changes. A procedure the new field cannot carry SHALL be re-placed, and the move SHALL be returned to the mount and printed under the check line.

#### Scenario: Changing the landing field
- **GIVEN** a strip landing at one field with that field's arrival selected
- **WHEN** a real change event moves the landing field to another of the facility's fields
- **THEN** the arrival list holds only the new field's arrivals, the old selection is re-placed, and the move is printed
- **PROOF** checked by driving the page (2026-09-07, real change events in all five decks then carrying the block)

#### Scenario: A field with no coded procedure
- **WHEN** the field changes to one with no procedure of that kind
- **THEN** the row states that the field has none, instead of rendering an empty control
- **PROOF** checked by driving the page (2026-09-07)

### Requirement: The row's model matches what its controls show
When nothing is selected, the block SHALL adopt the procedure the control displays first, and SHALL NOT report that as a move. Every option SHALL carry an explicit value, so decoration on its label never becomes part of the key read back.

#### Scenario: Nothing selected yet
- **WHEN** a strip is rendered with no procedure set
- **THEN** the model holds the procedure the control shows, and no move is reported
- **PROOF** unverified

### Requirement: The row carries the national fields with their legal states
The row SHALL carry the job, callsign, type, flight rules, radar service, wake class, altitude, speed, published-or-Center-advised speed, check-in time, already-on-frequency, altimeter-given and route fields. Radar service SHALL offer only the states the job and flight rules allow. A type missing from the wake table SHALL read as weight unverified, never guessed. The Center-advised speed box SHALL be disabled under published.

#### Scenario: Radar service follows the flight rules
- **WHEN** an arrival is set to IFR, and then to VFR
- **THEN** radar service offers only the IFR states, and then only the VFR states
- **PROOF** checked by driving the page (2026-09-07, all five decks then carrying the block)

#### Scenario: A type with no weight entry
- **WHEN** a strip names a type not in the wake table
- **THEN** wake class reads weight unverified
- **PROOF** checked by driving the page (2026-09-07)

#### Scenario: Published speeds
- **WHEN** the speed source is set to published
- **THEN** the Center-advised box is disabled, and it is enabled under Center advised
- **PROOF** checked by driving the page (2026-09-07)

### Requirement: A hook a deck cannot answer falls back without inventing
Each optional contract hook SHALL have a stated fallback that claims nothing. Without a spoken-callsign hook the header prints the bare callsign. Without a handoff hook every job gets a plain input and no identifier is derived. Without a fixes hook the row asks for a bare distance to go. Without a route-text hook the fill-from-the-procedure button is not offered.

#### Scenario: A deck with no procedure ladder
- **WHEN** a deck supplies no fixes hook and no route-text hook
- **THEN** the row asks for a bare distance and offers no fill-from-the-procedure button
- **PROOF** checked by driving the page (2026-09-07 at AZO and S56)

### Requirement: The fix list covers every transition of the procedure
The fixes hook SHALL return every fix on the procedure, whichever transition it lies on, because some procedures carry nothing in their common segment. A procedure made only of vector legs SHALL report no fix, and the row then asks for a bare distance.

#### Scenario: A procedure whose fixes are all on one transition
- **WHEN** a strip names a procedure with an empty common segment
- **THEN** the fix picker offers that procedure's transition fixes
- **PROOF** unverified

### Requirement: A drill holds at most fifty strips
The block SHALL refuse to add a strip when the drill already holds fifty, with a note above the rows that names the limit and why. Removing a strip SHALL clear the note. Fifty is the owner's design ceiling (2026-10-27), not a facility fact.

#### Scenario: Adding past the ceiling
- **WHEN** a deck's add is called sixty times
- **THEN** exactly fifty strips exist and one note says the drill is full
- **PROOF** ZID harnesses: "the strip block carries the 50-strip ceiling and says it is full at 50, not at 49" and "sixty adds leave exactly fifty strips: the 51st is refused"

#### Scenario: Making room
- **WHEN** a strip is dropped from a full drill
- **THEN** the note clears and one more strip can be added
- **PROOF** ZID harnesses: "a drop makes room again"

### Requirement: The block neither flies nor grades
The strip block SHALL only render the row, read it back and answer whether the combination is legal for the facility. Flying and grading belong to other blocks.

#### Scenario: A deck with no traffic model
- **WHEN** the block runs in a deck that carries no player
- **THEN** it still renders and checks a correct strip, and no aircraft moves
- **PROOF** unverified
