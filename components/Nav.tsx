"use client";

import { useEffect, useRef, useState } from "react";
import ElbritLogo from "./ElbritLogo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Calbrit 60K" },
  { href: "#register", label: "Register" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" aria-label="Elbrit Trendo 2026 home">
          <ElbritLogo height={28} />
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#register" className="btn btn-primary" style={{ padding: "0.6rem 1.3rem", fontSize: "0.9rem" }}>
            Register Free
          </a>
        </nav>
      </div>
      <div className="nav-progress" ref={barRef} />
    </header>
  );
}
