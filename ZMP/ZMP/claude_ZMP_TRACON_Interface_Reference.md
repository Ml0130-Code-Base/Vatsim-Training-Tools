# ZMP Terminal / Approach-Control LOAs — Extraction Notes

Source of every number below: the `pdftotext -layout` `.txt` files in
`C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/txt/`, with the matching `.pdf` in
`C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/`.

**Rule applied throughout:** nothing here is inferred from outside knowledge. Where a document
is silent the cell reads "not stated in `<file>`". Where the PDF page is a picture with no text
layer, that is called out as UNREAD rather than guessed at. Where `pdftotext` scrambled a
table's column alignment, the raw block is quoted verbatim and any reading of it is explicitly
labelled LOW CONFIDENCE.

---

## 1. Document inventory and effective dates

| File (txt) | Facilities covered | Effective date (as printed) | Cancels |
|---|---|---|---|
| `LOA_ZMP_DSM.txt` | DSM ATCT/TRACON | **August 3, 2026** (para 1 header; footer `08/03/2026`) | "vZMP-DSM LOA, dated March 17, 2020" (para 2) |
| `ZAU_ZMP_Approach_Controls_LOA.txt` | DSM, AZO, GRB, MKE, RST, VOK (+ ALO, CID referenced) | **7/8/2026** | "VATUSA Chicago ARTCC and VATUSA Minneapolis ARTCC Letter of Agreement, dated 3/8/2025" (para 2) |
| `LOA_ZMP_M98.txt` | M98 Minneapolis Approach | **March 31, 2026** (footer `3/31/2026`) | not stated in `LOA_ZMP_M98.txt` (no cancellation paragraph) |
| `LOA_ZMP_RST.txt` | RST Approach/ATCT | **December 27, 2023** | "vZMP ZMP-Minor ATCT/TRACON LOA, Rochester (RST) ATCT/TRACAB, dated 1/1/2015" (para 2) |
| `LOA_ZMP_R90.txt` | R90 Omaha TRACON (OMA/OFF/LNK) | **November 6, 2023** | "VATSIM ZMP – OMA R90 LETTER OF AGREEMENT Effective December 26, 2018" (para 2) |
| `LOA_ZMP_SUX.txt` | SUX Sioux City Tower | **September 10, 2022** | "vZMP Minor ATCT/TRACON LOA, 'Sioux City (SUX) ATCT'" (para 2) |
| `LOA_ZMP_FSD.txt` | FSD Sioux Falls Tower | **September 10, 2022** | "vZMP Minor ATCT/TRACON LOA, 'Sioux Falls (FSD) ATCT/TRACON'" (para 2) |
| `LOA_ZMP_FAR.txt` | FAR Fargo Tower | **January 17, 2021** | "ZMP – Minor ATCT/TRACON LOA, 'Fargo (FAR) ATCT/TRACON.'" (para 2) |
| `LOA_ZMP_BIS.txt` | BIS Bismarck ATCT | **4 August 2020** | "any and all previous LOAs between ZMP and BIS prior to the above effective date" (II) |
| `LOA_ZMP_GRB.txt` | GRB Tower / Green Bay TRACON | **MARCH 17, 2020** | "ZMP – Minor ATCT/TRACON LOA, 'Green Bay (GRB)/Appleton (ATW) ATCT/Green Bay TRACON" (para 2) |
| `LOA_ZMP_DLH.txt` | DLH Duluth Tower | **March 17, 2020** | "ZMP – Minor ATCT/TRACON LOA, 'Duluth (DLH) ATCT/TRACON.'" (para 2) |
| `ZMP_Minor_TRACON_Reference.txt` | 26 minor ATCT/TRACON/RAPCONs | **01/01/2015** (page header/footer on every page) | n/a — this IS the doc the others cancel |

**DATE FLAG (as instructed):** `ZMP_Minor_TRACON_Reference.txt` is dated **01/01/2015** and is the
**oldest document in the set by more than five years**. Six of the newer LOAs explicitly cancel
their own entry in it (RST, SUX, FSD, FAR, GRB, DLH — see the Cancels column). It nevertheless
remains the **only** source in this set for **hours of operation, local squawk-code blocks, and
IFR initial altitudes**, and the only source of any kind for APN, ALO, CWA, EAU, GFK/RDR, GRI,
GRR, GOV, LSE, MOT/MIB, MKG, MBS, RYM, SAW, STC and TVC. Treat its altitude columns as
superseded wherever a dedicated LOA exists, and its hours/squawks as unverified-since-2015.

Signatories seen: Dhruv Kalra, Air Traffic Manager, VATSIM Minneapolis ARTCC (M98, DSM, GRB, DLH,
BIS, FAR, RST, ZAU LOA); Lance Harry, Deputy ATM (M98, DSM); Zakery Husk, ATM VATSIM Chicago
ARTCC (ZAU LOA). No signature block appears in the `.txt` for R90, SUX or FSD.

---

## 2. Master table — one row per approach control ZMP touches

Altitudes are MSL. "AOB" = at or below, "AOA" = at or above (the ZAU LOA's own abbreviations).
M98 writes altitudes in hundreds of feet (`110 = 11,000`, per `LOA_ZMP_M98` para 3.a); those are
reproduced in the LOA's own notation and expanded in the detail section.

| Facility | Airports it serves (as named in the documents) | Delegated ceiling | Bordering ZMP sectors (named in doc) | Arrival handoff altitude(s) | Departure release / climb rules | Source LOA + effective date |
|---|---|---|---|---|---|---|
| **M98** Minneapolis Approach | MSP; satellites named in the LOA: STP, ANE, FCM, LVN, MIC; also inside M98 per 4.g.(14): OEO, RNH, RGK. (STC and MKT are treated as *outside* M98 — 4.g.(11), (12), (15).) | **At and below 17,000** (para 2) | 10, 09, 08, 07, 06, **RWA** (Table 1); Sector 5 (4.g.(14)); Sector 7 spacing (4.g.(3)(f)); RST approach (4.b) | No single figure — per-STAR. RNAV "descend via" w/ runway transition (Table 2); Knock-It-Off crossings (Table 3): MUSCL/BAYKS 120, KKILR/HUGGI 100, BLUEM/HHAMR 100, NITZR/WRSAW 110, TORGY/OFSON 110, BAINY/LUCCY 110. Conventional STAR crossings Table 4. See §3.1. | M98 issues enroute clearance if **cleared at 170 or below** (4.f.(2)(a)). **M98 releases control of departures to ZMP when the aircraft is at least 25 NM from the MSP DME or leaving 110** (4.c). Filed 060 & below = as filed; 070/080 = heading/course clear of STAR arrival areas; 090 and above = established in the appropriate ZMP sector clear of STAR arrival areas (4.f.(2)–(3)). Non-SID headings by sector = Table 1. Props requesting 120+ climbed to or level at 120 (4.f.(4)). | `LOA_ZMP_M98` — **3/31/2026** |
| **R90** Omaha TRACON | OMA, OFF, LNK ("R90 East", "R90 West", "R90 LNK" sectors); satellite airports unnamed | **At and below 15,000 over R90 East and West; at or below 10,000 over R90 LNK** (para 3) | ZMP **26** and **27** (4.b.3.d, 4.d.2.a, 4.d.2.e) | STAR arrivals: level at or descending to **16,000** (or **17,000** stacked on the STARs) (4.b.2.b). Over SUX/MZEEE: level or descending to **11,000** (4.b.2.c). Non-STAR arrivals over R90 East/West: at or descending to **16,000** or level at or below **15,000**; over R90 LNK: at or descending to **11,000** or level below **11,000** (4.b.3.a). Arrivals routed over SUX Approach: level or descending to **11,000** (4.b.3.b). | R90 climbs departures to requested or top of R90 airspace, whichever lower (4.d.1). ZMP acceptance of a handoff of an R90 **satellite** departure = approval to climb to requested or top of R90 airspace (**15,000** East/West, **10,000** LNK) *provided the aircraft is established within R90's airspace*; **APREQ required if within 2.5 NM of the common ZMP/R90 boundary or in ZMP airspace** (4.d.7). ZMP has control for turns up to 30° on aircraft exiting R90 (4.d.8) and for code changes (4.d.9). Heading fans while STARs active = §3.2. | `LOA_ZMP_R90` — **11/6/2023** |
| **DSM** Des Moines ATCT/TRACON | DSM; ZMP-side descent airports listed at 5.b.(4)(b): CSQ, EFW, MCW, HPT, DEH, 3Y2, FXY. ALO sector airspace referenced (Attachment B). | **10,000 and below** (para 4) | not stated in `LOA_ZMP_DSM.txt` (sector names appear only on the picture attachments). ZAU LOA Appendix A places DSM next to **ZMP 27** and **ZAU 55**. | ZMP clears arrivals **11,000 and above to descend and/or maintain 11,000** (5.a.(1)). Arrivals landing inside DSM and overflights below 10,000 must be at or climbing/descending to final altitude, excluding aircraft descending through the top of DSM airspace (5.a.(2)). | DSM **climbs departures to 10,000, or final altitude if lower** (5.b.(1)). DSM descends CSQ and EFW arrivals to **4,000** (5.b.(3)). DSM releases to ZMP for turns **up to and including 45°** (5.b.(4)(a)), descent on the 7 listed airports, and beacon-code changes. Departures exiting **south of the DSM 230 radial** must be on route or on a heading joining the route inside DSM airspace (5.b.(5)). 5 NM spacing constant/increasing into ZMP (5.b.(6)). | `LOA_ZMP_DSM` — **08/03/2026** |
| **RST** Rochester Approach/ATCT | RST; MCW named (5.E); "M98 area" traffic transits | **not stated in `LOA_ZMP_RST.txt`** — para 4 defers to Attachment "A" (picture). Corroborating: `ZMP_Minor_TRACON_Reference` (2015) "SFC-15,000 (East), SFC-9,000 (West)"; `ZAU_ZMP_Approach_Controls_LOA` Appendix A shows "RST KRST AOB 090" and "RST ODI AOB 150". A "15,000-foot shelf" is referenced in RST LOA 5.C.(2). | ZMP **05**, **07**, **21** (5.B.(2)(a)1); **07** (5.C.(1), 6.B) | Arrivals at or above 10,000 must be descending to or level at **10,000**; **exception — arrivals over Waterloo (ALO) Approach must be descending to or level at 11,000** (5.A.(2)). M98-area turboprops at/above 10,000 not transiting the 15,000-ft shelf: at or descending to **10,000**; aircraft filed through the shelf's lateral limits at/above 14,000: at or descending to **14,000**; all others at flight-plan altitude (5.C.(2)). | Departures requesting at/below RST's vertical limits are cleared to requested; **higher requests are cleared to 9,000, or 15,000 as appropriate** (5.B.(2)(a)). **Upon leaving 5,000** the Center may turn up to 30° and/or climb (5.B.(1)). RST departures into ZMP Sector 05 filed above 15,000 need a point-out to Sector 21 — **Sector 05 makes it** (5.B.(2)(a)1). M98-area departures filed 15,000 or below: climb to requested is pre-approved by RST (5.D.(1)). MCW departures: climb to the altitude on the strip approved (5.E.(2)). | `LOA_ZMP_RST` — **12/27/2023** |
| **GRB** Green Bay Tower / TRACON | GRB, ATW (title of cancelled LOA), MNM, plus frequency-list airports: Appleton, Manitowoc, Menominee, Sturgeon Bay. ZMP-side: Central Wisconsin, Wausau, Stevens Point (5.a). | **13,000 and below**, and **4,000 and below for the portion underlying ZMP Sectors 03 and 04** (para 3) | ZMP **03** and **04** (para 3); ZAU LOA Appendix A also shows **ZMP 04**, **ZMP 02** | Arrivals at or above 14,000 must be descending to or level at **14,000** (4.a.2). Arrivals at or below 13,000 landing GRB/satellites go to the satellite controllers (4.a.2). Transfer of control within **10 NM** of the boundary (4.a.3). Mode-C level at/below 13,000 accepted = altitude approval (4.a.4.a). | Enroute clearance without Center approval if **departures cleared at 13,000 or below, except MNM departures cleared at 4,000 or below** (4.b.1.a), and approach confines departures inside its airspace until the radar handoff completes (4.b.1.b). | `LOA_ZMP_GRB` — **3/17/2020** |
| **DLH** Duluth Tower | DLH; "Hibbing shelf" (HIB) area | **12,000 and below, and 8,000 and below** for the areas on Attachment "A" (para 3 — the doc does **not** say in prose which area is the 8,000 one; 4.a.2 names "the Hibbing shelf (see shaded area on Attachment 'A')") | Sector **10**, Sector **25** (5.b) | Arrivals at or above 13,000 must be descending to or level at **13,000**, **or 9,000 over the Hibbing shelf** (4.a.2). DLH may descend/turn ≤30° within **10 miles** of its airspace (4.a.3). Mode-C level at/below 12,000 accepted = altitude approval (4.a.4). | With automated handoffs, **issue FL230 or requested altitude if lower after ZMP accepts the handoff** (4.b.1); ZMP advises before accepting if a different altitude will be assigned. **After the handoff/freq change and once the departure reaches 8,000**, ZMP may turn up to 30° either side (4.b.2). | `LOA_ZMP_DLH` — **3/17/2020** |
| **BIS** Bismarck ATCT | BIS (no other airports named) | **15,000 and below** (III) | not stated in `LOA_ZMP_BIS.txt` (Attachment "A" is a picture) | Arrivals shall be **descending to or level at 8,000** (V.b.(2)). Mode-C level at/below 15,000 accepted = altitude approval **on over-flights and on arrivals 7,000 and below** (V.b.(3)(a)). After the handoff BIS has control for descent and turns ≤30° either side of ground track (V.b.(4)). | BIS may issue enroute clearances without ZMP approval if **cleared to 15,000 or below** (V.c.(1)(a)); phraseology "Expect (requested altitude) 10 minutes after departure" (V.c.(1)(b)); **after ZMP accepts the handoff BIS ensures the aircraft is at or climbing to requested altitude or FL230, whichever is lower** (V.c.(1)(c)); ZMP then may turn ≤30° (V.c.(1)(d)). | `LOA_ZMP_BIS` — **4 Aug 2020** |
| **FAR** Fargo Tower | FAR; **Detroit Lakes** named (ZMP retains SFC–4,000 NW of Detroit Lakes for its approaches) | **10,000 and below**; **the airspace northwest of Detroit Lakes at and below 4,000 is retained by ZMP**, shown by hash marks on Attachment "A" (para 3) | not stated in `LOA_ZMP_FAR.txt` — only the adjacent facility **Grand Forks Approach** is named (4.a.2, 4.a.4.b) | Arrivals descending to or level at **8,000**, **except arrivals from the north over Grand Forks Approach Control's airspace: descending to or level at 11,000** (4.a.2). Mode-C **over-flight** level at/below 10,000 accepted = altitude approval; **non-Mode-C arrivals at and below 10,000 must be manually coordinated** (4.a.3). Approach may descend/turn ≤30° when **within 10 miles** of its lateral limits and not affecting GFK (4.a.4). Manual handoffs referenced to **FAR VORTAC** (4.a.5). | Enroute clearance without Center approval if **cleared at 10,000 or below** (4.b.1.a) + "expect (filed altitude) 10 minutes after departure" (4.b.1.b). Approach issues **FL230 or requested, whichever lower, after the Center accepts the handoff** (4.b.2). **After leaving 8,000 the Center has control for turns up to 30° either side of course** (4.b.3). | `LOA_ZMP_FAR` — **1/17/2021** |
| **SUX** Sioux City Tower | SUX; SUX also works Le Mars IA, Mapleton IA, Vermillion SD, Wayne NE (5.b). ZMP works Yankton SD (ILS Rwy 31 / NDB Rwy 31), Ida Grove, Cherokee, Orange City IA (5.c). | **10,000 and below** (para 3) | Center Sectors **26** and **27** (4.a.2.c) | Arrivals shall be **descending to or level at 11,000** (4.a.1). Transfer of control for ≤30° turns and descent occurs after radar handoff + frequency change, provided it doesn't affect another approach control **and is not made within the lateral limits of Center Sectors 26 and 27** (4.a.2). Mode-C level **below** 10,000 accepted = altitude approval; non-Mode-C verbally coordinated (4.a.3). | Approach issues **requested altitude or FL230, whichever lower, after the Center accepts the handoff** (4.b.1). Center may alter route ≤30° provided the departure is **at or above 9,000**, or **if below 9,000, more than 25 NM from the Sioux City Airport** (4.b.2). Tower informs restricted departures "Expect further clearance to (filed altitude) 10 minutes after departure" (5.a). | `LOA_ZMP_SUX` — **9/10/2022** |
| **FSD** Sioux Falls Tower | FSD (no satellite airports named in the LOA) | **At and below 10,000** (para 3) | Center Sectors **33** and **37** (4.b.3) | Arrivals descending to or level at **8,000**, except when a higher altitude is required for separation (e.g. multiple arrivals); **arrivals from over Sioux City (SUX) Approach delegated airspace shall be descending to 11,000** (4.a.2 / 4.a.2.a). Mode-C level at/below 10,000 accepted = altitude approval; no-Mode-C coordinated at or prior to handoff (4.a.4). FSD may descend/turn ≤30° after handoff + freq change (4.a.3). | ZMP may turn a departure ≤30° after receiving the handoff (4.b.1). FSD issues **requested altitude or FL230, whichever lower, after the Center accepts the handoff** (4.b.2). **ZMP Sectors 33 and 37 must accomplish all coordination for aircraft climbing above 10,000 prior to accepting the radar handoff** (4.b.3). "Expect (filed altitude) 10 minutes after departure" (5.a.2). | `LOA_ZMP_FSD` — **9/10/2022** |
| **ALO** Waterloo ATCT *(ZAU-owned; ZMP interfaces)* | ALO | **SFC-10,000** (`ZMP_Minor_TRACON_Reference`, 2015) | not stated in either file | **KALO AOA 11,000: at/descending to 11,000** (ZAU LOA Appendix B, "From ZAU"); Minor Ref "Arrivals Descend To: 11,000" | ZAU LOA Appendix C header is "From ALO/DSM Approach Control to ZAU" but the table body lists **only DSM TRACON Airspace** — no ALO departure row is present. Minor Ref "Departures Climb To:" is blank/shifted (see §4 caveat). | `ZAU_ZMP_Approach_Controls_LOA` **7/8/2026** + `ZMP_Minor_TRACON_Reference` **1/1/2015** |
| **MKE** Milwaukee TRACON *(ZAU-owned; ZMP interfaces)* | KMKE + the "Milwaukee (MKE) Airports" list in Appendix E: KMKE, KBUU, KENW, KETB, KHXF, KMWC, KRAC, KUES | **SFC-13,000** (Minor Ref, 2015). ZAU LOA Appendix A ASCII shows "MKE ... ZAU AOB ... 130" (LOW CONFIDENCE, mangled diagram). | not stated | Minor Ref "Arrivals Descend To: 14,000". ZAU LOA para 6.b: ZMP must clear aircraft landing within MKE per Appendix B — **but Appendix B's "From ZMP" table contains no KMKE row** (see gaps). | ZAU LOA Appendix C "From MKE/VOK Approach Controls to ZMP": MKE TRACON airspace landing **KCWA/KAUW/KMFI — descending to 8,000 or level AOB 8,000**; landing **KISW / KSTE — AOB 6,000 / descending to 4,000 / AOB 4,000** (column alignment mangled, see §3.11). **MKE may not descend below 4,000 within 5 NM of KATW** (para 5.c.3.b). | `ZAU_ZMP_Approach_Controls_LOA` **7/8/2026** + Minor Ref **1/1/2015** |
| **VOK** Volk RAPCON *(ZAU re-delegation; ZMP delegates the underlying airspace)* | KVOK; also KPCZ, KLSE, KCWA, KAUW, KMFI, KSTE, KISW appear as VOK-departure destinations | ZAU LOA Appendix A: "**ZMP Delegates to ZAU At or Below 10,000 (ZAU Re-Delegates to VOK When Operational)**"; the diagram shows "VOK KVOK AOB 100" | ZMP **04** named in the KVOK arrival row of Appendix B | Appendix B, From ZMP, KVOK: "From ZMP 04 — **Level AOB 13,000**"; "**Descending to 7,000 or Level AOB 7,000**"; "AOA 11,000 — **Cross Lateral Limit of VOK Airspace at 11,000**" (row-to-qualifier mapping is mangled — see §3.11) | Appendix C "VOK RAPCON Airspace": landing **KPCZ**, landing **KLSE AOA 6,000 — descending to 6,000**, landing **KCWA/KAUW/KMFI/KSTE/KISW AOA 8,000 — descending to 8,000** (mangled) | `ZAU_ZMP_Approach_Controls_LOA` **7/8/2026** |
| **AZO** Great Lakes TRACON *(ZAU-owned)* | not stated in the LOA text; Appendix B rows KGRR/KMKG and KFLD/KSBM/KOSH reference the **ZMP/AZO boundary** | ZAU LOA Appendix A ASCII: "AZO ... AOB 100" (LOW CONFIDENCE) | not stated | Appendix B, From ZMP: **KGRR, KMKG AOA 11,000 — descending to 11,000**; **KFLD, KSBM, KOSH AOB 10,000 — at assigned altitude 5 NM from the ZMP/AZO boundary** (grouping is LOW CONFIDENCE, see §3.11) | not stated in `ZAU_ZMP_Approach_Controls_LOA.txt` | `ZAU_ZMP_Approach_Controls_LOA` **7/8/2026** |

### Facilities in the Minor Reference only (no dedicated LOA in this set)

| Facility | Delegated airspace | Arrivals descend to | Departures climb to | IFR initial (jets/props) | Hours | Squawk (VFR/IFR) |
|---|---|---|---|---|---|---|
| Grand Forks (GFK) ATCT / Grand Forks AFB (RDR) ATCT & RAPCON | SFC-10,000 | 11,000 | 10,000 | 3,000 (GFK), 5,000 (RDR) | GFK ATCT 0600-2330 LCL; RDR ATCT 0600-2300 LCL ex. Holidays; RDR RAPCON 24h ex. Holidays | 0101-0177 / 0301-0377 |
| Magic City (MOT) / Minot AFB (MIB) ATCT & Dakota ATC Facility RAPCON | SFC-FL230 | 11,000 | FL230 | FL230 | 0600-2100 LCL | 0270-0277 / 0401-0477 |
| Alpena (APN) ANG RAPCON | SFC-12,000 * | 13,000 * | 12,000 * | 4,000/4,000 * | 0800-1600 LCL (Weekdays ex. Holidays) | 0201-0277 / 0301-0377 * |
| Grand Rapids (GRR) ATCT/TRACON [ZAU] | SFC-10,000 | 11,000 | 13,000 | Per ZAU | 0530-2400 LCL (ZAU when closed) | Per ZAU |
| Muskegon (MKG) ATCT/TRACON [ZAU] | SFC-10,000 | 11,000 | Per ZAU | Per ZAU | 0600-2300 LCL (ZAU when closed) | Per ZAU |
| Saginaw (MBS) ATCT/TRACON | SFC-10,000 (Shelves SFC-3,000) * | 11,000 * | Per ZOB * | Per ZOB * | 0600-2300 LCL (ZAU when closed) | Per ZOB * |
| Central Wisconsin (CWA) ATCT | Class D SFC-3,800 | APP/DEP by ZMP | APP/DEP by ZMP | 3,000 | 0600-2200 LCL | APP/DEP by ZMP |
| Eau Claire (EAU) ATCT | Class D SFC-3,500 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | 0530-2030 LCL | APP/DEP by ZMP |
| Grand Island (GRI) ATCT | Class D SFC-4,300 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | 0700-2000 LCL | APP/DEP by ZMP |
| Grayling (GOV) ATCT | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | By NOTAM | APP/DEP by ZMP |
| La Crosse (LSE) ATCT | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | 0600-2100 LCL | APP/DEP by ZMP |
| Camp Ripley (RYM) AAF | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 3,000 | 1400-2200Z M-F (or by NOTAM) | APP/DEP by ZMP |
| Sawyer/Marquette (SAW) ATCT | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | 0600-2200 LCL | APP/DEP by ZMP |
| St. Cloud (STC) ATCT | Class D SFC-3,500 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | 0700-2300 LCL | APP/DEP by ZMP |
| Traverse City (TVC) ATCT | Class D SFC-3,100 * | APP/DEP by ZMP * | APP/DEP by ZMP * | 5,000 * | 0700-2100 LCL (STD), 0700-2200 LCL (DST) | APP/DEP by ZMP * |

`*` = the `pdftotext` output for this block has the facility title printed **on the "Delegated
Airspace:" label line**, which pushes every value up one row relative to its label. The values in
the row above are the de-shifted reading and are **LOW CONFIDENCE**; the verbatim blocks are in
§4. All un-starred rows were printed in correct label→value alignment.

---

## 3. Per-LOA detail — distinctive rules

### 3.1 ZMP / M98 — `LOA_ZMP_M98.txt`, EFFECTIVE March 31, 2026

**Numbering anomaly (important for citing):** after paragraph 4.g the document restarts at
"**(5) RUNWAY 17-22 LANDING CONFIGURATION PROCEDURES**" at the top indent level, then continues
"5. MIDNIGHT OPERATIONS", "6. ATTACHMENTS". Also, inside 4.g.(3) the sub-letters run
(a)(b)(c)(d) and then **repeat** (c)(d)(e)(f)(g). Cite carefully — there are two 4.g.(3)(c) and
two 4.g.(3)(d).

**Scope & word meanings.** ZMP delegates M98 the Attachment A airspace for IFR **at and below
17,000 ft MSL** (para 2). Altitudes MSL in hundreds of feet, `110 = 11,000` (3.a); courses,
tracks and headings are magnetic (3.b).

**Radar procedures (para 4a–4e).**
- Aircraft entering ZMP from M98 need **at least 5 NM constant or increasing** radar separation when radar vectored for the same fix on similar tracks (4.a).
- **ZMP releases control for descent and turns ±30° from assigned heading/course to M98 when aircraft are within 10 NM of the ZMP/M98 boundary.** M98 makes any needed point-outs to other ZMP sectors **or RST approach** (4.b).
- **M98 releases control of departing aircraft to ZMP when the aircraft is at least 25 NM from the MSP DME or leaving 110.** ZMP makes needed point-outs to other M98 sectors (4.c).
- M98 may use **7110.65 para 5-5-4** divergence minima M98→ZMP provided (1) applied only to diverging courses/routes, in-trail aircraft excluded; (2) **M98 keeps communications with at least one aircraft until 3 miles lateral is attained and divergence is ensured** (4.d).
- Beacon codes: normal vNAS-assigned codes at all times except when vNAS is out of service (4.e).

**Departures (4.f).** SIDs in Attachment B. M98 issues enroute clearance provided:
- (2)(a) aircraft are **cleared at 170 or below**;
- (2)(b) departures **filed 060 and below** are cleared as filed at an altitude appropriate for direction of flight;
- (2)(c) departures **filed 070 or 080** must be on a heading or course to clear MSP **and satellite STAR arrival areas** at an altitude appropriate for direction of flight;
- (3) departures **filed 090 and above** must be established in the appropriate ZMP sector, clear of STAR arrival areas, on (a) the appropriate MSP/satellite SID, or (b) a heading to join the SID **within 60 NM of the MSP DME**, or (c) **M98 satellite departures previously routed via the DWN SID must be routed via INUNE GENEO DKOTA**, or (d) for non-SID-qualified aircraft an assigned heading per Table 1;
- (4) **prop aircraft requesting 120 or higher must be climbed to or level at 120.**

**TABLE 1. Non-SID headings to ZMP** (4.f.(3)(d)) — exact values:

| ZMP sector | Condition | Heading range |
|---|---|---|
| Sector 10 | West of the GEP/BAINY STAR | 290° – 300° |
| Sector 10 | East of the GEP/BAINY STAR | 350° – 020° |
| Sector 09 | North of the ENCEE STAR | 265° – 285° |
| Sector 08 | South of the TORGY STAR | 210° – 240° |
| Sector 07 | East of the KASPR/BLUEM | 140° – 160° |
| RWA | South of the KKILR STAR | 100° – 130° |
| Sector 06 | North of the AGUDE STAR | 040° – 060° |

**Arrivals (4.g).** STARs in Attachment C; **the clearance limit fix for arrivals is the
destination airport** (4.g.(2)).

**TABLE 2. Runway transitions assigned by ZMP** (4.g.(3)(b)) — exact values:

| MSP config | BAINY | MUSCL | KKILR | NITZR | BLUEM | TORGY |
|---|---|---|---|---|---|---|
| 12 | 12L | 12L | 12R | 12R | 12R | 12R |
| 12/17 | 12L | 12L | 12R | 12R | 12R | 12R |
| 30 | 30R | 30R | 30L | 30L | 30L | 30L |
| 30/17 | 30R | 30R | 30L | 30L | 30L | 30L |
| 30/35 | 30R | 30R | 30L | 30L¹ | 30L¹ | 30L |
| 17/22 | 17 | 22 | N/A | 22 | 22 | 17 |

¹ "M98 and ZMP CIC/TMU will collaborate which aircraft will be issued the runway 35 transition."

- ZMP "**Descend Via**" phraseology **must include a runway transition** (4.g.(3)(b)).
- **Heavy jet arrivals must be assigned the Runway 12R/30L transition** (4.g.(3)(c)).

**Transfer-of-communications fixes for RNAV STAR arrivals into M98** (4.g.(3)(d) — "no later than"):

| STAR | TORGY | BAINY | MUSCL | KKILR | BLUEM | NITZR |
|---|---|---|---|---|---|---|
| Fix | OFSON | LUCCY | BAYKS | KKILR | BLUEM | NITZR |

- ZMP must **verbally coordinate any turbojet cleared via a conventional STAR** with the appropriate M98 sector, cross the boundary at LOA altitudes, and de-conflict with OPD traffic (second 4.g.(3)(c)).
- ZMP must **verbally coordinate any assigned speed that deviates from the published RNAV STAR speeds**, except speeds that are part of a TMU initiative (second 4.g.(3)(d)).
- **Runway 30/17 configuration:** "Knock It Off" procedures on the **NITZR and BLUEM** arrivals — **no "Descend Via" issued**, runway transitions still issued, any non-published speed must be coordinated: **NITZR — cross WRSAW at and maintain 110; BLUEM — cross HHAMR at and maintain 100.** NOTE: M98 will verify assigned altitude (4.g.(3)(e)).
- **ZMP Sector 7 must give M98 a minimum of 5 miles in-trail between arrivals on the same STAR, and 7 miles staggered spacing between arrivals on parallel STARs** (4.g.(3)(f)).

**TABLE 3. "Knock It Off" OPD crossing altitudes** (4.g.(3)(g)) — applies when MSP is landing
Runway 4, 22, 17, 17/22, 22, "or anytime either facility has an operational necessity to
discontinue the OPD portion of the STAR":

| Arrival | Crossing restriction |
|---|---|
| MUSCL | Cross BAYKS at and maintain 120 |
| KKILR | Cross HUGGI at and maintain 100 |
| BLUEM | Cross HHAMR at and maintain 100 |
| NITZR | Cross WRSAW at and maintain 110 |
| TORGY | Cross OFSON at and maintain 110 |
| BAINY | Cross LUCCY at and maintain 110 |

Notes to Table 3: (1) **cross the M98 boundary at the published speed of 280 kts** unless
otherwise coordinated; (2) coordination through M98 CIC/TMU and ZMP CIC/TMU; (3) **ZMP/M98 may
invoke "Knock It Off" at individual gates regardless of runway configuration** when operational
necessity dictates.

**Non-RNAV arrivals (4.g.(4)).** To the extent practical all turbojet/turboprop aircraft must be
routed via STARs. Turbojets not on a conventional STAR must be coordinated, on a heading through
an arrival gate to approximate direct MSP, **at the appropriate "knock it off" altitude for the
gate**. Turboprops not on a conventional STAR must be coordinated, direct MSP through an arrival
gate or on a heading through a gate to approximate direct MSP, **at 070**.

**TABLE 4. Conventional STAR crossing altitudes** (4.g.(5)) — exact values:

| Group | Aircraft | STAR | Crossing restriction |
|---|---|---|---|
| MSP Arrivals | Turbojets | GEP | OLLEE at 110 |
| MSP Arrivals | Turbojets | KASPR | DELZY at 100 |
| MSP Arrivals | Turboprops | GEP — Landing 12s | OLLEE at 70² |
| MSP Arrivals | Turboprops | GEP — Landing 30s or 30/35 | OLLEE at 90 |
| Satellite Arrivals | Turbojets | AGUDE | AGUDE at 80 |
| Satellite Arrivals | Turbojets | ENCEE | RIXIE at 80 |
| Satellite Arrivals | Turbojets | GEP | OLLEE at 70¹ |
| Satellite Arrivals | Turbojets | TWOLF | TRGET at 70 |
| Satellite Arrivals | Turboprops | AGUDE | AGUDE at 60 |
| Satellite Arrivals | Turboprops | ENCEE | RIXIE at 70 |
| Satellite Arrivals | Turboprops | GEP | OLLEE at 70² |
| Satellite Arrivals | Turboprops | TWOLF | TRGET at 70 |

¹ 6,000 ft when MSP is landing Runway 17.  ² 5,000 ft when MSP is landing Runway 17.

**Other arrival specifics (4.g.(6)–(17)):**
- (6) **STP, ANE and FCM arrivals routed over BITLR must be assigned direct GEP and cross BITLR at 060.**
- (7) FCM and LVN arrivals entering M98 **south of RGK** may be routed **direct FGT direct destination without coordination**: (a) MSP landing 30s, 30/17, 30/35 → **040**; (b) any other runway configuration → **040 or 060**.
- (8) FCM and LVN arrivals from **ZMP Sectors 08 and 09** may be cleared direct destination at **5,000 ft**; may still be cleared via the TWOLF or ENCEE Arrival.
- (9) FCM arrivals from **ZMP Sector 10** may be issued direct FCM **west of the GEP arrival gate at or below 050**.
- (10) **All piston aircraft terminating in M98 airspace must enter M98 satellite airspace at or below 060** at an altitude appropriate for direction of flight.
- (11) **STC departures landing MSP and M98 satellites must enter M98 airspace at 050.** When runways other than 12L/R are in use, turbojets/turboprops departing STC landing MSP must be on a STAR arrival at the appropriate altitude.
- (12) **MKT departures landing M98 satellite airports must enter M98 airspace cleared as filed at 050.**
- (13) **ZMP must have control for descent to 100 on aircraft exiting M98 airspace landing RST when the aircraft are 25 NM from the MSP DME.**
- (14) **Aircraft landing OEO, RNH or RGK from the east (through Sector 5) must be level at, or descending to, 040. M98 must have control when aircraft are within 10 NM of the M98 boundary.**
- (15) **Aircraft landing STC or MKT will enter ZMP airspace at or descending to 040. ZMP has control on contact.**
- (16) **When ZMP assumes RST airspace outside RST's normal hours:** turboprops via the **KASPR STAR must cross DELZY at 070**, and **all piston aircraft terminating in M98 airspace must exit RST airspace at 060**.
- (17) Frequencies: ZMP assigns frequencies to arrivals/overflights **as depicted in Attachments D-1 through D-11** — UNREAD, picture-only.

**RUNWAY 17-22 LANDING CONFIGURATION PROCEDURES** (the mis-numbered "(5)"):
- *a. Departures* — all existing routes unchanged **except**:
  - (1) Jets filed the **WLSTN SID** must be vectored **north of the AGUDE gate** and assigned a heading to join WLSTN; normal altitudes.
  - (2) Turboprops filed the WLSTN SID **or over EAU, 7,000 MSL or higher**, must be cleared via the **COULT SID to COULT, direct EAU, direct next flight-planned fix**.
  - (3) Jets and turboprops filed to/over **DLH, EVM, RZN, HIB** must be vectored **west of the AGUDE gate** to enter **Sector 6** on an assigned heading **between 020° and 040°**; normal altitudes.
  - (4) Jets and turboprops filed to/over **BRD** must enter **Sector 10 west of OLLEE** on a heading **between 290° and 310°**; normal altitudes.
  - (5) **STP, ANE and MIC northbound departures are exempt** and must exit M98 airspace on a heading **between 350° and 010°**.
  - (6) Departures filed at **5,000 or 6,000** must be on a heading to clear the **GOPHER and AGUDE satellite STAR arrival areas**.
  - (7) M98 may clear **KBREW SID** traffic **direct KBREW from positions south of the SID**.
- *b. MSP arrivals* — Knock It Off in effect: (1) **turboprops cross OLLEE at 5,000**; (2) **turboprops cross TWINZ at 6,000**; (3) **all KKILR/WILDD arrivals are prohibited.**
- *c. Satellite arrivals* —
  - GOPHER: **jets cross OLLEE at 6,000**, **turboprops cross OLLEE at 5,000**; **M98 must have control for descent of GEP STAR satellite traffic within 10 NM of the M98/ZMP boundary.**
  - AGUDE: **STP traffic must be assigned the AGUDE STAR**; **FCM traffic normally over AGUDE must be routed over BITLR, direct FGT direct FCM, crossing BITLR at 6,000 — APREQ not necessary**; **jets cross AGUDE at 6,000**, **turboprops cross AGUDE at 5,000**; **stacks at AGUDE for aircraft landing the same airport are not authorized**; **M98 must have control for descent of AGUDE traffic within 10 NM of the M98/ZMP boundary.**
- *d. Overflights* — **the triangular airspace north of MSP between and including the Runway 17 and 22 ACDAs must be avoided from all directions below 13,000 ft MSL.**

**MIDNIGHT OPERATIONS (para 5)** — "When coordinated (**between the hours of 2230 and 0530 local**)":
- ZMP: (1) clear all traffic landing inside M98 **direct to the destination airport**; (2) **pilot-discretion descent to 10,000** for aircraft at/above 10,000; (3) arrivals at or below 10,000 **remain at altitude**; (4) **ZMP assigns all aircraft entering M98 airspace frequency 124.7 (MSP_R_APP)**.
- M98: (1) clear departures **via the first fix in the route**; (2) point out departures to any affected Center position; (3) **climb turboprops/props to 17,000, or lower if requested**.

**Attachments (para 6)** — A: ZMP Area/Sector Map and Frequencies; B: SIDs; C: Conventional STARs;
D: MSP RNAV STARs; D-1 through D-11: Approach Control Airspace and Frequencies. **All 15 attachment
pages are picture-only** — see §5.

### 3.2 ZMP / R90 (Omaha TRACON) — `LOA_ZMP_R90.txt`, EFFECTIVE November 6, 2023

- **Scope (3):** at and below **15,000** over **R90 East and West**; **at or below 10,000** over **R90 LNK**.
- **R90 must notify ZMP of the runway in use** (4.a.1) — that is the only notification item listed.
- **All arrivals (4.b.1):** R90 has control for **code changes**; **R90 may level all R90 arrivals at the ZMP-assigned altitude without coordination**, ZMP handling coordination with other ZMP sectors **provided the aircraft is left on course**; the R90 sector taking the handoff owns internal point-outs.
- **STAR arrivals (4.b.2):** **From 0730 to 2130 LCL Monday through Friday, all aircraft at or above 16,000 landing OMA or OFF must be assigned a STAR** (4.b.2.a). Level at or descending to **16,000** (or **17,000 stacked on the STARs**) (b). Over **SUX/MZEEE**: level or descending to **11,000** (c). **R90 has control on all STAR arrivals at or below FL230 for descent and turns up to 30° on initial contact** provided the aircraft won't enter another controller's airspace (d). **ZMP-assigned speeds on STAR inbounds need no coordination with R90** (e).
- **All other arrivals (4.b.3)** — satellites, and OMA/OFF during non-STAR periods: must be **direct destination or a destination approach fix**; R90 East/West at or descending to **16,000** or level at or below **15,000**; R90 LNK at or descending to **11,000** or level below **11,000**; **R90's acceptance of a handoff of an aircraft in level flight constitutes approval of an inappropriate altitude for direction of flight** (a). Arrivals over SUX Approach level or descending to **11,000** (b). R90 control at or below FL230 for descent and ≤30° turns on initial contact (c). **Lincoln-sector arrivals from the east above 15,000 must be handed off to Omaha Radar West Sector; ZMP 27 is responsible for coordination with ZMP 26** (point out or flash through automated information transfer) (d).
- **Overflights (4.c):** the R90 sector accepting the handoff owns internal point-outs.
- **Departures (4.d):**
  1. R90 climbs all R90 departures to requested altitude **or the top of R90's airspace, whichever is lower**.
  2. **While the STARs are active**, aircraft off OMA and OFF requesting above 15,000 must be vectored clear of the STAR arrival areas, nearest their route, on these headings:

     | Position | Heading |
     |---|---|
     | Between the ZMP Sector 26/27 boundary and the LANTK STAR | 360° – 030° |
     | Between LANTK and MARWI STARs | 090° – 110° |
     | Between MARWI and TIMMO STARs (except aircraft filed on the RBA arrival or J41, which shall be established on course) | 150° – 185° |
     | Between TIMMO and HOWRY STARs | 220° – 250° |
     | Between the HOWRY STAR and the ZMP Sector 26/27 boundary | 280° – 320° |

     f. **OBH/LBF departures shall go north of the HOWRY STAR when Omaha Eppley is in a north flow and south of the HOWRY STAR when in a south flow.**
     g. **SLN/PWE/ICT departures shall go west of the TIMMO STAR when Omaha Eppley is in a north flow and east of the TIMMO STAR when in a south flow.**
  3. All **satellite** departures requesting above 15,000 out of R90 East/West must be assigned headings to miss the STARs.
  4. **All aircraft departing R90 LNK sectors must be cleared on course.**
  5. **ZMP has control to climb R90 LNK departures requesting above 10,000 that will traverse, or be within 2.5 miles of, the R90 west shelf over R90 LNK.** R90 LNK is responsible for coordinating with R90 West.
  6. **When STARs are off, all R90 aircraft must be on course.**
  7. **ZMP acceptance of a handoff of an R90 satellite departure = approval to climb to requested altitude or the top of R90's airspace, whichever is lower (15,000 East/West, 10,000 LNK), provided the aircraft is established within R90's airspace. If the departure is within 2.5 miles of the common ZMP/R90 boundary or in ZMP airspace, an approval request is required.**
  8. **ZMP must have control for turns up to 30° on aircraft exiting R90's airspace**; R90 owns the resulting internal point-outs.
  9. **ZMP must have control for code changes.**
  10. **ZMP may level all R90 departures at R90-assigned altitudes without coordination**; R90 owns internal point-outs.
- Attachments: A = R90 delegated airspace; B = Omaha STARs, with the footnote "**\*Sioux City/Pawnee City Arrivals replaced by AANDY/TIMMO Arrivals.**" Both are picture-only.

### 3.3 ZMP / DSM — `LOA_ZMP_DSM.txt`, EFFECTIVE August 3, 2026

- **Responsibilities (4):** DSM provides ATC to aircraft **10,000 ft MSL and below** inside ZMP airspace per Attachment A.
- **ZMP to DSM (5.a):** clear arrivals **11,000 and above to descend and/or maintain 11,000**; ensure arrivals landing in DSM airspace and overflights below 10,000 are at or climbing/descending to **final** altitude (excluding aircraft descending through the top of DSM airspace); release control to DSM for **turns not to exceed 45° from the transferring sector** (DSM makes the resulting point-outs), **descent** on aircraft landing in DSM airspace, and **beacon-code changes**.
- **DSM to ZMP (5.b):** **climb departures to 10,000 or final altitude if lower**; clear IFR overflights below 10,000 to maintain final altitude — climbing/descending to final needs no manual coordination, **but any altitude change after a radar handoff is initiated must be manually coordinated**; **descend Creston, IA (CSQ) and Jefferson, IA (EFW) arrivals to 4,000**; release control to ZMP for turns **up to and including 45°** (DSM owns internal coordination), for **descent on arrivals to CSQ, EFW, Mason City IA (MCW), Hampton IA (HPT), Decorah IA (DEH), West Union IA (3Y2), Forest City IA (FXY)**, and for **beacon-code changes**; **departures exiting DSM airspace south of the DSM 230 radial must be established on their flight-plan route or given a heading to join the route within DSM's lateral boundaries** (all other departures on route or on a heading to join it); **successive aircraft entering ZMP airspace must have 5 NM spacing, constant or increasing**.
- **General (6):** if **ZMP** initiates a clearance to DSM for a departure **east of the ZMP/ZAU boundary** to climb above 10,000, **ZMP** coordinates with ZAU; if **DSM** requests the climb approval east of that boundary, **DSM** coordinates with ZAU (6.a). Transfer of control occurs when the radar handoff **and** frequency change are complete (6.b).
- **DSM Approach frequencies (6.c.(2))** — the only explicit frequency list in the terminal LOAs other than M98 midnight ops:

  | Controller symbol | Frequency |
  |---|---|
  | A | 135.2 |
  | D | 123.9 |
  | S | 120.45 |
  | W | 118.9 |

  ZMP frequencies are "as depicted in Attachments A and B" — picture-only, UNREAD.
- Attachments: A = **DSM** sector delegated airspace, frequency assignments and fixes; B = **ALO** sector delegated airspace, frequency assignments and fixes. Both picture-only.

### 3.4 ZMP / RST — `LOA_ZMP_RST.txt`, EFFECTIVE December 27, 2023

- **Responsibilities (4):** delegated area is "as depicted in Attachment 'A'" — **no numeric ceiling appears in the text**. A "**15,000-foot shelf**" is referenced at 5.C.(2), and 5.B.(2)(a) implies vertical limits at **9,000** and **15,000**.
- **Arrivals (5.A):** clearance limit = destination airport. Arrivals at/above 10,000 **descending to or level at 10,000**, **except arrivals over Waterloo Approach: descending to or level at 11,000**. RST may descend and/or turn **≤30°** if it doesn't affect another Center sector or approach control, and **may issue the descent at pilot's discretion**. Automated handoffs: acceptance of a level-flight Mode-C aircraft constitutes altitude approval, **but not approval for wrong altitude for direction of flight**; non-Mode-C altitudes coordinated at or prior to handoff.
- **Departures (5.B):** **upon leaving 5,000** the Center may turn ≤30° and/or climb, if it doesn't affect another Center sector or approach control. Enroute clearance without Center approval: **departures requesting at or below RST's vertical limits are cleared to the requested altitude; departures requesting higher are cleared to 9,000, or 15,000 as appropriate.** Sub-note: **RST departures into ZMP Sector 05 filed above 15,000 require a point-out to ZMP Sector 21 — Sector 05 makes the point-out.**
- **MSP arrivals (5.C):** **if a turbojet filed to MSP is handed off to ZMP Sector 7, assign the BLUEM STAR to all RNAV-capable turbojets and the KASPR STAR to all non-RNAV turbojets.** NOTE — **if RST points the aircraft out to ZMP Sector 07 instead, RST must verbally coordinate with M98 all turbojets on the KASPR STAR.** M98-area turboprops at/above 10,000 that will **not** transit the 15,000-ft shelf: at or descending to **10,000**; aircraft filed **through the lateral limits of the shelf** at/above 14,000: at or descending to **14,000**; all others at flight-plan altitude. **RST may have control for descent of M98 turboprop arrivals when within 10 miles of the Approach boundary.**
- **M98 departures (5.D):** **for all M98-area departures filed 15,000 or below, climbing to requested altitude is approved by RST without further coordination.**
- **MCW traffic (5.E):** RST **releases control for descent and turns of ±30° on aircraft landing MCW**; RST **approves MCW departures climbing to the requested altitude posted on the flight progress strip.**
- **General (6):** restricted departures told to expect further clearance to filed altitude 10 minutes after departure. **When RST Approach/Tower is not operational, its delegated airspace and control responsibility revert to the Center, Sector 07.**
- Cross-reference: M98 LOA 4.g.(13) ("ZMP must have control for descent to 100 on aircraft exiting M98 airspace landing RST when 25 NM from the MSP DME") and 4.g.(16) (ZMP-assumes-RST-airspace altitudes).

### 3.5 ZMP / GRB — `LOA_ZMP_GRB.txt`, EFFECTIVE March 17, 2020

- **Responsibilities (3):** during published hours GRB Tower controls IFR/SVFR **at 13,000 MSL and below** inside ZMP airspace, **and 4,000 MSL and below for the portion underlying ZMP Sectors 03 and 04**, per Attachment A.
- **Arrivals (4.a):** clearance limit = destination airport. Arrivals **at or above 14,000 shall be descending to or level at 14,000**; **arrivals at or below 13,000 landing Green Bay or satellite airports shall be handed off to the satellite controllers**. **Transfer of control of all aircraft shall be within 10 NM of the boundary** unless otherwise stated, provided approach alters the route by no more than **30° either side of course** and ensures the course change doesn't affect another facility's airspace. Automated handoffs: acceptance of a Mode-C aircraft in level flight at or below 13,000 constitutes altitude approval.
- **Departures (4.b):** enroute clearance without Center approval provided **departures are cleared at 13,000 MSL or below, except MNM departures which are cleared at 4,000 MSL or below**, and **approach confines all departures within its delegated airspace until the radar handoff is completed**.
- **General (5):** **aircraft exiting Green Bay Approach landing at Central Wisconsin, Wausau and Stevens Point are ZMP's control once the aircraft has crossed V191.**
- **Center-assigned frequencies (5.b)** — arrivals/overflights at or below 13,000: **126.3** for aircraft landing **Appleton**; **120.2** for aircraft landing **Manitowoc, Menominee and Sturgeon Bay**. Green Bay arrivals at or above 14,000: **119.4** for aircraft landing **Green Bay**.

### 3.6 ZMP / DLH — `LOA_ZMP_DLH.txt`, EFFECTIVE March 17, 2020

- **Scope (3):** DLH Tower controls IFR/SVFR **at 12,000 MSL and below, and at 8,000 MSL and below**, within ZMP airspace per Attachment A. (The text does **not** state in prose which sub-area carries 8,000; 4.a.2 identifies the "**Hibbing shelf** (see shaded area on Attachment 'A')" as the 9,000-arrival area, and `ZMP_Minor_TRACON_Reference` calls it "HIB SFC-8,000".)
- **Arrivals (4.a):** clearance limit = destination airport. Arrivals at/above 13,000 **descending to or level at 13,000**, **or 9,000 over the Hibbing shelf**. DLH may descend and/or alter route **≤30° either side** provided the aircraft is **within 10 miles of DLH's airspace** and it doesn't affect another Center sector. Automated handoff acceptance of Mode-C level flight at/below 12,000 = altitude approval.
- **Departures (4.b):** with automated handoffs, **issue FL230 or the requested altitude if lower, after ZMP has accepted the handoff** (ZMP advises before accepting if a different altitude will be assigned). **After the handoff and frequency change and once the departure has reached 8,000, ZMP may alter heading and/or route — maximum turn 30° either side.**
- **General (5):** the Center assigns **125.45** to arrivals/overflights (5.a.1); the Tower assigns departure/overflight frequencies per Attachment A (picture). **All Duluth departures to MSP assigned the BAINY/GEP STAR are handed off to Sector 10; any required point-outs of this traffic to Sector 25 are accomplished by Sector 10** (5.b).

### 3.7 ZMP / BIS — `LOA_ZMP_BIS.txt`, EFFECTIVE 4 August 2020

- **Responsibilities (III):** during published hours BIS controls IFR/SVFR **at 15,000 MSL and below** in the Attachment A airspace.
- **Open/close (IV):** BIS must **verbally coordinate with ZMP when opening and closing** ("ref. 7110.65 Ap. D Transfer of Position Responsibility, BIS 7110.65A Ap. B"); during closures the delegated airspace **reverts to ZMP**; the assuming facility obtains equipment/conditions/procedures status; the divesting facility briefs airport conditions, approach in use, equipment status, TMU initiatives, special activities and traffic; then transfers control of all aircraft and releases the airspace.
- **Radar (V):** **radar handoffs between the facilities are mandatory as depicted on Attachment A** (V.a). Clearance limit = destination airport. **Arrivals shall be descending to or level at 8,000.** Automated handoffs: acceptance by BIS of a Mode-C aircraft in level flight at or below 15,000 constitutes altitude approval **on over-flight traffic and arrivals 7,000 MSL and below**. After receiving a handoff from ZMP, **BIS has control for descent and to alter heading/route, maximum 30° either side of ground track.**
- **Departures (V.c):** BIS may issue enroute clearances without ZMP approval if **cleared to 15,000 or below**; restricted aircraft told "**Expect (requested altitude) 10 minutes after departure**"; **after ZMP accepts the handoff, BIS ensures the aircraft is at or climbing to the requested altitude or FL230, whichever is lower** (ZMP advises BIS before accepting if a different altitude will be assigned); after the handoff ZMP may turn ≤30° either side of ground track.
- **General (VI):** when BIS is not operational, delegated control and airspace revert to ZMP.
- **Military training routes (VII) — distinctive:** aircraft using **IR644** (depicted on Attachment A) are **transferred using non-radar procedures**; radar handoffs may be used if non-radar is deemed unnecessary. BIS and ZMP **need not advise each other when the aircraft is in/out of the other's airspace**, as non-radar procedures would normally expect. **ZMP forwards to Bismarck Approach an estimated time for Point "R". BIS makes the frequency change to Minneapolis Center at Point "V".**

### 3.8 ZMP / FAR — `LOA_ZMP_FAR.txt`, EFFECTIVE January 17, 2021

- **Responsibility (3):** FAR Tower controls IFR/SVFR **at 10,000 MSL and below** in ZMP's airspace per Attachment A. **The airspace northwest of Detroit Lakes, at and below 4,000 MSL, is retained by Minneapolis Center for IFR approaches into Detroit Lakes** — the 4,000-ft shelf is shown by "hash marks" on Attachment A.
- Title of para 4 is "**RADAR/CENRAP PROCEDURES**" (only LOA in this set to mention CENRAP).
- **Arrivals/overflights (4.a):** clearance limit = destination airport. **Arrivals descending to or level at 8,000, except arrivals from the north over Grand Forks Approach Control's airspace: descending to or level at 11,000**, unless otherwise coordinated. Automated handoffs: acceptance of an **over-flight** with Mode C in level flight at/below 10,000 = altitude approval; **the altitude of non-Mode-C arrival aircraft at and below 10,000 shall be manually coordinated**. Approach may descend/turn **≤30° either side** if the arrival is **within 10 miles of the lateral limits** of its airspace and the change **does not affect Grand Forks Approach without coordination**. **Manual radar handoffs shall be made with reference to FAR VORTAC or other commonly displayed radar fixes.**
- **Departures (4.b):** enroute clearance without Center approval if **cleared at 10,000 MSL or below**, restricted aircraft told to "expect (filed altitude) 10 minutes after departure". With automated or manual handoffs, **approach issues FL230 or the requested altitude, whichever is lower, after the Center has accepted the handoff** (Center advises verbally before accepting if a different altitude will be assigned). **After leaving 8,000 the Center has control of departures for turns up to 30° either side of course.**

### 3.9 ZMP / SUX — `LOA_ZMP_SUX.txt`, EFFECTIVE September 10, 2022

- **Responsibilities (3):** during published hours SUX Tower controls IFR/SVFR **at 10,000 MSL and below** in the Attachment A area.
- **Arrivals (4.a):** **descending to or level at 11,000**. IFR transfer of control for **30°** turns and descent occurs when (a) the radar handoff is received and the frequency change completed, **and** (b) the course/altitude change doesn't affect another approach control without coordination, **and** (c) **the alteration of course or altitude is not made within the lateral limits of Center Sectors 26 and 27**. Automated handoffs: acceptance of a Mode-C aircraft in level flight **below** 10,000 constitutes altitude approval; non-Mode-C aircraft verbally coordinated.
- **Departures (4.b):** with automated handoffs approach issues **requested altitude or FL230, whichever lower, after the Center accepts the handoff**. **The Center may alter route ≤30° either side provided the departure is at or above 9,000, or if below 9,000 is more than 25 NM from the Sioux City Airport.**
- **General (5) — airspace lending, distinctive:**
  - Tower informs restricted departures "**Expect further clearance to (filed altitude) 10 minutes after departure**".
  - **SUX coordinates and controls arrivals to Le Mars, Iowa; Mapleton, Iowa; Vermillion, South Dakota; and Wayne, Nebraska — and advises the Center when the additional airspace is no longer needed.**
  - **ZMP coordinates and controls arrivals to Yankton, South Dakota (ILS Rwy 31 and NDB Rwy 31); Ida Grove, Cherokee and Orange City, Iowa — and advises approach control when the additional airspace is no longer needed.**

### 3.10 ZMP / FSD — `LOA_ZMP_FSD.txt`, EFFECTIVE September 10, 2022

- **Responsibilities (3):** during published hours FSD Tower controls IFR/SVFR in the Attachment A area **at and below 10,000 MSL**.
- **Arrivals (4.a):** clearance-limit fix = destination airport. **Descending to or level at 8,000, except when a higher altitude is required for separation of traffic (example: multiple arrivals).** **Arriving traffic from over Sioux City Approach Control delegated airspace shall be descending to 11,000.** After the radar handoff and frequency change FSD may descend and/or turn **≤30°**, but not if it will affect another sector or approach control. Automated handoffs: Mode-C level at/below 10,000 = altitude approval; **no-Mode-C arrivals coordinated at or prior to handoff**.
- **Departures (4.b):** after the handoff ZMP may turn **≤30°**, not if it affects another sector or approach control. With automated handoffs FSD issues **requested altitude or FL230, whichever lower, after the Center accepts the handoff** (Center advises verbally before accepting if a different altitude will be assigned). **ZMP Sectors 33 and 37 shall accomplish all necessary coordination for aircraft climbing above 10,000 MSL prior to acceptance of a radar handoff.**
- **General (5):** the Tower assigns Center frequencies as depicted on Attachment A (picture — UNREAD), informs restricted departures to "Expect (filed altitude) 10 minutes after departure", and accomplishes required coordination if a transfer of control has been made and/or the route is changed to affect a Center sector; and accomplishes required coordination for arrivals crossing Center sector boundaries within Center altitudes (5.b).

### 3.11 ZAU / ZMP Approach Controls — `ZAU_ZMP_Approach_Controls_LOA.txt`, EFFECTIVE 7/8/2026

Parties: VATSIM Chicago ARTCC (ZAU), VATSIM Minneapolis ARTCC (ZMP), and the approach controls
**Des Moines TRACON (DSM), Great Lakes TRACON (AZO), Green Bay TRACON (GRB), Milwaukee TRACON
(MKE), Rochester TRACON (RST), and Volk RAPCON (VOK)** (para 1).

**General (para 5):**
- a. **The destination airport must be the clearance limit.**
- b. Aircraft must be cleared via their filed or amended flight-plan route.
- c. The transferring controller releases control to the receiving controller for: **1. turns not to exceed 30°; 2. transponder code change; 3. descent, except (a) GRB may not descend below 4,000 ft MSL within 5 NM of KOSH; (b) MKE may not descend below 4,000 ft MSL within 5 NM of KATW.**
- d. **The transferring controller must provide 5 NM in-trail separation, constant or increasing, to aircraft assigned the same altitude.**
- e. Facilities must coordinate opening/closing with adjacent operational facilities.
- f. With multiple positions open, facilities must coordinate frequency assignments and **coordinate with only a single sector for inter-facility coordination**, each facility owning its intra-facility coordination.

**Arrivals (6):** ZAU clears aircraft landing within **ALO and DSM** per Appendix B; **ZMP clears
aircraft landing within AZO, CID, MKE and VOK** per Appendix B.
**Departures (7):** **DSM, VOK and MKE** apply Appendix C restrictions; instruct aircraft to
expect filed altitude 10 minutes after departure.
**TEC (8):** aircraft within/entering **GRB and MKE** cleared per Appendix D. **Aircraft within DSM
and RST airspace must (1) enter adjacent approach control airspace on course on their flight-plan
route, and (2) be level at their assigned altitude, correct for direction of flight, at least
5 NM prior to the facility boundary.** GRB must **amend the final altitude of aircraft departing
KGRB/KATW/KMTW and landing at MKE or C90 terminal-area airports to at or below 13,000 ft MSL**
(Appendix E lists those airports), and **notify MKE when KATW is using the ILS/LOC RWY 3 approach.**

**Appendix A (page 3)** is a *diagram*, and `pdftotext -layout` produced only scattered labels.
Verbatim fragments actually present in the text layer (facility + altitude tokens):
`ZMP 04`, `ZMP 05`, `ZMP 02`, `ZMP 36`, `ZMP 27`, `ZAU 63`, `ZAU 64`, `ZAU 26`, `ZAU 55`,
`GRB ... AOB ... KGRB 130`, `RST KRST AOB 090`, `RST ODI ... RST AOB 150`, `VOK KVOK AOB ... 100`,
`ZAU AOB ... 64 130`, `AOB 100` (adjacent to `AZO`), `DSM KDBQ AOB 100`, plus airport labels
`MSP KGRB KOSH KVOK KRST KMSN KMKE KDSM KDBQ KALO KMKG KGRR KUBBS`, and area labels
`OSH MKE MSN LNR BAE DBQ BRL ALO TVC AZO *CHIPPEWA (ZOB) LUMBERTOWN WHITECAP VIO`.
**LOW CONFIDENCE:** the airspace-to-altitude pairings above are reconstructed from a mangled
ASCII rendering of a picture. The only fully reliable content of Appendix A is its legend table:

| Area | Description |
|---|---|
| (unnamed) | **ZAU Delegates to ZMP At or Below 10,000 (ZMP Re-Delegates to DSM When Operational)** |
| (unnamed) | **ZMP Delegates to ZAU At or Below 10,000 (ZAU Re-Delegates to VOK When Operational)** |

The colour/shading key that tells you *which* area is which is picture-only — UNREAD.

**Appendix B — Arrival Restrictions (page 4).** Raw text, verbatim, because the column alignment
is broken:

```
                               From ZAU
          Arriving  Qualifier                   Altitude
           KALO
                     AOA       At/Descending to 11,000
           KDSM     11,000
                     AOA       At/Descending to 11,000
                    11,000
                    4,000 to   At Assigned Altitude 5 NM from ZAU/DSM Boundary
                    10,000

                               From ZMP
Arriving            Qualifier  Altitude                                         Special
 KGRR                AOA       Descending to 11,000
 KMKG               11,000
 KFLD                AOB       At Assigned Altitude 5 NM from ZMP/AZO Boundary
 KSBM               10,000
 KOSH
 KVOK                From                      Level AOB 13,000
                    ZMP 04        Descending to 7,000 or Level AOB 7,000
                               Cross Lateral Limit of VOK Airspace at 11,000
                     AOA
                    11,000
```

LOW-CONFIDENCE reading: *From ZAU* — **KALO AOA 11,000 → at/descending to 11,000**; **KDSM AOA
11,000 → at/descending to 11,000**; **KDSM (airport not repeated in the text) 4,000 to 10,000 →
at assigned altitude 5 NM from the ZAU/DSM boundary**. *From ZMP* — **KGRR/KMKG AOA 11,000 →
descending to 11,000**; **KFLD/KSBM/KOSH AOB 10,000 → at assigned altitude 5 NM from the ZMP/AZO
boundary**; **KVOK from ZMP 04 → level AOB 13,000, and AOA 11,000 → descending to 7,000 or level
AOB 7,000 with the special "cross lateral limit of VOK airspace at 11,000"**. The KVOK
qualifier→altitude pairing and whether KOSH belongs to the KFLD/KSBM group are **not verifiable
from the text layer** — check the PDF page 4 image.

**Appendix C — Departure/Overflight Restrictions (page 5).** Raw text, verbatim:

```
             From MKE/VOK Approach Controls to ZMP
  Departing                Qualifier                        Altitude
MKE TRACON     Landing KCWA/KAUW/KMFI    Descending to 8,000 or level AOB 8,000
   Airspace         Landing KISW KSTE        AOB 6,000 Descending to 4,000
                                                          AOB 4,000
VOK RAPCON              Landing KPCZ
   Airspace                                         Descending to 6,000
                        Landing KLSE
                         AOA 6,000                  Descending to 8,000
                           Landing
             KCWA/KAUW/KMFI/KSTE/KISW
                         AOA 8,000

             From ALO/DSM Approach Control to ZAU
Departing Qualifier Route Via  Altitude                          Special
DSM TRACON                     Climbing to 10,000  ZAU must coordinate with ZMP
   Airspace                    or lower requested  before initiating a climb above
                                     altitude         10,000 ft. MSL west of the
                                                          ZAU/ZMP Boundary
```

Reliable content: **MKE TRACON airspace, landing KCWA/KAUW/KMFI → descending to 8,000 or level
AOB 8,000.** **DSM TRACON airspace → climbing to 10,000 or lower requested altitude; ZAU must
coordinate with ZMP before initiating a climb above 10,000 ft MSL west of the ZAU/ZMP boundary.**
Everything else in this appendix (KISW/KSTE, KPCZ, KLSE, and the VOK AOA 6,000 / AOA 8,000 rows)
has its qualifier and altitude columns interleaved and is **LOW CONFIDENCE** — verify against the
PDF page 5 image. No ALO departure row is present despite the header.

**Appendix D — TEC between GRB and MKE TRACONs (page 6).** Raw text, verbatim:

```
Arriving Qualifier                   From MKE to GRB                    Altitude
 KATW                                                         At/Descending to 4,000
 KGRB AOA 10,000                        Route Via
             AOB 9,000  When Using ILS/LOC RWY 3:             At/Descending to 10,000
                        Heading to Intercept or On Localizer  At Assigned Altitude
                        Direct or Radar Vector Toward KGRB

                        From GRB Overflying MKE RIPON Sector
Departing    Qualifier          Route Via                             Altitude
           West of OSH        Heading 220                            AOB 5,000
                                                                If 130: AOB 9,000
KATW       Over/Via OSH Heading 130 or 220                      If 220: AOB 5,000
                                                                     AOB 9,000
               East of OSH    Heading 130
                                                                    AOA 11,000
KGRB           Requesting
           11,000 to 13,000                                           At 9,000
           Requesting 10,000                                  At Correct Altitude for
           AOB 9,000                                            Direction of Flight

                        From GRB Landing MKE RIPON Sector Airports
           Arriving           Route Via                       Altitude
          KOSH KSBM KFLD Direct or Radar Vectors AOB 7,000 Descending to 5,000
```

Reliable content: **KATW departures west of OSH → heading 220°, AOB 5,000; over/via OSH → heading
130° or 220°, if 130° AOB 9,000 / if 220° AOB 5,000; east of OSH → heading 130°, AOB 9,000.**
**KGRB departures requesting 11,000 to 13,000 → AOA 11,000; requesting 10,000 → at 9,000;
AOB 9,000 → at correct altitude for direction of flight.** **KOSH/KSBM/KFLD arrivals from GRB →
direct or radar vectors, AOB 7,000 descending to 5,000.** The MKE→GRB block (KATW/KGRB, AOA
10,000 / AOB 9,000, the ILS/LOC RWY 3 case) has its rows interleaved — LOW CONFIDENCE, verify
against the PDF page 6 image.

**Appendix E — Terminal Area Airports (page 7)** — clean, exact:

| Milwaukee (MKE) Airports | | Chicago (C90) Terminal Area | |
|---|---|---|---|
| KMKE | General Mitchell Int'l | KORD | Chicago O'Hare Int'l |
| KBUU | Burlington Muni | KMDW | Chicago Midway Int'l |
| KENW | Kenosha Reg'l | KARR | Aurora Muni |
| KETB | West Bent Muni | KDPA | Dupage |
| KHXF | Hartford Muni | KGYY | Gary/Chicago Int'l |
| KMWC | Lawrence J Timmerman | KLOT | Lewis University |
| KRAC | Batten Int'l | KPWK | Chicago Exec |
| KUES | Waukesha Co | KUGN | Waukegan Ntl |

---

## 4. `ZMP_Minor_TRACON_Reference.txt` (01/01/2015) — full transcription and caveats

Every entry has six fields: Delegated Airspace / Arrivals Descend To / Departures Climb To /
IFR Initial Altitude (Jets/Props) / Local Squawk Codes (VFR/IFR) / Hours of Operation.
The document is titled "ZMP-Minor ATCT/TRACON", is stamped "FOR SIMULATION USE ONLY", and
every page header and footer reads **01/01/2015**.

### 4.1 Entries printed in correct label→value alignment (high confidence)

| Facility | Delegated airspace | Arrivals descend to | Departures climb to | IFR initial (jets/props) | Squawk VFR/IFR | Hours | Note printed in doc |
|---|---|---|---|---|---|---|---|
| Bismarck (BIS) ATCT | SFC-15,000 | 8,000 | 15,000 | 15,000 | 0101-0177 / 0301-0377 | 0600-2400 LCL | "Climb aircraft to FL230 or requested altitude, whichever is lower, upon ZMP accepting handoff" |
| Central Wisconsin (CWA) ATCT | Class D SFC-3,800 | APP/DEP by ZMP | APP/DEP by ZMP | 3,000 | APP/DEP by ZMP | 0600-2200 LCL | — |
| Duluth (DLH) ATCT/TRACON | SFC-12,000 (HIB SFC-8,000) | 13,000 (9,000 over HIB Shelf) | 12,000 (8,000 in HIB shelf) | 6,000 | 0301-0377 / 0401-0477 | **24h** | "Climb aircraft to FL230 or requested altitude, whichever is lower, upon ZMP accepting handoff" |
| Des Moines (DSM) ATCT/TRACON | SFC-10,000 | 11,000 | 10,000 | 5,000 / 3,000 | 0301-0377 / 0401-0477 | **24h** | "Coordination with ZAU may be required for eastbound departures" |
| Eau Claire (EAU) ATCT | Class D SFC-3,500 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | APP/DEP by ZMP | 0530-2030 LCL | — |
| Fargo (FAR) ATCT/TRACON | SFC-10,000 | 8,000 | 10,000 | 4,000 | 0201-0277 / 0401-0477 | **24h** | "Climb aircraft to FL230 or requested altitude, whichever is lower, upon ZMP accepting handoff" |
| Green Bay (GRB)/Appleton (ATW) ATCT/Green Bay TRACON | SFC-13,000 | 14,000 | 13,000 | 3,000 (GRB), 3,000 (ATW) | 0101-0177 / 0201-0277 | ATW & GRB ATCT/TRACON 0530-2330 LCL | "Coordination with ZAU may be required for southbound departures and KATW arrivals" |
| Grand Forks (GFK) ATCT / Grand Forks AFB (RDR) ATCT & RAPCON | SFC-10,000 | 11,000 | 10,000 | 3,000 (GFK), 5,000 (RDR) | 0101-0177 / 0301-0377 | GFK ATCT 0600-2330 LCL, RDR ATCT 0600-2300 LCL ex. Holidays, RDR RAPCON 24h ex. Holidays | "Climb aircraft to FL230 or requested altitude, whichever is lower, upon ZMP accepting handoff" |
| Grand Island (GRI) ATCT | Class D SFC-4,300 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | APP/DEP by ZMP | 0700-2000 LCL | — |
| Grand Rapids (GRR) ATCT/TRACON [ZAU] | SFC-10,000 | 11,000 | 13,000 | Per ZAU | Per ZAU | 0530-2400 LCL (ZAU when closed) | — |
| Grayling (GOV) ATCT | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | APP/DEP by ZMP | By NOTAM | — |
| La Crosse (LSE) ATCT | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | APP/DEP by ZMP | 0600-2100 LCL | — |
| Magic City (MOT)/Minot AFB (MIB) ATCT & Dakota ATC Facility RAPCON | **SFC-FL230** | 11,000 | **FL230** | FL230 | 0270-0277 / 0401-0477 | 0600-2100 LCL | — |
| Milwaukee (MKE) ATCT/TRACON [ZAU] | SFC-13,000 | 14,000 | Per ZAU | Per ZAU | Per ZAU | **24h** | "Descend OSH/FLD/SBM/8D1 arrivals to 7,000 or as coordinated with ZAU" · "MKE descends arrivals to ATW/STE/ISW to 4,000 or as coordinated with ZMP" |
| Muskegon (MKG) ATCT/TRACON [ZAU] | SFC-10,000 | 11,000 | Per ZAU | Per ZAU | Per ZAU | 0600-2300 LCL (ZAU when closed) | — |
| Omaha (OMA)/Offutt AFB (OFF)/Lincoln (LNK) ATCT & R90 TRACON | SFC-15,000 (LNK Sector SFC-10,000) | 16,000 (LNK 11,000) | 15,000 (OMA/OFF), 10,000 (LNK) | 5,000 (OMA/OFF), 4,000 (LNK) | 0201-0277 / 0101-0177 | OMA/OFF ATCTs 24h, LNK ATCT 0530-2400 LCL, **R90 24h** | — |
| Rochester (RST) ATCT/TRACAB | **SFC-15,000 (East), SFC-9,000 (West)** | 10,000 (11,000 over ALO airspace) | 15,000 (East), 9,000 (West) | 5,000 | 0451-0477 / 0251-0277 | 0500-2300 LCL | "Coordination with ZAU may be required for southbound departures or KALO arrivals" |
| Sioux City (SUX) ATCT | SFC-10,000 | 11,000 | 10,000 | 5,000 | 0301-0377 / 0401-0477 | 0600-2130 LCL | "Climb aircraft to FL230 or requested altitude, whichever is lower, upon ZMP accepting handoff" |
| Camp Ripley (RYM) AAF | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 3,000 | APP/DEP by ZMP | 1400-2200Z M-F (or by NOTAM) | — |
| Sawyer/Marquette (SAW) ATCT | Class D SFC-3,700 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | APP/DEP by ZMP | 0600-2200 LCL | — |
| St. Cloud (STC) ATCT | Class D SFC-3,500 | APP/DEP by ZMP | APP/DEP by ZMP | 5,000 | APP/DEP by ZMP | 0700-2300 LCL | — |

### 4.2 Entries whose `pdftotext` output is column-shifted (LOW CONFIDENCE — verify against PDF)

In these five blocks the facility title was typeset **on the "Delegated Airspace:" line**, so the
values appear one row *above* their labels. Verbatim first, then the de-shifted reading.

**Alpena (APN) ANG RAPCON** — verbatim:
```
Delegated Airspace:                 Alpena (APN) ANG RAPCON
Arrivals Descend To:                                            SFC-12,000
Departures Climb To:                                                13,000
IFR Initial Altitude (Jets/Props):                                  12,000
Local Squawk Codes (VFR/IFR):                                  4,000/4,000
Hours of Operation:
                                                       0201-0277/0301-0377
                             0800-1600 LCL (Weekdays ex. Holidays)
```
De-shifted reading: delegated **SFC-12,000**; arrivals **13,000**; departures **12,000**; IFR
initial **4,000/4,000**; squawk **0201-0277/0301-0377**; hours **0800-1600 LCL (weekdays ex.
holidays)**.

**Waterloo (ALO) ATCT [ZAU]** — verbatim:
```
                                    Waterloo (ALO) ATCT [ZAU]
Delegated Airspace:                                              SFC-10,000
Arrivals Descend To:                                                 11,000
Departures Climb To:
IFR Initial Altitude (Jets/Props):                                  Per ZAU
Local Squawk Codes (VFR/IFR):                                       Per ZAU
Hours of Operation:                                                 Per ZAU
                                  0600-2000 LCL (ZAU when closed)
```
Here the title is on its own line and delegated/arrivals are correctly aligned, but
**"Departures Climb To:" is blank** and there are three "Per ZAU" values for four remaining
labels. Reading: departures/IFR-initial/squawk all **Per ZAU**, hours **0600-2000 LCL (ZAU when
closed)** — but **which label the blank belongs to is not determinable from the text layer**.

**Sioux Falls (FSD) ATCT/TRACON** — verbatim:
```
Delegated Airspace:                 Sioux Falls (FSD) ATCT/TRACON
Arrivals Descend To:                                             SFC-10,000
Departures Climb To:
IFR Initial Altitude (Jets/Props):    8,000 (11,000 over SUX airspace)
Local Squawk Codes (VFR/IFR):                                        10,000
Hours of Operation:                                                   5,000
                                                     0101-0177/0201-0277
                                                           0500-2400 LCL
```
De-shifted reading: delegated **SFC-10,000**; arrivals **8,000 (11,000 over SUX airspace)**;
departures **10,000**; IFR initial **5,000**; squawk **0101-0177/0201-0277**; hours
**0500-2400 LCL**. This reading is **corroborated** by `LOA_ZMP_FSD` (2022) paras 3 and 4.a.2 —
delegated at/below 10,000, arrivals to 8,000, 11,000 from over SUX.

**Saginaw (MBS) ATCT/TRACON** — verbatim:
```
Delegated Airspace:                 Saginaw (MBS) ATCT/TRACON
Arrivals Descend To:                          SFC-10,000 (Shelves SFC-3,000)
Departures Climb To:                                                 11,000
IFR Initial Altitude (Jets/Props):                                  Per ZOB
Local Squawk Codes (VFR/IFR):                                       Per ZOB
Hours of Operation:                                                 Per ZOB
                                  0600-2300 LCL (ZAU when closed)
```
De-shifted reading: delegated **SFC-10,000 (shelves SFC-3,000)**; arrivals **11,000**;
departures/IFR-initial/squawk **Per ZOB**; hours **0600-2300 LCL** — and the parenthetical is
printed as "**(ZAU when closed)**" even though the other fields say ZOB. Reproduced as printed;
not corrected.

**Traverse City (TVC) ATCT** — verbatim:
```
Delegated Airspace:                 Traverse City (TVC) ATCT
Arrivals Descend To:                                        Class D SFC-3,100
Departures Climb To:                                          APP/DEP by ZMP
IFR Initial Altitude (Jets/Props):                            APP/DEP by ZMP
Local Squawk Codes (VFR/IFR):                                          5,000
Hours of Operation:                                           APP/DEP by ZMP
                        0700-2100 LCL (STD), 0700-2200 LCL (DST)
```
De-shifted reading: delegated **Class D SFC-3,100**; arrivals/departures **APP/DEP by ZMP**;
IFR initial **5,000**; squawk **APP/DEP by ZMP**; hours **0700-2100 LCL (STD), 0700-2200 LCL
(DST)**.

### 4.3 Consistency check, 2015 reference vs. current LOAs

| Facility | Minor Ref (2015) | Current LOA | Verdict |
|---|---|---|---|
| BIS | SFC-15,000 / arr 8,000 / dep 15,000 | `LOA_ZMP_BIS` (2020) III, V.b.(2), V.c.(1)(a) | **Consistent** |
| DLH | SFC-12,000 (HIB SFC-8,000) / arr 13,000 (9,000 HIB) / dep 12,000 | `LOA_ZMP_DLH` (2020) 3, 4.a.2 | **Consistent** |
| DSM | SFC-10,000 / arr 11,000 / dep 10,000 | `LOA_ZMP_DSM` (2026) 4, 5.a.(1), 5.b.(1) | **Consistent** |
| FAR | SFC-10,000 / arr 8,000 / dep 10,000 | `LOA_ZMP_FAR` (2021) 3, 4.a.2, 4.b.1.a | **Consistent**, but the Minor Ref omits the 11,000-over-GFK exception and the ZMP-retained SFC-4,000 shelf NW of Detroit Lakes |
| FSD | SFC-10,000 / arr 8,000 (11,000 over SUX) / dep 10,000 | `LOA_ZMP_FSD` (2022) 3, 4.a.2 | **Consistent** |
| GRB | SFC-13,000 / arr 14,000 / dep 13,000 | `LOA_ZMP_GRB` (2020) 3, 4.a.2, 4.b.1.a | **Consistent**, but the Minor Ref omits the **4,000-and-below sub-area under ZMP Sectors 03/04** and the **MNM 4,000 departure cap** |
| RST | SFC-15,000 (E) / SFC-9,000 (W); arr 10,000 (11,000 over ALO) | `LOA_ZMP_RST` (2023) 5.A.(2); the LOA gives **no numeric ceiling** | **Consistent where comparable**; the Minor Ref is currently the only textual source for RST's 15,000/9,000 split, and the RST LOA explicitly cancels the Minor Ref's RST entry — so this number is formally superseded but not replaced in text |
| SUX | SFC-10,000 / arr 11,000 / dep 10,000 | `LOA_ZMP_SUX` (2022) 3, 4.a.1 | **Consistent** |
| R90 (OMA/OFF/LNK) | SFC-15,000 (LNK SFC-10,000) / arr 16,000 (LNK 11,000) / dep 15,000 / 10,000 | `LOA_ZMP_R90` (2023) 3, 4.b.2.b, 4.b.3.a, 4.d.7 | **Consistent** |
| MKE / ALO / GRR / MKG | ZAU-owned figures | `ZAU_ZMP_Approach_Controls_LOA` (2026) is now authoritative for the ZAU interface | Minor Ref numbers are **older than** the 2026 ZAU LOA; where the two differ, prefer the ZAU LOA |
| **M98** | **no entry at all** | `LOA_ZMP_M98` (2026) | The Minor Ref covers **no** hours/squawks/IFR-initial for M98 — gap |

---

## 5. Picture-only pages — explicitly UNREAD

Every LOA in this set defers its airspace geometry, and most of its frequency assignments, to
attachments that carry **no text layer**. `pdftotext` emitted only the attachment title lines.
The following is therefore **UNREAD** and cannot be reconstructed from the `.txt` files:

- **`LOA_ZMP_M98`** — Attachment A (ZMP area/sector map **and frequencies**), Attachment B (SIDs), Attachment C (conventional STARs), Attachment D (MSP RNAV STARs), and **Attachments D-1 through D-11** (approach control airspace **and frequencies**), pages 10–24. This means the M98 airspace shape, the SID/STAR chart set, and **the frequency assignments called for by 4.g.(17)** are all unread. The only M98 frequency anywhere in the text is **124.7 (MSP_R_APP)** for midnight ops (para 5.a.(4)).
- **`LOA_ZMP_R90`** — Attachment A (R90 delegated airspace) and Attachment B (Omaha STARs). Only the footnote "\*Sioux City/Pawnee City Arrivals replaced by AANDY/TIMMO Arrivals." survived. The R90 East / R90 West / R90 LNK **lateral boundaries and the "R90 west shelf"** referenced in 4.d.5 are unread.
- **`LOA_ZMP_DSM`** — Attachment A (DSM sector delegated airspace, **frequency assignments**, and fixes) and Attachment B (**ALO** sector delegated airspace, frequency assignments, and fixes). The **ZMP-side frequencies** of 6.c.(1) are unread; only the four DSM Approach frequencies are in text.
- **`LOA_ZMP_RST`** — Attachment A (Rochester Approach delegated airspace). **RST's ceiling and its East/West split, and the "15,000-foot shelf" of 5.C.(2), are unread** — the numbers in §2 come from the 2015 Minor Reference and the 2026 ZAU LOA diagram, not from the RST LOA.
- **`LOA_ZMP_GRB`** — Attachment A. The GRB boundary and the shape of the 4,000-ft sub-area under ZMP Sectors 03/04 are unread. (Frequencies 126.3 / 120.2 / 119.4 *are* in text.)
- **`LOA_ZMP_DLH`** — Attachment A, including **the shaded "Hibbing shelf"** referenced by 4.a.2 and **the Tower's departure/overflight frequency assignments** referenced by 5.a.2. (125.45 *is* in text.)
- **`LOA_ZMP_BIS`** — Attachment A, including **the mandatory-handoff depiction (V.a)**, **the depiction of IR644**, and **the locations of Point "R" and Point "V"** used by VII.c and VII.d.
- **`LOA_ZMP_FAR`** — Attachment A, including **the hash-marked 4,000-ft shelf northwest of Detroit Lakes** retained by ZMP.
- **`LOA_ZMP_SUX`** — Attachment A (Sioux City Approach Control Area), including the depiction of the **Center Sector 26/27 lateral limits** referenced by 4.a.2.c.
- **`LOA_ZMP_FSD`** — Attachment A (Sioux Falls Approach Control Area), including **the Center frequencies the Tower is to assign** (5.a.1).
- **`ZAU_ZMP_Approach_Controls_LOA`** — **Appendix A page 3 is a map**; only scattered labels leaked into the text layer (§3.11) and the shading key that binds each delegation legend row to an area is unread. Appendices B, C and D are real tables but their **column alignment is destroyed** in the text output; the specific cells flagged LOW CONFIDENCE in §3.11 need the PDF images to confirm.
- **`ZMP_Minor_TRACON_Reference`** — no maps, but five entries (APN, ALO, FSD, MBS, TVC) are column-shifted; see §4.2.

## 6. Gaps and open questions for the authoring phase

1. **RST's delegated ceiling is not stated in its own LOA.** The 15,000 East / 9,000 West split comes only from the **2015** reference (which that LOA cancelled) and from a mangled 2026 ZAU diagram (`RST KRST AOB 090`, `RST ODI AOB 150`). Needs the RST Attachment A image.
2. **M98 is absent from the Minor TRACON Reference**, so there is **no hours-of-operation, squawk block, or IFR initial altitude for M98** anywhere in this set.
3. **No dedicated ZMP LOA exists in this set for GFK/RDR, MOT/MIB, APN, MBS, GRR, MKG, ALO or TVC** — only the 2015 reference.
4. **CID (Cedar Rapids)** is named in `ZAU_ZMP_Approach_Controls_LOA` para 6.b as a facility ZMP must clear arrivals into per Appendix B, but **Appendix B contains no CID row**. Likewise **KMKE has no Appendix B arrival row** despite para 6.b naming MKE, and **ALO has no Appendix C departure row** despite the appendix heading naming it.
5. **AZO's delegated ceiling** rests entirely on an "AOB 100" token adjacent to "AZO" in the mangled Appendix A diagram.
6. **Bordering-sector data is thin.** Sectors are named only for M98 (10/09/08/07/06/RWA, 5), R90 (26/27), RST (05/07/21), DLH (10/25), GRB (03/04), SUX (26/27), FSD (33/37). **DSM, BIS and FAR name no ZMP sectors at all** in their text.
7. **No ZMP-side frequency list exists in text** for M98 (beyond 124.7 midnight), DSM, FSD, or the DLH tower side — all deferred to picture attachments.
8. **M98's internal paragraph numbering is broken** (a top-level "(5)" between 4.g and 5, and a duplicated (c)/(d) pair inside 4.g.(3)). Any citation scheme built on it should use the section titles as well as the numbers.
