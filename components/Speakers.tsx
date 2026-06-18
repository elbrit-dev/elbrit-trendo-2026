/* eslint-disable @next/next/no-img-element */
import { SPEAKERS } from "@/lib/content";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Speakers() {
  return (
    <section className="section" id="speakers">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">The faculty</span>
          <h2 className="section-title">Learn from the best in the field</h2>
          <p className="section-sub">
            A line-up of national and international key opinion leaders. Full speaker reveal coming soon.
          </p>
        </div>

        <div className="speakers-grid">
          {SPEAKERS.map((s) => (
            <article className="speaker glass reveal" key={s.name}>
              {s.photo ? (
                <img className="speaker-photo" src={s.photo} alt={s.name} width={110} height={110} />
              ) : (
                <div className="speaker-photo">{initials(s.name)}</div>
              )}
              <h4>{s.name}</h4>
              <p>{s.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
