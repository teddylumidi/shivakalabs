/**
 * Design.jsx — Graphic design services page.
 */
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { DESIGN_SERVICES } from '../data/services';

export default function Design() {
  return (
    <>
      <PageHero
        icon="fa-paint-brush"
        title={<h1>Graphic <span className="accent">Design</span></h1>}
        subtitle="Logos, flyers, posters, brochures, social media graphics and full branding packages — professional design that makes your brand stand out."
      />

      <section>
        <div className="container">
          <ServiceGrid
            services={DESIGN_SERVICES}
            fallbackImg={`${import.meta.env.BASE_URL}img/design-hero.webp`}
          />
        </div>
      </section>

      <CtaStrip text="Need a design done professionally? Message us on WhatsApp to get started." />
    </>
  );
}
