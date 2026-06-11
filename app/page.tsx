import Link from "next/link";
import Hero from "@/components/Hero";
import BookButton from "@/components/BookButton";
import Countdown from "@/components/Countdown";
import { PHONES } from "@/lib/site";
import { getFeaturedWorkshop } from "@/lib/sheets";
import { getOverallStats, getCombinedTestimonials } from "@/lib/reviews";
import { Stars } from "@/components/Reviews";
import ReviewMarquee from "@/components/ReviewMarquee";

function ElementGlyph({ k }: { k: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (k) {
    case "fire": return (<svg viewBox="0 0 24 24" {...c}><path d="M12 3c1.8 3 5 4.2 5 8a5 5 0 0 1-10 0c0-1.8 1-3 2.2-3.8C9 9 9.5 11 11 11c1.2 0 .4-3.4 1-8z" /></svg>);
    case "water": return (<svg viewBox="0 0 24 24" {...c}><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" /></svg>);
    case "earth": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" /></svg>);
    case "air": return (<svg viewBox="0 0 24 24" {...c}><path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" /></svg>);
    case "space": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.5" /></svg>);
    default: return null;
  }
}

const ELEMENTS: { k: string; name: string; sub: string; line: string }[] = [
  { k: "earth", name: "Earth", sub: "Prithvi", line: "Ground your practice. Real strength starts from a stable base." },
  { k: "water", name: "Water", sub: "Jala", line: "Stay in flow. Reflex, rhythm and rallies that keep moving." },
  { k: "fire", name: "Fire", sub: "Agni", line: "Forge your will. Power and grit, tempered round after round." },
  { k: "air", name: "Air", sub: "Vayu", line: "Free your breath. Lightness, balance and a quiet mind." },
  { k: "space", name: "Space", sub: "Aakasha", line: "Hold it together. The one roof where four worlds meet." },
];

const ACADEMIES: { href: string; no: string; tag: string; el: string; accent: string; img: string; title: string; desc: string; cta: string }[] = [
  { href: "/yoga", no: "01", tag: "Wellness", el: "air", accent: "#ffb347", img: "/images/home/paanchajanya-yoga.jpg", title: "Paanchajanya Yoga", desc: "Hatha, Iyengar, Ashtanga and Vinyasa flow, with meditation, pranayama and aerial.", cta: "Enter yoga" },
  { href: "/champions", no: "02", tag: "Combat", el: "fire", accent: "#ff5340", img: "/images/home/house-of-champions.jpg", title: "House of Champions", desc: "MMA, Muay Thai, boxing, wrestling, kickboxing and functional strength.", cta: "Enter the cage" },
  { href: "/pytta", no: "03", tag: "Sport", el: "water", accent: "#46a8ff", img: "/images/home/table-tennis-pytta.jpg", title: "Table Tennis", desc: "Beginner to advanced coaching with full tournament preparation.", cta: "Enter the academy" },
  { href: "/kids", no: "04", tag: "Youth", el: "earth", accent: "#ff5fa2", img: "/images/home/kids-academy.jpg", title: "Kids Academy", desc: "Dance, karate, chess, table tennis and yoga, built for growing minds.", cta: "Enrol your child" },
];

export default async function HomePage() {
  const [featured, stats, marqueeItems] = await Promise.all([
    getFeaturedWorkshop(), getOverallStats(), getCombinedTestimonials(),
  ]);

  return (
    <main className="home">
      <Hero
        page="home" variant="full" id="top"
        eyebrow={<>Bengaluru &nbsp;&bull;&nbsp; BTM Layout 2nd Stage</>}
        title={[{ t: 'Train.' }, { t: 'Learn.', accent: true }, { t: 'Compete.' }, { t: 'Transform.', accent: true }]}
        sub={<>One academy. Four worlds. Five elements. Yoga, combat sport, table tennis and youth programs, all under a single roof.</>}
      >
        <a href="#academies" className="btn btn-primary">Explore programs</a>
        <BookButton program="" className="btn btn-ghost">Book a class</BookButton>
      </Hero>

      {/* MEANING + FIVE ELEMENTS */}
      <section className="section home-meaning" id="about">
        <div className="elfield" aria-hidden="true"><span className="ef fire" /><span className="ef water" /><span className="ef earth" /><span className="ef air" /></div>
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">The meaning</div><h2 className="display">What Paanchajanya means</h2></div>
          <div className="meaning-grid">
            <div className="meaning-emblem reveal">
              <div className="me-rays" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/paanchajanya-emblem.png" alt="Paanchajanya emblem" />
            </div>
            <div className="meaning-text reveal d2">
              <p className="lead">Paanchajanya is the great conch of Krishna, sounded across the Mahabharata to call warriors, and dharma itself, to begin.</p>
              <p>Paancha means five. The name carries the five great elements, the pancha mahabhuta, that shape every body and every discipline we teach. The conch is the call to start. The five elements are how you grow once you answer it.</p>
              <div className="taglist"><span>One roof</span><span>Four academies</span><span>Five elements</span><span>Every age</span></div>
            </div>
          </div>
          <div className="elements reveal d2">
            {ELEMENTS.map((e) => (
              <div className={"el-card " + e.k} key={e.k}>
                <span className="el-orb"><ElementGlyph k={e.k} /></span>
                <div className="el-name">{e.name}<small>{e.sub}</small></div>
                <p>{e.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIES — big cards */}
      <section className="section" id="academies">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Four academies</div><h2 className="display">Pick your discipline</h2><p>Each academy runs its own coaches, schedule and membership, unified under one standard of training.</p></div>
          <div className="ac-grid">
            {ACADEMIES.map((a, i) => (
              <Link href={a.href} key={a.href} className={"ac-card reveal" + (i ? " d" + Math.min(i + 1, 4) : "")} style={{ ["--accent" as string]: a.accent }}>
                <div className="ac-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.img} alt={a.title} />
                  <span className={"ac-el " + a.el} aria-hidden="true"><ElementGlyph k={a.el} /></span>
                  <span className="ac-no">{a.no}</span>
                </div>
                <div className="ac-body">
                  <span className="eyebrow">{a.no} &bull; {a.tag}</span>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <span className="ac-go">{a.cta} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="section counters">
        <div className="wrap"><div className="count-grid">
          <div className="count reveal"><div className="n" data-count="1200" data-suf="+">0</div><div className="l">Active students</div></div>
          <div className="count reveal d2"><div className="n" data-count="850" data-suf="+">0</div><div className="l">Five star reviews</div></div>
          <div className="count reveal d3"><div className="n" data-count="60" data-suf="+">0</div><div className="l">Workshops hosted</div></div>
          <div className="count reveal d4"><div className="n" data-count="4">0</div><div className="l">Academies, one roof</div></div>
        </div></div>
      </section>

      {featured && (
        <section className="section" id="workshop">
          <div className="wrap">
            <div className="sec-head reveal"><div className="eyebrow">Featured this month</div><h2 className="display">Upcoming workshop</h2><p>Special sessions and guest workshops across all four academies. Here is what is coming up next.</p></div>
            <div className="feature reveal d2">
              <div className="fglow" aria-hidden="true" />
              <div>
                <span className="live"><i />Registrations open</span>
                <h3 className="display">{featured.title}</h3>
                <p>{featured.blurb}</p>
                <div className="meta">
                  <div><span>Date</span><b>{featured.date}</b></div>
                  <div><span>Time</span><b>{featured.time}</b></div>
                  <div><span>Instructor</span><b>{featured.instructor}</b></div>
                </div>
                <BookButton program={featured.program}>Register now</BookButton>
              </div>
              <Countdown dateISO={featured.dateISO} />
            </div>
            <div className="center reveal" style={{ marginTop: 30 }}><Link href="/workshops" className="btn btn-ghost">See all workshops and events &rarr;</Link></div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section className="section" id="reviews">
        <div className="wrap">
          <div className="sec-head mid reveal">
            <div className="eyebrow">From our members</div><h2 className="display">What people say</h2>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "Archivo", fontWeight: 900, fontSize: "1.5rem", color: "var(--accent)" }}>{stats.rating.toFixed(1)}</span>
              <Stars n={stats.rating} />
              <span style={{ color: "var(--muted)", fontSize: ".84rem" }}>{stats.count.toLocaleString("en-IN")}+ reviews across all four academies</span>
            </div>
          </div>
        </div>
        <ReviewMarquee items={marqueeItems} />
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="hero-bg" aria-hidden="true"><div className="glow g1" style={{ opacity: 0.3 }} /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="reveal">
            <div className="eyebrow">Start today</div>
            <h2 className="display" style={{ marginTop: 14 }}>Your first class is one message away</h2>
            <p className="sub">Tell us what you are after and we will get you booked into a class. We usually reply within the hour.</p>
            <div className="cta-row"><BookButton program="">Book on WhatsApp</BookButton><a className="btn btn-ghost" href={`tel:${PHONES.yoga.tel}`}>Call {PHONES.yoga.display}</a><Link className="btn btn-ghost" href="/contact">Our location</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
