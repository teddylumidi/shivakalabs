/**
 * ECitizen.jsx — eCitizen government portal services page.
 * Features a large filterable service grid with category tabs.
 */
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import { ECITIZEN_SERVICES } from '../data/services';

// Filter tabs mapping category value → display label
const FILTERS = [
  { label: 'National ID',    value: 'id' },
  { label: 'Birth Cert',     value: 'birth' },
  { label: 'Death Cert',     value: 'death' },
  { label: 'Marriage',       value: 'marriage' },
  { label: 'Good Conduct',   value: 'goodconduct' },
  { label: 'Passport',       value: 'passport' },
  { label: 'Immigration',    value: 'immigration' },
  { label: 'NTSA',           value: 'ntsa' },
  { label: 'KRA',            value: 'kra' },
  { label: 'SHA / NHIF',     value: 'sha' },
  { label: 'NSSF',           value: 'nssf' },
  { label: 'HELB',           value: 'helb' },
  { label: 'Business',       value: 'business' },
  { label: 'Land & Court',   value: 'land' },
  { label: 'County',         value: 'county' },
  { label: 'General',        value: 'general' },
];

export default function ECitizen() {
  return (
    <>
      <PageHero
        icon="fa-globe"
        title={<h1>eCitizen <span className="accent">Services</span></h1>}
        subtitle="We help you navigate Kenya's government portals — from KRA and NTSA to Passport, Business Registration, and more. Professional, fast, and stress-free."
      />

      <section>
        <div className="container">
          <ServiceGrid
            services={ECITIZEN_SERVICES}
            filters={FILTERS}
            fallbackImg={`${import.meta.env.BASE_URL}img/ecitizen-hero.webp`}
          />
        </div>
      </section>

      <CtaStrip text="Can't find what you need? Message us — we handle all government portal services." />
    </>
  );
}
