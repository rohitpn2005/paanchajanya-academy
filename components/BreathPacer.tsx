"use client";

import { useEffect, useState } from "react";

type Phase = { label: string; secs: number; scale: number };
type Pattern = { name: string; phases: Phase[] };

// Simple, calming pranayama patterns. scale drives the orb size:
// 1 = full inhale, 0.5 = full exhale, holds keep the previous size.
const PATTERNS: Record<string, Pattern> = {
  box: {
    name: "Box · 4·4·4·4",
    phases: [
      { label: "Breathe in", secs: 4, scale: 1 },
      { label: "Hold", secs: 4, scale: 1 },
      { label: "Breathe out", secs: 4, scale: 0.5 },
      { label: "Hold", secs: 4, scale: 0.5 },
    ],
  },
  calm: {
    name: "Calm · 4·7·8",
    phases: [
      { label: "Breathe in", secs: 4, scale: 1 },
      { label: "Hold", secs: 7, scale: 1 },
      { label: "Breathe out", secs: 8, scale: 0.5 },
    ],
  },
  deep: {
    name: "Deep · 5·5",
    phases: [
      { label: "Breathe in", secs: 5, scale: 1 },
      { label: "Breathe out", secs: 5, scale: 0.5 },
    ],
  },
};

export default function BreathPacer() {
  const [key, setKey] = useState<keyof typeof PATTERNS>("box");
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);

  const phases = PATTERNS[key].phases;
  const phase = phases[phaseIdx];

  // One timer per phase: count down each second, advance when it ends.
  useEffect(() => {
    if (!running) return;
    const secs = phases[phaseIdx].secs;
    setCount(secs);
    let remaining = secs;
    const tick = setInterval(() => {
      remaining -= 1;
      setCount(remaining > 0 ? remaining : 0);
    }, 1000);
    const advance = setTimeout(() => {
      const next = (phaseIdx + 1) % phases.length;
      if (next === 0) setRounds((r) => r + 1);
      setPhaseIdx(next);
    }, secs * 1000);
    return () => { clearInterval(tick); clearTimeout(advance); };
  }, [running, phaseIdx, key]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = () => { setRounds(0); setPhaseIdx(0); setRunning(true); };
  const stop = () => { setRunning(false); setPhaseIdx(0); setCount(0); };
  const pick = (k: keyof typeof PATTERNS) => { setRunning(false); setPhaseIdx(0); setCount(0); setRounds(0); setKey(k); };

  const scale = running ? phase.scale : 0.68;
  const dur = running ? phase.secs : 0.6;

  return (
    <div className="breath">
      <div className="breath-stage">
        <span className="breath-ring" aria-hidden="true" />
        <span className="breath-ring r2" aria-hidden="true" />
        <span
          className="breath-orb"
          style={{ transform: `scale(${scale})`, transitionDuration: `${dur}s` }}
        >
          <span className="breath-inner">
            {running ? (
              <>
                <span className="breath-label">{phase.label}</span>
                <span className="breath-count">{count}</span>
              </>
            ) : (
              <span className="breath-label rest">Press start</span>
            )}
          </span>
        </span>
      </div>

      <div className="breath-controls" role="group" aria-label="Breathing pattern">
        {(Object.keys(PATTERNS) as (keyof typeof PATTERNS)[]).map((k) => (
          <button
            key={k}
            type="button"
            className={"breath-pat" + (k === key ? " active" : "")}
            onClick={() => pick(k)}
          >
            {PATTERNS[k].name}
          </button>
        ))}
      </div>

      <div className="breath-actions">
        {running ? (
          <button type="button" className="btn btn-ghost" onClick={stop}>Stop</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={start}>Start breathing</button>
        )}
        <span className="breath-rounds">{rounds} round{rounds === 1 ? "" : "s"} complete</span>
      </div>
    </div>
  );
}
