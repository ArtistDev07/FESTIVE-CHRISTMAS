# Festive Christmas — Global Winter Hackathon Platform

An enchanted, production-grade, Christmas-themed web platform for the **Festive Christmas Hackathon 2026**. Built with React 19, TypeScript, Vite 8, and Tailwind CSS.

---

## 1. Quickstart & Commands

### Prerequisites
- Node.js 18.x or newer
- npm 9.x or newer

### Installation
```bash
npm install
```

### Local Development Server
Starts the local dev server on port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type-Check & Linting
Validates TypeScript syntax and type safety without emitting build output:
```bash
npm run lint
```

### Production Build
Compiles and minifies assets into the `dist/` directory:
```bash
npm run build
```

### Preview Production Build
Locally preview the built output in `dist/`:
```bash
npm run preview
```

---

## 2. Project Architecture & Directory Structure

```text
├── public/                       # Static public assets served at root
│   ├── _headers                  # Security & caching headers for static hosting
│   ├── favicon.svg               # Scalable Christmas tree & starburst SVG favicon
│   ├── og-image.svg              # 1200x630 OpenGraph & Twitter social share card
│   ├── robots.txt                # Search engine crawler directives
│   ├── site.webmanifest          # PWA & bookmarking manifest
│   └── sitemap.xml               # Canonical XML sitemap for search indexing
├── src/
│   ├── components/               # Modular UI & section components
│   │   ├── challenges/           # Challenge discovery cards & modal dialogs
│   │   ├── contact/              # Organizer desk, contact form & channels
│   │   ├── effects/              # Canvas snowfall & ambient particles
│   │   ├── experts/              # Mentor & judge directory and profile modals
│   │   ├── faq/                  # Searchable FAQ accordion and filters
│   │   ├── footer/               # Global festive footer, legal & back-to-top
│   │   ├── header/               # Sticky festive header & mobile drawer
│   │   ├── hero/                 # Cinematic hero & countdown timer
│   │   ├── illustrations/        # SVG scene illustrations
│   │   ├── intro/                # Magical opening loader sequence
│   │   ├── motion/               # ScrollReveal & motion wrappers
│   │   ├── prizes/               # Prize tier cards & award modals
│   │   ├── schedule/             # 48-hour interactive timeline & filters
│   │   ├── sections/             # Primary landing-page section containers
│   │   ├── tracks/               # Hackathon challenge tracks
│   │   └── ui/                   # Shared buttons, badges, containers
│   ├── config/                   # Central single-source-of-truth configurations
│   │   ├── awardsConfig.ts       # Prize pool ($50K) & categories
│   │   ├── contactConfig.ts      # Contact topics, response SLAs, verified channels
│   │   ├── eventConfig.ts        # Event dates (Dec 18–20, 2026), title, registration
│   │   ├── expertsConfig.ts      # Mentor & judge profiles and verification states
│   │   ├── faqConfig.ts          # Searchable questions, answers, and categories
│   │   ├── footerConfig.ts       # Footer link directory and legal destinations
│   │   ├── navigationConfig.ts   # Desktop and mobile navigation hierarchies
│   │   ├── preparationConfig.ts  # Participant preparation checklist
│   │   ├── rulesConfig.ts        # Competition rules, rubric, and code of conduct
│   │   ├── scheduleConfig.ts     # UTC timeline milestones and categories
│   │   └── tracksChallengesConfig.ts # Challenge tracks and prompts
│   ├── hooks/                    # Custom React hooks (useBackToTop, useReducedMotion)
│   ├── styles/                   # Design tokens, typography, and button styles
│   ├── App.tsx                   # Main application layout composition
│   └── main.tsx                  # Vite React entry point
├── index.html                    # HTML entry with full SEO, OG, Twitter & JSON-LD
├── package.json                  # Scripts & dependencies
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite 8 build & path alias configuration
```

---

## 3. SEO, Social Previews & Structured Data

- **Page Title:** `Festive Christmas — A Magical Winter Hackathon`
- **Meta Description:** Concise, keyword-optimized summary tailored for search results snippets.
- **Favicon:** Scalable vector SVG (`/public/favicon.svg`) with Christmas tree emblem and golden starburst.
- **Social Sharing:** High-resolution OpenGraph and Twitter cards (`/public/og-image.svg` at 1200×630).
- **Structured Data:** Embedded Schema.org `Event` in JSON-LD format specifying confirmed dates (Dec 18–20, 2026), virtual location, free registration offer, and organizer details.
- **Crawlers:** Configured `robots.txt` and `sitemap.xml` referencing canonical domain `https://festivechristmas.dev/`.

---

## 4. Deployment & Hosting Options

### Option A: Static Hosting (Cloudflare Pages, Netlify, Vercel)
The project outputs standard static files to `dist/`.
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- Security headers and asset caching are pre-configured in `public/_headers`.

### Option B: Docker / Nginx
Build the static assets with `npm run build` and serve the resulting `dist/` directory with any static web server (such as Nginx or Caddy) configured for Single-Page Application (SPA) routing (`try_files $uri $uri/ /index.html;`).

---

## 5. External Integrations Status

1. **Contact Submission Webhook (`POST /api/contact`):**
   - The contact form is architected to POST to `/api/contact`. When an external API route is provisioned, submissions will receive direct server confirmation.
   - In static / unconfigured environments, the form informs the user and provides a 1-click fallback to send the prepared inquiry directly to `hello@festivechristmas.dev` via their email client.
2. **Registration Portal:**
   - Registration CTAs currently navigate participants to the `#event-details` logistics guide. Update `registrationUrl` in `src/config/eventConfig.ts` when a ticketing or Devpost portal is connected.
