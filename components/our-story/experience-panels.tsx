"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { EXPERIENCE_PANELS, SECTION_2 } from "./content";

// Our Story — Section 2 "More than 70 years of combined professional experience".
// Revision 2 (23 Nov 2026): a light section with four equal selectors and ONE shared content area below.
// Only one panel's full text is shown at a time; panel 1 is selected on load so the area is never empty.
// Headline, introduction, outlined "70+" and the closing statement are always visible.
//
// Accessibility (WAI-ARIA tabs pattern, automatic activation)
// - role="tablist" / "tab" / "tabpanel", aria-selected, aria-controls, aria-labelledby.
// - Roving tabindex: Tab enters the selected selector; ←/→ (and ↑/↓) move and select; Home/End jump.
//   Tab again moves into the shared content area (tabIndex 0).
// - Selected state is shown without relying on colour alone: inverted tile, thicker top bar,
//   a different icon (arrow vs plus), the word "Selected", and (desktop) a notch pointing to the content.
// - Without JavaScript, the <noscript> rule shows every panel's full text in sequence.
// - Reduced motion: the content fade is switched off (see our-story.css).

export function ExperiencePanels() {
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
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <section className="os2" aria-labelledby={`${baseId}-title`}>
      <noscript>
        <style>{`.os2-tabpanel[hidden]{display:block!important}.os2-tabpanel+.os2-tabpanel{margin-top:1rem}`}</style>
      </noscript>

      <div className="os2-inner">
        <header className="os2-head">
          <div className="os2-head-copy">
            <p className="eyebrow">{SECTION_2.eyebrow}</p>
            <h2 id={`${baseId}-title`}>{SECTION_2.headline}</h2>
            <p className="os2-intro">{SECTION_2.intro}</p>
          </div>
          <p className="os2-figure" aria-hidden="true">
            70<span>+</span>
          </p>
        </header>

        <div className="os2-selectors" role="tablist" aria-label="Areas of our professional experience">
          {EXPERIENCE_PANELS.map((panel, index) => {
            const selected = index === active;
            return (
              <button
                key={panel.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${baseId}-tab-${panel.id}`}
                type="button"
                role="tab"
                className={`os2-tab os2-tab--${panel.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${panel.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="os2-tab-top">
                  <span className="os2-num">
                    {panel.number}
                    <span className="os2-num-dot">.</span>
                  </span>
                  <PanelMotif index={index} className="os2-tab-motif" />
                </span>{" "}
                <span className="os2-tab-title">{panel.title}</span>
                <span className="os2-cue" aria-hidden="true">
                  <span className="os2-cue-icon" />
                  <span className="os2-cue-label">{selected ? "Selected" : "Read more"}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="os2-stage">
          {EXPERIENCE_PANELS.map((panel, index) => (
            <div
              key={panel.id}
              id={`${baseId}-panel-${panel.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${panel.id}`}
              className={`os2-tabpanel os2-tabpanel--${panel.id}`}
              tabIndex={0}
              hidden={index !== active}
            >
              <div className="os2-tabpanel-art" aria-hidden="true">
                <span className="os2-art-disc">
                  <PanelMotif index={index} className="os2-panel-motif" />
                </span>
              </div>
              <div className="os2-tabpanel-copy">
                <h3>{panel.title}</h3>
                {panel.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="os2-closing">{SECTION_2.closing}</p>
      </div>
    </section>
  );
}

// Fine-line motifs (decorative only), drawn on one 160 × 100 grid:
// 1 conversation — two speech forms turned toward each other, meeting in a shared thought
// 2 learning     — an open book with ideas rising from its pages
// 3 change       — the old route continuing (dashed) while a new path turns and rises
// 4 together     — three separate paths converging into one spark and continuing as one line
function PanelMotif({ index, className }: { index: number; className: string }) {
  return (
    <svg className={`os2-motif ${className}`} viewBox="0 0 160 100" aria-hidden="true" focusable="false">
      {index === 0 && (
        <g>
          <path className="os2-m-line" d="M24 30 C 24 18, 36 12, 54 12 L 70 12 C 88 12, 98 20, 98 32 C 98 44, 88 52, 70 52 L 52 52 L 38 64 L 41 51 C 30 48, 24 40, 24 30 Z" />
          <path className="os2-m-line os2-m-fill" d="M136 58 C 136 46, 124 40, 106 40 L 92 40 C 74 40, 64 48, 64 60 C 64 72, 74 80, 92 80 L 108 80 L 122 91 L 119 78 C 130 75, 136 68, 136 58 Z" />
          <circle className="os2-m-dot" cx="88" cy="60" r="2.6" />
          <circle className="os2-m-dot" cx="100" cy="60" r="2.6" />
          <circle className="os2-m-dot" cx="112" cy="60" r="2.6" />
        </g>
      )}
      {index === 1 && (
        <g>
          <path className="os2-m-line" d="M80 88 C 66 80, 46 78, 26 82 L 26 46 C 46 42, 66 44, 80 52 Z" />
          <path className="os2-m-line" d="M80 88 C 94 80, 114 78, 134 82 L 134 46 C 114 42, 94 44, 80 52 Z" />
          <path className="os2-m-line os2-m-soft" d="M80 52 L 80 88" />
          <path className="os2-m-accent" d="M80 40 L 80 14" />
          <path className="os2-m-accent" d="M64 42 L 54 22" />
          <path className="os2-m-accent" d="M96 42 L 106 22" />
          <circle className="os2-m-dot" cx="80" cy="9" r="3" />
        </g>
      )}
      {index === 2 && (
        <g>
          <path className="os2-m-line os2-m-dashed" d="M14 74 L 146 74" />
          <path className="os2-m-line" d="M14 74 L 52 74 C 76 74, 82 66, 92 50 S 116 22, 138 20" />
          <path className="os2-m-accent" d="M128 13 L 140 20 L 129 28" />
          <circle className="os2-m-ring" cx="52" cy="74" r="4" />
        </g>
      )}
      {index === 3 && (
        <g>
          <path className="os2-m-line" d="M12 18 C 44 20, 64 40, 94 50" />
          <path className="os2-m-line" d="M12 50 L 94 50" />
          <path className="os2-m-line" d="M12 82 C 44 80, 64 60, 94 50" />
          <circle className="os2-m-ring" cx="12" cy="18" r="3" />
          <circle className="os2-m-ring" cx="12" cy="50" r="3" />
          <circle className="os2-m-ring" cx="12" cy="82" r="3" />
          <path className="os2-m-accent" d="M104 50 L 150 50" />
          <path className="os2-m-accent" d="M100 38 L 100 62 M 91.5 41.5 L 108.5 58.5 M 108.5 41.5 L 91.5 58.5" />
        </g>
      )}
    </svg>
  );
}
