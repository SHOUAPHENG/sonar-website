"use client";
import { useState } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import MapCanvas from "./MapCanvas";
import { relationships } from "./content";
import { Reveal } from "./Reveal";

export function Library() {
  const [active, setActive] = useState(0);
  const item = relationships[active];
  return (
    <section
      id="product"
      className="sonar-section sonar-library"
      aria-labelledby="library-title"
    >
      <Reveal>
        <div className="sonar-section-heading">
          <p className="sonar-eyebrow">01 / SEE THE CONNECTIONS</p>
          <h2 id="library-title">
            Your library is
            <br />
            more than a list.
          </h2>
          <p>
            Same music. A whole new perspective.
            <br />
            Explore the space between sound, energy and groove.
          </p>
        </div>
      </Reveal>
      <div className="sonar-library-visual">
        <div className="sonar-list-ghost" aria-hidden="true">
          <span>YOUR LIBRARY</span>
          {[
            "Nightdrive",
            "Violet Hour",
            "Lunar Tide",
            "Parallax",
            "Echo Chamber",
            "Stardust FM",
          ].map((t, i) => (
            <div key={t}>
              <small>0{i + 1}</small>
              {t}
              <span>{121 + i}</span>
            </div>
          ))}
        </div>
        <MoveUpRight className="sonar-list-arrow" size={26} strokeWidth={1} />
        <MapCanvas />
        <div className="sonar-node-focus" style={{ left: item.x, top: item.y }}>
          <span />
          <small>{item.name}</small>
        </div>
        <div className="sonar-map-legend">
          <span>
            <i /> SIMILARITY
          </span>
          <span>ENERGY</span>
          <span>GROOVE</span>
          <span>KEY</span>
        </div>
      </div>
      <div className="sonar-relationship-controls">
        <div
          className="sonar-segmented"
          role="group"
          aria-label="Explore musical relationships"
        >
          {relationships.map((r, i) => (
            <button
              key={r.name}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              {r.name}
            </button>
          ))}
        </div>
        <div className="sonar-relationship-copy" aria-live="polite">
          <strong>{item.title}</strong>
          <p>{item.detail}</p>
        </div>
        <ArrowUpRight size={21} />
      </div>
    </section>
  );
}
