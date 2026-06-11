import Hero from "@/components/Hero";
import PlanCard from "@/components/PlanCard";
import { plansFor } from "@/lib/sheets";
import { getTestimonialSet } from "@/lib/reviews";
import BookButton from "@/components/BookButton";
import Shot from "@/components/Shot";
import ReviewMarquee from "@/components/ReviewMarquee";
import { Stars } from "@/components/Reviews";
import { PHONES } from "@/lib/site";

export const metadata = {
  title: "Table Tennis | PaanchaJanya Table Tennis Academy",
  description:
    "PaanchaJanya Table Tennis Academy in BTM Layout, Bengaluru. Structured coaching from beginner to tournament level on TTFI-approved match tables.",
};

const P = "Table Tennis (PYTTA)";

// Featured photo + grid tiles for the gallery wall.
const GALLERY: { img: string; cap: string }[] = [
  { img: "/images/pytta/gallery/champions-league.jpg", cap: "Our squad at the Amateur Champions League team championship" },
  { img: "/images/pytta/gallery/the-arena.jpg", cap: "An evening session in full swing" },
  { img: "/images/pytta/gallery/coaching-clinic.jpg", cap: "Coaching clinic and match demonstration" },
  { img: "/images/pytta/gallery/junior-rallies.jpg", cap: "Juniors building clean, repeatable strokes" },
  { img: "/images/pytta/gallery/full-house.jpg", cap: "A full house on the training floor" },
  { img: "/images/pytta/gallery/tournament-hall.jpg", cap: "Match play under tournament lights" },
];

const FACILITIES: { icon: string; title: string; body: string }[] = [
  { icon: "table", title: "Match-standard tables", body: "Multiple TTFI-approved STAG tables with full match spacing, so you practise like it is tournament day." },
  { icon: "levels", title: "Structured coaching", body: "Every player is placed by skill and follows a planned curriculum, not random knock-arounds." },
  { icon: "footwork", title: "Footwork and drills", body: "Multiball, shadow play and footwork patterns that build real consistency under rally pressure." },
  { icon: "match", title: "Regular match play", body: "In-house games and ladders so you learn to compete and read an opponent, not just rally." },
  { icon: "junior", title: "Junior development", body: "A dedicated pathway for young players, from their first strokes to district and state entries." },
  { icon: "trophy", title: "Tournament support", body: "We host in-house tournaments and back players stepping into district and state level events." },
];

function FacilityIcon({ name }: { name: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "table": return (<svg viewBox="0 0 24 24" {...c}><path d="M3 8h18v3H3z" /><path d="M5 11l1 9M19 11l-1 9M12 11v9" /><path d="M3 16h18" /></svg>);
    case "levels": return (<svg viewBox="0 0 24 24" {...c}><path d="M4 20V11M10 20V4M16 20v-6M22 20H2" /></svg>);
    case "footwork": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.7" fill="currentColor" /></svg>);
    case "match": return (<svg viewBox="0 0 24 24" {...c}><circle cx="10" cy="10" r="6" /><path d="M14.2 14.2L20 20" /></svg>);
    case "junior": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="12" r="9" /><path d="M8.5 14a4 4 0 0 0 7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></svg>);
    case "trophy": return (<svg viewBox="0 0 24 24" {...c}><path d="M7 4h10v4a5 5 0 0 1-10 0z" /><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" /><path d="M12 13v4M9 21h6M10 21v-2.5h4V21" /></svg>);
    default: return null;
  }
}

function PaddlesBall() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(45 54) rotate(-26)">
        <ellipse className="tt-fill-accent" cx="0" cy="-14" rx="16" ry="19" />
        <ellipse cx="0" cy="-14" rx="16" ry="19" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.2" />
        <rect x="-3.4" y="2" width="6.8" height="22" rx="3" fill="#c08a4a" />
      </g>
      <g transform="translate(75 54) rotate(26)">
        <ellipse cx="0" cy="-14" rx="16" ry="19" fill="#26262d" />
        <ellipse className="tt-stroke-accent" cx="0" cy="-14" rx="16" ry="19" fill="none" strokeWidth="1.5" />
        <rect x="-3.4" y="2" width="6.8" height="22" rx="3" fill="#c08a4a" />
      </g>
      <circle className="tt-ball" cx="60" cy="20" r="7.5" fill="#fff" />
      <circle cx="60" cy="20" r="7.5" fill="none" stroke="rgba(0,0,0,.14)" strokeWidth="1" />
    </svg>
  );
}

function BounceField() {
  return (
    <svg viewBox="0 0 1200 130" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="tt-stroke-accent"
        d="M0 108 Q 75 24 150 108 Q 225 24 300 108 Q 375 24 450 108 Q 525 24 600 108 Q 675 24 750 108 Q 825 24 900 108 Q 975 24 1050 108 Q 1125 24 1200 108"
        strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 12"
      />
      {[0, 150, 300, 450, 600, 750, 900, 1050, 1200].map((x) => (
        <circle key={x} className="tt-fill-accent" cx={x} cy="108" r="5" />
      ))}
    </svg>
  );
}

export default async function PyttaPage() {
  const plans = await plansFor(P);
  const reviews = await getTestimonialSet("pytta");

  return (
    <main className="ttac">
      <Hero
        page="pytta" variant="full"
        breadcrumb={<><a href="/">Academy</a> &nbsp;/&nbsp; Table Tennis</>}
        title={[{ t: 'Sharper' }, { t: 'every' }, { t: 'rally.', accent: true }]}
        sub={<>PaanchaJanya Table Tennis Academy. Structured coaching from your first paddle to your first podium, all under one roof in BTM Layout.</>}
      >
        <BookButton program={P}>Book a session</BookButton>
        <a href="#plans" className="btn btn-ghost">View plans</a>
      </Hero>

      {/* ABOUT — larger image + floating stat chip + richer copy */}
      <section className="section ttac-about">
        <div className="wrap split">
          <div className="reveal">
            <div className="eyebrow">About the academy</div>
            <p className="lead" style={{ marginTop: 18 }}>
              A real coaching academy, not a recreation room. At PaanchaJanya Table Tennis Academy we coach <em>technique, footwork and the mental game</em>, and we track your progress the way a sport should.
            </p>
            <div className="prose">
              <p>From a child picking up their first paddle to players chasing district and state rankings, the academy runs a clear, level based pathway. Multiple match standard STAG tables, structured drills, regular match play, and coaching that is actually planned, session by session.</p>
              <p>Juniors and adults train in the same disciplined room, and our squads turn up at events like the Amateur Champions League team championship. Beginners are always welcome. We meet you at your level and build from there.</p>
            </div>
            <div className="ttac-points">
              <span>TTFI approved tables</span>
              <span>Video backed feedback</span>
              <span>Juniors and adults</span>
              <span>Tournament pathway</span>
            </div>
            <div style={{ marginTop: 30 }}>
              <BookButton program={P}>Book a trial session</BookButton>
            </div>
          </div>
          <div className="reveal d2 ttac-shot">
            <Shot disc="tt" img="/images/pytta/the-academy-floor.jpg" cap="Inside the PaanchaJanya Table Tennis Academy floor" />
            <div className="ttac-badge"><b>6</b><span>match tables</span></div>
          </div>
        </div>
      </section>

      {/* STAT BAND — animated count-up + rally graphic */}
      <section className="section ttac-stats">
        <div className="rally-bg" aria-hidden="true"><BounceField /></div>
        <div className="wrap">
          <div className="count-grid">
            <div className="count reveal"><div className="n" data-count="6">0</div><div className="l">Match-standard tables</div></div>
            <div className="count reveal d2"><div className="n" data-count="4">0</div><div className="l">Coaching levels</div></div>
            <div className="count reveal d3"><div className="n">ALL</div><div className="l">Ages, juniors to adults</div></div>
            <div className="count reveal d4"><div className="n">TTFI</div><div className="l">Approved tables</div></div>
          </div>
        </div>
      </section>

      {/* FACILITIES / WHY US */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Why train here</div><h2 className="display">Built for real players</h2><p>Everything is set up so that every session moves your game forward, whether you are here for fitness, fun or competition.</p></div>
          <div className="card-grid cols-3">
            {FACILITIES.map((f, i) => (
              <div className={"card tt-feature reveal" + (i % 3 === 1 ? " d2" : i % 3 === 2 ? " d3" : "")} key={f.title}>
                <span className="tt-ic"><FacilityIcon name={f.icon} /></span>
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATHWAY — enlarged level cards */}
      <section className="section ttac-levels">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Pathway</div><h2 className="display">Programs by level</h2><p>Every player is placed by skill, then moved up as they earn it. No guesswork, just a clear ladder to climb.</p></div>
          <div className="card-grid cols-4">
            {[["01", "Beginner", "Grip, stance and the core strokes. Build clean habits from day one."], ["02", "Intermediate", "Spin, placement and consistency under rally pressure."], ["03", "Advanced", "Tactics, footwork patterns, and serve and receive systems."], ["04", "Tournament Prep", "Match simulation, conditioning and competition strategy."]].map(([no, h, p], i) => (
              <div className={"card reveal" + (i === 1 ? " d2" : i === 2 ? " d3" : i === 3 ? " d4" : "")} key={h}>
                <span className="lv-no" aria-hidden="true">{no}</span>
                <span className="eyebrow">Level {no}</span>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="section" id="plans">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Membership</div><h2 className="display">Coaching plans</h2><p>Pick a plan and the booking form fills in the rest.</p></div>
          <div className="plans reveal d2">
            {plans.map((p) => (
              <PlanCard key={p.name} plan={p} program={P} />
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="section awards-section" id="awards">
        <div className="awards-bg" aria-hidden="true"><BounceField /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="awards-motif reveal" aria-hidden="true"><PaddlesBall /></div>
          <div className="sec-head reveal"><div className="eyebrow">Achievements</div><h2 className="display">Our players on the podium</h2><p>A wall of the trophies, medals and certificates our students keep bringing home.</p></div>
          <div className="award-gallery reveal d2">
            {["/images/pytta/awards/team-championship.jpg", "/images/pytta/awards/state-ranking-2024.jpg", "/images/pytta/awards/state-ranking-podium.jpg", "/images/pytta/awards/tournament-winner.jpg", "/images/pytta/awards/champions-cup.jpg", "/images/pytta/awards/trophy-day.jpg", "/images/pytta/awards/singles-winner.jpg"].map((img) => (
              <figure className="ag-item" key={img}>
                <img src={img} alt="PaanchaJanya Table Tennis Academy award" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — large, balanced photo wall (all real photos) */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Gallery</div><h2 className="display">Inside the academy</h2><p>From first serves to championship nights, this is where players train, compete and grow at PaanchaJanya Table Tennis Academy.</p></div>
          <div className="tt-wall reveal d2">
            {GALLERY.map((g, i) => (
              <figure className="g-tile reveal" style={{ transitionDelay: `${(i % 2) * 90}ms` }} key={g.img}>
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
            <details><summary>What age can my child start?<span className="pm">+</span></summary><div className="ans">We coach players from around age 6 upwards. Younger beginners join the junior development track with age appropriate sessions.</div></details>
            <details><summary>Do you provide bats and balls?<span className="pm">+</span></summary><div className="ans">Equipment is available for beginners. As players advance, coaches recommend a personal bat suited to your style.</div></details>
            <details><summary>Can adults join too?<span className="pm">+</span></summary><div className="ans">Yes. We run batches for adults at all levels, whether for fitness, recreation or competitive play.</div></details>
            <details><summary>Do you enter players in tournaments?<span className="pm">+</span></summary><div className="ans">We organise in house tournaments and support players entering district and state level events as they progress.</div></details>
          </div>
        </div>
      </section>

      {/* REVIEWS — full looping marquee of every review */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head mid reveal">
            <div className="eyebrow">From our players</div>
            <h2 className="display">What players say</h2>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "Archivo", fontWeight: 900, fontSize: "1.5rem", color: "var(--accent)" }}>{reviews.rating.toFixed(1)}</span>
              <Stars n={reviews.rating} />
              <span style={{ color: "var(--muted)", fontSize: ".84rem" }}>{reviews.count.toLocaleString("en-IN")} player reviews</span>
            </div>
          </div>
        </div>
        <ReviewMarquee items={reviews.items} />
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="hero-bg" aria-hidden="true"><div className="glow g1" style={{ opacity: 0.3 }} /></div>
        <div className="wrap" style={{ position: "relative" }}><div className="reveal"><div className="eyebrow">Join the academy</div><h2 className="display" style={{ marginTop: 14 }}>Pick up a paddle</h2><p className="sub">Book a session and let our coaches assess your level at PaanchaJanya Table Tennis Academy.</p><div className="cta-row"><BookButton program={P}>Book on WhatsApp</BookButton><a className="btn btn-ghost" href={`tel:${PHONES.pytta.tel}`}>Call {PHONES.pytta.display}</a></div></div></div>
      </section>
    </main>
  );
}
