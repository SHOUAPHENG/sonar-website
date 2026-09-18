'use client';

import { Canvas } from '@react-three/fiber';

import { GalaxyScene } from './GalaxyScene';

/**
 * WebGL canvas for the hero galaxy. Default-exported so it can be lazily
 * imported with `ssr: false` (Three.js must never run on the server).
 */
export default function GalaxyHero() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2.4, 8], fov: 55, near: 0.1, far: 100 }}
    >
      <GalaxyScene />
    </Canvas>
  );
}
