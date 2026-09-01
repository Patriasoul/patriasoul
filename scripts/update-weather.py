#!/usr/bin/env python3
import json,re,urllib.request,xml.etree.ElementTree as ET
from datetime import datetime,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FEED=ROOT/'weather-feed.json'
URLS=['https://vrijeme.hr/hrvatska_n.xml','https://vrijeme.hr/hrvatska1_n.xml']
def clean(s): return re.sub(r'\s+',' ',(s or '').strip())
def norm(s): return clean(s).lower().translate(str.maketrans({'č':'c','ć':'c','š':'s','ž':'z','đ':'d'}))
def fetch(u):
 r=urllib.request.Request(u,headers={'User-Agent':'PatriaSoul-Weather/1.0'});return urllib.request.urlopen(r,timeout=20).read()
def parse(data):
 root=ET.fromstring(data); out={}
 for n in root.iter():
  name=None
  for k in ('Grad','grad','Postaja','postaja','Naziv','naziv','Ime','ime'):
   c=n.find(k)
   if c is not None and c.text: name=clean(c.text);break
   if k in n.attrib and n.attrib[k]: name=clean(n.attrib[k]);break
  if not name: continue
  v={}
  for c in n:
   t=c.tag.split('}')[-1].lower(); x=clean(c.text)
   if not x: continue
   if t in ('temp','temperatura','temperature','tempzrak','t'): v['temp']=x.replace('°C','').strip()
   elif 'vlaga' in t or t in ('humidity','rh'): v['humidity']=x.replace('%','').strip()
   elif 'vjet' in t or t in ('wind','wind_speed','brzina'): v['wind']=x
   elif t in ('stanje','opis','weather','condition','vrijeme'): v['condition']=x
  if v: out[name]=v
 return out
cities=json.loads((ROOT/'weather-cities.json').read_text(encoding='utf-8')); merged={}; errors=[]
for u in URLS:
 try: merged.update(parse(fetch(u)))
 except Exception as e: errors.append(str(e))
stations={}
for c in cities:
 target=norm(c.get('station') or c['name']); m=next((v for k,v in merged.items() if norm(k)==target),None)
 if not m: m=next((v for k,v in merged.items() if target in norm(k) or norm(k) in target),None)
 if m: stations[c.get('station') or c['name']]=m
if not stations: raise SystemExit('DHMZ nije dostupan; postojeći feed nije prepisan.')
FEED.write_text(json.dumps({'updatedAt':datetime.now(timezone.utc).isoformat(),'source':'DHMZ','stations':stations},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('DHMZ lokacija:',len(merged),'PatriaSoul stanica:',len(stations))
if errors: print('Upozorenja:',errors)
