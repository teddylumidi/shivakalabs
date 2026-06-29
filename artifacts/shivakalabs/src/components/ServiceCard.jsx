/**
 * ServiceCard.jsx — Reusable card for a single service.
 * Accepts: name, desc, icon, imgSlug, fallbackImg, waMsg, category
 */
import { waLink, slugify } from '../data/services';

export default function ServiceCard({ name, desc, icon, imgSlug, fallbackImg, waMsg, category }) {
  const slug = imgSlug || slugify(name);
  const base = import.meta.env.BASE_URL;
  const fb   = fallbackImg || `${base}img/logo.png`;
  const msg  = waMsg || name;

  return (
    <div className="svc-card" data-category={category || ''}>
      <img
        src={`${base}img/services/${slug}.png`}
        alt={name}
        className="svc-card-img"
        loading="lazy"
        width={400}
        height={190}
        onError={e => { e.currentTarget.src = fb; }}
      />
      <div className="svc-card-body">
        <i className={`fa ${icon} svc-card-icon`} aria-hidden="true" />
        <h5>{name}</h5>
        <p>{desc}</p>
        <a
          className="btn-wa"
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-whatsapp" aria-hidden="true" /> Get Help on WhatsApp
        </a>
      </div>
    </div>
  );
}
