"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Spinner } from "./icons";

/** A single Typeform-style question: a prominent prompt + its input(s). */
export function Question({
  index,
  title,
  hint,
  children,
}: {
  index?: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="rf-q-head">
        {index != null && <span className="rf-q-index">{index}.</span>}
        <h3 className="rf-q-title">{title}</h3>
      </div>
      {hint && <p className="rf-q-hint">{hint}</p>}
      <div className="rf-q-body">{children}</div>
    </div>
  );
}

/**
 * Presentational chrome for a one-question-at-a-time flow: progress bar,
 * animated step transitions, and Back / Continue (or Submit) navigation.
 */
export function WizardShell({
  step,
  total,
  dir,
  onBack,
  canGoBack,
  isLast,
  isSubmitting,
  onContinue,
  continueLabel,
  children,
}: {
  step: number;
  total: number;
  dir: number;
  onBack: () => void;
  canGoBack: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  onContinue: () => void;
  continueLabel?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const pct = Math.round(((step + 1) / total) * 100);

  return (
    <div>
      {/* Progress */}
      <div className="rf-progress">
        <div className="rf-progress-track">
          <div className="rf-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="rf-progress-count">
          {step + 1} / {total}
        </span>
      </div>

      {/* Question */}
      <div className="rf-stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduce ? false : { opacity: 0, y: dir >= 0 ? 24 : -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: dir >= 0 ? -24 : 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="rf-nav">
        {canGoBack && (
          <button type="button" onClick={onBack} className="rf-back">
            ← Back
          </button>
        )}
        <button
          type={isLast ? "submit" : "button"}
          onClick={isLast ? undefined : onContinue}
          disabled={isSubmitting}
          className="btn btn-primary rf-continue"
        >
          {isSubmitting ? (
            <>
              <Spinner className="rf-continue-icon" />
              Submitting…
            </>
          ) : (
            <>
              {isLast ? "Submit" : continueLabel ?? "Continue"}
              <ArrowRight className="rf-continue-icon" />
            </>
          )}
        </button>
        {!isLast && (
          <span className="rf-kbd-hint">
            press <kbd className="rf-kbd">Enter ↵</kbd>
          </span>
        )}
      </div>
    </div>
  );
}
