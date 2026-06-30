/**
 * WebDev.jsx — Web development services page.
 */
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { WEBDEV_SERVICES } from '../data/services';

export default function WebDev() {
  return (
    <>
      <PageHero
        icon="fa-laptop"
        title={<h1>Web <span className="accent">Development</span></h1>}
        subtitle="From business websites to e-commerce stores and custom web apps — we build fast, professional, mobile-first websites tailored to your needs."
      />

      <section>
        <div className="container">
          <ServiceGrid
            services={WEBDEV_SERVICES}
            fallbackImg={`${import.meta.env.BASE_URL}img/webdev-hero.webp`}
          />
        </div>
      </section>

      <CtaStrip text="Ready to get your website built? Let's talk on WhatsApp." />
    </>
  );
}
