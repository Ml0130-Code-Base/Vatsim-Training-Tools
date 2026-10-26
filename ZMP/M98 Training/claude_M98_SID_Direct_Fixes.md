# M98 — fixes a departure can be cleared direct to, inside the LOA

Not in the deck. A working list for the seat, derived from `claude_MSP_SID_Reference.md` (CIFP 261029
SIDs, effective 2026-10-29; every distance is from the MSP DME, N44 53 47.40 / W093 14 11.51).

## The rule this list applies

- **Direct to a fix on the aircraft's own SID, ahead of it, and no farther than 60 NM from the MSP DME.**
  That is Michael's stated technique, anchored on **ZMP-M98 LOA 4.f**: an aircraft filed 9,000 or above
  is established on the SID, **or on a heading to join the SID within 60 NM of the MSP DME**, before ZMP
  takes it. *"There is no '50-mile' rule"* (SID reference, trap 1) — **60 NM is the join limit**, and a
  fix beyond it is not on this list even though it is on the SID.
- **Filed 6,000 and below** is cleared as filed. **Filed 7,000 or 8,000** goes on a heading or course
  that clears the MSP and satellite STAR arrival areas (LOA 4.f) — a direct to a SID fix is a course, but
  it cuts the corner, so check it against the arrival areas rather than assuming the SID's own
  separation survives the shortcut.
- **The first fix of every SID carries an at-or-above crossing.** A direct to it, or past it, keeps that
  crossing: the aircraft is not cleared below it.
- **The release is a separate clock.** M98 releases a departure to ZMP at **25 NM from the MSP DME or
  leaving 11,000**, whichever comes first (LOA 4.c). A fix beyond 25 NM is past that point; the
  nearer ones (HHOBA, ITZME, SIEDL, MANCY, SNOWZ, SLALM, SLUSH, GGREY, JBUGG, BITEZ, HTDSH, NRTHN) are
  still inside it, so the aircraft is still yours when the direct is issued.
- **Do not send a departure direct to the field.** Not prohibited, but it bends a climbing departure
  back over the traffic behind it (SID reference, routing rule).

## Fixes inside 60 NM, in track order

"≥" is the coded at-or-above crossing at that fix. The common route is flown by every transition; a
transition's own fixes follow it. Anything beyond 60 NM is listed at the end and is **not** a direct
target.

| SID | Common route | Transitions (fix · NM) |
|---|---|---|
| **BITEZ1** | HHOBA 12.8 (≥ 4,000) · BITEZ 22.8 | **DKOTA / LEINY:** SKITO 33.1 · TICKK 39.1 · HHCEE 52.1 — **SMERF:** ZOGAP 33.8 · PAGOZ 41.5 |
| **BUNYN1** | JBUGG 22.3 (≥ 4,000) · BUNYN 31.6 | **DLH:** BAYBB 46.6 — **KVUSI:** GPERS 45.7 |
| **HTDSH1** | ITZME 13.1 (≥ 3,500) · HTDSH 22.8 | **ALO / OANNA / OHHMY / ZZIPR:** TOTTZ 36.2 · CORDY 49.5 — **BRIBE:** JEDET 34.0 · ZMBRO 47.3 |
| **KBREW1** | HRBEK 34.8 (≥ 5,000) · HOMUR 47.4 | **KEETN:** none inside 60 |
| **NRTHN1** | SIEDL 15.2 (≥ 4,200) · NRTHN 24.1 | **AROND:** PRRCH 32.5 · WAHLI 49.5 — **TTOWN:** PIIKE 32.7 · DWIYT 47.0 |
| **SNOWZ1** | MANCY 6.9 (≥ 4,000) · SNOWZ 15.3 | **DABOY / ZZEEE:** SLUSH 21.2 · PLOWW 33.0 · PEDLN 48.1 — **ISTIQ / LLUKY / SMTHA:** SLALM 19.3 · MOGLL 31.9 · SLAYR 48.3 |
| **SNUPE1** | PNUTZ 28.4 (≥ 4,000) · SNUPE 39.6 | **DLL:** WDSTK 47.8 |
| **TOTTZ1** | HTDSH 22.8 (≥ 3,900) · TOTTZ 36.2 | **ALO / FOOLS / OANNA / OHHMY / ZZIPR:** CORDY 49.5 |
| **ZMBRO1** | JEDET 34.0 (≥ 4,000) · ZMBRO 47.3 | **BRIBE:** none inside 60 |
| **DUHCK1** *(ANE, FCM, STP only)* | GGREY 20.3 (≥ 4,000) · DUHCK 31.1 | **LLUKY / SBRNA / STIER:** MGHTY 45.9 |

**Off Runway 17**, HTDSH1 and SNOWZ1 fly heading 169.5 to **RUBRB (7.0, ≥ 3,500)** and are then
vectored to join — RUBRB is on the segment, and the join fix (ITZME or MANCY) is the first fix above.

## On the SID, but past 60 NM — not a direct target

| Fix | NM | On |
|---|---|---|
| HSTIN | 62.0 | SNOWZ1 DABOY / ZZEEE |
| KBREW | 68.0 | KBREW1 |
| FOOLS | 72.3 | TOTTZ1 and HTDSH1 (ALO, OANNA, OHHMY, ZZIPR) |
| IDEEA, GRRAT | about 85.6, 96.9 | DUHCK1 (SBRNA; LLUKY and STIER) |

**The scope draws a SID only to 50 NM** (owner, 2026-10-22), so the fixes between 50 and 60 NM on this list — HHCEE, 53 — are listed and not drawn. The first fix beyond 80 NM on any MSP transition is MDIAN (82.7) or JAYYJ (83.8); the SID reference
names everything past that.

## Two things to check before you issue one

- **Rochester.** Every track that runs down through CORDY toward FOOLS — **TOTTZ1, and HTDSH1 except its
  BRIBE transition** — leaves through the M98/Rochester arc, MSP 148.1–184.8. Below 9,000 that corner is
  Rochester's, above it Center's (`claude_M98_RST_Reference.md`). A direct to **CORDY** (49.5) is inside
  the 60 NM limit and still crosses that boundary, so the point-out is the thing to remember, not the
  distance.
- **A satellite departure is measured from the MSP DME too.** DUHCK1's fixes are 20.3, 31.1 and 45.9 off
  MSP regardless of which satellite the aircraft left, so the 60 NM and 25 NM figures read the same way.

## What this list is not

- **Not a gate table.** Which departure gate each new SID exits through is still tabled (owner,
  2026-10-14), so nothing here says which scratchpad letter applies.
- **Not a sector map.** The reference set has no SID-to-ZMP-sector table, so a fix here does not tell
  you which Center sector takes the aircraft.
- **Not the LOA's own list.** The LOA states the 60 NM join limit, the 25 NM / 11,000 release and the
  altitude handling; it names no fixes. The fixes are the SID's own, and the choice to use one as a
  direct is the technique described above, not a published requirement.
