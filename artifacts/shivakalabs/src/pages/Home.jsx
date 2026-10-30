/**
 * Home.jsx — Landing page with hero, popular services, FAQ, and CTA strip.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import CtaStrip from '../components/CtaStrip';
import HowItWorks from '../components/HowItWorks';
import { POPULAR_SERVICES, FAQ_ITEMS, WA_NUMBER } from '../data/services';

const HOW_STEPS = [
  { icon: 'fa-search',   title: 'Choose a service', text: 'Find your service and tap “Get Help on WhatsApp” — the chat opens with your request filled in.' },
  { icon: 'fa-file-o',   title: 'Send your details', text: 'Share the details and documents we ask for. See what to prepare on each service page.' },
  { icon: 'fa-mobile',   title: 'Confirm and pay', text: 'We tell you the cost before we start, and you pay via M-Pesa.' },
  { icon: 'fa-check',    title: 'We get it done', text: 'We complete the work and send you the confirmation, receipt or files on WhatsApp.' },
];

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ id, q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <h3 className="faq-heading">
        <button
          type="button"
          className="faq-question"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={`faq-answer-${id}`}
        >
          {q}
          <i className="fa fa-chevron-down faq-icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq-answer" id={`faq-answer-${id}`} aria-hidden={!open}>
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
        <div className="hero-bg" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/logo.webp)` }} aria-hidden="true" />
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
            <a href="#popular" className="btn-outline-gold"
              onClick={e => {
                e.preventDefault();
                document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Browse Services
            </a>
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
                
                waMsg={svc.waMsg}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Documents promo */}
      <section className="promo-section" aria-labelledby="promo-title">
        <div className="container">
          <div className="promo-band">
            <div>
              <span className="promo-tag">New</span>
              <h2 id="promo-title" className="promo-title">CV writing <span className="accent">KSh 100</span> · Cover letters <span className="accent">KSh 30</span></h2>
              <p>Fill in your details, pay with M-Pesa or card, and download your document in Word or PDF instantly.</p>
            </div>
            <Link to="/documents" className="btn-gold">Order a document <i className="fa fa-arrow-right" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks steps={HOW_STEPS} subtitle="Four simple steps, all on WhatsApp" />

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked <span className="accent">Questions</span></h2>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.q} id={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaStrip />
    </>
  );
}
