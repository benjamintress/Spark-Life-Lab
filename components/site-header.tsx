"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

// All nav destinations are page routes. Clicking the item for the page you are already on scrolls to the top
// (smoothly, unless reduced motion is requested) instead of doing nothing.
// The homepage has its own internal anchor links for on-page scroll.
const navLinks = [
  { label: "Identity Lab", href: "/identity-lab/" },
  { label: "Our Story",    href: "/about/" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Same-page click → back to the top; any other destination navigates normally.
  const toTopIfCurrent = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const norm = (v: string) => (v.length > 1 ? v.replace(/\/+$/, "") : v);
    if (norm(pathname ?? "") !== norm(href)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setMenuOpen(false);
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}>
      <Link className="wordmark" href="/" aria-label="SparkLifeLab — home" onClick={(e) => toTopIfCurrent(e, "/")}>
        <Image
          src="/images/sparklifelab-wordmark.png"
          alt="SparkLifeLab"
          width={1070}
          height={221}
          className="wordmark-image"
          preload
        />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((item) => (
          <Link key={item.label} href={item.href} onClick={(e) => toTopIfCurrent(e, item.href)}>{item.label}</Link>
        ))}
      </nav>

      <Link className="header-cta" href="/#clarity-check">
        Take the Midlife Clarity Check →
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
      </button>

      <div
        className={`mobile-nav-panel${menuOpen ? " is-open" : ""}`}
        id="mobile-nav"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                setMenuOpen(false);
                toTopIfCurrent(e, item.href);
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="mobile-nav-cta"
            href="/#clarity-check"
            onClick={() => setMenuOpen(false)}
          >
            Take the Midlife Clarity Check →
          </Link>
        </nav>
      </div>
    </header>
  );
}
