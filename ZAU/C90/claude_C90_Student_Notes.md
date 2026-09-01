# C90 Student Notes

Where notes taken in the tool land when they are folded back into the reference set. Empty on
purpose — the first entry should be a real one.

## How a note gets here

Every panel, table and data slot in `c90-drill-deck.html` carries a `data-note` anchor and a
**+ student note** button. A note is stored against that anchor in `localStorage` under
`c90-drill-deck-v1` and survives reload. On the **Notes and map** page, *Copy as Markdown*
exports every note grouped by anchor, with the anchor as an `##` heading and — where the
anchor is a data slot — that slot's state and source document printed underneath:

```markdown
## capture

- **correction** (2026-09-04 19:40) The 4-4 table says at or above 5,000 for the south
  runway, not 5,000 exactly. Instructor confirmed on session 3.

## slot.routes

Slot state: empty. Source: ORD MDW STARs.pdf; charts

- **tool** (2026-09-04 19:52) The gate selector should drive the track once the ladders are
  in. Right now picking KUBBS changes nothing and that is confusing.
```

Paste that under the matching section below. Keep the anchor headings: they are how a note
finds its way back to the thing it is about, and how a later reader knows whether the note
still applies after that slot has been filled.

## How a note changes the tool

Four kinds, and they go different places:

- **correction** — a cited number in the tool is wrong. Fix `claude_C90_Reference.md` first,
  then the HTML, and say in the commit message which paragraph settled it. A correction that
  contradicts the SOP needs the SOP paragraph read again before anything changes.
- **question for the instructor** — leave it here until it is answered. Then it becomes a
  correction, a new reference entry, or nothing.
- **tool** — the tool should behave differently. These are the ones that make the tool
  better rather than more accurate; keep the wording the student used.
- **note** — everything else. Understanding, mnemonics, what went wrong on a session. These
  are where standing training items come from: when the same note appears three times, it is
  a pattern, and the `standing` slot is where it goes.

## Notes by anchor

### positions

### combining

### configs

### finals

### capture

### nsat

### airports

### beacon

### glossary

### build

### datamap

### Data slots

<!-- slot.ssat, slot.gates, slot.routes, slot.deps, slot.boundary, slot.ada, slot.mva,
     slot.zau, slot.towers, slot.standing — add the heading when the first note arrives -->

## Standing training items

None yet. M98 has five, drawn from a cross-session OJT review; C90's will come out of the
notes above once there are enough sessions to see a repeat. When one is added, it goes in the
`STANDING` array in the deck block, and every grading call that exercises it passes its id as
the third argument to `log()` — that tagging is what makes an item countable.
