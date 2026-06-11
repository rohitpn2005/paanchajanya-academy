"use client";

import BookButton from "./BookButton";

const ROW_A = ["g01", "g03", "g06", "g05", "g14", "g09", "g11", "g02"];
const ROW_B = ["g10", "g04", "g13", "g16", "g08", "g12", "g07", "g15"];

function Strip({ ids, dir }: { ids: string[]; dir: "l" | "r" }) {
  const seq = [...ids, ...ids];
  return (
    <div className={"kh-strip " + (dir === "l" ? "kh-left" : "kh-right")}>
      {seq.map((id, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={id + i} src={`/images/kids/gallery/${id}.jpg`} alt="" className="kh-photo" loading="lazy" />
      ))}
    </div>
  );
}

export default function KidsHero() {
  return (
    <section className="kids-hero">
      <div className="kh-bg" aria-hidden="true">
        <div className="kh-rows">
          <Strip ids={ROW_A} dir="l" />
          <Strip ids={ROW_B} dir="r" />
        </div>
        <div className="kh-veil" />
        <div className="grain" />
      </div>

      <div className="wrap kh-inner">
        <div className="breadcrumb"><a href="/">Academy</a> &nbsp;/&nbsp; Kids</div>
        <div className="eyebrow">Kids academy</div>
        <h1 className="display kh-title">Where kids <span className="accent">level up.</span></h1>
        <p className="hero-sub">Dance, karate, chess, yoga and table tennis under one roof. Real coaching that builds confidence, focus and friendships, from age four and up.</p>
        <div className="kh-chips">
          <span className="kh-chip">Five activities</span>
          <span className="kh-chip">Age grouped batches</span>
          <span className="kh-chip">Supervised and safe</span>
        </div>
        <div className="hero-cta">
          <BookButton program="Kids Activities">Enrol your child</BookButton>
          <a href="#programs" className="btn btn-ghost">Explore programs</a>
        </div>
      </div>
    </section>
  );
}
