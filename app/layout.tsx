import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LeadProvider from "@/components/LeadProvider";
import SiteScripts from "@/components/SiteScripts";
import ScrollFX from "@/components/ScrollFX";
import Backdrop from "@/components/Backdrop";
import CursorSpirits from "@/components/CursorSpirits";
import FloatingActions from "@/components/FloatingActions";
import Loader from "@/components/Loader";
import { getPlansMap, getWhatsAppMap, getPlans, getPrimaryContact, getKidsActivities } from "@/lib/sheets";

export const metadata: Metadata = {
  metadataBase: new URL("https://paanchajanyaacademy.in"),
  title: "Paanchajanya Academy | Train. Learn. Compete. Transform.",
  description:
    "One academy, four worlds. Yoga, combat sports, table tennis and kids programs under one roof in BTM Layout, Bengaluru.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://paanchajanyaacademy.in",
    siteName: "Paanchajanya Academy",
    title: "Paanchajanya Academy | Train. Learn. Compete. Transform.",
    description:
      "Yoga, House of Champions (MMA), Table Tennis and Kids — one academy in BTM Layout 2nd Stage, Bengaluru.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Paanchajanya Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paanchajanya Academy",
    description: "Yoga, MMA, Table Tennis and Kids — one academy in BTM Layout, Bengaluru.",
    images: ["/og.jpg"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const plans = await getPlansMap();
  const nums = await getWhatsAppMap();
  const [planList, contact, kids] = await Promise.all([getPlans(), getPrimaryContact(), getKidsActivities()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Paanchajanya Academy",
    description:
      "Yoga, House of Champions (MMA), Table Tennis (PYTTA) and Kids activities under one roof in BTM Layout 2nd Stage, Bengaluru.",
    url: "https://paanchajanyaacademy.in",
    telephone: "+919880422933",
    image: "https://paanchajanyaacademy.in/og.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ranka Colony Rd, opposite Mantri Terrace, Bilekahalli",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560076",
      addressCountry: "IN",
    },
    areaServed: "Bengaluru",
  };
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,800;0,900;1,800&family=Baloo+2:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="theme-yoga" suppressHydrationWarning>
        <Loader />
        <Backdrop />
        <CursorSpirits />
        <LeadProvider plans={plans} nums={nums}>
          <Nav />
          <SiteScripts />
          <ScrollFX />
          {children}
          <FloatingActions plans={planList} hours={contact.hours || undefined} address={contact.address || undefined} kids={kids} />
          <Footer />
        </LeadProvider>
      </body>
    </html>
  );
}
