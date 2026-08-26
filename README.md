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



