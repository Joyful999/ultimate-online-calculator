# Ultimate Online Calculator

A production-ready, frontend-only calculator platform built with HTML5, CSS3, vanilla JavaScript, and no backend or database. Designed to deploy directly to Vercel as a static site.

## What's included

- **21 working calculators** across 7 categories (Math, Financial, Date & Time, Health & Fitness, Education, Everyday, Measurement)
- **8 original guide articles** with custom-generated illustrations
- Global search, category browsing, and an alphabetical A–Z calculator index
- Favorites, calculation history, and recently-used tracking — all via `localStorage`, no account required
- Dark / light theme toggle
- Full legal page set (About, Contact, FAQ, Privacy Policy, Cookie Policy, Terms of Use, Disclaimer)
- SEO: unique titles/descriptions, canonical tags, Open Graph + Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`
- Ad slot placeholders (clearly marked, non-intrusive) ready for Google AdSense
- Fully responsive, mobile-first, accessible (semantic HTML, labeled form fields, visible focus states, keyboard-friendly)

## Structure

```
ultimate-calculator/
├── index.html
├── calculators/        21 calculator pages + index
├── categories/          7 category pages + index
├── guides/               8 guide articles + index
├── pages/                About / Contact / FAQ / legal pages
├── assets/
│   ├── css/              tokens.css, layout.css, components.css
│   ├── js/                shared scripts + assets/js/calculators/*.js (one file per calculator)
│   └── images/            guide illustrations, icons, OG image
├── sitemap.xml
├── robots.txt
├── manifest.json
├── vercel.json
└── favicon.ico
```

## Before you deploy

1. **Contact form**: the form on `/pages/contact.html` posts to FormSubmit using the placeholder address `hello@ultimateonlinecalculator.com`. Replace this with your real email address in that file, then complete FormSubmit's one-time email confirmation step (they'll email you the first time the form is submitted).
2. **Domain**: `SITE_URL` is set to `https://www.ultimateonlinecalculator.com` throughout canonical tags, Open Graph tags, and `sitemap.xml`. Update this to your real domain before launch (a global find-and-replace is enough — every page uses this exact string).
3. **AdSense**: ad slots are already placed on the homepage, category pages, calculator pages, and guide pages as dashed placeholder boxes (`.ad-slot`). Once you have an AdSense account, replace these divs with your ad unit code.
4. **Analytics**: no analytics is wired up by default (per the privacy-first approach described in the Privacy Policy). Add your preferred snippet to the `<head>` in `assets` if desired, and update the Privacy/Cookie policy pages accordingly.

## Deploying to Vercel

This is a static site with no build step. Push this folder to a Git repository and import it into Vercel, or run `vercel deploy` from inside this directory — no framework preset or environment variables are required.

## Local preview

From this folder, run any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
