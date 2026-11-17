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
- The Section 3 phone animation frame is one screen tall; on short phones (≈ 667 px tall or less) the last paragraph and the new button run past the frame, so the track leaves extra space below it (more on very short screens) so nothing overlaps Section 4.
- Two site-contract tests already failed on `main` before this work and still fail (`keeps both Identity Lab conversion blocks…`, `keeps the Identity Lab waitlist page hidden and Kit-powered`); they concern `components/identity-lab-waitlist.tsx` and the standalone `/identity-lab/waitlist/` page, which were not touched.
- Site-wide Ember eyebrow text is below WCAG AA contrast on light backgrounds (owner decision to keep it).
- Section CSS files still contain styles for rejected prototype variants (Section 4 A/B/C1/C2, preview bars); prune in a later cleanup.
