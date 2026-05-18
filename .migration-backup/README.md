# ShivakaLabs React + Vite

Converted from static HTML to a modular React SPA.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview build locally
```

## Images

Copy the original img/ folder into public/:
```bash
cp -r /path/to/shivakalabs/img  ./public/img
```

## Project Structure

```
src/
  data/services.js       # All service data + WA helpers (single source of truth)
  components/
    Navbar.jsx           # Sticky nav + mobile hamburger
    Footer.jsx           # Site footer
    ServiceCard.jsx      # Single service card
    ServiceGrid.jsx      # Filterable + searchable grid
    CtaStrip.jsx         # WhatsApp CTA section
    FloatingWhatsApp.jsx # Fixed WA button
  pages/
    Home.jsx             # Hero + popular services + FAQ
    About.jsx            # About Us
    ECitizen.jsx         # eCitizen services (category tabs)
    WebDev.jsx           # Web development services
    Design.jsx           # Graphic design services
    Marketing.jsx        # Digital marketing services
    NotFound.jsx         # 404
  App.jsx                # Router + layout
  index.css              # Global CSS design tokens
```

## Routes

| Path          | Page       |
|---------------|------------|
| /             | Home       |
| /about        | About Us   |
| /ecitizen     | eCitizen   |
| /webdev       | Web Dev    |
| /design       | Design     |
| /marketing    | Marketing  |
| *             | 404        |

## Deployment (Netlify/Vercel)

Add SPA redirect so React Router handles all URLs.

**Netlify** — public/_redirects:
```
/*  /index.html  200
```

**Vercel** — vercel.json:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Key Changes vs Original

- Multi-file HTML → Single Page App with React Router
- JS innerHTML injection → React components (Navbar, Footer)
- Global filter variables → useState hooks
- Bootstrap 5 → Custom CSS design tokens
- Vite code splitting → lazy-loaded pages per route
- Services data in one file (src/data/services.js)
