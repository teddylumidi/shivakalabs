/**
 * Home.jsx — Landing page with hero, popular services, FAQ, and CTA strip.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ServiceSearch from '../components/ServiceSearch';
import PriceBoard from '../components/PriceBoard';
import CtaStrip from '../components/CtaStrip';
import HowItWorks from '../components/HowItWorks';
import { POPULAR_SERVICES, FAQ_ITEMS, WA_NUMBER, ECITIZEN_SERVICES, WEB_PACKAGES } from '../data/services';
import { DOCUMENT_TYPES } from '../data/documents';

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

// ── Service areas ────────────────────────────────────────────────────────────
const AREAS = [
  {
    to: '/ecitizen',
    title: 'eCitizen and government portals',
    text: `KRA, NTSA, passports, good conduct, SHA, HELB, business registration and more — ${ECITIZEN_SERVICES.length} services you can start from your phone.`,
    link: 'See eCitizen services',
  },
  {
    to: '/documents',
    title: 'Documents and passport photos',
    text: `CVs, letters, affidavits, agreements and business plans written for you (${DOCUMENT_TYPES.length} types), plus passport photos. Pay first, download straight away.`,
    link: 'Browse documents',
  },
  {
    to: '/webdev',
    title: 'Websites',
    text: `Business websites and online shops with M-Pesa payments, from KSh ${WEB_PACKAGES[0].price.toLocaleString('en-KE')}.`,
    link: 'See website packages',
  },
  {
    to: '/design',
    title: 'Design and marketing',
    text: 'Logos, posters, social media, Google Business Profile, SEO and ads.',
    link: 'See design services',
    extra: { to: '/marketing', label: 'See marketing services' },
  },
];

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello, I need help with your services')}`;

  return (
    <>
      {/* Hero: search for a service, or read prices off the board */}
      <header className="home-hero" id="home">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <h1>eCitizen help, documents and websites, sorted from your phone.</h1>
            <p className="home-hero-sub">
              Tell us what you need on WhatsApp and we handle the government portals for you.
              We also write CVs and legal documents, make passport photos and build websites for Kenyan businesses.
            </p>
            <ServiceSearch />
            <p className="home-hero-alt">
              Not sure what you need?{' '}
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="link-wa">
                <i className="fa fa-whatsapp" aria-hidden="true" /> Chat with us on WhatsApp
              </a>
            </p>
          </div>
          <PriceBoard />
        </div>
      </header>

      {/* Service areas */}
      <section className="areas" aria-labelledby="areas-title">
        <div className="container">
          <h2 id="areas-title" className="section-heading">What we do</h2>
          <ul className="area-list">
            {AREAS.map(a => (
              <li key={a.to} className="area">
                <h3 className="area-title"><Link to={a.to}>{a.title}</Link></h3>
                <p className="area-text">{a.text}</p>
                <p className="area-links">
                  <Link to={a.to}>{a.link}</Link>
                  {a.extra && <Link to={a.extra.to}>{a.extra.label}</Link>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks steps={HOW_STEPS} title="How it works" subtitle="Four steps, all on WhatsApp." />

      {/* Popular Services */}
      <section id="popular" aria-labelledby="popular-title">
        <div className="container">
          <div className="section-title">
            <h2 id="popular-title">Popular services</h2>
            <p className="subtitle">Tap a service to start a WhatsApp chat with your request filled in.</p>
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

      {/* FAQ */}
      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-title">
            <h2 id="faq-title">Questions people ask</h2>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.q} id={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
