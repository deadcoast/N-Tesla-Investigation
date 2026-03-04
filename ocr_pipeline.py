"""
OCR Pipeline for FBI Vault Tesla PDFs.
Converts scanned PDF pages to images at 300 DPI, preprocesses for degraded
1950s photocopies, runs Tesseract OCR, and writes structured plain text output.
"""

import os
import sys
from pathlib import Path

from pdf2image import convert_from_path
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract

# ── Configuration ──────────────────────────────────────────────────────────
TESSERACT_CMD = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
POPPLER_PATH = r"C:\tools\poppler\poppler-24.08.0\Library\bin"
DPI = 300
TESSERACT_CONFIG = "--psm 6"
TESSERACT_LANG = "eng"
UNREADABLE_THRESHOLD = 20  # characters; fewer than this = unreadable

# Paths
REPO_ROOT = Path(__file__).parent
PDF_DIR = REPO_ROOT / "fbi-vault"
OUTPUT_DIR = REPO_ROOT / "ocr-output"

JOBS = [
    ("TESLA_pages_1-249.pdf", "tesla_part1_ocr.txt"),
    ("TESLA_pages_250-290.pdf", "tesla_part2_ocr.txt"),
    ("TESLA_final.pdf", "tesla_final_ocr.txt"),
]

# ── Setup ──────────────────────────────────────────────────────────────────
pytesseract.pytesseract.tesseract_cmd = TESSERACT_CMD
OUTPUT_DIR.mkdir(exist_ok=True)


def preprocess(image: Image.Image) -> Image.Image:
    """Grayscale → contrast boost → binary threshold."""
    img = image.convert("L")
    img = ImageEnhance.Contrast(img).enhance(2.0)
    img = img.point(lambda px: 255 if px > 140 else 0, mode="1")
    return img


def ocr_page(image: Image.Image, page_num: int) -> str:
    """Run Tesseract on one preprocessed page image. Never raises."""
    try:
        processed = preprocess(image)
        text = pytesseract.image_to_string(
            processed, lang=TESSERACT_LANG, config=TESSERACT_CONFIG
        )
        stripped = text.strip()
        if len(stripped) < UNREADABLE_THRESHOLD:
            return f"[PAGE {page_num} — UNREADABLE/IMAGE ONLY]\n"
        return f"[PAGE {page_num}]\n{stripped}\n"
    except Exception as exc:
        return f"[PAGE {page_num} — ERROR: {exc}]\n"


def process_pdf(pdf_path: Path, output_path: Path) -> None:
    """Convert every page of a PDF to an image and OCR it."""
    print(f"\n{'='*60}")
    print(f"Processing: {pdf_path.name}")
    print(f"Output:     {output_path.name}")
    print(f"{'='*60}")

    if not pdf_path.exists():
        print(f"ERROR: PDF not found at {pdf_path}")
        return

    # Convert all pages to PIL images at 300 DPI
    print(f"Converting pages at {DPI} DPI (this may take a while)...")
    try:
        images = convert_from_path(
            str(pdf_path),
            dpi=DPI,
            poppler_path=POPPLER_PATH,
            fmt="png",
        )
    except Exception as exc:
        print(f"FATAL: Could not convert PDF: {exc}")
        return

    total = len(images)
    print(f"Got {total} pages. Starting OCR...")

    results = []
    for i, img in enumerate(images, start=1):
        result = ocr_page(img, i)
        results.append(result)
        if i % 25 == 0 or i == total:
            print(f"  OCR progress: {i}/{total} pages")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(results))

    print(f"Done. Wrote {output_path}")


def main():
    print("FBI Tesla PDF OCR Pipeline")
    print(f"Tesseract: {TESSERACT_CMD}")
    print(f"Poppler:   {POPPLER_PATH}")
    print(f"DPI:       {DPI}")
    print(f"Config:    {TESSERACT_CONFIG}")

    for pdf_name, out_name in JOBS:
        pdf_path = PDF_DIR / pdf_name
        output_path = OUTPUT_DIR / out_name
        process_pdf(pdf_path, output_path)

    print("\n" + "="*60)
    print("ALL DONE. Output files:")
    for _, out_name in JOBS:
        p = OUTPUT_DIR / out_name
        if p.exists():
            size = p.stat().st_size
            print(f"  {p}  ({size:,} bytes)")
        else:
            print(f"  {p}  (MISSING)")


if __name__ == "__main__":
    main()
