# Data Architecture Rules

## The Two-Layer System
- **JSON files** (`docs/json/`) = relational data, strict schema, machine-parseable
- **Markdown files** (`docs/` + `docs/database/`) = analysis prose, behavioral reads, hypotheses

These layers are deliberately separated. Never merge them. JSON is for facts and relationships. Markdown is for interpretation.

## Node ID Conventions
All nodes use prefixed IDs. Always use the next sequential number when creating new nodes.

| Prefix | Type | File |
|--------|------|------|
| ENT-xxx | Entities (people, orgs) | entities.json |
| RED-xxx | Redactions (documented gaps) | redactions.json |
| LED-xxx | Leads (actionable threads) | leads.json |
| PAT-xxx | Patterns (behavioral) | patterns.json |
| EVT-xxx | Timeline events | timeline.json |
| LOG-xxx | Session log entries | investigation_log.md |
| Q-xxx | Open questions | investigation_log.md |

## Cross-Referencing
Every node should reference related nodes from other categories via arrays:
- entities → connections[], redactions[], leads[], patterns[]
- redactions → entities[], leads_generated[], patterns[]
- leads → origin[], connected[]
- patterns → entities[], redactions[], leads[]
- timeline → entities[]

## JSON Schema
All JSON files use `schema: "1.0"` and `type: "<category>"` at top level, with `records: []` array.

## When Adding New Data
1. Check the highest existing ID in the target file
2. Assign the next sequential ID
3. Add all cross-references to related nodes
4. Update the corresponding .md analysis file if appropriate
5. Note the addition in investigation_log.md if it's a significant finding
