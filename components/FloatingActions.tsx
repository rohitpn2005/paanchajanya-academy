"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { useLead } from "./LeadProvider";
import type { Plan, KidsActivity } from "@/lib/types";

const WA = "919880422933";
const TEL = "+91 98804 22933";
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const directions = SITE.mapDirections;

type Action = { label: string; href: string };
type Book = { label: string; program?: string; plan?: string };
type Msg = { role: "bot" | "user"; text: string; chips?: string[]; action?: Action; book?: Book };

type KB = {
  plans: Plan[];
  hours: string;
  address: string;
  kids: { name: string; timing?: string }[];
};

const CHIPS = ["Programs", "Timings", "Pricing", "Location", "Book a trial"];
const PROG_CHIPS = ["Yoga", "House of Champions", "Table tennis", "Kids"];

const SHORT: Record<string, string> = {
  "PaanchaJanya Yoga": "Yoga",
  "House of Champions": "House of Champions",
  "Table Tennis (PYTTA)": "Table tennis",
  "Kids Activities": "Kids",
};

const GREETING: Msg = {
  role: "bot",
  text: "Hi, I am the PaanchaJanya assistant. I can help with our programs, class timings, pricing, booking a trial or finding us. What would you like to know?",
  chips: CHIPS,
};

function progOf(q: string): string | null {
  if (/table tennis|ping pong|pytta|\btt\b/.test(q)) return "Table Tennis (PYTTA)";
  if (/yoga|hatha|aerial|meditat|pranayam/.test(q)) return "PaanchaJanya Yoga";
  if (/champion|mma|boxing|muay|kick|wrestl|fight|combat|bjj/.test(q)) return "House of Champions";
  if (/karate|dance|chess|\bkid|child|children|son|daughter/.test(q)) return "Kids Activities";
  return null;
}

function planLines(kb: KB, program: string): string {
  return kb.plans
    .filter((p) => p.program === program)
    .map((p) => `\u2022 ${p.name}: ${p.price}${p.popular ? "  (best value)" : ""}`)
    .join("\n");
}

function startingPrice(kb: KB, program: string): string {
  const list = kb.plans.filter((p) => p.program === program);
  return list[0]?.price || "on enquiry";
}

function reply(raw: string, kb: KB): Msg {
  const q = raw.toLowerCase().trim();
  const has = (...k: string[]) => k.some((w) => q.includes(w));

  if (!q) return { role: "bot", text: "Tell me what you are after and I will point you the right way.", chips: CHIPS };
  if (has("hi", "hello", "hey", "namaste", "good morning", "good evening"))
    return { role: "bot", text: "Hello. Ask me about programs, timings, pricing, booking or our location.", chips: CHIPS };
  if (has("thank", "thanks", "thx")) return { role: "bot", text: "Anytime. Anything else I can help with?", chips: CHIPS };

  // LOCATION (one roof for every academy)
  if (has("where", "location", "address", "reach", "direction", "map", "located", "find you")) {
    const p = progOf(q);
    const lead = p && p !== "Kids Activities" ? `${SHORT[p]} runs at our main address, the same roof as every academy. ` : "All four academies share one roof. ";
    return { role: "bot", text: `${lead}We are at ${kb.address}.`, action: { label: "Get directions", href: directions } };
  }

  // PRICING / MEMBERSHIP PLANS (from the site data)
  if (has("price", "cost", "fee", "fees", "charge", "plan", "plans", "membership", "monthly", "package", "rate", "how much")) {
    const p = progOf(q);
    if (p === "Kids Activities")
      return { role: "bot", text: "Kids activities are priced on enquiry, since it depends on the activity and schedule. Tell us which one and we will share the exact fee.", book: { label: "Ask about kids fees", program: "Kids Activities" } };
    if (p) {
      const lines = planLines(kb, p);
      if (lines) return { role: "bot", text: `${SHORT[p]} memberships:\n${lines}\n\nAll plans cover every discipline in the academy. Want to book a trial?`, book: { label: `Book ${SHORT[p]}`, program: p } };
    }
    const y = startingPrice(kb, "PaanchaJanya Yoga");
    const h = startingPrice(kb, "House of Champions");
    const t = startingPrice(kb, "Table Tennis (PYTTA)");
    return {
      role: "bot",
      text: `Here is a quick price guide:\n\u2022 Yoga from ${y} a month\n\u2022 House of Champions from ${h} a month\n\u2022 Table Tennis from ${t} a month\n\u2022 Kids activities on enquiry\n\nAsk about any program for the full plan list.`,
      chips: PROG_CHIPS,
    };
  }

  // TIMINGS (general hours + per program)
  if (has("hour", "open", "timing", "time", "when", "schedule", "close", "batch")) {
    const p = progOf(q);
    const general = kb.hours.split("|").map((s) => s.trim()).filter(Boolean).join("\n");
    if (p === "Kids Activities" || /karate|dance|chess/.test(q)) {
      const lines = kb.kids.filter((k) => k.timing).map((k) => `\u2022 ${k.name}: ${k.timing}`).join("\n");
      return { role: "bot", text: `Kids class timings:\n${lines || "Ask us for the latest kids schedule."}`, book: { label: "Book a kids class", program: "Kids Activities" } };
    }
    if (p === "PaanchaJanya Yoga")
      return { role: "bot", text: `Yoga runs daily in morning and evening batches, beginner to competitive.\n\nReception hours:\n${general}`, book: { label: "Book yoga", program: p } };
    if (p === "House of Champions")
      return { role: "bot", text: `House of Champions runs morning and evening sessions across all disciplines.\n\nReception hours:\n${general}`, book: { label: "Book a combat trial", program: p } };
    if (p === "Table Tennis (PYTTA)")
      return { role: "bot", text: `Table tennis runs daily, three sessions a week for members, with junior coaching from 5 to 9 PM.\n\nReception hours:\n${general}`, book: { label: "Book table tennis", program: p } };
    return { role: "bot", text: `Our reception hours:\n${general}\n\nTell me a program and I will give you its class timings.`, chips: PROG_CHIPS };
  }

  // BOOKING -> open the form
  if (has("book", "trial", "join", "enrol", "enroll", "register", "sign up", "start", "admission")) {
    const p = progOf(q);
    if (p) return { role: "bot", text: `Great choice. Let us set up your ${SHORT[p]} booking.`, book: { label: `Book ${SHORT[p]}`, program: p } };
    return { role: "bot", text: "Booking takes a minute. Open the form, add your details and we will confirm your slot.", book: { label: "Start booking" } };
  }

  // CONTACT
  if (has("contact", "phone", "number", "call", "whatsapp", "talk"))
    return { role: "bot", text: `You can reach the front desk at ${TEL}.`, action: { label: "Message on WhatsApp", href: waLink("Hello PaanchaJanya, I have a question.") } };

  // PROGRAM INFO (describe + book)
  if (has("table tennis", "tt", "ping pong", "pytta"))
    return { role: "bot", text: "Table tennis runs daily from 5 to 9 PM, beginner to advanced, with full tournament preparation.", book: { label: "Book table tennis", program: "Table Tennis (PYTTA)" } };
  if (has("yoga", "hatha", "aerial", "meditat", "pranayam"))
    return { role: "bot", text: "We teach Hatha and competitive yoga, plus aerial and meditation, in morning and evening batches.", book: { label: "Book yoga", program: "PaanchaJanya Yoga" } };
  if (has("champion", "mma", "boxing", "muay", "kick", "wrestl", "fight", "combat", "bjj"))
    return { role: "bot", text: "House of Champions covers MMA, Muay Thai, boxing, wrestling and kickboxing with coaches who have competed. Beginners welcome.", book: { label: "Book a combat trial", program: "House of Champions" } };
  if (has("karate"))
    return { role: "bot", text: "Karate and fitness training for kids runs three days a week.", book: { label: "Book karate", program: "Kids Activities", plan: "Karate" } };
  if (has("dance"))
    return { role: "bot", text: "Kids dance runs daily from 5 to 6 PM.", book: { label: "Book dance", program: "Kids Activities", plan: "Dance" } };
  if (has("chess"))
    return { role: "bot", text: "Offline chess runs on weekends from 9:30 to 11 AM.", book: { label: "Book chess", program: "Kids Activities", plan: "Chess" } };
  if (has("kid", "child", "children", "son", "daughter", "age"))
    return { role: "bot", text: "Our kids academy offers table tennis, yoga, karate, dance and chess in small batches. Ask about kids timings or pricing, or pick an activity.", chips: ["Kids timings", "Kids pricing", "Book a kids class"] };
  if (has("workshop", "event", "camp"))
    return { role: "bot", text: "We host workshops and camps across all four academies through the year. See the workshops page for what is coming up.", action: { label: "See workshops", href: "/workshops" } };
  if (has("program", "programme", "class", "activit", "offer", "discipline", "what do you"))
    return { role: "bot", text: "Four academies under one roof: Yoga, House of Champions for combat sport, Table Tennis, and the Kids academy. Which one interests you?", chips: PROG_CHIPS };

  return {
    role: "bot",
    text: "I want to get you the right answer. Are you asking about a program, class timings, pricing, booking a trial, or our location?",
    chips: CHIPS,
  };
}

export default function FloatingActions({
  plans = [],
  hours = "Mon to Fri 6:00 AM to 9:00 PM|Saturday 7:00 to 9:00 AM|Sunday by appointment",
  address = SITE.address,
  kids = [],
}: {
  plans?: Plan[];
  hours?: string;
  address?: string;
  kids?: KidsActivity[];
}) {
  const { open: openLead } = useLead();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const kb: KB = { plans, hours, address, kids: kids.map((k) => ({ name: k.name, timing: k.timing })) };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  const startBooking = (b: Book) => {
    setOpen(false);
    openLead(b.program || "", b.plan || "");
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }, reply(t, kb)]);
    setVal("");
  };

  return (
    <div className="fab-wrap">
      {open && (
        <div className="chat" role="dialog" aria-label="PaanchaJanya assistant">
          <div className="chat-head">
            <span className="chat-dot" />
            <div><b>PaanchaJanya assistant</b><small>Replies instantly</small></div>
            <button className="chat-x" aria-label="Close chat" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={"msg " + m.role}>
                <div className="bubble">
                  {m.text}
                  {m.action ? (
                    <a className="msg-action" href={m.action.href} target={m.action.href.startsWith("http") ? "_blank" : undefined} rel="noopener">{m.action.label}</a>
                  ) : null}
                  {m.book ? (
                    <button type="button" className="msg-action book" onClick={() => startBooking(m.book!)}>{m.book.label}</button>
                  ) : null}
                </div>
                {m.chips ? (
                  <div className="msg-chips">
                    {m.chips.map((c) => (
                      <button key={c} type="button" onClick={() => send(c)}>{c}</button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(val)}
              placeholder="Ask about timings, plans, location..."
              aria-label="Message"
            />
            <button type="button" aria-label="Send" onClick={() => send(val)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
        </div>
      )}

      <div className="fabs">
        <a className="fab wa" href={waLink("Hello PaanchaJanya, I have a question.")} target="_blank" rel="noopener" aria-label="WhatsApp us">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4A9.7 9.7 0 0 1 6.2 15C6.2 9.6 10.6 5.2 16 5.2S25.8 9.6 25.8 15 21.4 24.8 16 24.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" /></svg>
        </a>
        <button className="fab chat-toggle" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close assistant" : "Open assistant"}>
          {open ? (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="16" height="11" rx="3.5" />
              <path d="M12 4.6V8" /><circle cx="12" cy="3.4" r="1.25" fill="currentColor" stroke="none" />
              <circle cx="9.2" cy="13" r="1.25" fill="currentColor" stroke="none" />
              <circle cx="14.8" cy="13" r="1.25" fill="currentColor" stroke="none" />
              <path d="M9.5 16.2h5" />
              <path d="M2 12.5v2.5M22 12.5v2.5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
