/**
 * Footer.jsx — Site-wide footer with brand info, links, and contact details.
 */
import { Link } from 'react-router-dom';
import { WA_NUMBER } from '../data/services';

const SOCIAL = [
  { icon: 'fa-facebook',  href: 'https://www.facebook.com/shivakalabs',          label: 'Facebook' },
  { icon: 'fa-instagram', href: 'https://www.instagram.com/shivakalabs',         label: 'Instagram' },
  { icon: 'fa-twitter',   href: 'https://twitter.com/shivakalabs',               label: 'Twitter' },
  { icon: 'fa-linkedin',  href: 'https://www.linkedin.com/company/shivakalabs',  label: 'LinkedIn' },
  { icon: 'fa-whatsapp',  href: `https://wa.me/${WA_NUMBER}`,                    label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-body">
        <div className="footer-cols">

          {/* Brand column */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <img src={`${import.meta.env.BASE_URL}img/logo.webp`} alt="ShivakaLabs Logo" style={{ height: 42 }} />
              <h3>Shivaka<span className="accent">Labs</span></h3>
            </div>
            <p>
              Professional digital services for Kenya's businesses and individuals —
              eCitizen portal assistance, website development, graphic design &amp; digital marketing.
            </p>
            <div className="social-icons">
              {SOCIAL.map(({ icon, href, label }) => (
                <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                   className="social-icon" aria-label={label}>
                  <i className={`fa ${icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/#popular">Popular Services</Link></li>
              <li><Link to="/#faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h5>Services</h5>
            <ul className="footer-links">
              <li><Link to="/ecitizen">eCitizen Portal</Link></li>
              <li><Link to="/webdev">Web Development</Link></li>
              <li><Link to="/design">Graphic Design</Link></li>
              <li><Link to="/marketing">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Contact</h5>
            <ul className="footer-links">
              <li>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-whatsapp" style={{ color: 'var(--wa-green)' }} aria-hidden="true" />
                  +254 716 358 703
                </a>
              </li>
              <li>
                <a href="mailto:info@shivakalabs.com">
                  <i className="fa fa-envelope" style={{ color: 'var(--gold)' }} aria-hidden="true" />
                  info@shivakalabs.com
                </a>
              </li>
              <li>
                <span>
                  <i className="fa fa-map-marker" style={{ color: 'var(--gold)' }} aria-hidden="true" />
                  Remote Kenya
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShivakaLabs. All rights reserved.</p>
      </div>
    </footer>
  );
}
