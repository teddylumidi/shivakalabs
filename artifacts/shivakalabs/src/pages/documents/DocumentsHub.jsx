/**
 * DocumentsHub.jsx — /documents: overview of every document category,
 * the most popular documents and the passport photo tool.
 */
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import DocsSubnav from '../../components/DocsSubnav';
import DocTypeGrid from '../../components/DocTypeGrid';
import HowItWorks from '../../components/HowItWorks';
import CtaStrip from '../../components/CtaStrip';
import { DOCUMENT_CATEGORIES, PHOTO_PRODUCT, DOC_STEPS, getDocumentType, typesInCategory } from '../../data/documents';

const POPULAR = ['cv', 'cover-letter', 'affidavit'].map(getDocumentType);

export default function DocumentsHub() {
  return (
    <>
      <PageHero
        icon="fa-file-text"
        title={<h1>Documents &amp; <span className="accent">Passport Photos</span></h1>}
        subtitle="CVs for KSh 100, cover letters for KSh 30, letters, legal agreements, business documents and passport photos. Pay with M-Pesa or card, then download instantly."
      />
      <DocsSubnav />

      <section aria-labelledby="doc-cats-title">
        <div className="container">
          <div className="section-title">
            <h2 id="doc-cats-title">Browse by <span className="accent">Category</span></h2>
          </div>
          <div className="cat-grid">
            {DOCUMENT_CATEGORIES.map(c => {
              const types = typesInCategory(c.id);
              const from = Math.min(...types.map(t => t.price));
              return (
                <Link key={c.id} to={`/documents/${c.id}`} className="cat-card">
                  <i className={`fa ${c.icon} cat-icon`} aria-hidden="true" />
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-desc">{c.desc}</span>
                  <span className="cat-meta">{types.length} documents · from KSh {from}</span>
                </Link>
              );
            })}
            <Link to="/documents/passport-photo" className="cat-card cat-card-photo">
              <i className="fa fa-camera cat-icon" aria-hidden="true" />
              <span className="cat-name">Passport Photo</span>
              <span className="cat-desc">Upload a photo, choose the size and background, download JPG or print-ready PDF</span>
              <span className="cat-meta">KSh {PHOTO_PRODUCT.price}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="popular-docs-title">
        <div className="container">
          <div className="section-title">
            <h2 id="popular-docs-title">Most <span className="accent">Popular</span></h2>
            <p className="subtitle">Payment first, then your document is written and ready to download.</p>
          </div>
          <DocTypeGrid types={POPULAR} />
          <p className="doc-formats">
            <i className="fa fa-file-word-o" aria-hidden="true" /> Word &nbsp;
            <i className="fa fa-file-pdf-o" aria-hidden="true" /> PDF &nbsp;·&nbsp; Pay with M-Pesa, Visa or Mastercard
          </p>
        </div>
      </section>

      <HowItWorks steps={DOC_STEPS} />
      <CtaStrip text="Need a designed CV or a document we don't list? Message us on WhatsApp." />
    </>
  );
}
