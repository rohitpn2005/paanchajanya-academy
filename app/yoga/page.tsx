import Hero from "@/components/Hero";
import PlanCard from "@/components/PlanCard";
import { plansFor } from "@/lib/sheets";
import { getTestimonialSet } from "@/lib/reviews";
import BookButton from "@/components/BookButton";
import Shot from "@/components/Shot";
import ReviewMarquee from "@/components/ReviewMarquee";
import { Stars } from "@/components/Reviews";
import BreathPacer from "@/components/BreathPacer";
import { PHONES } from "@/lib/site";

export const metadata = {
  title: "Yoga | Paanchajanya Academy",
  description:
    "Hatha, Iyengar, Ashtanga, Vinyasa and aerial yoga in BTM Layout, Bengaluru. A calm, fully equipped studio with mats, props, rope wall and aerial hammocks.",
};

const P = "Paanchajanya Yoga";

const GALLERY: { img: string; cap: string }[] = [
  { img: "/images/yoga/community-flow.jpg", cap: "A full morning batch flowing together" },
  { img: "/images/yoga/aerial-hammock.jpg", cap: "Aerial yoga in the silks" },
  { img: "/images/yoga/balance-class.jpg", cap: "Standing balance practice" },
  { img: "/images/yoga/aerial-blue.jpg", cap: "Inversions and arm balances on the hammock" },
  { img: "/images/yoga/chair-yoga-class.jpg", cap: "Chair supported practice for every body" },
  { img: "/images/yoga/aerial-backbend.jpg", cap: "Opening the spine in the air" },
  { img: "/images/yoga/props-class.jpg", cap: "Wheels and blocks for deeper openings" },
  { img: "/images/yoga/partner-balance.jpg", cap: "Trust and play in partner work" },
];

const STYLES: { icon: string; title: string; body: string }[] = [
  { icon: "hatha", title: "Hatha", body: "Foundational postures and alignment for a strong, steady base." },
  { icon: "iyengar", title: "Iyengar & Rope Wall", body: "Precision, props and rope wall work for deep, safe alignment." },
  { icon: "ashtanga", title: "Ashtanga", body: "A dynamic, set sequence that builds heat, focus and discipline." },
  { icon: "vinyasa", title: "Vinyasa Flow", body: "Movement linked to breath that flows with your energy." },
  { icon: "aerial", title: "Aerial Yoga", body: "Decompress, invert and play in the silks. Surprisingly approachable." },
  { icon: "props", title: "Yoga with Props", body: "Wheels, blocks and bolsters to open the body and progress safely." },
  { icon: "meditation", title: "Meditation", body: "Stillness and focus practices to settle a busy mind." },
  { icon: "pranayama", title: "Pranayama", body: "Breathwork for recovery, clarity and calm, in every class." },
];

function YogaIcon({ name }: { name: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "hatha": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="5.5" r="2.2" /><path d="M12 8v5M5 20c1.5-4 4-6 7-6s5.5 2 7 6M4 13l4 1M20 13l-4 1" /></svg>);
    case "iyengar": return (<svg viewBox="0 0 24 24" {...c}><path d="M5 3v18M5 6h13M5 11h13M5 16h13" /><path d="M18 6v12" /></svg>);
    case "ashtanga": return (<svg viewBox="0 0 24 24" {...c}><path d="M4 8h11a3 3 0 1 1-3 3" /><path d="M12 7l3 1-3 1M20 16H9a3 3 0 1 1 3-3" /><path d="M12 17l-3-1 3-1" /></svg>);
    case "vinyasa": return (<svg viewBox="0 0 24 24" {...c}><path d="M3 9c2.5-3 4.5-3 7 0s4.5 3 7 0M3 15c2.5-3 4.5-3 7 0s4.5 3 7 0" /></svg>);
    case "aerial": return (<svg viewBox="0 0 24 24" {...c}><path d="M5 3v6M19 3v6" /><path d="M5 9c0 5 3 8 7 8s7-3 7-8" /><circle cx="12" cy="13.5" r="1.6" /></svg>);
    case "props": return (<svg viewBox="0 0 24 24" {...c}><circle cx="8" cy="13" r="5" /><circle cx="8" cy="13" r="1.6" /><rect x="14.5" y="9" width="6" height="8" rx="1.5" /></svg>);
    case "meditation": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="6" r="2.2" /><path d="M4 19c1-4 4-6 8-6s7 2 8 6M3 16l5 1M21 16l-5 1" /></svg>);
    case "pranayama": return (<svg viewBox="0 0 24 24" {...c}><path d="M3 8h9a3 3 0 1 0-3-3M3 12h13a3 3 0 1 1-3 3M3 16h7" /></svg>);
    default: return null;
  }
}

export default async function YogaPage() {
  const plans = await plansFor(P);
  const reviews = await getTestimonialSet("yoga");
  return (
    <main className="yga">
      <Hero
        page="yoga" variant="full"
        breadcrumb={<><a href="/">Academy</a> &nbsp;/&nbsp; Yoga</>}
        title={[{ t: 'Find' }, { t: 'your', accent: true }, { t: 'breath.' }]}
        sub={<>Hatha, Iyengar, Ashtanga, Vinyasa and aerial yoga, taught with the depth of a traditional studio and the discipline of an academy. One calm, fully equipped space in BTM Layout.</>}
      >
        <BookButton program={P}>Book a class</BookButton>
        <a href="#plans" className="btn btn-ghost">See plans &amp; timings</a>
      </Hero>

      {/* ABOUT — larger image + floating stat chip + richer copy */}
      <section className="section yga-about">
        <div className="wrap split">
          <div className="reveal">
            <div className="eyebrow">The practice</div>
            <p className="lead" style={{ marginTop: 18 }}>
              Yoga here isn&apos;t a class you attend, it&apos;s a practice you <em>build</em>. Slow mornings, steady breath, and a body that moves better every week.
            </p>
            <div className="prose">
              <p>Our teachers blend classical lineages with modern mobility, so first timers feel safe and seasoned practitioners keep growing. From mat based Hatha and Iyengar rope wall work to aerial yoga in the silks, every session is structured and personally corrected.</p>
              <p>Small, friendly batches in a calm, fully equipped hall, with mats, blocks, bolsters, wheels, ropes and aerial hammocks all provided. Morning and evening batches in one premium space in BTM Layout 2nd Stage.</p>
            </div>
            <div className="yga-points">
              <span>Mats &amp; props provided</span>
              <span>Aerial hammocks</span>
              <span>Iyengar rope wall</span>
              <span>Beginner friendly</span>
            </div>
            <div style={{ marginTop: 30 }}>
              <BookButton program={P}>Book a trial class</BookButton>
            </div>
          </div>
          <div className="reveal d2 yga-shot">
            <Shot disc="yoga" img="/images/yoga/floor-practice.jpg" cap="Guided practice on the studio floor" />
            <div className="yga-badge"><b>8</b><span>styles &amp; formats</span></div>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="section yga-stats">
        <div className="wrap">
          <div className="count-grid">
            <div className="count reveal"><div className="n" data-count="8">0</div><div className="l">Styles &amp; formats</div></div>
            <div className="count reveal d2"><div className="n">ALL</div><div className="l">Levels, first-timers to advanced</div></div>
            <div className="count reveal d3"><div className="n">AM/PM</div><div className="l">Morning &amp; evening batches</div></div>
            <div className="count reveal d4"><div className="n">FREE</div><div className="l">Mats &amp; props provided</div></div>
          </div>
        </div>
      </section>

      {/* FUN TOOL — breathing pacer */}
      <section className="section yga-breath">
        <div className="hero-bg" aria-hidden="true"><div className="glow g2" style={{ opacity: 0.22 }} /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head mid reveal"><div className="eyebrow">Try it now</div><h2 className="display">Take a breath</h2><p>Every class begins by settling the breath. Press start and follow the circle, a calming round of guided pranayama you can do right here, before you even book.</p></div>
          <div className="reveal d2"><BreathPacer /></div>
        </div>
      </section>

      {/* STYLES */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Styles we teach</div><h2 className="display">Eight ways to practice</h2><p>One studio, many doorways in. Move between them as your practice grows.</p></div>
          <div className="card-grid cols-4">
            {STYLES.map((s, i) => (
              <div className={"card yga-style reveal" + (i % 4 === 1 ? " d2" : i % 4 === 2 ? " d3" : i % 4 === 3 ? " d4" : "")} key={s.title}>
                <span className="yga-ic"><YogaIcon name={s.icon} /></span>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AERIAL FEATURE */}
      <section className="section yga-aerial">
        <div className="wrap split rev">
          <div className="reveal yga-shot">
            <Shot disc="yoga" img="/images/yoga/aerial-inversions.jpg" cap="Aerial inversions, fully supported" />
          </div>
          <div className="reveal d2">
            <div className="eyebrow">Signature class</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem,4.6vw,3.2rem)", marginTop: 14 }}>Aerial yoga</h2>
            <div className="prose">
              <p>Our most loved class. Soft silk hammocks take the load off your spine and joints, so you can decompress, invert safely and find shapes the mat never allowed, all while having genuine fun.</p>
              <p>It looks advanced, but it is one of the most beginner friendly things we teach. Coaches stay close, the hammock supports you the whole way, and most people are upside down and grinning within their first session.</p>
            </div>
            <div className="yga-points">
              <span>Spinal decompression</span>
              <span>Core &amp; flexibility</span>
              <span>Beginner friendly</span>
            </div>
            <div style={{ marginTop: 28 }}><BookButton program={P}>Try aerial yoga</BookButton></div>
          </div>
        </div>
      </section>

      {/* TIMETABLE */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Timetable</div><h2 className="display">When we practice</h2><p>Drop into the batch that fits your day. Timings are confirmed when you book.</p></div>
          <div className="timings reveal d2">
            <div className="timing"><div className="lbl">Morning</div><div className="val">6:00 to 11:00 AM</div><div className="sub">Multiple batches, Mon to Fri</div></div>
            <div className="timing"><div className="lbl">Evening</div><div className="val">6:00 PM onwards</div><div className="sub">Wind down flow, Mon to Fri</div></div>
            <div className="timing"><div className="lbl">Saturday</div><div className="val">7:30 to 9:00 AM</div><div className="sub">Weekend special session</div></div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="section" id="plans">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Membership</div><h2 className="display">Yoga plans</h2><p>Pick a plan and the booking form fills in the rest.</p></div>
          <div className="plans reveal d2">
            {plans.map((p) => (
              <PlanCard key={p.name} plan={p} program={P} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — large masonry wall (all real photos) */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">The space</div><h2 className="display">Inside the studio</h2><p>A calm, light filled hall in BTM Layout, built for steady practice, props, rope wall and aerial silks.</p></div>
          <div className="yga-wall reveal d2">
            {GALLERY.map((g) => (
              <figure className="yga-tile" key={g.img}>
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
          <div className="sec-head mid reveal"><div className="eyebrow">Questions</div><h2 className="display">Good to know</h2></div>
          <div className="faq reveal d2">
            <details><summary>I&apos;ve never done yoga. Can I start here?<span className="pm">+</span></summary><div className="ans">Yes, most of our members start as complete beginners. The morning batches are paced for newcomers and teachers give individual corrections throughout.</div></details>
            <details><summary>Is aerial yoga safe for a first timer?<span className="pm">+</span></summary><div className="ans">It is one of the most beginner friendly classes we run. The hammock supports your weight, coaches stay close, and you build up gradually. No prior experience or strength needed.</div></details>
            <details><summary>What should I bring to my first class?<span className="pm">+</span></summary><div className="ans">Just comfortable clothing and a water bottle. Mats and props are provided. Bring your own mat once you settle into a routine if you prefer.</div></details>
            <details><summary>Do you offer private or one on one sessions?<span className="pm">+</span></summary><div className="ans">We do, on request and subject to teacher availability. Mention it when you reach out and we will share options.</div></details>
          </div>
        </div>
      </section>

      {/* REVIEWS — full looping marquee */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head mid reveal">
            <div className="eyebrow">From our members</div>
            <h2 className="display">What our yogis say</h2>
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
      <section className="section cta-band">
        <div className="hero-bg" aria-hidden="true"><div className="glow g1" style={{ opacity: 0.3 }} /></div>
        <div className="wrap" style={{ position: "relative" }}><div className="reveal"><div className="eyebrow">Begin</div><h2 className="display" style={{ marginTop: 14 }}>Roll out your mat</h2><p className="sub">Book a class and feel the difference one breath can make.</p><div className="cta-row"><BookButton program={P}>Book on WhatsApp</BookButton><a className="btn btn-ghost" href={`tel:${PHONES.yoga.tel}`}>Call {PHONES.yoga.display}</a></div></div></div>
      </section>
    </main>
  );
}
