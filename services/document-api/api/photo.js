/**
 * POST /api/photo — Verify payment and return the finished passport photo.
 *
 * Body:    { reference, sizeId, background, image }  (image = cutout PNG, base64)
 * Returns: { fileName, jpg, pdf, copies }  (jpg and pdf are base64)
 *
 * The background can be changed and the photo downloaded again after paying.
 */
import { postHandler } from '../lib/http.js';
import { HttpError } from '../lib/order.js';
import { verifyTransaction } from '../lib/paystack.js';
import { PHOTO_PRODUCT } from '../lib/catalog.js';
import { getSize, resolveBackground, readCutout, photoHash, renderPhotoJpeg, renderPhotoSheet } from '../lib/photo.js';

const REF_RE = /^SL-[A-Z]{1,4}-\d{8}-[0-9A-F]{8}$/;
const MAX_AGE_DAYS = 7;

export const handlePhoto = async (body, deps = {}) => {
  const size = getSize(body?.sizeId);
  const bg = resolveBackground(body.background);
  const { buf } = await readCutout(body.image, size);

  if (typeof body.reference !== 'string' || !REF_RE.test(body.reference)) throw new HttpError(400, 'Invalid payment reference.');
  const tx = await (deps.verify || verifyTransaction)(body.reference);
  if (tx.status !== 'success') throw new HttpError(402, 'Payment not received yet. If you have paid, wait a moment and try again.');
  if (tx.currency !== 'KES' || Number(tx.amount) !== PHOTO_PRODUCT.price * 100) throw new HttpError(402, 'Payment amount does not match.');
  if (tx.metadata?.doc_type !== PHOTO_PRODUCT.id || tx.metadata?.size_id !== size.id) throw new HttpError(403, 'This payment is for a different product or size.');
  if (tx.metadata?.photo_hash !== photoHash(buf)) throw new HttpError(403, 'This payment is for a different photo.');
  const paidAt = Date.parse(tx.paid_at || tx.paidAt || '');
  if (paidAt && Date.now() - paidAt > MAX_AGE_DAYS * 864e5) throw new HttpError(410, 'This order has expired. Contact us on WhatsApp for help.');

  const jpg = await renderPhotoJpeg(buf, size, bg);
  const { pdf, copies } = await renderPhotoSheet(jpg, size);
  return {
    fileName: `passport-photo-${size.widthMm}x${size.heightMm}mm`,
    jpg: jpg.toString('base64'),
    pdf: pdf.toString('base64'),
    copies,
  };
};

export default postHandler(body => handlePhoto(body));
