'use client';

import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import { GalaxyPoints } from './GalaxyPoints';

/**
 * Everything inside the <Canvas>: a solid deep-navy background (so bloom
 * composites cleanly), the procedural galaxy, a distant starfield, floating
 * dust, and a bloom pass for the cosmic glow.
 */
export function GalaxyScene() {
  return (
    <>
      <color attach="background" args={['#03050f']} />
      <fog attach="fog" args={['#03050f', 9, 22]} />

      <GalaxyPoints />

      {/* Distant stars */}
      <Stars radius={90} depth={60} count={2200} factor={4} saturation={0} fade speed={0.5} />

      {/* Foreground dust drifting toward the camera */}
      <Sparkles
        count={50}
        scale={[16, 7, 16]}
        size={2.2}
        speed={0.25}
        color="#bcd6ff"
        opacity={0.5}
      />

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.15}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}
