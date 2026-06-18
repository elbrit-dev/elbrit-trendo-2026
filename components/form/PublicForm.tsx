"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { publicSchema, type PublicFormValues, PUBLIC_ROLES } from "./schema";
import { fieldClass, selectClass } from "./ui";
import { ChevronDown } from "./icons";
import { submitForm, RateLimitError } from "@/lib/submit";
import { Question, WizardShell } from "./Wizard";

const REASON_MAX = 500;

type FieldName = keyof PublicFormValues;

export default function PublicForm({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<PublicFormValues>({
    resolver: zodResolver(publicSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const reasonLen = watch("reason")?.length ?? 0;

  const steps: { fields: FieldName[]; node: ReactNode }[] = [
    {
      fields: ["fullName"],
      node: (
        <Question index={1} title="What's your full name?">
          <input
            id="pub-fullName"
            type="text"
            autoComplete="name"
            autoFocus
            className={fieldClass(!!errors.fullName)}
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          <FieldMsg msg={errors.fullName?.message} />
        </Question>
      ),
    },
    {
      fields: ["role"],
      node: (
        <Question index={2} title="I am a…">
          <div className="rf-select-wrap">
            <select
              id="pub-role"
              defaultValue=""
              className={selectClass(!!errors.role)}
              aria-invalid={!!errors.role}
              {...register("role")}
            >
              <option value="" disabled>
                Select an option
              </option>
              {PUBLIC_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="rf-chevron" />
          </div>
          <FieldMsg msg={errors.role?.message} />
        </Question>
      ),
    },
    {
      fields: ["city"],
      node: (
        <Question index={3} title="Which city are you in?">
          <input
            id="pub-city"
            type="text"
            autoComplete="address-level2"
            autoFocus
            className={fieldClass(!!errors.city)}
            aria-invalid={!!errors.city}
            {...register("city")}
          />
          <FieldMsg msg={errors.city?.message} />
        </Question>
      ),
    },
    {
      fields: ["email"],
      node: (
        <Question index={4} title="What's your email?">
          <input
            id="pub-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            className={fieldClass(!!errors.email)}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldMsg msg={errors.email?.message} />
        </Question>
      ),
    },
    {
      fields: ["mobile"],
      node: (
        <Question index={5} title="And your mobile number?" hint="10-digit Indian mobile number">
          <input
            id="pub-mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            autoFocus
            placeholder="9876543210"
            className={fieldClass(!!errors.mobile)}
            aria-invalid={!!errors.mobile}
            {...register("mobile")}
          />
          <FieldMsg msg={errors.mobile?.message} />
        </Question>
      ),
    },
    {
      fields: ["reason"],
      node: (
        <Question index={6} title="What's the reason for your inquiry?">
          <textarea
            id="pub-reason"
            rows={4}
            maxLength={REASON_MAX}
            autoFocus
            className={`${fieldClass(!!errors.reason)} rf-textarea`}
            aria-invalid={!!errors.reason}
            {...register("reason")}
          />
          <div className="rf-counter-row">
            <FieldMsg msg={errors.reason?.message} />
            <span className="rf-counter">
              {reasonLen}/{REASON_MAX}
            </span>
          </div>
          <p className="rf-note">
            Elbrit Life Sciences does not provide medical advice. For health concerns, please consult
            a registered physician.
          </p>
        </Question>
      ),
    },
    {
      fields: ["consent"],
      node: (
        <Question index={7} title="One last thing">
          <label className="rf-consent">
            <input
              type="checkbox"
              className="rf-check rf-check-lg"
              aria-invalid={!!errors.consent}
              {...register("consent")}
            />
            <span>I consent to be contacted by Elbrit Life Sciences regarding my inquiry.</span>
          </label>
          <FieldMsg msg={errors.consent?.message} />
        </Question>
      ),
    },
  ];

  const total = steps.length;
  const isLast = step === total - 1;

  const goNext = async () => {
    const fields = steps[step].fields;
    const ok = fields.length === 0 || (await trigger(fields));
    if (!ok) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, total - 1));
  };

  const goBack = () => {
    setDir(-1);
    if (step === 0) {
      onBack();
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA") return;
    if (!isLast) {
      e.preventDefault();
      void goNext();
    }
  };

  const onValid = async (values: PublicFormValues) => {
    setSubmitError(null);
    if (values.website) {
      onSuccess();
      return;
    }
    const { website: _hp, ...data } = values;
    void _hp;
    try {
      await submitForm("public", data);
      onSuccess();
    } catch (err) {
      setSubmitError(
        err instanceof RateLimitError
          ? err.message
          : "Something went wrong while submitting. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} onKeyDown={onKeyDown} noValidate>
      {/* Honeypot */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="pub-website">Company website</label>
        <input id="pub-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <WizardShell
        step={step}
        total={total}
        dir={dir}
        onBack={goBack}
        canGoBack
        isLast={isLast}
        isSubmitting={isSubmitting}
        onContinue={goNext}
      >
        {steps[step].node}
      </WizardShell>

      {submitError && (
        <p role="alert" className="rf-submit-error">
          {submitError}
        </p>
      )}
    </form>
  );
}

function FieldMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="rf-error rf-error-lg">
      {msg}
    </p>
  );
}
