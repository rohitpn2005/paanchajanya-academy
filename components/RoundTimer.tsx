"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "work" | "rest" | "done";

const ROUND_OPTS = [120, 180, 300];
const REST_OPTS = [30, 60, 90];
const COUNT_OPTS = [3, 5, 8, 12];

export default function RoundTimer() {
  const [rounds, setRounds] = useState(3);
  const [work, setWork] = useState(180);
  const [rest, setRest] = useState(60);
  const [phase, setPhase] = useState<Phase>("idle");
  const [round, setRound] = useState(1);
  const [left, setLeft] = useState(180);
  const [running, setRunning] = useState(false);
  const [muted, setMuted] = useState(false);

  const phaseRef = useRef(phase); phaseRef.current = phase;
  const roundRef = useRef(round); roundRef.current = round;
  const roundsRef = useRef(rounds); roundsRef.current = rounds;
  const workRef = useRef(work); workRef.current = work;
  const restRef = useRef(rest); restRef.current = rest;
  const mutedRef = useRef(muted); mutedRef.current = muted;
  const acRef = useRef<AudioContext | null>(null);

  const beep = (freq: number, dur = 0.16) => {
    if (mutedRef.current) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!acRef.current) acRef.current = new AC();
      const ac = acRef.current;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ac.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
      o.start(); o.stop(ac.currentTime + dur);
    } catch { /* audio unavailable */ }
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((prev) => {
        if (prev > 1) return prev - 1;
        if (phaseRef.current === "work") {
          if (roundRef.current >= roundsRef.current) {
            setPhase("done"); setRunning(false); beep(440, 0.6);
            return 0;
          }
          setPhase("rest"); beep(330); return restRef.current;
        }
        setRound((r) => r + 1); setPhase("work"); beep(680); return workRef.current;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (phase === "idle") setLeft(work); }, [work, phase]);

  const start = () => {
    acRef.current?.resume?.();
    if (phase === "idle" || phase === "done") { setRound(1); setPhase("work"); setLeft(work); }
    setRunning(true); beep(680);
  };
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setPhase("idle"); setRound(1); setLeft(work); };

  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const total = phase === "rest" ? rest : work;
  const pct = total ? Math.max(0, Math.min(100, (left / total) * 100)) : 0;
  const phaseLabel = phase === "rest" ? "Rest" : phase === "done" ? "Finished" : phase === "work" ? "Fight" : "Ready";

  return (
    <div className={"rtimer rt-" + phase}>
      <div className="rt-face">
        <div className="rt-top">
          <span className="rt-phase">{phaseLabel}</span>
          <span className="rt-round">Round {Math.min(round, rounds)} / {rounds}</span>
        </div>
        <div className="rt-clock">{phase === "done" ? "Done" : mmss(left)}</div>
        <div className="rt-bar"><span style={{ width: `${phase === "idle" ? 100 : pct}%` }} /></div>
        <div className="rt-dots">
          {Array.from({ length: rounds }).map((_, i) => (
            <i key={i} className={i < round - 1 || phase === "done" ? "done" : i === round - 1 && phase !== "idle" ? "live" : ""} />
          ))}
        </div>
      </div>

      <div className="rt-config">
        <div className="rt-group">
          <span>Round</span>
          <div className="rt-opts">
            {ROUND_OPTS.map((s) => (
              <button key={s} type="button" disabled={running} className={s === work ? "active" : ""} onClick={() => setWork(s)}>{mmss(s)}</button>
            ))}
          </div>
        </div>
        <div className="rt-group">
          <span>Rest</span>
          <div className="rt-opts">
            {REST_OPTS.map((s) => (
              <button key={s} type="button" disabled={running} className={s === rest ? "active" : ""} onClick={() => setRest(s)}>{mmss(s)}</button>
            ))}
          </div>
        </div>
        <div className="rt-group">
          <span>Rounds</span>
          <div className="rt-opts">
            {COUNT_OPTS.map((n) => (
              <button key={n} type="button" disabled={running} className={n === rounds ? "active" : ""} onClick={() => setRounds(n)}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="rt-actions">
        {running ? (
          <button type="button" className="btn btn-ghost" onClick={pause}>Pause</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={start}>{phase === "work" || phase === "rest" ? "Resume" : "Start rounds"}</button>
        )}
        <button type="button" className="btn btn-ghost" onClick={reset}>Reset</button>
        <button type="button" className="rt-mute" aria-pressed={muted} onClick={() => setMuted((m) => !m)}>{muted ? "Sound off" : "Sound on"}</button>
      </div>
    </div>
  );
}
