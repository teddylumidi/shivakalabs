/**
 * Design.jsx — Graphic design services page.
 */
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { DESIGN_SERVICES } from '../data/services';

export default function Design() {
  return (
    <>
      <div className="page-hero">
        <i className="fa fa-paint-brush page-hero-icon" aria-hidden="true" />
        <h1>Graphic <span className="accent">Design</span></h1>
        <p>
          Logos, flyers, posters, brochures, social media graphics and full branding packages —
          professional design that makes your brand stand out.
        </p>
      </div>

      <section>
        <div className="container">
          <ServiceGrid
            services={DESIGN_SERVICES}
            fallbackImg="/img/design-hero.jpg"
          />
        </div>
      </section>

      <CtaStrip text="Need a design done professionally? Message us on WhatsApp to get started." />
    </>
  );
}
