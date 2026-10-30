/**
 * ECitizen.jsx — eCitizen government portal services page.
 * Features a large filterable service grid with category tabs.
 */
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import CtaStrip from '../components/CtaStrip';
import HowItWorks from '../components/HowItWorks';
import { ECITIZEN_SERVICES } from '../data/services';
import { ECITIZEN_REQUIREMENTS } from '../data/requirements';

const STEPS = [
  { icon: 'fa-search',   title: 'Pick your service', text: 'Find it below and tap “Get Help on WhatsApp”.' },
  { icon: 'fa-file-o',   title: 'Send what we need', text: 'Share the details and documents listed under “What to prepare”.' },
  { icon: 'fa-mobile',   title: 'Confirm and pay', text: 'We tell you the cost before we start, and you pay via M-Pesa.' },
  { icon: 'fa-check',    title: 'Receive confirmation', text: 'We submit or follow up and send you the receipt, status or document.' },
];

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
          />
        </div>
      </section>

      <HowItWorks steps={STEPS} className="how-alt" />

      <section aria-labelledby="prepare-title">
        <div className="container">
          <div className="section-title">
            <h2 id="prepare-title">What to <span className="accent">Prepare</span></h2>
            <p className="subtitle">Have these ready to speed things up. Requirements can vary by case — we confirm before starting.</p>
          </div>
          <div className="req-grid">
            {FILTERS.filter(f => ECITIZEN_REQUIREMENTS[f.value]).map(f => (
              <details key={f.value} className="req-card">
                <summary>{f.label}</summary>
                <ul>
                  {ECITIZEN_REQUIREMENTS[f.value].map(item => (
                    <li key={item} className={item.startsWith('Note:') ? 'req-note' : undefined}>{item}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip text="Can't find what you need? Message us — we handle all government portal services." />
    </>
  );
}
