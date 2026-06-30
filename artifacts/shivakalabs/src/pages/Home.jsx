/**
 * Home.jsx — Landing page with hero, popular services, FAQ, and CTA strip.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import CtaStrip from '../components/CtaStrip';
import { POPULAR_SERVICES, FAQ_ITEMS, WA_NUMBER } from '../data/services';

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        {q}
        <i className="fa fa-chevron-down faq-icon" aria-hidden="true" />
      </button>
      <div className="faq-answer" aria-hidden={!open}>
        <p dangerouslySetInnerHTML={{ __html: a }} />
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello, I need help with your services')}`;

  return (
    <>
      {/* Hero */}
      <header className="hero" id="home">
        <div className="hero-bg" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/background.webp)` }} aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-eyebrow">Fast &bull; Reliable &bull; Professional</span>
          <h1>Shivaka<span className="accent">Labs</span></h1>
          <p className="hero-sub">
            Professional digital services for Kenya's businesses and individuals —
            Government eCitizen portal assistance, custom website development, graphic design
            and strategic digital marketing.
          </p>
          <div className="hero-actions">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-wa btn-wa-hero">
              <i className="fa fa-whatsapp" aria-hidden="true" /> Get Help on WhatsApp
            </a>
            <Link to="#popular" className="btn-outline-gold"
              onClick={e => {
                e.preventDefault();
                document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Browse Services
            </Link>
          </div>
        </div>
      </header>

      {/* Popular Services */}
      <section id="popular">
        <div className="container">
          <div className="section-title">
            <h2>Popular <span className="accent">Services</span></h2>
            <p className="subtitle">Most requested — click any service to get started instantly on WhatsApp</p>
          </div>
          <div className="popular-grid">
            {POPULAR_SERVICES.map(svc => (
              <ServiceCard
                key={svc.name}
                name={svc.name}
                desc={svc.desc}
                icon={svc.icon}
                imgSlug={svc.img}
                fallbackImg={`${import.meta.env.BASE_URL}img/${svc.fallback}.webp`}
                waMsg={svc.waMsg}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked <span className="accent">Questions</span></h2>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map(item => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaStrip />
    </>
  );
}
