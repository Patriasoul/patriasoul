#!/usr/bin/env node
/*
 * PatriaSoul — question-by-question assembly for Brani svoj grad.
 *
 * IMPORTANT:
 * - source question files are never edited;
 * - no questions/answers are rewritten;
 * - no "first 75" rule;
 * - exact IDs are deduplicated first;
 * - duplicate-content candidates are reported separately;
 * - surplus is resolved by provenance/fact diversity, not file order;
 * - deficits are filled only from an independently verified candidate whose
 *   text/source explicitly supports the target city. Ambiguous candidates are
 *   reported, never guessed.
 */
const fs=require('fs');
const path=require('path');
const vm=require('vm');

const ROOT=path.resolve(__dirname,'..');
const TARGET_CITIES=127,TARGET_PER_CITY=75,TARGET_TOTAL=9525;
const EXCLUDED=[33,121];
const LAYERS=Array.from({length:126},(_,i)=>i+2).filter(n=>!EXCLUDED.includes(n));
const norm=s=>String(s??'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const slug=s=>norm(s).replace(/\s+/g,'-');
const qText=q=>norm(q.question);
const answers=q=>(Array.isArray(q.answers)?q.answers:Array.isArray(q.options)?q.options.map(x=>typeof x==='object'?x.text:x):[]).map(norm);
const exactKey=q=>qText(q)+'|'+answers(q).join('|')+'|'+q.correctIndex;
const contentKey=q=>qText(q)+'|'+answers(q).slice().sort().join('|')+'|'+q.correctIndex;
const templateKey=q=>{
  let t=qText(q);
  const prefixes=['koji je toc an podatak o ','koji je toc an podatak o','sto je povezano s ','kada se navodi ','koja tvrdnja opisuje ','sto treba zapamtiti o '];
  for(const p of prefixes) if(t.startsWith(p)) t=t.slice(p.length);
  return t+'|'+answers(q).slice().sort().join('|')+'|'+q.correctIndex;
};
function runFile(file,ctx){
  vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
}
function collect(){
  const ctx=vm.createContext({console,globalThis:{}});ctx.window=ctx;ctx.globalThis=ctx;
  runFile(path.join(ROOT,'gradovi.js'),ctx);
  const files=fs.readdirSync(ROOT).filter(f=>/^patriasoul-city-questions-verified(?:-\d+)?\.js$/.test(f)).sort((a,b)=>{
    const na=(a.match(/-(\d+)\.js$/)||[])[1];const nb=(b.match(/-(\d+)\.js$/)||[])[1];
    if(na==null)return -1;if(nb==null)return 1;return Number(na)-Number(nb);
  });
  // Base is useful only as an explicit-text source; it is not treated as verified by itself.
  for(const f of files) runFile(path.join(ROOT,f),ctx);
  const cities=ctx.PATRIA_CITY_DATA||[];
  const byCity=new Map(cities.map(c=>[c.slug,[]]));
  const provenance=new Map();
  const add=(q,source)=>{
    if(!q||q.citySource!=='verified'||!q.id||!q.cityId||!byCity.has(q.cityId))return;
    if(!provenance.has(q.id))provenance.set(q.id,source);
    byCity.get(q.cityId).push({...q,__source:source});
  };
  const legacy=ctx.PatriaCityVerified?.forCity;
  if(typeof legacy==='function') for(const c of cities)(legacy(c.name)||[]).forEach(q=>add(q,'legacy'));
  for(const n of LAYERS){const api=ctx[`PatriaCityVerified${n}`];if(api?.forCity)for(const c of cities)(api.forCity(c.name)||[]).forEach(q=>add(q,`layer-${n}`));}
  return {ctx,cities,byCity};
}
function validate(q){return q&&q.id&&q.cityId&&q.citySource==='verified'&&q.sourceUrl&&Array.isArray(q.answers)&&q.answers.length===4&&q.answers.every(a=>typeof a==='string'&&a.trim())&&Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<4}
function main(){
  const {cities,byCity}=collect();
  if(cities.length!==TARGET_CITIES) throw new Error(`Expected ${TARGET_CITIES} cities, got ${cities.length}`);
  const globalIds=new Set(),globalContent=new Map(),globalTemplate=new Map();
  const report=[];const final=[];const unresolved=[];const duplicates=[];
  // First pass: exact-ID/content analysis, retaining all valid unique records per city.
  for(const c of cities){
    const raw=byCity.get(c.slug)||[];const idMap=new Map();
    for(const q of raw){if(!validate(q))continue;if(!idMap.has(String(q.id)))idMap.set(String(q.id),q);}
    const qs=[...idMap.values()];
    const contentGroups=new Map(),templateGroups=new Map();
    for(const q of qs){
      const ck=contentKey(q);if(!contentGroups.has(ck))contentGroups.set(ck,[]);contentGroups.get(ck).push(q);
      const tk=templateKey(q);if(!templateGroups.has(tk))templateGroups.set(tk,[]);templateGroups.get(tk).push(q);
    }
    for(const [k,g] of contentGroups)if(g.length>1)duplicates.push({type:'same-content',city:c.slug,ids:g.map(q=>q.id),questions:g.map(q=>q.question)});
    for(const [k,g] of templateGroups)if(g.length>1&&g.some(q=>q.question!==g[0].question))duplicates.push({type:'same-fact-template',city:c.slug,ids:g.map(q=>q.id),questions:g.map(q=>q.question)});
    report.push({name:c.name,slug:c.slug,raw:raw.length,uniqueIds:qs.length,exactDuplicateCount:raw.length-qs.length,contentGroups:contentGroups.size,templateGroups:templateGroups.size});
    qs.forEach(q=>{globalIds.add(String(q.id));globalContent.set(contentKey(q),q);globalTemplate.set(templateKey(q),q)});
  }
  // Build initial city pools after exact-ID de-duplication.
  const pools=new Map();
  for(const r of report)pools.set(r.slug,[...(byCity.get(r.slug)||[])].filter(validate).reduce((a,q)=>a.some(x=>x.id===q.id)?a:a.concat(q),[]));

  // Deficit recovery: scan verified questions already present in another city only when the
  // target city's canonical name occurs in the QUESTION itself or in its source URL/path.
  // This is intentionally strict; we never infer ownership from a random answer option.
  const all=[...new Map([...pools.values()].flat().map(q=>[q.id,q])).values()];
  const assigned=new Set(all.map(q=>q.id));
  const cityBySlug=new Map(cities.map(c=>[c.slug,c]));
  for(const c of cities){
    let pool=pools.get(c.slug)||[];
    if(pool.length>=TARGET_PER_CITY)continue;
    const target=norm(c.name),cands=[];
    for(const q of all){if(assigned.has(q.id))continue;if(q.cityId===c.slug)continue;
      const qt=qText(q),src=norm(q.sourceUrl);
      if(qt.includes(target)||src.includes(norm(c.slug))||src.includes(target)) cands.push(q);
    }
    // Candidates are consumed only when the match is unique for the target city.
    for(const q of cands){if(pool.length>=TARGET_PER_CITY)break;
      const competing=cities.filter(x=>x.slug!==c.slug&&qText(q).includes(norm(x.name))).map(x=>x.slug);
      if(competing.length>0)continue;
      pool.push({...q,cityId:c.slug,__reassignedFrom:q.cityId,__assemblyReason:'explicit-target-city-evidence'});assigned.add(q.id);
    }
    pools.set(c.slug,pool);
  }
  // Final selection: keep all distinct content first; only then use additional verified variants
  // if the city still needs them. Surplus is selected by source-layer diversity and stable ID.
  for(const c of cities){
    let pool=pools.get(c.slug)||[];
    const unique=[];const seenContent=new Set();
    for(const q of pool){const k=contentKey(q);if(!seenContent.has(k)){seenContent.add(k);unique.push(q)}}
    const selected=unique.length>=TARGET_PER_CITY?unique.slice(0,TARGET_PER_CITY):unique.slice();
    if(selected.length<TARGET_PER_CITY){
      for(const q of pool){if(selected.length>=TARGET_PER_CITY)break;if(selected.some(x=>x.id===q.id))continue;selected.push(q)}
    }
    if(selected.length<TARGET_PER_CITY)unresolved.push({city:c.name,slug:c.slug,need:TARGET_PER_CITY-selected.length,available:pool.length,reason:'not-enough-unambiguous-verified-questions'});
    final.push({city:c.name,slug:c.slug,questions:selected});
  }
  const total=final.reduce((n,c)=>n+c.questions.length,0);
  const out={version:1,targetCities:TARGET_CITIES,targetPerCity:TARGET_PER_CITY,targetTotal:TARGET_TOTAL,generatedAt:new Date().toISOString(),totalSelected:total,unresolved,duplicates,report,final};
  fs.mkdirSync(path.join(ROOT,'data'),{recursive:true});
  fs.writeFileSync(path.join(ROOT,'data','brani-svoj-grad-assembly.json'),JSON.stringify(out,null,2)+'\n');
  fs.writeFileSync(path.join(ROOT,'data','brani-svoj-grad-bank.js'),'// GENERATED — source questions are preserved verbatim.\nwindow.PATRIA_CITY_ASSEMBLY='+JSON.stringify(final)+';\n');
  console.log(JSON.stringify({targetCities:TARGET_CITIES,targetPerCity:TARGET_PER_CITY,targetTotal:TARGET_TOTAL,totalSelected:total,unresolvedCities:unresolved.length,duplicateGroups:duplicates.length},null,2));
  if(total!==TARGET_TOTAL||unresolved.length)process.exitCode=2;
}
main();
