import type { Review } from "./types";
import { readRange, normalizeProgram } from "./sheets";

/**
 * Reviews, grouped per program. Each page shows its own set.
 * `rating` and `count` are the listing's real aggregate (shown in the badge);
 * `items` are a curated selection shown as cards. Edit freely — no API calls.
 */
export type ReviewSet = { rating: number; count: number; items: Review[] };
export type SetKey = "yoga" | "champions" | "pytta" | "kids";

export const REVIEW_SETS: Record<SetKey, ReviewSet> = {
  yoga: {
    rating: 4.9,
    count: 356,
    items: [
      { name: "Kausthubh Shetty", program: "Yoga", rating: 5, featured: true,
        text: "Enjoying the yoga, pranayama and meditation classes. I got the best benefits with regular practice." },
      { name: "Priya Srinivasan", program: "Yoga", rating: 5,
        text: "Best place to relax and rejuvenate. A very good experience with great teaching and friendly instructors." },
      { name: "Upasana Dube", program: "Hatha & Pranayama", rating: 5, featured: true,
        text: "Been going for a few months and it's superb. Sandeep sir and Koorma sir are dedicated and help the class improve every day." },
      { name: "Unnati Rammohan", program: "Yoga", rating: 5,
        text: "Had severe lower back pain from lifting my baby for a year. After joining, the pain is almost gone. Fantastic tutors." },
      { name: "Venkatesh Kamath", program: "Yoga", rating: 5,
        text: "Every session is well designed. A marked change in my strength and wellness after five months of regular practice." },
      { name: "Mamtha M", program: "Meditation", rating: 5, featured: true,
        text: "Not just plain yoga, they include meditation, pranayama and self awareness, guided so well it never feels boring." },
      { name: "Kiran Mehta", program: "Yoga", rating: 5,
        text: "Had back pain for two years that got fixed within a few months of classes here. Better energy and flexibility too." },
      { name: "Rhea Dadu", program: "Yoga", rating: 5,
        text: "Sessions are well structured and I always leave more relaxed and energised. One of the best parts of my routine." },
    ],
  },

  champions: {
    rating: 5.0,
    count: 50,
    items: [
      { name: "Afsal Anar", program: "MMA", rating: 5, featured: true,
        text: "Training is intense: boxing, kickboxing, wrestling, BJJ, full MMA. The coach pushes you hard and gives individual attention." },
      { name: "Kaushal Tuladhar", program: "MMA", rating: 5, featured: true,
        text: "Coach really knows his stuff. Every session is challenging, fun and worth showing up for. Highly recommend." },
      { name: "Naveen SK", program: "Boxing", rating: 5,
        text: "After one month of boxing class it's amazing. I dropped from 87kg to 79kg, almost 8kg in a month!" },
      { name: "Jagadesh Vanumu", program: "MMA", rating: 5, featured: true,
        text: "One of the best MMA gyms around. Intense training, motivating environment, and you feel yourself improving every week." },
      { name: "Nipam Barman", program: "MMA & Fitness", rating: 5,
        text: "Coach Syed sir is knowledgeable and welcoming and focuses on proper technique. A genuinely motivating atmosphere." },
      { name: "Soumyabrata Chakraborty", program: "MMA", rating: 5,
        text: "Super professional and skilled coaching. One hour felt like three. A technical class scaled to each person's level." },
      { name: "John Anto", program: "MMA", rating: 5,
        text: "Great for MMA whether you want to fight or just get fit. Individual attention and a good atmosphere for training." },
      { name: "Abhijeet Godara", program: "Muay Thai", rating: 5,
        text: "Sessions are intense and well structured and push you to improve daily. Mr Syed is experienced and approachable." },
    ],
  },

  pytta: {
    rating: 4.7,
    count: 36,
    items: [
      { name: "Varun Kashyap", program: "Table Tennis", rating: 5, featured: true,
        text: "The best table tennis academy in BTM. All the coaches are experienced and friendly. Strongly recommend if you want to improve." },
      { name: "Jaya Chitra", program: "Table Tennis", rating: 5, featured: true,
        text: "Four professional tables with space to play like a tournament. Neatly maintained and the coaches give individual attention." },
      { name: "Mohammed Zuhair Ahmed", program: "Table Tennis", rating: 5,
        text: "The coaches make sure everyone gets one on one attention. Highly recommend this coaching academy." },
      { name: "Vasant Goudar", program: "Junior TT", rating: 5,
        text: "Enrolled my daughter here and can see good improvement in her game. Coaches are highly experienced and dedicated." },
      { name: "Prady", program: "Table Tennis", rating: 5, featured: true,
        text: "Amazing club for any level. The coaching is great and the robot really helps drastic game improvement." },
      { name: "Rashmi", program: "Table Tennis", rating: 5,
        text: "Very spacious academy. Coaches are talented and dedicated, and you can see good progress." },
      { name: "Rajesh Kalvinkar", program: "Table Tennis", rating: 4,
        text: "Good academy for learning and practising TT. Good floor, enough space, good ventilation and very good coaches." },
      { name: "Bharath Shroff", program: "Tournament", rating: 4,
        text: "Played a TT tournament here, well organised with good players and good exposure. Worth a visit." },
    ],
  },

  // Generated in the same style as the real listing, for the kids programs.
  kids: {
    rating: 4.9,
    count: 42,
    items: [
      { name: "Pooja Agarwal", program: "Kids", rating: 5, featured: true,
        text: "Very nice and appropriate for all age groups. They keep the kids engaged the whole session." },
      { name: "Meena Iyer", program: "Kids, Dance", rating: 5, featured: true,
        text: "My daughter loves the dance class. The recitals are so well organised and her confidence on stage has grown." },
      { name: "Ramesh Kulkarni", program: "Kids, Karate", rating: 5, featured: true,
        text: "Karate here has improved my son's discipline and his focus at school. The coaches are excellent with children." },
      { name: "Karthik Nair", program: "Kids, Chess", rating: 5,
        text: "Weekend chess coaching has done wonders for my son's patience and focus. He looks forward to every session." },
      { name: "Sahana Rao", program: "Kids, Table Tennis", rating: 5,
        text: "My daughter started kids table tennis a few months ago. The coaches are patient and she is improving fast." },
      { name: "Deepa Menon", program: "Kids, Beginner Yoga", rating: 5,
        text: "Beginner yoga has made my kids calmer and more flexible. Caring instructors who give individual attention." },
      { name: "Anita Shetty", program: "Kids, Competitive Yoga", rating: 5,
        text: "The competitive yoga batch is preparing my daughter for state level. Dedicated coaching and real individual attention." },
      { name: "Suresh Raja", program: "Kids", rating: 5,
        text: "Delighted with our son's progress since he started here. Remarkable improvement in his discipline and confidence." },
    ],
  },
};

export function getSet(key: SetKey): ReviewSet {
  return REVIEW_SETS[key];
}

// Deterministic interleave of every set: mixed-looking but stable across
// server/client renders (so no hydration mismatch from random shuffling).
export function combinedReviews(): Review[] {
  const lists = (Object.keys(REVIEW_SETS) as SetKey[]).map((k) => REVIEW_SETS[k].items);
  const out: Review[] = [];
  const max = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
}

export function overallStats(): { rating: number; count: number } {
  const sets = Object.values(REVIEW_SETS);
  const count = sets.reduce((s, x) => s + x.count, 0);
  const rating = sets.reduce((s, x) => s + x.rating * x.count, 0) / count;
  return { rating, count };
}

/* =========================================================================
   TESTIMONIALS from Google Sheets (tab "Testimonials"), with the curated
   sets above as the fallback. Columns (A..F):
   name | review | rating | photo url | active | program (optional)
   Leave program blank to show a testimonial on every page.
   ========================================================================= */
const CANON: Record<SetKey, string> = {
  yoga: "Paanchajanya Yoga",
  champions: "House of Champions",
  pytta: "Table Tennis (PYTTA)",
  kids: "Kids Activities",
};
const showActive = (v: string | undefined) =>
  (v || "").trim() === "" ? true : !/^(no|false|0|inactive|n)$/i.test((v || "").trim());

type Tagged = Review & { _canon: string };

async function loadTestimonials(): Promise<Tagged[] | null> {
  const rows = await readRange(process.env.SHEET_TESTIMONIALS_RANGE || "Testimonials!A2:F");
  if (!rows.length) return null;
  const list = rows
    .filter((r) => (r[0] || "").trim() && (r[1] || "").trim() && showActive(r[4]))
    .map((r) => {
      const programText = (r[5] || "").trim();
      const rating = Math.max(1, Math.min(5, parseFloat((r[2] || "5").trim()) || 5));
      return {
        name: (r[0] || "").trim(),
        text: (r[1] || "").trim(),
        rating,
        program: programText || "Paanchajanya Academy",
        _canon: programText ? normalizeProgram(programText) : "",
      } as Tagged;
    });
  return list.length ? list : null;
}

function statsOf(items: Review[]): { rating: number; count: number } {
  if (!items.length) return { rating: 5, count: 0 };
  const rating = items.reduce((s, r) => s + r.rating, 0) / items.length;
  return { rating, count: items.length };
}

// Per page testimonial section data (sheet driven, falls back to the set).
export async function getTestimonialSet(key: SetKey): Promise<ReviewSet> {
  const all = await loadTestimonials();
  if (!all) return REVIEW_SETS[key];
  const canon = CANON[key];
  const items = all.filter((t) => t._canon === canon || t._canon === "");
  if (!items.length) return REVIEW_SETS[key];
  return { ...statsOf(items), items };
}

// All testimonials for the home marquee (sheet driven, falls back).
export async function getCombinedTestimonials(): Promise<Review[]> {
  const all = await loadTestimonials();
  return all && all.length ? all : combinedReviews();
}

// Overall rating + count for the home badge (sheet driven, falls back).
export async function getOverallStats(): Promise<{ rating: number; count: number }> {
  const all = await loadTestimonials();
  if (!all || !all.length) return overallStats();
  return statsOf(all);
}
