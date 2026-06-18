import { AGENDA } from "@/lib/content";

export default function Agenda() {
  return (
    <section className="section" id="agenda">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">The programme</span>
          <h2 className="section-title">Three days, one trajectory</h2>
          <p className="section-sub">
            A provisional flow of keynotes, masterclasses and hands-on sessions. Final agenda shared closer to the event.
          </p>
        </div>

        <div className="agenda-grid">
          {AGENDA.map((d) => (
            <div className="agenda-day glass reveal" key={d.day}>
              <div className="agenda-day-head">
                <span className="day">{d.day}</span>
                <span className="date">{d.date}</span>
              </div>
              {d.sessions.map((s, i) => (
                <div className="session" key={i}>
                  <span className="time">{s.time}</span>
                  <span className="what">{s.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
