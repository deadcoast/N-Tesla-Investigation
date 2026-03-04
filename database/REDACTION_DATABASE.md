# REDACTION DATABASE

**File:** REDACTION_DATABASE.md  
**Cross-ref:** MASTER_INDEX.md  
[TAG:TYPE=DATABASE] [TAG:CATEGORY=REDACTIONS]

---

## REDACTION SCHEMA

```PAT
ID:              RED-XXX
SOURCE_DOC:      Document name / DOC-XXX
DATE:            Document date
PAGE:            Page number(s)
SIGNATORIES:     Who signed the document
BEFORE:          Exact context preceding the redaction
AFTER:           Exact context following the redaction
GAP_ANALYSIS:    What the logical gap between BEFORE and AFTER implies
ENTITIES:        ENT-XXX involved
SUSPICION:       1-5
BEHAVIORAL_READ: Why this specific content was removed (human pattern)
HYPOTHESIS:      What is most likely hidden here
INVESTIGATIVE_ACTION: What to do next
```

---

## RED-001 | HOOVER-SIGNED TORPEDO MEMO

```PAT
ID:           RED-001
SOURCE_DOC:   FBI Memo — January 11, 1943
DATE:         1943-01-11
PAGE:         3 (and following — multiple pages blacked)
SIGNATORIES:  J. Edgar Hoover [CONFIRMED — signed personally]

BEFORE:
  "Tesla completed many experiments with radio transmissions,
  one of which involved building and perfecting a revolutionary
  type of torpedo, a device not in use by any—"
  [REDACTION BEGINS]

AFTER:
  "The memo goes on to warn that this information may fall
  into enemy hands."

GAP_ANALYSIS:
  The sentence cuts mid-description of the torpedo's distinguishing
  characteristic. "A device not in use by any [nation/military/power]"
  is the most logical completion — meaning Tesla had something
  genuinely novel that no existing military possessed.
  The jump from technical description to "enemy hands" warning
  implies the redacted content contained SPECIFIC PARAMETERS
  that would be actionable intelligence, not general description.
  General descriptions don't get redacted. Specifications do.

ENTITIES:    ENT-001, ENT-002, ENT-006
SUSPICION:   5

BEHAVIORAL_READ:
  Hoover's personal signature on a field memo is anomalous.
  FBI directors sign policy, not operational memos.
  His personal involvement signals one of two things:
  A) Someone above Hoover (Wallace, FDR level) was being briefed
     and Hoover needed to personally certify the assessment
  B) Hoover had personal stake in controlling this information
  
  The torpedo is the key word. This is not Death Ray speculation.
  A torpedo is a deliverable weapon with specific military application.
  If Tesla had a functional torpedo design, that is a conventional
  weapons breakthrough, not a fringe energy claim.
  Conventional weapons breakthroughs get absorbed, not dismissed.

HYPOTHESIS:
  The redacted content describes specific operational parameters
  of Tesla's torpedo design — likely guidance system, propulsion,
  or range specifications that were extracted and used.
  The post-war guided missile / torpedo programs should be
  cross-referenced against Tesla's documented torpedo work.
  
  SECONDARY HYPOTHESIS: The redaction protects not the technology
  but a NAME — possibly the "Kenneth [REDACTED]" individual
  from the Hoover-signed cross-reference memo, if that person
  was the recipient or conduit of torpedo information.

INVESTIGATIVE_ACTION:
  1. FOIA: Full Jan 11 1943 memo with appeal citing historical
     research exemption and passage of 80+ years
  2. Cross-reference: US Navy torpedo R&D programs 1943-1950
     for any anomalous guidance system innovations
  3. Research: Tesla's documented torpedo work — what did he
     claim specifically in 1934 military sales pitch?
  4. Connect: RED-001 to LED-004 (Kenneth [REDACTED])
```

---

## RED-002 | KOSANOVIĆ THEFT — HEAVILY REDACTED RESOLUTION

```PAT
ID:           RED-002
SOURCE_DOC:   FBI Memo — March 29, 1943
DATE:         1943-03-29
PAGE:         Multiple — described as "heavily blacked out"
SIGNATORIES:  Unknown — signature page redacted

BEFORE:
  References theft of Tesla papers by Sava Kosanović.

AFTER:
  "Papers recovered and later turned over to the
  Alien Property Custodian."

GAP_ANALYSIS:
  The entire middle of this document — what was taken,
  how it was discovered, who discovered it, what was
  found to be missing, the precise nature of the theft —
  is redacted. The resolution is stated as clean fact
  but the process is completely hidden.
  
  A theft, recovery, and transfer of classified materials
  normally generates extensive documentation:
  - Chain of custody reports
  - Inventory of stolen vs recovered items
  - Agent reports on how theft was discovered
  - Assessment of what Kosanović actually accessed
  
  ALL of this is redacted.

ENTITIES:    ENT-003, ENT-002
SUSPICION:   4

BEHAVIORAL_READ:
  If Kosanović simply tried to take papers and was caught,
  and everything was cleanly recovered, there is nothing
  sensitive to redact. You redact what remains sensitive.
  
  The heavy redaction of the RESOLUTION — not just the incident —
  means the resolution itself was not clean.
  Either: not everything was recovered, OR
  what Kosanović accessed revealed something about what
  the government was doing with the papers that couldn't be public.
  
  The theft narrative also conveniently discredits Kosanović
  as a reliable witness to what papers existed pre-seizure.
  A discredited thief's account of missing documents
  carries less weight. This is institutional self-protection logic.

HYPOTHESIS:
  The redacted section likely contains one of:
  A) Inventory of what Kosanović actually took — which would
     reveal what he (and therefore Yugoslavia/Soviets) obtained
  B) Revelation that not all papers were recovered — meaning
     the "clean resolution" summary is itself a cover
  C) Description of what Kosanović's theft revealed about
     US government handling of the papers (he may have seen
     evidence of prior extraction by US agents)

INVESTIGATIVE_ACTION:
  1. Yugoslav/Serbian archives: Kosanović diplomatic cables
     1943. If he reported the theft attempt to his government,
     those communications may exist in Belgrade.
  2. Nikola Tesla Museum Belgrade: Did they receive inventory
     lists from Kosanović about what SHOULD have been there?
     Comparison to what arrived = gap = extracted material
  3. FOIA appeal on RED-002 specifically citing 80-year rule
```

---

## RED-003 | TRUMP EVALUATION — THE 3-DAY IMPOSSIBILITY

```PAT
ID:           RED-003
SOURCE_DOC:   OAPC Evaluation Memo — January 1943
DATE:         1943-01-08 to 1943-01-09
PAGE:         Released partially 2017 by FBI
SIGNATORIES:  Dr. John G. Trump [CONFIRMED]

BEFORE:
  "Dr. Trump examined the material on January 8 and 9, 1943."

AFTER:
  "Dr. Trump reported that he found no evidence that the
  documents contained new, solid, or practical principles..."
  "Tesla's thoughts and efforts over the previous fifteen years
  were primarily speculative, philosophical, and promotional."

GAP_ANALYSIS:
  The evaluation itself is the redaction — not a blacked-out page,
  but a procedural impossibility that functions as redaction.
  
  80 trunks of material. Two days. One evaluator.
  This is physically incoherent as a genuine assessment.
  
  Even at 8 hours/day, 16 total hours, for 80 trunks:
  12 minutes per trunk. A trunk contains hundreds of documents.
  This is not analysis. This is theater.
  
  The REAL gap: what was Trump actually directed to do?
  What were his instructions BEFORE the evaluation?
  The authorization document and briefing memo are
  not in the released files.

ENTITIES:    ENT-004, ENT-001, ENT-007
SUSPICION:   5

BEHAVIORAL_READ:
  The selection of a single evaluator with a personal grudge
  for a two-day assessment of the most sensitive inventor's
  papers in wartime is not accidental bureaucracy.
  This is a designed outcome.
  
  Someone needed an official document saying "nothing here."
  Trump provided it. His grudge made him reliable for that outcome.
  His credentials made the document credible to outside eyes.
  
  The behavioral pattern: USE THE MOTIVATED PERSON
  to generate the document you need, then cite that document
  as independent assessment forever afterward.
  
  Craigee's contradicting military assessment was never
  given the same official weight. WHY? Military weapons
  experts have more standing on weapons assessments than
  civilian electrical engineers. The inversion is deliberate.

HYPOTHESIS:
  Trump was given a subset of documents to review —
  not 80 trunks but a curated selection that had already
  been filtered. The "evaluation" was of remainders,
  not the full archive. The valuable material was already
  separated before Trump arrived.
  
  This would explain:
  - How a 2-day evaluation was physically possible
  - Why Craigee reached opposite conclusion from different access
  - Where the 20 missing trunks went (pre-evaluation extraction)

INVESTIGATIVE_ACTION:
  1. Trump's war diary (cited in Wikipedia sources):
     Does it mention the Tesla evaluation? MIT archives.
  2. NDRC authorization records: Who ordered the evaluation
     and what were Trump's written instructions?
  3. Timeline cross-reference: When were papers moved from
     Hotel New Yorker to storage? Could extraction have
     occurred in the 24 hours between Tesla's death (Jan 7/8)
     and Trump's arrival (Jan 8)?
  4. Craigee primary document: Find the source of his
     assessment. Seifer references it — what document?
```

---

## RED-004 | THE 20 MISSING TRUNKS

```PAT
ID:           RED-004
SOURCE_DOC:   OAPC Transfer Documentation — 1943-1951
DATE:         1943 (intake) to 1951 (transfer to Belgrade)
PAGE:         Inventory reconciliation — NOT RELEASED
SIGNATORIES:  OAPC agents — names not fully released

BEFORE:
  FBI/OAPC intake record: 80 trunks recorded in Tesla estate.

AFTER:
  60 trunks shipped to Belgrade on ship Serbia, September 1951.

GAP_ANALYSIS:
  20 trunks. 8 years of custody. No reconciliation document released.
  
  OAPC's entire mandate was meticulous inventory of enemy alien property.
  They tracked everything. The absence of reconciliation documentation
  is not a clerical gap — it is a classified gap.
  
  Someone decided those 20 trunks would not go to Belgrade.
  That decision is documented somewhere.

ENTITIES:    ENT-003, ENT-007
SUSPICION:   5

BEHAVIORAL_READ:
  20 trunks don't disappear. They go somewhere.
  Three possibilities:
  
  A) INTENTIONAL EXTRACTION: Specific trunks were separated
     during the 1943-1951 custody period for classified use.
     The extraction was authorized at a level that permitted
     permanent retention without transfer.
  
  B) DESTRUCTION: The material was evaluated and destroyed
     as either useless or too dangerous to transfer.
     Destruction would be documented. That documentation
     is what's classified.
  
  C) MISATTRIBUTION: The 80-trunk count included materials
     from storage facilities (Tesla rented storage) that were
     never consolidated into the Belgrade shipment.
     This is the "innocent" explanation. It is less likely
     because OAPC would document this discrepancy explicitly.
  
  The most behaviorally consistent explanation:
  Vannevar Bush's apparatus (ENT-007) extracted specific trunks
  BEFORE Trump's evaluation, the evaluation was performed
  on remaining material, and the extracted trunks were absorbed
  into classified wartime programs. The 8-year gap provides
  ample cover for this under wartime secrecy authorities.

HYPOTHESIS:
  The 20 missing trunks contain Tesla's most recent and
  most developed work (1928-1943) — the period where
  his public claims were most specific about the death ray/
  teleforce and torpedo. His earlier work (pre-1920) was
  already largely published and patented — lower classification value.
  His final 15 years of private notebooks are what's missing.

INVESTIGATIVE_ACTION:
  1. [HIGHEST PRIORITY] National Archives: OAPC records
     for Tesla estate 1943-1951. Specifically request
     inventory reconciliation documents, transfer manifests,
     and any internal memos about the trunk count discrepancy.
     This is LED-005.
  2. Cross-reference: Manhattan Storage and Warehouse Co.
     (where Tesla materials were held) — do any business
     records from 1943-1951 document who accessed the storage?
  3. Cross-reference: Wright Patterson AFB acquisition logs
     1943-1946 for any Tesla-referenced material intake.
```

---

*Add new redactions as files are re-analyzed.*  
*Use RED-005 onward for new discoveries.*
