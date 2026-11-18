// Section 4 — Your Journey: approved wording, used verbatim (US spelling).
// Level 1 (always visible): number, title, benefit. Level 2 (on interaction): description.

export const S4_EYEBROW = "YOUR JOURNEY";
export const S4_HEADLINE = "Five stations. A new perspective on yourself.";
export const S4_INTRO =
  "The Identity Lab takes you through five connected stations. Each builds on what you’ve discovered before, helping you move from understanding yourself more deeply to exploring what you want from your future.";
export const S4_CUE_CLICK = "Click a station to explore.";
export const S4_CUE_TAP = "Tap a station to explore.";

export type Station = {
  n: string;
  title: string;
  benefit: string;
  description: string;
};

export const STATIONS: Station[] = [
  {
    n: "01",
    title: "Finding Your Ground",
    benefit: "Understand what shapes who you are.",
    description:
      "Discover your values, personality, character strengths, and what naturally motivates you. Begin to recognize the patterns behind your choices and experiences.",
  },
  {
    n: "02",
    title: "Holding On and Letting Go",
    benefit: "Discover what still fits — and what doesn’t.",
    description:
      "Look at the roles, activities, and skills you’ve accumulated over the years. Recognize what you want to keep, what you’re ready to leave behind, and what deserves more room in your life.",
  },
  {
    n: "03",
    title: "Coming Fully Alive",
    benefit: "Discover what you do best — and what makes you come alive.",
    description:
      "Discover abilities that come so naturally you may have overlooked them. Explore the moments when you’re at your best and understand what makes those experiences so fulfilling.",
  },
  {
    n: "04",
    title: "Opening Up to New Possibilities",
    benefit: "Explore what genuinely inspires you.",
    description:
      "Discover new roles, activities, and possibilities that excite you. Begin to define what a meaningful and successful life would look like on your own terms.",
  },
  {
    n: "05",
    title: "Discovering Your Call",
    benefit: "Discover what you want to bring into the world.",
    description:
      "Bring together everything you’ve learned about yourself. Explore how your unique abilities and interests could find expression in something meaningful to you and valuable to others.",
  },
];
