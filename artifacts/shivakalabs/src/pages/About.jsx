/**
 * About.jsx — About Us page: story, team photo, and company values.
 */
import PageHero from '../components/PageHero';
import CtaStrip from '../components/CtaStrip';

const VALUES = [
  { icon: 'fa-bolt',       title: 'Fast Turnaround',  desc: 'Same-day processing for most eCitizen services.' },
  { icon: 'fa-shield',     title: 'Trustworthy',       desc: 'Transparent, honest service you can rely on.' },
  { icon: 'fa-users',      title: 'Client-Focused',    desc: 'We go beyond the task to truly help you succeed.' },
  { icon: 'fa-lock',       title: 'Confidential',      desc: 'Your personal information stays private and secure.' },
];

export default function About() {
  return (
    <>
      <PageHero
        icon="fa-info-circle"
        title={<h1>About <span className="accent">ShivakaLabs</span></h1>}
        subtitle="We are a Kenyan digital services agency helping individuals and businesses navigate government portals, build online presence, and grow digitally."
      />

      <section>
        <div className="container about-section">

          {/* Story + Photo */}
          <div className="about-grid">
            <div>
              <h2>Our <span className="accent">Story</span></h2>
              <p style={{ marginTop: '1rem' }}>
                ShivakaLabs was born from the frustration of watching everyday Kenyans struggle
                with complex government portals. We set out to be the bridge — making eCitizen
                services, business registration, tax compliance and more accessible to everyone,
                regardless of their digital literacy.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Today we serve hundreds of clients across Kenya, helping with everything from
                a simple KRA PIN retrieval to full business websites and digital marketing
                campaigns. We are proudly remote and available via WhatsApp — fast, reliable,
                and always professional.
              </p>
            </div>
            <div className="about-img">
              <img
                src={`${import.meta.env.BASE_URL}img/about-team.webp`}
                alt="ShivakaLabs Team"
                loading="lazy"
              />
            </div>
          </div>

          {/* Values */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ textAlign: 'center' }}>Our <span className="accent">Values</span></h2>
            <div className="value-cards">
              {VALUES.map(v => (
                <div key={v.title} className="value-card">
                  <i className={`fa ${v.icon}`} aria-hidden="true" />
                  <h5>{v.title}</h5>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CtaStrip text="Ready to experience professional digital help? Message us on WhatsApp today." />
    </>
  );
}
