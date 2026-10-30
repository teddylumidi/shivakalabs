/**
 * POST /api/generate — Step 2: verify payment, write the document, return files.
 *
 * Body:    { reference, docType, details }  (same details as /api/order)
 * Returns: { fileName, docx, pdf }  — docx and pdf are base64 strings
 *
 * Nothing is written until Paystack confirms the payment succeeded for the
 * right amount, in KES, for this exact document type and these exact details.
 * The same paid order can be generated again (e.g. if the download failed).
 */
import { postHandler } from '../lib/http.js';
import { HttpError, validateOrder, orderHash } from '../lib/order.js';
import { verifyTransaction } from '../lib/paystack.js';
import { writeDocument } from '../lib/writer.js';
import { toBlocks, fileStem } from '../lib/layout.js';
import { renderDocx } from '../lib/render-docx.js';
import { renderPdf } from '../lib/render-pdf.js';

const MAX_ORDER_AGE_DAYS = 7;
const REF_RE = /^SL-[A-Z]{1,4}-\d{8}-[0-9A-F]{8}$/;

export async function checkPayment(reference, type, details, verify = verifyTransaction) {
  if (typeof reference !== 'string' || !REF_RE.test(reference)) throw new HttpError(400, 'Invalid payment reference.');
  const tx = await verify(reference);
  if (tx.status !== 'success') throw new HttpError(402, 'Payment not received yet. If you have paid, wait a moment and try again.');
  if (tx.currency !== 'KES' || Number(tx.amount) !== type.price * 100) throw new HttpError(402, 'Payment amount does not match this document.');
  if (tx.metadata?.doc_type !== type.id) throw new HttpError(403, 'This payment is for a different document.');
  if (tx.metadata?.details_hash !== orderHash(type.id, details)) throw new HttpError(403, 'Details changed after payment. Use the details you paid with, or contact us on WhatsApp.');
  const paidAt = Date.parse(tx.paid_at || tx.paidAt || tx.created_at || '');
  if (paidAt && Date.now() - paidAt > MAX_ORDER_AGE_DAYS * 864e5) throw new HttpError(410, 'This order has expired. Contact us on WhatsApp for help.');
  return tx;
}

export async function buildFiles(type, written) {
  const blocks = toBlocks(written);
  const stem = fileStem(written.kind, written.content, type.name);
  const [docx, pdf] = await Promise.all([
    renderDocx(blocks, { title: stem.replace(/-/g, ' ') }),
    renderPdf(blocks, { title: stem.replace(/-/g, ' ') }),
  ]);
  return { fileName: stem, docx: docx.toString('base64'), pdf: pdf.toString('base64') };
}

export const handleGenerate = async (body, deps = {}) => {
  const { type, details } = validateOrder(body);
  await checkPayment(body.reference, type, details, deps.verify);
  const written = await writeDocument(type, details, { client: deps.client });
  return buildFiles(type, written);
};

export default postHandler(body => handleGenerate(body));
