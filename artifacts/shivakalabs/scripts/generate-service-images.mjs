/**
 * generate-service-images.mjs — Builds the illustrated card image for every
 * service (public/img/services/<slug>.webp).
 *
 * Images are drawn from code so they stay accurate and consistent: each one
 * shows the service's subject as an icon on a soft, colour-coded background.
 * They deliberately never show fake official documents, logos or stamps.
 *
 * Icons: Lucide (ISC licence), from the `lucide-static` package.
 *
 *   pnpm --filter @workspace/shivakalabs run service-images
 *
 * Only services WITHOUT an image get one, so your own photos are never
 * replaced. Pass --force to redraw every image (this overwrites photos).
 */
import { readFile, mkdir, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import sharp from 'sharp';
import {
  ECITIZEN_SERVICES, WEBDEV_SERVICES, DESIGN_SERVICES, MARKETING_SERVICES, POPULAR_SERVICES, slugify,
} from '../src/data/services.js';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/img/services');
const ICONS = path.join(path.dirname(require.resolve('lucide-static/package.json')), 'icons');

const W = 800;
const H = 380;

// Colour per service area: [deep, mid, tint]
const PALETTE = {
  passport:    ['#1d4e89', '#3b7dd8', '#e7f0fb'],
  immigration: ['#1d4e89', '#3b7dd8', '#e7f0fb'],
  id:          ['#24415f', '#4a78a8', '#e9eff6'],
  birth:       ['#7a3a8c', '#b06ac2', '#f5ecf8'],
  death:       ['#4b5563', '#8b95a5', '#eef0f3'],
  marriage:    ['#9d2f5a', '#d4628f', '#fbeaf1'],
  goodconduct: ['#1f3a68', '#4567a6', '#e8edf7'],
  ntsa:        ['#a3480f', '#e07b39', '#fdf0e6'],
  kra:         ['#126e4d', '#2fa57a', '#e5f5ee'],
  sha:         ['#a21c3c', '#dd4b6b', '#fcebee'],
  nssf:        ['#0f6b6b', '#2aa3a3', '#e3f4f4'],
  helb:        ['#3730a3', '#6366f1', '#ececfd'],
  work:        ['#155e75', '#2a94b3', '#e3f3f8'],
  business:    ['#7a5b0c', '#c9a84c', '#faf3df'],
  land:        ['#5b4a1f', '#9a7f3b', '#f4efe2'],
  county:      ['#334155', '#64748b', '#edf0f4'],
  general:     ['#12844a', '#3cb371', '#e6f5ec'],
  web:         ['#1e3a8a', '#3b82f6', '#e8effd'],
  design:      ['#9d174d', '#e0457b', '#fdebf2'],
  marketing:   ['#b45309', '#f59e0b', '#fef4e2'],
};

// First matching rule picks the icon. Order matters (specific before general).
const RULES = [
  [/lost passport/i, 'book-user'],
  [/passport|travel document|immigration form/i, 'plane'],
  [/visa|citizenship|residence|foreign/i, 'globe'],
  [/\bid status/i, 'id-card'],
  [/birth/i, 'baby'],
  [/death/i, 'flower-2'],
  [/marriage/i, 'heart-handshake'],
  [/good conduct/i, 'shield-check'],
  [/vehicle|logbook/i, 'car-front'],
  [/driving|licen[cs]e|tims/i, 'car'],
  [/pin for company/i, 'building-2'],
  [/kra pin|pin retrieval|pin update/i, 'id-card'],
  [/tax compliance/i, 'file-check-2'],
  [/kra password|itax/i, 'key-round'],
  [/annual returns|cr12/i, 'clipboard-check'],
  [/nssf/i, 'piggy-bank'],
  [/vat|paye|returns?|tax|withholding|p9/i, 'receipt-text'],
  [/dependant/i, 'users-round'],
  [/sha|shif|benefit/i, 'heart-pulse'],
  [/kmtc/i, 'stethoscope'],
  [/helb|kuccps/i, 'graduation-cap'],
  [/tsc/i, 'school'],
  [/ghris/i, 'users'],
  [/ifmis/i, 'briefcase-business'],
  [/agpo/i, 'award'],
  [/linking/i, 'link'],
  [/business name search/i, 'search-check'],
  [/company|business name|sole proprietor/i, 'building-2'],
  [/title|land search/i, 'scale'],
  [/land/i, 'map'],
  [/county|permit/i, 'landmark'],
  [/crb/i, 'file-badge'],
  [/upload/i, 'folder-up'],
  [/form filling/i, 'clipboard-list'],
  [/payment/i, 'smartphone'],
  [/login|password/i, 'key-round'],
  [/account/i, 'user-round-check'],
  // Websites
  [/e-?commerce/i, 'shopping-cart'],
  [/speed/i, 'gauge'],
  [/mobile/i, 'smartphone'],
  [/bug/i, 'bug'],
  [/maintenance|wordpress/i, 'wrench'],
  [/domain|hosting/i, 'server'],
  [/web application/i, 'code'],
  [/seo friendly/i, 'search-code'],
  [/school/i, 'school'],
  [/church|ngo/i, 'hand-coins'],
  [/redesign/i, 'refresh-cw'],
  [/blog/i, 'newspaper'],
  [/portfolio/i, 'file-user'],
  [/landing/i, 'rocket'],
  [/website/i, 'monitor'],
  // Design
  [/logo/i, 'pen-tool'],
  [/business card/i, 'contact'],
  [/invitation/i, 'mail'],
  [/label/i, 'tag'],
  [/menu/i, 'book-open'],
  [/certificate design/i, 'award'],
  [/book|ebook/i, 'book-marked'],
  [/cv|resume/i, 'file-text'],
  [/company profile/i, 'briefcase'],
  [/presentation/i, 'presentation'],
  [/brochure/i, 'layers'],
  [/branding/i, 'palette'],
  [/thumbnail/i, 'video'],
  [/event poster/i, 'ticket'],
  [/poster|flyer|banner|post design|ad creative/i, 'image'],
  // Marketing
  [/google business/i, 'map-pin'],
  [/seo/i, 'search'],
  [/email/i, 'mail-check'],
  [/whatsapp/i, 'message-circle'],
  [/paid ads|campaign/i, 'target'],
  [/lead/i, 'users'],
  [/content/i, 'file-text'],
  [/strategy|growth/i, 'trending-up'],
  [/facebook|instagram|tiktok|social|brand promotion/i, 'megaphone'],
];

const BADGE = { web: 'code', design: 'sparkles', marketing: 'trending-up' };

function iconFor(name) {
  const rule = RULES.find(([re]) => re.test(name));
  if (!rule) throw new Error(`No icon rule for "${name}"`);
  return rule[1];
}

const iconCache = new Map();
async function iconInner(name) {
  if (!iconCache.has(name)) {
    const svg = await readFile(path.join(ICONS, `${name}.svg`), 'utf8');
    iconCache.set(name, svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, ''));
  }
  return iconCache.get(name);
}

// Draws a 24×24 Lucide icon at (x, y) with the given size and stroke colour.
async function icon(name, x, y, size, color, strokeWidth = 2) {
  const s = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${await iconInner(name)}</g>`;
}

async function svgFor(name, area) {
  const [deep, mid, tint] = PALETTE[area];
  const main = iconFor(name);
  const badge = BADGE[area] || 'check';
  const cardW = 290;
  const cardH = 236;
  const cx = W / 2 - 30;
  const cy = H / 2 + 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tint}"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="${mid}" fill-opacity="0.18"/>
    </pattern>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#151922" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <circle cx="${W - 70}" cy="${H - 40}" r="190" fill="${mid}" fill-opacity="0.10"/>
  ${await icon(main, W - 250, H - 230, 260, mid, 1.2).then(g => g.replace('stroke="', 'stroke-opacity="0.16" stroke="'))}
  <g filter="url(#shadow)" transform="rotate(-4 ${cx} ${cy})">
    <rect x="${cx - cardW / 2}" y="${cy - cardH / 2}" width="${cardW}" height="${cardH}" rx="26" fill="#ffffff"/>
    <rect x="${cx - cardW / 2}" y="${cy - cardH / 2}" width="${cardW}" height="10" rx="5" fill="${mid}"/>
    ${await icon(main, cx - 74, cy - 70, 148, deep, 1.6)}
  </g>
  <g filter="url(#shadow)">
    <circle cx="${cx + cardW / 2 - 6}" cy="${cy - cardH / 2 + 4}" r="34" fill="#c9a84c"/>
    ${await icon(badge, cx + cardW / 2 - 6 - 18, cy - cardH / 2 + 4 - 18, 36, '#111111', 2.6)}
  </g>
</svg>`;
}

const areaOf = s => s.category || s.area;
const jobs = new Map();
for (const s of ECITIZEN_SERVICES) jobs.set(slugify(s.name), { name: s.name, area: areaOf(s) });
for (const s of WEBDEV_SERVICES) jobs.set(slugify(s.name), { name: s.name, area: 'web' });
for (const s of DESIGN_SERVICES) jobs.set(slugify(s.name), { name: s.name, area: 'design' });
for (const s of MARKETING_SERVICES) jobs.set(slugify(s.name), { name: s.name, area: 'marketing' });
// Popular cards on the homepage use their own image slugs.
const POPULAR_AREA = { 'business-website-design': 'web', 'logo-design': 'design', 'social-media-management': 'marketing' };
for (const p of POPULAR_SERVICES) {
  if (!jobs.has(p.img)) jobs.set(p.img, { name: p.waMsg || p.name, area: POPULAR_AREA[p.img] || 'general' });
}

const FORCE = process.argv.includes('--force');
const exists = f => access(f).then(() => true, () => false);

await mkdir(OUT, { recursive: true });
let n = 0;
for (const [slug, { name, area }] of jobs) {
  if (!PALETTE[area]) throw new Error(`No palette for area "${area}" (${name})`);
  if (!FORCE && await exists(path.join(OUT, `${slug}.webp`))) continue;
  const svg = await svgFor(name, area);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(path.join(OUT, `${slug}.webp`));
  n++;
}
console.log(`Generated ${n} service image(s) in public/img/services/${FORCE ? " (redrew all)" : " (existing images kept)"}`);
