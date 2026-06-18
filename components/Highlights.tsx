import { HIGHLIGHTS } from "@/lib/content";
import Icon from "./Icons";

type IconName = "science" | "speakers" | "network" | "launch";

export default function Highlights() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Why attend</span>
          <h2 className="section-title">Three days that move medicine forward</h2>
          <p className="section-sub">
            Trendo brings the science, the people and the innovation that shape how you practise — all in one place.
          </p>
        </div>

        <div className="cards-grid">
          {HIGHLIGHTS.map((h) => (
            <article className="feature-card glass reveal" key={h.title}>
              <div className="feature-icon">
                <Icon name={h.icon as IconName} size={26} />
              </div>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
