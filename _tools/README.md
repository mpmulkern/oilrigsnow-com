# Pipeline Tools

Helper scripts used by the OilRigsNow Watcher agent. The watcher fetches these on each scheduled run via:

```bash
mkdir -p _tools
curl -o _tools/extract_pdf.py https://raw.githubusercontent.com/mpmulkern/oilrigsnow-com/main/_tools/extract_pdf.py
curl -o _tools/build_webpage.py https://raw.githubusercontent.com/mpmulkern/oilrigsnow-com/main/_tools/build_webpage.py
```

## extract_pdf.py

Extracts text and images from a TDS equipment PDF via PyMuPDF. Outputs `text.txt`, `images/`, `image_index.json`, `pdf_meta.json` per PDF into a slugged subdirectory.

Usage:
```bash
pip install pymupdf  # first run
python3 _tools/extract_pdf.py --pdf <path/to/pdf> --out output/
```

## build_webpage.py

Generates the polished HTML rig page from an `equipment_record.json`. Output is a `sites/<slug>/index.html` + `images/` folder matching the design template (sticky nav, hero with 4 stats, equipment cards, gallery, complete data, CTA, footer).

Usage:
```bash
pip install python-docx  # not strictly needed for build_webpage but useful
python3 _tools/build_webpage.py --record output/<slug>/equipment_record.json --out sites/
```

## Workflow

```
PDF → extract_pdf.py → text + images
                    → agent parses into equipment_record.json
                    → build_webpage.py → static HTML page
                    → commit to land-drilling-rigs/<slug>/ in this repo
```

Pipeline is invoked automatically by the **OilRigsNow Watcher** agent every 30 minutes (or whatever interval is set).
