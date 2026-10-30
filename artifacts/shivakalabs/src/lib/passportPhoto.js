/**
 * passportPhoto.js — In-browser background removal and framing.
 *
 * Uses Google MediaPipe (Apache-2.0) Selfie Segmentation to separate the
 * person from the background and Face Detection to frame the head. Both run
 * on the customer's device; the photo is only uploaded after payment.
 * Models and WebAssembly load from jsDelivr on first use (~6 MB each).
 */

const MP = 'https://cdn.jsdelivr.net/npm/@mediapipe';
const SEG = `${MP}/selfie_segmentation@0.1.1675465747`;
const FACE = `${MP}/face_detection@0.4.1646425229`;
const MAX_SOURCE = 1600;          // longest side we process, in px
const MAX_OUTPUT = 1200;          // longest side of the cutout we upload

const scripts = new Map();
function loadScript(src) {
  if (!scripts.has(src)) {
    scripts.set(src, new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.crossOrigin = 'anonymous';
      s.onload = resolve;
      s.onerror = () => { scripts.delete(src); reject(new Error('Photo tools failed to load. Check your connection and try again.')); };
      document.head.appendChild(s);
    }));
  }
  return scripts.get(src);
}

/** Runs a MediaPipe legacy solution once on an image and resolves with its results. */
async function runSolution(solution, image) {
  return new Promise((resolve, reject) => {
    solution.onResults(resolve);
    solution.send({ image }).catch(reject);
  });
}

/** Decodes a File into a canvas no larger than MAX_SOURCE, respecting EXIF rotation. */
export async function fileToCanvas(file) {
  if (!file || !/^image\//.test(file.type)) throw new Error('Please choose a photo (JPG or PNG).');
  if (file.size > 20 * 1024 * 1024) throw new Error('That photo is over 20 MB. Please choose a smaller one.');
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error('This photo format isn’t supported. Please use a JPG or PNG.');
  }
  const scale = Math.min(1, MAX_SOURCE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  if (Math.min(canvas.width, canvas.height) < 300) throw new Error('This photo is too small. Please use a clearer, larger photo.');
  return canvas;
}

/**
 * Removes the background. Returns { person, face } where `person` is a
 * canvas of the subject on transparency and `face` is the detected face box
 * in pixels ({ x, y, w, h }) or null.
 */
export async function analysePhoto(source) {
  await Promise.all([loadScript(`${SEG}/selfie_segmentation.js`), loadScript(`${FACE}/face_detection.js`)]);
  const { SelfieSegmentation, FaceDetection } = window;
  if (!SelfieSegmentation || !FaceDetection) throw new Error('Photo tools failed to load. Please refresh and try again.');

  const seg = new SelfieSegmentation({ locateFile: f => `${SEG}/${f}` });
  seg.setOptions({ modelSelection: 0, selfieMode: false });
  const face = new FaceDetection({ locateFile: f => `${FACE}/${f}` });
  face.setOptions({ model: 'short', minDetectionConfidence: 0.5, selfieMode: false });

  try {
    const segResult = await runSolution(seg, source);
    const faceResult = await runSolution(face, source);
    const { width, height } = source;

    // Person on transparency: soften the mask edge slightly, then keep only the subject.
    const person = document.createElement('canvas');
    person.width = width;
    person.height = height;
    const ctx = person.getContext('2d');
    ctx.filter = 'blur(1.5px)';
    ctx.drawImage(segResult.segmentationMask, 0, 0, width, height);
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(source, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    const det = faceResult.detections?.[0]?.boundingBox;
    const faceBox = det
      ? { x: (det.xCenter - det.width / 2) * width, y: (det.yCenter - det.height / 2) * height, w: det.width * width, h: det.height * height }
      : null;
    if (!personCoverage(person)) throw new Error('We couldn’t find a person in this photo. Use a clear, front-facing photo.');
    return { person, face: faceBox };
  } finally {
    seg.close?.();
    face.close?.();
  }
}

/** True when a reasonable share of the image is the subject. */
function personCoverage(canvas) {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const x = c.getContext('2d');
  x.drawImage(canvas, 0, 0, s, s);
  const data = x.getImageData(0, 0, s, s).data;
  let on = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) on++;
  return on / (s * s) > 0.05;
}

/** Top of the head: first mostly-opaque row inside the face's columns. */
function headTop(person, face) {
  const ctx = person.getContext('2d');
  const x0 = Math.max(0, Math.round(face.x + face.w * 0.25));
  const w = Math.max(1, Math.round(face.w * 0.5));
  const yEnd = Math.max(1, Math.round(face.y + face.h * 0.3));
  const data = ctx.getImageData(x0, 0, Math.min(w, person.width - x0), yEnd).data;
  const rowW = Math.min(w, person.width - x0);
  for (let y = 0; y < yEnd; y++) {
    let on = 0;
    for (let x = 0; x < rowW; x++) if (data[(y * rowW + x) * 4 + 3] > 128) on++;
    if (on / rowW > 0.3) return y;
  }
  return Math.max(0, face.y - face.h * 0.45);
}

/**
 * Initial framing for a size, as a crop rectangle in source pixels:
 * { cx, cy, h } = crop centre and crop height (width follows the aspect).
 */
export function autoFrame(person, face, size) {
  const aspect = size.widthMm / size.heightMm;
  if (!face) {
    // No face found: centre on the upper part of the subject; the customer adjusts.
    const h = person.height * 0.7;
    return { cx: person.width / 2, cy: person.height * 0.42, h, aspect };
  }
  const top = headTop(person, face);
  const chin = face.y + face.h * 1.02;
  const head = Math.max(10, chin - top);
  const h = head / size.head;
  const topMargin = (1 - size.head) * 0.45 * h;   // a little more space below the chin than above the hair
  return { cx: face.x + face.w / 2, cy: top - topMargin + h / 2, h, aspect };
}

/** Applies the customer's zoom (1 = auto) and nudges (fractions of crop size). */
export function adjustFrame(frame, { zoom = 1, dx = 0, dy = 0 }) {
  const h = frame.h / zoom;
  return { ...frame, h, cx: frame.cx + dx * h * frame.aspect, cy: frame.cy + dy * h };
}

/** Draws the framed subject over a background colour (preview, optionally watermarked). */
export function drawFrame(target, person, frame, bgHex, { watermark = false } = {}) {
  const ctx = target.getContext('2d');
  const { width, height } = target;
  const cropW = frame.h * frame.aspect;
  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(person, frame.cx - cropW / 2, frame.cy - frame.h / 2, cropW, frame.h, 0, 0, width, height);
  if (watermark) {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.font = `700 ${Math.round(width / 11)}px "Josefin Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      ctx.fillText('SHIVAKALABS PREVIEW', 0, i * width / 4.2);
      ctx.strokeText('SHIVAKALABS PREVIEW', 0, i * width / 4.2);
    }
    ctx.restore();
  }
}

/**
 * The transparent cutout that is uploaded after payment, at the exact
 * aspect ratio of the size. Returns { bytes (Uint8Array), hash (hex) }.
 */
export async function exportCutout(person, frame) {
  const cropW = frame.h * frame.aspect;
  const scale = Math.min(1, MAX_OUTPUT / Math.max(cropW, frame.h)) || 1;
  const outH = Math.max(300, Math.round(frame.h * scale));
  const outW = Math.round(outH * frame.aspect);
  const c = document.createElement('canvas');
  c.width = outW;
  c.height = outH;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(person, frame.cx - cropW / 2, frame.cy - frame.h / 2, cropW, frame.h, 0, 0, outW, outH);
  const blob = await new Promise(r => c.toBlob(r, 'image/png'));
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  return { bytes, hash };
}

export function bytesToBase64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
