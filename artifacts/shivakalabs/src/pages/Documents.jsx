/**
 * Documents.jsx — Paid CV, cover letter and document writing.
 * Prices and form fields come from the API's catalog so the price shown is
 * always the price charged.
 */
import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import HowItWorks from '../components/HowItWorks';
import CtaStrip from '../components/CtaStrip';
import OrderDialog from '../components/OrderDialog';
import { DOCUMENT_TYPES, getDocumentType } from '../../../../services/document-api/lib/catalog.js';
import { loadPending } from '../lib/docsApi';

const STEPS = [
  { icon: 'fa-hand-pointer-o', title: 'Choose a document', text: 'Pick a CV, cover letter or any other document below.' },
  { icon: 'fa-pencil',         title: 'Fill in your details', text: 'Answer a short form. Rough notes are fine — we polish the wording.' },
  { icon: 'fa-mobile',         title: 'Pay first', text: 'Pay securely with M-Pesa or Visa/Mastercard through Paystack.' },
  { icon: 'fa-download',       title: 'Download', text: 'Get your document in Word (.docx) and PDF within about a minute.' },
];

export default function Documents() {
  const [active, setActive] = useState(null);   // { type, resume }
  const [pending, setPending] = useState(null);

  // Runs in the browser only (not during prerendering).
  useEffect(() => { setPending(loadPending()); }, []);

  const pendingType = pending && getDocumentType(pending.docType);

  return (
    <>
      <PageHero
        icon="fa-file-text"
        title={<h1>CV &amp; <span className="accent">Document Writing</span></h1>}
        subtitle="Professional CVs for KSh 100 and cover letters for KSh 30. Fill in your details, pay with M-Pesa or card, and download in Word or PDF instantly."
      />

      {pendingType && !active && (
        <div className="container">
          <div className="pending-banner" role="status">
            <p><i className="fa fa-clock-o" aria-hidden="true" /> You have an unfinished <strong>{pendingType.name}</strong> order ({pending.reference}).</p>
            <button type="button" className="btn-gold btn-sm" onClick={() => setActive({ type: pendingType, resume: pending })}>
              Continue order
            </button>
          </div>
        </div>
      )}

      <section aria-labelledby="doc-types-title">
        <div className="container">
          <div className="section-title">
            <h2 id="doc-types-title">Choose Your <span className="accent">Document</span></h2>
            <p className="subtitle">Payment first, then your document is written and ready to download.</p>
          </div>
          <div className="doc-grid">
            {DOCUMENT_TYPES.map(t => (
              <article key={t.id} className="doc-card">
                <div className="doc-card-top">
                  <i className={`fa ${t.icon} doc-card-icon`} aria-hidden="true" />
                  <p className="doc-price"><span>KSh</span> {t.price}</p>
                </div>
                <h3 className="doc-card-title">{t.name}</h3>
                <p>{t.desc}</p>
                <details className="doc-needs">
                  <summary>What you'll need</summary>
                  <ul>{t.needs.map(n => <li key={n}>{n}</li>)}</ul>
                </details>
                <button type="button" className="btn-gold doc-order" onClick={() => setActive({ type: t, resume: null })}>
                  Order now · KSh {t.price}<span className="sr-only">, {t.name}</span>
                </button>
              </article>
            ))}
          </div>
          <p className="doc-formats">
            <i className="fa fa-file-word-o" aria-hidden="true" /> Word &nbsp;
            <i className="fa fa-file-pdf-o" aria-hidden="true" /> PDF &nbsp;·&nbsp;
            Pay with M-Pesa, Visa or Mastercard
          </p>
        </div>
      </section>

      <HowItWorks steps={STEPS} className="how-alt" />

      <CtaStrip text="Prefer a designed CV or need help choosing? Message us on WhatsApp." />

      {active && (
        <OrderDialog
          key={active.type.id + (active.resume?.reference || '')}
          type={active.type}
          resume={active.resume}
          onClose={() => { setActive(null); setPending(loadPending()); }}
        />
      )}
    </>
  );
}
