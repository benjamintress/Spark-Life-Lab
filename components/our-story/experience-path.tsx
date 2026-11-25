"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { EXPERIENCE_PANELS, SECTION_2 } from "./content";

// Our Story — Section 2, ALTERNATIVE "path" design (revision 3, 23 Nov 2026).
// Revision 2 (four selector cards) remains available in ./experience-panels.tsx for comparison.
//
// Idea: the four areas of experience sit along one meandering line — a narrative thread, not a
// numbered method. It runs from work with individuals, through learning and organizational change, and
// ends in a small spark: where it all comes together at SparkLifeLab. Selecting an area shows its full
// approved text beside the path, with one of our own photographs from the California coast.
//
// Accessibility (WAI-ARIA tabs, vertical, automatic activation)
// - role="tablist" (aria-orientation="vertical") / "tab" / "tabpanel"; roving tabindex.
// - ↑/↓ (and ←/→) move and select; Home/End jump; Tab moves into the selected text.
// - Selected state is not colour-only: filled node with a ring, underline on the heading.
// - Inactive panels are visibility:hidden (desktop, so the layout never jumps) or display:none
//   (mobile), which removes them from keyboard and screen-reader access either way.
// - No JavaScript: every panel is shown in sequence (noscript rule). Reduced motion: no fades.

const PHOTOS: Record<string, { src: string; alt: string; focus: string }> = {
  people: {
    src: "/images/our-story/experience-people.jpg",
    alt: "Two sets of footprints walking side by side across a sunlit beach toward the sea.",
    focus: "28% 70%",
  },
  learning: {
    src: "/images/our-story/experience-learning.jpg",
    alt: "A walker in a sun hat pausing on a clifftop to look out over a wide beach and the ocean.",
    focus: "8% 60%",
  },
  change: {
    src: "/images/our-story/experience-change.jpg",
    alt: "A hawk gliding high above layered mountain ridges in soft, hazy light.",
    focus: "32% 40%",
  },
  foundations: {
    src: "/images/our-story/experience-together.jpg",
    alt: "A wide, curving bay with turquoise water, where two people sit together on the sand.",
    focus: "86% 60%",
  },
};

// Horizontal offsets (px) of the nodes, so the line meanders gently instead of forming a rigid ladder.
const OFFSETS = [0, 20, 8, 26];

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ExperiencePath() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pathBox = useRef<HTMLDivElement | null>(null);
  const [d, setD] = useState("");
  const count = EXPERIENCE_PANELS.length;

  // Draw a smooth curve through the node centres (Catmull-Rom → cubic Bézier).
  const drawPath = useCallback(() => {
    const box = pathBox.current;
    if (!box) return;
    const origin = box.getBoundingClientRect();
    const pts = nodeRefs.current
      .map((node) => node?.getBoundingClientRect())
      .filter((r): r is DOMRect => Boolean(r))
      .map((r) => ({ x: r.left + r.width / 2 - origin.left, y: r.top + r.height / 2 - origin.top }));
    if (pts.length < 2) return;
    const all = [{ x: pts[0].x - 4, y: pts[0].y - 34 }, ...pts];
    let path = `M ${all[0].x.toFixed(1)} ${all[0].y.toFixed(1)}`;
    for (let i = 0; i < all.length - 1; i++) {
      const p0 = all[i - 1] ?? all[i];
      const p1 = all[i];
      const p2 = all[i + 1];
      const p3 = all[i + 2] ?? p2;
      const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
      const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
      path += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    setD(path);
  }, []);

  useIsoLayoutEffect(() => {
    drawPath();
    const box = pathBox.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(drawPath);
    observer.observe(box);
    return () => observer.disconnect();
  }, [drawPath]);

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
    <section className="os2p" aria-labelledby={`${baseId}-title`}>
      <noscript>
        <style>{`.os2p-panel{visibility:visible!important;display:grid!important;grid-area:auto!important;opacity:1!important}.os2p-panels{gap:2.5rem}`}</style>
      </noscript>

      <div className="os2p-inner">
        <header className="os2p-head">
          <p className="os2p-figure" aria-hidden="true">
            70<span>+</span>
          </p>
          <p className="eyebrow">{SECTION_2.eyebrow}</p>
          <h2 id={`${baseId}-title`}>{SECTION_2.headline}</h2>
          <p className="os2p-intro">{SECTION_2.intro}</p>
        </header>

        <div className="os2p-body">
          <div className="os2p-path" ref={pathBox}>
            <svg className="os2p-line" aria-hidden="true" focusable="false">
              {d ? <path d={d} /> : null}
            </svg>
            <div className="os2p-tabs" role="tablist" aria-orientation="vertical" aria-label="Areas of our professional experience">
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
                    className="os2p-tab"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${panel.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    style={{ "--offset": `${OFFSETS[index]}px` } as CSSProperties}
                  >
                    <span
                      className={`os2p-node${last ? " os2p-node--spark" : ""}`}
                      ref={(node) => {
                        nodeRefs.current[index] = node;
                      }}
                      aria-hidden="true"
                    >
                      {last ? (
                        <svg viewBox="0 0 24 24" focusable="false">
                          <path d="M12 0 C 12.9 7.2, 16.8 11.1, 24 12 C 16.8 12.9, 12.9 16.8, 12 24 C 11.1 16.8, 7.2 12.9, 0 12 C 7.2 11.1, 11.1 7.2, 12 0 Z" />
                        </svg>
                      ) : null}
                    </span>
                    <span className="os2p-label">{panel.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="os2p-panels">
            {EXPERIENCE_PANELS.map((panel, index) => {
              const photo = PHOTOS[panel.id];
              const selected = index === active;
              return (
                <div
                  key={panel.id}
                  id={`${baseId}-panel-${panel.id}`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-tab-${panel.id}`}
                  className="os2p-panel"
                  data-active={selected ? "true" : "false"}
                  aria-hidden={selected ? undefined : true}
                  tabIndex={selected ? 0 : -1}
                >
                  <div className="os2p-copy">
                    <h3>{panel.title}</h3>
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="os2p-photo">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={1800}
                      height={1200}
                      sizes="(max-width: 1000px) 92vw, 340px"
                      style={{ objectPosition: photo.focus }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="os2-closing os2p-closing">{SECTION_2.closing}</p>
      </div>
    </section>
  );
}
