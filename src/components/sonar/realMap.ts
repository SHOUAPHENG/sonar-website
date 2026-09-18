import samples from "./realMapData.json";

// Real SONAR Producer UMAP export, uniformly scaled and anonymized.
// No audio, filesystem paths, asset identifiers or invented metadata are shipped.
export const mapTracks = samples;
export const neighbors = samples.map(source => samples
  .filter(target => target.id !== source.id)
  .sort((a, b) => distance(source, a) - distance(source, b))
  .slice(0, 20).map(target => target.id));
function distance(a: typeof samples[number], b: typeof samples[number]) {
  return (a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2;
}
export function relatedIds(id: number, depth = 1) {
  return neighbors[id]?.slice(0, depth * 4) ?? [];
}
export function makePoints() {
  return samples.map(sample => ({ ...sample, size: 1.8, sx: 0, sy: 0, depth: 1 }));
}
