# SEO/GEO implementation, 15 November 2026

Site: https://www.axiom-ai.su/ (apex redirects to www).

Implemented: distinctive brand/domain description; full-text export;
15 English counterparts with reciprocal hreflang; Organization with a stable
entity ID and PNG wordmark; visible and structured
breadcrumbs; Service/Offer with the published RUB ranges; company/contact
pages; two sourced articles and BlogPosting; a real internal technical case
with 17 downloadable HTTP observations; stable per-page content dates; a
descriptive pricing H1 and question H2s in FAQ; ICO favicon. All registered routes are
prerendered and hydrated from their own HTML.

Company identity is intentionally limited to confirmed public facts. legalName,
postal address, tax IDs, founder and named expert biographies require the site
owner's verified information. Do not infer a contracting entity or founder
from the GitHub account, deployment creator or account email. Add confirmed
facts visibly to `/about`, `/contacts`, `/privacy`, `/consent` and the matching
Organization data in `src/SiteSEO.jsx`; update English counterparts too.

The first case documents technical accessibility, not client results or a rise
in rankings. The baseline was observed before implementation. No production
indexing, citations, external profiles or editorial placements are asserted
without evidence. Search console submissions require authenticated account
access. IndexNow submission is a distinct step after release.

Validate with `npm ci`, `npm run build`, `npm run lint`, static HTML/link/schema
checks and Chromium checks. Vite's default SPA preview can serve the homepage
for extensionless directory routes; test each route's actual generated HTML or
the deployed Vercel URL rather than treating that fallback as correct output.

For external authority, publish the source-backed research under the same
brand/domain identity. Prepare a genuine company profile on relevant platforms;
confirm platform eligibility and editorial terms. Obtain acceptance before
claiming inclusion in a directory. Do not buy reviews or add competitor URLs
to sameAs. The source repository remains an ordinary link; Organization sameAs
is omitted until official profiles identifying the organization are confirmed. Third-party profiles and articles remain pending until their actual
public URLs have been verified.

The research page `/research/ai-visibility-pilot` publishes a fixed six-query,
three-platform, two-repeat protocol and the initial 12 ChatGPT Search answers.
Branded queries are reported separately. Yandex search CAPTCHA and Perplexity
registration requirements leave 24 planned observations unexecuted and excluded
from denominators. Raw answers are generated observations, not verified company
facts; domain links do not prove content retrieval. Source URL HTTP checks
and access limitations are downloadable alongside the answers.

Four substantive service pages and four English counterparts now cover GEO
audit, GEO implementation, AEO content and AI visibility monitoring. Each has
self-canonical metadata, reciprocal language links, Service/FAQPage/BreadcrumbList,
scope, deliverables, sample downloads, conditions and contextual enquiries.
The published package ranges are not presented as invented standalone prices.
Navigation adapts with CSS before hydration; company/contact/research and service
links are available throughout the site.
