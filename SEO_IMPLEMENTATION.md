# SEO/GEO implementation, 15 November 2026

Site: https://www.axiom-ai.su/ (apex redirects to www).

Implemented: distinctive brand/domain description; full-text export;
11 English counterparts with reciprocal hreflang; Organization with a stable
entity ID, official source link and PNG wordmark; visible and structured
breadcrumbs; Service/Offer with the published RUB ranges; company/contact
pages; two sourced articles and BlogPosting; a real internal technical case
with 17 downloadable HTTP observations; stable per-page content dates; a
descriptive pricing H1 and question H2s in FAQ; ICO favicon. All 27 routes are
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
to sameAs. Third-party profiles and articles remain pending until their actual
public URLs have been verified.
