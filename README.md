# PaanchaJanya Academy — Next.js site

Production site for PaanchaJanya Academy (Yoga, House of Champions, PYTTA table tennis, and Kids), built with **Next.js 15 (App Router) + TypeScript + React 19**. Reviews are **curated content you edit in one file** (no API key). The **Workshops** page can optionally read from a Google Sheet, but the site runs fully with built-in content, so **no API keys are needed to run or test it**.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: add your Google Sheet to go live
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Requires Node 18.18+ (built and tested on Node 22).

## Connect Workshops (Google Sheet)

The Workshops page reads from a Google Sheet via the public Sheets REST API. No service account needed.

1. Create a Google Sheet with a tab named exactly `Workshops`. Row 1 is headers, data from row 2. Columns A–H:

   | title | blurb | date | time | instructor | program | image | status |
   |-------|-------|------|------|------------|---------|-------|--------|
   | Breath & Mobility Masterclass | A two hour intensive… | Sat, 28 Jun | 7:30 to 9:00 AM | Coach Aditi R. | PaanchaJanya Yoga | https://… | featured |

   - `program` must be one of: `PaanchaJanya Yoga`, `House of Champions`, `Table Tennis (PYTTA)`, `Kids Activities`, `Not sure yet` (routes the WhatsApp lead to the right desk).
   - `image` is optional — a direct image URL (e.g. a Google Drive direct link). If blank, a styled poster placeholder is shown.
   - `status` is `featured`, `open`, or `closed`. The `featured` row appears in the highlighted panel with a live countdown; `closed` rows are hidden.
2. Share the sheet: **Anyone with the link → Viewer**.
3. In [Google Cloud Console](https://console.cloud.google.com/), enable the **Google Sheets API** and create an **API key**.
4. Add to `.env.local`:

   ```
   SHEET_ID=your_spreadsheet_id
   GOOGLE_SHEETS_API_KEY=your_api_key
   ```

Refreshes at most every 5 minutes (ISR). Until connected, fallback workshops in `lib/sheets.ts` are shown.


## How it's put together

- `app/` — one folder per route (`/`, `/yoga`, `/champions`, `/pytta`, `/kids`, `/workshops`, `/reviews`, `/contact`). `layout.tsx` loads fonts, the design system, the booking provider, nav, footer, and the client effects.
- `lib/sheets.ts` — Google Sheets reader for workshops (`getWorkshops`, `getFeaturedWorkshop`) plus fallback data.
- `lib/reviews.ts` — curated reviews + rating stats (edit your reviews here).
- `components/Reviews.tsx` — the rating header, distribution bars, and review cards (compact + full variants).
- `lib/plans.ts` — programs, membership plans (prices live here), and the WhatsApp link builder + per-program routing numbers.
- `lib/site.ts` — address, map, nav links, per-route accent theme, contact desks.
- `components/LeadProvider.tsx` — the booking modal in React context; any `BookButton` (even on a server-rendered page) opens it and pre-fills the program and plan.
- `components/SiteScripts.tsx` — reveal-on-scroll, count-ups, rating bars, gallery filters, and per-route accent theming, re-run on each navigation.
- `components/Hero.tsx` — Framer Motion hero (staggered entrance). `components/ScrollFX.tsx` — GSAP scroll-progress bar + hero parallax.
- `components/Nav.tsx`, `Footer.tsx`, `HeroVideo.tsx`, `Shot.tsx`, `Countdown.tsx`, `ContactForm.tsx`.

## Styling note

The design system is the original hand-built CSS, ported verbatim as `app/globals.css`, so the look matches the approved design exactly. Tailwind was intentionally **not** layered on top to avoid its preflight reset fighting the existing reset and causing visual drift. If you want Tailwind for future utility work, add it without preflight (`corePlugins: { preflight: false }`).

**Animation.** Hero entrances use **Framer Motion** (`components/Hero.tsx`): the eyebrow/breadcrumb, headline words, sub and CTAs stagger in on mount and on every client navigation. Scroll polish uses **GSAP + ScrollTrigger** (`components/ScrollFX.tsx`): a top scroll-progress bar, a slow hero zoom, and a drift/fade on the hero content and glows as you scroll past. Both respect `prefers-reduced-motion` (entrances fade without movement, the progress bar hides), and GSAP triggers are rebuilt per route to stay in sync with App Router navigation.

## Images and videos

Photos live in `public/images/**` and hero background clips in `public/videos/**`, using the same filenames as the static prototype — overwrite a placeholder with your own file of the same name and it appears automatically. Workshop posters are dynamic (the `image` column in the sheet). See the static prototype's `images/README.txt` and `videos/README.txt` for the full naming map.

## Deploy

Push to GitHub and import into **Vercel** (zero config for Next.js). Add `SHEET_ID` and `GOOGLE_SHEETS_API_KEY` as Environment Variables in the Vercel project settings. Any host that runs `next build` / `next start` (or a Node server) works too.
"# PAANCHAJANYA" 
