# ShivakaLabs Document API

Serverless API (Vercel) behind the website's **CV & Documents** page.
Customers fill in their details, pay with M-Pesa or card through Paystack,
and download their document as Word (.docx) and PDF.

```
Browser                         This API (Vercel)                Paystack / Claude
───────                         ─────────────────                ─────────────────
details form ── POST /api/order ──► validate, price from catalog ──► initialize transaction
Paystack popup ◄── accessCode ──────┘
(M-Pesa / card)
paid ────────── POST /api/generate ► verify payment (status, KES,  ──► verify transaction
                                     amount, doc type, details hash)
                                     write content ──────────────────► Claude API
Word + PDF ◄──── base64 files ──────┘ render DOCX + PDF
```

Nothing is written until Paystack confirms the payment. Prices live in
`lib/catalog.js` (also imported by the website, so the shown price is the charged price).

## Files

| Path | Purpose |
|---|---|
| `lib/catalog.js` | Document types, prices (KES), form fields, what to prepare |
| `api/order.js` | `POST /api/order` — validate details, start Paystack payment |
| `api/generate.js` | `POST /api/generate` — verify payment, write and return files |
| `api/health.js` | `GET /api/health` — shows whether keys are configured (never the keys) |
| `lib/writer.js` | Claude prompt and writing rules per document type |
| `lib/layout.js`, `lib/render-*.js` | Turn written content into matching Word and PDF files |

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Required | Value |
|---|---|---|
| `PAYSTACK_SECRET_KEY` | yes | `sk_test_…` while testing, then `sk_live_…` |
| `ANTHROPIC_API_KEY` | yes | From console.anthropic.com |
| `ANTHROPIC_MODEL` | no | Defaults to `claude-sonnet-5-5` |
| `ALLOWED_ORIGINS` | no | Comma-separated site origins; defaults to the GitHub Pages and shivakalabs.com origins |

Never commit keys. The Paystack **public** key is not needed: the browser
opens the payment with the access code returned by `/api/order`.

## Deploy

1. Vercel → Add New Project → import `teddylumidi/shivakalabs`.
2. Set **Root Directory** to `services/document-api`. Framework preset: Other. No build command.
3. Add the environment variables above, then deploy.
4. Check `https://<project>.vercel.app/api/health` shows `payments: true, writer: true`.
5. If the project URL is not `https://shivakalabs-docs.vercel.app`, set
   `VITE_DOCS_API_URL` when publishing the site (see the root `replit.md`).

Test with Paystack test keys and test cards/M-Pesa numbers first, then swap to live keys.

## Test locally

```
npm install
npm test        # offline: Paystack and Claude are faked
```

## Limits worth knowing

- One payment buys one document (type + exact details). It can be re-downloaded
  for 7 days, which also lets customers recover if a download fails.
- There is no database: orders are tracked through Paystack. Each re-download
  calls Claude again, so very heavy re-use would cost a few shillings in API usage.
- PDFs use built-in Helvetica (Latin characters only); Word files use Calibri.
