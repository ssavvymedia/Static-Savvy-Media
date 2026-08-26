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
