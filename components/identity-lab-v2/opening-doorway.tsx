"use client";

import { useLayoutEffect, useRef } from "react";
import { IDENTITY_LAB_ACTION_HREF, IDENTITY_LAB_CTA_LABEL } from "@/lib/identity-lab-config";

// Identity Lab V2 — Section 3 "What becomes possible" (approved design C4.2, revised 18 Nov 2026):
//  · the four names stay visible through Discover and Connect, travel with their arches and settle on their own
//    band of the combined shape, and only fade as the opening begins — so the story is never lost;
//  · calmer timing and a longer scroll; "New possibilities" in the site serif, Deep Navy for contrast;
//  · phones get their own composition: wider arches, horizontal names, the animation across the full content
//    width, headline and question first, then the animation pinned on its own, then the supporting text.
// Scroll-driven and reversible; transforms / opacity / a few path updates only.

const CX = 300;
const CY = 250; // shared arch centre → shapes stay concentric
const BASE = 580;

type Layer = {
  label: string;
  ro0: number; // outer radius as part of the merged shape
  ro1: number; // outer radius once the opening has expanded
  t0: number; // ring thickness while merged (solid stack)
  t1: number; // ring thickness as a fine line (ignored for the innermost, solid shape)
  color: string;
  text: string; // label colour (navy on light shapes, paper on dark ones)
  dx: number; // 2 × 2 grid position, relative to the base centre of the nest
  dy: number;
};

// Discover geometry: four identical upright arches (170 × 250)
const D_R = 85;
const D_STRAIGHT = 165;
const D_R_NARROW = 118; // phones: 236 × 260 arches in the same 2 × 2 grid
const D_STRAIGHT_NARROW = 142;
const N_STRAIGHT = 330; // straight part of the nested arches (arc centre at CY)

const LAYERS: Layer[] = [
  { label: "Strengths", ro0: 228, ro1: 228, t0: 38, t1: 34, color: "#C5C7D3", text: "#202841", dx: -135, dy: -280 },
  { label: "Interests", ro0: 190, ro1: 186, t0: 38, t1: 6, color: "#8B8FA6", text: "#202841", dx: 135, dy: -280 },
  { label: "Values", ro0: 152, ro1: 168, t0: 38, t1: 5, color: "#4D5772", text: "#FEFDF8", dx: -135, dy: 20 },
  { label: "Experiences", ro0: 114, ro1: 150, t0: 114, t1: 4, color: "#202841", text: "#FEFDF8", dx: 135, dy: 20 },
];

const FIELD_R = 190;
const FINAL_R = 146; // radius of the finished opening (matches C3)
const VB_W = 600;
const VB_H = 660;

// Timeline (fractions of the scroll range)
const T = {
  enter: [0, 0.1] as const, // Discover: arches scale in (then a long, readable hold until .28)
  join: [0.28, 0.48] as const, // Connect: they widen and move together, names travelling with them
  labelOut: [0.6, 0.67] as const, // names fade only as the opening begins
  open: [0.6, 0.8] as const, // Envision: the light opening emerges and expands
  words: [0.74, 0.84] as const, // "New possibilities"
  outroA: [0.88, 0.94] as const, // supporting sentence waits for the visual to finish
  outroB: [0.94, 1] as const,
};
const DOT_ANCHORS = [0.04, 0.38, 0.74]; // progress at which the dot rests at each stage
const STAGE_SPLITS = [0.28, 0.6]; // active stage boundaries

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const span = (p: number, [a, b]: readonly [number, number]) => clamp((p - a) / (b - a));

const archOpen = (r: number, cy = CY, bottom = BASE) =>
  `M ${CX - r} ${bottom} V ${cy} A ${r} ${r} 0 0 1 ${CX + r} ${cy} V ${bottom}`;
const archFull = (r: number) => `${archOpen(r)} Z`;
const archShape = (r: number, straight: number) =>
  `M ${CX - r} ${BASE} V ${BASE - straight} A ${r} ${r} 0 0 1 ${CX + r} ${BASE - straight} V ${BASE} Z`;
const ringPath = (ro: number, ri: number) =>
  `M ${CX - ro} ${BASE} V ${CY} A ${ro} ${ro} 0 0 1 ${CX + ro} ${CY} V ${BASE} ` +
  `H ${CX + ri} V ${CY} A ${ri} ${ri} 0 0 0 ${CX - ri} ${CY} V ${BASE} Z`;

const STAGES = ["Discover", "Connect", "Envision"] as const;

export function OpeningDoorway() {
  const trackRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ pinned: 780, track: 2000 });
  const stageRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fieldRef = useRef<SVGPathElement>(null);
  const openingRef = useRef<SVGPathElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);
  const baseRef = useRef<SVGLineElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const stageWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const outroARef = useRef<HTMLParagraphElement>(null);
  const outroBRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLParagraphElement>(null);
  const anchorsX = useRef<number[]>([0, 0, 0]);
  const progW = useRef(1);
  const dotW = useRef(11);
  const lastP = useRef(-1);

  const measure = () => {
    const narrow = window.innerWidth <= 800;
    geo.current = {
      pinned: visualRef.current?.offsetHeight ?? 780,
      track: (narrow ? animRef.current : trackRef.current)?.offsetHeight ?? 2000,
    };
    dotW.current = dotRef.current?.offsetWidth ?? 11;
    progW.current = progressRef.current?.offsetWidth || 1;
    anchorsX.current = stageWordRefs.current.map((w) => (w ? w.offsetLeft - (dotW.current + 5) : 0));
  };

  const apply = (p: number) => {
    const k = (stageRef.current?.getBoundingClientRect().width ?? VB_W) / VB_W;
    const open = ease(span(p, T.open));
    const labelOut = 1 - ease(span(p, T.labelOut));
    const narrow = window.innerWidth <= 800;
    const dR = narrow ? D_R_NARROW : D_R; // phones: wider arches so the names fit horizontally
    const dS = narrow ? D_STRAIGHT_NARROW : D_STRAIGHT;

    LAYERS.forEach((l, i) => {
      const eIn = ease(clamp((p - i * 0.02) / (T.enter[1] - T.enter[0])));
      const m = ease(clamp((p - T.join[0] - i * 0.015) / (T.join[1] - T.join[0])));

      // upright, no rotation: scale in with a slight rise, then glide to the centre
      const tx = lerp(l.dx, 0, m);
      const ty = lerp(l.dy + 22 * (1 - eIn), 0, m);
      const s = lerp(0.82, 1, eIn);

      const g = groupRefs.current[i];
      if (g) {
        g.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
        g.style.opacity = String(eIn);
      }

      // geometry: identical arches → the nested radii (widen as they join)
      const r = lerp(dR, l.ro0, m);
      const straight = lerp(dS, N_STRAIGHT, m);
      const path = pathRefs.current[i];
      if (path) {
        const ro = lerp(l.ro0, l.ro1, open);
        const innermost = i === LAYERS.length - 1;
        let d: string;
        if (open <= 0) d = archShape(r, straight);
        else if (innermost) d = archFull(ro);
        else d = ringPath(ro, ro - lerp(l.t0, l.t1, open));
        path.setAttribute("d", d);
      }

      // each name sits in the middle of its own arch, travels with it, and settles on its own band of the
      // combined shape; it only fades once the opening begins
      const lab = labelRefs.current[i];
      if (lab) {
        const vy = -(straight + r) / 2;
        const bandY = i < LAYERS.length - 1 ? CY - l.ro0 + l.t0 / 2 : CY - l.ro0 + 34;
        const x = (CX + tx) * k;
        const archY = BASE + ty + s * vy;
        const y = lerp(archY, bandY, m) * k;
        const sc = lerp(1, narrow ? 0.9 : 0.86, m);
        lab.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${sc})`;
        lab.style.opacity = String(clamp((eIn - 0.4) / 0.6) * labelOut);
      }
    });

    if (baseRef.current) baseRef.current.style.transform = `scaleX(${ease(span(p, [0.42, 0.54]))})`;

    // the white opening: a small shape in the centre that grows into the final arch
    const r = FINAL_R * open;
    const cyO = lerp(415, CY, open);
    const yb = lerp(440, BASE, open);
    const opening = openingRef.current;
    if (opening) {
      opening.setAttribute("d", r < 0.5 ? "" : `M ${CX - r} ${yb} V ${cyO} A ${r} ${r} 0 0 1 ${CX + r} ${cyO} V ${yb} Z`);
    }
    const edge = edgeRef.current;
    if (edge) {
      edge.setAttribute("d", r < 0.5 ? "" : `M ${CX - r} ${yb} V ${cyO} A ${r} ${r} 0 0 1 ${CX + r} ${cyO} V ${yb}`);
      edge.style.opacity = String(ease(clamp(open / 0.25)));
    }
    if (fieldRef.current) fieldRef.current.style.opacity = String(ease(clamp((open - 0.15) / 0.4)) * 0.5);

    const w = wordsRef.current;
    if (w) {
      const o = ease(span(p, T.words));
      w.style.opacity = String(o);
      w.style.transform = `translate(-50%, calc(-50% + ${(1 - o) * 8}px))`;
    }

    // Discover — Connect — Envision indicator
    const active = p < STAGE_SPLITS[0] ? 0 : p < STAGE_SPLITS[1] ? 1 : 2;
    const prog = progressRef.current;
    if (prog) prog.style.opacity = String(clamp(p / 0.03));
    stageWordRefs.current.forEach((el, i) => {
      if (!el) return;
      const on = i === active;
      el.style.color = on ? "var(--navy)" : "var(--slate)";
      el.style.fontWeight = on ? "600" : "500";
    });
    const [a0, a1, a2] = DOT_ANCHORS;
    const [x0, x1, x2] = anchorsX.current;
    const x = p <= a0 ? x0 : p <= a1 ? lerp(x0, x1, (p - a0) / (a1 - a0)) : p <= a2 ? lerp(x1, x2, (p - a1) / (a2 - a1)) : x2;
    if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, -50%)`;
    // the line behind the dot turns Ember, up to the active stage
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${clamp((x + dotW.current / 2) / progW.current)})`;

    const a = outroARef.current;
    if (a) {
      const o = span(p, T.outroA);
      a.style.opacity = String(o);
      a.style.transform = `translateY(${(1 - o) * 10}px)`;
    }
    const b2 = outroBRef.current;
    if (b2) {
      const o = span(p, T.outroB);
      b2.style.opacity = String(o);
      b2.style.transform = `translateY(${(1 - o) * 10}px)`;
    }
    // the waitlist button appears together with the last sentence (hidden and unfocusable until then)
    const c = ctaRef.current;
    if (c) {
      const o = span(p, T.outroB);
      c.style.opacity = String(o);
      c.style.transform = `translateY(${(1 - o) * 10}px)`;
      c.style.visibility = o > 0.02 ? "visible" : "hidden";
    }
  };

  useLayoutEffect(() => {
    measure();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    let raf = 0;
    const update = (force = false) => {
      raf = 0;
      const anchor = anchorRef.current;
      if (!anchor) return;
      const vh = window.innerHeight;
      const narrow = window.innerWidth <= 800;
      // where the animation starts (fraction of the viewport the section's top has reached),
      // where the pinned frame sticks, and how long the finished state is held
      const start = vh * (narrow ? 0.5 : 0.56);
      const pinTop = narrow ? 70 : 92;
      const hold = vh * 0.25;
      const range = start - pinTop + (geo.current.track - geo.current.pinned) - hold;
      const p = range > 0 ? clamp((start - anchor.getBoundingClientRect().top) / range) : 1;
      if (!force && Math.abs(p - lastP.current) < 0.0004) return;
      lastP.current = p;
      apply(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => update());
    };
    const onResize = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(() => update(true));
    };
    update(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => {
      measure();
      update(true);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section s3h" aria-labelledby="s3h-heading">
      <div className="section-inner">
        <div className="s3h-track" ref={trackRef}>
          <div className="s3h-frame" ref={frameRef}>
          <div className="s3h-anim" ref={animRef}>
          <span className="s3h-anchor" ref={anchorRef} aria-hidden="true" />
          <div className="s3h-visual" ref={visualRef}>
            <p className="s3h-sr">
              Four dimensions of who you are — strengths, interests, values and experiences — come
              together, and an opening reveals new possibilities.
            </p>
            <div className="s3h-stage" ref={stageRef}>
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} focusable="false" aria-hidden="true">
                <path ref={fieldRef} className="s3h-field" d={archFull(FIELD_R)} />
                <line ref={baseRef} className="s3h-base" x1="60" y1={BASE} x2="540" y2={BASE} />
                {LAYERS.map((l, i) => (
                  <g key={l.label} className="s3h-shape" ref={(el) => { groupRefs.current[i] = el; }}>
                    <path ref={(el) => { pathRefs.current[i] = el; }} d={archShape(D_R, D_STRAIGHT)} fill={l.color} />
                  </g>
                ))}
                <path ref={openingRef} className="s3h-opening" d="" />
                <path ref={edgeRef} className="s3h-edge" d="" />
              </svg>
              {LAYERS.map((l, i) => (
                <span
                  key={l.label}
                  className="s3h-label"
                  aria-hidden="true"
                  style={{ color: l.text }}
                  ref={(el) => { labelRefs.current[i] = el; }}
                >
                  <span className="s3h-label-text">{l.label}</span>
                </span>
              ))}
              <p className="s3h-words" ref={wordsRef}>
                New possibilities
              </p>
            </div>
            <p className="s3h-dims">Strengths · Interests · Values · Experiences</p>

            <div className="s3h-progress" ref={progressRef} aria-hidden="true">
              <span className="s3h-line" />
              <span className="s3h-line-fill" ref={fillRef} />
              {STAGES.map((w, i) => (
                <span key={w} className="s3h-stage-word" ref={(el) => { stageWordRefs.current[i] = el; }}>
                  {w}
                </span>
              ))}
              <span className="s3h-dot" ref={dotRef} />
            </div>
          </div>
          </div>

          <div className="s3h-copy">
            <div className="s3h-copy-1">
              <p className="eyebrow">WHAT BECOMES POSSIBLE</p>
              <h2 id="s3h-heading">See how the pieces fit together.</h2>
              <p className="s3h-body">
                You know many different sides of yourself. But have you ever seen how they all fit
                together?
              </p>
            </div>
            <div className="s3h-copy-2">
              <p className="s3h-body s3h-body--strong" ref={outroARef}>
                When you see the whole picture, new possibilities open up.
              </p>
              <p className="s3h-body" ref={outroBRef}>
                In the Identity Lab, you bring these discoveries together in your personal{" "}
                <strong>Identity Map</strong> — a clear summary of your strengths, interests, values and
                experiences, how they connect, and the directions you want to explore next.
              </p>
              <p className="s3h-cta" ref={ctaRef}>
                <a className="button button-primary" href={IDENTITY_LAB_ACTION_HREF}>
                  {IDENTITY_LAB_CTA_LABEL}
                </a>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
