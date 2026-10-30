/**
 * DocTypeGrid.jsx — Cards for document types, with the order dialog and the
 * "continue your unfinished order" banner.
 */
import { useEffect, useState } from 'react';
import OrderDialog from './OrderDialog';
import { getDocumentType } from '../data/documents';
import { loadPending } from '../lib/docsApi';

export default function DocTypeGrid({ types }) {
  const [active, setActive] = useState(null);   // { type, resume }
  const [pending, setPending] = useState(null);

  // Browser only (not during prerendering).
  useEffect(() => { setPending(loadPending()); }, []);
  const pendingType = pending && getDocumentType(pending.docType);

  return (
    <>
      {pendingType && !active && (
        <div className="pending-banner" role="status">
          <p><i className="fa fa-clock-o" aria-hidden="true" /> You have an unfinished <strong>{pendingType.name}</strong> order ({pending.reference}).</p>
          <button type="button" className="btn-gold btn-sm" onClick={() => setActive({ type: pendingType, resume: pending })}>
            Continue order
          </button>
        </div>
      )}

      <div className="doc-grid">
        {types.map(t => (
          <article key={t.id} className="doc-card" id={t.id}>
            <div className="doc-card-top">
              <i className={`fa ${t.icon} doc-card-icon`} aria-hidden="true" />
              <p className="doc-price"><span>KSh</span> {t.price.toLocaleString('en-KE')}</p>
            </div>
            <h3 className="doc-card-title">{t.name}</h3>
            <p>{t.desc}</p>
            <details className="doc-needs">
              <summary>What you'll need</summary>
              <ul>{t.needs.map(n => <li key={n}>{n}</li>)}</ul>
            </details>
            <button type="button" className="btn-gold doc-order" onClick={() => setActive({ type: t, resume: null })}>
              Order now · KSh {t.price.toLocaleString('en-KE')}<span className="sr-only">, {t.name}</span>
            </button>
          </article>
        ))}
      </div>

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
