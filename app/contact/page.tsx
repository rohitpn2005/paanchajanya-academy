import ContactHero from "@/components/ContactHero";
import BookButton from "@/components/BookButton";
import ContactForm from "@/components/ContactForm";
import { SITE, PHONES } from "@/lib/site";
import { getPrimaryContact, getContacts } from "@/lib/sheets";

export const metadata = {
  title: "Contact | Paanchajanya Academy",
  description: "One location in BTM Layout 2nd Stage, Bilekahalli, Bengaluru 560076. Call, message or drop in.",
};

const telHref = (s: string) => "tel:" + s.replace(/[^\d+]/g, "");
const waHref = (digits: string) =>
  `https://wa.me/${digits}?text=${encodeURIComponent("Hello Paanchajanya Academy, I would like to know more.")}`;

const SHORT: Record<string, string> = {
  "Paanchajanya Yoga": "Yoga",
  "House of Champions": "Champions",
  "Table Tennis (PYTTA)": "Table Tennis",
  "Kids Activities": "Kids",
};

function Ic({ name }: { name: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "wa": return (<svg viewBox="0 0 24 24" {...c}><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5z" /><path d="M8.5 9c0 4 2.5 6.5 6.5 6.5 .6 0 1-.5 1-1l-1.6-1-1 1c-1.4-.5-2.4-1.5-2.9-2.9l1-1-1-1.6c-.5 0-1 .4-1 1z" /></svg>);
    case "phone": return (<svg viewBox="0 0 24 24" {...c}><path d="M5 3h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>);
    case "mail": return (<svg viewBox="0 0 24 24" {...c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></svg>);
    case "pin": return (<svg viewBox="0 0 24 24" {...c}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
    case "clock": return (<svg viewBox="0 0 24 24" {...c}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    default: return null;
  }
}

export default async function ContactPage() {
  const [primary, contacts] = await Promise.all([getPrimaryContact(), getContacts()]);

  const address = primary.address || SITE.address;
  const mapEmbed = primary.maps || SITE.mapEmbed;
  const tel = primary.phone || PHONES.yoga.tel;
  const waDigits = primary.whatsapp || tel.replace(/\D/g, "");
  const email = primary.email;

  const hours = (primary.hours || "").split("|").map((s) => s.trim()).filter(Boolean);
  const hoursList = hours.length
    ? hours
    : ["Mon to Fri  6:00 AM to 9:00 PM", "Saturday  7:00 to 9:00 AM", "Sunday  by appointment"];

  // Per academy desks only appear when the owner has set more than one number.
  const desks = contacts.filter((c) => c.whatsapp && !/general|paanchajanya academy/i.test(c.academy));
  const uniqueNums = Array.from(new Set(desks.map((d) => d.whatsapp)));
  const showDesks = uniqueNums.length > 1;

  return (
    <main className="ct">
      <ContactHero tel={tel} whatsapp={waDigits} directions={SITE.mapDirections} />

      {/* INFO + MAP */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">Find us</div><h2 className="display">One location, one roof</h2><p>Everything runs from a single building. Yoga, House of Champions, Table Tennis and the Kids academy all share the same address.</p></div>
          <div className="ct-grid reveal d2">
            <div className="ct-info">
              <a className="ct-row" href={waHref(waDigits)} target="_blank" rel="noopener">
                <span className="ct-ic"><Ic name="wa" /></span>
                <span className="ct-text"><span className="ct-lbl">WhatsApp</span><b>{tel}</b></span>
                <span className="ct-go" aria-hidden="true">&rarr;</span>
              </a>
              <a className="ct-row" href={telHref(tel)}>
                <span className="ct-ic"><Ic name="phone" /></span>
                <span className="ct-text"><span className="ct-lbl">Call</span><b>{tel}</b></span>
                <span className="ct-go" aria-hidden="true">&rarr;</span>
              </a>
              {email ? (
                <a className="ct-row" href={`mailto:${email}`}>
                  <span className="ct-ic"><Ic name="mail" /></span>
                  <span className="ct-text"><span className="ct-lbl">Email</span><b>{email}</b></span>
                  <span className="ct-go" aria-hidden="true">&rarr;</span>
                </a>
              ) : null}
              <a className="ct-row" href={SITE.mapDirections} target="_blank" rel="noopener">
                <span className="ct-ic"><Ic name="pin" /></span>
                <span className="ct-text"><span className="ct-lbl">Address</span><b>{address}</b></span>
                <span className="ct-go" aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="ct-map">
              <iframe title="Map to Paanchajanya Academy" loading="lazy" src={mapEmbed} />
              <a className="btn btn-primary ct-map-btn" target="_blank" rel="noopener" href={SITE.mapDirections}>Get directions</a>
            </div>
          </div>
        </div>
      </section>

      {/* HOURS */}
      <section className="section ct-hours-sec">
        <div className="wrap">
          <div className="sec-head reveal"><div className="eyebrow">When we are open</div><h2 className="display">Opening hours</h2><p>Batch timings are confirmed when you book. Drop in during these windows or message us any time.</p></div>
          <div className="ct-hours reveal d2">
            {hoursList.map((line) => (
              <div className="ct-hour" key={line}>
                <span className="ct-ic"><Ic name="clock" /></span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER ACADEMY DESKS — only when owner has set distinct numbers */}
      {showDesks ? (
        <section className="section">
          <div className="wrap">
            <div className="sec-head reveal"><div className="eyebrow">Direct desks</div><h2 className="display">Reach an academy directly</h2><p>Each academy has its own desk. Booking from an academy page routes straight to that team.</p></div>
            <div className="ct-desks reveal d2">
              {desks.map((d) => (
                <a className="ct-desk" key={d.academy} href={waHref(d.whatsapp as string)} target="_blank" rel="noopener">
                  <span className="ct-lbl">{SHORT[d.academy] || d.academy}</span>
                  <b>{d.phone || d.whatsapp}</b>
                  <span className="ct-go" aria-hidden="true">Message &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* MESSAGE FORM */}
      <section className="section" id="form">
        <div className="wrap split">
          <div className="reveal">
            <div className="eyebrow">Say hello</div>
            <h2 className="display" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", marginTop: 14 }}>Send us a message</h2>
            <p className="prose" style={{ color: "var(--muted)", marginTop: 16 }}>Choose a program and we open WhatsApp with your message ready to send. It reaches the desk that runs that academy. Prefer to talk? Call <a href={telHref(tel)} style={{ color: "var(--accent)" }}>{tel}</a>.</p>
            <div className="taglist"><span>Replies within the hour</span><span>Flexible plans</span><span>Beginners welcome</span></div>
            <div style={{ marginTop: 26 }}><BookButton program="">Quick book on WhatsApp</BookButton></div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
