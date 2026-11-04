import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

const routes = [
  "app/page.tsx",
  "app/identity-lab/page.tsx",
  "app/about/page.tsx",
  "app/resources/page.tsx",
  "app/contact/page.tsx",
  "app/privacy-policy/page.tsx",
  "app/terms-and-conditions/page.tsx",
  "app/cookie-policy/page.tsx",
  "app/legal-note/page.tsx",
];

const read = (path) => readFileSync(join(root, path), "utf8");

test("creates the required public route files", () => {
  for (const route of routes) {
    assert.equal(existsSync(join(root, route)), true, `${route} should exist`);
  }
});

test("keeps the site grounded in the approved SparkLifeLab content", () => {
  const content = [read("app/page.tsx"), read("data/site.ts")].join("\n");
  assert.match(content, /SparkLifeLab/);
  assert.match(content, /Midlife Fog/);
  assert.match(content, /Midlife Clarity Check/);
  assert.match(content, /The Identity Lab/);
  assert.match(content, /Bärbel/);
  assert.match(content, /Gunther/);
  assert.match(content, /Scott/);
});

test("does not include unsupported social proof or fake claims", () => {
  const files = routes.map(read).join("\n");
  assert.doesNotMatch(files, /testimonial/i);
  assert.doesNotMatch(files, /press mention/i);
  assert.doesNotMatch(files, /certified/i);
  assert.doesNotMatch(files, /clinically proven/i);
});

test("has explicit legal, cookie, and consent integrations", () => {
  const layout = read("app/layout.tsx");
  const footer = [read("components/site-footer.tsx"), read("data/site.ts")].join("\n");
  const cookie = read("components/cookie-consent.tsx");
  const email = read("components/email-capture.tsx");

  assert.match(layout, /Organization/);
  assert.match(footer, /Privacy Policy/);
  assert.match(footer, /Terms & Conditions/);
  assert.match(footer, /Cookie Policy/);
  assert.match(footer, /Legal Note/);
  assert.match(footer, /Cookie preferences/);
  assert.match(cookie, /Essential only/);
  assert.match(cookie, /Manage preferences/);
  assert.doesNotMatch(cookie, /Accept all/);
  assert.match(cookie, /ACTIVE_OPTIONAL_COOKIE_CATEGORIES/);
  assert.match(cookie, /Privacy-friendly website analytics/);
  assert.doesNotMatch(cookie, /type="checkbox"/);
  assert.match(email, /consent/i);
  assert.match(email, /Privacy Policy/);
  assert.match(email, /Unsubscribe/);
});

test("uses the final production assets, locked homepage copy, and official LinkedIn link", () => {
  const header = read("components/site-header.tsx");
  const footer = read("components/site-footer.tsx");
  const cursor = read("components/ember-cursor.tsx");
  const clarity = read("components/clarity-check-card.tsx");
  const home = read("app/page.tsx");

  assert.equal(existsSync(join(root, "public/images/sparklifelab-wordmark.png")), true);
  assert.equal(existsSync(join(root, "public/images/sparklifelab-spark.png")), true);
  assert.equal(existsSync(join(root, "public/images/ID-Lab-section-on-Home-001.jpg")), true);
  assert.equal(existsSync(join(root, "public/images/Midlife-Clarity-Check-cover-V2.2.jpg")), true);
  assert.match(header, /sparklifelab-wordmark\.png/);
  assert.match(footer, /sparklifelab-wordmark\.png/);
  assert.match(cursor, /sparklifelab-spark\.png/);
  assert.match(cursor, /ember-trail-grad/);
  assert.match(clarity, /Midlife-Clarity-Check-cover-V2\.2\.jpg/);
  assert.match(home, /ID-Lab-section-on-Home-001\.jpg/);
  assert.match(home, /The Identity Lab helps you discover more about yourself/);
  assert.doesNotMatch(home, /Small cohorts\. See current dates and enrollment details\./);
  assert.match(home, /<strong>Identity Map<\/strong>/);
  assert.doesNotMatch(home, /Your guided first step into clarity/);
  assert.doesNotMatch(home, /Not a course\. Not coaching\./);
  assert.doesNotMatch(home, /Places are limited\. Applications are now open\./);
  assert.match(footer, /https:\/\/www\.linkedin\.com\/company\/sparklifelab\//);
  assert.match(footer, /Follow us on LinkedIn →/);
  assert.equal((footer.match(/target="_blank"/g) ?? []).length, 2);
});

test("enables Vercel Analytics against the canonical live domain", () => {
  const layout = read("app/layout.tsx");
  const site = read("data/site.ts");
  const cookiePolicy = read("app/cookie-policy/page.tsx");
  const legalPage = read("components/legal-page.tsx");

  assert.match(layout, /@vercel\/analytics\/next/);
  assert.match(layout, /<Analytics \/>/);
  assert.match(site, /https:\/\/www\.spark-life-lab\.com/);
  assert.match(cookiePolicy, /Vercel Web Analytics/);
  assert.match(cookiePolicy, /does not use cookies/);
  assert.match(cookiePolicy, /ckid/);
  assert.match(cookiePolicy, /persistent random identifier/);
  assert.match(cookiePolicy, /cksubscribed-/);
  assert.doesNotMatch(cookiePolicy, /Speed Insights|PROVISIONAL|TODO|replace this sentence/i);
  assert.doesNotMatch(legalPage, /TODO — Final legal copy required|structured placeholder/i);
  assert.doesNotMatch([layout, site].join("\n"), /vercel\.app/);
});

test("keeps the mobile homepage hero text before the image", () => {
  const styles = read("app/globals.css");

  assert.doesNotMatch(styles, /\.hero-image-wrap\s*{\s*order:\s*-1;/);
});

test("keeps the footer anchored cleanly at the bottom of short mobile pages", () => {
  const styles = read("app/globals.css");

  assert.match(styles, /html\s*{[^}]*background:\s*var\(--navy\);/s);
  assert.match(styles, /body\s*{[^}]*background:\s*var\(--navy\);/s);
  assert.match(styles, /main\s*{[^}]*background:\s*var\(--page-bg\);/s);
  assert.match(styles, /body\s*{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*min-height:\s*100dvh;/s);
  assert.match(styles, /main\s*{[^}]*flex:\s*1\s+0\s+auto;/s);
});

test("keeps the mobile navigation dropdown visible below the header", () => {
  const styles = read("app/globals.css");
  const header = read("components/site-header.tsx");

  assert.match(styles, /@media \(max-width: 900px\)[\s\S]*\.site-header\s*{[\s\S]*overflow:\s*visible;/);
  assert.match(styles, /\.mobile-nav-panel\s*{[\s\S]*top:\s*100%;/);
  assert.match(header, /onClick=\{\(\) => setMenuOpen\(\(o\) => !o\)\}/);
  assert.match(header, /onClick=\{\(\) => setMenuOpen\(false\)\}/);
});

test("uses the approved V2 homepage resolution block", () => {
  const home = read("app/page.tsx");

  assert.match(home, /The years ahead can be different\./);
  assert.doesNotMatch(home, /Ignite your best life/);
  assert.doesNotMatch(home, /No commitment\. Just clarity\./);
});

test("embeds the live Kit Midlife Clarity Check form in the existing card", () => {
  const card = read("components/clarity-check-card.tsx");
  const kitFormPath = "components/midlife-clarity-kit-form.tsx";
  const kitForm = existsSync(join(root, kitFormPath)) ? read(kitFormPath) : "";
  const componentSource = [card, kitForm].join("\n");
  const styles = read("app/globals.css");

  assert.match(card, /Get your free Midlife Clarity Check/);
  assert.match(card, /Free\. No spam\. Delivered to your inbox\. Unsubscribe at any time\./);
  assert.match(componentSource, /sll-midlife-kit-form/);
  assert.match(componentSource, /62b878a91d/);
  assert.match(componentSource, /https:\/\/sparklifelab\.kit\.com\/62b878a91d\/index\.js/);
  assert.match(componentSource, /First name/);
  assert.match(componentSource, /Email address/);
  assert.doesNotMatch(card, /clarity-form-input/);
  assert.doesNotMatch(card, /clarity-form-submit/);
  assert.match(styles, /\.sll-midlife-kit-form\s*{/);
  assert.match(styles, /\.sll-midlife-kit-form\s+\.formkit-fields/);
  assert.match(styles, /\.sll-midlife-kit-form\s+\.formkit-input/);
  assert.match(styles, /\.sll-midlife-kit-form\s+\.formkit-submit/);
  assert.match(styles, /\.sll-midlife-kit-form\s+\.formkit-submit > span\s*{[\s\S]*display:\s*block !important;/);
  assert.match(styles, /content:\s*"\\00a0→";/);
});

test("routes every Identity Lab CTA to the single status-driven action anchor", () => {
  const identityLab = read("app/identity-lab/page.tsx");
  const config = read("lib/identity-lab-config.ts");

  // One documented flag drives which conversion block renders and how CTAs read.
  assert.match(config, /export const identityLabStatus: IdentityLabStatus = "waitlist";/);
  assert.match(config, /IDENTITY_LAB_ACTION_ANCHOR = "identity-lab-action"/);
  assert.match(config, /identityLabStatus === "waitlist" \? "Join the waitlist →" : "Enroll now →"/);

  // The stable anchor is on the central block, regardless of which block is active.
  assert.match(identityLab, /id=\{IDENTITY_LAB_ACTION_ANCHOR\}/);

  // Hero, "What it is", and final "Ready to begin?" CTAs all point at that anchor
  // and carry the status-driven label — no hardcoded CTA text or destinations.
  assert.equal((identityLab.match(/href=\{IDENTITY_LAB_ACTION_HREF\}/g) ?? []).length, 3);
  assert.equal((identityLab.match(/\{IDENTITY_LAB_CTA_LABEL\}/g) ?? []).length, 3);
  assert.doesNotMatch(identityLab, /Join the Identity Lab →/);

  // Only the active block is rendered — never both with one hidden by CSS.
  assert.match(
    identityLab,
    /identityLabStatus === "waitlist" \? \(\s*<IdentityLabWaitlist \/>\s*\) : \(\s*<IdentityLabEnrollmentOpen \/>\s*\)/,
  );
  assert.doesNotMatch(identityLab, /https?:\/\/[^\s"']*kajabi/i);
});

test("keeps both Identity Lab conversion blocks available and correctly scoped", () => {
  const waitlistBlock = read("components/identity-lab-waitlist.tsx");
  const enrollmentBlock = read("components/identity-lab-enrollment-open.tsx");

  // Block B reuses the existing Kit form rather than creating a new one.
  assert.match(waitlistBlock, /IdentityWaitlistKitForm/);
  assert.match(waitlistBlock, /Join the waitlist/);
  assert.match(waitlistBlock, /Access to all course materials/);
  assert.match(waitlistBlock, /Not ready yet\? Start with the Midlife Clarity Check →/);
  // Pre-launch must not show price, and the summary must not promise recordings.
  assert.doesNotMatch(waitlistBlock, /\$\d/);
  assert.doesNotMatch(waitlistBlock, /recording/i);

  // Block A stays ready in the codebase at the approved price.
  assert.match(enrollmentBlock, /\$595/);
  assert.match(enrollmentBlock, /Enroll now →/);
  assert.match(enrollmentBlock, /Access to all course materials/);
  assert.doesNotMatch(enrollmentBlock, /materials and recordings/i);
});

test("keeps the Identity Lab waitlist page hidden and Kit-powered", () => {
  const waitlistPath = "app/identity-lab/waitlist/page.tsx";
  const kitFormPath = "components/identity-waitlist-kit-form.tsx";
  assert.equal(existsSync(join(root, waitlistPath)), true, `${waitlistPath} should exist`);
  assert.equal(existsSync(join(root, kitFormPath)), true, `${kitFormPath} should exist`);

  const waitlist = read(waitlistPath);
  const kitForm = read(kitFormPath);
  const styles = read("app/globals.css");
  const navigation = [
    read("components/site-header.tsx"),
    read("components/site-footer.tsx"),
    read("data/site.ts"),
  ].join("\n");

  assert.match(waitlist, /IDENTITY LAB/);
  assert.match(waitlist, /Join the waitlist for the next Identity Lab cohort/);
  assert.match(waitlist, /The Identity Lab is a guided journey for people in midlife who are ready to move from fog to grounded forward movement\./);
  assert.match(waitlist, /Registration is currently closed\. If you’d like to be the first to know when the next enrollment opens, join the waitlist below\./);
  assert.match(waitlist, /Add your name and email, and we’ll let you know as soon as registration opens again\./);
  assert.match(waitlist, /We’ll only email you about the Identity Lab and related updates\. No spam\./);
  assert.match(waitlist, /Not ready yet\? Start with the Midlife Clarity Check →/);
  assert.match(waitlist, /href="\/#clarity-check"/);
  assert.doesNotMatch(waitlist, /next\/image/);
  assert.doesNotMatch(navigation, /\/identity-lab\/waitlist\//);
  assert.match(kitForm, /sll-identity-waitlist-kit-form/);
  assert.match(kitForm, /fed36a3d05/);
  assert.match(kitForm, /https:\/\/sparklifelab\.kit\.com\/fed36a3d05\/index\.js/);
  assert.match(styles, /\.sll-identity-waitlist-kit-form\s*{/);
  assert.match(styles, /\.sll-identity-waitlist-kit-form\s+\.formkit-fields/);
  assert.match(styles, /\.sll-identity-waitlist-kit-form\s+\.formkit-input/);
  assert.match(styles, /\.sll-identity-waitlist-kit-form\s+\.formkit-submit/);
  assert.match(read("components/midlife-clarity-kit-form.tsx"), /62b878a91d/);
  assert.doesNotMatch(kitForm, /62b878a91d/);
  // Kept out of the index via the shared pageMetadata() helper in lib/seo.ts.
  assert.match(waitlist, /noindex:\s*true/);
});

test("publishes canonical metadata and only indexable sitemap routes", () => {
  const canonicalRoutes = new Map([
    ["app/page.tsx", "/"],
    ["app/about/page.tsx", "/about/"],
    ["app/identity-lab/page.tsx", "/identity-lab/"],
    ["app/contact/page.tsx", "/contact/"],
    ["app/resources/page.tsx", "/resources/"],
    ["app/privacy-policy/page.tsx", "/privacy-policy/"],
    ["app/terms-and-conditions/page.tsx", "/terms-and-conditions/"],
    ["app/cookie-policy/page.tsx", "/cookie-policy/"],
    ["app/legal-note/page.tsx", "/legal-note/"],
    ["app/identity-lab/waitlist/page.tsx", "/identity-lab/waitlist/"],
  ]);

  // Canonicals are declared as the `path` argument to pageMetadata() (lib/seo.ts),
  // which feeds both alternates.canonical and og:url.
  for (const [route, canonical] of canonicalRoutes) {
    const escaped = canonical.replaceAll("/", "\\/");
    assert.match(
      read(route),
      new RegExp(`(?:canonical|path): ["']${escaped}["']`),
      `${route} should declare canonical ${canonical}`
    );
  }

  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /path:\s*"\/"/);
  assert.match(sitemap, /path:\s*"\/cookie-policy\/"/);
  assert.doesNotMatch(sitemap, /path:\s*"\/legal-note\/"/);
  assert.doesNotMatch(sitemap, /path:\s*"\/identity-lab\/waitlist\/"/);
  // The essay library is still a placeholder and stays noindex until published.
  assert.doesNotMatch(sitemap, /path:\s*"\/resources\/"/);
  assert.doesNotMatch(sitemap, /vercel\.app/);

  const robots = read("app/robots.ts");
  assert.match(robots, /allow:\s*"\/"/);
  assert.match(robots, /sitemap:\s*`\$\{site\.url\}\/sitemap\.xml`/);
});

test("keeps the preference center accessible and reopenable", () => {
  const cookie = read("components/cookie-consent.tsx");
  const footer = read("components/site-footer.tsx");

  assert.match(cookie, /role="dialog"/);
  assert.match(cookie, /aria-modal="true"/);
  assert.match(cookie, /event\.key === "Escape"/);
  assert.match(cookie, /event\.key !== "Tab"/);
  assert.match(cookie, /returnFocusRef/);
  assert.match(cookie, /document\.body\.style\.overflow = "hidden"/);
  assert.match(cookie, /role="status"/);
  assert.match(cookie, /aria-live="polite"/);
  assert.match(cookie, /Your privacy preferences have been saved/);
  assert.match(footer, /sparklifelab:open-cookie-preferences/);
});
