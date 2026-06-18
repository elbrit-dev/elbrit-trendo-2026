/**
 * ──────────────────────────────────────────────────────────────────
 *  TRENDO 2026 — SINGLE SOURCE OF CONTENT
 * ──────────────────────────────────────────────────────────────────
 *  Everything the landing page says lives here. Edit this one file to
 *  update the site — nothing else needs to change.
 *
 *  ⚠️  Values marked  // PLACEHOLDER  are educated guesses. Replace them
 *      with the real Trendo 2026 details and the page updates instantly.
 * ──────────────────────────────────────────────────────────────────
 */

export const EVENT = {
  brand: "Elbrit",
  name: "TRENDO",
  year: "2026",
  edition: "The Annual Elbrit Conclave", // PLACEHOLDER
  tagline: "Redefining Tomorrow in Healthcare", // PLACEHOLDER
  theme:
    "A landmark gathering of India's leading clinicians — science, innovation and the future of patient care, under one roof.", // PLACEHOLDER
  // ISO date-time of day-1 start. Drives the live countdown.
  startsAt: "2026-06-19T09:00:00+05:30",
  dateLabel: "June 19 to June 21, 2026",
  venue: "Hotel Radisson",
  city: "Salem, Tamil Nadu",
  // Google Maps link for the venue (opens the location when clicked).
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Radisson+Hotel+Salem+Tamil+Nadu",
};

/** Headline stats shown as animated counters. */
export const STATS = [
  { value: 1200, suffix: "+", label: "Doctors" }, // PLACEHOLDER
  { value: 40, suffix: "+", label: "Expert Speakers" }, // PLACEHOLDER
  { value: 18, suffix: "", label: "Scientific Sessions" }, // PLACEHOLDER
  { value: 3, suffix: " Days", label: "of Insight" }, // PLACEHOLDER
];

/** "Why attend" pillars. */
export const HIGHLIGHTS = [
  {
    icon: "science",
    title: "Cutting-edge Science",
    body: "Latest clinical evidence and real-world data across cardio-metabolic, respiratory and women's health.", // PLACEHOLDER
  },
  {
    icon: "speakers",
    title: "World-class Faculty",
    body: "Learn directly from national and international key opinion leaders shaping modern practice.", // PLACEHOLDER
  },
  {
    icon: "network",
    title: "Peer Networking",
    body: "Connect with 1,200+ fellow clinicians across specialities over three immersive days.", // PLACEHOLDER
  },
  {
    icon: "launch",
    title: "Innovation Showcase",
    body: "Be the first to experience Elbrit's newest platforms and therapies, live on stage.", // PLACEHOLDER
  },
];

/** Agenda — group sessions by day. */
export const AGENDA = [
  {
    day: "Day 1",
    date: "22 Aug", // PLACEHOLDER
    sessions: [
      { time: "09:00", title: "Registration & Welcome Breakfast" },
      { time: "10:00", title: "Inaugural Keynote: The Next Decade of Care" },
      { time: "11:30", title: "Cardio-Metabolic Masterclass" },
      { time: "14:00", title: "Panel: Bridging Evidence & Practice" },
      { time: "18:30", title: "Gala Networking Dinner" },
    ],
  }, // PLACEHOLDER (whole day)
  {
    day: "Day 2",
    date: "23 Aug", // PLACEHOLDER
    sessions: [
      { time: "09:30", title: "Respiratory Therapeutics Update" },
      { time: "11:00", title: "Women's Health Symposium" },
      { time: "14:00", title: "Hands-on Clinical Workshops" },
      { time: "16:30", title: "Elbrit Innovation Showcase" },
    ],
  }, // PLACEHOLDER (whole day)
  {
    day: "Day 3",
    date: "24 Aug", // PLACEHOLDER
    sessions: [
      { time: "10:00", title: "Future of Digital Health" },
      { time: "12:00", title: "Awards & Recognition" },
      { time: "13:00", title: "Closing Address & Farewell Lunch" },
    ],
  }, // PLACEHOLDER (whole day)
];

/** Featured speakers. Drop a headshot into /public/speakers/ and set `photo`. */
export const SPEAKERS = [
  { name: "Dr. A. Speaker", title: "Cardiologist, Apollo", photo: "" }, // PLACEHOLDER
  { name: "Dr. B. Speaker", title: "Endocrinologist, AIIMS", photo: "" }, // PLACEHOLDER
  { name: "Dr. C. Speaker", title: "Pulmonologist, CMC", photo: "" }, // PLACEHOLDER
  { name: "Dr. D. Speaker", title: "Gynaecologist, Fortis", photo: "" }, // PLACEHOLDER
];

export const CONTACT = {
  email: "hr@elbrit.org",
  phone: "+91 73584 19644",
  website: "https://www.elbrit.org",
};
