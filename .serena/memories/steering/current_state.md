# Current Investigation State

## Completed
- Database schema built: entities, leads, patterns, redactions, timeline (all JSON in `docs/json/`)
- Analysis prose written for all initial nodes (all .md files in `docs/`)
- Extended database files: `docs/database/PATTERN_DATABASE.md`, `docs/database/REDACTION_DATABASE.md`
- OCR pipeline built (`tools/ocr_pipeline.py`) and executed on all 3 FBI vault PDFs
- OCR output generated in `assets/ocr-output/`
- Investigation log started (LOG-001 complete)
- Project restructured: fbi-vault → `assets/fbi-vault/`, ocr-output → `assets/ocr-output/`, pipeline → `tools/`
- Per-part FBI vault analysis sessions started in `INVESTIGATION/1/`, `INVESTIGATION/2/`, `INVESTIGATION/3/`
- Each INVESTIGATION part has its own investigation_log.md, leads.json, overview.md, and analysis.md

## Next Planned Work (per LOG-002)
- Line-by-line analysis of FBI vault OCR text (all 3 parts)
- Looking for: date anomalies, named third parties, document cross-references, language shifts, physical inventory descriptions, geographic references, timeline compression

## Priority Leads
- LED-002 (Priority 5): Authorization chain — who selected Trump as evaluator
- LED-004 (Priority 5): Kenneth [REDACTED] identity
- LED-005 (Priority 5): NARA RG131 — physical chain of custody for 20 missing trunks

## Key Unresolved Questions
- Q-001: Which FBI agent notified Wallace of Tesla's death?
- Q-002: What was Tesla working on in 1942-43?
- Q-009: Trump/Van de Graaff incident — primary source?
- Q-010: Craigee particle beam assessment — primary document?
