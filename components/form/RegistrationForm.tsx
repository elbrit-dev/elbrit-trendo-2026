"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HcpForm from "./HcpForm";
import PublicForm from "./PublicForm";
import { Check, ArrowRight, ShieldCheck } from "./icons";

type Phase = "gate" | "hcp" | "public";
type Status = "idle" | "success";

const PERKS = [
  "Connect directly with your dedicated Elbrit MR",
  "A first look at our latest endocrine range",
  "Personalised product information for your practice",
  "Priority follow-up and ongoing support",
];

export default function RegistrationForm() {
  const [phase, setPhase] = useState<Phase>("gate");
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

  return (
    <section id="register" className="section register rf-section">
      <div className="container">
        <div className="register-grid">
          <div className="register-copy reveal">
            <span className="eyebrow">We&apos;d love your support</span>
            <h2>Lend Elbrit your support at this year&apos;s endocrine conference</h2>
            <p className="section-sub">
              Behind every Elbrit product is a doctor we&apos;re grateful to work with. Register to
              support us at the conference, and your dedicated representative will reach out to
              arrange your visit and share our latest range.
            </p>
            <ul className="register-perks">
              {PERKS.map((p) => (
                <li key={p}>
                  <Check width={18} height={18} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rf-card glass reveal">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rf-success"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.05 }}
                    className="rf-success-icon"
                  >
                    <Check className="rf-success-check" />
                  </motion.div>
                  <h3>Thank you</h3>
                  <p>Your details have been received. Our team will reach out within 2 business days.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setPhase("gate");
                    }}
                    className="rf-restart"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : phase === "gate" ? (
                <motion.div
                  key="gate"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="rf-card-head">
                    <h3 className="rf-card-title">Reserve your delegate pass</h3>
                    <p className="rf-card-sub">
                      For registered medical practitioners. Takes under a minute.
                    </p>
                  </div>

                  <div className="rf-q-head">
                    <span className="rf-q-index">1.</span>
                    <h3 className="rf-q-title">Are you a registered healthcare professional?</h3>
                  </div>
                  <p className="rf-q-hint">Choose one to begin.</p>

                  <div className="rf-gate-grid">
                    <GateCard
                      icon={<ShieldCheck className="rf-gate-svg" />}
                      title="Yes, I'm a Doctor"
                      subtitle="Healthcare professional registration"
                      onClick={() => setPhase("hcp")}
                    />
                    <GateCard
                      title="No, I'm not"
                      subtitle="General inquiry"
                      onClick={() => setPhase("public")}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={phase}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {phase === "hcp" ? (
                    <HcpForm onSuccess={() => setStatus("success")} onBack={() => setPhase("gate")} />
                  ) : (
                    <PublicForm onSuccess={() => setStatus("success")} onBack={() => setPhase("gate")} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function GateCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="rf-gate-card">
      {icon && <span className="rf-gate-icon">{icon}</span>}
      <span className="rf-gate-text">
        <span className="rf-gate-title">{title}</span>
        <span className="rf-gate-sub">{subtitle}</span>
      </span>
      <ArrowRight className="rf-gate-arrow" />
    </button>
  );
}
