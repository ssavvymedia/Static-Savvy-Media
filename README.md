# Static Savvy Media

Premium futuristic digital marketing agency website. Frontend-only static website built with **React + JavaScript + JSX + CSS + React Router + Vite**.

## Stack

- React 19
- React Router 7
- Vite 8
- Plain CSS (design tokens + component styles)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Contact Form / Netlify Functions (local dev)

The contact form posts to `/.netlify/functions/submit-contact`. Plain `vite`
(`npm run dev`) only serves the frontend and does **not** run Netlify
Functions, so the form will 404 locally unless you use the Netlify CLI
instead:

```bash
npm install          # installs netlify-cli as a devDependency
npm run dev:netlify  # runs `netlify dev` — proxies Vite AND serves the function
```

The first time you run it, the CLI will ask you to log in / link the site
(`netlify link`) if it isn't linked yet. Once deployed to Netlify, the
function works automatically — no extra setup needed in production.

## Environment Variables

Copy `.env.example` to `.env` and fill in real values:

- SMTP\_\* / MAIL\_FROM\* / ADMIN\_EMAIL — outgoing mail for the contact form.
- `VITE_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` — Google reCAPTCHA v2
  keys ([get them here](https://www.google.com/recaptcha/admin)). The
  reCAPTCHA widget only renders once `VITE_RECAPTCHA_SITE_KEY` is set; the
  form works without it in the meantime.
- `VITE_GTM_ID` / `VITE_CLARITY_ID` — already wired directly into
  `index.html` (Google Tag Manager + Microsoft Clarity), listed here for
  reference only.

In the Netlify dashboard, set the same variables under **Site configuration
→ Environment variables** for production/preview deploys.

## Project Structure

```
StaticSavvyMedia/
├── public/                 # Static public assets (favicon, robots, sitemap, images)
├── src/
│   ├── assets/             # Images, icons, fonts imported by components
│   ├── components/         # Reusable components (common, navigation, hero, cards, sections, animations)
│   ├── layouts/            # MainLayout, LandingLayout, ContentLayout, BlogLayout
│   ├── pages/              # Route-level page components (one per URL)
│   ├── templates/          # 12 reusable page templates (T01–T12)
│   ├── data/               # Data-driven configuration (services, locations, industries, ...)
│   ├── routes/             # AppRoutes.jsx — all React Router routes
│   ├── styles/             # CSS architecture (tokens, global, typography, components, pages, templates)
│   └── utils/              # constants, helpers, seo, schema
├── index.html
├── package.json
└── vite.config.js
```

## Architecture

```
Page → Template → Reusable Sections → Reusable Components → Data
```

- Every URL has one page component in `src/pages/`.
- Pages consume one of the 12 reusable templates in `src/templates/`.
- Templates compose reusable sections and components.
- `src/data/*.js` files are structural placeholders and will be populated in a later phase.
- No backend, no database, no CMS. Pure static frontend.

## Design Direction

Dark mode, neon gradient, glassmorphism, premium digital agency UI. Design tokens live in `src/styles/variables.css`.
