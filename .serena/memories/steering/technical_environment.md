# Technical Environment

## System
- Windows 11, bash shell (Git Bash)
- Python 3.11, managed by uv
- Tesseract OCR installed (check `tesseract --version`)
- Poppler installed at `C:/tools/poppler/poppler-24.08.0/Library/bin/`

## Project Layout
```
N-Tesla-Investigation/
├── .claude/              # Claude Code config
│   ├── directive-1.md    # OCR pipeline task spec
│   ├── settings.json     # Permissions and plugins
│   └── settings.local.json
├── fbi-vault/            # Source PDFs (3 files, ~290 pages total)
├── ocr-output/           # OCR text output (3 files)
├── ocr_pipeline.py       # OCR processing script
├── *.json                # Investigation database (5 files)
├── *.md                  # Analysis prose + investigation log
├── pyproject.toml        # uv project config
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
