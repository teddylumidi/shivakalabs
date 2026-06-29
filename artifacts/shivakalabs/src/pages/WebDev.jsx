/**
 * WebDev.jsx — Web development services page.
 */
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { WEBDEV_SERVICES } from '../data/services';

export default function WebDev() {
  return (
    <>
      <div className="page-hero">
        <i className="fa fa-laptop page-hero-icon" aria-hidden="true" />
        <h1>Web <span className="accent">Development</span></h1>
        <p>
          From business websites to e-commerce stores and custom web apps — we build
          fast, professional, mobile-first websites tailored to your needs.
        </p>
      </div>

      <section>
        <div className="container">
          {/* No category filters needed for webdev — all in one group */}
          <ServiceGrid
            services={WEBDEV_SERVICES}
            fallbackImg={`${import.meta.env.BASE_URL}img/webdev-hero.jpg`}
          />
        </div>
      </section>

      <CtaStrip text="Ready to get your website built? Let's talk on WhatsApp." />
    </>
  );
}
