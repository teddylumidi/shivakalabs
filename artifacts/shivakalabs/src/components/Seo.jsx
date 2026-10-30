/**
 * Seo.jsx — Keeps <title>, meta description, canonical and Open Graph tags
 * in sync with the current route during client-side navigation.
 * The initial HTML for each route is generated at build time with the same
 * values (scripts/postbuild.mjs), so crawlers see correct tags without JS.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageFor, canonicalPath, NOT_FOUND } from '../data/pages';

const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/+$/, '');

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageFor(pathname);
    const meta = page || NOT_FOUND;
    const url = page ? `${SITE_URL}${canonicalPath(page.path)}` : '';

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="robots"]', 'content', page ? 'index, follow' : 'noindex');
    if (url) {
      setMeta('link[rel="canonical"]', 'href', url);
      setMeta('meta[property="og:url"]', 'content', url);
    }
  }, [pathname]);

  return null;
}
