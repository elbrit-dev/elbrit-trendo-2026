"use client";

import Icon from "./Icons";
import CylinderGallery, { type CylinderPanel } from "./CylinderGallery";

// Small badge-icon wrappers (the gallery expects an `Icon` component per panel).
const LaunchIcon = () => <Icon name="launch" size={16} />;
const CalIcon = () => <Icon name="calendar" size={16} />;
const CheckIcon = () => <Icon name="check" size={16} />;
const NetIcon = () => <Icon name="network" size={16} />;
const SciIcon = () => <Icon name="science" size={16} />;

const CALBRIT_PANELS: CylinderPanel[] = [
  {
    image: "/calbrit/p07.png",
    alt: "Calbrit 60K powered by the Hydrox platform",
    title: "Powered by Hydrox",
    description: "Advanced nano-delivery in an easy chewable form.",
    Icon: LaunchIcon,
  },
  {
    image: "/calbrit/p02.png",
    alt: "Calbrit 60K nano chewable form",
    title: "Nano, Made Chewable",
    description: "Weekly-once convenience for everyday wellness.",
    Icon: CheckIcon,
  },
  {
    image: "/calbrit/p06.png",
    alt: "Calbrit 60K weekly-once chewable pack",
    title: "Weekly-Once Dosing",
    description: "One tablet. Once a week. Simple.",
    Icon: CalIcon,
  },
  {
    image: "/calbrit/p03.png",
    alt: "Hydrox nanoparticle delivery platform",
    title: "The Hydrox Platform",
    description: "Rapid dispersion. Efficient absorption.",
    Icon: NetIcon,
  },
  {
    image: "/calbrit/p01.png",
    alt: "Absorption study comparison",
    title: "Proven Absorption",
    description: "Markedly higher exposure vs. conventional alternatives.",
    Icon: SciIcon,
  },
];

export default function Agenda() {
  return (
    <section className="section" id="agenda">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Calbrit 60K</span>
          <h2 className="section-title">Come taste the future of Vitamin D.</h2>
          <p className="section-sub">
            Chewable. Weekly. Mint on the tongue. Powered by Hydrox — Elbrit&apos;s nano-delivery breakthrough. Try it at our stall — the data surprised even us.
          </p>
        </div>

        <div className="reveal">
          <CylinderGallery panels={CALBRIT_PANELS} />
        </div>
      </div>
    </section>
  );
}
