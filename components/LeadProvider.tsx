"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PROGRAMS, buildWhatsAppLink } from "@/lib/plans";

type PlansMap = Record<string, string[]>;
type NumsMap = Record<string, string>;
type Ctx = { open: (program?: string, plan?: string) => void; plans: PlansMap; nums: NumsMap };
const LeadContext = createContext<Ctx>({ open: () => {}, plans: {}, nums: {} });
export const useLead = () => useContext(LeadContext);

export default function LeadProvider({ children, plans = {}, nums = {} }: { children: React.ReactNode; plans?: PlansMap; nums?: NumsMap }) {
  const [isOpen, setOpen] = useState(false);
  const [program, setProgram] = useState("");
  const [plan, setPlan] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((p = "", pl = "") => {
    lastFocus.current = document.activeElement as HTMLElement;
    setProgram(p);
    // pick the plan option whose label contains the requested key (case-insensitive)
    const list = plans[p] || [];
    const match = pl ? list.find((x) => x.toLowerCase().includes(pl.toLowerCase())) : "";
    setPlan(match || "");
    setErrors({});
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setErrors({});
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) setTimeout(() => nameRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Make the browser / phone Back button simply close the modal
  // instead of navigating away from (or exiting) the site.
  useEffect(() => {
    if (!isOpen) return;
    // add a history entry that represents "modal is open"
    window.history.pushState({ pjLead: true }, "");
    const onPop = () => close(); // Back pressed -> close the modal
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // If the modal was closed from the UI (X / backdrop / Escape / submit)
      // rather than by Back, remove the history entry we added so the
      // back-stack stays clean.
      if (window.history.state && window.history.state.pjLead) {
        window.history.back();
      }
    };
  }, [isOpen, close]);

  const planList = plans[program] || [];

  const submit = () => {
    const name = nameRef.current!.value.trim();
    const age = ageRef.current!.value;
    const phone = phoneRef.current!.value;
    const e: Record<string, boolean> = {
      name: name.length === 0,
      age: !(age && +age >= 3),
      phone: phone.replace(/\D/g, "").length < 10,
      prog: program === "",
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;
    const url = buildWhatsAppLink({
      name, age, phone, program, plan,
      time: timeRef.current?.value || "",
      message: msgRef.current?.value || "",
    }, nums);
    window.open(url, "_blank");
    close();
  };

  const ctx = useMemo(() => ({ open, plans, nums }), [open, plans, nums]);

  return (
    <LeadContext.Provider value={ctx}>
      {children}
      <div
        className={"modal-back" + (isOpen ? " open" : "")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="modal">
          <button className="x" aria-label="Close" onClick={close}>&times;</button>
          <h3 className="display" id="lead-title">Book your spot</h3>
          <p className="mh-sub">Fill this in and we&apos;ll open WhatsApp with your details ready to send.</p>

          <div className={"field" + (errors.name ? " err" : "")}>
            <label htmlFor="i-name">Your name</label>
            <input ref={nameRef} id="i-name" type="text" placeholder="e.g. Rohit Nair" />
            <div className="msg">Please enter your name.</div>
          </div>

          <div className="row2">
            <div className={"field" + (errors.age ? " err" : "")}>
              <label htmlFor="i-age">Age</label>
              <input ref={ageRef} id="i-age" type="number" min={3} max={99} placeholder="28" />
              <div className="msg">Add an age.</div>
            </div>
            <div className={"field" + (errors.phone ? " err" : "")}>
              <label htmlFor="i-phone">Phone</label>
              <input ref={phoneRef} id="i-phone" type="tel" placeholder="98xxxxxxxx" />
              <div className="msg">Enter a valid number.</div>
            </div>
          </div>

          <div className={"field" + (errors.prog ? " err" : "")}>
            <label htmlFor="i-prog">Program</label>
            <select
              id="i-prog"
              value={program}
              onChange={(e) => { setProgram(e.target.value); setPlan(""); }}
            >
              <option value="">Select a program</option>
              {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="msg">Pick a program.</div>
          </div>

          <div className="field">
            <label htmlFor="i-plan">Plan or package</label>
            <select
              id="i-plan"
              value={plan}
              disabled={planList.length === 0}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="">
                {planList.length === 0
                  ? "Select a program first"
                  : program === "Kids Activities" ? "Select an activity" : "Select a plan (optional)"}
              </option>
              {planList.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="i-time">Preferred timing</label>
            <select ref={timeRef} id="i-time">
              <option value="">Any time</option>
              <option>Morning</option>
              <option>Evening</option>
              <option>Weekend</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="i-msg">Message (optional)</label>
            <textarea ref={msgRef} id="i-msg" placeholder="Anything we should know?" />
          </div>

          <button className="btn btn-primary submit" onClick={submit}>Open WhatsApp</button>
          <p className="reassure">No spam. Your details only go to the academy on WhatsApp.</p>
        </div>
      </div>
    </LeadContext.Provider>
  );
}
