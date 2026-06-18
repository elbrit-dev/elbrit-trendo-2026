"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Mount once. Reveals every `.reveal` element as it scrolls into view, animating
 * with GSAP. Detection uses an IntersectionObserver (not ScrollTrigger) because
 * it reliably fires for elements that are already in view on load or after a
 * deep-link / programmatic jump — which is exactly where scroll-event-driven
 * triggers can leave content stuck hidden.
 *
 * A `reveals-ready` class is added to <html> first, so the page stays fully
 * visible if JS is disabled or fails (the CSS only hides `.reveal` after this).
 */
export default function ScrollReveals() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // CSS keeps everything visible

    document.documentElement.classList.add("reveals-ready");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    gsap.set(els, { opacity: 0, y: 34 });

    const reveal = (el: HTMLElement) => {
      const sibs = el.parentElement
        ? Array.from(el.parentElement.querySelectorAll(":scope > .reveal"))
        : [];
      const idx = Math.max(0, sibs.indexOf(el));
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: idx * 0.09,
        overwrite: true,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      gsap.set(els, { clearProps: "all" });
      document.documentElement.classList.remove("reveals-ready");
    };
  }, []);

  return null;
}
