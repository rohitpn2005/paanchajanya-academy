export const SITE = {
  name: "PaanchaJanya Academy",
  address:
    "Ranka Colony Rd, opposite Mantri Terrace, BTM Layout 2nd Stage, Bilekahalli, Bengaluru 560076",
  addressShort: "Ranka Colony Rd, BTM Layout 2nd Stage, Bengaluru 560076",
  mapEmbed:
    "https://maps.google.com/maps?q=Ranka%20Colony%20Road%20Mantri%20Terrace%20BTM%20Layout%202nd%20Stage%20Bilekahalli%20Bengaluru&z=16&output=embed",
  mapDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Ranka%20Colony%20Road%20opposite%20Mantri%20Terrace%20BTM%20Layout%202nd%20Stage%20Bilekahalli%20Bengaluru%20560076",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/yoga", label: "Yoga" },
  { href: "/champions", label: "Champions" },
  { href: "/pytta", label: "Table Tennis" },
  { href: "/kids", label: "Kids" },
  { href: "/workshops", label: "Workshops" },
  { href: "/contact", label: "Contact" },
];

// route -> body theme class (drives the accent colour)
export const THEME_BY_PATH: Record<string, string> = {
  "/": "theme-yoga",
  "/yoga": "theme-yoga",
  "/champions": "theme-champions",
  "/pytta": "theme-pytta",
  "/kids": "theme-kids",
  "/workshops": "theme-yoga",
  "/contact": "theme-yoga",
};

// WhatsApp / phone desks. For now every academy routes to one number; the
// owner can split these per academy later via the Contact sheet.
export const PHONES = {
  yoga: { label: "Front desk", display: "98804 22933", tel: "+919880422933" },
  champions: { label: "Front desk", display: "98804 22933", tel: "+919880422933" },
  pytta: { label: "Front desk", display: "98804 22933", tel: "+919880422933" },
};
