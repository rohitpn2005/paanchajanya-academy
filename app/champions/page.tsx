import Hero from "@/components/Hero";
import PlanCard from "@/components/PlanCard";
import { plansFor } from "@/lib/sheets";
import { getTestimonialSet } from "@/lib/reviews";
import BookButton from "@/components/BookButton";
import Shot from "@/components/Shot";
import ReviewMarquee from "@/components/ReviewMarquee";
import { Stars } from "@/components/Reviews";
import ReactionTrainer from "@/components/ReactionTrainer";
import DisciplineFinder from "@/components/DisciplineFinder";
import { PHONES } from "@/lib/site";

export const metadata = {
  title: "House of Champions | Paanchajanya Academy",
  description:
    "MMA, Muay Thai, boxing, wrestling and kickboxing in BTM Layout, Bengaluru. Real mats, competed coaches and a clear path from first class to first bout.",
};

const P = "House of Champions";

const GALLERY: { img: string; cap: string }[] = [
  { img: "/images/champions/the-training-floor.jpg", cap: "The training floor" },
  { img: "/images/champions/sparring.jpg", cap: "Controlled sparring" },
  { img: "/images/champions/warm-up.jpg", cap: "Warming up together" },
  { img: "/images/champions/shadow-drills.jpg", cap: "Shadow drills" },
  { img: "/images/champions/mobility.jpg", cap: "Cool down and mobility" },
  { img: "/images/champions/no-pain-no-gain.jpg", cap: "No pain, no gain" },
];

const DISCIPLINES: { icon: string; title: string; body: string }[] = [
  { icon: "mma", title: "MMA", body: "The complete game. Striking, clinch and ground, brought together into one ruleset." },
  { icon: "muaythai", title: "Muay Thai", body: "The art of eight limbs. Fists, elbows, knees and shins, with real Thai pad work." },
  { icon: "boxing", title: "Boxing", body: "Footwork, head movement and power, built on clean fundamentals and live mitts." },
  { icon: "wrestling", title: "Wrestling", body: "Takedowns, control and scrambles. The base that decides where the fight happens." },
  { icon: "kickboxing", title: "Kickboxing", body: "Sharp striking with speed and range, blending hands and kicks into smooth combinations." },
  { icon: "strength", title: "Functional Strength", body: "Conditioning built for combat. Power, gas tank and durability that carry into every round." },
];

function DisciplineIcon({ name }: { name: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "mma": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="3.4" /></svg>);
    case "muaythai": return (<svg viewBox="0 0 24 24" {...c}><path d="M7 4h6a3 3 0 0 1 3 3v3a4 4 0 0 1-4 4H9a2 2 0 0 1-2-2z" /><path d="M16 7c1.4 0 2.4.7 2.4 2.2V12" /><path d="M9 18l-1.5 3M13 18l1.5 3" /></svg>);
    case "boxing": return (<svg viewBox="0 0 24 24" {...c}><path d="M8 6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v4a4 4 0 0 1-4 4H9a2 2 0 0 1-2-2v-1l-2-1a2 2 0 0 1-1-1.7V8a2 2 0 0 1 2-2z" /></svg>);
    case "wrestling": return (<svg viewBox="0 0 24 24" {...c}><circle cx="8" cy="6" r="2" /><circle cx="16" cy="6" r="2" /><path d="M6 21l2-7 4 2 4-2 2 7M10 11l4 0" /></svg>);
    case "kickboxing": return (<svg viewBox="0 0 24 24" {...c}><circle cx="11" cy="5" r="2" /><path d="M11 7v6l-4 4M11 11l5 2 3-2M7 17l-1 4" /></svg>);
    case "strength": return (<svg viewBox="0 0 24 24" {...c}><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" /></svg>);
    default: return null;
  }
}

function CageMesh() {
  return (
    <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cageMesh" width="46" height="46" patternUnits="userSpaceOnUse">
          <path className="cage-stroke" d="M0 23 L23 0 M23 46 L46 23 M0 23 L23 46 M23 0 L46 23" fill="none" strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="1200" height="320" fill="url(#cageMesh)" />
    </svg>
  );
}

export default async function ChampionsPage() {
  const plans = await plansFor(P);
  const reviews = await getTestimonialSet("champions");
  return (
    <main className="hoc">
      <div className="hoc-cage-bg" aria-hidden="true" />
      <Hero
        page="champions" variant="full"
        brand="/images/champions/house-of-champions-logo.png"
        breadcrumb={<><a href="/">Academy</a> &nbsp;/&nbsp; House of Champions</>}
        title={[{ t: 'Earn' }, { t: 'your' }, { t: 'stripes.', accent: true }]}
        sub={<>MMA, Muay Thai, boxing, wrestling and kickboxing under coaches who have actually competed. No egos. No shortcuts. Just work.</>}
      >
        <BookButton program={P}>Book a session</BookButton>
        <a href="#plans" className="btn btn-ghost">See plans &amp; timings</a>
      </Hero>

      {/* ABOUT */}
      <section className="section hoc-about">
        <div className="wrap split">
          <div className="reveal">
            <div className="eyebrow">The house</div>
            <p className="lead" style={{ marginTop: 18 }}>
              We do not sell memberships. We build <em>fighters, athletes, and people who do not quit</em>, whatever shape that takes for you.
            </p>
            <div className="prose">
              <p>Walk in for fitness, self defence, or the cage. Either way you train on real mats, with real coaches, in a room that respects the work. Beginners are welcome. We meet you where you are and push from there.</p>
              <p>Striking, grappling and conditioning under one roof, with a clear path from your first nervous class to your first amateur bout. Every session is structured, every round is supervised, and nobody trains alone.</p>
            </div>
            <div className="hoc-points">
              <span>Competed coaches</span>
              <span>Real mats &amp; cage work</span>
              <span>Beginners welcome</span>
              <span>Amateur fight path</span>
            </div>
            <div style={{ marginTop: 30 }}>
              <BookButton program={P}>Book a trial session</BookButton>
            </div>
          </div>
          <div className="reveal d2 hoc-shot">
            <Shot disc="champ" img="/images/champions/the-bag-room.jpg" cap="The bag room" />
            <div className="hoc-badge"><b>6</b><span>disciplines</span></div>
          </div>
        </div>
      </section>

      {/* PLANS — moved up, right below about */}
      <section className="section" id="plans">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Membership</div><h2 className="display">Training plans</h2><p>One pass, every discipline. Pick a plan and the booking form fills in the rest.</p></div>
          <div className="plans reveal d2">
            {plans.map((p) => (
              <PlanCard key={p.name} plan={p} program={P} />
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Disciplines</div><h2 className="display">What you can train</h2><p>Cross train across all of them on a single membership, or focus on the one that calls you.</p></div>
          <div className="card-grid cols-3">
            {DISCIPLINES.map((d, i) => (
              <div className={"card hoc-disc reveal" + (i % 3 === 1 ? " d2" : i % 3 === 2 ? " d3" : "")} key={d.title}>
                <span className="hoc-ic"><DisciplineIcon name={d.icon} /></span>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="section hoc-stats">
        <div className="wrap">
          <div className="count-grid">
            <div className="count reveal"><div className="n" data-count="6">0</div><div className="l">Disciplines, one roof</div></div>
            <div className="count reveal d2"><div className="n">ALL</div><div className="l">Levels, first class to first bout</div></div>
            <div className="count reveal d3"><div className="n">AM/PM</div><div className="l">Morning &amp; evening mat time</div></div>
            <div className="count reveal d4"><div className="n">PRO</div><div className="l">Coaches who have competed</div></div>
          </div>
        </div>
      </section>

      {/* TRAIN — combat tools */}
      <section className="section hoc-tools">
        <div className="hoc-cage" aria-hidden="true"><CageMesh /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head mid reveal"><div className="eyebrow">Train with us</div><h2 className="display">Sharpen your edge</h2><p>Test the reflexes a fighter lives on, then find the discipline that fits how you want to move.</p></div>
          <div className="hoc-tool-grid">
            <div className="hoc-tool reveal">
              <h3 className="hoc-tool-h">Reaction cage</h3>
              <p className="hoc-tool-p">Wait for the pad to turn, then strike. We clock your reaction in milliseconds and track your best. Jump early and you reset.</p>
              <ReactionTrainer />
            </div>
            <div className="hoc-tool reveal d2">
              <h3 className="hoc-tool-h">Find your discipline</h3>
              <p className="hoc-tool-p">Three quick questions and we point you at the martial art that matches your goals, then set up a trial.</p>
              <DisciplineFinder />
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">How we train</div><h2 className="display">Training philosophy</h2><p>Every fighter who walks through the door follows the same path, adapted to your level.</p></div>
          <div className="steps reveal d2">
            <div className="step"><div className="no">01</div><h4>Fundamentals</h4><p>Stance, breathing and base movement before anything else.</p></div>
            <div className="step"><div className="no">02</div><h4>Live drilling</h4><p>Reps under light resistance until technique becomes instinct.</p></div>
            <div className="step"><div className="no">03</div><h4>Controlled sparring</h4><p>Safe, supervised rounds that build real timing and composure.</p></div>
            <div className="step"><div className="no">04</div><h4>Compete</h4><p>For those who want it, a structured path to amateur bouts.</p></div>
          </div>
        </div>
      </section>

      {/* GALLERY — large masonry wall */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Inside</div><h2 className="display">Life on the mats</h2><p>Real sessions, real people. This is what a week inside the House of Champions looks like.</p></div>
          <div className="hoc-wall reveal d2">
            {GALLERY.map((g) => (
              <figure className="hoc-tile" key={g.img}>
                <img src={g.img} alt={g.cap} loading="lazy" />
                <figcaption>{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head mid reveal"><div className="eyebrow">Questions</div><h2 className="display">Before you step in</h2></div>
          <div className="faq reveal d2">
            <details><summary>I have never trained combat sport. Is that okay?<span className="pm">+</span></summary><div className="ans">Completely. Most members start with zero experience. You begin on the fundamentals track and progress at your own pace, with no sparring until you are ready.</div></details>
            <details><summary>Will I get hurt?<span className="pm">+</span></summary><div className="ans">Training is supervised and sparring is controlled. Bumps happen in any sport, but safety and technique come first here, and coaches manage intensity carefully.</div></details>
            <details><summary>What gear do I need to start?<span className="pm">+</span></summary><div className="ans">For your first sessions, just athletic wear and water. As you progress, coaches will guide you on gloves, wraps and protective gear.</div></details>
            <details><summary>Can I train just for fitness, not fighting?<span className="pm">+</span></summary><div className="ans">Absolutely. Many members never compete. They train for conditioning, stress relief and confidence. The choice is always yours.</div></details>
          </div>
        </div>
      </section>

      {/* REVIEWS — full looping marquee */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head mid reveal">
            <div className="eyebrow">From the gym</div>
            <h2 className="display">What fighters say</h2>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "Archivo", fontWeight: 900, fontSize: "1.5rem", color: "var(--accent)" }}>{reviews.rating.toFixed(1)}</span>
              <Stars n={reviews.rating} />
              <span style={{ color: "var(--muted)", fontSize: ".84rem" }}>{reviews.count.toLocaleString("en-IN")} member reviews</span>
            </div>
          </div>
        </div>
        <ReviewMarquee items={reviews.items} />
      </section>

      {/* CTA */}
      <section className="section cta-band hoc-cta">
        <div className="hero-bg" aria-hidden="true"><div className="glow g1" style={{ opacity: 0.32 }} /></div>
        <div className="wrap" style={{ position: "relative" }}><div className="reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hoc-cta-logo" src="/images/champions/house-of-champions-logo.png" alt="House of Champions" />
          <div className="eyebrow">Technique over strength</div>
          <h2 className="display" style={{ marginTop: 14 }}>Book your first round</h2><p className="sub">Book a session. See if the House is for you.</p><div className="cta-row"><BookButton program={P}>Book on WhatsApp</BookButton><a className="btn btn-ghost" href={`tel:${PHONES.champions.tel}`}>Call {PHONES.champions.display}</a></div></div></div>
      </section>
    </main>
  );
}
