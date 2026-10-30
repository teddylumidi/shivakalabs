/**
 * ScrollManager.jsx — Scroll behaviour for client-side navigation:
 *  - scrolls to the top when the page changes
 *  - scrolls to an in-page section when the URL has a hash (e.g. /#faq)
 *  - upgrades old hash-router links (/#/ecitizen) to clean URLs (/ecitizen)
 */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // Old links were shared as /#/page before the switch to clean URLs.
  useEffect(() => {
    if (hash.startsWith('#/')) {
      navigate(hash.slice(1), { replace: true });
    }
  }, [hash, navigate]);

  useEffect(() => {
    if (hash && !hash.startsWith('#/')) {
      const id = decodeURIComponent(hash.slice(1));
      // Pages are lazy-loaded, so wait briefly for the target to render.
      let tries = 0;
      const timer = setInterval(() => {
        const el = document.getElementById(id);
        if (el || ++tries > 20) {
          clearInterval(timer);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
      return () => clearInterval(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
