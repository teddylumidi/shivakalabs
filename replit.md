# ShivakaLabs

A professional digital services website for ShivakaLabs — a Kenyan agency offering eCitizen portal assistance, web development, graphic design, and digital marketing.

## Run & Operate

- `pnpm install` — install dependencies (pnpm only)
- `pnpm dev` — run the site locally (Vite dev server)
- `pnpm build` — production build into `artifacts/shivakalabs/dist/public` (prerenders every page)
- `pnpm run publish` — build for GitHub Pages and copy into `docs/`
- `pnpm typecheck` — TypeScript check
- `pnpm --filter @workspace/shivakalabs run images` — convert new PNG/JPG images in `public/img` to WebP

Deployment: GitHub Pages serves the `docs/` folder on `main` (https://teddylumidi.github.io/shivakalabs/).
After changing the site, run `pnpm run publish` (builds and copies into `docs/`), then commit and push.
Never edit `docs/` by hand; it is generated. `main` is the only branch.

## Stack

- pnpm workspace with a single package: `artifacts/shivakalabs`
- React 19 + Vite 7, react-router-dom v7 (BrowserRouter, clean URLs)
- Plain CSS (`src/app.css`), Font Awesome 4.7 and Josefin Sans from CDNs
- No backend: all content is static; WhatsApp deep links are the contact mechanism

## Where things live

- `artifacts/shivakalabs/src/App.jsx` — layout and routes (`AppShell` is shared by the browser and the prerenderer)
- `artifacts/shivakalabs/src/pages/` — Home, About, ECitizen, WebDev, Design, Marketing, NotFound
- `artifacts/shivakalabs/src/components/` — Navbar, Footer, ServiceCard, ServiceGrid, PageHero, CtaStrip, FloatingWhatsApp, Seo, ScrollManager
- `artifacts/shivakalabs/src/data/services.js` — single source of truth for all services, FAQ and the WhatsApp number
- `artifacts/shivakalabs/src/data/pages.js` — per-page titles and meta descriptions (used for SEO and the sitemap)
- `artifacts/shivakalabs/src/entry-server.jsx` + `scripts/postbuild.mjs` — build-time prerendering, 404.html, sitemap.xml, robots.txt
- `artifacts/shivakalabs/public/img/` — logo and service card images (WebP only)

## Architecture decisions

- Pages are prerendered to static HTML at build time and hydrated in the browser: search engines see full content and each page has its own title, description, canonical URL and Open Graph tags
- Clean URLs (`/ecitizen/`) instead of hash URLs; old `/#/ecitizen` links redirect automatically
- GitHub Pages serves `404.html` for unknown URLs
- Service card images are looked up by slug: "Logo Design" → `img/services/logo-design.webp`, falling back to the logo if missing
- Site URL for canonical links is set by `VITE_SITE_URL` in the deploy workflow

## Product

- Home page: hero, popular services grid, FAQ accordion, WhatsApp CTA
- eCitizen Services: filterable/searchable grid of 90+ government portal services
- Web Development: searchable grid of web dev services
- Graphic Design: searchable grid of design services
- Digital Marketing: searchable grid of marketing services
- About Us: company story, team photo, and values
- Floating WhatsApp button and sticky navbar on all pages

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Add new images as WebP, or drop PNG/JPG files into `public/img` and run the `images` script (it converts and deletes the originals)
- To add a page: add the route in `App.jsx`, its metadata in `src/data/pages.js`, and a nav link in `Navbar.jsx`/`Footer.jsx`

