import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export const requiredMark = (
  <span className="rf-required" aria-hidden="true">
    {" "}
    *
  </span>
);

/** Input class names (custom-CSS port of the original Tailwind helper). */
export function fieldClass(hasError?: boolean): string {
  return hasError ? "rf-input rf-invalid" : "rf-input";
}
export const selectClass = (hasError?: boolean) =>
  hasError ? "rf-input rf-select rf-invalid" : "rf-input rf-select";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="rf-error">
      {message}
    </p>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ id, label, required, error, hint, children }: FieldProps) {
  return (
    <div className="rf-field">
      <label htmlFor={id} className="rf-label">
        {label}
        {required && requiredMark}
      </label>
      <div className="rf-field-control">{children}</div>
      {hint && (
        <p id={`${id}-hint`} className="rf-hint">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

interface OptionGroupProps {
  legend: string;
  required?: boolean;
  options: readonly string[];
  registerProps: UseFormRegisterReturn;
  type: "checkbox" | "radio";
  error?: string;
  columns?: 1 | 2;
}

// Reusable checkbox / radio group. Multiple inputs share the same `name` via
// registerProps, so react-hook-form collects checked checkboxes into an array.
export function OptionGroup({
  legend,
  required,
  options,
  registerProps,
  type,
  error,
  columns = 2,
}: OptionGroupProps) {
  const errId = `${registerProps.name}-error`;
  return (
    <fieldset className="rf-fieldset" aria-describedby={error ? errId : undefined}>
      {legend && (
        <legend className="rf-label">
          {legend}
          {required && requiredMark}
        </legend>
      )}
      <div className={`rf-options${columns === 2 ? " cols-2" : ""}`}>
        {options.map((opt) => (
          <label key={opt} className="rf-option">
            <input type={type} value={opt} {...registerProps} className="rf-check" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}
