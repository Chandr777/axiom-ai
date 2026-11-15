import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'
import { getPage, plans } from './siteData'
import ServiceCards from './ServiceCards'

const faq = [
  ['What is GEO and how does it differ from SEO?', 'SEO helps search engines discover and rank pages. GEO improves the accessibility, consistency and verifiability of brand information used by generative answer systems. AEO focuses on complete answers to specific questions. These approaches share technical accessibility and useful content as a foundation.'],
  ['Which crawler is relevant to ChatGPT Search?', 'OAI-SearchBot is intended for search discovery. GPTBot collects content that may be used for model training. These controls are independent. Allowing the search crawler does not guarantee that a page will appear in an answer.'],
  ['Should we allow training crawlers?', 'GPTBot and ClaudeBot serve training-related purposes; OAI-SearchBot and Claude-SearchBot serve search purposes. Decide on training access according to your publishing policy. Review the operator documentation and real CDN or firewall responses separately.'],
  ['Is llms.txt enough for GEO?', 'No. llms.txt and llms-full.txt are optional representations for tools that support them. They do not replace accessible HTML, robots.txt, a sitemap or useful content. Google does not require these files for its AI search features.'],
  ['What does Schema.org JSON-LD do?', 'It describes visible facts about an organization, service or publication in a structured format. Markup must agree with page content. It does not guarantee ranking improvements or rich results.'],
  ['How do we measure AI visibility?', 'Fix a query set and record the platform, date, region, language, search mode, full answer and cited sources. Count brand mentions, links to the actual domain, recommendations, share of voice and factual accuracy separately. Repeat comparable runs.'],
  ['What makes a claim about a company credible?', 'Verifiable company details, named authors when confirmed, primary sources, public methods and genuine case data help readers assess a claim. Obtain client permission before publishing confidential results. Our first case is an internal technical audit, with downloadable observations.'],
  ['Can you guarantee a top position in AI answers?', 'No. Answers depend on the query, system, model version, region, language, time and available sources. We agree on deliverables and measurement conditions, then document changes and limitations.'],
]
const glossary = [
  ['GEO', 'Generative Engine Optimization: improving the accessibility, consistency and verifiability of information used by generative answer systems.'],
  ['AEO', 'Answer Engine Optimization: structuring content to answer a specific user question directly and completely.'],
  ['LLM', 'Large Language Model: a model that produces text from its context and learned patterns.'],
  ['RAG', 'Retrieval-Augmented Generation: retrieving external material and using it as context for a generated answer.'],
  ['AI crawler', 'An automated client fetching public content for a purpose defined by its operator. Search, training and user-triggered retrieval are different purposes.'],
  ['robots.txt', 'Crawl instructions for compatible clients. It is not an authorization mechanism or a guarantee of crawling.'],
  ['llms.txt', 'An optional content map for supporting tools. It does not replace HTML or a sitemap.'],
  ['JSON-LD', 'A JSON representation of linked data, often used to embed Schema.org descriptions in HTML.'],
  ['Knowledge Graph', 'A data model representing entities and their relationships.'],
  ['Mention Rate', 'The number of successful answers mentioning the target brand divided by the number of successful answers in the defined sample.'],
  ['Citation Rate', 'The number of successful answers linking to the target domain divided by the number of successful answers in the defined sample.'],
  ['Share of Voice', 'The target brand’s mentions as a share of all mentions of a predefined competitor set, under a disclosed counting rule.'],
]
const content = {
  '/en': {
    title: 'GEO and AEO: audits and improving brand visibility in AI search',
    lead: 'We help companies make their public information accessible, consistent and useful in generative search. Our work combines technical audits, answer-focused content and repeatable AI visibility measurement.',
    sections: [['Accessible information', 'We check HTTP responses, crawl rules, canonicals, sitemaps, rendered HTML and infrastructure restrictions. Useful information should be readable before relying on a particular client to execute JavaScript.'], ['Verifiable facts', 'We align company, service, pricing and contact information across pages and structured data. Claims should have evidence and clear limitations.'], ['Repeatable measurement', 'We record a fixed set of queries and compare brand mentions, citations, recommendations and factual accuracy under comparable conditions. A technical change is not, by itself, proof of a ranking gain.']],
  },
  '/en/services': {
    title: 'GEO, AEO and AI visibility monitoring services', lead: 'Each engagement starts with a diagnosis, an agreed scope and a baseline. Implementation is followed by documented checks and repeat measurements.',
    sections: [['Technical accessibility', 'Robots.txt, sitemaps, DNS, HTTPS, status codes, redirects, canonicals, robots metadata and CDN or firewall accessibility.'], ['Entities and structured facts', 'Consistent descriptions of the organization, services, products, geography and contacts, with Schema.org markup that matches visible content.'], ['Answer-focused content', 'Pages addressing actual customer questions with a direct answer, conditions, examples, limits and supporting sources.'], ['External consistency', 'Review of official profiles, relevant directories, genuine reviews and industry publications. External editorial coverage depends on the publisher.'], ['AI visibility monitoring', 'A documented query set, platforms, language, region and dates, with separate measures for mentions, domain citations, recommendations, share of voice and factual accuracy.']],
  },
  '/en/methodology': {
    title: 'From technical accessibility to repeatable measurement', lead: 'We define the experiment before comparing results. Query wording, search mode, language, region and platform changes can affect the outcome.',
    sections: [['1. Diagnose', 'Record the business goals, services, market, competitors and real user questions. Audit crawl accessibility, page content, entity consistency and external presence. Save the baseline observations and original answers.'], ['2. Implement', 'Remove technical obstacles, clarify facts and contacts, publish useful pages and add structured data consistent with their visible text. Keep a dated change log.'], ['3. Measure', 'Repeat the same queries in comparable conditions. Preserve full answers and sources. Count mentions, citations and recommendations separately; report successful answers and failures.'], ['Metrics and limitations', 'Mention Rate is the share of answers naming the brand; Citation Rate counts answers linking to its domain; Recommendation Rate counts recommendations in supplier-selection questions. Share of Voice uses a fixed competitor set. Fact Accuracy uses checked factual claims. Small manual samples are observations, not market-wide estimates or evidence of causality.']],
  },
  '/en/cases': {
    title: 'Case studies with inspectable evidence', lead: 'Our first published case is a technical audit of our own website. It includes the method, raw HTTP observations and explicit limits.',
    sections: [['Internal audit of axiom-ai.su', 'On 15 November 2026, a predefined set of 17 URLs returned 11 HTTP 200 responses and 6 HTTP 404 responses. The missing addresses included company pages, the English entry page and two technical assets. A follow-up of the same 17 paths returned 17 HTTP 200 responses and no HTTP 404 responses. The study documents technical work; it makes no claim about increased citations, traffic or rankings.'], ['Evidence standards', 'A case should disclose the starting point, changes, dates, query sample, platforms, counting rules and original evidence. Client reports require permission to disclose their data.']],
  },
  '/en/pricing': {
    title: 'GEO and AEO pricing in Russian rubles', lead: 'Choose a one-time diagnostic, an implementation project or ongoing monitoring. Final scope, timing and price are agreed before work starts.',
    sections: [['FREE: AI-FOOTPRINT EXPRESS', 'A one-time report covering 15 commercial queries on three LLM platforms, brand citations, factual errors and a comparison with three competitors. The published Russian package specifies email delivery within 24 hours.'], ['PRO: project engagement', 'Includes the FREE scope plus a 100+ query matrix, implementation specifications, a consistent company and service fact sheet, page and JSON-LD updates, and crawl accessibility checks, materials for 10+ agreed outlets and a publication plan, a dedicated contact, a six-month roadmap and checks after 30 and 90 days. Third-party publication requires the outlet’s acceptance.'], ['BUSINESS: ongoing support', 'Includes the PRO scope plus weekly monitoring across five LLM platforms, ongoing updates, preparation of at least four materials per month for agreed outlets, with publication subject to acceptance, infrastructure audits, a dedicated engineer and analyst, and monthly reporting. Minimum contract: six months. Positions in model answers are not guaranteed.']],
  },
  '/en/about': {
    title: 'About Axiom AI (axiom-ai.su)', lead: 'Axiom AI is a GEO and AEO agency working on technical accessibility, consistent brand information, useful answers and transparent measurement.',
    sections: [['What we do', 'We diagnose crawl and content issues, align service and company facts, implement suitable structured data and measure AI visibility against a fixed query set. Project scope follows the diagnosis.'], ['Publishing and evidence', 'Website materials are published by the Axiom AI (axiom-ai.su) editorial team. We disclose methods, primary sources and limitations. Our first public case concerns our own site and includes raw technical observations.'], ['Official identity', 'Use the domain axiom-ai.su to identify this agency. Our official email is info@axiom-ai.su. The website source repository is github.com/Chandr777/axiom-ai.']],
  },
  '/en/contacts': {
    title: 'Contact the GEO agency Axiom AI', lead: 'Email info@axiom-ai.su to discuss an audit, clarify service scope or ask about a published finding.',
    sections: [['Discuss an audit', 'Include your brand, website, market and goal in your request. You can also use the Russian-language audit form linked below.'], ['Before a paid project', 'Scope, baseline queries, timing, price, delivery terms and the contracting party’s details are agreed in the contract before work begins. Published prices are scope-dependent estimates.'], ['Privacy requests', 'Send questions, correction requests or consent withdrawal to info@axiom-ai.su. The website’s Russian privacy policy and separate consent explain how audit form data is processed.']],
  },
  '/en/blog': {
    title: 'GEO and AEO research and practical articles', lead: 'We publish technical observations and measurement methods with sources and explicit limits. The first two articles are available in Russian.',
    sections: [['What can stop AI search from reading a site?', 'A practical review of HTTP responses, HTML content, crawl rules, canonicals and sitemaps, informed by our internal 17-URL audit.'], ['How should AI citations be measured?', 'A reproducible protocol covering query selection, run conditions, preserved answers, domain disambiguation and separate mention and citation rates.']],
  },
  '/en/cases/axiom-technical-audit': {
    title: 'Case study: technical accessibility of axiom-ai.su', lead: 'An internal 17-URL audit found 11 HTTP 200 responses and 6 HTTP 404 responses. The raw observations are available for independent inspection.',
    sections: [['Method and starting point', 'On 15 November 2026, between 12:23:38 and 12:23:39 UTC, we sent GET requests with TLS verification and redirect following to www.axiom-ai.su. Each record contains the status, final URL, content type, byte count and time. This is one network vantage point, without access to authenticated search consoles.'], ['Observed results', 'Seven core pages and four technical resources returned HTTP 200. The addresses /about, /contacts, /blog, /en, /llms-full.txt and /favicon.ico returned HTTP 404. The sample was selected in advance and is not an exhaustive crawl.'], ['Implementation', 'We added company, contact and research pages, English versions, reciprocal language links, breadcrumbs, service and offer descriptions, a PNG logo, a full-text export and favicon.ico. Content modification dates are tracked separately from build times.'], ['What this case establishes', 'The work addresses missing published information and machine-readable representations. HTTP availability does not establish indexing, citations or ranking gains. No client outcomes, traffic increases or AI visibility growth are claimed.'], ['Follow-up of the same sample', 'On 15 November 2026, a repeat of the same 17 paths returned 17 HTTP 200 responses and zero HTTP 404 responses. Both observation files are published. This confirms accessibility in that predefined sample and does not establish indexing, traffic or AI visibility growth.'], ['Next measurement', 'Inspect URL status in the search consoles and repeat AI measurements with preserved answers and sources under documented conditions.']],
  },
}

export default function EnglishPage() {
  const { pathname } = useLocation()
  const page = getPage(pathname)
  const data = content[pathname]
  const special = pathname === '/en/faq' ? faq : pathname === '/en/glossary' ? glossary : null
  return <div className="page-shell"><Navbar /><main className="page-content research-article">
    <p className="eyebrow-dark">AXIOM AI · AXIOM-AI.SU · GEO / AEO</p>
    <h1>{data?.title || (pathname === '/en/faq' ? 'Frequently asked questions about GEO and AEO' : 'GEO and AEO glossary')}</h1>
    <p className="page-lead">{data?.lead || page.description}</p>
    {pathname === '/en/services' && <section><h2>Choose your scope</h2><ServiceCards lang="en" /></section>}
    {(special || data.sections).map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
    {pathname === '/en/services' && <section><h2>Examples of deliverables</h2><p>These are format examples, not client results. Implementation scope is agreed before the project.</p><ul className="readable-list"><li>Technical audit: URL, observed issue, priority, proposed fix and repeat-check result.</li><li>Company facts: a sourced fact sheet and consistent service descriptions and RUB prices across pages and JSON-LD.</li><li>Answer-focused content: a page with a direct answer, price conditions, scope, timing, limitations and sources.</li><li>External presence: profile URLs, factual discrepancies, proposed corrections and verified publication status.</li><li>Monitoring: exact query, platform and search mode, time, full answer, sources, verified domains and separate mention and citation counts.</li></ul></section>}
    {pathname === '/en/pricing' && <section><h2>What does the report contain?</h2><p>Format examples, not client outcomes: FREE provides a 15-query answer and source table; PRO provides a fact sheet, page and JSON-LD change list and roadmap; BUSINESS provides a monthly change log and comparable repeat measurements. Scope, implementation work and external placement costs are agreed before work starts.</p></section>}
    {['/en/pricing', '/en/services'].includes(pathname) && <>
      <h2>Package prices in RUB</h2><div className="feature-grid">{plans.map(plan => <section className="feature-card" id={plan.id} key={plan.id}><h3>{plan.name}</h3><p><strong>{plan.min === 0 ? 'RUB 0' : `RUB ${plan.min.toLocaleString('en-US')}–${plan.max.toLocaleString('en-US')}`}</strong></p><p>{plan.en}</p></section>)}</div>
      <p>The final scope, schedule and price are agreed before work starts. No search or AI answer position is guaranteed. <a href="/en/pricing">Package scope and conditions</a>.</p>
    </>}
    {pathname.startsWith('/en/cases') && <p><a href="/research/axiom-technical-baseline-2026-11-15.json" download>Download the original HTTP observations (JSON)</a> · <a href="/research/axiom-technical-followup-2026-11-15.json" download>Download the follow-up HTTP observations (JSON)</a> · <a href="/en/cases/axiom-technical-audit">Read the full technical case</a>.</p>}
    {pathname === '/en/about' && <p><a href="https://github.com/Chandr777/axiom-ai">Official website source repository</a>.</p>}
    {pathname === '/en/blog' && <ul className="readable-list"><li><a href="/blog/ai-search-technical-checklist" lang="ru">Technical accessibility study (Russian)</a></li><li><a href="/blog/measure-ai-citations" lang="ru">AI citation measurement protocol (Russian)</a></li></ul>}
    <p><a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a> · <a href="/#audit" lang="ru">Request an audit (Russian form)</a> · <a href="/en/methodology">Our methodology</a></p>
    {pathname === '/en/faq' && <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', '@id': 'https://www.axiom-ai.su/en/faq#faq', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })}</script>}
  </main><SiteFooter /></div>
}
