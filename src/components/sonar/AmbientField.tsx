"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Audio contours, not a starfield. CSS transforms keep the ambient layer cheap. */
export function AmbientField() {
  const field = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = field.current;
    if (!el) return;
    const visibility = () => { el.dataset.hidden = String(document.hidden); };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return <>
    <div ref={field} className="sonar-ambient" data-paused={paused} aria-hidden="true">
      <div className="sonar-ambient-light" />
      <svg className="sonar-contours" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <g>{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M -220 ${450 + i * 21} C 160 ${180 + i * 28}, 380 ${950 - i * 17}, 720 ${530 + i * 10} S 1230 ${100 + i * 32}, 1650 ${550 + i * 18}`} />)}</g>
      </svg>
      <div className="sonar-ambient-grain" />
    </div>
    <button className="sonar-ambient-toggle" aria-label={paused ? "Resume ambient background" : "Pause ambient background"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={11} /> : <Pause size={11} />}<span>AMBIENCE</span></button>
  </>;
}
