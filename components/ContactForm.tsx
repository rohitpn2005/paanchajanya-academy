"use client";

import { useRef, useState } from "react";
import { PROGRAMS, buildWhatsAppLink } from "@/lib/plans";
import { useLead } from "@/components/LeadProvider";

export default function ContactForm() {
  const [program, setProgram] = useState("");
  const [plan, setPlan] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const name = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const msg = useRef<HTMLTextAreaElement>(null);
  const { plans, nums } = useLead();
  const planList = plans[program] || [];

  const submit = () => {
    const e = {
      name: name.current!.value.trim().length === 0,
      phone: phone.current!.value.replace(/\D/g, "").length < 10,
      prog: program === "",
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;
    window.open(
      buildWhatsAppLink({
        name: name.current!.value.trim(),
        phone: phone.current!.value.trim(),
        program,
        plan,
        message: msg.current?.value || "",
      }, nums),
      "_blank"
    );
  };

  return (
    <div className="card reveal d2" style={{ padding: 28 }}>
      <div className={"field" + (errors.name ? " err" : "")}>
        <label htmlFor="c-name">Your name</label>
        <input ref={name} id="c-name" type="text" placeholder="e.g. Rohit Nair" />
        <div className="msg">Please enter your name.</div>
      </div>
      <div className="row2">
        <div className={"field" + (errors.phone ? " err" : "")}>
          <label htmlFor="c-phone">Phone</label>
          <input ref={phone} id="c-phone" type="tel" placeholder="98xxxxxxxx" />
          <div className="msg">Enter a valid number.</div>
        </div>
        <div className={"field" + (errors.prog ? " err" : "")}>
          <label htmlFor="c-prog">Program</label>
          <select id="c-prog" value={program} onChange={(e) => { setProgram(e.target.value); setPlan(""); }}>
            <option value="">Select</option>
            {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <div className="msg">Pick one.</div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-plan">Plan or package</label>
        <select id="c-plan" value={plan} disabled={planList.length === 0} onChange={(e) => setPlan(e.target.value)}>
          <option value="">{planList.length === 0 ? "Select a program first" : program === "Kids Activities" ? "Select an activity" : "Select a plan (optional)"}</option>
          {planList.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea ref={msg} id="c-msg" placeholder="What would you like to know?" />
      </div>
      <button className="btn btn-primary" onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Open WhatsApp</button>
      <p className="reassure" style={{ textAlign: "center", color: "var(--muted-dim)", fontSize: ".74rem", marginTop: 14 }}>Your message only goes to the academy on WhatsApp.</p>
    </div>
  );
}
