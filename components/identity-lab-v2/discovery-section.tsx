"use client";

import { useState } from "react";

// Identity Lab V2 — Section 2 "Why this matters" (approved design: Iteration 5).
// Copy is the approved Round 2 wording, used verbatim.
// Typography comes from the site's own classes (.eyebrow, h2, h3, p) so it
// matches the Identity Lab V2 page by construction.

const DIMENSIONS = [
  {
    id: "matters",
    title: "What matters to me now?",
    context: "As life changes, so do the things that give it meaning.",
    reflection:
      "Think about a moment recently when you felt that something was genuinely important to you. What made that moment meaningful?",
  },
  {
    id: "alive",
    title: "What makes me come alive?",
    context: "Some experiences leave us feeling energized, inspired, and more ourselves.",
    reflection:
      "When did you last feel genuinely alive and energized by something you were doing? What was it about that experience that made you feel this way?",
  },
  {
    id: "natural",
    title: "What comes naturally to me?",
    context: "Some of our greatest strengths feel so natural that we barely recognize them.",
    reflection:
      "What do you find surprisingly easy that others often struggle with? And which of these strengths do you genuinely enjoy using?",
  },
  {
    id: "letgo",
    title: "What am I ready to let go of?",
    context: "Some roles and expectations that once suited us no longer feel right.",
    reflection:
      "Is there something you keep doing because you’ve always done it, or because others expect it of you—even though it no longer feels right?",
  },
] as const;

export function DiscoverySection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section s2p-section" aria-labelledby="s2p-heading">
      <div className="section-inner">
        <header className="s2p-head">
          <p className="eyebrow">WHY THIS MATTERS</p>
          <h2 id="s2p-heading">Who have you become?</h2>
          <p className="s2p-body">
            You’ve spent decades building your career and your life. But the priorities and
            ambitions that guided you twenty years ago may no longer reflect what matters most to
            you today.
          </p>
        </header>

        <div className="s2p-ask">
          <h3 className="s2p-question" id="s2p-question">
            What are you most curious about?
          </h3>
          <p className="s2p-cue">
            {/* only one is shown: "Tap" on touch devices, "Click" with a mouse (see section-2.css) */}
            <span className="s2p-cue-click">Click a question to explore.</span>
            <span className="s2p-cue-tap">Tap a question to explore.</span>
          </p>
        </div>

        <ul className="s2p-board" aria-labelledby="s2p-question" data-open={active !== null}>
          {DIMENSIONS.map((d, i) => {
            const open = active === i;
            return (
              <li
                key={d.id}
                className="s2p-item"
                data-open={open}
                style={{ ["--n" as string]: i }}
              >
                <h3 className="s2p-title">
                  <button
                    type="button"
                    id={`s2p-btn-${d.id}`}
                    className="s2p-panel"
                    aria-expanded={open}
                    aria-controls={`s2p-ref-${d.id}`}
                    onClick={() => setActive(open ? null : i)}
                  >
                    <span className="s2p-panel-text">{d.title}</span>
                    <span className="s2p-panel-mark" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`s2p-ref-${d.id}`}
                  className="s2p-reflect"
                  role="region"
                  aria-labelledby={`s2p-btn-${d.id}`}
                >
                  <div className="s2p-reflect-clip">
                    <div className="s2p-reflect-inner">
                      <div className="s2p-reflection">
                        <p className="s2p-reflection-context">{d.context}</p>
                        <p className="s2p-reflection-q">{d.reflection}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="s2p-closing">
          <p>
            These are just some of the questions we explore in the Identity Lab. Understanding who
            you’ve become is the starting point for discovering what comes next.
          </p>
        </footer>
      </div>
    </section>
  );
}
