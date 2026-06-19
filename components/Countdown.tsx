"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/content";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(toMs: number): Parts {
  const ms = Math.max(0, toMs - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    mins: Math.floor((ms / 60000) % 60),
    secs: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown() {
  // null until mounted → avoids SSR/client hydration mismatch on time.
  const [parts, setParts] = useState<Parts | null>(null);
  const target = new Date(EVENT.startsAt).getTime();

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: number | null }[] = [
    { label: "Days", value: parts?.days ?? null },
    { label: "Hours", value: parts?.hours ?? null },
    { label: "Minutes", value: parts?.mins ?? null },
    { label: "Seconds", value: parts?.secs ?? null },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="countdown-wrap reveal">
          <div>
            <span className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
              Countdown
            </span>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              The floor opens in…
            </h2>
            <p className="section-sub" style={{ textAlign: "center" }}>
              Your spot at our stall is closer than you think.
            </p>
          </div>
          <div className="countdown">
            {units.map((u) => (
              <div className="cd-unit glass" key={u.label}>
                <div className="cd-num">
                  {u.value === null ? "––" : String(u.value).padStart(2, "0")}
                </div>
                <div className="cd-label">{u.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
