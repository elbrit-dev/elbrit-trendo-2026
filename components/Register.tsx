import LeadForm from "./LeadForm";
import Icon from "./Icons";

const PERKS = [
  "Free delegate pass for verified doctors",
  "CME-oriented scientific sessions across specialities",
  "Networking with 1,200+ fellow clinicians",
  "Priority updates on agenda, speakers & travel",
];

export default function Register() {
  return (
    <section className="section register" id="register">
      <div className="container">
        <div className="register-grid">
          <div className="register-copy reveal">
            <span className="eyebrow">Registration</span>
            <h2>Claim your seat at Trendo 2026</h2>
            <p className="section-sub">
              Passes are limited and reserved for registered medical practitioners. Tell us a little about you and our
              team will confirm your delegate pass.
            </p>
            <ul className="register-perks">
              {PERKS.map((p) => (
                <li key={p}>
                  <Icon name="check" size={18} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
