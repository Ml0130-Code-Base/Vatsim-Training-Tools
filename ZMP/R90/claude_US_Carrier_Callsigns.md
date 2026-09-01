# US Carrier Reference — ICAO Codes & Callsigns

**Scope:** US carriers currently operating (as of August 2026) that you'll realistically work on the network — mainline, low-cost/ultra-low-cost, regional feeders, and cargo. This is *not* the full FAA certificate-holder list (500+ entries, almost all irrelevant to M98).

**How to read it:**
- **ICAO code** = the 3-letter designator filed in the flight plan and shown on your datablock (e.g., `DAL1234`).
- **Callsign** = the radiotelephony designator you actually *say* on frequency (e.g., "Delta twelve thirty-four").
- For most mainlines the two match. For regionals they often **don't** — that's the whole reason this column exists. The ones that catch controllers are flagged with ⚠.

---

## Voicing — how to say it

Read an ICAO code off the datablock as **[callsign] + [flight number]**, with the flight number spoken in **two-digit groups** — never digit-by-digit for air carriers.

- **4-digit** → two pairs: `EDV4555` → "Endeavor **forty-five fifty-five**"
- **3-digit** → leading single + trailing pair: `DAL597` → "Delta **five ninety-seven**"

The datablock reads `EDV4555`; you transmit "Endeavor forty-five fifty-five." Watch the regionals — `RPA4890` is **"Brickyard forty-eight ninety,"** not "Republic."

**Zeros & round numbers:**
- Zero inside a pair → **"zero"** (never "oh").
- **Round hundreds** → **"hundred"**: `DAL500` → "Delta five hundred"; `DAL4500` → "Delta forty-five hundred."
- **Non-round hundreds** (3-digit with a middle zero) → speak it straight, **"X zero Y"**: `DAL505` → "Delta five zero five" *(not "five hundred five")*.
- **Thousands with a zero** (4-digit) → grouped **or** whole-number, both fine: `DAL1005` → "Delta ten zero five" *or* "Delta one thousand five."

**Registrations (N-numbers / GA traffic) — opposite rule:** say **each character individually**, digits one at a time (never grouped) and letters phonetically.
- Full, on initial contact: `N1418B` → "November one four one eight bravo"
- After two-way contact → **"November" + last three characters**: `N1418B` → "November one eight bravo"
- Don't abbreviate on the first call or when a similar-sounding tail number is on frequency — the controller initiates the short form, the pilot matches it.

> **The core split:** airline flight numbers are **grouped** ("United fourteen fifty-two"); registrations are **spelled straight** ("November three zero three zulu sierra"). The zero rule holds on both — always "zero," never "oh."

**Runway designators:** individual digits + the designator as a **full word** — never shorthand (text-to-speech reads "30L" as "thirty L"). **L = left · R = right · C = center.**
- `30L` → "three zero left" · `22R` → "two two right" · `10C` → "one zero center"
- Single-digit runways drop the leading zero (FAA): `4R` → "four right"; runway `4`/`04` → "four"
- Zero stays "zero": `20` → "two zero," `30` → "three zero"

*(Shorthand like `30L` is fine here in visual reference — expansion is only for read-aloud output.)*

---

## Mainline / Legacy Network

| Airline | ICAO | Callsign |
|---|---|---|
| American Airlines | AAL | American |
| Delta Air Lines | DAL | Delta |
| United Airlines | UAL | United |
| Alaska Airlines | ASA | Alaska |

> Alaska now also operates the former Hawaiian widebody fleet under **ASA / "Alaska."** Hawaiian's own HAL code and "Hawaiian" callsign were retired 29 Oct 2025 — you won't see them anymore.

---

## Low-Cost / Ultra-Low-Cost

| Airline | ICAO | Callsign |
|---|---|---|
| Southwest Airlines | SWA | Southwest |
| JetBlue Airways | JBU | JetBlue |
| Frontier Airlines | FFT | Frontier Flight ⚠ |
| Allegiant Air | AAY | Allegiant |
| Sun Country Airlines | SCX | Sun Country |
| Breeze Airways | MXY | Moxy ⚠ |
| Avelo Airlines | VXP | Avelo |

> **Sun Country (SCX)** is Minneapolis-based — you'll see a lot of it at M98.
> **Breeze** keeps "Moxy" from its original name (Moxy Airways); the ICAO code MXY is the giveaway.
> **Spirit (NKS)** ceased all operations 2 May 2026 — removed from this list.

---

## Regional / Feeder

These fly under a mainline brand (Delta Connection, American Eagle, United Express). The datablock shows the *regional's* ICAO code, not the mainline's.

| Airline | ICAO | Callsign | Flies as |
|---|---|---|---|
| SkyWest Airlines | SKW | SkyWest | DL / AA / UA / AS |
| Endeavor Air | EDV | Endeavor | Delta Connection |
| Republic Airways | RPA | Brickyard ⚠ | AA / DL / UA |
| PSA Airlines | JIA | Blue Streak ⚠ | American Eagle |
| Envoy Air | ENY | Envoy | American Eagle |
| Piedmont Airlines | PDT | Piedmont | American Eagle |
| Horizon Air | QXE | Horizon Air | Alaska |
| Mesa Airlines | ASH | Air Shuttle ⚠ | United Express |
| GoJet Airlines | GJS | Lindbergh ⚠ | United Express |
| CommuteAir | UCA | CommutAir | United Express |
| Air Wisconsin | AWI | Air Wisconsin | *(status in flux — verify)* |

> **MSP-relevant:** **Endeavor (EDV)** and **SkyWest (SKW)** are the big Delta Connection feeders you'll work at M98. Endeavor is Delta's wholly-owned regional with heavy MSP/DTW presence.
> **Mesa + Republic:** the two companies merged corporately in Nov 2025, but they still operate on **separate certificates with separate codes** — full consolidation isn't expected until ~2027. Mesa now flies **exclusively for United Express**; Republic still covers AA/DL/UA. Keep both.
> **Air Wisconsin (AWI):** lost its American Eagle contract, shrank hard, and its current flying is unstable — treat as verify-before-you-rely.

---

## Cargo

| Airline | ICAO | Callsign |
|---|---|---|
| FedEx Express | FDX | FedEx |
| UPS Airlines | UPS | UPS |
| Atlas Air | GTI | Giant ⚠ |
| Kalitta Air | CKS | Connie ⚠ |
| ABX Air | ABX | Abex ⚠ |
| Air Transport International | ATN | Air Transport |
| Polar Air Cargo | PAC | Polar |
| Amerijet International | AJT | Amerijet |
| Western Global Airlines | WGN | Western Global |
| National Airlines | NCR | National |
| Omni Air International | OAE | Omni |

> **FedEx (FDX)** and **UPS** are the cargo you'll see most. The others show up as freight/ACMI runs. Atlas ("Giant"), Kalitta ("Connie"), and ABX ("Abex") are the classic name-vs-callsign mismatches.

---

## Gone / Changed in 2026 (don't expect these)

| Was | Code | Status |
|---|---|---|
| Hawaiian Airlines | HAL | Retired 29 Oct 2025 — now flies as ASA "Alaska" |
| Spirit Airlines | NKS | Ceased operations 2 May 2026 |
| Silver Airways | SIL | Chapter 7 liquidation — ceased |

---

*Codes and operating status verified against current (Aug 2026) sources. The regional feeder landscape is the volatile part — re-check before an event if it's been a while.*
