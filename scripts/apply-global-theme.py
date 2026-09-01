from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINK = '<link rel="stylesheet" href="/patriasoul-global.css">'
changed = []

for path in ROOT.rglob('*.html'):
    if any(part in {'.git','node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    if '/patriasoul-global.css' in text:
        continue
    lower = text.lower()
    pos = lower.find('</head>')
    if pos < 0:
        continue
    updated = text[:pos] + LINK + '\n' + text[pos:]
    path.write_text(updated, encoding='utf-8')
    changed.append(str(path.relative_to(ROOT)))

print(f'Injected PatriaSoul global theme into {len(changed)} HTML files.')
for item in changed:
    print(item)
