#!/usr/bin/env python3
import json, re, html
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'ai-engine' / 'knowledge' / 'index.json'
CORE = ROOT / 'ai-engine' / 'knowledge' / 'core-knowledge.json'

def clean(text):
    text = html.unescape(text or '')
    text = re.sub(r'<script[\s\S]*?</script>', ' ', text, flags=re.I)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()

def add(items, seen, item):
    if not item.get('id') or not item.get('content'):
        return
    key = str(item['id'])
    if key in seen:
        return
    seen.add(key)
    item['id'] = key
    items.append(item)

def load_core(items, seen):
    if not CORE.exists():
        return
    try:
        data = json.loads(CORE.read_text(encoding='utf-8'))
    except Exception as exc:
        raise RuntimeError(f'Ne mogu učitati core-knowledge.json: {exc}')
    records = data.get('items', data) if isinstance(data, dict) else data
    if not isinstance(records, list):
        raise RuntimeError('core-knowledge.json nema očekivani niz zapisa u items')
    for item in records:
        if not isinstance(item, dict):
            continue
        normalized = dict(item)
        if 'content' not in normalized and normalized.get('text'):
            normalized['content'] = normalized['text']
        if normalized.get('id') and normalized.get('content'):
            normalized.setdefault('status', 'verified')
            normalized.setdefault('sourceTitle', 'PatriaSoul Knowledge Base — core')
            normalized.setdefault('updatedAt', datetime.now(timezone.utc).isoformat())
            add(items, seen, normalized)

def main():
    items, seen = [], set()
    load_core(items, seen)

    city_file = ROOT / 'gradovi.js'
    if city_file.exists():
        text = city_file.read_text(encoding='utf-8')
        block = text.split('window.PATRIA_CITY_DATA =', 1)[-1]
        for match in re.finditer(r'\{"name":"(.*?)","slug":"(.*?)","county":"(.*?)","source":"(.*?)"\}', block):
            name, slug, county, source = match.groups()
            add(items, seen, {'id': f'city-{slug}', 'type': 'grad', 'title': name,
                'content': f'{name} je grad u {county}. Županija: {county}.',
                'tags': [name, slug, county, 'grad'], 'cityId': slug, 'source': source,
                'sourceTitle': 'Kanonski registar gradova PatriaSoul', 'status': 'verified',
                'updatedAt': datetime.now(timezone.utc).isoformat()})

    q_file = ROOT / 'data.js'
    if q_file.exists():
        text = q_file.read_text(encoding='utf-8')
        pattern = re.compile(r"\{id:'([^']+)',category:'([^']+)',question:'([^']+)',answers:\[(.*?)\],correctIndex:(\d+)\}")
        for m in pattern.finditer(text):
            qid, category, question, answers_raw, correct = m.groups()
            answers = re.findall(r"'((?:\\'|[^'])*)'", answers_raw)
            correct_i = int(correct)
            correct_text = answers[correct_i] if correct_i < len(answers) else ''
            add(items, seen, {'id': f'quiz-{qid}', 'type': 'kviz', 'title': question,
                'content': f'Pitanje: {question} Odgovori: {" | ".join(answers)}. Točan odgovor: {correct_text}.',
                'tags': [category, 'kviz', 'pitanje'], 'source': 'data.js',
                'sourceTitle': 'PatriaSoul centralna baza pitanja', 'status': 'verified',
                'updatedAt': datetime.now(timezone.utc).isoformat()})

    news_file = ROOT / 'news-feed.json'
    if news_file.exists():
        try:
            news = json.loads(news_file.read_text(encoding='utf-8'))
            for i, item in enumerate(news.get('items', [])):
                add(items, seen, {'id': f"news-{i}-{abs(hash(item.get('link',''))) % 100000000}",
                    'type': 'vijest', 'title': item.get('title', ''), 'content': item.get('summary', ''),
                    'tags': [item.get('category', 'vijest')], 'source': item.get('link'),
                    'sourceTitle': item.get('source'), 'sourceDate': item.get('date'),
                    'status': 'published', 'updatedAt': news.get('updatedAt')})
        except Exception as exc:
            print('News index warning:', exc)

    allowed = {'.html', '.md'}
    excluded = {'ai-engine', '.git', 'node_modules'}
    for path in ROOT.rglob('*'):
        if path.suffix.lower() not in allowed or any(part in excluded for part in path.parts):
            continue
        try:
            raw = path.read_text(encoding='utf-8')
        except Exception:
            continue
        content = clean(raw)
        if len(content) < 120:
            continue
        title_match = re.search(r'<title[^>]*>(.*?)</title>', raw, re.I | re.S)
        title = clean(title_match.group(1)) if title_match else path.stem.replace('-', ' ').title()
        add(items, seen, {'id': 'page-' + str(path.relative_to(ROOT)).replace('/', '-').replace('\\', '-'),
            'type': 'stranica', 'title': title, 'content': content[:12000],
            'tags': [path.stem, 'portal'], 'source': str(path.relative_to(ROOT)),
            'sourceTitle': 'PatriaSoul portal', 'status': 'published',
            'updatedAt': datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).isoformat()})

    core_ids = []
    if CORE.exists():
        data = json.loads(CORE.read_text(encoding='utf-8'))
        records = data.get('items', data) if isinstance(data, dict) else data
        core_ids = [str(x.get('id')) for x in records if isinstance(x, dict) and x.get('id')]
    indexed_ids = {str(x.get('id')) for x in items}
    missing_core = [x for x in core_ids if x not in indexed_ids]
    if missing_core:
        raise RuntimeError(f'Knowledge Base build: nedostaju core zapisi u indeksu: {missing_core[:10]}')

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {'version': 2, 'generatedAt': datetime.now(timezone.utc).isoformat(),
               'source': 'PatriaSoul repository', 'counts': {}, 'items': items}
    for item in items:
        payload['counts'][item['type']] = payload['counts'].get(item['type'], 0) + 1
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('PatriaSoul Knowledge Base:', len(items), 'zapisa')
    print('Kategorije:', payload['counts'])

if __name__ == '__main__':
    main()
