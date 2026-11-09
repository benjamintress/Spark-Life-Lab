# SparkLifeLab — V10 Source of Truth

**Status:** Binding implementation source of truth  
**Version:** V10 — 27 April 2026  
**Source:** SparkLifeLab Website Brief & Copy V10  
**Purpose:** Compact implementation brief for designers, developers, Claude Code, Codex, and AI website-building tools.

> Use this file instead of repeatedly loading the full PDF brief. If any existing website code, older brief, or previous design direction conflicts with this document, follow this file unless the client provides a newer approved brief.

---

## 1. Brand Basics

- **Brand name:** SparkLifeLab
- **Tagline:** Ignite Your Best Life — On Purpose
- **Domain:** spark-life-lab.com
- **Substack:** https://sparklifelab.substack.com/
- **Email:** hello@spark-life-lab.com
- **Founders:** Bärbel Tress (BT), Gunther Tress (GT), Scott E. Burton (SB)
- **Fonts:** TODO — confirm with Bärbel Tress
- **Logo:** TODO — confirm with Bärbel Tress

### Brand Positioning

SparkLifeLab is a calm, guided space for people in midlife who sense that something in their life no longer quite fits, even if everything looks fine from the outside.

The brand frames midlife as:

- a threshold
- a crossing
- a signal
- a realignment
- not a crisis
- not a failure
- not a clinical diagnosis

### Tone

Use language that is:

- calm
- reflective
- mature
- human
- warm
- emotionally precise
- honest
- grounded
- non-clinical
- non-hype

Avoid language that feels:

- aggressive
- motivational-hype
- therapy-clinic
- corporate
- generic coaching
- spiritual cliché
- SaaS/startup-like
- overpromising
- urgent or fear-based

---

## 2. Binding Design System

### Colour Palette V10

**MUST:** Orange `#E07B39` has been removed from the palette. Do not use it anywhere.

| Token | Hex | Usage |
|---|---:|---|
| Page background | `#FEFDF8` | Warm off-white; default page background |
| Primary text | `#1B2A41` | Deep navy; body text and headings |
| Primary accent | `#BFA269` | Warm gold; CTAs, eyebrow labels, dividers, highlights |
| Contrast bg 1 | `#EFEAD8` | Warm sand; alternating section backgrounds |
| Contrast bg 2 | `#94A6B8` | Muted slate blue; Stakes section only or sparingly |
| Authority / nav | `#1B3A6B` | Deep blue; nav bar, section banners, founder cards, navy boxes |
| Secondary text | `#1B2A41` at ~70% opacity | Muted body/helper text |

### Colour by Section

| Section | Background | Notes |
|---|---:|---|
| Nav | `#1B3A6B` | Sticky; white logo and links |
| Hero | `#FEFDF8` | Warm white; gold eyebrow; navy headline |
| Problem | `#1B3A6B` | Deep blue; white text |
| About + Founders | `#FEFDF8` | Warm; founder photos |
| 3-Step Plan | `#EFEAD8` | Warm sand; Step 2 card uses navy bg + gold accent |
| Lead Magnet | `#1B3A6B` | Deep blue; gold CTA button |
| Identity Lab | `#FEFDF8` | Warm white |
| Stakes | `#94A6B8` | Muted slate; calm pause |
| Closing CTA | `#EFEAD8` | Warm sand; tagline appears here |
| Footer | `#1B2A41` | Deep navy; white text |

### Design Concept: Simple Elegance

**MUST:**

- Use generous white space.
- Use flat colours only.
- Use no gradients anywhere.
- Keep sections visually varied through alternating backgrounds.
- Use gold eyebrow labels, uppercase or small caps, minimum 13px rendered.
- Use larger pull quotes / closing statements in selected sections: Section 2, 4, 7, 8.
- Keep the overall page calm, readable, and spacious.
- Avoid clutter, excessive cards, or template-looking components.

### Button Style

**Primary button:**

- Fill: `#BFA269`
- Text: white
- Shadow: subtle light drop shadow, approx. 2–4px offset, low opacity
- Hover: gold deepens slightly to approx. `#A08A50`
- Border radius: 3px
- No gradients
- No transform animation
- No pill-shaped buttons

**Secondary button:**

- Transparent fill
- Navy border and navy text, preferably `#1B3A6B`
- Simple and understated

---

## 3. Imagery Requirements

Use only 3–4 images total unless there is a strong reason.

| Section | Image | Requirement |
|---|---|---|
| Hero | Yes | Right column landscape image. Wide-angle landscape, warm golden light, calm, small figure(s). |
| About + Founders | Yes | 3 processed founder photos, circular crop, warm sand background. |
| Lead Magnet | Yes | Midlife Clarity Check PDF cover as document mockup. |
| Closing CTA | Optional | Same landscape style as hero or clean warm forward-looking image. |

### Provided Founder Photos

Use the processed founder images as circular portraits:

- `founder_barbel.png`
- `founder_gunther.png`
- `founder_scott.png`

**Founder assignment:**

- Bärbel Tress = `founder_barbel.png`
- Gunther Tress = `founder_gunther.png`
- Scott E. Burton = `founder_scott.png`

**Implementation note:** Founder images must appear cleanly circular. Do not show unwanted square frames. Use `border-radius: 50%`, `object-fit: cover`, and overflow handling as needed.

### Provided Hero Image

Use the provided landscape image if available, e.g.:

- `landscape-01.jpeg`

Hero image should appear in the right column of the hero section.

---

## 4. Homepage Narrative Arc

The homepage is structured as a complete narrative arc.

### Level 1 — Hero Mini-Arc

| Hero element | Content | Arc role |
|---|---|---|
| Eyebrow | A guided space for midlife clarity | Where the visitor is arriving |
| Headline | You’ve built a good life. So why does something feel off? | The tension |
| Subheadline | You’re not lost — you’re at a threshold... | The reframe |
| CTA | Download the Midlife Clarity Check — free | First step |

### Level 2 — Full Page Arc

| Section | Content | Arc role |
|---|---|---|
| 1 Hero | Good life — something off | Acknowledge where the visitor is |
| 2 Problem | The Midlife Fog | Name the gap |
| 3 About + Founders | We’ve walked this path | Trust: you are not alone |
| 4 Plan | Three steps forward | A clear way through |
| 5 Lead Magnet | Take the Clarity Check | The first honest step |
| 6 Identity Lab | The deeper journey | What becomes possible |
| 7 Stakes | The fog does not lift alone | Quiet weight behind the step |
| 8 Closing CTA | Ignite Your Best Life — On Purpose | Resolution |

**MUST:** The tagline “Ignite Your Best Life — On Purpose” appears for the first time in Section 8 and also in the footer. It must not appear in the hero or earlier homepage sections.

---

## 5. Homepage Structure and Required Section IDs

The homepage has 8 sections plus nav and footer.

Required order:

1. Navigation
2. Hero
3. Problem — The Midlife Fog
4. About SparkLifeLab + Founders
5. The SparkLife Plan
6. Lead Magnet — The Midlife Clarity Check
7. SparkLife Identity Lab
8. Stakes
9. Closing CTA
10. Footer

Required section IDs:

- `#hero`
- `#problem`
- `#about`
- `#plan`
- `#clarity-check`
- `#identity-lab`
- `#stakes`
- `#closing-cta`

---

## 6. Navigation Logic

**MUST:** Navigation text links are homepage anchor links, not subpage links.

### Homepage Navigation

- Logo / wordmark left: `SPARK LifeLab` or confirmed logo treatment
- Anchor links:
  - Clarity Check → `#clarity-check`
  - Identity Lab → `#identity-lab`
  - Our Story → `#about`
- CTA button:
  - Text: `Get the Midlife Clarity Check →`
  - Link: `/clarity-check/`

### Subpage Navigation

From subpages, nav anchor links must point back to homepage section IDs:

- Clarity Check → `/#clarity-check`
- Identity Lab → `/#identity-lab`
- Our Story → `/#about`

### Deferred at Launch

- Resources + Contact are deferred and not in the launch nav unless explicitly requested later.

---

## 7. Section Copy and Requirements

## NAV — Navigation Bar

- Persistent top bar; visible at all scroll positions
- Background: `#1B3A6B`
- Logo: SparkLifeLab wordmark left
- Anchor links: Clarity Check · Identity Lab · Our Story
- CTA button: `Get the Midlife Clarity Check →`
- CTA link: `/clarity-check/`
- CTA style: gold button, no gradients

---

## SECTION 1 — Hero

**Goal:** Visitor decides in 5 seconds whether to stay.

**Background:** `#FEFDF8`  
**Layout:** Two columns: left = copy, right = hero landscape image  
**Tagline:** Must not appear here.

### Approved Copy

**Eyebrow:**  
A guided space for midlife clarity

**Headline:**  
You’ve built a good life. So why does something feel off?

**Subheadline:**  
That quiet restlessness. The sense that something has shifted but you can’t quite name it. You’re not lost — you’re at a threshold. SparkLifeLab walks alongside people in midlife who are ready to find clarity, reconnect with what matters, and step into what comes next.

**Primary CTA:**  
Download the Midlife Clarity Check — free

**Primary CTA link:**  
`#clarity-check`

**Secondary link:**  
Learn more ↓

**Secondary link target:**  
`#problem`

---

## SECTION 2 — The Problem / The Midlife Fog

**Goal:** Name the problem and make the visitor feel seen.  
**Background:** `#1B3A6B`  
**Text:** white  
**Tone:** Calm. Never crisis. Use threshold/signal framing.

### Approved Copy

**Eyebrow:**  
What you’re experiencing has a name.

**Heading:**  
The Midlife Fog

**Body:**  
There is a moment many people reach in midlife — quietly, without drama. The day has been full. Life is working, by most measures. And yet, when things go still, something feels slightly off. Not broken. Just… no longer quite yours.

What you are experiencing has a name. At SparkLifeLab, we call it the Midlife Fog — the phase when old clarity begins to soften and a new direction has not yet formed. Familiar roles feel constraining. Old motivations feel thinner. Something new is trying to emerge, but it is not yet clear.

This is not a crisis. It is not a sign that something has gone wrong.

**Closing pull quote:**  
It is a signal — that your life is ready to realign with who you are becoming now.

---

## SECTION 3 — About SparkLifeLab + Founders

**Goal:** Establish SparkLifeLab as guide: empathy first, authority second.  
**Background:** `#FEFDF8`  
**Structure:** SLL positioning → Founders’ story → Founder cards

### Approved Copy

**Eyebrow:**  
We’ve walked this path ourselves.

**Heading:**  
A calm, guided space to regain orientation

**SLL Positioning:**  
SparkLifeLab exists for people in midlife who sense that something in their life no longer fits — even if, from the outside, everything looks fine. We exist because midlife deserves a more thoughtful, humane framing — as a meaningful threshold where experience, longing, and possibility meet.

Feeling stuck or uncertain is not a flaw. It is often a signal that growth is asking for attention. We don’t promise quick fixes or dramatic reinvention. We walk alongside people as guides — offering structure, reflection, and companionship as they find their own direction forward.

**Founders heading:**  
Why we built SparkLifeLab

**Founders subheading:**  
We’re fellow travellers — not experts standing apart.

**Founders’ story:**  
SparkLifeLab began with a quiet question many people reach in midlife: Is this really it — or is something else trying to emerge?

The three of us — Bärbel, Gunther, and Scott — met during an online course on life purpose. None of us was in a difficult place. Our careers were established, our lives looked solid and successful from the outside. Yet each of us felt a growing sense that the stories we were living no longer quite fit. Something had shifted — subtle, persistent, hard to name.

What helped us most wasn’t quick advice or ready-made solutions, but the chance to slow down together. Space, time, and companionship. Conversations that didn’t rush us toward answers, but helped us listen more closely to what mattered now. Gradually, clarity emerged.

We realised this wasn’t a personal failure. It was a threshold — a meaningful crossing many people reach in midlife, often alone and without support. SparkLifeLab grew from the wish that something like this had existed when we first felt that quiet restlessness. We’re still on that path ourselves — and we’re glad to walk it with you.

### Founder Cards

**Bärbel Tress | Co-founder**

- Photo: `founder_barbel.png`
- One-liner: A scientist and maven who spent decades guiding researchers forward — and found her own path forward when she discovered her genius and purpose in midlife.
- LinkedIn: https://www.linkedin.com/in/baerbeltress

**Gunther Tress | Co-founder**

- Photo: `founder_gunther.png`
- One-liner: A communicator, scientist, and storyteller who built a career making complex ideas come alive — and brings that same clarity, warmth, and lightness to midlife transformation.
- LinkedIn: https://www.linkedin.com/in/gunthertress

**Scott E. Burton | Co-founder**

- Photo: `founder_scott.png`
- One-liner: A strategist and guide with decades in leadership and transformation who found that the most important journey was the one inward.
- LinkedIn: https://www.linkedin.com/in/scotteburton

**Closing tagline:**  
Co-founders. Fellow travellers. Still becoming.

---

## SECTION 4 — The SparkLife Plan

**Goal:** Present a clear, simple 3-step path.  
**Background:** `#EFEAD8`

### Card Styling

- Step 1 card: mild, `#FEFDF8` or light sand tint
- Step 2 card: highlighted, `#1B3A6B` background, white text, gold accent
- Step 3 card: mild, same as Step 1

### Approved Copy

**Eyebrow:**  
Three steps. Your pace.

**Heading:**  
How we walk alongside you

**Subheading:**  
Three simple steps. At your own pace.

**Step 1:**  
01 — Take the Midlife Clarity Check  
Start with a short self-assessment to gain clarity on where you are. Free. 20–30 minutes.

**Step 2:**  
02 — Join a guided experience  
Deepen your clarity through the SparkLife Identity Lab — a guided journey to help you understand who you are now and shape your next chapter with intention.

**Step 3:**  
03 — Live your spark  
Begin living your next chapter — supported by a community that keeps you inspired and grounded.

**CTA button:**  
Start with the Midlife Clarity Check — it’s free →

**CTA target:**  
`/clarity-check/` or `#clarity-check` depending on context; homepage CTA may point to the homepage lead magnet section or directly to the dedicated subpage. Primary nav CTA must point to `/clarity-check/`.

**Closing statement:**  
The path forward doesn’t need to be clear all at once. It only needs to begin.

---

## SECTION 5 — Lead Magnet / The Midlife Clarity Check

**Goal:** Primary conversion point.  
**Background:** `#1B3A6B`  
**CTA:** Gold button linking to `/clarity-check/`

**MUST:** The live Kit form belongs on `/clarity-check/` only. The homepage section describes the offer and links to the subpage.

**MUST:** The Clarity Check is framed as a 6-question self-assessment with 3 scored result profiles, not just a PDF.

**Timing:** 20–30 minutes. Do not say 10 minutes.

### Approved Copy

**Eyebrow:**  
Free — your first honest step.

**Heading:**  
The Midlife Clarity Check

**Subheading:**  
A free self-assessment to help you understand where you are — and what may be ready to change.

**Body:**  
Many people in midlife sense that something has shifted — but struggle to find words for it. The Midlife Clarity Check gives you language and structure for that experience.

Six honest questions. Your answers reveal exactly where you are in the Midlife Fog.

In around 20–30 minutes, you will:

- Recognise the signals that something in your life is ready to shift
- Understand where you are in your midlife passage
- Receive a personalised reflection based on your answers
- Take a first step toward clarity — gently, at your own pace

**CTA button:**  
Get my free Midlife Clarity Check →

**CTA target:**  
`/clarity-check/`

**Closing statement:**  
It takes 20–30 minutes. It costs nothing. And it starts with honesty.

---

## SECTION 6 — SparkLife Identity Lab

**Goal:** Soft introduction, intrigue, not hard sell.  
**Background:** `#FEFDF8`

**MUST:** Name the IdentityMap as tangible outcome.  
**MUST:** Never call it coaching or a course.

### Approved Copy

**Eyebrow:**  
When you’re ready for the next step.

**Heading:**  
The SparkLife Identity Lab

**Subheading:**  
Your guided first step into clarity

**Body:**  
Once you have a clearer sense of where you are, the SparkLife Identity Lab offers the next step — a guided transformation journey to help you understand who you are now, what truly matters, and how to move forward with intention.

In a small, supported group, you will explore your values, your strengths, and the direction that feels most aligned with who you are becoming. Not a course. Not coaching.

A guided crossing — with others who understand what this passage feels like.

The journey ends with your personal IdentityMap: a beautifully designed document that brings together everything you discovered — your values, strengths, purpose, and emerging future. A compass you keep.

**CTA button:**  
Learn more about the SparkLife Identity Lab →

**CTA target:**  
`/identity-lab/` or Kajabi if provided later

**Small text:**  
First cohort launching May 2026. Places are limited.

---

## SECTION 7 — Stakes

**Goal:** Calm, honest statement of the cost of staying in the fog.  
**Background:** `#94A6B8`  
**Tone:** Honest and compassionate. Not urgent. Not fear-based.  
**Length:** 3–4 lines max.

### Approved Copy

**Heading:**  
A quiet truth worth naming.

**Body:**  
The Midlife Fog doesn’t lift on its own. The gap between who you are and how you’re living tends to widen, not close, without attention. Not dramatically — just slowly, quietly.

**Key statement:**  
The people who find their way through are rarely the ones who had all the answers. They’re the ones who took one honest step.

**Text link:**  
Start with the free Clarity Check →

**Text link target:**  
`/clarity-check/`

---

## SECTION 8 — Closing CTA

**Goal:** Repeat offer and close narrative arc with tagline.  
**Background:** `#EFEAD8`

**MUST:** This is the first and only homepage appearance of the tagline before the footer.

### Approved Copy

**Heading:**  
Start with a free, honest check-in.

**Tagline:**  
Ignite Your Best Life — On Purpose

**Body:**  
20–30 minutes. No commitment. Just clarity.

**CTA button:**  
Get the free Midlife Clarity Check →

**CTA target:**  
`/clarity-check/`

**MUST:** No form here. Button links to `/clarity-check/`.

---

## FOOTER

**Goal:** Legal + contact + Substack.  
**Background:** `#1B2A41`  
**Text:** white

### Required Footer Content

**Logo + tagline:**  
SPARK LifeLab · Ignite your best life — on purpose

**Contact:**  
hello@spark-life-lab.com

**Substack:**  
Read our essays on Substack → https://sparklifelab.substack.com/

**Legal links:**

- Privacy Policy
- Terms of Use
- Cookie Policy
- Impressum

**Copyright:**  
© 2026 SparkLifeLab. All rights reserved.

---

## 8. Cookie Banner

### Required Copy

We use cookies to improve your experience. By continuing you accept our Cookie Policy.

### Required Buttons

- Accept all
- OK, got it
- Privacy details

### Implementation Rules

- If no real cookie provider is integrated, implement simple localStorage UI behavior and mark a TODO for Termly/iubenda or equivalent.
- Do not set non-essential cookies before consent.
- Cookie banner must appear on first visit.

---

## 9. Required Subpages

Subpages are a separate step but must be prepared/implemented if the project scope includes them.

Required / planned pages:

- `/clarity-check/`
- `/identity-lab/`
- `/about/`
- `/privacy-policy/`
- `/terms-of-use/`
- `/cookie-policy/`
- `/impressum/`

### `/clarity-check/`

Purpose: Dedicated landing page for the Midlife Clarity Check.

Requirements:

- Explain the 6-question self-assessment.
- Explain the 3 scored result profiles.
- Include form area for Kit/ConvertKit embed.
- If embed code is missing, use a clear placeholder/TODO.
- Include privacy/GDPR reassurance.
- Do not fake form submission.
- Test final flow before launch: submit → welcome email → PDF delivered.

### `/identity-lab/`

Purpose: Dedicated page for SparkLife Identity Lab.

Requirements:

- Use V10 Identity Lab framing.
- Mention IdentityMap as tangible outcome.
- Do not call it coaching.
- Do not call it a course.
- Do not invent unsupported curriculum.
- CTA destination may be `/identity-lab/` or Kajabi if provided.
- TODO: update CTA status text when registration opens.

### `/about/`

Purpose: Fuller About/Founders page.

Requirements:

- Use V10 founder story.
- Use founder cards/photos.
- Keep tone human, grounded, and trust-building.
- Do not invent credentials.

### Legal Pages

Required pages:

- `/privacy-policy/`
- `/terms-of-use/`
- `/cookie-policy/`
- `/impressum/`

Requirements:

- If final legal copy is missing, create tasteful placeholder pages.
- Mark TODO: final legal copy must be generated by Termly/iubenda or reviewed by lawyer.
- Do not invent company registration data, addresses, phone numbers, or responsible person details.

---

## 10. SEO Requirements

Build with realistic SEO basics. Do not promise rankings.

### Must Implement

- One H1 per page.
- Logical H2/H3 structure.
- Page-specific title tags if stack supports it.
- Page-specific meta descriptions if stack supports it.
- Meaningful alt text for images.
- Clean internal links.
- Descriptive URLs/slugs.
- Open Graph metadata if stack supports it.
- Responsive performance.
- Accessible markup.

### Likely SEO Themes

- midlife clarity
- midlife transition
- finding direction in midlife
- midlife purpose
- midlife reflection
- guided midlife reflection
- midlife transformation
- Midlife Clarity Check
- SparkLife Identity Lab
- SparkLifeLab

### Avoid

- Keyword stuffing.
- Ranking promises.
- Fake authority claims.
- Unsupported medical/therapeutic claims.

---

## 11. Accessibility Requirements

MUST:

- Ensure strong color contrast.
- Ensure keyboard-accessible nav, buttons, and links.
- Provide visible focus states.
- Use readable font sizes on mobile.
- Use meaningful alt text.
- Use labels for forms/placeholders.
- Do not rely only on color to communicate hierarchy.
- Keep anchor links usable.
- Keep buttons/link text descriptive.

---

## 12. Implementation Rules for Claude Code / Codex

### General

- Use this file as binding source of truth.
- Follow existing project stack unless there is a strong reason not to.
- Keep project Vercel-ready.
- Avoid unnecessary dependencies.
- Avoid unnecessary backend/database/auth.
- Keep implementation maintainable and simple.
- Use global design tokens or CSS variables.
- Remove all old orange references.
- Remove outdated older-brief assumptions.
- Ensure all image paths work.
- Ensure responsive layout works on mobile, tablet, and desktop.
- Run build/lint if available and fix errors.

### Do Not Invent

Do not invent:

- testimonials
- press mentions
- certifications
- user numbers
- founder credentials
- case studies
- statistics
- legal details
- addresses
- company registration numbers
- fake form functionality
- fake integrations

### Email Form

- Live Kit form belongs on `/clarity-check/`.
- Homepage does not contain live form.
- If Kit embed is unavailable, use placeholder with TODO.
- Include consent/privacy microcopy.
- Do not fake successful submission.

### Logo / Fonts

- Fonts are TODO, to be confirmed with Bärbel Tress.
- Logo is TODO, to be confirmed with Bärbel Tress.
- Until confirmed, use a restrained professional wordmark treatment.

---

## 13. Pre-Launch Checklist

Before launch, verify:

- [ ] Kit form live on `/clarity-check/`
- [ ] Kit flow tested: submit → welcome email → PDF delivered
- [ ] Privacy Policy page live
- [ ] Terms of Use page live
- [ ] Cookie Policy page live
- [ ] Impressum page live
- [ ] Cookie banner connected and firing on first visit
- [ ] Mobile view tested across all 8 homepage sections
- [ ] All anchor links tested
- [ ] Custom domain connected: spark-life-lab.com
- [ ] Colour palette applied: `#FEFDF8`, `#1B2A41`, `#BFA269`, `#EFEAD8`, `#94A6B8`, `#1B3A6B`
- [ ] No orange `#E07B39`
- [ ] No gradients
- [ ] Gold buttons: flat fill, light shadow, hover color shift
- [ ] Eyebrow labels readable, minimum 13px rendered
- [ ] Tagline appears only in Section 8 and footer
- [ ] Founder photos integrated as circular portraits
- [ ] LinkedIn links verified for all 3 founders
- [ ] Hero landscape image selected/integrated
- [ ] Logo confirmed with Bärbel Tress
- [ ] Fonts confirmed with Bärbel Tress
- [ ] Identity Lab CTA status updated when registration opens
- [ ] Build passes
- [ ] No broken links
- [ ] No broken images

---

## 14. Open Items — V10

- TODO: Confirm fonts with Bärbel Tress.
- TODO: Confirm logo with Bärbel Tress.
- TODO: Confirm final hero image if provided asset is not final.
- TODO: Build/finish `/clarity-check/` subpage with Kit form embed.
- TODO: Build/finish `/identity-lab/` subpage.
- TODO: Build/finish `/about/` subpage.
- TODO: Generate/review legal pages via Termly, iubenda, or lawyer.
- TODO: Connect real cookie provider if required.
- TODO: Update Identity Lab CTA status when registration opens.

---

## 15. Quick Implementation Checklist

Use this as a fast QA list:

- [ ] V10 source followed
- [ ] No orange
- [ ] Gold accent only
- [ ] No gradients
- [ ] Homepage has correct 8-section arc
- [ ] Required section IDs exist
- [ ] Nav anchor links correct
- [ ] Nav CTA links to `/clarity-check/`
- [ ] From subpages, nav anchors use `/#section-id`
- [ ] Tagline appears only Section 8 + footer
- [ ] Homepage Clarity Check section links to `/clarity-check/`
- [ ] No live form on homepage
- [ ] `/clarity-check/` has Kit placeholder/embed area
- [ ] Founder photos correct and circular
- [ ] Founder LinkedIn links correct
- [ ] Legal pages exist
- [ ] Cookie banner exists
- [ ] SEO basics implemented
- [ ] Accessibility basics implemented
- [ ] Responsive layout works
- [ ] Build passes
