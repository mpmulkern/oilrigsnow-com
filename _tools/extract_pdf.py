#!/usr/bin/env python3
"""
TDS Equipment PDF → structured extraction.

Extracts from a TDS equipment listing PDF:
  - All raw text (per page)
  - All embedded images (deduped on hash)
  - Page-level metadata

Output structure:
  output/<slug>/
    text.txt           — all text, with [PAGE N] markers
    images/img_<n>.<ext>  — extracted images (deduped)
    image_index.json   — per-image: page, position, size, dpi, dimensions
    pdf_meta.json      — page count, source filename, image count

Usage:
  python3 extract_pdf.py --pdf <input.pdf> --out output/

Why this design:
  TDS PDFs come in two shapes:
    A) text-heavy listing (OIME RIG-16) — sections + bulleted specs + many photos
    B) tabular quotation (BOMCO 3000HP) — 60+ pages of structured tables + 1 cover photo
  Both share: TDS-branded header, footer with Bob's contact line, hero photo on page 1.
  The downstream parser (Claude) reads text.txt + image catalogue and produces the
  Airtable equipment record + webpage data.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz  # PyMuPDF


def slugify(s):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s[:80]


def extract_pdf(pdf_path: Path, out_root: Path):
    pdf = fitz.open(pdf_path)
    slug = slugify(pdf_path.stem)
    out_dir = out_root / slug
    img_dir = out_dir / "images"
    img_dir.mkdir(parents=True, exist_ok=True)

    text_chunks = []
    image_index = []
    seen_hashes = set()
    img_counter = 0

    for page_num, page in enumerate(pdf, 1):
        # Text
        text = page.get_text("text")
        if text.strip():
            text_chunks.append(f"\n[PAGE {page_num}]\n{text}")

        # Images
        for img_info in page.get_images(full=True):
            xref = img_info[0]
            try:
                base_image = pdf.extract_image(xref)
            except Exception as e:
                continue
            img_bytes = base_image["image"]
            ext = base_image.get("ext", "png")
            digest = hashlib.sha1(img_bytes).hexdigest()
            if digest in seen_hashes:
                continue
            seen_hashes.add(digest)

            img_counter += 1
            filename = f"img_{img_counter:03d}.{ext}"
            (img_dir / filename).write_bytes(img_bytes)

            # Find on-page bbox if available (for layout context)
            bbox = None
            try:
                rects = page.get_image_rects(xref)
                if rects:
                    r = rects[0]
                    bbox = [r.x0, r.y0, r.x1, r.y1]
            except Exception:
                pass

            image_index.append({
                "file": f"images/{filename}",
                "page": page_num,
                "width": base_image.get("width"),
                "height": base_image.get("height"),
                "ext": ext,
                "bytes": len(img_bytes),
                "bbox": bbox,
                "sha1": digest,
            })

    # Write outputs
    (out_dir / "text.txt").write_text("".join(text_chunks), encoding="utf-8")
    (out_dir / "image_index.json").write_text(json.dumps(image_index, indent=2))
    (out_dir / "pdf_meta.json").write_text(json.dumps({
        "source_filename": pdf_path.name,
        "slug": slug,
        "page_count": len(pdf),
        "image_count": len(image_index),
        "char_count": sum(len(c) for c in text_chunks),
    }, indent=2))

    return out_dir, len(pdf), len(image_index)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pdf", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    pdf_path = Path(args.pdf)
    out_root = Path(args.out)
    out_dir, pages, images = extract_pdf(pdf_path, out_root)
    print(f"✓ Extracted: {pdf_path.name}")
    print(f"  → {out_dir}")
    print(f"  Pages: {pages}, Unique images: {images}")


if __name__ == "__main__":
    main()
