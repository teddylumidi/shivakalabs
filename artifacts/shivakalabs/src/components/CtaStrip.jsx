/**
 * CtaStrip.jsx — Full-width WhatsApp call-to-action strip, used on all pages.
 */
import { WA_NUMBER } from '../data/services';

export default function CtaStrip({ text }) {
  const message = text || "Ready to get started? Reach out to us on WhatsApp — we're online and ready to help.";
  return (
    <section className="cta-strip" id="contact">
      <p>{message}</p>
      <a
        className="btn-wa btn-wa-cta"
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello, I need help with your services')}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
      </a>
    </section>
  );
}
