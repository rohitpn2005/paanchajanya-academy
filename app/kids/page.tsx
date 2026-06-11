import KidsHero from "@/components/KidsHero";
import KidsPrograms from "@/components/KidsPrograms";
import KidsGallery, { type GalleryItem } from "@/components/KidsGallery";
import BookButton from "@/components/BookButton";
import ReviewMarquee from "@/components/ReviewMarquee";
import { Stars } from "@/components/Reviews";
import { getKidsActivities } from "@/lib/sheets";
import { getTestimonialSet } from "@/lib/reviews";
import { PHONES } from "@/lib/site";

export const metadata = {
  title: "Kids | PaanchaJanya Academy",
  description: "Dance, karate, chess, yoga and table tennis for kids in BTM Layout, Bengaluru. Age grouped batches, real coaching, a safe space to grow.",
};

const P = "Kids Activities";

const GALLERY: GalleryItem[] = [
  { img: "/images/kids/gallery/g01.jpg", cap: "Chess academy" },
  { img: "/images/kids/gallery/g02.jpg", cap: "Finding the split" },
  { img: "/images/kids/gallery/g03.jpg", cap: "Strong stance" },
  { img: "/images/kids/gallery/g04.jpg", cap: "Paddles up" },
  { img: "/images/kids/gallery/g05.jpg", cap: "Stage lights" },
  { img: "/images/kids/gallery/g06.jpg", cap: "Up in the silks" },
  { img: "/images/kids/gallery/g07.jpg", cap: "Eyes on the board" },
  { img: "/images/kids/gallery/g08.jpg", cap: "Bridge together" },
  { img: "/images/kids/gallery/g09.jpg", cap: "Belt line up" },
  { img: "/images/kids/gallery/g10.jpg", cap: "Candlelit stillness" },
  { img: "/images/kids/gallery/g11.jpg", cap: "Dance crew" },
  { img: "/images/kids/gallery/g12.jpg", cap: "Balance and breath" },
  { img: "/images/kids/gallery/g13.jpg", cap: "On the mats" },
  { img: "/images/kids/gallery/g14.jpg", cap: "Wheel pose" },
  { img: "/images/kids/gallery/g15.jpg", cap: "Center stage" },
  { img: "/images/kids/gallery/g16.jpg", cap: "Standing bow" },
];

const BENEFITS: [string, string][] = [
  ["Confidence", "Kids who try, fall short, and try again, and grow visibly from it."],
  ["Focus", "Discipline on the mat and the board that carries into the classroom."],
  ["Friendships", "A safe, supervised space where every child belongs to a team."],
  ["Real progress", "Belts, levels and tournaments. Milestones a child can see and feel."],
];

const STEPS: [string, string, string][] = [
  ["01", "Pick an activity", "Browse the programs and pick what fits your child."],
  ["02", "Book a trial", "Tap book on any activity and we open WhatsApp with your request ready."],
  ["03", "Meet the coach", "Bring your child in, watch a session, and ask anything you need to."],
  ["04", "Join a batch", "We place your child in the right age group and you are set for the term."],
];

export default async function KidsPage() {
  const [activities, reviews] = await Promise.all([getKidsActivities(), getTestimonialSet("kids")]);

  return (
    <main className="kids">
      <KidsHero />

      {/* PROGRAMS */}
      <section className="section" id="programs">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Programs</div><h2 className="display">Pick an activity</h2><p>Every activity runs in small, age grouped batches. Pick one and book a place in a couple of taps.</p></div>
          <KidsPrograms activities={activities} />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section kids-why">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Why parents choose us</div><h2 className="display">More than an activity</h2><p>Children leave with skills, but also with the habits that make the skills last.</p></div>
          <div className="kid-benefits reveal d2">
            {BENEFITS.map(([h, p], i) => (
              <div className="kid-benefit" key={h}><span className="kid-bn">{String(i + 1).padStart(2, "0")}</span><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW ENROLMENT WORKS */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">How enrolment works</div><h2 className="display">From first look to first class</h2><p>Four simple steps and your child is training with us.</p></div>
          <div className="steps reveal d2">
            {STEPS.map(([no, h, p]) => (
              <div className="step" key={no}><div className="no">{no}</div><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — mixed masonry, all activities together */}
      <section className="section kids-gallery-sec">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Moments</div><h2 className="display">Kids in action</h2><p>Every activity, all in one place. Tap any photo to see it full size.</p></div>
          <KidsGallery items={GALLERY} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head mid reveal"><div className="eyebrow">Parent questions</div><h2 className="display">Good to know</h2></div>
          <div className="faq reveal d2">
            <details><summary>What is the right age to start?<span className="pm">+</span></summary><div className="ans">Most programs welcome children from age four to six. Each activity runs age grouped batches, so kids train alongside peers at a similar stage.</div></details>
            <details><summary>Can my child try before enrolling?<span className="pm">+</span></summary><div className="ans">Yes. Tap book on any activity and we will set up a trial, so your child can see if they enjoy it before you commit.</div></details>
            <details><summary>Are sessions supervised and safe?<span className="pm">+</span></summary><div className="ans">Always. Coaches are present throughout, batch sizes are kept small, and the space is set up for young learners.</div></details>
            <details><summary>Can my child do more than one activity?<span className="pm">+</span></summary><div className="ans">Many do, for example chess on weekends and dance on weekdays. We will help you build a weekly schedule that fits around school.</div></details>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head mid reveal">
            <div className="eyebrow">From our parents</div>
            <h2 className="display">What parents say</h2>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "Archivo", fontWeight: 900, fontSize: "1.5rem", color: "var(--accent)" }}>{reviews.rating.toFixed(1)}</span>
              <Stars n={reviews.rating} />
              <span style={{ color: "var(--muted)", fontSize: ".84rem" }}>{reviews.count.toLocaleString("en-IN")} parent reviews</span>
            </div>
          </div>
        </div>
        <ReviewMarquee items={reviews.items} />
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="hero-bg" aria-hidden="true"><div className="glow g1" style={{ opacity: 0.3 }} /></div>
        <div className="wrap" style={{ position: "relative" }}><div className="reveal"><div className="eyebrow">Enrol today</div><h2 className="display" style={{ marginTop: 14 }}>Give them a place to grow</h2><p className="sub">Book any activity and we will find the right batch for your child.</p><div className="cta-row"><BookButton program={P}>Enrol on WhatsApp</BookButton><a className="btn btn-ghost" href={`tel:${PHONES.yoga.tel}`}>Call {PHONES.yoga.display}</a></div></div></div>
      </section>
    </main>
  );
}
