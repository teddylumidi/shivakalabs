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
- Plain CSS (`src/app.css`), Font Awesome 4.7 and Barlow / Barlow Condensed (Google Fonts) from CDNs
- Look: black and brand gold; gold is used as a surface for the homepage price board. Headings are left-aligned, sentence case, with no single-word gold accents. The "2026 revamp" block at the end of `app.css` holds the current look
- No backend for the site itself: content is static; WhatsApp deep links are the main contact mechanism
- Paid document writing (CV & Documents page) uses a separate Vercel API in `services/document-api` (Paystack payments + Claude writing + Word/PDF output). See its README for setup and environment variables

## Where things live

- `artifacts/shivakalabs/src/App.jsx` — layout and routes (`AppShell` is shared by the browser and the prerenderer)
- `artifacts/shivakalabs/src/pages/` — Home, About, ECitizen, WebDev, Design, Marketing, NotFound
- `artifacts/shivakalabs/src/components/` — Navbar, Footer, ServiceCard, ServiceGrid, PageHero, CtaStrip, FloatingWhatsApp, Seo, ScrollManager
- `artifacts/shivakalabs/src/data/services.js` — single source of truth for all services, FAQ and the WhatsApp number
- `artifacts/shivakalabs/src/data/pages.js` — per-page titles and meta descriptions (used for SEO and the sitemap)
- `artifacts/shivakalabs/src/data/requirements.js` — "What to prepare" lists per eCitizen category
- `services/document-api/lib/catalog.js` — paid document types, prices and form fields (shared by the site and the API, so the shown price is the charged price)
- `artifacts/shivakalabs/src/lib/docsApi.js` + `components/OrderDialog.jsx` — order form, Paystack popup and downloads
- `artifacts/shivakalabs/src/pages/documents/` — Documents hub, category pages and passport photo tool; `src/lib/passportPhoto.js` does background removal and framing
- `artifacts/shivakalabs/src/entry-server.jsx` + `scripts/postbuild.mjs` — build-time prerendering, 404.html, sitemap.xml, robots.txt
- `artifacts/shivakalabs/public/img/` — logo and service card images (WebP only)

## Architecture decisions

- Pages are prerendered to static HTML at build time and hydrated in the browser: search engines see full content and each page has its own title, description, canonical URL and Open Graph tags
- Clean URLs (`/ecitizen/`) instead of hash URLs; old `/#/ecitizen` links redirect automatically
- GitHub Pages serves `404.html` for unknown URLs
- Service card images are looked up by slug: "Logo Design" → `img/services/logo-design.webp`, falling back to the logo if missing
- Site URL for canonical links is set by `VITE_SITE_URL` in the deploy workflow

## Product

- Home page: hero with a search across every service (`src/data/search.js`) and a gold price board with real prices (`PriceBoard.jsx`), service areas, how it works, popular services, FAQ, WhatsApp CTA
- eCitizen Services: filterable/searchable grid of 75+ government portal services (only ones that can be done online; in-person-only services such as new IDs were removed)
- Web Development: searchable grid of web dev services
- Graphic Design: searchable grid of design services
- Digital Marketing: searchable grid of marketing services
- About Us: company story, team photo, and values
- Documents section (`/documents`, with its own sub-menu): Career, Letters, Legal, Business, Personal and Passport Photo pages. 28 paid document types (CV KSh 100, cover letter KSh 30, affidavits, agreements, business plans…). Details form → pay first via Paystack (M-Pesa or card) → download Word and PDF
- Passport photo (`/documents/passport-photo`, KSh 50): upload → background removed and face framed in the browser → choose size and colour → pay → JPG and A4 print PDF
- Web Development page shows website packages: Basic KSh 15,000, Standard KSh 30,000, Premium KSh 60,000 (`WEB_PACKAGES` in services.js)
- How it works: on Home, eCitizen and CV & Documents; eCitizen page also lists what to prepare per category
- Floating WhatsApp button and sticky navbar on all pages

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Add new images as WebP, or drop PNG/JPG files into `public/img` and run the `images` script (it converts and deletes the originals)
- The document API URL defaults to `https://shivakalabs-docs.vercel.app`; if the Vercel project gets another URL, publish with `VITE_DOCS_API_URL=<url> pnpm run publish`
- To change document prices or add a document type, edit `services/document-api/lib/catalog.js` (and its guidance in `lib/writer.js`), redeploy the API, then republish the site
- To add a page: add the route in `App.jsx`, its metadata in `src/data/pages.js`, and a nav link in `Navbar.jsx`/`Footer.jsx`

