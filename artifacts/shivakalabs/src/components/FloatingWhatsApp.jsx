/**
 * FloatingWhatsApp.jsx — Fixed bottom-right WhatsApp button visible on all pages.
 */
import { WA_NUMBER } from '../data/services';

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello, I need help with your services')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="float-wa"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa fa-whatsapp" aria-hidden="true" />
      <span className="float-wa-tooltip">Chat on WhatsApp</span>
    </a>
  );
}
