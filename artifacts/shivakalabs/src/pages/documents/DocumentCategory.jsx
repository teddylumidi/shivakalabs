/**
 * DocumentCategory.jsx — /documents/<category>: every document in one category.
 */
import PageHero from '../../components/PageHero';
import DocsSubnav from '../../components/DocsSubnav';
import DocTypeGrid from '../../components/DocTypeGrid';
import HowItWorks from '../../components/HowItWorks';
import LegalNotice from '../../components/LegalNotice';
import CtaStrip from '../../components/CtaStrip';
import { DOCUMENT_CATEGORIES, DOC_STEPS, typesInCategory } from '../../data/documents';

const INTROS = {
  career: 'CVs, cover letters and job letters written to get you noticed.',
  letters: 'Formal letters to employers, offices, banks, schools and embassies.',
  legal: 'Affidavits, agreements, contracts and consents in standard Kenyan formats, ready to sign.',
  business: 'Business plans, proposals, company profiles and meeting minutes.',
  personal: 'Speeches, eulogies and any other document you need written.',
};

export default function DocumentCategory({ categoryId }) {
  const category = DOCUMENT_CATEGORIES.find(c => c.id === categoryId);
  const types = typesInCategory(categoryId);

  return (
    <>
      <PageHero
        icon={category.icon}
        title={<h1>{category.name} <span className="accent">Documents</span></h1>}
        subtitle={`${INTROS[categoryId]} Pay with M-Pesa or card, then download in Word or PDF.`}
      />
      <DocsSubnav />

      <section aria-label={`${category.name} documents`}>
        <div className="container">
          {categoryId === 'legal' && <LegalNotice />}
          <DocTypeGrid types={types} />
        </div>
      </section>

      <HowItWorks steps={DOC_STEPS} className="how-alt" />
      <CtaStrip text="Can't find the document you need? Try “Other Documents” under Personal, or message us on WhatsApp." />
    </>
  );
}
