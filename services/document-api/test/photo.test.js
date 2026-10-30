import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { handlePhoto } from '../api/photo.js';
import { handlePhotoOrder } from '../api/photo-order.js';
import { photoHash } from '../lib/photo.js';

// A transparent PNG with an opaque "person" ellipse in the middle.
async function cutout(w, h) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><ellipse cx="${w / 2}" cy="${h * 0.55}" rx="${w * 0.3}" ry="${h * 0.4}" fill="#7a4b2a"/></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
const paid = (hash, sizeId, extra = {}) => async () => ({
  status: 'success', currency: 'KES', amount: 5000, paid_at: new Date().toISOString(),
  metadata: { doc_type: 'passport-photo', size_id: sizeId, photo_hash: hash }, ...extra,
});

test('photo order validates input and charges KSh 50', async () => {
  let sent;
  const out = await handlePhotoOrder({ sizeId: 'ke-passport', email: 'a@b.co', photoHash: 'a'.repeat(64) }, { initialize: async a => { sent = a; return { accessCode: 'x' }; } });
  assert.equal(out.amount, 50);
  assert.equal(sent.amountKes, 50);
  assert.equal(sent.metadata.size_id, 'ke-passport');
  await assert.rejects(handlePhotoOrder({ sizeId: 'nope', email: 'a@b.co', photoHash: 'a'.repeat(64) }), /Unknown photo size/);
  await assert.rejects(handlePhotoOrder({ sizeId: 'ke-passport', email: 'a@b.co', photoHash: 'zz' }), /Photo is missing/);
});

test('paid photo returns a 50x50 mm JPG under 300 KB and an A4 sheet', async () => {
  const png = await cutout(600, 600);
  const ref = 'SL-PP-20261030-ABCDEF12';
  const out = await handlePhoto({ reference: ref, sizeId: 'ke-passport', background: 'white', image: png.toString('base64') }, { verify: paid(photoHash(png), 'ke-passport') });
  const jpg = Buffer.from(out.jpg, 'base64');
  const meta = await sharp(jpg).metadata();
  assert.equal(meta.format, 'jpeg');
  assert.equal(meta.width, 1181);
  assert.equal(meta.height, 1181);
  assert.ok(jpg.length <= 300 * 1024, `jpg ${jpg.length} bytes`);
  const corner = await sharp(jpg).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer();
  assert.ok(corner[0] > 245 && corner[1] > 245 && corner[2] > 245, 'background is white');
  assert.equal(Buffer.from(out.pdf, 'base64').subarray(0, 4).toString(), '%PDF');
  assert.equal(out.copies, 15);
});

test('background colour can change after payment; other photos and sizes cannot reuse it', async () => {
  const png = await cutout(350, 450);
  const ref = 'SL-PP-20261030-ABCDEF12';
  const verify = paid(photoHash(png), 'standard-35x45');
  const blue = await handlePhoto({ reference: ref, sizeId: 'standard-35x45', background: '#3a6fb0', image: png.toString('base64') }, { verify });
  const px = await sharp(Buffer.from(blue.jpg, 'base64')).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer();
  assert.ok(px[2] > px[0] + 60, 'background is blue');
  const other = await cutout(350, 450).then(b => sharp(b).modulate({ brightness: 0.9 }).png().toBuffer());
  await assert.rejects(handlePhoto({ reference: ref, sizeId: 'standard-35x45', background: 'white', image: other.toString('base64') }, { verify }), /different photo/);
  await assert.rejects(handlePhoto({ reference: ref, sizeId: 'standard-35x45', background: 'white', image: (await cutout(500, 500)).toString('base64') }, { verify }), /not framed/);
  await assert.rejects(handlePhoto({ reference: ref, sizeId: 'standard-35x45', background: 'javascript:1', image: png.toString('base64') }, { verify }), /valid background/);
});
