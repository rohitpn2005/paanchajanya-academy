"use client";

import { useEffect, useRef } from "react";

const SPIRITS = [
  { cls: "fire", r: 24, speed: 1.6, lag: 0.20 },
  { cls: "water", r: 24, speed: -1.9, lag: 0.16 },
  { cls: "earth", r: 34, speed: 1.05, lag: 0.11 },
  { cls: "air", r: 34, speed: -1.3, lag: 0.24 },
];

export default function CursorSpirits() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = ref.current;
    if (!wrap) return;
    const nodes = Array.from(wrap.children) as HTMLElement[];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = SPIRITS.map(() => ({ x: mouse.x, y: mouse.y }));
    let t = 0;
    let raf = 0;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!shown) { shown = true; wrap.style.opacity = "1"; }
    };

    const loop = () => {
      t += 0.016;
      for (let i = 0; i < SPIRITS.length; i++) {
        const s = SPIRITS[i];
        const ang = t * s.speed + i * (Math.PI / 2);
        const tx = mouse.x + Math.cos(ang) * s.r;
        const ty = mouse.y + Math.sin(ang) * s.r;
        pos[i].x += (tx - pos[i].x) * s.lag;
        pos[i].y += (ty - pos[i].y) * s.lag;
        nodes[i].style.transform = `translate(${pos[i].x}px, ${pos[i].y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="spirits" aria-hidden="true">
      {SPIRITS.map((s) => (
        <span key={s.cls} className={"spirit " + s.cls} />
      ))}
    </div>
  );
}
