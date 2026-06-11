"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { useLead } from "./LeadProvider";

const WA = "919880422933";
const TEL = "+91 98804 22933";
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const directions = SITE.mapDirections;

type Action = { label: string; href: string };
type Book = { label: string; program?: string; plan?: string };
type Msg = { role: "bot" | "user"; text: string; chips?: string[]; action?: Action; book?: Book };

const CHIPS = ["Programs", "Timings", "Pricing", "Location", "Book a trial"];

const GREETING: Msg = {
  role: "bot",
  text: "Hi, I am the PaanchaJanya assistant. I can help with our programs, class timings, pricing, booking a trial or finding us. What would you like to know?",
  chips: CHIPS,
};

function reply(raw: string): Msg {
  const q = raw.toLowerCase().trim();
  const has = (...k: string[]) => k.some((w) => q.includes(w));

  if (!q) return { role: "bot", text: "Tell me what you are after and I will point you the right way.", chips: CHIPS };
  if (has("hi", "hello", "hey", "namaste", "good morning", "good evening"))
    return { role: "bot", text: "Hello. Ask me about programs, timings, pricing, booking or our location.", chips: CHIPS };
  if (has("thank", "thanks", "thx")) return { role: "bot", text: "Anytime. Anything else I can help with?", chips: CHIPS };

  if (has("where", "location", "address", "reach", "direction", "map", "located", "find you"))
    return { role: "bot", text: `We are all under one roof at ${SITE.address}.`, action: { label: "Get directions", href: directions } };

  if (has("hour", "open", "timing", "time", "when", "schedule", "close"))
    return {
      role: "bot",
      text: "We run Monday to Saturday, with Sunday by appointment. Kids batches run mostly in the evening: table tennis 5 to 9 PM, yoga and dance 5 to 6 PM, karate three days a week, and chess on weekends 9:30 to 11 AM. Tell me a program and I will give you its exact timing.",
      chips: ["Table tennis", "Yoga", "Karate", "Dance", "Chess"],
    };

  if (has("price", "cost", "fee", "fees", "charge", "plan", "membership", "monthly", "how much"))
    return { role: "bot", text: "Memberships are flexible, with monthly and quarterly options that vary by program. For the latest pricing for the program you want, message us and we will share current rates right away.", action: { label: "Ask on WhatsApp", href: waLink("Hello PaanchaJanya, please share current pricing.") } };

  if (has("book", "trial", "join", "enrol", "enroll", "register", "sign up", "start", "admission"))
    return { role: "bot", text: "Booking takes a minute. Tell us the program and we will set up a trial and confirm your slot on WhatsApp.", book: { label: "Start booking" } };

  if (has("contact", "phone", "number", "call", "whatsapp", "talk"))
    return { role: "bot", text: `You can reach the front desk at ${TEL}.`, action: { label: "Message on WhatsApp", href: waLink("Hello PaanchaJanya, I have a question.") } };

  // programs
  if (has("table tennis", "tt", "ping pong", "pytta"))
    return { role: "bot", text: "Table tennis runs daily from 5 to 9 PM, beginner to advanced, with full tournament preparation. It builds focus, speed and a real competitive spirit.", book: { label: "Book table tennis", program: "Table Tennis (PYTTA)" } };
  if (has("yoga", "hatha", "aerial", "meditat", "pranayam"))
    return { role: "bot", text: "We teach Hatha and competitive yoga, plus aerial and meditation. Kids yoga runs daily 5 to 6 PM, and there are morning and evening batches for adults too. It improves flexibility, balance and calm.", book: { label: "Book yoga", program: "PaanchaJanya Yoga" } };
  if (has("champion", "mma", "boxing", "muay", "kick", "wrestl", "fight", "combat", "bjj"))
    return { role: "bot", text: "House of Champions covers MMA, Muay Thai, boxing, wrestling and kickboxing with coaches who have competed. Beginners are welcome, no experience needed.", book: { label: "Book a combat trial", program: "House of Champions" } };
  if (has("karate", "martial"))
    return { role: "bot", text: "Karate and fitness training for kids runs three days a week. It builds strength, self discipline, confidence and fitness.", book: { label: "Book karate", program: "Kids Activities", plan: "Karate" } };
  if (has("dance"))
    return { role: "bot", text: "Kids dance runs daily from 5 to 6 PM. The sessions are fun and build rhythm, coordination and expression.", book: { label: "Book dance", program: "Kids Activities", plan: "Dance" } };
  if (has("chess"))
    return { role: "bot", text: "Offline chess runs on weekends from 9:30 to 11 AM. It sharpens logical thinking, focus and strategy.", book: { label: "Book chess", program: "Kids Activities", plan: "Chess" } };
  if (has("kid", "child", "children", "son", "daughter", "age"))
    return { role: "bot", text: "Our kids academy offers table tennis, yoga, karate, dance and chess, in small age grouped batches from around age four. Tell me which activity and I will share its timing.", chips: ["Table tennis", "Yoga", "Karate", "Dance", "Chess"] };
  if (has("workshop", "event", "camp"))
    return { role: "bot", text: "We host workshops and camps across all four academies through the year. Check the workshops page for what is coming up, or ask us to notify you of the next one.", action: { label: "See workshops", href: "/workshops" } };
  if (has("program", "programme", "class", "activit", "offer", "discipline", "what do you"))
    return { role: "bot", text: "Four academies under one roof: Yoga, House of Champions for combat sport, Table Tennis, and the Kids academy with dance, karate, chess, yoga and table tennis. Which one interests you?", chips: ["Yoga", "Champions", "Table tennis", "Kids"] };

  // vague fallback -> clarify
  return {
    role: "bot",
    text: "I want to get you the right answer. Are you asking about a program, class timings, pricing, booking a trial, or our location?",
    chips: CHIPS,
  };
}

export default function FloatingActions() {
  const { open: openLead } = useLead();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  const startBooking = (b: Book) => {
    setOpen(false);                         // close chat so the form is visible
    openLead(b.program || "", b.plan || ""); // open the same booking form
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }, reply(t)]);
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
