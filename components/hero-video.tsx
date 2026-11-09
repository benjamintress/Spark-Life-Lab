"use client";

import { useEffect, useRef } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
  finalPoster: string;
  alt: string;
}

export function HeroVideo({ src, poster, finalPoster, alt }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    // Reduced-motion: skip autoplay, show final poster immediately (no transition)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      overlay.style.transition = "none";
      overlay.style.opacity = "1";
      return;
    }

    const handleTimeUpdate = () => {
      if (video.duration > 0 && video.duration - video.currentTime <= 0.4) {
        overlay.style.opacity = "1";
      }
    };

    const handlePlay = () => {
      // Reset overlay when video restarts
      overlay.style.opacity = "0";
    };

    const handleEnded = () => {
      video.pause();
      overlay.style.opacity = "1";
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);

    // Stacked (mobile) hero layout: the video sits below the copy and CTAs, so
    // hold playback until about half of it is on screen, then play once.
    // Desktop keeps the original autoplay-on-load behavior.
    let observer: IntersectionObserver | null = null;
    const isStackedLayout = window.matchMedia("(max-width: 900px)").matches;
    if (isStackedLayout && "IntersectionObserver" in window) {
      video.pause();
      video.currentTime = 0;
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            observer = null;
            video.play().catch(() => {
              // Autoplay blocked (e.g. low-power mode): leave the poster as before.
            });
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(video);
    }

    return () => {
      observer?.disconnect();
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="hero-video-wrap" role="img" aria-label={alt}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="hero-video"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Final-frame overlay — fades in during last ~0.4 s of playback */}
      <img
        ref={overlayRef}
        src={finalPoster}
        alt=""
        aria-hidden="true"
        className="hero-video-final-overlay"
      />
    </div>
  );
}
