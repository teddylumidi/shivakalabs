/**
 * ServiceSearch.jsx — "What do you need help with?" search across every service.
 */
import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchServices } from '../data/search';
import { waLink } from '../data/services';

const QUICK = ['KRA PIN', 'Good conduct', 'Passport', 'CV'];

export default function ServiceSearch() {
  const [query, setQuery] = useState('');
  const id = useId();
  const results = useMemo(() => searchServices(query), [query]);
  const searched = query.trim().length >= 2;

  return (
    <div className="svc-search" role="search">
      <label htmlFor={`${id}-q`} className="svc-search-label">What do you need help with?</label>
      <div className="svc-search-box">
        <i className="fa fa-search" aria-hidden="true" />
        <input
          id={`${id}-q`}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. KRA PIN, good conduct, CV"
          autoComplete="off"
          aria-describedby={`${id}-status`}
          aria-controls={`${id}-results`}
        />
      </div>

      {!searched && (
        <div className="svc-quick" aria-label="Popular searches">
          {QUICK.map(q => (
            <button key={q} type="button" className="svc-chip" onClick={() => setQuery(q)}>{q}</button>
          ))}
        </div>
      )}

      <p id={`${id}-status`} className="sr-only" aria-live="polite">
        {searched ? `${results.length} ${results.length === 1 ? 'service' : 'services'} found` : ''}
      </p>

      {searched && (
        <ul id={`${id}-results`} className="svc-results">
          {results.map(r => {
            const inner = (
              <>
                <span className="svc-result-name">{r.name}</span>
                <span className="svc-result-meta">
                  {r.area}{r.price ? `, ${r.price.toLocaleString('en-KE')}/-` : ''}
                </span>
                <span className="svc-result-action">{r.to ? 'Order' : 'Ask on WhatsApp'}</span>
              </>
            );
            return (
              <li key={r.area + r.name}>
                {r.to
                  ? <Link className="svc-result" to={r.to}>{inner}</Link>
                  : <a className="svc-result" href={r.href} target="_blank" rel="noopener noreferrer">{inner}</a>}
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="svc-result-empty">
              <p>No match for “{query.trim()}”. Tell us what you need and we’ll tell you if we can help.</p>
              <a className="btn-wa" href={waLink(query.trim())} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-whatsapp" aria-hidden="true" /> Ask on WhatsApp
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
