export type Workshop = {
  title: string;
  blurb: string;
  date: string;        // human friendly, e.g. "Sat, 28 Jun"
  dateISO?: string;    // optional machine date for the countdown
  time: string;        // e.g. "7:30 to 9:00 AM"
  instructor: string;
  program: string;     // a PROGRAMS value (routes the WhatsApp lead)
  image?: string;      // poster URL (Drive direct link or /images/... path)
  registration?: string; // optional external registration link
  status: "featured" | "open" | "closed";
  order?: number;
};

export type Review = {
  name: string;
  initials?: string;
  program: string;
  rating: number;      // 1..5
  text: string;
  featured?: boolean;
};

export type Plan = {
  program: string;     // a PROGRAMS value (friendly aliases accepted in sheet)
  name: string;        // Plan Name, e.g. "Monthly"
  duration?: string;   // e.g. "1 Month", "6 Months"
  price: string;       // e.g. "₹2,800", "On enquiry"
  note?: string;       // optional sub note / "Best value"
  features: string[];  // pipe-separated in the sheet
  popular?: boolean;
  active?: boolean;
  order?: number;
};

export type KidsActivity = {
  name: string;
  ageGroup?: string;   // e.g. "5 to 14"
  timing?: string;     // e.g. "5:00 to 6:00 PM"
  price: string;       // e.g. "₹3,000/mo", "On enquiry"
  description?: string;
  image?: string;      // Drive direct link or /images/... path
  active?: boolean;
  order?: number;
};

export type Testimonial = {
  name: string;
  review: string;
  rating: number;      // 1..5
  photo?: string;
  program?: string;    // optional; blank shows everywhere
  active?: boolean;
};

export type ContactInfo = {
  academy: string;     // "General" for the shared/site row, or an academy/program name
  address?: string;
  phone?: string;
  whatsapp?: string;   // digits only, country code first
  email?: string;
  maps?: string;       // embeddable map src
  hours?: string;      // pipe-separated lines, e.g. "Mon to Fri 6 AM to 9 PM|Sat 7 to 9 AM"
  active?: boolean;
};
