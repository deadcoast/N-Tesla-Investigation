# Style and Conventions

## Python
- Python 3.11+
- Standard library style (no strict linter config found)
- Constants at module level in UPPER_SNAKE_CASE
- Functions in snake_case
- Uses pathlib.Path for file paths
- OCR pipeline uses multiprocessing for parallel PDF processing

## Data Format Conventions
- JSON files use node IDs: ENT-xxx, RED-xxx, LED-xxx, PAT-xxx, EVT-xxx
- Markdown analysis files mirror JSON data with prose interpretation
- Investigation log uses LOG-xxx session numbering

## No linting/formatting/testing tools configured
- No pytest, ruff, black, mypy in dependencies
- No pre-commit hooks
