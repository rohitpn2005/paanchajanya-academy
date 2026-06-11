import type { Review } from "@/lib/types";
import type { ReviewSet } from "@/lib/reviews";

export function Stars({ n = 5 }: { n?: number }) {
  return <div className="stars" aria-label={`${n} out of 5`}>{"\u2605".repeat(Math.round(n))}</div>;
}

export function initialsOf(name: string) {
  return name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "G";
}

export function ReviewCard({ r, delay, plain }: { r: Review; delay?: number; plain?: boolean }) {
  const cls = plain ? "quote" : "quote reveal" + (delay === 2 ? " d2" : delay === 3 ? " d3" : "");
  return (
    <figure className={cls}>
      <Stars n={r.rating} />
      <p>&ldquo;{r.text}&rdquo;</p>
      <figcaption className="who">
        <span className="av">{r.initials || initialsOf(r.name)}</span>
        <div><b>{r.name}</b><span>{r.program}</span></div>
      </figcaption>
    </figure>
  );
}

function RatingBadge({ rating, count }: { rating: number; count: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontFamily: "Archivo", fontWeight: 900, fontSize: "1.5rem", color: "var(--accent)" }}>{rating.toFixed(1)}</span>
      <Stars n={rating} />
      <span style={{ color: "var(--muted)", fontSize: ".84rem" }}>{count.toLocaleString("en-IN")} reviews</span>
    </div>
  );
}

// Per-page review section. Pass the data (sheet driven, fetched on the page).
export default function Reviews({
  data,
  heading = "What members say",
  eyebrow = "From our members",
  limit = 3,
}: {
  data: ReviewSet;
  heading?: string;
  eyebrow?: string;
  limit?: number;
}) {
  const few = data.items.slice(0, limit);
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="display">{heading}</h2>
          <div style={{ marginTop: 12 }}><RatingBadge rating={data.rating} count={data.count} /></div>
        </div>
        <div className="quotes reveal d2">
          {few.map((r, i) => <ReviewCard key={r.name + i} r={r} delay={i === 1 ? 2 : i === 2 ? 3 : undefined} />)}
        </div>
      </div>
    </section>
  );
}
