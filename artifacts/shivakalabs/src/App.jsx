/**
 * App.jsx — Root application component.
 * Shared layout (Navbar, Footer, FloatingWhatsApp) plus routes, with each
 * page lazy-loaded for code splitting.
 *
 * <AppShell> has no router of its own so the same tree can render in the
 * browser (<App>, BrowserRouter) and at build time (entry-server.jsx,
 * StaticRouter) to prerender every page to static HTML.
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar           from './components/Navbar';
import Footer           from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Seo              from './components/Seo';
import ScrollManager    from './components/ScrollManager';

// Vite's BASE_URL is '/shivakalabs/' on GitHub Pages and '/' elsewhere.
export const BASENAME = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

// Lazy-load pages for performance (code splitting)
const Home      = lazy(() => import('./pages/Home'));
const About     = lazy(() => import('./pages/About'));
const ECitizen  = lazy(() => import('./pages/ECitizen'));
const WebDev    = lazy(() => import('./pages/WebDev'));
const Design    = lazy(() => import('./pages/Design'));
const Marketing = lazy(() => import('./pages/Marketing'));
const NotFound  = lazy(() => import('./pages/NotFound'));

/** Full-screen loading spinner shown during page lazy-load */
function PageLoader() {
  return (
    <div role="status" aria-label="Loading page" style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <i className="fa fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--gold)' }} />
    </div>
  );
}

export function AppShell() {
  return (
    <>
      <Seo />
      <ScrollManager />
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Shared layout wrapper */}
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/ecitizen"  element={<ECitizen />} />
            <Route path="/webdev"    element={<WebDev />} />
            <Route path="/design"    element={<Design />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <AppShell />
    </BrowserRouter>
  );
}
