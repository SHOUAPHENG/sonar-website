"use client";
import { useState } from "react";
import { AudioLines, ArrowUpRight } from "lucide-react";
import MapCanvas from "./MapCanvas";
import { sampleTypes } from "./content";
import { Waveform } from "./Matches";
import { Reveal } from "./Reveal";

export function Producer() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="producer"
      className="sonar-section sonar-producer"
      aria-labelledby="producer-title"
    >
      <Reveal>
        <div className="sonar-split-heading">
          <div>
            <p className="sonar-eyebrow">04 / A DIFFERENT KIND OF DIGGING</p>
            <h2 id="producer-title">
              Small sounds.
              <br />
              Endless possibilities.
            </h2>
          </div>
          <p>
            From a collection of tracks to a world of samples.
            <br />
            One SONAR technology. Two creative workflows.
          </p>
        </div>
      </Reveal>
      <div className="sonar-producer-visual">
        <MapCanvas mode="samples" />
        <div className="sonar-producer-label">
          <AudioLines size={16} /> SONAR / PRODUCER
        </div>
        <div className="sonar-sample-inspector" aria-live="polite">
          <span className="sonar-eyebrow">
            {sampleTypes[active].toUpperCase()} / SAMPLE PREVIEW
          </span>
          <strong>
            {
              [
                "Analog kick 07",
                "Dry snare 12",
                "Vocal texture 03",
                "Broken groove 08",
                "Metallic hit 02",
                "Atmosphere stem 04",
              ][active]
            }
          </strong>
          <Waveform variant={active + 3} />
          <small>
            {active === 3
              ? "Loop · 124 BPM"
              : active === 5
                ? "Stem · Texture"
                : active === 2
                  ? "Vocal · Texture"
                  : "One shot · Percussive"}
            <span>WAV</span>
          </small>
        </div>
        <span className="sonar-producer-coordinate">
          SOUND SIMILARITY / DEMO COLLECTION
        </span>
      </div>
      <div className="sonar-producer-bottom">
        <div
          className="sonar-segmented"
          role="group"
          aria-label="Explore sample types"
        >
          {sampleTypes.map((t, i) => (
            <button
              key={t}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <span>
          Find the sound behind the idea. <ArrowUpRight size={16} />
        </span>
      </div>
    </section>
  );
}
