/**
 * PassportPhoto.jsx — /documents/passport-photo
 * Upload → background removed and face framed on the device → choose size and
 * colour on a watermarked preview → pay KSh 50 → download JPG and print-ready PDF.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import PageHero from '../../components/PageHero';
import DocsSubnav from '../../components/DocsSubnav';
import HowItWorks from '../../components/HowItWorks';
import CtaStrip from '../../components/CtaStrip';
import { PHOTO_PRODUCT, PHOTO_SIZES, PHOTO_BACKGROUNDS } from '../../data/documents';
import { WA_NUMBER } from '../../data/services';
import { createPhotoOrder, generatePhoto, openPaystack, downloadBase64, PDF_MIME } from '../../lib/docsApi';
import {
  fileToCanvas, analysePhoto, autoFrame, adjustFrame, drawFrame, exportCutout, bytesToBase64,
} from '../../lib/passportPhoto';

const STEPS = [
  { icon: 'fa-upload',      title: 'Upload a photo', text: 'A clear, front-facing photo against a plain wall works best.' },
  { icon: 'fa-magic',       title: 'Adjust and preview', text: 'We remove the background and frame your face. Pick the size and colour.' },
  { icon: 'fa-mobile',      title: 'Pay KSh 50', text: 'Pay with M-Pesa or card. Your photo is uploaded only after you pay.' },
  { icon: 'fa-download',    title: 'Download', text: 'Get a JPG for online forms (under 300 KB) and a PDF sheet to print.' },
];

const TIPS = [
  'Face the camera directly with a neutral expression and mouth closed',
  'Both ears and your full face visible; hair off the forehead',
  'No glasses, hats or headphones (religious head covers are usually accepted)',
  'Even lighting with no shadows on your face',
  'Kenya passports and visas need a white background',
];

const PREVIEW_W = 300;

function hexOf(bg) {
  return PHOTO_BACKGROUNDS.find(b => b.id === bg)?.hex || bg;
}

export default function PassportPhoto() {
  const [stage, setStage] = useState('upload');   // upload | processing | edit | paying | finishing | done
  const [error, setError] = useState('');
  const [sizeId, setSizeId] = useState(PHOTO_SIZES[0].id);
  const [bg, setBg] = useState('white');
  const [adjust, setAdjust] = useState({ zoom: 1, dx: 0, dy: 0 });
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);        // { reference, accessCode, base64 }
  const [result, setResult] = useState(null);      // { fileName, jpg, pdf, copies }
  const [refreshing, setRefreshing] = useState(false);

  const personRef = useRef(null);
  const faceRef = useRef(null);
  const previewRef = useRef(null);
  const fileRef = useRef(null);

  const size = PHOTO_SIZES.find(s => s.id === sizeId);
  const locked = Boolean(order);                    // framing is fixed once a payment is started
  const previewH = Math.round(PREVIEW_W / (size.widthMm / size.heightMm));

  const frame = useCallback(() => (
    personRef.current ? adjustFrame(autoFrame(personRef.current, faceRef.current, size), adjust) : null
  ), [size, adjust]);

  // Redraw the watermarked preview whenever something changes.
  useEffect(() => {
    if (stage === 'upload' || stage === 'processing' || !previewRef.current || !personRef.current) return;
    const c = previewRef.current;
    c.width = PREVIEW_W * 2;
    c.height = previewH * 2;
    drawFrame(c, personRef.current, frame(), hexOf(bg), { watermark: stage !== 'done' });
  }, [stage, frame, bg, previewH]);

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setStage('processing');
    try {
      const source = await fileToCanvas(file);
      const { person, face } = await analysePhoto(source);
      personRef.current = person;
      faceRef.current = face;
      setAdjust({ zoom: 1, dx: 0, dy: 0 });
      setOrder(null);
      setResult(null);
      if (!face) setError('We couldn’t detect a face clearly, so please check the framing with the controls below.');
      setStage('edit');
    } catch (err) {
      setError(err.message || 'Something went wrong processing your photo.');
      setStage(personRef.current ? 'edit' : 'upload');
    }
  }

  async function finish(reference, base64, background = bg) {
    setStage('finishing');
    setError('');
    try {
      const out = await generatePhoto(reference, sizeId, hexOf(background), base64);
      setResult(out);
      setStage('done');
    } catch (err) {
      setError(err.message);
      setStage('paying');
    }
  }

  async function pay(e) {
    e?.preventDefault();
    setError('');
    try {
      let current = order;
      if (!current) {
        setStage('paying');
        const { bytes, hash } = await exportCutout(personRef.current, frame());
        const created = await createPhotoOrder(sizeId, email.trim(), '', hash);
        current = { ...created, base64: bytesToBase64(bytes) };
        setOrder(current);
      }
      const outcome = await openPaystack(current.accessCode);
      if (outcome === 'success') await finish(current.reference, current.base64);
    } catch (err) {
      setError(err.message);
      setStage(s => (s === 'paying' && !order ? 'edit' : s));
    }
  }

  async function changeColour(next) {
    setBg(next);
    if (stage === 'done' && order) {
      setRefreshing(true);
      try {
        setResult(await generatePhoto(order.reference, sizeId, hexOf(next), order.base64));
      } catch (err) {
        setError(err.message);
      } finally {
        setRefreshing(false);
      }
    }
  }

  function startOver() {
    personRef.current = null;
    faceRef.current = null;
    setOrder(null);
    setResult(null);
    setError('');
    setStage('upload');
  }

  const waHelp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello, I need help with my passport photo order${order ? ` (ref ${order.reference})` : ''}`)}`;
  const showEditor = stage !== 'upload' && stage !== 'processing';

  return (
    <>
      <PageHero
        icon="fa-camera"
        title={<h1>Passport <span className="accent">Photo</span></h1>}
        subtitle={`Turn any clear photo into a passport-size photo with the background colour you choose. KSh ${PHOTO_PRODUCT.price}, download as JPG or print-ready PDF.`}
      />
      <DocsSubnav />

      <section aria-labelledby="photo-tool-title">
        <div className="container photo-tool">
          <h2 id="photo-tool-title" className="sr-only">Passport photo maker</h2>
          {error && <p className="order-error" role="alert"><i className="fa fa-exclamation-circle" aria-hidden="true" /> {error}</p>}

          {(stage === 'upload' || stage === 'processing') && (
            <div className="photo-upload">
              <input ref={fileRef} id="photo-file" type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={stage === 'processing'} />
              <label htmlFor="photo-file" className={`photo-drop${stage === 'processing' ? ' busy' : ''}`}>
                {stage === 'processing'
                  ? <><i className="fa fa-spinner fa-spin" aria-hidden="true" /><span>Removing background and framing your face…</span><small>The first photo takes a little longer while the tools load.</small></>
                  : <><i className="fa fa-camera" aria-hidden="true" /><span>Upload or take a photo</span><small>JPG or PNG · processed on your device</small></>}
              </label>
              <ul className="photo-tips" aria-label="Photo tips">
                {TIPS.map(t => <li key={t}><i className="fa fa-check" aria-hidden="true" /> {t}</li>)}
              </ul>
            </div>
          )}

          {showEditor && (
            <div className="photo-editor">
              <div className="photo-preview-wrap">
                {stage === 'done' && result
                  ? <img className="photo-preview" src={`data:image/jpeg;base64,${result.jpg}`} alt="Your finished passport photo" width={PREVIEW_W} height={previewH} />
                  : <canvas ref={previewRef} className="photo-preview" style={{ width: PREVIEW_W, height: previewH }} role="img" aria-label="Watermarked preview of your passport photo" />}
                <p className="photo-size-note">{size.widthMm} × {size.heightMm} mm{stage !== 'done' && ' · preview'}</p>
              </div>

              <div className="photo-controls">
                <fieldset disabled={locked}>
                  <legend>Size</legend>
                  <div className="photo-options">
                    {PHOTO_SIZES.map(s => (
                      <label key={s.id} className={`photo-option${sizeId === s.id ? ' selected' : ''}`}>
                        <input type="radio" name="size" value={s.id} checked={sizeId === s.id} onChange={() => setSizeId(s.id)} />
                        <span>{s.name}<small>{s.widthMm} × {s.heightMm} mm</small></span>
                      </label>
                    ))}
                  </div>
                  {size.note && <p className="order-note">{size.note}</p>}
                </fieldset>

                <fieldset disabled={refreshing || stage === 'finishing'}>
                  <legend>Background colour</legend>
                  <div className="photo-swatches">
                    {PHOTO_BACKGROUNDS.map(b => (
                      <label key={b.id} className={`swatch${bg === b.id ? ' selected' : ''}`} title={b.name}>
                        <input type="radio" name="bg" value={b.id} checked={bg === b.id} onChange={() => changeColour(b.id)} />
                        <span className="swatch-dot" style={{ background: b.hex }} aria-hidden="true" />
                        <span className="swatch-name">{b.name}</span>
                      </label>
                    ))}
                    <label className={`swatch${bg.startsWith('#') ? ' selected' : ''}`} title="Custom colour">
                      <input type="color" value={bg.startsWith('#') ? bg : '#ffffff'} onChange={e => changeColour(e.target.value)} aria-label="Custom background colour" />
                      <span className="swatch-name">Custom</span>
                    </label>
                  </div>
                  {stage === 'done' && <p className="order-note">You can change the colour and download again at no extra cost.</p>}
                </fieldset>

                <fieldset disabled={locked}>
                  <legend>Adjust framing</legend>
                  <label className="photo-range">Zoom
                    <input type="range" min="0.6" max="1.6" step="0.01" value={adjust.zoom} onChange={e => setAdjust(a => ({ ...a, zoom: +e.target.value }))} />
                  </label>
                  <label className="photo-range">Left / right
                    <input type="range" min="-0.3" max="0.3" step="0.005" value={-adjust.dx} onChange={e => setAdjust(a => ({ ...a, dx: -e.target.value }))} />
                  </label>
                  <label className="photo-range">Up / down
                    <input type="range" min="-0.3" max="0.3" step="0.005" value={-adjust.dy} onChange={e => setAdjust(a => ({ ...a, dy: -e.target.value }))} />
                  </label>
                  {locked && <p className="order-note">Size and framing are fixed once payment starts.</p>}
                </fieldset>

                {(stage === 'edit' || stage === 'paying') && (
                  <form className="photo-pay" onSubmit={pay}>
                    {!order && (
                      <div className="order-field">
                        <label htmlFor="photo-email">Email for your receipt <span className="req" aria-hidden="true">*</span></label>
                        <input id="photo-email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={120} />
                      </div>
                    )}
                    <button type="submit" className="btn-gold" disabled={stage === 'paying' && !order}>
                      {stage === 'paying' && !order
                        ? <><i className="fa fa-spinner fa-spin" aria-hidden="true" /> Preparing payment…</>
                        : <><i className="fa fa-lock" aria-hidden="true" /> Pay KSh {PHOTO_PRODUCT.price} and download</>}
                    </button>
                    {order && (
                      <button type="button" className="btn-outline-gold btn-sm" onClick={() => finish(order.reference, order.base64)}>
                        I've paid — get my photo
                      </button>
                    )}
                    {order && <p className="order-ref">Order reference: <strong>{order.reference}</strong> · keep this page open until you download.</p>}
                  </form>
                )}

                {stage === 'finishing' && (
                  <p className="photo-status" role="status"><i className="fa fa-spinner fa-spin" aria-hidden="true" /> Payment confirmed. Preparing your files…</p>
                )}

                {stage === 'done' && result && (
                  <div className="photo-downloads">
                    <button type="button" className="btn-gold" disabled={refreshing} onClick={() => downloadBase64(result.jpg, `${result.fileName}.jpg`, 'image/jpeg')}>
                      <i className="fa fa-file-image-o" aria-hidden="true" /> Download JPG
                    </button>
                    <button type="button" className="btn-gold" disabled={refreshing} onClick={() => downloadBase64(result.pdf, `${result.fileName}.pdf`, PDF_MIME)}>
                      <i className="fa fa-file-pdf-o" aria-hidden="true" /> Download PDF ({result.copies} copies)
                    </button>
                    <p className="order-note">The JPG is sized for online forms such as eCitizen (under 300 KB). Print the PDF on A4 at 100% scale (“actual size”) and cut along the lines.</p>
                  </div>
                )}

                <div className="photo-links">
                  <button type="button" className="order-link" onClick={startOver}>{stage === 'done' ? 'Make another photo' : 'Use a different photo'}</button>
                  {order && <a className="order-link" href={waHelp} target="_blank" rel="noopener noreferrer">Need help? WhatsApp us</a>}
                </div>
              </div>
            </div>
          )}

          <p className="order-note photo-privacy">
            <i className="fa fa-lock" aria-hidden="true" /> Your photo is processed on your device. It is uploaded only after payment, to create your files, and is not stored on our servers.
          </p>
        </div>
      </section>

      <HowItWorks steps={STEPS} className="how-alt" />
      <CtaStrip text="Need help with a passport, ID or visa application? Message us on WhatsApp." />
    </>
  );
}
