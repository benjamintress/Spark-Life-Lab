"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { S4_CUE_CLICK, S4_CUE_TAP, S4_EYEBROW, S4_HEADLINE, S4_INTRO, STATIONS } from "./stations";

// Identity Lab V2 — Section 4 "Your Journey" (approved design: Prototype C3).
// C2 refined further (C3): full-width introduction, stronger hover/selected states, signboard
// a little lower, one-line titles where practical. Previously, C1 refined: the station sign is now a small hand-drawn signpost — a cream signboard
// near the photograph's lower-left edge whose slender pole reaches down to the "ground"
// at the bottom of the five-station list. The description sits to the right of the pole.
// Phones: the same editorial accordion, with a compact sign and a short pole.
//
// Photographs: provisional AI-generated assets (see docs/identity-lab-v2/section4/IMAGE-SOURCES.md).
// Stations 1, 2 and 4 are approved; 3 and 5 are PROVISIONAL picks from the C3 alternatives (no final selection made).

const PHOTOS = [
  { src: "/images/identity-lab-v2/journey-01.jpg", alt: "Warm light on layered sandstone rock strata, ochre and rust bands with rich texture." },
  { src: "/images/identity-lab-v2/journey-02.jpg", alt: "An open hand releasing a single pale feather into soft window light." },
  { src: "/images/identity-lab-v2/journey-03.jpg", alt: "A person in pale linen striding barefoot along a wide wet beach at sunset, the sky reflected in the sand." },
  { src: "/images/identity-lab-v2/journey-04.jpg", alt: "A tall arched opening in a concrete passage framing a sunlit landscape and the sea." },
  { src: "/images/identity-lab-v2/journey-05.jpg", alt: "One hand passing a small glowing paper lantern to another outstretched hand at blue hour." },
];

// Little hand-drawn doodle for each sign (Ember): strata · a feather released · a gust · an arch · pieces joined
function Doodle({ i }: { i: number }) {
  const common = { fill: "none", stroke: "#EF7C62", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className="s4e-doodle" viewBox="0 0 44 36" aria-hidden="true" focusable="false">
      {i === 0 && (
        <>
          <path d="M4 10 C 12 6, 20 13, 28 9 S 38 8, 40 10" {...common} />
          <path d="M4 18 C 12 14, 20 21, 28 17 S 38 16, 40 18" {...common} />
          <path d="M4 26 C 12 22, 20 29, 28 25 S 38 24, 40 26" {...common} />
        </>
      )}
      {i === 1 && (
        <>
          <path d="M30 4 C 22 8, 14 16, 12 28 C 20 24, 28 16, 30 4 Z" {...common} />
          <path d="M12 28 L 26 12" {...common} />
        </>
      )}
      {i === 2 && (
        <>
          <path d="M3 14 C 14 6, 22 20, 32 12 S 40 12, 41 15" {...common} />
          <path d="M5 24 C 14 18, 22 30, 31 23 S 38 23, 40 25" {...common} />
        </>
      )}
      {i === 3 && (
        <>
          <path d="M10 32 L 10 17 C 10 4, 34 4, 34 17 L 34 32" {...common} />
          <path d="M22 30 L 22 16 M 17 21 L 22 15 L 27 21" {...common} />
        </>
      )}
      {i === 4 && (
        <>
          <path d="M5 26 C 12 14, 20 30, 27 18 S 36 12, 40 14" {...common} strokeDasharray="1 5.5" />
          <circle cx="31" cy="9" r="4" {...common} />
        </>
      )}
    </svg>
  );
}

// Signboards: one family — a slightly irregular board with a gentle point toward the next step.
const BOARDS = [
  "M2 8 C 25 4, 55 9, 82 5 C 88 5, 93 26, 99 50 C 93 74, 88 95, 82 94 C 55 98, 25 93, 3 96 C 1 66, 3 34, 2 8 Z",
  "M3 6 C 26 9, 54 4, 83 7 C 89 7, 94 28, 99 50 C 94 72, 89 93, 83 94 C 54 92, 26 97, 2 94 C 4 64, 1 30, 3 6 Z",
  "M2 5 C 24 7, 56 5, 81 6 C 87 6, 93 24, 99 50 C 93 76, 87 96, 81 95 C 56 93, 22 98, 3 95 C 1 62, 4 34, 2 5 Z",
  "M3 7 C 22 3, 56 8, 84 4 C 90 4, 94 27, 99 50 C 94 73, 90 95, 84 96 C 57 93, 24 95, 2 93 C 3 66, 2 32, 3 7 Z",
  "M2 6 C 27 8, 52 3, 82 6 C 88 6, 94 25, 99 50 C 94 75, 88 94, 82 95 C 52 98, 25 92, 3 96 C 2 64, 4 33, 2 6 Z",
];
const TILTS = [-2.4, 1.8, -1.4, 2.2, -1.8];

// the pole: a fine, slightly wandering navy line with a little hand-drawn ground mark
function Pole() {
  return (
    <svg className="s4e-pole" aria-hidden="true" focusable="false" preserveAspectRatio="none" viewBox="0 0 10 100">
      <path d="M5.4 0 C 4.2 22, 6.2 44, 4.9 66 C 4.2 80, 5.6 92, 5.1 100" />
    </svg>
  );
}
function Ground() {
  return (
    <svg className="s4e-ground" viewBox="0 0 60 12" aria-hidden="true" focusable="false">
      <path d="M2 7 C 10 4, 18 9, 28 6 S 46 5, 58 7" />
      <path d="M22 6 L 20 1.5 M 27 6 L 27.5 1 M 32 6 L 34.5 2" />
    </svg>
  );
}

export function StationSign({ i }: { i: number }) {
  const s = STATIONS[i];
  return (
    <div className="s4e-sign" data-long={i === 3 ? "true" : undefined} style={{ ["--tilt" as string]: `${TILTS[i]}deg` }}>
      <svg className="s4e-board" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={BOARDS[i]} />
      </svg>
      <span className="s4e-pin" aria-hidden="true" />
      <span className="s4e-sign-num">Station {s.n}</span>
      <span className="s4e-sign-title">{s.title}</span>
      <Doodle i={i} />
    </div>
  );
}

export function StationsJourney() {
  const [sel, setSel] = useState(0); // desktop: always one station open
  const [open, setOpen] = useState<number | null>(0); // phone accordion
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRun = useRef(true);

  // phones: when another station opens, bring it back into view (the one above collapses)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (open === null || window.innerWidth > 800) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      const el = btnRefs.current[open];
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // "instant" (not "auto"): the site stylesheet sets html { scroll-behavior: smooth }, which "auto" would inherit
      el.scrollIntoView({ block: "start", behavior: reduce ? "instant" : "smooth" });
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName === "grid-template-rows") window.setTimeout(go, 30);
    };
    document.addEventListener("transitionend", onEnd);
    const t = window.setTimeout(go, 900);
    return () => {
      done = true;
      document.removeEventListener("transitionend", onEnd);
      window.clearTimeout(t);
    };
  }, [open]);

  const choose = (i: number) => {
    setSel(i);
    setOpen((o) => (o === i ? null : i));
  };

  return (
    <section className="section s4 s4e" aria-labelledby="s4e-heading">
      <div className="section-inner">
        <header className="s4e-head">
          <p className="eyebrow">{S4_EYEBROW}</p>
          <h2 id="s4e-heading">{S4_HEADLINE}</h2>
          <p className="s4-intro">{S4_INTRO}</p>
        </header>

        <div className="s4e-grid">
          <div className="s4e-nav">
            <p className="s4-cue">
              {/* only one is shown: "Tap" on touch devices, "Click" with a mouse (see section-4.css) */}
              <span className="s4-cue-click">{S4_CUE_CLICK}</span>
              <span className="s4-cue-tap">{S4_CUE_TAP}</span>
            </p>
            <ol className="s4e-list">
              {STATIONS.map((s, i) => (
                <li
                  key={s.n}
                  className="s4e-item"
                  data-sel={sel === i}
                  data-open={open === i}
                  data-done={i < sel}
                  data-reached={i <= sel}
                >
                  <span className="s4e-mark" aria-hidden="true" />
                  <h3>
                    <button
                      type="button"
                      className="s4e-btn"
                      ref={(el) => { btnRefs.current[i] = el; }}
                      aria-expanded={open === i}
                      aria-controls={`s4e-m-${i}`}
                      aria-current={sel === i ? "step" : undefined}
                      onClick={() => choose(i)}
                    >
                      <span className="s4e-num">Station {s.n}</span>
                      <span className="s4e-title">{s.title}</span>
                      <span className="s4e-benefit">{s.benefit}</span>
                    </button>
                  </h3>

                  {/* phones: photograph, compact sign and description open under the station */}
                  <div id={`s4e-m-${i}`} className="s4e-inline" data-open={open === i}>
                    <div className="s4e-inline-clip">
                      <figure className="s4e-photo s4e-photo--m">
                        <Image src={PHOTOS[i].src} alt={PHOTOS[i].alt} fill sizes="(max-width: 800px) 92vw, 640px" />
                      </figure>
                      <div className="s4e-stage s4e-stage--m">
                        <Pole />
                        <Ground />
                        <StationSign i={i} />
                        <p className="s4e-desc-m">{s.description}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* desktop: photograph, signpost and description */}
          <div className="s4e-panel" role="region" aria-live="polite" aria-label="Station photograph and description">
            <figure className="s4e-photo">
              {PHOTOS.map((p, i) => (
                <Image
                  key={p.src}
                  src={p.src}
                  alt={sel === i ? p.alt : ""}
                  aria-hidden={sel === i ? undefined : true}
                  fill
                  sizes="(max-width: 1200px) 58vw, 680px"
                  className="s4e-img"
                  data-on={sel === i}
                />
              ))}
            </figure>
            <div className="s4e-stage">
              <Pole />
              <Ground />
              <div key={sel} className="s4e-sign-wrap">
                <StationSign i={sel} />
              </div>
              <p key={`d${sel}`} className="s4e-desc">
                {STATIONS[sel].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
