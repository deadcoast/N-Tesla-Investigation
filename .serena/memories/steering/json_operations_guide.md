# JSON Operations Guide — How Agents Work With the Database

## Source of Truth
The `docs/json/README.md` header says `ATTN:AGENT::APPLY` — this is a direct operational directive.
The JSON files are the primary source of truth for all relational data. Agents must:
- **Update JSON first** when adding new findings
- **Then update markdown** analysis layer to match
- **Never store relational data in markdown** (connections, IDs, scores belong in JSON)
- **Never store prose analysis in JSON** (behavioral reads, hypotheses belong in markdown)

## File Locations and Purposes

| File | Path | Contains |
|------|------|----------|
| entities.json | `docs/json/entities.json` | People, orgs. Connections array links to other ENT/RED/LED/PAT |
| leads.json | `docs/json/leads.json` | Investigative threads. Status (OPEN/CLOSED), priority 1-5, archive sources |
| patterns.json | `docs/json/patterns.json` | Behavioral patterns. Strength 1-5, linked entities/redactions |
| redactions.json | `docs/json/redactions.json` | Documented gaps. Suspicion 1-5, context before/after, gap type |
| timeline.json | `docs/json/timeline.json` | Events. Date, flag, significance 1-5, entity links |

## JSON Schema Pattern
Every file follows:
```json
{
  "schema": "1.0",
  "type": "<category>",
  "description": "...",
  "records": [ ... ]
}
```

## Entity Record Fields
- `id`, `name`, `type` (PERSON/ORG), `status`, `dob`, `dod`
- `degree` — distance from Tesla (0=Tesla, 1=direct, 2=indirect)
- `confidence` — evidence quality 1-5
- `tags` — categorical labels
- `connections[]` — links to other entities with degree, type, note
- `redactions[]`, `leads[]`, `patterns[]` — cross-references

## Lead Record Fields
- `id`, `title`, `status` (OPEN/CLOSED), `priority` 1-5
- `degree` — distance from core investigation
- `origin[]` — which entities/redactions generated this lead
- `archive` — where physical records are held
- `method` — FOIA, physical archive, etc.
- `connected[]` — related RED/ENT/LED nodes

## Redaction Record Fields
- `id`, `source_doc`, `date`, `page`, `signatories[]`
- `signatory_anomaly` — boolean flag for unusual signatures
- `context_before`, `context_after` — exact text around the gap
- `gap_type` — categorizes the nature of the redaction
- `suspicion` 1-5
- `entities[]`, `leads_generated[]`, `patterns[]`

## Pattern Record Fields
- `id`, `name`, `category` (INSTITUTIONAL/HUMAN-NATURE/SUPPRESSION)
- `strength` 1-5
- `entities[]`, `redactions[]`, `leads[]`

## Timeline Record Fields
- `id`, `date`, `event`, `flag`, `significance` 1-5, `entities[]`

## Query Patterns for Cross-Referencing
To find all leads for entity ENT-004:
→ Search leads.json for records where `origin` or `connected` contains "ENT-004"
→ Also check entities.json ENT-004's `leads[]` array

To find all redactions with suspicion ≥ 4:
→ Filter redactions.json where `suspicion >= 4` → RED-001, RED-003, RED-004

To find everything connected to a pattern:
→ Read patterns.json for entity/redaction/lead arrays
→ Cross-reference those IDs in their respective files

## INVESTIGATION/ Directory
Per-part FBI vault analysis lives in `INVESTIGATION/1/`, `INVESTIGATION/2/`, `INVESTIGATION/3/`.
Each has its own `leads.json` for findings specific to that part.
New leads found in per-part analysis should eventually be merged into the master `docs/json/leads.json`.

## Rules
1. Sequential IDs only — check the highest existing ID before adding
2. Bidirectional cross-references — if ENT-004 links to RED-003, RED-003 must link back to ENT-004
3. No orphan nodes — every new node must connect to at least one existing node
4. Log significant additions in `docs/investigation_log.md`
5. Markdown analysis files use matching section headers: `## PREFIX — NAME`
