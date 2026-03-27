# Shivakalabs Website

## Project Overview
A single-page business website for **Shivakalabs** — a Kenyan digital services agency (AI-powered internet company). Built with vanilla HTML, CSS, and JavaScript. All content is in one file: `index.html`.

## Architecture
- **Single file**: `index.html` (~1600 lines) contains all HTML, CSS, and JavaScript
- **Asset**: `logo.png` (site logo)
- **Server**: Python HTTP server on port 5000

## Pages (JS-driven SPA)
| Page ID | Route | Description |
|---|---|---|
| `page-home` | Default | Hero + popular services grid |
| `page-ecitizen` | eCitizen Services | Filterable eCitizen service cards |
| `page-webdev` | Web Dev | Web development services |
| `page-design` | Design | Graphic design services |
| `page-marketing` | Marketing | Digital marketing services |
| `page-other` | Other | Other services |
| `page-ai` | AI Tools | AI-powered services with prices |
| `page-docgen` | Doc Gen | Document generation SaaS platform |
| `page-about` | About | Company information |
| `page-contact` | Contact | Contact form and info |

## Key Features
- **eCitizen Services**: Filterable service cards with SVG category icons
- **AI Tools Page**: CV writing, image generation, photo retouching, passport photos, web dev, chatbot — all with prices
- **Document Gen Platform**: 8 document categories (Professional, Academic, Business, Legal, Creative, Personal, Technical, Translation) + 4 pricing plans (Free, Basic KES 999/mo, Pro KES 2,499/mo, Enterprise)
- **Multi-language**: EN/SW (English/Swahili) switcher — `setLang(lang)` updates all `data-en`/`data-sw` attributes
- **Multi-currency**: KES, USD, EUR, GBP, UGX, TZS — `setCurr(code)` converts all `.price-display[data-kes]` elements
- **Chatbot Widget**: Floating chat assistant with conversation flows for all service categories, connects to WhatsApp
- **WhatsApp Integration**: All CTAs link to `wa.me/254716358703` with pre-filled messages

## Design System
- Dark theme: `#0a0a0a` background, `#111` cards
- Gold accent: `#e8a000` / `var(--gold)`
- WhatsApp green: `#25d366`
- Typography: Bebas Neue (headings) + Plus Jakarta Sans (body)

## JavaScript Functions
- `showPage(name, eciCatOverride)` — SPA page routing
- `renderGrid(gridId, services, pageType)` — render service card grids
- `renderEci()` — render filterable eCitizen grid
- `setLang(lang)` — switch UI language (en/sw)
- `setCurr(code)` — switch displayed currency
- `applyCurrencyDisplay()` — update all price elements
- `toggleChat()` — open/close chatbot widget
- `renderChatFlow(flowKey)` — render chatbot conversation flow

## WhatsApp Number
`+254 716 358 703`
