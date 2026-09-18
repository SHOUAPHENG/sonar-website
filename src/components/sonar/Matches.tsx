"use client";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Plus, Check, AudioLines } from "lucide-react";
import { demoTracks } from "./content";
import { Reveal } from "./Reveal";

export function Waveform({ variant = 0 }: { variant?: number }) {
  return (
    <div className="sonar-waveform" aria-hidden="true">
      {Array.from({ length: 64 }, (_, i) => (
        <i
          key={i}
          style={{
            height: `${(12 + Math.abs(Math.sin(i * 0.72 + variant) * Math.cos(i * 0.21 + variant)) * 88).toFixed(2)}%`,
          }}
        />
      ))}
    </div>
  );
}

export function Matches() {
  const [reference, setReference] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);
  const current = demoTracks[reference];
  const matches = demoTracks
    .map((track, index) => ({ ...track, index }))
    .filter((t) => t.index !== reference)
    .sort(
      (a, b) => Math.abs(a.bpm - current.bpm) - Math.abs(b.bpm - current.bpm),
    )
    .slice(0, 3);
  return (
    <section
      className="sonar-section sonar-matches"
      aria-labelledby="matches-title"
    >
      <Reveal className="sonar-matches-copy">
        <p className="sonar-eyebrow">02 / FOLLOW YOUR INSTINCT</p>
        <h2 id="matches-title">
          Find what
          <br />
          belongs next.
        </h2>
        <p>
          Stay in the groove.
          <br />
          Or take the room somewhere new.
        </p>
        <div className="sonar-feature-note">
          <AudioLines size={19} strokeWidth={1.3} />
          <span>
            Musical relationships.
            <br />
            <strong>Your final decision.</strong>
          </span>
        </div>
      </Reveal>
      <div className="sonar-matches-demo">
        <div className="sonar-reference">
          <div className="sonar-eyebrow">
            <span className="sonar-status" /> YOUR STARTING POINT
          </div>
          <div className="sonar-reference-track">
            <div className="sonar-artwork">
              <AudioLines size={30} strokeWidth={0.8} />
            </div>
            <div>
              <strong>{current.title}</strong>
              <p>{current.artist}</p>
            </div>
            <span>
              {current.bpm} <small>BPM</small>
              <br />
              {current.camelot}
            </span>
          </div>
          <Waveform variant={reference} />
        </div>
        <div className="sonar-matches-divider">
          <ArrowDown size={17} />
          <span>SONAR MATCHES</span>
          <small>DEMO</small>
        </div>
        <div className="sonar-match-list" aria-live="polite">
          {matches.map((track, i) => (
            <div className="sonar-match" key={track.title}>
              <span className="sonar-match-number">0{i + 1}</span>
              <button
                className="sonar-match-select"
                onClick={() => setReference(track.index)}
                aria-label={`Use ${track.title} as starting track`}
              >
                <strong>{track.title}</strong>
                <small>{track.artist}</small>
              </button>
              <span className="sonar-match-meta">
                {track.bpm} <small>BPM</small>
                <b>{track.camelot}</b>
              </span>
              <button
                className="sonar-icon-button"
                aria-label={`${saved.includes(track.title) ? "Remove" : "Add"} ${track.title} ${saved.includes(track.title) ? "from" : "to"} demo set`}
                aria-pressed={saved.includes(track.title)}
                onClick={() =>
                  setSaved((prev) =>
                    prev.includes(track.title)
                      ? prev.filter((t) => t !== track.title)
                      : [...prev, track.title],
                  )
                }
              >
                {saved.includes(track.title) ? (
                  <Check size={16} />
                ) : (
                  <Plus size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="sonar-demo-hint">
          <span>
            {saved.length
              ? `${saved.length} track${saved.length === 1 ? "" : "s"} in your demo set`
              : "Select a track to explore its next matches."}
          </span>
          <ArrowUpRight size={14} />
        </div>
        <p className="sonar-fineprint">
          Interactive preview · Demo ordering uses BPM proximity. In-app
          analysis also considers key, energy and groove.
        </p>
      </div>
    </section>
  );
}
