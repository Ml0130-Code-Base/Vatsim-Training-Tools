# D-ATIS field survey — which of our fields have one, and what each one's flow line looks like

Pulled and verified **2026-09-04**, 1953Z–2052Z. **Read this before porting the M98 D-ATIS
parser to any other tool.** It answers two questions the port depends on and a third it did
not expect:

1. **Does the facility's field have a D-ATIS at all?** Six of our twenty-three do.
2. **Single or split broadcast?** **KMSP is the only split one we work**, and one of only
   thirteen in the country.
3. **Does the field write its flow the way MSP does?** **No. Not one of them does**, and two
   of them do not carry a notice heading at all — which is the anchor the parse window uses.

The parser in `ZMP/M98 Training/m98-drill-deck.html` is **MSP-shaped**. It was built from the
MSP broadcast, corrected twice from live MSP pulls (issue #13), and every fixture in the M98
smoke test is MSP text. §5 below is what it actually does against each of the other five.

---

## 1. The pull recipe

```bash
curl -s https://atis.info/api/KMSP           # one field
curl -sL https://datis.clowd.io/api/all      # every D-ATIS field, one document
```

**`datis.clowd.io` 302-redirects to `atis.info`.** `curl` without `-L` reports the 302 and
returns nothing, which is what made it look dead on 2026-09-04; `curl -sL` and the browser's
`fetch()` both follow it and get the same bytes. **Consequence for the tool: M98's two
`DATIS_SOURCES` entries are not two sources.** They are one upstream behind two names, so the
fallback buys a retry and nothing more. That is worth knowing before anyone counts it as
redundancy. It is recorded here rather than changed, because whether a genuinely independent
second source exists is an open question.

`/api/all` returned **73 fields** nationwide, of which **13 are split** and 60 combined.

## 2. Which of our fields have one

Field lists are the ones the tools themselves carry, not a guess.

| Facility | Fields the tool works | Has a D-ATIS | Broadcast |
|---|---|---|---|
| **M98** | KMSP + ANE, FCM, MIC, STP, LVN | **KMSP** | **split** — arrival and departure, own letter each |
| **R90** | KOMA, KLNK, KOFF, KMLE, KCBF | **KOMA** only | single (combined) |
| **C90** | KORD, KMDW, KDPA, KPWK, KARR, KGYY, KLOT, KUGN | **KORD, KMDW** | single (combined), both |
| **AZO** | KAZO, KGRR, KMKG, KBTL, KBIV, KHLM | **none** | — |
| **S56** | KSLC | **KSLC** | single (combined) |
| **Big Sky** | KBOI, KBZN | **KBOI** only | single (combined) |
| **ZMP Center** | en route — no field of its own | n/a | — |

**Confirmed against both sources**; `atis.info` per field and `datis.clowd.io/api/all` as a
list. Every absence below was checked both ways and agreed: KLNK, KOFF, KMLE, KCBF, KDPA,
KPWK, KARR, KGYY, KLOT, KUGN, KAZO, KGRR, KMKG, KBTL, KBIV, KHLM, KBZN.

**"No D-ATIS" means no digital text feed, not no ATIS.** Most of those fields have a voice
ATIS; it simply is not published as text, so there is nothing to fetch and nothing to paste.
A D-ATIS box on the AZO tool would have no input on any of its six fields.

**The thirteen split fields nationwide**, for context on how unusual MSP is: KATL, KCLE, KCLT,
KCVG, KDEN, KDFW, KDTW, KMCO, KMIA, **KMSP**, KPHL, KPIT, KTPA. **M98's two-box arrival and
departure interface is the exception.** Every other tool in this repo needs one box.

## 3. What each field's flow line actually says

Verbatim from the 2026-09-04 pull. This is the part that decides the work.

**KMSP** — arrival INFO A 1953Z, departure INFO N 1953Z
```
VISUAL RWY 30L APCH IN USE, VISUAL RWY 30R APCH IN USE.
DEPARTING RWY 30L, RWY 30R.
```

**KOMA** — INFO I 2052Z
```
VISUAL APCH 14R, 14L, 18 IN USE.
```

**KORD** — INFO D 2051Z
```
ARR EXP VECTORS ILS RWY 27C APCH, VISUAL APCH RWY 27R, VISUAL APCH RWY 28C.
DEPS EXP RWYS 22L 28R FROM NOVEMBER 5 9750 FT AVL.
```

**KMDW** — INFO C 1953Z
```
RNAV Y RWY 22L APCH IN USE. LNDG AND DEPG RWYS 22.
```

**KSLC** — INFO C 1954Z
```
SIMULTANEOUS APPROACHES IN USE, ILS RY 16L RNAV Y RY 17 RNAV Z RY 16R OR VISUAL APCHS IN USE.
```

**KBOI** — INFO J 1953Z
```
RNAV RWY 28L APCHS IN USE. LNDG AND DEPG RWY 28L.
```

## 4. The grammar, field by field

| | runway keyword | approach phrase | departures | notice heading |
|---|---|---|---|---|
| KMSP | `RWY`, repeated per item | `<type> RWY <r> APCH IN USE`, one clause per runway | `DEPARTING RWY 30L, RWY 30R` | `NOTICE TO AIRMEN` |
| KOMA | **none** | `VISUAL APCH 14R, 14L, 18 IN USE` — runways sit *between* the type and the phrase | not stated | `NOTICE TO AIRMEN` |
| KORD | `RWY` / `RWYS` | `ARR EXP VECTORS ILS RWY 27C APCH, VISUAL APCH RWY 27R` — **no "IN USE" anywhere**; `APCH` falls both after and before the runway in the same sentence | `DEPS EXP RWYS 22L 28R` — **space separated**, lead is `DEPS EXP` | **none** |
| KMDW | `RWY` / `RWYS` | `RNAV Y RWY 22L APCH IN USE` | `LNDG AND DEPG RWYS 22` — landing and departing in one phrase, and a **bare `22`** | `NOTICE TO AIRMEN` |
| KSLC | **`RY`** | `SIMULTANEOUS APPROACHES IN USE, ILS RY 16L RNAV Y RY 17 RNAV Z RY 16R OR VISUAL APCHS IN USE` — space separated, types interleaved, `OR VISUAL` trailing | not stated | **none** |
| KBOI | `RWY`, and `RY` in the notices | `RNAV RWY 28L APCHS IN USE` | `LNDG AND DEPG RWY 28L` | `NOTICE TO AIRMEN` |

### The three findings that matter

**a. `RY` is a real spelling.** KSLC writes every runway `RY 16L`. KOMA and KBOI both use `RY`
in their notice sections. The M98 parser only knows `RWY` and `RUNWAY`, so **at SLC it finds
no runways at all.**

**b. Two fields have no notice heading.** KORD and KSLC run their closures straight on from
the flow with nothing between:

```
KORD:  ... DEPS EXP RWYS 22L 28R FROM NOVEMBER 5 9750 FT AVL. RWY 4L, 22R CLSD.
       RWY 28L GS OTS, RWY 9L IM OTS, RWY 9C IM OTS, ... (thirteen more)
KSLC:  ... OR VISUAL APCHS IN USE. TWY B CLSD BTN TWY, A7 AND TWY A10 ...
       RWY 17 ILS OTS, RY 16L PAPI OTS.
```

**`datisClean` cuts nothing at either field**, because there is no heading to cut on. So the
rule "read up to where the notices begin" — which is what makes the MSP parse safe — **has no
anchor at ORD or SLC**. A parser that took every runway keyword in the pre-notice text would
read `RWY 4L, 22R CLSD` and thirteen out-of-service runways at ORD **as runways in use**.
This is the single biggest obstacle to a straight port, and it is why the MSP parser's other
guard matters more than it looked: it anchors on the flow *phrase*, not on the notice
boundary. At ORD there is no flow phrase either (`no "IN USE"`), so both guards are gone at
once.

**c. `LNDG AND DEPG` is one phrase covering both.** KMDW and KBOI both write it. The M98 lead
`LAND(?:ING)?|LNDG` expects the runway keyword straight after `LNDG` and finds `AND` instead,
so **the phrase is missed entirely** at both fields. `DEPG` is not in the departure lead
either. KMDW's `RWYS 22` is additionally ambiguous — MDW has 22L and 22R, and the broadcast
names neither.

## 5. What the M98 parser does against each today

Run against the text in §3, unmodified.

| Field | Result |
|---|---|
| **KMSP** | correct — built for it, and corrected twice from live pulls |
| **KOMA** | **finds nothing.** No `RWY` keyword, so no runways; reports "could not read landing runways" |
| **KORD** | **finds nothing.** No `IN USE` phrase and no `DEPARTING`/`DEPTG` lead |
| **KMDW** | **partial.** Gets 22L from the approach clause; misses `LNDG AND DEPG RWYS 22` entirely |
| **KSLC** | **finds nothing.** `RY` is not a keyword it knows |
| **KBOI** | **partial.** Gets 28L from the approach clause; misses `LNDG AND DEPG RWY 28L` |

**It fails loudly rather than silently in every case** — `missed` carries "landing runways" and
the tool says so — which is the behaviour invariant 3 asks for and is the reason this is a
porting problem rather than a correctness incident. **No tool other than M98 has a D-ATIS
reader today, so nothing is currently wrong in the repo.**

## 6. What a port would have to settle first

Not decisions to take unilaterally; each one is an owner call.

- **AZO gets no D-ATIS box at all.** None of its six fields publishes one. Anything else would
  be a control with no possible input.
- **ZMP Center has no field.** Whether an en route tool wants MSP's broadcast as context is a
  design question, not a port.
- **Every non-MSP tool needs one box, not two.** The split arrival/departure interface is
  MSP-specific.
- **C90 works two D-ATIS fields at once** — ORD and MDW, with different letters and different
  grammar. That is a shape no existing tool has.
- **A configuration cannot be named where no cited configuration table exists.** `parseDatis`
  sets a configuration by matching the runway set against `CONFIGS`, and `CONFIGS` at M98 is
  cited to MSP-M98 LOA 7.i and SOP 7-1 / LOA 11. R90, C90, S56 and Big Sky have no equivalent
  table in their reference sets. Under invariant 1 the port therefore reads **weather,
  information letter and runways in use** at those fields and **must not name a
  configuration** until a cited table exists. That is a smaller feature than M98's, and saying
  so is the honest version.
- **ORD and SLC need a parse boundary that is not the notice heading**, because they have
  none. Anchoring on the flow phrase is what MSP relies on, and ORD does not have one of those
  either.

## 7. The observation, for a field with no D-ATIS

Added 2026-09-04, after the survey above. Seventeen of our fields publish no D-ATIS, and the
weather still matters at every one of them, so the reader fetches an observation there instead.

**`aviationweather.gov` cannot be fetched from a browser.** It serves the METAR for every one
of these fields and is the right place to *read* one, but it sends **no
`access-control-allow-origin` header** on any endpoint, so the request is refused from every
origin. Tested three ways on 2026-09-04 and it fails all three: `curl -D -` shows no CORS
header on either `/api/data/metar` or `/cgi-bin/data/metar.php`, and a real `fetch()` from a
served page returns *"blocked by CORS policy"* for both. This corroborates the note already in
the M98 roadmap — the same host was tried in 2026-09-01 and did not answer.

**`api.weather.gov` is the same National Weather Service data and does send the header**, so
that is what the button calls: `https://api.weather.gov/stations/<ID>/observations/latest`.

| | |
|---|---|
| Fields returning a verbatim `rawMessage` | KOFF, KMLE, KCBF, KGYY, KLOT |
| Fields with `rawMessage` **empty** but the structured observation complete | KLNK, KDPA, KPWK, KARR, KUGN, KAZO, KGRR, KMKG, KBTL, KBIV, KBZN |
| Fields with **no reporting station** (404) | **KHLM** — Park Township |

Where `rawMessage` is populated it is used unchanged. Where it is empty the line is **rebuilt**
from the structured observation, and **the rebuilt line is put in the paste box rather than
parsed behind your back** — it is the same text you would have pasted, so it can be compared
against the field's real METAR.

**The conversions were validated against ground truth**, using the stations that return *both*
forms. Rebuilding those from structured data and comparing to their own `rawMessage`:

```
KLOT  raw    KLOT 042050Z 20007KT 10SM CLR 34/26 A2991
      built  KLOT 042050Z 20007KT 10SM CLR 34/26 A2991      identical
KOFF  raw    KOFF 042055Z 19009KT 10SM FEW120 BKN250 36/23 A2985 RMK AO2A SLP098 ...
      built  KOFF 042055Z 19009KT 10SM FEW120 BKN250 36/23 A2985
KCBF  raw    KCBF 042055Z AUTO 21009KT 9SM CLR 35/23 A2986 RMK AO2
      built  KCBF 042055Z 21009KT 9SM CLR 35/23 A2986
```

Digit for digit on wind, visibility, cloud layers, temperature, dewpoint and altimeter; the
only differences are the `AUTO` and `RMK` groups, which the parser ignores. **A null reading is
omitted rather than guessed** — KGYY's wind is null in the structured feed, so the rebuilt line
carries no wind group and the reader reports it as unread. That is the intended behaviour.

**This is still ONE network call per tool**, and it stays optional by construction. The button
asks the source that fits the field — the D-ATIS feed where the field publishes one, the
observation otherwise — so it is one call with a source that follows the field rather than a
second network dependency. It is never on a path the tool needs, every failure hands straight
to the paste box, and the parser it feeds is the same one paste uses. That is the test
invariant 6 sets, and this passes all three parts of it.

## 8. Fixtures

The raw pulls behind §3 were taken with the recipe in §1 at the times stated. **Take fixture
text from a live pull, never from a document and never composed by hand** — both rounds of
issue #13 were failures in text nobody had looked at yet, and neither was reachable by reading
the parser. The M98 lesson generalises: this parser's failure mode is a confident wrong
answer, so live text is the only trustworthy test material.
