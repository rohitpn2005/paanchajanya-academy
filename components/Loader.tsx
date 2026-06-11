"use client";

import { useEffect, useState } from "react";

function ElementIcon({ name }: { name: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "fire": return (<svg viewBox="0 0 24 24" {...c}><path d="M12 3c1.8 3 5 4.2 5 8a5 5 0 0 1-10 0c0-1.8 1-3 2.2-3.8C9 9 9.5 11 11 11c1.2 0 .4-3.4 1-8z" /></svg>);
    case "water": return (<svg viewBox="0 0 24 24" {...c}><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" /></svg>);
    case "earth": return (<svg viewBox="0 0 24 24" {...c}><path d="M5 19c-.5-8 5-13 14-13 .5 8-5 13-14 13z" /><path d="M8 16c2.6-2.8 5.6-4.8 8.5-5.8" /></svg>);
    case "air": return (<svg viewBox="0 0 24 24" {...c}><path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" /></svg>);
    default: return null;
  }
}

const ELEMENTS = [
  { name: "fire", a: "0deg" },
  { name: "water", a: "90deg" },
  { name: "earth", a: "180deg" },
  { name: "air", a: "270deg" },
];

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try { seen = sessionStorage.getItem("pj_conch") === "1"; } catch { /* ignore */ }

    if (seen) { setDone(true); return; }
    try { sessionStorage.setItem("pj_conch", "1"); } catch { /* ignore */ }

    document.body.classList.add("pj-lock");
    const t = setTimeout(() => setDone(true), reduce ? 700 : 3650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) document.body.classList.remove("pj-lock");
  }, [done]);

  if (done) return null;

  return (
    <div className="pj-loader" aria-hidden="true" role="presentation">
      <div className="pj-loader__inner">
        <div className="pj-stage">
          <div className="pj-glow" />
          <div className="pj-pulse p1" />
          <div className="pj-pulse p2" />
          <div className="pj-pulse p3" />
          <div className="pj-orbit">
            {ELEMENTS.map((el) => (
              <span key={el.name} className={"pj-elem " + el.name} style={{ ["--a" as string]: el.a }}>
                <span className="b"><ElementIcon name={el.name} /></span>
              </span>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pj-logo" src="/images/paanchajanya-logo.png" alt="PaanchaJanya" />
        </div>
        <div className="pj-tag">One conch. Four worlds. Begin.</div>
      </div>
    </div>
  );
}
