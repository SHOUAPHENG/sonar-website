import type { Metadata } from "next";
import { Header, Footer } from "@/components/sonar/Chrome";
import { Hero } from "@/components/sonar/Hero";
import { Library } from "@/components/sonar/Library";
import { Matches } from "@/components/sonar/Matches";
import { Workspace, Rekordbox, LiveDJ } from "@/components/sonar/Workspace";
import { Producer } from "@/components/sonar/Producer";
import { Technology, Beta } from "@/components/sonar/Closing";
import { AmbientField } from "@/components/sonar/AmbientField";
import { FeatureLab } from "@/components/sonar/FeatureLab";
import { Plans } from "@/components/sonar/Plans";
import "./sonar.css";

export const metadata: Metadata = {
  title: { absolute: "SONAR — Your music. Connected." },
  description:
    "A living map of your music. Explore your library, find your next track and prepare your sets with SONAR. Built for DJs and producers.",
  openGraph: {
    title: "SONAR — Your music. Connected.",
    description:
      "See your library differently. A new perspective on music for DJs and producers.",
  },
  twitter: {
    title: "SONAR — Your music. Connected.",
    description: "A living map of your music.",
    card: "summary",
  },
};

export default function HomePage() {
  const configured = process.env.SONAR_BETA_URL;
  const betaHref =
    configured && /^(https:\/\/|mailto:)/.test(configured)
      ? configured
      : undefined;
  return (
    <div className="sonar-site" lang="en">
      <AmbientField />
      <Header />
      <Hero />
      <Library />
      <Matches />
      <Workspace />
      <FeatureLab />
      <Rekordbox />
      <LiveDJ />
      <Producer />
      <Technology />
      <Plans />
      <Beta href={betaHref} />
      <Footer />
    </div>
  );
}
