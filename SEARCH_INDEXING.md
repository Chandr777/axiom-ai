# Search indexing

Canonical origin: `https://www.axiom-ai.su`.
Sitemap: `https://www.axiom-ai.su/sitemap.xml`.

`npm run build` prerenders the 28 routes in `src/siteData.js`, generates
`dist/sitemap.xml` and exports the rendered main content to `dist/llms-full.txt`.
Russian and English equivalents have reciprocal ru/en/x-default links in HTML
and in the sitemap. Articles without a translation do not declare one.

`content-dates.json` records a content hash and the actual modification date
for each page. After editing page content or metadata, run
`npm run content:dates` and commit the changed manifest. Unchanged page hashes
retain their dates. Builds validate hashes and never substitute deployment or
checkout times. The initial dates of unchanged existing page content come from
its Git history; new and edited pages use the update time. Shared navigation
or build tooling alone does not reset every page's content date. If a shared
component makes a substantive page-content change, include it in that page's
`sources` in `src/siteData.js` before updating the manifest.

The common social preview is `public/og-image.png` (1200 × 630 PNG).
`public/logo.png` is the 512 × 512 Axiom AI wordmark used by Organization.
Open Graph and Twitter image metadata are present in every prerendered page.

After a successful deployment, run `npm run indexnow`. The script checks the
published key file, reads the live sitemap, and submits its canonical URLs to
`https://api.indexnow.org/indexnow`. Participating engines include Bing and
Yandex. HTTP 200 means accepted; HTTP 202 means key validation is pending.
Neither response guarantees indexing. IndexNow does not submit to Google.
The IndexNow key is intentionally public and is not an account credential.

Account access is separately required to verify ownership, submit the sitemap
inside Yandex Webmaster / Google Search Console / Bing Webmaster, and request
Yandex recrawling / Google Request Indexing. Keep both existing Yandex meta
tags until the active account's verification code is confirmed in Webmaster;
then remove only the other meta tag from `index.html`.

Do not claim that a public `site:` query proves zero indexed pages. Verify
URL coverage and canonical selection in the authenticated consoles. HTTP 200,
sitemap availability and an accepted IndexNow request are separate observations
from index inclusion or AI citations. Do not use Google's Indexing API for
ordinary agency/service pages; submit the sitemap and use URL Inspection.

After a release, submit `https://www.axiom-ai.su/sitemap.xml` in Yandex Webmaster,
Bing Webmaster Tools and Google Search Console. Request checks for `/`,
`/services`, `/pricing`, `/about`, `/contacts`, `/cases/axiom-technical-audit`,
the two `/blog/` articles and `/en`. Inspect the selected canonical and any
crawl/index exclusion reason. Keep account credentials out of the repository.
