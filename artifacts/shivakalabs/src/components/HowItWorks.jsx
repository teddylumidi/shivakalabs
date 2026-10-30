/**
 * HowItWorks.jsx — Numbered steps section.
 * Props: steps [{ icon, title, text }], title (JSX), subtitle, className
 */
export default function HowItWorks({ steps, title, subtitle, className = '' }) {
  return (
    <section className={`how-section ${className}`} aria-labelledby="how-it-works-title">
      <div className="container">
        <div className="section-title">
          <h2 id="how-it-works-title">{title || <>How It <span className="accent">Works</span></>}</h2>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
        <ol className="how-steps">
          {steps.map((s, i) => (
            <li key={s.title} className="how-step">
              <span className="how-num" aria-hidden="true">{i + 1}</span>
              <i className={`fa ${s.icon} how-icon`} aria-hidden="true" />
              <h3 className="how-title">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
