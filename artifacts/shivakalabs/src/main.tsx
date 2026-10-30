import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './app.css';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are prerendered to HTML at build time; hydrate that markup when it
// exists (production), otherwise render from scratch (dev server).
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
