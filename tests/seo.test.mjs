import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf-8");

const CANONICAL_ORIGIN = "https://sparklifelab.com";

// ─── Route discovery ─────────────────────────────────────────────────────────
// Walk the App Router instead of hardcoding a list, so a new page cannot be
// added without these invariants applying to it.

function findPageFiles(dir = "app", acc = []) {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) findPageFiles(rel, acc);
    else if (entry.name === "page.tsx") acc.push(rel);
  }
  return acc;
}

function routeOf(pageFile) {
  const segments = pageFile.replace(/^app/, "").replace(/\/page\.tsx$/, "");
  return segments === "" ? "/" : `${segments}/`;
}

const pages = findPageFiles().map((file) => {
  const source = read(file);
  return {
    file,
    route: routeOf(file),
    source,
    isRedirect: /permanentRedirect\(|redirect\(/.test(source),
    noindex: /noindex:\s*true/.test(source) || /index:\s*false/.test(source),
  };
});

const contentPages = pages.filter((p) => !p.isRedirect);

// Paths declared in app/sitemap.ts.
const sitemapSource = read("app/sitemap.ts");
const sitemapPaths = [...sitemapSource.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);

// ─── Sitemap ─────────────────────────────────────────────────────────────────

test("sitemap includes the homepage", () => {
  assert.ok(sitemapPaths.includes("/"), "sitemap must list the homepage");
});

test("sitemap includes every indexable content route", () => {
  for (const page of contentPages.filter((p) => !p.noindex)) {
    assert.ok(
      sitemapPaths.includes(page.route),
      `${page.route} is indexable but missing from sitemap.ts`
    );
  }
});

test("sitemap excludes every noindexed route", () => {
  for (const page of contentPages.filter((p) => p.noindex)) {
    assert.ok(
      !sitemapPaths.includes(page.route),
      `${page.route} is noindex and must not appear in sitemap.ts`
    );
  }
});

test("sitemap excludes redirect-only routes", () => {
  for (const page of pages.filter((p) => p.isRedirect)) {
    assert.ok(
      !sitemapPaths.includes(page.route),
      `${page.route} only redirects and must not appear in sitemap.ts`
    );
  }
});

test("every sitemap entry maps to a real route", () => {
  const realRoutes = new Set(contentPages.map((p) => p.route));
  for (const path of sitemapPaths) {
    assert.ok(realRoutes.has(path), `sitemap lists ${path}, which has no page.tsx`);
  }
});

test("sitemap uses honest lastModified dates, not the build timestamp", () => {
  assert.doesNotMatch(
    sitemapSource,
    /lastModified:\s*new Date\(\)/,
    "lastModified must not be the build time — it would claim every page changed on every deploy"
  );
  const dates = [...sitemapSource.matchAll(/lastModified:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.equal(dates.length, sitemapPaths.length, "every sitemap row needs a lastModified");
  for (const d of dates) {
    assert.match(d, /^\d{4}-\d{2}-\d{2}$/, `"${d}" is not an ISO date`);
    assert.ok(!Number.isNaN(Date.parse(d)), `"${d}" is not a valid date`);
  }
});

// ─── Robots ──────────────────────────────────────────────────────────────────

test("robots.txt points at the canonical sitemap and allows crawling", () => {
  const robots = read("app/robots.ts");
  assert.match(robots, /sitemap:\s*`\$\{site\.url\}\/sitemap\.xml`/);
  assert.match(robots, /allow:\s*"\/"/);
});

test("robots.txt does not disallow routes that rely on a noindex tag", () => {
  // A robots.txt Disallow would stop crawlers reading the noindex directive,
  // which is the only thing keeping these routes out of the index.
  const robots = read("app/robots.ts");
  for (const page of contentPages.filter((p) => p.noindex)) {
    assert.ok(
      !robots.includes(page.route),
      `${page.route} must stay crawlable so its noindex tag is seen`
    );
  }
});

// ─── Canonical domain ────────────────────────────────────────────────────────

test("metadataBase and site.url use the canonical www origin over https", () => {
  assert.match(read("data/site.ts"), new RegExp(`url:\\s*"${CANONICAL_ORIGIN}"`));
  assert.match(read("app/layout.tsx"), /metadataBase:\s*new URL\(site\.url\)/);
});

test("no preview, localhost, or non-www domain leaks into SEO surfaces", () => {
  const files = [
    "app/layout.tsx",
    "app/sitemap.ts",
    "app/robots.ts",
    "app/manifest.ts",
    "lib/seo.ts",
    "data/site.ts",
    ...contentPages.map((p) => p.file),
  ];
  for (const file of files) {
    const source = read(file);
    assert.doesNotMatch(source, /vercel\.app/, `${file} references a Vercel preview domain`);
    assert.doesNotMatch(source, /localhost/, `${file} references localhost`);
    assert.doesNotMatch(
      source,
      /https:\/\/(www\.)?spark-life-lab\.com|https:\/\/www\.sparklifelab\.com/,
      `${file} uses a redirecting domain instead of ${CANONICAL_ORIGIN}`
    );
  }
});

// ─── Per-page metadata ───────────────────────────────────────────────────────

test("every content page exports a title, description, and canonical", () => {
  for (const page of contentPages) {
    assert.match(page.source, /export const metadata/, `${page.file} exports no metadata`);
    assert.match(page.source, /title:\s*"/, `${page.file} has no title`);
    assert.match(page.source, /description:\s*\n?\s*"/, `${page.file} has no description`);
    const canonical =
      page.source.match(/path:\s*"([^"]+)"/)?.[1] ??
      page.source.match(/canonical:\s*"([^"]+)"/)?.[1];
    assert.equal(
      canonical,
      page.route,
      `${page.file} declares canonical ${canonical}, expected ${page.route}`
    );
  }
});

test("page titles do not repeat the brand the layout template already appends", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /template:\s*"%s \| SparkLifeLab"/);

  // app/page.tsx is in the root segment, so the template does not apply to it
  // and it legitimately carries the full brand name.
  for (const page of contentPages.filter((p) => p.route !== "/")) {
    const title = page.source.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
    assert.ok(
      !/SparkLifeLab/.test(title),
      `${page.file} title "${title}" would render as "${title} | SparkLifeLab"`
    );
  }
});

test("conversion and placeholder routes keep their noindex state", () => {
  const expectNoindex = ["/identity-lab/waitlist/", "/legal-note/", "/resources/"];
  for (const route of expectNoindex) {
    const page = contentPages.find((p) => p.route === route);
    assert.ok(page, `${route} should exist`);
    assert.ok(page.noindex, `${route} must stay noindex`);
  }
});

test("the Identity Lab and homepage stay indexable", () => {
  for (const route of ["/", "/identity-lab/", "/about/", "/contact/"]) {
    const page = contentPages.find((p) => p.route === route);
    assert.ok(page, `${route} should exist`);
    assert.ok(!page.noindex, `${route} must remain indexable`);
  }
});

// ─── Social preview ──────────────────────────────────────────────────────────

test("the Open Graph image is an existing asset with declared dimensions", () => {
  const seo = read("lib/seo.ts");
  const url = seo.match(/url:\s*"([^"]+)"/)?.[1];
  assert.ok(url?.startsWith("/"), "socialImage.url must be a root-relative path");
  assert.ok(
    existsSync(join(root, "public", url)),
    `Open Graph image ${url} is missing from /public`
  );
  assert.match(seo, /width:\s*\d+/);
  assert.match(seo, /height:\s*\d+/);
  assert.match(seo, /alt:\s*"/);
});

test("every page builds Open Graph and Twitter tags through the shared helper", () => {
  // Next.js replaces rather than merges these objects, so a page declaring its
  // own openGraph without the helper silently loses og:url/og:image.
  for (const page of contentPages) {
    assert.match(
      page.source,
      /pageMetadata\(\{/,
      `${page.file} must build metadata via pageMetadata() to keep og:url and og:image`
    );
  }
  const seo = read("lib/seo.ts");
  for (const field of ["og", "url", "siteName", "locale", "images", "card"]) {
    assert.ok(seo.includes(field), `lib/seo.ts should set ${field}`);
  }
});

// ─── Structured data ─────────────────────────────────────────────────────────

test("layout structured data is serialized as valid JSON-LD", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /"@context":\s*"https:\/\/schema\.org"/);
  assert.match(layout, /"@type":\s*"Organization"/);
  assert.match(layout, /"@type":\s*"WebSite"/);
  assert.match(layout, /JSON\.stringify\(organizationJsonLd\)/);
  assert.match(layout, /JSON\.stringify\(websiteJsonLd\)/);
});

test("structured data claims nothing Google requires evidence for", () => {
  const layout = read("app/layout.tsx");
  // Match schema keys only — the prose description legitimately contains words
  // like "offers", which must not trip this check.
  for (const forbidden of ["aggregateRating", "review", "ratingValue", "priceRange", "offers"]) {
    assert.doesNotMatch(
      layout,
      new RegExp(`["']?${forbidden}["']?\\s*:`),
      `Organization schema must not claim ${forbidden} without verifiable data`
    );
  }
});

test("search-engine verification is env-driven, with no token committed", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION/);
  assert.doesNotMatch(
    layout,
    /google:\s*"[A-Za-z0-9_-]{20,}"/,
    "a verification token must come from the environment, not the source"
  );
});
