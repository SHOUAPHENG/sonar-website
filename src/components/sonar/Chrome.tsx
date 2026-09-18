"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["Product", "#product"],
  ["DJ", "#dj"],
  ["Producer", "#producer"],
  ["Technology", "#technology"],
  ["Plans", "#plans"],
] as const;

export function Brand() {
  return (
    <Link href="/" className="sonar-brand" aria-label="SONAR home">
      <Image src="/brand/logo.png" alt="" width={32} height={30} priority />
      <span>SONAR</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className={`sonar-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="sonar-skip" href="#product">
        Skip to product
      </a>
      <Brand />
      <nav
        aria-label="Main navigation"
        id="sonar-navigation"
        className={open ? "is-open" : ""}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="sonar-header-actions">
        <a
          className="sonar-button small"
          href="#beta"
          onClick={() => setOpen(false)}
        >
          Join Beta <ArrowUpRight size={13} />
        </a>
        <button
          className="sonar-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="sonar-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="sonar-footer">
      <div>
        <Brand />
        <span>Your music. Connected.</span>
      </div>
      <nav aria-label="Footer navigation">
        {links.slice(0, 3).map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
        <a href="#plans">Plans</a>
        <a href="#beta">Beta</a>
      </nav>
      <small>© {new Date().getFullYear()} SONAR</small>
    </footer>
  );
}
