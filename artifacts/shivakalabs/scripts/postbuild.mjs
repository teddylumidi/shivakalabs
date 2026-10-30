/**
 * postbuild.mjs — Runs after `vite build`.
 *
 * For every route in src/data/pages.js it writes a static HTML file with the
 * page's content prerendered and its own title, description, canonical URL
 * and Open Graph tags. It also writes 404.html (GitHub Pages serves it for
 * unknown URLs), sitemap.xml and robots.txt.
 */
import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { PAGES, NOT_FOUND, canonicalPath } from '../src/data/pages.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'dist/public');
const SERVER_ENTRY = path.join(ROOT, 'dist/server/entry-server.js');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://teddylumidi.github.io/shivakalabs').replace(/\/+$/, '');

const esc = s =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`postbuild: could not find ${label} in index.html`);
  return html.replace(pattern, replacement);
}

function applyMeta(template, { title, description, url, noindex }) {
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, '<title>');
  for (const [attr, name, value] of [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'robots', noindex ? 'noindex' : 'index, follow'],
  ]) {
    html = setTag(
      html,
      new RegExp(`<meta ${attr}="${name}" content="[^"]*" />`),
      `<meta ${attr}="${name}" content="${esc(value)}" />`,
      `${name} meta`,
    );
  }
  if (url) {
    html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${esc(url)}" />`, 'canonical');
    html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${esc(url)}" />`, 'og:url');
  } else {
    html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '').replace(/\s*<meta property="og:url" content="[^"]*" \/>/, '');
  }
  return html;
}

async function writePage(relPath, html) {
  const file = path.join(OUT, relPath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`  ${relPath}`);
}

const template = await readFile(path.join(OUT, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('postbuild: <div id="root"></div> not found in index.html');
}
const { render } = await import(pathToFileURL(SERVER_ENTRY).href);
const withBody = (html, body) => html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

console.log('Prerendering pages:');
for (const page of PAGES) {
  const url = `${SITE_URL}${canonicalPath(page.path)}`;
  const body = await render(page.path);
  const html = withBody(applyMeta(template, { ...page, url }), body);
  await writePage(page.path === '/' ? 'index.html' : `${page.path.slice(1)}/index.html`, html);
}

const notFoundBody = await render('/404');
await writePage('404.html', withBody(applyMeta(template, { ...NOT_FOUND, noindex: true }), notFoundBody));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  p => `  <url>
    <loc>${SITE_URL}${canonicalPath(p.path)}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
).join('\n')}
</urlset>
`;
await writePage('sitemap.xml', sitemap);
await writePage('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await rm(path.join(ROOT, 'dist/server'), { recursive: true, force: true });
console.log('Done.');
