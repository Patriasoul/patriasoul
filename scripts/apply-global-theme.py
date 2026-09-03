from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
CSS = '<link rel="stylesheet" href="/patriasoul-global.css">'
JS = '<script src="/site-navigation.js?v=42" defer></script>'
changed = []

for path in ROOT.rglob('*.html'):
    if any(part in {'.git','node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    original = text

    # Remove obsolete page-hero renderer from every HTML page.
    text = re.sub(r'<script\s+src=["\']/page-hero\.js(?:\?[^"\']*)?["\']\s+defer\s*></script>', '', text, flags=re.IGNORECASE)

    # Remove old placeholder badge everywhere in static HTML.
    text = re.sub(r'\s*[·•]\s*privremena ilustracija\b', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bprivremena ilustracija\b', '', text, flags=re.IGNORECASE)

    # Every HTML page uses exactly the same shared CSS and navigation shell.
    text = re.sub(r'<link\s+rel=["\']stylesheet["\']\s+href=["\']/patriasoul-global\.css(?:\?[^"\']*)?["\']\s*/?>', CSS, text, flags=re.IGNORECASE)
    text = re.sub(r'/site-navigation\.js(?:\?[^"\']*)?', '/site-navigation.js?v=42', text)

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

print(f'Updated PatriaSoul shared shell in {len(changed)} HTML files.')
print('Every HTML page now uses the same global CSS and navigation version v42.')
for item in changed:
    print(item)
