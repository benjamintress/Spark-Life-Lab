# Technical SEO & Search Console

Reference for how search discovery is wired on this site, and the manual steps
that can only be completed from a Google/Bing account.

## Canonical domain

`https://sparklifelab.com` (no www, no hyphens) — since 28 Nov 2026; defined once
in `data/site.ts` (`site.url`) and consumed by `metadataBase`, the sitemap,
robots.txt, Open Graph URLs and all structured data. Email addresses stay on
`@spark-life-lab.com` until the separate Zoho mail migration.

Redirects are configured in Vercel (Domains), not in this repo. Each keeps the
path and query string:

| From | Result |
| --- | --- |
| `https://www.sparklifelab.com/…` | 308 → `https://sparklifelab.com/…` |
| `https://spark-life-lab.com/…` | 308 → `https://sparklifelab.com/…` |
| `https://www.spark-life-lab.com/…` | 308 → `https://sparklifelab.com/…` |

Previous canonical domain (until 28 Nov 2026): `https://www.spark-life-lab.com`.

`trailingSlash: true` (`next.config.ts`) — every canonical URL ends in `/`.

## Where metadata comes from

`lib/seo.ts` exports `pageMetadata()`. Every route builds its metadata through
it. This exists because **Next.js replaces, rather than deep-merges, the
`openGraph` and `twitter` objects** when a page declares its own — a page that
sets `openGraph` by hand silently drops `og:url`, `og:type`, `og:site_name` and
`og:image` inherited from the root layout.

Two rules worth remembering:

- `title` passed to `pageMetadata()` is the **short** page name. The root layout
  template (`%s | SparkLifeLab`) appends the brand exactly once. Do not include
  "SparkLifeLab" in a page title, or it renders twice.
- `app/page.tsx` is the exception: it sits in the root segment, where the
  template does not apply, so it carries the full title verbatim.

## Indexability

| Route | Indexed | In sitemap | Why |
| --- | --- | --- | --- |
| `/` | yes | yes | |
| `/identity-lab/` | yes | yes | |
| `/about/` | yes | yes | |
| `/contact/` | yes | yes | |
| `/privacy-policy/` | yes | yes | |
| `/terms-and-conditions/` | yes | yes | |
| `/cookie-policy/` | yes | yes | |
| `/resources/` | **no** | no | Placeholder; noindex until real essays ship |
| `/identity-lab/waitlist/` | **no** | no | Conversion-only route |
| `/legal-note/` | **no** | no | Pre-existing decision |
| `/impressum/`, `/clarity-check/`, `/terms-of-use/` | n/a | no | 308 redirects |

`robots.txt` deliberately stays `Allow: /` — adding a `Disallow` for a noindexed
route would stop crawlers reading the `noindex` tag that keeps it out of the
index. `tests/seo.test.mjs` enforces this, plus the sitemap ↔ noindex invariant.

`lastModified` in `app/sitemap.ts` is a hardcoded per-route date reflecting when
that page's content actually last changed. It is **not** `new Date()`: a build
timestamp tells Google every page changed on every deploy, and Google then
ignores the field. Update the date on a row when you change that page.

## Social preview image

Set in one place — `socialImage` in `lib/seo.ts`. It currently points at
`/images/identity-lab-ready-client.jpeg` (1714×918, ~1.87:1), an existing
approved photograph.

**Recommended replacement:** a purpose-built card at **1200×630** (1.91:1), JPG
or PNG, under ~1 MB, showing the SparkLifeLab wordmark and tagline over an
approved photograph, with any text inside the middle 80% so LinkedIn's crop does
not clip it. Drop it in `public/images/` and update `socialImage` — no other
change needed.

## Search Console — manual steps

Nothing in this repo can verify the property or submit the sitemap; both require
an authenticated Google account.

**1. Verify ownership.** The code side is already wired. In Google Search
Console choose the *URL prefix* property `https://sparklifelab.com`, pick
the **HTML tag** method, and copy the token out of the
`<meta name="google-site-verification" content="TOKEN">` snippet. Then:

```bash
vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION production
```

Redeploy, confirm the tag is present, then press **Verify**.

The tag is absent from the rendered `<head>` until that variable is set, so no
placeholder token ever ships. Bing works the same way via
`NEXT_PUBLIC_BING_SITE_VERIFICATION` (emits `msvalidate.01`).

A *Domain* property (DNS TXT record at the registrar) also works and needs no
code change — it additionally covers the non-www host and `http://`.

**2. Submit the sitemap.** Search Console → Sitemaps → enter `sitemap.xml`.
Full URL: `https://sparklifelab.com/sitemap.xml`

**3. Request indexing** for `/` and `/identity-lab/` via URL Inspection.

**4. Bing Webmaster Tools** can import the verified Google property directly,
which is faster than verifying again.

**5. Domain move (28 Nov 2026).** Verify the new property, then in the *old*
property (`spark-life-lab.com`) use Settings → **Change of address** → new site
`https://sparklifelab.com`. Bing has the equivalent *Site Move* tool. Keep the
old domain and its 308 redirects in place for at least 12 months.

## Validating changes

```bash
npm run lint && npm run build && npm test
```

Then check rendered output rather than source — `curl` the built site and
inspect `<head>`. Useful external validators once deployed: Google Rich Results
Test (structured data), Facebook Sharing Debugger and LinkedIn Post Inspector
(both cache aggressively — re-scrape after changing `og:image`).
