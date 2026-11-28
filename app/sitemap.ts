import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

// Only publicly indexable routes belong here. Deliberately excluded:
//   /identity-lab/waitlist/  — conversion-only, noindex
//   /legal-note/             — noindex
//   /resources/              — noindex until the essay library is published
//   /impressum/, /clarity-check/, /terms-of-use/ — 308 redirects
//
// `lastModified` is the date each route's content last actually changed in
// git, not the build timestamp. A build-time `new Date()` tells Google every
// page changed on every deploy, which is untrue and causes lastmod to be
// ignored. Update the date on a row when that page's content changes.

const indexablePages: Array<{
  path: string;
  lastModified: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", lastModified: "2026-11-25", priority: 1.0, changeFrequency: "monthly" },
  { path: "/identity-lab/", lastModified: "2026-11-24", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about/", lastModified: "2026-11-28", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact/", lastModified: "2026-07-19", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy-policy/", lastModified: "2026-07-19", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions/", lastModified: "2026-07-19", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy/", lastModified: "2026-07-19", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.map((page) => ({
    url: `${site.url}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
