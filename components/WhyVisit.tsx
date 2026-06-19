import Icon from "./Icons";

type IconName = "science" | "speakers" | "network" | "launch" | "check";

const VISIT: { icon: IconName; title: string; body: string }[] = [
  { icon: "launch", title: "See It First", body: "Our newest range, before anyone else." },
  { icon: "speakers", title: "Meet Us", body: "Face to face. Finally." },
  { icon: "science", title: "Live Demo", body: "Hydrox nano-delivery, in your hands." },
  { icon: "check", title: "Just for You", body: "Product insights built around your practice." },
];

export default function WhyVisit() {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Why visit</span>
          <h2 className="section-title">Skip the queue. Start at our stall.</h2>
        </div>

        <div className="cards-grid">
          {VISIT.map((v) => (
            <article className="feature-card glass reveal" key={v.title}>
              <div className="feature-icon">
                <Icon name={v.icon} size={26} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
