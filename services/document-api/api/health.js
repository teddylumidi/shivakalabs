/**
 * GET /api/health — Shows whether the API is configured (never shows secrets).
 */
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    payments: Boolean(process.env.PAYSTACK_SECRET_KEY),
    paystackMode: process.env.PAYSTACK_SECRET_KEY?.startsWith('sk_live_') ? 'live' : 'test',
    writer: Boolean(process.env.ANTHROPIC_API_KEY),
  });
}
