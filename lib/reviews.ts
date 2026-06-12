import type { Review } from "./types";

/**
 * Reviews, grouped per program. Each page shows its own set.
 * Hard-coded here (no Google Sheet / API calls). Edit freely.
 * `rating` and `count` are the listing's aggregate shown in the badge;
 * `items` are the curated cards shown in the testimonial section.
 */
export type ReviewSet = { rating: number; count: number; items: Review[] };
export type SetKey = "yoga" | "champions" | "pytta" | "kids";

export const REVIEW_SETS: Record<SetKey, ReviewSet> = {
  yoga: {
    rating: 4.9,
    count: 356,
    items: [
      { name: "Rinku Datta", program: "Yoga", rating: 5, featured: true,
        text: "I've been attending Paanchajanya yoga for over four months and it has been truly enriching. The instructors are knowledgeable and experienced, making each session engaging and effective." },
      { name: "Shubha Mallik", program: "Yoga", rating: 5, featured: true,
        text: "Paanchajanya yoga is amazing. I always feel refreshed after each session. The instructor is knowledgeable, offers modifications and ensures everyone feels comfortable." },
      { name: "Mamtha M", program: "Meditation", rating: 5, featured: true,
        text: "Not just plain yoga, they include meditation, pranayama and self awareness. Meditation doesn't feel boring at all, they guide it so well." },
      { name: "Gaurav Chadha", program: "Yoga", rating: 5,
        text: "One of the best yoga centres. I've been going for over a year and it has benefited me in many ways. Instructors are well qualified and correct every posture." },
      { name: "Hemamurthy Narayan", program: "Yoga", rating: 5,
        text: "Well planned workouts for each day. Trainer Koorma's techniques and posture correction are encouraging, and I got very good results in flexibility and weight loss." },
      { name: "Mohinder Sawhney", program: "Yoga", rating: 5, featured: true,
        text: "An excellent place to learn and practice yoga. Koorma sir and Sandeep sir are exceptional, knowledgeable, attentive and inspiring." },
      { name: "Unnati Rammohan", program: "Yoga", rating: 5,
        text: "I had severe lower back pain for a year after lifting my baby. After joining, the pain is almost gone. Fantastic tutors and so therapeutic." },
      { name: "Kiran Mehta", program: "Yoga", rating: 5,
        text: "I had back pain for two years that got fixed within a few months of classes here. Better energy and flexibility too." },
      { name: "N Prabhu", program: "Yoga", rating: 5,
        text: "The instructors are knowledgeable, patient and dedicated. Classes are well structured with a good mix of asanas, breathing techniques and meditation." },
      { name: "Vivek Kapoor", program: "Yoga", rating: 5,
        text: "The best yoga center in our surroundings. The teachers are professional and friendly, and you won't realise how an hour passes." },
      { name: "Tarun Rathi", program: "Yoga", rating: 5, featured: true,
        text: "Best yoga centre in BTM Layout. Extremely motivating instructors who keep the class fun and engaging." },
      { name: "Pastel by Vishakha", program: "Yoga", rating: 5,
        text: "After months of hearing my husband rave about Paanchajanya, I finally joined and wish I had sooner. The personal attention in a group class is incredible." },
      { name: "Swati Bagewadi", program: "Yoga", rating: 5,
        text: "A wonderful place to learn and practice yoga. Koorma sir teaches with great patience, dedication and positivity. Highly recommended!" },
      { name: "Rhea Dadu", program: "Yoga", rating: 5,
        text: "The sessions are well structured and I always leave more relaxed and energised. It's become one of the best parts of my routine." },
      { name: "Drithi Shetty", program: "Yoga", rating: 5,
        text: "The studio is well equipped and the teacher is excellent. They help you push beyond your limitations with the right props and methods." },
      { name: "Sudha Acharya", program: "Yoga", rating: 5,
        text: "The transformation in my flexibility, strength and mindset has been incredible. The instructor is knowledgeable, patient and gives personal attention." },
      { name: "Nishmitha Salian", program: "Yoga", rating: 5,
        text: "After about four months I completely got rid of my neck pain and can feel a substantial difference in my physical health." },
      { name: "Vinay S", program: "Yoga", rating: 5,
        text: "A wonderful experience. The sessions combine strength, flexibility and mindfulness, and the studio is clean with a calming atmosphere." },
      { name: "Vasavi Rayi", program: "Yoga", rating: 5,
        text: "Truly the best. I experienced yoga in a whole new perspective, never a boring session. The instructor helps you push your limits." },
      { name: "Olisa Pal", program: "Yoga", rating: 5,
        text: "I have never enjoyed a workout so much. Koorma makes classes really fun and I've seen considerable improvement in my wellbeing." },
      { name: "Shreya Majumder", program: "Yoga", rating: 5,
        text: "A perfect place for yoga and meditation. The teachers give individual attention to your strengths and weaknesses across different forms of yoga." },
      { name: "Sudhir Boury", program: "Yoga", rating: 5,
        text: "The entire team deserves to be commended for their commitment. Their dedication shows in the varied programme and the individual attention." },
      { name: "Deepak Kumar", program: "Yoga", rating: 5,
        text: "Excellent place to maximise the benefits of yoga. Both coaches are doing great, and the infrastructure and location are great too." },
      { name: "Arshpreet Singh", program: "Yoga", rating: 5,
        text: "My experience has been transformative. The classes offer captivating poses and activities that keep me enthusiastic about my practice." },
      { name: "Pranita Pawaskar", program: "Yoga", rating: 5,
        text: "A fantastic experience. The instructor is knowledgeable and attentive, balancing challenging poses with relaxation and offering modifications for every level." },
      { name: "Venkatesh Kamath", program: "Yoga", rating: 5,
        text: "Every session is well thought through. I've seen a marked change in my strength and wellness over five months of regular practice." },
      { name: "Upasana Dube", program: "Yoga", rating: 5,
        text: "Been going for a few months and it's just superb. Sandeep sir and Koorma sir are dedicated and help the class do better every day." },
      { name: "Amrita Ravindranath", program: "Meditation", rating: 5,
        text: "Sandeep ji is an amazing teacher. He takes time to clear any doubts and the meditation has helped me greatly." },
      { name: "Vs Nandhinni", program: "Yoga", rating: 5,
        text: "Superb yogashala in the Bilekahalli area. Sandeep sir's classes are the best." },
      { name: "Surbhi Varma", program: "Yoga", rating: 5,
        text: "I was sceptical as a gym person of ten years, but joining here changed my mind. They truly strive for excellence." },
    ],
  },

  champions: {
    rating: 5.0,
    count: 52,
    items: [
      { name: "Jagadesh Vanumu", program: "MMA", rating: 5, featured: true,
        text: "One of the best MMA gyms around. Intense training, a motivating environment, and you feel yourself improving every week with safe, correct technique." },
      { name: "Allen Lobo", program: "MMA", rating: 5, featured: true,
        text: "This gym is the real deal. Master Syed is a true martial artist with ten real years of fighting experience. Real boxing, wrestling, jujutsu and kickboxing." },
      { name: "Nipam Barman", program: "MMA", rating: 5,
        text: "One of the best experiences so far. Coach Syed sir is knowledgeable, welcoming and focuses on proper technique, with a motivating atmosphere." },
      { name: "Abhijeet Godara", program: "Muay Thai", rating: 5,
        text: "Sessions are intense, well structured and push you to improve every day. Mr Syed is highly experienced, approachable and supportive." },
      { name: "Jayalakshmi C", program: "MMA", rating: 5,
        text: "A great gym to train at. The coaches are some of the best fighters in Bangalore and very supportive. The atmosphere is competitive yet friendly." },
      { name: "Vignesh Shakthi", program: "MMA", rating: 5, featured: true,
        text: "Loving my experience under Master Syed's guidance. The training is top notch and super motivating. Significant improvement in my skills and fitness." },
      { name: "Soumyabrata Chakraborty", program: "MMA", rating: 5,
        text: "Super professional and skilled coaching. One hour felt like three, a technical class scaled to each person's level. Must recommend for every level." },
      { name: "Naveen SK", program: "Boxing", rating: 5, featured: true,
        text: "After one month of boxing it's amazing, I dropped from 87kg to 79kg, almost 8kg in a month!" },
      { name: "Kumar Kolhe", program: "MMA", rating: 5,
        text: "The class is magical. From a lazy IT guy I got serious about fitness. The trainer is friendly and extremely knowledgeable." },
      { name: "Afsal Anar", program: "MMA", rating: 5, featured: true,
        text: "Training is intense: boxing, kickboxing, wrestling, BJJ, full MMA. The coach pushes you hard and gives individual attention. The community is genuinely motivated." },
      { name: "John Anto", program: "MMA", rating: 5,
        text: "Great for MMA whether you want to fight or just get fit. The coach gives individual attention and creates a good atmosphere. Can't recommend it enough." },
      { name: "Kaushal Tuladhar", program: "MMA", rating: 5,
        text: "Coach really knows his stuff. Every session is challenging, fun and worth showing up for. Highly recommend." },
      { name: "Twinkle Batra", program: "MMA", rating: 5,
        text: "My experience has been amazing and the coach is highly experienced. Very knowledgeable with a warm, welcoming nature." },
      { name: "Nilesh Badak", program: "MMA & Fitness", rating: 5,
        text: "This place completely transformed my daily routine. In one month I saw huge improvements in fitness and energy. Can't recommend it enough." },
      { name: "Pratheesh Rk", program: "MMA", rating: 5,
        text: "House of Champions MMA is electrifying. World class coaching, intense training and unbeatable energy." },
      { name: "Sudeer Varikuti", program: "MMA", rating: 5,
        text: "A great place to start your fitness journey with advanced coaching. Training with Coach Syed pushes your limits with attention to detail." },
      { name: "Indranil Acharyya", program: "Muay Thai", rating: 5,
        text: "Very effective and precise training for MMA and Muay Thai." },
      { name: "Mohammad Subhan", program: "MMA", rating: 5,
        text: "Highly impressed with the training. Best place for beginners and professionals, and the coaches are very friendly." },
      { name: "Vinod Shetty", program: "MMA", rating: 5,
        text: "Newly opened MMA gym in Bilekahalli. Trainer Syed sir's teaching technique is amazing. Must try." },
      { name: "Dishani Basu", program: "MMA", rating: 5,
        text: "The training is well structured, the coach is knowledgeable and the environment is motivating. A great place to learn and improve." },
      { name: "Munendra B", program: "MMA", rating: 5,
        text: "Excellent coaching centre with a well trained coach. I had a great experience training here." },
      { name: "T Nitin", program: "MMA", rating: 5,
        text: "Very good and perfect sessions, better than a gym." },
    ],
  },

  pytta: {
    rating: 4.8,
    count: 38,
    items: [
      { name: "Varun Kashyap", program: "Table Tennis", rating: 5, featured: true,
        text: "The best table tennis academy in BTM. All the coaches are experienced and friendly. Strongly recommend if you want to improve." },
      { name: "Jaya Chitra", program: "Table Tennis", rating: 5, featured: true,
        text: "Four professional tables with space to play like a tournament. Neatly maintained, and the coaches give individual attention to each student." },
      { name: "Rajesh Kalvinkar", program: "Table Tennis", rating: 5,
        text: "A very good academy for learning and practising table tennis. Good floor, enough space, good ventilation and very good coaches to guide you." },
      { name: "Vasant Goudar", program: "Junior TT", rating: 5,
        text: "Enrolled my daughter here and can see good improvement in her game. The coaches are highly experienced and dedicated." },
      { name: "Mohammed Zuhair Ahmed", program: "Table Tennis", rating: 5,
        text: "The coaches make sure everyone gets one on one attention. Highly recommend this coaching academy." },
      { name: "Prady", program: "Table Tennis", rating: 5, featured: true,
        text: "Amazing club for any level. The coaching is great and the robot really helps drastic game improvement." },
      { name: "Sandeep Bhandary", program: "Table Tennis", rating: 5,
        text: "Wonderful facility with professional coaches and ITTF certified tables. Rohith and Vinay sir are passionate and dedicated to training the members." },
      { name: "Help India", program: "Table Tennis", rating: 5,
        text: "Very good place with all the modern coaching requirements and teachers. Must visit and start your table tennis journey." },
      { name: "Rashmi", program: "Table Tennis", rating: 5,
        text: "One of the most spacious academies in Bangalore. The coaches are talented and dedicated, and you can see good progress." },
      { name: "Koorma Rao", program: "Table Tennis", rating: 5,
        text: "A table tennis academy with experienced teachers and spacious interiors. They have robots to enhance game performance." },
      { name: "Nischal V U", program: "Table Tennis", rating: 5,
        text: "Super academy with a well trained coach." },
      { name: "Ramesh Ramachandran", program: "Table Tennis", rating: 5,
        text: "A great multi-discipline centre with very good yoga instructors and TT coaches." },
      { name: "Shrihari A S", program: "Table Tennis", rating: 5,
        text: "Good experience and good coaching." },
    ],
  },

  kids: {
    rating: 4.9,
    count: 23, // genuine kids-related reviews shown below — raise to your real Google count if higher
    items: [
      { name: "Preeti Prakash", program: "Kids, Yoga", rating: 5, featured: true,
        text: "The kids batch is excellent. My kid enjoys the classes and looks forward to an hour of practice and fun, and they focus on correct posture." },
      { name: "Shalini Paramasivam", program: "Kids, Yoga", rating: 5, featured: true,
        text: "My two kids have improved amazingly. Koorma Rao sir carefully pushes kids beyond their means, and their enthusiasm to go every day shows how well he engages them." },
      { name: "Suresh Raja", program: "Kids", rating: 5, featured: true,
        text: "Delighted with our son's progress since he started. Remarkable improvement in both his practice and his discipline." },
      { name: "Vidhya Mahadevan", program: "Kids, Yoga", rating: 5,
        text: "My daughter has attended for a year. Koorma sir teaches the asanas very well and makes the kids practise diligently." },
      { name: "Vidya N", program: "Kids, Yoga", rating: 5,
        text: "My daughter attends the kids class and enjoys it thoroughly. The instructor is friendly and conducts the classes in a fun way." },
      { name: "Samrat Chattopadhyay", program: "Kids, Competitive Yoga", rating: 5, featured: true,
        text: "My son has already stood 10th in the All Karnataka Open Yoga competition. The staff teach with real passion." },
      { name: "Snneha Singh", program: "Kids, Summer Camp", rating: 5,
        text: "My son attended summer camp here and thoroughly enjoyed it. They took very good care of the kids." },
      { name: "Kedar Mujumdar", program: "Kids, Yoga", rating: 5,
        text: "Been going for three months with my daughter, who enjoys the kids batch." },
      { name: "Anujakshi Shetty", program: "Kids, Summer Camp", rating: 5,
        text: "A great summer camp experience for the kids, very well planned and supervised." },
      { name: "Gayathri Thangaraju", program: "Kids, Yoga", rating: 5,
        text: "My daughter has had excellent training for a year and has developed a real interest in yoga. We're delighted she's in the right place." },
      { name: "Punith Kumar", program: "Kids, Yoga", rating: 5,
        text: "My son has attended for about six months. He enjoys it and I can see a lot of positive changes in him." },
      { name: "Deeps Shetty", program: "Kids, MMA", rating: 5, featured: true,
        text: "My daughter trains under Syed sir and it's truly inspiring. A big facility right in the city centre." },
      { name: "Sonal Mehta", program: "Kids, Yoga", rating: 5,
        text: "My daughter and I joined together. A perfect place to learn from a qualified and enthusiastic teacher." },
      { name: "Ravi Kumar", program: "Kids, Yoga", rating: 5,
        text: "My son and I both joined for yoga with great results in health and flexibility. Highly recommended." },
      { name: "Arti Dash", program: "Kids, Yoga", rating: 5,
        text: "My son and I have been practising here. Koorma sir pays close attention to our postures and the classes are great for both of us." },
      { name: "Hiral Joshi", program: "Kids, Summer Camp", rating: 5,
        text: "My son joined the summer classes. Koorma sir taught techniques and discipline and has very good knowledge of yoga." },
      { name: "Alankrita Gupta", program: "Kids", rating: 5,
        text: "One of the best classes in the area. They are professionals and handle kids with utmost care." },
      { name: "Tejeswi", program: "Kids, Yoga", rating: 5,
        text: "The kids yoga here is breathtaking, and the weekend advanced sessions are rejuvenating and therapeutic." },
      { name: "Madhuri Dora", program: "Kids, Summer Camp", rating: 5,
        text: "An energetic summer camp the kids absolutely loved." },
      { name: "Palak Dase", program: "Kids, Yoga", rating: 5,
        text: "Nice classes with good postures. The kids yoga is lovely and the sir is fun yet disciplined." },
      { name: "Suresh Parthasarathy", program: "Kids, Family", rating: 5,
        text: "My wife, daughter and I all enjoy the daily classes. We felt the difference in just a week, with the teacher taking personal interest in motivating us." },
      { name: "Pooja Agarwal", program: "Kids", rating: 5,
        text: "Very nice and appropriate for all age groups. It keeps the kids engaged throughout." },
      { name: "SR", program: "Kids, Yoga", rating: 5,
        text: "They guide us to correct our postures and keep motivating us to try new ones. They have yoga for kids as well, good for beginners and advanced alike." },
    ],
  },
};

export function getSet(key: SetKey): ReviewSet {
  return REVIEW_SETS[key];
}

// Deterministic interleave of every set: mixed-looking but stable across
// server/client renders (so no hydration mismatch).
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

/* Testimonials are hard-coded above, so these simply return the sets.
   They stay async so the pages that await them need no changes. */
export async function getTestimonialSet(key: SetKey): Promise<ReviewSet> {
  return REVIEW_SETS[key];
}

export async function getCombinedTestimonials(): Promise<Review[]> {
  return combinedReviews();
}

export async function getOverallStats(): Promise<{ rating: number; count: number }> {
  return overallStats();
}
