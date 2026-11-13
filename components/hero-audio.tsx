"use client";

/**
 * HeroAudio — "Get to know us" player in the homepage hero.
 *
 * Neutral state: the quiet ember play link next to the hero CTA (unchanged
 * footprint). On click it morphs — Dynamic-Island style — into a compact Deep
 * Navy player in the same spot: spark artwork, live level bars, scrubber,
 * −15 s / play-pause / +15 s and close. While the player is open and scrolled
 * out of view, a small floating pill keeps the controls at hand.
 *
 * Design rules (docs/SLL_VISUAL_REFINEMENT_ADDENDUM_v2.md + globals.css tokens):
 * - palette tokens only: --navy surface, Paper text, --ember as the fine accent
 * - calm motion: soft spring, no bounce; prefers-reduced-motion respected
 *   (MotionConfig reducedMotion="user" + static bars)
 *
 * Live bars: Web Audio AnalyserNode on the same-origin <audio> element. If the
 * analyser is unavailable or returns silence, a gentle synthetic motion is used
 * so the bars still "breathe" while playing. Bars are written straight to the
 * DOM in a rAF loop (no React re-render per frame).
 */

import { AnimatePresence, MotionConfig, motion, type Transition } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

interface HeroAudioProps {
  /** Link text in the neutral state. */
  label: string;
  /** Audio file URL. Leave undefined to render a disabled placeholder. */
  src?: string;
  /** Title shown inside the open player. */
  title?: string;
  /** Second line inside the open player (duration is appended automatically). */
  subtitle?: string;
}

const BAR_COUNT = 7;
const SKIP_SECONDS = 15;
const REST_LEVEL = 0.16;
const REDUCED_LEVELS = [0.42, 0.7, 0.52, 0.86, 0.48, 0.64, 0.38];
/* Log-ish FFT bin edges (fftSize 512 @ 44.1/48 kHz ≈ 90 Hz per bin): voice range. */
const BAND_EDGES = [1, 2, 4, 6, 10, 16, 26, 44];

const SHELL_SPRING: Transition = { type: "spring", stiffness: 420, damping: 38, mass: 0.9 };
const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

const SPARK_PATH =
  "M140.4,40.61c.66.38,1.62,3.65,1.83,4.56,5.38,22.22,4.91,46.58,7.55,69.23.87,7.48,2.96,6.06,7.62,2,10.62-9.27,22.18-24.91,33.29-32.44,5.82-3.94,4.86,1.53,2.97,5.3-7.6,15.15-19.98,29.5-27.66,44.85-1.59,3.18-2.88,5.67,1.4,7.26,20.53.36,41.23-.69,61.69.35,3.15.16,9.33.35,12.13,1.06,4.04,1.03,2.69,3.53-.44,4.85-8.74,3.69-23.88,6.06-33.54,7.96-11.64,2.29-24.96,3.5-36.22,6.43-6.54,1.7-6.25,3.12-5.24,9.67,2.22,14.44,9.44,29.6,12.12,44.1.9,4.89,1.58,13.53-3.86,5.02-6.03-9.43-10.25-20.3-16.89-29.64-7.29-10.27-10.37-9.73-13.86,2.45-5.66,19.71-7.27,41.64-11.07,61.83-.52,2.78-1.18,6.97-2.11,9.52-1.45,3.96-2.64,1.71-2.84-1.25-1.75-25.77,1.42-53.69,1.97-79.49.21-9.86-2.93-9.78-11.66-7.79-11.64,2.66-23.82,8.7-35.36,12.33-1.82.57-8.29,2.96-9.62,2.05-1.73-1.18,2.2-4.61,3.12-5.45,8.91-8.23,20.25-14.18,29.27-21.92,1.61-1.38,4.12-3.37,3.69-5.6-.3-1.55-6.05-4.97-7.62-5.96-9.43-5.94-19.77-11.01-29.34-16.81-3.48-2.11-12.37-7.04-14.39-10.04-1.35-2.02-1.82-3.48,1.14-3.5,7.13-.04,24.56,6.18,32.3,8.46,7.23,2.13,14.52,4.95,21.79,6.9,4.95,1.33,12.84,4.88,13.92-2.37,4.29-28.88,4.84-59.27,10.17-87.94.31-1.66,1.14-7.49,3.75-5.98Z";

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

function PlayPauseGlyph({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      {playing ? (
        <path fill="currentColor" d="M8.4 7.2h2.7v9.6H8.4zM12.9 7.2h2.7v9.6h-2.7z" />
      ) : (
        <path fill="currentColor" d="M9.5 7.1v9.8l7.6-4.9z" />
      )}
    </svg>
  );
}

function SkipGlyph({ direction }: { direction: "back" | "forward" }) {
  const flip = direction === "forward" ? "translate(24 0) scale(-1 1)" : undefined;
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <g transform={flip} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.2 12a7 7 0 1 0 2.3-5.2" />
        <path d="M7.6 3.6v3.4H4.2" />
      </g>
      <text
        x="12.4"
        y="14.6"
        textAnchor="middle"
        fontSize="6.6"
        fontWeight="600"
        fill="currentColor"
        fontFamily="inherit"
      >
        15
      </text>
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkGlyph() {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="100%" aria-hidden="true">
      <path fill="currentColor" d={SPARK_PATH} />
    </svg>
  );
}

/**
 * Level bars. Live bars are driven from the parent's rAF loop via data
 * attributes; non-live bars (hover preview) are animated purely in CSS.
 */
function Bars({ count, className, live = true }: { count: number; className: string; live?: boolean }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="sll-bar"
          data-sll-bar={live ? Math.round((i * (BAR_COUNT - 1)) / Math.max(1, count - 1)) : undefined}
        />
      ))}
    </span>
  );
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function HeroAudio({ label, src, title = "Get to know us", subtitle = "SparkLifeLab" }: HeroAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const peakRef = useRef(80);
  const silentSinceRef = useRef<number | null>(null);
  const heardRef = useRef(false);
  const syntheticRef = useRef(false);
  const levelsRef = useRef<number[]>(Array(BAR_COUNT).fill(REST_LEVEL));
  const rafRef = useRef<number | null>(null);
  const focusAfterOpen = useRef(false);
  const focusAfterClose = useRef(false);

  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [inlineVisible, setInlineVisible] = useState(true);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  /* ── Web Audio analyser (created lazily inside the first user gesture) ── */
  const ensureAnalyser = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || analyserRef.current || syntheticRef.current) {
      ctxRef.current?.resume().catch(() => {});
      return;
    }
    try {
      // Real levels on desktop only. On phones/tablets, routing the element
      // through Web Audio stops playback when the screen locks (iOS), so the
      // bars use the synthetic motion there instead.
      const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const Ctx = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
      if (!desktop || !Ctx) throw new Error("analyser not used");
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.72;
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
      ctx.resume().catch(() => {});
    } catch {
      syntheticRef.current = true;
    }
  }, []);

  /* ── Write levels + progress straight to the DOM ── */
  const paint = useCallback(() => {
    const audio = audioRef.current;
    const levels = levelsRef.current;
    for (const host of [shellRef.current, floatRef.current]) {
      if (!host) continue;
      host.querySelectorAll<HTMLElement>("[data-sll-bar]").forEach((bar) => {
        const idx = Number(bar.dataset.sllBar);
        bar.style.transform = `scaleY(${levels[idx] ?? REST_LEVEL})`;
      });
      if (audio && audio.duration > 0) {
        host.style.setProperty("--sll-progress", `${(audio.currentTime / audio.duration) * 100}%`);
      }
    }
  }, []);

  const computeLevels = useCallback((now: number) => {
    const levels = levelsRef.current;
    const analyser = analyserRef.current;
    const data = dataRef.current;
    let usedAnalyser = false;

    if (analyser && data && !syntheticRef.current) {
      analyser.getByteFrequencyData(data);
      let frameMax = 0;
      for (let i = 0; i < BAR_COUNT; i++) {
        let sum = 0;
        const from = BAND_EDGES[i];
        const to = BAND_EDGES[i + 1];
        for (let b = from; b < to; b++) sum += data[b];
        const avg = sum / (to - from);
        frameMax = Math.max(frameMax, avg);
        levels[i] = avg;
      }
      if (frameMax >= 2) {
        heardRef.current = true;
      } else if (!heardRef.current) {
        silentSinceRef.current ??= now;
        // Silence from the very start of playback means the analyser gets no
        // data (browser quirk) — switch to the synthetic motion for good.
        if (now - silentSinceRef.current > 2500) syntheticRef.current = true;
      }
      peakRef.current = Math.max(peakRef.current * 0.996, frameMax, 60);
      for (let i = 0; i < BAR_COUNT; i++) {
        const norm = Math.min(1, levels[i] / peakRef.current);
        levels[i] = Math.max(REST_LEVEL, Math.pow(norm, 0.85));
      }
      usedAnalyser = true;
    }

    if (!usedAnalyser) {
      const t = now / 1000;
      // Slow "phrase" envelope so the motion reads like speech, not a loop.
      const phrase = 0.62 + 0.38 * Math.sin(t * 1.3) * Math.sin(t * 0.47 + 1);
      for (let i = 0; i < BAR_COUNT; i++) {
        const wave =
          phrase * (0.5 + 0.28 * Math.sin(t * (3.1 + i * 0.73) + i * 1.7) + 0.16 * Math.sin(t * (7.3 + i) + i));
        const target = Math.max(REST_LEVEL, Math.min(1, wave + (Math.random() - 0.5) * 0.18));
        levels[i] += (target - levels[i]) * 0.22;
      }
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    const reduced = prefersReducedMotion();
    const tick = (now: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!audio.paused) {
        if (reduced) {
          levelsRef.current = [...REDUCED_LEVELS];
        } else {
          computeLevels(now);
        }
      } else {
        levelsRef.current = levelsRef.current.map((l) => l + (REST_LEVEL - l) * 0.18);
      }
      paint();
      const settled = audio.paused && levelsRef.current.every((l) => Math.abs(l - REST_LEVEL) < 0.01);
      rafRef.current = settled ? null : requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [computeLevels, paint]);

  useEffect(() => stopLoop, [stopLoop]);

  /* ── Media Session: lock-screen / Dynamic Island controls on phones ── */
  const setupMediaSession = useCallback(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist: "SparkLifeLab",
        artwork: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      });
      const audio = audioRef.current;
      if (!audio) return;
      navigator.mediaSession.setActionHandler("play", () => void audio.play());
      navigator.mediaSession.setActionHandler("pause", () => audio.pause());
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        audio.currentTime = Math.max(0, audio.currentTime - SKIP_SECONDS);
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + SKIP_SECONDS);
      });
      navigator.mediaSession.setActionHandler("seekto", (d) => {
        if (typeof d.seekTime === "number") audio.currentTime = d.seekTime;
      });
    } catch {
      /* optional enhancement */
    }
  }, [title]);

  /* ── Metadata may load before hydration: read the duration once mounted ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audio.readyState < 1 || !Number.isFinite(audio.duration)) return;
    const id = requestAnimationFrame(() => setDuration(audio.duration));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Show the floating pill only while the open inline player is off-screen ── */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setInlineVisible(entry.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* ── Focus hand-off when the trigger and player swap ── */
  useEffect(() => {
    if (open && focusAfterOpen.current) {
      focusAfterOpen.current = false;
      const id = window.setTimeout(() => playBtnRef.current?.focus({ preventScroll: true }), 60);
      return () => window.clearTimeout(id);
    }
    if (!open && focusAfterClose.current) {
      focusAfterClose.current = false;
      const id = window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 60);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  /* ── Actions ── */
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAnalyser();
    setupMediaSession();
    if (audio.ended || (audio.duration > 0 && audio.currentTime >= audio.duration - 0.05)) audio.currentTime = 0;
    setEnded(false);
    if (audio.readyState < 3) setLoading(true);
    audio.play().catch(() => {
      setPlaying(false);
      setLoading(false);
    });
  }, [ensureAnalyser, setupMediaSession]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  }, [play]);

  const openAndPlay = (viaKeyboard: boolean) => {
    focusAfterOpen.current = viaKeyboard;
    setOpen(true);
    play(); // must stay inside the click handler (iOS user-gesture rule)
  };

  const close = () => {
    audioRef.current?.pause();
    focusAfterClose.current = true;
    setOpen(false);
  };

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = audio.duration || duration || 0;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), max);
    setCurrent(audio.currentTime);
    paint();
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
    paint();
  };

  const scrollToPlayer = () => {
    rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  };

  /* ── Placeholder (no file yet) ── */
  if (!src) {
    return (
      <div className="sll-audio-root">
        <button type="button" className="sll-audio-trigger" disabled aria-label={`${label} (audio coming soon)`}>
          <span className="sll-audio-orb">
            <PlayPauseGlyph playing={false} />
          </span>
          <span className="sll-audio-label">{label}</span>
        </button>
      </div>
    );
  }

  const total = duration || 0;
  const remaining = Math.max(0, total - current);
  const showFloat = open && !inlineVisible;
  const stateClass = `${playing ? " is-playing" : ""}${loading ? " is-loading" : ""}`;

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} className="sll-audio-root">
        <motion.div
          ref={shellRef}
          layout
          className={`sll-audio-shell${open ? " is-open" : ""}${stateClass}`}
          initial={false}
          animate={{
            backgroundColor: open ? "rgba(32, 40, 65, 1)" : "rgba(32, 40, 65, 0)",
            boxShadow: open
              ? "0 18px 44px -18px rgba(32, 40, 65, 0.55), 0 2px 8px rgba(32, 40, 65, 0.12)"
              : "0 0px 0px 0px rgba(32, 40, 65, 0), 0 0px 0px rgba(32, 40, 65, 0)",
          }}
          style={{ borderRadius: open ? 22 : 999 }}
          transition={{ layout: SHELL_SPRING, default: { duration: 0.32, ease: SOFT_EASE } }}
          onKeyDown={(e) => {
            if (open && e.key === "Escape") close();
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!open ? (
              <motion.button
                key="trigger"
                ref={triggerRef}
                type="button"
                layout="position"
                className="sll-audio-trigger"
                onClick={(e) => openAndPlay(e.detail === 0)}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.35, delay: 0.12, ease: SOFT_EASE } }}
                exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.14 } }}
              >
                <span className="sll-audio-orb">
                  <span className="sll-audio-halo" />
                  <PlayPauseGlyph playing={false} />
                </span>
                <span className="sll-audio-label">{label}</span>
                <Bars count={4} className="sll-audio-preview" live={false} />
              </motion.button>
            ) : (
              <motion.div
                key="player"
                layout="position"
                className="sll-audio-player"
                role="region"
                aria-label={`Audio player: ${title}`}
                initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.42, delay: 0.1, ease: SOFT_EASE } }}
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.14 } }}
              >
                <div className="sll-audio-head">
                  <span className="sll-audio-art" aria-hidden="true">
                    <SparkGlyph />
                  </span>
                  <span className="sll-audio-meta">
                    <span className="sll-audio-title">{title}</span>
                    <span className="sll-audio-sub">
                      {subtitle}
                      {total > 0 ? ` · ${formatTime(total)}` : ""}
                    </span>
                  </span>
                  <Bars count={BAR_COUNT} className="sll-audio-bars" />
                  <button type="button" className="sll-audio-icon-btn sll-audio-close" onClick={close} aria-label="Close player">
                    <CloseGlyph />
                  </button>
                </div>

                <div className="sll-audio-scrub">
                  <span className="sll-audio-track" aria-hidden="true">
                    <span className="sll-audio-fill" />
                    <span className="sll-audio-thumb" />
                  </span>
                  <input
                    type="range"
                    className="sll-audio-range"
                    min={0}
                    max={total || 1}
                    step={0.1}
                    value={Math.min(current, total || 1)}
                    onChange={(e) => seek(Number(e.target.value))}
                    aria-label="Seek"
                    aria-valuetext={`${formatTime(current)} of ${formatTime(total)}`}
                  />
                </div>

                <div className="sll-audio-controls">
                  <span className="sll-audio-time">{formatTime(current)}</span>
                  <div className="sll-audio-buttons">
                    <button
                      type="button"
                      className="sll-audio-icon-btn sll-audio-skip"
                      onClick={() => skip(-SKIP_SECONDS)}
                      aria-label="Back 15 seconds"
                    >
                      <SkipGlyph direction="back" />
                    </button>
                    <button
                      ref={playBtnRef}
                      type="button"
                      className="sll-audio-main"
                      onClick={toggle}
                      aria-label={playing ? "Pause" : ended ? "Play again" : "Play"}
                    >
                      <span className="sll-audio-main-ring" aria-hidden="true" />
                      <PlayPauseGlyph playing={playing} />
                    </button>
                    <button
                      type="button"
                      className="sll-audio-icon-btn sll-audio-skip"
                      onClick={() => skip(SKIP_SECONDS)}
                      aria-label="Forward 15 seconds"
                    >
                      <SkipGlyph direction="forward" />
                    </button>
                  </div>
                  <span className="sll-audio-time sll-audio-time-end">−{formatTime(remaining)}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => {
            setPlaying(true);
            startLoop();
          }}
          onPlaying={() => setLoading(false)}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onPause={() => {
            setPlaying(false);
            setLoading(false);
            startLoop(); // lets the bars settle back to rest
          }}
          onEnded={() => {
            setPlaying(false);
            setEnded(true);
          }}
          onTimeUpdate={(e) => {
            const a = e.currentTarget;
            setCurrent(a.currentTime);
            if ("mediaSession" in navigator && a.duration > 0) {
              try {
                navigator.mediaSession.setPositionState({
                  duration: a.duration,
                  position: Math.min(a.currentTime, a.duration),
                  playbackRate: a.playbackRate,
                });
              } catch {
                /* optional */
              }
            }
          }}
        />
      </div>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {showFloat && (
          <motion.div
            key="float"
            ref={floatRef}
            className={`sll-audio-float${stateClass}`}
            role="region"
            aria-label={`Mini player: ${title}`}
            initial={{ opacity: 0, y: 28, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={SHELL_SPRING}
          >
            <button type="button" className="sll-audio-main sll-audio-main-sm" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
              <PlayPauseGlyph playing={playing} />
            </button>
            <button type="button" className="sll-audio-float-title" onClick={scrollToPlayer}>
              <span className="sll-audio-title">{title}</span>
              <span className="sll-audio-sub">−{formatTime(remaining)}</span>
            </button>
            <Bars count={5} className="sll-audio-bars sll-audio-bars-sm" />
            <button type="button" className="sll-audio-icon-btn sll-audio-close" onClick={close} aria-label="Close player">
              <CloseGlyph />
            </button>
            <span className="sll-audio-float-progress" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>,
          // Portal: the page-transition wrapper creates a containing block
          // that would otherwise trap position: fixed.
          document.body,
        )}
    </MotionConfig>
  );
}
