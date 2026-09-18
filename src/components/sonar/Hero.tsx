"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, ScanLine } from "lucide-react";
import { InteractiveMap } from "./InteractiveMap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 700px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const staticHero = reduce || compact;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const detailOpacity = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]);
  return (
    <section className="sonar-hero" ref={ref} aria-labelledby="hero-title">
      <div className="sonar-hero-stage">
        <motion.div
          className="sonar-hero-copy"
          style={staticHero ? {} : { y, opacity }}
        >
          <p className="sonar-eyebrow">
            <span className="sonar-status" /> A NEW PERSPECTIVE ON SOUND
          </p>
          <h1 id="hero-title">
            SONAR
            <span className="sonar-title-dot" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="sonar-hero-tagline">Your music. Connected.</p>
          <p className="sonar-hero-description">
            A living map of your music.
            <br className="mobile-break" /> A new way to find what comes next.
          </p>
          <div className="sonar-actions">
            <a className="sonar-button" href="#beta">
              Join the Beta <ArrowUpRight size={15} />
            </a>
            <a className="sonar-link" href="#product">
              Discover SONAR <ArrowDown size={14} />
            </a>
          </div>
        </motion.div>
        <motion.div
          className="sonar-hero-map"
          style={staticHero ? {} : { scale, y }}
        >
          <InteractiveMap />
          <span className="map-coordinate coord-left">
            
          </span>
          <span className="map-coordinate coord-right">
            
          </span>
        </motion.div>
        <motion.p
          className="sonar-hero-discovery"
          style={staticHero ? { display: "none" } : { opacity: detailOpacity }}
        >
          Not random points.
          <br />
          <span>Relationships you can see.</span>
        </motion.p>
        <div className="sonar-hero-bottom">
          <span>
            <ScanLine size={14} /> VISUAL MAP <i /> INTERACTIVE PREVIEW
          </span>
          <a href="#product">
            SCROLL TO EXPLORE <ArrowDown size={13} />
          </a>
          <span>BUILT FOR DJs & PRODUCERS</span>
        </div>
      </div>
    </section>
  );
}
