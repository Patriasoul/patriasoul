from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
CSS = '<link rel="stylesheet" href="/patriasoul-global.css">'
JS = '<script src="/site-navigation.js?v=41" defer></script>'
changed = []

for path in ROOT.rglob('*.html'):
    if any(part in {'.git','node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    original = text

    # Remove the obsolete page-hero renderer from every HTML page.
    # Hero markup and styling now live in the page itself + patriasoul-global.css.
    text = re.sub(r'<script\s+src=["\']/page-hero\.js(?:\?[^"\']*)?["\']\s+defer\s*></script>', '', text, flags=re.IGNORECASE)

    # Remove the old placeholder badge everywhere in static HTML.
    text = re.sub(r'\s*[·•]\s*privremena ilustracija\b', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bprivremena ilustracija\b', '', text, flags=re.IGNORECASE)

    # Force all themed HTML pages to load the clean current navigation version.
    text = re.sub(r'/site-navigation\.js(?:\?[^"\']*)?', '/site-navigation.js?v=41', text)

    additions = []
    if '/patriasoul-global.css' not in text:
        additions.append(CSS)
    if '/site-navigation.js' not in text:
        additions.append(JS)
    if additions:
        pos = text.lower().find('</head>')
        if pos >= 0:
            text = text[:pos] + '\n'.join(additions) + '\n' + text[pos:]

    if text == original:
        continue
    path.write_text(text, encoding='utf-8')
    changed.append(str(path.relative_to(ROOT)))

print(f'Updated PatriaSoul shell assets in {len(changed)} HTML files.')
print('page-hero.js references removed; hero styling remains in patriasoul-global.css.')
for item in changed:
    print(item)
