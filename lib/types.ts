/** A doctor's lead captured from the Trendo 2026 landing page. */
export interface DoctorLead {
  name: string;
  mobile: string;
  email: string;
  specialisation: string;
  city: string;
  hospital: string;
  /** Optional free-text note / question from the doctor. */
  message?: string;
  /** Honeypot — must stay empty; bots fill it. Not stored. */
  company?: string;
}

export interface StoredLead extends Omit<DoctorLead, "company"> {
  id: string;
  submittedAt: string;
  source: string;
}

/** Specialisations offered in the form dropdown. */
export const SPECIALISATIONS = [
  "General Physician",
  "Cardiologist",
  "Diabetologist / Endocrinologist",
  "Dermatologist",
  "ENT Specialist",
  "Gastroenterologist",
  "Gynaecologist / Obstetrician",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Orthopaedic Surgeon",
  "Paediatrician",
  "Psychiatrist",
  "Pulmonologist",
  "Radiologist",
  "Surgeon (General)",
  "Urologist",
  "Other",
] as const;
