"use client";
import { useState } from 'react';
import { demoTracks } from './content';
import { Waveform } from './Matches';
export function LiveDemo() {
 const [source,setSource]=useState(0);
 const [locked,setLocked]=useState(false);
 const [descending,setDescending]=useState(false);
 const track=demoTracks[source];
 const candidates=demoTracks.map((t,id)=>({...t,id})).filter(t=>t.id!==source).sort((a,b)=>descending?b.bpm-a.bpm:a.bpm-b.bpm).slice(0,4);
 return <div className="sonar-live-hud sonar-live-demo"><header><span>SONAR LIVE DJ</span><small>INTERACTIVE DEMO</small></header><div className="sonar-live-demo-tools"><span>SOURCE SONAR / DEMO</span><button aria-pressed={locked} onClick={()=>setLocked(!locked)}>{locked?'SOURCE LOCKED':'LOCK SOURCE'}</button></div><div className="sonar-live-current"><div><small>{locked?'SOURCE LOCKED':'NOW PLAYING / SIMULATED'}</small><h3>{track.title}</h3><p>{track.artist}</p></div><div><strong>{track.bpm.toFixed(1)}</strong><small>BPM</small></div><span className="sonar-key">{track.camelot}</span></div><Waveform variant={source}/><div className="sonar-live-demo-tools"><span>NEXT MATCHES</span><button onClick={()=>setDescending(!descending)}>BPM {descending?'↓':'↑'}</button></div><div className="sonar-live-demo-rows">{candidates.map((t,i)=><button key={t.id} disabled={locked} onClick={()=>setSource(t.id)} aria-label={`Use ${t.title} as live demo source`}><small>0{i+1}</small><span><strong>{t.title}</strong><small>{t.artist}</small></span><b>{t.bpm} BPM</b><em>{t.camelot}</em></button>)}</div><footer>{locked?'Unlock the source to explore the next track.':'Select a recommendation to change the simulated source.'}<br/>Demo data · No audio playback or Rekordbox connection</footer></div>;
}
