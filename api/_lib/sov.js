import { BRANDS, PROMPTS } from './prompts.js';
const timeout = () => AbortSignal.timeout(Number(process.env.SOV_REQUEST_TIMEOUT_MS || 45000));
async function post(url,key,body,extra={}) {
 const r=await fetch(url,{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json',...extra},body:JSON.stringify(body),signal:timeout()});
 const d=await r.json().catch(()=>({}));
 if(!r.ok) throw new Error(d?.error?.message||d?.message||`HTTP ${r.status}`);
 return d;
}
const outText=d=>d.output_text|| (d.output||[]).flatMap(x=>x.content||[]).filter(x=>['output_text','text'].includes(x.type)).map(x=>x.text||'').join('\n');
async function openai(prompt){
 const d=await post('https://api.openai.com/v1/responses',process.env.OPENAI_API_KEY,{model:process.env.OPENAI_MODEL||'gpt-6-astra',tools:[{type:'web_search',search_context_size:'medium'}],tool_choice:'required',input:`Search the live web and answer independently. List only providers you can substantiate. Answer in the language of the question and include source links.\n\n${prompt}`});
 const citations=(d.output||[]).flatMap(x=>x.content||[]).flatMap(x=>x.annotations||[]).filter(x=>x.url).map(x=>({url:x.url,title:x.title||x.url}));
 return {text:outText(d),citations,model:d.model||process.env.OPENAI_MODEL||'gpt-6-astra'};
}
async function claude(prompt){
 const d=await post('https://api.anthropic.com/v1/messages',process.env.ANTHROPIC_API_KEY,{model:process.env.ANTHROPIC_MODEL||'claude-sonnet-4-6',max_tokens:1800,system:'Research current providers using web search. Be independent, substantiate claims, answer in the question language and cite sources.',messages:[{role:'user',content:prompt}],tools:[{type:'web_search_20250305',name:'web_search',max_uses:4}]},{'anthropic-version':'2023-06-01','x-api-key':process.env.ANTHROPIC_API_KEY});
 const blocks=d.content||[];
 return {text:blocks.filter(x=>x.type==='text').map(x=>x.text).join('\n'),citations:blocks.flatMap(x=>x.citations||[]).filter(x=>x.url).map(x=>({url:x.url,title:x.title||x.url})),model:d.model||process.env.ANTHROPIC_MODEL||'claude-sonnet-4-6'};
}
async function perplexity(prompt){
 const d=await post('https://api.perplexity.ai/v1/agent',process.env.PERPLEXITY_API_KEY,{preset:process.env.PERPLEXITY_PRESET||'pro-search',input:`Research current providers independently. Answer in the question language and cite sources.\n\n${prompt}`});
 const citations=(d.citations||[]).map(x=>typeof x==='string'?{url:x,title:x}:{url:x.url,title:x.title||x.url}).filter(x=>x.url);
 return {text:outText(d),citations,model:d.model||process.env.PERPLEXITY_PRESET||'pro-search'};
}
const providers=[{id:'chatgpt',enabled:()=>!!process.env.OPENAI_API_KEY,run:openai},{id:'claude',enabled:()=>!!process.env.ANTHROPIC_API_KEY,run:claude},{id:'perplexity',enabled:()=>!!process.env.PERPLEXITY_API_KEY,run:perplexity}];
function analyze(text,citations){
 const t=(text||'').toLocaleLowerCase();
 const brands=BRANDS.map(b=>{
  const hits=b.aliases.map(a=>t.indexOf(a.toLocaleLowerCase())).filter(i=>i>=0).sort((a,b)=>a-b);
  const cited=citations.some(c=>b.domains.some(d=>(c.url||'').toLowerCase().includes(d)));
  const recommended=hits.length>0&&/(recommend|suggest|consider|shortlist|best|hire|рекоменд|совету|подход|выбрать|обратиться)/i.test(text.slice(Math.max(0,hits[0]-120),hits[0]+240));
  return {id:b.id,name:b.name,mentioned:hits.length>0,cited,recommended,index:hits[0]??-1};
 });
 return {brands:brands.map(({index,...b})=>b),position_order:brands.filter(b=>b.mentioned).sort((a,b)=>a.index-b.index).map(b=>b.id)};
}
async function pool(items,limit,fn){const out=new Array(items.length);let next=0;await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{while(next<items.length){const i=next++;out[i]=await fn(items[i]);}}));return out;}
export async function runMonitoring({market='both'}={}){
 const qs=PROMPTS.filter(p=>market==='both'||p.locale===market);
 const ps=providers.filter(p=>p.enabled());
 if(!ps.length) throw new Error('Нет API-ключей провайдеров. Добавьте OPENAI_API_KEY, ANTHROPIC_API_KEY или PERPLEXITY_API_KEY в Vercel.');
 const started=Date.now();
 const tasks=qs.flatMap(prompt=>ps.map(provider=>({prompt,provider})));
 const results=await pool(tasks,Number(process.env.SOV_CONCURRENCY || 18),async({prompt,provider})=>{
  const t=Date.now();
  try{const a=await provider.run(prompt.prompt);const citations=a.citations||[];const x=analyze(a.text,citations);return {prompt_id:prompt.id,locale:prompt.locale,category:prompt.category,provider:provider.id,model:a.model,prompt:prompt.prompt,answer:a.text||'',citations,brands:x.brands,position_order:x.position_order,latency_ms:Date.now()-t,status:'success',error:null};}
  catch(e){return {prompt_id:prompt.id,locale:prompt.locale,category:prompt.category,provider:provider.id,model:null,prompt:prompt.prompt,answer:'',citations:[],brands:BRANDS.map(b=>({id:b.id,name:b.name,mentioned:false,cited:false,recommended:false})),position_order:[],latency_ms:Date.now()-t,status:'error',error:e.message||'Provider request failed'};}
 });
 return {results,duration_ms:Date.now()-started,prompt_count:qs.length,successful_count:results.filter(x=>x.status==='success').length,failed_count:results.filter(x=>x.status==='error').length};
}
