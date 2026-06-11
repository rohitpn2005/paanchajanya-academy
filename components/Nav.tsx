"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { useLead } from "./LeadProvider";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { open } = useLead();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header id="hdr" className={solid ? "solid" : ""}>
      <div className="wrap nav">
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/images/paanchajanya-logo.png" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-wordmark" src="/images/paanchajanya-wordmark.png" alt="PaanchaJanya" />
          <span className="brand-academy">academy</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "active" : ""}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <button className="btn btn-primary" onClick={() => open("")}>Book now</button>
          <button
            className="nav-toggle"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={isActive(n.href) ? "active" : ""}>
            {n.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
