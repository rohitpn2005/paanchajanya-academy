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
  title: "Paanchajanya Academy | Train. Learn. Compete. Transform.",
  description:
    "One academy, four worlds. Yoga, combat sports, table tennis and kids programs under one roof in BTM Layout, Bengaluru.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const plans = await getPlansMap();
  const nums = await getWhatsAppMap();
  const [planList, contact, kids] = await Promise.all([getPlans(), getPrimaryContact(), getKidsActivities()]);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,800;0,900;1,800&family=Baloo+2:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
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
