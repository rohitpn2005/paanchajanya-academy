"use client";

import { useState } from "react";

type Move = { m: string; d: string };

const MOVES: Move[] = [
  { m: "Jab", d: "Boxing" },
  { m: "Cross", d: "Boxing" },
  { m: "Lead Hook", d: "Boxing" },
  { m: "Rear Uppercut", d: "Boxing" },
  { m: "Slip & Roll", d: "Boxing" },
  { m: "Lead Elbow", d: "Muay Thai" },
  { m: "Rear Knee", d: "Muay Thai" },
  { m: "Teep", d: "Muay Thai" },
  { m: "Low Kick", d: "Muay Thai" },
  { m: "Roundhouse", d: "Muay Thai" },
  { m: "Switch Kick", d: "Kickboxing" },
  { m: "Front Kick", d: "Kickboxing" },
  { m: "Level Change", d: "Wrestling" },
  { m: "Double Leg", d: "Wrestling" },
  { m: "Sprawl", d: "Wrestling" },
];

// Deterministic starter so server and first client render match.
const INITIAL: Move[] = [MOVES[0], MOVES[1], MOVES[2]];

function generate(): Move[] {
  const n = 3 + Math.floor(Math.random() * 3); // 3 to 5
  const out: Move[] = [];
  let last = -1;
  for (let i = 0; i < n; i++) {
    let idx = last;
    while (idx === last) idx = Math.floor(Math.random() * MOVES.length);
    last = idx;
    out.push(MOVES[idx]);
  }
  return out;
}

export default function ComboGenerator() {
  const [combo, setCombo] = useState<Move[]>(INITIAL);

  return (
    <div className="combo">
      <div className="combo-flow">
        {combo.map((mv, i) => (
          <div className="combo-move" key={i}>
            <span className="combo-no">{i + 1}</span>
            <span className="combo-name">{mv.m}</span>
            <span className="combo-disc">{mv.d}</span>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-primary" onClick={() => setCombo(generate())}>Shuffle a combo</button>
      <p className="combo-note">Drill it slow, then add speed. Breathe out on every strike.</p>
    </div>
  );
}
