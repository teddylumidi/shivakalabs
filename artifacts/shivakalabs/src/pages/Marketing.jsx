/**
 * Marketing.jsx — Digital marketing services page.
 */
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { MARKETING_SERVICES } from '../data/services';

export default function Marketing() {
  return (
    <>
      <PageHero
        icon="fa-bullhorn"
        title={<h1>Digital <span className="accent">Marketing</span></h1>}
        subtitle="Social media management, SEO, paid ads, Google Business profile, email marketing and more — grow your brand online with our strategic digital marketing services."
      />

      <section>
        <div className="container">
          <ServiceGrid
            services={MARKETING_SERVICES}
            fallbackImg={`${import.meta.env.BASE_URL}img/marketing-hero.webp`}
          />
        </div>
      </section>

      <CtaStrip text="Ready to grow your brand online? Let's get started on WhatsApp." />
    </>
  );
}
