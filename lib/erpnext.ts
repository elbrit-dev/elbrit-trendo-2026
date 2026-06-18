import { StoredLead } from "./types";

/**
 * Pushes a captured doctor lead into ERPNext as a CRM **Lead**.
 *
 * Gated behind ERP_ENABLED so the site happily runs (storing leads locally +
 * logging them) until you're ready to go live. Flip ERP_ENABLED=true and supply
 * the connection vars to start creating real Leads.
 *
 * Env (set in .env.local locally, or Netlify → Environment variables — never commit):
 *   ERP_ENABLED       "true" to actually POST. Anything else → skipped.
 *   ERP_URL           e.g. https://uat.elbrit.org   (base URL, no trailing /api)
 *   ERP_API_KEY       ERPNext API key
 *   ERP_API_SECRET    ERPNext API secret
 *   ERP_DOCTYPE       DocType to create (default "Lead")
 *   ERP_LEAD_SOURCE   Lead source tag (default "Trendo 2026 Landing Page")
 *
 * Field mapping targets ERPNext's stock CRM Lead fields. `specialisation`,
 * `city` and `hospital` aren't stock Lead fields — they're folded into the Lead
 * title + notes so nothing is lost even without custom fields. If you add custom
 * fields (e.g. `custom_specialisation`), map them in `payload` below.
 */
export async function sendToErpnext(
  lead: StoredLead
): Promise<{ ok: boolean; skipped?: boolean; detail?: string }> {
  if (process.env.ERP_ENABLED !== "true") {
    return { ok: false, skipped: true, detail: "ERP_ENABLED is not true" };
  }

  const url = process.env.ERP_URL;
  const key = process.env.ERP_API_KEY;
  const secret = process.env.ERP_API_SECRET;
  const doctype = process.env.ERP_DOCTYPE || "Lead";
  const source = process.env.ERP_LEAD_SOURCE || lead.source;

  if (!url || !key || !secret) {
    return { ok: false, skipped: true, detail: "ERP connection env missing" };
  }

  const notes = [
    `Specialisation: ${lead.specialisation}`,
    `City: ${lead.city}`,
    `Hospital/Clinic: ${lead.hospital}`,
    lead.message ? `Message: ${lead.message}` : null,
    `Captured: ${lead.submittedAt} (ref ${lead.id})`,
  ]
    .filter(Boolean)
    .join("\n");

  const payload: Record<string, unknown> = {
    lead_name: lead.name,
    email_id: lead.email || undefined,
    mobile_no: lead.mobile,
    company_name: lead.hospital || undefined,
    source,
    notes,
    // If you create these as custom fields on Lead, uncomment to populate them:
    // custom_specialisation: lead.specialisation,
    // custom_city: lead.city,
  };

  try {
    const res = await fetch(
      `${url.replace(/\/+$/, "")}/api/resource/${encodeURIComponent(doctype)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${key}:${secret}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, detail: `HTTP ${res.status}: ${text.slice(0, 400)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "fetch failed" };
  }
}
