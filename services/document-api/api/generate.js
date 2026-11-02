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
import { getDocumentType } from '../lib/catalog.js';
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

/**
 * Details for one part of a bundle. The cover letter's "background" is
 * built from the CV fields so the customer fills in one form.
 */
export function partDetails(partType, details) {
  if (partType.id !== 'cover-letter') return details;
  const background = [
    details.experience && `Experience:\n${details.experience}`,
    details.education && `Education:\n${details.education}`,
    details.skills && `Skills:\n${details.skills}`,
    details.certifications && `Certificates:\n${details.certifications}`,
  ].filter(Boolean).join('\n\n');
  return { ...details, background };
}

export const handleGenerate = async (body, deps = {}) => {
  const { type, details } = validateOrder(body);
  await checkPayment(body.reference, type, details, deps.verify);

  if (type.format === 'bundle') {
    const partTypes = type.parts.map(getDocumentType);
    const written = await Promise.all(
      partTypes.map(pt => writeDocument(pt, partDetails(pt, details), { client: deps.client })),
    );
    const parts = await Promise.all(partTypes.map(async (pt, i) => ({
      label: pt.name.replace(/ Writing$/, '').replace(/ \/ Resume$/, ''),
      ...(await buildFiles(pt, written[i])),
    })));
    // Top-level fields mirror the first part for older clients.
    return { ...parts[0], parts };
  }

  const written = await writeDocument(type, details, { client: deps.client });
  return buildFiles(type, written);
};

export default postHandler(body => handleGenerate(body));
