"use client";

import { useRef, useState } from "react";

interface HeroAudioProps {
  label: string;
  /** Audio file URL. Leave undefined until the founder audio exists: the CTA then renders as a disabled placeholder. */
  src?: string;
}

function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <span className="hero-audio-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        {playing ? (
          <path fill="#fff" d="M8.5 7.5h2.6v9H8.5zM12.9 7.5h2.6v9h-2.6z" />
        ) : (
          <path fill="#fff" d="M9.6 7.4v9.2l7.2-4.6z" />
        )}
      </svg>
    </span>
  );
}

export function HeroAudio({ label, src }: HeroAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!src) {
    return (
      <button
        type="button"
        className="hero-audio"
        disabled
        aria-label={`${label} (audio coming soon)`}
      >
        <PlayIcon playing={false} /> <span>{label}</span>
      </button>
    );
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }

  return (
    <>
      <button type="button" className="hero-audio" onClick={toggle} aria-pressed={playing}>
        <PlayIcon playing={playing} /> <span>{label}</span>
      </button>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </>
  );
}
