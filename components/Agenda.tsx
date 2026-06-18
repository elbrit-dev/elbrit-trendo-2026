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
    description: "Advanced nano-delivery in a convenient, easy-to-take chewable form.",
    Icon: LaunchIcon,
  },
  {
    image: "/calbrit/p02.png",
    alt: "Calbrit 60K nano chewable form",
    title: "Nano, Made Chewable",
    description: "A convenient, weekly-once chewable form for everyday wellness.",
    Icon: CheckIcon,
  },
  {
    image: "/calbrit/p06.png",
    alt: "Calbrit 60K weekly-once chewable pack",
    title: "Weekly-Once Dosing",
    description: "One chewable tablet, once a week — simple, consistent dosing.",
    Icon: CalIcon,
  },
  {
    image: "/calbrit/p03.png",
    alt: "Hydrox nanoparticle delivery platform",
    title: "The Hydrox Platform",
    description: "A nanoparticle delivery system for rapid dispersion and efficient absorption.",
    Icon: NetIcon,
  },
  {
    image: "/calbrit/p01.png",
    alt: "Absorption study comparison",
    title: "Proven Absorption",
    description: "Markedly higher absorption and exposure versus conventional alternatives in a randomized study.",
    Icon: SciIcon,
  },
];

export default function Agenda() {
  return (
    <section className="section" id="agenda">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">The product</span>
          <h2 className="section-title">Calbrit 60K</h2>
          <p className="section-sub">
            Powered by the Hydrox platform&apos;s nanoparticle delivery technology — a convenient, mint-flavoured chewable tablet with weekly-once dosing that replenishes vitamin D levels.
          </p>
        </div>

        <div className="reveal">
          <CylinderGallery panels={CALBRIT_PANELS} />
        </div>
      </div>
    </section>
  );
}
