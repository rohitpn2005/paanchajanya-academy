"use client";

import type { Review } from "@/lib/types";
import { ReviewCard } from "@/components/Reviews";

// Two rows of cards that scroll continuously in opposite directions and pause
// on hover. Every review for the page is shown; rows are padded so the loop
// stays seamless even when there are only a few reviews.
export default function ReviewMarquee({ items }: { items: Review[] }) {
  const all = items.filter(Boolean);
  if (all.length === 0) return null;

  const half = Math.ceil(all.length / 2);
  const rowA = all.slice(0, half);
  const rowB = all.slice(half).length ? all.slice(half) : all;

  // Repeat a row until it has at least `min` cards, so a single copy already
  // overflows the viewport and the -50% loop never shows a gap.
  const fill = (arr: Review[], min = 6) => {
    if (!arr.length) return arr;
    const out: Review[] = [];
    while (out.length < min) out.push(...arr);
    return out;
  };

  const trackA = fill(rowA);
  const trackB = fill(rowB);
  const dup = (arr: Review[]) => [...arr, ...arr]; // two identical halves => seamless

  return (
    <div className="rv-marquee" aria-label="Member reviews">
      <div className="rv-row">
        <div className="rv-track">
          {dup(trackA).map((r, i) => (
            <div className="rv-item" key={"a" + i}><ReviewCard r={r} plain /></div>
          ))}
        </div>
      </div>
      <div className="rv-row rev">
        <div className="rv-track">
          {dup(trackB).map((r, i) => (
            <div className="rv-item" key={"b" + i}><ReviewCard r={r} plain /></div>
          ))}
        </div>
      </div>
    </div>
  );
}
