# ATTN:AGENT::APPLY

> JSON for the relational data: entities, connections, lead status, redaction metadata. Strict, queryable, updatable.
> Markdown for the analysis layer: behavioral reads, hypotheses, pattern descriptions. Prose that shouldn't be in a database.

---

`db/ — JSON`: Strict schema. Every entity, redaction, lead, pattern, and timeline event as a proper data record with IDs, connections, and tags. Machine-parseable, query-able, no ambiguity.

`analysis/` — Markdown. Prose. Behavioral reads, hypotheses, the why behind every node. This is where the actual investigative reasoning lives.

`log/` — Running record. Every session logged. Open questions tracked with IDs.

`How to use it`: Update and maintain the format as your main source of truth for the repository. Utilize the JSON structure to query across the full relational structure — find all leads connected to a given entity, all redactions above suspicion level 4, all patterns that predict a specific finding. Keep a record, structured log analysis files, I read the reasoning and build on it. The two layers(`JSON`, `Markdown`) work together but stay separate so neither one pollutes the other

---
