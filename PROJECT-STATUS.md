# Project Status — Paanchajanya Academy Website

_Last updated: June 2026 · Maintained by Rotek Digital_

> Working context document. Keep this in the repo and/or paste it into a new chat to continue work without re-explaining everything.

## What it is
Marketing website for **Paanchajanya Academy**, a multi-discipline fitness/wellness venue in **BTM Layout 2nd Stage / Bilekahalli, Bengaluru**. One location, four academies, each with its own page: **Yoga** (`/yoga`), **House of Champions / MMA** (`/champions`), **Table Tennis / PYTTA** (`/pytta`), **Kids Activities** (`/kids`), plus **Home** (`/`), **Workshops** (`/workshops`), **Contact** (`/contact`) — 7 routes. Single WhatsApp number everywhere: **919880422933**. Built by **Rotek Digital** (agency) for the owner (client); the developer is **not** the owner.

## Tech stack
- Next.js 15.5.19 (App Router), React 19, TypeScript, Framer Motion, GSAP.
- **Static export**: `next.config.mjs` → `output: "export"`, `images: { unoptimized: true }`, `reactStrictMode`. Builds to `out/`.
- Premium dark design. Fonts: Archivo / Baloo 2 / Inter (site); Fraunces + Outfit used in deliverables.

## Repo & local
- GitHub: **rohitpn2005/paanchajanya-academy**, branch `main`. (Should be made **private** — may not be done yet.)
- Local (Windows cmd): `C:\Users\rohit\Downloads\paanchajanya_website\paanchajanya-next`
- Workflow: edit → `npm install --no-audit --no-fund && npm run build` (must pass static export) → `git add . && git commit && git push` → Cloudflare auto-builds. When delivering multiple `page.tsx`, zip preserving paths.

## Hosting — Cloudflare Pages (free tier; commercial OK, unlimited bandwidth)
- Build command `npm run build`, output dir `out`.
- Env vars (build-time only): `SHEET_ID`, `GOOGLE_SHEETS_API_KEY`.
- Cloudflare account email: Wolfberrypie@gmail.com (holds the Pages project + the domain zone).
- One-click owner **Publish page** (`publish.html`, kept private) triggers a Cloudflare **Deploy Hook**.
- Moved off Vercel (Vercel free = non-commercial only).
- Per-deployment hash URLs change each build (normal); the production `<project>.pages.dev` URL and the custom domain are permanent.

## Domain / DNS
- **paanchajanyaacademy.in**, registered at **GoDaddy** (owner's account; developer has **delegate access**). Nameservers moved to **Cloudflare**; zone **Active**.
- Both **apex** and **www** attached as custom domains in Pages, **Active + SSL** (the `www` CNAME had to be added manually — it was missing and caused NXDOMAIN; now fixed). DNSSEC off.
- ⚠️ **.in KYC "Validate"** (registry identity check) must be done by the **owner** — likely still pending; the domain can be suspended if not completed.
- Optional, not done: `www → apex` redirect.

## Content / CMS
- Google Sheet **"Paanchajanya-Content"**, tabs: **Plans, Kids, Workshops, Contact**. Shared "Anyone with link → Viewer" + owner as editor.
- Plans columns: `program | plan name | duration | price | features (| separated) | active (TRUE/FALSE) | order | popular | note`. Plans features rewritten professionally.
- Workshops: 3 extra rows drafted (Aerial Yoga / Self-Defense / TT Bootcamp) — owner still to add poster + form links.
- **Testimonials are HARD-CODED** in `lib/reviews.ts` (real Google reviews; yoga 30, champions 22, pytta 13, kids 23). Sheet Testimonials tab unused/deleted. Review **count numbers removed** from all UI.
- **Location is HARD-CODED** in `lib/site.ts` (not sheet-driven). Address: _Ranka Colony Rd, opposite Mantri Terrace, BTM Layout 2nd Stage, Bilekahalli, Bengaluru, Karnataka 560076_. Map embed uses a keyless `output=embed` URL labeled "Paanchajanya Academy"; directions use share link `https://maps.app.goo.gl/ikbdR5g6MjQ6ax5c6`.

## Work completed (this build phase)
- Hard-coded testimonials; removed review-count numbers sitewide.
- `components/LeadProvider.tsx`: booking modal uses browser history so **Back closes the modal** instead of exiting the site.
- `app/contact/page.tsx` + `lib/site.ts`: location fully hard-coded (map + address + directions).
- Hero videos compressed (720p, no audio, faststart): home (38MB→1.8MB), kids, pytta, champions, yoga. `components/HeroVideo.tsx` uses poster `/images/heroes/<page>.jpg` + `/videos/<page>-hero.mp4`. **Still to compress if large: contact, workshops, reviews heroes.**
- SEO: created `public/robots.txt` + `public/sitemap.xml` (7 routes); added `metadataBase`, Open Graph, Twitter card, and **LocalBusiness JSON-LD schema** in `app/layout.tsx`; created branded `public/og.jpg` (1200×630). Per-page titles/descriptions already existed.
- Deliverables (not necessarily committed): branded onboarding PDF (`Paanchajanya-Website-Guide.pdf`), `README.md`.

## Discovery / SEO status
- Site is **new and not yet indexed** by Google (`site:paanchajanyaacademy.in` returns nothing — expected). Nothing is blocking it (robots OK, no `noindex`, no penalty).
- **Google Search Console: NOT set up yet.** Plan = **Option 1**: create a dedicated project Google account (owner has none yet) → verify Domain property via DNS TXT in Cloudflare → submit `sitemap.xml` → Request Indexing for each page → transfer ownership to owner later. Then wait days–weeks.
- Google Business Profile: owner's, separate, already has reviews; owner to claim/optimize.

## Pending / next steps
1. Google Search Console setup (Option 1 above) — in progress.
2. Owner completes **.in KYC validation**.
3. Compress remaining hero videos (contact / workshops / reviews) if large.
4. Make GitHub repo **private**; rotate Deploy Hook / API key if it was ever public.
5. Add real workshop poster + form links in the sheet.
6. Confirm Cloudflare env vars set; optional `www → apex` redirect.
7. Delete old Vercel project if any.
8. Final QA on a phone (WhatsApp buttons, forms, all pages).
9. **Handover to owner**: live site link, Sheet link, Publisher page, onboarding PDF, and account access (GoDaddy domain, Cloudflare, Search Console, Business Profile).

## Key files
| File | Purpose |
|---|---|
| `lib/site.ts` | Site constants: hard-coded location (address, map embed, directions), nav, themes, phones |
| `lib/sheets.ts` | Google Sheets readers (Plans / Kids / Workshops / Contact), build-time |
| `lib/plans.ts` | Program constants + WhatsApp link builder |
| `lib/reviews.ts` | Hard-coded testimonials |
| `app/layout.tsx` | Metadata, Open Graph, LocalBusiness schema, providers |
| `app/contact/page.tsx` | Contact page (location hard-coded from `SITE`) |
| `components/LeadProvider.tsx` | Booking modal (history-aware Back handling) |
| `components/HeroVideo.tsx` | Looping muted hero video + poster |
| `public/robots.txt`, `public/sitemap.xml`, `public/og.jpg` | SEO assets |
