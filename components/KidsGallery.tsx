"use client";

import { useEffect, useState } from "react";

export type GalleryItem = { img: string; cap: string };

export default function KidsGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = open != null ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open != null && e.key === "ArrowRight") setOpen((i) => (i == null ? i : (i + 1) % items.length));
      if (open != null && e.key === "ArrowLeft") setOpen((i) => (i == null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, items.length]);

  return (
    <>
      <div className="kid-wall reveal d2">
        {items.map((it, i) => (
          <button className="kid-shot" key={it.img} onClick={() => setOpen(i)} aria-label={`View ${it.cap}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.img} alt={it.cap} loading="lazy" />
            <span className="kid-cap">{it.cap}</span>
          </button>
        ))}
      </div>

      {open != null && (
        <div className="kid-lb" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <button className="kid-x" aria-label="Close" onClick={() => setOpen(null)}>&times;</button>
          <button className="kid-nav prev" aria-label="Previous" onClick={() => setOpen((i) => (i == null ? i : (i - 1 + items.length) % items.length))}>&#8249;</button>
          <figure className="kid-lb-fig">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[open].img} alt={items[open].cap} />
            <figcaption>{items[open].cap}</figcaption>
          </figure>
          <button className="kid-nav next" aria-label="Next" onClick={() => setOpen((i) => (i == null ? i : (i + 1) % items.length))}>&#8250;</button>
        </div>
      )}
    </>
  );
}
