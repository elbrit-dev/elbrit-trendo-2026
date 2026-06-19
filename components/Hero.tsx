"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { EVENT } from "@/lib/content";
import Icon from "./Icons";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-title .line", { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.2")
        .from(".hero-tagline", { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-theme", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-chip", { y: 18, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".hero-cta > *", { y: 18, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.3")
        .from(".scroll-cue", { opacity: 0, duration: 0.8 }, "-=0.1");
    },
    { scope: root }
  );

  return (
    <section className="hero container" id="top" ref={root}>
      <div className="hero-inner">
        <span className="hero-badge">
          <span className="dot" />
          {EVENT.brand} participates in
        </span>

        <h1 className="hero-title">
          <span className="line trendo" style={{ display: "block" }}>
            {EVENT.name}
          </span>
          <span className="line year" style={{ display: "block" }}>
            {EVENT.year}
          </span>
        </h1>

        <p className="hero-tagline">{EVENT.tagline}</p>
        <p className="hero-theme">{EVENT.theme}</p>

        <div className="hero-meta">
          <span className="hero-chip">
            <Icon name="calendar" size={18} />
            {EVENT.dateLabel}
          </span>
          <a className="hero-chip" href={EVENT.mapUrl} target="_blank" rel="noreferrer">
            <Icon name="pin" size={18} />
            {EVENT.venue}, {EVENT.city}
          </a>
        </div>

        <div className="hero-cta">
          <a href="#register" className="btn btn-primary">
            Reserve Your Visit · 60 seconds
            <Icon name="arrow" size={18} />
          </a>
          <a href="#agenda" className="btn btn-ghost">
            Explore our Product
          </a>
        </div>
      </div>

      <div className="scroll-cue">
        <span className="mouse" />
        Scroll
      </div>
    </section>
  );
}
