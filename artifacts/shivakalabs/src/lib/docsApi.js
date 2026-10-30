/**
 * docsApi.js — Browser side of the paid document flow.
 *
 *   createOrder()  → POST /api/order     (validates details, starts Paystack payment)
 *   openPaystack() → Paystack popup       (M-Pesa or card)
 *   generate()     → POST /api/generate  (server verifies payment, returns Word + PDF)
 *
 * The API lives on Vercel (services/document-api). Set VITE_DOCS_API_URL at
 * build time if its URL is not the default below.
 */

export const DOCS_API_URL = (import.meta.env.VITE_DOCS_API_URL || 'https://shivakalabs-docs.vercel.app').replace(/\/+$/, '');

const PAYSTACK_SRC = 'https://js.paystack.co/v2/inline.js';
const PENDING_KEY = 'shivakalabs.pendingDocOrder';
const PENDING_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

async function post(path, body) {
  let res;
  try {
    res = await fetch(`${DOCS_API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Could not connect. Check your internet connection and try again.');
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || `Something went wrong (${res.status}). Please try again.`);
    err.status = res.status;
    throw err;
  }
  return json;
}

export const createOrder = (docType, details) => post('/api/order', { docType, details });
export const generateDocument = (reference, docType, details) => post('/api/generate', { reference, docType, details });

let paystackPromise;
function loadPaystack() {
  if (window.PaystackPop) return Promise.resolve(window.PaystackPop);
  paystackPromise ||= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = PAYSTACK_SRC;
    s.async = true;
    s.onload = () => (window.PaystackPop ? resolve(window.PaystackPop) : reject(new Error('Payment window failed to load.')));
    s.onerror = () => { paystackPromise = undefined; reject(new Error('Payment window failed to load. Check your connection and try again.')); };
    document.head.appendChild(s);
  });
  return paystackPromise;
}

/** Opens the Paystack checkout. Resolves 'success' or 'cancel'; rejects on load errors. */
export async function openPaystack(accessCode) {
  const PaystackPop = await loadPaystack();
  return new Promise((resolve, reject) => {
    new PaystackPop().resumeTransaction(accessCode, {
      onSuccess: () => resolve('success'),
      onCancel: () => resolve('cancel'),
      onError: e => reject(new Error(e?.message || 'Payment could not start. Please try again.')),
    });
  });
}

/** Triggers a browser download of a base64 file. */
export function downloadBase64(base64, fileName, mime) {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export const PDF_MIME = 'application/pdf';

// ── Pending order (survives a refresh between paying and downloading) ──────
// Kept only in this browser; cleared once the files are downloaded.
export function savePending(order) {
  try { localStorage.setItem(PENDING_KEY, JSON.stringify({ ...order, savedAt: Date.now() })); } catch { /* storage blocked */ }
}
export function loadPending() {
  try {
    const order = JSON.parse(localStorage.getItem(PENDING_KEY) || 'null');
    if (order && Date.now() - order.savedAt < PENDING_MAX_AGE) return order;
    localStorage.removeItem(PENDING_KEY);
  } catch { /* storage blocked or corrupt */ }
  return null;
}
export function clearPending() {
  try { localStorage.removeItem(PENDING_KEY); } catch { /* storage blocked */ }
}
