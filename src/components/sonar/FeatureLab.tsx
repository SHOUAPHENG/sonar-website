"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, ChevronRight, ListMusic, RefreshCw, Sparkles } from "lucide-react";
import { demoTracks } from "./content";
import { Reveal } from "./Reveal";

const workflows = [
  { title: "Shape your set", label: "SET PREPARATION", text: "Start with a direction. Build a journey.", icon: ListMusic },
  { title: "Start with an idea", label: "AI PLAYLISTS", text: "Describe a mood. Discover a starting point.", icon: Sparkles },
  { title: "Stay in control", label: "METADATA SYNC", text: "Review every change before it leaves SONAR.", icon: RefreshCw },
];
const moods = ["Deep warm-up", "Peak-time drive", "After-hours"];
const selections = [[2, 5, 0], [3, 1, 6], [4, 2, 5]];

export function FeatureLab() {
  const [active, setActive] = useState(0);
  const [mood, setMood] = useState(0);
  const [set, updateSet] = useState([0, 2, 3]);
  const [reviewed, setReviewed] = useState(false);
  const [includeKey, setIncludeKey] = useState(true);
  const reduce = useReducedMotion();
  const data = workflows[active];
  return <section className="sonar-section sonar-lab" aria-labelledby="lab-title">
    <Reveal><div className="sonar-split-heading"><div><p className="sonar-eyebrow">LESS FRICTION. MORE MUSIC.</p><h2 id="lab-title">An instinct.<br />Then a direction.</h2></div><p>Your library is the starting point.<br />Here’s where you can take it.</p></div></Reveal>
    <div className="sonar-lab-layout">
      <div className="sonar-lab-selector" role="group" aria-label="Explore SONAR workflows">{workflows.map((w, i) => <button key={w.label} aria-pressed={active === i} onClick={() => setActive(i)}><span className="sonar-lab-index">0{i + 1}</span><div><small>{w.label}</small><strong>{w.title}</strong><p>{w.text}</p></div><ChevronRight size={16} /></button>)}</div>
      <div className="sonar-lab-stage">
        <header><span><data.icon size={13} /> {data.label}</span><small>INTERACTIVE PREVIEW</small></header>
        <AnimatePresence mode="wait" initial={false}><motion.div key={active} className="sonar-lab-panel" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .25 }}>
          {active === 0 && <><div className="sonar-lab-panel-title"><div><small>YOUR NEXT SET</small><h3>From warm-up to lift-off.</h3></div><span>3 TRACKS</span></div><div className="sonar-set-curve" aria-hidden="true"><svg viewBox="0 0 400 90" fill="none"><path d="M 15 72 C 90 75, 110 28, 200 42 S 310 65, 385 12" /><circle cx="15" cy="72" r="4" /><circle cx="200" cy="42" r="4" /><circle cx="385" cy="12" r="4" /></svg><span>OPEN</span><span>CONNECT</span><span>LIFT</span></div><div className="sonar-lab-tracks">{set.map((id, i) => <motion.div layout={!reduce} key={id}><span>0{i + 1}</span><div><strong>{demoTracks[id].title}</strong><small>{demoTracks[id].artist}</small></div><b>{demoTracks[id].bpm} <small>BPM</small></b><em>{demoTracks[id].camelot}</em>{i < 2 ? <button aria-label={`Move ${demoTracks[id].title} down in demo set`} onClick={() => updateSet(prev => { const next = [...prev]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; return next; })}><ArrowDown size={14} /></button> : <span className="sonar-lab-track-end" />}</motion.div>)}</div><p className="sonar-lab-caption">Try a different order. The direction is yours.</p></>}
          {active === 1 && <><div className="sonar-lab-panel-title"><div><small>DESCRIBE THE FEELING</small><h3>A few words. A new route.</h3></div><Sparkles size={22} strokeWidth={1} /></div><div className="sonar-mood-options" role="group" aria-label="Demo playlist mood">{moods.map((m, i) => <button key={m} aria-pressed={mood === i} onClick={() => setMood(i)}>{m}</button>)}</div><div className="sonar-prompt"><span>✳</span><p>{["Deep, rolling tracks. Leave room to build.", "Driving rhythms. Keep the energy moving.", "A little darker. A little further out."][mood]}</p></div><div className="sonar-lab-tracks" aria-live="polite">{selections[mood].map((id, i) => <motion.div key={`${mood}-${id}`} initial={reduce ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .25, delay: reduce ? 0 : i * .09 }}><span>0{i + 1}</span><div><strong>{demoTracks[id].title}</strong><small>{demoTracks[id].artist}</small></div><b>{demoTracks[id].bpm} <small>BPM</small></b><em>{demoTracks[id].camelot}</em></motion.div>)}</div><p className="sonar-lab-caption">Illustrative results from a demo library. No AI request is sent.</p></>}
          {active === 2 && <><div className="sonar-lab-panel-title"><div><small>REKORDBOX ↔ SONAR</small><h3>Review. Then sync.</h3></div><RefreshCw size={22} strokeWidth={1} /></div><div className="sonar-sync-review"><div><span>TRACK</span><strong>Nightdrive</strong></div><div><span>BPM</span><del>123.98</del><ArrowRight size={13} /><strong>124.00</strong><Check size={14} /></div><label><input type="checkbox" checked={includeKey} onChange={e => { setIncludeKey(e.target.checked); setReviewed(false); }} /><span>Include key update</span><del>—</del><ArrowRight size={13} /><strong>8A</strong></label></div><button className="sonar-button sonar-review-button" onClick={() => setReviewed(!reviewed)}>{reviewed ? <><Check size={15} /> Review complete</> : <>Review {includeKey ? 2 : 1} changes <ArrowRight size={15} /></>}</button><p className="sonar-lab-caption" role="status">{reviewed ? `${includeKey ? 2 : 1} demo changes reviewed. No files have been modified.` : "Choose what to include. Nothing syncs without your action."}</p></>}
        </motion.div></AnimatePresence>
        <footer><span className="sonar-status" /><span>YOUR MUSIC. YOUR DECISIONS.</span><span>SONAR / {String(active + 1).padStart(2, "0")}</span></footer>
      </div>
    </div>
  </section>;
}
