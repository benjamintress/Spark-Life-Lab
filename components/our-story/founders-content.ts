// Our Story — Section 3 "Meet the founders": founder biographies and profile photos.
// Biographies: the definitive approved versions supplied by Gunther Tress on 23 Nov 2026 (Revision 6 brief),
// used verbatim.
// Editorial adjustments may follow after the design review; tests/our-story.test.mjs guards the wording.
//
// PHOTOS — to replace a founder's photograph later, change only `photo.src` (and, if needed,
// `photo.focus` and `photo.alt`) in this file. Nothing else in the section has to change.
// Recommended: a 4:5 portrait, at least 960 × 1200 px.

export const FOUNDERS_SECTION = {
  eyebrow: "Meet the founders",
  headline: "Three people. Different perspectives.",
} as const;

/** Contextual call to action after the founder profiles (Revision 6 brief, 23 Nov 2026). */
export const FOUNDERS_CTA = {
  headline: "What about your next chapter?",
  text: "If our story resonates with you, perhaps it's time to explore your own.",
  button: "Take the free Midlife Clarity Check",
  href: "/#clarity-check", // same destination as the header CTA and the homepage buttons
} as const;

export type FounderProfile = {
  id: "barbel" | "gunther" | "scott";
  name: string;
  role: string;
  paragraphs: readonly string[];
  linkedinUrl: string;
  linkedinLabel: string;
  photo: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** CSS object-position for the crop. */
    focus: string;
    /** Shows the "Temporary photo · final portrait to follow" caption (R13: Scott only). */
    temporary?: boolean;
  };
};

export const FOUNDER_PROFILES: readonly FounderProfile[] = [
  {
    id: "barbel",
    name: "Bärbel Tress, PhD",
    role: "Co-founder, SparkLifeLab",
    paragraphs: [
      "Bärbel loves a difficult question. Give her a complex situation, an unfamiliar challenge or an idea worth exploring, and her curiosity takes over. A scientist, educator and entrepreneur, she has a gift for seeing connections, recognizing possibilities and finding practical ways to move forward.",
      "For much of her career, she used these strengths to help others develop. But in midlife, she began asking a question closer to home: was she making full use of her own abilities and interests? That realization opened a new period of exploration, learning and rethinking what she wanted from life.",
      "An avid reader and lifelong learner, Bärbel is happiest when discovering something new and working out what can be done with it. At SparkLifeLab, she brings that curiosity, her ability to see possibilities and her own experience of discovering that even a well-established life can take a new direction.",
    ],
    linkedinUrl: "https://www.linkedin.com/in/baerbeltress/",
    linkedinLabel: "Bärbel Tress on LinkedIn (opens in new tab)",
    photo: {
      // Genuine photo (IMG_0994_zweiter_Schritt_v2_1.jpeg, 24 Nov 2026): wall extended at the sides/top, lower body continued from IMG_0995 (same shoot, colour-matched); head centred — full size: Desktop › SLL-website images › IMG_0994_Baerbel_portrait_extended_with_IMG_0995.jpg
      src: "/images/our-story/founder-barbel-profile.jpg",
      width: 960,
      height: 1200,
      alt: "Bärbel Tress, smiling, hands on her hips, in a light blue shirt, patterned silk scarf and white jeans, in front of a concrete wall.",
      focus: "50% 30%",
    },
  },
  {
    id: "gunther",
    name: "Gunther Tress, PhD",
    role: "Co-founder, SparkLifeLab",
    paragraphs: [
      "Gunther loves bringing ideas to life. A scientist, educator, writer and entrepreneur, he combines analytical depth with warmth, humor and a talent for making complex subjects understandable, engaging and memorable. For more than two decades, he has helped researchers and academic professionals communicate their ideas, develop their abilities and move forward.",
      "In midlife, Gunther began questioning whether his professional life gave enough room to what mattered most to him. He enjoyed his work, but realized that his creative and expressive side had often remained in the background. He wanted to give it a more central place in the years ahead.",
      "A keen photographer who loves music, cycling and being outdoors, Gunther finds inspiration in stories, people and the world around him. At SparkLifeLab, he wants to bring together what has always energized him: creating, telling stories and bringing lightness, energy and meaning into the lives of others.",
    ],
    linkedinUrl: "https://www.linkedin.com/in/gunthertress/",
    linkedinLabel: "Gunther Tress on LinkedIn (opens in new tab)",
    photo: {
      // TEMPORARY genuine photo (Desktop › SLL-website images › GT-Monterey-Sep-2026-01.jpg)
      src: "/images/our-story/founder-gunther-profile.jpg",
      width: 960,
      height: 1200,
      alt: "Gunther Tress, laughing, leaning against a weathered wooden door in Monterey, California.",
      focus: "50% 30%",
    },
  },
  {
    id: "scott",
    name: "Scott E. Burton",
    role: "Co-founder, SparkLifeLab",
    paragraphs: [
      "Scott knows what it takes to make change happen. A business leader, entrepreneur and trusted advisor, he has spent decades helping people, teams and organizations navigate challenges, develop their strengths and find practical ways forward. He combines strategic thinking with a collaborative approach and a genuine interest in what makes people thrive.",
      "In midlife, Scott began questioning something he had long taken for granted: the connection between achievement and fulfilment. Despite his professional success, he found himself increasingly exhausted and disconnected from what mattered most. He began reconsidering the assumptions that had guided his life and exploring what it would mean to live more in line with his own values.",
      "Scott believes that meaningful change begins with understanding yourself, but also requires the courage to act. At SparkLifeLab, he brings his experience of navigating change, his practical perspective and his belief that it's never too late to reconsider what a fulfilling life could look like.",
    ],
    linkedinUrl: "https://www.linkedin.com/in/scotteburton/",
    linkedinLabel: "Scott E. Burton on LinkedIn (opens in new tab)",
    photo: {
      // TEMPORARY genuine photo (Desktop › Scott › Scott_2426_Wand_breit.jpg — only 600 px; replace with a larger image)
      src: "/images/our-story/founder-scott-profile.jpg",
      width: 480,
      height: 600,
      alt: "Scott E. Burton, smiling, in glasses and a light blue shirt.",
      focus: "50% 30%",
      temporary: true,
    },
  },
];
