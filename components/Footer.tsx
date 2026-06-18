import ElbritLogo from "./ElbritLogo";
import Icon from "./Icons";
import { EVENT, CONTACT } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <ElbritLogo height={34} />
            <p>
              {EVENT.name} {EVENT.year} — {EVENT.edition}. {EVENT.tagline}.
            </p>
          </div>

          <div className="footer-col">
            <strong>Event</strong>
            <p>
              {EVENT.dateLabel}
              <br />
              {EVENT.venue}, {EVENT.city}
            </p>
          </div>

          <div className="footer-col footer-contact">
            <strong>Contact</strong>
            <a href={`mailto:${CONTACT.email}`}>
              <Icon name="mail" size={15} /> {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
              <Icon name="phone" size={15} /> {CONTACT.phone}
            </a>
            <a href={CONTACT.website} target="_blank" rel="noreferrer">
              <Icon name="globe" size={15} /> elbrit.org
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {EVENT.year} Elbrit Life Sciences. All rights reserved.</span>
          <span>For registered medical practitioners only.</span>
        </div>
      </div>
    </footer>
  );
}
