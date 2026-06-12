# Paanchajanya Academy — Website

A fast, premium marketing website for **Paanchajanya Academy**, a multi-discipline fitness and wellness venue in Bilekahalli, BTM Layout, Bengaluru. One destination, four academies — **Yoga**, **House of Champions (MMA)**, **Table Tennis (PYTTA)** and **Kids Activities** — each with its own dedicated page, plus workshops and contact.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-live-0e8a6e">
</p>

🔗 **Live:** [paanchajanyaacademy.in](https://paanchajanyaacademy.in)

---

## Overview

The site is a statically-exported Next.js application with a premium dark aesthetic, cinematic hero videos and scroll-driven animations. It is designed to convert visitors into enquiries through one-tap WhatsApp messaging, and it is **owner-editable**: day-to-day content (plans, pricing, workshops, contact details) is managed from a single Google Sheet and published to the live site with one click — no code or developer required.

Hosting is on **Cloudflare Pages** (free tier, commercial use permitted, unlimited bandwidth, global CDN, automatic HTTPS).

## Features

- **Four academies, one site** — separate pages for Yoga, House of Champions, Table Tennis (PYTTA) and Kids, plus Home, Workshops and Contact.
- **One-tap WhatsApp enquiries** — every call-to-action opens WhatsApp with a pre-filled message routed to the correct academy.
- **Google Sheets CMS** — Plans, Kids, Workshops and Contact content is read from a Google Sheet at build time.
- **One-click publishing** — a branded, private "Content Publisher" page triggers a Cloudflare rebuild via a Deploy Hook.
- **Real testimonials** — genuine Google reviews shown across the site (hard-coded in `lib/reviews.ts`).
- **Cinematic, optimised media** — hero videos compressed to ~0.5–2 MB with faststart for near-instant playback.
- **Responsive & fast** — mobile-first layout, static export, served from Cloudflare's edge with HTTPS.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript, React 19 |
| Animation | Framer Motion, GSAP |
| Styling | Global CSS (custom design system) |
| Content | Google Sheets API v4 (build-time fetch) |
| Output | Static export (`output: "export"` → `out/`) |
| Hosting | Cloudflare Pages |
| Domain/DNS | Cloudflare (registrar: GoDaddy) |

## Project Structure

```
paanchajanya-academy/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Home
│   ├── globals.css             # Design system + responsive rules
│   ├── icon.png / apple-icon.png
│   ├── yoga/page.tsx
│   ├── champions/page.tsx      # House of Champions (MMA)
│   ├── pytta/page.tsx          # Table Tennis
│   ├── kids/page.tsx
│   ├── workshops/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── HeroVideo.tsx           # Looping muted hero (poster + faststart mp4)
│   ├── Reviews.tsx             # Rating + review helpers
│   ├── ReviewMarquee.tsx       # Scrolling testimonials
│   ├── Loader.tsx              # Branded loading screen
│   ├── ScrollFX.tsx            # GSAP scroll animations
│   └── SiteScripts.tsx         # Animated counters, etc.
├── lib/
│   ├── sheets.ts               # Google Sheets readers (build-time)
│   ├── plans.ts                # Program constants
│   ├── reviews.ts              # Hard-coded testimonials
│   └── types.ts
├── public/
│   ├── images/                 # Logos, posters, hero stills
│   └── videos/                 # Optimised hero videos
├── next.config.mjs             # Static export config
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18.18+ (LTS recommended)
- npm

### Install & run

```bash
npm install
npm run dev          # local dev at http://localhost:3000
```

### Build (static export)

```bash
npm run build        # outputs the static site to ./out
```

The `out/` directory is the deployable artifact — pure static HTML/CSS/JS/assets.

## Environment Variables

Content is fetched from Google Sheets **at build time only** — these keys are never shipped to the browser. Create a `.env.local` for local builds and set the same two variables in Cloudflare Pages (Settings → Environment variables):

| Variable | Description |
|---|---|
| `SHEET_ID` | The Google Sheet ID (the long string in the sheet's URL). |
| `GOOGLE_SHEETS_API_KEY` | Google Cloud API key with the Sheets API enabled. |

The content sheet must be shared as **"Anyone with the link → Viewer"** so the API key can read it. The owner is added as an Editor by email.

## Content Management (CMS)

Editable content lives in one Google Sheet with these tabs:

| Tab | Controls |
|---|---|
| `Plans` | Membership plans & pricing per academy |
| `Kids` | Kids programme details |
| `Workshops` | Workshop listings |
| `Contact` | Contact details / WhatsApp number |

**Plans columns:** `program`, `plan name`, `duration`, `price`, `features` (separate each with a `\|` bar), `active` (`TRUE` shows / `FALSE` hides), `order`, `popular`, `note`.

> ⚠️ Do not rename tabs or the header row, and do not delete or reorder columns — the build reads them by name.

Testimonials are **not** in the sheet; they are hard-coded in `lib/reviews.ts`.

### Publishing changes (non-technical)

1. Edit the Google Sheet.
2. Open the private **Content Publisher** page → **Publish my changes**.
3. The page calls a Cloudflare **Deploy Hook**, which rebuilds and redeploys the site (~1 minute).

A full illustrated owner's guide is provided separately (`Paanchajanya-Website-Guide.pdf`).

## Deployment — Cloudflare Pages

Connect the GitHub repo as a Pages project with:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variables | `SHEET_ID`, `GOOGLE_SHEETS_API_KEY` |

Every push to `main` triggers a build. A **Deploy Hook** URL powers the one-click Publisher page. The permanent links are the production URL (`<project>.pages.dev`) and the custom domain — per-deployment hashed URLs are immutable snapshots and are expected to change each build.

### Custom domain
`paanchajanyaacademy.in` is added to the same Cloudflare account, nameservers point to Cloudflare, and both the apex and `www` are attached to the Pages project.

## Media Optimisation

Hero videos are muted, looping backgrounds and should stay small for fast loads. Re-encode any new hero with:

```bash
ffmpeg -i input.mp4 \
  -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -crf 30 -preset slow -an \
  -movflags +faststart \
  <page>-hero.mp4
```

This caps to 720p, drops the audio track, and moves the index to the front (`+faststart`) so playback starts before the file fully downloads. Each page also has a matching poster image at `public/images/heroes/<page>.jpg` for instant first paint.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/yoga` | Paanchajanya Yoga |
| `/champions` | House of Champions (MMA) |
| `/pytta` | Table Tennis (PYTTA) |
| `/kids` | Kids Activities |
| `/workshops` | Workshops |
| `/contact` | Contact |

## Maintenance Notes

- **Content edits** → Google Sheet + Publish (no deploy needed by hand).
- **Testimonials / copy / design changes** → edit code, commit, push.
- **New hero video** → optimise with the ffmpeg command above, keep the same filename, push.
- **Keep the Publisher page private** (bookmark it; do not commit it to a public repo).

---

<p align="center">
  <strong>Designed, built &amp; maintained by Rotek Digital</strong><br>
  <em>Digital solutions for businesses to grow.</em>
</p>
