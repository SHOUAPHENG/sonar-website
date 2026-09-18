"use client";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Layers, ListMusic, Search, ArrowUpRight, Radio } from "lucide-react";
import MapCanvas from "./MapCanvas";
import { PlayerBarMock } from "@/components/app/PlayerBarMock";
import { playlistTree } from "@/lib/mockData";
import { demoTracks } from "./content";
import { Waveform } from "./Matches";
import { LiveDemo } from "./LiveDemo";
import { Reveal } from "./Reveal";

export function Workspace() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const [view, setView] = useState<"map" | "library">("map");
  return (
    <section
      id="dj"
      className="sonar-section sonar-workspace"
      aria-labelledby="workspace-title"
    >
      <Reveal>
        <div className="sonar-split-heading">
          <div>
            <p className="sonar-eyebrow">03 / THE DJ WORKSPACE</p>
            <h2 id="workspace-title">
              From the first idea.
              <br />
              To the last track.
            </h2>
          </div>
          <p>
            Explore. Connect. Build your set.
            <br />
            One place to hear the bigger picture.
          </p>
        </div>
      </Reveal>
      <div ref={ref} className="sonar-product-perspective">
        <motion.div
          className="sonar-app-window"
          style={reduce ? {} : { rotateX }}
        >
          <div className="sonar-app-title">
            <span className="sonar-window-controls">
              <i />
              <i />
              <i />
            </span>
            <span>SONAR / DJ WORKSPACE</span>
            <small>INTERFACE PREVIEW</small>
          </div>
          <div className="sonar-app-body">
            <aside className="sonar-app-sidebar">
              <span className="sonar-eyebrow">YOUR COLLECTION</span>
              <strong>
                <Layers size={14} /> All tracks <small>4,218</small>
              </strong>
              <p>PLAYLISTS</p>
              {playlistTree.slice(0, 2).map((folder) => (
                <div key={folder.name}>
                  <span>{folder.name}</span>
                  {folder.type === "folder" &&
                    folder.children.map((child) => (
                      <span className="sonar-playlist" key={child.name}>
                        <ListMusic size={12} />
                        {child.name}
                      </span>
                    ))}
                </div>
              ))}
              <div className="sonar-ai-note">
                <span>✳</span> A set starts with an idea.
                <small>AI playlist creation in SONAR</small>
              </div>
            </aside>
            <div className="sonar-app-main">
              <div className="sonar-app-toolbar">
                <div
                  className="sonar-segmented"
                  role="group"
                  aria-label="Workspace preview view"
                >
                  <button
                    aria-pressed={view === "map"}
                    onClick={() => setView("map")}
                  >
                    Visual Map
                  </button>
                  <button
                    aria-pressed={view === "library"}
                    onClick={() => setView("library")}
                  >
                    Library
                  </button>
                </div>
                <span>
                  <Search size={12} /> Your music, in context
                </span>
              </div>
              <div className="sonar-app-content">
                {view === "map" ? (
                  <>
                    <MapCanvas />
                    <div className="sonar-app-track">
                      <small>REFERENCE / CORE</small>
                      <strong>Nightdrive</strong>
                      <span>Auralis · 124 BPM · 8A</span>
                    </div>
                    <div className="sonar-app-matches">
                      <span>MATCHES</span>
                      {demoTracks.slice(1, 4).map((t) => (
                        <div key={t.title}>
                          <strong>{t.title}</strong>
                          <small>
                            {t.bpm} BPM <b>{t.camelot}</b>
                          </small>
                        </div>
                      ))}
                    </div>
                    <span className="sonar-app-map-caption">
                      SIMILARITY MAP / DEMO LIBRARY
                    </span>
                  </>
                ) : (
                  <div className="sonar-track-table">
                    <div>
                      <span>TRACK / ARTIST</span>
                      <span>BPM</span>
                      <span>KEY</span>
                    </div>
                    {demoTracks.map((t) => (
                      <div key={t.title}>
                        <span>
                          <strong>{t.title}</strong>
                          <small>{t.artist}</small>
                        </span>
                        <span>{t.bpm}</span>
                        <span>{t.camelot}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sonar-existing-player">
            <PlayerBarMock />
          </div>
        </motion.div>
      </div>
      <p className="sonar-product-caption">
        <span>BUILT AROUND YOUR LIBRARY</span>
        <span>Product preview · Demonstration data</span>
      </p>
      <div className="sonar-workflow-features">
        <span>Visual exploration</span>
        <span>Musical matches</span>
        <span>AI playlists</span>
        <span>Metadata sync</span>
      </div>
    </section>
  );
}

export function Rekordbox() {
  return (
    <section
      className="sonar-section sonar-rekordbox"
      aria-labelledby="rekordbox-title"
    >
      <Reveal>
        <p className="sonar-eyebrow">YOUR WORKFLOW. MORE CONNECTED.</p>
        <h2 id="rekordbox-title">Better together.</h2>
        <p>
          Keep Rekordbox at the heart of your DJ setup.
          <br />
          Let SONAR bring a new perspective to your library.
        </p>
      </Reveal>
      <div className="sonar-sync-flow">
        <div>
          <strong>rekordbox</strong>
          <span>01 / IMPORT YOUR LIBRARY</span>
        </div>
        <span className="sonar-flow-arrow">→</span>
        <div className="sonar-sync-center">
          <strong>SONAR</strong>
          <span>02 / EXPLORE & ENRICH</span>
        </div>
        <span className="sonar-flow-arrow">→</span>
        <div>
          <strong>rekordbox</strong>
          <span>03 / REVIEW & SYNC</span>
        </div>
      </div>
      <p className="sonar-sync-note">
        Metadata. Playlists. Musical context.
        <br />
        <strong>You choose what to sync, and when.</strong>
      </p>
    </section>
  );
}

export function LiveDJ() {
  return (
    <section id="live" className="sonar-section sonar-live" aria-labelledby="live-title">
      <Reveal>
        <p className="sonar-eyebrow">
          <Radio size={13} /> LIVE DJ
        </p>
        <h2 id="live-title">Stay in the moment.</h2>
        <p>
          Less searching. More listening.
          <br />
          The right information, when the room needs you.
        </p>
        <a href="#beta" className="sonar-link">
          Meet your copilot <ArrowUpRight size={15} />
        </a>
      </Reveal>
      <LiveDemo />
    </section>
  );
}
