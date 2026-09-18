import { favorites, history, nowPlaying } from "@/lib/mockData";

// Reuse the site's existing demo library, not invented live analysis results.
export const demoTracks = [nowPlaying, ...favorites.slice(1), ...history];
export const relationships = [
  {
    name: "CORE",
    title: "The sound at the center.",
    detail: "Tracks that define a musical neighborhood.",
    x: "47%",
    y: "48%",
  },
  {
    name: "HUB",
    title: "One track. Many directions.",
    detail: "A natural connection to the music around it.",
    x: "35%",
    y: "39%",
  },
  {
    name: "BRIDGE",
    title: "A way into something new.",
    detail: "Find the tracks that connect different clusters.",
    x: "61%",
    y: "46%",
  },
  {
    name: "OUTLIER",
    title: "Beautifully unexpected.",
    detail: "Rediscover the tracks that stand apart.",
    x: "79%",
    y: "70%",
  },
] as const;

export const sampleTypes = [
  "Kicks",
  "Snares",
  "Vocals",
  "Loops",
  "One shots",
  "Stems",
] as const;
