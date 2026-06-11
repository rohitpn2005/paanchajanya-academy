"use client";

import { useRef, useState, useCallback } from "react";
import BookButton from "./BookButton";

type Ripple = { id: number; x: number; y: number };

export default function WorkshopsHero() {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);

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

  const onDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const ripple = { id, x: e.clientX - r.left, y: e.clientY - r.top };
    setRipples((rs) => [...rs, ripple]);
    window.setTimeout(() => setRipples((rs) => rs.filter((p) => p.id !== id)), 1200);
  }, []);

  return (
    <section ref={ref} className="wh-hero" onMouseMove={onMove} onPointerDown={onDown}>
      <div className="wh-bg" aria-hidden="true">
        <div className="wh-mesh" />
        <div className="wh-spot" />
        <div className="wh-rings">
          <svg viewBox="-160 -160 320 320" xmlns="http://www.w3.org/2000/svg">
            {[40, 72, 104, 136].map((r, i) => (
              <circle key={r} className={"wh-ring r" + i} cx="0" cy="0" r={r} fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            ))}
          </svg>
        </div>
        <div className="wh-dots">
          {[
            [12, 22], [82, 16], [68, 70], [24, 76], [92, 52], [44, 12],
          ].map(([l, t], i) => (
            <span key={i} className={"wh-dot d" + (i % 4)} style={{ left: `${l}%`, top: `${t}%` }} />
          ))}
        </div>
        {ripples.map((r) => (
          <span key={r.id} className="wh-ripple" style={{ left: r.x, top: r.y }} />
        ))}
        <div className="grain" />
        <div className="hero-vignette" />
      </div>

      <div className="wrap wh-inner">
        <div className="breadcrumb"><a href="/">Academy</a> &nbsp;/&nbsp; Workshops &amp; Events</div>
        <div className="eyebrow">Workshops &amp; events</div>
        <h1 className="display wh-title">
          <span>What&apos;s</span> <span className="accent">on.</span>
        </h1>
        <p className="hero-sub">Workshops, camps, masterclasses and special sessions across all four academies. Hosted regularly, open to members and first timers alike.</p>
        <div className="hero-cta">
          <BookButton program="">Register on WhatsApp</BookButton>
          <a className="btn btn-ghost" href="#all">Browse workshops</a>
        </div>
        <div className="wh-hint" aria-hidden="true">Move your cursor across the conch. Tap anywhere to send a ripple.</div>
      </div>
    </section>
  );
}
