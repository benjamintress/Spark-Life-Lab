"use client";

import { useId, useState } from "react";

// Identity Lab V2 — Section 5 "How it works" (approved design: Revision B).
// Mid Navy section. Part A: two columns (introduction | three facts). Part B: compact practical-questions accordion.
// The separate Identity Map block was removed (Section 3 explains it); it is only mentioned in the introduction.
//
// COPY SOURCES
//  - Eyebrow, headline: approved (Revision Notes, Section 5).
//  - Introduction and the shorter fact wording: from the owner's Section 5 brief, confirmed 17 Nov 2026.
//  - Identity Map: a simplified version of the approved 16 Nov meaning (synthesis of discoveries + possibilities ahead).
//  - "Four weeks" fact keeps the approved idea of independent guided online reflection at times that suit you.
//  See docs/identity-lab-v2/section5/NOTES.md.
//  - The four practical answers: verbatim from the V2 reference implementation (US spelling).

const FACTS = [
  { title: "Four weeks", text: "Guided online reflection that you complete independently, at times that suit you." },
  { title: "Three live group sessions", text: "90 minutes each, online, with the SparkLifeLab founders and fellow participants." },
  { title: "Up to 15 participants", text: "A small group where everyone has room to contribute." },
];

const FAQ = [
  {
    q: "When are the live group sessions?",
    a: "The Identity Lab includes three live online group sessions of 90 minutes each. You’ll receive the exact dates and times during the registration process, well in advance of the program, so you can check whether they fit your schedule before committing.",
  },
  {
    q: "Do I need any previous experience with personal development?",
    a: "No. You don’t need any previous experience. The Identity Lab guides you through the reflections step by step, so you can explore the questions at your own pace.",
  },
  {
    q: "Is the Identity Lab coaching or therapy?",
    a: "Neither. The Identity Lab is a guided program for personal reflection and self-discovery. It combines individual exploration with conversations in a small group. We provide structure, questions, and perspectives to help you discover your own answers.",
  },
  {
    q: "Do I need to complete the Midlife Clarity Check first?",
    a: "No. The Midlife Clarity Check is a free starting point for reflecting on where you are in life, but it isn’t a requirement for joining the Identity Lab.",
  },
  {
    q: "When does the next program start, and how do I register?",
    a: "The next Identity Lab is planned for 2027. Join the waitlist to receive information about the dates, program details, and registration when they become available. Joining the waitlist is free and does not commit you to participating.",
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState<number | null>(null); // all collapsed at first
  const base = useId();

  return (
    <section className="s5" aria-labelledby="s5-heading">
      <div className="s5-inner">
        {/* Level 1 + 2 — introduction and the essentials */}
        <div className="s5-row s5-top">
          <div className="s5-intro">
            <p className="s5-eyebrow">How it works</p>
            <h2 id="s5-heading">Four weeks to discover more about yourself.</h2>
            <p className="s5-lede">
              The Identity Lab combines guided personal reflection with live conversations in a small, supportive group.
            </p>
            <p className="s5-lede">
              Through guided reflection, you explore different dimensions of yourself at your own pace, exchange perspectives
              with others, and bring your discoveries together in your personal Identity Map.
            </p>
          </div>

          <div className="s5-facts-col">
            <h3 className="s5-visually-hidden">The programme at a glance</h3>
            <dl className="s5-facts">
              {FACTS.map((f) => (
                <div className="s5-fact" key={f.title}>
                  <dt>{f.title}</dt>
                  <dd>{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Practical questions */}
        <div className="s5-faq">
          <h3 className="s5-faq-label">Practical questions</h3>
          <ul className="s5-acc">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <li className="s5-acc-item" key={item.q}>
                  <h4>
                    <button
                      type="button"
                      className="s5-acc-btn"
                      aria-expanded={isOpen}
                      aria-controls={`${base}-p${i}`}
                      id={`${base}-b${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span>{item.q}</span>
                      <span className="s5-acc-icon" aria-hidden="true" />
                    </button>
                  </h4>
                  <div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!isOpen} className="s5-acc-panel">
                    <p>{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          {/*
            FUTURE (not active): when the two-page Identity Lab program guide (PDF) exists, add a quiet secondary link
            here, after the practical information and the questions:  "Download the Identity Lab Program Guide →"
            pointing at the real file in /public. Do not render a link or button until the PDF exists.
          */}
        </div>
      </div>
    </section>
  );
}
