'use client';

import { useEffect, useRef } from 'react';

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before the end to begin fading out

/**
 * Looping background video with a JS-driven crossfade (no CSS transitions).
 * The element starts at opacity 0; fades resume from the current opacity so
 * overlapping fades stay smooth. Looping is manual (loop attribute off): on
 * `ended` we reset, replay and fade back in — producing a seamless crossfade.
 */
export function FadingVideo({
  src,
  className,
  style,
  poster,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeTo = (target: number, duration: number) => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      const start = parseFloat(video.style.opacity || '0') || 0;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = duration <= 0 ? 1 : Math.min(1, (now - startTime) / duration);
        video.style.opacity = String(start + (target - start) * t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoadedData = () => {
      video.style.opacity = '0';
      void video.play().catch(() => {});
      fadeTo(1, FADE_MS);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (
        !fadingOutRef.current &&
        Number.isFinite(remaining) &&
        remaining <= FADE_OUT_LEAD &&
        remaining > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    // If the video is already ready (cached), kick off the intro fade.
    if (video.readyState >= 2) onLoadedData();

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ opacity: 0, ...style }}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
