/** Five neighborhoods derived from the desktop SONAR spectral palette.
 * Point bodies are deeper; flux endpoints retain the application's bright colors. */
export const mapPalette = ["#149DD7", "#355DE0", "#8F35DB", "#CA35DF", "#E32D84", "#E53E50", "#E67B20", "#DAB528", "#7EB738", "#31B96D", "#21B8A5"];
export const mapHighlights = ["#39C6FF", "#4A7DFF", "#A855F7", "#F04BFF", "#FF4FA3", "#FF5964", "#FF922B", "#FFD84A", "#A7E65E", "#62D98B", "#46D9C5"];
export function fluxGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, from: number, to: number) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, mapHighlights[from] + "A6");
  gradient.addColorStop(.45, mapPalette[from] + "66");
  gradient.addColorStop(1, mapHighlights[to] + "45");
  return gradient;
}
