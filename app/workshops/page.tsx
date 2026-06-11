import WorkshopsHero from "@/components/WorkshopsHero";
import WorkshopExplorer from "@/components/WorkshopExplorer";
import BookButton from "@/components/BookButton";
import Countdown from "@/components/Countdown";
import { getWorkshops, getFeaturedWorkshop } from "@/lib/sheets";

export const metadata = {
  title: "Workshops & Events | Paanchajanya Academy",
  description:
    "Workshops, camps and masterclasses across all four Paanchajanya academies in BTM Layout, Bengaluru. Updated regularly, open to members and first timers.",
};

const STEPS: { no: string; h: string; p: string }[] = [
  { no: "01", h: "Find a session", p: "Filter by academy and open any poster to read the full details." },
  { no: "02", h: "Register in seconds", p: "Tap register and we open WhatsApp with your spot request ready to send." },
  { no: "03", h: "Get confirmed", p: "We reply with your slot, what to bring and exactly where to go." },
  { no: "04", h: "Show up and enjoy", p: "Turn up a few minutes early, meet the coach, and dive in." },
];

export default async function WorkshopsPage() {
  const [all, featured] = await Promise.all([getWorkshops(), getFeaturedWorkshop()]);
  const upcoming = all.filter((w) => w.status !== "closed" && w.title !== featured?.title);

  return (
    <main className="wks">
      <WorkshopsHero />

      {featured && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head reveal"><div className="eyebrow">Featured</div><h2 className="display">This month&apos;s headline</h2><p>The session everyone is talking about. Registrations are open now.</p></div>
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
                {featured.registration ? (
                  <a className="btn btn-primary" href={featured.registration} target="_blank" rel="noopener">Register now</a>
                ) : (
                  <BookButton program={featured.program}>Register now</BookButton>
                )}
              </div>
              <Countdown dateISO={featured.dateISO} />
            </div>
          </div>
        </section>
      )}

      {/* ALL WORKSHOPS — filterable, big cards, poster lightbox */}
      <section className="section" id="all">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Coming up</div><h2 className="display">Browse every workshop</h2>
            <p>Filter by academy, open a poster to read it in full, register in a tap, or add the session straight to your calendar.</p>
          </div>
          <WorkshopExplorer items={upcoming} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section wks-how">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">How it works</div><h2 className="display">From poster to mat in four steps</h2><p>Booking a workshop takes about a minute. Here is the whole journey.</p></div>
          <div className="steps reveal d2">
            {STEPS.map((s) => (
              <div className="step" key={s.no}><div className="no">{s.no}</div><h4>{s.h}</h4><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="hero-bg" aria-hidden="true"><div className="glow g1" style={{ opacity: 0.3 }} /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="reveal">
            <div className="eyebrow">Do not miss out</div>
            <h2 className="display" style={{ marginTop: 14 }}>Save your spot</h2>
            <p className="sub">Workshops fill fast. Message us to register before they are full, or to hear about the next one first.</p>
            <div className="cta-row"><BookButton program="">Register on WhatsApp</BookButton></div>
          </div>
        </div>
      </section>
    </main>
  );
}
