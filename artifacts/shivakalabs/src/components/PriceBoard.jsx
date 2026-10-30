/**
 * PriceBoard.jsx — The homepage signboard: real prices in the "/-" style of a
 * Kenyan cyber café price list. Prices come from the shared catalog, so the
 * board can never disagree with what customers are charged.
 */
import { Link } from 'react-router-dom';
import { getDocumentType, PHOTO_PRODUCT } from '../data/documents';
import { WEB_PACKAGES } from '../data/services';

const doc = id => getDocumentType(id);
const fmt = n => n.toLocaleString('en-KE');

const ROWS = [
  { label: 'Cover letter',       price: `${fmt(doc('cover-letter').price)}/-`, to: '/documents/career#cover-letter' },
  { label: 'Passport photo',     price: `${fmt(PHOTO_PRODUCT.price)}/-`,      to: '/documents/passport-photo' },
  { label: 'CV writing',         price: `${fmt(doc('cv').price)}/-`,          to: '/documents/career#cv' },
  { label: 'Affidavit',          price: `${fmt(doc('affidavit').price)}/-`,   to: '/documents/legal#affidavit' },
  { label: 'Tenancy agreement',  price: `${fmt(doc('tenancy-agreement').price)}/-`, to: '/documents/legal#tenancy-agreement' },
  { label: 'Business website',   price: `from ${fmt(WEB_PACKAGES[0].price)}/-`, to: '/webdev' },
];

export default function PriceBoard() {
  return (
    <aside className="board" aria-labelledby="board-title">
      <h2 id="board-title" className="board-title">Price list</h2>
      <ul className="board-rows">
        {ROWS.map((r, i) => (
          <li key={r.label} style={{ '--i': i }}>
            <Link to={r.to} className="board-row">
              <span className="board-item">{r.label}</span>
              <span className="board-leader" aria-hidden="true" />
              <span className="board-price">{r.price}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="board-foot">
        Pay with M-Pesa or card. eCitizen services are quoted on WhatsApp.
      </p>
    </aside>
  );
}
