from pathlib import Path
import hashlib
import re

ROOT = Path(__file__).resolve().parents[1]
CSS = '<link rel="stylesheet" href="/patriasoul-global.css">'
JS = '<script src="/site-navigation.js" defer></script>'
hero_path = ROOT / 'page-hero.js'
hero_version = hashlib.sha256(hero_path.read_bytes()).hexdigest()[:12] if hero_path.exists() else '1'
HERO_JS = f'<script src="/page-hero.js?v={hero_version}" defer></script>'
changed = []

for path in ROOT.rglob('*.html'):
    if any(part in {'.git','node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    lower = text.lower()
    original = text

    # Keep the global hero script cache-busted whenever page-hero.js changes.
    text = re.sub(r'/page-hero\.js(?:\?[^"\']*)?', f'/page-hero.js?v={hero_version}', text)

    additions = []
    if '/patriasoul-global.css' not in text:
        additions.append(CSS)
    if '/site-navigation.js' not in text:
        additions.append(JS)
    if '/page-hero.js' not in text:
        additions.append(HERO_JS)
    if additions:
        pos = lower.find('</head>')
        if pos >= 0:
            updated = text[:pos] + '\n'.join(additions) + '\n' + text[pos:]
            text = updated

    if text == original:
        continue
    path.write_text(text, encoding='utf-8')
    changed.append(str(path.relative_to(ROOT)))

print(f'Updated PatriaSoul shell assets in {len(changed)} HTML files.')
print(f'page-hero.js cache version: {hero_version}')
for item in changed:
    print(item)
