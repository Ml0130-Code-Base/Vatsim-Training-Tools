# CRC Platform Reference — what STARS and ERAM can actually do

Read from `https://docs.virtualnas.net/` on **2026-09-01**: the CRC overview, STARS, ERAM
pages, and the Data Admin pages for Video Maps, Restrictions, Aliases, Auto ATC Rules and
Training.

**Scope and honesty.** This is a transcription of the published documentation, not of the
running client. **Nothing here was verified against CRC itself** — no command was typed, no
behaviour observed. Where the docs are silent, this file says so rather than filling the gap.
Facility-specific values still come from facility documents; this file only describes the
*platform*, which is national and the same everywhere.

CRC is the Consolidated Radar Client — one client that simulates STARS (terminal) and ERAM
(en route), plus Tower Cab, ASDE-X and SAID. **This matters to every tool in this repo,
because it is the interface the trainee actually sits at.** A drill that grades a decision
the client cannot express is grading the wrong thing.

---

## 1. The two systems at a glance

| | **STARS** | **ERAM** |
|---|---|---|
| Job | Terminal — TRACON and radar tower | En route — ARTCC |
| Our facilities | M98, R90, C90, AZO, S56, Big Sky | ZMP |
| Position identity | **TCP** = subset digit + sector ID (`1D`) | Sector ID |
| Command style | Function key + **slew** (click a target) | Typed **Q-commands** in the MCA |
| Menu surface | **DCB** — a button bar with submenus | **Toolbars** with tear-off submenus |
| Command echo | Preview Area | Message Composition Area + Response Area |
| Map model | Video maps 1–6 on the DCB, groups A/B | One GeoMap at a time, filters 0–40 |

Both share: NEXRAD overlays, Top-Down Mode (`Ctrl+T`), autotrack, dot commands, the flight
plan editor (`Ctrl+F`), the controller list (`Ctrl+L`), the voice switch (`Ctrl+I`) and the
messages window (`Ctrl+M`).

---

## 2. STARS

### Position, consolidation and who else is open

**TCP** is a subset digit plus a sector ID. **Consolidation** is the platform's name for what
our tools call the combining chain, and it comes in two forms:

- **Basic** — transfers control of *future* tracks only; existing tracks stay with the
  original TCP; incoming handoffs for the consolidated TCP route to the receiver. Shown in the
  SSA with an asterisk *preceding* the TCP.
- **Full** — transfers all current and future tracks instantaneously, no confirmation from the
  receiver.

The SSA renders it as `(TCP) CON: (TCP) (TCP)*`. An automatic mode applies a
**facility-defined TCP hierarchy** on position activation. `<MULTIFUNC>D+<ENTER>` displays
active consolidations.

> **For our tools:** this is the real-world object our `ownerOf`/`into` chain models, and it
> confirms the shape — a facility-defined hierarchy, applied automatically, with the fold
> visible on the scope. It also adds a distinction we do not model: **basic versus full**.
> Whether existing tracks move is exactly the question a trainee has to answer when a position
> closes underneath them.

**Quick Look** (`<MULTIFUNC>Q(TCP)<ENTER>`, `Q ALL`, `Q+` for owned colour) displays FDBs for
everything another TCP is tracking — intra-facility only. This is the mechanical form of
"who else is open and what are they working."

### Handoffs — and the ID taxonomy that maps to our LOA data

`<HND OFF>(ID)<SLEW>` or the implied `(ID)<SLEW>`. The **ID tells you where the aircraft is
going**, and the taxonomy is directly useful:

| Destination | ID form |
|---|---|
| Intra-facility, same subset | sector ID alone (`D`) |
| Intra-facility, different subset | subset + sector (`1D`) |
| **Host ARTCC** | `C` + two-digit sector ID (sector optional if one position open) |
| **Non-host ARTCC** | NAS ID + two-digit sector ID |
| **Another STARS facility** | `` ` `` (backtick/delta) + handoff number + TCP |

Accept by slewing. The data block blinks white 5 seconds; clicking cycles blink → green →
PDB. Recall with `<HND OFF><SLEW>`. **Redirect** by entering a new ID and slewing.

Point outs are `(TCP)*<SLEW>` and are **intra-facility only** — a point-out cannot cross to
another STARS system. Accept by slewing, reject with `UN<SLEW>`, and **`**<SLEW>` converts an
incoming point out into a handoff** (takes the track).

> **For our tools:** M98's `receiverFor` and R90's neighbour set already resolve *who* gets
> the aircraft. This adds *how it is addressed*, which is a gradeable keystroke: an R90
> handoff to ZMP 26 is `C26`, to another sector is a bare letter, and to SUX is a NAS ID.
> Also note the hard platform limit — **point outs do not cross facilities in STARS**, which
> constrains any drill built on R90's PACP or C90's satellite point-outs.

### Data blocks

Three kinds: **LDB** (unassociated — beacon code and altitude; click shows ground speed for 5
seconds), **PDB** (associated, owned by someone else — line 2 only), **FDB** (yours, or being
handed to you, or pointed out, or forced).

FDB layout:
- **Line 1** — callsign.
- **Line 2 left** — Mode C altitude, time-sharing with scratchpad #1, scratchpad #2, or the
  receiving sector ID during a handoff.
- **Line 2 centre** — single character naming the handoff recipient.
- **Line 2 right** — ground speed, time-sharing with aircraft type and optionally requested
  altitude.
- **Line 3** — reported *and* assigned beacon code, when the aircraft is squawking the wrong one.

Position symbols on an LDB carry meaning: **asterisk** = beacon received, **V** = squawking
1200, **square** = squawking a selected code group.

**Wake category is displayed after the ground speed**, in one of two schemes depending on
whether the facility is adapted for CWT:

*Legacy:* blank = non-heavy, `R` = non-heavy RNAV, `H` = heavy, `B` = heavy RNAV, `J` = super,
`M` = super RNAV, `F` = B757, `L` = B757 RNAV.

*CWT:* `A` super, `B` upper heavy, `C` lower heavy, `D` non-pairwise heavy, `E` B757,
`F` upper large, `G` lower large, `H` upper small >15,400 lb, `I` lower small <15,400 lb.

> **For our tools:** M98 carries `MTOW`/`wakeOf`. The display side is a two-scheme problem and
> **the docs do not say which scheme any given facility uses** — that is facility adaptation
> and would need checking per facility before a tool renders a category letter.

### Scratchpads — the R90 first drill, in platform terms

Two scratchpads, each **3 or 4 alphanumeric characters**, and the allowed non-alphanumerics
are `+ . * /` and backtick.

| Action | Command |
|---|---|
| Enter scratchpad #1 | `(SCRATCHPAD)<SLEW>` |
| Enter scratchpad #2 | `+(SCRATCHPAD)<SLEW>` |
| Clear #1 | `.<SLEW>` |
| Clear #2 | `+<SLEW>` |

**Entering the same value twice undoes the entry; clearing twice restores the prior value.**

> **For our tools:** R90 roadmap item 3 — scratchpad-encoded approach clearances from R90 3-10
> — is expressible as real keystrokes, with a real length limit. The 3-to-4-character cap is
> worth checking against R90's longest encoded entry before building the drill, and the
> runway-alone-means-visual rule fits inside it comfortably.

### Three different altitudes, three different commands

| Concept | Command |
|---|---|
| **Pilot-reported** altitude (only when Mode C absent or suppressed) | `(###)<SLEW>`; clear with `000<SLEW>` |
| **Assigned / temporary** altitude | `+(###)<SLEW>`; `000` removes |
| **Requested / filed** altitude | `++(###)<SLEW>` |

Also: assign a beacon code `<MULTIFUNC>M(####)<SLEW>`, modify aircraft type by slewing with
the type (right-padded with asterisks under four characters, `F16*`), and set voice type
`<F9>(V|R|T)<SLEW>`.

### Alerts

**CA / STCA** — predicts 5 seconds forward for each *owned associated* track and compares
against all tracks; fires when current or predicted separation is **under 3 NM laterally and
under 1,000 ft vertically and not increasing.** Blinking red `CA` on FDB line 1 plus a
continuous tone; slewing either track acknowledges and turns it solid.

**There is a suppression zone on final**: within 4 NM of the extended centreline, out to 30 NM
from the threshold, from field elevation to 1,500 ft above glideslope — for airports in the
facility's internal airport list. Inhibit per aircraft with `<CA>K<SLEW>`.

**SPCs** — beacon-driven: `7500 HJ`, `7600 RF`, `7700 EM`, `7777 MI`, `7400 LL`. Non-beacon:
`OD` opposite direction, `ME` medical emergency, `MF` minimum fuel, `LN` medevac. Two
characters on FDB line 1, echoed in the SSA, with a tone. Force or unforce with `(SPC)<SLEW>`.

### ATPA, TPA and CRDA — the terminal separation tooling

**ATPA** draws a variable-length cone from a trailing track toward its leader, its length equal
to the allowable in-trail minimum for that pair (wake category or basic radar). Three states:
**monitor** (TPA colour), **warning** (yellow, predicted violation within 45 seconds),
**alert** (orange, already violating or within 24 seconds). In-trail distance can be shown in
the data block (`*DE`/`*DI`).

**TPA** is the manual version: **J-rings** `*J(#.#)<SLEW>` (1–30 NM circle) and **cones**
`*P(#.#)<SLEW>` (1–30 NM along ground track).

**CRDA** generates **ghost tracks** to sequence converging runways. A master runway, a slave
runway, a trapezoidal qualification region and a descent path profile; a track ghosts
automatically when its ground track is within a configured variance of the master heading, its
altitude is inside the descent profile, and its ground speed is **350 knots or less**. Two
modes: **stagger** (ghost at the parent's distance from the runway intersection) and **tie**
(offset by a configured stagger distance).

> **For our tools:** ATPA is the honest platform answer to "how does a terminal controller
> actually maintain in-trail," and it is a *displayed* aid rather than a judgement — which is
> exactly the distinction invariant 3 makes. CRDA is a live C90 question: C90 works converging
> runways and our C90 tool carries turn-on altitudes and capture points but no ghosting model.

### Lists — and the one that is a coordination drill

Toggleable, relocatable and resizable via `<MULTIFUNC>` commands: sign-on, flight plan (TAB),
up to three **tower lists**, **coast/suspend** (tracks coasting 30+ seconds, retained five
minutes), **VFR**, **LA/CA/MCI**, **CRDA status**, and the video map lists.

The **Coordination (rundown) list** is the interesting one: it carries release time
remaining, sequence position, a release indicator, callsign, type, beacon, weight class,
scratchpad and free message text, with six visual states — **unsent, unacknowledged
(blinking), acknowledged, recalled, departure expiration warning (blinking yellow), void
unacknowledged.** Towers create and send entries with `<F13>`; the TRACON acknowledges with
`<F13>(LISTID)(FLID)<ENTER>` and can auto-acknowledge.

> **For our tools:** this is a departure-release coordination loop with real states and a
> real expiry clock. M98 and R90 both have release rules, and a release that expires
> unacknowledged is a genuinely gradeable failure.

### Display control

Altitude filters are set separately for associated and unassociated tracks, in hundreds of
feet: `<MULTIFUNC>F(LO)(HI)<SPACE>(LO)(HI)<ENTER>`, associated-only with `FC`. `N99` in the
SSA means zero or less.

Beacon code selection: two digits selects a **block**, four digits a **discrete code**
(`<MULTIFUNC>B(##)` / `B(####)`). Selected codes show in the SSA and make matching LDBs
display a square position symbol.

> **For our tools:** C90's beacon blocks (SOP 2-4) and AZO's "is this code inside the allocated
> block" reminder are the same object the scope selects on. A block is a two-digit selection —
> which is a cleaner check than string-matching a four-digit code.

Also: `<MULTIFUNC>Q` quick look, `<MULTIFUNC>E` force FDBs for overflights, **hold `F1`** for
the beacon-code readout ("beaconator") which swaps every callsign for its code and forces PDBs
to FDBs, leader line direction 1–9 per track or globally, PTLs (`PTL OWN`, `PTL ALL`,
`<MULTIFUNC>R<SLEW>` per track), history trails, 32 named preference sets, and a `MIN`
minimum-separation tool between two tracks.

Range/bearing tooling: `*<SLEW><SLEW>` for a readout, `*T` to lay a persistent **Range Bearing
Line** between any two of {track, location, fix}, and `*<SLEW TARGET><SLEW AIRPORT>` for
airport name, bearing, range and longest runway.

---

## 3. ERAM

### The FDB, field by field — this is the vocabulary an en route drill grades

Five lines plus a column, with the Portal Fence separating the outer elements:

- **Column 0** — **VCI** (visual communications indicator, "on my frequency"), toggled by
  click or `// <FLID>`; and **`R`**, the not-your-control indicator.
- **Line 0** — point out indicator: `P` pending, `A` acknowledged.
- **Line 1** — **Field A**, aircraft ID; `*` if SatComm capable.
- **Line 2** — **Field B** assigned altitude with a status character, **Field C** reported
  altitude (or `XXX`), and a coral box for **non-RVSM**.
- **Line 3** — **Field D** the computer ID (CID), **Field E** destination + ground speed or a
  status word.
- **Line 4** — **Field F**: destination, type, assigned heading, assigned speed or free text,
  flagged by a `↴` at the end of line 2.

**Field B's fourth character is the altitude-state vocabulary**, and it is worth learning
whole:

| Char | Example | Meaning |
|---|---|---|
| `C` | `300C` | Reached assigned altitude |
| `T` | `100T253` | **Interim** altitude 10,000, currently FL253 |
| `L` | `100L253` | **Local interim** 10,000 |
| `P` | `100P253` | **Procedure** altitude 10,000 |
| `↑` `↓` | `300↑253` | Climbing / descending to assigned |
| `+` `−` | `230+253` | Climbed through / descended below assigned |
| `X` | `230XXXX` | Assigned, no Mode C |
| `A` | `230A` | Controller-entered reported altitude matches assigned |
| `#` | `230#210` | Controller-entered reported altitude differs |
| `/` | `VFR/055`, `OTP/218` | VFR at altitude; VFR on top |
| `B` | `200B250` | Block altitude, inside or outside the block |
| `N` | `230N` | Assigned, no correlated target |

**Field E** carries handoff and emergency state: `Hxxx` handoff pending to sector xxx,
`Oxxx` accepted, `Kxxx` accepted via `/OK`, `HUNK`/`OUNK` unknown sector, `CST` coasting,
`FRZN` frozen, `NONE` no beacon received, `####` a received code differing from assigned, and
`HIJK` / `RDOF` / `EMRG` / `ADIZ` / `LLNK` / `AFIO`.

### Altitudes — and the ZMP rules they implement

| Command | Meaning |
|---|---|
| `QZ <alt> <FLID>` | Assigned / flight-plan altitude. Also `QZ VFR`, `QZ VFR/<alt>`, `QZ OTP`, `QZ <floor>B<ceiling>` |
| `QQ <alt> <FLID>` | **Interim** altitude |
| `QQ L<alt> <FLID>` | **Local interim** — *not transferred between ARTCCs* |
| `QQ P<alt> <FLID>` | **Procedure** altitude — cannot coexist with an interim |
| `QQ <FLID>` | Clear interim or procedure |
| `QR <alt> <FLID>` | Controller-entered reported altitude |

`QQ` accepts multiple flight IDs at once (`QQ 110 JBU123/429/AAL924`) and takes a logic
override of `/TT` or `///` in place of the usual `/OK`.

> **For our tools, and this is the strongest single finding for ZMP:** the order's rules land
> directly on these commands. **7200.1O 3.3.B.2's interim-altitude waiver** — the six named
> sector pairs, and the rule that outside them a receiver must not remove an interim until
> communications are established and a different altitude issued — is a rule about **`QQ`**.
> **3.8.D's descend-via procedural altitude**, the KKILR example carrying `100` at the M98
> boundary, is **`QQ P`**. And **local interim not crossing an ARTCC boundary** is a platform
> fact that gives `QQ L` a specific meaning at every ZMP edge sector.

### Separation, rendered

**DRI halos** are toggled per track: `QP J <FLID>` draws the standard **5 NM** circle,
`QP T <FLID>` the **3 NM reduced-separation** circle, which is drawn with four gaps and is
only available to eligible tracks at or below FL230. The **target symbol itself** changes —
"square with gaps" — when a correlated target is inside reduced-separation airspace.

Conflict alert runs a continuous 5-second pass with a **4-minute trajectory**, against
**5 NM (or 3 NM reduced, ≤FL230) and 1,000 ft**, and only alerts when one target is owned by a
facility controller. ERAM assumes the pilot will level at the assigned altitude.

> **For our tools:** ZMP 7200.1O 3.6 — 5 NM everywhere, 3 NM only inside the Appendix 02
> single-site areas, revert immediately on a data anomaly — is **displayed by the platform**,
> both as a halo the controller chooses and as a target symbol the system chooses. That is a
> gradeable pairing: does the trainee's halo match the airspace they are actually in?

### Tracks, handoffs and point outs

Four track types with distinct position symbols: **flight-plan-aided** (circle, following the
filed route), **free track** (triangle, not following it), **coast** (plus), **frozen** (X in
a box). Eight target types, including the reduced-separation square-with-gaps and the Mode C
intruder triangle.

- Start a track `QT <location> <ACID>` — requires the flight plan be activated first with
  `DM <ACID>`. Drop with `QX <FLID>`.
- **Handoff** is the implied `<sector ID> <FLID>`; accept or recall with bare `<FLID>`.
- **`/OK <FLID>` forces a handoff** — steals the track from another sector, with no rejection
  possible. It shows on the far side as `Kxxx` in Field E.
- **Point out** `QP <sector> <FLID>`, acknowledge `QP A <FLID>`. **Only to other vNAS ERAM
  sectors.**
- **Freeze** a track in place with `QH F <location> <FLID>`; Field E reads `FRZN`.

> **For our tools:** ZMP's Automated Information Transfer (3.7) rides the data block during a
> radar handoff and explicitly **does not apply to point-outs**; the platform's split between
> the implied handoff command and `QP` is the same split. And **`Kxxx` is a visible record
> that someone forced a handoff** — a coordination failure the scope itself reports.

### Routes, and the tools that measure

- **`QU <minutes> <FLID>`** draws the route ahead for N minutes (default 20), `QU /M` for the
  maximum; routes display to **all** sector controllers and auto-remove after 30 seconds.
- **`QU <fix> <FLID>`** amends direct: removes preceding fixes, inserts an FRD at the present
  position, adds the named fix(es).
- **`AM <FLID> RTE ...`** replaces the beginning, middle, end or whole of a route, with `[`
  and `]` typing the up and down arrows for departure and destination changes.
- **`AM <FLID> ALT|BCN|SPD|TYP|RMK`** amends the other flight-plan fields.
- **`QF <FLID>`** is the flight plan readout — time, CID, ID, owning sector, type and
  equipment, beacon, filed speed, assigned altitude, route, remarks.

Measurement: **`LA`** gives distance and bearing between two points, adding ground speed and
flying time when one end is a track; **`LB`** does fix-to-location; **`LC <fix>/<time>
<track>`** answers *what speed puts this aircraft over that fix at that time.* **CRR groups**
(`LF <location> <label> <aircraft>`) give a continuously updating list of distances from a
fix, displayed either as a list or in a Range Data Block beside the track.

> **For our tools:** `LC` and CRR are the miles-in-trail machinery. Any ZMP drill built on MIT
> from the LOA tables has a platform-native way to be flown and checked.

### Views, filters and the altitude-limits notation we already use

Views: MCA, Response Area, Time, **Beacon Code**, **Check List** (position relief and
emergency — selectable item by item), **Altimeter Settings** (`AR`/`QD <station>`, with stale
data underlined past 65 minutes and `−M−` past 120), **CRR**, **Weather Station Report**
(`WR <station>`).

**Altitude limits** filter targets and LDBs, combined by default or split into separate
filters, and the entry form is **`<lower>B<upper>` in hundreds of feet** — `100B230` is
10,000 through FL230 — set from the text box or with **`QD <lower>B<upper>`**.

> **For our tools, second strong ZMP finding:** this is the same notation
> `claude_ZMP_Sector_Reference.md` reads stratum from. `000B242`, `228B999`, `068B242` are
> **ERAM altitude-limit strings**, and 7200.1O 3.2's rule — enter 1,200 ft above and below the
> airspace limits with 1,000 ft separation in use, 2,200 ft with 2,000 ft — describes what the
> trainee types into `QD` on sitting down. **That is a complete, deterministic, geometry-free
> first drill for ZMP**: given a sector and the separation in use, what is the correct `QD`
> string? It is checkable to the character.

Radar filter controls all-LDB / paired / unpaired display, all-primary, non-Mode-C, selected
beacon codes, and target history length. Data block field toggles cover destination, type,
beacon code, ground speed, broadcast (ADS-B) FLID, portal fence, SatComm, CRR RDB and the FDB
leader length.

**Not simulated** (named as such in the docs, and worth knowing before designing around
them): CPDLC in all its forms, departure/inbound/hold/MRP lists, flight event, group
supervisor, SSA filter, conflict-alert view, auto-handoff inhibit, speed advisory, PREFSET,
draw, and the command menus.

### Heading, speed and free text

`QS` writes line 4: `QS <heading>`, `QS /<speed>`, `QS ⵔ︎<text>` for free text (the backtick
types the clear-weather symbol), `QS */` and `QS /*` delete heading and speed, `QS *` deletes
all. Clickable **altitude, heading and speed menus** open off the relevant field with pick
areas — including left-turn/right-turn/present-heading and knots-versus-Mach toggles.

---

## 4. Cross-cutting: aliases, voice, and the flight plan editor

**Aliases** are the phraseology layer. A dot command expands to text before it goes to the
pilot — `.dm 6000` → `descend and maintain 6000` — with up to nine parameters `$1`–`$9`,
nesting, and a substantial variable set: `$squawk`, `$route`, `$fullroute`, `$arr`, `$dep`,
`$sid`, `$star`, `$cruise`, `$calt`, `$alt`, `$temp`, `$callsign`, `$aircraft`, `$com1`,
`$winds`, `$time`. Functions take arguments: `$metar()`, `$altim()`, `$wind()`, `$type()`,
`$dist(fix)`, `$bear(fix)`, `$oclock(fix)`, `$ftime(offset)`, `$radioname()`, `$freq()`,
`$atccallsign()`, `$uc()`, `$lc()`. Managed as one-per-line `.txt` files uploaded on the
facility homepage.

> **For our tools:** our TTS voicing files answer "how is this *spoken*." Aliases answer "how
> is this *typed*." They are the same phraseology from two directions, and a facility's alias
> file is a published statement of house phraseology — worth pulling for any facility that
> shares one.

**Voice switch** (`Ctrl+I`): rows are transceiver sets; `RX`/`TX` per row; secondary
frequencies added from underlying facilities; **primary frequency extension** pulls in
transceivers from other positions in the primary facility, available only while connected and
not saved with the profile; `XC` and `XCA` cross-couple frequencies.

> **For our tools:** this is where ZMP's Sector 11 trap lives. The order warns that when vZMP
> combines to Sector 11, TX/RX must be selected for `MSP_CTR` or coverage is Sector 11's own
> airspace only. That is a **transceiver-set** fact, and it belongs in a drill about combining,
> not a footnote.

**Sessions:** `Ctrl+F12` connect, `Ctrl+Shift+F12` activate (activation is what enables
transmit and display functions), **`Shift+F12` changes position without reconnecting** —
within the same facility only, owned tracks transfer unless another controller works the
departing position, and the previous frequency becomes a secondary. Roles are Observer,
Instructor or Student; the controller list marks them `(I)` and `(S)`.

**Flight plan editor** (`Ctrl+F` or `.fp`): AID, CID, BCN with a recycle button, DEP, DEST,
SPD in KTAS, ALT in hundreds of feet (accepting `VFR`, `OTP`, `VFR/XXX`), RTE, RMK. Full voice
is assumed unless `/v/` appears in remarks.

---

## 5. Two findings that change our roadmap

### 5.1 Geometry: the maps are GeoJSON, and every ARTCC holds them

**Video maps are authored in GeoJSON.** They are stored centrally per ARTCC, uploaded through
Data Admin singly or in batches, and legacy `.sct2`, vSTARS and vERAM files convert with FE
Buddy. Features carry `color`, `bcg` (brightness control group 1–40), `filters` (ERAM filters
0–40) and `zIndex`. Lines are LineStrings with a style and thickness; polygons are Polygons
with an optional `asdex` role; symbols and text are Points. STARS maps additionally carry a
map ID, a short name, a brightness category A or B and an always-visible flag.

**The docs describe no download endpoint or API** — consistent with our 2026-09-01 probe, where
every candidate vNAS video-map endpoint 404'd.

> **This reframes the standing blocker.** Our gap analyses currently ask the owner for
> boundary *points*, which is a slow and error-prone ask. But the boundaries already exist, at
> every one of our facilities, as GeoJSON features in that ARTCC's video map library — and
> before that, as the `.sct2` sector file the maps were converted from. **The better ask is
> for the file, not the points:** *"can you export the sector-boundary GeoJSON from vNAS Data
> Admin, or send the `.sct2` the maps were built from?"* Anyone with facility data-admin access
> can do it in one action, the format is standard, and it arrives surveyed rather than traced.
>
> This is the same ask at ZMP, R90, C90, AZO, S56 and Big Sky. **It should be Part 1, item 1 of
> every gap analysis**, replacing the request for hand-supplied radial/DME pairs. Nothing about
> invariant 1 changes — a GeoJSON export is a citable source with a name and a date, and it
> would be recorded in the source-documents index like any other pull.

### 5.2 vNAS already has a training scenario format

The Data Admin **Training** page configures scenarios and airports for vNAS training clients,
**ATCTrainer** named specifically. What it supports:

- **Training airports** as GeoJSON: runways carrying turnoff direction, threshold length,
  pattern size and altitude, hold-short distance and restricted turnoff taxiways; taxiways;
  parking spots with headings; approach and ramp spots. Airport-level pattern altitude, pattern
  size, and separate initial altitudes for jets and props.
- **Aircraft sets** — airline and type combinations with weighted random selection.
- **Predefined holds** (fix, inbound course, leg length, turn direction), **radar-vector SIDs**
  (manual headings with optional DME), and **custom approaches** built from named waypoints
  with optional altitude and speed restrictions.
- **Scenarios** with a primary airport, approach defaults, a **student facility and position**,
  auto-delete mode (none / on landing / parked) and a minimum network rating.
- **Aircraft** with callsign, ICAO type, initial transponder mode, spawn delay, difficulty
  level, and five **starting condition** types: coordinates (with altitude, speed, heading,
  mach), a parking spot, a fix or **FRD**, on a runway, or **on final at a given distance and
  approach offset**.
- **Preset commands executed on spawn**, and **auto-track configuration** letting nearby
  positions track arrivals with a handoff delay, a scratchpad entry and an altitude.
- **Arrival generators** — distance-based (spacing, maximum distance) or time-based (interval,
  duration), with randomised weight category and interval.
- **Initialization triggers**, **flight strip configurations** per facility/bay/rack, and
  **weather scenarios** with precipitation, a display METAR and **wind layers by altitude with
  linear interpolation and optional gusts**.

> **This deserves a deliberate decision rather than a drift.** Our tools are a drill *coach* —
> frame, transmission parsing, grading, a ledger — and ATCTrainer is a traffic *simulator* with
> a scenario format. They are complementary, not competing, and the interesting question is
> whether a drill built in our builder should be **exportable as a vNAS training scenario**, so
> the trainee flies it in the real client on the real scope instead of against our simplified
> engine. That would make the geometry problem largely someone else's, and it would put the
> grading where it belongs — on the coach, not on a hand-built traffic model.
>
> Recording this as an option, not a plan. It is a roadmap conversation for the owner.

### 5.3 Restrictions: a ready-made schema for our LOA data

Data Admin **Restrictions** encode exactly what our `claude_*_LOA_Reference.md` files carry —
"coordinated items between neighboring sectors and facilities … the conditions under which
coordination is required and the coordinated items."

- **Match on:** applicable airports (individual or named groups), route substring, group name,
  **flow**, flight type (departures or arrivals), aircraft types.
- **Coordinate:** a **location** (a named fix, or the facility/sector boundary), an **altitude**
  (ten options including at, at-or-above, between, and *climbing via*, plus directional
  standards), a **heading**, and a **speed** (IAS or Mach, at / at-or-greater / at-or-less).
- **Fields:** owning facility, requesting facility, optional owning and requesting sectors,
  display order.
- **Notes typed as** General, Control, Excludes, Flow, or **AIT**.

> **For our tools:** this is a national schema for the thing our LOA references transcribe by
> hand, and adopting its field names would make our LOA data directly comparable to what the
> facility publishes. The R90 STAR-gap heading bands, the arrival delivery altitudes and the
> flow-dependent exceptions all fit it without distortion. The presence of an explicit **AIT**
> note type is also independent confirmation that ZMP's emphasis on AIT is the platform's, not
> just the order's.

**Auto ATC Rules** are a smaller thing: descend, cross-at and descend-via instructions issued
to pilots when ATC is offline, matched on departure/destination lists, route substrings with a
`#` digit wildcard, altitude range and aircraft type. **ARTCC-owned only, and disabled on both
sweatbox servers.**

---

## 6. What is not answered here

- **Nothing was verified against the running client.** Every command string above is as
  published.
- **Which facilities are adapted for CWT** versus the legacy wake scheme — that is per-facility
  adaptation and the docs do not enumerate it.
- **Whether video maps can be exported** by a facility data admin, as opposed to uploaded. The
  page documents upload and batch upload; it does not mention a download. The ask in §5.1
  should be phrased so a "no" is cheap.
- **How restrictions surface to the controller in CRC** — the page defines the data model and
  says nothing about the display.
- The **Tower Cab, ASDE-X and SAID** pages were not read; they matter for tower positions,
  which no tool in this repo currently covers.
