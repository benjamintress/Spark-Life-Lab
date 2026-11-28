import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

// Our Story V2 — guards the LOCKED approved copy for Sections 1 and 2 and the page's key contracts.
// Source: "SparkLifeLab – Website V2 – Our Story – Revision & Claude Brief" (Google Doc, 23 Nov 2026).

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

// Revision 13 copy (25 Nov 2026), from the R13 brief.
const LOCKED_SENTENCES = [
  "Why we created SparkLifeLab",
  "We had built successful careers, but as we reached midlife, we began asking ourselves new questions.",
  "What did we want from the years ahead?",
  "What might we still achieve?",
  "And how could we find a direction that truly suited us?",
  "When Bärbel and Gunther met Scott in 2023, we discovered that we were exploring similar questions. We began meeting online every week, sharing our experiences, challenging our assumptions and helping one another see new possibilities.",
  "Over time, our conversations grew deeper, and so did our trust. We learned to ask better questions and to recognize what we wanted to change. We realized that finding a new direction begins with understanding how we ourselves have changed.",
  "What began as mutual support gradually became a shared vision. After two and a half years of exploring what we wanted from our own next chapters, we found a new direction together: creating SparkLifeLab to help others find theirs.",
  "More than 70 years of combined professional experience",
  "Our careers have taken us through higher education, professional development, international consulting and business leadership across Europe, North America and beyond.",
  "Through ",
  "TRESS ACADEMIC",
  ", Burton Performance Group and our work in academic and corporate leadership, we have spent decades helping people recognize their potential, develop new capabilities and navigate important periods of change.",
  "We've worked closely with people at very different stages of their professional lives — from doctoral researchers finding their feet to experienced professionals taking on leadership responsibilities or reconsidering their careers.",
  "Through individual coaching, mentoring and advisory conversations, we've come to understand people's aspirations and uncertainties — and helped them work through difficult decisions, recognize overlooked strengths and pursue new opportunities, from a professorship to a move beyond academia or a new way of leading others.",
  "We've designed and delivered everything from individual learning sessions and webinars to interactive workshops, retreats and multiweek online development programs — on scientific communication, writing, career development, leadership and professional skills.",
  "We've learned how to make complex subjects accessible and how to combine individual reflection with learning alongside others — not simply to transfer knowledge, but to help people discover something useful about themselves and leave with a clearer understanding of what they can do next.",
  "We've advised leaders, teams and research institutions facing complex challenges and important decisions, helping people step into new responsibilities and rethink established approaches. Our experience spans executive leadership, talent development and organizational transformation.",
  "Through this work, we've learned why change is difficult: it rarely happens through advice alone. It requires understanding what matters, recognizing what holds people back and finding a realistic way to turn intentions into action.",
  "At SparkLifeLab, we bring three dimensions together:",
  "Decades of professional experience working with people, learning and change.",
  "Our own personal experience of exploring and navigating midlife.",
  "The ability to create structured, guided learning and development experiences.",
  "Combining them allows us to offer accomplished professionals a structured, guided way to explore what matters to them now and to shape their next chapter — informed by professional expertise and by the understanding of people who have asked the same questions themselves."
];

const PANEL_TITLES = [
  "Working directly with people",
  "Creating learning experiences",
  "Guiding people and organizations through change",
  "Bringing our experience to SparkLifeLab"
];

test("Our Story keeps the exact locked copy for Sections 1 and 2", () => {
  const content = read("components/our-story/content.ts");
  for (const text of LOCKED_SENTENCES) {
    assert.ok(content.includes(JSON.stringify(text)), `Locked copy missing or altered: ${text.slice(0, 60)}…`);
  }
  for (const title of PANEL_TITLES) {
    assert.ok(content.includes(JSON.stringify(title)), `Panel title missing or altered: ${title}`);
  }
  // R13: TRESS ACADEMIC links to its website; Burton Performance Group stays plain text (no verified URL).
  assert.match(content, /"text": "TRESS ACADEMIC",\s*"href": "https:\/\/tressacademic\.com\/"/);
  assert.doesNotMatch(content, /Burton Performance Group[^\n]*"href"/);
  // Area 4 is the culmination: three dimensions, no claim about earlier clients or programs.
  assert.match(content, /"points": \[/);
});

test("Our Story renders Sections 1 and 2 from the locked copy with one H1", () => {
  const page = read("app/about/page.tsx");
  const panels = read("components/our-story/experience-panels.tsx");
  assert.match(page, /SECTION_1\.headline/);
  assert.equal((page.match(/<h1/g) ?? []).length, 1);
  assert.match(page, /<ExperiencePanels \/>/);
  assert.match(page, /<FounderCollage \/>/);
  assert.match(page, /path: "\/about\/"/);
  // Headline, introduction and closing statement are rendered outside the disclosure panels.
  assert.match(panels, /SECTION_2\.headline/);
  assert.match(panels, /SECTION_2\.intro/);
  assert.match(panels, /<p className="os2-closing">\{SECTION_2\.closing\}<\/p>/);
});

test("Our Story Section 2 uses accessible one-at-a-time selectors with a shared content area", () => {
  const panels = read("components/our-story/experience-panels.tsx");
  const styles = read("app/about/our-story.css");
  assert.match(panels, /role="tablist"/);
  assert.match(panels, /role="tab"/);
  assert.match(panels, /role="tabpanel"/);
  assert.match(panels, /type="button"/);
  assert.match(panels, /aria-selected=\{selected\}/);
  assert.match(panels, /aria-controls=/);
  assert.match(panels, /aria-labelledby=/);
  assert.match(panels, /tabIndex=\{selected \? 0 : -1\}/); // roving tabindex
  assert.match(panels, /ArrowRight[\s\S]*ArrowLeft[\s\S]*Home[\s\S]*End/);
  assert.match(panels, /useState\(0\)/); // exactly one panel selected
  assert.match(panels, /hidden=\{index !== active\}/);
  assert.match(panels, /<noscript>/); // full text without JavaScript
  assert.match(styles, /grid-auto-rows:\s*1fr/); // equal selector sizes
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(styles, /:hover[^{]*\.os2-tabpanel/); // never reveal content on hover only
});

test("Our Story Section 2 path alternative is accessible and keeps the approved content", () => {
  const path = read("components/our-story/experience-path.tsx");
  const page = read("app/about/page.tsx");
  assert.match(page, /PAGE_VERSION/);
  assert.match(path, /role="tablist"/);
  assert.match(path, /aria-orientation="vertical"/);
  assert.match(path, /role="tab"/);
  assert.match(path, /role="tabpanel"/);
  assert.match(path, /aria-selected=\{selected\}/);
  assert.match(path, /tabIndex=\{selected \? 0 : -1\}/);
  assert.match(path, /ArrowDown[\s\S]*ArrowUp[\s\S]*Home[\s\S]*End/);
  assert.match(path, /EXPERIENCE_PANELS\.map/); // all four approved panels, full paragraphs
  assert.match(path, /panel\.paragraphs\.map/);
  assert.match(path, /SECTION_2\.headline/);
  assert.match(path, /SECTION_2\.intro/);
  assert.match(path, /\{SECTION_2\.closing\}/);
  assert.match(path, /<noscript>/);
  // Photographs live beside the text, never inside the selectors.
  const tablist = path.slice(path.indexOf('role="tablist"'), path.indexOf('className="os2p-panels"'));
  assert.doesNotMatch(tablist, /<Image/);
  for (const id of ["people", "learning", "change", "together"]) {
    assert.equal(existsSync(join(root, `public/images/our-story/experience-${id}.jpg`)), true);
  }
});

test("Our Story R4 Section 2 keeps approved content, uses the real brand spark and labels placeholders", () => {
  const r4 = read("components/our-story/experience-r4.tsx");
  const styles = read("app/about/our-story.css");
  assert.match(r4, /role="tablist"/);
  assert.match(r4, /aria-orientation="vertical"/);
  assert.match(r4, /aria-selected=\{selected\}/);
  assert.match(r4, /tabIndex=\{selected \? 0 : -1\}/);
  assert.match(r4, /ArrowDown[\s\S]*ArrowUp[\s\S]*Home[\s\S]*End/);
  assert.match(r4, /panel\.paragraphs\.map/);
  assert.doesNotMatch(r4, /\{SECTION_2\.closing\}/); // R13: Area 4 carries "bringing it together"
  assert.match(r4, /target="_blank" rel="noopener noreferrer"/); // TRESS ACADEMIC opens in a new tab
  assert.match(r4, /<noscript>/);
  assert.doesNotMatch(r4, /panel\.number/); // no numbered steps
  assert.match(r4, /brand-spark/);
  assert.match(styles, /mask: url\("\/images\/sparklifelab-spark\.png"\)/); // genuine brand spark
  // R14: four illustrations, each with alt text that names it an illustration; the old placeholders are gone
  assert.doesNotMatch(r4, /r4-placeholder-|Illustrative placeholder/);
  for (const n of ["1-chairs", "2-notebook", "3-staircase", "4-convergence"]) {
    assert.match(r4, new RegExp(`/images/our-story/experience-${n}\\.jpg`));
    assert.equal(existsSync(join(root, `public/images/our-story/experience-${n}.jpg`)), true);
  }
  assert.equal((r4.match(/alt: "Illustration: /g) || []).length, 4);
  const tablist = r4.slice(r4.indexOf('role="tablist"'), r4.indexOf('className="os4-panels"'));
  assert.doesNotMatch(tablist, /<Image/);
});

test("Our Story Section 3 shows the three founder biographies verbatim, with genuine photos and LinkedIn", () => {
  const content = read("components/our-story/founders-content.ts");
  const profiles = read("components/our-story/founder-profiles.tsx");
  const BIOS = [
      "Bärbel loves a difficult question. Give her a complex situation, an unfamiliar challenge or an idea worth exploring, and her curiosity takes over. A scientist, educator and entrepreneur, she has a gift for seeing connections, recognizing possibilities and finding practical ways to move forward.",
      "For much of her career, she used these strengths to help others develop. But in midlife, she began asking a question closer to home: was she making full use of her own abilities and interests? That realization opened a new period of exploration, learning and rethinking what she wanted from life.",
      "An avid reader and lifelong learner, Bärbel is happiest when discovering something new and working out what can be done with it. At SparkLifeLab, she brings that curiosity, her ability to see possibilities and her own experience of discovering that even a well-established life can take a new direction.",
      "Gunther loves bringing ideas to life. A scientist, educator, writer and entrepreneur, he combines analytical depth with warmth, humor and a talent for making complex subjects understandable, engaging and memorable. For more than two decades, he has helped researchers and academic professionals communicate their ideas, develop their abilities and move forward.",
      "In midlife, Gunther began questioning whether his professional life gave enough room to what mattered most to him. He enjoyed his work, but realized that his creative and expressive side had often remained in the background. He wanted to give it a more central place in the years ahead.",
      "A keen photographer who loves music, cycling and being outdoors, Gunther finds inspiration in stories, people and the world around him. At SparkLifeLab, he wants to bring together what has always energized him: creating, telling stories and bringing lightness, energy and meaning into the lives of others.",
      "Scott knows what it takes to make change happen. A business leader, entrepreneur and trusted advisor, he has spent decades helping people, teams and organizations navigate challenges, develop their strengths and find practical ways forward. He combines strategic thinking with a collaborative approach and a genuine interest in what makes people thrive.",
      "In midlife, Scott began questioning something he had long taken for granted: the connection between achievement and fulfilment. Despite his professional success, he found himself increasingly exhausted and disconnected from what mattered most. He began reconsidering the assumptions that had guided his life and exploring what it would mean to live more in line with his own values.",
      "Scott believes that meaningful change begins with understanding yourself, but also requires the courage to act. At SparkLifeLab, he brings his experience of navigating change, his practical perspective and his belief that it's never too late to reconsider what a fulfilling life could look like."
  ];
  for (const text of BIOS) {
    assert.ok(content.includes(JSON.stringify(text)), `Biography text missing or altered: ${text.slice(0, 60)}…`);
  }
  for (const id of ["barbel", "gunther", "scott"]) {
    assert.equal(existsSync(join(root, `public/images/our-story/founder-${id}-profile.jpg`)), true);
  }
  for (const handle of ["baerbeltress", "gunthertress", "scotteburton"]) {
    assert.match(content, new RegExp(`linkedin\\.com/in/${handle}/`));
  }
  assert.match(profiles, /founder\.paragraphs\.map/); // full biographies, always visible
  assert.doesNotMatch(profiles, /aria-expanded|role="tab"|<details/); // no tabs, accordions or toggles
  assert.match(profiles, /rel="noopener noreferrer"/);
});

test("Our Story R6 adds the contextual Clarity Check CTA after the founder profiles", () => {
  const page = read("app/about/page.tsx");
  const cta = read("components/our-story/founders-cta.tsx");
  const content = read("components/our-story/founders-content.ts");
  assert.match(page, /<FounderProfiles variant="r6" \/>\s*<FoundersCta \/>/);
  assert.match(content, /href: "\/#clarity-check"/);
  assert.match(content, /"Take the free Midlife Clarity Check"/);
  assert.match(cta, /className="button button-primary"/);
});

test("Our Story R13 Section 1: three equal vertical photographs, no connecting lines or spark", () => {
  const collage = read("components/our-story/founder-collage.tsx");
  const page = read("app/about/page.tsx");
  const row = collage.slice(collage.indexOf("export function FounderPhotoRow"));
  assert.match(page, /<FounderPhotoRow \/>/);
  assert.match(page, /SECTION_1\.questions\.map/);
  for (const id of ["barbel", "gunther", "scott"]) assert.match(collage, new RegExp(`id: "${id}",\\s*name: `));
  assert.doesNotMatch(row, /<svg|<line|brand-spark/); // no connecting lines, circles or central spark
  assert.match(row, /Photo to follow/); // the row still supports a labelled placeholder for a missing photo
  // R15: Bärbel and Gunther in, 1:2 full-length frames; Scott still a placeholder
  for (const file of ["founder-barbel-personal-v2.jpg", "founder-gunther-personal.jpg", "founder-scott-personal.jpg"]) {
    assert.ok(collage.includes(`src: "/images/our-story/${file}"`), `Section 1 photo missing: ${file}`);
    assert.equal(existsSync(join(root, `public/images/our-story/${file}`)), true);
  }
  assert.ok(collage.includes('src: "/images/our-story/founder-scott-personal.jpg"'));
  assert.match(read("app/about/our-story.css"), /\.os1-row-frame \{[^}]*aspect-ratio: 1 \/ 2;/);
});

test("Our Story Section 4 reproduces the approved beliefs verbatim, with no CTA and no photographs", () => {
  const content = read("components/our-story/content.ts");
  const section = read("components/our-story/perspective.tsx");
  const page = read("app/about/page.tsx");
  const TEXTS = [
      "OUR PERSPECTIVE",
      "What we believe about midlife",
      "Midlife can be a turning point.",
      "For too long, midlife has been associated with decline, settling for less or preparing for retirement. We see it differently. While midlife can bring real challenges, it can also open up a period of discovery, personal growth and new possibilities.",
      "What matters to you can change over time.",
      "Over the years, your experiences, interests and priorities have evolved. Questioning what you want from life does not diminish what you have achieved. It may simply mean that you are ready to give other things a more important place in your life.",
      "Your next chapter doesn’t have to mean starting over.",
      "You bring decades of experience, knowledge, abilities and relationships with you. The opportunity is to build on what you have developed, discover what else is possible and shape a future that reflects who you are today.",
      "We believe that midlife is not just a time to look back at what you have achieved. It is also a time to look forward to what you could still become."
  ];
  for (const text of TEXTS) {
    assert.ok(content.includes(JSON.stringify(text)), `Section 4 text missing or altered: ${text.slice(0, 60)}…`);
  }
  assert.match(page, /<Perspective \/>/);
  assert.doesNotMatch(section, /<Image|<img|button|href=/); // no photographs, no call to action
  assert.match(section, /brand-spark/); // the genuine brand spark, used once
});

test("Our Story Section 5 is the closing invitation: approved copy verbatim, one Ember CTA to the Clarity Check", () => {
  const content = read("components/our-story/content.ts");
  const section = read("components/our-story/next-step.tsx");
  const css = read("app/about/our-story.css");
  const page = read("app/about/page.tsx");
  for (const text of ["YOUR NEXT STEP", "Every next chapter begins somewhere.", "You don’t need to know exactly where you want to go.", "Our free Midlife Clarity Check helps you explore what matters most to you now.", "TAKE THE FREE MIDLIFE CLARITY CHECK →"]) {
    assert.ok(content.includes(JSON.stringify(text)), `Section 5 text missing or altered: ${text}`);
  }
  assert.ok(content.includes('"href": "/#clarity-check"')); // same destination as the main navigation CTA
  assert.equal((section.match(/<Link/g) || []).length, 1); // one CTA only
  assert.doesNotMatch(section, /<Image|<img/); // no photographs
  assert.match(css, /\.os5\s*\{\s*background:\s*var\(--mid-navy\);\s*\}/); // R13: next lighter brand blue; footer keeps Deep navy
  assert.match(css, /\.os5-button\s*\{[^}]*background:\s*var\(--ember\)/);
  assert.match(page, /<NextStep \/>/);
});

