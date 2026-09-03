from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
IGNORE_DIRS = {'.git', 'node_modules'}
IGNORE_PREFIXES = ('http:', 'https:', 'mailto:', 'tel:', 'javascript:', 'data:', 'blob:')

class RefParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs = []
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in {'href', 'src'} and value:
                self.refs.append((tag, key, value))

def resolve(source, ref):
    ref = ref.strip()
    if not ref or ref.startswith('#') or ref.lower().startswith(IGNORE_PREFIXES):
        return None
    clean = urlsplit(ref).path
    if not clean:
        return None
    if clean.startswith('/'):
        target = ROOT / clean.lstrip('/')
    else:
        target = source.parent / clean
    if target == ROOT or clean.endswith('/'):
        target = target / 'index.html'
    return target.resolve()

html_files = [p for p in ROOT.rglob('*.html') if not any(part in IGNORE_DIRS for part in p.parts)]
missing = []
nav_missing = []
footer_missing = []
duplicate_assets = []

for path in sorted(html_files):
    text = path.read_text(encoding='utf-8', errors='replace')
    parser = RefParser()
    parser.feed(text)
    seen = {}
    for tag, key, value in parser.refs:
        target = resolve(path, value)
        if target is not None and not target.exists():
            missing.append((path.relative_to(ROOT), key, value))
        if key == 'src' or (key == 'href' and value.lower().endswith('.css')):
            seen[value] = seen.get(value, 0) + 1
    dupes = [v for v, count in seen.items() if count > 1]
    if dupes:
        duplicate_assets.append((path.relative_to(ROOT), dupes))
    if 'site-navigation.js' not in text:
        nav_missing.append(path.relative_to(ROOT))
    if '<footer' not in text.lower() and 'home-footer' not in text:
        footer_missing.append(path.relative_to(ROOT))

print(f'HTML pages scanned: {len(html_files)}')
print(f'Missing literal internal targets: {len(missing)}')
for source, key, value in missing:
    print(f'  MISSING  {source}  {key}={value}')
print(f'Pages without site-navigation.js reference: {len(nav_missing)}')
for path in nav_missing:
    print(f'  NAV-MISSING  {path}')
print(f'Pages without literal footer marker: {len(footer_missing)}')
for path in footer_missing:
    print(f'  FOOTER-MISSING  {path}')
print(f'Pages with duplicate asset references: {len(duplicate_assets)}')
for path, refs in duplicate_assets:
    print(f'  DUPLICATE-ASSET  {path}: {", ".join(refs)}')

raise SystemExit(1 if missing else 0)
