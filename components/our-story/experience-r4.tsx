"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { EXPERIENCE_PANELS, SECTION_2, SECTION_2_INTRO_R13 } from "./content";

// Our Story — Section 2, REVISION 4 (23 Nov 2026), refined in REVISION 13 (25 Nov 2026): new introduction with
// our professional backgrounds, shortened areas, Area 4 as the culmination, four visual concepts.
// Builds on the R3 path concept.
// R2 (cards) and R3 (winding path) remain in ./experience-panels.tsx and ./experience-path.tsx.
//
// - A slim navigation column: a small label, then the four areas on a straight, thin line that ends
//   in the genuine SparkLifeLab brand spark (CSS mask of /images/sparklifelab-spark.png).
//   No numbers: these are areas of the experience we bring, not steps a visitor goes through.
// - A wider text column and a slightly narrower photograph, top-aligned with the text.
// - Panels are stacked in one grid cell on wide screens, so the section height never changes.
//
//
// Accessibility: WAI-ARIA tabs (vertical, automatic activation, roving tabindex; ↑/↓/←/→, Home/End);
// the selected area is shown by a filled node, heavier type and an underline, not by colour alone.
// Without JavaScript all four texts are shown; reduced motion removes the cross-fade.

// ─── Revision 14 (25 Nov 2026): four illustrative photographic metaphors ─────────────────────────────
// Generated illustrations (Canva AI), approved as a visual concept by the founders; they are metaphors for each
// area and do not document our professional work or clients. Image 4 is a generated photograph whose drawn
// "SparkLifeLab" was replaced in post-production with the official wordmark and brand spark
// (/images/sparklifelab-wordmark.png). All 960 × 1200 (4:5), ~80–160 KB. To swap an image, replace `src`/`alt`.
type Visual = { src: string; alt: string; focus: string };

const VISUALS: Record<string, Visual> = {
  people: {
    src: "/images/our-story/experience-1-chairs.jpg",
    alt: "Illustration: two white wooden chairs facing each other across a small round table in soft window light.",
    focus: "50% 50%",
  },
  learning: {
    src: "/images/our-story/experience-2-notebook.jpg",
    alt: "Illustration: an open notebook with handwritten notes and a simple diagram linking Ideas, Try and Learn, with colored pencils and two books nearby.",
    focus: "50% 50%",
  },
  change: {
    src: "/images/our-story/experience-3-staircase.jpg",
    alt: "Illustration: a gently curving staircase in a bright, white architectural space lit by daylight.",
    focus: "50% 50%",
  },
  foundations: {
    src: "/images/our-story/experience-4-convergence.jpg",
    alt: "Illustration: a hand drawing three overlapping circles labeled Professional expertise, Personal midlife experience and Learning and development, with SparkLifeLab at their center.",
    focus: "50% 50%",
  },
};

/** Proposed small navigation label (new wording, for approval). */
export const R4_NAV_LABEL = "Four areas of our experience";
/** Proposed caption under the outlined 70+ (new wording, for approval). */
export const R4_FIGURE_LABEL = "years of experience";

export function ExperienceR4() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const count = EXPERIENCE_PANELS.length;

  const select = (index: number, focus = false) => {
    const next = (index + count) % count;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <section className="os4" aria-labelledby={`${baseId}-title`}>
      <noscript>
        <style>{`.os4-panel{visibility:visible!important;display:grid!important;grid-area:auto!important;opacity:1!important}.os4-panels{row-gap:3rem}`}</style>
      </noscript>

      <div className="os4-inner">
        <header className="os4-head">
          <div className="os4-head-copy">
            <p className="eyebrow">{SECTION_2.eyebrow}</p>
            <h2 id={`${baseId}-title`}>{SECTION_2.headline}</h2>
            {SECTION_2_INTRO_R13.map((paragraph, i) => (
              <p className="os4-intro" key={i}>
                {paragraph.map((segment) =>
                  segment.href ? (
                    <a key={segment.text} href={segment.href} target="_blank" rel="noopener noreferrer">
                      {segment.text}
                      <span className="os-sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    segment.text
                  ),
                )}
              </p>
            ))}
          </div>
          <div className="os4-figure" aria-hidden="true">
            <span className="os4-figure-num">
              70<span className="os4-figure-plus">+</span>
            </span>
            <span className="os4-figure-label">{R4_FIGURE_LABEL}</span>
          </div>
        </header>

        <div className="os4-body">
          <div className="os4-nav">
            <p className="os4-nav-label" id={`${baseId}-navlabel`}>
              {R4_NAV_LABEL}
            </p>
            <div className="os4-tabs" role="tablist" aria-orientation="vertical" aria-labelledby={`${baseId}-navlabel`}>
              {EXPERIENCE_PANELS.map((panel, index) => {
                const selected = index === active;
                const last = index === count - 1;
                return (
                  <button
                    key={panel.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`${baseId}-tab-${panel.id}`}
                    type="button"
                    role="tab"
                    className={`os4-tab${last ? " os4-tab--last" : ""}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${panel.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    <span className={last ? "os4-node os4-node--spark brand-spark" : "os4-node"} aria-hidden="true" />
                    <span className="os4-tab-label">{panel.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="os4-panels">
            {EXPERIENCE_PANELS.map((panel, index) => {
              const visual = VISUALS[panel.id];
              const selected = index === active;
              return (
                <div
                  key={panel.id}
                  id={`${baseId}-panel-${panel.id}`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-tab-${panel.id}`}
                  className="os4-panel"
                  data-active={selected ? "true" : "false"}
                  aria-hidden={selected ? undefined : true}
                  tabIndex={selected ? 0 : -1}
                >
                  <div className="os4-copy">
                    <h3>{panel.title}</h3>
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {panel.points ? (
                      <ul className="os4-points">
                        {panel.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                    {panel.after?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <figure className={panel.id === "foundations" ? "os4-photo os4-photo--drawing" : "os4-photo"}>
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      width={960}
                      height={1200}
                      sizes="(max-width: 760px) 92vw, (max-width: 1100px) 80vw, 310px"
                      style={{ objectPosition: visual.focus }}
                    />
                  </figure>
                </div>
              );
            })}
          </div>
        </div>

        {/* R13: the former closing line was removed — Area 4 now carries "bringing it together". */}
      </div>
    </section>
  );
}
