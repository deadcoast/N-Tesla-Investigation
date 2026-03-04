# Technical Environment

## System
- Windows 11, bash shell (Git Bash)
- Python 3.11, managed by uv
- Tesseract OCR installed (check `tesseract --version`)
- Poppler installed at `C:/tools/poppler/poppler-24.08.0/Library/bin/`

## Project Layout (Updated March 2026)
```
N-Tesla-Investigation/
├── .claude/              # Claude Code config
│   ├── directive-1.md    # OCR pipeline task spec
│   ├── settings.json
│   └── settings.local.json
├── assets/
│   ├── fbi-vault/        # Source PDFs (3 files, ~290 pages total)
│   └── ocr-output/       # OCR text output (3 files)
├── docs/                 # MASTER DOCUMENTATION (two-layer system)
│   ├── entities.md       # Entity analysis prose
│   ├── patterns.md       # Pattern analysis prose
│   ├── redactions.md     # Redaction analysis prose
│   ├── investigation_log.md  # Session log + open questions
│   ├── json/             # JSON relational database
│   │   ├── README.md     # ATTN:AGENT::APPLY — operational directive
│   │   ├── entities.json
│   │   ├── leads.json
│   │   ├── patterns.json
│   │   ├── redactions.json
│   │   └── timeline.json
│   └── database/         # Extended analysis databases
│       ├── PATTERN_DATABASE.md
│       └── REDACTION_DATABASE.md
├── INVESTIGATION/        # Per-part FBI vault analysis sessions
│   ├── 1/                # Part 1 analysis (pages 1-249)
│   │   ├── investigation_log.md
│   │   ├── leads.json
│   │   ├── overview.md
│   │   └── part1_fbi_vault_analysis.md
│   ├── 2/                # Part 2 analysis (pages 250-290)
│   │   └── (same structure)
│   └── 3/                # Final part analysis
│       └── (same structure)
├── tools/
│   └── ocr_pipeline.py   # OCR processing script
├── pyproject.toml
├── README.md
└── uv.lock
```

## Key Commands
- `uv sync` — Install dependencies
- `uv run python ocr_pipeline.py` — Run full OCR pipeline
- `uv run python -c "..."` — Quick Python one-liners

## OCR Pipeline Details
- pdf2image converts PDF pages to PIL images at 300 DPI
- Preprocessing: grayscale + contrast + binary threshold
- Tesseract config: `--psm 6` (single uniform text block), `lang='eng'`
- Output format: `[PAGE N]` markers, `[PAGE N — UNREADABLE/IMAGE ONLY]` for blanks
- Error handling: per-page, never per-file
- Parallel processing via multiprocessing

## No Linting/Testing/Formatting Configured
There are no pytest, ruff, black, or mypy configurations. Code quality is maintained manually.
