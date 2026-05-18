# ShivakaLabs

A professional digital services website for ShivakaLabs — a Kenyan agency offering eCitizen portal assistance, web development, graphic design, and digital marketing.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/shivakalabs/` — frontend React + Vite app (served at `/`)
- `artifacts/shivakalabs/src/App.jsx` — root routing component
- `artifacts/shivakalabs/src/pages/` — page components (Home, About, ECitizen, WebDev, Design, Marketing, NotFound)
- `artifacts/shivakalabs/src/components/` — shared components (Navbar, Footer, ServiceCard, ServiceGrid, CtaStrip, FloatingWhatsApp)
- `artifacts/shivakalabs/src/data/services.js` — single source of truth for all service data
- `artifacts/shivakalabs/src/app.css` — global styles and design tokens
- `artifacts/shivakalabs/public/img/` — images including logo, hero images, and service card images

## Architecture decisions

- Pure frontend app — no backend API routes needed; all data is static in `services.js`
- react-router-dom v7 for client-side routing (BrowserRouter with lazy-loaded pages)
- Font Awesome 4.7 loaded from CDN for icons; Josefin Sans from Google Fonts
- WhatsApp deep links are the primary CTA mechanism (no server-side contact form)
- Service images use slug-based filenames with fallbacks on `onError`

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

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
