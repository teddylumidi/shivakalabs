/**
 * http.js — CORS + JSON helpers shared by the API routes.
 */
import { HttpError } from './order.js';

const DEFAULT_ORIGINS = [
  'https://teddylumidi.github.io',
  'https://shivakalabs.com',
  'https://www.shivakalabs.com',
  'http://localhost:5173',
];

function allowedOrigins() {
  const env = process.env.ALLOWED_ORIGINS;
  return env ? env.split(',').map(s => s.trim()).filter(Boolean) : DEFAULT_ORIGINS;
}

/** Wraps a POST handler with CORS, method checks and error handling. */
export function postHandler(fn) {
  return async function handler(req, res) {
    const origin = req.headers.origin;
    if (origin && allowedOrigins().includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Max-Age', '86400');
    }
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
    if (origin && !allowedOrigins().includes(origin)) return res.status(403).json({ error: 'Origin not allowed.' });

    try {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body || '{}');
      const result = await fn(body || {});
      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
      if (err instanceof SyntaxError) return res.status(400).json({ error: 'Invalid JSON.' });
      console.error('Unhandled error:', err);
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  };
}
