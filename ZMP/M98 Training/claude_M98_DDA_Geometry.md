# M98 Departure Dispersal Area — lateral geometry

**Extracted 2026-08-31 by tracing the chart image itself.** The DDA's vertical limits have
always been in prose (MSP-M98 LOA 5.a.3–5). Its *shape* is drawn only in **MSP-M98 LOA
Attachment 1** and **M98 7110.26A Appendix A**, which are page images with no text layer — the
reason roadmap item 7 sat blocked. This document records how the polygon was recovered, so the
numbers can be argued with rather than trusted.

## How the images were obtained

No `pdftoppm`, no Node, no working Python on the machine. The chart pages are embedded JPEGs, so
they were carved straight out of the PDF byte stream by walking JPEG segment markers
(`scratchpad/carve.pl`) — 60 images out of `MSP_M98_LOA.pdf`, of which three are the dispersal
area sheets:

| Sheet | Configuration | Note |
|---|---|---|
| 45 | **RUNWAY 12/17** | the one the engine flies |
| 46 | **RUNWAY 30** | traced but not carried — no 30s route set yet |
| 47 | **Land RWY 35 / Dept RWY 12** | shows a go-around area, 280° |

`M98_7110_26A.pdf` carries the same image set.

## How the scale was established

Everything was measured from the pixels in a browser canvas, not by eye.

1. **Origin.** Gray range-ring pixels were fitted with RANSAC + Kåsa least squares. Two rings per
   sheet came back **concentric to within half a pixel**, and their common centre lands on the
   airport symbol. That centre is the origin.
2. **Scale.** The satellite cutouts on the Runway 30 sheet are circles around **MIC** and **FCM**,
   and those airports have published coordinates: KMIC N45 03.72 / W093 21.24 and KFCM
   N44 49.63 / W093 27.43, **14.76 NM apart**. Their fitted centres are **480.2 px** apart, giving
   **32.54 px per NM**.
3. **Bearing frame.** The measured FCM→MIC bearing is **017.9°** against a true **017.3°** —
   north is up, to within 0.6°.

### Three independent checks on that one scale

| Measured | Against | Agreement |
|---|---|---|
| Class B circle **5.93 NM** | published 6 NM | 1% |
| Outer range ring **15.00 NM** | a 15 NM ring | exact |
| Close-in satellite arc **11.49 NM** | "~11.5 NM from MSP" in the satellite notes | 0.01 NM |
| Fitted MIC bearing/distance **332.9° / 11.54** | computed **333.3° / 11.11** | 0.4° / 0.4 NM |
| Fitted FCM bearing/distance **248.9° / 10.49** | computed **246.1° / 10.26** | 2.8° / 0.2 NM |

The 11.5 NM check is worth noting on its own: that number previously existed in the reference set
only as *"Michael, stated"*. The chart corroborates it.

## The polygon — Runway 12 and 12-17

MSP radial / DME, tolerance about **half a nautical mile**:

```
074/6.40  101/11.35  111/11.40  120/11.43  130/11.43  139/11.43
148/11.43 158/11.43  173/11.43  189/11.40  199/11.40  210/11.40
218/11.30 217/2.20   130/1.72   108/1.78
```

Read plainly: a sector from **074° round to 218°**, its outer edge a **constant arc at 11.4 NM**,
its northeast edge a straight line in from the Class B boundary at 6.4 NM, its southwest edge
close to radial 217–218, and its inner edge running past the field at 1.7–2.2 NM.

The trace was verified by drawing the polygon back over the chart image — it lies on the boundary.

**Runway 30**, traced but not carried: outer arc at **10.0 NM**, wrapping northwest, with the MIC
and FCM cutouts punched out of it at a radius of about **2.9 NM** each. Add it with the 30s route
set (roadmap item 2).

## What is in the tool

`DDA_AREAS` / `ddaFor(cfg)` / `inDDA(e, n, cfg)` in the Drill Deck. The area is drawn on the scope
as an amber dashed sector, and a tracked aircraft that is **not an MSP departure**, at or below
**7,000**, inside the polygon is flagged against the `floors` standing item — MSP Tower owns that
airspace from the surface up to and including 7,000 (MSP-M98 LOA 5.a(3)), while an MSP departure
belongs in there (Tower has automatic releases into it, and LOA 8.d lets Departure climb it).

Only the 12 and 12-17 shape is carried, because that is the only configuration the engine flies.
`ddaFor` returns nothing for any other configuration rather than guessing.

## Caveats

- **This is a traced chart, not a surveyed boundary.** Half a mile is the honest tolerance, and the
  interface says so.
- The **DDA extensions** (4,000–7,000, LOA 5.a(4)) are a separate shape and were **not** identified
  on the sheet. Only the main area is carried.
- The **satellite cutouts** (3,500–7,000) are traced on the Runway 30 sheet only; they are not
  carried, so the tool does not yet model the under-path below 3,500 near FCM and MIC.

## Also found in the same image set, not yet used

The carve turned up the **MVA chart** (`mspm98_48`), which the reference set did not have. It gives
sector MVAs and per-obstruction MVA circles:

| Obstruction | Top | MVA |
|---|---|---|
| Big Lake Tower | 2,454 | **3,500** |
| Nowthen Towers | 2,048 | **3,000** |
| **Arden Hills / Shoreview** | **2,438** | **3,400** |
| Minneapolis buildings | 1,743 | 2,700 |
| Rosemount Tower | 1,753 | 2,800 |

Sector MVAs read **2,500** in the inner area, then **2,600**, **2,800** and **3,200** outward, out
to a 60 NM ring. The Arden Hills figure is the one that matters: it is the number behind the
recurring Shoreview MVA bust in the OJT review and behind the instructor's 3,500-until-established
rule. **None of this is wired into the tool** — it is recorded here so it is not lost.

The same set also contains the **runway wind matrices** (tailwind and crosswind parameters per
runway, wet and dry), which would let a configuration be derived from a wind rather than picked.
Also unused.
