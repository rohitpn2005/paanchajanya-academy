import type { Workshop, Plan, KidsActivity, ContactInfo } from "./types";
import { PROGRAMS } from "./plans";
import { SITE, PHONES } from "./site";

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const REVALIDATE_SECONDS = 300; // re-fetch sheet content at most every 5 minutes

/**
 * Read a range from the configured Google Sheet via the public REST endpoint.
 * Requires SHEET_ID + GOOGLE_SHEETS_API_KEY and a sheet shared as
 * "Anyone with the link -> Viewer". Returns [] if not configured or on error,
 * so callers fall back to bundled defaults and the site always renders.
 */
export async function readRange(range: string): Promise<string[][]> {
  const id = process.env.SHEET_ID;
  const key = process.env.GOOGLE_SHEETS_API_KEY;
  if (!id || !key) return [];
  const url = `${SHEETS_API}/${id}/values/${encodeURIComponent(range)}?key=${key}`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return [];
    const data = (await res.json()) as { values?: string[][] };
    return data.values ?? [];
  } catch {
    return [];
  }
}

const truthy = (v: string | undefined) => /^(yes|true|1|active|y)$/i.test((v || "").trim());
const notFalse = (v: string | undefined) =>
  (v || "").trim() === "" ? true : !/^(no|false|0|inactive|n)$/i.test((v || "").trim());
const num = (v: string | undefined, d = 9999) => {
  const n = parseInt((v || "").trim(), 10);
  return Number.isFinite(n) ? n : d;
};

// Let owners type friendly program names in the sheet (Yoga, MMA, Kids, ...)
const PROGRAM_ALIASES: Record<string, string> = {
  "yoga": "Paanchajanya Yoga",
  "paanchajanya yoga": "Paanchajanya Yoga",
  "mma": "House of Champions",
  "combat": "House of Champions",
  "champions": "House of Champions",
  "house of champions": "House of Champions",
  "pytta": "Table Tennis (PYTTA)",
  "table tennis": "Table Tennis (PYTTA)",
  "tt": "Table Tennis (PYTTA)",
  "table tennis (pytta)": "Table Tennis (PYTTA)",
  "kids": "Kids Activities",
  "youth": "Kids Activities",
  "kids activities": "Kids Activities",
};
export function normalizeProgram(s: string): string {
  const k = (s || "").trim().toLowerCase();
  return PROGRAM_ALIASES[k] || (s || "").trim();
}

/**
 * Turn a Google Drive share link into a direct, image-servable URL that the
 * Next.js image optimizer can fetch. Owners can paste the normal "share" link
 * (…/file/d/ID/view, …/open?id=ID, …/uc?id=ID) and it just works. Any other
 * URL (Cloudinary, /images/... path, etc.) is returned unchanged.
 */
export function driveDirect(url?: string): string | undefined {
  const u = (url || "").trim();
  if (!u) return undefined;
  if (/(?:drive|docs)\.google\.com/.test(u)) {
    const m = u.match(/(?:\/file\/d\/|[?&]id=|\/d\/)([a-zA-Z0-9_-]{20,})/);
    if (m) return `https://lh3.googleusercontent.com/d/${m[1]}=w1600`;
  }
  return u;
}

/* =========================================================================
   WORKSHOPS & EVENTS  — tab "Workshops", data from row 2
   Columns (A..J): name | description | date | time | instructor | program |
                   poster url | status | registration link | display order
   status: featured | open | closed   (closed hides it)
   ========================================================================= */
export async function getWorkshops(): Promise<Workshop[]> {
  const rows = await readRange(process.env.SHEET_WORKSHOPS_RANGE || "Workshops!A2:J");
  if (!rows.length) return FALLBACK_WORKSHOPS;
  return rows
    .filter((r) => (r[0] || "").trim().length > 0 && (r[7] || "open").toLowerCase() !== "closed")
    .map((r) => ({
      title: r[0] || "",
      blurb: r[1] || "",
      date: r[2] || "",
      time: r[3] || "",
      instructor: r[4] || "",
      program: normalizeProgram(r[5] || ""),
      image: driveDirect(r[6]),
      status: (r[7] || "open").toLowerCase() as Workshop["status"],
      registration: (r[8] || "").trim() || undefined,
      order: num(r[9]),
    }))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export async function getFeaturedWorkshop(): Promise<Workshop | undefined> {
  const all = await getWorkshops();
  return all.find((w) => w.status === "featured") || all[0];
}

export const FALLBACK_WORKSHOPS: Workshop[] = [
  { title: "Breath & Mobility Masterclass",
    blurb: "A two hour intensive on pranayama led recovery and joint mobility for athletes and beginners alike. Led by senior Paanchajanya coaches.",
    date: "Sat, 28 Jun", dateISO: "2026-06-28T07:30", time: "7:30 to 9:00 AM",
    instructor: "Coach Aditi R.", program: "Paanchajanya Yoga", status: "featured" },
  { title: "Self Defence Bootcamp", blurb: "Practical self defence for women and teens. With Coach Neha.",
    date: "5 Jul", time: "10:00 AM", instructor: "Coach Neha", program: "House of Champions", status: "open" },
  { title: "Chess Strategy Clinic", blurb: "Openings and endgames for junior players. With Coach Imran.",
    date: "12 Jul", time: "4:00 PM", instructor: "Coach Imran", program: "Kids Activities", status: "open" },
  { title: "Beginner TT Camp", blurb: "A weekend crash course in table tennis fundamentals.",
    date: "19 Jul", time: "9:00 AM", instructor: "PYTTA Coaches", program: "Table Tennis (PYTTA)", status: "open" },
];

/* =========================================================================
   MEMBERSHIP PLANS  — tab "Plans", data from row 2
   Columns (A..I): program | plan name | duration | price | features |
                   active | display order | popular | note
   features are pipe separated. active blank or true shows the plan.
   ========================================================================= */
export async function getPlans(): Promise<Plan[]> {
  const rows = await readRange(process.env.SHEET_PLANS_RANGE || "Plans!A2:I");
  if (!rows.length) return FALLBACK_PLANS;
  return rows
    .filter((r) => (r[0] || "").trim() && (r[1] || "").trim() && notFalse(r[5]))
    .map((r) => ({
      program: normalizeProgram(r[0] || ""),
      name: (r[1] || "").trim(),
      duration: (r[2] || "").trim() || undefined,
      price: (r[3] || "").trim(),
      features: (r[4] || "").split("|").map((s) => s.trim()).filter(Boolean),
      active: notFalse(r[5]),
      order: num(r[6]),
      popular: truthy(r[7]),
      note: (r[8] || "").trim() || undefined,
    }))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export async function plansFor(program: string): Promise<Plan[]> {
  return (await getPlans()).filter((p) => p.program === program);
}

// program -> dropdown option labels (booking modal + contact form)
export async function getPlansMap(): Promise<Record<string, string[]>> {
  const [plans, kids] = await Promise.all([getPlans(), getKidsActivities()]);
  const map: Record<string, string[]> = { "Not sure yet": ["Tell me more"] };
  for (const pr of PROGRAMS) if (pr !== "Not sure yet" && !map[pr]) map[pr] = [];
  for (const p of plans) {
    const label = p.price ? `${p.name} (${p.price})` : p.name;
    (map[p.program] ||= []).push(label);
  }
  // Kids activities come from their own tab, so add them as Kids options.
  for (const k of kids) {
    const label = k.price ? `${k.name} (${k.price})` : k.name;
    (map["Kids Activities"] ||= []).push(label);
  }
  return map;
}

export const FALLBACK_PLANS: Plan[] = [
  { program: "Paanchajanya Yoga", name: "Monthly", duration: "1 Month", price: "₹2,800", note: "plus ₹1,000 admission",
    features: ["All yoga styles", "Morning & evening batches", "Beginner friendly"] },
  { program: "Paanchajanya Yoga", name: "3 Months", duration: "3 Months", price: "₹6,600", note: "Save vs monthly",
    features: ["All yoga styles", "Free admission", "Priority batch booking"] },
  { program: "Paanchajanya Yoga", name: "6 Months", duration: "6 Months", price: "₹11,000", note: "Best value", popular: true,
    features: ["All yoga styles", "Free admission", "1 workshop included", "Progress check ins"] },
  { program: "Paanchajanya Yoga", name: "12 Months", duration: "12 Months", price: "₹17,000", note: "Lowest monthly rate",
    features: ["Everything in 6 months", "2 workshops included", "Guest passes"] },
  { program: "House of Champions", name: "Monthly", duration: "1 Month", price: "₹5,000",
    features: ["All disciplines", "Morning & evening", "Beginner intro track"] },
  { program: "House of Champions", name: "3 Months", duration: "3 Months", price: "₹10,000", note: "Save vs monthly",
    features: ["All disciplines", "Sparring access", "Fitness assessment"] },
  { program: "House of Champions", name: "6 Months", duration: "6 Months", price: "₹15,000", note: "Best value", popular: true,
    features: ["All disciplines", "Open mat access", "Strength programming", "Competition prep"] },
  { program: "House of Champions", name: "Yearly", duration: "12 Months", price: "₹25,000", note: "Lowest monthly rate",
    features: ["Everything in 6 months", "Priority bout coaching", "Guest passes"] },
  { program: "Table Tennis (PYTTA)", name: "Monthly", duration: "1 Month", price: "₹3,000",
    features: ["3 sessions a week", "Group coaching", "All levels"] },
  { program: "Table Tennis (PYTTA)", name: "Quarterly", duration: "3 Months", price: "₹8,000", note: "Save vs monthly",
    features: ["3 sessions a week", "Progress tracking", "In house tournaments"] },
  { program: "Table Tennis (PYTTA)", name: "Half Yearly", duration: "6 Months", price: "₹15,000", note: "Best value", popular: true,
    features: ["Unlimited group sessions", "Match play access", "Performance reviews", "Tournament support"] },
  { program: "Table Tennis (PYTTA)", name: "Coaching Pack", duration: "10 sessions", price: "₹4,500", note: "Use at your pace",
    features: ["10 focused sessions", "Use them at your pace", "Great for skill blocks"] },
];

/* =========================================================================
   KIDS ACTIVITIES  — tab "Kids", data from row 2
   Columns (A..H): name | age group | timing | price | description |
                   image url | active | display order
   ========================================================================= */
export async function getKidsActivities(): Promise<KidsActivity[]> {
  const rows = await readRange(process.env.SHEET_KIDS_RANGE || "Kids!A2:H");
  if (!rows.length) return FALLBACK_KIDS;
  return rows
    .filter((r) => (r[0] || "").trim() && notFalse(r[6]))
    .map((r) => ({
      name: (r[0] || "").trim(),
      ageGroup: (r[1] || "").trim() || undefined,
      timing: (r[2] || "").trim() || undefined,
      price: (r[3] || "").trim() || "On enquiry",
      description: (r[4] || "").trim() || undefined,
      image: driveDirect(r[5]),
      active: notFalse(r[6]),
      order: num(r[7]),
    }))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export const FALLBACK_KIDS: KidsActivity[] = [
  { name: "Professional Table Tennis Coaching", ageGroup: "6 plus", timing: "Daily, 5:00 to 9:00 PM", price: "On enquiry",
    description: "Build focus, speed, discipline and a competitive spirit.", image: "/images/kids/table-tennis.jpg" },
  { name: "Hatha and Competitive Yoga", ageGroup: "5 plus", timing: "Daily, 5:00 to 6:00 PM", price: "On enquiry",
    description: "Improve flexibility, balance, concentration and overall well being.", image: "/images/kids/beginner-yoga.jpg" },
  { name: "Fitness and Karate Training", ageGroup: "5 plus", timing: "3 days a week", price: "On enquiry",
    description: "Build strength, self discipline, confidence and fitness.", image: "/images/kids/karate.jpg" },
  { name: "Dance Classes for Kids", ageGroup: "4 plus", timing: "Daily, 5:00 to 6:00 PM", price: "On enquiry",
    description: "Fun sessions that build rhythm, coordination and expression.", image: "/images/kids/dance.jpg" },
  { name: "Offline Chess Classes", ageGroup: "6 plus", timing: "Weekends, 9:30 to 11:00 AM", price: "On enquiry",
    description: "Boost logical thinking, focus and strategy.", image: "/images/kids/chess.jpg" },
];

/* =========================================================================
   CONTACT INFORMATION  — tab "Contact", data from row 2
   Columns (A..H): academy | address | phone | whatsapp | email | maps |
                   hours | active
   Use one row named "General" for the shared site address / hours / email,
   plus one row per academy for its WhatsApp routing (academy = Yoga, MMA, ...).
   ========================================================================= */
export async function getContacts(): Promise<ContactInfo[]> {
  const rows = await readRange(process.env.SHEET_CONTACT_RANGE || "Contact!A2:H");
  if (!rows.length) return FALLBACK_CONTACTS;
  const list = rows
    .filter((r) => (r[0] || "").trim() && notFalse(r[7]))
    .map((r) => ({
      academy: (r[0] || "").trim(),
      address: (r[1] || "").trim() || undefined,
      phone: (r[2] || "").trim() || undefined,
      whatsapp: (r[3] || "").replace(/\D/g, "") || undefined,
      email: (r[4] || "").trim() || undefined,
      maps: (r[5] || "").trim() || undefined,
      hours: (r[6] || "").trim() || undefined,
      active: notFalse(r[7]),
    }));
  return list.length ? list : FALLBACK_CONTACTS;
}

// The shared/site contact card (the "General" row, or the first row).
export async function getPrimaryContact(): Promise<ContactInfo> {
  const list = await getContacts();
  return (
    list.find((c) => /general|academy|paanchajanya/i.test(c.academy)) ||
    list[0] ||
    FALLBACK_CONTACTS[0]
  );
}

// program -> WhatsApp digits, for routing booking leads.
export async function getWhatsAppMap(): Promise<Record<string, string>> {
  const list = await getContacts();
  const fallbackNum = "919880422933";
  const map: Record<string, string> = {};
  for (const c of list) {
    if (!c.whatsapp) continue;
    const prog = normalizeProgram(c.academy);
    map[prog] = c.whatsapp;
  }
  const def = map["Paanchajanya Yoga"] || Object.values(map)[0] || fallbackNum;
  for (const pr of PROGRAMS) if (!map[pr]) map[pr] = def;
  map[""] = def;
  return map;
}

export const FALLBACK_CONTACTS: ContactInfo[] = [
  { academy: "General", address: SITE.address, maps: SITE.mapEmbed,
    phone: "+91 98804 22933", whatsapp: "919880422933", email: "hello@paanchajanya.in",
    hours: "Mon to Fri 6:00 AM to 9:00 PM|Saturday 7:00 to 9:00 AM|Sunday by appointment" },
  { academy: "Paanchajanya Yoga", whatsapp: "919880422933", phone: "+91 98804 22933" },
  { academy: "House of Champions", whatsapp: "919880422933", phone: "+91 98804 22933" },
  { academy: "Table Tennis (PYTTA)", whatsapp: "919880422933", phone: "+91 98804 22933" },
  { academy: "Kids Activities", whatsapp: "919880422933", phone: "+91 98804 22933" },
];
