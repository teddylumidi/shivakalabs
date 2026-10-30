/**
 * LegalNotice.jsx — Plain-language limits of generated legal documents.
 */
export default function LegalNotice() {
  return (
    <aside className="legal-notice" aria-label="About our legal documents">
      <i className="fa fa-info-circle" aria-hidden="true" />
      <div>
        <p><strong>Prepared from your details in standard Kenyan formats — not legal advice.</strong></p>
        <ul>
          <li>Affidavits only take effect once sworn and stamped before a Commissioner for Oaths.</li>
          <li>Agreements should be signed by every party, with witnesses where shown.</li>
          <li>For land, large sums or disputes, have an advocate review the document before signing.</li>
        </ul>
      </div>
    </aside>
  );
}
