/**
 * DocsSubnav.jsx — The Documents section's own menu (sticky, scrolls sideways on phones).
 */
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DOCS_MENU } from '../data/documents';

export default function DocsSubnav() {
  const { pathname: raw } = useLocation();
  const pathname = raw.length > 1 ? raw.replace(/\/+$/, '') : raw;
  const barRef = useRef(null);
  const activeRef = useRef(null);

  // Keep the active item visible on narrow screens (scroll the bar, not the page).
  useEffect(() => {
    const bar = barRef.current;
    const item = activeRef.current;
    if (bar && item) bar.scrollLeft = item.offsetLeft - (bar.clientWidth - item.offsetWidth) / 2;
  }, [pathname]);

  return (
    <nav className="docs-subnav" aria-label="Documents menu">
      <div className="docs-subnav-inner" ref={barRef}>
        {DOCS_MENU.map(item => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              ref={active ? activeRef : undefined}
              className={`docs-subnav-link${active ? ' active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
