import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { IdentityLabEnrollmentOpen } from "@/components/identity-lab-enrollment-open";
import { Hero } from "@/components/identity-lab-v2/hero";
import { DiscoverySection } from "@/components/identity-lab-v2/discovery-section";
import { OpeningDoorway } from "@/components/identity-lab-v2/opening-doorway";
import { StationsJourney } from "@/components/identity-lab-v2/stations-journey";
import { HowItWorks } from "@/components/identity-lab-v2/how-it-works";
import { IdeaBehind } from "@/components/identity-lab-v2/idea-behind";
import { IdentityLabV2Waitlist } from "@/components/identity-lab-v2/waitlist-card";
import { identityLabStatus, IDENTITY_LAB_ACTION_ANCHOR } from "@/lib/identity-lab-config";
import { pageMetadata } from "@/lib/seo";
import "./identity-lab-v2.css"; // Section 1 (hero) styles, scoped under .ilv2
import "./section-2.css";
import "./section-3.css";
import "./section-4.css";
import "./section-5.css";
import "./section-6.css";
import "./section-7.css";

// ─── Identity Lab page — V2 (seven approved sections) ─────────────────────────
// Source of truth: "SLL Website V2 – Identity Lab Revision Notes – 16 Nov 2026" plus the section-by-section design
// approvals of 17 Nov 2026 (docs/identity-lab-v2/APPROVED-SECTIONS.md in the working repository).
// Section styles are scoped per section (.ilv2, .s2p, .s3h, .s4e, .s5, .s6, .s7), so no other page is affected.
//
//   1 Hero · 2 Why this matters · 3 What becomes possible (+ waitlist CTA) · 4 Your Journey · 5 How it works
//   6 The idea behind the Identity Lab · 7 Take the next step (waitlist, existing Kit form)
//
// Waitlist entry points (three): hero button (1), button in Section 3, and the form in Section 7. All buttons
// point at the single status-driven anchor (#identity-lab-action) via lib/identity-lab-config.ts.

export const metadata: Metadata = pageMetadata({
  title: "Identity Lab",
  description:
    "A guided four-week experience that helps you uncover what makes you uniquely you, discover what brings you alive, and find a clearer direction for your next chapter.",
  path: "/identity-lab/",
  ogDescription:
    "Discover who you truly are — and what you want from life now. A guided four-week experience in a small group, ending with your personal Identity Map.",
});

// Section 7 background — TEMPORARY, AI-generated provisional image ("The open Pacific"); to be replaced later
// with one of the founders' own photographs (swap the file and keep the focal point).
const CLOSING_COAST = { src: "/images/identity-lab-v2/closing-coast-2.jpg", width: 2000, height: 1333, objectPosition: "35% 50%" };

export default function IdentityLabPage() {
  return (
    <>
      <BreadcrumbJsonLd page="Identity Lab" href="/identity-lab/" />
      <main>
        {/* 1 */}
        <div className="ilv2">
          <Hero />
        </div>

        {/* 2 + 3 share the .s2p scope (tokens and Paper background) exactly as in their approved design */}
        <div className="s2p">
          <DiscoverySection />
          <OpeningDoorway />
        </div>

        {/* 4 */}
        <div className="s4main">
          <StationsJourney />
        </div>

        {/* 5 → 6 → 7 */}
        <HowItWorks />
        <IdeaBehind />

        {/* ─── SECTION 7 — TAKE THE NEXT STEP (waitlist) ─── */}
        <section id={IDENTITY_LAB_ACTION_ANCHOR} className="s7" aria-label="Join the Identity Lab waitlist">
          <div className="s7-media">
            <Image
              src={CLOSING_COAST.src}
              alt=""
              width={CLOSING_COAST.width}
              height={CLOSING_COAST.height}
              sizes="100vw"
              style={{ objectPosition: CLOSING_COAST.objectPosition }}
            />
          </div>
          <div className="s7-inner">
            <div className="s7-card">
              {identityLabStatus === "waitlist" ? (
                <IdentityLabV2Waitlist />
              ) : (
                <IdentityLabEnrollmentOpen />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
