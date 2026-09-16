#!/usr/bin/env node
/* PatriaSoul — deterministic question-by-question assembly.
   Source question files are never edited. Questions and answers are never rewritten.
   No file-order / "first 75" trimming. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
const TARGET_CITIES=127,TARGET_PER_CITY=75,TARGET_TOTAL=9525;
const EXCLUDED=[33,121];
const LAYERS=Array.from({length:126},(_,i)=>i+2).filter(n=>!EXCLUDED.includes(n));
const norm=s=>String(s??'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const qText=q=>norm(q.question);
const answers=q=>(Array.isArray(q.answers)?q.answers:Array.isArray(q.options)?q.options.map(x=>typeof x==='object'?x.text:x):[]).map(norm);
const contentKey=q=>qText(q)+'|'+answers(q).slice().sort().join('|')+'|'+q.correctIndex;
const templateKey=q=>{let t=qText(q);for(const p of ['koji je toc an podatak o ','koji je toc an podatak o','sto je povezano s ','kada se navodi ','koja tvrdnja opisuje ','sto treba zapamtiti o '])if(t.startsWith(p)){t=t.slice(p.length);break}return t+'|'+answers(q).slice().sort().join('|')+'|'+q.correctIndex};
const valid=q=>q&&q.id&&q.cityId&&q.citySource==='verified'&&q.sourceUrl&&Array.isArray(q.answers)&&q.answers.length===4&&q.answers.every(a=>typeof a==='string'&&a.trim())&&Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<4;
function sourceForEval(file){
  // Some legacy verified files contain unquoted hyphenated object keys (e.g. nova-gradiska).
  // Only the temporary VM input is normalized; repository source files are never modified.
  return fs.readFileSync(file,'utf8').replace(/([,{]\s*)([A-Za-z_$][A-Za-z0-9_$]*(?:-[A-Za-z0-9_$-]+)+)(\s*:)/g,'$1"$2"$3');
}
function evalFile(file,ctx){vm.runInContext(sourceForEval(file),ctx,{filename:file});}
function load(){
  const ctx=vm.createContext({console});ctx.window=ctx;ctx.globalThis=ctx;evalFile(path.join(ROOT,'gradovi.js'),ctx);
  const files=fs.readdirSync(ROOT).filter(f=>/^patriasoul-city-questions-verified(?:-\d+)?\.js$/.test(f)).sort((a,b)=>{const na=(a.match(/-(\d+)\.js$/)||[])[1],nb=(b.match(/-(\d+)\.js$/)||[])[1];if(na==null)return -1;if(nb==null)return 1;return +na-+nb});
  files.forEach(f=>evalFile(path.join(ROOT,f),ctx));
  const cities=ctx.PATRIA_CITY_DATA||[],pools=new Map(cities.map(c=>[c.slug,[]])),sources=new Map();
  const add=(q,source)=>{if(!valid(q)||!pools.has(q.cityId))return;if(sources.has(q.id))return;sources.set(q.id,source);pools.get(q.cityId).push({...q,__source:source});};
  if(ctx.PatriaCityVerified?.forCity)for(const c of cities)(ctx.PatriaCityVerified.forCity(c.name)||[]).forEach(q=>add(q,'legacy'));
  for(const n of LAYERS){const api=ctx[`PatriaCityVerified${n}`];if(api?.forCity)for(const c of cities)(api.forCity(c.name)||[]).forEach(q=>add(q,`layer-${n}`));}
  return {cities,pools};
}
function main(){
  const {cities,pools}=load();if(cities.length!==TARGET_CITIES)throw new Error(`Expected ${TARGET_CITIES} cities, got ${cities.length}`);
  const report=[],duplicates=[];
  for(const c of cities){const raw=pools.get(c.slug)||[],cm=new Map(),tm=new Map();
    for(const q of raw){const ck=contentKey(q),tk=templateKey(q);(cm.get(ck)||cm.set(ck,[]).get(ck)).push(q);(tm.get(tk)||tm.set(tk,[]).get(tk)).push(q)}
    for(const g of cm.values())if(g.length>1)duplicates.push({type:'same-content',city:c.slug,ids:g.map(q=>q.id),questions:g.map(q=>q.question)});
    for(const g of tm.values())if(g.length>1&&g.some(q=>q.question!==g[0].question))duplicates.push({type:'same-fact-template',city:c.slug,ids:g.map(q=>q.id),questions:g.map(q=>q.question)});
    report.push({name:c.name,slug:c.slug,raw:raw.length,uniqueIds:new Set(raw.map(q=>q.id)).size,contentGroups:cm.size,templateGroups:tm.size});
  }
  const selected=new Map(),used=new Set(),leftovers=[];
  for(const c of cities){const pool=pools.get(c.slug)||[],chosen=[],seen=new Set();
    for(const q of pool){const k=contentKey(q);if(!seen.has(k)){seen.add(k);chosen.push(q);used.add(q.id)}}
    if(chosen.length<TARGET_PER_CITY)for(const q of pool){if(chosen.length>=TARGET_PER_CITY)break;if(!used.has(q.id)){chosen.push(q);used.add(q.id)}}
    selected.set(c.slug,chosen);
    for(const q of pool)if(!used.has(q.id))leftovers.push(q);
  }
  const unresolved=[];
  for(const c of cities){const chosen=selected.get(c.slug);if(chosen.length>=TARGET_PER_CITY)continue;
    const target=norm(c.name),cand=[];
    for(const q of leftovers){if(used.has(q.id))continue;const evidence=qText(q).includes(target)||norm(q.sourceUrl).includes(target)||norm(q.sourceUrl).includes(norm(c.slug));if(!evidence)continue;
      const otherCities=cities.filter(x=>x.slug!==c.slug&&qText(q).includes(norm(x.name)));if(otherCities.length)continue;cand.push(q);
    }
    for(const q of cand){if(chosen.length>=TARGET_PER_CITY)break;chosen.push({...q,cityId:c.slug,__reassignedFrom:q.cityId,__assemblyReason:'explicit-target-city-evidence'});used.add(q.id)}
    if(chosen.length<TARGET_PER_CITY)unresolved.push({city:c.name,slug:c.slug,need:TARGET_PER_CITY-chosen.length,available:chosen.length});
  }
  const final=cities.map(c=>({city:c.name,slug:c.slug,questions:selected.get(c.slug)||[]}));
  const total=final.reduce((n,c)=>n+c.questions.length,0);
  const out={version:2,targetCities:TARGET_CITIES,targetPerCity:TARGET_PER_CITY,targetTotal:TARGET_TOTAL,generatedAt:new Date().toISOString(),totalSelected:total,unresolved,duplicates,report,final};
  fs.mkdirSync(path.join(ROOT,'data'),{recursive:true});
  fs.writeFileSync(path.join(ROOT,'data','brani-svoj-grad-assembly.json'),JSON.stringify(out,null,2)+'\n');
  fs.writeFileSync(path.join(ROOT,'data','brani-svoj-grad-bank.js'),'// GENERATED — source questions are preserved verbatim.\nwindow.PATRIA_CITY_ASSEMBLY='+JSON.stringify(final)+';\n');
  console.log(JSON.stringify({targetCities:TARGET_CITIES,targetPerCity:TARGET_PER_CITY,targetTotal:TARGET_TOTAL,totalSelected:total,unresolvedCities:unresolved.length,duplicateGroups:duplicates.length},null,2));
  if(total!==TARGET_TOTAL||unresolved.length)process.exitCode=2;
}
main();
