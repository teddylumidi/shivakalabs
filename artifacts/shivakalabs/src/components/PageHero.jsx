/**
 * PageHero.jsx — Shared hero banner for service/info pages.
 * Shows the same subtle background image as the home hero for visual consistency.
 */
export default function PageHero({ icon, title, subtitle }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="page-hero">
      {/* Same background as home hero, at low opacity */}
      <div
        className="page-hero-bg"
        style={{ backgroundImage: `url(${base}img/background.webp)` }}
        aria-hidden="true"
      />
      <div className="page-hero-inner">
        <i className={`fa ${icon} page-hero-icon`} aria-hidden="true" />
        {title}
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
