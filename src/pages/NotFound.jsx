/**
 * NotFound.jsx — 404 page shown when a route doesn't match.
 */
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--gold)', lineHeight: 1 }}>404</h1>
      <h2 style={{ marginTop: '0.5rem' }}>Page Not Found</h2>
      <p style={{ marginTop: '1rem', maxWidth: 400 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-outline-gold" style={{ marginTop: '2rem' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
