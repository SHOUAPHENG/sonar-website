"use client";

import { useEffect, useRef } from "react";

import { mapHighlights, fluxGradient } from "./mapPalette";
// Seeded, anisotropic neighborhoods: each dot represents a demo audio item.
function library(count: number) {
  let seed = 42;
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const centers = [
    [-0.32, 0.04],
    [-0.14, -0.09],
    [0.06, 0.02],
    [0.27, -0.08],
    [0.39, 0.13],
  ];
  return Array.from({ length: count }, (_, i) => {
    const cluster = i % centers.length;
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(-2 * Math.log(Math.max(0.001, random()))) * 0.062;
    return {
      x: centers[cluster][0] + Math.cos(angle) * radius * 1.25,
      y: centers[cluster][1] + Math.sin(angle) * radius * 0.8,
      z: random(),
      size: 0.45 + random() * 1.05,
      cluster,
      phase: random() * Math.PI * 2,
    };
  });
}

export default function MapCanvas({
  mode = "library",
}: {
  mode?: "library" | "samples";
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d", { alpha: true });
    if (!el || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)");
    let projected = library(mobile.matches ? 1100 : 3600).map(p => ({ x: 0, y: 0, p }));
    let width = 0,
      height = 0,
      frame = 0,
      visible = false,
      tick = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const draw = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      // Time is frozen for reduced motion; no background animation loop.
      tick = reduced.matches ? 0 : time * 0.00012;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      ctx.clearRect(0, 0, width, height);
      const scale = width < 700 ? width * 1.38 : width;
      for (const point of projected) {
        const p = point.p;
        const z = 0.7 + p.z * 0.45;
        let x = p.x,
          y = p.y;
        if (mode === "samples") {
          x = p.x * 0.85;
          y = p.y * 1.65 + Math.sin(p.x * 22) * 0.035;
        }
        point.x =
            width * 0.5 +
            x * scale * z +
            Math.sin(tick + p.phase) * 2.4 +
            pointer.x * p.z * 15;
        point.y =
            height * 0.51 +
            y * scale * 0.66 * z +
            Math.cos(tick + p.phase) * 2 +
            pointer.y * p.z * 10;
      }
      ctx.lineWidth = 0.9;
      for (let i = 0; i < projected.length; i += 29) {
        const a = projected[i],
          b = projected[(i + 25) % projected.length];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 105 && distance > 15) {
          ctx.strokeStyle = fluxGradient(ctx, a.x, a.y, b.x, b.y, a.p.cluster, b.p.cluster);
          ctx.globalAlpha = 0.48;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const { x, y, p } of projected) {
        const distance = Math.hypot(
          x - ((pointer.x + 1) * width) / 2,
          y - ((pointer.y + 1) * height) / 2,
        );
        ctx.globalAlpha = Math.min(
          0.95,
          0.78 + p.z * 0.12 + Math.max(0, 1 - distance / 130) * 0.05,
        );
        ctx.fillStyle = mapHighlights[p.cluster];
        const radius = p.size * (0.55 + p.z * 0.7);
        const brightness = ctx.globalAlpha;
        ctx.globalAlpha = .12;
        ctx.beginPath(); ctx.arc(x, y, radius * 2.8, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = brightness;
        if (mode === "samples") ctx.fillRect(x, y, radius * 1.3, radius * 2.8);
        else {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      // Use layout dimensions, independent of the cinematic parent transform.
      width = el.clientWidth;
      height = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      start();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersection.observe(el);
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      pointer.targetY = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
    };
    const leave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    const preference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      projected = library(mobile.matches ? 1100 : 3600).map(p => ({ x: 0, y: 0, p }));
      pointer.x = pointer.y = pointer.targetX = pointer.targetY = 0;
      start();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    mobile.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
      mobile.removeEventListener("change", preference);
    };
  }, [mode]);
  return (
    <canvas ref={canvas} className="sonar-map-canvas" aria-hidden="true" />
  );
}
