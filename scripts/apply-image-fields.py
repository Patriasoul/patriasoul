from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
IMAGE_CSS = '<link rel="stylesheet" href="/patriasoul-image-fields.css">'
IMAGE_JS = '<script src="/patriasoul-image-fields.js" defer></script>'
ANALYTICS_JS = '<script src="/patriasoul-analytics.js" defer></script>'
SEARCH_JS = '<script src="/portal-search.js" defer></script>'
PWA_JS = '<script src="/patriasoul-pwa.js" defer></script>'
PLACEHOLDER = '/images/patria-image-placeholder.svg'

changed = []

for path in ROOT.rglob('*.html'):
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    original = text

    if '/patriasoul-image-fields.css' not in text:
        pos = text.lower().find('</head>')
        if pos >= 0:
            text = text[:pos] + IMAGE_CSS + '\n' + text[pos:]

    additions = [ANALYTICS_JS, SEARCH_JS, PWA_JS]
    for tag in additions:
        if tag.split('src="')[1].split('"')[0] not in text:
            pos = text.lower().find('</body>')
            if pos >= 0:
                text = text[:pos] + tag + '\n' + text[pos:]

    if '/patriasoul-image-fields.js' not in text:
        pos = text.lower().find('</body>')
        if pos >= 0:
            text = text[:pos] + IMAGE_JS + '\n' + text[pos:]

    if '<main' in text.lower() and 'ps-image-field' not in text:
        marker = re.search(r'</section>', text, flags=re.IGNORECASE)
        if marker:
            title = re.search(r'<title>(.*?)</title>', text, flags=re.IGNORECASE | re.DOTALL)
            label = re.sub(r'<[^>]+>', '', title.group(1)).strip() if title else path.stem.replace('-', ' ').title()
            field = (f'<figure class="ps-image-field ps-auto-image-field">'
                     f'<span class="ps-image-label">GLAVNA SLIKA · {label}</span>'
                     f'<img data-ps-image data-ps-image-src="{PLACEHOLDER}" src="{PLACEHOLDER}" alt="Glavna slika stranice — zamijeni fotografijom ili ilustracijom" width="1600" height="900">'
                     f'<figcaption>Standardno slikovno polje PatriaSoula. Za zamjenu slike promijeni samo <code>data-ps-image-src</code>; struktura stranice ostaje ista.</figcaption>'
                     f'</figure>')
            text = text[:marker.end()] + '\n' + field + text[marker.end():]

    if text != original:
        path.write_text(text, encoding='utf-8')
        changed.append(str(path.relative_to(ROOT)))

print(f'PatriaSoul shared pass completed: {len(changed)} HTML files updated.')
for item in changed:
    print(item)
