"use client";

import { useEffect, useRef, useState } from "react";

import { Focus, Network, Route, ListMusic, Minus, Plus, ArrowUpRight } from "lucide-react";
import { mapTracks, makePoints, relatedIds, neighbors } from "./realMap";
import { mapPalette as palette, mapHighlights, fluxGradient } from "./mapPalette";

export function InteractiveMap() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ wake: () => void; select: (id: number) => void; activity: () => void; focus: () => void } | null>(null);
  const camera = useRef({ yaw: 0, pitch: -.12, zoom: 1, auto: true, selected: -1, hovered: -1, matches: false, focus: false, paused: false, matchDepth: 1, route: [] as number[], flow: false });
  const [matchDepth, setMatchDepth] = useState(1);
  const [flow, setFlow] = useState(false);
  const [isolated, setIsolated] = useState(false);
  const [setOpen, setSetOpen] = useState(false);
  const [matches, setMatches] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);



  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    let points = makePoints();
    let seed = 718;
    const random = () => ((seed = seed * 16807 % 2147483647) - 1) / 2147483646;
    // Illustrative density only; selectable points remain the real analyzed samples.
    const atmosphere = Array.from({length: compact.matches ? 5000 : 22000}, (_, index) => {
      const anchor = mapTracks[index % mapTracks.length];
      // Interleave wider neighborhoods and bridges, so density fills gaps at every scroll level.
      const bridge = index % 3 === 0;
      const target = mapTracks[neighbors[anchor.id][bridge ? 19 : 3]];
      const blend = bridge ? random() : 0;
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(-2 * Math.log(Math.max(.001, random()))) * (bridge ? .026 : .037);
      return {
        x: anchor.x + (target.x-anchor.x)*blend + Math.cos(angle)*radius,
        y: anchor.y + (target.y-anchor.y)*blend + Math.sin(angle)*radius*.85,
        z: anchor.z + (target.z-anchor.z)*blend + (random()-.5)*.09,
        cluster: blend > .5 ? target.cluster : anchor.cluster,
        size: .35 + random()*.65,
      };
    });
    let width = 0, height = 0, raf = 0, visible = false, previousTime = 0;
    let drag: { id: number; x: number; y: number; moved: boolean; startX: number; startY: number } | null = null;
    const state = camera.current;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const stopAuto = () => {
      state.auto = false;
      clearTimeout(idleTimer);
      if (!media.matches && !state.paused) idleTimer = setTimeout(() => {
        if (drag) { stopAuto(); return; }
        state.auto = true; previousTime = 0; wake();
      }, 2000);
    };
    const included = (id: number) => id === state.selected || relatedIds(state.selected, state.matchDepth).includes(id);
    const select = (id: number) => { state.selected = id; state.focus = false; state.matches = false; setIsolated(false); setMatches(false); setSelected(id); stopAuto(); wake(); };
    const draw = (time: number) => {
      raf = 0;
      if (!visible || document.hidden) { previousTime = 0; return; }
      const delta = previousTime ? Math.min((time - previousTime) / 1000, .05) : 0;
      previousTime = time;
      if (state.auto && !media.matches && !drag) state.yaw += delta * .036;
      ctx.clearRect(0, 0, width, height);
      const cy = Math.cos(state.yaw), sy = Math.sin(state.yaw);
      const cp = Math.cos(state.pitch), sp = Math.sin(state.pitch);
      const scale = Math.min(width * .96, height * 2.1) * state.zoom;
      const hero = el.closest('section');
      const progress = media.matches ? 1 : Math.min(1, Math.max(0, -(hero?.getBoundingClientRect().top ?? 0) / Math.max(1, window.innerHeight * .7)));
      if (!state.focus) {
        const budget = compact.matches ? Math.min(5000, atmosphere.length) : atmosphere.length;
        const count = Math.floor(budget * (.8 + progress * .2));
        for (let index = 0; index < count; index++) {
          const p = atmosphere[index];
          const x = p.x * cy + p.z * sy, z = -p.x * sy + p.z * cy;
          const y = p.y * cp - z * sp, depth = 1 / (1 + (p.y * sp + z * cp) * .7);
          const size = Math.max(.7, p.size * depth);
          const screenX = width/2 + x*scale*depth, screenY = height*.51 + y*scale*depth;
          ctx.fillStyle = palette[p.cluster]; ctx.globalAlpha = .12;
          ctx.fillRect(screenX-size, screenY-size, size*3, size*3);
          ctx.fillStyle = mapHighlights[p.cluster]; ctx.globalAlpha = .82;
          ctx.fillRect(screenX, screenY, size, size);
        }
      }
      for (const p of points) {
        const px = p.x, py = p.y, pz = p.z;
        const x = px * cy + pz * sy;
        const z = -px * sy + pz * cy;
        const y = py * cp - z * sp;
        const depth = py * sp + z * cp;
        p.depth = 1 / (1 + depth * .7);
        p.sx = width / 2 + x * scale * p.depth;
        p.sy = height * .51 + y * scale * p.depth;
      }
      const matchIds = relatedIds(state.selected, state.matchDepth);
      const included = (id: number) => id === state.selected || matchIds.includes(id);
      const line = (a: typeof points[number], b: typeof points[number], alpha: number, width = .7) => {
        ctx.lineWidth = width; ctx.globalAlpha = alpha;
        ctx.strokeStyle = fluxGradient(ctx, a.sx, a.sy, b.sx, b.sy, a.cluster, b.cluster);
        ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy); ctx.stroke();
      };
      // Neighborhood graph follows actual projected distances, never array order.
      for (const a of points) {
        for (const id of neighbors[a.id].slice(0, 2)) {
          const b = points[id];
          if (id < a.id || (state.focus && (!included(a.id) || !included(id)))) continue;
          line(a, b, .22);
        }
      }
      const focus = points[state.selected];
      if (focus && state.matches) {
        for (const id of matchIds) line(focus, points[id], .85, 1.2);
      }
      if (state.flow) {
        state.route.forEach((id, index) => {
          const p = points[id];
          if (index) line(points[state.route[index-1]], p, 1, 2);
          ctx.globalAlpha = 1; ctx.fillStyle = '#f1f7ff'; ctx.font = '10px monospace';
          ctx.fillText(String(index+1).padStart(2,'0'),p.sx+9,p.sy-9);
        });
      }
      for (const p of points) {
        if (state.focus && !included(p.id)) continue;
        ctx.globalAlpha = Math.max(.32, Math.min(.95, (p.depth - .55) * 1.5));
        ctx.fillStyle = palette[p.cluster];
        const radius = Math.max(.55, p.size * p.depth);
        ctx.beginPath(); ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2); ctx.fill();
        // Every visible point has a luminous core and a restrained halo.
        {
          ctx.globalAlpha = .16; ctx.beginPath(); ctx.arc(p.sx, p.sy, radius * 3, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = .95; ctx.fillStyle = mapHighlights[p.cluster];
          ctx.beginPath(); ctx.arc(p.sx, p.sy, radius * .62, 0, Math.PI * 2); ctx.fill();
        }
      }
      for (const id of [state.hovered, state.selected]) {
        const p = points[id]; if (!p || (state.focus && !included(p.id))) continue;
        ctx.globalAlpha = 1; ctx.strokeStyle = palette[p.cluster]; ctx.fillStyle = mapHighlights[p.cluster];
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 3, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = .6; ctx.beginPath(); ctx.arc(p.sx, p.sy, 9, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (state.auto && !media.matches) raf = requestAnimationFrame(draw);
    };
    const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw); };
    const resize = () => {
      width = el.clientWidth; height = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); wake();
    };
    const hit = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(1, rect.width) * width;
      const y = (event.clientY - rect.top) / Math.max(1, rect.height) * height;
      let nearest = -1, distance = event.pointerType === "touch" ? 25 : 14;
      for (const p of points) {
        if (state.focus && !included(p.id)) continue;
        const d = Math.hypot(p.sx - x, p.sy - y);
        if (d < distance) { distance = d; nearest = p.id; }
      }
      return nearest;
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || drag) return;
      el.focus({ preventScroll: true });
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, moved: false };
      el.setPointerCapture(event.pointerId); stopAuto();
    };
    const move = (event: PointerEvent) => {
      stopAuto();
      if (drag && drag.id === event.pointerId) {
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) drag.moved = true;
        if (drag.moved) {
          state.yaw += (event.clientX - drag.x) * .006;
          // Touch keeps vertical scrolling native; horizontal drags rotate the map.
          if (event.pointerType !== "touch") state.pitch = Math.max(-1.1, Math.min(1.1, state.pitch + (event.clientY - drag.y) * .005));
          el.style.cursor = "grabbing";
        }
        drag.x = event.clientX; drag.y = event.clientY;
      } else { state.hovered = hit(event); el.style.cursor = state.hovered >= 0 ? "pointer" : "grab"; }
      wake();
    };
    const up = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      if (!drag.moved && event.type === "pointerup") { const id = hit(event); if (id >= 0) select(id); }
      drag = null; el.style.cursor = "grab"; stopAuto();
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      wake();
    };
    const leave = () => { state.hovered = -1; wake(); };
    const key = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-", "Enter", "Escape", "r", "R", " "].includes(event.key)) return;
      event.preventDefault(); stopAuto();
      if (event.key === "ArrowLeft") state.yaw -= .12;
      if (event.key === "ArrowRight") state.yaw += .12;
      if (event.key === "ArrowUp") state.pitch = Math.max(-1.1, state.pitch - .1);
      if (event.key === "ArrowDown") state.pitch = Math.min(1.1, state.pitch + .1);
      if (["+", "=", "-"].includes(event.key)) { state.zoom = Math.max(1, Math.min(1.35, state.zoom + (event.key === "-" ? -.15 : .15))); }
      if (event.key.toLowerCase() === "r") { state.yaw = 0; state.pitch = -.12; state.zoom = 1; state.focus = false; setIsolated(false); }
      if (event.key === " ") { state.paused = !state.paused; stopAuto(); }
      if (event.key === "Enter") select((state.selected + 1) % mapTracks.length);
      if (event.key === "Escape") { state.selected = -1; state.focus = false; state.matches = false; setIsolated(false); setMatches(false); setSelected(null); }
      wake();
    };
    const preference = () => {

      stopAuto();
      points = makePoints();
      if (state.selected >= points.length) { state.selected = -1; state.focus = false; state.matches = false; setIsolated(false); setMatches(false); setSelected(null); }
      state.hovered = -1; previousTime = 0; wake();
    };
    const visibility = () => { cancelAnimationFrame(raf); raf = 0; previousTime = 0; wake(); };
    const ro = new ResizeObserver(resize); ro.observe(el);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visibility(); }); io.observe(el);
    const wheel = (event: WheelEvent) => {
      if (document.activeElement !== el || event.ctrlKey) return;
      event.preventDefault(); stopAuto();
      state.zoom = Math.max(1, Math.min(1.35, state.zoom - event.deltaY * .001)); wake();
    };
    engine.current = { wake, select, activity: stopAuto, focus: () => { state.focus = !state.focus; setIsolated(state.focus); stopAuto(); wake(); } };
    el.addEventListener("wheel", wheel, { passive: false });
    preference();
    el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up); el.addEventListener("lostpointercapture", up);
    el.addEventListener("pointerleave", leave); el.addEventListener("keydown", key);
    media.addEventListener("change", preference); compact.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      clearTimeout(idleTimer); el.removeEventListener("wheel", wheel);
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); engine.current = null;
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); el.removeEventListener("lostpointercapture", up);
      el.removeEventListener("pointerleave", leave); el.removeEventListener("keydown", key);
      media.removeEventListener("change", preference); compact.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", wake);
    };
  }, []);

  const track = selected === null ? null : mapTracks[selected];
  const recommendations = selected === null ? [] : relatedIds(selected, matchDepth).slice(0,4).map(id => mapTracks[id]);
  useEffect(() => {
    camera.current.route = saved;
    camera.current.flow = flow;
    engine.current?.wake();
  }, [saved, flow]);
  const changeDepth = (depth: number) => { setMatchDepth(depth); camera.current.matchDepth = depth; engine.current?.activity(); engine.current?.wake(); };
  return <div className="sonar-interactive-map" onPointerMove={() => engine.current?.activity()} onKeyDown={() => engine.current?.activity()}>
    <canvas ref={canvas} className="sonar-map-canvas" tabIndex={0} role="group" aria-label="Interactive music map" aria-describedby="map-instructions" />
    <p id="map-instructions" className="sr-only">Drag to rotate. Select a point. Arrow keys rotate, plus and minus zoom, R resets, Space pauses automatic rotation, Enter selects the next demo track. Rotation resumes after two seconds of inactivity unless paused.</p>
    {track && <div className="sonar-map-selection" style={{ borderColor: palette[track.cluster], borderLeftColor: palette[track.cluster] }}>
      <small>SONAR / {String((selected ?? 0) + 1).padStart(4, "0")}</small>
      <strong>Sound {String(track.id + 1).padStart(3, "0")}</strong><span>Visual Map</span>
      <button className="sonar-selection-close" aria-label="Clear selected track" onClick={() => { camera.current.selected = -1; camera.current.focus = false; camera.current.matches = false; setIsolated(false); setMatches(false); setSelected(null); engine.current?.activity(); engine.current?.wake(); }}>×</button>
      <button className="sonar-hub-set" onClick={() => { setSetOpen(true); setSaved(prev => prev.includes(selected!) ? prev : [...prev, selected!]); engine.current?.activity(); }}>+ SET</button>
      {matches && <div className="sonar-selection-matches"><small>NEIGHBORS IN THE 3D PROJECTION</small>{recommendations.map(t => <button key={t.id} onClick={() => engine.current?.select(t.id)}><span>Sound {String(t.id + 1).padStart(3, "0")}</span></button>)}</div>}
      <span className="sonar-selection-status" role="status">{saved.length ? `${saved.length} track${saved.length === 1 ? '' : 's'} in demo set` : 'Interactive preview'}</span>
    </div>}
    <div className="sonar-map-provenance"><span className="sonar-status" /> VISUAL MAP</div>
    <div className="sonar-app-actions" role="group" aria-label="DJ map actions">
      <button title="Show your set order on the map" disabled={saved.length < 2} aria-pressed={flow} onClick={() => { camera.current.flow=!flow; setFlow(!flow); engine.current?.wake(); }}><Route size={15}/> <span>SET FLOW</span></button>
      <button title="Isolate the reference and its neighbors" disabled={!matches} aria-pressed={isolated} onClick={() => engine.current?.focus()}><Focus size={15}/><span>FOCUS</span></button>
      <div className="sonar-toolbar-matches">
        <button title="Show nearby sounds in the projection" disabled={selected === null} aria-pressed={matches} onClick={() => { camera.current.matches = !matches; if(matches) { camera.current.focus=false; setIsolated(false); } setMatches(!matches); engine.current?.activity(); engine.current?.wake(); }}><Network size={15}/><span>MATCHES</span></button>
        <div className="sonar-match-depth" role="group" aria-label="Recommendation depth">
          <button aria-label="Reduce match depth" disabled={!matches || matchDepth===1} onClick={()=>changeDepth(matchDepth-1)}><Minus size={12}/></button>
          <output aria-label="Match depth">{matchDepth}<span>/5</span></output>
          <button aria-label="Increase match depth" disabled={!matches || matchDepth===5} onClick={()=>changeDepth(matchDepth+1)}><Plus size={12}/></button>
        </div>
      </div>
      <button title="Open your selection" aria-label="Open set" aria-expanded={setOpen} onClick={() => { setSetOpen(!setOpen); engine.current?.activity(); }}><ListMusic size={15}/><span>SET</span><b>{saved.length}</b></button>
      <a href="#live" aria-label="Discover Live DJ"><ArrowUpRight size={16}/></a>
    </div>
    {setOpen && <aside className="sonar-map-set"><header>SONAR SET <button aria-label="Close demo set" onClick={()=>setSetOpen(false)}>×</button></header>{saved.length ? saved.map((id,i)=><div key={id}><span>{i+1}. Sound {String(id + 1).padStart(3, "0")}</span><button aria-label={`Remove ${mapTracks[id].title} from set`} onClick={()=>setSaved(prev=>prev.filter(n=>n!==id))}>×</button></div>) : <p>Select a track to begin.</p>}<small>SELECTION · SESSION ONLY</small></aside>}
  </div>;
}
