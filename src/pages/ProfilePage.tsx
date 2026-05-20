import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayerProfile } from '../hooks/usePlayerProfile.ts';
import ProfileShell from '../components/ProfileShell.tsx';
import HeaderStrip from '../components/HeaderStrip.tsx';
import EmptyState from '../components/EmptyState.tsx';

function LoadingSkeleton() {
  return (
    <div className="ap-shell" data-density="cozy">
      <HeaderStrip />
      <div className="ap-grid" style={{ marginTop: '22px' }}>
        <div className="ap-left">
          <div className="ap-skeleton-card">
            <div className="ap-skeleton" style={{ width: 56, height: 56, borderRadius: '50%', marginBottom: 12 }} />
            <div className="ap-skeleton" style={{ height: 24, width: '70%', marginBottom: 8 }} />
            <div className="ap-skeleton" style={{ height: 14, width: '50%', marginBottom: 20 }} />
            <div className="ap-skeleton" style={{ height: 1, marginBottom: 16 }} />
            <div className="ap-skeleton" style={{ height: 12, width: '80%', marginBottom: 8 }} />
            <div className="ap-skeleton" style={{ height: 12, width: '60%' }} />
          </div>
          <div className="ap-skeleton-card">
            <div className="ap-skeleton" style={{ height: 16, width: '60%', marginBottom: 16 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} className="ap-skeleton" style={{ height: 76, borderRadius: '50%', justifySelf: 'center', width: 76 }} />
              ))}
            </div>
          </div>
        </div>
        <div className="ap-right">
          <div className="ap-skeleton-card" style={{ height: 180 }} />
        </div>
      </div>
    </div>
  );
}

function NotFoundProfile() {
  return (
    <div className="ap-shell" data-density="cozy">
      <HeaderStrip />
      <div className="ap-grid" style={{ marginTop: '22px' }}>
        <div className="ap-left" />
        <div className="ap-right">
          <EmptyState
            heading="No explorer found"
            tagline="No adventurer sails under that name or ID. Check the handle spelling and try again."
          />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { identifier } = useParams<{ identifier: string }>();
  const result = usePlayerProfile(identifier);

  useEffect(() => {
    if (result.status === 'loaded') {
      document.title = `${result.data.displayName} — The Archipelago`;
    } else {
      document.title = 'The Archipelago — Player Logbook';
    }
  }, [result]);

  if (result.status === 'loading') return <LoadingSkeleton />;
  if (result.status === 'not_found') return <NotFoundProfile />;
  return <ProfileShell record={result.data} />;
}
