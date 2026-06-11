export const PROGRAMS = [
  "Paanchajanya Yoga",
  "House of Champions",
  "Table Tennis (PYTTA)",
  "Kids Activities",
  "Not sure yet",
] as const;

export type Program = (typeof PROGRAMS)[number] | "";

// WhatsApp number each program routes to (digits only, country code first).
// For now everything goes to one number; the owner can split these per
// academy later through the Contact tab in Google Sheets.
const NUMS: Record<string, string> = {
  "Paanchajanya Yoga": "919880422933",
  "House of Champions": "919880422933",
  "Table Tennis (PYTTA)": "919880422933",
  "Kids Activities": "919880422933",
  "Not sure yet": "919880422933",
  "": "919880422933",
};

export function whatsappNumber(program: string): string {
  return NUMS[program] ?? NUMS[""];
}

export type LeadPayload = {
  name: string;
  age?: string;
  phone: string;
  program: string;
  plan?: string;
  time?: string;
  message?: string;
};

export function buildWhatsAppLink(p: LeadPayload, nums?: Record<string, string>): string {
  const lines = [
    "Hello Paanchajanya Academy,",
    "",
    `My name is ${p.name}${p.age ? ` (age ${p.age})` : ""}.`,
    `I am interested in ${p.program}.`,
    p.plan ? `Plan or package: ${p.plan}.` : "",
    p.time ? `Preferred timing: ${p.time}.` : "",
    `My phone number is ${p.phone}.`,
    p.message ? `\n${p.message}` : "",
    "",
    "Please contact me. Thank you.",
  ].filter((l) => l !== "");
  const text = encodeURIComponent(lines.join("\n"));
  const number = (nums && nums[p.program]) || whatsappNumber(p.program);
  return `https://wa.me/${number}?text=${text}`;
}
