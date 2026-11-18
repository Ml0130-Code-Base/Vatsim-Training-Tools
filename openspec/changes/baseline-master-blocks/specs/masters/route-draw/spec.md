# Spec Delta

## Purpose

The master route-draw block (`routedraw-block.html`) puts M98's *Routes drawn* layer bar on a deck's
plot and draws the SIDs and STARs the deck's procedures block carries, trimmed to the flow in
force. It adds no data of its own. Today the three ZID decks carry it. Narrative and history:
`claude_RouteDraw_Block_Reference.md`.

## ADDED Requirements

### Requirement: The layer modes are M98's, by id and in order
The bar SHALL offer five modes with M98's ids in M98's order: `tracked`, `stars`, `sids`, `both`, `off`. `tracked` SHALL be the default. Its label SHALL name the open procedure rather than tracked traffic, because the plot it sits on carries no traffic. Setting an unknown mode SHALL be ignored.

#### Scenario: The bar on load
- **WHEN** the deck's plot mounts
- **THEN** the five modes are present in M98's order, and the open-procedure mode is on
- **PROOF** ZID harnesses: "the layer modes are the M98 ones, by id and in order" and "the default mode is tracked, and its label does not claim traffic this deck does not have"

#### Scenario: An unknown mode
- **WHEN** a mode that does not exist is set
- **THEN** the drawing is unchanged
- **PROOF** ZID harnesses: "setting a mode takes effect, and a mode that does not exist is ignored"

### Requirement: Each mode draws exactly its set
Off SHALL draw nothing, including the open procedure. All STARs SHALL draw STARs and no SID, all SIDs the reverse, and both exactly the two sets. The open-procedure mode SHALL draw only the procedure open in the viewer, in its order and with no fix added. The open procedure SHALL be drawn in every mode except off.

#### Scenario: Each mode in turn
- **WHEN** each of the five modes is set
- **THEN** each draws its set and nothing else, and the open procedure appears in all but off
- **PROOF** ZID harnesses: "off draws nothing at all, the open procedure included", "all STARs draws STARs and no SID", "all SIDs draws SIDs and no STAR", "both draws exactly the two sets", "the open procedure is drawn in every mode but off, as M98 never hides the track under what you are working" and "the open track is the viewer's own track, in order, and no fix is added to it"

### Requirement: Routes are drawn from the deck's own coordinates and projection
Every drawn point SHALL be a fix at the coordinates in the deck's procedure table, placed through the projection the deck exposes. The block keeps no projection of its own. A run of fixes shared by several fields SHALL be drawn once. A vector leg SHALL end a line. A fix with no coordinate SHALL be skipped and counted, never placed.

#### Scenario: The drawn plan
- **WHEN** both sets are drawn
- **THEN** every run has two or more points inside the facility's region, and no two tracks are the same run of fixes
- **PROOF** ZID harnesses: "every drawn run has two or more points, each in the ZID region" and "no two tracks are the same run of fixes (a procedure at several fields is drawn once)"

#### Scenario: The projection
- **WHEN** the deck's outline is placed through the projection the deck exposes
- **THEN** every outline vertex falls inside the plot
- **PROOF** ZID harnesses: "the deck exposes its plot projection and the viewer exposes its selection" and "the projection puts every footprint vertex inside its own plot"

### Requirement: The plot widens for what is drawn and says what it cuts
While anything is drawn, the plot SHALL widen to take in what lies within the contract's reach of the outline. A track that runs further SHALL be cut at the edge, and the page SHALL say how many were cut. Off SHALL restore the original view.

#### Scenario: Drawing and clearing
- **WHEN** a mode that draws is set, and then off
- **THEN** the plot widens by the stated reach, names how many tracks were cut, and returns to its original view
- **PROOF** checked by driving the page (2026-10-20, IND, SDF, CVG)

### Requirement: Runway transitions are trimmed to the flow in force
At the primary field, a STAR SHALL be drawn only with the runway transitions that land a runway in use, and a SID only with those that depart one. A procedure with no runway transition SHALL be drawn in every flow and counted. Other fields SHALL be drawn untrimmed and named. With no flow set, nothing is trimmed and the page says so. The trim SHALL be switchable off.

#### Scenario: Each configuration
- **WHEN** each configuration the deck carries is set as the flow
- **THEN** every runway transition drawn at the primary field serves a runway that configuration lands (STAR) or departs (SID)
- **PROOF** ZID harnesses: "<configuration>: every runway transition drawn at <field> serves a runway the configuration lands (STAR) or departs (SID)", one check per configuration; a mutant with the trim disabled fails it (2026-10-20)

#### Scenario: Trim off, and satellites
- **WHEN** the trim is switched off, and when fields other than the primary are drawn
- **THEN** every runway transition is drawn, and the other fields are untrimmed and named in the plan
- **PROOF** ZID harnesses: "turning the trim off draws every runway transition, and more than the trimmed plan", "the trim is back on" and "fields other than the primary are not trimmed, and the plan says which"

#### Scenario: The open procedure on a runway out of use
- **WHEN** the open procedure's runway transition is for a runway not in use
- **THEN** it is drawn as chosen and flagged
- **PROOF** unverified

### Requirement: The block carries no facility's own geometry
Anything one facility's agreement adds to the plot, such as a release ring, SHALL come through the contract's extras hook and never from the block. With no contract or no procedures block, the block SHALL do nothing and say nothing.

#### Scenario: A deck with no procedures block
- **WHEN** the block runs in a deck with no route-draw contract or no procedures block
- **THEN** no bar is mounted and nothing is drawn
- **PROOF** unverified

### Requirement: The layer choice is not stored
The mode SHALL be a view toggle that is not persisted, so the deck keeps one storage key for its builder state. The plot SHALL open on the open-procedure mode every time.

#### Scenario: Reloading the page
- **WHEN** a mode other than the default is set and the page is reloaded
- **THEN** the plot opens on the open-procedure mode
- **PROOF** unverified
