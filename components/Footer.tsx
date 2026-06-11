import Link from "next/link";
import { SITE, PHONES } from "@/lib/site";
import { getPrimaryContact } from "@/lib/sheets";

const telHref = (s: string) => "tel:" + s.replace(/[^\d+]/g, "");

export default async function Footer() {
  const primary = await getPrimaryContact();
  const phone = primary.phone || PHONES.yoga.tel;
  const phoneText = primary.phone || PHONES.yoga.display;
  const addr = primary.address || SITE.addressShort;
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link className="brand" href="/">
              <span className="mark" aria-hidden="true" />
              <span className="foot-word"><b>PAANCHAJANYA</b>{" "}<small>ACADEMY</small></span>
            </Link>
            <p className="foot-note">
              One academy, four worlds, one roof. Yoga, combat sports, table tennis and kids
              programs, all under a single roof in BTM Layout 2nd Stage, Bilekahalli, Bengaluru.
            </p>
          </div>
          <div>
            <h5>Academies</h5>
            <Link href="/yoga">Paanchajanya Yoga</Link>
            <Link href="/champions">House of Champions</Link>
            <Link href="/pytta">Table Tennis (PYTTA)</Link>
            <Link href="/kids">Kids Academy</Link>
          </div>
          <div>
            <h5>Visit</h5>
            <Link href="/contact">Location &amp; hours</Link>
            <Link href="/workshops">Workshops &amp; events</Link>
            <a href={telHref(phone)}>{phoneText}</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; {new Date().getFullYear()} {SITE.name}</span>
          <span>{addr}</span>
        </div>
      </div>
    </footer>
  );
}
