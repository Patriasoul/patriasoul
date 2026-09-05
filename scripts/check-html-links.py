#!/usr/bin/env python3
"""Provjera lokalnih HTML poveznica u PatriaSoul projektu."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parents[1]
IGNORE_PREFIXES = ("http://", "https://", "mailto:", "tel:", "javascript:", "data:", "#")

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("href", "src"):
            value = attrs.get(key)
            if value:
                self.links.append((key, value))

errors = []
html_files = sorted(ROOT.rglob("*.html"))
for page in html_files:
    parser = LinkParser()
    try:
        parser.feed(page.read_text(encoding="utf-8"))
    except UnicodeDecodeError as exc:
        errors.append(f"{page.relative_to(ROOT)}: UTF-8 greška: {exc}")
        continue

    for kind, raw in parser.links:
        value = unquote(raw.strip())
        if not value or value.startswith(IGNORE_PREFIXES):
            continue
        value = value.split("?", 1)[0].split("#", 1)[0]
        if not value:
            continue
        parsed = urlparse(value)
        if parsed.scheme or parsed.netloc:
            continue
        if value.startswith("/"):
            target = ROOT / value.lstrip("/")
        else:
            target = (page.parent / value).resolve()
        try:
            target.relative_to(ROOT.resolve())
        except ValueError:
            errors.append(f"{page.relative_to(ROOT)}: izlaz iz projekta -> {raw}")
            continue
        if target.is_dir():
            target = target / "index.html"
        if not target.exists():
            errors.append(f"{page.relative_to(ROOT)}: nedostaje -> {raw}")

print(f"Provjereno HTML stranica: {len(html_files)}")
if errors:
    print(f"BROJ PROBLEMA: {len(errors)}")
    for error in errors:
        print(f"- {error}")
    raise SystemExit(1)
print("HTML poveznice i lokalni resursi: OK")
