"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SiteBackground } from "./SiteBackground";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollProgress } from "../ui/ScrollProgress";

/** Keep the existing secondary pages independent of the new product homepage. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return <main id="main-content">{children}</main>;
  return (
    <>
      <SiteBackground />
      <ScrollProgress />
      <SmoothScroll>
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
