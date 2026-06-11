"use client";

import { useRef, useCallback, useState, useEffect } from "react";

export default function ContactHero({
  tel, whatsapp, directions,
}: { tel: string; whatsapp: string; directions: string }) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const [time, setTime] = useState<string | null>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
      el.style.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
      el.style.setProperty("--py", ((y - 0.5) * 2).toFixed(3));
    });
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);
    return () => clearInterval(id);
  }, []);

  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello PaanchaJanya Academy, I would like to know more.")}`;

  return (
    <section ref={ref} className="ct-hero" onMouseMove={onMove}>
      <div className="ct-bg" aria-hidden="true">
        <div className="ct-mesh" />
        <div className="ct-spot" />
        <div className="ct-mapgrid" />
        <div className="ct-pin">
          <span className="ct-ping r1" /><span className="ct-ping r2" /><span className="ct-ping r3" />
          <svg className="ct-marker" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2c-4 0-7 3-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-4-3-7-7-7z" fill="currentColor" />
            <circle cx="12" cy="9" r="2.6" fill="#0b0a09" />
          </svg>
        </div>
        <div className="grain" />
        <div className="hero-vignette" />
      </div>

      <div className="wrap ct-inner">
        <div className="breadcrumb"><a href="/">Academy</a> &nbsp;/&nbsp; Contact</div>
        <div className="eyebrow">Visit us</div>
        <h1 className="display ct-title">Come train <span className="accent">with us.</span></h1>
        <p className="hero-sub">All four academies share one roof in BTM Layout 2nd Stage, Bilekahalli. Drop in, call, or message. We usually reply within the hour.</p>
        <div className="ct-chips">
          <span className="ct-chip"><i className="ct-live" />{time ? `Bengaluru ${time}` : "Bengaluru"}</span>
          <span className="ct-chip">Open six days a week</span>
        </div>
        <div className="hero-cta">
          <a className="btn btn-primary" href={waLink} target="_blank" rel="noopener">Message on WhatsApp</a>
          <a className="btn btn-ghost" href={`tel:${tel}`}>Call us</a>
          <a className="btn btn-ghost" href={directions} target="_blank" rel="noopener">Get directions</a>
        </div>
      </div>
    </section>
  );
}
