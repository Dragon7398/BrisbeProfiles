import { Link } from 'react-router-dom';
import HeaderStrip from '../components/HeaderStrip.tsx';

export default function NotFound() {
  return (
    <div className="ap-shell" data-density="cozy">
      <HeaderStrip />
      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
        <div className="ap-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center', padding: '40px 32px' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '40px', fontWeight: 600, color: 'var(--c-rule-hi)', marginBottom: '16px' }}>
            404
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '10px' }}>
            Island not found
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--c-ink-dim)', lineHeight: 1.5, marginBottom: '24px' }}>
            The coordinates you followed lead nowhere. Check the handle or UID and try again.
          </p>
          <Link
            to="/"
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--c-ocean)', textDecoration: 'none' }}
          >
            ← Return to shore
          </Link>
        </div>
      </div>
    </div>
  );
}
