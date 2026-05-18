/**
 * App.jsx — Root application component.
 * Sets up React Router with a shared layout (Navbar, Footer, FloatingWhatsApp)
 * and lazy-loads each page for code splitting.
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Navbar           from './components/Navbar';
import Footer           from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

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
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <i className="fa fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--gold)' }} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Shared layout wrapper */}
      <Navbar />

      <main>
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
    </BrowserRouter>
  );
}
