import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { DoctorLead, StoredLead } from "@/lib/types";
import { sendToErpnext } from "@/lib/erpnext";

// Candidate storage dirs, tried in order. The project dir works locally; on a
// read-only serverless host it falls back to the OS temp dir.
const STORE_DIRS = [
  path.join(process.cwd(), "data"),
  path.join(os.tmpdir(), "elbrit-trendo-2026"),
];
const FILE = "leads.json";

function isValid(b: Partial<DoctorLead>): b is DoctorLead {
  return (
    typeof b.name === "string" && b.name.trim().length > 1 &&
    typeof b.mobile === "string" && b.mobile.replace(/\D/g, "").length >= 10 &&
    typeof b.email === "string" &&
      (b.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) &&
    typeof b.specialisation === "string" && b.specialisation.length > 0 &&
    typeof b.city === "string" && b.city.trim().length > 1 &&
    typeof b.hospital === "string" && b.hospital.trim().length > 1
  );
}

async function persist(stored: StoredLead): Promise<boolean> {
  for (const dir of STORE_DIRS) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const file = path.join(dir, FILE);
      let leads: StoredLead[] = [];
      try {
        leads = JSON.parse(await fs.readFile(file, "utf-8")) as StoredLead[];
      } catch {
        leads = [];
      }
      leads.push(stored);
      await fs.writeFile(file, JSON.stringify(leads, null, 2), "utf-8");
      return true;
    } catch {
      // try next dir
    }
  }
  return false;
}

async function readLeads(): Promise<StoredLead[]> {
  for (const dir of STORE_DIRS) {
    try {
      const raw = await fs.readFile(path.join(dir, FILE), "utf-8");
      return JSON.parse(raw) as StoredLead[];
    } catch {
      // try next dir
    }
  }
  return [];
}

export async function POST(req: Request) {
  let body: Partial<DoctorLead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real doctors never see/fill `company`. Silently accept to fool bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields correctly." },
      { status: 422 }
    );
  }

  const stored: StoredLead = {
    name: body.name.trim(),
    mobile: body.mobile.trim(),
    email: (body.email || "").trim(),
    specialisation: body.specialisation,
    city: body.city.trim(),
    hospital: body.hospital.trim(),
    message: body.message?.trim() || undefined,
    source: process.env.ERP_LEAD_SOURCE || "Trendo 2026 Landing Page",
    id: `TRD-${Date.now()}-${Math.floor(Math.random() * 1e4)}`,
    submittedAt: new Date().toISOString(),
  };

  const persisted = await persist(stored);

  // Always log the full lead so it's recoverable from runtime logs even when
  // durable storage isn't available (serverless temp dir is ephemeral).
  console.log("TRENDO_LEAD", JSON.stringify(stored));

  // Push into ERPNext — gated by ERP_ENABLED. Non-blocking: a failed/disabled
  // ERP write never stops the doctor from completing registration.
  const erp = await sendToErpnext(stored);
  if (!erp.ok && !erp.skipped) {
    console.error("ERP_LEAD_FAILED", erp.detail);
  }

  return NextResponse.json({
    ok: true,
    id: stored.id,
    persisted,
    erp: erp.ok ? "created" : erp.skipped ? "disabled" : "failed",
  });
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ count: leads.length });
}
