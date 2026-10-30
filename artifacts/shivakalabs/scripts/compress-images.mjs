/**
 * compress-images.mjs
 * Converts every PNG/JPG under public/img to WebP and removes the original.
 * The site only references .webp files, so run this after adding new images:
 *
 *   pnpm --filter @workspace/shivakalabs run images
 *
 * Service card images are named after the service (see slugify() in
 * src/data/services.js), e.g. "Logo Design" -> img/services/logo-design.webp.
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.resolve(__dirname, '../public/img');
const MAX_WIDTH = 1200;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(png|jpe?g)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function convert(file) {
  const webp = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const before = (await stat(file)).size;

  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(webp);
  await unlink(file);

  const after = (await stat(webp)).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `${path.relative(IMG_DIR, file).padEnd(60)} ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (-${pct}%)`,
  );
}

const files = await walk(IMG_DIR);
if (files.length === 0) {
  console.log('No PNG/JPG images to convert.');
} else {
  console.log(`Converting ${files.length} images to WebP...\n`);
  for (let i = 0; i < files.length; i += 8) {
    await Promise.all(files.slice(i, i + 8).map(convert));
  }
  console.log('\nDone.');
}
