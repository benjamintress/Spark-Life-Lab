# Identity Lab V2 — Post-Publication Review Checklist

Status: created with the V2 integration commit (17 Nov 2026). **None of the items below is complete merely because the page is deployed.**

## What was published
- `/identity-lab/` now renders the approved V2 (Sections 1–7): `app/identity-lab/page.tsx`, section components in `components/identity-lab-v2/`, section styles `app/identity-lab/*.css`, images in `public/images/identity-lab-v2/` (+ `identity-lab-hero-v2.jpg`).
- One CTA added to Section 3 ("JOIN THE WAITLIST →", same button as the hero). Waitlist entry points: hero button, Section 3 button, Section 7 form. All buttons use the anchor `#identity-lab-action` (section has `scroll-margin-top` for the sticky navigation).
- Section 7 uses the existing Kit form (UID `fed36a3d05`, Kit form 9632607) via `components/identity-waitlist-kit-form.tsx`, unchanged.
- Not changed: other pages, navigation, footer, `/identity-lab/waitlist/`, `lib/identity-lab-config.ts`, redirects, analytics, deployment configuration.

## A. Image review (do not replace images before the team review)
Review every photograph and graphic in Sections 1–7 for quality and brand fit:
- Do they meet our quality standards? Do any look artificial, soft or insufficiently sharp?
- Would some sections benefit from more human presence — especially photographs of two or more people, to strengthen the sense of connection and shared discovery?
- Are they visually consistent with the SparkLifeLab brand?
Known temporary/provisional assets: the Section 4 photographs (AI-generated), the Section 6 founder portraits (to be replaced with natural photographs), the Section 7 coastal background (AI-generated, strongly blue; one of the founders' own California photographs is the plan). Confirm licensing/usage terms for any generated image kept.

## B. Live mobile review
Review the published page on real phones (at least an iPhone): scrolling experience, Section 3 pinned animation and its new button, Section 4 accordion, Section 5 accordions, Section 6 collage, the Section 7 card and Kit form, anchor landings from the two CTAs.

## C. Live functional review (end-to-end)
- All CTA buttons (hero, Section 3, header, Midlife Clarity Check link, "Get to know us →").
- All interactive components (Sections 2, 3, 4, 5).
- Navigation and footer.
- **Kit form submission** with an address you control; confirmation/redirect behavior; the subscriber appears in the correct Kit form (9632607); any email or automation that registration should trigger.
- Kit-side settings (cannot be changed from code): the button label currently reads "JOIN THE IDENTITY LAB WAITLIST →" and should read "JOIN THE WAITLIST →" if that is the wish (it wraps to two lines on narrow phones); field labels, consent text and the post-submit redirect/confirmation message are as configured in Kit.
Do not mark this review complete because the page has been deployed.

## D. Final visual refinement
After the team has reviewed the live page, a small number of final adjustments may follow. Until then the approved design is preserved.

## Known observations from integration (not defects introduced by publishing)
- (Round 3, 18 Nov 2026) The Section 3 phone animation was rebuilt: heading and question first, then the animation pinned on its own across the full width, then the supporting text and button in normal flow.
- Two site-contract tests already failed on `main` before this work and still fail (`keeps both Identity Lab conversion blocks…`, `keeps the Identity Lab waitlist page hidden and Kit-powered`); they concern `components/identity-lab-waitlist.tsx` and the standalone `/identity-lab/waitlist/` page, which were not touched.
- Site-wide Ember eyebrow text is below WCAG AA contrast on light backgrounds (owner decision to keep it).
- Section CSS files still contain styles for rejected prototype variants (Section 4 A/B/C1/C2, preview bars); prune in a later cleanup.

## Round 3 (18 Nov 2026) — changes made, and items deliberately deferred
Changes: hero eyebrow/paragraph; tighter hero → Section 2 hand-over and Cream Section 2 (cards with a small plus/minus indicator, question marks, "Click/Tap … to explore", 3 px Ember rule); Section 3 names stay visible and travel with their arches, calmer/longer timing, "New possibilities" in serif Deep Navy, dedicated phone composition (wider arches, horizontal names, full-width stage, progress indicator fits at 320 px), closer hand-over to Section 4; Section 4 "Click/Tap a station", exact brand Ember (#EF7C62) for the active/hover station label, small chevrons on phones; Section 5 second paragraph and five practical questions; same-page navigation clicks scroll to the top.
Note: the Section 4 station label is now the exact Ember (#EF7C62), which is below WCAG AA contrast on Paper for small text (the earlier #C4472B variant was replaced at the owner's request).
Deferred: alternative hero photograph; photographic refinement of the five stations; replacement founder photographs; replacement waitlist background; two-page Program Guide PDF (a code comment marks where the quiet "Download the Identity Lab Program Guide →" link goes in Section 5; nothing is shown until the file exists); final review by Bärbel, Gunther and Scott.
