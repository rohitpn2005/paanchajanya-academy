"use client";

import { useState } from "react";
import BookButton from "./BookButton";

type Opt = { label: string; tag: string };
const QUESTIONS: { q: string; opts: Opt[] }[] = [
  { q: "What pulls you in?", opts: [
    { label: "Stand up striking", tag: "strike" },
    { label: "Grappling and control", tag: "ground" },
    { label: "A bit of everything", tag: "mma" },
    { label: "Speed and footwork", tag: "speed" },
  ] },
  { q: "Your main goal?", opts: [
    { label: "Self defence", tag: "ground" },
    { label: "Get fit and lean", tag: "speed" },
    { label: "Step in and compete", tag: "mma" },
    { label: "Build real confidence", tag: "strike" },
  ] },
  { q: "Your natural style?", opts: [
    { label: "Aggressive", tag: "strike" },
    { label: "Patient and technical", tag: "ground" },
    { label: "Explosive", tag: "mma" },
    { label: "Light and quick", tag: "speed" },
  ] },
];

const RESULTS: Record<string, { name: string; line: string }> = {
  strike: { name: "Muay Thai", line: "The art of eight limbs. Fists, elbows, knees and shins, built for power and a fearless clinch." },
  ground: { name: "Wrestling and BJJ", line: "Control the distance, take it to the mat, and finish from positions most people never escape." },
  mma: { name: "Mixed Martial Arts", line: "Everything, woven together. Strike, clinch, take down and submit, exactly the way the cage demands." },
  speed: { name: "Boxing and Kickboxing", line: "Footwork, timing and crisp combinations. Hit, do not get hit, and set a pace others cannot hold." },
};

export default function DisciplineFinder() {
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState<Record<string, number>>({});

  const pick = (tag: string) => {
    const next = { ...tally, [tag]: (tally[tag] || 0) + 1 };
    setTally(next);
    setStep((s) => s + 1);
  };
  const reset = () => { setStep(0); setTally({}); };

  const done = step >= QUESTIONS.length;
  const winner = done
    ? Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] || "mma"
    : null;
  const res = winner ? RESULTS[winner] : null;

  return (
    <div className="df">
      {!done ? (
        <>
          <div className="df-prog">
            {QUESTIONS.map((_, i) => <span key={i} className={"df-dot" + (i <= step ? " on" : "")} />)}
          </div>
          <h4 className="df-q">{QUESTIONS[step].q}</h4>
          <div className="df-opts">
            {QUESTIONS[step].opts.map((o) => (
              <button key={o.label} type="button" className="df-opt" onClick={() => pick(o.tag)}>{o.label}</button>
            ))}
          </div>
        </>
      ) : (
        <div className="df-result">
          <span className="df-eyebrow">Your starting point</span>
          <h4 className="df-name">{res?.name}</h4>
          <p className="df-line">{res?.line}</p>
          <div className="df-actions">
            <BookButton program="House of Champions" plan={res?.name} className="btn btn-primary">Book a trial</BookButton>
            <button type="button" className="btn btn-ghost" onClick={reset}>Start over</button>
          </div>
        </div>
      )}
    </div>
  );
}
