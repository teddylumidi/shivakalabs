/**
 * photo.js — Passport photo orders and output.
 *
 * The browser removes the background and frames the face, then sends a
 * transparent PNG ("cutout") already at the chosen size's aspect ratio.
 * Payment is bound to the SHA-256 of that cutout, so one payment buys one
 * photo; the background colour can still be changed after paying.
 */
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { PDFDocument, rgb } from 'pdf-lib';
import { HttpError } from './order.js';
import { PHOTO_PRODUCT, PHOTO_SIZES, PHOTO_BACKGROUNDS } from './catalog.js';

const DPI = 600;
const MAX_JPEG_BYTES = 300 * 1024;          // eCitizen upload limit
const MAX_CUTOUT_BYTES = 3 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HEX_RE = /^#[0-9a-f]{6}$/i;

const mmToPx = mm => Math.round((mm / 25.4) * DPI);
export const photoHash = buf => createHash('sha256').update(buf).digest('hex');

export function getSize(id) {
  const size = PHOTO_SIZES.find(s => s.id === id);
  if (!size) throw new HttpError(400, 'Unknown photo size.');
  return size;
}

export function resolveBackground(value) {
  const preset = PHOTO_BACKGROUNDS.find(b => b.id === value);
  if (preset) return preset.hex;
  if (typeof value === 'string' && HEX_RE.test(value)) return value.toLowerCase();
  throw new HttpError(400, 'Choose a valid background colour.');
}

/** Validates /api/photo-order input. */
export function validatePhotoOrder(body) {
  const size = getSize(body?.sizeId);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Please enter a valid email address.');
  const hash = typeof body.photoHash === 'string' ? body.photoHash.toLowerCase() : '';
  if (!/^[0-9a-f]{64}$/.test(hash)) throw new HttpError(400, 'Photo is missing. Please upload it again.');
  const name = typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 80) : '';
  return { size, email, hash, name, price: PHOTO_PRODUCT.price };
}

/** Decodes and checks the uploaded cutout. Returns { buf, meta }. */
export async function readCutout(base64, size) {
  if (typeof base64 !== 'string' || !base64) throw new HttpError(400, 'Photo is missing. Please upload it again.');
  const buf = Buffer.from(base64.replace(/^data:image\/png;base64,/, ''), 'base64');
  if (buf.length > MAX_CUTOUT_BYTES) throw new HttpError(413, 'Photo is too large.');
  let meta;
  try { meta = await sharp(buf).metadata(); } catch { throw new HttpError(400, 'Photo could not be read. Please upload it again.'); }
  if (meta.format !== 'png' || !meta.width || !meta.height) throw new HttpError(400, 'Photo could not be read. Please upload it again.');
  const want = size.widthMm / size.heightMm;
  if (Math.abs(meta.width / meta.height - want) > 0.02) throw new HttpError(400, 'Photo is not framed for this size. Please frame it again.');
  if (meta.width < 200) throw new HttpError(400, 'Photo resolution is too low. Use a clearer photo.');
  return { buf, meta };
}

/** Flattens the cutout onto the background and returns a JPEG under 300 KB. */
export async function renderPhotoJpeg(cutout, size, bgHex) {
  const width = mmToPx(size.widthMm);
  const height = mmToPx(size.heightMm);
  const flat = sharp(cutout).resize(width, height, { fit: 'fill', kernel: 'lanczos3' }).flatten({ background: bgHex });
  let out;
  for (const quality of [92, 85, 78, 70, 62]) {
    out = await flat.clone().jpeg({ quality, mozjpeg: true, chromaSubsampling: '4:4:4' }).withMetadata({ density: DPI }).toBuffer();
    if (out.length <= MAX_JPEG_BYTES) break;
  }
  return out;
}

/** A4 print sheet: as many copies as fit, at exact size, with light cut guides. */
export async function renderPhotoSheet(jpeg, size) {
  const MM = 72 / 25.4;
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Passport photos ${size.widthMm}x${size.heightMm} mm`);
  pdf.setCreator('ShivakaLabs');
  const page = pdf.addPage([210 * MM, 297 * MM]);
  const img = await pdf.embedJpg(jpeg);
  const w = size.widthMm * MM;
  const h = size.heightMm * MM;
  const gap = 4 * MM;
  const margin = 12 * MM;
  const cols = Math.floor((210 * MM - 2 * margin + gap) / (w + gap));
  const rows = Math.floor((297 * MM - 2 * margin + gap) / (h + gap));
  const startX = (210 * MM - (cols * w + (cols - 1) * gap)) / 2;
  const startY = 297 * MM - margin - h;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (w + gap);
      const y = startY - r * (h + gap);
      page.drawImage(img, { x, y, width: w, height: h });
      page.drawRectangle({ x, y, width: w, height: h, borderColor: rgb(0.75, 0.75, 0.75), borderWidth: 0.3 });
    }
  }
  return { pdf: Buffer.from(await pdf.save()), copies: rows * cols };
}
