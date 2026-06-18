"use client";

import Icon from "./Icons";
import CylinderGallery, { type CylinderPanel } from "./CylinderGallery";

// Small badge-icon wrappers (the gallery expects an `Icon` component per panel).
const LaunchIcon = () => <Icon name="launch" size={16} />;
const CalIcon = () => <Icon name="calendar" size={16} />;
const CheckIcon = () => <Icon name="check" size={16} />;

const CALBRIT_PANELS: CylinderPanel[] = [
  {
    image: "/calbrit/p07.png",
    alt: "Calbrit-60K powered by the Hydrox platform",
    title: "Powered by Hydrox",
    description: "Nano in a convenient chewable form, powered by the Hydrox delivery platform.",
    Icon: LaunchIcon,
  },
  {
    image: "/calbrit/p02.png",
    alt: "Calbrit-60K — Nano in a convenient chewable form",
    title: "Nano, Made Chewable",
    description: "Cholecalciferol 60000 IU delivered in a convenient weekly-once chewable form.",
    Icon: CheckIcon,
  },
  {
    image: "/calbrit/p06.png",
    alt: "Calbrit-60K weekly-once chewable tablets",
    title: "Weekly-Once Dosing",
    description: "One chewable tablet, once a week — simple adherence for sustained vitamin D.",
    Icon: CalIcon,
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
            Cholecalciferol 60000 IU in a convenient weekly-once chewable form — powered by Hydrox nano technology.
          </p>
        </div>

        <div className="reveal">
          <CylinderGallery panels={CALBRIT_PANELS} />
        </div>
      </div>
    </section>
  );
}
