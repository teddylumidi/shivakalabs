/**
 * paystack.js — Minimal Paystack client (initialize + verify).
 * Docs: https://paystack.com/docs/payments/accept-payments/
 *
 * Amounts are sent in the currency subunit: KES 100 → 10000.
 */
import { HttpError } from './order.js';

const API = 'https://api.paystack.co';

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new HttpError(503, 'Payments are not configured yet. Please order on WhatsApp.');
  return key;
}

async function call(path, init = {}) {
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${secretKey()}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    });
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(502, 'Could not reach the payment provider. Please try again.');
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.status) {
    // Paystack returns 400 "Transaction reference not found" for unknown refs.
    const msg = json?.message || `Payment provider error (${res.status}).`;
    throw new HttpError(res.status === 404 || res.status === 400 ? 400 : 502, msg);
  }
  return json.data;
}

/** Starts a transaction; the browser opens it with PaystackPop.resumeTransaction(accessCode). */
export async function initializeTransaction({ email, amountKes, reference, metadata }) {
  const data = await call('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email,
      amount: String(Math.round(amountKes * 100)),
      currency: 'KES',
      reference,
      channels: ['mobile_money', 'card'],
      metadata,
    }),
  });
  return { accessCode: data.access_code, reference: data.reference };
}

/** Returns the verified transaction data object. */
export async function verifyTransaction(reference) {
  const data = await call(`/transaction/verify/${encodeURIComponent(reference)}`);
  if (typeof data.metadata === 'string') {
    try { data.metadata = JSON.parse(data.metadata); } catch { data.metadata = {}; }
  }
  return data;
}
