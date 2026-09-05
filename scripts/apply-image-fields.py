from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
IMAGE_CSS = '<link rel="stylesheet" href="/patriasoul-image-fields.css">'
IMAGE_JS = '<script src="/patriasoul-image-fields.js" defer></script>'
ANALYTICS_JS = '<script src="/patriasoul-analytics.js" defer></script>'
SEARCH_JS = '<script src="/portal-search.js" defer></script>'
PWA_JS = '<script src="/patriasoul-pwa.js" defer></script>'
PLACEHOLDER = '/images/patria-image-placeholder.svg'

# Mapiranje postojećih tematskih slika na stranice. Tekst stranice se ne mijenja.
IMAGE_MAP = {
    'domovina.html': '/images/croatia-flag-ruffled-beautifully-waving-macro-close-up-shot.jpg',
    'hrvatska.html': '/images/croatia-flag-ruffled-beautifully-waving-macro-close-up-shot.jpg',
    'branitelji.html': '/images/branitelji-hero.svg',
    'brani-svoj-grad.html': '/images/branitelji-hero.svg',
    'brigade.html': '/images/brigade-hero.svg',
    'postrojbe.html': '/images/brigade-hero.svg',
    'domovinski-rat.html': '/images/domovinski-rat-hero.svg',
    'vukovar.html': '/images/domovinski-rat-hero.svg',
    'povijest.html': '/images/PATRIA_SOUL_ORIGINAL_ISPRAVLJEN_GRB.png',
    'hrvatska-povijest.html': '/images/PATRIA_SOUL_ORIGINAL_ISPRAVLJEN_GRB.png',
    'bastina.html': '/images/Bastina.jfif',
}

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
        src = tag.split('src="')[1].split('"')[0]
        if src not in text:
            pos = text.lower().find('</body>')
            if pos >= 0:
                text = text[:pos] + tag + '\n' + text[pos:]

    if '/patriasoul-image-fields.js' not in text:
        pos = text.lower().find('</body>')
        if pos >= 0:
            text = text[:pos] + IMAGE_JS + '\n' + text[pos:]

    # Ako već postoji automatsko polje, samo mu dodijeli stvarnu postojeću sliku.
    mapped = IMAGE_MAP.get(path.name)
    if mapped:
        pattern = r'(<img\b[^>]*data-ps-image[^>]*data-ps-image-src=")[^"]*("[^>]*>)'
        text = re.sub(pattern, lambda m: m.group(1) + mapped + m.group(2), text, count=1, flags=re.IGNORECASE)
        pattern2 = r'(<img\b[^>]*data-ps-image[^>]*src=")[^"]*("[^>]*>)'
        text = re.sub(pattern2, lambda m: m.group(1) + mapped + m.group(2), text, count=1, flags=re.IGNORECASE)

    # Za ostale stranice koje imaju <main>, osiguraj standardno polje samo ako ga već nemaju.
    if '<main' in text.lower() and 'ps-image-field' not in text:
        marker = re.search(r'</section>', text, flags=re.IGNORECASE)
        if marker:
            title = re.search(r'<title>(.*?)</title>', text, flags=re.IGNORECASE | re.DOTALL)
            label = re.sub(r'<[^>]+>', '', title.group(1)).strip() if title else path.stem.replace('-', ' ').title()
            src = mapped or PLACEHOLDER
            field = (f'<figure class="ps-image-field ps-auto-image-field">'
                     f'<span class="ps-image-label">GLAVNA SLIKA · {label}</span>'
                     f'<img data-ps-image data-ps-image-src="{src}" src="{src}" alt="Glavna slika stranice" width="1600" height="900">'
                     f'</figure>')
            text = text[:marker.end()] + '\n' + field + text[marker.end():]

    if text != original:
        path.write_text(text, encoding='utf-8')
        changed.append(str(path.relative_to(ROOT)))

print(f'PatriaSoul image pass completed: {len(changed)} HTML files updated.')
for item in changed:
    print(item)
