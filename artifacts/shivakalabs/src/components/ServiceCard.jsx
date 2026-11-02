/**
 * ServiceCard.jsx — Reusable card for a single service.
 * Accepts: name, desc, icon, imgSlug, fallbackImg, waMsg, category, fee (a fees.js option id)
 */
import { Link } from 'react-router-dom';
import { waLink, slugify } from '../data/services';
import { feeOption, totalOf } from '../data/fees';

/** Price line for a card: the total, and what it includes. */
function priceInfo(feeId) {
  const o = feeId && feeOption(feeId);
  if (!o) return null;
  const from = o.group.id === 'passport' && o.id === 'passport-34';
  const note = o.mode === 'plus' && o.gov ? 'incl. government fee'
    : o.mode === 'included' ? 'all in'
    : o.mode === 'free' && o.gov === 0 && o.group.govLabel ? 'no government fee'
    : '';
  return { id: o.id, total: totalOf(o), from, note };
}

export default function ServiceCard({ name, desc, icon, imgSlug, fallbackImg, waMsg, category, fee }) {
  const price = priceInfo(fee);
  const slug = imgSlug || slugify(name);
  const base = import.meta.env.BASE_URL;
  const fb   = fallbackImg || `${base}img/logo.webp`;
  const msg  = waMsg || name;

  return (
    <article className="svc-card" data-category={category || ''}>
      <img
        src={`${base}img/services/${slug}.webp`}
        alt={name}
        className="svc-card-img"
        loading="lazy"
        width={400}
        height={190}
        decoding="async"
        onError={e => {
          // Swap to the fallback once; avoid a loop if the fallback is missing too.
          if (e.currentTarget.dataset.fallback) return;
          e.currentTarget.dataset.fallback = '1';
          e.currentTarget.src = fb;
        }}
      />
      <div className="svc-card-body">
        <i className={`fa ${icon} svc-card-icon`} aria-hidden="true" />
        <h3 className="svc-card-title">{name}</h3>
        <p>{desc}</p>
        {price && (
          <p className="svc-card-price">
            <strong>{price.from ? 'From ' : ''}KSh {price.total.toLocaleString('en-KE')}</strong>
            {price.note && <span> {price.note}</span>}
            <Link to={`/ecitizen?cost=${price.id}#cost`} className="svc-card-price-link">
              See breakdown<span className="sr-only"> for {name}</span>
            </Link>
          </p>
        )}
        <a
          className="btn-wa"
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-whatsapp" aria-hidden="true" /> Get Help on WhatsApp
          <span className="sr-only"> about {name}</span>
        </a>
      </div>
    </article>
  );
}
