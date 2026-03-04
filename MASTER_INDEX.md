# OPERATION WARDENCLYFFE — MASTER INVESTIGATION INDEX
**Project:** Nikola Tesla / FBI Files Analysis  
**Method:** Behavioral forensics + documentary cross-reference  
**Status:** ACTIVE  
**Schema Version:** 1.0  

---

## HOW THIS DATABASE WORKS

Every entry has a UNIQUE ID. Cross-references use those IDs directly.
Tags use `[TAG:VALUE]` syntax for machine parsing.
Confidence uses 1-5 scale. 5 = documented fact. 1 = speculative lead.
Degree of separation from primary subject (Tesla) is tracked on every node.

### ID PREFIXES
- `ENT-` = Entity (person, organization, location)
- `RED-` = Redaction (documented gap in released files)
- `LED-` = Lead (actionable investigative thread)
- `PAT-` = Pattern (behavioral/human nature analysis)
- `EVT-` = Timeline Event
- `DOC-` = Source Document
- `LOG-` = Investigation Log Entry

---

## FILE MAP

```
WARDENCLYFFE/
├── MASTER_INDEX.md          ← YOU ARE HERE
├── ENTITY_DATABASE.md       ← All persons, orgs, locations
├── REDACTION_DATABASE.md    ← Every documented gap, analyzed
├── LEADS_DATABASE.md        ← Actionable threads, ranked
├── PATTERN_DATABASE.md      ← Behavioral/abstract patterns
├── TIMELINE.md              ← Chronological event map
├── SOURCE_REGISTRY.md       ← All documents referenced
└── INVESTIGATION_LOG.md     ← Running log of findings/updates
```

---

## CURRENT STATUS SNAPSHOT

| Category | Count | Critical | Open |
|----------|-------|----------|------|
| Entities | 9 | 2 | — |
| Redactions | 4 | 3 | 4 |
| Leads | 5 | 1 | 5 |
| Patterns | 5 | — | — |
| Timeline Events | 18 | 6 | — |

**HIGHEST PRIORITY LEADS:**  
→ `LED-005` — Physical custody of 20 missing trunks (National Archives)  
→ `LED-004` — Kenneth [REDACTED] / Swezey FBI file cross-reference  
→ `LED-003` — Vannevar Bush personal papers at MIT  

**MOST SUSPICIOUS REDACTIONS:**  
→ `RED-001` — Hoover-signed torpedo memo. Context jump is too large.  
→ `RED-003` — Trump evaluation gap. 3 days impossible for genuine review.  
→ `RED-004` — OAPC trunk inventory. 20 trunks require active decision.  

---

## CORE INVESTIGATIVE PRINCIPLE

> "We are not looking for documents that say what happened.  
> We are looking for the shape of what was removed,  
> the behavior of the people who removed it,  
> and the pattern that connects them."

Redactions are not dead ends. They are **geometry**.  
What sits on either side of a black bar tells you the  
approximate dimensions of what's inside.

Human beings operating under institutional pressure follow  
predictable patterns: self-protection, grudge-resolution,  
bureaucratic plausible deniability, legacy-guarding.  
These patterns are traceable even through redaction.

---
*Load ENTITY_DATABASE.md, REDACTION_DATABASE.md, LEADS_DATABASE.md for full detail.*
