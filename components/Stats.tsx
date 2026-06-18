"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-IN");
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="stats glass reveal" ref={root}>
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-value">
                <span className="stat-num" data-value={s.value}>
                  {s.value.toLocaleString("en-IN")}
                </span>
                <span className="suffix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
