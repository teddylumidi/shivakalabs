/**
 * WebDev.jsx — Web development services page with price packages.
 */
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { WEBDEV_SERVICES, WEB_PACKAGES, waLink } from '../data/services';

export default function WebDev() {
  return (
    <>
      <PageHero
        icon="fa-laptop"
        title={<h1>Web <span className="accent">Development</span></h1>}
        subtitle="From business websites to e-commerce stores and custom web apps — we build fast, professional, mobile-first websites tailored to your needs."
      />

      <section aria-labelledby="packages-title">
        <div className="container">
          <div className="section-title">
            <h2 id="packages-title">Website <span className="accent">Packages</span></h2>
            <p className="subtitle">Clear, one-off prices. Domain and hosting can be added — ask us for a quote.</p>
          </div>
          <div className="pkg-grid">
            {WEB_PACKAGES.map(p => (
              <article key={p.name} className={`pkg-card${p.popular ? ' popular' : ''}`}>
                {p.popular && <span className="pkg-badge">Most popular</span>}
                <h3 className="pkg-name">{p.name}</h3>
                <p className="pkg-price"><span>KSh</span> {p.price.toLocaleString('en-KE')}</p>
                <p className="pkg-tagline">{p.tagline}</p>
                <ul className="pkg-features">
                  {p.features.map(f => <li key={f}><i className="fa fa-check" aria-hidden="true" /> {f}</li>)}
                </ul>
                <a
                  className={p.popular ? 'btn-gold pkg-cta' : 'btn-outline-gold pkg-cta'}
                  href={waLink(`the ${p.name} website package (KSh ${p.price.toLocaleString('en-KE')})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true" /> Get {p.name}
                  <span className="sr-only"> package on WhatsApp</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="webdev-services-title">
        <div className="container">
          <div className="section-title">
            <h2 id="webdev-services-title">All Web <span className="accent">Services</span></h2>
          </div>
          <ServiceGrid services={WEBDEV_SERVICES} />
        </div>
      </section>

      <CtaStrip text="Ready to get your website built? Let's talk on WhatsApp." />
    </>
  );
}
