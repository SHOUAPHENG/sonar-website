import * as THREE from 'three';

export type GalaxyParams = {
  count: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  /** Vertical flattening of the disc (0 = flat, 1 = sphere). */
  thickness: number;
  insideColor: string;
  outsideColor: string;
};

export const defaultGalaxy: GalaxyParams = {
  count: 8000,
  radius: 9,
  branches: 4,
  spin: 1.15,
  randomness: 0.28,
  randomnessPower: 2.6,
  thickness: 0.32,
  insideColor: '#aef3ff', // cyan-white core
  outsideColor: '#d96bf5', // fuchsia rim (cyan→fuchsia lerps through violet)
};

export type GalaxyBuffers = {
  positions: Float32Array;
  colors: Float32Array;
  scales: Float32Array;
  randoms: Float32Array;
  /** A handful of bright inner star positions used to draw "connections". */
  hubs: THREE.Vector3[];
};

/**
 * Procedural spiral galaxy (à la three.js journey): points are distributed
 * along N branches, swept by a radius-dependent spin, then jittered. Colour
 * lerps from the inside hue to the outside hue with distance from the core.
 */
export function generateGalaxy(p: GalaxyParams): GalaxyBuffers {
  const positions = new Float32Array(p.count * 3);
  const colors = new Float32Array(p.count * 3);
  const scales = new Float32Array(p.count);
  const randoms = new Float32Array(p.count);
  const hubs: THREE.Vector3[] = [];

  const inside = new THREE.Color(p.insideColor);
  const outside = new THREE.Color(p.outsideColor);

  for (let i = 0; i < p.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * p.radius;
    const branchAngle = ((i % p.branches) / p.branches) * Math.PI * 2;
    const spinAngle = radius * p.spin;

    // Power distribution keeps jitter tight near the arms, looser outside.
    const rand = (axis: number) => {
      const r = Math.pow(Math.random(), p.randomnessPower);
      const sign = Math.random() < 0.5 ? 1 : -1;
      return r * sign * p.randomness * radius * axis;
    };

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rand(1);
    positions[i3 + 1] = rand(p.thickness);
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rand(1);

    // Colour by normalised radius.
    const mixed = inside.clone().lerp(outside, radius / p.radius);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;

    // Smaller, brighter dots near the core; larger, dimmer toward the rim.
    scales[i] = (1 - radius / p.radius) * 0.8 + Math.random() * 0.6 + 0.2;
    randoms[i] = Math.random();

    // Collect a few bright inner stars as connection hubs.
    if (radius < p.radius * 0.45 && Math.random() < 0.004 && hubs.length < 26) {
      hubs.push(
        new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]),
      );
    }
  }

  return { positions, colors, scales, randoms, hubs };
}

/**
 * Build line segments between each hub and its two nearest neighbours — a
 * subtle nod to SONAR's similarity graph.
 */
export function buildConnections(hubs: THREE.Vector3[]): Float32Array {
  const segments: number[] = [];
  hubs.forEach((a, i) => {
    const dists = hubs
      .map((b, j) => ({ j, d: a.distanceTo(b) }))
      .filter((o) => o.j !== i)
      .sort((u, v) => u.d - v.d)
      .slice(0, 2);
    for (const { j } of dists) {
      const b = hubs[j];
      segments.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  });
  return new Float32Array(segments);
}
