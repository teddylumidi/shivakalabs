/**
 * compress-images.mjs
 * Converts all public/img PNG and JPG files to WebP using sharp.
 * Originals are kept as fallback. WebP copies sit alongside them.
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR   = path.resolve(__dirname, '../public/img');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else if (/\.(png|jpg|jpeg)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function compress(file) {
  const ext     = path.extname(file);
  const webp    = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
  const before  = (await stat(file)).size;

  await sharp(file)
    .webp({ quality: 78, effort: 4 })
    .toFile(webp);

  const after = (await stat(webp)).size;
  const pct   = Math.round((1 - after / before) * 100);
  console.log(`${path.relative(IMG_DIR, file).padEnd(60)} ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${pct}%)`);
}

const files = await walk(IMG_DIR);
console.log(`Compressing ${files.length} images…\n`);
// Run in batches of 8 to avoid memory spikes
for (let i = 0; i < files.length; i += 8) {
  await Promise.all(files.slice(i, i + 8).map(compress));
}
console.log('\nDone.');
