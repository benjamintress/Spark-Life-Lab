# Our Story V2 — Status and baseline

**Status (25 Nov 2026): Revision 15 is the current version — Revision 14 plus the personal photographs of Bärbel and
Gunther in Section 1. Ready to publish once Scott's photographs are in place.** Revision 12 remains preserved as the earlier baseline.
Local only. Nothing has been published; the live Our Story page (spark-life-lab.com/about/) is unchanged.
Do not publish, commit to `main` or deploy until Gunther Tress explicitly decides to publish after the final review.
Next step: add the final photographs (see "Outstanding before publication"), final review together, decision to publish.

> **⚠ Required before publication — synchronize with the live website.**
> This project is based on the website as of 23 Nov 2026 (commit `e5cce0f`). The live site has changed since
> (Identity Lab photo updates, 24 Nov 2026). Before the new Our Story page is published, the project must be
> brought up to date with the current live version on GitHub, so that no live changes are undone.
>
> **Keep `Desktop/_to_delete/`** until the new Our Story page has been published successfully; clean up afterwards.

## Baseline — Revision 12

| What | Where (this project) |
|---|---|
| Page source | `app/about/page.tsx` (`PAGE_VERSION = "r12"`) and `app/about/our-story.css` |
| Section components and copy | `components/our-story/` (approved copy in `content.ts` and `founders-content.ts`) |
| Images | `public/images/our-story/` |
| Copy and contract tests | `tests/our-story.test.mjs` (10/10 passing on 24 Nov 2026) |
| Revision 12 preview (baseline) | `Desktop/SparkLifeLab Website V2/Previews/Our-Story-V2-preview-r12.html`; identical copy in `docs/our-story-v2/baseline-r12/` |
| Previous revision for comparison | `docs/our-story-v2/previous-revisions/Our-Story-V2-preview-r11.html` |
| Frozen snapshot | `docs/our-story-v2/baseline-r12/our-story-v2-r12-source-and-assets.zip` (28 files) with `CHECKSUMS.sha256` |

Full-size originals of the edited photos of Bärbel: `Desktop/SparkLifeLab Website V2/SLL-website images/` ›
`IMG_0994_Baerbel_portrait_extended_with_IMG_0995.jpg` (Our Story) and `IMG_1136_Baerbel_tree_zoomed_out.jpg` (Identity Lab).

Preview numbering: r7–r10 were rounds of photo changes in Section 3, r11 added Section 4, r12 added Section 5.
(The review banner inside the preview file still reads "revision 6"; it is a label only.)

## Revision 13 (25 Nov 2026) — what changed

Preview: `Desktop/SparkLifeLab Website V2/Previews/Our-Story-V2-preview-r13.html` (copy in `docs/our-story-v2/r13/`).
Source: `PAGE_VERSION = "r13"` in `app/about/page.tsx`; all copy in `components/our-story/content.ts`.

- **Section 1:** the introductory sentence is separated from the three questions; the questions (unchanged wording) sit on
  their own lines beside a thin Ember line. Story re-paragraphed; the new insight and the new final sentence are added
  ("understand ourselves more clearly" was dropped from the third paragraph so it does not repeat the insight).
  The connected portrait collage is replaced by three equal 2:3 photo frames, middle one slightly lower
  ("People beyond their professional roles"); labelled "Photo to follow" until the photographs arrive.
- **Section 2:** new introduction naming TRESS ACADEMIC (link to tressacademic.com, new tab) and Burton Performance Group
  (plain text — no verified website found). Areas 1–3 shortened by about 20–25 %; Area 4 rewritten as the culmination
  (three dimensions). The former closing line was removed (Area 4 now carries it). The AI-generated placeholder photos are
  retired: each area has a labelled frame describing the photograph needed. Area 4 shows the convergence diagram
  (option B); option A (landscape photograph) is prepared and can be compared in the preview's review bar.
- **Section 3:** temporary captions removed under Bärbel's and Gunther's photos; kept under Scott's. Biographies, LinkedIn
  links and the intermediate CTA unchanged.
- **Section 4:** second heading now "What matters to you can change over time." All three headings run to two lines
  on desktop, so the paragraphs start at the same height.
- **Section 5:** background Mid navy (#4D5772, the next lighter blue of the brand palette); the footer keeps Deep navy.
  New supporting text on two lines. Button unchanged.
- **Typography:** typographic apostrophes (doesn’t, don’t).

## Revision 14 (25 Nov 2026) — Section 2 illustrations

Preview: `Desktop/SparkLifeLab Website V2/Previews/Our-Story-V2-preview-r14.html` (copy in `docs/our-story-v2/r14/`).
Source: `PAGE_VERSION = "r14"`. Only Section 2's pictures changed; copy, layout and the other sections are as in Revision 13.

- Four photographic metaphors, one per area, generated with Canva AI from the agreed concept and references:
  1 two white chairs and a small table · 2 open notebook with an Ideas → Try → Learn diagram, three pencils, two
  untitled books · 3 gently curving staircase · 4 hand-drawn diagram on a large sheet.
- Image 4 is the founders' large-sheet reference photograph: its AI-drawn spark and wordmark were removed and replaced
  with the **official** wordmark and spark (`/images/sparklifelab-wordmark.png`, Deep navy + Ember). Labels: Professional
  expertise · Personal midlife experience · Learning and development. The three circles are navy ink; the soft
  underline strokes (blue-grey, peach, pale blue) are kept from the reference — an attempt to recolor them looked artificial.
- All four: 960 × 1200 (4:5), 78–159 KB, color-matched (the staircase brightened and neutralized). Alt texts begin with
  "Illustration:" — they are not presented as documentary photographs. Image 4 keeps a square frame on screens below
  1100 px so its labels are never cropped.
- Retired: the Area 4 convergence diagram and the review switch from Revision 13; the "Photo to follow" frames in Section 2.
- Files: `public/images/our-story/experience-1-chairs.jpg`, `-2-notebook.jpg`, `-3-staircase.jpg`, `-4-convergence.jpg`;
  originals in `Desktop/SparkLifeLab Website V2/SLL-website images/Our Experience illustrations 2026-11-25/`.
- Generated images in Canva: chairs MAHb6Q8EUv0 · notebook MAHb6kbFTsI · staircase MAHb6hI1oRo.

## Revision 15 (25 Nov 2026) — Section 1 personal photographs

Preview: `Desktop/SparkLifeLab Website V2/Previews/Our-Story-V2-preview-r15.html` (copy in `docs/our-story-v2/r15/`).
Source: `PAGE_VERSION = "r15"`. Only Section 1's photo row changed.

- Three equal, narrow full-length frames (1:2), order Bärbel · Gunther · Scott; middle frame slightly lower; narrow gaps;
  2 px corners; first-name labels kept. Scott's frame stays a labelled placeholder of exactly the same size.
- Bärbel: white outfit against the golden glass facade (IMG_0854). Gunther: outside the bookshop with a book, blue door (IMG_2182).
  Crops show the whole person, who fills about 83 % of the frame height in both, with 13–15 % headroom and a little floor
  below the feet; nothing stretched or extended. Subtle color balance only: a little less gold in Bärbel's, a touch warmer
  and lighter in Gunther's. 640 × 1280 px each, ~140 KB.
- Larger composition: on desktop the text keeps the page's left edge and the photo row may extend up to 8rem into the right
  margin, so the frames are 204 × 407 px (before: 166 × 333); tablet 207 × 414; phones 111 × 221.
- Files: `public/images/our-story/founder-barbel-personal.jpg`, `founder-gunther-personal.jpg`;
  Scott: add `founder-scott-personal.jpg` (1:2, 640 × 1280) and set `src`/`alt` in `founder-collage.tsx`.

## Sections — status

All five sections reviewed and provisionally approved (24 Nov 2026); refined in Revision 13 (25 Nov 2026).

## Outstanding before publication

- [x] **Section 1:** Bärbel and Gunther in (Revision 15).
- [ ] **Section 1:** Scott's personal photograph — full length, 1:2, 640 × 1280 px (crop so he fills ~83 % of the height).
- [x] **Section 2:** four illustrations integrated (Revision 14) — final approval in the complete-page review.
- [ ] **Section 3:** Scott's final portrait (then remove `temporary: true` in `founders-content.ts`); Scott's optional
      personal detail for his biography.
- [ ] Page metadata (search-engine title and description in `app/about/page.tsx`) still describes the old V1 page.
- [ ] Final review with all photographs: cropping, proportions, balance; desktop, tablet and mobile; all links and CTAs.
- [ ] Synchronize with the live website before publishing (see the note at the top).
- [ ] Optional tidy-up before publishing: images no longer used (`r4-placeholder-*.jpg`, `experience-change/learning/people/together.jpg`,
      `founder-*-collage.jpg` in `public/images/our-story/`) are still in the project and would be deployed.

Checked in Revision 13: links (TRESS ACADEMIC, three LinkedIn profiles, both Clarity Check CTAs → `/#clarity-check`,
the live homepage section used by the main navigation), one H1 and a clean heading order, no horizontal scrolling from
320 px to 1440 px, copy verified against `content.ts`, Our Story tests 10/10. Same checks repeated for Revisions 14 and 15.

## Separate item — website-wide accessibility (no change now)

The standard Ember CTA (white text on Ember `#ef7c62`) has a contrast of 2.7 : 1. WCAG AA requires 4.5 : 1 for text at button size.
The same style is used site-wide (header CTA, form buttons, Our Story Section 5).
Checked again in Revision 13 against the actual brand colors: white on Ember 2.72 : 1 (button text); Ember eyebrow on
Mid navy 2.65 : 1 (Section 5 eyebrow; Ember eyebrows on Paper are 2.67 : 1 site-wide); the Ember button against Mid navy
2.65 : 1 (WCAG asks 3 : 1 for a control's outline). Navy text on Ember would be 5.36 : 1; Paper text on Mid navy is 7.06 : 1.
Possible fix: navy text on Ember (5.4 : 1). If adopted, change it across the whole website in one step.
**The buttons have not been changed.**

## Working rules

- Everything stays local until the final review together and an explicit decision to publish.
- Changes only on explicit request; nothing is published until the explicit decision to publish.
- Everything for the Our Story go-live lives in `Desktop/SparkLifeLab Website V2/` (this project: `Our-Story-V2-local`; previews: `Previews/`; photos: `SLL-website images/`). Start with `00 START HERE.md`.
- Before publishing, synchronize with the current live website (see the note at the top).
- Keep `Desktop/_to_delete/` until after successful publication.
