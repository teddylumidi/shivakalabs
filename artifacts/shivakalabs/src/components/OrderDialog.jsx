/**
 * OrderDialog.jsx — Details form → Paystack payment → Word/PDF download.
 *
 * Props:
 *   type    – document type from the catalog (services/document-api/lib/catalog.js)
 *   resume  – a saved pending order { docType, details, reference } to continue, or null
 *   onClose – called when the dialog closes
 */
import { useEffect, useRef, useState } from 'react';
import {
  createOrder, openPaystack, generateDocument, downloadBase64,
  savePending, clearPending, DOCX_MIME, PDF_MIME,
} from '../lib/docsApi';
import { WA_NUMBER } from '../data/services';

const AUTOCOMPLETE = { fullName: 'name', phone: 'tel', email: 'email', location: 'address-level2' };

function emptyDetails(type) {
  return Object.fromEntries(type.fields.map(f => [f.key, '']));
}

export default function OrderDialog({ type, resume, onClose }) {
  const dialogRef = useRef(null);
  const [details, setDetails] = useState(() => (resume ? { ...emptyDetails(type), ...resume.details } : emptyDetails(type)));
  const [reference, setReference] = useState(resume?.reference || '');
  const [accessCode, setAccessCode] = useState('');
  const [stage, setStage] = useState(resume ? 'pay' : 'details'); // details | creating | pay | writing | failed | done
  const [error, setError] = useState('');
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) dlg.showModal();
    return () => { if (dlg?.open) dlg.close(); };
  }, []);

  const close = () => {
    if (stage === 'done') clearPending();
    onClose();
  };

  const waHelp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hello, I need help with my ${type.name} order${reference ? ` (ref ${reference})` : ''}`,
  )}`;

  async function writeIt(ref = reference) {
    setStage('writing');
    setError('');
    try {
      const out = await generateDocument(ref, type.id, details);
      setFiles(out);
      setStage('done');
    } catch (err) {
      setError(err.message);
      // 402 = Paystack hasn't confirmed the payment yet: let them pay or retry.
      setStage(err.status === 402 ? 'pay' : 'failed');
    }
  }

  async function pay(code = accessCode) {
    setError('');
    try {
      const result = await openPaystack(code);
      if (result === 'success') await writeIt();
    } catch (err) {
      setError(err.message);
    }
  }

  async function submitDetails(e) {
    e.preventDefault();
    setStage('creating');
    setError('');
    try {
      const order = await createOrder(type.id, details);
      setReference(order.reference);
      setAccessCode(order.accessCode);
      savePending({ docType: type.id, details, reference: order.reference });
      setStage('pay');
      const result = await openPaystack(order.accessCode);
      if (result === 'success') await writeIt(order.reference);
    } catch (err) {
      setError(err.message);
      setStage(s => (s === 'creating' ? 'details' : s));
    }
  }

  const busy = stage === 'creating' || stage === 'writing';

  return (
    <dialog
      ref={dialogRef}
      className="order-dialog"
      aria-labelledby="order-dialog-title"
      onCancel={e => { if (busy) e.preventDefault(); else close(); }}
    >
      <div className="order-dialog-head">
        <div>
          <h2 id="order-dialog-title" className="order-dialog-title">{type.name}</h2>
          <p className="order-dialog-price">KSh {type.price.toLocaleString('en-KE')} · Word &amp; PDF</p>
        </div>
        <button type="button" className="order-close" onClick={close} disabled={busy} aria-label="Close">
          <i className="fa fa-times" aria-hidden="true" />
        </button>
      </div>

      <ol className="order-steps" aria-label="Order progress">
        {['Your details', 'Pay', 'Download'].map((label, i) => {
          const current = stage === 'details' || stage === 'creating' ? 0 : stage === 'done' ? 2 : 1;
          return (
            <li key={label} className={i < current ? 'done' : i === current ? 'current' : ''} aria-current={i === current ? 'step' : undefined}>
              <span>{i + 1}</span>{label}
            </li>
          );
        })}
      </ol>

      {error && <p className="order-error" role="alert"><i className="fa fa-exclamation-circle" aria-hidden="true" /> {error}</p>}

      {(stage === 'details' || stage === 'creating') && (
        <form className="order-form" onSubmit={submitDetails}>
          {type.fields.map(f => {
            const id = `f-${type.id}-${f.key}`;
            const common = {
              id,
              name: f.key,
              value: details[f.key],
              required: f.required,
              maxLength: f.max,
              placeholder: f.placeholder,
              autoComplete: AUTOCOMPLETE[f.key] || 'off',
              onChange: e => setDetails(d => ({ ...d, [f.key]: e.target.value })),
            };
            return (
              <div key={f.key} className={`order-field${f.type === 'textarea' ? ' wide' : ''}`}>
                <label htmlFor={id}>
                  {f.label}{f.required ? <span className="req" aria-hidden="true"> *</span> : <span className="opt"> (optional)</span>}
                </label>
                {f.type === 'textarea'
                  ? <textarea rows={4} {...common} />
                  : <input type={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : 'text'} inputMode={f.type === 'tel' ? 'tel' : undefined} {...common} />}
              </div>
            );
          })}
          <p className="order-note wide">
            <i className="fa fa-lock" aria-hidden="true" /> Your details are used only to write this document. They are shared
            with our payment provider (Paystack) and AI writing service to produce it, and are not stored on our servers.
          </p>
          <button type="submit" className="btn-gold wide" disabled={stage === 'creating'}>
            {stage === 'creating'
              ? <><i className="fa fa-spinner fa-spin" aria-hidden="true" /> Preparing payment…</>
              : <>Continue to payment · KSh {type.price}</>}
          </button>
        </form>
      )}

      {stage === 'pay' && (
        <div className="order-panel">
          <p>Pay <strong>KSh {type.price}</strong> with M-Pesa or card. Your document is written as soon as payment is confirmed.</p>
          {reference && <p className="order-ref">Order reference: <strong>{reference}</strong></p>}
          <div className="order-actions">
            {accessCode && (
              <button type="button" className="btn-gold" onClick={() => pay()}>
                <i className="fa fa-credit-card" aria-hidden="true" /> Pay KSh {type.price}
              </button>
            )}
            <button type="button" className="btn-outline-gold btn-sm" onClick={() => writeIt()}>
              I've paid — get my document
            </button>
          </div>
          {!accessCode && (
            <button type="button" className="order-link" onClick={() => { setStage('details'); setReference(''); clearPending(); setError(''); }}>
              Start a new order instead
            </button>
          )}
        </div>
      )}

      {stage === 'writing' && (
        <div className="order-panel order-center" role="status">
          <i className="fa fa-spinner fa-spin order-spinner" aria-hidden="true" />
          <p>Payment confirmed. Writing your document — this takes up to a minute.</p>
        </div>
      )}

      {stage === 'failed' && (
        <div className="order-panel">
          <p>Your payment is safe. Try again, or send us your reference on WhatsApp and we'll deliver it.</p>
          {reference && <p className="order-ref">Order reference: <strong>{reference}</strong></p>}
          <div className="order-actions">
            <button type="button" className="btn-gold" onClick={() => writeIt()}>
              <i className="fa fa-refresh" aria-hidden="true" /> Try again
            </button>
            <a className="btn-wa" href={waHelp} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-whatsapp" aria-hidden="true" /> Get help
            </a>
          </div>
        </div>
      )}

      {stage === 'done' && files && (
        <div className="order-panel order-center">
          <i className="fa fa-check-circle order-done-icon" aria-hidden="true" />
          <p>Your document is ready. Download it in either format.</p>
          <div className="order-actions order-actions-center">
            <button type="button" className="btn-gold" onClick={() => downloadBase64(files.docx, `${files.fileName}.docx`, DOCX_MIME)}>
              <i className="fa fa-file-word-o" aria-hidden="true" /> Download Word
            </button>
            <button type="button" className="btn-gold" onClick={() => downloadBase64(files.pdf, `${files.fileName}.pdf`, PDF_MIME)}>
              <i className="fa fa-file-pdf-o" aria-hidden="true" /> Download PDF
            </button>
          </div>
          <p className="order-note">Need changes? Edit the Word file, or message us on WhatsApp with reference {reference}.</p>
        </div>
      )}
    </dialog>
  );
}
