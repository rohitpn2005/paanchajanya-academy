"use client";

import { useCallback, useRef, useState } from "react";

type S = "idle" | "wait" | "go" | "result" | "early";

const LABEL: Record<S, string> = {
  idle: "Tap to start",
  wait: "Wait for it",
  go: "Strike now",
  result: "Tap to go again",
  early: "Too soon, reset",
};

export default function ReactionTrainer() {
  const [state, setState] = useState<S>("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timer = useRef(0);
  const startAt = useRef(0);

  const arm = useCallback(() => {
    setState("wait");
    setMs(null);
    const delay = 1100 + Math.random() * 2600;
    timer.current = window.setTimeout(() => {
      startAt.current = performance.now();
      setState("go");
    }, delay);
  }, []);

  const onPad = () => {
    if (state === "idle" || state === "result" || state === "early") return arm();
    if (state === "wait") { clearTimeout(timer.current); setState("early"); return; }
    if (state === "go") {
      const r = Math.round(performance.now() - startAt.current);
      setMs(r);
      setBest((b) => (b == null ? r : Math.min(b, r)));
      setState("result");
    }
  };

  return (
    <div className="rx">
      <button type="button" className={"rx-pad " + state} onClick={onPad}>
        <span className="rx-big">{state === "result" && ms != null ? `${ms} ms` : LABEL[state]}</span>
        <span className="rx-sub">
          {state === "go" ? "Hit it" : state === "result" ? "Tap to go again" : state === "early" ? "You jumped the gun" : state === "wait" ? "Hold" : "Reflex is a fighter's edge"}
        </span>
      </button>
      <div className="rx-stats">
        <div><span>Last</span><b>{ms != null ? `${ms} ms` : "--"}</b></div>
        <div><span>Best</span><b>{best != null ? `${best} ms` : "--"}</b></div>
      </div>
    </div>
  );
}
