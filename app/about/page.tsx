import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { SECTION_1 } from "@/components/our-story/content";
import { ExperiencePanels } from "@/components/our-story/experience-panels";
import { ExperiencePath } from "@/components/our-story/experience-path";
import { ExperienceR4 } from "@/components/our-story/experience-r4";
import { FounderProfiles } from "@/components/our-story/founder-profiles";
import { FoundersCta } from "@/components/our-story/founders-cta";
import { NextStep } from "@/components/our-story/next-step";
import { Perspective } from "@/components/our-story/perspective";
import { FounderCollage, FounderCollageR3, FounderPhotoRow } from "@/components/our-story/founder-collage";
import { pageMetadata } from "@/lib/seo";
import "./our-story.css"; // Page-scoped styles (.os1, .os2, .os-ph) — no other page is affected.

// ─── Our Story page — V2 (local revision, 23 Nov 2026) ───────────────────────
// Source of truth: "SparkLifeLab – Website V2 – Our Story – Revision & Claude Brief" (Google Doc).
//
//   1 Why we created SparkLifeLab        — LOCKED copy · compact three-photo founder collage
//   2 More than 70 years of experience   — LOCKED copy · four accessible disclosure panels
//   3 Meet the founders                  — PLACEHOLDER (copy to be developed and approved)
//   4 Our perspective on midlife         — PLACEHOLDER (copy to be developed and approved)
//   5 Final call to action               — PLACEHOLDER (copy and destination to be approved)
//
// Locked copy lives in components/our-story/content.ts and is guarded by tests/our-story.test.mjs.
//
// Review versions are kept side by side (23 Nov 2026). Switch with PAGE_VERSION:
//   "r15" — as r14, with the founder photos of Bärbel and Gunther in Section 1 (1:2 full-length frames)
//   "r14" — as r13, with the four Section 2 illustrations (chairs · notebook · staircase · drawn diagram)
//   "r13" — final editorial refinements (25 Nov 2026): S1 questions + photo row, S2 intro/areas/visuals,
//           S3 captions, S4 heading, S5 mid-navy field — see docs/our-story-v2/STATUS.md
//   "r12" — as r11, plus Section 5 "Your next step" (next-step.tsx); no placeholders left
//   "r11" — as r6 (incl. the 24 Nov photo of Bärbel), plus Section 4 "What we believe about midlife" (perspective.tsx)
//           — review "Revision 8"; preview file Our-Story-V2-preview-r11.html (r7–r10 were Section 3 photo rounds)
//   "r6" — as r5, with the one-line Section 3 heading and the contextual CTA after the profiles
//   "r5" — as r4, plus the completed Section 3 "Meet the founders" (founder-profiles.tsx)
//   "r4" — S1 rectangular portrait cluster + brand spark; S2 straight-line navigation (experience-r4.tsx)
//   "r3" — S1 round connected portraits;                 S2 winding path with landscapes (experience-path.tsx)
//   "r2" — S1 round connected portraits;                 S2 four selector cards (experience-panels.tsx)
const PAGE_VERSION = "r15" as "r15" | "r14" | "r13" | "r12" | "r11" | "r6" | "r5" | "r4" | "r3" | "r2";
const LATEST = PAGE_VERSION === "r15" || PAGE_VERSION === "r14" || PAGE_VERSION === "r13" || PAGE_VERSION === "r12" || PAGE_VERSION === "r11" || PAGE_VERSION === "r6" || PAGE_VERSION === "r5" || PAGE_VERSION === "r4"; // r5 keeps Sections 1–2 of r4 unchanged

// NOTE: metadata below is unchanged from V1 and still describes the previous page copy — to be
// revised once the new page copy is complete.
export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "SparkLifeLab began with a quiet question many people reach in midlife. Meet the three co-founders — Bärbel, Gunther, and Scott — and why they built the kind of space they themselves needed.",
  path: "/about/",
  ogTitle: "Our Story — SparkLifeLab",
  ogDescription:
    "Three fellow travellers who built SparkLifeLab because something like it didn't exist when they needed it.",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd page="Our Story" href="/about/" />
      <main className="os-page">
        {/* ─── SECTION 1 — WHY WE CREATED SPARKLIFELAB (locked copy) ─── */}
        <section className="os1" aria-labelledby="os1-title">
          <div className="os1-grid">
            <div className="os1-copy">
              <p className="eyebrow">{SECTION_1.eyebrow}</p>
              <h1 id="os1-title">{SECTION_1.headline}</h1>
              <p className="os1-intro">{SECTION_1.intro}</p>
              <ul className="os1-questions">
                {SECTION_1.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              {SECTION_1.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={PAGE_VERSION === "r15" || PAGE_VERSION === "r14" || PAGE_VERSION === "r13" ? "os1-media os1-media--row" : "os1-media"}>
              {PAGE_VERSION === "r15" || PAGE_VERSION === "r14" || PAGE_VERSION === "r13" ? <FounderPhotoRow /> : LATEST ? <FounderCollage /> : <FounderCollageR3 />}
            </div>
          </div>
        </section>

        {/* ─── SECTION 2 — 70 YEARS OF EXPERIENCE (locked copy) ─── */}
        {LATEST ? <ExperienceR4 /> : PAGE_VERSION === "r3" ? <ExperiencePath /> : <ExperiencePanels />}

        {/* ─── SECTION 3 — MEET THE FOUNDERS ─── */}
        {PAGE_VERSION === "r15" || PAGE_VERSION === "r14" || PAGE_VERSION === "r13" || PAGE_VERSION === "r12" || PAGE_VERSION === "r11" || PAGE_VERSION === "r6" ? (
          <>
            <FounderProfiles variant="r6" />
            <FoundersCta />
          </>
        ) : PAGE_VERSION === "r5" ? (
          <FounderProfiles />
        ) : (
        <section className="os-ph os-ph--founders" aria-labelledby="os3-title">
          <div className="os-ph-inner">
            <p className="os-ph-flag">Placeholder · Section 3 · copy to be developed and approved</p>
            <h2 id="os3-title">Meet the founders</h2>
            <p className="os-ph-note">
              Purpose: introduce Bärbel, Gunther and Scott individually — personal perspective,
              distinctive strengths and relevant credibility, without repeating Sections 1 or 2.
              Larger, distinct environmental portraits (different from the Section 1 collage).
            </p>
            <ul className="os3-portraits" aria-label="Portrait slots for the founder introductions">
              <li className="os3-slot os3-slot--empty">
                <div className="os3-slot-frame">
                  <span>Environmental portrait of Bärbel needed</span>
                </div>
                <p>Bärbel</p>
              </li>
              <li className="os3-slot">
                <div className="os3-slot-frame">
                  <Image
                    src="/images/identity-lab-v2/founder-gunther-monterey.jpg"
                    alt="Gunther Tress, smiling with his chin resting on his hand, in front of a weathered wooden door."
                    width={1071}
                    height={1468}
                    sizes="(max-width: 700px) 90vw, 340px"
                  />
                </div>
                <p>Gunther <span className="os3-slot-hint">(provisional — also used on the Identity Lab page)</span></p>
              </li>
              <li className="os3-slot os3-slot--empty">
                <div className="os3-slot-frame">
                  <span>Environmental portrait of Scott needed</span>
                </div>
                <p>Scott</p>
              </li>
            </ul>
          </div>
        </section>
        )}

        {/* ─── SECTION 4 — WHAT WE BELIEVE ABOUT MIDLIFE ─── */}
        {PAGE_VERSION === "r15" || PAGE_VERSION === "r14" || PAGE_VERSION === "r13" || PAGE_VERSION === "r12" || PAGE_VERSION === "r11" ? (
          <Perspective />
        ) : (
        <section className="os-ph os-ph--perspective" aria-labelledby="os4-title">
          <div className="os-ph-inner">
            <p className="os-ph-flag">Placeholder · Section 4 · copy to be developed and approved</p>
            <h2 id="os4-title">Our perspective on midlife</h2>
            <p className="os-ph-note">
              Purpose: a thoughtful, possibility-led perspective on midlife — no crisis framing,
              fear-based urgency or claims that everyone needs dramatic change.
            </p>
          </div>
        </section>
        )}

        {/* ─── SECTION 5 — YOUR NEXT STEP ─── */}
        {PAGE_VERSION === "r15" || PAGE_VERSION === "r14" || PAGE_VERSION === "r13" || PAGE_VERSION === "r12" ? (
          <NextStep />
        ) : (
        <section className="os-ph os-ph--cta" aria-labelledby="os5-title">
          <div className="os-ph-inner">
            <p className="os-ph-flag">Placeholder · Section 5 · copy and destination to be approved</p>
            <h2 id="os5-title">Final call to action</h2>
            <p className="os-ph-note">
              Purpose: one clear, low-pressure next step that follows naturally from the page.
              Existing working destination on the current page: the Midlife Clarity Check
              (/#clarity-check). No new form, link or conversion flow has been added.
            </p>
          </div>
        </section>
        )}
      </main>
    </>
  );
}
