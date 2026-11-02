/**
 * PriceBoard.jsx — The homepage signboard: real prices in the "/-" style of a
 * Kenyan cyber café price list. Prices come from the shared catalog, so the
 * board can never disagree with what customers are charged.
 */
import { Link } from 'react-router-dom';
import { getDocumentType, PHOTO_PRODUCT } from '../data/documents';
import { WEB_PACKAGES } from '../data/services';
import { feeOption, totalOf } from '../data/fees';

const doc = id => getDocumentType(id);
const fmt = n => n.toLocaleString('en-KE');

const ROWS = [
  { label: 'Cover letter',       price: `${fmt(doc('cover-letter').price)}/-`, to: '/documents/career#cover-letter' },
  { label: 'Passport photo',     price: `${fmt(PHOTO_PRODUCT.price)}/-`,      to: '/documents/passport-photo' },
  { label: 'CV writing',         price: `${fmt(doc('cv').price)}/-`,          to: '/documents/career#cv' },
  { label: 'CV + cover letter',  price: `${fmt(doc('cv-cover-letter').price)}/-`, to: '/documents/career#cv-cover-letter' },
  { label: 'KRA PIN',            price: `${fmt(totalOf(feeOption('kra-pin')))}/-`, to: '/ecitizen?cost=kra-pin#cost' },
  { label: 'Passport, all in',   price: `${fmt(totalOf(feeOption('passport-34')))}/-`, to: '/ecitizen?cost=passport-34#cost' },
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
        Passport and good conduct prices include the government fee.{' '}
        <Link to="/ecitizen#cost" className="board-more">Check any eCitizen cost</Link>
      </p>
    </aside>
  );
}
