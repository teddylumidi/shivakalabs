/**
 * Navbar.jsx — Sticky navigation with scroll effect, active page highlighting,
 * and responsive mobile hamburger menu.
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WA_NUMBER } from '../data/services';

const NAV_LINKS = [
  { label: 'Home',             to: '/' },
  { label: 'About Us',         to: '/about' },
  { label: 'eCitizen Services',to: '/ecitizen' },
  { label: 'Web Development',  to: '/webdev' },
  { label: 'Graphic Design',   to: '/design' },
  { label: 'Digital Marketing',to: '/marketing' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Add scrolled class once user scrolls past 50px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    'Hello, I would like to know more about your services'
  )}`;

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="navbar-inner">

          {/* Brand */}
          <Link className="navbar-brand" to="/">
            <img src="/img/logo.png" alt="ShivakaLabs Logo" className="logo-img" />
            Shivaka<span className="brand-accent">Labs</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links" role="menubar">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                role="menuitem"
                className={`nav-link-item${pathname === to ? ' active' : ''}`}
                aria-current={pathname === to ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-wa btn-wa-nav">
              <i className="fa fa-whatsapp" aria-hidden="true" /> WhatsApp
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="menu">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            role="menuitem"
            className={`nav-link-item${pathname === to ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-wa">
          <i className="fa fa-whatsapp" aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </>
  );
}
