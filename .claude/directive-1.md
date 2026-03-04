# directive 1

**CONTEXT:** Three FBI vault PDFs are scanned photocopy images from the 1950s hosted at `https://github.com/deadcoast/N-Tesla-Investigation` in `/fbi-vault/`. Standard text extraction fails because there is no text layer — every page is a raster image. The goal is OCR output as structured plain text files, one per PDF, with page markers, pushed back to the repo so the investigation session can consume them.

---

> **TASK: OCR PIPELINE FOR SCANNED FBI PDFS**

Download the three PDFs from the GitHub repo using curl or wget. The filenames are `TESLA_pages_1-249.pdf`, `TESLA_pages_250-290.pdf`, and `TESLA_final.pdf`.

Install dependencies: `pytesseract`, `pdf2image`, `Pillow`, and ensure `tesseract-ocr` and `poppler-utils` are available via apt. These are required because pdf2image converts each PDF page to a PIL image, and pytesseract runs tesseract OCR on each image.

For each PDF, convert every page to an image at 300 DPI — this is the minimum resolution for reliable OCR on degraded 1950s photocopies. Higher DPI increases accuracy on faded or skewed text. Apply a preprocessing step to each image before OCR: convert to grayscale, increase contrast, and apply a binary threshold. This significantly improves tesseract accuracy on low-quality scans.

Run tesseract on each preprocessed page image using `lang='eng'` and `config='--psm 6'` — page segmentation mode 6 assumes a single uniform block of text, appropriate for typed government documents.

Write output as plain text with a page marker `[PAGE N]` before each page's content. Pages that return empty or near-empty strings should be marked `[PAGE N — UNREADABLE/IMAGE ONLY]` rather than silently skipped, because blank pages in FBI documents are themselves data points.

Save three output files: `tesla_part1_ocr.txt`, `tesla_part2_ocr.txt`, `tesla_final_ocr.txt`.

Commit and push all three files to the repo under `/ocr-output/` so the investigation session can fetch them via web_fetch on the raw URL.

Handle errors per page, not per file — a single unreadable page must not abort the entire document.

---
