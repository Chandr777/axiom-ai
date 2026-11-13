# Search indexing

Canonical origin: `https://www.axiom-ai.su`.
Sitemap: `https://www.axiom-ai.su/sitemap.xml`.

`npm run build` prerenders the routes listed in `scripts/prerender.js` and
generates `dist/sitemap.xml` from the same list. Each `lastmod` is the latest
Git commit timestamp for the page and shared rendering sources. A rebuild of
the same commit keeps the same date. Source archives without Git history fall
back to source modification times; use a Git checkout for reliable dates.

The common social preview is `public/og-image.png` (1200 × 630 PNG).
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
