/**
 * entry-server.jsx — Build-time renderer used by scripts/postbuild.mjs to
 * prerender each route to static HTML (better SEO and faster first paint).
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell, BASENAME } from './App';

export async function render(pathname) {
  const location = (BASENAME === '/' ? '' : BASENAME) + pathname;
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter basename={BASENAME} location={location}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
