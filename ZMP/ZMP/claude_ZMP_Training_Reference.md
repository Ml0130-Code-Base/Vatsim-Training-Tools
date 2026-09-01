# ZMP Training / Administration / Strip Marking — Extracted Reference Notes

Sources read IN FULL (pdftotext -layout output, and for the strip order also a raw re-extract to
confirm what is image-only):

| Short name used in citations | File |
|---|---|
| `3120.4F` | `C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/txt/ZMP_Order_3120_4F.txt` (ATCSTM, Order 3120.4F, Revision 6, Effective 01 JULY 19) |
| `7210.1F` | `C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/txt/ZMP_Order_7210_1F.txt` (ARTCCAM, Order 7210.1F, Effective 01 SEP 2019) |
| `N7110.101` | `C:/Dev/Vatsim-Training-Tools/ZMP/ZMP/source-docs/txt/ZMP_Strip_Marking.txt` (vZMP N7110.101 Flight Progress Strips SOP, effective November 02, 2023) |

**Blanket caveat:** everything below is quoted or paraphrased from these three files only. Where a
thing the task asked for is genuinely absent, it is written as "not stated in <file>". Nothing has
been supplied from outside knowledge.

---

## PART 0 — DOCUMENT IDENTITY, AUTHORITY, EFFECTIVE DATES

### 0.1 3120.4F (ATC Specialist Training Manual)
- Full title: "AIR TRAFFIC OPERATIONS MANUAL / AIR TRAFFIC CONTROL SPECIALIST TRAINING MANUAL",
  Order number `ATCSTM 3120.4F`, dated "July 1, 2019", footer on every page reads
  "Revision 6 / Effective 01 JULY 19" (3120.4F cover page + page footers).
- It is **Volume 3** of the ZMP Air Traffic Operations Manual (3120.4F Preface).
- "Oversight of the ATCSTM is the responsibility of the Director of Training/Training
  Administrator." (3120.4F Preface)
- Distribution control: revisions + bulletins, each recorded by the holder in the revision log /
  bulletin log (3120.4F Preface).
- Questions addressed to **Christopher L. Bright, Training Administrator, Minneapolis ARTCC,
  VATSIM** (3120.4F Preface).
- Authorizations page: `/s/ Christopher L. Bright, Training Administrator, Minneapolis ARTCC
  VATSIM, 01 JULY 19` and `/s/ Richard M. Rump, Training Director, VATUSA, 01 JULY 19`
  (3120.4F AUTHORIZATIONS, p.53).
- **Revision log is mangled by the PDF-to-text column extraction.** Reproduced verbatim as it
  appears (columns do not align to each other in the text layer):

```
      Revision Date        REVISION LOG      Initials
         23 APRIL 08
          23 MAY 08   Revision Number          KMP
       01 AUGUST 09                            KMP
       09 JANUARY 10          A                TGB
       01 AUGUST 10           B                TGB
          01 JULY 19          C                AAZ
                              D                CLB
                              E
                              F
```
  Do not treat any date↔revision-letter↔initials pairing above as authoritative; the columns are
  shuffled in the text layer. The only reliable statement is the page footer: Revision 6, effective
  01 JULY 19.
- Bulletin log is **empty** (headers only: Bulletin Number / Subject / Initials / Date Entered /
  Date Removed) (3120.4F, p.iv).
- The List of Effective Pages is likewise column-shuffled (page ranges do not line up with subject
  matter). Section titles it does name, in order: Section 1 Controller Ratings Guidelines and
  Competencies; Section 2 Major Airport Training Plans; Section 3 Student 1 (S1) Rating Training
  Syllabus; Section 4 Student 2 (S2) Rating Training Syllabus; Section 5 Senior Student (S3)
  Rating Training Syllabus; Section 6 Controller (C1) Rating Training Syllabus; Appendices.
- Table of contents page numbers (3120.4F TOC): Section 1 = 1, Section 2 = 2, Section 3 = 9,
  Section 4 = 19, Section 5 = 26, Section 6 = 36, Appendix A = 49, Appendix B = 50,
  Appendix C = 51, Appendix D = 52, Authorizations = 53.

### 0.2 7210.1F (ARTCC Administrative Manual)
- Full title "AIR ROUTE TRAFFIC CONTROL CENTER ADMINISTRATIVE MANUAL", `ARTCCAM 7210.1F`,
  dated September 1, 2019; footer "Effective: 01 SEP 2019".
- It is **Volume 1** of the ZMP Air Traffic Operations Manual; "will be used as the sole reference
  concerning the administration of the Minneapolis ARTCC"; "Oversight of the ARTCAMM [sic] is the
  sole responsibility of the Air Traffic Manager, and his designee(s)." (7210.1F Preface)
- Preface signed **Dhruv Kalra, Air Traffic Manager**.
- Authorizations: `/s/ Dhruv Kalra, Air Traffic Manager, Minneapolis ARTCC VATSIM, 01 SEP 2019`
  and `/s/ Manuel Manigault, Air Traffic Director, Northeast Region, VATUSA, 01 SEP 2019`
  (7210.1F Authorizations, p.31). (Note the source says "Northeast Region" here while 7210.1F
  3.1.1 says the ATM "Reports to the VATUSA Central Region Air Traffic Director" — that
  discrepancy is in the source, not introduced here.)
- Revision log is also column-mangled; verbatim:
```
                           Revision Number
      Revision Date                    1               Initials
       16 FEB 2007                     2                 ZMP
       01 SEP 2019                     3                 ZMP
       02 FEB 2009                     4                 ZMP
        01 JUL 2010                    5                 ZMP
       27 AUG 2010                     6                 ZMP
       01 SEP 2019                                       ZMP
```
- Bulletin log empty (headers only).
- TOC page numbers: Section 1 = 7, Section 2 = 10, Section 3 = 14, Section 4 = 24,
  Section 5 = 26, Authorizations = 33.

### 0.3 N7110.101 (Flight Progress Strips SOP)
- Header on every page: `vZMP N7110.101 | FOR SIMULATION USE ONLY | 11/02/2023`.
- Signed **Dhruv Kalra, Air Traffic Manager, VATSIM Minneapolis ARTCC**.
- Record of changes: single row — "Original Publication", Issued By `DE`, "Nov 02, 2023".
- N7110.101 1.4 CANCELLATION: "Initial Release." 1.5 EFFECTIVE DATE: "This order is effective
  November 02, 2023." 1.7: "Initial release."
- N7110.101 1.3: order is located in the Documents and Procedures section of
  `http://www.minniecenter.org`.
- N7110.101 1.6: revisions as needed; suggestions emailed to the ZMP ATM or DATM.
- Scope statement (preamble): "prescribes general procedures and guidance for flight strip marking
  for controllers working **ATCT positions** in vZMP"; "considered supplemental to FAA Order
  7110.65 and other vZMP SOPs"; "not applicable… for operations in the real National Airspace
  System (NAS)."

---

## PART 1 — THE ZMP CERTIFICATION / RATING PATH

### 1.1 The rating ladder (7210.1F 5.2.1, "Application of VATSIM/VATUSA Global Ratings Policy")

Verbatim list under "Ratings":

| Rating | 7210.1F 5.2.1 wording |
|---|---|
| Observer (OBS) | "A member with no ATC ratings or certifications" |
| Student (S1) | "Delivery and Ground Controller" |
| Student (S2) | "Tower Controller" |
| Senior Student (S3) | "APP/DEP Controller" |
| Controller (C1) | "Center Controller" |
| Senior Controller (C3) | "(available per VATSIM/VATUSA guidelines)" |

Restrictions, verbatim (7210.1F 5.2.1):
1. "No controller shall be permitted to operate/control at a facility position for which he is not
   rated **without the supervision of a mentor or instructor**."
2. "No controller shall be permitted to operate/control at a **Major Facility** without first
   completing the requirements and evaluations necessary."

C3 (Senior Controller) — no ZMP-local syllabus, prerequisites, or OTS exists in 3120.4F. The
training manual's syllabus sections stop at C1. **Prerequisites/curriculum for C3 are not stated in
ZMP_Order_3120_4F.txt or ZMP_Order_7210_1F.txt.**

### 1.2 Minimum rating per position type (7210.1F 5.1)

| Position | Callsign form | Minimum rating (verbatim) | Cite |
|---|---|---|---|
| Delivery | `XXX_DEL` | "S1 (Student)" | 7210.1F 5.1.1 |
| Ground | `XXX_GND` (e.g. `XXX_S_GND`) | "S1 (Student 2)" *[sic — source labels the S1 rating "Student 2"]* | 7210.1F 5.1.2 |
| Tower | `XXX_TWR` (e.g. `XXX_S_TWR`) | "S2 (Student 2)" | 7210.1F 5.1.3 |
| Departure | `XXX_DEP` (e.g. `XXX_N_DEP`) | "S3 (Senior Student)" | 7210.1F 5.1.4 |
| Approach | `XXX_APP` (e.g. `XXX_N_APP`) | "S3 (Senior Student)" | 7210.1F 5.1.5 |
| Center | `MSP_NN_CTR`; combined = `MSP_11_CTR` | "C1 (Controller)" | 7210.1F 5.1.6 |
| TMU | `ZMP_TMU` | "C1 (Controller)" — "The TMU is only to be used per approval by VATUSA." | 7210.1F 5.1.7 |
| Observation | `ZMP_II_OBS` ("II" = the controller's operating initials) | governed by VATSIM policy | 7210.1F 5.1.8 |

"Note: In all position callsign examples contained herein, 'XXX' will stand for the location
identifier" (7210.1F 5.1 preamble). Center: "'NN' indicates the airspace sector number the
controller is controlling. When all of the Minneapolis ARTCC airspace is under the control of a
combined center position, the callsign MSP_11_CTR will be used (primary combined position)."
(7210.1F 5.1.6)

### 1.3 Major facility certification (MFC) — the second, parallel certification axis

**Overall rule (3120.4F 2.1):** "All controllers at ZMP shall meet the additional training standards
of a Major facility before working positions at that facility. Under VATSIM's Global Ratings
Policy, a controller must meet the standards at the **Ground, Tower, and Approach** levels.
Currently **Minneapolis (KMSP) is the sole Major airport** under ZMP's jurisdiction."

**Applicability (3120.4F 1.2):** "All controllers belonging to ZMP ARTCC as members shall be trained
to proficiency using the content and materials contained herein. **Visiting controllers** shall be
subject to general competency guidelines and shall be trained in local procedures (Major facility
certification) using the content and materials contained herein."

**Evaluation/examination types required for MFC (3120.4F 2.1.1):**
- *Written Examinations and Quizzes* — "will be administered for certification of controllers at
  MAJOR facilities. KMSP is the single MAJOR facility at ZMP."
- *Over-the-Shoulder Examinations* — "OTS will be required for certification at Major facilities for
  **each of the Ground, Tower, and Approach levels**."
- **Center caveat, verbatim (3120.4F 2.1.1):** "There is **no major certification for ZMP CTR**,
  however, transfer and visiting controllers who are **C1 rated or higher must complete the
  requirements of all ZMP MAJOR facilities before they are considered certified on Minneapolis
  Center**."
  - NOTE the internal conflict: 3120.4F C1.7 (see §2.5 below) repeatedly refers to a "ZMP CTR Major
    facility certification written" exam and a "C1/ZMP CTR Major facility certification OTS
    practical exam". These two passages of 3120.4F contradict each other; both are reproduced
    faithfully here and neither has been reconciled.
- *Oral Examinations* — "As a routine part of training and evaluation, the instructor administering
  a MAJOR facility certification test.(MFC) may use oral exam techniques to evaluate an
  applicants' knowledge."

#### 1.3.1 MFC — KMSP Ground (3120.4F 2.3)
- **Positions covered:** `MSP_DEL`, `MSP_X_GND` — "(Note: X … is a placeholder for any variation of
  the position, i.e. MSP_S_GND, MSP_N_GND)".
- **Certification Standards** (3120.4F 2.3.III), verbatim numbering:
  1. Competency standards as defined by VATUSA for the rating of the controller.
  2. Knowledge and usage of the ZMP ATCSOP sections that apply to the positions covered.
  3. **Written test/quiz score(s) … of 70% or greater.**
  4. Successful oral examination of Knowledge Areas listed.
  5. "Appropriate/commensurate logged time spent in OJT with a mentor or instructor working all
     positions covered" — *no numeric hour requirement is stated in ZMP_Order_3120_4F.txt.*
  6. **Successful OTS examination for MSP_DEL and MSP_GND.**
- **Knowledge Areas** (3120.4F 2.3.IV), 12 items: 1 Positions; 2 Intra-facility coordination
  (between tower cab positions); 3 Inter-facility coordination (between tower cab positions and
  external positions); 4 Airport Layout; 5 Airspace Layout; 6 Jurisdiction and responsibilities of
  each position; 7 Communications and Frequencies; 8 Flight Plan/Strip Management; 9 SIDs and
  STARs; 10 Common/Preferred Routings; 11 LAHSO Operations; 12 Special Operations.
- **Certification Rules** (3120.4F 2.3.V):
  1. On success, "the examining controller (typically an **instructor, the Director of
     Training/Training Administrator, DATM, or ATM, or another controller designated by the ATM**)
     shall make arrangements to have the … certification posted on the ZMP website."
  2. "A controller may only exercise the privileges of the Major facility certification to extent
     their controller rating allows."
  3. "A controller who has previously attained certification … is subject to **competency review at
     any time**. Should the controller's skills not meet the competency standards …, his/her
     certification **may be revoked by the Director of Training/Training Administrator, DATM, or
     ATM**."

#### 1.3.2 MFC — KMSP Tower (3120.4F 2.4)
- **Positions covered:** `MSP_X_TWR` — "(Note: X … i.e. MSP_S_TWR, MSP_N_TWR)".
- Standards identical in substance to Ground (the source numbers them 7–12 instead of 1–6, a
  numbering artifact continuing from 2.3): VATUSA competency standards; knowledge/usage of ZMP
  ATCSOP sections; **written test/quiz ≥ 70%**; successful oral exam of the Knowledge Areas;
  appropriate/commensurate logged OJT time with a mentor or instructor; **successful OTS
  examination for MSP_TWR**.
- Knowledge Areas: identical 12-item list as Ground (3120.4F 2.4.IX).
- Certification Rules: identical 3 rules as Ground (3120.4F 2.4.X).

#### 1.3.3 MFC — M98 TRACON (3120.4F 2.5)
- **Positions covered:** `MSP_X_DEP`, `MSP_X_APP`. (Source's parenthetical note erroneously
  illustrates with "MSP_S_TWR, MSP_N_TWR" — copy/paste artifact in 3120.4F 2.5.II.)
- **Certification Standards** (3120.4F 2.5.III):
  1. VATUSA competency standards for the controller's rating.
  2. Knowledge and usage of the **M98/MSP TWR ATCSOP** sections applying to the positions covered.
  3. **Written test/quiz score(s) of 70% or greater.**
  4. Successful oral examination of the Knowledge Areas.
  5. Appropriate/commensurate logged OJT time with a mentor or instructor on all covered positions
     (again, **no hour figure stated**).
  6. **Successful OTS examination for MSP_APP.**
- **Knowledge Areas** (3120.4F 2.5.IV), 14 items: 1 TRACON Positions of Operation; 2 Intra-facility
  coordination (between TRACON positions); 3 Inter-facility coordination (between TRACON positions
  and external positions); 4 TRACON Functions; 5 Airspace Layout; 6 Jurisdiction and
  responsibilities of each position; 7 Communications and Frequencies; 8 Flight Plan/Strip
  Management; 9 SIDs and STARs; 10 Common/Preferred Routings; 11 **Simultaneous Parallel Approach
  Vectoring**; 12 Flows and Sequencing; 13 Satellite Airport Operations; 14 Class B Airspace
  Operations.
- Certification Rules: same 3 rules; revocation authority here reads "**the Training Administrator,
  DATM, or ATM**" (3120.4F 2.5.V).

#### 1.3.4 Major-facility standards from the admin side (7210.1F 5.2.3, "Major Fields - Standards")
"Each facility designated as 'Major' utilizes the following standards:
1. The training on, and evaluation of knowledge and performance using, standard operating
   procedures for the facility as outlined in appropriate sections of the Air Traffic Control
   Procedures volume of this manual.
2. The observation of VATUSA Controller Rating Guidelines and the Global Ratings Policy.
3. **Final certification evaluation utilizing a written test or quiz, and an online
   over-the-shoulder evaluation. Evaluation may be done in a live VATSIM environment or in a
   simulated 'Sweatbox' environment. Sweatbox evaluations shall be done only with prior permission
   from the Minneapolis ARTCC Training Administrator.**"

#### 1.3.5 7210.1F 5.2.2 "Major Facilities" table — PARTIALLY UNREADABLE
The table has three columns: Facility Name / Unit Number-ICAO / **Major**. In the extracted text
layer **only one row carries a value in the "Major" column** — Alpena DoD RAPCON/ATCT `KAPN` →
"Yes". Every other row's Major cell is empty in the text layer (verified by re-running pdftotext
without `-layout`; the column is genuinely empty in the extract, and it is unclear whether the
source PDF shows check-marks/graphics there, or whether the "Yes" for Alpena is itself a
misaligned cell).

**This conflicts with 3120.4F 2.1** which states KMSP is the sole Major airport, and with 3120.4F
2.1.1 "KMSP is the single MAJOR facility at ZMP." **Which facilities 7210.1F 5.2.2 actually flags
as Major is NOT reliably readable from ZMP_Order_7210_1F.txt.** Treat 3120.4F 2.1 / 2.1.1 (KMSP
only) as the readable statement and flag 5.2.2 for human verification against the PDF.

Rows of the table as extracted (Facility Name | Unit Number/ICAO | Major-as-extracted):

| Facility Name | Unit Number/ICAO | Major (as extracted) |
|---|---|---|
| Alpena DoD RAPCON/ATCT | KAPN | Yes |
| Anoka ATCT | KANE | (blank) |
| Appleton ATCT | KAPN *[sic — 7210.1F 1.4 gives Appleton as KATW]* | (blank) |
| Bismarck TRACON/ATCT | KBIS | (blank) |
| Central Wisconsin ATCT | KCWA | (blank) |
| Crystal ATCT | KMIC | (blank) |
| Des Moines TRACON/ATCT | KDSM | (blank) |
| Duluth TRACON/ATCT | KDLH | (blank) |
| Eau Claire ATCT | KEAU | (blank) |
| Fargo TRACON/ATCT | KFAR | (blank) |
| Flying Cloud ATCT | KFCM | (blank) |
| Grand Forks ATCT | KGFK | (blank) |
| Grand Island ATCT | KGRI | (blank) |
| Grayling DoD ATCT | KGOV | (blank) |
| Green Bay TRACON/ATCT | KGRB | (blank) |
| La Crosse ATCT | KLSE | (blank) |
| Lincoln TRACON/ATCT | KLNK | (blank) |
| Minneapolis Center | KZMP | (blank) |
| Minneapolis TRACON/ATCT | M98/KMSP | (blank) |
| Minot DoD RAPCON/ATCT | KMIB | (blank) |
| Omaha TRACON/ATCT | R90/KOMA | (blank) |
| Red River DoD RAPCON/ATCT | KRDR | (blank) |
| Rochester TRACON/ATCT | KRST | (blank) |
| Ray S. Miller DoD ATCT | KRYM | (blank) |
| Sawyer ATCT | KSAW | (blank) |
| Sioux City TRACON/ATCT | KSUX | (blank) |
| Sioux Falls TRACON/ATCT | KFSD | (blank) |
| Saint Cloud ATCT | KSTC | (blank) |
| Saint Paul ATCT | KSTP | (blank) |
| Traverse City ATCT | KTVC | (blank) |

(This table omits KMOT and KSTC/KMOT differences vs. 7210.1F 1.4 / 3.3.1.3 — see §3.2.)

### 1.4 R90 (Omaha) certification tier — **ABSENT**
There is **no R90 / Omaha certification tier, syllabus, prerequisite, OTS, or checklist in any of
the three documents read.** The only mentions of R90 anywhere in these three files are:
- 7210.1F 1.4 facility list: "Omaha TRACON/ATCT | R90/KOMA/KOFF | Omaha, NE".
- 7210.1F 3.3.1.2: R90 sits inside the **Sioux Empire Facility Group** — "R90 TRACON and ATCT's
  (KOMA, KOFF, KLNK)".
- 7210.1F 5.2.2 table row "Omaha TRACON/ATCT | R90/KOMA" with a blank/unreadable Major column.

**An R90 rating/certification path is not stated in ZMP_Order_3120_4F.txt, ZMP_Order_7210_1F.txt,
or ZMP_Strip_Marking.txt.** By default R90 positions fall under the generic 7210.1F 5.1 minimum
ratings (KOMA/KOFF/KLNK `_DEL`/`_GND` = S1, `_TWR` = S2, R90 `_APP`/`_DEP` = S3) and, since R90 is
not named as Major in any readable text, under no MFC. That inference is flagged as an inference,
not a quotation.

### 1.5 Solo endorsement rules — the ONLY statement in the corpus
3120.4F S1.6 (Ground Control), Completion Standards, verbatim and in the source's bold:

> "Upon successful demonstration of Clearance Delivery/Ground Control tasks, the student **must be
> endorsed for non-major Clearance Delivery/Ground, and may be awarded a solo certification for
> Major Clearance Delivery/Ground at the discretion of the instructor**."

That is the whole of it. **Solo endorsement duration, renewal, revocation, logging, the solo
certification form, and any solo rules for Tower / Approach / Center are not stated in
ZMP_Order_3120_4F.txt or ZMP_Order_7210_1F.txt.** The word "solo" appears exactly once in
3120.4F and zero times in 7210.1F and N7110.101.

### 1.6 Minor / major ground errors — **NOT PRESENT**
There is **no minor-error / major-error taxonomy, no error-count failure threshold, no
"ground error" definition, and no OTS scoring rubric anywhere in ZMP_Order_3120_4F.txt,
ZMP_Order_7210_1F.txt, or ZMP_Strip_Marking.txt.** Searching all three for "minor", "major error",
"ground error", "checklist", and "evaluat*" returns only the Major-facility-certification hits
already catalogued above. The only numeric pass standard in the entire training manual is the
**written test/quiz threshold of 70%** (3120.4F 2.3.III.3, 2.4.VIII.9, 2.5.III.3). OTS is described
only as pass/fail-by-instructor-judgement ("Successful OTS examination for …").

---

## PART 2 — TRAINING PROCESS, OJT SESSION MECHANICS, EVALUATION

### 2.1 Governing scope (3120.4F 1.1)
"ZMP ARTCC shall at all times observe controller rating guidelines and competencies as set forth in
applicable VATSIM and VATUSA policies. As such, all content and direction of the ZMP ATCSTM shall
be utilized in the context of the governing VATSIM and VATUSA policies."

### 2.2 Training scheduling — the 6-step process (3120.4F 1.3), verbatim substance
Umbrella rule: "All training shall be scheduled via the ZMP ARTCC website **at least 12 hours in
advance** unless otherwise initiated by a member of the training staff."

| Step | Rule | Timing constant |
|---|---|---|
| 1 | "The student shall list his/her availability periods on the ZMP scheduling system." | "Availability periods should, but may not be, at least **2 hours** in length." |
| 2 | "The training staff member shall initiate a session offer to the student based upon the listed period(s) of availability." | — |
| 3 | "The student shall respond to the session offer with either an acceptance or refusal based upon his/her readiness…" | "Confirmation must be recorded at least **2 hours prior** to the scheduled session start time." |
| 4 | **No-Show Session** occurrence recorded | "if a student cancels a scheduled session within **2 hours** of the scheduled start time, or if the student confirms a session and **fails to report within 15 minutes** of the scheduled start time." |
| 5 | **Failure to Confirm Session** occurrence recorded | "if the student fails to respond to an offered training session with either an acceptance or refusal by a point **2 hours prior** to the proposed session time." |
| 6 | "No-Show/Failure to Confirm occurrences **shall not be punitive in nature**, rather used as an indicator of student progress and to identify trends in successful or unsuccessful training scheduling." | — |

Both step 4 and step 5 are prefixed "Unless the training staff is otherwise notified".

### 2.3 Training expectations — the 5 student obligations (3120.4F 1.4), verbatim
1. "The student shall take responsibility for the progress of his/her own training and allocate
   availability accordingly."
2. "The student shall abide by the ZMP Training Scheduling process as outlined above."
3. "The student shall prepare for sessions to the best of his/her ability, including self-study of
   ATC Orders, VATUSA CBI materials, and ZMP Facility Orders, and any other applicable reference
   resources."
4. "The student shall be an active participant in his/her training, and seek out clarification on
   material where it is not immediately understood."
5. "The student shall be provided a record of every training session for review via a **3120-25
   training session report**."

**The 3120-25 form itself — its fields, grading scale, and any evaluation criteria on it — is NOT
reproduced in ZMP_Order_3120_4F.txt.** It is named once, in 1.4.5, and nowhere else in the corpus.
This is the single biggest gap for a "how is a session evaluated" question.

### 2.4 What an OJT / training session actually consists of — the lesson-plan template
Every lesson plan in 3120.4F Sections 3, 4, 5 and 6 uses the identical seven-part structure. This
is the de-facto session format:

| Template field | Meaning as used throughout 3120.4F |
|---|---|
| **Lesson code** | e.g. `S1.5`, `S3.6`, `C1.3` |
| **Objective** | one-sentence goal statement |
| **Elements** | the bulleted syllabus items (marked with `+` in the source) |
| **Schedule** | an estimated duration range. Governing note (3120.4F 3.1.1 / 4.1.1 / 5.1.1 / 6.1.1): "Times noted in the 'Schedule' section of each lesson plan indicate the **estimated time necessary to cover all elements, and should be used as a guideline only**." |
| **Equipment** | tools required — VRC, Teamspeak, TWRTrainer/ACSim, SWEATBOX, sector files, reference websites |
| **Instructor/Mentor Actions** | what the trainer sets up, demonstrates, and which position each party logs into |
| **Student Actions** | near-boilerplate: "The student shall work to understand the lesson elements, take notes, ask questions, and work with the instructor/mentor to meet the lesson objective." |
| **Completion Standards** | the pass condition for that lesson; most practical lessons close with "**This lesson shall be repeated as necessary to achieve completion standards.**" |

Additional session-mechanics rules stated in the lesson plans:
- Sections 3 and 4 setup lessons (S1.2, S2.1) both carry the emphasis: "***No part of the lesson
  shall be conducted 'live' on the VATSIM network.***"
- Classroom-only lessons (S3.2, S3.5, C1.2): "The instructor or mentor shall conduct this as a
  'classroom' lesson, where the student is **not logged into a live controlling position**."
- OJT lessons (S3.1, S3.3, S3.4, S3.6, S3.7, all C1.x): "This may be done '**live**' on the VATSIM
  network **or in the SWEATBOX environment**", with the instructor/mentor also playing the role of
  aircraft where necessary.
- Common scope clause (3120.4F 3.1.1 / 4.1.1 / 5.1.1 / 6.1.1): "Additional material may be covered
  on a case-by-case basis, so long that the material is within the scope of controller duties as
  contemplated by FAA orders, VATSIM and VATUSA policies, and the ZMP ARTCC Air Traffic Operations
  Manual."
- Recommendation gate: each rating's final "Practical Exam Prep" lesson ends with "Upon successful
  completion of the lesson, the instructor/mentor **shall recommend the student for the [rating]
  written and OTS Practical exams**", and "Upon recommendation of an instructor, the student shall
  take and pass the [rating] written exam."

### 2.5 Positions used for training, by lesson (3120.4F, Instructor/Mentor Actions)

| Lesson | Student logs into | Instructor/Mentor logs into | Cite |
|---|---|---|---|
| S1.1 | OBS (observer) | — | 3120.4F S1.1 |
| S1.2 | SWEATBOX, KMSP tower-cab sector file | runs ACSim/TWRTrainer KMSP scenario | 3120.4F S1.2 |
| S1.5 | SWEATBOX (clearance delivery) | TWRTrainer traffic at KMSP; plays aircraft | 3120.4F S1.5 |
| S1.6 | SWEATBOX (ground) | TWRTrainer traffic at KMSP; plays aircraft | 3120.4F S1.6 |
| S1.7 | SWEATBOX | TWRTrainer | 3120.4F S1.7 |
| S2.1 | SWEATBOX, KMSP tower-cab sector file | ACSim/TWRTrainer | 3120.4F S2.1 |
| S2.4 | SWEATBOX (local/tower) | TWRTrainer; plays aircraft | 3120.4F S2.4 |
| S2.5 | `MSP_TWR` | observes; may use TWRTrainer for extra traffic | 3120.4F S2.5 |
| S3.1 | `MSP_DEP` | live VATSIM **or** SWEATBOX | 3120.4F S3.1 |
| S3.3 | `MSP_DEP` | live or SWEATBOX; plays aircraft if necessary | 3120.4F S3.3 |
| S3.4 | **`MSP_H_APP`** | "The instructor/mentor **should log into the MSP_N_APP position**" | 3120.4F S3.4 |
| S3.6 | `MSP_N_APP` | live or SWEATBOX | 3120.4F S3.6 |
| S3.7 | `MSP_N_APP` | live or SWEATBOX | 3120.4F S3.7 |
| S3.8 | `MSP_N_APP` | observes, instructs, drills | 3120.4F S3.8 |
| C1.1 | observer on ZMP using the **CTR sector file** | "shall log in as a CTR controller and demonstrate different uses of the DSR system" | 3120.4F C1.1 |
| C1.3 / C1.4 / C1.5 / C1.6 / C1.7 | **`MSP_11_CTR` (or equivalent)** | live or SWEATBOX; plays aircraft if necessary | 3120.4F C1.3–C1.7 |

### 2.6 Appendix A — Student Progress Sheet (3120.4F Appendix A, p.49)
The published tracking form. Columns are `NAME:` header, then rows under **LESSON | COMP | NOTES**.
The lesson rows as printed, verbatim and in order:

```
S1.1  S1.2  S1.3  S1.4  S1.5  S1.6  S1.7  S1.8  TEST
S3.1  S3.2  S3.3  S3.4  S3.5  S3.6  S3.7  S3.8  TEST
C1.1  C1.2  C1.3  C1.4  C1.5  C1.6  C1.7  TEST
```

Two source defects, flagged not fixed:
- The form lists **`S1.8`**, but Section 3's syllabus outline (3120.4F 3.1.2) defines only S1.1
  through S1.7. **What S1.8 is, is not stated in ZMP_Order_3120_4F.txt.**
- The form contains **no S2 rows at all**, even though Section 4 defines S2.1–S2.5.

This progress sheet is the **only published "skill checklist" in the corpus** — and it is a
completion tracker (lesson code / COMP / NOTES), not a graded skill rubric.

### 2.7 Appendices B, C, D — EMPTY
- Appendix B — "Student Rating Training Handouts/Materials" (p.50): heading only, no content.
- Appendix C — "Senior Student Rating Training Handouts/Materials" (p.51): heading only.
- Appendix D — "Controller Rating Training Handouts/Materials" (p.52): heading only.

In the text layer these pages carry nothing but the title and the footer. If the PDF holds
handout graphics on these pages they are image-only and **UNREAD**; more likely they are genuinely
blank placeholders. Either way: **the actual training handouts referenced by the ATCSTM are not
present in ZMP_Order_3120_4F.txt.**

---

## PART 3 — THE FULL SYLLABI (3120.4F Sections 3–6)

### 3.1 S1 — Student Rating syllabus outline (3120.4F 3.1.2)
| Code | Title |
|---|---|
| S1.1 | Introduction to VATSIM/VATUSA Air Traffic Control |
| S1.2 | Radar Client/Controller Workspace Setup |
| S1.3 | Basic ATC Concepts and Regulations |
| S1.4 | Basic ATC Communications and Phraseology |
| S1.5 | Clearance Delivery |
| S1.6 | Ground Control |
| S1.7 | S1 Practical Exam Prep (lesson body titles it "S1 Major Practical Exam Preparation") |

**S1.1 — Introduction to VATSIM/VATUSA ATC.** Objective: introduce the OBS-rated controller to ATC
services in the VATSIM/VATUSA simulation environment. Elements: basic radar client setup (login and
sector file loading); review of VATSIM/VATUSA governance and organization; review of VATUSA
certification regulations; review of types of ATC facilities and functions; observation of radar
environments and VATSIM ATC communications. **Schedule: 30–90 minutes.** Equipment: VRC, Teamspeak,
VATUSA/VATSIM/ZMP websites. Completion: "when all elements are covered and the student understands
how to log onto the VATSIM network as an OBS controller on his own."

**S1.2 — Radar Client/Controller Workspace Setup.** Elements: basic radar client setup;
**login to SWEATBOX servers**; position callsigns; VRC radar modes; use of flight strips;
understanding of VRC functions used by tower cab controllers. **Schedule: 30–90 minutes.**
Equipment adds TWRTrainer and KMSP tower-cab sector files. Completion requires successful
demonstration of:
- Proper login procedures and basic radar client setup
- Understanding how to select, view, and interpret basic radar modes "o simulate ASDE radar. Both
  basic and ground modes." *[sic — typo in source]*
- How to "radio select" an aircraft in the radar client
- How to access the flight strips and flight plans for aircraft
- How to use function keys and menus in the client to change aircraft data and tag information
- How to access weather information

**S1.3 — Basic ATC Concepts and Regulations.** Elements: access to and understanding of FAA Order
7110.65 — specifically "**Chapter 2: General Control**"; and access to / understanding of FAR
Part 91, enumerated exactly as:
`91.113` Right-of-way rules: Except water operations · `91.115` Right-of-way rules: Water
operations · `91.117` Aircraft speed · `91.119` Minimum safe altitudes: General · `91.121`
Altimeter settings · `91.123` Compliance with ATC · `91.127` Operating on or in the vicinity of an
airport in Class E airspace · `91.129` Operations in Class D airspace · `91.130` Operations in
Class C airspace · `91.131` Operations in Class B airspace · `91.135` Operations in Class A
airspace · `91.153` VFR flight plan: Information required · `91.155` Basic VFR weather minimums ·
`91.159` VFR cruising altitude or flight level · `91.169` IFR flight plan: Information required ·
`91.173` ATC clearance and flight plan required · `91.175` Takeoff and landing under IFR · `91.177`
Minimum altitudes for IFR operations · `91.179` IFR cruising altitude or flight level · `91.181`
Course to be flown.
**Schedule: 90–120 minutes.** Completion: all elements covered, student understands how to access
the regulations, "and the student shall demonstrate general comprehension of the regulations listed
in **italic font**." — *the italic subset is a formatting distinction lost in the text extraction;
**which regulations are italicised is UNREADABLE in ZMP_Order_3120_4F.txt.*** Explicit note in the
lesson: "The student does not need to 'memorize' these regulations, per se, but does need to be
instructed on how to access them."

**S1.4 — Basic ATC Communications and Phraseology.** Elements: basic radio operating technique
("**listen, think, transmit**"); ICAO Phonetic Alphabet; basic ATC phraseology — identification and
response, clearances vs. instructions. **Schedule: 30–60 minutes.** Technique taught verbatim: "the
ability to 'listen, then think about what to say, and THEN transmit'." Completion: student
demonstrates basic ATC comms skill and phraseology, can respond to aircraft queries, give basic
instructions with appropriate phraseology and phonetics, and differentiate clearances from
instructions.

**S1.5 — Clearance Delivery.** Elements: referencing the **ZMP M98/MSP TWR SOP for MSP_DEL**;
appropriate client setup/login for position; understanding flight plans; ATC clearances – general;
KMSP standard clearances and routings; transponder code allocations; altitude assignment;
intra-facility coordination; **clearance phraseology (CRAFT method)**; flight plan management /
Flight Progress Strips; clearance delivery communications. **Schedule: 60 minutes per instance of
the lesson.** Equipment: VRC, Teamspeak, TWRTrainer. Completion: student can conduct themselves
with competency as a clearance delivery controller; "This lesson shall be repeated as necessary to
achieve completion standards."

**S1.6 — Ground Control.** Elements: referencing the ZMP M98/MSP TWR SOP for ground positions at
KMSP; airport layout; ground movement areas and operations; **difference between movement and
non-movement area**; following procedures and sequencing to runway; selection of runway based on
winds/traffic flow; sequencing aircraft for departure; basic movement instructions; intra-facility
coordination; ground controller communications. **Schedule: 60 minutes per instance.** Completion —
plus the **solo endorsement clause** quoted in §1.5 above.

**S1.7 — S1 Major Practical Exam Preparation.** Elements (this is the closest thing in the corpus
to an S1 evaluation checklist):
- Pre-Control Setup and Configuration — configuration of sector file and appropriate overlays;
  setup and selection of proper communications frequencies; selection and activation of ATIS
  information
- Network Procedures — uses appropriate callsign and credentials; selection of appropriate
  **visibility range settings based on recommended settings for position**
- Position Relief Briefing
- Accessing Flight Strip Data
- Flight Plan Amendments
- Preferred Routing Procedures
- Non-Standard Routing Procedures
- VFR and IFR Clearance Procedures
- Squawk Code Assignments
- Clearance Issuance
- Movement and Non-Movement Areas
- Taxi and Ground Movement Operations
- Helicopter Taxi Operations
- Runway Selection
- ATIS Issuance
- Basic aviation weather
- Controller communications
- Intra-facility coordination

**Schedule: 60–120 minutes per instance.** Completion: "when the student passes the **MSP Ground
Control written exam** and is prepared to take the **S1 MAJOR OTS practical exam**."

### 3.2 S2 — Student 2 Rating syllabus outline (3120.4F 4.1.2)
| Code | Title |
|---|---|
| S2.1 | Radar Client/Controller Workspace Setup |
| S2.2 | Basic ATC Concepts and Regulations |
| S2.3 | Basic ATC Communication and Phraseology |
| S2.4 | Local Control (Tower) |
| S2.5 | Student 2 (S2) Practical Test Prep |

*Source defect: 3120.4F 4.1.1 (the S2 overview) says the lessons are "for the VATSIM/VATUSA
**Student rating (S1)**" — a copy/paste error in the source.*

**S2.1** — identical element list and completion standards to S1.2, except the radar-mode wording is
"…basic radar modes o simulate ASDE radar **and tower modes**." Schedule 30–90 min.

**S2.2 — Basic ATC Concepts and Regulations.** Elements: access to/understanding of FAA Order
7110.65; "Review **Tower separation techniques for arrival/departure sequencing** (at a glance)";
"**Wake Turbulence Separation Application** (at a glance)"; "**Separation Minima** (at a glance)";
"**MSP/Airport Departure/Arrival Separation Procedures** (at a glance)". **Schedule: 90–120
minutes.** Same "italic font" completion clause — again **the italicised subset is unreadable in
the text extract**.

**S2.3** — identical to S1.4 (listen/think/transmit, ICAO phonetics, clearances vs instructions).
Schedule 30–60 min.

**S2.4 — Local Control (tower).** Elements:
referencing the **M98/MSP TWR ATCSOP** for tower positions at KMSP; basic aviation weather (METAR
reports — decoding/understanding; cloud and precipitation types; FAR Part 91 weather minima
review); airport layout and runway configuration; airspace, jurisdiction, and responsibility;
departure operations; selection of runway based on winds/traffic flow; sequencing aircraft for
departure; arrival operations; traffic pattern operations; **VTOL operations**; traffic sequencing
and separation; wake turbulence; **LAHSO operations**; missed approaches; emergencies; runway
incursion avoidance (**TIPH operations**); local controller communications (appropriate
phraseologies; ATIS management); intra-facility coordination.
**Schedule: 60–120 minutes per instance.** Completion standard text says "…competency as a **ground
controller**" — another copy/paste defect in the source for a tower lesson.

**S2.5 — S2 Practical Exam Preparation.** Elements: Spacing and Sequencing; **Taxi Into Position
and Hold (TIPH)**; **Land and Hold Short (LAHSO)**; VFR Traffic Pattern; Wake Turbulence
Separation; Converging or Parallel Runway Operations; Missed Approach Procedures; Emergency
Procedures; referencing the ZMP ATCSOP for tower positions at KMSP. **Schedule: 60–120 minutes per
instance.** Student works `MSP_TWR` under observation. Completion: passes the S2 written exam and
is prepared for the S2 OTS practical.

### 3.3 S3 — Senior Student Rating syllabus outline (3120.4F 5.1.2)
| Code | Title |
|---|---|
| S3.1 | Radar Systems and Functions |
| S3.2 | TRACON Facility Positions and Duties |
| S3.3 | Departure Control |
| S3.4 | Arrival Flows and Sequencing |
| S3.5 | Instrument Approach Procedures |
| S3.6 | Final Approach |
| S3.7 | Holding Procedures |
| S3.8 | S3 Practical Exam Prep |

**S3.1 — Radar Systems and Functions.** Elements: **ARTS/CARTS**; **STARS**; VRC Radar Modes;
Aircraft Data Tags; Tracking Aircraft; Radar Tag Handoffs; Pointouts and Coordination; Conflict
Alerts / Separation Rings; Airspace Filters; Video Map Review / Diagram Functions. **Schedule: 60
minutes.** Student on `MSP_DEP`.

**S3.2 — TRACON Facility Positions and Duties.** Elements: Departure Control; Feeder/Arrival
Approach Control; Final Approach Control; Satellite Approach Control; reference to **M98 TRACON
ATCSOP**; intra-facility coordination. **Schedule: 30 minutes.** Classroom (student not logged into
a live position).

**S3.3 — Departure Control (OJT).** Elements: Position Setup and Login; Radar Identification; Use
of **Departure Gates**; Vectoring onto departure routing/SIDs; Airspace management; Traffic
conflicts and advisories; Spacing and sequencing; Coordination with adjacent TRACON positions;
Coordination with Tower; Coordination with Center; Handoffs; Proper phraseology and communications.
**Schedule: 60–90 minutes per instance.** Student on `MSP_DEP`. Completion: demonstrates competency
as a departure controller; repeat as necessary.

**S3.4 — Arrival Flows and Sequencing (OJT).** Elements: reference of M98 TRACON ATCSOP; **Arrival
Gates**; STARs; Traffic flows; Spacing and sequencing towards finals airspace; Coordination with
adjacent TRACON positions. **Schedule: 60–120 minutes per instance.** Student on `MSP_H_APP`,
instructor should be on `MSP_N_APP`. Completion: "successfully demonstrate the ability to operate
as a feeder/arrival approach controller."

**S3.5 — Instrument Approach Procedures.** Objective includes learning "how to read IAP charts, and
the function of terminal instrument procedures (**TERPS**)". Elements: reference of M98 TRACON
ATCSOP; **reference of IAP charts for KMSP, KFCM, KMIC, KANE, KSTP**; ILS Approaches; Non-Precision
Approaches; Missed Approach Procedures; Equipment failure / out-of-service equipment.
**Schedule: 60 minutes.** Classroom.

**S3.6 — Final Approach (OJT).** Elements: reference of M98 TRACON ATCSOP; proper sequencing and
spacing, **use of speed restrictions**; vectors to final approach; **approach clearance terminology
(PTAC)**. **Schedule: 60–120 minutes per instance.** Student on `MSP_N_APP`. Completion: "operate
as a final approach controller **with supervision**."

**S3.7 — Holding Procedures (OJT).** Elements: review/practice as final approach controller; missed
approach procedures – review; holding procedures. **Schedule: 60–120 minutes per instance.**
Student on `MSP_N_APP`. Completion: operate as a final approach controller (no longer qualified
"with supervision"); repeat as necessary.

**S3.8 — S3 Practical Exam Prep.** Elements (the S3 evaluation checklist): Proper knowledge and use
of radar systems; Radar identification; Tracking aircraft; Handoffs; Coordination and Pointouts;
Traffic conflicts and advisories; Flight data management; Radar Vectoring; Sequencing and
Separation of Departures; Sequencing and Separation of Arrivals; Traffic Flow; Speed Restrictions;
Approach Vectoring; Precision Approaches; Non Precision Approaches; Missed Approach Procedures;
Holding Procedures. **Schedule: 120 minutes per instance.** Student on `MSP_N_APP`. Completion:
passes the S3 written exam and is prepared for the S3 OTS practical.

### 3.4 C1 — Controller Rating syllabus outline (3120.4F 6.1.2)
| Code | Title |
|---|---|
| C1.1 | ARTCC Radar Systems and Functions |
| C1.2 | ARTCC Airspace Sectors and Positions |
| C1.3 | Enroute Operations |
| C1.4 | Uncontrolled Airport Operations |
| C1.5 | Military Operations |
| C1.6 | Enroute Weather, NOTAMS, Advisories, TMU |
| C1.7 | C1 Practical Exam Prep |

**C1.1 — ARTCC Radar Systems and Functions.** Objective: "To introduce the student to the **DSR**
radar system and its functions." Elements: login as ARTCC observer; set up VRC with appropriate
settings for CTR (visibility centers and settings; sector file settings); observe differences in
**DSR (Display System Replacement)** display and understanding data tags. **Schedule: 60 minutes.**

**C1.2 — ARTCC Airspace Sectors and Positions.** Elements: reference to the ZMP ATCSOP; ARTCC
Airspace – general boundaries and geographic location; Airspace Responsibility and Delegation;
**High Enroute Sectors**; **Low Enroute Sectors**; Positions and Staffing; **Inter-facility
Coordination (LOAs)**. **Schedule: 60 minutes.** Classroom.
*(The individual ZMP sector numbers are NOT enumerated in 3120.4F — see §5 gaps.)*

**C1.3 — Enroute Operations (OJT).** Elements: Position Setup and Login; Radar Identification;
Inter-facility Coordination (ARTCC to ARTCC); Intra-facility Coordination (with other ZMP
controllers); Enroute Vectoring; Airspace management; Traffic conflicts and advisories; Spacing and
sequencing; **Enroute Holding**; Handoffs; Proper phraseology and communications; **"Pop-Up" IFR
Flights**; **VFR Flight Following**; **VFR On Top**; **Diversions (divert to alternate)**.
**Schedule: 60–90 minutes per instance.** Student on `MSP_11_CTR` (or equivalent).

**C1.4 — Uncontrolled Airport Operations (OJT).** Elements: the C1.3 core list, plus **IFR
clearances from uncontrolled airports** (sub-items: **Clearance void times and EDCTs**;
**One-in-One-out Rule**); Vectors to approaches; Approach clearances; **IFR Cancellations**.
**Schedule: 60–90 minutes per instance.** Student on `MSP_11_CTR` (or equivalent).

**C1.5 — Military Operations (OJT).** Elements: the C1.4 list plus **Military Operations Areas
(MOAs)**; **Restricted Areas**; **In-Flight Military Operations and Manuevers** *[sic]*.
**Schedule: 60–90 minutes per instance.** Student on `MSP_11_CTR` (or equivalent). Completion text
mistakenly reads "competency as a **departure** controller" — source defect.

**C1.6 — Enroute Weather, NOTAMS, Advisories, TMU (OJT).** *(This lesson's page is badly
column-scrambled in the extract: the labels Objective/Elements/Schedule/Equipment appear stacked in
the left gutter and their values run down the right; the mapping below is the only reading
consistent with the surrounding lessons.)* Elements: the C1.4 core list, plus —
- **Enroute Weather:** METARs; TAFs; AIRMETs/SIGMETs; Convective SIGMETs; Center Weather
  Advisories; Weather Deviation Procedures; Turbulence Reports; PIREPs
- **NOTAMs:** NOTAM Classes; NOTAM decoding/readback
- **TFRs**
- **Gate Holds/Ground Stops/Delay Programs**
- **ZMP "TMU" Procedures**

**Schedule: 60–120 minutes.** Equipment: VRC, Teamspeak, VATUSA/VATSIM/ZMP websites. Student on
`MSP_11_CTR` (or equivalent).

**C1.7 — C1 Practical Exam Prep.** Elements: Position Setup and Login; Radar Identification;
Inter-facility Coordination (ARTCC to ARTCC); Intra-facility Coordination; Enroute Vectoring;
Airspace management; Traffic conflicts and advisories; Spacing and sequencing; Enroute holding;
Handoffs; Proper phraseology and communications; IFR clearances from uncontrolled airports; Vectors
to approaches; Approach clearances; IFR Cancellations; "Pop-Up" IFR Flights; VFR Flight Following;
VFR On Top; Diversions (divert to alternate); Enroute Weather; NOTAMs.
**Schedule: 60–90 minutes per instance.** Student on `MSP_11_CTR` (or equivalent).
Completion, verbatim: instructor/mentor "shall recommend the student for the **C1 written, ZMP CTR
Major facility certification written, and OTS Practical exams**"; lesson complete "when the student
passes the written exams and is prepared to take the **C1/ZMP CTR Major facility certification OTS
practical exam**." (See the conflict with 3120.4F 2.1.1 noted in §1.3.)

---

## PART 4 — FACILITY STRUCTURE, STAFF ROLES, ROSTERING (7210.1F)

### 4.1 Governance stack (7210.1F 1.1, 1.2)
- VATSIM: Board of Governors ("BoG") and Executive Directors govern; Founders hold ownership rights
  and operational privileges. All ZMP AOM policies (ARTCCAM, ATCSOP volumes, ATCSTM) must comply
  with the **VATSIM Code of Conduct (CoC)**, **Code of Regulations (CoR)**, and the **VATSIM Global
  Ratings Policy**.
- VATUSA is a division of the **VATNA** region. ARTCCs are the sub-airspaces. All ZMP AOM policies
  must comply with all VATUSA policies.

### 4.2 Chain of command (7210.1F 3.2) — printed in **inverse seniority order**, verbatim
```
6. Facilities Leads
5. Deputy Air Traffic Manager
4. Air Traffic Manager
3. VATUSA
2. VATNA
1. VATSIM
```
"It should be understood that other administrative positions on the Board of Directors do not have
operational or administrative control per this chain of command." / "Should an operational control
question arise, a controller's **first point of contact is a facilities lead**."
*Note the source's list has no entry numbered for the Training Administrator or other BOD roles;
that omission is in the source.*

### 4.3 Administrative positions & their network callsigns (7210.1F 3.1)

| Role | Callsign on network | Key duties / requirements (7210.1F cite) |
|---|---|---|
| **Air Traffic Manager (ATM)** | `ZMP_ATM` "when on the VATSIM network as an observer, or while conducting staff duties" | 3.1.1. "Chief Executive and in charge of all oversight and administration of the ARTCC." Reports to the VATUSA Central Region Air Traffic Director. Maintains on-line presence. VATUSA HQ staff member. Establishes/oversees ARTCC web page. Initiates and maintains ARTCC SOPs with Air Traffic Director approval. "Provides for coordination of **position assignments and position restrictions** when necessary." Provides guidance to controllers/guests; optionally establishes a staff of "Mentors". Works with Region Events Coordinator. "**Conducts testing and training as defined, and in accordance with, the VATUSA Training SOP.**" Optionally conducts additional area-specific training/testing. Establishes an Assistant ATM position and submits the selection to the region ATD. "**Nominates Center Instructor candidates** to the ATM Instructor or Training Director for Training Department approval." Recommends disciplinary actions to the region ATD. ZMP-specific: manages/maintains the Air Traffic Operations Manual; promotes the ARTCC and VATSIM; strategic planning; "**strive to be available on the network … for no less than 15 hours per month**." |
| **Deputy Air Traffic Manager (DATM)** | `ZMP_DATM` | 3.1.2. Second in Command; takes over in the ATM's absence. "**direct supervisor of all Facilities and Facility Groups, and web site**"; "responsible for operational oversight at the facility level"; reports directly to the ATM regularly; "**no less than 15 hours per month**" on the network. |
| **Training Administrator (TA)** | `ZMP_TA` | 3.1.3. "responsible for overseeing the development of Training Procedures and Instructor/Mentor core of the facility." Reports to the ATM; collaterally responsible to the VATUSA Training Director; "responsible for the efficiency and effectiveness of the Center's individual training program." VATUSA Training staff member. Reports to the VATUSA TD on the state of the training department. Establishes and maintains a Training web page. "**Recruits and nominates Center Instructor candidates to the VATUSA Training Department.**" Assists the VATUSA TD in monitoring Center Instructor performance/activity. Conducts controller testing and training per the VATUSA Training Department. "Works in conjunction with the Air Traffic Manger to **establish a staff of 'Mentors'** … and to monitor their performance." Maintains close communication with the VATUSA TD. "**Performs Center Instructor duties when necessary.**" Maintains online presence. "**File a departmental monthly report to the ATM or upon request**." |
| **Events Coordinator (EC)** | `ZMP_EC` for event duties; **`ZMP_XX_OBS`** when online for observation | 3.1.4. Schedules and promotes events; reports directly to the ATM regularly. Event categories: A. ARTCC-sponsored (1 recurring single-facility, 2 recurring multi-facility, 3 special "feature"/"themed"); B. VATUSA-sponsored (1 **Friday Night Ops**, 2 other VATUSA events); C. Virtual Airlines-sponsored; D. Neighboring ARTCC-sponsored; E. **Events which aid the Training Department**. Promotes via minniecenter.org, VATUSA website, **VATUSA Events Calendar (posting required, governed by VATUSA events policy)**, VATSIM website, web forums. "Supervise events by having online presence, or by **assigning appropriate Controllers-In-Charge for events** as needed." Ensures events are appropriately staffed. Monthly departmental report to the ATM. |
| **Facility Engineer (FE)** | `ZMP_FE` when conducting facility work (e.g. testing sector files); `ZMP_XX_OBS` for observation | 3.1.5. Upkeep/maintenance of "**Sector files for use in approved VATSIM radar controller clients and associated Alias and Position (POF) files**"; works closely with ATM and DATM so all facilities can provide ATC services per SOP. |
| **Webmaster** | `ZMP_XX_OBS` (normal observation callsign) | 3.1.6. ATM or designee serves as / appoints and supervises; responsible for the external/internal ARTCC website. |
| **TeamSpeak Server Administrator** | `ZMP_XX_OBS` | 3.1.7. Responsible for TeamSpeak 3 server access. *(The source's text for 3.1.7 repeats the word "webmaster" — copy/paste defect.)* |

*Note the inconsistency in the source between `ZMP_XX_OBS` (used in 3.1.4–3.1.7) and `ZMP_II_OBS`
where "II" = operating initials (7210.1F 5.1.8). Both forms appear; neither is reconciled by the
document.*

### 4.4 Board of Directors (7210.1F 3.4)
- "an advisory board of administrative personnel who are charged with overall policy making
  decisions"; sets Mission and Strategic Plan goals; "**will serve as an appeal board of review for
  any disciplinary measures taken by the administration**."
- Composition: Air Traffic Manager; Deputy Air Traffic Manager; Training Administrator; Events
  Coordinator; Facility Engineer; Webmaster.
- Voting: each member **except the ATM** has one vote. **Three members present = quorum.** "In the
  event of a tie vote, the Air Traffic Manager will cast one vote."
- ATM may appoint advisory members at his discretion; a Bulletin shall be issued.
- All BOD communications on the ZMP TeamSpeak 3 server; all TS3 meetings memorialized into minutes
  posted on the ZMP website.

### 4.5 Staff (non-administrative) positions (7210.1F 3.3)

**Facilities Leads (7210.1F 3.3.1)** — "granted to controllers who possess a rating of with a **C1
or higher**, who are specifically familiar with the operation of facilities within their group."
Responsibilities: keeping up to date on real-world operational changes at their facilities and
passing that on to ZMP controllers, "modifying specific facility SOP with oversight from the DATM,
and ATM as needed"; development and enforcement of SOP for their facilities; answering operational
control questions for their group and the ARTCC as a whole; regular reporting to the DATM or ATM.
"Facilities Leads may have oversight of more than one facilities group."

**Facility Groups (7210.1F 3.3.1.1–3.3.1.6):**

| Group | Member facilities | Note |
|---|---|---|
| **M98** (3.3.1.1) | M98 TRACON/ATCT (KMSP); KMIC ATCT; KSTP ATCT; KFCM ATCT; KANE ATCT | 3.3.1.1.1: "The M98 facility group is to be **overseen by the Minneapolis ARTCC Board of Directors** and shall have not appointed lead position." |
| **Sioux Empire** (3.3.1.2) | R90 TRACON and ATCT's (KOMA, KOFF, KLNK); KDSM TRACON/ATCT; KFSD TRACON/ATCT; KGRI ATCT; KSUX TRACON/ATCT | — |
| **Dakota** (3.3.1.3) | KBIS TRACON/ATCT; KFAR TRACON/ATCT; KGFK ATCT; KMIB RAPCON/ATCT; **KMOT ATCT**; KRDR RAPCON/ATCT | KMOT appears here but **not** in the 7210.1F 1.4 facility table |
| **Gopher State** (3.3.1.4) | KDLH TRACON/ATCT; KRST TRACON/ATCT; KSTC ATCT; KRYM ATCT | — |
| **Badger State** (3.3.1.5) | KCWA ATCT; KEAU ATCT; KGRB TRACON/ATCT; KLSE ATCT | — |
| **Wolverine State** (3.3.1.6) | KAPN RAPCON/ATCT; KSAW ATCT; KTVC ATCT; KGOV ATCT | — |

**Instructors (7210.1F 3.3.2)** — "Controllers appropriately granted an **instructor rating by
VATUSA** and who are assigned to Minneapolis ARTCC by VATUSA shall be part of the Training
Department as staff members. They shall report directly to the Training Administrator and the ATM."
Duties, verbatim bullets:
- Reports to the assigned Training Administrator; collaterally responsible to the VATUSA Training
  Director; responsible for assistance in development/maintenance of the Center's Training Program.
- "**Establishes a training syllabus for each student in the ARTCC in conjunction with the Training
  Administrator.**"
- Conducts controller testing and training per the VATUSA Training Department.
- "**Assess controllers' abilities and makes recommendations for promotions as necessary.**"
- Provides the TA with reports on controller training/development performance when requested.
- Maintains an online and active presence on VATSIM.
- "**Provides a minimum 3 hours of student instruction per month** unless arrangements are made with
  the Training Administrator."
- "**Must have previously held a position of Minneapolis ARTCC Mentor for 30 calendar days.**"

**Mentors (7210.1F 3.3.3)** — "Controllers appropriately granted as a Mentor by Minneapolis ARTCC
shall be part of the Training Department as staff members. They shall report directly to the
Training Administrator." Duties:
- Conducts controller training per the VATUSA and Minneapolis ARTCC Training Department.
- "**Assess controllers' abilities and makes recommendations to Staff Instructors as necessary.**"
- Provides the TA with reports on performance of controller training and development when
  requested.
- Maintains an online and active presence on VATSIM.

Requirements to become a Mentor (7210.1F 3.3.3), verbatim:
- "**Must be rated S3 for 30 calendar days.**"
- "**Must be recommended to the Training Administrator by a Staff Instructor.**"

Implied training-staff ladder from the above: rated **S3 for 30 days + Staff Instructor
recommendation → Mentor**; **Mentor for 30 calendar days + VATUSA instructor rating (nominated by
ATM/TA to VATUSA) → Instructor**. Only the two quoted prerequisites are stated; there is **no
minimum rating stated for Instructor beyond "instructor rating granted by VATUSA"** in
ZMP_Order_7210_1F.txt.

Mentor/instructor identity on the network: **no separate `_INS` / `_MTR` callsign convention is
stated in ZMP_Order_7210_1F.txt.** Trainers monitoring a student appear via the TS3 rule in 2.4
(below) and, per 3120.4F, log into an actual control position (e.g. `MSP_N_APP` during S3.4).

### 4.6 Rostering, currency, and how controllers get onto sectors

**Roster status designations (7210.1F 4.1):** *Active* — met currency requirements; *Inactive* — has
not met currency requirements; *LOA* — on an approved leave of absence. Applies to controllers on
"either the member roster or visiting roster."

**Currency (7210.1F 4.2):**

| Class | Requirement | Cite |
|---|---|---|
| **Non-Rated Controllers** | "must complete a minimum of **two training sessions per quarter** to be considered current" | 7210.1F 4.2.1 (heading in TOC reads "4.2.1 All Controllers"; body heading reads "4.2.1 Non-Rated Controllers") |
| **Rated Controllers** | "controllers holding a rating to control any position in Minneapolis ARTCC airspace must log a minimum of **three hours on position every quarter**" | 7210.1F 4.2.2 (TOC calls it "4.2.2 Administration and Staff"; body calls it "Rated Controllers") |
| ATM / DATM | "strive to be available on the network either as a staff observer or in an ATC position for **no less than 15 hours per month**" | 7210.1F 3.1.1, 3.1.2 |
| Instructors | "**minimum 3 hours of student instruction per month**" | 7210.1F 3.3.2 |

**Removal from roster (7210.1F 4.3):**
- 4.3.1 Inactivity — "Quarterly roster audits will take place on the **first day of the months of
  January, April, July, and October**. Controllers who have not met the currency requirements
  specified above will be subject to removal from the roster."
- 4.3.2 Disciplinary — non-compliance with SOPs, this manual, or administration orders "may be
  subject to disciplinary action up to and including removal from the roster."

**Leaves of Absence (7210.1F 4.4):** granted by the ATM or DATM for a defined amount of time; while
an LOA is in effect all currency requirements are waived until the specified expiry. "Should an LOA
be requested for **more than 90 calendar days**, the controller will be removed from the crew
roster unless extreme unforeseen circumstances are the reason for the request. In such extreme
cases, the LOA will be subject to approval by a **vote of the BOD**."

**Transfer requests (7210.1F 4.5):** handled by the ATM per VATUSA policy; the ATM "reserves the
right to refuse transfer requests with cause", cause including but not limited to disciplinary
record; activity (hours logged) history; recommendation by past ARTCC ATMs; recommendation by
VATUSA staff; recommendation by the ZMP BOD.

**New controllers (7210.1F 3.7):** "admitted … under applicable and current VATSIM/VATUSA
policies." No further ZMP-local admission steps are stated.

**Visiting controllers (7210.1F 3.8):**
- ATM and Webmaster maintain a visiting-controller list on the ZMP website.
- Application: "send an **email to the Air Traffic Manager** with their request of visiting status
  (include **name, rating, home ARTCC and CID**)." Footnote: "The Minneapolis ARTCC Website shall
  waive this step if an application is available to visitors."
- Eligibility bar: "must not have a negative disciplinary record within VATSIM within the last
  **six (6) months**", where disciplinary records include: "Suspension by VATSIM or VATUSA for
  **1 month or more**"; "**Banned from an ARTCC/FIR**"; "**More than 3 conflict resolution
  submissions within a 1 year period**."
- ATM or designee may accept or reject at discretion.
- "Once listed on the … Visiting Controller Roster, the visiting controller **must undergo a
  competency evaluation**. The evaluation will be to judge the visiting controller's adherence to
  standards as set forth in the **VATUSA Controller Rating Guidelines and Standards**. The visiting
  controller will be **removed from the roster if they are unable to pass the evaluation at the
  level they are rated for, and referred back to their home ARTCC for retraining**."
- Special rules of conduct for visitors:
  - "All visiting controllers must abide to all Minneapolis ARTCC SOPs."
  - "The visiting controller must **relinquish his logged in ATC position to any Minneapolis ARTCC
    'home controller' member as soon as practical when requested by a Minneapolis ARTCC Staff
    Instructor for the purposes of training**."
  - "All visiting controllers that hold the rank of **Staff Instructor (I1) or Senior Instructor
    (I3)** at their respective 'home' ARTCC are **required to login under the Controller (C1)
    rank** while controlling in Minneapolis ARTCC."
  - Any active visitor must comply with 7210.1F Section 5 in determining which positions they are
    eligible to staff.
- Cross-reference: 3120.4F 2.1.1 requires transfer and visiting controllers **C1 or higher** to
  complete all ZMP MAJOR facility requirements before being considered certified on Minneapolis
  Center.

**Vacancies:**
- *Administrative* (7210.1F 3.5): internal applications accepted before external; vacancy posted in
  the ZMP Forums and the website News Section with job description, requirements, and application
  request. "The deadline for applications shall not be any earlier than **seven (7) calendar
  days** from post date." After the deadline the ATM has "**fourteen (14) calendar days**" to
  recommend his choice to the BOD; the BOD convenes and votes to confirm; "**the ATM will not
  vote**"; confirmation vote "**no later than seven (7) calendar days** after the ATM indicates his
  choice." Ties → re-ballot. "If no confirmation can be made within **thirty (30) calendar days**
  of the initial vacancy posting, the vacancy will be posted externally to the VATUSA community."
  Announcement posted on forum and website once confirmed.
- *Staff* (7210.1F 3.6): "The Air Traffic Manager will have full authority to fill staff position
  vacancies. Any decision made by the ATM in this regard can be appealed to the BOD."

### 4.7 How controllers are put onto sectors — staffing philosophy (7210.1F 5.3)

**5.3.1 General/Non-Event Staffing** — verbatim staffing philosophy:
- "Staff **CTR positions first** if certified"
- "Staff **ATCT positions after CTR** positions are adequately staffed"
- "Staff **TRACON positions only if CTR positions feel the need for local Approach and Departure
  control assistance**"
- "A controller who is not certified for Center should **work the highest possible position
  available to them**."
- "A Minneapolis ARTCC controller in any Center position may **treat Class C and Class D facilities
  as uncontrolled (except when staffed)** when it is not operationally practical to do so."

**5.3.2 ARTCC Sponsored Events** — "the Events Coordinator, ATM, or the **Controller-in-Charge** for
the event shall determine staffing requirements for the event."

**5.3.3 Neighboring ARTCC Events** — EC or ATM strives to fill all requested staffing. "At the
minimum, Minneapolis ARTCC will **staff a CTR position** in support of a neighboring ARTCC event
and will staff up additional positions at the request of the Air Traffic Manager, Events
Coordinator, a VATUSA administrator, or the neighboring ARTCC administration."

**5.3.4 VA Events** — "At the minimum, Minneapolis ARTCC will **staff a TWR position** in support of
VA events."

**Position notification (7210.1F 2.6.1)** — "All controllers shall, **prior to logging onto and/or
off of any position**, contact the **CIC or most senior ZMP controller online or staff member** on
VATSIM and/or TeamSpeak to see where needed staffing requirements exist and/or to notify them of a
pending position opening and/or closing."

**Position relief briefings (7210.1F 2.6.2)** — "All controllers must utilize Position Relief
Briefings as written into the appropriate facility Standard Operating Procedures." *(The actual
briefing format is in the facility SOPs, not in 7210.1F; the S1.7 element list also includes
"Position Relief Briefing".)*

### 4.8 Facilities under ZMP administration (7210.1F 1.4) — full table, exact values

| Facility Name | Unit Number/ICAO | Location |
|---|---|---|
| Alpena DoD RAPCON/ATCT | KAPN | Alpena, MI |
| Anoka ATCT | KANE | Blaine, MN |
| Appleton ATCT | KATW | Appleton, WI |
| Bismarck TRACON/ATCT | KBIS | Bismarck, ND |
| Central Wisconsin ATCT | KCWA | Mosinee, WI |
| Crystal ATCT | KMIC | Crystal, MN |
| Des Moines TRACON/ATCT | KDSM | Des Moines, IA |
| Duluth TRACON/ATCT | KDLH | Duluth, MN |
| Eau Claire ATCT | KEAU | Eau Claire, WI |
| Fargo TRACON/ATCT | KFAR | Fargo, ND |
| Flying Cloud ATCT | KFCM | Eden Prairie, MN |
| Grand Forks ATCT | KGFK | Grand Forks, ND |
| Grand Island ATCT | KGRI | Grand Island, NE |
| Grayling DoD ATCT | KGOV | Grayling, MI |
| Green Bay TRACON/ATCT | KGRB | Green Bay, WI |
| La Crosse ATCT | KLSE | La Crosse, WI |
| Lincoln TRACON/ATCT | KLNK | Lincoln, NE |
| Minneapolis Center | KZMP | Farmington, MN |
| Minneapolis TRACON/ATCT | M98/KMSP | Minneapolis, MN |
| Minot DoD RAPCON/ATCT | KMIB | Minot AFB, ND |
| Omaha TRACON/ATCT | R90/KOMA/KOFF | Omaha, NE |
| Ray S Miller DoD ATCT | KRYM | Camp Ripley, MN |
| Red River DoD RAPCON/ATCT | KRDR | Grand Forks AFB, ND |
| Rochester TRACON/ATCT | KRST | Rochester, MN |
| Sawyer ATCT | KSAW | Gwinn, MI |
| Sioux City TRACON/ATCT | KSUX | Sioux City, IA |
| Sioux Falls TRACON/ATCT | KFSD | Sioux Falls, SD |
| Saint Cloud ATCT | KSTC | St. Cloud, MN |
| Saint Paul ATCT | KSTP | St. Paul, MN |
| Traverse City ATCT | KTVC | Traverse City, MI |

(30 rows. KMOT is absent here but present in the Dakota facility group at 3.3.1.3.)

**7210.1F 1.3 Minneapolis ARTCC Airspace — PICTURE-ONLY.** The section body is a caption only:
"The geographic area indicated on the map is designated as airspace under the control of
Minneapolis ARTCC. Certain sectors of this airspace may be under shared control with Neighboring
ARTCC's as contemplated by Letters of Agreement." **The map itself is an image with no text layer;
the airspace boundary, all sector outlines, and all labels on that map are UNREAD.**

### 4.9 Conduct / infrastructure items relevant to training operations (7210.1F Section 2)
- **Website:** `www.minniecenter.org`. "Use of the website by members on the active and visiting
  controller rosters is granted **by invitation only**. Access may be denied or suspended at any
  time." Central point for NOTAMS, announcements, events (7210.1F 2.3).
- **TeamSpeak 3 (7210.1F 2.4):** server administered by the ATM or designee; client from
  `www.goteamspeak.com`; "participation in TeamSpeak 3 sessions are **recommended, but not
  required**." Naming: members use First and Last name (e.g. "John Smith"); **visitors** use First
  and Last name **plus home facility 3-letter identifier** (e.g. "John Smith - ZAB").
  Channel structure: **Lounge, Operational, Administrative, and Training** channels.
  - "Controllers actively logged onto the VATSIM network in any ZMP enroute or terminal position
    **and/or while actively monitoring a student on a live network position** will retain control
    over their operations channel."
  - "**Controllers who are conducting sweatbox/training sessions will retain control over their
    training channel.**"
  - "Staff and Training members will retain control of their respective administrative channels."
  - Discipline ladder for TS3 conduct violations, verbatim: "**First infraction, 48 hour
    suspension. Second Infraction, 7 day suspension. Third/Final infraction, indefinite removal.**"
  - Connection address: **`ts.minniecenter.org:9987`**.
- **Forums (7210.1F 2.5):** 7 numbered terms/conditions; item 2 lists prohibited material (A no
  political/religious/other propaganda; B not obscene / no profanity; C consistent with
  VATSIM/VATUSA legal obligations; D not for commercial purposes; E no personal threats); item 3
  copyrighted material needs owner permission; item 7 "All members must register … using their
  First and Last names. Accounts not utilizing this format will be subject to immediate removal."
- **Professionalism (7210.1F 2.6):** controllers responsible for professionalism on the scopes with
  fellow controllers and pilots; "highly encouraged to reach out to neighboring controllers who are
  online and active"; non-conformance "may be subject to discipline under VATSIM's disciplinary
  procedures."
- **ZMP Code of Conduct (7210.1F 2.1.4):** "All controllers will follow and adhere to the
  Minneapolis ARTCC Air Traffic Operations Manual. Failure to do so will result in disciplinary
  action and/or may result in removal from the Minneapolis ARTCC Roster."

---

## PART 5 — FLIGHT PROGRESS STRIP MARKING (vZMP N7110.101)

### 5.0 CRITICAL SCOPE WARNING — there is NO en route strip format in this corpus
The task asked for "the full strip format **for en route**". **N7110.101 is an ATCT-only order.**
Its preamble limits it to "controllers working ATCT positions in vZMP" (N7110.101 preamble) and
1.2 AUDIENCE says "intended for use by all VATSIM Minneapolis controllers working **ATCT
positions**." Its seven substantive chapters cover only: ATCT IFR Departures, ATCT VFR Departures
(with and without vNAS flightplan), ATCT Local VFR, and ATCT Arrival Aircraft.

**An en route (center) flight progress strip format — the FAA 7110.65 en route strip boxes 1–32, en
route strip symbols, or any ZMP center strip convention — is not stated in ZMP_Strip_Marking.txt.**
For completeness I also checked the other two large ZMP source texts: `ZMP_Order_7200_1O.txt`
contains **zero** occurrences of the word "strip", and `ZMP_ATCSOP_v7.txt` contains only **two**.
There is no en route strip box map anywhere in the ZMP source-doc set.

The only strip-adjacent en route/training references in the other two documents read are:
- 3120.4F S1.2 / S2.1 element "Use of flight strips" and completion item "How to access the flight
  strips and flight plans for aircraft"
- 3120.4F S1.5 element "Flight plan management / **Flight Progress Strips**"
- 3120.4F S1.7 element "Accessing Flight Strip Data"
- 3120.4F 2.3/2.4/2.5 Knowledge Area 8, "**Flight Plan/Strip Management**"

### 5.1 General rules (N7110.101 Chapter 2)

**2.1 TOP-DOWN CONTROLLING EXEMPTION** — verbatim: "Controllers working ATCT positions 'top-down',
that is a center or approach controller working an underlying ATCT, **may opt not to make
annotations on flight strips** for aircraft under their jurisdiction in the interest of lessening
controller workload."

**2.2 COLOR CODING** — verbatim: "The following chapters will contain numbered fields in flight
strip fields for referencing in the SOP. The position(s) responsible for annotating each field are
listed in tables in every chapter. Additionally, the fields will be color coded to as follows to
denote the position(s) responsible for annotating them **if not filled by the computer**:"

| Color | Responsible position |
|---|---|
| **Blue** | Flight Data/Clearance Delivery |
| **Purple** | Ground Control |
| **Red** | Local Control |
| **Black** | Computer-entered/not assigned |

### 5.2 THE BOX MAP — what is readable and what is a picture

**The physical box geometry is PICTURE-ONLY.** Each of N7110.101 §3.1, §4.1, §5.1, §7.1 places a
graphic of the strip with numbered boxes drawn on it. Verified by re-running `pdftotext` **without**
`-layout` on pages 6–12 of `ZMP_Strip_Marking.pdf`: the only text emitted is the running list of
field names and the BLOCK/INFORMATION tables — no coordinates, no row/column structure, no cell
labels from inside the strip graphic.

**Therefore the following is UNREAD and must not be reconstructed from memory:**
- Where boxes 1–20 physically sit on the strip (row, column, left-to-right order)
- The relative sizes/shapes of the boxes
- Any box present on the graphic that is never referenced in a BLOCK table
- Whether a **box 9** exists on the *arrival* strip (see §5.6 — the arrival field list in 7.1 jumps
  from 8 to 10)
- The vStrips rendering / the actual strip stock used

**What IS readable is the complete field-number → content mapping**, reproduced exhaustively below.

### 5.3 Chapter 3 — ATCT **IFR Departures**

**3.1 FLIGHT PROGRESS STRIP** — computer-populated fields, verbatim list:

| Box | Content |
|---|---|
| 1 | Aircraft ID |
| 2 | Revision Number |
| 3 | Aircraft Type/Equipment |
| 4 | Computer ID |
| 5 | Beacon code |
| 6 | Proposed departure time |
| 7 | Filed cruise altitude |
| 8 | Departure Airport |
| 9 | Arrival Airport |
| 10 | Route |
| 11 | Remarks |

**3.2 FLIGHT DATA/CLEARANCE DELIVERY STRIP MARKING** (blue):

| BLOCK | INFORMATION |
|---|---|
| 12 | Reported ATIS letter/"WX" if local weather reported |
| 13 | Pushback time (last two digits, if gate hold/metering procedures in effect) |
| 14 | Gate number or Ramp location, if reported |
| 15 | "PDC" if PDC issued, or X/Check mark if clearance issued and read back via voice |
| 17 | Departure runway (Can be shortened to L/R if parallel runways in use) |
| 18 | Departure controller STARS ID |

**3.3 GROUND CONTROL STRIP MARKING** (purple):

| BLOCK | INFORMATION |
|---|---|
| 12 | Reported ATIS letter/"WX" if local weather reported |
| 13 | Pushback time (last two digits, if gate hold/metering procedures in effect) |
| 14 | Gate number or Ramp location |
| 16 | Intersection departure taxiway (if applicable) |
| 17 | Departure runway (can be shortened to L/R if parallel runways in use) |
| 19 | Wheels up/EDCT time (if applicable, last two digits) |

**3.4 LOCAL CONTROL STRIP MARKING** (red):

| BLOCK | INFORMATION |
|---|---|
| 16 | Intersection departure taxiway (if applicable) |
| 20 | Assigned departure heading |

### 5.4 Chapter 4 — ATCT **VFR Departures (vNAS Flightplan)**

**4.1 FLIGHT PROGRESS STRIP.** NOTE, verbatim: "Only applicable to aircraft with a vNAS flightplan
filed/entered. Typically for aircraft exiting B/C/D airspace **with** flight following."

| Box | Content |
|---|---|
| 1 | Aircraft ID |
| 2 | Revision Number |
| 3 | Aircraft Type/Equipment |
| 4 | Computer ID |
| 5 | Beacon code |
| 6 | Proposed departure time |
| 7 | **VFR/Cruise altitude if entered** |
| 8 | Departure airport |
| 9 | Arrival airport |
| 10 | Route |
| 11 | Remarks |

**4.2 FLIGHT DATA/CLEARANCE DELIVERY:**

| BLOCK | INFORMATION |
|---|---|
| 12 | Reported ATIS letter/"WX" if local weather reported |
| 14 | Gate number or ramp location, if reported |
| 15 | X/Check mark if clearance issued and read back correctly *(note: no "PDC" option here)* |
| 17 | Departure runway (can be shortened to L/R if parallel runways in use) |
| 18 | Departure controller STARS ID |

**4.3 GROUND CONTROL:**

| BLOCK | INFORMATION |
|---|---|
| 12 | Reported ATIS letter/"WX" if local weather reported |
| 14 | Gate number or ramp location |
| 16 | Intersection departure taxiway (if applicable) |
| 17 | Departure runway (can be shortened to L/R if parallel runways in use) |

*(Note: no block 13 and no block 19 in the VFR-with-flightplan ground table.)*

**4.4 LOCAL CONTROL:**

| BLOCK | INFORMATION |
|---|---|
| 16 | Intersection departure taxiway (if applicable) |
| 20 | Assigned departure heading (if applicable) |

### 5.5 Chapter 5 — ATCT **VFR Departures (No vNAS Flightplan)**

**5.1 FLIGHT PROGRESS STRIP.** NOTE, verbatim: "For aircraft without a vNAS flightplan
entered/filed. Typically for aircraft exiting B/C/D airspace **without** flight following."
**There is NO numbered field list in 5.1** — only the note plus a strip graphic. In this case
blocks 1, 2 and 10 are **hand-written by Flight Data/Clearance Delivery** rather than computer-fed.

**5.2 FLIGHT DATA/CLEARANCE DELIVERY:**

| BLOCK | INFORMATION |
|---|---|
| 1 | Aircraft ID |
| 2 | Aircraft type (equipment optional) |
| 10 | **"VFR" and direction of flight (e.g. "VFR N" for northbound VFR)** |
| 12 | Reported ATIS letter or "WX" if local weather reported |
| 14 | Gate/ramp location, if reported |
| 15 | X/Check mark if clearance issued and read back correctly |
| 17 | Departure runway (can be shorted to L/R if parallel runways in use) *[sic "shorted"]* |

*(No block 18 here — no departure-controller STARS ID for a no-flightplan VFR.)*

**5.3 GROUND CONTROL:**

| BLOCK | INFORMATION |
|---|---|
| 12 | Reported ATIS letter or "WX" if local weather reported |
| 14 | Gate/ramp location |
| 16 | Intersection departure taxiway (if applicable) |
| 17 | Departure runway (can be shorted to L/R if parallel runways in use) |

**5.4 LOCAL CONTROL:**

| BLOCK | INFORMATION |
|---|---|
| 16 | Intersection departure taxiway (if applicable) |
| 17 | Departure runway (can be shorted to L/R if parallel runways in use) |
| 20 | Assigned departure heading (if applicable) |

*(Chapter 5 is the only chapter where Local Control is also given block 17.)*

### 5.6 Chapter 6 — ATCT **Local VFR Aircraft** (half strip)

**6.1 FLIGHT PROGRESS STRIP.** NOTE, verbatim: "For aircraft not leaving ATCT airspace, e.g.
aircraft in the pattern. **Obtain a half strip by right clicking the vStrips flight strip bay and
selecting 'Add half-strip.'**"

**6.2 STRIP MARKING.** NOTE, verbatim: "**Not specific to controller position.** Some pilots may
skip calling clearance and call ground for taxi for pattern work."

**On the half strip the block numbers are REDEFINED:**

| BLOCK | INFORMATION |
|---|---|
| 1 | Aircraft ID – Aircraft Type (e.g. `N167DP – PRM1`) |
| 2 | Intentions (e.g. Pattern work) |
| 3 | Remarks (any extra information deemed necessary e.g. intersection departure, runway, special requests) |

### 5.7 Chapter 7 — ATCT **Arrival Aircraft**

**7.1 FLIGHT PROGRESS STRIP.** NOTE, verbatim: "Applies to **both IFR and VFR aircraft with a vNAS
flightplan entered**." Field list exactly as printed:

| Box | Content |
|---|---|
| 1 | Aircraft ID |
| 2 | Revision number |
| 3 | Aircraft type/equipment |
| 4 | **CID** |
| 5 | Beacon code |
| 6 | **Previous fix** |
| 7 | **Coordination fix** |
| 8 | **Estimated arrival time** |
| **9** | **NOT PRINTED — the source list skips from 8 to 10.** Whatever box 9 is on the arrival strip is either unlabeled in the order or shown only on the graphic. **Not stated in ZMP_Strip_Marking.txt.** |
| 10 | Flight rules |
| 11 | Destination and remarks |

**7.2 LOCAL CONTROL STRIP MARKING:**

| BLOCK | INFORMATION |
|---|---|
| 14 | Gate number/parking location (if reported) |
| 20 | **"L" if the pilot accepts a LAHSO clearance** |

**7.3 GROUND CONTROL STRIP MARKING:**

| BLOCK | INFORMATION |
|---|---|
| 14 | Gate number/parking location (if reported) |

### 5.8 CONSOLIDATED BLOCK DICTIONARY (blocks 12–20, all chapters)

| Block | Meaning | Who writes it | Appears in |
|---|---|---|---|
| 12 | Reported ATIS letter, or **"WX"** if local weather reported | FD/CD (blue) and GC (purple) | 3.2, 3.3, 4.2, 4.3, 5.2, 5.3 |
| 13 | Pushback time, **last two digits**, only if gate hold/metering procedures in effect | FD/CD and GC | 3.2, 3.3 (IFR departures only) |
| 14 | Gate number or Ramp location (departures); Gate number/parking location (arrivals) | FD/CD, GC; and LC on arrivals | 3.2, 3.3, 4.2, 4.3, 5.2, 5.3, 7.2, 7.3 |
| 15 | **"PDC"** if PDC issued, or **X / check mark** if clearance issued and read back via voice. On VFR strips the "PDC" option is dropped — X/check mark only. | FD/CD | 3.2, 4.2, 5.2 |
| 16 | Intersection departure taxiway (if applicable) | GC and LC | 3.3, 3.4, 4.3, 4.4, 5.3, 5.4 |
| 17 | Departure runway — **can be shortened to L/R if parallel runways in use** | FD/CD, GC; also LC in ch. 5 | 3.2, 3.3, 4.2, 4.3, 5.2, 5.3, 5.4 |
| 18 | Departure controller **STARS ID** | FD/CD | 3.2, 4.2 |
| 19 | **Wheels up / EDCT time** (if applicable, **last two digits**) | GC | 3.3 (IFR departures only) |
| 20 | **Assigned departure heading** (departures); **"L"** if the pilot accepts a **LAHSO** clearance (arrivals) | LC | 3.4, 4.4, 5.4, 7.2 |

### 5.9 Symbols and shorthand defined anywhere in N7110.101
- **X / check mark** (block 15) = clearance issued and read back correctly (via voice).
- **"PDC"** (block 15) = a Pre-Departure Clearance was issued (IFR departures only).
- **"WX"** (block 12) = local weather reported instead of an ATIS letter.
- **"VFR" + direction letter** (block 10, no-flightplan VFR) = e.g. `VFR N` for northbound VFR.
- **"L"** (block 20 on an arrival) = pilot accepts a LAHSO clearance.
- **L / R** (block 17) = shorthand for a parallel-runway designator.
- **Last two digits only** convention for both pushback time (block 13) and wheels-up/EDCT (block
  19).
- **Color code** per 2.2 (blue/purple/red/black) — see §5.1.
- *No other symbol set (no arrows, no slashes, no en route strike-through/circle conventions) is
  defined in ZMP_Strip_Marking.txt.*

### 5.10 Chapter 8 — FLIGHT STRIP EXAMPLES: **CAPTIONS READABLE, STRIP IMAGES UNREAD**
Each example is a caption plus a picture of the completed strip. **The filled-in strips themselves
are images with no text layer — the actual pen-marks shown are UNREAD.** The captions, which fully
describe what the picture contains, are reproduced verbatim:

**8.1 IFR DEPARTURES** (three examples)
1. "UAL2159 has ATIS W, was located at gate E6, received a PDC, departed runway 17, was assigned
   R's frequency as their departure frequency, and was assigned heading 140 on departure."
2. "SKW3869 has ATIS X, was assigned a pushback time of 45 minutes past the hour, was parked at
   C13, was assigned a PDC, departed runway 12L, was assigned R's frequency as their departure
   frequency, and was assigned heading 090 on departure."
3. "SKW3979 has ATIS G, was parked at gate 2, was issued and read back their clearance, departed
   runway 31, and had an EDCT time of 15 minutes past the hour."

**8.2 VFR DEPARTURE (vNAS FLIGHTPLAN)**
- "N795HG has ATIS B, was parked at Signature, was issued and read back their clearance, departed
  runway 30L at W5, and was assigned E's frequency as their departure frequency."

**8.3 VFR DEPARTURE (NO vNAS FLIGHTPLAN)**
- "N172SP, a C172, is an eastbound VFR departure with ATIS P. They were parked at Thunderbird
  Aviation, received their clearance, and departed from intersection A3 on runway 10L."

**8.4 LOCAL VFR**
- "N484TR is a Piper Comanche doing pattern work. They are a student pilot."

**8.5 ARRIVAL AIRCRAFT**
- "SKW3892 is parking at gate C15 and accepted a LAHSO clearance to hold short of taxiway K on
  runway 22."

*(Note: "R's frequency" and "E's frequency" in 8.1/8.2 are STARS ID single letters going into block
18. The mapping of those letters to actual departure sectors/frequencies is **not stated in
ZMP_Strip_Marking.txt**.)*

---

## PART 6 — CONSOLIDATED GAP LIST (what a training tool CANNOT source from these three files)

Picture-only / unreadable content:
1. **7210.1F 1.3 ARTCC airspace map** — image, no text layer. All boundary and sector labels UNREAD.
2. **N7110.101 §3.1, §4.1, §5.1, §7.1 strip diagrams** — images. The geometric box map (where boxes
   1–20 physically sit) is UNREAD. Confirmed by a second extraction without `-layout`.
3. **N7110.101 Chapter 8 example strips** — images. Only the captions are readable.
4. **N7110.101 arrival strip box 9** — never named in the text.
5. **N7110.101 §2.2 colour coding as applied** — the actual blue/purple/red/black colouring of the
   numbers lives in the graphics; the legend is readable, the applied colours are not.
6. **3120.4F S1.3 / S2.2 "regulations listed in italic font"** — italics are lost in the extraction;
   which FAR/7110.65 items carry the higher comprehension standard is UNREADABLE.
7. **3120.4F Appendices B, C, D** — headings only; the referenced handouts/materials are absent
   (blank placeholder pages, or image-only content, in either case UNREAD).
8. **7210.1F 5.2.2 "Major" column** — only KAPN carries "Yes"; the rest is empty in the text layer
   and cannot be trusted. Needs human verification against `ZMP_Order_7210_1F.pdf` page 29.
9. **Both revision logs and the 3120.4F LEP** — column-shuffled; date↔revision↔initials pairings
   are unreliable.

Content simply not present in these three documents:
10. **No en route / center flight progress strip format** anywhere (see §5.0).
11. **No R90 (Omaha) certification tier, syllabus, or checklist** (see §1.4).
12. **No minor/major ground-error taxonomy, no OTS scoring rubric, no error thresholds** (see §1.6).
13. **The 3120-25 training session report form is named once and never reproduced** (see §2.3) —
    this is the missing "how is a session evaluated" artifact.
14. **No solo-endorsement duration/renewal/revocation rules**, and no solo provision at all above
    Clearance Delivery/Ground (see §1.5).
15. **No numeric OJT hour minimums** for any MFC — every standard says only
    "appropriate/commensurate logged time."
16. **No C3 (Senior Controller) path.**
17. **No ZMP center sector numbers enumerated** — 3120.4F C1.2 says "High Enroute Sectors" and "Low
    Enroute Sectors" as topic headings only; `MSP_NN_CTR` is defined generically with `MSP_11_CTR`
    as the sole named callsign. Sector numbers live in the ZMP ATCSOP, not in these files.
18. **No frequencies, altitudes, fixes, or headings of any kind** appear in these three documents
    other than the illustrative strip-example values quoted verbatim in §5.10 and the TS3 port
    `ts.minniecenter.org:9987`.
19. **No separate instructor/mentor network callsign convention** (see §4.5).
20. **No written-exam question banks, no OTS scenario definitions, no CBI module list** — 3120.4F
    1.4.3 only names "VATUSA CBI materials" as a self-study source.
