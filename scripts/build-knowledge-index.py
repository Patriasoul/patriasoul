#!/usr/bin/env python3
import json, re, html
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'ai-engine' / 'knowledge' / 'index.json'


def clean(text):
    text = html.unescape(text or '')
    text = re.sub(r'<script[\s\S]*?</script>', ' ', text, flags=re.I)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()


def add(items, seen, item):
    if not item.get('id') or not item.get('content'):
        return
    if item['id'] in seen:
        return
    seen.add(item['id'])
    items.append(item)


def main():
    items, seen = [], set()

    # Kanonski registar 127 gradova.
    city_file = ROOT / 'gradovi.js'
    if city_file.exists():
        text = city_file.read_text(encoding='utf-8')
        block = text.split('window.PATRIA_CITY_DATA =', 1)[-1]
        for match in re.finditer(r'\{"name":"(.*?)","slug":"(.*?)","county":"(.*?)","source":"(.*?)"\}', block):
            name, slug, county, source = match.groups()
            add(items, seen, {
                'id': f'city-{slug}', 'type': 'grad', 'title': name,
                'content': f'{name} je grad u {county}. Županija: {county}.',
                'tags': [name, slug, county, 'grad'], 'cityId': slug,
                'source': source, 'sourceTitle': 'Kanonski registar gradova PatriaSoul',
                'status': 'verified', 'updatedAt': datetime.now(timezone.utc).isoformat()
            })

    # Centralna baza pitanja; pitanja su znanje za objašnjenja i buduće AI kvizove.
    q_file = ROOT / 'data.js'
    if q_file.exists():
        text = q_file.read_text(encoding='utf-8')
        pattern = re.compile(r"\{id:'([^']+)',category:'([^']+)',question:'([^']+)',answers:\[(.*?)\],correctIndex:(\d+)\}")
        for m in pattern.finditer(text):
            qid, category, question, answers_raw, correct = m.groups()
            answers = re.findall(r"'((?:\\'|[^'])*)'", answers_raw)
            correct_i = int(correct)
            correct_text = answers[correct_i] if correct_i < len(answers) else ''
            content = f'Pitanje: {question} Odgovori: {" | ".join(answers)}. Točan odgovor: {correct_text}.'
            add(items, seen, {
                'id': f'quiz-{qid}', 'type': 'kviz', 'title': question,
                'content': content, 'tags': [category, 'kviz', 'pitanje'],
                'source': 'data.js', 'sourceTitle': 'PatriaSoul centralna baza pitanja',
                'status': 'verified', 'updatedAt': datetime.now(timezone.utc).isoformat()
            })

    # Objavljeni feedovi koje portal već održava.
    news_file = ROOT / 'news-feed.json'
    if news_file.exists():
        try:
            news = json.loads(news_file.read_text(encoding='utf-8'))
            for i, item in enumerate(news.get('items', [])):
                add(items, seen, {
                    'id': f"news-{i}-{abs(hash(item.get('link',''))) % 100000000}",
                    'type': 'vijest', 'title': item.get('title', ''),
                    'content': item.get('summary', ''),
                    'tags': [item.get('category', 'vijest')],
                    'source': item.get('link'), 'sourceTitle': item.get('source'),
                    'sourceDate': item.get('date'), 'status': 'published',
                    'updatedAt': news.get('updatedAt')
                })
        except Exception as exc:
            print('News index warning:', exc)

    # Ostale tekstualne stranice: korisno za AI pretragu, ali bez CSS/JS buke.
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
        add(items, seen, {
            'id': 'page-' + str(path.relative_to(ROOT)).replace('/', '-').replace('\\', '-'),
            'type': 'stranica', 'title': title, 'content': content[:12000],
            'tags': [path.stem, 'portal'], 'source': str(path.relative_to(ROOT)),
            'sourceTitle': 'PatriaSoul portal', 'status': 'published',
            'updatedAt': datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).isoformat()
        })

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        'version': 1,
        'generatedAt': datetime.now(timezone.utc).isoformat(),
        'source': 'PatriaSoul repository',
        'counts': {},
        'items': items
    }
    for item in items:
        payload['counts'][item['type']] = payload['counts'].get(item['type'], 0) + 1
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('PatriaSoul Knowledge Base:', len(items), 'zapisa')
    print('Kategorije:', payload['counts'])


if __name__ == '__main__':
    main()
