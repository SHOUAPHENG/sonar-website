'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import {
  buildConnections,
  defaultGalaxy,
  generateGalaxy,
  type GalaxyParams,
} from './galaxyGeometry';

const vertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aRandom;

  varying vec3 vColor;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Twinkle: each point breathes on its own phase.
    float twinkle = sin(uTime * 1.6 + aRandom * 6.2831) * 0.25 + 1.0;

    gl_PointSize = uSize * aScale * twinkle * uPixelRatio;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = color;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    // Soft radial falloff -> round, glowing dots.
    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.0, 0.5, d);
    strength = pow(strength, 2.4);
    if (strength < 0.01) discard;
    gl_FragColor = vec4(vColor, strength);
  }
`;

/**
 * The galaxy itself: a custom-shader Points cloud plus faint connection lines.
 * Auto-rotates and parallaxes gently toward the pointer.
 */
export function GalaxyPoints({ params }: { params?: Partial<GalaxyParams> }) {
  const p = useMemo<GalaxyParams>(() => ({ ...defaultGalaxy, ...params }), [params]);

  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, scales, randoms, connections } = useMemo(() => {
    const g = generateGalaxy(p);
    return {
      positions: g.positions,
      colors: g.colors,
      scales: g.scales,
      randoms: g.randoms,
      connections: buildConnections(g.hubs),
    };
  }, [p]);

  const uniforms = useMemo(
    () => ({
      uSize: { value: 26 },
      uTime: { value: 0 },
      uPixelRatio: {
        value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (group.current) {
      // Slow continuous spin.
      group.current.rotation.y += delta * 0.045;
      // Ease the disc tilt toward the pointer for a living, reactive feel.
      const px = state.pointer.x;
      const py = state.pointer.y;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.42 + py * 0.18,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        px * 0.12,
        0.04,
      );
    }
  });

  return (
    <group ref={group} rotation={[-0.42, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Similarity connections */}
      {connections.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connections, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#9ec5ff"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Bright core glow sprite */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#eafcff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
