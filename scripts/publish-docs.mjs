/**
 * publish-docs.mjs — Builds the site and copies it into /docs.
 *
 * GitHub Pages for this repo is set to "Deploy from a branch: main /docs",
 * so the built site must be committed in /docs. Run after any change:
 *
 *   pnpm run publish
 *
 * then commit and push. Works on Windows, macOS and Linux.
 */
import { execSync } from 'child_process';
import { cp, rm, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'artifacts/shivakalabs/dist/public');
const DOCS = path.join(ROOT, 'docs');

execSync('pnpm --filter @workspace/shivakalabs run build', {
  cwd: ROOT,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    BASE_PATH: '/shivakalabs/',
    VITE_SITE_URL: process.env.VITE_SITE_URL || 'https://teddylumidi.github.io/shivakalabs',
  },
});

await rm(DOCS, { recursive: true, force: true });
await cp(DIST, DOCS, { recursive: true });
// Serve files as-is; stop GitHub Pages from running Jekyll over the build.
await writeFile(path.join(DOCS, '.nojekyll'), '');
console.log('\nPublished build to docs/. Commit and push to update the live site.');
