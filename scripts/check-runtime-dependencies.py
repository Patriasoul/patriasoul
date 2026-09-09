from pathlib import Path
from urllib.parse import urlsplit
import re

ROOT = Path(__file__).resolve().parents[1]
IGNORE_DIRS = {'.git', 'node_modules'}
IGNORE_PREFIXES = ('http:', 'https:', 'mailto:', 'tel:', 'javascript:', 'data:', 'blob:', '#')


def resolve(source: Path, ref: str):
    ref = ref.strip().strip('"\'`')
    if not ref or ref.startswith(IGNORE_PREFIXES):
        return None
    path = urlsplit(ref).path
    if not path:
        return None
    if path.startswith('/'):
        target = ROOT / path.lstrip('/')
    else:
        target = source.parent / path
    if path.endswith('/'):
        target = target / 'index.html'
    return target.resolve()

missing = []
checked = 0

# HTML: script/link/img/media references not covered by the older HTML-only checker.
for source in ROOT.rglob('*.html'):
    if any(part in IGNORE_DIRS for part in source.parts):
        continue
    text = source.read_text(encoding='utf-8', errors='replace')
    for match in re.finditer(r'\b(?:src|href|poster)\s*=\s*["\']([^"\']+)', text, re.I):
        target = resolve(source, match.group(1))
        if target is not None:
            checked += 1
            if not target.exists():
                missing.append((source.relative_to(ROOT), match.group(1), 'HTML'))

# JS: local imports and common fetch/XHR/import() dependencies.
for source in ROOT.rglob('*.js'):
    if any(part in IGNORE_DIRS for part in source.parts):
        continue
    text = source.read_text(encoding='utf-8', errors='replace')
    patterns = [
        r'\bfetch\(\s*["\']([^"\']+)',
        r'\bimport\(\s*["\']([^"\']+)',
        r'\b(?:from|import)\s*["\']([^"\']+)',
        r'\b(?:src|href|url)\s*[:=]\s*["\']([^"\']+\.(?:js|json|html|css|wasm)(?:[?#][^"\']*)?)',
    ]
    for pattern in patterns:
        for match in re.finditer(pattern, text):
            ref = match.group(1)
            target = resolve(source, ref)
            if target is not None:
                checked += 1
                if not target.exists():
                    missing.append((source.relative_to(ROOT), ref, 'JS'))

# CSS local url() dependencies.
for source in ROOT.rglob('*.css'):
    if any(part in IGNORE_DIRS for part in source.parts):
        continue
    text = source.read_text(encoding='utf-8', errors='replace')
    for match in re.finditer(r'url\(\s*["\']?([^\)"\']+)', text, re.I):
        target = resolve(source, match.group(1))
        if target is not None:
            checked += 1
            if not target.exists():
                missing.append((source.relative_to(ROOT), match.group(1), 'CSS'))

# PWA shell: every local shell entry must exist. This is intentionally strict.
sw = ROOT / 'sw.js'
if sw.exists():
    text = sw.read_text(encoding='utf-8', errors='replace')
    shell = re.search(r'const\s+SHELL\s*=\s*\[(.*?)\]\s*;', text, re.S)
    if shell:
        for ref in re.findall(r'["\']([^"\']+)["\']', shell.group(1)):
            target = resolve(sw, ref)
            if target is not None:
                checked += 1
                if not target.exists():
                    missing.append((Path('sw.js'), ref, 'PWA-SHELL'))
    else:
        missing.append((Path('sw.js'), 'SHELL array not found', 'PWA-SHELL'))

print(f'Runtime dependency references checked: {checked}')
print(f'Missing runtime dependencies: {len(missing)}')
for source, ref, kind in missing:
    print(f'  MISSING [{kind}] {source} -> {ref}')

raise SystemExit(1 if missing else 0)
