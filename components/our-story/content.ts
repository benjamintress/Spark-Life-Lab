// Our Story — LOCKED approved website copy for Sections 1 and 2.
// Source: "SparkLifeLab – Website V2 – Our Story – Revision & Claude Brief" (Google Doc, 23 Nov 2026).
// Generated verbatim from the brief. Do not paraphrase, shorten, expand or "improve" without explicit approval.
// tests/our-story.test.mjs guards these strings.

// Revision 13 (25 Nov 2026): intro separated from the three questions (wording kept); story re-paragraphed;
// new insight and final sentence supplied in the R13 brief. "understand ourselves more clearly" was dropped from
// the third paragraph so it does not repeat the new insight.
export const SECTION_1 = {
  "eyebrow": "OUR STORY",
  "headline": "Why we created SparkLifeLab",
  "intro": "We had built successful careers, but as we reached midlife, we began asking ourselves new questions.",
  "questions": [
    "What did we want from the years ahead?",
    "What might we still achieve?",
    "And how could we find a direction that truly suited us?"
  ],
  "paragraphs": [
    "When Bärbel and Gunther met Scott in 2023, we discovered that we were exploring similar questions. We began meeting online every week, sharing our experiences, challenging our assumptions and helping one another see new possibilities.",
    "Over time, our conversations grew deeper, and so did our trust. We learned to ask better questions and to recognize what we wanted to change. We realized that finding a new direction begins with understanding how we ourselves have changed.",
    "What began as mutual support gradually became a shared vision. After two and a half years of exploring what we wanted from our own next chapters, we found a new direction together: creating SparkLifeLab to help others find theirs."
  ]
} as const;

export const SECTION_2 = {
  "eyebrow": "OUR EXPERIENCE",
  "headline": "More than 70 years of combined professional experience",
  "intro": "Our careers have taken us through higher education, professional development, international consulting and business leadership. Across these different worlds, one thing has connected much of our work: helping people recognize their potential, develop new capabilities and find ways forward.",
  "closing": "Today, we bring that knowledge together to help you understand what matters most to you now, explore new possibilities and find your own direction."
} as const;

// Revision 13 (25 Nov 2026): new introduction (from the R13 brief) — names our professional backgrounds early.
// TRESS ACADEMIC links to https://tressacademic.com/ (new tab). Burton Performance Group stays plain text: no
// verified website was found. `intro`/`closing` above are kept only for the archived r2–r12 variants.
export type IntroSegment = { text: string; href?: string };
export const SECTION_2_INTRO_R13: readonly (readonly IntroSegment[])[] = [
  [
    {
      "text": "Our careers have taken us through higher education, professional development, international consulting and business leadership across Europe, North America and beyond."
    }
  ],
  [
    {
      "text": "Through "
    },
    {
      "text": "TRESS ACADEMIC",
      "href": "https://tressacademic.com/"
    },
    {
      "text": ", Burton Performance Group and our work in academic and corporate leadership, we have spent decades helping people recognize their potential, develop new capabilities and navigate important periods of change."
    }
  ]
] as const;

export type ExperiencePanel = {
  id: string;
  /** Panel number as it appears in the brief ("1." … "4."). */
  number: string;
  title: string;
  paragraphs: readonly string[];
  /** Optional list shown after `paragraphs` (Area 4: the three dimensions we bring together). */
  points?: readonly string[];
  /** Optional paragraphs shown after `points`. */
  after?: readonly string[];
};

// Revision 13 (25 Nov 2026): the four areas shortened by about 20–25%; Area 4 rewritten as the culmination
// (three dimensions; R14: the list wording is unchanged — the image labels are its short form). Facts kept; no claim that earlier clients were midlife clients or SparkLifeLab programs.
export const EXPERIENCE_PANELS: readonly ExperiencePanel[] = [
  {
    "id": "people",
    "number": "1",
    "title": "Working directly with people",
    "paragraphs": [
      "We've worked closely with people at very different stages of their professional lives — from doctoral researchers finding their feet to experienced professionals taking on leadership responsibilities or reconsidering their careers.",
      "Through individual coaching, mentoring and advisory conversations, we've come to understand people's aspirations and uncertainties — and helped them work through difficult decisions, recognize overlooked strengths and pursue new opportunities, from a professorship to a move beyond academia or a new way of leading others."
    ]
  },
  {
    "id": "learning",
    "number": "2",
    "title": "Creating learning experiences",
    "paragraphs": [
      "We've designed and delivered everything from individual learning sessions and webinars to interactive workshops, retreats and multiweek online development programs — on scientific communication, writing, career development, leadership and professional skills.",
      "We've learned how to make complex subjects accessible and how to combine individual reflection with learning alongside others — not simply to transfer knowledge, but to help people discover something useful about themselves and leave with a clearer understanding of what they can do next."
    ]
  },
  {
    "id": "change",
    "number": "3",
    "title": "Guiding people and organizations through change",
    "paragraphs": [
      "We've advised leaders, teams and research institutions facing complex challenges and important decisions, helping people step into new responsibilities and rethink established approaches. Our experience spans executive leadership, talent development and organizational transformation.",
      "Through this work, we've learned why change is difficult: it rarely happens through advice alone. It requires understanding what matters, recognizing what holds people back and finding a realistic way to turn intentions into action."
    ]
  },
  {
    "id": "foundations",
    "number": "4",
    "title": "Bringing our experience to SparkLifeLab",
    "paragraphs": [
      "At SparkLifeLab, we bring three dimensions together:"
    ],
    "points": [
      "Decades of professional experience working with people, learning and change.",
      "Our own personal experience of exploring and navigating midlife.",
      "The ability to create structured, guided learning and development experiences."
    ],
    "after": [
      "Combining them allows us to offer accomplished professionals a structured, guided way to explore what matters to them now and to shape their next chapter — informed by professional expertise and by the understanding of people who have asked the same questions themselves."
    ]
  }
];

// Section 4 — "What we believe about midlife" (Revision 8 / preview r11, 24 Nov 2026).
// Approved copy supplied by Gunther Tress in chat, 24 Nov 2026 — used verbatim; guarded by tests/our-story.test.mjs.
export const SECTION_4 = {
  "eyebrow": "OUR PERSPECTIVE",
  "headline": "What we believe about midlife",
  "beliefs": [
    {
      "statement": "Midlife can be a turning point.",
      "text": "For too long, midlife has been associated with decline, settling for less or preparing for retirement. We see it differently. While midlife can bring real challenges, it can also open up a period of discovery, personal growth and new possibilities."
    },
    {
      "statement": "What matters to you can change over time.",
      "text": "Over the years, your experiences, interests and priorities have evolved. Questioning what you want from life does not diminish what you have achieved. It may simply mean that you are ready to give other things a more important place in your life."
    },
    {
      "statement": "Your next chapter doesn’t have to mean starting over.",
      "text": "You bring decades of experience, knowledge, abilities and relationships with you. The opportunity is to build on what you have developed, discover what else is possible and shape a future that reflects who you are today."
    }
  ],
  "conclusion": "We believe that midlife is not just a time to look back at what you have achieved. It is also a time to look forward to what you could still become."
} as const;

// Section 5 — "Your next step" (Revision 12, 24 Nov 2026). Approved copy supplied by Gunther Tress in chat,
// 24 Nov 2026 — used verbatim; guarded by tests/our-story.test.mjs. href = the main navigation CTA destination.
export const SECTION_5 = {
  "eyebrow": "YOUR NEXT STEP",
  "headline": "Every next chapter begins somewhere.",
  "text": "You don’t need to know exactly where you want to go. Our free Midlife Clarity Check helps you explore what matters most to you now.",
  "lines": [
    "You don’t need to know exactly where you want to go.",
    "Our free Midlife Clarity Check helps you explore what matters most to you now."
  ],
  "button": "TAKE THE FREE MIDLIFE CLARITY CHECK →",
  "href": "/#clarity-check"
} as const;
