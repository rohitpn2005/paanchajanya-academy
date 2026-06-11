"use client";

import { useEffect, useState } from "react";

type Parts = { d: number; h: number; m: number; s: number };

function parts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown({ dateISO, fallbackDays = 18 }: { dateISO?: string; fallbackDays?: number }) {
  // Freeze the target once on mount so it stays stable across renders.
  const [target] = useState(() =>
    dateISO && !isNaN(Date.parse(dateISO))
      ? Date.parse(dateISO)
      : Date.now() + fallbackDays * 86400000
  );

  // Start as null so the server and the first client render are identical
  // ("--"), then begin ticking after mount. This avoids a hydration mismatch
  // from the live clock.
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setT(parts(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const cell = (v: number | undefined) => (t ? pad(v as number) : "--");

  return (
    <div className="countdown" aria-label="Time until workshop">
      <div className="cd-box"><b>{cell(t?.d)}</b><span>Days</span></div>
      <div className="cd-box"><b>{cell(t?.h)}</b><span>Hrs</span></div>
      <div className="cd-box"><b>{cell(t?.m)}</b><span>Min</span></div>
      <div className="cd-box"><b>{cell(t?.s)}</b><span>Sec</span></div>
    </div>
  );
}
