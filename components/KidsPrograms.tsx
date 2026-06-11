"use client";

import Image from "next/image";
import BookButton from "./BookButton";
import type { KidsActivity } from "@/lib/types";

const P = "Kids Activities";

export default function KidsPrograms({ activities }: { activities: KidsActivity[] }) {
  if (!activities.length) {
    return <p className="kid-empty">Programs are being updated. Message us and we will share the current schedule.</p>;
  }

  return (
    <div className="kid-programs">
      <div className="kid-grid">
        {activities.map((a) => (
          <article className="kid-card" key={a.name}>
            {a.image ? (
              <div className="kid-media"><Image src={a.image} alt={a.name} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
            ) : null}
            <div className="kid-body">
              <div className="kid-head">
                <h3>{a.name}</h3>
                {a.price && a.price.toLowerCase() !== "on enquiry" ? <span className="kid-price">{a.price}</span> : null}
              </div>
              {a.ageGroup || a.timing ? (
                <div className="kid-meta">{[a.ageGroup ? `Ages ${a.ageGroup}` : null, a.timing].filter(Boolean).join("  \u00b7  ")}</div>
              ) : null}
              {a.description ? <p>{a.description}</p> : null}
              <BookButton program={P} plan={a.name} className="btn btn-primary kid-book">Book a place</BookButton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
