"use client";

import { useState } from "react";
import { SPECIALISATIONS, DoctorLead } from "@/lib/types";
import Icon from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof DoctorLead, string>>;

const EMPTY: DoctorLead = {
  name: "",
  mobile: "",
  email: "",
  specialisation: "",
  city: "",
  hospital: "",
  message: "",
  company: "", // honeypot
};

export default function LeadForm() {
  const [data, setData] = useState<DoctorLead>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set =
    (k: keyof DoctorLead) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [k]: e.target.value }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  function validate(d: DoctorLead): Errors {
    const er: Errors = {};
    if (d.name.trim().length < 2) er.name = "Please enter your full name.";
    if (d.mobile.replace(/\D/g, "").length < 10) er.mobile = "Enter a valid 10-digit mobile number.";
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) er.email = "Enter a valid email address.";
    if (!d.specialisation) er.specialisation = "Please select your specialisation.";
    if (d.city.trim().length < 2) er.city = "Please enter your city.";
    if (d.hospital.trim().length < 2) er.hospital = "Please enter your hospital / clinic.";
    return er;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const er = validate(data);
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  if (status === "success") {
    const firstName =
      data.name.trim().replace(/^(dr|prof|mr|mrs|ms)\.?\s+/i, "").split(" ")[0] || "Doctor";
    return (
      <div className="form-card glass form-success">
        <div className="success-check">
          <Icon name="check" size={40} />
        </div>
        <h3>You&apos;re registered, Dr. {firstName}!</h3>
        <p>
          Thank you for registering for Trendo 2026. Our team will reach out with your delegate pass and the final
          agenda. See you there!
        </p>
      </div>
    );
  }

  return (
    <form className="form-card glass" onSubmit={onSubmit} noValidate>
      <h3>Reserve your delegate pass</h3>
      <p className="form-sub">For registered medical practitioners. Takes under a minute.</p>

      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label htmlFor="ln">
          Full name <span className="req">*</span>
        </label>
        <input id="ln" value={data.name} onChange={set("name")} placeholder="Dr. Jane Doe" autoComplete="name" />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>

      <div className="form-row">
        <div className={`field${errors.mobile ? " invalid" : ""}`}>
          <label htmlFor="lm">
            Mobile <span className="req">*</span>
          </label>
          <input
            id="lm"
            value={data.mobile}
            onChange={set("mobile")}
            placeholder="+91 98765 43210"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.mobile && <div className="field-error">{errors.mobile}</div>}
        </div>
        <div className={`field${errors.email ? " invalid" : ""}`}>
          <label htmlFor="le">Email</label>
          <input
            id="le"
            value={data.email}
            onChange={set("email")}
            placeholder="jane@hospital.com"
            inputMode="email"
            autoComplete="email"
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
      </div>

      <div className={`field${errors.specialisation ? " invalid" : ""}`}>
        <label htmlFor="ls">
          Specialisation <span className="req">*</span>
        </label>
        <select id="ls" value={data.specialisation} onChange={set("specialisation")}>
          <option value="">Select your specialisation</option>
          {SPECIALISATIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.specialisation && <div className="field-error">{errors.specialisation}</div>}
      </div>

      <div className="form-row">
        <div className={`field${errors.city ? " invalid" : ""}`}>
          <label htmlFor="lc">
            City <span className="req">*</span>
          </label>
          <input id="lc" value={data.city} onChange={set("city")} placeholder="Chennai" autoComplete="address-level2" />
          {errors.city && <div className="field-error">{errors.city}</div>}
        </div>
        <div className={`field${errors.hospital ? " invalid" : ""}`}>
          <label htmlFor="lh">
            Hospital / Clinic <span className="req">*</span>
          </label>
          <input id="lh" value={data.hospital} onChange={set("hospital")} placeholder="Apollo Hospitals" />
          {errors.hospital && <div className="field-error">{errors.hospital}</div>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="lmsg">Anything you&apos;d like us to know? (optional)</label>
        <textarea id="lmsg" value={data.message} onChange={set("message")} placeholder="Questions, dietary needs, etc." />
      </div>

      {/* honeypot — hidden from humans, bots tend to fill it */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" value={data.company} onChange={set("company")} />
      </div>

      {status === "error" && <div className="field-error" style={{ marginBottom: "0.6rem" }}>{serverError}</div>}

      <button type="submit" className="btn btn-primary form-submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Confirm my registration"}
        {status !== "submitting" && <Icon name="arrow" size={18} />}
      </button>
      <p className="form-note">We respect your privacy. Your details are used only for Trendo 2026.</p>
    </form>
  );
}
