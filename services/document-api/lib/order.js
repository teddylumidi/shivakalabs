/**
 * order.js — Validates customer details and fingerprints an order.
 *
 * The fingerprint (SHA-256 of the document type + normalised details) is
 * stored in the Paystack transaction metadata when the order is created.
 * When the customer asks for the document, the details they send must hash
 * to the same value, so one payment buys one specific document: it can be
 * re-downloaded, but it can't be reused to write a different document.
 */
import { createHash, randomBytes } from 'node:crypto';
import { getDocumentType, BLOCKED_DOCUMENTS } from './catalog.js';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns { type, details } or throws HttpError(400). */
export function validateOrder(body) {
  if (!body || typeof body !== 'object') throw new HttpError(400, 'Invalid request.');
  const type = getDocumentType(body.docType);
  if (!type) throw new HttpError(400, 'Unknown document type.');

  const raw = body.details && typeof body.details === 'object' ? body.details : {};
  const details = {};
  for (const field of type.fields) {
    const value = typeof raw[field.key] === 'string' ? raw[field.key].replace(/\r\n/g, '\n').trim() : '';
    if (field.required && !value) throw new HttpError(400, `Please fill in: ${field.label}.`);
    if (value.length > field.max) throw new HttpError(400, `${field.label} is too long (max ${field.max} characters).`);
    if (value && field.type === 'email' && !EMAIL_RE.test(value)) throw new HttpError(400, 'Please enter a valid email address.');
    if (value) details[field.key] = value;
  }
  if (type.id === 'custom-document' && BLOCKED_DOCUMENTS.test(details.documentType || '')) {
    throw new HttpError(400, 'We can’t prepare official records such as certificates, statements, receipts or IDs. Message us on WhatsApp if you need help getting the real document.');
  }
  return { type, details };
}

/** Stable fingerprint of a validated order. Keys are sorted so order never matters. */
export function orderHash(typeId, details) {
  const sorted = Object.keys(details).sort().map(k => [k, details[k]]);
  return createHash('sha256').update(JSON.stringify([typeId, sorted])).digest('hex');
}

/** Unique, readable payment reference, e.g. SL-CV-20261030-8F3A1C9D. */
export function newReference(typeId) {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const code = typeId.split('-').map(w => w[0]).join('').toUpperCase();
  return `SL-${code}-${day}-${randomBytes(4).toString('hex').toUpperCase()}`;
}
