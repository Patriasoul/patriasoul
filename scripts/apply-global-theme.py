from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = '<link rel="stylesheet" href="/patriasoul-global.css">'
JS = '<script src="/site-navigation.js" defer></script>'
changed = []

for path in ROOT.rglob('*.html'):
    if any(part in {'.git','node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    lower = text.lower()
    additions = []
    if '/patriasoul-global.css' not in text:
        additions.append(CSS)
    if '/site-navigation.js' not in text:
        additions.append(JS)
    if not additions:
        continue
    pos = lower.find('</head>')
    if pos < 0:
        continue
    updated = text[:pos] + '\n'.join(additions) + '\n' + text[pos:]
    path.write_text(updated, encoding='utf-8')
    changed.append(str(path.relative_to(ROOT)))

print(f'Injected PatriaSoul shell assets into {len(changed)} HTML files.')
for item in changed:
    print(item)
