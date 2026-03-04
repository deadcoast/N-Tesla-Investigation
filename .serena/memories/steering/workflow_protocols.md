# Workflow Protocols

## When Editing JSON Database Files
1. Read the current file first — always
2. Validate the next sequential ID
3. Add complete cross-references
4. Ensure the JSON is valid after editing (no trailing commas, proper nesting)
5. Do NOT reformat or re-sort existing entries unless explicitly asked

## When Editing Markdown Analysis Files
1. Follow the existing section format (## PREFIX — NAME)
2. Match the investigator's analytical voice — direct, specific, evidence-cited
3. Add new sections at the bottom, above the "Add new..." footer line
4. Never soften or hedge the investigator's conclusions

## When Working with OCR Output
1. OCR text is noisy — expect misread characters, merged words, broken lines
2. Page markers `[PAGE N]` are the primary navigation structure
3. Cross-reference page numbers against the original PDF page counts
4. Flag genuinely unreadable sections rather than guessing content

## When Building New Python Tools
1. Use pathlib for all file paths
2. Follow the existing style in ocr_pipeline.py (module-level constants, functions, main())
3. Add to pyproject.toml dependencies if new packages needed
4. Keep it simple — this is a research tool, not a product

## Session Logging
When significant work is done in a session:
1. Update investigation_log.md with a new LOG-xxx entry
2. Record: action taken, key findings, new nodes generated, next steps
3. Update the OPEN QUESTIONS table if new questions emerge

## Git Workflow
- Commit meaningful units of work, not every small change
- Descriptive commit messages referencing what was added/changed
- Do not force push or amend without explicit request
