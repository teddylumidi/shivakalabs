/**
 * ServiceGrid.jsx — Filterable, searchable grid of service cards.
 * Props:
 *   services   – array of service objects
 *   filters    – optional array of { label, value } for filter tabs
 *   fallbackImg – fallback image path if service image not found
 */
import { useState, useMemo } from 'react';
import ServiceCard from './ServiceCard';
import { slugify } from '../data/services';

export default function ServiceGrid({ services, filters, fallbackImg }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  // Derive visible services from filter + search state
  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    return services.filter(svc => {
      const matchCat  = activeFilter === 'all' || svc.category === activeFilter;
      const matchText = !q || svc.name.toLowerCase().includes(q) || svc.desc.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [services, activeFilter, query]);

  return (
    <>
      {/* Search bar */}
      <div className="search-bar" role="search">
        <i className="fa fa-search" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search services…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search services"
        />
      </div>

      {/* Filter tabs (only shown when filters are provided) */}
      {filters && filters.length > 0 && (
        <div className="filter-bar" role="group" aria-label="Filter services">
          <button
            className={`filter-tab${activeFilter === 'all' ? ' active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          {filters.map(({ label, value }) => (
            <button
              key={value}
              className={`filter-tab${activeFilter === value ? ' active' : ''}`}
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="svc-grid">
        {visible.length > 0 ? (
          visible.map(svc => (
            <ServiceCard
              key={svc.name}
              name={svc.name}
              desc={svc.desc}
              icon={svc.icon}
              imgSlug={slugify(svc.name)}
              fallbackImg={fallbackImg}
              category={svc.category}
            />
          ))
        ) : (
          <div className="no-results">
            <i className="fa fa-search" style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.75rem', display: 'block' }} />
            <p>No services found for "<strong>{query}</strong>". Try a different keyword.</p>
          </div>
        )}
      </div>
    </>
  );
}
