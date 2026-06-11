"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import BookButton from "./BookButton";
import type { Workshop } from "@/lib/types";

const FILTERS = [
  { k: "all", label: "All" },
  { k: "PaanchaJanya Yoga", label: "Yoga" },
  { k: "House of Champions", label: "Champions" },
  { k: "Table Tennis (PYTTA)", label: "Table Tennis" },
  { k: "Kids Activities", label: "Kids" },
];

const SHORT: Record<string, string> = {
  "PaanchaJanya Yoga": "Yoga",
  "House of Champions": "Champions",
  "Table Tennis (PYTTA)": "Table Tennis",
  "Kids Activities": "Kids",
};

function gcalLink(w: Workshop) {
  const text = encodeURIComponent(w.title);
  const details = encodeURIComponent(
    `${w.blurb}${w.instructor ? `\nInstructor: ${w.instructor}` : ""}${w.date ? `\nWhen: ${w.date} ${w.time || ""}` : ""}\nPaanchaJanya Academy`
  );
  const location = encodeURIComponent("PaanchaJanya Academy, Ranka Colony Rd, BTM Layout 2nd Stage, Bengaluru 560076");
  let dates = "";
  if (w.dateISO && !isNaN(Date.parse(w.dateISO))) {
    const start = new Date(w.dateISO);
    const end = new Date(start.getTime() + 90 * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    dates = `&dates=${fmt(start)}/${fmt(end)}`;
  }
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}${dates}`;
}

export default function WorkshopExplorer({ items }: { items: Workshop[] }) {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<Workshop | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const f of FILTERS) if (f.k !== "all") c[f.k] = items.filter((w) => w.program === f.k).length;
    return c;
  }, [items]);

  const list = useMemo(() => (cat === "all" ? items : items.filter((w) => w.program === cat)), [cat, items]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="wks-explorer">
      <div className="wk-filters reveal" role="tablist" aria-label="Filter workshops">
        {FILTERS.filter((f) => f.k === "all" || counts[f.k] > 0).map((f) => (
          <button
            key={f.k}
            type="button"
            role="tab"
            aria-selected={cat === f.k}
            className={"wk-filter" + (cat === f.k ? " active" : "")}
            onClick={() => setCat(f.k)}
          >
            {f.label}<span className="wk-count">{counts[f.k] ?? 0}</span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="wk-empty">No workshops in this category right now. Check back soon, or message us to be notified of the next one.</p>
      ) : (
        <div className="wk-grid" key={cat}>
          {list.map((w, i) => (
            <article className="wk-card" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }} key={w.title + i}>
              <button className="wk-poster" onClick={() => setOpen(w)} aria-label={`View ${w.title} poster`}>
                {w.image ? (
                  <Image src={w.image} alt={w.title} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                ) : (
                  <span className="wk-ph"><span className="wk-ph-cap">{w.title}</span></span>
                )}
                {w.program && SHORT[w.program] ? <span className="wk-tag">{SHORT[w.program]}</span> : null}
                <span className="wk-zoom" aria-hidden="true">View poster</span>
              </button>
              <div className="wk-body">
                <h3>{w.title}</h3>
                <p>{w.blurb}</p>
                <div className="wk-meta">
                  {w.date ? <span><b>{w.date}</b></span> : null}
                  {w.time ? <span>{w.time}</span> : null}
                  {w.instructor ? <span>{w.instructor}</span> : null}
                </div>
                <div className="wk-actions">
                  {w.registration ? (
                    <a className="btn btn-primary" href={w.registration} target="_blank" rel="noopener">Register</a>
                  ) : (
                    <BookButton program={w.program} className="btn btn-primary">Register</BookButton>
                  )}
                  <button type="button" className="btn btn-ghost" onClick={() => setOpen(w)}>Details</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {open && (
        <div className="wk-lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="wk-lb">
            <button className="wk-x" aria-label="Close" onClick={() => setOpen(null)}>&times;</button>
            <div className="wk-lb-media">
              {open.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="wk-lb-img" src={open.image} alt={open.title} />
              ) : (
                <div className="wk-lb-ph"><span>{open.title}</span></div>
              )}
            </div>
            <div className="wk-lb-info">
              {open.program && SHORT[open.program] ? <span className="eyebrow">{SHORT[open.program]}</span> : null}
              <h3 className="display">{open.title}</h3>
              <p>{open.blurb}</p>
              <div className="wk-lb-meta">
                {open.date ? <div><span>Date</span><b>{open.date}</b></div> : null}
                {open.time ? <div><span>Time</span><b>{open.time}</b></div> : null}
                {open.instructor ? <div><span>Instructor</span><b>{open.instructor}</b></div> : null}
              </div>
              <div className="wk-lb-actions">
                {open.registration ? (
                  <a className="btn btn-primary" href={open.registration} target="_blank" rel="noopener">Register now</a>
                ) : (
                  <BookButton program={open.program} className="btn btn-primary">Register on WhatsApp</BookButton>
                )}
                <a className="btn btn-ghost" href={gcalLink(open)} target="_blank" rel="noopener">Add to calendar</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
